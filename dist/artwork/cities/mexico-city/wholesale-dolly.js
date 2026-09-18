import { world, shape, oval, stroke, box, ell, loop, TAU } from '../../worlds/common.js';
import { timber, metal, bentTube, spokedWheel, drape, vessel, pendant } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, hangingRail, panelFront } from '../joinery.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };

function crate(H, R, i, j, z, w = 1.55, d = 1.13, h = .85, ink = 'sun', tilt = 0) {
  const P = (a, b, c) => H.p(i + a * Math.cos(tilt) - c * Math.sin(tilt), j + b, z + a * Math.sin(tilt) + c * Math.cos(tilt));
  shape(H, R, [P(0, 0, 0), P(w, 0, 0), P(w, d, 0), P(0, d, 0)], ink, .44, .7);
  for (const b of [0, d]) {
    for (const a of [0, w - .13]) shape(H, R, [P(a, b, 0), P(a + .13, b, 0), P(a + .13, b, h), P(a, b, h)], ink, .65, .65);
    for (const c of [.08, .34, .62]) shape(H, R, [P(0, b, c), P(w, b, c), P(w, b, c + .16), P(0, b, c + .16)], ink, .5, .65);
    H.line(R, [P(.21, b, h), P(w - .21, b, h)], 'paper', 1.5);
  }
  for (const a of [0, w]) for (const c of [.08, .34, .62]) shape(H, R, [P(a, 0, c), P(a, d, c), P(a, d, c + .16), P(a, 0, c + .16)], ink, .5, .6);
  for (const a of [.07, w - .07]) for (const c of [.16, .69]) H.dot(...P(a, d + .015, c), 1, 'blue');
  shape(H, R, [P(w - .25, d + .03, .1), P(w, d + .03, .1), P(w, d + .03, .72), P(w - .1, d + .03, .72), P(w - .1, d + .03, .23), P(w - .25, d + .03, .23)], 'teal', .6, .5);
  return [P(.2, d, .7), P(w - .17, d, .7)];
}
function person(H, R, foot, hands, shirt = 'teal', scale = 1, head = 0) {
  const [x, y] = foot, P = (a, b) => [x + a * scale, y + b * scale];
  oval(H, R, x + 2, y + 2, 14 * scale, 4 * scale, 'blue', .18);
  for (const s of [-1, 1]) {
    stroke(H, R, [P(s * 5, -29), P(s * 6, -14), P(s * 8, -1)], 'blue', 6 * scale);
    oval(H, R, ...P(s * 8 + 2, 0), 5 * scale, 2.5 * scale, 'blue', .9);
  }
  shape(H, R, loop([P(-8, -56), P(8, -55), P(10, -28), P(-9, -28)], 1), shirt, .65, .9);
  H.line(R, [P(-6, -30), P(7, -30)], 'paper', .65);
  oval(H, R, ...P(head, -66), 7.5 * scale, 8 * scale, 'coral', .3);
  shape(H, R, [P(-8 + head, -67), P(-7 + head, -73), P(head, -76), P(7 + head, -71), P(8 + head, -66), P(head, -69), P(-5 + head, -64)], 'blue', .86, .5);
  H.dot(...P(3 + head, -66), .8 * scale, 'blue');
  H.line(R, [P(2 + head, -61), P(5 + head, -61)], 'blue', .5);
  hands.forEach((hand, n) => {
    const s = n ? 1 : -1, sh = P(s * 6, -52), el = [(sh[0] + hand[0]) / 2 + s * 5, (sh[1] + hand[1]) / 2 + 8];
    stroke(H, R, [sh, el, hand], 'blue', 5.8 * scale);
    stroke(H, R, [sh, el, hand], shirt, 4.2 * scale);
    oval(H, R, ...hand, 2.4 * scale, 2 * scale, 'coral', .38);
  });
}

