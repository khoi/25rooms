---
name: create-room
description: Research a city and design 25 richly furnished, distinct animated isometric rooms for 25rooms, with layered detail and close-up discoveries. Use when given a city to create a room collection or a comprehensive city room plan; continue into implementation when explicitly requested.
---

# Create room

Turn a city into exactly 25 new miniature scenes, with enough researched detail for each room to be drawn and animated. Match the visual construction and density of the original collection while letting the new city's geography, people, materials, and daily rhythms determine its subjects.

Make every room feel complete, inhabited, and worth exploring. The first glance should reveal a striking composition; a longer look should keep revealing objects, relationships, and small stories. Carry this richness through both the brief and the rendered artwork.

## Input and scope

- Accept a city name, with an optional country, period, season, or creative direction. Infer the country when the city is clear. Ask one short question if ambiguity would change the research; otherwise start.
- A city name or a request to come up with rooms means research and a complete design brief. If the user also asks to build the rooms, carry the work through implementation. Do not turn a planning request into an unrequested code or deployment change.
- Default to contemporary daily life. Historical scenes need an explicit period and appropriate research. Individual rooms may depict different seasons, but identify them rather than presenting incompatible events as one literal day.
- In the 25rooms repository, inspect the original rooms in `dist/artwork/drawings.js`, the collection registry, and existing city briefs and rooms. Read [the original-room benchmark](references/original-room-depth.md) before designing or revising artwork. Render the originals and study their code; a prose brief or another recent city collection is not sufficient as the quality reference.
- If this city already has a collection, design 25 additional scenes with distinct IDs and subjects. Preserve the existing collection and brief unless the user asks to replace them.

## Research the city

Browse before choosing the final rooms. Search both citywide and neighborhood sources. Where useful, use local-language sources to resolve architecture, objects, customs, or processes that broad travel summaries miss.

Prefer municipal and official neighborhood resources, local museums, cultural institutions, transit operators, craft organizations, and firsthand accounts from relevant makers or venues. Open the supporting pages. A search snippet alone is not evidence for a detailed claim.

Research housing, working life, transport, food preparation, markets, creative communities, crafts, shared spaces, nature, and evenings. Include country-level traditions only where their connection to this city is supported. Look beyond landmarks for details such as window forms, storage habits, tools, weather adaptations, and ways people share space.

Keep notes connecting each useful fact to its source URL and the room it informs. Verify specific processes before choreographing them: the tools, handling of materials, and order of operations. For time-sensitive claims, such as whether a venue still operates, check recent evidence.

Separate documented facts from original design choices. A fictional workshop can draw on a documented local craft without claiming to reproduce a particular business. If a detail cannot be verified, use a clearly fictional, plausible alternative or omit it. If browsing is unavailable, disclose that limitation and label the result as an unverified concept draft.

## Compose the collection

Privately develop more candidates than needed, then select exactly 25. Compare their neighborhood, activity, architecture, dominant shape, time of day, lighting, and main animation. Replace candidates that differ mainly in decoration.

Represent both recognizable city identity and ordinary life. Include homes, work, movement, culture, and shared spaces as the city's evidence supports them. Avoid concentrating the collection in tourist districts or reducing a country to food, costumes, monuments, and festivals. Represent contemporary clothing and different occupations naturally; use ceremonial dress in its actual context.

Choose a deliberate tour order. A journey through changing light, neighborhoods, or daily routines can provide continuity. Optional recurring possessions or an original motif should connect selected scenes without making every room repeat the same joke.

Follow these 25rooms composition conventions unless the current project or user specifies otherwise:

- Use a roughly 12-by-12 isometric footprint with open front edges. A courtyard, carriage, boat cabin, or rooftop can function as a room with equivalent boundaries.
- Give each room one dominant silhouette visible in the full collection, one human activity readable at normal zoom, and discoveries at close range.
- Place landmarks in a window, skyline strip, or bounded background when appropriate. Keep the room and its activity as the subject.
- Preserve the paper, blue, teal, coral, and sun palette and established printed drawing style. Suggest materials through tone, pattern, and shape.
- Keep artwork free of lettering. Put names in captions; use shapes and original abstract designs for signs, packaging, and covers instead of invented local-language text.
- Leave circulation space and clear sightlines to hands and actions. Detailed rooms still need quiet areas and a hierarchy of objects.

## Build richness into every room

Design detail at three viewing scales: a memorable silhouette in the collection, several readable clusters at normal zoom, and small discoveries up close. Give every room one standout feature whose construction, contents, or operation rewards attention, such as an elaborate workbench or a layered courtyard stair.

