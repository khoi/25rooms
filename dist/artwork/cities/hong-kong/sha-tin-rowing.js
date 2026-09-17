import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, al: 49, ar: 57, el: 36, er: 44, head: 8, lean: -5 };
FIGURES.clips.hongKongOarInspect = { dur: 16, keys: [[0, hold], [.13, hold], [.27, { ...hold, al: 69, ar: 78, el: 56, er: 58, lean: -2, head: 0 }], [.43, { ...hold, al: 70, ar: 79, el: 59, er: 61, head: -10 }], [.58, { ...hold, al: 70, ar: 78, el: 57, er: 61, head: 10 }], [.75, hold], [1, hold]] };

function shell(H, R, i, j, length, z, ink) {
  const hull = [];
  for (let q = 0; q <= 16; q++) {
    const f = q / 16;
    hull.push(H.p(i + Math.sin(f * Math.PI) * .48, j + f * length, z));
  }
  for (let q = 16; q >= 0; q--) {
    const f = q / 16;
    hull.push(H.p(i - Math.sin(f * Math.PI) * .48, j + f * length, z));
  }
  const lower = hull.map(([x, y]) => [x, y + 5]);
  shape(H, R, lower, 'blue', .43, .8);
  shape(H, R, hull, ink, .68, .8);
  H.line(R, [H.p(i, j + .18, z + .01), H.p(i, j + length - .18, z + .01)], 'paper', 1.2, { tone: .8 });
  for (const q of [.28, .49, .7]) {
    const opening = [];
    for (let k = 0; k < 24; k++) {
      const a = k * TAU / 24;
      opening.push(H.p(i + Math.cos(a) * .22, j + q * length + Math.sin(a) * .49, z + .03));
    }
    shape(H, R, opening, 'blue', .67, .6);
    box(H, R, i - .17, j + q * length -.15, .34, .28, z + .06, .04, 'paper', .85);
    for (const sign of [-1, 1]) {
      H.line(R, [H.p(i + sign * .31, j + q * length, z), H.p(i + sign * .82, j + q * length - .25, z + .09), H.p(i + sign * .32, j + q * length - .36, z)], 'blue', .9);
      oval(H, R, ...H.p(i + sign * .82, j + q * length - .25, z + .13), 2.6, 2, 'sun', .9);
    }
  }
}

function oar(H, R, x, y, angle, roll = 0, ink = 'coral', size = 1) {
  const c = Math.cos(angle), s = Math.sin(angle);
  const p = (a, b) => [x + (a * c - b * s) * size, y + (a * s + b * c) * size];
  H.line(R, [p(-79, 0), p(71, 0)], 'blue', 2.5);
  H.line(R, [p(-76, -.4), p(69, -.4)], 'sun', 1.05, { tone: .7 });
  H.line(R, [p(-81, 0), p(-60, 0)], 'teal', 4.5);
  H.line(R, [p(3, 0), p(13, 0)], 'paper', 5.2);
  H.line(R, [p(11, 0), p(15, 0)], 'teal', 6.4);
  const width = 6 + roll * 4;
  shape(H, R, [p(68, -3), p(82, -width), p(104, -width - 1), p(105, width), p(82, width), p(69, 3)], ink, .78, .7);
  shape(H, R, [p(88, -width), p(95, -width), p(96, width), p(89, width)], 'paper', 1, .4);
}

function trestle(H, R, i, j, z = .87) {
  for (const a of [-.38, .38]) H.line(R, [H.p(i + a, j, .03), H.p(i, j, z)], 'blue', 2.3);
  H.line(R, [H.p(i - .43, j, z), H.p(i + .43, j, z)], 'teal', 3.8);
  H.line(R, [H.p(i - .3, j, .2), H.p(i + .3, j, .2)], 'blue', 1.4);
  H.line(R, [H.p(i - .31, j, z + .04), H.p(i - .27, j, z - .08), H.p(i + .27, j, z - .08), H.p(i + .31, j, z + .04)], 'sun', 1.2);
}

