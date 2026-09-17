import { metal, bentTube, surface } from '../materials.js';
import { caster, specimen } from '../joinery.js';
import { shallowTray, foldedCloth, coiledLine, framedPanel, servicePipe } from '../furnishings.js';
import { ell, world, shape, oval, stroke, box, actor, cycle, TAU, glow } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, head: -7, lean: 2, al: 52, ar: 117, el: 55, er: 9 };
FIGURES.clips.hongKongWalkwayGlass = { dur: 16, keys: [[0, ready], [.15, ready], [.36, { ...ready, ar: 89, er: 16, al: 59, el: 35, head: 7, lean: -5 }], [.55, { ...ready, ar: 89, er: 16, al: 59, el: 35, head: 7, lean: -5 }], [.73, ready], [.87, { ...ready, head: -14 }], [1, ready]] };

function tower(H, R, i, j, w, z, h, ink, n) {
  shape(H, R, H.faceI(i, j, w, z, z + h), ink, .52, .5);
  for (let q = 0; q < n; q++) for (let row = 0; row < 5; row++) {
    shape(H, R, H.faceI(i + .09 + q * (w - .14) / n, j + .01, .11, z + .13 + row * h / 5, z + .2 + row * h / 5), (q + row) % 3 ? 'sun' : 'paper', .62, .2);
  }
}

function centralWalkwayDetails(H, R) {
  for (const j of [4.28, 6.26, 8.36, 10.48]) {
    box(H, R, 0.48, j, 0.18, 0.2, 0.02, 1.2, 'teal', 0.6);
    H.dot(...H.p(0.58, j + 0.1, 1.26), 2, 'sun');
  }
  servicePipe(
    H,
    R,
    [
      [0.56, 4.28, 1.26],
      [0.56, 6.26, 1.26],
      [0.56, 8.36, 1.26],
      [0.56, 10.68, 1.26]
    ],
    'paper',
    2.5
  );
  for (let n = 0; n < 9; n++) H.line(R, [H.p(0.59, 4.55 + n * 0.69, 0.19), H.p(0.59, 4.55 + n * 0.69, 1.18)], 'blue', 0.9);
  box(H, R, 1.02, 4.28, 1.17, 0.56, 0.04, 1.82, 'teal', 0.5);
  shape(H, R, H.faceI(1.13, 4.86, 0.95, 0.26, 1.58), 'paper', 0.9, 0.6);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(1.26, 4.88, 0.39 + n * 0.13), H.p(1.92, 4.88, 0.39 + n * 0.13)], 'teal', 1);
  H.dot(...H.p(1.9, 4.9, 1.31), 2, 'coral');
  shallowTray(H, R, 9.4, 9.92, 1.86, 1.02, 0.03, 'blue');
  foldedCloth(H, R, 9.58, 10.09, 0.75, 0.67, 0.22, 'paper', 'teal');
  for (let n = 0; n < 2; n++) {
    const [x, y] = H.p(10.57 + n * 0.34, 10.46, 0.23);
    shape(
      H,
      R,
      [
        [x - 3, y],
        [x + 3, y],
        [x + 3, y - 20],
        [x - 3, y - 20]
      ],
      'coral',
      0.6,
      0.5
    );
    H.line(
      R,
      [
        [x - 3, y - 13],
        [x + 3, y - 13]
      ],
      'paper',
      1
    );
  }
  coiledLine(H, R, 9.78, 7.54, 0.03, 16, 'teal');
  H.line(R, [H.p(10.5, 8.83, 0.13), H.p(10.31, 8.34, 1.8)], 'blue', 2);
  H.line(R, [H.p(10.31, 8.06, 1.82), H.p(10.31, 8.68, 1.82)], 'coral', 4);
  for (const i of [2.9, 4.82])
    for (const j of [7.56, 9.21]) {
      box(H, R, i, j, 0.28, 0.35, 0.02, 0.035, 'teal', 0.5);
      H.dot(...H.p(i + 0.14, j + 0.17, 0.07), 1.2, 'paper');
    }
  framedPanel(H, R, 1.12, 3.31, 1.4, 2.07, 0.83, 'sun');
}

