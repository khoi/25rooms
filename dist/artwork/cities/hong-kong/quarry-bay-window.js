import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant, floorLight, cushion, branchSpray } from '../materials.js';
import { masonry, cabinetFrame, basin as washBasin, boardFloor } from '../structure.js';
import { windowBay, taskLight } from '../joinery.js';
import { coiledLine, boundBook, shallowTray, foldedCloth } from '../furnishings.js';
import { TAU, actor, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const watch = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, head: 4, lean: -3, al: 26, ar: 102, el: 36, er: 7 };
FIGURES.clips.hongKongAquariumTrace = {
  dur: 20,
  keys: [
    [0, watch],
    [0.15, watch],
    [0.37, { ...watch, ar: 138, er: 0, head: -6 }],
    [0.55, { ...watch, ar: 109, er: 6, head: -2 }],
    [0.69, { ...watch, ar: 50, er: 48, head: 3 }],
    [0.83, { ...watch, ar: 50, er: 48, head: 3 }],
    [1, watch]
  ]
};

function mug(H, R, i, j, z, ink) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 6, y],
      [x + 6, y],
      [x + 6, y - 13],
      [x - 6, y - 13]
    ],
    ink,
    0.7,
    0.7
  );
  oval(H, R, x, y - 13, 6, 2.3, 'paper', 1);
  stroke(
    H,
    R,
    [
      [x + 6, y - 11],
      [x + 12, y - 9],
      [x + 12, y - 3],
      [x + 6, y - 2]
    ],
    'blue',
    1
  );
}

function fish(H, R, x, y, direction, ink, size = 1) {
  const p = (a, b) => [x + a * direction * size, y + b * size];
  shape(H, R, [p(-9, 0), p(-16, -6), p(-15, 6), p(-9, 1)], ink, 0.76, 0.6);
  oval(H, R, x, y, 11 * size * Math.max(0.2, Math.abs(direction)), 6 * size, ink, 0.8);
  shape(H, R, [p(-1, -4), p(2, -10), p(6, -3)], ink, 0.7, 0.55);
  H.dot(...p(7, -2), 1.25 * size, 'blue', 1);
  H.line(R, [p(-5, 1), p(5, 1)], 'paper', 0.65);
}

