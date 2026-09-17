import { cornice, recessedFrame, panelFront, wallRack, hangingRail, taskLight, specimen } from '../joinery.js';
import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, boundBook, satchel, handTool, framedPanel } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, plant, cycle, TAU, wallRect, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const breakfast = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 30, el: 65, ar: 37, er: 64, head: 8 };
FIGURES.clips.newYorkHeightsToast = { dur: 14, keys: [[0, breakfast], [.17, breakfast], [.32, { ...breakfast, ar: 62, er: 99, head: -4 }], [.44, { ...breakfast, ar: 62, er: 99, head: -17 }], [.66, { ...breakfast, ar: 62, er: 99, head: -17 }], [.83, breakfast], [1, breakfast]] };
const childSeat = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: -18, ar: 118, er: 13, al: 33, el: 44 };
FIGURES.clips.newYorkHeightsPoint = { dur: 14, keys: [[0, childSeat], [.28, { ...childSeat, ar: 125, er: 8, head: -21 }], [.56, { ...childSeat, ar: 125, er: 8, head: -21 }], [.75, { ...childSeat, ar: 72, er: 46, head: 3 }], [.89, { ...childSeat, ar: 72, er: 46, head: 3 }], [1, childSeat]] };

function cup(H, R, i, j, z, ink = 'coral', scale = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 6 * scale, y], [x + 6 * scale, y], [x + 6 * scale, y - 12 * scale], [x - 6 * scale, y - 12 * scale]], ink, .63, .7);
  oval(H, R, x, y - 12 * scale, 6 * scale, 2.5 * scale, 'paper', 1);
  stroke(H, R, [[x + 6 * scale, y - 10 * scale], [x + 12 * scale, y - 9 * scale], [x + 11 * scale, y - 2 * scale], [x + 6 * scale, y - 2 * scale]], 'blue', .9);
}

function chair(H, R, i, j, ink = 'coral') {
  for (const x of [i, i + .76]) for (const y of [j, j + .69]) box(H, R, x, y, .09, .09, .02, .46, 'blue', .69);
  box(H, R, i - .04, j - .04, .92, .85, .47, .09, ink, .66);
  for (const x of [i, i + .76]) H.line(R, [H.p(x, j + .75, .46), H.p(x, j + .75, 1.24)], 'blue', 2);
  box(H, R, i - .04, j + .7, .92, .1, .96, .26, ink, .64);
}

function radiator(H, R) {
  for (let k = 0; k < 13; k++) {
    const i = 5.45 + k * .31;
    const [x0, y0] = H.p(i, .6, .23), [x1, y1] = H.p(i, .6, 1.11);
    stroke(H, R, [[x0, y0], [x0 - 2, y1 + 8], [x1 + 3, y1], [x1 + 8, y1 + 4], [x0 + 8, y0]], 'blue', 5.2, .74);
    stroke(H, R, [[x0 + 1, y0 - 3], [x1 + 1, y1 + 9], [x1 + 4, y1 + 5]], 'paper', 2.5, 1);
  }
  for (const i of [5.62, 9.05]) box(H, R, i, .56, .19, .44, .03, .2, 'blue', .8);
  H.line(R, [H.p(9.46, .58, .38), H.p(9.81, .58, .38), H.p(9.81, .58, .09)], 'blue', 2.2);
  oval(H, R, ...H.p(9.81, .58, .64), 5.5, 4.5, 'coral', .68);
  H.line(R, [H.p(5.43, .6, .31), H.p(5.07, .6, .31), H.p(5.07, .6, .03)], 'blue', 2.4);
}

