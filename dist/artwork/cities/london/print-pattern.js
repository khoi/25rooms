import { world, shape, stroke, oval, wallPt, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, vessel, branchSpray, drape, bentTube } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, wallRack, hangingRail, floorShadow, specimen } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const rest = FIGURES.clips.idle.keys[0][1];
FIGURES.clips.londonPatternDesigner = { dur: 22, keys: [[0, { ...rest }], [1, { ...rest }]] };
function leaf(H, R, P, u, v, size, ink = 'teal', turn = 0, hole = false) {
  const Q = (a, b) => P(u + (a * Math.cos(turn) - b * Math.sin(turn)) * size, v + (a * Math.sin(turn) + b * Math.cos(turn)) * size);
  shape(H, R, [Q(-.42, -.08), Q(-.2, .33), Q(.07, .43), Q(.48, .15), Q(.4, -.13), Q(.1, -.34), Q(-.25, -.24)], ink, .62, .65);
  H.line(R, [Q(-.44, -.15), Q(0, .04), Q(.46, .2)], 'sun', 1.0);
  for (const n of [-.22, 0, .2]) { H.line(R, [Q(n, n * .45 + .03), Q(n + .04, .27)], 'paper', .65); H.line(R, [Q(n, n * .45 + .03), Q(n + .13, -.16)], 'paper', .65); }
  if (hole) oval(H, R, ...Q(.12, .21), 3, 2, 'paper', 1);
}
function tile(H, R, P, ink = 'teal', turn = 0, missing = false) {
  const corners = [P(-.58, -.42), P(.58, -.42), P(.58, .42), P(-.58, .42)];
  surface(H, R, corners, 'paper', 1, .6);
  H.line(R, [P(-.56, -.38), P(.54, -.38)], 'sun', 1.7);
  leaf(H, R, P, -.07, .02, .83, ink, turn);
  if (!missing) shape(H, R, [P(.4, -.35), P(.52, -.18), P(.32, -.14)], 'coral', .75, .4);
}
function folio(H, R, i, j, z, w, d, ink) {
  timber(H, R, i, j, w, d, z, .045, ink);
  surface(H, R, H.tile(i + .035, j + .035, w - .07, d - .07, z + .05), 'paper', 1, .5);
  H.line(R, [H.p(i + .11, j, z + .06), H.p(i + .11, j + d, z + .06)], ink, 2.5);
}
const boardPoint = (H, u, v) => H.p(3.25 + u, 3.25 - v * .2, 1.05 + v);
const room = world('london-print-pattern', 'A leaf turned sideways', { floor: 'paper', wall: 'paper', wallTone: .88, height: 3.8, head: 35 }, (H, R) => {
  boardFloor(H, R, .03, .03, 11.94, 11.94, .025, 'paper', .75);
  for (let u = .15; u < 11.8; u += .6) { surface(H, R, H.tile(u, 11.1, .5, .52, .035), u % 1.2 < .6 ? 'teal' : 'coral', .35, .4); surface(H, R, H.tile(11.1, u, .52, .5, .035), 'teal', .25, .4); }
  windowBay(H, R, 'ne', 1.5, 8.9, 2.25, 1.25, { divisions: 5, ink: 'teal', view: Q => { for (let n = 0; n < 7; n++) { const x = .3 + n * 1.2; surface(H, R, [Q(x, .13), Q(x + 1, .13), Q(x + 1, .4 + n % 3 * .17), Q(x, .4 + n % 3 * .17)], n % 2 ? 'teal' : 'coral', .2, .4); } } });
  for (const u of [1.45, 10.43]) { H.line(R, [wallPt(H, 'ne', u, 3.48, -.25), wallPt(H, 'ne', u + .5, 3.23, -.55)], 'blue', 1.5); }
  wallRack(H, R, 'nw', .65, 8.8, .4, 3.05, 4, 'teal', (Q, z, row) => {
    if (row === 0) for (let k = 0; k < 6; k++) { const u = .18 + k * 1.38; surface(H, R, [Q(u, z + .04), Q(u + 1.24, z + .04), Q(u + 1.24, z + .55), Q(u, z + .55)], 'sun', .35, .65); H.line(R, [Q(u + .42, z + .26), Q(u + .77, z + .26)], 'blue', 1.4); }
    if (row === 1) for (let k = 0; k < 7; k++) { const u = .21 + k * 1.19; surface(H, R, [Q(u, z + .05), Q(u + .99, z + .05), Q(u + .99, z + .52), Q(u, z + .52)], 'sun', .55, .6); leaf(H, R, Q, u + .48, z + .29, .45, k % 3 ? 'teal' : 'coral', k === 4 ? 1.57 : .1); }
    if (row === 2) for (let k = 0; k < 5; k++) { const u = .4 + k * 1.56; for (let q = 0; q < 3; q++) { const [x, y] = Q(u + q * .19, z + .42); oval(H, R, x, y, 5.4, 4, q % 2 ? 'coral' : 'paper', .75); H.line(R, [[x, y + 4], [x + 3, y + 14]], 'blue', .7); } }
    if (row === 3) for (let k = 0; k < 4; k++) { const u = .3 + k * 2.05; surface(H, R, [Q(u, z + .04), Q(u + 1.65, z + .04), Q(u + 1.65, z + .49), Q(u, z + .49)], k % 2 ? 'coral' : 'paper', .75, .5); H.line(R, [Q(u + .2, z + .13), Q(u + .2, z + .44)], 'teal', 2); }
  });
  timber(H, R, .12, 9.7, .85, 1.7, 0, 1.2, 'teal');
  for (const z of [.25, .53, .81]) H.line(R, [H.p(.98, 9.78, z), H.p(.98, 11.25, z)], 'blue', .9);
  const Q = (u, v) => boardPoint(H, u, v);
  floorShadow(H, 2.85, 2.75, 6.35, 3, .14);
  for (const i of [3.4, 8.05]) { timber(H, R, i, 2.7, .2, 2.7, .02, .13, 'teal'); bentTube(H, R, [[i + .1, 2.82, .17], [i + .1, 2.9, 3.21]], 4.1, 'teal'); bentTube(H, R, [[i + .1, 5.25, .16], [i + .1, 2.9, 2.53]], 2.7, 'teal'); }
  surface(H, R, [Q(-.14, -.14), Q(5.44, -.14), Q(5.44, 2.28), Q(-.14, 2.28)], 'sun', .55, 1.3);
  surface(H, R, [Q(0, 0), Q(5.3, 0), Q(5.3, 2.14), Q(0, 2.14)], 'blue', .55, .8);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { if (r === 0 && c === 3) continue; const P = (a, b) => Q(.68 + c * 1.3 + a, .55 + r * 1.03 + b); tile(H, R, P, (r + c) % 3 ? 'teal' : 'coral', c % 2 ? Math.PI : 0, c === 1 && r === 0); }
  for (const u of [.2, 5.08]) { metal(H, R, 3.25 + u, 2.69, .19, .24, 3.18, .12, 'blue'); H.dot(...Q(u, 2.18), 2.6, 'sun', .9, { knock: true }); }
  H.line(R, [Q(-.12, -.05), Q(5.43, -.05)], 'paper', 2);
  for (const u of [.3, 1.65, 3, 4.35]) { H.line(R, [Q(u, -.05), Q(u + .22, -.05)], 'blue', 2); }
  benchFrame(H, R, 7.6, .75, 3.3, 1.1, 1.12, 'sun');
  metal(H, R, 8.05, 1.0, 1.25, .58, 1.13, .06, 'blue');
  H.line(R, [H.p(8.25, 1.21, 1.29), H.p(8.95, 1.21, 1.29)], 'blue', 9); H.line(R, [H.p(8.63, 1.2, 1.3), H.p(8.63, 1.63, 1.3)], 'sun', 3);
  for (const [i, ink] of [[9.65, 'teal'], [10.2, 'coral']]) vessel(H, R, i, 1.12, 1.16, 8, 13, ink, false);
  drape(H, R, 10.3, 1.26, .5, .45, 1.14, .52, 'paper');
  hangingRail(H, R, 'ne', 10.2, 1.2, 2.0, 1, (P, u) => { const [x, y] = P(u, -.14); shape(H, R, [[x - 7, y], [x + 7, y], [x + 13, y + 44], [x - 12, y + 44]], 'coral', .45, .75); H.line(R, [[x - 5, y + 5], [x - 7, y + 35]], 'paper', .85); });
  vessel(H, R, 10.3, 6.95, 0, 17, 29, 'coral');
  const [px, py] = H.p(10.3, 6.95, .9);
  specimen(H, R, px, py, 1.8, 'teal');
  leaf(H, R, (a, b) => [px + a * 35, py - 46 + b * 35], .35, -.3, .8, 'teal', -.5, true);
  benchFrame(H, R, 3.0, 8.2, 4.5, 1.8, .78, 'sun');
  folio(H, R, 3.25, 8.42, .8, 1.65, 1.25, 'coral');
  leaf(H, R, (u, v) => H.p(4.02 + u, 9.02 + v, .89), 0, 0, .78, 'teal', .3, true);
  folio(H, R, 5.24, 8.44, .8, 1.7, 1.15, 'teal');
  const overlay = H.tile(5.4, 8.65, 1.0, .8, .9); H.tint(overlay, 'coral', .22); H.outline(R, overlay, 'blue', .7);
  metal(H, R, 6.75, 9.3, .5, .48, .8, .07, 'teal');
  oval(H, R, ...H.p(6.99, 9.52, .89), 7, 4, 'paper', 1);
  timber(H, R, 10.7, 10.75, .62, .45, .02, .18, 'sun');
  leaf(H, R, (u, v) => H.p(11.0 + u, 10.95 + v, .22), 0, 0, .48, 'coral', .5);
  H.line(R, [H.p(11.5, 8.5, .025), H.p(11.5, 11.65, .025)], 'blue', 2);
}, (H, R, t) => {
  const u = cycle(t, 22) * 22, lift = u < 4.4 ? smooth(u / 4.4) : u < 13.2 ? 1 : 1 - smooth((u - 13.2) / 6.8);
  const turn = u < 4.4 ? 0 : u < 8.8 ? smooth((u - 4.4) / 4.4) : u < 13.2 ? 1 : 1 - smooth((u - 13.2) / 6.8);
  const Q = (a, b) => boardPoint(H, 5.16 + (a - .58) * Math.cos(turn * Math.PI), .55 + b + lift * .26);
  tile(H, R, Q, 'teal', turn * Math.PI);
  const target = Q(.58, -.12), foot = H.p(8.72, 3.51), scale = 1.8;
  const q = { ...rest, head: 6 + 8 * turn, al: 37, el: 52 };
  const dx = (target[0] - foot[0]) / scale - 5.2, dy = (target[1] - foot[1]) / scale + 32.5, a = 4.368, b = 4.2;
  const len = Math.min(a + b - .001, Math.max(.2, Math.hypot(dx, dy))), bend = Math.acos((len * len - a * a - b * b) / (2 * a * b));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(bend), a + b * Math.cos(bend))) * 180 / Math.PI; q.er = bend * 180 / Math.PI;
  FIGURES.clips.londonPatternDesigner.keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x: foot[0], y: foot[1], scale, clip: 'londonPatternDesigner', phase: 0, face: 'se', ground: foot, opts: { shirt: ['coral', .68], apron: ['paper', .86], hairStyle: 'bun' } });
  H.dot(...target, 2.8, 'coral', .35, { knock: true });
  const p = boardPoint(H, .2, 1.9), sway = Math.sin(u * TAU / 22) * 3;
  H.opacity(.43, () => shape(H, R, [[p[0], p[1]], [p[0] + 40, p[1] + 20], [p[0] + 44 + sway, p[1] + 58], [p[0] + 3, p[1] + 38]], 'paper', 1, .5));
  const [x, y] = H.p(.57, 8.85, 2.85);
  shape(H, R, [[x, y], [x + 21, y - 10], [x + 22 + sway * .3, y + 17], [x + 2, y + 26]], 'coral', .42, .5);
  H.line(R, [[x + 4, y + 21], [x + 21, y + 13]], 'sun', 1.5);
});
room.loopSeconds = 22;
room.stillTime = 11;
export default room;
