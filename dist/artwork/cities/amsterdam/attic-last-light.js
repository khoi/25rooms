import { world, shape, stroke, oval, box, actor, ell, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, drape, vessel, bentTube, branchSpray } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { wallCourse, panelFront, taskLight, radiator, floorShadow } from '../joinery.js';

const duration = 28;
const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
const rest = { ...FIGURES.clips.idle.keys[0][1] };
for (const name of ['amsterdamAtticReader', 'amsterdamAtticCompanion']) FIGURES.clips[name] = { dur: duration, keys: [[0, rest], [1, rest]] };

function person(H, R, name, at, pose, hands, opts) {
  const q = { ...rest, ...pose }, scale = 1.5, origin = H.p(...at);
  for (const [n, target] of (hands || []).entries()) {
    if (!target) continue;
    const s = n ? 'r' : 'l', dx = (target[0] - origin[0]) / scale - (n ? 5.2 : -5.2), dy = (target[1] - origin[1]) / scale - (q.drop * 19 - 32.5);
    const a = 4.368, b = 4.2, r = Math.min(a + b - .001, Math.hypot(dx, dy)), elbow = Math.acos(Math.max(-1, Math.min(1, (r * r - a * a - b * b) / (2 * a * b))));
    q['a' + s] = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(elbow), a + b * Math.cos(elbow))) * 180 / Math.PI;
    q['e' + s] = elbow * 180 / Math.PI;
  }
  FIGURES.clips[name].keys = [[0, q], [1, q]];
  actor(H, R, at[0], at[1], 0, name, opts, at[2], scale);
}

function book(H, R, i, j, z, w = .8) {
  const P = (x, y, h) => H.p(i + x, j + y, z + h);
  shape(H, R, [P(0, 0, 0), P(w * .5, .02, .1), P(w, 0, 0), P(w, .62, 0), P(w * .5, .65, .09), P(0, .62, 0)], 'paper', 1, .7);
  H.line(R, [P(w * .5, .02, .11), P(w * .5, .65, .1)], 'blue', .65);
  for (let n = 0; n < 4; n++) H.line(R, [P(.06, .1 + n * .12, .02), P(w * .43, .12 + n * .12, .09)], 'teal', .5, { tone: .4 });
  shape(H, R, [P(w * .51, .45, .11), P(w * .61, .45, .1), P(w * .65, .83, .01), P(w * .55, .81, .01)], 'coral', .7, .4);
}

