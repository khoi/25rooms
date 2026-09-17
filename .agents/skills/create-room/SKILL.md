---
name: create-room
description: Research a city and design 25 detailed, distinct animated isometric rooms for 25rooms. Use when given a city to create a room collection or a comprehensive city room plan; continue into implementation when explicitly requested.
---

# Create room

Turn a city into exactly 25 new miniature scenes, with enough researched detail for each room to be drawn and animated. Follow the depth of the Tokyo collection while letting the new city's geography, people, materials, and daily rhythms determine its subjects.

## Input and scope

- Accept a city name, with an optional country, period, season, or creative direction. Infer the country when the city is clear. Ask one short question if ambiguity would change the research; otherwise start.
- A city name or a request to come up with rooms means research and a complete design brief. If the user also asks to build the rooms, carry the work through implementation. Do not turn a planning request into an unrequested code or deployment change.
- Default to contemporary daily life. Historical scenes need an explicit period and appropriate research. Individual rooms may depict different seasons, but identify them rather than presenting incompatible events as one literal day.
- In the 25rooms repository, inspect `docs/tokyo-rooms.md`, the collection registry, and existing city rooms for the current visual language and subjects already used. Treat Tokyo as a depth reference, not a list to relabel for another city.
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

## Write every room in full

Give all 25 rooms comparable attention. Aim for roughly 200–350 words per room for the comprehensive default. Use concrete spatial descriptions and named objects; do not substitute a list of themes for the finished brief.

For each numbered room, include:

1. **Title and ID.** An evocative title, a plain setting, and a unique `<city-slug>-<scene-slug>` ID suitable for a later JavaScript module.
2. **Local grounding.** The neighborhood or setting, what connects it to this city, the time and season where relevant, and a source link supporting that connection. Identify fictional premises and composite layouts.
3. **Architecture and layout.** Floor and wall materials, openings, levels, built-in features, and the positions of the main furniture or equipment. Describe the dominant shape, foreground, rear edges, and clear route through the scene.
4. **Objects and materials.** Usually 12–20 specific props or architectural details, grouped by location or use. Explain which define the scene and which reward a closer look. Choose plausible tools and personal possessions instead of filling every surface.
5. **People and activity.** Who occupies the room, where they stand or sit, what they are doing, and how their posture or interaction tells a small story. A solitary or temporarily empty scene can be appropriate if intentional.
6. **Animation.** One main action with an ordered sequence, an approximate loop duration, and a few restrained secondary movements. State how the scene returns to its starting state. Use pauses, occlusion, or entrances for transitions rather than visible teleporting or objects resetting in place.
7. **Still pose.** A reduced-motion composition that preserves the room's identity and human story without relying on a running animation.
8. **Light and color.** The source and direction of light, warm and cool areas, and the palette's use for local materials and focal points.
9. **Small discovery.** A personal, imperfect, or gently humorous detail that belongs to this room. Make it visible through the artwork rather than explanatory text.
10. **Distinctive role.** Why this scene earns a place among the 25. If it shares a category with another room, distinguish their activity, composition, and emotional tone.

These details may form connected paragraphs rather than ten repeated subheadings. Attach citations to the factual claims they support. A broad neighborhood page does not validate an exact machine, ritual, or interior arrangement; cite a focused reference or describe that element as a design proposal.

## Deliver and review

In the project, save the complete brief to `docs/<city-slug>-rooms.md`. If that path already contains work, choose a distinct descriptive suffix for an additional collection. Outside a project, deliver the full brief in the conversation unless the user requests a file.

Start the brief with the collection's identity and shared visual direction. Follow with the 25 detailed rooms in tour order. End with the reasons for that order, distinctions between similar scenes, any recurring motifs, unresolved reference needs, and the research date. Keep source links beside relevant facts.

Before delivery, verify:

- There are exactly 25 fully developed rooms with unique IDs, and none silently repeats an existing room.
- Each room has credible local grounding and a specific composition, activity, object set, and animation.
- The collection represents this city rather than a generic national collage. Traditions, materials, seasons, and tools are consistent with the stated context.
- Loops have coherent beginnings and endings. Doors, vehicles, people, machines, and handled objects move in a sensible sequence.
- Still poses remain legible, and foreground objects, smoke, reflections, or landmarks do not obscure the main activity.
- The final entries have the same depth as the first ones. Research limitations and fictional details are clear.

Link the saved brief and briefly describe the collection in the final reply. Do not ask for implementation approval as a required final step when the user only requested a plan.

## When implementation is requested

Read the current drawing helpers, painter, layout, collection registry, and a representative room before coding. In 25rooms, use one complete JavaScript module per room under `dist/artwork/cities/<city-slug>/`, with an explicit collection index in tour order. Use a separate collection directory for an additional set for the same city. Keep unique details with their room and share only reusable forms. Follow repository instructions and preserve existing collections and navigation behavior.

If the user requests subagents, divide the rooms into bounded groups with explicit file ownership. Give each worker the shared palette, scale, brief, and module contract. One coordinating agent integrates the collection and checks consistency across all 25 rooms.

Validate the new collection's count, IDs, drawing coordinates, and animation states with the project's existing checks, updating hardcoded collection assumptions where needed. Review representative transitions and loop boundaries, and follow the session's rules for browser testing. Do not report implemented rooms on the strength of the design brief alone.
