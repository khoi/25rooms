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

function picnicBasket(H, R, i, j) {
  box(H, R, i, j, 1.17, .75, .08, .53, 'sun', .47);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(i + .08 + k * .16, j + .77, .14), H.p(i + .08 + k * .16, j + .77, .57)], 'coral', .7);
  for (const z of [.2, .35, .5]) H.line(R, [H.p(i + .06, j + .78, z), H.p(i + 1.1, j + .78, z)], 'coral', .6);
  stroke(H, R, [H.p(i + .15, j + .38, .61), H.p(i + .57, j + .38, 1.01), H.p(i + 1.03, j + .38, .61)], 'blue', 1.6);
}

function parkLife(H, R) {
  shape(H, R, H.tile(.58, 5.49, 2.11, 3.71, .055), 'coral', .5);
  H.outline(R, H.tile(.73, 5.64, 1.81, 3.41, .06), 'paper', 1.2);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(.62, 5.63 + k * .72, .07), H.p(2.65, 5.63 + k * .72, .07)], 'sun', 1.4);
  cushion(H, R, .8, 5.91, 'paper');
  cushion(H, R, 1.1, 8.11, 'sun');
  bento(H, R, .93, 7.05);
  cup(H, R, .88, 7.1);
  cup(H, R, 2.43, 7.96);
  bottle(H, R, ...H.p(2.34, 6.52, .14), 'teal', .54);
  picnicBasket(H, R, .6, 9.77);
  for (let k = 0; k < 3; k++) box(H, R, 2.03, 9.95, .59, .49, .05 + k * .12, .1, ['teal', 'paper', 'coral'][k], k === 1 ? 1 : .43);
  const [x, y] = H.p(1.3, 10.87, .03);
  shape(H, R, loop([[x - 15, y], [x - 16, y - 20], [x - 7, y - 30], [x + 8, y - 27], [x + 17, y - 16], [x + 14, y]], 1), 'blue', .57);
  stroke(H, R, [[x - 6, y - 27], [x - 7, y - 38], [x + 7, y - 38], [x + 8, y - 26]], 'coral', 1.5);
  box(H, R, 4.15, 2.94, 2.61, 1.06, .04, .58, 'paper', 1);
  shape(H, R, H.tile(4.24, 3.03, 2.43, .88, .64), 'sun', .44);
  for (let k = 0; k < 4; k++) box(H, R, 4.36 + k * .54, 3.1, .44, .53, .67, .18, ['coral', 'teal', 'sun', 'blue'][k], .56);
  for (const i of [4.15, 6.75]) for (const j of [3.03, 3.89]) oval(H, R, ...H.p(i, j, .08), 6, 6, 'blue', .78);
  stroke(H, R, [H.p(6.82, 3.85, .36), H.p(7.24, 3.95, 1.15), H.p(7.24, 3.05, 1.15), H.p(6.82, 3.02, .36)], 'blue', 1.8);
  bottle(H, R, ...H.p(4.47, 3.35, .9), 'coral', .41);
  for (let k = 0; k < 3; k++) cup(H, R, 5.17 + k * .31, 3.76, .92, true);
  const [ux, uy] = H.p(7.35, 3.07, .05);
  stroke(H, R, [[ux, uy], [ux, uy - 93]], 'blue', 1.8);
  shape(H, R, loop([[ux - 47, uy - 74], [ux - 24, uy - 102], [ux, uy - 111], [ux + 30, uy - 96], [ux + 47, uy - 74]], 1), 'paper', 1);
  for (const dx of [-29, 0, 29]) stroke(H, R, [[ux, uy - 108], [ux + dx, uy - 77]], 'coral', 1.3);
  for (const i of [8.57, 9.85]) {
    box(H, R, i, 2.57, 1.08, .56, .05, .56, 'teal', .44);
    for (let k = 0; k < 4; k++) {
      const [px, py] = H.p(i + .16 + k * .23, 2.83, .61);
      stroke(H, R, [[px, py], [px + Math.sin(k) * 5, py - 19]], 'teal', 1);
      for (let n = 0; n < 4; n++) H.dot(px + Math.cos(n * TAU / 4) * 4, py - 19 + Math.sin(n * TAU / 4) * 4, 3, k % 2 ? 'coral' : 'sun', .72, { knock: true });
    }
  }
  const [mx, my] = H.p(11.1, 1.8, .08);
  shape(H, R, [[mx - 13, my], [mx + 13, my], [mx + 14, my - 36], [mx - 14, my - 36]], 'teal', .6);
  oval(H, R, mx, my - 36, 14, 6, 'paper', 1);
  oval(H, R, mx, my - 36, 8, 3.5, 'blue', .7);
  for (let k = -2; k <= 2; k++) H.line(R, [[mx + k * 5, my - 30], [mx + k * 5, my - 3]], 'paper', .75);
  picnicBasket(H, R, 9.96, 9.58);
  box(H, R, 10.17, 9.75, .37, .33, .64, .45, 'coral', .58);
  bottle(H, R, ...H.p(10.83, 10.03, .64), 'teal', .55);
  for (let k = 0; k < 3; k++) box(H, R, 9.56, 11.03, 1.3, .22, .07 + k * .09, .07, ['teal', 'sun', 'coral'][k], .52);
  stroke(H, R, [H.p(9.74, 11.15, .36), H.p(9.74, 11.15, 1.11), H.p(10.69, 11.15, 1.11), H.p(10.69, 11.15, .36)], 'blue', 1.4);
  for (const i of [9.73, 10.71]) oval(H, R, ...H.p(i, 11.15, .05), 5, 5, 'blue', .7);
  for (const [i, j] of [[3.16, 3.35], [10.9, 5.34]]) {
    const [px, py] = H.p(i, j, .07);
    shape(H, R, loop([[px - 26, py + 3], [px - 18, py - 11], [px - 4, py - 17], [px + 16, py - 14], [px + 29, py + 3]], 1), 'teal', .46);
    for (let k = 0; k < 6; k++) H.dot(px - 18 + k * 7, py - 4 - Math.sin(k) * 5, 2.1, 'sun', .7);
  }
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
    shape(H, R, cluster, 'coral', .29, .75);
    H.clip(cluster, () => {
      for (let k = 0; k < 5; k++) stroke(H, R, [[tx + dx, ty + dy + 14], [tx + dx - 29 + k * 14, ty + dy - 3], [tx + dx - 35 + k * 17, ty + dy - 18]], 'blue', .8, .55);
      for (let k = 0; k < 34; k++) blossom(H, R, tx + dx + (R() - .5) * 78, ty + dy + (R() - .5) * 45, 3.2 + R() * 2.7);
    });
    for (let k = 0; k < 8; k++) {
      const a = k * TAU / 8;
      blossom(H, R, tx + dx + Math.cos(a) * 42, ty + dy + Math.sin(a) * 25, 4 + R() * 3);
    }
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
  parkLife(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  actor(H, R, 1.24, 6.37, t, 'sitfloor', { shirt: ['teal', .57], face: 'se', hairStyle: 'bun' }, .15, 1.12, 'elder');
  actor(H, R, 1.51, 8.56, t, 'sitfloor', { shirt: ['paper', 1], face: 'nw' }, .15, 1.12);
  actor(H, R, 6.03, 4.26, t, 'hold', { shirt: ['coral', .53], apron: ['paper', 1], face: 'sw', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    shape(HH, RR, [[x - 9, y - 5], [x + 9, y - 5], [x + 9, y + 3], [x - 9, y + 3]], 'paper', 1, .7);
    H.line(R, [[x - 7, y - 3], [x + 7, y - 3]], 'coral', 1.3);
  } }, 0, 1.15);
  actor(H, R, 9.68, 5.66, t, 'hold', { shirt: ['sun', .55], face: 'sw', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    shape(HH, RR, [[x - 8, y - 7], [x + 8, y - 7], [x + 8, y + 2], [x - 8, y + 2]], 'blue', .8, .6);
    oval(HH, RR, x, y - 3, 4, 4, 'paper', 1);
  } }, 0, 1.14);
  actor(H, R, 10.95, 6.19 + Math.sin(t * .5) * .4, t, 'walk', { shirt: ['coral', .65], face: 'sw' }, 0, .96, 'child');
  const [px, py] = H.p(10.42, 6.33 + Math.sin(t * .5) * .4, .14);
  const a = t * 4;
  for (let k = 0; k < 4; k++) shape(H, R, [[px, py - 26], [px + Math.cos(a + k * TAU / 4) * 11, py - 26 + Math.sin(a + k * TAU / 4) * 11], [px + Math.cos(a + k * TAU / 4 + .8) * 9, py - 26 + Math.sin(a + k * TAU / 4 + .8) * 9]], k % 2 ? 'sun' : 'coral', .67, .5);
  H.line(R, [[px, py - 26], [px, py - 6]], 'sun', 1);
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
