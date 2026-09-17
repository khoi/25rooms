import { surface, bentTube } from '../materials.js';
import { recessedFrame, specimen } from '../joinery.js';
import { shallowTray, foldedCloth, satchel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, actor, plant, cycle, TAU, table } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const fold = { ...rest, head: 14, lean: -5, al: 52, ar: 62, el: 66, er: 48 };
FIGURES.clips.hongKongUmbrellaFold = { dur: 12, keys: [[0, fold], [.17, fold], [.35, { ...fold, ar: 83, er: 15, al: 67, el: 40 }], [.53, { ...fold, ar: 78, er: 24, al: 65, el: 49 }], [.68, { ...fold, ar: 53, er: 74, head: 9 }], [.8, { ...fold, ar: 53, er: 74, head: 9 }], [1, fold]] };

function rail(H, R, points) {
  H.line(R, points.map(p => H.p(...p)), 'blue', 3.2);
  H.line(R, points.map(([i, j, z]) => H.p(i, j, z + .04)), 'paper', .9);
}

function wanChaiStepsDetails(H, R) {
  shape(H, R, H.faceJ(0.16, 1.1, 2.63, 1.69, 3.21), 'blue', 0.45, 0.8);
  shape(H, R, H.faceJ(0.19, 1.24, 2.35, 1.82, 3.08), 'paper', 0.9, 0.6);
  for (const j of [1.45, 2.23, 3.01]) {
    shape(H, R, H.faceJ(0.21, j, 0.55, 2.05, 2.87), 'teal', 0.35, 0.6);
    H.line(R, [H.p(0.24, j + 0.27, 2.07), H.p(0.24, j + 0.27, 2.84)], 'blue', 1.3);
  }
  for (const j of [1.32, 3.3])
    servicePipe(
      H,
      R,
      [
        [0.42, j, 1.76],
        [1.08, j, 1.76],
        [1.08, j, 2.21]
      ],
      'teal',
      2
    );
  H.line(R, [H.p(1.08, 1.31, 2.21), H.p(1.08, 3.31, 2.21)], 'teal', 2);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(1.07, 1.46 + n * 0.42, 1.8), H.p(1.07, 1.46 + n * 0.42, 2.18)], 'blue', 0.9);
  for (let n = 0; n < 3; n++) {
    box(H, R, 1.72 + n * 0.8, 0.3, 0.64, 0.28, 1.77, 0.49, 'teal', 0.5);
    H.line(R, [H.p(1.84 + n * 0.8, 0.61, 2.12), H.p(2.22 + n * 0.8, 0.61, 2.12)], 'blue', 1.7);
    H.dot(...H.p(2.03 + n * 0.8, 0.62, 1.95), 1.4, 'sun');
  }
  table(H, R, 9.26, 6.28, 1.72, 0.91, 0.98, 'sun');
  foldedCloth(H, R, 9.42, 6.44, 1.31, 0.59, 1.13, 'paper', 'teal');
  satchel(H, R, 10.73, 6.73, 1.14, 'coral', 0.58);
  shallowTray(H, R, 5.03, 6.22, 1.67, 1.12, 0.5, 'teal');
  for (const i of [5.47, 6.11]) oval(H, R, ...H.p(i, 6.69, 0.7), 10, 4, 'blue', 0.7);
  servicePipe(
    H,
    R,
    [
      [3.88, 0.23, 1.12],
      [3.88, 0.23, 3.45],
      [4.75, 0.23, 3.45]
    ],
    'paper',
    2.4
  );
  const [x, y] = H.p(4.22, 0.26, 2.58);
  oval(H, R, x, y, 9, 11, 'blue', 0.6);
  oval(H, R, x, y, 6, 8, 'sun', 0.4);
}

