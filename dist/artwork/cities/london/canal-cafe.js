import { world, box, actor, shape, oval, stroke, ell, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, drape, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin, boardFloor } from '../structure.js';
import { windowBay, panelFront, taskLight, wallRack, hangingRail } from '../joinery.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
const rest = FIGURES.sample('idle', 0);
const rig = { ...rest, al: 24, el: 70, head: 12 };
FIGURES.clips['london-canal-server'] = { dur: 16, keys: [[0, rig], [1, rig]] };
FIGURES.clips['london-canal-customer'] = { dur: 16, keys: [[0, { ...rest, ar: 48, er: 30 }], [.4, { ...rest, ar: 48, er: 30 }], [.56, { ...rest, ar: 67, er: 15, head: -7 }], [.8, { ...rest, ar: 48, er: 30 }], [1, { ...rest, ar: 48, er: 30 }]] };
function cup(H, R, p, ink = 'paper', turn = 1) {
  const [x, y] = p;
  shape(H, R, [[x - 5, y - 9], [x + 5, y - 9], [x + 4, y - 1], [x - 3.7, y - 1]], ink, ink === 'paper' ? 1 : .55, .7);
  oval(H, R, x, y - 9, 5, 2.1, 'paper', 1);
  H.outline(R, ell(x, y - 9, 3.3, 1.1), 'sun', .8);
  stroke(H, R, [[x + 4 * turn, y - 8], [x + 8 * turn, y - 7], [x + 8 * turn, y - 3], [x + 4 * turn, y - 3]], 'blue', 1);
  H.line(R, [[x - 3, y - 1], [x + 3, y - 1]], 'sun', 1);
}
function reach(H, target) {
  const origin = H.p(5.92, 5.55, 0), sc = 1.5;
  let dx = -(target[0] - origin[0]) / sc - 5.2, dy = (target[1] - origin[1]) / sc + 32.5;
  const r = Math.hypot(dx, dy), cap = Math.min(r, 8.5); dx *= cap / r; dy *= cap / r;
  const e = Math.acos(Math.max(-1, Math.min(1, (cap * cap - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2))));
  rig.ar = (Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(e), 4.368 + 4.2 * Math.cos(e))) * 180 / Math.PI;
  rig.er = e * 180 / Math.PI;
}
function serving(H, R) {
  for (const x of [2.0, 4.1, 6.2, 8.3]) { timber(H, R, x, 5.95, .16, 1.28, .06, 1.28); bentTube(H, R, [[x, 6.0, .6], [x + .7, 6.0, 1.18]], 2, 'teal'); }
  timber(H, R, 1.65, 5.65, 7.35, 1.6, 1.33, .17);
  timber(H, R, 1.65, 5.7, .8, 2.4, 1.33, .17);
  metal(H, R, 2.15, 7.12, 6.6, .12, .42, .1, 'teal');
  for (const x of [2.3, 8.4]) bentTube(H, R, [[x, 6.93, .8], [x, 7.21, .44]], 2, 'blue');
  shape(H, R, H.tile(5.65, 5.58, .75, .64, 1.515), 'blue', .4);
  H.outline(R, H.tile(5.7, 5.63, .65, .54, 1.52), 'paper', 1);
  oval(H, R, ...H.p(6.32, 6.12, 1.52), 10, 4.3, 'paper', 1);
  H.outline(R, ell(...H.p(6.32, 6.12, 1.53), 6.1, 2.3), 'sun', 1.2, { tone: .6 });
  const [sx, sy] = H.p(3.03, 6.12, 1.52);
  H.line(R, [[sx - 9, sy], [sx + 8, sy]], 'blue', 3.5);
  H.line(R, [[sx - 7, sy], [sx + 6, sy]], 'sun', 1.4);
  oval(H, R, sx + 7, sy, 3.3, 1.8, 'paper');
  for (let n = 0; n < 3; n++) oval(H, R, ...H.p(7.58 + n * .22, 6.22, 1.56), 6, 3.2, 'sun', .7);
  const [dx, dy] = H.p(7.85, 6.2, 1.53);
  shape(H, R, [[dx - 20, dy], [dx - 19, dy - 15], [dx - 8, dy - 25], [dx + 8, dy - 25], [dx + 19, dy - 15], [dx + 20, dy]], 'paper', .24);
  oval(H, R, dx, dy - 27, 3, 2, 'teal');
  taskLight(H, R, 2.4, 6.1, 1.52, 'coral', .75);
  floorLight(H, 5.5, 6.7, 90, .55);
}
const room = world('london-canal-cafe', 'A cup within reach', { wall: false, floor: 'paper', tone: .18, head: 35 }, (H, R) => {
  boardFloor(H, R, .1, .1, 11.8, 9.25, .04, 'sun');
  shape(H, R, H.tile(0, 9.45, 12, 2.55, .025), 'teal', .58);
  for (let n = 0; n < 9; n++) H.line(R, [H.p(n * 1.4, 9.9 + n % 3 * .45, .03), H.p(n * 1.4 + 1.05, 9.9 + n % 3 * .45, .03)], 'blue', .7, { tone: .55 });
  masonry(H, R, 'nw', 0, 9.4, 0, 3.9, 'coral', .32);
  masonry(H, R, 'ne', 0, 11.8, 0, 4.1, 'paper', .85);
  windowBay(H, R, 'ne', 4.35, 6.75, 2.2, 1.42, { divisions: 4, view: P => {
    for (let n = 0; n < 5; n++) shape(H, R, [P(n * 1.4, .12), P(n * 1.4 + 1.1, .12), P(n * 1.4 + 1.1, .52), P(n * 1.4 + .55, .75), P(n * 1.4, .5)], n % 2 ? 'teal' : 'coral', .25, .4);
  } });
  wallRack(H, R, 'nw', 2.2, 4.9, 1.15, 1.68, 2, 'teal', (P, z, row) => {
    for (let k = 0; k < 4; k++) {
      const q = P(.55 + k * 1.1, z + .14, .42);
      if (row) { shape(H, R, [[q[0] - 8, q[1]], [q[0] + 8, q[1]], [q[0] + 5, q[1] - 15], [q[0] - 5, q[1] - 15]], k % 2 ? 'sun' : 'paper', .8); H.line(R, [[q[0] - 6, q[1] - 9], [q[0] + 6, q[1] - 9]], 'coral', 1.2); }
      else cup(H, R, q, k % 2 ? 'teal' : 'paper');
    }
  });
  hangingRail(H, R, 'nw', 7.35, 1.4, 2.7, 2, (P, u, n) => {
    const q = P(u, -.17);
    if (n) { stroke(H, R, [q, [q[0] - 4, q[1] + 15], [q[0] + 4, q[1] + 15], q], 'sun', 2); }
    else { shape(H, R, [[q[0] - 8, q[1]], [q[0] + 8, q[1]], [q[0] + 7, q[1] + 27], [q[0] - 8, q[1] + 25]], 'paper', 1); H.line(R, [[q[0] - 7, q[1] + 21], [q[0] + 7, q[1] + 23]], 'coral', 2); }
  });
  const A = (u, z) => wallPt(H, 'ne', u, z, -.55);
  H.line(R, [A(4.3, 3.77), A(11.25, 3.77)], 'blue', 5);
  H.line(R, [A(4.3, 3.8), A(11.25, 3.8)], 'sun', 2);
  for (let n = 0; n < 9; n++) shape(H, R, [A(4.35 + n * .75, 3.78), A(4.8 + n * .75, 3.78), A(4.8 + n * .75, 3.58), A(4.35 + n * .75, 3.58)], n % 2 ? 'paper' : 'coral', .85, .4);
  bentTube(H, R, [[11.6, .2, 3.9], [11.6, .2, 3.3], [11.4, .35, 3.1], [11.4, .35, .12]], 3, 'teal');
  cabinetFrame(H, R, .5, .28, 3.3, 1.25, .13, 3.45, 3, 'teal', (i, j, w, d, z, h, n) => {
    for (const zz of [.7, 1.5, 2.25]) timber(H, R, i, j, w, d, zz, .08, 'sun');
    for (let k = 0; k < 3; k++) cup(H, R, H.p(i + .19 + k * .27, j + .57, 2.35), k === n ? 'coral' : 'paper');
    if (n < 2) for (let k = 0; k < 2; k++) { box(H, R, i + .12 + k * .4, j + .1, .29, .45, 1.62, .44, 'sun', .45); H.line(R, [H.p(i + .12 + k * .4, j + .3, 2.06), H.p(i + .4 + k * .4, j + .3, 2.06)], 'coral', 1.6); }
    else drape(H, R, i + .08, j + .12, .68, .55, .9, .26, 'coral');
    panelFront(H, R, i, j + d, w, .2, .45, 1, 'teal');
  });
  box(H, R, 4.05, .4, 6.8, 1.75, .12, 1.1, 'teal', .5);
  panelFront(H, R, 4.05, 2.16, 4.9, .2, .95, 4, 'teal');
  metal(H, R, 9.05, .41, 1.65, 1.72, .15, 1.09, 'paper');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(9.2, 2.145, .28 + n * .075), H.p(10.53, 2.145, .28 + n * .075)], 'blue', .65);
  H.line(R, [H.p(9.23, 2.16, .72), H.p(9.23, 2.16, 1.06)], 'teal', 2);
  timber(H, R, 3.98, .36, 6.85, 1.87, 1.24, .14, 'sun');
  basin(H, R, 8.95, .57, 1.42, 1.3, 1.4);
  metal(H, R, 4.35, .75, 2.65, 1.05, 1.38, 1.02, 'blue');
  metal(H, R, 4.48, 1.25, 2.37, .62, 1.5, .12, 'paper');
  for (let n = 0; n < 13; n++) H.line(R, [H.p(4.55 + n * .17, 1.34, 1.63), H.p(4.55 + n * .17, 1.82, 1.63)], 'blue', .75);
  for (const i of [4.98, 6.06]) {
    metal(H, R, i, 1.6, .5, .32, 1.87, .27, 'teal');
    bentTube(H, R, [[i + .22, 1.84, 1.96], [i + .22, 2.25, 1.9]], 3.6, 'blue');
    oval(H, R, ...H.p(i + .25, 1.82, 2.2), 3.4, 3.4, 'sun', .85);
  }
  bentTube(H, R, [[6.8, 1.72, 2.15], [7.02, 1.83, 2.02], [6.98, 2.05, 1.67]], 1.8, 'paper');
  metal(H, R, 7.3, .67, .75, .87, 1.4, .65, 'teal');
  vessel(H, R, 7.69, 1.13, 2.25, 9, 17, 'blue');
  shape(H, R, H.faceI(7.38, 1.55, .58, 1.76, 1.87), 'paper', 1);
  vessel(H, R, 8.35, 1.68, 1.45, 5.5, 12, 'paper');
  for (const x of [.4, 4.1, 8.7, 11.6]) timber(H, R, x, 9.14, .13, .17, .1, 1.03, 'teal');
  bentTube(H, R, [[.45, 9.2, 1.05], [4.1, 9.2, 1.02], [8.7, 9.2, 1.04], [11.65, 9.2, 1.05]], 3.2, 'teal');
  timber(H, R, .7, 7.9, 1.45, 1.0, .03, .08);
  vessel(H, R, 1.35, 8.4, .16, 14, 7, 'paper');
  oval(H, R, ...H.p(1.35, 8.4, .43), 11, 3.3, 'teal', .35);
  bentTube(H, R, [[2.6, 8.75, .1], [2.6, 8.6, 1.28], [2.45, 8.55, 1.38], [2.28, 8.55, 1.28]], 2.2, 'sun');
  box(H, R, 8.98, 7.75, .7, .55, .16, .82, 'coral', .65);
  const [bx, by] = H.p(9.37, 8.32, .67);
  oval(H, R, bx, by, 5.5, 5.5, 'sun', .9);
  for (let n = 0; n < 8; n++) { const a = n * Math.PI / 4; H.line(R, [[bx + Math.cos(a) * 6, by + Math.sin(a) * 6], [bx + Math.cos(a) * 8, by + Math.sin(a) * 8]], 'sun', 1); }
  bentTube(H, R, [[9.1, 7.9, 1.01], [9.3, 7.9, 1.26], [9.55, 7.9, 1.01]], 1.4, 'blue');
}, (H, R, t) => {
  const u = ((t % 16) + 16) % 16;
  const transfer = ease(2, 6.4, u) * (1 - ease(9.6, 13.4, u));
  const lift = .27 * (ease(.5, 2.8, u) - ease(4.8, 6.4, u) + ease(9.6, 10.8, u) - ease(12, 13.7, u));
  const p = H.p(6 + transfer * .32, 5.92 + transfer * .2, 1.53 + lift);
  reach(H, [p[0] + 4, p[1] - 6]);
  let hands;
  actor(H, R, 5.92, 5.55, t, 'london-canal-server', { face: 'sw', shirt: ['paper', 1], apron: ['teal', .76], hairStyle: 'bun', skin: ['coral', .48], prop: (HH, RR, p) => { hands = p; } }, 0, 1.5);
  serving(H, R);
  const elbow = hands.D.pt([5.2 + Math.sin(rig.ar * Math.PI / 180) * 4.368, -32.5 + Math.cos(rig.ar * Math.PI / 180) * 4.368]);
  H.line(R, [elbow, hands.nearHand], 'blue', 4.2);
  H.line(R, [elbow, hands.nearHand], 'paper', 2.6);
  oval(H, R, ...hands.nearHand, 2.7, 2.3, 'coral', .48);
  cup(H, R, p, 'paper', 1 - 2 * ease(6.4, 9.6, u) * (1 - ease(11.2, 13.6, u)));
  actor(H, R, 7.15, 8.28, t, 'london-canal-customer', { shirt: ['coral', .6], face: 'sw', hairStyle: 'curly', skin: ['coral', .65] }, 0, 1.5);
  const aw = Math.sin(u * Math.PI / 8) * .022;
  H.line(R, [wallPt(H,'ne',9.75,3.59,-.55),wallPt(H,'ne',10.2,3.59+aw,-.55),wallPt(H,'ne',10.5,3.59,-.55)], 'paper', 1.5);
  for (let n = 0; n < 5; n++) {
    const q = (u / 16 + n / 5) % 1, x = 1 + n * 2.1;
    H.opacity(Math.sin(q * Math.PI) * .55, () => H.line(R, [H.p(x + q * .65, 10.4 + n % 2 * .5, .04), H.p(x + .75 + q * .65, 10.4 + n % 2 * .5, .04)], 'paper', 1.8));
  }
});
room.loopSeconds = 16;
room.stillTime = 8.8;
export default room;
