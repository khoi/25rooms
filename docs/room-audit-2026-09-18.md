# Room implementation audit, 18 September 2026

The Hong Kong and New York rebuilds render, but they do not complete every item in the room plans. The largest unfinished delivery is the eight additional city collections: their 200 room modules exist locally, but the gallery does not register them.

This audit reviews `184bf47`, the preceding centerpiece revision `9ae4b1f`, and the room briefs updated in `63eb8ec`. The working tree already contained eight untracked city directories, implementation notes, and edits to the README, navigation, renderer, and checker. Those changes are distinguished from committed behavior below.

## Confirmed gaps

### 1. Eight city collections are unreachable

**Priority: high. Scope: existing working-tree changes.**

[collections.js](../dist/artwork/collections.js) still exports five collections with 125 rooms. Each of Hanoi, Barcelona, Paris, London, Istanbul, Mexico City, Cape Town, and Amsterdam has a local index exporting 25 rooms. All 200 IDs match their plans, and every new room declares a loop duration and a still time.

The pending navigation exposes the eight city links, and the pending README advertises 325 rooms. Opening `/?collection=hanoi&fit` nevertheless displays Tokyo. The browser reports `collection: "tokyo"`, 25 ready rooms, and no errors because [main.js](../dist/main.js) silently falls back to the first registered collection. The other seven IDs are absent from the same registry.

Remaining work includes collection registration, checks that cover all 325 rooms, and browser review of navigation, deep links, tours, and reduced motion for the new cities. The new room artwork exists as draft source. This audit does not establish its visual completeness.

Evidence: `/tmp/room-audit-2026-09-18/hanoi-fallback.png`.

### 2. Jamaica Bay's bird is completely clipped out

**Priority: medium. Scope: committed rebuild.**

The [Jamaica Bay brief](new-york-rooms.md#22-a-quiet-opening-jamaica-bay-bird-blind) includes a distant bird that dips its head. The bird is absent at 0, 4, 8, 10, and 12 seconds in the inspected captures.

In [jamaica-bay.js](../dist/artwork/cities/new-york/jamaica-bay.js), the live layer clips the bird to `H.faceI(0.22, 4.22, 11.39, 1.4, 2.51)` but positions it at `H.p(9.8, 1.35, 0.08)`. The clip's maximum local x coordinate is 236.48. The bird's anchor is at x 270.4, and its leftmost geometry is still outside the clip. Head movement never changes that horizontal separation.

The animation exists in source but cannot appear. Its placement needs to share the observation opening's projected coordinates.

Evidence: `/tmp/room-audit-2026-09-18/jamaica-bay-close.png`, `contact-4.png`, and `contact-12.png` in the same directory.

### 3. Selected reduced-motion poses remain unfinished

**Priority: medium. Scope: committed behavior, with partial working-tree support.**

None of the 50 Hong Kong and New York definitions declares `stillTime`. The committed renderer always paints time zero for reduced motion. The pending renderer edit supports `definition.stillTime ?? 0`, but these 50 definitions still fall back to zero.

Time zero is acceptable for some rooms. It does not satisfy every planned still pose:

- The theater booth brief calls for a partly raised fader and an already lit stage. Its live layer sets the cue intensity to zero at time zero.
- Jamaica Bay calls for binoculars near the face. Its clip starts in the lowered, seated pose and raises the binoculars later.

Browser emulation of reduced motion confirmed the theater room remains at time zero. Selecting appropriate times, and verifying each pose against its brief, remains necessary. The eight draft cities already provide this metadata. Tokyo's older definitions also lack explicit loop and still-time metadata, outside the latest rebuild's scope.

Evidence: `/tmp/room-audit-2026-09-18/theater-reduced.png`, `still-0.png`, and `still-4.png`.

### 4. Planned furnishing groups are absent after the rebuild

**Priority: medium. Scope: committed rooms and their current briefs.**

The replacement architecture is present, but the detail inventories were not fully carried into the new layouts. These are confirmed examples, not an exhaustive count of missing props:

| Room | Planned work that remains absent |
| --- | --- |
| [Lower East Side bedroom](new-york-rooms.md#23-the-other-morning-lower-east-side-loft-bedroom) | The open garment rail with three shirts and hangers, shoe tray, slatted laundry basket, and entrance work bag. The rebuilt room instead has broad book storage, a loft, and lounge furniture. |
| [St. George dressing room](new-york-rooms.md#18-five-minutes-st-george-theater-dressing-room) | The mending table with thread spools and closed scissors, the shoe-and-script shelf with its round hat box, and the wall clock. The vanity, wardrobe, costume rail, trunk, and seated performer are present. |

The bedroom also keeps the mug attached to the worker's hand, while its brief places the mug on the desk. That is a plan-to-implementation difference, rather than a rendering failure.

These inventories need reconciliation: restore the intended activities and objects, or revise the briefs to record deliberate omissions. Existing review notes should not be treated as proof that every listed discovery remains visible after a later rebuild.

Evidence: `/tmp/room-audit-2026-09-18/bedroom-close.png`, `suspect-close.png`, and `new-york-17-20.png`.

## Visual quality assessment

This is a judgment from the captures, separate from the defects above. The new boat hulls, tram cutaway, bamboo platform, stepped stoop, workshop chairs, and model gallery have recognizable construction and distinct silhouettes. They are substantial implementations.

The remaining art-direction work is contrast and focus. In the bright domestic and work rooms, similarly weighted floor texture, wall marks, shelving, and furniture compete with the small people and their hands. Washington Heights, Greenbelt, and the map room are examples. The original library and kitchen create a clearer focal area through concentrated light and darker surroundings at the same capture width. Quarry Bay, Central, and Harlem already use stronger dark boundaries, so this finding does not apply uniformly.

A claim that every revised room reaches the original collection's visual standard is not supported by this review. More decorative objects alone would not resolve the contrast problem.

## Verification and limits

- All 50 Hong Kong and New York rooms were freshly rendered with the actual `RoomPainter` and inspected at 240-pixel collection width and 650-pixel room width at time zero.
- All 50 were also inspected at 500-pixel width at the midpoint of their declared loops. Selected rooms received 800- to 1000-pixel captures at additional times.
- Both collections loaded 25 ready rooms in the real browser gallery with no reported errors. Normal animation time advanced. Focused browser captures confirmed the Jamaica Bay and reduced-motion findings.
- The original library, kitchen, press, and greenhouse were captured at the same 650-pixel width for comparison.
- `node scripts/check-rooms.mjs` passed: 125 unique rooms, five collections, 75 city rooms, 909 sampled frames, and 50 declared loop boundaries.
- The existing local harness, `node /tmp/rooms-200-render/check-partial.mjs`, separately checked the 200 draft rooms across 2,000 frames with no missing modules or coordinate errors.

Coordinate checks establish valid drawing inputs. They do not detect clipped birds, missing props, incorrect still poses, contact errors, or discontinuous animation. Two phase captures per room do not establish full-loop visual correctness. The 200 draft rooms received an inventory and drawing check, not a complete visual audit. The deployed site was not audited.

All fresh screenshots and contact sheets remain in `/tmp/room-audit-2026-09-18/`. This report changes no room artwork or application behavior.