function construction(H, R) {
  for (let n = 0; n < 6; n++) {
    const i = 0.55 + n * 2.12;
    for (const z of [0.58, 1.48, 2.5, 3.39]) {
      box(H, R, i - 0.025, 0.48, 0.2, 0.25, z, 0.1, 'teal', 0.6);
      H.dot(...H.p(i + 0.07, 0.75, z + 0.05), 1.25, 'sun');
    }
  }
  for (const i of [0.44, 11.32])
    for (const j of [3.24, 7.71]) {
      H.line(R, [H.p(i, j, 2.86), H.p(i + (i < 1 ? 0.68 : -0.68), j, 3.49)], 'teal', 2.3);
      for (const z of [0.18, 2.84]) H.dot(...H.p(i + 0.1, j + 0.2, z), 1.6, 'sun');
    }
  for (let n = 0; n < 6; n++) {
    const i = 1.03 + n * 1.71,
      [x, y] = H.p(i, 3.4, 3.41);
    shape(
      H,
      R,
      [
        [x - 16, y],
        [x + 16, y],
        [x + 13, y - 6],
        [x - 13, y - 6]
      ],
      'teal',
      0.6,
      0.7
    );
    H.line(
      R,
      [
        [x - 12, y],
        [x + 12, y]
      ],
      'sun',
      3
    );
    H.glow(x, y + 8, 29, 18, 'sun', 0.16);
  }
  box(H, R, 1.05, 5.4, 1.33, 3.34, 0.03, 0.38, 'teal', 0.65);
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(1.69, 5.7 + n * 0.62, 0.43);
    specimen(H, R, x, y, 0.5 + (n % 2) * 0.2, 'teal', false);
  }
  for (let n = 0; n < 4; n++) {
    shape(H, R, H.faceJ(2.405, 5.61 + n * 0.74, 0.55, 0.13, 0.34), 'paper', 1, 0.6);
    H.line(R, [H.p(2.42, 5.69 + n * 0.74, 0.27), H.p(2.42, 6.04 + n * 0.74, 0.27)], 'teal', 0.6);
  }
  box(H, R, 8.87, 8.1, 1.42, 1.66, 0.26, 0.1, 'teal', 0.65);
  for (const i of [8.96, 10.11]) for (const j of [8.24, 9.54]) caster(H, R, i, j);
  for (const i of [8.98, 10.12]) H.line(R, [H.p(i, 8.21, 0.31), H.p(i, 8.21, 1.3), H.p(i, 9.58, 1.3), H.p(i, 9.58, 0.31)], 'blue', 1.9);
  box(H, R, 8.91, 8.14, 1.37, 1.55, 1.23, 0.07, 'paper', 1);
  shallowTray(H, R, 9.0, 8.27, 1.15, 1.18, 1.32, 'teal');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(9.24 + n * 0.32, 8.8, 1.52);
    shape(
      H,
      R,
      [
        [x - 4, y],
        [x + 4, y],
        [x + 4, y - 20],
        [x - 4, y - 20]
      ],
      n % 2 ? 'paper' : 'coral',
      0.7,
      0.6
    );
    H.line(
      R,
      [
        [x - 3, y - 20],
        [x + 6, y - 20],
        [x + 6, y - 24]
      ],
      'blue',
      1.4
    );
    H.line(
      R,
      [
        [x - 4, y - 10],
        [x + 4, y - 10]
      ],
      'sun',
      1.2
    );
  }
  for (let n = 0; n < 4; n++) foldedCloth(H, R, 9.13, 8.49, 0.91, 0.81, 0.4 + n * 0.09, 'paper', n % 2 ? 'coral' : 'teal');
  H.line(R, [H.p(10.18, 9.63, 1.3), H.p(10.49, 9.78, 1.73), H.p(10.49, 8.79, 1.73), H.p(10.18, 8.18, 1.3)], 'blue', 2.1);
  for (let n = 0; n < 7; n++) {
    H.line(R, [H.p(3.2 + n * 0.81, 6.9, 0.025), H.p(3.65 + n * 0.81, 7.11, 0.025)], 'sun', 1.2, { tone: 0.45 });
  }
  for (let n = 0; n < 8; n++) {
    const i = 2.9 + n * 0.93;
    H.line(R, [H.p(i, 10.9, 0.025), H.p(i, 11.42, 0.025)], 'paper', 0.8);
  }
}

