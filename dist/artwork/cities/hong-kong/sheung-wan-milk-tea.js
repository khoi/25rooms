import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, boundBook, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, windowOn, steam, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const pourRight = { ...rest, al: -42, el: -35, ar: 143, er: -9, head: 13, lean: -3 };
const lowered = { ...rest, al: -48, el: -45, ar: 48, er: 45, head: 8 };
const pourLeft = { ...rest, al: -143, el: 9, ar: 42, er: 35, head: 13, lean: 3 };
FIGURES.clips.hongKongTeaTransfer = { dur: 18, keys: [[0, pourRight], [.2, pourRight], [.31, lowered], [.38, lowered], [.49, pourLeft], [.69, pourLeft], [.8, lowered], [.88, lowered], [1, pourRight]] };

function cup(H, R, x, y, ink = 'paper', s = 1) {
  oval(H, R, x, y + 2 * s, 9 * s, 3 * s, 'paper', 1);
  shape(H, R, [[x - 6 * s, y - 11 * s], [x + 6 * s, y - 11 * s], [x + 5 * s, y], [x - 5 * s, y]], ink, .85, .65);
  oval(H, R, x, y - 11 * s, 6 * s, 2.5 * s, 'blue', .38);
  stroke(H, R, [[x + 6 * s, y - 9 * s], [x + 11 * s, y - 10 * s], [x + 11 * s, y - 3 * s], [x + 6 * s, y - 2 * s]], 'blue', .9);
}

function pot(H, R, x, y, direction, filter, tea, tilt = 0) {
  const p = (a, b) => [x + a * Math.cos(tilt) - b * Math.sin(tilt), y + a * Math.sin(tilt) + b * Math.cos(tilt)];
  shape(H, R, [p(-11, 0), p(11, 0), p(9, -23), p(-9, -23)], 'paper', 1);
  shape(H, R, [p(direction * 8, -19), p(direction * 24, -23), p(direction * 16, -8), p(direction * 10, -6)], 'paper', .9);
  stroke(H, R, [p(-direction * 10, -20), p(-direction * 20, -19), p(-direction * 21, -7), p(-direction * 10, -5)], 'blue', 2.1);
  H.line(R, [p(-6, -19), p(-5, -4)], 'teal', 1.3, { tone: .55 });
  oval(H, R, ...p(0, -23), 9, 3.5, tea ? 'sun' : 'blue', tea ? .58 : .25);
  if (filter) {
    const [fx, fy] = p(0, -24);
    shape(H, R, [[fx - 8, fy], [fx + 8, fy], [fx + 5, fy + 16], [fx - 2, fy + 19], [fx - 6, fy + 12]], 'coral', .43, .65);
    for (const a of [-4, 0, 4]) H.line(R, [[fx + a, fy + 2], [fx + a * .45, fy + 14]], 'blue', .55, { tone: .35 });
    oval(H, R, fx, fy, 10, 3, 'paper', .88);
    oval(H, R, fx, fy, 7, 1.6, 'sun', .62);
    H.line(R, [[fx - 15, fy], [fx - 9, fy], [fx + 9, fy], [fx + 15, fy]], 'blue', 1.5);
  }
  return { spout: p(direction * 24, -23), mouth: p(0, -26) };
}

