import { benchFrame, drape } from '../materials.js';
import { cornice, panelFront, wallRack, taskLight } from '../joinery.js';
import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallPt, wallRect, TAU, glow } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, al: 38, ar: 48, el: 45, er: 52, head: 4, ll: -11, lr: 12 };
FIGURES.clips.hongKongOperaSleeves = { dur: 14, keys: [[0, ready], [.12, ready], [.27, { ...ready, al: -91, el: -12, ar: 102, er: 13, lean: -7, head: -10 }], [.39, { ...ready, al: -116, el: 5, ar: 142, er: -16, lean: -9, head: -16 }], [.53, { ...ready, al: -68, el: -30, ar: 108, er: 14, lean: 4 }], [.7, { ...ready, al: 24, el: 73, ar: 76, er: 64, head: 9 }], [.83, ready], [1, ready]] };
FIGURES.clips.hongKongOperaCoach = { dur: 14, keys: [[0, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42 }], [.56, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42, head: -6 }], [.69, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 92, el: 44, er: 24, head: -9 }], [.83, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42 }], [1, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42 }]] };

function curtain(H, R, side, from, to, bottom, top, ink) {
  const p = wallRect(H, side, from, to, bottom, top, .11);
  shape(H, R, p, ink, .73);
  for (let q = from + .08; q < to; q += .24) {
    stroke(H, R, [wallPt(H, side, q, top, .13), wallPt(H, side, q + .04, (top + bottom) / 2, .15), wallPt(H, side, q - .03, bottom, .13)], 'blue', .85, .46);
    stroke(H, R, [wallPt(H, side, q + .07, top, .15), wallPt(H, side, q + .13, bottom, .15)], 'sun', .7, .35);
  }
}

function trunk(H, R, i, j, ink, width = 1.7) {
  box(H, R, i, j, width, 1.08, .04, .72, ink, .6);
  box(H, R, i, j, width, 1.08, .77, .15, ink, .72);
  for (const a of [.17, width - .27]) {
    shape(H, R, H.faceI(i + a, j + 1.09, .11, .13, .85), 'sun', .75, .5);
    H.line(R, [H.p(i + a + .05, j, .94), H.p(i + a + .05, j + 1.08, .94)], 'sun', 2);
  }
  const [x, y] = H.p(i + width / 2, j + 1.11, .52);
  stroke(H, R, [[x - 6, y - 1], [x - 6, y + 4], [x + 6, y + 4], [x + 6, y - 1]], 'blue', 1.5);
}

function costume(H, R, j, ink, skirt = false) {
  const [x, y] = H.p(0.67, j, 2.58);
  H.line(
    R,
    [
      [x, y - 8],
      [x, y - 1],
      [x - 13, y + 8],
      [x + 13, y + 8],
      [x, y - 1]
    ],
    'blue',
    1
  );
  shape(
    H,
    R,
    [
      [x - 7, y + 4],
      [x + 7, y + 4],
      [x + 20, y + 14],
      [x + 16, y + 26],
      [x + 9, y + 20],
      [x + (skirt ? 16 : 10), y + 58],
      [x - (skirt ? 16 : 10), y + 58],
      [x - 9, y + 20],
      [x - 17, y + 27],
      [x - 21, y + 15]
    ],
    ink,
    0.65,
    0.8
  );
  for (let q = 0; q < 5; q++)
    H.line(
      R,
      [
        [x - 7 + q * 3.4, y + 21],
        [x - 10 + q * 5, y + 56]
      ],
      'blue',
      0.6,
      { tone: 0.4 }
    );
  H.line(
    R,
    [
      [x - 5, y + 5],
      [x, y + 15],
      [x + 6, y + 5]
    ],
    'paper',
    1.7
  );
  for (const dy of [25, 39, 49]) oval(H, R, x + 1, y + dy, 2.4, 1.7, 'sun', 0.7);
  for (let n = 0; n < 4; n++) {
    const yy = y + 22 + n * 8;
    for (const side of [-1, 1]) {
      const xx = x + side * (5 + n * 0.8);
      H.line(
        R,
        [
          [xx - side * 3, yy + 3],
          [xx + side * 3, yy - 2],
          [xx + side * 5, yy + 2]
        ],
        'sun',
        1.1
      );
      H.dot(xx, yy, 1.1, 'paper', 1, { knock: true });
    }
  }
  H.line(
    R,
    [
      [x - 14, y + 53],
      [x - 5, y + 55],
      [x + 5, y + 55],
      [x + 14, y + 53]
    ],
    'sun',
    1.6
  );
  for (let n = 0; n < 9; n++)
    H.line(
      R,
      [
        [x - 13 + n * 3, y + 55],
        [x - 14 + n * 3.3, y + 61 + (n % 2) * 3]
      ],
      'paper',
      0.7
    );
}

