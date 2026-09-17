import { shallowTray, foldedCloth, satchel } from '../furnishings.js';
import { world, shape, oval, stroke, box, bench, actor, cycle, ell, table } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, ll: -16, lr: 16, kl: 14, kr: 12, al: 36, el: 70, ar: 55, er: 55, head: -5, lean: -2 };
const strike = { ...rest, ll: -25, lr: 27, kl: 18, kr: 20, al: -28, el: 20, ar: 110, er: 0, head: -14, lean: -8 };
FIGURES.clips.newYorkHandballRally = { dur: 10, keys: [[0, ready], [.12, ready], [.2, { ...ready, ar: 13, er: 100, lean: -13 }], [.26, strike], [.82, strike], [.94, ready], [1, ready]] };
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 15, ar: 38, el: 35, er: 70, head: -6 };
FIGURES.clips.newYorkHandballFriend = { dur: 10, keys: [[0, seated], [.3, { ...seated, head: -16 }], [.5, { ...seated, head: -9 }], [.69, { ...seated, head: 5 }], [.87, seated], [1, seated]] };

function fence(H, R) {
  const face = H.faceJ(.19, 1.1, 9.8, .05, 2.3);
  H.clip(face, () => {
    for (let j = -3; j < 15; j += .36) {
      H.line(R, [H.p(.2, j, .03), H.p(.2, j + 3.1, 2.35)], 'blue', .6, { tone: .5 });
      H.line(R, [H.p(.2, j, 2.35), H.p(.2, j + 3.1, .03)], 'blue', .6, { tone: .5 });
    }
  });
  for (const j of [1.1, 4.37, 7.64, 10.9]) H.line(R, [H.p(.2, j, .03), H.p(.2, j, 2.35)], 'teal', 2.8);
  for (const z of [.04, 2.32]) H.line(R, [H.p(.2, 1.1, z), H.p(.2, 10.9, z)], 'teal', 2);
}

function duffel(H, R, i, j) {
  const [x, y] = H.p(i, j, .05);
  shape(H, R, [[x - 18, y + 2], [x + 17, y + 2], [x + 21, y - 14], [x + 13, y - 20], [x - 13, y - 20], [x - 21, y - 12]], 'coral', .72, .85);
  for (const dx of [-10, 10]) stroke(H, R, [[x + dx - 3, y], [x + dx - 3, y - 18], [x + dx + 4, y - 20], [x + dx + 4, y]], 'blue', 1.1);
  stroke(H, R, [[x - 7, y - 19], [x - 6, y - 28], [x + 6, y - 28], [x + 8, y - 19]], 'blue', 1.7);
  H.line(R, [[x - 13, y - 18], [x + 12, y - 18]], 'paper', .8);
  H.dot(x + 4, y - 17, 1.5, 'sun');
}

function orchardBeachDetails(H, R) {
  table(H, R, 9.81, 9.62, 1.46, 1.11, 0.54, 'sun');
  shallowTray(H, R, 9.95, 9.77, 1.18, 0.82, 0.68, 'teal');
  for (let n = 0; n < 3; n++) H.dot(...H.p(10.18 + n * 0.31, 10.14, 0.92), 4.8, ['blue', 'coral', 'blue'][n]);
  foldedCloth(H, R, 10.0, 9.82, 0.93, 0.73, 0.14, 'paper', 'coral');
  const [x, y] = H.p(10.92, 5.32, 0.04);
  H.line(
    R,
    [
      [x - 11, y],
      [x - 11, y - 32],
      [x + 11, y - 32],
      [x + 11, y]
    ],
    'blue',
    2
  );
  oval(H, R, x, y - 34, 13, 6, 'paper', 1);
  oval(H, R, x, y - 34, 9, 3, 'teal', 0.3);
  stroke(
    H,
    R,
    [
      [x + 7, y - 32],
      [x + 12, y - 44],
      [x + 18, y - 43]
    ],
    'teal',
    2
  );
  box(H, R, 10.25, 6.16, 0.68, 0.78, 0.04, 0.14, 'blue', 0.55);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(10.34 + n * 0.15, 6.24, 0.22), H.p(10.34 + n * 0.15, 6.85, 0.22)], 'paper', 0.7);
  satchel(H, R, 1.25, 9.83, 0.04, 'teal', 0.76);
  for (const j of [10.24, 10.62]) oval(H, R, ...H.p(2.02, j, 0.07), 9, 4, 'coral', 0.5);
  for (let n = 0; n < 3; n++) {
    const j = 2.16 + n * 0.63;
    H.line(R, [H.p(0.27, j, 2.13), H.p(0.5, j, 2.13), H.p(0.5, j, 2.23)], 'blue', 1.5);
  }
  foldedCloth(H, R, 0.46, 2.33, 0.49, 0.83, 1.07, 'paper', 'teal');
  for (const [i, j] of [
    [0.7, 7.24],
    [1.46, 10.95],
    [10.78, 11.14]
  ])
    oval(H, R, ...H.p(i, j, 0.03), 4, 2, 'sun', 0.3);
}

