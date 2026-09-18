import room01 from './cargo-canopy.js';
import room02 from './market-bread.js';
import room03 from './ferry-waiting.js';
import room04 from './canal-step.js';
import room05 from './dappermarkt-cloth.js';
import room06 from './ndsm-mobile.js';
import room07 from './canal-bindery.js';
import room08 from './balcony-table.js';
import room09 from './depot-cinema.js';
import room10 from './noord-sailbag.js';
import room11 from './zuidoost-sound.js';
import room12 from './sloterplas-rowing.js';
import room13 from './oost-kitchen.js';
import room14 from './waterway-model.js';
import room15 from './zuidoost-football.js';
import room16 from './ceramic-sink.js';
import room17 from './noord-garden.js';
import room18 from './ndsm-light.js';
import room19 from './oost-reading.js';
import room20 from './nieuw-west-sewing.js';
import room21 from './pijp-records.js';
import room22 from './window-restorer.js';
import room23 from './zuidoost-stage.js';
import room24 from './boat-home.js';
import room25 from './attic-last-light.js';

export const AMSTERDAM_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
