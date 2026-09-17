import { slattedSeat, metal } from '../materials.js';
import { windowBay, cityView } from '../joinery.js';
import { drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, actor, cycle, ell, TAU, glow } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const watch = { ...rest, al: 46, ar: 53, el: 66, er: 62, head: -8 };
FIGURES.clips.hongKongFerryLook = { dur: 16, keys: [[0, watch], [.16, watch], [.3, { ...watch, al: 109, ar: 115, el: 60, er: 66, head: -14 }], [.62, { ...watch, al: 109, ar: 115, el: 60, er: 66, head: -20, lean: 3 }], [.77, watch], [1, watch]] };
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 32, el: 28, er: 38 };
FIGURES.clips.hongKongFerrySit = { dur: 16, keys: [[0, seated], [.3, { ...seated, head: -12 }], [.62, { ...seated, head: -12, al: 33 }], [.84, seated], [1, seated]] };

function seat(H, R, i, j, width = 4.9) {
  slattedSeat(H, R, i, j, width, 0, 'sun', 0.81);
  for (let n = 0; n < 3; n++) metal(H, R, i + 0.42 + (n * (width - 0.84)) / 2, j + 0.17, 0.1, 0.1, 0.73, 0.68, 'teal');
}


function lifering(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 19, 21, 'paper', 1);
  oval(H, R, x, y, 11, 12, 'teal', .46);
  for (const a of [.2, 1.77, 3.34, 4.91]) {
    const outer = [], inner = [];
    for (let q = 0; q < 6; q++) {
      const angle = a + q * .08;
      outer.push([x + Math.cos(angle) * 19, y + Math.sin(angle) * 21]);
      inner.unshift([x + Math.cos(angle) * 11, y + Math.sin(angle) * 12]);
    }
    shape(H, R, outer.concat(inner), 'coral', .75, .5);
  }
  H.outline(R, ell(x, y, 22, 24), 'sun', 1.2, { tone: .75, amp: .15 });
}

function luggage(H, R, i, j) {
  box(H, R, i, j, .72, .5, .07, .95, 'coral', .6);
  H.line(R, [H.p(i + .14, j + .28, 1.03), H.p(i + .14, j + .28, 1.45), H.p(i + .58, j + .28, 1.45), H.p(i + .58, j + .28, 1.03)], 'blue', 1.5);
  for (const a of [i + .12, i + .58]) oval(H, R, ...H.p(a, j + .45, .06), 2.8, 3.5, 'blue', .9);
  H.line(R, [H.p(i + .34, j + .51, .18), H.p(i + .34, j + .51, .86)], 'paper', 1.3);
  H.dot(...H.p(i + .56, j + .51, .7), 2, 'sun', .9);
}

function harbourFerryDetails(H, R) {
  drawerUnit(H, R, 9.72, 2.03, 1.6, 0.74, 1.23, 2, 'paper');
  liddedTin(H, R, 10.65, 2.38, 1.43, 6, 19, 'teal');
  shallowTray(H, R, 9.91, 2.14, 0.62, 0.46, 1.43, 'sun');
  handTool(H, R, 10.19, 2.38, 1.64, 'spanner', 'blue');
  foldedCloth(H, R, 10.78, 2.16, 0.38, 0.44, 1.43, 'paper', 'coral');
  box(H, R, 9.16, 6.98, 2.28, 1.71, 0.02, 0.18, 'teal', 0.55);
  for (let n = 0; n < 6; n++) H.line(R, [H.p(9.23, 7.1 + n * 0.24, 0.23), H.p(11.34, 7.1 + n * 0.24, 0.23)], 'paper', 0.8);
  satchel(H, R, 9.75, 7.53, 0.25, 'coral', 0.85);
  boundBook(H, R, 10.28, 8.03, 0.69, 0.46, 0.25, 'blue');
  servicePipe(
    H,
    R,
    [
      [0.39, 9.92, 0.3],
      [0.39, 9.92, 2.77],
      [0.39, 8.16, 2.77]
    ],
    'paper',
    2.5
  );
  const [x, y] = H.p(0.44, 8.17, 2.66);
  oval(H, R, x, y, 10, 8, 'blue', 0.65);
  oval(H, R, x, y, 7, 5, 'sun', 0.5);
  for (const i of [1.22, 5.88, 10.7]) {
    shallowTray(H, R, i, 10.96, 0.71, 0.31, 0.02, 'blue');
    for (let n = 0; n < 4; n++) H.line(R, [H.p(i + 0.1 + n * 0.15, 11, 0.2), H.p(i + 0.1 + n * 0.15, 11.21, 0.2)], 'paper', 0.7);
  }
  for (const i of [1.64, 6.46]) for (const j of [4.88, 8.42]) H.dot(...H.p(i, j, 0.25), 2, 'sun');
  coiledLine(H, R, 10.86, 0.92, 0.06, 12, 'sun');
}

