import { cornice, panelFront, wallRack, taskLight, specimen } from '../joinery.js';
import { drawerUnit, shallowTray, foldedCloth, boundBook, satchel, framedPanel, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, plant, cycle, TAU, ell, loop, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 17, al: 65, el: 36, ar: 55, er: 66 };
FIGURES.clips.newYorkLeafLens = { dur: 18, keys: [[0, seated], [.15, seated], [.29, { ...seated, al: 71, el: 63, head: 23 }], [.47, { ...seated, al: 71, el: 63, head: 23 }], [.61, { ...seated, al: 87, el: 25, head: 6 }], [.77, { ...seated, al: 87, el: 25, head: 6 }], [.93, seated], [1, seated]] };
const indicate = { ...rest, head: 15, lean: -5, ar: 83, er: 6, al: 31, el: 42 };
FIGURES.clips.newYorkLeafGuide = { dur: 18, keys: [[0, indicate], [.34, indicate], [.53, { ...indicate, ar: 99, er: 2, head: 3 }], [.74, { ...indicate, ar: 99, er: 2, head: 3 }], [.92, indicate], [1, indicate]] };

function leaf(H, R, x, y, size = 1, ink = 'coral', turn = 0, oak = false) {
  const p = (a, b) => [x + (a * Math.cos(turn) - b * Math.sin(turn)) * size, y + (a * Math.sin(turn) + b * Math.cos(turn)) * size];
  const edge = oak ? [[0, -16], [5, -13], [4, -9], [11, -8], [8, -3], [12, 1], [7, 5], [5, 12], [0, 15], [-4, 10], [-10, 8], [-7, 2], [-12, -2], [-7, -6], [-9, -10], [-3, -11]] : [[0, -17], [6, -7], [13, -7], [8, 0], [14, 5], [5, 7], [2, 15], [-3, 8], [-12, 7], [-8, 0], [-13, -5], [-5, -6]];
  shape(H, R, edge.map(([a, b]) => p(a, b)), ink, .65, .6);
  H.line(R, [p(0, -12), p(0, 19)], 'blue', .65, { tone: .65 });
  for (const n of [-1, 1]) for (const q of [-5, 3]) H.line(R, [p(0, q + 5), p(n * 7, q)], 'blue', .45, { tone: .55 });
}

function cone(H, R, x, y, size = 1) {
  oval(H, R, x, y - 7 * size, 6 * size, 10 * size, 'sun', .65);
  for (let n = 0; n < 4; n++) stroke(H, R, [[x - 4 * size, y - n * 4 * size], [x, y + 2 * size - n * 4 * size], [x + 4 * size, y - n * 4 * size]], 'blue', .6);
}

function roundedTable(H, R) {
  for (const [i, j] of [[4.02, 5.3], [7.66, 5.3], [4.02, 7.16], [7.66, 7.16]]) box(H, R, i, j, .16, .16, .03, .91, 'teal', .7);
  const corners = [[3.68, 5.16], [3.96, 4.9], [7.82, 4.9], [8.17, 5.19], [8.17, 7.27], [7.83, 7.59], [3.99, 7.59], [3.68, 7.29]];
  const upper = corners.map(([i, j]) => H.p(i, j, 1.06));
  const lower = corners.map(([i, j]) => H.p(i, j, .93));
  shape(H, R, loop(lower, 1), 'coral', .46, .7);
  shape(H, R, loop(upper, 1), 'sun', .42, .85);
  H.line(R, [H.p(4.16, 5.41, 1.07), H.p(7.67, 5.41, 1.07)], 'coral', .6, { tone: .25 });
}