function wetCounter(H, R) {
  box(H, R, .48, .45, 10.96, 1.9, 0, 1.13, 'teal', .42);
  box(H, R, .45, .43, 11.02, 1.96, 1.13, .13, 'paper', .95);
  box(H, R, .46, 2.37, 1.71, 5.95, 0, 1.12, 'teal', .42);
  box(H, R, .43, 2.34, 1.77, 6.0, 1.12, .14, 'paper', .95);
  for (const i of [1.1, 3.9, 7.1, 9.95]) {
    H.line(R, [H.p(i, 2.41, .22), H.p(i, 2.41, .94)], 'blue', .7);
    H.line(R, [H.p(i + .2, 2.43, .91), H.p(i + .64, 2.43, .91)], 'blue', 1.6);
  }
  for (const j of [3.05, 4.97, 6.9]) {
    H.line(R, [H.p(2.23, j, .15), H.p(2.23, j, .99)], 'blue', .7);
    H.line(R, [H.p(2.25, j + .2, .91), H.p(2.25, j + .6, .91)], 'blue', 1.7);
  }
  shape(H, R, H.tile(.72, 2.9, 1.17, 1.65, 1.29), 'blue', .58);
  shape(H, R, H.tile(.87, 3.08, .9, 1.29, 1.31), 'teal', .37);
  const [sx, sy] = H.p(1.26, 3.74, 1.34);
  oval(H, R, sx, sy, 5, 2.4, 'blue', .8);
  stroke(H, R, [H.p(.79, 3.1, 1.31), H.p(.79, 3.1, 1.99), H.p(1.15, 3.42, 1.99), H.p(1.15, 3.42, 1.8)], 'blue', 2.5);
  H.line(R, [H.p(.64, 3.01, 1.48), H.p(.96, 3.01, 1.48)], 'coral', 2);
  box(H, R, .67, 5.12, 1.23, 1.45, 1.29, .09, 'teal', .5);
  for (let j = 5.24; j < 6.52; j += .16) H.line(R, [H.p(.73, j, 1.4), H.p(1.81, j, 1.4)], 'blue', 1);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(1.15, 5.35 + k * .23, 1.49);
    oval(H, R, x, y, 9, 11, 'paper', .96);
    oval(H, R, x, y, 5.6, 7, 'teal', .23);
  }
  box(H, R, 3.24, 1.05, 3.33, 1.09, 1.28, .1, 'blue', .55);
  for (let i = 3.35; i < 6.51; i += .19) H.line(R, [H.p(i, 1.14, 1.41), H.p(i, 2.08, 1.41)], 'paper', .7);
  for (const i of [3.81, 5.51]) {
    const [x, y] = H.p(i, 1.48, 1.45);
    oval(H, R, x, y, 14, 6, 'blue', .8);
    oval(H, R, x, y, 9, 3.5, 'coral', .63);
  }
  const [kx, ky] = H.p(2.51, 1.12, 1.29);
  oval(H, R, kx, ky - 11, 15, 16, 'paper', .9);
  oval(H, R, kx, ky - 24, 10, 4, 'teal', .57);
  H.dot(kx, ky - 28, 3, 'blue');
  stroke(H, R, [[kx - 10, ky - 21], [kx - 16, ky - 39], [kx + 12, ky - 39], [kx + 13, ky - 22]], 'blue', 2.1);
  shape(H, R, [[kx + 12, ky - 15], [kx + 25, ky - 27], [kx + 24, ky - 17], [kx + 12, ky - 6]], 'paper', .9);
  for (const [i, j, ink] of [[7.07, .76, 'sun'], [7.96, .76, 'coral'], [8.85, .76, 'teal']]) {
    box(H, R, i, j, .65, .61, 1.29, .74, ink, .53);
    box(H, R, i - .03, j - .03, .71, .67, 2.03, .08, 'paper', .92);
    shape(H, R, H.faceI(i + .14, j + .63, .36, 1.54, 1.78), 'paper', .82);
  }
  for (let k = 0; k < 3; k++) cup(H, R, ...H.p(9.72 + k * .53, 1.44, 1.3), k === 1 ? 'sun' : 'paper', .88);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(10.28, .86, 1.34 + k * .14);
    oval(H, R, x, y, 12, 4.5, 'paper', 1);
    H.line(R, [[x - 10, y - 1], [x + 10, y - 1]], 'teal', .5);
  }
  const [mx, my] = H.p(8.21, 1.83, 1.29);
  shape(H, R, [[mx - 8, my], [mx + 8, my], [mx + 8, my - 23], [mx + 3, my - 27], [mx - 7, my - 26]], 'paper', .97);
  oval(H, R, mx, my - 24, 7, 2.5, 'blue', .2);
  stroke(H, R, [[mx + 8, my - 20], [mx + 17, my - 20], [mx + 17, my - 6], [mx + 9, my - 4]], 'blue', 1.4);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(9.35, 1.9 + k * .09, 1.3);
    H.line(R, [[x, y], [x + 20, y - 8]], 'blue', 1.2);
    oval(H, R, x + 21, y - 9, 3.5, 2, 'paper', .8);
  }
  box(H, R, .65, 7.25, 1.2, .72, 1.29, .11, 'sun', .43);
  for (let j = 7.31; j < 7.92; j += .1) H.line(R, [H.p(.68, j, 1.42), H.p(1.81, j, 1.42)], 'paper', .8);
  const [tx, ty] = H.p(7.08, .39, 2.55);
  oval(H, R, tx, ty, 12, 12, 'paper', 1);
  for (let k = 0; k < 8; k++) H.dot(tx + Math.cos(k * TAU / 8) * 9, ty + Math.sin(k * TAU / 8) * 9, .8, 'blue');
  H.line(R, [[tx - 5, ty + 1], [tx, ty], [tx + 1, ty - 7]], 'blue', 1.2);
}

