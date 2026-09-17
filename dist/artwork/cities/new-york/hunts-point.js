import { drawerUnit, shallowTray, liddedTin, boundBook, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, TAU, wallRect, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, head: 16, lean: -8, al: 56, ar: 58, el: 28, er: 29 };
FIGURES.clips.newYorkProduceInspect = { dur: 14, keys: [[0, hold], [.16, hold], [.32, { ...hold, lean: -3, al: 73, ar: 77, el: 55, er: 46, head: 8 }], [.53, { ...hold, lean: -2, al: 70, ar: 81, el: 53, er: 42, head: 17 }], [.72, hold], [.88, hold], [1, hold]] };
FIGURES.clips.newYorkDispatchCheck = { dur: 14, keys: [[0, { ...rest, al: 52, el: 63, ar: 69, er: 38, head: 12 }], [.28, { ...rest, al: 52, el: 63, ar: 72, er: 33, head: 14 }], [.56, { ...rest, al: 52, el: 63, ar: 60, er: 48, head: -9 }], [.82, { ...rest, al: 52, el: 63, ar: 60, er: 48, head: -9 }], [1, { ...rest, al: 52, el: 63, ar: 69, er: 38, head: 12 }]] };

function crate(H, R, i, j, z, kind = 'citrus', ink = 'sun') {
  box(H, R, i, j, 1.46, 1.06, z, .49, ink, .62);
  shape(H, R, H.tile(i + .08, j + .07, 1.3, .9, z + .5), 'blue', .38, .55);
  for (let q = 0; q < 5; q++) {
    shape(H, R, H.faceI(i + .12 + q * .25, j + 1.065, .15, z + .12, z + .32), 'blue', .63, .4);
    H.line(R, [H.p(i + 1.47, j + .1 + q * .18, z + .12), H.p(i + 1.47, j + .1 + q * .18, z + .34)], 'blue', 1.4);
  }
  for (let a = 0; a < 3; a++) for (let b = 0; b < 2; b++) {
    const [x, y] = H.p(i + .31 + a * .38, j + .27 + b * .43, z + .53);
    if (kind === 'cabbage') {
      oval(H, R, x, y - 2, 8, 6, 'teal', .8);
      stroke(H, R, [[x - 6, y - 2], [x, y - 5], [x + 5, y - 1], [x - 1, y + 3]], 'paper', .8, .68);
      H.line(R, [[x, y - 5], [x + 1, y + 3]], 'blue', .7);
    } else if (kind === 'pear') {
      shape(H, R, [[x - 6, y + 2], [x - 7, y - 3], [x - 2, y - 8], [x + 1, y - 10], [x + 5, y - 5], [x + 7, y + 1], [x, y + 5]], 'sun', .67, .5);
      H.line(R, [[x + 1, y - 9], [x + 3, y - 13]], 'blue', .8);
    } else {
      oval(H, R, x, y - 1, 6, 5.4, 'coral', .77);
      H.dot(x + 1, y - 4, 1.1, 'sun');
    }
  }
  for (const a of [i, i + 1.39]) box(H, R, a, j, .08, 1.06, z + .45, .13, ink, .75);
}

function pallet(H, R, i, j, w = 2.1, d = 2.6, z = 0) {
  for (const a of [i + .12, i + w - .24]) box(H, R, a, j, .18, d, z, .2, 'coral', .48);
  for (let b = .05; b < d; b += .36) box(H, R, i, j + b, w, .26, z + .2, .08, 'sun', .57);
  for (const a of [.15, w - .15]) for (const b of [.19, d - .17]) H.dot(...H.p(i + a, j + b, z + .29), 1.2, 'blue');
}

