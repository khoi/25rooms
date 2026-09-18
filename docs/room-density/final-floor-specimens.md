# Floor edges and botanical specimens

Reviewed on 2026-09-18.

| Room | Drawing change | Visual result |
| --- | --- | --- |
| `istanbul/shoe-vestibule` | Clamp each floor tile to the 12-unit room boundary. | The last row ends at the slab edge and leaves the slab face visible. |
| `mexico-city/mask-fitting` | Clamp the last border tile on both walls to the 12-unit boundary. | Both wall endpoints have clean floor edges without projecting tabs. |
| `cape-town/botanical-lens` | Reduce cabinet divider depth from 1.3 to 0.3 units. | Jars, mounted leaves, pods, folders, and drawers remain visible across the three bays. |
| `cape-town/botanical-lens` | Replace repeated sill leaves with a fresh clipping, an opened pod with sorted seeds, and a taped leaf mounting with a label. | Each preparation has a distinct silhouette and purpose. |

Normal renders at 800 pixels per room and close renders at 1600 pixels per room passed visual inspection. Motion samples at 0, 6, and 14 seconds show the existing shelf, mask, and lens sequences. The animated drawing code and loop durations are unchanged. `git diff --check` passed for the three room files.

Evidence is stored in `/tmp/rooms-final-floor-specimens/`:

- `botanical-before.png`: cabinet occlusion and repeated sill specimens before this pass.
- `normal.png`: the three rooms at their designated still times.
- `close.png`: the three rooms at twice the normal render width.
- `motion-0.png`, `motion-6.png`, and `motion-14.png`: inspected motion samples.

The render command uses `/tmp/rooms-200-render/density-render.mjs` with `--root /Users/Developer/code/github.com/khoi/a-small-light-somewhere-else` and `--rooms istanbul/shoe-vestibule,mexico-city/mask-fitting,cape-town/botanical-lens`. The normal render uses `--width 800 --columns 3`. The close render uses `--width 1600`. Motion renders use `--width 1000 --columns 3 --time SECONDS`. Each command supplies an `--out` path.
