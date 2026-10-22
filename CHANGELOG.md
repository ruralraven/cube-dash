# Cube Dash Changelog

## v7.22 — Crash percent
- When you crash, the screen now shows how far you got (like 47%), even when it isn't a new best.

## v7.21 — Piston dust puffs
- When a piston slams into the ground, small dust puffs now burst out on both sides, so it's easier to see when it's down. This is only a visual effect; the hit box is unchanged.

## v7.20 — Pistons really crush now
- **The bug:** the up-and-down crushers (pistons) in Clockwork Tower and 13 other levels were timed to always be at the top exactly when you reached them. You could hold still on the ground and slide under every one, so they never hit you, even though they looked dangerous.
- **The fix:** each piston now slams all the way down to the ground just as you arrive, so a run that stays on the ground gets crushed. Pistons are a bit shorter now (1½ blocks), so you can jump over them, and the jump window is about 10 frames at normal speed. Where a spike sits between two pistons, there is now one extra jump of space, so you can jump the spike and then the next piston.
- The hit box always follows the piston where it is drawn. The 14 levels with pistons are Lava Volcano, Robot Factory, Neon City, Rainbow Sky, Crystal Caves, Clockwork Tower, Storm Peaks, Cyber Arcade, Glitch Zone, Haunted Carnival, Frozen Fortress, Cosmic Rift, Spooky Swamp and Shadow King. All of them were re-solved, and their demo replays and coins were re-baked.
- **Clockwork Tower scenery:** the spinning gold gears and swinging pendulums in the background were the same gold as the real saw blades, and some sat right on the ground, so they looked like hazards even though they are only decoration. They are now darker and faded, and the pendulums hang higher, so real hazards are easy to tell apart.
- **New test, tools/movetest.js:** for every piston group in every level, a run that stops pressing jump just before the piston must die at that piston, and every piston must reach the ground. The old pistons failed all 15 checks, and the new ones pass all 15.

## v7.19 — Worlds-beaten counter on the menu
- The line under the CUBE DASH title now also shows how many worlds you've beaten (for example "… 12/105 coins  •  4/35 beaten").

## v7.18 — Piece counter in the editor
- The editor's info line now shows how many pieces your level has (for example "Under the Sea  •  ♪ Bubble Pop  •  speed 2  •  42 pieces"). It updates as you place or erase pieces.

## v7.17 — Level name and best % on the pause screen
- The pause screen now shows the level's name above PAUSED, and your best % next to your current % (for example "34%  •  best 61%").
- Checked: no console errors in 9 levels across every difficulty, or in the editor, practice checkpoints (Z / X) and icons.

