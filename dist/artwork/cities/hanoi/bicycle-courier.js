import { world, shape, oval, stroke, box, cycle } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame } from '../materials.js';
import { windowBay, recessedFrame, hangingRail, floorShadow } from '../joinery.js';

const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
function wheel(H, R, i, j, radius) {
  const P = (a, r = radius) => H.p(i + Math.cos(a) * r, j, radius + .06 + Math.sin(a) * r);
  H.line(R, Array.from({ length: 49 }, (_, n) => P(n * Math.PI / 24)), 'blue', 5);
  H.line(R, Array.from({ length: 49 }, (_, n) => P(n * Math.PI / 24, radius - .075)), 'paper', 1.2);
  const c = H.p(i, j, radius + .06);
  for (let n = 0; n < 16; n++) H.line(R, [c, P(n * Math.PI / 8, radius - .1)], 'blue', .7);
  oval(H, R, ...c, 3.3, 3, 'sun', .85);
}
function person(H, R, i, j, ink, hands, face = 1) {
  const [x, y] = H.p(i, j, 0);
  for (const dx of [-7, 7]) { stroke(H, R, [[x + dx, y - 38], [x + dx - face * 2, y - 1]], 'blue', 6.8); oval(H, R, x + dx + face * 3, y + 1, 6, 2.4, 'blue', .8); }
  shape(H, R, [[x - 11, y - 74], [x + 10, y - 74], [x + 12, y - 35], [x - 12, y - 35]], ink, .76);
  H.line(R, [[x, y - 76], [x, y - 84]], 'coral', 7); oval(H, R, x, y - 91, 9, 10, 'coral', .3); shape(H, R, [[x - 9, y - 92], [x - 8, y - 101], [x + 4, y - 107], [x + 10, y - 97], [x + 7, y - 91]], 'blue', .9); H.dot(x + face * 4, y - 90, 1, 'blue');
  hands.forEach((p, n) => { const a = [x + (n ? 8 : -7), y - 68], b = [(a[0] + p[0]) / 2, Math.max(a[1], p[1]) + 8]; stroke(H, R, [a, b, p], 'blue', 6); stroke(H, R, [a, b, p], ink, 4.5); oval(H, R, ...p, 2.8, 2.4, 'coral', .3); });
}
function bag(H, R, opening, check) {
  const i = 3.8, j = 5.35, z = 1.78, P = (a, b, h = 0) => H.p(i + a, j + b, z + h);
  box(H, R, i, j, 1.6, 1.08, 1.18, .6, 'coral', .7);
  shape(H, R, H.tile(i + .12, j + .1, 1.36, .87, z + .01), 'blue', .77);
  box(H, R, i + .24, j + .24, 1.1, .55, z - .15, .18, 'sun', .45); H.line(R, [P(.79, .24, .04), P(.79, .8, .04)], 'paper', 2.4);
  for (const a of [.14, 1.44]) H.line(R, [P(a, 1.1, -.52), P(a, 1.1, -.09), P(a, .99, .01)], 'paper', 1.15);
  const angle = opening * 1.94, J = 1.15 * Math.cos(angle), Z = 1.15 * Math.sin(angle), flap = [P(-.04, -.05, .07), P(1.65, -.05, .07), P(1.65, J, Z + .07), P(-.04, J, Z + .07)];
  shape(H, R, flap, 'coral', .67, 1); H.line(R, [P(.04, .06, .09), P(.04, J - .1, Z + .07), P(1.55, J - .1, Z + .07)], 'paper', 1.25);
  const clasp = P(.81, J, Z + .09); shape(H, R, [[clasp[0] - 5, clasp[1] - 2], [clasp[0] + 5, clasp[1] - 2], [clasp[0] + 5, clasp[1] + 7], [clasp[0] - 5, clasp[1] + 7]], 'teal', .8); H.line(R, [[clasp[0], clasp[1]], [clasp[0] + check * 2, clasp[1] + 7]], 'sun', 2);
  H.dot(...P(1.47, 1.1, -.2), 1.6, 'paper', 1);
  return [P(.12, .12, .12), clasp, P(.3, 1.1, -.49), P(1.28, 1.1, -.49)];
}
const room = world('hanoi-bicycle-courier', 'A parcel stays dry', { floor: 'sun', tone: .13, wall: 'paper', wallTone: .88, height: 3.85, head: 28, pattern: 'boards' }, (H, R) => {
  windowBay(H, R, 'nw', 1.0, 3.6, 1.48, 2.1, { divisions: 2, ink: 'coral' });
  const shutter = [H.p(.45, 4.72, 1.42), H.p(1.33, 5.76, 1.42), H.p(1.33, 5.76, 3.64), H.p(.45, 4.72, 3.64)]; shape(H, R, shutter, 'teal', .55); for (let z = 1.6; z < 3.5; z += .22) H.line(R, [H.p(.5, 4.78, z), H.p(1.24, 5.65, z)], 'paper', .9);
  const M = recessedFrame(H, R, 'nw', 6.7, 3.85, 2.05, 1.46, 'sun'); shape(H, R, [M(.15, .15), M(3.7, .15), M(3.7, 1.31), M(.15, 1.31)], 'paper', 1); for (let n = 0; n < 4; n++) H.line(R, [M(.3 + n * .79, .17), M(.7 + n * .72, .65), M(.45 + n * .8, 1.21)], 'teal', 1); H.line(R, [M(.18, .57), M(3.65, .87)], 'coral', 1.8); for (const [u, v] of [[.72, .67], [1.85, .39], [2.9, 1.01]]) H.dot(...M(u, v), 2.3, 'coral');
  for (const i of [6.35, 7.88, 9.41, 10.94]) timber(H, R, i, .24, .14, 1.74, .17, 3.4, 'teal');
  shape(H, R, H.faceI(6.41, .3, 4.66, .22, 3.56), 'blue', .7);
  for (const z of [.18, 1.08, 1.94, 2.81, 3.52]) timber(H, R, 6.27, .18, 4.98, 1.85, z, .1, 'teal');
  for (let n = 0; n < 3; n++) for (let row = 0; row < 3; row++) { const i = 6.58 + n * 1.53, z = .3 + row * .87; box(H, R, i, .79, .72 + row % 2 * .35, .86, z, .4 + n % 2 * .14, ['sun', 'paper', 'coral'][(n + row) % 3], .65); H.line(R, [H.p(i + .35, .79, z + .42 + n % 2 * .14), H.p(i + .35, 1.66, z + .42 + n % 2 * .14), H.p(i + .35, 1.66, z + .07)], 'paper', 1.7); }
  box(H, R, 6.46, .38, 1.2, 1.33, .22, .54, 'teal', .6); cushion(H, R, 6.6, 1.2, .46, .45, .77, .15, 'coral'); cushion(H, R, 7.06, 1.2, .46, .45, .77, .15, 'sun');
  for (let n = 0; n < 4; n++) metal(H, R, 8.21 + n * .12, 1.68, .06, .12, .24, .43, 'blue');
  const childHelmet = H.p(10.67, 1.29, .42); oval(H, R, childHelmet[0], childHelmet[1] - 5, 12, 9, 'coral', .66); for (let n = -1; n <= 1; n++) H.line(R, [[childHelmet[0] + n * 5, childHelmet[1] - 12], [childHelmet[0] + n * 5 + 1, childHelmet[1] - 2]], 'paper', 1.1);
  box(H, R, 10.47, 1.16, .34, .33, 1.18, .28, 'paper', 1); H.line(R, [H.p(10.64, 1.16, 1.47), H.p(10.64, 1.5, 1.47)], 'coral', 1);
  hangingRail(H, R, 'ne', 1.2, 3.6, 2.86, 2, (P, u, n) => { const q = [P(u - .5, -.25), P(u + .5, -.25), P(u + .59, -1.65), P(u - .53, -1.72)]; shape(H, R, q, n ? 'teal' : 'coral', .4); H.line(R, [P(u, -.2), P(u - .1, -1.55)], 'paper', 1.2); });
  bentTube(H, R, [[.37, 10.45, .12], [.37, 10.45, 1.75], [.37, 10.27, 1.75]], 3, 'teal'); H.line(R, [H.p(.3, 10.45, 1.78), H.p(.3, 11.1, 1.78)], 'blue', 4); stroke(H, R, [H.p(.48, 10.5, .24), H.p(.88, 10.52, .12), H.p(.92, 11.2, .13)], 'blue', 1);
  floorShadow(H, 2.1, 5.73, 7, .5, .22);
  wheel(H, R, 3.06, 5.98, .98); wheel(H, R, 8.28, 5.98, .98);
  const tubes = [[[3.06, 5.98, 1.04], [5.34, 5.98, .86], [4.92, 5.98, 2.09], [3.06, 5.98, 1.04]], [[4.92, 5.98, 2.09], [7.51, 5.98, 2.23], [5.34, 5.98, .86]], [[7.51, 5.98, 2.23], [8.28, 5.98, 1.04]], [[4.92, 5.98, 2.09], [4.76, 5.98, 2.42]], [[7.6, 5.98, 2.15], [7.38, 5.98, 2.83], [7.78, 5.98, 2.83]]]; tubes.forEach(q => bentTube(H, R, q, 3.3, 'teal'));
  oval(H, R, ...H.p(4.71, 5.98, 2.46), 15, 4.5, 'blue', .8); oval(H, R, ...H.p(5.34, 5.98, .86), 12, 10, 'paper', 1); H.line(R, [H.p(3.07, 5.99, 1.03), H.p(5.33, 5.99, .62), H.p(5.68, 5.99, .94), H.p(3.07, 5.99, 1.27)], 'blue', 1.8); bentTube(H, R, [[5.34, 5.98, .86], [5.66, 6.25, .68], [6.03, 6.25, .68]], 2, 'blue');
  for (const j of [5.36, 6.39]) bentTube(H, R, [[3.08, 5.98, 1.04], [3.71, j, 1.15], [5.53, j, 1.15], [3.08, 5.98, 1.04]], 2.1, 'blue'); metal(H, R, 3.66, 5.27, 1.94, 1.21, 1.14, .055, 'blue');
  for (const i of [7.93, 8.55]) shape(H, R, [H.p(i, 5.55, .03), H.p(i + .17, 5.55, .03), H.p(i + .17, 6.35, .27), H.p(i, 6.35, .27)], 'sun', .7);
  H.line(R, [H.p(8.29, 8.1, .02), H.p(8.29, 6.12, .02)], 'blue', 1.8, { tone: .16 });
  benchFrame(H, R, 1.14, 8.8, 2.46, 1.66, .77, 'sun'); cushion(H, R, 1.3, 8.96, .81, .99, .77, .12, 'paper'); shape(H, R, H.tile(2.47, 9.02, .81, .9, .8), 'teal', .53); H.line(R, [H.p(2.6, 9.22, .82), H.p(3.13, 9.8, .82)], 'paper', 2);
  H.line(R, [H.p(2.42, 9.27, .83), H.p(3.18, 9.69, .83)], 'coral', 3);
  const old = H.p(2.84, 9.5, .87); shape(H, R, [[old[0] - 4, old[1] - 4], [old[0] + 4, old[1] - 4], [old[0] + 4, old[1] + 3], [old[0] - 4, old[1] + 3]], 'sun', .8, .65); H.line(R, [[old[0], old[1] - 3], [old[0], old[1] + 2]], 'blue', .8);
  const helmet = H.p(10.1, 8.91, .34); oval(H, R, ...helmet, 17, 13, 'sun', .75); for (let n = -1; n < 2; n++) H.line(R, [[helmet[0] + n * 7, helmet[1] - 9], [helmet[0] + n * 7 + 2, helmet[1] + 5]], 'blue', 2); stroke(H, R, [[helmet[0] - 10, helmet[1] + 6], [helmet[0] + 2, helmet[1] + 24], [helmet[0] + 12, helmet[1] + 7]], 'blue', 1.2);
  shape(H, R, H.tile(8.95, 9.7, 2.3, 1.24, .02), 'teal', .25); for (let n = 0; n < 4; n++) H.line(R, [H.p(9.12 + n * .48, 9.82, .03), H.p(9.12 + n * .48, 10.75, .03)], 'paper', 1); box(H, R, 9.25, 10.09, .61, .57, .05, .18, 'coral', .55); shape(H, R, H.tile(10.11, 10.22, .61, .46, .06), 'paper', 1);
}, (H, R, t) => {
  const u = cycle(t, 20) * 20, opening = ease(4, 8, u) * (1 - ease(12, 18, u)), check = ease(8, 9, u) * (1 - ease(10, 11.5, u)), hands = bag(H, R, opening, check);
  person(H, R, 3.72, 5.72, 'teal', hands.slice(0, 2)); person(H, R, 5.8, 6.93, 'coral', hands.slice(2), -1);
  const p = H.p(7.15, 6.12, 2.59), s = Math.sin(u * Math.PI / 10) * 3; H.line(R, [p, [p[0] + s, p[1] + 14]], 'blue', .8); oval(H, R, p[0] + s, p[1] + 18, 4, 4.5, 'sun', .85); H.line(R, [[p[0] + s - 2, p[1] + 15], [p[0] + s + 2, p[1] + 20]], 'paper', 1.2);
});
room.loopSeconds = 20;
room.stillTime = 10;
export default room;
