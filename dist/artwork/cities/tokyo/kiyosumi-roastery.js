import { world, box, table, shape, oval, stroke, windowOn, plant, cycle, steam, ell, actor, wallRect, wallPt } from '../../worlds/common.js';
import { FIGURES, arcPts } from '../../drawings.js';

function mug(H, R, x, y, ink = 'paper', s = 1, chipped = false) {
  shape(H, R, [[x - 6 * s, y], [x + 6 * s, y], [x + 7 * s, y - 12 * s], [x - 7 * s, y - 12 * s]], ink, ink === 'paper' ? 1 : .65, .7);
  oval(H, R, x, y - 12 * s, 7 * s, 2.5 * s, 'blue', .4);
  H.line(R, arcPts(x + 7 * s, y - 7 * s, 4 * s, 4 * s, -Math.PI / 2, Math.PI / 2, 10), 'blue', 1);
  if (chipped) shape(H, R, [[x - 4 * s, y - 14 * s], [x - 1 * s, y - 10 * s], [x + 1 * s, y - 14 * s]], 'paper', 1, .4);
}

function kettle(H, R, x, y, s = 1) {
  oval(H, R, x, y - 8 * s, 11 * s, 10 * s, 'paper', 1);
  oval(H, R, x, y - 17 * s, 7 * s, 2.5 * s, 'blue', .6);
  H.dot(x, y - 20 * s, 2 * s, 'blue');
  stroke(H, R, [[x + 9 * s, y - 8 * s], [x + 20 * s, y - 12 * s], [x + 19 * s, y - 23 * s], [x + 26 * s, y - 25 * s]], 'blue', 2 * s);
  H.line(R, arcPts(x - 9 * s, y - 12 * s, 6 * s, 9 * s, Math.PI / 2, Math.PI * 1.5, 12), 'blue', 2 * s);
}

function sack(H, R, i, j, s = 1, open = false) {
  const [x, y] = H.p(i, j);
  const body = [[x - 16 * s, y], [x + 15 * s, y], [x + 13 * s, y - 32 * s], [x + 6 * s, y - 39 * s], [x - 9 * s, y - 39 * s], [x - 14 * s, y - 30 * s]];
  shape(H, R, body, 'sun', .36);
  H.clip(body, () => {
    for (let k = 0; k < 8; k++) H.line(R, [[x - 17 * s, y - k * 5 * s], [x + 17 * s, y - k * 5 * s]], 'coral', .6, { tone: .35 });
    for (let k = 0; k < 6; k++) H.line(R, [[x - 13 * s + k * 5 * s, y], [x - 11 * s + k * 4 * s, y - 39 * s]], 'blue', .45, { tone: .25 });
  });
  if (open) {
    oval(H, R, x - s, y - 37 * s, 12 * s, 5 * s, 'blue', .55);
    for (let k = 0; k < 14; k++) H.dot(x + Math.sin(k * 5) * 9 * s, y - 37 * s + Math.cos(k * 3) * 3 * s, 1.4 * s, 'sun', .8);
  } else H.line(R, [[x - 9 * s, y - 34 * s], [x + 7 * s, y - 34 * s]], 'paper', 2);
}

