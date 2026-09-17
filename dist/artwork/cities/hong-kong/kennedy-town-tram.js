import { slattedSeat, metal, surface, bentTube } from '../materials.js';
import { shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool } from '../furnishings.js';
import { world, shape, oval, stroke, box, actor, cycle, ell, TAU, table } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const driver = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 49, el: 31, ar: 57, er: 30, head: -20 };
FIGURES.clips.hongKongTramCheck = { dur: 20, keys: [[0, driver], [.17, driver], [.31, { ...driver, head: 20, lean: -7 }], [.48, { ...driver, head: 20, lean: -7 }], [.62, { ...driver, head: 4, ar: 79, er: 10, lean: -11 }], [.75, { ...driver, head: 4, ar: 79, er: 10, lean: -11 }], [.9, driver], [1, driver]] };
const passenger = { ...rest, al: 52, el: 62, ar: 62, er: 42, head: 12 };
FIGURES.clips.hongKongTramBag = { dur: 20, keys: [[0, passenger], [.33, passenger], [.45, { ...passenger, ar: 70, er: 49, lean: -7 }], [.58, { ...passenger, ar: 58, er: 70 }], [.7, passenger], [1, passenger]] };

function rail(H, R, i, j, h, ink = 'sun') {
  H.line(R, [H.p(i, j, .66), H.p(i, j, h)], 'blue', 3.2);
  H.line(R, [H.p(i, j, .69), H.p(i, j, h)], ink, 1.8);
}

function tramSeat(H, R, i, j, w, z = 0.73) {
  slattedSeat(H, R, i, j, w, z - 0.18, 'sun', 0.63);
  for (const x of [i + 0.13, i + w - 0.15]) {
    metal(H, R, x, j + 0.14, 0.13, 0.18, z + 0.2, 0.75, 'teal');
    for (const h of [0.3, 0.7]) H.dot(...H.p(x + 0.07, j + 0.33, z + h), 1.2, 'sun');
  }
}


