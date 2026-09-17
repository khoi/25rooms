import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, boundBook, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, windowOn, plant, wallRect, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, al: 54, el: 41, ar: 79, er: 9, head: 12, lean: -7 };
const raised = { ...rest, al: 46, el: 40, ar: 149, er: -9, head: -17, lean: 3 };
FIGURES.clips.hongKongTableCheck = { dur: 22, keys: [[0, ready], [.3, ready], [.4, { ...ready, ar: 48, er: 36, lean: -19, head: 20 }], [.45, ready], [.61, raised], [.67, raised], [.84, ready], [.89, { ...ready, ar: 48, er: 36, lean: -19, head: 20 }], [.94, ready], [1, ready]] };
const childHold = { ...rest, al: 59, el: 38, ar: 66, er: 36, lean: -8, head: 15 };
FIGURES.clips.hongKongStool = { dur: 22, keys: [[0, childHold], [.16, childHold], [.23, { ...childHold, lean: -13, ar: 77, er: 16, al: 68, el: 21 }], [.32, childHold], [.9, childHold], [.96, { ...childHold, lean: -13, ar: 77, er: 16, al: 68, el: 21 }], [1, childHold]] };
const ease = u => (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, u)))) / 2;

function mug(H, R, i, j, z, ink = 'paper', handle = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 6, y], [x + 6, y], [x + 6, y - 13], [x - 6, y - 13]], ink, .87, .6);
  oval(H, R, x, y - 13, 6, 2.5, 'sun', .49);
  stroke(H, R, [[x + 6 * handle, y - 11], [x + 13 * handle, y - 11], [x + 13 * handle, y - 3], [x + 6 * handle, y - 2]], 'blue', 1.2);
}

function kitchen(H, R) {
  box(H, R, .48, .5, 2.51, 6.16, 0, 1.0, 'teal', .5);
  box(H, R, .43, .46, 2.62, 6.23, 1.0, .13, 'paper', .93);
  for (let j = .7; j < 6.5; j += 1.22) {
    H.line(R, [H.p(3.08, j, .09), H.p(3.08, j, .94)], 'blue', .75);
    H.line(R, [H.p(3.1, j + .27, .8), H.p(3.1, j + .64, .8)], 'blue', 1.6);
  }
  shape(H, R, H.tile(.74, 1.13, 1.96, 1.19, 1.16), 'blue', .45);
  shape(H, R, H.tile(.94, 1.32, 1.55, .81, 1.18), 'teal', .29);
  stroke(H, R, [H.p(.85, 1.34, 1.18), H.p(.85, 1.34, 1.9), H.p(1.39, 1.66, 1.9), H.p(1.39, 1.66, 1.73)], 'blue', 2.2);
  const [rx, ry] = H.p(1.7, 3.2, 1.15);
  shape(H, R, [[rx - 18, ry - 26], [rx + 18, ry - 26], [rx + 17, ry], [rx - 16, ry]], 'paper', .9);
  oval(H, R, rx, ry - 26, 18, 8, 'teal', .46);
  oval(H, R, rx, ry - 28, 10, 4, 'paper', 1);
  H.line(R, [[rx - 5, ry - 31], [rx + 5, ry - 31]], 'blue', 2.2);
  shape(H, R, [[rx - 6, ry - 9], [rx + 6, ry - 9], [rx + 6, ry - 3], [rx - 6, ry - 3]], 'teal', .6, .5);
  H.dot(rx + 10, ry - 5, 1.5, 'coral');
  stroke(H, R, [[rx + 18, ry - 4], [rx + 28, ry + 8], [rx + 36, ry - 4]], 'blue', .9);
  const [kx, ky] = H.p(1.51, 4.54, 1.14);
  oval(H, R, kx, ky - 12, 13, 17, 'sun', .64);
  oval(H, R, kx, ky - 25, 8, 3.5, 'paper', .9);
  H.dot(kx, ky - 28, 2.8, 'blue');
  stroke(H, R, [[kx - 10, ky - 23], [kx - 20, ky - 26], [kx - 20, ky - 8], [kx - 11, ky - 6]], 'blue', 2);
  shape(H, R, [[kx + 9, ky - 17], [kx + 22, ky - 26], [kx + 18, ky - 10], [kx + 11, ky - 7]], 'sun', .65);
  mug(H, R, 2.13, 5.18, 1.15, 'coral', 1);
  mug(H, R, 1.29, 5.72, 1.15, 'paper', -1);
  const [bx, by] = H.p(2.35, 4.1, 1.17);
  oval(H, R, bx, by, 14, 5.5, 'paper', 1);
  shape(H, R, [[bx - 13, by - 9], [bx + 13, by - 9], [bx + 9, by], [bx - 9, by]], 'teal', .55);
  oval(H, R, bx, by - 9, 14, 6, 'paper', 1);
  H.dot(bx, by - 14, 2.5, 'coral');
  box(H, R, .09, .74, .67, 2.89, 2.12, 1.22, 'teal', .44);
  for (const j of [1.68, 2.63]) H.line(R, [H.p(.79, j, 2.2), H.p(.79, j, 3.26)], 'blue', .75);
  for (const j of [1.52, 2.44, 3.42]) H.line(R, [H.p(.8, j, 2.57), H.p(.8, j, 2.91)], 'blue', 1.5);
  box(H, R, .34, 4.87, .3, 1.31, 1.87, .84, 'sun', .42);
  const [cx, cy] = H.p(.69, 5.48, 2.83);
  oval(H, R, cx, cy, 4.5, 4, 'paper', 1);
  for (const j of [4.9, 5.24, 5.59, 5.94]) H.line(R, [H.p(.7, j, 1.94), H.p(.7, j, 2.55)], 'blue', .55, { tone: .4 });
  shape(H, R, H.faceJ(3.09, 5.9, .57, .56, 1.12), 'paper', .97);
  for (let j = 5.95; j < 6.45; j += .11) H.line(R, [H.p(3.11, j, .63), H.p(3.11, j, 1.03)], 'teal', .7);
}