function brewCounter(H, R) {
  box(H, R, 7.8, 5.55, 3.4, 2.05, 0, 1.02, 'coral', .38);
  box(H, R, 7.7, 5.5, 3.65, 2.2, 1.02, .15, 'paper', 1);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(7.92 + k * .48, 7.61, .08), H.p(7.92 + k * .48, 7.61, .95)], 'sun', 1.1, { tone: .5 });
  box(H, R, 8.05, 5.76, .64, .58, 1.18, .78, 'blue', .7);
  const [gx, gy] = H.p(8.38, 6.04, 1.98);
  shape(H, R, [[gx - 10, gy - 21], [gx + 10, gy - 21], [gx + 5, gy], [gx - 5, gy]], 'paper', .85);
  oval(H, R, gx, gy - 21, 10, 3, 'sun', .5);
  H.line(R, [[gx + 7, gy + 12], [gx + 14, gy + 13]], 'blue', 3);
  for (let k = 0; k < 2; k++) {
    box(H, R, 9.03 + k * 1.06, 6.08, .79, .69, 1.18, .06, 'blue', .65);
    const [x, y] = H.p(9.42 + k * 1.06, 6.41, 1.25);
    shape(H, R, [[x - 7, y], [x + 7, y], [x + 6, y - 15], [x - 6, y - 15]], 'paper', 1, .7);
    shape(H, R, [[x - 11, y - 30], [x + 11, y - 30], [x + 2, y - 15], [x - 2, y - 15]], 'teal', .5, .7);
    oval(H, R, x, y - 30, 11, 4, 'paper', 1);
    oval(H, R, x, y - 30, 7, 2.5, 'blue', .6);
  }
  for (let k = 0; k < 3; k++) mug(H, R, ...H.p(8.25 + k * .82, 7.3, 1.18), 'paper', .65);
  shape(H, R, H.tile(10.23, 7.01, .8, .49, 1.19), 'teal', .25);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(10.55 + k * .035, 5.82, 1.18);
    shape(H, R, [[x - 8, y - k], [x + 8, y - k], [x, y - 15 - k]], 'paper', 1, .45);
  }
}

function coffeeBag(H, R, i, j, z, ink = 'paper', s = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 10 * s, y], [x + 10 * s, y], [x + 11 * s, y - 27 * s], [x + 7 * s, y - 34 * s], [x - 7 * s, y - 34 * s], [x - 11 * s, y - 27 * s]], ink, ink === 'paper' ? 1 : .5, .75);
  H.line(R, [[x - 7 * s, y - 31 * s], [x + 7 * s, y - 31 * s]], 'blue', 1.8);
  shape(H, R, [[x - 6 * s, y - 9 * s], [x + 6 * s, y - 9 * s], [x + 6 * s, y - 21 * s], [x - 6 * s, y - 21 * s]], ink === 'paper' ? 'coral' : 'teal', .5, .4);
  H.line(R, [[x - 9 * s, y], [x - 5 * s, y - 5 * s], [x + 6 * s, y - 5 * s], [x + 10 * s, y]], 'blue', .55);
}

