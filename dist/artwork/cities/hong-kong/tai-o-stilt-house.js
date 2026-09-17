import { timber, bentTube, metal, cushion } from '../materials.js';
import { panelFront, wallRack, hangingRail } from '../joinery.js';
import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, satchel, handTool, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, actor, cycle, TAU, ell, bottle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 17, al: 52, el: 39, ar: 62, er: 33 };
const tension = { ...seated, lean: 2, al: 77, el: 22, ar: 87, er: 17, head: 10 };
FIGURES.clips.hongKongTaiONet = { dur: 16, keys: [[0, seated], [.13, seated], [.29, { ...seated, ar: 68, er: 24 }], [.39, seated], [.54, tension], [.72, tension], [.87, seated], [1, seated]] };
const tea = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, el: 54, ar: 40, er: 87, head: 8 };
FIGURES.clips.hongKongTaiOTea = { dur: 16, keys: [[0, tea], [.26, tea], [.41, { ...tea, ar: 53, er: 118, head: -5 }], [.57, { ...tea, ar: 53, er: 118, head: -5 }], [.73, tea], [1, tea]] };

function net(H, R, a, b, c, d, ink = 'teal') {
  const lerp = (p, q, v) => [p[0] + (q[0] - p[0]) * v, p[1] + (q[1] - p[1]) * v];
  const sample = (u, v) => lerp(lerp(a, b, u), lerp(d, c, u), v);
  for (let n = 0; n <= 10; n++) {
    const u = n / 10;
    H.line(R, [sample(u, 0), sample(u, 1)], ink, .65, { tone: .76 });
  }
  for (let n = 0; n <= 7; n++) {
    const v = n / 7;
    H.line(R, [sample(0, v), sample(1, v)], ink, .65, { tone: .76 });
  }
  H.outline(R, [a, b, c, d], 'blue', 1, { tone: .65 });
  for (const u of [.2, .5, .8]) for (const v of [.28, .71]) H.dot(...sample(u, v), 1.2, 'sun', .86);
}

function coil(H, R, i, j, z, s = 1) {
  const [x, y] = H.p(i, j, z);
  for (let k = 0; k < 5; k++) H.outline(R, ell(x, y, (7 + k * 3.4) * s, (3 + k * 1.5) * s), 'sun', 1.5, { tone: .7 });
  stroke(H, R, [[x + 20 * s, y], [x + 32 * s, y + 3], [x + 37 * s, y + 13]], 'sun', 1.6);
}

function cup(H, R, x, y, ink = 'paper') {
  shape(H, R, [[x - 5, y - 9], [x + 5, y - 9], [x + 4, y + 1], [x - 4, y + 1]], ink, ink === 'paper' ? 1 : .62, .55);
  oval(H, R, x, y - 9, 5, 2, 'paper', 1);
  stroke(H, R, [[x + 5, y - 7], [x + 10, y - 7], [x + 9, y - 1], [x + 4, y]], 'blue', .7);
}

function deckTable(H, R, i, j, w, d, z, ink) {
  for (const x of [i + .1, i + w - .2]) for (const y of [j + .1, j + d - .2]) box(H, R, x, y, .12, .12, 1.44, z - 1.44, 'blue', .6);
  box(H, R, i, j, w, d, z, .12, ink, .59);
}

