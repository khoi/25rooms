# Paris and London final detail review

Four room modules were revised for khoi on 2026-09-18. Their footprints, room IDs, palettes, still times, loop durations, and action contacts remain unchanged.

| Room | Final correction | Visual result and limits |
| --- | --- | --- |
| `paris/photo-contact` | Replaced repeated contact images with bridge, street, and boat compositions. Added selection borders, a rejected frame, crop corners, and a related comparison print. | The tilted board now reads as an editing task. Small marks need the close view. The loupe and photographer keep their existing motion. |
| `paris/attic-pattern` | Added a long pattern bench under the eaves, folded fabric storage, weighted paper, a rule, and roll ends. Extended the form with a coral garment, pleats, waist tape, and a pale unfinished front. | The fitting silhouette has more weight beside the retained removable sleeve. The bench occupies the empty wall edge while the central fitting route stays open. The existing small body proportions remain. |
| `london/wetland-listen` | Replaced uniformly spaced reeds with five uneven clumps and water gaps. Added layered banks, darker near water, a swimming duck, and a standing heron. | The opening has distinct silhouettes and depth. Its shallow height limits distant detail. The shutter, rope, binocular action, and viewing seats remain unchanged. |
| `london/canal-cafe` | Differentiated cabinet bays with uneven cup stacks, opened packets, nested trays, plates, and folded cloth. Differentiated the two pastry rows. | Stock now shows separate uses instead of repeated boxes. Packet folds and pastry finishes need the close view. The cup transfer and aisle remain clear. |

Evidence opened and inspected:

- `/tmp/final-paris-london-normal.png`: all four rooms at 800px, using their declared still times.
- `/tmp/final-paris-london-close.png`: all four rooms at 1400px, using their declared still times.
- `/tmp/final-paris-london-motion.png`: all four rooms at 800px and 3 seconds, showing the lower sleeve, moving board, opening shutter, and cup lift.

Generate these sheets with `/tmp/rooms-200-render/density-render.mjs`, passing `--rooms paris/photo-contact,paris/attic-pattern,london/wetland-listen,london/canal-cafe`, `--columns 2`, the desired `--width`, and an `--out` path. Use `--time 3` for the motion sheet.

Validation: `node scripts/check-rooms.mjs` passed with 325 unique rooms across 13 collections, valid layout and hit targets, and 300 authored rooms drawn in 4144 sampled animation frames, including 250 declared loop boundaries. No shared renderer or animation timing changed.
