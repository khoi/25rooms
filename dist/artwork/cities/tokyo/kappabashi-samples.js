import { world, box, table, shape, oval, stroke, windowOn, cycle, lamp, ell } from '../../worlds/common.js';
import { FIGURES, arcPts } from '../../drawings.js';

function dish(H, R, x, y, r = 16) {
  oval(H, R, x, y, r, r * .4, 'paper', 1);
  H.outline(R, ell(x, y, r * .8, r * .29), 'teal', .65);
}

function shrimp(H, R, x, y, s = 1) {
  stroke(H, R, [[x - 10 * s, y], [x - 6 * s, y - 8 * s], [x + 3 * s, y - 10 * s], [x + 10 * s, y - 4 * s]], 'sun', 7 * s);
  for (let k = 0; k < 7; k++) H.dot(x - 8 * s + k * 2.6 * s, y - 4 * s - Math.sin(k / 6 * Math.PI) * 4 * s, 1.4 * s, 'coral', .5);
  shape(H, R, [[x + 8 * s, y - 3 * s], [x + 16 * s, y - 8 * s], [x + 15 * s, y], [x + 10 * s, y]], 'coral', .7, .65);
}

function ramen(H, R, x, y, s = 1) {
  shape(H, R, [[x - 25 * s, y - 9 * s], [x + 25 * s, y - 9 * s], [x + 14 * s, y + 11 * s], [x - 14 * s, y + 11 * s]], 'coral', .65);
  oval(H, R, x, y - 9 * s, 25 * s, 9 * s, 'paper', 1);
  oval(H, R, x, y - 9 * s, 21 * s, 6 * s, 'sun', .55);
  for (let k = 0; k < 5; k++) stroke(H, R, [[x - 8 * s + k * 3 * s, y - 5 * s], [x - 11 * s + k * 3 * s, y - 23 * s], [x - 9 * s + k * 3 * s, y - 44 * s], [x - 6 * s + k * 3 * s, y - 49 * s]], 'sun', 1.7 * s);
  H.line(R, [[x - 20 * s, y - 49 * s], [x + 20 * s, y - 54 * s]], 'blue', 1.6 * s);
  H.line(R, [[x - 20 * s, y - 46 * s], [x + 20 * s, y - 51 * s]], 'blue', 1.6 * s);
  oval(H, R, x + 12 * s, y - 10 * s, 6 * s, 4 * s, 'paper', 1);
  oval(H, R, x + 12 * s, y - 10 * s, 3 * s, 2 * s, 'sun', 1);
  for (let k = 0; k < 4; k++) H.dot(x - 16 * s + k * 4 * s, y - 11 * s, 2 * s, 'teal', .7);
  H.line(R, [[x + 19 * s, y - 17 * s], [x + 12 * s, y - 22 * s], [x + 8 * s, y - 12 * s]], 'blue', 4 * s);
}

function parfait(H, R, x, y, s = 1) {
  oval(H, R, x, y, 9 * s, 3 * s, 'paper', 1);
  H.line(R, [[x, y], [x, y - 10 * s]], 'blue', 1.5 * s);
  shape(H, R, [[x - 12 * s, y - 37 * s], [x + 12 * s, y - 37 * s], [x + 5 * s, y - 11 * s], [x - 5 * s, y - 11 * s]], 'paper', 1, .7);
  for (let k = 0; k < 3; k++) oval(H, R, x, y - (18 + k * 7) * s, (6 + k * 2) * s, 3 * s, k % 2 ? 'coral' : 'sun', .5);
  for (const dx of [-6, 2, 7]) oval(H, R, x + dx * s, y - 39 * s - (dx === 2 ? 5 : 0) * s, 6 * s, 6 * s, 'paper', 1);
  H.dot(x + 2 * s, y - 50 * s, 3 * s, 'coral', .9);
  H.line(R, [[x + 6 * s, y - 40 * s], [x + 15 * s, y - 61 * s]], 'sun', 3 * s);
}

function soda(H, R, x, y, s = 1) {
  shape(H, R, [[x - 7 * s, y], [x + 7 * s, y], [x + 9 * s, y - 30 * s], [x - 9 * s, y - 30 * s]], 'paper', 1, .7);
  shape(H, R, [[x - 5 * s, y - 2 * s], [x + 5 * s, y - 2 * s], [x + 7 * s, y - 24 * s], [x - 7 * s, y - 24 * s]], 'teal', .4, .3);
  oval(H, R, x, y - 29 * s, 9 * s, 5 * s, 'paper', 1);
  H.dot(x + 4 * s, y - 33 * s, 2.5 * s, 'coral', .9);
  H.line(R, [[x - 2 * s, y - 5 * s], [x - 6 * s, y - 42 * s]], 'coral', 1.2);
}

