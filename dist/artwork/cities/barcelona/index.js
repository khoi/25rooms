import room01 from './shutter-breakfast.js';
import room02 from './market-ice.js';
import room03 from './shaded-newsstand.js';
import room04 from './courtyard-bicycle.js';
import room05 from './linen-balcony.js';
import room06 from './pattern-fragments.js';
import room07 from './factory-prototype.js';
import room08 from './cooperative-pantry.js';
import room09 from './reading-patio.js';
import room10 from './repair-radio.js';
import room11 from './giant-store.js';
import room12 from './dance-count.js';
import room13 from './rooftop-seedbank.js';
import room14 from './tram-wait.js';
import room15 from './boat-loft.js';
import room16 from './winter-grill.js';
import room17 from './model-courtyard.js';
import room18 from './ball-wall.js';
import room19 from './lightbox-studio.js';
import room20 from './market-flowers.js';
import room21 from './small-cinema.js';
import room22 from './ceramics-cupboard.js';
import room23 from './quiet-rooftop.js';
import room24 from './listening-balcony.js';
import room25 from './landing-light.js';

export const BARCELONA_ROOMS = [
  room01, room02, room03, room04, room05,
  room06, room07, room08, room09, room10,
  room11, room12, room13, room14, room15,
  room16, room17, room18, room19, room20,
  room21, room22, room23, room24, room25
].map((room, index) => ({ ...room, order: index + 1 }));
