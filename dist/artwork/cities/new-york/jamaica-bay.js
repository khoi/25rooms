import { surface, timber, metal, bentTube } from '../materials.js';
import { shallowTray, foldedCloth, coiledLine, boundBook, satchel, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 50, ar: 45, el: 68, er: 74, head: 10 };
const watching = { ...seated, al: 160, ar: 154, el: 32, er: 33, head: -12, lean: 4 };
FIGURES.clips.newYorkBinoculars = { dur: 20, keys: [[0, seated], [.13, seated], [.28, watching], [.48, { ...watching, head: -16, lean: 5 }], [.61, watching], [.76, seated], [1, seated]] };

function reeds(H, R, i, j, h, ink = 'teal') {
  const [x, y] = H.p(i, j, 0.05);
  for (let n = 0; n < 7; n++) {
    const lean = (n - 3) * 4;
    stroke(
      H,
      R,
      [
        [x + n - 3, y],
        [x + lean * 0.55, y - h * 0.57],
        [x + lean, y - h + (n % 3) * 7]
      ],
      ink,
      1.35,
      0.6
    );
    if (n % 2 === 0)
      shape(
        H,
        R,
        [
          [x + lean - 2, y - h + (n % 3) * 7],
          [x + lean, y - h - 10 + (n % 3) * 7],
          [x + lean + 3, y - h + (n % 3) * 7]
        ],
        'sun',
        0.55,
        0.4
      );
  }
  for (let n = 0; n < 5; n++) {
    const lean = (n - 2) * 5,
      yy = y - h * 0.45 - (n % 2) * 8;
    surface(
      H,
      R,
      [
        [x + lean * 0.4, yy],
        [x + lean - 4, yy - 17],
        [x + lean - 11, yy - 22],
        [x + lean - 7, yy - 11]
      ],
      ink,
      0.52,
      0.35
    );
    H.line(
      R,
      [
        [x + lean * 0.4, yy],
        [x + lean - 11, yy - 22]
      ],
      'sun',
      0.55
    );
  }
}

function shorebird(H, R, x, y, dip) {
  for (const d of [-3, 3]) H.line(R, [[x + d, y], [x + d - 1, y - 13]], 'blue', .8);
  oval(H, R, x, y - 15, 9, 5, 'paper', 1);
  shape(H, R, [[x - 6, y - 17], [x - 13, y - 20], [x - 8, y - 13]], 'blue', .57, .5);
  stroke(H, R, [[x + 4, y - 17], [x + 9, y - 25 + dip * 12], [x + 15, y - 24 + dip * 19]], 'paper', 3.4);
  oval(H, R, x + 15, y - 25 + dip * 19, 4, 3.5, 'paper', 1);
  H.line(R, [[x + 18, y - 25 + dip * 19], [x + 27, y - 24 + dip * 22]], 'blue', 1.1);
  H.dot(x + 16, y - 26 + dip * 19, .8, 'blue');
}

function jamaicaBayDetails(H, R) {
  table(H, R, 9.91, 9.4, 1.46, 1.82, 0.65, 'teal');
  shallowTray(H, R, 10.05, 9.58, 1.15, 1.43, 0.8, 'paper');
  boundBook(H, R, 10.19, 9.73, 0.86, 0.88, 1.0, 'sun');
  foldedCloth(H, R, 10.22, 10.69, 0.71, 0.2, 1.0, 'paper', 'teal');
  for (const i of [10.1, 11.14]) for (const j of [9.61, 11.0]) oval(H, R, ...H.p(i, j, 0.08), 3, 4, 'blue', 0.65);
  const [x, y] = H.p(9.79, 5.17, 0.14);
  for (const dx of [-15, 0, 15])
    H.line(
      R,
      [
        [x, y - 51],
        [x + dx, y]
      ],
      'blue',
      1.6
    );
  shape(
    H,
    R,
    [
      [x - 24, y - 56],
      [x + 16, y - 66],
      [x + 18, y - 56],
      [x - 21, y - 47]
    ],
    'teal',
    0.6,
    0.7
  );
  oval(H, R, x + 18, y - 61, 4, 5, 'paper', 1);
  framedPanel(H, R, 0.57, 4.24, 1.45, 1.57, 0.86, 'sun');
  for (const i of [3.07, 8.19]) {
    H.line(R, [H.p(i, 4.23, 2.5), H.p(i, 4.51, 2.8)], 'blue', 1.4);
    oval(H, R, ...H.p(i, 4.51, 2.82), 3, 3, 'sun', 0.6);
  }
  shallowTray(H, R, 4.11, 10.48, 2.14, 0.83, 0.13, 'teal');
  for (const i of [4.61, 5.43]) oval(H, R, ...H.p(i, 10.85, 0.34), 11, 5, 'blue', 0.6);
  satchel(H, R, 7.86, 10.35, 0.14, 'coral', 0.8);
  coiledLine(H, R, 9.42, 8.15, 0.71, 9, 'blue');
  for (const j of [5.1, 6.93])
    servicePipe(
      H,
      R,
      [
        [0.24, j, 0.18],
        [0.24, j, 2.92],
        [0.57, j, 2.92]
      ],
      'paper',
      1.8
    );
}

