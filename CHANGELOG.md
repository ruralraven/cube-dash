# Cube Dash Changelog

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
