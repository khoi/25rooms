import { cornice, panelFront, wallRack, hangingRail, taskLight } from '../joinery.js';
import { drawerUnit, shallowTray, foldedCloth, boundBook, satchel, framedPanel, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, ell, windowOn, plant } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 53, el: 75, ar: 35, er: 70, head: 6 };
const reach = { ...seated, ar: 153, er: 8, head: -17, lean: 3 };
FIGURES.clips.newYorkCurtain = { dur: 18, keys: [[0, seated], [.13, seated], [.23, reach], [.37, { ...reach, ar: 90, er: 14 }], [.53, { ...reach, ar: 90, er: 14 }], [.7, reach], [.83, seated], [1, seated]] };
const ease = value => { const q = Math.max(0, Math.min(1, value)); return q * q * (3 - 2 * q); };

function cup(H, R, x, y) {
  shape(H, R, [[x - 5, y - 10], [x + 5, y - 10], [x + 5, y + 1], [x - 4, y + 2]], 'sun', .72, .7);
  oval(H, R, x, y - 10, 5, 2, 'paper', 1);
  oval(H, R, x, y - 10, 3, 1.2, 'blue', .56);
  stroke(H, R, [[x + 5, y - 8], [x + 10, y - 8], [x + 10, y - 1], [x + 5, y]], 'blue', 1.1);
}

function curtain(H, R, open) {
  const width = 1.94 - open * 1.36;
  for (const side of [-1, 1]) {
    const left = side < 0 ? 7.13 : 11.23 - width;
    const poly = [H.p(left, .105, 3.64), H.p(left + width, .105, 3.64), H.p(left + width + .06, .18, .99), H.p(left + .02, .18, 1.03)];
    shape(H, R, poly, 'blue', .77, .75);
    for (let n = 1; n < 6; n++) {
      const i = left + width * n / 6;
      stroke(H, R, [H.p(i, .12, 3.61), H.p(i - .05, .2, 2.4), H.p(i + .05, .19, 1.06)], n % 2 ? 'teal' : 'paper', .9, .35);
    }
    for (let n = 0; n < 6; n++) oval(H, R, ...H.p(left + width * (n + .3) / 6, .115, 3.67), 2, 3, 'sun', .64);
  }
}