const room = world(
  'hong-kong-quarry-bay-window',
  'Quarry Bay · One window still awake',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    boardFloor(H, R, 0, 0, 12, 12, 0.02, 'teal', 0.47);
    H.tint(H.tile(0.03, 0.03, 11.94, 11.94, 0.027), 'blue', 0.47, { fine: true });
    floorLight(H, 7.2, 8.4, 104, 0.67);
    floorLight(H, 2.3, 8.3, 59, 0.32);
    masonry(H, R, 'nw', 0, 12, 0, 4.73, 'blue', 0.67);
    masonry(H, R, 'ne', 0, 12, 0, 4.73, 'teal', 0.53);
    windowBay(H, R, 'ne', 4.48, 7.04, 1.92, 2.52, {
      night: true,
      divisions: 5,
      view(P) {
        for (let n = 0; n < 7; n++) {
          const u = 0.15 + n * 0.96,
            h = 1.47 + (n % 3) * 0.28;
          surface(H, R, [P(u, 0.1), P(u + 0.84, 0.1), P(u + 0.84, h), P(u, h)], n % 2 ? 'teal' : 'blue', 0.67, 0.45);
          for (let x = 0; x < 2; x++)
            for (let y = 0; y < 5; y++)
              surface(
                H,
                R,
                [
                  P(u + 0.12 + x * 0.39, 0.24 + y * 0.31),
                  P(u + 0.29 + x * 0.39, 0.24 + y * 0.31),
                  P(u + 0.29 + x * 0.39, 0.42 + y * 0.31),
                  P(u + 0.12 + x * 0.39, 0.42 + y * 0.31)
                ],
                (x + y + n) % 4 === 0 ? 'sun' : 'paper',
                (x + y + n) % 4 === 0 ? 0.77 : 0.23,
                0.3
              );
        }
      }
    });
    timber(H,R,0.15,0.44,0.7,2.19,2.48,0.12,'sun');
    for(const j of [0.63,2.28]) bentTube(H,R,[[0.16,j,2.02],[0.75,j,2.48],[0.16,j,2.48]],1.6,'teal');
    for(let n=0;n<5;n++) boundBook(H,R,0.22,0.6+n*0.34,0.46,0.27,2.63,n%2?'sun':'paper');
    cabinetFrame(H,R,1.18,0.39,2.58,0.66,2.82,1.27,2,'teal',(i,j,w,d,z,h,n)=>{
      timber(H,R,i,j,w,d,z+0.48,0.055,'paper');
      for(let q=0;q<3;q++) vessel(H,R,i+0.17+q*0.29,j+0.27,z+0.61,3.3,9,n?'sun':'coral',false);
      foldedCloth(H,R,i+0.07,j+0.08,w-0.14,d-0.16,z+0.1,'paper','teal');
    });
    for(const j of [3.49, 8.1]) timber(H, R, 0.22, j, 3.35, 0.14, 0.1, 3.99, 'teal');
    timber(H, R, 0.22, 3.49, 3.35, 4.75, 0.13, 0.29, 'sun');
    for (let n = 0; n < 9; n++) timber(H, R, 0.34, 3.65 + n * 0.46, 3.07, 0.39, 0.42, 0.09, 'sun');
    for(let n=0;n<3;n++) {
      timber(H,R,0.51,3.88+n*1.33,2.77,1.19,0.16,0.25,'teal');
      metal(H,R,3.29,4.31+n*1.33,0.05,0.33,0.23,0.06,'sun');
    }
    cushion(H, R, 0.39, 3.7, 2.99, 4.23, 0.54, 0.24, 'paper');
    drape(H, R, 0.48, 5.06, 2.81, 2.87, 0.81, 0.64, 'coral');
    cushion(H, R, 0.65, 3.88, 2.23, 0.96, 0.8, 0.23, 'paper');
    timber(H, R, 0.21, 3.49, 3.33, 0.19, 3.97, 0.18, 'teal');
    for (let n = 0; n < 5; n++) surface(H, R, H.faceJ(0.42, 3.76 + n * 0.81, 0.68, 1.81, 3.88), n % 2 ? 'teal' : 'paper', 0.24, 0.5);
    cabinetFrame(H, R, 0.32, 0.43, 3.21, 1.62, 0.09, 1.17, 2, 'teal', (i, j, w, d, z, h, n) => {
      timber(H, R, i, j, w, d, z + 0.47, 0.07, 'sun');
      for (let k = 0; k < 3; k++) vessel(H, R, i + 0.25 + k * 0.35, j + 0.5, z + 0.58, 5, 12, n ? 'paper' : 'sun');
    });
    for(const j of [0.5,1.22]) metal(H,R,0.21,j,0.11,0.13,1.57,0.77,'paper');
    for(let n=0;n<6;n++) {
      const j=0.55+n*0.17;
      bentTube(H,R,[[0.3,j,1.54],[1.35,j,1.54]],1.1,'teal');
      if(n<4) {
        const [x,y]=H.p(0.85,j,1.84);
        H.outline(R,Array.from({length:25},(_,q)=>[x+Math.cos(q*TAU/24)*8,y+Math.sin(q*TAU/24)*11]),'paper',2);
      }
    }
    metal(H, R, 0.29, 0.39, 3.31, 1.71, 1.26, 0.1, 'paper');
    washBasin(H, R, 0.45, 0.55, 1.58, 1.26, 1.38);
    vessel(H, R, 2.75, 1.15, 1.38, 11, 24, 'paper', false);
    mug(H, R, 3.02, 1.8, 1.38, 'coral');
    cabinetFrame(H, R, 3.73, 1.01, 2.52, 1.22, 0.07, 1.05, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 4; k++) boundBook(H, R, i + 0.04, j + 0.1 + k * 0.2, w - 0.1, 0.16, z + 0.12, n % 2 ? 'paper' : 'teal');
    });
    cushion(H, R, 3.78, 1.07, 2.42, 1.1, 1.17, 0.14, 'sun');
    cabinetFrame(H, R, 7.34, 6.72, 3.7, 1.61, 0.08, 0.99, 3, 'teal', (i, j, w, d, z, h, n) => {
      if (n === 0) {
        vessel(H, R, i + w / 2, j + d * 0.6, z + 0.05, 10, 21, 'paper');
        coiledLine(H, R, i + w / 2, j + d * 0.6, z + 0.54, 10, 'teal');
      } else for (let k = 0; k < 3; k++) vessel(H, R, i + 0.2 + k * 0.26, j + 0.57, z + 0.15, 5, 12, ['sun', 'coral', 'teal'][k]);
    });
    shallowTray(H,R,9.14,7.03,1.43,0.93,0.16,'paper');
    foldedCloth(H,R,9.27,7.15,0.58,0.59,0.21,'paper','coral');
    vessel(H,R,10.18,7.58,0.21,6,11,'teal',false);
    for(const i of [7.53,10.67]) metal(H,R,i,6.87,0.12,1.41,1.07,0.13,'sun');
    metal(H, R, 7.5, 6.98, 3.39, 1.28, 1.09, 0.1, 'blue');
    surface(H, R, H.faceI(7.51, 8.25, 3.37, 1.19, 2.59), 'teal', 0.15);
    surface(H, R, H.faceJ(10.88, 6.98, 1.28, 1.19, 2.59), 'teal', 0.24);
    H.tint(H.tile(7.51, 6.98, 3.37, 1.28, 2.59), 'teal', 0.12, { fine: true });
    for (const i of [7.51, 10.88])
      for (const j of [6.98, 8.25])
        bentTube(
          H,
          R,
          [
            [i, j, 1.19],
            [i, j, 2.61]
          ],
          1.5,
          'teal'
        );
    for (const j of [6.98, 8.25]) metal(H, R, 7.51, j, 3.37, 0.035, 2.59, 0.045, 'blue');
    surface(H, R, H.faceI(7.58, 8.27, 3.23, 1.25, 1.42), 'sun', 0.24);
    for (const [i, h] of [
      [7.92, 0.78],
      [8.18, 1.01],
      [10.17, 0.81],
      [10.5, 1.05]
    ])
      for (let n = 0; n < 3; n++) branchSpray(H, R, ...H.p(i + n * 0.07, 8.28, 1.41), h * 0.7, 'teal', n % 2 ? 1 : -1);
    surface(H, R, [H.p(8.68, 8.28, 1.4), H.p(9, 8.28, 1.82), H.p(9.41, 8.28, 1.62), H.p(9.64, 8.28, 1.4)], 'blue', 0.3);
    bentTube(
      H,
      R,
      [
        [10.5, 7.21, 2.63],
        [10.5, 7.21, 1.35]
      ],
      1.4,
      'teal'
    );
    metal(H,R,10.22,7.02,0.48,0.39,2.18,0.64,'teal');
    for(let n=0;n<5;n++) H.line(R,[H.p(10.27+n*0.08,7.43,2.26),H.p(10.27+n*0.08,7.43,2.62)],'blue',0.8);
    bentTube(H,R,[[10.5,7.13,2.72],[10.89,7.13,2.89],[11.1,7.13,2.72],[11.1,7.13,0.67],[10.98,7.13,0.67]],1.2,'paper');
    metal(H,R,10.96,7.13,0.34,0.63,0.55,0.22,'teal');
    bentTube(H,R,[[10.99,7.25,0.65],[11.36,7.25,0.65],[11.36,6.09,0.65],[11.36,6.09,0.13]],1.2,'blue');
    metal(H,R,11.26,5.87,0.15,0.53,0.06,0.34,'paper');
    const net=H.p(11.22,6.27,2.0);
    H.outline(R,Array.from({length:33},(_,n)=>[net[0]+Math.cos(n*TAU/32)*12,net[1]+Math.sin(n*TAU/32)*15]),'sun',1.6);
    for(let n=-2;n<=2;n++) H.line(R,[[net[0]-9,net[1]+n*4],[net[0]+9,net[1]+n*4]],'paper',0.55);
    H.line(R,[[net[0],net[1]-15],[net[0],net[1]-43]],'sun',1.8);
    metal(H,R,11.1,6.14,0.1,0.17,0.06,3.07,'teal');
    metal(H,R,10.92,5.99,0.48,0.48,0.04,0.08,'teal');
    timber(H,R,10.97,6.18,0.44,0.13,3.1,0.09,'sun');
    H.line(R,[[net[0],net[1]-43],H.p(11.22,6.27,3.13)],'teal',0.9);
    for(const i of [7.66,10.58]) metal(H,R,i,7.27,0.11,0.59,2.65,0.12,'teal');
    metal(H,R,7.64,7.45,3.06,0.16,2.79,0.1,'paper');
    H.line(R,[H.p(7.79,7.53,2.78),H.p(10.57,7.53,2.78)],'sun',2.1);
    pendant(H, R, 9.1, 7.65, 4.38, 3.3, 'teal', 1.02);
    benchFrame(H, R, 2.67, 9.47, 2.96, 1.72, 0.88, 'sun');
    boundBook(H, R, 3.01, 9.71, 1.3, 0.84, 0.91, 'teal');
    mug(H, R, 4.89, 10.08, 0.92, 'sun');
    taskLight(H, R, 2.99, 9.62, 0.92, 'coral', 0.67);
    shallowTray(H,R,4.46,9.54,0.82,0.36,0.93,'teal');
    for(const i of [4.66,4.98]) {
      const [x,y]=H.p(i,9.71,0.97);
      H.outline(R,Array.from({length:21},(_,n)=>[x+Math.cos(n*TAU/20)*4,y+Math.sin(n*TAU/20)*2.4]),'blue',0.7);
    }
    H.line(R,[H.p(4.75,9.71,0.97),H.p(4.9,9.71,0.97)],'blue',0.7);
    surface(H,R,H.tile(3.63,10.14,0.13,0.54,0.98),'coral',0.74);
    timber(H,R,2.8,9.67,2.65,1.33,0.29,0.06,'teal');
    foldedCloth(H,R,3.3,9.89,1.8,0.76,0.37,'paper','sun');
    surface(H,R,H.faceI(1.08,9.61,1.17,0.06,0.88),'coral',0.68);
    surface(H,R,H.faceJ(2.25,9.12,0.49,0.06,0.88),'coral',0.47);
    bentTube(H,R,[[1.29,9.46,0.88],[1.29,9.46,1.22],[2.03,9.46,1.22],[2.03,9.46,0.88]],1.3,'sun');
    surface(H,R,H.faceI(1.38,9.63,0.54,0.19,0.57),'teal',0.66);
    for(let n=0;n<4;n++) H.line(R,[H.p(1.42+n*0.13,9.65,0.51),H.p(1.46+n*0.13,9.65,0.56)],'paper',0.7);
    cushion(H, R, 4.33, 11.02, 1.42, 0.66, 0.05, 0.12, 'coral');
    for (let n = 0; n < 4; n++) branchSpray(H, R, ...H.p(10.67 + n * 0.12, 3.08, 0.55), 1.08, 'teal', n % 2 ? 1 : -1);
    vessel(H, R, 10.81, 3.18, 0.02, 17, 23, 'coral');
  },
  (H, R, t) => {
    const u = cycle(t, 20),
      pane = H.faceI(7.55, 8.27, 3.29, 1.27, 2.53);
    H.clip(pane, () => {
      const a = u * TAU;
      const [x, y] = H.p(9.1 + Math.cos(a) * 0.91, 8.28, 1.91 + Math.sin(a) * 0.24);
      fish(H, R, x, y, Math.tanh(-Math.sin(a) * 5), 'coral', 0.68);
      const [fx, fy] = H.p(8.97 + Math.cos(a + 2.4) * 0.72, 8.28, 2.23 + Math.sin(a + 2.4) * 0.13);
      fish(H, R, fx, fy, Math.tanh(-Math.sin(a + 2.4) * 5), 'sun', 0.47);
      for (let q = 0; q < 4; q++) {
        const bubble = cycle(t + q * 5, 20),
          p = H.p(10.4 + Math.sin(bubble * TAU) * 0.055, 8.28, 1.35 + bubble * 1.15);
        H.opacity(Math.sin(bubble * Math.PI), () =>
          H.outline(
            R,
            Array.from({ length: 14 }, (_, k) => [p[0] + Math.cos((k * TAU) / 14) * 2, p[1] + Math.sin((k * TAU) / 14) * 2]),
            'paper',
            0.7
          )
        );
      }
    });
    H.line(R, [H.p(7.79, 8.3, 1.65), H.p(8.02, 8.3, 2.38)], 'paper', 1.1, { tone: 0.5 });
    actor(
      H,
      R,
      7.38,
      8.22,
      t,
      'hongKongAquariumTrace',
      {
        shirt: ['paper', 1],
        pants: ['teal', 0.6],
        hairStyle: 'bun',
        face: 'se',
        prop(h, r, p) {
          h.line(r, [p.nearHand, [p.nearHand[0] + 6, p.nearHand[1] - 2]], 'coral', 1.5);
        }
      },
      0.03,
      1.28
    );
    const [x, y] = H.p(9.2, 8.52, 1.14);
    H.glow(x, y, 51, 18, 'teal', 0.16);
  }
);
room.loopSeconds = 20;
room.stillTime = 0;
export default room;
