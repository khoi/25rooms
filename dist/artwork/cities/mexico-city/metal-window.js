import { world, box, shape, stroke, oval, ell, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, metal, timber, bentTube, benchFrame, floorLight } from '../materials.js';
import { masonry, archedBay, rackFrame } from '../structure.js';
import { recessedFrame, taskLight, caster } from '../joinery.js';

const clamp = v => Math.max(0, Math.min(1, v));
const ease = v => { const q = clamp(v); return q * q * (3 - 2 * q); };
const rest = { ...FIGURES.clips.idle.keys[0][1] };
const contact = { ...rest };
FIGURES.clips.mexicoMetalFabricator = { dur: 22, keys: [[0, contact], [1, contact]] };
FIGURES.clips.mexicoMetalCustomer = { dur: 22, keys: [[0, { ...rest, head: 8, ar: 26 }], [.4, { ...rest, head: 16, lean: -9, ar: 28 }], [.6, { ...rest, head: 16, lean: -9, ar: 28 }], [1, { ...rest, head: 8, ar: 26 }]] };

function joint(H, R, p, r = 3) {
  oval(H, R, ...p, r, r * .65, 'paper', 1);
  H.dot(...p, r * .4, 'blue');
}
function tube(H, R, a, b, width = 4) {
  stroke(H, R, [a, b], 'blue', width + 1.4);
  stroke(H, R, [a, b], 'teal', width);
  stroke(H, R, [[a[0] - .5, a[1] - .5], [b[0] - .5, b[1] - .5]], 'paper', .65);
}
function arch(H, R) {
  const P = (u, z, d = 0) => H.p(2.65 + u, 3.8 + d, z);
  const out = [P(0, 0), P(4.55, 0), P(4.55, 3.08)];
  for (let k = 0; k <= 24; k++) { const a = Math.PI * k / 24; out.push(P(2.275 + 2.275 * Math.cos(a), 3.08 + .77 * Math.sin(a))); }
  const inner = [P(.36, .36), P(4.19, .36), P(4.19, 2.96)];
  for (let k = 0; k <= 24; k++) { const a = Math.PI * k / 24; inner.push(P(2.275 + 1.915 * Math.cos(a), 2.96 + .55 * Math.sin(a))); }
  surface(H,R,out.map(([x,y])=>[x+9,y-5]),'teal',.5,1.2);
  for(const k of [0,1,2,8,15,22,26]) if(out[k]) surface(H,R,[out[k],out[(k+1)%out.length],[out[(k+1)%out.length][0]+9,out[(k+1)%out.length][1]-5],[out[k][0]+9,out[k][1]-5]],'blue',.35,.7);
  surface(H, R, out, 'paper', 1, 1.4);
  surface(H, R, inner, 'sun', .12, .7);
  for (let n = 0; n < 11; n++) { const a = Math.PI * (n + .5) / 11; H.line(R, [P(2.275 + 1.98 * Math.cos(a), 3.02 + .59 * Math.sin(a)), P(2.275 + 2.24 * Math.cos(a), 3.08 + .75 * Math.sin(a))], 'blue', .7, { tone: .42 }); }
  for(const x of [2.7,6.87]) {
    surface(H,R,[H.p(x,3.1,.17),H.p(x+.3,3.1,.17),H.p(x+.3,3.77,.84),H.p(x,3.77,.84)],'teal',.62);
    for(const z of [.28,.5,.76,3.04]) joint(H,R,H.p(x+.18,3.79,z),2.1);
  }
  for (const x of [2.62, 6.85]) {
    metal(H, R, x, 3.1, .4, 1.55, .04, .16, 'blue');
    for (const j of [3.26, 4.43]) joint(H, R, H.p(x + .2, j, .21), 2.3);
    bentTube(H, R, [[x + .2, 3.15, .22], [x + .2, 3.76, 1.08]], 2.4);
  }
  metal(H, R, 2.96, 3.7, 3.85, .19, .38, .13, 'blue');
  for (const x of [2.97, 6.69]) metal(H, R, x, 3.7, .13, .2, .49, 2.49, 'blue');
  metal(H, R, 3.02, 3.7, 3.77, .2, 2.87, .14, 'blue');
  metal(H, R, 6.75, 3.9, .2, .19, 1.3, .31, 'blue');
  surface(H, R, H.faceI(6.79, 4.1, .09, 1.41, 1.53), 'blue', 1);
  box(H, R, 6.67, 3.92, .17, .16, .75, .15, 'teal', .3);
  for (const z of [.64, 2.58]) {
    metal(H, R, 2.9, 3.91, .32, .14, z, .21, 'sun');
    for (let n = 0; n < 3; n++) metal(H, R, 3.04, 3.95, .13, .13, z - .02 + n * .083, .06, 'blue');
    tube(H, R, H.p(3.095, 4.02, z - .1), H.p(3.095, 4.02, z + .32), 1.6);
  }
}