function lowerEastBedroomDetails(H, R) {
  drawerUnit(H, R, 7.34, 7.96, 2.13, 1.43, 1.58, 4, 'teal');
  boundBook(H, R, 7.53, 8.17, 1.23, 0.99, 1.75, 'coral');
  framedPanel(H, R, 8.9, 8.21, 0.48, 1.77, 0.7, 'sun');
  const [x, y] = H.p(8.38, 8.77, 1.96);
  for (const dx of [-5, 5]) oval(H, R, x + dx, y, 4, 3, 'paper', 1);
  H.line(
    R,
    [
      [x - 1, y],
      [x + 1, y]
    ],
    'blue',
    1
  );
  for (const i of [9.8, 11.25]) H.line(R, [H.p(i, 6.43, 0.04), H.p(i, 6.43, 2.63)], 'blue', 2.4);
  H.line(R, [H.p(9.8, 6.43, 2.63), H.p(11.25, 6.43, 2.63)], 'sun', 2.7);
  for (let n = 0; n < 3; n++) {
    const [qx, qy] = H.p(10.11 + n * 0.43, 6.43, 2.31);
    stroke(
      H,
      R,
      [
        [qx - 9, qy],
        [qx, qy - 10],
        [qx + 9, qy],
        [qx - 9, qy]
      ],
      'blue',
      1
    );
    shape(
      H,
      R,
      [
        [qx - 7, qy],
        [qx + 7, qy],
        [qx + 13, qy + 10],
        [qx + 8, qy + 14],
        [qx + 9, qy + 41],
        [qx - 9, qy + 41],
        [qx - 8, qy + 14],
        [qx - 13, qy + 10]
      ],
      ['coral', 'paper', 'teal'][n],
      0.55,
      0.7
    );
    if (n === 0)
      H.line(
        R,
        [
          [qx + 6, qy + 10],
          [qx + 11, qy + 10]
        ],
        'paper',
        2
      );
  }
  shallowTray(H, R, 9.72, 6.64, 1.66, 0.77, 0.03, 'teal');
  for (const i of [10.15, 10.91]) oval(H, R, ...H.p(i, 6.99, 0.22), 10, 4, 'blue', 0.6);
  slattedCrate(H, R, 2.2, 9.86, 1.84, 1.25, 0.02, 0.78, 'sun');
  for (let n = 0; n < 3; n++) foldedCloth(H, R, 2.36, 10.01, 1.49, 0.91, 0.87 + n * 0.12, ['paper', 'coral', 'teal'][n], 'paper');
  satchel(H, R, 6.7, 10.94, 0.04, 'blue', 0.8);
  framedPanel(H, R, 5.79, 0.18, 1.12, 1.73, 1.09, 'coral');
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.1, 11.8, 3.67, 'teal');
  cornice(H, R, 'ne', 0.1, 11.8, 3.67, 'teal');
  for (const [i, j] of [
    [0.55, 0.7],
    [5.12, 0.7],
    [0.55, 5.15],
    [5.12, 5.15]
  ]) {
    for (const z of [0.17, 1.99, 2.39]) H.dot(...H.p(i + 0.1, j + 0.17, z), 1.6, 'sun');
    H.line(R, [H.p(i, j, 1.64), H.p(i + (i < 1 ? 0.52 : -0.52), j, 2.2)], 'blue', 1.7);
  }
  for (let n = 0; n < 6; n++) {
    const i = 0.68 + n * 0.69;
    H.line(R, [H.p(i, 5.49, 2.3), H.p(i + 0.41, 5.49, 2.3)], 'sun', 0.7);
  }
  for (let n = 0; n < 9; n++) {
    const j = 1.28 + n * 0.4;
    H.line(R, [H.p(0.62, j, 2.72), H.p(4.91, j, 2.72)], n % 3 ? 'teal' : 'sun', 0.65);
  }
  for (let n = 0; n < 4; n++) H.line(R, [H.p(2.31 + n * 0.58, 4.75, 2.75), H.p(2.31 + n * 0.58, 5.04, 2.68)], 'paper', 1.4);
  taskLight(H, R, 3.72, 1.27, 0.97, 'coral', -0.65);
  for (let n = 0; n < 3; n++) {
    const i = 1.04 + n * 0.94;
    shape(H, R, H.faceI(i, 2.185, 0.78, 0.49, 0.76), 'sun', 0.35, 0.6);
    H.line(R, [H.p(i + 0.2, 2.2, 0.64), H.p(i + 0.6, 2.2, 0.64)], 'blue', 1.4);
  }
  wallRack(H, R, 'nw', 5.9, 2.05, 2.58, 0.93, 1, 'teal', (P, z) => {
    for (let n = 0; n < 6; n++) {
      const u = 0.24 + n * 0.28;
      shape(
        H,
        R,
        [P(u, z + 0.05), P(u + 0.18, z + 0.05), P(u + 0.18, z + 0.48 + (n % 2) * 0.12), P(u, z + 0.48 + (n % 2) * 0.12)],
        ['coral', 'paper', 'sun'][n % 3],
        0.7,
        0.5
      );
      H.line(R, [P(u + 0.02, z + 0.36), P(u + 0.16, z + 0.36)], 'teal', 1);
    }
  });
  panelFront(H, R, 0.43, 7.815, 2.52, 0.19, 0.83, 3, 'coral');
  hangingRail(H, R, 'nw', 8.61, 2.13, 2.7, 4, (P, u, n) => {
    const [x, y] = P(u, -0.14);
    if (n < 2) {
      shape(
        H,
        R,
        [
          [x - 8, y + 5],
          [x - 4, y],
          [x + 4, y],
          [x + 8, y + 5],
          [x + 6, y + 33],
          [x - 6, y + 33]
        ],
        n ? 'teal' : 'coral',
        0.55,
        0.6
      );
      H.line(
        R,
        [
          [x, y + 2],
          [x, y + 29]
        ],
        'paper',
        0.8
      );
    } else {
      H.outline(R, ell(x, y + 8, 5, 7), 'blue', 1.1);
      shape(
        H,
        R,
        [
          [x - 8, y + 12],
          [x + 8, y + 12],
          [x + 8, y + 29],
          [x - 8, y + 29]
        ],
        'sun',
        0.5,
        0.6
      );
    }
  });
  const [x, y] = H.p(8.31, 8.69, 1.76);
  shape(
    H,
    R,
    [
      [x - 10, y],
      [x + 10, y],
      [x + 10, y - 9],
      [x - 10, y - 9]
    ],
    'paper',
    1,
    0.6
  );
  for (let n = 0; n < 6; n++)
    H.line(
      R,
      [
        [x - 8 + n * 3, y - 7],
        [x - 8 + n * 3, y - 2]
      ],
      'blue',
      0.7
    );
  H.dot(x + 6, y - 12, 3, 'coral');
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(5.4 + n * 0.23, 10.73, 0.78);
    H.line(
      R,
      [
        [px - 4, py],
        [px + 4, py - 3]
      ],
      'paper',
      0.7
    );
  }
  const [px, py] = H.p(10.93, 4.23, 0.94);
  oval(H, R, px, py, 6, 4, 'paper', 1);
  H.line(
    R,
    [
      [px + 4, py + 2],
      [px + 12, py + 9]
    ],
    'blue',
    2
  );
  oval(H, R, px, py, 4, 2.5, 'teal', 0.17);
}

