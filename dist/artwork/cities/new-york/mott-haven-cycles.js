import { surface, benchFrame } from '../materials.js';
import { cornice, windowBay, cityView, taskLight, caster } from '../joinery.js';
import { drawerUnit, shallowTray, foldedCloth, coiledLine, boundBook, handTool } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, TAU, ell, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const repair = { ...rest, lean: -8, head: 15, al: 25, el: 40, ar: 74, er: 13 };
FIGURES.clips.newYorkWheelTrue = { dur: 16, keys: [[0, repair], [.09, repair], [.16, { ...repair, ar: 93, er: 5 }], [.23, { ...repair, ar: 37, er: 57 }], [.4, { ...repair, ar: 37, er: 57, head: 25 }], [.48, repair], [.57, { ...repair, ar: 65, er: 23, al: 50, el: 33 }], [.66, { ...repair, ar: 68, er: 27, al: 50, el: 33 }], [.74, { ...repair, ar: 65, er: 23, al: 50, el: 33 }], [.87, repair], [1, repair]] };

function wheel(H, R, x, y, radius = 28, turn = 0, ink = 'blue') {
  H.outline(R, ell(x, y, radius * .82, radius), ink, 3.4, { tone: .85, amp: .12 });
  H.outline(R, ell(x, y, radius * .73, radius * .91), 'paper', 1.4, { tone: 1, amp: .08 });
  for (let n = 0; n < 16; n++) {
    const a = turn + n * TAU / 16;
    H.line(R, [[x, y], [x + Math.cos(a) * radius * .75, y + Math.sin(a) * radius * .94]], 'blue', .65, { tone: .55, amp: .05 });
  }
  const a = turn + .5;
  H.line(R, [[x + Math.cos(a) * radius * .44, y + Math.sin(a) * radius * .53], [x + Math.cos(a) * radius * .63, y + Math.sin(a) * radius * .78]], 'coral', 3, { tone: .9 });
  oval(H, R, x, y, 3, 4, 'sun', .8);
}

function bike(H, R, i, j, z = 0, scale = 1, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  const p = (a, b) => [x + a * scale, y + b * scale];
  wheel(H, R, ...p(-34, -28), 25 * scale);
  wheel(H, R, ...p(41, -28), 25 * scale);
  for (const points of [
    [
      [-34, -28],
      [-6, -64],
      [8, -29],
      [-34, -28]
    ],
    [
      [-6, -64],
      [31, -65],
      [8, -29]
    ],
    [
      [31, -65],
      [41, -28]
    ],
    [
      [8, -29],
      [26, -60]
    ]
  ])
    H.line(
      R,
      points.map(([a, b]) => p(a, b)),
      ink,
      3.8 * scale,
      { tone: 0.78, amp: 0.12 }
    );
  H.line(R, [p(-8, -68), p(-12, -79), p(-23, -79), p(1, -79)], 'blue', 3 * scale);
  stroke(H, R, [p(30, -65), p(26, -84), p(37, -88), p(48, -84), p(46, -74)], 'blue', 2 * scale);
  oval(H, R, ...p(8, -29), 7 * scale, 7 * scale, 'blue', 0.6);
  H.line(R, [p(8, -29), p(18, -20), p(24, -21)], 'paper', 2 * scale);
  stroke(H, R, [p(-38, -29), p(8, -24), p(10, -33), p(-34, -34), p(-38, -29)], 'blue', 0.75);
  H.line(R, [p(-35, -64), p(-15, -65), p(-28, -31)], 'blue', 1.2 * scale);
  for (const [a, b, c, d] of [
    [-6, -64, 31, -65],
    [-34, -28, 8, -29]
  ])
    H.line(R, [p(a, b - 1), p(c, d - 1)], 'paper', 0.8);
  stroke(H, R, [p(46, -77), p(25, -56), p(-4, -58), p(-26, -39)], 'blue', 0.7);
  stroke(H, R, [p(40, -80), p(47, -65), p(44, -45)], 'blue', 0.65);
  for (let n = 0; n < 14; n++) {
    const a = (n * TAU) / 14;
    H.dot(...p(8 + Math.cos(a) * 8, -29 + Math.sin(a) * 8), 0.85, 'sun');
  }
  H.line(R, [p(25, -47), p(30, -52)], 'coral', 2.3);
  surface(H, R, [p(-4, -50), p(0, -54), p(7, -45), p(3, -41)], 'paper', 1, 0.5);
}

