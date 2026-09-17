import { cornice, recessedFrame, panelFront, wallRack, taskLight } from '../joinery.js';
import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, framedPanel } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const watch = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: 4, lean: -3, al: 26, ar: 102, el: 36, er: 7 };
FIGURES.clips.hongKongAquariumTrace = { dur: 20, keys: [[0, watch], [.15, watch], [.37, { ...watch, ar: 138, er: 0, head: -6 }], [.55, { ...watch, ar: 109, er: 6, head: -2 }], [.69, { ...watch, ar: 50, er: 48, head: 3 }], [.83, { ...watch, ar: 50, er: 48, head: 3 }], [1, watch]] };

function mug(H, R, i, j, z, ink) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 6, y], [x + 6, y], [x + 6, y - 13], [x - 6, y - 13]], ink, .7, .7);
  oval(H, R, x, y - 13, 6, 2.3, 'paper', 1);
  stroke(H, R, [[x + 6, y - 11], [x + 12, y - 9], [x + 12, y - 3], [x + 6, y - 2]], 'blue', 1);
}

function fish(H, R, x, y, direction, ink, size = 1) {
  const p = (a, b) => [x + a * direction * size, y + b * size];
  shape(H, R, [p(-9, 0), p(-16, -6), p(-15, 6), p(-9, 1)], ink, .76, .6);
  oval(H, R, x, y, 11 * size * Math.max(.2, Math.abs(direction)), 6 * size, ink, .8);
  shape(H, R, [p(-1, -4), p(2, -10), p(6, -3)], ink, .7, .55);
  H.dot(...p(7, -2), 1.25 * size, 'blue', 1);
  H.line(R, [p(-5, 1), p(5, 1)], 'paper', .65);
}

