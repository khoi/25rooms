import { benchFrame, bentTube, branchSpray, caneChair, cushion, floorLight, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay, cabinetFrame, rackFrame, boardFloor } from '../structure.js';
import { caster } from '../joinery.js';
import { boundBook } from '../furnishings.js';
import { TAU, actor, cycle, ell, glow, shape, wallPt, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -6, al: 68, ar: 65, el: 27, er: 32, head: 12 };
const released = { ...seated, al: 43, ar: 44, el: 64, er: 64, head: -4, lean: 0 };
const high = { ...released, al: 132, el: 4, head: -13, lean: -5 };
const low = { ...released, al: 77, el: 18, head: 8, lean: -5 };
FIGURES.clips.newYorkLastChord = {
  dur: 18,
  keys: [
    [0, seated],
    [0.13, seated],
    [0.24, released],
    [0.35, high],
    [0.48, low],
    [0.62, low],
    [0.76, high],
    [0.86, released],
    [1, seated]
  ]
};
const ease = (x) => {
  const v = Math.max(0, Math.min(1, x));
  return v * v * (3 - 2 * v);
};

function glass(H, R, i, j, z, ink = 'sun') {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 5, y - 14],
      [x + 5, y - 14],
      [x + 4, y],
      [x - 4, y]
    ],
    'paper',
    0.95,
    0.6
  );
  shape(
    H,
    R,
    [
      [x - 4, y - 8],
      [x + 4, y - 8],
      [x + 3, y - 1],
      [x - 3, y - 1]
    ],
    ink,
    0.46,
    0.3
  );
  H.line(
    R,
    [
      [x - 2, y - 11],
      [x - 2, y - 2]
    ],
    'paper',
    1
  );
}

function pianoAction(H, R) {
  surface(H, R, H.faceI(3.93, 2.53, 3.94, 1.23, 1.87), 'blue', 0.84);
  for (let n = 0; n < 24; n++) {
    const i = 4.02 + n * 0.151;
    H.line(R, [H.p(i, 2.55, 1.27), H.p(i + 0.07, 2.55, 1.83)], 'sun', 0.7);
    timber(H, R, i, 2.57, 0.073, 0.075, 1.37, 0.31, 'sun');
    cushion(H, R, i - 0.016, 2.57, 0.105, 0.085, 1.65, 0.055, n % 4 ? 'paper' : 'coral');
  }
  for (const z of [1.29, 1.77]) metal(H, R, 3.99, 2.6, 3.77, 0.045, z, 0.055, 'teal');
  for (const i of [3.95, 7.81]) timber(H, R, i, 2.51, 0.09, 0.16, 1.2, 0.7, 'teal');
}