- Arrange six to ten purposeful clusters around the main activity. A work area, storage wall, personal corner, threshold, and window ledge can each tell a different part of the story. Specify their positions and relationships so the room reads as a connected place.
- Aim for 60–90 distinct, drawable details per furnished room, spanning architecture, furniture, equipment, supplies, personal belongings, and traces of use. Count repeated bottles, tiles, books, or identical containers as a group. Extra drawing primitives and repeated patterns do not establish richness by themselves.
- Distribute interest across foreground, middle, and rear, with detail at floor, furniture, and wall heights. Use shelves, recesses, hanging tools, exposed fittings, windows, and under-counter storage where the setting supports them. Avoid concentrating everything on one table while the rest of the room stays bare.
- Develop the main fixtures beyond plain blocks. Describe visible construction and contents: a bench can have joined legs, a worn edge, an open tool tray, a cloth caught under a clamp, and offcuts below. Choose details specific to the room's activity and materials.
- Show relationships between objects: a lid beside its vessel, a drying rack above a drip tray, repaired fabric beside matching thread. Include evidence of preparation, work in progress, and personal habits that makes sense even when nobody moves.
- Place six to ten small discoveries in different parts of the room. Vary their character across craft, wear, personal possessions, and quiet humor. Make them large and visible enough to find at the supported close view.
- Reserve open areas for circulation, the main gesture, and visual rest. Give each substantial open area a compositional purpose. If the room feels empty, revise its layout and add useful secondary activity or furnishing. If it feels crowded, regroup details and strengthen the focal hierarchy.

Build at least two substantial assemblies in each room: for example, a fitted preparation counter and an operating machine, or a window bay and an intricate planted bed. Give each visible construction, depth, material transitions, contents, and connections to neighboring objects. Develop roughly eight to fifteen meaningful parts per assembly. A rectangular box with a handle is a starting shape, not a completed fixture.

Use these counts as design prompts, not acceptance tests. A repeated row, decorative hatch, dot field, or hidden object does not add a discovery. Outdoor and deliberately quiet scenes can use fewer possessions while achieving comparable richness through terrain, growing things, structural joinery, weather, and inhabited edges.

A quiet or unoccupied scene still needs a complete environment. Express richness through joinery, fabric folds, storage, weather, maintenance, and traces of daily life appropriate to that setting. Let the subject determine the details; avoid repeating the same plants, cups, crates, and rugs across the collection.

## Write every room in full

Give all 25 rooms comparable attention. Aim for roughly 650–900 words per room for the comprehensive default, expanding when the layout or process needs explanation. Use concrete spatial descriptions and named objects. Meet the richness criteria above; word count alone does not make a complete brief.

For each numbered room, include:

1. **Title and ID.** An evocative title, a plain setting, and a unique `<city-slug>-<scene-slug>` ID suitable for a later JavaScript module.
2. **Local grounding.** The neighborhood or setting, what connects it to this city, the time and season where relevant, and a source link supporting that connection. Identify fictional premises and composite layouts.
3. **Architecture and layout.** Floor and wall materials, openings, levels, built-in features, and the positions of the main furniture or equipment. Describe the dominant shape, detail across all three depth layers, vertical features, and clear route through the scene. Locate the six to ten clusters and deliberate open areas.
4. **Objects and materials.** Describe the 60–90 details by cluster, with placement, material, and a visible distinguishing feature for the key objects. Separate the main fixtures, supporting objects, and close-up details through their size and placement. Explain how tools, supplies, and possessions relate to the activity. Avoid vague phrases such as “shelves full of things.”
5. **People and activity.** Who occupies the room, where they stand or sit, what they are doing, and how their posture or interaction tells a small story. A solitary or temporarily empty scene can be appropriate if intentional.
6. **Animation.** One main action with an ordered sequence, an approximate loop duration, and two to four restrained secondary movements tied to the room. Vary their timing and include pauses so everything does not move together. State how the scene returns to its starting state. Use pauses, occlusion, or entrances for transitions rather than visible teleporting or objects resetting in place.
7. **Still pose.** A reduced-motion composition that preserves the room's identity and human story without relying on a running animation.
8. **Light and color.** The source and direction of light, warm and cool areas, and the palette's use for local materials and focal points.
9. **Small discoveries.** Identify six to ten personal, imperfect, intricate, or gently humorous details, with their exact locations. Describe what viewers can notice and how those discoveries reveal the occupants or activity. Make them visible through the artwork rather than explanatory text.
10. **Distinctive role.** Why this scene earns a place among the 25. If it shares a category with another room, distinguish their activity, composition, and emotional tone.

