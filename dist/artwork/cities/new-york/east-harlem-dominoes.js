import { benchFrame, bentTube, branchSpray, caneChair, metal, slattedSeat, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay } from '../structure.js';

import { boundBook, foldedCloth, shallowTray, slattedCrate, satchel } from '../furnishings.js';
import { TAU, actor, box, cycle, oval, shape, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, head: 15, lean: -5, al: 32, ar: 53, el: 63, er: 58 };
FIGURES.clips.newYorkDominoTest = {
  dur: 16,
  keys: [
    [0, seated],
    [0.14, seated],
    [0.31, { ...seated, ar: 79, er: 18, lean: -11, head: 22 }],
    [0.55, { ...seated, ar: 79, er: 18, lean: -11, head: 22 }],
    [0.68, { ...seated, ar: 64, er: 46, head: -5 }],
    [0.82, seated],
    [1, seated]
  ]
};
FIGURES.clips.newYorkDominoTap = {
  dur: 16,
  keys: [
    [0, { ...seated, al: 63, ar: 48, el: 27, er: 51 }],
    [0.44, { ...seated, al: 63, ar: 48, el: 27, er: 51 }],
    [0.52, { ...seated, al: 69, ar: 48, el: 20, er: 51 }],
    [0.57, { ...seated, al: 63, ar: 48, el: 27, er: 51 }],
    [0.63, { ...seated, al: 69, ar: 48, el: 20, er: 51 }],
    [0.71, { ...seated, al: 63, ar: 48, el: 27, er: 51 }],
    [1, { ...seated, al: 63, ar: 48, el: 27, er: 51 }]
  ]
};

function domino(H, R, i, j, a, b, turned = false) {
  const w = turned ? 0.28 : 0.56,
    d = turned ? 0.56 : 0.28;
  box(H, R, i, j, w, d, 1.11, 0.07, 'paper', 1);
  H.line(R, turned ? [H.p(i, j + 0.28, 1.19), H.p(i + 0.28, j + 0.28, 1.19)] : [H.p(i + 0.28, j, 1.19), H.p(i + 0.28, j + 0.28, 1.19)], 'blue', 0.6);
  for (const [half, number] of [
    [0, a],
    [1, b]
  ]) {
    for (let k = 0; k < number; k++) {
      const dx = 0.073 + (k % 2) * 0.125,
        dy = 0.061 + Math.floor(k / 2) * 0.072;
      H.dot(...H.p(i + dx + (turned ? 0 : half * 0.28), j + dy + (turned ? half * 0.28 : 0), 1.2), 0.72, 'blue', 0.95);
    }
  }
}

function chair(H, R, i, j, ink) {
  caneChair(H, R, i, j, ink);
}

function glass(H, R, i, j, z, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 5, y],
      [x + 5, y],
      [x + 6, y - 16],
      [x - 6, y - 16]
    ],
    'paper',
    1,
    0.65
  );
  shape(
    H,
    R,
    [
      [x - 4, y - 1],
      [x + 4, y - 1],
      [x + 5, y - 10],
      [x - 5, y - 10]
    ],
    ink,
    0.57,
    0.3
  );
  oval(H, R, x, y - 16, 6, 2.5, 'paper', 1);
  H.line(
    R,
    [
      [x + 1, y - 5],
      [x + 6, y - 25]
    ],
    'teal',
    0.9
  );
}

