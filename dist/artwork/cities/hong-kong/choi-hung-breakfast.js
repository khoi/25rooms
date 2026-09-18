import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant, cushion } from '../materials.js';
import { masonry, archedBay, cabinetFrame, basin as washBasin } from '../structure.js';
import { windowBay, cityView } from '../joinery.js';
import { shallowTray, foldedCloth, boundBook } from '../furnishings.js';
import { actor, box, cycle, ell, oval, shape, stroke, table, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, al: 54, el: 41, ar: 79, er: 9, head: 12, lean: -7 };
const raised = { ...rest, al: 46, el: 40, ar: 149, er: -9, head: -17, lean: 3 };
FIGURES.clips.hongKongTableCheck = {
  dur: 22,
  keys: [
    [0, ready],
    [0.3, ready],
    [0.4, { ...ready, ar: 48, er: 36, lean: -19, head: 20 }],
    [0.45, ready],
    [0.61, raised],
    [0.67, raised],
    [0.84, ready],
    [0.89, { ...ready, ar: 48, er: 36, lean: -19, head: 20 }],
    [0.94, ready],
    [1, ready]
  ]
};
const childHold = { ...rest, al: 59, el: 38, ar: 66, er: 36, lean: -8, head: 15 };
FIGURES.clips.hongKongStool = {
  dur: 22,
  keys: [
    [0, childHold],
    [0.16, childHold],
    [0.23, { ...childHold, lean: -13, ar: 77, er: 16, al: 68, el: 21 }],
    [0.32, childHold],
    [0.9, childHold],
    [0.96, { ...childHold, lean: -13, ar: 77, er: 16, al: 68, el: 21 }],
    [1, childHold]
  ]
};
const ease = (u) => (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, u)))) / 2;

function mug(H, R, i, j, z, ink = 'paper', handle = 1) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 6, y],
      [x + 6, y],
      [x + 6, y - 13],
      [x - 6, y - 13]
    ],
    ink,
    0.87,
    0.6
  );
  oval(H, R, x, y - 13, 6, 2.5, 'sun', 0.49);
  stroke(
    H,
    R,
    [
      [x + 6 * handle, y - 11],
      [x + 13 * handle, y - 11],
      [x + 13 * handle, y - 3],
      [x + 6 * handle, y - 2]
    ],
    'blue',
    1.2
  );
}

function foldingTable(H, R, angle, support) {
  const j = 0.63,
    z = 0.73,
    length = 1.23,
    tipJ = j + Math.cos(angle) * length,
    tipZ = z + Math.sin(angle) * length;
  for (const i of [4.9, 7.91]) {
    H.line(R, [H.p(i, j, z), H.p(i, j, z - 0.21)], 'blue', 2.5);
    H.dot(...H.p(i, j, z), 2.6, 'sun');
  }
  const supportBase = H.p(7.33, 0.7, 0.1);
  const supportTip = H.p(7.33 - (1 - support) * 0.75, 0.72 + support * 0.95, 0.64);
  stroke(H, R, [H.p(7.33, 0.7, 0.64), supportBase, supportTip, H.p(7.33, 0.7, 0.64)], 'blue', 3);
  H.line(R, [supportBase, supportTip], 'teal', 1.6);
  const top = [H.p(4.57, j, z), H.p(8.2, j, z), H.p(8.2, tipJ, tipZ), H.p(4.57, tipJ, tipZ)];
  shape(H, R, top, 'sun', 0.42);
  for (let i = 4.75; i < 8.2; i += 0.38)
    H.line(R, [H.p(i, j + Math.cos(angle) * 0.06, z + Math.sin(angle) * 0.06 + 0.02), H.p(i, tipJ, tipZ + 0.02)], 'coral', 0.55, { tone: 0.36 });
  shape(H, R, [H.p(4.57, tipJ, tipZ), H.p(8.2, tipJ, tipZ), H.p(8.2, tipJ, tipZ - 0.12), H.p(4.57, tipJ, tipZ - 0.12)], 'coral', 0.55);
  const patch = [
    [7.56, length - 0.16],
    [8.04, length - 0.16],
    [8.04, length],
    [7.56, length]
  ].map(([i, d]) => H.p(i, j + Math.cos(angle) * d, z + Math.sin(angle) * d + 0.025));
  shape(H, R, patch, 'paper', 0.86, 0.45);
  for (const i of [4.72, 8.05]) H.dot(...H.p(i, tipJ - Math.cos(angle) * 0.11, tipZ - Math.sin(angle) * 0.11 + 0.03), 1, 'blue');
}

