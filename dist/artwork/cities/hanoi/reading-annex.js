import { world, shape, oval, stroke, box, cycle, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, bentTube, drape } from '../materials.js';
import { windowBay, wallRack, caster } from '../joinery.js';

const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
const base = { x: 0, y: 0, drop: .47, lean: -4, head: 8, al: 45, ar: 58, el: 55, er: 60, ll: 84, lr: 80, kl: -84, kr: -80, roll: 0 };
FIGURES.clips.hanoiAnnexChild = { dur: 16, keys: [[0, base], [.35, { ...base, lean: -12, head: 18 }], [.65, { ...base, lean: -12, head: 18, ar: 70 }], [1, base]] };
function book(H, R, opening) {
  const center = [5.55, 5.65, 1.61], angle = -.08 - opening * .48;
  const P = (a, b, h = 0) => H.p(center[0] + a, center[1] + b * Math.cos(angle), center[2] + b * Math.sin(angle) + h);
  for (const a of [-1.42, 1.42]) { shape(H, R, [P(a - .12, -.8, -.11), P(a + .12, -.8, -.11), P(a + .12, .94, -.11), P(a - .12, .94, -.11)], 'sun', .7); H.line(R, [P(a, -.3, -.14), H.p(center[0] + a, 5.78, .82)], 'blue', 2.6); oval(H, R, ...P(a, .15, -.09), 3, 2.4, 'coral', .8); }
  shape(H, R, [P(-1.37, -.76), P(1.37, -.76), P(1.37, 1.12), P(-1.37, 1.12)], 'teal', .49);
  for (const a of [-1, 1]) H.line(R, [P(a * 1.4, -.72), P(a * 1.4, 1.15)], 'paper', 1.2);
  const pageAngle = opening * Math.PI, spread = -1.24 * Math.cos(pageAngle), rise = .075 + 1.24 * Math.sin(pageAngle);
  const right = [P(.04, -.7, .06), P(1.28, -.7, .06), P(1.28, 1.03, .06), P(.04, 1.03, .06)]; shape(H, R, right, 'paper', 1);
  const left = [P(.01, -.7, .065), P(-spread, -.7, rise), P(-spread, 1.03, rise), P(.01, 1.03, .065)];
  H.line(R, [P(0, -.7, .07), P(0, 1.06, .07)], 'blue', 1.2);
  for (let n = 0; n < 3; n++) H.line(R, [P(.09, 1.03 + n * .03, .03 - n * .012), P(1.28, 1.03 + n * .03, .03 - n * .012)], 'blue', .5, { tone: .48 });
  shape(H, R, [P(.25, -.35, .09), P(.97, -.35, .09), P(.97, .25, .09), P(.25, .25, .09)], 'teal', .35);
  shape(H, R, [P(.33, .36, .09), P(.76, .83, .09), P(1.1, .36, .09)], 'sun', .75);
  shape(H, R, left, opening > .5 ? 'paper' : 'coral', opening > .5 ? 1 : .7);
  if (opening > .5) oval(H, R, ...P(-spread * .55, .25, .08 + (rise - .075) * .55), 9 * opening + 1, 6, 'coral', .6);
  shape(H, R, [P(.98, .79, .095), P(1.26, .79, .095), P(1.26, 1.04, .095)], 'teal', .24);
  for (const b of [-.52, .83]) H.line(R, [P(1.13, b, .13), P(1.47, b, .03)], 'coral', 1.7);
  H.line(R, [P(.07, .8, .11), P(.14, 1.36, .04)], 'coral', 2);
  timber(H, R, 4.03, 6.78, 3.04, .16, 1.17, .18, 'sun');
  return [P(-1.42, .5), P(-spread, .42, rise + .035)];
}
function librarian(H, R, hands, opening) {
  const [x0, y] = H.p(5.15, 7, 0), x = x0 + (1 - opening) * 14;
  for (const dx of [-7, 7]) { stroke(H, R, [[x + dx, y - 25], [x + dx + 2, y]], 'blue', 7); oval(H, R, x + dx + 3, y + 1, 6, 2.5, 'blue', .8); }
  shape(H, R, [[x - 11, y - 52], [x + 10, y - 52], [x + 13, y - 24], [x - 12, y - 24]], 'coral', .65);
  oval(H, R, x, y - 64, 9, 10, 'coral', .26); oval(H, R, x - 6, y - 74, 5, 5, 'blue', .8); shape(H, R, [[x - 9, y - 62], [x - 10, y - 70], [x, y - 77], [x + 10, y - 68], [x + 8, y - 66], [x, y - 71]], 'blue', .85); H.dot(x + 4, y - 63, 1, 'blue');
  hands.forEach((hand, n) => { const a = [x + (n ? 8 : -6), y - 47]; stroke(H, R, [a, [a[0] + (n ? 24 : -24), a[1] + 10], hand], 'blue', 6.5); stroke(H, R, [a, [a[0] + (n ? 24 : -24), a[1] + 10], hand], 'coral', 4.7); oval(H, R, ...hand, 3, 2.5, 'coral', .27); });
}
const room = world('hanoi-reading-annex', 'A little more daylight', { floor: 'sun', tone: .12, wall: 'paper', wallTone: .85, height: 3.55, head: 22, pattern: 'boards' }, (H, R) => {
  windowBay(H, R, 'nw', 1.2, 5, 1.42, 1.83, { ink: 'teal', divisions: 3 });
  for (const j of [.7, 6.1]) { timber(H, R, .25, j, .3, .22, .2, 3.15, 'teal'); H.line(R, [H.p(.58, j + .12, .5), H.p(.58, j + .12, 2.9)], 'paper', 1.4); }
  for (let n = 0; n < 4; n++) { const i = 3.65 + n * 1.8, height = 3.05 - n * .48; box(H, R, i, .2, 1.75, 1.65, .12, height, 'teal', .46); shape(H, R, H.faceI(i + .11, 1.87, 1.52, .3, height), 'blue', .6); for (const z of [.36, height * .53, height - .16]) { timber(H, R, i + .07, .28, 1.61, 1.67, z, .11, 'sun'); if (z === height - .16) continue; let x = i + .16; for (let k = 0; k < 7; k++) { const h = .38 + k % 3 * .13; box(H, R, x, 1.27, .13 + k % 2 * .055, .47, z + .11, h, ['coral', 'sun', 'paper', 'teal'][k % 4], .72); H.line(R, [H.p(x + .025, 1.76, z + .2), H.p(x + .1, 1.76, z + .2)], 'paper', .65); x += .2; } } }
  const boat = H.p(7.9, 1.3, 2.3); shape(H, R, [[boat[0] - 12, boat[1]], [boat[0], boat[1] - 10], [boat[0] + 13, boat[1]], [boat[0] + 7, boat[1] + 5], [boat[0] - 7, boat[1] + 5]], 'paper', 1); H.line(R, [[boat[0], boat[1] - 10], [boat[0], boat[1] + 3]], 'teal', .75);
  const rail = wallRack(H, R, 'ne', 1.2, 8.3, 3.12, .5, 1, 'sun');
  for (let n = 0; n < 4; n++) { const P = (u, z) => rail(.4 + n * 1.6 + u, z); shape(H, R, [P(0, .15), P(.6, .15), P(.6, -.5), P(0, -.5)], 'paper', 1, .6); shape(H, R, [P(.13, -.33), P(.46, -.33), P(.29, -.02)], n % 2 ? 'coral' : 'teal', .65, .5); }
  const puppet = wallPt(H, 'ne', 8.45, 2.94, -.48);
  shape(H, R, [[puppet[0] - 9, puppet[1] + 3], [puppet[0] - 12, puppet[1] - 7], [puppet[0] - 4, puppet[1] - 3], [puppet[0] + 2, puppet[1] - 10], [puppet[0] + 7, puppet[1] - 1], [puppet[0] + 14, puppet[1] + 1], [puppet[0] + 6, puppet[1] + 5]], 'blue', .74, .6);
  H.line(R, [[puppet[0], puppet[1] + 3], [puppet[0], puppet[1] + 19]], 'sun', 1.1); H.dot(puppet[0] + 3, puppet[1] - 4, 1.3, 'paper');
  benchFrame(H, R, 4.9, 4.4, 3.15, 2.85, 1.03, 'sun'); benchFrame(H, R, 3.35, 4.4, 1.5, 1.13, 1.03, 'sun'); timber(H, R, 3.55, 4.62, 1.25, .79, .72, .16, 'teal'); metal(H, R, 3.85, 5.43, .57, .05, .78, .06, 'blue');
  for (const i of [4.4, 6.6]) bentTube(H, R, [[i, 5.15, 1.05], [i, 5.72, 1.35], [i, 6.32, 1.05]], 2, 'blue');
  box(H, R, 7.29, 4.64, .56, 1.14, 1.04, .16, 'teal', .4); for (let n = 0; n < 4; n++) shape(H, R, H.tile(7.35 + n * .018, 4.7 + n * .14, .42, .41, 1.22 + n * .018), ['paper', 'sun', 'coral'][n % 3], .8, .5);
  benchFrame(H, R, 6.94, 7.16, 1.3, 1.18, .53, 'teal'); cushion(H, R, 6.91, 7.13, 1.35, 1.22, .53, .15, 'paper'); H.dot(...H.p(7.64, 7.75, .7), 2.3, 'coral');
  shape(H, R, H.tile(1.2, 8.5, 3.6, 2.3, .025), 'teal', .21); cushion(H, R, 1.4, 8.74, 1.27, 1.4, .03, .18, 'sun'); H.line(R, [H.p(1.6, 8.9, .23), H.p(1.9, 9.3, .23), H.p(1.85, 9.65, .23), H.p(2.4, 10, .23)], 'blue', .85);
  box(H, R, 3.08, 8.78, 1.21, .9, .03, .07, 'sun', .7); for (const [i, j, c] of [[3.2, 8.91, 'coral'], [3.68, 8.91, 'teal'], [3.19, 9.36, 'paper']]) shape(H, R, H.tile(i, j, .35, .29, .12), c, .8); box(H, R, 4.35, 9.35, .38, .32, .04, .2, 'teal', .6);
  shape(H, R, [H.p(2.91, 10, .02), H.p(3.75, 10, .02), H.p(3.69, 10.71, .12), H.p(2.98, 10.71, .12)], 'paper', 1); H.line(R, [H.p(3.01, 10.58, .13), H.p(3.61, 10.58, .13)], 'sun', 2);
  for (const [i, j] of [[9.35, 4.0], [10.8, 4], [9.35, 5.3], [10.8, 5.3]]) caster(H, R, i, j);
  for (const z of [.28, .93, 1.68]) { timber(H, R, 9.23, 3.88, 1.77, 1.6, z, .1, 'teal'); if (z < 1.5) for (let n = 0; n < 3; n++) box(H, R, 9.4, 4.08 + n * .38, 1.08, .3, z + .1, .09 + n * .035, ['coral', 'paper', 'sun'][n], .7); }
  for (const i of [9.26, 10.87]) bentTube(H, R, [[i, 4, .2], [i, 4, 1.96], [i, 5.37, 1.96], [i, 5.37, .2]], 2, 'blue');
  timber(H, R, .3, 6.65, 1.28, 1.37, .05, .5, 'sun'); drape(H, R, .48, 6.75, .76, .87, .57, .19, 'paper'); box(H, R, .33, 7.85, 1.06, .32, .56, .08, 'coral', .5);
  for (let k = 0; k < 5; k++) H.line(R, [wallPt(H, 'nw', 10.45 + k * .18, 2.4, -.16), wallPt(H, 'nw', 10.45 + k * .18, 2.85, -.16)], 'blue', 2);
}, (H, R, t) => {
  const u = cycle(t, 16) * 16, opening = ease(3.2, 6.4, u) * (1 - ease(9.6, 14, u));
  const hands = book(H, R, opening); librarian(H, R, hands, opening);
  timber(H, R, 4.9, 7.1, 3.15, .15, .72, .23, 'sun');
  actor(H, R, 7.46, 7.54, u, 'hanoiAnnexChild', { face: 'sw', shirt: ['teal', .75], pants: ['blue', .8], hairStyle: 'short' }, .25, 1.65, 'child');
  const x = wallPt(H, 'nw', 7.2, 3.42, -.3), sway = Math.sin(u * Math.PI / 8) * 8; stroke(H, R, [x, [x[0] + sway, x[1] + 28]], 'blue', .8); for (let n = 0; n < 3; n++) { const cx = x[0] + sway + (n - 1) * 17, cy = x[1] + 30 + n % 2 * 12; H.line(R, [[x[0] + sway, x[1] + 23], [cx, cy]], 'blue', .75); shape(H, R, [[cx - 8, cy], [cx + 8, cy], [cx, cy + 11]], n === 1 ? 'coral' : 'sun', .65); }
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
