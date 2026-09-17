import { cornice, windowBay, cityView, wallRack, hangingRail, taskLight } from '../joinery.js';
import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, boundBook, satchel, handTool } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const measure = { ...rest, lean: -11, head: 15, al: 66, ar: 78, el: 30, er: 14 };
FIGURES.clips.hongKongFabricMeasure = { dur: 16, keys: [[0, measure], [.1, measure], [.28, { ...measure, al: 85, ar: 100, el: 6, er: -5, lean: -17 }], [.48, { ...measure, al: 85, ar: 100, el: 6, er: -5, lean: -17 }], [.63, { ...measure, al: 57, ar: 56, el: 57, er: 60, lean: -4 }], [.8, { ...measure, al: 57, ar: 56, el: 57, er: 60, lean: -4, head: -2 }], [.95, measure], [1, measure]] };

function bolt(H, R, i, j, z, width, height, ink, pattern = 0) {
  box(H, R, i, j, width, .76, z, height, ink, .48);
  const face = H.faceI(i + .03, j + .775, width - .06, z + .04, z + height - .04);
  H.clip(face, () => {
    if (pattern % 3 === 0) for (let q = 0; q < 7; q++) H.line(R, [H.p(i + .02, j + .79, z + .08 + q * .15), H.p(i + width, j + .79, z + .08 + q * .15)], 'paper', 1.1);
    else if (pattern % 3 === 1) for (let q = 0; q < 12; q++) H.dot(...H.p(i + .08 + q % 3 * width / 3, j + .79, z + .13 + Math.floor(q / 3) * .19), 1.6, 'paper', 1);
    else for (let q = 0; q < 4; q++) H.line(R, [H.p(i + .1 + q * width / 4, j + .79, z), H.p(i + .1 + q * width / 4, j + .79, z + height)], 'blue', .6, { tone: .5 });
  });
  shape(H, R, H.tile(i + width * .3, j + .07, width * .4, .56, z + height + .015), 'paper', .85, .4);
}

function roll(H, R, i, j, z, length, ink, stripe = false) {
  const a = H.p(i, j, z), b = H.p(i + length, j, z);
  shape(H, R, [[a[0], a[1] - 13], [b[0], b[1] - 13], [b[0], b[1] + 9], [a[0], a[1] + 9]], ink, .6, .75);
  oval(H, R, ...a, 9, 13, ink, .7);
  oval(H, R, ...b, 9, 13, 'paper', 1);
  for (const rad of [3, 5, 7]) H.outline(R, Array.from({ length: 24 }, (_, q) => [b[0] + Math.cos(q * TAU / 24) * rad, b[1] + Math.sin(q * TAU / 24) * rad * 1.4]), ink, .8, { tone: .65 });
  H.dot(...b, 2.2, 'blue', .9);
  if (stripe) for (let q = 0; q < 3; q++) H.line(R, [[a[0], a[1] - 8 + q * 6], [b[0], b[1] - 8 + q * 6]], 'paper', 1.1);
}