function greenbeltCenterDetails(H, R) {
  drawerUnit(H, R, 8.05, 0.46, 3.15, 1.08, 1.16, 4, 'teal');
  shallowTray(H, R, 8.25, 0.63, 1.28, 0.76, 1.33, 'paper');
  for (let n = 0; n < 3; n++) cone(H, R, ...H.p(8.55 + n * 0.33, 1.0, 1.57), 0.45 + n * 0.08);
  shallowTray(H, R, 9.77, 0.63, 1.18, 0.77, 1.33, 'sun');
  for (let n = 0; n < 3; n++) leaf(H, R, ...H.p(10.06 + n * 0.26, 0.99, 1.57), 0.45, ['teal', 'coral', 'sun'][n], n * 0.4, n === 1);
  framedPanel(H, R, 4.25, 0.16, 1.58, 1.69, 1.28, 'teal');
  framedPanel(H, R, 6.23, 0.16, 1.39, 1.78, 1.09, 'sun');
  table(H, R, 0.94, 9.14, 2.67, 1.65, 0.67, 'sun');
  boundBook(H, R, 1.13, 9.32, 1.15, 1.2, 0.82, 'teal');
  shallowTray(H, R, 2.49, 9.32, 0.88, 1.21, 0.82, 'paper');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(2.91, 9.6 + n * 0.34, 1.04);
    oval(H, R, x, y, 6, 4, 'paper', 1);
    oval(H, R, x, y, 3, 2, 'teal', 0.3);
  }
  slattedCrate(H, R, 1.14, 9.36, 1.92, 1.24, 0.02, 0.48, 'teal');
  foldedCloth(H, R, 1.31, 9.53, 1.54, 0.87, 0.58, 'paper', 'coral');
  const [x, y] = H.p(10.91, 6.08, 0.04);
  H.line(
    R,
    [
      [x, y],
      [x - 6, y - 60]
    ],
    'sun',
    2.5
  );
  oval(H, R, x - 8, y - 75, 12, 15, 'paper', 0.5);
  for (let n = -2; n < 3; n++)
    H.line(
      R,
      [
        [x - 17, y - 74 + n * 3],
        [x + 2, y - 74 + n * 3]
      ],
      'teal',
      0.6
    );
  satchel(H, R, 9.67, 10.4, 0.03, 'coral', 0.8);
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.12, 11.83, 3.34, 'sun');
  for (const i of [1.07, 3.52, 5.97, 8.43, 10.87]) {
    box(H, R, i, 0.08, 0.12, 0.3, 0.95, 2.08, 'teal', 0.6);
    for (const z of [1.12, 2.84]) H.dot(...H.p(i + 0.06, 0.4, z), 1.3, 'sun');
  }
  box(H, R, 0.98, 0.1, 10.04, 0.44, 0.84, 0.11, 'sun', 0.5);
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(1.55 + n * 1.43, 0.41, 0.99);
    specimen(H, R, x, y, 0.42 + (n % 2) * 0.16, 'teal', n === 2);
  }
  for (const j of [1.5, 3.34, 5.18])
    for (const z of [0.3, 1.2, 2.13]) {
      const [x, y] = H.p(1.37, j + 0.63, z + 0.19);
      shape(
        H,
        R,
        [
          [x - 8, y],
          [x + 8, y],
          [x + 8, y - 9],
          [x - 8, y - 9]
        ],
        'paper',
        1,
        0.5
      );
      H.line(
        R,
        [
          [x - 5, y - 4],
          [x + 5, y - 4]
        ],
        'coral',
        0.8
      );
    }
  wallRack(H, R, 'nw', 6.95, 0.9, 1.25, 1.85, 3, 'teal', (P, z, row) => {
    const [x, y] = P(0.45, z + 0.16);
    oval(H, R, x, y, 7, 3, 'paper', 1);
    shape(
      H,
      R,
      [
        [x - 6, y],
        [x + 6, y],
        [x + 6, y - 19],
        [x - 6, y - 19]
      ],
      'paper',
      1,
      0.5
    );
    cone(H, R, x, y - 7, 0.42 + row * 0.05);
    oval(H, R, x, y - 20, 6, 2.5, 'sun', 0.5);
  });
  panelFront(H, R, 8.12, 1.57, 3.01, 0.15, 1.04, 4, 'teal');
  const [x, y] = H.p(9.61, 1.02, 1.35);
  shape(
    H,
    R,
    [
      [x - 9, y],
      [x + 10, y],
      [x + 9, y - 6],
      [x - 9, y - 6]
    ],
    'blue',
    0.7,
    0.7
  );
  H.line(
    R,
    [
      [x, y - 5],
      [x - 5, y - 27],
      [x + 5, y - 37]
    ],
    'teal',
    3.4
  );
  H.line(
    R,
    [
      [x + 4, y - 35],
      [x + 11, y - 39]
    ],
    'blue',
    4
  );
  oval(H, R, x + 2, y - 18, 4, 4, 'sun', 0.8);
  H.line(
    R,
    [
      [x - 9, y - 13],
      [x + 7, y - 13]
    ],
    'paper',
    2.3
  );
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(1.41 + n * 0.52, 9.72, 0.84);
    shape(
      H,
      R,
      [
        [px - 8, py],
        [px + 8, py],
        [px + 8, py - 17],
        [px - 8, py - 17]
      ],
      'paper',
      1,
      0.6
    );
    leaf(H, R, px, py - 4, 0.4, n % 2 ? 'teal' : 'coral', n * 0.2, n === 1);
    H.dot(px, py - 16, 1.2, 'sun');
  }
  for (const i of [4.13, 7.52]) H.line(R, [H.p(i, 5.45, 0.18), H.p(i, 6.99, 0.89)], 'teal', 1.6);
  const [px, py] = H.p(7.22, 6.08, 1.23);
  oval(H, R, px, py, 8, 5, 'paper', 1);
  oval(H, R, px, py, 5.5, 3.5, 'teal', 0.14);
  H.line(
    R,
    [
      [px + 5, py + 3],
      [px + 14, py + 11]
    ],
    'blue',
    2
  );
  for (let n = 0; n < 3; n++) {
    const [ax, ay] = H.p(9.47 + n * 0.32, 8.76, 1.19);
    shape(
      H,
      R,
      [
        [ax - 5, ay],
        [ax + 5, ay],
        [ax + 5, ay - 11],
        [ax - 5, ay - 11]
      ],
      'paper',
      1,
      0.5
    );
    oval(H, R, ax, ay - 11, 5, 2, 'teal', 0.4);
  }
  taskLight(H, R, 10.69, 0.75, 1.34, 'sun', -0.45);
}

