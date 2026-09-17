import { shallowTray, foldedCloth, coiledLine, satchel, handTool, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, ell, TAU, glow } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 53, ar: 62, el: 56, er: 46, head: 5 };
const lift = { ...seated, ar: 111, er: 16, al: 83, el: 32, head: -14, lean: 2 };
FIGURES.clips.newYorkFloatCheck = { dur: 20, keys: [[0, seated], [.18, seated], [.38, lift], [.53, lift], [.72, seated], [1, seated]] };
const smooth = x => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };

function piling(H, R, i, j) {
  box(H, R, i, j, .43, .48, -.08, .88, 'blue', .67);
  oval(H, R, ...H.p(i + .21, j + .25, .81), 9, 5, 'paper', .7);
  oval(H, R, ...H.p(i + .21, j + .25, .82), 5, 3, 'blue', .46);
  for (let n = 0; n < 6; n++) {
    const [x, y] = H.p(i + .44, j + .07 + n % 3 * .15, .14 + Math.floor(n / 3) * .16);
    oval(H, R, x, y, 2, 3, 'paper', .8);
  }
  for (const z of [.3, .67]) H.line(R, [H.p(i, j + .49, z), H.p(i + .44, j + .49, z)], 'teal', 2);
}

function bollard(H, R, i, j) {
  box(H, R, i, j, .67, .65, .19, .12, 'blue', .75);
  box(H, R, i + .22, j + .17, .24, .3, .31, .5, 'teal', .73);
  box(H, R, i + .05, j + .17, .6, .3, .79, .12, 'blue', .75);
  for (let n = 0; n < 3; n++) H.outline(R, ell(...H.p(i + .33, j + .33, .42 + n * .06), 10, 4), 'sun', 1.4);
}

function redHookPierDetails(H, R) {
  table(H, R, 0.94, 9.51, 2.09, 1.66, 0.73, 'teal');
  shallowTray(H, R, 1.1, 9.67, 1.76, 1.27, 0.87, 'paper');
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(1.41 + (n % 2) * 0.81, 10.01 + Math.floor(n / 2) * 0.48, 1.08);
    oval(H, R, x, y, 4, 8, n % 2 ? 'coral' : 'sun', 0.6);
    if (n === 2)
      H.line(
        R,
        [
          [x - 4, y],
          [x + 4, y]
        ],
        'paper',
        2
      );
    H.line(
      R,
      [
        [x, y - 12],
        [x, y + 11]
      ],
      'blue',
      0.7
    );
  }
  handTool(H, R, 2.35, 10.4, 1.11, 'scissors', 'blue');
  coiledLine(H, R, 1.63, 9.99, 0.28, 15, 'sun');
  for (const i of [2.55, 3.08]) {
    H.line(R, [H.p(i, 3.03, 0.3), H.p(i, 3.03, 2.59)], 'sun', 1.8);
    for (const z of [0.8, 1.45, 2.12]) oval(H, R, ...H.p(i, 3.03, z), 2.7, 2, 'blue', 0.6);
  }
  const [x, y] = H.p(5.91, 9.81, 0.24);
  H.line(
    R,
    [
      [x, y],
      [x + 6, y - 48]
    ],
    'teal',
    2
  );
  oval(H, R, x + 7, y - 61, 16, 14, 'paper', 0.35);
  for (let n = -3; n < 4; n++)
    H.line(
      R,
      [
        [x - 7, y - 61 + n * 3],
        [x + 20, y - 61 + n * 3]
      ],
      'blue',
      0.5
    );
  foldedCloth(H, R, 1.2, 5.83, 0.71, 0.41, 0.82, 'paper', 'coral');
  satchel(H, R, 2.31, 7.4, 0.23, 'coral', 0.75);
  framedPanel(H, R, 0.62, 6.96, 1.32, 1.79, 0.82, 'teal');
  servicePipe(
    H,
    R,
    [
      [4.08, 2.83, 0.28],
      [4.08, 2.83, 3.03],
      [4.08, 6.99, 2.76]
    ],
    'teal',
    2.3
  );
  for (const [i, j] of [
    [6.65, 8.37],
    [6.74, 10.38]
  ]) {
    box(H, R, i, j, 0.21, 0.29, 0.2, 0.06, 'sun', 0.5);
    H.dot(...H.p(i + 0.1, j + 0.14, 0.28), 1, 'blue');
  }
}

