import { ROOMS } from './drawings.js';
import { NEW_ROOMS } from './worlds/index.js';
import { TOKYO_ROOMS } from './cities/tokyo/index.js';

export const COLLECTIONS = [
  { id: 'tokyo', title: '25rooms · Tokyo', rooms: TOKYO_ROOMS },
  { id: 'new', title: '25rooms · Somewhere else', rooms: NEW_ROOMS },
  { id: 'original', title: '25rooms · Original', rooms: ROOMS },
];
