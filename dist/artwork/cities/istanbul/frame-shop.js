import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape, cushion, bentTube, floorLight } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cornice, taskLight, hangingRail, caster, wallRack, recessedFrame } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
const pose = { ...FIGURES.clips.idle.keys[0][1], head: 9 };
FIGURES.clips.istanbulFrameHands = { dur: 20, keys: [[0, pose], [1, pose]] };
function aim(H, i, j, targets) {
  const p = H.p(i, j), s = 1.85;
  for (const [n, q] of targets.entries()) {
    const side = n ? 'r' : 'l', dx = (q[0] - p[0]) / s - (n ? 5.2 : -5.2), dy = (q[1] - p[1]) / s + 32.5;
    const d = Math.min(8.48, Math.max(.4, Math.hypot(dx, dy))), e = Math.acos(Math.max(-1, Math.min(1, (d * d - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2))));
    pose['a' + side] = (Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(e), 4.368 + 4.2 * Math.cos(e))) * 180 / Math.PI;
    pose['e' + side] = e * 180 / Math.PI;
  }
}
function moulding(H, R, i, j, w, d, z, ink = 'sun') {
  const P = (x, y, a = 0) => H.p(i + x, j + y, z + a), o = .18;
  for (const poly of [[P(0, 0), P(w, 0), P(w - o, o), P(o, o)], [P(w, 0), P(w, d), P(w - o, d - o), P(w - o, o)], [P(w, d), P(0, d), P(o, d - o), P(w - o, d - o)], [P(0, d), P(0, 0), P(o, o), P(o, d - o)]]) shape(H, R, poly, ink, .62, .85);
  H.line(R, [P(0, d), P(0, d, -.13), P(w, d, -.13), P(w, d)], 'blue', 1.4);
  H.line(R, [P(w, 0), P(w, 0, -.13), P(w, d, -.13)], 'blue', 1.1);
  H.outline(R, [P(o, o), P(w - o, o), P(w - o, d - o), P(o, d - o)], 'paper', 1.5);
  H.outline(R, [P(.06, .06), P(w - .06, .06), P(w - .06, d - .06), P(.06, d - .06)], 'coral', .6);
  for (const [a, b, dx, dy] of [[0, 0, 1, 1], [w, 0, -1, 1], [w, d, -1, -1], [0, d, 1, -1]]) {
    H.line(R, [P(a + dx * .025, b + dy * .025), P(a + dx * .19, b + dy * .19)], 'blue', .9);
    H.line(R, [P(a + dx * .3, b + dy * .045), P(a + dx * .37, b + dy * .045)], 'paper', 1.2);
  }
  H.line(R, [P(.26, d - .045), P(w - .26, d - .045)], 'sun', .8);
  shape(H, R, [P(w - .06, d - .03), P(w - .15, d - .13), P(w - .2, d - .09)], 'paper', 1, .45);
}
function print(H, R, i, j, w, d, z, tiny = false) {
  shape(H, R, H.tile(i, j, w, d, z), 'paper', 1, .7);
  shape(H, R, [H.p(i + w * .12, j + d * .76, z + .01), H.p(i + w * .42, j + d * .16, z + .01), H.p(i + w * .73, j + d * .78, z + .01)], 'coral', .8, .55);
  shape(H, R, [H.p(i + w * .43, j + d * .79, z + .012), H.p(i + w * .64, j + d * .39, z + .012), H.p(i + w * .92, j + d * .71, z + .012)], 'teal', .72, .5);
  const pts = Array.from({ length: 30 }, (_, n) => { const a = n / 30 * Math.PI * 2; return H.p(i + w * .75 + Math.cos(a) * w * .12, j + d * .25 + Math.sin(a) * d * .14, z + .014); });
  shape(H, R, pts, 'sun', .85, .4);
  if (!tiny) H.line(R, [H.p(i + w * .1, j + d * .87, z + .015), H.p(i + w * .85, j + d * .87, z + .015)], 'blue', .8);
}
const room = world('istanbul-frame-shop', 'A picture finds its edge', { floor: 'paper', tone: .55, wall: 'paper', wallTone: .75, height: 3.8, head: 35, pattern: 'tiles' }, (H, R) => {
  cornice(H, R, 'nw', 0, 12, 3.72, 'coral');
  windowBay(H, R, 'nw', 3.75, 5.5, 1.31, 2.12, { divisions: 3 });
  recessedFrame(H, R, 'nw', .55, 2.23, .12, 3.18, 'teal', P => {
    shape(H, R, [P(.13, .14), P(2.07, .14), P(2.07, 3.0), P(.13, 3.0)], 'coral', .14, .8);
    for (const z of [.33, 1.72]) shape(H, R, [P(.32, z), P(1.88, z), P(1.88, z + 1.02), P(.32, z + 1.02)], 'paper', .6, .6);
    const [x, y] = P(1.84, 1.5); H.line(R, [[x, y - 5], [x, y + 6]], 'sun', 2.2); H.dot(x, y + 11, 1, 'blue');
  });
  wallRack(H, R, 'nw', 9.66, 1.88, 1.66, 1.76, 2, 'sun', (P, z, row) => {
    for (let n = 0; n < 2; n++) {
      const u = .23 + n * .81;
      shape(H, R, [P(u, z + .16), P(u + .63, z + .16), P(u + .63, z + .69), P(u, z + .69)], 'paper', 1, .6);
      H.line(R, [P(u + .1, z + .23), P(u + .1, z + .6), P(u + .49, z + .6)], row ? 'coral' : 'teal', 3.2);
      H.line(R, [P(u + .2, z + .25), P(u + .2, z + .49), P(u + .48, z + .49)], 'sun', 1.7);
    }
  });
  for (let n = 0; n < 3; n++) { timber(H, R, .41, 4.05, .92, 2.55, .2 + n * .17, .09, 'sun'); H.line(R, [H.p(1.35, 4.38, .23 + n * .17), H.p(1.35, 6.21, .23 + n * .17)], 'paper', .9); }
  benchFrame(H, R, .22, 3.78, 1.31, 3.19, .88, 'teal');
  for (let n = 0; n < 3; n++) shape(H, R, H.tile(.38 + n * .025, 3.95 + n * .025, .94, 2.39, .9 + n * .023), n === 0 ? 'coral' : 'paper', n ? 1 : .4, .55);
  H.line(R, [H.p(.71, 4.07, 1.02), H.p(.71, 6.54, 1.02)], 'blue', 3);
  H.line(R, [H.p(.74, 4.09, 1.02), H.p(.74, 6.54, 1.02)], 'sun', 1.2);
  metal(H, R, .53, 5.03, .43, .35, 1.03, .13, 'coral');
  const [sqx, sqy] = H.p(.95, 6.65, .93);
  shape(H, R, [[sqx - 13, sqy + 2], [sqx + 10, sqy + 2], [sqx - 13, sqy - 16]], 'sun', .68, .75);
  shape(H, R, [[sqx - 8, sqy - 2], [sqx, sqy - 2], [sqx - 8, sqy - 8]], 'paper', 1, .5);
  cabinetFrame(H, R, 7.75, .26, 3.7, 1.35, .08, 3.32, 3, 'teal', (x, j, w, d, z, h, n) => {
    if (n === 0) {
      for (let k = 0; k < 5; k++) { timber(H, R, x + .13 + k * .16, j + .27, .1, .19, .28, 2.7 - k * .12, k % 2 ? 'coral' : 'sun'); H.line(R, [H.p(x + .15 + k * .16, j + .49, .35), H.p(x + .15 + k * .16, j + .49, 2.65 - k * .12)], 'paper', .7); }
    } else if (n === 1) {
      for (let k = 0; k < 6; k++) { shape(H, R, H.faceI(x + .1, j + .15 + k * .15, w - .15, .27, 1.55 + (k % 2) * .15), ['paper', 'sun', 'coral'][k % 3], k % 3 ? .25 : 1, .55); }
      timber(H, R, x, j, w, d, 1.85, .08, 'sun');
      for (let k = 0; k < 3; k++) metal(H, R, x + .11, j + .05, w - .18, d - .12, 1.97 + k * .23, .18, 'paper');
    } else {
      for (const zt of [.65, 1.23, 1.82, 2.43]) { timber(H, R, x, j, w, d, zt, .08, 'sun'); for (let k = 0; k < 3; k++) shape(H, R, H.tile(x + .07, j + .09, w - .1, d - .12, zt + .12 + k * .028), 'paper', 1, .4); }
    }
  });
  for (let n = 0; n < 3; n++) {
    const i = 8.0 + n * 1.09;
    shape(H, R, H.faceI(i, 1.65, .94, .2, .49), 'sun', .48, .6);
    H.line(R, [H.p(i + .3, 1.67, .36), H.p(i + .63, 1.67, .36)], 'blue', 1.8);
  }
  for (let n = 0; n < 5; n++) {
    const i = .8 + n * 1.28, z = 3.07 - (n % 2) * .38;
    timber(H, R, i, .28, .14, .17, z - .8, .85, n % 2 ? 'coral' : 'sun');
    timber(H, R, i, .28, .84, .17, z - .08, .14, n % 2 ? 'coral' : 'sun');
    H.line(R, [H.p(i + .05, .48, z - .75), H.p(i + .05, .48, z), H.p(i + .78, .48, z)], 'paper', 1);
    H.line(R, [H.p(i, .5, z - .08), H.p(i + .14, .5, z + .02)], 'blue', .7);
  }
  timber(H, R, 2.59, 3.46, 5.19, 3.31, .32, .1, 'teal');
  for (let n = 0; n < 3; n++) {
    const z = .45 + n * .17;
    timber(H, R, 2.71, 3.65, 2.08, 2.85, z, .12, 'paper');
    H.line(R, [H.p(2.9, 6.54, z + .06), H.p(4.55, 6.54, z + .06)], n === 1 ? 'coral' : 'teal', 1.2);
  }
  for (let n = 0; n < 4; n++) timber(H, R, 5.09 + n * .59, 3.57, .09, 2.94, .45, .37, 'sun');
  for (let n = 0; n < 3; n++) shape(H, R, H.faceI(5.19 + n * .59, 6.14 - n * .12, .4, .46, .83), n === 1 ? 'coral' : 'paper', n === 1 ? .45 : 1, .55);
  for (const i of [2.63, 7.78]) H.line(R, [H.p(i, 3.49, .39), H.p(i, 6.85, .91)], 'teal', 2.2);
  benchFrame(H, R, 2.3, 3.2, 5.87, 3.96, 1.11, 'sun');
  drape(H, R, 3.2, 3.62, 4.4, 3.15, 1.13, .31, 'teal');
  print(H, R, 4.05, 4.26, 3.19, 2.32, 1.16);
  for (const x of [3.78, 7.34]) for (const j of [4.0, 6.68]) cushion(H, R, x, j, .37, .33, 1.15, .12, 'paper');
  for (const x of [4.08, 7.26]) { timber(H, R, x, 3.58, .25, .66, 1.13, .19, 'teal'); cushion(H, R, x - .02, 3.56, .29, .39, 1.34, .08, 'paper'); }
  metal(H, R, 2.57, 3.66, .74, .6, 1.14, .12, 'blue');
  H.line(R, [H.p(2.62, 3.86, 1.3), H.p(3.27, 3.86, 1.3)], 'sun', 3);
  H.line(R, [H.p(3.13, 3.77, 1.28), H.p(3.13, 4.25, 1.28)], 'coral', 3);
  const [clx, cly] = H.p(3.02, 5.17, 1.15);
  shape(H, R, [[clx - 17, cly + 4], [clx + 16, cly + 4], [clx + 16, cly - 3], [clx - 8, cly - 3], [clx - 8, cly - 20], [clx - 17, cly - 20]], 'teal', .7, .8);
  H.line(R, [[clx - 1, cly - 16], [clx - 1, cly + 9]], 'blue', 2);
  H.line(R, [[clx - 8, cly + 10], [clx + 7, cly + 10]], 'sun', 2.4);
  shape(H, R, [[clx - 5, cly - 18], [clx + 5, cly - 18], [clx + 5, cly - 12], [clx - 5, cly - 12]], 'sun', .65, .6);
  timber(H, R, 2.55, 5.83, .8, .62, 1.14, .16, 'coral');
  const [plx, ply] = H.p(2.96, 6.08, 1.34);
  stroke(H, R, [[plx - 9, ply], [plx - 7, ply - 8], [plx + 5, ply - 8], [plx + 9, ply]], 'blue', 2.3);
  H.line(R, [[plx - 4, ply - 3], [plx + 5, ply - 3]], 'paper', 1.1);
  const [cx, cy] = H.p(2.88, 4.3, 1.17); H.outline(R, ell(cx, cy, 9, 4), 'blue', .85); H.line(R, [[cx - 5, cy], [cx + 6, cy - 1]], 'coral', .8);
  benchFrame(H, R, .47, 7.15, 2.45, 3, .73, 'teal');
  moulding(H, R, .72, 7.37, 1.82, 1.3, .82, 'coral');
  shape(H, R, H.tile(.88, 7.56, 1.49, .94, .79), 'blue', .6);
  print(H, R, 1.25, 7.75, .7, .43, .8, true);
  for (let n = 0; n < 3; n++) timber(H, R, .76 + n * .39, 9.05, .22, .8, .76, .065 + n * .03, ['sun', 'coral', 'teal'][n]);
  shape(H, R, H.tile(2.09, 9.03, .58, .65, .78), 'paper', 1, .5);
  H.line(R, [H.p(2.11, 9.08, .8), H.p(2.57, 9.08, .8), H.p(2.57, 9.6, .8)], 'blue', 1.3);
  timber(H, R, 9.58, 2.25, 1.8, 1.4, .1, .13, 'teal');
  for (let n = 0; n < 4; n++) { timber(H, R, 9.78, 2.46, 1.23, .9, .26 + n * .2, .18, 'paper'); H.line(R, [H.p(9.88, 2.43, .28 + n * .2), H.p(10.8, 3.35, .28 + n * .2)], 'coral', .8); }
  for (const [x, j] of [[9.69, 2.36], [11.25, 2.36], [9.69, 3.5], [11.25, 3.5]]) caster(H, R, x, j);
  for (let n = 0; n < 3; n++) timber(H, R, 9.13, 7.78, 1.87, 2.21, .25 + n * .14, .11, 'paper');
  benchFrame(H, R, 8.88, 7.53, 2.55, 2.97, .8, 'teal');
  drape(H, R, 9.01, 7.68, 2.18, 2.52, .83, .31, 'paper');
  moulding(H, R, 9.21, 7.91, 1.77, 1.48, .9, 'coral');
  print(H, R, 9.45, 8.11, 1.26, 1.01, .88, true);
  for (const [i, j] of [[9.13, 7.85], [10.86, 7.85], [9.13, 9.34], [10.86, 9.34]]) {
    shape(H, R, [H.p(i, j, .95), H.p(i + .3, j, .95), H.p(i, j + .3, .95)], 'paper', 1, .6);
    H.line(R, [H.p(i + .025, j, 1), H.p(i + .25, j, 1)], 'teal', .8);
  }
  const [rollX, rollY] = H.p(9.92, 9.85, .87);
  oval(H, R, rollX, rollY, 16, 6, 'coral', .5); oval(H, R, rollX, rollY - 7, 16, 6, 'paper', 1); oval(H, R, rollX, rollY - 7, 5, 2, 'blue', .6);
  stroke(H, R, [[rollX + 10, rollY - 2], [rollX + 25, rollY + 7], [rollX + 17, rollY + 15]], 'teal', 2);
  metal(H, R, 3.68, 9.63, 1.58, 1.41, .05, .31, 'teal');
  shape(H, R, H.tile(3.81, 9.74, 1.3, 1.16, .37), 'blue', .75, .55);
  for (let n = 0; n < 4; n++) {
    const i = 3.92 + n * .26;
    shape(H, R, [H.p(i, 9.95, .38), H.p(i + .12, 10.13, .39), H.p(i + .46, 10.06, .99), H.p(i + .32, 9.84, 1.03)], n % 2 ? 'coral' : 'sun', .63, .7);
  }
  hangingRail(H, R, 'ne', 8.14, 3.03, 3.62, 3, (P, u, n) => { const [x, y] = P(u, -.17); stroke(H, R, [[x, y], [x - 8, y + 15], [x, y + 25], [x + 8, y + 14], [x + 2, y]], n ? 'sun' : 'blue', .85); });
  const display = (i, z, w, h, ink) => {
    const P = (a, b) => H.p(i + a, .23, z + b);
    shape(H, R, [P(0, 0), P(w, 0), P(w, h), P(0, h)], ink, .55, 1);
    shape(H, R, [P(.12, .12), P(w - .12, .12), P(w - .12, h - .12), P(.12, h - .12)], 'paper', 1, .6);
    shape(H, R, [P(.2, .2), P(w * .42, h * .76), P(w * .72, .22)], 'coral', .6, .5);
    shape(H, R, [P(w * .48, .22), P(w * .7, h * .51), P(w - .2, .22)], 'teal', .6, .5);
    H.line(R, [P(w * .4, h + .1), P(w * .5, h + .3), P(w * .65, h + .1)], 'blue', .7);
  };
  display(1.05, .88, 1.78, 1.03, 'sun');
  display(3.4, .95, 1.25, .84, 'coral');
  const [ox, oy] = H.p(5.55, .28, 1.38); H.outline(R, ell(ox, oy, 16, 22), 'sun', 4, { tone: .8 }); H.outline(R, ell(ox, oy, 12, 18), 'blue', .7);

  taskLight(H, R, 3.1, 3.34, 1.13, 'coral', .65);
  floorLight(H, 5.6, 5.3, 125, .3);
}, (H, R, t) => {
  const u = cycle(t, 20) * 20, place = ease(4, 8, u) * (1 - ease(12, 18, u)), rise = ease(0, 2, u) * (1 - ease(4, 7, u)) + ease(12, 14, u) * (1 - ease(16, 18, u));
  const i = 3.8, j = 3.68 + place * .35, z = 1.43 - place * .16 + rise * .16;
  H.tint(H.tile(i + .1, j + .1, 3.95, 2.89, 1.155), 'blue', .11);
  moulding(H, R, i, j, 3.95, 2.89, z);
  const [a, b] = H.p(i + 3.95, j + .33, z);
  aim(H, 8.22, 4.3, [H.p(i + 3.94, j + .83, z), [a, b]]);
  actor(H, R, 8.22, 4.3, t, 'istanbulFrameHands', { shirt: ['paper', 1], apron: ['coral', .6], hairStyle: 'short', glasses: true }, 0, 1.85);
  const [hx, hy] = H.p(6.6, .25, 1.5), sway = Math.sin(u / 20 * Math.PI * 2) * 1.8;
  stroke(H, R, [[hx - 9, hy], [hx - 3, hy - 16], [hx + 8 + sway, hy - 3], [hx + 2 + sway, hy + 6], [hx - 9, hy]], 'blue', 1.1);
  actor(H, R, 6.45, 8.6, t, 'think', { face: 'sw', shirt: ['teal', .65], hairStyle: 'curly' }, 0, 1.6);
});
room.loopSeconds = 20;
room.stillTime = 3;
export default room;
