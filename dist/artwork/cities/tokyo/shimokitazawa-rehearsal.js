import { world, shape, oval, stroke, box, table, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const drummer = { ...rest, drop: .47, ll: 78, lr: 85, kl: -76, kr: -85, al: 76, ar: 77, el: 48, er: 46 };
const guitarist = { ...rest, al: 93, ar: 55, el: 56, er: 39, head: 10 };
const bassist = { ...rest, al: 87, ar: 48, el: 58, er: 53, head: 7 };
FIGURES.clips.tokyoRehearsalDrums = { dur: 16, keys: [[0, { ...drummer, ar: 125, er: 25 }], [.07, { ...drummer, ar: 90, er: 30 }], [.14, { ...drummer, ar: 125, er: 25 }], [.18, drummer], ...Array.from({ length: 12 }, (_, q) => [.2 + q * .03, { ...drummer, ar: q % 2 ? 63 : 105, al: q % 2 ? 102 : 67, er: q % 2 ? 43 : 25, el: q % 2 ? 23 : 47 }]), [.58, drummer], [.72, { ...drummer, head: -17, ar: 38, al: 32 }], [.89, { ...drummer, head: -17, ar: 38, al: 32 }], [1, { ...drummer, ar: 125, er: 25 }]] };
FIGURES.clips.tokyoRehearsalGuitar = { dur: 16, keys: [[0, { ...guitarist, al: 137, el: 15 }], [.13, { ...guitarist, al: 137, el: 20 }], [.19, guitarist], ...Array.from({ length: 10 }, (_, q) => [.22 + q * .036, { ...guitarist, ar: q % 2 ? 59 : 45, er: q % 2 ? 44 : 55, head: 7, lean: q % 2 ? -2 : 0 }]), [.59, guitarist], [.73, { ...guitarist, head: -12, ar: 38, er: 64 }], [.9, { ...guitarist, head: -12, ar: 38, er: 64 }], [1, { ...guitarist, al: 137, el: 15 }]] };
FIGURES.clips.tokyoRehearsalBass = { dur: 16, keys: [[0, bassist], [.19, bassist], ...Array.from({ length: 9 }, (_, q) => [.23 + q * .04, { ...bassist, ar: q % 2 ? 42 : 54, er: q % 2 ? 60 : 43 }]), [.6, bassist], [.72, { ...bassist, head: -15, ar: 32, er: 69 }], [.92, { ...bassist, head: -15, ar: 32, er: 69 }], [1, bassist]] };

function amplifier(H, R, i, j, w, h) {
  box(H, R, i, j, w, .96, 0, h, 'blue', .88);
  const front = H.faceI(i + .09, j + .98, w - .18, .16, h - .22);
  shape(H, R, front, 'paper', .45);
  H.hatch(R, front, 'blue', 4, .7, .55, { tone: .6, amp: .05 });
  const count = w > 1.5 ? 2 : 1;
  for (let q = 0; q < count; q++) {
    const [x, y] = H.p(i + w * (q + .5) / count, j + 1, h * .51);
    oval(H, R, x, y, 14, 17, 'blue', .58);
    oval(H, R, x, y, 6, 8, 'teal', .52);
  }
  for (let q = 0; q < 5; q++) H.dot(...H.p(i + .2 + q * (w - .4) / 4, j + 1, h - .1), 1.6, q ? 'paper' : 'sun');
  H.line(R, [H.p(i + w * .32, j + .4, h + .02), H.p(i + w * .32, j + .4, h + .13), H.p(i + w * .68, j + .4, h + .13), H.p(i + w * .68, j + .4, h + .02)], 'blue', 2);
}

function drum(H, R, i, j, z, rx, ry, height, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - rx, y], [x + rx, y], [x + rx, y + height], [x - rx, y + height]], ink, .68);
  oval(H, R, x, y + height, rx, ry, ink, .6);
  oval(H, R, x, y, rx, ry, 'paper', 1);
  oval(H, R, x, y, rx - 3, ry - 2, 'paper', .85);
  for (const f of [-.85, -.42, 0, .42, .85]) {
    H.line(R, [[x + f * rx, y + 4], [x + f * rx, y + height - 2]], 'paper', 1.6);
    H.line(R, [[x + f * rx - 2, y + 5], [x + f * rx + 2, y + 5]], 'blue', 2);
  }
  H.line(R, [[x - rx + 2, y + height - 3], [x + rx - 2, y + height - 3]], 'sun', 1.2);
}

