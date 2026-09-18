import room01 from './steam-before-traffic.js';
import room02 from './spice-scales.js';
import room03 from './lake-warmup.js';
import room04 from './alley-bedroom.js';
import room05 from './cyclo-canopy.js';
import room06 from './landing-laundry.js';
import room07 from './silk-bag-fitting.js';
import room08 from './metal-shutter.js';
import room09 from './ceramic-rims.js';
import room10 from './gallery-wrap.js';
import room11 from './fruit-yoke.js';
import room12 from './river-pump-store.js';
import room13 from './river-seedlings.js';
import room14 from './drafting-window.js';
import room15 from './reading-annex.js';
import room16 from './park-pedal-store.js';
import room17 from './bicycle-courier.js';
import room18 from './museum-drawer.js';
import room19 from './terrace-shuttle.js';
import room20 from './cafe-stair.js';
import room21 from './puppet-balance.js';
import room22 from './opera-shoes.js';
import room23 from './window-radio.js';
import room24 from './night-soup-table.js';
import room25 from './last-threshold.js';

export const HANOI_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
