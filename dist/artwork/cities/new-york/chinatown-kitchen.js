import { benchFrame, bentTube, drape, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay, cabinetFrame, rackFrame, basin as washBasin } from '../structure.js';
import { caster } from '../joinery.js';
import { foldedCloth, handTool, shallowTray } from '../furnishings.js';
import { actor, cycle, ell, oval, shape, steam, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const fold = { ...rest, lean: -7, head: 14, al: 69, ar: 74, el: 45, er: 42 };
FIGURES.clips.newYorkDumplingInspect = {
  dur: 14,
  keys: [
    [0, fold],
    [0.12, fold],
    [0.23, { ...fold, al: 74, el: 48, ar: 79, er: 40 }],
    [0.33, fold],
    [0.44, { ...fold, al: 74, el: 48, ar: 79, er: 40 }],
    [0.56, fold],
    [0.7, { ...fold, al: 53, ar: 58, el: 93, er: 87, head: -5 }],
    [0.82, { ...fold, al: 53, ar: 58, el: 93, er: 87, head: -5 }],
    [0.96, fold],
    [1, fold]
  ]
};

function bowl(H, R, i, j, z, size = 1, ink = 'paper', content = 'teal') {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 12 * size, y - 4 * size],
      [x - 8 * size, y + 7 * size],
      [x + 7 * size, y + 7 * size],
      [x + 12 * size, y - 4 * size]
    ],
    ink,
    0.9,
    0.7
  );
  oval(H, R, x, y - 4 * size, 12 * size, 5 * size, content, 0.5);
  oval(H, R, x, y - 3 * size, 9 * size, 3 * size, content, 0.7);
}

function dumpling(H, R, x, y, size = 1) {
  shape(
    H,
    R,
    [
      [x - 8 * size, y + 2 * size],
      [x - 6 * size, y - 5 * size],
      [x, y - 9 * size],
      [x + 7 * size, y - 5 * size],
      [x + 9 * size, y + 1 * size],
      [x + 3 * size, y + 4 * size]
    ],
    'paper',
    1,
    0.65
  );
  for (let n = -2; n <= 2; n++)
    stroke(
      H,
      R,
      [
        [x + n * 2.4 * size, y - (7 - Math.abs(n)) * size],
        [x + n * 2.7 * size + 2, y - 1 * size]
      ],
      'blue',
      0.5
    );
}

function steamer(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 16 * size, y - 10 * size],
      [x - 16 * size, y + 3 * size],
      [x + 16 * size, y + 3 * size],
      [x + 16 * size, y - 10 * size]
    ],
    'sun',
    0.45,
    0.6
  );
  oval(H, R, x, y + 3 * size, 16 * size, 6 * size, 'sun', 0.5);
  oval(H, R, x, y - 10 * size, 16 * size, 6 * size, 'paper', 1);
  for (let n = -2; n <= 2; n++)
    H.line(
      R,
      [
        [x - 12 * size, y - 10 * size + n * 1.6],
        [x + 12 * size, y - 10 * size + n * 1.6]
      ],
      'teal',
      0.7,
      { tone: 0.5 }
    );
  for (let n = 0; n < 11; n++) {
    const dx = (-14 + n * 2.8) * size;
    H.line(
      R,
      [
        [x + dx, y - 8 * size],
        [x + dx + 1.2 * size, y + 3 * size]
      ],
      'coral',
      0.6
    );
  }
  H.line(
    R,
    [
      [x - 15 * size, y],
      [x + 15 * size, y]
    ],
    'sun',
    1.2
  );
  for (const dx of [-12, 12])
    H.line(
      R,
      [
        [x + dx * size, y - 6 * size],
        [x + (dx + 3) * size, y - 6 * size]
      ],
      'paper',
      1
    );
}

