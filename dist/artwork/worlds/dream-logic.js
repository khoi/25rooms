import { world, shape, oval, stroke, label, plaque, box, table, bench, actor, creature, steam, lantern, bottle, parcels, strings, ell, curve, cycle, inks, TAU, pool, ripple, mushroom, windowOn, plant, rug, starPts } from './common.js';

function chessPiece(H, R, x, y, kind, ink, tilt = 0) {
  oval(H, R, x, y, 17, 6, ink, .8);
  shape(H, R, [[x - 13, y - 4], [x - 7 + tilt, y - 14], [x - 5 + tilt, y - 32], [x + 5 + tilt, y - 32], [x + 7, y - 14], [x + 13, y - 4]], ink, .75);
  if (kind === 'rook') {
    shape(H, R, [[x - 12, y - 32], [x - 12, y - 47], [x - 6, y - 47], [x - 6, y - 40], [x - 2, y - 40], [x - 2, y - 47], [x + 4, y - 47], [x + 4, y - 40], [x + 8, y - 40], [x + 8, y - 47], [x + 13, y - 47], [x + 13, y - 32]], ink, .8);
  } else {
    oval(H, R, x + tilt, y - 36, 10, 12, ink, .8);
    if (kind === 'king') { H.line(R, [[x + tilt, y - 46], [x + tilt, y - 62]], 'sun', 3); H.line(R, [[x - 6 + tilt, y - 56], [x + 6 + tilt, y - 56]], 'sun', 3); }
    if (kind === 'queen') shape(H, R, [[x - 10, y - 43], [x - 13, y - 58], [x - 3, y - 50], [x + 1, y - 62], [x + 6, y - 50], [x + 13, y - 58], [x + 10, y - 43]], 'sun');
  }
  H.dot(x - 4 + tilt, y - 36, 1.5, ink === 'blue' ? 'paper' : 'blue');
  H.dot(x + 4 + tilt, y - 36, 1.5, ink === 'blue' ? 'paper' : 'blue');
  stroke(H, R, [[x + 14, y - 25], [x + 24, y - 26], [x + 25, y + 3]], 'coral', 1.5);
}
const retirement = world('chess-retirement', 'Chess retirement home', { floor: 'paper', tone: 1, wall: 'teal', wallTone: .35, height: 3.2, pattern: 'tiles', accent: 'blue' }, (H, R) => {
  windowOn(H, R, 'ne', 7, 1, 4, 1.8, { sky: 'sun', skyTone: .35 });
  plaque(H, R, 3, .1, 2.8, 'NO MORE CHECKMATES', 'sun', 137);
  table(H, R, 4, 4.4, 3.4, 2.7, 1, 'coral');
  for (let k = 0; k < 8; k++) box(H, R, 4.4 + k % 4 * .65, 4.8 + Math.floor(k / 4), .45, .65, 1.15, .02, 'paper', 1);
  for (const [i, j] of [[3.2, 4.7], [7.5, 4.7], [4.7, 7.2], [1.5, 9.7]]) bench(H, R, i, j, 1.4, 'teal');
  table(H, R, 1, 1.2, 2.8, 1.2, 1.2, 'sun');
  for (const i of [1.5, 2.5]) bottle(H, R, ...H.p(i, 1.8, 1.35), 'teal', .6);
  plant(H, R, ...H.p(10, 2), 1.8); plant(H, R, ...H.p(10.5, 10), 1.5);
  const [x, y] = H.p(.05, 7, 2); oval(H, R, x, y, 17, 17, 'paper'); H.line(R, [[x, y - 10], [x, y], [x + 8, y + 4]], 'blue', 1);
}, (H, R, t) => {
  for (const [i, j, kind, ink] of [[3.7, 5.2, 'king', 'paper'], [8, 5.4, 'queen', 'blue'], [5.3, 7.8, 'rook', 'paper']]) chessPiece(H, R, ...H.p(i, j, .65), kind, ink, Math.sin(t * .5 + i));
  const step = Math.floor(cycle(t, 12) * 4);
  chessPiece(H, R, ...H.p(2 + step, 10, .1), 'pawn', 'blue');
  const [x, y] = H.p(5, 5.5, 1.25); label(H, ['♠', '♥', '♦', '♣'][Math.floor(t / 3) % 4], x, y, 12, '#ee6852');
});