const room = world('hong-kong-central-walkway', 'Central · A clear pane at midnight', { floor: 'blue', tone: .16, wall: false, head: 35 }, (H, R) => {
  const view = H.faceI(.16, .18, 11.68, .18, 3.52);
  shape(H, R, view, 'blue', .77, .9);
  H.clip(view, () => {
    tower(H, R, .35, .17, 1.4, .4, 2.66, 'teal', 5);
    tower(H, R, 2.07, .16, 1.06, .4, 1.95, 'blue', 4);
    tower(H, R, 3.44, .15, 1.9, .4, 2.34, 'teal', 6);
    tower(H, R, 5.69, .14, 1.49, .4, 2.95, 'blue', 5);
    tower(H, R, 7.45, .13, 1.25, .4, 2.56, 'teal', 4);
    tower(H, R, 9.13, .12, 2.34, .4, 1.99, 'blue', 8);
    H.line(R, [H.p(.2, .1, .55), H.p(11.7, .1, .55)], 'coral', 2.1);
    for (let q = 0; q < 13; q++) H.line(R, [H.p(.39 + q * .9, .09, .35), H.p(.69 + q * .9, .09, .35)], 'sun', 1.3);
  });
  box(H, R, .16, .42, 11.68, .35, .02, .48, 'teal', .55);
  for (let q = 0; q < 6; q++) box(H, R, .55 + q * 2.12, .5, .15, .19, .46, 3.15, 'paper', .91);
  box(H, R, .34, .46, 11.38, .24, 3.54, .16, 'paper', .9);
  for (const i of [.4, 11.28]) {
    box(H, R, i, 3.19, .31, .35, .03, 3.45, 'paper', .86);
    box(H, R, i - .08, 3.11, .47, .51, .02, .13, 'blue', .58);
  }
  for(const z of [3.47,3.95])metal(H,R,.4,3.2,11.19,.19,z,.09,'paper');
  for(let n=0;n<9;n++){
    const i=.48+n*1.23;
    bentTube(H,R,[[i,3.29,3.53],[i+.62,3.29,3.94],[i+1.23,3.29,3.53]],2.4,'teal');
    surface(H,R,ell(...H.p(i+.62,3.31,3.94),2.5,2),'sun',.75,.45);
  }
  for (const i of [.58, 11.43]) {
    H.line(R, [H.p(i, .62, 3.58), H.p(i, 3.32, 3.59), H.p(i, 7.79, 3.22)], 'blue', 2.1);
    H.line(R, [H.p(i, 3.33, .6), H.p(i, 7.79, .6)], 'blue', 1.3);
    for (const j of [4.15, 6.16, 7.79]) H.line(R, [H.p(i, j, .1), H.p(i, j, 3.27)], 'teal', 2);
  }
  box(H, R, .4, 7.67, .29, .3, .02, 3.18, 'paper', .84);
  box(H, R, 11.3, 7.67, .29, .3, .02, 3.18, 'paper', .84);
  for (let q = 0; q < 8; q++) {
    const j = 1 + q * 1.28;
    H.line(R, [H.p(.8, j, .02), H.p(11.22, j, .02)], 'paper', .9, { tone: .4 });
    for (let n = 0; n < 6; n++) H.line(R, [H.p(1 + n * 1.8 + q % 2 * .6, j, .02), H.p(1 + n * 1.8 + q % 2 * .6, j + 1.28, .02)], 'blue', .65, { tone: .5 });
  }
  const glass = H.faceI(.79, 3.24, 10.36, .63, 3.39);
  H.tint(glass, 'teal', .12);
  H.outline(R, glass, 'blue', .85);
  for (const i of [3.36, 5.96, 8.54]) H.line(R, [H.p(i, 3.24, .65), H.p(i, 3.24, 3.4)], 'paper', 2.3);
  for (const z of [.6, 3.42]) H.line(R, [H.p(.77, 3.24, z), H.p(11.17, 3.24, z)], 'teal', 2.5);
  for (const i of [1.2, 4.13, 9.45]) {
    H.line(R, [H.p(i, 3.25, 2.03), H.p(i + .75, 3.25, 3.13)], 'paper', 2, { tone: .65 });
    H.line(R, [H.p(i + .21, 3.25, 1.86), H.p(i + .73, 3.25, 2.62)], 'paper', .8, { tone: .6 });
  }
  for (const [i, j, w] of [[1.38, 1.23, 3.37], [7.63, 1.23, 2.65]]) {
    box(H, R, i, j, w, .23, 3.34, .1, 'blue', .6);
    H.line(R, [H.p(i + .1, j + .2, 3.33), H.p(i + w - .1, j + .2, 3.33)], 'paper', 3.7);
  }
  box(H, R, 10.74, 8.52, .65, 1.6, .03, .86, 'teal', .45);
  for (const j of [8.7, 9.68]) oval(H, R, ...H.p(10.78, j, .13), 4, 6, 'blue', .8);
  box(H, R, 10.81, 8.64, .46, 1.34, .9, .1, 'paper', 1);
  for (const [j, ink] of [[8.91, 'coral'], [9.48, 'sun']]) {
    const [x, y] = H.p(11, j, 1.02);
    shape(H, R, [[x - 5, y], [x + 5, y], [x + 5, y - 13], [x + 2, y - 17], [x + 2, y - 24], [x - 2, y - 24], [x - 2, y - 17], [x - 5, y - 13]], ink, .7, .65);
    H.line(R, [[x - 4, y - 21], [x + 5, y - 21]], 'blue', 1.7);
  }
  for (const j of [8.62, 9.87]) H.line(R, [H.p(11.25, j, 1.04), H.p(11.25, j, 1.37)], 'blue', 2);
  H.line(R, [H.p(11.25, 8.62, 1.37), H.p(11.25, 9.87, 1.37)], 'blue', 2);
  shape(H, R, H.tile(10.84, 9.46, .32, .42, 1.04), 'coral', .7);
  const [bx, by] = H.p(8.92, 6.52, .04);
  shape(H, R, [[bx - 13, by], [bx + 12, by], [bx + 15, by - 22], [bx - 15, by - 22]], 'sun', .72);
  oval(H, R, bx, by - 22, 15, 5, 'paper', 1);
  oval(H, R, bx, by - 22, 11, 3, 'teal', .55);
  stroke(H, R, [[bx - 13, by - 19], [bx - 11, by - 38], [bx + 12, by - 38], [bx + 13, by - 19]], 'blue', 1.2);
  shape(H, R, [H.p(7.83, 8.92, .03), H.p(8.74, 8.92, .03), H.p(8.63, 8.59, 1.16), H.p(7.96, 8.59, 1.16)], 'sun', .72);
  shape(H, R, [H.p(7.96, 8.59, 1.16), H.p(8.63, 8.59, 1.16), H.p(8.77, 8.03, .03), H.p(7.86, 8.03, .03)], 'coral', .6);
  const [sx, sy] = H.p(8.28, 8.83, .53);
  shape(H, R, [[sx, sy - 10], [sx - 9, sy + 7], [sx + 9, sy + 7]], 'blue', .7, .65);
  shape(H, R, [[sx, sy - 5], [sx - 5, sy + 4], [sx + 5, sy + 4]], 'sun', .8, .3);
  for (let q = 0; q < 8; q++) H.line(R, [H.p(1.2 + q * .18, 10.21, .03), H.p(1.2 + q * .18, 11.31, .03)], 'sun', 1.8);
  for (let q = 0; q < 8; q++) H.line(R, [H.p(5.25, 9.38 + q * .17, .03), H.p(5.65, 9.38 + q * .17, .03)], 'paper', .6, { tone: .32 });
  centralWalkwayDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), down = u < .15 ? 0 : u < .36 ? (1 - Math.cos((u - .15) / .21 * Math.PI)) / 2 : u < .55 ? 1 : u < .73 ? (1 + Math.cos((u - .55) / .18 * Math.PI)) / 2 : 0;
  actor(H, R, 7.18, 4.38, t, 'hongKongWalkwayGlass', { shirt: ['teal', .74], vest: ['sun', .63], hairStyle: 'short', face: 'nw', prop(h, r, p) {
    const end = h.p(6.66 + down * .38, 3.25, 2.65 - down * .91);
    h.line(r, [p.nearHand, end], 'blue', 2.1);
    h.line(r, [[end[0] - 15, end[1] - 7.5], [end[0] + 15, end[1] + 7.5]], 'teal', 4.2);
    h.line(r, [[end[0] - 15, end[1] - 9], [end[0] + 15, end[1] + 6]], 'paper', .9);
    shape(h, r, [[p.farHand[0] - 6, p.farHand[1] - 3], [p.farHand[0] + 7, p.farHand[1] - 1], [p.farHand[0] + 3, p.farHand[1] + 10], [p.farHand[0] - 8, p.farHand[1] + 6]], 'coral', .62, .6);
  } }, .01, 1.3);
  const [x, y] = H.p(6.9, 6.52, .04);
  H.opacity(.2 + .08 * Math.sin(u * TAU), () => H.line(R, [[x - 22, y], [x + 22, y + 21]], 'sun', 4.3));
});
room.loopSeconds = 16;
export default room;
