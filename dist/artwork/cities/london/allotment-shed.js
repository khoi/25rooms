import { world, shape, stroke, oval, ell, cycle, TAU, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, drape, cushion, vessel, branchSpray } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { wallRack, hangingRail, floorShadow, specimen } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const rest = FIGURES.clips.idle.keys[0][1];
FIGURES.clips.londonColdFrameGardener = { dur: 22, keys: [[0, { ...rest }], [1, { ...rest }]] };
FIGURES.clips.londonColdFrameNeighbour = { dur: 22, keys: [[0, { ...rest, al: 40, ar: 48, el: 38, er: 58, head: 12 }], [.4, { ...rest, al: 40, ar: 48, el: 38, er: 58, head: 12 }], [.5, { ...rest, al: 47, ar: 63, el: 42, er: 44, head: 17 }], [.6, { ...rest, al: 40, ar: 48, el: 38, er: 58, head: 12 }], [1, { ...rest, al: 40, ar: 48, el: 38, er: 58, head: 12 }]] };
function pot(H, R, i, j, z, size = 1, ink = 'coral') {
  const [x, y] = H.p(i, j, z), w = 11 * size, h = 16 * size;
  surface(H, R, [[x - w, y - h], [x + w, y - h], [x + w * .68, y], [x - w * .68, y]], ink, .6, .7);
  oval(H, R, x, y - h, w + 1, w * .36, ink, .65); oval(H, R, x, y - h, w - 2, w * .22, 'blue', .58);
  H.line(R, [[x - w * .7, y - h + 4], [x - w * .44, y - 3]], 'sun', .8);
  return [x, y - h];
}
function tool(H, R, P, u, kind, length = 1.2) {
  H.line(R, [P(u, 0), P(u, -length)], 'sun', 3);
  if (kind === 'fork') {
    H.line(R, [P(u - .22, -length), P(u + .22, -length)], 'blue', 2.3);
    for (const d of [-.21, -.07, .07, .21]) H.line(R, [P(u + d, -length), P(u + d, -length - .43)], 'teal', 2.1);
  } else if (kind === 'spade') surface(H, R, [P(u - .2, -length + .07), P(u + .2, -length + .07), P(u + .19, -length - .34), P(u, -length - .5), P(u - .19, -length - .34)], 'teal', .73, .6);
  else { H.line(R, [P(u - .35, -length), P(u + .35, -length)], 'blue', 2); for (let n = 0; n < 6; n++) H.line(R, [P(u - .3 + n * .12, -length), P(u - .3 + n * .12, -length - .19)], 'teal', 1.3); }
  const [x, y] = P(u, .08); H.outline(R, ell(x, y, 5, 6), 'sun', 2.5);
}
const room = world('london-allotment-shed', 'A tool for next season', { wall: false, floor: 'paper', head: 70 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.25) for (let j = 0; j < 12; j += 1.25) { surface(H, R, H.tile(i + .035, j + .035, Math.min(1.17, 11.95 - i), Math.min(1.17, 11.95 - j), .03), 'sun', (i + j) % 2.5 ? .15 : .08, .5); if ((i + j) % 3.75 === 0) H.line(R, [H.p(i + .1, j, .04), H.p(i + .4, j, .04)], 'teal', 1.6, { tone: .6 }); }
  masonry(H, R, 'nw', 0, 11.9, 0, 3.5, 'paper', .78);
  masonry(H, R, 'ne', 0, 11.9, 0, 2.95, 'coral', .28);
  for (const i of [.25, 11.3]) timber(H, R, i, .45, .19, .19, .03, 3.64, 'teal');
  timber(H, R, .2, .39, 11.36, .32, 3.47, .2, 'sun');
  timber(H, R, .1, .0, 11.7, .62, 3.64, .14, 'teal');
  bentTube(H, R, [[.4, .32, 3.66], [11.6, .32, 3.66], [11.72, .46, 3.45], [11.72, .46, .3], [11.28, .95, .16]], 3.6, 'blue');
  for (let n = 0; n < 5; n++) metal(H, R, 11.59, .39, .23, .18, .65 + n * .57, .075, 'sun');
  const barrel = H.p(10.73, 1.74, .03);
  surface(H, R, [[barrel[0] - 24, barrel[1] - 50], [barrel[0] + 24, barrel[1] - 50], [barrel[0] + 21, barrel[1]], [barrel[0] - 21, barrel[1]]], 'teal', .7, .9);
  for (const y of [barrel[1] - 39, barrel[1] - 13]) { H.line(R, [[barrel[0] - 22, y], [barrel[0], y + 5], [barrel[0] + 22, y]], 'blue', 3); }
  oval(H, R, barrel[0], barrel[1] - 50, 24, 9, 'paper', 1); oval(H, R, barrel[0], barrel[1] - 50, 20, 6, 'blue', .6);
  bentTube(H, R, [[10.72, 2.34, .49], [10.72, 2.53, .49], [10.72, 2.53, .35]], 2.4, 'sun');
  for (let n = 0; n < 7; n++) H.line(R, [H.p(10.29, 2.65 + n * .11, .06), H.p(11.4, 2.65 + n * .11, .06)], 'blue', 1.2);
  wallRack(H, R, 'nw', 1.0, 8.6, .3, 2.83, 3, 'teal', (Q, z, row) => {
    if (row === 0) for (let n = 0; n < 6; n++) { const u = .22 + n * 1.37; surface(H, R, [Q(u, z + .06), Q(u + 1.14, z + .06), Q(u + 1.14, z + .68), Q(u, z + .68)], 'sun', .46, .65); const [x, y] = Q(u + .56, z + .44); shape(H, R, [[x - 5, y + 2], [x, y - 5], [x + 5, y + 2]], n % 2 ? 'coral' : 'teal', .6, .5); }
    if (row === 1) for (let n = 0; n < 6; n++) { const [x, y] = Q(.65 + n * 1.37, z + .17); shape(H, R, [[x - 10, y - 16], [x + 10, y - 16], [x + 7, y], [x - 7, y]], 'coral', .57, .7); oval(H, R, x, y - 16, 10, 4, 'sun', .7); oval(H, R, x, y - 16, 7, 2.5, 'blue', .6); }
    if (row === 2) for (let n = 0; n < 4; n++) { const u = .27 + n * 2.04; surface(H, R, [Q(u, z + .08), Q(u + 1.75, z + .08), Q(u + 1.75, z + .52), Q(u, z + .52)], n % 2 ? 'paper' : 'coral', n % 2 ? 1 : .4, .6); for (let k = 0; k < 4; k++) H.line(R, [Q(u + .1, z + .16 + k * .08), Q(u + 1.65, z + .16 + k * .08)], 'blue', .5, { tone: .4 }); }
  });
  hangingRail(H, R, 'ne', 5.6, 4.35, 2.78, 4, (P, u, n) => tool(H, R, (a, z) => P(a, z - .18), u, ['spade', 'fork', 'rake', 'spade'][n], n === 3 ? .59 : 1.26));
  benchFrame(H, R, 1.15, 1.0, 7.5, 1.7, 1.15, 'sun');
  metal(H, R, 1.47, 1.21, 2.4, 1.2, 1.16, .07, 'teal');
  surface(H, R, H.tile(1.67, 1.4, 1.98, .82, 1.23), 'blue', .59, .6);
  for (let n = 0; n < 8; n++) H.line(R, [H.p(1.69 + n * .25, 1.4, 1.24), H.p(1.69 + n * .25, 2.22, 1.24)], 'sun', .55);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(1.69, 1.42 + n * .25, 1.24), H.p(3.65, 1.42 + n * .25, 1.24)], 'sun', .55);
  for (const [i, j, s] of [[4.2, 1.66, 1], [5.0, 1.6, .75], [5.65, 1.96, .9]]) pot(H, R, i, j, 1.18, s);
  drape(H, R, 7.27, 1.44, .95, 1.19, 1.18, .42, 'paper');
  timber(H, R, 6.05, 1.32, .53, .49, 1.17, .47, 'sun');
  oval(H, R, ...H.p(6.32, 1.58, 1.65), 6, 3.1, 'blue', .6);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(2.2 + n * .18, .77, 3.02), H.p(6.0 + n * .18, .77, 3.29)], 'sun', 2.1);
  for (const i of [3.2, 5.5]) H.line(R, [H.p(i, .7, 2.91), H.p(i, .93, 3.38)], 'coral', 2.6);
  floorShadow(H, 3.0, 4.2, 5.9, 3.0, .2);
  for (const j of [4.3, 6.94]) timber(H, R, 3.02, j, 5.63, .19, .12, j === 4.3 ? .87 : .6, 'sun');
  for (const i of [3.02, 8.45]) {
    surface(H, R, [H.p(i, 4.3, .14), H.p(i, 7.13, .14), H.p(i, 7.13, .72), H.p(i, 4.3, .99)], 'sun', .53, .9);
    for (const z of [.32, .51]) H.line(R, [H.p(i + .02, 4.44, z), H.p(i + .02, 7.01, z)], 'coral', .6);
  }
  surface(H, R, H.tile(3.22, 4.5, 5.21, 2.45, .2), 'blue', .6, .75);
  for (const i of [3.27, 5.02, 6.77]) {
    metal(H, R, i, 4.6, 1.49, 2.13, .23, .1, 'teal');
    surface(H, R, H.tile(i + .11, 4.71, 1.27, 1.91, .34), 'blue', .75, .5);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) { const [x, y] = H.p(i + .4 + c * .62, 5.02 + r * .6, .36); H.line(R, [[x, y], [x, y - 9 - r * 2]], 'teal', 1.3); shape(H, R, [[x, y - 4], [x - 7, y - 11], [x - 8, y - 5]], 'teal', .67, .4); shape(H, R, [[x, y - 5], [x + 8, y - 12], [x + 7, y - 4]], 'teal', .55, .4); }
  }
  for (const i of [3.12, 8.45]) for (const j of [4.39, 6.94]) { metal(H, R, i - .055, j - .06, .21, .2, .52, .18, 'teal'); H.dot(...H.p(i + .02, j + .12, .59), 1.5, 'sun'); }
  benchFrame(H, R, 1.1, 8.75, 2.7, 1.52, .69, 'teal');
  for (const [i, j, s] of [[1.5, 9.22, .78], [2.25, 9.54, .55], [2.94, 9.14, .62]]) pot(H, R, i, j, .72, s);
  const [cx, cy] = H.p(2.96, 9.77, .74); H.outline(R, ell(cx, cy, 9, 4), 'coral', 3); H.line(R, [[cx - 6, cy + 1], [cx - 3, cy - 5], [cx + 4, cy - 4]], 'blue', .7);
  benchFrame(H, R, 9.4, 8.65, 2.15, 1.1, .68, 'sun');
  cushion(H, R, 9.5, 8.75, 1.93, .88, .7, .13, 'coral');
  for (const i of [9.6, 11.25]) bentTube(H, R, [[i, 8.65, .7], [i, 8.57, 1.34]], 2.6, 'teal');
  timber(H, R, 9.47, 8.49, 1.98, .13, 1.04, .28, 'sun');
  vessel(H, R, 10.97, 9.37, .83, 6, 18, 'teal', false);
  for (const i of [10.02, 10.27]) { const [x, y] = H.p(i, 9.28, .86); shape(H, R, [[x - 3, y], [x + 4, y], [x + 5, y - 9], [x + 1, y - 7], [x - 1, y - 12], [x - 4, y - 8]], 'paper', 1, .6); }
  for (let n = 0; n < 5; n++) H.line(R, [H.p(.4, 10.3 + n * .18, .03), H.p(.4, 10.3 + n * .18, 2.8)], 'sun', 1.3);
  const [vx, vy] = H.p(.42, 10.54, 1.2); branchSpray(H, R, vx, vy, 1.3, 'teal'); stroke(H, R, [H.p(.43, 10.54, .15), H.p(.7, 10.75, 1), H.p(.3, 10.8, 1.7), H.p(.65, 10.32, 2.3)], 'teal', 1.3);
}, (H, R, t) => {
  const u = cycle(t, 22) * 22, lift = u < 4.4 ? 0 : u < 8.8 ? smooth((u - 4.4) / 4.4) : u < 13.2 ? 1 : 1 - smooth((u - 13.2) / 6.8), angle = -.1 + .42 * lift;
  const P = (i, d) => H.p(i, 4.36 + d * Math.cos(angle), .99 + d * Math.sin(angle));
  for (let n = 0; n < 4; n++) { const a = 3.11 + n * 1.34, pane = [P(a + .08, .07), P(a + 1.22, .07), P(a + 1.22, 2.67), P(a + .08, 2.67)]; H.tint(pane, n === 2 ? 'teal' : 'paper', n === 2 ? .15 : .36); H.outline(R, pane, 'blue', .6); H.line(R, [P(a + .22, .25), P(a + .58, 2.48)], 'paper', 2.6, { tone: .9 }); }
  for (let n = 0; n < 5; n++) { const i = 3.09 + n * 1.34; H.line(R, [P(i, 0), P(i, 2.77)], 'blue', 4); H.line(R, [P(i - .015, 0), P(i - .015, 2.77)], 'sun', 2.3); }
  for (const d of [0, 2.77]) { H.line(R, [P(3.04, d), P(8.52, d)], 'blue', 5); H.line(R, [P(3.04, d), P(8.52, d)], 'sun', 3); }
  for (const i of [3.9, 7.5]) { metal(H, R, i, 4.23, .37, .29, 1.01, .07, 'teal'); H.line(R, [P(i, 0), P(i + .32, 0)], 'paper', 1.0); }
  const prop = u < 6.5 ? 0 : u < 8.8 ? smooth((u - 6.5) / 2.3) : u < 13.2 ? 1 : 1 - smooth((u - 13.2) / 1.8);
  const propAngle = prop * 1.456, bottom = H.p(8.38, 6.7, .65), top = H.p(8.38, 6.7 - 1.08 * Math.cos(propAngle), .65 + 1.08 * Math.sin(propAngle));
  H.line(R, [bottom, top], 'blue', 3.3); H.line(R, [bottom, top], 'sun', 1.8);
  const splint = [bottom[0] * .4 + top[0] * .6, bottom[1] * .4 + top[1] * .6];
  H.line(R, [[splint[0] - 1, splint[1] - 7], [splint[0] + 2, splint[1] + 7]], 'teal', 3.1);
  for (const dy of [-4, 4]) H.line(R, [[splint[0] - 3, splint[1] + dy], [splint[0] + 4, splint[1] + dy]], 'coral', 1.0);
  const target = P(8.15, 2.77), [tx, ty] = target, foot = H.p(8.08, 7.86), scale = 2.2;
  const drop = .65 * (1 - lift), knee = Math.acos(1 - drop) * 180 / Math.PI;
  const q = { ...rest, head: 11, drop, ll: knee, lr: -knee, kl: -2 * knee, kr: 2 * knee, al: 45, el: 45 };
  const dx = (tx - foot[0]) / scale - 5.2, dy = (ty - foot[1]) / scale + 32.5 - drop * 19, a = 4.368, b = 4.2, l = Math.min(a + b - .001, Math.max(.2, Math.hypot(dx, dy))), e = Math.acos((l * l - a * a - b * b) / (2 * a * b));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(e), a + b * Math.cos(e))) * 180 / Math.PI; q.er = e * 180 / Math.PI;
  FIGURES.clips.londonColdFrameGardener.keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x: foot[0], y: foot[1], scale, clip: 'londonColdFrameGardener', phase: 0, face: 'se', ground: foot, opts: { shirt: ['teal', .7], apron: ['paper', .85], hairStyle: 'cap' } });
  H.dot(...target, 3, 'coral', .35, { knock: true });
  const shift = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - 8.8) / 4.4))) * .12, potPoint = H.p(2.86, 8.76 - shift, .95), neighbourFoot = H.p(3.35, 8.76), ns = 1.8;
  const nq = { ...rest, head: 13 + shift * 20, ar: 48, er: 58 }, nx = (potPoint[0] - neighbourFoot[0]) / ns + 5.2, ny = (potPoint[1] - 8.8 - neighbourFoot[1]) / ns + 32.5, nl = Math.min(8.567, Math.max(.2, Math.hypot(nx, ny))), ne = -Math.acos((nl * nl - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2));
  nq.al = (Math.atan2(nx, ny) - Math.atan2(4.2 * Math.sin(ne), 4.368 + 4.2 * Math.cos(ne))) * 180 / Math.PI; nq.el = ne * 180 / Math.PI;
  FIGURES.clips.londonColdFrameNeighbour.keys = [[0, nq], [1, nq]];
  FIGURES.draw(H, R, { who: 'adult', x: neighbourFoot[0], y: neighbourFoot[1], scale: ns, clip: 'londonColdFrameNeighbour', phase: 0, face: 'se', ground: neighbourFoot, opts: { shirt: ['coral', .68], hairStyle: 'bun' } });
  pot(H, R, 2.86, 8.76 - shift, .95, .55);
  const [x, y] = H.p(8.5, .74, 3.42), sway = Math.sin(TAU * u / 22) * 1.8;
  const net = [[x - 14, y], [x + 14, y], [x + 13 + sway, y + 27], [x - 11 + sway, y + 30]];
  H.tint(net, 'teal', .15); H.outline(R, net, 'blue', .7);
  H.clip(net, () => { for (let n = 0; n < 7; n++) { H.line(R, [[x - 20 + n * 6, y], [x + n * 6, y + 35]], 'teal', .5); H.line(R, [[x - 20 + n * 6, y + 35], [x + n * 6, y]], 'teal', .5); } });
});
room.loopSeconds = 22;
room.stillTime = 11;
export default room;
