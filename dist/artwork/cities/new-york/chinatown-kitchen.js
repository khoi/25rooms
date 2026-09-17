import { shelfUnit, shallowTray, foldedCloth, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, bottle, steam, cycle, ell, wallPt, wallRect } from '../../worlds/common.js';
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
  shape(H, R, [[x - 16 * size, y - 10 * size], [x - 16 * size, y + 3 * size], [x + 16 * size, y + 3 * size], [x + 16 * size, y - 10 * size]], 'sun', .45, .6);
  oval(H, R, x, y + 3 * size, 16 * size, 6 * size, 'sun', .5);
  oval(H, R, x, y - 10 * size, 16 * size, 6 * size, 'paper', 1);
  for (let n = -2; n <= 2; n++) H.line(R, [[x - 12 * size, y - 10 * size + n * 1.6], [x + 12 * size, y - 10 * size + n * 1.6]], 'teal', .7, { tone: .5 });
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

const room = world('new-york-chinatown-kitchen', 'Chinatown · Fold and Gather', { floor: 'paper', tone: .65, wall: 'teal', wallTone: .18, pattern: 'tiles', height: 3.65, head: 20 }, (H, R) => {
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
  table(H, R, 3.25, 3.06, 5.3, 1.24, 1.09, 'paper');
  table(H, R, 3.25, 4.3, 1.23, 4.1, 1.09, 'paper');
  table(H, R, 7.32, 4.3, 1.23, 4.1, 1.09, 'paper');
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
  box(H, R, 8.83, .12, 2.87, 1.95, 2.77, .59, 'paper', .84);
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
