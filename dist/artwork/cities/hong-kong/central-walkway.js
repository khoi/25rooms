import { floorLight, surface, metal, vessel, bentTube, slattedSeat } from '../materials.js';
import { rackFrame } from '../structure.js';
import { caster } from '../joinery.js';
import { foldedCloth, coiledLine } from '../furnishings.js';
import { TAU, actor, cycle, shape, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, head: -7, lean: 2, al: 52, ar: 117, el: 55, er: 9 };
FIGURES.clips.hongKongWalkwayGlass = {
  dur: 16,
  keys: [
    [0, ready],
    [0.15, ready],
    [0.36, { ...ready, ar: 89, er: 16, al: 59, el: 35, head: 7, lean: -5 }],
    [0.55, { ...ready, ar: 89, er: 16, al: 59, el: 35, head: 7, lean: -5 }],
    [0.73, ready],
    [0.87, { ...ready, head: -14 }],
    [1, ready]
  ]
};

function tower(H, R, i, j, w, z, h, ink, n) {
  shape(H, R, H.faceI(i, j, w, z, z + h), ink, 0.52, 0.5);
  for (let q = 0; q < n; q++)
    for (let row = 0; row < 5; row++) {
      shape(
        H,
        R,
        H.faceI(i + 0.09 + (q * (w - 0.14)) / n, j + 0.01, 0.11, z + 0.13 + (row * h) / 5, z + 0.2 + (row * h) / 5),
        (q + row) % 3 ? 'sun' : 'paper',
        0.62,
        0.2
      );
    }
}

