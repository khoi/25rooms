import { world, box, shape, oval, stroke, wallPt, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, vessel, benchFrame, bentTube, branchSpray, drape, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin } from '../structure.js';
import { hangingRail, floorShadow, cornice, recessedFrame, caster } from '../joinery.js';

const rest = { x: 0, y: 0, drop: 0, lean: 0, head: 8, al: 56, ar: 60, el: 55, er: 55, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
FIGURES.clips.barcelonaFlowerLift = { dur: 16, keys: [[0, rest], [.2, { ...rest, al: 98, ar: 105, el: 30, er: 32, head: 2 }], [.4, { ...rest, al: 101, ar: 106, el: 38, er: 36, head: -9 }], [.6, { ...rest, al: 101, ar: 106, el: 38, er: 36, head: -9 }], [.875, rest], [1, rest]] };
FIGURES.clips.barcelonaFlowerCustomer = { dur: 16, keys: [[0, { ...rest, al: -8, ar: 22, el: 0, er: 22 }], [.3, { ...rest, al: -8, ar: 22, el: 0, er: 22 }], [.47, { ...rest, al: -8, ar: 108, el: 0, er: 2, head: -10 }], [.64, { ...rest, al: -8, ar: 108, el: 0, er: 2, head: -10 }], [.88, { ...rest, al: -8, ar: 22, el: 0, er: 22 }], [1, { ...rest, al: -8, ar: 22, el: 0, er: 22 }]] };
const florist = { who: 'adult', at: [5.7, 6.9, 0], face: 'sw', clip: 'barcelonaFlowerLift', scale: 1.5 };

function bloom(H, R, x, y, scale, kind = 0, sway = 0, turn = 0) {
  for (let n = 0; n < 7; n++) {
    const a = -1.9 + n * .31, len = (33 + n % 3 * 10) * scale;
    const bx = x + Math.cos(a) * len * .8 * Math.cos(turn) + Math.sin(turn) * (n % 3 - 1) * 9 * scale + sway * n / 8, by = y + Math.sin(a) * len + Math.sin(turn) * (n % 2 - .5) * 5;
    stroke(H, R, [[x + (n - 3) * scale, y], [x + (bx - x) * .38, y - len * .55], [bx, by]], 'teal', 1.1 * scale);
    for (let k = 0; k < 2; k++) {
      const q = .42 + k * .24, px = x + (bx - x) * q, py = y + (by - y) * q;
      surface(H, R, [[px, py], [px + (n % 2 ? 1 : -1) * 10 * scale, py - 9 * scale], [px + (n % 2 ? 1 : -1) * 8 * scale, py - 2 * scale]], 'teal', .64, .45);
    }
    if (kind === 2) {
      for (let k = 0; k < 4; k++) oval(H, R, bx + (k % 2 ? 2 : -2) * scale, by + k * 4 * scale, 2.5 * scale, 3.5 * scale, 'sun', .75);
    } else {
      const ink = (n + kind) % 3 === 0 ? 'sun' : kind === 1 ? 'paper' : 'coral';
      for (let k = 0; k < 6; k++) oval(H, R, bx + Math.cos(k * Math.PI / 3) * 4 * scale, by + Math.sin(k * Math.PI / 3) * 4 * scale, 3.5 * scale, 2.8 * scale, ink, .82);
      H.dot(bx, by, 2.2 * scale, 'blue', .8);
    }
  }
}

function arch(H, R) {
  const P = (u, z, d = .18) => wallPt(H, 'nw', u, z, -d);
  const ring = m => {
    const p = [P(1 + m, .1), P(1 + m, 2.95)];
    for (let n = 0; n <= 30; n++) {
      const a = Math.PI - n * Math.PI / 30;
      p.push(P(5.7 + Math.cos(a) * (4.7 - m), 2.95 + Math.sin(a) * 1.45));
    }
    return p.concat([P(10.4 - m, .1)]);
  };
  surface(H, R, ring(0), 'coral', .35, 1.3);
  surface(H, R, ring(.42), 'blue', .67, 1.1);
  surface(H, R, ring(.63), 'paper', 1, .6);
  H.clip(ring(.63), () => {
    surface(H, R, [P(1.5, .1), P(10, .1), P(10, 1.5), P(1.5, 2.3)], 'sun', .17, .3);
    for (let k = 0; k < 5; k++) {
      const u = 1.8 + k * 1.7;
      surface(H, R, [P(u, 1.25), P(u + 1, 1.25), P(u + 1, 3.2), P(u, 3.2)], 'teal', .18, .6);
      H.line(R, [P(u + .1, 2.8), P(u + .9, 2.8)], 'blue', 1);
    }
  });
  for (let n = 0; n <= 14; n++) {
    const a = n * Math.PI / 14;
    H.line(R, [P(5.7 + Math.cos(a) * 4.3, 2.95 + Math.sin(a) * 1.45), P(5.7 + Math.cos(a) * 4.7, 2.95 + Math.sin(a) * 1.45)], 'blue', .8);
  }
  for (const j of [.59, 10.37]) {
    timber(H, R, .08, j, .63, .43, .06, 2.93, 'paper');
    timber(H, R, .04, j - .13, .78, .7, 2.78, .21, 'coral');
    for (let n = 0; n < 6; n++) H.line(R, [H.p(.73, j, .4 + n * .4), H.p(.73, j + .43, .4 + n * .4)], 'blue', .8);
  }
  for (let n = 0; n < 10; n++) {
    const j = 1.15 + n * .89;
    surface(H, R, [H.p(.12, j, 3.07), H.p(.12, j + .9, 3.07), H.p(1.44, j + .9, 2.94), H.p(1.44, j, 2.94)], n % 2 ? 'paper' : 'coral', n % 2 ? .91 : .52, .65);
    surface(H, R, [H.p(1.44, j, 2.94), H.p(1.44, j + .9, 2.94), H.p(1.44, j + .83, 2.72), H.p(1.44, j + .13, 2.72)], n % 2 ? 'paper' : 'coral', .8, .6);
  }
  for (const j of [1.19, 9.82]) bentTube(H, R, [[.2, j, 2.14], [1.45, j, 2.92], [.2, j, 3.05]], 2, 'blue');
  timber(H, R, .02, 1, .64, 9.4, .02, .15, 'paper');
  H.line(R, [H.p(.5, 1.12, .18), H.p(.5, 10.27, .18)], 'blue', 1.5);
  for (let n = 0; n < 12; n++) H.line(R, [H.p(.2, 1.18 + n * .74, .19), H.p(.58, 1.18 + n * .74, .19)], 'teal', .7);
}

const room = world('barcelona-market-flowers', 'A stem against the paper', { wall: 'paper', wallTone: .9, height: 4.5, floor: 'paper', tone: .7, pattern: 'tiles', accent: 'coral', head: 70 }, (H, R) => {
  masonry(H, R, 'ne', .05, 11.9, 0, .83, 'coral', .32);
  cornice(H, R, 'ne', .1, 11.8, 4.35, 'paper');
  arch(H, R);
  recessedFrame(H, R, 'ne', 10.05, 1.62, 2.25, 1.63, 'paper', P => {
    surface(H, R, [P(.12, .13), P(1.48, .13), P(1.48, 1.49), P(.12, 1.49)], 'teal', .28);
    for (let k = 0; k < 6; k++) H.line(R, [P(.19, .35 + k * .18), P(1.41, .35 + k * .18)], 'blue', 2);
    H.line(R, [P(.28, .19), P(1.3, .19)], 'coral', 1.6);
  });
  bentTube(H, R, [[11.56, .21, .1], [11.56, .21, 1.79], [10.09, .21, 1.79], [10.09, 2.3, 1.4]], 2.3, 'teal');
  for (const z of [.49, 1.25]) metal(H, R, 11.46, .1, .22, .17, z, .13, 'paper');
  floorLight(H, 3.3, 7.4, 155, .48);
  metal(H, R, .69, 2.12, .92, 4.83, .13, .1, 'teal');
  for (const [j, z, kind] of [[2.65, 1.52, 2], [4.23, 1.84, 1], [5.86, 1.45, 0]]) {
    vessel(H, R, 1.11, j, .27, 17, z * 25, 'blue');
    bloom(H, R, ...H.p(1.11, j, z), 1.1, kind);
    const p = H.p(1.11, j, z);
    branchSpray(H, R, p[0] - 7, p[1], 1.24, 'teal', -1);
  }
  floorShadow(H, 1.2, 1.25, 7.9, 1.2, .18);
  cabinetFrame(H, R, 2, .35, 7.8, 1.25, .1, 3.5, 3, 'teal', (x, j, w, d, z, h, n) => {
    timber(H, R, x, j, w, d, 1.08, .13, 'teal');
    timber(H, R, x, j, w, d, 2.32, .12, 'teal');
    if (n === 0) {
      for (let k = 0; k < 3; k++) {
        vessel(H, R, x + .42 + k * .64, j + .58, 1.22, 9, 25, 'blue');
        bloom(H, R, ...H.p(x + .42 + k * .64, j + .58, 1.95), .55, k);
      }
      box(H, R, x + .1, j + .1, w - .2, .8, z, .7, 'paper', .7);
      for (let k = 0; k < 6; k++) H.line(R, [H.p(x + .2 + k * .29, j + .92, .35), H.p(x + .2 + k * .29, j + .92, .77)], 'blue', .8);
    } else if (n === 1) {
      for (let k = 0; k < 4; k++) vessel(H, R, x + .35 + k * .47, j + .65, 1.22, 6 + k % 2, 18 + k % 2 * 8, k % 2 ? 'paper' : 'teal');
      for (let k = 0; k < 3; k++) vessel(H, R, x + .4 + k * .64, j + .5, 2.47, 7, 18 + k * 4, k === 1 ? 'coral' : 'paper');
      const p = H.p(x + .98, j + .65, 1.22);
      H.line(R, [[p[0] - 6, p[1] - 11], [p[0] + 6, p[1] - 11]], 'teal', 1.2);
    } else {
      for (let k = 0; k < 7; k++) box(H, R, x + .1 + k * .24, j + .1, .19, .62, 1.22, .9 + k % 2 * .22, k % 2 ? 'sun' : 'paper', .55);
      metal(H, R, x + .12, j + .15, 1.95, .82, .23, .66, 'paper');
      surface(H, R, H.faceI(x + .24, j + .98, 1.65, .34, .77), 'teal', .4);
      H.line(R, [H.p(x + 1.8, j + 1, .49), H.p(x + 1.8, j + 1, .69)], 'blue', 2);
    }
  });
  hangingRail(H, R, 'ne', 1.1, 8.8, 4.05, 7, (P, u, n) => {
    const p = P(u, -.16);
    if (n < 4) {
      stroke(H, R, [p, [p[0] - 3, p[1] + 22], [p[0] + 2, p[1] + 29]], 'coral', 1.5);
      branchSpray(H, R, p[0], p[1] + 32, .5, 'sun', n % 2 ? -1 : 1);
    } else {
      shape(H, R, [p, [p[0] + 6, p[1] + 2], [p[0] + 9, p[1] + 27], [p[0] + 3, p[1] + 24]], n % 2 ? 'coral' : 'paper', .7, .6);
    }
  });
  floorShadow(H, 1.95, 3.82, 4.97, 2.95, .24);
  for (const x of [2.06, 6.51]) for (const j of [3.93, 6.3]) {
    timber(H, R, x, j, .25, .24, .05, 1.22, 'sun');
    metal(H, R, x - .02, j - .02, .29, .28, .06, .23, 'teal');
  }
  for (const j of [4.01, 6.26]) timber(H, R, 2.16, j, 4.46, .19, .3, .16, 'sun');
  surface(H, R, H.faceI(3.4, 6.29, 3.14, .54, 1.15), 'blue', .8);
  for (const x of [3.43, 5.11]) {
    timber(H, R, x, 5.41, 1.47, 1.04, .66, .1, 'paper');
    timber(H, R, x, 6.41, 1.47, .13, .62, .44, 'sun');
    surface(H, R, H.faceI(x + .1, 6.56, 1.26, .72, .97), 'coral', .27, .65);
    bentTube(H, R, [[x + .45, 6.59, .86], [x + .45, 6.69, .86], [x + 1.02, 6.69, .86], [x + 1.02, 6.59, .86]], 1.6, 'blue');
  }
  timber(H, R, 1.95, 3.75, 4.9, 2.89, 1.18, .18, 'sun');
  surface(H, R, H.tile(3.5, 3.91, 3.14, 2.44, 1.374), 'paper', .74, .75);
  H.line(R, [H.p(3.62, 6.47, 1.37), H.p(6.57, 6.47, 1.37)], 'sun', 2.2);
  for (const j of [3.94, 6.17]) bentTube(H, R, [[2.07, j, .48], [2.79, j, 1.16]], 1.9, 'blue');
  const rollA = H.p(3.54, 3.95, 1.58), rollB = H.p(5.23, 3.95, 1.58);
  surface(H, R, [[rollA[0], rollA[1] - 9], [rollB[0], rollB[1] - 9], [rollB[0], rollB[1] + 9], [rollA[0], rollA[1] + 9]], 'paper', 1, .8);
  for (const p of [rollA, rollB]) {
    oval(H, R, ...p, 5, 9, 'sun', .62);
    oval(H, R, ...p, 2, 4, 'blue', .8);
  }
  for (const x of [3.41, 5.36]) metal(H, R, x, 3.88, .13, .32, 1.37, .37, 'teal');
  surface(H, R, [H.p(3.57, 4.09, 1.64), H.p(5.17, 4.09, 1.64), H.p(5.17, 4.85, 1.39), H.p(3.57, 4.85, 1.39)], 'paper', 1, .7);
  metal(H, R, 3.49, 4.83, 1.83, .08, 1.39, .07, 'teal');
  metal(H, R, 2.18, 3.9, 1.03, 2.58, 1.36, .08, 'blue');
  surface(H, R, H.tile(2.28, 4, .83, 2.38, 1.45), 'teal', .33);
  timber(H, R, 3.27, 3.8, .18, 2.8, 1.38, .13, 'paper');
  metal(H, R, 2.18, 4, 3.9, 2.3, .32, .08, 'teal');
  for (let k = 0; k < 9; k++) H.line(R, [H.p(2.35 + k * .42, 4.1, .41), H.p(2.35 + k * .42, 6.1, .41)], 'blue', .7);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(2.24, 4.14 + n * .44, 1.52), H.p(3.14, 4.14 + n * .44, 1.52)], 'paper', 1.4);
  bentTube(H, R, [[2.62, 6.35, 1.39], [2.62, 6.35, .42], [2.91, 6.47, .3]], 1.9, 'teal');
  vessel(H, R, 2.68, 4.57, 1.45, 15, 29, 'blue');
  bloom(H, R, ...H.p(2.68, 4.57, 2.3), .84, 1);
  vessel(H, R, 2.73, 5.77, 1.45, 12, 21, 'teal');
  bloom(H, R, ...H.p(2.73, 5.77, 2.1), .65, 2);
  const p = H.p(4.54, 5.25, 1.49);
  shape(H, R, [[p[0] - 22, p[1] - 7], [p[0] + 21, p[1] - 15], [p[0] + 8, p[1] + 14]], 'paper', 1);
  stroke(H, R, [[p[0] - 15, p[1] - 4], [p[0] + 8, p[1] + 12], [p[0] + 12, p[1] - 10]], 'sun', 1.2);
  const hand = FIGURES.pose(florist, 0, null, H).nearHand;
  oval(H, R, hand[0], hand[1] + 5, 13, 5, 'teal', .8);
  oval(H, R, hand[0], hand[1] + 4, 8, 2.5, 'blue', .7);
  stroke(H, R, [[hand[0], hand[1] + 8], [hand[0], p[1] + 3]], 'blue', 3);
  const spool = H.p(6.22, 4.25, 1.52);
  oval(H, R, ...spool, 10, 5, 'coral', .8);
  oval(H, R, spool[0], spool[1] - 8, 10, 5, 'paper', 1);
  oval(H, R, spool[0], spool[1] - 8, 3, 2, 'sun', .8);
  stroke(H, R, [[spool[0] + 8, spool[1]], [spool[0] + 17, spool[1] + 5], [spool[0] + 12, spool[1] + 18]], 'coral', 2);
  bentTube(H, R, [[5.7, 3.9, .83], [6.6, 3.9, .83]], 3, 'sun');
  for (let k = 0; k < 5; k++) timber(H, R, 5.84 + k * .15, 3.87, .12, .52, .63, .45, 'paper');
  const spl = H.p(3.53, 6.64, 1.37);
  stroke(H, R, [[spl[0] - 18, spl[1] + 12], [spl[0] + 4, spl[1] - 6], [spl[0] + 21, spl[1] - 4]], 'teal', 1.5);
  stroke(H, R, [[spl[0] - 5, spl[1] + 4], [spl[0] + 13, spl[1] - 3]], 'sun', 2);
  for (let k = 0; k < 3; k++) H.line(R, [[spl[0] + k * 4, spl[1] - k * 1.5 - 1], [spl[0] + 2 + k * 4, spl[1] - k * 1.5 + 4]], 'paper', 1.3);
  timber(H, R, 9.45, 1.79, 1.54, .14, 1.17, 1.05, 'paper');
  for (let n = 0; n < 4; n++) surface(H, R, H.faceI(9.5 + n * .36, 1.95, .32, 1.28, 2.13), n === 2 ? 'coral' : 'teal', .25, .6);
  benchFrame(H, R, 9.35, 1.95, 1.6, 2.55, 1.09, 'teal');
  basin(H, R, 9.47, 2.15, 1.33, 1.6, 1.1);
  bentTube(H, R, [[10.13, 2.96, 1.15], [10.13, 2.96, .42], [10.55, 3.12, .42], [10.61, 3.12, .16]], 2.6, 'blue');
  metal(H, R, 9.35, 2.15, .08, 1.57, .53, .1, 'paper');
  vessel(H, R, 9.81, 3.99, 1.13, 6, 16, 'coral');
  const soap = H.p(10.4, 3.97, 1.13);
  oval(H, R, ...soap, 10, 4, 'teal', .62);
  oval(H, R, soap[0], soap[1] - 2, 6, 2.5, 'paper', 1);
  metal(H, R, 9.59, 5.76, 1.49, .51, .024, .055, 'blue');
  for (let n = 0; n < 8; n++) H.line(R, [H.p(9.7 + n * .17, 5.82, .09), H.p(9.7 + n * .17, 6.22, .09)], 'paper', .85);
  vessel(H, R, 10.24, 4.94, .06, 15, 25, 'coral');
  for (let k = 0; k < 5; k++) stroke(H, R, [H.p(10.2, 4.94, .7), H.p(10 + k * .13, 4.85, 1.5 + k % 2 * .4)], 'teal', 1.1);
  bentTube(H, R, [[10.8, 3.75, .1], [10.8, 2.8, 1.8]], 2, 'sun');
  timber(H, R, 10.48, 3.55, .8, .17, .06, .1, 'teal');
  drape(H, R, 9.42, 3.87, .73, .2, 1.22, .7, 'paper');
  benchFrame(H, R, .75, 8.6, 2.8, 1.43, .7, 'teal');
  drape(H, R, 1.04, 8.78, 2.18, 1.06, .73, .4, 'coral');
  for (let k = 0; k < 4; k++) H.line(R, [H.p(1.2 + k * .52, 8.79, .75), H.p(1.2 + k * .52, 9.87, .75)], 'sun', 1.5);
  box(H, R, 1.4, 8.96, 1.2, .58, .76, .34, 'paper', 1);
  bentTube(H, R, [[1.58, 9.05, 1.08], [1.58, 9.05, 1.55], [2.3, 9.05, 1.55], [2.3, 9.05, 1.08]], 2, 'coral');
  for (let n = 0; n < 3; n++) box(H, R, 2.69, 9.15 + n * .11, .36, .28, .8, .025, n === 1 ? 'sun' : 'paper', .8);
  floorShadow(H, 3.56, 9.45, 2.61, 1.42, .22);
  for (const x of [3.7, 5.78]) for (const j of [9.48, 10.49]) caster(H, R, x, j, .1);
  timber(H, R, 3.54, 9.29, 2.58, 1.42, .27, .13, 'sun');
  for (const x of [3.57, 5.92]) for (const j of [9.31, 10.52]) timber(H, R, x, j, .11, .12, .4, .66, 'teal');
  for (const z of [.53, .85]) {
    timber(H, R, 3.56, 10.56, 2.48, .1, z, .12, 'sun');
    timber(H, R, 3.56, 9.33, .1, 1.27, z, .12, 'sun');
    timber(H, R, 5.95, 9.33, .1, 1.27, z, .12, 'sun');
  }
  for (let n = 0; n < 3; n++) {
    const p = H.p(4.03 + n * .65, 9.95, .52);
    shape(H, R, [[p[0] - 15, p[1] - 21], [p[0] + 13, p[1] - 24], [p[0] + 5, p[1] + 7], [p[0] - 4, p[1] + 7]], n === 1 ? 'coral' : 'paper', .8, .8);
    H.line(R, [[p[0] - 12, p[1] - 18], [p[0] + 3, p[1] + 5]], 'sun', 1.1);
    if (n === 1) bloom(H, R, p[0], p[1] - 12, .53, 1);
  }
  bentTube(H, R, [[5.99, 9.4, .42], [6.5, 9.4, 1.25], [6.5, 10.3, 1.25], [5.99, 10.3, .42]], 2.6, 'teal');
  drape(H, R, 3.66, 9.56, .54, .8, 1.04, .36, 'coral');
  const tools = H.p(6.08, 5.59, 1.4);
  for (const dx of [-4, 4]) oval(H, R, tools[0] + dx, tools[1], 4, 3, 'teal', .55);
  H.line(R, [[tools[0] - 4, tools[1] - 2], [tools[0] + 7, tools[1] - 13]], 'blue', 1.2);
  H.line(R, [[tools[0] + 4, tools[1] - 2], [tools[0] - 7, tools[1] - 13]], 'blue', 1.2);
  floorShadow(H, 8.2, 9.7, 1.7, 1.23, .16);
  vessel(H, R, 8.89, 10.27, .03, 21, 35, 'blue');
  bloom(H, R, ...H.p(8.89, 10.27, 1.03), .85, 2);
  const handle = H.p(8.89, 10.27, 1.08);
  stroke(H, R, [[handle[0] - 21, handle[1]], [handle[0] - 19, handle[1] - 15], [handle[0] + 18, handle[1] - 15], [handle[0] + 21, handle[1]]], 'paper', 2);
  surface(H, R, H.tile(9.6, 9.56, .55, .82, .025), 'paper', .9);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(9.71 + k * .07, 9.72, .04), H.p(9.91 + k * .04, 10.2, .04)], 'teal', 1.1);
}, (H, R, t) => {
  const u = ((t % 16) + 16) % 16;
  actor(H, R, 7.65, 6.85, u, 'barcelonaFlowerCustomer', { face: 'sw', shirt: ['coral', .68], hairStyle: 'curly', pants: ['blue', .7] }, 0, 1.48);
  actor(H, R, 5.7, 6.9, u, 'barcelonaFlowerLift', { face: 'sw', shirt: ['teal', .75], apron: ['paper', .95], hairStyle: 'bun', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand, turning = Math.min(1, Math.max(0, (u - 3.2) / 3.2)) * (1 - Math.min(1, Math.max(0, (u - 9.6) / 4.4))) * .95;
    bloom(HH, RR, x, y - 1, .79, 0, -16, turning);
    stroke(HH, RR, [[x - 5, y - 5], [x + 4, y - 4]], 'coral', 2.6);
    stroke(HH, RR, [[x + 2, y - 3], [x + 8, y + 6], [x + 5 + Math.sin(u * Math.PI / 8) * 2, y + 12]], 'coral', 1.4);
    HH.dot(x, y, 2.4, 'coral', .35, { knock: true });
  } }, 0, 1.5);
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
