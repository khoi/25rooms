# A small light, somewhere else

Fifty animated isometric rooms across two collections, with a Three.js viewer. Drag to explore, zoom into a room, or follow the automatic tour.

This adaptation by [khoi](https://github.com/khoi) builds on [a small light, room by room](https://a-small-light-three.vercel.app/). Full credit for the original artwork, procedural drawing code, characters, print textures, and original room animations belongs to its creator. The original page does not identify an author by name. See [CREDITS.md](CREDITS.md) for source attribution and dependency notices.

## Collections

- **01 · Somewhere else** opens by default. Its 25 new scenes include a dragon bathhouse, jellyfish subway, puppet workshop, and gravity flea market.
- **02 · Original** preserves the original 25 room designs in the new viewer.

## Run locally

From the repository root, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open [the local viewer](http://127.0.0.1:4173/). The site has no build step or package installation. Three.js is included in `dist/vendor/`.

Drag to pan, scroll or pinch to zoom, and double-click a room to focus it. Use the arrows to change rooms, **Tour** to start or pause the tour, and **View all** to return to the overview. Keyboard controls include arrow keys to pan, Space to toggle the tour, and 0 to show all rooms.

## How it works

Canvas 2D draws the procedural artwork into cached textures. Three.js places those textures on planes and handles the WebGL scene, camera, and zoom. The artwork retains the original isometric print style.

The original drawing engine lives in `dist/artwork/drawings.js`. The new room definitions live in `dist/artwork/worlds/`, with detailed scenes in `dist/artwork/worlds/details/`. The viewer lives in `dist/main.js`.

## Attribution and licensing

This repository includes adapted source from the original work. No license was supplied with the retrieved original source, so this repository does not apply a blanket open-source license to that artwork or code. Original rights remain with their respective holders. Three.js retains its [MIT license](dist/vendor/LICENSE).