const room = world(
  'new-york-chinatown-kitchen',
  'Chinatown · Fold and Gather',
  { floor: 'paper', tone: 1, wall: false, head: 105 },
  (H, R) => {
    for (let n = 0; n < 14; n++)
      for (let c = 0; c < 10; c++) surface(H, R, H.tile(c * 1.2, n * 0.85, 1.16, 0.81, 0.025), 'teal', (n + c) % 5 ? 0.09 : 0.21, 0.35);
    masonry(H, R, 'ne', 0.08, 11.83, 0, 4.21, 'paper', 1);
    masonry(H, R, 'nw', 0.08, 11.83, 0, 4.21, 'teal', 0.13);
    archedBay(H, R, 'nw', 1.34, 3.12, 1.82, 2.12, 'teal', (P) => {
      for (let n = 0; n < 9; n++) H.line(R, [P(n * 0.35, 0.15), P(n * 0.35, 2.16)], 'blue', 0.85);
    });
    cabinetFrame(H, R, 0.4, 0.49, 1.72, 4.85, 0.03, 1.25, 1, 'teal', (i, j, w, d, z, h) => {
      for (let n = 0; n < 5; n++) bowl(H, R, i + w * 0.52, j + 0.5 + n * 0.85, z + 0.17, 0.63, 'paper', 'teal');
    });
    washBasin(H, R, 0.52, 1.58, 1.49, 2.11, 1.29, 'paper');
    metal(H, R, 0.28, 1.33, 0.67, 3.46, 2.77, 0.075, 'teal');
    for (const j of [1.55, 4.53]) bentTube(H, R, [[0.28, j, 2.28], [0.89, j, 2.77], [0.28, j, 2.77]], 1.8, 'blue');
    for (let n = 0; n < 6; n++) {
      const j = 1.65 + n * 0.44;
      const [x, y] = H.p(0.63, j, 2.86);
      oval(H, R, x, y - 7, 8, 11, 'paper', 1);
      oval(H, R, x, y - 7, 5, 7, 'teal', 0.22);
    }
    bentTube(H, R, [[1.14, 2.58, 1.28], [1.14, 2.58, 0.75], [1.57, 2.58, 0.62], [1.57, 2.58, 0.27], [0.34, 2.58, 0.27]], 3.4, 'paper');
    metal(H, R, 0.27, 5.28, 0.1, 1.95, 2.52, 0.08, 'sun');
    for (const j of [5.62, 6.27, 6.89]) {
      bentTube(H, R, [[0.4, j, 2.56], [0.4, j, 2.28]], 1.3, 'blue');
      const [x, y] = H.p(0.42, j, 2.07);
      oval(H, R, x, y, 7, 9, j > 6.5 ? 'paper' : 'teal', 0.7);
      for (let n = 0; n < 3; n++) H.line(R, [[x - 4, y - 3 + n * 3], [x + 4, y - 3 + n * 3]], 'blue', 0.65);
    }
    shallowTray(H, R, 0.56, 4.16, 1.4, 0.96, 1.32, 'teal');
    for (let n = 0; n < 3; n++) bowl(H, R, 1.26, 4.44, 1.43 + n * 0.11, 0.61);
    surface(H, R, H.faceI(3.04, 0.2, 3.64, 3.41, 4.02), 'blue', 0.69);
    metal(H, R, 2.94, 0.21, 3.85, 0.4, 3.38, 0.1, 'paper');
    for (let n = 0; n < 4; n++) metal(H, R, 3.08, 0.27, 3.57, 0.05, 3.83 + n * 0.047, 0.023, 'teal');
    bentTube(H, R, [[6.86, 0.26, 3.98], [6.86, 0.26, 3.49], [6.71, 0.26, 3.44]], 1.1, 'sun');
    cabinetFrame(H, R, 2.51, 0.35, 4.86, 1.15, 0.05, 3.29, 3, 'sun', (i, j, w, d, z, h, col) => {
      for (let row = 0; row < 4; row++) {
        timber(H, R, i, j, w, d, z + row * 0.77, 0.075, 'sun');
        if (col === 0)
          for (let n = 0; n < 3; n++) vessel(H, R, i + 0.24 + n * 0.41, j + 0.46, z + 0.11 + row * 0.77, 4.5, 12, row % 2 ? 'paper' : 'coral');
        else for (let n = 0; n < 3; n++) bowl(H, R, i + w * 0.5, j + 0.48, z + 0.16 + row * 0.77 + n * 0.1, 0.74);
      }
    });
    for (const i of [8.75, 11.27]) for (const j of [0.47, 1.79]) metal(H, R, i, j, 0.16, 0.16, 0.05, 1.17, 'teal');
    metal(H, R, 8.69, 0.38, 2.81, 1.66, 1.17, 0.27, 'paper');
    metal(H, R, 8.81, 0.52, 2.49, 1.32, 0.3, 0.075, 'teal');
    for (const i of [9.33, 10.67]) {
      bowl(H, R, i, 1.14, 0.44, 0.86, 'paper', 'blue');
      H.dot(...H.p(i, 2.06, 1.31), 3.4, 'coral');
    }
    bentTube(H, R, [[11.47, 0.59, 1.22], [11.61, 0.59, 0.43], [11.61, 0.2, 0.43]], 2.3, 'sun');
    for (const i of [9.58, 10.73]) {
      surface(H, R, ell(...H.p(i, 1.06, 1.48), 16, 7), 'blue', 0.8);
      steamer(H, R, i, 1.06, 1.47, 1.15);
      steamer(H, R, i, 1.06, 1.78, 1.15);
    }
    surface(
      H,
      R,
      [
        H.p(8.38, 0.16, 3.08),
        H.p(11.69, 0.16, 3.08),
        H.p(11.69, 2.49, 3.08),
        H.p(8.38, 2.49, 3.08),
        H.p(8.75, 2.04, 3.84),
        H.p(11.32, 2.04, 3.84),
        H.p(11.32, 0.55, 3.84),
        H.p(8.75, 0.55, 3.84)
      ],
      'teal',
      0.41
    );
    for (let n = 0; n < 14; n++) H.line(R, [H.p(8.73 + n * 0.194, 2.51, 3.12), H.p(8.82 + n * 0.194, 2.51, 3.39)], 'blue', 0.7);
    metal(H, R, 9.54, 0.43, 0.71, 0.7, 3.85, 0.48, 'paper');
    benchFrame(H, R, 3.12, 3.29, 5.17, 1.29, 1.09, 'teal');
    benchFrame(H, R, 3.12, 4.58, 1.33, 3.52, 1.09, 'teal');
    timber(H, R, 3.08, 3.25, 5.25, 1.37, 1.08, 0.17, 'sun');
    timber(H, R, 3.08, 4.62, 1.42, 3.54, 1.08, 0.17, 'sun');
    timber(H, R, 3.31, 3.51, 4.76, 0.86, 0.27, 0.075, 'sun');
    shallowTray(H, R, 5.8, 3.54, 1.75, 0.76, 0.38, 'paper');
    foldedCloth(H, R, 3.53, 3.61, 1.34, 0.66, 0.38, 'paper', 'coral');
    timber(H, R, 3.3, 4.78, 0.97, 3.06, 0.28, 0.075, 'sun');
    bowl(H, R, 3.81, 7.23, 0.43, 1.06, 'teal', 'paper');
    for (const j of [5.01, 7.83]) bentTube(H, R, [[3.27, j, 0.31], [4.28, j, 1.01]], 1.4, 'blue');
    surface(H, R, H.tile(3.27, 5.24, 1.01, 1.73, 1.26), 'paper', 1);
    bowl(H, R, 3.79, 4.08, 1.28, 0.83, 'paper', 'teal');
    bowl(H, R, 3.78, 7.56, 1.28, 0.66);
    shallowTray(H, R, 5.44, 3.48, 2.47, 0.88, 1.28, 'teal');
    for (let n = 0; n < 12; n++) dumpling(H, R, ...H.p(5.71 + (n % 6) * 0.36, 3.73 + Math.floor(n / 6) * 0.35, 1.38), 0.38);
    handTool(H, R, 4.11, 7.17, 1.28, 'scraper', 'coral');
    for (let n = 0; n < 5; n++) surface(H, R, ell(...H.p(3.68, 5.72, 1.29 + n * 0.012), 6, 3), 'sun', 0.18, 0.4);
    drape(H, R, 3.18, 7.12, 0.49, 1.0, 1.28, 0.47, 'paper');
    rackFrame(H, R, 0.57, 8.13, 2.62, 2.33, 0.13, [0, 1.03, 2.06, 3.09], 'teal', (i, j, w, d, z, row) => {
      shallowTray(H, R, i, j, w, d, z, 'paper');
      for (let n = 0; n < 9; n++) dumpling(H, R, ...H.p(i + 0.35 + (n % 3) * 0.79, j + 0.3 + Math.floor(n / 3) * 0.75, z + 0.12), 0.45);
    });
    for (const i of [0.57, 3.19]) for (const j of [8.13, 10.46]) caster(H, R, i, j, 0.13, 0.13, 'blue');
    benchFrame(H, R, 8.71, 9.25, 2.61, 1.62, 0.95, 'sun');
    steamer(H, R, 9.37, 9.9, 1.07, 0.7);
    steamer(H, R, 10.53, 9.91, 1.07, 0.7);
    foldedCloth(H, R, 9.01, 10.38, 1.91, 0.37, 0.99, 'paper', 'coral');
    for (let n = 0; n < 20; n++) H.line(R, [H.p(3.44 + n * 0.27, 10.89, 0.04), H.p(3.44 + n * 0.27, 11.32, 0.04)], 'blue', 1);
    timber(H, R, 8.78, 9.42, 2.4, 1.22, 0.2, 0.075, 'sun');
    for (let n = 0; n < 3; n++) shallowTray(H, R, 9.09, 9.64, 1.58, 0.74, 0.34 + n * 0.15, 'teal');
    const [lx, ly] = H.p(10.93, 9.56, 1.35);
    oval(H, R, lx, ly, 13, 15, 'sun', 0.56);
    oval(H, R, lx, ly, 9, 11, 'paper', 0.8);
    for (let n = -2; n <= 2; n++) H.line(R, [[lx - 8, ly + n * 3], [lx + 8, ly + n * 3]], 'coral', 0.65);
    H.line(R, [[lx - 4, ly], [lx - 4, ly - 4], [lx + 4, ly - 4], [lx + 4, ly]], 'teal', 1.7);
    metal(H, R, 7.73, 0.39, 0.69, 0.34, 2.27, 0.91, 'paper');
    oval(H, R, ...H.p(8.09, 0.75, 2.74), 7, 7, 'sun', 0.4);
    H.line(R, [H.p(8.09, 0.77, 2.74), H.p(8.19, 0.77, 2.85)], 'coral', 1.5);
    foldedCloth(H, R, 6.23, 3.54, 1.31, 0.5, 1.48, 'paper', 'teal');
    pendant(H, R, 6.19, 6.43, 4.29, 3.01, 'paper', 1.03);
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    actor(
      H,
      R,
      5.19,
      6.12,
      u * 14,
      'newYorkDumplingInspect',
      {
        face: 'sw',
        shirt: ['paper', 1],
        apron: ['coral', 0.7],
        hairStyle: 'bun',
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          dumpling(h, r, x - 3, y + 1, 0.83);
        }
      },
      0.03,
      1.42
    );
    actor(
      H,
      R,
      6.62,
      4.97,
      u * 14,
      'newYorkDumplingInspect',
      {
        face: 'se',
        shirt: ['teal', 0.6],
        apron: ['paper', 1],
        hairStyle: 'short',
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          shape(
            h,
            r,
            [
              [x - 4, y + 1],
              [x + 4, y + 1],
              [x + 9, y - 12],
              [x + 3, y - 14]
            ],
            'paper',
            1,
            0.55
          );
        }
      },
      0.03,
      1.31
    );
    for (const i of [9.58, 10.73]) steam(H, R, ...H.p(i, 1.06, 2.16), u * 10, 2, 'paper');
  }
);
room.loopSeconds = 14;
room.stillTime = 0;
export default room;
