import { world, shape, oval, stroke, ell } from '../../worlds/common.js';
import { surface, timber, metal, benchFrame, cushion, bentTube, drape } from '../materials.js';
import { windowBay, floorShadow, caster, hangingRail } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q)};
function person(H, R, i, j, hands, ink = 'teal', lean = 0) {
  const [x, y] = H.p(i, j), s = 1.25, Q = (a, b) => [x + a * s, y + b * s], cx = lean;
  H.tint(H.tile(i - .22, j - .12, .7, .52, .015), 'blue', .16);
  for (const side of [-1, 1]) { stroke(H, R, [Q(side * 5, -25), Q(side * 6, -11), Q(side * 7, -1)], 'blue', 8.5); oval(H, R, ...Q(side * 7 + 2, 0), 7, 3, 'blue', .85); }
  shape(H, R, [Q(cx - 10, -52), Q(cx + 10, -51), Q(9, -24), Q(-9, -24)], ink, .7);
  shape(H, R, [Q(cx - 5, -47), Q(cx + 6, -47), Q(7, -24), Q(-6, -24)], 'paper', .9);
  H.line(R, [Q(-4, -31), Q(5, -31)], 'blue', .8);
  H.line(R, [Q(-5, -27), Q(6, -27)], ink, 1.1);
  oval(H, R, ...Q(cx + 1, -61), 9, 10, 'coral', .3);
  shape(H, R, [Q(cx - 7, -62), Q(cx - 6, -69), Q(cx + 3, -71), Q(cx + 9, -65), Q(cx + 3, -66)], 'blue', .85);
  H.dot(...Q(cx + 5, -60), 1, 'blue');
  for (const [n, target] of hands.entries()) { const side = n ? 1 : -1, sh = Q(cx + side * 9, -49), elbow = [sh[0] + (target[0] - sh[0]) * .5 + side * 4, Math.max(sh[1], target[1]) + 7]; stroke(H, R, [sh, elbow, target], 'blue', 7.2); stroke(H, R, [sh, elbow, target], ink, 5.5); oval(H, R, ...target, 3, 2.8, 'coral', .3); }
}
function art(H,R,P,w,h,small=false) {
  surface(H,R,[P(0,0),P(w,0),P(w,h),P(0,h)],'paper',1,1.1);
  const inset=[P(.08,.08),P(w-.08,.08),P(w-.08,h-.08),P(.08,h-.08)];
  H.clip(inset,()=>{
    shape(H,R,[P(-.1,.2),P(w*.65,.2),P(w*.46,h*.8),P(.17,h*.9)],'coral',.74,.5);
    shape(H,R,[P(w*.41,-.1),P(w+.1,-.1),P(w+.1,h*.66),P(w*.62,h*.49)],'teal',.68,.6);
    const halo=[];for(let n=0;n<32;n++){const a=n*Math.PI/16;halo.push(P(w*.68+Math.cos(a)*w*.2,h*.72+Math.sin(a)*h*.2))}surface(H,R,halo,'sun',.86,.6);
    stroke(H,R,[P(w*.1,h*.35),P(w*.3,h*.42),P(w*.49,h*.33),P(w*.68,h*.41),P(w*.88,h*.32)],'blue',small?1:3.5);
    for(let n=0;n<(small?3:9);n++)H.line(R,[P(w*.14+n*w*.038,h*.56),P(w*.2+n*w*.038,h*.78)],'paper',small?.5:1.2,{tone:.6});
  });
  H.line(R,[P(.035,.04),P(w-.035,.04),P(w-.035,h-.04)],'sun',2.2);
}
function guard(H,R,i,j,z) {
  surface(H,R,[[i,j],[i+.73,j],[i+.73,j+.2],[i+.22,j+.2],[i+.22,j+.72],[i,j+.72]].map(([x,y])=>H.p(x,y,z)),'paper',1,1);
  surface(H,R,[H.p(i,j+.72,z-.16),H.p(i+.22,j+.72,z-.16),H.p(i+.22,j+.72,z),H.p(i,j+.72,z)],'paper',.8,.5);
  H.line(R,[H.p(i+.13,j+.03,z+.01),H.p(i+.13,j+.54,z+.01)],'sun',2.3);
}
const room=world('hanoi-gallery-wrap','A corner protected',{floor:'paper',pattern:'tiles',accent:'teal',wall:'paper',wallTone:.86,height:4.35,head:32,tone:.64},(H,R)=>{
  windowBay(H,R,'nw',1.2,5.45,1.32,2.6,{ink:'teal',divisions:3});
  timber(H,R,.2,.3,.22,11.35,.03,.17,'teal');timber(H,R,.3,.15,11.4,.22,.03,.17,'teal');
  H.tint([H.p(.5,1.8,.02),H.p(.5,5.5,.02),H.p(6.8,9.4,.02),H.p(8.6,6.6,.02)],'sun',.21);
  const P=(x,z)=>H.p(2.8+x,.7+z*.035,.6+z);
  timber(H,R,2.7,.7,4.58,.9,.2,.18,'blue');
  for(const i of [2.8,6.95])timber(H,R,i,.64,.17,.24,.32,3.48,'sun');
  art(H,R,P,4.25,3.47);
  for(const i of [2.95,6.55]) { metal(H,R,i,.81,.45,.42,.38,.19,'blue'); cushion(H,R,i,.79,.4,.44,.59,.08,'paper'); }
  for(const i of [8.08,8.88,9.72,10.7,11.38])timber(H,R,i,.53,.16,2.1,.23,3.53,'teal');
  for(const z of [.22,1.15,3.76])timber(H,R,8.02,.55,3.63,2.1,z,.14,'teal');
  for(const [i,h,ink] of [[8.3,2.32,'paper'],[9.04,2.56,'coral'],[9.94,2.1,'paper'],[10.9,2.38,'sun']]) {
    const panel=[H.p(i,.9,1.38),H.p(i,2.45,1.38),H.p(i+.08,2.34,1.38+h),H.p(i+.08,.8,1.38+h)];surface(H,R,panel,ink,ink==='paper'?1:.36,.8);
    H.line(R,[H.p(i,2.45,1.38),H.p(i+.08,2.34,1.38+h)],'blue',3);H.line(R,[H.p(i+.02,2.45,1.4),H.p(i+.1,2.34,1.35+h)],'paper',1.1);
  }
  metal(H,R,8.25,1.54,2.68,1.05,.44,.5,'teal');
  for(let n=0;n<3;n++){drape(H,R,8.44,1.75,2.12,.72,.98+n*.08,.16,['paper','coral','paper'][n]);}
  hangingRail(H,R,'ne',8.1,2.4,4.03,3,(P,u,n)=>{stroke(H,R,[P(u,-.1),P(u-.1,-.65),P(u+.08,-1.06),P(u+.18,-.68)],n===1?'coral':'blue',2.2);});
  benchFrame(H,R,3.22,4.25,5.35,3.07,1.08,'sun');
  cushion(H,R,3.22,4.25,5.35,3.07,1.09,.12,'teal');
  for(const i of [4.08,7.66])for(const j of [4.82,6.46])cushion(H,R,i,j,.47,.4,1.23,.2,'paper');
  const z=1.56;
  timber(H,R,4.06,4.77,4.06,.22,z,.15,'sun');timber(H,R,4.06,6.54,4.06,.22,z,.15,'sun');
  timber(H,R,4.06,4.77,.22,1.98,z,.15,'sun');timber(H,R,7.9,4.77,.22,1.98,z,.15,'sun');
  surface(H,R,H.tile(4.29,5.0,3.6,1.53,z-.035),'coral',.3,.5);
  timber(H,R,5.92,4.89,.13,1.73,z,.15,'sun');
  for(const [i,j]of[[4.3,5.03],[7.57,5.03],[4.3,6.35],[7.57,6.35]])surface(H,R,[H.p(i,j,z+.03),H.p(i+.28,j,z+.03),H.p(i,j+.21,z+.03)],'sun',.85,.7);
  for(let i=4.5;i<7.9;i+=.28)H.line(R,[H.p(i,6.75,z+.1),H.p(i,6.8,z+.03)],'paper',1.3);
  oval(H,R,...H.p(4.74,6.65,z+.16),3,1.5,'coral',.75);
  H.outline(R,[[3.34,6.28],[4.02,6.28],[4.02,6.48],[3.55,6.48],[3.55,6.95],[3.34,6.95]].map(([i,j])=>H.p(i,j,1.225)),'blue',.9,{tone:.4});
  guard(H,R,7.36,4.46,1.25);
  const [rx,ry]=H.p(3.65,4.69,1.25);oval(H,R,rx,ry,8,5,'paper',1);oval(H,R,rx,ry,3,2,'blue',.58);stroke(H,R,[[rx+6,ry],[rx+19,ry+8],[rx+27,ry+3]],'paper',3);
  drape(H,R,6.86,6.96,1.1,.29,1.23,.52,'paper');
  metal(H,R,1.05,7.4,1.15,2.8,.07,.14,'teal');
  for(const j of [7.52,9.93])timber(H,R,1.16,j,.94,.12,.2,.64,'sun');
  timber(H,R,1.06,7.41,1.16,2.75,.86,.13,'sun');
  art(H,R,(x,z)=>H.p(1.19+x,7.55+z,.998),.83,.88,true);
  const [mx,my]=H.p(1.62,9.33,1.02);oval(H,R,mx,my,8,5,'paper',1);H.line(R,[[mx+6,my+3],[mx+16,my+10]],'blue',3);H.line(R,[H.p(1.15,9.69,1.02),H.p(1.8,9.89,1.02)],'sun',2);
  cushion(H,R,1.22,9.9,.67,.34,1,.08,'paper');
  for(const [i,j]of[[9.1,7.8],[10.6,7.8],[9.1,9.5],[10.6,9.5]])caster(H,R,i,j);
  metal(H,R,8.91,7.67,1.97,2,.22,.15,'teal');
  for(const i of [9.02,10.69])bentTube(H,R,[[i,7.82,.35],[i,7.82,2.16],[i,8.5,2.37]],3,'teal');
  for(const i of [9.05,10.59])timber(H,R,i,7.82,.16,.17,.56,1.94,'sun');
  for(const z0 of [.56,2.37])timber(H,R,9.05,7.82,1.71,.17,z0,.16,'sun');
  surface(H,R,H.faceI(9.3,7.94,1.1,.74,1.42),'paper',1,.5);
  H.line(R,[H.p(9.35,8.0,1),H.p(9.8,8.0,1.2),H.p(10.3,8.0,1.05)],'coral',1.3);
  cushion(H,R,9.24,8.36,1.31,.81,.39,.12,'paper');
  metal(H,R,10.42,8.57,.24,.33,.52,.09,'blue');
  oval(H,R,...H.p(10.6,9.52,.1),4.3,5,'coral',.58);
},(H,R,t)=>{
  const u=((t%16)+16)%16,travel=ease(3.2,6.4,u)*(1-ease(9.6,14,u)),lift=.33*ease(.2,2.5,u)*(1-ease(12.6,14,u));
  const i=3.35+.72*travel,j=6.28+.27*travel,z=1.23+.48*travel+lift*(1-travel);
  person(H,R,3.85,7.46,[H.p(i+.17,j+.31,z+.035),H.p(4.28,6.85,1.68)],'teal',3);
  guard(H,R,i,j,z);
  person(H,R,8.88,4.65,[H.p(8.56,4.33,1.15),H.p(8.14,4.08,1.65)],'coral',-2);
  const flap=Math.sin(u*Math.PI/8)*.04;
  surface(H,R,[H.p(6.93,7.11,1.26),H.p(7.85,7.11,1.26),H.p(7.89,7.3,.83+flap),H.p(7.02,7.31,.78)],'paper',1,.55);
  stroke(H,R,[H.p(9.82,7.95,2.21),H.p(9.84,8.2,1.17),H.p(10.1+.04*Math.sin(u*Math.PI/8),8.3,.62)],'coral',2);
});
room.loopSeconds=16;
room.stillTime=7.6;
export default room;
