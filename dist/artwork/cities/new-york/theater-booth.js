import { benchFrame, bentTube, cushion, metal, surface, timber, vessel } from '../materials.js';
import { cabinetFrame, rackFrame, boardFloor } from '../structure.js';
import { caster, taskLight } from '../joinery.js';
import { boundBook, coiledLine, foldedCloth, shallowTray, satchel } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, head: 12, lean: -7, al: 55, ar: 69, el: 45, er: 30 };
FIGURES.clips.newYorkLightingCue = {
  dur: 12,
  keys: [
    [0, seated],
    [0.16, seated],
    [0.34, { ...seated, ar: 82, er: 15, head: -12 }],
    [0.66, { ...seated, ar: 82, er: 15, head: -12 }],
    [0.86, seated],
    [1, seated]
  ]
};

function stage(H, R, intensity = 0) {
  const view = H.faceI(1.37, 0.27, 9.14, 1.49, 3.77);
  surface(H, R, view, 'blue', 0.94);
  H.clip(view, () => {
    surface(H, R, H.faceI(1.48, 0.29, 8.92, 1.52, 2.13), 'teal', 0.35);
    for (let n = 0; n < 13; n++) H.line(R, [H.p(1.48 + n * 0.74, 0.3, 1.53), H.p(2.01 + n * 0.61, 0.3, 2.13)], 'sun', 0.75, { tone: 0.4 });
    for (const [i, w] of [
      [1.5, 1.34],
      [9.03, 1.39]
    ]) {
      surface(H, R, H.faceI(i, 0.33, w, 1.54, 3.66), 'coral', 0.7);
      for (let n = 0; n < 6; n++) H.line(R, [H.p(i + 0.1 + n * 0.23, 0.34, 1.62), H.p(i + 0.1 + n * 0.23, 0.34, 3.64)], 'blue', 1.1, { tone: 0.55 });
    }
    surface(H, R, H.faceI(1.44, 0.35, 8.96, 3.3, 3.65), 'coral', 0.7);
    for (let n = 0; n < 10; n++)
      H.line(R, [H.p(1.57 + n * 0.87, 0.36, 3.55), H.p(2.0 + n * 0.87, 0.36, 3.33), H.p(2.44 + n * 0.87, 0.36, 3.55)], 'sun', 0.7);
    for (const i of [3.44, 7.83]) {
      metal(H, R, i, 0.41, 0.34, 0.16, 2.95, 0.28, 'blue');
      H.tint([H.p(i + 0.13, 0.44, 2.99), H.p(i - 1.13, 0.44, 1.69), H.p(i + 1.46, 0.44, 1.69)], 'sun', 0.06 + intensity * 0.39);
      surface(H, R, ell(...H.p(i + 0.15, 0.46, 1.73), 28, 7), 'sun', 0.08 + intensity * 0.42, 0.4);
    }
    timber(H, R, 5.23, 0.55, 0.73, 0.17, 1.61, 0.63, 'paper');
    H.line(R, [H.p(5.19, 0.6, 1.63), H.p(6.04, 0.6, 1.63)], 'teal', 1.2);
  });
  H.outline(R, view, 'teal', 2);
}