function wrench(H, R, x, y, size = 1, ink = 'blue') {
  H.line(R, [[x, y], [x + 2 * size, y - 20 * size]], ink, 3 * size);
  stroke(H, R, [[x - 2 * size, y - 25 * size], [x - 3 * size, y - 20 * size], [x + 2 * size, y - 16 * size], [x + 6 * size, y - 21 * size], [x + 5 * size, y - 25 * size]], ink, 2 * size);
  oval(H, R, x, y + 1 * size, 3.5 * size, 3.5 * size, ink, .72);
  oval(H, R, x, y + 1 * size, 1.8 * size, 1.8 * size, 'paper', 1);
}

function mottHavenCyclesDetails(H, R) {
  drawerUnit(H, R, 7.35, 0.54, 3.78, 1.1, 1.18, 5, 'teal');
  shallowTray(H, R, 7.54, 0.7, 1.27, 0.74, 1.35, 'paper');
  for (let n = 0; n < 6; n++) {
    const [x, y] = H.p(7.79 + (n % 3) * 0.32, 0.93 + Math.floor(n / 3) * 0.27, 1.56);
    oval(H, R, x, y, 4, 3, n === 4 ? 'sun' : 'blue', 0.65);
    oval(H, R, x, y, 1.7, 1.2, 'paper', 1);
  }
  handTool(H, R, 9.32, 1.1, 1.36, 'spanner', 'coral');
  coiledLine(H, R, 10.35, 1.08, 1.36, 13, 'blue');
  for (const i of [8.11, 8.68, 9.25, 9.82, 10.39]) {
    H.line(R, [H.p(i, 0.16, 2.35), H.p(i, 0.38, 2.35)], 'sun', 1.5);
    const [x, y] = H.p(i, 0.4, 2.14);
    oval(H, R, x, y, 9, 16, 'blue', 0.3);
    oval(H, R, x, y, 6, 12, 'paper', 0.8);
  }
  table(H, R, 5.78, 9.6, 2.11, 1.43, 0.55, 'teal');
  shallowTray(H, R, 5.94, 9.75, 1.74, 1.04, 0.69, 'sun');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(6.14 + n * 0.35, 9.96, 0.9), H.p(6.14 + n * 0.35, 10.59, 0.9)], 'blue', 1.3);
  foldedCloth(H, R, 6.02, 9.78, 1.39, 0.96, 0.15, 'paper', 'coral');
  const [x, y] = H.p(8.93, 8.32, 0.03);
  for (const dx of [-12, 12])
    H.line(
      R,
      [
        [x + dx, y],
        [x, y - 26]
      ],
      'blue',
      2
    );
  oval(H, R, x, y - 29, 17, 8, 'coral', 0.55);
  box(H, R, 9.99, 8.11, 0.69, 0.7, 0.23, 0.44, 'teal', 0.4);
  for (let n = 0; n < 3; n++) wheel(H, R, ...H.p(10.37, 8.52 + n * 0.66, 0.54), 12, 0, 'blue');
  boundBook(H, R, 3.48, 9.47, 0.91, 0.6, 0.68, 'teal');
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.1, 11.8, 3.47, 'teal');
  windowBay(H, R, 'ne', 6.5, 4.6, 1.83, 1.65, {
    divisions: 4,
    view(P) {
      cityView(H, R, P, 4.6, 1.65);
    }
  });
  for (let row = 0; row < 6; row++) for (let n = 0; n < 18; n++) H.dot(...H.p(0.1, 1.31 + n * 0.31, 1.51 + row * 0.27), 0.65, 'blue', 0.6);
  for (let n = 0; n < 8; n++) {
    const [x, y] = H.p(0.17, 1.52 + n * 0.63, 2.95);
    H.dot(x, y, 1.4, 'sun');
    H.line(
      R,
      [
        [x, y],
        [x, y + 8]
      ],
      'blue',
      0.8
    );
    wrench(H, R, x, y + 14, 0.45 + (n % 2) * 0.12, n % 3 ? 'blue' : 'coral');
  }
  for (let n = 0; n < 6; n++) {
    const j = 1.53 + n * 0.89;
    shape(H, R, H.faceJ(1.77, j, 0.64, 0.36, 0.91), 'paper', 1, 0.6);
    H.line(R, [H.p(1.78, j + 0.13, 0.79), H.p(1.78, j + 0.46, 0.79)], 'teal', 1.5);
  }
  for (let n = 0; n < 5; n++) {
    const z = 0.28 + n * 0.18;
    shape(H, R, H.faceJ(1.975, 7.86, 2.15, z, z + 0.14), 'coral', 0.5, 0.6);
    H.line(R, [H.p(1.99, 8.44, z + 0.09), H.p(1.99, 9.36, z + 0.09)], 'paper', 1.4);
  }
  for (const i of [0.58, 1.79]) for (const j of [7.79, 10.19]) caster(H, R, i, j);
  taskLight(H, R, 7.61, 0.83, 1.38, 'coral', 0.8);
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(8.41 + n * 0.85, 1.17, 1.39);
    oval(H, R, x, y, 9, 5, 'blue', 0.5);
    oval(H, R, x, y, 4, 2.4, 'paper', 1);
    for (let q = 0; q < 8; q++) {
      const a = (q * TAU) / 8;
      H.line(
        R,
        [
          [x + Math.cos(a) * 5, y + Math.sin(a) * 2.5],
          [x + Math.cos(a) * 10, y + Math.sin(a) * 5]
        ],
        'sun',
        0.8
      );
    }
  }
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(6.22 + n * 0.36, 10.21, 0.74);
    H.line(
      R,
      [
        [x - 7, y],
        [x + 7, y - 5]
      ],
      'blue',
      0.8
    );
    oval(H, R, x - 7, y, 3, 2, 'teal', 0.6);
  }
  const [x, y] = H.p(10.66, 5.46, 0.1);
  oval(H, R, x, y, 15, 6, 'blue', 0.65);
  shape(
    H,
    R,
    [
      [x - 15, y],
      [x + 15, y],
      [x + 15, y - 25],
      [x - 15, y - 25]
    ],
    'coral',
    0.55,
    0.8
  );
  oval(H, R, x, y - 25, 15, 6, 'paper', 1);
  H.line(
    R,
    [
      [x - 8, y - 18],
      [x + 8, y - 18]
    ],
    'teal',
    2
  );
  stroke(
    H,
    R,
    [
      [x - 12, y - 23],
      [x - 9, y - 41],
      [x + 9, y - 41],
      [x + 12, y - 23]
    ],
    'blue',
    1.1
  );
  coiledLine(H, R, 10.96, 6.48, 0.04, 17, 'blue');
  for (let n = 0; n < 6; n++) {
    const [px, py] = H.p(4.8 + n * 0.18, 9.15, 0.03);
    H.dot(px, py, 1, 'sun', 1);
    H.line(
      R,
      [
        [px - 2, py],
        [px + 2, py]
      ],
      'blue',
      0.5
    );
  }
}

