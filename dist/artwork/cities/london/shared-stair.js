import { world, shape, stroke, oval, ell, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, drape, vessel, cushion } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame, wallCourse, hangingRail, floorShadow } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const rest = FIGURES.clips.idle.keys[0][1];
for (const name of ['londonStairParent', 'londonStairNeighbour']) FIGURES.clips[name] = { dur: 16, keys: [[0, { ...rest }], [1, { ...rest }]] };
function neighbour(H, R, i, j, name, target, color, lower = 0) {
  const [x, y] = H.p(i, j), scale = name === 'londonStairParent' ? 2.2 : 1.8;
  const q = { ...rest, head: 12, lean: lower, al: 16, el: 60 }, lean = lower * Math.PI / 180;
  const shoulderX = -Math.sin(lean) * 15 + 5.2 * Math.cos(lean) - 1.5 * Math.sin(lean), shoulderY = -19 - Math.cos(lean) * 15 + 5.2 * Math.sin(lean) + 1.5 * Math.cos(lean);
  const dx = (target[0] - x) / scale - shoulderX, dy = (target[1] - y) / scale - shoulderY, a = 4.368, b = 4.2;
  const l = Math.min(a + b - .001, Math.max(.2, Math.hypot(dx, dy))), e = Math.acos((l * l - a * a - b * b) / (2 * a * b));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(e), a + b * Math.cos(e))) * 180 / Math.PI; q.er = e * 180 / Math.PI;
  FIGURES.clips[name].keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x, y, scale, clip: name, phase: 0, face: 'se', ground: [x, y], opts: { shirt: [color, .7], hairStyle: name === 'londonStairParent' ? 'pony' : 'short' } });
}
function coat(H, R, x, y, ink, sway = 0) {
  shape(H, R, [[x - 4, y], [x + 5, y], [x + 15, y + 12], [x + 9, y + 17], [x + 10 + sway, y + 40], [x - 12 + sway, y + 40], [x - 10, y + 16], [x - 16, y + 12]], ink, .57, .8);
  H.line(R, [[x, y + 2], [x + 1, y + 37]], 'paper', .85);
  H.line(R, [[x - 7 + sway, y + 26], [x - 3 + sway, y + 29]], 'blue', 1.2);
}
const room = world('london-shared-stair', 'A buggy clears the turn', { height: 4.1, wall: 'paper', wallTone: .8, floor: 'paper', pattern: 'tiles', accent: 'teal', head: 75 }, (H, R) => {
  wallCourse(H, R, 'nw', .1, 11.9, 1.0, 'teal');
  wallCourse(H, R, 'ne', .1, 11.9, 1.0, 'teal');
  windowBay(H, R, 'ne', 4.65, 2.55, 1.65, 2.06, { ink: 'teal', divisions: 2, view: Q => { surface(H, R, [Q(.14, .16), Q(2.4, .16), Q(2.4, .65), Q(1.1, 1.2), Q(.14, .8)], 'teal', .25, .4); } });
  for (const z of [1.1, 2.35]) timber(H, R, .02, .45, .7, 1.9, z, .12, 'sun');
  const doorway = recessedFrame(H, R, 'ne', .6, 3.1, .05, 3.8, 'teal', P => {
    surface(H, R, [P(.17, .13), P(2.93, .13), P(2.93, 3.62), P(.17, 3.62)], 'sun', .24, .7);
    for (const [a, b] of [[.36, 1.37], [1.7, 2.72]]) for (const [c, d] of [[.3, 1.12], [1.31, 3.3]]) { surface(H, R, [P(a, c), P(b, c), P(b, d), P(a, d)], c > 1 ? 'paper' : 'teal', c > 1 ? .95 : .23, .6); if (c > 1) H.line(R, [P(a + .12, c + .15), P(b - .15, d - .15)], 'teal', 1.3); }
  });
  H.line(R, [doorway(2.67, 1.54), doorway(2.37, 1.54)], 'blue', 2.6);
  H.line(R, [doorway(2.31, 3.42), doorway(1.77, 3.59), doorway(1.33, 3.43)], 'blue', 2);
  floorShadow(H, .85, 2.55, 3.5, 7.45, .2);
  for (let n = 7; n >= 0; n--) {
    const j = 9.7 - n * .82, z = .23 + n * .28;
    timber(H, R, .7, j, 3.2, .85, 0, z, 'sun');
    H.line(R, [H.p(.74, j + .81, z + .013), H.p(3.84, j + .81, z + .013)], 'paper', 2);
    for (const a of [.95, 3.55]) H.dot(...H.p(a, j + .68, z + .014), 1.2, 'blue');
  }
  surface(H, R, [H.p(3.94, 10.48, .1), H.p(3.94, 3.68, 2.15), H.p(3.94, 3.68, 2.46), H.p(3.94, 10.48, .42)], 'teal', .56, 1.1);
  timber(H, R, .72, .9, 3.2, 2.75, 2.16, .23, 'sun');
  for (let n = 0; n <= 8; n++) {
    const j = 10.42 - n * .82, z = .28 + n * .28;
    timber(H, R, 3.72, j, .12, .12, z, .97, 'teal');
    H.line(R, [H.p(3.84, j + .06, z + .16), H.p(3.84, j + .06, z + .81)], 'paper', .7);
  }
  bentTube(H, R, [[3.79, 10.65, 1.25], [3.79, 10.42, 1.32], [3.79, 3.86, 3.56], [3.79, 1.2, 3.56]], 5, 'sun');
  metal(H, R, 3.64, 6.1, .29, .48, 2.73, .11, 'teal');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(.87 + n * .5, 10.55, .31), H.p(.87 + n * .5, 10.55, 1.18)], 'teal', 2.8);
  bentTube(H, R, [[.8, 10.55, .35], [.8, 10.55, 1.23], [3.66, 10.55, 1.23], [3.66, 10.55, .35]], 3, 'teal');
  for (const z of [.45, 1.05]) metal(H, R, .69, 10.47, .22, .16, z, .12, 'blue');
  cushion(H, R, 3.49, 10.42, .24, .28, .9, .12, 'coral');
  cabinetFrame(H, R, 8.06, .25, 3.5, 1.05, .08, 3.65, 3, 'teal', (i, j, w, d, z, h, n) => {
    if (n === 0) for (let row = 0; row < 6; row++) { const zz = z + row * .51; timber(H, R, i, j, w, d, zz, .055, 'sun'); for (let k = 0; k < 2; k++) surface(H, R, H.faceI(i + .09 + k * .15, j + .65, w - .23, zz + .06, zz + .3 + k * .06), k ? 'paper' : 'coral', k ? 1 : .4, .5); }
    if (n === 1) { for (const zz of [.34, .86, 1.45]) timber(H, R, i, j, w, d, zz, .07, 'sun'); for (const zz of [.45, .98]) for (const a of [.1, .52]) { const [x, y] = H.p(i + a, j + .55, zz); shape(H, R, [[x - 7, y], [x + 9, y], [x + 7, y - 8], [x - 4, y - 10]], 'blue', .65, .7); } const [x, y] = H.p(i + .5, j + .3, 3.1); coat(H, R, x, y, 'coral'); }
    if (n === 2) { surface(H, R, H.faceI(i + .09, j + .73, w - .15, .35, 2.45), 'teal', .37, .8); H.line(R, [H.p(i + .76, j + .75, 1.22), H.p(i + .76, j + .75, 1.53)], 'blue', 2); for (let k = 0; k < 5; k++) H.line(R, [H.p(i + .24, j + .76, .59 + k * .1), H.p(i + .66, j + .76, .59 + k * .1)], 'blue', .7); timber(H, R, i, j, w, d, 2.55, .08, 'sun'); oval(H, R, ...H.p(i + .5, j + .3, 2.83), 9, 11, 'sun', .72); }
  });
  benchFrame(H, R, 8.15, 1.6, 3.2, .9, .64, 'sun');
  cushion(H, R, 8.27, 1.7, 1.4, .64, .66, .12, 'coral');
  const [gx, gy] = H.p(10.45, 2.1, .71); shape(H, R, [[gx - 6, gy], [gx + 5, gy], [gx + 6, gy - 7], [gx + 9, gy - 9], [gx + 6, gy - 12], [gx + 3, gy - 7], [gx - 5, gy - 10]], 'teal', .68, .7);
  benchFrame(H, R, 8.4, 9.35, 2.75, 1.35, .92, 'teal');
  drape(H, R, 8.65, 9.64, .9, .7, .94, .23, 'paper');
  oval(H, R, ...H.p(9.15, 10.0, 1.01), 18, 8, 'coral', .45);
  vessel(H, R, 9.15, 10.0, 1.04, 14, 12, 'blue');
  H.line(R, [H.p(9.43, 10.0, 1.2), H.p(10.0, 10.0, 1.2)], 'blue', 3);
  vessel(H, R, 10.35, 9.72, .98, 7, 11, 'teal', false);
  oval(H, R, ...H.p(10.65, 10.28, .99), 8, 4, 'sun', .7);
  timber(H, R, 10.45, 5.1, .85, .82, .02, .14, 'blue');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(10.52, 5.16 + n * .12, .18), H.p(11.22, 5.16 + n * .12, .18)], 'sun', 1.6);
  surface(H, R, H.tile(6.3, 9.45, 1.25, 1.7, .025), 'teal', .32, .8);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(6.4, 9.56 + n * .21, .03), H.p(7.44, 9.56 + n * .21, .03)], 'sun', 1.2);
  floorShadow(H, 5.8, 4.6, 2.7, 2.8, .16);
  for (const [i, j, ink] of [[5.95, 4.93, 'blue'], [7.82, 4.93, 'blue'], [5.95, 6.62, 'blue'], [7.82, 6.62, 'teal']]) { const [x, y] = H.p(i, j, .17); oval(H, R, x, y, 9, 9, ink, .82); oval(H, R, x, y, 3, 3, 'sun', .82); metal(H, R, i - .08, j - .08, .16, .16, .25, .2, 'teal'); }
  for (const i of [6.04, 7.68]) { bentTube(H, R, [[i, 4.94, .37], [i, 6.36, 1.08], [i, 6.65, .35]], 3, 'teal'); bentTube(H, R, [[i, 6.62, .35], [i, 5.18, 1.37]], 3, 'teal'); }
  surface(H, R, [H.p(6.0, 5.25, 1.35), H.p(7.72, 5.25, 1.35), H.p(7.72, 6.26, .69), H.p(6.0, 6.26, .69)], 'coral', .58, .8);
  surface(H, R, H.tile(6.04, 5.75, 1.64, .72, .7), 'coral', .76, .65);
  for (const i of [6.42, 7.16]) H.line(R, [H.p(i, 5.4, 1.25), H.p(i, 6.24, .76)], 'paper', 1.3);
  surface(H, R, [H.p(5.91, 5.23, 1.42), H.p(6.05, 4.95, 1.83), H.p(7.56, 4.95, 1.83), H.p(7.84, 5.24, 1.42)], 'coral', .65, .9);
  H.line(R, [H.p(6.79, 4.97, 1.85), H.p(6.83, 5.23, 1.42)], 'paper', 1.2);
  surface(H, R, H.tile(6.1, 5.23, 1.5, 1.13, .33), 'blue', .4, .6);
}, (H, R, t) => {
  const u = cycle(t, 16) * 16, a = u < 3.2 ? 0 : u < 6.4 ? smooth((u - 3.2) / 3.2) : u < 9.6 ? 1 : 1 - smooth((u - 9.6) / 4.4), angle = .16 + .95 * a;
  const J = 6.07 + Math.cos(angle) * .9, Z = 1.02 + Math.sin(angle) * .9;
  for (const i of [6.0, 7.72]) bentTube(H, R, [[i, 6.07, 1.02], [i, J, Z]], 3.6, 'teal');
  bentTube(H, R, [[6.0, J, Z], [7.72, J, Z]], 4.5, 'blue');
  for (const i of [6.0, 7.72]) oval(H, R, ...H.p(i, 6.07, 1.02), 4.2, 3.2, 'coral', .85);
  const hand = H.p(7.63, J, Z);
  neighbour(H, R, 8.5, 7.5, 'londonStairParent', hand, 'teal', 20 * (1 - a));
  neighbour(H, R, 6.35, 7.17, 'londonStairNeighbour', H.p(6.03, 6.22, 1.03), 'coral');
  H.dot(...hand, 3, 'coral', .35, { knock: true });
  const [bx, by] = H.p(6.02, 7.23, .78 + .09 * a); shape(H, R, [[bx - 9, by], [bx + 10, by], [bx + 8, by + 21], [bx - 8, by + 21]], 'sun', .54, .8); stroke(H, R, [[bx - 5, by], [bx - 4, by - 10], [bx + 4, by - 10], [bx + 6, by]], 'blue', 1.0);
  const [x, y] = H.p(9.3, .74, 3.29); coat(H, R, x, y, 'coral', Math.sin(TAU * u / 16) * 1.8);
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