function gameTable(H, R) {
  for (const i of [4.72, 7.33])
    for (const j of [4.47, 7.13]) {
      const [x, y] = H.p(i, j, 0.02);
      surface(
        H,
        R,
        [
          [x - 4, y],
          [x + 4, y],
          [x + 2, y - 22],
          [x + 5, y - 33],
          [x + 3, y - 45],
          [x - 3, y - 45],
          [x - 5, y - 33],
          [x - 2, y - 22]
        ],
        'sun',
        0.53,
        0.9
      );
      metal(H, R, i - 0.08, j - 0.08, 0.16, 0.16, 0.02, 0.07, 'teal');
    }
  for (const j of [4.45, 7.14]) timber(H, R, 4.67, j, 2.87, 0.11, 0.78, 0.2, 'sun');
  for (const i of [4.66, 7.42]) timber(H, R, i, 4.47, 0.12, 2.75, 0.78, 0.2, 'sun');
  const top = [
    [4.39, 4.37],
    [4.56, 4.2],
    [7.59, 4.2],
    [7.82, 4.43],
    [7.82, 7.28],
    [7.6, 7.5],
    [4.58, 7.5],
    [4.39, 7.31]
  ].map(([i, j]) => H.p(i, j, 1.09));
  surface(H, R, top, 'sun', 0.48, 1.7);
  for(const j of [4.47,7.13]) {
    H.line(R,[H.p(4.73,j,0.28),H.p(7.3,j,0.28)],'teal',1.6);
    H.line(R,[H.p(4.73,j,0.3),H.p(6.03,j,0.78),H.p(7.3,j,0.3)],'blue',1.1);
  }
  for(const [i,j] of [[4.54,4.4],[7.56,4.4],[4.55,7.25],[7.58,7.23]]) oval(H,R,...H.p(i,j,1.12),5,2.5,'teal',0.25);
  surface(H, R, H.tile(4.62, 4.43, 2.99, 2.84, 1.107), 'teal', 0.22);
  for (const [i, j, a, b, turned] of [
    [4.94, 5.54, 3, 5, false],
    [5.55, 5.54, 5, 2, false],
    [6.16, 5.54, 2, 6, false],
    [6.77, 5.54, 6, 1, true],
    [6.77, 6.14, 1, 4, true],
    [6.16, 6.46, 4, 2, false],
    [5.55, 6.46, 2, 3, false]
  ])
    domino(H, R, i, j, a, b, turned);
  for (let n = 0; n < 4; n++)
    for (const j of [4.68, 7.0]) {
      timber(H, R, 4.91 + n * 0.39, j, 0.29, 0.13, 1.12, 0.29, 'paper');
      H.line(R, [H.p(4.91 + n * 0.39, j + 0.14, 1.27), H.p(5.2 + n * 0.39, j + 0.14, 1.27)], 'blue', 0.5);
    }
  for (const j of [4.74, 5.14, 5.54]) timber(H, R, 7.29, j, 0.13, 0.29, 1.12, 0.29, 'paper');
  glass(H, R, 7.34, 6.95, 1.12, 'sun');
  glass(H, R, 4.79, 4.9, 1.12, 'coral');
  boundBook(H, R, 6.61, 4.5, 0.69, 0.42, 1.13, 'paper');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(6.72 + n * 0.1, 4.58, 1.19), H.p(6.72 + n * 0.1, 4.83, 1.19)], 'blue', 0.5);
}

