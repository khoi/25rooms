import { caneChair, benchFrame, timber } from '../materials.js';
import { wallCourse, cornice, recessedFrame, wallRack, hangingRail, radiator } from '../joinery.js';
import { shallowTray, foldedCloth, boundBook, satchel } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, wallRect, wallPt, windowOn, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: 15, lean: -5, al: 32, ar: 53, el: 63, er: 58 };
FIGURES.clips.newYorkDominoTest = { dur: 16, keys: [[0, seated], [.14, seated], [.31, { ...seated, ar: 79, er: 18, lean: -11, head: 22 }], [.55, { ...seated, ar: 79, er: 18, lean: -11, head: 22 }], [.68, { ...seated, ar: 64, er: 46, head: -5 }], [.82, seated], [1, seated]] };
FIGURES.clips.newYorkDominoTap = { dur: 16, keys: [[0, { ...seated, al: 63, ar: 48, el: 27, er: 51 }], [.44, { ...seated, al: 63, ar: 48, el: 27, er: 51 }], [.52, { ...seated, al: 69, ar: 48, el: 20, er: 51 }], [.57, { ...seated, al: 63, ar: 48, el: 27, er: 51 }], [.63, { ...seated, al: 69, ar: 48, el: 20, er: 51 }], [.71, { ...seated, al: 63, ar: 48, el: 27, er: 51 }], [1, { ...seated, al: 63, ar: 48, el: 27, er: 51 }]] };

function domino(H, R, i, j, a, b, turned = false) {
  const w = turned ? .28 : .56, d = turned ? .56 : .28;
  box(H, R, i, j, w, d, 1.11, .07, 'paper', 1);
  H.line(R, turned ? [H.p(i, j + .28, 1.19), H.p(i + .28, j + .28, 1.19)] : [H.p(i + .28, j, 1.19), H.p(i + .28, j + .28, 1.19)], 'blue', .6);
  for (const [half, number] of [[0, a], [1, b]]) {
    for (let k = 0; k < number; k++) {
      const dx = .073 + k % 2 * .125, dy = .061 + Math.floor(k / 2) * .072;
      H.dot(...H.p(i + dx + (turned ? 0 : half * .28), j + dy + (turned ? half * .28 : 0), 1.2), .72, 'blue', .95);
    }
  }
}

function chair(H, R, i, j, ink) {
  caneChair(H, R, i, j, ink);
}


function glass(H, R, i, j, z, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 6, y - 16], [x - 6, y - 16]], 'paper', 1, .65);
  shape(H, R, [[x - 4, y - 1], [x + 4, y - 1], [x + 5, y - 10], [x - 5, y - 10]], ink, .57, .3);
  oval(H, R, x, y - 16, 6, 2.5, 'paper', 1);
  H.line(R, [[x + 1, y - 5], [x + 6, y - 25]], 'teal', .9);
}

function gameTable(H, R) {
  benchFrame(H, R, 4.51, 4.25, 3.24, 3.24, 1.08, 'sun');
  for (const i of [4.56, 7.58]) timber(H, R, i, 4.3, 0.12, 3.13, 1.09, 0.045, 'teal');
  for (const j of [4.3, 7.36]) timber(H, R, 4.58, j, 3.06, 0.12, 1.09, 0.045, 'teal');
  shape(H, R, H.tile(4.65, 4.39, 2.97, 2.97, 1.1), 'paper', 0.82, 0.65);
  for (const [i, j, a, b, turned] of [
    [4.94, 5.54, 3, 5, false],
    [5.55, 5.54, 5, 2, false],
    [6.16, 5.54, 2, 6, false],
    [6.77, 5.54, 6, 1, true],
    [6.77, 6.14, 1, 4, true],
    [6.16, 6.46, 4, 2, false],
    [5.55, 6.46, 2, 3, false]
  ])
    domino(H, R, i, j, a, b, turned);
  for (let k = 0; k < 4; k++) {
    box(H, R, 4.84 + k * 0.38, 4.67, 0.28, 0.12, 1.11, 0.34, 'paper', 1);
    H.dot(...H.p(4.98 + k * 0.38, 4.8, 1.29), 1.1, 'blue', 0.8);
    box(H, R, 4.96 + k * 0.38, 7.0, 0.28, 0.12, 1.11, 0.34, 'paper', 1);
    H.line(R, [H.p(4.96 + k * 0.38, 7.13, 1.28), H.p(5.24 + k * 0.38, 7.13, 1.28)], 'blue', 0.4);
  }
  for (const j of [4.71, 5.1, 5.49]) box(H, R, 7.24, j, 0.12, 0.28, 1.11, 0.32, 'paper', 1);
  glass(H, R, 7.34, 6.95, 1.12, 'sun');
  glass(H, R, 4.79, 4.9, 1.12, 'coral');
  const [x, y] = H.p(7.06, 4.54, 1.14);
  oval(H, R, x, y, 10, 5, 'coral', 0.6);
  for (let k = 0; k < 3; k++) H.dot(x - 5 + k * 5, y - (k % 2) * 2, 2.1, 'sun', 0.8);
}

