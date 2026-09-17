import { slattedSeat, benchFrame, drape, bentTube, metal } from '../materials.js';
import { caster, specimen } from '../joinery.js';
import { shallowTray, foldedCloth, boundBook, satchel, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -7, head: 12, al: 54, ar: 70, el: 42, er: 27 };
FIGURES.clips.hongKongSketchCloud = { dur: 16, keys: [[0, seated], [.12, seated], [.27, { ...seated, ar: 77, er: 18 }], [.34, { ...seated, ar: 70, er: 27 }], [.43, { ...seated, ar: 78, er: 17 }], [.52, { ...seated, ar: 35, er: 105, head: -20 }], [.72, { ...seated, ar: 35, er: 105, head: -20 }], [.86, seated], [1, seated]] };

function cloud(H, R, x, y, scale = 1) {
  shape(H, R, [[x - 22 * scale, y + 4 * scale], [x - 19 * scale, y - 5 * scale], [x - 10 * scale, y - 6 * scale], [x - 5 * scale, y - 15 * scale], [x + 9 * scale, y - 14 * scale], [x + 14 * scale, y - 6 * scale], [x + 24 * scale, y - 4 * scale], [x + 27 * scale, y + 5 * scale]], 'paper', 1, .7);
}

function foldingChair(H, R, i, j, ink) {
  for (const x of [i, i + 0.82]) {
    H.line(R, [H.p(x, j, 0), H.p(x, j + 0.9, 0.8)], 'blue', 1.8);
    H.line(R, [H.p(x, j + 0.95, 0), H.p(x, j, 0.8)], 'blue', 1.8);
  }
  shape(H, R, H.tile(i, j + 0.15, 0.82, 0.62, 0.65), ink, 0.65);
  shape(H, R, H.faceI(i, j + 0.08, 0.82, 0.7, 1.35), ink, 0.65);
  for (const x of [i, i + 0.82]) {
    bentTube(
      H,
      R,
      [
        [x, j + 0.9, 0.65],
        [x, j + 0.92, 0.95],
        [x, j + 0.02, 1.03]
      ],
      1.6,
      'sun'
    );
    metal(H, R, x - 0.03, j + 0.44, 0.065, 0.08, 0.33, 0.09, 'teal');
  }
  for (let n = 0; n < 5; n++) H.line(R, [H.p(i + 0.08 + n * 0.16, j + 0.08, 0.77), H.p(i + 0.08 + n * 0.16, j + 0.1, 1.28)], 'sun', 0.6);
}

function westKowloonSketchDetails(H, R) {
  table(H, R, 7.96, 7.95, 2.76, 1.3, 0.64, 'teal');
  shallowTray(H, R, 8.13, 8.12, 1.19, 0.91, 0.79, 'paper');
  for (let n = 0; n < 6; n++)
    shape(
      H,
      R,
      H.tile(8.27 + (n % 3) * 0.29, 8.25 + Math.floor(n / 3) * 0.32, 0.22, 0.24, 0.98),
      ['coral', 'teal', 'sun', 'blue', 'paper', 'teal'][n],
      n === 4 ? 0.1 : 0.62,
      0.4
    );
  boundBook(H, R, 9.58, 8.13, 0.86, 0.86, 0.79, 'coral');
  for (const i of [9.82, 10.25]) H.line(R, [H.p(i, 8.28, 0.99), H.p(i + 0.12, 8.82, 0.99)], 'blue', 1.3);
  slattedCrate(H, R, 8.14, 8.13, 1.73, 0.95, 0.02, 0.39, 'sun');
  for (let n = 0; n < 4; n++) box(H, R, 8.33 + n * 0.33, 8.25, 0.07, 0.69, 0.16, 0.51 + (n % 2) * 0.14, 'paper', 1);
  satchel(H, R, 6.9, 8.8, 0.04, 'blue', 0.84);
  const [x, y] = H.p(2.27, 4.72, 0.03);
  for (const dx of [-10, 10])
    H.line(
      R,
      [
        [x + dx, y],
        [x + dx * 0.4, y - 55]
      ],
      'sun',
      2.3
    );
  H.line(
    R,
    [
      [x - 12, y - 23],
      [x + 12, y - 23]
    ],
    'blue',
    2
  );
  shape(
    H,
    R,
    [
      [x - 19, y - 60],
      [x + 17, y - 52],
      [x + 17, y - 22],
      [x - 19, y - 30]
    ],
    'paper',
    1,
    0.8
  );
  stroke(
    H,
    R,
    [
      [x - 15, y - 39],
      [x - 4, y - 47],
      [x + 5, y - 38],
      [x + 13, y - 40]
    ],
    'teal',
    1.5
  );
  oval(H, R, x + 5, y - 46, 4, 3, 'sun', 0.6);
  for (const [i, j] of [
    [0.63, 9.68],
    [10.79, 3.75]
  ]) {
    box(H, R, i, j, 0.58, 0.59, 0.03, 0.69, 'blue', 0.55);
    oval(H, R, ...H.p(i + 0.3, j + 0.29, 0.75), 6, 3, 'paper', 1);
  }
  foldedCloth(H, R, 8.49, 2.28, 0.71, 0.43, 0.71, 'paper', 'coral');
  for (const i of [2.55, 7.55]) for (const j of [2.19, 8.37]) H.dot(...H.p(i, j, 0.15), 1.8, 'sun');
}

