import { benchFrame, bentTube, cushion, metal, pendant, slattedSeat, surface, timber, vessel } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { caster } from '../joinery.js';
import { boundBook, coiledLine, foldedCloth, handTool, liddedTin, satchel, shallowTray, shelfUnit } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, wallRect, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const cuff = { ...rest, head: 16, al: 57, ar: 64, el: 67, er: 47, lean: -3 };
const shoe = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -25, head: 27, al: 39, ar: 42, el: 13, er: 9 };
FIGURES.clips.newYorkStageCuff = {
  dur: 16,
  keys: [
    [0, cuff],
    [0.13, cuff],
    [0.24, { ...cuff, ar: 69, er: 35, al: 60, el: 62 }],
    [0.33, cuff],
    [0.42, { ...cuff, ar: 69, er: 35, al: 60, el: 62 }],
    [0.54, cuff],
    [0.69, { ...rest, al: 13, ar: 17, head: -8 }],
    [0.84, { ...rest, al: 13, ar: 17, head: -8 }],
    [1, cuff]
  ]
};
FIGURES.clips.newYorkStageLaces = {
  dur: 16,
  keys: [
    [0, shoe],
    [0.25, shoe],
    [0.37, { ...shoe, ar: 49, al: 31, er: 5, el: 7 }],
    [0.45, shoe],
    [0.55, { ...shoe, ar: 49, al: 31, er: 5, el: 7 }],
    [0.65, shoe],
    [0.79, { ...shoe, lean: -6, head: -4, ar: 21, al: 23, er: 43, el: 38 }],
    [0.9, { ...shoe, lean: -6, head: -4, ar: 21, al: 23, er: 43, el: 38 }],
    [1, shoe]
  ]
};

function stool(H, R, i, j, ink = 'coral') {
  for (const [a, b] of [
    [0.09, 0.09],
    [0.69, 0.09],
    [0.09, 0.69],
    [0.69, 0.69]
  ])
    H.line(R, [H.p(i + a, j + b, 0.04), H.p(i + a * 0.78 + 0.09, j + b * 0.78 + 0.09, 0.63)], 'blue', 2.2);
  cushion(H, R, i, j, 0.82, 0.82, 0.62, 0.15, ink);
  for (const [a, b] of [
    [0.16, 0.16],
    [0.63, 0.16],
    [0.16, 0.63],
    [0.63, 0.63]
  ])
    H.dot(...H.p(i + a, j + b, 0.76), 1, 'blue', 0.7);
}

