import { benchFrame, bentTube, cushion, metal, surface } from '../materials.js';

import { TAU, actor, box, cycle, ell, oval, shape, world } from '../../worlds/common.js';
import { foldedCloth, satchel, boundBook } from '../furnishings.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const looking = { ...rest, lean: -4, head: 16, al: 24, ar: 27, el: 36, er: 32 };
FIGURES.clips.newYorkPanoramaFind = {
  dur: 18,
  keys: [
    [0, looking],
    [0.13, looking],
    [0.3, { ...looking, ar: 106, er: 4, head: 21 }],
    [0.53, { ...looking, ar: 104, er: 8, head: 19 }],
    [0.66, { ...looking, ar: 95, er: 13, head: 14 }],
    [0.8, looking],
    [1, looking]
  ]
};
FIGURES.clips.newYorkPanoramaWheelFind = {
  dur: 18,
  keys: FIGURES.clips.newYorkPanoramaFind.keys.map(([time, pose]) => [time, { ...pose, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80 }])
};
FIGURES.clips.newYorkPanoramaLean = {
  dur: 18,
  keys: [
    [0, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }],
    [0.24, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }],
    [0.48, { ...rest, al: 55, ar: 59, el: 30, er: 27, head: 24, lean: -9 }],
    [0.7, { ...rest, al: 55, ar: 59, el: 30, er: 27, head: 24, lean: -9 }],
    [0.91, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }],
    [1, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }]
  ]
};

function modelBlock(H, R, i, j, w, d, height, ink = 'paper') {
  box(H, R, i, j, w, d, 0.77, height, ink, ink === 'paper' ? 1 : 0.6);
  if (height > 0.36) {
    for (let z = 0.88; z < 0.77 + height - 0.04; z += 0.15)
      H.line(R, [H.p(i + 0.035, j + d + 0.007, z), H.p(i + w - 0.035, j + d + 0.007, z)], 'blue', 0.45, { tone: 0.55, amp: 0.02 });
    box(H, R, i + w * 0.17, j + d * 0.17, w * 0.66, d * 0.66, 0.77 + height, 0.05, 'sun', 0.42);
  }
  if (height > 0.45) {
    metal(H, R, i + w * 0.26, j + d * 0.25, w * 0.48, d * 0.5, 0.82 + height, 0.09, 'teal');
    for (let n = 0; n < 3; n++)
      H.line(R, [H.p(i + w * (0.2 + n * 0.27), j + d + 0.014, 0.9), H.p(i + w * (0.2 + n * 0.27), j + d + 0.014, 0.73 + height)], 'teal', 0.4);
  } else if (height > 0.17) {
    surface(H, R, [H.p(i, j, 0.77 + height), H.p(i + w, j, 0.77 + height), H.p(i + w * 0.5, j + d * 0.4, 0.86 + height)], 'coral', 0.35, 0.25);
  }
}

