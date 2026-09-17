import { benchFrame, surface, metal, bentTube } from '../materials.js';
import { cornice, floorShadow, windowBay, cityView, hangingRail, wallRack, recessedFrame, taskLight, specimen, caster } from '../joinery.js';
import { shelfUnit, shallowTray, foldedCloth, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, bottle, steam, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const fold = { ...rest, lean: -7, head: 14, al: 69, ar: 74, el: 45, er: 42 };
FIGURES.clips.newYorkDumplingInspect = { dur: 14, keys: [[0, fold], [.12, fold], [.23, { ...fold, al: 74, el: 48, ar: 79, er: 40 }], [.33, fold], [.44, { ...fold, al: 74, el: 48, ar: 79, er: 40 }], [.56, fold], [.7, { ...fold, al: 53, ar: 58, el: 93, er: 87, head: -5 }], [.82, { ...fold, al: 53, ar: 58, el: 93, er: 87, head: -5 }], [.96, fold], [1, fold]] };

function bowl(H, R, i, j, z, size = 1, ink = 'paper', content = 'teal') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 12 * size, y - 4 * size], [x - 8 * size, y + 7 * size], [x + 7 * size, y + 7 * size], [x + 12 * size, y - 4 * size]], ink, .9, .7);
  oval(H, R, x, y - 4 * size, 12 * size, 5 * size, content, .5);
  oval(H, R, x, y - 3 * size, 9 * size, 3 * size, content, .7);
}

function dumpling(H, R, x, y, size = 1) {
  shape(H, R, [[x - 8 * size, y + 2 * size], [x - 6 * size, y - 5 * size], [x, y - 9 * size], [x + 7 * size, y - 5 * size], [x + 9 * size, y + 1 * size], [x + 3 * size, y + 4 * size]], 'paper', 1, .65);
  for (let n = -2; n <= 2; n++) stroke(H, R, [[x + n * 2.4 * size, y - (7 - Math.abs(n)) * size], [x + n * 2.7 * size + 2, y - 1 * size]], 'blue', .5);
}

function steamer(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 16 * size, y - 10 * size],
      [x - 16 * size, y + 3 * size],
      [x + 16 * size, y + 3 * size],
      [x + 16 * size, y - 10 * size]
    ],
    'sun',
    0.45,
    0.6
  );
  oval(H, R, x, y + 3 * size, 16 * size, 6 * size, 'sun', 0.5);
  oval(H, R, x, y - 10 * size, 16 * size, 6 * size, 'paper', 1);
  for (let n = -2; n <= 2; n++)
    H.line(
      R,
      [
        [x - 12 * size, y - 10 * size + n * 1.6],
        [x + 12 * size, y - 10 * size + n * 1.6]
      ],
      'teal',
      0.7,
      { tone: 0.5 }
    );
  for (let n = 0; n < 11; n++) {
    const dx = (-14 + n * 2.8) * size;
    H.line(
      R,
      [
        [x + dx, y - 8 * size],
        [x + dx + 1.2 * size, y + 3 * size]
      ],
      'coral',
      0.6
    );
  }
  H.line(
    R,
    [
      [x - 15 * size, y],
      [x + 15 * size, y]
    ],
    'sun',
    1.2
  );
  for (const dx of [-12, 12])
    H.line(
      R,
      [
        [x + dx * size, y - 6 * size],
        [x + (dx + 3) * size, y - 6 * size]
      ],
      'paper',
      1
    );
}

