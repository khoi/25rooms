import { benchFrame, bentTube, metal, slattedSeat, surface, timber, vessel } from '../materials.js';
import { boardFloor } from '../structure.js';

import { coiledLine, satchel, shallowTray } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 53, ar: 62, el: 56, er: 46, head: 5 };
const lift = { ...seated, ar: 111, er: 16, al: 83, el: 32, head: -14, lean: 2 };
FIGURES.clips.newYorkFloatCheck = {
  dur: 20,
  keys: [
    [0, seated],
    [0.18, seated],
    [0.38, lift],
    [0.53, lift],
    [0.72, seated],
    [1, seated]
  ]
};
const smooth = (x) => {
  const v = Math.max(0, Math.min(1, x));
  return v * v * (3 - 2 * v);
};

function piling(H, R, i, j) {
  const [x, y] = H.p(i + 0.21, j + 0.25, -0.04),
    [tx, ty] = H.p(i + 0.21, j + 0.25, 0.82);
  surface(
    H,
    R,
    [
      [x - 9, y],
      [x + 9, y],
      [tx + 9, ty],
      [tx - 9, ty]
    ],
    'sun',
    0.52
  );
  H.tint(
    [
      [x, y],
      [x + 9, y],
      [tx + 9, ty],
      [tx, ty]
    ],
    'blue',
    0.27,
    { fine: true }
  );
  for (let n = 0; n < 5; n++)
    stroke(
      H,
      R,
      [
        [x - 6 + n * 3, y - 2],
        [x - 5 + n * 3, y - 11],
        [tx - 6 + n * 3, ty + 3]
      ],
      'coral',
      0.65
    );
  surface(H, R, ell(tx, ty, 9, 4.5), 'paper', 1, 0.65);
  for (const r of [2, 4.5, 7]) H.outline(R, ell(tx + 1, ty, r, r * 0.45), 'coral', 0.5, { tone: 0.65 });
  H.line(
    R,
    [
      [tx, ty],
      [tx + 6, ty - 3]
    ],
    'blue',
    0.65
  );
  for (const z of [0.21, 0.65]) {
    const [a, b] = H.p(i + 0.21, j + 0.25, z);
    H.line(
      R,
      [
        [a - 9, b],
        [a, b + 3],
        [a + 9, b]
      ],
      'teal',
      2.3
    );
    H.dot(a + 3, b + 2, 1.3, 'sun');
  }
  for (let n = 0; n < 7; n++) surface(H, R, ell(x - 6 + (n % 4) * 4, y - 3 - Math.floor(n / 4) * 4, 1.7, 2.3), 'paper', 1, 0.35);
}

function bollard(H, R, i, j) {
  box(H, R, i, j, 0.67, 0.65, 0.19, 0.12, 'blue', 0.75);
  box(H, R, i + 0.22, j + 0.17, 0.24, 0.3, 0.31, 0.5, 'teal', 0.73);
  box(H, R, i + 0.05, j + 0.17, 0.6, 0.3, 0.79, 0.12, 'blue', 0.75);
  for (let n = 0; n < 3; n++) H.outline(R, ell(...H.p(i + 0.33, j + 0.33, 0.42 + n * 0.06), 10, 4), 'sun', 1.4);
}