function construction(H, R) {
  for (const j of [0.6, 3.65, 7.08, 10.92]) {
    for (const z of [0.19, 0.58]) {
      H.line(R, [H.p(7.36, j + 0.49, z), H.p(7.73, j + 0.49, z)], 'sun', 1.4);
      H.dot(...H.p(7.53, j + 0.5, z), 1.3, 'paper');
    }
    const [x, y] = H.p(7.54, j + 0.24, 0.84);
    oval(H, R, x, y, 6, 3, 'teal', 0.5);
    oval(H, R, x, y, 3, 1.5, 'blue', 0.6);
  }
  for (const j of [1.43, 9.45])
    for (const i of [5.96, 6.48])
      for (const y of [j + 0.07, j + 0.56]) {
        H.dot(...H.p(i, y, 0.34), 1.3, 'sun');
        H.line(R, [H.p(i - 0.03, y, 0.35), H.p(i + 0.03, y, 0.35)], 'blue', 0.55);
      }
  for (const [i, j] of [
    [0.58, 2.9],
    [4.08, 2.9],
    [0.58, 7.09],
    [4.08, 7.09]
  ]) {
    H.line(R, [H.p(i, j, 2.42), H.p(i + (i < 1 ? 0.45 : -0.45), j, 3.03)], 'sun', 1.8);
    H.line(R, [H.p(i, j, 0.41), H.p(i, j, 0.8)], 'paper', 0.8);
  }
  for (let n = 0; n < 8; n++) {
    const j = 3.06 + n * 0.51;
    H.line(R, [H.p(0.59, j, 2.85 - (j - 3.06) * 0.06), H.p(0.91, j, 2.85 - (j - 3.06) * 0.06)], 'sun', 1.2);
  }
  const [x, y] = H.p(2.36, 6.99, 2.68);
  H.line(
    R,
    [
      [x, y - 20],
      [x, y - 7]
    ],
    'blue',
    1.1
  );
  shape(
    H,
    R,
    [
      [x - 8, y - 7],
      [x + 8, y - 7],
      [x + 10, y + 10],
      [x - 10, y + 10]
    ],
    'paper',
    1,
    0.7
  );
  oval(H, R, x, y + 11, 10, 3, 'sun', 0.7);
  for (const dx of [-5, 0, 5])
    H.line(
      R,
      [
        [x + dx, y - 6],
        [x + dx, y + 10]
      ],
      'blue',
      0.65
    );
  H.glow(x, y + 17, 26, 24, 'sun', 0.18);
  for (let n = 0; n < 6; n++) {
    const [px, py] = H.p(1.35 + n * 0.25, 10.1, 0.93);
    H.line(
      R,
      [
        [px, py],
        [px + 3, py - 13]
      ],
      'blue',
      0.7
    );
    oval(H, R, px + 3, py - 14, 3, 5, n % 2 ? 'coral' : 'sun', 0.75);
    stroke(
      H,
      R,
      [
        [px, py],
        [px - 3, py + 4],
        [px - 5, py + 1]
      ],
      'blue',
      0.6
    );
  }
  for (let n = 0; n < 3; n++) {
    const [px, py] = H.p(2.2 + n * 0.23, 10.47, 0.93);
    oval(H, R, px, py, 5, 3, 'teal', 0.6);
    oval(H, R, px, py, 2, 1.2, 'paper', 1);
  }
  for (const i of [1.11, 2.87]) H.line(R, [H.p(i, 9.68, 0.3), H.p(i, 10.99, 0.68)], 'teal', 1.5);
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(3.85 + n * 0.23, 8.64, 0.84);
    shape(
      H,
      R,
      [
        [px - 3, py],
        [px + 3, py],
        [px + 3, py - 9],
        [px - 3, py - 9]
      ],
      'paper',
      1,
      0.5
    );
    H.line(
      R,
      [
        [px - 2, py - 6],
        [px + 2, py - 6]
      ],
      'coral',
      0.7
    );
  }
  for (let n = 0; n < 4; n++) {
    const j = 4.85 + n * 0.4;
    H.line(R, [H.p(0.68, j, 0.21), H.p(0.96, j, 0.21)], 'blue', 0.8);
  }
  const [px, py] = H.p(6.89, 10.53, 0.3);
  H.line(
    R,
    [
      [px - 6, py],
      [px + 6, py]
    ],
    'sun',
    2
  );
  H.line(
    R,
    [
      [px, py - 4],
      [px, py + 4]
    ],
    'blue',
    1.3
  );
  for (let n = 0; n < 5; n++) {
    const [ax, ay] = H.p(8.06 + n * 0.72, 9.72 + (n % 2) * 0.35, 0.03);
    H.line(
      R,
      [
        [ax - 7, ay],
        [ax + 6, ay]
      ],
      'sun',
      0.8,
      { tone: 0.4 }
    );
  }
}