const room = world(
  'new-york-theater-booth',
  'Theater District · Before the Cue',
  { floor: 'paper', tone: 1, wall: false, head: 105 },
  (H, R) => {
    H.opacity(0.45, () => boardFloor(H, R, 0.06, 0.08, 11.86, 11.8, 0.025, 'teal', 0.54));
    surface(H, R, H.faceI(0.08, 0.12, 11.84, 0, 4.28), 'blue', 0.8);
    surface(H, R, H.faceJ(0.12, 0.13, 11.74, 0, 4.28), 'teal', 0.48);
    for (let n = 0; n < 14; n++) surface(H, R, H.faceJ(0.15, 0.26 + n * 0.82, 0.69, 0.34, 3.91), 'blue', 0.54, 0.7);
    for (const z of [0.16, 1.29, 4.04]) metal(H, R, 0.17, 0.15, 11.61, 0.17, z, 0.11, 'teal');
    surface(H,R,H.faceJ(0.25,4.7,1.97,0.13,3.41),'blue',0.86);
    for(const j of [4.69,6.68]) timber(H,R,0.27,j,0.15,0.11,0.1,3.39,'sun');
    timber(H,R,0.27,4.69,0.15,2.1,3.44,0.12,'sun');
    metal(H,R,0.43,6.33,0.14,0.29,1.44,0.16,'paper');
    bentTube(H,R,[[0.32,0.47,3.85],[0.32,11.42,3.85],[0.32,11.42,0.33]],1.7,'sun');
    metal(H,R,0.32,10.96,0.25,0.68,0.53,0.49,'paper');
    for(const j of [11.15,11.44]) H.dot(...H.p(0.59,j,0.77),1.7,'blue');
    const [kx,ky]=H.p(0.46,8.34,3.05);
    H.line(R,[[kx,ky],[kx+8,ky]],'sun',2.1);
    stroke(H,R,[[kx+8,ky],[kx+16,ky+7],[kx+16,ky+23],[kx+8,ky+27],[kx,ky+23],[kx,ky+7],[kx+8,ky]],'blue',2.5);
    for(const dx of [0,16]) oval(H,R,kx+dx,ky+22,4,7,'paper',0.8);
    stage(H, R, 0);
    for (const i of [1.19, 10.61]) timber(H, R, i, 0.19, 0.13, 0.36, 1.38, 2.36, 'sun');
    timber(H, R, 1.14, 0.12, 9.67, 0.55, 1.29, 0.16, 'sun');
    cabinetFrame(H, R, 0.47, 2.18, 1.84, 2.34, 0.04, 3.35, 1, 'blue', (i, j, w, d, z, h) => {
      for (let row = 0; row < 7; row++) {
        metal(H, R, i, j, w, d, z + row * 0.42, 0.34, 'teal');
        for (let n = 0; n < 4; n++)
          H.dot(...H.p(i + 0.19 + n * 0.23, j + d + 0.01, z + 0.17 + row * 0.42), 1.4, n === row % 4 ? 'sun' : 'paper', 0.7);
        for(let k=0;k<5;k++) H.line(R,[H.p(i+1.05+k*0.11,j+d+0.02,z+0.22+row*0.42),H.p(i+1.05+k*0.11,j+d+0.02,z+0.3+row*0.42)],'blue',0.8);
        if(row===2 || row===4) bentTube(H,R,[[i+0.25,j+d+0.04,z+0.18+row*0.42],[i+0.25,j+d+0.4,z-0.1+row*0.42],[i+0.85,j+d+0.4,z-0.1+row*0.42],[i+0.85,j+d+0.04,z+0.18+row*0.42]],1.4,row===2?'coral':'sun');
        H.line(R, [H.p(i + 1.13, j + d + 0.01, z + 0.12 + row * 0.42), H.p(i + 1.49, j + d + 0.01, z + 0.12 + row * 0.42)], 'paper', 0.8);
      }
    });
    for (const i of [3.04, 8.88])
      for (const j of [3.52, 6.61]) {
        metal(H, R, i, j, 0.15, 0.15, 0.04, 0.94, 'teal');
        metal(H, R, i - 0.07, j - 0.07, 0.29, 0.29, 0.02, 0.08, 'blue');
      }
    timber(H, R, 2.91, 3.32, 6.27, 3.43, 0.92, 0.13, 'sun');
    const top = [H.p(3.09, 3.52, 1.46), H.p(9.01, 3.52, 1.46), H.p(9.01, 6.62, 1.05), H.p(3.09, 6.62, 1.05)];
    surface(H,R,[H.p(3.09,3.52,1.46),H.p(3.09,6.62,1.05),H.p(3.09,6.62,0.96),H.p(3.09,3.52,0.96)],'blue',0.8);
    surface(H,R,[H.p(9.01,3.52,1.46),H.p(9.01,6.62,1.05),H.p(9.01,6.62,0.96),H.p(9.01,3.52,0.96)],'blue',0.8);
    for(const j of [3.65,6.4]) {
      metal(H,R,3.12,j,5.79,0.1,0.3,0.11,'teal');
      for(const i of [3.21,8.8]) H.dot(...H.p(i,j+0.11,0.35),1.6,'sun');
    }
    surface(H, R, top, 'teal' , 0.77, 1.3);
    for (let n = 0; n < 14; n++) {
      const i = 3.36 + n * 0.39;
      H.line(R, [H.p(i, 4.78, 1.294), H.p(i, 6.23, 1.104)], 'blue', 1.7);
      const j = 5.0 + (n % 4) * 0.29;
      metal(H, R, i - 0.1, j, 0.2, 0.15, 1.265 - (j - 5) * 0.132, 0.052, n === 12 ? 'coral' : 'paper');
      for (let k = 0; k < 5; k++)
        H.line(R, [H.p(i - 0.07, 4.86 + k * 0.25, 1.288 - k * 0.033), H.p(i + 0.07, 4.86 + k * 0.25, 1.288 - k * 0.033)], 'paper', 0.55);
      for (const j of [3.83, 4.17]) surface(H, R, ell(...H.p(i, j, 1.418 - (j - 3.83) * 0.132), 2.8, 1.7), 'sun', 0.8);
    }
    for (const i of [3.5, 5.63]) {
      metal(H, R, i, 2.96, 1.77, 0.23, 1.38, 1.02, 'blue');
      surface(H, R, H.faceI(i + 0.1, 3.2, 1.56, 1.51, 2.28), 'teal', 0.49);
      for (let n = 0; n < 7; n++) surface(H, R, H.faceI(i + 0.17 + n * 0.19, 3.21, 0.1, 1.57, 1.73 + (n % 3) * 0.17), 'sun', 0.7, 0.3);
    }
    boundBook(H, R, 7.84, 3.72, 0.91, 0.77, 1.5, 'paper');
    vessel(H, R, 8.66, 4.36, 1.36, 4, 9, 'coral');
    for (let n = 0; n < 6; n++)
      bentTube(
        H,
        R,
        [
          [3.43 + n * 0.28, 3.31, 1.13],
          [3.43 + n * 0.28, 2.79, 0.25],
          [2.16, 2.77 + n * 0.11, 0.19]
        ],
        1.4,
        n % 2 ? 'teal' : 'blue'
      );
    const [cx, cy] = H.p(8.56, 6.05, 0.2);
    for (let n = 0; n < 5; n++) {
      const a = (n * TAU) / 5;
      H.line(
        R,
        [
          [cx, cy - 12],
          [cx + Math.cos(a) * 19, cy + Math.sin(a) * 8]
        ],
        'teal',
        2
      );
    }
    metal(H, R, 8.45, 5.93, 0.14, 0.16, 0.15, 0.45, 'teal');
    cushion(H, R, 8.05, 5.7, 1.1, 1.0, 0.6, 0.15, 'blue');
    cushion(H, R, 8.04, 5.68, 1.1, 0.21, 0.75, 0.55, 'teal');
    rackFrame(H, R, 0.58, 7.06, 2.42, 3.6, 0.04, [0.16, 1.08, 2.0], 'sun', (i, j, w, d, z, row) => {
      for (let n = 0; n < 4; n++) boundBook(H, R, i + 0.14, j + 0.13 + n * 0.77, w - 0.28, 0.62, z + 0.13, row === 1 ? 'coral' : 'paper');
    });
    metal(H, R, 5.29, 9.35, 2.36, 1.79, 0.18, 0.73, 'blue');
    for (const i of [5.36, 7.51]) for (const j of [9.43, 11.01]) caster(H, R, i, j, 0.16, 0.14, 'blue');
    for(const i of [5.36,7.38]) for(const z of [0.24,0.75]) metal(H,R,i,11.15,0.2,0.05,z,0.13,'paper');
    for(const i of [5.7,6.92]) {
      metal(H,R,i,11.16,0.24,0.04,0.54,0.2,'sun');
      H.line(R,[H.p(i,11.19,0.64),H.p(i+0.24,11.19,0.64)],'blue',0.8);
    }
    bentTube(H,R,[[6.18,11.17,0.55],[6.18,11.32,0.55],[6.61,11.32,0.55],[6.61,11.17,0.55]],1.5,'paper');
    coiledLine(H, R, 6.24, 10.07, 0.96, 18, 'coral');
    benchFrame(H, R, 9.56, 8.84, 1.71, 2.04, 1.12, 'teal');
    timber(H,R,9.64,8.99,1.5,1.74,0.34,0.1,'sun');
    foldedCloth(H,R,9.82,9.11,0.97,0.92,0.47,'paper','coral');
    shallowTray(H,R,9.7,10.22,1.28,0.48,1.17,'sun');
    for(let n=0;n<3;n++) {
      const i=9.79+n*0.22;
      surface(H,R,[H.p(i,10.3,1.24),H.p(i+0.61,10.3,1.24),H.p(i+0.61,10.62,1.57),H.p(i,10.62,1.57)],n===1?'coral':'teal',0.45,1.1);
    }
    const [lx,ly]=H.p(10.12,9.45,1.2);
    stroke(H,R,[[lx-14,ly-12],[lx-14,ly+3],[lx+14,ly+3],[lx+14,ly-12]],'sun',2.3);
    surface(H,R,[[lx-11,ly-19],[lx+6,ly-25],[lx+17,ly-13],[lx,ly-7]],'blue',0.8);
    oval(H,R,lx+7,ly-17,9,8,'teal',0.7);
    oval(H,R,lx+8,ly-17,6,5,'paper',0.7);
    for(const dx of [-15,15]) H.line(R,[[lx+dx-3,ly-9],[lx+dx+3,ly-9]],'coral',1.5);
    satchel(H,R,3.53,8.21,0.04,'coral',0.8);
    boundBook(H, R, 9.76, 9.18, 1.1, 0.74, 0.49, 'paper');
    taskLight(H, R, 10.88, 9.12, 1.17, 'coral', -0.61);
    metal(H,R,0.31,0.55,0.21,10.88,3.8,0.14,'teal');
    for(const j of [1.16,3.77,7.04,10.7]) metal(H,R,0.3,j,0.38,0.09,3.71,0.3,'sun');
    metal(H,R,3.3,6.63,4.17,0.11,0.93,0.13,'blue');
    for(const i of [3.54,6.76]) {
      H.line(R,[H.p(i,6.77,0.98),H.p(i+0.51,6.77,0.98)],'paper',1.1);
      H.dot(...H.p(i+0.59,6.77,0.98),1.5,'sun');
    }
  },
  (H, R, t) => {
    const u = cycle(t, 12),
      light =
        u < 0.16
          ? 0
          : u < 0.34
            ? (1 - Math.cos(((u - 0.16) / 0.18) * Math.PI)) / 2
            : u < 0.66
              ? 1
              : u < 0.86
                ? (1 + Math.cos(((u - 0.66) / 0.2) * Math.PI)) / 2
                : 0;
    stage(H, R, light);
    H.at(8.62, 6.1, 0, (HH) =>
      actor(
        HH,
        R,
        8.62,
        6.1,
        t,
        'newYorkLightingCue',
        {
          face: 'nw',
          shirt: ['paper', 0.9],
          pants: ['blue', 0.7],
          hairStyle: 'bun',
          prop: (h, r, p) => {
            const [x, y] = p.farHand;
            shape(
              h,
              r,
              [
                [x - 4, y - 2],
                [x + 5, y],
                [x + 4, y + 3],
                [x - 5, y + 1]
              ],
              'coral',
              0.9,
              0.5
            );
            const [hx, hy] = p.head;
            stroke(
              h,
              r,
              [
                [hx - 9, hy],
                [hx - 7, hy - 9],
                [hx + 3, hy - 11],
                [hx + 7, hy - 5]
              ],
              'blue',
              2
            );
            oval(h, r, hx - 8, hy + 1, 3, 5, 'teal', 0.8);
            stroke(
              h,
              r,
              [
                [hx - 7, hy + 5],
                [hx - 13, hy + 12],
                [hx - 8, hy + 15]
              ],
              'blue',
              0.9
            );
          }
        },
        0,
        1.36
      )
    );
  }
);
room.loopSeconds = 12;
room.stillTime = 3.5;
export default room;
