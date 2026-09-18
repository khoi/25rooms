import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, caneChair, floorLight, spokedWheel, vessel } from '../materials.js';
import { windowBay, cornice, taskLight, hangingRail, wallRack, radiator, recessedFrame } from '../joinery.js';

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
  radiator(H, R, 'ne', 6.5, 3.1, .6);
  wallRack(H, R, 'nw', 9.13, 2.5, 1.59, 2.24, 2, 'teal', (P, z, row) => {
    if (row === 0) {
      for (let n = 0; n < 3; n++) {
        const u = .25 + n * .71;
        shape(H, R, [P(u, z + .14), P(u + .56, z + .14), P(u + .56, z + .9), P(u, z + .9)], n === 1 ? 'coral' : 'paper', n === 1 ? .58 : 1, .6);
        for (let k = 0; k < 4; k++) H.line(R, [P(u + .06 + k * .13, z + .83), P(u + .06 + k * .13, z + .22)], n === 1 ? 'sun' : 'teal', .8);
      }
    } else {
      const [x, y] = P(.62, z + .18);
      H.outline(R, ell(x, y - 12, 12, 8), 'coral', 2.5);
      for (const dx of [-5, 0, 5]) H.line(R, [[x + dx, y - 4], [x + dx - 2, y + 8]], 'sun', 1.1);
      shape(H, R, [P(1.2, z + .13), P(2.18, z + .13), P(2.18, z + .91), P(1.2, z + .91)], 'paper', 1, .5);
      H.line(R, [P(1.32, z + .25), P(1.32, z + .76), P(2.06, z + .76), P(2.06, z + .25)], 'teal', 1.2);
      H.line(R, [P(1.7, z + .27), P(1.7, z + .77)], 'coral', .8);
    }
  });
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
  for (let n = 0; n < 4; n++) {
    const j = 1.49 + n * 1.82;
    for (let k = 0; k < 4; k++) H.line(R, [H.p(1.52, j + .22 + k * .26, .43), H.p(1.52, j + .22 + k * .26, .76)], 'blue', .7);
    timber(H, R, .34, j + .16, 1.0, 1.19, 2.98, .06, 'teal');
    for (let k = 0; k < 4; k++) {
      const [x, y] = H.p(.87, j + .27 + k * .25, 3.06);
      oval(H, R, x, y, 5, 2.4, 'sun', .75); oval(H, R, x, y - 8, 5, 2.4, k % 2 ? 'coral' : 'paper', .85);
      H.line(R, [[x - 3, y - 7], [x - 3, y - 1]], 'blue', .6);
    }
  }
  timber(H, R, 1.44, 7.65, 1.55, 1.06, 1.15, .1, 'sun');
  H.line(R, [H.p(2.82, 8.5, 1.13), H.p(1.49, 8.45, .57)], 'teal', 2.3);
  drape(H, R, 1.54, 7.74, 1.32, .86, 1.28, .36, 'paper');
  const [ix, iy] = H.p(2.18, 8.02, 1.29);
  shape(H, R, [[ix - 15, iy + 1], [ix + 13, iy + 1], [ix + 7, iy - 13], [ix - 4, iy - 16]], 'teal', .65, .8);
  stroke(H, R, [[ix - 8, iy - 6], [ix - 5, iy - 18], [ix + 5, iy - 17], [ix + 6, iy - 8]], 'blue', 2.3);
  H.line(R, [[ix - 11, iy], [ix + 11, iy]], 'paper', 1.1);
  stroke(H, R, [[ix + 9, iy - 5], [ix + 22, iy + 6], [ix + 13, iy + 24], H.p(1.5, 8.22, .35)], 'blue', .9);
  for (const i of [2.15, 9.6]) { metal(H, R, i, 3.52, .12, .14, .06, 4.12, 'teal'); metal(H, R, i - .3, 3.28, .7, .62, .025, .09, 'teal'); }
  bentTube(H, R, [[2.08, 3.55, 4.17], [9.72, 3.55, 4.17]], 3.5, 'sun');
  for (const i of [2.15, 9.6]) {
    for (const z of [1.18, 2.78, 3.91]) { metal(H, R, i - .06, 3.48, .25, .22, z, .08, 'sun'); H.dot(...H.p(i + .1, 3.72, z + .03), 1.3, 'blue'); }
    H.line(R, [H.p(i - .27, 3.25, .15), H.p(i, 3.53, .76), H.p(i + .3, 3.8, .15)], 'teal', 1.7);
  }
  for (const x of [2.2, 9.58]) { H.line(R, [H.p(x, 3.55, 4.17), H.p(x, 3.2, 4.31)], 'blue', 2); H.dot(...H.p(x, 3.2, 4.31), 2, 'coral'); }
  timber(H, R, 3.57, 7.35, 3.98, 1.53, .25, .09, 'teal');
  for (const i of [3.69, 6.7]) { timber(H, R, i, 7.43, .88, 1.26, .4, .38, 'teal'); shape(H, R, H.faceI(i + .06, 8.71, .75, .48, .71), 'sun', .48, .6); H.line(R, [H.p(i + .31, 8.72, .59), H.p(i + .61, 8.72, .59)], 'blue', 1.6); }
  metal(H, R, 4.97, 8.19, .86, .9, .08, .09, 'blue');
  for (let n = 0; n < 5; n++) H.line(R, [H.p(5.08, 8.26 + n * .15, .18), H.p(5.7, 8.26 + n * .15, .18)], 'paper', .8);
  bentTube(H, R, [[5.38, 8.42, .18], [5.61, 8.02, .71], [5.65, 7.75, 1.08]], 1.7, 'blue');
  const [fwx, fwy] = H.p(6.19, 7.8, .64);
  spokedWheel(H, R, fwx, fwy, 17, 'teal', .35, .84);
  H.outline(R, ell(fwx, fwy, 20, 18), 'coral', 1);
  stroke(H, R, [[fwx - 16, fwy - 11], H.p(5.98, 7.84, 1.72), [fwx + 16, fwy - 12]], 'coral', 1.1);
  benchFrame(H, R, 3.3, 7.1, 4.55, 2.25, 1.08, 'sun');
  metal(H, R, 4.6, 7.55, 1.62, .77, 1.1, .08, 'blue');
  const [mx, my] = H.p(5.4, 7.94, 1.22);
  shape(H, R, [[mx - 23, my - 3], [mx + 22, my - 3], [mx + 23, my - 10], [mx + 12, my - 12], [mx + 12, my - 31], [mx - 13, my - 33], [mx - 20, my - 23], [mx - 13, my - 21], [mx - 7, my - 26], [mx + 3, my - 25], [mx + 3, my - 7], [mx - 23, my - 7]], 'teal', .75, 1);
  H.line(R, [[mx - 15, my - 23], [mx - 15, my - 6]], 'blue', .9);
  oval(H, R, mx + 17, my - 25, 7, 9, 'sun', .65); oval(H, R, mx + 17, my - 25, 3.5, 5, 'blue', .8);
  H.line(R, [[mx - 10, my - 31], [mx - 10, my - 43]], 'blue', 1); oval(H, R, mx - 10, my - 39, 4, 5, 'coral', .8);
  H.line(R, [[mx + 4, my - 20], [mx + 10, my - 20]], 'paper', 1.4);
  H.dot(mx - 6, my - 26, 2.4, 'sun');
  H.line(R, [[mx - 20, my - 7], [mx - 9, my - 7]], 'paper', 1.4);
  H.line(R, [[mx - 15, my - 9], [mx - 10, my - 9]], 'blue', .65);
  for (const dy of [-3, 3]) H.line(R, [[mx + 15, my - 25 + dy], [mx + 19, my - 25 + dy]], 'paper', .8);
  stroke(H, R, [[mx - 10, my - 40], [mx - 21, my - 31], [mx - 15, my - 22]], 'coral', .65);
  drape(H, R, 3.5, 7.62, 1.3, 1.35, 1.12, .6, 'paper');
  for (let n = 0; n < 5; n++) H.line(R, [H.p(3.65 + n * .19, 7.76, 1.14), H.p(3.65 + n * .19, 8.97, 1.14)], 'coral', .7);
  metal(H, R, 6.85, 7.4, .63, .63, 1.1, .34, 'teal'); metal(H, R, 6.82, 7.36, .69, .7, 1.44, .07, 'coral');
  windowModel(H, R, 6.97, 8.87, 1.12, .7);
  const [rx, ry] = H.p(5.8, 8.76, 1.11); H.outline(R, ell(rx, ry, 8, 4), 'sun', 2.2); H.line(R, [[rx + 15, ry - 2], [rx + 24, ry + 2], [rx + 23, ry + 7]], 'blue', 1.2);
  timber(H, R, 3.45, 8.85, 2.0, .14, 1.14, .035, 'paper');
  for (let n = 0; n < 12; n++) H.line(R, [H.p(3.52 + n * .15, 8.86, 1.18), H.p(3.52 + n * .15, 8.96, 1.18)], 'blue', .6);
  taskLight(H, R, 4.1, 7.3, 1.13, 'coral', .62);
  for (const j of [9.02, 9.55]) H.line(R, [H.p(7.29, j, .65), H.p(8.24, j, .65)], 'sun', 2.2);
  metal(H, R, 7.37, 8.9, .87, .82, .64, .12, 'teal');
  shape(H, R, H.tile(7.46, 8.96, .7, .66, .77), 'blue', .68, .5);
  for (let n = 0; n < 4; n++) { const [x, y] = H.p(7.61 + (n % 2) * .3, 9.15 + Math.floor(n / 2) * .29, .8); oval(H, R, x, y - 3, 4, 4, ['coral', 'sun', 'paper', 'teal'][n], .8); }
  const [scx, scy] = H.p(6.43, 8.83, 1.13);
  H.outline(R, ell(scx - 7, scy, 4, 3.2), 'blue', 1.2); H.outline(R, ell(scx + 1, scy + 4, 4, 3.2), 'blue', 1.2);
  H.line(R, [[scx - 4, scy - 1], [scx + 14, scy - 9], [scx + 4, scy + 3]], 'sun', 1.8);
  benchFrame(H, R, .65, 10.03, 2.1, 1.01, .7, 'teal');
  windowModel(H, R, 1.28, 10.47, .74, .86);
  for (let n = 0; n < 3; n++) drape(H, R, 1.93, 10.19, .51, .63, .76 + n * .025, .17 + n * .04, ['paper', 'coral', 'teal'][n]);
  caneChair(H, R, 10.25, 7.6, 'coral');
  drape(H, R, 10.24, 7.6, .94, .8, .75, .3, 'paper');
  benchFrame(H, R, 10.1, 9.08, 1.13, .82, .45, 'teal');
  for (let n = 0; n < 4; n++) shape(H, R, H.tile(10.24 + n * .02, 9.2 - n * .03, .8, .58, .47 + n * .025), ['paper', 'coral', 'teal', 'sun'][n], n ? .45 : 1, .45);
  vessel(H, R, 10.59, 9.48, .61, 5, 12, 'paper', false);
  const [bagX, bagY] = H.p(10.5, 8.38, .08);
  shape(H, R, [[bagX - 12, bagY], [bagX + 13, bagY], [bagX + 10, bagY - 23], [bagX - 10, bagY - 23]], 'coral', .6, .7);
  stroke(H, R, [[bagX - 7, bagY - 22], [bagX - 7, bagY - 32], [bagX + 7, bagY - 32], [bagX + 8, bagY - 22]], 'sun', 2);
  H.line(R, [[bagX - 8, bagY - 6], [bagX + 8, bagY - 6]], 'paper', .8);
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
  shape(H, R, [P(0, 3.77), P(1, 3.77), P(1, 3.96), P(0, 3.96)], 'sun', .24, .45);
  H.line(R, [P(0, 3.82), P(1, 3.82)], 'teal', .7);
  for (let n = 0; n < 12; n++) {
    const a = (n + .14) / 12;
    H.line(R, [P(a, 3.85), P(a + .025, 3.91)], 'blue', .55);
    shape(H, R, [P(a, .48), P(a + .025, .48), P(a + .025, .33), P(a, .33)], 'sun', .3, .4);
  }
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