function sheungWanMilkTeaDetails(H, R) {
  shelfUnit(H, R, 0.26, 7.0, 1.48, 0.75, 1.77, [0, 0.65, 1.3], 'teal');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 0.56 + n * 0.39, 7.31, 1.9, 6, 17, ['sun', 'coral', 'teal'][n]);
  foldedCloth(H, R, 0.44, 7.14, 0.98, 0.43, 2.56, 'paper', 'coral');
  shallowTray(H, R, 0.43, 7.16, 1.08, 0.42, 3.2, 'paper');
  for (let n = 0; n < 3; n++) H.line(R, [H.p(0.62 + n * 0.29, 7.27, 3.3), H.p(0.69 + n * 0.29, 7.41, 3.65)], 'sun', 2);
  drawerUnit(H, R, 9.03, 6.9, 2.08, 1.03, 1.13, 3, 'teal');
  shallowTray(H, R, 9.14, 7.03, 0.9, 0.67, 1.3, 'paper');
  for (let n = 0; n < 6; n++) oval(H, R, ...H.p(9.32 + (n % 3) * 0.25, 7.2 + Math.floor(n / 3) * 0.27, 1.42), 4, 3, 'sun', 0.65);
  boundBook(H, R, 10.2, 7.07, 0.64, 0.6, 1.29, 'blue');
  const [x, y] = H.p(10.51, 7.35, 1.51);
  H.line(
    R,
    [
      [x - 4, y - 4],
      [x + 8, y + 3]
    ],
    'coral',
    1.5
  );
  servicePipe(
    H,
    R,
    [
      [0.19, 8.62, 0.2],
      [0.19, 8.62, 2.22],
      [0.19, 9.7, 2.22]
    ],
    'teal',
    2.6
  );
  shape(H, R, H.faceJ(0.23, 9.3, 0.85, 1.0, 1.76), 'paper', 1, 0.6);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(0.25, 9.39 + n * 0.19, 1.1), H.p(0.25, 9.39 + n * 0.19, 1.63)], 'coral', 0.8);
  box(H, R, 3.6, 9.1, 1.72, 0.27, 0.02, 0.08, 'sun', 0.4);
  for (const i of [3.8, 4.35, 4.91]) H.line(R, [H.p(i, 9.08, 0.12), H.p(i, 9.38, 0.12)], 'blue', 0.7);
  const [cx, cy] = H.p(7.09, 1.85, 1.3);
  oval(H, R, cx, cy, 7, 3, 'paper', 1);
  H.line(
    R,
    [
      [cx - 4, cy],
      [cx + 5, cy - 13]
    ],
    'sun',
    2
  );
}