function house(H, R) {
  shape(H, R, H.tile(0.05, 0.05, 11.9, 11.9, 0.025), 'teal', 0.34);
  for (let k = 0; k < 28; k++) {
    const i = 0.28 + (k % 7) * 1.64,
      j = 0.5 + Math.floor(k / 7) * 3.12;
    stroke(H, R, [H.p(i, j, 0.04), H.p(i + 0.45, j + 0.07, 0.04), H.p(i + 0.8, j, 0.04)], 'paper', 0.7, 0.63);
  }
  for (const i of [0.64, 5.75, 10.84])
    for (const j of [0.85, 7.91]) {
      box(H, R, i, j, 0.23, 0.27, 0.04, 1.46, 'blue', 0.59);
      box(H, R, i - 0.04, j - 0.03, 0.31, 0.33, 0.05, 0.2, 'teal', 0.55);
    }
  for (const i of [0.76, 5.89]) {
    H.line(R, [H.p(i, 8.03, 0.24), H.p(i + 4.82, 8.03, 1.36)], 'blue', 2.2);
    H.line(R, [H.p(i, 8.03, 1.35), H.p(i + 4.82, 8.03, 0.26)], 'blue', 2.2);
  }
  for (const j of [1.23, 4.08, 7.91]) timber(H, R, 0.4, j, 10.96, 0.25, 1.08, 0.23, 'sun');
  for (let n = 0; n < 17; n++) timber(H, R, 0.4, 0.55 + (n * 7.93) / 17, 10.96, 7.93 / 17 - 0.026, 1.26, 0.17, 'sun');
  for (const i of [0.76, 5.89]) {
    bentTube(
      H,
      R,
      [
        [i, 8.08, 0.2],
        [i + 4.82, 8.08, 1.29]
      ],
      4,
      'sun'
    );
    bentTube(
      H,
      R,
      [
        [i, 8.08, 1.28],
        [i + 4.82, 8.08, 0.21]
      ],
      4,
      'sun'
    );
    for (const x of [i, i + 4.82]) metal(H, R, x - 0.08, 8.1, 0.16, 0.065, 0.18, 1.11, 'teal');
  }
  for (let j = 0.63; j < 8.4; j += 0.42) {
    H.line(R, [H.p(0.46, j, 1.44), H.p(11.3, j, 1.44)], 'blue', 0.65, { tone: 0.46 });
    for (let i = (j % 2) * 1.5; i < 11; i += 2.76) H.line(R, [H.p(i, j, 1.44), H.p(i, j + 0.37, 1.44)], 'blue', 0.5, { tone: 0.3 });
  }
  box(H, R, 0.4, 0.55, 0.14, 7.35, 1.43, 2.78, 'paper', 1);
  box(H, R, 0.4, 0.55, 10.96, 0.14, 1.43, 2.93, 'teal', 0.46);
  for (let i = 0.66; i < 11.26; i += 0.34) H.line(R, [H.p(i, 0.71, 1.52), H.p(i, 0.71, 4.24)], 'blue', 0.6, { tone: 0.4 });
  for (let j = 0.78; j < 7.8; j += 0.65) H.line(R, [H.p(0.56, j, 1.51), H.p(0.56, j, 4.14)], 'blue', 0.6, { tone: 0.3 });
  shape(H, R, [H.p(0.25, 0.48, 4.37), H.p(11.51, 0.48, 4.37), H.p(11.51, 1.83, 4.03), H.p(0.25, 1.83, 4.03)], 'paper', 1);
  for (let i = 0.4; i < 11.5; i += 0.38) H.line(R, [H.p(i, 0.5, 4.39), H.p(i, 1.8, 4.05)], 'blue', 0.65, { tone: 0.43 });
  const pane = H.faceI(2.73, 0.73, 3.19, 2.28, 3.66);
  shape(H, R, pane, 'sun', 0.19);
  H.clip(pane, () => {
    shape(H, R, H.faceI(2.71, 0.75, 3.23, 2.28, 2.98), 'teal', 0.34);
    for (let k = 0; k < 4; k++) {
      const i = 2.83 + k * 0.84;
      shape(H, R, H.faceI(i, 0.78, 0.64, 2.62, 3.16 + (k % 2) * 0.18), k % 2 ? 'paper' : 'coral', 0.5);
      H.line(R, [H.p(i + 0.17, 0.8, 2.61), H.p(i + 0.17, 0.8, 2.29)], 'blue', 0.8);
      H.line(R, [H.p(i + 0.48, 0.8, 2.61), H.p(i + 0.48, 0.8, 2.29)], 'blue', 0.8);
    }
  });
  H.line(R, [H.p(4.32, 0.8, 2.27), H.p(4.32, 0.8, 3.67)], 'paper', 2);
  box(H, R, 2.63, 0.72, 3.39, 0.44, 2.16, 0.12, 'blue', 0.56);
  shape(H, R, H.faceI(7.91, 0.72, 2.29, 1.52, 3.87), 'blue', 0.55);
  shape(H, R, H.faceI(8.02, 0.75, 0.68, 1.56, 3.8), 'paper', 0.85);
  for (let z = 1.7; z < 3.7; z += 0.24) H.line(R, [H.p(8.06, 0.77, z), H.p(8.63, 0.77, z)], 'teal', 0.7);
  H.dot(...H.p(8.54, 0.8, 2.6), 1.5, 'sun');
  for (const i of [1.08, 3.96]) box(H, R, i, 2.73, 0.16, 0.52, 1.44, 0.53, 'blue', 0.6);
  cushion(H, R, 0.96, 2.64, 3.21, 0.81, 1.97, 0.13, 'coral');
  box(H, R, 0.96, 2.65, 3.21, 0.13, 2.09, 0.55, 'coral', 0.52);
  deckTable(H, R, 1.18, 4.26, 2.76, 1.47, 2.15, 'paper');
  bottle(H, R, ...H.p(1.58, 4.71, 2.3), 'sun', 0.63);
  cup(H, R, ...H.p(2.33, 4.6, 2.3));
  shape(H, R, H.tile(2.83, 4.52, 0.73, 0.73, 2.29), 'coral', 0.28);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(2.89 + k * 0.15, 4.55, 2.31), H.p(2.89 + k * 0.15, 5.2, 2.31)], 'blue', 0.5, { tone: 0.34 });
  deckTable(H, R, 5.74, 5.66, 1.1, 0.93, 1.99, 'sun');
  for (const i of [5.66, 8.58]) {
    H.line(R, [H.p(i, 4.39, 1.45), H.p(i, 4.39, 3.04)], 'blue', 2.6);
    H.line(R, [H.p(i - 0.35, 4.05, 1.46), H.p(i, 4.39, 2.27), H.p(i + 0.36, 4.77, 1.46)], 'blue', 1.5);
  }
  H.line(R, [H.p(5.62, 4.39, 3.04), H.p(8.62, 4.39, 3.04)], 'sun', 2.3);
  coil(H, R, 9.84, 5.87, 1.45, 0.9);
  box(H, R, 9.73, 1.89, 1.12, 1.17, 1.46, 0.57, 'teal', 0.49);
  box(H, R, 9.85, 2.02, 0.91, 0.91, 2.07, 0.09, 'sun', 0.5);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(9.84, 3.08, 1.61 + k * 0.1), H.p(10.74, 3.08, 1.61 + k * 0.1)], 'paper', 0.65);
  const [lx, ly] = H.p(0.59, 6.85, 2.87);
  oval(H, R, lx, ly, 19, 23, 'coral', 0.6);
  oval(H, R, lx, ly, 10, 13, 'paper', 1);
  for (let k = 0; k < 4; k++) {
    const a = Math.PI / 4 + (k * Math.PI) / 2;
    H.line(
      R,
      [
        [lx + Math.cos(a) * 12, ly + Math.sin(a) * 16],
        [lx + Math.cos(a) * 18, ly + Math.sin(a) * 23]
      ],
      'paper',
      3.4
    );
  }
  for (let k = 0; k < 4; k++) box(H, R, 8.02, 8.47 + k * 0.52, 2.49, 0.53, 0.12 + (3 - k) * 0.31, 0.22, 'sun', 0.39);
  for (const i of [8.13, 10.38]) H.line(R, [H.p(i, 8.15, 2.32), H.p(i, 10.79, 1.07)], 'blue', 2);
  for (const i of [1.11, 1.65]) {
    box(H, R, i, 7.37, 0.34, 0.31, 1.44, 0.51, 'blue', 0.73);
    box(H, R, i, 7.55, 0.35, 0.39, 1.44, 0.17, 'blue', 0.81);
  }
  const [fx, fy] = H.p(4.48, 2.47, 2.38);
  oval(H, R, fx, fy + 34, 12, 5, 'teal', 0.6);
  H.line(
    R,
    [
      [fx, fy + 31],
      [fx, fy + 6]
    ],
    'blue',
    2.5
  );
  oval(H, R, fx, fy, 19, 21, 'paper', 1);
  H.outline(R, ell(fx, fy, 16, 18), 'blue', 0.6);
  taiOStiltHouseDetails(H, R);
  construction(H, R);
}

