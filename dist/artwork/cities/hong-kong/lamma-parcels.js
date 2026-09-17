import { world, shape, oval, stroke, box, table, bench, actor, cycle, TAU, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -5, head: 15, al: 64, ar: 65, el: 50, er: 51 };
const balance = { ...hold, lean: 8, head: 7, al: 77, ar: 80, el: 27, er: 33 };
FIGURES.clips.hongKongLammaBalance = { dur: 16, keys: [[0, hold], [.15, hold], [.33, balance], [.51, balance], [.65, { ...balance, head: 19 }], [.83, hold], [1, hold]] };
const sit = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 43, ar: 47, el: 75, er: 76, head: 16 };
FIGURES.clips.hongKongLammaWait = { dur: 16, keys: [[0, sit], [.42, sit], [.57, { ...sit, head: -10 }], [.74, { ...sit, head: -10 }], [.88, sit], [1, sit]] };

function carton(H, R, i, j, w, d, z, height, ink = 'sun') {
  box(H, R, i, j, w, d, z, height, ink, .49);
  H.line(R, [H.p(i + w * .5, j, z + height + .01), H.p(i + w * .5, j + d, z + height + .01), H.p(i + w * .5, j + d, z + .03)], 'paper', 2.3);
  H.line(R, [H.p(i + .04, j + d * .52, z + height + .01), H.p(i + w - .04, j + d * .52, z + height + .01)], 'blue', .6, { tone: .55 });
  shape(H, R, H.faceI(i + w * .16, j + d + .025, w * .25, z + height * .27, z + height * .55), 'paper', 1, .4);
}

function crate(H, R, i, j, z = .18) {
  box(H, R, i, j, 1.69, 1.28, z, .76, 'teal', .62);
  shape(H, R, H.tile(i + .1, j + .1, 1.49, 1.08, z + .77), 'blue', .61);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(i + .16 + k * .27, j + 1.3, z + .14), H.p(i + .16 + k * .27, j + 1.3, z + .61)], 'paper', .8, { tone: .61 });
  for (const h of [.28, .49]) H.line(R, [H.p(i + .1, j + 1.3, z + h), H.p(i + 1.59, j + 1.3, z + h)], 'blue', .75);
  H.line(R, [H.p(i + .64, j + 1.3, z + .64), H.p(i + 1.04, j + 1.3, z + .64)], 'blue', 2.5);
}

function bicycle(H, R, i, j) {
  const [x, y] = H.p(i, j, .06);
  for (const dx of [-32, 34]) {
    oval(H, R, x + dx, y, 21, 24, 'paper', 1);
    H.outline(R, ell(x + dx, y, 17, 20), 'blue', .9);
    for (let k = 0; k < 6; k++) {
      const a = k * TAU / 6;
      H.line(R, [[x + dx, y], [x + dx + Math.cos(a) * 18, y + Math.sin(a) * 21]], 'blue', .55, { tone: .62 });
    }
  }
  stroke(H, R, [[x - 32, y], [x - 11, y - 29], [x + 3, y], [x - 32, y], [x + 18, y - 30], [x + 3, y], [x + 34, y]], 'coral', 2.6);
  H.line(R, [[x + 18, y - 30], [x + 34, y], [x + 16, y - 42], [x + 27, y - 44]], 'blue', 1.7);
  H.line(R, [[x - 11, y - 29], [x - 12, y - 39]], 'blue', 1.8);
  H.line(R, [[x - 23, y - 40], [x - 4, y - 38]], 'blue', 3.2);
  H.outline(R, ell(x + 3, y, 6, 6), 'blue', 1);
  stroke(H, R, [[x + 2, y], [x + 10, y + 10], [x + 18, y + 10]], 'blue', 1.5);
  shape(H, R, [[x + 15, y - 45], [x + 39, y - 42], [x + 35, y - 25], [x + 20, y - 28]], 'sun', .52);
  for (let k = 0; k < 5; k++) H.line(R, [[x + 18 + k * 4, y - 41], [x + 21 + k * 3, y - 29]], 'blue', .6);
}