const room = world('hong-kong-sheung-wan-milk-tea', 'Sheung Wan · The long pour', { floor: 'paper', tone: .67, wall: 'paper', wallTone: .88, height: 3.75, wallStyle: 'tile', pattern: 'tiles', accent: 'teal', head: 22 }, (H, R) => {
  shape(H, R, wallRect(H, 'nw', .5, 4.0, 2.12, 3.38), 'blue', .28);
  for (let z = 2.2; z < 3.35; z += .16) H.line(R, [H.p(.04, .61, z), H.p(.04, 3.89, z)], 'paper', 2);
  windowOn(H, R, 'ne', 9.41, 1.72, 4.4, 1.6, { sky: 'sun', skyTone: .12, frameInk: 'teal', inside() {
    shape(H, R, wallRect(H, 'ne', 7.25, 11.55, 1.74, 2.25, .07), 'coral', .58);
    for (let i = 7.4; i < 11.5; i += .53) H.line(R, [H.p(i, -.08, 1.82), H.p(i, -.08, 2.18)], 'paper', .7);
    cup(H, R, ...H.p(9.65, -.08, 2.18), 'paper', .7);
  } });
  box(H, R, 2.98, .23, 3.83, .82, 3.03, .44, 'teal', .49);
  shape(H, R, [H.p(3.04, .33, 3.03), H.p(6.75, .33, 3.03), H.p(6.75, 1.26, 2.7), H.p(3.04, 1.26, 2.7)], 'paper', .82);
  for (let i = 3.24; i < 6.7; i += .21) H.line(R, [H.p(i, .45, 3.0), H.p(i, 1.19, 2.77)], 'blue', .6);
  wetCounter(H, R);
  shape(H, R, H.tile(3.41, 3.36, 4.85, 4.4, .035), 'blue', .52);
  for (let i = 3.51; i < 8.25; i += .19) H.line(R, [H.p(i, 3.43, .05), H.p(i, 7.68, .05)], 'teal', .8);
  table(H, R, 8.75, 4.34, 2.6, 1.22, .79, 'paper');
  box(H, R, 8.9, 4.55, 1.07, .69, .94, .34, 'sun', .45);
  box(H, R, 8.87, 4.53, 1.13, .73, 1.28, .07, 'paper', .9);
  for (let k = 0; k < 3; k++) cup(H, R, ...H.p(10.35 + k * .4, 4.89, .95), 'paper', .74);
  table(H, R, 9.58, 8.53, 1.13, 1.12, .52, 'coral');
  box(H, R, .64, 9.24, 1.29, 1.23, .01, .67, 'teal', .53);
  shape(H, R, H.tile(.75, 9.34, 1.07, 1.02, .7), 'blue', .67);
  for (let k = 0; k < 4; k++) box(H, R, .77, 9.36, 1.04, .98, .72 + k * .1, .065, 'paper', .93);
  const [sx, sy] = H.p(2.57, 8.94, .04);
  shape(H, R, [[sx - 10, sy], [sx + 10, sy], [sx + 12, sy - 22], [sx - 12, sy - 22]], 'teal', .55);
  oval(H, R, sx, sy - 22, 12, 4, 'paper', .8);
  shape(H, R, H.tile(3.16, 9.76, 4.69, .25, .04), 'blue', .72);
  for (let i = 3.24; i < 7.8; i += .18) H.line(R, [H.p(i, 9.77, .05), H.p(i, 10.0, .05)], 'paper', .7);
  sheungWanMilkTeaDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 18);
  H.at(5.6, 6.1, 0, HH => actor(HH, R, 5.6, 6.1, u * 18, 'hongKongTeaTransfer', { shirt: ['paper', 1], pants: ['blue', .73], apron: ['teal', .73], hairStyle: 'short', prop: (h, r, p) => {
    const rightPour = u < .24 || u > .94;
    const leftPour = u > .47 && u < .73;
    const right = pot(h, r, p.nearHand[0] + 8, p.nearHand[1] + 6, -1, false, true, rightPour ? -.1 : 0);
    const left = pot(h, r, p.farHand[0] - 8, p.farHand[1] + 6, 1, true, true, leftPour ? .1 : 0);
    const source = rightPour ? right : left;
    const target = rightPour ? left : right;
    if (rightPour || leftPour) {
      const [sx, sy] = source.spout, [ex, ey] = target.mouth;
      stroke(h, r, [[sx, sy], [(sx + ex) / 2, (sy + ey) / 2 + 3], [ex, ey]], 'sun', 2.4);
      h.line(r, [[sx, sy + 1], [ex, ey + 1]], 'coral', .7, { tone: .5 });
    }
  } }, 0, 1.52));
  H.at(9.9, 6.36, 0, HH => actor(HH, R, 9.9, 6.36, u * 3, 'hold', { shirt: ['sun', .55], hairStyle: 'bun', prop: (h, r, p) => cup(h, r, p.nearHand[0], p.nearHand[1] + 3, 'paper', .7) }, 0, 1.16));
  steam(H, R, ...H.p(4.44, 4.64, 1.79), u * 10, 2, 'paper');
});
room.loopSeconds = 18;
export default room;