function coffeeDetails(H, R) {
  const chart = wallRect(H, 'nw', 1.3, 3.85, 2.6, 4.13);
  shape(H, R, chart, 'paper', 1);
  H.clip(chart, () => {
    for (let k = 0; k < 4; k++) H.line(R, [wallPt(H, 'nw', 1.44, 2.79 + k * .3), wallPt(H, 'nw', 3.69, 2.79 + k * .3)], 'blue', .65, { tone: .3 });
    stroke(H, R, [wallPt(H, 'nw', 1.48, 2.88), wallPt(H, 'nw', 2.05, 2.97), wallPt(H, 'nw', 2.68, 3.65), wallPt(H, 'nw', 3.55, 3.81)], 'coral', 2);
    stroke(H, R, [wallPt(H, 'nw', 1.48, 3.4), wallPt(H, 'nw', 2.05, 3.18), wallPt(H, 'nw', 2.68, 3.3), wallPt(H, 'nw', 3.55, 3.57)], 'teal', 1.6);
  });
  for (const z of [1.1, 2]) {
    box(H, R, .25, 5.7, .69, 3.7, z, .08, 'sun', .5);
    for (let k = 0; k < 7; k++) coffeeBag(H, R, .57, 5.96 + k * .49, z + .09, k % 2 ? 'sun' : 'paper', .59);
  }
  const [clockX, clockY] = H.p(.07, 4.74, 3.2);
  oval(H, R, clockX, clockY, 16, 16, 'paper', 1);
  H.line(R, [[clockX, clockY - 10], [clockX, clockY], [clockX + 8, clockY + 4]], 'blue', 1.2);
  for (let k = 0; k < 12; k++) H.dot(clockX + Math.sin(k * Math.PI / 6) * 13, clockY + Math.cos(k * Math.PI / 6) * 13, .7, 'coral', .9);
  table(H, R, 3.37, 7.36, 3.91, 1.64, 1.04, 'sun');
  for (let k = 0; k < 3; k++) {
    const i = 3.62 + k * 1.13;
    shape(H, R, H.tile(i, 7.56, .96, 1.2, 1.18), k % 2 ? 'teal' : 'paper', k % 2 ? .22 : 1, .6);
    mug(H, R, ...H.p(i + .42, 7.91, 1.2), 'paper', .79);
    const [x, y] = H.p(i + .43, 8.56, 1.2);
    oval(H, R, x, y, 9, 4, 'blue', .65);
    for (let q = 0; q < 5; q++) H.dot(x - 5 + q * 2.4, y + Math.sin(q * 2) * 2, 1.5, 'sun', .9);
    H.line(R, [[x + 11, y + 3], [x + 19, y - 2]], 'blue', 1);
    oval(H, R, x + 21, y - 3, 3, 2, 'paper', 1);
  }
  for (const i of [3.7, 5.93]) {
    table(H, R, i, 9.6, .76, .69, .56, 'teal');
    box(H, R, i, 10.18, .76, .09, .6, .63, 'teal', .6);
  }
  table(H, R, 5.57, 4.79, 1.58, 1.34, .98, 'teal');
  const [sx, sy] = H.p(6, 5.31, 1.11);
  oval(H, R, sx, sy, 12, 4, 'blue', .7);
  H.line(R, [[sx - 12, sy - 2], [sx - 12, sy - 47], [sx, sy - 47]], 'blue', 2);
  oval(H, R, sx, sy - 23, 12, 14, 'paper', 1);
  oval(H, R, sx, sy - 21, 10, 9, 'coral', .25);
  H.line(R, [[sx, sy - 34], [sx, sy - 45]], 'blue', 2);
  shape(H, R, [[sx - 12, sy - 64], [sx + 12, sy - 64], [sx + 9, sy - 45], [sx - 9, sy - 45]], 'paper', 1);
  oval(H, R, sx, sy - 64, 12, 4, 'sun', .4);
  const [hx, hy] = H.p(6.78, 5.79, 1.11);
  shape(H, R, [[hx - 6, hy], [hx + 6, hy], [hx + 6, hy - 21], [hx - 6, hy - 21]], 'sun', .55);
  oval(H, R, hx, hy - 22, 7, 3, 'blue', .65);
  H.line(R, [[hx, hy - 23], [hx, hy - 29], [hx + 12, hy - 32]], 'blue', 1.3);
  H.dot(hx + 12, hy - 32, 3, 'coral', .8);
  box(H, R, 5.8, 1.02, 1.25, 1.14, .03, .75, 'sun', .45);
  for (let k = 0; k < 4; k++) coffeeBag(H, R, 6.02 + k % 2 * .67, 1.29 + Math.floor(k / 2) * .55, .78, k % 2 ? 'sun' : 'paper', .66);
  for (let k = 0; k < 3; k++) {
    box(H, R, 10.65, 2.92, .85, 1.15, .15 + k * .58, .06, 'sun', .6);
    for (let q = 0; q < 2; q++) coffeeBag(H, R, 11.06, 3.17 + q * .58, .22 + k * .58, q ? 'paper' : 'sun', .6);
  }
  for (const j of [2.92, 4]) box(H, R, 11.5, j, .08, .08, 0, 1.83, 'blue', .65);
  box(H, R, 7.8, 3.11, 1.49, .94, 0, .55, 'teal', .45);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(8.05 + k * .31, 3.61, .58);
    oval(H, R, x, y - 6, 5, 7, 'sun', .4);
    H.line(R, [[x - 5, y - 13], [x + 5, y - 13]], 'paper', 2);
  }
  box(H, R, 4.94, 10.36, 1.53, 1.03, .13, .16, 'coral', .65);
  for (const i of [5.07, 6.2]) for (const j of [10.53, 11.14]) oval(H, R, ...H.p(i, j, .08), 5, 5, 'blue', .85);
  H.line(R, [H.p(4.99, 10.4, .3), H.p(4.99, 10.4, 1.69), H.p(6.42, 10.4, 1.69), H.p(6.42, 10.4, .3)], 'blue', 2.2);
  sack(H, R, 5.72, 10.91, .83);
  box(H, R, 7.75, 10.25, 1.3, .93, 0, .74, 'sun', .4);
  for (let k = 0; k < 3; k++) coffeeBag(H, R, 8.02 + k * .37, 10.72, .76, 'paper', .66);
  const [vx, vy] = H.p(7.95, 7.05, 1.19);
  shape(H, R, [[vx - 6, vy], [vx + 6, vy], [vx + 8, vy - 25], [vx - 5, vy - 25]], 'paper', 1);
  oval(H, R, vx, vy - 25, 7, 2.5, 'teal', .25);
  H.line(R, [[vx + 7, vy - 21], [vx + 12, vy - 18], [vx + 11, vy - 5], [vx + 6, vy - 4]], 'blue', 1.1);
  const [tx, ty] = H.p(11, 5.66, 1.19);
  shape(H, R, [[tx - 8, ty], [tx + 8, ty], [tx + 7, ty - 13], [tx - 7, ty - 13]], 'blue', .65);
  oval(H, R, tx, ty - 8, 4, 4, 'paper', 1);
  H.line(R, [[tx, ty - 8], [tx + 2, ty - 11]], 'coral', .8);
}

