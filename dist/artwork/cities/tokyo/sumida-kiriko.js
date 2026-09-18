import { world, box, table, shape, oval, stroke, windowOn, cycle, lamp, ell, actor, wallRect } from '../../worlds/common.js';
import { FIGURES, arcPts } from '../../drawings.js';

function glass(H, R, x, y, ink = 'blue', s = 1, cut = 2, turn = 0) {
  const p = (a, b) => [x + a * s, y + b * s];
  const body = [p(-9, -24), p(9, -24), p(7, 0), p(-7, 0)];
  shape(H, R, body, ink, .64, .7);
  H.clip(body, () => {
    if (cut) {
      for (let k = -3; k < 5; k++) {
        const a = k * 7 + turn % 7;
        H.line(R, [p(a - 13, -25), p(a + 12, 2)], 'paper', 1.1 * s, { tone: .9, amp: 0 });
        if (cut > 1) H.line(R, [p(a + 13, -25), p(a - 12, 2)], 'paper', 1.1 * s, { tone: .9, amp: 0 });
      }
    }
    H.line(R, [p(-5, -21), p(-4, -4)], 'paper', 1.5 * s, { tone: .7 });
  });
  oval(H, R, x, y - 24 * s, 9 * s, 3 * s, 'paper', 1);
  oval(H, R, x, y - 24 * s, 7 * s, 1.5 * s, ink, .3);
  H.line(R, arcPts(x, y - 1, 7 * s, 2 * s, 0, Math.PI, 10), 'paper', 1.2);
}

function basin(H, R, i, j, z, w = 1.4) {
  box(H, R, i, j, w, .9, z, .12, 'blue', .55);
  shape(H, R, H.tile(i + .09, j + .09, w - .18, .72, z + .13), 'teal', .2);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .2, j + .2 + k * .2, z + .14), H.p(i + w - .17, j + .2 + k * .2, z + .14)], 'paper', .8);
}

function wheelBench(H, R) {
  for (const i of [1.08, 5.05]) for (const j of [3.8, 5.08]) {
    box(H, R, i, j, .15, .15, .06, .94, 'teal', .8);
    box(H, R, i - .04, j - .04, .23, .23, .02, .05, 'blue', .8);
  }
  box(H, R, 1.05, 3.76, 4.14, 1.46, .25, .08, 'blue', .6);
  box(H, R, 1, 3.7, 4.3, 1.6, 1.01, .16, 'paper', 1);
  for (const i of [1.16, 4.86]) H.line(R, [H.p(i, 3.83, .3), H.p(i, 5.13, .98)], 'teal', 1.7);
  box(H, R, 2.21, 4.02, 1.65, .94, .34, .42, 'paper', 1);
  shape(H, R, H.faceI(2.42, 4.98, 1.24, .41, .67), 'teal', .25, .5);
  stroke(H, R, [H.p(3.95, 4.55, 1.16), H.p(3.95, 4.55, .62), H.p(3.37, 4.55, .58)], 'teal', 2.3);
  for (const i of [1.3, 4.54]) {
    const [x, y] = H.p(i, 4.64, .35);
    oval(H, R, x, y - 9, 10, 12, 'blue', .7);
    oval(H, R, x, y - 9, 4, 5, 'paper', 1);
  }
  box(H, R, 1.94, 3.87, 1.32, 1.03, 1.18, .11, 'blue', .75);
  box(H, R, 2.05, 3.95, 1.08, .87, 1.29, .44, 'teal', .75);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(2.15 + k * .16, 4.83, 1.37), H.p(2.15 + k * .16, 4.83, 1.64)], 'paper', .8);
  for (const i of [2.01, 3.13]) for (const j of [3.94, 4.8]) oval(H, R, ...H.p(i, j, 1.3), 2.5, 1.5, 'sun', .8);
  box(H, R, 1.24, 4.58, .47, .41, 1.18, .16, 'blue', .7);
  oval(H, R, ...H.p(1.47, 4.82, 1.36), 4, 2, 'coral', .85);
  stroke(H, R, [H.p(1.23, 4.77, 1.26), H.p(.93, 4.9, .74), H.p(.86, 4.35, .09), H.p(.15, 3.47, .09), H.p(.15, 3.47, 1.42)], 'blue', 1.2);
  basin(H, R, 3.02, 4.02, 1.18, 1.6);
  const [x, y] = H.p(3.1, 4.53, 1.68);
  oval(H, R, x, y - 11, 7, 23, 'blue', .8);
  oval(H, R, x + 4, y - 11, 5, 22, 'paper', .8);
  H.line(R, arcPts(x + 3, y - 11, 12, 28, Math.PI, Math.PI * 2, 18), 'teal', 5);
  H.line(R, [H.p(2.12, 4.27, 1.6), [x - 3, y - 11]], 'blue', 4);
  stroke(H, R, [H.p(1.4, 3.9, 1.2), H.p(1.4, 3.9, 2.6), H.p(3.4, 4.1, 2.6), [x + 6, y - 31]], 'blue', 2);
  const [vx, vy] = H.p(1.4, 3.9, 2.25);
  oval(H, R, vx, vy, 5, 4, 'coral', .8);
  H.line(R, [[vx - 7, vy], [vx + 7, vy]], 'coral', 2);
  glass(H, R, ...H.p(1.55, 4.65, 1.18), 'coral', .55, 1);
  const [lx, ly] = H.p(4.85, 4.07, 1.18);
  lamp(H, R, lx, ly, 29, { ink: 'sun' });
  const [cx, cy] = H.p(4.82, 4.86, 1.19);
  H.line(R, [[cx - 13, cy + 5], [cx + 9, cy - 5]], 'blue', 1.2);
  for (const dx of [-9, 6]) H.line(R, [[cx + dx, cy + 7], [cx + dx - 3, cy - 5]], 'blue', 1.2);
}