function taiOStiltHouseDetails(H, R) {
  shelfUnit(H, R, 7.08, 0.89, 2.04, 0.88, 1.45, [0.11, 0.89, 1.69], 'teal');
  for (let n = 0; n < 3; n++) coiledLine(H, R, 7.47 + n * 0.55, 1.32, 1.7, 7, ['sun', 'coral', 'teal'][n]);
  shallowTray(H, R, 7.25, 1.04, 1.68, 0.6, 2.48, 'paper');
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(7.5 + n * 0.36, 1.32, 2.68);
    shape(
      H,
      R,
      [
        [x - 3, y],
        [x - 3, y - 22],
        [x + 3, y - 27],
        [x + 3, y - 1]
      ],
      'sun',
      0.5,
      0.6
    );
    H.line(
      R,
      [
        [x, y - 4],
        [x, y - 21]
      ],
      'blue',
      0.7
    );
    if (n === 1)
      H.line(
        R,
        [
          [x - 2, y - 24],
          [x + 2, y - 24]
        ],
        'teal',
        2
      );
  }
  foldedCloth(H, R, 7.29, 1.05, 1.54, 0.59, 3.28, 'paper', 'coral');
  drawerUnit(H, R, 0.8, 5.12, 1.89, 1.23, 1.01, 2, 'teal', 1.44);
  shallowTray(H, R, 0.97, 5.3, 1.51, 0.83, 2.63, 'sun');
  coiledLine(H, R, 1.45, 5.65, 2.83, 10, 'blue');
  handTool(H, R, 2.11, 5.86, 2.84, 'scissors', 'coral');
  satchel(H, R, 3.38, 7.26, 1.45, 'blue', 0.8);
  liddedTin(H, R, 4.63, 1.07, 2.34, 7, 16, 'sun');
  foldedCloth(H, R, 1.21, 2.77, 0.71, 0.44, 2.13, 'paper', 'teal');
  servicePipe(
    H,
    R,
    [
      [10.96, 1.55, 0.13],
      [10.96, 1.55, 3.97],
      [10.96, 0.77, 3.97],
      [10.13, 0.77, 3.97]
    ],
    'teal',
    2.5
  );
  for (const [i, j] of [
    [0.63, 5.41],
    [10.9, 6.87],
    [4.81, 7.99]
  ]) {
    box(H, R, i, j, 0.39, 0.3, 1.44, 0.08, 'paper', 0.82);
    H.dot(...H.p(i + 0.18, j + 0.15, 1.54), 1.3, 'blue');
  }
}