function workbench(H, R) {
  table(H, R, 3.4, 4.2, 5.2, 2.25, 1.05, 'teal');
  shape(H, R, H.tile(3.65, 4.47, 2.5, 1.65, 1.18), 'paper', 1);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(6.65 + k * .65, 4.65, 1.18);
    oval(H, R, x, y - 4, 6, 6, 'paper', 1);
    oval(H, R, x, y - 10, 6, 2, ['coral', 'sun', 'teal'][k], .7);
    H.line(R, [[x + 1, y - 9], [x + 6, y - 23]], 'blue', 1);
  }
  dish(H, R, ...H.p(4.45, 5.2, 1.2), 15);
  shrimp(H, R, ...H.p(4.45, 5.2, 1.22), .9);
  for (let k = 0; k < 3; k++) {
    box(H, R, 6.27 + k * .64, 5.35, .52, .67, 1.18, .08, 'coral', .28);
    const [x, y] = H.p(6.53 + k * .64, 5.66, 1.27);
    oval(H, R, x, y, 5, 3, 'paper', 1);
  }
  const [tx, ty] = H.p(5.65, 6, 1.19);
  H.line(R, [[tx - 14, ty], [tx + 7, ty - 5], [tx - 13, ty + 4]], 'blue', .9);
  H.line(R, [[tx + 10, ty], [tx + 25, ty - 6]], 'sun', 1.7);
  H.line(R, [[tx + 25, ty - 6], [tx + 29, ty - 7]], 'blue', 2);
  const [lx, ly] = H.p(3.65, 4.54, 1.2);
  stroke(H, R, [[lx, ly], [lx - 6, ly - 24], [lx + 12, ly - 40]], 'blue', 2);
  oval(H, R, lx + 12, ly - 40, 10, 5, 'paper', 1);
  oval(H, R, lx + 12, ly - 40, 6, 3, 'teal', .13);
  box(H, R, 8.17, 5.95, .16, .37, 1.1, .3, 'blue', .65);
  H.line(R, [H.p(8.28, 6.1, 1.4), H.p(8.28, 6.1, 1.65)], 'blue', 1);
}

