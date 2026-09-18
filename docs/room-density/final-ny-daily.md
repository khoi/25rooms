# New York daily-life rooms: final density revision

Edited only `dist/artwork/cities/new-york/staten-ferry.js` and `dist/artwork/cities/new-york/washington-heights.js` in the shared checkout. Existing animation contact points, loop durations and still poses are unchanged.

| Room | Reconstructed environment | Lived-in relationships | Visual review |
|---|---|---|---|
| Staten Ferry | Replaced generic folded stock in the foreground cabinet with restrained safety garments, rope and a vessel; added locker restraint hardware, an abstract equipment panel, door ventilation and threshold, wall telephone with cord, supported fold-down ledge. Window light patches and individual bench shadows break up the formerly uniform deck. | Sleeping passenger has an open tote with paper contents, a draped coat and thermos beside the lunch container. The sipping passenger has a small breakfast tray beside the existing book and luggage. These objects sit with their users, not in the walking aisle. | Inspected 240px collection, 800px normal, 1400px close, and 0/5/11/16-second phases. Sipping hand remains clear; stroller and safety locker form a purposeful foreground group. Fine hardware remains close-view detail. Empty seats and a continuous aisle remain intentional. |
| Washington Heights | Replaced the large repeated-book unit with a lower household sideboard containing linen, a basket, two albums, stacked plates, sewing supplies and a radio. Added a fitted bread-preparation peninsula and refrigerator with a basket and attached personal papers. Directional window light and furniture shadows establish warm breakfast and cooler perimeter zones. | Loaf, crumbs and knife connect the preparation board to breakfast. Sewing tin, loose thread, laundry and hanging cloth suggest unfinished household work. Family pictures, a marked album, radio, school bag and spectacles give the domestic surfaces distinct uses. | Inspected 240px collection, 800px normal, 1400px close, and 0/5/11/14-second phases. The breakfast hands and pointing gesture stay visible. The new counter stops behind the dining pocket; passage from foreground to the window remains open. Small sewing contents and refrigerator papers require close viewing. |

Evidence actually opened:

- `/tmp/ny-daily-final-normal.png` — both rooms at 800px.
- `/tmp/ny-daily-staten-ferry-close.png` and `/tmp/ny-daily-washington-heights-close.png` — 1400px.
- `/tmp/ny-daily-<slug>-collection.png` — 240px for both slugs.
- `/tmp/ny-daily-<slug>-start.png`, `-hold.png`, `-return.png`, `-endpoint.png` — four 800px phases for both slugs.

`node scripts/check-rooms.mjs` passed: 325 unique rooms across 13 collections; valid layout and hit targets; 300 authored rooms drew in 4144 sampled frames, including 250 declared loop boundaries. This verifies geometry and metadata, not parity with the original collection. The added light uses the established printed stipple treatment, and both rooms retain deliberate circulation space.