function construction(H, R) {
  for (const i of [0.62, 3.72, 7.12, 10.93]) {
    H.line(R, [H.p(i, 0.61, 1.5), H.p(i, 0.61, 4.24)], 'blue', 1.1);
    for (let n = 0; n < 5; n++) H.line(R, [H.p(i, 0.67, 1.65 + n * 0.5), H.p(i + 0.17, 0.67, 1.65 + n * 0.5)], 'sun', 1.3);
  }
  for (const [i, j] of [
    [0.65, 2.9],
    [0.65, 7.65],
    [4.12, 7.65],
    [7.34, 7.65],
    [10.93, 7.65]
  ]) {
    H.line(R, [H.p(i, j, 0.24), H.p(Math.min(i + 1.66, 11.2), j, 1.22)], 'sun', 2.4);
    H.line(R, [H.p(i, j, 1.14), H.p(Math.min(i + 1.66, 11.2), j, 0.25)], 'blue', 2);
    for (const z of [0.4, 1.13]) H.dot(...H.p(i + 0.07, j + 0.15, z), 1.4, 'paper');
  }
  for (let n = 0; n < 5; n++) {
    const j = 1.25 + n * 1.42;
    H.line(R, [H.p(0.55, j, 1.7), H.p(0.55, j, 3.95)], 'teal', 0.5);
    H.dot(...H.p(0.56, j, 3.88), 1.1, 'blue');
  }
  wallRack(H, R, 'ne', 2.68, 3.27, 2.67, 1.44, 2, 'teal', (P, z, row) => {
    for (let n = 0; n < 5; n++) {
      const [x, y] = P(0.4 + n * 0.6, z + 0.12);
      if (row) {
        shape(
          H,
          R,
          [
            [x - 5, y],
            [x + 5, y],
            [x + 5, y - 15],
            [x - 5, y - 15]
          ],
          n % 2 ? 'paper' : 'coral',
          0.7,
          0.6
        );
        oval(H, R, x, y - 15, 5, 2, 'sun', 0.6);
      } else {
        oval(H, R, x, y, 7, 3, 'paper', 1);
        H.line(
          R,
          [
            [x - 6, y],
            [x - 4, y + 7],
            [x + 4, y + 7],
            [x + 6, y]
          ],
          'teal',
          0.7
        );
      }
    }
  });
  panelFront(H, R, 0.87, 6.37, 1.74, 1.59, 0.78, 2, 'teal');
  for (const j of [2.8, 3.18]) for (let n = 0; n < 5; n++) H.line(R, [H.p(1.11 + n * 0.56, j, 2.12), H.p(1.39 + n * 0.56, j, 2.12)], 'paper', 0.6);
  hangingRail(H, R, 'nw', 4.05, 2.69, 3.45, 4, (P, u, n) => {
    const [x, y] = P(u, -0.15);
    if (n < 2) {
      H.outline(R, ell(x, y + 16, 10, 16), 'sun', 2.1);
      H.line(
        R,
        [
          [x - 8, y + 25],
          [x + 6, y + 30]
        ],
        'blue',
        1
      );
    } else {
      shape(
        H,
        R,
        [
          [x - 8, y],
          [x + 7, y - 2],
          [x + 9, y + 34],
          [x - 7, y + 37]
        ],
        'paper',
        1,
        0.7
      );
      H.line(
        R,
        [
          [x - 6, y + 26],
          [x + 8, y + 23]
        ],
        'coral',
        1.4
      );
    }
  });
  for (let n = 0; n < 5; n++) {
    const i = 8.1 + n * 0.51;
    H.line(R, [H.p(i, 8.48, 1.31), H.p(i, 10.45, 0.33)], 'blue', 0.65);
  }
  for (const j of [8.54, 9.07, 9.59, 10.11])
    H.line(R, [H.p(8.08, j, 1.32 - (j - 8.54) * 0.596), H.p(10.42, j, 1.32 - (j - 8.54) * 0.596)], 'paper', 1.2);
  const [x, y] = H.p(9.58, 5.82, 1.5);
  oval(H, R, x, y, 13, 5, 'teal', 0.5);
  shape(
    H,
    R,
    [
      [x - 13, y],
      [x + 13, y],
      [x + 10, y - 25],
      [x - 10, y - 25]
    ],
    'sun',
    0.43,
    0.7
  );
  oval(H, R, x, y - 25, 10, 4, 'blue', 0.6);
  for (let n = 0; n < 4; n++)
    H.line(
      R,
      [
        [x - 9 + n * 6, y - 23],
        [x - 9 + n * 6, y - 3]
      ],
      'paper',
      0.7
    );
  for (let n = 0; n < 7; n++) {
    const [px, py] = H.p(9.3 + n * 0.17, 6.36, 1.46);
    H.line(
      R,
      [
        [px, py],
        [px + 8, py - 6]
      ],
      'sun',
      0.8
    );
  }
}

