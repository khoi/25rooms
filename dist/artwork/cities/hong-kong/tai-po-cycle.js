import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, satchel, handTool } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const up = { ...rest, al: 57, ar: 55, el: 64, er: 60, lean: -7, head: 9, ll: -9, lr: 13 };
const down = { ...up, drop: .16, lean: -24, al: 39, ar: 39, el: 6, er: 8, head: 17 };
FIGURES.clips.hongKongTyrePump = { dur: 16, keys: [[0, up], [.12, up], [.24, down], [.34, up], [.46, down], [.56, up], [.68, { ...up, head: 24, lean: -10 }], [.83, { ...up, head: 24, lean: -10 }], [1, up]] };

function wheel(H, R, x, y, radius = 22, narrow = .82) {
  oval(H, R, x, y, radius * narrow, radius, 'blue', .83);
  oval(H, R, x, y, radius * narrow - 3, radius - 3, 'paper', 1);
  H.outline(R, ell(x, y, radius * narrow - 5, radius - 5), 'teal', .8, { tone: .52 });
  for (let q = 0; q < 12; q++) {
    const a = q * TAU / 12;
    H.line(R, [[x, y], [x + Math.cos(a) * (radius * narrow - 3), y + Math.sin(a) * (radius - 3)]], 'blue', .65, { tone: .55 });
  }
  oval(H, R, x, y, 2.7, 3, 'sun', .8);
  H.dot(x + radius * narrow * .45, y + radius * .64, 2, 'coral', .85, { knock: true });
}

function bicycle(H, R, i, j, ink = 'coral', size = 1, basket = true) {
  const [x, y] = H.p(i, j, .04), p = (a, b) => [x + a * size, y + b * size];
  wheel(H, R, ...p(-36, -21), 21 * size, .81);
  wheel(H, R, ...p(40, -21), 21 * size, .81);
  const frame = [[-36, -21], [-14, -46], [1, -22], [25, -45], [40, -21], [1, -22], [-36, -21]];
  H.line(R, frame.map(([a, b]) => p(a, b)), 'blue', 3.9 * size);
  H.line(R, frame.map(([a, b]) => p(a, b)), ink, 2.1 * size);
  H.line(R, [p(-14, -46), p(14, -40), p(25, -45)], ink, 3 * size);
  H.line(R, [p(-14, -44), p(-16, -53)], 'blue', 2.3 * size);
  oval(H, R, ...p(-15, -55), 11 * size, 3 * size, 'blue', .75);
  H.line(R, [p(25, -45), p(24, -59), p(31, -63), p(38, -61)], 'blue', 2.4 * size);
  H.outline(R, ell(...p(1, -22), 7 * size, 7 * size), 'blue', 1.1);
  H.line(R, [p(-4, -17), p(7, -27), p(13, -27)], 'blue', 1.6 * size);
  H.line(R, [p(-36, -26), p(-47, -39), p(-23, -44)], 'blue', 1.8 * size);
  H.line(R, [p(-51, -43), p(-21, -43)], 'teal', 3 * size);
  H.line(R, [p(2, -20), p(6, -2)], 'blue', 1.6 * size);
  if (basket) {
    shape(H, R, [p(27, -57), p(51, -57), p(47, -40), p(31, -40)], 'sun', .5, .7);
    for (let q = 0; q < 5; q++) H.line(R, [p(30 + q * 4.5, -56), p(33 + q * 3, -41)], 'blue', .7, { tone: .56 });
    for (const z of [-52, -47, -42]) H.line(R, [p(30, z), p(49, z)], 'blue', .7, { tone: .56 });
  }
}

function bottle(H, R, i, j, z, ink) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 4, y], [x + 4, y], [x + 5, y - 18], [x + 3, y - 23], [x - 3, y - 23], [x - 5, y - 18]], ink, .65, .6);
  H.line(R, [[x - 3, y - 23], [x + 3, y - 23]], 'blue', 2.1);
  H.line(R, [[x - 4, y - 10], [x + 4, y - 10]], 'paper', 2.6);
}

