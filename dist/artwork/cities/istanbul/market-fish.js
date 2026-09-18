import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, drape, benchFrame, bentTube, pendant } from '../materials.js';
import { basin, cabinetFrame } from '../structure.js';
import { windowBay, wallCourse, hangingRail, panelFront, caster, floorShadow } from '../joinery.js';

const base=FIGURES.sample('hold',0);
FIGURES.clips['istanbul-fish-lift']={dur:22,keys:[[0,{...base,al:38,ar:40,el:35,er:35}],[.2,{...base,al:38,ar:40,el:35,er:35}],[.4,{...base,al:96,ar:98,el:45,er:45}],[.6,{...base,al:96,ar:98,el:45,er:45}],[.91,{...base,al:38,ar:40,el:35,er:35}],[1,{...base,al:38,ar:40,el:35,er:35}]]};

function fish(H,R,x,y,s=1,ink='teal'){
  shape(H,R,[[x-18*s,y],[x-7*s,y-6*s],[x+8*s,y-5*s],[x+16*s,y],[x+7*s,y+5*s],[x-7*s,y+5*s],[x-18*s,y]],ink,.54,.7);
  shape(H,R,[[x-14*s,y],[x-24*s,y-6*s],[x-23*s,y+6*s]],'blue',.58,.5);
  H.line(R,[[x-13*s,y-1*s],[x+10*s,y-2*s]],'paper',1.5);
  H.dot(x+10*s,y-1*s,1.3*s,'blue');
  stroke(H,R,[[x+5*s,y-4*s],[x+2*s,y],[x+5*s,y+4*s]],'blue',.7);
  for(let n=0;n<6;n++)H.line(R,[[x-11*s+n*3*s,y],[x-9*s+n*3*s,y+3*s]],'sun',.5);
}

function drainBasket(H,R,x,y){
  shape(H,R,[[x-25,y-6],[x+24,y-6],[x+19,y+16],[x-20,y+16]],'teal',.56,.9);
  for(let n=0;n<9;n++)H.line(R,[[x-22+n*5.4,y-4],[x-18+n*4.4,y+14]],'blue',1);
  for(let n=0;n<4;n++)H.line(R,[[x-22+n,y+n*4],[x+22-n,y+n*4]],'paper',.8);
  oval(H,R,x,y-6,25,10,'teal',.7);oval(H,R,x,y-7,21,7,'blue',.6);
  for(let n=0;n<5;n++)H.line(R,[[x-16+n*8,y-11],[x-15+n*7,y-3]],'paper',.6);
  stroke(H,R,[[x+16,y-10],[x+17,y-19],[x+25,y-19],[x+25,y-8]],'blue',2.7);
  for(let n=0;n<4;n++)H.line(R,[[x+18+n*1.5,y-20],[x+18+n*1.5,y-17]],'paper',.8);
}