function construction(H, R) {
  for (const [j, z] of [
    [5.05, 0.96],
    [6.5, 0.73],
    [7.95, 0.5],
    [9.4, 0.27]
  ]) {
    for (let n = 0; n < 9; n++) {
      const i = 0.49 + n * 0.45;
      H.line(R, [H.p(i, j, z), H.p(i + 0.24, j, z)], 'sun', 1.2);
    }
    for (let n = 0; n < 5; n++) H.line(R, [H.p(0.46 + n * 0.84, j + 0.13, z - 0.15), H.p(0.99 + n * 0.84, j + 0.13, z - 0.15)], 'teal', 0.7);
  }
  for (let n = 0; n < 9; n++) {
    const i = 5.46 + n * 0.67;
    H.line(R, [H.p(i, 0.63, 3.74), H.p(i, 3.91, 3.74)], 'blue', 0.6);
  }
  for (const i of [5.14, 11.32])
    for (const j of [1.6, 3.58]) {
      H.line(R, [H.p(i, j, 2.95), H.p(i + (i < 6 ? 0.46 : -0.46), j, 3.56)], 'blue', 1.8);
      box(H, R, i - 0.05, j - 0.04, 0.25, 0.26, 1.03, 0.13, 'blue', 0.6);
      H.dot(...H.p(i + 0.08, j + 0.15, 1.22), 1.2, 'sun');
    }
  for (let n = 0; n < 4; n++) {
    const i = 5.57 + n * 1.34,
      [x, y] = H.p(i, 3.99, 3.58);
    H.line(
      R,
      [
        [x, y],
        [x, y + 9]
      ],
      'blue',
      0.9
    );
    oval(H, R, x, y + 11, 4, 2, 'sun', 0.8);
  }
  box(H, R, 0.4, 0.15, 4.05, 0.17, 2.06, 0.08, 'teal', 0.6);
  for (let n = 0; n < 3; n++) {
    const i = 0.64 + n * 1.19;
    recessedFrame(H, R, 'ne', i, 0.92, 2.2, 1.22, 'teal', (P) => {
      shape(H, R, [P(0.13, 0.13), P(0.79, 0.13), P(0.79, 1.09), P(0.13, 1.09)], 'blue', 0.55, 0.5);
      H.line(R, [P(0.45, 0.15), P(0.45, 1.05)], 'paper', 1.3);
      H.line(R, [P(0.15, 0.59), P(0.77, 0.59)], 'paper', 1.3);
    });
  }
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(5.36 + n * 0.7, 1.18, 1.07);
    shape(
      H,
      R,
      [
        [x - 10, y],
        [x + 10, y],
        [x + 11, y - 17],
        [x - 11, y - 17]
      ],
      'coral',
      0.5,
      0.6
    );
    oval(H, R, x, y - 17, 11, 4, 'blue', 0.4);
    specimen(H, R, x, y - 17, 0.55 + n * 0.08, 'teal', n === 1);
  }
  for (let n = 0; n < 6; n++) {
    const i = 8.95 + n * 0.22;
    shape(H, R, H.faceI(i, 4.09, 0.16, 1.17, 1.49), 'paper', 1, 0.5);
    H.line(R, [H.p(i + 0.02, 4.105, 1.37), H.p(i + 0.13, 4.105, 1.37)], 'blue', 0.7);
  }
  for (let n = 0; n < 7; n++) {
    const [x, y] = H.p(5.1 + n * 0.8, 9.58, 0.29);
    oval(H, R, x, y, 11 + (n % 2) * 7, 3, 'paper', 0.7);
    H.line(
      R,
      [
        [x - 7, y],
        [x + 7, y]
      ],
      'sun',
      0.6
    );
  }
  const [x, y] = H.p(10.03, 6.71, 1.15);
  shape(
    H,
    R,
    [
      [x - 9, y],
      [x + 9, y],
      [x + 11, y - 15],
      [x - 11, y - 15]
    ],
    'teal',
    0.4,
    0.7
  );
  oval(H, R, x, y - 15, 11, 4, 'blue', 0.4);
  for (let n = 0; n < 3; n++) {
    H.line(
      R,
      [
        [x - 6 + n * 6, y - 10],
        [x - 9 + n * 7, y - 40]
      ],
      'blue',
      1.6
    );
    stroke(
      H,
      R,
      [
        [x - 9 + n * 7, y - 40],
        [x - 12 + n * 7, y - 45],
        [x - 15 + n * 7, y - 40]
      ],
      'sun',
      1.7
    );
  }
}

