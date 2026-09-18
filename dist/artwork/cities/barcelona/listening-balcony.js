import { world, shape, oval, stroke, actor, wallPt, loop } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, cushion, vessel, drape, floorLight, branchSpray, benchFrame } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { recessedFrame, cityView, cornice, wallCourse, taskLight } from '../joinery.js';

const rest = { x: 0, y: 0, drop: .47, lean: 0, head: 10, al: -15, ar: 18, el: -8, er: 8, ll: 84, lr: 80, kl: -84, kr: -80, roll: 0 };
FIGURES.clips.barcelonaBalconyGuitar = { dur: 24, keys: [[0, rest], [1, rest]] };
const listener = { ...rest, drop: 0, ll: -5, lr: 5, kl: 0, kr: 0, head: 0, ar: 35, er: 65, al: 20, el: 50 };
FIGURES.clips.barcelonaBalconyListener = { dur: 24, keys: [[0, listener], [.4, listener], [.55, { ...listener, head: 15, lean: -2 }], [.68, listener], [1, listener]] };
const ease = v => { const x = Math.max(0, Math.min(1, v)); return x * x * (3 - 2 * x); };

function guitar(H, R, x, y, t) {
  const angle = .45, sc = .8, P = (a, b) => [x + (Math.cos(angle) * a - Math.sin(angle) * b) * sc, y + (Math.sin(angle) * a + Math.cos(angle) * b) * sc];
  const outline = loop([[-15, -8], [-8, -12], [-5, -20], [7, -23], [22, -18], [26, -7], [23, 6], [14, 13], [2, 14], [-6, 7], [-14, 8], [-20, 2]], 2).map(p => P(...p));
  surface(H, R, outline.map(([a, b]) => [a + 3, b + 3]), 'coral', .75, 1);
  surface(H, R, outline, 'sun', .68, 1);
  H.outline(R, outline.map(([a, b]) => [x + (a - x) * .9, y + (b - y) * .9]), 'paper', .8, { amp: .08 });
  for (let k = 0; k < 4; k++) H.line(R, [P(-9, -10 + k * 4), P(17, -10 + k * 4)], 'coral', .4, { tone: .45 });
  surface(H, R, [P(-49, -4.2), P(-13, -4.2), P(-13, 4.2), P(-49, 4.2)], 'blue', .9);
  surface(H, R, [P(-60, -6), P(-48, -5), P(-48, 5), P(-60, 6)], 'sun', .75);
  for (let k = 0; k < 7; k++) H.line(R, [P(-46 + k * 4.3, -4), P(-46 + k * 4.3, 4)], 'paper', .55);
  for (const side of [-1, 1]) for (let k = 0; k < 3; k++) {
    H.line(R, [P(-58 + k * 4, side * 4), P(-58 + k * 4, side * 8)], 'blue', .8);
    oval(H, R, ...P(-58 + k * 4, side * 8), 2.1, 1.4, 'paper', 1);
  }
  oval(H, R, ...P(-1, 0), 6.5, 6.5, 'coral', .8);
  oval(H, R, ...P(-1, 0), 4.7, 4.7, 'blue', .95);
  surface(H, R, [P(12, -7), P(16, -7), P(16, 7), P(12, 7)], 'blue', .7);
  for (let k = 0; k < 6; k++) H.line(R, [P(-59, -2.1 + k * .83), P(15, -2.1 + k * .83)], k % 2 ? 'paper' : 'blue', .38, { tone: .7, amp: 0 });
  surface(H, R, [P(4, 5), P(12, 5), P(16, 11), P(7, 10)], 'paper', .22, .25);
  const playing = t >= 4.8 && t < 9.6, restHand = ease((t - 14.4) / 2.3) * (1 - ease((t - 19.2) / 2.8));
  return { P, left: P(-28, 1 + (playing ? Math.sin(t * Math.PI * 2.5) * .7 : 0)), right: P(2 + restHand * 6, 2 + restHand * 12 + (playing ? Math.sin(t * Math.PI * 4) * 1.8 : 0)) };
}