const room = world(
  'new-york-east-harlem-dominoes',
  'East Harlem · The Last Double',
  { floor: 'paper', tone: 1, wall: false, head: 110 },
  (H, R) => {
    for (let r = 0; r < 13; r++)
      for (let c = 0; c < 9; c++) surface(H, R, H.tile(c * 1.34, r * 0.92, 1.29, 0.87, 0.025), 'sun', (r + c) % 4 ? 0.08 : 0.2, 0.5);
    masonry(H, R, 'ne', 0.08, 11.84, 0, 3.83, 'coral', 0.36);
    masonry(H, R, 'nw', 0.08, 11.84, 0, 3.22, 'paper', 1);
    archedBay(H, R, 'ne', 1.0, 3.13, 1.25, 2.26, 'teal');
    archedBay(H, R, 'ne', 5.0, 3.12, 1.25, 2.26, 'teal');
    for(const j of [0.9,4.72]) {
      timber(H,R,0.42,j,1.37,1.9,0.05,0.16,'teal');
      surface(H,R,H.tile(0.53,j+0.11,1.15,1.67,0.22),'blue',0.7);
      for(const y of [j,j+1.8]) timber(H,R,0.43,y,1.35,0.1,0.15,0.46,'sun');
      for(const x of [0.43,1.68]) timber(H,R,x,j,0.1,1.9,0.15,0.46,'sun');
      for(let n=0;n<3;n++) branchSpray(H,R,...H.p(1.04,j+0.35+n*0.6,0.37),0.77+(n%2)*0.17,'teal');
    }
    for(const j of [0.3,6.91,11.43]) timber(H,R,0.14,j,0.19,0.19,0.05,3.48,'teal');
    timber(H,R,0.13,0.2,0.27,11.48,3.29,0.19,'sun');
    for(const i of [0.3,8.5,11.48]) timber(H,R,i,0.17,0.18,0.23,0.05,3.88,'teal');
    timber(H,R,0.15,0.15,11.59,0.27,3.73,0.15,'sun');
    for(const i of [1.0,7.82]) bentTube(H,R,[[i,0.23,3.69],[i,2.31,3.36],[i,2.31,2.93]],1.8,'teal');
    for(let n=0;n<9;n++) surface(H,R,[H.p(1+n*0.76,0.21,3.7),H.p(1.76+n*0.76,0.21,3.7),H.p(1.76+n*0.76,2.32,3.36),H.p(1+n*0.76,2.32,3.36)],n%2?'paper':'teal',n%2?1:0.3,0.5);
    for(let n=0;n<9;n++) surface(H,R,[H.p(1+n*0.76,2.32,3.36),H.p(1.76+n*0.76,2.32,3.36),H.p(1.72+n*0.76,2.32,3.16),H.p(1.38+n*0.76,2.32,3.09),H.p(1.04+n*0.76,2.32,3.16)],n%2?'paper':'teal',n%2?1:0.35,0.5);
    bentTube(H,R,[[0.38,6.79,1.17],[0.77,6.79,1.17],[0.77,6.79,0.95]],2.2,'teal');
    H.line(R,[H.p(0.58,6.67,1.23),H.p(0.58,6.92,1.23)],'coral',2);
    shallowTray(H,R,0.49,6.42,1.04,0.96,0.03,'teal');
    for (const i of [9.01, 11.36]) metal(H, R, i, 0.5, 0.1, 0.1, 0.04, 3.42, 'teal');
    bentTube(
      H,
      R,
      [
        [9.06, 0.55, 3.43],
        [11.41, 0.55, 3.43]
      ],
      2,
      'teal'
    );
    surface(H, R, H.faceI(9.12, 0.58, 2.2, 0.62, 3.23), 'sun', 0.32);
    for (let n = 0; n < 12; n++) H.line(R, [H.p(9.24 + n * 0.17, 0.6, 0.72), H.p(9.24 + n * 0.17, 0.6, 3.15)], 'teal', 0.8);
    timber(H,R,8.87,0.32,2.34,0.79,2.13,0.12,'sun');
    metal(H,R,9.16,0.43,1.26,0.49,2.26,0.7,'coral');
    surface(H,R,H.faceI(9.25,0.94,0.67,2.36,2.85),'blue',0.7);
    for(let n=0;n<6;n++) H.line(R,[H.p(9.3+n*0.1,0.95,2.4),H.p(9.3+n*0.1,0.95,2.8)],'paper',0.7);
    for(const z of [2.45,2.73]) oval(H,R,...H.p(10.15,0.96,z),3.5,3.5,'sun',0.8);
    H.line(R,[H.p(10.28,0.5,2.97),H.p(10.89,0.5,3.54)],'blue',1.2);
    slattedSeat(H, R, 8.67, 1.47, 2.73, 0.03, 'sun', 0.7);
    foldedCloth(H, R, 8.93, 1.65, 0.96, 0.54, 0.68, 'paper', 'teal');
    const [fx,fy]=H.p(10.58,1.84,1.44);
    metal(H,R,10.39,1.61,0.43,0.44,0.73,0.09,'teal');
    H.line(R,[H.p(10.61,1.83,0.8),[fx,fy+7]],'blue',3);
    oval(H,R,fx,fy,17,17,'paper',0.6);
    for(let n=0;n<8;n++) {
      const a=n*Math.PI/4;
      H.line(R,[[fx+Math.cos(a)*4,fy+Math.sin(a)*4],[fx+Math.cos(a)*16,fy+Math.sin(a)*16]],'teal',0.8);
    }
    for(const rad of [6,11,16]) H.line(R,Array.from({length:25},(_,n)=>[fx+Math.cos(n*Math.PI/12)*rad,fy+Math.sin(n*Math.PI/12)*rad]),'teal',0.65);
    H.dot(fx,fy,3,'sun');
    chair(H, R, 5.31, 3.03, 'sun');
    chair(H, R, 3.06, 5.16, 'teal');
    chair(H, R, 8.11, 5.68, 'sun');
    chair(H, R, 5.66, 8.03, 'coral');
    benchFrame(H, R, 0.72, 8.1, 2.02, 2.44, 1.0, 'teal');
    shallowTray(H, R, 0.87, 8.31, 1.6, 1.03, 1.05, 'sun');
    for (let n = 0; n < 3; n++) glass(H, R, 1.18 + n * 0.5, 8.76, 1.11, n % 2 ? 'sun' : 'coral');
    vessel(H, R, 1.82, 9.8, 1.05, 9, 19, 'teal');
    foldedCloth(H, R, 0.89, 9.52, 0.48, 0.74, 1.06, 'paper', 'coral');
    foldedCloth(H,R,0.93,8.38,1.43,0.76,0.39,'coral','paper');
    shallowTray(H,R,9.92,6.52,1.25,1.07,0.12,'sun');
    for(let n=0;n<6;n++) {
      const i=10.04+n%3*0.36,j=6.65+Math.floor(n/3)*0.38;
      timber(H,R,i,j,0.27,0.31,0.2,0.08,'paper');
      H.dot(...H.p(i+0.13,j+0.13,0.29),0.9,'blue');
    }
    for(let n=0;n<2;n++) {
      const j=3.02+n*0.63;
      for(const i of [10.37,11.02]) bentTube(H,R,[[i,j,0.07],[i-0.18,j,2.01],[i-0.18,j+0.16,2.01],[i,j+0.25,0.07]],1.7,'teal');
      surface(H,R,[H.p(10.18,j,1.96),H.p(10.85,j,1.96),H.p(10.94,j,1.28),H.p(10.25,j,1.28)],'sun',0.6);
      surface(H,R,H.faceI(10.3,j+0.07,0.68,0.35,1.15),'coral',0.43);
    }
    satchel(H,R,9.1,2.1,0.69,'coral',0.7);
    bentTube(H,R,[[8.72,6.81,0.04],[8.72,6.81,1.44],[8.63,6.81,1.59],[8.38,6.81,1.59]],2.1,'sun');
    timber(H, R, 9.97, 8.44, 1.33, 2.3, 0.02, 0.15, 'sun');
    for (const i of [10.06, 11.07]) for (const j of [8.53, 10.52]) timber(H, R, i, j, 0.13, 0.13, 0.03, 1.45, 'sun');
    for (const z of [0.43, 0.88, 1.4]) timber(H, R, 10.05, 8.51, 1.14, 2.09, z, 0.09, 'teal');
    for (let n = 0; n < 3; n++) vessel(H, R, 10.64, 8.88 + n * 0.58, 1.51, 6, 12, 'coral');
    for (let n = 0; n < 4; n++) boundBook(H, R, 10.21, 8.64 + n * 0.43, 0.79, 0.35, 0.99, 'paper');
    const cable = [];
    for (let n = 0; n <= 24; n++) {
      const a = n / 24;
      cable.push(H.p(0.3 + a * 10.5, 9.38 - a * 9.1, 3.2 - Math.sin(a * Math.PI) * 0.23));
    }
    H.line(R, cable, 'blue', 0.9);
    for (const [i, j] of [
      [0.29, 9.4],
      [10.8, 0.3]
    ])
      timber(H, R, i, j, 0.11, 0.11, 0.03, 3.24, 'teal');
    slattedCrate(H, R, 3.48, 10.56, 1.4, 0.87, 0.03, 0.51, 'sun');
    boundBook(H, R, 3.62, 10.69, 1.08, 0.59, 0.59, 'teal');
  },
  (H, R, t) => {
    H.at(5.78, 3.53, 0, (h) =>
      actor(h, R, 5.78, 3.53, t, 'newYorkDominoTap', { shirt: ['paper', 1], hairStyle: 'cap', face: 'se' }, 0.2, 1.27, 'elder')
    );
    H.at(3.53, 5.59, 0, (h) => actor(h, R, 3.53, 5.59, 0, 'sit', { shirt: ['coral', 0.69], hairStyle: 'curly', face: 'se' }, 0.2, 1.32));
    H.at(6.12, 6.88, 0, (h) => gameTable(h, R));
    H.at(8.58, 6.12, 0, (h) =>
      actor(
        h,
        R,
        8.58,
        6.12,
        t,
        'newYorkDominoTest',
        {
          shirt: ['teal', 0.73],
          hairStyle: 'bald',
          glasses: true,
          face: 'sw',
          prop(hh, rr, points) {
            const [x, y] = points.nearHand;
            shape(
              hh,
              rr,
              [
                [x - 10, y - 6],
                [x + 3, y - 4],
                [x + 3, y + 3],
                [x - 10, y + 1]
              ],
              'paper',
              1,
              0.6
            );
            hh.line(
              rr,
              [
                [x - 3.5, y - 5],
                [x - 3.5, y + 2]
              ],
              'blue',
              0.5
            );
            for (const dx of [-7, 0]) for (const dy of [-2.5, 0]) hh.dot(x + dx, y + dy, 0.65, 'blue', 0.9);
          }
        },
        0.2,
        1.32,
        'elder'
      )
    );
    H.at(6.09, 8.47, 0, (h) =>
      actor(
        h,
        R,
        6.09,
        8.47,
        0,
        'read',
        {
          shirt: ['sun', 0.8],
          hairStyle: 'bun',
          face: 'nw',
          prop(hh, rr, p) {
            const [x, y] = p.nearHand;
            shape(
              hh,
              rr,
              [
                [x - 4, y - 6],
                [x + 4, y - 5],
                [x + 4, y + 6],
                [x - 4, y + 5]
              ],
              'paper',
              1,
              0.55
            );
            hh.dot(x, y - 2, 1.2, 'blue', 0.85);
            hh.dot(x, y + 3, 1.2, 'blue', 0.85);
          }
        },
        0.2,
        1.26
      )
    );
    const u = cycle(t, 16);
    for (let k = 0; k < 9; k++) {
      const a = k / 8,
        i = 0.3 + a * 10.5,
        j = 9.38 - a * 9.1,
        z = 3.2 - Math.sin(a * Math.PI) * 0.23;
      const [x, y] = H.p(i, j, z);
      H.line(
        R,
        [
          [x, y],
          [x + Math.sin(u * TAU) * 0.7, y + 7]
        ],
        'blue',
        0.65
      );
      oval(H, R, x + Math.sin(u * TAU) * 0.7, y + 9, 2.8, 4, k % 3 ? 'sun' : 'coral', 0.85);
    }
  }
);

room.loopSeconds = 16;
room.stillTime = 0;
export default room;