const room = world('hong-kong-tai-o-stilt-house', 'Tai O · Beneath the floorboards', { floor: 'teal', tone: .22, wall: false, head: 24 }, house, (H, R, t) => {
  const u = cycle(t, 16);
  H.at(6.35, 6.1, 1.44, HH => actor(HH, R, 6.35, 6.1, t, 'hongKongTaiONet', { shirt: ['paper', 1], pants: ['teal', .61], hairStyle: 'short', face: 'ne', prop(h, r, p) {
    const a = h.p(5.74, 4.39, 2.98), b = h.p(8.5, 4.39, 2.98);
    net(h, r, a, b, [p.nearHand[0] + 13, p.nearHand[1] + 15], [p.farHand[0] - 13, p.farHand[1] + 15]);
    stroke(h, r, [p.farHand, [p.nearHand[0] - 7, p.nearHand[1] + 5], p.nearHand], 'sun', 1.3);
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 10, y - 2], [x + 8, y - 7], [x + 12, y - 3], [x - 8, y + 3]], 'coral', .57, .6);
    h.line(r, [[x - 6, y], [x + 7, y - 4]], 'paper', .8);
  } }, 1.44, 1.35, 'elder'));
  H.at(2.91, 3.24, 1.44, HH => actor(HH, R, 2.91, 3.24, t, 'hongKongTaiOTea', { shirt: ['teal', .62], hairStyle: 'bun', face: 'se', prop(h, r, p) { cup(h, r, p.nearHand[0] + 2, p.nearHand[1] + 4, 'sun'); } }, 1.44, 1.3, 'elder'));
  const [fx, fy] = H.p(4.48, 2.47, 2.38);
  for (let k = 0; k < 3; k++) {
    const a = u * TAU * 8 + k * TAU / 3;
    shape(H, R, [[fx, fy], [fx + Math.cos(a) * 16, fy + Math.sin(a) * 17], [fx + Math.cos(a + .8) * 12, fy + Math.sin(a + .8) * 13]], 'teal', .48, .4);
  }
  H.dot(fx, fy, 3, 'sun', 1, { knock: true });
  for (const [i, j] of [[2.7, 9.8], [6.48, 10.91]]) {
    const [x, y] = H.p(i, j, .05);
    H.outline(R, ell(x, y, 24 + Math.sin(u * TAU) * 4, 6), 'paper', .8, { tone: .64 });
  }
});

room.loopSeconds = 16;
export default room;
