import { shallowTray, foldedCloth, coiledLine, boundBook, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -10, head: 13, al: 62, ar: 69, el: 42, er: 34 };
FIGURES.clips.hongKongDragonSupport = { dur: 14, keys: [[0, hold], [.13, hold], [.3, { ...hold, al: 74, ar: 78, el: 20, er: 20 }], [.48, { ...hold, al: 79, ar: 84, el: 12, er: 15, lean: -14 }], [.61, { ...hold, al: 74, ar: 78, el: 20, er: 20 }], [.8, hold], [1, hold]] };

function trestle(H, R, i, j) {
  for (const x of [i, i + .8]) {
    H.line(R, [H.p(x, j, .04), H.p(x, j + .57, 1.04), H.p(x, j + 1.14, .04)], 'blue', 3.4);
    H.line(R, [H.p(x, j + .15, .37), H.p(x, j + .95, .37)], 'coral', 2);
  }
  box(H, R, i - .09, j + .42, .98, .31, 1.02, .12, 'coral', .55);
}

function strawSection(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 25 * size, 17 * size, 'sun', .57);
  for (let q = 0; q < 13; q++) {
    const dy = (q - 6) * 2.1 * size, half = Math.sqrt(Math.max(0, 1 - (dy / (17 * size)) ** 2)) * 25 * size;
    stroke(H, R, [[x - half, y + dy], [x - half * .35, y + dy - 2], [x + half * .4, y + dy + 1], [x + half, y + dy - 2]], q % 3 ? 'coral' : 'blue', .5, .52);
  }
  for (const dx of [-13, 9]) stroke(H, R, [[x + dx * size, y - 15 * size], [x + (dx - 4) * size, y], [x + dx * size, y + 15 * size]], 'teal', 1.5, .72);
}

function dragonHead(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 32, y + 5], [x - 30, y - 22], [x - 17, y - 36], [x + 8, y - 34], [x + 24, y - 19], [x + 44, y - 8], [x + 43, y + 13], [x + 20, y + 24], [x - 11, y + 24]], 'sun', .65);
  for (let q = 0; q < 15; q++) H.line(R, [[x - 25 + q * 4.4, y + 5 + Math.sin(q) * 4], [x - 22 + q * 4.4, y + 21]], 'coral', .7, { tone: .7 });
  shape(H, R, [[x - 18, y - 27], [x - 29, y - 52], [x - 22, y - 57], [x - 8, y - 31]], 'paper', 1, .8);
  shape(H, R, [[x + 5, y - 30], [x + 7, y - 54], [x + 16, y - 51], [x + 16, y - 26]], 'paper', 1, .8);
  oval(H, R, x + 8, y - 15, 11, 12, 'paper', 1);
  oval(H, R, x + 11, y - 14, 5, 6, 'blue', .85);
  H.dot(x + 13, y - 16, 1.6, 'paper', 1);
  oval(H, R, x + 31, y - 3, 15, 8, 'coral', .63);
  H.dot(x + 35, y - 6, 2, 'blue', 1);
  stroke(H, R, [[x + 12, y + 8], [x + 25, y + 13], [x + 41, y + 7]], 'blue', 1.5);
  for (let q = 0; q < 5; q++) shape(H, R, [[x + 13 + q * 5, y + 10], [x + 16 + q * 5, y + 10], [x + 15 + q * 5, y + 16]], 'paper', 1, .4);
  for (const d of [-1, 1]) stroke(H, R, [[x + 27, y + 1], [x + 43, y + d * 17], [x + 54, y + d * 18], [x + 57, y + d * 12]], 'teal', 1.6);
  for (let q = 0; q < 8; q++) stroke(H, R, [[x - 13 + q * 5, y + 22], [x - 15 + q * 5, y + 32], [x - 10 + q * 5, y + 39]], q % 2 ? 'coral' : 'sun', 1.3);
}

