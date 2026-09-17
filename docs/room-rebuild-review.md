# Hong Kong and New York room rebuild review

Reviewed on 2026-09-18. This revision replaces the static compositions of 48 rooms: 24 in Hong Kong and 24 in New York. The Kwun Tong print studio and Brooklyn Navy Yard workshop were rebuilt in the preceding revision. Their modules are unchanged here.

Each replacement removes the preceding layout and accumulated detail passes. Room IDs, collection order, and animation loops remain stable. Specialized object drawings and character gestures are reused where they fit the replacement scene. `dist/artwork/cities/structure.js` supplies physical components such as masonry, recessed windows, framed storage, basins, and floorboards. Room modules own their compositions.

## Review coverage

Every replacement was inspected at collection size, normal size, and close size. Review cards measured 300, 500, and 750 CSS pixels wide, with 16 pixels reserved for padding. Normal views use time zero. Close views use the midpoint of each room's loop. The review also includes the two preceding flagships for collection consistency.

The original collection was rendered at the same collection width. The original library, greenhouse, kitchen, and press were inspected at the same close width. Earlier room captures from `9ae4b1f` supplied the before views. The original library and kitchen remain useful references for concentrated warm light; that comparison led to darker boundaries and localized light in Quarry Bay, Central, and Harlem. The greenhouse informed the review of plant silhouettes and growth stages. The press informed the separation of working, storage, and cleanup areas.

The review records the visible changes and corrections below. It makes no collection-wide ranking against the originals.

## Hong Kong

| Room module | Replacement assemblies and arrangement | Close-view observation |
| --- | --- | --- |
| `aberdeen-mooring` | Rounded hull with canopy ribs; piled service jetty and maintenance bench | Cockpit wheel, boarding ladder, rope, and hull fenders remain separate from the rope-handling gesture. |
| `kennedy-town-tram` | Two-level tram cutaway; stair, cab, seating, and street shelter | Transparent windscreen exposes the controls. Upper seats and roof ribs establish the second level. |
| `sheung-wan-milk-tea` | Fitted washing and preparation area; curved service counter and boiler station | Filters, dish storage, serving cups, and cleanup occupy different surfaces around the pour. |
| `north-point-market` | Stepped produce stands; canopy and weighing cabinet | Analog scale, packing supplies, greens, and baskets are readable as separate work clusters. |
| `choi-hung-breakfast` | Fitted galley and storage alcoves; folding table, divan, and low breakfast setting | The moving table clears the room. Cooking, eating, and rest have distinct locations. |
| `mong-kok-flowers` | Terraced flower wall; wrapping bench and washing corner | Tall stems rise above the shelving. Wrapping stock, cut stems, and empty vessels surround the work area. |
| `sham-shui-po-fabric` | Full-height bolt storage; cutting bench and constructed sewing machine | Fabric rolls, hanging swatches, draped cloth, and machine wheel have different silhouettes. |
| `tsuen-wan-bamboo` | Braced scaffold with raised walkway; binding trestle and offcut storage | Lashings and braces remain visible through the structure. The central joint stays clear for the gesture. |
| `kowloon-bay-porcelain` | Open plate cabinet; painting station, washing area, and polygonal kiln | The active plate, glaze supplies, kiln handle, and packing dishes form separate stages of work. |
| `yau-ma-tei-opera` | Recessed curtain portal; wardrobe, lit vanity, and rehearsal floor | Costumes, cosmetics, gong, and open trunks frame the performers without covering them. |
| `harbour-ferry` | Cabin with curved roof ribs; three seat banks and emergency storage | Seat construction, luggage, life ring, and poles remain readable around the passengers. |
| `sha-tin-rowing` | Multi-level shell storage; maintenance trestles and oar station | Hull ribs and oar hardware are visible. The carried oar has room to move. |
| `tai-po-cycle` | Covered repair shop; wheel storage, parts counter, and service area | Parked bikes, pump, loose wheel, and repair mat distinguish storage from active work. |
| `sai-kung-kayak` | Stacked kayak rack; central rinse supports and trench drain | Hose reaches the work bay. Paddles, vests, basin, and ropes occupy the perimeter. |
| `tin-shui-wai-hide` | Raised observation deck; slit wall, rafters, counter, and field desk | Telescope, field books, seating, and packed equipment support the observation scene. |
| `lau-fau-shan-oysters` | Open shore shed; basket rack, sorting bench, and wash station | Sorted shells, working baskets, drainage, and washing basin remain distinct. |
| `tai-o-stilt-house` | Braced piles and raised deck; net frame, tea corner, and corrugated shelter | Table supports start at deck height. The net, fan, water, and steps establish different levels. |
| `lamma-parcels` | Roofed dispatch shelter; loaded trolley, packing bench, and parcel racks | Parcel stacks fit the trolley. Bicycle, crates, and loose packaging leave a route through the shelter. |
| `ping-shan-courtyard` | Tiled courtyard boundaries and arched opening; tree surround and stone game table | Roots, game pieces, repaired stool, and tea setting are visible around the two players. |
| `west-kowloon-sketch` | Tensioned shade canopy; tilted drawing desk and waterside seating | Paint pans, drying studies, sketchbook, and the cloud drawing remain visible below the canopy. |
| `tai-hang-dragon` | Curved body on trestles; framework storage and binding stations | The head, open frame, straw bundles, and binding stock show different construction stages. |
| `wan-chai-steps` | Two stair runs and landing; recessed door, glass canopy, and gutter | The umbrella gesture rests on the landing. Railings follow the step heights and runoff reaches the lower level. |
| `central-walkway` | Bridge trusses and framed glazing; maintenance cart and walking route | The squeegee meets the glass. Night tones distinguish the skyline, structural members, and floor reflections. |
| `quarry-bay-window` | Bed alcove and fitted kitchenette; aquarium stand and reading corner | Transparent tank faces preserve fish visibility. The lit aquarium and dark window establish the evening scene. |