## v7.16 — Progress in search results
- Built-in worlds in the 🔍 SEARCH results now show your best % and your 3 coin dots (gold for coins you've collected), so you can find unfinished levels quickly.

## v7.15 — CLEAR / PERFECT stamps on level cards
- Beaten levels now get a small tilted stamp on their picture in the level menu: a green **✓ CLEAR** once you beat it, or a gold **★ PERFECT** once you've also collected all 3 coins. It's easy to see which worlds are done and which still have coins to find.

## v7.14 — Best-score flag + live NEW BEST!
- The progress bar now has a small yellow **flag at your best %**, so you can see how close you are while you play.
- The moment you pass your best in a normal run, **NEW BEST!** pops up with a sparkle and a chime, right away instead of only after you crash. Practice runs, demo replays, Daily Run and your own levels don't show it.

## v7.13 — Version number always up to date
- The version shown on the ⚙ Settings screen now comes from one setting (`CD_VERSION` in js/extras.js), and the publish script refuses to publish if it doesn't match the newest CHANGELOG entry. The number on screen can't fall behind any more.
- Checked: no console errors and nothing broken on the menu, editor, icons, gameplay, pause or search screens.

## v7.12 — Version number in Settings
- The ⚙ Settings & Trophies screen now shows the game version ("Cube Dash v7.12") in small text at the bottom left, so it's easy to see whether you have the newest update.
- Checked: no console errors on any screen, and nothing was found broken.

## v7.11 — Search typing fix
- **Bug fix:** typing an **M** in the 🔍 SEARCH box turned the music on or off instead of typing the letter, so names like "Moon Base" or "Mushroom Forest" couldn't be typed. M now types normally in search and still toggles music everywhere else.

## v7.10 — Best % next to the progress bar
- While you play a level, your best score shows in small yellow text under the % counter ("Best 45%"). In practice mode it says "Real best" so you can see the score you're trying to beat. It is hidden until you have a best, and in Daily Run and your own levels.
- Checked: no console errors, and the menu, editor and icons screens look right in small, normal and very large windows.

## v7.9 — Controls help on the pause screen
- The pause screen now shows a small help box listing every keyboard key (jump, pause, restart, menu, fullscreen, practice checkpoints) and the controller buttons (A jump, B back, Start play/pause, D-pad to pick a world). Controller buttons weren't shown anywhere before.

## v7.8 — Outer Space UFO fix + safer publishing
- **Outer Space:** the UFO gate section got too tight after the v7.7 jump changes and failed the stricter human-timing bot check. The UFO gates now have a little more room between them (6 → 7 tiles), so you have more time to line up for each gap. It looks the same as before, and its demo replay and coins were re-baked.
- **tools/publish.sh** now stops with a clear "PUBLISH FAILED" message on any failed step: a missing publish repo, a JS error, a failed commit or push, or the site not updating in time.

## v7.7 — Fairer jumps, full-window game, level search, blank new levels
**Jumps (the "I can't jump over three blocks" problem, in every level)**
- **What was wrong:** the cube's jump went high but was over fast. At slow speed a row of 3 spikes only had a 4-frame timing window (about 1/15 of a second), and a 3-block-tall wall only had 3 frames. These rows appear in almost every level, so they felt nearly impossible.
- **Cube physics, closer to Geometry Dash:** gravity is a little softer (0.95 → 0.82) and the jump is a little gentler (15.2 → 14.3). The jump is about the same height but stays in the air about 10% longer, so it covers more ground. Mini cube, cube jump pads and cube orbs were matched so their heights stay the same.
- **Spikes:** the hit area is thinner and the very tip is harmless (GD-style).
- **Block tops:** if your feet are within 20 px of a block's top near the peak of a jump, you land on it instead of crashing into the side.
- **Result:** 3 spikes went from a 4 → 10 frame window at the slowest speed, 9 → 14 at normal speed, 13 → 18 at fast and 16 → 20 at very fast. A 3-tall wall went from 3 → 10 frames.
- The level layouts (orb chains and jump spacing) were adjusted to the new jump. All 35 levels were re-solved by the bot, the demo replays and coin spots were re-baked, and `?verify=1` wins 35/35 with 3/3 coins. No levels or features were removed.
- The other 7 modes were checked against GD and already work the GD way: ship (hold to rise), ball (tap to flip), UFO (tap to flap), wave (45° while held), robot (hold for a higher jump), spider (tap to teleport-flip) and swing (tap to flip, gentle swing). Their physics are unchanged.
- tools/padtest.js: the "jump held mid-air" check now starts right after the pad launches.

**Full window + fullscreen**
- The game is now as big as possible in the browser window and stays centred. It resizes when you rotate or resize, keeps clear of phone notches and has no scrollbars. Because the game screen has a fixed size, very tall or very wide windows still show dark bars on two sides instead of stretching.
- A new **⛶ fullscreen button** is on the menu (top right) and on the pause screen (next to RESTART). The **F** key toggles it too. Safari's webkit fullscreen is supported as a backup.
- Home-screen ready: the page has the theme-color, apple-mobile-web-app-capable and viewport-fit=cover tags, so it can be added to a phone's home screen and open fullscreen.

**Level search**
- A new **🔍 SEARCH** button is on the menu (top right) and in the editor's My Levels list. Type a name (or tap the box on a phone) to search your own levels, levels you imported with PASTE CODE and all the built-in worlds.
- Each result has **▶ PLAY**. Your own and imported levels also have **✏ EDIT** (editing an imported level makes a copy in My Levels). Locked worlds show 🔒.
- Pasted codes are now also saved to a local **Imported** list. Everything stays on this device, because there is no online level server.

**Editor**
- **+ NEW LEVEL** now always starts with a completely blank map (just the floor and the finish). The very first editor level is blank too. The SAMPLE button still loads the example levels.

## v7.6 — Quick restart key
- Press **R** during a level, after a crash, or on the win screen to restart that level from the very beginning right away. It also works while paused. All other keys and buttons work the same.

## v7.5 — Pause and Home buttons moved to the top right
- During gameplay, the **⏸ PAUSE** and **⌂ HOME** buttons now sit in the top-right corner. They are big 48 px touch targets and don't overlap the progress bar, the % counter or the boss bar.
- The level name moved under "Attempt" on the top left. The three coin dots moved just below the new buttons.
- Keyboard shortcuts work the same as before.

## v7.4 — Verify mode fix
- **Bug fix:** `?verify=1` on its own never loaded the baked bot replays (only `?auto=1` did), so every level ran with no input and the cube crashed at 1–3% with 0 coins. Timing was never the problem, because verify steps the game synchronously with no requestAnimationFrame or audio clock. `?verify=1` now loads the replays itself, and all 35 levels win with 3/3 coins.
- Verify now prints a one-line `VERIFY SUMMARY 35/35 won with 3/3 coins — ALL OK` result, temporarily turns practice mode off while it runs, and leaves your saved stats and ghosts untouched.

## v7.3 — Practice mode + full icon customization
**Practice mode**
- Every level card now has a green **PRACTICE ▶** button that starts the level in practice mode. Once you have practice progress, it reads **PRACTICE 45%**. Practice progress is saved separately and never changes your real best.
- The pause menu has a **PRACTICE: ON/OFF** toggle that restarts the level in the chosen mode. The menu's **PRACTICE: ON/OFF** button still works too.
- Green diamond checkpoints are placed automatically at each section start.
- During practice, two on-screen buttons appear: **◆ PLACE (Z)** drops a checkpoint where you are, and **✖ REMOVE (X)** deletes the last one. The Z and X keys do the same.
- Practice plays the calm song Lunar Lounge, which keeps going through respawns.

**Icons**
- The ICONS screen has a tab for each of the 8 modes: CUBE, SHIP, BALL, UFO, WAVE, ROBOT, SPIDER and SWING. Each tab has 6 designs (48 in total).
- 4 designs per mode are free. The fifth needs 18 coins, and the sixth needs 5 trophies.
- You get a primary and a secondary color row (10 colors free), a GLOW toggle, and TRAIL, DEATH and FACE pickers.
- Death effects: Shatter, Confetti, Pixels, Ring and Ghost.
- A live animated preview shows your choices, and they are saved in your browser.

## v7.2 — Jump pad fix + editor upgrade
**Jump pads (bug fix)**
- **The bug:** in 14 levels (27 pads), a yellow pad's launch arc landed right in the spike row that followed it. The pad pattern always placed 4 spikes after a pad, but at speeds 1–2 the pad's arc only travels about 170–220 px, so a player who let the pad do the work came down on the 3rd or 4th spike. The bot never noticed because it jumped over those spikes itself instead of trusting the pad. Affected levels: Under the Sea, Candy Land, Ice Kingdom, Mushroom Forest, Cherry Blossom, Dino Valley, Bamboo Dojo, Sunny Beach, Moon Base, Gold Mine, Honey Hive and Wild West. The editor's sample levels had the same layout.
- **The fix:** the spike count after each pad is now worked out from the pad's real arc at that level's speed, and the next pad is placed after a safe landing.
- **Triggering:** pad triggering is now checked across the frame (swept), so it can't be missed at high speed. A pad launch can also no longer be overridden by a jump input in the same frame (holding jump onto a pad used to give a weaker launch).
- **New test, tools/padtest.js:** for every pad in all 35 levels, it simulates a hands-off launch and a launch with jump held mid-air, and both must land safely. All levels, all game-generated levels and all 3 editor samples now pass with 0 failures.

**Level editor (open it with the pink ✏ button next to ★ DAILY RUN on the menu)**
- **LEVELS** opens My Levels: as many named levels as you want, with + NEW LEVEL, ✎ Name (rename) and 🗑 (delete, with a confirm). Older saved slots carry over automatically.
- **📋 PASTE CODE** imports a friend's level. **SHARE** copies a link and shows a code you can copy and paste.
- Every tool now has a text label under its icon.
- **PAINT** mode: drag across the grid to draw or erase many tiles at once.
- **ZOOM** cycles 100% → 70% → 50% so more of the level fits on a phone screen.
- **↶ / ↷** undo and redo (Z / Y on a keyboard).
- **▶ HERE** test-plays from the green dashed line on screen, with the right mode, speed, size and gravity at that spot.
- **✔ CHECK** asks the bot whether the level is beatable, and if not, marks where it got stuck.
- A **pad-arc preview** draws each pad's real launch path as a dashed line: green if it lands safely, red ✖ if it hits something.
- THEME and SONG are still saved per level.

## v7.1 — Menu order by difficulty
- The world list now runs strictly Easy → Normal → Hard → Harder → Insane → Demon. Storm Peaks and Glitch Zone moved up into the Harder group, Rainbow Sky now opens the Insane group, and the Shadow King stays last as the finale. Only the display order changed: saves are untouched.

## v7.0 — Wild West + Spooky Swamp (35 worlds)
- **Wild West** (Hard) has mesas, saloons, windmills, cacti, tumbleweeds and blowing dust, set to *Tumbleweed Twang* (122 BPM swung tribal breaks).
- **Spooky Swamp** (Harder) has gnarled trees dripping moss, rolling fog, cattails and fireflies that pulse with the beat, set to *Bayou Boogie* (140 BPM organ trap).
- Both levels pass the bot at D3 and D6. Saves migrate automatically (v35), and all 35 levels were re-baked.

## v6.9 — World Tour trophy
- New trophy, **World Tour**: beat 20 worlds. It's a midway goal now that there are 33 worlds, bringing the total to 16 trophies.

## v6.8 — Honey Hive + Cosmic Rift (33 worlds)
- **Honey Hive** (Normal) has a honeycomb sky, hanging beehives, buzzing bees, flowers and pollen sparkles, set to *Honey Bounce* (120 BPM bouncy house).
- **Cosmic Rift** (Demon, secret world: collect 55 coins to unlock) has a black hole with spinning accretion rings, tumbling asteroids and streaking light, plus mini-wave and saw-field sections, set to *Event Horizon* (176 BPM drum & bass with a reese bass).
- Both levels pass the bot. Honey Hive also passes at D6. Background spires and honey mounds are drawn faint and low so they don't look like hazards. Saves migrate automatically (v33), and all 33 levels were re-baked.

## v6.7 — Secret Seeker trophy
- New trophy, **Secret Seeker**: beat 3 secret (coin-locked) worlds. That makes 15 trophies, and the trophy grid was compacted so all of them fit.

## v6.6 — Gold Mine + Frozen Fortress (31 worlds)
- **Gold Mine** (Hard) has a cave ceiling with glittering gold, timber supports with hanging lamps, rails and gold-loaded minecarts, set to *Pickaxe Polka* (130 BPM bouncy breaks).
- **Frozen Fortress** (Insane, secret world: collect 45 coins to unlock) has aurora ribbons, ice-castle towers with flags, snowmen and a blizzard, plus a mini-size UFO section, set to *Glacier Siege* (158 BPM drum & bass with a reese bass).
- Both levels pass the bot at D3 and D6. Saves migrate automatically (v31), and all 31 levels were re-baked.

## v6.5 — Now-playing line
- The menu shows the name and BPM of the song preview that's playing (the selected world's song), pulsing gently with the beat. It's hidden while the game is muted.