const room = world('mexico-city-wholesale-dolly', 'The stack clears the wheel', { wall: false, floor: 'paper', tone: 1, head: 70 }, (H, R) => {
  masonry(H, R, 'ne', 0, 12, 0, 4.7, 'paper', .65);
  masonry(H, R, 'nw', 0, 12, 0, 3.6, 'coral', .25);
  for (const j of [3, 6, 9]) H.line(R, [H.p(.1, j, .025), H.p(11.9, j, .025)], 'blue', .8, { tone: .25 });
  for (const i of [3, 6, 9]) H.line(R, [H.p(i, .1, .025), H.p(i, 11.9, .025)], 'blue', .8, { tone: .25 });
  for (const z of [4.35, 4.65]) bentTube(H, R, [[.1, .15, z], [11.9, .15, z]], 3.1, 'blue');
  for (let i = .2; i < 11; i += 1.8) H.line(R, [H.p(i, .15, 4.35), H.p(i + .9, .15, 4.68), H.p(i + 1.8, .15, 4.35)], 'blue', 2);
  windowBay(H, R, 'nw', 1.1, 5.4, 2.25, 1.12, { ink: 'teal', divisions: 4 });
  for (const j of [10.25, 10.45]) metal(H, R, .15, j, 11.7, .09, .015, .055, 'blue');
  for (let i = .3; i < 11.8; i += .2) H.line(R, [H.p(i, 10.65, .025), H.p(i, 10.93, .025)], 'blue', .7);
  rackFrame(H, R, 3.3, .55, 7.85, 1.65, .12, [.05, 1.35, 2.75], 'teal', (i, j, w, d, z, row) => {
    for (let n = 0; n < 4; n++) {
      crate(H, R, i + .16 + n * 1.89, j + .15, z, 1.52, 1.21, .85, n === 2 && row === 1 ? 'coral' : 'sun');
      if (row === 0 && n < 2) for (let k = 0; k < 4; k++) { const p = H.p(i + .45 + n * 1.89 + (k % 2) * .59, j + .45 + Math.floor(k / 2) * .53, z + .91); oval(H, R, ...p, 10, 8, n ? 'teal' : 'coral', .65); H.line(R, [[p[0], p[1] - 7], [p[0] + 1, p[1] - 12]], 'sun', 1.7); }
    }
  });
  for (const i of [3.24, 11.1]) metal(H, R, i - .16, .48, .32, 1.85, .06, .48, 'coral');
  drape(H, R, 8.72, .8, 1.1, .95, 4.1, .21, 'paper');
  stroke(H, R, [H.p(9.22, .95, 4.21), H.p(9.45, 1.5, 4.23)], 'coral', 2);
  bentTube(H, R, [[1.12, .42, 3.8], [1.12, 2.12, 3.8]], 3, 'blue');
  const p = H.p(1.12, 2.08, 3.65);
  H.line(R, [p, [p[0], p[1] + 37]], 'blue', 1.1);
  oval(H, R, p[0], p[1] + 22, 14, 14, 'paper', 1);
  H.line(R, [[p[0], p[1] + 22], [p[0] + 8, p[1] + 18]], 'coral', 1.5);
  for (let n = 0; n < 8; n++) H.dot(p[0] + Math.cos(n * TAU / 8) * 11, p[1] + 22 + Math.sin(n * TAU / 8) * 11, .8, 'blue');
  for (const dx of [-12, 12]) H.line(R, [[p[0], p[1] + 36], [p[0] + dx, p[1] + 55]], 'blue', .8);
  oval(H, R, p[0], p[1] + 56, 18, 5, 'teal', .6);
  pendant(H, R, 7, 2.1, 4.5, 3.65, 'coral', .7);
  for (let n = 0; n < 5; n++) timber(H, R, .65 + n * .29, 6.8, .23, 2.25, .14, .12, 'sun');
  for (const j of [6.95, 8.72]) timber(H, R, .59, j, 1.53, .2, .02, .12, 'sun');
  bentTube(H, R, [[1.55, 3.05, .12], [1.55, 3.05, 2.12], [2.5, 3.05, 2.12], [2.5, 3.05, .12]], 2.7, 'teal');
  for (const z of [.48, .95, 1.4]) bentTube(H, R, [[1.55, 3.05, z], [2.5, 3.05, z]], 2.5, 'teal');
  metal(H, R, 1.4, 3.05, 1.22, .66, .1, .1, 'teal');
  for (const i of [1.55, 2.5]) spokedWheel(H, R, ...H.p(i, 3.13, .18), 8, 'blue');
  timber(H, R, 3.2, 5.08, 1.5, 1.65, .04, .62, 'sun');
  for (const z of [.15, .42]) H.line(R, [H.p(3.2, 6.75, z), H.p(4.7, 6.75, z)], 'coral', .6);
  for (const j of [4.6, 6.64]) {
    bentTube(H, R, [[5.04, j, .38], [8.16, j, .38]], 4, 'blue');
    for (const i of [5.25, 7.91]) spokedWheel(H, R, ...H.p(i, j, .24), 9, i === 7.91 && j === 6.64 ? 'coral' : 'teal', 0, .83);
  }
  for (let n = 0; n < 6; n++) timber(H, R, 4.98 + n * .55, 4.45, .5, 2.55, .51, .15, 'sun');
  metal(H, R, 5.01, 6.96, 3.2, .12, .52, .3, 'blue');
  for (const i of [5.13, 8.07]) bentTube(H, R, [[i, 6.78, .65], [i, 7.15, 2.08]], 3.1, 'blue');
  bentTube(H, R, [[5.13, 7.15, 2.08], [8.07, 7.15, 2.08]], 3.4, 'teal');
  drape(H, R, 5.82, 4.57, .59, 1.85, .7, .1, 'coral');
  box(H, R, 7.72, 7.01, .48, .43, .02, .18, 'sun', .55);
  metal(H, R, 4.9, 5.2, .16, 1.48, .64, .34, 'teal');
  drape(H, R, 4.88, 5.22, .22, 1.44, .99, .2, 'paper');
  for (let k = 0; k < 3; k++) { shape(H, R, H.tile(3.45 + k * .27, 9.03, 1.05, .78, .08 + k * .035), 'paper', 1, .6); H.line(R, [H.p(3.55 + k * .27, 9.14, .09 + k * .035), H.p(4.15 + k * .27, 9.5, .09 + k * .035)], 'teal', .65); }
  timber(H, R, 9.37, 9.42, 1.9, 1, .67, .14, 'sun');
  for (const i of [9.51, 10.96]) for (const j of [9.54, 10.2]) timber(H, R, i, j, .13, .13, .03, .64, 'teal');
  drape(H, R, 9.48, 9.45, .78, .87, .84, .32, 'coral');
  vessel(H, R, 10.8, 9.95, .84, 6, 20, 'teal', false);
  const pic = H.faceI(10.19, .36, .66, 4.03, 4.55); shape(H, R, pic, 'paper', 1, .55); oval(H, R, ...H.p(10.52, .38, 4.22), 5, 5, 'coral', .7);
}, (H, R, t) => {
  const u = ((t % 20) + 20) % 20, lift = ease(4, 8, u) * (1 - ease(12, 18, u));
  const hands = crate(H, R, 3.2 + lift * 1.52, 5.08, .69 + lift * .3, 1.55, 1.5, .85, 'sun', lift * -.26);
  const left = H.p(4.5 + lift * 1.52, 7.3, .02);
  person(H, R, left, [hands[0], hands[1]], 'coral', 1.22, lift);
  const handle = H.p(8.07, 7.15, 2.08), right = H.p(8.7, 7.2, .02);
  person(H, R, right, [[handle[0] - 15, handle[1]], handle], 'teal', 1.05, -lift);
  const p = H.p(6.31, 6.65, 1.1), sway = Math.sin(u * TAU / 20) * 4;
  stroke(H, R, [p, [p[0] + 4, p[1] + 12], [p[0] + sway, p[1] + 23]], 'coral', 3);
  shape(H, R, [[p[0] - 3, p[1] - 3], [p[0] + 4, p[1] - 3], [p[0] + 4, p[1] + 3], [p[0] - 3, p[1] + 3]], 'paper', 1, .5);
});
room.loopSeconds = 20;
room.stillTime = 9.4;
export default room;
