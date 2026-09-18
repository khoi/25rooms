import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, cushion, drape, surface, vessel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { hangingRail } from '../joinery.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
const opened=t=>ease((t-3.2)/3.2)*(1-ease((t-9.6)/4.4));
const rest=FIGURES.clips.idle.keys[0][1];
FIGURES.clips.amsterdamClothTrader={dur:16,keys:[[0,{...rest,ar:100,er:26,al:53,el:72,head:9}],[.2,{...rest,ar:100,er:26,al:53,el:72,head:9}],[.4,{...rest,ar:100,er:26,al:63,el:61,head:13}],[.6,{...rest,ar:100,er:26,al:63,el:61,head:13}],[.875,{...rest,ar:100,er:26,al:53,el:72,head:9}],[1,{...rest,ar:100,er:26,al:53,el:72,head:9}]]};
function roll(H,R,i,j,z,ink,len=1.3){
  const [x,y]=H.p(i,j,z),[ex,ey]=H.p(i,j+len,z);
  shape(H,R,[[x-7,y],[x-7,y-17],[ex-7,ey-17],[ex+7,ey-17],[ex+7,ey],[x+7,y]],ink,.63);
  oval(H,R,ex,ey-9,7,9,'paper',1);oval(H,R,ex,ey-9,4.6,6.5,ink,.35);oval(H,R,ex,ey-9,1.8,2.3,'blue');
  H.line(R,[[x-5,y-14],[ex-5,ey-14]],'paper',.8);
}
function display(H,R){
  masonry(H,R,'nw',0,12,0,3.5,'paper',.62);masonry(H,R,'ne',0,12,0,3.63,'teal',.3);
  cabinetFrame(H,R,.28,.28,10.72,1.56,.11,3.11,5,'sun',(i,j,w,d,z,h,n)=>{
    for(const a of[.7,1.4,2.1])timber(H,R,i,j,w,d,z+a,.095,'teal');
    for(let k=0;k<3;k++)roll(H,R,i+.38+k*.54,j+.1,z+.12,['coral','teal','sun'][(n+k)%3],1.13);
    for(let k=0;k<2;k++)roll(H,R,i+.53+k*.73,j+.07,z+.86,['sun','paper','coral'][(n+k)%3],1.17);
    if(n===1){for(let k=0;k<4;k++)cushion(H,R,i+.08,j+.26,w-.18,.9,z+1.55+k*.105,.09,k%2?'coral':'paper');}
    else if(n===3){for(let k=0;k<5;k++){metal(H,R,i+.1+k*.31,j+.48,.25,.61,z+1.55,.19,k===2?'sun':'paper');for(let b=0;b<3;b++)oval(H,R,...H.p(i+.18+k*.31,j+.61+b*.16,z+1.77),1.8,1.2,b?'coral':'teal');}}
    else for(let k=0;k<3;k++)roll(H,R,i+.38+k*.54,j+.1,z+1.58,['paper','sun','teal'][(n+k)%3],1.05);
    if(n%2)cushion(H,R,i+.1,j+.2,w-.22,.95,z+2.23,.33,'coral');else for(let k=0;k<4;k++){shape(H,R,H.faceI(i+.1+k*.39,j+1.05,.3,z+2.24,z+2.75),'paper',.9);H.line(R,[H.p(i+.15+k*.39,j+1.07,z+2.32),H.p(i+.31+k*.39,j+1.07,z+2.6)],'teal',.8);}
  });
  timber(H,R,.18,.17,10.94,.25,3.26,.18,'sun');
  for(const i of[.4,10.8])metal(H,R,i,2.04,.14,.15,.1,3.9,'blue');
  surface(H,R,[H.p(.28,.05,3.82),H.p(11.05,.05,3.82),H.p(11.05,2.16,3.93),H.p(.28,2.16,3.93)],'paper',.8);
  for(let n=0;n<9;n++)surface(H,R,[H.p(.3+n*1.19,.07,3.83),H.p(.86+n*1.19,.07,3.83),H.p(.86+n*1.19,2.16,3.94),H.p(.3+n*1.19,2.16,3.94)],'coral',.28,.4);
  hangingRail(H,R,'nw',1.9,5.3,2.88,4,(P,u,n)=>{const [x,y]=P(u,-.02);shape(H,R,[[x-10,y],[x+10,y],[x+11,y+33],[x-9,y+32]],n===2?'teal':'paper',.8);if(n===0)shape(H,R,[[x-5,y+9],[x+5,y+9],[x+8,y+23],[x-8,y+23]],'coral',.5);else if(n===1)stroke(H,R,[[x-7,y+19],[x,y+10],[x+7,y+19],[x,y+16],[x,y+27]],'blue',.8);else for(let k=0;k<3;k++)H.line(R,[[x-6+k*6,y+6],[x-7+k*6,y+26]],'coral',1);});
  benchFrame(H,R,7.6,3.7,3.63,3.3,1.12,'sun');
  timber(H,R,7.8,3.9,3.2,2.87,.27,.1,'teal');
  for(let n=0;n<3;n++)roll(H,R,8.2+n*.88,4.15,.39,n?'coral':'paper',2.18);
  drape(H,R,7.82,3.9,2.19,2.49,1.14,.67,'teal');
  for(let n=0;n<10;n++)H.line(R,[H.p(8.03+n*.19,4.03,1.16),H.p(8.03+n*.19,6.38,1.16)],'sun',.55);
  timber(H,R,10.47,3.93,.22,2.74,1.14,.07,'paper');
  for(let n=0;n<15;n++)H.line(R,[H.p(10.47,4.02+n*.17,1.22),H.p(10.62,4.02+n*.17,1.22)],'blue',.6);
  metal(H,R,10.38,6.26,.5,.45,1.24,.11,'blue');
  stroke(H,R,[H.p(10.14,5.21,1.2),H.p(10.67,5.05,1.2),H.p(10.72,5.49,1.2),H.p(10.14,5.21,1.2),H.p(10.63,5.79,1.2)],'blue',1.3);
  for(const i of[10.55,10.75])oval(H,R,...H.p(i,5.88,1.2),3,2,'sun');
  benchFrame(H,R,.52,10.36,3.6,1.23,.71,'teal');
  for(let n=0;n<5;n++){const i=.75+n*.57;shape(H,R,H.tile(i,10.49,.49,.97,.74),'paper',1);shape(H,R,H.tile(i+.07,10.57,.35,.72,.75),['coral','sun','teal','paper','blue'][n],.45);}
  const [x,y]=H.p(3.77,11.29,.79);oval(H,R,x,y,8,5,'sun');H.line(R,[[x-5,y],[x+6,y]],'paper',1.2);
  cushion(H,R,5.17,10.07,1.2,.82,.07,.18,'coral');
  for(let n=0;n<3;n++){const [x,y]=H.p(10.22+n*.32,9.2,.08);shape(H,R,[[x-4,y],[x+5,y],[x+5,y-27],[x-4,y-27]],'sun',.3);oval(H,R,x,y-27,4.5,2,'blue',.58);}
  box(H,R,8.52,9.66,1.15,1.3,.05,.41,'paper',1);surface(H,R,H.tile(8.63,9.8,.92,1.0,.48),'teal',.25);H.line(R,[H.p(8.56,9.69,.48),H.p(9.52,10.85,.48)],'coral',1.2);
  floorLight(H,5.6,7.3,123,.3);
}
function wing(H,R,t){
  const a=.07+opened(t)*1.55,P=(u,z)=>H.p(2.05+u*Math.cos(a),4.02+u*Math.sin(a),z);
  for(const z of[.2,3.05])H.line(R,[P(0,z),P(4.28,z)],'blue',3.3);
  for(const u of[0,4.28])H.line(R,[P(u,.19),P(u,3.06)],'teal',4);
  metal(H,R,1.81,3.78,.56,.54,.025,.14,'blue');
  for(const z of[.4,1.52,2.77])oval(H,R,...P(0,z),3,3,'sun');
  const C=(u,z)=>{const [x,y]=P(u,z);return[x+Math.sin(u*7)*2.1,y];};
  const Q=[C(.14,2.94),C(4.12,2.94),...Array.from({length:24},(_,n)=>C(4.12-n*3.98/23,.4+Math.sin(n*.79)*.05))];
  surface(H,R,Q,'coral',.57);
  H.clip(Q,()=>{for(let n=0;n<13;n++){const u=.2+n*.32;H.line(R,[C(u,.32),C(u,2.97)],n%3?'sun':'paper',n%3?1:3.3);}
    for(let n=0;n<6;n++){const z=.69+n*.4;H.line(R,[C(.13,z),C(4.15,z)],'teal',1.7);}
  });
  H.line(R,[C(.18,.5),C(4.08,.5)],'paper',1.3);
  for(const u of[.26,1.48,2.8,3.98])metal(H,R,2.05+u*Math.cos(a),4.02+u*Math.sin(a),.1,.13,2.91,.2,'sun');
  const [x,y]=C(2.92,.52);for(let n=0;n<6;n++)H.line(R,[[x-8+n*3,y-2],[x-6+n*3,y+3]],'blue',.55);
  const hand=FIGURES.pose({who:'adult',at:[0,0,0],clip:'amsterdamClothTrader',face:'se',scale:1.46},t,null,H).nearHand,target=P(4.28,1.22),dx=(target[0]-hand[0])/32,dy=(target[1]-hand[1])/16;
  const i=(dx+dy)/2,j=(dy-dx)/2;
  actor(H,R,i,j,t,'amsterdamClothTrader',{shirt:['teal',.7],hairStyle:'bun',face:'se'},0,1.46);
}
const room=world('amsterdam-dappermarkt-cloth','The fabric turns toward the light',{wall:false,floor:'paper',tone:.25,head:70},display,(H,R,time)=>{
  const t=cycle(time,16)*16;wing(H,R,t);
  actor(H,R,6.1,9.47,4*Math.sin(t*Math.PI/16)**2,'think',{shirt:['sun',.68],hairStyle:'curly',face:'nw'},0,1.42);
});
room.loopSeconds=16;room.stillTime=8;
export default room;