function shelter(H, R) {
  shape(H, R, H.tile(.08, .08, 11.84, 1.72, .025), 'teal', .49);
  for (let k = 0; k < 8; k++) H.line(R, [H.p(.5 + k * 1.39, .66, .04), H.p(1.18 + k * 1.39, .66, .04)], 'paper', .9, { tone: .67 });
  box(H, R, .07, 1.84, 11.86, 10.07, .03, .14, 'paper', .9);
  for (const j of [4.26, 7.26, 10.13]) H.line(R, [H.p(.15, j, .18), H.p(11.81, j, .18)], 'blue', .65, { tone: .25 });
  for (const i of [3.12, 7.01, 10.28]) H.line(R, [H.p(i, 1.93, .18), H.p(i, 11.84, .18)], 'blue', .65, { tone: .25 });
  shape(H, R, H.tile(.22, 1.85, 11.56, .35, .18), 'sun', .62);
  for (let k = 0; k < 15; k++) H.line(R, [H.p(.33 + k * .76, 1.87, .2), H.p(.33 + k * .76, 2.17, .2)], 'blue', .75, { tone: .59 });
  for (const i of [.47, 5.8, 11.29]) {
    box(H, R, i, 2.33, .2, .2, .18, 3.28, 'teal', .65);
    box(H, R, i - .09, 2.24, .38, .38, .17, .19, 'blue', .62);
  }
  shape(H, R, [H.p(.17, 1.83, 3.55), H.p(11.87, 1.83, 3.55), H.p(11.87, 4.2, 3.22), H.p(.17, 4.2, 3.22)], 'paper', 1);
  for (let i = .33; i < 11.8; i += .4) H.line(R, [H.p(i, 1.84, 3.56), H.p(i, 4.18, 3.24)], 'teal', .65, { tone: .62 });
  H.line(R, [H.p(.15, 4.2, 3.21), H.p(11.89, 4.2, 3.21)], 'blue', 3.1);
  stroke(H, R, [H.p(.29, 4.15, 3.2), H.p(.31, 4.3, 2.9), H.p(.31, 4.3, .36), H.p(.57, 4.47, .24)], 'teal', 2.7);
  bench(H, R, .79, 3.56, 3.75, 'teal');
  box(H, R, .79, 3.56, 3.75, .79, .63, .13, 'teal', .49);
  box(H, R, .79, 3.58, 3.75, .12, .75, .67, 'teal', .49);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(.92, 3.74, .83 + k * .18), H.p(4.36, 3.74, .83 + k * .18)], 'paper', .8);
  box(H, R, 8.7, 2.42, .14, 1.3, 1.39, 1.48, 'blue', .58);
  shape(H, R, H.faceJ(8.87, 2.54, 1.06, 1.61, 2.69), 'paper', 1);
  const [mx, my] = H.p(8.9, 3.05, 2.1);
  stroke(H, R, [[mx - 8, my + 13], [mx - 1, my + 1], [mx + 6, my - 5], [mx + 10, my - 18]], 'teal', 2.2);
  for (const [x, y] of [[-8, 13], [-1, 1], [6, -5], [10, -18]]) H.dot(mx + x, my + y, 2.2, 'sun', 1, { knock: true });
  crate(H, R, 9.57, 3.37);
  crate(H, R, 9.57, 3.37, 1.0);
  for (let k = 0; k < 3; k++) carton(H, R, 9.21, 5.27 + k * 1.36, 1.83, 1.14, .18, .71 + k % 2 * .24, k === 1 ? 'coral' : 'sun');
  for (const i of [3.6, 7.4]) for (const j of [5.14, 7.22]) {
    const [x, y] = H.p(i, j, .28);
    oval(H, R, x, y, 7, 9, 'blue', .81);
    H.dot(x, y, 2.1, 'paper', 1, { knock: true });
  }
  box(H, R, 3.34, 4.84, 4.55, 2.73, .49, .17, 'teal', .56);
  for (let j = 5.05; j < 7.5; j += .48) H.line(R, [H.p(3.47, j, .68), H.p(7.76, j, .68)], 'paper', .8);
  for (const i of [3.49, 7.58]) stroke(H, R, [H.p(i, 7.44, .62), H.p(i, 8.21, 1.41), H.p(i, 8.21, 1.89)], 'blue', 2.5);
  H.line(R, [H.p(3.49, 8.21, 1.88), H.p(7.58, 8.21, 1.88)], 'blue', 2.6);
  carton(H, R, 3.58, 5.02, 1.52, 1.03, .69, .94, 'sun');
  carton(H, R, 5.22, 5.04, 2.36, 1.21, .69, .72, 'paper');
  carton(H, R, 6.44, 6.36, 1.07, .94, .69, 1.12, 'coral');
  carton(H, R, 3.64, 5.12, 1.34, .86, 1.66, .58, 'coral');
  const [sx, sy] = H.p(5.85, 5.79, 1.52);
  shape(H, R, [[sx - 16, sy + 5], [sx + 13, sy + 6], [sx + 18, sy - 19], [sx + 6, sy - 32], [sx - 5, sy - 29], [sx - 17, sy - 13]], 'paper', 1);
  stroke(H, R, [[sx - 9, sy - 22], [sx + 5, sy - 17], [sx + 10, sy - 28]], 'teal', 1.2);
  bicycle(H, R, 1.35, 7.23);
  const [rx, ry] = H.p(10.8, 10.5, .2);
  for (let k = 0; k < 4; k++) H.outline(R, ell(rx, ry, 10 + k * 4, 4 + k * 1.6), 'sun', 1.6, { tone: .67 });
  box(H, R, 10.45, 10.95, .43, .41, .18, .69, 'blue', .75);
  box(H, R, 10.24, 10.97, .85, .36, .82, .13, 'blue', .7);
  const [ux, uy] = H.p(4.4, 4.61, .21);
  stroke(H, R, [[ux, uy], [ux, uy - 54], [ux + 5, uy - 62], [ux + 12, uy - 56]], 'blue', 1.5);
  shape(H, R, [[ux - 3, uy], [ux - 8, uy - 42], [ux + 5, uy - 43], [ux + 5, uy - 2]], 'coral', .63);
  shape(H, R, H.tile(4.7, 10.56, 2.3, .71, .2), 'sun', .2);
  for (let k = 0; k < 8; k++) H.dot(...H.p(4.91 + k * .26, 10.86, .22), 1.4, 'blue', .35);
}