function foldingTable(H, R, angle, support) {
  const j = .63, z = .73, length = 1.23, tipJ = j + Math.cos(angle) * length, tipZ = z + Math.sin(angle) * length;
  for (const i of [4.9, 7.91]) {
    H.line(R, [H.p(i, j, z), H.p(i, j, z - .21)], 'blue', 2.5);
    H.dot(...H.p(i, j, z), 2.6, 'sun');
  }
  const supportBase = H.p(7.33, .7, .1);
  const supportTip = H.p(7.33 - (1 - support) * .75, .72 + support * .95, .64);
  stroke(H, R, [H.p(7.33, .7, .64), supportBase, supportTip, H.p(7.33, .7, .64)], 'blue', 3);
  H.line(R, [supportBase, supportTip], 'teal', 1.6);
  const top = [H.p(4.57, j, z), H.p(8.2, j, z), H.p(8.2, tipJ, tipZ), H.p(4.57, tipJ, tipZ)];
  shape(H, R, top, 'sun', .42);
  for (let i = 4.75; i < 8.2; i += .38) H.line(R, [H.p(i, j + Math.cos(angle) * .06, z + Math.sin(angle) * .06 + .02), H.p(i, tipJ, tipZ + .02)], 'coral', .55, { tone: .36 });
  shape(H, R, [H.p(4.57, tipJ, tipZ), H.p(8.2, tipJ, tipZ), H.p(8.2, tipJ, tipZ - .12), H.p(4.57, tipJ, tipZ - .12)], 'coral', .55);
  const patch = [[7.56, length - .16], [8.04, length - .16], [8.04, length], [7.56, length]].map(([i, d]) => H.p(i, j + Math.cos(angle) * d, z + Math.sin(angle) * d + .025));
  shape(H, R, patch, 'paper', .86, .45);
  for (const i of [4.72, 8.05]) H.dot(...H.p(i, tipJ - Math.cos(angle) * .11, tipZ - Math.sin(angle) * .11 + .03), 1, 'blue');
}

function choiHungBreakfastDetails(H, R) {
  drawerUnit(H, R, 10.13, 6.56, 1.35, 1.16, 1.38, 3, 'teal');
  boundBook(H, R, 10.28, 6.75, 0.85, 0.63, 1.57, 'coral');
  const [x, y] = H.p(10.93, 7.34, 1.59);
  oval(H, R, x - 4, y, 5, 3, 'paper', 1);
  oval(H, R, x + 7, y, 5, 3, 'paper', 1);
  H.line(
    R,
    [
      [x, y],
      [x + 3, y]
    ],
    'blue',
    1
  );
  shelfUnit(H, R, 0.16, 10.55, 2.83, 0.67, 0.04, [0.12, 0.83, 1.62], 'sun');
  for (let n = 0; n < 4; n++) boundBook(H, R, 0.38 + n * 0.52, 10.71, 0.42, 0.4, 0.28, ['teal', 'coral', 'blue', 'sun'][n]);
  foldedCloth(H, R, 0.35, 10.7, 0.9, 0.41, 0.99, 'paper', 'teal');
  shallowTray(H, R, 1.55, 10.69, 1.13, 0.4, 0.99, 'coral');
  for (let n = 0; n < 4; n++) oval(H, R, ...H.p(1.74 + n * 0.23, 10.86, 1.19), 3, 3, 'sun', 0.6);
  framedPanel(H, R, 0.51, 10.71, 0.84, 1.78, 0.69, 'teal');
  liddedTin(H, R, 2.33, 10.9, 1.78, 7, 15, 'sun');
  box(H, R, 5.5, 9.38, 1.51, 1.28, 0.05, 0.48, 'sun', 0.42);
  foldedCloth(H, R, 5.59, 9.48, 1.3, 1.02, 0.55, 'coral', 'paper');
  for (const i of [5.65, 6.7]) H.line(R, [H.p(i, 10.69, 0.14), H.p(i, 10.69, 0.44)], 'teal', 1);
  shape(H, R, H.tile(3.49, 10.78, 1.12, 0.55, 0.03), 'teal', 0.26, 0.7);
  for (const i of [3.72, 4.18]) oval(H, R, ...H.p(i, 11.03, 0.07), 8, 4, 'coral', 0.6);
  servicePipe(
    H,
    R,
    [
      [0.1, 6.62, 0.19],
      [0.1, 6.62, 3.47],
      [0.1, 0.12, 3.47],
      [2.6, 0.12, 3.47]
    ],
    'paper',
    2
  );
}

