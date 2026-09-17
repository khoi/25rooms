import { world, shape, oval, stroke, box, table, bench, actor, creature, steam, lantern, bottle, parcels, strings, ell, curve, cycle, inks, TAU, pool, ripple, mushroom, windowOn, plant, rug, starPts } from './common.js';

const hotel = world('insect-hotel', 'Giant insect hotel', { floor: 'sun', tone: .25, wall: 'teal', wallTone: .5, wallStyle: 'stripe', height: 4.2, head: 50 }, (H, R) => {
  for (let row = 0; row < 3; row++) for (let col = 0; col < 5; col++) {
    const i = 1 + col * 2.1, z = .3 + row * 1.2;
    const P = [H.p(i, .1, z), H.p(i + 1.3, .1, z), H.p(i + 1.3, .1, z + .9), H.p(i, .1, z + .9)];
    shape(H, R, P, 'blue', .85);
    H.dot(...H.p(i + 1.1, .13, z + .4), 2, 'sun');
  }
  box(H, R, 1, 4, 4, 1.6, 0, 1.3, 'coral', .7);
  table(H, R, 1, 3, 3.5, .5, 2.2, 'blue');
  for (let k = 0; k < 12; k++) H.dot(...H.p(1.3 + k * .25, 3.2, 2.4), 1.4, 'sun');
  rug(H, R, 3.5, 7, 5, 3, 'coral', .65, { border: 'sun' }); parcels(H, R, 9.2, 7.8, 8);
  const [x, y] = H.p(8.7, 3, 3); H.line(R, [[x, y - 30], [x, y]], 'blue', 1); oval(H, R, x, y, 15, 24, 'sun'); H.glow(x, y, 80, 55, 'sun', .35);
  plant(H, R, ...H.p(1.5, 10), 1.7);
}, (H, R, t) => {
  creature(H, R, ...H.p(3, 4, 1.4), 'beetle', t, .8, 'blue');
  creature(H, R, ...H.p(6, 7), 'beetle', t, 1.2, 'teal');
  for (let k = 0; k < 7; k++) oval(H, R, ...H.p(8.4 + k * .28, 9 + Math.sin(t * 2 + k) * .08, .18), 9, 8, k % 2 ? 'sun' : 'teal');
  parcels(H, R, 9.7, 8.5, 2);
  const [x, y] = H.p(8.7, 3, 3);
  for (let k = 0; k < 5; k++) {
    const a = t + k * 1.26, px = x + Math.cos(a) * 50, py = y + Math.sin(a) * 25;
    oval(H, R, px - 5, py, 6, 2 + Math.abs(Math.sin(t * 12)) * 4, 'paper'); oval(H, R, px + 5, py, 6, 3, 'paper');
  }
});

const sauna = world('volcanic-sauna', 'Volcanic sauna', { floor: 'blue', tone: .8, wall: 'blue', wallTone: .85, height: 3.2, wallStyle: 'brick' }, (H, R) => {
  pool(H, R, 1.8, 2.4, 8, 5.8, 'coral');
  H.tint(H.tile(2, 2.6, 7.6, 5.4, .12), 'sun', .55);
  for (let k = 0; k < 12; k++) {
    const i = 2.4 + k % 4 * 1.8, j = 3.2 + Math.floor(k / 4) * 1.8;
    shape(H, R, H.tile(i, j, 1.4, 1.3, .2), 'blue', .85);
  }
  for (let k = 0; k < 20; k++) box(H, R, .6 + k * .53, 9, .5, 2, .25, .1, 'coral', .4);
  bench(H, R, 1, .7, 9.5, 'coral');

  for (let k = 0; k < 5; k++) oval(H, R, ...H.p(1 + k * 2.3, .8, 1), 8, 4, 'paper');
}, (H, R, t) => {
  for (const [i, j, s] of [[3, 4.4, 1.3], [6.5, 6, 1.1], [8, 3.4, .8]]) {
    const [x, y] = H.p(i, j, .3);
    creature(H, R, x, y, 'monster', t, s, 'blue');
    shape(H, R, [[x - 20 * s, y - 49 * s], [x + 20 * s, y - 49 * s], [x + 13 * s, y - 58 * s], [x - 12 * s, y - 58 * s]], 'paper', 1);
    steam(H, R, x, y - 20, t + i, 4);
  }
  for (let k = 0; k < 9; k++) {
    const u = cycle(t + k * .6, 4), [x, y] = H.p(2.3 + k % 3 * 2.8, 3 + Math.floor(k / 3) * 2, .14);
    H.opacity(1 - u, () => oval(H, R, x, y - Math.sin(u * Math.PI) * 18, 2 + u * 8, 2 + u * 4, 'sun', .8));
  }
});