function cityModel(H, R) {
  const rim = [
    [2.43, 2.06],
    [8.81, 2.06],
    [9.52, 2.77],
    [9.52, 8.36],
    [8.83, 9.08],
    [3.02, 9.08],
    [2.29, 8.31],
    [2.29, 2.8]
  ];
  for (const [i, j] of [
    [2.7, 2.6],
    [8.84, 2.6],
    [2.7, 8.31],
    [8.84, 8.31]
  ])
    metal(H, R, i, j, 0.26, 0.29, 0.04, 0.55, 'teal');
  surface(
    H,
    R,
    rim.map(([i, j]) => H.p(i, j, 0.73)),
    'teal',
    0.63,
    2.1
  );
  for (let n = 0; n < rim.length; n++) {
    const a = rim[n],
      b = rim[(n + 1) % rim.length];
    surface(H, R, [H.p(...a, 0.73), H.p(...b, 0.73), H.p(...b, 0.47), H.p(...a, 0.47)], 'paper', 1, 0.6);
  }
  const lands = [
    [
      [2.63, 2.4],
      [4.27, 2.4],
      [4.62, 3.02],
      [4.07, 4.44],
      [3.91, 6.28],
      [2.64, 6.39]
    ],
    [
      [5.55, 2.38],
      [9.14, 2.73],
      [9.13, 4.92],
      [7.12, 5.47],
      [6.31, 4.73]
    ],
    [
      [6.77, 5.74],
      [9.17, 5.51],
      [9.17, 8.42],
      [8.6, 8.76],
      [5.78, 8.76],
      [5.72, 7.93]
    ],
    [
      [4.82, 3.0],
      [5.27, 3.09],
      [6.24, 6.64],
      [5.7, 7.4],
      [5.14, 6.64],
      [4.4, 4.24]
    ],
    [
      [2.74, 7.37],
      [3.8, 6.93],
      [4.65, 7.58],
      [4.49, 8.75],
      [3.15, 8.75],
      [2.64, 8.15]
    ]
  ];
  for (const land of lands)
    surface(
      H,
      R,
      land.map(([i, j]) => H.p(i, j, 0.77)),
      'sun',
      0.23,
      0.8
    );
  const inside = (x, y, poly) => {
    let hit = false;
    for (let a = 0, b = poly.length - 1; a < poly.length; b = a++) {
      const [ax, ay] = poly[a],
        [bx, by] = poly[b];
      if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) hit = !hit;
    }
    return hit;
  };
  for (let row = 0; row < 17; row++)
    for (let col = 0; col < 18; col++) {
      const i = 2.77 + col * 0.348, j = 2.56 + row * 0.36;
      if (!lands.some(poly => inside(i,j,poly) && inside(i+0.19,j+0.19,poly))) continue;
      if (i > 4.57 && i < 5.31 && j > 3.76 && j < 4.51) continue;
      if(i<4.35 || i>6.45 || j>7.15) continue;
      const height=0.23+(row%4)*0.17;
      modelBlock(H,R,i,j,0.22,0.24,height,col%4?'paper':'coral');
    }
  for(const [i,j,w,d,h] of [[2.84,2.77,0.38,1.32,0.48],[3.47,2.79,0.44,0.8,0.37],[2.83,4.45,0.45,1.49,0.32],[3.5,4.32,0.36,1.05,0.56]]) {
    modelBlock(H,R,i,j,w,d,h,'coral');
    for(let n=0;n<4;n++) {
      H.line(R,[H.p(i+w+0.01,j+0.13+n*d/4,0.88),H.p(i+w+0.01,j+0.13+n*d/4,0.73+h)],'paper',0.7);
      box(H,R,i+w-0.04,j+0.1+n*d/4,0.12,0.09,0.79+h,0.08,'teal',0.7);
    }
  }
  for(const [i,j] of [[6.35,2.87],[7.66,3.73],[6.62,4.18]]) {
    surface(H,R,H.tile(i-0.04,j-0.04,1.13,0.91,0.79),'teal',0.32,0.3);
    modelBlock(H,R,i,j,1.02,0.19,0.37,'paper');
    modelBlock(H,R,i,j+0.19,0.2,0.58,0.37,'paper');
    modelBlock(H,R,i+0.82,j+0.19,0.2,0.58,0.37,'paper');
    modelBlock(H,R,i+0.2,j+0.58,0.62,0.19,0.26,'coral');
    oval(H,R,...H.p(i+0.53,j+0.43,0.81),3.6,1.8,'sun',0.8);
    for(const x of [i+0.27,i+0.54,i+0.8]) H.line(R,[H.p(x,j+0.2,0.9),H.p(x,j+0.2,1.08)],'blue',0.6);
  }
  for(const [i,j] of [[7.77,2.98],[8.37,2.94],[8.46,4.53],[7.27,4.96]]) {
    modelBlock(H,R,i,j,0.38,0.44,0.21,'sun');
    surface(H,R,[H.p(i-0.04,j-0.03,1.01),H.p(i+0.19,j-0.03,1.2),H.p(i+0.43,j-0.03,1.01),H.p(i+0.43,j+0.48,1.01),H.p(i+0.19,j+0.48,1.2),H.p(i-0.04,j+0.48,1.01)],'coral',0.68,0.45);
    box(H,R,i+0.04,j+0.09,0.08,0.08,1.12,0.14,'paper',1);
  }
  for(const j of [6.22,6.88,8.22]) for(let n=0;n<6;n++) {
    const i=6.84+n*0.35;
    if(j>8 && i>8.4) continue;
    modelBlock(H,R,i,j,0.29,0.44,0.21+(n%3)*0.07,n%3===1?'coral':'paper');
    box(H,R,i+0.08,j+0.45,0.11,0.16,0.78,0.065,'sun',0.55);
    H.line(R,[H.p(i+0.07,j+0.45,0.93),H.p(i+0.22,j+0.45,0.93)],'blue',0.6);
  }
  surface(H,R,H.tile(2.94,7.32,1.18,1.2,0.8),'teal',0.62,0.4);
  surface(H,R,H.tile(3.07,7.45,0.94,0.92,0.81),'sun',0.2,0.3);
  modelBlock(H,R,3.11,7.55,0.77,0.57,0.28,'paper');
  const [dx,dy]=H.p(3.49,7.84,1.15);
  oval(H,R,dx,dy,9,5.5,'teal',0.62);
  surface(H,R,[[dx-9,dy],[dx-7,dy-6],[dx,dy-11],[dx+7,dy-6],[dx+9,dy]],'paper',1,0.7);
  H.line(R,[[dx,dy-10],[dx,dy-17]],'sun',0.8);
  for(const [i,j] of [[2.83,7.33],[4.14,7.68],[3.09,8.56],[4.0,8.48]]) {
    oval(H,R,...H.p(i,j,0.9),4.2,4.2,'teal',0.7);
    H.line(R,[H.p(i,j,0.8),H.p(i,j,0.94)],'sun',0.8);
  }
  surface(H, R, [H.p(4.67, 3.87, 0.81), H.p(4.98, 3.95, 0.81), H.p(5.21, 4.57, 0.81), H.p(4.92, 4.48, 0.81)], 'teal', 0.85);
  for (const [i, j, h] of [
    [5.11, 4.72, 0.88],
    [5.61, 5.43, 1.04],
    [5.82, 6.48, 0.91]
  ]) {
    modelBlock(H, R, i, j, 0.2, 0.23, h);
    metal(H, R, i + 0.055, j + 0.055, 0.09, 0.12, 0.77 + h, 0.16, 'paper');
    H.line(R, [H.p(i + 0.1, j + 0.1, 0.93 + h), H.p(i + 0.1, j + 0.1, 1.17 + h)], 'blue', 0.6);
  }
  for (const [a, b, c, d] of [
    [3.91, 4.92, 4.67, 4.82],
    [5.71, 5.11, 6.64, 4.94],
    [6.04, 6.27, 6.87, 6.36],
    [4.36, 7.96, 5.85, 8.0]
  ]) {
    bentTube(
      H,
      R,
      [
        [a, b, 0.91],
        [c, d, 0.91]
      ],
      3.5,
      'paper'
    );
    for (const f of [0.22, 0.77]) {
      const i = a + (c - a) * f,
        j = b + (d - b) * f;
      H.line(R, [H.p(i, j, 0.78), H.p(i, j, 1.21)], 'coral', 1);
    }
    H.line(
      R,
      [
        H.p(a, b, 0.96),
        H.p(a + (c - a) * 0.22, b + (d - b) * 0.22, 1.21),
        H.p((a + c) / 2, (b + d) / 2, 1.02),
        H.p(a + (c - a) * 0.77, b + (d - b) * 0.77, 1.21),
        H.p(c, d, 0.96)
      ],
      'blue',
      0.6
    );
  }
  surface(H, R, H.tile(7.67, 2.63, 1.23, 0.19, 0.81), 'blue', 0.6);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(7.74 + n * 0.16, 2.72, 0.82), H.p(7.81 + n * 0.16, 2.72, 0.82)], 'paper', 0.85);
  const stadium = ell(...H.p(8.31, 5.83, 0.86), 9, 5);
  surface(H, R, stadium, 'paper', 1);
  surface(H, R, ell(...H.p(8.31, 5.83, 0.87), 5, 2.5), 'teal', 0.5);
  for (let n = 0; n < 9; n++) {
    const i = 2.85 + n * 0.48;
    H.line(R, [H.p(i, 6.52, 0.81), H.p(i + 0.22, 6.52, 0.81)], 'paper', 1.1);
  }
}