const room = world('new-york-red-hook-pier', 'Red Hook · The Patient Line', {
  floor: 'teal', tone: .39, wall: false, head: 20,
}, (H, R) => {
  shape(H, R, H.tile(.06, .06, 7.27, 11.87, .18), 'paper', .98);
  for (let j = .14; j < 12; j += .42) {
    H.line(R, [H.p(.08, j, .2), H.p(7.3, j, .2)], 'blue', .75, { tone: .5 });
    for (const i of [1.5 + j % 2, 4.4 + j % 1]) H.line(R, [H.p(i, j, .205), H.p(i, j + .39, .205)], 'blue', .6, { tone: .46 });
  }
  box(H, R, 7.1, .1, .27, 11.82, -.04, .29, 'blue', .77);
  for (const j of [.6, 3.65, 7.08, 10.92]) piling(H, R, 7.33, j);
  for (let n = 0; n < 19; n++) {
    const i = 7.9 + (n * .53) % 3.38, j = .25 + (n * 1.13) % 11.2;
    H.line(R, [H.p(i, j, .025), H.p(Math.min(11.8, i + .5), j + .04, .025)], n % 2 ? 'paper' : 'blue', .9, { tone: .5 });
  }
  shape(H, R, H.faceI(.07, .06, 11.84, 0, 1.12), 'blue', .17, .7);
  H.clip(H.faceI(.09, .04, 11.8, .02, 1.12), () => {
    for (let n = 0; n < 8; n++) {
      const i = .2 + n * 1.45, h = .23 + n % 3 * .22;
      shape(H, R, H.faceI(i, .03, 1.05, .02, h), 'blue', .38, .4);
      for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .19 + k * .27, .02, .06), H.p(i + .19 + k * .27, .02, h - .06)], 'paper', .6, { tone: .35 });
    }
    H.line(R, [H.p(8.8, .02, .16), H.p(8.8, .02, .93), H.p(10.43, .02, 1.11)], 'teal', 1.9);
    H.line(R, [H.p(8.8, .02, .93), H.p(7.63, .02, 1.07)], 'teal', 1.5);
  });
  for (const [i, j] of [[.5, 2.8], [4.0, 2.8], [.5, 7.0], [4.0, 7.0]]) box(H, R, i, j, .15, .15, .2, 3.02, 'blue', .74);
  box(H, R, .48, 2.81, .14, 4.3, .47, 1.22, 'teal', .41);
  for (let j = 3.02; j < 7.1; j += .38) H.line(R, [H.p(.63, j, .5), H.p(.63, j, 1.68)], 'blue', .7, { tone: .4 });
  box(H, R, .4, 2.69, 3.93, .32, 3.16, .14, 'blue', .6);
  box(H, R, .4, 6.91, 3.93, .32, 2.89, .14, 'blue', .6);
  shape(H, R, [H.p(.25, 2.5, 3.34), H.p(4.35, 2.5, 3.34), H.p(4.35, 7.45, 3.04), H.p(.25, 7.45, 3.04)], 'coral', .46, 1.1);
  for (let i = .5; i < 4.4; i += .39) H.line(R, [H.p(i, 2.55, 3.35), H.p(i, 7.4, 3.07)], 'blue', .8, { tone: .57 });
  table(H, R, .94, 3.44, 1.26, 3.0, .68, 'teal');
  box(H, R, 1.0, 3.48, .13, 2.91, .79, .56, 'teal', .57);
  for (const j of [1.43, 9.45]) bollard(H, R, 5.9, j);
  H.line(R, [H.p(7.11, .68, 1.28), H.p(7.11, 11.25, 1.28)], 'blue', 2.2);
  for (const j of [.65, 3.52, 7.05, 11.28]) H.line(R, [H.p(7.11, j, .24), H.p(7.11, j, 1.28)], 'blue', 2.1);
  table(H, R, 5.19, 6.19, 1.14, 1.02, .66, 'sun');
  box(H, R, 5.2, 7.08, 1.12, .13, .79, .58, 'sun', .59);
  for (const d of [.08, .98]) {
    H.line(R, [H.p(5.19 + d, 6.2, .25), H.p(5.19 + d, 7.16, .66)], 'blue', 1.5);
    H.line(R, [H.p(5.19 + d, 7.15, .25), H.p(5.19 + d, 6.2, .66)], 'blue', 1.5);
  }
  box(H, R, 3.67, 8.15, 1.43, .96, .21, .45, 'teal', .65);
  box(H, R, 3.62, 8.09, 1.53, 1.06, .67, .1, 'paper', 1);
  for (const i of [3.94, 4.73]) box(H, R, i, 9.15, .13, .04, .44, .28, 'sun', .78);
  H.line(R, [H.p(4.0, 8.61, .84), H.p(4.19, 8.61, .99), H.p(4.6, 8.61, .99), H.p(4.77, 8.61, .84)], 'blue', 1.6);
  const [bx, by] = H.p(6.32, 8.78, .23);
  shape(H, R, [[bx - 12, by - 23], [bx + 12, by - 23], [bx + 9, by], [bx - 9, by]], 'paper', 1);
  oval(H, R, bx, by - 23, 12, 5, 'teal', .45);
  stroke(H, R, [[bx - 11, by - 19], [bx - 8, by - 40], [bx + 10, by - 40], [bx + 12, by - 19]], 'blue', 1.2);
  const [nx, ny] = H.p(3.73, 10.04, .25);
  H.line(R, [[nx - 55, ny + 8], [nx + 9, ny - 23]], 'blue', 2.2);
  const net = ell(nx + 23, ny - 29, 22, 11);
  H.outline(R, net, 'blue', 2);
  H.clip(net, () => {
    for (let n = -4; n <= 4; n++) {
      H.line(R, [[nx - 1 + n * 7, ny - 45], [nx + 35 + n * 7, ny - 13]], 'teal', .65);
      H.line(R, [[nx - 1 + n * 7, ny - 13], [nx + 35 + n * 7, ny - 45]], 'teal', .65);
    }
  });
  const [tx, ty] = H.p(2.02, 4.35, .82);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 4, ty - 27], [tx - 4, ty - 27]], 'blue', .76, .6);
  oval(H, R, tx, ty - 27, 4, 2, 'sun', .72);
  shape(H, R, [[tx + 16, ty - 5], [tx + 25, ty - 5], [tx + 24, ty + 4], [tx + 17, ty + 4]], 'coral', .67, .6);
  box(H, R, 1.49, 5.12, .57, .73, .82, .16, 'paper', .9);
  shape(H, R, H.tile(2.9, 5.6, 1.22, .72, .22), 'coral', .29, .6);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(3.0 + n * .3, 5.62, .23), H.p(3.0 + n * .3, 6.26, .23)], 'paper', 1.5);
  const [rx, ry] = H.p(5.79, 10.3, .24);
  for (let n = 0; n < 4; n++) H.outline(R, ell(rx, ry, 9 + n * 4, 3 + n * 1.6), 'sun', 1.8, { tone: .7 });
  stroke(H, R, [[rx + 15, ry], [rx + 31, ry + 8], [rx + 40, ry - 1]], 'sun', 1.9);
  redHookPierDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 20), raised = smooth((u - .18) / .2) * (1 - smooth((u - .53) / .19));
  for (let n = 0; n < 4; n++) {
    const p = cycle(t + n * 4.6, 20);
    H.opacity(Math.sin(p * Math.PI) * .5, () => H.outline(R, ell(...H.p(8.0 + n * .88, 2.4 + n * 2.07, .045), 8 + p * 18, 2 + p * 6), 'paper', .9));
  }
  actor(H, R, 5.75, 6.63, t, 'newYorkFloatCheck', {
    shirt: ['coral', .64], pants: ['blue', .66], hairStyle: 'cap', face: 'se',
    prop(HH, RR, points) {
      const hand = points.nearHand, tip = HH.p(10.39, 5.1, 1.3 + raised * .76);
      const middle = [hand[0] * .46 + tip[0] * .54, hand[1] * .46 + tip[1] * .54 - 12];
      stroke(HH, RR, [[hand[0] - 12, hand[1] + 5], hand, middle, tip], 'blue', 2, .9);
      const [fx, fy] = HH.p(10.28 - raised * .22, 8.55 - raised * .36, .045);
      const bob = Math.sin(u * TAU * 3) * 1.2;
      stroke(HH, RR, [tip, [(tip[0] + fx) / 2 + 4, (tip[1] + fy) / 2], [fx, fy + bob]], 'blue', .65, .75);
      oval(HH, RR, hand[0] - 4, hand[1] + 7, 5, 5, 'teal', .67);
      HH.line(RR, [[hand[0] - 3, hand[1] + 7], [hand[0] + 3, hand[1] + 11]], 'blue', 1.1);
      oval(HH, RR, fx, fy + bob, 3, 5, 'coral', .85);
      HH.line(RR, [[fx, fy - 7 + bob], [fx, fy - 4 + bob]], 'sun', 1.5);
      HH.outline(RR, ell(fx, fy + 4, 12, 4), 'paper', .65, { tone: .6 });
    },
  }, .22, 1.27);
  const [gx, gy] = H.p(5.33, 1.04, .23);
  oval(H, R, gx, gy - 8, 9, 5, 'paper', 1);
  oval(H, R, gx + 5, gy - 13, 4, 4, 'paper', 1);
  shape(H, R, [[gx - 6, gy - 10], [gx - 13, gy - 13], [gx - 8, gy - 5]], 'blue', .53, .5);
  H.line(R, [[gx - 2, gy - 4], [gx - 2, gy], [gx + 2, gy]], 'coral', 1);
  H.line(R, [[gx + 8, gy - 13], [gx + 14, gy - 12]], 'sun', 1.5);
  H.dot(gx + 6, gy - 14, 1, 'blue');
});
room.loopSeconds = 20;
export default room;
