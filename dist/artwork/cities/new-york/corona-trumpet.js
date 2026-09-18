import {
  benchFrame,
  bentTube,
  branchSpray,
  caneChair,
  cushion,
  floorLight,
  metal,
  pendant,
  slattedSeat,
  surface,
  timber,
  vessel
} from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { taskLight, windowBay } from '../joinery.js';
import { boundBook, foldedCloth, shallowTray, satchel } from '../furnishings.js';
import { actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const lowered = { ...rest, al: 40, ar: 40, el: 100, er: 95, head: 7 };
const playing = { ...rest, al: 115, ar: 91, el: 50, er: 81, head: -3, lean: -2 };
FIGURES.clips.newYorkTrumpetPhrase = {
  dur: 12,
  keys: [
    [0, lowered],
    [0.12, lowered],
    [0.28, playing],
    [0.4, { ...playing, al: 113, head: -5 }],
    [0.53, playing],
    [0.67, { ...playing, ar: 93, head: -1 }],
    [0.8, playing],
    [0.91, lowered],
    [1, lowered]
  ]
};

function trumpet(H, R, hand, raised, t) {
  const [x, y] = hand,
    angle = -0.12 + (1 - raised) * 0.72;
  const p = (a, b) => [x + a * Math.cos(angle) - b * Math.sin(angle), y + a * Math.sin(angle) + b * Math.cos(angle)];
  stroke(H, R, [p(-6, -2), p(19, -2), p(29, -5)], 'sun', 3.6);
  stroke(H, R, [p(24, 0), p(19, 8), p(1, 8), p(-1, 2), p(2, 0), p(18, 0)], 'sun', 3.2);
  stroke(H, R, [p(24, 0), p(19, 8), p(1, 8)], 'blue', 0.55);
  shape(H, R, [p(22, -4), p(36, -10), p(36, 4), p(22, 0)], 'sun', 0.9, 0.65);
  const rim = ell(0, 0, 2.6, 7, 20).map(([a, b]) => p(36 + a, b - 3));
  shape(H, R, rim, 'coral', 0.65, 0.7);
  for (let q = 0; q < 3; q++) {
    const press = raised > 0.8 ? Math.max(0, Math.sin(t * 5 + q * 2)) * 1.6 : 0;
    stroke(H, R, [p(4 + q * 5, 5), p(4 + q * 5, -5 + press)], 'sun', 2.2);
    H.line(R, [p(1 + q * 5, -6 + press), p(7 + q * 5, -6 + press)], 'blue', 1.1);
  }
  H.line(R, [p(-10, -2), p(-5, -2)], 'blue', 1.6);
  H.line(R, [p(-4, -3), p(19, -3), p(29, -6)], 'paper', 0.8);
  for (let n = 0; n < 3; n++) {
    const a = 4 + n * 5;
    H.line(R, [p(a - 2, 2), p(a - 2, 8), p(a + 2, 8)], 'blue', 0.5);
    H.line(R, [p(a - 2, 2), p(a + 2, 2)], 'paper', 0.8);
  }
  H.line(R, [p(7, 8), p(7, 12), p(16, 12), p(16, 8)], 'sun', 1.1);
  const inner = ell(0, 0, 1.3, 4.6, 20).map(([a, b]) => p(36 + a, b - 3));
  surface(H, R, inner, 'blue', 0.65, 0.4);
}

const room = world(
  'new-york-corona-trumpet',
  'Corona · A Phrase for the Window',
  { floor: 'paper', tone: 1, wall: false, head: 105 },
  (H, R) => {
    boardFloor(H, R, 0.05, 0.07, 11.91, 11.86, 0.025, 'sun', 0.42);
    masonry(H, R, 'ne', 0.08, 11.84, 0, 4.07, 'paper', 1);
    surface(H, R, H.faceJ(0.13, 0.13, 11.74, 0, 4.07), 'teal', 0.18);
    const bay = [H.p(5.36, 0.18, 1.25), H.p(10.86, 0.18, 1.25), H.p(10.86, 0.18, 3.56), H.p(8.11, 0.18, 3.88), H.p(5.36, 0.18, 3.56)];
    surface(H, R, bay, 'blue', 0.62);
    for (let n = 0; n < 3; n++)
      windowBay(H, R, 'ne', 5.46 + n * 1.8, 1.68, 1.42, 2.06, {
        ink: 'sun',
        divisions: 1,
        view: (P) => {
          for (let k = 0; k < 4; k++) H.line(R, [P(0.2 + k * 0.41, 0.1), P(0.2 + k * 0.41, 0.58 + (k % 2) * 0.31)], 'coral', 7);
        }
      });
    for(const i of [5.17,10.96]) {
      timber(H,R,i,0.29,0.19,0.31,1.13,2.56,'sun');
      const [x,y]=H.p(i+0.08,0.45,3.53);
      const [a,b]=H.p(i+0.08,0.48,1.13);
      surface(H,R,[[x-7,y],[x+8,y],[a+11,b],[a-8,b]],'paper',1);
      for(let n=0;n<3;n++) H.line(R,[[x-5+n*5,y+3],[a-5+n*6,b-3]],'coral',0.7);
      H.line(R,[[a-7,b-16],[a+9,b-16]],'teal',1.1);
    }
    timber(H,R,0.2,0.22,0.17,11.57,3.89,0.14,'sun');
    timber(H,R,0.2,0.22,0.17,11.57,0.1,0.18,'sun');
    for(const j of [1.02,3.34,5.66]) {
      surface(H,R,H.faceJ(0.35,j,1.63,2.02,3.24),'sun',0.7);
      surface(H,R,H.faceJ(0.38,j+0.13,1.37,2.15,3.11),'paper',1);
      surface(H,R,H.faceJ(0.39,j+0.25,0.48,2.26,2.83),'coral',0.65);
      const [x,y]=H.p(0.4,j+1.04,2.72);
      oval(H,R,x,y,5,7,'teal',0.7);
      H.line(R,[H.p(0.4,j+0.23,2.28),H.p(0.4,j+1.38,2.28)],'blue',0.8);
    }
    cabinetFrame(H,R,2.94,0.44,2.01,1.24,0.04,3.4,1,'teal',(i,j,w,d,z)=>{
      for(const h of [0.15,1.05,2.04,2.88]) timber(H,R,i,j,w,d,z+h,0.1,'sun');
      for(let n=0;n<7;n++) {
        const x=i+0.16+n*0.22,h=0.57+(n%3)*0.11;
        timber(H,R,x,j+0.16,0.14,d-0.26,z+0.25,h,n%3===0?'coral':n%3===1?'paper':'blue');
        H.line(R,[H.p(x+0.03,j+d-0.08,z+0.43),H.p(x+0.11,j+d-0.08,z+0.43)],'sun',0.7);
      }
      for(let n=0;n<3;n++) boundBook(H,R,i+0.13+n*0.04,j+0.21,1.13,0.76,z+1.17+n*0.1,n===1?'paper':'coral');
      const [fx,fy]=H.p(i+1.42,j+0.74,z+1.18);
      surface(H,R,[[fx-8,fy],[fx+7,fy+3],[fx+7,fy-17],[fx-8,fy-20]],'sun',0.65);
      surface(H,R,[[fx-5,fy-3],[fx+4,fy-1],[fx+4,fy-14],[fx-5,fy-16]],'paper',1);
      oval(H,R,fx-1,fy-11,2.5,3,'coral',0.6);
      H.line(R,[[fx-4,fy-4],[fx+2,fy-6]],'teal',2.2);
      metal(H,R,i+0.18,j+0.21,1.39,0.72,z+2.17,0.39,'sun');
      const [rx,ry]=H.p(i+0.61,j+0.95,z+2.39);
      H.outline(R,ell(rx,ry,8,8),'blue',1.1);
      for(let n=-2;n<=2;n++) H.line(R,[[rx-5,ry+n*2],[rx+5,ry+n*2]],'teal',0.7);
      oval(H,R,rx+15,ry+3,3,3,'paper',1);
      bentTube(H,R,[[i+1.32,j+0.25,z+2.55],[i+1.32,j+0.25,z+2.78]],0.9,'blue');
      foldedCloth(H,R,i+0.18,j+0.14,1.39,0.92,z+2.99,'paper','coral');
    });
    const [cx2,cy2]=H.p(1.83,0.3,3.18);
    oval(H,R,cx2,cy2,15,16,'sun',0.65);
    oval(H,R,cx2,cy2,11,12,'paper',1);
    H.line(R,[[cx2,cy2-8],[cx2,cy2],[cx2+6,cy2+3]],'blue',1);
    for(const [dx,dy] of [[0,-10],[9,0],[0,10],[-9,0]]) H.dot(cx2+dx,cy2+dy,1,'coral');
    cabinetFrame(H, R, 5.34, 0.41, 5.57, 1.39, 0.03, 1.02, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 4; k++) boundBook(H, R, i + 0.14, j + 0.1 + k * 0.25, w - 0.28, 0.2, z + 0.11, n % 2 ? 'coral' : 'teal');
    });
    for(const n of [0,2]) {
      const i=5.6+n*1.79;
      surface(H,R,H.faceI(i,1.84,1.38,0.26,0.79),'teal',0.65);
      H.line(R,[H.p(i+0.48,1.87,0.57),H.p(i+0.87,1.87,0.57)],'paper',1.5);
    }
    cushion(H, R, 5.4, 0.46, 5.42, 1.29, 1.08, 0.14, 'coral');
    for(const i of [7.16,8.95]) H.line(R,[H.p(i,0.5,1.23),H.p(i,1.7,1.23)],'paper',0.8);
    cushion(H,R,5.7,0.59,0.87,0.67,1.23,0.22,'paper');
    cushion(H,R,9.64,0.59,0.87,0.67,1.23,0.22,'teal');
    foldedCloth(H,R,7.7,1.02,0.96,0.56,1.24,'sun','coral');
    boundBook(H,R,6.87,0.83,0.76,0.58,1.24,'paper');
    H.line(R,[H.p(7.08,0.85,1.29),H.p(7.5,1.3,1.29)],'coral',1);
    const [wx,wy]=H.p(8.96,1.29,1.26);
    surface(H,R,ell(wx,wy,7,3),'sun',0.45);
    vessel(H,R,8.96,1.29,1.27,4,9,'paper');
    timber(H,R,5.22,0.14,5.87,0.28,3.79,0.16,'sun');
    for(let n=0;n<8;n++) {
      const j=0.49+n*1.36;
      H.outline(R,H.faceJ(0.24,j,1.13,0.35,1.25),'sun',0.75);
    }
    timber(H,R,0.23,0.24,0.14,11.56,1.38,0.11,'sun');
    cabinetFrame(H, R, 0.49, 1.0, 2.15, 2.87, 0.03, 1.28, 1, 'sun', (i, j, w, d, z, h) => {
      for (let n = 0; n < 9; n++) timber(H, R, i + 0.12 + n * 0.19, j + 0.14, 0.13, d - 0.28, z, 0.86, n % 3 ? 'blue' : 'coral');
    });
    metal(H, R, 0.68, 1.18, 1.75, 1.45, 1.33, 0.11, 'teal');
    surface(H, R, ell(...H.p(1.52, 1.93, 1.47), 17, 7), 'blue', 0.9);
    surface(H, R, ell(...H.p(1.52, 1.93, 1.48), 5, 2.2), 'coral', 0.78);
    bentTube(
      H,
      R,
      [
        [2.12, 1.36, 1.5],
        [1.93, 2.0, 1.5],
        [1.67, 2.25, 1.5]
      ],
      1.4,
      'paper'
    );
    for(let n=0;n<8;n++) {
      const j=4.47+n*0.28;
      metal(H,R,0.47,j,0.62,0.19,0.17,0.89,'paper');
      bentTube(H,R,[[0.64,j,0.28],[0.64,j,0.93],[0.91,j,0.93],[0.91,j,0.28]],1,'teal');
    }
    bentTube(H,R,[[0.48,4.34,0.3],[0.48,6.7,0.3],[0.48,6.7,0.07]],1.8,'teal');
    const [vx,vy]=H.p(0.48,4.37,0.74);
    H.outline(R,ell(vx,vy,4,4),'coral',1.4);
    cabinetFrame(H,R,9.55,3.04,1.77,2.51,0.04,1.34,1,'teal',(i,j,w,d,z)=>{
      foldedCloth(H,R,i+0.1,j+0.15,w-0.2,d-0.3,z+0.12,'paper','sun');
      boundBook(H,R,i+0.15,j+0.3,w-0.3,0.81,z+0.25,'coral');
    });
    shallowTray(H,R,9.68,3.24,1.48,1.02,1.39,'sun');
    for(let n=0;n<3;n++) {
      const [x,y]=H.p(9.98+n*0.37,3.77,1.46);
      H.line(R,[[x,y],[x,y-7]],'sun',2.2);
      oval(H,R,x,y-8,4,2,'paper',1);
    }
    vessel(H,R,10.75,4.77,1.4,4,12,'coral');
    metal(H,R,10.67,4.69,0.18,0.15,1.81,0.1,'blue');
    const [ox,oy]=H.p(10.83,4.76,1.44);
    stroke(H,R,[[ox-22,oy+7],[ox-29,oy],[ox-27,oy-9],[ox-17,oy-12],[ox-11,oy-7],[ox-16,oy-1]],'blue',1.1);
    for(const [dx,dy] of [[-22,7],[-16,-1]]) for(let n=-2;n<=2;n++) H.line(R,[[ox+dx-3,oy+dy+n*1.3],[ox+dx+3,oy+dy+n*1.3]],'teal',0.7);
    const [tx2,ty2]=H.p(10.14,4.84,1.45);
    surface(H,R,[[tx2-8,ty2+4],[tx2+8,ty2+4],[tx2+3,ty2-17],[tx2-2,ty2-17]],'sun',0.7);
    oval(H,R,tx2,ty2+4,8,3,'coral',0.5);
    H.line(R,[[tx2-1,ty2-15],[tx2-4,ty2+1]],'paper',0.9);
    taskLight(H,R,11.05,3.16,1.42,'sun',-0.8);
    foldedCloth(H,R,9.76,4.5,0.66,0.77,1.4,'paper','teal');
    surface(H,R,[H.p(0.7,1.15,1.46),H.p(2.4,1.15,1.46),H.p(2.4,0.92,2.21),H.p(0.7,0.92,2.21)],'teal',0.29,1);
    for(const j of [1.36,3.12]) {
      metal(H,R,0.65,j,0.68,0.56,1.44,0.58,'blue');
      const [x,y]=H.p(1.35,j+0.28,1.76);
      oval(H,R,x,y,5,7,'teal',0.7);
      oval(H,R,x,y,2,3,'sun',0.8);
    }
    surface(H, R, H.tile(2.94, 4.47, 4.42, 4.63, 0.037), 'coral', 0.26);
    for (let n = 0; n < 16; n++) H.line(R, [H.p(3.07 + n * 0.26, 8.95, 0.04), H.p(3.07 + n * 0.26, 9.21, 0.04)], 'sun', 1);
    const [mx, my] = H.p(6.39, 5.67, 0.04);
    for (const [dx, dy] of [
      [-19, 4],
      [19, 4],
      [0, -12]
    ])
      H.line(
        R,
        [
          [mx, my - 13],
          [mx + dx, my + dy]
        ],
        'teal',
        2
      );
    H.line(
      R,
      [
        [mx, my - 12],
        [mx, my - 64]
      ],
      'teal',
      2.3
    );
    surface(
      H,
      R,
      [
        [mx - 25, my - 64],
        [mx + 24, my - 57],
        [mx + 26, my - 93],
        [mx - 22, my - 99]
      ],
      'teal',
      0.68
    );
    surface(
      H,
      R,
      [
        [mx - 20, my - 67],
        [mx + 18, my - 62],
        [mx + 20, my - 88],
        [mx - 18, my - 93]
      ],
      'paper',
      1
    );
    for (let n = 0; n < 5; n++)
      H.line(
        R,
        [
          [mx - 15, my - 86 + n * 4],
          [mx + 15, my - 81 + n * 4]
        ],
        'blue',
        0.55
      );
    for (let n = 0; n < 8; n++) H.dot(mx - 12 + n * 3.5, my - 75 + (n % 3) * 3, 1.1, 'blue', 0.8);
    caneChair(H, R, 3.94, 6.08, 'sun');
    cushion(H,R,3.96,6.11,1.05,0.89,0.72,0.15,'teal');
    foldedCloth(H,R,3.99,6.15,0.27,0.63,1.24,'paper','coral');
    const [jx,jy]=H.p(3.99,6.73,1.23);
    surface(H,R,[[jx-4,jy],[jx+5,jy+2],[jx+8,jy+18],[jx+3,jy+30],[jx-7,jy+28],[jx-5,jy+11]],'coral',0.54);
    H.line(R,[[jx+1,jy+4],[jx-1,jy+23],[jx+5,jy+26]],'paper',0.8);
    metal(H, R, 7.81, 7.52, 2.92, 1.27, 0.04, 0.17, 'teal');
    surface(H, R, H.tile(7.99, 7.67, 2.55, 0.95, 0.23), 'blue', 0.72);
    surface(H,R,H.tile(8.11,7.82,1.63,0.66,0.26),'teal',0.52);
    const [ix,iy]=H.p(8.87,8.16,0.28);
    stroke(H,R,[[ix-21,iy],[ix-14,iy-5],[ix+6,iy-3],[ix+18,iy-8],[ix+23,iy],[ix+7,iy+3],[ix-12,iy+6],[ix-21,iy]],'blue',2.6);
    foldedCloth(H,R,9.96,7.83,0.52,0.63,0.27,'paper','coral');
    for(const i of [8.17,9.85]) timber(H,R,i,7.77,0.08,0.83,0.25,0.13,'teal');
    surface(H, R, [H.p(7.82, 7.5, 0.23), H.p(10.73, 7.5, 0.23), H.p(10.73, 7.12, 1.22), H.p(7.82, 7.12, 1.22)], 'teal', 0.64);
    H.line(R, [H.p(8.03, 7.4, 0.37), H.p(10.52, 7.4, 0.37)], 'sun', 1.3);
    benchFrame(H, R, 8.6, 9.66, 2.25, 1.12, 0.94, 'sun');
    boundBook(H, R, 8.81, 9.82, 1.12, 0.73, 0.98, 'paper');
    const [mx2,my2]=H.p(10.29,9.94,0.99);
    surface(H,R,[[mx2-7,my2],[mx2+7,my2],[mx2+3,my2-20],[mx2-3,my2-20]],'sun',0.7);
    H.line(R,[[mx2,my2-3],[mx2-3,my2-16]],'blue',1.1);
    H.dot(mx2-2,my2-12,1.8,'paper');
    satchel(H,R,8.43,10.58,0.04,'coral',0.75);
    for(const j of [9.92,10.49]) {
      const [x,y]=H.p(7.5,j,0.08);
      surface(H,R,ell(x,y,10,4),'teal',0.6);
      surface(H,R,ell(x-3,y-1,4,2),'blue',0.7);
    }
    vessel(H, R, 10.32, 10.22, 0.98, 5, 10, 'teal');
    vessel(H, R, 0.7, 7.52, 0.03, 15, 25, 'coral');
    branchSpray(H, R, ...H.p(0.7, 7.52, 0.9), 0.97, 'teal');
    slattedSeat(H, R, 1.12, 9.5, 2.83, 0.03, 'sun', 0.57);
    foldedCloth(H, R, 1.37, 9.66, 1.23, 0.49, 0.68, 'coral', 'paper');
    for(const i of [8.06,10.37]) {
      metal(H,R,i,8.77,0.2,0.05,0.13,0.12,'sun');
      H.dot(...H.p(i+0.1,8.84,0.18),1.2,'blue');
    }
    bentTube(H,R,[[8.8,8.84,0.16],[8.8,9.04,0.16],[9.48,9.04,0.16],[9.48,8.84,0.16]],1.5,'blue');
    foldedCloth(H,R,2.64,9.65,0.98,0.56,0.68,'paper','teal');
    const [hx2,hy2]=H.p(3.1,9.92,0.76);
    trumpet(H,R,[hx2-16,hy2-8],1,0);
    pendant(H, R, 4.78, 5.06, 4.17, 3.04, 'sun', 1.02);
    floorLight(H, 5.3, 5.6, 73, 0.44);
    const beam=[H.p(7.12,0.54,1.44),H.p(9.83,0.54,1.44),H.p(6.54,7.92,0.05),H.p(3.52,6.65,0.05)];
    H.tint(beam,'sun',0.09);
  },
  (H, R, t) => {
    const u = cycle(t, 12),
      raised =
        u < 0.12
          ? 0
          : u < 0.28
            ? (1 - Math.cos(((u - 0.12) / 0.16) * Math.PI)) / 2
            : u < 0.8
              ? 1
              : u < 0.91
                ? (1 + Math.cos(((u - 0.8) / 0.11) * Math.PI)) / 2
                : 0;
    H.at(4.4, 6.32, 0, (HH) =>
      actor(
        HH,
        R,
        4.4,
        6.32,
        t,
        'newYorkTrumpetPhrase',
        {
          shirt: ['coral', 0.68],
          pants: ['blue', 0.63],
          skin: ['coral', 0.5],
          hairStyle: 'curly',
          prop: (h, r, p) => trumpet(h, r, p.nearHand, raised, t)
        },
        0,
        1.45
      )
    );
    const [x, y] = H.p(0.7, 7.52, 1.0);
    stroke(
      H,
      R,
      [
        [x, y],
        [x + 3, y - 17],
        [x + 8 + Math.sin(u * Math.PI * 2) * 2, y - 30]
      ],
      'teal',
      1.2
    );
    oval(H, R, x + 9 + Math.sin(u * Math.PI * 2) * 2, y - 29, 6, 3, 'teal', 0.8);
  }
);
room.loopSeconds = 12;
room.stillTime = 0;
export default room;
