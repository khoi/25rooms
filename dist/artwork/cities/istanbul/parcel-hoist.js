import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, drape, spokedWheel, bentTube, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor, masonry } from '../structure.js';
import { windowBay, cornice, caster, hangingRail, taskLight } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
const base = { ...FIGURES.clips.idle.keys[0][1] };
FIGURES.clips.istanbulHoistPorter = { dur: 16, keys: [[0, { ...base, al:70, ar:70, el:60, er:60 }], [.2, { ...base, al:120, ar:115, el:20, er:25 }], [.4, { ...base, al:45, ar:48, el:80, er:78 }], [.6, { ...base, al:45, ar:48, el:80, er:78 }], [.875, { ...base, al:70, ar:70, el:60, er:60 }], [1, { ...base, al:70, ar:70, el:60, er:60 }]] };
function parcel(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z), P = (a, b) => [x + a * size, y + b * size];
  shape(H, R, [P(-21, -6), P(-16, -25), P(-5, -31), P(14, -27), P(24, -14), P(20, 3), P(3, 9), P(-17, 4)], 'paper', 1, 1);
  shape(H, R, [P(3, 9), P(7, -7), P(24, -14), P(20, 3)], 'sun', .19, .6);
  shape(H, R, [P(-16, -6), P(-5, -4), P(-6, 4), P(-17, 2)], 'teal', .48, .6);
  shape(H, R, [P(-14, -4), P(-6, -3), P(-7, 2), P(-15, 1)], 'coral', .45, .5);
  for (const n of [-13, -9]) H.line(R, [P(n, -5), P(n + 1, 2)], 'paper', .6);
  stroke(H, R, [P(-19, -9), P(-5, -8), P(9, -12), P(21, -16)], 'blue', 1.3);
  stroke(H, R, [P(-3, 8), P(-2, -9), P(-5, -28), P(3, -35), P(9, -29), P(5, -10), P(9, 7)], 'coral', 1.9);
  H.line(R, [P(-10, -23), P(-4, -11)], 'blue', .65, { tone: .5 });
  return P(2, -35);
}
const room = world('istanbul-parcel-hoist', 'The bundle rises one floor', { floor: 'paper', tone: .58, wall: 'paper', wallTone: .72, height: 4.7, head: 70, pattern: 'tiles' }, (H, R) => {
  cornice(H, R, 'nw', 0, 12, 4.6, 'teal');
  masonry(H, R, 'nw', .05, 11.9, .04, .65, 'coral', .27);
  masonry(H, R, 'ne', .05, 11.9, .04, .65, 'coral', .27);
  for (const j of [.15, 7.05, 11.45]) timber(H, R, .08, j, .18, .26, .65, 3.9, 'teal');
  bentTube(H, R, [[.38, .35, 4.46], [.38, 11.15, 4.46], [.38, 11.15, .3]], 3.4, 'blue');
  for (const z of [.5, 2.2, 4.14]) metal(H, R, .25, 11.08, .27, .2, z, .09, 'teal');
  const [lampX, lampY] = H.p(.62, 8.4, 3.98);
  H.line(R, [H.p(.18, 8.4, 4.29), [lampX, lampY - 7]], 'blue', 1.6);
  shape(H, R, [[lampX - 11, lampY - 5], [lampX + 11, lampY - 5], [lampX + 8, lampY + 20], [lampX - 8, lampY + 20]], 'sun', .78, .9);
  for (const dx of [-6, 0, 6]) H.line(R, [[lampX + dx, lampY - 6], [lampX + dx * .75, lampY + 20]], 'blue', .7);
  H.line(R, [[lampX - 9, lampY + 12], [lampX + 9, lampY + 12]], 'blue', .8);
  H.glow(lampX, lampY + 7, 30, 35, 'sun', .24);
  windowBay(H, R, 'nw', 1.7, 4.6, 2.5, 1.76, { divisions: 3 });
  windowBay(H, R, 'ne', 2.1, 4.9, 3.45, .83, { divisions: 4 });
  for (const j of [1.18, 4.14]) {
    H.line(R, [H.p(.99, j, .12), H.p(4.51, j, 1.78)], 'teal', 3.2);
    H.line(R, [H.p(.99, j, 1.77), H.p(4.51, j, .17)], 'sun', 3);
    for (const i of [1.04, 4.45]) for (const z of [.2, 1.73]) H.dot(...H.p(i, j + .1, z), 1.8, 'blue');
  }
  timber(H, R, 1.07, 1.25, 3.14, 2.46, .3, .12, 'teal');
  parcel(H, R, 1.8, 2.38, .47, .58);
  parcel(H, R, 3.17, 1.95, .48, .72);
  drape(H, R, 2.36, 3.32, 1.42, .52, .43, .27, 'coral');
  for (const x of [.85, 4.5]) for (const j of [1.05, 4.2]) { timber(H, R, x, j, .24, .24, 0, 2.02, 'sun'); metal(H, R, x - .025, j - .025, .29, .29, .04, .18, 'blue'); }
  for (const j of [1.12, 4.15]) timber(H, R, .85, j, 3.92, .24, 1.76, .3, 'sun');
  boardFloor(H, R, .8, 1.03, 4.05, 3.42, 2.1, 'sun', .38);
  for (const x of [1.05, 2.15, 3.3, 4.6]) { timber(H, R, x, 1.03, .11, .13, 2.1, 1, 'teal'); H.dot(...H.p(x + .06, 1.04, 2.94), 1, 'sun'); }
  timber(H, R, .94, .99, 3.83, .16, 3.05, .12, 'teal');
  for (const i of [1.18, 2.64]) {
    shape(H, R, [H.p(i, 4.28, 1.65), H.p(i, 8.12, .03), H.p(i, 8.12, .33), H.p(i, 4.28, 2.05)], 'teal', .6, .9);
    H.line(R, [H.p(i, 4.32, 2.04), H.p(i, 8.1, .31)], 'sun', 1.5);
  }
  for (let n = 0; n < 7; n++) {
    const j = 4.4 + n * .53, z = 2.08 - n * .285;
    timber(H, R, 1.12, j, 1.72, .6, z - .17, .17, 'sun');
    H.line(R, [H.p(1.16, j + .59, z + .01), H.p(2.8, j + .59, z + .01)], 'paper', 1.3);
    for (const i of [1.3, 2.64]) H.dot(...H.p(i, j + .38, z + .015), 1.15, 'blue');
  }
  for (const i of [1.11, 3.96]) { timber(H, R, i, 1.2, .14, .17, 2.13, .54, 'sun'); }
  metal(H, R, 1.12, 1.22, 2.91, .54, 2.13, .14, 'teal');
  parcel(H, R, 1.75, 1.49, 2.3, .4);
  parcel(H, R, 2.87, 1.43, 2.3, .47);
  for (const x of [1.16, 2.67]) bentTube(H, R, [[x, 4.3, 3.02], [x, 5.8, 2.2], [x, 8.1, 1.03]], 2.5, 'teal');
  for (const j of [4.5, 6.15, 7.95]) timber(H, R, 2.67, j, .09, .09, .18 + (8 - j) * .49, .83, 'teal');
  timber(H, R, 4.7, 3.3, 2.15, 1.3, 1.9, .22, 'sun');
  H.line(R, [H.p(4.7, 4.5, 1.95), H.p(4.65, 3.9, .8), H.p(6.65, 3.9, 1.94)], 'blue', 3);
  cushion(H, R, 5.52, 3.43, 1.11, .93, 2.14, .15, 'teal');
  cushion(H, R, 5.52, 3.43, 1.11, .93, .06, .15, 'teal');
  for (const [x, j] of [[5.2, 2.85], [8.04, 3.5]]) { timber(H, R, x, j, .25, .28, 0, 4.6, 'sun'); metal(H, R, x - .04, j - .04, .33, .36, .06, .26, 'blue'); }
  timber(H, R, 5.1, 2.8, 3.22, .36, 4.46, .32, 'sun');
  for (const [i, j, side] of [[5.22, 3.06, 1], [8.03, 3.52, -1]]) {
    shape(H, R, [H.p(i, j, 3.45), H.p(i + side * 1.09, j, 4.44), H.p(i + side * .72, j, 4.44), H.p(i, j, 3.82)], 'sun', .68, .9);
    for (const z of [3.63, 4.25]) { const [x, y] = H.p(i + side * (z - 3.45) * .72, j + .02, z); H.dot(x, y, 2.2, 'blue'); H.dot(x, y, .8, 'paper'); }
  }
  for (const x of [5.25, 7.95]) { metal(H, R, x, 2.76, .25, .48, 4.21, .43, 'blue'); for (const z of [4.3, 4.55]) H.dot(...H.p(x + .12, 3.26, z), 1.8, 'sun'); }
  bentTube(H, R, [[6.12, 2.98, 4.52], [6.12, 3.84, 4.52], [7.58, 5.04, 4.52]], 3, 'blue');
  for (const x of [7.1, 7.62]) { metal(H, R, x, 3.6, .065, .08, .25, 3.63, 'teal'); }
  for (const z of [.36, 1.5, 2.6, 3.85]) H.line(R, [H.p(7.1, 3.63, z), H.p(7.64, 3.63, z)], 'blue', 1.2);
  for (const z of [.28, 3.96]) metal(H, R, 7.03, 3.47, .69, .3, z, .12, 'blue');
  const [cleatX, cleatY] = H.p(8.16, 3.6, 1.5);
  H.line(R, [[cleatX, cleatY - 12], [cleatX, cleatY + 12]], 'blue', 5);
  H.line(R, [[cleatX - 9, cleatY - 9], [cleatX + 9, cleatY - 9]], 'sun', 3);
  H.line(R, [[cleatX - 9, cleatY + 9], [cleatX + 9, cleatY + 9]], 'sun', 3);
  stroke(H, R, [[cleatX - 7, cleatY - 10], [cleatX + 8, cleatY + 8], [cleatX - 7, cleatY + 8], [cleatX + 7, cleatY - 10]], 'coral', 1.2);
  cabinetFrame(H, R, 8.6, .3, 2.96, 1.26, .08, 3.5, 2, 'teal', (x, j, w, d, z, h, n) => {
    for (const zt of [1.05, 2.0, 2.85]) timber(H, R, x, j, w, d, zt, .09, 'sun');
    for (let k = 0; k < 3; k++) drape(H, R, x + .12, j + .14, w - .2, d - .2, 1.2 + k * .13, .1, k === 1 ? 'coral' : 'paper');
    if (n === 0) for (let k = 0; k < 3; k++) { const [a, b] = H.p(x + .3 + k * .34, j + .52, 2.12); oval(H, R, a, b - 14, 7, 14, 'paper', 1); H.outline(R, ell(a, b - 14, 3, 9), 'coral', .8); }
    else { for (let k = 0; k < 4; k++) timber(H, R, x + .1, j + .12, w - .22, d - .24, 2.15 + k * .07, .06, 'paper'); }
    parcel(H, R, x + w * .5, j + .45, 2.99, .35);
  });
  timber(H, R, 8.76, 1.66, 2.42, 1.1, 1.09, .1, 'sun');
  for (const i of [8.88, 10.98]) H.line(R, [H.p(i, 2.6, 1.07), H.p(i, 1.59, .51)], 'teal', 2.2);
  drape(H, R, 8.92, 1.78, .99, .77, 1.21, .31, 'paper');
  const [wrx, wry] = H.p(10.5, 2.06, 1.22);
  oval(H, R, wrx, wry, 11, 4, 'coral', .65); oval(H, R, wrx, wry - 7, 11, 4, 'sun', .78); oval(H, R, wrx, wry - 7, 4, 2, 'blue', .7);
  H.line(R, [[wrx + 7, wry], [wrx + 15, wry + 4], [wrx + 19, wry - 1]], 'coral', 1);
  benchFrame(H, R, 9.35, 2.2, 1.65, 1.7, .5, 'teal');
  for (const [x, j] of [[9.5, 2.3], [10.8, 2.3], [9.5, 3.7], [10.8, 3.7]]) caster(H, R, x, j);
  bentTube(H, R, [[10.7, 2.3, .5], [10.7, 2.3, 1.24], [9.58, 2.3, 1.24], [9.58, 2.3, .5]], 2, 'teal');
  parcel(H, R, 10.21, 3.09, .62, .67);
  benchFrame(H, R, 9.35, 7.56, 2.08, 1.35, .68, 'sun');
  for (const i of [9.42, 11.21]) timber(H, R, i, 7.56, .1, .13, .64, .97, 'teal');
  timber(H, R, 9.39, 7.59, 1.94, .12, 1.41, .17, 'teal');
  drape(H, R, 10.51, 7.58, .63, .45, 1.6, .68, 'blue');
  const [flx, fly] = H.p(9.62, 8.2, .73);
  shape(H, R, [[flx - 6, fly], [flx + 6, fly], [flx + 6, fly - 22], [flx + 4, fly - 25], [flx - 4, fly - 25], [flx - 6, fly - 22]], 'paper', 1, .7);
  oval(H, R, flx, fly - 25, 5, 2, 'coral', .7);
  H.line(R, [[flx - 3, fly - 19], [flx - 3, fly - 4]], 'teal', 1.1);
  drape(H, R, 9.82, 7.78, 1.16, .73, .7, .5, 'coral');
  cushion(H, R, 9.6, 9.18, 1.58, .83, .03, .13, 'blue');
  for (const x of [9.92, 10.6]) { const [a, b] = H.p(x, 9.42, .18); shape(H, R, [[a - 6, b], [a + 7, b], [a + 8, b - 5], [a + 3, b - 8], [a + 3, b - 17], [a - 5, b - 17]], 'blue', .8, .7); }
  hangingRail(H, R, 'ne', 8.8, 2.4, 4.17, 3, (P, u, n) => { const [x, y] = P(u, -.2); if (n === 0) spokedWheel(H, R, x, y + 13, 10, 'sun', 0, .75); else { H.line(R, [[x, y], [x, y + 22]], 'blue', 1.1); oval(H, R, x, y + 22, 7, 3, 'coral', .7); } });
  benchFrame(H, R, 3.43, 9.07, 3.14, 1.89, .43, 'teal');
  drape(H, R, 3.57, 9.2, 2.85, 1.48, .47, .22, 'paper');
  const [ropeX, ropeY] = H.p(6.02, 10.07, .51);
  stroke(H, R, [[ropeX - 6, ropeY + 5], [ropeX - 14, ropeY - 8], [ropeX - 7, ropeY - 22], [ropeX + 9, ropeY - 18], [ropeX + 12, ropeY - 7], [ropeX + 4, ropeY], [ropeX - 6, ropeY + 5], [ropeX - 13, ropeY + 17]], 'sun', 4);
  for (let n = 0; n < 5; n++) H.line(R, [[ropeX - 10 - n, ropeY + 4 + n * 2], [ropeX - 4 - n, ropeY + 6 + n * 2]], 'coral', 1);
  metal(H, R, 5.59, 9.35, .62, .33, .49, .15, 'blue');
  H.line(R, [H.p(5.69, 9.4, .67), H.p(6.06, 9.4, .67)], 'paper', 1.2);
  metal(H, R, 7.07, 10.69, 3.9, .42, .025, .07, 'teal');
  for (let n = 0; n < 16; n++) H.line(R, [H.p(7.2 + n * .23, 10.73, .1), H.p(7.2 + n * .23, 11.05, .1)], 'blue', 1.2);
  taskLight(H, R, 9.01, 1.76, 1.22, 'coral', .63);
  parcel(H, R, 4.3, 10.0, .52, .45);
  const [cx, cy] = H.p(5.3, 9.85, .5); for (let n = 0; n < 4; n++) H.outline(R, ell(cx, cy, 11 + n * 2, 4 + n), 'coral', .8);
  floorLight(H, 6.1, 3.8, 140, .38);
}, (H, R, t) => {
  const u = cycle(t, 16) * 16, lift = ease(3.2, 6.4, u) * (1 - ease(9.6, 14, u)), z = .54 + lift * 2.08;
  const top = H.p(6.12, 3.84, 4.36), weight = H.p(7.36, 3.63, 3.0 - lift * 2.08);
  const hook = parcel(H, R, 6.12, 3.84, z, 1.15);
  H.line(R, [hook, top, H.p(7.36, 3.63, 4.36), [weight[0], weight[1] - 14]], 'coral', 1.8);
  metal(H, R, 7.17, 3.48, .38, .31, 2.64 - lift * 2.08, .51, 'blue');
  for (const xx of [-6, 6]) H.line(R, [[weight[0] + xx, weight[1] - 12], [weight[0] + xx, weight[1] - 3]], 'paper', .7);
  for (const [i, j] of [[6.12, 3.84], [7.36, 3.63], [7.58, 5.04]]) { const [x, y] = H.p(i, j, 4.36); shape(H, R, [[x - 13, y - 5], [x - 9, y - 16], [x + 9, y - 16], [x + 13, y - 5], [x + 10, y + 12], [x - 10, y + 12]], 'teal', .45, .75); spokedWheel(H, R, x, y, 10, 'sun', lift * 4, .85); H.dot(x, y, 2.5, 'blue'); H.dot(x, y, .8, 'paper'); H.line(R, [[x, y - 2], [x, y - 18]], 'blue', 2); }
  const upper = H.p(7.58, 5.04, 4.36);
  actor(H, R, 7.72, 5.36, t, 'istanbulHoistPorter', { shirt: ['coral', .7], pants: ['blue', .8], prop(HH, RR, pts) { stroke(HH, RR, [upper, pts.farHand, pts.nearHand, H.p(7.78, 5.15, .6)], 'sun', 1.6); } }, 0, 1.7);
  actor(H, R, 3.7, 2.8, u / 16 * 3, 'idle', { shirt: ['teal', .7], hairStyle: 'bun' }, 2.11, 1.45);
  const [tx, ty] = H.p(6.32, 3.95, z); stroke(H, R, [[tx, ty - 12], [tx + 7, ty - 5], [tx + 9 + Math.sin(u / 16 * Math.PI * 8) * 2, ty]], 'coral', .8);
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
