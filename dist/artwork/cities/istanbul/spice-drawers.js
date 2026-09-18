import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, benchFrame, drape, floorLight, cushion, bentTube } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, wallCourse, cornice, hangingRail, taskLight, wallRack, recessedFrame } from '../joinery.js';

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
    shape(H, R, [H.p(i + .07, j + .07, z + .56), H.p(i + w - .07, j + .07, z + .56), H.p(i + w - .1, j - .04, z + .98), H.p(i + .1, j - .04, z + .98)], 'sun', .48, .8);
    H.line(R, [H.p(i + .19, j - .02, z + .85), H.p(i + w - .19, j - .02, z + .85)], 'paper', 1.1);
    for (const a of [.28, w - .3]) { metal(H, R, i + a, j + .06, .1, .16, z + .54, .05, kind === 2 ? 'coral' : 'blue'); }

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
  wallCourse(H, R, 'ne', .1, 11.8, .55, 'sun');
  wallRack(H, R, 'nw', .6, 4.83, 2.5, .93, 1, 'sun', (P) => {
    for (let n = 0; n < 4; n++) {
      shape(H, R, [P(.21 + n * 1.16, .18), P(1.21 + n * 1.16, .18), P(1.21 + n * 1.16, .77), P(.21 + n * 1.16, .77)], 'paper', 1, .5);
      const [x, y] = P(.69 + n * 1.16, .38);
      if (n === 0) stroke(H, R, [[x - 9, y], [x - 7, y - 10], [x + 6, y - 13], [x + 9, y - 4], [x + 2, y + 2], [x - 2, y - 5], [x + 4, y - 7]], 'coral', 2.5);
      else if (n === 1) { for (let k = 0; k < 3; k++) shape(H, R, [[x - 7 + k * 4, y + 3], [x - 10 + k * 5, y - 8], [x - 3 + k * 4, y - 13], [x - 2 + k * 4, y - 2]], 'teal', .63, .65); }
      else if (n === 2) { for (let k = 0; k < 3; k++) { H.line(R, [[x - 8 + k * 5, y + 3], [x - 3 + k * 5, y - 11]], 'coral', 3.3); H.line(R, [[x - 7 + k * 5, y + 2], [x - 2 + k * 5, y - 10]], 'sun', .7); } }
      else { H.outline(R, ell(x, y - 4, 8, 7), 'sun', 2); H.line(R, [[x - 5, y - 7], [x + 5, y]], 'coral', 1.5); }
    }
  });
  recessedFrame(H, R, 'nw', 10.17, 1.25, 1.0, 1.88, 'coral', P => {
    for (let n = 0; n < 4; n++) H.line(R, [P(.2, .25 + n * .39), P(1.05, .25 + n * .39)], 'sun', 2.7);
    for (let n = 0; n < 3; n++) H.line(R, [P(.29 + n * .3, .22), P(.29 + n * .3, 1.6)], 'paper', 1.1);
  });
  cabinetFrame(H, R, 7.4, .28, 4.1, 1.25, .07, 3.35, 3, 'sun', (x, j, w, d, z, h, col) => {
    for (let row = 0; row < 3; row++) {
      const top = .73 + row * .77;
      timber(H, R, x, j, w, d, top, .09, 'sun');
      const [a, b] = H.p(x + w * .47, j + .62, top + .1);
      jar(H, R, a, b, .78 + col * .05, ['coral', 'sun', 'teal'][(row + col) % 3], col === 2);
      const [cx, cy] = H.p(x + w * .81, j + .76, top + .11);
      oval(H, R, cx, cy - 3, 4, 2.6, 'paper', 1);
      H.line(R, [[cx + 2, cy - 4], [cx + 8, cy - 9]], 'sun', 1.5);
      shape(H, R, H.faceI(x + .18, j + d + .02, .34, top - .07, top + .055), ['paper', 'coral', 'sun'][col], .85, .4);
      H.line(R, [H.p(x + .1, j + .75, top + .1), H.p(x + w - .1, j + .75, top + .1)], 'paper', .8);
    }
    drawer(H, R, x, j, w, d, .14, 'teal');
  });
  for (let col = 0; col < 3; col++) {
    const i = .65 + col * 1.93, highest = 2.25 - col * .45;
    shape(H, R, H.faceI(i + .05, .74, 1.76, .12, highest + .45), 'blue', .7, .8);
    for (const a of [i + .04, i + 1.73]) timber(H, R, a, .75, .13, 2.51, .1, .53, 'teal');
    timber(H, R, i, .76, 1.86, 2.61, .08, .13, 'teal');
    H.line(R, [H.p(i + .18, 3.37, .2), H.p(i + 1.67, 3.37, .2)], 'paper', .9);

    for (let row = 0; row < 3; row++) drawer(H, R, i, .8 + row * .8, 1.86, .78, highest - row * .45, ['sun', 'coral', 'teal'][col], row === 2, col);
    timber(H, R, i, .7, .12, .14, .06, highest + .49, 'sun');
    timber(H, R, i + 1.76, .7, .12, .14, .06, highest + .49, 'sun');
    shape(H, R, H.faceI(i + .17, 3.34, 1.5, .18, .62), 'blue', .5);
    const [x, y] = H.p(i + .96, 2.97, .24);
    shape(H, R, [[x - 13, y], [x + 13, y], [x + 11, y - 25], [x + 3, y - 31], [x - 5, y - 29], [x - 12, y - 20]], 'paper', 1, .65);
    H.line(R, [[x - 5, y - 26], [x + 6, y - 27]], 'coral', 1.5);
    H.line(R, [[x - 6, y - 8], [x - 7, y - 19]], 'sun', 1);
  }
  timber(H, R, 3.42, 4.24, 2.4, 1.56, .28, .11, 'teal');
  for (let n = 0; n < 2; n++) { drawer(H, R, 3.45 + n * 1.15, 4.3, 1.07, 1.38, .39, 'teal'); }
  benchFrame(H, R, 3.25, 4.08, 2.75, 1.9, 1.15, 'sun');
  metal(H, R, 3.41, 5.97, 2.46, .08, 1.02, .13, 'coral');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(3.52 + n * .56, 6.07, 1.04), H.p(3.74 + n * .56, 6.07, 1.04)], 'paper', 1.1);
  const [scaleX, scaleY] = H.p(3.91, 4.44, 1.19);
  oval(H, R, scaleX, scaleY, 15, 5, 'teal', .7);
  shape(H, R, [[scaleX - 5, scaleY], [scaleX + 6, scaleY], [scaleX + 3, scaleY - 28], [scaleX - 2, scaleY - 28]], 'sun', .7, .7);
  H.line(R, [[scaleX - 20, scaleY - 28], [scaleX + 20, scaleY - 30]], 'blue', 2);
  for (const side of [-1, 1]) { const xx = scaleX + side * 18; H.line(R, [[xx, scaleY - 29], [xx - 9, scaleY - 12], [xx + 9, scaleY - 12], [xx, scaleY - 29]], 'sun', .8); oval(H, R, xx, scaleY - 11, 10, 3.6, 'coral', .68); }
  H.dot(scaleX, scaleY - 29, 2.5, 'coral');

  shape(H, R, H.tile(5.12, 4.15, 1.25, 1.12, 1.17), 'teal', .24, .8);
  oval(H, R, ...H.p(5.7, 4.48, 1.18), 13, 6, 'blue', .55);
  timber(H, R, 5.23, 4.15, .54, .55, 1.17, .08, 'coral');
  for (let n = 0; n < 3; n++) H.line(R, [H.p(3.52 + n * .22, 4.53, 1.17), H.p(3.75 + n * .22, 5.2, 1.17)], 'coral', 3);
  const [sx, sy] = H.p(4.6, 5.45, 1.2); oval(H, R, sx, sy, 7, 3, 'paper', 1); H.line(R, [[sx + 5, sy - 1], [sx + 18, sy - 7]], 'sun', 2.4);
  H.line(R, [H.p(4.9, 5.26, 1.17), H.p(4.9, 5.57, 1.17)], 'blue', 2);
  timber(H, R, .94, 7.48, 3.1, 2.18, .2, .1, 'sun');
  for (let n = 0; n < 3; n++) drape(H, R, 1.03, 7.67, 1.26, 1.62, .34 + n * .11, .08, n === 1 ? 'coral' : 'paper');
  benchFrame(H, R, .7, 7.25, 3.6, 2.8, .75, 'teal');
  metal(H, R, 3.42, 7.4, .14, 2.1, .77, .07, 'blue');
  H.line(R, [H.p(3.49, 7.42, .88), H.p(3.49, 9.47, .88)], 'sun', 2.4);
  for (const j of [7.46, 9.37]) metal(H, R, 3.38, j, .24, .13, .76, .28, 'teal');
  const [fx, fy] = H.p(3.1, 9.18, .79);
  shape(H, R, [[fx - 11, fy - 15], [fx + 11, fy - 15], [fx + 3, fy - 2], [fx + 3, fy + 6], [fx - 2, fy + 5], [fx - 2, fy - 2]], 'sun', .7, .7);
  oval(H, R, fx, fy - 15, 11, 4, 'paper', 1);
  const [qx, qy] = H.p(2.73, 9.63, .8);
  shape(H, R, [[qx - 9, qy], [qx + 10, qy], [qx + 8, qy - 15], [qx + 4, qy - 18], [qx - 6, qy - 17], [qx - 10, qy - 9]], 'coral', .62, .6);
  H.line(R, [[qx - 5, qy - 17], [qx + 6, qy - 16]], 'paper', 1.5);
  H.line(R, [[qx, qy - 15], [qx + 2, qy - 3]], 'teal', .8);
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
  for (const i of [10.35, 11.22]) bentTube(H, R, [[i, 2.25, .05], [i - .25, .93, 2.63]], 2.2, 'sun');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(10.31 - n * .04, 2.05 - n * .18, .35 + n * .37), H.p(11.19 - n * .04, 2.05 - n * .18, .35 + n * .37)], 'sun', 2.8);
  benchFrame(H, R, 9.0, 6.67, 2.37, 2.67, .46, 'sun');
  for (let n = 0; n < 2; n++) {
    const [x, y] = H.p(9.67 + n * .9, 7.67, .5);
    shape(H, R, [[x - 16, y], [x + 15, y], [x + 18, y - 27], [x + 9, y - 35], [x - 9, y - 34], [x - 18, y - 23]], n ? 'paper' : 'teal', n ? 1 : .5, .8);
    oval(H, R, x, y - 32, 10, 3.2, 'blue', .7);
    stroke(H, R, [[x - 12, y - 25], [x - 9, y - 14], [x - 11, y - 3]], 'sun', 1.1);
    H.line(R, [[x - 9, y - 31], [x + 10, y - 31]], 'coral', 2);
  }
  metal(H, R, 9.2, 8.48, 1.75, .62, .49, .12, 'teal');
  const [brx, bry] = H.p(10.05, 8.84, .63);
  H.line(R, [[brx - 14, bry], [brx + 11, bry - 4]], 'sun', 4);
  for (let n = 0; n < 7; n++) H.line(R, [[brx - 13 + n * 3, bry + 1], [brx - 12 + n * 3, bry + 7]], 'blue', .7);
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
