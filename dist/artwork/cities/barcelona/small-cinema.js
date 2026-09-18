import { world, shape, oval, stroke, wallPt, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, cushion, drape, floorLight, slattedSeat } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { cornice, recessedFrame, floorShadow, wallCourse, hangingRail, caster } from '../joinery.js';

const rest = { x: 0, y: 0, drop: 0, lean: -3, head: 4, al: 5, ar: 38, el: 3, er: 26, ll: -4, lr: 5, kl: 0, kr: 0, roll: 0 };
FIGURES.clips.barcelonaCinemaFocus = { dur: 18, keys: [[0, rest], [.2, { ...rest, ar: 28, er: 100, head: 10 }], [.4, { ...rest, ar: 31, er: 100, head: 9 }], [.6, { ...rest, ar: 31, er: 100, head: -13 }], [.79, { ...rest, ar: 28, er: 100 }], [.889, rest], [1, rest]] };
const seat = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 22, ar: 26, el: 34, er: 35, lean: 0, head: -7 };
FIGURES.clips.barcelonaCinemaViewer = { dur: 18, keys: [[0, seat], [.3, seat], [.48, { ...seat, lean: -5, head: -13, y: -.7 }], [.66, { ...seat, lean: -5, head: -13, y: -.7 }], [.9, seat], [1, seat]] };

function projector(H, R, x, y, turn) {
  shape(H, R, [[x - 37, y - 15], [x + 18, y - 36], [x + 48, y - 21], [x - 8, y + 1]], 'paper', 1, 1);
  shape(H, R, [[x - 37, y - 15], [x - 8, y + 1], [x - 8, y + 22], [x - 37, y + 6]], 'teal', .75, 1);
  shape(H, R, [[x - 8, y + 1], [x + 48, y - 21], [x + 48, y], [x - 8, y + 22]], 'teal', .5, 1);
  shape(H, R, [[x - 30, y - 15], [x + 16, y - 32], [x + 38, y - 22], [x - 8, y - 5]], 'teal', .16, .65);
  for (let n = 0; n < 8; n++) H.line(R, [[x - 18 + n * 4, y - 15 - n * 1.4], [x - 10 + n * 4, y - 11 - n * 1.4]], 'blue', .75);
  for (const q of [[-28, -15], [16, -31], [38, -21], [-8, -5]]) {
    H.dot(x + q[0], y + q[1], 1.5, 'sun');
    H.line(R, [[x + q[0] - .8, y + q[1]], [x + q[0] + .8, y + q[1]]], 'blue', .55);
  }
  shape(H, R, [[x + 28, y + 5], [x + 43, y - 1], [x + 43, y - 11], [x + 28, y - 5]], 'blue', .72, .5);
  H.line(R, [[x + 31, y], [x + 39, y - 3]], 'paper', 1.3);
  for (let n = 0; n < 11; n++) stroke(H, R, [[x + n * 4.2, y + 5 - n * 1.65], [x + n * 4.2, y + 13 - n * 1.65]], 'blue', 1);
  for (const p of [[x - 27, y + 11], [x - 2, y + 24], [x + 40, y + 5]]) oval(H, R, p[0], p[1], 5, 3, 'blue', .8);
  shape(H, R, [[x - 38, y - 10], [x - 60, y - 20], [x - 60, y - 1], [x - 37, y + 10]], 'blue', .76, .8);
  oval(H, R, x - 59, y - 10, 8, 12, 'paper', 1);
  oval(H, R, x - 59, y - 10, 5.7, 9.1, 'blue', .95);
  oval(H, R, x - 59, y - 10, 3.7, 6.5, 'teal', .6);
  H.line(R, [[x - 61, y - 15], [x - 60, y - 6]], 'paper', 1.4);
  for (let n = 0; n < 6; n++) H.line(R, [[x - 39 - n * 2.6, y - 11 - n * 1.2], [x - 39 - n * 2.6, y + 7 - n * 1.2]], 'paper', .75);
  const a = -.5 + turn * .4;
  H.line(R, [[x - 47, y - 5], [x - 47 + Math.cos(a) * 9, y - 5 + Math.sin(a) * 9]], 'sun', 2);
  H.dot(x - 36, y + 9, 2, 'coral', .8, { knock: true });
  for (let n = 0; n < 3; n++) oval(H, R, x + 12 + n * 6, y - 21 - n * 2.2, 2.6, 1.6, n ? 'blue' : 'coral', .75);
  stroke(H, R, [[x + 48, y - 2], [x + 63, y + 9], [x + 58, y + 29], [x + 38, y + 36], [x + 40, y + 52]], 'blue', 2);
  stroke(H, R, [[x - 48, y + 9], [x - 47, y + 28], [x - 28, y + 32], [x - 26, y + 17]], 'coral', 1);
  oval(H, R, x - 26, y + 16, 6, 8, 'blue', .85);
  H.line(R, [[x - 50, y + 17], [x - 45, y + 19]], 'paper', .9);
}

