import statenFerry from './staten-ferry.js';
import huntsPoint from './hunts-point.js';
import astoriaBakery from './astoria-bakery.js';
import bedStuyStoop from './bed-stuy-stoop.js';
import washingtonHeights from './washington-heights.js';
import jacksonHeights from './jackson-heights.js';
import chinatownKitchen from './chinatown-kitchen.js';
import mottHavenCycles from './mott-haven-cycles.js';
import navyYard from './navy-yard.js';
import greenbeltCenter from './greenbelt-center.js';
import theaterBooth from './theater-booth.js';
import coronaTrumpet from './corona-trumpet.js';
import sunsetRoof from './sunset-roof.js';
import mapRoom from './map-room.js';
import orchardBeach from './orchard-beach.js';
import crownHeightsGarden from './crown-heights-garden.js';
import queensPanorama from './queens-panorama.js';
import stGeorgeStage from './st-george-stage.js';
import eastHarlemDominoes from './east-harlem-dominoes.js';
import coneyKites from './coney-kites.js';
import bronxBoathouse from './bronx-boathouse.js';
import jamaicaBay from './jamaica-bay.js';
import lowerEastBedroom from './lower-east-bedroom.js';
import redHookPier from './red-hook-pier.js';
import harlemPiano from './harlem-piano.js';

export const NEW_YORK_ROOMS = [
  statenFerry, huntsPoint, astoriaBakery, bedStuyStoop, washingtonHeights,
  jacksonHeights, chinatownKitchen, mottHavenCycles, navyYard, greenbeltCenter,
  theaterBooth, coronaTrumpet, sunsetRoof, mapRoom, orchardBeach,
  crownHeightsGarden, queensPanorama, stGeorgeStage, eastHarlemDominoes, coneyKites,
  bronxBoathouse, jamaicaBay, lowerEastBedroom, redHookPier, harlemPiano,
].map((room, index) => ({ ...room, order: index + 1 }));
