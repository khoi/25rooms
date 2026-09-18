# Room detail revision

All 300 authored rooms received a detail revision after the earlier integration pass. The 25 Original rooms remain unchanged as the reference collection.

The revisions develop fitted architecture, working fixtures, open storage, material construction, personal belongings, and traces of use. Each assignment preserves room identities and animation behavior. Workers inspected collection, normal, and close views, then sampled the main action. Independent reviewers inspected all 300 normal room views and checked suspected defects at close scale.

## Room review records

The records below identify the assemblies, discoveries, inspected images, corrections, and remaining limitations for each room. Early records describe their isolated revision; the final correction records below take precedence where they overlap.

| Collection | Revised rooms | Review records |
| --- | --- | --- |
| Tokyo | 25 | [tokyo-1-7](tokyo-1-7.md), [tokyo-8-13](tokyo-8-13.md), [tokyo-14-19](tokyo-14-19.md), [tokyo-20-25](tokyo-20-25.md) |
| Hong Kong | 25 | [hong-kong-1-7](hong-kong-1-7.md), [hong-kong-8-13](hong-kong-8-13.md), [hong-kong-14-19](hong-kong-14-19.md), [hong-kong-20-25](hong-kong-20-25.md) |
| New York | 25 | [new-york-1-7](new-york-1-7.md), [new-york-8-13](new-york-8-13.md), [new-york-14-19](new-york-14-19.md), [new-york-20-25](new-york-20-25.md) |
| Hanoi | 25 | [hanoi-1-7](hanoi-1-7.md), [hanoi-8-13](hanoi-8-13.md), [hanoi-14-19](hanoi-14-19.md), [hanoi-20-25](hanoi-20-25.md) |
| Barcelona | 25 | [barcelona-1-7](barcelona-1-7.md), [barcelona-8-13](barcelona-8-13.md), [barcelona-14-19](barcelona-14-19.md), [barcelona-20-25](barcelona-20-25.md) |
| Paris | 25 | [paris-1-7](paris-1-7.md), [paris-8-13](paris-8-13.md), [paris-14-19](paris-14-19.md), [paris-20-25](paris-20-25.md) |
| London | 25 | [london-1-7](london-1-7.md), [london-8-13](london-8-13.md), [london-14-19](london-14-19.md), [london-20-25](london-20-25.md) |
| Istanbul | 25 | [istanbul-1-7](istanbul-1-7.md), [istanbul-8-13](istanbul-8-13.md), [istanbul-14-19](istanbul-14-19.md), [istanbul-20-25](istanbul-20-25.md) |
| Mexico City | 25 | [mexico-city-1-7](mexico-city-1-7.md), [mexico-city-8-13](mexico-city-8-13.md), [mexico-city-14-19](mexico-city-14-19.md), [mexico-city-20-25](mexico-city-20-25.md) |
| Cape Town | 25 | [cape-town-1-7](cape-town-1-7.md), [cape-town-8-13](cape-town-8-13.md), [cape-town-14-19](cape-town-14-19.md), [cape-town-20-25](cape-town-20-25.md) |
| Amsterdam | 25 | [amsterdam-1-7](amsterdam-1-7.md), [amsterdam-8-13](amsterdam-8-13.md), [amsterdam-14-19](amsterdam-14-19.md), [amsterdam-20-25](amsterdam-20-25.md) |
| Somewhere else | 25 | [new-after-hours](new-after-hours.md), [new-strange-journeys](new-strange-journeys.md), [new-impossible-places](new-impossible-places.md), [new-curious-trades](new-curious-trades.md), [new-dream-logic](new-dream-logic.md) |

## Integration verification

`node scripts/check-rooms.mjs` validates 325 unique room IDs across 13 collection layouts. It now exercises Somewhere else as well as the city collections: 300 authored rooms draw across 4,144 sampled animation frames, including 250 declared loop boundaries.

A native `RoomPainter` comparison of all 250 declared loop endpoints found no changed pixels exceeding 15 summed RGB levels at 700-pixel width with fixed print jitter. This comparison avoids differences from random print jitter and does not certify every intermediate gesture.

Browser checks loaded all 13 collections with 25 ready rooms and no application errors. Previous/next wrapping and room-only deep links passed. All 325 reduced-motion times matched their metadata or the existing zero fallback.

## Final review corrections

- [floor specimens](final-floor-specimens.md)
- [globe light](final-globe-light.md)
- [hanoi barcelona](final-hanoi-barcelona.md)
- [hk domestic](final-hk-domestic.md)
- [noodle depth](final-noodle-depth.md)
- [ny daily](final-ny-daily.md)
- [ny growing music](final-ny-growing-music.md)
- [ny reference](final-ny-reference.md)
- [ny shore](final-ny-shore.md)
- [paris london](final-paris-london.md)
- [tokyo canopies](final-tokyo-canopies.md)

## Limits

The revisions add visible construction and inhabited detail throughout the authored collections. The room reviews do not claim that every scene matches the original library or kitchen in lighting, figure scale, or atmosphere. The drawings retain their established printed palette and stylized people. Purposeful open circulation remains in workshops, public rooms, decks, and gardens.

Evidence images and isolated workspaces are under `/tmp/rooms-density-2026-09-18/`, with final correction paths in their records. Temporary render artifacts are not committed.
