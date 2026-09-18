import { surface, timber, metal, bentTube, pendant, cushion, vessel, drape } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { windowBay } from '../joinery.js';
import { shallowTray, foldedCloth, coiledLine, handTool } from '../furnishings.js';
import { TAU, actor, bottle, box, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 17, al: 52, el: 39, ar: 62, er: 33 };
const tension = { ...seated, lean: 2, al: 77, el: 22, ar: 87, er: 17, head: 10 };
FIGURES.clips.hongKongTaiONet = {
  dur: 16,
  keys: [
    [0, seated],
    [0.13, seated],
    [0.29, { ...seated, ar: 68, er: 24 }],
    [0.39, seated],
    [0.54, tension],
    [0.72, tension],
    [0.87, seated],
    [1, seated]
  ]
};
const tea = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, el: 54, ar: 40, er: 87, head: 8 };
FIGURES.clips.hongKongTaiOTea = {
  dur: 16,
  keys: [
    [0, tea],
    [0.26, tea],
    [0.41, { ...tea, ar: 53, er: 118, head: -5 }],
    [0.57, { ...tea, ar: 53, er: 118, head: -5 }],
    [0.73, tea],
    [1, tea]
  ]
};

function net(H, R, a, b, c, d, ink = 'teal') {
  const lerp = (p, q, v) => [p[0] + (q[0] - p[0]) * v, p[1] + (q[1] - p[1]) * v];
  const sample = (u, v) => lerp(lerp(a, b, u), lerp(d, c, u), v);
  for (let n = 0; n <= 10; n++) {
    const u = n / 10;
    H.line(R, [sample(u, 0), sample(u, 1)], ink, 0.65, { tone: 0.76 });
  }
  for (let n = 0; n <= 7; n++) {
    const v = n / 7;
    H.line(R, [sample(0, v), sample(1, v)], ink, 0.65, { tone: 0.76 });
  }
  H.outline(R, [a, b, c, d], 'blue', 1, { tone: 0.65 });
  for (const u of [0.2, 0.5, 0.8]) for (const v of [0.28, 0.71]) H.dot(...sample(u, v), 1.2, 'sun', 0.86);
}

function coil(H, R, i, j, z, s = 1) {
  const [x, y] = H.p(i, j, z);
  for (let k = 0; k < 5; k++) H.outline(R, ell(x, y, (7 + k * 3.4) * s, (3 + k * 1.5) * s), 'sun', 1.5, { tone: 0.7 });
  stroke(
    H,
    R,
    [
      [x + 20 * s, y],
      [x + 32 * s, y + 3],
      [x + 37 * s, y + 13]
    ],
    'sun',
    1.6
  );
}

function cup(H, R, x, y, ink = 'paper') {
  shape(
    H,
    R,
    [
      [x - 5, y - 9],
      [x + 5, y - 9],
      [x + 4, y + 1],
      [x - 4, y + 1]
    ],
    ink,
    ink === 'paper' ? 1 : 0.62,
    0.55
  );
  oval(H, R, x, y - 9, 5, 2, 'paper', 1);
  stroke(
    H,
    R,
    [
      [x + 5, y - 7],
      [x + 10, y - 7],
      [x + 9, y - 1],
      [x + 4, y]
    ],
    'blue',
    0.7
  );
}

function deckTable(H, R, i, j, w, d, z, ink) {
  for (const x of [i + 0.1, i + w - 0.2]) for (const y of [j + 0.1, j + d - 0.2]) box(H, R, x, y, 0.12, 0.12, 1.44, z - 1.44, 'blue', 0.6);
  box(H, R, i, j, w, d, z, 0.12, ink, 0.59);
}