function taiPoCycleDetails(H, R) {
  shelfUnit(H, R, 0.22, 6.98, 2.1, 1.04, 0.04, [0.15, 1.03, 1.89], 'teal');
  for (let n = 0; n < 3; n++) coiledLine(H, R, 0.65 + n * 0.63, 7.49, 0.32, 8, 'blue');
  shallowTray(H, R, 0.4, 7.13, 1.73, 0.73, 1.18, 'sun');
  handTool(H, R, 0.88, 7.45, 1.38, 'spanner', 'coral');
  handTool(H, R, 1.63, 7.51, 1.38, 'brush', 'teal');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 0.67 + n * 0.59, 7.5, 2.04, 6, 19, ['teal', 'sun', 'coral'][n]);
  drawerUnit(H, R, 3.06, 9.93, 2.41, 1.17, 1.06, 4, 'teal');
  shallowTray(H, R, 3.23, 10.09, 1.13, 0.82, 1.23, 'paper');
  for (let n = 0; n < 5; n++)
    oval(H, R, ...H.p(3.44 + (n % 3) * 0.27, 10.32 + Math.floor(n / 3) * 0.32, 1.44), 3, 3, n === 3 ? 'coral' : 'blue', 0.6);
  foldedCloth(H, R, 4.54, 10.11, 0.68, 0.78, 1.23, 'paper', 'coral');
  box(H, R, 7.85, 10.65, 2.61, 0.19, 0.04, 0.15, 'teal', 0.5);
  for (let n = 0; n < 3; n++)
    stroke(
      H,
      R,
      [H.p(8.17 + n * 0.73, 10.65, 0.2), H.p(8.17 + n * 0.73, 10.33, 0.99), H.p(8.52 + n * 0.73, 10.33, 0.99), H.p(8.52 + n * 0.73, 10.65, 0.2)],
      'blue',
      2.3
    );
  satchel(H, R, 10.99, 9.06, 0.05, 'coral', 0.9);
  for (const i of [2.3, 2.62]) box(H, R, i, 0.68, 0.19, 0.55, 1.26, 0.37, 'paper', 0.9);
  for (const i of [2.38, 2.7]) H.dot(...H.p(i, 0.97, 1.65), 2, 'teal');
}

