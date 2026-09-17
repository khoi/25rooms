import { world, shape, oval, stroke, box, table, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const gather = { ...rest, drop: .34, ll: 78, kl: -150, lr: -12, kr: 100, lean: -13, al: 38, ar: 55, el: 60, er: 25, head: 14 };
FIGURES.clips.newYorkRoofHarvest = { dur: 14, keys: [[0, gather], [.16, { ...gather, lean: -20, ar: 73, er: 6 }], [.28, { ...gather, lean: -20, ar: 73, er: 6 }], [.44, { ...gather, lean: -5, ar: 48, er: 115, head: 2 }], [.58, { ...gather, lean: -5, ar: 48, er: 115, head: 2 }], [.75, { ...gather, ar: 5, er: 12, lean: -8 }], [.85, { ...gather, ar: 5, er: 12, lean: -8 }], [1, gather]] };

function leaf(H, R, x, y, size = 1, tilt = 0, color = 'teal') {
  const p = (a, b) => [x + a * size + b * tilt, y + b * size];
  shape(H, R, [p(0, 0), p(-8, -7), p(-10, -19), p(-4, -27), p(1, -33), p(8, -24), p(10, -12), p(5, -4)], color, .67, .65);
  H.line(R, [p(0, 0), p(0, -28)], 'sun', .9);
  for (let q = 0; q < 3; q++) H.line(R, [p(-6, -9 - q * 6), p(0, -6 - q * 6), p(6, -11 - q * 6)], 'paper', .45, { tone: .7 });
}

function bed(H, R, i, j, w, d, variant = 0) {
  box(H, R, i, j, w, d, .03, .5, 'sun', .42);
  shape(H, R, H.tile(i + .12, j + .12, w - .24, d - .24, .55), 'blue', .6, .5);
  for (const z of [.16, .36]) {
    H.line(R, [H.p(i + .04, j + d + .01, z), H.p(i + w - .04, j + d + .01, z)], 'coral', .75);
    H.line(R, [H.p(i + w + .01, j + .04, z), H.p(i + w + .01, j + d - .04, z)], 'coral', .75);
  }
  for (const a of [i + .1, i + w - .1]) for (const b of [j + .1, j + d - .1]) box(H, R, a, b, .07, .07, .03, .57, 'teal', .72);
  for (let row = 0; row < 2; row++) for (let q = 0; q < Math.floor(w / .65); q++) {
    const [x, y] = H.p(i + .35 + q * .65, j + .38 + row * (d - .74), .56);
    for (let n = 0; n < 3; n++) leaf(H, R, x + (n - 1) * 5, y + n % 2 * 2, .45 + (q + row) % 3 * .08, (n - 1) * .23, variant && n === 1 ? 'coral' : 'teal');
  }
  for (let q = 0; q < 2; q++) H.line(R, [H.p(i + .2, j + .37 + q * (d - .74), .58), H.p(i + w - .2, j + .37 + q * (d - .74), .58)], 'blue', 1.1);
}

function basket(H, R, i, j) {
  const [x, y] = H.p(i, j, .14);
  shape(H, R, [[x - 23, y - 8], [x + 22, y - 8], [x + 18, y + 6], [x - 18, y + 6]], 'sun', .7, .9);
  oval(H, R, x, y - 8, 22, 8, 'sun', .68);
  for (let q = 0; q < 5; q++) leaf(H, R, x - 14 + q * 7, y - 5, .4, (q - 2) * .18);
  for (let q = 0; q < 8; q++) H.line(R, [[x - 17 + q * 5, y + 5], [x - 21 + q * 6, y - 8]], 'coral', .65);
  H.line(R, [[x - 20, y - 2], [x + 20, y - 2]], 'blue', .7);
  stroke(H, R, [[x - 20, y - 7], [x - 12, y - 20], [x + 8, y - 22], [x + 20, y - 7]], 'sun', 2.4);
  H.line(R, [[x - 23, y - 7], [x + 22, y - 7]], 'blue', 1.1);
}

const room = world('new-york-sunset-roof', 'Sunset Park · Above the Loading Bays', {
  floor: 'paper', tone: .88, wall: false,
}, (H, R) => {
  for (const [i, j, w, d] of [[0, 0, 12, .36], [0, .3, .36, 11.7]]) box(H, R, i, j, w, d, 0, 1.38, 'teal', .52);
  shape(H, R, H.faceI(.42, .2, 11.15, 1.42, 2.75), 'paper', .94, .75);
  shape(H, R, H.faceI(.45, .23, 11.08, 1.42, 2.04), 'teal', .28, .4);
  for (let q = 0; q < 10; q++) {
    const i = .54 + q * 1.08;
    H.line(R, [H.p(i, .25, 1.68 + q % 2 * .13), H.p(i + .65, .25, 1.68 + q % 2 * .13)], 'paper', 1);
    if (q < 4 || q > 6) shape(H, R, H.faceI(i, .26, .75, 2.04, 2.15 + q % 3 * .13), 'blue', .28, .4);
  }
  for (const i of [7.5, 9.6]) {
    H.line(R, [H.p(i, .27, 2.08), H.p(i, .27, 2.58), H.p(i + .8, .27, 2.58)], 'blue', 1.1);
    H.line(R, [H.p(i, .27, 2.29), H.p(i + .67, .27, 2.58)], 'blue', .6);
  }
  for (const i of [.5, 11.5]) box(H, R, i, .06, .13, .5, 1.35, 1.45, 'teal', .7);
  for (let i = 1.2; i < 12; i += 2.2) H.line(R, [H.p(i, .7, .025), H.p(i, 11.75, .025)], 'blue', .6, { tone: .26 });
  for (let j = 1; j < 12; j += 2.2) H.line(R, [H.p(.55, j, .025), H.p(11.7, j, .025)], 'blue', .6, { tone: .26 });
  bed(H, R, 1.05, 1.16, 7.45, 1.7);
  bed(H, R, 1.05, 4.04, 5.6, 1.78, 1);
  bed(H, R, 1.05, 7.64, 5.6, 1.77);
  for (const j of [1.5, 2.51]) {
    for (const i of [1.38, 4.69, 7.93]) H.line(R, [H.p(i, j, .6), H.p(i, j, 2.66)], 'blue', 1.8);
    H.line(R, [H.p(1.38, j, 2.66), H.p(7.93, j, 2.66)], 'sun', 2.2);
    for (let i = 1.64; i < 8; i += .68) {
      stroke(H, R, [H.p(i, j, .75), H.p(i + .12, j, 1.31), H.p(i - .08, j, 1.94), H.p(i, j, 2.63)], 'teal', 1.2);
      for (let n = 0; n < 4; n++) {
        const [x, y] = H.p(i + (n % 2 ? .1 : -.1), j, 1.02 + n * .33);
        oval(H, R, x + (n % 2 ? 5 : -5), y - 3, 6, 3, 'teal', .73);
        if (n % 2) oval(H, R, x - 3, y + 6, 3.4, 4.1, 'coral', .72);
      }
    }
  }
  box(H, R, 9.32, .97, 1.77, 1.9, .03, 1.48, 'paper', .9);
  shape(H, R, H.tile(9.39, 1.03, 1.63, 1.77, 1.52), 'teal', .6, .7);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(9.47, 1.13 + q * .18, 1.53), H.p(10.94, 1.13 + q * .18, 1.53)], 'blue', .75);
  for (const i of [9.49, 10.63]) H.line(R, [H.p(i, 2.89, .15), H.p(i, 2.89, 1.35)], 'blue', 1.4);
  table(H, R, 9.13, 4.1, 2.08, 1.5, .84, 'teal');
  for (let q = 0; q < 3; q++) box(H, R, 9.25, 4.23, 1.77, 1.13, .98 + q * .12, .08, 'paper', 1);
  for (let q = 0; q < 7; q++) H.line(R, [H.p(9.39 + q * .23, 5.38, 1.02), H.p(9.39 + q * .23, 5.38, 1.27)], 'teal', .7);
  box(H, R, 9.45, 4.28, 1.3, .93, 1.34, .16, 'sun', .56);
  for (const [i, j] of [[9.34, 4.26], [10.83, 4.26], [9.34, 5.35], [10.83, 5.35]]) oval(H, R, ...H.p(i, j, .08), 3, 4, 'blue', .8);
  const [wx, wy] = H.p(10.6, 7.65, .06);
  shape(H, R, [[wx - 11, wy], [wx + 11, wy], [wx + 12, wy - 22], [wx - 12, wy - 22]], 'teal', .7, .8);
  stroke(H, R, [[wx + 9, wy - 14], [wx + 24, wy - 26], [wx + 29, wy - 22]], 'teal', 3);
  stroke(H, R, [[wx - 9, wy - 18], [wx - 19, wy - 30], [wx + 4, wy - 32], [wx + 9, wy - 23]], 'blue', 1.9);
  for (const r of [10, 14, 18, 22]) H.outline(R, ell(...H.p(10.0, 9.6, .05), r, r * .46), 'teal', 2.1);
  stroke(H, R, [H.p(9.3, 9.5, .07), H.p(8.5, 10.7, .07), H.p(6.82, 10.53, .07)], 'teal', 2.2);
  box(H, R, 1.08, 10.37, 1.55, 1.1, .05, .67, 'sun', .58);
  for (let q = 0; q < 5; q++) H.line(R, [H.p(1.18 + q * .3, 11.5, .17), H.p(1.18 + q * .3, 11.5, .59)], 'coral', .8);
  for (let q = 0; q < 3; q++) leaf(H, R, ...H.p(1.5 + q * .3, 10.9, .75), .45, (q - 1) * .3, 'coral');
  H.line(R, [H.p(3.16, 10.9, .02), H.p(4.2, 10.39, .13)], 'sun', 3);
  shape(H, R, [H.p(4.12, 10.18, .11), H.p(4.45, 10.18, .11), H.p(4.39, 10.71, .03), H.p(4.22, 10.84, .03)], 'blue', .75, .7);
  box(H, R, 7.22, 9.56, .78, 1.13, .04, .16, 'coral', .5);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(7.34 + q * .15, 9.74, .23), H.p(7.32 + q * .15, 10.45, .23)], 'paper', .8);
}, (H, R, t) => {
  const u = cycle(t, 14);
  H.at(7.45, 8.3, 0, HH => actor(HH, R, 7.45, 8.3, t, 'newYorkRoofHarvest', {
    face: 'nw', shirt: ['coral', .75], pants: ['blue', .65], hairStyle: 'cap', apron: ['paper', .95],
    prop: (h, r, p) => {
      const [x, y] = p.farHand;
      if (u > .25 && u < .85) {
        const fall = Math.max(0, Math.min(1, (u - .68) / .17));
        const [bx, by] = h.p(7.85, 9.0, .14);
        const lx = x + (bx - x) * fall, ly = y + fall * fall * 72;
        h.clip([[-500, -300], [500, -300], [500, by - 7], [-500, by - 7]], () => {
          leaf(h, r, lx, ly - 2, .72, -.16);
          leaf(h, r, lx + 3, ly, .57, .21);
        });
      }
      const [sx, sy] = p.nearHand;
      const pinch = u > .16 && u < .3 ? Math.sin((u - .16) / .14 * Math.PI) : 0;
      for (const d of [-1, 1]) {
        oval(h, r, sx + d * 2.6, sy + 3, 2.6, 3.1, 'coral', .8);
        h.line(r, [[sx + d * 2, sy], [sx - d * (4 - pinch * 3), sy - 11]], 'blue', 1.15);
      }
    },
  }, 0, 1.38));
  H.at(7.85, 9.0, .2, HH => basket(HH, R, 7.85, 9.0));
  const [x, y] = H.p(7.82, 2.13, 2.66), flutter = Math.sin(u * Math.PI * 2) * 3;
  shape(H, R, [[x, y], [x + 14, y - 2 + flutter], [x + 11, y + 9 + flutter], [x, y + 6]], 'coral', .68, .7);
});
room.loopSeconds = 14;
export default room;