## v6.4 — Gamepad support
- You can now play with a controller: **A** to jump or hold, **Start** to play or confirm, **D-pad** left/right to pick a world, **B** to go back. Controllers use the same input path as the keyboard, so everything works the same way.

## v6.3 — Moon Base + Haunted Carnival (29 worlds)
- **Moon Base** (Hard) has a starfield, Earth hanging in the sky, glass domes with blinking antennas, floating astronauts, craters and flags, set to *Lunar Lounge* (126 BPM space house).
- **Haunted Carnival** (Harder, secret world: collect 35 coins to unlock) has a spinning Ferris wheel, striped circus tents, string lights that chase to the beat, floating ghosts and confetti, set to *Carnival of Fright* (144 BPM spooky-organ trap).
- Both levels pass the bot at D3 and D6. The menu now has 4 pages. Saves migrate automatically (v29), and all 29 levels were re-baked.

## v6.2 — Vibration + settings tidy
- Phones with vibration support now buzz briefly when you crash and give a short pattern when you win. You can switch this off in Settings ("Vibration (phones)"). Replays never vibrate.
- The settings rows were tightened so all 7 fit above Stats, and the Jukebox button no longer sits under the mute button.

## v6.1 — Sunny Beach + Glitch Zone (27 worlds)
- **Sunny Beach** (Easy) has palm trees, sea waves, beach umbrellas, sailboats, crabs and seagulls, set to *Tropical Splash* (114 BPM moombah marimba).
- **Glitch Zone** (Harder) has falling code characters, glitching server towers and scanline flashes on the beat, set to *Glitch Core* (150 BPM industrial with a reese bass).
- Both levels pass the bot at D3 and D6. Saves migrate automatically (v27), and all 27 levels were re-baked.