function body(H, R) {
  for (const i of [3.3, 8.3])
    for (const j of [4.15, 7.45]) {
      oval(H, R, ...H.p(i, j, 0.25), 15, 12, 'blue', 0.9);
      oval(H, R, ...H.p(i, j, 0.25), 7, 6, 'paper', 0.7);
      H.dot(...H.p(i, j, 0.25), 2.5, 'blue');
    }
  box(H, R, 1.24, 3.9, 9.63, 4.06, 0.43, 0.3, 'teal', 0.74);
  shape(H, R, H.faceI(1.24, 3.91, 9.63, 0.73, 5.02), 'teal', 0.57);
  shape(H, R, H.faceJ(1.25, 3.9, 4.06, 0.73, 5.02), 'teal', 0.63);
  for (const z of [1.28, 3.41]) {
    for (let k = 0; k < 5; k++) {
      const i = 1.7 + k * 1.72;
      shape(H, R, H.faceI(i, 3.94, 1.42, z, z + 1.16), 'paper', 0.96);
      shape(H, R, H.faceI(i + 0.1, 3.96, 1.22, z + 0.11, z + 1.07), 'blue', 0.18);
      H.line(R, [H.p(i + 0.72, 3.99, z + 0.12), H.p(i + 0.72, 3.99, z + 1.05)], 'paper', 1.8);
      H.line(R, [H.p(i + 0.14, 4.02, z + 0.34), H.p(i + 1.3, 4.02, z + 0.34)], 'teal', 1);
      H.line(R, [H.p(i + 1.08, 4.05, z + 0.19), H.p(i + 1.23, 4.05, z + 0.19)], 'blue', 1.5);
    }
  }
  shape(H, R, H.faceJ(1.29, 4.3, 3.16, 3.39, 4.64), 'paper', 0.92);
  for (const j of [5.27, 6.36]) H.line(R, [H.p(1.32, j, 3.4), H.p(1.32, j, 4.64)], 'teal', 2);
  box(H, R, 1.2, 3.83, 9.76, 0.2, 4.99, 0.19, 'paper', 0.9);
  box(H, R, 1.16, 3.9, 0.18, 4.13, 4.99, 0.19, 'teal', 0.67);
  box(H, R, 1.3, 4.1, 6.25, 3.51, 2.67, 0.19, 'sun', 0.43);
  for (let j = 4.2; j < 7.6; j += 0.31) H.line(R, [H.p(1.39, j, 2.89), H.p(7.44, j, 2.89)], 'blue', 0.65, { tone: 0.43 });
  for (let j = 4.1; j < 7.8; j += 0.3) H.line(R, [H.p(1.4, j, 0.76), H.p(10.71, j, 0.76)], 'blue', 0.6, { tone: 0.42 });
  tramSeat(H, R, 3.58, 4.13, 3.12, 0.74);
  tramSeat(H, R, 2.06, 4.24, 4.51, 2.9);
  for (const i of [2.14, 4.31, 6.57]) {
    H.line(R, [H.p(i, 7.61, 2.87), H.p(i, 7.61, 3.43)], 'blue', 1.8);
    H.line(R, [H.p(i, 7.61, 3.43), H.p(Math.min(i + 2.17, 7.47), 7.61, 3.43)], 'teal', 2.4);
  }
  for (let k = 0; k < 6; k++) box(H, R, 1.49 + k * 0.34, 5.55, 0.37, 1.45, 0.73, 0.29 + k * 0.32, 'paper', 0.82);
  stroke(H, R, [H.p(1.62, 6.95, 1.37), H.p(3.55, 6.95, 3.26), H.p(3.79, 6.95, 3.26)], 'sun', 2.7);
  for (const [i, j] of [
    [3.58, 7.61],
    [7.24, 5.2],
    [8.1, 7.65],
    [10.63, 4.15]
  ])
    rail(H, R, i, j, 2.59);
  box(H, R, 8.52, 6.45, 0.74, 0.73, 0.74, 0.47, 'blue', 0.67);
  box(H, R, 8.47, 6.41, 0.85, 0.84, 1.21, 0.12, 'coral', 0.74);
  box(H, R, 8.45, 7.13, 0.88, 0.11, 1.33, 0.72, 'coral', 0.65);
  box(H, R, 9.57, 5.89, 0.93, 1.29, 0.74, 0.91, 'teal', 0.7);
  surface(H, R, [H.p(9.58, 5.9, 1.88), H.p(10.51, 5.9, 1.88), H.p(10.51, 7.19, 1.67), H.p(9.58, 7.19, 1.67)], 'teal', 0.8);
  for (let n = 0; n < 5; n++) surface(H, R, ell(...H.p(10.23, 6.08 + n * 0.15, 1.86 - n * 0.025), 2.5, 2), 'paper', 1, 0.45);
  bentTube(
    H,
    R,
    [
      [9.58, 5.93, 1.91],
      [9.58, 7.17, 1.7]
    ],
    1.8,
    'sun'
  );
  const [cx, cy] = H.p(10.07, 6.64, 1.72);
  oval(H, R, cx, cy, 13, 7, 'paper', 0.87);
  H.line(
    R,
    [
      [cx, cy],
      [cx - 9, cy - 3]
    ],
    'blue',
    1.5
  );
  for (const a of [-1, 1]) H.dot(cx + a * 18, cy + 3, 3.2, a === 1 ? 'coral' : 'sun');
  H.line(R, [H.p(9.9, 6.16, 1.76), H.p(10.18, 6.21, 2.01)], 'blue', 3);
  H.dot(...H.p(10.18, 6.21, 2.01), 4, 'coral');
  box(H, R, 7.26, 6.7, 0.45, 0.67, 0.75, 0.69, 'blue', 0.8);
  box(H, R, 7.18, 6.72, 0.62, 0.51, 1.44, 0.31, 'paper', 0.84);
  shape(H, R, H.faceI(7.26, 7.25, 0.43, 1.54, 1.7), 'teal', 0.7);
  const [mx, my] = H.p(10.47, 4.31, 2.74);
  stroke(H, R, [H.p(10.4, 4.05, 2.21), [mx + 3, my + 19], [mx, my]], 'blue', 2);
  oval(H, R, mx, my, 13, 16, 'blue', 0.72);
  oval(H, R, mx - 1, my - 1, 10, 13, 'paper', 0.84);
  shape(
    H,
    R,
    [
      [mx - 8, my + 3],
      [mx + 6, my - 7],
      [mx + 6, my + 7]
    ],
    'teal',
    0.3
  );
  const [fx, fy] = H.p(8.8, 4.13, 2.5);
  oval(H, R, fx, fy, 11, 11, 'paper', 0.7);
  for (const a of [0, TAU / 3, (TAU * 2) / 3])
    shape(
      H,
      R,
      [
        [fx, fy],
        [fx + Math.cos(a) * 9, fy + Math.sin(a) * 9],
        [fx + Math.cos(a + 0.8) * 6, fy + Math.sin(a + 0.8) * 6]
      ],
      'teal',
      0.56
    );
  H.outline(R, ell(fx, fy, 11, 11), 'blue', 0.8);
  H.dot(fx, fy, 2.5, 'sun');
  shape(H, R, H.faceJ(10.85, 4.0, 3.91, 0.75, 1.29), 'teal', 0.72);
  shape(H, R, H.faceJ(10.86, 4.07, 3.73, 1.88, 3.32), 'paper', 0.3);
  for (const j of [4.08, 5.94, 7.78]) H.line(R, [H.p(10.88, j, 1.8), H.p(10.88, j, 3.38)], 'teal', 2.4);
  H.line(R, [H.p(10.9, 5.79, 1.94), H.p(10.9, 6.33, 2.53)], 'blue', 1.4);
  box(H, R, 10.72, 4.0, 0.2, 3.98, 3.3, 0.17, 'teal', 0.67);
  const [bx, by] = H.p(9.05, 4.22, 1.19);
  oval(H, R, bx, by, 9, 5, 'sun', 0.76);
  shape(
    H,
    R,
    [
      [bx - 7, by],
      [bx - 5, by - 11],
      [bx + 4, by - 11],
      [bx + 7, by]
    ],
    'sun',
    0.78
  );
  H.dot(bx, by - 12, 2, 'blue');
  const [tx, ty] = H.p(9.76, 5.97, 1.76);
  shape(
    H,
    R,
    [
      [tx - 4, ty],
      [tx + 4, ty],
      [tx + 4, ty - 18],
      [tx - 4, ty - 18]
    ],
    'paper',
    0.9
  );
  oval(H, R, tx, ty - 18, 4, 2, 'teal', 0.7);
  stroke(
    H,
    R,
    [
      [tx - 5, ty - 4],
      [tx - 12, ty - 3],
      [tx - 13, ty - 13],
      [tx - 8, ty - 9]
    ],
    'sun',
    3
  );
  const [jx, jy] = H.p(5.2, 4.65, 3.82);
  shape(
    H,
    R,
    [
      [jx - 11, jy - 14],
      [jx + 11, jy - 14],
      [jx + 15, jy],
      [jx + 7, jy + 6],
      [jx + 10, jy + 18],
      [jx - 10, jy + 18],
      [jx - 7, jy + 6],
      [jx - 15, jy]
    ],
    'coral',
    0.55
  );
  H.line(
    R,
    [
      [jx, jy - 11],
      [jx, jy + 17]
    ],
    'paper',
    0.8
  );
}

