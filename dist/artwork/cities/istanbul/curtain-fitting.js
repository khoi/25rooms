import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, caneChair, floorLight } from '../materials.js';
import { windowBay, cornice, taskLight, hangingRail, wallRack } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
const pose = { ...FIGURES.clips.idle.keys[0][1], head: 12 };
FIGURES.clips.istanbulCurtainMaker = { dur: 18, keys: [[0, pose], [1, pose]] };
function aim(H, i, j, target) {
  const p = H.p(i, j), dx = (target[0] - p[0]) / 1.65 + 5.2, dy = (target[1] - p[1]) / 1.65 + 32.5;
  const d = Math.min(8.48, Math.max(.4, Math.hypot(dx, dy))), e = Math.acos(Math.max(-1, Math.min(1, (d * d - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2))));
  pose.al = (Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(e), 4.368 + 4.2 * Math.cos(e))) * 180 / Math.PI;
  pose.el = e * 180 / Math.PI;
}
function windowModel(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z), w = 19 * size, h = 28 * size;
  shape(H, R, [[x - w, y], [x + w, y], [x + w, y - h], [x - w, y - h]], 'sun', .7, .7);
  shape(H, R, [[x - w + 3, y - 3], [x + w - 3, y - 3], [x + w - 3, y - h + 3], [x - w + 3, y - h + 3]], 'teal', .27, .5);
  H.line(R, [[x, y - 2], [x, y - h + 2]], 'paper', 1.5);
  shape(H, R, [[x - w + 3, y - h + 4], [x - w + 12, y - h + 4], [x - w + 8, y - 3], [x - w + 3, y - 4]], 'paper', 1, .5);
  for (let n = 0; n < 3; n++) H.line(R, [[x - w + 5 + n * 2, y - h + 5], [x - w + 4 + n * 1.5, y - 5]], 'blue', .45);
}
const room = world('istanbul-curtain-fitting', 'A room inside the room', { floor: 'sun', tone: .1, wall: 'paper', wallTone: .75, height: 4.35, head: 70, pattern: 'boards' }, (H, R) => {
  cornice(H, R, 'ne', 0, 12, 4.25, 'teal');
  windowBay(H, R, 'ne', 2.2, 8.7, .73, 3.05, { divisions: 5 });
  H.line(R, [H.p(.05, 10.2, .03), H.p(11.8, 10.2, .03)], 'blue', 2);
  H.line(R, [H.p(.05, 10.3, .03), H.p(11.8, 10.3, .03)], 'paper', 1);
  for (let n = 0; n < 12; n++) shape(H, R, H.tile(n, 11.4, .8, .45, .015), n % 2 ? 'coral' : 'teal', .28, .55);
  shape(H, R, H.faceJ(.2, 1.2, 7.7, .1, 3.7), 'blue', .5);
  for (const j of [1.2, 3.7, 6.2, 8.72]) timber(H, R, .15, j, 1.25, .14, .08, 3.62, 'sun');
  for (const z of [.2, 1.03, 2.0, 2.84, 3.68]) timber(H, R, .1, 1.18, 1.36, 7.7, z, .13, 'sun');
  for (let n = 0; n < 8; n++) {
    const j = 1.55 + n * .85, [x, y] = H.p(.9, j, 2.16);
    shape(H, R, [[x - 9, y - 1], [x + 8, y - 3], [x + 7, y - 32], [x - 9, y - 29]], ['paper', 'coral', 'teal'][n % 3], n % 3 ? .47 : 1, .65);
    oval(H, R, x - 1, y - 31, 8, 3, 'paper', 1); oval(H, R, x - 1, y - 31, 3, 1.5, 'blue', .6);
    H.line(R, [[x - 5, y - 25], [x - 5, y - 6]], 'paper', .75);
  }
  for (let n = 0; n < 4; n++) {
    const j = 1.4 + n * 1.82;
    shape(H, R, H.faceJ(1.49, j, 1.56, .39, .87), 'teal', .32, .7);
    H.line(R, [H.p(1.51, j + .67, .64), H.p(1.51, j + .96, .64)], 'sun', 2);
    drape(H, R, .36, j + .2, .97, 1.2, 1.24, .1, n % 2 ? 'paper' : 'coral');
  }
  for (const i of [2.15, 9.6]) { metal(H, R, i, 3.52, .12, .14, .06, 4.12, 'teal'); metal(H, R, i - .3, 3.28, .7, .62, .025, .09, 'teal'); }
  bentTube(H, R, [[2.08, 3.55, 4.17], [9.72, 3.55, 4.17]], 3.5, 'sun');
  for (const x of [2.2, 9.58]) { H.line(R, [H.p(x, 3.55, 4.17), H.p(x, 3.2, 4.31)], 'blue', 2); H.dot(...H.p(x, 3.2, 4.31), 2, 'coral'); }
  benchFrame(H, R, 3.3, 7.1, 4.55, 2.25, 1.08, 'sun');
  metal(H, R, 4.6, 7.55, 1.62, .77, 1.1, .08, 'blue');
  const [mx, my] = H.p(5.4, 7.94, 1.22);
  shape(H, R, [[mx - 23, my - 3], [mx + 22, my - 3], [mx + 23, my - 10], [mx + 12, my - 12], [mx + 12, my - 31], [mx - 13, my - 33], [mx - 20, my - 23], [mx - 13, my - 21], [mx - 7, my - 26], [mx + 3, my - 25], [mx + 3, my - 7], [mx - 23, my - 7]], 'teal', .75, 1);
  H.line(R, [[mx - 15, my - 23], [mx - 15, my - 6]], 'blue', .9);
  oval(H, R, mx + 17, my - 25, 7, 9, 'sun', .65); oval(H, R, mx + 17, my - 25, 3.5, 5, 'blue', .8);
  H.line(R, [[mx - 10, my - 31], [mx - 10, my - 43]], 'blue', 1); oval(H, R, mx - 10, my - 39, 4, 5, 'coral', .8);
  stroke(H, R, [[mx - 10, my - 40], [mx - 21, my - 31], [mx - 15, my - 22]], 'coral', .65);
  drape(H, R, 3.5, 7.62, 1.3, 1.35, 1.12, .6, 'paper');
  for (let n = 0; n < 5; n++) H.line(R, [H.p(3.65 + n * .19, 7.76, 1.14), H.p(3.65 + n * .19, 8.97, 1.14)], 'coral', .7);
  metal(H, R, 6.85, 7.4, .63, .63, 1.1, .34, 'teal'); metal(H, R, 6.82, 7.36, .69, .7, 1.44, .07, 'coral');
  windowModel(H, R, 6.97, 8.87, 1.12, .7);
  const [rx, ry] = H.p(5.8, 8.76, 1.11); H.outline(R, ell(rx, ry, 8, 4), 'sun', 2.2); H.line(R, [[rx + 15, ry - 2], [rx + 24, ry + 2], [rx + 23, ry + 7]], 'blue', 1.2);
  timber(H, R, 3.45, 8.85, 2.0, .14, 1.14, .035, 'paper');
  for (let n = 0; n < 12; n++) H.line(R, [H.p(3.52 + n * .15, 8.86, 1.18), H.p(3.52 + n * .15, 8.96, 1.18)], 'blue', .6);
  taskLight(H, R, 4.1, 7.3, 1.13, 'coral', .62);
  caneChair(H, R, 10.25, 7.6, 'coral');
  drape(H, R, 10.24, 7.6, .94, .8, .75, .3, 'paper');
  benchFrame(H, R, 10.1, 9.08, 1.13, .82, .45, 'teal');
  for (let n = 0; n < 4; n++) shape(H, R, H.tile(10.24 + n * .02, 9.2 - n * .03, .8, .58, .47 + n * .025), ['paper', 'coral', 'teal', 'sun'][n], n ? .45 : 1, .45);
  floorLight(H, 5.5, 6.1, 170, .35);
}, (H, R, t) => {
  const u = cycle(t, 18) * 18, f = ease(3.6, 7.2, u) * (1 - ease(10.8, 16, u)), width = 1.45 + f * 5.45, end = 2.32 + width;
  const P = (a, z, depth = 0) => H.p(2.32 + a * width, 3.64 + depth, z);
  const outline = [P(0, 4.03), P(1, 4.03)];
  for (let k = 20; k >= 0; k--) outline.push(P(k / 20, .32 + .055 * Math.cos(k * Math.PI / 2), Math.sin(k * Math.PI / 2) * .07));
  shape(H, R, outline, 'paper', 1, .9);
  for (let n = 0; n < 12; n++) {
    const a = n / 12, b = (n + .5) / 12;
    shape(H, R, [P(a, 4.02), P(b, 4.02), P(b, .33), P(a, .36)], n % 2 ? 'sun' : 'teal', n % 2 ? .15 : .14, .35);
    stroke(H, R, [P(a, 3.94), P(a + .02, 2.6), P(a - .015, 1.1), P(a, .37)], 'blue', .55, .42);
    const [x, y] = P(a + .02, 4.14); H.outline(R, ell(x, y, 3.2, 4.5), 'blue', 1, { tone: .8 });
  }
  H.line(R, [P(0, .44), P(1, .44)], 'coral', 1.1);
  shape(H, R, [P(.97, 3.96), P(1, 3.96), P(1, .34), P(.965, .36)], 'sun', .38, .55);
  for (const a of [.2, .78]) { shape(H, R, [P(a, .5), P(a + .035, .5), P(a + .035, .32), P(a, .32)], 'paper', 1, .55); H.dot(...P(a + .017, .4), 1.8, 'blue', .75); }
  const i = end + .49, j = 4.07, target = H.p(end, 3.68, 1.62);
  aim(H, i, j, target);
  const gait = (ease(3.6, 4, u) * (1 - ease(6.8, 7.2, u)) + ease(10.8, 11.2, u) * (1 - ease(15.6, 16, u))) * Math.sin(f * Math.PI * 14);
  pose.ll = -5 + gait * 19; pose.lr = 5 - gait * 19;
  actor(H, R, i, j, t, 'istanbulCurtainMaker', { shirt: ['coral', .7], pants: ['blue', .65], hairStyle: 'bun' }, 0, 1.65);
  const [tx, ty] = H.p(2.43, 3.7, 1.65); stroke(H, R, [[tx - 4, ty], [tx + 7, ty + 3], [tx + 5, ty + 16], [tx + 11, ty + 20]], 'coral', 1.5); H.line(R, [[tx + 4, ty + 10], [tx + 9, ty + 12]], 'paper', 1);
  actor(H, R, 9.0, 8.35, u / 18 * 4, 'think', { face: 'sw', shirt: ['teal', .65], hairStyle: 'short' }, 0, 1.45);
});
room.loopSeconds = 18;
room.stillTime = 5.4;
export default room;