function roof(H, R, open = 0) {
  const P = (i, j, dz = 0) => H.p(i, j, 4.5 - j * .59 + dz);
  for (const [a, b] of [[1.25, 2.1], [7.55, 8.5]]) {
    shape(H, R, [P(a, .15), P(b, .15), P(b, 4.2), P(a, 4.2)], 'teal', .27);
    H.line(R, [P(a, .15), P(a, 4.2)], 'blue', 6);
    H.line(R, [P(a + .06, .15), P(a + .06, 4.2)], 'sun', 3.5);
    for (let j = .6; j < 4; j += .62) H.line(R, [P(a, j), P(b, j)], 'blue', .55, { tone: .4 });
  }
  const outer = [P(2.1, .38), P(7.55, .38), P(7.55, 3.6), P(2.1, 3.6)];
  shape(H, R, outer, 'sun', .5, 1.2);
  const hole = [P(2.34, .63), P(7.28, .63), P(7.28, 3.3), P(2.34, 3.3)];
  shape(H, R, hole, 'blue', .9, 1);
  H.clip(hole, () => {
    for (let n = 0; n < 7; n++) {
      const i = 2.5 + n * .66, h = .18 + (n % 3) * .14;
      shape(H, R, [P(i, 3.3), P(i + .52, 3.3), P(i + .52, 2.8), P(i + .26, 2.8 - h), P(i, 2.8)], 'teal', .6, .45);
      H.line(R, [P(i + .16, 3.05), P(i + .16, 2.91)], 'sun', 2);
    }
    for (const [i, j] of [[3, 1.4], [5.3, 1.2], [6.6, 1.8]]) H.dot(...P(i, j), 1.2, 'paper', .8);
  });
  const S = (i, j) => P(i, j, open * (j - .6) * .11);
  H.tint([S(2.4, .69), S(7.2, .69), S(7.2, 3.2), S(2.4, 3.2)], 'teal', .12);
  for (const i of [2.35, 4.77, 7.25]) {
    H.line(R, [S(i, .64), S(i, 3.27)], 'sun', i === 4.77 ? 3.1 : 5.3);
    H.line(R, [S(i + .035, .64), S(i + .035, 3.27)], 'paper', 1.05);
  }
  for (const j of [.64, 3.27]) H.line(R, [S(2.35, j), S(7.25, j)], 'sun', 5.2);
  H.line(R, [S(2.7, 1.1), S(3.5, 2.5)], 'paper', 2, { tone: .5 });
  H.line(R, [P(7.36, 2.55, -.2), S(7.25, 3.12)], 'blue', 3.2);
  H.line(R, [P(7.36, 2.55, -.18), S(7.25, 3.12)], 'sun', 1.5);
  for (let n = 0; n < 3; n++) H.dot(...P(7.34, 2.68 + n * .12, -.13), .9, 'blue');
  H.line(R, [P(2.08, .4, .05), P(7.56, .4, .05)], 'paper', 5);
  H.line(R, [P(2.08, .4, .07), P(7.56, .4, .07)], 'blue', .8);
  shape(H, R, [P(6.8, 3.4), P(7.38, 3.4), P(7.38, 3.59), P(6.8, 3.59)], 'paper', .8, .5);
  H.line(R, [P(6.83, 3.43), P(7.3, 3.55)], 'coral', .65);
}

