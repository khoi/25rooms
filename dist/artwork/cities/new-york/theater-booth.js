import { cornice, wallRack, taskLight, caster } from '../joinery.js';
import { drawerUnit, shallowTray, foldedCloth, coiledLine, boundBook, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: 12, lean: -7, al: 55, ar: 69, el: 45, er: 30 };
FIGURES.clips.newYorkLightingCue = { dur: 12, keys: [[0, seated], [.16, seated], [.34, { ...seated, ar: 82, er: 15, head: -12 }], [.66, { ...seated, ar: 82, er: 15, head: -12 }], [.86, seated], [1, seated]] };

function stage(H, R, intensity = 0) {
  const frame = H.faceI(1.4, .08, 8.8, 1.55, 3.6);
  shape(H, R, frame, 'blue', .95);
  H.clip(frame, () => {
    shape(H, R, H.faceI(2, .1, 7.5, 1.7, 2.42), 'teal', .5, .7);
    for (let n = 0; n < 8; n++) H.line(R, [H.p(2 + n, .13, 1.7), H.p(2 + n, .13, 2.4)], 'paper', .55, { tone: .22 });
    for (const [i, w] of [[1.56, 1.1], [8.8, 1.2]]) {
      shape(H, R, H.faceI(i, .14, w, 1.62, 3.5), 'coral', .78, .8);
      for (let n = 0; n < 4; n++) H.line(R, [H.p(i + .15 + n * .27, .15, 1.7), H.p(i + .15 + n * .27, .15, 3.45)], 'blue', 1, { tone: .5 });
    }
    shape(H, R, H.faceI(1.5, .17, 8.6, 3.2, 3.51), 'coral', .7, .7);
    for (const i of [3.4, 6.9]) {
      shape(H, R, H.faceI(i, .19, .35, 2.87, 3.16), 'blue', .9, .5);
      H.tint([H.p(i + .15, .2, 2.93), H.p(i - .8, .2, 1.77), H.p(i + 2.1, .2, 1.77)], 'sun', .08 + intensity * .38);
      oval(H, R, ...H.p(i + .6, .21, 1.91), 27, 7, 'sun', .12 + intensity * .56);
    }
    shape(H, R, H.faceI(5.2, .24, .44, 1.8, 2.2), 'paper', .75, .5);
    H.line(R, [H.p(5.13, .25, 1.8), H.p(5.73, .25, 1.8)], 'blue', 1);
  });
  box(H, R, 1.33, .02, 8.95, .31, 1.47, .09, 'paper', .8);
  for (const i of [1.35, 5.8, 10.22]) H.line(R, [H.p(i, .29, 1.55), H.p(i, .29, 3.62)], 'teal', 2.5);
}

function consoleDesk(H, R) {
  for (const i of [3.0, 8.25]) box(H, R, i, 3.5, .37, 2.6, .06, 1.05, 'blue', .72);
  const top = [H.p(2.9, 3.3, 1.5), H.p(8.8, 3.3, 1.5), H.p(8.8, 6.25, .91), H.p(2.9, 6.25, .91)];
  shape(H, R, top, 'teal', .72);
  shape(H, R, [H.p(2.9, 6.25, .91), H.p(8.8, 6.25, .91), H.p(8.8, 6.25, .65), H.p(2.9, 6.25, .65)], 'blue', .8);
  for (let n = 0; n < 12; n++) {
    const i = 3.2 + n * .43;
    H.line(R, [H.p(i, 4.56, 1.25), H.p(i, 5.8, 1.0)], 'blue', 1.3);
    for (const j of [4.56, 4.87, 5.18, 5.49]) H.line(R, [H.p(i - .08, j, 1.25 - (j - 4.56) * .2), H.p(i + .08, j, 1.25 - (j - 4.56) * .2)], 'paper', .6);
    if (n !== 10) box(H, R, i - .11, 4.8 + n % 3 * .23, .22, .17, 1.19 - n % 3 * .046, .045, n % 4 ? 'paper' : 'coral', .8);
    for (const j of [3.68, 4.06]) oval(H, R, ...H.p(i, j, 1.45 - (j - 3.68) * .2), 2.9, 2, n % 3 ? 'sun' : 'coral', .85);
  }
  for (const i of [3.1, 5.15]) {
    box(H, R, i, 2.83, 1.65, .2, 1.39, .92, 'blue', .85);
    shape(H, R, H.faceI(i + .1, 3.06, 1.45, 1.52, 2.18), 'paper', .82, .5);
    for (let q = 0; q < 6; q++) box(H, R, i + .19 + q * .2, 3.09, .1, .01, 1.59, .15 + q % 3 * .14, q % 2 ? 'teal' : 'coral', .7);
  }
  box(H, R, 7.18, 3.26, 1.18, .85, 1.42, .04, 'paper', 1);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(7.32, 3.4 + q * .15, 1.48), H.p(8.05, 3.4 + q * .15, 1.48)], q === 2 ? 'coral' : 'blue', .6);
}