function quarryBayWindowDetails(H, R) {
  drawerUnit(H, R, 10.05, 3.48, 1.42, 1.28, 1.66, 4, 'teal');
  shallowTray(H, R, 10.2, 3.63, 1.08, 0.94, 1.83, 'paper');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 10.43 + n * 0.29, 4.04, 2.04, 4, 13, ['sun', 'coral', 'teal'][n]);
  coiledLine(H, R, 10.72, 5.59, 0.04, 18, 'teal');
  const [x, y] = H.p(10.94, 6.32, 0.06);
  H.line(
    R,
    [
      [x, y],
      [x - 3, y - 46]
    ],
    'sun',
    2
  );
  oval(H, R, x - 3, y - 52, 10, 8, 'paper', 0.5);
  for (let n = -2; n < 3; n++)
    H.line(
      R,
      [
        [x - 11, y - 52 + n * 2],
        [x + 5, y - 52 + n * 2]
      ],
      'teal',
      0.65
    );
  shallowTray(H, R, 8.02, 7.18, 2.55, 0.85, 0.12, 'teal');
  foldedCloth(H, R, 8.21, 7.31, 1.15, 0.57, 0.32, 'paper', 'coral');
  liddedTin(H, R, 9.82, 7.64, 0.34, 9, 16, 'paper');
  shelfUnit(H, R, 4.56, 0.34, 2.64, 0.61, 2.98, [0], 'teal');
  for (let n = 0; n < 3; n++) boundBook(H, R, 4.74 + n * 0.71, 0.43, 0.61, 0.42, 3.12, ['coral', 'blue', 'sun'][n]);
  framedPanel(H, R, 7.6, 0.25, 1.06, 1.7, 0.83, 'coral');
  table(H, R, 3.88, 9.39, 2.17, 1.51, 0.67, 'sun');
  boundBook(H, R, 4.04, 9.55, 1.33, 0.98, 0.81, 'teal');
  const [gx, gy] = H.p(5.64, 10.37, 0.84);
  for (const dx of [-5, 5]) oval(H, R, gx + dx, gy, 4, 3, 'paper', 1);
  H.line(
    R,
    [
      [gx - 1, gy],
      [gx + 1, gy]
    ],
    'blue',
    0.9
  );
  satchel(H, R, 3.08, 10.53, 0.04, 'coral', 0.8);
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.1, 11.85, 3.6, 'teal');
  cornice(H, R, 'ne', 0.1, 11.85, 3.6, 'teal');
  panelFront(H, R, 0.34, 2.055, 3.59, 0.15, 0.77, 3, 'teal');
  wallRack(H, R, 'nw', 0.43, 2.15, 1.57, 1.67, 2, 'teal', (P, z, row) => {
    for (let n = 0; n < 5; n++) {
      const [x, y] = P(0.28 + n * 0.38, z + 0.14);
      if (row) {
        shape(
          H,
          R,
          [
            [x - 4, y],
            [x + 4, y],
            [x + 4, y - 15],
            [x - 4, y - 15]
          ],
          n % 2 ? 'paper' : 'coral',
          0.6,
          0.5
        );
        oval(H, R, x, y - 15, 4, 2, 'sun', 0.6);
      } else {
        oval(H, R, x, y, 6, 3, 'paper', 1);
        H.line(
          R,
          [
            [x - 5, y],
            [x - 4, y + 5],
            [x + 4, y + 5],
            [x + 5, y]
          ],
          'blue',
          0.6
        );
      }
    }
  });
  for (let n = 0; n < 7; n++) {
    const j = 3.72 + n * 0.45;
    H.line(R, [H.p(0.52, j, 0.74), H.p(2.8, j, 0.74)], n % 2 ? 'teal' : 'sun', 0.65);
  }
  for (let n = 0; n < 10; n++) {
    const i = 0.69 + n * 0.21;
    H.line(R, [H.p(i, 7.2, 0.71), H.p(i, 7.2, 0.53)], 'paper', 0.8);
  }
  recessedFrame(H, R, 'nw', 7.65, 2.87, 1.61, 1.61, 'sun', (P) => {
    shape(H, R, [P(0.12, 0.13), P(2.75, 0.13), P(2.75, 1.49), P(0.12, 1.49)], 'paper', 1, 0.5);
    for (let n = 0; n < 3; n++) {
      const u = 0.3 + n * 0.82;
      shape(H, R, [P(u, 0.32), P(u + 0.61, 0.32), P(u + 0.61, 1.24), P(u, 1.24)], n === 1 ? 'sun' : 'teal', 0.22, 0.5);
      const [x, y] = P(u + 0.3, 0.82);
      oval(H, R, x, y, 6, 7, 'coral', 0.5);
      H.line(
        R,
        [
          [x - 9, y + 17],
          [x - 5, y + 6],
          [x + 5, y + 6],
          [x + 9, y + 17]
        ],
        'blue',
        1.2
      );
    }
  });
  for (const i of [7.51, 10.77]) {
    H.line(R, [H.p(i, 7.09, 0.16), H.p(i, 8.12, 0.87)], 'blue', 1.8);
    H.line(R, [H.p(i, 7.09, 0.18), H.p(i, 8.12, 0.18)], 'teal', 2);
  }
  box(H, R, 7.74, 7.24, 2.67, 0.74, 0.24, 0.08, 'teal', 0.65);
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(8.01 + n * 0.64, 7.59, 0.39);
    shape(
      H,
      R,
      [
        [x - 5, y],
        [x + 5, y],
        [x + 5, y - 14],
        [x - 5, y - 14]
      ],
      n % 2 ? 'paper' : 'sun',
      0.65,
      0.6
    );
    oval(H, R, x, y - 14, 5, 2, 'teal', 0.6);
    H.line(
      R,
      [
        [x - 4, y - 7],
        [x + 4, y - 7]
      ],
      'coral',
      1.1
    );
  }
  stroke(H, R, [H.p(10.17, 7.12, 2.67), H.p(10.5, 7.03, 2.64), H.p(10.56, 7.09, 1.23), H.p(10.03, 7.42, 0.63)], 'blue', 1.1);
  const [x, y] = H.p(10.03, 7.42, 0.59);
  oval(H, R, x, y, 7, 3, 'teal', 0.5);
  H.line(
    R,
    [
      [x - 6, y],
      [x - 6, y - 11],
      [x + 6, y - 11],
      [x + 6, y]
    ],
    'blue',
    0.7
  );
  taskLight(H, R, 3.63, 9.71, 0.81, 'sun', 0.6);
  const [px, py] = H.p(5.2, 10.16, 0.91);
  oval(H, R, px, py, 7, 4, 'paper', 1);
  H.line(
    R,
    [
      [px + 5, py + 2],
      [px + 12, py + 10]
    ],
    'blue',
    2
  );
  oval(H, R, px, py, 4, 2.5, 'teal', 0.15);
  for (let n = 0; n < 4; n++) {
    const [ax, ay] = H.p(9.93 + n * 0.21, 10.48, 1.04);
    H.line(
      R,
      [
        [ax, ay],
        [ax + 7, ay - 9]
      ],
      'coral',
      0.8
    );
  }
}

