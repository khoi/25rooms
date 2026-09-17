import { ROOMS } from './drawings.js';
import { NEW_ROOMS } from './worlds/index.js';
import { TOKYO_ROOMS } from './cities/tokyo/index.js';
import { HONG_KONG_ROOMS } from './cities/hong-kong/index.js';
import { NEW_YORK_ROOMS } from './cities/new-york/index.js';

export const COLLECTIONS = [
  { id: 'tokyo', title: '25rooms · Tokyo', rooms: TOKYO_ROOMS },
  { id: 'hong-kong', title: '25rooms · Hong Kong', rooms: HONG_KONG_ROOMS },
  { id: 'new-york', title: '25rooms · New York', rooms: NEW_YORK_ROOMS },
  { id: 'new', title: '25rooms · Somewhere else', rooms: NEW_ROOMS },
  { id: 'original', title: '25rooms · Original', rooms: ROOMS },
];
