# 25rooms

325 animated isometric rooms across thirteen collections built with threejs.

This adaptation by [khoi](https://github.com/khoi) builds on [a small light, room by room](https://a-small-light-three.vercel.app/). 

## Collections

- **01 · Tokyo** 25 scenes of daily life, craft, and culture, from the first market shift to the last light at home.
- **02 · Hong Kong** 25 scenes across harbour decks, hillside streets, working studios, villages, and wetlands.
- **03 · New York** 25 scenes across all five boroughs, from the first ferry crossing to a final piano chord.
- **04 · Somewhere else** 25 imagined rooms built by GPT Astra 6 xhigh.
- **05 · Original** preserves the original 25 room designs in the new viewer.
- **06 · Hanoi** 25 scenes drawn from the [Hanoi room plan](docs/hanoi-rooms.md).
- **07 · Barcelona** 25 scenes drawn from the [Barcelona room plan](docs/barcelona-rooms.md).
- **08 · Paris** 25 scenes drawn from the [Paris room plan](docs/paris-rooms.md).
- **09 · London** 25 scenes drawn from the [London room plan](docs/london-rooms.md).
- **10 · Istanbul** 25 scenes drawn from the [Istanbul room plan](docs/istanbul-rooms.md).
- **11 · Mexico City** 25 scenes drawn from the [Mexico City room plan](docs/mexico-city-rooms.md).
- **12 · Cape Town** 25 scenes drawn from the [Cape Town room plan](docs/cape-town-rooms.md).
- **13 · Amsterdam** 25 scenes drawn from the [Amsterdam room plan](docs/amsterdam-rooms.md).

Tokyo opens by default. Select a collection at the top, double-click a room to explore it, or use the tour controls. Each city room has its own module under `dist/artwork/cities/`. The [Tokyo](docs/tokyo-rooms.md), [Hong Kong](docs/hong-kong-rooms.md), and [New York](docs/new-york-rooms.md) room plans describe the scenes and their local references.

Serve `dist/` with a static web server, such as `python3 -m http.server 4173 --directory dist`, then open `http://localhost:4173`.

Run `node scripts/check-rooms.mjs` to check navigation and collection membership, room hit targets, and city drawing coordinates at sampled animation times, declared loop boundaries, and reduced-motion poses.

The [completion report](docs/room-completion-2026-09-18.md) records the collection integration, audit fixes, and verification limits.
