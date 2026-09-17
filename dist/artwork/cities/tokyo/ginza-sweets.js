import { world, box, table, shape, oval, stroke, wallRect, cycle, ell } from '../../worlds/common.js';
import { FIGURES, arcPts } from '../../drawings.js';

function sweet(H, R, x, y, kind, s = 1) {
  oval(H, R, x, y + 2 * s, 9 * s, 4 * s, 'paper', 1);
  if (kind === 0) {
    for (let k = 0; k < 10; k++) {
      const a = k * Math.PI / 5;
      oval(H, R, x + Math.cos(a) * 5 * s, y - 5 * s + Math.sin(a) * 3.5 * s, 3.2 * s, 4 * s, k % 2 ? 'sun' : 'paper', .75);
    }
    H.dot(x, y - 5 * s, 2.5 * s, 'sun', 1);
  } else if (kind === 1) {
    const points = [[-9, -3], [-4, -7], [-6, -12], [-1, -10], [1, -16], [4, -10], [10, -11], [7, -6], [12, -3], [4, -1], [0, 3], [-2, 0]].map(([a, b]) => [x + a * s, y + b * s]);
    shape(H, R, points, 'coral', .68, .6);
    H.line(R, [[x, y + 2 * s], [x + s, y - 13 * s]], 'sun', .8);
    H.line(R, [[x, y - 3 * s], [x - 5 * s, y - 8 * s]], 'sun', .7);
  } else if (kind === 2) {
    oval(H, R, x, y - 2 * s, 9 * s, 5 * s, 'sun', .8);
    H.line(R, arcPts(x, y - 3 * s, 8.5 * s, 3 * s, 0, Math.PI, 10), 'blue', 2 * s);
    oval(H, R, x, y - 6 * s, 9 * s, 4 * s, 'coral', .3);
  } else if (kind === 3) {
    shape(H, R, [[x - 9 * s, y], [x + 7 * s, y + 2 * s], [x + 10 * s, y - 3 * s], [x + 10 * s, y - 11 * s], [x - 6 * s, y - 13 * s], [x - 9 * s, y - 8 * s]], 'blue', .75, .6);
    H.line(R, [[x - 9 * s, y - 8 * s], [x + 7 * s, y - 6 * s], [x + 10 * s, y - 11 * s]], 'coral', .8);
  } else {
    oval(H, R, x, y - 4 * s, 8 * s, 7 * s, kind === 4 ? 'paper' : 'coral', kind === 4 ? 1 : .25);
    H.line(R, arcPts(x - 1, y - 4 * s, 5 * s, 4 * s, Math.PI, Math.PI * 1.4, 8), 'sun', .7);
  }
}

function gift(H, R, i, j, z, w = .9, d = .74, ink = 'paper', ribbon = true) {
  box(H, R, i, j, w, d, z, .29, ink, ink === 'paper' ? 1 : .55);
  box(H, R, i - .03, j - .03, w + .06, d + .06, z + .29, .05, ink, ink === 'paper' ? 1 : .65);
  if (ribbon) {
    H.line(R, [H.p(i + w / 2, j, z + .35), H.p(i + w / 2, j + d, z + .35), H.p(i + w / 2, j + d, z)], 'coral', 2.2);
    H.line(R, [H.p(i, j + d / 2, z + .35), H.p(i + w, j + d / 2, z + .35), H.p(i + w, j + d / 2, z)], 'coral', 2.2);
    const [x, y] = H.p(i + w / 2, j + d / 2, z + .36);
    for (const side of [-1, 1]) H.line(R, [[x, y], [x + side * 7, y - 6], [x + side * 9, y - 1], [x, y]], 'coral', 1.3);
  }
}

function caseFront(H, R) {
  for (const [i, j, w, d] of [[1.35, 5.15, 8.6, 1.5], [8.45, 2.35, 1.5, 2.8]]) {
    const front = H.faceI(i, j + d, w, .99, 1.91);
    H.tint(front, 'teal', .055);
    H.outline(R, front, 'blue', .8, { tone: .6 });
    H.line(R, [H.p(i, j + d, 1.91), H.p(i + w, j + d, 1.91)], 'paper', 2);
    for (let q = .12; q < w; q += 2.1) H.line(R, [H.p(i + q, j + d, 1), H.p(i + q, j + d, 1.9)], 'blue', .6, { tone: .4 });
    for (const q of [.35, .55]) H.line(R, [H.p(i + w * q, j + d, 1.35), H.p(i + w * q + .4, j + d, 1.69)], 'paper', 1.2);
    H.outline(R, H.tile(i, j, w, d, 1.91), 'blue', .65, { tone: .5 });
  }
}