function construction(H, R) {
  for (let n = 0; n < 14; n++) {
    const i = 0.34 + n * 0.81;
    H.line(R, [H.p(i, 4.195, 0.24), H.p(i, 4.195, 1.19)], 'blue', 0.65);
    for (const z of [0.35, 1.06, 2.7, 3.09]) H.dot(...H.p(i + 0.09, 4.21, z), 1, 'sun');
  }
  for (const i of [0.26, 3.52, 8.68, 11.71]) H.line(R, [H.p(i, 4.32, 2.74), H.p(i + 0.34, 4.56, 3.28)], 'sun', 1.6);
  for (const [a, b] of [
    [0.58, 3.2],
    [3.83, 8.34],
    [8.98, 11.43]
  ]) {
    H.line(R, [H.p(a, 4.2, 2.55), H.p(b, 4.2, 2.55)], 'blue', 2);
    for (const i of [a + 0.2, b - 0.2]) H.line(R, [H.p(i, 4.2, 2.56), H.p(i, 4.6, 2.8)], 'teal', 1.1);
  }
  box(H, R, 0.28, 5.03, 0.11, 2.24, 1.36, 1.1, 'sun', 0.5);
  for (let n = 0; n < 4; n++) {
    const j = 5.21 + n * 0.51,
      [x, y] = H.p(0.41, j, 1.83);
    shape(
      H,
      R,
      [
        [x - 7, y + 8],
        [x + 8, y + 8],
        [x + 8, y - 14],
        [x - 7, y - 14]
      ],
      'paper',
      1,
      0.6
    );
    shape(
      H,
      R,
      [
        [x - 4, y],
        [x + 1, y - 5],
        [x + 5, y - 3],
        [x + 7, y - 6],
        [x + 6, y + 1],
        [x - 2, y + 3]
      ],
      'teal',
      0.6,
      0.45
    );
    H.line(
      R,
      [
        [x - 3, y + 5],
        [x + 4, y + 5]
      ],
      'coral',
      0.6
    );
  }
  const [x, y] = H.p(2.43, 8.94, 0.93);
  oval(H, R, x, y, 8, 6, 'paper', 1);
  oval(H, R, x, y, 5, 3.5, 'teal', 0.15);
  H.line(
    R,
    [
      [x + 5, y + 3],
      [x + 14, y + 11]
    ],
    'blue',
    2
  );
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(10.27 + n * 0.19, 9.76, 0.83);
    H.line(
      R,
      [
        [px, py],
        [px + 4, py - 11]
      ],
      'sun',
      0.8
    );
    shape(
      H,
      R,
      [
        [px, py],
        [px + 1, py - 11],
        [px + 7, py - 15],
        [px + 5, py - 4]
      ],
      n % 2 ? 'paper' : 'teal',
      0.45,
      0.5
    );
  }
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(0.82 + n * 0.77, 1.32, 0.035);
    oval(H, R, px, py, 7 + (n % 2) * 4, 2.4, 'sun', 0.26);
    H.line(
      R,
      [
        [px - 4, py],
        [px + 3, py]
      ],
      'teal',
      0.5
    );
  }
  for (let n = 0; n < 4; n++) reeds(H, R, 8.17 + n * 0.87, 1.06 + (n % 2) * 0.35, 0.68 + (n % 2) * 0.22, 'teal');
  for (const i of [4.24, 7.57]) H.line(R, [H.p(i, 6.1, 0.16), H.p(i, 6.47, 0.57)], 'sun', 1.4);
  for (let n = 0; n < 7; n++) H.dot(...H.p(4.35 + n * 0.51, 6.7, 0.89), 1.1, 'sun');
  const [px, py] = H.p(9.49, 8.31, 0.67);
  shape(
    H,
    R,
    [
      [px - 10, py],
      [px + 10, py],
      [px + 10, py - 10],
      [px - 10, py - 10]
    ],
    'teal',
    0.55,
    0.6
  );
  for (const dx of [-6, 6])
    H.line(
      R,
      [
        [px + dx, py - 10],
        [px + dx, py]
      ],
      'paper',
      1
    );
  stroke(
    H,
    R,
    [
      [px - 4, py - 10],
      [px - 4, py - 16],
      [px + 4, py - 16],
      [px + 4, py - 10]
    ],
    'blue',
    0.9
  );
}