function chinatownKitchenDetails(H, R) {
  shelfUnit(H, R, 0.25, 6.11, 1.23, 1.1, 1.62, [0, 0.72], 'teal');
  for (let n = 0; n < 3; n++) bowl(H, R, 0.84, 6.34 + n * 0.3, 1.79, 0.47, 'paper', 'sun');
  for (let n = 0; n < 2; n++) foldedCloth(H, R, 0.41, 6.28, 0.89, 0.74, 2.48 + n * 0.12, 'paper', 'coral');
  table(H, R, 4.52, 9.76, 3.82, 1.34, 0.8, 'teal');
  shallowTray(H, R, 4.69, 9.94, 1.95, 0.98, 0.94, 'paper');
  for (let n = 0; n < 6; n++) dumpling(H, R, ...H.p(5 + (n % 3) * 0.53, 10.22 + Math.floor(n / 3) * 0.4, 1.15), 0.55);
  steamer(H, R, 7.44, 10.37, 1.04, 0.6);
  slattedCrate(H, R, 4.8, 9.94, 1.91, 0.99, 0.03, 0.48, 'sun');
  for (let n = 0; n < 4; n++) box(H, R, 5.05 + n * 0.36, 10.09, 0.08, 0.73, 0.16, 0.65, 'paper', 1);
  const [x, y] = H.p(10.88, 4.62, 0.05);
  oval(H, R, x, y, 20, 7, 'teal', 0.5);
  shape(
    H,
    R,
    [
      [x - 20, y],
      [x + 20, y],
      [x + 20, y - 26],
      [x - 20, y - 26]
    ],
    'paper',
    1,
    0.8
  );
  oval(H, R, x, y - 26, 20, 7, 'teal', 0.3);
  for (const dx of [-25, 25])
    stroke(
      H,
      R,
      [
        [x + dx * 0.7, y - 22],
        [x + dx, y - 24],
        [x + dx, y - 13],
        [x + dx * 0.7, y - 12]
      ],
      'blue',
      1.4
    );
  oval(H, R, x + 25, y + 8, 18, 6, 'paper', 1);
  H.dot(x + 25, y + 5, 3, 'blue');
  servicePipe(
    H,
    R,
    [
      [0.17, 1.67, 0.16],
      [0.17, 1.67, 3.09],
      [0.17, 0.16, 3.09],
      [2.03, 0.16, 3.09]
    ],
    'teal',
    2
  );
  handTool(H, R, 3.77, 7.75, 1.25, 'brush', 'sun');
  for (let n = 0; n < 3; n++) H.line(R, [H.p(7.62 + n * 0.21, 7.4, 1.25), H.p(7.62 + n * 0.21, 8.12, 1.25)], 'sun', 2.8);
}

function kitchenEnvelope(H, R) {
  cornice(H, R, 'nw', 0.1, 11.9, 3.48, 'paper');
  cornice(H, R, 'ne', 0.1, 11.9, 3.48, 'paper');
  floorShadow(H, 3.15, 3.05, 5.55, 5.55, 0.12);
  for (const j of [2.1, 7.6]) {
    shape(H, R, H.tile(0.12, j, 0.24, 2.8, 0.022), 'blue', 0.45, 0.5);
    for (let n = 0; n < 14; n++) H.line(R, [H.p(0.13, j + n * 0.2, 0.024), H.p(0.35, j + n * 0.2, 0.024)], 'paper', 0.7);
  }
}