function rail(H, R, from, to, posts, z = 1.43) {
  const pane = [H.p(...from, 0.65), H.p(...to, 0.65), H.p(...to, z), H.p(...from, z)];
  H.tint(pane, 'teal', 0.07);
  H.outline(R, pane, 'paper', 0.6);
  H.line(R, [H.p(...from, z), H.p(...to, z)], 'teal', 2.3);
  for (let n = 0; n <= posts; n++) {
    const i = from[0] + ((to[0] - from[0]) * n) / posts,
      j = from[1] + ((to[1] - from[1]) * n) / posts;
    metal(H, R, i - 0.035, j - 0.035, 0.07, 0.07, 0.05, z - 0.05, 'teal');
    surface(H, R, ell(...H.p(i, j, 0.06), 3.4, 1.7), 'blue', 0.56);
  }
}

function wheelchair(H, R, i, j, t) {
  const [x, y] = H.p(i, j, 0.11);
  oval(H, R, x - 10, y - 7, 13, 15, 'blue', 0.6);
  oval(H, R, x - 10, y - 7, 10, 12, 'paper', 1);
  H.line(
    R,
    [
      [x + 4, y - 12],
      [x - 16, y - 12],
      [x - 27, y + 6],
      [x - 36, y + 6]
    ],
    'blue',
    2.5
  );
  H.line(
    R,
    [
      [x + 9, y - 8],
      [x + 9, y - 32],
      [x + 16, y - 35]
    ],
    'blue',
    2.5
  );
  H.line(
    R,
    [
      [x - 11, y - 17],
      [x - 11, y - 29],
      [x + 7, y - 29]
    ],
    'blue',
    2
  );
  shape(
    H,
    R,
    [
      [x - 13, y - 17],
      [x + 9, y - 15],
      [x + 9, y - 29],
      [x - 13, y - 31]
    ],
    'teal',
    0.65,
    0.7
  );
  actor(H, R, i, j, t, 'newYorkPanoramaWheelFind', { shirt: ['coral', 0.66], hairStyle: 'curly', face: 'sw' }, 0.29, 1.3);
  oval(H, R, x + 12, y - 7, 15, 17, 'blue', 0.72);
  oval(H, R, x + 12, y - 7, 12, 14, 'paper', 1);
  for (let k = 0; k < 8; k++) {
    const a = (k * TAU) / 8;
    H.line(
      R,
      [
        [x + 12, y - 7],
        [x + 12 + Math.cos(a) * 11, y - 7 + Math.sin(a) * 13]
      ],
      'blue',
      0.65
    );
  }
  H.dot(x + 12, y - 7, 2.4, 'teal', 0.9);
  H.line(
    R,
    [
      [x + 12, y - 7],
      [x - 17, y + 7],
      [x - 27, y + 7]
    ],
    'blue',
    2
  );
  oval(H, R, x - 26, y + 9, 4, 5, 'blue', 0.8);
  H.line(
    R,
    [
      [x - 28, y + 6],
      [x - 39, y + 5]
    ],
    'teal',
    3.2
  );
}

