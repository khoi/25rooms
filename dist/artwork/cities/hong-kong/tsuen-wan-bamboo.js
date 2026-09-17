import { timber } from '../materials.js';
import { shelfUnit, shallowTray, liddedTin, foldedCloth, coiledLine, satchel, handTool, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, TAU, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const test = { ...rest, lean: -10, head: 12, al: 73, ar: 77, el: 26, er: 20 };
FIGURES.clips.hongKongBambooTension = { dur: 16, keys: [[0, test], [.12, test], [.34, { ...test, lean: 1, al: 42, ar: 48, el: 63, er: 57 }], [.56, { ...test, lean: 1, al: 42, ar: 48, el: 63, er: 57, head: 3 }], [.75, test], [.9, test], [1, test]] };
const teach = { ...rest, head: 4, ar: 91, er: 10, al: 22, el: 32 };
FIGURES.clips.hongKongBambooTeacher = { dur: 16, keys: [[0, teach], [.3, { ...teach, ar: 98, er: 4 }], [.55, teach], [.75, { ...teach, ar: 56, er: 48 }], [.9, teach], [1, teach]] };

function pole(H, R, a, b, radius = 4, ink = 'sun') {
  const p = H.p(...a), q = H.p(...b), dx = q[0] - p[0], dy = q[1] - p[1], length = Math.hypot(dx, dy), nx = -dy / length * radius, ny = dx / length * radius;
  shape(H, R, [[p[0] + nx, p[1] + ny], [q[0] + nx, q[1] + ny], [q[0] - nx, q[1] - ny], [p[0] - nx, p[1] - ny]], ink, .56, .9);
  H.line(R, [[p[0] + nx * .4, p[1] + ny * .4], [q[0] + nx * .4, q[1] + ny * .4]], 'paper', .8);
  const count = Math.max(2, Math.floor(length / 25));
  for (let k = 1; k < count; k++) {
    const x = p[0] + dx * k / count, y = p[1] + dy * k / count;
    H.line(R, [[x - nx * 1.08, y - ny * 1.08], [x + nx * 1.08, y + ny * 1.08]], 'blue', .8, { tone: .62 });
    H.line(R, [[x - nx, y - ny - 1.8], [x + nx, y + ny - 1.8]], 'teal', .7, { tone: .5 });
  }
  oval(H, R, ...q, radius, radius * .65, 'paper', 1);
  oval(H, R, ...q, radius * .55, radius * .3, 'blue', .7);
}

function binding(H, R, i, j, z, ink = 'blue') {
  const [x, y] = H.p(i, j, z);
  for (let q = 0; q < 4; q++)
    H.line(
      R,
      [
        [x - 7 + q * 3, y - 6],
        [x - 4 + q * 3, y + 6]
      ],
      ink,
      1.4,
      { tone: 0.78 }
    );
  H.line(
    R,
    [
      [x - 6, y + 4],
      [x + 8, y - 4]
    ],
    ink,
    1.1
  );
  stroke(
    H,
    R,
    [
      [x - 8, y - 7],
      [x - 11, y - 2],
      [x - 3, y + 8],
      [x + 9, y + 4]
    ],
    'sun',
    0.65
  );
  stroke(
    H,
    R,
    [
      [x + 5, y + 3],
      [x + 12, y + 8],
      [x + 15, y + 4],
      [x + 11, y + 2],
      [x + 7, y + 9],
      [x + 8, y + 17]
    ],
    ink,
    1.1
  );
}

function coil(H, R, i, j, ink = 'blue', size = 1) {
  const [x, y] = H.p(i, j, .035);
  for (let q = 0; q < 5; q++) H.outline(R, Array.from({ length: 36 }, (_, n) => [x + Math.cos(n * TAU / 36) * (7 + q * 2) * size, y + Math.sin(n * TAU / 36) * (3 + q) * size]), ink, 1.3, { tone: .7 });
  stroke(H, R, [[x + 13 * size, y + 3], [x + 29 * size, y + 4], [x + 33 * size, y + 12]], ink, 1.3);
}

function tsuenWanBambooDetails(H, R) {
  shelfUnit(H, R, 6.05, 0.93, 2.22, 1.03, 0.02, [0.14, 1.02, 1.91], 'teal');
  for (let n = 0; n < 3; n++) coiledLine(H, R, 6.48 + n * 0.62, 1.43, 0.32, 9, ['blue', 'coral', 'teal'][n]);
  foldedCloth(H, R, 6.24, 1.08, 1.64, 0.69, 1.16, 'paper', 'teal');
  shallowTray(H, R, 6.23, 1.08, 1.69, 0.73, 2.05, 'sun');
  handTool(H, R, 6.65, 1.34, 2.23, 'hammer', 'coral');
  handTool(H, R, 7.52, 1.5, 2.23, 'brush', 'blue');
  slattedCrate(H, R, 2.77, 1.1, 2.18, 1.28, 0.03, 0.69, 'sun');
  for (let n = 0; n < 5; n++) pole(H, R, [3 + n * 0.34, 1.25, 0.2], [3 + n * 0.34, 2.05, 1.1 + (n % 2) * 0.2], 3);
  table(H, R, 2.04, 9.54, 2.01, 1.48, 0.61, 'teal');
  shallowTray(H, R, 2.21, 9.73, 1.67, 1.05, 0.75, 'paper');
  for (let n = 0; n < 3; n++) pole(H, R, [2.44, 9.95 + n * 0.25, 0.95], [3.58, 9.95 + n * 0.25, 0.95], 2.5);
  for (let n = 0; n < 3; n++) binding(H, R, 2.75 + n * 0.34, 10.2, 0.99, ['teal', 'coral', 'blue'][n]);
  satchel(H, R, 7.78, 10.54, 0.03, 'blue', 0.9);
  liddedTin(H, R, 9.71, 8.82, 0.65, 6, 17, 'sun');
  for (const j of [2.86, 3.7]) {
    box(H, R, 10.96, j, 0.37, 0.47, 0.02, 0.11, 'blue', 0.6);
    H.line(R, [H.p(11.14, j + 0.2, 0.13), H.p(11.14, j + 0.2, 1.49)], 'sun', 2.2);
  }
  H.line(R, [H.p(11.14, 3.07, 1.5), H.p(11.14, 3.9, 1.5)], 'sun', 2);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(11.14, 3.1 + n * 0.2, 1.45), H.p(11.14, 3.1 + n * 0.2, 0.83)], 'blue', 1);
}