function piano(H, R) {
  for (const i of [3.76, 7.83]) for (const j of [1.1, 2.76]) caster(H, R, i, j, 0.15, 0.12, 'blue');
  timber(H, R, 3.67, 0.93, 4.54, 1.6, 0.25, 1.73, 'teal');
  surface(H, R, H.faceI(3.86, 2.55, 4.17, 0.42, 0.85), 'sun', 0.3);
  for (let n = 0; n < 19; n++) H.line(R, [H.p(4.02 + n * 0.214, 2.57, 0.45), H.p(4.1 + n * 0.214, 2.57, 0.81)], 'teal', 0.85);
  for (const i of [3.62, 7.98]) {
    timber(H, R, i, 1.03, 0.18, 1.69, 0.28, 1.79, 'teal');
    timber(H, R, i - 0.06, 1.0, 0.3, 1.77, 1.92, 0.14, 'sun');
    bentTube(
      H,
      R,
      [
        [i + 0.09, 2.98, 0.26],
        [i + 0.13, 2.94, 0.63],
        [i + 0.08, 2.82, 0.93]
      ],
      4.5,
      'teal'
    );
  }
  timber(H, R, 3.55, 0.86, 4.75, 1.79, 2.08, 0.13, 'teal');
  timber(H, R, 3.65, 0.94, 4.55, 1.63, 2.22, 0.08, 'sun');
  pianoAction(H, R);
  timber(H, R, 3.69, 2.46, 4.43, 0.78, 0.86, 0.13, 'teal');
  surface(H, R, H.tile(3.97, 2.51, 3.9, 0.61, 0.997), 'paper', 1);
  for (let n = 0; n < 28; n++) {
    const i = 3.97 + n * 0.139;
    H.line(R, [H.p(i, 2.54, 1.01), H.p(i, 3.1, 1.01)], 'blue', 0.65);
    if (![2, 6].includes(n % 7)) timber(H, R, i + 0.09, 2.52, 0.065, 0.34, 1.02, 0.036, 'blue');
  }
  for (const i of [5.47, 5.85, 6.23]) {
    bentTube(
      H,
      R,
      [
        [i, 2.55, 0.35],
        [i, 2.91, 0.24]
      ],
      2.2,
      'sun'
    );
    surface(H, R, ell(...H.p(i, 2.97, 0.245), 4.6, 2.6), 'sun', 0.75);
  }
  for (const i of [4.8, 7.09])
    bentTube(
      H,
      R,
      [
        [i, 1.36, 2.31],
        [i, 1.59, 2.88]
      ],
      1.7,
      'teal'
    );
  surface(H, R, H.faceI(4.75, 1.6, 2.48, 2.35, 3.05), 'teal', 0.6);
  surface(H, R, H.faceI(4.92, 1.62, 2.13, 2.44, 2.96), 'paper', 1);
  for (let col = 0; col < 2; col++)
    for (let n = 0; n < 5; n++) {
      const i = 5.02 + col * 1.05,
        z = 2.51 + n * 0.08;
      H.line(R, [H.p(i, 1.64, z), H.p(i + 0.83, 1.64, z)], 'blue', 0.5);
      H.dot(...H.p(i + 0.14 + (n % 3) * 0.23, 1.65, z + 0.025), 1.2, 'blue', 0.8);
    }
  for (const i of [5.56, 6.94]) for (const j of [3.37, 4.02]) timber(H, R, i, j, 0.13, 0.13, 0.03, 0.7, 'teal');
  timber(H, R, 5.44, 3.25, 1.79, 0.94, 0.71, 0.12, 'sun');
  cushion(H, R, 5.49, 3.29, 1.69, 0.83, 0.85, 0.13, 'coral');
  for (const i of [5.76, 6.39, 6.86]) H.dot(...H.p(i, 3.7, 0.99), 1.4, 'blue', 0.8);
  vessel(H, R, 7.7, 1.46, 2.31, 5, 11, 'coral');
  branchSpray(H, R, ...H.p(7.7, 1.46, 2.61), 0.43, 'teal');
}