function yauMaTeiOperaDetails(H, R) {
  drawerUnit(H, R, 7.22, 9.87, 3.75, 1.33, 1.0, 3, 'teal');
  shallowTray(H, R, 7.39, 10.04, 1.38, 0.95, 1.17, 'sun');
  for (let n = 0; n < 4; n++) coiledLine(H, R, 7.66 + (n % 2) * 0.64, 10.27 + Math.floor(n / 2) * 0.42, 1.38, 6, ['coral', 'teal', 'blue', 'sun'][n]);
  handTool(H, R, 8.35, 10.65, 1.4, 'scissors', 'coral');
  foldedCloth(H, R, 9.02, 10.03, 1.65, 0.96, 1.17, 'paper', 'teal');
  shelfUnit(H, R, 3.5, 0.2, 2.44, 0.72, 3.25, [0], 'sun');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 3.9 + n * 0.72, 0.5, 3.4, 7, 13, ['teal', 'coral', 'sun'][n]);
  framedPanel(H, R, 10.45, 0.12, 1.17, 1.43, 1.32, 'coral');
  boundBook(H, R, 9.96, 8.13, 0.74, 0.55, 1.04, 'teal');
  satchel(H, R, 9.01, 8.43, 0.03, 'blue', 0.8);
  table(H, R, 0.55, 10.8, 1.84, 0.65, 0.43, 'sun');
  for (let n = 0; n < 2; n++) foldedCloth(H, R, 0.72, 10.92, 1.35, 0.38, 0.57 + n * 0.12, 'paper', n ? 'coral' : 'teal');
  servicePipe(
    H,
    R,
    [
      [0.15, 6.54, 0.3],
      [0.15, 6.54, 3.62],
      [0.15, 0.16, 3.62],
      [5.92, 0.16, 3.62]
    ],
    'teal',
    2
  );
  const [x, y] = H.p(5.92, 0.16, 3.23);
  oval(H, R, x, y, 8, 10, 'blue', 0.6);
  oval(H, R, x, y, 5, 7, 'paper', 1);
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.1, 11.9, 3.62, 'sun');
  cornice(H, R, 'ne', 0.1, 11.9, 3.62, 'sun');
  panelFront(H, R, 1.25, 1.53, 3.64, 0.23, 0.65, 4, 'teal');
  for (const i of [1.51, 4.52])
    for (let n = 0; n < 6; n++) {
      const [x, y] = H.p(i, 0.18, 1.4 + n * 0.32);
      oval(H, R, x, y, 3.4, 3.8, 'sun', 0.92);
      H.glow(x, y, 9, 9, 'sun', 0.12);
    }
  for (let n = 0; n < 6; n++) {
    const [x, y] = H.p(1.75 + n * 0.43, 0.96, 1.13);
    oval(H, R, x, y, 5, 2.3, n % 2 ? 'coral' : 'teal', 0.6);
    oval(H, R, x, y - 5, 5, 2.3, 'paper', 1);
    H.dot(x, y - 5, 1.2, ['teal', 'sun', 'coral'][n % 3]);
  }
  const [x, y] = H.p(4.46, 1.12, 1.13);
  shape(
    H,
    R,
    [
      [x - 7, y],
      [x + 7, y],
      [x + 6, y - 12],
      [x - 6, y - 12]
    ],
    'teal',
    0.65,
    0.6
  );
  for (let n = 0; n < 5; n++) {
    H.line(
      R,
      [
        [x - 4 + n * 2, y - 8],
        [x - 8 + n * 4, y - 27 - (n % 2) * 5]
      ],
      'sun',
      1
    );
    oval(H, R, x - 8 + n * 4, y - 29 - (n % 2) * 5, 2, 3, 'paper', 1);
  }
  wallRack(H, R, 'nw', 7.3, 3.56, 1.43, 1.89, 2, 'coral', (P, z, row) => {
    for (let n = 0; n < 4; n++) {
      const [px, py] = P(0.53 + n * 0.82, z + 0.13);
      shape(
        H,
        R,
        [
          [px - 9, py],
          [px + 9, py],
          [px + 7, py - 20],
          [px - 7, py - 20]
        ],
        'paper',
        1,
        0.6
      );
      oval(H, R, px, py - 20, 8, 3, 'sun', 0.5);
      for (let q = 0; q < 3; q++)
        H.line(
          R,
          [
            [px - 5 + q * 5, py - 21],
            [px - 9 + q * 8, py - 33]
          ],
          row ? 'teal' : 'coral',
          1
        );
    }
  });
  for (const j of [1.7, 2.8, 3.9, 5.0]) {
    const [px, py] = H.p(0.95, j, 1.14);
    for (let n = 0; n < 6; n++) {
      H.dot(px + (n - 2.5) * 3, py + 12 + (n % 2) * 3, 1.2, 'sun', 1, { knock: true });
    }
    H.line(
      R,
      [
        [px - 9, py - 4],
        [px + 10, py + 2]
      ],
      'paper',
      0.8
    );
  }
  for (const [i, j] of [
    [1.2, 7.35],
    [3.4, 8.23]
  ]) {
    for (const x0 of [i + 0.12, i + 1.55]) {
      H.line(R, [H.p(x0, j + 0.02, 0.1), H.p(x0, j + 1.09, 0.1), H.p(x0, j + 1.09, 0.9)], 'sun', 2.1);
      for (const z of [0.2, 0.72]) H.dot(...H.p(x0, j + 1.1, z), 1.2, 'blue');
    }
    shape(H, R, H.faceI(i + 0.72, j + 1.11, 0.24, 0.35, 0.59), 'paper', 1, 0.6);
    H.line(R, [H.p(i + 0.79, j + 1.12, 0.45), H.p(i + 0.9, j + 1.12, 0.45)], 'blue', 1.4);
  }
  taskLight(H, R, 10.15, 8.35, 0.94, 'sun', 0.4);
  const [px, py] = H.p(8.6, 10.48, 1.2);
  oval(H, R, px, py, 8, 7, 'coral', 0.55);
  for (let n = 0; n < 7; n++) {
    const a = (n * TAU) / 7;
    H.line(
      R,
      [
        [px + Math.cos(a) * 4, py + Math.sin(a) * 3],
        [px + Math.cos(a) * 12, py + Math.sin(a) * 10]
      ],
      'paper',
      0.7
    );
  }
  for (let n = 0; n < 5; n++) H.line(R, [H.p(7.45 + n * 0.35, 10.9, 1.2), H.p(7.55 + n * 0.35, 11.18, 1.2)], 'sun', 1);
}

