import { world, shape, oval, stroke, box, ell, cycle, mix } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, benchFrame, cushion, vessel, drape } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { recessedFrame, floorShadow } from '../joinery.js';

const ease = (a, b, t) => { const p = Math.max(0, Math.min(1, (t - a) / (b - a))); return p * p * (3 - 2 * p); };
function wheel(H, R, x, y, r = 4, ink = 'blue', angle = 0) {
  oval(H, R, x, y, r, r * .86, ink, .8);
  oval(H, R, x, y, r * .56, r * .47, 'paper', 1);
  H.dot(x, y, 1.1, 'blue');
  H.line(R, [[x, y], [x + Math.cos(angle) * r * .45, y + Math.sin(angle) * r * .38]], 'coral', .8);
}
function skate(H, R, x, y, size = 1, turn = 0, bright = false) {
  const p = (a, b) => [x + a * size, y + b * size];
  shape(H, R, [p(-9,-5),p(12,-5),p(14,-1),p(-10,-1)], 'sun', .65, .8);
  for (const dx of [-6, 8]) { H.line(R, [p(dx,-4),p(dx,2)], 'blue', 2); wheel(H, R, ...p(dx,3), 4.2 * size, bright && dx === 8 ? 'coral' : 'teal', turn); }
  shape(H, R, [p(-9,-7),p(-8,-22),p(1,-22),p(3,-12),p(10,-10),p(13,-6),p(8,-4),p(-8,-4)], 'coral', .73);
  H.line(R, [p(-6,-18),p(-5,-7),p(10,-7)], 'sun', 1.1);
  for (let n = 0; n < 4; n++) H.line(R, [p(-4,-17+n*2.3),p(2,-15+n*2.3)], 'paper', 1);
  H.line(R, [p(2,-13),p(5,-16),p(7,-13),p(4,-11)], 'blue', .6);
  shape(H, R, [p(11,-2),p(15,-2),p(17,2),p(13,3)], 'blue', .8, .6);
}
function helmet(H, R, x, y, ink = 'sun', s = 1) {
  shape(H, R, [[x-12*s,y],[x-10*s,y-10*s],[x-3*s,y-15*s],[x+7*s,y-13*s],[x+13*s,y-5*s],[x+12*s,y]], ink, .8);
  for (const dx of [-6,0,6]) H.line(R, [[x+dx*s,y-9*s],[x+(dx+2)*s,y-5*s]], 'blue', 1.1);
  stroke(H, R, [[x-8*s,y],[x-2*s,y+10*s],[x+6*s,y+7*s],[x+10*s,y]], 'blue', 1.2);
}
const room = world('mexico-city-park-skates', 'The wheel returns to the line', { wall: false, floor: 'paper', tone: .95, head: 30 }, (H, R) => {
  for (let i = 0; i < 12; i += 2) for (let j = 0; j < 12; j += 2) H.outline(R, H.tile(i,j,2,2,.012), 'blue', .65, { tone: .25 });
  masonry(H,R,'nw',0,12,0,2.65,'paper',.92);
  masonry(H,R,'ne',0,12,0,3.65,'teal',.22);
  for (const i of [.18,11.45]) metal(H,R,i,.16,.18,.28,0,4.05,'blue');
  timber(H,R,.05,.1,11.7,.36,3.83,.22,'sun');
  for (let i = .5; i < 12; i += 1.45) timber(H,R,i,.04,.14,2.1,3.87,.12,'sun');
  bentTube(H,R,[[.18,1.9,3.9],[11.65,1.9,3.9],[11.65,1.9,.25],[11.65,2.9,.1]],2.4,'teal');
  surface(H,R,H.tile(4.15,3.45,3.7,6.7,.022),'teal',.11,.7);
  for (const i of [4.22,7.72]) H.line(R,[H.p(i,3.55,.03),H.p(i,10,.03)],'paper',2.5);
  surface(H,R,H.tile(4.25,7.9,3.45,.15,.035),'coral',.75,.4);
  for (const j of [3.3,6.25,9.45]) {
    metal(H,R,3.52,j-.25,.8,.54,.025,.075,'blue');
    bentTube(H,R,[[3.91,j,.1],[3.91,j,1.22]],4,'blue');
    for (const [a,b] of [[3.65,j-.12],[4.12,j+.12]]) H.dot(...H.p(a,b,.12),1.2,'sun');
  }
  bentTube(H,R,[[3.91,3.3,1.22],[3.91,9.45,1.22]],5,'blue');
  H.line(R,[H.p(3.91,5.6,1.25),H.p(3.91,7.6,1.25)],'paper',2);
  for (const j of [3.8,8.95]) metal(H,R,3.81,j,.2,.22,1.12,.23,'coral');
  cabinetFrame(H,R,7.8,.28,3.65,1.1,.12,3.4,3,'teal',(x,y,w,d,z,h,col)=>{
    for (const level of [.55,1.25,2.0]) timber(H,R,x,y,w,d,z+level,.08,'sun');
    for (let n = 0; n < 2; n++) skate(H,R,...H.p(x+.25+n*.4,y+.4,z+.56),.55,0,col===0);
    helmet(H,R,...H.p(x+w*.5,y+.4,z+1.35),['sun','coral','paper'][col],.75);
    for (const dx of [.2,.56]) {
      const [a,b]=H.p(x+dx,y+.4,z+2.17); shape(H,R,ell(a,b,8,12),'blue',.55,.7);
      H.line(R,[[a-6,b-5],[a+6,b-5],[a+6,b+5],[a-6,b+5]],'paper',.8);
    }
    for (let n=0;n<3;n++) wheel(H,R,...H.p(x+.16+n*.25,y+.45,z+.12),3,'sun');
    H.line(R,[H.p(x+w*.7,y+.4,z+2.72),H.p(x+w*.65,y+.4,z+2.28)],'paper',1.8);
  });
  recessedFrame(H,R,'nw',2.25,3.2,1.28,1.16,'coral',P=>{
    surface(H,R,[P(.18,.16),P(3,.16),P(3,1),P(.18,1)],'paper',1,.5);
    const a=P(1.35,.5); skate(H,R,...a,.6,0,true);
    H.line(R,[P(.25,.28),P(.65,.38),P(1.2,.24)],'teal',1);
  });
  recessedFrame(H,R,'nw',6.1,4.25,1.82,.68,'teal',P=>{
    const q=[P(.12,.1),P(4.13,.1),P(4.13,.58),P(.12,.58)];
    H.hatch(R,q,'blue',5,.5,.55,{tone:.5});H.hatch(R,q,'blue',5,-.5,.55,{tone:.4});
    for(let n=0;n<3;n++){const p=P(.7+n*1.25,.34);shape(H,R,ell(p[0],p[1]+5,10,12),n===1?'coral':'sun',.57,.7);H.line(R,[[p[0]-7,p[1]],[p[0]+7,p[1]],[p[0]+7,p[1]+9],[p[0]-7,p[1]+9]],'blue',1.1);}
  });
  timber(H,R,.2,6.3,.75,3.8,1.68,.12,'sun');
  const ramp=[H.p(.27,7,1.8),H.p(.9,7,1.8),H.p(.9,8.15,1.8),H.p(.27,8.15,2.35)];
  surface(H,R,ramp,'coral',.63,.8);
  H.line(R,[H.p(.3,7.8,2.19),H.p(.8,7.8,1.87)],'paper',2.3);
  bentTube(H,R,[[.3,9,1.84],[.7,9,2.13],[.7,9.65,2.13]],2,'blue');
  benchFrame(H,R,1.05,7.8,2.35,1.35,.66,'sun');
  skate(H,R,...H.p(1.68,8.37,.67),.95,.3,true);
  const q=H.p(2.9,8.4,.7); oval(H,R,...q,11,7,'teal',.5); wheel(H,R,q[0],q[1]-1,4,'blue');
  H.line(R,[H.p(2.3,8.78,.7),H.p(2.85,8.78,.7)],'blue',2.1);
  H.line(R,[H.p(2.78,8.66,.7),H.p(2.78,8.9,.7)],'sun',2);
  surface(H,R,H.tile(1.4,7.98,.6,.2,.7),'coral',.35,.6);
  helmet(H,R,...H.p(2.3,9.2,0),'sun',.8);
  benchFrame(H,R,9.12,5.35,1.7,3.65,.6,'teal');
  cushion(H,R,9.15,5.4,1.6,1.25,.61,.13,'coral');
  drape(H,R,9.5,7,1,1,.65,.35,'paper');
  vessel(H,R,10.3,8.35,.66,7,20,'teal',false);
  box(H,R,9.38,8.5,.54,.35,.66,.2,'sun',.65);
  for(const x of [5.3,6.35]){
    metal(H,R,x,.28,.07,.55,.25,2.76,'teal');
    for(const z of [.56,1.1,1.64,2.18,2.72])metal(H,R,5.24,.27,1.25,.55,z,.055,'teal');
  }
  for(const [j,z]of [[.43,.7],[.43,1.25],[.43,1.82]]){
    const p=H.p(5.89,j,z);shape(H,R,[[p[0]-14,p[1]],[p[0]-12,p[1]-12],[p[0]+12,p[1]-10],[p[0]+14,p[1]]],'paper',1,.6);
    for(let n=0;n<4;n++)H.line(R,[[p[0]-10+n*6,p[1]-8],[p[0]-9+n*6,p[1]-1]],'teal',.6);
  }
  const locker=H.faceI(11.45,1.43,.39,.33,3.25);surface(H,R,locker,'teal',.43,.8);
  for(let n=0;n<5;n++)H.line(R,[H.p(11.5,1.44,2.8-n*.12),H.p(11.78,1.44,2.8-n*.12)],'blue',1);
  H.line(R,[H.p(11.72,1.46,1.35),H.p(11.72,1.46,1.67)],'sun',2.2);
  floorShadow(H,9.7,2.65,1.3,1.4,.2);
  const bag=H.p(10.2,3.3,.5); shape(H,R,[[bag[0]-17,bag[1]],[bag[0]-15,bag[1]-27],[bag[0]+12,bag[1]-28],[bag[0]+17,bag[1]]],'coral',.64);
  stroke(H,R,[[bag[0]-10,bag[1]-25],[bag[0]-8,bag[1]-36],[bag[0]+8,bag[1]-37],[bag[0]+12,bag[1]-25]],'blue',2);
  H.line(R,[[bag[0]-10,bag[1]-12],[bag[0]+10,bag[1]-12]],'paper',1.2);
  surface(H,R,H.tile(10.65,10.55,.95,.52,.02),'blue',.45,.6);
  for(let n=0;n<7;n++)H.line(R,[H.p(10.71+n*.12,10.58,.03),H.p(10.71+n*.12,11.02,.03)],'paper',.8);
  metal(H,R,.12,11.5,.35,.35,0,1.7,'teal');
  H.line(R,[H.p(.47,11.62,1.23),H.p(.8,11.62,1.23)],'blue',3);
}, (H,R,t)=>{
  const u=cycle(t,16)*16, f=ease(3.2,6.4,u)*(1-ease(9.6,14,u));
  const a=H.p(4.95,6.43,.02), b=H.p(5.52,6.63+f*1.12,.02), hip=H.p(5.2,6.55+f*.23,.92), neck=[hip[0]-3,hip[1]-34], hand=H.p(3.91,6.6,1.23);
  H.tint(ell((a[0]+b[0])/2+5,(a[1]+b[1])/2+5,25,7),'blue',.17);
  for(const [foot,s] of [[a,-1],[b,1]]){
    const knee=[mix(hip[0],foot[0],.5)+s*5,mix(hip[1],foot[1]-15,.5)];
    H.line(R,[hip,knee,[foot[0]-1,foot[1]-14]],'blue',9,{amp:.1});
    H.line(R,[hip,knee,[foot[0]-1,foot[1]-14]],'teal',6,{amp:.1});
    skate(H,R,...foot,.82,f*5,s===1);
  }
  shape(H,R,[[neck[0]-8,neck[1]],[neck[0]+9,neck[1]],[hip[0]+8,hip[1]+2],[hip[0]-9,hip[1]+2]],'sun',.83);
  const elbow=[neck[0]-17,neck[1]+15];
  H.line(R,[[neck[0]-7,neck[1]+4],elbow,hand],'blue',6,{amp:.1});
  H.line(R,[[neck[0]-7,neck[1]+4],elbow,hand],'sun',4.3,{amp:.1});
  oval(H,R,...hand,3,2.4,'coral',.45);
  const free=[[neck[0]+9,neck[1]+5],[neck[0]+19,neck[1]+20],[hip[0]+11,hip[1]-5]];
  H.line(R,free,'blue',6,{amp:.1});H.line(R,free,'sun',4.3,{amp:.1});oval(H,R,...free[2],2.7,3,'coral',.4);
  oval(H,R,neck[0],neck[1]-9,8,9,'coral',.44);
  helmet(H,R,neck[0]-1,neck[1]-13,'teal',.83);
  H.dot(neck[0]+4,neck[1]-7+f*2,1,'blue');
  H.line(R,[[b[0]+1,b[1]-14],[b[0]+8,b[1]-10],[b[0]+12,b[1]-12+Math.sin(u*Math.PI/8)*1.3]],'paper',.8);
  const [x,y]=H.p(10.2,3.3,.5);stroke(H,R,[[x+12,y-24],[x+22+Math.sin(u*Math.PI/8)*1.5,y-8],[x+17,y+4]],'blue',1.3);
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
