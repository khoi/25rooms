import { world, shape, stroke, oval, ell, cycle, TAU, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, drape, vessel } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, recessedFrame, wallRack, taskLight, floorShadow } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const rest = FIGURES.clips.idle.keys[0][1];
FIGURES.clips.londonModelMaker = { dur: 18, keys: [[0, { ...rest }], [1, { ...rest }]] };
FIGURES.clips.londonModelVisitor = { dur: 18, keys: [[0, { ...rest, head: 4, al: 24, ar: 45, el: 40, er: 60 }], [.2, { ...rest, head: 4, al: 24, ar: 45, el: 40, er: 60 }], [.45, { ...rest, lean: -5, head: 14, al: 24, ar: 45, el: 40, er: 60 }], [.6, { ...rest, lean: -5, head: 14, al: 24, ar: 45, el: 40, er: 60 }], [.9, { ...rest, head: 4, al: 24, ar: 45, el: 40, er: 60 }], [1, { ...rest, head: 4, al: 24, ar: 45, el: 40, er: 60 }]] };
function ship(H, R, tilt) {
  const P = (u, v, h) => H.p(2.8 + u, 5.0 + v * Math.cos(tilt) - (h - 1.45) * Math.sin(tilt), 1.45 + v * Math.sin(tilt) + (h - 1.45) * Math.cos(tilt));
  const rail = (side, z, factor = 1) => Array.from({ length: 31 }, (_, n) => { const f = n / 30; return P(f * 5.6, side * Math.sin(Math.PI * f) ** .66 * .94 * factor, z + .18 * Math.abs(f - .5) * 2); });
  const near = rail(1, 1.78), far = rail(-1, 1.78), keel = rail(1, 1.18, .2);
  surface(H, R, [...far, ...keel.toReversed()], 'sun', .38, .9);
  surface(H, R, [...far, ...near.toReversed()], 'blue', .58, .9);
  for (let n = 1; n < 11; n++) {
    const u = n * 5.6 / 11, wide = Math.sin(Math.PI * u / 5.6) ** .66 * .94;
    const rib = [P(u, -wide, 1.8), P(u, -wide * .75, 1.4), P(u, -.12, 1.19), P(u, wide * .65, 1.39), P(u, wide, 1.8)];
    H.line(R, rib, 'sun', 3.2, { tone: .85 }); H.line(R, rib.map(([x, y]) => [x + .7, y - .5]), 'paper', .7);
  }
  const bow = [P(0, 0, 1.95), P(.95, -.67, 1.78), P(.95, .67, 1.78)];
  surface(H, R, bow, 'sun', .62, .7);
  const stern = [P(4.4, -.7, 1.82), P(5.6, 0, 1.98), P(4.4, .7, 1.82)];
  surface(H, R, stern, 'sun', .62, .7);
  for (let n = 0; n < 5; n++) H.line(R, [P(.24 + n * .14, -.15 - n * .045, 1.93 - n * .025), P(.24 + n * .14, .15 + n * .045, 1.93 - n * .025)], 'coral', .55);
  surface(H, R, [...near.slice(0, 12), P(2.1, .4, 1.33), ...keel.slice(0, 12).toReversed()], 'sun', .54, .7);
  surface(H, R, [...near.slice(20), ...keel.slice(20).toReversed()], 'sun', .54, .7);
  for (const f of [.23, .42, .61, .78]) { const u = f * 5.6, wide = Math.sin(Math.PI * f) ** .66 * .91; H.line(R, [P(u, -wide, 1.81), P(u, wide, 1.81)], 'sun', 2.4); }
  for (const side of [-1, 1]) {
    H.line(R, rail(side, 1.84), 'paper', 1.4);
    H.line(R, rail(side, 1.86), 'blue', .75);
    for (let n = 1; n < 10; n++) { const u = n * .56, v = side * Math.sin(Math.PI * u / 5.6) ** .66 * .94; H.line(R, [P(u, v, 1.85), P(u, v, 2.03)], 'blue', .9); }
    H.line(R, rail(side, 2.04), 'coral', .8);
  }
  for (const [u, top, span] of [[1.66, 4.04, 1.06], [3.78, 3.65, .9]]) {
    H.line(R, [P(u, 0, 1.36), P(u, 0, top)], 'blue', 4);
    H.line(R, [P(u, 0, 1.38), P(u, 0, top)], 'sun', 2.1);
    for (const [zz, w] of [[top - .4, span], [top - 1.05, span * .72]]) {
      H.line(R, [P(u, -w, zz), P(u, w, zz)], 'blue', 2.4);
      H.line(R, [P(u, -w, zz + .015), P(u, w, zz + .015)], 'sun', 1.0);
      for (const v of [-w, w]) H.line(R, [P(u, v, zz), P(u, 0, top - .09)], 'coral', .7);
    }
    for (const du of [-.52, -.23, .23, .52]) for (const side of [-1, 1]) {
      const w = Math.sin(Math.PI * (u + du) / 5.6) ** .66 * .9;
      H.line(R, [P(u + du, side * w, 1.79), P(u, 0, top - .2)], 'coral', .75);
      oval(H, R, ...P(u + du, side * w, 1.87), 2.0, 2.1, 'blue', .7);
    }
    oval(H, R, ...P(u, 0, 1.81), 5, 2.6, 'teal', .7);
  }
  for (const [u, z] of [[0, 1.96], [5.6, 1.98]]) H.line(R, [P(u, 0, z), P(1.66, 0, 4.04)], 'coral', .8);
  H.line(R, [P(1.66, 0, 4.04), P(3.78, 0, 3.65), P(5.6, 0, 1.98)], 'coral', .8);
  H.line(R, [P(0, 0, 1.95), P(-.55, 0, 2.15)], 'sun', 2.2);
  const hatch = [P(4.4, -.32, 1.88), P(4.93, -.22, 1.93), P(4.89, .22, 1.92), P(4.4, .32, 1.88)];
  surface(H, R, hatch, 'teal', .74, .7);
  H.line(R, [P(4.45, -.3, 1.9), P(4.45, .29, 1.9)], 'paper', 1.5);
  for (const u of [1.12, 4.49]) {
    const bracket = [P(u, -1.02, 1.04), P(u, -.69, 1.48), P(u, -.45, 1.32), P(u, 0, 1.13), P(u, .48, 1.34), P(u, .74, 1.49), P(u, 1.05, 1.04)];
    surface(H, R, bracket, 'teal', .63, .9); H.line(R, bracket.slice(1, 6), 'coral', 3);
    H.line(R, [P(u, 1.02, 1.08), P(u + .53, 1.02, 1.08)], 'blue', 4);
  }
  return P;
}
const room = world('london-maritime-model', 'A mast above the desk', { height: 3.75, wall: 'paper', wallTone: .77, floor: 'paper', head: 65 }, (H, R) => {
  boardFloor(H, R, 0, 0, 12, 12, .025, 'sun', .72);
  windowBay(H, R, 'nw', 4.4, 5.6, 1.3, 2.1, { divisions: 3, ink: 'teal', view: Q => { surface(H, R, [Q(.1, .1), Q(5.5, .1), Q(5.5, .73), Q(.1, .73)], 'teal', .24, .4); for (const u of [.7, 2.5, 4.2]) { H.line(R, [Q(u, .55), Q(u + .34, .55), Q(u + .23, .85)], 'blue', 1.3); H.line(R, [Q(u + .16, .61), Q(u + .16, 1.19)], 'blue', .7); } } });
  recessedFrame(H, R, 'ne', .72, 4.5, 1.65, 1.73, 'sun', P => {
    surface(H, R, [P(.16, .16), P(4.34, .16), P(4.34, 1.58), P(.16, 1.58)], 'paper', 1, .5);
    H.line(R, [P(.4, .46), P(1.1, .21), P(3.45, .23), P(4.05, .54)], 'blue', 1.3);
    H.line(R, [P(1.72, .42), P(1.72, 1.39)], 'blue', 1.1); H.line(R, [P(2.96, .4), P(2.96, 1.13)], 'blue', 1);
    for (const [u, z] of [[1.72, 1.36], [2.96, 1.1]]) { H.line(R, [P(.62, .48), P(u, z), P(3.8, .49)], 'coral', .7); H.line(R, [P(u - .5, z - .28), P(u + .5, z - .28)], 'blue', .8); }
  });
  wallRack(H, R, 'ne', 6.1, 5.15, .32, 3.1, 4, 'teal', (Q, z, row) => {
    if (row === 0) for (let n = 0; n < 4; n++) { const u = .18 + n * 1.22; surface(H, R, [Q(u, z + .06), Q(u + 1.08, z + .06), Q(u + 1.08, z + .55), Q(u, z + .55)], 'sun', .4, .6); H.line(R, [Q(u + .38, z + .32), Q(u + .73, z + .32)], 'blue', 1.5); if (n === 2) H.line(R, [Q(u + .23, z + .55), Q(u + .72, z + .77)], 'sun', 2.6); }
    if (row === 1) for (let n = 0; n < 5; n++) { const [x, y] = Q(.53 + n * 1.0, z + .28); for (let k = 0; k < 3; k++) H.outline(R, ell(x, y, 8 + k * 2, 4 + k), n % 2 ? 'coral' : 'sun', .8); }
    if (row === 2) for (let n = 0; n < 3; n++) { const u = .3 + n * 1.57; surface(H, R, [Q(u, z + .16), Q(u + .26, z + .04), Q(u + 1.2, z + .06), Q(u + 1.38, z + .23)], 'sun', .66, .7); H.line(R, [Q(u + .63, z + .15), Q(u + .63, z + .66)], 'blue', 1.3); H.line(R, [Q(u + .25, z + .46), Q(u + 1.08, z + .46)], 'coral', .8); }
    if (row === 3) for (let n = 0; n < 9; n++) { const u = .23 + n * .49; surface(H, R, [Q(u, z + .04), Q(u + .35, z + .04), Q(u + .35, z + .5 + n % 2 * .1), Q(u, z + .5 + n % 2 * .1)], ['paper', 'coral', 'sun'][n % 3], .66, .5); }
  });
  cabinetFrame(H, R, .35, .6, 3.65, 1.1, .05, 1.2, 2, 'sun', (i, j, w, d, z, h, n) => { if (!n) for (let k = 0; k < 5; k++) timber(H, R, i + .08, j + .1, w - .16, d - .18, z + k * .16, .07, k % 2 ? 'paper' : 'coral'); else { metal(H, R, i + .16, j + .12, w - .32, d - .22, z + .1, .23, 'teal'); drape(H, R, i + .2, j + .15, w - .4, d - .3, z + .4, .2, 'paper'); } });
  benchFrame(H, R, 2.5, 3.7, 6.5, 3.0, 1.0, 'sun');
  for (const i of [3.72, 7.14]) { metal(H, R, i, 4.32, .5, 1.42, 1.0, .13, 'blue'); metal(H, R, i + .14, 4.75, .2, .2, 1.13, .34, 'teal'); oval(H, R, ...H.p(i + .25, 5.0, 1.45), 5, 4, 'sun', .8); }
  metal(H, R, 7.66, 5.8, .6, .3, 1.02, .14, 'teal');
  H.line(R, [H.p(7.78, 5.99, 1.17), H.p(7.96, 5.99, 1.17)], 'coral', 3);
  drape(H, R, 2.64, 5.49, .82, 1.0, 1.02, .55, 'paper');
  taskLight(H, R, 8.39, 3.94, 1.02, 'coral', .6);
  benchFrame(H, R, 8.8, 8.42, 2.55, 2.0, .83, 'teal');
  surface(H, R, H.tile(9.0, 8.62, 2.16, 1.58, .86), 'blue', .58, .7);
  for (const [i, j, w, d] of [[9.0, 8.62, .25, 1.58], [10.91, 8.62, .25, 1.58], [9.1, 8.62, 1.9, .25], [9.1, 9.94, 1.9, .25]]) timber(H, R, i, j, w, d, .86, .16, 'paper');
  surface(H, R, [H.p(9.4, 9.82, 1.04), H.p(9.4, 9.1, 1.04), H.p(9.72, 8.96, 1.04), H.p(9.8, 8.7, 1.04), H.p(10.04, 8.7, 1.04), H.p(10.16, 8.96, 1.04), H.p(10.53, 9.1, 1.04), H.p(10.53, 9.82, 1.04)], 'teal', .36, .6);
  H.line(R, [H.p(9.4, 8.82, 1.1), H.p(10.7, 9.85, 1.1)], 'coral', 2.4);
  benchFrame(H, R, .9, 8.5, 2.8, 2.0, .75, 'sun');
  for (let n = 0; n < 4; n++) timber(H, R, 1.15 + n * .22, 8.78, .18, .6, .77 + n * .1, .1, 'sun');
  timber(H, R, 1.03, 8.66, 1.2, .85, 1.21, .11, 'teal');
  for (const [i, j] of [[2.75, 8.9], [2.96, 9.55]]) { oval(H, R, ...H.p(i, j, .82), 9, 5, 'sun', .72); H.line(R, [H.p(i - .14, j, .84), H.p(i + .14, j, .84)], 'blue', 1.4); }
  const [ax, ay] = H.p(2.2, 9.84, .82); H.line(R, [[ax, ay - 10], [ax, ay + 8], [ax - 9, ay + 1]], 'blue', 2); H.line(R, [[ax, ay + 8], [ax + 9, ay + 1]], 'blue', 2); oval(H, R, ax, ay - 12, 3, 3, 'sun', .7);
}, (H, R, t) => {
  const u = cycle(t, 18) * 18, lift = u < 3.6 ? 0 : u < 7.2 ? smooth((u - 3.6) / 3.6) : u < 10.8 ? 1 : 1 - smooth((u - 10.8) / 5.2);
  const P = ship(H, R, lift * .18), target = P(5.02, 1.02, 1.08), foot = H.p(8.12, 6.49), scale = 1.8;
  const q = { ...rest, head: 7 + 5 * lift, al: 44, el: 46 };
  const dx = (target[0] - foot[0]) / scale - 5.2, dy = (target[1] - foot[1]) / scale + 32.5, a = 4.368, b = 4.2;
  const l = Math.min(a + b - .001, Math.max(.2, Math.hypot(dx, dy))), e = Math.acos((l * l - a * a - b * b) / (2 * a * b));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(e), a + b * Math.cos(e))) * 180 / Math.PI; q.er = e * 180 / Math.PI;
  const leftTarget = P(4.49, 1.02, 1.08), lx = (leftTarget[0] - foot[0]) / scale + 5.2, ly = (leftTarget[1] - foot[1]) / scale + 32.5, ll = Math.min(a + b - .001, Math.max(.2, Math.hypot(lx, ly))), le = -Math.acos((ll * ll - a * a - b * b) / (2 * a * b));
  q.al = (Math.atan2(lx, ly) - Math.atan2(b * Math.sin(le), a + b * Math.cos(le))) * 180 / Math.PI; q.el = le * 180 / Math.PI;
  FIGURES.clips.londonModelMaker.keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x: foot[0], y: foot[1], scale, clip: 'londonModelMaker', phase: 0, face: 'se', ground: foot, opts: { shirt: ['teal', .72], apron: ['paper', .88], glasses: true } });
  actor(H, R, 4.2, 7.6, u, 'londonModelVisitor', { shirt: ['coral', .68], hairStyle: 'curly' }, 0, 1.7);
  H.dot(...target, 2.8, 'coral', .35, { knock: true });
  const [x, y] = H.p(11.12, .62, 2.69), sway = Math.sin(TAU * u / 18) * 1.3;
  stroke(H, R, [[x, y], [x + sway, y + 18], [x + 4, y + 22]], 'coral', 1);
});
room.loopSeconds = 18;
room.stillTime = 9;
export default room;