const room = world(
  'new-york-harlem-piano',
  'Harlem · One Last Chord',
  { floor: 'paper', tone: 1, wall: false, head: 120 },
  (H, R) => {
    boardFloor(H, R, 0.04, 0.05, 11.92, 11.88, 0.025, 'sun', 0.39);
    H.tint(H.tile(0.03, 0.03, 11.94, 11.94, 0.027), 'blue', 0.49, { fine: true });
    floorLight(H, 6.22, 4.56, 92, 0.53);
    floorLight(H, 8.75, 8.08, 63, 0.67);
    masonry(H, R, 'ne', 0.07, 11.84, 0, 4.36, 'blue', 0.66);
    masonry(H, R, 'nw', 0.07, 11.84, 0, 4.36, 'blue', 0.74);
    for (const side of ['ne', 'nw'])
      for (const z of [0.13, 1.1, 4.13]) {
        const P = (u) => wallPt(H, side, u, z, -0.15);
        H.line(R, [P(0.1), P(11.9)], 'sun', 2.3);
      }
    archedBay(H, R, 'ne', 8.56, 2.72, 1.49, 2.38, 'teal', (P) => {
      surface(H, R, [P(0, 0), P(2.72, 0), P(2.72, 2.4), P(0, 2.4)], 'blue', 0.73);
      for (let n = 0; n < 7; n++) H.line(R, [P(0.23 + n * 0.34, 0.24), P(0.23 + n * 0.34, 0.5 + (n % 3) * 0.17)], 'sun', 1.4);
    });
    cabinetFrame(H, R, 0.49, 0.64, 2.16, 3.71, 0.04, 3.7, 1, 'sun', (i, j, w, d, z, h) => {
      for (let row = 0; row < 5; row++) {
        timber(H, R, i, j, w, d, z + row * 0.68, 0.08, 'sun');
        for (let n = 0; n < 5; n++)
          boundBook(H, R, i + 0.12, j + 0.1 + n * 0.65, w - 0.24, 0.52, z + 0.13 + row * 0.68, ['teal', 'paper', 'coral'][(row + n) % 3]);
      }
    });
    piano(H, R);
    surface(H, R, H.tile(3.29, 4.47, 4.24, 3.89, 0.034), 'coral', 0.25);
    for (let n = 0; n < 15; n++) H.line(R, [H.p(3.44 + n * 0.26, 8.36, 0.04), H.p(3.44 + n * 0.26, 8.62, 0.04)], 'sun', 0.9);
    for (let n = 0; n < 4; n++) {
      const j = 5.26 + n * 0.78;
      surface(H, R, H.faceJ(0.2, j, 0.58, 1.57, 2.67), 'sun', 0.38);
      surface(H, R, H.faceJ(0.22, j + 0.08, 0.42, 1.7, 2.52), 'paper', 1);
      for (let k = 0; k < 4; k++) H.line(R, [H.p(0.23, j + 0.13, 1.82 + k * 0.16), H.p(0.23, j + 0.44, 1.82 + k * 0.16)], 'teal', 0.65);
    }
    timber(H, R, 0.54, 8.34, 2.49, 2.77, 0.06, 0.45, 'teal');
    cushion(H, R, 0.59, 8.38, 2.36, 2.67, 0.56, 0.23, 'coral');
    cushion(H, R, 0.57, 8.33, 0.33, 2.71, 0.79, 0.68, 'coral');
    cushion(H, R, 0.89, 8.51, 0.83, 0.8, 0.82, 0.18, 'sun');
    benchFrame(H, R, 4.08, 9.67, 2.06, 1.33, 0.71, 'sun');
    boundBook(H, R, 4.25, 9.86, 1.29, 0.91, 0.76, 'paper');
    glass(H, R, 5.81, 10.54, 0.76, 'teal');
    caneChair(H, R, 8.37, 9.03, 'sun', true);
    cushion(H, R, 8.4, 9.14, 0.82, 0.53, 0.7, 0.14, 'coral');
    benchFrame(H, R, 8.25, 7.49, 1.54, 1.26, 0.98, 'sun');
    glass(H, R, 8.92, 8.12, 1.15, 'sun');
    vessel(H, R, 8.51, 7.75, 1.03, 5, 12, 'teal');
    for (const i of [10.59, 11.11])
      bentTube(
        H,
        R,
        [
          [i, 4.77, 0.04],
          [10.85, 4.95, 0.25],
          [10.85, 4.95, 2.89]
        ],
        2.1,
        'teal'
      );
    const [lx, ly] = H.p(10.85, 4.95, 2.86);
    surface(
      H,
      R,
      [
        [lx - 22, ly],
        [lx + 22, ly],
        [lx + 12, ly - 25],
        [lx - 12, ly - 25]
      ],
      'sun',
      0.45
    );
    H.line(
      R,
      [
        [lx - 22, ly],
        [lx + 22, ly]
      ],
      'paper',
      2.6
    );
    rackFrame(H, R, 10.0, 8.51, 1.23, 2.22, 0.04, [0.14, 0.92], 'sun', (i, j, w, d, z, row) => {
      for (let n = 0; n < 3; n++) boundBook(H, R, i + 0.08, j + 0.11 + n * 0.57, w - 0.16, 0.48, z + 0.08, row ? 'paper' : 'teal');
    });
    pendant(H, R, 5.56, 6.31, 4.45, 3.21, 'paper', 1.02);
  },
  (H, R, t) => {
    const u = cycle(t, 18),
      closed = ease((u - 0.35) / 0.13) * (1 - ease((u - 0.62) / 0.14));
    glow(H, 8.95, 1.8, 2.24, 49, 'sun');
    const angle = (1 - closed) * Math.PI,
      frontJ = 2.52 + Math.cos(angle) * 0.62,
      frontZ = 1.035 + Math.sin(angle) * 0.62;
    shape(H, R, [H.p(3.89, 2.52, 1.035), H.p(7.97, 2.52, 1.035), H.p(7.97, frontJ, frontZ), H.p(3.89, frontJ, frontZ)], 'teal', 0.73, 0.85);
    H.line(R, [H.p(4.03, frontJ, frontZ), H.p(7.83, frontJ, frontZ)], 'sun', 0.8, { tone: 0.62 });
    if (angle >= Math.PI / 2) pianoAction(H, R);
    actor(H, R, 6.35, 3.67, t, 'newYorkLastChord', { shirt: ['paper', 1], pants: ['blue', 0.79], hairStyle: 'curly', face: 'ne' }, 0.24, 1.27);
    actor(
      H,
      R,
      8.86,
      9.48,
      Math.sin(u * TAU) * 0.08,
      'sit',
      { shirt: ['teal', 0.69], pants: ['blue', 0.68], hairStyle: 'bun', face: 'nw', eyesClosed: u > 0.13 && u < 0.29 },
      0.02,
      1.22
    );
    const [x, y] = H.p(8.92, 8.12, 1.15);
    H.opacity(0.16 + Math.sin(u * TAU) * 0.02, () => H.glow(x, y - 6, 12, 10, 'sun', 0.28));
  }
);
room.loopSeconds = 18;
export default room;
