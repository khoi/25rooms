import { benchFrame, bentTube, branchSpray, cushion, pendant, slattedSeat, surface, timber, vessel } from '../materials.js';
import { cabinetFrame, rackFrame, boardFloor } from '../structure.js';
import { windowBay } from '../joinery.js';
import { boundBook, shallowTray, slattedCrate, foldedCloth, satchel } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, wallPt, wallRect, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 17, al: 65, el: 36, ar: 55, er: 66 };
FIGURES.clips.newYorkLeafLens = {
  dur: 18,
  keys: [
    [0, seated],
    [0.15, seated],
    [0.29, { ...seated, al: 71, el: 63, head: 23 }],
    [0.47, { ...seated, al: 71, el: 63, head: 23 }],
    [0.61, { ...seated, al: 87, el: 25, head: 6 }],
    [0.77, { ...seated, al: 87, el: 25, head: 6 }],
    [0.93, seated],
    [1, seated]
  ]
};
const indicate = { ...rest, head: 15, lean: -5, ar: 83, er: 6, al: 31, el: 42 };
FIGURES.clips.newYorkLeafGuide = {
  dur: 18,
  keys: [
    [0, indicate],
    [0.34, indicate],
    [0.53, { ...indicate, ar: 99, er: 2, head: 3 }],
    [0.74, { ...indicate, ar: 99, er: 2, head: 3 }],
    [0.92, indicate],
    [1, indicate]
  ]
};

function leaf(H, R, x, y, size = 1, ink = 'coral', turn = 0, oak = false) {
  const p = (a, b) => [x + (a * Math.cos(turn) - b * Math.sin(turn)) * size, y + (a * Math.sin(turn) + b * Math.cos(turn)) * size];
  const edge = oak
    ? [
        [0, -16],
        [5, -13],
        [4, -9],
        [11, -8],
        [8, -3],
        [12, 1],
        [7, 5],
        [5, 12],
        [0, 15],
        [-4, 10],
        [-10, 8],
        [-7, 2],
        [-12, -2],
        [-7, -6],
        [-9, -10],
        [-3, -11]
      ]
    : [
        [0, -17],
        [6, -7],
        [13, -7],
        [8, 0],
        [14, 5],
        [5, 7],
        [2, 15],
        [-3, 8],
        [-12, 7],
        [-8, 0],
        [-13, -5],
        [-5, -6]
      ];
  shape(
    H,
    R,
    edge.map(([a, b]) => p(a, b)),
    ink,
    0.65,
    0.6
  );
  H.line(R, [p(0, -12), p(0, 19)], 'blue', 0.65, { tone: 0.65 });
  for (const n of [-1, 1]) for (const q of [-5, 3]) H.line(R, [p(0, q + 5), p(n * 7, q)], 'blue', 0.45, { tone: 0.55 });
}

function cone(H, R, x, y, size = 1) {
  oval(H, R, x, y - 7 * size, 6 * size, 10 * size, 'sun', 0.65);
  for (let n = 0; n < 4; n++)
    stroke(
      H,
      R,
      [
        [x - 4 * size, y - n * 4 * size],
        [x, y + 2 * size - n * 4 * size],
        [x + 4 * size, y - n * 4 * size]
      ],
      'blue',
      0.6
    );
}

function study(H, R, x, y, kind, scale = 1) {
  const P = (a,b) => [x+a*scale,y+b*scale];
  if(kind === 'fern') {
    stroke(H,R,[P(-12,13),P(-5,2),P(3,-11),P(8,-25)],'teal',1.1);
    for(let n=0;n<7;n++) {
      const a=-8+n*2.4,b=8-n*4.5,w=11-n*0.8;
      for(const d of [-1,1]) surface(H,R,[P(a,b),P(a+d*w,b-7),P(a+d*w*0.75,b-1),P(a+1,b+2)],'teal',0.42+n*0.04,0.4);
    }
  } else if(kind === 'bark') {
    surface(H,R,[P(-15,-7),P(9,-12),P(16,3),P(-8,10)],'sun',0.55);
    for(let n=0;n<5;n++) stroke(H,R,[P(-10+n*4,-5),P(-5+n*4,-2),P(-7+n*4,4)],'coral',1);
  } else if(kind === 'seed') {
    H.line(R,[P(-15,5),P(13,-7)],'sun',1.3);
    for(let n=0;n<3;n++) {
      const a=-7+n*7,b=2-n*3;
      oval(H,R,...P(a,b),3*scale,2*scale,'coral',0.7);
      surface(H,R,[P(a,b),P(a-12,b-13),P(a-3,b-17),P(a+2,b-3)],'sun',0.32,0.5);
    }
  } else if(kind === 'rings') {
    surface(H,R,ell(x,y,17*scale,11*scale),'sun',0.55);
    for(const k of [0.25,0.48,0.72,0.92]) H.outline(R,ell(x-2*scale,y,16*scale*k,10*scale*k),'coral',0.65);
    H.line(R,[P(0,0),P(12,8)],'blue',0.7);
  } else {
    const P0=[P(-13,7),P(-8,-5),P(2,-11),P(14,-7),P(10,4),P(-2,10)];
    surface(H,R,P0,'teal',0.48);
    H.line(R,[P(-14,8),P(11,-7)],'sun',0.8);
  }
}