function construction(H, R) {
  for (const i of [2.52, 7.48])
    for (const j of [2.14, 8.33]) {
      H.line(R, [H.p(i, j, 2.75), H.p(i + (i < 3 ? 0.62 : -0.62), j, 3.48)], 'blue', 2);
      H.line(R, [H.p(i, j, 2.75), H.p(i, j + (j < 3 ? 0.62 : -0.62), 3.48)], 'blue', 2);
      for (const z of [0.15, 2.82, 3.39]) H.dot(...H.p(i + 0.075, j + 0.12, z), 1.4, 'sun');
    }
  for (let n = 0; n < 11; n++) {
    const i = 0.4 + n * 1.05;
    shape(H, R, H.faceI(i, 0.85, 0.85, 0.12, 0.46), 'paper', 1, 0.6);
    H.line(R, [H.p(i + 0.12, 0.87, 0.18), H.p(i + 0.66, 0.87, 0.18)], 'teal', 0.6);
  }
  for (let n = 0; n < 7; n++) {
    const [x, y] = H.p(1.28, 2.13 + n * 0.86, 0.2);
    specimen(H, R, x, y, 0.48 + (n % 3) * 0.12, 'teal', n % 3 === 0);
  }
  table(H, R, 8.51, 3.53, 1.9, 0.9, 0.75, 'sun');
  const P = (i, j, z) => H.p(i, j, z);
  for (const i of [8.78, 10.06]) H.line(R, [P(i, 3.71, 0.88), P(i, 3.27, 2.29)], 'blue', 2);
  shape(H, R, [P(8.65, 3.72, 1.15), P(10.16, 3.72, 1.15), P(10.16, 3.28, 2.27), P(8.65, 3.28, 2.27)], 'sun', 0.4, 0.8);
  shape(H, R, [P(8.78, 3.7, 1.26), P(10.01, 3.7, 1.26), P(10.01, 3.33, 2.14), P(8.78, 3.33, 2.14)], 'paper', 1, 0.55);
  stroke(H, R, [P(8.86, 3.61, 1.45), P(9.11, 3.55, 1.68), P(9.42, 3.57, 1.6), P(9.77, 3.5, 1.84)], 'teal', 1.5);
  for (let n = 0; n < 3; n++) H.line(R, [P(8.88, 3.65, 1.36 + n * 0.12), P(9.86, 3.65, 1.36 + n * 0.12)], 'blue', 0.5);
  shallowTray(H, R, 8.65, 3.8, 1.1, 0.42, 0.89, 'teal');
  for (let n = 0; n < 5; n++) oval(H, R, ...P(8.84 + n * 0.17, 4.01, 1.08), 2.6, 1.5, ['coral', 'teal', 'sun'][n % 3], 0.75);
  const [x, y] = P(4.84, 5.86, 1.1);
  oval(H, R, x, y, 7, 4, 'paper', 1);
  oval(H, R, x, y, 4.5, 2.5, 'teal', 0.3);
  H.line(
    R,
    [
      [x, y - 1],
      [x + 10, y - 17]
    ],
    'sun',
    1.1
  );
  for (let n = 0; n < 5; n++) {
    const [px, py] = P(8.4 + n * 0.46, 8.36, 0.83);
    shape(
      H,
      R,
      [
        [px - 5, py],
        [px + 5, py],
        [px + 4, py - 15],
        [px - 4, py - 15]
      ],
      'paper',
      1,
      0.5
    );
    H.line(
      R,
      [
        [px - 4, py - 10],
        [px + 4, py - 10]
      ],
      ['coral', 'sun', 'teal'][n % 3],
      2.2
    );
  }
  for (const i of [8.1, 10.54]) for (const j of [8.1, 9.11]) caster(H, R, i, j);
  for (let n = 0; n < 4; n++) {
    const [px, py] = P(3.76 + n * 0.23, 8.66, 0.04);
    H.line(
      R,
      [
        [px - 6, py],
        [px + 6, py - 4]
      ],
      n % 2 ? 'sun' : 'coral',
      0.8
    );
  }
}