const room = world('tokyo-kappabashi-samples', 'Lunch that lasts forever — Kappabashi food-sample studio', { floor: 'sun', tone: .14, wall: 'paper', wallTone: 1, pattern: 'tiles', height: 4.15, head: 20 }, (H, R) => {
  windowOn(H, R, 'nw', 7.7, .7, 6.65, 3.03, { sky: 'teal', skyTone: .1, frameInk: 'coral' });
  for (const z of [.58, 1.75, 2.92]) {
    box(H, R, .55, .35, 10.8, .85, z, .1, 'sun', .5);
    for (let k = 0; k < 8; k++) {
      const [x, y] = H.p(1.2 + k * 1.35, .83, z + .11);
      if (z > 2.5) {
        for (let q = 0; q < 3; q++) oval(H, R, x, y - q * 4, 12, 5, 'paper', 1);
      } else if (k % 3 === 0) parfait(H, R, x, y, .62);
      else if (k % 3 === 1) soda(H, R, x, y, .64);
      else {
        dish(H, R, x, y, 15);
        oval(H, R, x - 4, y - 4, 6, 3, 'paper', 1);
        shape(H, R, [[x - 10, y - 7], [x + 4, y - 7], [x + 2, y - 3], [x - 9, y - 3]], 'coral', .7, .5);
      }
    }
  }
  H.line(R, [H.p(.08, 1.8, 3.1), H.p(.08, 4.1, 3.1)], 'blue', 2);
  for (let k = 0; k < 6; k++) {
    const [x, y] = H.p(.12, 2 + k * .37, 3);
    H.line(R, [[x, y], [x, y + 26]], 'blue', 1.2);
    if (k % 2) {
      for (const dx of [-3, 0, 3]) stroke(H, R, [[x, y + 22], [x + dx, y + 34], [x + dx * .7, y + 41], [x, y + 43]], 'blue', .7);
    } else oval(H, R, x, y + 33, 5, 7, 'paper', 1);
  }
  table(H, R, 1, 7, 1.5, 3.6, .86, 'coral');
  box(H, R, 1.17, 7.2, 1.15, 1.04, .99, .22, 'paper', 1);
  ramen(H, R, ...H.p(1.75, 7.72, 1.23), 1.03);
  dish(H, R, ...H.p(1.7, 9.9, 1), 20);
  shrimp(H, R, ...H.p(1.5, 9.8, 1.02), .8);
  shrimp(H, R, ...H.p(1.95, 10.1, 1.03), .8);
  table(H, R, 9.6, 2.6, 1.7, 3.6, .94, 'sun');
  for (let k = 0; k < 4; k++) {
    box(H, R, 9.8, 2.9 + k * .75, 1.25, .62, 1.07, .09, 'teal', .4);
    for (let q = 0; q < 3; q++) {
      const [x, y] = H.p(10 + q * .39, 3.18 + k * .75, 1.19);
      oval(H, R, x, y, 5, 3, k % 2 ? 'coral' : 'sun', .5);
    }
  }
  workbench(H, R);
  for (let k = 0; k < 4; k++) {
    box(H, R, 9 + k % 2 * 1.2, 8.45 + Math.floor(k / 2) * 1.25, 1.03, 1.08, 0, .7 + k % 2 * .17, 'sun', .45);
    H.line(R, [H.p(9.51 + k % 2 * 1.2, 8.45 + Math.floor(k / 2) * 1.25, .7 + k % 2 * .17), H.p(9.51 + k % 2 * 1.2, 9.53 + Math.floor(k / 2) * 1.25, .7 + k % 2 * .17)], 'paper', 2);
  }
  table(H, R, 4, 9.05, 3.1, 1.45, .9, 'paper');
  const [cx, cy] = H.p(6.3, 9.75, 1.03);
  oval(H, R, cx, cy, 11, 4, 'coral', .23);
  H.line(R, arcPts(cx, cy, 9, 3, .4, 4.8, 14), 'blue', .65, { tone: .4 });
  shape(H, R, [[cx - 6, cy - 2], [cx + 6, cy - 2], [cx + 7, cy - 14], [cx - 7, cy - 14]], 'paper', 1, .7);
  oval(H, R, cx, cy - 14, 7, 2.5, 'sun', .5);
  H.line(R, arcPts(cx + 7, cy - 8, 3.5, 4, -Math.PI / 2, Math.PI / 2, 10), 'blue', 1);
  H.line(R, [[cx - 3, cy - 13], [cx - 4, cy - 5]], 'coral', .65, { tone: .45 });
  soda(H, R, ...H.p(6.6, 9.14, 1.03), .65);
  const [fx, fy] = H.p(4.55, 9.8, 1.04);
  dish(H, R, fx, fy, 12);
  shape(H, R, [[fx - 9, fy], [fx + 9, fy], [fx, fy - 15]], 'coral', .6);
  H.line(R, [[fx - 9, fy], [fx + 9, fy]], 'teal', 3);
  for (const dx of [-3, 2]) H.dot(fx + dx, fy - 5, 1, 'blue');
}, (H, R, t) => {
  const u = cycle(t, 11);
  H.at(5.05, 3.6, 0, HH => {
    const [x, y] = HH.p(5.05, 3.6);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'water', phase: t / 5, scale: 1.25, face: 'se', opts: { shirt: ['coral', .7], apron: ['paper', 1], hairStyle: 'bun' } });
    workbench(HH, R);
    const [bx, by] = HH.p(4.45, 5.2, 1.27), dip = Math.max(0, Math.sin(u * Math.PI * 2));
    const tx = bx + 7 + Math.sin(t * 2) * 2 + dip * 26, ty = by - dip * 16;
    HH.line(R, [[tx + 12, ty - 18], [tx, ty]], 'blue', 1.4);
    HH.line(R, [[tx, ty], [tx - 2, ty + 3]], 'coral', 2);
  });
  H.at(8.25, 7.35, 0, HH => {
    const [x, y] = HH.p(8.25, 7.35);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'hold', phase: t / 5, scale: 1.2, face: 'sw', opts: { shirt: ['sun', .7], apron: ['teal', .6], prop: (A, B, p) => {
      for (const hand of [p.nearHand, p.farHand]) {
        shape(A, B, [[hand[0] - 9, hand[1] - 5], [hand[0] + 9, hand[1] - 5], [hand[0] + 5, hand[1] + 3], [hand[0] - 5, hand[1] + 3]], 'paper', 1, .65);
        oval(A, B, hand[0], hand[1] - 5, 9, 3, 'sun', .5);
      }
    } } });
  });
  H.at(5.2, 9.3, 1.03, HH => {
    const [x, y] = HH.p(5.2, 9.3, 1.03);
    oval(HH, R, x, y, 19, 7, 'blue', .7);
    H.line(R, [[x, y], [x + Math.cos(t * .22) * 16, y + Math.sin(t * .22) * 5]], 'sun', 1.5);
    parfait(HH, R, x + Math.sin(t * .22) * 3, y - 4, .75);
  });
});

export default room;