function shamShuiPoFabricDetails(H, R) {
  drawerUnit(H, R, 0.22, 9.27, 3.35, 1.43, 1.35, 5, 'teal');
  shallowTray(H, R, 0.4, 9.44, 1.46, 1.02, 1.51, 'sun');
  for (let n = 0; n < 8; n++) {
    const [x, y] = H.p(0.61 + (n % 4) * 0.31, 9.7 + Math.floor(n / 4) * 0.4, 1.72);
    oval(H, R, x, y, 4, 3, ['coral', 'teal', 'paper', 'blue'][n % 4], 0.7);
    for (const dx of [-1, 1]) H.dot(x + dx, y, 0.5, 'blue');
  }
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(2.18 + n * 0.29, 9.83, 1.53);
    oval(H, R, x, y, 5, 3, 'sun', 0.5);
    H.line(
      R,
      [
        [x, y - 1],
        [x, y - 18]
      ],
      ['teal', 'coral', 'blue', 'paper'][n],
      6
    );
    oval(H, R, x, y - 18, 5, 3, 'paper', 1);
  }
  shelfUnit(H, R, 8.55, 0.17, 2.81, 0.72, 2.77, [0, 0.58], 'sun');
  for (let n = 0; n < 4; n++) foldedCloth(H, R, 8.72 + n * 0.6, 0.25, 0.48, 0.5, 2.91, ['coral', 'teal', 'paper', 'blue'][n], 'sun');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 9.02 + n * 0.8, 0.56, 3.49, 7, 13, ['teal', 'sun', 'coral'][n]);
  table(H, R, 5.04, 9.38, 2.48, 1.4, 0.55, 'teal');
  boundBook(H, R, 5.2, 9.55, 1.24, 0.99, 0.69, 'coral');
  shallowTray(H, R, 6.69, 9.63, 0.62, 0.91, 0.69, 'paper');
  handTool(H, R, 7, 10.02, 0.88, 'scissors', 'blue');
  for (let n = 0; n < 3; n++) foldedCloth(H, R, 5.19, 9.55, 1.42, 0.91, 0.12 + n * 0.12, 'paper', ['coral', 'teal', 'blue'][n]);
  satchel(H, R, 8.12, 10.75, 0.04, 'teal', 0.8);
  const [x, y] = H.p(3.91, 9.73, 0.05);
  stroke(
    H,
    R,
    [
      [x, y],
      [x + 12, y - 7],
      [x + 17, y + 1],
      [x + 8, y + 8],
      [x - 1, y + 2]
    ],
    'coral',
    1.3
  );
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.2, 11.8, 3.5, 'sun');
  windowBay(H, R, 'ne', 8.23, 3.32, 1.55, 1.87, {
    divisions: 3,
    view(P) {
      cityView(H, R, P, 3.32, 1.87);
    }
  });
  wallRack(H, R, 'nw', 1.3, 4.05, 2.23, 1.1, 2, 'teal', (P, z, row) => {
    for (let n = 0; n < 9; n++) {
      const [x, y] = P(0.3 + n * 0.43, z + 0.13);
      oval(H, R, x, y, 4.5, 2.3, 'paper', 1);
      shape(
        H,
        R,
        [
          [x - 3, y],
          [x + 3, y],
          [x + 3, y - 9],
          [x - 3, y - 9]
        ],
        ['coral', 'teal', 'sun'][(n + row) % 3],
        0.6,
        0.5
      );
      oval(H, R, x, y - 9, 4.5, 2, 'paper', 1);
      H.dot(x, y - 9, 1, 'blue');
    }
  });
  hangingRail(H, R, 'nw', 5.6, 2.73, 3.06, 5, (P, u, n) => {
    const [x, y] = P(u, -0.17);
    shape(
      H,
      R,
      [
        [x - 8, y],
        [x + 8, y - 3],
        [x + 9, y + 27 + (n % 2) * 8],
        [x - 7, y + 30 + (n % 2) * 8]
      ],
      ['teal', 'paper', 'coral'][n % 3],
      0.65,
      0.6
    );
    for (let q = 0; q < 5; q++)
      H.line(
        R,
        [
          [x - 7 + q * 3, y + 3],
          [x - 6 + q * 3, y + 24 + (n % 2) * 8]
        ],
        n % 2 ? 'teal' : 'paper',
        0.6
      );
    H.line(
      R,
      [
        [x - 5, y],
        [x + 4, y - 1]
      ],
      'sun',
      2
    );
  });
  for (let n = 0; n < 6; n++) {
    const i = 2.53 + n * 1.23;
    shape(H, R, H.faceI(i, 6.17, 1.08, 0.19, 0.93), 'teal', 0.34, 0.7);
    shape(H, R, H.faceI(i + 0.12, 6.18, 0.84, 0.28, 0.81), 'paper', 1, 0.55);
    H.line(R, [H.p(i + 0.32, 6.2, 0.74), H.p(i + 0.73, 6.2, 0.74)], 'blue', 1.5);
  }
  for (const x of [0.45, 2.21, 4.56, 6.91])
    for (const z of [0.4, 1.52, 2.61]) H.line(R, [H.p(x, 0.28, z), H.p(x + 0.43, 0.28, z + 0.52)], 'paper', 0.9);
  taskLight(H, R, 9.75, 4.34, 1.18, 'sun', -0.85);
  const [x, y] = H.p(8.87, 2.63, 0.98);
  box(H, R, 8.45, 2.31, 1.12, 0.6, 0.97, 0.07, 'blue', 0.65);
  shape(
    H,
    R,
    [
      [x - 18, y],
      [x - 18, y - 23],
      [x - 12, y - 31],
      [x + 14, y - 31],
      [x + 19, y - 25],
      [x + 19, y - 6],
      [x + 11, y - 6],
      [x + 10, y - 20],
      [x - 7, y - 20],
      [x - 8, y]
    ],
    'teal',
    0.65,
    0.8
  );
  oval(H, R, x + 20, y - 22, 7, 8, 'blue', 0.7);
  oval(H, R, x + 20, y - 22, 3.5, 4, 'sun', 0.5);
  H.line(
    R,
    [
      [x - 14, y - 8],
      [x - 14, y + 4]
    ],
    'blue',
    1.1
  );
  H.line(
    R,
    [
      [x - 17, y + 4],
      [x - 11, y + 4]
    ],
    'sun',
    1.5
  );
  H.line(
    R,
    [
      [x + 3, y - 32],
      [x + 3, y - 39]
    ],
    'blue',
    1
  );
  oval(H, R, x + 3, y - 38, 4, 2, 'coral', 0.7);
  stroke(
    H,
    R,
    [
      [x + 3, y - 37],
      [x - 9, y - 30],
      [x - 14, y - 5]
    ],
    'paper',
    0.6
  );
  foldedCloth(H, R, 8.46, 2.54, 0.75, 0.47, 1.09, 'paper', 'teal');
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(6.06 + n * 0.28, 9.95, 0.76);
    oval(H, R, px, py, 5, 4, 'coral', 0.6);
    H.line(
      R,
      [
        [px, py - 2],
        [px + 3, py - 9]
      ],
      'sun',
      0.7
    );
    H.dot(px + 3, py - 9, 1, 'paper');
  }
  for (let n = 0; n < 3; n++) {
    const [px, py] = H.p(7.91 + n * 0.15, 9.88, 0.025);
    stroke(
      H,
      R,
      [
        [px - 8, py],
        [px, py - 4],
        [px + 8, py + 2],
        [px + 15, py - 3]
      ],
      'coral',
      0.8
    );
  }
}

