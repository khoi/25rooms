import { world, shape, oval, stroke, box, table, bench, actor, creature, steam, lantern, bottle, parcels, strings, ell, curve, cycle, inks, TAU, pool, ripple, mushroom, windowOn, plant, rug, starPts } from './common.js';

const caravan = world('desert-caravanserai', 'Desert caravanserai', { floor: 'sun', tone: .4, wall: 'coral', wallTone: .45, wallStyle: 'brick', height: 3.4 }, (H, R) => {
  for (const i of [2.3, 6, 9.7]) {
    const P = [H.p(i - 1, .04, 0), H.p(i + 1, .04, 0), H.p(i + 1, .04, 2.2), H.p(i + .65, .04, 2.8), H.p(i, .04, 3), H.p(i - .65, .04, 2.8), H.p(i - 1, .04, 2.2)];
    shape(H, R, P, 'blue', .85);
    H.outline(R, P, 'sun', 3, { tone: .7 });
    lantern(H, R, i, .6, 2.7);
  }
  rug(H, R, 1, 7.5, 5, 3.3, 'coral', .7, { border: 'sun' });
  for (let i = 1.2; i < 6; i += .4) H.line(R, [H.p(i, 7.7), H.p(i, 10.6)], 'blue', .7);
  pool(H, R, 5, 4.5, 2, 2);
  for (let n = 0; n < 3; n++) { box(H, R, 8.5 + n * .75, 9.5, .6, 1.1, 0, .7, inks[n]); bottle(H, R, ...H.p(1.3, 2 + n, 0), 'coral', 1.2); }
  table(H, R, 2, 8.2, 2.2, 1.4, .4, 'teal');
  for (const i of [2.4, 3.2]) bottle(H, R, ...H.p(i, 8.6, .55), 'sun', .45);
}, (H, R, t) => {
  creature(H, R, ...H.p(8.3, 5.2), 'camel', t, 1.35, 'sun');
  creature(H, R, ...H.p(9.7, 7.5), 'camel', t + 2, 1, 'coral');
  actor(H, R, 4, 9.4, t, 'sitfloor', { shirt: ['teal', .8] });
  for (let k = 0; k < 40; k++) {
    const u = cycle(t * .3 + k * .71, 6), [x, y] = H.p(2 + u * 8, 10 + Math.sin(k) * .5);
    H.line(R, [[x, y], [x + 3, y - 1]], 'sun', .8, { tone: .6 });
  }
  ripple(H, R, 6, 5.5, t);
});

const ballroom = world('haunted-ballroom', 'Haunted ballroom', { floor: 'blue', tone: .65, wall: 'teal', wallTone: .75, wallStyle: 'stripe', height: 4.5, pattern: 'tiles', head: 60 }, (H, R) => {
  for (const side of ['nw', 'ne']) for (const pos of [3, 7, 10.3]) windowOn(H, R, side, pos, 1, 1.8, 2.8, { skyTone: .95, frameInk: 'sun' });
  for (let i = 1; i < 12; i += 1.8) bench(H, R, i, .8, 1, 'coral');
  rug(H, R, 2, 4, 8.5, 6.8, 'coral', .25, { border: 'sun' });
  const [x, y] = H.p(6, 5, 4.6);
  H.line(R, [[x, y - 45], [x, y]], 'sun', 2);
  for (let k = 0; k < 8; k++) {
    const a = k / 8 * TAU, px = x + Math.cos(a) * 42, py = y + Math.sin(a) * 17;
    stroke(H, R, [[x, y - 6], [(x + px) / 2, py + 10], [px, py], [px, py - 12]], 'sun', 2);
    H.dot(px, py - 14, 3, 'paper'); H.glow(px, py - 14, 16, 12, 'sun', .4);
    shape(H, R, [[px, py + 4], [px + 3, py + 10], [px, py + 17], [px - 3, py + 10]], 'teal', .3);
  }
}, (H, R, t) => {
  for (let k = 0; k < 3; k++) {
    const a = t * .35 + k * 2, i = 5.8 + Math.cos(a) * 2.8, j = 7 + Math.sin(a) * 2.4;
    H.opacity(.8, () => { creature(H, R, ...H.p(i, j, .3), 'ghost', t + k, 1.3); creature(H, R, ...H.p(i + .7, j + .5, .3), 'ghost', t + k + 2, 1.15); });
  }
  bench(H, R, 1.2 + Math.sin(t * .4) * .6, 10, 1, 'sun');
});

const boxing = world('robot-boxing', 'Underground boxing club', { floor: 'blue', tone: .7, wall: 'coral', wallTone: .65, wallStyle: 'brick', height: 3.2, pattern: 'boards' }, (H, R) => {
  box(H, R, 2, 3, 7.5, 6.5, 0, .6, 'teal', .6);
  const [x, y] = H.p(5.8, 6.2, .62); H.outline(R, ell(x, y, 55, 23), 'paper', 3);
  for (const i of [2, 9.5]) for (const j of [3, 9.5]) {
    box(H, R, i, j, .2, .2, .6, 2, 'coral');
    for (const z of [1.1, 1.7, 2.3]) H.dot(...H.p(i + .1, j + .1, z), 3, 'sun');
  }
  for (const z of [1.1, 1.7, 2.3]) {
    for (const i of [2.1, 9.6]) H.line(R, [H.p(i, 3.1, z), H.p(i, 9.6, z)], 'paper', 1.6);
    H.line(R, [H.p(2.1, 3.1, z), H.p(9.6, 3.1, z)], 'paper', 1.6);
  }

  for (const i of [2, 5, 8]) lantern(H, R, i, .5, 3, 'paper');
  bench(H, R, 1, 10.4, 3, 'coral'); table(H, R, 10, 6, 1.4, 2, .8);
}, (H, R, t) => {
  creature(H, R, ...H.p(4.6 + Math.sin(t * 2) * .25, 5.8, .65), 'robot', t, 1.2, 'teal');
  creature(H, R, ...H.p(7 - Math.sin(t * 2) * .25, 6.2, .65), 'robot', t + .8, 1.3, 'sun');
  actor(H, R, 10.6, 8.8, t, 'point', {}, 0, 1.15);
  for (const z of [1.1, 1.7, 2.3]) H.line(R, [H.p(2.1, 9.6, z), H.p(9.6, 9.6, z)], 'paper', 1.6);
  const [x, y] = H.p(10.6, 7, 1); oval(H, R, x, y, 9, 5, 'sun');
  if (cycle(t, 5) < .2) for (let n = 0; n < 3; n++) H.outline(R, ell(x, y, 12 + n * 5, 7 + n * 3), 'sun', .7);
});