const room=world('istanbul-market-fish','The basket drains',{wall:'paper',wallTone:.83,height:3.8,floor:'paper',tone:.7,pattern:'tiles',accent:'teal',head:38},(H,R)=>{
  wallCourse(H,R,'nw',.2,11.8,1.35,'teal');wallCourse(H,R,'ne',.2,11.8,1.35,'teal');
  for(let n=0;n<7;n++)shape(H,R,H.tile(4.4+n*.2,7.2+n*.3,.7,.35,.023),'paper',1,.4);
  windowBay(H,R,'nw',1.15,5.1,1.65,1.65,{divisions:3,view:P=>{shape(H,R,[P(.1,.1),P(5,.1),P(5,.6),P(.1,.4)],'teal',.18,.5);}});
  const [shx,shy]=H.p(.48,4.8,1.54);shape(H,R,[[shx-6,shy],[shx-4,shy-7],[shx,shy-10],[shx+6,shy-5],[shx+5,shy]],'sun',.75,.5);for(let n=0;n<4;n++)H.line(R,[[shx,shy-8],[shx-4+n*3,shy]],'coral',.5);
  cabinetFrame(H,R,7.25,.4,4.25,1.6,.12,3.18,2,'paper',(x,y,w,d,z,h,n)=>{
    metal(H,R,x,y,w,d,z+1.12,.09,'teal');metal(H,R,x,y,w,d,z+2.08,.09,'teal');
    if(n===0){for(let k=0;k<3;k++)metal(H,R,x+.14,y+.08,w-.3,d-.2,z+.2+k*.23,.16,k===1?'paper':'teal');drape(H,R,x+.12,y+.1,w-.3,.9,z+1.3,.32,'paper');vessel(H,R,x+.7,y+.65,z+2.2,15,20,'teal');}
    else{for(let k=0;k<6;k++)H.line(R,[H.p(x+.1,y+.5,z+.18+k*.12),H.p(x+w-.1,y+.5,z+.18+k*.12)],'blue',1.7);metal(H,R,x+.1,y+.1,w-.2,d-.2,z+1.3,.55,'paper');vessel(H,R,x+.8,y+.6,z+2.21,17,10,'sun');}
  });
  const door=H.faceI(9.4,2.02,1.78,.26,2.02);shape(H,R,door,'paper',1,1.5);H.outline(R,H.faceI(9.52,2.03,1.54,.4,1.9),'blue',.8);bentTube(H,R,[[9.69,2.08,1.03],[9.69,2.08,1.51]],2.5,'teal');
  for(let n=0;n<7;n++)H.line(R,[H.p(9.55+n*.19,2.04,.33),H.p(9.55+n*.19,2.04,.59)],'blue',.7);
  hangingRail(H,R,'ne',1.15,5.35,3.45,5,(P,u,n)=>{
    const [x,y]=P(u,-.14);
    if(n===0){shape(H,R,[[x-8,y+7],[x-17,y+21],[x-19,y+57],[x+17,y+57],[x+15,y+20],[x+7,y+7]],'coral',.7,.7);shape(H,R,[[x-5,y+35],[x+8,y+35],[x+8,y+47],[x-5,y+47]],'teal',.65,.6);H.line(R,[[x-10,y+51],[x+10,y+51]],'paper',.8);}
    else if(n===1){H.line(R,[[x,y],[x,y+30]],'sun',2.6);oval(H,R,x,y+39,13,11,'paper',.5);for(let k=-2;k<3;k++)H.line(R,[[x-9,y+39+k*3],[x+9,y+39+k*3]],'blue',.6);}
    else if(n===2){shape(H,R,[[x-8,y+6],[x+8,y+6],[x+8,y+30],[x-6,y+28],[x-12,y+15]],'sun',.65,.6);}
    else {H.line(R,[[x,y],[x-10,y+25],[x+11,y+25],[x,y]],'blue',.9);oval(H,R,x,y+26,17,5,'paper',1);}
  });
  floorShadow(H,2.3,4.4,5.5,3,.18);
  for(const x of [2.7,7.25])for(const y of [4.6,6.75]){metal(H,R,x,y,.15,.15,.12,1.1,'teal');metal(H,R,x-.06,y-.07,.27,.29,.02,.13,'blue');}
  metal(H,R,2.5,4.4,5.15,2.7,1.15,.25,'paper');
  shape(H,R,H.tile(2.72,4.61,4.72,2.25,1.41),'blue',.77,.85);
  shape(H,R,H.tile(2.99,4.88,4.18,1.72,1.22),'teal',.27,.7);
  for(const i of [2.78,7.27])metal(H,R,i,4.56,.11,2.38,1.42,.09,'paper');
  for(let n=0;n<10;n++)metal(H,R,3.1+n*.21,5.04,.06,1.23,1.28,.06,'paper');
  metal(H,R,2.5,4.33,5.15,.12,1.39,.43,'teal');
  bentTube(H,R,[[3,4.52,1.45],[3,4.52,2.45],[4.2,4.62,2.5],[4.2,4.94,2.13]],3,'paper');
  stroke(H,R,[H.p(2.65,4.7,1.45),H.p(2.1,4.68,.55),H.p(1.76,5.6,.14),H.p(2.25,6.35,.18),H.p(2.8,5.92,.82)],'teal',3);
  metal(H,R,3.03,5.05,.36,1.16,1.38,.045,'paper');
  const [drx,dry]=H.p(5.4,6,1.24);oval(H,R,drx,dry,7,3,'blue',.9);H.line(R,[[drx-3,dry],[drx+3,dry]],'paper',.7);
  metal(H,R,.85,7.45,5.55,2.45,.1,.95,'teal');panelFront(H,R,.95,9.92,5.35,.18,.71,3,'teal');
  metal(H,R,.76,7.33,5.73,2.68,1.03,.13,'paper');
  shape(H,R,H.tile(.98,7.57,5.25,2.15,1.17),'paper',1,.8);
  for(let n=0;n<24;n++){const x=1.15+n%8*.6,j=7.72+Math.floor(n/8)*.63;shape(H,R,[H.p(x,j,1.18),H.p(x+.37,j+.1,1.23),H.p(x+.19,j+.45,1.2)],'teal',.15,.4);}
  for(const [i,j,s] of [[1.75,7.99,1.03],[3.15,7.87,1.2],[4.7,8.05,1.15],[2.05,9.13,1.15],[3.75,9.07,1.1],[5.33,9.1,.9]])fish(H,R,...H.p(i,j,1.25),s);
  timber(H,R,8.9,7.25,2.2,2.25,.03,.23,'sun');
  for(let n=0;n<5;n++)timber(H,R,8.9,7.28+n*.42,2.2,.24,.27,.1,'sun');
  drape(H,R,9.08,7.46,1.55,1.3,.41,.25,'paper');
  benchFrame(H,R,9.35,9.9,2.05,1.1,.87,'sun');
  for(let k=0;k<5;k++)shape(H,R,H.tile(9.53+k*.025,10.1,1.5,.65,.91+k*.025),'paper',1,.5);
  shape(H,R,H.tile(7.6,7.4,1.1,3.65,.031),'blue',.65,.6);for(let n=0;n<11;n++)H.line(R,[H.p(7.71,7.6+n*.29,.04),H.p(8.61,7.6+n*.29,.04)],'teal',2);
  for(let n=0;n<8;n++)metal(H,R,5.7+n*.16,10.6,.08,.77,.025,.03,'blue');
  pendant(H,R,5,3.7,4.1,3.23,'paper',.8);
},(H,R,t)=>{
  const u=cycle(t,22)*22;
  actor(H,R,7.92,4.43,t,'istanbul-fish-lift',{shirt:['paper',1],apron:['teal',.78],hairStyle:'cap',face:'sw',prop:(HH,RR,p)=>{
    const x=(p.lhand[0]+p.rhand[0])/2-17,y=(p.lhand[1]+p.rhand[1])/2+12;
    drainBasket(HH,RR,x,y);
    if(u>5&&u<13.2)for(let n=0;n<4;n++){const f=cycle(t+n*.6,1.55);H.opacity((1-f)*Math.min(1,(13.2-u)/2),()=>H.line(RR,[[x-15+n*9,y+18+f*24],[x-15+n*9,y+21+f*24]],'teal',1));}
  }},0,1.55);
  actor(H,R,7.68,10.3,cycle(t,22)*3,'idle',{shirt:['coral',.63],hairStyle:'bun',face:'sw',prop:(HH,RR,p)=>{stroke(HH,RR,[p.rhand,[p.rhand[0]+4,p.rhand[1]+13]],'blue',1);shape(HH,RR,[[p.rhand[0]-7,p.rhand[1]+11],[p.rhand[0]+13,p.rhand[1]+11],[p.rhand[0]+10,p.rhand[1]+30],[p.rhand[0]-5,p.rhand[1]+30]],'paper',1,.7);}},0,1.5);
});
room.loopSeconds=22;room.stillTime=10.5;
export default room;