function rollerBench(H, R) {
  for (const i of [3.1, 5.45, 7.8]) for (const j of [4.8, 6.4]) {
    const height = 1.13 - (i - 3.1) * .038;
    box(H, R, i, j, .13, .13, 0, height, 'blue', .68);
    H.line(R, [H.p(i, j, .1), H.p(i + .7, j, height - .12)], 'teal', 1.7);
  }
  const top = [[3, 4.8, 1.16], [8.15, 4.8, .96], [8.15, 6.6, .96], [3, 6.6, 1.16]].map(p => H.p(...p));
  shape(H, R, top, 'teal', .49);
  for (let i = 3.08; i < 8.09; i += .28) {
    const z = 1.16 - (i - 3) * .038;
    H.line(R, [H.p(i, 4.92, z + .02), H.p(i, 6.46, z + .02)], 'paper', 4, { tone: 1, amp: .03 });
    H.line(R, [H.p(i + .05, 4.92, z + .015), H.p(i + .05, 6.46, z + .015)], 'blue', .75, { tone: .6 });
  }
  for (const j of [4.77, 6.6]) H.line(R, [H.p(2.98, j, 1.2), H.p(8.2, j, 1)], 'blue', 3);
  box(H, R, 8.12, 4.73, .13, 1.94, .97, .23, 'coral', .85);
  crate(H, R, 3.34, 5.03, 1.15, 'pear', 'paper');
}

function huntsPointDetails(H, R) {
  drawerUnit(H, R, 5.43, 0.43, 2.69, 1.09, 1.19, 3, 'teal');
  shallowTray(H, R, 5.63, 0.62, 1.12, 0.69, 1.36, 'paper');
  const [x, y] = H.p(6.17, 0.96, 1.57);
  shape(
    H,
    R,
    [
      [x - 9, y],
      [x + 7, y],
      [x + 7, y - 15],
      [x - 9, y - 15]
    ],
    'blue',
    0.7,
    0.7
  );
  oval(H, R, x - 4, y - 13, 7, 7, 'coral', 0.6);
  oval(H, R, x - 4, y - 13, 3, 3, 'paper', 1);
  H.line(
    R,
    [
      [x + 3, y - 7],
      [x + 16, y - 6]
    ],
    'sun',
    2
  );
  boundBook(H, R, 7.02, 0.65, 0.9, 0.6, 1.36, 'coral');
  for (let n = 0; n < 3; n++) shape(H, R, H.tile(7.09 + n * 0.21, 0.76, 0.14, 0.36, 1.56), 'paper', 1, 0.4);
  for (const i of [1.46, 2.72, 3.98]) {
    box(H, R, i, 0.13, 0.9, 0.11, 2.12, 0.98, 'sun', 0.36);
    shape(H, R, H.faceI(i + 0.08, 0.26, 0.72, 2.23, 3.0), 'paper', 1, 0.5);
    box(H, R, i + 0.29, 0.28, 0.29, 0.06, 2.96, 0.1, 'blue', 0.7);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(i + 0.18, 0.29, 2.38 + n * 0.16), H.p(i + 0.69, 0.29, 2.38 + n * 0.16)], 'teal', 0.8);
  }
  slattedCrate(H, R, 9.49, 9.0, 1.82, 1.97, 0.04, 0.68, 'teal');
  for (let n = 0; n < 5; n++) box(H, R, 9.65 + n * 0.28, 9.15, 0.11, 1.58, 0.17, 0.74 + (n % 2) * 0.13, 'sun', 0.45);
  for (const i of [8.92, 10.53]) {
    box(H, R, i, 8.26, 0.49, 0.43, 0.03, 0.17, 'blue', 0.6);
    H.line(R, [H.p(i + 0.1, 8.38, 0.23), H.p(i + 0.4, 8.38, 0.23)], 'sun', 2);
  }
  liddedTin(H, R, 3.03, 1.93, 1.03, 5, 16, 'sun');
  servicePipe(
    H,
    R,
    [
      [0.12, 3.34, 0.16],
      [0.12, 3.34, 3.43],
      [0.12, 0.12, 3.43],
      [6.7, 0.12, 3.43]
    ],
    'teal',
    2.7
  );
}

