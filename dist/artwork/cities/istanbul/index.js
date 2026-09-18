import room01 from './shore-tea.js';
import room02 from './bread-ring.js';
import room03 from './market-fish.js';
import room04 from './ferry-saloon.js';
import room05 from './balcony-breakfast.js';
import room06 from './record-sleeves.js';
import room07 from './chair-repair.js';
import room08 from './metal-tray.js';
import room09 from './spice-drawers.js';
import room10 from './parcel-hoist.js';
import room11 from './curtain-fitting.js';
import room12 from './frame-shop.js';
import room13 from './community-soup.js';
import room14 from './tram-model.js';
import room15 from './student-courtyard.js';
import room16 from './waterfront-chess.js';
import room17 from './roof-drying.js';
import room18 from './small-garden.js';
import room19 from './book-club.js';
import room20 from './shoe-vestibule.js';
import room21 from './guitar-rehearsal.js';
import room22 from './cinema-corner.js';
import room23 from './antique-lamp.js';
import room24 from './night-window.js';
import room25 from './family-latch.js';

export const ISTANBUL_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
