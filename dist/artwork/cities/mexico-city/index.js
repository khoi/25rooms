import room01 from './chinampa-bench.js';
import room02 from './wholesale-dolly.js';
import room03 from './market-tortillas.js';
import room04 from './patio-breakfast.js';
import room05 from './cablebus-wait.js';
import room06 from './print-courtyard.js';
import room07 from './carton-wings.js';
import room08 from './metal-window.js';
import room09 from './university-model.js';
import room10 from './book-arcade.js';
import room11 from './robot-club.js';
import room12 from './community-pool.js';
import room13 from './seed-drawers.js';
import room14 from './boat-canopy.js';
import room15 from './market-plants.js';
import room16 from './mask-fitting.js';
import room17 from './mural-maquette.js';
import room18 from './local-library.js';
import room19 from './repair-fan.js';
import room20 from './park-skates.js';
import room21 from './canal-listening.js';
import room22 from './community-stage.js';
import room23 from './roof-water.js';
import room24 from './courtyard-music.js';
import room25 from './last-patio-light.js';

export const MEXICO_CITY_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
