import { world, shape, oval, stroke, box, table, bench, actor, creature, steam, lantern, bottle, parcels, strings, ell, curve, cycle, inks, TAU, pool, ripple, mushroom, windowOn, plant, rug } from './common.js';

const laundry = world('midnight-laundromat', 'Midnight laundromat', { floor: 'teal', tone: .2, wall: 'blue', wallTone: .8, pattern: 'tiles', height: 3.4 }, (H, R) => {
  windowOn(H, R, 'nw', 7, 1.1, 4, 1.8, { skyTone: .95, frameInk: 'teal' });

  for (let k = 0; k < 5; k++) {
    const i = .7 + k * 2.05;
    box(H, R, i, .65, 1.8, 1.7, 0, 2.1, 'paper', 1);
    const [x, y] = H.p(i + .9, 2.39, 1.08);
    oval(H, R, x, y, 23, 27, 'blue', .9); oval(H, R, x, y, 19, 23, 'teal', .45);
    H.line(R, [H.p(i + .15, 2.4, 1.82), H.p(i + 1.65, 2.4, 1.82)], 'blue', 1);
    const [cx, cy] = H.p(i + 1.5, 2.41, 1.94); H.dot(cx, cy, 3, 'coral');
  }
  table(H, R, 3, 5, 4, 2, .95, 'sun');
  for (let k = 0; k < 9; k++) box(H, R, 3.2 + k % 3 * 1.15, 5.2, .85, 1.4, 1.08 + Math.floor(k / 3) * .1, .08, inks[k % 3], .4);
  bench(H, R, 1.2, 9, 4, 'coral');
  for (let k = 0; k < 2; k++) {
    box(H, R, 8.8, 5 + k * 2.2, 1.5, 1.5, 0, .9, 'coral', .3);
    for (let q = 0; q < 7; q++) H.line(R, [H.p(8.9 + q * .2, 6.5 + k * 2.2, .1), H.p(8.9 + q * .2, 6.5 + k * 2.2, .8)], 'blue', .7);
  }
  for (let k = 0; k < 6; k++) bottle(H, R, ...H.p(.6, 2 + k * .8, .1), inks[k % 3], .5);
}, (H, R, t) => {
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(1.6 + k * 2.05, 2.39, 1.08);
    H.clip(ell(x, y, 18, 22), () => {
      for (let n = 0; n < 5; n++) {
        const a = t * (k % 2 ? -2 : 2) + n * TAU / 5;
        oval(H, R, x + Math.cos(a) * 11, y + Math.sin(a) * 14, 7, 4, inks[n % 3], .8);
      }
    });
    stroke(H, R, [[x - 12, y - 12], [x - 15, y], [x - 11, y + 9]], 'paper', 2);
  }
  actor(H, R, 3, 9.4, t, 'sleep', { shirt: ['teal', .7] }, .8);
  const [x, y] = H.p(8 + Math.sin(t) * .5, 9, .1);
  shape(H, R, [[x, y - 12], [x + 7, y - 12], [x + 7, y], [x + 16, y + 4], [x + 11, y + 9], [x, y + 2]], 'coral');
});

