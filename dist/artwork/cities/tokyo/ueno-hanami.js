import { world, shape, oval, stroke, box, bench, actor, bottle, cycle, TAU } from '../../worlds/common.js';
import { FIGURES, blob, loop, ell } from '../../drawings.js';

const seated = FIGURES.sample('sitfloor', 0);
FIGURES.clips.tokyoHanamiPass = {
  dur: 16,
  keys: [[0, {}], [.15, {}], [.27, { ar: 83, er: 0, lean: -7 }], [.4, { ar: 83, er: 0, lean: -7 }], [.52, {}], [1, {}]].map(([u, pose]) => [u, { ...seated, ...pose }]),
};
FIGURES.clips.tokyoHanamiCatch = {
  dur: 16,
  keys: [[0, {}], [.5, {}], [.6, { ar: 145, er: 8, head: -15 }], [.69, { ar: 140, er: 14, head: -12 }], [.78, { ar: 35, er: 55 }], [1, {}]].map(([u, pose]) => [u, { ...seated, ...pose }]),
};

function cushion(H, R, i, j, ink) {
  box(H, R, i, j, .9, .85, .04, .1, ink, .5);
  H.outline(R, H.tile(i + .08, j + .08, .74, .69, .15), 'paper', .6, { tone: .7 });
}

function cup(H, R, i, j, z = .18, sealed = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 4, y - 9], [x + 4, y - 9], [x + 3, y], [x - 3, y]], 'paper', 1, .65);
  oval(H, R, x, y - 9, 4, 1.8, sealed ? 'coral' : 'sun', sealed ? .45 : .4);
}

function bento(H, R, i, j) {
  box(H, R, i, j, 1.35, .9, .14, .16, 'blue', .65);
  shape(H, R, H.tile(i + .08, j + .08, 1.19, .74, .31), 'paper', 1);
  H.line(R, [H.p(i + .7, j + .1, .32), H.p(i + .7, j + .8, .32)], 'coral', 1.5);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(i + .23 + k * .1, j + .2 + k * .19, .36);
    shape(H, R, [[x - 5, y + 2], [x - 1, y - 5], [x + 5, y + 2]], 'paper', 1, .5);
    shape(H, R, [[x - 2, y + 2], [x - 2, y - 1], [x + 2, y - 1], [x + 2, y + 2]], 'blue', .8, .4);
  }
  for (let k = 0; k < 3; k++) box(H, R, i + .8, j + .13 + k * .21, .35, .15, .32, .06, 'sun', .8);
}

function blossom(H, R, x, y, r = 3) {
  for (let k = 0; k < 5; k++) {
    const a = k * TAU / 5;
    H.fill(ell(x + Math.cos(a) * r * .65, y + Math.sin(a) * r * .65, r * .65, r * .6, 8), 'paper', 1);
    H.tint(ell(x + Math.cos(a) * r * .65, y + Math.sin(a) * r * .65, r * .65, r * .6, 8), 'coral', .2);
  }
  H.dot(x, y, .9, 'coral', .7);
}

