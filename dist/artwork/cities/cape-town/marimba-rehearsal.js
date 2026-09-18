import { world, shape, oval, stroke, cycle, mix, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, drape, slattedSeat, pendant, floorLight } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, recessedFrame, wallRack, caster } from '../joinery.js';
import { boundBook, coiledLine, satchel, foldedCloth } from '../furnishings.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, ink, seated = false, nod = 0) {
  const [x, y] = H.p(i, j), h = seated ? 54 : 75, hip = y - (seated ? 13 : 32), sy = y - h + 23;
  H.tint([[x - 14, y + 1], [x + 22, y + 3], [x + 30, y + 9], [x - 3, y + 8]], 'blue', .16);
  for (const s of [-1, 1]) {
    stroke(H, R, [[x + s * 5, hip], [x + s * 10 + (seated ? 7 : 0), y - 14], [x + s * 10 + (seated ? 9 : 0), y - 2]], 'blue', 7);
    oval(H, R, x + s * 10 + (seated ? 12 : 3), y, 7, 3, 'blue', .8);
  }
  shape(H, R, [[x - 10, sy], [x + 10, sy], [x + 12, hip + 3], [x - 11, hip + 3]], ink, .68, .8);
  const hy = y - h + 10 + nod;
  oval(H, R, x + 1, hy, 9, 10, 'coral', .36);
  shape(H, R, [[x - 8, hy], [x - 10, hy - 7], [x - 3, hy - 12], [x + 7, hy - 10], [x + 10, hy - 4], [x + 4, hy - 5]], 'blue', .82, .6);
  H.dot(x + 5, hy + 1, 1, 'blue'); stroke(H, R, [[x + 5, hy + 5], [x + 2, hy + 6], [x, hy + 5]], 'blue', .6);
  return (left, right) => {
    for (const [s, hand] of [[-1, left], [1, right]]) {
      const target = hand || [x + s * 14, hip - 2];
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], 'blue', 6.5);
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], ink, 4.8);
      oval(H, R, ...target, 3.2, 3, 'coral', .38);
    }
  };
}
function mallet(H, R, a, b, repair = false) {
  H.line(R, [a, b], 'blue', 2.4); H.line(R, [[a[0] - .6, a[1]], [b[0] - .6, b[1]]], 'sun', 1.2);
  if (repair) for (let n = 0; n < 4; n++) H.line(R, [[mix(a[0], b[0], .15 + n * .035) - 2, mix(a[1], b[1], .15 + n * .035)], [mix(a[0], b[0], .15 + n * .035) + 2, mix(a[1], b[1], .15 + n * .035) + 1]], 'paper', 1);
  oval(H, R, ...b, 6, 5, 'coral', .75);
  for (let n = -2; n <= 2; n++) stroke(H, R, [[b[0] - 4, b[1] + n], [b[0], b[1] + n - 1.5], [b[0] + 4, b[1] + n]], 'sun', .65, .8);
}
function instrument(H, R) {
  for (const i of [2.8, 8.6]) for (const j of [4.2, 5.65]) {
    metal(H, R, i, j, .17, .18, .15, 1.38, 'teal'); timber(H, R, i - .11, j - .09, .39, .36, .02, .16, 'sun');
    caster(H, R, i + .06, j + .07, .02);
  }
  for (const j of [4.22, 5.72]) { timber(H, R, 2.58, j, 6.42, .14, 1.35, .2, 'sun'); timber(H, R, 2.78, j, 5.98, .13, .31, .15, 'sun'); }
  for (const i of [2.92, 8.65]) bentTube(H, R, [[i, 4.28, .45], [i, 5.65, 1.32]], 2.2, 'teal');
  for (let n = 0; n < 13; n++) {
    const i = 2.88 + n * .43, length = 1.78 - n * .065, z = 1.45, low = .21 + n * .065;
    const [x, y] = H.p(i + .15, 5.31, z);
    const bottom = H.p(i + .15, 5.31, low);
    shape(H, R, [[x - 5.2, y], [x + 5.2, y], [bottom[0] + 5.2, bottom[1]], [bottom[0] - 5.2, bottom[1]]], 'blue', .7, .7);
    H.line(R, [[x - 2.8, y + 4], [bottom[0] - 2.8, bottom[1] - 3]], 'paper', 1, { tone: .65 });
    oval(H, R, ...bottom, 5.2, 2.2, 'teal', .52); oval(H, R, x, y, 5.3, 2.2, 'blue', .9);
    if (n === 4) metal(H, R, i - .02, 5.28, .36, .16, .8, .13, 'coral');
    timber(H, R, i, 4.02 + n * .024, .34, length, 1.57, .1, n % 4 === 1 ? 'coral' : 'sun');
    for (const j of [4.38, 5.43]) { H.dot(...H.p(i + .17, j, 1.68), 1.7, 'blue'); H.dot(...H.p(i + .17, j, 1.69), .6, 'paper'); }
  }
  for (const j of [4.38, 5.43]) stroke(H, R, [H.p(2.65, j, 1.67), H.p(5.8, j, 1.7), H.p(8.65, j, 1.67)], 'coral', 1.2);
  timber(H, R, 5.12, 3.57, 1.32, .5, 1.25, .14, 'sun'); cushion(H, R, 5.15, 3.6, 1.25, .43, 1.39, .08, 'teal');
  for (const i of [3, 4.8, 6.6, 8.3]) { const p = H.p(i, 5.9, 1.36); stroke(H, R, [[p[0], p[1]], [p[0] + 3, p[1] + 5], [p[0] + 6, p[1] + 1]], 'blue', 1.5); }
}
const room = world('cape-town-marimba-rehearsal', 'The last note settles', { floor: 'paper', tone: .8, wall: false, head: 60 }, (H, R) => {
  masonry(H, R, 'nw', 0, 12, 0, 3.6, 'teal', .33); masonry(H, R, 'ne', 0, 12, 0, 3.6, 'paper', .8);
  windowBay(H, R, 'nw', 2, 7.2, 2.65, .75, { night: true, divisions: 5 });
  for (const i of [.3]) {
    bentTube(H, R, [[i, .08, 3.62], [i, 5.4, 4.28], [i, 10.7, 3.62]], 3.7, 'blue');
    bentTube(H, R, [[i, .08, 3.62], [i, 10.7, 3.62]], 2.3, 'teal');
    for (let j = .2; j < 10; j += 2) bentTube(H, R, [[i, j, 3.65], [i, j + 1, 3.96], [i, j + 2, 3.65]], 1.4, 'teal');
  }
  H.line(R, [H.p(.25, .2, .15), H.p(.25, 11.6, .15)], 'blue', 2); metal(H, R, .7, 10.95, 9.8, .12, 0, .05, 'blue');
  for (let i = 1; i < 10.5; i += .25) H.line(R, [H.p(i, 10.98), H.p(i + .07, 11.08)], 'paper', .8);
  boardFloor(H, R, 2.6, 2.34, 6.6, 1.65, .1, 'coral', .5); floorLight(H, 5.5, 5.5, 155, .55);
  cabinetFrame(H, R, 7.6, .2, 4, 1.2, .13, 3.23, 3, 'teal', (i, j, w, d, z, h, col) => {
    for (const level of [.65, 1.48, 2.22]) timber(H, R, i, j, w, d, z + level, .07, 'sun');
    if (col === 0) {
      for (let n = 0; n < 5; n++) { const p = H.p(i + .16 + n * .17, j + .43, z + 1.7); mallet(H, R, p, [p[0], p[1] - 22], n === 1); }
      for (let n = 0; n < 4; n++) boundBook(H, R, i + .08, j + .12 + n * .025, .8, .62, z + .68 + n * .1, n % 2 ? 'paper' : 'coral');
      coiledLine(H, R, i + .5, j + .5, z + .06, 12, 'blue');
    } else if (col === 1) {
      metal(H, R, i + .1, j + .11, .85, .62, z + .02, .56, 'blue');
      for (const h0 of [.19, .42]) oval(H, R, ...H.p(i + .52, j + .75, z + h0), 6.5, 7, 'teal', .5);
      for (let n = 0; n < 3; n++) { const p = H.p(i + .25 + n * .28, j + .4, z + 1.65); oval(H, R, p[0], p[1], 7, 4, n % 2 ? 'coral' : 'sun', .7); stroke(H, R, [[p[0] - 6, p[1]], [p[0] - 5, p[1] + 11], [p[0] + 5, p[1] + 11], [p[0] + 6, p[1]]], 'blue', 1); }
      for (let n = 0; n < 6; n++) timber(H, R, i + .12 + n * .12, j + .2, .1, .45 - n * .035, z + 2.32, .055, 'sun');
    } else {
      satchel(H, R, i + .55, j + .58, z + .55, 'coral', .6); foldedCloth(H, R, i + .05, j + .08, .93, .67, z + .7, 'paper', 'coral');
      metal(H, R, i + .1, j + .1, .83, .58, z + 1.54, .42, 'blue'); H.line(R, [H.p(i + .35, j + .2, z + 2), H.p(i + .6, j + .2, z + 2)], 'sun', 2);
    }
  });
  recessedFrame(H, R, 'ne', 2.5, 3.5, 2.05, 1.05, 'coral', P => {
    shape(H, R, [P(.14, .14), P(3.36, .14), P(3.36, .91), P(.14, .91)], 'paper', .9, .5);
    for (let n = 0; n < 5; n++) { const p = P(.48 + n * .55, .53); oval(H, R, p[0], p[1] - 5, 3.2, 3.4, 'blue', .7); H.line(R, [[p[0], p[1]], [p[0] + 1, p[1] + 11]], n % 2 ? 'teal' : 'coral', 5); }
  });
  for (const [i,j,w] of [[.85,5.5,1.6],[1.05,8.1,1.6],[4.3,9.45,1.6],[7.15,9.2,1.6],[10,7.1,1.5]]) slattedSeat(H, R, i, j, w, .02, 'coral', .8);
  cushion(H, R, 10.1, 7.22, 1.25, .58, .75, .1, 'paper'); satchel(H, R, 10.85, 8.8, .02, 'teal', .68);
  drape(H, R, 1.02, 8.2, 1.5, .6, .82, .54, 'paper');
  for (let n = 0; n < 5; n++) { const p = H.p(1.14 + n * .27, 8.88, .34); oval(H, R, ...p, 2.6, 3.7, 'sun', .6); }
  shape(H, R, H.faceI(1.42, 8.89, .5, .34, .7), 'coral', .48, .4);
  timber(H, R, .82, 3.15, 1.7, 1.12, .55, .1, 'sun'); for (const i of [.92,2.27]) timber(H,R,i,3.28,.13,.8,.03,.52,'teal');
  timber(H, R, 1.04, 3.32, .37, .8, .66, .09, 'sun'); coiledLine(H, R, 1.93, 3.55, .67, 8, 'coral');
  H.line(R, [H.p(1.2, 3.6, .77), H.p(1.8, 3.6, .77)], 'coral', 1.2); oval(H, R, ...H.p(2,3.98,.68), 5, 4, 'coral', .7);
  pendant(H, R, 3.1, 3.4, 4, 2.7, 'sun', .8);
}, (H, R, time) => {
  const t = cycle(time, 18) * 18;
  const settle = ease(8.4, 10.2, t) * (1 - ease(10.8, 15.4, t));
  const strike = Math.sin((t - 3.6) * Math.PI * 3.3) * ease(3.6,3.9,t) * (1-ease(6.8,7.2,t));
  const ends = [H.p(5.03, 4.67, 1.84 - Math.max(0, strike) * .16), H.p(5.78, 4.47, 1.84 - Math.max(0, -strike) * .16)];
  const grips = [H.p(5.35, 3.88, 1.43), H.p(5.98, 3.85, 1.4)];
  for (let n = 0; n < 2; n++) {
    const rest = H.p(5.37 + n * .5, 3.96, 1.53), hand = H.p(5.37 + n * .5, 3.5, 1.48);
    ends[n] = ends[n].map((v, k) => mix(v, rest[k], settle)); grips[n] = grips[n].map((v, k) => mix(v, hand[k], settle));
  }
  const arms = person(H, R, 5.64, 3.2, 'teal');
  const nod = Math.sin(Math.PI * ease(8.5, 10.2, t)) * 3;
  const listener = person(H, R, 10.6, 7.62, 'sun', true, nod);
  listener(H.p(10.65,7.66,.74), H.p(11.1,7.7,.68));
  instrument(H, R); arms(...grips); mallet(H, R, grips[0], ends[0], true); mallet(H, R, grips[1], ends[1]);
  const P = (u,v) => wallPt(H, 'ne', .6 + u, 2.65 + v, -.24);
  shape(H, R, [P(0,.5),P(1.35,.5),P(1.35,-.22),P(.65,-.17 + Math.sin(time * Math.PI / 9) * .03),P(0,-.24)], 'coral', .45,.7);
  H.line(R,[P(0,.52),P(1.35,.52)],'sun',2);
});
room.loopSeconds = 18;
room.stillTime = 7.7;
export default room;
