import { benchFrame, bentTube, caneChair, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay, cabinetFrame, rackFrame, boardFloor } from '../structure.js';
import { caster } from '../joinery.js';
import { boundBook, shallowTray, satchel } from '../furnishings.js';
import { actor, box, cycle, oval, shape, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const reading = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 15, al: 59, el: 40, ar: 72, er: 15 };
FIGURES.clips.newYorkMapTrace = {
  dur: 12,
  keys: [
    [0, reading],
    [0.17, reading],
    [0.38, { ...reading, ar: 92, er: -2, head: 8 }],
    [0.58, { ...reading, ar: 86, er: 15, head: 8 }],
    [0.71, { ...reading, ar: 47, er: 115, head: -9 }],
    [0.86, { ...reading, ar: 47, er: 115, head: -9 }],
    [1, reading]
  ]
};
FIGURES.clips.newYorkMapLibrarian = {
  dur: 12,
  keys: [
    [0, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: 10 }],
    [0.35, { ...rest, al: 52, el: 75, ar: 69, er: 30, head: 17 }],
    [0.6, { ...rest, al: 52, el: 75, ar: 69, er: 30, head: 17 }],
    [0.8, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: -4 }],
    [1, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: 10 }]
  ]
};

function cabinet(H, R, i, j, w, d, count = 7) {
  box(H, R, i, j, w, d, 0.05, 1.42, 'teal', 0.6);
  for (let q = 0; q < count; q++) {
    const z = 0.15 + (q * 1.15) / count;
    shape(H, R, H.faceI(i + 0.09, j + d + 0.02, w - 0.18, z, z + 1.08 / count), 'paper', 0.88, 0.55);
    for (const x of [i + w * 0.28, i + w * 0.72]) {
      H.line(R, [H.p(x - 0.16, j + d + 0.05, z + 0.08), H.p(x + 0.16, j + d + 0.05, z + 0.08)], 'blue', 1.4);
      H.dot(...H.p(x - 0.16, j + d + 0.05, z + 0.1), 0.9, 'sun');
      H.dot(...H.p(x + 0.16, j + d + 0.05, z + 0.1), 0.9, 'sun');
    }
    shape(H, R, H.faceI(i + w / 2 - 0.12, j + d + 0.06, 0.24, z + 0.025, z + 0.1), 'sun', 0.4, 0.4);
  }
  box(H, R, i - 0.04, j - 0.04, w + 0.08, d + 0.08, 1.46, 0.1, 'sun', 0.52);
  const z = 0.15 + (3 * 1.15) / count;
  metal(H, R, i + 0.12, j + d - 0.06, w - 0.24, 0.57, z, 0.055, 'teal');
  for (let n = 0; n < 3; n++) {
    const points = H.tile(i + 0.23 + n * 0.025, j + d + 0.05 + n * 0.018, w - 0.46, 0.39, z + 0.061 + n * 0.018);
    surface(H, R, points, 'paper', 1, 0.4);
    for (let k = 0; k < 4; k++)
      H.line(
        R,
        [H.p(i + 0.31 + (k * (w - 0.6)) / 4, j + d + 0.08, z + 0.12), H.p(i + 0.39 + (k * (w - 0.6)) / 4, j + d + 0.36, z + 0.12)],
        'teal',
        0.45
      );
  }
  timber(H, R, i + 0.08, j + d + 0.51, w - 0.16, 0.08, z - 0.005, 0.12, 'sun');
  for (const x of [i + w * 0.3, i + w * 0.7])
    bentTube(
      H,
      R,
      [
        [x - 0.1, j + d + 0.61, z + 0.025],
        [x - 0.1, j + d + 0.63, z + 0.08],
        [x + 0.1, j + d + 0.63, z + 0.08],
        [x + 0.1, j + d + 0.61, z + 0.025]
      ],
      0.8,
      'blue'
    );
}

