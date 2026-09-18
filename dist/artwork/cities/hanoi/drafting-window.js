import { world, shape, oval, stroke, box, cycle, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, benchFrame, cushion, bentTube, drape, vessel } from '../materials.js';
import { windowBay, recessedFrame, taskLight, floorShadow } from '../joinery.js';

const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
const liftAt = u => ease(4.8, 9.6, u) * (1 - ease(14.4, 22, u));
function student(H, R, x, y, ink, hands, face = 1, lean = 0) {
  const h = [x + lean, y - 58];
  H.tint([[x - 15, y + 2], [x + 17, y + 3], [x + 27, y + 10], [x - 11, y + 9]], 'blue', .14);
  for (const s of [-1, 1]) { stroke(H, R, [[x + s * 7, y - 20], [x + face * 17 + s * 3, y - 13], [x + face * 19 + s * 3, y + 2]], 'blue', 7); oval(H, R, x + face * 21 + s * 3, y + 3, 6, 2.5, 'blue', .8); }
  shape(H, R, [[x - 10 + lean, y - 46], [x + 10 + lean, y - 46], [x + 12, y - 20], [x - 12, y - 20]], ink, .75);
  oval(H, R, ...h, 9, 10, 'coral', .28);
  shape(H, R, [[h[0] - 9, h[1]], [h[0] - 10, h[1] - 6], [h[0] - 3, h[1] - 12], [h[0] + 7, h[1] - 10], [h[0] + 10, h[1] - 4], [h[0] + 4, h[1] - 5]], 'blue', .85);
  H.dot(h[0] + face * 5, h[1] + 1, 1, 'blue');
  hands.forEach((hand, n) => { const shoulder = [x + (n ? 8 : -7) + lean, y - 43]; const elbow = [shoulder[0] * .45 + hand[0] * .55, Math.max(shoulder[1], hand[1]) + 8]; stroke(H, R, [shoulder, elbow, hand], 'blue', 6.5); stroke(H, R, [shoulder, elbow, hand], ink, 4.9); oval(H, R, ...hand, 3, 2.5, 'coral', .3); });
}
function roof(H, R, lift) {
  const i = 5.02 - 1.3 * lift, j = 4.26 + .55 * lift, z = 2.06 + .4 * lift;
  const P = (a, b, h = 0) => H.p(i + a, j + b, z + h);
  for (const a of [.05, .7, 1.35, 2, 2.65, 3]) {
    H.line(R, [P(a, -.1, -.07), P(a, 1.08, .5), P(a, 2.3, -.07), P(a, -.1, -.07)], 'sun', 2);
    H.line(R, [P(a, 1.08, .5), P(a, 1.08, -.07)], 'teal', 1);
  }
  shape(H, R, [P(-.14, -.12), P(3.14, -.12), P(3.14, 1.08, .56), P(-.14, 1.08, .56)], 'paper', 1);
  shape(H, R, [P(-.14, 1.08, .56), P(3.14, 1.08, .56), P(3.14, 2.32), P(-.14, 2.32)], 'sun', .42);
  H.line(R, [P(-.14, 2.32), P(3.14, 2.32)], 'paper', 2.7);
  for (const b of [.42, .76, 1.44, 1.81, 2.13]) H.line(R, [P(-.1, b, b < 1.08 ? (b + .12) * .466 : (2.32 - b) * .45), P(3.12, b, b < 1.08 ? (b + .12) * .466 : (2.32 - b) * .45)], 'coral', .55);
  H.line(R, [P(-.2, 1.08, .59), P(3.2, 1.08, .59)], 'teal', 2.4);
  for (let a = .1; a < 3; a += .33) H.line(R, [P(a, 1.08, .57), P(a, 2.28, .02)], 'coral', .65, { tone: .6 });
  for (const d of [.08, .15]) H.line(R, [P(2.63, 2.18, d), P(2.96, 2.18, d), P(2.96, 1.9, d + .12)], 'teal', 1.5);
  return [P(.45, 2.3), P(.95, 2.3)];
}
const room = world('hanoi-drafting-window', 'The house in pieces', { floor: 'paper', tone: .8, wall: 'teal', wallTone: .22, height: 4.15, head: 28 }, (H, R) => {
  for (let a = 0; a < 12; a++) for (const j of [.04, 11.45]) { shape(H, R, H.tile(a + .03, j, .9, .5, .018), 'teal', .27, .45); H.line(R, [H.p(a + .2, j + .12), H.p(a + .65, j + .38)], 'coral', .7); }
  for (let j = 1.2; j < 11.5; j += 2.3) H.line(R, [H.p(.7, j), H.p(11.4, j)], 'blue', .45, { tone: .23 });
  for (const side of ['nw', 'ne']) {
    const P = (a, z, d = .13) => wallPt(H, side, a, z, -d);
    H.line(R, [P(.1, .23), P(11.8, .23)], 'blue', 4);
    H.line(R, [P(.1, .28), P(11.8, .28)], 'sun', 1.4);
    H.line(R, [P(.1, 4.04), P(11.8, 4.04)], 'blue', 5);
    H.line(R, [P(.1, 4.08), P(11.8, 4.08)], 'paper', 1.7);
  }
  for (const i of [.17, 2.63, 9.23, 11.61]) timber(H, R, i, .1, .17, .32, .28, 3.74, 'teal');
  timber(H, R, 2.66, .16, 6.76, 1.01, 1.32, .13, 'sun');
  shape(H, R, H.faceI(2.82, 1.03, 6.45, .32, 1.29), 'blue', .62);
  for (const i of [2.76, 4.34, 6.1, 7.55, 9.17]) timber(H, R, i, .25, .13, .88, .28, 1.04, 'teal');
  timber(H, R, 2.77, .27, 6.55, .88, .27, .12, 'teal');
  for (let n = 0; n < 7; n++) {
    const i = 2.99 + n * .17;
    box(H, R, i, .55, .13, .47, .4, .62 + n % 2 * .09, n % 3 === 0 ? 'coral' : 'paper', .8);
    H.line(R, [H.p(i + .02, 1.03, .57), H.p(i + .1, 1.03, .57)], 'sun', 1);
  }
  for (const [i, j, z, ink] of [[4.53, .5, .4, 'paper'], [4.64, .48, .49, 'teal'], [6.27, .46, .4, 'coral'], [6.27, .46, .66, 'sun']]) box(H, R, i, j, 1.08, .55, z, .08, ink, .6);
  for (const i of [7.76, 8.44]) { box(H, R, i, .42, .55, .61, .39, .64, 'teal', .45); shape(H, R, H.faceI(i + .18, 1.045, .2, .59, .72), 'paper', 1); }
  const W = windowBay(H, R, 'ne', 2.8, 6.4, 1.48, 2.42, { divisions: 4, view: P => { for (let n = 0; n < 5; n++) shape(H, R, [P(.18 + n * 1.2, .15), P(1.25 + n * 1.2, .15), P(1.25 + n * 1.2, .7 + n % 2 * .25), P(.18 + n * 1.2, .85 + n % 2 * .3)], n % 2 ? 'teal' : 'coral', .19, .4); } });
  for (const u of [.07, 6.32]) {
    const p = [W(u, .06, .3), W(u + .38, .08, .85), W(u + .38, 2.31, .85), W(u, 2.34, .3)];
    shape(H, R, p, 'teal', .43);
    for (let z = .25; z < 2.25; z += .22) H.line(R, [W(u + .04, z, .38), W(u + .32, z, .78)], 'sun', 1.2);
    for (const z of [.39, 1.94]) H.line(R, [W(u, z, .31), W(u + .12, z, .48)], 'blue', 2.6);
  }
  H.line(R, [W(5.3, .25), W(5.8, .12, .75), W(6.15, .18)], 'blue', 1.4);
  shape(H, R, [H.p(3.2, .5, .02), H.p(7.3, .5, .02), H.p(9.1, 7.7, .02), H.p(5.2, 7.7, .02)], 'sun', .12, .1);
  for (const j of [1.62, 6.74]) timber(H, R, .22, j, 2.22, .14, .19, .92, 'teal');
  timber(H, R, .18, 1.5, 2.34, 5.55, .14, .18, 'sun');
  for (const z of [.38, .67, .96]) { timber(H, R, .25, 1.6, 2.2, 5.5, z, .18, 'teal'); for (let j = 1.9; j < 6.8; j += 1.55) { H.outline(R, H.faceJ(2.46, j, 1.3, z + .025, z + .15), 'blue', .7); H.line(R, [H.p(2.47, j + .5, z + .11), H.p(2.47, j + .85, z + .11)], 'sun', 2); } }
  shape(H, R, H.faceJ(2.49, 3.36, 1.35, .7, .94), 'blue', .65);
  box(H, R, 2.45, 3.4, .83, 1.27, .68, .09, 'sun', .6);
  for (let n = 0; n < 4; n++) shape(H, R, H.tile(2.54 + n * .035, 3.49, .62, 1.04, .79 + n * .019), 'paper', 1, .4);
  timber(H, R, 3.19, 3.38, .12, 1.31, .67, .24, 'teal');
  H.line(R, [H.p(3.33, 3.88, .82), H.p(3.33, 4.25, .82)], 'sun', 2);
  for (const j of [2.1, 5.8]) bentTube(H, R, [[.52, j, 1.1], [1.55, j, 2.85], [2.22, j, 1.2]], 2, 'blue');
  const board = [H.p(.4, 1.5, 2.75), H.p(.4, 6.8, 2.75), H.p(2.25, 6.8, 1.35), H.p(2.25, 1.5, 1.35)]; shape(H, R, board, 'sun', .45); shape(H, R, [H.p(.57, 1.8, 2.64), H.p(.57, 6.46, 2.64), H.p(2.07, 6.46, 1.5), H.p(2.07, 1.8, 1.5)], 'paper', 1);
  for (const j of [2.1, 3.15, 4.3, 5.4]) H.line(R, [H.p(.82, j, 2.47), H.p(1.8, j, 1.75), H.p(1.8, j + .65, 1.75), H.p(.82, j + .65, 2.47)], 'teal', .8);
  H.line(R, [H.p(1.55, 1.58, 1.94), H.p(1.55, 6.65, 1.94)], 'blue', 3); for (const j of [2.05, 5.9]) metal(H, R, .37, j, .16, .36, 2.76, .055, 'blue');
  for (const j of [2.1, 5.8]) {
    const p = H.p(1.45, j, 1.94);
    oval(H, R, ...p, 8, 7, 'blue', .7); oval(H, R, ...p, 5.8, 5.1, 'sun', .7);
    H.line(R, [[p[0] - 3, p[1] + 3], [p[0] + 3, p[1] - 3]], 'blue', 1.2);
  }
  const D = (i, j, dz = 0) => H.p(i, j, 3.053 - .756 * i + dz);
  for (const j of [2.24, 3.46, 4.62]) {
    H.line(R, [D(.91, j), D(1.18, j), D(1.18, j + .3), D(1.63, j + .3), D(1.63, j + .64), D(.91, j + .64), D(.91, j)], 'blue', .9);
    for (let k = 0; k < 5; k++) H.line(R, [D(1.3 + k * .065, j + .38), D(1.3 + k * .065, j + .55)], 'teal', .6);
  }
  H.line(R, [D(1.75, 1.71), D(1.75, 6.62)], 'paper', 3.8);
  for (let j = 1.83; j < 6.5; j += .19) H.line(R, [D(1.72, j, .02), D(1.79, j, .02)], 'blue', .65);
  const protractor = D(1.17, 5.9, .035); H.outline(R, ell(...protractor, 13, 7), 'teal', 1.1);
  H.line(R, [D(1.22, 5.8, .045), D(1.68, 6.25, .045), D(1.22, 6.25, .045), D(1.22, 5.8, .045)], 'coral', 1.3);
  timber(H, R, .3, 1.52, .52, 5.31, 3.32, .12, 'sun');
  for (const j of [1.72, 6.48]) bentTube(H, R, [[.12, j, 3.05], [.64, j, 3.34]], 1.8, 'blue');
  for (let n = 0; n < 4; n++) { const j = 2.1 + n * 1.01; shape(H, R, [H.p(.47, j, 3.47), H.p(.47, j + .69, 3.47), H.p(.47, j + .69, 3.78), H.p(.47, j, 3.78)], n % 2 ? 'paper' : 'coral', .65); H.line(R, [H.p(.5, j + .07, 3.5), H.p(.5, j + .35, 3.7), H.p(.5, j + .64, 3.5)], 'teal', 1); }
  const B = recessedFrame(H, R, 'nw', 7.55, 3.85, 1.5, 2.2, 'sun');
  for (const [u, v, w, h] of [[.2, .3, 1.2, .7], [1.75, .24, 1.7, .88], [.22, 1.24, 1.3, .65], [1.94, 1.33, 1.2, .55]]) { const q = [B(u, v), B(u + w, v), B(u + w, v + h), B(u, v + h)]; shape(H, R, q, 'paper', 1, .5); H.line(R, [B(u + .15, v + .12), B(u + .55, v + .12), B(u + .55, v + h - .12), B(u + w - .12, v + h - .12)], 'teal', 1); H.dot(...B(u + .08, v + h - .07), 1.7, 'coral'); }
  const sunDisk = B(2.63, 1.63); oval(H, R, ...sunDisk, 11, 9, 'sun', .6); H.line(R, [[sunDisk[0] - 9, sunDisk[1] + 5], [sunDisk[0], sunDisk[1] - 7], [sunDisk[0] + 9, sunDisk[1] + 5]], 'coral', .85);
  timber(H, R, 4.53, 4.14, 5.12, 2.64, .31, .1, 'teal');
  for (const [i, j, ink] of [[4.63, 4.3, 'paper'], [6.1, 4.3, 'coral'], [7.61, 4.3, 'teal']]) { box(H, R, i, j, 1.13, 1.65, .42, .39, ink, .52); H.line(R, [H.p(i + .41, j + 1.66, .66), H.p(i + .77, j + 1.66, .66)], 'sun', 2); }
  for (const i of [4.43, 9.66]) bentTube(H, R, [[i, 4.1, .28], [i, 6.77, 1.02]], 1.5, 'blue');
  benchFrame(H, R, 4.25, 3.75, 5.75, 3.4, 1.15, 'sun');
  box(H, R, 4.85, 4.18, 3.37, 2.54, 1.15, .13, 'blue', .72); box(H, R, 4.96, 4.28, 3.14, 2.31, 1.28, .06, 'paper', 1);
  for (const [i, j, w, d] of [[5.05, 4.36, 3, .19], [5.05, 4.36, .17, 2.12], [7.83, 4.36, .18, 2.12], [5.05, 6.3, 1.22, .18], [7.03, 6.3, .8, .18]]) box(H, R, i, j, w, d, 1.34, .72, 'paper', .95);
  for (let n = 0; n < 4; n++) {
    const i = 5.36 + n * .63;
    shape(H, R, H.faceI(i, 4.565, .42, 1.57, 1.94), 'blue', .45);
    H.line(R, [H.p(i + .21, 4.58, 1.58), H.p(i + .21, 4.58, 1.93)], 'sun', 1.1);
    box(H, R, i - .04, 4.52, .5, .15, 1.55, .045, 'sun', .6);
  }
  shape(H, R, H.faceJ(8.018, 4.76, .47, 1.56, 1.96), 'teal', .55);
  shape(H, R, H.faceJ(8.019, 5.58, .4, 1.41, 1.97), 'blue', .65);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(6.2, 4.75 + n * .25, 1.36), H.p(7.68, 4.75 + n * .25, 1.36)], 'sun', .7);
  for (const i of [6.27, 6.96, 7.59]) H.line(R, [H.p(i, 4.68, 1.36), H.p(i, 5.96, 1.36)], 'teal', .45);
  for (let n = 0; n < 6; n++) box(H, R, 5.4 + n * .12, 4.75, .12, .64, 1.35, .06 + n * .09, 'sun', .6);
  shape(H, R, [H.p(7.03, 5.48, 1.34), H.p(7.62, 5.48, 1.34), H.p(7.62, 6.2, 1.78), H.p(7.03, 6.2, 1.78)], 'coral', .45);
  for (const i of [5.16, 7.95]) for (const j of [4.47, 6.39]) { H.line(R, [H.p(i, j, 2.04), H.p(i, j, 2.22)], 'blue', 1.3); H.dot(...H.p(i, j, 2.22), 1, 'sun'); }
  H.line(R, [H.p(6.37, 5.8, 1.36), H.p(6.57, 5.8, 1.36)], 'blue', 2); for (let k = 0; k < 3; k++) H.line(R, [H.p(6.41 + k * .045, 5.74, 1.37), H.p(6.41 + k * .045, 5.86, 1.37)], 'paper', .6);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(6.32 + n * .15, 6.35, 1.85), H.p(6.32 + n * .15, 6.35, 2.08)], 'blue', .55);
  H.line(R, [H.p(6.29, 6.35, 2.09), H.p(6.96, 6.35, 2.09)], 'sun', 1);
  for (const [i, j] of [[6.58, 4.76], [6.95, 4.98], [6.35, 4.94]]) { const p = H.p(i, j, 1.38); H.line(R, [p, [p[0], p[1] - 10]], 'coral', .7); oval(H, R, p[0], p[1] - 11, 4, 5, 'teal', .5); }
  const lens = H.p(8.61, 5.13, 1.71); H.line(R, [H.p(8.65, 4.8, 1.16), H.p(8.65, 4.8, 1.81), lens], 'blue', 1.2); H.outline(R, ell(lens[0], lens[1], 9, 6), 'blue', 1.6); H.line(R, [[lens[0] - 4, lens[1] - 3], [lens[0] + 2, lens[1] + 2]], 'paper', 1);
  shape(H, R, H.tile(8.52, 4.05, 1.05, 1.95, 1.16), 'teal', .21); for (let n = 0; n < 3; n++) box(H, R, 8.8 + n * .07, 4.6 + n * .07, .5, .48, 1.18 + n * .09, .08, 'paper', 1);
  shape(H, R, [H.p(4.5, 6.6, 1.17), H.p(4.88, 6.6, 1.17), H.p(4.88, 6.15, 1.17)], 'teal', .5); metal(H, R, 5.4, 6.83, 2.55, .13, 1.16, .035, 'paper'); for (let n = 0; n < 17; n++) H.line(R, [H.p(5.5 + n * .14, 6.84, 1.21), H.p(5.5 + n * .14, 6.9, 1.21)], 'blue', .5);
  for (const i of [6.48, 6.67]) for (const j of [6.59, 6.78]) H.line(R, [H.p(i, j, 1.18), H.p(i, j, 1.35)], 'blue', .75);
  shape(H, R, H.tile(6.44, 6.55, .28, .29, 1.35), 'paper', 1, .5); shape(H, R, H.faceI(6.44, 6.55, .28, 1.35, 1.58), 'paper', 1, .5);
  shape(H, R, H.tile(9.01, 6.03, .53, .42, 1.18), 'blue', .2, .5); H.line(R, [H.p(9.02, 6.24, 1.19), H.p(9.52, 6.24, 1.19)], 'sun', .8);
  shape(H, R, [H.p(8.8, 8.1, .02), H.p(10.2, 8.1, .02), H.p(10.2, 8.45, .21), H.p(8.8, 8.45, .21)], 'paper', 1, .6);
  shape(H, R, [H.p(8.8, 8.45, .21), H.p(10.2, 8.45, .21), H.p(10.2, 8.8, .02), H.p(8.8, 8.8, .02)], 'sun', .35, .6);
  taskLight(H, R, 9.7, 3.9, 1.17, 'coral', -.5);
  for (const [i, j] of [[4.5, 6.7], [8.25, 6.85]]) { benchFrame(H, R, i - .55, j - .46, 1.1, .9, .63, 'teal'); cushion(H, R, i - .52, j - .44, 1.04, .85, .63, .08, 'coral'); }
  benchFrame(H, R, .8, 9.25, 3.9, 1.35, .8, 'sun');
  timber(H, R, .94, 9.37, 3.54, 1.08, .22, .11, 'teal');
  for (let n = 0; n < 4; n++) box(H, R, 1.12 + n * .67, 9.44, .53, .91, .34, .29, n % 2 ? 'paper' : 'teal', .55);
  box(H, R, 1.04, 9.4, .72, .47, .81, .19, 'coral', .56);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(1.08 + n * .23, 9.88, .86), H.p(1.08 + n * .23, 9.88, .98)], 'paper', .8);
  shape(H, R, [H.p(2.01, 9.41, .81), H.p(2.72, 9.43, .81), H.p(2.58, 9.95, 1.04), H.p(2.13, 9.92, .97)], 'blue', .45);
  H.line(R, [H.p(2.03, 9.42, .83), H.p(2.5, 9.58, 1.03), H.p(2.58, 9.95, 1.05)], 'paper', 1.3);
  for (const j of [9.4, 10.02]) { H.line(R, [H.p(3.05, j, .83), H.p(3.75, j, .83)], 'sun', 8); oval(H, R, ...H.p(3.75, j, .83), 4, 3, 'paper', 1); oval(H, R, ...H.p(3.75, j, .83), 2, 1.3, 'blue', .75); }
  for (const i of [3.96, 4.47]) timber(H, R, i, 9.42, .07, .09, .81, .72, 'teal');
  timber(H, R, 3.96, 9.42, .58, .09, 1.46, .07, 'sun');
  H.line(R, [H.p(4.2, 9.45, .86), H.p(4.2, 9.45, 1.44)], 'paper', 1.3);
  drape(H, R, 3.98, 9.9, .59, .46, .85, .27, 'coral');
  vessel(H, R, 5.2, 9.96, .02, 12, 24, 'teal');
  for (let n = 0; n < 5; n++) { const p = H.p(5.16 + n * .075, 9.96, .43); H.line(R, [p, [p[0] + (n - 2) * 3, p[1] - 17 - n % 2 * 5]], n % 2 ? 'sun' : 'paper', 2.3); }
  floorShadow(H, 8.8, 9.2, 2.4, 1.75);
  box(H, R, 8.9, 9.3, 2.2, 1.6, .04, .16, 'teal', .43);
  shape(H, R, H.tile(9.04, 9.44, 1.92, 1.31, .21), 'blue', .65);
  for (const i of [8.9, 10.97]) timber(H, R, i, 9.3, .13, 1.6, .17, .31, 'teal');
  timber(H, R, 8.9, 10.77, 2.2, .13, .17, .31, 'teal');
  shape(H, R, [H.p(8.9, 9.31, .48), H.p(11.1, 9.31, .48), H.p(11.1, 8.89, 1.53), H.p(8.9, 8.89, 1.53)], 'teal', .56);
  shape(H, R, [H.p(9.08, 9.25, .61), H.p(10.92, 9.25, .61), H.p(10.92, 8.96, 1.38), H.p(9.08, 8.96, 1.38)], 'paper', .82);
  for (const i of [9.03, 10.77]) H.line(R, [H.p(i, 9.35, .41), H.p(i, 9.07, 1.12)], 'sun', 2);
  for (const [i, j, w, d] of [[9.14, 9.54, .59, .84], [9.91, 9.55, .88, .41]]) { box(H, R, i, j, w, d, .24, .14, 'paper', 1); H.line(R, [H.p(i + .1, j + .1, .4), H.p(i + w - .08, j + d - .1, .4)], 'coral', 1.1); }
  H.line(R, [H.p(9.78, 10.91, .31), H.p(9.78, 11.03, .22), H.p(10.24, 11.03, .22), H.p(10.24, 10.91, .31)], 'blue', 2);
  for (const i of [9.15, 10.65]) metal(H, R, i, 10.82, .19, .1, .39, .12, 'sun');
  box(H, R, 10.08, 1.46, 1.27, 1.77, .04, .15, 'teal', .48);
  for (const j of [1.5, 3.06]) timber(H, R, 10.08, j, 1.27, .11, .18, .47, 'teal');
  for (const i of [10.1, 11.22]) timber(H, R, i, 1.53, .12, 1.55, .48, .15, 'sun');
  floorShadow(H, 10.3, 1.5, .85, 1.7); for (let n = 0; n < 4; n++) { const p = H.p(10.35 + n % 2 * .38, 1.8 + Math.floor(n / 2) * .43, 0); oval(H, R, p[0], p[1], 6, 3, 'teal', .45); H.line(R, [p, [p[0] - 4, p[1] - 52 - n * 4]], n % 2 ? 'paper' : 'sun', 9); oval(H, R, p[0] - 4, p[1] - 52 - n * 4, 5, 2.8, 'paper', 1); }
}, (H, R, t) => {
  const u = cycle(t, 24) * 24, lift = liftAt(u), hands = roof(H, R, lift);
  const a = H.p(4.5, 6.7, .01); student(H, R, ...a, 'teal', hands, 1, lift * 2);
  const b = H.p(8.25, 6.85, .01), point = ease(9.6, 11, u) * (1 - ease(13.8, 15.6, u)); student(H, R, ...b, 'coral', [[b[0] - 18, b[1] - 31], H.p(7.62 + (1 - point) * .8, 6.15 + (1 - point) * .5, 1.65)], -1);
  const flutter = Math.sin(u * Math.PI / 12) * .07; shape(H, R, [H.p(8.55, 5.95, 1.18), H.p(9.7, 5.95, 1.18), H.p(9.7, 6.67, 1.18 + flutter), H.p(8.55, 6.67, 1.18)], 'paper', 1, .6);
});
room.loopSeconds = 24;
room.stillTime = 12;
export default room;
