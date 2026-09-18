import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, benchFrame, spokedWheel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame } from '../joinery.js';

const smooth = x => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
const travel = u => smooth((u - 4.8) / 4.8) * (1 - smooth((u - 14.4) / 7.6));

function maker(H, R, i, j, hands, child = false, lean = 0, shirt = 'coral', stride = 0) {
  const [x, y] = H.p(i, j, child ? .35 : 0), s = child ? .85 : 1.35;
  oval(H, R, x + 5, y + 3, 14 * s, 4 * s, 'blue', .2);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x + side * 5 * s, y - 24 * s], [x + side * (6 + stride * 3) * s, y - 10 * s], [x + side * (8 + stride * 5) * s, y - Math.max(0, side * stride) * 3]], 'blue', 7 * s);
    oval(H, R, x + side * (8 + stride * 5) * s + 3, y - Math.max(0, side * stride) * 3, 6 * s, 2.5 * s, 'blue', .8);
  }
  shape(H, R, [[x - 9 * s, y - 45 * s], [x + 8 * s, y - 46 * s], [x + 10 * s, y - 22 * s], [x - 9 * s, y - 23 * s]], child ? 'sun' : shirt, .67);
  if (!child) shape(H, R, [[x - 5, y - 41], [x + 5, y - 41], [x + 8, y - 24], [x - 7, y - 24]], 'paper', .9);
  oval(H, R, x + lean, y - 55 * s, 8 * s, 9 * s, 'paper', 1);
  shape(H, R, [[x - 8 * s + lean, y - 55 * s], [x - 7 * s + lean, y - 63 * s], [x + 3 * s + lean, y - 65 * s], [x + 8 * s + lean, y - 59 * s], [x - 3 * s + lean, y - 58 * s]], 'blue', .85);
  H.dot(x + 4 * s + lean, y - 54 * s, 1.1, 'blue');
  for (const [n, target] of hands.entries()) {
    const shoulder = [x + (n ? 8 : -8) * s, y - 41 * s], elbow = [(shoulder[0] + target[0]) * .5 + (n ? 4 : -4), (shoulder[1] + target[1]) * .5 + 8];
    stroke(H, R, [shoulder, elbow, target], 'blue', 7 * s);
    stroke(H, R, [shoulder, elbow, target], child ? 'sun' : shirt, 5 * s);
    oval(H, R, ...target, 3 * s, 2.7 * s, 'paper', 1);
  }
}

function facade(H, R, i, j, z, width, height, ink) {
  const f = H.faceI(i, j, width, z, z + height);
  shape(H, R, f, ink, .45);
  H.line(R, [H.p(i, j, z + height), H.p(i + width, j, z + height)], 'paper', 3);
  for (let n = 0; n < 3; n++) {
    const a = i + .13 + n * width / 3;
    shape(H, R, H.faceI(a, j + .025, width / 3 - .19, z + .3, z + height - .22), 'blue', .55);
    H.line(R, [H.p(a + .09, j + .04, z + .4), H.p(a + .09, j + .04, z + height - .27)], 'paper', 1);
  }
  metal(H, R, i - .05, j - .07, width + .1, .18, z + height, .09, ink);
}