function kitchenConstruction(H, R) {
  windowBay(H, R, 'nw', 2.1, 3.55, 1.48, 1.72, {
    divisions: 3,
    view(P) {
      cityView(H, R, P, 3.55, 1.72);
    }
  });
  for (const j of [2.3, 3.42, 4.55]) {
    shape(H, R, H.faceJ(1.415, j, 1, 0.15, 0.91), 'teal', 0.18, 0.8);
    shape(H, R, H.faceJ(1.43, j + 0.1, 0.8, 0.26, 0.79), 'paper', 1, 0.55);
    H.line(R, [H.p(1.45, j + 0.73, 0.6), H.p(1.45, j + 0.73, 0.78)], 'blue', 2);
  }
  hangingRail(H, R, 'nw', 6.1, 5.05, 3.08, 8, (P, u, n) => {
    const [x, y] = P(u, -0.16),
      length = 15 + (n % 3) * 6;
    H.line(
      R,
      [
        [x, y],
        [x, y + length]
      ],
      n % 3 === 0 ? 'sun' : 'blue',
      2.1
    );
    if (n % 3 === 0) {
      shape(
        H,
        R,
        [
          [x - 5, y + length],
          [x + 5, y + length],
          [x + 7, y + length + 12],
          [x - 6, y + length + 12]
        ],
        'sun',
        0.48,
        0.7
      );
      for (let q = 0; q < 3; q++)
        H.line(
          R,
          [
            [x - 3 + q * 3, y + length + 2],
            [x - 3 + q * 3, y + length + 10]
          ],
          'blue',
          0.5
        );
    } else {
      oval(H, R, x, y + length + 7, 6, 8, 'paper', 1);
      oval(H, R, x, y + length + 6, 4, 6, 'teal', 0.18);
    }
  });
  wallRack(H, R, 'ne', 0.27, 1.83, 1.3, 1.96, 3, 'coral', (P, z, row) => {
    for (let n = 0; n < 4; n++) {
      const [x, y] = P(0.36 + n * 0.36, z + 0.13);
      oval(H, R, x, y, 6, 2.5, 'paper', 1);
      H.line(
        R,
        [
          [x - 6, y],
          [x - 4, y + 6],
          [x + 4, y + 6],
          [x + 6, y]
        ],
        'teal',
        0.7
      );
      if (row === 1)
        H.line(
          R,
          [
            [x, y - 2],
            [x - 2, y - 12]
          ],
          'sun',
          1.1
        );
    }
  });
  recessedFrame(H, R, 'ne', 7.48, 1.2, 1.57, 1.68, 'paper', (P) => {
    for (let n = 0; n < 4; n++) {
      const z = 0.25 + n * 0.33;
      H.line(R, [P(0.22, z), P(0.98, z)], 'blue', 0.8);
      for (let q = 0; q < 4; q++) H.dot(...P(0.3 + q * 0.17, z + 0.12), q === n ? 1.9 : 0.9, q === n ? 'coral' : 'teal');
    }
  });
  for (const i of [9.27, 10.04, 10.81]) {
    shape(H, R, H.faceI(i, 1.965, 0.57, 0.2, 0.86), 'blue', 0.65, 0.7);
    H.line(R, [H.p(i + 0.12, 1.98, 0.72), H.p(i + 0.47, 1.98, 0.72)], 'paper', 1.5);
    oval(H, R, ...H.p(i + 0.28, 1.99, 0.95), 3.7, 3.7, 'coral', 0.8);
    H.line(R, [H.p(i + 0.28, 1.995, 0.91), H.p(i + 0.28, 1.995, 0.98)], 'paper', 0.8);
  }
  for (const x of [8.98, 11.43]) H.line(R, [H.p(x, 0.2, 3.34), H.p(x, 0.2, 3.5)], 'blue', 2);
  for (let n = 0; n < 7; n++) {
    const x = 9.14 + n * 0.32;
    H.dot(...H.p(x, 2.085, 3.22), 0.9, 'blue');
  }
  for (const i of [3.3, 7.4]) {
    H.line(R, [H.p(i, 4.5, 0.75), H.p(i, 8.22, 0.75)], 'blue', 2.3);
    for (let n = 0; n < 3; n++) {
      const j = 4.7 + n * 1.09;
      H.line(R, [H.p(i + 0.12, j + 0.05, 0.36), H.p(i + 0.82, j + 0.05, 0.36)], 'sun', 1.6);
      for (let q = 0; q < 4; q++) H.line(R, [H.p(i + 0.22 + q * 0.13, j + 0.1, 0.4), H.p(i + 0.22 + q * 0.13, j + 0.72, 0.4)], 'teal', 0.5);
    }
  }
  for (let n = 0; n < 5; n++) {
    bowl(H, R, 0.78, 8.31, 1.05 + n * 0.065, 0.72 - n * 0.02, 'paper', 'paper');
  }
  for (let n = 0; n < 5; n++) {
    const j = 9.3 + n * 0.2;
    oval(H, R, ...H.p(0.85, j, 1.08), 10, 5, 'paper', 1);
    H.line(R, [H.p(0.65, j, 0.96), H.p(0.65, j, 1.32)], 'blue', 1);
  }
  taskLight(H, R, 8.13, 7.91, 1.23, 'teal', -0.4);
  for (let n = 0; n < 6; n++) {
    const [x, y] = H.p(3.76, 5.7 + n * 0.12, 1.255);
    H.line(
      R,
      [
        [x - 7, y],
        [x + 5, y + 3]
      ],
      'blue',
      0.45,
      { tone: 0.35 }
    );
  }
  const [cx, cy] = H.p(10.72, 6.22, 0.05);
  shape(
    H,
    R,
    [
      [cx - 14, cy],
      [cx + 14, cy],
      [cx + 17, cy - 25],
      [cx - 15, cy - 25]
    ],
    'sun',
    0.36,
    0.8
  );
  oval(H, R, cx, cy - 25, 16, 6, 'paper', 1);
  specimen(H, R, cx, cy - 27, 0.54, 'teal');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(9.22, 10.75, 0.05 + n * 0.14);
    shape(
      H,
      R,
      [
        [x - 12, y],
        [x + 12, y],
        [x + 10, y - 7],
        [x - 10, y - 7]
      ],
      'paper',
      1,
      0.6
    );
    H.line(
      R,
      [
        [x - 6, y - 4],
        [x + 5, y - 4]
      ],
      'coral',
      1
    );
  }
  for (const i of [4.61, 8.17]) for (const j of [9.86, 10.99]) caster(H, R, i, j);
  const [x, y] = H.p(1.12, 6.03, 1.17);
  shape(
    H,
    R,
    [
      [x - 9, y],
      [x + 7, y - 2],
      [x + 8, y + 24],
      [x - 7, y + 28]
    ],
    'paper',
    1,
    0.6
  );
  for (let n = 0; n < 3; n++)
    H.line(
      R,
      [
        [x - 7, y + 16 + n * 3],
        [x + 7, y + 12 + n * 3]
      ],
      'coral',
      1
    );
}

