import { world, shape, oval, stroke, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, vessel, drape, cushion, floorLight } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cityView, cornice, wallCourse, recessedFrame, hangingRail, floorShadow } from '../joinery.js';

const rest = { x: 0, y: 0, drop: 0, lean: 0, head: 8, al: 6, ar: 10, el: 3, er: 6, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
FIGURES.clips.barcelonaLandingDoor = { dur: 16, keys: [[0, rest], [1, rest]] };
FIGURES.clips.barcelonaLandingBag = { dur: 16, keys: [[0, rest], [1, rest]] };
const ease = v => { const q = Math.max(0, Math.min(1, v)); return q * q * (3 - 2 * q); };

function neighbour(H, R, clip, hand, face, shirt, head, stride = 0) {
  const scale = 1.52, mirror = face === 'sw' ? -1 : 1, fx = hand[0] - mirror * 17, fy = hand[1] + 46;
  const q = { ...rest, head, ll: -5 + stride * 18, lr: 5 - stride * 18, kl: Math.max(0, -stride) * 12, kr: Math.max(0, stride) * 12 };
  const dx = ((hand[0] - fx) / scale) * mirror - 5.2, dy = (hand[1] - fy) / scale + 32.5;
  const d = Math.max(.3, Math.min(8.56, Math.hypot(dx, dy))), a = Math.atan2(dx, dy) - Math.acos(Math.max(-1, Math.min(1, (4.368 ** 2 + d ** 2 - 4.2 ** 2) / (2 * 4.368 * d))));
  const b = Math.atan2(dx - Math.sin(a) * 4.368, dy - Math.cos(a) * 4.368);
  q.ar = a * 180 / Math.PI;
  q.er = (b - a) * 180 / Math.PI;
  FIGURES.clips[clip].keys = [[0, q], [1, q]];
  actor(H, R, (fy / 16 + fx / 32) / 2, (fy / 16 - fx / 32) / 2, 0, clip, { face, shirt, pants: ['blue', .75], hairStyle: clip === 'barcelonaLandingDoor' ? 'bun' : 'curly' }, 0, scale);
}

function umbrella(H, R, x, y, height, ink) {
  stroke(H, R, [[x, y], [x + 1, y - height], [x + 6, y - height - 6], [x + 11, y - height - 2], [x + 10, y - height + 3]], 'sun', 2.1);
  surface(H, R, [[x - 5, y - 4], [x - 9, y - height + 12], [x + 1, y - height + 7], [x + 8, y - height + 14], [x + 4, y - 4]], ink, .71, .8);
  H.line(R, [[x - 3, y - height + 14], [x - 1, y - 7]], 'paper', 1);
  H.line(R, [[x - 7, y - height + 25], [x + 6, y - height + 25]], 'blue', 1.3);
}

const room = world('barcelona-landing-light', 'Someone keeps the door', { wall: 'paper', wallTone: .85, height: 4.6, floor: 'paper', tone: .82, pattern: 'tiles', accent: 'coral', head: 75 }, (H, R) => {
  wallCourse(H, R, 'ne', .1, 11.9, 1.02, 'teal');
  wallCourse(H, R, 'nw', .1, 11.9, 1.02, 'teal');
  cornice(H, R, 'ne', .1, 11.9, 4.43, 'paper');
  cornice(H, R, 'nw', .1, 11.9, 4.43, 'paper');
  windowBay(H, R, 'nw', 1.11, 3.46, 2.29, 1.89, { night: true, ink: 'teal', divisions: 2, view: P => cityView(H, R, P, 3.46, 1.89, true) });
  for (let n = 0; n < 4; n++) {
    const j = .34 + n * .75, z = 2.26 - n * .32;
    timber(H, R, .43, j, 3.46, .77, 0, z, 'teal');
    timber(H, R, .4, j + .01, 3.54, .79, z, .13, 'sun');
    H.line(R, [H.p(.44, j + .81, z + .09), H.p(3.89, j + .81, z + .09)], 'paper', 1.5);
  }
  timber(H, R, .43, 3.33, 3.44, 2.04, 0, 1.3, 'teal');
  timber(H, R, .4, 3.31, 3.5, 2.12, 1.3, .13, 'sun');
  for (let n = 0; n < 4; n++) {
    const i = 3.85 + n * .66, z = .98 - n * .24;
    metal(H, R, i, 3.32, .67, 2.04, 0, z, 'teal');
    timber(H, R, i - .02, 3.29, .73, 2.1, z, .13, n === 3 ? 'paper' : 'sun');
    H.line(R, [H.p(i + .69, 3.32, z + .1), H.p(i + .69, 5.36, z + .1)], 'paper', 1.4);
  }
  surface(H, R, H.tile(5.9, 4.75, .56, .4, .4), 'coral', .48, .5);
  for (let n = 0; n < 5; n++) {
    const j = .48 + n * .75, z = 2.39 - n * .32;
    metal(H, R, 3.63, j, .1, .1, z, .93, 'blue');
    oval(H, R, ...H.p(3.68, j + .05, z + .56), 3, 6, 'teal', .6);
  }
  bentTube(H, R, [[3.68, .4, 3.43], [3.68, 3.55, 2.04], [3.68, 5.47, 2.04]], 4.2, 'sun');
  for (let n = 0; n < 5; n++) {
    const i = 3.68 + n * .65, z = 1.38 - n * .24;
    metal(H, R, i, 5.32, .11, .11, z, .8, 'teal');
  }
  bentTube(H, R, [[3.68, 5.38, 2.25], [6.35, 5.38, 1.28], [6.51, 5.38, 1.27], [6.52, 5.38, 1.02]], 4.2, 'sun');
  timber(H, R, 6.22, 5.25, .27, .28, .02, 1.26, 'teal');
  oval(H, R, ...H.p(6.36, 5.39, 1.33), 7, 5, 'paper', 1);
  H.line(R, [H.p(4.25, 5.4, 1.98), H.p(4.55, 5.4, 1.87)], 'paper', 2);
  H.line(R, [H.p(5.7, 5.39, 1.2), H.p(6.02, 5.39, 1.12)], 'paper', 1.8);
  const niche = recessedFrame(H, R, 'ne', 4.37, 3.93, .39, 3.67, 'sun', P => {
    surface(H, R, [P(.17, .17), P(3.76, .17), P(3.76, 3.5), P(.17, 3.5)], 'blue', .68);
    for (const z of [.68, 1.65]) {
      H.line(R, [P(.16, z, .72), P(3.77, z, .72)], 'sun', 5);
      H.line(R, [P(.16, z + .05, .73), P(3.77, z + .05, .73)], 'paper', 1.4);
    }
    for (const [u, z, w, h, ink] of [[.36, .72, 1.4, .64, 'paper'], [1.91, .72, 1.25, .49, 'coral'], [.71, 1.71, 1.16, .6, 'paper'], [2.1, 1.71, 1.32, .77, 'sun']]) {
      surface(H, R, [P(u, z, .61), P(u + w, z, .61), P(u + w, z + h, .61), P(u, z + h, .61)], ink, .62);
      H.line(R, [P(u + w * .45, z, .63), P(u + w * .45, z + h, .63)], 'blue', 1.3);
      H.line(R, [P(u, z + h * .56, .63), P(u + w, z + h * .56, .63)], 'paper', 1.3);
    }
  });
  const lamp = niche(2.02, 3.12, .65);
  H.glow(lamp[0], lamp[1] + 28, 73, 79, 'sun', .38);
  shape(H, R, [[lamp[0] - 13, lamp[1] + 4], [lamp[0] + 13, lamp[1] + 4], [lamp[0] + 8, lamp[1] - 12], [lamp[0] - 8, lamp[1] - 12]], 'paper', .92);
  oval(H, R, lamp[0], lamp[1] + 4, 13, 4, 'sun', .8);
  H.line(R, [niche(2.02, 3.6, .3), [lamp[0], lamp[1] - 12]], 'blue', 2);
  cabinetFrame(H, R, 8.7, .28, 2.87, 1.66, .05, 3.81, 2, 'teal', (x, j, w, d, z, h, n) => {
    if (n === 0) {
      for (const h of [.72, 1.29, 1.86, 2.43, 3]) timber(H, R, x, j, w, d, h, .1, 'paper');
      for (let k = 0; k < 5; k++) {
        const h = .26 + k * .56;
        for (let m = 0; m < 3; m++) surface(H, R, H.tile(x + .09 + m * .04, j + .29, .78, .78, h + m * .06), m === 1 ? 'sun' : 'paper', .8, .55);
      }
    } else {
      timber(H, R, x, j, w, d, 1.59, .12, 'teal');
      for (const s of [.22, .86]) bentTube(H, R, [[x + s, j + .26, .2], [x + s, j + 1.1, 1.38], [x + s, j + .82, 1.51]], 2.5, 'paper');
      drape(H, R, x + .24, j + .56, .56, .34, 1.16, .65, 'coral');
      for (const s of [.25, .91]) oval(H, R, ...H.p(x + s, j + .35, .23), 5, 5, 'blue', .85);
      surface(H, R, H.faceI(x + .09, j + 1.38, w - .18, 1.84, 3.35), 'paper', .78, 1);
      surface(H, R, H.faceI(x + .19, j + 1.4, w - .38, 1.97, 3.2), 'teal', .31, .7);
      H.line(R, [H.p(x + .25, j + 1.42, 2.06), H.p(x + .79, j + 1.42, 3.11)], 'paper', 1.9);
    }
  });
  timber(H, R, 8.59, .2, 3.08, 1.86, 3.92, .12, 'paper');
  vessel(H, R, 9.06, .93, 4.07, 9, 16, 'coral');
  for (let n = 0; n < 3; n++) metal(H, R, 9.62 + n * .48, .67, .37, .56, 4.06, .23, n ? 'paper' : 'sun');
  const ornament = H.p(9.15, 1.7, 3.69);
  H.line(R, [H.p(9.15, 1.7, 4.01), ornament], 'coral', .9);
  surface(H, R, [[ornament[0] - 8, ornament[1]], [ornament[0], ornament[1] - 8], [ornament[0] + 8, ornament[1]], [ornament[0], ornament[1] + 10]], 'paper', .95, .7);
  hangingRail(H, R, 'ne', 9.05, 2.12, 4.22, 2, (P, u, n) => {
    const p = P(u, -.15);
    if (n === 1) surface(H, R, [[p[0] - 7, p[1]], [p[0] + 7, p[1]], [p[0] + 10, p[1] + 31], [p[0] - 10, p[1] + 29]], 'coral', .45, .7);
  });
  const D = (u, z) => wallPt(H, 'nw', 7.35 + u, z, -.32);
  surface(H, R, [D(0, .12), D(3.45, .12), D(3.45, 3.83), D(0, 3.83)], 'teal', .8, 1.4);
  surface(H, R, [D(.17, .12), D(3.27, .12), D(3.27, 3.65), D(.17, 3.65)], 'blue', .87, .8);
  for (const u of [0, 3.45]) H.line(R, [D(u, .12), D(u, 3.85)], 'paper', 3.2);
  H.line(R, [D(0, 3.81), D(3.45, 3.81)], 'paper', 3.2);
  timber(H, R, .14, 7.28, .73, 3.67, .02, .14, 'paper');
  for (let n = 0; n < 12; n++) H.line(R, [H.p(.21, 7.44 + n * .28, .17), H.p(.76, 7.44 + n * .28, .17)], 'blue', .85);
  recessedFrame(H, R, 'nw', 6.67, .48, 1.29, .84, 'paper', P => {
    for (let n = 0; n < 4; n++) H.line(R, [P(.11, .46 + n * .07), P(.38, .46 + n * .07)], 'blue', .7);
    for (let n = 0; n < 3; n++) H.dot(...P(.25, .19 + n * .09), 1.3, 'coral');
  });
  floorLight(H, 5.1, 6.79, 146, .48);
  benchFrame(H, R, 8.72, 8.38, 2.53, 1.13, .67, 'sun');
  cushion(H, R, 8.84, 8.5, 1.05, .8, .7, .12, 'teal');
  drape(H, R, 10.12, 8.57, .88, .56, .72, .39, 'paper');
  for (const i of [9.12, 9.77]) {
    const p = H.p(i, 8.96, .12);
    shape(H, R, [[p[0] - 9, p[1]], [p[0] - 9, p[1] - 8], [p[0] - 1, p[1] - 8], [p[0] + 2, p[1] - 4], [p[0] + 11, p[1] - 2], [p[0] + 10, p[1] + 3]], 'blue', .73, .75);
  }
  timber(H, R, 10.26, 5.57, 1.11, 1.23, .96, .13, 'teal');
  for (const i of [10.37, 11.12]) timber(H, R, i, 5.68, .12, .92, .07, .92, 'teal');
  drape(H, R, 10.34, 5.66, .95, .91, 1.1, .34, 'paper');
  const pan = H.p(10.77, 6.17, 1.22);
  oval(H, R, ...pan, 17, 7, 'coral', .52);
  oval(H, R, pan[0], pan[1] - 3, 13, 5, 'blue', .67);
  H.line(R, [[pan[0] + 11, pan[1] - 3], [pan[0] + 27, pan[1] - 11]], 'blue', 3);
  const keys = H.p(11.06, 5.9, 1.13);
  oval(H, R, ...keys, 7, 3, 'sun', .65);
  H.line(R, [[keys[0] - 2, keys[1]], [keys[0] + 5, keys[1] - 1]], 'blue', 1.2);
  vessel(H, R, 1.42, 10.35, .05, 16, 30, 'teal');
  umbrella(H, R, ...H.p(1.42, 10.35, .72), 47, 'coral');
  umbrella(H, R, ...H.p(1.89, 10.35, .75), 29, 'sun');
  surface(H, R, H.tile(1.03, 9.78, 1.65, 1.26, .03), 'blue', .26, .6);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(1.13, 9.89 + n * .15, .04), H.p(2.6, 9.89 + n * .15, .04)], 'teal', .7);
  metal(H, R, 3.23, 10.19, 1.28, .59, .06, .13, 'blue');
  for (let n = 0; n < 6; n++) timber(H, R, 3.31 + n * .18, 10.23, .1, .51, .2, .09, 'sun');
  surface(H, R, [H.p(4.67, 10.39, .04), H.p(5.05, 10.39, .04), H.p(5.05, 10.78, .04), H.p(4.67, 10.78, .21)], 'coral', .61, .7);
  surface(H, R, H.tile(6.62, 8.61, 1.1, 1.28, .025), 'coral', .36, .7);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(6.7 + n * .25, 8.69, .04), H.p(6.7 + n * .25, 9.82, .04)], 'paper', .8);
}, (H, R, t) => {
  const u = ((t % 16) + 16) % 16, open = ease(u / 3.2) * (1 - ease((u - 9.6) / 4.4)), handle = ease((u - 3.2) / 3.2) * (1 - ease((u - 9.6) / 4.4));
  const angle = .12 + open * 1.1, P = (s, z) => H.p(.36 + Math.sin(angle) * s, 7.52 + Math.cos(angle) * s, z);
  surface(H, R, [P(0, .2), P(3.06, .2), P(3.06, 3.61), P(0, 3.61)], 'paper', .89, 1.5);
  for (const [z0, z1] of [[.46, 1.31], [1.51, 3.36]]) surface(H, R, [P(.18, z0), P(2.89, z0), P(2.89, z1), P(.18, z1)], 'teal', .23, .8);
  H.line(R, [P(.42, 1.77), P(1.47, 3.2)], 'paper', 2);
  for (const z of [.57, 3.18]) H.line(R, [P(0, z), P(.19, z)], 'sun', 3);
  H.line(R, [P(.18, 1.44), P(2.88, 1.44)], 'sun', 1.8);
  const knob = P(2.68, 1.43);
  H.line(R, [knob, [knob[0] + 7, knob[1] + 2]], 'blue', 2.8);
  const closer = H.p(.36, 7.62, 3.68), hinge = P(.78, 3.54), elbow = [(closer[0] + hinge[0]) / 2 + 8, (closer[1] + hinge[1]) / 2 - 3];
  H.line(R, [closer, elbow, hinge], 'blue', 2.4);
  for (const p of [closer, elbow, hinge]) H.dot(...p, 2.2, 'sun', .8);
  neighbour(H, R, 'barcelonaLandingDoor', knob, 'se', ['coral', .66], open > .9 ? -9 : 8, Math.sin(open * Math.PI * 6) * Math.sin(open * Math.PI));
  const bag = H.p(6.73, 7.14, .1);
  floorShadow(H, 6.1, 6.7, 1.13, 1.03, .22);
  for (const [dx, ink] of [[-14, 'coral'], [14, 'blue']]) {
    oval(H, R, bag[0] + dx, bag[1] + 1, 6.5, 7, ink, .87);
    H.dot(bag[0] + dx, bag[1] + 1, 2.1, 'paper');
  }
  const base = [bag[0] + 4, bag[1] - 23], top = [base[0] + 15 * (1 - handle), base[1] - 18 - handle * 24];
  H.line(R, [[bag[0] - 11, bag[1]], [base[0] - 8, base[1]], [top[0] - 8, top[1]], [top[0] + 8, top[1]], [base[0] + 8, base[1]], [bag[0] + 13, bag[1]]], 'blue', 3.3);
  H.line(R, [[top[0] - 8, top[1]], [top[0] + 8, top[1]]], 'paper', 4.2);
  shape(H, R, [[bag[0] - 14, bag[1] - 2], [bag[0] - 17, bag[1] - 29], [bag[0] + 15, bag[1] - 33], [bag[0] + 17, bag[1] - 2]], 'teal', .67, 1);
  shape(H, R, [[bag[0] - 16, bag[1] - 28], [bag[0] + 15, bag[1] - 33], [bag[0] + 12, bag[1] - 20], [bag[0] - 13, bag[1] - 17]], 'paper', .6, .8);
  for (let n = 0; n < 3; n++) H.line(R, [[bag[0] - 10 + n * 8, bag[1] - 15], [bag[0] - 9 + n * 8, bag[1] - 5]], 'paper', .6);
  H.dot(base[0] + 8, base[1], 2.4, 'coral', .8);
  neighbour(H, R, 'barcelonaLandingBag', top, 'sw', ['paper', .95], handle > .9 ? -12 : 13, Math.sin(handle * Math.PI * 4) * Math.sin(handle * Math.PI));
  const strap = H.p(1.47, 10.35, 1.4);
  stroke(H, R, [strap, [strap[0] + 7, strap[1] + 6], [strap[0] + 4 + Math.sin(u * Math.PI / 8) * 1.3, strap[1] + 12]], 'coral', 1.4);
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