const room = world(
  'hong-kong-central-walkway',
  'Central · A clear pane at midnight',
  { floor: 'paper', tone: 1, wall: false, head: 90 },
  (H, R) => {
    const view = H.faceI(0.12, 0.18, 11.76, 0.2, 3.83);
    surface(H, R, view, 'blue', 0.85);
    H.clip(view, () => {
      for (let n = 0; n < 7; n++) tower(H, R, 0.18 + n * 1.73, 0.22, 1.47, 0.3, 1.9 + (n % 3) * 0.59, n % 2 ? 'blue' : 'teal', 5);
      for (let n = 0; n < 18; n++) H.line(R, [H.p(0.3 + n * 0.64, 0.26, 0.43), H.p(0.57 + n * 0.64, 0.26, 0.43)], 'coral', 1.7);
    });
    for (let n = 0; n < 12; n++)
      for (let c = 0; c < 7; c++) surface(H, R, H.tile(c * 1.71, n * 0.99, 1.67, 0.95, 0.025), 'blue', (n + c) % 5 ? 0.09 : 0.17, 0.35);
    H.tint(H.tile(0.03, 0.03, 11.94, 11.94, 0.027), 'blue', 0.31, { fine: true });
    floorLight(H, 6.9, 6.52, 91, 0.37);
    for (const j of [0.49, 3.13, 8.28]) {
      for (const i of [0.15, 11.48]) {
        metal(H, R, i, j, 0.32, 0.36, 0.02, 3.8, 'paper');
        metal(H, R, i - 0.07, j - 0.07, 0.46, 0.5, 0.03, 0.15, 'teal');
      }
      for (const z of [3.68, 4.3]) metal(H, R, 0.18, j, 11.65, 0.22, z, 0.12, 'paper');
      for (let n = 0; n < 10; n++)
        bentTube(
          H,
          R,
          [
            [0.31 + n * 1.12, j + 0.12, 3.8],
            [0.87 + n * 1.12, j + 0.12, 4.3],
            [1.43 + n * 1.12, j + 0.12, 3.8]
          ],
          1.7,
          'teal'
        );
    }
    for (const i of [0.23, 11.6]) {
      metal(H, R, i, 0.46, 0.18, 7.99, 4.35, 0.12, 'teal');
      bentTube(
        H,
        R,
        [
          [i, 0.53, 3.58],
          [i, 3.32, 4.37],
          [i, 5.86, 3.58],
          [i, 8.32, 4.37]
        ],
        2,
        'teal'
      );
    }
    for (let n = 0; n < 4; n++) {
      const i = 1.01 + n * 2.56;
      metal(H, R, i, 0.71, 0.09, 7.19, 4.37, 0.06, 'paper');
    }
    for (const i of [2.01, 9.13]) {
      metal(H, R, i, 1.13, 0.23, 5.98, 3.77, 0.11, 'blue');
      H.line(R, [H.p(i + 0.11, 1.23, 3.75), H.p(i + 0.11, 6.97, 3.75)], 'paper', 3.6);
    }
    const glass = H.faceI(0.71, 3.25, 10.42, 0.44, 3.64);
    H.tint(glass, 'teal', 0.13);
    H.outline(R, glass, 'teal', 1.2);
    for (const i of [0.73, 3.33, 5.94, 8.55, 11.16]) metal(H, R, i, 3.2, 0.07, 0.09, 0.43, 3.23, 'paper');
    for (const z of [0.44, 3.62]) metal(H, R, 0.71, 3.19, 10.49, 0.1, z, 0.09, 'teal');
    for (const i of [1.4, 4.09, 9.03]) {
      H.line(R, [H.p(i, 3.26, 1.9), H.p(i + 0.79, 3.26, 3.07)], 'paper', 1.8);
      H.line(R, [H.p(i + 0.2, 3.26, 1.74), H.p(i + 0.83, 3.26, 2.66)], 'paper', 0.7);
    }
    for (const i of [0.34, 11.66])
      for (let n = 0; n < 5; n++) {
        metal(H, R, i, 8.51 + n * 0.61, 0.045, 0.045, 0.02, 1.07, 'teal');
      }
    for (const i of [0.34, 11.66])
      bentTube(
        H,
        R,
        [
          [i, 8.5, 1.11],
          [i, 11.48, 1.11]
        ],
        2.2,
        'teal'
      );
    slattedSeat(H, R, 0.96, 7.22, 3.1, 0.03, 'teal', 0.68);
    for (const i of [9.68, 11.08]) for (const j of [8.32, 10.26]) caster(H, R, i, j, 0.19, 0.17, 'blue');
    rackFrame(H, R, 9.54, 8.18, 1.67, 2.25, 0.22, [0, 0.88], 'teal', (i, j, w, d, z, row) => {
      if (row) {
        for (let n = 0; n < 3; n++) vessel(H, R, i + 0.29, j + 0.32 + n * 0.57, z, 5, 15, ['coral', 'sun', 'teal'][n]);
        foldedCloth(H, R, i + 0.62, j + 0.47, 0.72, 1.18, z, 'paper', 'teal');
      } else vessel(H, R, i + 0.72, j + 0.91, z, 14, 18, 'sun');
    });
    bentTube(
      H,
      R,
      [
        [11.2, 8.22, 1.16],
        [11.2, 8.22, 1.63],
        [11.2, 10.39, 1.63],
        [11.2, 10.39, 1.16]
      ],
      2,
      'teal'
    );
    vessel(H, R, 8.92, 6.52, 0.04, 15, 22, 'sun');
    coiledLine(H, R, 10.5, 7.05, 0.04, 11, 'teal');
    surface(H, R, [H.p(7.79, 8.91, 0.03), H.p(8.73, 8.91, 0.03), H.p(8.65, 8.54, 1.14), H.p(7.91, 8.54, 1.14)], 'sun', 0.74);
    surface(H, R, [H.p(7.91, 8.54, 1.14), H.p(8.65, 8.54, 1.14), H.p(8.79, 8.02, 0.03), H.p(7.77, 8.02, 0.03)], 'coral', 0.6);
    H.line(R, [H.p(8.1, 8.84, 0.41), H.p(8.3, 8.7, 0.75), H.p(8.51, 8.84, 0.41), H.p(8.1, 8.84, 0.41)], 'blue', 1.2);
    for (let n = 0; n < 23; n++) H.line(R, [H.p(1.13 + n * 0.39, 10.96, 0.04), H.p(1.13 + n * 0.39, 11.41, 0.04)], 'sun', 1.4);
    for (const i of [2.18, 9.3]) H.tint(H.tile(i, 4.22, 0.18, 5.58, 0.03), 'sun', 0.17);
  },
  (H, R, t) => {
    const u = cycle(t, 16),
      down =
        u < 0.15
          ? 0
          : u < 0.36
            ? (1 - Math.cos(((u - 0.15) / 0.21) * Math.PI)) / 2
            : u < 0.55
              ? 1
              : u < 0.73
                ? (1 + Math.cos(((u - 0.55) / 0.18) * Math.PI)) / 2
                : 0;
    actor(
      H,
      R,
      7.18,
      4.38,
      t,
      'hongKongWalkwayGlass',
      {
        shirt: ['teal', 0.74],
        vest: ['sun', 0.63],
        hairStyle: 'short',
        face: 'nw',
        prop(h, r, p) {
          const end = h.p(6.66 + down * 0.38, 3.25, 2.65 - down * 0.91);
          h.line(r, [p.nearHand, end], 'blue', 2.1);
          h.line(
            r,
            [
              [end[0] - 15, end[1] - 7.5],
              [end[0] + 15, end[1] + 7.5]
            ],
            'teal',
            4.2
          );
          h.line(
            r,
            [
              [end[0] - 15, end[1] - 9],
              [end[0] + 15, end[1] + 6]
            ],
            'paper',
            0.9
          );
          shape(
            h,
            r,
            [
              [p.farHand[0] - 6, p.farHand[1] - 3],
              [p.farHand[0] + 7, p.farHand[1] - 1],
              [p.farHand[0] + 3, p.farHand[1] + 10],
              [p.farHand[0] - 8, p.farHand[1] + 6]
            ],
            'coral',
            0.62,
            0.6
          );
        }
      },
      0.01,
      1.3
    );
    const [x, y] = H.p(6.9, 6.52, 0.04);
    H.opacity(0.2 + 0.08 * Math.sin(u * TAU), () =>
      H.line(
        R,
        [
          [x - 22, y],
          [x + 22, y + 21]
        ],
        'sun',
        4.3
      )
    );
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