function window(H, R) {
  const frame = H.faceI(4.95, .05, 5.0, 1.37, 3.68);
  shape(H, R, frame, 'paper', 1, 1.2);
  const pane = H.faceI(5.17, .09, 4.57, 1.58, 3.48);
  shape(H, R, pane, 'sun', .15, .6);
  H.clip(pane, () => {
    for (const [i, w, h] of [[5.23, .8, 2.15], [6.28, 1.17, 2.44], [7.88, 1.34, 2.1], [9.37, .7, 2.66]]) {
      shape(H, R, H.faceI(i, .1, w, 1.47, h), 'coral', .25, .5);
      for (let q = 0; q < 3; q++) shape(H, R, H.faceI(i + .13 + q % 2 * .34, .12, .18, 1.7 + Math.floor(q / 2) * .33, 1.88 + Math.floor(q / 2) * .33), 'blue', .42, .4);
    }
    H.line(R, [H.p(5.0, .18, 1.83), H.p(9.89, .18, 1.83)], 'blue', 3);
    H.line(R, [H.p(5.0, .18, 2.77), H.p(9.89, .18, 2.77)], 'blue', 2);
    for (let i = 5.12; i < 9.9; i += .29) H.line(R, [H.p(i, .18, 1.84), H.p(i, .18, 2.76)], 'blue', 1.25);
    for (let k = 0; k < 6; k++) {
      const i = 8.42 + k * .24, z = 2.03 + k * .24;
      H.line(R, [H.p(i, .19, z), H.p(i + .71, .19, z)], 'blue', 1.6);
    }
    for (const a of [8.4, 9.11]) H.line(R, [H.p(a, .19, 2.03), H.p(a + 1.42, .19, 3.47)], 'blue', 2);
  });
  for (const z of [1.51, 2.55, 3.56]) H.line(R, [H.p(5.12, .23, z), H.p(9.82, .23, z)], 'paper', 5);
  H.line(R, [H.p(7.47, .23, 1.5), H.p(7.47, .23, 3.58)], 'paper', 5);
  H.line(R, [H.p(7.46, .25, 1.5), H.p(7.46, .25, 3.58)], 'blue', .8);
  box(H, R, 4.91, .2, 5.14, .49, 1.34, .13, 'paper', 1);
  for (const i of [7.19, 7.73]) H.line(R, [H.p(i, .3, 2.58), H.p(i + .18, .3, 2.58)], 'blue', 1.5);
  H.line(R, [H.p(4.72, .24, 3.77), H.p(10.16, .24, 3.77)], 'blue', 2);
}