function cutVessel(H, R, x, y, kind = 0, ink = 'blue', s = 1) {
  const raw = kind === 0 ? [[-21, -22], [21, -22], [15, -6], [6, 0], [-6, 0], [-15, -6]] : [[-14, 0], [14, 0], [17, -26], [7, -38], [6, -60], [-6, -60], [-7, -38], [-17, -26]];
  const body = raw.map(([a, b]) => [x + a * s, y + b * s]);
  shape(H, R, body, ink, .6);
  H.clip(body, () => {
    for (let k = -5; k < 6; k++) {
      const a = k * 8 * s;
      H.line(R, [[x - 35 * s, y + a], [x + 35 * s, y - 70 * s + a]], 'paper', 1.1);
      H.line(R, [[x + 35 * s, y + a], [x - 35 * s, y - 70 * s + a]], 'paper', 1.1);
    }
  });
  oval(H, R, x, y - (kind ? 60 : 22) * s, (kind ? 6 : 21) * s, (kind ? 2.6 : 7) * s, 'paper', 1);
  oval(H, R, x, y - (kind ? 60 : 22) * s, (kind ? 4 : 17) * s, (kind ? 1.5 : 4) * s, ink, .3);
  if (kind) {
    shape(H, R, [[x - 6 * s, y - 63 * s], [x, y - 73 * s], [x + 6 * s, y - 63 * s], [x, y - 58 * s]], ink, .55, .65);
  }
}