const room = world(
  'new-york-greenbelt-center',
  'Staten Island · The Leaf Table',
  { floor: 'paper', tone: 1, wall: false, head: 110 },
  (H, R) => {
    H.opacity(0.38, () => boardFloor(H, R, 0.04, 0.04, 11.91, 11.89, 0.025, 'sun', 0.8));
    surface(H, R, H.faceJ(0.13, 0.13, 11.73, 0, 4.03), 'blue', 0.66);
    surface(H, R, H.faceI(0.13, 0.13, 11.73, 0, 4.03), 'paper', 1);
    for (let n = 0; n < 22; n++) H.line(R, [H.p(0.16, 0.15 + n * 0.53, 0.1), H.p(0.16, 0.15 + n * 0.53, 3.99)], 'blue', 0.6, { tone: 0.2 });
    for (const i of [0.26, 4.12, 8.03, 11.69]) {
      timber(H, R, i, 0.31, 0.18, 0.23, 0.03, 4.06, 'sun');
      bentTube(
        H,
        R,
        [
          [i, 0.32, 3.45],
          [i, 1.42, 4.04]
        ],
        2.8,
        'teal'
      );
    }
    timber(H, R, 0.2, 0.23, 11.65, 0.27, 4.06, 0.16, 'sun');
    windowBay(H, R, 'ne', 8.48, 2.45, 1.64, 1.39, {
      ink: 'teal',
      divisions: 1,
      view: (P) => {
        surface(H, R, [P(0, 0), P(2.45, 0), P(2.45, 1.4), P(0, 1.4)], 'sun', 0.13);
      }
    });
    windowBay(H,R,'nw',2.71,3.31,1.68,1.86,{ink:'sun',divisions:2,view:(P)=>{
      for(let n=0;n<5;n++) {
        H.line(R,[P(0.25+n*0.65,0.02),P(0.17+n*0.65,1.69)],'teal',3);
        const [x,y]=P(0.26+n*0.65,0.8+(n%2)*0.4);
        branchSpray(H,R,x,y,0.6,n%2?'coral':'teal');
      }
    }});
    for(const j of [6.91,9.24]) {
      surface(H,R,H.faceJ(0.3,j,1.86,2.07,3.52),'sun',0.64);
      surface(H,R,H.faceJ(0.32,j+0.13,1.6,2.2,3.39),'paper',1);
      const [x,y]=H.p(0.35,j+0.92,2.72);
      leaf(H,R,x,y,0.93,j<8?'coral':'teal',0.12,j>8);
      H.line(R,[H.p(0.35,j+0.92,2.3),H.p(0.35,j+0.92,2.13)],'blue',0.65);
    }
    timber(H,R,0.23,0.24,0.18,11.51,3.88,0.15,'sun');
    timber(H,R,0.23,0.24,0.18,11.51,0.09,0.16,'sun');
    cabinetFrame(H, R, 0.42, 0.47, 5.76, 1.83, 0.04, 3.28, 3, 'sun', (i, j, w, d, z, h, col) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 1.01, 0.085, 'sun');
        surface(H, R, H.tile(i + 0.1, j + 0.1, w - 0.2, d - 0.19, z + 0.12 + row * 1.01), 'paper', 1, 0.3);
        if(row===0) {
          slattedCrate(H,R,i+0.13,j+0.14,w-0.26,d-0.3,z+0.14,0.43,col===1?'teal':'sun');
          foldedCloth(H,R,i+0.27,j+0.3,w-0.55,d-0.61,z+0.59,'paper',col===1?'coral':'teal');
          continue;
        }
        const [x,y]=H.p(i+w*0.5,j+d*0.57,z+0.21+row*1.01);
        if(col===0 && row===1) {
          for(let n=0;n<3;n++) boundBook(H,R,i+0.19+n*0.05,j+0.24,w-0.42,d-0.45,z+0.19+row*1.01+n*0.08,n===1?'coral':'paper');
          study(H,R,x,y-4,'fern',0.64);
        } else if(col===0) {
          study(H,R,x,y,'rings',0.94);
          study(H,R,x+15,y+2,'bark',0.47);
        } else if(col===1 && row===1) {
          shallowTray(H,R,i+0.11,j+0.24,w-0.22,d-0.42,z+0.15+row*1.01,'teal');
          cone(H,R,x-9,y,0.8);
          cone(H,R,x+9,y+1,0.42);
        } else if(col===1) {
          for(let n=0;n<3;n++) vessel(H,R,i+0.34+n*0.44,j+0.86,z+0.17+row*1.01,4,11+n*2,'paper');
          study(H,R,x,y-13,'seed',0.65);
        } else if(row===1) {
          study(H,R,x-4,y,'bark',0.9);
          H.line(R,[[x+12,y+4],[x+22,y-9]],'sun',1.3);
          for(let n=0;n<4;n++) H.line(R,[[x+17+n,y-5],[x+22+n,y-13]],'blue',0.55);
        } else {
          surface(H,R,H.tile(i+0.21,j+0.21,w-0.42,d-0.42,z+0.18+row*1.01),'paper',1);
          study(H,R,x,y,'fern',0.85);
        }
      }
    });
    benchFrame(H, R, 6.7, 0.65, 1.29, 1.62, 1.04, 'teal');
    boundBook(H, R, 6.84, 0.83, 1.01, 1.05, 1.08, 'paper');
    vessel(H, R, 7.33, 1.74, 1.08, 5, 10, 'teal');
    const edge = [];
    for (let n = 0; n < 48; n++) {
      const a = (n * TAU) / 48;
      edge.push(H.p(6.27 + Math.cos(a) * 2.25, 6.38 + Math.sin(a) * 1.67, 1.1));
    }
    for (const [i, j] of [
      [4.89, 5.41],
      [7.61, 5.41],
      [4.89, 7.27],
      [7.61, 7.27]
    ]) {
      timber(H, R, i, j, 0.18, 0.18, 0.02, 1.06, 'sun');
      bentTube(
        H,
        R,
        [
          [i, j, 0.17],
          [6.28, 6.37, 0.53]
        ],
        2.1,
        'teal'
      );
    }
    const lower = edge.map(([x,y])=>[x,y+4]);
    surface(H,R,[...edge.slice(0,25),...lower.slice(0,25).reverse()],'sun',0.7,0.8);
    surface(H, R, edge, 'sun', 0.38, 1.3);
    H.line(R,[H.p(4.93,5.48,0.61),H.p(7.61,5.48,0.61)],'teal',2.4);
    H.line(R,[H.p(4.93,7.3,0.61),H.p(7.61,7.3,0.61)],'teal',2.4);
    for(const i of [5.08,7.46]) H.dot(...H.p(i,7.34,0.61),1.8,'sun');
    boundBook(H,R,5.67,5.06,1.08,0.61,1.14,'teal');
    H.line(R,[H.p(5.79,5.28,1.2),H.p(6.48,5.28,1.2)],'sun',1.1);
    const [bx,by]=H.p(4.8,6.52,1.14);
    surface(H,R,[[bx-9,by],[bx+13,by-6],[bx+14,by+5],[bx-8,by+11]],'paper',1);
    for(let n=0;n<6;n++) H.line(R,[[bx-6+n*3,by+5],[bx-3+n*3,by-2]],'coral',0.7);
    H.line(R,[H.p(6.83,7.32,1.16),H.p(7.73,7.32,1.16)],'sun',2.1);
    for(let n=0;n<7;n++) H.line(R,[H.p(6.88+n*0.12,7.28,1.17),H.p(6.88+n*0.12,7.37,1.17)],'blue',0.55);
    for (let n = 0; n < 4; n++) {
      const i = 4.75 + (n % 2) * 1.69,
        j = 5.54 + Math.floor(n / 2) * 1.45;
      surface(H, R, H.tile(i, j, 1.28, 0.88, 1.12), 'paper', 1);
      const [x, y] = H.p(i + 0.62, j + 0.42, 1.14);
      if(n===2) leaf(H,R,x,y,0.66,'coral',-0.32,true);
      else study(H,R,x,y,['fern','seed','bark','smooth'][n],0.8);
    }
    shallowTray(H, R, 6.22, 6.08, 1.14, 0.63, 1.14, 'teal');
    for (let n = 0; n < 3; n++) cone(H, R, ...H.p(6.43 + n * 0.3, 6.41, 1.19), 0.4);
    for (const [i, j, h] of [
      [5.16, 7.71, 0.95],
      [8.05, 5.0, 0.61]
    ]) {
      for (const x of [i, i + 0.83]) for (const y of [j, j + 0.65]) timber(H, R, x, y, 0.1, 0.1, 0.03, h - 0.1, 'sun');
      cushion(H, R, i - 0.04, j - 0.04, 1.02, 0.84, h, 0.12, 'coral');
    }
    rackFrame(H, R, 0.56, 6.74, 2.09, 4.13, 0.02, [0.12, 1.06], 'sun', (i, j, w, d, z, row) => {
      if(!row) {
        slattedCrate(H,R,i+0.1,j+0.15,w-0.2,1.54,z,0.53,'teal');
        foldedCloth(H,R,i+0.2,j+1.94,w-0.4,1.44,z+0.05,'paper','coral');
      } else {
        for(let n=0;n<4;n++) timber(H,R,i+0.23,j+0.24,1.41,1.25,z+0.08+n*0.1,0.045,n%2?'paper':'sun');
        for(const a of [i+0.46,i+1.32]) {
          bentTube(H,R,[[a,j+0.38,z+0.05],[a,j+0.38,z+0.75]],1.4,'teal');
          H.line(R,[H.p(a-0.17,j+0.38,z+0.72),H.p(a+0.17,j+0.38,z+0.72)],'coral',1.5);
        }
        study(H,R,...H.p(i+1.05,j+2.45,z+0.13),'rings',1.05);
        study(H,R,...H.p(i+0.76,j+3.22,z+0.13),'bark',0.8);
      }
    });
    benchFrame(H,R,0.74,4.0,2.1,1.43,1.01,'sun');
    shallowTray(H,R,0.94,4.16,1.73,1.11,1.04,'teal');
    const [nx,ny]=H.p(1.66,4.68,1.12);
    for(let n=0;n<13;n++) {
      const a=n*TAU/13;
      H.line(R,[[nx+Math.cos(a)*9,ny+Math.sin(a)*4],[nx+Math.cos(a+1)*14,ny+Math.sin(a+1)*6]],'sun',1.1);
    }
    for(const dx of [-4,3]) oval(H,R,nx+dx,ny-2,3,4,'paper',1);
    foldedCloth(H,R,1.01,4.17,1.48,0.9,0.31,'paper','teal');
    benchFrame(H,R,5.14,9.82,2.55,1.36,0.77,'teal');
    boundBook(H,R,5.32,10.02,1.04,0.88,0.81,'paper');
    boundBook(H,R,5.36,10.0,1.04,0.88,0.9,'sun');
    for(const i of [6.73,7.19]) {
      const [x,y]=H.p(i,10.43,0.82);
      H.outline(R,ell(x,y,6,4),'blue',1.2);
      H.line(R,[[x+5,y+2],[x+12,y+7]],'teal',2.2);
    }
    satchel(H,R,4.28,10.35,0.04,'coral',0.75);
    const [qx,qy]=H.p(3.63,9.66,1.67);
    H.outline(R,ell(qx,qy-9,11,16),'teal',1.5);
    for(let n=-2;n<=2;n++) H.line(R,[[qx-8,qy-9+n*4],[qx+8,qy-9+n*4]],'paper',0.7);
    slattedSeat(H, R, 8.83, 9.38, 2.36, 0.03, 'sun', 0.63);
    boundBook(H, R, 9.12, 9.59, 1.39, 0.51, 0.68, 'teal');
    const [tx, ty] = H.p(10.64, 3.35, 0.03);
    H.line(
      R,
      [
        [tx, ty],
        [tx - 8, ty - 68],
        [tx - 29, ty - 103]
      ],
      'coral',
      5
    );
    H.line(
      R,
      [
        [tx - 8, ty - 62],
        [tx + 27, ty - 109]
      ],
      'sun',
      3
    );
    branchSpray(H, R, tx - 22, ty - 81, 1.0, 'teal');
    branchSpray(H, R, tx + 13, ty - 83, 0.9, 'teal');
    for(const z of [0.12,0.38]) {
      timber(H,R,9.65,2.57,1.9,0.12,z,0.22,'sun');
      timber(H,R,9.65,4.06,1.9,0.12,z,0.22,'sun');
      timber(H,R,9.65,2.57,0.12,1.61,z,0.22,'sun');
      timber(H,R,11.44,2.57,0.12,1.61,z,0.22,'sun');
    }
    surface(H,R,H.tile(9.79,2.71,1.51,1.17,0.5),'blue',0.5);
    for(let n=0;n<5;n++) cone(H,R,...H.p(10.02+(n%3)*0.44,2.99+Math.floor(n/3)*0.59,0.57),0.45);
    vessel(H,R,11.11,1.25,0.03,17,32,'teal');
    const [rx,ry]=H.p(11.11,1.25,0.99);
    surface(H,R,ell(rx,ry,16,6),'sun',0.6);
    H.line(R,[[rx-13,ry],[rx+13,ry]],'blue',1.4);
    bentTube(H,R,[[11.3,0.53,3.87],[11.3,0.53,1.44],[11.11,1.25,1.17]],2.5,'teal');
    bentTube(H,R,[[11.2,1.66,0.25],[11.5,1.66,0.25],[11.5,1.66,0.14]],1.6,'sun');
    vessel(H, R, 3.57, 9.64, 0.04, 13, 20, 'sun');
    bentTube(
      H,
      R,
      [
        [3.57, 9.64, 0.4],
        [3.63, 9.66, 1.67]
      ],
      2,
      'teal'
    );
    pendant(H, R, 6.18, 5.81, 4.27, 3.17, 'paper', 1.18);
  },
  (H, R, t) => {
    const u = cycle(t, 18);
    actor(
      H,
      R,
      8.45,
      5.39,
      u * 18,
      'newYorkLeafGuide',
      { shirt: ['paper', 1], vest: ['teal', 0.62], hairStyle: 'curly', face: 'sw', glasses: true },
      0.04,
      1.31
    );
    actor(
      H,
      R,
      5.6,
      8.03,
      u * 18,
      'newYorkLeafLens',
      {
        shirt: ['coral', 0.63],
        hairStyle: 'pony',
        face: 'ne',
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          h.line(
            r,
            [
              [x, y],
              [x + 9, y - 9]
            ],
            'blue',
            3
          );
          oval(h, r, x + 14, y - 14, 8, 7, 'paper', 0.4);
          h.outline(r, ell(x + 14, y - 14, 8, 7), 'teal', 2, { tone: 0.8, amp: 0.08 });
          h.line(
            r,
            [
              [x + 11, y - 18],
              [x + 16, y - 20]
            ],
            'paper',
            1.3
          );
        }
      },
      0.39,
      1.5,
      'child'
    );
    const glass = wallRect(H, 'ne', 8.56, 10.81, 1.74, 2.92, 0.17);
    H.clip(glass, () => {
      const sway = Math.sin(u * TAU) * 0.05;
      stroke(
        H,
        R,
        [wallPt(H, 'ne', 10.75, 1.71, 0.18), wallPt(H, 'ne', 10.08 + sway, 2.14, 0.18), wallPt(H, 'ne', 8.51 + sway, 2.64, 0.18)],
        'blue',
        1.2
      );
      for (let n = 0; n < 4; n++)
        leaf(H, R, ...wallPt(H, 'ne', 8.79 + n * 0.43 + sway, 2.63 - n * 0.16, 0.19), 0.59, n % 2 ? 'teal' : 'sun', -0.4 + n * 0.24);
    });
  }
);
room.loopSeconds = 18;
room.stillTime = 6;
export default room;