These details may form connected paragraphs rather than ten repeated subheadings. Attach citations to the factual claims they support. A broad neighborhood page does not validate an exact machine, ritual, or interior arrangement; cite a focused reference or describe that element as a design proposal.

## Deliver and review

In the project, save the complete brief to `docs/<city-slug>-rooms.md`. If that path already contains work, choose a distinct descriptive suffix for an additional collection. Outside a project, deliver the full brief in the conversation unless the user requests a file.

Start the brief with the collection's identity and shared visual direction. Follow with the 25 detailed rooms in tour order. End with the reasons for that order, distinctions between similar scenes, any recurring motifs, unresolved reference needs, and the research date. Keep source links beside relevant facts.

Before delivery, verify:

- There are exactly 25 fully developed rooms with unique IDs, and none silently repeats an existing room.
- Each room has credible local grounding and a specific composition, activity, object set, and animation.
- Every room meets the richness criteria: purposeful clusters, details across depth and height, developed fixtures, and several visible discoveries. Repeated filler does not satisfy the detail target.
- Mentally tour each room from its front edge to its rear wall. Resolve bare zones, vague inventories, hidden discoveries, and objects with no plausible purpose before delivery.
- The collection represents this city rather than a generic national collage. Traditions, materials, seasons, and tools are consistent with the stated context.
- Loops have coherent beginnings and endings. Doors, vehicles, people, machines, and handled objects move in a sensible sequence.
- Still poses remain legible, and foreground objects, smoke, reflections, or landmarks do not obscure the main activity.
- The final entries have the same depth as the first ones. Research limitations and fictional details are clear.

Link the saved brief and briefly describe the collection in the final reply. Do not ask for implementation approval as a required final step when the user only requested a plan.

## When implementation is requested

Read the current drawing helpers, painter, layout, collection registry, and at least three relevant original rooms before coding. Inspect one original with similar architecture, one with a related activity, and one with strong lighting or material treatment. Follow the benchmark reference to translate what they do into the new scene. In 25rooms, use one complete JavaScript module per room under `dist/artwork/cities/<city-slug>/`, with an explicit collection index in tour order. Use a separate collection directory for an additional set for the same city. Keep unique details with their room and share only reusable forms. Follow repository instructions and preserve existing collections and navigation behavior.

For a density revision, diagnose which layers are missing before adding props. Rework the architecture, major fixtures, spatial relationships, and materials where needed; appending the same accessory shelf to every room cannot satisfy this task.

Complete one representative room per collection and compare it with a relevant original at the same displayed width before scaling the work to the remaining rooms. Continue autonomously within the requested implementation scope.

Translate each room's clusters and discoveries into visible artwork. Build the architecture and main fixtures, add the supporting contents, then add material detail and traces of use. Keep a per-room checklist from the brief while implementing so later rooms retain the same depth. Shared helpers should describe physical forms, not stamp a complete furnishing layout into every room. Keep the distinctive assemblies and arrangements in their room modules. Draw rear architecture before furniture, ground shadows before objects, and foreground fixtures in the appropriate depth layer. Material marks must follow surfaces, and every hanging or elevated item must have a visible support.

If the user requests subagents, divide the rooms into bounded groups with explicit file ownership. Give each worker the shared palette, scale, brief, and module contract. One coordinating agent integrates the collection and checks consistency across all 25 rooms.

Validate the new collection's count, IDs, drawing coordinates, and animation states with the project's existing checks, updating hardcoded collection assumptions where needed. Review representative transitions and loop boundaries, and follow the session's rules for browser testing. Do not report implemented rooms on the strength of the design brief alone.

Visually inspect every implemented room at collection scale, normal viewing size, and the supported close view. Check that the silhouette and main action read clearly, the room feels furnished throughout, and the small discoveries are visible. Review still poses as well as animation. Place the rendered collection beside the originals at matching scale. Compare occupied wall area, fixture complexity, foreground interest, light hierarchy, and discoverable relationships. Inspect every room, including the last entries; a contact sheet does not replace normal and close views. Fix sparse areas, indistinguishable objects, repeated filler, unsupported fixtures, and occlusion before declaring the collection complete. Save a concise per-room review record with the implementation so visual acceptance is auditable. Primitive counts, code length, and passing coordinate checks cannot substitute for visual review. If visual inspection is unavailable, report that validation gap explicitly.