function construction(H, R) {
  for (const pos of [0.46, 4.32, 8.23])
    windowBay(H, R, 'ne', pos, 3.42, 1.44, 1.82, {
      ink: 'paper',
      divisions: 2,
      view(P) {
        shape(H, R, [P(0.12, 0.12), P(3.3, 0.12), P(3.3, 0.73), P(0.12, 0.73)], 'teal', 0.32, 0.4);
        cityView(H, R, (u, v) => P(u, v + 0.54), 3.42, 1.08);
        for (let n = 0; n < 5; n++) H.line(R, [P(0.3 + n * 0.6, 0.32), P(0.64 + n * 0.6, 0.32)], 'paper', 0.9);
      }
    });

  for (const i of [0.2, 4.05, 7.95, 11.8]) {
    box(H, R, i - 0.06, 0.15, 0.29, 0.38, 0.02, 0.19, 'teal', 0.7);
    H.line(R, [H.p(i, 0.33, 2.75), H.p(i + 0.58, 0.33, 3.4)], 'blue', 1.7);
    for (const z of [0.25, 2.9]) H.dot(...H.p(i + 0.075, 0.425, z), 1.5, 'sun');
  }
  for (const j of [0.65, 3.7, 7.6, 11.45]) {
    H.line(R, [H.p(0.27, j, 2.72), H.p(0.27, j + 0.6, 3.31)], 'blue', 1.6);
    H.line(R, [H.p(0.31, j, 0.22), H.p(0.31, j, 0.66)], 'paper', 1);
  }
  for (const j of [4.82, 8.06])
    for (const i of [1.51, 3.17, 4.82, 6.47]) {
      H.line(R, [H.p(i, j, 0.1), H.p(i, j + 0.18, 0.61), H.p(i, j + 0.61, 0.61), H.p(i, j + 0.75, 0.1)], 'blue', 2.4);
      for (const z of [0.69, 1.0, 1.22]) H.dot(...H.p(i, j + 0.14, z), 1.2, 'blue');
      H.line(R, [H.p(i - 0.14, j + 0.78, 0.13), H.p(i + 0.17, j + 0.78, 0.13)], 'teal', 2);
    }
  for (let n = 0; n < 6; n++) {
    const i = 0.64 + n * 1.86;
    shape(H, R, H.faceI(i, 0.525, 1.58, 0.12, 0.45), 'teal', 0.38, 0.6);
    for (let q = 0; q < 5; q++) H.line(R, [H.p(i + 0.21 + q * 0.24, 0.54, 0.2), H.p(i + 0.21 + q * 0.24, 0.54, 0.37)], 'blue', 0.6);
  }
  for (const i of [2.05, 6.1, 10.11]) {
    const [x, y] = H.p(i, 0.45, 3.2);
    shape(
      H,
      R,
      [
        [x - 15, y],
        [x + 15, y],
        [x + 11, y - 8],
        [x - 11, y - 8]
      ],
      'paper',
      1,
      0.7
    );
    oval(H, R, x, y, 13, 3.5, 'sun', 0.7);
    for (const dx of [-9, 0, 9])
      H.line(
        R,
        [
          [x + dx, y - 7],
          [x + dx, y + 3]
        ],
        'blue',
        0.65
      );
    H.glow(x, y + 8, 28, 20, 'sun', 0.12);
  }
  for (const j of [2.04, 2.45]) {
    shape(H, R, H.faceI(9.88, j + 0.35, 1.28, 0.31, 0.76), 'paper', 1, 0.6);
    H.line(R, [H.p(10.2, j + 0.365, 0.64), H.p(10.68, j + 0.365, 0.64)], 'teal', 1.8);
  }
  const [x, y] = H.p(11.1, 2.25, 1.45);
  shape(
    H,
    R,
    [
      [x - 7, y],
      [x + 7, y],
      [x + 7, y - 22],
      [x - 7, y - 22]
    ],
    'coral',
    0.7,
    0.8
  );
  oval(H, R, x, y - 22, 7, 3, 'paper', 1);
  H.line(
    R,
    [
      [x, y - 23],
      [x, y - 31],
      [x + 8, y - 31]
    ],
    'blue',
    1.6
  );
  stroke(
    H,
    R,
    [
      [x + 4, y - 28],
      [x + 12, y - 18],
      [x + 10, y - 5]
    ],
    'blue',
    1.2
  );
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(9.5 + n * 0.45, 7.64, 0.3);
    shape(
      H,
      R,
      [
        [px - 7, py],
        [px + 7, py],
        [px + 7, py - 18],
        [px - 7, py - 18]
      ],
      n % 2 ? 'paper' : 'coral',
      0.65,
      0.6
    );
    H.line(
      R,
      [
        [px - 6, py - 4],
        [px + 6, py - 4]
      ],
      'sun',
      1.1
    );
    stroke(
      H,
      R,
      [
        [px - 4, py - 18],
        [px - 3, py - 24],
        [px + 3, py - 24],
        [px + 4, py - 18]
      ],
      'blue',
      0.9
    );
  }
  for (let n = 0; n < 8; n++) {
    const j = 9.35 + n * 0.2;
    H.line(R, [H.p(0.34, j, 0.78), H.p(0.68, j, 0.78)], 'blue', 0.6);
  }
  box(H, R, 0.13, 9.2, 0.6, 1.9, 0.78, 0.07, 'sun', 0.45);
  foldedCloth(H, R, 0.25, 9.4, 0.35, 0.73, 0.88, 'paper', 'teal');
}

