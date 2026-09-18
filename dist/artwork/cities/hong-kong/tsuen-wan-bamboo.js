import { surface, timber, vessel, benchFrame, pendant } from '../materials.js';

import { shallowTray, handTool } from '../furnishings.js';
import { TAU, actor, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const test = { ...rest, lean: -10, head: 12, al: 73, ar: 77, el: 26, er: 20 };
FIGURES.clips.hongKongBambooTension = {
  dur: 16,
  keys: [
    [0, test],
    [0.12, test],
    [0.34, { ...test, lean: 1, al: 42, ar: 48, el: 63, er: 57 }],
    [0.56, { ...test, lean: 1, al: 42, ar: 48, el: 63, er: 57, head: 3 }],
    [0.75, test],
    [0.9, test],
    [1, test]
  ]
};
const teach = { ...rest, head: 4, ar: 91, er: 10, al: 22, el: 32 };
FIGURES.clips.hongKongBambooTeacher = {
  dur: 16,
  keys: [
    [0, teach],
    [0.3, { ...teach, ar: 98, er: 4 }],
    [0.55, teach],
    [0.75, { ...teach, ar: 56, er: 48 }],
    [0.9, teach],
    [1, teach]
  ]
};

function pole(H, R, a, b, radius = 4, ink = 'sun') {
  const p = H.p(...a),
    q = H.p(...b),
    dx = q[0] - p[0],
    dy = q[1] - p[1],
    length = Math.hypot(dx, dy),
    nx = (-dy / length) * radius,
    ny = (dx / length) * radius;
  shape(
    H,
    R,
    [
      [p[0] + nx, p[1] + ny],
      [q[0] + nx, q[1] + ny],
      [q[0] - nx, q[1] - ny],
      [p[0] - nx, p[1] - ny]
    ],
    ink,
    0.56,
    0.9
  );
  H.line(
    R,
    [
      [p[0] + nx * 0.4, p[1] + ny * 0.4],
      [q[0] + nx * 0.4, q[1] + ny * 0.4]
    ],
    'paper',
    0.8
  );
  const count = Math.max(2, Math.floor(length / 25));
  for (let k = 1; k < count; k++) {
    const x = p[0] + (dx * k) / count,
      y = p[1] + (dy * k) / count;
    H.line(
      R,
      [
        [x - nx * 1.08, y - ny * 1.08],
        [x + nx * 1.08, y + ny * 1.08]
      ],
      'blue',
      0.8,
      { tone: 0.62 }
    );
    H.line(
      R,
      [
        [x - nx, y - ny - 1.8],
        [x + nx, y + ny - 1.8]
      ],
      'teal',
      0.7,
      { tone: 0.5 }
    );
  }
  oval(H, R, ...q, radius, radius * 0.65, 'paper', 1);
  oval(H, R, ...q, radius * 0.55, radius * 0.3, 'blue', 0.7);
}

function binding(H, R, i, j, z, ink = 'blue') {
  const [x, y] = H.p(i, j, z);
  for (let q = 0; q < 4; q++)
    H.line(
      R,
      [
        [x - 7 + q * 3, y - 6],
        [x - 4 + q * 3, y + 6]
      ],
      ink,
      1.4,
      { tone: 0.78 }
    );
  H.line(
    R,
    [
      [x - 6, y + 4],
      [x + 8, y - 4]
    ],
    ink,
    1.1
  );
  stroke(
    H,
    R,
    [
      [x - 8, y - 7],
      [x - 11, y - 2],
      [x - 3, y + 8],
      [x + 9, y + 4]
    ],
    'sun',
    0.65
  );
  stroke(
    H,
    R,
    [
      [x + 5, y + 3],
      [x + 12, y + 8],
      [x + 15, y + 4],
      [x + 11, y + 2],
      [x + 7, y + 9],
      [x + 8, y + 17]
    ],
    ink,
    1.1
  );
}

function coil(H, R, i, j, ink = 'blue', size = 1) {
  const [x, y] = H.p(i, j, 0.035);
  for (let q = 0; q < 5; q++)
    H.outline(
      R,
      Array.from({ length: 36 }, (_, n) => [x + Math.cos((n * TAU) / 36) * (7 + q * 2) * size, y + Math.sin((n * TAU) / 36) * (3 + q) * size]),
      ink,
      1.3,
      { tone: 0.7 }
    );
  stroke(
    H,
    R,
    [
      [x + 13 * size, y + 3],
      [x + 29 * size, y + 4],
      [x + 33 * size, y + 12]
    ],
    ink,
    1.3
  );
}

const room = world(
  'hong-kong-tsuen-wan-bamboo',
  'Tsuen Wan · The knot holds',
  { floor: 'paper', tone: 0.9, wall: false, head: 75 },
  (H, R) => {
    surface(H, R, H.tile(0.05, 0.05, 11.9, 11.9, 0.02), 'paper', 1);
    for (let n = 0; n < 28; n++) {
      const i = 0.4 + (n % 7) * 1.65,
        j = 0.4 + Math.floor(n / 7) * 2.9;
      H.line(R, [H.p(i, j, 0.02), H.p(i + 0.4, j + 0.04, 0.02)], 'blue', 0.45, { tone: 0.25 });
    }
    for (const i of [0.72, 3.06])
      for (const j of [0.71, 4.45, 8.3, 11.14]) {
        timber(H, R, i - 0.18, j - 0.17, 0.4, 0.4, 0.03, 0.19, 'sun');
        pole(H, R, [i, j, 0.22], [i, j, 4.38], 4.4, 'sun');
      }
    for (const z of [1.49, 2.7, 3.67, 4.24]) for (const i of [0.72, 3.06]) pole(H, R, [i, 0.39, z], [i, 11.57, z], 3.4, 'sun');
    for (const j of [0.71, 4.45, 8.3, 11.14]) {
      pole(H, R, [0.39, j, 2.71], [3.39, j, 2.71], 3.9, 'sun');
      pole(H, R, [0.72, j, 0.38], [3.06, j, 2.71], 3.1, 'sun');
      for (const i of [0.72, 3.06]) for (const z of [1.49, 2.7, 3.67, 4.24]) binding(H, R, i, j, z);
    }
    for (let n = 0; n < 19; n++) timber(H, R, 0.69, 0.77 + n * 0.54, 2.45, 0.49, 2.75, 0.12, n === 8 ? 'teal' : 'sun');
    for (const j of [0.73, 4.44, 8.3]) pole(H, R, [0.72, j, 2.76], [0.72, j + 2.1, 4.18], 3, 'sun');
    surface(H, R, H.faceJ(0.76, 0.91, 5.42, 2.87, 4.18), 'teal', 0.1);
    H.clip(H.faceJ(0.76, 0.91, 5.42, 2.87, 4.18), () => {
      for (let n = 0; n < 15; n++) H.line(R, [H.p(0.78, 0.96 + n * 0.36, 2.9), H.p(0.78, 1.83 + n * 0.36, 4.16)], 'teal', 0.6);
    });
    for (const j of [0.82, 1.32, 1.82]) pole(H, R, [3.03, j, 4.21], [10.97, j, 3.86], 2.8, 'sun');
    for (let n = 0; n < 10; n++) {
      const i = 3.18 + n * 0.74;
      surface(
        H,
        R,
        [H.p(i, 0.65, 4.42), H.p(i + 0.72, 0.65, 4.42), H.p(i + 0.72, 2.21, 4.04), H.p(i, 2.21, 4.04)],
        n % 4 === 0 ? 'teal' : 'paper',
        0.45,
        0.4
      );
    }
    for (const [i, j] of [
      [9.08, 0.93],
      [10.97, 0.93]
    ])
      pole(H, R, [i, j, 0.12], [i, j, 4.02], 4, 'sun');
    for (const j of [2.9, 8.15]) {
      timber(H, R, 0.91, j, 1.7, 0.36, 0.03, 0.26, 'teal');
      for (let n = 0; n < 7; n++)
        pole(
          H,
          R,
          [1.05 + (n % 3) * 0.48, 2.73, 0.39 + Math.floor(n / 3) * 0.24],
          [1.05 + (n % 3) * 0.48, 8.82, 0.39 + Math.floor(n / 3) * 0.24],
          4,
          'sun'
        );
    }
    for (const i of [4.25, 7.56]) {
      for (const j of [4.77, 6.1]) pole(H, R, [i, j, 0.05], [i, 5.47, 1.02], 3.6, 'coral');
      pole(H, R, [i, 4.97, 0.33], [i, 5.92, 0.33], 2.5, 'sun');
      timber(H, R, i - 0.18, 5.13, 0.37, 0.77, 1.02, 0.13, 'teal');
    }
    pole(H, R, [3.79, 5.45, 1.18], [8.15, 5.45, 1.18], 5, 'sun');
    pole(H, R, [6.04, 4.22, 1.39], [6.04, 6.52, 1.39], 4.6, 'sun');
    binding(H, R, 6.04, 5.45, 1.42);
    for (let n = 0; n < 8; n++) H.line(R, [H.p(6.01 + n * 0.012, 5.4, 1.48), H.p(6.08 + n * 0.012, 5.6, 1.23)], 'paper', 0.5);
    benchFrame(H, R, 9.15, 2.85, 2.15, 2.13, 1.05, 'teal');
    shallowTray(H, R, 9.35, 3.07, 1.74, 1.05, 1.08, 'sun');
    for (let n = 0; n < 5; n++) coil(H, R, 9.63 + (n % 2) * 0.79, 3.38 + Math.floor(n / 2) * 0.37, n % 2 ? 'coral' : 'blue', 0.42);
    handTool(H, R, 10.11, 4.63, 1.09, 'scissors', 'coral');
    benchFrame(H, R, 9.36, 8.27, 1.95, 2.55, 0.71, 'sun');
    for (let n = 0; n < 8; n++) pole(H, R, [9.58 + n * 0.18, 8.39, 0.89], [9.58 + n * 0.18, 10.55, 0.89], 2.5, 'sun');
    for (const j of [8.79, 10.19]) binding(H, R, 10.16, j, 0.92, 'coral');
    for (let n = 0; n < 4; n++) coil(H, R, 5.1 + n * 0.69, 10.42, n % 2 ? 'blue' : 'coral', 0.72);
    vessel(H, R, 8.14, 10.65, 0.03, 13, 21, 'teal');
    pendant(H, R, 6.27, 2.77, 4.2, 3.2, 'sun', 0.95);
  },
  (H, R, t) => {
    const u = cycle(t, 16),
      tight =
        u < 0.12
          ? 0
          : u < 0.34
            ? (1 - Math.cos(((u - 0.12) / 0.22) * Math.PI)) / 2
            : u < 0.56
              ? 1
              : u < 0.75
                ? (1 + Math.cos(((u - 0.56) / 0.19) * Math.PI)) / 2
                : 0;
    actor(
      H,
      R,
      6.69,
      6.15,
      t,
      'hongKongBambooTension',
      {
        shirt: ['teal', 0.58],
        pants: ['blue', 0.74],
        hairStyle: 'short',
        face: 'nw',
        prop(HH, RR, points) {
          const joint = HH.p(6.04, 5.45, 1.45);
          for (const hand of [points.nearHand, points.farHand])
            stroke(HH, RR, [joint, [(joint[0] + hand[0]) / 2, (joint[1] + hand[1]) / 2 + 11 * (1 - tight)], hand], 'blue', 1.6);
          const [x, y] = points.nearHand;
          stroke(
            HH,
            RR,
            [
              [x, y],
              [x + 6, y + 10],
              [x + 3, y + 22]
            ],
            'blue',
            1.2
          );
        }
      },
      0,
      1.45
    );
    actor(H, R, 9.2, 5.9, t, 'hongKongBambooTeacher', { shirt: ['coral', 0.57], hairStyle: 'short', face: 'nw' }, 0, 1.3, 'elder');
    const [x, y] = H.p(0.66, 10.36, 1.45);
    stroke(
      H,
      R,
      [
        [x, y],
        [x + 6 + Math.sin(u * TAU) * 2, y + 17],
        [x + 3, y + 31]
      ],
      'blue',
      1.1
    );
  }
);

room.loopSeconds = 16;
room.stillTime = 0;
export default room;
