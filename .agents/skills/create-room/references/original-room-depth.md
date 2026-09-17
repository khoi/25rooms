# Original-room depth benchmark

Use this reference when working in the 25rooms repository. The benchmark is the rendered original collection and its construction in `dist/artwork/drawings.js`. Preserve its drawing language while designing a different place.

## What to inspect

Render the full original collection, then view at least three relevant rooms at the same display width as the proposed work. Search the original source by room ID; line numbers change.

| Original | Construction worth studying | Apply the principle |
| --- | --- | --- |
| `library` | Recessed bookcases, stiles, plinth drawers, deep shelves, upright and leaning books, horizontal stacks, rug fringe and localized lamp light | Build inhabited wall systems with varied contents and actual recesses. Avoid isolated low cabinets on otherwise empty walls. |
| `press` | Drying rails and pegs, offset proofs, worktop storage, sink and rag rail, machine drums, paper handling, conduit clips, task lamps, tools in use | Connect input, work, drying, storage and cleanup. Develop the machine as a mechanism with feet, fasteners, controls and materials passing through it. |
| `kitchen` | Multi-plane window sill, distant lit windows, radiator and towel, fridge magnets, split doors, dish racks, coat hooks, localized warm light | Fit domestic life into architectural edges. Give each appliance and furnishing a particular construction and signs of use. |
| `greenhouse` | Thick glazing bars, transoms, brick knee walls, multiple outdoor planes, sill projections, repaired floor tiles and varied plants | Make boundaries into deep structures. Plants need species-like silhouettes, stems, branching, pot rims and believable support. |
| `loom` or `map` | Specialized apparatus, related materials, tools and stored work | Make the activity legible through the objects and their relationships even at time zero. |
| `apartments` or `bridge` | Multiple occupied levels, built-in lighting, edges and changes in height | Use vertical composition and layered thresholds where the subject supports them. |

Borrow construction principles, not the original room's object list or layout. City details must still arise from research and the chosen activity.

## Build in layers

1. Establish the scene's silhouette, the main action and a clear route. Mark foreground, middle and rear clusters before drawing accessories.
2. Construct the envelope: wall depth, reveals, glazing, joinery, sills, thresholds, structural bays and plausible service routes. Choose details appropriate to the building; do not apply the same decorative trim everywhere.
3. Build the main fixtures as assemblies. Include supports, joints, recesses, moving parts, access panels, contents and wear. Large flat faces need structural explanation, not uniform texture.
4. Connect fixtures through activity: unprocessed material, a partly completed piece, tools within reach, a finished piece, and cleanup or storage. Avoid arranging everything like a catalog display.
5. Furnish several heights. Use under-counter compartments, wall racks, hanging supplies, tall cabinets, ledges, lighting and foreground containers where they belong. Preserve the hands and the important animated movement.
6. Add material-specific marks at a legible scale: cloth hems and folds, metal seams and brackets, chipped enamel edges, paper layers, timber end grain, drainage joints or botanical branching. Localize wear to contact points.
7. Add six to ten discoveries with different roles and locations. Examples include a repaired hinge, a mismatched replacement part, a half-finished task, a personal memento, a slipped offcut, or a tool returned to its particular holder. Make the relationship visible.
8. Use lighting and shadow to separate planes and lead the eye. Establish contact shadows and dark recesses before objects, then accents and reflections. Texture cannot compensate for weak light hierarchy.

## Drawing coordinates

In this repository, `wallPt` and `wallRect` use a positive offset for the outside of a wall. Use a negative offset when projecting a shelf, rail, or frame into the room. Check the actual helper definition before treating an offset as interior depth. A finite coordinate check cannot detect a hanging fixture drawn on the wrong side of the wall.

## Drawing coordinates

In this repository, `wallPt` and `wallRect` use a positive offset for the outside of a wall. Use a negative offset when projecting a shelf, rail, or frame into the room. Check the actual helper definition before treating an offset as interior depth. A finite coordinate check cannot detect a hanging fixture drawn on the wrong side of the wall.

## Review the actual result

For the first completed room, capture an original reference and the new room at the same displayed width. Compare them without reading the brief. If the original has several layers of fitted activity while the new room reads as a few boxes surrounded by floor, redesign the room before producing the rest.

For every room, inspect the collection view, a normal view, a close view, and a still pose. Inspect the main animation through its transitions. Record the two developed assemblies, principal clusters, visible discoveries, and any occlusion fixes. The review can be a compact table in an implementation note.

A passing room has a distinct silhouette, an immediately readable activity, several meaningful clusters at normal size, and new discoveries close up. Its rear and foreground are both designed. Details have perspective, attachment, scale and material. The last rooms receive the same attention as the first.

Reject density made mostly from repeated tins, plants, generic shelves, arbitrary lines or halftone noise. Repetition is appropriate for a material or inventory, but it counts as one group. More source lines, drawing calls or prose do not prove a richer room.
