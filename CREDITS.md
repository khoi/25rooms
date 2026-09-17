# Credits

## Original artwork

[a small light, room by room](https://a-small-light-three.vercel.app/) is the source of the original 25 rooms, procedural drawing engine, character definitions, ink patterns, and animation timelines in this project. Credit for those elements belongs to the original creator.

The original page and retrieved source do not identify the creator by name or link to an author profile. This repository credits the work directly rather than guessing an identity.

`dist/artwork/drawings.js` adapts the original procedural code. The new room collection also uses its drawing helpers, character system, and print effects. This project reuses that source; it is more than a visual tribute.

The source was retrieved on September 17, 2026. Its provenance and SHA-256 digest are recorded in [`dist/artwork/source.json`](dist/artwork/source.json). No license was included in the retrieved source. Attribution does not grant additional rights to that material.

## This adaptation

[khoi](https://github.com/khoi) maintains this adaptation. It adds the Three.js scene composition, texture caching, camera controls, collection navigation, and 25 new room themes with expanded furnishings and activities.

## Three.js

The viewer uses [Three.js](https://threejs.org/), copyright its authors. The vendored distribution's MIT license is preserved in [`dist/vendor/LICENSE`](dist/vendor/LICENSE).