function shaTinRowingDetails(H, R) {
  shelfUnit(H, R, 8.22, 0.41, 3.1, 1.04, 0.04, [0.13, 1.0, 1.87], 'teal');
  for (let n = 0; n < 3; n++) satchel(H, R, 8.76 + n * 0.93, 0.89, 0.32, ['sun', 'coral', 'blue'][n], 0.66);
  foldedCloth(H, R, 8.43, 0.54, 1.11, 0.74, 1.15, 'paper', 'teal');
  shallowTray(H, R, 9.81, 0.55, 1.24, 0.75, 1.15, 'paper');
  handTool(H, R, 10.29, 0.94, 1.35, 'spanner', 'coral');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 8.78 + n * 0.89, 0.87, 2.02, 6, 18, ['teal', 'sun', 'paper'][n]);
  drawerUnit(H, R, 1.76, 9.67, 2.69, 1.52, 1.0, 3, 'sun');
  shallowTray(H, R, 1.91, 9.82, 2.34, 1.14, 1.17, 'teal');
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(2.23 + n * 0.54, 10.29, 1.39);
    oval(H, R, x, y, 6, 5, n === 2 ? 'teal' : 'blue', 0.6);
    oval(H, R, x, y, 3, 2, 'paper', 1);
    H.line(
      R,
      [
        [x, y - 4],
        [x + 3, y - 16]
      ],
      'sun',
      2
    );
  }
  boundBook(H, R, 6.52, 1.52, 1.07, 0.76, 0.06, 'teal');
  coiledLine(H, R, 7.31, 10.73, 0.04, 18, 'coral');
  slattedCrate(H, R, 8.2, 9.48, 1.44, 1.31, 0.04, 0.54, 'teal');
  for (let n = 0; n < 3; n++) foldedCloth(H, R, 8.35, 9.61, 1.1, 0.97, 0.61 + n * 0.12, 'paper', 'blue');
  servicePipe(
    H,
    R,
    [
      [11.66, 7.78, 0.16],
      [11.66, 7.78, 1.63],
      [11.23, 7.78, 1.63]
    ],
    'teal',
    2.5
  );
}