const room = world('new-york-jamaica-bay', 'Jamaica Bay · A Quiet Opening', {
  floor: 'teal', tone: .15, wall: false, head: 20,
}, (H, R) => {
  shape(H, R, H.tile(.05, .05, 11.9, 4.25, .02), 'teal', .42);
  shape(H, R, [H.p(.1, .1, .04), H.p(11.9, .1, .04), H.p(11.9, 1.15, .04), H.p(9.2, .83, .04), H.p(6.6, 1.56, .04), H.p(3.35, 1.3, .04), H.p(.1, 2.22, .04)], 'sun', .22, .7);
  for (let n = 0; n < 15; n++) {
    const i = .4 + (n * .77) % 11.1, j = .28 + n % 3 * .24;
    reeds(H, R, i, j, 12 + n % 5 * 3, n % 4 ? 'teal' : 'blue');
  }
  for (let n = 0; n < 11; n++) {
    const i = .5 + (n * 1.31) % 10.7, j = 1.6 + n % 4 * .5;
    H.line(R, [H.p(i, j, .07), H.p(i + .45, j + .08, .07)], 'paper', .8, { tone: .65 });
  }
  shape(H, R, [H.p(8.1, 1.48, .05), H.p(10.6, 1.34, .05), H.p(11.55, 2.13, .05), H.p(9.5, 2.48, .05), H.p(7.7, 2.1, .05)], 'paper', .8, .6);
  shape(H, R, H.tile(.04, 4.0, 11.92, 7.93, .09), 'paper', 1);
  for (let j = 4.1; j < 12; j += .42) H.line(R, [H.p(.05, j, .11), H.p(11.95, j, .11)], 'blue', .7, { tone: .4 });
  for (let n = 0; n < 20; n++) {
    const i = .4 + (n * 1.17) % 11.2, j = 4.1 + n % 9 * .85;
    H.line(R, [H.p(i, j, .115), H.p(i, j + .4, .115)], 'blue', .6, { tone: .35 });
  }
  box(H, R, .12, 3.96, 11.73, .22, .11, 1.2, 'teal', .43);
  box(H, R, .12, 3.96, 11.73, .22, 2.52, .74, 'teal', .5);
  for (let i = .3; i < 11.8; i += .53) {
    H.line(R, [H.p(i, 4.2, .17), H.p(i, 4.2, 1.31)], 'blue', .7, { tone: .6 });
    H.line(R, [H.p(i, 4.2, 2.55), H.p(i, 4.2, 3.26)], 'blue', .7, { tone: .6 });
  }
  for (const i of [.2, 3.45, 8.6, 11.65]) box(H, R, i, 3.84, .19, .45, .1, 3.18, 'blue', .73);
  box(H, R, .03, 4.0, .2, 4.1, .12, 2.75, 'teal', .45);
  for (let j = 4.2; j < 8; j += .5) H.line(R, [H.p(.25, j, .18), H.p(.25, j, 2.87)], 'blue', .65, { tone: .4 });
  timber(H,R,.05,3.8,11.83,.64,3.28,.15,'sun');
  for(const i of [.2,3.45,8.6,11.65]){
    timber(H,R,i,3.91,.17,2.29,3.22,.15,'sun');
    bentTube(H,R,[[i,4.17,2.66],[i,4.87,3.24]],2.6,'teal');
    metal(H,R,i-.04,4.27,.25,.21,3.19,.055,'teal');
  }
  box(H, R, .08, 4.15, 11.8, .6, 1.27, .12, 'sun', .53);
  for (const i of [1.1, 4.4, 7.7, 10.8]) {
    H.line(R, [H.p(i, 4.4, 3.3), H.p(i, 5.16, 3.66)], 'blue', 2.2);
  }
  shape(H, R, [H.p(.03, 3.92, 3.4), H.p(11.9, 3.92, 3.4), H.p(11.9, 5.22, 3.73), H.p(.03, 5.22, 3.73)], 'teal', .42, 1);
  for (let i = .4; i < 12; i += .55) H.line(R, [H.p(i, 3.97, 3.42), H.p(i, 5.17, 3.73)], 'blue', .7, { tone: .5 });
  table(H, R, 4.05, 5.91, 3.75, .77, .58, 'coral');
  box(H, R, 4.05, 6.53, 3.75, .14, .71, .38, 'coral', .47);
  table(H, R, .75, 8.3, 2.45, 1.38, .74, 'teal');
  shape(H, R, H.tile(.93, 8.53, 1.24, .88, .89), 'paper', 1);
  const [mx, my] = H.p(1.54, 8.98, .92);
  stroke(H, R, [[mx - 16, my - 4], [mx - 7, my + 2], [mx + 2, my - 8], [mx + 18, my - 2]], 'teal', 2.1, .67);
  H.line(R, [H.p(2.45, 8.57, .89), H.p(2.65, 9.3, .89)], 'coral', 2.1);
  box(H, R, 1.08, 8.54, .71, .58, .95, .05, 'sun', .68);
  const [tx, ty] = H.p(2.69, 8.59, .91);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 4, ty - 24], [tx - 4, ty - 24]], 'blue', .73, .6);
  oval(H, R, tx, ty - 24, 4, 2, 'paper', 1);
  oval(H, R, tx + 13, ty + 2, 5, 2, 'coral', .7);
  shape(H, R, [[tx + 8, ty + 1], [tx + 8, ty - 6], [tx + 18, ty - 6], [tx + 18, ty + 1]], 'paper', 1, .6);
  box(H, R, 8.94, 7.66, 1.04, 1.17, .09, .53, 'sun', .6);
  oval(H, R, ...H.p(9.46, 8.17, .7), 17, 12, 'teal', .68);
  const [sx, sy] = H.p(9.46, 8.17, 1.06);
  stroke(H, R, [[sx - 12, sy + 18], [sx - 16, sy], [sx + 10, sy - 3], [sx + 14, sy + 14]], 'blue', 1.8);
  for (const k of [0, 1]) H.line(R, [H.p(9.0 + k * .9, 7.68, .25), H.p(9.0 + k * .9, 8.76, .25)], 'blue', 1.3);
  for (const [i, j] of [[10.95, 9.73], [11.12, 11.13], [.68, 10.89]]) reeds(H, R, i, j, 23, 'teal');
  shape(H, R, H.tile(4.31, 9.63, 2.84, 1.46, .13), 'teal', .15);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(4.42 + n * .39, 9.71, .15), H.p(4.42 + n * .39, 11.04, .15)], 'coral', .8, { tone: .42 });
  for (const [i, j] of [[7.56, 8.12], [3.43, 10.86]]) {
    const [x, y] = H.p(i, j, .14);
    shape(H, R, [[x - 6, y], [x + 2, y - 6], [x + 9, y - 2], [x + 2, y + 4]], 'sun', .58, .6);
    H.line(R, [[x - 3, y], [x + 5, y - 2]], 'blue', .5);
  }
  jamaicaBayDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 20);
  const dip = u > .37 && u < .68 ? Math.sin((u - .37) / .31 * Math.PI) ** 2 : 0;
  H.clip(H.faceI(.22, 4.22, 11.39, 1.4, 2.51), () => shorebird(H, R, ...H.p(9.8, 1.35, .08), dip));
  actor(H, R, 5.88, 6.29, t, 'newYorkBinoculars', {
    shirt: ['coral', .58], pants: ['blue', .65], hairStyle: 'cap', glasses: true, face: 'ne',
    prop(HH, RR, points) {
      const [x, y] = points.nearHand;
      const [hx, hy] = points.head;
      stroke(HH, RR, [[hx - 4, hy + 8], [x - 9, y + 15], [x + 6, y + 7]], 'blue', .8, .68);
      for (const dx of [-4, 5]) {
        shape(HH, RR, [[x + dx - 4, y - 2], [x + dx - 2, y - 13], [x + dx + 4, y - 13], [x + dx + 5, y - 2]], 'blue', .84, .65);
        oval(HH, RR, x + dx + 1, y - 13, 3, 2, 'teal', .6);
      }
      HH.line(RR, [[x - 1, y - 6], [x + 8, y - 6]], 'blue', 2);
    },
  }, .12, 1.22);
  for (let n = 0; n < 3; n++) {
    const p = cycle(t + n * 6, 20);
    H.opacity(Math.sin(p * Math.PI) * .35, () => H.outline(R, ell(...H.p(4.2 + n * 1.13, 2.73, .075), 7 + p * 20, 2 + p * 5), 'paper', .8));
  }
  const sway = Math.sin(u * TAU) * 3;
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(11.33 + n * .1, 3.25 + n * .12, .05);
    stroke(H, R, [[x, y], [x + sway, y - 13], [x + sway * 1.4 - 3 + n * 2, y - 27]], 'teal', 1.2, .63);
  }
});
room.loopSeconds = 20;
export default room;