function player(H, R, t) {
  const i = 6.06, j = 6.98, z = .38, scale = 1.57, foot = H.p(i, j, z), hips = [foot[0], foot[1] + (19 * .47 - 19) * scale];
  const x = hips[0] + 5, y = hips[1] - 10;
  const angle = .45, P = (a, b) => [x + (Math.cos(angle) * a - Math.sin(angle) * b) * .8, y + (Math.sin(angle) * a + Math.cos(angle) * b) * .8];
  const playing = t >= 4.8 && t < 9.6, pause = ease((t - 14.4) / 2.3) * (1 - ease((t - 19.2) / 2.8));
  const targets = { l: P(-28, 1 + (playing ? Math.sin(t * Math.PI * 2.5) * .7 : 0)), r: P(2 + pause * 6, 2 + pause * 12 + (playing ? Math.sin(t * Math.PI * 4) * 1.8 : 0)) };
  const q = { ...rest, head: 8 + pause * 5, ll: 75, kl: -68 };
  const elbow = {};
  for (const s of ['l', 'r']) {
    const sx = s === 'l' ? -5.2 : 5.2, sy = 19 * .47 - 19 - 15 + 1.5;
    const dx = (targets[s][0] - foot[0]) / scale - sx, dy = (targets[s][1] - foot[1]) / scale - sy;
    const d = Math.max(.3, Math.min(8.56, Math.hypot(dx, dy))), a = Math.atan2(dx, dy) + (s === 'l' ? 1 : -1) * Math.acos(Math.max(-1, Math.min(1, (4.368 ** 2 + d ** 2 - 4.2 ** 2) / (2 * 4.368 * d))));
    const b = Math.atan2(dx - Math.sin(a) * 4.368, dy - Math.cos(a) * 4.368);
    q[`a${s}`] = a * 180 / Math.PI;
    q[`e${s}`] = (b - a) * 180 / Math.PI;
    elbow[s] = [foot[0] + (sx + Math.sin(a) * 4.368) * scale, foot[1] + (sy + Math.cos(a) * 4.368) * scale];
  }
  FIGURES.clips.barcelonaBalconyGuitar.keys = [[0, q], [1, q]];
  actor(H, R, i, j, 0, 'barcelonaBalconyGuitar', { face: 'se', shirt: ['paper', .95], pants: ['blue', .67], hairStyle: 'curly', prop: (HH, RR) => {
    guitar(HH, RR, x, y, t);
    for (const s of ['l', 'r']) {
      HH.line(RR, [elbow[s], targets[s]], 'blue', 6.4, { amp: .1 });
      HH.line(RR, [elbow[s], targets[s]], 'paper', 4.7, { amp: .1 });
      oval(HH, RR, targets[s][0], targets[s][1], 2.5, 2.5, 'coral', .3);
    }
  } }, z, scale);
}

