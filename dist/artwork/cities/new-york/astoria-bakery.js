import { benchFrame, bentTube, drape, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay, cabinetFrame, rackFrame, basin as washBasin } from '../structure.js';
import { caster } from '../joinery.js';
import { foldedCloth, handTool, shallowTray, slattedCrate } from '../furnishings.js';
import { TAU, actor, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const rolling = { ...rest, lean: -11, head: 17, al: 57, ar: 66, el: 15, er: 14 };
FIGURES.clips.newYorkAstoriaRoll = {
  dur: 14,
  keys: [
    [0, rolling],
    [0.13, rolling],
    [0.26, { ...rolling, lean: -16, al: 75, ar: 81, el: 3, er: 2 }],
    [0.39, rolling],
    [0.52, { ...rolling, lean: -16, al: 75, ar: 81, el: 3, er: 2 }],
    [0.65, rolling],
    [0.81, { ...rolling, head: -3, lean: -5, al: 49, ar: 56 }],
    [0.91, { ...rolling, head: -3, lean: -5, al: 49, ar: 56 }],
    [1, rolling]
  ]
};
FIGURES.clips.newYorkAstoriaTray = {
  dur: 14,
  keys: [
    [0, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: 3 }],
    [0.54, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: -10 }],
    [0.78, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: -10 }],
    [1, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: 3 }]
  ]
};

function loaf(H, R, i, j, z, length = 18, twist = false) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y - 2, length, 7, 'sun', 0.72);
  if (twist) {
    for (let q = 0; q < 5; q++) {
      stroke(
        H,
        R,
        [
          [x - length + 4 + q * length * 0.36, y + 2],
          [x - length + 8 + q * length * 0.36, y - 5],
          [x - length + 12 + q * length * 0.36, y + 1]
        ],
        'coral',
        1.2,
        0.58
      );
    }
  } else
    for (let q = 0; q < 3; q++)
      H.line(
        R,
        [
          [x - 9 + q * 8, y - 6],
          [x - 6 + q * 8, y - 1]
        ],
        'paper',
        1.5
      );
  H.line(
    R,
    [
      [x - length + 4, y + 3],
      [x + length - 4, y + 3]
    ],
    'coral',
    0.7,
    { tone: 0.5 }
  );
}

function bowl(H, R, i, j, z, size = 13, cover = false) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - size, y - 8],
      [x - size * 0.65, y + 5],
      [x, y + 9],
      [x + size * 0.65, y + 5],
      [x + size, y - 8]
    ],
    'paper',
    1,
    0.8
  );
  oval(H, R, x, y - 8, size, 5, cover ? 'teal' : 'sun', cover ? 0.47 : 0.27);
  if (cover)
    for (let k = -2; k <= 2; k++)
      H.line(
        R,
        [
          [x + k * 5 - 3, y - 11],
          [x + k * 5 + 3, y - 3]
        ],
        'paper',
        0.8
      );
}

