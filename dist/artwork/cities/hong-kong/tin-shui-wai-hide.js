import { recessedFrame, wallRack } from '../joinery.js';
import { shelfUnit, shallowTray, liddedTin, foldedCloth, boundBook, satchel, handTool, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, bench, actor, bottle, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const watch = { ...rest, al: -146, el: -12, ar: 146, er: 12, head: -6, lean: 3 };
const lowered = { ...rest, al: 45, el: 70, ar: 52, er: 73, head: 12 };
FIGURES.clips.hongKongHideObserve = { dur: 14, keys: [[0, watch], [.2, watch], [.32, { ...watch, head: -12, lean: -3 }], [.49, { ...watch, head: -12, lean: -3 }], [.64, lowered], [.81, lowered], [.94, watch], [1, watch]] };
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 48, ar: 65, el: 45, er: 30, head: 16 };
FIGURES.clips.hongKongHideNotes = { dur: 14, keys: [[0, seated], [.5, seated], [.65, { ...seated, ar: 73, er: 22 }], [.7, seated], [.76, { ...seated, ar: 72, er: 21 }], [.84, seated], [1, seated]] };

function reeds(H, R, i, j, s = 1, bend = 0) {
  const [x, y] = H.p(i, j, .08);
  for (let k = 0; k < 7; k++) {
    const dx = (k - 3) * 4 * s, h = (28 + k % 3 * 12) * s;
    stroke(H, R, [[x + dx, y], [x + dx - 2 * s + bend, y - h * .52], [x + dx + (k % 2 ? 5 : -4) * s + bend, y - h]], 'teal', 1.15 * s, .7);
    const tip = x + dx + (k % 2 ? 5 : -4) * s + bend;
    oval(H, R, tip, y - h + 2 * s, 1.6 * s, 6 * s, 'sun', .68);
    stroke(H, R, [[x + dx, y - h * .32], [x + dx + 10 * s, y - h * .57], [x + dx + 13 * s, y - h * .58]], 'teal', .8 * s, .6);
  }
}

function egret(H, R, x, y, turn = 0) {
  for (const dx of [-3, 4]) stroke(H, R, [[x + dx, y - 2], [x + dx + 2, y + 11], [x + dx + 6, y + 11]], 'blue', .7);
  oval(H, R, x, y - 6, 10, 5, 'paper', 1);
  stroke(H, R, [[x + 6, y - 7], [x + 13, y - 14], [x + 8 + turn, y - 23], [x + 13 + turn, y - 27]], 'blue', 3.8);
  stroke(H, R, [[x + 6, y - 7], [x + 13, y - 14], [x + 8 + turn, y - 23], [x + 13 + turn, y - 27]], 'paper', 2.8);
  oval(H, R, x + 14 + turn, y - 27, 4, 3, 'paper', 1);
  shape(H, R, [[x + 17 + turn, y - 28], [x + 26 + turn, y - 26], [x + 17 + turn, y - 25]], 'sun', .8, .4);
  H.dot(x + 15 + turn, y - 28, .8, 'blue');
  stroke(H, R, [[x - 7, y - 7], [x, y - 4], [x + 5, y - 6]], 'teal', .55, .45);
}