const room = world('new-york-chinatown-kitchen', 'Chinatown · Fold and Gather', { floor: 'paper', tone: .65, wall: 'teal', wallTone: .18, pattern: 'tiles', height: 3.95, head: 32 }, (H, R) => {
  kitchenEnvelope(H,R);
  for (const side of ['nw', 'ne']) for (let n = .55; n < 12; n += .55) H.line(R, [wallPt(H, side, n, .1, .03), wallPt(H, side, n, 3.6, .03)], 'blue', .4, { tone: .24 });
  for (const side of ['nw', 'ne']) for (let n = .6; n < 3.6; n += .6) H.line(R, [wallPt(H, side, .05, n, .03), wallPt(H, side, 11.96, n, .03)], 'blue', .4, { tone: .24 });
  shape(H, R, wallRect(H, 'nw', 2.1, 5.65, 1.48, 3.2, .06), 'blue', .55, .9);
  shape(H, R, wallRect(H, 'nw', 2.25, 5.5, 1.63, 3.07, .09), 'paper', .95, .7);
  for (const p of [3.3, 4.4]) H.line(R, [wallPt(H, 'nw', p, 1.63, .12), wallPt(H, 'nw', p, 3.07, .12)], 'teal', 2);
  H.line(R, [wallPt(H, 'nw', 2.25, 2.33, .12), wallPt(H, 'nw', 5.5, 2.33, .12)], 'teal', 1.6);
  box(H, R, .3, 2.05, 1.1, 3.65, 0, 1.03, 'paper', .9);
  shape(H, R, H.tile(.39, 2.28, .88, 1.65, 1.05), 'blue', .5, .8);
  shape(H, R, H.tile(.52, 2.44, .61, 1.31, 1.07), 'teal', .4, .6);
  stroke(H, R, [H.p(.65, 2.64, 1.11), H.p(.65, 2.64, 1.78), H.p(1.03, 2.81, 1.79), H.p(1.03, 2.81, 1.48)], 'blue', 2.5);
  bottle(H, R, ...H.p(.81, 4.65, 1.06), 'teal', .52);
  shape(H, R, H.tile(.61, 5.12, .65, .37, 1.09), 'coral', .55, .6);
  benchFrame(H,R,3.25,3.06,5.3,1.24,1.21,'teal');
  benchFrame(H,R,3.25,4.3,1.23,4.1,1.21,'teal');
  benchFrame(H,R,7.32,4.3,1.23,4.1,1.21,'teal');
  for (const i of [3.37, 7.44]) for (let n = 0; n < 3; n++) {
    box(H, R, i, 4.72 + n * 1.1, .95, .91, .24, .09, 'teal', .4);
    box(H, R, i + .1, 4.8 + n * 1.1, .75, .64, .35, .36, 'paper', .9);
  }
  shape(H, R, H.tile(3.42, 5.17, .87, 1.9, 1.23), 'sun', .4, .6);
  for (let n = 0; n < 16; n++) H.dot(...H.p(3.44 + R() * .8, 5.19 + R() * 1.85, 1.25), .6 + R(), 'paper', 1);
  bowl(H, R, 3.84, 4.65, 1.36, .8, 'paper', 'teal');
  bowl(H, R, 7.82, 6.8, 1.32, .63, 'coral', 'paper');
  bowl(H, R, 7.82, 5.52, 1.32, .87, 'paper', 'teal');
  for (let n = 0; n < 7; n++) oval(H, R, ...H.p(3.77, 7.45, 1.24 + n * .025), 9, 4.5, 'paper', 1);
  H.line(R, [H.p(3.47, 6.55, 1.26), H.p(4.19, 6.95, 1.26)], 'sun', 5, { tone: .65 });
  H.line(R, [H.p(3.39, 6.5, 1.26), H.p(4.28, 7, 1.26)], 'blue', .65);
  box(H, R, 4.7, 3.25, 1.65, .81, 1.23, .08, 'teal', .55);
  shape(H, R, H.tile(4.8, 3.35, 1.45, .61, 1.33), 'paper', 1, .5);
  for (let n = 0; n < 8; n++) dumpling(H, R, ...H.p(4.96 + n % 4 * .37, 3.48 + Math.floor(n / 4) * .28, 1.36), .52);
  for (let n = 0; n < 3; n++) steamer(H, R, 7.8, 3.66, 1.37 + n * .31, .75);
  box(H, R, 8.95, .3, 2.55, 1.65, 0, 1.13, 'blue', .55);
  for (const i of [9.58, 10.73]) {
    oval(H, R, ...H.p(i, 1.06, 1.18), 15, 7, 'blue', .8);
    steamer(H, R, i, 1.06, 1.47, 1.15);
    steamer(H, R, i, 1.06, 1.78, 1.15);
    oval(H, R, ...H.p(i, 1.06, 2.12), 18, 7, 'sun', .52);
  }
  surface(H,R,[H.p(9.26,.19,3.58),H.p(11.32,.19,3.58),H.p(11.7,2.07,2.96),H.p(8.83,2.07,2.96)],'paper',1);
  surface(H,R,[H.p(11.32,.19,3.58),H.p(11.7,2.07,2.96),H.p(11.7,2.07,2.77),H.p(11.32,.19,3.21)],'teal',.5);
  metal(H,R,8.83,1.92,2.87,.15,2.77,.2,'teal');
  bentTube(H,R,[[10.21,.39,3.52],[10.21,.39,3.93],[11.36,.39,3.93]],6,'paper');
  shape(H, R, H.faceI(8.96, 2.09, 2.56, 2.81, 3.03), 'blue', .5, .6);
  for (let i = 9.1; i < 11.45; i += .22) H.line(R, [H.p(i, 2.11, 2.83), H.p(i, 2.11, 3)], 'paper', .8);
  for (const z of [1.82, 2.76]) {
    box(H, R, 2.5, .26, 4.92, .68, z, .12, 'teal', .6);
    for (let n = 0; n < 6; n++) {
      box(H, R, 2.66 + n * .76, .39, .54, .43, z + .13, .49, n % 3 === 0 ? 'coral' : 'paper', n % 3 === 0 ? .6 : .9);
      box(H, R, 2.64 + n * .76, .37, .58, .47, z + .63, .08, 'blue', .55);
    }
  }
  box(H, R, 9.67, 7.77, 1.55, 2.6, .03, .36, 'teal', .5);
  for (let n = 0; n < 3; n++) box(H, R, 9.82, 7.95, 1.23, 2.23, .43 + n * .36, .27, n % 2 ? 'paper' : 'sun', n % 2 ? 1 : .5);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(9.9 + n * .16, 10.2, 1.19), H.p(9.9 + n * .16, 10.2, 1.38)], 'blue', .55);
  box(H, R, 1.9, 9.76, 1.34, 1.33, .03, .13, 'coral', .52);
  for (const i of [2.12, 2.72]) {
    oval(H, R, ...H.p(i, 10.35, .22), 10, 5, 'blue', .73);
    H.line(R, [H.p(i, 10.35, .28), H.p(i, 10.35, .85)], 'paper', 3);
  }
  box(H, R, .25, 7.78, 1.12, 2.93, .03, .85, 'paper', .92);
  for (let n = 0; n < 3; n++) bowl(H, R, .82, 8.28 + n * .86, 1, .71, 'paper', 'paper');
  shape(H, R, H.tile(7.5, 7.35, .82, .7, 1.24), 'paper', 1, .6);
  dumpling(H, R, ...H.p(7.89, 7.7, 1.28), .73);
  chinatownKitchenDetails(H, R);
  kitchenConstruction(H,R);
}, (H, R, t) => {
  const u = cycle(t, 14);
  actor(H, R, 5.19, 6.12, u * 14, 'newYorkDumplingInspect', { face: 'sw', shirt: ['paper', 1], apron: ['coral', .7], hairStyle: 'bun', prop(h, r, points) {
    const [x, y] = points.nearHand;
    dumpling(h, r, x - 3, y + 1, .83);
  } }, .03, 1.42);
  actor(H, R, 6.62, 4.97, u * 14, 'newYorkDumplingInspect', { face: 'se', shirt: ['teal', .6], apron: ['paper', 1], hairStyle: 'short', prop(h, r, points) {
    const [x, y] = points.nearHand;
    shape(h, r, [[x - 4, y + 1], [x + 4, y + 1], [x + 9, y - 12], [x + 3, y - 14]], 'paper', 1, .55);
  } }, .03, 1.31);
  for (const i of [9.58, 10.73]) steam(H, R, ...H.p(i, 1.06, 2.16), u * 10, 2, 'paper');
});
room.loopSeconds = 14;
export default room;