const room = world('hong-kong-lamma-parcels', 'Lamma · The last parcel fits', { floor: 'paper', tone: .6, wall: false, head: 20 }, shelter, (H, R, t) => {
  const u = cycle(t, 16);
  H.at(5.21, 8.12, .18, HH => actor(HH, R, 5.21, 8.12, t, 'hongKongLammaBalance', { shirt: ['sun', .61], hairStyle: 'cap', face: 'nw', prop(h, r, p) {
    const x = (p.nearHand[0] + p.farHand[0]) / 2, y = (p.nearHand[1] + p.farHand[1]) / 2;
    shape(h, r, [[x - 24, y - 12], [x + 6, y - 21], [x + 26, y - 9], [x - 5, y + 1]], 'sun', .55);
    shape(h, r, [[x - 24, y - 12], [x - 5, y + 1], [x - 5, y + 20], [x - 24, y + 7]], 'coral', .48);
    shape(h, r, [[x - 5, y + 1], [x + 26, y - 9], [x + 26, y + 10], [x - 5, y + 20]], 'sun', .56);
    h.line(r, [[x - 14, y - 16], [x + 10, y - 4], [x + 10, y + 15]], 'paper', 2.5);
    h.line(r, [p.nearHand, [x - 21, y + 7]], 'coral', 2.5);
    h.line(r, [p.farHand, [x + 24, y + 9]], 'coral', 2.5);
  } }, .18, 1.38));
  H.at(2.47, 4.16, .2, HH => actor(HH, R, 2.47, 4.16, t, 'hongKongLammaWait', { shirt: ['teal', .58], hairStyle: 'pony', face: 'se', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 7, y - 11], [x + 5, y - 8], [x + 5, y + 6], [x - 7, y + 3]], 'blue', .75, .6);
    shape(h, r, [[x - 5, y - 8], [x + 3, y - 6], [x + 3, y + 2], [x - 5, y]], 'paper', .94, .35);
  } }, .2, 1.28));
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(5.2 + k * 2.12, .9, .06);
    stroke(H, R, [[x - 15, y], [x + Math.sin(u * TAU + k) * 3, y - 2], [x + 17, y]], 'paper', .9, .68);
  }
});

room.loopSeconds = 16;
export default room;
