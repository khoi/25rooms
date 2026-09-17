import { world, shape, oval, stroke, label, plaque, box, table, bench, actor, creature, steam, lantern, bottle, parcels, strings, ell, curve, cycle, inks, TAU, pool, ripple, mushroom, windowOn, plant, rug, starPts } from './common.js';

const memories = world('memory-lost-and-found', 'Memory lost-and-found', { floor: 'coral', tone: .3, wall: 'blue', wallTone: .8, pattern: 'boards', height: 3.8 }, (H, R) => {
  for (const z of [.7, 1.6, 2.5]) {
    box(H, R, .5, .5, 10.7, 1, z, .09, 'teal');
    for (let i = 1; i < 11; i += .7) {
      const [x, y] = H.p(i, 1, z + .1);
      bottle(H, R, x, y, inks[Math.floor(i * 2 + z) % 3], .65);
      label(H, ['HOME', 'JUNE', 'MUM', 'SEA'][Math.floor(i) % 4], x, y - 7, 3.5);
    }
  }
  box(H, R, 2.5, 4.3, 6.4, 1.7, 0, 1.3, 'coral');
  plaque(H, R, 5.7, 6.03, .85, 'WHAT HAVE YOU LOST?', 'paper', 151);
  for (let k = 0; k < 16; k++) {
    const i = 3 + k % 8 * .7, z = .3 + Math.floor(k / 8) * .5;
    H.outline(R, [H.p(i, 6.02, z), H.p(i + .55, 6.02, z), H.p(i + .55, 6.02, z + .35), H.p(i, 6.02, z + .35)], 'blue', .6);
    H.dot(...H.p(i + .27, 6.04, z + .16), 1.2, 'sun');
  }
  bench(H, R, 1.2, 9.7, 4, 'teal'); parcels(H, R, 9.2, 8, 6);
  plaque(H, R, 6, .1, 3.5, 'LOST MOMENTS', 'sun', 112);
}, (H, R, t) => {
  actor(H, R, 5.8, 4, t, 'write', { shirt: ['teal', .7] }, .3);
  actor(H, R, 5.5, 7.5, t, 'think', {}, 0, 1.35, 'elder');
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(4.4 + k * .6, 5, 2 + Math.sin(t + k) * .3);
    H.opacity(.6, () => { oval(H, R, x, y, 13, 13, 'paper', .6); label(H, ['★', '♥', '7', '♪', '☀'][k], x, y, 12, k % 2 ? '#ee6852' : '#008c8a'); });
  }
});

const noodles = world('rainy-noodle-alley', 'Rainy noodle alley', { floor: 'blue', tone: .7, wall: 'teal', wallTone: .75, wallStyle: 'brick', height: 3.8, pattern: 'tiles' }, (H, R) => {
  for (const [i, ink] of [[.7, 'coral'], [6.2, 'sun']]) {
    box(H, R, i, 1.5, 4.5, 1.8, 0, 1.15, ink);
    box(H, R, i, 1.3, .1, 2.2, 1.15, 1.4, 'blue'); box(H, R, i + 4.3, 1.3, .1, 2.2, 1.15, 1.4, 'blue');
    for (let k = 0; k < 9; k++) shape(H, R, [H.p(i + k * .5, .8, 2.7), H.p(i + (k + 1) * .5, .8, 2.7), H.p(i + (k + 1) * .5, 4, 2.3), H.p(i + k * .5, 4, 2.3)], k % 2 ? 'paper' : ink, .8);
    plaque(H, R, i + 2.2, .3, 3.3, i < 2 ? 'HOT NOODLES' : 'SOUP UNTIL LATE', ink, 103);
    for (let k = 0; k < 3; k++) { const [x, y] = H.p(i + 1 + k, 3, 1.25); oval(H, R, x, y, 10, 5, 'paper'); stroke(H, R, [[x - 7, y], [x, y + 8], [x + 7, y]], ink, 4); }
  }
  for (const i of [1.5, 4, 7, 9.7]) lantern(H, R, i, 3.6, 2.8, i < 6 ? 'coral' : 'sun');
  for (let k = 0; k < 7; k++) { const [x, y] = H.p(1 + R() * 10, 6 + R() * 5); oval(H, R, x, y, 17 + R() * 18, 7, 'teal', .45); H.line(R, [[x - 8, y], [x + 8, y]], 'coral', 1); }
  bench(H, R, 1.5, 4.3, 3, 'coral');
}, (H, R, t) => {
  actor(H, R, 3, 1.8, t, 'write', { shirt: ['paper', 1] }, .1);
  actor(H, R, 8, 1.8, t, 'write', { shirt: ['coral', .8] }, .1);
  for (const i of [2, 3.5, 7.5, 9]) steam(H, R, ...H.p(i, 3, 1.45), t + i, 2);
  actor(H, R, 5.6, 8.1, t, 'walk', {}, 0, 1.25);
  const [x, y] = H.p(5.6, 8.1, 2.1);
  const umbrella = curve([[x - 44, y], [x - 29, y - 22], [x, y - 33], [x + 30, y - 22], [x + 44, y]], 3);
  shape(H, R, umbrella.concat([[x + 21, y - 7], [x, y + 1], [x - 22, y - 6]]), 'sun', .8);
  H.line(R, [[x, y], [x, y + 32]], 'blue', 1.3);
  actor(H, R, 8.8, 5.5, t, 'walk', { fur: ['coral', .7] }, .1, 1.2, 'cat');
  for (let k = 0; k < 65; k++) {
    const u = cycle(t * 2 + k * .31, 3), [px, py] = H.p((k * 1.73) % 12, (k * 2.31) % 12, 4 * (1 - u));
    H.line(R, [[px, py], [px - 3, py + 10]], 'paper', .7, { tone: .6 });
  }
});

