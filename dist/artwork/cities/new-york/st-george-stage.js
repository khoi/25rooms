import { shelfUnit, shallowTray, liddedTin, foldedCloth, boundBook, satchel, handTool } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, wallRect, wallPt, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const cuff = { ...rest, head: 16, al: 57, ar: 64, el: 67, er: 47, lean: -3 };
const shoe = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -25, head: 27, al: 39, ar: 42, el: 13, er: 9 };
FIGURES.clips.newYorkStageCuff = { dur: 16, keys: [[0, cuff], [.13, cuff], [.24, { ...cuff, ar: 69, er: 35, al: 60, el: 62 }], [.33, cuff], [.42, { ...cuff, ar: 69, er: 35, al: 60, el: 62 }], [.54, cuff], [.69, { ...rest, al: 13, ar: 17, head: -8 }], [.84, { ...rest, al: 13, ar: 17, head: -8 }], [1, cuff]] };
FIGURES.clips.newYorkStageLaces = { dur: 16, keys: [[0, shoe], [.25, shoe], [.37, { ...shoe, ar: 49, al: 31, er: 5, el: 7 }], [.45, shoe], [.55, { ...shoe, ar: 49, al: 31, er: 5, el: 7 }], [.65, shoe], [.79, { ...shoe, lean: -6, head: -4, ar: 21, al: 23, er: 43, el: 38 }], [.9, { ...shoe, lean: -6, head: -4, ar: 21, al: 23, er: 43, el: 38 }], [1, shoe]] };

function mirror(H, R, side, pos, width) {
  shape(H, R, wallRect(H, side, pos, pos + width, 1.24, 3.31, -.03), 'blue', .74, 1.3);
  shape(H, R, wallRect(H, side, pos + .14, pos + width - .14, 1.4, 3.14, -.06), 'teal', .18, .75);
  shape(H, R, [wallPt(H, side, pos + .24, 2.77, -.08), wallPt(H, side, pos + .8, 3.08, -.08), wallPt(H, side, pos + 1.45, 1.46, -.08), wallPt(H, side, pos + .9, 1.46, -.08)], 'paper', .35, .3);
  for (const z of [1.3, 3.25]) for (let p = pos + .2; p < pos + width; p += .57) {
    const [x, y] = wallPt(H, side, p, z, -.12);
    oval(H, R, x, y, 4.2, 4.7, 'paper', 1);
    H.dot(x, y, 2.5, 'sun', .9);
  }
  for (const p of [pos + .06, pos + width - .06]) for (let z = 1.74; z < 3.14; z += .45) {
    const [x, y] = wallPt(H, side, p, z, -.12);
    oval(H, R, x, y, 4.2, 4.7, 'paper', 1);
    H.dot(x, y, 2.5, 'sun', .9);
  }
}

function stool(H, R, i, j, ink = 'coral') {
  for (const [a, b] of [[.09, .09], [.69, .09], [.09, .69], [.69, .69]]) H.line(R, [H.p(i + a, j + b, .04), H.p(i + a * .78 + .09, j + b * .78 + .09, .63)], 'blue', 2.2);
  box(H, R, i, j, .82, .82, .62, .13, ink, .68);
  for (const [a, b] of [[.16, .16], [.63, .16], [.16, .63], [.63, .63]]) H.dot(...H.p(i + a, j + b, .76), 1, 'blue', .7);
}

