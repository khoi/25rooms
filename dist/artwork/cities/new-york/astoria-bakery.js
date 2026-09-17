import { benchFrame, drape, metal, surface } from '../materials.js';
import { cornice, wallRack, hangingRail, taskLight, caster } from '../joinery.js';
import { shelfUnit, shallowTray, liddedTin, foldedCloth, boundBook, handTool, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, TAU, wallRect, wallPt, windowOn } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const rolling = { ...rest, lean: -11, head: 17, al: 57, ar: 66, el: 15, er: 14 };
FIGURES.clips.newYorkAstoriaRoll = { dur: 14, keys: [[0, rolling], [.13, rolling], [.26, { ...rolling, lean: -16, al: 75, ar: 81, el: 3, er: 2 }], [.39, rolling], [.52, { ...rolling, lean: -16, al: 75, ar: 81, el: 3, er: 2 }], [.65, rolling], [.81, { ...rolling, head: -3, lean: -5, al: 49, ar: 56 }], [.91, { ...rolling, head: -3, lean: -5, al: 49, ar: 56 }], [1, rolling]] };
FIGURES.clips.newYorkAstoriaTray = { dur: 14, keys: [[0, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: 3 }], [.54, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: -10 }], [.78, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: -10 }], [1, { ...rest, al: 52, ar: 59, el: 52, er: 51, head: 3 }]] };

function loaf(H, R, i, j, z, length = 18, twist = false) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y - 2, length, 7, 'sun', .72);
  if (twist) {
    for (let q = 0; q < 5; q++) {
      stroke(H, R, [[x - length + 4 + q * length * .36, y + 2], [x - length + 8 + q * length * .36, y - 5], [x - length + 12 + q * length * .36, y + 1]], 'coral', 1.2, .58);
    }
  } else for (let q = 0; q < 3; q++) H.line(R, [[x - 9 + q * 8, y - 6], [x - 6 + q * 8, y - 1]], 'paper', 1.5);
  H.line(R, [[x - length + 4, y + 3], [x + length - 4, y + 3]], 'coral', .7, { tone: .5 });
}

function bowl(H, R, i, j, z, size = 13, cover = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - size, y - 8], [x - size * .65, y + 5], [x, y + 9], [x + size * .65, y + 5], [x + size, y - 8]], 'paper', 1, .8);
  oval(H, R, x, y - 8, size, 5, cover ? 'teal' : 'sun', cover ? .47 : .27);
  if (cover) for (let k = -2; k <= 2; k++) H.line(R, [[x + k * 5 - 3, y - 11], [x + k * 5 + 3, y - 3]], 'paper', .8);
}

function breadRack(H, R) {
  for (const i of [1.06, 2.87])
    for (const j of [7.43, 10.85]) {
      oval(H, R, ...H.p(i, j, 0.13), 4.5, 6, 'blue', 0.9);
      box(H, R, i - 0.04, j - 0.04, 0.09, 0.09, 0.25, 2.85, 'blue', 0.68);
    }
  for (let row = 0; row < 5; row++) {
    const z = 0.45 + row * 0.51;
    metal(H, R, 1.01, 7.4, 1.92, 3.5, z, 0.065, 'teal');
    shape(H, R, H.tile(1.12, 7.51, 1.7, 3.25, z + 0.075), 'paper', 1, 0.5);
    if (row < 4) for (let k = 0; k < 3; k++) loaf(H, R, 1.98, 8.0 + k * 1.02, z + 0.13, row % 2 ? 17 : 13, row === 2);
    else {
      shape(H, R, H.tile(1.16, 7.63, 1.6, 2.07, z + 0.08), 'paper', 1, 0.7);
      for (let q = 0; q < 5; q++) H.line(R, [H.p(1.2, 7.7 + q * 0.42, z + 0.09), H.p(2.7, 7.7 + q * 0.42, z + 0.09)], 'coral', 0.8);
      loaf(H, R, 2.01, 10.28, z + 0.14, 16, true);
    }
  }
  for (const j of [7.43, 10.85]) H.line(R, [H.p(1.06, j, 3.1), H.p(2.87, j, 3.1)], 'blue', 2.4);
}