function cymbal(H, R, i, j, z, s, angle = 0) {
  const [x, y] = H.p(i, j, z), ground = H.p(i, j, .08);
  H.line(R, [[x, y], ground], 'blue', 1.4);
  for (const a of [-1, 0, 1]) H.line(R, [ground, [ground[0] + a * 13, ground[1] + 7 - Math.abs(a) * 3]], 'blue', 1.1);
  const points = Array.from({ length: 36 }, (_, q) => { const a = q * TAU / 36; return [x + Math.cos(a) * 27 * s, y + Math.sin(a) * (7 + angle) * s + Math.cos(a) * angle]; });
  shape(H, R, points, 'sun', .8, .8);
  oval(H, R, x, y - 1, 5 * s, 2 * s, 'paper');
  H.line(R, [[x, y + 1], [x, y - 7]], 'blue', 1);
}

function guitar(H, R, x, y, ink, bass = false, s = 1) {
  const P = points => points.map(([a, b]) => [x + a * s, y + b * s]);
  shape(H, R, P([[-10, 9], [-16, 1], [-15, -10], [-8, -15], [-3, -10], [2, -20], [8, -17], [7, -9], [16, -10], [19, -2], [17, 8], [7, 16], [-4, 17]]), ink, .78);
  shape(H, R, P([[1, -12], [-15, bass ? -62 : -52], [-10, bass ? -64 : -54], [7, -14]]), 'sun', .64, .6);
  shape(H, R, P([[-16, bass ? -61 : -51], [-20, bass ? -73 : -63], [-10, bass ? -75 : -65], [-8, bass ? -64 : -54]]), ink, .7, .6);
  for (let q = 0; q < (bass ? 4 : 6); q++) H.line(R, P([[-13 + q * .7, bass ? -67 : -57], [3 + q * .7, 7]]), 'paper', .4);
  for (let q = 0; q < 3; q++) {
    H.line(R, P([[-19 - q * .7, -55 - q * 3], [-22 - q * .7, -54 - q * 3]]), 'blue', 1.1);
    H.line(R, P([[-10 - q * .7, -56 - q * 3], [-7 - q * .7, -57 - q * 3]]), 'blue', 1.1);
  }
  H.line(R, P([[-1, 3], [10, 0]]), 'blue', 2.5);
  H.dot(x + 11 * s, y + 7 * s, 1.9 * s, 'sun');
}

