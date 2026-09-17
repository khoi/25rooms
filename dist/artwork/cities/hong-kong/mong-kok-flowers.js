import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const arrange = { ...rest, lean: -8, head: 12, al: 58, ar: 64, el: 48, er: 42 };
FIGURES.clips.hongKongFlowerArrange = { dur: 14, keys: [[0, arrange], [.15, arrange], [.32, { ...arrange, al: 77, el: 22, ar: 62, head: 18 }], [.46, { ...arrange, al: 64, el: 53, ar: 78, er: 29 }], [.6, { ...arrange, al: 48, el: 85, ar: 52, er: 76, head: -4 }], [.77, { ...arrange, al: 48, el: 85, ar: 52, er: 76, head: -4 }], [.94, arrange], [1, arrange]] };

function stem(H, R, x, y, length, ink, lean = 0, kind = 0) {
  stroke(H, R, [[x, y], [x + lean * .4, y - length * .55], [x + lean, y - length]], 'teal', 1.2);
  for (let q = 0; q < 2; q++) {
    const yy = y - length * (.3 + q * .24), side = q % 2 ? 1 : -1;
    shape(H, R, [[x + lean * .4, yy], [x + lean * .4 + side * 8, yy - 8], [x + lean * .4 + side * 6, yy - 1]], 'teal', .65, .4);
  }
  const xx = x + lean, yy = y - length;
  if (kind === 1) {
    for (let q = 0; q < 5; q++) oval(H, R, xx + Math.sin(q * 2) * 3, yy + q * 4, 3.5, 5, ink, .7);
  } else {
    for (let q = 0; q < 5; q++) oval(H, R, xx + Math.cos(q * TAU / 5) * 4, yy + Math.sin(q * TAU / 5) * 4, 4, 3.5, ink, .75);
    H.dot(xx, yy, 2.1, 'sun', 1);
  }
}

function bucket(H, R, i, j, z, ink, count = 6, tall = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 13, y - 23], [x + 13, y - 23], [x + 10, y], [x - 10, y]], 'blue', .5, .85);
  oval(H, R, x, y - 23, 13, 5, 'paper', 1);
  oval(H, R, x, y - 23, 10, 3, 'teal', .45);
  for (let q = 0; q < count; q++) stem(H, R, x - 7 + q * 14 / count, y - 24, 24 + q % 3 * 6 + (tall ? 15 : 0), ink, (q - count / 2) * 3.3, tall ? 1 : 0);
  stroke(H, R, [[x - 12, y - 17], [x - 17, y - 7], [x, y + 3], [x + 17, y - 7], [x + 12, y - 17]], 'paper', .7, .8);
}

function wrap(H, R, x, y, length = 27) {
  shape(H, R, [[x - 16, y - length], [x + 15, y - length - 5], [x + 6, y + 10], [x - 3, y + 10]], 'paper', 1, .7);
  H.line(R, [[x - 8, y - 8], [x + 8, y - 10]], 'coral', 2.2);
}

