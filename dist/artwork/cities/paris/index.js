import room01 from './bread-peel.js';
import room02 from './concierge-court.js';
import room03 from './canal-cabin.js';
import room04 from './market-baskets.js';
import room05 from './river-box.js';
import room06 from './attic-pattern.js';
import room07 from './chair-caning.js';
import room08 from './print-drying.js';
import room09 from './clock-shop.js';
import room10 from './metro-rest.js';
import room11 from './tapestry-samples.js';
import room12 from './book-hospital.js';
import room13 from './park-chair.js';
import room14 from './science-table.js';
import room15 from './terrace-chess.js';
import room16 from './canal-bridge-study.js';
import room17 from './seed-library.js';
import room18 from './photo-contact.js';
import room19 from './coat-check.js';
import room20 from './river-sketch.js';
import room21 from './piano-pedal.js';
import room22 from './launderette-rounds.js';
import room23 from './night-kiosk.js';
import room24 from './roof-window.js';
import room25 from './shared-attic.js';

export const PARIS_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