const room = world('istanbul-tram-model', 'The little tram returns', { wall: false, floor: 'paper', tone: .7, head: 45 }, (H, R) => {
  masonry(H, R, 'ne', 0, 12, 0, 4.1, 'paper', .85);
  masonry(H, R, 'nw', 0, 12, 0, 3.9, 'teal', .28);
  windowBay(H, R, 'ne', 1.1, 7.7, 2.85, 1.02, { ink: 'teal', divisions: 5 });
  for (const j of [.3, 8.3]) {
    stroke(H, R, [H.p(.25, j, 4), H.p(6, j, 4.7), H.p(11.8, j, 4)], 'blue', 4);
    stroke(H, R, [H.p(.25, j, 4), H.p(11.8, j, 4)], 'teal', 3);
    for (let i = 1; i < 11; i += 2) stroke(H, R, [H.p(i, j, 4), H.p(i + 1, j, 4.6 - Math.abs(i - 5) * .09), H.p(i + 2, j, 4)], 'blue', 1.5);
  }
  stroke(H, R, [H.p(.13, .22, .3), H.p(.13, .22, 2.6), H.p(.13, 10.7, 2.6)], 'blue', 2);
  for (let j = 1; j < 11; j += 1.7) metal(H, R, .08, j, .17, .12, 2.54, .13, 'teal');
  box(H, R, 1, 10.7, 10, .32, 0, .05, 'blue', .35);
  for (let i = 1.1; i < 11; i += .25) H.line(R, [H.p(i, 10.75, .055), H.p(i, 10.98, .055)], 'paper', 1);
  floorLight(H, 7, 5, 160, .55);
  cabinetFrame(H, R, 1.15, .65, 8.9, 1.05, .22, 2.15, 4, 'teal', (i, j, w, d, z, h, n) => {
    timber(H, R, i, j, w, d, z + .85, .09, 'teal');
    if (n < 2) {
      for (let a = 0; a < 3; a++) facade(H, R, i + .11 + a * .58, j + .16 + a * .08, z + .96, .49, .68 + (a % 2) * .2, a === 1 ? 'sun' : 'paper');
      for (let a = 0; a < 4; a++) box(H, R, i + .05 + a * .43, j + .14, .35, .6, z, .55, ['sun', 'teal', 'paper', 'coral'][a], .45);
    } else if (n === 2) {
      for (let a = 0; a < 5; a++) timber(H, R, i + .08 + a * .27, j, .13, .7, z, .75, 'sun');
      for (let a = 0; a < 3; a++) { const p = H.p(i + .28 + a * .48, j + .3, z + 1.03); oval(H, R, ...p, 8, 3, 'sun', .8); spokedWheel(H, R, p[0], p[1] - 4, 5, 'blue'); }
    } else {
      box(H, R, i + .07, j + .05, w - .12, .66, z, .61, 'blue', .5);
      metal(H, R, i + .7, j + .73, .45, .1, z + .23, .14, 'sun');
      facade(H, R, i + .15, j + .6, z + .97, 1.4, .61, 'coral');
    }
  });
  recessedFrame(H, R, 'nw', 2.45, 3.9, 1.7, 1.65, 'sun', P => {
    shape(H, R, [P(.18, .18), P(3.72, .18), P(3.72, 1.46), P(.18, 1.46)], 'paper', 1);
    for (let n = 0; n < 5; n++) {
      const a = .35 + n * .67;
      shape(H, R, [P(a, .31), P(a + .46, .31), P(a + .46, 1.15), P(a, 1.15)], n % 2 ? 'teal' : 'coral', .27);
      H.line(R, [P(a, .69), P(a + .46, .69)], 'blue', .8);
    }
  });
  benchFrame(H, R, 2.7, 4.45, 6.7, 2.5, 1.35, 'sun');
  box(H, R, 2.78, 4.53, 6.54, 2.34, 1.35, .14, 'paper', .8);
  for (let i = 3; i < 9.1; i += .32) timber(H, R, i, 5.08, .11, 1.23, 1.49, .06, 'sun');
  for (const j of [5.25, 6.09]) metal(H, R, 2.95, j, 6.15, .065, 1.56, .06, 'blue');
  for (const i of [3, 8.92]) { metal(H, R, i, 5.15, .12, 1.1, 1.59, .18, 'coral'); for (const j of [5.25, 6.07]) H.dot(...H.p(i + .08, j, 1.76), 1.5, 'sun'); }
  metal(H, R, 3.1, 4.6, 5.8, .3, 1.49, .09, 'teal');
  stroke(H,R,[H.p(3.01,5.27,1.67),H.p(3.33,5.27,1.67)],'paper',1.2);
  for (const i of [3.6, 8.55]) { metal(H, R, i, 4.67, .09, .09, 1.56, 1.02, 'teal'); stroke(H, R, [H.p(i, 4.7, 2.6), H.p(i, 5, 2.66)], 'blue', 1.2); }
  stroke(H, R, [H.p(3.6, 4.95, 2.65), H.p(6, 4.95, 2.57), H.p(8.55, 4.95, 2.65)], 'blue', .8);
  for (let n = 0; n < 4; n++) facade(H, R, 3.05 + n * 1.3, 4.28, 1.42, 1.05, .75 + (n % 2) * .3, n % 2 ? 'coral' : 'paper');
  benchFrame(H, R, 1.15, 7.5, 1.45, 1.3, .62, 'teal');
  box(H, R, 1.4, 7.68, .9, .57, .62, .43, 'sun', .45);
  for (let n = 0; n < 3; n++) shape(H, R, H.faceI(1.48 + n * .24, 8.255, .17, .81, .98), 'paper', 1);
  timber(H, R, 1.3, 7.64, 1.1, .65, 1.03, .08, 'coral');
  box(H, R, 5.25, 7.45, 1.7, 1.05, 0, .32, 'teal', .5);
  benchFrame(H, R, 8.8, 8.75, 2.2, 1.2, .66, 'sun');
  for (const n of [0, 1]) { const [x, y] = H.p(9.25 + n * .8, 9.1, .77); spokedWheel(H, R, x, y, 10 - n * 2, n ? 'teal' : 'blue', .3); }
  metal(H, R, 9.4, 9.55, 1.2, .12, .67, .09, 'blue');
  stroke(H, R, [H.p(10.3, 8.96, .72), H.p(10.75, 9.25, .72), H.p(10.68, 9.52, .72)], 'coral', 3);
}, (H, R, time) => {
  const u = ((time % 24) + 24) % 24, p = travel(u), i = 3.36 + 3.9 * p, j = 5.21, z = 1.64;
  box(H, R, i, j, 1.48, .94, z + 0.0952, .09, 'blue', .8);
  for (const a of [.27, 1.19]) {
    metal(H, R, i + a - .04, j + .02, .07, .9, z + 0.0136, .055, 'blue');
    for (const b of [.06, .91]) { const [x, y] = H.p(i + a, j + b, z + 0.068); spokedWheel(H, R, x, y, 5.4, 'blue', -p * 19, .95); }
  }
  box(H, R, i + .04, j + .07, 1.4, .8, z + 0.1564, .33, 'teal', .7);
  shape(H, R, H.faceI(i + .07, j + .89, 1.34, z + 0.3876, z + 0.6868), 'blue', .7);
  for (let n = 0; n < 4; n++) {
    shape(H, R, H.faceI(i + .11 + n * .32, j + .9, .24, z + 0.4216, z + 0.6664), n === 1 ? 'sun' : 'paper', .68);
    const [x, y] = H.p(i + .21 + n * .32, j + .92, z + 0.5372);
    oval(H, R, x + (n === 2 ? 2 : 0), y - (n===3?5:2), 2.3, n===3?4.3:3, 'coral', .6);
    stroke(H, R, [[x, y], [x + (n === 2 ? 3 : 0), y + 5]], 'blue', 3);
  }
  shape(H, R, H.faceJ(i + 1.43, j + .12, .69, z + 0.34, z + 1), 'paper', .7);
  H.line(R, [H.p(i + 1.445, j + .48, z + 0.3468), H.p(i + 1.445, j + .48, z + 1)], 'teal', 1.8);
  metal(H, R, i - .02, j + .01, 1.54, .98, z + 0.6868, .1, 'teal');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(i + .1 + n * .25, j + .08, z + 0.7684), H.p(i + .1 + n * .25, j + .92, z + 0.7684)], 'paper', .65);
  metal(H, R, i + .59, j + .19, .36, .52, z + 0.748, .075, 'sun');
  shape(H, R, H.tile(i + .15, j + .23, .17, .43, z + 0.7616), 'coral', .65);
  const release = 1 - smooth((u - .4) / 2) * (1 - smooth((u - 20.7) / 1.3)), hand = H.p(i + .73 - release * .1, j + .7 + release * .65, z + 0.816 - release * .8);
  maker(H, R, i + .5, 7.08, [H.p(i + .29, 6.55, 1.4), hand], false, p * 2,'coral',Math.sin(p*Math.PI*12)*Math.sin(p*Math.PI));
  maker(H, R, 5.85, 8.05, [H.p(6.2, 7.6, .9), H.p(6.35, 7.64, .95)], true, smooth((u - 9.6) / 2) * (1 - smooth((u - 14.4) / 2)) * 3);
  const settle=smooth((u-20)/1)*(1-smooth((u-23)/1))*.055;
  shape(H,R,[H.p(9.78,9.6,.76),H.p(10.54,9.6,.76),H.p(10.54,9.86,.76+settle),H.p(9.78,9.86,.76)],'paper',1);
  stroke(H,R,[H.p(9.88,9.67,.78),H.p(10.37,9.67,.78),H.p(10.43,9.77,.78)],'teal',.7);
  const awning = .02 * Math.sin(u * Math.PI / 12);
  shape(H, R, [H.p(6.05, 4.23, 2.27), H.p(7.1, 4.23, 2.27), H.p(7.1, 4.65, 2.12 + awning), H.p(6.05, 4.65, 2.12 + awning)], 'coral', .6);
});
room.loopSeconds = 24;
room.stillTime = 11;
export default room;
