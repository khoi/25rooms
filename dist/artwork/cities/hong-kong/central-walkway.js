import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
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

const room = world('hong-kong-central-walkway', 'Central · A clear pane at midnight', { floor: 'blue', tone: .32, wall: false, head: 20 }, (H, R) => {
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
  box(H, R, .4, 3.2, 11.19, .35, 3.48, .25, 'paper', .88);
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