const room = world('new-york-orchard-beach', 'Orchard Beach · Off the Wall', {
  floor: 'teal', tone: .28, wall: false,
}, (H, R) => {
  box(H, R, .1, .03, 11.75, .38, .01, 3.8, 'paper', .9);
  shape(H, R, H.faceI(.65, .43, 10.55, .3, 3.48), 'blue', .47, .9);
  shape(H, R, H.faceI(1.04, .46, 9.78, .33, 3.13), 'teal', .48, .65);
  H.line(R, [H.p(1.05, .49, 2.73), H.p(10.8, .49, 2.73)], 'paper', 2.1);
  for (const i of [1.05, 10.8]) H.line(R, [H.p(i, .49, .33), H.p(i, .49, 3.1)], 'paper', 1.7);
  H.line(R, [H.p(.64, .5, .28), H.p(11.22, .5, .28)], 'coral', 2.1);
  for (let q = 0; q < 26; q++) {
    const i = 1.2 + q * .36, z = .53 + (q * 7 % 13) * .13;
    H.line(R, [H.p(i, .52, z), H.p(i + .1, .52, z + .035)], 'paper', .75, { tone: .65 });
  }
  shape(H, R, H.faceI(8.83, .53, 1.16, .66, 1.21), 'paper', .29, .45);
  for (let q = 0; q < 7; q++) H.line(R, [H.p(8.95 + q * .15, .54, .71), H.p(8.99 + q * .15, .54, 1.12)], 'teal', .65, { tone: .45 });
  for (const i of [.17, 11.56]) box(H, R, i, .06, .2, .52, .03, 3.91, 'sun', .5);
  box(H, R, .07, .02, 11.79, .44, 3.79, .15, 'sun', .43);
  for (const i of [1.06, 9.34]) H.line(R, [H.p(i, .7, .03), H.p(i, 11.21, .03)], 'paper', 2.5);
  for (const j of [5.98, 7.18, 11.2]) H.line(R, [H.p(1.06, j, .035), H.p(9.34, j, .035)], 'paper', 2.4);
  H.line(R, [H.p(1.06, 6.05, .04), H.p(1.82, 6.05, .04)], 'coral', 2.6);
  H.line(R, [H.p(8.58, 6.05, .04), H.p(9.34, 6.05, .04)], 'coral', 2.6);
  for (const [i, j] of [[2.3, 9.37], [7.18, 4.62], [5.28, 10.19]]) stroke(H, R, [H.p(i, j, .03), H.p(i + .25, j + .27, .03), H.p(i + .18, j + .52, .03), H.p(i + .53, j + .63, .03)], 'blue', .7, .4);
  shape(H, R, H.tile(9.62, .67, 1.99, 10.96, .02), 'sun', .19, .55);
  for (let j = .8; j < 11.5; j += 1.04) H.line(R, [H.p(9.63, j, .04), H.p(11.6, j, .04)], 'blue', .6, { tone: .32 });
  fence(H, R);
  for (const j of [2.23, 9.74]) {
    const [x, y] = H.p(.38, j, .08);
    for (let q = 0; q < 6; q++) stroke(H, R, [[x + q * 2, y], [x - 4 + q * 3, y - 12 - q % 3 * 4], [x - 8 + q * 4, y - 20 - q % 2 * 4]], 'teal', 1.2, .6);
  }
  bench(H, R, 9.77, 7.34, 1.64, 'teal');
  for (let q = 0; q < 4; q++) H.line(R, [H.p(9.85, 7.49 + q * .15, .7), H.p(11.34, 7.49 + q * .15, .7)], 'paper', .75);
  shape(H, R, [H.p(10.92, 7.37, 1.17), H.p(11.33, 7.37, 1.17), H.p(11.33, 8.07, .28), H.p(10.92, 8.07, .28)], 'paper', 1, .7);
  for (const i of [10.99, 11.18]) H.line(R, [H.p(i, 7.44, 1.1), H.p(i, 8.03, .36)], 'coral', 1.3);
  duffel(H, R, 10.55, 9.5);
  const [bx, by] = H.p(10.02, 10.6, .04);
  shape(H, R, [[bx - 5, by], [bx + 5, by], [bx + 5, by - 20], [bx + 3, by - 23], [bx + 3, by - 29], [bx - 3, by - 29], [bx - 3, by - 23], [bx - 5, by - 20]], 'paper', .94, .7);
  H.line(R, [[bx - 3, by - 29], [bx + 3, by - 29]], 'teal', 2.2);
  H.line(R, [[bx - 4, by - 11], [bx + 4, by - 11]], 'coral', 2.8);
  for (const [i, j] of [[10.68, 10.62], [11.1, 10.35]]) {
    const [x, y] = H.p(i, j, .045);
    oval(H, R, x, y, 9, 4, 'blue', .75);
    H.line(R, [[x - 5, y - 2], [x + 3, y - 4]], 'paper', 1.2);
    for (let q = 0; q < 3; q++) H.line(R, [[x - 2 + q * 2, y - 4], [x - 3 + q * 2, y]], 'sun', .65);
  }
  const [hx, hy] = H.p(.65, 10.37, 1.7);
  shape(H, R, [[hx - 8, hy + 12], [hx + 8, hy + 12], [hx + 10, hy - 9], [hx - 10, hy - 9]], 'coral', .59, .75);
  stroke(H, R, [[hx - 6, hy - 8], [hx - 5, hy - 18], [hx + 5, hy - 18], [hx + 6, hy - 8]], 'blue', 1);
  oval(H, R, ...H.p(11.02, 2.35, .03), 12, 5, 'teal', .52);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(10.73 + q * .11, 2.17, .05), H.p(10.73 + q * .11, 2.49, .05)], 'blue', .75);
  orchardBeachDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 10);
  H.at(4.93, 8.0, 0, HH => actor(HH, R, 4.93, 8.0, t, 'newYorkHandballRally', {
    shirt: ['sun', .75], pants: ['blue', .68], skin: ['coral', .5], hairStyle: 'short',
    prop: (h, r, p) => {
      const start = p.nearHand, wall = h.p(7.5, .58, 1.84), ground = h.p(6.04, 5.68, .08);
      let point = start;
      const segment = (a, b, v, hop = 0) => [a[0] + (b[0] - a[0]) * v, a[1] + (b[1] - a[1]) * v - Math.sin(v * Math.PI) * hop];
      if (u >= .26 && u < .44) point = segment(start, wall, (u - .26) / .18, 11);
      else if (u >= .44 && u < .64) point = segment(wall, ground, (u - .44) / .2);
      else if (u >= .64 && u < .82) point = segment(ground, start, (u - .64) / .18, 29);
      if (u >= .26 && u < .82) oval(h, r, point[0] + 4, Math.max(point[1] + 15, ground[1]), 4.5, 1.5, 'blue', .15);
      oval(h, r, point[0], point[1], 4.1, 4.1, 'blue', .9);
      h.dot(point[0] - 1, point[1] - 1, 1.1, 'paper', .8);
      const [x, y] = p.head;
      h.line(r, [[x - 7, y - 3], [x + 7, y - 3]], 'coral', 2.1);
    },
  }, 0, 1.48));
  H.at(10.35, 7.98, 0, HH => actor(HH, R, 10.35, 7.98, t, 'newYorkHandballFriend', {
    face: 'sw', shirt: ['coral', .67], pants: ['blue', .66], hairStyle: 'curly', skin: ['coral', .44],
    prop: (h, r, p) => {
      const [x, y] = p.nearHand;
      shape(h, r, [[x - 3, y + 4], [x + 4, y + 4], [x + 4, y - 10], [x - 3, y - 10]], 'teal', .6, .55);
      h.line(r, [[x - 2, y - 12], [x + 3, y - 12]], 'paper', 2.2);
    },
  }, 0, 1.35));
});
room.loopSeconds = 10;
export default room;