## v6.0 — Jukebox
- New **♪ JUKEBOX** button on the Settings & Trophies screen. It shows all 25 songs in menu order with BPM and world name; tap one to play it from the first drop. The playing song shows a beat-synced equalizer.

## v5.9 — Drop-synced portals
- The level builder now lines game-mode portals up with the music drops. When a cube section ends up to 8 beats before a drop, the gap is filled with on-beat spikes so the mode change hits right on the drop. 9 levels now switch modes exactly on the first or second drop: Jungle, Lava, Desert, Mushroom, Toy Box, Kraken, Storm Peaks, Bamboo Dojo and Cyber Arcade.
- The menu also switches LITE mode on automatically when the device is struggling (before, it only did this during play). Bamboo Dojo lanterns use a cheap glow instead of a shadow blur.
- All 25 levels were re-baked and verified. They pass at D3, and every non-Insane/Demon level also passes D6.

## v5.8 — Bamboo Dojo + Cyber Arcade (25 worlds)
- **Bamboo Dojo** (Hard) has swaying bamboo, dojo roofs, glowing paper lanterns and floating leaves, set to *Bamboo Breeze* (118 BPM tribal and garage marimba).
- **Cyber Arcade** (Insane, secret world: collect 26 coins to unlock) has a synthwave grid, blinking arcade cabinets, pixel invaders and rising pixel sparks, set to *Pixel Overload* (172 BPM chiptune drum & bass).
- Both levels pass the bot at D3 and D6.
- Grey decorative rocks in Bamboo Dojo and Storm Peaks were replaced with low, rounded shapes so they can't be mistaken for blocks you can land on.
- Saves migrate automatically (v25), including older saves that skipped v5.4. All 25 levels were re-baked.

## v5.7 — Fairness pass + nicer win screen
- Ran a fairness sweep on every level with coarser, more human-like bot timing (D4 and D6). Every Easy–Harder level now passes D6. Haunted Castle and Rainbow Sky had UFO gate sections that were too tight, so those got one more beat of room. Only the two Demon levels (Neon City and Shadow King) still need very precise timing, on purpose.
- The win screen now shows a bouncing **★ FIRST TRY! ★** badge when you clear a level on attempt 1. The NEXT button says which world comes next, and a hint appears when you're within 6 coins of unlocking a secret world.
- All 23 levels were re-baked and re-verified.

## v5.6 — New sounds: reese bass + future-bass chords
- New **reese bass**: detuned saws with a slowly moving filter. Neon Nights, Abyssal Bass and Thunderhead now use it.
- New **future-bass** lead: off-beat 4-note chord stabs that open up in the drops, plus bell arpeggios in the breakdowns. Prism Pulse and Sakura Drift now use it.
- All songs were checked offline: loudness peaks stay below clipping.

## v5.5 — Four Seasons trophy, Storm Peaks pines
- New trophy, **Four Seasons**: beat Cherry Blossom, Sunny Farm, Autumn Woods and Ice Kingdom. That makes 14 trophies.
- Storm Peaks now has snow-tipped pine trees in the scenery.

## v5.4 — Autumn Woods + Storm Peaks (23 worlds)
- **Autumn Woods** (Normal) has orange and red trees, pumpkins, toadstools and drifting leaves, set to the new song *Maple Groove* (124 BPM garage with a swing feel).
- **Storm Peaks** (Harder) has snow-capped mountains, storm clouds, driving rain and lightning flashes that hit on the beat, set to *Thunderhead* (165 BPM drum & bass).
- Both levels mix 6–7 game modes with hand-written rhythm openers and finishers, and the bot beats them at both the standard (D3) and the coarser, more human-like (D6) setting. All 23 levels were re-baked.
- The menu now has 3 pages, and the bottom button shows which page you're on. Saves, coins and ghosts for the Shadow King carry over automatically.