const room = world('tokyo-ginza-sweets', 'A box for someone else — Ginza department-store food hall', { floor: 'paper', tone: 1, wall: 'paper', wallTone: 1, pattern: 'tiles', accent: 'sun', height: 4.4, head: 20 }, (H, R) => {
  for (const i of [.5, 5.6, 11.35]) box(H, R, i, .15, .27, .4, 0, 4.22, 'sun', .23);
  for (const z of [1.9, 2.85]) {
    box(H, R, .75, .35, 4.5, .74, z, .08, 'sun', .4);
    for (let k = 0; k < 3; k++) gift(H, R, 1 + k * 1.33, .49, z + .1, .93, .5, k % 2 ? 'coral' : 'paper');
  }
  const opening = wallRect(H, 'ne', 6.35, 10.85, .1, 3.65);
  shape(H, R, opening, 'blue', .22);
  H.clip(opening, () => {
    for (let k = 0; k < 12; k++) {
      const i = 6.55 + k * .32, z = .2 + k * .2;
      H.line(R, [H.p(i, -.03, z), H.p(i + 1.05, -.03, z)], 'paper', 2);
      H.line(R, [H.p(i, -.03, z), H.p(i, -.03, z + .18)], 'blue', .6);
    }
    H.line(R, [H.p(6.25, -.04, .72), H.p(10.2, -.04, 3.17)], 'blue', 5);
    H.line(R, [H.p(7.05, -.04, .27), H.p(11.05, -.04, 2.73)], 'blue', 5);
    H.line(R, [H.p(6.25, -.04, .75), H.p(10.2, -.04, 3.2)], 'paper', 1);
  });
  for (const j of [2.7, 7.8]) {
    H.line(R, [H.p(.15, j, 4.05), H.p(.15, j + 2.6, 4.05)], 'sun', 4, { tone: .55 });
    H.line(R, [H.p(.15, j, 4.08), H.p(.15, j + 2.6, 4.08)], 'paper', 2);
  }
  table(H, R, 1.45, 2.2, 5.25, 1.55, 1.1, 'paper');
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(1.85 + k * .57, 2.6, 1.24);
    oval(H, R, x, y, 7, 4, k === 1 ? 'coral' : 'sun', .65);
    oval(H, R, x, y, 2.5, 1.5, 'paper', 1);
  }
  for (let k = 0; k < 3; k++) shape(H, R, H.tile(4.98 + k * .025, 2.4 + k * .02, 1.34, .74, 1.23 + k * .006), k % 2 ? 'sun' : 'paper', k % 2 ? .16 : 1, .55);
  H.line(R, [H.p(5.23, 3.3, 1.24), H.p(6.15, 3.18, 1.24)], 'sun', 3);
  gift(H, R, 1.62, 3.02, 1.24, .52, .46, 'paper');
  for (const [i, j, w, d] of [[1.35, 5.15, 8.6, 1.5], [8.45, 2.35, 1.5, 2.8]]) {
    box(H, R, i, j, w, d, 0, .92, 'paper', 1);
    box(H, R, i, j, w, d, .92, .1, 'sun', .35);
    H.line(R, [H.p(i, j + d, .16), H.p(i + w, j + d, .16)], 'sun', 2);
    for (const di of [0, w]) for (const dj of [0, d]) H.line(R, [H.p(i + di, j + dj, 1.02), H.p(i + di, j + dj, 1.91)], 'sun', 1.2);
  }
  for (let group = 0; group < 5; group++) {
    const i = 1.6 + group * 1.62;
    box(H, R, i, 5.4, 1.34, .99, 1.02, .07, 'blue', .65);
    for (let k = 0; k < 4; k++) if (group !== 3 || k !== 3) sweet(H, R, ...H.p(i + .34 + k % 2 * .66, 5.65 + Math.floor(k / 2) * .48, 1.12), group, .66);
  }
  for (let k = 0; k < 3; k++) {
    box(H, R, 8.65, 2.58 + k * .77, 1.05, .65, 1.03, .06, 'blue', .65);
    for (let q = 0; q < 2; q++) sweet(H, R, ...H.p(8.92 + q * .52, 2.93 + k * .77, 1.12), k % 2 ? 1 : 0, .7);
  }
  caseFront(H, R);
  const [px, py] = H.p(2.25, 5.18, 1.95);
  shape(H, R, [[px - 12, py - 5], [px + 12, py - 5], [px + 12, py + 5], [px - 12, py + 5]], 'blue', .6);
  H.line(R, [[px - 9, py - 3], [px + 9, py - 3]], 'sun', .8);
  const [tx, ty] = H.p(7.66, 5.08, 1.95);
  H.line(R, [[tx - 10, ty - 4], [tx + 8, ty + 2], [tx - 11, ty + 1]], 'blue', 1);
  for (let k = 0; k < 4; k++) shape(H, R, H.tile(6.69 + k * .01, 5.16 + k * .01, .5, .49, 1.95 + k * .007), 'paper', 1, .4);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(1.1, 8.18 + k * .75, 0);
    shape(H, R, [[x - 11, y], [x + 11, y], [x + 10, y - 27], [x - 10, y - 27]], k === 1 ? 'coral' : 'paper', k === 1 ? .4 : 1);
    H.line(R, arcPts(x, y - 27, 5, 8, Math.PI, Math.PI * 2, 10), 'sun', 1.3);
  }
  box(H, R, 10.5, 7.9, .67, .83, 0, 1.03, 'paper', 1);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(10.63 + k * .13, 8.24, 1.05);
    H.line(R, [[x, y], [x + k - 2, y - 22]], 'teal', 2, { tone: .2 });
  }
  box(H, R, 10.6, 4.4, .75, .85, 0, 1.27, 'sun', .22);
  const [fx, fy] = H.p(10.97, 4.8, 1.28);
  shape(H, R, [[fx - 7, fy], [fx + 7, fy], [fx + 5, fy - 23], [fx - 5, fy - 23]], 'teal', .6);
  for (let k = 0; k < 4; k++) {
    const dx = (k - 1.5) * 10, dy = -39 - k % 2 * 13;
    stroke(H, R, [[fx, fy - 16], [fx + dx * .3, fy - 30], [fx + dx, fy + dy]], 'teal', 1);
    sweet(H, R, fx + dx, fy + dy, k % 2, .55);
  }
}, (H, R, t) => {
  const u = cycle(t, 18), fold = Math.min(1, u / .32), present = Math.sin(Math.PI * Math.min(1, Math.max(0, (u - .55) / .4)));
  H.at(4.15, 4.1, 0, HH => {
    const [x, y] = HH.p(4.15, 4.1);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: present > .15 ? 'hold' : 'water', phase: t / 9, scale: 1.23, face: 'se', opts: { shirt: ['paper', 1], apron: ['blue', .6], hairStyle: 'bun', sleeve: ['paper', 1] } });
    const i = 3.55, j = 3.17 + present * 1.9, z = 1.24 + present * .82;
    if (present < .05) {
      const w = 1.3 - fold * .6;
      shape(HH, R, HH.tile(i - w * .45, j - w * .45, 1.2 + w, .86 + w, 1.245), 'paper', 1, .6);
    }
    gift(HH, R, i, j, z, 1.2, .86, 'paper', u > .34);
    if (u > .3 && u < .5) {
      const [bx, by] = HH.p(i + .6, j + .43, z + .36), length = (u - .3) / .2 * 20;
      HH.line(R, [[bx - length, by], [bx, by - 3], [bx + length, by]], 'coral', 1.6);
    }
  });
  H.at(7.48, 4.2, 0, HH => {
    const [x, y] = HH.p(7.48, 4.2);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'water', phase: t / 12, scale: 1.16, face: 'se', opts: { shirt: ['paper', 1], apron: ['teal', .5], hairStyle: 'short' } });
    const adjustment = .1 * Math.max(0, Math.cos(t * Math.PI / 9));
    sweet(HH, R, ...HH.p(7.46 + adjustment, 6.13, 1.12), 3, .66);
    caseFront(HH, R);
  });
  H.at(5, 8.15, 0, HH => {
    const [x, y] = HH.p(5, 8.15);
    FIGURES.draw(HH, R, { who: 'elder', x, y, t, clip: 'hold', phase: t / 8, scale: 1.24, face: 'nw', opts: { shirt: ['coral', .5], hair: ['blue', .4], prop: (A, B, p) => {
      const [hx, hy] = p.farHand;
      A.line(B, [[hx, hy - 4], [hx + 8, hy + 39]], 'blue', 1.2);
      shape(A, B, [[hx - 1, hy + 4], [hx + 6, hy + 4], [hx + 11, hy + 34], [hx + 6, hy + 37]], 'coral', .7, .6);
      A.line(B, arcPts(hx + 2, hy - 5, 3, 4, Math.PI, Math.PI * 2, 8), 'blue', 1.4);
    } } });
  });
});

export default room;