function theaterBoothDetails(H, R) {
  drawerUnit(H, R, 1.03, 6.07, 2.65, 1.27, 1.54, 5, 'blue');
  for (let n = 0; n < 5; n++) {
    const z = 0.24 + n * 0.25;
    for (let k = 0; k < 5; k++) H.dot(...H.p(1.25 + k * 0.27, 7.38, z), 1.7, k === n ? 'coral' : 'teal');
    H.line(R, [H.p(2.7, 7.38, z), H.p(3.39, 7.38, z)], 'paper', 0.8);
  }
  coiledLine(H, R, 2.29, 6.73, 1.76, 17, 'coral');
  table(H, R, 4.33, 9.41, 3.4, 1.7, 0.64, 'blue');
  shallowTray(H, R, 4.5, 9.59, 1.51, 1.3, 0.78, 'teal');
  for (let n = 0; n < 3; n++) shape(H, R, H.tile(4.66 + n * 0.26, 9.81, 0.58, 0.84, 0.98 + n * 0.025), ['coral', 'sun', 'teal'][n], 0.3, 0.5);
  const [x, y] = H.p(6.8, 10.28, 0.8);
  oval(H, R, x, y - 5, 13, 13, 'blue', 0.8);
  oval(H, R, x, y - 5, 8, 8, 'paper', 0.9);
  H.line(
    R,
    [
      [x - 13, y - 5],
      [x - 19, y + 1],
      [x - 19, y + 15],
      [x + 16, y + 15],
      [x + 16, y - 7]
    ],
    'teal',
    2.4
  );
  H.line(
    R,
    [
      [x, y + 15],
      [x, y + 24]
    ],
    'blue',
    2
  );
  boundBook(H, R, 4.82, 9.78, 1.72, 1.01, 0.16, 'coral');
  for (const i of [8.04, 8.44]) {
    H.line(R, [H.p(i, 0.25, 2.3), H.p(i, 0.25, 3.09)], 'teal', 1.3);
    oval(H, R, ...H.p(i, 0.29, 2.34), 5, 8, 'blue', 0.9);
  }
  stroke(H, R, [H.p(8.03, 0.28, 2.36), H.p(8.24, 0.29, 2.13), H.p(8.44, 0.28, 2.36)], 'paper', 1.2);
  servicePipe(
    H,
    R,
    [
      [0.14, 5.29, 0.1],
      [0.14, 5.29, 3.3],
      [0.14, 0.16, 3.3],
      [7.36, 0.16, 3.3]
    ],
    'teal',
    2.6
  );
  foldedCloth(H, R, 10.07, 8.99, 0.76, 0.92, 0.95, 'paper', 'coral');
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.12, 11.84, 3.55, 'teal');
  wallRack(H, R, 'nw', 5.18, 2.65, 1.84, 1.44, 2, 'blue', (P, z, row) => {
    for (let n = 0; n < 5; n++) {
      const [x, y] = P(0.33 + n * 0.48, z + 0.14);
      if (row) {
        shape(
          H,
          R,
          [
            [x - 5, y],
            [x + 5, y],
            [x + 5, y - 18],
            [x - 5, y - 18]
          ],
          n % 2 ? 'paper' : 'coral',
          0.65,
          0.5
        );
        H.line(
          R,
          [
            [x - 4, y - 10],
            [x + 4, y - 10]
          ],
          'sun',
          1.3
        );
      } else {
        H.outline(R, ell(x, y - 4, 7, 10), 'teal', 2);
        H.line(
          R,
          [
            [x + 4, y + 3],
            [x + 8, y + 10]
          ],
          'paper',
          1
        );
      }
    }
  });
  for (let n = 0; n < 7; n++) {
    const z = 0.23 + n * 0.17;
    H.line(R, [H.p(0.25, 4.94, z), H.p(1.38, 4.94, z)], 'paper', 0.55);
    for (const i of [0.25, 1.38]) H.dot(...H.p(i, 4.95, z + 0.07), 0.9, 'sun');
  }
  for (let n = 0; n < 12; n++) {
    const i = 3.2 + n * 0.4,
      [x, y] = H.p(i, 3.67, 1.39);
    oval(H, R, x, y, 2.3, 2, 'sun', 0.65);
    H.line(
      R,
      [
        [x, y],
        [x, y - 2]
      ],
      'paper',
      0.55
    );
    H.line(R, [H.p(i, 4.05, 1.29), H.p(i, 4.18, 1.27)], 'coral', 1.3);
  }
  for (let n = 0; n < 5; n++) {
    const i = 3.17 + n * 1.03;
    shape(H, R, H.faceI(i, 6.05, 0.88, 0.34, 0.82), 'blue', 0.84, 0.6);
    for (let q = 0; q < 6; q++) H.line(R, [H.p(i + 0.12 + q * 0.12, 6.07, 0.42), H.p(i + 0.12 + q * 0.12, 6.07, 0.7)], 'teal', 0.7);
  }
  taskLight(H, R, 7.97, 3.69, 1.4, 'coral', -0.56);
  const [x, y] = H.p(5.83, 10.27, 0.83);
  shape(
    H,
    R,
    [
      [x - 19, y],
      [x + 18, y],
      [x + 18, y - 13],
      [x - 19, y - 13]
    ],
    'teal',
    0.6,
    0.8
  );
  for (let n = 0; n < 8; n++) {
    oval(H, R, x - 14 + n * 4, y - 7, 1.2, 1.2, n % 2 ? 'coral' : 'sun', 0.8);
    H.line(
      R,
      [
        [x - 14 + n * 4, y - 3],
        [x - 14 + n * 4, y - 1]
      ],
      'paper',
      0.6
    );
  }
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(4.77 + n * 0.36, 10.02, 0.83);
    stroke(
      H,
      R,
      [
        [px, py],
        [px - 8, py - 9],
        [px - 6, py - 17],
        [px + 1, py - 12],
        [px + 9, py - 17]
      ],
      'blue',
      1.2
    );
    oval(H, R, px + 9, py - 17, 2, 3, 'sun', 0.7);
  }
  for (const i of [1.16, 3.46]) for (const j of [6.19, 7.19]) caster(H, R, i, j);
  for (const i of [9.96, 10.95]) for (const z of [0.2, 0.69]) H.dot(...H.p(i, 10.13, z), 1.4, 'sun');
  H.line(R, [H.p(10.28, 10.15, 0.42), H.p(10.65, 10.15, 0.42)], 'blue', 2);
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(9.28 + n * 0.39, 1.77, 0.99);
    shape(
      H,
      R,
      [
        [px - 5, py],
        [px + 5, py],
        [px + 5, py - 10],
        [px - 5, py - 10]
      ],
      'paper',
      1,
      0.5
    );
    H.line(
      R,
      [
        [px - 4, py - 5],
        [px + 4, py - 5]
      ],
      'coral',
      1
    );
  }
}

