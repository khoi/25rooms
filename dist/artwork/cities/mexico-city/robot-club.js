import { world, box, shape, stroke, oval, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, cushion, floorLight, spokedWheel } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, recessedFrame } from '../joinery.js';

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
  masonry(H,R,'nw',.1,11.8,0,.61,'teal',.22);
  windowBay(H,R,'nw',1.1,5.1,1.84,1.68,{divisions:3,ink:'teal',view:P=>{
    for(let k=0;k<4;k++) surface(H,R,[P(.3+k*1.14,.2),P(1.08+k*1.14,.2),P(1.08+k*1.14,.66),P(.3+k*1.14,.9)],'sun',.25,.5);
  }});
  recessedFrame(H,R,'ne',1.0,5.2,1.75,1.72,'sun',P=>{diagram(H,R,P,.16,.15,2.26,1.4);diagram(H,R,P,2.68,.15,2.26,1.4);});
  metal(H,R,1.05,.15,5.25,.3,3.59,.13,'paper');
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
  benchFrame(H,R,3.0,4.38,5.5,3.07,.88,'sun');
  for(const y of [4.63,7.15]) metal(H,R,3.2,y,5.04,.12,.29,.12,'teal');
  surface(H,R,H.tile(3.19,4.57,5.12,2.68,.9),'teal',.2);
  for(const y of [4.5,7.3]) timber(H,R,3.08,y,5.32,.13,.9,.11,'sun');
  for(const x of [3.08,8.27]) timber(H,R,x,4.5,.12,2.9,.9,.11,'sun');
  metal(H,R,3.75,5.0,1.05,1.03,.91,.13,'teal');
  for(const x of [3.88,4.61]) for(const y of [5.14,5.84]) pin(H,R,H.p(x,y,1.05),2.2);
  box(H,R,4.11,5.2,.44,.5,1.04,.33,'blue',.66);
  for(const x of [4.05,4.53]) metal(H,R,x,5.22,.09,.4,1.29,.31,'teal');
  surface(H,R,H.tile(6.35,5.18,.74,.83,.925),'blue',.73);
  surface(H,R,H.tile(6.43,5.27,.58,.64,.93),'sun',.3,.6);
  for(const [x,y] of [[6.35,5.18],[7.04,5.18],[6.35,5.93],[7.04,5.93]]) box(H,R,x,y,.1,.11,.94,.12,'coral',.55);
  metal(H,R,7.55,6.3,.38,.59,.94,.14,'blue');
  H.line(R,[H.p(7.61,6.9,.94),H.p(7.73,6.9,1.16)],'paper',1);
  benchFrame(H,R,.66,8.1,2.69,1.67,.67,'teal');
  const pts=[[1.0,8.5],[1.8,8.33],[2.32,8.92],[1.52,9.1]].map(p=>H.p(...p,.7));
  for(let k=0;k<4;k++) link(H,R,pts[k],pts[(k+1)%4],4,k===2?'coral':'sun');
  for(const p of pts) pin(H,R,p,3);
  const gear=H.p(2.64,8.47,.71);spokedWheel(H,R,...gear,9,'sun',0,.52);spokedWheel(H,R,gear[0]+13,gear[1]+5,6,'teal',0,.52);
  box(H,R,1.15,9.34,.56,.31,.7,.12,'paper',1);
  cushion(H,R,9.44,8.5,1.42,1.27,.05,.13,'coral');
  box(H,R,9.68,8.74,.87,.68,.19,.055,'paper',1);
  H.line(R,[H.p(9.83,9.37,.26),H.p(10.42,8.94,.26)],'sun',2.2);
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
  link(H,R,B,E,11);link(H,R,E,T,9);
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