function astoriaBakeryDetails(H, R) {
  shelfUnit(H, R, 4.52, 0.21, 2.13, 0.74, 0.04, [0.13, 0.91, 1.69], 'teal');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 4.87 + n * 0.6, 0.59, 0.32, 7, 20, ['paper', 'teal', 'sun'][n]);
  shallowTray(H, R, 4.7, 0.34, 1.76, 0.49, 1.06, 'paper');
  for (let n = 0; n < 3; n++) loaf(H, R, 5.02 + n * 0.53, 0.6, 1.25, 7, true);
  foldedCloth(H, R, 4.71, 0.33, 1.72, 0.5, 1.84, 'paper', 'coral');
  table(H, R, 8.7, 9.55, 2.61, 1.65, 0.82, 'teal');
  shallowTray(H, R, 8.88, 9.72, 1.32, 1.25, 0.96, 'paper');
  for (let n = 0; n < 3; n++) loaf(H, R, 9.23 + (n % 2) * 0.57, 10.1 + Math.floor(n / 2) * 0.5, 1.16, 9, n === 1);
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(10.51 + n * 0.15, 10.17, 0.97);
    shape(
      H,
      R,
      [
        [x - 7, y],
        [x + 7, y + 3],
        [x + 7, y - 25],
        [x - 7, y - 28]
      ],
      'sun',
      0.4,
      0.5
    );
    H.line(
      R,
      [
        [x - 4, y - 23],
        [x + 4, y - 21]
      ],
      'paper',
      0.8
    );
  }
  slattedCrate(H, R, 8.92, 9.79, 1.88, 1.11, 0.03, 0.53, 'sun');
  for (let n = 0; n < 2; n++) {
    const [x, y] = H.p(6.85 + n * 0.44, 0.15, 2.97);
    H.line(
      R,
      [
        [x, y - 12],
        [x, y + 16]
      ],
      'sun',
      2.4
    );
    oval(H, R, x, y + 27, 9, 13, 'sun', 0.5);
    H.line(
      R,
      [
        [x - 5, y + 22],
        [x + 5, y + 30]
      ],
      'coral',
      0.6
    );
  }
  handTool(H, R, 6.88, 6.03, 1.08, 'brush', 'teal');
  boundBook(H, R, 10.36, 3.19, 0.74, 0.58, 0.03, 'coral');
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.12, 11.8, 3.47, 'teal');
  wallRack(H, R, 'nw', 3.33, 3.31, 1.88, 1.39, 2, 'sun', (P, z, row) => {
    for (let n = 0; n < 6; n++) {
      const [x, y] = P(0.35 + n * 0.52, z + 0.13);
      if (row) {
        shape(
          H,
          R,
          [
            [x - 4, y],
            [x + 4, y],
            [x + 4, y - 14],
            [x - 4, y - 14]
          ],
          n % 2 ? 'paper' : 'teal',
          0.6,
          0.5
        );
        oval(H, R, x, y - 14, 4, 2, 'coral', 0.6);
      } else {
        oval(H, R, x, y, 7, 4, 'sun', 0.5);
        H.line(
          R,
          [
            [x - 3, y - 3],
            [x + 2, y]
          ],
          'paper',
          0.7
        );
      }
    }
  });
  hangingRail(H, R, 'ne', 4.35, 2.65, 3.15, 4, (P, u, n) => {
    const [x, y] = P(u, -0.15);
    H.line(
      R,
      [
        [x, y],
        [x, y + 19]
      ],
      'sun',
      2
    );
    if (n < 2) {
      shape(
        H,
        R,
        [
          [x - 7, y + 19],
          [x + 7, y + 19],
          [x + 8, y + 33],
          [x - 8, y + 33]
        ],
        'sun',
        0.4,
        0.6
      );
      H.line(
        R,
        [
          [x - 5, y + 22],
          [x + 5, y + 30]
        ],
        'paper',
        0.7
      );
    } else {
      oval(H, R, x, y + 26, 6, 9, 'paper', 1);
      for (let q = 0; q < 3; q++)
        H.line(
          R,
          [
            [x - 3 + q * 3, y + 18],
            [x - 3 + q * 3, y + 33]
          ],
          'blue',
          0.5
        );
    }
  });
  for (let row = 0; row < 2; row++) {
    const z = 0.28 + row * 0.76;
    shape(H, R, H.faceI(0.66, 2.705, 3.27, z, z + 0.61), 'blue', 0.72, 0.8);
    shape(H, R, H.faceI(0.85, 2.72, 2.89, z + 0.12, z + 0.46), 'sun', 0.25, 0.6);
    H.line(R, [H.p(1.01, 2.75, z + 0.5), H.p(3.52, 2.75, z + 0.5)], 'paper', 2.1);
    for (let n = 0; n < 3; n++) H.dot(...H.p(0.79 + n * 1.4, 2.755, z + 0.54), 1.3, 'sun');
  }
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(0.82 + n * 0.99, 2.74, 1.83);
    oval(H, R, x, y, 4, 4, 'coral', 0.7);
    H.line(
      R,
      [
        [x, y],
        [x + 1, y - 3]
      ],
      'paper',
      0.8
    );
  }
  for (let n = 0; n < 8; n++) H.line(R, [H.p(1.34 + n * 0.2, 1.32, 3.17), H.p(1.34 + n * 0.2, 1.32, 3.47)], 'blue', 0.6);
  for (let n = 0; n < 4; n++) {
    const i = 3.87 + n * 0.91;
    shape(H, R, H.faceI(i, 6.49, 0.79, 0.29, 0.76), 'teal', 0.32, 0.6);
    H.line(R, [H.p(i + 0.18, 6.5, 0.65), H.p(i + 0.58, 6.5, 0.65)], 'sun', 1.5);
  }
  const [x, y] = H.p(8.63, 1.77, 1.03);
  shape(
    H,
    R,
    [
      [x - 12, y],
      [x + 13, y],
      [x + 11, y - 13],
      [x - 10, y - 13]
    ],
    'teal',
    0.6,
    0.8
  );
  oval(H, R, x, y - 21, 11, 11, 'paper', 1);
  H.line(
    R,
    [
      [x, y - 21],
      [x + 5, y - 27]
    ],
    'coral',
    1.3
  );
  for (let n = 0; n < 8; n++) {
    const a = (n * TAU) / 8;
    H.dot(x + Math.cos(a) * 8, y - 21 + Math.sin(a) * 8, 0.7, 'blue');
  }
  for (const i of [1.03, 2.89]) for (const j of [7.43, 10.83]) caster(H, R, i, j);
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(9.21 + n * 0.33, 10.19, 1.02);
    oval(H, R, px, py, 7, 3.6, 'sun', 0.5);
    for (let q = 0; q < 3; q++)
      H.line(
        R,
        [
          [px - 4 + q * 4, py - 3],
          [px - 2 + q * 4, py + 2]
        ],
        'paper',
        0.7
      );
  }
  taskLight(H, R, 3.94, 4.82, 1.04, 'teal', 0.6);
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(6.61 + n * 0.26, 7.54, 0.03);
    H.dot(px, py, 0.7 + (n % 2) * 0.6, 'paper', 1);
  }
}

