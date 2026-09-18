import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, drape, spokedWheel, bentTube, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, cornice, caster, hangingRail } from '../joinery.js';

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
  windowBay(H, R, 'nw', 1.7, 4.6, 2.5, 1.76, { divisions: 3 });
  windowBay(H, R, 'ne', 2.1, 4.9, 3.45, .83, { divisions: 4 });
  for (const x of [.85, 4.5]) for (const j of [1.05, 4.2]) { timber(H, R, x, j, .24, .24, 0, 2.02, 'sun'); metal(H, R, x - .025, j - .025, .29, .29, .04, .18, 'blue'); }
  for (const j of [1.12, 4.15]) timber(H, R, .85, j, 3.92, .24, 1.76, .3, 'sun');
  boardFloor(H, R, .8, 1.03, 4.05, 3.42, 2.1, 'sun', .38);
  for (const x of [1.05, 2.15, 3.3, 4.6]) { timber(H, R, x, 1.03, .11, .13, 2.1, 1, 'teal'); H.dot(...H.p(x + .06, 1.04, 2.94), 1, 'sun'); }
  timber(H, R, .94, .99, 3.83, .16, 3.05, .12, 'teal');
  for (let n = 0; n < 7; n++) timber(H, R, 1.15, 4.4 + n * .53, 1.65, .6, 0, 2.08 - n * .285, 'sun');
  for (const x of [1.16, 2.67]) bentTube(H, R, [[x, 4.3, 3.02], [x, 5.8, 2.2], [x, 8.1, 1.03]], 2.5, 'teal');
  for (const j of [4.5, 6.15, 7.95]) timber(H, R, 2.67, j, .09, .09, .18 + (8 - j) * .49, .83, 'teal');
  timber(H, R, 4.7, 3.3, 2.15, 1.3, 1.9, .22, 'sun');
  H.line(R, [H.p(4.7, 4.5, 1.95), H.p(4.65, 3.9, .8), H.p(6.65, 3.9, 1.94)], 'blue', 3);
  cushion(H, R, 5.52, 3.43, 1.11, .93, 2.14, .15, 'teal');
  cushion(H, R, 5.52, 3.43, 1.11, .93, .06, .15, 'teal');
  for (const [x, j] of [[5.2, 2.85], [8.04, 3.5]]) { timber(H, R, x, j, .25, .28, 0, 4.6, 'sun'); metal(H, R, x - .04, j - .04, .33, .36, .06, .26, 'blue'); }
  timber(H, R, 5.1, 2.8, 3.22, .36, 4.46, .32, 'sun');
  for (const x of [5.25, 7.95]) { metal(H, R, x, 2.76, .25, .48, 4.21, .43, 'blue'); for (const z of [4.3, 4.55]) H.dot(...H.p(x + .12, 3.26, z), 1.8, 'sun'); }
  bentTube(H, R, [[6.12, 2.98, 4.52], [6.12, 3.84, 4.52], [7.58, 5.04, 4.52]], 3, 'blue');
  for (const x of [7.1, 7.62]) { metal(H, R, x, 3.6, .065, .08, .25, 3.63, 'teal'); }
  for (const z of [.36, 1.5, 2.6, 3.85]) H.line(R, [H.p(7.1, 3.63, z), H.p(7.64, 3.63, z)], 'blue', 1.2);
  cabinetFrame(H, R, 8.6, .3, 2.96, 1.26, .08, 3.5, 2, 'teal', (x, j, w, d, z, h, n) => {
    for (const zt of [1.05, 2.0, 2.85]) timber(H, R, x, j, w, d, zt, .09, 'sun');
    for (let k = 0; k < 3; k++) drape(H, R, x + .12, j + .14, w - .2, d - .2, 1.2 + k * .13, .1, k === 1 ? 'coral' : 'paper');
    if (n === 0) for (let k = 0; k < 3; k++) { const [a, b] = H.p(x + .3 + k * .34, j + .52, 2.12); oval(H, R, a, b - 14, 7, 14, 'paper', 1); H.outline(R, ell(a, b - 14, 3, 9), 'coral', .8); }
    else { for (let k = 0; k < 4; k++) timber(H, R, x + .1, j + .12, w - .22, d - .24, 2.15 + k * .07, .06, 'paper'); }
    parcel(H, R, x + w * .5, j + .45, 2.99, .35);
  });
  benchFrame(H, R, 9.35, 2.2, 1.65, 1.7, .5, 'teal');
  for (const [x, j] of [[9.5, 2.3], [10.8, 2.3], [9.5, 3.7], [10.8, 3.7]]) caster(H, R, x, j);
  bentTube(H, R, [[10.7, 2.3, .5], [10.7, 2.3, 1.24], [9.58, 2.3, 1.24], [9.58, 2.3, .5]], 2, 'teal');
  benchFrame(H, R, 9.7, 7.7, 1.5, 1.1, .68, 'sun');
  drape(H, R, 9.82, 7.78, 1.16, .73, .7, .5, 'coral');
  cushion(H, R, 9.6, 9.18, 1.58, .83, .03, .13, 'blue');
  for (const x of [9.92, 10.6]) { const [a, b] = H.p(x, 9.42, .18); shape(H, R, [[a - 6, b], [a + 7, b], [a + 8, b - 5], [a + 3, b - 8], [a + 3, b - 17], [a - 5, b - 17]], 'blue', .8, .7); }
  hangingRail(H, R, 'ne', 8.8, 2.4, 4.17, 3, (P, u, n) => { const [x, y] = P(u, -.2); if (n === 0) spokedWheel(H, R, x, y + 13, 10, 'sun', 0, .75); else { H.line(R, [[x, y], [x, y + 22]], 'blue', 1.1); oval(H, R, x, y + 22, 7, 3, 'coral', .7); } });
  drape(H, R, 3.5, 9.4, 2.3, 1.5, .04, .025, 'teal');
  parcel(H, R, 4.3, 10.0, .17, .45);
  const [cx, cy] = H.p(5.3, 9.85, .1); for (let n = 0; n < 4; n++) H.outline(R, ell(cx, cy, 11 + n * 2, 4 + n), 'coral', .8);
  floorLight(H, 6.1, 3.8, 140, .38);
}, (H, R, t) => {
  const u = cycle(t, 16) * 16, lift = ease(3.2, 6.4, u) * (1 - ease(9.6, 14, u)), z = .54 + lift * 2.08;
  const top = H.p(6.12, 3.84, 4.36), weight = H.p(7.36, 3.63, 3.0 - lift * 2.08);
  const hook = parcel(H, R, 6.12, 3.84, z, 1.15);
  H.line(R, [hook, top, H.p(7.36, 3.63, 4.36), [weight[0], weight[1] - 14]], 'coral', 1.8);
  metal(H, R, 7.17, 3.48, .38, .31, 2.64 - lift * 2.08, .51, 'blue');
  for (const xx of [-6, 6]) H.line(R, [[weight[0] + xx, weight[1] - 12], [weight[0] + xx, weight[1] - 3]], 'paper', .7);
  for (const [i, j] of [[6.12, 3.84], [7.36, 3.63], [7.58, 5.04]]) { const [x, y] = H.p(i, j, 4.36); spokedWheel(H, R, x, y, 10, 'sun', lift * 4, .85); H.line(R, [[x, y - 2], [x, y - 18]], 'blue', 2); }
  const upper = H.p(7.58, 5.04, 4.36);
  actor(H, R, 7.72, 5.36, t, 'istanbulHoistPorter', { shirt: ['coral', .7], pants: ['blue', .8], prop(HH, RR, pts) { stroke(HH, RR, [upper, pts.farHand, pts.nearHand, H.p(7.78, 5.15, .6)], 'sun', 1.6); } }, 0, 1.7);
  actor(H, R, 3.7, 2.8, u / 16 * 3, 'idle', { shirt: ['teal', .7], hairStyle: 'bun' }, 2.11, 1.45);
  const [tx, ty] = H.p(6.32, 3.95, z); stroke(H, R, [[tx, ty - 12], [tx + 7, ty - 5], [tx + 9 + Math.sin(u / 16 * Math.PI * 8) * 2, ty]], 'coral', .8);
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