function finishingRoom(H, R) {
  for (let k = 0; k < 3; k++) {
    box(H, R, 1.32 + k * 3.24, 1.02, 2.88, .73, .04, .62, 'teal', .38);
    for (let q = 0; q < 3; q++) {
      const i = 1.42 + k * 3.24 + q * .91;
      H.outline(R, H.faceI(i, 1.76, .76, .14, .53), 'blue', .65);
      H.line(R, [H.p(i + .27, 1.78, .36), H.p(i + .49, 1.78, .36)], 'sun', 2);
    }
  }
  for (const [i, ink] of [[2.8, 'coral'], [6.25, 'blue'], [9.7, 'coral']]) cutVessel(H, R, ...H.p(i, 1.04, 2.88), 0, ink, .72);
  const board = wallRect(H, 'nw', 6.25, 8.5, 2.42, 3.75);
  shape(H, R, board, 'sun', .3);
  for (let k = 0; k < 7; k++) {
    const [x, y] = H.p(.05, 6.48 + k % 4 * .47, 3.38 - Math.floor(k / 4) * .53);
    H.line(R, [[x, y - 9], [x, y + 14]], 'blue', 1.4);
    if (k % 2) {
      H.line(R, [[x - 6, y + 10], [x - 6, y + 17], [x + 6, y + 17], [x + 6, y + 10]], 'blue', 1.1);
    } else oval(H, R, x, y + 14, 6, 7, 'coral', .4);
  }
  box(H, R, .65, 6.34, 1.3, 2.13, 0, .94, 'teal', .6);
  shape(H, R, H.faceJ(1.96, 6.49, 1.8, .12, .78), 'paper', 1, .7);
  for (const j of [6.61, 7.45]) {
    shape(H, R, H.faceJ(1.97, j, .66, .24, .65), 'teal', .25, .5);
    H.line(R, [H.p(1.98, j + .22, .53), H.p(1.98, j + .46, .53)], 'blue', 1.5);
  }
  basin(H, R, .63, 6.36, .95, 1.34);
  basin(H, R, .63, 7.4, .95, 1.34);
  const [fx, fy] = H.p(.84, 7.41, 1.13);
  stroke(H, R, [[fx, fy], [fx, fy - 30], [fx + 14, fy - 34], [fx + 14, fy - 20]], 'blue', 2.2);
  for (let k = 0; k < 3; k++) glass(H, R, ...H.p(1.48, 6.55 + k * .28, 1.16), k % 2 ? 'coral' : 'blue', .47, 0);
  const [sx, sy] = H.p(1.8, 8.37, 1.08);
  shape(H, R, [[sx - 9, sy - 1], [sx + 9, sy + 1], [sx + 8, sy + 21], [sx - 7, sy + 19]], 'paper', 1);
  for (const dy of [6, 10, 14]) H.line(R, [[sx - 7, sy + dy], [sx + 7, sy + dy + 2]], 'coral', .8);
  table(H, R, 5.77, 2.35, 1.45, 1.68, 1.02, 'sun');
  shape(H, R, H.tile(5.93, 2.54, 1.13, 1.3, 1.15), 'blue', .23);
  for (let k = 0; k < 3; k++) glass(H, R, ...H.p(6.12 + k % 2 * .62, 2.88 + Math.floor(k / 2) * .62, 1.17), k % 2 ? 'coral' : 'blue', .67, k);
  const [cx, cy] = H.p(6.72, 3.6, 1.18);
  H.line(R, [[cx - 12, cy + 2], [cx + 10, cy - 7]], 'blue', 1.3);
  for (const dx of [-8, 5]) H.line(R, [[cx + dx, cy + 6], [cx + dx - 4, cy - 7]], 'blue', 1.2);
  table(H, R, 5.6, 6.9, 1.65, 1.1, .68, 'coral');
  cutVessel(H, R, ...H.p(6.03, 7.39, .81), 1, 'blue', .76);
  cutVessel(H, R, ...H.p(6.91, 7.54, .81), 0, 'coral', .72);
  for (let k = 0; k < 3; k++) {
    box(H, R, 10.95, 2.15 + k * .54, .6, .4, .04, .25 + k * .11, 'sun', .45);
    oval(H, R, ...H.p(11.25, 2.34 + k * .54, .31 + k * .11), 7, 3, 'blue', .5);
  }
  for (const i of [10.7, 11.4]) for (const j of [6.5, 7.75]) box(H, R, i, j, .08, .08, .05, 1.89, 'blue', .65);
  for (const z of [.43, 1.02, 1.61]) {
    box(H, R, 10.63, 6.42, .91, 1.43, z, .055, 'paper', 1);
    for (let k = 0; k < 4; k++) glass(H, R, ...H.p(10.85 + k % 2 * .44, 6.78 + Math.floor(k / 2) * .7, z + .07), k % 2 ? 'coral' : 'blue', .43, 2);
  }
  const [wx, wy] = H.p(3.55, 5.13, .025);
  oval(H, R, wx, wy, 31, 10, 'teal', .12);
  H.line(R, [[wx - 22, wy], [wx - 2, wy + 4], [wx + 22, wy + 1]], 'paper', 1.1);
  for (let k = 0; k < 3; k++) {
    box(H, R, 8.15 + k, 10.69, .85, .73, 0, .45 + k % 2 * .2, 'sun', .48);
    H.line(R, [H.p(8.56 + k, 10.69, .45 + k % 2 * .2), H.p(8.56 + k, 11.42, .45 + k % 2 * .2)], 'coral', 2);
  }
  for (let k = 0; k < 3; k++) shape(H, R, H.tile(9.49 + k * .035, 9.61 + k * .025, .9, .58, .99 + k * .005), 'paper', 1, .5);
  const [rx, ry] = H.p(7.86, 9.76, .02);
  oval(H, R, rx, ry, 11, 5, 'sun', .5);
  oval(H, R, rx, ry - 15, 10, 5, 'paper', 1);
  for (let k = 0; k < 7; k++) H.line(R, [[rx - 9 + k * 3, ry], [rx - 8 + k * 2.6, ry - 15]], 'coral', .8);
}