const dentist = world('monster-dentist', 'Monster dentist', { floor: 'teal', tone: .25, wall: 'paper', wallTone: .8, wallStyle: 'tile', height: 3.5, pattern: 'tiles' }, (H, R) => {
  for (let i = .6; i < 11; i += 1.8) { box(H, R, i, .5, 1.65, 1.3, 0, 1.5, 'teal', .4); H.line(R, [H.p(i + .65, 1.82, .7), H.p(i + 1.05, 1.82, .7)], 'sun', 2); }
  plaque(H, R, 6, .1, 3, 'EVERY TOOTH COUNTS', 'coral', 145);
  box(H, R, 4, 4.5, 3.8, 3.5, .7, .5, 'coral');
  box(H, R, 4, 4.5, 3.8, .45, 1.2, 1.6, 'coral');
  box(H, R, 5.4, 5.4, 1, 1, 0, .7, 'blue');
  for (const i of [2.8, 3.6]) H.line(R, [H.p(i, 7.5), H.p(i, 6.7, 2.6)], 'sun', 3);
  for (let z = .3; z < 2.6; z += .35) H.line(R, [H.p(2.8, 7.5 - z * .3, z), H.p(3.6, 7.5 - z * .3, z)], 'blue', 2);
  table(H, R, 9, 5, 1.7, 2.7, 1.1, 'paper');
  for (let k = 0; k < 7; k++) { const [x, y] = H.p(9.3 + k * .2, 6, 1.25); stroke(H, R, [[x, y], [x + 7, y - 14], [x + 3, y - 19]], 'blue', 1.1); }
  const [x, y] = H.p(7, 3, 3.2); H.line(R, [H.p(10.5, 2, 0), H.p(10.5, 2, 3.2), [x, y]], 'blue', 3); oval(H, R, x, y, 27, 12, 'sun');
}, (H, R, t) => {
  creature(H, R, ...H.p(6, 6.5, 1.3), 'monster', t, 2.1, 'teal');
  actor(H, R, 3.3, 6.9, t, 'reach', { shirt: ['paper', 1] }, 1.3, 1);
  const [x, y] = H.p(5.8, 6.5, 1.8); H.line(R, [[x - 45, y - 6], [x - 9 + Math.sin(t * 4) * 3, y]], 'sun', 3);
  creature(H, R, ...H.p(10, 10), 'monster', t, .65, 'coral');
  label(H, '…', ...H.p(10, 10, 1.5), 20);
});

const dreams = world('dream-delivery', 'Dream delivery depot', { floor: 'blue', tone: .72, wall: 'teal', wallTone: .6, height: 3.7, pattern: 'tiles' }, (H, R) => {
  for (let row = 0; row < 3; row++) for (let col = 0; col < 8; col++) {
    box(H, R, .7 + col * 1.3, .7, 1.2, 1.2, row * .9, .82, (row + col) % 3 ? 'coral' : 'sun', .4);
    label(H, String(101 + row * 8 + col), ...H.p(1.3 + col * 1.3, 1.92, row * .9 + .45), 6);
  }
  table(H, R, 1.2, 5, 9.5, 2, .9, 'blue');
  for (let i = 1.3; i < 10.7; i += .25) H.line(R, [H.p(i, 5.1, 1.04), H.p(i, 6.9, 1.04)], 'teal', 1.2);
  for (const i of [1.2, 10.7]) { box(H, R, i, 5, .2, .2, 1, 2.1, 'sun'); box(H, R, i, 6.8, .2, .2, 1, 2.1, 'sun'); H.line(R, [H.p(i, 5, 3.1), H.p(i, 7, 3.1)], 'sun', 3); }
  plaque(H, R, 5.9, .2, 3.5, 'HANDLE WITH WONDER', 'paper', 144);
  parcels(H, R, 1, 9, 8); table(H, R, 8, 9, 2.6, 1.7, .8, 'coral');
  label(H, 'SWEET DREAMS →', ...H.p(6, 7.4, .5), 10, '#ffd428');
}, (H, R, t) => {
  for (let k = 0; k < 5; k++) {
    const u = cycle(t + k * 2, 10), i = 1.7 + u * 8;
    box(H, R, i, 5.5, .8, 1, 1.08, .6, inks[k % 3], .6);
    const [x, y] = H.p(i + .4, 6, 1.8); shape(H, R, starPts(x, y, 7, 3, 5), 'sun');
  }
  actor(H, R, 6.3, 7.8, t, 'point', { shirt: ['sun', .7] });
  for (let k = 0; k < 4; k++) {
    const u = cycle(t + k * 2, 8), [x, y] = H.p(9.5, 8.7, .8 + u * 3);
    H.opacity(Math.sin(u * Math.PI), () => { oval(H, R, x + Math.sin(u * 6 + k) * 22, y, 20, 23, 'paper', .4); label(H, ['☾', 'Z', '★', '♥'][k], x + Math.sin(u * 6 + k) * 22, y, 14, '#ee6852'); });
  }
});