const room = world('hong-kong-sham-shui-po-fabric', 'Sham Shui Po · Twelve blue metres', { floor: 'paper', tone: .5, wall: 'paper', wallTone: .82, pattern: 'tiles', height: 3.72, head: 20 }, (H, R) => {
  for (const i of [.35, 2.7, 5.05, 7.4]) box(H, R, i, .17, .1, 1.23, .02, 3.52, 'teal', .7);
  for (const z of [.24, 1.34, 2.44, 3.54]) box(H, R, .35, .17, 7.15, 1.24, z, .12, 'teal', .6);
  for (let row = 0; row < 3; row++) for (let q = 0; q < 11; q++) bolt(H, R, .53 + q * .62, .41, .38 + row * 1.1, .52, .77 + q % 3 * .06, ['blue', 'paper', 'teal', 'coral', 'sun'][q % 5], row + q);
  shape(H, R, wallRect(H, 'ne', 8.23, 11.55, 1.55, 3.42), 'teal', .24, .7);
  for (const i of [8.34, 9.35, 10.4, 11.42]) H.line(R, [wallPt(H, 'ne', i, 1.62, .05), wallPt(H, 'ne', i, 3.32, .05)], 'paper', 2.1);
  H.line(R, [wallPt(H, 'ne', 8.33, 2.52, .05), wallPt(H, 'ne', 11.42, 2.52, .05)], 'paper', 2);
  for (const j of [1.8, 3.27, 4.74, 6.21, 7.68]) {
    box(H, R, .1, j, .91, 1.22, .1, .18, 'teal', .6);
    for (let q = 0; q < 3; q++) {
      const [x, y] = H.p(.56, j + .27 + q * .33, .25);
      shape(H, R, [[x - 8, y], [x + 8, y], [x + 8, y - 59], [x - 8, y - 59]], ['teal', 'sun', 'coral'][q], .42, .8);
      oval(H, R, x, y - 59, 8, 4, 'paper', 1);
      H.dot(x, y - 59, 2.2, 'blue', .8);
      H.line(R, [[x + 3, y - 5], [x + 3, y - 54]], 'paper', .9);
    }
  }
  table(H, R, 2.36, 4.1, 7.73, 2.04, 1.02, 'paper');
  shape(H, R, H.tile(3.1, 4.3, 5.96, 1.53, 1.155), 'blue', .6, .7);
  for (let q = 0; q < 12; q++) H.line(R, [H.p(3.13 + q * .48, 4.34, 1.17), H.p(3.13 + q * .48, 5.8, 1.17)], 'paper', .7, { tone: .6 });
  for (let q = 0; q < 4; q++) H.line(R, [H.p(3.14, 4.43 + q * .38, 1.18), H.p(9.01, 4.43 + q * .38, 1.18)], 'teal', .8);
  shape(H, R, [H.p(3.1, 5.83, 1.17), H.p(5.1, 5.83, 1.17), H.p(5.1, 6.2, .4), H.p(3.1, 6.2, .4)], 'blue', .6, .7);
  for (let q = 0; q < 5; q++) H.line(R, [H.p(3.16 + q * .4, 5.84, 1.17), H.p(3.16 + q * .4, 6.19, .41)], 'paper', .7);
  roll(H, R, 2.72, 4.49, 1.58, .88, 'blue', true);
  shape(H, R, H.tile(2.58, 6.02, 7.28, .1, 1.17), 'sun', .65, .4);
  for (let q = 0; q < 45; q++) H.line(R, [H.p(2.63 + q * .16, 6.015, 1.19), H.p(2.63 + q * .16, q % 5 ? 6.06 : 6.11, 1.19)], 'blue', .65);
  const [sx, sy] = H.p(9.62, 4.86, 1.19);
  for (const dx of [-5, 5]) oval(H, R, sx + dx, sy, 4.5, 3, 'coral', .65);
  H.line(R, [[sx - 2, sy - 1], [sx + 13, sy - 16]], 'blue', 2.1);
  H.line(R, [[sx + 2, sy - 1], [sx - 8, sy - 17]], 'blue', 2.1);
  shape(H, R, H.tile(9.43, 5.3, .22, .2, 1.18), 'paper', 1, .5);
  box(H, R, 9.42, 5.61, .37, .28, 1.16, .13, 'coral', .7);
  table(H, R, 8.22, 1.93, 2.85, 1.23, .83, 'teal');
  for (let q = 0; q < 3; q++) roll(H, R, 8.5, 2.2 + q * .3, 1.15 + q * .04, 1.65, ['coral', 'sun', 'paper'][q], q === 0);
  box(H, R, 9.5, 7.28, 1.55, 1.42, .08, .83, 'teal', .4);
  for (let q = 0; q < 3; q++) box(H, R, 9.62, 7.38, 1.22, 1.2, .93 + q * .09, .07, ['coral', 'paper', 'sun'][q], .56);
  for (let q = 0; q < 7; q++) {
    const [x, y] = H.p(1.74 + q % 4 * .29, 9.51 + Math.floor(q / 4) * .4, .17);
    oval(H, R, x, y, 5, 3, 'blue', .65);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 4, y - 11], [x - 4, y - 11]], ['teal', 'coral', 'sun'][q % 3], .7, .5);
    oval(H, R, x, y - 11, 5, 3, 'paper', 1);
  }
  box(H, R, 1.51, 9.22, 1.5, 1.21, .02, .12, 'coral', .5);
  shape(H, R, H.tile(5.55, 9.62, 1.92, 1.13, .03), 'paper', 1, .6);
  for (let q = 0; q < 5; q++) shape(H, R, H.tile(5.69 + q * .29, 9.74, .23, .87, .05), ['blue', 'teal', 'coral', 'sun', 'paper'][q], .6, .4);
  const [bx, by] = H.p(10.95, 10.5, .04);
  oval(H, R, bx, by - 4, 12, 5, 'paper', 1);
  shape(H, R, [[bx - 11, by - 4], [bx + 11, by - 4], [bx + 9, by - 23], [bx - 9, by - 23]], 'blue', .25, .7);
  oval(H, R, bx, by - 23, 9, 4, 'paper', 1);
  for (let q = 0; q < 5; q++) stroke(H, R, [[bx - 6 + q * 3, by - 22], [bx - 8 + q * 3, by - 30], [bx - 2 + q * 2, by - 26]], q % 2 ? 'coral' : 'teal', 2);
  shamShuiPoFabricDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  actor(H, R, 7.44, 6.91, t, 'hongKongFabricMeasure', { shirt: ['coral', .58], apron: ['paper', 1], glasses: true, hairStyle: 'short', face: 'nw', prop(HH, RR, points) {
    const a = points.nearHand, b = points.farHand, anchor = HH.p(6.15, 5.51, 1.2);
    stroke(HH, RR, [anchor, [a[0] - 17, a[1] + 5], a, [b[0] - 5, b[1] + 2], b], 'sun', 3.1);
    for (let q = 1; q < 9; q++) {
      const x = anchor[0] + (a[0] - anchor[0]) * q / 9, y = anchor[1] + (a[1] - anchor[1]) * q / 9;
      HH.line(RR, [[x, y - 1.5], [x + .8, y + 1.5]], 'blue', .6);
    }
  } }, 0, 1.4);
  actor(H, R, 4.17, 8.47, 0, 'hold', { shirt: ['teal', .63], hairStyle: 'pony', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    shape(HH, RR, [[x - 17, y - 9], [x + 10, y - 3], [x + 8, y + 15], [x - 19, y + 9]], 'paper', 1, .8);
    for (let q = 0; q < 4; q++) shape(HH, RR, [[x - 13 + q * 5, y - 6], [x - 9 + q * 5, y - 5], [x - 10 + q * 5, y + 8], [x - 14 + q * 5, y + 7]], ['teal', 'sun', 'coral', 'blue'][q], .62, .4);
  } }, 0, 1.25);
  const [x, y] = H.p(1.61, 8.78, 1.01);
  stroke(H, R, [[x, y], [x + 10, y + 8 + Math.sin(u * TAU) * 1.5], [x + 6, y + 24]], 'coral', 1.2);
});

room.loopSeconds = 16;
export default room;
