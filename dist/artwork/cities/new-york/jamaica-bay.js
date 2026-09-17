import { world, shape, oval, stroke, box, table, actor, cycle, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 50, ar: 45, el: 68, er: 74, head: 10 };
const watching = { ...seated, al: 160, ar: 154, el: 32, er: 33, head: -12, lean: 4 };
FIGURES.clips.newYorkBinoculars = { dur: 20, keys: [[0, seated], [.13, seated], [.28, watching], [.48, { ...watching, head: -16, lean: 5 }], [.61, watching], [.76, seated], [1, seated]] };

function reeds(H, R, i, j, h, ink = 'teal') {
  const [x, y] = H.p(i, j, .05);
  for (let n = 0; n < 7; n++) {
    const lean = (n - 3) * 4;
    stroke(H, R, [[x + n - 3, y], [x + lean * .55, y - h * .57], [x + lean, y - h + n % 3 * 7]], ink, 1.35, .6);
    if (n % 2 === 0) shape(H, R, [[x + lean - 2, y - h + n % 3 * 7], [x + lean, y - h - 10 + n % 3 * 7], [x + lean + 3, y - h + n % 3 * 7]], 'sun', .55, .4);
  }
}

function shorebird(H, R, x, y, dip) {
  for (const d of [-3, 3]) H.line(R, [[x + d, y], [x + d - 1, y - 13]], 'blue', .8);
  oval(H, R, x, y - 15, 9, 5, 'paper', 1);
  shape(H, R, [[x - 6, y - 17], [x - 13, y - 20], [x - 8, y - 13]], 'blue', .57, .5);
  stroke(H, R, [[x + 4, y - 17], [x + 9, y - 25 + dip * 12], [x + 15, y - 24 + dip * 19]], 'paper', 3.4);
  oval(H, R, x + 15, y - 25 + dip * 19, 4, 3.5, 'paper', 1);
  H.line(R, [[x + 18, y - 25 + dip * 19], [x + 27, y - 24 + dip * 22]], 'blue', 1.1);
  H.dot(x + 16, y - 26 + dip * 19, .8, 'blue');
}