const room = world('hong-kong-quarry-bay-window', 'Quarry Bay · One window still awake', { floor: 'paper', tone: .5, wall: 'paper', wallTone: .88, height: 3.82, head: 20, pattern: 'tiles', accent: 'teal' }, (H, R) => {
  const window = H.faceI(4.62, .07, 6.97, 1.47, 3.54);
  shape(H, R, window, 'blue', .82);
  H.clip(window, () => {
    for (let q = 0; q < 5; q++) {
      const i = 4.77 + q * 1.35;
      shape(H, R, H.faceI(i, .08, 1.15, 1.39, 3.82), q % 2 ? 'blue' : 'teal', .64, .5);
      for (let n = 0; n < 3; n++) for (let row = 0; row < 6; row++) {
        const z = 1.54 + row * .34;
        shape(H, R, H.faceI(i + .09 + n * .34, .09, .2, z, z + .21), (q + n + row) % 5 === 0 ? 'sun' : 'paper', (q + n + row) % 5 === 0 ? .8 : .32, .35);
        if ((q + n + row) % 3 === 0) box(H, R, i + .05 + n * .34, .1, .28, .12, z - .1, .1, 'paper', .67);
      }
    }
  });
  for (const i of [4.62, 6.94, 9.26, 11.59]) H.line(R, [H.p(i, .12, 1.47), H.p(i, .12, 3.55)], 'paper', 3.1);
  for (const z of [1.46, 2.36, 3.55]) H.line(R, [H.p(4.62, .12, z), H.p(11.59, .12, z)], 'paper', 2.6);
  box(H, R, 4.5, .15, 7.18, .34, 1.34, .12, 'teal', .47);
  for (let q = 0; q < 5; q++) H.line(R, [H.p(4.83 + q * .29, .16, 2.54), H.p(5.11 + q * .29, .16, 3.03)], 'paper', .8, { tone: .7 });
  box(H, R, .28, .4, 3.7, 1.62, .02, .95, 'teal', .45);
  for (const i of [.35, 1.55, 2.75]) {
    shape(H, R, H.faceI(i, 2.03, 1.05, .12, .83), 'paper', .87, .7);
    H.line(R, [H.p(i + .63, 2.06, .73), H.p(i + .9, 2.06, .73)], 'blue', 1.4);
  }
  box(H, R, .23, .36, 3.81, 1.72, .98, .12, 'paper', 1);
  shape(H, R, H.tile(.5, .66, 1.15, .94, 1.12), 'blue', .52);
  shape(H, R, H.tile(.63, .77, .9, .72, 1.14), 'teal', .46);
  stroke(H, R, [H.p(.9, .54, 1.11), H.p(.9, .54, 1.59), H.p(1.13, .74, 1.64), H.p(1.13, .9, 1.44)], 'blue', 2.4);
  box(H, R, 2.35, .63, .92, .84, 1.12, .12, 'blue', .69);
  const [kx, ky] = H.p(2.81, 1.06, 1.3);
  oval(H, R, kx, ky - 9, 12, 14, 'paper', 1);
  oval(H, R, kx, ky - 22, 10, 4, 'teal', .5);
  stroke(H, R, [[kx - 10, ky - 12], [kx - 19, ky - 18], [kx - 18, ky - 6], [kx - 9, ky - 3]], 'blue', 1.8);
  shape(H, R, [[kx + 10, ky - 12], [kx + 19, ky - 18], [kx + 14, ky - 3]], 'paper', 1, .7);
  mug(H, R, 3.52, 1.7, 1.12, 'coral');
  box(H, R, .3, 3.12, .74, 3.6, 1.75, .12, 'teal', .5);
  for (let q = 0; q < 9; q++) box(H, R, .4, 3.3 + q * .34, .53, .24, 1.89, .39 + q % 3 * .11, ['coral', 'paper', 'sun'][q % 3], .63);
  box(H, R, .35, 3.3, 2.59, 4.1, .03, .48, 'teal', .54);
  box(H, R, .4, 3.4, 2.49, 3.93, .51, .17, 'paper', 1);
  shape(H, R, H.tile(.51, 4.46, 2.24, 2.75, .7), 'coral', .49);
  for (let q = 0; q < 8; q++) H.line(R, [H.p(.53, 4.56 + q * .35, .72), H.p(2.74, 4.56 + q * .35, .72)], 'paper', 1.4, { tone: .75 });
  box(H, R, .73, 3.66, 1.85, .67, .69, .16, 'paper', 1);
  box(H, R, .35, 3.22, 2.63, .2, .49, .63, 'teal', .53);
  box(H, R, 3.22, 4.58, .95, .85, .02, .63, 'paper', .88);
  mug(H, R, 3.75, 4.98, .66, 'teal');
  box(H, R, 3.31, 4.75, .33, .48, .67, .05, 'blue', .65);
  box(H, R, 3.24, 4.66, .24, .43, .08, .16, 'coral', .59);
  shape(H, R, H.faceJ(.06, 8.31, 2.78, .28, 3.27), 'blue', .74);
  shape(H, R, H.faceJ(.08, 8.48, 2.47, .4, 3.12), 'coral', .47);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(.1, 8.57 + q * .27, .52), H.p(.1, 8.57 + q * .27, 3.01)], 'blue', .8);
  const [hx, hy] = H.p(.16, 10.67, 1.52);
  H.line(R, [[hx, hy], [hx + 8, hy + 4]], 'sun', 2.4);
  box(H, R, .49, 9.1, 1.46, .74, .02, .37, 'paper', .91);
  for (const j of [9.23, 9.52]) {
    oval(H, R, ...H.p(1.07, j, .43), 7, 4, 'teal', .62);
    H.line(R, [H.p(.86, j, .43), H.p(1.16, j, .43)], 'sun', .9);
  }
  const [tx, ty] = H.p(2.45, 9.7, .03);
  shape(H, R, [[tx - 12, ty], [tx + 14, ty], [tx + 11, ty - 26], [tx - 11, ty - 26]], 'sun', .65);
  stroke(H, R, [[tx - 7, ty - 25], [tx - 6, ty - 38], [tx + 7, ty - 38], [tx + 8, ty - 25]], 'blue', 1.2);
  table(H, R, 7.42, 6.9, 3.55, 1.45, .94, 'teal');
  box(H, R, 7.51, 6.98, 3.37, 1.28, 1.09, .09, 'blue', .8);
  shape(H, R, H.faceI(7.51, 8.25, 3.37, 1.19, 2.59), 'teal', .21, .8);
  shape(H, R, H.faceJ(10.88, 6.98, 1.28, 1.19, 2.59), 'teal', .29, .8);
  shape(H, R, H.tile(7.51, 6.98, 3.37, 1.28, 2.59), 'teal', .1, .7);
  for (const j of [6.98, 8.25]) H.line(R, [H.p(7.51, j, 2.61), H.p(10.88, j, 2.61)], 'blue', 2.5);
  for (const i of [7.51, 10.88]) H.line(R, [H.p(i, 6.98, 2.61), H.p(i, 8.25, 2.61)], 'blue', 2.2);
  box(H, R, 9.45, 7.02, .65, .28, 2.64, .12, 'blue', .75);
  H.line(R, [H.p(9.75, 7.12, 2.64), H.p(10.43, 7.11, 2.64), H.p(10.43, 7.11, 1.3)], 'blue', 1.5);
  for (let q = 0; q < 26; q++) {
    const i = 7.69 + q % 13 * .235, z = 1.25 + Math.floor(q / 13) * .09;
    oval(H, R, ...H.p(i, 8.26, z), 2.8, 1.9, q % 3 ? 'sun' : 'coral', .5);
  }
  for (const [i, h] of [[8.05, .66], [8.3, .82], [10.13, .62], [10.5, 1.05]]) {
    for (let q = 0; q < 3; q++) stroke(H, R, [H.p(i, 8.27, 1.3), H.p(i + (q - 1) * .12, 8.27, 1.3 + h * .6), H.p(i + (q - 1) * .2, 8.27, 1.3 + h)], 'teal', 2.6, .74);
  }
  shape(H, R, [H.p(8.75, 8.27, 1.32), H.p(8.94, 8.27, 1.59), H.p(9.27, 8.27, 1.68), H.p(9.58, 8.27, 1.31)], 'blue', .42, .7);
  box(H, R, 6.93, 7.82, .91, .77, .49, .12, 'coral', .6);
  for (const i of [7.01, 7.64]) for (const j of [7.89, 8.44]) box(H, R, i, j, .11, .1, .03, .46, 'blue', .6);
  box(H, R, 9.65, 9.66, 1.25, 1.08, .03, .56, 'paper', 1);
  shape(H, R, H.tile(9.78, 9.8, .98, .82, .61), 'teal', .36);
  for (let q = 0; q < 4; q++) box(H, R, 9.9, 9.9, .71, .6, .63 + q * .065, .05, q % 2 ? 'paper' : 'coral', .65);
  plant(H, R, ...H.p(10.6, 1.33, .03), 1.3);
  box(H, R, 5.69, 1.02, 1.07, .73, .04, .44, 'paper', .85);
  for (let q = 0; q < 8; q++) H.line(R, [H.p(5.8 + q * .11, 1.76, .13), H.p(5.8 + q * .11, 1.76, .42)], 'blue', .7);
  quarryBayWindowDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 20), pane = H.faceI(7.55, 8.27, 3.29, 1.27, 2.53);
  H.clip(pane, () => {
    const a = u * TAU;
    const [x, y] = H.p(9.1 + Math.cos(a) * .91, 8.28, 1.91 + Math.sin(a) * .24);
    fish(H, R, x, y, Math.tanh(-Math.sin(a) * 5), 'coral', .68);
    const [fx, fy] = H.p(8.97 + Math.cos(a + 2.4) * .72, 8.28, 2.23 + Math.sin(a + 2.4) * .13);
    fish(H, R, fx, fy, Math.tanh(-Math.sin(a + 2.4) * 5), 'sun', .47);
    for (let q = 0; q < 4; q++) {
      const bubble = cycle(t + q * 5, 20), p = H.p(10.4 + Math.sin(bubble * TAU) * .055, 8.28, 1.35 + bubble * 1.15);
      H.opacity(Math.sin(bubble * Math.PI), () => H.outline(R, Array.from({ length: 14 }, (_, k) => [p[0] + Math.cos(k * TAU / 14) * 2, p[1] + Math.sin(k * TAU / 14) * 2]), 'paper', .7));
    }
  });
  H.line(R, [H.p(7.79, 8.3, 1.65), H.p(8.02, 8.3, 2.38)], 'paper', 1.1, { tone: .5 });
  actor(H, R, 7.38, 8.22, t, 'hongKongAquariumTrace', { shirt: ['paper', 1], pants: ['teal', .6], hairStyle: 'bun', face: 'se', prop(h, r, p) {
    h.line(r, [p.nearHand, [p.nearHand[0] + 6, p.nearHand[1] - 2]], 'coral', 1.5);
  } }, .03, 1.28);
  const [x, y] = H.p(9.2, 8.52, 1.14);
  H.glow(x, y, 51, 18, 'teal', .16);
});
room.loopSeconds = 20;
export default room;