## New York

| Room module | Replacement assemblies and arrangement | Close-view observation |
| --- | --- | --- |
| `staten-ferry` | Ribbed cabin and window band; separated seat banks and storage | Molded seats, handrails, luggage, and life ring read around the two passengers. |
| `hunts-point` | Loading opening and open produce rack; roller conveyor and pallet equipment | Rack platforms were replaced with rails so lower crates remain visible. Conveyor rollers and dispatch paperwork occupy separate stations. |
| `astoria-bakery` | Oven bank and hood; kneading bench, proofing rack, and packing area | The bench was narrowed to clear the worker's feet. Shorter, more widely spaced rack tiers expose the trays. |
| `bed-stuy-stoop` | Panelled entrance and stone stair; ironwork, basement grille, and planting stations | The watering target sits beside the matching step. Rail scrolls, pot rims, and the basement opening are visible close up. |
| `washington-heights` | Window and radiator; fitted kitchen, breakfast table, books, and divan | Adult and child have separate seats. Breakfast dishes, books, and kitchen storage occupy different heights. |
| `jackson-heights` | Striped canopy and recessed shop windows; game table, benches, and planters | Chess pieces, captured-piece tray, cups, and hanging bulbs remain visible around the players. |
| `chinatown-kitchen` | L-shaped preparation counter; steam station, hood, washing area, and tray rack | The preparation counter was reshaped to leave both workers on clear floor. Raised trays expose rows of dumplings. |
| `mott-haven-cycles` | Shop opening and parts storage; truing stand and wheel rail | The rotating wheel meets the stand. Spare wheels, tools, pump, and parked bikes remain outside the hand movement. |
| `greenbelt-center` | Timber interior and specimen storage; rounded examination table and field equipment | Specimen cards, cones, leaves, magnifier, and books remain distinct around the child and guide. |
| `theater-booth` | Framed stage view and equipment racks; sloped lighting console | Faders, knobs, meters, cue notes, cables, and the changing stage light remain legible. |
| `corona-trumpet` | Window seat and acoustic wall; music stand, record player, and instrument case | Score lines, open case, valve accessories, and records support the practice scene. |
| `sunset-roof` | Raised tank and pipework; planted beds, trellises, and potting bench | Larger, varied leaves reveal the harvest crop. An empty planting position contrasts with mature rows. |
| `map-room` | Archive shelving and flat files; joined map table, lamps, and book trolley | Weighted map corners, bridge marks, rolled sheets, and tracing tools remain visible. |
| `orchard-beach` | Thick handball wall and chain-link boundary; court markings and rest area | Court floor stays open for the rally. Fence mesh, water fountain, towel, bag, and drain occupy the edges. |
| `crown-heights-garden` | Three compost bays and pergola; sorting bench, rain barrel, and seedling beds | Open and closed bays show different stages. Hand tools, scraps, water connection, and seedlings support the activity. |
| `queens-panorama` | Bevelled model plinth and varied city blocks; exhibition lighting and viewing rails | Transparent rails preserve the model. Bridges, stepped towers, runway, and stadium remain visible at close size. |
| `st-george-stage` | Long illuminated vanity; open costume wardrobe, hanging rail, and seating | Reflected gesture, cosmetics, cuffs, garments, trunk hardware, and shoe-lacing remain distinct. |
| `east-harlem-dominoes` | Courtyard openings and planting edge; shaped game table and refreshment station | Domino pips, scorebook, standing hands, glasses, and overhead bulbs support the four-person game. |
| `coney-kites` | Shaded boardwalk bench and repair table; seaside rail and bounded amusement view | Kite ribs, line spool, spare materials, bag, and gull frame the parent-child exchange. |
| `bronx-boathouse` | Canoe storage frame and exposed rafters; drying rail and maintenance bench | Hull ribs, woven seats, vest buckles, paddles, rinse basin, and coiled rope remain visible. |
| `jamaica-bay` | Observation slit, roof frame, and timber deck; counter, telescope, and field storage | Binoculars, field books, marsh reeds, and packed equipment frame the bird view. |
| `lower-east-bedroom` | Supported loft and ladder; workspace, book storage, and window seating | Drawing order was corrected so furniture beneath the loft cannot paint over its mattress. The curtain still opens onto the fire escape view. |
| `red-hook-pier` | Piled timber pier and boarding ladder; rail, lights, and fishing station | Fenders, bollards, tackle, rope, and float sit on their respective deck or water planes. |
| `harlem-piano` | Rebuilt upright cabinet and pedal assembly; exposed action, score rack, and listening area | Keys, hammers, score, bench buttons, and fallboard remain readable. Dark walls and local light establish the late hour. |

## Validation

`node scripts/check-rooms.mjs` passes with 125 unique rooms across five collections, valid layout and hit targets, 909 sampled animation frames, and 50 declared loop boundaries. The frame checks cover 75 city rooms. `git diff --check` also passes.

Visual corrections include the tram windscreen, the raised house table supports, the produce rack, both kitchen work areas, tray spacing, rooftop planting, loft occlusion, panorama glazing, and evening light. Captures are stored locally in `/tmp/room-rebuild-review`. The matching before captures are in `/tmp/room-art-direction-review`.

In the application, both collections reached 25 rendered rooms with zero pending jobs and no reported errors. With reduced motion enabled, every rendered room remained at time zero before and after focusing a room. With motion enabled, the Harlem piano room advanced its animation time and reported no errors.
