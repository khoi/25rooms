# New York growing and music rooms: final revision

Changes were made directly to the current main-checkout versions of the three assigned modules, preserving concurrent work elsewhere. Room footprints, action contact points, clip keys, loop lengths and still times remain unchanged.

| Room | Visible revision | Visual review and limits |
| --- | --- | --- |
| Greenbelt Center | Replaced repeated cabinet leaf trays with distinct fern sheets, winged seed twigs, bark pieces, tree-ring sections, pressed folios, differing observation pots and cones. Replaced eight repeated foreground crates with a working leaf press, layered blotters, screw handles and preparation specimens. Reduced central leaf sizes and differentiated the four study preparations. | Normal and close views show distinct silhouettes and processes instead of repeated oversized leaves. Child lens and guide hand remain clear in start, hold, return and endpoint. Illustrations remain stylized rather than species identification diagrams. |
| Sunset Roof | Rebuilt bed contents as three visibly different growth groups: broad overlapping rosettes, taller branching fruit plants, and mixed upright leaves with climbing growth. Changed spacing and growth sizes, kept a harvested gap, and retained mature/seedling scale separation. | Enlarged the first rosette draft after normal-size review found it too sparse. Final normal/close images show botanical variation without added floor patterns. Harvest contact and basket occlusion stay unchanged across the sampled phases. The plants retain a deliberately graphic, angular style. |
| Corona Trumpet | Built a tall music cabinet with upright and stacked volumes, radio, photograph and folded textile, filling the formerly blank rear corner. Added window-seat reading and cup traces, a clock, cushion/cardigan on the playing chair, a cleaning snake with brush ends, tapered practice mute, oil-bottle cap, care lamp and fitted case recesses. Strengthened the local practice light and introduced a restrained window-light wedge. | Normal and close views now show connected listening, reading and care clusters at several heights. The central route and horn gesture remain clear in start, playing hold, lowering and endpoint images. The central rug remains intentionally open around the musician. |

Every final image below was opened and inspected. Evidence directory: `/tmp/rooms-density-2026-09-18/`.

For each slug `greenbelt-center`, `sunset-roof`, and `corona-trumpet`:

- `final-<slug>-normal.png`: 800px room width, still pose.
- `final-<slug>-close.png`: 1400px room width, still pose.
- `final-<slug>-start.png`, `final-<slug>-hold.png`, `final-<slug>-return.png`: 0s, 5s and 10s at 500px.
- `final-<slug>-end.png`: exact loop endpoint, respectively 18s, 14s and 12s.

Validation passed: `node scripts/check-rooms.mjs` reported 325 unique rooms across 13 collections, valid layout and hit targets, and 300 authored rooms drawing in 4144 sampled animation frames, including 250 declared loop boundaries.
