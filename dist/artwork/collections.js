import { ROOMS } from './drawings.js';
import { NEW_ROOMS } from './worlds/index.js';
import { TOKYO_ROOMS } from './cities/tokyo/index.js';

export const COLLECTIONS = [
  { id: 'tokyo', title: 'a small light, Tokyo', rooms: TOKYO_ROOMS },
  { id: 'new', title: 'a small light, somewhere else', rooms: NEW_ROOMS },
  { id: 'original', title: 'a small light, original', rooms: ROOMS },
];