const room = world('new-york-mott-haven-cycles', 'Mott Haven · Wheel True', { floor: 'blue', tone: .17, wall: 'paper', wallTone: .9, height: 3.7, head: 20 }, (H, R) => {
  for (const side of ['nw', 'ne']) {
    for (let z = .3; z < 3.65; z += .35) {
      H.line(R, [wallPt(H, side, .03, z, .025), wallPt(H, side, 11.95, z, .025)], 'coral', .5, { tone: .34 });
      for (let p = ((z * 10) % 2) * .5; p < 12; p += 1) H.line(R, [wallPt(H, side, p, z, .025), wallPt(H, side, p, Math.min(3.67, z + .35), .025)], 'coral', .45, { tone: .3 });
    }
  }
  shape(H, R, wallRect(H, 'ne', 6.5, 11.1, 1.83, 3.48, .07), 'blue', .7, 1);
  shape(H, R, wallRect(H, 'ne', 6.65, 10.95, 1.98, 3.34, .1), 'teal', .24, .65);
  for (const i of [7.7, 8.8, 9.9]) H.line(R, [wallPt(H, 'ne', i, 1.98, .13), wallPt(H, 'ne', i, 3.34, .13)], 'paper', 2.1);
  H.line(R, [wallPt(H, 'ne', 6.65, 2.63, .13), wallPt(H, 'ne', 10.95, 2.63, .13)], 'paper', 2.1);
  shape(H, R, wallRect(H, 'nw', 1.1, 6.98, 1.36, 3.2, .07), 'sun', .4, .85);
  for (let p = 1.3; p < 6.9; p += .32) for (let z = 1.56; z < 3.1; z += .3) H.dot(...wallPt(H, 'nw', p, z, .09), .55, 'blue', .65);
  for (let n = 0; n < 6; n++) wrench(H, R, ...wallPt(H, 'nw', 1.63 + n * .72, 2.21, .16), .6 + n * .05, n % 2 ? 'blue' : 'teal');
  const [tx, ty] = wallPt(H, 'nw', 6.17, 2.48, .17);
  stroke(H, R, [[tx - 11, ty - 9], [tx, ty + 8], [tx + 11, ty - 10]], 'coral', 2.4);
  H.line(R, [[tx - 8, ty + 15], [tx + 9, ty - 12]], 'blue', 2.4);
  table(H, R, .4, 1.27, 1.35, 5.88, 1.06, 'teal');
  for (let n = 0; n < 6; n++) {
    box(H, R, .56, 1.53 + n * .89, .99, .67, 1.2, .3, n % 2 ? 'paper' : 'coral', n % 2 ? 1 : .5);
    for (let k = 0; k < 4; k++) H.dot(...H.p(.76 + k % 2 * .39, 1.69 + n * .89 + Math.floor(k / 2) * .29, 1.52), 2.3, k % 2 ? 'blue' : 'sun', .9);
  }
  box(H, R, .45, 7.64, 1.51, 2.67, .17, 1.08, 'coral', .7);
  for (let n = 0; n < 4; n++) {
    H.line(R, [H.p(1.98, 7.78, .33 + n * .23), H.p(1.98, 10.15, .33 + n * .23)], 'blue', .7);
    H.line(R, [H.p(2, 8.43, .44 + n * .23), H.p(2, 9.46, .44 + n * .23)], 'paper', 2.3);
  }
  for (const i of [.67, 1.68]) for (const j of [7.89, 10.03]) oval(H, R, ...H.p(i, j, .13), 4, 5, 'blue', .9);
  const [lx, ly] = H.p(1.06, 8.87, 1.33);
  oval(H, R, lx, ly - 8, 11, 6, 'blue', .6);
  H.line(R, [[lx - 7, ly - 4], [lx + 7, ly - 14]], 'sun', 2);
  bike(H, R, 8.13, 2.67, .18, 1.07, 'coral');
  stroke(H, R, [H.p(8.65, 2.85, .03), H.p(8.65, 2.85, 1.3), H.p(8.02, 2.84, 1.3)], 'blue', 4);
  for (const [di, dj] of [[-.64, .44], [.64, .44], [0, -.65]]) H.line(R, [H.p(8.65, 2.85, .07), H.p(8.65 + di, 2.85 + dj, .07)], 'blue', 3);
  benchFrame(H,R,5.67,5,2.2,1.39,.75,'teal');
  const [wx, wy] = H.p(6.55, 5.58, 1.77);
  for (const dx of [-13, 13]) stroke(H, R, [[wx + dx * 1.55, wy + 38], [wx + dx, wy + 30], [wx + dx, wy + 2], [wx, wy]], 'teal', 3.2);
  H.line(R, [[wx - 21, wy + 38], [wx + 21, wy + 38]], 'blue', 4);
  H.line(R, [[wx - 13, wy + 27], [wx + 13, wy + 27]], 'coral', 1.6);
  shape(H, R, H.tile(7.11, 5.38, .52, .7, .78), 'sun', .6, .55);
  wrench(H, R, ...H.p(7.5, 5.81, .8), .56);
  for (const j of [8.3, 9.2, 10.1]) {
    const [x, y] = H.p(10.4, j, .55);
    H.outline(R, ell(x, y - 17, 15, 21), 'blue', 4, { tone: .76, amp: .14 });
    H.outline(R, ell(x, y - 17, 10.5, 16), 'teal', 1.1, { tone: .65 });
  }
  box(H, R, 9.76, 7.7, 1.29, 3.41, .03, .16, 'sun', .5);
  const [px, py] = H.p(8.95, 8.82, .05);
  oval(H, R, px, py, 11, 4, 'blue', .6);
  H.line(R, [[px, py], [px, py - 44]], 'teal', 5);
  H.line(R, [[px - 11, py - 45], [px + 11, py - 45]], 'blue', 3);
  stroke(H, R, [[px + 2, py - 6], [px + 19, py - 18], [px + 26, py + 1], [px + 15, py + 8]], 'blue', 1.2);
  box(H, R, 3.3, 9.34, 1.28, .93, .03, .61, 'sun', .48);
  shape(H, R, H.tile(3.42, 9.45, 1.04, .69, .66), 'blue', .5, .5);
  for (let n = 0; n < 5; n++) oval(H, R, ...H.p(3.63 + n * .15, 9.83, .7), 4, 4.9, 'paper', 1);
  const [hx, hy] = H.p(4.62, 1.02, 2.7);
  shape(H, R, [[hx - 15, hy], [hx - 12, hy - 13], [hx, hy - 19], [hx + 14, hy - 10], [hx + 16, hy]], 'coral', .7, .8);
  for (const dx of [-7, 0, 7]) H.line(R, [[hx + dx, hy - 4], [hx + dx - 1, hy - 12]], 'paper', 2);
  stroke(H, R, [[hx - 12, hy], [hx - 7, hy + 19], [hx + 10, hy]], 'blue', 1);
  shape(H, R, H.tile(5.15, 9.8, .67, .83, .03), 'paper', 1, .5);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(5.24, 10 + n * .16, .05), H.p(5.7, 10 + n * .16, .05)], 'teal', .6);
  mottHavenCyclesDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), spin = Math.min(1, Math.max(0, (u - .1) / .34));
  const angle = TAU * 5 * (1 - (1 - spin) ** 3);
  wheel(H, R, ...H.p(6.55, 5.58, 1.77), 31, angle);
  actor(H, R, 5.65, 6.51, u * 16, 'newYorkWheelTrue', { shirt: ['sun', .64], apron: ['teal', .68], face: 'se', hairStyle: 'curly', prop(h, r, points) {
    const [x, y] = points.farHand;
    oval(h, r, x + 3, y - 3, 3, 3, 'blue', .7);
    h.line(r, [[x + 3, y - 1], [x + 8, y + 6]], 'blue', 2);
  } }, .02, 1.4);
  actor(H, R, 3.27, 3.6, 0, 'hold', { shirt: ['coral', .6], face: 'sw', hairStyle: 'short', prop(h, r, points) {
    const [x, y] = points.nearHand;
    wrench(h, r, x, y, .5);
  } }, .02, 1.2);
});
room.loopSeconds = 16;
export default room;