function wardrobe(H, R) {
  box(H, R, 9.0, .45, 2.45, 1.8, .04, 2.93, 'teal', .6);
  const door = [H.p(9.13, 2.27, .16), H.p(11.31, 2.27, .16), H.p(11.31, 2.27, 2.42), H.p(11.05, 2.27, 2.83), H.p(10.24, 2.27, 3.17), H.p(9.43, 2.27, 2.83), H.p(9.13, 2.27, 2.42)];
  shape(H, R, door, 'blue', .8, 1.1);
  H.clip(door, () => {
    H.line(R, [H.p(9.24, 2.31, 2.43), H.p(11.19, 2.31, 2.43)], 'sun', 2);
    for (const [i, ink, len] of [[9.57, 'paper', 1.16], [10.2, 'coral', 1.37], [10.79, 'sun', 1.02]]) {
      const [x, y] = H.p(i, 2.32, 2.4);
      stroke(H, R, [[x, y + 3], [x - 3, y - 2], [x + 2, y - 6], [x + 5, y - 3]], 'blue', .7);
      H.line(R, [[x, y + 2], [x - 12, y + 10], [x + 12, y + 10], [x, y + 2]], 'paper', .9);
      shape(H, R, [[x - 9, y + 8], [x + 9, y + 8], [x + 18, y + 23], [x + 12, y + 29], [x + 10, y + 21], [x + 13, y + len * 39], [x - 14, y + len * 39], [x - 11, y + 21], [x - 16, y + 28], [x - 21, y + 22]], ink, ink === 'paper' ? 1 : .72, .8);
      H.line(R, [[x, y + 10], [x, y + len * 37]], 'blue', .7);
      for (let k = 0; k < 4; k++) H.dot(x + 2, y + 16 + k * 6, 1, 'blue', .7);
    }
  });
  box(H, R, 9.06, 2.32, 2.34, .15, .04, .14, 'sun', .52);
  shape(H, R, [H.p(11.45, 2.23, .12), H.p(11.85, 3.13, .12), H.p(11.85, 3.13, 2.81), H.p(11.45, 2.23, 2.9)], 'teal', .54, 1);
  H.line(R, [H.p(11.74, 2.89, 1.32), H.p(11.74, 2.89, 1.59)], 'sun', 2.1);
}

function cosmetics(H, R) {
  for (let k = 0; k < 5; k++) {
    const i = 1.5 + k * .44;
    box(H, R, i, .92, .27, .29, 1.13, .16 + k % 2 * .21, k % 3 === 0 ? 'coral' : 'paper', .85);
    oval(H, R, ...H.p(i + .14, 1.06, 1.32 + k % 2 * .21), 4.6, 2, 'blue', .65);
  }
  for (const [i, ink] of [[4.0, 'sun'], [4.8, 'teal']]) {
    oval(H, R, ...H.p(i, 1.28, 1.16), 12, 6, ink, .7);
    const [x, y] = H.p(i, 1.15, 1.31);
    oval(H, R, x, y - 4, 10, 10, 'paper', 1);
    oval(H, R, x, y - 4, 7, 7, 'coral', .24);
  }
  box(H, R, 5.45, .83, .64, .59, 1.13, .3, 'paper', 1);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(5.55 + k * .09, 1.09, 1.45);
    H.line(R, [[x, y], [x - 4 + k * 2, y - 19]], k % 2 ? 'blue' : 'coral', 1.2);
    oval(H, R, x - 4 + k * 2, y - 21, 2.5, 4, 'blue', .65);
  }
  shape(H, R, H.tile(6.48, .95, .97, .55, 1.14), 'coral', .5, .6);
  for (let k = 0; k < 4; k++) oval(H, R, ...H.p(6.62 + k * .21, 1.22, 1.17), 2.5, 1.6, 'paper', 1);
  box(H, R, .77, 3.51, .6, .78, 1.13, .17, 'sun', .7);
  H.line(R, [H.p(.78, 3.9, 1.33), H.p(1.35, 3.9, 1.33)], 'blue', .7);
  const [x, y] = H.p(1.32, 4.7, 1.15);
  stroke(H, R, [[x - 9, y], [x + 10, y], [x + 10, y - 21], [x - 6, y - 21], [x - 6, y]], 'teal', 2.5);
  for (let k = 0; k < 7; k++) H.line(R, [[x - 7 + k * 2.5, y - 20], [x - 7 + k * 2.5, y - 13]], 'blue', .8);
}

