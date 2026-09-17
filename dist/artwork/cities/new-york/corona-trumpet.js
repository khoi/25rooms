import { drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, framedPanel } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, plant, rug, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const lowered = { ...rest, al: 40, ar: 40, el: 100, er: 95, head: 7 };
const playing = { ...rest, al: 115, ar: 91, el: 50, er: 81, head: -3, lean: -2 };
FIGURES.clips.newYorkTrumpetPhrase = { dur: 12, keys: [[0, lowered], [.12, lowered], [.28, playing], [.4, { ...playing, al: 113, head: -5 }], [.53, playing], [.67, { ...playing, ar: 93, head: -1 }], [.8, playing], [.91, lowered], [1, lowered]] };

function trumpet(H, R, hand, raised, t) {
  const [x, y] = hand, angle = -.12 + (1 - raised) * .72;
  const p = (a, b) => [x + a * Math.cos(angle) - b * Math.sin(angle), y + a * Math.sin(angle) + b * Math.cos(angle)];
  stroke(H, R, [p(-6, -2), p(19, -2), p(29, -5)], 'sun', 3.6);
  stroke(H, R, [p(24, 0), p(19, 8), p(1, 8), p(-1, 2), p(2, 0), p(18, 0)], 'sun', 3.2);
  stroke(H, R, [p(24, 0), p(19, 8), p(1, 8)], 'blue', .55);
  shape(H, R, [p(22, -4), p(36, -10), p(36, 4), p(22, 0)], 'sun', .9, .65);
  const rim = ell(0, 0, 2.6, 7, 20).map(([a, b]) => p(36 + a, b - 3));
  shape(H, R, rim, 'coral', .65, .7);
  for (let q = 0; q < 3; q++) {
    const press = raised > .8 ? Math.max(0, Math.sin(t * 5 + q * 2)) * 1.6 : 0;
    stroke(H, R, [p(4 + q * 5, 5), p(4 + q * 5, -5 + press)], 'sun', 2.2);
    H.line(R, [p(1 + q * 5, -6 + press), p(7 + q * 5, -6 + press)], 'blue', 1.1);
  }
  H.line(R, [p(-10, -2), p(-5, -2)], 'blue', 1.6);
}

function bay(H, R) {
  const sections = [[.06, 1.45, .9, 3.08], [.06, 4.55, .9, 2.1], [.06, 6.68, .9, 2.74]];
  for (const [i, j, z, len] of sections) {
    shape(H, R, H.faceJ(i, j, len, z, 3.65), 'paper', 1);
    shape(H, R, H.faceJ(i + .02, j + .13, len - .26, z + .15, 3.48), 'sun', .17, .65);
    for (let n = 0; n < 4; n++) {
      const jj = j + .15 + n * (len - .3) / 4;
      shape(H, R, H.faceJ(i + .04, jj, (len - .32) / 4, 1.04, 1.65 + n % 2 * .7), n % 2 ? 'coral' : 'teal', .28, .4);
      for (const zz of [1.2, 1.45]) H.line(R, [H.p(i + .05, jj + .15, zz), H.p(i + .05, jj + .3, zz)], 'paper', 1.4);
    }
    for (const zz of [1.08, 2.32, 3.48]) H.line(R, [H.p(i + .07, j + .1, zz), H.p(i + .07, j + len - .1, zz)], 'paper', 2.6);
    H.line(R, [H.p(i + .07, j + len / 2, 1.04), H.p(i + .07, j + len / 2, 3.55)], 'teal', 1.8);
    box(H, R, .05, j, .62, len, .79, .13, 'paper', 1);
  }
  for (const j of [1.2, 4.5, 6.6, 9.5]) box(H, R, .08, j, .35, .18, .9, 2.86, 'paper', 1);
}