const room = world('hong-kong-mong-kok-flowers', 'Mong Kok · Water between stems', { floor: 'paper', tone: .44, wall: 'teal', wallTone: .2, height: 3.6, head: 20 }, (H, R) => {
  shape(H, R, wallRect(H, 'ne', .5, 6.05, .1, 3.4), 'blue', .24, .8);
  for (let z = .2; z < 3.4; z += .16) H.line(R, [wallPt(H, 'ne', .54, z, .04), wallPt(H, 'ne', 6, z, .04)], 'blue', .65, { tone: .5 });
  shape(H, R, wallRect(H, 'ne', 6.55, 11.45, .9, 3.16), 'paper', .8, .8);
  for (let q = 0; q < 5; q++) {
    const i = 6.65 + q * .95;
    H.line(R, [H.p(i, .04, 1.02), H.p(i, .04, 3.07)], 'teal', 1.2);
    stem(H, R, ...H.p(i + .42, .09, 1.05), 40 + q % 2 * 8, q % 2 ? 'sun' : 'paper', 3, 1);
  }
  for (let q = 0; q < 10; q++) {
    const j = .15 + q * .9;
    const awning = [H.p(.06, j, 3.56), H.p(1.56, j, 3.28), H.p(1.56, j + .87, 3.28), H.p(.06, j + .87, 3.56)];
    shape(H, R, awning, q % 2 ? 'paper' : 'coral', q % 2 ? 1 : .58, .65);
    shape(H, R, H.faceJ(1.56, j, .87, 3.03, 3.28), q % 2 ? 'paper' : 'coral', q % 2 ? 1 : .58, .65);
  }
  table(H, R, 1.1, 1.2, 1.25, 6.15, .42, 'teal');
  for (let q = 0; q < 5; q++) bucket(H, R, 1.72, 1.72 + q * 1.12, .59, ['coral', 'paper', 'sun', 'coral', 'paper'][q], 6, q % 2 === 0);
  for (let q = 0; q < 5; q++) bucket(H, R, 3.3 + q * 1.42, 2.25 + Math.sin(q * .68) * .9, .03, ['sun', 'coral', 'paper', 'coral', 'sun'][q], 7, q === 3);
  table(H, R, 4.0, 5.15, 3.85, 1.4, 1.0, 'paper');
  shape(H, R, H.tile(4.14, 5.31, 1.52, 1.03, 1.14), 'teal', .22, .5);
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(4.45 + q * .2, 5.8, 1.16);
    stem(H, R, x, y, 30 + q * 3, 'coral', 21 + q * 2);
  }
  const [sx, sy] = H.p(7.24, 5.87, 1.16);
  for (const dx of [-5, 5]) oval(H, R, sx + dx, sy, 4, 3, 'coral', .7);
  H.line(R, [[sx - 3, sy - 1], [sx + 10, sy - 13]], 'blue', 1.4);
  H.line(R, [[sx + 3, sy - 1], [sx - 6, sy - 13]], 'blue', 1.4);
  for (let q = 0; q < 4; q++) box(H, R, 6.23, 5.25, .67, .64, 1.14 + q * .035, .025, q === 3 ? 'sun' : 'paper', q === 3 ? .2 : 1);
  const [rx, ry] = H.p(7.3, 5.4, 1.19);
  oval(H, R, rx, ry - 7, 8, 9, 'coral', .5);
  oval(H, R, rx, ry - 7, 3, 4, 'paper', 1);
  stroke(H, R, [[rx + 7, ry - 6], [rx + 19, ry - 1], [rx + 14, ry + 7]], 'coral', 1.5);
  box(H, R, 4.24, 5.45, 1.2, .86, .02, .53, 'blue', .35);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(4.36 + q * .17, 6.32, .12), H.p(4.36 + q * .17, 6.32, .44)], 'paper', .6);
  table(H, R, 9.35, 1.42, 1.85, 1.35, .72, 'coral');
  for (let q = 0; q < 3; q++) wrap(H, R, ...H.p(9.77 + q * .46, 1.95, .87), 32 + q * 4);
  const [wx, wy] = H.p(10.7, 5.12, .02);
  shape(H, R, [[wx - 17, wy], [wx + 16, wy], [wx + 12, wy - 33], [wx - 11, wy - 33]], 'sun', .65, .9);
  oval(H, R, wx, wy - 33, 12, 5, 'paper', 1);
  stroke(H, R, [[wx - 11, wy - 18], [wx - 26, wy - 22], [wx - 34, wy - 31]], 'sun', 5);
  stroke(H, R, [[wx + 11, wy - 27], [wx + 25, wy - 32], [wx + 24, wy - 8], [wx + 15, wy - 8]], 'blue', 1.6);
  shape(H, R, H.tile(1.05, 9.95, 2.15, 1.13, .015), 'blue', .4, .6);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(1.13 + q * .23, 9.99, .03), H.p(1.13 + q * .23, 11.01, .03)], 'paper', .7);
  bucket(H, R, 3.92, 9.93, .02, 'paper', 5);
  for (const [i, j, s] of [[3.3, 7.7, 18], [8.1, 9.1, 26], [10.1, 6.4, 17]]) H.tint(H.tile(i, j, s / 20, .45, .015), 'teal', .16);
  const [lx, ly] = H.p(6.4, 10.57, .03);
  shape(H, R, [[lx - 5, ly], [lx + 4, ly - 7], [lx + 11, ly - 2], [lx + 3, ly + 2]], 'coral', .6, .4);
}, (H, R, t) => {
  const u = cycle(t, 14);
  actor(H, R, 6.62, 7.16, t, 'hongKongFlowerArrange', { shirt: ['paper', 1], apron: ['teal', .7], hairStyle: 'bun', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.farHand;
    const twist = Math.sin(TAU * u) * 4;
    wrap(HH, RR, x, y + 4, 24);
    for (let q = 0; q < 5; q++) stem(HH, RR, x + q - 2, y + 4, 29 + q % 3 * 4, q % 2 ? 'paper' : 'coral', (q - 2) * 5 + twist);
    const [nx, ny] = points.nearHand;
    stroke(HH, RR, [[nx, ny], [x + 2, y - 5], [x + 9, y - 8]], 'coral', 1.2);
  } }, 0, 1.38);
  actor(H, R, 9.55, 8.66, 0, 'hold', { shirt: ['sun', .63], face: 'nw', hairStyle: 'short', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    stroke(HH, RR, [[x - 7, y + 10], [x - 6, y], [x + 5, y], [x + 8, y + 10]], 'blue', 1);
    shape(HH, RR, [[x - 11, y + 8], [x + 12, y + 8], [x + 10, y + 30], [x - 10, y + 30]], 'paper', 1, .8);
    oval(HH, RR, x, y + 18, 5, 4, 'coral', .6);
  } }, 0, 1.28);
  const [x, y] = H.p(3.3, 2.25, .55);
  H.opacity(.15 + .12 * Math.sin(u * TAU) ** 2, () => H.outline(R, [[x - 6, y - 4], [x + 5, y - 3], [x + 7, y]], 'paper', .8));
});

room.loopSeconds = 14;
export default room;