const room = world('new-york-hunts-point', 'Hunts Point · Before the Grocers', {
  floor: 'blue', tone: .21, wall: 'paper', wallTone: 1, height: 4.0, head: 20,
}, (H, R) => {
  for (const side of ['ne', 'nw']) {
    shape(H, R, wallRect(H, side, .04, 11.96, .07, .72), 'teal', .6, .7);
    for (let p = .7; p < 12; p += 1.6) H.line(R, [wallPt(H, side, p, .8, .03), wallPt(H, side, p, 3.94, .03)], 'blue', .7, { tone: .32 });
  }
  shape(H, R, H.faceI(5.6, .05, 5.9, .12, 3.73), 'blue', .8);
  shape(H, R, H.faceI(5.8, .08, 5.5, .18, 2.74), 'teal', .37);
  for (let i = 5.9; i < 11.2; i += .39) {
    shape(H, R, H.faceI(i, .12, .34, .23, 2.74), 'paper', .73, .45);
    H.line(R, [H.p(i + .31, .14, .24), H.p(i + .31, .14, 2.7)], 'teal', 1.2);
  }
  for (let z = 2.91; z < 3.65; z += .16) H.line(R, [H.p(5.66, .09, z), H.p(11.47, .09, z)], 'paper', 2, { tone: .78 });
  for (const i of [5.35, 11.58]) {
    box(H, R, i, .1, .24, .44, 0, 3.96, 'blue', .57);
    box(H, R, i - .08, .4, .36, .36, .03, 1.1, 'sun', .78);
    for (let z = .16; z < 1.02; z += .27) H.line(R, [H.p(i - .04, .78, z), H.p(i + .24, .78, z + .18)], 'blue', 3);
  }
  shape(H, R, H.faceJ(.06, 1.08, 3.15, .96, 3.55), 'blue', .61);
  for (let z = 1.08; z < 3.5; z += .2) H.line(R, [H.p(.1, 1.16, z), H.p(.1, 4.14, z)], 'paper', 1.7, { tone: .75 });
  H.line(R, [H.p(.15, 4.43, 3.62), H.p(.15, 4.43, .8), H.p(.55, 4.43, .8)], 'teal', 2.5);
  const [vx, vy] = H.p(.22, 4.43, 1.25);
  oval(H, R, vx, vy, 8, 8, 'coral', .8);
  H.line(R, [[vx - 5, vy], [vx + 5, vy]], 'paper', 1.1);
  for (const j of [3.3, 8.4]) {
    H.line(R, [H.p(.22, j, 3.76), H.p(11.5, j, 3.76)], 'blue', 2.2);
    box(H, R, 3.4, j - .14, 3.1, .28, 3.61, .11, 'paper', 1);
    H.line(R, [H.p(3.52, j + .15, 3.62), H.p(6.37, j + .15, 3.62)], 'sun', 2);
  }
  for (const [i, j, kind, ink] of [[.8, 5.2, 'cabbage', 'paper'], [8.94, 1.24, 'citrus', 'sun'], [9.05, 5.8, 'pear', 'teal']]) {
    pallet(H, R, i - .08, j - .07, 1.76, 2.36);
    for (let level = 0; level < (kind === 'pear' ? 2 : 3); level++) for (let row = 0; row < 2; row++) crate(H, R, i, j + row * 1.15, .3 + level * .61, kind, ink);
  }
  rollerBench(H, R);
  table(H, R, 1.0, 1.14, 2.4, 1.15, .87, 'teal');
  box(H, R, 1.27, 1.27, 1.08, .78, 1.01, .14, 'paper', 1);
  box(H, R, 1.37, 1.35, .9, .6, 1.16, .08, 'blue', .68);
  H.line(R, [H.p(2.53, 1.32, 1), H.p(2.53, 1.32, 1.83)], 'blue', 2.2);
  box(H, R, 2.2, 1.22, .7, .18, 1.65, .33, 'blue', .8);
  for (let q = 0; q < 3; q++) H.dot(...H.p(2.35 + q * .18, 1.41, 1.82), 1.8, 'sun');
  box(H, R, 3.87, .63, 1.15, .78, .02, .57, 'coral', .48);
  for (let q = 0; q < 5; q++) box(H, R, 3.93, .66, 1.08, .72, .61 + q * .08, .055, 'sun', .54);
  for (const j of [8.95, 10.95]) shape(H, R, H.tile(2.6, j, 8.2, .12, .02), 'sun', .65, .4);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(2.9 + q * 1.27, 9.8, .02), H.p(3.5 + q * 1.27, 9.8, .02)], 'paper', 1.9);
  for (const i of [6.48, 7.35]) {
    box(H, R, i, 9.2, .3, 2.1, .11, .16, 'coral', .73);
    oval(H, R, ...H.p(i + .16, 11.0, .13), 4.2, 5.5, 'blue', .9);
  }
  box(H, R, 6.44, 8.77, 1.23, .52, .18, .23, 'teal', .67);
  stroke(H, R, [H.p(7.05, 8.92, .38), H.p(7.05, 8.6, 1.65), H.p(6.53, 8.49, 1.8), H.p(6.31, 8.61, 1.5), H.p(7.05, 8.92, .38)], 'blue', 3);
  pallet(H, R, 2.2, 9.65, 2.1, 1.72);
  for (let q = 0; q < 4; q++) box(H, R, 2.44, 9.85, 1.6, 1.3, .3 + q * .07, .05, 'paper', 1);
  shape(H, R, H.tile(2.44, 9.85, 1.6, 1.3, .58), 'sun', .44, .6);
  H.line(R, [H.p(3.25, 9.87, .59), H.p(3.25, 11.13, .59)], 'coral', 1.6);
  const [hx, hy] = H.p(.4, 9.0, 1.65);
  for (let q = 0; q < 4; q++) H.outline(R, Array.from({ length: 28 }, (_, k) => [hx + Math.cos(k / 27 * TAU) * (18 + q * 3), hy + Math.sin(k / 27 * TAU) * (19 + q * 3)]), 'teal', 2, { tone: .7 });
  stroke(H, R, [[hx + 20, hy + 15], [hx + 35, hy + 42], [hx + 61, hy + 45]], 'teal', 2.8);
  for (const [i, j] of [[4.7, 7.8], [8.3, 10.7], [2.6, 7.4]]) {
    const [x, y] = H.p(i, j, .02);
    shape(H, R, [[x - 5, y], [x, y - 5], [x + 7, y - 1], [x + 1, y + 3]], 'teal', .48, .5);
  }
  huntsPointDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 14);
  H.at(8.35, 6.18, 0, HH => actor(HH, R, 8.35, 6.18, u * 14, 'newYorkProduceInspect', {
    face: 'sw', shirt: ['blue', .66], vest: ['sun', .8], pants: ['teal', .75], hairStyle: 'cap', skin: ['coral', .56], prop(h, r, points) {
      const x = (points.nearHand[0] + points.farHand[0]) / 2, y = (points.nearHand[1] + points.farHand[1]) / 2;
      const tilt = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - .16) / .56))) * 5;
      shape(h, r, [[x - 27, y - 7], [x + 20, y - 1 - tilt], [x + 26, y + 8 - tilt], [x - 22, y + 15]], 'sun', .74, .8);
      shape(h, r, [[x - 27, y - 7], [x - 18, y - 17], [x + 28, y - 11 - tilt], [x + 20, y - 1 - tilt]], 'paper', 1, .7);
      for (let q = 0; q < 6; q++) oval(h, r, x - 14 + q % 3 * 13, y - 13 + Math.floor(q / 3) * 5 - tilt * q / 7, 5, 4, q % 2 ? 'coral' : 'sun', .77);
      for (let q = 0; q < 5; q++) h.line(r, [[x - 19 + q * 8, y + 2 - q * .12 * tilt], [x - 18 + q * 8, y + 9 - q * .12 * tilt]], 'blue', 1.6);
      h.line(r, [[x - 27, y - 7], [x + 20, y - 1 - tilt]], 'coral', 2);
    },
  }, 0, 1.4));
  H.at(4.5, 3.38, 0, HH => actor(HH, R, 4.5, 3.38, u * 14, 'newYorkDispatchCheck', {
    shirt: ['paper', 1], vest: ['teal', .65], hairStyle: 'bun', glasses: true, prop(h, r, p) {
      const [x, y] = p.farHand;
      shape(h, r, [[x - 12, y - 4], [x + 13, y + 2], [x + 11, y + 21], [x - 14, y + 15]], 'sun', .61, .7);
      shape(h, r, [[x - 9, y - 1], [x + 10, y + 4], [x + 8, y + 18], [x - 11, y + 13]], 'paper', 1, .5);
      for (let q = 0; q < 3; q++) h.line(r, [[x - 7, y + 3 + q * 3], [x + 5, y + 6 + q * 3]], 'teal', .7);
      const [px, py] = p.nearHand;
      h.line(r, [[px - 5, py + 5], [px + 5, py - 7]], 'coral', 1.6);
    },
  }, 0, 1.3));
  const glow = .17 + .03 * Math.sin(u * TAU);
  HHGlow(H, 6.4, .12, 2.5, glow);
});

function HHGlow(H, i, j, z, tone) {
  const [x, y] = H.p(i, j, z);
  H.glow(x, y, 23, 13, 'teal', tone);
}

room.loopSeconds = 14;
export default room;