## v5.3 — Ambient particles in every world
- 14 more worlds get their own ambient particle layer: sea bubbles, candy sprinkles, rainbow twinkles, desert sand gusts, boss embers, mushroom spores, pirate rain, crystal glints, toy confetti, cherry petals, clockwork sparks, Kraken bubbles, farm butterflies and dino-valley embers. Many of them pulse with the beat. They are skipped in LITE mode on phones, and a frame costs about 2.5 ms to draw.

## v5.2 — Key-change finales and editor fix
- The editor tool bar no longer runs under the mute button, so tapping the eraser can't mute the music.
- 14 songs now rise 1–2 semitones in key on their second full loop, with extra square-wave stabs during that loop's drops. This gives long play sessions a lift in the final stretch. Tempo and beat timing are unchanged, so level sync is unaffected.

## v5.1 — Editor sample levels
- New **SAMPLE** button in the editor loads one of 3 ready-made example levels (Easy Hop, Mode Mixer, Challenge Run) into your slot to play, study or remix. ↶ UNDO brings your own level back. The samples were made from the generator, converted to the editor grid, and checked as beatable by the bot.
- The editor palette now fits all 21 tools on screen.
- Performance check under 6× CPU throttling: LITE mode switches on automatically after about 4 s of slow frames, and the fixed-timestep physics stays correct while the frame rate is low.

## v5.0 — 21 worlds: Sunny Farm & Dino Valley
- **Sunny Farm** (Easy, slowest speed, 116 BPM swung "Barnyard Boogie"): a red barn, hay bales, wandering cows, sunflowers, fences, rolling hills and a beaming sun. It's the 2nd world in the menu, a gentle on-ramp with one easy dash pit.
- **Dino Valley** (Normal, 128 BPM "Dino Stomp"): smoking volcanoes, long-neck dinosaurs, flying pterodactyls, cycads, dino eggs and fossil bones. Robot, swing, ship melody, dash, spider.
- Both worlds also appear in Daily/Random runs. Saves migrate automatically (the bosses keep their scores).
- Bot: both new levels pass even at the coarsest timing (D6). All 21 levels win in the browser with 3/3 coins (63 coins total).

## v4.9 — Ghost of your best run
- **Ghost cube**: every world remembers your best attempt as frame-perfect inputs (the engine is deterministic). A see-through ghost replays that run next to you, so you can race yourself. It's saved in its own small storage slot and can be turned off in Settings ("Ghost of best run"). Practice, Daily/Random and editor levels don't record ghosts.
- New trophy: **Kraken Tamer** (13 trophies in total). The Settings screen was re-laid out to fit them.
- Browser run: 19/19 wins with 3/3 coins. Tested that a ghost is recorded and replays.

## v4.8 — 8th game mode: Swing
- New **Swing copter** mode (orange portal, hint "TAP = FLIP GRAVITY"): each tap flips gravity mid-air, so you swing between the floor and ceiling. It has its own propeller-cube sprite and tilts with your speed. Leaving swing mode resets gravity to normal.
- Added swing sections to 6 worlds: Cherry Blossom, Desert Temple, Pirate Cove, Clockwork Tower, Rainbow Sky and Neon City. These include gate runs and melody walls.
- Swing is also in the editor palette and in Daily/Random runs. Generated runs: 120/120 beatable.
- Bot: swing patterns pass at fine and coarse timing (D3/D4/D6) at every speed. All 19 levels are re-baked, and the browser run wins 19/19 with 3/3 coins.

## v4.7 — Second boss: Kraken's Lair
- New Insane boss world **Kraken's Lair** (156 BPM "Abyssal Bass", unlocks at 20 coins). Placed just before Neon City in the world order.
  - A giant purple kraken with glowing eyes and eight tentacles that sway on the beat, plus purple beams to the saws.
  - Deep-sea scenery: god-rays, a sunken pirate ship, kelp, glowing bioluminescent plankton and rising bubbles.
  - Moving ship sections, a sawfield, dash pits, a wave section, a fast ship melody, spider flips and its own "THE KRAKEN IS DEFEATED!" ending.
- The boss system now supports multiple bosses (each with its own art, health-bar name and ending).
- Daily/Random runs can now include dash-orb pits (120/120 generated runs bot-beatable at D4).
- 19 worlds and 57 coins. Saves migrate automatically. All 19 levels win in the browser with 3/3 coins.

## v4.6 — Dash orbs
- New **green dash orb** (it shows a "HOLD" label): tap it and keep holding to fly dead-straight over a spike pit, then release to drop. The pit is sized from each level's jump length, so a normal jump can't clear it. The bot confirmed this: with the orb removed, every speed fails.
- Added 20 dash-orb pits across 10 worlds: Jungle, Haunted, Factory, Space, Neon, Rainbow, Mushroom, Pirate, Crystal and Clockwork. The harder worlds add ceiling spikes above the pit.
- Dash orbs are also in the level editor's palette.
- The engine and both bots track dash state. All 18 levels are re-verified (fine and coarse timing on the easier ones), coins were re-placed, and the browser run wins all 18 with 3/3 coins.

