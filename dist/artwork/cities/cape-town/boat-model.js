import { world, shape, oval, stroke, box, actor, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, drape, bentTube, floorLight } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, recessedFrame } from '../joinery.js';

const rest = { ...FIGURES.clips.idle.keys[0][1] };
const rig = { ...rest };
FIGURES.clips['cape-town-model-maker'] = { dur: 24, keys: [[0, rig], [1, rig]] };
FIGURES.clips['cape-town-model-child'] = { dur: 24, keys: [[0, { ...rest, head: -14 }], [.4, { ...rest, lean: -9, head: 5, ar: 45, er: 40 }], [.6, { ...rest, lean: -9, head: 5, ar: 45, er: 40 }], [.92, { ...rest, head: -14 }], [1, { ...rest, head: -14 }]] };
const smooth = (a, b, t) => { const v = Math.max(0, Math.min(1, (t - a) / (b - a))); return v * v * (3 - 2 * v); };
const liftAt = t => smooth(4.8, 9.6, t) * (1 - smooth(14.4, 22, t));
function reach(H, targets, z) {
  Object.assign(rig, rest, { head: 12, y: -z * 5 });
  const foot = H.p(5.3 + z * .3, 5.9 - z * .3), scale = 1.8;
  for (const [s, target, sign] of [['l', targets[0], -1], ['r', targets[1], 1]]) {
    const dx = (target[0] - foot[0]) / scale - sign * 5.2;
    const dy = (target[1] - foot[1]) / scale + 32.5 - rig.y;
    const d = Math.min(8.55, Math.max(.3, Math.hypot(dx, dy))), a = 4.368, b = 4.2;
    const bend = Math.acos(Math.max(-1, Math.min(1, (d * d - a * a - b * b) / (2 * a * b))));
    rig['a' + s] = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(bend), a + b * Math.cos(bend))) * 180 / Math.PI;
    rig['e' + s] = bend * 180 / Math.PI;
  }
}
function hull(H, R, i, j, length, width, z, miniature = false) {
  const P = (u, v, h = 0) => H.p(i + u, j + v, z + h);
  const edge = [];
  for (let n = 0; n <= 24; n++) { const a = n * Math.PI / 24; edge.push(P(length * n / 24, -Math.sin(a) * width / 2, .52)); }
  for (let n = 24; n >= 0; n--) { const a = n * Math.PI / 24; edge.push(P(length * n / 24, Math.sin(a) * width / 2, .52)); }
  shape(H, R, edge, 'sun', .72, 1.3);
  const bottom = [P(0, 0, .52), P(length * .17, .13, .02), P(length * .78, .16, .02), P(length, 0, .52)];
  shape(H, R, bottom, 'sun', .46, 1);
  if (!miniature) {
    for (const v of [-1, 1]) {
      const rim = [], chine = [];
      for (let n = 0; n <= 24; n++) {
        const u = length * n / 24, r = Math.sin(n * Math.PI / 24) * width;
        rim.push(P(u, v * r * .5, .52));
        chine.push(P(u, v * r * .28, .08));
      }
      shape(H, R, rim.concat(chine.reverse()), 'sun', v > 0 ? .65 : .45, .8);
      for (let k = 1; k < 5; k++) {
        const seam = [];
        for (let n = 0; n <= 24; n++) seam.push(P(length * n / 24, v * Math.sin(n * Math.PI / 24) * width * (.28 + k * .044), .08 + k * .088));
        H.line(R, seam, k === 4 ? 'paper' : 'coral', k === 4 ? 1.4 : .65);
      }
      for (let n = 2; n < 23; n += 3) H.dot(...P(length * n / 24, v * Math.sin(n * Math.PI / 24) * width * .49, .51), 1, 'blue');
    }
    for (const u of [0, length]) stroke(H, R, [P(u, 0, .04), P(u, 0, .33), P(u, 0, .61)], 'teal', 3.5);
  }
  const inner = [];
  for (let n = 1; n < 24; n++) inner.push(P(length * n / 24, -Math.sin(n * Math.PI / 24) * width * .43, .54));
  for (let n = 23; n > 0; n--) inner.push(P(length * n / 24, Math.sin(n * Math.PI / 24) * width * .43, .54));
  shape(H, R, inner, 'blue', .8, .6);
  H.line(R, [P(.18, 0, .22), P(length - .18, 0, .22)], 'sun', 3);
  for (let n = 1; n < (miniature ? 5 : 10); n++) {
    const u = length * n / (miniature ? 5 : 10), r = Math.sin(u / length * Math.PI) * width * .43;
    stroke(H, R, [P(u, -r, .57), P(u, -r * .64, .28), P(u, 0, .18), P(u, r * .64, .28), P(u, r, .57)], n === 4 ? 'coral' : 'sun', miniature ? 1 : 3.2);
    if (!miniature) H.line(R, [P(u, -r, .6), P(u, r, .6)], 'paper', .75);
  }
  for (const u of [length * .2, length * .8]) for (const v of [-1, 1]) {
    box(H, R, i + u - .07, j + v * width * .24 - .07, .14, .14, z + .5, .13, 'sun');
    H.dot(...P(u, v * width * .24, .69), 1.4, 'paper');
  }
}
const room = world('cape-town-boat-model', 'The hull shows its ribs', { floor: 'paper', tone: .38, wall: 'paper', wallTone: .8, height: 4.2, head: 45 }, (H, R) => {
  masonry(H, R, 'nw', 0, 12, 0, .85, 'teal', .25);
  windowBay(H, R, 'nw', 1.15, 7.8, 2.65, 1.25, { divisions: 5, view: P => {
    shape(H, R, [P(0, 0), P(7.8, 0), P(7.8, .42), P(5.7, .38), P(4.8, .7), P(3.8, .35), P(0, .3)], 'teal', .23);
    H.line(R, [P(.2, .24), P(7.5, .24)], 'blue', .6);
  } });
  for (const j of [.2, 11.7]) metal(H, R, .12, j, .16, .16, 0, 4.25, 'blue');
  bentTube(H, R, [[.2, .2, 4.2], [.2, 5.7, 4.75], [.2, 11.8, 4.2]], 4, 'blue');
  bentTube(H, R, [[.2, .2, 4.2], [.2, 11.8, 4.2]], 2, 'blue');
  for (let j = 1; j < 11; j += 2) bentTube(H, R, [[.2, j, 4.2], [.2, 5.7, 4.75]], 1, 'teal');
  bentTube(H, R, [[11.6, .15, .1], [11.6, .15, 3.6], [6, .15, 3.6]], 1.8, 'teal');
  cabinetFrame(H, R, 5.9, .2, 5.75, 1.1, .12, 3.25, 3, 'sun', (x, y, w, d, z, h, n) => {
    for (const zz of [z + .65, z + 1.45, z + 2.2]) timber(H, R, x, y, w, d, zz, .08, 'sun');
    if (n === 0) {
      for (let k = 0; k < 7; k++) timber(H, R, x + .12 + k * .2, y + .15, .09, .21, z + .72, 1.3 + k % 3 * .13);
      for (let k = 0; k < 3; k++) { const p = H.p(x + .4 + k * .44, y + .55, z + .22); H.outline(R, ell(...p, 8, 4), 'coral', 2); }
    } else if (n === 1) {
      hull(H, R, x + .12, y + .42, w - .2, .6, z + .73, true);
      drape(H, R, x + .1, y, w - .2, .55, z + 2.3, .5, 'paper');
    } else {
      for (let k = 0; k < 3; k++) box(H, R, x + .08, y + .12, w - .16, .5, z + k * .2, .17, k === 1 ? 'coral' : 'teal', .45);
      shape(H, R, H.faceI(x + .15, y + .35, w - .25, z + .78, z + 1.42), 'paper', 1);
      for (let k = 0; k < 4; k++) H.line(R, [H.p(x + .27, y + .36, z + .92 + k * .1), H.p(x + w - .25, y + .36, z + 1.02 + k * .1)], 'blue', .6);
    }
  });
  recessedFrame(H, R, 'ne', 1.2, 3.55, 1.5, 2.2, 'teal', P => {
    for (let k = 0; k < 4; k++) stroke(H, R, [P(.25 + k * .72, .2), P(.13 + k * .72, 1), P(.4 + k * .72, 1.75), P(.62 + k * .72, 1.9)], k === 2 ? 'coral' : 'sun', 3);
  });
  timber(H, R, 1.15, .15, 3.6, .6, 1.38, .1, 'teal');
  for (const i of [1.4, 4.2]) bentTube(H, R, [[i, .1, 1.38], [i, .7, 1.05], [i, .7, 1.38]], 1.5);
  const pulley = H.p(2.4, .55, 1.3);
  H.line(R, [pulley, [pulley[0], pulley[1] + 17]], 'blue', .7);
  oval(H, R, pulley[0], pulley[1] + 22, 5, 6, 'sun'); H.dot(pulley[0], pulley[1] + 22, 2, 'blue');
  recessedFrame(H, R, 'nw', 9.3, 2.1, 1.25, 2.2, 'sun', P => {
    shape(H, R, [P(.2, .23), P(1.88, .23), P(1.88, 1.97), P(.2, 1.97)], 'paper', 1);
    shape(H, R, [P(.28, .66), P(1.75, .66), P(1.43, .34), P(.59, .34)], 'blue', .8);
    H.line(R, [P(1, .63), P(1, 1.76)], 'teal', 1.3);
    shape(H, R, [P(.94, 1.65), P(.94, .79), P(.3, .79)], 'coral', .56);
    shape(H, R, [P(1.08, 1.63), P(1.08, .83), P(1.73, .83)], 'sun', .6);
  });
  for (const j of [1.7, 4.2, 6.9]) for (const i of [.35, 1.5]) timber(H, R, i, j, .16, .16, .08, 1.05, 'teal');
  timber(H, R, .25, 1.65, 1.48, 5.5, 1.05, .16, 'sun');
  timber(H, R, .33, 1.72, 1.28, 5.33, .25, .09, 'teal');
  for (let n = 0; n < 4; n++) {
    const j = 1.85 + n * 1.25;
    shape(H, R, H.faceJ(1.64, j, 1.12, .39, .9), 'teal', .55, .9);
    shape(H, R, H.faceJ(1.66, j + .09, .94, .47, .82), 'paper', .32, .6);
    H.line(R, [H.p(1.68, j + .42, .7), H.p(1.68, j + .73, .7)], 'sun', 2.7);
  }
  for (let n = 0; n < 3; n++) {
    const j = 2.12 + n * 1.45;
    const plan = H.tile(.42, j, 1.02, 1.05, 1.225);
    shape(H, R, plan, 'paper', 1, .6);
    for (let k = 0; k < 5; k++) stroke(H, R, [H.p(.55, j+.1+k*.17, 1.24), H.p(1.1, j+.2+k*.17, 1.24), H.p(1.32, j+.12+k*.17, 1.24)], 'teal', .7);
    H.line(R, [H.p(.6, j+.13, 1.25), H.p(1.3, j+.87, 1.25)], 'coral', 1.2);
    metal(H, R, .53, j + .8, .25, .16, 1.24, .12, 'blue');
  }
  const vise = H.p(1.7, 6.55, 1.22);
  metal(H, R, 1.42, 6.28, .55, .45, 1.1, .26, 'teal');
  H.line(R, [[vise[0]-8,vise[1]+8],[vise[0]+11,vise[1]+17]], 'blue', 2);
  H.line(R, [[vise[0]+8,vise[1]+9],[vise[0]+8,vise[1]+24]], 'sun', 2);
  timber(H, R, .35, 2.1, .65, 4.6, 1.35, .1, 'teal');
  for (let k = 0; k < 6; k++) {
    const j = 2.3 + k * .64;
    stroke(H, R, [H.p(.6, j, 1.46), H.p(.65, j + .11, 1.65), H.p(.5, j + .15, 2), H.p(.37, j, 2.35 + k % 2 * .12)], k === 2 ? 'coral' : 'sun', 5);
    H.line(R, [H.p(.32, j, 1.66), H.p(.92, j, 1.66)], 'blue', 1.4);
  }
  benchFrame(H, R, 2.7, 9.3, 3.25, 1.3, .56, 'sun');
  const section = [H.p(3.1, 9.95, .61), H.p(3.35, 9.72, 1.02), H.p(3.75, 9.65, 1.17), H.p(4.2, 9.72, 1.02), H.p(4.45, 9.95, .61)];
  stroke(H, R, section, 'teal', 5);
  stroke(H, R, section.map(([x, y]) => [x, y - 3]), 'paper', 1);
  box(H, R, 4.6, 9.5, .6, .65, .59, .09, 'paper', .9);
  const hole = H.p(4.9, 9.8, .69); oval(H, R, ...hole, 4, 2.2, 'blue', .8);
  H.line(R, [H.p(4.75, 10.28, .6), H.p(5.4, 10.28, .6)], 'sun', 2.4);
  for (const i of [3.1, 5.4]) metal(H, R, i, 9.55, .16, .16, .59, .33, 'blue');
  for (let k = 0; k < 3; k++) timber(H, R, 2.98 + k * .2, 9.58, 2.28 - k * .25, .14, .18 + k * .09, .08, 'sun');
  floorLight(H, 5.7, 5.4, 140, .4);
  timber(H, R, 2.7, 4.1, 5.55, 2.25, .15, .15, 'sun');
  for (const j of [4.22, 6.07]) {
    timber(H, R, 2.86, j, 5.18, .12, .31, .12, 'teal');
    for (let i = 3; i < 8; i += .34) H.line(R, [H.p(i, j, .445), H.p(i, j+.1, .445)], 'paper', .8);
  }
  for (const i of [3.3, 6.9]) {
    timber(H, R, i, 4.3, .5, 2, .05, .18, 'teal');
    for (const j of [4.45, 5.85]) timber(H, R, i + .1, j, .3, .3, .22, .61, 'teal');
    cushion(H, R, i + .05, 4.5, .4, 1.6, .78, .11);
  }
  hull(H, R, 2.65, 5.15, 5.35, 1.65, .74);
  for (const i of [3.3, 6.9]) for (const j of [4.37, 5.77]) {
    bentTube(H, R, [[i+.22,j,.3],[i+.22,j,.85],[i+.39,j,.96]], 1.8, 'blue');
    const p = H.p(i+.23,j,.65); oval(H,R,...p,4,2.2,'coral',.85);
  }
  shape(H,R,H.tile(7.2,4.24,.72,.36,.45),'paper',1,.6);
  H.line(R,[H.p(7.25,4.4,.47),H.p(7.8,4.4,.47)],'teal',1);
  const plane=H.p(7.68,5.94,.49); shape(H,R,[[plane[0]-12,plane[1]+3],[plane[0]+11,plane[1]+3],[plane[0]+8,plane[1]-3],[plane[0]-10,plane[1]-4]],'blue',.75,.7);
  stroke(H,R,[[plane[0]-5,plane[1]-3],[plane[0]-4,plane[1]-11],[plane[0]+4,plane[1]-11],[plane[0]+6,plane[1]-3]],'sun',2.5);
  benchFrame(H, R, .8, 7.9, 2.6, 1.35, .7, 'teal');
  hull(H, R, 1, 8.3, 1.2, .55, .73, true);
  timber(H, R, 2.35, 8.15, .85, .16, .73, .15);
  metal(H, R, 2.55, 8.55, .45, .38, .73, .2, 'blue');
  H.line(R, [H.p(2.75, 8.55, .96), H.p(2.9, 8.65, 1.11)], 'coral', 3);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(2.6 + k * .11, 8.62, .96), H.p(2.6 + k * .11, 8.85, .96)], 'sun', .75);
  box(H, R, 9.3, 3.4, 1.8, 2.4, .05, .35, 'teal', .55);
  shape(H, R, H.tile(9.45, 3.55, 1.5, 2.1, .42), 'blue', .6);
  for (const j of [3.65, 5]) cushion(H, R, 9.6, j, 1.1, .5, .43, .16);
  drape(H, R, 9.6, 4.2, 1.15, .6, .45, .4, 'paper');
  timber(H, R, 10.95, 3.4, .13, 2.4, .4, 1, 'teal');
  cabinetFrame(H,R,6.6,9.6,3.85,1.25,.12,.8,3,'teal',(x,y,w,d,z,h,n)=>{
    timber(H,R,x,y,w,d,z+.25,.07,'sun');
    for(let k=0;k<3;k++)timber(H,R,x+.12+k*.23,y+.15,.14,.66,z+.33,.12,k===1?'coral':'sun');
  });
  shape(H,R,H.faceI(6.6,9.63,3.85,.95,1.86),'teal',.55,.8);
  shape(H,R,H.faceI(6.77,9.66,3.5,1.09,1.73),'blue',.6,.7);
  for(let k=0;k<5;k++){
    const x=6.96+k*.64;
    stroke(H,R,[H.p(x,9.69,1.2),H.p(x+.14,9.69,1.43),H.p(x+.1,9.69,1.65)],k%2?'sun':'paper',3);
    H.line(R,[H.p(x-.09,9.7,1.27),H.p(x+.25,9.7,1.27)],'coral',1.8);
  }
  for(const i of[6.8,10.1])metal(H,R,i,9.63,.16,.15,.91,.13,'sun');
  const coil=H.p(9,10.32,1);for(let k=0;k<4;k++)H.outline(R,ell(coil[0],coil[1],12+k*2,5+k*.9),'sun',1.4);
  drape(H,R,9.75,10.2,.48,.46,.96,.4,'paper');
  stroke(H,R,[H.p(8.6,10.9,.04),H.p(8.4,10.5,.06),H.p(8.1,10.55,.07)],'coral',1.5);
  metal(H, R, 8.2, 10.9, 3.3, .14, .015, .035, 'blue');
  for (let i = 8.3; i < 11.5; i += .25) H.line(R, [H.p(i, 10.88, .055), H.p(i, 11.07, .055)], 'paper', .65);
  bentTube(H, R, [[3.05, 4.5, .9], [3.05, 4.5, 2.2], [4.1, 4.75, 2.7], [4.4, 4.9, 2.45]], 2, 'blue');
  const lamp = H.p(4.4, 4.9, 2.4); shape(H, R, [[lamp[0] - 11, lamp[1] + 5], [lamp[0] + 11, lamp[1] + 5], [lamp[0] + 5, lamp[1] - 5], [lamp[0] - 5, lamp[1] - 5]], 'sun', .8);
}, (H, R, t) => {
  const u = ((t % 24) + 24) % 24, lift = liftAt(u), z = 1.43 + lift * .3;
  const P = (i, j, h = 0) => H.p(i + lift * .3, j - lift * .3, z + h);
  const deck = [P(3.15, 5.14), P(3.55, 4.67), P(6.95, 4.68), P(7.6, 5.14), P(7.05, 5.64), P(3.55, 5.63)];
  H.tint(deck.map(([x, y]) => [x + 4, y + 7 + lift * 13]), 'blue', .16 * (1 - lift * .45));
  shape(H, R, deck, 'paper', 1, 1.1);
  for (let i = 3.6; i < 7.1; i += .32) H.line(R, [P(i, 4.78, .01), P(i, 5.55, .01)], 'sun', .8);
  shape(H, R, [P(5, 4.92, .025), P(5.5, 4.92, .025), P(5.5, 5.33, .025), P(5, 5.33, .025)], 'teal', .42);
  H.line(R, [P(5, 5.3, .03), P(5.5, 5.3, .03)], 'coral', 2.3);
  oval(H, R, ...P(5.35, 5.52, .03), 6, 2.5, 'blue', .7);
  const grip = P(5.35, 5.52, .03), hands = [[grip[0] - 5, grip[1]], [grip[0] + 5, grip[1]]];
  reach(H, hands, lift);
  actor(H, R, 5.3 + lift * .3, 5.9 - lift * .3, t, 'cape-town-model-maker', { shirt: ['coral', .7], apron: ['paper', .7], glasses: true }, 0, 1.8);
  actor(H, R, 7.45, 6.7, t, 'cape-town-model-child', { face: 'sw', shirt: ['sun', .78], hairStyle: 'curly' }, 0, 1.5, 'child');
  for (const p of hands) oval(H, R, p[0], p[1], 2.3, 2.1, 'coral', .45);
  const p = H.p(8.84, 1.12, 2.67); stroke(H, R, [[p[0] - 15, p[1]], [p[0], p[1] + Math.sin(u * Math.PI / 12) * 2], [p[0] + 14, p[1] + 2]], 'paper', 2);
});
room.loopSeconds = 24;
room.stillTime = 12;
export default room;
