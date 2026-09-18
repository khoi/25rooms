import { world, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, surface, vessel, drape, benchFrame, bentTube, pendant } from '../materials.js';
import { windowBay, hangingRail, floorShadow, caster, wallRack } from '../joinery.js';
import { masonry, cabinetFrame, basin } from '../structure.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, hands, shirt = 'teal', lean = 0) {
  const [x, y] = H.p(i, j, 0), c = [x + lean, y - 49];
  oval(H, R, x + 3, y + 2, 18, 5, 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [[x + s * 5, y - 27], [x + s * 7, y - 13], [x + s * 10, y]], 'blue', 7); oval(H, R, x + s * 10 + 2, y, 6, 2.6, 'blue', .9); }
  shape(H, R, [[c[0] - 10, c[1]], [c[0] + 10, c[1]], [x + 9, y - 23], [x - 9, y - 23]], shirt, .7);
  shape(H, R, [[c[0] - 4, c[1] + 4], [c[0] + 5, c[1] + 4], [x + 7, y - 21], [x - 7, y - 21]], 'paper', .95, .6);
  for (let n = 0; n < 2; n++) { const s = n ? 1 : -1, shoulder = [c[0] + s * 9, c[1] + 3], hand = hands[n]; stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], 'blue', 6.4); stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], shirt, 4.6); oval(H, R, ...hand, 3, 2.4, 'coral', .36); }
  oval(H, R, c[0] + 1, c[1] - 12, 8, 9, 'coral', .3);
  shape(H, R, [[c[0] - 7, c[1] - 13], [c[0] - 7, c[1] - 20], [c[0] + 5, c[1] - 22], [c[0] + 9, c[1] - 15], [c[0] + 1, c[1] - 17]], 'blue', .85);
  H.dot(c[0] + 5, c[1] - 11, .85, 'blue');
}
function basket(H, R, i, j, z, w = 1.3, d = .9, lined = false) {
  const P = (u, v, h) => H.p(i + u * w, j + v * d, z + h);
  surface(H, R, [P(.08, .08, 0), P(.92, .08, 0), P(1, 1, .36), P(0, 1, .36)], 'sun', .5);
  surface(H, R, [P(0, 0, .36), P(1, 0, .36), P(1, 1, .36), P(0, 1, .36)], 'blue', .48);
  for (let q = 0; q < 7; q++) H.line(R, [P(q / 7, 1, .34), P(.08 + q / 7 * .84, .1, .02)], 'sun', 1.4);
  for (const h of [.08, .17, .26]) H.line(R, [P(.02, 1, h), P(.98, 1, h)], 'blue', .55);
  H.outline(R, [P(0, 0, .36), P(1, 0, .36), P(1, 1, .36), P(0, 1, .36)], 'sun', 3);
  if (lined) drape(H, R, i + .08, j + .12, w - .16, d - .1, z + .38, .2, 'paper');
}
function loaf(H, R, i, j, z, length = .9) {
  const [x, y] = H.p(i, j, z); oval(H, R, x, y, length * 17, length * 7, 'sun', .78);
  for (let n = -1; n <= 1; n++) stroke(H, R, [[x + n * length * 9 - 2, y - length * 3], [x + n * length * 9 + 2, y + length * 2]], 'paper', 1.5);
}
const room = world('paris-bread-peel', 'The first empty peel', { wall: 'paper', wallTone: .75, height: 4.25, head: 62, floor: 'paper', tone: .65 }, (H, R) => {
  masonry(H, R, 'nw', .05, 7.0, 0, 4.05, 'paper', .8);
  windowBay(H, R, 'ne', 1.0, 4.4, 2.95, .9, { divisions: 4 });
  for (const j of [.3, 7.2]) bentTube(H, R, [[.1, j, 4.13], [3.1, j, 4.13], [5, j, 3.58]], 4, 'teal');
  bentTube(H, R, [[.22, 6.55, .2], [.22, 6.55, 3.2], [.22, 4.95, 3.2], [.22, 4.95, 4.2]], 4, 'blue');
  for (const z of [.75, 2.2, 3.1]) metal(H, R, .14, 6.42, .2, .23, z, .13, 'sun');
  H.tint(H.tile(2, 3.3, 6.7, 1.3, .02), 'sun', .22);
  for (let n = 0; n < 10; n++) H.line(R, [H.p(.6 + n * .95, 10.8), H.p(.9 + n * .95, 10.8)], 'blue', 2);
  metal(H, R, .4, 10.7, 10.8, .16, .02, .04, 'teal');
  floorShadow(H, .3, 1.5, 2.9, 5.3, .22);
  timber(H,R,.22,1.35,2.34,5.74,.05,.25,'teal');
  box(H,R,.3,1.45,2.1,5.5,.3,3.05,'paper',.85);
  for(const j of [1.46,6.62])box(H,R,2.36,j,.2,.32,.3,2.98,'paper',.9);
  for(let z=.55;z<3.3;z+=.38)for(const j of [1.49,6.65])H.line(R,[H.p(2.57,j,z),H.p(2.57,j+.28,z)],'blue',.85);
  const hood=[H.p(.37,1.38,3.32),H.p(2.65,1.38,3.32),H.p(2.65,7.05,3.32),H.p(.37,7.05,3.32)];
  surface(H,R,hood,'teal',.6,1.2);
  surface(H,R,[H.p(2.65,1.38,3.32),H.p(2.65,7.05,3.32),H.p(1.55,6.62,4.0),H.p(1.55,1.8,4.0)],'teal',.5,1);
  surface(H,R,[H.p(.37,7.05,3.32),H.p(2.65,7.05,3.32),H.p(1.55,6.62,4.0),H.p(.37,6.62,4.0)],'teal',.74,1);
  for(const j of [2.1,4.2,6.35])H.line(R,[H.p(2.63,j,3.35),H.p(1.55,j,4.0)],'paper',1);
  for(let j=2.0;j<6.8;j+=.45)H.line(R,[H.p(2.67,j,3.35),H.p(2.67,j+.23,3.35)],'blue',2);
  metal(H,R,2.44,2.7,.05,2.35,.45,.36,'teal');
  for(let j=2.86;j<4.85;j+=.24)H.line(R,[H.p(2.51,j,.52),H.p(2.51,j,.73)],'blue',1.4);
  metal(H,R,2.45,5.25,.06,.75,.45,.36,'blue');
  const ash=H.p(2.53,5.62,.65);H.line(R,[[ash[0]-5,ash[1]],[ash[0]+5,ash[1]-3]],'sun',2);

  const P = (j, z) => H.p(2.42, j, z);
  const arch = [P(2.05, 1.02), P(6.22, 1.02), P(6.22, 2.05)];
  for (let q = 0; q <= 24; q++) { const a = q * Math.PI / 24; arch.push(P(4.135 + Math.cos(a) * 2.085, 2.05 + Math.sin(a) * .93)); }
  surface(H, R, arch, 'blue', .92, 1.8);
  H.line(R, arch.slice(2), 'teal', 7, { tone: .5 });
  for (let q = 0; q <= 10; q++) { const a = q * Math.PI / 10; H.line(R, [P(4.135 + Math.cos(a) * 2.08, 2.05 + Math.sin(a) * .93), P(4.135 + Math.cos(a) * 2.34, 2.06 + Math.sin(a) * 1.19)], 'blue', .8); }
  metal(H, R, 2.4, 1.85, .75, 4.65, 1.02, .13, 'teal');
  for (const j of [3.72, 4.75]) metal(H, R, 2.35, j, 1.15, .08, 1.17, .04, 'sun');
  for (let q = 0; q < 8; q++) H.line(R, [H.p(2.9, 3.73 + q * .14, 1.18), H.p(3.11, 3.73 + q * .14, 1.18)], 'paper', .5);
  for (const j of [2.08, 6.14]) metal(H, R, 2.5, j, .1, .18, 1.4, .6, 'blue');
  timber(H, R, 2.3, 1.28, .27, 5.8, 3.52, .2, 'paper');
  for(const z of [.28,.59,.9,3.16,3.42])H.line(R,[P(1.49,z),P(6.95,z)],'blue',.7,{tone:.4});
  for(const j of [1.65,6.55])for(const z of [1.35,1.75,2.2,2.65]){H.line(R,[P(j-.13,z),P(j+.15,z)],'blue',.65,{tone:.4});H.dot(...P(j,z+.08),1,'sun',.65);}
  metal(H,R,.62,3.25,1.3,1.0,3.56,.16,'teal');
  bentTube(H,R,[[1.25,3.7,3.68],[1.25,3.7,4.3],[.18,3.7,4.57],[.18,3.7,4.95]],15,'teal');
  for(const z of [3.9,4.15]){const q=H.p(1.25,3.7,z);H.line(R,[[q[0]-8,q[1]+2],[q[0]+8,q[1]-2]],'sun',1.5);}
  for(const j of [2.0,5.9]){const q=P(j,3.23);oval(H,R,...q,6,6,'paper',1);H.line(R,[q,[q[0]+2,q[1]-4]],'blue',1.2);}
  const hp=P(6.52,.8);oval(H,R,hp[0],hp[1],5,6,'paper',.75);for(let n=0;n<4;n++)H.line(R,[[hp[0]-4+n*2.5,hp[1]-2],[hp[0]-5+n*3,hp[1]-9]],'paper',1.5);
  box(H,R,2.52,1.48,.36,.45,1.2,1.9,'teal',.4);for(let n=0;n<6;n++)H.line(R,[H.p(2.9,1.56,1.43+n*.25),H.p(2.9,1.85,1.43+n*.25)],'blue',1.2);
  metal(H,R,2.5,6.53,.16,.32,1.19,.6,'blue');
  wallRack(H,R,'nw',7.4,3.9,3.1,.84,1,'teal',(Q,z)=>{
    for(let n=0;n<3;n++){const a=Q(.4+n*.64,z+.17);oval(H,R,...a,9,6,'sun',.65);H.outline(R,ell(...a,6,3),'blue',.7);}
    const sieve=Q(2.95,z+.28);oval(H,R,...sieve,12,8,'paper',1);H.outline(R,ell(...sieve,9,5),'teal',.7);for(let n=-2;n<3;n++)H.line(R,[[sieve[0]-7,sieve[1]+n*2],[sieve[0]+7,sieve[1]+n*2]],'blue',.4);
  });
  for(const [j,h] of [[7.55,2.4],[8.2,2.05],[10.9,2.3]]){
    bentTube(H,R,[[.28,j,.3],[.28,j,h]],3,'sun');
    const a=H.p(.28,j,h);surface(H,R,[[a[0]-8,a[1]],[a[0]+8,a[1]-4],[a[0]+11,a[1]-24],[a[0]-7,a[1]-20]],'sun',.6);H.line(R,[[a[0]-3,a[1]-17],[a[0]+4,a[1]-19]],'paper',1);
    metal(H,R,.15,j-.13,.28,.25,1.8,.09,'teal');
  }
  hangingRail(H, R, 'nw', 7.5, 3.2, 2.65, 3, (P, u, n) => {
    const a = P(u, -.13); shape(H, R, [[a[0] - 4, a[1]], [a[0] + 5, a[1]], [a[0] + 10, a[1] + 15], [a[0] + 4, a[1] + 24], [a[0] - 6, a[1] + 20]], n === 1 ? 'coral' : 'paper', .8);
  });
  cabinetFrame(H, R, 7.1, .3, 4.4, 1.55, .14, 3.8, 2, 'sun', (x, j, w, d, z, h, col) => {
    for (let row = 0; row < 4; row++) { const zz = z + row * .86; timber(H, R, x, j, w, d, zz, .09, 'sun'); if (row < 3) { basket(H, R, x + .12, j + .22, zz + .12, w - .22, .72, row === 1); if (row === 2) loaf(H, R, x + w / 2, j + .55, zz + .53, .6); } else { for (let n = 0; n < 4; n++) loaf(H, R, x + .25 + n * .42, j + .55, zz + .24, .47); } }
    if (col === 0) drape(H, R, x + .1, j + .3, .8, .68, 3.16, .41, 'paper');
  });
  timber(H, R, 7, .2, 4.6, 1.8, 3.98, .14, 'sun'); loaf(H, R, 10.8, 1, 4.17, .32);
  for(const i of [7.15,11.1])bentTube(H,R,[[i,.4,.25],[i,1.5,1.4]],1.5,'teal');
  metal(H,R,7.32,1.7,1.68,.82,.17,.32,'teal');basket(H,R,7.42,1.79,.5,1.43,.65);drape(H,R,7.49,1.82,1.21,.63,.85,.25,'paper');
  const sack=H.p(10.1,.95,4.18);shape(H,R,[[sack[0]-14,sack[1]],[sack[0]+14,sack[1]],[sack[0]+11,sack[1]-26],[sack[0]+4,sack[1]-34],[sack[0]-7,sack[1]-32],[sack[0]-12,sack[1]-24]],'paper',1);stroke(H,R,[[sack[0]-6,sack[1]-32],[sack[0]+5,sack[1]-32],[sack[0]+12,sack[1]-36]],'teal',2);
  benchFrame(H,R,3.35,.42,3.35,1.2,1.55,'teal');basin(H,R,3.5,.49,1.72,1.01,1.58,'paper');
  bentTube(H,R,[[4.36,.93,1.55],[4.36,.93,.5],[4.0,.93,.37],[4,.24,.37]],2.5,'teal');
  timber(H,R,5.45,.58,1.02,.86,1.62,.08,'sun');for(let n=0;n<5;n++)H.line(R,[H.p(5.52+n*.17,.66,1.72),H.p(5.52+n*.17,1.3,1.72)],'blue',.6);
  drape(H,R,5.6,1.23,.73,.22,1.77,.63,'paper');vessel(H,R,6.21,.83,1.73,6,12,'coral',false);
  metal(H,R,6.14,.14,.38,.13,2.0,.44,'paper');H.line(R,[H.p(6.33,.3,2.14),H.p(6.33,.3,2.3)],'teal',2);
  floorShadow(H, 8.65, 2.45, 2.7, 1.9);
  for (const i of [8.8, 11]) for (const j of [2.6, 3.7]) { caster(H, R, i, j); metal(H, R, i, j, .09, .09, .2, 1.3, 'teal'); }
  for (const z of [.38, .76, 1.15]) { metal(H, R, 8.7, 2.5, 2.5, 1.35, z, .06, 'teal'); for (let n = 0; n < 5; n++) H.line(R, [H.p(8.85 + n * .46, 2.57, z + .08), H.p(8.85 + n * .46, 3.7, z + .08)], 'paper', .7); }
  bentTube(H, R, [[11, 3.7, .6], [11.4, 3.7, 1.6], [11.4, 2.55, 1.6]], 2.2, 'teal');
  cabinetFrame(H,R,1.08,8.38,3.94,1.63,.1,.99,3,'sun',(x,j,w,d,z,h,n)=>{
    if(n===0){basket(H,R,x+.02,j+.1,z+.04,w-.06,d-.18);}
    if(n===1){for(let q=0;q<3;q++)drape(H,R,x+.04,j+.04,w-.1,d-.1,z+.13+q*.17,.11,q===1?'coral':'paper');}
    if(n===2){vessel(H,R,x+.35,j+.55,z+.05,8,16,'paper');vessel(H,R,x+.7,j+.5,z+.05,5,11,'teal');}
  });
  timber(H,R,1.0,8.3,4.1,1.8,1.1,.16,'sun');
  timber(H,R,1.0,8.28,4.1,.14,1.22,.29,'teal');
  for(const i of [1.3,4.75])bentTube(H,R,[[i,8.5,.13],[i,9.73,.97]],2,'sun');

  drape(H, R, 1.35, 8.55, 1.3, 1.4, 1.23, .5, 'paper');
  vessel(H, R, 3.65, 9.0, 1.24, 13, 9, 'paper');
  metal(H, R, 4.05, 8.75, .5, .35, 1.21, .06, 'blue'); timber(H, R, 4.13, 8.78, .12, .26, 1.29, .09, 'sun');
  loaf(H, R, 2.15, 9.05, 1.3, .55);
  box(H,R,3.1,8.67,.65,.65,1.21,.19,'teal',.65);oval(H,R,...H.p(3.42,9.34,1.33),5,5,'paper',1);H.line(R,[H.p(3.42,9.35,1.33),H.p(3.45,9.35,1.41)],'blue',1);
  timber(H,R,2.9,9.57,1.4,.2,1.22,.06,'sun');for(const x of [2.85,4.25])bentTube(H,R,[[x,9.66,1.23],[x+.15,9.66,1.27]],2.2,'blue');
  timber(H,R,3.7,8.15,.17,.72,1.22,.08,'sun');H.line(R,[H.p(3.79,8.2,1.32),H.p(3.79,8.75,1.32)],'paper',1);
  box(H,R,2.85,8.65,1.8,1.12,.44,.47,'teal',.38);for(const x of [3.05,3.85]){surface(H,R,H.faceI(x,9.79,.65,.5,.83),'paper',.75,.6);H.line(R,[H.p(x+.2,9.8,.68),H.p(x+.46,9.8,.68)],'sun',2);}
  const tool=H.p(4.55,9.45,1.28);stroke(H,R,[[tool[0],tool[1]],[tool[0]+11,tool[1]-3],[tool[0]+13,tool[1]-7]],'sun',2.5);for(let n=0;n<6;n++)H.line(R,[[tool[0]-4+n*1.3,tool[1]+1],[tool[0]-5+n*1.5,tool[1]+8]],'blue',.7);
   basket(H, R, 1.55, 8.8, .27, 1.5, .9);
  vessel(H, R, 5.3, 9.7, .05, 17, 24, 'paper');
  const b = H.p(5.3, 9.7, .83); oval(H, R, ...b, 13, 4, 'paper', 1); stroke(H, R, [[b[0] + 12, b[1]], [b[0] + 20, b[1] - 10], [b[0] + 17, b[1] - 20]], 'sun', 3);
  timber(H, R, 7.5, 4.16, .2, .55, .05, 1.08, 'teal'); metal(H, R, 7.38, 4.1, .4, .65, 1.12, .07, 'blue');
  benchFrame(H, R, 8.6, 8.9, 2.1, 1.05, .6, 'sun'); basket(H, R, 8.7, 8.95, .62, 1.75, .85, true);
  for (let n = 0; n < 5; n++) surface(H, R, H.faceI(10.7 + n * .03, 9.7 - n * .035, .7, .3 + n * .04, 1.2 + n * .04), 'paper', 1, .5);
  floorShadow(H,6.5,9.0,1.62,2.45,.2);
  for(const i of [6.62,7.85])for(const j of [9.25,10.9])timber(H,R,i,j,.16,.16,.08,.75,'teal');
  surface(H,R,H.tile(6.45,9.0,1.78,2.18,.65),'blue',.68);
  for(const i of [6.4,8.07])timber(H,R,i,8.98,.18,2.23,.64,.64,'sun');
  for(const j of [8.98,11.06])timber(H,R,6.4,j,1.85,.15,.64,.64,'sun');
  drape(H,R,6.6,9.13,1.25,1.28,.72,.11,'paper');
  for(let n=0;n<3;n++)loaf(H,R,7.15,9.4+n*.35,.84,.44);
  timber(H,R,7.2,10.35,1.02,.77,1.31,.11,'sun');H.line(R,[H.p(7.7,10.46,1.43),H.p(7.7,11,1.43)],'blue',1);
  metal(H,R,6.77,11.23,.31,.15,.91,.2,'teal');
  const apron=H.p(.4,11.35,2.6);stroke(H,R,[[apron[0]-8,apron[1]+6],[apron[0]-4,apron[1]-4],[apron[0]+5,apron[1]-4],[apron[0]+10,apron[1]+6]],'coral',1.7);shape(H,R,[[apron[0]-8,apron[1]+6],[apron[0]+9,apron[1]+6],[apron[0]+17,apron[1]+44],[apron[0]-14,apron[1]+44]],'paper',1);H.line(R,[[apron[0]-5,apron[1]+26],[apron[0]+7,apron[1]+26],[apron[0]+7,apron[1]+35],[apron[0]-5,apron[1]+35]],'teal',.8);
  pendant(H, R, 5.3, 1.2, 4.25, 3.1, 'teal', .66);
}, (H, R, t) => {
  const u = ((t % 18) + 18) % 18, slide = ease(3.6, 7.2, u) * (1 - ease(10.8, 16, u)), start = 2.7 - slide * 1.05;
  const z = 1.25, j = 4.28;
  surface(H, R, [H.p(start, j - .48, z), H.p(start + 1.2, j - .53, z), H.p(start + 1.62, j - .25, z), H.p(start + 1.62, j + .25, z), H.p(start + 1.2, j + .53, z), H.p(start, j + .48, z)], 'sun', .65);
  timber(H, R, start + .03, j + .4, 1.16, .08, z, .035, 'teal');
  bentTube(H, R, [[start + 1.1, j, z], [start + 5.0, j, z]], 4.3, 'sun');
  oval(H, R, ...H.p(start + 4.95, j, z), 3.7, 2.2, 'blue', .7);
  const hands = [H.p(5.2 - slide * .6, j, z + .045), H.p(6.12 - slide * .6, j, z + .045)];
  person(H, R, 5.85 - slide * .6, 5.07, hands, 'teal', -slide * 3);
  person(H, R, 8.1, 5.6, [H.p(7.8, 5.6, 1), H.p(8.25, 5.8, .95)], 'coral', Math.sin(u / 18 * Math.PI * 2) * 1.2);
  const a = H.p(2.1, 10.0, 1.1), flutter = Math.sin(u / 18 * Math.PI * 2) * 2;
  stroke(H, R, [a, [a[0] + 10, a[1] + 4 + flutter], [a[0] + 17, a[1] + 3]], 'paper', 2.2);
});
room.loopSeconds = 18;
room.stillTime = 5.4;
export default room;