const hive = world('royal-beehive', 'Royal beehive', { floor: 'sun', tone: .65, wall: 'coral', wallTone: .4, height: 4.5, head: 55 }, (H, R) => {
  for (const side of [0, 1]) for (let row = 0; row < 5; row++) for (let col = 0; col < 9; col++) {
    const a = .8 + col * 1.15 + row % 2 * .45, z = .5 + row * .8;
    const [x, y] = H.p(side ? a : .03, side ? .03 : a, z);
    const hex = Array.from({ length: 6 }, (_, n) => [x + Math.cos(n * TAU / 6) * 19, y + Math.sin(n * TAU / 6) * 16]);
    shape(H, R, hex, (row + col) % 4 ? 'sun' : 'blue', .65);
    H.outline(R, hex, 'coral', 2, { tone: .7 });
  }
  box(H, R, 4, 2.5, 4, 3, 0, .7, 'coral'); bench(H, R, 4.7, 3.5, 2.7, 'sun');
  rug(H, R, 4.4, 6, 3.5, 4.8, 'coral', .7, { border: 'sun' });
  for (let k = 0; k < 8; k++) bottle(H, R, ...H.p(1.2 + k % 4 * 1.1, 8 + Math.floor(k / 4) * 1.3), 'sun', .8);
  for (const i of [2, 10]) box(H, R, i, 5, .1, .1, 0, 4, 'blue');
  plaque(H, R, 6, .1, 4.4, 'HER HONEYNESS', 'paper', 120);
}, (H, R, t) => {
  const [x, y] = H.p(6, 4, 1.3);
  creature(H, R, x, y, 'bee', t * .1, 1.7);
  shape(H, R, [[x - 15, y - 79], [x - 18, y - 99], [x - 7, y - 89], [x, y - 105], [x + 8, y - 89], [x + 18, y - 99], [x + 15, y - 79]], 'sun');
  for (let k = 0; k < 7; k++) creature(H, R, ...H.p(2 + k % 4 * 2.3, 7 + Math.floor(k / 4) * 2, .6 + Math.sin(t * 2 + k) * .2), 'bee', t + k, .55);
  for (const i of [2, 10]) { const z = .4 + cycle(t + i, 7) * 2.8; box(H, R, i - .5, 4.7, 1.1, 1.1, z, .1, 'coral'); bottle(H, R, ...H.p(i, 5.2, z + .1), 'sun', .7); }
});