function rehearsalEquipment(H, R) {
  shape(H, R, H.tile(2.52, 2.38, 6.83, 6.12, .019), 'coral', .23);
  for (let q = 0; q < 12; q++) H.line(R, [H.p(2.58 + q * .56, 2.47, .025), H.p(2.58 + q * .56, 8.42, .025)], 'sun', .7, { tone: .42 });
  for (let q = 0; q < 3; q++) {
    const i = 8.16 + q * 1.07;
    box(H, R, i, 8.77, .92, .94, 0, .54 + q % 2 * .21, colorsForCase(q), .63);
    for (const z of [.08, .45 + q % 2 * .21]) H.line(R, [H.p(i, 9.73, z), H.p(i + .92, 9.73, z)], 'paper', 1.6);
    H.line(R, [H.p(i + .27, 9.75, .3), H.p(i + .67, 9.75, .3)], 'blue', 2.2);
    for (const side of [.06, .81]) H.line(R, [H.p(i + side, 9.76, .19), H.p(i + side, 9.76, .39)], 'sun', 2);
  }
  box(H, R, 10.08, 9.99, 1.33, 1.21, .14, 1.12, 'blue', .77);
  box(H, R, 10.08, 9.99, 1.33, 1.21, 1.28, .43, 'coral', .57);
  for (const i of [10.18, 11.31]) for (const j of [10.11, 11.09]) oval(H, R, ...H.p(i, j, .08), 4, 5, 'blue');
  for (const z of [.24, .69, 1.19, 1.61]) H.line(R, [H.p(10.08, 11.23, z), H.p(11.41, 11.23, z)], 'paper', 1.6);
  for (const i of [10.2, 11.27]) H.line(R, [H.p(i, 11.24, .23), H.p(i, 11.24, 1.63)], 'paper', 1.5);
  H.line(R, [H.p(10.62, 11.25, .89), H.p(10.96, 11.25, .89)], 'sun', 2.5);
  for (const [i, j] of [[1.02, 2.31], [3.45, 2.31]]) {
    H.line(R, [H.p(i, j, .02), H.p(i + .45, j + .76, 1.0)], 'blue', 2);
    H.line(R, [H.p(i + .45, j + .76, .02), H.p(i, j, 1.0)], 'blue', 2);
  }
  box(H, R, .86, 2.18, 3.17, 1.02, 1.01, .21, 'teal', .63);
  shape(H, R, H.tile(.99, 2.59, 2.91, .47, 1.24), 'paper', 1);
  for (let q = 0; q < 22; q++) {
    H.line(R, [H.p(1.01 + q * .131, 2.6, 1.25), H.p(1.01 + q * .131, 3.04, 1.25)], 'blue', .65);
    if (![2, 6].includes(q % 7)) shape(H, R, H.tile(1.08 + q * .131, 2.6, .071, .26, 1.27), 'blue', .87, .3);
  }
  for (let q = 0; q < 6; q++) H.dot(...H.p(1.08 + q * .31, 2.37, 1.25), 2.1, q % 2 ? 'sun' : 'paper');
  shape(H, R, H.tile(3.17, 2.27, .6, .23, 1.24), 'blue', .86);
  box(H, R, 1.92, 3.69, .91, .65, 0, .57, 'coral', .58);
  const [sx, sy] = H.p(2.76, 1.97, 1.77);
  shape(H, R, [[sx - 25, sy - 12], [sx + 17, sy - 1], [sx + 17, sy + 29], [sx - 25, sy + 18]], 'paper', 1);
  for (let q = 0; q < 4; q++) H.line(R, [[sx - 20, sy - 3 + q * 6], [sx + 11, sy + 5 + q * 6]], 'blue', .6);
  H.line(R, [[sx - 3, sy + 22], [sx - 3, sy + 43]], 'blue', 1.4);
  stroke(H, R, [H.p(3.62, 3.03, 1.11), H.p(4.2, 3.44, .04), H.p(3.31, 4.77, .04), H.p(1.13, 5.98, .04)], 'blue', 1.25);
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(7.17 + q * .49, 9.43, .06);
    for (let n = 0; n < 3; n++) H.outline(R, Array.from({ length: 24 }, (_, k) => [x + Math.cos(k * TAU / 24) * (12 + n * 2), y + Math.sin(k * TAU / 24) * (5 + n)]), q % 2 ? 'coral' : 'blue', .9);
    H.line(R, [[x + 11, y], [x + 18, y + 12]], 'blue', 2);
  }
  box(H, R, 7.25, 10.39, 1.21, 1.09, 0, 1.08, 'blue', .78);
  for (let q = 0; q < 4; q++) {
    shape(H, R, H.faceI(7.35, 11.51, 1.01, .15 + q * .23, .33 + q * .23), 'paper', .75);
    for (let n = 0; n < 4; n++) H.dot(...H.p(7.47 + n * .23, 11.54, .24 + q * .23), 1.8, n ? 'blue' : 'sun');
  }
  box(H, R, .37, 10.53, 1.27, 1.05, 0, .58, 'teal', .67);
  for (let q = 0; q < 6; q++) {
    const j = 10.63 + q * .13;
    shape(H, R, H.faceI(.51, j, 1.0, .38, 1.19 + q % 2 * .07), q % 2 ? 'sun' : 'coral', .5);
    oval(H, R, ...H.p(1.01, j + .02, .79), 12, 13, 'blue', .6);
    H.dot(...H.p(1.01, j + .03, .79), 3, 'paper', 1, { knock: true });
  }
  box(H, R, 8.0, .5, .62, 1.33, 0, .77, 'blue', .64);
  for (let q = 0; q < 3; q++) H.line(R, [H.p(8.66, .63 + q * .4, .15), H.p(8.66, .63 + q * .4, .65)], 'paper', 1.6);
  const [px, py] = H.p(6.59, 8.78, 1.64);
  H.line(R, [[px, py], H.p(6.59, 8.78, .04)], 'blue', 1.8);
  H.line(R, [[px, py], [px - 16, py - 10]], 'blue', 1.8);
  H.line(R, [[px - 17, py - 10], [px - 28, py - 13]], 'blue', 4);
  for (const [a, b] of [[-.4, 0], [.3, .25], [0, -.3]]) H.line(R, [H.p(6.59, 8.78, .08), H.p(6.59 + a, 8.78 + b, .04)], 'blue', 1.2);
  stroke(H, R, [H.p(6.59, 8.78, .05), H.p(5.75, 9.12, .04), H.p(6.7, 9.7, .04), H.p(6.73, 10.4, .07)], 'coral', 1.1);
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(9.43 + q * .14, 7.69, .08);
    H.line(R, [[x - 4, y + 3], [x + 4, y - 17]], 'sun', 1.6);
  }
  shape(H, R, H.tile(3.04, 9.19, .68, .92, .035), 'paper', 1);
  for (let q = 0; q < 5; q++) H.line(R, [H.p(3.13, 9.32 + q * .13, .05), H.p(3.61, 9.32 + q * .13, .05)], 'blue', .6);
}