const room = world('new-york-lower-east-bedroom', 'Lower East Side · The Other Morning', {
  floor: 'paper', tone: .85, wall: 'paper', wallTone: .74, pattern: 'boards', height: 4.1, head: 20,
}, (H, R) => {
  for (const z of [.18, 3.97]) H.line(R, [H.p(.05, .06, z), H.p(11.92, .06, z)], 'blue', 2, { tone: .6 });
  for (const z of [.18, 3.97]) H.line(R, [H.p(.06, .05, z), H.p(.06, 11.92, z)], 'blue', 2, { tone: .6 });
  windowOn(H, R, 'ne', 9.18, 1.1, 4.02, 2.42, { sky: 'sun', skyTone: .19, inside() {
    for (let n = 0; n < 4; n++) {
      const i = 7.35 + n * .98;
      shape(H, R, H.faceI(i, -.06, .8, 1.13, 2.51 + n % 2 * .42), 'coral', .4, .5);
      for (let k = 0; k < 3; k++) shape(H, R, H.faceI(i + .12, -.07, .24, 1.36 + k * .43, 1.63 + k * .43), 'blue', .63, .4);
    }
    for (const i of [7.7, 10.48]) H.line(R, [H.p(i, -.08, 1.15), H.p(i, -.08, 3.5)], 'blue', 1.7);
    for (const z of [1.54, 2.75]) {
      H.line(R, [H.p(7.2, -.1, z), H.p(11.2, -.1, z)], 'blue', 2.3);
      for (let i = 7.3; i < 11.2; i += .3) H.line(R, [H.p(i, -.1, z), H.p(i, -.1, z + .37)], 'blue', .8);
    }
    H.line(R, [H.p(7.7, -.12, 1.13), H.p(10.48, -.12, 2.75)], 'blue', 2);
  } });
  H.line(R, [H.p(6.95, .12, 3.77), H.p(11.43, .12, 3.77)], 'blue', 2.4);
  for (const i of [6.89, 11.49]) oval(H, R, ...H.p(i, .12, 3.77), 3.5, 3.5, 'sun', .7);
  box(H, R, 7.14, .36, 3.76, .52, .12, .65, 'paper', 1);
  for (let i = 7.29; i < 10.9; i += .26) {
    box(H, R, i, .42, .12, .37, .24, .58, 'paper', 1);
    H.line(R, [H.p(i + .06, .8, .31), H.p(i + .06, .8, .73)], 'blue', .8);
  }
  H.line(R, [H.p(10.96, .6, .23), H.p(11.38, .6, .23), H.p(11.38, .6, .57)], 'blue', 1.8);
  oval(H, R, ...H.p(11.39, .6, .6), 5, 3, 'coral', .75);
  table(H, R, .84, 1.0, 3.32, 1.16, .8, 'sun');
  box(H, R, 1.03, 1.19, 1.68, .92, .95, .08, 'blue', .75);
  shape(H, R, H.faceI(1.12, 1.21, 1.45, 1.05, 1.74), 'teal', .32);
  shape(H, R, H.faceI(1.24, 1.23, 1.19, 1.15, 1.61), 'blue', .67, .6);
  for (let n = 0; n < 4; n++) box(H, R, 3.0, 1.25, .72, .55, .95 + n * .07, .06, n % 2 ? 'coral' : 'paper', .82);
  box(H, R, 1.03, 3.28, 1.09, .87, .46, .13, 'teal', .6);
  box(H, R, 1.03, 4.02, 1.09, .12, .59, .67, 'teal', .64);
  for (const i of [1.14, 1.96]) for (const j of [3.39, 4.02]) box(H, R, i, j, .08, .08, 0, .46, 'blue', .6);
  for (const [i, j] of [[.46, .62], [5.13, .62], [.46, 5.1], [5.13, 5.1]]) box(H, R, i, j, .18, .18, 0, 2.53, 'teal', .74);
  box(H, R, .35, .51, 5.02, 4.98, 2.18, .23, 'teal', .66);
  box(H, R, .55, .72, 4.46, 4.34, 2.42, .26, 'paper', 1);
  shape(H, R, H.tile(.69, 2.1, 4.15, 2.74, 2.7), 'coral', .66);
  for (let j = 2.19; j < 4.8; j += .4) H.line(R, [H.p(.72, j, 2.71), H.p(4.8, j, 2.71)], 'paper', 1.4, { tone: .85 });
  for (const i of [1.05, 3.12]) {
    box(H, R, i, .9, 1.42, .87, 2.7, .13, 'paper', 1);
    shape(H, R, H.tile(i + .09, .99, 1.23, .65, 2.85), 'teal', .18, .6);
  }
  box(H, R, .42, .58, .13, 4.86, 2.64, .71, 'teal', .5);
  for (const i of [.5, 1.54, 2.62, 3.68]) box(H, R, i, 5.24, .12, .12, 2.43, .73, 'blue', .72);
  box(H, R, .45, 5.2, 3.71, .18, 3.12, .12, 'teal', .7);
  for (const i of [4.41, 5.11]) H.line(R, [H.p(i, 5.68, .08), H.p(i, 4.68, 2.51)], 'blue', 3.2);
  for (let n = 0; n < 6; n++) H.line(R, [H.p(4.41, 5.6 - n * .16, .26 + n * .37), H.p(5.11, 5.6 - n * .16, .26 + n * .37)], 'sun', 3.1);
  box(H, R, .35, 6.56, 2.7, 1.23, 0, 1.17, 'coral', .47);
  for (const z of [.08, .4, .72]) {
    shape(H, R, H.faceI(.47, 7.81, 2.44, z, z + .28), 'paper', .9, .65);
    H.line(R, [H.p(1.38, 7.84, z + .15), H.p(1.99, 7.84, z + .15)], 'blue', 1.7);
  }
  box(H, R, .64, 6.77, 1.26, .66, 1.2, .15, 'teal', .65);
  shape(H, R, H.tile(.74, 6.78, 1.04, .24, 1.36), 'blue', .75, .5);
  H.line(R, [H.p(.73, 7.04, 1.37), H.p(1.79, 7.04, 1.37)], 'paper', 1.1);
  const [kx, ky] = H.p(2.53, 7.21, 1.2);
  oval(H, R, kx, ky, 5, 3, 'blue', .7);
  H.line(R, [[kx + 4, ky], [kx + 14, ky + 5]], 'blue', 1.6);
  H.line(R, [[kx + 10, ky + 3], [kx + 9, ky + 7]], 'blue', 1.6);
  for (let n = 0; n < 5; n++) box(H, R, .32, 8.51 + n * .31, 1.15, .23, .04, .36, n % 2 ? 'paper' : 'teal', .67);
  for (const i of [3.5, 4.15]) {
    const [x, y] = H.p(i, 8.03, .045);
    shape(H, R, [[x - 6, y - 5], [x + 4, y - 5], [x + 10, y + 5], [x - 5, y + 7]], 'blue', .75, .7);
    H.line(R, [[x - 2, y - 1], [x + 5, y + 2]], 'paper', .8);
  }
  table(H, R, 8.54, 3.0, 1.08, .97, .55, 'coral');
  box(H, R, 8.54, 3.84, 1.08, .12, .67, .62, 'coral', .48);
  table(H, R, 10.29, 3.85, 1.12, .95, .64, 'teal');
  box(H, R, 10.46, 4.06, .7, .43, .79, .12, 'paper', 1);
  const [ax, ay] = H.p(10.78, 4.25, 1.01);
  oval(H, R, ax, ay, 8, 8, 'sun', .74);
  H.line(R, [[ax, ay - 5], [ax, ay], [ax + 4, ay + 2]], 'blue', 1);
  plant(H, R, ...H.p(10.88, 6.3, .08), 1.0);
  shape(H, R, H.tile(6.03, 6.73, 3.87, 3.69, .025), 'sun', .19);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(6.13 + n * .57, 6.88, .03), H.p(6.13 + n * .57, 10.29, .03)], 'coral', .8, { tone: .35 });
  box(H, R, 5.2, 10.3, 1.24, .92, 0, .63, 'teal', .54);
  shape(H, R, H.tile(5.37, 10.44, .92, .6, .65), 'paper', 1);
  shape(H, R, H.faceJ(.09, 9.99, 1.52, 1.53, 2.62), 'sun', .26);
  const [px, py] = H.p(.12, 10.73, 2.09);
  oval(H, R, px, py, 13, 11, 'coral', .57);
  shape(H, R, [[px - 18, py + 17], [px, py - 2], [px + 20, py + 14]], 'teal', .54, .6);
  lowerEastBedroomDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 18), open = ease((u - .23) / .14) * (1 - ease((u - .53) / .17));
  curtain(H, R, open);
  H.opacity(open * .15, () => H.tint([H.p(7.9, .8, .025), H.p(10.48, .8, .025), H.p(9.22, 6.1, .025), H.p(5.4, 5.15, .025)], 'sun', .65));
  actor(H, R, 9.04, 3.33, t, 'newYorkCurtain', {
    shirt: ['paper', 1], pants: ['teal', .55], hairStyle: 'short', face: 'ne',
    prop(HH, RR, points) {
      cup(HH, RR, points.farHand[0], points.farHand[1] + 2);
      const anchor = HH.p(9.38, .2, 3.68), parked = HH.p(9.52, .3, 1.32);
      const hold = ease((u - .13) / .1) * (1 - ease((u - .7) / .13));
      const end = [parked[0] * (1 - hold) + points.nearHand[0] * hold, parked[1] * (1 - hold) + points.nearHand[1] * hold];
      stroke(HH, RR, [anchor, [anchor[0] + 3, (anchor[1] + end[1]) / 2], end], 'sun', 1.4, .8);
      oval(HH, RR, end[0], end[1] + 4, 2.5, 4, 'sun', .73);
    },
  }, .1, 1.25);
  const [x, y] = H.p(5.89, 10.84, .73);
  shape(H, R, [[x - 12, y], [x + 10, y - 3], [x + 11, y + 7 + Math.sin(u * Math.PI * 2) * 1.5], [x - 10, y + 10]], 'paper', 1, .6);
});
room.loopSeconds = 18;
export default room;