const room = world('hong-kong-sha-tin-rowing', 'Sha Tin · Oars in parallel', { floor: 'paper', tone: .58, wall: 'teal', wallTone: .22, height: 3.7, head: 20 }, (H, R) => {
  shape(H, R, wallRect(H, 'ne', 6.48, 11.71, .28, 3.43, .04), 'paper', 1);
  shape(H, R, wallRect(H, 'ne', 6.66, 11.55, .41, 3.26, .06), 'teal', .14);
  shape(H, R, wallRect(H, 'ne', 6.69, 11.52, .45, 1.31, .08), 'teal', .36);
  const hills = [[6.66, 1.4], [7.31, 1.83], [7.98, 1.64], [8.66, 2.16], [9.32, 1.92], [9.87, 2.23], [10.67, 1.89], [11.55, 1.55], [11.55, 1.21], [6.66, 1.21]].map(([i, z]) => H.p(i, .09, z));
  shape(H, R, hills, 'blue', .21, .6);
  for (let i = 6.86; i < 11.5; i += .58) H.line(R, [H.p(i, .1, .6), H.p(i + .32, .1, .6)], 'paper', .9);
  H.line(R, [H.p(6.64, .12, 1.12), H.p(11.55, .12, 1.12)], 'sun', 1.8);
  for (const i of [6.65, 9.16, 11.55]) H.line(R, [H.p(i, .12, .4), H.p(i, .12, 3.29)], 'paper', 3.2);
  for (const j of [.76, 4.84, 9.0]) {
    box(H, R, .64, j, .16, .15, .05, 3.35, 'blue', .62);
    for (const z of [1.04, 2.09, 3.09]) {
      H.line(R, [H.p(.68, j, z), H.p(2.48, j, z)], 'blue', 2.5);
      H.line(R, [H.p(.7, j, z - .54), H.p(2.25, j, z)], 'teal', 1.9);
      H.line(R, [H.p(1.0, j, z + .03), H.p(2.33, j, z + .03)], 'sun', 3);
    }
  }
  shell(H, R, 1.68, .46, 9.53, 3.15, 'sun');
  shell(H, R, 1.7, .46, 9.53, 2.15, 'paper');
  shell(H, R, 1.69, .47, 9.52, 1.1, 'coral');
  box(H, R, 3.43, .3, 2.45, .56, .03, 1.32, 'paper', .88);
  for (let q = 0; q < 3; q++) {
    const i = 3.54 + q * .76;
    shape(H, R, H.faceI(i, .89, .67, .14, 1.19), q === 1 ? 'teal' : 'paper', q === 1 ? .4 : 1, .6);
    H.dot(...H.p(i + .51, .91, .75), 1.8, 'blue', .8);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(i + .12, .92, 1.03 - n * .1), H.p(i + .53, .92, 1.03 - n * .1)], 'blue', .6);
  }
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(3.89 + q * .7, .59, 1.37);
    oval(H, R, x, y - 5, 7, 6, q === 1 ? 'teal' : 'coral', .65);
    oval(H, R, x, y - 9, 6, 2.5, 'paper', .8);
  }
  table(H, R, 3.76, 1.52, 1.93, .97, .8, 'sun');
  for (let q = 0; q < 3; q++) box(H, R, 3.93, 1.65 + q * .25, .88, .19, .95 + q * .025, .035, 'paper', 1);
  const [cx, cy] = H.p(5.18, 1.99, .96);
  oval(H, R, cx, cy - 4, 7, 5, 'blue', .65);
  H.line(R, [[cx - 7, cy - 4], [cx + 7, cy - 4]], 'coral', 1.2);
  H.line(R, [[cx, cy - 9], [cx + 3, cy - 12]], 'blue', 1);
  for (const j of [3.57, 7.35]) trestle(H, R, 5.79, j, 1.0);
  const [ox, oy] = H.p(8.9, 6.4, .13);
  oar(H, R, ox, oy, -.46, .2, 'teal', .83);
  for (const j of [3.6, 9.77]) {
    trestle(H, R, 9.96, j, .61);
    H.line(R, [H.p(9.64, j, .68), H.p(10.29, j, .68)], 'paper', 3);
  }
  const [sx, sy] = H.p(10.17, 2.28, .05);
  for (let q = 0; q < 4; q++) {
    oval(H, R, sx + q % 2 * 12, sy - Math.floor(q / 2) * 8, 7, 3, 'blue', .67);
    oval(H, R, sx + q % 2 * 12 - 2, sy - Math.floor(q / 2) * 8 - 1, 3, 1.5, 'paper', 1);
  }
  box(H, R, 10.48, 9.45, .95, .87, .02, .45, 'teal', .61);
  shape(H, R, H.tile(10.58, 9.55, .75, .67, .49), 'blue', .56);
  for (const j of [9.8, 10.1]) H.line(R, [H.p(10.68, j, .5), H.p(11.25, j, .5)], 'sun', 2.8);
  const [bx, by] = H.p(3.77, 10.56, .04);
  shape(H, R, [[bx - 12, by], [bx + 13, by], [bx + 14, by - 26], [bx + 8, by - 33], [bx - 9, by - 33], [bx - 14, by - 25]], 'coral', .55);
  stroke(H, R, [[bx - 8, by - 28], [bx - 9, by - 39], [bx + 7, by - 39], [bx + 9, by - 28]], 'blue', 1.3);
  shape(H, R, [[bx - 9, by - 7], [bx + 9, by - 7], [bx + 9, by - 19], [bx - 9, by - 19]], 'sun', .38, .65);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(4.7 + q * .36, 11.02, .025), H.p(4.7 + q * .36, 11.49, .025)], 'teal', 1.2, { tone: .5 });
  H.line(R, [H.p(3.0, 2.92, .02), H.p(3.0, 10.36, .02)], 'sun', 2, { tone: .6 });
  shaTinRowingDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), lift = u < .13 ? 0 : u < .27 ? (1 - Math.cos((u - .13) / .14 * Math.PI)) / 2 : u < .58 ? 1 : u < .75 ? (1 + Math.cos((u - .58) / .17 * Math.PI)) / 2 : 0;
  H.at(5.95, 6.48, 0, HH => actor(HH, R, 5.95 + lift * .13, 6.48 - lift * .1, t, 'hongKongOarInspect', { shirt: ['teal', .76], pants: ['blue', .7], hairStyle: 'pony', prop(h, r, p) {
    const [x, y] = p.nearHand;
    oar(h, r, x - 9, y + 2, -.463 + lift * .075, lift * (.5 + Math.sin(u * TAU) * .3), 'coral');
    h.line(r, [[x - 9, y + 2], p.farHand], 'blue', 1.2, { tone: .65 });
  } }, 0, 1.4));
  H.at(10.6, 6.27, 0, HH => actor(HH, R, 10.6, 6.27, 0, 'hold', { shirt: ['sun', .67], hairStyle: 'short', face: 'sw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 9, y - 6], [x + 8, y - 5], [x + 10, y + 5], [x - 9, y + 7]], 'paper', 1, .6);
    h.line(r, [[x - 6, y - 2], [x + 7, y - 1]], 'teal', 1.1);
  } }, 0, 1.27));
});
room.loopSeconds = 16;
export default room;