function colorsForCase(q) {
  return ['teal', 'coral', 'blue'][q % 3];
}

function furnishings(H, R) {
  for (let col = 0; col < 4; col++) {
    const i = .35 + col * 1.76;
    box(H, R, i, .06, 1.58, .28, .72, 2.15, 'sun', .47);
    shape(H, R, H.faceI(i + .11, .35, 1.36, .85, 2.74), 'blue', .88);
    for (let n = 0; n < 6; n++) box(H, R, i + .14 + n * .21, .34, .12, .13 + n % 3 * .045, .88, 1.81, col % 2 ? 'teal' : 'coral', .63);
    box(H, R, i + .07, .35, 1.44, .15, 1.75, .065, 'sun', .62);
  }
  for (let q = 0; q < 5; q++) {
    const j = .45 + q * 1.83;
    box(H, R, .07, j, .28, 1.55, .8, 1.85, 'sun', .47);
    shape(H, R, H.faceJ(.36, j + .1, 1.35, .91, 2.53), q % 2 ? 'teal' : 'coral', .5);
    for (let n = 0; n < 5; n++) H.line(R, [H.p(.38, j + .15 + n * .26, .96), H.p(.38, j + .15 + n * .26, 2.48)], 'blue', 2);
    for (const z of [.96, 2.47]) for (const off of [.12, 1.39]) H.dot(...H.p(.39, j + off, z), 1.6, 'paper');
  }
  box(H, R, .39, .38, .53, 10.24, 2.78, .39, 'paper', .8);
  for (let j = .6; j < 10.7; j += 1.4) {
    H.outline(R, H.faceJ(.94, j, .13, 2.75, 3.2), 'blue', 1.4);
    H.line(R, [H.p(.42, j, 3.18), H.p(.94, j, 3.18)], 'blue', 1.2);
  }
  box(H, R, .96, 9.33, .12, 1.13, 2.79, .32, 'blue', .7);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(1.09, 9.43 + k * .14, 2.84), H.p(1.09, 9.43 + k * .14, 3.06)], 'paper', 1.2);
  rehearsalEquipment(H, R);
  shape(H, R, H.faceI(2.48, .09, .59, 2.02, 2.42), 'paper', 1);
  H.line(R, [H.p(2.5, .11, 2.08), H.p(3.03, .11, 2.35)], 'teal', 1.8);
  box(H, R, .05, .08, 11.68, .31, 3.09, .25, 'blue', .82);
  box(H, R, .08, .16, .26, 11.47, 3.09, .25, 'blue', .82);
  box(H, R, .41, .58, 6.24, .34, 2.8, .28, 'paper', .7);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(.6 + q * .66, .94, 2.84), H.p(.6 + q * .66, .94, 3.07)], 'blue', .8);
  shape(H, R, H.faceI(8.25, .04, 3.0, .06, 3.09), 'paper', .5);
  for (let q = 0; q < 6; q++) box(H, R, 8.38, .1 + q * .43, 2.39, .44, 0, 2.33 - q * .36, 'paper', .85);
  H.line(R, [H.p(11.06, .32, 2.82), H.p(11.06, 2.86, .62)], 'sun', 2.2);
  const [cx, cy] = H.p(7.36, .07, 2.58);
  oval(H, R, cx, cy, 14, 14, 'paper');
  for (let q = 0; q < 12; q++) H.dot(cx + Math.sin(q * TAU / 12) * 10.5, cy - Math.cos(q * TAU / 12) * 10.5, .8, 'blue');
  H.line(R, [[cx - 6, cy - 6], [cx, cy], [cx + 7, cy - 2]], 'blue', 1.2);
  amplifier(H, R, .75, 5.26, 1.98, 1.66);
  amplifier(H, R, 9.4, 5.21, 1.74, 1.93);
  box(H, R, 9.55, 5.36, 1.37, .58, 1.93, .41, 'paper', .8);
  for (let q = 0; q < 6; q++) H.dot(...H.p(9.67 + q * .2, 5.96, 2.13), 1.7, q ? 'blue' : 'sun');
  box(H, R, 4.9, 2.57, .75, .74, 0, .72, 'teal', .6);
  const [bx, by] = H.p(5.26, 4.57, .65);
  oval(H, R, bx, by, 38, 34, 'coral', .69);
  oval(H, R, bx, by, 31, 29, 'paper', 1);
  oval(H, R, bx + 9, by + 11, 8, 8, 'blue', .86);
  H.line(R, [[bx - 25, by + 24], [bx - 37, by + 40]], 'blue', 2);
  H.line(R, [[bx + 26, by + 24], [bx + 38, by + 40]], 'blue', 2);
  for (let n = 0; n < 10; n++) {
    const a = n * TAU / 10;
    H.line(R, [[bx + Math.cos(a) * 33, by + Math.sin(a) * 30], [bx + Math.cos(a) * 39, by + Math.sin(a) * 35]], 'blue', 2);
    H.dot(bx + Math.cos(a) * 39, by + Math.sin(a) * 35, 1.7, 'sun');
  }
  shape(H, R, H.tile(5.07, 4.84, .38, .67, .08), 'blue', .8);
  H.line(R, [H.p(5.26, 5.31, .14), H.p(5.26, 4.72, .3), H.p(5.26, 4.62, .78)], 'paper', 2);
  for (const i of [4.62, 5.82]) H.line(R, [H.p(5.26, 4.22, .8), H.p(5.26, 3.85, 1.12), H.p(i, 3.69, 1.3)], 'blue', 2.4);
  drum(H, R, 4.62, 3.69, 1.36, 23, 10, 24);
  drum(H, R, 5.82, 3.72, 1.42, 24, 11, 24);
  drum(H, R, 6.71, 4.2, .9, 25, 12, 30);
  drum(H, R, 3.87, 4.21, 1.0, 20, 8, 13, 'paper');
  for (let q = 0; q < 2; q++) H.line(R, [H.p(6.43 + q * .48, 4.24, .75), H.p(6.31 + q * .7, 4.34, .05)], 'blue', 1.3);
  for (const [i, j, w] of [[2.9, 7.64, 1.48], [8.2, 7.98, 1.52]]) {
    box(H, R, i, j, w, .74, .03, .08, 'blue', .86);
    for (let q = 0; q < 4; q++) {
      box(H, R, i + .1 + q * .34, j + .13, .27, .43, .12, .1, ['coral', 'teal', 'sun', 'paper'][q], .62);
      H.dot(...H.p(i + .22 + q * .34, j + .29, .24), 1.3, 'blue');
    }
  }
  shape(H, R, H.tile(3.67, 7.94, .27, .12, .25), 'paper', 1, .4);
  stroke(H, R, [H.p(3.1, 7.84, .05), H.p(3.08, 6.73, .04), H.p(2.1, 6.95, .04), H.p(1.87, 6.3, .2)], 'blue', 1.2);
  stroke(H, R, [H.p(8.36, 8.14, .05), H.p(7.72, 8.58, .04), H.p(6.28, 7.81, .04), H.p(6.35, 6.66, .04), H.p(9.6, 6.17, .1)], 'blue', 1.4);
  for (let q = 0; q < 3; q++) H.line(R, [H.p(6.44 + q * .12, 7.7, .07), H.p(6.6 + q * .12, 7.88, .07)], 'paper', 3);
  for (const [i, j] of [[5.21, 6.64], [8.46, 6.12]]) {
    const [x, y] = H.p(i, j, 1.89), g = H.p(i, j, .06);
    H.line(R, [[x, y], g], 'blue', 1.4);
    for (const d of [-15, 0, 15]) H.line(R, [g, [g[0] + d, g[1] + 6]], 'blue', 1);
    H.line(R, [[x, y], [x - 25, y - 9]], 'blue', 1.6);
    H.line(R, [[x - 26, y - 9], [x - 35, y - 12]], 'blue', 4);
    stroke(H, R, [[x - 34, y - 10], [x - 19, y + 14], [g[0] + 5, g[1]]], 'blue', .8);
  }
  for (const i of [4.02, 6.85]) {
    box(H, R, i, 10.22, .14, 1.0, .04, .91, 'sun', .58);
    H.line(R, [H.p(i, 10.24, .16), H.p(i, 11.22, .79)], 'blue', 2.2);
  }
  box(H, R, 4.06, 10.24, 2.87, .91, .24, .08, 'teal', .6);
  for (let k = 0; k < 3; k++) {
    box(H, R, 4.25 + k * .79, 10.41, .67, .64, .33, .24, k ? 'blue' : 'coral', .63);
    H.line(R, [H.p(4.34 + k * .79, 11.07, .45), H.p(4.7 + k * .79, 11.07, .45)], 'paper', 1.5);
  }
  box(H, R, 3.98, 10.2, 3.1, 1.1, .84, .12, 'teal', .6);
  box(H, R, 4.15, 10.32, 2.49, .8, .98, .11, 'blue', .77);
  for (let q = 0; q < 8; q++) {
    for (let n = 0; n < 2; n++) H.dot(...H.p(4.31 + q * .28, 10.43 + n * .18, 1.11), 1.6, n ? 'sun' : 'paper');
    H.line(R, [H.p(4.31 + q * .28, 10.81, 1.11), H.p(4.31 + q * .28, 11.04, 1.11)], 'paper', .6);
    H.line(R, [H.p(4.24 + q * .28, 10.84 + q % 3 * .06, 1.12), H.p(4.38 + q * .28, 10.84 + q % 3 * .06, 1.12)], 'coral', 1.8);
  }
  const [hx, hy] = H.p(6.85, 10.79, 1.0);
  stroke(H, R, [[hx - 9, hy], [hx - 12, hy - 13], [hx, hy - 19], [hx + 12, hy - 13], [hx + 9, hy]], 'blue', 3);
  oval(H, R, hx - 9, hy, 4, 7, 'coral'); oval(H, R, hx + 9, hy, 4, 7, 'coral');
  for (let q = 0; q < 2; q++) {
    const [x, y] = H.p(1.73 + q * .83, 9.45, .05);
    shape(H, R, [[x - 15, y], [x + 15, y], [x + 18, y - 22], [x + 8, y - 38], [x + 7, y - 77], [x - 7, y - 77], [x - 8, y - 38], [x - 18, y - 22]], 'blue', .65);
    H.line(R, [[x - 11, y - 18], [x + 11, y - 18]], 'paper', 1);
  }
  guitar(H, R, ...H.p(.65, 8.81, .5), 'sun', false, .7);
  oval(H, R, ...H.p(7.76, 3.04, .1), 24, 28, 'blue', .64);
  H.line(R, [H.p(7.58, 3.05, 1.04), H.p(7.75, 3.05, 1.19), H.p(7.97, 3.05, 1.03)], 'coral', 1.2);
  box(H, R, 9.13, 10.34, .86, .82, 0, .6, 'sun', .48);
  const [jx, jy] = H.p(9.61, 10.37, 1.02);
  shape(H, R, [[jx - 11, jy], [jx + 12, jy], [jx + 19, jy + 19], [jx + 9, jy + 17], [jx + 12, jy + 42], [jx - 12, jy + 42], [jx - 9, jy + 17], [jx - 20, jy + 23]], 'coral', .57);
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(10.49 + q % 2 * .46, 8.68 + Math.floor(q / 2) * .54, .03);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 4, y - 16], [x + 2, y - 22], [x - 2, y - 22], [x - 4, y - 16]], q % 2 ? 'paper' : 'teal', .66, .6);
  }
  shape(H, R, H.tile(6.43, 10.53, .43, .51, 1.13), 'paper', 1);
  oval(H, R, ...H.p(6.58, 10.77, 1.16), 2, 3, 'coral'); oval(H, R, ...H.p(6.77, 10.79, 1.16), 2, 3, 'coral');
  for (let q = 0; q < 3; q++) {
    shape(H, R, H.faceJ(.1, 9.13 + q * .68, .56, 1.18, 1.97), 'paper', 1);
    const [x, y] = H.p(.12, 9.42 + q * .68, 1.6);
    shape(H, R, [[x - 5, y + 10], [x, y - 12], [x + 6, y + 7]], q % 2 ? 'teal' : 'coral', .7);
    H.line(R, [[x - 6, y + 14], [x + 6, y + 10]], 'sun', 2);
  }
}