function construction(H, R) {
  for (const [i, j] of [
    [0.68, 1.08],
    [0.68, 8.24],
    [5.28, 1.08],
    [5.28, 8.24]
  ]) {
    box(H, R, i - 0.22, j - 0.23, 0.58, 0.62, 0.02, 0.1, 'sun', 0.43);
    for (const x of [i - 0.13, i + 0.25]) for (const y of [j - 0.13, j + 0.25]) H.dot(...H.p(x, y, 0.14), 1.4, 'blue');
  }
  for (let n = 0; n < 8; n++) {
    const j = 2.96 + n * 0.54;
    pole(H, R, [0.8, j, 0.36], [2.15, j, 0.36], 3, 'sun');
    binding(H, R, 1.01, j, 0.38);
    binding(H, R, 1.91, j, 0.38);
  }
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(10.5, 2.75, 0.87 + n * 0.1);
    shape(
      H,
      R,
      [
        [x - 15, y],
        [x + 14, y],
        [x + 12, y - 6],
        [x - 12, y - 6]
      ],
      'paper',
      1,
      0.5
    );
    H.line(
      R,
      [
        [x - 11, y - 3],
        [x + 9, y - 3]
      ],
      n % 2 ? 'coral' : 'teal',
      0.8
    );
  }
  const [x, y] = H.p(9.5, 2.43, 1.22);
  for (let n = 0; n < 5; n++)
    H.line(
      R,
      [
        [x - 12 + n * 5, y - 2],
        [x - 12 + n * 5, y - 13]
      ],
      'sun',
      1.3
    );
  H.line(
    R,
    [
      [x - 15, y - 14],
      [x + 13, y - 14]
    ],
    'blue',
    2.2
  );
  for (const i of [9, 10.87]) H.line(R, [H.p(i, 2.1, 0.18), H.p(i, 3.01, 0.67)], 'blue', 1.4);
  box(H, R, 8.7, 1.68, 2.5, 0.11, 1.03, 1.53, 'teal', 0.32);
  for (let n = 0; n < 6; n++) {
    const i = 8.9 + n * 0.36,
      [px, py] = H.p(i, 1.82, 2.36);
    H.dot(px, py, 1.6, 'sun');
    H.line(
      R,
      [
        [px, py],
        [px, py + 13]
      ],
      'blue',
      0.8
    );
    if (n < 3) {
      H.line(
        R,
        [
          [px, py + 10],
          [px - 3, py + 33]
        ],
        'sun',
        3
      );
      H.line(
        R,
        [
          [px - 7, py + 32],
          [px + 4, py + 35]
        ],
        'blue',
        4
      );
    } else {
      H.outline(R, ell(px, py + 23, 7, 10), 'blue', 2);
      H.line(
        R,
        [
          [px, py + 31],
          [px + 5, py + 38]
        ],
        'coral',
        1.1
      );
    }
  }
  for (let n = 0; n < 4; n++) {
    const j = 9.1 + n * 0.47;
    pole(H, R, [5.25, j, 0.08], [7.42, j, 0.08], 3.2, 'sun');
    for (const i of [5.42, 7.17]) H.line(R, [H.p(i, j - 0.1, 0.09), H.p(i, j + 0.1, 0.09)], 'blue', 0.7);
  }
  shape(H, R, H.tile(2.24, 9.74, 1.5, 1.06, 0.78), 'paper', 1, 0.6);
  for (let n = 0; n < 3; n++) {
    H.line(R, [H.p(2.38 + n * 0.47, 9.81, 0.8), H.p(2.38 + n * 0.47, 10.67, 0.8)], 'teal', 1.1);
    H.line(R, [H.p(2.29, 9.92 + n * 0.3, 0.8), H.p(3.62, 9.92 + n * 0.3, 0.8)], 'coral', 0.8);
  }
  coil(H, R, 7.1, 10.61, 'coral', 0.65);
  for (let n = 0; n < 7; n++) {
    const [px, py] = H.p(7.75 + n * 0.16, 2.95 + (n % 2) * 0.24, 0.04);
    H.line(
      R,
      [
        [px, py],
        [px + 9, py - 4]
      ],
      'sun',
      1.1
    );
  }
}