const room = world('amsterdam-attic-last-light', 'A bridge folded on the sill', { floor: 'blue', tone: .14, wall: 'blue', wallTone: .7, height: 2.9, pattern: 'boards', head: 75 }, (H, R) => {
  boardFloor(H, R, .15, .15, 11.7, 11.7, .025, 'sun', .55);
  wallCourse(H, R, 'nw', .2, 11.8, .9, 'teal');
  shape(H, R, H.faceJ(.36, 4.6, 4.15, .12, 1.82), 'blue', .72, .7);
  for (const j of [4.57, 5.97, 7.37, 8.76]) timber(H, R, .29, j, 1.12, .13, .12, 1.72, 'teal');
  for (const z of [.13, .9, 1.77]) timber(H, R, .28, 4.54, 1.19, 4.37, z, .12, 'sun');
  for (let n = 0; n < 15; n++) {
    const j = 4.82 + n * .255;
    if (n === 4 || n === 9) continue;
    box(H, R, .5, j, .82, .13, 1.03, .42 + n % 3 * .08, ['coral', 'paper', 'teal', 'sun'][n % 4], .6);
    H.line(R, [H.p(1.34, j + .02, 1.15), H.p(1.34, j + .11, 1.15)], 'sun', .8);
  }
  drape(H, R, .47, 6.21, .8, 1.04, .4, .18, 'paper');
  panelFront(H, R, .47, 8.85, .8, .31, .42, 1, 'teal');
  const art = (u, z) => H.p(.25, 7.13 + u, z);
  shape(H, R, [art(0, 2.04), art(1.7, 2.04), art(1.7, 2.88), art(0, 2.88)], 'sun', .6, .9);
  shape(H, R, [art(.1, 2.14), art(1.6, 2.14), art(1.6, 2.78), art(.1, 2.78)], 'paper', 1, .6);
  for (let n = 0; n < 4; n++) {
    const u = .2 + n * .33;
    H.line(R, [art(u, 2.25), art(u, 2.57), art(u + .12, 2.69), art(u + .25, 2.55), art(u + .25, 2.25)], 'teal', .8);
  }
  H.line(R, [art(.14, 2.2), art(1.51, 2.2)], 'coral', 1);
  for (const j of [.45, 4.2, 8.2, 11.6]) timber(H, R, .12, j, .19, .18, 0, 3.05, 'sun');
  radiator(H, R, 'ne', 8.85, 2.2, .83);
  timber(H, R, 8.65, .15, 2.7, .58, .95, .12, 'sun');
  cabinetFrame(H, R, .4, .52, 10.9, 1.22, .15, 1.62, 5, 'teal', (x, y, w, d, z, h, n) => {
    if (n === 2) {
      for (let k = 0; k < 3; k++) cushion(H, R, x + .14, y + .12, w - .32, d - .12, z + k * .21, .16, ['sun', 'paper', 'coral'][k]);
    } else if (n === 3) {
      timber(H, R, x + .04, y + .07, w - .1, d, z + .62, .08, 'sun');
      vessel(H, R, x + .5, y + .5, z + .68, 5.8, 12, 'teal', false);
      const [px, py] = H.p(x + .5, y + .5, z + .68);
      stroke(H, R, [[px - 1, py - 11], [px + 1, py - 6], [px - 2, py - 2]], 'sun', .7);
      branchSpray(H, R, px, py - 12, .55, 'teal');
    } else {
      for (let k = 0; k < 7; k++) {
        const w0 = .13 + (k % 2) * .035;
        box(H, R, x + .12 + k * .22, y + .16, w0, .68, z + .03, .6 + (k % 3) * .1, ['paper', 'coral', 'sun', 'teal'][k % 4], .65);
      }
      timber(H, R, x + .03, y + d, w - .05, .09, z, .2, 'sun');
    }
  });
  panelFront(H, R, 8.95, 1.79, 2.18, .27, .66, 2, 'teal');
  timber(H, R, 8.91, 1.5, 2.25, 1.1, 1.4, .1, 'sun');
  H.line(R, [H.p(9, 1.6, 1.51), H.p(11.05, 1.6, 1.51)], 'paper', 2.4);
  bentTube(H, R, [[9.05, 2.45, 1.39], [9.08, 1.78, .78]], 2, 'blue');
  taskLight(H, R, 10.3, 1.25, 1.79, 'coral', -.55);
  box(H, R, 9.4, .82, .85, .62, 1.77, .48, 'sun', .55);
  panelFront(H, R, 9.47, 1.45, .69, 1.8, .18, 1, 'coral');
  floorShadow(H, 2.1, 3.1, 6, 3.6, .24);
  for (const x of [2.1, 4.65, 7.65]) timber(H, R, x, 3.35, .19, 3.28, 0, .58, 'sun');
  timber(H, R, 2.05, 3.25, 5.95, 3.5, .56, .15, 'sun');
  panelFront(H, R, 2.25, 6.76, 5.45, .09, .49, 3, 'teal');
  cushion(H, R, 2.35, 3.6, 5.23, 2.62, .72, .17, 'paper');
  for (const x of [2.7, 4.7]) cushion(H, R, x, 3.61, 1.4, .84, .9, .22, x < 4 ? 'coral' : 'sun');
  drape(H, R, 2.6, 4.95, 1.92, 1.29, .96, .52, 'teal');
  book(H, R, 6.27, 5.43, .91, 1.01);
  timber(H, R, 1.85, 3.1, 6.45, 1.36, 2.21, .17, 'sun');
  const BP = (a, b, z = 0) => H.p(3.28 + a, 4.04 + b, 2.39 + z);
  H.fill([BP(.05, .16), BP(.3, .31), BP(.56, .19), BP(.83, .32), BP(1.12, .16), BP(1.45, .39), BP(1.31, .51), BP(.92, .34), BP(.7, .49), BP(.4, .34), BP(.16, .46)], 'blue', .45);
  for (let n = 0; n < 4; n++) shape(H, R, [BP(n * .29, 0), BP(n * .29 + .145, 0, .24), BP(n * .29 + .29, 0), BP(n * .29 + .29, .32), BP(n * .29 + .145, .32, .24), BP(n * .29, .32)], 'paper', 1, .6);
  box(H, R, 5.31, 4.21, .35, .3, 2.39, .33, 'coral', .6);
  shape(H, R, [H.p(5.28, 4.21, 2.71), H.p(5.5, 4.21, 2.98), H.p(5.73, 4.21, 2.71)], 'sun', .75, .65);
  vessel(H, R, 6.3, 4.21, 2.39, 6, 5, 'teal', true);
  const bowl = H.p(6.3, 4.21, 2.39); H.line(R, [[bowl[0] - 4, bowl[1] - 4], [bowl[0], bowl[1] - 1], [bowl[0] + 2, bowl[1] - 4]], 'sun', 1.2);
  timber(H, R, 8.45, 6.7, 2.4, 1.62, .64, .13, 'teal');
  for (const x of [8.65, 10.48]) for (const y of [6.87, 8.06]) timber(H, R, x, y, .14, .13, .05, .6, 'sun');
  metal(H, R, 8.72, 6.97, 1.81, 1.08, .78, .04, 'sun');
  vessel(H, R, 9.12, 7.27, .84, 5.5, 16, 'paper', false);
  for (const x of [9.8, 10.16]) vessel(H, R, x, 7.59, .84, 3.7, 7, 'teal');
  cushion(H, R, 8.78, 7.62, .65, .34, .84, .07, 'paper');
  oval(H, R, ...H.p(10.05, 7.01, .86), 8, 4, 'paper', 1);
  cushion(H, R, 4.9, 8.13, 1.32, 1.01, .38, .12, 'coral');
  for (const x of [5, 5.97]) timber(H, R, x, 8.3, .15, .15, .03, .4, 'sun');
  drape(H, R, 4.93, 8.21, 1.16, .62, .54, .27, 'paper');
  for (const x of [6.77, 7.37]) { const p = H.p(x, 8.25, .04); shape(H, R, ell(...p, 5.7, 3.3), 'teal', .55, .7); H.line(R, [[p[0] - 4, p[1]], [p[0], p[1] - 2], [p[0] + 3, p[1] - 1]], 'paper', 1); }
  box(H, R, 5.1, 7.51, .63, .29, .05, .12, 'blue', .5);
  timber(H, R, .08, 10.75, .4, 1.17, 0, 2.55, 'sun');
  for (let j = 8.7; j < 9.6; j += .14) H.line(R, [H.p(.15, j, 1.1), H.p(.15, j, 1.44)], 'blue', 1.2);
}, (H, R, time) => {
  const t = ((time % duration) + duration) % duration, rise = ease(1.2, 5.6, t) * (1 - ease(21.8, 26, t)), open = ease(5.6, 11.2, t) * (1 - ease(16.8, 21.8, t));
  roof(H, R, open);
  const scarf = H.p(7.58, .48, 4.18), sway = Math.sin(t / duration * Math.PI * 2) * 1.5;
  stroke(H, R, [scarf, [scarf[0] + sway, scarf[1] + 16], [scarf[0] + 3 + sway, scarf[1] + 28]], 'coral', 3);
  H.line(R, [[scarf[0] + sway, scarf[1] + 25], [scarf[0] + 5 + sway, scarf[1] + 25]], 'paper', .8);
  person(H, R, 'amsterdamAtticCompanion', [3.95, 4.93, .38], { drop: .47, ll:84, lr:80, kl:-84, kr:-80, head:20, al:25, ar:25, el:50, er:50, y: -ease(12,14,t) * (1-ease(16,19,t)) }, [], { shirt: ['sun', .65], hairStyle: 'curly', eyesClosed: true });
  const i = mix(6.51, 7.24, rise), j = mix(5.12, 3.7, rise), z = mix(.38, .88, rise);
  const at = H.p(i, j, z), stay = H.p(7.32, 3.18, 2.62 + open * .15);
  const target = [mix(at[0] + 13, stay[0], rise), mix(at[1] - 30, stay[1], rise)];
  person(H, R, 'amsterdamAtticReader', [i,j,z], { drop: .47 * (1-rise), ll:84*(1-rise), lr:80*(1-rise), kl:-84*(1-rise), kr:-80*(1-rise), head:mix(16,-12,rise), al:48,el:65 }, [null,target], { shirt: ['coral',.62], glasses:true, hairStyle:'short' });
});

room.loopSeconds = duration;
room.stillTime = 27;
export default room;