const customs = world('moon-customs', 'Moon customs office', { floor: 'paper', tone: 1, wall: 'blue', wallTone: .95, height: 3.4, pattern: 'tiles' }, (H, R) => {
  windowOn(H, R, 'ne', 7, .9, 6, 2.2, { skyTone: 1, frameInk: 'paper', inside: () => {
    const [x, y] = H.p(8.1, .01, 2); oval(H, R, x, y, 24, 24, 'teal', .75); H.tint(ell(x - 5, y - 7, 12, 6), 'sun', .6);
    for (let k = 0; k < 40; k++) H.dot(...H.p(4 + R() * 6, .015, 1 + R() * 1.8), .7, 'paper');
  } });
  box(H, R, 2, 3, 7.5, 1.5, 0, 1.2, 'teal', .5);
  for (const i of [3, 6, 9]) { box(H, R, i, 3.5, .8, .6, 1.2, .7, 'blue');  }

  for (let j = 6; j < 11; j += 2) for (const i of [2, 8]) box(H, R, i, j, .1, .1, 0, .9, 'coral');
  for (const i of [2, 8]) stroke(H, R, [H.p(i, 6, .8), H.p(i, 8, .65), H.p(i, 10, .8)], 'coral', 2);
  table(H, R, 9.8, 8, 1.2, 2, .7, 'sun');
}, (H, R, t) => {
  for (let k = 0; k < 3; k++) {
    const i = 3.5 + k * 1.6, j = 6.7 + k * .9, z = .1 + Math.sin(t + k) * .15;
    actor(H, R, i, j, t + k, 'idle', { shirt: ['paper', 1], pants: ['paper', 1] }, z);
    const [x, y] = H.p(i, j, z + 1.58); H.outline(R, ell(x, y, 13, 14), 'teal', 3); H.line(R, [[x - 7, y - 7], [x - 10, y - 2]], 'paper', 2);
    box(H, R, i + .4, j + .5, .8, .45, .8 + Math.sin(t + k) * .25, .55, inks[k]);
  }
  actor(H, R, 5.5, 2.9, t, 'write', { shirt: ['coral', .8] }, .3);
  const [x, y] = H.p(9.2, 9.3, 1.8 + Math.sin(t) * .3); shape(H, R, starPts(x, y, 12, 5, 5), 'sun');
});