const room = world('new-york-astoria-bakery', 'Astoria · A Twist Before Breakfast', {
  floor: 'paper', tone: 1, pattern: 'tiles', accent: 'teal', wall: 'paper', wallTone: 1, height: 3.75, head: 20,
}, (H, R) => {
  for (const side of ['ne', 'nw']) {
    for (let z = .33; z < 3.73; z += .35) {
      H.line(R, [wallPt(H, side, .04, z, .03), wallPt(H, side, 11.96, z, .03)], 'blue', .6, { tone: .27 });
      for (let a = (Math.round(z / .35) % 2) * .65; a < 12; a += 1.3) H.line(R, [wallPt(H, side, a, z, .03), wallPt(H, side, a, z + .35, .03)], 'blue', .55, { tone: .23 });
    }
    shape(H, R, wallRect(H, side, .02, 11.98, .02, .16, .04), 'teal', .58, .6);
  }
  windowOn(H, R, 'ne', 7.43, 1.68, 3.0, 1.54, { sky: 'sun', skyTone: .25, frameInk: 'teal', inside(P) {
    const [x, y] = H.p(7.5, .08, 2.24);
    H.line(R, [[x - 65, y + 5], [x + 65, y + 5]], 'coral', 8, { tone: .37 });
    H.line(R, [[x - 60, y - 26], [x - 20, y - 41], [x + 35, y - 15]], 'paper', 9);
  } });
  shape(H, R, H.faceI(9.7, .05, 1.95, .12, 3.1), 'teal', .66);
  shape(H, R, H.faceI(9.9, .08, 1.54, 1.04, 2.93), 'sun', .25);
  H.line(R, [H.p(11.37, .13, .88), H.p(11.37, .13, 1.36)], 'paper', 3);
  box(H, R, 9.6, .18, 2.15, .55, .02, .12, 'sun', .66);
  metal(H,R,.44,.63,3.73,2.05,.02,1.86,'teal');
  for (const z of [.29, 1.03]) {
    shape(H, R, H.faceI(.64, 2.7, 3.29, z, z + .58), 'blue', .77);
    surface(H,R,H.faceI(.9,2.73,2.77,z+.09,z+.48),'blue',.8);
    for(let n=0;n<4;n++)loaf(H,R,1.25+n*.7,2.77,z+.14,10,n%2===0);
    H.line(R,[H.p(.94,2.78,z+.14),H.p(3.64,2.78,z+.14)],'sun',1.4);
    for(const i of [.77,3.73])metal(H,R,i,2.71,.12,.1,z+.12,.32,'paper');
    H.line(R, [H.p(.96, 2.77, z + .53), H.p(3.59, 2.77, z + .53)], 'paper', 3);
  }
  for (const i of [1.0, 1.63, 2.26, 2.89, 3.52]) oval(H, R, ...H.p(i, 2.75, 1.72), 3.3, 4.1, 'paper', 1);
  box(H, R, .45, .63, 3.72, 2.05, 1.88, .14, 'paper', 1);
  shape(H, R, [H.p(.39, .57, 3.0), H.p(4.22, .57, 3.0), H.p(4.44, 2.81, 2.6), H.p(.21, 2.81, 2.6)], 'blue', .47);
  box(H, R, 1.24, .55, 1.7, .74, 3.0, .62, 'paper', 1);
  for (let i = .55; i < 4; i += .23) H.line(R, [H.p(i, 2.64, 2.66), H.p(i, 2.75, 2.65)], 'paper', .75);
  benchFrame(H,R,3.7,4.6,4.03,1.86,1,'sun');
  drape(H,R,3.78,5.42,.52,1.08,1.02,.6,'paper');
  shape(H, R, H.tile(3.77, 4.68, 3.89, 1.7, 1.01), 'paper', 1, .6);
  H.speckle(R, H.tile(5.76, 4.78, 1.63, 1.48, 1.025), 'sun', 45, .45, 1.2, .25);
  bowl(H, R, 4.24, 5.0, 1.11, 15);
  bowl(H, R, 4.15, 6.0, 1.11, 16, true);
  box(H, R, 4.84, 4.78, .64, .58, 1.03, .14, 'teal', .65);
  oval(H, R, ...H.p(5.17, 5.08, 1.23), 11, 5, 'paper', 1);
  const [sx, sy] = H.p(5.5, 5.97, 1.04);
  shape(H, R, [[sx - 9, sy], [sx + 9, sy - 4], [sx + 10, sy + 9], [sx - 7, sy + 13]], 'blue', .48, .7);
  H.line(R, [[sx - 9, sy], [sx + 9, sy - 4]], 'coral', 4);
  const [rx, ry] = H.p(5.3, 5.25, 1.12);
  H.line(R, [[rx - 23, ry - 7], [rx + 24, ry + 7]], 'sun', 6);
  H.line(R, [[rx - 31, ry - 9], [rx - 22, ry - 7]], 'blue', 2);
  H.line(R, [[rx + 24, ry + 7], [rx + 32, ry + 10]], 'blue', 2);
  box(H, R, 3.99, 4.83, 1.55, 1.23, .04, .43, 'paper', 1);
  H.line(R, [H.p(4.07, 6.08, .31), H.p(5.43, 6.08, .31)], 'teal', 2);
  for (const j of [4.97, 5.7]) box(H, R, 6.55, j, .61, .6, .04, .35, 'teal', .57);
  breadRack(H, R);
  table(H, R, 7.15, 1.37, 2.04, 1.05, .85, 'paper');
  shape(H, R, H.tile(7.31, 1.49, 1.7, .77, 1.0), 'teal', .5, .7);
  for (let i = 7.42; i < 8.95; i += .16) H.line(R, [H.p(i, 1.54, 1.015), H.p(i, 2.23, 1.015)], 'blue', .7);
  loaf(H, R, 7.88, 1.88, 1.1, 20, true);
  const [cx, cy] = H.p(5.1, .12, 2.76);
  oval(H, R, cx, cy, 15, 15, 'paper', 1);
  for (let k = 0; k < 12; k++) H.dot(cx + Math.sin(k * TAU / 12) * 11, cy + Math.cos(k * TAU / 12) * 11, 1, 'teal');
  H.line(R, [[cx, cy - 8], [cx, cy], [cx + 6, cy + 3]], 'blue', 1.3);
  box(H, R, 9.53, 6.8, 1.1, 1.04, .03, .56, 'coral', .68);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(9.64 + k * .24, 7.85, .12), H.p(9.64 + k * .24, 7.85, .45)], 'paper', 1.7);
  const [mx, my] = H.p(10.02, 7.22, .61);
  shape(H, R, [[mx - 6, my], [mx + 6, my], [mx + 6, my - 12], [mx - 6, my - 12]], 'paper', 1, .6);
  oval(H, R, mx, my - 12, 6, 2.4, 'blue', .64);
  stroke(H, R, [[mx + 6, my - 10], [mx + 12, my - 9], [mx + 11, my - 2], [mx + 6, my - 2]], 'teal', 1.2);
  oval(H, R, ...H.p(10.43, 7.61, .61), 12, 5, 'paper', 1);
  loaf(H, R, 10.43, 7.61, .66, 17);
  for (const j of [8.24, 8.62]) {
    box(H, R, 9.7, j, .45, .25, .02, .18, 'blue', .8);
    box(H, R, 9.7, j + .08, .21, .18, .18, .14, 'blue', .7);
  }
  for (const j of [4.91, 6.02]) {
    H.line(R, [H.p(.15, j, 2.46), H.p(.35, j, 2.35)], 'blue', 1.4);
    shape(H, R, [H.p(.33, j - .16, 2.32), H.p(.33, j + .16, 2.32), H.p(.33, j + .36, 1.35), H.p(.33, j - .3, 1.35)], j < 5 ? 'coral' : 'paper', j < 5 ? .69 : 1, .8);
    H.line(R, [H.p(.35, j, 2.18), H.p(.35, j, 1.44)], 'teal', .8);
  }
  box(H, R, 4.31, 9.83, 2.0, 1.1, .03, .17, 'teal', .57);
  shape(H, R, H.tile(4.44, 9.96, 1.74, .84, .21), 'paper', 1, .65);
  for (let q = 0; q < 4; q++) loaf(H, R, 4.78 + q % 2 * .72, 10.18 + Math.floor(q / 2) * .42, .27, 9);
  astoriaBakeryDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 14);
  H.at(7.84, 5.65, 0, HH => actor(HH, R, 7.84, 5.65, u * 14, 'newYorkAstoriaRoll', {
    face: 'sw', shirt: ['paper', 1], sleeve: ['paper', 1], apron: ['teal', .68], hairStyle: 'bun', skin: ['coral', .47], prop(h, r, p) {
      const x = (p.nearHand[0] + p.farHand[0]) / 2, y = (p.nearHand[1] + p.farHand[1]) / 2 + 3;
      oval(h, r, x, y, 22, 5.2, 'sun', .4);
      h.line(r, [[x - 18, y + 2], [x + 18, y + 2]], 'coral', .75, { tone: .36 });
      for (const hand of [p.nearHand, p.farHand]) oval(h, r, hand[0], hand[1], 3.1, 2.2, 'coral', .43);
    },
  }, 0, 1.43));
  H.at(4.32, 8.54, 0, HH => actor(HH, R, 4.32, 8.54, u * 14, 'newYorkAstoriaTray', {
    shirt: ['coral', .65], apron: ['paper', 1], hairStyle: 'short', skin: ['coral', .59], prop(h, r, p) {
      const x = (p.nearHand[0] + p.farHand[0]) / 2, y = (p.nearHand[1] + p.farHand[1]) / 2 + 2;
      shape(h, r, [[x - 27, y - 6], [x + 17, y - 3], [x + 26, y + 8], [x - 19, y + 7]], 'teal', .63, .8);
      for (let k = 0; k < 3; k++) oval(h, r, x - 13 + k * 13, y, 5.4, 3.6, 'sun', .68);
      h.line(r, [[x - 19, y + 7], [x + 26, y + 8]], 'blue', 1.4);
    },
  }, 0, 1.3));
  const [x, y] = H.p(10.55, .15, 2.85);
  stroke(H, R, [[x, y - 14], [x + Math.sin(u * TAU) * 2, y - 3]], 'blue', .7);
  oval(H, R, x + Math.sin(u * TAU) * 2, y, 3, 4, 'sun', .72);
});

room.loopSeconds = 14;
export default room;