function foldedWrestler(H, R, x, y, ink, lean, size = 1) {
  const p = points => points.map(([a, b]) => [x + (a + lean * (-b / 40)) * size, y + b * size]);
  shape(H, R, p([[-23, -8], [-10, -36], [0, -43], [12, -35], [25, -8], [12, 0], [-12, 0]]), ink, .7);
  shape(H, R, p([[-10, -36], [-12, -55], [9, -58], [15, -40], [0, -35]]), 'paper', 1);
  shape(H, R, p([[-21, -23], [-36, -33], [-30, -40], [-9, -29]]), ink);
  shape(H, R, p([[18, -26], [37, -35], [40, -28], [21, -14]]), ink);
  for (const points of [[[-10, -36], [0, -13], [12, 0]], [[12, -35], [0, -13], [-12, 0]], [[-23, -8], [0, -13], [25, -8]]]) H.line(R, p(points), 'blue', .8);
  H.dot(...p([[-4, -46]])[0], 1.2, 'blue'); H.dot(...p([[5, -46]])[0], 1.2, 'blue');
}
const sumo = world('origami-sumo', 'Origami sumo arena', { floor: 'sun', tone: .25, wall: 'teal', wallTone: .4, pattern: 'boards', height: 2.8 }, (H, R) => {
  box(H, R, 2.2, 3.2, 7.5, 6, 0, .65, 'coral', .4);
  const [x, y] = H.p(6, 6.2, .68); oval(H, R, x, y, 145, 67, 'sun', .45);
  H.outline(R, ell(x, y, 139, 62), 'paper', 4);
  for (const i of [5.3, 6.6]) H.line(R, [H.p(i, 5.6, .7), H.p(i, 6.8, .7)], 'paper', 3);
  for (let k = 0; k < 12; k++) {
    const [x, y] = H.p(.7 + k % 6 * 2, k < 6 ? 1.3 : 10.5, .3);
    shape(H, R, [[x - 14, y], [x, y - 23], [x + 14, y], [x, y + 7]], inks[k % 3], .7);
    H.line(R, [[x, y - 23], [x, y + 7]], 'blue', .6);
  }
  plaque(H, R, 6, .2, 2.5, 'FOLD · FIGHT · UNFOLD', 'paper', 162);
  strings(H, R, [[.5, 2, 3.3], [6, 1.5, 2.7], [11.5, 2, 3.3]]);
}, (H, R, t) => {
  const u = cycle(t, 7), collide = Math.sin(u * Math.PI) ** 4;
  foldedWrestler(H, R, ...H.p(4.5 + collide * .65, 6, .7), 'coral', collide * 12, 1.2);
  foldedWrestler(H, R, ...H.p(7.3 - collide * .65, 6.1, .7), 'teal', -collide * 12, 1.2);
  if (collide > .85) { const [x, y] = H.p(6, 6, 1.9); shape(H, R, starPts(x, y, 13, 6, 8), 'sun'); }
  actor(H, R, 6.5, 3.9, t, 'wave', { shirt: ['blue', .8] }, .7, .8);
});

const gravity = world('gravity-flea-market', 'Gravity flea market', { floor: 'paper', tone: 1, wall: 'blue', wallTone: .8, height: 4.8, pattern: 'tiles', head: 70 }, (H, R) => {
  for (const [i, j, ink] of [[1, 2, 'coral'], [7, 2, 'teal'], [1, 8, 'sun']]) {
    table(H, R, i, j, 3.5, 2, 1, ink);
    for (let k = 0; k < 5; k++) bottle(H, R, ...H.p(i + .35 + k * .6, j + .8, 1.13), inks[k % 3], .35 + R() * .4);
    box(H, R, i, j, .08, .08, 1, 1.7, 'blue'); box(H, R, i + 3.4, j, .08, .08, 1, 1.7, 'blue');
    shape(H, R, [H.p(i, j, 2.7), H.p(i + 3.5, j, 2.7), H.p(i + 3.5, j + 2, 2.4), H.p(i, j + 2, 2.4)], ink, .7);
  }
  for (let row = 0; row < 3; row++) {
    box(H, R, .05, 1, .8, 8.5, 1.5 + row, .1, 'coral');
    for (let k = 0; k < 8; k++) {
      const [x, y] = H.p(.5, 1.5 + k, 1.7 + row);
      shape(H, R, [[x - 8, y], [x, y - 17], [x + 8, y], [x, y + 4]], inks[k % 3]);
    }
  }
  plaque(H, R, 6.7, .1, 4.35, 'EVERYTHING MUST FLOAT', 'sun', 161);
  strings(H, R, [[.5, 10, 4], [6, 7, 3.8], [11, 1, 4.2]]);
  parcels(H, R, 8.5, 9.5, 4);
}, (H, R, t) => {
  actor(H, R, 3, 4.5, t, 'talk', { shirt: ['coral', .8] });
  actor(H, R, 9, 4.6, t, 'wave', { shirt: ['sun', .8] }, .7 + Math.sin(t) * .3);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(4 + k * 1.9, 7, 2.2 + Math.sin(t + k) * .4);
    const angle = t * .25 + k;
    const p = [[-13, -9], [13, -9], [13, 9], [-13, 9]].map(([a, b]) => [x + a * Math.cos(angle) - b * Math.sin(angle), y + a * Math.sin(angle) + b * Math.cos(angle)]);
    shape(H, R, p, inks[k], .7); H.line(R, [p[0], p[2]], 'paper', 2);
    for (let n = 0; n < 4; n++) { const a = t + n * 1.5 + k; oval(H, R, x + Math.cos(a) * 30, y + Math.sin(a) * 15, 3, 4, 'sun'); }
  }
  H.op(c => { c.save(); const [x, y] = H.p(10, 8, 3.4); c.translate(x, y); c.rotate(Math.PI); });
  actor(H, R, 0, 0, t, 'walk', { shirt: ['teal', .8] }, 0, 1);
  H.op(c => c.restore());
});

export default [retirement, dentist, dreams, sumo, gravity];