function coronaTrumpetDetails(H, R) {
  drawerUnit(H, R, 9.42, 4.25, 1.81, 1.31, 1.15, 3, 'teal');
  shallowTray(H, R, 9.58, 4.41, 1.46, 0.94, 1.32, 'paper');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(9.85 + n * 0.44, 4.87, 1.54);
    H.line(
      R,
      [
        [x, y],
        [x, y - 15]
      ],
      'sun',
      3
    );
    oval(H, R, x, y - 17, 5, 3, 'paper', 1);
  }
  liddedTin(H, R, 10.81, 5.06, 1.55, 4, 15, 'coral');
  table(H, R, 0.93, 9.35, 2.47, 1.33, 0.51, 'sun');
  foldedCloth(H, R, 1.11, 9.53, 1.98, 0.92, 0.65, 'paper', 'teal');
  const [x, y] = H.p(2.07, 10.04, 0.82);
  H.line(
    R,
    [
      [x - 19, y + 3],
      [x + 13, y - 6]
    ],
    'sun',
    4
  );
  shape(
    H,
    R,
    [
      [x + 10, y - 9],
      [x + 25, y - 17],
      [x + 29, y - 1],
      [x + 12, y - 3]
    ],
    'sun',
    0.6,
    0.7
  );
  oval(H, R, x + 28, y - 9, 5, 9, 'paper', 0.9);
  for (let n = 0; n < 3; n++)
    H.line(
      R,
      [
        [x - 7 + n * 6, y - 2],
        [x - 7 + n * 6, y - 11]
      ],
      'blue',
      1.3
    );
  for (let n = 0; n < 3; n++) framedPanel(H, R, 2.05 + n * 1.56, 0.12, 1.17, 1.62, 0.87, ['teal', 'coral', 'sun'][n]);
  boundBook(H, R, 7.14, 10.41, 1.16, 0.8, 0.04, 'teal');
  satchel(H, R, 10.67, 10.64, 0.04, 'coral', 0.87);
  coiledLine(H, R, 9.18, 2.41, 0.04, 15, 'blue');
  for (const j of [7.19, 7.52]) oval(H, R, ...H.p(2.17, j, 0.06), 8, 4, 'blue', 0.65);
}