const room = world(
  'new-york-red-hook-pier',
  'Red Hook · The Patient Line',
  { floor: 'paper', tone: 1, wall: false, head: 85 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.025), 'teal', 0.48);
    for (let n = 0; n < 35; n++) {
      const i = 0.14 + (n % 7) * 1.68,
        j = 0.29 + Math.floor(n / 7) * 2.47;
      H.line(R, [H.p(i, j, 0.04), H.p(i + 0.78, j, 0.04)], n % 3 ? 'paper' : 'sun', 0.75, { tone: 0.68 });
    }
    surface(H, R, H.faceI(0.08, 0.11, 11.84, 0.15, 2.64), 'sun', 0.14);
    surface(H, R, H.faceI(0.08, 0.14, 11.84, 0.15, 0.59), 'teal', 0.37);
    for (let n = 0; n < 11; n++) {
      const i = 0.19 + n * 1.07;
      surface(H, R, H.faceI(i, 0.18, 0.82, 0.57, 0.83 + (n % 4) * 0.16), 'coral', 0.26, 0.4);
    }
    for (const i of [7.21, 9.01])
      bentTube(
        H,
        R,
        [
          [i, 0.2, 0.7],
          [i, 0.2, 2.21],
          [i + 1.44, 0.2, 2.53],
          [i + 2.24, 0.2, 1.81]
        ],
        1.2,
        'blue'
      );
    for (const i of [0.3, 3.08, 6.19])
      for (const j of [0.82, 5.09, 9.7]) {
        piling(H, R, i, j);
        for (const dy of [-0.06, 0.11])
          bentTube(
            H,
            R,
            [
              [i + 0.2, j + dy, 0.08],
              [i + 1.02, j + dy, 0.23]
            ],
            1.3,
            'teal'
          );
      }
    for (const j of [1.05, 5.39, 10.01]) timber(H, R, 0.11, j, 6.67, 0.34, 0.13, 0.14, 'teal');
    boardFloor(H, R, 0.07, 0.57, 6.79, 10.78, 0.24, 'sun', 0.39);
    timber(H, R, 0.05, 11.31, 6.81, 0.17, 0.06, 0.32, 'teal');
    timber(H, R, 6.72, 0.57, 0.18, 10.82, 0.06, 0.32, 'teal');
    boardFloor(H, R, 6.86, 0.63, 4.54, 1.38, 0.25, 'sun', 0.38);
    timber(H, R, 6.85, 1.94, 4.6, 0.14, 0.08, 0.3, 'teal');
    for (const [i, j] of [
      [0.37, 1.03],
      [0.37, 5.14],
      [0.37, 10.61],
      [6.42, 1.04],
      [6.42, 10.55],
      [11.11, 1.01]
    ]) {
      metal(H, R, i, j, 0.13, 0.13, 0.25, 1.12, 'teal');
      surface(H, R, ell(...H.p(i + 0.06, j + 0.06, 1.4), 4, 2), 'sun', 0.69);
    }
    bentTube(
      H,
      R,
      [
        [0.44, 1.08, 1.37],
        [0.44, 10.67, 1.37]
      ],
      2.3,
      'teal'
    );
    bentTube(
      H,
      R,
      [
        [0.44, 1.08, 0.79],
        [0.44, 10.67, 0.79]
      ],
      1.2,
      'teal'
    );
    bentTube(
      H,
      R,
      [
        [6.47, 1.08, 1.37],
        [11.19, 1.08, 1.37]
      ],
      2.2,
      'teal'
    );
    for (const j of [2.19, 8.58]) {
      const [x, y] = H.p(6.96, j, 0.21);
      surface(H, R, ell(x, y, 12, 17), 'blue', 0.83);
      surface(H, R, ell(x, y, 6, 9), 'teal', 0.43);
      H.line(R, [H.p(6.59, j, 0.5), [x, y - 11]], 'sun', 1.5);
    }
    slattedSeat(H, R, 4.68, 6.22, 1.79, 0.22, 'sun', 0.59);
    slattedSeat(H, R, 1.0, 2.7, 3.38, 0.24, 'sun', 0.64);
    benchFrame(H, R, 1.28, 7.56, 2.26, 1.42, 0.96, 'teal');
    shallowTray(H, R, 1.46, 7.73, 1.9, 1.05, 1.0, 'sun');
    for (let n = 0; n < 5; n++) {
      const [x, y] = H.p(1.76 + n * 0.32, 8.15, 1.09);
      H.line(
        R,
        [
          [x, y - 5],
          [x + 3, y + 1],
          [x, y + 5],
          [x - 2, y + 1]
        ],
        n % 2 ? 'coral' : 'teal',
        1
      );
    }
    vessel(H, R, 4.13, 8.73, 0.25, 12, 20, 'paper');
    coiledLine(H, R, 2.29, 10.4, 0.25, 17, 'sun');
    satchel(H, R, 5.49, 5.43, 0.26, 'teal', 0.67);
    for (const j of [3.66, 9.85]) bollard(H, R, 6.3, j);
    bentTube(
      H,
      R,
      [
        [6.67, 4.09, 0.4],
        [7.19, 4.09, 0.52],
        [7.39, 4.09, -0.04]
      ],
      2.7,
      'teal'
    );
    bentTube(
      H,
      R,
      [
        [6.67, 5.1, 0.4],
        [7.19, 5.1, 0.52],
        [7.39, 5.1, -0.04]
      ],
      2.7,
      'teal'
    );
    for (const z of [0.12, 0.39])
      bentTube(
        H,
        R,
        [
          [7.26, 4.09, z],
          [7.26, 5.1, z]
        ],
        2,
        'teal'
      );
    for (const [i, j] of [
      [0.89, 10.83],
      [6.23, 1.12]
    ]) {
      metal(H, R, i, j, 0.14, 0.14, 0.25, 2.7, 'teal');
      const [x, y] = H.p(i + 0.07, j + 0.07, 3.0);
      surface(
        H,
        R,
        [
          [x - 8, y],
          [x + 8, y],
          [x + 5, y - 17],
          [x - 5, y - 17]
        ],
        'sun',
        0.66
      );
      H.line(
        R,
        [
          [x - 11, y - 18],
          [x + 11, y - 18]
        ],
        'teal',
        2
      );
    }
  },
  (H, R, t) => {
    const u = cycle(t, 20),
      raised = smooth((u - 0.18) / 0.2) * (1 - smooth((u - 0.53) / 0.19));
    for (let n = 0; n < 4; n++) {
      const p = cycle(t + n * 4.6, 20);
      H.opacity(Math.sin(p * Math.PI) * 0.5, () =>
        H.outline(R, ell(...H.p(8.0 + n * 0.88, 2.4 + n * 2.07, 0.045), 8 + p * 18, 2 + p * 6), 'paper', 0.9)
      );
    }
    actor(
      H,
      R,
      5.75,
      6.63,
      t,
      'newYorkFloatCheck',
      {
        shirt: ['coral', 0.64],
        pants: ['blue', 0.66],
        hairStyle: 'cap',
        face: 'se',
        prop(HH, RR, points) {
          const hand = points.nearHand,
            tip = HH.p(10.39, 5.1, 1.3 + raised * 0.76);
          const middle = [hand[0] * 0.46 + tip[0] * 0.54, hand[1] * 0.46 + tip[1] * 0.54 - 12];
          stroke(HH, RR, [[hand[0] - 12, hand[1] + 5], hand, middle, tip], 'blue', 2, 0.9);
          const [fx, fy] = HH.p(10.28 - raised * 0.22, 8.55 - raised * 0.36, 0.045);
          const bob = Math.sin(u * TAU * 3) * 1.2;
          stroke(HH, RR, [tip, [(tip[0] + fx) / 2 + 4, (tip[1] + fy) / 2], [fx, fy + bob]], 'blue', 0.65, 0.75);
          oval(HH, RR, hand[0] - 4, hand[1] + 7, 5, 5, 'teal', 0.67);
          HH.line(
            RR,
            [
              [hand[0] - 3, hand[1] + 7],
              [hand[0] + 3, hand[1] + 11]
            ],
            'blue',
            1.1
          );
          oval(HH, RR, fx, fy + bob, 3, 5, 'coral', 0.85);
          HH.line(
            RR,
            [
              [fx, fy - 7 + bob],
              [fx, fy - 4 + bob]
            ],
            'sun',
            1.5
          );
          HH.outline(RR, ell(fx, fy + 4, 12, 4), 'paper', 0.65, { tone: 0.6 });
        }
      },
      0.22,
      1.27
    );
    const [gx, gy] = H.p(5.33, 1.04, 0.23);
    oval(H, R, gx, gy - 8, 9, 5, 'paper', 1);
    oval(H, R, gx + 5, gy - 13, 4, 4, 'paper', 1);
    shape(
      H,
      R,
      [
        [gx - 6, gy - 10],
        [gx - 13, gy - 13],
        [gx - 8, gy - 5]
      ],
      'blue',
      0.53,
      0.5
    );
    H.line(
      R,
      [
        [gx - 2, gy - 4],
        [gx - 2, gy],
        [gx + 2, gy]
      ],
      'coral',
      1
    );
    H.line(
      R,
      [
        [gx + 8, gy - 13],
        [gx + 14, gy - 12]
      ],
      'sun',
      1.5
    );
    H.dot(gx + 6, gy - 14, 1, 'blue');
  }
);
room.loopSeconds = 20;
export default room;