const room = world('mexico-city-metal-window', 'The grille swings clear', { wall: 'paper', wallTone: .77, height: 4.25, floor: 'paper', tone: .38, head: 44 }, (H, R) => {
  surface(H,R,H.faceI(.12,.1,11.75,.12,1.0),'teal',.18);
  for(const x of [.25,7.8,11.55]) {
    metal(H,R,x,.13,.2,.32,.12,3.97,'paper');
    surface(H,R,[H.p(x,.47,3.1),H.p(x,.47,3.89),H.p(x+.75,.47,3.89)],'teal',.3);
  }
  metal(H,R,.2,.13,11.58,.31,4.01,.13,'blue');
  masonry(H, R, 'nw', .1, 11.8, 0, .75, 'teal', .23);
  archedBay(H, R, 'nw', 1.5, 4.9, 1.35, 2.55, 'teal', P => {
    shape(H, R, [P(.15, .14), P(4.75, .14), P(4.75, 2.3), P(.15, 2.3)], 'sun', .2);
    for (let k = 0; k < 4; k++) H.line(R, [P(.3 + k * 1.1, .15), P(.3 + k * 1.1, .9)], 'teal', 3, { tone: .5 });
  });
  recessedFrame(H, R, 'ne', 3.7, 3.4, 3.12, .65, 'blue', P => {
    for (let n = 0; n < 12; n++) H.line(R, [P(.2 + n * .26, .1), P(.29 + n * .26, .55)], 'paper', 1.5);
  });
  recessedFrame(H,R,'ne',1.0,6.66,1.14,1.67,'sun',P=>{
    surface(H,R,[P(.13,.13),P(6.5,.13),P(6.5,1.52),P(.13,1.52)],'paper',1);
    for(let n=0;n<3;n++) {
      const x=.42+n*2.06;
      H.line(R,[P(x,.35),P(x,1.29),P(x+1.39,1.29),P(x+1.39,.35)],'blue',4);
      H.line(R,[P(x+.14,.4),P(x+.14,1.13),P(x+1.27,1.13)],'teal',2);
      for(let k=0;k<3;k++) H.line(R,[P(x+.36+k*.34,.37),P(x+.36+k*.34,1.17)],n===1?'coral':'teal',1.2);
      H.line(R,[P(x+.04,.38),P(x+.6,.38)],'sun',3);
      H.dot(...P(x+.09,1.22),1.6,'sun');
    }
  });
  bentTube(H, R, [[1.1, .14, 3.7], [8, .14, 3.7], [8, .14, 2.9]], 2.1);
  for (const x of [2, 4, 6]) metal(H, R, x, .1, .14, .2, 3.6, .23, 'blue');
  floorLight(H, 4.2, 5.4, 128, .5);
  surface(H,R,H.tile(.45,1.2,1.25,5.65,.03),'blue',.17,.5);
  benchFrame(H,R,.32,1.12,1.28,5.35,1.03,'teal');
  for(const y of [1.3,2.8,4.3]) {
    surface(H,R,H.faceJ(1.61,y,1.25,.38,.87),'blue',.66);
    timber(H,R,.42,y,1.12,1.21,.34,.1,'sun');
    for(let k=0;k<3;k++) metal(H,R,.54,y+.14+k*.29,.82,.21,.45,.23,k===1?'paper':'teal');
  }
  surface(H,R,H.tile(.36,1.17,1.18,5.21,1.045),'blue',.45);
  for(let n=0;n<4;n++) {
    const y=1.45+n*.73;
    metal(H,R,.51,y,.72,.3,1.06,.1,'sun');
    bentTube(H,R,[[.62,y+.13,1.18],[.62,y+.13,1.67],[.92,y+.13,1.67],[.92,y+.13,1.53]],2.7,n%2?'blue':'coral');
    metal(H,R,.48,y+.08,.82,.11,1.12,.08,'teal');
  }
  metal(H,R,.49,4.6,.79,.89,1.07,.08,'paper');
  for(let n=0;n<4;n++) bentTube(H,R,[[.57,4.72+n*.17,1.17],[1.14,4.72+n*.17,1.17]],1.4,'blue');
  surface(H,R,[H.p(.5,5.7,1.07),H.p(1.31,5.7,1.07),H.p(1.3,6.23,1.08),H.p(1.55,6.54,.69),H.p(.72,6.53,.64)],'paper',1,.7);
  for(let n=0;n<3;n++) H.line(R,[H.p(.7+n*.22,5.76,1.09),H.p(.87+n*.22,6.51,.68)],'coral',.8);
  taskLight(H,R,.72,5.2,1.1,'coral',.55);
  bentTube(H,R,[[1.14,6.25,.14],[1.42,6.6,.11],[1.98,6.5,.12],[2.04,5.99,.1],[1.69,5.61,.11]],1.6,'blue');
  for(const y of [2.1,3.6,5.1]) { H.line(R,[H.p(.2,y,1.22),H.p(.2,y,1.47),H.p(.2,y+.42,1.47)],'blue',1.5); oval(H,R,...H.p(.22,y+.44,1.47),2.4,2.3,'paper',1); }

  rackFrame(H, R, 8.35, .42, 2.7, 1.42, .08, [.18, 1.24, 2.48, 3.47], 'blue', (i, j, w, d, z, n) => {
    if (n === 0) {
      metal(H, R, i + .06, j + .04, 1.05, d - .1, z, .55, 'teal');
      metal(H, R, i + 1.35, j + .2, 1.02, .8, z, .32, 'coral');
      H.line(R, [H.p(i + .34, j + d, z + .36), H.p(i + .77, j + d, z + .36)], 'paper', 2);
    } else if (n === 1) {
      for (let k = 0; k < 7; k++) {
        const x = i + .12 + k * .31;
        bentTube(H, R, [[x, j + .1, z + .13], [x, j + d - .1, z + .13]], 5.3, k % 3 ? 'teal' : 'coral');
        joint(H, R, H.p(x, j + d - .09, z + .13), 2.4);
      }
    } else if (n === 2) {
      for (let k = 0; k < 3; k++) surface(H, R, [H.p(i + .1 + k * .34, j, z), H.p(i + .88 + k * .34, j, z), H.p(i + .98 + k * .34, j, z + .73), H.p(i + .16 + k * .34, j, z + .85)], k % 2 ? 'paper' : 'teal', .38, .8);
      for (let k = 0; k < 6; k++) H.line(R, [H.p(i + 1.42 + k * .15, j + .1, z + .05), H.p(i + 1.7 + k * .15, j + .1, z + .72)], 'blue', .5);
      for (let k = 0; k < 5; k++) H.line(R, [H.p(i + 1.5, j + .1, z + .08 + k * .14), H.p(i + 2.35, j + .1, z + .08 + k * .14)], 'blue', .5);
      stroke(H, R, [H.p(i + 1.7, j + .12, z + .12), H.p(i + 2.2, j + .12, z + .55)], 'coral', 1.8);
    } else {
      for (let k = 0; k < 3; k++) bentTube(H, R, [[i + .2 + k * .7, j + .2, z], [i + .2 + k * .7, j + .2, z + .3], [i + .5 + k * .7, j + .2, z + .3], [i + .5 + k * .7, j + .2, z]], 2.4);
    }
  });
  benchFrame(H, R, .6, 7.3, 2.8, 1.35, .86, 'sun');
  surface(H, R, H.tile(.84, 7.44, 1.2, .95, .87), 'blue', .16, .7);
  bentTube(H, R, [[.99, 7.57, .9], [1.92, 7.57, .9], [1.92, 8.2, .9]], 3.4, 'blue');
  box(H, R, 1.84, 8.13, .17, .19, .9, .045, 'coral');
  metal(H, R, 2.22, 7.55, .68, .55, .88, .08, 'teal');
  for (const a of [.12, .5]) for (const b of [.12, .4]) joint(H, R, H.p(2.22 + a, 7.55 + b, .97), 1.7);
  metal(H, R, .65, 9.5, 1.52, .75, .04, .11, 'teal');
  for (let n = 0; n < 5; n++) { const z = .2 + n * .17; tube(H, R, H.p(.86, 9.73, z), H.p(1.89, 9.73, z), 1.3); }
  for (const i of [.86, 1.89]) tube(H, R, H.p(i, 9.73, .18), H.p(i, 9.73, 1.03), 1.4);
  benchFrame(H, R, 9.25, 5.2, 1.9, 1.42, 1.05, 'teal');
  metal(H, R, 9.51, 5.6, .72, .55, 1.06, .14, 'blue');
  metal(H, R, 9.42, 5.76, .2, .47, 1.19, .38, 'teal');
  metal(H, R, 10.04, 5.76, .2, .47, 1.19, .38, 'teal');
  bentTube(H, R, [[9.29, 6.02, 1.34], [10.36, 6.02, 1.34]], 1.7, 'sun');
  bentTube(H, R, [[10.33, 6.02, 1.07], [10.33, 6.02, 1.61]], 1.8);
  metal(H,R,9.39,5.63,.89,.6,1.19,.09,'sun');
  for(const x of [9.42,10.04]) {
    surface(H,R,[H.p(x,5.72,1.2),H.p(x+.17,5.72,1.2),H.p(x+.24,5.72,1.54),H.p(x-.08,5.72,1.54)],'teal',.66,.7);
    metal(H,R,x-.1,5.72,.35,.54,1.52,.09,'blue');
  }
  bentTube(H,R,[[9.36,6.02,1.34],[10.36,6.02,1.34]],2,'sun');
  for(let k=0;k<8;k++) H.line(R,[H.p(9.58+k*.07,6.027,1.29),H.p(9.62+k*.07,6.027,1.4)],'blue',.8);
  bentTube(H,R,[[10.36,6.02,1.05],[10.36,6.02,1.63]],2.1,'blue');
  for(let k=0;k<7;k++) H.line(R,[H.p(9.45+k*.12,5.91,1.46),H.p(9.45+k*.12,6.09,1.46)],'paper',.6);
  for(const y of [5.34,6.38]) metal(H,R,9.4,y,1.56,.14,.38,.08,'blue');
  metal(H,R,9.51,5.38,1.24,.79,.45,.13,'paper');
  bentTube(H,R,[[9.74,6.22,.63],[9.92,6.21,.82],[10.31,6.21,.82],[10.5,6.22,.63]],2,'coral');
  const cap = H.p(10.7, 5.6, 1.08); oval(H, R, ...cap, 6, 2.8, 'coral'); H.line(R, [[cap[0] - 1, cap[1]], [cap[0] + 2, cap[1] - 7]], 'blue', 2.2);
  for (let k = 0; k < 5; k++) bentTube(H, R, [[8.7 + k * .32, .24, 2.17], [8.7 + k * .32, .24, 2.62]], 2, k % 2 ? 'sun' : 'blue');
  recessedFrame(H, R, 'nw', 7.3, 3.65, 1.56, 1.78, 'teal', P => {
    surface(H, R, [P(.14,.13),P(3.5,.13),P(3.5,1.64),P(.14,1.64)], 'paper', .82);
    for (let n=0;n<4;n++) {
      const x=.4+n*.34;
      H.line(R,[P(x,.31),P(x,1.18)],'blue',2.1);
      H.line(R,[P(x,1.18),P(x,1.48)],n%2?'coral':'sun',3.5);
      H.dot(...P(x,1.53),1.4,'blue');
    }
    for (let n=0;n<2;n++) H.line(R,[P(2+n*.5,.35),P(2+n*.5,1.35),P(2.45+n*.5,1.35)],'blue',3);
    H.line(R,[P(2.05,.35),P(2.4,1.29)],'coral',1);
  });
  benchFrame(H,R,3.9,9.15,2.3,1.43,.62,'teal');
  metal(H,R,4.06,9.3,1.97,1.11,.64,.09,'blue');
  for(const [x,y] of [[4.3,9.54],[4.86,9.74],[5.55,9.57]]) {
    metal(H,R,x,y,.14,.14,.73,.19,'sun');
    joint(H,R,H.p(x+.07,y+.07,.95),2.2);
  }
  oval(H,R,...H.p(4.86,9.75,.86),9,4.5,'sun',.65);
  oval(H,R,...H.p(4.86,9.75,.875),4,2,'blue',.8);
  for(const x of [4.25,5.8]) bentTube(H,R,[[x,10.23,.73],[x,10.23,1.08],[x+.19,10.23,1.08],[x+.19,10.23,.82]],1.8,'coral');
  bentTube(H,R,[[4.36,10.1,.84],[4.42,9.5,.84],[4.91,9.81,.84],[5.34,10.02,.84],[5.69,9.64,.84]],2.5,'teal');
  bentTube(H,R,[[4.97,9.8,.96],[5.84,10.38,.96]],3.3,'coral');
  for(const x of [4.13,5.78]) for(const y of [9.41,10.23]) joint(H,R,H.p(x,y,.745),1.5);
  surface(H,R,[H.p(9.16,.19,3.04),H.p(10.53,.19,3.04),H.p(10.86,.68,2.66),H.p(8.87,.68,2.66)],'blue',.38);
  metal(H,R,9.77,.1,.24,.3,3.04,.9,'teal');
  arch(H, R);
  H.tint(H.tile(7.8, 8.4, 2.7, 1.8, .02), 'blue', .12);
  for(const [x,y] of [[8.1,8.56],[10.48,8.56],[8.1,9.99],[10.48,9.99]]) caster(H,R,x,y);
  metal(H,R,7.95,8.42,2.73,1.77,.2,.12,'blue');
  for(const z of [.4,1.55]) bentTube(H,R,[[8.07,8.54,z],[10.5,8.54,z],[10.5,9.95,z]],2.4,'teal');
  for(let n=0;n<3;n++) {
    const y=8.67+n*.36;
    bentTube(H,R,[[8.34,y,.4],[10.19,y,.4],[10.19,y,1.4],[8.34,y,1.4],[8.34,y,.4]],2.5,n===1?'coral':'blue');
    for(let k=1;k<6;k++) bentTube(H,R,[[8.34+k*.3,y,.42],[8.34+k*.3,y,1.38]],1.2,'teal');
    for(const x of [8.34,10.19]) surface(H,R,[H.p(x-.1,y,.33),H.p(x+.19,y,.34),H.p(x+.12,y,.61),H.p(x-.11,y,.61)],'paper',1,.5);
  }
  surface(H,R,[H.p(9.02,8.54,1.51),H.p(9.3,8.54,1.51),H.p(9.3,9.78,.36),H.p(9.02,9.78,.36)],'sun',.56,.6);
  for (const x of [8.05, 9.9]) bentTube(H, R, [[x, 8.6, .08], [x, 8.6, 1.4], [x + .65, 8.6, 1.4]], 3, 'teal');
  for (let k = 0; k < 1; k++) surface(H, R, [H.p(8.3 + k * .42, 8.59, .1), H.p(8.55 + k * .42, 8.59, .1), H.p(8.55 + k * .42, 8.59, 1.05), H.p(8.3 + k * .42, 8.59, 1.25)], k % 2 ? 'paper' : 'coral', .7);
}, (H, R, t) => {
  const u = ((t % 22) + 22) % 22;
  const open = ease((u - 4.4) / 4.4) * (1 - ease((u - 13.2) / 6.8));
  const angle = open * .43;
  const P = (x, z, offset = 0) => H.p(3.11 + Math.cos(angle) * x, 3.98 + Math.sin(angle) * x + offset, z);
  H.tint([H.p(3.15, 4.06), H.p(6.7, 4.06), H.p(6.7 + open * .6, 5.3 + open * 1.2), H.p(3.7, 5.3)], 'blue', .13);
  for(const z of [.91,2.39]) {
    tube(H,R,P(.07,z),P(3.42,z),1.8);
    for(const x of [.435,1.305,2.175,3.045]) joint(H,R,P(x,z),1.8);
  }
  for (const z of [.54, 2.81]) tube(H, R, P(0, z), P(3.48, z), 4);
  for (const x of [0, 3.48]) tube(H, R, P(x, .54), P(x, 2.81), 4);
  for (let k = 1; k < 8; k++) {
    const x = k * .435;
    tube(H, R, P(x, .6), P(x, 2.74), 2.2);
    if (k % 2) { const pts = []; for (let n = 0; n <= 24; n++) { const a = n * Math.PI * 2 / 24; pts.push(P(x + Math.cos(a) * .28, 1.72 + Math.sin(a) * .3)); } stroke(H, R, pts, 'teal', 1.4); }
  }
  tube(H, R, P(.08, .7), P(3.4, 2.61), 1.5);
  for (let n = 0; n < 6; n++) H.dot(...P(.1 + n * .045, .63 + n * .022), .8, 'coral');
  const handle = P(3.2, 1.52, .06);
  tube(H, R, P(3.15, 1.35, .09), P(3.15, 1.68, .09), 2.6);
  stroke(H, R, [P(3.14, 1.6, .09), P(3.28, 1.6, .09)], 'paper', 1.4);
  tube(H, R, P(3.18, 1.45), P(3.62 - .16 * open, 1.45), 2);
  const root = [handle[0] + 12, handle[1] + 41];
  Object.assign(contact, rest, { head: 12, al: -12, ar: -56, er: -52, lean: -4, ll: -5 - open * 3, lr: 5 + open * 3 });
  FIGURES.draw(H, R, { who: 'adult', x: root[0], y: root[1], ground: root, scale: 1.35, face: 'se', clip: 'mexicoMetalFabricator', phase: 0, t, opts: { shirt: ['teal', .8], apron: ['paper', .84], hairStyle: 'cap' } });
  stroke(H, R, [[root[0] - 5, root[1] - 42], [handle[0] + 5, handle[1] + 7], handle], 'teal', 5.3);
  oval(H, R, ...handle, 2.3, 2.4, 'coral', .33);
  actor(H, R, 8.05, 6.6, t, 'mexicoMetalCustomer', { face: 'sw', shirt: ['coral', .65], hairStyle: 'bun' });
  const s = Math.sin(t * Math.PI * 2 / 22);
  stroke(H, R, [H.p(7.55, .32, 3.72), H.p(7.5 + s * .045, .46, 2.86), H.p(7.8 + s * .04, .55, 2.72), H.p(7.92, .38, 3.3)], 'blue', 1.9);
});
room.loopSeconds = 22;
room.stillTime = 10.7;
export default room;