const room = world('hong-kong-west-kowloon-sketch', 'West Kowloon · Hold that cloud', { floor: 'paper', tone: .55, wall: false, head: 20 }, (H, R) => {
  const sky = H.faceI(.1, .15, 11.8, .4, 3.45);
  shape(H, R, sky, 'sun', .18);
  H.clip(sky, () => {
    shape(H, R, H.faceI(.1, .14, 11.8, .4, 1.4), 'teal', .44, .5);
    const hill = [[0, 1.32], [1.4, 1.83], [3, 2.13], [4.5, 1.7], [5.6, 1.88], [7, 1.52], [9, 1.67], [11.9, 1.34]].map(([i, z]) => H.p(i, .12, z));
    shape(H, R, [...hill, H.p(11.9, .12, 1.14), H.p(.1, .12, 1.14)], 'blue', .33, .65);
    for (let q = 0; q < 17; q++) {
      const i = .4 + q * .68, h = .16 + q % 4 * .13;
      shape(H, R, H.faceI(i, .1, .36, 1.14, 1.14 + h), q % 3 ? 'blue' : 'teal', .52, .35);
    }
    for (let q = 0; q < 16; q++) H.line(R, [H.p(.4 + q % 6 * 1.9, .08, .52 + Math.floor(q / 6) * .2), H.p(1 + q % 6 * 1.9, .08, .52 + Math.floor(q / 6) * .2)], 'paper', .9, { tone: .65 });
  });
  box(H, R, .08, .4, 11.84, .43, 0, .56, 'paper', .9);
  for (const i of [.3, 3.15, 6, 8.85, 11.7]) H.line(R, [H.p(i, .75, .5), H.p(i, .75, 1.29)], 'blue', 2.3);
  for (const z of [.87, 1.27]) H.line(R, [H.p(.3, .75, z), H.p(11.7, .75, z)], 'teal', 2.3);
  box(H, R, .6, 1.5, 1.4, 7.2, .01, .16, 'teal', .34);
  for (let q = 0; q < 5; q++) plant(H, R, ...H.p(1.2, 2.15 + q * 1.25, .18), 1.05);
  for (const [i, j] of [[2.6, 2.1], [2.6, 8.3], [7.5, 2.1]]) {
    box(H, R, i, j, .15, .15, .02, 3.43, 'teal', .55);
    box(H, R, i - .13, j - .12, .41, .4, .01, .11, 'blue', .5);
  }
  for (const j of [2.1, 8.3]) box(H, R, 2.45, j, 5.27, .2, 3.42, .18, 'paper', .8);
  for (let q = 0; q < 9; q++) {
    const i = 2.6 + q * .6;
    box(H, R, i, 2.1, .18, 6.43, 3.63, .09, q % 3 ? 'paper' : 'sun', .7);
    H.tint(H.tile(i + .3, 2.5, .14, 5.8, .03), 'blue', .13);
  }
  slattedSeat(H,R,8.1,1.6,3.1,0,'sun',.6);
  for (let q = 0; q < 7; q++) H.line(R, [H.p(8.25 + q * .43, 1.77, .71), H.p(8.25 + q * .43, 2.33, .71)], 'paper', .8);
  foldingChair(H, R, 4.8, 6.35, 'coral');
  benchFrame(H,R,3.1,5.45,2.3,1.2,1.06,'sun');
  drape(H,R,3.15,5.6,.48,1.02,1.09,.36,'paper');
  shape(H, R, H.tile(3.23, 5.57, 1.83, .86, 1.08), 'sun', .45);
  shape(H, R, H.tile(3.37, 5.63, 1.48, .72, 1.1), 'paper', 1);
  const [sx, sy] = H.p(4.09, 5.95, 1.12);
  H.line(R, [[sx - 18, sy + 6], [sx - 2, sy - 1], [sx + 15, sy + 4]], 'teal', .8);
  cloud(H, R, sx, sy - 3, .42);
  for (const [i, ink] of [[3.42, 'coral'], [3.82, 'teal'], [4.22, 'sun']]) oval(H, R, ...H.p(i, 6.47, 1.08), 3.5, 2, ink, .85);
  box(H, R, 3.06, 5.49, .12, .2, 1.09, .06, 'blue', .85);
  box(H, R, 4.94, 6.24, .12, .2, 1.09, .06, 'blue', .85);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(5.08, 5.62 + q * .12, 1.1), H.p(5.48, 5.7 + q * .12, 1.1)], q % 2 ? 'coral' : 'blue', 1.4);
  const [bx, by] = H.p(3.03, 7.49, .04);
  shape(H, R, [[bx - 14, by], [bx + 17, by], [bx + 13, by - 26], [bx - 12, by - 28]], 'teal', .6);
  stroke(H, R, [[bx - 9, by - 25], [bx - 9, by - 38], [bx + 9, by - 38], [bx + 10, by - 25]], 'blue', 1.5);
  box(H, R, 3.38, 7.65, .66, .54, .03, .2, 'paper', 1);
  const [tx, ty] = H.p(4.01, 8.11, .06);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 5, ty - 23], [tx - 5, ty - 23]], 'sun', .65);
  oval(H, R, tx, ty - 23, 5, 2, 'blue', .65);
  for (let q = 0; q < 3; q++) box(H, R, 9.35, 5.7 + q * .31, 1.03, .25, .02, .05, q === 1 ? 'coral' : 'paper', .8);
  for (const [i, j] of [[2.7, 10.7], [7.3, 10.7], [11, 4.1]]) {
    box(H, R, i, j, .2, .2, .02, .57, 'blue', .6);
    shape(H, R, H.faceI(i + .03, j + .21, .14, .4, .5), 'sun', .9, .3);
  }
  for (let q = 0; q < 9; q++) H.line(R, [H.p(1.7 + q * 1.05, 10.9, .01), H.p(1.9 + q * 1.05, 11.6, .01)], 'blue', .6, { tone: .3 });
  westKowloonSketchDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  H.clip(H.faceI(.1, .15, 11.8, 1.85, 3.45), () => {
    const [x, y] = H.p(8.6 + Math.sin(u * TAU) * .3, .1, 2.79);
    cloud(H, R, x, y, 1.27);
  });
  actor(H, R, 5.3, 6.65, t, 'hongKongSketchCloud', { shirt: ['coral', .64], hairStyle: 'bun', face: 'nw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    h.line(r, [[x + 2, y + 3], [x - 12, y - 10]], 'blue', 1.4);
    h.line(r, [[x - 12, y - 10], [x - 15, y - 12]], 'coral', .9);
  } }, .01, 1.26);
  actor(H, R, 9.27, 2.12, 0, 'sit', { shirt: ['paper', 1], hairStyle: 'cap', face: 'sw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 12, y - 4], [x + 10, y + 1], [x + 10, y + 13], [x - 12, y + 8]], 'teal', .65, .7);
  } }, .08, 1.17);
  const [x, y] = H.p(6.65, 5.7, .03);
  shape(H, R, [[x - 7, y + 5], [x + 9, y + 5], [x + 9, y - 2], [x + 6, y - 8 + Math.sin(u * TAU) * 2], [x - 8, y - 4]], 'paper', 1, .65);
  H.dot(x + 4, y - 2, 2, 'sun', .85);
});
room.loopSeconds = 16;
export default room;
