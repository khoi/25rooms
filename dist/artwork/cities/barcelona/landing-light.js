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
  surface(H, R, H.tile(.71, 10.83, 5.17, .65, .019), 'paper', .91, .8);
  for (let n = 0; n < 8; n++) H.line(R, [H.p(.8 + n * .62, 10.89, .03), H.p(.8 + n * .62, 11.41, .03)], 'blue', .75);
  metal(H, R, .81, 11.12, 4.89, .17, .035, .05, 'teal');
  for (let n = 0; n < 18; n++) H.line(R, [H.p(.93 + n * .26, 11.14, .09), H.p(.93 + n * .26, 11.25, .09)], 'paper', .7);
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
  for (let n = 0; n < 4; n++) {
    const j = .34 + n * .75, z = 2.26 - n * .32;
    surface(H, R, H.tile(1.44, j + .06, 1.36, .66, z + .142), 'coral', .37, .6);
    H.line(R, [H.p(1.46, j + .71, z + .14), H.p(2.77, j + .71, z + .14)], 'sun', 2);
    H.line(R, [H.p(.66, j + .81, z - .18), H.p(1.23, j + .81, z - .18)], 'paper', .85);
  }
  surface(H, R, H.tile(1.44, 3.38, 1.36, 1.97, 1.443), 'coral', .37, .6);
  H.line(R, [H.p(1.48, 3.47, 1.45), H.p(1.48, 5.26, 1.45)], 'sun', 1.2);
  H.line(R, [H.p(2.74, 3.47, 1.45), H.p(2.74, 5.26, 1.45)], 'sun', 1.2);
  for (const [x, w, ink] of [[.71, 1.11, 'paper'], [1.95, 1.53, 'teal']]) {
    surface(H, R, H.faceI(x, 5.45, w, .13, 1.18), ink, .52, 1);
    surface(H, R, H.faceI(x + .11, 5.47, w - .22, .25, 1.05), 'blue', .24, .7);
    H.line(R, [H.p(x + w - .21, 5.5, .56), H.p(x + w - .21, 5.5, .78)], 'sun', 2.2);
    for (const h of [.34, .98]) H.line(R, [H.p(x + .04, 5.48, h), H.p(x + .15, 5.48, h)], 'teal', 2.8);
  }
  bentTube(H, R, [[.31, .57, 3.07], [.31, 3.75, 1.71], [.31, 5.02, 1.71]], 2.8, 'sun');
  for (const [j, z] of [[.79, 2.93], [2.34, 2.27], [4.71, 1.71]]) bentTube(H, R, [[.09, j, z - .17], [.32, j, z]], 1.5, 'blue');
  surface(H, R, H.tile(5.9, 4.75, .56, .4, .4), 'coral', .48, .5);
  for (let n = 0; n < 5; n++) {
    const j = .48 + n * .75, z = 2.39 - n * .32;
    metal(H, R, 3.63, j, .1, .1, z, .93, 'blue');
    oval(H, R, ...H.p(3.68, j + .05, z + .56), 3, 6, 'teal', .6);
    const p = H.p(3.68, j + .05, z + .43);
    stroke(H, R, [[p[0], p[1] + 9], [p[0] - 7, p[1] + 3], [p[0] - 6, p[1] - 4], [p[0], p[1] - 2], [p[0] + 6, p[1] - 4], [p[0] + 7, p[1] + 3], [p[0], p[1] + 9]], 'paper', .85);
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
  for (const z of [.66, 1.63]) {
    for (const x of [4.82, 7.74]) bentTube(H, R, [[x, .16, z - .31], [x, .74, z], [x, .16, z]], 1.9, 'teal');
  }
  timber(H, R, 4.61, .2, 3.44, .9, .07, .18, 'sun');
  for (const x of [4.69, 6.32]) {
    surface(H, R, H.faceI(x, 1.12, 1.45, .17, .53), 'teal', .61, .75);
    H.line(R, [H.p(x + .48, 1.14, .37), H.p(x + .98, 1.14, .37)], 'paper', 1.7);
  }
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
  for (const h of [.78, 1.36, 1.93, 2.49, 3.05]) {
    timber(H, R, 8.91, 1.7, 1.1, .12, h, .08, 'sun');
    metal(H, R, 9.09, 1.82, .62, .06, h + .12, .1, 'paper');
    H.line(R, [H.p(9.28, 1.9, h + .14), H.p(9.59, 1.9, h + .14)], 'coral', .65);
  }
  recessedFrame(H, R, 'ne', 11.59, .32, 1.48, 1.09, 'paper', P => {
    for (const z of [.28, .57, .84]) H.dot(...P(.16, z), 1.4, 'teal');
  });
  bentTube(H, R, [[11.73, .17, 1.48], [11.73, .17, .29], [8.72, .17, .29]], 1.2, 'teal');
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
  recessedFrame(H, R, 'nw', 7.35, 3.45, 3.96, .4, 'sun', P => {
    surface(H, R, [P(.1, .07), P(3.34, .07), P(3.34, .33), P(.1, .33)], 'teal', .51);
    for (let n = 0; n < 6; n++) H.line(R, [P(.3 + n * .52, .08), P(.3 + n * .52, .33)], 'paper', 1.1);
  });
  for (const j of [7.22, 10.84]) {
    timber(H, R, .06, j, .39, .19, .09, 3.88, 'paper');
    timber(H, R, .07, j - .04, .48, .27, .13, .41, 'sun');
  }
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
  timber(H, R, 10.14, 4.09, 1.32, 1.55, .17, .11, 'teal');
  surface(H, R, H.faceI(10.26, 5.54, 1.07, .27, .71), 'paper', .72, .8);
  H.line(R, [H.p(10.59, 5.56, .53), H.p(11.02, 5.56, .53)], 'coral', 2.3);
  timber(H, R, 10.26, 4.22, 1.11, 1.23, .96, .13, 'teal');
  for (const i of [10.37, 11.12]) timber(H, R, i, 4.33, .12, .92, .07, .92, 'teal');
  drape(H, R, 10.34, 4.31, .95, .91, 1.1, .34, 'paper');
  const pan = H.p(10.77, 4.82, 1.22);
  oval(H, R, ...pan, 17, 7, 'coral', .52);
  oval(H, R, pan[0], pan[1] - 3, 13, 5, 'blue', .67);
  H.line(R, [[pan[0] + 11, pan[1] - 3], [pan[0] + 27, pan[1] - 11]], 'blue', 3);
  const lid = H.p(10.49, 4.34, 1.36);
  oval(H, R, ...lid, 13, 12, 'paper', .9);
  oval(H, R, lid[0], lid[1], 10, 9, 'teal', .19);
  H.line(R, [[lid[0] - 3, lid[1] - 2], [lid[0] + 3, lid[1] - 4]], 'coral', 3);
  metal(H, R, 10.6, 5.28, .61, .43, 1.13, .2, 'paper');
  surface(H, R, H.tile(10.58, 5.26, .65, .47, 1.34), 'teal', .46, .6);
  const keys = H.p(11.06, 4.55, 1.13);
  oval(H, R, ...keys, 7, 3, 'sun', .65);
  H.line(R, [[keys[0] - 2, keys[1]], [keys[0] + 5, keys[1] - 1]], 'blue', 1.2);
  floorShadow(H, 9.16, 7.47, 2.76, 1.55, .19);
  for (const x of [9.28, 11.6]) timber(H, R, x, 7.55, .15, .16, .07, 2.47, 'sun');
  timber(H, R, 9.2, 7.52, 2.65, .21, 2.25, .18, 'teal');
  for (let n = 0; n < 5; n++) timber(H, R, 9.36 + n * .49, 7.59, .1, .1, .65, 1.45, 'sun');
  for (const x of [9.63, 10.81]) bentTube(H, R, [[x, 7.75, 2.24], [x, 7.98, 2.03], [x + .17, 7.98, 2.07]], 2.3, 'blue');
  const cape = H.p(10.97, 7.89, 2.12);
  shape(H, R, [[cape[0] - 6, cape[1]], [cape[0] + 9, cape[1]], [cape[0] + 17, cape[1] + 43], [cape[0] - 14, cape[1] + 42]], 'coral', .63, .9);
  for (const dx of [-8, 1, 10]) H.line(R, [[cape[0] + dx * .4, cape[1] + 7], [cape[0] + dx, cape[1] + 38]], 'paper', .85);
  const scarf = H.p(9.66, 7.92, 2.05);
  shape(H, R, [[scarf[0] - 5, scarf[1]], [scarf[0] + 6, scarf[1]], [scarf[0] + 9, scarf[1] + 34], [scarf[0] - 4, scarf[1] + 32]], 'teal', .71, .65);
  for (let n = 0; n < 5; n++) H.line(R, [[scarf[0] - 3, scarf[1] + 11 + n * 4], [scarf[0] + 7, scarf[1] + 12 + n * 4]], 'sun', .9);
  benchFrame(H, R, 9.22, 7.73, 2.53, 1.13, .67, 'sun');
  timber(H, R, 9.43, 7.86, 2.1, .81, .2, .08, 'teal');
  const polish = H.p(11.06, 8.49, .3);
  oval(H, R, ...polish, 7, 3, 'coral', .77);
  H.line(R, [[polish[0] - 7, polish[1] - 4], [polish[0] + 6, polish[1] - 7]], 'blue', 4);
  cushion(H, R, 9.34, 7.85, 1.05, .8, .7, .12, 'teal');
  drape(H, R, 10.62, 7.92, .88, .56, .72, .39, 'paper');
  for (const i of [9.62, 10.27]) {
    const p = H.p(i, 8.31, .12);
    shape(H, R, [[p[0] - 9, p[1]], [p[0] - 9, p[1] - 8], [p[0] - 1, p[1] - 8], [p[0] + 2, p[1] - 4], [p[0] + 11, p[1] - 2], [p[0] + 10, p[1] + 3]], 'blue', .73, .75);
  }
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
  for (const u of [.13, 2.94]) H.line(R, [P(u, .33), P(u, 3.48)], 'sun', 1);
  surface(H, R, [P(.19, .28), P(2.85, .28), P(2.85, .48), P(.19, .48)], 'blue', .4, .65);
  for (const u of [.3, 2.73]) H.dot(...P(u, .38), 1.3, 'paper');
  H.line(R, [P(.47, 1.71), P(1.28, 2.93)], 'paper', 1.1, {tone:.45});
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
  surface(H, R, [[bag[0] - 10, bag[1] - 13], [bag[0] + 10, bag[1] - 15], [bag[0] + 10, bag[1] - 4], [bag[0] - 9, bag[1] - 3]], 'coral', .33, .7);
  H.line(R, [[bag[0] - 7, bag[1] - 11], [bag[0] + 7, bag[1] - 12]], 'paper', 1);
  H.dot(bag[0] + 8, bag[1] - 12, 1.4, 'sun');
  H.dot(base[0] + 8, base[1], 2.4, 'coral', .8);
  neighbour(H, R, 'barcelonaLandingBag', top, 'sw', ['paper', .95], handle > .9 ? -12 : 13, Math.sin(handle * Math.PI * 4) * Math.sin(handle * Math.PI));
  const strap = H.p(1.47, 10.35, 1.4);
  stroke(H, R, [strap, [strap[0] + 7, strap[1] + 6], [strap[0] + 4 + Math.sin(u * Math.PI / 8) * 1.3, strap[1] + 12]], 'coral', 1.4);
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