const room = world('tokyo-sumida-kiriko', 'Light through cut glass — Sumida Edo kiriko workshop', { floor: 'paper', tone: 1, wall: 'paper', wallTone: 1, pattern: 'tiles', accent: 'teal', height: 4.2, head: 20 }, (H, R) => {
  for (const j of [.5, 6.28, 11.5]) box(H, R, .03, j, .23, .2, .02, 4.11, 'teal', .7);
  box(H, R, .02, .06, .32, 11.62, 3.96, .17, 'teal', .65);
  for (const z of [1.47, 3.78]) box(H, R, .03, .64, .36, 5.72, z, .13, 'teal', .6);
  box(H, R, .03, .63, .71, 5.74, 1.36, .13, 'sun', .45);
  shape(H, R, H.faceJ(.17, 3.21, .44, 1.22, 1.61), 'paper', 1, .6);
  for (const j of [3.32, 3.5]) H.line(R, [H.p(.19, j, 1.33), H.p(.19, j, 1.44)], 'blue', 1);
  windowOn(H, R, 'nw', 3.45, 1.6, 5.5, 2.15, { sky: 'sun', skyTone: .16, frameInk: 'teal' });
  for (const j of [1.5, 3.4, 5.3]) H.line(R, [H.p(.03, j, 1.62), H.p(.03, j, 3.73)], 'teal', 1.7);
  H.tint([H.p(.1, 1, .02), H.p(.1, 5.8, .02), H.p(6, 8.1, .02), H.p(7.1, 4.6, .02)], 'sun', .11);
  box(H, R, 1.13, .14, 10.18, .91, .06, 3.65, 'blue', .5);
  box(H, R, 1.07, .14, 10.3, 1.01, 3.69, .15, 'sun', .55);
  for (const z of [.55, 1.65, 2.75]) {
    box(H, R, 1.2, .32, 10.1, .83, z, .12, 'sun', .4);
    for (let k = 0; k < 10; k++) glass(H, R, ...H.p(1.7 + k * .97, .8, z + .13), k % 2 ? 'blue' : 'coral', .63 + k % 3 * .05, z > 2 ? 0 : k % 3);
  }
  for (const i of [1.2, 6.1, 11.14]) box(H, R, i, .28, .13, .88, .1, 3.62, 'teal', .65);
  shape(H, R, H.tile(1.65, 5.4, 3.8, 1.6, .015), 'blue', .25);
  for (let k = 0; k < 10; k++) H.line(R, [H.p(1.8 + k * .34, 5.5, .02), H.p(1.8 + k * .34, 6.8, .02)], 'paper', .8);
  wheelBench(H, R);
  table(H, R, 7.7, 3.65, 3.2, 1.65, 1.07, 'sun');
  box(H, R, 8.02, 3.95, .7, .77, 1.2, .38, 'coral', .5);
  const [px, py] = H.p(8.6, 4.25, 1.6);
  oval(H, R, px, py, 14, 15, 'paper', 1);
  for (let k = 0; k < 12; k++) H.line(R, [[px + Math.cos(k * Math.PI / 6) * 5, py + Math.sin(k * Math.PI / 6) * 5], [px + Math.cos(k * Math.PI / 6) * 13, py + Math.sin(k * Math.PI / 6) * 14]], 'sun', .8);
  basin(H, R, 9.22, 3.93, 1.2, 1.35);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(9.33 + k * .24, 3.95, 1.36), H.p(9.33 + k * .24, 4.75, 1.36)], 'blue', 1);
  glass(H, R, ...H.p(9.65, 4.31, 1.4), 'coral', .53, 2);
  shape(H, R, H.tile(8.05, 4.82, 1.1, .38, 1.21), 'paper', 1);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(8.08, 4.88 + k * .07, 1.22), H.p(9.07, 4.88 + k * .07, 1.22)], 'teal', .65);
  const [gx, gy] = H.p(10.45, 5, 1.21);
  for (const dx of [-5, 5]) oval(H, R, gx + dx, gy, 4, 3, 'paper', 1);
  H.line(R, [[gx - 1, gy], [gx + 1, gy]], 'blue', 1);
  box(H, R, 9.7, 6.05, .7, .72, 0, .8, 'blue', .55);
  const [ax, ay] = H.p(.15, 7.4, 2.15);
  shape(H, R, [[ax - 7, ay], [ax + 7, ay], [ax + 14, ay + 42], [ax - 14, ay + 42]], 'coral', .5);
  H.line(R, arcPts(ax, ay, 6, 9, Math.PI, Math.PI * 2, 10), 'blue', 1);
  for (const i of [1.1, 3.56, 6.0]) box(H, R, i, 9.27, .18, 1.22, .04, .61, 'teal', .7);
  box(H, R, 1.05, 9.2, 5.2, 1.45, .6, .16, 'teal', .65);
  box(H, R, 1.15, 9.32, 5.02, 1.2, .12, .08, 'sun', .5);
  for (let k = 0; k < 3; k++) {
    box(H, R, 1.35 + k * 1.55, 9.43, 1.25, .94, .22, .26, 'paper', 1);
    H.line(R, [H.p(1.98 + k * 1.55, 9.43, .5), H.p(1.98 + k * 1.55, 10.37, .5)], 'coral', 2);
  }
  for (let k = 0; k < 6; k++) {
    box(H, R, 1.2 + k * .83, 9.35, .67, .9, .77, .06, 'paper', 1);
    glass(H, R, ...H.p(1.53 + k * .83, 9.8, .84), k % 2 ? 'coral' : 'blue', .68, 2);
  }
  table(H, R, 8, 8.25, 3.3, 2, .85, 'paper');
  for (let k = 0; k < 3; k++) {
    box(H, R, 8.15 + k * .96, 8.47, .8, .85, .98, .17, 'sun', .5);
    shape(H, R, H.tile(8.22 + k * .96, 8.54, .65, .7, 1.16), 'paper', 1);
    if (k < 2) glass(H, R, ...H.p(8.54 + k * .96, 8.9, 1.18), k ? 'coral' : 'blue', .47, 2);
  }
  shape(H, R, H.tile(8.17, 9.54, 1.2, .51, .99), 'paper', 1);
  glass(H, R, ...H.p(10.65, 9.72, .99), 'coral', .65, 1);
  const [qx, qy] = H.p(10.65, 9.72, .99);
  for (let k = 0; k < 4; k++) H.line(R, [[qx - 4 + k * 3, qy - 11], [qx - 7 + k * 4, qy - 33 - k % 2 * 4]], k % 2 ? 'blue' : 'sun', 1.4);
  H.line(R, [[qx + 3, qy - 17], [qx - 1, qy - 8], [qx + 2, qy - 3]], 'blue', .65);
  finishingRoom(H, R);
}, (H, R, t) => {
  const u = cycle(t, 14), inspection = Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (u - .42) / .42))));
  H.at(3.85, 5.65, 0, HH => {
    const [x, y] = HH.p(3.85, 5.65);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: inspection > .3 ? 'hold' : 'water', phase: t / 6, scale: 1.25, face: 'nw', opts: { shirt: ['paper', 1], apron: ['blue', .65], glasses: true, prop: (A, B, p) => {
      const [hx, hy] = p.nearHand;
      glass(A, B, hx - 2, hy - inspection * 14, 'blue', .55, 2, t * 2);
      A.line(B, [p.farHand, [hx - 7, hy - inspection * 14 - 5]], 'coral', 3, { tone: .3 });
    } } });
  });
  H.at(3.15, 4.6, 1.2, HH => {
    const [x, y] = HH.p(3.1, 4.53, 1.68);
    for (let k = 0; k < 3; k++) {
      const a = t * 2 + k * Math.PI * 2 / 3;
      HH.line(R, [[x + 4, y - 11], [x + 4 + Math.cos(a) * 4, y - 11 + Math.sin(a) * 20]], 'blue', .7, { tone: .35 });
    }
    for (let k = 0; k < 5; k++) {
      const v = cycle(t + k * .28, 1.7);
      HH.dot(x + 8 + k % 2 * 2, y - 30 + v * 49, .8, 'teal', .7);
    }
  });
  H.at(8.1, 6.3, 0, HH => {
    const [x, y] = HH.p(8.1, 6.3);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'hold', phase: t / 5, scale: 1.18, face: 'se', opts: { shirt: ['teal', .6], apron: ['paper', 1], hairStyle: 'bun', prop: (A, B, p) => {
      const [hx, hy] = p.nearHand;
      shape(A, B, [[hx - 11, hy + 3], [hx + 12, hy + 3], [hx + 6, hy - 15], [hx - 8, hy - 12]], 'paper', 1, .6);
      glass(A, B, hx, hy - 3, 'coral', .46, 2, Math.sin(t) * 3);
    } } });
  });
  H.at(4.6, 4.9, 1.22, HH => {
    for (let k = 0; k < 5; k++) {
      const [x, y] = HH.p(4.15 + k * .16, 4.75, 1.22);
      HH.tint([[x, y - 3], [x + 5, y], [x, y + 4], [x - 5, y]], k % 2 ? 'coral' : 'blue', .08 + inspection * .15);
    }
  });
  H.at(4.75, 10.76, 0, HH => {
    const [x, y] = HH.p(4.75, 10.76);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'hold', phase: t / 8, scale: 1.3, face: 'nw', opts: { shirt: ['coral', .6], prop: (A, B, p) => {
      const [hx, hy] = p.nearHand, lift = Math.max(0, Math.sin(t * .42)) * 7;
      glass(A, B, hx, hy - lift, 'blue', .7, 2, t * 1.5);
    } } });
  });
  H.at(7.66, 9.02, 0, HH => {
    const [x, y] = HH.p(7.66, 9.02);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'hold', phase: t / 6, scale: 1.27, face: 'se', opts: { shirt: ['sun', .65], apron: ['teal', .55], prop: (A, B, p) => {
      const [hx, hy] = p.nearHand, fold = Math.sin(t * .7) * 4;
      shape(A, B, [[hx - 15, hy + 5], [hx + 15, hy + 5], [hx + 10 - fold, hy - 15], [hx - 12 + fold, hy - 13]], 'paper', 1, .65);
      glass(A, B, hx, hy, 'coral', .47, 2);
    } } });
  });
  H.at(6.54, 4.4, 0, HH => actor(HH, R, 6.54, 4.4, t * .21, 'think', { shirt: ['blue', .55], apron: ['paper', 1], glasses: true, face: 'nw' }, 0, 1.25));
  H.at(1.35, 7.44, 1.16, HH => {
    const [x, y] = HH.p(.84, 7.41, 1.13), drip = cycle(t, 2.6);
    HH.dot(x + 14, y - 18 + drip * 26, 1.2, 'teal', 1 - drip * .4);
  });
});

export default room;
