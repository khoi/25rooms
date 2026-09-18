import { world, actor, shape, oval, stroke, ell, wallPt, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, benchFrame, drape, floorLight } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cornice, wallCourse, hangingRail, taskLight } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
const pose = { ...FIGURES.clips.idle.keys[0][1] };
FIGURES.clips.istanbulMetalHands = { dur: 22, keys: [[0, pose], [1, pose]] };
function hands(H, i, j, targets) {
  const p = H.p(i, j), s = 1.85;
  for (const [n, q] of targets.entries()) {
    const side = n ? 'r' : 'l', dx = (q[0] - p[0]) / s - (n ? 5.2 : -5.2), dy = (q[1] - p[1]) / s + 32.5;
    const d = Math.min(8.48, Math.max(.4, Math.hypot(dx, dy))), elbow = Math.acos(Math.max(-1, Math.min(1, (d * d - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2))));
    pose['a' + side] = (Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(elbow), 4.368 + 4.2 * Math.cos(elbow))) * 180 / Math.PI;
    pose['e' + side] = elbow * 180 / Math.PI;
  }
}
function disk(H, R, x, y, r, aspect, ink, bright = false) {
  oval(H, R, x, y + 3, r, r * aspect, 'blue', .72);
  oval(H, R, x, y, r, r * aspect, ink, .8);
  oval(H, R, x, y, r - 4, (r - 4) * aspect, 'sun', .5);
  oval(H, R, x, y, r - 7, (r - 7) * aspect, ink, .7);
  H.outline(R, ell(x, y, r - 10, (r - 10) * aspect), 'blue', .6, { tone: .45 });
  for (let n = 0; n < 24; n++) {
    const a = n / 24 * Math.PI * 2;
    H.line(R, [[x + Math.cos(a) * (r - 4), y + Math.sin(a) * (r - 4) * aspect], [x + Math.cos(a) * (r - 7), y + Math.sin(a) * (r - 7) * aspect]], n % 6 ? 'coral' : 'paper', .75, { tone: .7 });
  }
  if (bright) H.line(R, Array.from({ length: 20 }, (_, n) => { const a = Math.PI * (1.05 + n / 28); return [x + Math.cos(a) * (r - 11), y + Math.sin(a) * (r - 11) * aspect]; }), 'paper', 3.5, { tone: .9 });
}
function jug(H, R, i, j, z, scale = 1, patch = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 8 * scale, y], [x + 8 * scale, y], [x + 10 * scale, y - 15 * scale], [x + 4 * scale, y - 26 * scale], [x + 10 * scale, y - 30 * scale], [x - 4 * scale, y - 28 * scale], [x - 4 * scale, y - 23 * scale], [x - 10 * scale, y - 15 * scale]], 'coral', .72);
  stroke(H, R, [[x + 8 * scale, y - 23 * scale], [x + 18 * scale, y - 24 * scale], [x + 18 * scale, y - 9 * scale], [x + 9 * scale, y - 5 * scale]], 'sun', 3);
  H.line(R, [[x - 5 * scale, y - 19 * scale], [x - 6 * scale, y - 5 * scale]], 'paper', 1.4);
  if (patch) H.line(R, [[x + 16 * scale, y - 18 * scale], [x + 18 * scale, y - 11 * scale]], 'teal', 4);
}
const room = world('istanbul-metal-tray', 'A circle comes clear', { floor: 'sun', tone: .16, wall: 'blue', wallTone: .66, height: 3.8, head: 35 }, (H, R) => {
  wallCourse(H, R, 'nw', .1, 11.8, .8, 'teal');
  cornice(H, R, 'nw', 0, 12, 3.72, 'sun');
  cornice(H, R, 'ne', 0, 12, 3.72, 'sun');
  windowBay(H, R, 'nw', 2.5, 6.8, 2.3, 1.13, { divisions: 4, view(P) { H.fill([P(.1, .1), P(6.7, .1), P(6.7, .75), P(.1, .75)], 'sun', .32); } });
  H.fill(H.tile(.5, 3, 6.3, 4.8, .02), 'sun', .1);
  for (let n = 0; n < 12; n++) shape(H, R, H.tile(n, 11.35, .86, .48, .03), n % 2 ? 'coral' : 'teal', .46, .55);
  cabinetFrame(H, R, 6.7, .3, 4.8, 1.2, .1, 3.25, 3, 'teal', (x, j, w, d, z, h, n) => {
    for (const level of [.68, 1.58, 2.4]) timber(H, R, x, j, w, d, level, .09, 'sun');
    if (n === 0) {
      for (let k = 0; k < 4; k++) { const [a, b] = H.p(x + .27 + k * .29, j + .52, 1.58); disk(H, R, a, b - 16, 17, .82, k % 2 ? 'sun' : 'coral'); }
      for (let k = 0; k < 3; k++) timber(H, R, x + .3 + k * .3, j + .05, .08, d, 1.59, .2, 'coral');
    } else if (n === 1) { jug(H, R, x + .35, j + .58, .8, .7, true); jug(H, R, x + .97, j + .43, .8, .8); vessel(H, R, x + .7, j + .5, 1.69, 14, 9, 'sun'); }
    else { for (let k = 0; k < 4; k++) vessel(H, R, x + .65, j + .48, .8 + k * .11, 13 + k, 5, 'coral'); }
    metal(H, R, x + .08, j + .02, w - .12, d - .12, .18, .32, 'blue');
    const [sx, sy] = H.p(x + .6, j + .38, 2.51); disk(H, R, sx, sy - 7, 12, .55, 'sun');
    for (let k = 0; k < 3; k++) H.line(R, [[sx - 5 + k * 4, sy - 8], [sx - 3 + k * 4, sy - 13]], 'blue', 1.3);
  });
  hangingRail(H, R, 'ne', 1, 4.8, 3.4, 5, (P, u, n) => {
    const [x, y] = P(u, -.15);
    if (n % 2) { H.line(R, [[x, y], [x + 2, y + 31]], 'sun', 2); oval(H, R, x + 2, y + 35, 9, 6, 'coral', .7); }
    else { H.line(R, [[x, y], [x, y + 8]], 'sun', 1.4); disk(H, R, x, y + 24, n === 2 ? 22 : 17, .86, n === 2 ? 'coral' : 'sun'); }
  });
  benchFrame(H, R, 2.4, 3.3, 5.5, 2.8, 1.22, 'sun');
  const [standX, standY] = H.p(7.2, 4.4, 1.22);
  for (const dx of [-32, 32]) {
    shape(H, R, [[standX + dx - 4, standY + 8], [standX + dx + 3, standY + 8], [standX + dx - 2, standY - 68], [standX + dx - 7, standY - 68]], 'sun', .62, .9);
    shape(H, R, [[standX + dx, standY - 63], [standX + dx + 20, standY + 9], [standX + dx + 15, standY + 12], [standX + dx - 3, standY - 56]], 'coral', .5, .8);
    H.dot(standX + dx - 2, standY - 56, 2.2, 'sun');
    shape(H, R, [[standX + dx - 9, standY - 5], [standX + dx + 9, standY - 5], [standX + dx + 9, standY + 2], [standX + dx - 9, standY + 2]], 'paper', 1, .7);
    H.line(R, [[standX + dx - 5, standY - 4], [standX + dx - 5, standY + 1]], 'teal', .7);
  }
  H.line(R, [[standX - 35, standY + 6], [standX + 48, standY + 6]], 'blue', 3);
  H.line(R, [[standX - 35, standY + 5], [standX + 48, standY + 5]], 'sun', 1.3);
  for (let n = 0; n < 5; n++) H.dot(standX + 35 + n * 3, standY + 6, .8, 'paper');
  metal(H, R, 3.25, 3.82, 1.3, 1.26, 1.24, .08, 'teal');
  shape(H, R, H.tile(3.38, 3.93, 1.02, .98, 1.33), 'blue', .6, .65);
  for (let n = 0; n < 3; n++) {
    const [tx, ty] = H.p(3.58 + n * .25, 4.23, 1.35);
    stroke(H, R, [[tx - 4, ty - 3], [tx - 8, ty - 11], [tx, ty - 14], [tx + 4, ty - 7], [tx + 2, ty - 2]], 'sun', 2);
  }
  const [bx, by] = H.p(4.9, 4.08, 1.28);
  shape(H, R, [[bx - 12, by - 4], [bx + 14, by - 4], [bx + 14, by + 3], [bx - 12, by + 3]], 'sun', .6, .65);
  for (let n = 0; n < 9; n++) H.line(R, [[bx - 10 + n * 2.5, by + 3], [bx - 10 + n * 2.5, by + 11]], 'blue', .6);
  drape(H, R, 4.15, 5.25, 1.18, .6, 1.24, .42, 'paper');
  H.line(R, [H.p(4.27, 5.3, 1.25), H.p(5.18, 5.66, 1.25)], 'coral', .8);
  jug(H, R, 2.8, 3.85, 1.24, .8, true);
  vessel(H, R, 7.25, 4.35, 1.25, 9, 5, 'coral');
  for (let n = 0; n < 4; n++) H.dot(...H.p(7.18 + .12 * (n % 2), 4.28 + .12 * Math.floor(n / 2), 1.4), 1.3, n ? 'sun' : 'teal');
  benchFrame(H, R, .5, 7.1, 2.3, 2.7, .65, 'teal');
  for (let n = 0; n < 3; n++) { const [x, y] = H.p(1.35, 7.6 + .7 * n, .69); disk(H, R, x, y, 12, .43, n === 0 ? 'teal' : 'coral', n === 1); }
  metal(H, R, 1.55, 8.1, .55, .8, .7, .03, 'coral');
  for (let n = 0; n < 4; n++) H.dot(...H.p(1.65 + n * .1, 8.65, .74), 1.3, n === 2 ? 'teal' : 'sun');
  timber(H, R, 9.7, 2.7, 1.8, 1.8, .06, .18, 'sun');
  for (let n = 0; n < 3; n++) { metal(H, R, 9.82 + n * .08, 2.85 + n * .05, 1.32 - n * .17, 1.35 - n * .16, .24 + n * .24, .25, 'paper'); }
  drape(H, R, 10.1, 4.8, 1.1, .85, .28, .24, 'paper');
  taskLight(H, R, 2.55, 3.3, 1.25, 'coral', .8);
  floorLight(H, 5.5, 5, 115, .35);
}, (H, R, t) => {
  const u = cycle(t, 22) * 22, turn = ease(8.8, 11.8, u) * (1 - ease(13.2, 18.7, u)), polish = ease(4.4, 5.3, u) * (1 - ease(8, 8.8, u));
  const [x, y] = H.p(7.2, 4.4, 2.6), aspect = .84 - turn * .09;
  disk(H, R, x + turn * 3, y, 56, aspect, 'coral', true);
  stroke(H, R, [[x - 26, y + 9], [x - 21, y + 12], [x - 17, y + 10]], 'blue', .7, .6);
  for (const side of [-1, 1]) { const xx = x + side * 54; H.outline(R, ell(xx, y, 6, 11), 'sun', 2, { tone: .9 }); H.dot(xx, y - 7, 1.5, side < 0 ? 'teal' : 'sun'); }
  const hx = x + 40 - polish * (5 + 8 * Math.sin((u - 4.4) * 2)), hy = y + 34 - polish * 7;
  const target = [[hx, hy], [x + 52, y + 30]];
  hands(H, 8.3, 4.1, target);
  actor(H, R, 8.3, 4.1, t, 'istanbulMetalHands', { shirt: ['paper', 1], apron: ['teal', .75], pants: ['blue', .75], hairStyle: 'curly' }, 0, 1.85);
  shape(H, R, [[hx - 6, hy - 3], [hx + 6, hy - 4], [hx + 8, hy + 4], [hx - 3, hy + 7]], 'paper', 1, .65);
  H.line(R, [[hx - 3, hy - 1], [hx + 4, hy + 3]], 'coral', .6);
  actor(H, R, 7.2, 8.3, u / 22 * 4, 'think', { face: 'sw', shirt: ['coral', .7], hairStyle: 'bun' }, 0, 1.55);
});
room.loopSeconds = 22;
room.stillTime = 10.5;
export default room;