## v4.5 — Editor slots & undo, phone auto-pause
- Editor: **↶ UNDO** (also the Z key, keeps 60 steps) and **3 save slots** (the SLOT button) so you can work on several levels.
- Phones: turning the phone upright mid-level now pauses the game automatically.
- Tested phone layout with an emulated iPhone (844×390 touch): menu tap starts a level, and touch-hold and release register correctly.

## v4.4 — Menu music
- The menu (and the Icons/Settings screens) now plays a preview of the selected world's song, starting at its drop and at a slightly lower volume. Moving to another card switches tracks, so the menu doubles as a jukebox. The editor stays quiet while you build.

## v4.3 — Settings, stats & trophies
- A new ⚙ button on the menu opens **Settings & Trophies**:
  - Settings: Music, Sound effects (separate from music), **Calm mode** (turns off flashes, screen shake and drop bursts, for players sensitive to them), LITE graphics, Practice mode.
  - Stats: attempts, jumps, deaths, wins, coins, play time.
  - **12 trophies**: First Steps, World Hopper, Globetrotter, Coin Collector, Treasure Hunter, Every Last Coin, Demon Slayer, Kingslayer, Never Give Up, Bouncy, Daily Runner, Architect (make a level of 10+ objects that the bot can beat).
- A toast slides in when you unlock a trophy. Bot demo replays never count toward stats or trophies.

## v4.2 — Level Editor ✏
- New **level editor** (the ✏ button on the menu, or `?scene=edit`):
  - 19 tools: block, spike, ceiling spike, yellow/blue orbs, yellow/blue pads, all 7 mode portals, gravity up/down, slow/fast speed portals, and an eraser.
  - Tap to place and tap again to remove. Drag or use the scroll bar (or arrow keys) to move along. Beat markers in the top row help you place things on the rhythm.
  - THEME / SONG / SPEED pick any world look, any of the 18 songs, and any of the 4 speeds.
  - **▶ TEST** plays your level; dying or pressing home returns you to the editor.
  - **🤖 CHECK** runs the verifier bot on your level. It either says "✓ The bot beat your level!" or marks where it got stuck with a red line and scrolls you there.
  - **🔗 SHARE** copies a link (`?lvdata=…`). Opening it loads that level straight into the editor.
  - Your level saves automatically on this device.
- Tested in a headless browser: open, place, bot check (pass and fail cases), test-play to a win, return to the editor, share link and reopen.

## v4.1 — Daily Run & Random Run (bot-verified in your browser)
- **★ DAILY RUN**: a new level every day, the same for everyone. It's stitched together from the hand-tuned pattern library (cube rhythm rows, ship melodies, ball call-and-response, UFO gates, spider, robot, plus wave/tunnels at higher tiers), with a random world theme and song. The difficulty tier rotates each day.
- **🎲 RANDOM**: a fresh generated level on every press. The E/N/H button sets the difficulty.
- New `js/bot.js`: the verifier bot now also runs **in the browser**. Each generated level is solved by the bot before you play it (if one fails, the game tries up to 8 seeds), and the intro banner shows "✓ bot-verified beatable".
- Offline check: 45/45 generated runs across all three tiers were beatable with coarse input timing (D4).
- Checked end to end in a headless browser: a Daily Run is generated, verified, and played to a win by replaying the bot's own path.

## v4.0 — Difficulty-ordered world map
- The menu now lists worlds from easiest to hardest across both pages: Toy Box → Under the Sea → Candy Land → Jungle Jump → Cherry Blossom → Mushroom Forest → Ice Kingdom → Desert Temple → Pirate Cove → Lava Volcano → Haunted Castle → Clockwork Tower → Robot Factory → Outer Space → Crystal Caves → Neon City → Rainbow Sky → Shadow King.
- The NEXT button after a win, arrow-key navigation, number keys and swiping all follow this order. Saves aren't affected (they're stored per world, not per position).

## v3.9 — 18 worlds
- **Toy Box** (Easy, slowest speed, 112 BPM "Toy Parade"): toy shelves, ABC blocks, teddy bears, bouncing balls and pinwheels. A second gentle level for beginners. It passes even the coarsest bot (D6).
- **Cherry Blossom** (Normal, 122 BPM "Sakura Drift"): torii gates, pagodas, snowy mountains, a red sun, sakura trees and drifting petals. Uses every mode (cube, robot, ship melody, spider, ball, UFO).
- **Clockwork Tower** (Harder, 142 BPM "Tick Tock Tower"): turning cogs, swinging pendulums, a clock tower whose hands spin faster on the beat, and riveted brass blocks. Pistons, moving ship, wave and gravity orbs.
- Shadow King is still the finale (world 18). Saves migrate automatically.
- Bot: all 18 levels win in the browser with 3/3 coins.

## v3.8 — More unlockables (up to 45 coins)
- 4 new cube colours (teal, blaze, silver, gold, unlocking at 30–42 coins).
- 4 new faces: Pirate (eye-patch + bandana), Sleepy (zzz), Alien (one big eye + antennae), Crown (45 coins, every coin).
- 2 new trails: Bubbles (float upward) and Hearts.
- The ICONS screen was re-laid out for 18 colours / 12 faces / 6 trails, with a live preview cube at the top right.

