import assert from 'node:assert/strict';
import { COLLECTIONS } from '../dist/artwork/collections.js';
import { collectionForRoom, createLayout } from '../dist/artwork/layout.js';
import { mkHand, streamOf } from '../dist/artwork/drawings.js';

const ids = new Set();
for (const collection of COLLECTIONS) {
  const layout = createLayout(5, collection.id);
  assert.equal(layout.rooms.length, 25, `${collection.id} room count`);
  assert.equal(layout.drawOrder.length, 25);
  for (const room of layout.rooms) {
    assert(!ids.has(room.id), `Duplicate room: ${room.id}`);
    ids.add(room.id);
    assert.equal(collectionForRoom(room.id), collection.id);
    assert(Object.values(room.bounds).every(Number.isFinite), `${room.id} bounds`);
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
  for (const name of ['fill', 'knock', 'tint', 'erase', 'clip']) {
    const original = hand[name];
    hand[name] = (...args) => {
      points(args[0], name);
      return original(...args);
    };
  }
  for (const name of ['line', 'outline']) {
    const original = hand[name];
    hand[name] = (...args) => {
      points(args[1], name);
      return original(...args);
    };
  }
  return hand;
}

for (const room of COLLECTIONS[0].rooms) {
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
  for (const time of [0, 3, 7, 11, 17, 23, 29]) {
    const operations = [];
    const frame = Math.floor(time * 3);
    const hand = checkedHand(`${room.id} at ${time}s`, operations, frame);
    room.live.call(scope, hand, streamOf(room.seed, 'live', frame), time);
    hand.pieces.sort((a, b) => a.key - b.key);
    for (const piece of hand.pieces) piece.fn(hand);
    assert(operations.length > 0, `${room.id}: empty animation at ${time}s`);
  }
}

process.stdout.write('75 unique rooms across 3 collections; valid layout and hit targets; 25 Tokyo rooms draw at 7 animation times.\n');
