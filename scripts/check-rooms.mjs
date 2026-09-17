import assert from 'node:assert/strict';
import { COLLECTIONS } from '../dist/artwork/collections.js';
import { collectionForRoom, createLayout } from '../dist/artwork/layout.js';
import { mkHand, streamOf } from '../dist/artwork/drawings.js';

const ids = new Set();
const collectionIds = new Set();
for (const collection of COLLECTIONS) {
  assert(!collectionIds.has(collection.id), `Duplicate collection: ${collection.id}`);
  collectionIds.add(collection.id);
  const layout = createLayout(5, collection.id);
  assert.equal(layout.rooms.length, 25, `${collection.id} room count`);
  assert.equal(layout.drawOrder.length, layout.rooms.length, `${collection.id} draw order count`);
  assert.equal(new Set(layout.drawOrder).size, layout.rooms.length, `${collection.id} duplicate draw order entries`);
  for (const room of layout.rooms) {
    assert.equal(typeof room.id, 'string', `${collection.id} room ID`);
    assert(room.id.length > 0, `${collection.id} empty room ID`);
    assert(!ids.has(room.id), `Duplicate room: ${room.id}`);
    ids.add(room.id);
    assert.equal(collectionForRoom(room.id), collection.id);
    assert(Number.isFinite(room.definition.w) && room.definition.w > 0, `${room.id} width`);
    assert(Number.isFinite(room.definition.d) && room.definition.d > 0, `${room.id} depth`);
    assert(Object.values(room.bounds).every(Number.isFinite), `${room.id} bounds`);
    assert(Object.values(room.center).every(Number.isFinite), `${room.id} camera center`);
    assert(room.bounds.x1 > room.bounds.x0 && room.bounds.y1 > room.bounds.y0);
    const x = room.diamond.reduce((sum, point) => sum + point[0], 0) / 4;
    const y = room.diamond.reduce((sum, point) => sum + point[1], 0) / 4;
    assert.equal(layout.roomAt(x, y)?.id, room.id, `${room.id} hit target`);
  }
}
assert.equal(collectionForRoom('missing-room'), null);
assert.equal(createLayout().rooms[0].id, 'tokyo-toyosu-dawn');
assert.equal(createLayout(5, 'invalid').rooms[0].id, 'tokyo-toyosu-dawn');

function checkedHand(id, operations, frame) {
  const hand = mkHand({ sink: operations, boil: frame });
  const points = (value, method) => {
    assert(Array.isArray(value) && value.length > 0, `${id}: ${method} has no points`);
    assert(value.every(point => Array.isArray(point) && point.length >= 2 && point.every(Number.isFinite)), `${id}: ${method} has invalid coordinates`);
  };
  for (const name of ['fill', 'fill2', 'knock', 'tint', 'erase', 'clip', 'grad']) {
    const original = hand[name];
    hand[name] = (...args) => {
      points(args[0], name);
      return original(...args);
    };
  }
  for (const name of ['line', 'outline', 'hatch', 'speckle']) {
    const original = hand[name];
    hand[name] = (...args) => {
      points(args[1], name);
      return original(...args);
    };
  }
  for (const [name, count] of [['glow', 4], ['light', 4], ['dot', 3], ['at', 3]]) {
    const original = hand[name];
    hand[name] = (...args) => {
      assert(args.slice(0, count).length === count && args.slice(0, count).every(Number.isFinite), `${id}: ${name} has invalid coordinates`);
      return original(...args);
    };
  }
  return hand;
}

function animationTimes(room) {
  const times = new Set([0, 3, 7, 11, 17, 23, 29]);
  if (room.loopSeconds !== undefined) {
    assert(Number.isFinite(room.loopSeconds) && room.loopSeconds > 0, `${room.id}: invalid loop duration`);
    const duration = room.loopSeconds;
    const epsilon = Math.min(.001, duration / 1000);
    for (const time of [epsilon, duration / 4, duration / 2, duration * .75, duration - epsilon, duration, duration + epsilon, duration * 2]) times.add(time);
  }
  return [...times].sort((a, b) => a - b);
}

const cityCollections = COLLECTIONS.filter(collection => !['new', 'original'].includes(collection.id));
let roomsDrawn = 0;
let animationFrames = 0;
let loopRooms = 0;
for (const room of cityCollections.flatMap(collection => collection.rooms)) {
  assert.equal(typeof room.under, 'function', `${room.id} static artwork`);
  assert.equal(typeof room.live, 'function', `${room.id} animated artwork`);
  const scope = Object.create(room);
  for (const layer of ['under', 'over']) {
    if (!room[layer]) continue;
    const operations = [];
    const hand = checkedHand(room.id, operations, 0);
    room[layer].call(scope, hand, streamOf(room.seed, layer));
    assert(operations.length > 0, `${room.id}: empty ${layer} layer`);
  }
  for (const time of animationTimes(room)) {
    const operations = [];
    const frame = Math.floor(time * 3);
    const hand = checkedHand(`${room.id} at ${time}s`, operations, frame);
    room.live.call(scope, hand, streamOf(room.seed, 'live', frame), time);
    assert(hand.pieces.every(piece => Number.isFinite(piece.key)), `${room.id}: invalid drawing depth at ${time}s`);
    hand.pieces.sort((a, b) => a.key - b.key);
    for (const piece of hand.pieces) piece.fn(hand);
    assert(operations.length > 0, `${room.id}: empty animation at ${time}s`);
    animationFrames++;
  }
  roomsDrawn++;
  if (room.loopSeconds !== undefined) loopRooms++;
}

process.stdout.write(`${ids.size} unique rooms across ${COLLECTIONS.length} collections; valid layout and hit targets; ${roomsDrawn} city rooms draw in ${animationFrames} sampled animation frames, including ${loopRooms} declared loop boundaries.\n`);