const room = world('barcelona-listening-balcony', 'The guitar rests between phrases', { wall: 'teal', wallTone: .48, floor: 'sun', tone: .13, pattern: 'boards', height: 4.23, head: 58 }, (H, R) => {
  for (const side of ['nw', 'ne']) {
    cornice(H, R, side, .1, 11.9, 4.05, 'paper');
    wallCourse(H, R, side, .1, 11.9, .55, 'paper');
  }
  for (let n = 0; n < 12; n++) for (const [i, j] of [[n, 11.36], [11.36, n]]) {
    surface(H, R, H.tile(i, j, .61, .61, .025), 'paper', 1, .5);
    shape(H, R, [H.p(i + .3, j + .06, .04), H.p(i + .55, j + .3, .04), H.p(i + .3, j + .54, .04), H.p(i + .06, j + .3, .04)], n % 2 ? 'coral' : 'teal', .5, .4);
  }
  const P = recessedFrame(H, R, 'nw', 2.1, 8.5, .2, 3.73, 'paper', Q => {
    surface(H, R, [Q(.13, .1), Q(8.36, .1), Q(8.36, 3.59), Q(.13, 3.59)], 'blue', .94);
    cityView(H, R, Q, 8.5, 3.15, true);
    surface(H, R, [Q(4.4, .15), Q(8.34, .15), Q(8.34, 3.61), Q(4.4, 3.61)], 'blue', .86);
    for (let k = 0; k < 9; k++) H.line(R, [Q(4.54 + k * .42, .16), Q(4.54 + k * .42, 3.49)], k % 2 ? 'teal' : 'paper', 1.1, { tone: .25 });
    for (let n = 0; n < 10; n++) {
      const u = .3 + n * .78;
      H.line(R, [Q(u, .16), Q(u, 1.23)], 'blue', 2);
      const c = Q(u, .74);
      stroke(H, R, [[c[0] - 5, c[1]], [c[0] - 8, c[1] - 6], [c[0] - 2, c[1] - 11], [c[0] + 3, c[1] - 5], [c[0] + 1, c[1]]], 'paper', 1);
    }
    H.line(R, [Q(.16, 1.26), Q(8.34, 1.26)], 'paper', 2.8);
  });
  for (const [u, direction] of [[2.12, 1], [10.52, -1]]) {
    const J = u + direction * 1.03;
    surface(H, R, [H.p(.3, u, .25), H.p(1.5, J, .25), H.p(1.5, J, 3.82), H.p(.3, u, 3.82)], 'coral', .47, 1.3);
    for (let n = 0; n < 17; n++) {
      const z = .42 + n * .193;
      H.line(R, [H.p(.44, u + direction * .1, z), H.p(1.36, J - direction * .1, z)], 'blue', 1.3);
      H.line(R, [H.p(.44, u + direction * .1, z + .047), H.p(1.36, J - direction * .1, z + .047)], 'paper', .7);
    }
    for (const z of [.61, 3.44]) metal(H, R, .29, u - .08, .16, .22, z, .18, 'blue');
    bentTube(H, R, [[.4, u, 1.66], [1.29, J - direction * .17, 1.51]], 1.6, 'sun');
    if (direction < 0) surface(H, R, [H.p(.91, u - .55, 1.17), H.p(1.21, u - .79, 1.17), H.p(1.21, u - .79, 1.35), H.p(.91, u - .55, 1.35)], 'paper', .9);
  }
  H.line(R, [P(.15, 3.64, .35), P(8.34, 3.64, .35)], 'sun', 2.7);
  timber(H, R, .11, 2.04, .66, 8.64, .11, .14, 'paper');
  for (const j of [3.4, 4.2, 5]) {
    metal(H, R, .23, j, .19, .18, 1.38, .12, 'blue');
    vessel(H, R, .35, j, 1.5, 8, 15, 'coral');
    branchSpray(H, R, ...H.p(.35, j, 1.96), .55, 'teal', j === 4.2 ? -1 : 1);
  }
  cabinetFrame(H, R, 2.28, .28, 8.78, 1.22, .07, 2.58, 4, 'sun', (x, j, w, d, z, h, n) => {
    timber(H, R, x, j, w, d, 1.13, .11, 'sun');
    if (n < 2) {
      for (let k = 0; k < 8; k++) timber(H, R, x + .12 + k * .22, j + .14, .15, .71, .23, .79 + k % 3 * .04, ['coral', 'teal', 'paper', 'blue'][k % 4]);
      for (let k = 0; k < 3; k++) timber(H, R, x + .27 + k * .06, j + .23, 1.14, .71, 1.27 + k * .11, .09, k === 1 ? 'paper' : 'teal');
      if (n === 1) {
        const p = H.p(x + 1.58, j + .7, 1.26);
        surface(H, R, [[p[0] - 10, p[1]], [p[0] + 10, p[1]], [p[0] + 7, p[1] - 21], [p[0] - 10, p[1] - 21]], 'coral', .7);
        oval(H, R, p[0], p[1] - 10, 6, 6, 'blue', .75);
      }
    } else if (n === 2) {
      metal(H, R, x + .1, j + .13, w - .22, .85, .22, .76, 'teal');
      const p = H.p(x + w / 2, j + 1, .61);
      oval(H, R, ...p, 12, 12, 'blue', .78);
      oval(H, R, ...p, 5, 5, 'paper', .55);
      for (let k = 0; k < 6; k++) timber(H, R, x + .16 + k * .26, j + .16, .16, .58, 1.27, .75 + k % 2 * .13, ['paper', 'sun', 'coral'][k % 3]);
      const bookmark = H.p(x + .44, j + .77, 1.84);
      surface(H, R, [[bookmark[0], bookmark[1]], [bookmark[0] + 5, bookmark[1]], [bookmark[0] + 5, bookmark[1] + 10], [bookmark[0], bookmark[1] + 8]], 'coral', .75);
    } else {
      surface(H, R, H.faceI(x + .12, j + 1.09, w - .24, .23, 1.08), 'teal', .63);
      H.line(R, [H.p(x + 1.47, j + 1.11, .56), H.p(x + 1.47, j + 1.11, .8)], 'sun', 2.1);
      drape(H, R, x + .15, j + .21, 1.52, .75, 1.55, .22, 'paper');
      drape(H, R, x + .11, j + .18, 1.41, .71, 1.68, .19, 'coral');
    }
  });
  metal(H, R, 2.69, .47, 2.4, .81, 2.67, .14, 'teal');
  const disc = H.p(3.53, .85, 2.83);
  oval(H, R, ...disc, 20, 8, 'blue', .94);
  oval(H, R, ...disc, 6, 2.8, 'coral', .75);
  H.dot(...disc, 1.2, 'paper');
  bentTube(H, R, [[4.75, .77, 2.84], [4.55, .93, 2.9], [3.97, 1.03, 2.9]], 1.2, 'paper');
  for (const [u, z, w, h] of [[6.27, 3.02, 1.48, .72], [8.16, 3.17, 1.03, .9], [9.55, 3.01, .91, .7]]) recessedFrame(H, R, 'ne', u, w, z, h, 'paper', P => {
    const p = P(w * .48, h * .48);
    oval(H, R, p[0], p[1], 5, 7, 'coral', .75);
    surface(H, R, [P(.12, .14), P(w - .12, .14), P(w * .7, h * .46), P(w * .28, h * .4)], 'teal', .6);
  });
  floorLight(H, 6.1, 6.7, 156, .43);
  taskLight(H, R, 8.32, 3.88, .88, 'sun', -.7);
  benchFrame(H, R, 8.02, 3.55, 1.36, 1.34, .83, 'teal');
  vessel(H, R, 8.62, 4.19, .91, 7, 20, 'paper');
  benchFrame(H, R, 5.38, 6.14, 1.28, 1.03, .71, 'teal');
  cushion(H, R, 5.42, 6.18, 1.2, .94, .72, .16, 'coral');
  metal(H, R, 5.44, 7.48, .82, .61, .11, .25, 'teal');
  for (let k = 0; k < 4; k++) timber(H, R, 5.49, 7.53 + k * .12, .72, .1, .37, .07, 'sun');
  const caseP = (x, y, z = .14) => H.p(7.39 + x, 8.5 + y, z);
  const outline = [[0, .55], [.15, .13], [.78, .04], [1.2, .29], [1.71, .34], [2.05, .15], [3.46, .15], [3.68, .37], [3.62, .73], [2.01, .81], [1.67, .64], [1.16, .72], [.7, 1], [.13, .89]];
  surface(H, R, outline.map(([x, y]) => caseP(x, y)), 'blue', .79, 1.3);
  surface(H, R, outline.map(([x, y]) => caseP(x * .94 + .09, y * .76 + .1, .18)), 'coral', .42, .8);
  const lining = outline.map(([x, y]) => caseP(x * .77 + .17, y * .56 + .21, .2));
  H.outline(R, lining, 'paper', 1.2, { amp: .13 });
  bentTube(H, R, [[8.66, 9.35, .2], [8.74, 9.63, .25], [9.24, 9.63, .25], [9.3, 9.35, .2]], 2.7, 'paper');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(8.79 + n * .1, 9.6, .25), H.p(8.81 + n * .1, 9.69, .25)], 'coral', 1);
  benchFrame(H, R, 2.48, 9.27, 1.61, 1.12, .62, 'sun');
  const picks = H.p(2.96, 9.81, .65);
  oval(H, R, ...picks, 11, 5, 'paper', 1);
  surface(H, R, [[picks[0] - 4, picks[1] - 2], [picks[0] + 4, picks[1] - 3], [picks[0], picks[1] + 3]], 'coral', .75, .5);
  drape(H, R, 3.36, 9.49, .48, .57, .65, .35, 'paper');
  const winder = H.p(3.53, 9.85, .68);
  stroke(H, R, [[winder[0], winder[1]], [winder[0] + 7, winder[1] - 3], [winder[0] + 10, winder[1] + 2]], 'teal', 2);
  metal(H, R, 9.53, 6.48, .23, .27, .05, .96, 'teal');
  bentTube(H, R, [[9.63, 6.65, .08], [9.26, 7.01, .04], [9.63, 6.65, .08], [10.11, 6.84, .04]], 2.4, 'teal');
  bentTube(H, R, [[9.33, 6.64, 1.04], [9.38, 6.71, .91], [9.91, 6.71, .91], [9.96, 6.64, 1.04]], 3, 'coral');
}, (H, R, t) => {
  const u = ((t % 24) + 24) % 24;
  actor(H, R, 3.43, 4.96, u, 'barcelonaBalconyListener', { face: 'se', shirt: ['coral', .66], hairStyle: 'bun', pants: ['blue', .7] }, 0, 1.46);
  player(H, R, u);
  const petal = H.p(4.4, .99, 2.86);
  oval(H, R, petal[0] + .7 * Math.sin(u * Math.PI / 12), petal[1], 3.1, 1.4, 'coral', .7);
  const tie = wallPt(H, 'nw', 10.15, 2.32, -.3);
  stroke(H, R, [tie, [tie[0] - 6, tie[1] + 15], [tie[0] - 2 + Math.sin(u * Math.PI / 12) * 2, tie[1] + 24]], 'sun', 1.7);
});
room.loopSeconds = 24;
room.stillTime = 12;
export default room;