const bathhouse = world('dragon-bathhouse', 'Dragon bathhouse', { floor: 'sun', tone: .25, wall: 'coral', wallStyle: 'tile', pattern: 'tiles', height: 3.5 }, (H, R) => {
  pool(H, R, 2, 3, 6.7, 5.3); pool(H, R, 8.7, 1.2, 2.6, 3.4);

  for (let k = 0; k < 5; k++) {
    box(H, R, .25, .7 + k * 1.3, 1.1, 1.1, 0, 2.3, 'teal', .4);
    const [x, y] = H.p(1.36, 1.2 + k * 1.3, 1.4); H.dot(x, y, 2, 'sun');
  }
  for (const i of [3, 6, 9]) lantern(H, R, i, .4, 3.2, 'sun');
  bench(H, R, 3.5, 10, 5, 'coral');
  for (let k = 0; k < 4; k++) box(H, R, 4 + k, 10.1, .7, .5, .68, .14, 'paper', 1);
  for (const i of [1.3, 10.5]) plant(H, R, ...H.p(i, 10.4), 1.5);
}, (H, R, t) => {
  for (const [i, j, ink, phase] of [[4, 5, 'teal', 0], [7, 6.7, 'coral', 2], [9.9, 3, 'sun', 4]]) {
    ripple(H, R, i, j, t + phase, 40);
    creature(H, R, ...H.p(i, j, .4 + Math.sin(t + phase) * .04), 'dragon', t + phase, 1.1, ink);
    steam(H, R, ...H.p(i, j, 1), t + phase, 3);
  }
  const [x, y] = H.p(7.6, 6.7, 1.6);
  for (let k = 0; k < 5; k++) { const u = cycle(t + k * .5, 3); oval(H, R, x + u * 40, y - u * 60, 2 + u * 5, 2 + u * 5, 'paper', .35); }
});

const excavation = world('dinosaur-excavation', 'Dinosaur excavation', { floor: 'sun', tone: .35, wall: 'coral', wallTone: .3, wallStyle: 'brick', height: 1.4 }, (H, R) => {
  box(H, R, 1.5, 2, 8.5, 7, 0, .12, 'coral', .32);
  for (let i = 2; i < 10; i++) for (let j = 2; j < 9; j++) H.outline(R, H.tile(i, j, 1, 1, .13), 'paper', .8, { tone: .9 });

  for (const i of [1, 10.5]) for (const j of [1.8, 9.5]) box(H, R, i, j, .14, .14, 0, 1, 'blue');
  H.line(R, [H.p(1, 9.5, .9), H.p(10.5, 9.5, .9)], 'coral', 1.4);
  for (let k = 0; k < 8; k++) {
    const [x, y] = H.p(3 + k * .63, 5, .2);
    oval(H, R, x, y, 6, 4, 'paper', 1);
    stroke(H, R, [[x, y], [x - 20, y - 8 - k], [x - 25, y + 4], [x - 9, y + 13]], 'paper', 5);
    stroke(H, R, [[x, y], [x + 17, y + 6 + k], [x + 12, y + 19], [x + 2, y + 20]], 'paper', 5);
  }
  const [x, y] = H.p(8.7, 5, .3);
  shape(H, R, [[x - 20, y - 8], [x + 6, y - 21], [x + 38, y - 6], [x + 32, y + 9], [x + 4, y + 12]], 'paper', 1);
  oval(H, R, x + 9, y - 7, 7, 5, 'blue', .8);
  for (let n = 0; n < 7; n++) H.line(R, [[x + n * 4, y + 5], [x + n * 4 + 1, y + 10]], 'blue', 1.2);
  table(H, R, .5, 10, 3.3, 1.2, .8, 'teal'); parcels(H, R, 8.5, 10, 4);
  for (let n = 0; n < 10; n++) oval(H, R, ...H.p(.3 + R() * 11, .3 + R() * 11, .1), 2 + R() * 3, 2, 'paper', .7);
}, (H, R, t) => {
  actor(H, R, 5, 7.5, t, 'kneel', { hat: true }, 0, 1.2);
  actor(H, R, 9.4, 6, t, 'think', {}, 0, 1.25);
  const [x, y] = H.p(3, 5, .2);
  stroke(H, R, [[x, y], [x - 20, y - 4], [x - 44, y - 20 + Math.sin(t * .7) * 8], [x - 69, y - 13 + Math.sin(t * .7) * 14]], 'paper', 5);
  for (let n = 0; n < 5; n++) H.dot(x - 15 - n * 9, y - n * 2.5, 3, 'blue', .25);
});