const room = world(
  'hong-kong-tai-o-stilt-house',
  'Tai O · Beneath the floorboards',
  { floor: 'teal', tone: 0.28, wall: false, head: 95 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'teal', 0.28);
    for (let n = 0; n < 30; n++) {
      const i = 0.2 + (n % 6) * 1.92,
        j = 0.24 + Math.floor(n / 6) * 2.61;
      H.line(R, [H.p(i, j, 0.04), H.p(i + 0.67, j, 0.04)], 'paper', 0.9);
    }
    for (const i of [0.62, 5.83, 10.98])
      for (const j of [0.83, 4.17, 8.07]) {
        timber(H, R, i, j, 0.24, 0.27, 0.03, 1.34, 'teal');
        metal(H, R, i - 0.03, j - 0.02, 0.3, 0.31, 0.24, 0.11, 'blue');
      }
    for (const j of [0.88, 4.26, 8.17]) timber(H, R, 0.4, j, 10.98, 0.22, 1.12, 0.23, 'sun');
    for (const i of [0.69, 5.94])
      bentTube(
        H,
        R,
        [
          [i, 8.2, 0.17],
          [i + 4.92, 8.2, 1.29]
        ],
        3.5,
        'sun'
      );
    timber(H, R, 0.39, 0.58, 10.98, 7.83, 1.3, 0.12, 'sun');
    boardFloor(H, R, 0.44, 0.65, 10.87, 7.72, 1.44, 'sun', 0.37);
    masonry(H, R, 'nw', 0.55, 7.59, 1.44, 3.04, 'paper');
    surface(H, R, H.faceI(0.42, 0.57, 10.98, 1.44, 4.75), 'teal', 0.24);
    for (let n = 0; n < 21; n++) H.line(R, [H.p(0.5 + n * 0.52, 0.61, 1.46), H.p(0.5 + n * 0.52, 0.61, 4.68)], 'blue', 0.65, { tone: 0.38 });
    windowBay(H, R, 'ne', 1.04, 4.82, 2.47, 1.81, {
      ink: 'sun',
      divisions: 4,
      view(P) {
        surface(H, R, [P(0.14, 0.14), P(4.68, 0.14), P(4.68, 0.77), P(0.14, 0.77)], 'teal', 0.29);
        for (let n = 0; n < 5; n++)
          surface(
            H,
            R,
            [P(0.2 + n * 0.91, 0.65), P(0.94 + n * 0.91, 0.65), P(0.94 + n * 0.91, 1.16 + (n % 2) * 0.27), P(0.2 + n * 0.91, 1.16 + (n % 2) * 0.27)],
            n % 2 ? 'paper' : 'coral',
            0.34,
            0.5
          );
      }
    });
    surface(H, R, H.faceI(8.05, 0.62, 2.45, 1.46, 4.38), 'blue', 0.72);
    for (let n = 0; n < 6; n++) timber(H, R, 8.13 + n * 0.39, 0.68, 0.34, 0.15, 1.5, 2.79, 'paper');
    bentTube(
      H,
      R,
      [
        [10.16, 0.85, 2.43],
        [10.16, 0.85, 2.88]
      ],
      2,
      'teal'
    );
    for (let n = 0; n < 17; n++)
      surface(
        H,
        R,
        [H.p(0.24 + n * 0.66, 0.4, 4.88), H.p(0.88 + n * 0.66, 0.4, 4.88), H.p(0.88 + n * 0.66, 2.06, 4.37), H.p(0.24 + n * 0.66, 2.06, 4.37)],
        n % 5 === 0 ? 'teal' : 'paper',
        0.75,
        0.45
      );
    for (const i of [0.55, 5.86, 11.12]) timber(H, R, i, 0.67, 0.18, 0.22, 1.45, 3.28, 'sun');
    for (const j of [1.09, 3.37, 6.96]) timber(H, R, 0.57, j, 0.19, 0.18, 1.46, 2.98, 'sun');
    timber(H, R, 0.56, 0.86, 0.25, 6.49, 4.33, 0.13, 'sun');
    cabinetFrame(H, R, 0.76, 5.46, 1.17, 2.2, 1.47, 1.39, 1, 'teal', (i, j, w, d, z) => {
      timber(H, R, i, j, w, d, z + 0.6, 0.1, 'sun');
      foldedCloth(H, R, i + 0.06, j + 0.14, w - 0.12, d - 0.28, z + 0.11, 'paper', 'coral');
      coiledLine(H, R, i + w / 2, j + d / 2, z + 0.75, 12, 'sun');
    });
    vessel(H, R, 1.25, 6.65, 2.94, 16, 13, 'paper');
    bentTube(H, R, [[0.71, 5.65, 1.49], [0.71, 5.65, 3.41], [1.15, 5.65, 3.41], [1.15, 5.91, 3.25]], 1.9, 'teal');
    timber(H, R, 0.72, 2.69, 0.87, 2.44, 3.49, 0.12, 'sun');
    for (let n = 0; n < 3; n++) {
      const j = 3.02 + n * 0.68;
      bottle(H, R, ...H.p(1.08, j, 3.62), n % 2 ? 'sun' : 'teal', 0.39);
    }
    for (const j of [2.83, 4.84]) bentTube(H, R, [[0.72, j, 3.02], [1.5, j, 3.46]], 1.5, 'sun');
    drape(H, R, 0.74, 4.44, 0.69, 0.31, 3.62, 0.64, 'paper');
    surface(H, R, H.faceJ(0.83, 1.06, 1.21, 2.74, 3.88), 'paper', 0.92);
    surface(H, R, H.faceJ(0.85, 1.17, 0.99, 2.88, 3.74), 'teal', 0.25);
    for (let n = 0; n < 3; n++) {
      const [x, y] = H.p(0.87, 1.35 + n * 0.31, 3.24);
      oval(H, R, x, y - 6, 4, 5, 'sun', 0.8);
      shape(H, R, [[x - 6, y], [x + 6, y], [x + 8, y + 12], [x - 8, y + 12]], n % 2 ? 'coral' : 'teal', 0.63, 0.4);
    }
    cabinetFrame(H, R, 0.75, 1.07, 3.52, 1.09, 1.51, 0.69, 3, 'teal', (i, j, w, d, z, h, n) => {
      foldedCloth(H, R, i + 0.08, j + 0.1, w - 0.16, d - 0.2, z + 0.1, 'paper', n % 2 ? 'sun' : 'coral');
    });
    cushion(H, R, 0.81, 1.1, 3.4, 1.01, 2.23, 0.16, 'coral');
    deckTable(H, R, 1.82, 3.21, 2.15, 1.4, 2.13, 'sun');
    for (const i of [1.98, 3.68]) bentTube(H, R, [[i, 3.33, 1.55], [i, 4.49, 2.02]], 1.3, 'teal');
    shallowTray(H, R, 2.68, 3.31, 1.13, 0.72, 2.27, 'teal');
    const [kx, ky] = H.p(3.08, 3.65, 2.4);
    oval(H, R, kx, ky - 8, 11, 10, 'paper', 1);
    oval(H, R, kx, ky - 17, 8, 3, 'sun', 0.67);
    stroke(H, R, [[kx - 7, ky - 15], [kx - 12, ky - 29], [kx + 7, ky - 29], [kx + 10, ky - 14]], 'blue', 1.7);
    shape(H, R, [[kx + 8, ky - 11], [kx + 19, ky - 18], [kx + 18, ky - 12], [kx + 10, ky - 3]], 'paper', 1, 0.6);
    cup(H, R, ...H.p(2.26, 3.63, 2.16), 'paper');
    cup(H, R, ...H.p(3.36, 3.79, 2.16), 'sun');
    bottle(H, R, ...H.p(3.59, 3.46, 2.18), 'paper', 0.55);
    const [fx, fy] = H.p(4.48, 2.47, 2.38);
    H.outline(R, ell(fx, fy, 20, 21), 'blue', 1.4);
    H.outline(R, ell(fx, fy, 17, 18), 'paper', 0.8);
    bentTube(
      H,
      R,
      [
        [4.48, 2.47, 1.45],
        [4.48, 2.47, 2.38]
      ],
      2.2,
      'teal'
    );
    for (let n = 0; n < 10; n++) {
      const a = (n * TAU) / 10;
      H.line(
        R,
        [
          [fx, fy],
          [fx + Math.cos(a) * 19, fy + Math.sin(a) * 20]
        ],
        'blue',
        0.5,
        { tone: 0.45 }
      );
    }
    for (const i of [5.74, 8.5]) timber(H, R, i, 4.39, 0.11, 0.14, 1.44, 1.6, 'teal');
    bentTube(
      H,
      R,
      [
        [5.74, 4.39, 2.98],
        [8.5, 4.39, 2.98]
      ],
      2.4,
      'sun'
    );
    for (const i of [5.74, 8.5]) {
      timber(H, R, i - 0.43, 4.07, 0.96, 0.65, 1.44, 0.12, 'sun');
      bentTube(H, R, [[i - 0.34, 4.18, 1.6], [i, 4.39, 2.39]], 1.5, 'teal');
      metal(H, R, i - 0.05, 4.32, 0.22, 0.24, 2.79, 0.11, 'paper');
    }
    for (let n = 0; n < 6; n++) {
      const [x, y] = H.p(5.85 + n * 0.49, 4.39, 2.96);
      H.outline(R, ell(x, y, 3.5, 5), 'sun', 1.4);
    }
    net(H, R, H.p(8.58, 4.39, 2.97), H.p(10.59, 4.39, 2.72), H.p(10.12, 5.31, 1.53), H.p(8.53, 5.13, 1.7));
    cushion(H, R, 5.83, 5.8, 1.08, 1.06, 2.04, 0.1, 'sun');
    for (const i of [5.91, 6.76]) for (const j of [5.88, 6.72]) timber(H, R, i, j, 0.12, 0.12, 1.44, 0.59, 'teal');
    cabinetFrame(H, R, 9.56, 6.1, 1.63, 1.72, 1.48, 0.74, 1, 'teal', (i, j, w, d, z) => {
      coiledLine(H, R, i + w * 0.5, j + d * 0.5, z + 0.15, 17, 'sun');
    });
    shallowTray(H, R, 9.67, 6.22, 1.4, 1.43, 2.25, 'paper');
    for (const i of [9.97, 10.56]) {
      vessel(H, R, i, 6.67, 2.46, 7, 14, 'sun', false);
      H.line(R, [H.p(i, 6.67, 2.83), H.p(i, 6.67, 3.03)], 'blue', 1.2);
    }
    surface(H, R, H.tile(9.81, 7.01, 0.84, 0.12, 2.51), 'coral', 0.66);
    surface(H, R, H.tile(10.02, 7.22, 0.87, 0.12, 2.51), 'sun', 0.65);
    handTool(H, R, 10.07, 6.79, 2.44, 'scissors', 'coral');
    for (let n = 0; n < 4; n++) {
      timber(H, R, 4.69, 8.46 + n * 0.56, 2.3, 0.55, 1.05 - n * 0.29, 0.28, 'sun');
    }
    for (const i of [4.65, 7.02])
      bentTube(
        H,
        R,
        [
          [i, 8.41, 2.22],
          [i, 10.62, 0.95]
        ],
        2,
        'teal'
      );
    for (const i of [1.28, 8.72]) {
      coil(H, R, i, 7.52, 1.46, 0.85);
    }
    for (const j of [2.56, 5.32, 7.97]) timber(H, R, 11.03, j, 0.14, 0.14, 1.44, 1.23, 'teal');
    for (const z of [1.83, 2.63]) timber(H, R, 11.03, 2.57, 0.14, 5.53, z, 0.11, 'sun');
    const [rx, ry] = H.p(11.14, 3.38, 2.12);
    H.outline(R, ell(rx, ry, 18, 21), 'paper', 7);
    for (let n = 0; n < 4; n++) {
      const a = n * TAU / 4;
      H.line(R, [[rx + Math.cos(a) * 14, ry + Math.sin(a) * 17], [rx + Math.cos(a) * 21, ry + Math.sin(a) * 24]], 'coral', 4);
    }
    bentTube(H, R, [[10.83, 0.75, 4.74], [11.32, 0.95, 4.61], [11.32, 0.95, 0.34]], 2.7, 'teal');
    for (const j of [0.89, 4.31, 8.18]) metal(H, R, 5.74, j, 0.4, 0.22, 1.04, 0.36, 'paper');
    pendant(H, R, 7.23, 2.92, 4.71, 3.76, 'sun', 0.9);
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    H.at(6.35, 6.1, 1.44, (HH) =>
      actor(
        HH,
        R,
        6.35,
        6.1,
        t,
        'hongKongTaiONet',
        {
          shirt: ['paper', 1],
          pants: ['teal', 0.61],
          hairStyle: 'short',
          face: 'ne',
          prop(h, r, p) {
            const a = h.p(5.74, 4.39, 2.98),
              b = h.p(8.5, 4.39, 2.98);
            net(h, r, a, b, [p.nearHand[0] + 13, p.nearHand[1] + 15], [p.farHand[0] - 13, p.farHand[1] + 15]);
            stroke(h, r, [p.farHand, [p.nearHand[0] - 7, p.nearHand[1] + 5], p.nearHand], 'sun', 1.3);
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 10, y - 2],
                [x + 8, y - 7],
                [x + 12, y - 3],
                [x - 8, y + 3]
              ],
              'coral',
              0.57,
              0.6
            );
            h.line(
              r,
              [
                [x - 6, y],
                [x + 7, y - 4]
              ],
              'paper',
              0.8
            );
          }
        },
        1.44,
        1.35,
        'elder'
      )
    );
    H.at(2.91, 3.24, 1.44, (HH) =>
      actor(
        HH,
        R,
        2.91,
        3.24,
        t,
        'hongKongTaiOTea',
        {
          shirt: ['teal', 0.62],
          hairStyle: 'bun',
          face: 'se',
          prop(h, r, p) {
            cup(h, r, p.nearHand[0] + 2, p.nearHand[1] + 4, 'sun');
          }
        },
        1.44,
        1.3,
        'elder'
      )
    );
    const [fx, fy] = H.p(4.48, 2.47, 2.38);
    for (let k = 0; k < 3; k++) {
      const a = u * TAU * 8 + (k * TAU) / 3;
      shape(
        H,
        R,
        [
          [fx, fy],
          [fx + Math.cos(a) * 16, fy + Math.sin(a) * 17],
          [fx + Math.cos(a + 0.8) * 12, fy + Math.sin(a + 0.8) * 13]
        ],
        'teal',
        0.48,
        0.4
      );
    }
    H.dot(fx, fy, 3, 'sun', 1, { knock: true });
    for (const [i, j] of [
      [2.7, 9.8],
      [6.48, 10.91]
    ]) {
      const [x, y] = H.p(i, j, 0.05);
      H.outline(R, ell(x, y, 24 + Math.sin(u * TAU) * 4, 6), 'paper', 0.8, { tone: 0.64 });
    }
  }
);

room.loopSeconds = 16;
room.stillTime = 0;
export default room;