function stGeorgeStageDetails(H, R) {
  table(H, R, 4.07, 7.35, 2.46, 1.38, 0.89, 'sun');
  shallowTray(H, R, 4.24, 7.53, 1.17, 0.98, 1.03, 'paper');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(4.49 + n * 0.3, 7.98, 1.25);
    H.line(
      R,
      [
        [x, y],
        [x, y - 12]
      ],
      ['coral', 'teal', 'sun'][n],
      6
    );
    oval(H, R, x, y - 12, 4, 2, 'paper', 1);
  }
  handTool(H, R, 5.05, 8.15, 1.28, 'scissors', 'blue');
  foldedCloth(H, R, 5.63, 7.57, 0.66, 0.89, 1.03, 'paper', 'teal');
  shelfUnit(H, R, 9.74, 5.27, 1.46, 1.13, 0.03, [0.16, 1.12, 2.05], 'teal');
  for (let n = 0; n < 2; n++) {
    const [x, y] = H.p(10.1 + n * 0.59, 5.81, 0.31);
    oval(H, R, x, y, 9, 4, 'blue', 0.7);
    oval(H, R, x - 3, y - 4, 5, 5, 'coral', 0.55);
  }
  boundBook(H, R, 9.94, 5.46, 1.01, 0.76, 1.27, 'coral');
  liddedTin(H, R, 10.45, 5.82, 2.21, 13, 17, 'sun');
  const [x, y] = H.p(7.31, 0.16, 2.95);
  oval(H, R, x, y, 11, 12, 'blue', 0.55);
  oval(H, R, x, y, 8, 9, 'paper', 1);
  H.line(
    R,
    [
      [x, y - 6],
      [x, y],
      [x + 5, y + 2]
    ],
    'coral',
    1
  );
  for (let n = 0; n < 3; n++) {
    const j = 6.0 + n * 0.65;
    H.line(R, [H.p(0.16, j, 2.59), H.p(0.44, j, 2.59)], 'blue', 1.2);
    stroke(H, R, [H.p(0.43, j - 0.18, 2.3), H.p(0.43, j, 2.55), H.p(0.43, j + 0.18, 2.3), H.p(0.43, j - 0.18, 2.3)], 'sun', 1);
  }
  satchel(H, R, 7.4, 10.46, 0.03, 'teal', 0.85);
}