const room = world('hong-kong-choi-hung-breakfast', 'Choi Hung · A table unfolds', { floor: 'paper', tone: .52, wall: 'paper', wallTone: .92, height: 3.85, head: 22 }, (H, R) => {
  for (let k = 0; k < 110; k++) {
    const i = .22 + R() * 11.55, j = .22 + R() * 11.55;
    const [x, y] = H.p(i, j, .015);
    shape(H, R, [[x - 2, y], [x + 1, y - 1.5], [x + 3, y + 1], [x, y + 2]], k % 3 === 0 ? 'coral' : 'teal', .18, .2);
  }
  windowOn(H, R, 'ne', 6.39, 1.62, 4.35, 1.94, { sky: 'sun', skyTone: .11, frameInk: 'teal', inside() {
    for (let k = 0; k < 7; k++) {
      const i = 4.31 + k * .6;
      shape(H, R, wallRect(H, 'ne', i, i + .53, 1.62, 3.54, .08), ['teal', 'coral', 'sun'][k % 3], .21);
      for (let z = 1.9; z < 3.5; z += .42) shape(H, R, wallRect(H, 'ne', i + .13, i + .41, z, z + .22, .09), 'paper', .89, .3);
    }
    for (const i of [4.69, 5.4, 6.1, 6.8, 7.51, 8.11]) H.line(R, [H.p(i, -.11, 1.65), H.p(i, -.11, 3.54)], 'blue', 1.1);
    for (const z of [2.12, 2.81]) H.line(R, [H.p(4.25, -.12, z), H.p(8.55, -.12, z)], 'blue', 1.1);
  } });
  H.tint(H.tile(4.6, 3.44, 4.8, 3.73, .03), 'sun', .11);
  for (const i of [4.9, 5.64, 6.36, 7.1]) H.line(R, [H.p(i, 3.44, .04), H.p(i + 2.2, 7.1, .04)], 'teal', 1.7, { tone: .14 });
  kitchen(H, R);
  box(H, R, 10.3, .34, 1.32, 1.27, .02, 3.23, 'teal', .52);
  for (const z of [.8, 1.5, 2.15]) H.line(R, [H.p(10.39, 1.64, z), H.p(11.49, 1.64, z)], 'blue', .8);
  for (const [i, z] of [[10.48, .53], [11.06, .53], [10.48, 1.21], [11.06, 1.21], [10.72, 2.7]]) H.line(R, [H.p(i, 1.66, z), H.p(i + .24, 1.66, z)], 'paper', 1.5);
  for (let k = 0; k < 2; k++) box(H, R, 10.42 + k * .58, .47, .49, 1.0, 3.28, .34, ['sun', 'coral'][k], .57);
  box(H, R, .5, 8.05, 2.33, 1.18, 0, .87, 'sun', .48);
  for (const z of [.29, .58]) box(H, R, .49, 8.04, 2.35, 1.2, z, .07, 'paper', .82);
  for (let k = 0; k < 6; k++) {
    const [x, y] = H.p(.81 + k % 3 * .66, 8.73, .13 + Math.floor(k / 3) * .3);
    oval(H, R, x, y - 3, 9, 4, k % 2 ? 'blue' : 'coral', .68);
    H.line(R, [[x - 4, y - 5], [x + 4, y - 4]], 'paper', .8);
  }
  const [ux, uy] = H.p(.92, 10.2, .04);
  oval(H, R, ux, uy, 14, 6, 'teal', .62);
  for (const [a, ink] of [[-5, 'coral'], [5, 'blue']]) {
    stroke(H, R, [[ux + a, uy - 3], [ux + a + 1, uy - 49], [ux + a + 10, uy - 54], [ux + a + 11, uy - 47]], ink, 2.5);
    shape(H, R, [[ux + a - 3, uy - 7], [ux + a + 5, uy - 7], [ux + a + 2, uy - 41]], ink, .6, .5);
  }
  const [bx, by] = H.p(4.02, 8.79, .08);
  shape(H, R, [[bx - 15, by], [bx + 15, by], [bx + 14, by - 32], [bx + 9, by - 40], [bx - 9, by - 40], [bx - 15, by - 30]], 'teal', .69);
  stroke(H, R, [[bx - 8, by - 38], [bx - 7, by - 47], [bx + 7, by - 47], [bx + 8, by - 38]], 'coral', 2);
  shape(H, R, [[bx - 10, by - 5], [bx + 10, by - 5], [bx + 10, by - 18], [bx - 10, by - 18]], 'sun', .58, .5);
  H.line(R, [[bx - 10, by - 19], [bx + 10, by - 19]], 'paper', 1);
  shape(H, R, wallRect(H, 'nw', 7.08, 8.47, 2.0, 3.08), 'paper', .96);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) shape(H, R, wallRect(H, 'nw', 7.19 + col * .29, 7.39 + col * .29, 2.12 + row * .22, 2.26 + row * .22, .05), row === 2 ? 'coral' : 'teal', .22, .3);
  box(H, R, 10.25, 5.01, 1.0, .9, .03, 1.29, 'paper', .88);
  const [fx, fy] = H.p(10.75, 5.43, 1.88);
  H.line(R, [H.p(10.75, 5.43, 1.34), [fx, fy]], 'blue', 2.5);
  oval(H, R, fx, fy, 20, 22, 'paper', .72);
  for (const r of [8, 14, 20]) H.outline(R, ell(fx, fy, r, r * 1.1), 'blue', .65);
  for (let n = 0; n < 8; n++) H.line(R, [[fx, fy], [fx + Math.cos(n * TAU / 8) * 20, fy + Math.sin(n * TAU / 8) * 22]], 'teal', .75);
  H.dot(fx, fy, 4, 'sun');
  plant(H, R, ...H.p(9.25, .49, 1.3), .85);
  table(H, R, 8.96, 9.35, 2.16, 1.27, .51, 'paper');
  for (let k = 0; k < 3; k++) box(H, R, 9.16, 9.55, 1.3, .82, .67 + k * .08, .05, ['coral', 'paper', 'teal'][k], .54);
  choiHungBreakfastDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 22);
  const stool = u < .17 ? 0 : u < .31 ? ease((u - .17) / .14) : u < .91 ? 1 : 1 - ease((u - .91) / .09);
  const folded = u < .44 ? 0 : u < .61 ? ease((u - .44) / .17) : u < .67 ? 1 : u < .84 ? 1 - ease((u - .67) / .17) : 0;
  const support = u < .31 ? 1 : u < .42 ? 1 - ease((u - .31) / .11) : u < .84 ? 0 : u < .92 ? ease((u - .84) / .08) : 1;
  H.at(6.4, 2.4, 0, HH => foldingTable(HH, R, folded * Math.PI / 2, support));
  const edgeJ = .63 + Math.cos(folded * Math.PI / 2) * 1.23, edgeZ = .73 + Math.sin(folded * Math.PI / 2) * 1.23;
  H.at(8.7, edgeJ + .14, 0, HH => actor(HH, R, 8.7, edgeJ + .14, u * 22, 'hongKongTableCheck', { shirt: ['coral', .66], pants: ['blue', .65], hairStyle: 'short', face: 'sw', prop: (h, r, p) => {
    const contact = h.p(8.15, edgeJ, edgeZ + .02);
    stroke(h, r, [p.nearHand, contact], 'coral', 3.6);
    oval(h, r, ...contact, 2.4, 1.8, 'coral', .3);
  } }, 0, 1.38));
  const j = 2.43 + stool * 1.7;
  H.at(5.72, j, 0, HH => {
    const i = 5.21;
    for (const side of [0, .75]) {
      stroke(HH, R, [HH.p(i + side, j, .02), HH.p(i + side, j + .75, .58)], 'blue', 2.2);
      stroke(HH, R, [HH.p(i + side, j + .75, .02), HH.p(i + side, j, .58)], 'blue', 2.2);
      HH.dot(...HH.p(i + side, j + .38, .29), 2, 'sun');
    }
    box(HH, R, i - .07, j - .08, .93, .93, .58, .12, 'coral', .75);
    shape(HH, R, HH.tile(i + .19, j + .22, .41, .2, .72), 'blue', .67, .4);
  });
  H.at(5.63, j + 1.1, 0, HH => actor(HH, R, 5.63, j + 1.1, u * 22, 'hongKongStool', { shirt: ['sun', .66], pants: ['teal', .72], hairStyle: 'short', face: 'nw' }, 0, 1.3, 'child'));
});
room.loopSeconds = 22;
export default room;
