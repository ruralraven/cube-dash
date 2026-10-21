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