const room = world('hong-kong-wan-chai-steps', 'Wan Chai · Rain on the landing', { floor: 'blue', tone: .25, wall: false, head: 20 }, (H, R) => {
  shape(H, R, H.faceJ(.1, .1, 11.75, .04, 3.65), 'paper', .91);
  shape(H, R, H.faceI(.1, .1, 11.7, .04, 3.65), 'teal', .24);
  for (let q = 0; q < 12; q++) H.line(R, [H.p(.11, .2, .25 + q * .27), H.p(.11, 11.8, .25 + q * .27)], 'blue', .65, { tone: .3 });
  for (let q = 0; q < 19; q++) H.line(R, [H.p(.11, .4 + q * .59, .03), H.p(.11, .4 + q * .59, 3.65)], 'blue', .55, { tone: .18 });
  box(H, R, .3, .3, 4.3, 4.7, .01, 1.0, 'paper', .85);
  box(H, R, 4.6, .3, 7.1, 4.7, .01, 1.0, 'paper', .85);
  for (let q = 0; q < 4; q++) {
    const j = 5 + q * 1.45, z = 1 - q * .25;
    box(H, R, .3, j, 4.3, 1.45, .01, z, 'paper', .75);
    H.line(R, [H.p(.35, j + 1.45, z + .02), H.p(4.55, j + 1.45, z + .02)], 'sun', 2.3);
    for (let n = 0; n < 7; n++) H.line(R, [H.p(.57 + n * .54, j + 1.32, z + .02), H.p(.87 + n * .54, j + 1.32, z + .02)], 'blue', .6, { tone: .45 });
  }
  box(H, R, 4.61, 5, 7.08, 4.21, .01, .48, 'paper', .8);
  box(H, R, 4.61, 9.21, 7.08, 1.2, .01, .25, 'paper', .8);
  for (const j of [6.5, 8.1]) H.line(R, [H.p(4.72, j, .5), H.p(11.58, j, .5)], 'blue', .6, { tone: .4 });
  for (let q = 0; q < 7; q++) H.line(R, [H.p(4.75 + q, 5.06, .5), H.p(4.75 + q, 9.12, .5)], 'blue', .55, { tone: .28 });
  for (const [i, j, z] of [[.68, 3.7, 1], [.68, 5.8, 1], [.68, 7.1, .75], [.68, 8.7, .5], [.68, 10.2, .25]]) rail(H, R, [[i, j, z], [i, j, z + .92]]);
  rail(H, R, [[.68, 2.8, 1.94], [.68, 5.8, 1.94], [.68, 7.1, 1.69], [.68, 8.7, 1.44], [.68, 10.7, 1.12]]);
  for (const [i, j, z] of [[4.47, 5.72, .98], [4.47, 7.3, .7], [4.47, 9, .48]]) rail(H, R, [[i, j, z], [i, j, z + .93]]);
  rail(H, R, [[4.47, 5.17, 1.95], [4.47, 6.36, 1.95], [4.47, 9.7, 1.24]]);
  shape(H, R, H.faceI(5.0, .14, 2.15, 1.01, 3.21), 'blue', .73);
  shape(H, R, H.faceI(5.16, .16, 1.83, 1.12, 3.1), 'coral', .45);
  for (let q = 0; q < 7; q++) H.line(R, [H.p(5.24 + q * .25, .18, 1.2), H.p(5.24 + q * .25, .18, 3.02)], 'blue', .8);
  H.line(R, [H.p(6.62, .2, 1.9), H.p(6.62, .2, 2.2)], 'sun', 2.4);
  shape(H, R, H.faceI(8.39, .13, 2.53, 1.59, 3.19), 'paper', 1);
  for (const i of [8.55, 9.31, 10.1]) shape(H, R, H.faceI(i, .15, .63, 1.76, 3.03), 'teal', .55, .7);
  for (const z of [2.02, 2.75]) H.line(R, [H.p(8.42, .17, z), H.p(10.89, .17, z)], 'blue', 1.2);
  box(H, R, 10.46, .31, 1.12, .43, 1.07, .54, 'paper', .9);
  for (let q = 0; q < 8; q++) H.line(R, [H.p(10.56 + q * .12, .75, 1.14), H.p(10.56 + q * .12, .75, 1.52)], 'blue', .75);
  rail(H, R, [[11.29, .8, 1.1], [11.29, .8, .64], [11.59, 1.5, .53], [11.59, 8.25, .53]]);
  for (const j of [1.6, 4.65]) box(H, R, 5.14, j, .16, .16, 1.01, 2.56, 'teal', .6);
  for(let n=0;n<15;n++){
    const i=5.1+n*6.4/15;
    surface(H,R,[H.p(i,.52,3.76),H.p(i+.426,.52,3.76),H.p(i+.426,3.94,3.54),H.p(i,3.94,3.54)],n%4===0?'paper':'teal',n%4===0?1:.25,.5);
    bentTube(H,R,[[i,.52,3.77],[i,3.94,3.55]],1.1,'paper');
  }
  for(const i of [5.23,8.24,11.32])bentTube(H,R,[[i,.57,2.89],[i,1.44,3.7],[i,3.88,3.53]],2,'teal');
  box(H, R, 5.06, 3.92, 6.51, .15, 3.49, .21, 'teal', .63);
  rail(H, R, [[11.35, 4.04, 3.58], [11.35, 4.04, 1.09], [11.59, 4.45, 1.03]]);
  for (let q = 0; q < 5; q++) {
    const i = 6 + q * 1.06;
    shape(H, R, H.tile(i, 4.35, .63, .42, 1.02), 'blue', .13, .3);
  }
  box(H, R, 8.8, 3.42, 1.5, .65, 1.03, .56, 'coral', .5);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(8.93 + q * .37, 4.08, 1.09), H.p(8.93 + q * .37, 4.08, 1.53)], 'blue', .7);
  plant(H, R, ...H.p(9.13, 3.7, 1.6), .95);
  plant(H, R, ...H.p(9.79, 3.71, 1.6), .77);
  const [bx, by] = H.p(10.73, 3.3, 1.03);
  shape(H, R, [[bx - 10, by], [bx + 9, by], [bx + 12, by - 24], [bx - 12, by - 24]], 'teal', .55);
  oval(H, R, bx, by - 24, 12, 4, 'blue', .55);
  for (const dx of [-5, 3]) {
    H.line(R, [[bx + dx, by - 19], [bx + dx - 2, by - 49]], 'blue', 1.8);
    stroke(H, R, [[bx + dx - 2, by - 49], [bx + dx - 3, by - 57], [bx + dx + 4, by - 58], [bx + dx + 5, by - 53]], 'coral', 1.8);
  }
  for (let q = 0; q < 13; q++) H.line(R, [H.p(7.3 + q * .25, 10.9, .04), H.p(7.3 + q * .25, 11.17, .04)], 'blue', 1.1);
  for (const [i, j, w] of [[6.3, 7.7, 1.8], [9.7, 8.7, 1.25], [2.7, 10.4, .8]]) {
    const [x, y] = H.p(i, j, j > 10 ? .26 : .49);
    oval(H, R, x, y, w * 12, w * 3.5, 'teal', .17);
    H.line(R, [[x - w * 8, y], [x + w * 6, y - 1]], 'paper', .8);
  }
  box(H, R, 7.46, 1.35, .71, .52, 1.03, .37, 'paper', 1);
  H.line(R, [H.p(7.81, 1.34, 1.42), H.p(7.81, 1.88, 1.42)], 'coral', 2.3);
  wanChaiStepsDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 12), wrap = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - .17) / .63))) ** 2;
  actor(H, R, 7.23, 4.0, t, 'hongKongUmbrellaFold', { shirt: ['sun', .75], pants: ['blue', .7], hairStyle: 'short', face: 'se', prop(h, r, p) {
    const [x, y] = p.nearHand;
    h.line(r, [[x, y - 30], [x, y + 30]], 'blue', 1.7);
    stroke(h, r, [[x, y - 30], [x, y - 37], [x + 7, y - 39], [x + 9, y - 32]], 'coral', 2.1);
    const width = 7 - wrap * 3;
    shape(h, r, [[x - 2, y - 22], [x - width, y + 8], [x, y + 23], [x + width, y + 7], [x + 2, y - 22]], 'coral', .66, .8);
    for (const dx of [-2, 2]) stroke(h, r, [[x + dx, y - 19], [x + dx * 1.6, y + 7], [x, y + 22]], 'blue', .6);
    h.line(r, [[x - width, y + 4], [x + width, y + 4]], 'teal', 1.6);
  } }, 1.01, 1.29);
  const [x, y] = H.p(10.9, 7.38, .52);
  for (let q = 0; q < 4; q++) {
    const drop = cycle(t + q * 3, 12);
    H.opacity(.6 * Math.sin(drop * Math.PI), () => H.line(R, [[x + q * 6, y - 82 + drop * 78], [x + q * 6 - 2, y - 75 + drop * 78]], 'teal', .85));
  }
  H.opacity(Math.sin(u * TAU) ** 2 * .6, () => H.outline(R, Array.from({ length: 24 }, (_, q) => [x + Math.cos(q * TAU / 24) * (6 + u * 7), y + Math.sin(q * TAU / 24) * (2 + u * 2)]), 'paper', .8));
});
room.loopSeconds = 12;
export default room;
