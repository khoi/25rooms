import { world, box, table, shape, oval, stroke, windowOn, plant, cycle, steam, ell } from '../../worlds/common.js';
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
});

export default room;