const room = world(
  'new-york-st-george-stage',
  'St. George · Five Minutes',
  { floor: 'paper', tone: 1, wall: false, head: 110 },
  (H, R) => {
    boardFloor(H, R, 0.06, 0.06, 11.88, 11.86, 0.025, 'sun', 0.4);
    masonry(H, R, 'ne', 0.07, 11.85, 0, 4.17, 'paper', 1);
    surface(H, R, H.faceJ(0.13, 0.13, 11.74, 0, 4.17), 'coral', 0.2);
    for(const i of [0.36,8.17,11.48]) timber(H,R,i,0.12,0.21,0.24,0.03,4.11,'teal');
    timber(H,R,0.2,0.1,11.52,0.27,3.98,0.19,'sun');
    surface(H,R,H.faceJ(0.13,6.89,4.38,0.06,3.91),'blue',0.69);
    for(const j of [6.93,9.08,11.2]) timber(H,R,0.22,j,0.21,0.14,0.06,3.87,'sun');
    timber(H,R,0.17,6.88,0.32,4.46,3.8,0.16,'sun');
    surface(H,R,H.faceJ(0.28,7.14,1.7,1.8,3.61),'teal',0.52);
    surface(H,R,H.faceJ(0.29,7.32,1.32,1.99,3.4),'paper',0.85);
    for(let n=0;n<4;n++) H.line(R,[H.p(0.3,7.45+n*0.28,2.13),H.p(0.3,7.55+n*0.28,3.19)],'coral',1.6);
    const [clockX, clockY] = H.p(0.14, 3.55, 3.39);
    oval(H, R, clockX, clockY, 17, 20, 'teal', 0.68);
    oval(H, R, clockX, clockY, 14, 17, 'paper', 1);
    for (let n = 0; n < 12; n++) {
      const a = n * TAU / 12;
      H.line(R, [[clockX + Math.sin(a) * 11, clockY + Math.cos(a) * 14], [clockX + Math.sin(a) * 12.5, clockY + Math.cos(a) * 15.5]], 'blue', 0.7);
    }
    H.line(R, [[clockX - 7, clockY + 8], [clockX, clockY], [clockX - 8, clockY - 4]], 'blue', 1.3);
    const glass = wallRect(H, 'ne', 0.7, 7.71, 1.4, 3.14, -0.08);
    surface(H, R, glass, 'teal', 0.18);
    for (const z of [1.33, 3.21]) timber(H, R, 0.58, 0.16, 7.26, 0.17, z, 0.09, 'teal');
    for (const i of [0.6, 7.72]) timber(H, R, i, 0.15, 0.12, 0.19, 1.34, 1.95, 'teal');
    for (let n = 0; n < 12; n++)
      for (const z of [1.26, 3.38]) {
        const p = H.p(0.72 + n * 0.632, 0.3, z);
        surface(H, R, ell(...p, 3.6, 3.6), 'sun', 0.8);
        H.dot(p[0] - 1, p[1] - 1, 1.6, 'paper', 1);
      }
    cabinetFrame(H, R, 0.49, 0.41, 7.6, 1.79, 0.03, 1.07, 4, 'sun', (i, j, w, d, z, h, n) => {
      for (let row = 0; row < 2; row++) {
        timber(H, R, i, j, w, d, z + row * 0.39, 0.065, 'sun');
        foldedCloth(H, R, i + 0.13, j + 0.17, w - 0.24, d - 0.28, z + 0.09 + row * 0.39, row ? 'paper' : 'coral', 'teal');
      }
    });
    timber(H, R, 0.43, 0.37, 7.72, 1.92, 1.13, 0.14, 'sun');
    for (const i of [1.1, 3.51, 6.69]) {
      shallowTray(H, R, i, 0.81, 0.96, 0.9, 1.3, 'teal');
      for (let n = 0; n < 3; n++) vessel(H, R, i + 0.18 + n * 0.29, 1.21, 1.34, 3.8, 7 + (n % 2) * 5, ['coral', 'paper', 'sun'][n]);
    }
    shallowTray(H,R,4.47,1.54,1.32,0.47,1.31,'coral');
    for(let n=0;n<5;n++) {
      const [x,y]=H.p(4.68+n*0.21,1.8,1.42);
      H.line(R,[[x-2,y-2],[x+2,y-7],[x+5,y-4],[x+1,y+1]],'sun',0.8);
    }
    for(const i of [2.71,5.27]) {
      const [x,y]=H.p(i,1.1,1.3);
      oval(H,R,x,y,10,5,'sun',0.6);
      oval(H,R,x+12,y-3,10,5,'paper',1);
      surface(H,R,[[x-7,y-9],[x+7,y-9],[x+7,y],[x-7,y]],'teal',0.6);
      oval(H,R,x,y-9,7,4,'paper',1);
    }
    bentTube(H,R,[[7.85,0.35,1.31],[7.85,0.35,0.26],[7.15,0.35,0.26]],1.4,'blue');
    metal(H,R,7.01,0.27,0.35,0.1,0.19,0.3,'paper');
    boundBook(H, R, 4.31, 0.91, 1.13, 0.75, 1.31, 'paper');
    handTool(H, R, 6.4, 1.85, 1.32, 'brush', 'teal');
    stool(H, R, 2.88, 2.87, 'coral');
    benchFrame(H, R, 0.59, 2.83, 2.23, 1.16, 1.13, 'sun');
    foldedCloth(H, R, 0.77, 3.07, 0.83, 0.68, 1.17, 'paper', 'teal');
    shallowTray(H, R, 1.79, 2.97, 0.83, 0.78, 1.17, 'teal');
    for (let n = 0; n < 3; n++) {
      const [x, y] = H.p(1.96 + n * 0.23, 3.29, 1.42);
      oval(H, R, x, y + 7, 3.6, 1.7, 'sun', 0.83);
      surface(H, R, [[x - 2.5, y - 4], [x + 2.5, y - 4], [x + 2.5, y + 7], [x - 2.5, y + 7]], ['paper', 'teal', 'coral'][n], 0.85);
      oval(H, R, x, y - 4, 3.6, 1.7, 'sun', 0.83);
      H.dot(x, y - 4, 1, 'blue');
    }
    const [scissorX, scissorY] = H.p(1.58, 3.76, 1.19);
    for (const dy of [-3, 3]) oval(H, R, scissorX - 9, scissorY + dy, 4, 2.8, 'teal', 0.7);
    surface(H, R, [[scissorX - 4, scissorY - 2], [scissorX + 13, scissorY], [scissorX - 4, scissorY + 2]], 'paper', 1, 0.7);
    H.line(R, [[scissorX - 3, scissorY], [scissorX + 12, scissorY]], 'blue', 0.7);
    H.dot(scissorX - 2, scissorY, 1.2, 'sun');
    cabinetFrame(H, R, 8.69, 0.53, 2.65, 3.46, 0.04, 3.71, 1, 'teal', (i, j, w, d, z, h) => {
      bentTube(
        H,
        R,
        [
          [i + 0.19, j + 0.27, z + 2.73],
          [i + w - 0.19, j + 0.27, z + 2.73]
        ],
        2.7,
        'sun'
      );
      for (let n = 0; n < 5; n++) {
        const x = i + 0.31 + n * 0.44;
        const hanger = [H.p(x, j + 0.31, z + 2.8), H.p(x - 0.25, j + 0.31, z + 2.5), H.p(x + 0.25, j + 0.31, z + 2.5), H.p(x, j + 0.31, z + 2.8)];
        H.line(R, hanger, 'sun', 1);
        surface(
          H,
          R,
          [H.p(x - 0.26, j + 0.33, z + 2.51), H.p(x + 0.26, j + 0.33, z + 2.51), H.p(x + 0.4, j + 0.42, z + 0.65), H.p(x - 0.37, j + 0.42, z + 0.65)],
          n % 2 ? 'coral' : 'paper',
          n % 2 ? 0.63 : 1,
          0.7
        );
        for (let k = 0; k < 3; k++)
          H.line(R, [H.p(x - 0.18 + k * 0.16, j + 0.44, z + 0.7), H.p(x - 0.12 + k * 0.13, j + 0.37, z + 2.3)], 'teal', 0.65);
      }
      timber(H, R, i, j, w, d, z + 0.17, 0.1, 'sun');
      for (let n = 0; n < 3; n++) boundBook(H, R, i + 0.17, j + 0.73 + n * 0.72, w - 0.34, 0.51, z + 0.29, 'sun');
    });
    for(const i of [8.76,11.19]) timber(H,R,i,0.58,0.12,3.31,3.6,0.14,'sun');
    for(const j of [0.68,3.7]) {
      timber(H,R,8.79,j,0.13,0.12,0.12,3.44,'teal');
      timber(H,R,11.1,j,0.13,0.12,0.12,3.44,'teal');
      for(const z of [0.27,3.34]) metal(H,R,8.73,j,0.18,0.2,z,0.17,'sun');
    }
    foldedCloth(H,R,9.1,2.76,1.83,0.58,0.6,'coral','paper');
    for (const j of [4.27, 6.58]) {
      metal(H, R, 0.5, j, 0.14, 0.14, 0.03, 3.05, 'teal');
      bentTube(
        H,
        R,
        [
          [0.57, j, 3.04],
          [2.14, j, 3.04]
        ],
        2.5,
        'teal'
      );
    }
    for (let n = 0; n < 5; n++) {
      const j = 4.37 + n * 0.44;
      surface(H, R, [H.p(0.7, j, 2.81), H.p(1.6, j, 2.81), H.p(1.91, j, 1.14), H.p(0.53, j, 1.14)], n % 2 ? 'sun' : 'coral', 0.51, 0.7);
    }
    shelfUnit(H, R, 0.48, 8.01, 1.56, 2.7, 0.07, [0.17, 1.02, 1.86], 'teal');
    for (const j of [8.46, 9.65]) for (const d of [0, 0.42]) {
      const [x, y] = H.p(1.27, j + d, 0.35);
      oval(H, R, x, y, 11, 4.4, 'blue', 0.76);
      oval(H, R, x + 6, y - 3, 5, 3.8, 'teal', 0.7);
      H.line(R, [[x - 8, y + 3], [x + 9, y + 3]], 'paper', 0.8);
    }
    boundBook(H, R, 0.68, 8.37, 1.15, 1.27, 1.14, 'paper');
    liddedTin(H, R, 1.2, 9.28, 1.98, 19, 18, 'coral');
    satchel(H, R, 2.06, 7.4, 0.07, 'teal', 0.9);
    slattedSeat(H, R, 6.92, 7.6, 3.67, 0.25, 'sun', 0.57);
    cushion(H, R, 7.81, 7.79, 1.35, 0.64, 0.9, 0.16, 'teal');
    metal(H, R, 2.93, 8.78, 2.39, 1.77, 0.18, 0.91, 'teal');
    for (const i of [3.0, 5.18]) for (const j of [8.85, 10.4]) caster(H, R, i, j, 0.15, 0.14, 'blue');
    for (const i of [3.08, 5.0]) metal(H, R, i, 8.73, 0.17, 1.86, 0.98, 0.09, 'sun');
    surface(H,R,H.tile(3.16,8.99,1.95,1.27,1.11),'blue',0.7);
    for(const i of [3.1,5.06]) for(const j of [8.95,10.36]) metal(H,R,i,j,0.18,0.14,0.29,0.73,'sun');
    surface(H,R,[H.p(2.96,8.82,1.13),H.p(5.3,8.82,1.13),H.p(5.3,8.48,2.18),H.p(2.96,8.48,2.18)],'coral',0.49,1.3);
    surface(H,R,[H.p(3.13,8.81,1.28),H.p(5.12,8.81,1.28),H.p(5.12,8.56,2.02),H.p(3.13,8.56,2.02)],'paper',0.8);
    for(const i of [3.22,4.84]) H.line(R,[H.p(i,9.2,1.12),H.p(i,8.58,1.91)],'teal',1.5);
    foldedCloth(H,R,3.3,9.2,1.52,0.87,1.14,'paper','coral');
    shallowTray(H,R,3.4,10.08,1.31,0.34,1.16,'sun');
    for(let n=0;n<4;n++) oval(H,R,...H.p(3.6+n*0.28,10.22,1.32),3,3,'teal',0.6);

    benchFrame(H, R, 9.82, 9.68, 1.31, 1.13, 0.86, 'sun');
    vessel(H, R, 10.47, 10.21, 0.9, 6, 11, 'paper');
    pendant(H, R, 5.94, 5.51, 4.2, 3.1, 'paper', 0.97);
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    const shift = u < 0.54 ? 0 : u < 0.69 ? (u - 0.54) / 0.15 : u < 0.84 ? 1 : (1 - u) / 0.16;
    const checking = shift * shift * (3 - 2 * shift);
    H.clip(wallRect(H, 'ne', 0.7, 7.71, 1.4, 3.14, -0.08), () => {
      const [x, y] = H.p(5.88, 0.15, 2.03);
      oval(H, R, x, y - 27, 7.5, 8, 'coral', 0.24);
      shape(
        H,
        R,
        [
          [x - 9, y - 19],
          [x + 9, y - 19],
          [x + 13, y + 7],
          [x - 11, y + 7]
        ],
        'teal',
        0.32,
        0.5
      );
      H.line(
        R,
        [
          [x - 9, y - 11],
          [x - 14, y + 1],
          [x + 4 - checking * 14, y - 7 + checking * 16]
        ],
        'teal',
        4,
        { tone: 0.4 }
      );
    });
    actor(
      H,
      R,
      5.78,
      3.42,
      t,
      'newYorkStageCuff',
      {
        shirt: ['teal', 0.73],
        pants: ['blue', 0.78],
        hairStyle: 'curly',
        face: 'nw',
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          shape(
            h,
            r,
            [
              [x - 5, y - 4],
              [x + 2, y - 7],
              [x + 6, y],
              [x - 1, y + 4]
            ],
            'paper',
            1,
            0.65
          );
          H.dot(x, y - 1, 1.4, 'sun', 1);
        }
      },
      0,
      1.35
    );
    actor(
      H,
      R,
      8.52,
      8.02,
      t,
      'newYorkStageLaces',
      {
        shirt: ['coral', 0.68],
        hairStyle: 'short',
        prop(h, r, points) {
          if (u < 0.68 || u > 0.94) {
            const a = points.nearHand,
              b = points.farHand;
            stroke(
              h,
              r,
              [
                [a[0], a[1]],
                [a[0] + 3, a[1] + 7],
                [b[0] - 3, b[1] + 7],
                [b[0], b[1]]
              ],
              'paper',
              0.95
            );
          }
        }
      },
      0.25,
      1.28
    );
    const [x, y] = H.p(0.22, 7.64, 1.11);
    stroke(
      H,
      R,
      [
        [x - 4, y - 23],
        [x + Math.sin(u * TAU) * 2, y],
        [x - 4, y + 13]
      ],
      'coral',
      1.1,
      0.65
    );
  }
);

room.loopSeconds = 16;
room.stillTime = 0;
export default room;
