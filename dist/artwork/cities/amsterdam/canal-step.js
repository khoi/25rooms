import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, cushion, vessel, drape, floorLight, surface } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, taskLight, recessedFrame } from '../joinery.js';
const ease=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
const rest=FIGURES.clips.idle.keys[0][1], rig={...rest};
FIGURES.clips.amsterdamLandingResident={dur:1,keys:[[0,rig],[1,rig]]};
function boot(H,R,i,j,z,ink='coral',s=1){const [x,y]=H.p(i,j,z);shape(H,R,[[x-6*s,y],[x+9*s,y],[x+10*s,y-4*s],[x+3*s,y-7*s],[x+3*s,y-20*s],[x-6*s,y-20*s]],ink,.7);H.line(R,[[x-5*s,y-3*s],[x+8*s,y-3*s]],'blue',1.3);for(let n=0;n<3;n++)H.line(R,[[x-4*s,y-(8+n*3)*s],[x+2*s,y-(7+n*3)*s]],'sun',.8);}
function shell(H,R){
  masonry(H,R,'nw',0,12,0,4.35,'paper',.74);masonry(H,R,'ne',0,12,0,4.25,'paper',.7);
  for(const side of['nw','ne']){const P=(u,z)=>side==='nw'?H.p(.17,u,z):H.p(u,.17,z);shape(H,R,[P(0,.05),P(12,.05),P(12,.92),P(0,.92)],'teal',.22);for(let n=0;n<15;n++)H.line(R,[P(n*.8,.05),P(n*.8,.9)],'blue',.55);}
  windowBay(H,R,'nw',1.05,3.12,2.14,1.84,{divisions:3});
  windowBay(H,R,'ne',5.1,3.13,3.14,.89,{divisions:3});
  shape(H,R,H.faceI(5.12,.21,3.12,.03,3.14),'teal',.32);
  for(const i of[4.93,8.25])timber(H,R,i,.1,.19,.44,.01,3.17,'sun');
  timber(H,R,4.9,.1,3.57,.47,3.1,.17,'sun');
  for(let n=0;n<7;n++){
    const j=1.08+n*.87,z=(7-n)*.29;
    timber(H,R,.56,j,3.27,.9,0,z,n===4?'coral':'sun');
    timber(H,R,.49,j+.73,3.39,.19,z,.065,n===4?'teal':'sun');
    for(const i of[.7,3.54])H.dot(...H.p(i,j+.81,z+.072),1.3,'blue');
  }
  shape(H,R,[H.p(3.79,1.1,.05),H.p(3.79,7.36,.05),H.p(3.79,7.36,.29),H.p(3.79,1.1,2.2)],'teal',.64);
  for(const j of[1.1,2.9,4.7,6.5]){const z=(7.7-j)*.29;bentTube(H,R,[[3.8,j,z],[3.8,j,z+1.02]],2.5,'teal');}
  bentTube(H,R,[[3.79,.85,3.05],[3.79,6.93,1.28],[4.04,7.3,1.14]],3.6,'sun');
  cabinetFrame(H,R,8.76,.27,2.89,1.78,.1,3.6,2,'teal',(i,j,w,d,z,h,n)=>{
    timber(H,R,i,j,w,d,z+.78,.1,'sun');timber(H,R,i,j,w,d,z+2.44,.11,'sun');
    if(!n){boot(H,R,i+.35,j+.81,z+.1,'sun',.8);boot(H,R,i+.86,j+.69,z+.1,'coral',.7);const [x,y]=H.p(i+.62,j+.72,z+2.28);shape(H,R,[[x-5,y],[x+5,y],[x+14,y+11],[x+10,y+21],[x+7,y+17],[x+8,y+42],[x-8,y+42],[x-7,y+16],[x-12,y+22],[x-14,y+10]],'coral',.62);stroke(H,R,[[x,y+7],[x,y+39]],'paper',1);cushion(H,R,i+.08,j+.3,w-.16,.72,z+2.58,.23,'paper');}
    else{vessel(H,R,i+.43,j+.55,z+.04,8,22,'sun');for(const x of[i+.22,i+.5])bentTube(H,R,[[x,j+.55,z+.39],[x+.1,j+.5,z+1.14],[x+.25,j+.5,z+1.2]],1.4,'blue');box(H,R,i+.14,j+.4,w-.24,.71,z+.92,.75,'coral',.65);H.line(R,[H.p(i+.39,j+1.12,z+1.34),H.p(i+.93,j+1.12,z+1.34)],'sun',1.3);box(H,R,i+.12,j+.25,w-.22,.9,z+2.55,.34,'sun',.6);}
  });
  recessedFrame(H,R,'ne',8.86,.74,2.5,.79,'sun',P=>{shape(H,R,[P(.1,.1),P(.64,.1),P(.64,.68),P(.1,.68)],'paper',.9);H.line(R,[P(.18,.15),P(.49,.62)],'teal',1.6);});
  timber(H,R,8.89,1.92,1.05,.61,.64,.24,'sun');H.line(R,[H.p(9.15,2.54,.76),H.p(9.58,2.54,.76)],'blue',1.9);
  benchFrame(H,R,5.15,6.45,3.45,1.31,.69,'sun');
  for(let n=0;n<6;n++)timber(H,R,5.31+n*.52,6.53,.13,1.1,.2,.08,'teal');
  boot(H,R,5.85,7.22,.28,'coral',.7);boot(H,R,6.24,7.22,.28,'sun',.45);
  cushion(H,R,5.3,6.59,1.04,.92,.72,.13,'teal');
  timber(H,R,.45,9.13,1.45,1.87,.04,.16,'teal');for(let n=0;n<7;n++)H.line(R,[H.p(.6,9.26+n*.23,.22),H.p(1.73,9.26+n*.23,.22)],'blue',1.5);
  boot(H,R,2.12,9.6,.02,'blue',1);boot(H,R,2.67,9.51,.02,'coral',.95);
  hangingRail(H,R,'nw',8.7,2.3,2.39,3,(P,u,n)=>{const [x,y]=P(u,0);if(n===0)shape(H,R,[[x-7,y+4],[x+6,y+4],[x+8,y+20],[x+3,y+25],[x-2,y+16],[x-7,y+20]],'sun',.65);else{shape(H,R,[[x-4,y+3],[x+5,y+3],[x+6,y+27],[x-5,y+26]],n===1?'coral':'teal',.5);H.line(R,[[x,y+5],[x,y+23]],'paper',.8);}});
  timber(H,R,.3,7.44,.73,3.64,3.45,.12,'sun');
  for(const j of[7.81,8.61,10.13]){const [x,y]=H.p(.71,j,3.58);shape(H,R,[[x-8,y],[x+8,y],[x+8,y-20],[x-8,y-20]],'paper',1);oval(H,R,x,y-12,3,4,'teal');H.line(R,[[x-4,y-5],[x+4,y-5]],'coral',1.1);}
  const [kx,ky]=H.p(.4,6.71,2.36);stroke(H,R,[[kx,ky],[kx+2,ky+17]],'coral',1);shape(H,R,[[kx-5,ky+17],[kx+7,ky+17],[kx+7,ky+27],[kx-5,ky+27],[kx-5,ky+17],[kx+1,ky+12],[kx+7,ky+17]],'sun',.7);H.line(R,[[kx+2,ky+25],[kx+4,ky+32]],'blue',1.3);
  benchFrame(H,R,9.24,7.84,2.08,1.68,1.08,'teal');vessel(H,R,9.78,8.28,1.11,7,22,'paper',false);vessel(H,R,10.62,8.54,1.11,4,11,'teal');oval(H,R,...H.p(10.07,9,1.12),11,5,'sun');oval(H,R,...H.p(10.07,9,1.16),8,5,'paper');
  metal(H,R,4.91,1.02,3.52,.35,.015,.075,'teal');for(let n=0;n<15;n++)H.line(R,[H.p(5.02+n*.22,1.04,.1),H.p(5.02+n*.22,1.34,.1)],'blue',.7);
  taskLight(H,R,2.94,1.58,2.09,'coral',.1);floorLight(H,4.8,6,110,.28);
}
function door(H,R,t){
  const f=ease((t-6.4)/6.4)*(1-ease((t-19.2)/5.3)),a=f*1.12;
  const P=(u,z)=>H.p(5.12+u*Math.cos(a),.23+u*Math.sin(a),z);
  surface(H,R,[P(0,.06),P(3.09,.06),P(3.09,3.08),P(0,3.08)],'teal',.67);
  for(const [z,h]of[[.23,1.14],[1.63,1.18]])surface(H,R,[P(.18,z),P(2.9,z),P(2.9,z+h),P(.18,z+h)],'teal',.38);
  for(const z of[.41,2.59]){H.line(R,[P(.01,z),P(.01,z+.22)],'sun',3.3);H.dot(...P(.08,z+.11),1.1,'blue');}
  H.line(R,[P(2.61,1.45),P(2.93,1.45)],'sun',2.8);
  return P(2.83,1.45);
}
const room=world('amsterdam-canal-step','Between street and home',{wall:false,pattern:'tiles',floor:'paper',accent:'teal',head:65},shell,(H,R,time)=>{
  const t=cycle(time,32)*32;const transit=ease((t-1.6)/4.6)*(1-ease((t-24.4)/3.3));
  H.clip(H.faceI(5.13,.22,3.11,.05,3.07),()=>{for(let n=0;n<14;n++){const z=((n*.37-t*.44)%3+3)%3;H.line(R,[H.p(5.22+n%5*.59,.23,z),H.p(5.18+n%5*.59,.23,z-.2)],'paper',.9);}});
  actor(H,R,2.42,4.72,3*Math.sin(t*Math.PI/32)**2,'idle',{shirt:['sun',.7],face:'se',hairStyle:'curly'},1.15,1.4);
  const target=door(H,R,t);
  const walk=FIGURES.sample('walk',t*.8);Object.assign(rig,rest);for(const key of Object.keys(rest))rig[key]=(walk[key]??rest[key])*transit+({...rest,drop:.47,ll:84,lr:80,kl:-84,kr:-80,head:18,al:35,ar:65,el:40,er:40}[key]??rest[key])*(1-transit);
  if(t>6&&t<24.8)Object.assign(rig,{...rest,ar:110,er:25,head:-7});
  if(t>28&&t<30)Object.assign(rig,{...rig,lean:-14,head:23,ar:40,er:8});
  const hand=FIGURES.pose({who:'adult',at:[0,0,0],clip:'amsterdamLandingResident',face:'se',scale:1.42},0,null,H).nearHand,dx=(target[0]-hand[0])/32,dy=(target[1]-hand[1])/16;
  const i=6.3*(1-transit)+(dx+dy)/2*transit,j=7.06*(1-transit)+(dy-dx)/2*transit;
  actor(H,R,i,j,0,'amsterdamLandingResident',{shirt:['coral',.7],hairStyle:'pony',face:'se'},0,1.42);
});
room.loopSeconds=32;room.stillTime=30.8;
export default room;
