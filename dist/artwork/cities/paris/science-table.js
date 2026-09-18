import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, benchFrame, vessel, cushion } from '../materials.js';
import { windowBay, wallCourse, cornice, wallRack, floorShadow, recessedFrame, taskLight, caster } from '../joinery.js';
import { cabinetFrame } from '../structure.js';

const smooth = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function seed(H, R, x, y, size = 1, angle = 0) {
  const P = (a, b) => [x + (a * Math.cos(angle) - b * Math.sin(angle)) * size, y + (a * Math.sin(angle) + b * Math.cos(angle)) * size];
  shape(H, R, [[-14, 0], [-9, -8], [1, -13], [24, -10], [15, -2], [3, 3]].map(p => P(...p)), 'teal', .42, .7);
  stroke(H, R, [P(-11, 0), P(5, -5), P(22, -9)], 'blue', .7);
  for (let k = 0; k < 6; k++) stroke(H, R, [P(-3 + k * 3, -3 - k), P(-2 + k * 3, -9 - k * .3)], 'sun', .6);
  oval(H, R, ...P(-10, 1), 5 * size, 3.5 * size, 'sun', .8);
}
function visitor(H, R, i, j, z, hands, child = false, lean = 0) {
  const [x, y] = H.p(i, j, z), s = child ? .9 : 1.3, shoulder = [x + lean, y - 39 * s];
  oval(H, R, x, y + 1, 12 * s, 4 * s, 'blue', .15);
  for (const k of [-1, 1]) {
    stroke(H, R, [[x + k * 4 * s, y - 20 * s], [x + k * 5 * s, y - 3]], 'blue', 6 * s);
    oval(H, R, x + k * 5 * s + 2, y - 1, 5 * s, 2.7 * s, 'blue', .8);
  }
  shape(H, R, [[shoulder[0] - 9 * s, shoulder[1]], [shoulder[0] + 8 * s, shoulder[1]], [x + 8 * s, y - 18 * s], [x - 8 * s, y - 18 * s]], child ? 'coral' : 'teal', .7);
  for (let k = 0; k < 2; k++) {
    const start = [shoulder[0] + (k ? 7 : -7) * s, shoulder[1] + 3], end = hands[k];
    const path = [start, [(start[0] + end[0]) / 2 + (k ? 5 : -5), Math.max(start[1], end[1]) + 8 * s], end];
    stroke(H, R, path, 'blue', 7 * s); stroke(H, R, path, child ? 'coral' : 'teal', 5 * s);
    oval(H, R, ...end, 2.5 * s, 2.2 * s, 'paper', 1);
  }
  oval(H, R, shoulder[0] + 1, shoulder[1] - 10 * s, 7.2 * s, 8 * s, 'paper', 1);
  shape(H, R, [[shoulder[0] - 6 * s, shoulder[1] - 8 * s], [shoulder[0] - 7 * s, shoulder[1] - 17 * s], [shoulder[0] + 4 * s, shoulder[1] - 18 * s], [shoulder[0] + 8 * s, shoulder[1] - 12 * s], [shoulder[0], shoulder[1] - 13 * s]], 'blue', .8);
  H.dot(shoulder[0] + 4 * s, shoulder[1] - 9 * s, .8, 'blue');
}
function shell(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y - 2, 10 * size, 6 * size, 'paper', 1);
  const points = []; for (let n = 0; n < 30; n++) { const a = n * .3, r = n * .19 * size; points.push([x + Math.cos(a) * r, y - 2 + Math.sin(a) * r * .62]); }
  stroke(H, R, points, 'coral', .9);
}
const room = world('paris-science-table', 'A lens brings it closer', { floor: 'paper', wall: 'paper', wallTone: .85, height: 3.65, head: 20, pattern: 'tiles' }, (H, R) => {
  wallCourse(H, R, 'nw', .2, 11.7, .62, 'teal'); cornice(H, R, 'ne', .1, 11.8, 3.62);
  const W = windowBay(H, R, 'nw', 1.3, 7.3, 1.05, 2.25, { divisions: 4, view: P => {
    for (let n = 0; n < 5; n++) shape(H, R, [P(.2 + n * 1.3, .2), P(1.3 + n * 1.3, .2), P(1.3 + n * 1.3, .65 + n % 2 * .4), P(.2 + n * 1.3, .8)], 'teal', .16, .5);
  }});
  H.line(R, [W(6.8, .5, .28), W(6.4, .9, .8)], 'blue', 1.6);
  H.tint(H.tile(.7, 3.7, 6.2, 5.8, .025), 'sun', .15);
  recessedFrame(H, R, 'nw', 9.15, 2.32, .08, 2.95, 'teal', P => {
    shape(H,R,[P(.16,.12),P(2.15,.12),P(2.15,2.79),P(.16,2.79)],'sun',.22,.6);
    for(const z of [.3,1.05,1.85])shape(H,R,[P(.31,z),P(1.99,z),P(1.99,z+.58),P(.31,z+.58)],'paper',.8,.8);
    H.line(R,[P(.47,1.31,.25),P(.47,1.64,.25)],'blue',3);
    for(const z of [.3,2.54])H.line(R,[P(2.08,z),P(2.08,z+.16)],'sun',3);
  });
  timber(H,R,.48,1.4,1.2,6.97,.06,.62,'teal');
  for(let n=0;n<5;n++){
    const j=1.55+n*1.32;
    shape(H,R,H.faceJ(1.7,j,1.17,.17,.58),'paper',.74,.7);
    H.line(R,[H.p(1.72,j+.38,.43),H.p(1.72,j+.76,.43)],'blue',2);
    timber(H,R,.44,j-.05,1.3,1.26,.68,.1,'sun');
    if(n===0){metal(H,R,.77,j+.16,.61,.7,.79,.07,'teal');shell(H,R,1.08,j+.45,.89,.7);}
    if(n===1){for(let k=0;k<3;k++)timber(H,R,.62,j+.17+k*.24,.86,.17,.8,.13,['paper','coral','sun'][k]);}
    if(n===2){const q=H.p(1,j+.58,.82);oval(H,R,...q,14,5,'sun',.8);oval(H,R,q[0],q[1]-4,11,4,'paper',1);seed(H,R,q[0],q[1]-3,.45,.6);}
    if(n===3){shape(H,R,H.tile(.6,j+.11,.99,.94,.81),'paper',1,.6);const q=H.p(1.12,j+.6,.82);seed(H,R,...q,.68,-.4);H.line(R,[[q[0]-14,q[1]+7],[q[0]-1,q[1]+12]],'coral',2.7);}
    if(n===4){vessel(H,R,1.04,j+.59,.8,8,10,'teal');const q=H.p(1.04,j+.59,1.13);for(let k=0;k<3;k++)H.line(R,[[q[0]-4+k*3,q[1]+3],[q[0]-7+k*7,q[1]-12]],'sun',2);}
  }
  benchFrame(H,R,2.3,.55,4.79,1.37,1.17,'teal');
  shape(H,R,H.tile(2.43,.65,4.54,1.12,1.18),'blue',.57,.6);
  for(const x of [2.76,4.85]){
    metal(H,R,x,.88,.83,.65,1.2,.07,'sun');
    const q=H.p(x+.41,1.22,1.29);
    shape(H,R,[[q[0]-15,q[1]],[q[0]+14,q[1]+1],[q[0]+2,q[1]-27]],'paper',.54,.9);
    H.line(R,[[q[0]+2,q[1]-27],[q[0]+2,q[1]-3]],'teal',1.3);
    shape(H,R,[[q[0]+2,q[1]-27],[q[0]+14,q[1]+1],[q[0]+24,q[1]-6],[q[0]+11,q[1]-33]],'teal',.19,.8);
  }
  for(let n=0;n<3;n++)H.line(R,[H.p(3.2,1.23,1.3),H.p(4.37,1.44+n*.1,1.3)],['sun','coral','teal'][n],1.9);
  for(const x of [3.65,6.15]){
    metal(H,R,x,.91,.13,.75,1.2,.12,'blue');
    shape(H,R,[H.p(x,.98,1.32),H.p(x+.7,.98,1.32),H.p(x+.7,.86,2.12),H.p(x,.86,2.12)],'paper',1,.7);
    oval(H,R,...H.p(x+.36,.93,1.73),8,10,'blue',.72);
  }
  for(let n=0;n<3;n++)timber(H,R,2.5+n*1.38,.66,1.15,1.09,.34,.18,n===1?'paper':'sun');
  taskLight(H,R,6.68,.9,1.2,'coral',-.66);
  floorShadow(H, 7.8, .7, 3.5, 1.5, .22);
  cabinetFrame(H, R, 7.8, .65, 3.6, 1.2, .1, 3.15, 2, 'teal', (x, j, w, d, z, h, col) => {
    for (let row = 0; row < 5; row++) {
      const zz = z + row * .48;
      timber(H, R, x, j, w, d, zz, .09, 'sun');
      if (row < 3) {
        metal(H, R, x + .05, j + d - .23, w - .1, .23, zz + .1, .28, row === 1 && col === 1 ? 'paper' : 'sun');
        shape(H, R, H.faceI(x + .2, j + d + .01, .55, zz + .18, zz + .29), 'paper', 1, .35);
        H.line(R, [H.p(x + w * .64, j + d + .04, zz + .21), H.p(x + w * .85, j + d + .04, zz + .21)], 'blue', 1.8);
      } else {
        shell(H, R, x + .5, j + .37, zz + .11, .7);
        if (col) seed(H, R, ...H.p(x + 1, j + .42, zz + .15), .4, -.3);
        else metal(H, R, x + .85, j + .22, .35, .35, zz + .12, .37, 'paper');
      }
    }
    for (let n = 0; n < 4; n++) H.line(R, [H.p(x + .18 + n * .31, j, 2.85), H.p(x + .18 + n * .31, j, 3.07)], 'paper', .8);
  });
  wallRack(H, R, 'ne', 1.25, 5.85, 2.02, 1.15, 1, 'sun', (P, z) => {
    for (let n = 0; n < 3; n++) {
      shape(H, R, [P(.35 + n * 1.55, z + .03), P(1.12 + n * 1.55, z + .03), P(.83 + n * 1.55, z + .76)], n === 1 ? 'teal' : 'paper', n === 1 ? .35 : 1, .8);
      H.line(R, [P(.52 + n * 1.55, z + .09), P(.83 + n * 1.55, z + .62)], 'sun', 1.4);
    }
  });
  const card = [wallPt(H, 'ne', 5.5, .92, -.12), wallPt(H, 'ne', 6.65, .92, -.12), wallPt(H, 'ne', 6.65, 1.65, -.12), wallPt(H, 'ne', 5.5, 1.65, -.12)];
  shape(H, R, card, 'paper', 1, .6); seed(H, R, ...wallPt(H, 'ne', 6.1, 1.28, -.15), .72, .3);
  floorShadow(H,2.25,3.35,5.6,3.05,.28);
  for(const x of [2.47,7.24]){
    timber(H,R,x,3.55,.34,2.45,.07,.85,'teal');
    metal(H,R,x-.09,3.43,.51,2.7,.04,.1,'blue');
    H.line(R,[H.p(x+.36,3.68,.2),H.p(x+.36,5.78,.83)],'sun',2.2);
  }
  timber(H,R,2.59,3.62,4.96,2.27,.33,.12,'teal');
  for(let n=0;n<3;n++){
    const x=3.68+n*1.05;
    timber(H,R,x,5.09,.92,.86,.47,.22,'sun');
    shape(H,R,H.tile(x+.07,5.17,.78,.69,.7),'blue',.58,.5);
    for(let k=0;k<3;k++)shape(H,R,H.tile(x+.14+k*.19,5.24,.15,.52,.71),'paper',1,.4);
    H.line(R,[H.p(x+.28,5.96,.59),H.p(x+.66,5.96,.59)],'blue',1.7);
  }
  const worktop=[[2.25,3.58],[2.45,3.35],[7.59,3.35],[7.85,3.61],[7.85,6.1],[7.56,6.4],[2.5,6.4],[2.25,6.13]];
  shape(H,R,worktop.map(([i,j])=>H.p(i,j,.93)),'sun',.68,.9);
  shape(H,R,[...worktop.slice(3).map(([i,j])=>H.p(i,j,.93)),...worktop.slice(3).reverse().map(([i,j])=>H.p(i,j,1.08))],'sun',.73,.8);
  shape(H,R,worktop.map(([i,j])=>H.p(i,j,1.08)),'sun',.38,.9);
  H.line(R,[H.p(2.54,6.39,1.08),H.p(7.5,6.39,1.08)],'paper',2);
  for(const x of [2.63,7.43])for(const j of [3.65,6.03]){oval(H,R,...H.p(x,j,1.09),2.1,1.3,'blue',.7);}
  bentTube(H,R,[[2.85,6.46,.84],[2.85,6.58,.73],[3.5,6.58,.73],[3.5,6.46,.84]],2,'teal');
  timber(H, R, 2.4, 4.0, 1.1, 1.15, .32, .08, 'teal');
  for (let n = 0; n < 4; n++) timber(H, R, 2.48 + n * .24, 4.08, .2, .8, .4, .18 + n % 2 * .06, n % 2 ? 'paper' : 'coral');
  metal(H, R, 3.85, 4.32, 2.8, 2.0, 1.085, .08, 'teal');
  shape(H, R, H.tile(4, 4.48, 2.5, 1.67, 1.17), 'blue', .45, .6);
  for (const x of [4.02, 6.4]) metal(H, R, x, 5.72, .13, .28, 1.16, .12, 'coral');
  timber(H, R, 3.85, 6.65, 2.75, 1.32, .03, .3, 'teal');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(4 + n * .4, 6.72, .34), H.p(4 + n * .4, 7.84, .34)], 'paper', 1.2);
  floorShadow(H, 8.4, 5.1, 2.3, 3.2, .14);
  benchFrame(H, R, 8.25, 5.0, 2.5, 2.0, .78, 'teal');
  shape(H, R, H.tile(8.5, 5.23, 1.75, 1.22, .8), 'paper', 1, .7);
  seed(H, R, ...H.p(9.4, 5.9, .84), .65, -.2);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(8.52 + n * .23, 6.75, .81), H.p(8.68 + n * .23, 6.25, .81)], ['coral', 'sun', 'teal'][n], 3.1);
  cushion(H, R, 9.15, 7.4, 1.3, 1.1, .04, .15, 'coral');
  timber(H,R,8.43,5.22,2.02,1.51,.31,.08,'sun');
  for(let n=0;n<3;n++)timber(H,R,8.58+n*.47,5.45,.39,1.12,.41,.14,n===1?'coral':'paper');
  metal(H,R,8.55,5.25,.28,1.12,.83,.035,'blue');
  for(let k=0;k<4;k++)H.line(R,[H.p(8.56,5.4+k*.22,.88),H.p(8.8,5.4+k*.22,.88)],'paper',.8);
  const stencil=H.p(10,5.97,.84);H.outline(R,ell(stencil[0],stencil[1],8,5),'teal',2,{amp:0});
  benchFrame(H,R,9.43,9.3,1.77,1.62,.67,'teal');
  metal(H,R,9.47,9.34,1.69,1.5,.69,.06,'sun');
  shape(H,R,H.tile(9.6,9.47,1.4,1.21,.76),'blue',.48,.5);
  for(const j of [9.49,10.39])timber(H,R,9.65,j,1.28,.13,.77,.25,'sun');
  const kit=H.p(10.3,10.03,.81);oval(H,R,...kit,10,6,'paper',1);oval(H,R,...kit,7,3.6,'teal',.24);H.line(R,[[kit[0]+8,kit[1]+4],[kit[0]+21,kit[1]+12]],'coral',4);
  for(const [i,j] of [[9.53,9.42],[10.98,9.42],[9.53,10.8],[10.98,10.8]])caster(H,R,i,j,.03);
  bentTube(H,R,[[10.94,9.39,.69],[10.94,9.39,1.38],[10.12,9.39,1.38]],2.3,'teal');
  shell(H, R, 2.8, 5.95, 1.1, .72);
  const cone = H.p(2.8, 4.3, 1.12);
  oval(H, R, cone[0], cone[1] - 8, 9, 14, 'sun', .65);
  for (let r = 0; r < 4; r++) for (let n = 0; n < 3; n++) if (!(r === 2 && n === 1)) stroke(H, R, [[cone[0] - 7 + n * 5, cone[1] - 18 + r * 6], [cone[0] - 4 + n * 5, cone[1] - 14 + r * 6], [cone[0] - 1 + n * 5, cone[1] - 18 + r * 6]], 'blue', .7);
  shape(H, R, H.tile(7.05, 4.15, .58, .85, 1.1), 'teal', .6, .7);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(7.1, 4.2 + n * .18, 1.115), H.p(7.57, 4.2 + n * .18, 1.115)], 'paper', .8);
  benchFrame(H, R, 1.55, 8.65, 5.55, 1.03, .67, 'teal');
  for (let n = 0; n < 5; n++) {
    const x = 1.7 + n * 1.07;
    timber(H, R, x, 8.78, .87, .76, .67, .05, 'sun');
    if (n === 0) { const P = H.p(x + .43, 9.13, .75); shape(H, R, [[P[0]-11,P[1]+1],[P[0]-8,P[1]-9],[P[0]+2,P[1]-13],[P[0]+12,P[1]-3],[P[0]+6,P[1]+5]], 'blue', .35, .8); H.line(R, [[P[0]-7,P[1]-5],[P[0]+3,P[1]-2],[P[0]+8,P[1]-5]], 'paper', 1); }
    if (n === 1) shell(H, R, x + .42, 9.12, .78, .85);
    if (n === 2) { const P=H.p(x+.42,9.13,.77), Q=[];for(let k=0;k<45;k++){const a=k*.28,r=k*.24;Q.push([P[0]+Math.cos(a)*r,P[1]+Math.sin(a)*r*.5]);}stroke(H,R,Q,'sun',4);stroke(H,R,Q,'blue',.7); }
    if (n === 3) { const P=H.p(x+.42,9.14,.78);stroke(H,R,[[P[0]-10,P[1]+6],[P[0]+11,P[1]-9]],'blue',1.4);for(let k=0;k<6;k++)stroke(H,R,[[P[0]-8+k*3,P[1]+4-k*2],[P[0]-12+k*3,P[1]-2-k*2],[P[0]-7+k*3,P[1]-5-k*2]],'teal',1.4); }
    if (n === 4) { shape(H,R,H.tile(x+.1,8.85,.6,.55,.74),'coral',.45,.7);for(let k=0;k<4;k++)H.line(R,[H.p(x+.12+k*.14,8.85,.75),H.p(x+.12+k*.14,9.4,.75)],'paper',1.2); }
  }
  timber(H,R,1.82,9.6,.68,.15,.12,.4,'sun');
  timber(H,R,6.12,9.6,.68,.15,.12,.4,'sun');
  shape(H,R,H.tile(1.95,7.15,1.13,.95,.045),'paper',1,.6);
  const drawing=H.p(2.52,7.64,.055);seed(H,R,...drawing,.48,-.2);
  H.line(R,[[drawing[0]-4,drawing[1]-2],[drawing[0]+7,drawing[1]-6]],'coral',2.4);
  timber(H,R,6.67,3.55,.86,.65,1.1,.06,'sun');
  const empty=H.p(7.1,3.89,1.17);shape(H,R,[[empty[0]-9,empty[1]+2],[empty[0]-10,empty[1]-3],[empty[0]-4,empty[1]-7],[empty[0]+5,empty[1]-6],[empty[0]+10,empty[1]],[empty[0]+5,empty[1]+4]],'teal',.38,.7);
  metal(H, R, 4.04, 3.56, 1.5, .6, 1.1, .18, 'blue');
  bentTube(H, R, [[4.8, 3.85, 1.25], [4.8, 3.85, 2.65], [4.8, 4.24, 2.8]], 4.8, 'teal');
  metal(H, R, 4.73, 3.77, .19, .22, 1.55, .35, 'teal');
  for(let n=0;n<11;n++)H.line(R,[H.p(4.73,3.87,1.57+n*.079),H.p(4.91,3.87,1.57+n*.079)],'sun',1.2);
  const knob=H.p(4.93,3.89,1.85);oval(H,R,...knob,8,7,'sun',.85);oval(H,R,...knob,4.8,4,'teal',.8);
  for(let n=0;n<8;n++){const a=n*Math.PI/4;H.dot(knob[0]+Math.cos(a)*6,knob[1]+Math.sin(a)*5,1.15,'blue');}
  bentTube(H,R,[[4.04,3.83,1.13],[4.04,3.67,1.57],[4.43,3.67,1.57]],1.4,'sun');
  for(const x of [4.15,5.35])for(const j of [3.63,4.04])H.dot(...H.p(x,j,1.3),1.6,'paper');
}, (H, R, t) => {
  const u = ((t % 24) + 24) % 24, turn = smooth(4.8, 9.6, u) * (1 - smooth(14.4, 21, u));
  const a = -.45 + turn * .9, center = H.p(5.23, 5.28, 1.19);
  oval(H, R, ...center, 39, 19, 'sun', .75); oval(H, R, ...center, 34, 15, 'paper', 1);
  seed(H, R, center[0], center[1], .77, a);
  shape(H, R, [[center[0] + 23, center[1] + 3], [center[0] + 31, center[1] - 3], [center[0] + 28, center[1] + 5]], 'teal', .5, .6);
  const hand = [center[0] + Math.cos(a + 1.2) * 36, center[1] + Math.sin(a + 1.2) * 16];
  visitor(H, R, 5.4, 6.62, .35, [[center[0] - 26, center[1] + 9], hand], true, 1);
  visitor(H, R, 7.0, 5.65, 0, [H.p(6.6, 5.66, 1.16), H.p(6.65, 4.95, 1.16)], false, -3 - 2 * turn);
  const [x, y] = H.p(5.0, 4.6, 2.25);
  stroke(H, R, [[x - 44, y], [x - 50, y + 8], [x - 47, y + 38], [x + 45, y + 38], [x + 49, y + 6], [x + 43, y]], 'blue', 4);
  H.tint(ell(x, y, 39, 40), 'teal', .075);
  H.outline(R, ell(x, y, 43, 44), 'blue', 5, { amp: .12 });
  H.outline(R, ell(x, y, 39, 40), 'sun', 2.1, { amp: .1 });
  for (const dx of [-46, 46]) { oval(H, R, x + dx, y, 5.5, 5.5, 'teal', .9); H.line(R, [[x + dx - 3, y], [x + dx + 3, y]], 'paper', 1.2); }
  stroke(H, R, [[x - 26, y - 24], [x - 16, y - 32], [x - 2, y - 34]], 'paper', 3.2);
  seed(H, R, x, y + 4, 1.28, a);
  const flutter = Math.sin(u * Math.PI / 12) * smooth(0, 2, u) * (1 - smooth(21, 24, u));
  shape(H, R, [H.p(7.13, 5.35, 1.1), H.p(7.7, 5.35, 1.1), H.p(7.7, 5.87, 1.1 + flutter * .045), H.p(7.13, 5.87, 1.1)], 'paper', 1, .5);
});
room.loopSeconds = 24;
room.stillTime = 11.5;
export default room;