function washingtonHeightsDetails(H, R) {
  drawerUnit(H, R, 9.53, 8.77, 1.9, 1.61, 1.57, 4, 'teal');
  boundBook(H, R, 9.7, 8.96, 1.17, 0.9, 1.74, 'coral');
  liddedTin(H, R, 10.99, 9.83, 1.76, 7, 14, 'sun');
  framedPanel(H, R, 9.83, 9.13, 0.88, 1.98, 0.66, 'teal');
  shelfUnit(H, R, 2.29, 0.27, 1.61, 0.68, 1.79, [0, 0.78], 'sun');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 2.62 + n * 0.46, 0.59, 1.94, 6, 17, ['teal', 'coral', 'paper'][n]);
  foldedCloth(H, R, 2.44, 0.36, 1.26, 0.45, 2.73, 'paper', 'teal');
  for (const j of [9.03, 9.72, 10.41]) {
    H.line(R, [H.p(0.17, j, 2.07), H.p(0.45, j, 2.07), H.p(0.45, j, 2.19)], 'blue', 1.6);
  }
  satchel(H, R, 0.59, 9.63, 1.0, 'coral', 0.8);
  const [x, y] = H.p(0.51, 10.39, 1.04);
  shape(
    H,
    R,
    [
      [x - 11, y],
      [x + 12, y],
      [x + 8, y - 28],
      [x - 7, y - 29]
    ],
    'teal',
    0.55,
    0.8
  );
  H.line(
    R,
    [
      [x, y - 26],
      [x, y - 2]
    ],
    'paper',
    1
  );
  table(H, R, 4.23, 9.05, 2.36, 1.49, 0.57, 'sun');
  shallowTray(H, R, 4.42, 9.23, 1.96, 1.1, 0.71, 'paper');
  for (let n = 0; n < 3; n++) oval(H, R, ...H.p(4.81 + n * 0.55, 9.73, 0.94), 8, 5, ['sun', 'coral', 'sun'][n], 0.65);
  foldedCloth(H, R, 4.44, 9.29, 1.74, 0.91, 0.14, 'paper', 'coral');
  handTool(H, R, 1.29, 5.76, 1.17, 'brush', 'sun');
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.12, 11.85, 3.66, 'sun');
  cornice(H, R, 'ne', 0.12, 11.85, 3.66, 'sun');
  wallRack(H, R, 'nw', 0.51, 5.43, 2.18, 1.22, 2, 'teal', (P, z, row) => {
    for (let n = 0; n < 9; n++) {
      const [x, y] = P(0.4 + n * 0.57, z + 0.12);
      if (row) {
        shape(
          H,
          R,
          [
            [x - 4, y],
            [x + 4, y],
            [x + 4, y - 12 - (n % 2) * 4],
            [x - 4, y - 12 - (n % 2) * 4]
          ],
          ['sun', 'coral', 'paper'][n % 3],
          0.65,
          0.5
        );
        oval(H, R, x, y - 13 - (n % 2) * 3, 4, 2, 'teal', 0.6);
      } else {
        oval(H, R, x, y, 6, 3, 'paper', 1);
        H.line(
          R,
          [
            [x - 5, y],
            [x - 4, y + 6],
            [x + 4, y + 6],
            [x + 5, y]
          ],
          'teal',
          0.7
        );
      }
    }
  });
  hangingRail(H, R, 'nw', 3.44, 2.45, 1.95, 4, (P, u, n) => {
    const [x, y] = P(u, -0.13);
    if (n < 2) {
      H.line(
        R,
        [
          [x, y],
          [x, y + 14]
        ],
        'sun',
        1.7
      );
      oval(H, R, x, y + 20, 5, 7, 'paper', 1);
    } else {
      shape(
        H,
        R,
        [
          [x - 7, y],
          [x + 7, y],
          [x + 8, y + 28],
          [x - 7, y + 30]
        ],
        'paper',
        1,
        0.6
      );
      for (let q = 0; q < 3; q++)
        H.line(
          R,
          [
            [x - 5, y + 19 + q * 3],
            [x + 6, y + 17 + q * 3]
          ],
          'coral',
          0.8
        );
    }
  });
  for (let n = 0; n < 5; n++) {
    const j = 0.73 + n * 1.08;
    shape(H, R, H.faceJ(1.985, j, 0.73, 0.24, 0.76), 'teal', 0.3, 0.6);
    H.line(R, [H.p(2, j + 0.14, 0.7), H.p(2, j + 0.52, 0.7)], 'sun', 1.4);
  }
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(2.01, 6.97 + n * 0.31, 1.66 - (n % 2) * 0.25);
    shape(
      H,
      R,
      [
        [x - 5, y],
        [x + 6, y],
        [x + 6, y - 12],
        [x - 5, y - 12]
      ],
      'paper',
      1,
      0.5
    );
    H.dot(x, y - 10, 1.7, n % 2 ? 'coral' : 'teal');
    H.line(
      R,
      [
        [x - 3, y - 5],
        [x + 4, y - 5]
      ],
      'sun',
      0.8
    );
  }
  for (const i of [5.02, 9.78]) {
    box(H, R, i, 0.11, 0.12, 0.3, 1.48, 2.1, 'teal', 0.53);
    for (const z of [1.68, 3.32]) H.dot(...H.p(i + 0.06, 0.43, z), 1.3, 'sun');
  }
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(6.18 + n * 0.49, 0.5, 1.53);
    H.line(
      R,
      [
        [x, y],
        [x - 2, y - 15]
      ],
      'blue',
      0.8
    );
    specimen(H, R, x, y, 0.34, 'teal', n === 2);
  }
  const [x, y] = H.p(7.31, 4.76, 1.12);
  oval(H, R, x, y, 7, 3, 'paper', 1);
  shape(
    H,
    R,
    [
      [x - 5, y],
      [x + 5, y],
      [x + 3, y - 7],
      [x - 3, y - 7]
    ],
    'sun',
    0.5,
    0.5
  );
  H.line(
    R,
    [
      [x - 4, y - 4],
      [x + 4, y - 4]
    ],
    'coral',
    0.8
  );
  panelFront(H, R, 9.59, 10.4, 1.76, 0.14, 1.44, 2, 'teal');
  taskLight(H, R, 9.91, 9.03, 1.75, 'sun', 0.6);
  recessedFrame(H, R, 'nw', 9.07, 1.93, 1.37, 1.71, 'sun', (P) => {
    for (let n = 0; n < 4; n++) {
      const u = 0.23 + (n % 2) * 0.8,
        z = 0.24 + Math.floor(n / 2) * 0.73;
      shape(H, R, [P(u, z), P(u + 0.62, z), P(u + 0.62, z + 0.56), P(u, z + 0.56)], 'paper', 1, 0.5);
      const [px, py] = P(u + 0.3, z + 0.33);
      oval(H, R, px, py, 5, 6, 'coral', 0.5);
      H.line(
        R,
        [
          [px - 7, py + 12],
          [px, py + 5],
          [px + 7, py + 12]
        ],
        'teal',
        1.6
      );
    }
  });
}

