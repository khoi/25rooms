# Room collection completion, 18 September 2026

The gallery now registers Hanoi, Barcelona, Paris, London, Istanbul, Mexico City, Cape Town, and Amsterdam. Each collection contains the 25 room IDs specified in its brief. The complete gallery contains 325 rooms across 13 collections.

This completes the integration left open in the [earlier audit](room-audit-2026-09-18.md). The existing draft modules and their [implementation notes](room-implementation/) are included in this delivery.

## Audit fixes

| Finding | Change and rendered result |
| --- | --- |
| Eight unreachable collections | Register all eight indexes. Navigation, room lookup, and tours use the full registry. The checker rejects navigation mismatches and city directories missing from the registry. |
| Jamaica Bay bird clipped out | Place the bird within the viewing opening's projected plane. The bird and its dipping head are visible beside the opening's right support. |
| Reduced motion always starts at zero | Use each room's `stillTime`. All 50 rebuilt Hong Kong and New York modules now declare a pose. The theater booth uses 3.5 seconds with a lit stage; Jamaica Bay uses 8 seconds with raised binoculars. |
| Bedroom furnishing omissions | Replace broad book storage with a supported rail, three shirts and hangers, and a shoe tray. Add a slatted laundry basket, folded clothing, a work bag, and low drawers. Extend the desk beyond the loft edge so its stationary mug remains visible. |
| Dressing-room furnishing omissions | Add the mending table, grouped thread spools, closed scissors, repair cloth, shoe-and-script shelf, round hat box, work bag, and wall clock. Keep the path between the performers clear. |
| Weak focus in three bright rooms | Reduce floor marking contrast and widen the boards in Washington Heights, Greenbelt, and the map room. Darker side walls separate the furniture from the room boundary. |

Nonzero still times also preserve the extended fabric measure, poised porcelain brush, breakfast gesture, leaf lens, rooftop harvest, shared model view, and released piano chord. Other rebuilt rooms explicitly retain their opening poses. Tokyo and the two older non-city collections retain their existing zero-time fallback.

## Verification

- `node scripts/check-rooms.mjs` passes for 325 unique IDs, 13 collection layouts, 275 city rooms, 3,969 sampled animation frames, and 250 declared loop boundaries. Every declared loop also has a valid still time.
- All 200 new room IDs match their city briefs. Each new city has 25 modules and an explicit index.
- Native `RoomPainter` captures compared time zero with each of the 250 declared loop endpoints at 700-pixel room width and fixed print jitter. No pixels exceeded the comparison threshold of 15 summed RGB levels. This verifies endpoint agreement, not every intermediate contact.
- Browser checks loaded all 13 collections with 25 ready rooms and no application errors. Previous and next controls wrap from the first room to the last. Room-only links select the correct collection.
- Browser emulation of reduced motion confirmed all 325 painted times match their declared still times or zero fallback, with automatic touring disabled.
- At 390 × 844, the menu exposes the 12 other collections within a scrolling panel and produces no horizontal page overflow. Selecting Hanoi works, and its automatic tour advances before pausing.
- The deployment artifact loads all 325 rooms after versioning all 1,606 relative JavaScript imports. Repeating versioning with the same version produces identical files.

The Pages workflow checks the collections before publishing. Its asset-versioning script includes imported room modules and the import map, so a newly versioned entrypoint does not reuse old room definitions.

## Visual review and limits

Fresh review covered every new room at collection scale, all 50 rebuilt Hong Kong and New York stills at room scale, and selected room-scale views from each new city. The repaired furnishings and observation opening received additional close views. The three contrast revisions were compared with the original library, kitchen, and press at matching widths.

Earlier implementation notes retain their individual room and animation reviews. This integration pass does not repeat every close view or certify every detail in the long city briefs. The new collections retain simpler figures and less concentrated lighting than some originals. Endpoint checks and successful browser loading do not establish artistic equivalence.

Fresh images, loop results, the packaged preview, and browser results are in `/tmp/rooms-finish/`. These temporary files are outside the repository.