const circus = world('circus-rehearsal', 'Circus rehearsal tent', { floor: 'sun', tone: .3, wall: false, head: 90 }, (H, R) => {
  const peak = H.p(6, 1, 5.5);
  for (let k = 0; k < 12; k++) shape(H, R, [peak, H.p(k, .3, .1), H.p(k + 1, .3, .1)], k % 2 ? 'coral' : 'paper', .85);
  for (const i of [.5, 11.5]) box(H, R, i, 1, .15, .15, 0, 4, 'blue');
  strings(H, R, [[.5, 1, 4], [6, 5, 3.2], [11.5, 1, 4]]);
  const [x, y] = H.p(6, 7, .05); oval(H, R, x, y, 175, 81, 'coral', .45); H.outline(R, ell(x, y, 158, 71), 'sun', 3);
  box(H, R, 8.5, 8, 2, 1.8, 0, .7, 'teal');
  for (let k = 0; k < 7; k++) shape(H, R, starPts(...H.p(1.7 + k * 1.35, 2.1, 1.1 + k % 2 * .3), 8, 3, 5), 'sun');
  plaque(H, R, 6, .1, 4.7, 'PRACTICE MAKES MAGIC', 'sun', 152);
  for (let k = 0; k < 4; k++) oval(H, R, ...H.p(1 + k * .7, 10.5), 9, 9, inks[k]);
}, (H, R, t) => {
  actor(H, R, 4, 6, t, 'wave', { shirt: ['coral', .8] }, 0, 1.35);
  const [x, y] = H.p(4, 6, 1.7);
  for (let k = 0; k < 5; k++) { const a = t * 2 + k * TAU / 5; oval(H, R, x + Math.cos(a) * 30, y - 25 - Math.abs(Math.sin(a)) * 40, 5, 5, inks[k % 3]); }
  const [ex, ey] = H.p(9.2, 8.7, .8);
  oval(H, R, ex, ey - 31, 39, 30, 'teal', .6); oval(H, R, ex + 28, ey - 48, 22, 23, 'teal', .6);
  oval(H, R, ex + 17, ey - 46, 17, 22, 'coral', .5); H.dot(ex + 38, ey - 53, 2, 'blue');
  stroke(H, R, [[ex + 44, ey - 42], [ex + 61, ey - 34], [ex + 64, ey - 70]], 'teal', 11);
  for (const dx of [-25, -8, 12, 26]) H.line(R, [[ex + dx, ey - 16], [ex + dx, ey]], 'teal', 9);
  const fy = ey - 81 + Math.sin(t) * 5; shape(H, R, [[ex + 63, fy], [ex + 58, fy - 16], [ex + 67, fy - 28], [ex + 73, fy - 15]], 'paper', 1);
  H.line(R, [[ex + 65, fy], [ex + 67, fy - 23]], 'blue', .6);
  const a = H.p(3, 3, 3.5), b = H.p(9, 3, 3.5); H.line(R, [a, b], 'blue', 1);
  actor(H, R, 6 + Math.sin(t * .3), 3, t, 'wave', { shirt: ['teal', .8] }, 3.5, .8);
});

function crystal(H, R, x, y, height, width, ink, light = 0) {
  shape(H, R, [[x - width, y], [x - width, y - height * .75], [x, y - height], [x + width, y - height * .75], [x + width, y]], ink, .6 + light * .3);
  shape(H, R, [[x, y], [x, y - height], [x + width, y - height * .75], [x + width, y]], 'blue', .2);
  H.line(R, [[x - width + 3, y - 4], [x - width + 3, y - height * .72], [x - 2, y - height + 6]], 'paper', 1.3);
}
const cavern = world('crystal-cavern', 'Crystal cavern', { floor: 'blue', tone: .9, wall: 'blue', wallTone: .85, height: 3.7 }, (H, R) => {
  for (let k = 0; k < 35; k++) {
    const i = k < 16 ? .8 + k * .65 : .3 + R() * 2, j = k < 16 ? .6 + R() * 1.4 : 1 + R() * 10;
    crystal(H, R, ...H.p(i, j), 28 + R() * 65, 8 + R() * 9, inks[k % 3]);
  }
  for (let n = 0; n < 5; n++) { const [x, y] = H.p(4 + n * 1.2, 9.5); oval(H, R, x, y, 14, 7, 'teal', .4); }
  for (let j = 4; j < 12; j += .8) H.line(R, [H.p(8.5, j), H.p(10.5, j)], 'coral', 3);
  for (const i of [8.8, 10.2]) H.line(R, [H.p(i, 4), H.p(i, 12)], 'paper', 1.6);
  box(H, R, 8.7, 8, 1.8, 1.4, .2, .7, 'teal');
  for (let n = 0; n < 6; n++) crystal(H, R, ...H.p(8.8 + R() * 1.5, 8.2 + R(), 1), 15 + R() * 12, 5, 'coral');
  plaque(H, R, 7, .2, 3.4, 'LISTEN TO THE STONE', 'paper', 142);
}, (H, R, t) => {
  const pulse = .5 + Math.sin(t * 2) * .5;
  const [x, y] = H.p(5.8, 5.5);
  H.glow(x, y - 35, 110, 80, 'teal', .4 * pulse);
  crystal(H, R, x, y, 110, 27, 'teal', pulse);
  actor(H, R, 7.3, 6.8, t, 'reach', { shirt: ['sun', .8] });
  for (let k = 0; k < 4; k++) {
    const u = cycle(t + k, 4); H.opacity(1 - u, () => H.outline(R, ell(x, y - 45, 35 + u * 100, 20 + u * 55), 'sun', .9));
  }
});

export default [memories, noodles, hive, circus, cavern];