function hide(H, R) {
  shape(H, R, H.tile(.08, .08, 11.84, 2.15, .03), 'teal', .32);
  for (let k = 0; k < 15; k++) H.line(R, [H.p(.4 + k % 5 * 2.2, .2 + Math.floor(k / 5) * .7, .04), H.p(1.4 + k % 5 * 2.2, .2 + Math.floor(k / 5) * .7, .04)], 'paper', .8, { tone: .6 });
  for (const [i, j, s] of [[.6, .6, .65], [1.5, 1.5, .75], [8.2, .5, .68], [10.9, 1.2, .8]]) reeds(H, R, i, j, s);
  box(H, R, .12, 2.28, 11.76, 9.56, .02, .18, 'sun', .2);
  for (let j = 2.35; j < 11.8; j += .48) {
    H.line(R, [H.p(.2, j, .21), H.p(11.8, j, .21)], 'blue', .65, { tone: .38 });
    for (let i = j % 2; i < 11.8; i += 2.5) H.line(R, [H.p(i, j, .21), H.p(i, j + .44, .21)], 'blue', .5, { tone: .27 });
  }
  box(H, R, .12, 2.17, 11.76, .19, .2, 1.58, 'teal', .54);
  box(H, R, .12, 2.17, 11.76, .19, 2.53, .73, 'teal', .54);
  for (let i = .38; i < 11.9; i += .66) {
    H.line(R, [H.p(i, 2.38, .26), H.p(i, 2.38, 1.72)], 'blue', .7, { tone: .52 });
    H.line(R, [H.p(i, 2.38, 2.58), H.p(i, 2.38, 3.2)], 'blue', .7, { tone: .52 });
  }
  for (const i of [.14, 4.06, 7.9, 11.65]) box(H, R, i, 2.13, .2, .29, .2, 3.27, 'blue', .57);
  box(H, R, .05, 2.42, .16, 8.65, .21, 2.52, 'teal', .32);
  for (let j = 2.6; j < 10.9; j += .62) H.line(R, [H.p(.24, j, .3), H.p(.24, j, 2.65)], 'blue', .65, { tone: .42 });
  box(H, R, .04, 2.12, 11.85, .95, 3.28, .13, 'sun', .33);
  for (let i = .25; i < 11.7; i += .53) H.line(R, [H.p(i, 2.16, 3.43), H.p(i, 3.04, 3.43)], 'blue', .55, { tone: .4 });
  table(H, R, 1.02, 2.53, 9.89, .83, 1.22, 'paper');
  for (const i of [2.2, 5.2, 8.4]) {
    shape(H, R, H.tile(i, 2.67, .91, .44, 1.36), 'sun', .28, .6);
    const [x, y] = H.p(i + .46, 2.9, 1.38);
    oval(H, R, x, y, 6, 2.5, 'teal', .65);
    H.line(R, [[x - 7, y + 3], [x + 7, y + 3]], 'blue', .55);
  }
  bench(H, R, 1.23, 4.59, 3.13, 'sun');
  bench(H, R, 7.47, 4.59, 3.35, 'sun');
  table(H, R, 1.42, 7.2, 2.55, 1.64, .89, 'teal');
  shape(H, R, H.tile(1.75, 7.48, 1.11, .91, 1.03), 'paper', 1);
  H.line(R, [H.p(2.31, 7.48, 1.05), H.p(2.31, 8.39, 1.05)], 'blue', .65);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(2.42, 7.61 + k * .17, 1.06), H.p(2.77, 7.61 + k * .17, 1.06)], 'teal', .5);
  bottle(H, R, ...H.p(3.47, 7.47, 1.06), 'teal', .49);
  table(H, R, 2.18, 9.09, 1.0, .86, .55, 'sun');
  const [bx, by] = H.p(9.57, 6.31, .27);
  shape(H, R, [[bx - 17, by], [bx + 14, by], [bx + 17, by - 28], [bx - 11, by - 32]], 'coral', .59);
  stroke(H, R, [[bx - 10, by - 25], [bx - 6, by - 39], [bx + 8, by - 37], [bx + 12, by - 25]], 'blue', 1.4);
  shape(H, R, [[bx - 10, by - 3], [bx + 9, by - 3], [bx + 10, by - 14], [bx - 10, by - 14]], 'sun', .55);
  const [sx, sy] = H.p(10.63, 3.69, .23);
  for (const dx of [-15, 0, 14]) H.line(R, [[sx, sy - 59], [sx + dx, sy]], 'blue', 1.5);
  shape(H, R, [[sx - 20, sy - 69], [sx + 16, sy - 60], [sx + 18, sy - 68], [sx - 18, sy - 77]], 'blue', .76);
  oval(H, R, sx + 17, sy - 64, 3, 5, 'paper', 1);
  const [ux, uy] = H.p(.65, 9.64, .23);
  stroke(H, R, [[ux, uy], [ux, uy - 57], [ux + 6, uy - 64], [ux + 12, uy - 60]], 'blue', 1.8);
  shape(H, R, [[ux - 3, uy - 3], [ux - 7, uy - 43], [ux + 5, uy - 45], [ux + 5, uy - 4]], 'coral', .68);
  shape(H, R, H.tile(5.19, 9.56, 3.12, 1.19, .22), 'teal', .2);
  for (let k = 0; k < 9; k++) H.line(R, [H.p(5.35 + k * .33, 9.64, .24), H.p(5.35 + k * .33, 10.65, .24)], 'blue', .55, { tone: .3 });
  box(H, R, .38, 5.7, .69, .77, .22, .55, 'teal', .6);
  oval(H, R, ...H.p(.72, 6.08, .79), 9, 4, 'blue', .56);
  tinShuiWaiHideDetails(H, R);
  construction(H, R);
}