function taiHangDragonDetails(H, R) {
  table(H, R, 5.4, 0.91, 3.28, 1.32, 0.8, 'teal');
  shallowTray(H, R, 5.6, 1.08, 1.44, 0.96, 0.95, 'paper');
  for (let n = 0; n < 7; n++) H.line(R, [H.p(5.78 + n * 0.16, 1.18, 1.16), H.p(5.81 + n * 0.16, 1.87, 1.16)], 'sun', 1.7);
  coiledLine(H, R, 7.52, 1.57, 0.96, 12, 'teal');
  handTool(H, R, 8.22, 1.64, 0.97, 'scissors', 'coral');
  slattedCrate(H, R, 2.03, 10.19, 2.81, 1.18, 0.02, 0.67, 'sun');
  for (let n = 0; n < 6; n++) {
    const [x, y] = H.p(2.36 + n * 0.4, 10.67, 0.73);
    oval(H, R, x, y, 5, 10, 'sun', 0.45);
    for (let k = 0; k < 3; k++)
      H.line(
        R,
        [
          [x - 3 + k * 3, y - 9],
          [x - 2 + k * 2, y + 8]
        ],
        'blue',
        0.6
      );
    H.line(
      R,
      [
        [x - 5, y],
        [x + 5, y]
      ],
      'coral',
      1.5
    );
  }
  for (const i of [8.96, 9.72]) {
    H.line(R, [H.p(i, 0.42, 0.11), H.p(i, 0.42, 3.25)], 'sun', 3);
    for (const z of [0.45, 1.0, 1.55, 2.1, 2.65, 3.1]) H.line(R, [H.p(8.96, 0.42, z), H.p(9.72, 0.42, z)], z === 1.55 ? 'coral' : 'teal', 2.2);
  }
  shallowTray(H, R, 1.24, 6.32, 1.35, 1.15, 0.02, 'teal');
  for (let n = 0; n < 3; n++) oval(H, R, ...H.p(1.63 + n * 0.25, 6.78, 0.24), 6, 5, 'paper', 1);
  boundBook(H, R, 3.21, 1.22, 1.25, 0.79, 0.06, 'blue');
  foldedCloth(H, R, 10.06, 7.55, 1.16, 0.81, 0.04, 'coral', 'paper');
  servicePipe(
    H,
    R,
    [
      [0.12, 10.68, 0.28],
      [0.12, 10.68, 3.18],
      [0.12, 0.12, 3.18],
      [3.82, 0.12, 3.18]
    ],
    'teal',
    2
  );
}