const subway = world('jellyfish-subway', 'Jellyfish subway', { floor: 'blue', tone: .8, wall: 'teal', wallTone: .65, height: 3.8, wallStyle: 'tile' }, (H, R) => {
  pool(H, R, .8, 1.2, 10.5, 3.5, 'blue');
  box(H, R, .6, 5, 10.8, 6.2, 0, .35, 'paper', .6);
  H.line(R, [H.p(.8, 5.5, .36), H.p(11.2, 5.5, .36)], 'sun', 5);
  for (let i = 1; i < 11; i += .45) H.line(R, [H.p(i, 5.7, .36), H.p(i, 5.9, .36)], 'blue', 1);
  bench(H, R, 2, 9.8, 4, 'coral');

  for (let i = 1; i < 12; i += 2) {
    const [x, y] = H.p(i, .02, 2.3); H.dot(x, y, 3, 'sun');
    if (i < 10) H.line(R, [H.p(i, .02, 2.3), H.p(i + 2, .02, 2.3)], 'sun', 1.6);
  }
  box(H, R, 9.6, 9, 1, 1, .35, 2, 'coral');
}, (H, R, t) => {
  const offset = Math.sin(t * .2) * 1.1;
  box(H, R, 1.2 + offset, 1.7, 8.4, 1.8, .15, 1.7, 'teal', .5);
  for (let k = 0; k < 7; k++) {
    const P = [H.p(1.5 + offset + k, 3.51, .65), H.p(2.2 + offset + k, 3.51, .65), H.p(2.2 + offset + k, 3.51, 1.5), H.p(1.5 + offset + k, 3.51, 1.5)];
    shape(H, R, P, 'sun', .4);
  }
  for (let k = 0; k < 7; k++) {
    const i = 2 + k * 1.2, j = 7 + Math.sin(k) * 1.2;
    creature(H, R, ...H.p(i, j, 1 + Math.sin(t + k) * .2), 'jelly', t + k, .65 + k % 3 * .1, inks[k % 3]);
  }
});

const globes = world('snow-globe-repair', 'Snow-globe repair shop', { floor: 'coral', tone: .25, wall: 'blue', wallTone: .8, height: 3.6, pattern: 'boards' }, (H, R) => {
  for (const z of [.9, 1.9, 2.9]) {
    box(H, R, .5, .7, 10.6, .8, z, .1, 'sun', .7);
    for (let i = 1; i < 11; i += 1.4) {
      const [x, y] = H.p(i + .4, 1.1, z + .12);
      oval(H, R, x, y - 13, 14, 17, 'paper', .65);
      shape(H, R, [[x - 8, y - 4], [x, y - 24], [x + 9, y - 4]], i % 2 ? 'teal' : 'coral', .5);
      H.line(R, [[x - 14, y + 2], [x + 14, y + 2]], 'coral', 4);
      for (let n = 0; n < 9; n++) H.dot(x + (R() - .5) * 20, y - 3 - R() * 25, .8, 'paper');
    }
  }
  table(H, R, 3, 5, 5, 2.4, 1.1, 'teal');
  for (let n = 0; n < 7; n++) { const [x, y] = H.p(3.3 + n * .65, 6.8, 1.24); H.line(R, [[x - 8, y], [x + 8, y]], n % 2 ? 'blue' : 'coral', 2); }
  parcels(H, R, 9, 8.6, 7); bench(H, R, 1, 9, 3, 'sun');
}, (H, R, t) => {
  const [x, y] = H.p(5.5, 5.9, 1.4);
  oval(H, R, x, y - 38, 41, 47, 'paper', .6);
  shape(H, R, [[x - 28, y - 5], [x - 7, y - 57], [x + 5, y - 36], [x + 16, y - 62], [x + 32, y - 5]], 'teal', .5);
  H.clip(ell(x, y - 38, 40, 46), () => {
    for (let n = 0; n < 32; n++) { const u = cycle(t + n * .39, 5); H.dot(x + Math.sin(n * 8.3) * 35, y - 83 + u * 86, 1.4, 'paper'); }
  });
  stroke(H, R, [[x + 18, y - 78], [x + 9, y - 61], [x + 19, y - 50], [x + 12, y - 30]], 'blue', .8);
  H.line(R, [[x - 38, y + 2], [x + 38, y + 2]], 'coral', 7);
  actor(H, R, 4, 7.4, t, 'write', { shirt: ['sun', .7] }, .3);
});

export default [caravan, ballroom, boxing, subway, globes];