## v3.7 — Level flow
- Drop moments: when the music hits its drop, the screen flashes, shakes and bursts with speed lines in the world's colour. This was checked in a real music run (the drop fired at about 23.5 s in Under the Sea).
- The progress bar shows a coloured tick for each mode portal, so you can see the level's structure (cube → ship → ball …) ahead of time.

## v3.6 — 15 worlds
- **Mushroom Forest** (Normal, 118 BPM "Spore Bounce"): giant glowing toadstools, floating spores, snails and red-cap blocks. Pad- and orb-heavy, with UFO and ball sections.
- **Pirate Cove** (Hard, 136 BPM "Cannon Shanty"): sunset sea with rolling waves, palm islands, pirate ships, seagulls, a wooden dock, crates and barrels. Ship-heavy, with sawfields.
- **Crystal Caves** (Insane, 150 BPM "Prism Pulse"): glowing crystal clusters and stalactites. Spider, wave, pistons, mini ball and a fast ship melody.
- Shadow King stays the finale (now world 15). Saves are migrated automatically so existing coins and best % stay with the right world.
- Bot-verified: all 15 levels win in the browser with 3/3 coins. The new levels also pass the coarse-timing bot (Mushroom Forest at D6).

## v3.5 — Ambient weather & life
- New ambient layer that reacts to the beat:
  - Jungle: falling leaves and fireflies
  - Ice Kingdom: snowfall
  - Lava Volcano: rising embers and a heat glow
  - Haunted Castle: flapping red-eyed bats and drifting ground fog
  - Robot Factory: welding sparks on the beat and steam puffs
  - Outer Space: shooting stars
  - Neon City: neon rain
- This layer is skipped on phones while LITE mode is on.

## v3.4 — More song variety
- 4 new drum kits: UK garage 2-step, breakbeat, moombah and trance. Several songs now switch to a second groove for alternate 16-bar stretches.
- Swing/shuffle feel for Vine Swing and Sandstorm Shuffle.
- New signature layers:
  - "vocal chop" formant synth (Bubble Pop, Rainbow Rocket, Sandstorm, Spooky Spire)
  - trance-gated chord stabs (Frostbite, Neon Nights, Shadow King)
- Every 8 bars ends with a tom fill, and every second drop adds a harmony line a third above the lead.
- Checked offline: all 12 songs render with healthy levels (peak ≤0.81, no clipping). BPMs are unchanged, so the levels stay beat-synced.

## v3.3 — Swipeable menu & new rhythm sections
- World menu: page dots and swipe left/right between pages. Cards now open on release, so a swipe doesn't start a level by accident.
- Added 17 hand-written, beat-synced sections across worlds 1–10:
  - cube "stair melody" rows (block columns that rise and fall with the music)
  - ship gravity-wall melodies (gseq)
  - ball floor/ceiling call-and-response (bseq)
- Every level was rechecked with the bot (fine and coarse input timing), coins were re-placed, and all 12 levels win in the browser with 3/3 coins.

## v3.2 — Phone polish & performance
- Multi-touch: a hold now lasts until every finger is lifted, and a second finger taps orbs mid-hold.
- On phones, tapping the menu goes fullscreen and locks to landscape. Holding the phone upright shows a "rotate your phone" screen.
- Double-tap zoom, pinch zoom and long-press menus are blocked.
- LITE mode drops glow/shadow blur and caps particles. It turns on by itself when frames run slow (avg >24 ms) and can be toggled with the FX/LITE button on the menu.

## v3.1 — 12 worlds & the Shadow King
- Menu now pages through worlds (3×3 grid + MORE WORLDS button).
- New level 11 **Desert Temple** (Hard, 126 BPM "Sandstorm Shuffle"): pyramids, dunes, cacti, walking camels, sandstorm, hieroglyph blocks; new ship gravity-sequence and ball-sequence rhythm sections.
- New finale **Shadow King** (Demon boss, 174 BPM, unlocks at 12 coins): giant crowned boss cube that pulses to the beat, laser tethers to saws, lightning, boss health bar that drains as you progress, explosion + "SHADOW KING DEFEATED!" on win.
- Bot-verified: all 12 levels win in-browser with 3/3 coins.

## v1.1 – Ship mode (2026-10-21)
- Ship portals (pink) and cube portals (blue), with GD-style hold-to-fly physics, capped speed, tilt.
- Themed ships: submarine (Sea), candy rocket (Candy Land), UFO (Space).
- 2 ship corridor sections per level; easy wide first section in Under the Sea. Bot-verified passable.

## v1.2 – Music (2026-10-21)
- Synthesized EDM soundtrack (Web Audio): kick/snare/clap/hats, bass, pads, arps, lead melody with intro/build/drop/break arrangement.
- Distinct song per level: Bubble Pop (120 BPM), Sugar Rush (128), Stardust Overdrive (140, wobble bass).
- Background and floor pulse to the beat. Mute button (bottom-right) and M key; setting is remembered.

