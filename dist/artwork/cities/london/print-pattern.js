import { world, shape, stroke, oval, wallPt, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, vessel, branchSpray, drape, bentTube } from '../materials.js';
import { cabinetFrame, boardFloor, basin } from '../structure.js';
import { windowBay, wallRack, hangingRail, floorShadow, specimen, taskLight, caster } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const rest = FIGURES.clips.idle.keys[0][1];
FIGURES.clips.londonPatternDesigner = { dur: 22, keys: [[0, { ...rest }], [1, { ...rest }]] };
function leaf(H, R, P, u, v, size, ink = 'teal', turn = 0, hole = false) {
  const Q = (a, b) => P(u + (a * Math.cos(turn) - b * Math.sin(turn)) * size, v + (a * Math.sin(turn) + b * Math.cos(turn)) * size);
  shape(H, R, [Q(-.42, -.08), Q(-.2, .33), Q(.07, .43), Q(.48, .15), Q(.4, -.13), Q(.1, -.34), Q(-.25, -.24)], ink, .62, .65);
  H.line(R, [Q(-.44, -.15), Q(0, .04), Q(.46, .2)], 'sun', 1.0);
  for (const n of [-.22, 0, .2]) { H.line(R, [Q(n, n * .45 + .03), Q(n + .04, .27)], 'paper', .65); H.line(R, [Q(n, n * .45 + .03), Q(n + .13, -.16)], 'paper', .65); }
  if (hole) oval(H, R, ...Q(.12, .21), 3, 2, 'paper', 1);
}
function tile(H, R, P, ink = 'teal', turn = 0, missing = false) {
  const corners = [P(-.58, -.42), P(.58, -.42), P(.58, .42), P(-.58, .42)];
  surface(H, R, corners, 'paper', 1, .6);
  H.line(R, [P(-.56, -.38), P(.54, -.38)], 'sun', 1.7);
  leaf(H, R, P, -.07, .02, .83, ink, turn);
  if (!missing) shape(H, R, [P(.4, -.35), P(.52, -.18), P(.32, -.14)], 'coral', .75, .4);
}
function folio(H, R, i, j, z, w, d, ink) {
  timber(H, R, i, j, w, d, z, .045, ink);
  surface(H, R, H.tile(i + .035, j + .035, w - .07, d - .07, z + .05), 'paper', 1, .5);
  H.line(R, [H.p(i + .11, j, z + .06), H.p(i + .11, j + d, z + .06)], ink, 2.5);
}
const boardPoint = (H, u, v) => H.p(3.25 + u, 3.25 - v * .2, 1.05 + v);
const room = world('london-print-pattern', 'A leaf turned sideways', { floor: 'paper', wall: 'paper', wallTone: .88, height: 3.8, head: 35 }, (H, R) => {
  boardFloor(H, R, .03, .03, 11.94, 11.94, .025, 'paper', .75);
  for (let u = .15; u < 11.8; u += .6) { surface(H, R, H.tile(u, 11.1, .5, .52, .035), u % 1.2 < .6 ? 'teal' : 'coral', .35, .4); surface(H, R, H.tile(11.1, u, .52, .5, .035), 'teal', .25, .4); }
  windowBay(H, R, 'ne', 1.5, 8.9, 2.25, 1.25, { divisions: 5, ink: 'teal', view: Q => { for (let n = 0; n < 7; n++) { const x = .3 + n * 1.2; surface(H, R, [Q(x, .13), Q(x + 1, .13), Q(x + 1, .4 + n % 3 * .17), Q(x, .4 + n % 3 * .17)], n % 2 ? 'teal' : 'coral', .2, .4); } } });
  for (const u of [1.45, 10.43]) { H.line(R, [wallPt(H, 'ne', u, 3.48, -.25), wallPt(H, 'ne', u + .5, 3.23, -.55)], 'blue', 1.5); }
  for (const side of ['nw', 'ne']) {
    H.line(R, [wallPt(H, side, .15, 3.67, -.16), wallPt(H, side, 11.75, 3.67, -.16)], 'teal', 5);
    H.line(R, [wallPt(H, side, .15, 3.72, -.16), wallPt(H, side, 11.75, 3.72, -.16)], 'sun', 1.2);
  }
  const archive = (u, z, depth = 1.05) => H.p(depth, u, z);
  surface(H, R, H.faceJ(.12, .7, 8.7, .2, 3.33), 'blue', .63);
  for (const u of [.64, 3.55, 6.48, 9.39]) timber(H, R, .08, u, 1.08, .16, .15, 3.24, 'teal');
  for (const z of [.16, 1.12, 1.95, 2.72, 3.31]) timber(H, R, .08, .64, 1.08, 8.91, z, .12, 'teal');
  for (let n = 0; n < 3; n++) {
    const u = .86 + n * 2.9;
    for (let row = 0; row < 3; row++) {
      const z = .28 + row * .26, pull = n === 1 && row === 2 ? .56 : 0;
      surface(H, R, H.faceJ(1.18 + pull, u, 2.48, z, z + .21), 'sun', .5, .7);
      H.line(R, [archive(u + .86, z + .1, 1.2 + pull), archive(u + 1.61, z + .1, 1.2 + pull)], 'blue', 1.8);
      if (pull) {
        surface(H, R, H.tile(1.12, u, pull, 2.48, z + .22), 'blue', .65, .6);
        for (let k = 0; k < 4; k++) tile(H, R, (a, b) => H.p(1.47 + a * .32, u + .32 + k * .59 + b * .42, z + .23), k === 2 ? 'coral' : 'teal', k === 1 ? 1.57 : 0);
      }
    }
    if (n !== 1) for (let k = 0; k < 4; k++) {
      const z = 1.27 + k * .14;
      surface(H, R, H.faceJ(1.05, u + .14 + k * .03, 2.09, z, z + .1), k % 2 ? 'coral' : 'paper', .8, .65);
      H.line(R, [archive(u + .25, z + .04), archive(u + 2.12, z + .04)], 'teal', .6);
    }
    else {
      for (let k = 0; k < 3; k++) {
        const [x, y] = archive(u + .38 + k * .72, 1.55, .78);
        H.line(R, [[x, y], [x + 13, y - 8]], 'blue', 13);
        oval(H, R, x + 13, y - 8, 7, 5, k === 1 ? 'coral' : 'sun', .73);
        oval(H, R, x + 13, y - 8, 2, 1.7, 'blue', .8);
      }
    }
    for (let k = 0; k < 3; k++) {
      const z = 2.1, v = u + .1 + k * .8;
      surface(H, R, [archive(v, z), archive(v + .67, z), archive(v + .67, z + .45), archive(v, z + .45)], 'sun', .56, .7);
      leaf(H, R, archive, v + .34, z + .23, .4, k === 1 && n === 2 ? 'coral' : 'teal', k * .9);
    }
    for (let k = 0; k < 5; k++) {
      const v = u + .14 + k * .41;
      surface(H, R, [archive(v, 2.85), archive(v + .32, 2.85), archive(v + .3, 3.21), archive(v - .02, 3.21)], ['paper','coral','teal'][k % 3], .76, .55);
      H.line(R, [archive(v + .08, 2.9), archive(v + .06, 3.15)], 'sun', 1);
    }
  }
  timber(H, R, .05, .57, 1.19, 9.06, 3.4, .1, 'sun');
  hangingRail(H, R, 'nw', 9.9, 1.6, 2.85, 2, (P, u, n) => {
    const cloth = [P(u - .28, -.13), P(u + .3, -.13), P(u + .35, -.94), P(u - .25, -1.04)];
    surface(H, R, cloth, n ? 'coral' : 'paper', .7, .7);
    H.line(R, [P(u - .17, -.21), P(u - .13, -.89)], 'teal', 1.5);
    for (let z = -.26; z > -.88; z -= .16) H.line(R, [P(u + .15, z), P(u + .22, z - .04)], 'sun', 1);
  });
  timber(H, R, .1, 10.05, 1.0, 1.35, .08, .68, 'teal');
  surface(H, R, H.faceJ(1.12, 10.15, 1.11, .2, .62), 'paper', .9, .7);
  H.line(R, [H.p(1.13, 10.56, .45), H.p(1.13, 10.87, .45)], 'blue', 1.7);
  for (const i of [1.35, 2.58]) for (const j of [5.6, 7.19]) caster(H, R, i, j);
  for (const z of [.3, .57, .86, 1.16, 1.47]) {
    metal(H, R, 1.3, 5.52, 1.38, 1.83, z, .06, 'teal');
    folio(H, R, 1.45, 5.66, z + .07, 1.05, 1.47, z < 1 ? 'teal' : 'coral');
    leaf(H, R, (a, b) => H.p(1.97 + a * .7, 6.4 + b, z + .15), 0, 0, .78, z < 1 ? 'teal' : 'coral', z);
  }
  for (const i of [1.3, 2.6]) for (const j of [5.52, 7.27]) bentTube(H, R, [[i, j, .19], [i, j, 1.72]], 1.9, 'teal');
  bentTube(H, R, [[1.3, 7.3, 1.45], [1.3, 7.3, 1.78], [2.6, 7.3, 1.78], [2.6, 7.3, 1.45]], 2.3, 'teal');
  const Q = (u, v) => boardPoint(H, u, v);
  floorShadow(H, 2.85, 2.75, 6.35, 3, .14);
  for (const i of [3.4, 8.05]) { timber(H, R, i, 2.7, .2, 2.7, .02, .13, 'teal'); bentTube(H, R, [[i + .1, 2.82, .17], [i + .1, 2.9, 3.21]], 4.1, 'teal'); bentTube(H, R, [[i + .1, 5.25, .16], [i + .1, 2.9, 2.53]], 2.7, 'teal'); }
  timber(H, R, 3.3, 4.4, 5.1, .15, .38, .18, 'teal');
  for (const i of [3.5, 8.15]) {
    bentTube(H, R, [[i, 4.48, .46], [i, 3.01, 2.2]], 3, 'teal');
    const [x, y] = H.p(i, 2.97, 2.18);
    oval(H, R, x, y, 12, 10, 'blue', .75);
    oval(H, R, x, y, 8, 6.5, 'sun', .75);
    H.line(R, [[x - 11, y], [x + 11, y]], 'teal', 3.2);
    H.dot(x, y, 2.5, 'paper', 1);
  }
  surface(H, R, [Q(-.14, -.14), Q(5.44, -.14), Q(5.44, 2.28), Q(-.14, 2.28)], 'sun', .55, 1.3);
  surface(H, R, [Q(0, 0), Q(5.3, 0), Q(5.3, 2.14), Q(0, 2.14)], 'blue', .55, .8);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
    const u = .05 + c * 1.3, v = .08 + r * 1.03;
    surface(H, R, [Q(u, v), Q(u + 1.25, v), Q(u + 1.25, v + .91), Q(u, v + .91)], 'teal', .4, .65);
    H.line(R, [Q(u, v), Q(u + 1.25, v)], 'sun', 1.8);
    for (const x of [u + .08, u + 1.16]) H.dot(...Q(x, v + .07), 1.4, 'paper', 1);
  }
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { if (r === 0 && c === 3) continue; const P = (a, b) => Q(.68 + c * 1.3 + a, .55 + r * 1.03 + b); tile(H, R, P, (r + c) % 3 ? 'teal' : 'coral', c % 2 ? Math.PI : 0, c === 1 && r === 0); }
  for (const u of [.2, 5.08]) { metal(H, R, 3.25 + u, 2.69, .19, .24, 3.18, .12, 'blue'); H.dot(...Q(u, 2.18), 2.6, 'sun', .9, { knock: true }); }
  H.line(R, [Q(-.12, -.05), Q(5.43, -.05)], 'paper', 2);
  for (const u of [.3, 1.65, 3, 4.35]) { H.line(R, [Q(u, -.05), Q(u + .22, -.05)], 'blue', 2); }
  for (const i of [3.22, 8.6]) {
    const [x, y] = H.p(i, 3.37, 1.1);
    shape(H, R, [[x - 5, y], [x + 7, y], [x + 7, y + 16], [x - 5, y + 16]], 'teal', .6, .7);
    H.line(R, [[x + 1, y + 1], [x + 1, y + 13]], 'sun', 1.2);
  }
  benchFrame(H, R, 7.6, .75, 3.3, 1.1, 1.12, 'sun');
  metal(H, R, 8.05, 1.0, 1.25, .58, 1.13, .06, 'blue');
  H.line(R, [H.p(8.25, 1.21, 1.29), H.p(8.95, 1.21, 1.29)], 'blue', 9); H.line(R, [H.p(8.63, 1.2, 1.3), H.p(8.63, 1.63, 1.3)], 'sun', 3);
  for (const [i, ink] of [[9.65, 'teal'], [10.2, 'coral']]) vessel(H, R, i, 1.12, 1.16, 8, 13, ink, false);
  drape(H, R, 10.3, 1.26, .5, .45, 1.14, .52, 'paper');
  hangingRail(H, R, 'ne', 10.2, 1.2, 2.0, 1, (P, u) => { const [x, y] = P(u, -.14); shape(H, R, [[x - 7, y], [x + 7, y], [x + 13, y + 44], [x - 12, y + 44]], 'coral', .45, .75); H.line(R, [[x - 5, y + 5], [x - 7, y + 35]], 'paper', .85); });
  cabinetFrame(H, R, 9.5, 2.13, 2.12, 1.46, .03, 1.12, 2, 'teal', (i, j, w, d, z, h, n) => {
    if (n) drape(H, R, i, j, w, d, .48, .33, 'coral');
    else vessel(H, R, i + .38, j + .4, .19, 12, 18, 'paper');
  });
  basin(H, R, 9.53, 2.15, 2.04, 1.4, 1.15, 'paper');
  bentTube(H, R, [[10.5, 2.8, .95], [10.5, 2.8, .3], [10.95, 2.8, .3], [10.95, 2.8, .7]], 3, 'teal');
  drape(H, R, 11.05, 2.95, .36, .39, 1.35, .55, 'paper');
  vessel(H, R, 10.3, 6.95, 0, 17, 29, 'coral');
  const [px, py] = H.p(10.3, 6.95, .9);
  specimen(H, R, px, py, 1.8, 'teal');
  leaf(H, R, (a, b) => [px + a * 35, py - 46 + b * 35], .35, -.3, .8, 'teal', -.5, true);
  cabinetFrame(H, R, 3.0, 8.2, 4.5, 1.8, .06, .73, 3, 'sun', (i, j, w, d, z, h, n) => {
    if (n === 0) for (let k = 0; k < 5; k++) folio(H, R, i + .03, j + .07, .21 + k * .075, w - .13, d - .14, k % 2 ? 'coral' : 'teal');
    if (n === 1) { surface(H, R, H.faceI(i + .04, j + d + .08, w - .06, .22, .55), 'coral', .46, .6); H.line(R, [H.p(i + .4, j + d + .09, .4), H.p(i + .85, j + d + .09, .4)], 'blue', 2); }
    if (n === 2) for (let k = 0; k < 3; k++) vessel(H, R, i + .23 + k * .36, j + .4, .22, 5, 15, ['teal','coral','sun'][k], false);
  });
  timber(H, R, 2.91, 8.12, 4.68, 1.96, .73, .08, 'sun');
  folio(H, R, 3.25, 8.42, .8, 1.65, 1.25, 'coral');
  leaf(H, R, (u, v) => H.p(4.02 + u, 9.02 + v, .89), 0, 0, .78, 'teal', .3, true);
  folio(H, R, 5.24, 8.44, .8, 1.7, 1.15, 'teal');
  const overlay = H.tile(5.4, 8.65, 1.0, .8, .9); H.tint(overlay, 'coral', .22); H.outline(R, overlay, 'blue', .7);
  metal(H, R, 6.75, 9.3, .5, .48, .8, .07, 'teal');
  oval(H, R, ...H.p(6.99, 9.52, .89), 7, 4, 'paper', 1);
  taskLight(H, R, 3.14, 8.47, .85, 'teal', .65);
  const tooltop = H.p(7.12, 8.65, .85);
  for (let n = 0; n < 3; n++) {
    H.line(R, [[tooltop[0] - 8 + n * 6, tooltop[1] + n * 3], [tooltop[0] + 7 + n * 6, tooltop[1] + 8 + n * 3]], 'sun', 3);
    H.line(R, [[tooltop[0] + 7 + n * 6, tooltop[1] + 8 + n * 3], [tooltop[0] + 13 + n * 6, tooltop[1] + 10 + n * 3]], 'blue', 1.1);
  }
  const shavings = [[7.7, 9.35], [7.95, 9.7], [7.57, 10.11]];
  for (const [i, j] of shavings) { const [x, y] = H.p(i, j, .035); stroke(H, R, [[x - 4, y], [x - 1, y - 5], [x + 6, y], [x + 2, y + 4]], 'sun', 2); }
  timber(H, R, 10.7, 10.75, .62, .45, .02, .18, 'sun');
  leaf(H, R, (u, v) => H.p(11.0 + u, 10.95 + v, .22), 0, 0, .48, 'coral', .5);
  H.line(R, [H.p(11.5, 8.5, .025), H.p(11.5, 11.65, .025)], 'blue', 2);
}, (H, R, t) => {
  const u = cycle(t, 22) * 22, lift = u < 4.4 ? smooth(u / 4.4) : u < 13.2 ? 1 : 1 - smooth((u - 13.2) / 6.8);
  const turn = u < 4.4 ? 0 : u < 8.8 ? smooth((u - 4.4) / 4.4) : u < 13.2 ? 1 : 1 - smooth((u - 13.2) / 6.8);
  const Q = (a, b) => boardPoint(H, 5.16 + (a - .58) * Math.cos(turn * Math.PI), .55 + b + lift * .26);
  tile(H, R, Q, 'teal', turn * Math.PI);
  const target = Q(.58, -.12), foot = H.p(8.72, 3.51), scale = 1.8;
  const q = { ...rest, head: 6 + 8 * turn, al: 37, el: 52 };
  const dx = (target[0] - foot[0]) / scale - 5.2, dy = (target[1] - foot[1]) / scale + 32.5, a = 4.368, b = 4.2;
  const len = Math.min(a + b - .001, Math.max(.2, Math.hypot(dx, dy))), bend = Math.acos((len * len - a * a - b * b) / (2 * a * b));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(bend), a + b * Math.cos(bend))) * 180 / Math.PI; q.er = bend * 180 / Math.PI;
  FIGURES.clips.londonPatternDesigner.keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x: foot[0], y: foot[1], scale, clip: 'londonPatternDesigner', phase: 0, face: 'se', ground: foot, opts: { shirt: ['coral', .68], apron: ['paper', .86], hairStyle: 'bun' } });
  H.dot(...target, 2.8, 'coral', .35, { knock: true });
  const p = boardPoint(H, .2, 1.9), sway = Math.sin(u * TAU / 22) * 3;
  H.opacity(.43, () => shape(H, R, [[p[0], p[1]], [p[0] + 40, p[1] + 20], [p[0] + 44 + sway, p[1] + 58], [p[0] + 3, p[1] + 38]], 'paper', 1, .5));
  const [x, y] = H.p(.57, 8.85, 2.85);
  shape(H, R, [[x, y], [x + 21, y - 10], [x + 22 + sway * .3, y + 17], [x + 2, y + 26]], 'coral', .42, .5);
  H.line(R, [[x + 4, y + 21], [x + 21, y + 13]], 'sun', 1.5);
});
room.loopSeconds = 22;
room.stillTime = 11;
export default room;
