import room01 from './bus-mirror.js';
import room02 from './bay-window.js';
import room03 from './market-shoes.js';
import room04 from './canal-line.js';
import room05 from './flower-delivery.js';
import room06 from './community-oven.js';
import room07 from './umbrella-ribs.js';
import room08 from './print-pattern.js';
import room09 from './bicycle-wheel.js';
import room10 from './shared-stair.js';
import room11 from './maritime-model.js';
import room12 from './clock-observation.js';
import room13 from './allotment-shed.js';
import room14 from './wetland-listen.js';
import room15 from './violin-case.js';
import room16 from './rowing-cradle.js';
import room17 from './archive-box.js';
import room18 from './skate-bench.js';
import room19 from './stage-lantern.js';
import room20 from './canal-cafe.js';
import room21 from './rehearsal-choir.js';
import room22 from './corner-barber.js';
import room23 from './rain-window.js';
import room24 from './late-library.js';
import room25 from './kitchen-second-place.js';

export const LONDON_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