const room = world('hong-kong-tai-po-cycle', 'Tai Po · One more breath of air', { floor: 'paper', tone: .46, wall: false, head: 20 }, (H, R) => {
  shape(H, R, H.faceI(.15, .13, 7.15, .03, 3.47), 'teal', .4);
  shape(H, R, H.faceJ(.12, .15, 5.48, .03, 3.47), 'paper', .94);
  for (let i = .4; i < 7.3; i += .49) H.line(R, [H.p(i, .16, .1), H.p(i, .16, 3.39)], 'blue', .65, { tone: .37 });
  for (const [i, j] of [[.17, .18], [7.24, .18], [.17, 5.65], [7.24, 3.19]]) box(H, R, i, j, .12, .13, .02, 3.67, 'blue', .67);
  const awning = [H.p(.13, .15, 3.77), H.p(7.36, .15, 3.77), H.p(7.36, 3.25, 3.39), H.p(.13, 3.25, 3.39)];
  shape(H, R, awning, 'sun', .48, .85);
  for (let i = .2; i < 7.3; i += .97) shape(H, R, [H.p(i, .16, 3.79), H.p(i + .42, .16, 3.79), H.p(i + .42, 3.25, 3.41), H.p(i, 3.25, 3.41)], 'paper', .95, .3);
  box(H, R, .13, 3.21, 7.23, .09, 3.15, .25, 'teal', .6);
  for (let i = .3; i < 7.2; i += .73) H.line(R, [H.p(i, 3.33, 3.19), H.p(i + .37, 3.33, 3.19)], 'sun', 1.1);
  shape(H, R, H.tile(8.8, .35, 2.82, 10.93, .018), 'teal', .2);
  for (let j = .55; j < 11.2; j += 1.36) H.line(R, [H.p(10.22, j, .026), H.p(10.22, j + .71, .026)], 'paper', 2.2, { tone: .9 });
  for (const i of [8.75, 11.64]) H.line(R, [H.p(i, .4, .025), H.p(i, 11.18, .025)], 'sun', 1.3, { tone: .7 });
  shape(H, R, H.faceI(8.2, .18, 3.57, .3, 2.85), 'paper', 1);
  shape(H, R, [H.p(8.23, .2, .95), H.p(8.67, .2, 1.34), H.p(9.24, .2, 1.28), H.p(9.92, .2, 2.13), H.p(10.53, .2, 1.78), H.p(11.04, .2, 2.05), H.p(11.75, .2, 1.35), H.p(11.75, .2, .47), H.p(8.23, .2, .47)], 'teal', .34, .7);
  for (const j of [.75, 2.05, 3.5]) {
    const [x, y] = H.p(.25, j, 2.43);
    H.line(R, [[x, y - 26], [x, y - 21]], 'blue', 1.5);
    wheel(H, R, x, y, 21, .72);
  }
  box(H, R, 1.13, .45, 4.8, 1.21, .07, 1.03, 'teal', .64);
  box(H, R, 1.06, .39, 4.95, 1.33, 1.11, .12, 'sun', .48);
  for (let q = 0; q < 3; q++) {
    const i = 1.34 + q * 1.42;
    shape(H, R, H.faceI(i, 1.68, 1.22, .2, .92), q === 1 ? 'paper' : 'teal', q === 1 ? .88 : .5, .6);
    H.line(R, [H.p(i + .43, 1.71, .74), H.p(i + .83, 1.71, .74)], 'blue', 1.7);
  }
  shape(H, R, H.faceI(1.58, .23, 4.12, 1.52, 3.1), 'sun', .3);
  for (let i = 1.75; i < 5.65; i += .24) for (let z = 1.7; z < 3.02; z += .23) H.dot(...H.p(i, .25, z), .75, 'blue', .4);
  for (const [i, z, len] of [[1.93, 2.6, .76], [2.66, 2.6, .69], [3.42, 2.6, .88], [4.23, 2.6, .62], [4.93, 2.6, .86]]) {
    H.line(R, [H.p(i, .29, z), H.p(i, .29, z - len)], 'blue', 2);
    const [x, y] = H.p(i, .29, z);
    stroke(H, R, [[x - 4, y - 3], [x - 4, y + 3], [x + 4, y + 3], [x + 4, y - 3]], 'blue', 1.3);
  }
  for (let q = 0; q < 3; q++) bottle(H, R, 1.53 + q * .45, 1.01, 1.26, q % 2 ? 'paper' : 'coral');
  box(H, R, 3.23, .74, 1.15, .59, 1.26, .16, 'blue', .65);
  for (let q = 0; q < 4; q++) box(H, R, 3.3 + q * .26, .79, .19, .44, 1.43, .05, q % 2 ? 'sun' : 'paper', .9);
  oval(H, R, ...H.p(5.09, 1.02, 1.27), 8, 4, 'paper', 1);
  H.line(R, [H.p(4.92, .93, 1.3), H.p(5.37, 1.28, 1.3)], 'teal', 2.7);
  table(H, R, .5, 5.44, 1.62, 1.15, .78, 'coral');
  box(H, R, .61, 5.57, 1.33, .9, .93, .25, 'paper', 1);
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(.79 + q % 2 * .6, 5.76 + Math.floor(q / 2) * .38, 1.22);
    H.outline(R, ell(x, y, 8, 4), 'blue', 2, { tone: .7 });
  }
  bicycle(H, R, 3.0, 3.75, 'teal', .75, false);
  bicycle(H, R, 6.21, 5.56, 'coral', 1.16, true);
  const [hx, hy] = H.p(2.37, 8.48, .1);
  oval(H, R, hx, hy - 12, 15, 12, 'sun', .61);
  shape(H, R, [[hx - 16, hy - 10], [hx + 17, hy - 10], [hx + 12, hy - 1], [hx - 13, hy - 1]], 'sun', .72, .7);
  for (let q = 0; q < 5; q++) H.line(R, [[hx - 9 + q * 4, hy - 19], [hx - 11 + q * 5, hy - 9]], 'blue', 1.4);
  stroke(H, R, [[hx - 12, hy - 3], [hx - 9, hy + 9], [hx + 7, hy + 9], [hx + 13, hy - 3]], 'blue', .9);
  box(H, R, .54, 9.26, 1.48, 1.29, .02, .55, 'teal', .58);
  shape(H, R, H.tile(.65, 9.37, 1.26, 1.07, .59), 'blue', .62);
  for (let q = 0; q < 4; q++) H.outline(R, ell(...H.p(.95 + q % 2 * .61, 9.64 + Math.floor(q / 2) * .57, .6), 10, 6), 'sun', 1.8, { tone: .8 });
  for (let q = 0; q < 7; q++) H.line(R, [H.p(4.05 + q * .35, 10.4, .025), H.p(4.05 + q * .35, 11.14, .025)], 'blue', .9, { tone: .4 });
  bottle(H, R, 7.75, 10.33, .03, 'teal');
  const [px, py] = H.p(7.36, 10.8, .05);
  oval(H, R, px, py - 1, 7, 3, 'coral', .7);
  H.line(R, [[px - 4, py - 2], [px + 4, py - 2]], 'paper', 1.2);
  taiPoCycleDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), [baseX, baseY] = H.p(6.55, 7.67, .02);
  H.at(6.43, 8.18, 0, HH => actor(HH, R, 6.43, 8.18, t, 'hongKongTyrePump', { shirt: ['paper', 1], apron: ['teal', .64], pants: ['blue', .7], hairStyle: 'short', prop(h, r, p) {
    const handX = (p.nearHand[0] + p.farHand[0]) / 2, handY = (p.nearHand[1] + p.farHand[1]) / 2;
    oval(h, r, baseX, baseY, 15, 5, 'blue', .73);
    shape(h, r, [[baseX - 4, baseY - 2], [baseX + 4, baseY - 2], [baseX + 4, baseY - 24], [baseX - 4, baseY - 24]], 'coral', .71, .7);
    h.line(r, [[baseX, baseY - 24], [handX, handY + 1]], 'blue', 2.7);
    h.line(r, [[handX - 13, handY], [handX + 13, handY]], 'blue', 4.2);
    h.line(r, [p.farHand, [handX - 5, handY]], 'coral', 2.1, { tone: .34 });
    h.line(r, [p.nearHand, [handX + 5, handY]], 'coral', 2.1, { tone: .34 });
    const [tx, ty] = h.p(6.21, 5.56, .04);
    stroke(h, r, [[baseX + 3, baseY - 6], [baseX + 33, baseY + 5], [tx + 69, ty + 8], [tx + 55, ty - 6]], 'blue', 1.7);
    oval(h, r, baseX + 8, baseY - 10, 6.5, 6.5, 'paper', 1);
    const angle = -.9 + (u < .56 ? Math.sin(u * Math.PI / .56) * .23 : 0);
    h.line(r, [[baseX + 8, baseY - 10], [baseX + 8 + Math.sin(angle) * 4.5, baseY - 10 - Math.cos(angle) * 4.5]], 'coral', 1.2);
  } }, 0, 1.35));
  H.at(8.93, 4.88, 0, HH => actor(HH, R, 8.93, 4.88, 0, 'hold', { shirt: ['sun', .7], hairStyle: 'pony', face: 'sw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    oval(h, r, x, y + 5, 9, 8, 'teal', .6);
    h.line(r, [[x - 5, y + 1], [x - 2, y + 10]], 'paper', 1.2);
    h.line(r, [[x + 1, y], [x + 4, y + 10]], 'paper', 1.2);
  } }, 0, 1.23));
});
room.loopSeconds = 16;
export default room;