const puppets = world('puppet-backstage', 'Puppet backstage', { floor: 'coral', tone: .35, wall: 'blue', wallTone: .7, pattern: 'boards', height: 3.8 }, (H, R) => {
  for (const i of [.8, 11]) box(H, R, i, 1, .2, 8, 0, 3.2, 'coral', .8);
  box(H, R, .8, 1, 10.4, .25, 3.2, .2, 'sun');
  for (let k = 0; k < 8; k++) {
    const [x, y] = H.p(1.4 + k * 1.25, 1.5, 2.6);
    H.line(R, [[x, y - 15], [x, y]], 'sun', .8);
    shape(H, R, [[x, y], [x + 12, y + 8], [x + 6, y + 16], [x + 10, y + 38], [x - 10, y + 38], [x - 6, y + 16], [x - 12, y + 8]], inks[k % 3], .65);
  }
  table(H, R, 1.2, 7.5, 3, 2, 1, 'teal');
  const [mx, my] = H.p(2.6, 7.6, 2.1); oval(H, R, mx, my, 29, 37, 'paper', .6);
  for (let k = 0; k < 12; k++) H.dot(mx + Math.cos(k / 12 * TAU) * 32, my + Math.sin(k / 12 * TAU) * 40, 2.5, 'sun');
  parcels(H, R, 9, 8.5, 5);
}, (H, R, t) => {
  for (const [i, j, phase] of [[5.5, 5.5, 0], [8, 6.5, 1.5]]) {
    actor(H, R, i, j, t + phase, 'wave', { shirt: ['coral', .7] }, .4 + Math.sin(t + phase) * .1, 1.05);
    const [x, y] = H.p(i, j, .4);
    for (const dx of [-14, 0, 14]) stroke(H, R, [[x + dx, y - 36], [x + dx * .6 + Math.sin(t) * 7, y - 95], [x + dx * .4, y - 140]], 'blue', .65);
    H.line(R, [[x - 22, y - 140], [x + 22, y - 140]], 'sun', 3);
    creature(H, R, x, y - 145, 'mouse', t, .5, 'teal');
  }
});

const ski = world('tiny-ski-resort', 'Tiny ski resort', { floor: 'paper', tone: 1, wall: false, head: 100 }, (H, R) => {
  const mountain = [H.p(.3, .5), H.p(6, .7, 5.5), H.p(11.7, 1), H.p(11, 8), H.p(6, 11), H.p(.4, 8)];
  shape(H, R, mountain, 'paper', 1);
  shape(H, R, [H.p(6, .7, 5.5), H.p(11.7, 1), H.p(11, 8), H.p(7.4, 5, 2.5)], 'teal', .22);
  stroke(H, R, [H.p(6, 1, 5.2), H.p(4, 3, 3), H.p(7, 6, 1.2), H.p(5, 10, .1)], 'coral', 2);
  for (let n = 0; n < 8; n++) {
    const i = n < 4 ? 1 : 10, j = 3 + n % 4 * 2;
    const [x, y] = H.p(i, j, .4), h = 25 + R() * 25;
    shape(H, R, [[x - 12, y], [x, y - h], [x + 12, y]], 'teal', .7); H.line(R, [[x, y], [x, y + 6]], 'blue', 2);
    H.line(R, [[x - 8, y - 10], [x, y - 18], [x + 6, y - 11]], 'paper', 2);
  }
  for (const [i, j, z] of [[2.5, 9, 2.5], [5.6, 1, 6]]) { box(H, R, i, j, .13, .13, 0, z, 'blue'); H.line(R, [H.p(i - .5, j, z), H.p(i + .5, j, z)], 'coral', 3); }
  H.line(R, [H.p(2.5, 9, 2.5), H.p(5.6, 1, 6)], 'blue', 1);
}, (H, R, t) => {
  for (let k = 0; k < 4; k++) {
    const u = cycle(t + k * 4, 16), i = 2.5 + u * 3.1, j = 9 - u * 8, z = 2.5 + u * 3.5;
    const [x, y] = H.p(i, j, z); H.line(R, [[x, y], [x, y + 23]], 'blue', 1); H.line(R, [[x - 9, y + 23], [x + 9, y + 23]], 'coral', 4);
    actor(H, R, i, j, t, 'sit', {}, z - .85, .45);
  }
  const u = cycle(t, 9), i = 6 + Math.sin(u * TAU) * 1.3, j = 1 + u * 9, z = 5 * (1 - u) * (1 - u);
  actor(H, R, i, j, t, u > .75 ? 'sleep' : 'walk', { shirt: ['coral', .8] }, z, .65);
  const [x, y] = H.p(i, j, z); H.line(R, [[x - 15, y + 4], [x + 15, y - 4]], 'blue', 2);
});

export default [hotel, sauna, customs, puppets, ski];
