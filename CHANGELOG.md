# Cube Dash Changelog

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
