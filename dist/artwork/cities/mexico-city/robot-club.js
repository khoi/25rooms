import { world, box, shape, stroke, oval, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, cushion, floorLight, spokedWheel } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, recessedFrame, taskLight } from '../joinery.js';

const smooth=v=>{const q=Math.max(0,Math.min(1,v));return q*q*(3-2*q);};
const rest={...FIGURES.clips.idle.keys[0][1]};
const child={...rest,al:40,el:20,ar:-55,er:-20,head:12};
FIGURES.clips.mexicoRobotLearner={dur:18,keys:[[0,child],[1,child]]};
FIGURES.clips.mexicoRobotMentor={dur:18,keys:[[0,{...rest,head:9,al:40,el:80}],[.42,{...rest,head:19,lean:-4,al:40,el:80}],[.6,{...rest,head:17,lean:-3,al:40,el:80}],[1,{...rest,head:9,al:40,el:80}]]};
function pin(H,R,p,r=5){oval(H,R,...p,r,r*.77,'blue',.84);oval(H,R,...p,r*.58,r*.42,'paper',1);H.dot(...p,1.2,'coral');}
function link(H,R,a,b,w=8,ink='sun'){
  const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy),nx=-dy/l*w*.5,ny=dx/l*w*.5;
  surface(H,R,[[a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],[b[0]-nx,b[1]-ny],[a[0]-nx,a[1]-ny]],ink,.62,.85);
  H.line(R,[[a[0]+nx*.55,a[1]+ny*.55],[b[0]+nx*.55,b[1]+ny*.55]],'paper',1);
  H.line(R,[[a[0]-nx*.5,a[1]-ny*.5],[b[0]-nx*.5,b[1]-ny*.5]],'coral',.55,{tone:.5});
}
function diagram(H,R,P,x,y,w,h){
  surface(H,R,[P(x,y),P(x+w,y),P(x+w,y+h),P(x,y+h)],'paper',1);
  const pts=[P(x+.2,y+.25),P(x+w*.45,y+h*.78),P(x+w*.8,y+h*.46)];
  stroke(H,R,pts,'teal',3.6); for(const p of pts) pin(H,R,p,2.5);
  H.line(R,[P(x+.18,y+.14),P(x+w-.17,y+.14)],'coral',.8);
}
const room=world('mexico-city-robot-club','The arm reaches the block',{wall:'paper',wallTone:.8,height:3.9,head:28,floor:'paper',tone:.25,pattern:'tiles',accent:'coral'},(H,R)=>{
  for(const side of ['nw','ne']) {
    H.line(R,[wallPt(H,side,.2,3.65,-.16),wallPt(H,side,11.7,3.65,-.16)],'teal',2.3);
    for(const pos of [1,4.7,8.4,11.4]) H.line(R,[wallPt(H,side,pos,3.57,-.13),wallPt(H,side,pos,3.72,-.13)],'blue',1.4);
  }
  masonry(H,R,'nw',.1,11.8,0,.61,'teal',.22);
  windowBay(H,R,'nw',1.1,5.1,1.84,1.68,{divisions:3,ink:'teal',view:P=>{
    for(let k=0;k<4;k++) surface(H,R,[P(.3+k*1.14,.2),P(1.08+k*1.14,.2),P(1.08+k*1.14,.66),P(.3+k*1.14,.9)],'sun',.25,.5);
  }});
  recessedFrame(H,R,'ne',1.0,5.2,1.75,1.72,'sun',P=>{diagram(H,R,P,.16,.15,2.26,1.4);diagram(H,R,P,2.68,.15,2.26,1.4);});
  metal(H,R,1.05,.15,5.25,.3,3.59,.13,'paper');
  benchFrame(H,R,.24,1.21,1.55,5.32,1.06,'teal');
  for(const y of [1.42,3.11,4.8]) {
    timber(H,R,.4,y,1.16,1.39,.31,.1,'sun');
    surface(H,R,H.faceJ(1.77,y,1.4,.37,.83),'blue',.64);
    for(let k=0;k<2;k++) {
      box(H,R,.5,y+.1+k*.59,1.21,.48,.43,.25,'paper',1);
      H.line(R,[H.p(1.73,y+.25+k*.59,.58),H.p(1.73,y+.45+k*.59,.58)],'coral',1.4);
    }
  }
  surface(H,R,H.tile(.4,1.41,1.2,4.88,1.085),'sun',.24,.6);
  for(let n=0;n<3;n++) {
    const y=1.66+n*1.14;
    metal(H,R,.48,y,1.02,.86,1.1,.08,'blue');
    const a=H.p(.7,y+.13,1.24),b=H.p(1.29,y+.64,1.72),c=H.p(.81,y+.62,1.9);
    link(H,R,a,b,5,n===1?'coral':'paper');link(H,R,b,c,4,'sun');
    pin(H,R,a,2.8);pin(H,R,b,2.8);pin(H,R,c,2.1);
    if(n===1) surface(H,R,[[b[0]-4,b[1]-3],[b[0]+4,b[1]-3],[b[0]+3,b[1]+5],[b[0]-3,b[1]+5]],'teal',.5,.5);
  }
  surface(H,R,H.tile(.5,5.38,1.0,.69,1.1),'paper',1,.5);
  for(let n=0;n<4;n++) H.line(R,[H.p(.61,5.49+n*.13,1.12),H.p(1.33,5.49+n*.13,1.12)],n===2?'coral':'teal',.7);
  taskLight(H,R,.66,5.0,1.1,'coral',.3);
  bentTube(H,R,[[.2,5.88,1.13],[.2,5.88,1.61],[.2,6.41,1.61]],1.5,'teal');
  metal(H,R,.15,6.37,.24,.44,1.35,.38,'paper');
  for(const y of [6.49,6.64]) H.dot(...H.p(.405,y,1.54),1.3,'blue');

  for(const i of [1.45,5.6]) metal(H,R,i,.12,.12,.33,3.36,.22,'teal');
  cabinetFrame(H,R,7.24,.44,4.09,1.44,.14,3.35,3,'teal',(i,j,w,d,z,h,n)=>{
    for(let row=0;row<3;row++) {
      const level=z+row*.97;
      timber(H,R,i,j,w,d,level,.1,'sun');
      if(row===0) {
        for(let q=0;q<3;q++) { box(H,R,i+.06,j+.09,w-.12,d-.12,level+.13+q*.24,.19,q===1?'sun':'paper',.7); H.line(R,[H.p(i+w*.34,j+d+.01,level+.22+q*.24),H.p(i+w*.66,j+d+.01,level+.22+q*.24)],'blue',1.5); }
      } else if(row===1&&n===0) {
        for(let q=0;q<3;q++) spokedWheel(H,R,...H.p(i+.22+q*.34,j+d-.05,level+.42),8,q===1?'coral':'sun',0,.72);
      } else if(row===1&&n===1) {
        box(H,R,i+.06,j+.17,w-.12,.8,level+.12,.42,'blue',.55);
        for(let q=0;q<3;q++) H.dot(...H.p(i+.3+q*.23,j+1,level+.34),1.5,colors(q),.85,{knock:true});
        stroke(H,R,[H.p(i+.2,j+.85,level+.58),H.p(i+.43,j+.9,level+.79),H.p(i+.75,j+.79,level+.72)],'blue',1.4);
      } else if(row===1) {
        box(H,R,i+.13,j+.17,w-.26,.85,level+.13,.42,'paper',1);
        bentTube(H,R,[[i+.32,j+.61,level+.57],[i+.32,j+.61,level+.68],[i+.68,j+.61,level+.68],[i+.68,j+.61,level+.57]],1.4,'blue');
      } else {
        box(H,R,i+.03,j+.11,w-.06,.98,level+.11,.16,'sun',.35);
        for(let q=0;q<4;q++) box(H,R,i+.11+(q%2)*.49,j+.23+Math.floor(q/2)*.44,.31,.26,level+.28,.23,colors(q),.68);
      }
    }
  });
  benchFrame(H,R,2.38,.48,4.53,1.28,1.03,'paper');
  for(const x of [2.57,4.02,5.47]) {
    box(H,R,x,.64,1.11,.95,.39,.31,'teal',.4);
    H.line(R,[H.p(x+.32,1.6,.55),H.p(x+.77,1.6,.55)],'paper',1.6);
  }
  surface(H,R,H.tile(2.6,.69,1.59,.82,1.05),'blue',.54,.6);
  for(let n=0;n<3;n++) spokedWheel(H,R,...H.p(2.92+n*.46,1.16,1.08),6+n*2,n===1?'sun':'paper',.2,.52);
  metal(H,R,4.39,.77,.97,.68,1.05,.22,'blue');
  for(let n=0;n<3;n++) oval(H,R,...H.p(4.57+n*.25,1.23,1.31),2.7,1.8,n===1?'sun':'coral',.68);
  stroke(H,R,[H.p(5.2,1.11,1.31),H.p(5.7,1.47,1.09),H.p(6.16,1.34,1.08),H.p(6.38,.9,1.09)],'blue',1.5);
  box(H,R,6.32,.8,.22,.19,1.09,.09,'paper',1);
  for(const x of [6.38,6.47]) H.line(R,[H.p(x,.8,1.19),H.p(x,.66,1.19)],'blue',1.2);
  benchFrame(H,R,3.0,4.38,5.5,3.07,.88,'sun');
  for(const y of [4.63,7.15]) metal(H,R,3.2,y,5.04,.12,.29,.12,'teal');
  surface(H,R,H.tile(3.19,4.57,5.12,2.68,.9),'teal',.2);
  for(const y of [4.5,7.3]) timber(H,R,3.08,y,5.32,.13,.9,.11,'sun');
  for(const x of [3.08,8.27]) timber(H,R,x,4.5,.12,2.9,.9,.11,'sun');
  metal(H,R,3.75,5.0,1.05,1.03,.91,.13,'teal');
  for(const x of [3.88,4.61]) for(const y of [5.14,5.84]) pin(H,R,H.p(x,y,1.05),2.2);
  oval(H,R,...H.p(4.31,5.47,1.1),17,8,'blue',.82);
  oval(H,R,...H.p(4.31,5.47,1.14),13,6,'paper',1);
  for(let n=0;n<8;n++) {
    const a=n*Math.PI/4;
    pin(H,R,H.p(4.31+Math.cos(a)*.4,5.47+Math.sin(a)*.4,1.15),1.45);
  }
  box(H,R,4.11,5.2,.44,.5,1.16,.21,'blue',.66);
  for(const x of [4.05,4.53]) metal(H,R,x,5.22,.09,.4,1.29,.31,'teal');
  surface(H,R,H.tile(6.35,5.18,.74,.83,.925),'blue',.73);
  surface(H,R,H.tile(6.43,5.27,.58,.64,.93),'sun',.3,.6);
  for(const [x,y] of [[6.35,5.18],[7.04,5.18],[6.35,5.93],[7.04,5.93]]) box(H,R,x,y,.1,.11,.94,.12,'coral',.55);
  surface(H,R,H.tile(7.16,4.72,.85,.85,.94),'paper',1,.55);
  const wheel=H.p(7.59,5.09,.965);
  spokedWheel(H,R,...wheel,11,'coral',.3,.5);
  for(let k=0;k<5;k++) H.line(R,[[wheel[0]+Math.cos(k*.4)*15,wheel[1]+Math.sin(k*.4)*8],[wheel[0]+Math.cos(k*.4)*19,wheel[1]+Math.sin(k*.4)*10]],'blue',.65);
  metal(H,R,5.15,6.44,1.74,.49,.94,.09,'teal');
  for(let n=0;n<4;n++) {
    const x=5.28+n*.4;
    surface(H,R,H.tile(x,6.51,.26,.3,1.04),'paper',1,.45);
    pin(H,R,H.p(x+.13,6.66,1.06),n===1?3:2);
  }
  surface(H,R,[H.p(3.34,6.37,.93),H.p(3.8,6.37,.93),H.p(3.8,6.96,.93),H.p(3.34,6.96,.93)],'paper',1,.55);
  link(H,R,H.p(3.48,6.5,.96),H.p(3.62,6.81,.96),3,'coral');
  for(let k=0;k<4;k++) H.line(R,[H.p(5.01+k*.5,7.26,.99),H.p(5.01+k*.5,7.26,1.065)],'blue',.75);
  metal(H,R,7.55,6.3,.38,.59,.94,.14,'blue');
  H.line(R,[H.p(7.61,6.9,.94),H.p(7.73,6.9,1.16)],'paper',1);
  benchFrame(H,R,.66,8.1,2.69,1.67,.67,'teal');
  const pts=[[1.0,8.5],[1.8,8.33],[2.32,8.92],[1.52,9.1]].map(p=>H.p(...p,.7));
  for(let k=0;k<4;k++) link(H,R,pts[k],pts[(k+1)%4],4,k===2?'coral':'sun');
  for(const p of pts) pin(H,R,p,3);
  const gear=H.p(2.64,8.47,.71);spokedWheel(H,R,...gear,9,'sun',0,.52);spokedWheel(H,R,gear[0]+13,gear[1]+5,6,'teal',0,.52);
  box(H,R,1.15,9.34,.56,.31,.7,.12,'paper',1);
  benchFrame(H,R,9.2,8.35,1.95,1.55,.56,'teal');
  cushion(H,R,9.44,8.5,1.42,1.27,.57,.13,'coral');
  box(H,R,9.68,8.74,.87,.68,.71,.055,'paper',1);
  for(const x of [9.35,10.82]) bentTube(H,R,[[x,8.38,.55],[x,8.38,1.26],[x,8.64,1.42]],2.2,'teal');
  surface(H,R,H.faceI(9.35,8.62,1.47,1.0,1.41),'sun',.4);
  surface(H,R,[H.p(10.71,8.73,1.42),H.p(11.13,8.73,1.42),H.p(11.26,8.95,.52),H.p(10.7,8.95,.58)],'paper',1,.7);
  for(let n=0;n<3;n++) H.line(R,[H.p(10.78+n*.12,8.76,1.37),H.p(10.78+n*.15,8.97,.62)],'coral',.7);
  surface(H,R,[H.p(9.5,9.6,.12),H.p(10.37,9.6,.12),H.p(10.28,9.6,.67),H.p(9.58,9.6,.67)],'sun',.4,.6);
  bentTube(H,R,[[9.65,9.61,.64],[9.68,9.61,.86],[10.12,9.61,.86],[10.15,9.61,.64]],1.5,'blue');

  H.line(R,[H.p(9.83,9.37,.78),H.p(10.42,8.94,.78)],'sun',2.2);
  box(H,R,10.76,8.85,.28,.35,.03,.54,'teal',.58);
  oval(H,R,...H.p(10.9,9.02,.61),4,1.7,'blue',.8);
  recessedFrame(H,R,'nw',7.35,3.36,1.81,1.38,'coral',P=>{
    surface(H,R,[P(.13,.13),P(3.2,.13),P(3.2,1.24),P(.13,1.24)],'paper',1);
    for(let n=0;n<4;n++) H.line(R,[P(.4+n*.57,.34),P(.53+n*.57,1.05)],colors(n),3);
    for(let n=0;n<3;n++) { const p=P(2.45+n*.2,.56); oval(H,R,...p,2,4,'sun',.55); }
  });
  timber(H,R,.24,10.25,1.1,1.18,.09,.15,'sun');
  const b=H.p(.78,10.77,.25),a=H.p(.78,10.77,.91),c=H.p(1.35,10.77,1.2);
  link(H,R,b,a,6,'paper');link(H,R,a,c,5,'paper');surface(H,R,[[a[0]-4,a[1]-4],[a[0]+4,a[1]-4],[a[0]+4,a[1]+4],[a[0]-4,a[1]+4]],'coral',.5);
  for(let n=0;n<3;n++) {
    const x=1.01+n*.66;
    box(H,R,x,8.13,.53,.23,.71,.11,'paper',1);
    pin(H,R,H.p(x+.25,8.25,.83),2.1);
  }
  timber(H,R,.89,8.3,2.16,1.16,.23,.1,'sun');
  for(let n=0;n<2;n++) box(H,R,1.0+n*1.04,8.4,.91,.91,.34,.2,n?'coral':'paper',.5);
  const gauge=H.p(2.7,9.36,.73);oval(H,R,...gauge,7,4,'paper',1);H.line(R,[[gauge[0]-5,gauge[1]+1],[gauge[0]+4,gauge[1]-2]],'teal',1);
  floorLight(H,5.7,5.4,120,.4);
},(H,R,t)=>{
  const u=((t%18)+18)%18;
  const close=smooth(u/3.6)*(1-smooth((u-14.4)/1.6));
  const raised=smooth((u-3.6)/3.6)*(1-smooth((u-10.8)/3.6));
  const z=1.14+raised*.61;
  const b=[4.32,5.45,1.5], end=[6.7,5.45,z+.56];
  const dx=end[0]-b[0],dz=end[2]-b[2],d=Math.hypot(dx,dz),l=1.54;
  const mx=(b[0]+end[0])/2,mz=(b[2]+end[2])/2,h=Math.sqrt(Math.max(0,l*l-d*d/4));
  const elbow=[mx-dz/d*h,5.45,mz+dx/d*h];
  const B=H.p(...b),E=H.p(...elbow),T=H.p(...end);
  H.tint(H.tile(4.5,5.65,2.41,.45,.925),'blue',.17);
  const rear=p=>[p[0]+5,p[1]-3];
  link(H,R,rear(B),rear(E),8,'teal');link(H,R,rear(E),rear(T),6,'teal');
  for(const p of [B,E,T]) link(H,R,p,rear(p),4,'blue');
  link(H,R,B,E,11);link(H,R,E,T,9);
  for(const [a,b] of [[B,E],[E,T]]) for(const f of [.23,.72]) {
    const q=[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];
    oval(H,R,...q,2.2,1.8,'blue',.65);oval(H,R,q[0]-.4,q[1]-.4,1.1,.8,'paper',1);
  }
  stroke(H,R,[[B[0]+2,B[1]+3],[E[0]+3,E[1]+6],[T[0],T[1]+5]],'blue',1.3);

  const back=H.p(b[0]-(elbow[0]-b[0])*.34,5.45,b[2]-(elbow[2]-b[2])*.34);
  link(H,R,B,back,7,'teal');oval(H,R,...back,7,6,'blue',.75);
  for(const p of [B,E,T]) pin(H,R,p,p===E?5:4.5);
  const lever=H.p(4.23,6.91,1.3+raised*.27);
  const linkage=H.p(4.32,5.45,1.29);
  stroke(H,R,[lever,H.p(4.02,6.45,1.23),linkage],'blue',2.5);
  stroke(H,R,[[lever[0]-.6,lever[1]-.6],H.p(4.02,6.45,1.27),H.p(4.32,5.45,1.33)],'paper',.8);
  oval(H,R,...lever,5,3.6,'coral',.71);
  const gap=.24+.19*(1-close);
  for(const side of [-1,1]) {
    const A=H.p(6.7+side*.13,5.45,z+.56),Q=H.p(6.7+side*gap,5.45,z+.35),C=H.p(6.7+side*gap,5.45,z+.05);
    link(H,R,A,Q,4.8,'teal');link(H,R,Q,C,4.8,'teal');
    pin(H,R,Q,2.8); stroke(H,R,[C,[C[0]-side*4,C[1]-1]],side<0?'coral':'blue',5.5);
  }
  cushion(H,R,6.46,5.25,.48,.46,z-.18,.35,'paper');
  actor(H,R,4.49,7.12,t,'mexicoRobotLearner',{face:'sw',shirt:['coral',.71],hairStyle:'curly'},0,1.58,'child');
  const shoulder=H.p(4.49,7.12,1.04);
  stroke(H,R,[shoulder,[lever[0]+5,lever[1]+8],lever],'coral',4.2);oval(H,R,...lever,2,2,'coral',.3);
  actor(H,R,8.78,5.49,t,'mexicoRobotMentor',{face:'sw',shirt:['teal',.72],hairStyle:'bun'},0,1.4);
  const swing=.035*Math.sin(t*Math.PI*2/18);
  stroke(H,R,[H.p(10.45,1.59,2.46),H.p(10.6+swing,1.62,2.23),H.p(10.65+swing,1.58,2.09)],'coral',1);
});
function colors(n){return ['coral','teal','sun','blue'][n%4];}
room.loopSeconds=18;
room.stillTime=8.4;
export default room;