function kennedyTownTramDetails(H, R) {
  table(H, R, 9.58, 9.05, 1.65, 0.68, 0.44, 'teal');
  foldedCloth(H, R, 9.83, 9.17, 0.61, 0.43, 0.58, 'coral', 'paper');
  satchel(H, R, 10.8, 9.38, 0.59, 'blue', 0.68);
  shallowTray(H, R, 0.65, 9.08, 1.72, 1.01, 0.04, 'blue');
  handTool(H, R, 1.05, 9.41, 0.21, 'spanner', 'sun');
  liddedTin(H, R, 1.82, 9.52, 0.21, 7, 17, 'teal');
  coiledLine(H, R, 2.91, 9.56, 0.04, 16, 'coral');
  for (const i of [1.5, 4.6, 7.5, 10.5]) {
    box(H, R, i, 8.06, 0.67, 0.13, 0.72, 0.25, 'teal', 0.58);
    for (let n = 0; n < 4; n++) H.line(R, [H.p(i + 0.12 + n * 0.13, 8.22, 0.79), H.p(i + 0.12 + n * 0.13, 8.22, 0.92)], 'blue', 0.7);
  }
  box(H, R, 4.0, 8.11, 3.5, 0.1, 1.05, 0.14, 'sun', 0.62);
  for (const i of [4.12, 7.3]) H.dot(...H.p(i, 8.24, 1.12), 1.4, 'blue');
  for (const i of [1.5, 10.3]) {
    oval(H, R, ...H.p(i, 8.21, 1.36), 6, 5, i < 2 ? 'sun' : 'paper', 1);
    oval(H, R, ...H.p(i, 8.24, 1.36), 3, 2.7, 'coral', 0.7);
  }
  for (const i of [6.94, 7.33]) box(H, R, i, 4.36, 0.17, 0.2, 2.93, 0.22, 'blue', 0.7);
  boundBook(H, R, 5.73, 4.39, 0.65, 0.48, 3.66, 'teal');
  shape(H, R, H.tile(1.17, 10.87, 2.4, 0.33, 0.03), 'blue', 0.5, 0.5);
  for (let n = 0; n < 13; n++) H.line(R, [H.p(1.24 + n * 0.17, 10.88, 0.05), H.p(1.24 + n * 0.17, 11.19, 0.05)], 'paper', 0.8);
}