const room = world(
  'new-york-queens-panorama',
  'Flushing Meadows · A City on a Table',
  { floor: 'paper', tone: 1, wall: false, head: 115 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.025), 'blue', 0.32);
    for (let n = 0; n < 8; n++) {
      H.line(R, [H.p(n * 1.5, 0.05, 0.03), H.p(n * 1.5, 11.95, 0.03)], 'paper', 0.75);
      H.line(R, [H.p(0.05, n * 1.5, 0.03), H.p(11.95, n * 1.5, 0.03)], 'paper', 0.75);
    }
    surface(H, R, H.faceJ(0.12, 0.12, 11.76, 0, 4.11), 'blue', 0.75);
    surface(H, R, H.faceI(0.12, 0.12, 11.76, 0, 4.11), 'blue', 0.72);
    for(const j of [0.62,4.37,8.1]) {
      surface(H,R,H.faceJ(0.18,j,3.12,1.25,3.61),'teal',0.63,1.4);
      surface(H,R,H.faceJ(0.22,j+0.14,2.84,1.42,3.44),'paper',1);
      const P=(u,z)=>H.p(0.25,j+u,z);
      if(j<2) {
        surface(H,R,[P(0.29,1.65),P(1.16,2.32),P(1.35,3.2),P(1.66,3.18),P(1.52,2.29),P(2.65,1.71),P(2.4,1.55),P(1.37,2.1)],'teal',0.55);
        for(const [u,z,w,h] of [[0.31,2.33,0.57,0.9],[1.76,2.55,0.87,0.59],[1.92,1.92,0.8,0.31]]) {
          surface(H,R,[P(u,z),P(u+w,z),P(u+w,z+h),P(u,z+h)],'sun',0.23);
          for(let n=1;n<4;n++) H.line(R,[P(u+n*w/4,z),P(u+n*w/4,z+h)],'coral',0.6);
        }
      } else if(j<6) {
        surface(H,R,[P(0.25,1.72),P(2.88,1.72),P(2.88,1.9),P(0.25,1.9)],'teal',0.3);
        H.line(R,[P(0.27,2.15),P(2.86,2.15)],'blue',2.2);
        for(const u of [0.87,2.18]) {
          surface(H,R,[P(u-0.08,1.87),P(u+0.08,1.87),P(u+0.08,3.08),P(u-0.08,3.08)],'coral',0.7);
          H.line(R,[P(u-0.13,2.8),P(u+0.13,2.8)],'sun',1.2);
        }
        H.line(R,[P(0.26,2.17),P(0.87,3.08),P(1.18,2.69),P(1.52,2.56),P(1.85,2.7),P(2.18,3.08),P(2.85,2.17)],'blue',1.2);
        for(let n=0;n<6;n++) H.line(R,[P(1+n*0.2,2.16),P(1+n*0.2,2.57+Math.abs(2.5-n)*0.12)],'teal',0.7);
      } else {
        for(const [u,z,w,h,ink] of [[0.28,1.67,0.41,0.66,'coral'],[0.92,1.67,0.48,1.26,'teal'],[1.61,1.67,0.29,1.68,'blue'],[2.11,1.67,0.57,0.96,'sun']]) {
          surface(H,R,[P(u,z),P(u+w,z),P(u+w,z+h),P(u,z+h)],ink,0.55);
          surface(H,R,[P(u,z+h),P(u+w,z+h),P(u+w-0.11,z+h+0.11),P(u-0.11,z+h+0.11)],'paper',1);
          for(let n=1;n<h/0.19;n++) H.line(R,[P(u+0.06,z+n*0.19),P(u+w-0.05,z+n*0.19)],'paper',0.75);
        }
        H.line(R,[P(0.25,1.56),P(2.77,1.56)],'blue',1);
      }
      metal(H,R,0.22,j+0.13,0.45,2.88,1.13,0.09,'teal');
    }
    for(const j of [0.44,4.03,7.71,11.5]) metal(H,R,0.15,j,0.25,0.17,0.04,4.12,'teal');
    for(const z of [0.15,3.94]) metal(H,R,0.12,0.13,0.23,11.7,z,0.13,'paper');
    surface(H,R,H.faceI(1.31,0.22,9.27,1.8,3.35),'blue',0.86);
    const E=(u,z)=>H.p(u,0.24,z);
    surface(H,R,[E(1.62,2.03),E(2.71,2.13),E(3.05,2.42),E(3.37,2.31),E(4.03,2.52),E(5.13,2.16),E(5.88,2.28),E(6.23,2.61),E(6.51,2.21),E(7.04,2.4),E(7.87,2.33),E(8.16,2.77),E(8.58,2.92),E(8.88,2.43),E(10.29,2.05),E(10.29,1.98),E(1.62,1.98)],'teal',0.54);
    H.line(R,[E(1.65,2.56),E(3.09,2.84),E(4.62,2.74),E(5.89,3.04),E(7.71,2.86),E(9.95,3.08)],'sun',1.5);
    for(const u of [2.1,4.17,6.14,8.19,10.1]) H.line(R,[E(u,1.9),E(u,3.19)],'paper',0.55,{tone:0.37});
    for (const i of [0.31, 11.46]) metal(H, R, i, 0.37, 0.2, 0.26, 0.04, 4.29, 'paper');
    metal(H, R, 0.28, 0.32, 11.4, 0.25, 4.27, 0.16, 'teal');
    for (const j of [1.45, 5.51, 9.59]) {
      metal(H, R, 0.31, j, 11.32, 0.1, 3.92, 0.1, 'blue');
      for (let n = 0; n < 5; n++) {
        const i = 1.02 + n * 2.31;
        metal(H, R, i, j, 0.19, 0.23, 3.69, 0.23, 'blue');
        surface(H, R, ell(...H.p(i + 0.09, j + 0.25, 3.72), 3.1, 1.7), 'sun', 0.83);
      }
    }
    for(const j of [2.92,5.18,7.45]) {
      surface(H,R,H.faceJ(2.27,j,1.83,0.2,0.65),'blue',0.7);
      surface(H,R,H.faceJ(2.29,j+0.08,1.67,0.24,0.61),'teal',0.55);
      for(const y of [j+0.19,j+1.5]) H.line(R,[H.p(2.32,y,0.41),H.p(2.32,y+0.15,0.41)],'sun',1.7);
    }
    const [lx,ly]=H.p(6.4,5.6,0.04);
    H.glow(lx,ly,182,88,'sun',0.15);
    cityModel(H, R);
    for(const [i,j] of [[3.07,3.12],[7.14,7.52]]) {
      metal(H,R,i,j,0.87,0.73,0.78,0.11,'coral');
      for(let k=0;k<4;k++) surface(H,R,[H.p(i+k*0.21,j,0.9),H.p(i+k*0.21+0.1,j,1.03),H.p(i+k*0.21+0.2,j,0.9),H.p(i+k*0.21+0.2,j+0.73,0.9),H.p(i+k*0.21+0.1,j+0.73,1.03),H.p(i+k*0.21,j+0.73,0.9)],'paper',1,0.3);
    }
    for(let n=0;n<5;n++) {
      const j=7.43+n*0.17;
      H.line(R,[H.p(7.28,j,0.91),H.p(8.8,j,0.91)],'blue',0.7);
      for(let k=0;k<4;k++) metal(H,R,7.43+k*0.31,j,0.25,0.09,0.92,0.08,n%2?'paper':'coral');
    }
    for(const [i,j] of [[3.45,6.22],[8.97,4.01],[6.34,7.25]]) {
      metal(H,R,i,j,0.1,0.5,0.8,0.04,'paper');
      bentTube(H,R,[[i,j+0.25,0.85],[i,j+0.25,1.1],[i-0.27,j+0.25,1.1]],0.8,'sun');
    }
    for(const j of [2.6,5.0,7.4]) {
      surface(H,R,H.tile(0.43,j,0.53,0.9,0.07),'blue',0.8);
      for(let n=0;n<5;n++) H.line(R,[H.p(0.5,j+0.11+n*0.16,0.08),H.p(0.89,j+0.11+n*0.16,0.08)],'paper',0.7);
    }

    rail(H, R, [1.63, 1.62], [1.63, 9.51], 5);
    rail(H, R, [1.63, 1.62], [9.94, 1.62], 6);
    benchFrame(H, R, 2.36, 10.47, 2.84, 1.08, 0.63, 'teal');
    cushion(H, R, 2.41, 10.5, 2.74, 1.02, 0.68, 0.12, 'coral');
    foldedCloth(H,R,2.59,10.66,0.84,0.68,0.81,'paper','teal');
    satchel(H,R,4.58,10.97,0.82,'sun',0.75);
    benchFrame(H,R,0.58,9.89,1.25,1.49,0.83,'teal');
    surface(H,R,H.tile(0.61,9.92,1.18,1.42,0.87),'paper',1);
    for(const [i,j,h] of [[0.75,10.12,0.18],[1.22,10.11,0.36],[0.87,10.66,0.51]]) {
      metal(H,R,i,j,0.32,0.35,0.89,h,'sun');
      metal(H,R,i+0.08,j+0.07,0.17,0.21,0.89+h,0.14,'teal');
    }
    boundBook(H,R,0.73,11.16,0.84,0.15,0.9,'coral');
    metal(H, R, 9.32, 10.24, 1.62, 0.96, 0.05, 0.77, 'teal');
    surface(H, R, [H.p(9.31, 10.23, 0.84), H.p(10.99, 10.23, 0.84), H.p(10.99, 11.23, 0.63), H.p(9.31, 11.23, 0.63)], 'paper', 1);
    for (let n = 0; n < 5; n++)
      H.line(R, [H.p(9.51, 10.42 + n * 0.13, 0.8 - n * 0.027), H.p(10.77, 10.42 + n * 0.13, 0.8 - n * 0.027)], n === 1 ? 'coral' : 'blue', 0.7);
  },
  (H, R, t) => {
    H.at(5.55, 1.2, 0, (h) =>
      actor(
        h,
        R,
        5.55,
        1.2,
        0,
        'hold',
        {
          shirt: ['blue', 0.64],
          hairStyle: 'short',
          prop(hh, rr, p) {
            const [x, y] = p.nearHand;
            shape(
              hh,
              rr,
              [
                [x - 6, y - 7],
                [x + 8, y - 4],
                [x + 8, y + 7],
                [x - 6, y + 4]
              ],
              'paper',
              1,
              0.6
            );
            hh.line(
              rr,
              [
                [x - 3, y - 2],
                [x + 5, y]
              ],
              'teal',
              0.8
            );
          }
        },
        0.1,
        1.25
      )
    );
    H.at(10.68, 5.37, 0, (h) => wheelchair(h, R, 10.68, 5.37, t));
    H.at(10.64, 6.62, 0, (h) =>
      actor(h, R, 10.64, 6.62, t, 'newYorkPanoramaLean', { shirt: ['sun', 0.78], hairStyle: 'short', face: 'sw' }, 0.2, 1.4, 'child')
    );
    H.at(6.68, 9.98, 0, (h) =>
      actor(h, R, 6.68, 9.98, t, 'newYorkPanoramaFind', { shirt: ['teal', 0.68], hairStyle: 'pony', face: 'nw' }, 0.15, 1.25)
    );
    H.at(7.73, 10.25, 0, (h) =>
      actor(h, R, 7.73, 10.25, 0, 'hold', { shirt: ['paper', 1], hairStyle: 'bald', face: 'nw', glasses: true }, 0.15, 1.2, 'elder')
    );
    H.at(9.94, 7.14, 0, (h) => rail(h, R, [9.94, 1.62], [9.94, 9.51], 5));
    H.at(6.39, 9.51, 0, (h) => rail(h, R, [1.63, 9.51], [9.94, 9.51], 6));
    const u = cycle(t, 18),
      [x, y] = H.p(9.7, 10.91, 0.64);
    H.dot(x, y, 1.6, 'sun', 0.65 + Math.sin(u * TAU) * 0.12);
  }
);

room.loopSeconds = 18;
room.stillTime = 8;
export default room;
