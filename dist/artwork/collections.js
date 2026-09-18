import { ROOMS } from './drawings.js';
import { NEW_ROOMS } from './worlds/index.js';
import { TOKYO_ROOMS } from './cities/tokyo/index.js';
import { HONG_KONG_ROOMS } from './cities/hong-kong/index.js';
import { NEW_YORK_ROOMS } from './cities/new-york/index.js';
import { HANOI_ROOMS } from './cities/hanoi/index.js';
import { BARCELONA_ROOMS } from './cities/barcelona/index.js';
import { PARIS_ROOMS } from './cities/paris/index.js';
import { LONDON_ROOMS } from './cities/london/index.js';
import { ISTANBUL_ROOMS } from './cities/istanbul/index.js';
import { MEXICO_CITY_ROOMS } from './cities/mexico-city/index.js';
import { CAPE_TOWN_ROOMS } from './cities/cape-town/index.js';
import { AMSTERDAM_ROOMS } from './cities/amsterdam/index.js';

export const COLLECTIONS = [
  { id: 'tokyo', title: '25rooms · Tokyo', rooms: TOKYO_ROOMS },
  { id: 'hong-kong', title: '25rooms · Hong Kong', rooms: HONG_KONG_ROOMS },
  { id: 'new-york', title: '25rooms · New York', rooms: NEW_YORK_ROOMS },
  { id: 'new', title: '25rooms · Somewhere else', rooms: NEW_ROOMS },
  { id: 'original', title: '25rooms · Original', rooms: ROOMS },
  { id: 'hanoi', title: '25rooms · Hanoi', rooms: HANOI_ROOMS },
  { id: 'barcelona', title: '25rooms · Barcelona', rooms: BARCELONA_ROOMS },
  { id: 'paris', title: '25rooms · Paris', rooms: PARIS_ROOMS },
  { id: 'london', title: '25rooms · London', rooms: LONDON_ROOMS },
  { id: 'istanbul', title: '25rooms · Istanbul', rooms: ISTANBUL_ROOMS },
  { id: 'mexico-city', title: '25rooms · Mexico City', rooms: MEXICO_CITY_ROOMS },
  { id: 'cape-town', title: '25rooms · Cape Town', rooms: CAPE_TOWN_ROOMS },
  { id: 'amsterdam', title: '25rooms · Amsterdam', rooms: AMSTERDAM_ROOMS },
];