const room = world(
  'hong-kong-choi-hung-breakfast',
  'Choi Hung · A table unfolds',
  { floor: 'paper', tone: 1, wall: false, head: 55 },
  (H, R) => {
    for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) surface(H, R, H.tile(i, j, 0.98, 0.98, 0.02), (i + j) % 2 ? 'sun' : 'paper', 0.11, 0.3);
    masonry(H, R, 'nw', 0, 12, 0, 4.38, 'paper');
    masonry(H, R, 'ne', 0, 12, 0, 4.38, 'paper');
    surface(H, R, H.faceJ(0.08, 0.1, 11.8, 0.15, 1.55), 'teal', 0.16);
    windowBay(H, R, 'ne', 4.39, 4.16, 2.27, 1.77, { ink: 'sun', divisions: 3, view: (P) => cityView(H, R, P, 4.16, 1.77) });
    for (let n = 0; n < 8; n++) H.tint(H.tile(4.5 + n * 0.46, 1.13, 0.25, 3.2, 0.025), 'sun', 0.12, { fine: true });
    cabinetFrame(H, R, 0.37, 0.45, 3.07, 1.22, 0.08, 1.13, 2, 'teal', (i, j, w, d, z, h, n) => {
      timber(H, R, i, j, w, d, z + 0.43, 0.06, 'sun');
      for (let q = 0; q < 3; q++) vessel(H, R, i + 0.21 + q * 0.36, j + 0.45, z + 0.54, 5, 11, n ? 'sun' : 'paper');
    });
    metal(H, R, 0.32, 0.4, 3.17, 1.32, 1.21, 0.11, 'paper');
    mug(H, R, 1.11, 1.1, 1.35, 'coral');
    mug(H, R, 2.48, 1.1, 1.35, 'paper');
    cabinetFrame(H, R, 0.41, 2.05, 2.38, 5.39, 0.08, 1.08, 1, 'teal', (i, j, w, d, z) => {
      for (let n = 0; n < 3; n++) {
        timber(H, R, i, j + n * 1.65, w, 1.36, z + 0.18, 0.07, 'sun');
        foldedCloth(H, R, i + 0.16, j + n * 1.65 + 0.14, w - 0.3, 1.05, z + 0.27, 'paper', n % 2 ? 'coral' : 'teal');
      }
    });
    metal(H, R, 0.35, 2, 2.5, 5.5, 1.16, 0.12, 'paper');
    washBasin(H, R, 0.48, 2.28, 2.2, 1.5, 1.29);
    vessel(H, R, 1.61, 4.62, 1.29, 17, 27, 'paper', false);
    metal(H, R, 0.78, 5.47, 1.41, 1.38, 1.29, 0.12, 'teal');
    const [bx, by] = H.p(1.49, 6.12, 1.43);
    surface(H, R, ell(bx, by, 18, 8), 'blue', 0.72);
    vessel(H, R, 1.49, 6.12, 1.47, 12, 21, 'sun', false);
    drape(H, R, 2.05, 6.71, 0.52, 0.76, 1.3, 0.64, 'paper');
    archedBay(H, R, 'nw', 3.18, 3.9, 2.31, 1.55, 'teal', (P) => cityView(H, R, P, 3.9, 1.55));
    cabinetFrame(H, R, 0.2, 8.19, 2.29, 2.79, 0.12, 1.43, 1, 'sun', (i, j, w, d, z, h) => {
      for (let row = 0; row < 2; row++) {
        timber(H, R, i, j, w, d, z + 0.5 + row * 0.43, 0.07, 'sun');
        for (let n = 0; n < 6; n++) boundBook(H, R, i + 0.08 + n * 0.27, j + 0.13, 0.21, 0.73, z + 0.58 + row * 0.43, n % 2 ? 'teal' : 'paper');
      }
    });
    timber(H, R, 9.96, 0.43, 1.51, 1.42, 0.09, 2.84, 'teal');
    for (const [z, h] of [
      [0.22, 1.41],
      [1.75, 1.05]
    ]) {
      surface(H, R, H.faceI(10.09, 1.87, 1.23, z, z + h), 'paper', 1);
      bentTube(
        H,
        R,
        [
          [10.27, 1.91, z + 0.25],
          [10.27, 1.91, z + 0.59]
        ],
        1.8,
        'teal'
      );
    }
    for (const [i, j, ink] of [
      [10.43, 1.91, 'coral'],
      [10.97, 1.91, 'sun']
    ])
      surface(H, R, H.faceI(i, j, 0.31, 2.07, 2.39), ink, 0.48);
    metal(H, R, 9.68, 4.02, 1.73, 4.57, 0.13, 0.36, 'teal');
    cushion(H, R, 9.62, 4.08, 1.81, 4.43, 0.5, 0.23, 'sun');
    for (const j of [4.05, 7.08]) cushion(H, R, 9.79, j, 1.4, 1.24, 0.76, 0.18, j < 5 ? 'paper' : 'coral');
    drape(H, R, 10.12, 6.62, 1.13, 1.7, 0.77, 0.46, 'paper');
    benchFrame(H, R, 5.16, 8.46, 2.84, 1.81, 0.57, 'sun');
    shallowTray(H, R, 5.38, 8.66, 2.21, 1.23, 0.6, 'teal');
    for (let n = 0; n < 3; n++) {
      const [x, y] = H.p(5.8 + n * 0.63, 9.11, 0.81);
      surface(H, R, ell(x, y, 10, 4), 'paper', 1);
      surface(H, R, ell(x, y, 7, 3), 'sun', 0.45);
    }
    boundBook(H, R, 7.76, 10.39, 1.19, 0.81, 0.04, 'coral');
    cushion(H, R, 5.1, 10.55, 1.58, 0.9, 0.035, 0.12, 'teal');
    pendant(H, R, 6.25, 2.15, 4.36, 3.25, 'sun', 0.9);
  },
  (H, R, t) => {
    const u = cycle(t, 22);
    const stool = u < 0.17 ? 0 : u < 0.31 ? ease((u - 0.17) / 0.14) : u < 0.91 ? 1 : 1 - ease((u - 0.91) / 0.09);
    const folded = u < 0.44 ? 0 : u < 0.61 ? ease((u - 0.44) / 0.17) : u < 0.67 ? 1 : u < 0.84 ? 1 - ease((u - 0.67) / 0.17) : 0;
    const support = u < 0.31 ? 1 : u < 0.42 ? 1 - ease((u - 0.31) / 0.11) : u < 0.84 ? 0 : u < 0.92 ? ease((u - 0.84) / 0.08) : 1;
    H.at(6.4, 2.4, 0, (HH) => foldingTable(HH, R, (folded * Math.PI) / 2, support));
    const edgeJ = 0.63 + Math.cos((folded * Math.PI) / 2) * 1.23,
      edgeZ = 0.73 + Math.sin((folded * Math.PI) / 2) * 1.23;
    H.at(8.7, edgeJ + 0.14, 0, (HH) =>
      actor(
        HH,
        R,
        8.7,
        edgeJ + 0.14,
        u * 22,
        'hongKongTableCheck',
        {
          shirt: ['coral', 0.66],
          pants: ['blue', 0.65],
          hairStyle: 'short',
          face: 'sw',
          prop: (h, r, p) => {
            const contact = h.p(8.15, edgeJ, edgeZ + 0.02);
            stroke(h, r, [p.nearHand, contact], 'coral', 3.6);
            oval(h, r, ...contact, 2.4, 1.8, 'coral', 0.3);
          }
        },
        0,
        1.38
      )
    );
    const j = 2.43 + stool * 1.7;
    H.at(5.72, j, 0, (HH) => {
      const i = 5.21;
      for (const side of [0, 0.75]) {
        stroke(HH, R, [HH.p(i + side, j, 0.02), HH.p(i + side, j + 0.75, 0.58)], 'blue', 2.2);
        stroke(HH, R, [HH.p(i + side, j + 0.75, 0.02), HH.p(i + side, j, 0.58)], 'blue', 2.2);
        HH.dot(...HH.p(i + side, j + 0.38, 0.29), 2, 'sun');
      }
      box(HH, R, i - 0.07, j - 0.08, 0.93, 0.93, 0.58, 0.12, 'coral', 0.75);
      shape(HH, R, HH.tile(i + 0.19, j + 0.22, 0.41, 0.2, 0.72), 'blue', 0.67, 0.4);
    });
    H.at(5.63, j + 1.1, 0, (HH) =>
      actor(
        HH,
        R,
        5.63,
        j + 1.1,
        u * 22,
        'hongKongStool',
        { shirt: ['sun', 0.66], pants: ['teal', 0.72], hairStyle: 'short', face: 'nw' },
        0,
        1.3,
        'child'
      )
    );
  }
);
room.loopSeconds = 22;
room.stillTime = 0;
export default room;