const room = world('barcelona-small-cinema', 'The screen holds still', { floor: 'blue', tone: .5, pattern: 'boards', wall: 'blue', wallTone: .84, height: 4, head: 45 }, (H, R) => {
  wallCourse(H, R, 'ne', .1, 11.9, .87, 'teal');
  cornice(H, R, 'ne', .1, 11.9, 3.8, 'paper');
  cornice(H, R, 'nw', .1, 11.9, 3.8, 'teal');
  for (const x of [3.29, 5.93, 8.6]) {
    const Q = (u, z) => wallPt(H, 'ne', x + u, z, -.18);
    surface(H, R, [Q(0, 2.86), Q(2.2, 2.86), Q(2.2, 3.61), Q(0, 3.61)], 'teal', .42, 1);
    for (let n = 0; n < 10; n++) H.line(R, [Q(.1 + n * .21, 2.91), Q(.1 + n * .21, 3.54)], n % 2 ? 'paper' : 'blue', n % 2 ? .7 : 2, {tone: .55});
    for (const u of [.08, 2.12]) H.dot(...Q(u, 3.22), 1.4, 'sun');
  }
  const P = recessedFrame(H, R, 'nw', 1.5, 8.4, .92, 2.63, 'teal', Q => {
    surface(H, R, [Q(.22, .2), Q(8.18, .2), Q(8.18, 2.4), Q(.22, 2.4)], 'blue', .95);
    surface(H, R, [Q(.48, .31), Q(7.86, .31), Q(7.86, 2.18), Q(.48, 2.18)], 'paper', .92);
    H.line(R, [Q(.52, .39), Q(7.82, .39)], 'blue', 1.3);
    H.line(R, [Q(.53, 2.12), Q(7.82, 2.12)], 'sun', 1);
  });
  H.line(R, [P(.25, 2.39, .35), P(8.07, 2.39, .35)], 'paper', 5.4);
  H.line(R, [P(.25, 2.43, .35), P(8.07, 2.43, .35)], 'blue', 1);
  for (const u of [.25, 8.06]) {
    H.line(R, [P(u, 2.42), P(u, 2.63), P(u, 2.71, .06)], 'blue', 3);
    H.dot(...P(u, 2.7, .08), 2, 'sun');
  }
  for (const start of [1.48, 9.65]) {
    const Q = (u, z) => wallPt(H, 'nw', start + u, z, -.35);
    surface(H, R, [Q(0, .3), Q(.53, .35), Q(.62, 3.48), Q(0, 3.48)], 'coral', .58);
    for (let n = 0; n < 4; n++) H.line(R, [Q(.07 + n * .12, 3.36), Q(.04 + n * .15, .43)], n % 2 ? 'blue' : 'paper', .9, { tone: .6 });
  }
  for (const [start, width] of [[.43, 1.28], [9.63, 1.64]]) {
    const Q = (u, z) => wallPt(H, 'nw', start + u, z, -.58);
    surface(H, R, [Q(0, .13), Q(width, .21), Q(width - .16, 3.56), Q(.12, 3.56)], 'coral', .6, 1.1);
    for (let n = 0; n < 7; n++) {
      const u = .13 + n * (width - .22) / 7;
      H.line(R, [Q(u, 3.47), Q(u + .06, 1.8), Q(u - .07, .35)], n % 2 ? 'blue' : 'sun', n % 2 ? 2 : 1, {tone:.65});
    }
    H.line(R, [Q(.03, .28), Q(width - .02, .36)], 'paper', 1.1);
    H.line(R, [Q(.16, 1.3), Q(width - .13, 1.36)], 'sun', 2.5);
  }
  for (const j of [1.93, 9.05]) {
    metal(H, R, .51, j, .59, .81, .08, .79, 'blue');
    const p = H.p(.91, j + .61, .49);
    oval(H, R, ...p, 7, 10, 'teal', .55);
    oval(H, R, ...p, 3, 4, 'blue', .85);
    H.dot(p[0], p[1] - 16, 2, 'sun');
  }
  hangingRail(H, R, 'nw', 1.5, 8.6, 3.65, 9, () => {});
  const screen = [P(2.2, .72), P(5.6, .72), P(5.6, 1.84), P(2.2, 1.84)];
  H.tint(screen, 'sun', .13);
  shape(H, R, [P(2.8, .86), P(4.38, .86), P(4.38, 1.65), P(2.8, 1.65)], 'teal', .7);
  shape(H, R, [P(3.5, 1.18), P(5.06, 1.02), P(4.53, 1.9)], 'coral', .62);
  for (let n = 0; n < 5; n++) H.line(R, [P(5.32 + n * .11, .9), P(5.32 + n * .11, 1.58)], 'blue', .8);
  cabinetFrame(H, R, 3.15, .25, 7.75, 1.15, .08, 2.64, 3, 'sun', (x, j, w, d, z, h, n) => {
    timber(H, R, x, j, w, d, 1.24, .12, 'sun');
    if (n === 0) {
      for (let k = 0; k < 14; k++) {
        const ink = ['paper', 'coral', 'teal', 'sun'][k % 4];
        timber(H, R, x + .08 + k * .15, j + .08, .105, .64, 1.38, .78 + k % 4 * .025, ink);
      }
      surface(H, R, H.faceI(x + .15, j + .99, 1.83, .29, .96), 'blue', .84);
      for (let k = 0; k < 7; k++) H.line(R, [H.p(x + .25 + k * .25, j + 1, .38), H.p(x + .25 + k * .25, j + 1, .87)], 'teal', .7);
    } else if (n === 1) {
      const p = H.p(x + 1.08, j + .7, 1.41);
      shape(H, R, [[p[0] - 17, p[1] - 27], [p[0] + 16, p[1] - 27], [p[0] + 16, p[1]], [p[0] - 17, p[1]]], 'blue', .7);
      oval(H, R, p[0], p[1] - 13, 10, 10, 'teal', .5);
      oval(H, R, p[0], p[1] - 13, 4.5, 4.5, 'blue', .7);
      for (let k = 0; k < 3; k++) cushion(H, R, x + .16, j + .13, 1.72, .73, .25 + k * .2, .16, k === 1 ? 'coral' : 'teal');
    } else {
      metal(H, R, x + .14, j + .18, 1.91, .64, .28, .69, 'teal');
      bentTube(H, R, [[x + .65, j + .52, 1], [x + .65, j + .52, 1.2], [x + 1.2, j + .52, 1.2], [x + 1.2, j + .52, 1]], 2, 'paper');
      for (let k = 0; k < 4; k++) metal(H, R, x + .17 + k * .46, j + .2, .38, .7, 1.37, .31, k % 2 ? 'paper' : 'coral');
      const paper = H.p(x + 1.34, j + .37, 2.12);
      surface(H, R, [[paper[0] - 13, paper[1]], [paper[0] + 13, paper[1]], [paper[0] + 13, paper[1] - 17], [paper[0] - 13, paper[1] - 17]], 'paper', 1);
      H.line(R, [[paper[0], paper[1]], [paper[0], paper[1] + 6]], 'sun', 2);
      for (let k = 0; k < 4; k++) H.dot(paper[0] - 9 + k * 6, paper[1] + 2, 2, 'coral', .8);
    }
  });
  recessedFrame(H, R, 'ne', 10.92, .7, 2.98, .53, 'paper', P => {
    for (let k = 0; k < 4; k++) H.line(R, [P(.13, .12 + k * .08), P(.58, .12 + k * .08)], 'blue', 1);
  });
  bentTube(H, R, [[11.45, .25, 3.8], [11.45, .25, 2.83], [11.1, .25, 2.83]], 2, 'paper');
  for (const x of [3.28, 5.74, 8.2, 10.68]) metal(H, R, x, 1.41, .13, .14, .23, 2.1, 'teal');
  const card = H.p(4.29, .79, 2.82);
  shape(H, R, [[card[0] - 22, card[1]], [card[0] + 17, card[1] - 12], [card[0] + 17, card[1] - 31], [card[0] - 22, card[1] - 19]], 'paper', .94, .75);
  shape(H, R, [[card[0] - 13, card[1] - 8], [card[0] + 8, card[1] - 15], [card[0] - 4, card[1] - 24]], 'coral', .65, .5);
  metal(H, R, 6.71, .72, 1.84, .69, 2.74, .23, 'blue');
  for (let n = 0; n < 5; n++) H.line(R, [H.p(6.9 + n * .23, 1.42, 2.79), H.p(6.9 + n * .23, 1.42, 2.91)], 'paper', .8);
  bentTube(H, R, [[7.72, .39, 2.83], [7.72, .18, 3.72], [11.44, .18, 3.72]], 1.5, 'teal');
  floorLight(H, 4.9, 6.6, 144, .26);
  floorShadow(H, 6.03, 4.27, 4.05, 2.38, .28);
  for (const x of [6.13, 9.58]) for (const j of [4.37, 6.23]) {
    timber(H, R, x, j, .2, .22, .17, .84, 'sun');
    caster(H, R, x + .1, j + .08, .1);
  }
  for (const x of [6.18, 9.59]) {
    bentTube(H, R, [[x, 4.43, .24], [x, 6.31, .96], [x, 4.43, .96], [x, 6.31, .24]], 1.7, 'teal');
    timber(H, R, x - .08, 4.4, .15, 1.93, 1, .17, 'sun');
  }
  timber(H, R, 6.07, 4.28, 3.86, 2.29, 1.05, .12, 'sun');
  timber(H, R, 6.32, 6.44, 3.33, .11, .8, .23, 'sun');
  surface(H, R, H.faceI(6.51, 6.57, 1.21, .83, .98), 'teal', .4, .65);
  H.line(R, [H.p(6.85, 6.59, .91), H.p(7.35, 6.59, .91)], 'paper', 2);
  metal(H, R, 9.6, 4.48, .2, 1.46, .56, .2, 'blue');
  for (let n = 0; n < 4; n++) oval(H, R, ...H.p(9.83, 4.67 + n * .32, .66), 1.8, 2.1, 'paper', .7);
  bentTube(H, R, [[9.84, 5.92, .63], [10.14, 6.1, .05], [10.14, 3.02, .05], [10.97, 2.69, .05], [10.97, 1.2, .13]], 1.4, 'blue');
  for (const j of [3.26, 4.05]) metal(H, R, 10.04, j, .24, .18, .02, .07, 'sun');
  timber(H, R, 6.25, 4.47, 3.45, 1.85, .32, .14, 'teal');
  metal(H, R, 6.47, 4.62, 1.7, 1.39, .48, .35, 'blue');
  for (let k = 0; k < 3; k++) timber(H, R, 8.43, 4.83 + k * .22, 1.09, .15, .5, .36, k === 1 ? 'coral' : 'paper');
  for (const x of [6.5, 9.42]) {
    metal(H, R, x, 4.65, .16, .21, 1.18, .27, 'blue');
    H.line(R, [H.p(x, 4.65, 1.2), H.p(x + .15, 4.86, 1.38)], 'sun', 1);
  }
  timber(H, R, 6.45, 4.59, 3.15, 1.44, 1.4, .09, 'paper');
  metal(H, R, 6.48, 4.48, 3.1, .12, 1.49, .27, 'blue');
  cushion(H, R, 8.66, 5.86, .8, .47, 1.29, .07, 'coral');
  const remote = H.p(9.05, 6.04, 1.38);
  shape(H, R, [[remote[0] - 11, remote[1] - 2], [remote[0] + 10, remote[1] - 9], [remote[0] + 15, remote[1] - 4], [remote[0] - 6, remote[1] + 3]], 'blue', .7);
  for (let k = 0; k < 3; k++) H.dot(remote[0] - 1 + k * 4, remote[1] - 3 - k, 1, 'paper');
  for (const [i, j, ink] of [[2.8, 5.8, 'teal'], [4.4, 7.7, 'coral'], [7, 8.6, 'teal']]) {
    floorShadow(H, i, j, 1.45, 1.2, .26);
    slattedSeat(H, R, i, j, 1.47, .05, ink, .81);
    cushion(H, R, i + .05, j + .14, 1.37, .64, .77, .13, ink);
  }
  drape(H, R, 7.08, 8.72, .62, .45, .95, .62, 'paper');
  surface(H, R, H.tile(7.3, 8.84, .29, .31, .961), 'coral', .5);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(7.3 + k * .08, 8.84, .97), H.p(7.3 + k * .08, 9.15, .97)], 'blue', .6);
  bentTube(H, R, [[8.57, 8.98, .14], [8.56, 8.98, 1.04], [8.41, 8.98, 1.18], [8.22, 8.98, 1.12]], 2.2, 'sun');
  benchFrame(H, R, 10.38, 7.3, .95, 2.7, .73, 'teal');
  cushion(H, R, 10.49, 7.47, .73, .58, .76, .16, 'coral');
  const brush = H.p(10.8, 8.58, .83);
  stroke(H, R, [[brush[0] - 11, brush[1] + 3], [brush[0] + 8, brush[1] - 5]], 'sun', 2.7);
  for (let k = 0; k < 5; k++) H.line(R, [[brush[0] + 7, brush[1] - 5 + k * .8], [brush[0] + 13, brush[1] - 8 + k]], 'blue', .6);
  drape(H, R, 10.54, 9.16, .62, .6, .78, .2, 'paper');
  metal(H, R, 1.5, 10.13, 2.75, 1.12, .08, .29, 'teal');
  surface(H, R, H.tile(1.63, 10.24, 2.49, .86, .38), 'blue', .9, .6);
  surface(H, R, [H.p(1.5, 10.13, .39), H.p(4.25, 10.13, .39), H.p(4.25, 9.95, 1.12), H.p(1.5, 9.95, 1.12)], 'teal', .52, 1);
  for (const x of [1.67, 3.98]) bentTube(H, R, [[x, 10.47, .35], [x, 10.03, .99]], 1.3, 'sun');
  for (const x of [2.12, 3.09]) {
    const p = H.p(x, 10.68, .43);
    for (let n = 0; n < 4; n++) H.outline(R, Array.from({length: 24}, (_, k) => [p[0] + Math.cos(k * Math.PI / 12) * (11 + n * 1.6), p[1] + Math.sin(k * Math.PI / 12) * (4 + n * .5)]), 'paper', .8);
    H.line(R, [[p[0] - 13, p[1]], [p[0] - 19, p[1] + 5], [p[0] - 13, p[1] + 9]], 'coral', 1.5);
  }
  cushion(H, R, 3.51, 10.31, .47, .68, .42, .14, 'coral');
  bentTube(H, R, [[2.3, 11.26, .21], [2.3, 11.43, .21], [3.19, 11.43, .21], [3.19, 11.26, .21]], 2.5, 'sun');
  for (const j of [2.23, 2.69]) {
    const x = 10.72;
    bentTube(H, R, [[x, j, .12], [x - .6, j, 1.99], [x - .5, j + .13, 2.13], [x + .11, j + .38, 2.13], [x + .44, j + .37, .13]], 2.4, 'paper');
    surface(H, R, [H.p(x - .54, j + .02, 1.4), H.p(x + .2, j + .35, 1.4), H.p(x + .02, j + .33, 1.91), H.p(x - .61, j, 1.91)], 'coral', .65, .75);
    H.line(R, [H.p(x - .26, j, .49), H.p(x + .34, j + .36, .5)], 'sun', 2.3);
  }
  const headphones = H.p(10.85, 7.92, .97);
  stroke(H, R, [[headphones[0] - 9, headphones[1]], [headphones[0] - 10, headphones[1] - 11], [headphones[0], headphones[1] - 16], [headphones[0] + 9, headphones[1] - 10], [headphones[0] + 9, headphones[1]]], 'blue', 2);
  for (const dx of [-9, 9]) oval(H, R, headphones[0] + dx, headphones[1], 3.5, 6, 'coral', .72);
}, (H, R, t) => {
  const u = ((t % 18) + 18) % 18;
  const p = H.p(7.3, 5.75, 1.51), turn = u < 3.6 ? 0 : u < 7.2 ? (u - 3.6) / 3.6 : u < 10.8 ? 1 : u < 16 ? 1 - (u - 10.8) / 5.2 : 0;
  H.opacity(.16, () => surface(H, R, [[p[0] - 65, p[1] - 19], [p[0] - 65, p[1] - 2], [p[0] - 103, p[1] - 11], [p[0] - 108, p[1] - 47]], 'sun', .8, .1));
  projector(H, R, ...p, turn);
  actor(H, R, 6.1, 6.44, u, 'barcelonaCinemaFocus', { face: 'se', shirt: ['paper', .92], pants: ['teal', .75], glasses: true, hairStyle: 'curly' }, 0, 1.45);
  actor(H, R, 3.51, 6.27, u, 'barcelonaCinemaViewer', { face: 'nw', shirt: ['sun', .65], hairStyle: 'bun' }, .37, 1.4);
  actor(H, R, 5.11, 8.17, (u + 2) % 18, 'barcelonaCinemaViewer', { face: 'nw', shirt: ['paper', .8], hairStyle: 'short' }, .37, 1.4);
  const hem = wallPt(H, 'nw', 9.97, .37, -.35);
  stroke(H, R, [[hem[0] - 3, hem[1] - 15], [hem[0] + Math.sin(u * Math.PI / 9) * 2, hem[1]], [hem[0] + 8, hem[1] + 3]], 'coral', 1.2);
});
room.loopSeconds = 18;
room.stillTime = 17;
export default room;