function eastHarlemDominoesDetails(H, R) {
  table(H, R, 0.62, 8.76, 2.19, 1.27, 0.65, 'teal');
  shallowTray(H, R, 0.79, 8.91, 1.83, 0.95, 0.79, 'paper');
  for (let n = 0; n < 4; n++) glass(H, R, 1.08 + (n % 2) * 0.97, 9.2 + Math.floor(n / 2) * 0.4, 1.02, n === 2 ? 'sun' : 'coral');
  foldedCloth(H, R, 0.8, 8.91, 1.79, 0.92, 0.15, 'paper', 'teal');
  box(H, R, 10.01, 7.05, 1.37, 1.19, 0.04, 0.7, 'teal', 0.58);
  shape(H, R, H.tile(10.15, 7.19, 1.1, 0.91, 0.79), 'paper', 1, 0.6);
  for (let n = 0; n < 6; n++) {
    box(H, R, 10.28 + (n % 3) * 0.28, 7.37 + Math.floor(n / 3) * 0.34, 0.2, 0.27, 0.81, 0.08, 'paper', 1);
    H.dot(...H.p(10.37 + (n % 3) * 0.28, 7.5 + Math.floor(n / 3) * 0.34, 0.91), 1.1, 'blue');
  }
  for (const j of [6.25, 6.78]) {
    stroke(H, R, [H.p(0.76, j, 0.03), H.p(0.76, j + 0.5, 1.15), H.p(1.55, j + 0.5, 1.15), H.p(1.55, j, 0.03)], 'blue', 1.8);
    box(H, R, 0.81, j + 0.14, 0.68, 0.13, 0.92, 0.32, 'sun', 0.5);
  }
  const [x, y] = H.p(6.52, 0.26, 2.31);
  shape(
    H,
    R,
    [
      [x - 15, y],
      [x + 15, y],
      [x + 15, y - 22],
      [x - 15, y - 22]
    ],
    'teal',
    0.55,
    0.7
  );
  oval(H, R, x - 7, y - 11, 6, 6, 'blue', 0.6);
  for (let n = 0; n < 3; n++)
    H.line(
      R,
      [
        [x + 3, y - 17 + n * 5],
        [x + 11, y - 17 + n * 5]
      ],
      'paper',
      0.8
    );
  H.line(
    R,
    [
      [x + 10, y - 22],
      [x + 21, y - 44]
    ],
    'blue',
    1
  );
  satchel(H, R, 8.47, 10.68, 0.03, 'coral', 0.8);
  boundBook(H, R, 3.62, 2.61, 0.8, 0.46, 0.68, 'sun');
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.1, 11.86, 3.31, 'teal');
  cornice(H, R, 'ne', 0.1, 11.86, 3.31, 'teal');
  wallCourse(H, R, 'nw', 4.1, 11.8, 0.85, 'teal');
  wallCourse(H, R, 'ne', 0.15, 8.3, 0.85, 'teal');
  wallRack(H, R, 'ne', 1.7, 3.2, 1.42, 1.55, 2, 'teal', (P, z, row) => {
    for (let n = 0; n < 6; n++) {
      const [x, y] = P(0.35 + n * 0.51, z + 0.13);
      if (row) {
        shape(
          H,
          R,
          [
            [x - 6, y],
            [x + 6, y],
            [x + 6, y - 13],
            [x - 6, y - 13]
          ],
          n % 2 ? 'paper' : 'coral',
          0.65,
          0.55
        );
        for (let q = 0; q < 3; q++) H.dot(x - 3 + q * 3, y - 8, 1, 'blue');
      } else {
        oval(H, R, x, y, 6, 2.8, 'paper', 1);
        H.line(
          R,
          [
            [x - 5, y],
            [x - 4, y + 7],
            [x + 4, y + 7],
            [x + 5, y]
          ],
          'teal',
          0.65
        );
      }
    }
  });
  recessedFrame(H, R, 'ne', 5.6, 1.72, 1.6, 1.28, 'sun', (P) => {
    shape(H, R, [P(0.12, 0.13), P(1.6, 0.13), P(1.6, 1.15), P(0.12, 1.15)], 'paper', 1, 0.5);
    for (let n = 0; n < 5; n++) {
      H.line(R, [P(0.2, 0.3 + n * 0.16), P(1.51, 0.3 + n * 0.16)], 'teal', 0.5);
      for (let q = 0; q < 3; q++) H.line(R, [P(0.28 + q * 0.42, 0.26 + n * 0.16), P(0.36 + q * 0.42, 0.37 + n * 0.16)], 'blue', 0.6);
    }
  });
  for (const i of [4.64, 7.48]) {
    H.line(R, [H.p(i, 4.4, 0.17), H.p(i, 7.22, 0.17)], 'sun', 1.8);
    H.line(R, [H.p(i, 4.4, 0.2), H.p(i, 7.22, 0.91)], 'teal', 1.3);
  }
  for (const [i, j] of [
    [4.73, 4.49],
    [7.51, 4.49],
    [4.73, 7.27],
    [7.51, 7.27]
  ])
    H.dot(...H.p(i, j, 1.11), 1.3, 'sun');
  const [x, y] = H.p(10.69, 4.59, 1.32);
  shape(
    H,
    R,
    [
      [x - 13, y],
      [x + 12, y],
      [x + 12, y - 15],
      [x - 13, y - 15]
    ],
    'sun',
    0.55,
    0.7
  );
  for (let n = 0; n < 7; n++)
    H.line(
      R,
      [
        [x - 10 + n * 2, y - 12],
        [x - 10 + n * 2, y - 3]
      ],
      'blue',
      0.6
    );
  for (const dx of [6, 10]) oval(H, R, x + dx, y - 7, 1.8, 1.8, 'coral', 0.7);
  H.line(
    R,
    [
      [x + 8, y - 16],
      [x + 14, y - 31]
    ],
    'blue',
    0.9
  );
  for (let n = 0; n < 6; n++) {
    const [px, py] = H.p(1.02 + n * 0.27, 9.58, 0.83);
    shape(
      H,
      R,
      [
        [px - 3, py],
        [px + 3, py],
        [px + 3, py - 8],
        [px - 3, py - 8]
      ],
      'paper',
      1,
      0.5
    );
    H.dot(px, py - 5, 1, 'blue');
  }
  hangingRail(H, R, 'nw', 6.16, 3.5, 2.33, 3, (P, u, n) => {
    const [x, y] = P(u, -0.16);
    if (n < 2) {
      shape(
        H,
        R,
        [
          [x - 7, y + 3],
          [x - 3, y - 1],
          [x + 4, y - 1],
          [x + 8, y + 4],
          [x + 5, y + 29],
          [x - 5, y + 29]
        ],
        n ? 'sun' : 'teal',
        0.55,
        0.6
      );
      H.line(
        R,
        [
          [x, y + 4],
          [x, y + 24]
        ],
        'paper',
        0.7
      );
    } else {
      oval(H, R, x, y + 9, 10, 5, 'coral', 0.5);
      oval(H, R, x, y + 6, 6, 6, 'coral', 0.6);
    }
  });
}

