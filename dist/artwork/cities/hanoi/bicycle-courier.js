import { world, shape, oval, stroke, box, cycle, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame, drape } from '../materials.js';
import { windowBay, recessedFrame, hangingRail, floorShadow, taskLight } from '../joinery.js';

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
  for (const a of [.05, 1.52]) {
    H.line(R, [P(a, .06, -.49), P(a, .52, -.25), P(a, 1.04, -.49)], 'blue', 1.1);
    H.line(R, [P(a, .12, -.06), P(a, .52, -.25), P(a, 1.02, -.06)], 'sun', .8);
  }
  shape(H, R, [P(1.615, .24, -.48), P(1.615, .85, -.48), P(1.615, .85, -.24), P(1.615, .24, -.24)], 'teal', .65);
  H.line(R, [P(1.625, .29, -.28), P(1.625, .79, -.28)], 'paper', 1.3);
  for (const a of [.32, 1.16]) bentTube(H, R, [[i+a, j+.04, 1.35], [i+a, j-.06, 1.21], [i+a+.13, j-.06, 1.21]], 1.3, 'blue');
  const angle = opening * 1.94, J = 1.15 * Math.cos(angle), Z = 1.15 * Math.sin(angle), flap = [P(-.04, -.05, .07), P(1.65, -.05, .07), P(1.65, J, Z + .07), P(-.04, J, Z + .07)];
  shape(H, R, flap, 'coral', .67, 1); H.line(R, [P(.04, .06, .09), P(.04, J - .1, Z + .07), P(1.55, J - .1, Z + .07)], 'paper', 1.25);
  const clasp = P(.81, J, Z + .09); shape(H, R, [[clasp[0] - 5, clasp[1] - 2], [clasp[0] + 5, clasp[1] - 2], [clasp[0] + 5, clasp[1] + 7], [clasp[0] - 5, clasp[1] + 7]], 'teal', .8); H.line(R, [[clasp[0], clasp[1]], [clasp[0] + check * 2, clasp[1] + 7]], 'sun', 2);
  H.dot(...P(1.47, 1.1, -.2), 1.6, 'paper', 1);
  return [P(.12, .12, .12), clasp, P(.3, 1.1, -.49), P(1.28, 1.1, -.49)];
}
const room = world('hanoi-bicycle-courier', 'A parcel stays dry', { floor: 'sun', tone: .13, wall: 'paper', wallTone: .88, height: 3.85, head: 28, pattern: 'boards' }, (H, R) => {
  for (const side of ['nw', 'ne']) {
    const P = (a, z) => wallPt(H, side, a, z, -.14);
    shape(H, R, [P(.1, .12), P(11.87, .12), P(11.87, .73), P(.1, .73)], 'teal', .22, .6);
    H.line(R, [P(.1, .76), P(11.86, .76)], 'sun', 2.8);
    H.line(R, [P(.1, 3.73), P(11.86, 3.73)], 'teal', 5);
    H.line(R, [P(.1, 3.79), P(11.86, 3.79)], 'paper', 1.5);
  }
  for (const j of [.12, 11.6]) timber(H, R, .1, j, .29, .2, .12, 3.65, 'teal');
  windowBay(H, R, 'nw', 1.0, 3.6, 1.48, 2.1, { divisions: 2, ink: 'coral' });
  const shutter = [H.p(.45, 4.72, 1.42), H.p(1.33, 5.76, 1.42), H.p(1.33, 5.76, 3.64), H.p(.45, 4.72, 3.64)]; shape(H, R, shutter, 'teal', .55); for (let z = 1.6; z < 3.5; z += .22) H.line(R, [H.p(.5, 4.78, z), H.p(1.24, 5.65, z)], 'paper', .9);
  timber(H, R, .21, .94, .72, 3.78, 1.33, .16, 'sun');
  for (const j of [1.07, 4.24]) bentTube(H, R, [[.2, j, 1.07], [.73, j, 1.34]], 1.8, 'blue');
  const timer = H.p(.62, 3.62, 1.73); oval(H, R, ...timer, 9, 10, 'teal', .65); oval(H, R, ...timer, 6.5, 7.5, 'paper', 1); H.line(R, [[timer[0], timer[1] - 5], timer, [timer[0] + 4, timer[1] + 2]], 'coral', 1.1);
  box(H, R, .46, 1.21, .33, .83, 1.5, .11, 'paper', 1);
  H.line(R, [H.p(.76, 1.31, 1.63), H.p(.76, 1.72, 1.63)], 'teal', 1.4);
  const M = recessedFrame(H, R, 'nw', 6.7, 3.85, 2.05, 1.46, 'sun'); shape(H, R, [M(.15, .15), M(3.7, .15), M(3.7, 1.31), M(.15, 1.31)], 'paper', 1); for (let n = 0; n < 4; n++) H.line(R, [M(.3 + n * .79, .17), M(.7 + n * .72, .65), M(.45 + n * .8, 1.21)], 'teal', 1); H.line(R, [M(.18, .57), M(3.65, .87)], 'coral', 1.8); for (const [u, v] of [[.72, .67], [1.85, .39], [2.9, 1.01]]) H.dot(...M(u, v), 2.3, 'coral');
  const vent = recessedFrame(H, R, 'ne', .64, 2.61, 3.23, .36, 'teal');
  for (let u = .2; u < 2.46; u += .19) H.line(R, [vent(u, .07), vent(u, .3)], 'sun', 1.5);
  const charging = recessedFrame(H, R, 'ne', 4.53, 1.34, 1.32, 1.62, 'teal');
  shape(H, R, [charging(.24, .37), charging(.98, .37), charging(.98, 1.25), charging(.24, 1.25)], 'blue', .8);
  shape(H, R, [charging(.32, .53), charging(.9, .53), charging(.9, 1.16), charging(.32, 1.16)], 'paper', .7);
  H.line(R, [charging(.63, .36), charging(.76, .16), charging(1.16, .16), charging(1.16, .53)], 'sun', 1.3);
  oval(H, R, ...charging(1.15, .57), 3, 3, 'coral', .6);
  H.line(R, [wallPt(H, 'ne', 5.71, 1.35, -.18), wallPt(H, 'ne', 5.71, .85, -.18), wallPt(H, 'ne', 6.42, .85, -.18)], 'blue', 2.4);
  timber(H, R, 6.3, .19, 4.95, 1.83, .08, .12, 'sun');
  for (const i of [6.35, 7.88, 9.41, 10.94]) timber(H, R, i, .24, .14, 1.74, .17, 3.4, 'teal');
  shape(H, R, H.faceI(6.41, .3, 4.66, .22, 3.56), 'blue', .7);
  for (const z of [.18, 1.08, 1.94, 2.81, 3.52]) timber(H, R, 6.27, .18, 4.98, 1.85, z, .1, 'teal');
  for (let n = 0; n < 3; n++) for (let row = 0; row < 3; row++) { const i = 6.58 + n * 1.53, z = .3 + row * .87; box(H, R, i, .79, .72 + row % 2 * .35, .86, z, .4 + n % 2 * .14, ['sun', 'paper', 'coral'][(n + row) % 3], .65); H.line(R, [H.p(i + .35, .79, z + .42 + n % 2 * .14), H.p(i + .35, 1.66, z + .42 + n % 2 * .14), H.p(i + .35, 1.66, z + .07)], 'paper', 1.7); }
  box(H, R, 6.46, .38, 1.2, 1.33, .22, .54, 'teal', .6); cushion(H, R, 6.6, 1.2, .46, .45, .77, .15, 'coral'); cushion(H, R, 7.06, 1.2, .46, .45, .77, .15, 'sun');
  for (let n = 0; n < 4; n++) metal(H, R, 8.21 + n * .12, 1.68, .06, .12, .24, .43, 'blue');
  const childHelmet = H.p(10.67, 1.29, .42); oval(H, R, childHelmet[0], childHelmet[1] - 5, 12, 9, 'coral', .66); for (let n = -1; n <= 1; n++) H.line(R, [[childHelmet[0] + n * 5, childHelmet[1] - 12], [childHelmet[0] + n * 5 + 1, childHelmet[1] - 2]], 'paper', 1.1);
  box(H, R, 10.47, 1.16, .34, .33, 1.18, .28, 'paper', 1); H.line(R, [H.p(10.64, 1.16, 1.47), H.p(10.64, 1.5, 1.47)], 'coral', 1);
  for(const [i,z,count] of [[6.55,2.94,3],[9.64,2.94,4]])for(let n=0;n<count;n++){
    box(H,R,i+n*.08,.65+n*.06,1.02,.94,z+n*.075,.06,n%2?'paper':'sun',.75);
    H.line(R,[H.p(i+.19+n*.08,1.61+n*.06,z+n*.075),H.p(i+.72+n*.08,1.61+n*.06,z+n*.075)],'coral',1.1);
  }
  for(const [i,z] of [[8.27,2.99],[10.44,2.14]]){
    const q=H.p(i,1.25,z);oval(H,R,...q,10,7,'sun',.8);oval(H,R,...q,5,3.6,'paper',1);
    H.line(R,[[q[0]+7,q[1]+2],[q[0]+15,q[1]+7]],'sun',3);
  }
  box(H,R,8.14,.89,1.13,.88,2.06,.34,'teal',.7);
  for(let n=0;n<4;n++)H.line(R,[H.p(8.3+n*.21,1.13,2.44),H.p(8.3+n*.21,1.13,2.72+n%2*.12)],n%2?'sun':'paper',3);
  const coil=H.p(7.18,1.48,1.43);for(let r=6;r<15;r+=3)oval(H,R,...coil,r,r*.62,'blue',.55);
  oval(H,R,...coil,4,2.5,'paper',1);
  box(H,R,9.65,1.22,1.06,.49,1.19,.21,'coral',.6);
  for(let n=0;n<3;n++)shape(H,R,H.tile(9.78+n*.24,1.31,.16,.23,1.43),'paper',.9);
  for (const i of [6.4, 7.94, 9.48, 11.04]) timber(H, R, i, 1.91, .11, .14, .2, 3.43, 'teal');
  for (const [i, z] of [[6.52, 2.04], [9.6, 1.15]]) {
    shape(H, R, [H.p(i, 1.64, z), H.p(i + 1.24, 1.64, z), H.p(i + 1.24, 2.27, z - .13), H.p(i, 2.27, z - .13)], 'sun', .7);
    H.line(R, [H.p(i, 2.29, z - .1), H.p(i + 1.24, 2.29, z - .1)], 'teal', 3.1);
    for (const a of [.2, .89]) shape(H, R, H.tile(i + a, 1.79, .23, .25, z + .045), 'paper', 1, .5);
  }
  shape(H, R, [H.p(11.17, 1.89, .25), H.p(11.74, 2.59, .25), H.p(11.74, 2.59, 3.35), H.p(11.17, 1.89, 3.35)], 'paper', .65);
  for (const z of [.62, 1.7, 2.81]) H.line(R, [H.p(11.21, 1.94, z), H.p(11.7, 2.53, z)], 'teal', 1.4);
  for (const z of [.39, 3.18]) H.line(R, [H.p(11.16, 1.84, z), H.p(11.3, 2.08, z)], 'sun', 3);
  hangingRail(H, R, 'ne', 1.2, 3.6, 2.86, 2, (P, u, n) => { const q = [P(u - .5, -.25), P(u + .5, -.25), P(u + .59, -1.65), P(u - .53, -1.72)]; shape(H, R, q, n ? 'teal' : 'coral', .4); H.line(R, [P(u, -.2), P(u - .1, -1.55)], 'paper', 1.2); });
  bentTube(H, R, [[.37, 10.45, .12], [.37, 10.45, 1.75], [.37, 10.27, 1.75]], 3, 'teal'); H.line(R, [H.p(.3, 10.45, 1.78), H.p(.3, 11.1, 1.78)], 'blue', 4); stroke(H, R, [H.p(.48, 10.5, .24), H.p(.88, 10.52, .12), H.p(.92, 11.2, .13)], 'blue', 1);
  timber(H, R, .4, 6.48, 1.03, 4.08, .21, .14, 'teal');
  for (const j of [6.55, 8.49, 10.31]) timber(H, R, .4, j, .99, .14, .33, .85, 'teal');
  for (let n = 0; n < 5; n++) box(H, R, .61, 6.81 + n * .29, .56, .23, .36, .46 + n % 2 * .16, n % 2 ? 'paper' : 'sun', .65);
  box(H, R, .52, 8.85, .68, 1.18, .36, .41, 'teal', .65);
  H.line(R, [H.p(1.24, 9.2, .55), H.p(1.24, 9.73, .55)], 'sun', 2);
  timber(H, R, .31, 6.4, 1.22, 4.2, 1.16, .14, 'sun');
  shape(H, R, H.tile(.52, 7.34, .81, 1.31, 1.32), 'paper', 1);
  H.line(R, [H.p(.91, 7.42, 1.34), H.p(.91, 8.54, 1.34)], 'coral', 1.8);
  const tape = H.p(.92, 9.41, 1.36); oval(H, R, ...tape, 11, 7, 'sun', .7); oval(H, R, ...tape, 6, 3.7, 'paper', 1); H.line(R, [[tape[0] + 8, tape[1] + 3], [tape[0] + 17, tape[1] + 8]], 'sun', 3.4);
  for (const j of [6.57, 6.87]) { H.line(R, [H.p(.65, j, 1.33), H.p(1.24, j + .31, 1.33)], 'blue', 2); oval(H, R, ...H.p(.6, j - .04, 1.35), 4, 2.7, 'coral', .6); }
  box(H,R,.5,8.76,.56,.39,1.32,.28,'teal',.7);
  for(let n=0;n<3;n++)H.line(R,[H.p(.66+n*.1,8.97,1.58),H.p(.63+n*.1,8.97,1.91)],n?'sun':'coral',1.7);
  for(let n=0;n<3;n++)shape(H,R,H.tile(.54+n*.08,7.56+n*.12,.53,.63,1.35+n*.012),'sun',.65);
  for(let n=0;n<3;n++)H.line(R,[H.p(.68,7.79+n*.1,1.4),H.p(.97,7.79+n*.1,1.4)],'blue',.7);
  bentTube(H,R,[[1.03,10.46,1.35],[1.15,10.46,1.49],[1.35,10.46,1.49]],2,'blue');
  drape(H, R, .63, 9.98, .8, .4, 1.32, .43, 'paper');
  H.line(R, [M(.18, -.14, .48), M(3.65, -.14, .48)], 'teal', 3);
  for (let n = 0; n < 5; n++) { const u = .42 + n * .54; H.line(R, [M(u, -.17, .5), M(u, -.43, .5)], 'blue', 1); oval(H, R, ...M(u, -.46, .51), 3.5, 4, n % 2 ? 'sun' : 'coral', .6); }
  floorShadow(H, 2.1, 5.73, 7, .5, .22);
  wheel(H, R, 3.06, 5.98, .98); wheel(H, R, 8.28, 5.98, .98);
  for (const i of [3.06, 8.28]) {
    const points = Array.from({length: 24}, (_, n) => { const a = .06 + n / 23 * (Math.PI - .12); return H.p(i + Math.cos(a) * 1.075, 5.98, 1.04 + Math.sin(a) * 1.075); });
    H.line(R, points, 'teal', 5); H.line(R, points, 'paper', 1.1);
    for (const d of [-.76, .76]) H.line(R, [H.p(i, 5.98, 1.04), H.p(i + d, 5.98, 1.76)], 'blue', .9);
  }
  const tubes = [[[3.06, 5.98, 1.04], [5.34, 5.98, .86], [4.92, 5.98, 2.09], [3.06, 5.98, 1.04]], [[4.92, 5.98, 2.09], [7.51, 5.98, 2.23], [5.34, 5.98, .86]], [[7.51, 5.98, 2.23], [8.28, 5.98, 1.04]], [[4.92, 5.98, 2.09], [4.76, 5.98, 2.42]], [[7.6, 5.98, 2.15], [7.38, 5.98, 2.83], [7.78, 5.98, 2.83]]]; tubes.forEach(q => bentTube(H, R, q, 3.3, 'teal'));
  stroke(H, R, [H.p(7.69, 6.02, 2.81), H.p(8.03, 6.04, 2.39), H.p(7.61, 6.06, 1.79), H.p(7.91, 6.03, 1.8)], 'blue', .85);
  stroke(H, R, [H.p(7.49, 6.05, 2.69), H.p(6.18, 6.06, 2.05), H.p(5.33, 6.07, 1.03)], 'blue', .75);
  bentTube(H, R, [[7.51, 5.98, 2.79], [7.51, 6.36, 2.82], [7.22, 6.42, 2.71]], 2.5, 'blue');
  oval(H, R, ...H.p(7.62, 6.05, 2.91), 5.5, 3.3, 'sun', .85);
  H.line(R, [H.p(7.72, 6.05, 2.93), H.p(7.87, 6.05, 2.98)], 'blue', 1.1);
  bentTube(H, R, [[5.27, 6.02, .8], [5.81, 6.75, .07]], 2.4, 'blue');
  oval(H, R, ...H.p(4.71, 5.98, 2.46), 15, 4.5, 'blue', .8); oval(H, R, ...H.p(5.34, 5.98, .86), 12, 10, 'paper', 1); H.line(R, [H.p(3.07, 5.99, 1.03), H.p(5.33, 5.99, .62), H.p(5.68, 5.99, .94), H.p(3.07, 5.99, 1.27)], 'blue', 1.8); bentTube(H, R, [[5.34, 5.98, .86], [5.66, 6.25, .68], [6.03, 6.25, .68]], 2, 'blue');
  for (const j of [5.36, 6.39]) bentTube(H, R, [[3.08, 5.98, 1.04], [3.71, j, 1.15], [5.53, j, 1.15], [3.08, 5.98, 1.04]], 2.1, 'blue'); metal(H, R, 3.66, 5.27, 1.94, 1.21, 1.14, .055, 'blue');
  for (const i of [7.93, 8.55]) shape(H, R, [H.p(i, 5.55, .03), H.p(i + .17, 5.55, .03), H.p(i + .17, 6.35, .27), H.p(i, 6.35, .27)], 'sun', .7);
  H.line(R, [H.p(8.29, 8.1, .02), H.p(8.29, 6.12, .02)], 'blue', 1.8, { tone: .16 });
  benchFrame(H, R, 1.14, 8.8, 2.46, 1.66, .77, 'sun'); cushion(H, R, 1.3, 8.96, .81, .99, .77, .12, 'paper'); shape(H, R, H.tile(2.47, 9.02, .81, .9, .8), 'teal', .53); H.line(R, [H.p(2.6, 9.22, .82), H.p(3.13, 9.8, .82)], 'paper', 2);
  H.line(R, [H.p(2.42, 9.27, .83), H.p(3.18, 9.69, .83)], 'coral', 3);
  const old = H.p(2.84, 9.5, .87); shape(H, R, [[old[0] - 4, old[1] - 4], [old[0] + 4, old[1] - 4], [old[0] + 4, old[1] + 3], [old[0] - 4, old[1] + 3]], 'sun', .8, .65); H.line(R, [[old[0], old[1] - 3], [old[0], old[1] + 2]], 'blue', .8);
  for (const [i, j] of [[9.71, 8.57], [10.44, 8.57], [9.71, 9.2], [10.44, 9.2]]) bentTube(H, R, [[i, j, .03], [10.08 + (i - 10.08) * .7, 8.9 + (j - 8.9) * .7, .36]], 1.9, 'teal');
  oval(H, R, ...H.p(10.08, 8.9, .37), 20, 11, 'teal', .58);
  const helmet = H.p(10.1, 8.91, .62); oval(H, R, ...helmet, 17, 13, 'sun', .75); for (let n = -1; n < 2; n++) H.line(R, [[helmet[0] + n * 7, helmet[1] - 9], [helmet[0] + n * 7 + 2, helmet[1] + 5]], 'blue', 2); stroke(H, R, [[helmet[0] - 10, helmet[1] + 6], [helmet[0] + 2, helmet[1] + 24], [helmet[0] + 12, helmet[1] + 7]], 'blue', 1.2);
  shape(H, R, H.tile(8.95, 9.7, 2.3, 1.24, .02), 'teal', .25); for (let n = 0; n < 4; n++) H.line(R, [H.p(9.12 + n * .48, 9.82, .03), H.p(9.12 + n * .48, 10.75, .03)], 'paper', 1); box(H, R, 9.25, 10.09, .61, .57, .05, .18, 'coral', .55); shape(H, R, H.tile(10.11, 10.22, .61, .46, .06), 'paper', 1);
  box(H, R, 9.15, 9.99, .84, .79, .02, .08, 'teal', .6);
  shape(H, R, [H.p(9.16, 9.99, .12), H.p(10, 9.99, .12), H.p(10, 9.63, .72), H.p(9.16, 9.63, .72)], 'coral', .56);
  for (const i of [9.3, 9.84]) H.dot(...H.p(i, 9.72, .59), 1.6, 'sun');
  const glove = H.p(10.44, 10.5, .12);
  for (const d of [-5, 5]) { oval(H, R, glove[0] + d, glove[1], 5, 4, 'paper', 1); for (let n = 0; n < 3; n++) H.line(R, [[glove[0] + d - 3 + n * 2.5, glove[1] - 1], [glove[0] + d - 4 + n * 2.5, glove[1] - 7 - n % 2 * 2]], 'paper', 2); }
  taskLight(H, R, .86, 6.6, 1.31, 'teal', .2);
}, (H, R, t) => {
  const u = cycle(t, 20) * 20, opening = ease(4, 8, u) * (1 - ease(12, 18, u)), check = ease(8, 9, u) * (1 - ease(10, 11.5, u)), hands = bag(H, R, opening, check);
  person(H, R, 3.72, 5.72, 'teal', hands.slice(0, 2)); person(H, R, 7.0, 7.3, 'coral', hands.slice(2), -1);
  const p = H.p(7.15, 6.12, 2.59), s = Math.sin(u * Math.PI / 10) * 3; H.line(R, [p, [p[0] + s, p[1] + 14]], 'blue', .8); oval(H, R, p[0] + s, p[1] + 18, 4, 4.5, 'sun', .85); H.line(R, [[p[0] + s - 2, p[1] + 15], [p[0] + s + 2, p[1] + 20]], 'paper', 1.2);
});
room.loopSeconds = 20;
room.stillTime = 10;
export default room;