const room = world(
  'new-york-astoria-bakery',
  'Astoria · A Twist Before Breakfast',
  { floor: 'paper', tone: 1, wall: false, head: 95 },
  (H, R) => {
    for (let r = 0; r < 15; r++)
      for (let c = 0; c < 15; c++)
        surface(H, R, H.tile(c * 0.8, r * 0.8, 0.76, 0.76, 0.02), (r + c) % 2 ? 'paper' : 'teal', (r + c) % 2 ? 1 : 0.12, 0.4);
    masonry(H, R, 'nw', 0.08, 11.82, 0, 3.89, 'paper', 1);
    masonry(H, R, 'ne', 0.08, 11.82, 0, 3.9, 'coral', 0.22);
    archedBay(H, R, 'ne', 6.09, 4.83, 1.6, 2.13, 'teal', (P) => {
      for (let n = 0; n < 8; n++)
        surface(
          H,
          R,
          [P(0.16 + n * 0.6, 0.15), P(0.56 + n * 0.6, 0.15), P(0.56 + n * 0.6, 0.42 + (n % 3) * 0.13), P(0.16 + n * 0.6, 0.42 + (n % 3) * 0.13)],
          'coral',
          0.32,
          0.4
        );
    });
    metal(H, R, 0.59, 0.63, 3.4, 2.51, 0.04, 2.9, 'paper');
    metal(H, R, 0.68, 0.66, 3.22, 2.34, 2.96, 0.18, 'teal');
    for (let row = 0; row < 3; row++) {
      const z = 0.4 + row * 0.8;
      surface(H, R, H.faceI(0.79, 3.17, 2.98, z, z + 0.52), 'blue', 0.8);
      surface(H, R, H.faceI(0.95, 3.18, 2.63, z + 0.1, z + 0.41), 'coral', 0.28);
      bentTube(
        H,
        R,
        [
          [1.09, 3.3, z + 0.49],
          [3.53, 3.3, z + 0.49]
        ],
        2.7,
        'teal'
      );
      for (const i of [1.1, 3.46]) metal(H, R, i, 3.22, 0.13, 0.12, z - 0.03, 0.1, 'teal');
    }
    surface(
      H,
      R,
      [
        H.p(0.55, 0.52, 3.18),
        H.p(4.14, 0.52, 3.18),
        H.p(4.14, 3.44, 3.18),
        H.p(0.55, 3.44, 3.18),
        H.p(0.93, 3.04, 3.8),
        H.p(3.75, 3.04, 3.8),
        H.p(3.75, 0.91, 3.8),
        H.p(0.93, 0.91, 3.8)
      ],
      'teal',
      0.46
    );
    bentTube(
      H,
      R,
      [
        [2.22, 1.53, 3.71],
        [2.22, 1.53, 4.25]
      ],
      10,
      'paper'
    );
    cabinetFrame(H, R, 4.34, 0.38, 1.59, 1.35, 0.03, 3.25, 1, 'sun', (i, j, w, d, z, h) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 0.94, 0.1, 'sun');
        for (let n = 0; n < 2; n++) vessel(H, R, i + 0.29 + n * 0.64, j + 0.54, z + 0.14 + row * 0.94, 7, 17, row ? 'paper' : 'teal');
      }
    });
    benchFrame(H, R, 4.52, 4.52, 3.1, 2.81, 1.05, 'sun');
    timber(H, R, 4.47, 4.48, 3.2, 2.89, 1.02, 0.19, 'sun');
    surface(H, R, H.tile(5.82, 4.83, 1.58, 1.87, 1.224), 'paper', 1, 0.4);
    drape(H, R, 4.63, 5.8, 0.68, 1.49, 1.23, 0.5, 'paper');
    bowl(H, R, 5.07, 4.98, 1.24, 12);
    bowl(H, R, 5.29, 6.81, 1.24, 10, true);
    loaf(H, R, 6.39, 7.01, 1.25, 14, true);
    handTool(H, R, 7.18, 6.9, 1.24, 'scraper', 'teal');
    for (let n = 0; n < 13; n++) H.dot(...H.p(6.1 + (n % 4) * 0.29, 5.12 + Math.floor(n / 4) * 0.27, 1.23), 0.75, 'sun', 0.5);
    rackFrame(H, R, 0.55, 7.66, 2.85, 2.73, 0.19, [0, 0.91, 1.82, 2.73], 'teal', (i, j, w, d, z, row) => {
      shallowTray(H, R, i, j, w, d, z, 'paper');
      for (let n = 0; n < 4; n++) loaf(H, R, i + 0.39 + (n % 2) * 1.5, j + 0.39 + Math.floor(n / 2) * 1.49, z + 0.12, 11, row % 2 === 0);
    });
    for (const i of [0.59, 3.35]) for (const j of [7.7, 10.35]) caster(H, R, i, j, 0.17, 0.14, 'blue');
    benchFrame(H, R, 8.55, 9.12, 2.78, 1.72, 0.9, 'teal');
    shallowTray(H, R, 8.73, 9.31, 1.92, 1.13, 0.94, 'paper');
    for (let n = 0; n < 3; n++) loaf(H, R, 9.05 + n * 0.6, 9.81, 1.06, 8, true);
    slattedCrate(H, R, 8.77, 9.44, 2.07, 1.15, 0.03, 0.49, 'sun');
    foldedCloth(H, R, 10.75, 9.35, 0.45, 1.23, 0.94, 'paper', 'coral');
    rackFrame(H, R, 0.45, 3.76, 2.74, 1.52, 0.02, [0.12, 1.19], 'teal', (i, j, w, d, z, row) => {
      if (row) washBasin(H, R, i, j, w, d, z, 'paper');
      else for (let n = 0; n < 3; n++) vessel(H, R, i + 0.42 + n * 0.8, j + 0.58, z, 9, 19, 'teal');
    });
    pendant(H, R, 7.63, 6.12, 4.15, 3.0, 'paper', 1.1);
    for (const i of [3.65, 4.1])
      bentTube(
        H,
        R,
        [
          [i, 0.46, 0.15],
          [i, 0.46, 2.93]
        ],
        2,
        'sun'
      );
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    H.at(7.84, 5.65, 0, (HH) =>
      actor(
        HH,
        R,
        7.84,
        5.65,
        u * 14,
        'newYorkAstoriaRoll',
        {
          face: 'sw',
          shirt: ['paper', 1],
          sleeve: ['paper', 1],
          apron: ['teal', 0.68],
          hairStyle: 'bun',
          skin: ['coral', 0.47],
          prop(h, r, p) {
            const x = (p.nearHand[0] + p.farHand[0]) / 2,
              y = (p.nearHand[1] + p.farHand[1]) / 2 + 3;
            oval(h, r, x, y, 22, 5.2, 'sun', 0.4);
            h.line(
              r,
              [
                [x - 18, y + 2],
                [x + 18, y + 2]
              ],
              'coral',
              0.75,
              { tone: 0.36 }
            );
            for (const hand of [p.nearHand, p.farHand]) oval(h, r, hand[0], hand[1], 3.1, 2.2, 'coral', 0.43);
          }
        },
        0,
        1.43
      )
    );
    H.at(4.32, 8.54, 0, (HH) =>
      actor(
        HH,
        R,
        4.32,
        8.54,
        u * 14,
        'newYorkAstoriaTray',
        {
          shirt: ['coral', 0.65],
          apron: ['paper', 1],
          hairStyle: 'short',
          skin: ['coral', 0.59],
          prop(h, r, p) {
            const x = (p.nearHand[0] + p.farHand[0]) / 2,
              y = (p.nearHand[1] + p.farHand[1]) / 2 + 2;
            shape(
              h,
              r,
              [
                [x - 27, y - 6],
                [x + 17, y - 3],
                [x + 26, y + 8],
                [x - 19, y + 7]
              ],
              'teal',
              0.63,
              0.8
            );
            for (let k = 0; k < 3; k++) oval(h, r, x - 13 + k * 13, y, 5.4, 3.6, 'sun', 0.68);
            h.line(
              r,
              [
                [x - 19, y + 7],
                [x + 26, y + 8]
              ],
              'blue',
              1.4
            );
          }
        },
        0,
        1.3
      )
    );
    const [x, y] = H.p(10.55, 0.15, 2.85);
    stroke(
      H,
      R,
      [
        [x, y - 14],
        [x + Math.sin(u * TAU) * 2, y - 3]
      ],
      'blue',
      0.7
    );
    oval(H, R, x + Math.sin(u * TAU) * 2, y, 3, 4, 'sun', 0.72);
  }
);

room.loopSeconds = 14;
export default room;