const room = world('new-york-washington-heights', 'Washington Heights · Window Wide', {
  floor: 'paper', tone: 1, pattern: 'tiles', accent: 'sun', wall: 'paper', wallTone: 1, height: 3.9, head: 20,
}, (H, R) => {
  for (const side of ['ne', 'nw']) {
    shape(H, R, wallRect(H, side, .03, 11.97, .03, .17, .04), 'teal', .6, .6);
    H.line(R, [wallPt(H, side, .06, 3.73, .04), wallPt(H, side, 11.94, 3.73, .04)], 'sun', 2);
  }
  shape(H, R, H.faceJ(.08, .35, 6.25, .96, 1.84), 'teal', .14, .6);
  for (let j = .46; j < 6.5; j += .5) H.line(R, [H.p(.1, j, .98), H.p(.1, j, 1.83)], 'paper', .8);
  for (let z = 1.11; z < 1.8; z += .24) H.line(R, [H.p(.11, .4, z), H.p(.11, 6.5, z)], 'paper', .8);
  box(H, R, .3, .46, 1.61, 5.77, .03, .98, 'teal', .65);
  for (let j = .64; j < 6.1; j += 1.09) {
    shape(H, R, H.faceJ(1.94, j, .91, .16, .88), 'teal', .58, .6);
    H.line(R, [H.p(1.97, j + .62, .64), H.p(1.97, j + .82, .64)], 'paper', 2);
  }
  box(H, R, .23, .4, 1.78, 5.92, 1.02, .11, 'paper', 1);
  shape(H, R, H.tile(.52, 1.8, 1.16, 1.54, 1.14), 'blue', .6, .8);
  shape(H, R, H.tile(.63, 1.92, .93, 1.28, 1.145), 'teal', .37, .6);
  stroke(H, R, [H.p(.58, 1.77, 1.15), H.p(.58, 1.77, 1.7), H.p(.93, 1.94, 1.72), H.p(1.05, 2.02, 1.52)], 'blue', 2.6);
  for (const j of [1.51, 2.08]) oval(H, R, ...H.p(.42, j, 1.2), 4.5, 3, 'sun', .68);
  box(H, R, .55, 3.7, 1.08, 1.3, 1.15, .11, 'teal', .47);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(1.13, 3.88 + k * .23, 1.25);
    oval(H, R, x, y - 6, 11, 13, 'paper', 1);
    H.line(R, [[x - 5, y + 3], [x + 5, y + 3]], 'teal', .6);
  }
  for (const i of [.61, 1.57]) H.line(R, [H.p(i, 3.72, 1.17), H.p(i, 4.94, 1.17)], 'blue', 1.5);
  const [kx, ky] = H.p(1.14, .98, 1.16);
  oval(H, R, kx, ky - 9, 12, 13, 'sun', .68);
  oval(H, R, kx, ky - 20, 7, 3, 'blue', .63);
  stroke(H, R, [[kx - 9, ky - 16], [kx - 16, ky - 28], [kx + 9, ky - 29], [kx + 12, ky - 17]], 'blue', 2);
  shape(H, R, [[kx + 10, ky - 12], [kx + 23, ky - 22], [kx + 26, ky - 18], [kx + 10, ky - 3]], 'sun', .71, .6);
  box(H, R, .15, 6.7, 1.78, 1.72, .03, 2.78, 'paper', 1);
  shape(H, R, H.faceJ(1.95, 6.8, 1.51, .15, 2.65), 'sun', .24, .7);
  H.line(R, [H.p(1.98, 6.78, 2.02), H.p(1.98, 8.35, 2.02)], 'blue', 1.1);
  H.line(R, [H.p(2.0, 8.15, 1.0), H.p(2.0, 8.15, 1.54)], 'teal', 3);
  for (const [j, z, ink] of [[7.02, 2.24, 'coral'], [7.58, 2.36, 'teal'], [7.74, 1.73, 'sun']]) shape(H, R, H.faceJ(2.0, j, .28, z, z + .24), ink, .66, .4);
  window(H, R);
  radiator(H, R);
  const [px, py] = H.p(5.42, .49, 1.49);
  plant(H, R, px, py, 1.05);
  table(H, R, 5.73, 3.95, 2.91, 1.69, .85, 'sun');
  shape(H, R, H.tile(5.78, 4.0, 2.81, 1.59, .98), 'paper', 1, .7);
  H.line(R, [H.p(6.61, 4.01, .99), H.p(6.61, 5.58, .99)], 'blue', .7);
  H.line(R, [H.p(7.81, 4.01, .99), H.p(7.81, 5.58, .99)], 'blue', .7);
  H.line(R, [H.p(6.64, 5.6, .82), H.p(6.89, 5.6, .3), H.p(7.17, 5.6, .82)], 'teal', 1.6);
  for (const [i, j] of [[7.92, 5.12], [6.34, 4.48]]) {
    oval(H, R, ...H.p(i, j, 1.015), 19, 8, 'paper', 1);
    oval(H, R, ...H.p(i, j, 1.025), 13, 5.2, 'sun', .16);
    H.line(R, [H.p(i + .48, j - .24, 1.03), H.p(i + .48, j + .18, 1.03)], 'blue', 1);
    for (let q = 0; q < 3; q++) H.line(R, [H.p(i + .44 + q * .04, j - .24, 1.03), H.p(i + .44 + q * .04, j - .12, 1.03)], 'blue', .7);
  }
  cup(H, R, 7.33, 4.3, 1.04, 'coral');
  for (let z = 1.0; z < 1.12; z += .035) oval(H, R, ...H.p(6.3, 5.2, z), 8, 4, 'teal', .58);
  cup(H, R, 6.3, 5.2, 1.13, 'sun', .76);
  box(H, R, 7.14, 4.72, .46, .33, 1.01, .07, 'paper', 1);
  box(H, R, 7.2, 4.77, .3, .22, 1.09, .12, 'sun', .57);
  shape(H, R, H.tile(8.06, 3.96, .44, .45, 1.01), 'teal', .51, .55);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(8.09 + q * .1, 3.99, 1.02), H.p(8.09 + q * .1, 4.35, 1.02)], 'paper', .75);
  chair(H, R, 8.64, 5.04, 'coral');
  chair(H, R, 5.21, 5.7, 'teal');
  box(H, R, 5.23, 5.72, .86, .77, .56, .19, 'sun', .54);
  for (const j of [9.54, 9.96]) {
    box(H, R, 1.1, j, .53, .28, .02, .17, 'blue', .81);
    box(H, R, 1.1, j + .08, .22, .2, .18, .19, 'blue', .71);
  }
  shape(H, R, H.faceJ(.09, 9.13, 2.41, .16, 3.09), 'teal', .62, .8);
  shape(H, R, H.faceJ(.13, 9.35, 1.95, .35, 2.85), 'paper', .88, .7);
  H.dot(...H.p(.17, 11.02, 1.35), 2.3, 'sun');
  box(H, R, 2.28, 8.0, 1.1, .77, .02, .72, 'coral', .67);
  stroke(H, R, [H.p(2.52, 8.4, .77), H.p(2.48, 8.4, 1.03), H.p(3.02, 8.4, 1.03), H.p(3.0, 8.4, .77)], 'blue', 2);
  shape(H, R, H.faceI(2.45, 8.79, .73, .18, .44), 'teal', .62, .6);
  H.line(R, [H.p(2.8, 8.8, .22), H.p(2.8, 8.8, .37)], 'paper', 1.3);
  box(H, R, 10.76, .23, .96, .47, 2.19, .12, 'sun', .56);
  box(H, R, 10.87, .29, .72, .35, 2.32, .47, 'teal', .65);
  const [rx, ry] = H.p(11.23, .66, 2.57);
  oval(H, R, rx - 5, ry, 6, 7, 'blue', .64);
  H.dot(rx + 10, ry + 1, 2.5, 'sun');
  H.line(R, [H.p(11.1, .39, 2.83), H.p(11.36, .39, 3.31)], 'blue', 1.1);
  const [fx, fy] = H.p(1.17, 5.61, 1.15);
  oval(H, R, fx, fy, 17, 7, 'teal', .64);
  for (const [x, y, ink] of [[-8, -7, 'coral'], [5, -8, 'sun'], [0, -1, 'sun']]) oval(H, R, fx + x, fy + y, 7, 6, ink, .74);
  const [hx, hy] = H.p(.2, 5.45, 2.85);
  H.line(R, [[hx, hy - 18], [hx, hy - 7]], 'blue', 2);
  oval(H, R, hx, hy + 3, 13, 13, 'blue', .72);
  oval(H, R, hx, hy + 3, 9, 9, 'teal', .5);
  shape(H, R, H.tile(4.15, 8.04, 3.43, 2.25, .02), 'coral', .19, .7);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(4.2, 8.14 + q * .4, .025), H.p(7.5, 8.14 + q * .4, .025)], 'paper', 1.3);
  washingtonHeightsDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 14);
  for (const [i, dir] of [[4.92, 1], [9.79, -1]]) {
    const sway = Math.sin(u * TAU) * .07;
    shape(H, R, [H.p(i, .31, 3.71), H.p(i + dir * .54, .31, 3.71), H.p(i + dir * (.38 + sway), .36, 1.7), H.p(i + dir * .04, .34, 1.7)], 'paper', .9, .7);
    for (let k = 0; k < 3; k++) H.line(R, [H.p(i + dir * (.12 + k * .13), .33, 3.64), H.p(i + dir * (.07 + k * .12 + sway * .5), .38, 1.75)], 'coral', .7, { tone: .45 });
  }
  H.at(9.04, 5.43, .08, HH => actor(HH, R, 9.04, 5.43, u * 14, 'newYorkHeightsToast', {
    face: 'sw', shirt: ['teal', .68], pants: ['blue', .74], hairStyle: 'short', skin: ['coral', .57], prop(h, r, p) {
      const [x, y] = p.nearHand;
      shape(h, r, [[x - 8, y + 4], [x - 9, y - 6], [x - 12, y - 11], [x - 8, y - 16], [x + 3, y - 16], [x + 7, y - 11], [x + 5, y - 5], [x + 5, y + 4]], 'coral', .53, .7);
      shape(h, r, [[x - 6, y + 2], [x - 6, y - 7], [x - 8, y - 11], [x - 6, y - 13], [x + 1, y - 13], [x + 4, y - 10], [x + 2, y - 5], [x + 2, y + 2]], 'sun', .48, .5);
      h.line(r, [[x - 4, y - 8], [x + 1, y - 5]], 'paper', 1.9);
    },
  }, .08, 1.4));
  H.at(5.67, 6.12, .4, HH => actor(HH, R, 5.67, 6.12, u * 14, 'newYorkHeightsPoint', {
    face: 'se', shirt: ['coral', .68], pants: ['blue', .67], hairStyle: 'curly', skin: ['coral', .46],
  }, .4, 1.33, 'child'));
});

room.loopSeconds = 14;
export default room;