const room = world('new-york-corona-trumpet', 'Corona · A Phrase for the Window', {
  floor: 'sun', tone: .18, pattern: 'boards', wall: 'paper', wallTone: .95, height: 3.9,
}, (H, R) => {
  bay(H, R);
  for (const j of [1.38, 9.35]) {
    shape(H, R, H.faceJ(.27, j, .51, .92, 3.72), 'coral', .48, .65);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(.3, j + .06 + n * .15, .96), H.p(.3, j + .06 + n * .15, 3.68)], 'blue', .65, { tone: .4 });
  }
  shape(H, R, H.tile(1.2, 3.3, 7.25, 4.7, .03), 'sun', .16, .4);
  for (let n = 0; n < 12; n++) {
    box(H, R, .45, 3.06 + n * .23, .36, .14, .02, .65, 'paper', .9);
    H.line(R, [H.p(.82, 3.13 + n * .23, .1), H.p(.82, 3.13 + n * .23, .56)], 'blue', .65);
  }
  H.line(R, [H.p(.62, 3, .1), H.p(.62, 6.08, .1)], 'blue', 1.8);
  plant(H, R, ...H.p(.55, 8.43, .96), .85);
  for (const i of [1.4, 1.75]) box(H, R, i, .17, .11, 2.03, 1.53, 1.67, 'teal', .6);
  box(H, R, 1.4, .2, 5.35, .38, 2.91, .14, 'teal', .7);
  for (let q = 0; q < 15; q++) box(H, R, 1.62 + q * .31, .22, .22, .27, 3.05, .49 + q % 3 * .15, ['sun', 'paper', 'coral', 'teal'][q % 4], .65);
  shape(H, R, H.faceI(8.2, .08, 2.8, 1.75, 3.4), 'sun', .3);
  const [px, py] = H.p(9.55, .12, 2.6);
  oval(H, R, px, py, 20, 20, 'blue', .7);
  for (const r of [8, 12, 16]) H.outline(R, ell(px, py, r, r), 'paper', .6, { tone: .6 });
  oval(H, R, px, py, 5, 5, 'coral', .8);
  table(H, R, 8.65, 1.0, 2.4, 1.45, .81, 'coral');
  box(H, R, 8.88, 1.13, 1.25, 1.0, .95, .19, 'blue', .7);
  oval(H, R, ...H.p(9.48, 1.62, 1.17), 19, 9, 'blue', .82);
  oval(H, R, ...H.p(9.48, 1.62, 1.18), 5, 2.5, 'sun', .8);
  stroke(H, R, [H.p(10, 1.3, 1.23), H.p(9.96, 1.73, 1.23), H.p(9.58, 1.84, 1.23)], 'paper', 1.8);
  box(H, R, 10.32, 1.28, .51, .69, .95, .57, 'teal', .7);
  for (const z of [1.09, 1.34]) oval(H, R, ...H.p(10.58, 1.99, z), 5, 5, 'blue', .7);
  for (let q = 0; q < 6; q++) box(H, R, 8.94 + q * .23, 1.22, .17, .72, .04, .62, ['teal', 'sun', 'paper'][q % 3], .7);
  shape(H, R, H.tile(3.1, 4.2, 4.9, 4.15, .04), 'teal', .24, .7);
  for (let q = 0; q < 7; q++) H.line(R, [H.p(3.15, 4.38 + q * .54, .05), H.p(7.95, 4.38 + q * .54, .05)], 'paper', 1.1);
  for (const j of [4.15, 8.4]) for (let q = 0; q < 16; q++) H.line(R, [H.p(3.14 + q * .3, j, .05), H.p(3.14 + q * .3, j + .14, .05)], 'coral', .7);
  const mi = 6.85, mj = 4.5;
  H.line(R, [H.p(mi, mj, .04), H.p(mi, mj, 1.63)], 'blue', 2.1);
  for (const [di, dj] of [[-.5, .3], [.5, .25], [.02, -.5]]) H.line(R, [H.p(mi, mj, .23), H.p(mi + di, mj + dj, .04)], 'blue', 1.5);
  shape(H, R, [H.p(6.17, 4.13, 1.83), H.p(7.6, 4.13, 1.83), H.p(7.6, 4.76, 1.42), H.p(6.17, 4.76, 1.42)], 'blue', .8);
  for (let q = 0; q < 2; q++) {
    shape(H, R, H.tile(6.3 + q * .59, 4.22, .53, .43, 1.77), 'paper', .95, .5);
    for (let n = 0; n < 4; n++) H.line(R, [H.p(6.35 + q * .59, 4.27 + n * .075, 1.79), H.p(6.75 + q * .59, 4.27 + n * .075, 1.79)], 'blue', .45);
  }
  table(H, R, 8.2, 8.58, 1.5, .98, .64, 'sun');
  const [mx, my] = H.p(8.52, 8.92, .82);
  shape(H, R, [[mx - 6, my], [mx + 6, my], [mx + 3, my - 15], [mx - 3, my - 15]], 'paper', .9, .7);
  oval(H, R, mx, my - 15, 3, 1.5, 'coral', .8);
  box(H, R, 8.85, 8.79, .4, .56, .78, .08, 'coral', .65);
  shape(H, R, H.tile(4.1, 9.45, 3.1, 1.3, .12), 'blue', .82, 1);
  shape(H, R, H.tile(4.2, 9.56, 2.9, 1.09, .14), 'teal', .42, .6);
  shape(H, R, H.faceI(4.13, 9.48, 3.05, .16, .85), 'blue', .75, .8);
  for (const i of [4.42, 6.68]) box(H, R, i, 10.73, .14, .1, .12, .08, 'sun', .85);
  stroke(H, R, [H.p(5.16, 10.81, .13), H.p(5.25, 10.84, .28), H.p(5.97, 10.84, .28), H.p(6.1, 10.81, .13)], 'blue', 2);
  const [cx, cy] = H.p(2.45, 9.74, .07);
  oval(H, R, cx, cy, 15, 7, 'sun', .65);
  shape(H, R, [[cx - 13, cy - 1], [cx + 13, cy - 1], [cx + 8, cy - 14], [cx - 7, cy - 15]], 'sun', .72, .7);
  H.line(R, [[cx - 9, cy - 6], [cx + 10, cy - 5]], 'coral', 2.2);
  coronaTrumpetDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 12), raised = u < .12 ? 0 : u < .28 ? (1 - Math.cos((u - .12) / .16 * Math.PI)) / 2 : u < .8 ? 1 : u < .91 ? (1 + Math.cos((u - .8) / .11 * Math.PI)) / 2 : 0;
  H.at(4.4, 6.32, 0, HH => actor(HH, R, 4.4, 6.32, t, 'newYorkTrumpetPhrase', {
    shirt: ['coral', .68], pants: ['blue', .63], skin: ['coral', .5], hairStyle: 'curly',
    prop: (h, r, p) => trumpet(h, r, p.nearHand, raised, t),
  }, 0, 1.45));
  const [x, y] = H.p(.7, 7.52, 1.0);
  stroke(H, R, [[x, y], [x + 3, y - 17], [x + 8 + Math.sin(u * Math.PI * 2) * 2, y - 30]], 'teal', 1.2);
  oval(H, R, x + 9 + Math.sin(u * Math.PI * 2) * 2, y - 29, 6, 3, 'teal', .8);
});
room.loopSeconds = 12;
export default room;