const courtroom = world('mushroom-courtroom', 'Mushroom courtroom', { floor: 'teal', tone: .26, wall: false }, (H, R) => {
  for (let k = 0; k < 16; k++) mushroom(H, R, ...H.p(.5 + k % 8 * 1.5, k < 8 ? .5 : 11, 0), .35 + R() * .4, k % 2 ? 'coral' : 'sun');
  box(H, R, 3.3, 1.3, 5.1, 2.5, 0, .45, 'coral');
  mushroom(H, R, ...H.p(5.8, 2.3, .5), 3.2, 'coral');
  box(H, R, 4.2, 3, 3.2, 1, .45, 1.15, 'blue', .7);

  for (const j of [6.6, 8.5]) for (const i of [1.3, 7.2]) bench(H, R, i, j, 3.4, 'coral');
  table(H, R, 4.8, 6, 2, 1.3, .9, 'sun');
  const [x, y] = H.p(5.7, 5.5, 0); H.outline(R, ell(x, y, 35, 16), 'sun', 2);
  for (let k = 0; k < 25; k++) { const [x, y] = H.p(R() * 12, R() * 12); stroke(H, R, [[x - 3, y], [x, y - 8], [x + 2, y]], 'teal', 1); }
}, (H, R, t) => {
  creature(H, R, ...H.p(5.8, 2.9, 1.65), 'mouse', t, 1.4, 'blue');
  for (const [i, j, ink] of [[2.5, 7, 'sun'], [8.5, 7, 'teal'], [2.8, 9, 'coral'], [8.7, 9, 'paper']]) creature(H, R, ...H.p(i, j, .7), 'mouse', t, .85, ink);
  creature(H, R, ...H.p(5.7, 7.5), 'beetle', t, .8, 'teal');
  const [x, y] = H.p(6.5, 3.2, 1.8);
  const bob = Math.max(0, Math.sin(t * 2)) * 15;
  H.line(R, [[x, y - bob], [x + 15, y - 8 - bob]], 'blue', 3);
  oval(H, R, x + 17, y - 9 - bob, 6, 4, 'sun');
});

const opera = world('miniature-opera', 'Miniature opera house', { floor: 'blue', tone: .8, wall: 'blue', wallTone: .8, height: 4.2, pattern: 'boards', head: 60 }, (H, R) => {
  box(H, R, 1.5, 1.2, 9, 4.1, 0, .6, 'coral', .7);
  for (const i of [1.5, 9.4]) {
    box(H, R, i, 1, .6, 4.4, .6, 3.5, 'sun', .7);
    for (let n = 0; n < 9; n++) H.line(R, [H.p(i + .1 + n * .05, 5.42, .7), H.p(i + .1 + n * .05, 5.42, 4)], 'coral', .8);
  }
  box(H, R, 1.5, 1, 8.5, .5, 3.9, .4, 'sun');
  for (let k = 0; k < 9; k++) {
    const i = 2 + k * .85;
    const P = [H.p(i, 1.3, .6), H.p(i + .85, 1.3, .6), H.p(i + .85, 1.3, 3.9), H.p(i, 1.3, 3.9)];
    shape(H, R, P, k % 2 ? 'coral' : 'blue', .7);
  }
  for (let j = 6.5; j < 11; j += 1.5) for (let i = 1.3; i < 11; i += 1.6) bench(H, R, i, j, 1, 'coral');
  for (let k = 0; k < 9; k++) { const [x, y] = H.p(2 + k, 5.35, .65); H.glow(x, y, 16, 10, 'sun', .5); H.dot(x, y, 3, 'sun'); }
}, (H, R, t) => {
  creature(H, R, ...H.p(5.6 + Math.sin(t * .3) * .3, 3.8, .65), 'mouse', t, 1.8, 'coral');
  actor(H, R, 8, 3, t, 'wave', { shirt: ['teal', .7] }, .65, 1.1);
  for (let j = 6.9; j < 11; j += 1.5) for (let i = 1.7; i < 11; i += 1.6) creature(H, R, ...H.p(i, j, .7), 'mouse', t + i, .5, inks[Math.floor(i + j) % 4]);
  const [x, y] = H.p(5.8, 3.8, 2.7);
});

export default [laundry, bathhouse, excavation, courtroom, opera];