function construction(H, R) {
  for (const z of [1.26, 3.4])
    for (let n = 0; n < 5; n++) {
      const i = 1.7 + n * 1.72;
      box(H, R, i - 0.04, 3.95, 1.49, 0.19, z - 0.1, 0.1, 'paper', 1);
      for (const x of [i + 0.09, i + 1.31])
        for (const h of [z + 0.1, z + 0.97]) {
          H.dot(...H.p(x, 4.015, h), 1.15, 'sun');
          H.line(R, [H.p(x - 0.025, 4.02, h), H.p(x + 0.025, 4.02, h)], 'blue', 0.55);
        }
      H.line(R, [H.p(i + 0.2, 4.01, z + 0.8), H.p(i + 0.45, 4.01, z + 0.98)], 'paper', 1.7);
      shape(H, R, H.faceI(i + 0.17, 4.05, 1.05, z - 0.38, z - 0.18), n % 2 ? 'paper' : 'sun', 0.6, 0.6);
      for (let k = 0; k < 3; k++)
        H.line(R, [H.p(i + 0.25 + k * 0.25, 4.06, z - 0.34), H.p(i + 0.34 + k * 0.25, 4.06, z - 0.24)], n % 2 ? 'teal' : 'coral', 1.1);
    }
  for (const i of [2.3, 4.1, 5.9]) {
    H.line(R, [H.p(i, 4.08, 4.9), H.p(i, 5.28, 4.9)], 'blue', 1.5);
    const [x, y] = H.p(i, 5.28, 4.88);
    H.line(
      R,
      [
        [x, y],
        [x, y + 15]
      ],
      'sun',
      2
    );
    H.outline(R, ell(x, y + 22, 6, 7), 'blue', 1.8);
  }
  for (let n = 0; n < 6; n++) {
    const i = 1.51 + n * 0.34;
    H.line(R, [H.p(i, 5.58, 1.05 + n * 0.32), H.p(i, 6.9, 1.05 + n * 0.32)], 'blue', 2);
    H.line(R, [H.p(i + 0.04, 5.58, 1.065 + n * 0.32), H.p(i + 0.04, 6.9, 1.065 + n * 0.32)], 'sun', 0.9);
  }
  for (const i of [3.3, 8.3]) {
    const [x, y] = H.p(i, 7.7, 0.52);
    for (let n = 0; n < 6; n++)
      H.line(
        R,
        [
          [x - 13, y - n * 2],
          [x + 13, y - n * 2]
        ],
        n % 2 ? 'blue' : 'paper',
        1.1
      );
    H.line(
      R,
      [
        [x - 16, y - 12],
        [x - 16, y + 4],
        [x + 16, y + 4],
        [x + 16, y - 12]
      ],
      'blue',
      2
    );
  }
  H.line(R, [H.p(2.14, 7.62, 3.09), H.p(6.9, 7.62, 3.09)], 'sun', 1.8);
  for (let n = 0; n < 11; n++) H.dot(...H.p(1.7 + n * 0.82, 8.0, 0.64), 1.2, 'paper');
  const [x, y] = H.p(7.44, 7.255, 1.64);
  for (let n = 0; n < 3; n++)
    H.line(
      R,
      [
        [x - 5, y + n * 3],
        [x + 5, y + n * 3]
      ],
      'sun',
      1
    );
  box(H, R, 7.14, 6.8, 0.6, 0.4, 0.89, 0.21, 'coral', 0.5);
  H.line(R, [H.p(7.23, 7.22, 1.01), H.p(7.63, 7.22, 1.01)], 'blue', 1.8);
  for (const i of [3.2, 5.4]) {
    box(H, R, i, 0.75, 0.72, 0.36, 3.24, 0.2, 'teal', 0.6);
    H.line(R, [H.p(i + 0.1, 0.88, 3.46), H.p(i + 0.6, 0.88, 3.46)], 'sun', 1.7);
  }
  for (let n = 0; n < 4; n++) {
    box(H, R, 7.4 + n * 0.46, 0.59, 0.3, 0.45, 0.37, 0.67 + (n % 2) * 0.2, 'paper', 1);
    shape(H, R, H.faceI(7.43 + n * 0.46, 1.06, 0.24, 0.57, 0.86), 'teal', 0.4, 0.5);
  }
  for (const i of [2.03, 6.33]) {
    H.line(R, [H.p(i, 0.68, 2.5), H.p(i + 0.55, 0.68, 3.05)], 'blue', 2);
    H.line(R, [H.p(i, 0.68, 2.5), H.p(i - 0.55, 0.68, 3.05)], 'blue', 2);
  }
}