const room = world('hong-kong-harbour-ferry', 'Victoria Harbour · Across the working water', { floor: 'teal', tone: .25, wall: false, pattern: 'boards', head: 20 }, (H, R) => {
  const backdrop = H.faceI(.05, .03, 11.9, .2, 3.5);
  shape(H, R, backdrop, 'paper', 1);
  shape(H, R, H.faceI(.1, .05, 11.8, .22, 1.65), 'teal', .24, .6);
  const skyline = [[.12, 1.48], [.4, 1.48], [.4, 2.01], [.95, 2.01], [.95, 1.65], [1.4, 1.65], [1.4, 2.38], [1.86, 2.38], [1.86, 1.76], [2.24, 1.76], [2.24, 2.21], [2.68, 2.21], [2.68, 1.66], [3.12, 1.66], [3.12, 2.62], [3.3, 2.8], [3.55, 2.62], [3.55, 1.75], [4.0, 1.75], [4.0, 2.04], [4.57, 2.04], [4.57, 1.62], [5.22, 1.62], [5.22, 2.25], [5.75, 2.25], [5.75, 1.7], [6.13, 1.7], [6.13, 2.95], [6.46, 3.11], [6.76, 2.95], [6.76, 1.75], [7.23, 1.75], [7.23, 2.15], [7.66, 2.15], [7.66, 1.65], [8.24, 1.65], [8.24, 2.34], [8.79, 2.34], [8.79, 1.76], [9.4, 1.76], [9.4, 2.14], [10.02, 2.14], [10.02, 1.73], [10.55, 1.73], [10.55, 2.48], [10.98, 2.48], [10.98, 1.73], [11.82, 1.73], [11.82, 1.4], [.12, 1.4]].map(([i, z]) => H.p(i, .08, z));
  shape(H, R, skyline, 'blue', .38, .65);
  for (let i = .5; i < 11.7; i += .58) for (const z of [1.62, 1.8, 1.98]) H.line(R, [H.p(i, .1, z), H.p(i + .17, .1, z)], 'paper', .6, { tone: .75 });
  for (const i of [.2, 4.05, 7.95, 11.8]) box(H, R, i, .19, .16, .22, .02, 3.42, 'paper', 1);
  box(H, R, .12, .19, 11.8, .23, 3.4, .26, 'paper', 1);
  box(H, R, .12, .19, 11.8, .32, .02, .6, 'teal', .62);
  for (const z of [.79, 1.16]) H.line(R, [H.p(.2, .49, z), H.p(11.8, .49, z)], 'sun', 2.6);
  for (let i = .35; i < 11.8; i += .73) H.line(R, [H.p(i, .48, .63), H.p(i, .48, 1.17)], 'blue', 1.5);
  box(H, R, .02, .5, .3, 11.08, .02, .76, 'teal', .64);
  H.line(R, [H.p(.31, .48, .82), H.p(.31, 11.6, .82)], 'sun', 3);
  for (const j of [.65, 3.7, 7.6, 11.45]) box(H, R, .08, j, .24, .23, .03, 3.3, 'paper', 1);
  box(H, R, .03, .4, .38, 11.32, 3.31, .24, 'paper', 1);
  for (const j of [3.73, 7.64]) {
    H.line(R, [H.p(.4, j, 3.28), H.p(3.2, j, 3.28)], 'blue', 2);
    H.line(R, [H.p(.4, j, 3.28), H.p(.4, j + .78, 2.58)], 'teal', 2.2);
  }
  for (const j of [2.24, 5.2, 8.4]) seat(H, R, 1.33, j, 5.12);
  for (const j of [3.4, 6.58, 9.8]) {
    shape(H, R, H.tile(7.15, j, 3.81, .05, .025), 'sun', .38, .2);
    for (let q = 0; q < 8; q++) H.line(R, [H.p(7.35 + q * .46, j + .07, .025), H.p(7.35 + q * .46, j + .18, .025)], 'paper', .7, { tone: .7 });
  }
  for (const j of [2.1, 6.5, 10.9]) {
    H.line(R, [H.p(10.98, j, .02), H.p(10.98, j, 1.23)], 'paper', 3.2);
    H.line(R, [H.p(10.98, j, 1.23), H.p(11.43, j + .1, 1.23)], 'sun', 2.7);
  }
  H.line(R, [H.p(11.25, 2.08, 1.25), H.p(11.25, 10.94, 1.25)], 'sun', 2.7);
  lifering(H, R, .4, 8.6, 1.95);
  const [rx, ry] = H.p(.51, 9.9, .28);
  for (let q = 0; q < 5; q++) H.outline(R, ell(rx, ry, 9 + q * 2.6, 3.7 + q), 'sun', 1.4, { tone: .8, amp: .12 });
  box(H, R, 8.8, .58, 1.04, .62, .02, .85, 'paper', 1);
  shape(H, R, H.faceI(8.96, 1.22, .69, .15, .71), 'coral', .57);
  for (const i of [9.08, 9.45]) H.line(R, [H.p(i, 1.24, .31), H.p(i, 1.24, .54)], 'paper', 1.1);
  luggage(H, R, 6.42, 8.69);
  box(H, R, 2.13, 9.18, .86, .55, .77, .43, 'teal', .64);
  stroke(H, R, [H.p(2.3, 9.43, 1.22), H.p(2.3, 9.43, 1.55), H.p(2.84, 9.43, 1.55), H.p(2.84, 9.43, 1.22)], 'blue', 1.1);
  const [ux, uy] = H.p(1.18, 10.6, .05);
  H.line(R, [[ux, uy], [ux + 9, uy - 45], [ux + 15, uy - 49], [ux + 18, uy - 44]], 'blue', 1.8);
  shape(H, R, [[ux - 4, uy - 4], [ux + 7, uy - 40], [ux + 13, uy - 39], [ux + 3, uy - 2]], 'coral', .7, .65);
  box(H, R, 7.56, 10.65, 2.73, .54, .02, .07, 'blue', .45);
  for (let q = 0; q < 12; q++) H.line(R, [H.p(7.62 + q * .22, 10.7, .1), H.p(7.62 + q * .22, 11.15, .1)], 'paper', .8);
  harbourFerryDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  H.clip(H.faceI(.2, .11, 11.55, .63, 1.48), () => {
    for (let q = 0; q < 11; q++) {
      const i = .35 + q * 1.07 + Math.sin(TAU * u + q) * .18, z = .73 + q % 3 * .21;
      H.line(R, [H.p(i, .12, z), H.p(i + .56, .12, z)], 'paper', 1.4, { tone: .65, amp: .15 });
    }
    for (let q = 0; q < 4; q++) {
      const i = 1.4 + q * 2.64 + Math.sin(TAU * u) * .19;
      H.line(R, [H.p(i, .13, .97), H.p(i + .77, .13, 1.03)], 'teal', .8, { tone: .42 });
    }
  });
  H.at(5.52, 1.43, 0, HH => actor(HH, R, 5.52, 1.43, t, 'hongKongFerryLook', { shirt: ['coral', .67], hairStyle: 'short', face: 'nw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    stroke(h, r, [[x - 6, y + 1], [p.chest[0] + 2, p.chest[1] + 15], [x + 8, y + 3]], 'blue', .7, .7);
    for (const a of [-6, 5]) {
      shape(h, r, [[x + a - 3, y + 4], [x + a + 4, y + 5], [x + a + 5, y - 8], [x + a - 3, y - 9]], 'blue', .8, .6);
      oval(h, r, x + a + 1, y - 8, 4, 2.3, 'teal', .7);
    }
    h.line(r, [[x - 3, y - 1], [x + 5, y]], 'sun', 2);
  } }, 0, 1.35));
  H.at(3.15, 5.92, 0, HH => actor(HH, R, 3.15, 5.92, t, 'hongKongFerrySit', { shirt: ['paper', 1], hairStyle: 'short', face: 'se' }, .05, 1.27));
  H.at(5.13, 5.95, 0, HH => actor(HH, R, 5.13, 5.95, t, 'hongKongFerrySit', { shirt: ['sun', .7], hairStyle: 'pony', face: 'se' }, .25, 1.15, 'child'));
  H.at(4.55, 9.13, 0, HH => actor(HH, R, 4.55, 9.13, t, 'hongKongFerrySit', { shirt: ['teal', .63], hairStyle: 'curly', face: 'se', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 14, y - 5], [x, y - 8], [x + 13, y - 3], [x + 12, y + 12], [x - 1, y + 8], [x - 14, y + 10]], 'paper', 1, .65);
    h.line(r, [[x, y - 7], [x - 1, y + 8]], 'teal', .9);
    for (let q = 0; q < 4; q++) h.line(r, [[x - 11, y + q * 2.5], [x - 4, y - 1 + q * 2.5]], 'blue', .5, { tone: .6 });
  } }, .05, 1.25));
});
room.loopSeconds = 16;
export default room;
