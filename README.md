# 25rooms

125 animated isometric rooms across five collections built with threejs.

This adaptation by [khoi](https://github.com/khoi) builds on [a small light, room by room](https://a-small-light-three.vercel.app/). 

## Collections

- **01 · Tokyo** 25 scenes of daily life, craft, and culture, from the first market shift to the last light at home.
- **02 · Hong Kong** 25 scenes across harbour decks, hillside streets, working studios, villages, and wetlands.
- **03 · New York** 25 scenes across all five boroughs, from the first ferry crossing to a final piano chord.
- **04 · Somewhere else** 25 imagined rooms built by GPT Astra 6 xhigh.
- **05 · Original** preserves the original 25 room designs in the new viewer.

Tokyo opens by default. Select a collection at the top, double-click a room to explore it, or use the tour controls. Each city room has its own module under `dist/artwork/cities/`. The [Tokyo](docs/tokyo-rooms.md), [Hong Kong](docs/hong-kong-rooms.md), and [New York](docs/new-york-rooms.md) room plans describe the scenes and their local references.

Serve `dist/` with a static web server, such as `python3 -m http.server 4173 --directory dist`, then open `http://localhost:4173`.

Run `node scripts/check-rooms.mjs` to check collection membership, room hit targets, and city drawing coordinates at sampled animation times and declared loop boundaries.