function map(H, R) {
  const frame = H.tile(3.28, 4.03, 5.48, 3.69, 1.08);
  shape(H, R, frame, 'paper', 1);
  const water = [
    [3.48, 4.21],
    [4.34, 4.21],
    [5.05, 4.68],
    [5.25, 5.18],
    [6.62, 6.3],
    [7.85, 7.5],
    [6.98, 7.5],
    [5.88, 6.41],
    [4.64, 5.66],
    [4.38, 5.13]
  ].map(([i, j]) => H.p(i, j, 1.1));
  H.clip(frame, () => {
    shape(H, R, water, 'teal', 0.32, 0.65);
    for (let i = 3.5; i < 8.6; i += 0.35)
      for (let j = 4.23; j < 7.48; j += 0.28) {
        if ((i > 4.1 && i < 5.3 && j < 5.5) || (i > 5.1 && i < 7.35 && j > 5.5)) continue;
        shape(H, R, H.tile(i, j, 0.27, 0.2, 1.11), (Math.round(i * 10) + Math.round(j * 10)) % 7 === 0 ? 'teal' : 'sun', 0.18, 0.37);
      }
    for (const [i, j] of [
      [4.7, 5.28],
      [6.24, 6.15]
    ]) {
      H.line(R, [H.p(i - 0.42, j + 0.25, 1.12), H.p(i + 0.58, j - 0.3, 1.12)], 'blue', 2);
      H.line(R, [H.p(i - 0.42, j + 0.25, 1.12), H.p(i + 0.58, j - 0.3, 1.12)], 'paper', 0.9);
    }
    shape(H, R, H.tile(7.51, 4.27, 0.82, 0.63, 1.13), 'teal', 0.36, 0.45);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(3.65, 7.0 + n * 0.13, 1.12), H.p(4.83 - n * 0.16, 7.0 + n * 0.13, 1.12)], 'blue', 0.5);
  });
  for (const [i, j] of [
    [3.49, 4.3],
    [8.4, 4.25],
    [3.53, 7.45],
    [8.45, 7.45]
  ]) {
    oval(H, R, ...H.p(i, j, 1.15), 6, 3, 'blue', 0.58);
    H.line(R, [H.p(i - 0.12, j, 1.17), H.p(i + 0.12, j, 1.17)], 'paper', 0.75);
  }
}