const room = world('hong-kong-tai-hang-dragon', 'Tai Hang · The dragon waits', { floor: 'paper', tone: .4, wall: 'paper', wallTone: .88, height: 3.63, head: 20 }, (H, R) => {
  shape(H, R, H.faceI(.45, .03, 4.7, .25, 3.35), 'teal', .45);
  for (let q = 0; q < 18; q++) H.line(R, [H.p(.48, .04, .39 + q * .16), H.p(5.13, .04, .39 + q * .16)], 'blue', .8, { tone: .52 });
  box(H, R, .35, .12, 4.95, .19, 3.36, .22, 'paper', .85);
  shape(H, R, H.faceI(6.05, .05, 2.13, 1.96, 3.27), 'sun', .2);
  for (const i of [6.12, 6.77, 7.44, 8.11]) H.line(R, [H.p(i, .06, 1.97), H.p(i, .06, 3.27)], 'blue', 1.3);
  for (const z of [2.3, 2.75]) H.line(R, [H.p(6.06, .06, z), H.p(8.17, .06, z)], 'blue', .8);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(.13, 1.6 + q * .16, .2), H.p(.13, 2.6 + q * .15, 3.1)], q % 2 ? 'sun' : 'coral', 2.2);
  for (const z of [.95, 2.15]) box(H, R, .17, 5.7, .73, 4.3, z, .12, 'teal', .55);
  for (let q = 0; q < 5; q++) {
    box(H, R, .27, 5.85 + q * .78, .5, .58, 1.08, .46, q % 2 ? 'paper' : 'coral', .72);
    H.line(R, [H.p(.78, 5.97 + q * .78, 1.3), H.p(.78, 6.27 + q * .78, 1.3)], 'blue', 1.1);
  }
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(.55, 6 + q, 2.4);
    oval(H, R, x, y, 7, 9, 'sun', .55);
    for (const r of [3, 5, 7]) H.outline(R, Array.from({ length: 18 }, (_, k) => [x + Math.cos(k * TAU / 18) * r, y + Math.sin(k * TAU / 18) * r * 1.3]), 'coral', .6);
  }
  for (const [i, j] of [[3.45, 3.05], [6.05, 3.7], [8.65, 4.16]]) trestle(H, R, i, j);
  const spine = Array.from({ length: 9 }, (_, q) => [2.4 + q * .82, 2.9 + q * .25 + Math.sin(q * .6) * .32]);
  stroke(H, R, [...spine.map(([i, j]) => H.p(i, j, 1.48)), H.p(9.75, 4.92, 1.57)], 'blue', 9, .6);
  stroke(H, R, [...spine.map(([i, j]) => H.p(i, j, 1.48)), H.p(9.75, 4.92, 1.57)], 'sun', 7, .8);
  for (const [q, [i, j]] of spine.entries()) strawSection(H, R, i, j, 1.48, .73 + q * .035);
  dragonHead(H, R, 9.75, 4.92, 1.83);
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(2.07, 2.75, 1.5);
    stroke(H, R, [[x, y - q * 2], [x - 24, y - 5 - q * 4], [x - 41, y - 1 - q * 6]], q % 2 ? 'coral' : 'sun', 2);
  }
  table(H, R, 7.1, 9.55, 3.72, 1.33, .88, 'paper');
  box(H, R, 7.3, 9.73, 1.44, .81, 1.03, .06, 'teal', .43);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(7.42 + q * .11, 9.82, 1.1), H.p(7.45 + q * .11, 10.4, 1.1)], 'sun', 1.5);
  for (const i of [9.1, 9.56]) {
    const [x, y] = H.p(i, 10.08, 1.04);
    oval(H, R, x, y - 6, 8, 9, 'sun', .6);
    oval(H, R, x, y - 7, 3, 4, 'paper', 1);
  }
  const [sx, sy] = H.p(10.28, 10.12, 1.05);
  for (const dx of [-4, 4]) oval(H, R, sx + dx, sy + 3, 4, 5, 'paper', 1);
  H.line(R, [[sx - 4, sy], [sx + 7, sy - 14], [sx, sy - 4], [sx - 6, sy - 15]], 'blue', 1.2);
  box(H, R, 7.56, 9.73, 1.16, .77, .03, .38, 'coral', .46);
  box(H, R, 9.28, 9.74, 1.05, .8, .03, .59, 'paper', 1);
  for (let q = 0; q < 10; q++) H.line(R, [H.p(9.36 + q * .08, 9.89, .65), H.p(9.7 + q * .08, 10.3, 1.25)], 'sun', 1.5);
  const [rx, ry] = H.p(2.38, 9.3, .05);
  for (const r of [10, 14, 18, 22]) H.outline(R, Array.from({ length: 28 }, (_, q) => [rx + Math.cos(q * TAU / 28) * r, ry + Math.sin(q * TAU / 28) * r * .4]), 'coral', 1.8);
  stroke(H, R, [[rx + 20, ry], [rx + 40, ry + 12], [rx + 52, ry + 8]], 'coral', 1.7);
  for (let q = 0; q < 14; q++) {
    const [x, y] = H.p(2.1 + R() * 5.9, 6.1 + R() * 2.2, .03);
    H.line(R, [[x, y], [x + 6, y - 2]], 'sun', .8);
  }
  box(H, R, 10.77, 1.4, .55, 1.0, .04, .62, 'teal', .48);
  plant(H, R, ...H.p(11.35, 10.87, .02), .8);
  const [cx, cy] = H.p(1.57, 10.72, .04);
  oval(H, R, cx, cy - 9, 10, 11, 'paper', 1);
  oval(H, R, cx, cy - 19, 10, 4, 'blue', .6);
  stroke(H, R, [[cx - 9, cy - 17], [cx - 12, cy - 30], [cx + 10, cy - 30], [cx + 10, cy - 17]], 'blue', .9);
  taiHangDragonDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 14), pull = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - .13) / .67))) ** 2;
  actor(H, R, 6.27, 6.29, t, 'hongKongDragonSupport', { shirt: ['coral', .7], hairStyle: 'short', face: 'nw', prop(h, r, p) {
    const [x, y] = p.nearHand, target = h.p(6.55, 4.25, 1.39);
    stroke(h, r, [target, [target[0] + 2, target[1] + 19 - pull * 5], [x, y]], 'teal', 1.6);
    for (let q = 0; q < 4; q++) stroke(h, r, [[x + q * 2, y], [x + q * 2 - 4, y + 13], [x + q * 2 - 2, y + 23]], 'sun', .85);
  } }, 0, 1.3);
  actor(H, R, 3.2, 5.17, 0, 'hold', { shirt: ['paper', 1], hairStyle: 'short', face: 'se', prop(h, r, p) {
    const [x, y] = p.nearHand;
    for (let q = 0; q < 6; q++) h.line(r, [[x - 13, y - 11 + q * 2], [x + 14, y - 5 + q * 2]], 'sun', 1.1);
    h.line(r, [[x - 2, y - 8], [x - 4, y + 6]], 'teal', 1.4);
  } }, .01, 1.2);
});
room.loopSeconds = 14;
export default room;