export default world('tokyo-ueno-hanami', 'Ueno · A place saved under the blossoms', { wall: false, floor: 'teal', tone: .2, head: 20 }, (H, R) => {
  shape(H, R, H.tile(.15, .15, 11.7, 2.2, .02), 'paper', 1);
  for (let i = .2; i < 12; i += 1.4) H.line(R, [H.p(i, .15, .03), H.p(i, 2.35, .03)], 'blue', .7, { tone: .4 });
  H.line(R, [H.p(.15, 2.35, .04), H.p(11.85, 2.35, .04)], 'blue', 1, { tone: .6 });
  box(H, R, 8.4, .2, 3.1, .32, 0, 1.38, 'paper', 1);
  for (let row = 0; row < 4; row++) for (let k = 0; k < 4; k++) H.outline(R, H.faceI(8.45 + k * .72, .53, .69, .05 + row * .3, .31 + row * .3), 'blue', .5, { tone: .35 });
  bench(H, R, 8.6, 1.05, 2.65, 'sun');
  const [tx, ty] = H.p(1.65, 2.9);
  H.tint(ell(tx + 36, ty + 20, 84, 28), 'blue', .14);
  shape(H, R, loop([[tx - 19, ty + 5], [tx - 9, ty - 67], [tx - 17, ty - 137], [tx - 3, ty - 146], [tx + 7, ty - 76], [tx + 18, ty + 2]], 1), 'blue', .65);
  const branches = [[-55, -183], [32, -182], [118, -152], [-113, -135], [83, -113]];
  for (const [dx, dy] of branches) {
    stroke(H, R, [[tx, ty - 65], [tx + dx * .35, ty - 130], [tx + dx, ty + dy]], 'blue', 5);
    const cluster = blob(R, tx + dx, ty + dy, 45, 28, .1);
    shape(H, R, cluster, 'coral', .2, .75);
    H.clip(cluster, () => {
      for (let k = 0; k < 34; k++) blossom(H, R, tx + dx + (R() - .5) * 78, ty + dy + (R() - .5) * 45, 2.2 + R() * 2);
    });
  }
  shape(H, R, H.tile(3, 4.6, 6.2, 5.65, .04), 'teal', .66);
  H.outline(R, H.tile(3.13, 4.73, 5.94, 5.39, .05), 'paper', 1.2);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(3.2 + k * 1.5, 4.72, .055), H.p(3.2 + k * 1.5, 10.12, .055)], 'blue', .6, { tone: .4 });
  for (const [i, j, ink] of [[3.4, 5.35, 'sun'], [6.1, 4.95, 'coral'], [7.65, 7.8, 'sun'], [4.3, 8.75, 'coral'], [7.8, 9.05, 'paper']]) cushion(H, R, i, j, ink);
  bento(H, R, 5.05, 6.2);
  bento(H, R, 6.45, 7.3);
  const [fx, fy] = H.p(5.15, 8.2, .2);
  oval(H, R, fx, fy, 18, 7, 'paper', 1);
  for (let k = 0; k < 6; k++) oval(H, R, fx - 11 + k * 4, fy + Math.sin(k) * 3, 3.5, 2.1, k % 2 ? 'coral' : 'sun', .72);
  for (const [i, j] of [[4.6, 6.2], [6.9, 5.75], [7.3, 8.65], [4.45, 8.3]]) cup(H, R, i, j);
  cup(H, R, 8.78, 9.37, .18, true);
  bottle(H, R, ...H.p(5.2, 5.6, .16), 'teal', .62);
  box(H, R, 8.08, 9.73, .87, .4, .11, .19, 'coral', .32);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(8.12, 9.78 + k * .08, .31), H.p(8.9, 9.78 + k * .08, .31)], 'paper', .7);
  box(H, R, 3.12, 9.72, .8, .54, .07, .23, 'sun', .36);
  stroke(H, R, [H.p(3.22, 9.9, .32), H.p(3.43, 9.95, .75), H.p(3.77, 9.95, .32)], 'blue', 1.5);
  const [cx, cy] = H.p(3.86, 7.8, .15);
  shape(H, R, [[cx - 9, cy - 10], [cx + 9, cy - 10], [cx + 9, cy + 2], [cx - 9, cy + 2]], 'blue', .8);
  oval(H, R, cx + 2, cy - 4, 5, 5, 'paper', 1);
  oval(H, R, cx + 2, cy - 4, 3, 3, 'teal', .7);
  stroke(H, R, [[cx - 8, cy - 6], [cx - 16, cy + 7], [cx + 4, cy + 10], [cx + 8, cy - 5]], 'blue', .8);
  shape(H, R, H.tile(6.3, 9.2, .75, .63, .11), 'paper', 1);
  H.line(R, [H.p(6.67, 9.2, .12), H.p(6.67, 9.83, .12)], 'blue', .6);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(6.38, 9.3 + k * .1, .12), H.p(6.58, 9.34 + k * .1, .12)], 'teal', .6);
  for (const [i, j, ink] of [[3.25, 10.65, 'blue'], [3.78, 10.65, 'blue'], [8.96, 5.1, 'coral'], [9.25, 5.1, 'coral'], [3.05, 4.12, 'sun'], [3.4, 4.12, 'sun']]) oval(H, R, ...H.p(i, j, .03), 8, 3.3, ink, .67);
  box(H, R, 10, 7.2, 1.2, .8, .05, .6, 'sun', .4);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(10.05 + k * .2, 8.02, .15), H.p(10.05 + k * .2, 8.02, .61)], 'coral', .7);
  stroke(H, R, [H.p(10.16, 7.65, .65), H.p(10.6, 7.65, 1.05), H.p(11.05, 7.65, .65)], 'blue', 1.5);
  const [sx, sy] = H.p(10.4, 3.65, .05);
  for (const dx of [-17, 17]) {
    oval(H, R, sx + dx, sy, 5, 5, 'blue', .8);
    stroke(H, R, [[sx + dx, sy], [sx - dx, sy - 29]], 'blue', 2);
  }
  shape(H, R, [[sx - 18, sy - 16], [sx + 17, sy - 16], [sx + 12, sy - 37], [sx - 12, sy - 37]], 'coral', .55);
  shape(H, R, loop([[sx - 20, sy - 36], [sx - 17, sy - 57], [sx, sy - 65], [sx + 19, sy - 50], [sx + 20, sy - 36]], 1), 'paper', 1);
  stroke(H, R, [[sx + 15, sy - 26], [sx + 25, sy - 52], [sx + 33, sy - 54]], 'blue', 2);
  const [gx, gy] = H.p(10.65, 8.75, .02);
  shape(H, R, loop([[gx - 13, gy], [gx - 17, gy - 18], [gx - 6, gy - 27], [gx, gy - 24], [gx + 12, gy - 18], [gx + 15, gy]], 1), 'paper', 1);
  stroke(H, R, [[gx - 6, gy - 26], [gx + 3, gy - 29], [gx + 5, gy - 23]], 'blue', 1);
}, (H, R, t) => {
  const u = cycle(t, 16);
  if (u < .22) actor(H, R, 3.8 + u * 21, 1.25, t, 'walk', { shirt: ['teal', .45], face: 'se' }, .02, .94);
  actor(H, R, 3.95, 5.75, t, 'tokyoHanamiPass', {
    shirt: ['sun', .6], face: 'se',
    prop: (HH, RR, pts) => {
      const [x, y] = pts.nearHand;
      shape(HH, RR, [[x - 10, y - 2], [x + 9, y - 5], [x + 10, y + 2], [x - 9, y + 5]], 'coral', .62, .65);
      H.line(R, [[x - 7, y - 2], [x + 6, y - 4]], 'paper', 1.2);
    },
  }, .15, 1.17);
  actor(H, R, 6.55, 5.4, t, 'sitfloor', { shirt: ['paper', 1], face: 'sw', hairStyle: 'pony' }, .15, 1.16);
  actor(H, R, 8.18, 8.19, t, 'tokyoHanamiCatch', { shirt: ['coral', .6], face: 'nw' }, .15, 1.12);
  actor(H, R, 4.85, 9.17, t, 'sitfloor', { shirt: ['blue', .65], face: 'ne', glasses: true }, .15, 1.17);
  actor(H, R, 7.7, 10.7, t, 'lookup', { shirt: ['sun', .72], face: 'nw' }, 0, 1.09, 'child');
  if (u > .49 && u < .72) {
    const f = (u - .49) / .23;
    const [x, y] = H.p(8.4 - f * .3, 7.9, .6 + Math.sin(f * Math.PI) * .95);
    shape(H, R, [[x - 8, y - 5], [x + 5, y - 7], [x + 9, y + 5], [x - 4, y + 7]], 'paper', 1, .65);
  }
  for (let k = 0; k < 4; k++) {
    const v = u - .32 - k * .07;
    if (v < 0 || v > .45) continue;
    const f = v / .45;
    const [x, y] = H.p(5 + k * .85 + Math.sin(f * TAU + k) * .5, 4.2 + f * 4.5, 3.1 * (1 - f));
    oval(H, R, x, y, 2.4, 1.3, 'coral', .32);
  }
  if (u > .81) {
    const f = Math.min(1, (u - .81) / .15);
    const [x, y] = H.p(8.22 + Math.sin(f * TAU) * .12, 9.48, .18 + 1.2 * (1 - f));
    oval(H, R, x, y, 2.6, 1.5, 'coral', .42);
  }
});