const room = world(
  'new-york-map-room',
  'Midtown · Find Our Block',
  { floor: 'paper', tone: 1, wall: false, head: 110 },
  (H, R) => {
    H.opacity(0.38, () => boardFloor(H, R, 0.06, 0.05, 11.88, 11.89, 0.025, 'sun', 0.75));
    masonry(H, R, 'ne', 0.07, 11.84, 0, 4.25, 'paper', 1);
    masonry(H, R, 'nw', 0.07, 11.84, 0, 4.25, 'blue', 0.72);
    for (const j of [0.3, 3.0, 7.15, 11.5]) {
      timber(H, R, 0.1, j, 0.24, 0.3, 0.12, 4.08, 'sun');
      timber(H, R, 0.08, j - 0.07, 0.38, 0.44, 3.88, 0.21, 'paper');
    }
    timber(H, R, 0.05, 0.1, 0.42, 11.8, 4.07, 0.19, 'sun');
    timber(H, R, 0.08, 0.05, 11.8, 0.36, 4.07, 0.19, 'sun');
    for (const j of [3.46, 7.55]) {
      surface(H, R, H.faceJ(0.37, j, 3.15, 1.97, 3.77), 'sun', 0.65, 1.8);
      surface(H, R, H.faceJ(0.4, j + 0.13, 2.89, 2.1, 3.64), 'paper', 1);
      const P = (u, z) => H.p(0.43, j + u, z);
      if (j < 5) {
        surface(H,R,[P(0.24,2.23),P(0.81,2.25),P(1.2,2.65),P(1.45,2.74),P(1.88,3.22),P(2.8,3.49),P(2.8,3.6),P(1.67,3.44),P(1.27,3.01),P(0.97,2.91),P(0.59,2.49),P(0.24,2.47)],'teal',0.62);
        for(const [u,z,w,h] of [[0.25,2.64,0.58,0.29],[0.32,3.03,0.67,0.43],[1.14,2.25,0.39,0.28],[1.69,2.24,0.51,0.46],[2.3,2.35,0.49,0.45],[1.8,2.93,0.42,0.21]]) {
          surface(H,R,[P(u,z),P(u+w,z),P(u+w,z+h),P(u,z+h)],'sun',0.21,0.4);
          H.line(R,[P(u+w*0.5,z),P(u+w*0.5,z+h)],'coral',0.65);
        }
        H.line(R,[P(0.86,2.5),P(1.34,2.96)],'blue',2);
        H.line(R,[P(0.86,2.5),P(1.34,2.96)],'paper',0.8);
        surface(H,R,[P(2.24,3.16),P(2.41,3.34),P(2.58,3.21),P(2.42,3.02)],'coral',0.47);
      } else {
        for(let n=0;n<5;n++) {
          const points=Array.from({length:33},(_,k)=> {
            const a=k*Math.PI/16;
            return P(1.5+Math.cos(a)*(1.19-n*0.19)*(1+0.13*Math.sin(a*3)),2.89+Math.sin(a)*(0.62-n*0.09));
          });
          H.line(R,points,n===2?'coral':'teal',n===2?1.4:0.7);
        }
        H.line(R,[P(0.35,2.26),P(0.8,2.62),P(1.4,2.83),P(1.67,3.09),P(2.73,3.41)],'blue',1.3);
        const [cx,cy]=P(2.55,2.4);
        surface(H,R,[[cx,cy-9],[cx+3,cy],[cx,cy+9],[cx-3,cy]],'sun',0.8);
        H.line(R,[[cx-8,cy],[cx+8,cy]],'blue',0.7);
        surface(H,R,[P(0.26,3.42),P(0.63,3.42),P(0.63,3.58),P(0.26,3.58)],'paper',1);
        H.line(R,[P(0.26,3.47),P(0.6,3.5)],'sun',2);
      }
      for (const y of [j+0.25,j+2.87]) H.dot(...H.p(0.43,y,3.52),1.5,'blue');
    }
    archedBay(H, R, 'ne', 6.32, 4.83, 1.67, 2.28, 'teal', (P) => {
      for (let n = 0; n < 6; n++)
        surface(
          H,
          R,
          [P(0.13 + n * 0.8, 0.1), P(0.73 + n * 0.8, 0.1), P(0.73 + n * 0.8, 0.5 + (n % 3) * 0.18), P(0.13 + n * 0.8, 0.5 + (n % 3) * 0.18)],
          'coral',
          0.24,
          0.4
        );
    });
    cabinetFrame(H, R, 0.45, 0.48, 5.27, 1.57, 0.04, 3.54, 3, 'teal', (i, j, w, d, z, h, col) => {
      for (let row = 0; row < 4; row++) {
        const level = z + row * 0.81;
        timber(H, R, i, j, w, d, level, 0.08, 'teal');
        if ((row + col) % 3 === 0) {
          for(let n=0;n<3;n++) boundBook(H,R,i+0.1+n*0.025,j+0.1+n*0.025,w-0.3-n*0.09,0.77,level+0.12+n*0.14,['coral','paper','teal'][n]);
          surface(H,R,H.tile(i+0.31,j+0.17,0.18,0.83,level+0.55),'sun',0.63,0.4);
        } else if ((row + col) % 3 === 1) {
          for(let n=0;n<5;n++) {
            const x=i+0.11+n*0.23,height=0.45+(n%3)*0.07;
            metal(H,R,x,j+0.23,0.17,0.92,level+0.1,height,['paper','teal','coral','paper','blue'][n]);
            H.line(R,[H.p(x+0.02,j+1.17,level+0.18),H.p(x+0.15,j+1.17,level+0.18)],'sun',1);
          }
          H.line(R,[H.p(i+0.1,j+1.17,level+0.12),H.p(i+0.1,j+1.17,level+0.59)],'sun',1.7);
        } else {
          shallowTray(H,R,i+0.13,j+0.12,w-0.25,1.03,level+0.11,'sun');
          for(let n=0;n<3;n++) {
            const [x,y]=H.p(i+0.37+n*0.38,j+0.93,level+0.28);
            H.line(R,[[x,y],[x+24,y-12]],'paper',5);
            oval(H,R,x,y,3.6,2.5,'paper',1);
            oval(H,R,x,y,1.6,1.1,'teal',0.65);
          }
        }
      }
    });
    for (let n = 0; n < 2; n++) {
      const j = 3.43 + n * 3.92;
      cabinet(H, R, 0.43, j, 2.22, 3.48, 8);
      for (let k = 0; k < (n ? 1 : 2); k++) {
        const y = j + 0.34 + k * 0.74;
        surface(H, R, H.tile(0.7, y, 1.36, 0.57, 1.59), 'paper', 1, 0.45);
        for (let q = 0; q < 3; q++) H.line(R, [H.p(0.79, y + 0.13 + q * 0.1, 1.61), H.p(1.91 - q * 0.13, y + 0.13 + q * 0.1, 1.61)], 'teal', 0.55);
      }
    }
    H.tint(H.tile(0.43,3.43,2.22,7.41,1.58),'blue',0.11);
    surface(H,R,[H.p(0.75,8.65,1.61),H.p(1.4,8.65,1.87),H.p(1.4,10.02,1.87),H.p(0.75,10.02,1.61)],'paper',1);
    surface(H,R,[H.p(1.4,8.65,1.87),H.p(2.13,8.65,1.61),H.p(2.13,10.02,1.61),H.p(1.4,10.02,1.87)],'paper',1);
    for(let n=0;n<5;n++) H.line(R,[H.p(0.91,8.81+n*0.2,1.69),H.p(1.31,8.81+n*0.2,1.86)],'teal',0.7);
    surface(H,R,H.tile(1.72,9.03,0.18,0.62,1.7),'coral',0.7);
    H.line(R,[H.p(0.56,6.43,1.59),H.p(1.26,6.61,1.59),H.p(1.58,6.49,1.59)],'paper',2);
    for (const i of [3.39, 8.69])
      for (const j of [4.18, 7.72]) {
        timber(H, R, i, j, 0.18, 0.2, 0.03, 0.95, 'sun');
        timber(H, R, i - 0.07, j - 0.07, 0.32, 0.34, 0.04, 0.13, 'teal');
      }
    for (const j of [4.22, 7.76]) timber(H, R, 3.39, j, 5.49, 0.12, 0.43, 0.14, 'sun');
    timber(H, R, 3.19, 4.0, 5.77, 3.94, 0.97, 0.14, 'sun');
    for (const i of [3.42, 8.56]) {
      timber(H, R, i, 4.24, 0.17, 3.44, 0.77, 0.18, 'teal');
      H.line(R,[H.p(i,4.3,0.4),H.p(i,5.6,0.83),H.p(i,7.5,0.4)],'blue',2);
    }
    for (let n=0;n<3;n++) {
      surface(H, R, H.faceI(3.64+n*1.62,7.96,1.42,0.67,0.94),'sun',0.54);
      bentTube(H,R,[[4.1+n*1.62,7.99,0.78],[4.1+n*1.62,8.07,0.78],[4.62+n*1.62,8.07,0.78],[4.62+n*1.62,7.99,0.78]],1.1,'blue');
    }
    H.tint(H.faceI(3.19,7.94,5.77,0.02,0.96),'blue',0.17);
    map(H, R);
    H.clip(H.tile(3.28,4.03,5.48,3.69,1.13),()=> {
      const [lx,ly]=H.p(6.93,6.46,1.13);
      H.light(lx,ly,98,44,0.13);
      H.glow(lx,ly,92,40,'sun',0.08);
    });
    shallowTray(H,R,6.82,4.06,1.7,0.42,1.14,'teal');
    for(let n=0;n<3;n++) H.line(R,[H.p(6.96,4.18+n*0.09,1.3),H.p(8.27,4.18+n*0.09,1.3)],n===1?'coral':'sun',1.5);
    H.tint(H.tile(4.02,5.52,1.18,1.07,1.145),'paper',0.23);
    H.outline(R,H.tile(4.02,5.52,1.18,1.07,1.145),'teal',0.5);
    H.line(R,[H.p(4.1,5.7,1.15),H.p(4.87,6.32,1.15)],'coral',0.7);
    const [mx,my]=H.p(7.89,6.64,1.15);
    oval(H,R,mx,my,10,5,'teal',0.18);
    H.line(R,[[mx+8,my+3],[mx+20,my+10]],'sun',3);

    for (const i of [3.4, 8.73]) {
      bentTube(
        H,
        R,
        [
          [i, 4.3, 1.14],
          [i, 4.3, 1.92],
          [i + 0.08, 5.38, 2.04]
        ],
        2.2,
        'teal'
      );
      const [x, y] = H.p(i + 0.08, 5.38, 2.04);
      surface(
        H,
        R,
        [
          [x - 14, y],
          [x + 14, y],
          [x + 9, y - 8],
          [x - 8, y - 9]
        ],
        'teal',
        0.68
      );
      H.line(
        R,
        [
          [x - 12, y + 1],
          [x + 12, y + 1]
        ],
        'sun',
        2
      );
    }
    cabinetFrame(H, R, 9.87, 1.18, 1.52, 2.54, 0.03, 1.6, 1, 'teal', (i, j, w, d, z, h) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 0.46, 0.06, 'sun');
        for (let n = 0; n < 3; n++) boundBook(H, R, i + 0.08, j + 0.08 + n * 0.65, w - 0.16, 0.55, z + 0.1 + row * 0.46, 'paper');
      }
    });
    caneChair(H, R, 7.49, 8.39, 'sun');
    rackFrame(H, R, 9.54, 7.72, 1.59, 3.12, 0.21, [0, 0.87, 1.74], 'teal', (i, j, w, d, z, row) => {
      if(row===0) {
        for(let n=0;n<3;n++) boundBook(H,R,i+0.12+n*0.025,j+0.3,w-0.2,1.12,z+0.08+n*0.12,['teal','paper','sun'][n]);
        shallowTray(H,R,i+0.12,j+1.72,w-0.24,0.98,z+0.06,'sun');
        surface(H,R,H.tile(i+0.23,j+1.84,w-0.46,0.75,z+0.23),'paper',1);
        H.line(R,[H.p(i+0.3,j+2.02,z+0.24),H.p(i+w-0.3,j+2.37,z+0.24)],'teal',1.1);
      } else if(row===1) {
        for(let n=0;n<3;n++) boundBook(H,R,i+0.09+n*0.03,j+0.42,w-0.22-n*0.09,1.81,z+0.1+n*0.14,['coral','blue','paper'][n]);
        surface(H,R,H.faceI(i+0.49,j+2.24,0.27,z+0.1,z+0.22),'paper',1,0.3);
        for(let n=0;n<4;n++) H.line(R,[H.p(i+0.43+n*0.1,j+2.25,z+0.08),H.p(i+0.46+n*0.1,j+2.25,z+0.24)],'sun',0.6);
      } else {
        const paper=[H.p(i+0.09,j+0.22,z+0.12),H.p(i+w-0.08,j+0.22,z+0.12),H.p(i+w-0.08,j+2.75,z+0.12),H.p(i+0.09,j+2.75,z+0.12)];
        surface(H,R,paper,'paper',1);
        H.line(R,[H.p(i+0.13,j+1.01,z+0.13),H.p(i+w-0.13,j+1.01,z+0.13)],'blue',0.6);
        H.line(R,[H.p(i+0.13,j+1.93,z+0.13),H.p(i+w-0.13,j+1.93,z+0.13)],'blue',0.6);
        surface(H,R,[H.p(i+0.3,j+0.38,z+0.14),H.p(i+0.61,j+0.42,z+0.14),H.p(i+0.81,j+1.7,z+0.14),H.p(i+0.62,j+2.57,z+0.14),H.p(i+0.4,j+2.49,z+0.14),H.p(i+0.56,j+1.65,z+0.14)],'teal',0.45);
        for(let n=0;n<7;n++) H.line(R,[H.p(i+0.15,j+0.47+n*0.31,z+0.15),H.p(i+w-0.17,j+0.47+n*0.31,z+0.15)],'sun',0.7);
        for(const y of [j+0.38,j+2.59]) oval(H,R,...H.p(i+w-0.21,y,z+0.16),4,2,'blue',0.7);
        surface(H,R,[H.p(i+w-0.31,j+2.47,z+0.15),H.p(i+w-0.08,j+2.47,z+0.29),H.p(i+w-0.08,j+2.75,z+0.15)],'paper',1);
      }
    });
    for (const i of [9.54, 11.13]) for (const j of [7.72, 10.84]) caster(H, R, i, j, 0.18, 0.14, 'blue');
    benchFrame(H, R, 4.24, 10.04, 2.05, 1.1, 0.8, 'sun');
    boundBook(H, R, 4.39, 10.21, 1.66, 0.68, 0.84, 'paper');
    vessel(H, R, 3.32, 9.07, 0.03, 11, 19, 'teal');
    for (let n = 0; n < 6; n++) {
      const i = 3.03 + n * 0.12;
      bentTube(
        H,
        R,
        [
          [i, 9.07, 0.35],
          [i, 9.07, 1.35 + (n % 3) * 0.16]
        ],
        4,
        'paper'
      );
      H.line(R, [H.p(i, 9.08, 1.11), H.p(i, 9.08, 1.17)], 'coral', 1.3);
    }
    benchFrame(H,R,8.07,0.77,1.33,1.12,0.71,'sun');
    const [gx,gy]=H.p(8.72,1.31,1.45);
    oval(H,R,gx,gy,24,24,'teal',0.36);
    H.line(R,Array.from({length:33},(_,n)=>[gx+Math.cos(n*Math.PI/16)*27,gy+Math.sin(n*Math.PI/16)*27]),'sun',2);
    H.line(R,[[gx-18,gy-13],[gx+20,gy+14]],'blue',0.8);
    H.line(R,[[gx-21,gy+6],[gx+17,gy-11]],'paper',1.2);
    surface(H,R,[[gx-14,gy-17],[gx-4,gy-18],[gx+1,gy-9],[gx-6,gy+1],[gx-4,gy+13],[gx-12,gy+7]],'sun',0.8);
    bentTube(H,R,[[8.72,1.31,0.86],[8.72,1.31,1.0]],3,'teal');
    satchel(H,R,6.55,10.47,0.05,'coral',0.83);
    shallowTray(H,R,4.36,10.2,1.66,0.68,0.92,'sun');
    for(const [i,j] of [[4.49,10.28],[5.16,10.3]]) {
      surface(H,R,[H.p(i,j,1.02),H.p(i+0.56,j,1.12),H.p(i+0.56,j+0.46,1.12),H.p(i,j+0.46,1.02)],'paper',1);
      for(let n=0;n<3;n++) H.line(R,[H.p(i+0.08,j+0.1+n*0.12,1.09),H.p(i+0.46,j+0.1+n*0.12,1.14)],'teal',0.7);
    }
    pendant(H, R, 6.17, 5.73, 4.35, 3.22, 'paper', 1.12);
  },
  (H, R, t) => {
    const u = cycle(t, 12);
    H.at(7.94, 8.71, 0, (HH) =>
      actor(
        HH,
        R,
        7.94,
        8.71,
        t,
        'newYorkMapTrace',
        {
          face: 'nw',
          shirt: ['coral', 0.65],
          hairStyle: 'pony',
          pants: ['blue', 0.64],
          prop: (h, r, p) => {
            const [x, y] = p.farHand;
            const lift =
              u < 0.6
                ? 0
                : u < 0.71
                  ? (1 - Math.cos(((u - 0.6) / 0.11) * Math.PI)) / 2
                  : u < 0.86
                    ? 1
                    : (1 + Math.cos(((u - 0.86) / 0.14) * Math.PI)) / 2;
            const tip = [x - 25 + lift * 16, y - 3 - lift * 11];
            h.line(r, [[x + 3, y + 2], tip], 'sun', 2.1);
            h.dot(...tip, 1.1, 'blue');
          }
        },
        0,
        1.4
      )
    );
    H.at(9.45, 4.39, 0, (HH) =>
      actor(
        HH,
        R,
        9.45,
        4.39,
        t,
        'newYorkMapLibrarian',
        {
          face: 'sw',
          shirt: ['teal', 0.72],
          hairStyle: 'short',
          glasses: true,
          skin: ['coral', 0.45],
          prop: (h, r, p) => {
            const [x, y] = p.farHand;
            shape(
              h,
              r,
              [
                [x - 5, y - 10],
                [x + 13, y - 7],
                [x + 11, y + 9],
                [x - 7, y + 6]
              ],
              'paper',
              1,
              0.6
            );
            for (let q = 0; q < 3; q++)
              h.line(
                r,
                [
                  [x - 2, y - 5 + q * 4],
                  [x + 8, y - 3 + q * 4]
                ],
                'blue',
                0.5
              );
          }
        },
        0,
        1.33
      )
    );
  }
);
room.loopSeconds = 12;
room.stillTime = 0;
export default room;