const room = world('tokyo-kiyosumi-roastery', 'The first roast — Kiyosumi-Shirakawa coffee warehouse', { floor: 'blue', tone: .12, wall: 'coral', wallTone: .19, wallStyle: 'brick', height: 4.8, head: 20 }, (H, R) => {
  windowOn(H, R, 'ne', 5.4, 2.45, 8.65, 1.85, { sky: 'teal', skyTone: .13, frameInk: 'blue' });
  for (const i of [2.5, 4.5, 6.5, 8.5]) H.line(R, [H.p(i, .03, 2.47), H.p(i, .03, 4.28)], 'blue', 2);
  for (const j of [.25, 5.4, 10.8]) box(H, R, .18, j, .24, .22, .02, 4.7, 'blue', .7);
  box(H, R, .12, .14, 11.62, .3, 4.43, .26, 'blue', .75);
  box(H, R, .12, .18, .3, 11.45, 4.43, .26, 'blue', .75);
  H.tint(H.tile(2.2, 1.2, 6.7, 4.8, .012), 'sun', .1);
  box(H, R, 1.55, 1.6, 3.2, 2.2, 0, .48, 'blue', .75);
  const [rx, ry] = H.p(3.25, 2.6, 1.12);
  shape(H, R, [[rx - 40, ry - 35], [rx + 21, ry - 52], [rx + 45, ry - 27], [rx + 45, ry + 6], [rx - 28, ry + 26]], 'coral', .7);
  oval(H, R, rx + 9, ry - 7, 34, 36, 'sun', .55);
  oval(H, R, rx + 9, ry - 7, 25, 27, 'blue', .68);
  oval(H, R, rx + 9, ry - 7, 17, 19, 'coral', .6);
  H.line(R, [[rx + 8, ry - 10], [rx + 24, ry - 2]], 'blue', 3);
  H.dot(rx + 24, ry - 2, 3.5, 'sun', 1);
  for (let k = 0; k < 8; k++) H.dot(rx + 9 + Math.cos(k * Math.PI / 4) * 29, ry - 7 + Math.sin(k * Math.PI / 4) * 31, 1.5, 'paper', .9);
  stroke(H, R, [H.p(2.5, 1.8, 1.7), H.p(2.5, 1.8, 3.3), H.p(1.1, .2, 3.8), H.p(1.1, .2, 4.45)], 'blue', 12);
  stroke(H, R, [H.p(2.5, 1.8, 1.7), H.p(2.5, 1.8, 3.3), H.p(1.1, .2, 3.8)], 'paper', 2);
  const [hx, hy] = H.p(3.08, 2.28, 2.15);
  shape(H, R, [[hx - 19, hy - 31], [hx + 19, hy - 31], [hx + 6, hy], [hx - 6, hy]], 'paper', 1);
  oval(H, R, hx, hy - 31, 19, 6, 'blue', .5);
  box(H, R, 4.66, 2.14, .53, .8, .72, 1.02, 'teal', .5);
  for (let k = 0; k < 6; k++) H.dot(...H.p(5.2, 2.32 + k % 2 * .3, 1.5 - Math.floor(k / 2) * .23), 2, k === 0 ? 'coral' : 'sun', .8);
  box(H, R, 1.1, 4.6, 1, 1, 0, .83, 'blue', .45);
  const [cx, cy] = H.p(3.55, 4.14, .8);
  oval(H, R, cx, cy + 8, 38, 17, 'blue', .7);
  oval(H, R, cx, cy, 38, 17, 'paper', 1);
  oval(H, R, cx, cy, 34, 14, 'sun', .55);
  for (let k = 0; k < 62; k++) H.dot(cx + Math.sin(k * 6.12) * (5 + k % 5 * 6), cy + Math.cos(k * 2.17) * (2 + k % 4 * 3), 1.1, 'blue', .6);
  sack(H, R, 1.2, 7.1, .9);
  sack(H, R, 2.3, 7.4, 1.02, true);
  sack(H, R, 1.3, 8.4, .94);
  const [sx, sy] = H.p(2.3, 7.4, 1.08);
  oval(H, R, sx, sy, 7, 3, 'paper', 1);
  H.line(R, [[sx + 5, sy], [sx + 15, sy - 8]], 'blue', 2);
  table(H, R, 7.7, 1.15, 3.5, 1.6, .94, 'sun');
  for (let k = 0; k < 4; k++) {
    box(H, R, 7.9 + k * .77, 1.3, .62, .49, 1.08, .65, 'paper', 1);
    H.line(R, [H.p(7.95 + k * .77, 1.55, 1.73), H.p(8.46 + k * .77, 1.55, 1.73)], 'coral', 2);
  }
  box(H, R, 8, 2.04, 1.15, .47, 1.07, .12, 'blue', .6);
  box(H, R, 8, 2.04, 1.15, .12, 1.2, .12, 'teal', .7);
  shape(H, R, H.tile(9.4, 2, .8, .55, 1.09), 'paper', 1);
  H.line(R, [H.p(9.77, 2, 1.1), H.p(9.77, 2.55, 1.1)], 'blue', .6);
  mug(H, R, ...H.p(10.66, 2.3, 1.08), 'teal', .65, true);
  brewCounter(H, R);
  for (const i of [8.5, 10.5]) table(H, R, i, 8.5, .6, .6, .61, 'sun');
  const [bx, by] = H.p(.9, 10.7, .1);
  for (const dx of [-22, 25]) {
    oval(H, R, bx + dx, by - 15, 17, 18, 'paper', 1);
    for (let k = 0; k < 8; k++) H.line(R, [[bx + dx, by - 15], [bx + dx + Math.cos(k * Math.PI / 4) * 16, by - 15 + Math.sin(k * Math.PI / 4) * 17]], 'blue', .55);
  }
  H.line(R, [[bx - 22, by - 15], [bx - 5, by - 39], [bx + 9, by - 15], [bx - 22, by - 15], [bx + 17, by - 36], [bx + 25, by - 15]], 'coral', 2.4);
  H.line(R, [[bx + 17, by - 36], [bx + 15, by - 45], [bx + 26, by - 44]], 'blue', 2);
  H.line(R, [[bx - 11, by - 42], [bx + 1, by - 42]], 'blue', 3);
  for (const j of [10.65, 10.93]) stroke(H, R, [H.p(1.2, j, .015), H.p(3.3, j + .15, .015), H.p(5, j - .23, .015)], 'blue', 1, .18);
  box(H, R, 10.35, 10.3, .94, .85, 0, .6, 'sun', .5);
  plant(H, R, ...H.p(10.8, 10.7, .6), .8);
  coffeeDetails(H, R);
}, (H, R, t) => {
  H.at(3.55, 4.14, .81, HH => {
    const [x, y] = HH.p(3.55, 4.14, .81);
    for (let k = 0; k < 3; k++) {
      const a = t * .24 + k * Math.PI * 2 / 3;
      HH.line(R, [[x, y], [x + Math.cos(a) * 32, y + Math.sin(a) * 12]], 'blue', 2);
    }
    HH.dot(x, y, 3, 'coral', .85);
  });
  H.at(5.7, 3.3, 0, HH => {
    const [x, y] = HH.p(5.7, 3.3);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'think', phase: t / 8, scale: 1.22, face: 'sw', opts: { shirt: ['teal', .7], apron: ['sun', .45], prop: (A, B, p) => {
      const [hx, hy] = p.nearHand;
      A.line(B, [[hx, hy], [hx - 13, hy - 8]], 'blue', 1.3);
      oval(A, B, hx - 15, hy - 9, 5, 2, 'paper', 1);
      A.dot(hx - 15, hy - 10, 1.3, 'blue', .7);
    } } });
  });
  H.at(9.3, 4.7, 0, HH => {
    const u = cycle(t, 16), pouring = u > .12 && u < .55;
    const [x, y] = HH.p(9.3, 4.7);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: pouring ? 'water' : 'hold', phase: t / 8, scale: 1.22, face: 'se', opts: { shirt: ['paper', 1], apron: ['blue', .55], hairStyle: 'pony' } });
    brewCounter(HH, R);
    const [kx, ky] = HH.p(pouring ? 8.95 : 8.9, pouring ? 6.05 : 6.95, pouring ? 2.05 : 1.18);
    const drift = pouring ? Math.sin(t * 1.3) * 2 : 0;
    kettle(HH, R, kx + drift, ky, .65);
    if (pouring) {
      const [dx, dy] = HH.p(9.42, 6.41, 1.25);
      stroke(HH, R, [[kx + 17 + drift, ky - 16], [kx + 18, ky - 6], [dx + Math.sin(t * 1.3) * 2, dy - 29]], 'teal', .85, .65);
    }
    steam(HH, R, ...HH.p(9.42, 6.41, 2.04), t * .5, 2);
  });
  H.at(4.04, 9.92, .05, HH => {
    const [x, y] = HH.p(4.04, 9.92, .05);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'drink', phase: t / 9, scale: 1.3, face: 'nw', opts: { shirt: ['coral', .65], hairStyle: 'bun', prop: (A, B, p) => mug(A, B, p.nearHand[0], p.nearHand[1], 'paper', .63) } });
  });
  H.at(6.28, 9.9, .05, HH => {
    const [x, y] = HH.p(6.28, 9.9, .05);
    FIGURES.draw(HH, R, { who: 'elder', x, y, t, clip: 'read', phase: t / 7, scale: 1.25, face: 'nw', opts: { shirt: ['sun', .55], glasses: true, prop: (A, B, p) => {
      const [hx, hy] = p.nearHand;
      shape(A, B, [[hx - 11, hy - 8], [hx + 10, hy - 4], [hx + 9, hy + 8], [hx - 12, hy + 4]], 'paper', 1, .65);
      A.line(B, [[hx - 8, hy - 3], [hx + 6, hy]], 'teal', .7);
    } } });
  });
  H.at(9.58, 3.11, 0, HH => {
    const [x, y] = HH.p(9.58, 3.11);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'hold', phase: t / 6, scale: 1.28, face: 'nw', opts: { shirt: ['teal', .6], apron: ['paper', 1], prop: (A, B, p) => {
      const [hx, hy] = p.nearHand, seal = Math.max(0, Math.sin(t * .62)) * 5;
      shape(A, B, [[hx - 8, hy + 3], [hx + 8, hy + 3], [hx + 7, hy - 19], [hx - 7, hy - 19]], 'sun', .4, .65);
      A.line(B, [[hx - 6, hy - 17 + seal], [hx + 6, hy - 17 + seal]], 'coral', 2);
    } } });
  });
  H.at(6, 5.31, 1.13, HH => {
    const [x, y] = HH.p(6, 5.31, 1.11);
    for (let k = 0; k < 3; k++) {
      const v = cycle(t + k * 1.3, 4.5);
      HH.dot(x - 4 + k * 4, y - 15 - v * 13, 1 + v * .4, 'paper', .8);
    }
  });
});

export default room;