const room = world('new-york-jamaica-bay', 'Jamaica Bay · A Quiet Opening', {
  floor: 'teal', tone: .15, wall: false, head: 20,
}, (H, R) => {
  shape(H, R, H.tile(.05, .05, 11.9, 4.25, .02), 'teal', .42);
  shape(H, R, [H.p(.1, .1, .04), H.p(11.9, .1, .04), H.p(11.9, 1.15, .04), H.p(9.2, .83, .04), H.p(6.6, 1.56, .04), H.p(3.35, 1.3, .04), H.p(.1, 2.22, .04)], 'sun', .22, .7);
  for (let n = 0; n < 15; n++) {
    const i = .4 + (n * .77) % 11.1, j = .28 + n % 3 * .24;
    reeds(H, R, i, j, 12 + n % 5 * 3, n % 4 ? 'teal' : 'blue');
  }
  for (let n = 0; n < 11; n++) {
    const i = .5 + (n * 1.31) % 10.7, j = 1.6 + n % 4 * .5;
    H.line(R, [H.p(i, j, .07), H.p(i + .45, j + .08, .07)], 'paper', .8, { tone: .65 });
  }
  shape(H, R, [H.p(8.1, 1.48, .05), H.p(10.6, 1.34, .05), H.p(11.55, 2.13, .05), H.p(9.5, 2.48, .05), H.p(7.7, 2.1, .05)], 'paper', .8, .6);
  shape(H, R, H.tile(.04, 4.0, 11.92, 7.93, .09), 'paper', 1);
  for (let j = 4.1; j < 12; j += .42) H.line(R, [H.p(.05, j, .11), H.p(11.95, j, .11)], 'blue', .7, { tone: .4 });
  for (let n = 0; n < 20; n++) {
    const i = .4 + (n * 1.17) % 11.2, j = 4.1 + n % 9 * .85;
    H.line(R, [H.p(i, j, .115), H.p(i, j + .4, .115)], 'blue', .6, { tone: .35 });
  }
  box(H, R, .12, 3.96, 11.73, .22, .11, 1.2, 'teal', .43);
  box(H, R, .12, 3.96, 11.73, .22, 2.52, .74, 'teal', .5);
  for (let i = .3; i < 11.8; i += .53) {
    H.line(R, [H.p(i, 4.2, .17), H.p(i, 4.2, 1.31)], 'blue', .7, { tone: .6 });
    H.line(R, [H.p(i, 4.2, 2.55), H.p(i, 4.2, 3.26)], 'blue', .7, { tone: .6 });
  }
  for (const i of [.2, 3.45, 8.6, 11.65]) box(H, R, i, 3.84, .19, .45, .1, 3.18, 'blue', .73);
  box(H, R, .03, 4.0, .2, 4.1, .12, 2.75, 'teal', .45);
  for (let j = 4.2; j < 8; j += .5) H.line(R, [H.p(.25, j, .18), H.p(.25, j, 2.87)], 'blue', .65, { tone: .4 });
  box(H, R, .05, 3.8, 11.83, .64, 3.28, .15, 'paper', .82);
  box(H, R, .08, 4.15, 11.8, .6, 1.27, .12, 'sun', .53);
  for (const i of [1.1, 4.4, 7.7, 10.8]) {
    H.line(R, [H.p(i, 4.4, 3.3), H.p(i, 5.16, 3.66)], 'blue', 2.2);
  }
  shape(H, R, [H.p(.03, 3.92, 3.4), H.p(11.9, 3.92, 3.4), H.p(11.9, 5.22, 3.73), H.p(.03, 5.22, 3.73)], 'teal', .42, 1);
  for (let i = .4; i < 12; i += .55) H.line(R, [H.p(i, 3.97, 3.42), H.p(i, 5.17, 3.73)], 'blue', .7, { tone: .5 });
  table(H, R, 4.05, 5.91, 3.75, .77, .58, 'coral');
  box(H, R, 4.05, 6.53, 3.75, .14, .71, .38, 'coral', .47);
  table(H, R, .75, 8.3, 2.45, 1.38, .74, 'teal');
  shape(H, R, H.tile(.93, 8.53, 1.24, .88, .89), 'paper', 1);
  const [mx, my] = H.p(1.54, 8.98, .92);
  stroke(H, R, [[mx - 16, my - 4], [mx - 7, my + 2], [mx + 2, my - 8], [mx + 18, my - 2]], 'teal', 2.1, .67);
  H.line(R, [H.p(2.45, 8.57, .89), H.p(2.65, 9.3, .89)], 'coral', 2.1);
  box(H, R, 1.08, 8.54, .71, .58, .95, .05, 'sun', .68);
  const [tx, ty] = H.p(2.69, 8.59, .91);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 4, ty - 24], [tx - 4, ty - 24]], 'blue', .73, .6);
  oval(H, R, tx, ty - 24, 4, 2, 'paper', 1);
  oval(H, R, tx + 13, ty + 2, 5, 2, 'coral', .7);
  shape(H, R, [[tx + 8, ty + 1], [tx + 8, ty - 6], [tx + 18, ty - 6], [tx + 18, ty + 1]], 'paper', 1, .6);
  box(H, R, 8.94, 7.66, 1.04, 1.17, .09, .53, 'sun', .6);
  oval(H, R, ...H.p(9.46, 8.17, .7), 17, 12, 'teal', .68);
  const [sx, sy] = H.p(9.46, 8.17, 1.06);
  stroke(H, R, [[sx - 12, sy + 18], [sx - 16, sy], [sx + 10, sy - 3], [sx + 14, sy + 14]], 'blue', 1.8);
  for (const k of [0, 1]) H.line(R, [H.p(9.0 + k * .9, 7.68, .25), H.p(9.0 + k * .9, 8.76, .25)], 'blue', 1.3);
  for (const [i, j] of [[10.95, 9.73], [11.12, 11.13], [.68, 10.89]]) reeds(H, R, i, j, 23, 'teal');
  shape(H, R, H.tile(4.31, 9.63, 2.84, 1.46, .13), 'teal', .15);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(4.42 + n * .39, 9.71, .15), H.p(4.42 + n * .39, 11.04, .15)], 'coral', .8, { tone: .42 });
  for (const [i, j] of [[7.56, 8.12], [3.43, 10.86]]) {
    const [x, y] = H.p(i, j, .14);
    shape(H, R, [[x - 6, y], [x + 2, y - 6], [x + 9, y - 2], [x + 2, y + 4]], 'sun', .58, .6);
    H.line(R, [[x - 3, y], [x + 5, y - 2]], 'blue', .5);
  }
}, (H, R, t) => {
  const u = cycle(t, 20);
  const dip = u > .37 && u < .68 ? Math.sin((u - .37) / .31 * Math.PI) ** 2 : 0;
  H.clip(H.faceI(.22, 4.22, 11.39, 1.4, 2.51), () => shorebird(H, R, ...H.p(9.8, 1.35, .08), dip));
  actor(H, R, 5.88, 6.29, t, 'newYorkBinoculars', {
    shirt: ['coral', .58], pants: ['blue', .65], hairStyle: 'cap', glasses: true, face: 'ne',
    prop(HH, RR, points) {
      const [x, y] = points.nearHand;
      const [hx, hy] = points.head;
      stroke(HH, RR, [[hx - 4, hy + 8], [x - 9, y + 15], [x + 6, y + 7]], 'blue', .8, .68);
      for (const dx of [-4, 5]) {
        shape(HH, RR, [[x + dx - 4, y - 2], [x + dx - 2, y - 13], [x + dx + 4, y - 13], [x + dx + 5, y - 2]], 'blue', .84, .65);
        oval(HH, RR, x + dx + 1, y - 13, 3, 2, 'teal', .6);
      }
      HH.line(RR, [[x - 1, y - 6], [x + 8, y - 6]], 'blue', 2);
    },
  }, .12, 1.22);
  for (let n = 0; n < 3; n++) {
    const p = cycle(t + n * 6, 20);
    H.opacity(Math.sin(p * Math.PI) * .35, () => H.outline(R, ell(...H.p(4.2 + n * 1.13, 2.73, .075), 7 + p * 20, 2 + p * 5), 'paper', .8));
  }
  const sway = Math.sin(u * TAU) * 3;
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(11.33 + n * .1, 3.25 + n * .12, .05);
    stroke(H, R, [[x, y], [x + sway, y - 13], [x + sway * 1.4 - 3 + n * 2, y - 27]], 'teal', 1.2, .63);
  }
});
room.loopSeconds = 20;
export default room;
