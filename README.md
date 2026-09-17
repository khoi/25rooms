# A small light, somewhere else

75 animated isometric rooms across three collections built with threejs.

This adaptation by [khoi](https://github.com/khoi) builds on [a small light, room by room](https://a-small-light-three.vercel.app/). 

## Collections

- **01 · Tokyo** 25 scenes of daily life, craft, and culture, from the first market shift to the last light at home.
- **02 · Somewhere else** 25 imagined rooms built by GPT Astra 6 xhigh.
- **03 · Original** preserves the original 25 room designs in the new viewer.

Tokyo opens by default. Select a collection at the top, double-click a room to explore it, or use the tour controls. Each Tokyo room has its own module in `dist/artwork/cities/tokyo/`. The [Tokyo room plan](docs/tokyo-rooms.md) describes the scenes and their local references.

Serve `dist/` with a static web server, such as `python3 -m http.server 4173 --directory dist`, then open `http://localhost:4173`.

Run `node scripts/check-rooms.mjs` to check collection membership, room hit targets, and Tokyo drawing coordinates at seven animation times.
