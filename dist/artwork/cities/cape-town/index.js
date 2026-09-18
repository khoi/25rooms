import room01 from './surf-store.js';
import room02 from './rope-drying.js';
import room03 from './bo-kaap-kitchen.js';
import room04 from './commuter-corner.js';
import room05 from './woodstock-chair.js';
import room06 from './langa-clay.js';
import room07 from './khayelitsha-fashion.js';
import room08 from './philippi-produce.js';
import room09 from './garden-tools.js';
import room10 from './delivery-bicycle.js';
import room11 from './forest-bootroom.js';
import room12 from './botanical-lens.js';
import room13 from './constantia-grapes.js';
import room14 from './boat-model.js';
import room15 from './langa-sport.js';
import room16 from './sewing-circle.js';
import room17 from './wind-shelter.js';
import room18 from './library-window.js';
import room19 from './woodstock-sound.js';
import room20 from './shared-kitchen.js';
import room21 from './marimba-rehearsal.js';
import room22 from './cinema-evening.js';
import room23 from './family-game.js';
import room24 from './coastal-reading.js';
import room25 from './veranda-return.js';

export const CAPE_TOWN_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