const room = world('new-york-greenbelt-center', 'Staten Island · The Leaf Table', { floor: 'paper', tone: .63, wall: 'teal', wallTone: .15, pattern: 'boards', height: 3.55, head: 20 }, (H, R) => {
  const window = wallRect(H, 'ne', .88, 11.07, .8, 3.16, .05);
  shape(H, R, window, 'blue', .63, .8);
  const glass = wallRect(H, 'ne', 1.04, 10.9, .96, 3.0, .07);
  shape(H, R, glass, 'paper', 1, .65);
  H.clip(glass, () => {
    shape(H, R, wallRect(H, 'ne', 1.03, 10.92, .95, 1.57, .08), 'teal', .15, .3);
    for (let n = 0; n < 8; n++) {
      const p = 1.2 + n * 1.26;
      stroke(H, R, [wallPt(H, 'ne', p, .92, .09), wallPt(H, 'ne', p + .08, 2.24, .09), wallPt(H, 'ne', p - .18, 3.19, .09)], 'blue', 3.1, .5);
      for (let k = 0; k < 5; k++) {
        const [x, y] = wallPt(H, 'ne', p + (k % 2 ? .37 : -.36), 1.55 + k * .31, .1);
        leaf(H, R, x, y, .63 + k % 2 * .22, n % 3 === 0 ? 'sun' : 'teal', -.7 + k * .32, n % 2 === 0);
      }
    }
  });
  for (const p of [1.04, 3.52, 5.98, 8.45, 10.9]) H.line(R, [wallPt(H, 'ne', p, .95, .15), wallPt(H, 'ne', p, 3.01, .15)], 'paper', 4);
  H.line(R, [wallPt(H, 'ne', 1.04, 1.61, .15), wallPt(H, 'ne', 10.9, 1.61, .15)], 'paper', 3);
  box(H, R, .79, .19, 10.5, .91, 3.33, .15, 'teal', .6);
  for (let n = 0; n < 10; n++) box(H, R, 1.04 + n * 1.04, .19, .11, 1.11, 3.14, .19, 'sun', .5);
  box(H, R, .8, .97, 10.51, .15, 3.16, .32, 'paper', .82);
  box(H, R, .35, 1.26, 1.0, 5.7, .04, .24, 'teal', .62);
  for (const z of [.33, 1.13, 1.93]) {
    box(H, R, .34, 1.25, 1.02, 5.73, z, .12, 'sun', .55);
    for (const j of [1.3, 3.15, 5.0, 6.78]) box(H, R, .36, j, .94, .13, z + .12, .7, 'paper', .85);
  }
  for (let n = 0; n < 3; n++) {
    box(H, R, .53, 1.64 + n * 1.83, .61, 1.19, .49, .46, n % 2 ? 'teal' : 'paper', n % 2 ? .45 : .95);
    oval(H, R, ...H.p(1.17, 2.19 + n * 1.83, .7), 3.4, 2.4, 'coral', .6);
  }
  for (let n = 0; n < 4; n++) cone(H, R, ...H.p(.85, 1.8 + n * .29, 1.33), .62 + n % 2 * .2);
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(.8, 3.49 + n * .43, 1.35);
    oval(H, R, x, y - 7, 6, 8, 'paper', .95);
    oval(H, R, x, y - 14, 6, 2, 'teal', .45);
    H.line(R, [[x - 4, y - 10], [x - 4, y - 3]], 'blue', .6);
  }
  shape(H, R, H.tile(.46, 5.39, .75, 1.03, 1.3), 'coral', .4, .5);
  for (let n = 0; n < 4; n++) box(H, R, .58, 5.46, .48, .88, 1.34 + n * .07, .05, n % 2 ? 'paper' : 'teal', n % 2 ? 1 : .35);
  for (let n = 0; n < 5; n++) leaf(H, R, ...H.p(.89, 1.96 + n * .81, 2.21), .72, n % 2 ? 'coral' : 'sun', n * .8, n % 2 === 0);
  const doorway = wallRect(H, 'nw', 8.04, 11.56, .09, 3.13, .06);
  shape(H, R, doorway, 'blue', .58, .9);
  shape(H, R, wallRect(H, 'nw', 8.2, 11.4, .15, 2.97, .08), 'paper', 1, .6);
  shape(H, R, wallRect(H, 'nw', 8.23, 11.36, .18, 1.13, .1), 'teal', .23, .5);
  for (let n = 0; n < 5; n++) H.line(R, [wallPt(H, 'nw', 8.23 + n * .77, .15, .13), wallPt(H, 'nw', 8.23 + n * .77, 1.24, .13)], 'sun', 1.8);
  shape(H, R, H.tile(.17, 8.21, 2.01, 3.2, .09), 'sun', .27, .6);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(.18, 8.3 + n * .44, .11), H.p(2.14, 8.3 + n * .44, .11)], 'blue', .65, { tone: .36 });
  const [bx, by] = H.p(1.07, 10.43, .19);
  shape(H, R, [[bx - 20, by - 42], [bx - 20, by], [bx + 20, by], [bx + 20, by - 42]], 'teal', .65, .7);
  oval(H, R, bx, by, 20, 9, 'teal', .6);
  oval(H, R, bx, by - 42, 20, 9, 'paper', .95);
  for (const dy of [-31, -12]) stroke(H, R, [[bx - 20, by + dy], [bx, by + dy + 5], [bx + 20, by + dy]], 'blue', 1.4);
  stroke(H, R, [[bx + 9, by - 48], [bx + 9, by - 78], [bx + 18, by - 78]], 'blue', 3);
  H.line(R, [[bx + 15, by - 7], [bx + 29, by - 7], [bx + 29, by - 2]], 'sun', 2.6);
  plant(H, R, ...H.p(1.13, 8.62, .15), .67);
  roundedTable(H, R);
  shape(H, R, H.tile(4.09, 5.61, 1.32, .86, 1.09), 'paper', 1, .6);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(4.17, 5.74 + n * .13, 1.11), H.p(5.31, 5.66 + n * .13, 1.11)], 'blue', .65, { tone: .3 });
  leaf(H, R, ...H.p(5.69, 7.03, 1.13), .9, 'coral', .35);
  leaf(H, R, ...H.p(6.37, 6.62, 1.13), .91, 'sun', -.6, true);
  box(H, R, 6.92, 5.23, .8, 1.51, 1.1, .09, 'teal', .55);
  shape(H, R, H.tile(7.01, 5.32, .62, 1.32, 1.2), 'paper', 1, .5);
  leaf(H, R, ...H.p(7.3, 5.69, 1.23), .62, 'coral', .6, true);
  leaf(H, R, ...H.p(7.3, 6.28, 1.23), .7, 'teal', -.4);
  box(H, R, 4.57, 6.69, .76, .81, 1.08, .08, 'teal', .68);
  shape(H, R, H.tile(4.68, 6.8, .54, .6, 1.18), 'paper', 1, .5);
  leaf(H, R, ...H.p(4.97, 7.1, 1.22), 1.0, 'sun', 1.13, true);
  box(H, R, 5.43, 5.1, 1.29, .13, 1.1, .035, 'paper', 1);
  for (let n = 0; n < 10; n++) H.line(R, [H.p(5.48 + n * .12, 5.1, 1.16), H.p(5.48 + n * .12, 5.19, 1.16)], 'blue', .5);
  H.line(R, [H.p(5.51, 5.57, 1.11), H.p(6.48, 5.61, 1.11)], 'coral', 1.4);
  stroke(H, R, [H.p(6.08, 5.98, 1.12), H.p(6.63, 6.11, 1.12), H.p(6.8, 6.49, 1.12)], 'blue', 1.3);
  H.line(R, [H.p(6.46, 6.08, 1.12), H.p(6.71, 5.87, 1.12)], 'blue', 1.1);
  table(H, R, 5.12, 7.74, 1.01, .82, .67, 'coral');
  box(H, R, 5.12, 8.47, 1.01, .09, .77, .64, 'coral', .58);
  box(H, R, 5.17, 7.88, .91, .15, .29, .08, 'teal', .6);
  table(H, R, 8.78, 8.27, 2.0, 1.15, .52, 'paper');
  box(H, R, 9.1, 8.49, 1.22, .7, .66, .48, 'sun', .47);
  for (let n = 0; n < 6; n++) H.line(R, [H.p(9.16 + n * .2, 9.2, .7), H.p(9.16 + n * .2, 9.2, 1.11)], 'blue', .55);
  stroke(H, R, [H.p(9.3, 8.55, 1.17), H.p(9.7, 8.51, 1.53), H.p(10.1, 8.56, 1.17)], 'blue', 1.5);
  cone(H, R, ...H.p(10.86, 10.62, .04), .7);
  greenbeltCenterDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 18);
  actor(H, R, 8.45, 5.39, u * 18, 'newYorkLeafGuide', { shirt: ['paper', 1], vest: ['teal', .62], hairStyle: 'curly', face: 'sw', glasses: true }, .04, 1.31);
  actor(H, R, 5.6, 8.03, u * 18, 'newYorkLeafLens', { shirt: ['coral', .63], hairStyle: 'pony', face: 'ne', prop(h, r, points) {
    const [x, y] = points.nearHand;
    h.line(r, [[x, y], [x + 9, y - 9]], 'blue', 3);
    oval(h, r, x + 14, y - 14, 8, 7, 'paper', .4);
    h.outline(r, ell(x + 14, y - 14, 8, 7), 'teal', 2, { tone: .8, amp: .08 });
    h.line(r, [[x + 11, y - 18], [x + 16, y - 20]], 'paper', 1.3);
  } }, .39, 1.5, 'child');
  const glass = wallRect(H, 'ne', 8.56, 10.81, 1.74, 2.92, .17);
  H.clip(glass, () => {
    const sway = Math.sin(u * TAU) * .05;
    stroke(H, R, [wallPt(H, 'ne', 10.75, 1.71, .18), wallPt(H, 'ne', 10.08 + sway, 2.14, .18), wallPt(H, 'ne', 8.51 + sway, 2.64, .18)], 'blue', 1.2);
    for (let n = 0; n < 4; n++) leaf(H, R, ...wallPt(H, 'ne', 8.79 + n * .43 + sway, 2.63 - n * .16, .19), .59, n % 2 ? 'teal' : 'sun', -.4 + n * .24);
  });
});
room.loopSeconds = 18;
export default room;