function tinShuiWaiHideDetails(H, R) {
  shelfUnit(H, R, 8.59, 9.2, 2.56, 1.05, 0.22, [0.12, 0.93, 1.71], 'sun');
  for (let n = 0; n < 3; n++) boundBook(H, R, 8.79 + n * 0.7, 9.38, 0.57, 0.68, 0.48, ['teal', 'coral', 'blue'][n]);
  shallowTray(H, R, 8.77, 9.36, 1.11, 0.71, 1.3, 'paper');
  for (const i of [9.05, 9.5]) oval(H, R, ...H.p(i, 9.72, 1.52), i < 9.3 ? 5 : 7, i < 9.3 ? 5 : 7, 'blue', 0.65);
  foldedCloth(H, R, 10.05, 9.38, 0.83, 0.68, 1.3, 'paper', 'teal');
  framedPanel(H, R, 8.84, 9.52, 1.08, 2.06, 0.74, 'teal');
  liddedTin(H, R, 10.69, 9.75, 2.07, 6, 16, 'sun');
  for (const j of [6.66, 7.31, 7.96]) {
    H.line(R, [H.p(0.28, j, 2.04), H.p(0.59, j, 2.04), H.p(0.59, j, 2.14)], 'blue', 1.8);
  }
  satchel(H, R, 0.65, 7.16, 1.11, 'teal', 0.74);
  shallowTray(H, R, 1.54, 10.62, 2.24, 0.72, 0.22, 'blue');
  for (const i of [2, 2.75]) {
    oval(H, R, ...H.p(i, 10.91, 0.41), 10, 5, 'coral', 0.55);
    H.line(R, [H.p(i, 10.9, 0.45), H.p(i, 10.9, 0.82)], 'coral', 6);
  }
  boundBook(H, R, 3.05, 7.91, 0.66, 0.57, 1.05, 'sun');
  handTool(H, R, 3.43, 8.15, 1.23, 'brush', 'teal');
  for (const i of [1.8, 5.1, 8.7]) {
    box(H, R, i, 2.47, 0.23, 0.1, 2.51, 0.29, 'blue', 0.55);
    H.dot(...H.p(i + 0.11, 2.59, 2.64), 1.3, 'sun');
  }
  servicePipe(
    H,
    R,
    [
      [11.69, 2.34, 0.24],
      [11.69, 2.34, 3.29],
      [11.69, 3.1, 3.29]
    ],
    'teal',
    2
  );
}

function construction(H, R) {
  for (let n = 0; n < 11; n++) {
    const i = 0.45 + n * 1.03;
    H.line(R, [H.p(i, 2.39, 0.31), H.p(i, 2.39, 1.67)], 'blue', 0.6, { tone: 0.5 });
    for (const z of [0.4, 1.53, 2.71, 3.09]) H.dot(...H.p(i + 0.12, 2.41, z), 1, 'sun');
  }
  for (const i of [0.25, 4.18, 8.02, 11.69]) {
    H.line(R, [H.p(i, 2.43, 2.58), H.p(i + 0.56, 2.87, 3.28)], 'blue', 2);
    H.line(R, [H.p(i, 2.43, 0.4), H.p(i + 0.13, 2.43, 0.4)], 'paper', 2);
  }
  for (let n = 0; n < 3; n++) {
    const i = 0.62 + n * 3.85;
    box(H, R, i, 2.32, 3.09, 0.12, 2.73, 0.12, 'sun', 0.52);
    for (const x of [i + 0.15, i + 2.83]) H.line(R, [H.p(x, 2.36, 2.82), H.p(x, 2.99, 2.55)], 'blue', 1.2);
  }
  wallRack(H, R, 'nw', 3.4, 1.8, 1.03, 1.38, 2, 'sun', (P, z, row) => {
    for (let n = 0; n < 4; n++) {
      const u = 0.27 + n * 0.37;
      shape(H, R, [P(u, z + 0.04), P(u + 0.25, z + 0.04), P(u + 0.25, z + 0.47), P(u, z + 0.47)], n % 2 ? 'paper' : 'teal', 0.7, 0.5);
      H.line(R, [P(u + 0.04, z + 0.33), P(u + 0.22, z + 0.33)], row ? 'coral' : 'sun', 1.2);
    }
  });
  recessedFrame(H, R, 'nw', 6.63, 3.24, 1.32, 1.14, 'teal', (P) => {
    shape(H, R, [P(0.14, 0.13), P(3.1, 0.13), P(3.1, 1), P(0.14, 1)], 'paper', 1, 0.5);
    for (let n = 0; n < 4; n++) {
      const [x, y] = P(0.5 + n * 0.74, 0.53);
      shape(
        H,
        R,
        [
          [x - 9, y],
          [x - 3, y - 5],
          [x + 5, y - 3],
          [x + 12, y - 7],
          [x + 8, y + 1],
          [x - 4, y + 4]
        ],
        n % 2 ? 'teal' : 'blue',
        0.55,
        0.5
      );
      H.line(
        R,
        [
          [x, y + 3],
          [x - 1, y + 10]
        ],
        'coral',
        0.8
      );
      H.dot(x + 6, y - 3, 0.8, 'sun');
    }
  });
  const [x, y] = H.p(3.02, 7.98, 1.06);
  oval(H, R, x, y, 8, 6, 'paper', 1);
  oval(H, R, x, y, 5, 3.5, 'teal', 0.2);
  H.line(
    R,
    [
      [x + 5, y + 4],
      [x + 16, y + 12]
    ],
    'blue',
    2.2
  );
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(1.7 + n * 0.36, 7.55, 1.04);
    H.line(
      R,
      [
        [px, py],
        [px + 8, py - 8]
      ],
      'sun',
      1.1
    );
    shape(
      H,
      R,
      [
        [px, py],
        [px + 2, py - 11],
        [px + 10, py - 15],
        [px + 7, py - 5]
      ],
      n % 2 ? 'teal' : 'coral',
      0.35,
      0.5
    );
  }
  for (const j of [6.08, 9.18]) {
    box(H, R, 0.13, j, 0.4, 0.12, 0.3, 1.27, 'blue', 0.5);
    H.line(R, [H.p(0.15, j, 0.51), H.p(0.66, j, 1.54)], 'sun', 1.4);
  }
  for (let n = 0; n < 5; n++) {
    const i = 0.5 + n * 2.23;
    reeds(H, R, i, 0.58, 0.52 + (n % 2) * 0.15, 0.1);
  }
  for (let n = 0; n < 10; n++) {
    const i = 0.6 + n * 1.05,
      [px, py] = H.p(i, 1.52, 0.04);
    oval(H, R, px, py, 7 + (n % 3) * 3, 2.5, 'teal', 0.35);
    H.line(
      R,
      [
        [px - 4, py],
        [px + 3, py]
      ],
      'paper',
      0.7
    );
  }
  const [bx, by] = H.p(10.45, 6.85, 0.28);
  shape(
    H,
    R,
    [
      [bx - 9, by],
      [bx + 9, by],
      [bx + 7, by - 26],
      [bx - 7, by - 26]
    ],
    'teal',
    0.6,
    0.7
  );
  oval(H, R, bx, by - 26, 7, 3, 'sun', 0.7);
  H.line(
    R,
    [
      [bx - 7, by - 6],
      [bx + 7, by - 6]
    ],
    'paper',
    1
  );
  stroke(
    H,
    R,
    [
      [bx - 6, by - 25],
      [bx - 8, by - 36],
      [bx + 6, by - 36],
      [bx + 7, by - 25]
    ],
    'blue',
    0.9
  );
}

