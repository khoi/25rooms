import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, vessel, benchFrame, drape, floorLight, cushion } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, wallCourse, cornice, hangingRail, taskLight } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
const pose = { ...FIGURES.clips.idle.keys[0][1], head: 8 };
FIGURES.clips.istanbulSpiceHands = { dur: 24, keys: [[0, pose], [1, pose]] };
function aim(H, i, j, targets) {
  const p = H.p(i, j), s = 1.85;
  for (const [n, q] of targets.entries()) {
    const side = n ? 'r' : 'l', dx = (q[0] - p[0]) / s - (n ? 5.2 : -5.2), dy = (q[1] - p[1]) / s + 32.5;
    const d = Math.min(8.48, Math.max(.4, Math.hypot(dx, dy))), e = Math.acos(Math.max(-1, Math.min(1, (d * d - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2))));
    pose['a' + side] = (Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(e), 4.368 + 4.2 * Math.cos(e))) * 180 / Math.PI;
    pose['e' + side] = e * 180 / Math.PI;
  }
}
function jar(H, R, x, y, size, ink, leaf = false) {
  const P = (a, b) => [x + a * size, y + b * size];
  shape(H, R, [P(-7, 0), P(7, 0), P(8, -18), P(5, -23), P(-5, -23), P(-8, -18)], 'paper', 1, .6);
  shape(H, R, [P(-5, -2), P(5, -2), P(6, -16), P(-6, -16)], ink, .56, .4);
  if (leaf) for (let n = 0; n < 3; n++) stroke(H, R, [P(-3 + n * 3, -3), P(-4 + n * 3, -12), P(2 + n, -15)], 'blue', .7);
  H.line(R, [P(-5, -21), P(5, -21)], 'sun', 4 * size);
  H.line(R, [P(-4, -17), P(-4, -5)], 'paper', 1.2);
  oval(H, R, x, y - 23 * size, 6 * size, 2 * size, 'coral', .7);
}
function drawer(H, R, i, j, w, d, z, ink, open = false, kind = 0) {
  timber(H, R, i, j, w, d, z, .52, 'sun');
  shape(H, R, H.faceI(i + .08, j + d + .01, w - .16, z + .08, z + .44), 'sun', .37, .7);
  const [x, y] = H.p(i + w / 2, j + d + .03, z + .3);
  H.line(R, [[x - 4, y], [x + 4, y]], 'blue', 2.4);
  H.line(R, [[x - 3, y - 1], [x + 3, y - 1]], 'paper', .8);
  shape(H, R, H.tile(i + .07, j + .08, w - .14, d - .16, z + .53), ink, .65, .6);
  if (open) {
    shape(H, R, H.tile(i + .15, j + .16, w - .3, d - .3, z + .54), 'blue', .55);
    for (let k = 0; k < 7; k++) {
      const p = H.p(i + .3 + (k % 3) * .38, j + .3 + Math.floor(k / 3) * .31, z + .57);
      if (kind === 0) { H.line(R, [[p[0] - 5, p[1]], [p[0] + 5, p[1] - 3]], 'coral', 3); H.line(R, [[p[0] - 4, p[1] - 1], [p[0] + 5, p[1] - 4]], 'sun', .6); }
      else if (kind === 1) shape(H, R, [[p[0] - 4, p[1] - 4], [p[0] + 5, p[1] - 1], [p[0], p[1] + 4], [p[0] - 1, p[1]]], 'coral', .85, .5);
      else oval(H, R, ...p, 3, 1.5, 'sun', .85);
    }
  }
}
const room = world('istanbul-spice-drawers', 'A lid for every scent', { floor: 'paper', tone: .5, wall: 'teal', wallTone: .34, height: 3.7, pattern: 'tiles', head: 30 }, (H, R) => {
  wallCourse(H, R, 'nw', .1, 11.8, .65, 'coral');
  cornice(H, R, 'ne', 0, 12, 3.62, 'sun');
  windowBay(H, R, 'nw', 5.9, 3.8, 1.5, 1.8, { divisions: 2 });
  cabinetFrame(H, R, 7.4, .28, 4.1, 1.25, .07, 3.35, 3, 'sun', (x, j, w, d, z, h, col) => {
    for (let row = 0; row < 3; row++) {
      const top = .73 + row * .77;
      timber(H, R, x, j, w, d, top, .09, 'sun');
      const [a, b] = H.p(x + w * .47, j + .62, top + .1);
      jar(H, R, a, b, .78 + col * .05, ['coral', 'sun', 'teal'][(row + col) % 3], col === 2);
      H.line(R, [H.p(x + .1, j + .75, top + .1), H.p(x + w - .1, j + .75, top + .1)], 'paper', .8);
    }
    drawer(H, R, x, j, w, d, .14, 'teal');
  });
  for (let col = 0; col < 3; col++) {
    const i = .65 + col * 1.93, highest = 2.25 - col * .45;
    for (let row = 0; row < 3; row++) drawer(H, R, i, .8 + row * .8, 1.86, .78, highest - row * .45, ['sun', 'coral', 'teal'][col], row === 2, col);
    timber(H, R, i, .7, .12, .14, .06, highest + .49, 'sun');
    timber(H, R, i + 1.76, .7, .12, .14, .06, highest + .49, 'sun');
    shape(H, R, H.faceI(i + .17, 3.34, 1.5, .18, .62), 'blue', .5);
    const [x, y] = H.p(i + .96, 2.97, .24);
    shape(H, R, [[x - 13, y], [x + 13, y], [x + 11, y - 25], [x + 3, y - 31], [x - 5, y - 29], [x - 12, y - 20]], 'paper', 1, .65);
    H.line(R, [[x - 5, y - 26], [x + 6, y - 27]], 'coral', 1.5);
    H.line(R, [[x - 6, y - 8], [x - 7, y - 19]], 'sun', 1);
  }
  benchFrame(H, R, 3.25, 4.08, 2.75, 1.9, 1.15, 'sun');
  shape(H, R, H.tile(5.12, 4.15, 1.25, 1.12, 1.17), 'teal', .24, .8);
  oval(H, R, ...H.p(5.7, 4.48, 1.18), 13, 6, 'blue', .55);
  timber(H, R, 5.23, 4.15, .54, .55, 1.17, .08, 'coral');
  for (let n = 0; n < 3; n++) H.line(R, [H.p(3.52 + n * .22, 4.53, 1.17), H.p(3.75 + n * .22, 5.2, 1.17)], 'coral', 3);
  const [sx, sy] = H.p(4.6, 5.45, 1.2); oval(H, R, sx, sy, 7, 3, 'paper', 1); H.line(R, [[sx + 5, sy - 1], [sx + 18, sy - 7]], 'sun', 2.4);
  H.line(R, [H.p(4.9, 5.26, 1.17), H.p(4.9, 5.57, 1.17)], 'blue', 2);
  benchFrame(H, R, .7, 7.25, 2.7, 2.4, .75, 'teal');
  for (let n = 0; n < 4; n++) shape(H, R, H.tile(.96 + n * .02, 7.53 - n * .015, 1.35, 1.3, .78 + n * .025), 'paper', 1, .45);
  const [px, py] = H.p(2.45, 8.15, .8); oval(H, R, px, py, 8, 5, 'coral', .6); oval(H, R, px, py - 7, 8, 5, 'sun', .75); H.line(R, [[px - 4, py - 6], [px - 4, py + 1]], 'blue', .6);
  stroke(H, R, [[px + 5, py - 2], [px + 14, py + 6], [px + 6, py + 14], [px + 13, py + 19]], 'blue', .7);
  drape(H, R, 1.6, 8.8, .85, .46, .8, .3, 'coral');
  hangingRail(H, R, 'ne', 1.1, 4.9, 3.37, 4, (P, u, n) => {
    const [x, y] = P(u, -.15);
    if (n === 0) { oval(H, R, x, y + 8, 8, 5, 'coral', .7); H.line(R, [[x - 4, y + 8], [x + 4, y + 9]], 'paper', .8); }
    else { H.line(R, [[x, y], [x + 1, y + 14]], 'sun', 1.6); oval(H, R, x + 1, y + 16, 5, 3, n === 3 ? 'paper' : 'teal', .8); }
  });
  for (let k = 0; k < 3; k++) { const [x, y] = H.p(10.1 + k * .37, 2.0, .6); shape(H, R, [[x - 6, y - 17], [x + 6, y - 13], [x + 1, y + 4]], 'paper', 1, .6); }
  timber(H, R, 9.45, 2.2, 1.8, .8, .04, .16, 'sun');
  drape(H, R, 9.55, 2.25, 1.2, .65, .22, .13, 'paper');
  for (let n = 0; n < 3; n++) {
    const x = .86 + n * 1.93;
    timber(H, R, x, 2.9, .12, .15, .08, .75 - n * .15, 'sun');
    timber(H, R, x + 1.4, 2.9, .12, .15, .08, .75 - n * .15, 'sun');
    shape(H, R, H.tile(x + .05, 1.12, .9, .56, 2.8 - n * .45), 'paper', .85, .5);
    const [ax, ay] = H.p(x + .45, 1.42, 2.82 - n * .45);
    if (n === 0) H.outline(R, ell(ax, ay, 9, 4), 'coral', .8, { tone: .55 });
    else { oval(H, R, ax, ay, 7, 3, n === 1 ? 'coral' : 'teal', .68); H.line(R, [[ax, ay - 2], [ax + 4, ay - 5]], 'blue', .65); }
  }
  taskLight(H, R, 3.7, 4.2, 1.2, 'coral', .75);
  floorLight(H, 5.5, 5.5, 110, .35);
}, (H, R, t) => {
  const u = cycle(t, 24) * 24, pull = ease(0, 4.8, u) * (1 - ease(19, 22, u)), open = ease(4.8, 9.6, u) * (1 - ease(14.4, 18.8, u));
  const j = 4.48 + pull * .35, [x, y] = H.p(5.7, j, 1.19);
  vessel(H, R, 5.7, j, 1.19, 12, 7, 'paper');
  oval(H, R, x, y - 7, 8, 2.7, 'coral', .8);
  for (let n = 0; n < 5; n++) H.line(R, [[x - 5 + n * 2.4, y - 8], [x - 3 + n * 2, y - 6]], 'sun', .85);
  const lx = x + open * 18, ly = y - 8 - open * 9;
  aim(H, 6.4, 4.95, [[x - 8, y - 2], [lx + 3, ly - 3]]);
  actor(H, R, 6.4, 4.95, t, 'istanbulSpiceHands', { shirt: ['paper', 1], apron: ['coral', .7], hairStyle: 'short' }, 0, 1.85);
  oval(H, R, lx, ly, 13, 4.5, 'teal', .72);
  oval(H, R, lx + 1, ly - 4, 3.2, 2.5, 'sun', .85);
  H.line(R, [[lx - 8, ly + 1], [lx - 3, ly + 2]], 'paper', 1);
  actor(H, R, 5.6, 7.9, t, 'think', { face: 'sw', shirt: ['teal', .65], hairStyle: 'pony' }, 0, 1.6);
});
room.loopSeconds = 24;
room.stillTime = 11.5;
export default room;