## v2.0 – Big update: 9 worlds, 7 game modes (2026-10-21)
- New engine (js/engine.js) with 7 modes: Cube, Ship, Ball (tap flips gravity), UFO (tap to flap), Wave (hold up / release down, diagonal), Robot (hold for higher jump), Spider (tap = instant teleport to the other side).
- Portals: mode portals with icons, gravity flip/normal portals, speed portals (4 speeds), mini/normal size portals. Jump pads, yellow jump orbs.
- 9 levels, Easy → Demon: Under the Sea, Candy Land, Jungle Jump (new), Ice Kingdom (new), Lava Volcano (new), Haunted Castle (new), Robot Factory (new), Outer Space, Neon City (new). Each new world has its own animated parallax scenery (parrots & vines, aurora & penguins, erupting volcano & embers, bats & ghosts, gears & pistons & sparks, synthwave sun & flying cars).
- Level layouts are arranged per level from a pattern library and snapped to the song's beat grid (obstacles land on the rhythm).
- Every level has its own song (9 songs, 120–160 BPM).
- 3 coins per level (27 total); coins unlock cube colors, faces and trails in the new ICONS screen.
- Practice mode with automatic checkpoints at every section.
- Verifier bot (tools/bot.js) proves every level is beatable; tools/bake.js bakes coins onto a proven path and stores a demo replay (?lvl=N&auto=1).

## v2.1 – Polish (2026-10-21)
- Wave corridors are now drawn as smooth diagonal walls with glowing edges; wave leaves a solid GD-style trail line.
- Speed/size portals no longer overlap the next mode portal.
- Music: bigger drops (louder lead + octave layer, off-beat hats), noise riser before each drop. Offline audio analysis confirms every song is audible with no clipping.

## v2.2 – Hand-written rhythm sections (2026-10-21)
- New rhythm-line pattern: cube sections are written note-by-note on the song's half-beat grid (spikes, double/triple spikes, blocks, pads, orbs) – every level now has hand-written intro and finale lines.
- Mode hints above portals on Easy–Harder levels (HOLD TO FLY, TAP TO FLIP, TAP = TELEPORT…).
- Jungle thorns recolored for readability.
- Bot check: all 9 levels beaten with 3- and 4-frame input resolution; Easy–Hard levels also with 6-frame (very forgiving) inputs.

## v2.3 – Flow (2026-10-21)
- Level intro banner with world name, difficulty and song title.
- Level Complete screen with MENU and NEXT ▶ buttons.
- Background beat pulse now follows the real audio clock, so it stays locked to the music even if the frame rate dips.
- Glowing hazard colors per world (lava glow, ghostly glow, neon glow) for better readability.

## v2.4 – New hazards & objects (2026-10-21)
- Spinning saw blades: half-buried ground saws, hanging saws, and saw fields in ship corridors (Jungle, Lava, Haunted, Factory, Neon).
- Blue gravity orbs: tap in mid-air to flip onto the ceiling over spike floors and back again (Candy, Ice, Haunted, Space, Neon).
- Factory saws are red/yellow so they stand out from the background gears.

## v2.5 – Richer music (2026-10-21)
- Every song now has its own signature instrument layer: water-drop blips (Sea), chiptune arps (Candy), marimba (Jungle), FM glass bells (Ice), distorted saw stabs (Lava), vibrato organ + bells (Haunted), metallic distorted stabs (Factory), shimmering space arps (Space), supersaw chords (Neon).
- Melodies alternate between two phrases on each loop so songs repeat less.
- Fixed a DC-offset bug in the distortion curve (verified with offline audio rendering: levels stay steady, no clipping).

## v2.6 – More detail (2026-10-21)
- New foreground layer in every world (shells & starfish, gumdrops, mushrooms & ferns, snow drifts & ice crystals, bubbling lava pools, jack-o'-lanterns & candles, pipes & beat-blinking warning lights, craters & glowing crystals, neon street lamps) scrolling faster than the action for depth; many elements pulse to the beat.
- Ceilings in ball/spider/gravity corridors get scalloped edges and textures.
- Squash & stretch when landing; death now breaks the icon into tumbling shards with a flash.
- Menu cards show a live-rendered thumbnail of each world.

## v2.7 – Moving obstacles (2026-10-21)
- Beat-synced crushers (pistons) that pump up and down with the music – timed so they rise just as you arrive (Lava, Factory, Neon).
- Moving saw blades that sweep up and down ship/UFO corridors on a 1–2 beat cycle (Haunted, Space, Neon).
- Engine supports time-based obstacles deterministically, so the bot verifier and practice checkpoints stay exact.

## v2.8 – Real coin challenges (2026-10-21)
- Coins are now placed off the easy path (above or below it by up to 2.5 tiles) so you have to go out of your way to grab them. The bot proves each level can be finished while collecting all 3 coins, and the demo replay grabs them all.
- Browser check (?verify=1): the baked replay wins all 9 levels with 3/3 coins inside the real game.
- Watching the demo replay no longer counts toward your own best % or coins.

## v2.9 – Pause (2026-10-21)
- Pause button (bottom-left, next to Home), P key or Esc: pauses the game and the music; MENU / RESTART / tap to resume. Auto-pauses when you switch tabs or apps.
- ICONS screen layout cleaned up (no more overlapping labels).

## v3.0 – Secret world: Rainbow Sky (2026-10-21)
- 10th world, unlocked with 9 coins: Rainbow Sky (Insane) – floating islands with waterfalls, hot-air balloons, birds, giant beat-pulsing rainbow, rainbow cloud blocks. Uses every mode + pistons, moving saws, gravity orbs, mini ship.
- New song: Rainbow Rocket (170 BPM drum & bass with chiptune arps).
- Menu shows the secret world button; Level Complete → NEXT respects locks.
- publish script now syntax-checks every JS file before pushing.