const room = world('hong-kong-kennedy-town-tram', 'Kennedy Town · Bell before departure', { floor: 'blue', tone: .16, wall: false, head: 46 }, (H, R) => {
  for (const j of [4.1, 7.55]) for (const d of [0, .13]) stroke(H, R, [H.p(.1, j + d, .03), H.p(5.3, j + d, .03), H.p(11.8, j + d + .3, .03)], 'blue', 1.9);
  box(H, R, .35, .32, 10.9, 2.65, .01, .34, 'paper', .82);
  for (let i = .5; i < 11.1; i += .55) for (let j = .5; j < 2.9; j += .5) H.outline(R, H.tile(i, j, .45, .4, .37), 'blue', .5, { tone: .25 });
  for (let i = .5; i < 11; i += .36) H.dot(...H.p(i, 2.68, .38), 1.6, 'sun', .9);
  for (const i of [2.03, 6.33]) box(H, R, i, .68, .15, .16, .35, 2.7, 'blue', .6);
  box(H, R, 1.38, .37, 5.7, 1.32, 3.05, .17, 'teal', .59);
  shape(H, R, H.faceI(2.17, .89, 3.5, 1.37, 2.65), 'paper', .9);
  for (let k = 0; k < 6; k++) box(H, R, 2.35 + k * .53, .92, .36, .03, 1.76, .23 + k % 3 * .16, ['coral', 'teal', 'sun'][k % 3], .59);
  box(H, R, 8.78, 1.02, .85, .83, .35, .9, 'teal', .58);
  shape(H, R, H.tile(8.9, 1.15, .61, .54, 1.27), 'blue', .8);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(.6 + k * 1.6, 10.45, .02), H.p(1.17 + k * 1.6, 10.45, .02)], 'sun', 2.5, { tone: .7 });
  body(H, R);
  kennedyTownTramDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 20);
  H.at(8.91, 6.86, .73, HH => actor(HH, R, 8.91, 6.86, u * 20, 'hongKongTramCheck', { shirt: ['paper', 1], pants: ['blue', .76], hairStyle: 'short' }, .73, 1.27));
  H.at(4.62, 6.44, .74, HH => actor(HH, R, 4.62, 6.44, u * 20, 'hongKongTramBag', { shirt: ['coral', .72], pants: ['blue', .7], hairStyle: 'pony', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    stroke(h, r, [[x - 6, y + 15], [x - 5, y], [x + 7, y + 1], [x + 9, y + 16]], 'coral', 2);
    shape(h, r, [[x - 10, y + 12], [x + 13, y + 12], [x + 11, y + 33], [x - 9, y + 32]], 'teal', .74);
    h.line(r, [[x - 5, y + 25], [x + 8, y + 25]], 'paper', 1.2);
  } }, .74, 1.23));
  H.at(3.31, 4.69, 2.89, HH => actor(HH, R, 3.31, 4.69, u * 4, 'read', { shirt: ['sun', .67], hairStyle: 'short', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 12, y - 10], [x, y - 5], [x + 12, y - 11], [x + 12, y + 6], [x, y + 10], [x - 12, y + 6]], 'paper', 1);
    h.line(r, [[x, y - 4], [x, y + 9]], 'teal', .8);
  } }, 2.89, 1.15));
  const [x, y] = H.p(10.47, 4.31, 2.74);
  H.opacity(.3 + .25 * Math.sin(u * TAU) ** 2, () => H.line(R, [[x - 5, y + 6], [x + 4, y - 7]], 'paper', 2));
});
room.loopSeconds = 20;
export default room;