const room = world('new-york-east-harlem-dominoes', 'East Harlem · The Last Double', { floor: 'coral', tone: .2, wall: 'paper', wallTone: .9, height: 3.53, head: 20 }, (H, R) => {
  radiator(H,R,'nw',.5,2.68,.75);

  for (const side of ['nw', 'ne']) {
    shape(H, R, wallRect(H, side, .03, 11.94, .1, .87), 'teal', .34, .65);
    for (let z = 1; z < 3.5; z += .32) {
      H.line(R, [wallPt(H, side, .05, z, -.025), wallPt(H, side, 11.95, z, -.025)], 'coral', .6, { tone: .25 });
      for (let p = Math.round(z * 10) % 2 * .56; p < 12; p += 1.12) H.line(R, [wallPt(H, side, p, z, -.03), wallPt(H, side, p, z + .3, -.03)], 'coral', .6, { tone: .25 });
    }
  }
  for (let i = .2; i < 12; i += .92) for (let j = .2; j < 12; j += .92) H.outline(R, H.tile(i, j, .8, .8, .016), 'blue', .45, { tone: .28, amp: .08 });
  windowOn(H, R, 'nw', 1.12, 1.16, 2.62, 1.85, { sky: 'blue', skyTone: .68, frameInk: 'teal', inside() {
    shape(H, R, wallRect(H, 'nw', 1.28, 3.58, 1.3, 2.9, .025), 'sun', .25, .4);
  } });
  for (let j = 1.3; j < 3.65; j += .48) H.line(R, [H.p(.08, j, 1.27), H.p(.08, j, 2.91)], 'blue', 1.7);
  H.line(R, [H.p(.08, 1.24, 2.15), H.p(.08, 3.7, 2.15)], 'blue', 1.7);
  shape(H, R, wallRect(H, 'ne', 8.62, 10.7, .04, 2.89), 'blue', .77, 1.15);
  shape(H, R, wallRect(H, 'ne', 8.77, 10.54, .15, 2.74, -.06), 'teal', .58, .8);
  for (const z of [.36, 1.18, 2.0]) shape(H, R, wallRect(H, 'ne', 8.95, 10.37, z, z + .53, -.08), 'paper', .17, .6);
  H.dot(...H.p(10.23, .12, 1.29), 2.8, 'sun', 1);
  box(H, R, 8.49, .36, 2.34, .86, .03, .19, 'blue', .48);
  for (const j of [4.6, 5.13, 5.66, 6.19, 6.72]) H.line(R, [H.p(.21, j, .9), H.p(.21, j, 3.2)], 'blue', .9);
  for (const z of [1.1, 1.64, 2.18, 2.72, 3.2]) H.line(R, [H.p(.21, 4.57, z), H.p(.21, 6.92, z)], 'blue', .9);
  for (let k = 0; k < 16; k++) {
    const [x, y] = H.p(.26, 4.68 + k % 5 * .44, 1.02 + Math.floor(k / 5) * .64);
    shape(H, R, [[x, y], [x - 9, y - 7], [x - 6, y - 17], [x + 5, y - 12]], 'teal', .65, .6);
    H.line(R, [[x, y], [x - 3, y - 13]], 'blue', .55);
  }
  for (const i of [1.22, 7.26]) {
    H.line(R, [H.p(i, 1.42, .03), H.p(i, 1.42, 3.75)], 'blue', 3);
    H.line(R, [H.p(i, 3.31, .03), H.p(i, 3.31, 3.27)], 'blue', 3);
  }
  for (let k = 0; k < 7; k++) {
    const i = 1.1 + k * .89;
    shape(H, R, [H.p(i, 1.26, 3.79), H.p(i + .89, 1.26, 3.79), H.p(i + .89, 3.43, 3.27), H.p(i, 3.43, 3.27)], k % 2 ? 'paper' : 'coral', k % 2 ? 1 : .54, .7);
    shape(H, R, [H.p(i, 3.43, 3.27), H.p(i + .89, 3.43, 3.27), H.p(i + .73, 3.43, 3.0), H.p(i + .17, 3.43, 3.0)], k % 2 ? 'paper' : 'coral', k % 2 ? 1 : .54, .6);
  }
  table(H, R, 1.04, 2.41, 4.34, .8, .52, 'teal');
  box(H, R, 1.04, 2.41, 4.34, .13, .67, .86, 'teal', .55);
  for (let k = 0; k < 10; k++) H.line(R, [H.p(1.21 + k * .43, 2.58, .75), H.p(1.21 + k * .43, 2.58, 1.45)], 'paper', .7);
  box(H, R, 2.18, 2.68, .95, .5, .67, .41, 'coral', .52);
  stroke(H, R, [H.p(2.34, 2.88, 1.07), H.p(2.38, 2.88, 1.31), H.p(2.94, 2.88, 1.31), H.p(3.01, 2.88, 1.07)], 'blue', 1.5);
  chair(H, R, 5.26, 3.02, 'sun');
  chair(H, R, 3.0, 5.05, 'teal');
  chair(H, R, 8.08, 5.6, 'coral');
  chair(H, R, 5.58, 8.0, 'sun');
  table(H, R, 10.13, 3.95, 1.25, 1.11, .77, 'paper');
  box(H, R, 10.32, 4.14, .72, .7, .91, .36, 'teal', .7);
  H.line(R, [H.p(10.45, 4.16, 1.31), H.p(10.85, 4.55, 1.31)], 'sun', 1.3);
  glass(H, R, 10.54, 4.01, .91);
  for (const [i, j, scale] of [[.82, 7.96, .98], [.83, 10.74, 1.19], [10.64, 10.29, 1.08]]) plant(H, R, ...H.p(i, j, .03), scale);
  box(H, R, 9.31, 9.38, .7, .75, .04, .47, 'paper', 1);
  shape(H, R, H.tile(9.36, 9.43, .6, .65, .53), 'sun', .6, .6);
  const [x, y] = H.p(9.65, 9.77, .63);
  oval(H, R, x, y, 7, 3, 'teal', .6);
  stroke(H, R, [[x - 4, y - 2], [x - 1, y - 20], [x + 5, y - 25]], 'teal', 1.4);
  oval(H, R, x + 7, y - 25, 4, 3, 'coral', .75);
  stroke(H, R, [H.p(.23, 9.38, 3.2), H.p(5.39, 7.98, 3.05), H.p(10.85, .24, 3.26)], 'blue', .8);
  eastHarlemDominoesDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  H.at(5.78, 3.53, 0, h => actor(h, R, 5.78, 3.53, t, 'newYorkDominoTap', { shirt: ['paper', 1], hairStyle: 'cap', face: 'se' }, .2, 1.27, 'elder'));
  H.at(3.53, 5.59, 0, h => actor(h, R, 3.53, 5.59, 0, 'sit', { shirt: ['coral', .69], hairStyle: 'curly', face: 'se' }, .2, 1.32));
  H.at(6.12, 6.88, 0, h => gameTable(h, R));
  H.at(8.58, 6.12, 0, h => actor(h, R, 8.58, 6.12, t, 'newYorkDominoTest', { shirt: ['teal', .73], hairStyle: 'bald', glasses: true, face: 'sw', prop(hh, rr, points) {
    const [x, y] = points.nearHand;
    shape(hh, rr, [[x - 10, y - 6], [x + 3, y - 4], [x + 3, y + 3], [x - 10, y + 1]], 'paper', 1, .6);
    hh.line(rr, [[x - 3.5, y - 5], [x - 3.5, y + 2]], 'blue', .5);
    for (const dx of [-7, 0]) for (const dy of [-2.5, 0]) hh.dot(x + dx, y + dy, .65, 'blue', .9);
  } }, .2, 1.32, 'elder'));
  H.at(6.09, 8.47, 0, h => actor(h, R, 6.09, 8.47, 0, 'read', { shirt: ['sun', .8], hairStyle: 'bun', face: 'nw', prop(hh, rr, p) {
    const [x, y] = p.nearHand;
    shape(hh, rr, [[x - 4, y - 6], [x + 4, y - 5], [x + 4, y + 6], [x - 4, y + 5]], 'paper', 1, .55);
    hh.dot(x, y - 2, 1.2, 'blue', .85);
    hh.dot(x, y + 3, 1.2, 'blue', .85);
  } }, .2, 1.26));
  const u = cycle(t, 16);
  for (let k = 0; k < 9; k++) {
    const a = k / 8, i = .3 + a * 10.5, j = 9.38 - a * 9.1, z = 3.2 - Math.sin(a * Math.PI) * .23;
    const [x, y] = H.p(i, j, z);
    H.line(R, [[x, y], [x + Math.sin(u * TAU) * .7, y + 7]], 'blue', .65);
    oval(H, R, x + Math.sin(u * TAU) * .7, y + 9, 2.8, 4, k % 3 ? 'sun' : 'coral', .85);
  }
});

room.loopSeconds = 16;
export default room;