const room = world('new-york-st-george-stage', 'St. George · Five Minutes', { floor: 'paper', tone: .64, wall: 'coral', wallTone: .2, pattern: 'boards', height: 3.62, head: 20 }, (H, R) => {
  for (const side of ['nw', 'ne']) {
    shape(H, R, wallRect(H, side, .03, 11.95, .09, .31), 'blue', .66, .65);
    shape(H, R, wallRect(H, side, .03, 11.95, 3.46, 3.6), 'paper', 1, .5);
  }
  mirror(H, R, 'ne', .55, 7.31);
  mirror(H, R, 'nw', .62, 4.9);
  table(H, R, .44, .44, 7.61, 1.29, 1.0, 'paper');
  table(H, R, .44, 1.67, 1.29, 3.94, 1.0, 'paper');
  for (const i of [1.15, 3.22, 5.29]) {
    box(H, R, i, .65, 1.52, .78, .25, .7, 'teal', .44);
    H.line(R, [H.p(i + .2, 1.45, .64), H.p(i + 1.31, 1.45, .64)], 'blue', .7);
    H.line(R, [H.p(i + .59, 1.46, .52), H.p(i + .94, 1.46, .52)], 'sun', 2);
  }
  cosmetics(H, R);
  wardrobe(H, R);
  stool(H, R, 3.62, 2.31, 'sun');
  stool(H, R, 1.95, 4.12, 'teal');
  box(H, R, 7.98, 7.53, 1.16, 1.14, .61, .14, 'coral', .64);
  box(H, R, 7.98, 7.53, 1.16, .13, .76, .94, 'coral', .54);
  for (const i of [8.05, 8.99]) for (const j of [7.64, 8.54]) H.line(R, [H.p(i, j, .04), H.p(i, j, .66)], 'blue', 2.3);
  box(H, R, .68, 8.38, 3.07, 1.78, .04, .95, 'teal', .68);
  box(H, R, .61, 8.31, 3.21, 1.92, 1.01, .17, 'paper', 1);
  for (const i of [1.17, 3.02]) {
    shape(H, R, H.faceI(i, 10.25, .24, .36, 1.18), 'sun', .58, .65);
    box(H, R, i, 8.32, .24, 1.92, 1.19, .03, 'sun', .6);
  }
  const [tx, ty] = H.p(2.16, 10.28, .7);
  stroke(H, R, [[tx - 10, ty], [tx - 10, ty + 6], [tx + 10, ty + 6], [tx + 10, ty]], 'blue', 2.3);
  box(H, R, 1.13, 8.64, .99, .72, 1.22, .2, 'coral', .62);
  shape(H, R, H.tile(2.38, 8.55, .93, 1.08, 1.21), 'paper', 1, .6);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(2.5, 8.77 + k * .19, 1.22), H.p(3.17, 8.77 + k * .19, 1.22)], 'blue', .5, { tone: .45 });
  for (const [i, j] of [[9.38, 6.09], [10.07, 6.09]]) {
    box(H, R, i, j, .36, .58, .05, .25, 'blue', .78);
    box(H, R, i, j + .39, .36, .38, .05, .12, 'blue', .84);
    for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .08, j + .14 + k * .13, .31), H.p(i + .28, j + .17 + k * .13, .31)], 'paper', .65);
  }
  table(H, R, 10.14, 9.23, 1.19, 1.05, .68, 'teal');
  box(H, R, 10.36, 9.42, .71, .62, .84, .17, 'paper', 1);
  oval(H, R, ...H.p(10.74, 9.75, 1.07), 10, 4, 'sun', .7);
  const [cx, cy] = H.p(10.68, 10.03, .85);
  oval(H, R, cx, cy - 13, 5, 2, 'paper', 1);
  shape(H, R, [[cx - 5, cy - 13], [cx + 5, cy - 13], [cx + 4, cy], [cx - 4, cy]], 'teal', .6, .6);
  box(H, R, 5.8, 10.1, 1.07, .79, .03, .41, 'coral', .55);
  stroke(H, R, [H.p(5.94, 10.37, .4), H.p(6.14, 10.37, .83), H.p(6.6, 10.37, .83), H.p(6.79, 10.37, .4)], 'blue', 1.8);
  for (const [i, j, w, d] of [[4.52, 5.79, .95, .1], [4.52, 5.79, .1, .83], [6.07, 5.79, .85, .1], [6.82, 5.79, .1, .83]]) shape(H, R, H.tile(i, j, w, d, .025), 'sun', .82, .4);
  const curtain = [H.p(.14, 6.13, 3.35), H.p(.14, 7.8, 3.35), H.p(.14, 7.59, .49), H.p(.14, 7.21, .57), H.p(.14, 6.87, .4), H.p(.14, 6.48, .55), H.p(.14, 6.13, .46)];
  shape(H, R, curtain, 'blue', .67, .9);
  for (let j = 6.28; j < 7.75; j += .31) stroke(H, R, [H.p(.18, j, 3.31), H.p(.23, j + .1, 1.8), H.p(.19, j, .59)], 'paper', .75, .5);
  stGeorgeStageDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  const shift = u < .54 ? 0 : u < .69 ? (u - .54) / .15 : u < .84 ? 1 : (1 - u) / .16;
  const checking = shift * shift * (3 - 2 * shift);
  H.clip(wallRect(H, 'ne', .7, 7.71, 1.4, 3.14, -.08), () => {
    const [x, y] = H.p(5.88, .15, 2.03);
    oval(H, R, x, y - 27, 7.5, 8, 'coral', .24);
    shape(H, R, [[x - 9, y - 19], [x + 9, y - 19], [x + 13, y + 7], [x - 11, y + 7]], 'teal', .32, .5);
    H.line(R, [[x - 9, y - 11], [x - 14, y + 1], [x + 4 - checking * 14, y - 7 + checking * 16]], 'teal', 4, { tone: .4 });
  });
  actor(H, R, 5.78, 3.42, t, 'newYorkStageCuff', { shirt: ['teal', .73], pants: ['blue', .78], hairStyle: 'curly', face: 'nw', prop(h, r, points) {
    const [x, y] = points.nearHand;
    shape(h, r, [[x - 5, y - 4], [x + 2, y - 7], [x + 6, y], [x - 1, y + 4]], 'paper', 1, .65);
    H.dot(x, y - 1, 1.4, 'sun', 1);
  } }, 0, 1.35);
  actor(H, R, 8.52, 8.02, t, 'newYorkStageLaces', { shirt: ['coral', .68], hairStyle: 'short', prop(h, r, points) {
    if (u < .68 || u > .94) {
      const a = points.nearHand, b = points.farHand;
      stroke(h, r, [[a[0], a[1]], [a[0] + 3, a[1] + 7], [b[0] - 3, b[1] + 7], [b[0], b[1]]], 'paper', .95);
    }
  } }, .25, 1.28);
  const [x, y] = H.p(.22, 7.64, 1.11);
  stroke(H, R, [[x - 4, y - 23], [x + Math.sin(u * TAU) * 2, y], [x - 4, y + 13]], 'coral', 1.1, .65);
});

room.loopSeconds = 16;
export default room;