export default world('tokyo-shimokitazawa-rehearsal', 'Shimokitazawa · One more take', { floor: 'blue', tone: .36, wall: 'blue', wallTone: .73, height: 3.38, head: 20 }, furnishings, (H, R, t) => {
  const u = cycle(t, 16), playing = u >= .19 && u < .59;
  actor(H, R, 5.28, 2.93, t, 'tokyoRehearsalDrums', { shirt: ['paper', 1], hairStyle: 'curly', face: 'se', prop(HH, RR, points) {
    for (const [x, y] of [points.nearHand, points.farHand]) HH.line(RR, [[x, y], [x + (playing ? Math.sin(t * 12) * 8 : 1), y - 23]], 'sun', 1.7);
  } }, .16, 1.18);
  const settle = playing ? Math.sin(t * 15) * 1.3 : u >= .59 ? Math.max(0, 1 - (u - .59) * 20) * Math.sin(t * 15) : 0;
  cymbal(H, R, 3.22, 3.7, 1.87, .94, settle);
  cymbal(H, R, 6.78, 3.26, 1.96, 1.04, -settle);
  cymbal(H, R, 3.57, 4.99, 1.33, .62, settle * .7);
  actor(H, R, 3.53, 6.55, t, 'tokyoRehearsalGuitar', { shirt: ['teal', .66], hairStyle: 'long', face: 'se', prop(HH, RR, points) {
    const [x, y] = points.chest;
    stroke(HH, RR, [[x - 8, y - 3], [x + 14, y + 24], [x - 8, y + 34]], 'blue', 3);
    guitar(HH, RR, x + 3, y + 24, 'coral', false, .92);
  } }, 0, 1.25);
  actor(H, R, 8.23, 6.81, t, 'tokyoRehearsalBass', { shirt: ['sun', .6], hairStyle: 'short', face: 'sw', prop(HH, RR, points) {
    const [x, y] = points.chest;
    stroke(HH, RR, [[x - 8, y - 4], [x + 11, y + 29], [x - 9, y + 36]], 'blue', 3);
    guitar(HH, RR, x + 1, y + 24, 'teal', true, .94);
  } }, 0, 1.25);
  for (let q = 0; q < 8; q++) H.dot(...H.p(4.31 + q * .28, 10.33, 1.13), 1.5, playing && Math.sin(t * 9 + q * 1.9) > -.2 ? 'sun' : 'blue', 1);
  actor(H, R, 2.37, 4.04, playing ? t : 0, 'type', { shirt: ['coral', .65], hairStyle: 'bun', face: 'nw' }, .07, 1.22);
  actor(H, R, 6.47, 8.17, playing ? t * .8 : 0, 'talk', { shirt: ['paper', 1], hairStyle: 'curly', face: 'se', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    HH.line(RR, [[x, y], [x - 5, y - 10]], 'blue', 3.4);
    HH.dot(x - 6, y - 13, 4, 'teal', .8, { knock: true });
    stroke(HH, RR, [[x + 1, y + 3], [x + 15, y + 21], [x + 6, y + 42]], 'blue', .8);
  } }, 0, 1.28);
  actor(H, R, 5.02, 11.57, t * .34, 'kneel', { shirt: ['sun', .65], hairStyle: 'short', face: 'nw' }, 0, 1.15);
  for (let q = 0; q < 4; q++) H.dot(...H.p(7.47, 11.55, .24 + q * .23), 1.9, playing && Math.sin(t * 7 + q) > 0 ? 'sun' : 'teal');
});
