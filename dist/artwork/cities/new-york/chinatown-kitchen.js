import { benchFrame, drape, metal, pendant, surface, timber, vessel } from '../materials.js';
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
    shallowTray(H, R, 0.56, 4.16, 1.4, 0.96, 1.32, 'teal');
    for (let n = 0; n < 3; n++) bowl(H, R, 1.26, 4.44, 1.43 + n * 0.11, 0.61);
    cabinetFrame(H, R, 2.51, 0.35, 4.86, 1.15, 0.05, 3.29, 3, 'sun', (i, j, w, d, z, h, col) => {
      for (let row = 0; row < 4; row++) {
        timber(H, R, i, j, w, d, z + row * 0.77, 0.075, 'sun');
        if (col === 0)
          for (let n = 0; n < 3; n++) vessel(H, R, i + 0.24 + n * 0.41, j + 0.46, z + 0.11 + row * 0.77, 4.5, 12, row % 2 ? 'paper' : 'coral');
        else for (let n = 0; n < 3; n++) bowl(H, R, i + w * 0.5, j + 0.48, z + 0.16 + row * 0.77 + n * 0.1, 0.74);
      }
    });
    metal(H, R, 8.69, 0.38, 2.81, 1.66, 0.08, 1.36, 'teal');
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
export default room;
