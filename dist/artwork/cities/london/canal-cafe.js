import { world, box, actor, shape, oval, stroke, ell, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, drape, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin, boardFloor } from '../structure.js';
import { windowBay, panelFront, taskLight, wallRack, hangingRail, recessedFrame } from '../joinery.js';

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
  H.tint(H.tile(1.75, 5.85, 7.4, 1.7, .03), 'blue', .2);
  for (const x of [2.0, 4.1, 6.2, 8.3]) { timber(H, R, x, 5.95, .16, 1.28, .06, 1.28); bentTube(H, R, [[x, 6.0, .6], [x + .7, 6.0, 1.18]], 2, 'teal'); }
  cabinetFrame(H, R, 2.5, 6.17, 6.1, .8, .18, 1.12, 4, 'teal', (i, j, w, d, z, h, n) => {
    if (n === 1) {
      timber(H, R, i, j, w, d, .6, .09, 'sun');
      for (let k = 0; k < 3; k++) drape(H, R, i + .1, j + .06, .95, .38, .73 + k * .09, .05, 'paper');
      box(H, R, i + .08, j + .12, 1.03, .41, .32, .23, 'coral', .55);
    } else {
      panelFront(H, R, i, 6.99, w, .22, 1.03, 1, 'teal');
      for (let k = 0; k < 4; k++) H.line(R, [H.p(i + .2 + k * .23, 7.01, .38), H.p(i + .2 + k * .23, 7.01, 1.09)], 'paper', .55, { tone: .55 });
    }
  });
  timber(H, R, 1.65, 5.65, 7.35, 1.6, 1.33, .17);
  timber(H, R, 1.65, 5.7, .8, 2.4, 1.33, .17);
  metal(H, R, 2.15, 7.12, 6.6, .12, .42, .1, 'teal');
  for (const x of [2.3, 8.4]) bentTube(H, R, [[x, 6.93, .8], [x, 7.21, .44]], 2, 'blue');
  metal(H, R, 2.65, 5.85, 1.8, .98, 1.51, .09, 'paper');
  for (const j of [6.08, 6.45]) for (let n = 0; n < 3; n++) {
    const q = H.p(2.94 + n * .51, j, 1.64);
    shape(H, R, [[q[0] - 6, q[1] + 1], [q[0] - 7, q[1] - 4], [q[0] - 3, q[1] - 8], [q[0] + 6, q[1] - 5], [q[0] + 8, q[1]], [q[0] + 3, q[1] + 3]], 'sun', .78, .65);
    if(j>6.2)oval(H,R,q[0],q[1]-3,4,2.4,'coral',.72);
    else for(let k=0;k<3;k++)H.line(R,[[q[0]-4+k*3,q[1]-5],[q[0]-2+k*3,q[1]]],'paper',.8);
  }
  for (const x of [2.59, 4.5]) {
    H.tint([H.p(x, 5.8, 1.6), H.p(x, 6.9, 1.6), H.p(x, 6.72, 2.37), H.p(x, 5.8, 2.37)], 'teal', .09);
    bentTube(H, R, [[x, 5.8, 1.53], [x, 5.8, 2.37], [x, 6.72, 2.37], [x, 6.9, 1.56]], 1.8, 'teal');
  }
  H.tint([H.p(2.59, 6.9, 1.6), H.p(4.5, 6.9, 1.6), H.p(4.5, 6.72, 2.37), H.p(2.59, 6.72, 2.37)], 'teal', .1);
  metal(H, R, 2.55, 5.75, 2.01, 1.02, 2.37, .065, 'teal');
  H.line(R, [H.p(2.75, 6.89, 1.73), H.p(3.25, 6.74, 2.27)], 'paper', 2.2);
  H.line(R, [H.p(3.64, 6.85, 1.68), H.p(4.08, 6.74, 2.21)], 'paper', 1.2);
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
  const dome = [[dx - 20, dy], [dx - 19, dy - 15], [dx - 8, dy - 25], [dx + 8, dy - 25], [dx + 19, dy - 15], [dx + 20, dy]];
  H.tint(dome, 'teal', .08);
  H.outline(R, dome, 'blue', .8);
  H.line(R, [[dx - 15, dy - 6], [dx - 13, dy - 15], [dx - 6, dy - 21]], 'paper', 1.7);
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
  for (const side of ['nw', 'ne']) {
    H.line(R, [wallPt(H, side, .06, 3.85, -.12), wallPt(H, side, side === 'nw' ? 9.3 : 11.7, 3.85, -.12)], 'teal', 6);
    H.line(R, [wallPt(H, side, .06, 3.91, -.15), wallPt(H, side, side === 'nw' ? 9.3 : 11.7, 3.91, -.15)], 'paper', 1.5);
  }
  for (const x of [.38, 4.08, 11.47]) {
    timber(H, R, x, .13, .16, .31, .08, 3.79, 'teal');
    metal(H, R, x - .025, .11, .21, .36, .1, .29, 'blue');
  }
  for (let n = 0; n < 16; n++) {
    const x = 4.22 + n * .435;
    shape(H, R, H.faceI(x, .24, .405, 1.32, 2.1), 'teal', n % 4 === 0 ? .28 : .12, .35);
  }
  recessedFrame(H, R, 'nw', .45, 1.37, 1.85, 1.34, 'sun', P => {
    shape(H, R, [P(.12, .14), P(1.23, .14), P(1.23, 1.18), P(.12, 1.18)], 'blue', .6);
    for (let k = 0; k < 3; k++) {
      const q = P(.36 + k * .34, .7);
      oval(H, R, q[0], q[1], 3.5, 4.5, ['sun', 'paper', 'coral'][k]);
      H.line(R, [P(.23, .3 + k * .17), P(1.09, .3 + k * .17)], 'paper', .8);
    }
  });
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
  for (const y of [2.25, 4.65]) timber(H, R, .37, y, 1.09, .14, .07, 1.31, 'teal');
  timber(H, R, .33, 2.16, 1.29, 2.82, 1.37, .14, 'sun');
  timber(H, R, .38, 2.26, 1.13, 2.59, .48, .11, 'teal');
  for (let n = 0; n < 3; n++) box(H, R, .53, 2.54 + n * .66, .71, .5, .6, .47, 'paper', .8);
  metal(H, R, .51, 2.45, .79, .71, 1.52, .12, 'teal');
  vessel(H, R, .86, 2.79, 1.7, 7, 15, 'paper');
  for (let n = 0; n < 5; n++) H.line(R, [H.p(.62 + n * .12, 3.34, 1.53), H.p(.62 + n * .12, 3.97, 1.53)], 'paper', 2.6);
  const timer = H.p(.89, 4.45, 1.69);
  oval(H, R, ...timer, 7, 7, 'coral');
  oval(H, R, ...timer, 5, 5, 'paper');
  H.line(R, [[timer[0], timer[1] - 3], timer, [timer[0] + 3, timer[1] + 1]], 'blue', .9);
  drape(H, R, .47, 4.68, .83, .39, 1.52, .46, 'paper');
  const A = (u, z) => wallPt(H, 'ne', u, z, -.55);
  H.line(R, [A(4.3, 3.77), A(11.25, 3.77)], 'blue', 5);
  H.line(R, [A(4.3, 3.8), A(11.25, 3.8)], 'sun', 2);
  for (let n = 0; n < 9; n++) shape(H, R, [A(4.35 + n * .75, 3.78), A(4.8 + n * .75, 3.78), A(4.8 + n * .75, 3.58), A(4.35 + n * .75, 3.58)], n % 2 ? 'paper' : 'coral', .85, .4);
  bentTube(H, R, [[11.6, .2, 3.9], [11.6, .2, 3.3], [11.4, .35, 3.1], [11.4, .35, .12]], 3, 'teal');
  cabinetFrame(H, R, .5, .28, 3.3, 1.25, .13, 3.45, 3, 'teal', (i, j, w, d, z, h, n) => {
    for (const zz of [.7, 1.5, 2.25]) timber(H, R, i, j, w, d, zz, .08, 'sun');
    for (let k = 0; k < 2; k++) {
      const q=H.p(i+.25+k*.47,j+.64,2.35);
      for(let level=0;level<2+n;level++)cup(H,R,[q[0],q[1]-level*5],level===n?'coral':'paper',k?1:-1);
    }
    if(n===0){
      for(let k=0;k<3;k++){
        box(H,R,i+.1+k*.28,j+.11,.23,.66,1.62,.38+k*.07,k===1?'paper':'sun',.7);
        const q=H.p(i+.21+k*.28,j+.44,2.02+k*.07);
        shape(H,R,[[q[0]-5,q[1]],[q[0]-7,q[1]-7],[q[0],q[1]-4],[q[0]+5,q[1]-8],[q[0]+6,q[1]]],'paper',1,.4);
        H.line(R,[[q[0]-4,q[1]+8],[q[0]+4,q[1]+8]],'coral',2);
      }
    }else if(n===1){
      for(let k=0;k<4;k++){
        metal(H,R,i+.08,j+.15,.83,.78,1.62+k*.1,.07,k%2?'paper':'teal');
        H.line(R,[H.p(i+.23,j+.94,1.65+k*.1),H.p(i+.72,j+.94,1.65+k*.1)],'sun',1.4);
      }
      drape(H,R,i+.14,j+.11,.67,.56,.83,.22,'paper');
    }else{
      drape(H,R,i+.08,j+.12,.68,.55,.9,.26,'coral');
      const q=H.p(i+.51,j+.62,1.65);
      for(let k=0;k<5;k++)oval(H,R,q[0],q[1]-k*3,11,4,'paper',1);
      H.line(R,[[q[0]-6,q[1]-13],[q[0]+5,q[1]-13]],'teal',1.2);
      box(H,R,i+.1,j+.14,.33,.44,1.62,.29,'sun',.6);
    }
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
  for (const x of [4.65, 5.13, 5.61, 6.09]) cup(H, R, H.p(x, 1.0, 2.43), x === 5.13 ? 'coral' : 'paper');
  for (const x of [4.62, 6.49]) {
    const q = H.p(x, 1.81, 2.11);
    oval(H, R, ...q, 4.5, 4.5, 'paper');
    H.line(R, [q, [q[0] + 2, q[1] - 2]], 'coral', .9);
  }
  shape(H, R, H.tile(7.16, 1.66, .67, .45, 1.4), 'blue', .7);
  bentTube(H, R, [[7.28, 1.82, 1.5], [7.73, 1.82, 1.5]], 3, 'sun');
  bentTube(H, R, [[10.51, 1.13, 1.5], [10.74, 1.15, 1.6], [10.74, 1.77, 1.58]], 1.4, 'teal');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(10.45, .63 + n * .22, 1.41), H.p(10.76, .63 + n * .22, 1.41)], 'blue', .6);
  metal(H, R, 7.73, .15, .52, .14, 2.53, .34, 'paper');
  bentTube(H, R, [[7.93, .32, 2.61], [7.99, .47, 2.24], [7.98, .74, 1.57]], .9, 'blue');
  for (const x of [.4, 4.1, 8.7, 11.6]) timber(H, R, x, 9.14, .13, .17, .1, 1.03, 'teal');
  bentTube(H, R, [[.45, 9.2, 1.05], [4.1, 9.2, 1.02], [8.7, 9.2, 1.04], [11.65, 9.2, 1.05]], 3.2, 'teal');
  timber(H, R, .7, 7.9, 1.45, 1.0, .03, .08);
  vessel(H, R, 1.35, 8.4, .16, 14, 7, 'paper');
  oval(H, R, ...H.p(1.35, 8.4, .43), 11, 3.3, 'teal', .35);
  bentTube(H, R, [[2.6, 8.75, .1], [2.6, 8.6, 1.28], [2.45, 8.55, 1.38], [2.28, 8.55, 1.28]], 2.2, 'sun');
  for (const x of [9.85, 11.07]) {
    bentTube(H, R, [[x, 5.61, .05], [x, 5.83, 1.05], [x, 6.34, 1.05], [x, 6.56, .05]], 2.4, 'teal');
    bentTube(H, R, [[x, 5.8, .45], [x, 6.35, .45]], 1.5, 'sun');
  }
  timber(H, R, 9.67, 5.72, 1.6, .76, 1.02, .13, 'sun');
  for (let n = 0; n < 3; n++) H.line(R, [H.p(9.76, 5.87 + n * .17, 1.17), H.p(11.17, 5.87 + n * .17, 1.17)], 'blue', .6);
  bentTube(H, R, [[10.13, 5.15, .05], [10.13, 5.22, .76], [10.69, 5.22, .76], [10.69, 5.15, .05]], 2.1, 'teal');
  oval(H, R, ...H.p(10.4, 5.25, .78), 14, 6.5, 'coral', .68);
  shape(H, R, H.tile(9.82, 5.89, .69, .42, 1.175), 'paper', 1);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(9.92, 5.96 + n * .065, 1.18), H.p(10.43, 5.96 + n * .065, 1.18)], 'teal', .55);
  cup(H, R, H.p(10.84, 6.11, 1.18), 'coral');
  bentTube(H, R, [[.45, 8.65, .3], [.45, 8.65, .71], [.45, 8.41, .8], [.45, 8.2, .69], [.45, 8.2, .3]], 2.2, 'blue');
  for (let n = 0; n < 7; n++) H.line(R, [H.p(10.72 + n * .12, 8.8, .06), H.p(10.72 + n * .12, 9.05, .06)], 'blue', 1.6);
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