const room = world('hong-kong-tsuen-wan-bamboo', 'Tsuen Wan · The knot holds', { floor: 'paper', tone: .5, wall: false, head: 20 }, (H, R) => {
  shape(H, R, [H.p(.08, .08, .02), H.p(.08, 6.13, .02), H.p(.08, 6.13, 2.32), H.p(.08, .08, 2.32)], 'teal', .2, .7);
  for (const [i, j] of [[.62, .68], [5.37, .68], [10.83, .68], [.62, 5.31], [.62, 10.32]]) {
    box(H, R, i - .18, j - .18, .38, .38, .01, .19, 'blue', .5);
    pole(H, R, [i, j, .2], [i, j, 3.76], 4.6);
  }
  for (const z of [1.47, 3.15, 3.61]) {
    pole(H, R, [.3, .72, z], [11.33, .72, z], 4.0);
    pole(H, R, [.65, .35, z], [.65, 10.91, z], 4.0);
  }
  pole(H, R, [.68, .78, .45], [5.31, .78, 3.58], 3.3);
  pole(H, R, [.7, 5.35, .38], [.7, 10.23, 3.55], 3.3);
  for (const [i, j] of [[.65, .72], [5.37, .72], [10.83, .72], [.65, 5.31], [.65, 10.32]]) for (const z of [1.47, 3.15]) binding(H, R, i, j, z);
  shape(H, R, [H.p(.47, .3, 3.81), H.p(4.95, .3, 3.81), H.p(4.95, 1.72, 3.55), H.p(.47, 1.72, 3.55)], 'paper', .82, 1);
  for (let i = .55; i < 4.96; i += .3) H.line(R, [H.p(i, .3, 3.82), H.p(i, 1.72, 3.56)], 'blue', .85, { tone: .6 });
  for(const j of [1.05,1.62,2.19])pole(H,R,[.65,j,2.49],[5.37,j,2.49],3.6,'sun');
  for(let n=0;n<8;n++){
    const i=.76+n*.59;
    timber(H,R,i,.87,.54,1.57,2.54,.11,n===5?'teal':'sun');
    for(const j of [1.05,2.19])binding(H,R,i+.27,j,2.67);
  }
  for(const i of [.65,5.37]){
    pole(H,R,[i,.72,1.47],[i,2.28,2.51],3.1,'sun');
    binding(H,R,i,.72,1.47);binding(H,R,i,2.19,2.51);
  }
  box(H, R, .78, 2.7, 1.42, .36, .02, .3, 'coral', .45);
  box(H, R, .78, 7.35, 1.42, .36, .02, .3, 'coral', .45);
  for (let q = 0; q < 6; q++) pole(H, R, [1 + q % 3 * .31, 2.34, .44 + Math.floor(q / 3) * .2], [1 + q % 3 * .31, 8.01, .44 + Math.floor(q / 3) * .2], 4.0);
  for (const j of [3.0, 7.23]) {
    for (let q = 0; q < 3; q++) H.line(R, [H.p(.86, j + q * .04, .45), H.p(1.74, j + q * .04, .84)], 'coral', 1.1);
  }
  for (const i of [4.25, 7.56]) {
    for (const j of [4.77, 6.1]) pole(H, R, [i, j, .08], [i, 5.47, 1.0], 3, 'coral');
    box(H, R, i - .18, 5.11, .36, .77, .99, .13, 'blue', .52);
  }
  pole(H, R, [3.79, 5.45, 1.18], [8.15, 5.45, 1.18], 5.0);
  pole(H, R, [6.04, 4.22, 1.39], [6.04, 6.52, 1.39], 4.6);
  binding(H, R, 6.04, 5.45, 1.42, 'blue');
  coil(H, R, 4.78, 7.38, 'blue', 1.12);
  coil(H, R, 2.54, 9.01, 'coral', .85);
  table(H, R, 8.74, 1.86, 2.42, 1.36, .64, 'paper');
  box(H, R, 8.94, 2.05, 1.03, .84, .79, .4, 'teal', .62);
  box(H, R, 9.23, 2.24, .43, .13, 1.19, .12, 'blue', .7);
  H.line(R, [H.p(8.95, 2.9, .95), H.p(9.96, 2.9, .95)], 'paper', .8);
  box(H, R, 10.21, 2.08, .72, .26, .79, .16, 'sun', .65);
  const [lx, ly] = H.p(10.56, 2.23, .97);
  oval(H, R, lx, ly, 4.6, 2.1, 'teal', .6);
  H.line(R, [[lx - 2, ly - 2], [lx - 2, ly + 2]], 'blue', .7);
  box(H, R, 10.22, 2.53, .66, .34, .79, .045, 'blue', .75);
  H.line(R, [H.p(10.44, 2.69, .85), H.p(10.96, 2.87, .85)], 'coral', 3);
  box(H, R, 8.79, 1.99, .2, .19, .8, .54, 'paper', 1);
  box(H, R, 8.81, 2.01, .16, .15, 1.34, .07, 'coral', .7);
  const [hx, hy] = H.p(10.85, .81, 2.53);
  oval(H, R, hx, hy, 16, 6, 'sun', .65);
  shape(H, R, [[hx - 13, hy], [hx - 10, hy - 12], [hx + 2, hy - 18], [hx + 12, hy - 9], [hx + 13, hy]], 'sun', .7, .8);
  H.line(R, [[hx, hy - 16], [hx, hy - 3]], 'paper', 1.5);
  table(H, R, 8.84, 8.54, 2.07, .81, .49, 'coral');
  for (let q = 0; q < 2; q++) {
    const [x, y] = H.p(9.06 + q * .58, 8.93, .65);
    shape(H, R, [[x - 6, y + 3], [x - 6, y - 6], [x - 3, y - 13], [x, y - 11], [x + 4, y - 14], [x + 7, y - 5], [x + 5, y + 5]], 'paper', 1, .5);
  }
  box(H, R, 10.14, 10.16, 1.16, 1.02, .02, .66, 'teal', .32);
  for (let q = 0; q < 5; q++) pole(H, R, [10.29 + q * .18, 10.38, .41], [10.21 + q * .2, 10.52, .98 + q % 2 * .16], 3);
  pole(H, R, [8.42, 10.33, .07], [8.42, 10.33, 1.8], 2.4, 'coral');
  for (let q = 0; q < 9; q++) H.line(R, [H.p(8.42, 10.33, .35), H.p(8.13 + q * .08, 10.53, .03)], 'sun', 1.5);
  pole(H, R, [3.89, 9.82, .13], [6.02, 9.82, .13], 3.7);
  for (const [i, ink] of [[4.18, 'coral'], [4.85, 'blue'], [5.43, 'teal']]) binding(H, R, i, 9.82, .15, ink);
  tsuenWanBambooDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), tight = u < .12 ? 0 : u < .34 ? (1 - Math.cos((u - .12) / .22 * Math.PI)) / 2 : u < .56 ? 1 : u < .75 ? (1 + Math.cos((u - .56) / .19 * Math.PI)) / 2 : 0;
  actor(H, R, 6.69, 6.15, t, 'hongKongBambooTension', { shirt: ['teal', .58], pants: ['blue', .74], hairStyle: 'short', face: 'nw', prop(HH, RR, points) {
    const joint = HH.p(6.04, 5.45, 1.45);
    for (const hand of [points.nearHand, points.farHand]) stroke(HH, RR, [joint, [(joint[0] + hand[0]) / 2, (joint[1] + hand[1]) / 2 + 11 * (1 - tight)], hand], 'blue', 1.6);
    const [x, y] = points.nearHand;
    stroke(HH, RR, [[x, y], [x + 6, y + 10], [x + 3, y + 22]], 'blue', 1.2);
  } }, 0, 1.45);
  actor(H, R, 9.2, 5.9, t, 'hongKongBambooTeacher', { shirt: ['coral', .57], hairStyle: 'short', face: 'nw' }, 0, 1.3, 'elder');
  const [x, y] = H.p(.66, 10.36, 1.45);
  stroke(H, R, [[x, y], [x + 6 + Math.sin(u * TAU) * 2, y + 17], [x + 3, y + 31]], 'blue', 1.1);
});

room.loopSeconds = 16;
export default room;