const room = world('hong-kong-yau-ma-tei-opera', 'Yau Ma Tei · Before the entrance', { floor: 'sun', tone: .2, pattern: 'boards', wall: 'paper', wallTone: .94, height: 3.85, head: 20 }, (H, R) => {
  shape(H, R, wallRect(H, 'ne', .35, 11.7, .15, .65, .025), 'teal', .42);
  shape(H, R, wallRect(H, 'ne', 6.7, 10.1, .66, 3.55, .035), 'blue', .84);
  shape(H, R, wallRect(H, 'ne', 7.13, 9.65, .67, 3.25, .045), 'sun', .18);
  curtain(H, R, 'ne', 6.55, 7.28, .64, 3.67, 'coral');
  curtain(H, R, 'ne', 9.42, 10.3, .64, 3.67, 'coral');
  curtain(H, R, 'ne', 6.55, 10.3, 3.15, 3.67, 'coral');
  box(H, R, 6.45, .13, 4.1, 2.17, .04, .22, 'teal', .5);
  box(H, R, 7.3, 2.3, 2.6, .44, .02, .12, 'teal', .6);
  for (let q = 0; q < 10; q++) H.line(R, [H.p(6.59 + q * .39, .2, .28), H.p(6.59 + q * .39, 2.25, .28)], 'paper', .7, { tone: .7 });
  box(H, R, .16, 1.1, .18, 5.1, .1, 2.58, 'blue', .53);
  H.line(R, [H.p(.68, 1.24, 2.75), H.p(.68, 6.12, 2.75)], 'sun', 3);
  for (const j of [1.22, 6.08]) H.line(R, [H.p(.7, j, .04), H.p(.7, j, 2.77)], 'blue', 2.2);
  costume(H, R, 1.95, 'teal', true);
  costume(H, R, 3.2, 'coral');
  costume(H, R, 4.56, 'paper', true);
  for (let q = 0; q < 4; q++) box(H, R, .25, 1.4 + q * 1.12, .78, .94, .06, .2, q % 2 ? 'sun' : 'paper', .7);
  benchFrame(H,R,1.2,.42,3.76,1.09,1.08,'teal');
  drape(H,R,1.26,.55,.54,.99,1.1,.48,'coral');
  shape(H, R, wallRect(H, 'ne', 1.55, 4.55, 1.29, 3.33, .08), 'sun', .55);
  shape(H, R, wallRect(H, 'ne', 1.7, 4.4, 1.45, 3.19, .1), 'paper', .95);
  shape(H, R, wallRect(H, 'ne', 1.89, 4.2, 1.63, 2.99, .13), 'teal', .15);
  for (const i of [1.52, 4.58]) for (let q = 0; q < 5; q++) H.dot(...H.p(i, .16, 1.52 + q * .36), 3, 'sun', .85, { knock: true });
  for (let q = 0; q < 5; q++) {
    const [x, y] = H.p(1.5 + q * .41, 1.04, 1.09);
    oval(H, R, x, y - 3, 5, 3, q % 2 ? 'coral' : 'paper', .85);
    oval(H, R, x, y - 6, 4, 2, q % 2 ? 'sun' : 'teal', .65);
  }
  const [bx, by] = H.p(4.32, .91, 1.12);
  shape(H, R, [[bx - 6, by], [bx + 6, by], [bx + 7, by - 13], [bx - 7, by - 13]], 'coral', .55);
  for (let q = 0; q < 5; q++) H.line(R, [[bx - 4 + q * 2, by - 7], [bx - 8 + q * 4, by - 29 + q % 2 * 3]], 'blue', 1.1);
  box(H, R, 2.97, 1.18, .82, .35, 1.09, .13, 'sun', .5);
  shape(H, R, H.tile(3.06, 1.24, .59, .24, 1.23), 'paper', 1);
  table(H, R, 1.96, 2.01, .95, .87, .52, 'coral');
  trunk(H, R, .54, 7.55, 'coral', 1.85);
  trunk(H, R, .83, 9.02, 'teal', 1.82);
  box(H, R, 1.09, 9.17, 1.06, .71, .94, .21, 'paper', .9);
  H.line(R, [H.p(1.61, 9.2, 1.17), H.p(1.61, 9.87, 1.17)], 'coral', 1.6);
  for (const i of [3.1, 3.48]) {
    const [x, y] = H.p(i, 10.61, .03);
    oval(H, R, x, y - 1, 7, 3.5, 'blue', .74);
    oval(H, R, x - 2, y - 2, 3.5, 2, 'paper', .9);
  }
  for (const [i, j] of [[4.6, 4.7], [8.5, 4.7], [4.6, 8.6], [8.5, 8.6]]) {
    H.line(R, [H.p(i, j, .025), H.p(i + .43, j, .025)], 'teal', 1.3, { tone: .5 });
    H.line(R, [H.p(i, j, .025), H.p(i, j + .4, .025)], 'teal', 1.3, { tone: .5 });
  }
  table(H, R, 9.74, 6.33, .84, .85, .53, 'sun');
  table(H, R, 9.88, 8.06, 1.32, 1.1, .78, 'teal');
  box(H, R, 10.06, 8.21, .54, .62, .92, .07, 'paper', 1);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(10.1, 8.27 + q * .12, 1), H.p(10.53, 8.27 + q * .12, 1)], 'blue', .6);
  const [tx, ty] = H.p(10.82, 8.53, .92);
  oval(H, R, tx, ty - 6, 5.5, 7, 'sun', .65);
  oval(H, R, tx, ty - 12, 5.5, 2, 'paper', 1);
  stroke(H, R, [[tx + 5, ty - 9], [tx + 10, ty - 8], [tx + 10, ty - 3], [tx + 5, ty - 2]], 'blue', 1);
  for (const j of [1.4, 2.8, 4.2]) {
    box(H, R, 10.97, j, .58, .63, .03, 1.06, 'blue', .58);
    shape(H, R, H.faceI(11.01, j + .65, .49, .17, .9), 'teal', .35);
    for (let q = 0; q < 5; q++) H.line(R, [H.p(11.08, j + .66, .24 + q * .12), H.p(11.44, j + .66, .24 + q * .12)], 'paper', .7);
  }
  const [gx, gy] = H.p(3.05, 3.26, .45);
  H.line(R, [[gx - 18, gy + 14], [gx - 18, gy - 30], [gx + 18, gy - 30], [gx + 18, gy + 14]], 'blue', 2);
  oval(H, R, gx, gy - 11, 15, 18, 'sun', .66);
  oval(H, R, gx, gy - 11, 6, 7, 'coral', .35);
  H.line(R, [[gx - 9, gy - 26], [gx - 8, gy - 31]], 'blue', .8);
  H.line(R, [[gx + 9, gy - 26], [gx + 8, gy - 31]], 'blue', .8);
  H.line(R, [H.p(2.5, 3.49, .025), H.p(3.25, 3.8, .025)], 'blue', 1.8);
  oval(H, R, ...H.p(2.48, 3.48, .04), 3, 4, 'paper', 1);
  yauMaTeiOperaDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 14), sweep = Math.sin(TAU * u), lift = Math.sin(Math.PI * Math.min(1, Math.max(0, (u - .12) / .61)));
  H.at(6.3, 6.53, 0, HH => actor(HH, R, 6.3, 6.53, t, 'hongKongOperaSleeves', { shirt: ['teal', .62], pants: ['blue', .62], hairStyle: 'bun', face: 'se', prop(h, r, p) {
    for (const [hand, sign] of [[p.farHand, -1], [p.nearHand, 1]]) {
      const [x, y] = hand, reach = sign * (11 + lift * 20), drop = 28 - lift * 9;
      shape(h, r, [[x - 3, y - 4], [x + 4, y - 3], [x + reach + sweep * 4, y + drop - 8], [x + reach + sign * 12, y + drop + 3], [x + reach - sign * 4, y + drop + 7], [x - 5, y + 3]], 'paper', 1, .75);
      stroke(h, r, [[x, y + 1], [x + reach * .65, y + drop * .55], [x + reach + sign * 6, y + drop + 2]], 'teal', .75, .42);
    }
  } }, 0, 1.5));
  H.at(10.12, 6.78, 0, HH => actor(HH, R, 10.12, 6.78, t, 'hongKongOperaCoach', { shirt: ['coral', .62], hairStyle: 'short', glasses: true, face: 'sw' }, .02, 1.28, 'elder'));
  const [x, y] = H.p(4.9, 10.95, .02);
  shape(H, R, [[x - 16, y], [x + 16, y], [x + 7, y - 8], [x - 9, y - 7]], 'paper', 1, .6);
  for (let q = 0; q < 6; q++) H.line(R, [[x - 12 + q * 5, y - 1], [x - 7 + q * 3, y - 6]], 'teal', .7, { tone: .55 });
});
room.loopSeconds = 14;
export default room;