const room = world('hong-kong-tin-shui-wai-hide', 'Tin Shui Wai · A gap in the reeds', { floor: 'paper', tone: .2, wall: false, head: 20 }, hide, (H, R, t) => {
  const u = cycle(t, 14), bend = Math.sin(u * TAU) * 2;
  const slit = H.faceI(.37, 2.42, 11.24, 1.79, 2.5);
  H.clip(slit, () => {
    const [x, y] = H.p(7.05, 2.42, 1.93);
    egret(H, R, x, y, Math.sin(u * TAU) * 2);
    for (let k = 0; k < 9; k++) {
      const [rx, ry] = H.p(8.58 + k * .32, 2.42, 1.81);
      stroke(H, R, [[rx, ry + 13], [rx + bend, ry - 6], [rx + bend + 3, ry - 18 - k % 3 * 4]], 'teal', .8, .62);
      oval(H, R, rx + bend + 3, ry - 20 - k % 3 * 4, 1.5, 4.5, 'sun', .57);
    }
  });
  H.at(5.94, 4.21, .22, HH => actor(HH, R, 5.94, 4.21, t, 'hongKongHideObserve', { shirt: ['coral', .61], hairStyle: 'cap', face: 'ne', prop(h, r, p) {
    const x = (p.nearHand[0] + p.farHand[0]) / 2, y = (p.nearHand[1] + p.farHand[1]) / 2;
    stroke(h, r, [p.nearHand, [x, y + 1], p.farHand], 'blue', 3);
    for (const dx of [-5, 5]) {
      shape(h, r, [[x + dx - 4, y + 4], [x + dx + 4, y + 4], [x + dx + 3, y - 7], [x + dx - 3, y - 7]], 'blue', .8, .6);
      oval(h, r, x + dx, y - 7, 3.5, 2, 'teal', .64);
    }
    stroke(h, r, [[x - 7, y + 4], [p.chest[0] - 11, p.chest[1] + 13], [p.chest[0] + 10, p.chest[1] + 14], [x + 7, y + 4]], 'blue', .7);
  } }, .22, 1.34));
  H.at(2.67, 9.37, .25, HH => actor(HH, R, 2.67, 9.37, t, 'hongKongHideNotes', { shirt: ['paper', 1], hairStyle: 'bun', face: 'nw', prop(h, r, p) {
    h.line(r, [[p.nearHand[0] + 2, p.nearHand[1] + 4], [p.nearHand[0] - 5, p.nearHand[1] - 10]], 'blue', 1.3);
  } }, .25, 1.24));
});

room.loopSeconds = 14;
export default room;