const room = world('new-york-theater-booth', 'Theater District · Before the Cue', {
  floor: 'blue', tone: .38, wall: 'blue', wallTone: .68, height: 3.8,
}, (H, R) => {
  stage(H, R);
  for (let j = .6; j < 11.6; j += 1.1) {
    shape(H, R, H.faceJ(.04, j, .81, 1.72, 3.48), 'blue', .74, .5);
    for (let z = 1.8; z < 3.4; z += .17) H.line(R, [H.p(.06, j + .08, z), H.p(.06, j + .7, z)], 'teal', .65, { tone: .46 });
  }
  box(H, R, .15, 2.2, 1.35, 2.7, .05, 1.48, 'blue', .85);
  for (let q = 0; q < 7; q++) {
    shape(H, R, H.faceI(.27, 4.92, 1.1, .18 + q * .17, .3 + q * .17), 'teal', .53, .5);
    for (let n = 0; n < 5; n++) H.line(R, [H.p(.36 + n * .12, 4.94, .2 + q * .17), H.p(.36 + n * .12, 4.94, .26 + q * .17)], 'blue', .7);
    H.dot(...H.p(1.22, 4.94, .23 + q * .17), 1.3, q % 2 ? 'coral' : 'sun');
  }
  stroke(H, R, [H.p(.95, 4.3, .06), H.p(1.7, 5.8, .06), H.p(2.6, 5.6, .06), H.p(3.7, 4.7, .06)], 'blue', 2.5);
  for (const r of [10, 14, 18]) H.outline(R, ell(...H.p(1.5, 8.4, .1), r, r * .55), 'blue', 1.8);
  box(H, R, .25, 8.4, .72, 2.5, 1.65, .13, 'teal', .68);
  for (let q = 0; q < 5; q++) box(H, R, .33, 8.56 + q * .44, .55, .34, 1.79, .45 + q % 2 * .2, q % 2 ? 'coral' : 'paper', .73);
  table(H, R, 8.9, .9, 2.5, 1.32, .77, 'blue');
  for (let q = 0; q < 3; q++) box(H, R, 9.05 + q * .68, 1.1, .54, .85, .9, .05, ['paper', 'sun', 'coral'][q], .7);
  const [hx, hy] = H.p(10.75, 1.62, 1.08);
  stroke(H, R, [[hx - 10, hy], [hx - 11, hy - 16], [hx, hy - 23], [hx + 11, hy - 15], [hx + 10, hy]], 'blue', 2.8);
  for (const d of [-1, 1]) oval(H, R, hx + d * 10, hy - 3, 4, 7, 'teal', .7);
  box(H, R, 9.9, 8.8, 1.14, 1.3, .05, .8, 'coral', .65);
  shape(H, R, H.faceI(10, 10.12, .94, .19, .67), 'paper', .8, .7);
  for (const j of [8.92, 9.87]) H.line(R, [H.p(10.03, j, .87), H.p(10.96, j, .87)], 'sun', 2.4);
  const [tx, ty] = H.p(10.4, 7.4, .02);
  shape(H, R, [[tx - 12, ty], [tx + 9, ty + 2], [tx + 13, ty - 26], [tx - 8, ty - 28]], 'teal', .7, .8);
  H.line(R, [[tx - 8, ty - 21], [tx + 11, ty - 20]], 'paper', 1.7);
  consoleDesk(H, R);
  box(H, R, 8.2, 5.7, .88, .78, .45, .12, 'coral', .72);
  H.line(R, [H.p(8.64, 6.07, .05), H.p(8.64, 6.07, .5)], 'blue', 2.7);
  for (let q = 0; q < 5; q++) {
    const a = q / 5 * Math.PI * 2;
    H.line(R, [H.p(8.64, 6.07, .09), H.p(8.64 + Math.cos(a) * .58, 6.07 + Math.sin(a) * .58, .03)], 'blue', 1.6);
  }
  theaterBoothDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 12), light = u < .16 ? 0 : u < .34 ? (1 - Math.cos((u - .16) / .18 * Math.PI)) / 2 : u < .66 ? 1 : u < .86 ? (1 + Math.cos((u - .66) / .2 * Math.PI)) / 2 : 0;
  stage(H, R, light);
  H.at(8.62, 6.1, 0, HH => actor(HH, R, 8.62, 6.1, t, 'newYorkLightingCue', {
    face: 'nw', shirt: ['paper', .9], pants: ['blue', .7], hairStyle: 'bun',
    prop: (h, r, p) => {
      const [x, y] = p.farHand;
      shape(h, r, [[x - 4, y - 2], [x + 5, y], [x + 4, y + 3], [x - 5, y + 1]], 'coral', .9, .5);
      const [hx, hy] = p.head;
      stroke(h, r, [[hx - 9, hy], [hx - 7, hy - 9], [hx + 3, hy - 11], [hx + 7, hy - 5]], 'blue', 2);
      oval(h, r, hx - 8, hy + 1, 3, 5, 'teal', .8);
      stroke(h, r, [[hx - 7, hy + 5], [hx - 13, hy + 12], [hx - 8, hy + 15]], 'blue', .9);
    },
  }, 0, 1.36));
});
room.loopSeconds = 12;
export default room;
