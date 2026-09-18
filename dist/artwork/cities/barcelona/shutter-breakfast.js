import { world, shape, oval, stroke, actor, bottle, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, benchFrame, drape, slattedSeat, cushion, branchSpray } from '../materials.js';
import { archedBay, cabinetFrame, basin } from '../structure.js';
import { cornice, wallRack, hangingRail, caster, specimen } from '../joinery.js';

const ease = (a,b,t) => { const u=Math.max(0,Math.min(1,(t-a)/(b-a))); return u*u*(3-2*u); };
const rig={...FIGURES.clips.idle.keys[0][1],head:-9,al:22,el:42};
FIGURES.clips['barcelona-breakfast-catch']={dur:18,keys:[[0,rig],[1,rig]]};
function handAt(H,target){const p=H.p(4.1,.92),s=1.65,dx=(target[0]-p[0])/s-5.2,dy=(target[1]-p[1])/s+32.5,a=4.368,b=4.2,d=Math.min(8.55,Math.hypot(dx,dy)),v=Math.acos(Math.max(-1,Math.min(1,(d*d-a*a-b*b)/(2*a*b))));rig.ar=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(v),a+b*Math.cos(v)))*180/Math.PI;rig.er=v*180/Math.PI;}
function plate(H,R,i,j,z,r=12){oval(H,R,...H.p(i,j,z),r,r*.4,'paper',1);oval(H,R,...H.p(i,j,z+.013),r*.72,r*.28,'sun',.2);}
function shutter(H,R,i,j,w,a){const P=(u,z)=>H.p(i+Math.cos(a)*u,j+Math.sin(a)*u,z);shape(H,R,[P(0,1.1),P(w,1.1),P(w,3.75),P(0,3.75)],'teal',.64);for(const u of [.07,w-.13])shape(H,R,[P(u,1.14),P(u+.07,1.14),P(u+.07,3.68),P(u,3.68)],'teal',.4);for(let z=1.32;z<3.57;z+=.19){shape(H,R,[P(.16,z),P(w-.16,z),P(w-.16,z+.105),P(.16,z+.105)],'teal',z>2.9&&z<3.2?.32:.72);H.line(R,[P(.17,z+.11),P(w-.17,z+.11)],'paper',.65);}for(const z of[1.36,3.46]){H.line(R,[P(.03,z-.1),P(.03,z+.1)],'blue',3);H.dot(...P(.03,z),1.6,'sun');}const p=P(.3,1.54);H.line(R,[[p[0]-5,p[1]],[p[0]+5,p[1]]],'sun',2.8);return p;}
const room=world('barcelona-shutter-breakfast','The gallery opens',{floor:'paper',tone:.45,wall:'paper',wallTone:.78,height:4.05,head:45},(H,R)=>{
  for(const side of['ne','nw'])cornice(H,R,side,0,12,4.05,'sun');
  for(let n=0;n<12;n++){for(const [i,j]of[[n,10.9],[10.9,n]]){shape(H,R,H.tile(i,j,.8,.8,.03),'teal',.32);shape(H,R,[H.p(i+.4,j+.12,.045),H.p(i+.68,j+.4,.045),H.p(i+.4,j+.68,.045),H.p(i+.12,j+.4,.045)],'coral',.5);}}
  for(let j=1;j<10.8;j+=1.6)H.line(R,[H.p(.6,j,.02),H.p(10.7,j,.02)],'blue',.6,{tone:.22});
  for(const i of[1,6.7])archedBay(H,R,'ne',i,4.5,.85,3,'teal',P=>{shape(H,R,[P(.16,.2),P(4.3,.2),P(4.3,2.85),P(.16,2.85)],'sun',.11);for(let n=0;n<4;n++){shape(H,R,[P(.2+n, .2),P(.97+n,.2),P(.97+n, .95+n%2*.25),P(.2+n,.95+n%2*.25)],'coral',.14);for(const z of[.4,.7])H.line(R,[P(.5+n,z),P(.5+n,z+.11)],'blue',1.5,{tone:.3});}});
  timber(H,R,.56,.5,11,.85,.73,.18,'sun');
  for(const i of[.58,5.6,11.4]){timber(H,R,i,.08,.2,.74,.72,3.22,'teal');metal(H,R,i-.06,.71,.34,.15,3.53,.16,'sun');}
  cabinetFrame(H,R,6.7,.65,4.28,1.21,0,.73,3,'teal',(i,j,w,d,z,h,n)=>{if(n===1){timber(H,R,i,j+.25,w,d+.2,z,.12,'sun');plate(H,R,i+.4,j+.65,z+.14,7);vessel(H,R,i+.9,j+.52,z+.15,3.5,6,'coral');}else{cushion(H,R,i+.08,j+.12,w-.15,.72,z+.1,.18,'paper');}});
  cushion(H,R,6.9,.72,3.9,1.07,.91,.13,'paper');
  wallRack(H,R,'nw',1.4,6.8,1.12,2.45,3,'sun',(P,z,row)=>{for(let n=0;n<5;n++){const u=.4+n*1.2;if(row===0){shape(H,R,[P(u,z+.07),P(u+.82,z+.07),P(u+.82,z+.49),P(u,z+.49)],n===3?'teal':'paper',.85);H.line(R,[P(u+.18,z+.33),P(u+.6,z+.33)],'blue',1);}if(row===1){const p=P(u+.35,z+.36);oval(H,R,...p,8,12,'paper',1);H.line(R,[P(u+.25,z),P(u+.25,z+.16)],'blue',1.3);}if(row===2){const p=P(u+.28,z+.05);if(n<3){vessel(H,R,.34,1.4+u+.2,1.12+z+.08,6,12,n===1?'sun':'teal');}else{shape(H,R,[P(u,z+.03),P(u+.7,z+.03),P(u+.7,z+.45),P(u,z+.45)],'coral',.47);}}}});
  timber(H,R,.23,1.4,1.16,6.8,.92,.15,'sun');
  for(const j of[1.5,4.9,8])timber(H,R,.36,j,.18,.15,0,.92,'teal');
  for(const j of[2.45,3.67]){const P=(u,z)=>H.p(.32,j+u,z);shape(H,R,[P(0,3.57),P(.84,3.57),P(.84,3.99),P(0,3.99)],'sun',.63);shape(H,R,[P(.08,3.63),P(.76,3.63),P(.76,3.93),P(.08,3.93)],'paper',1);for(const u of[.27,.56]){oval(H,R,...P(u,3.82),2.7,3.1,'blue',.7);oval(H,R,...P(u,3.71),4,3,'teal',.65);}}
  metal(H,R,.18,5.1,.48,1.13,3.57,.48,'teal');for(let j=5.2;j<5.92;j+=.12)H.line(R,[H.p(.69,j,3.67),H.p(.69,j,3.94)],'paper',.75);oval(H,R,...H.p(.72,6.02,3.79),3,3,'sun');
  basin(H,R,.34,5.6,.84,1.5,1.09,'paper');
  drape(H,R,.38,7.24,.74,.58,1.09,.48,'coral');
  metal(H,R,.22,1.42,1.1,.24,1.09,.56,'teal');
  for(let j=1.5;j<2.8;j+=.19)H.line(R,[H.p(.6,j,1.1),H.p(.6,j,1.61)],'blue',1);
  plate(H,R,.76,3.16,1.13,11);bottle(H,R,...H.p(.71,3.74,1.12),'teal',.55);
  benchFrame(H,R,5.24,2.74,4.25,1.8,1.11,'sun');
  drape(H,R,6.15,2.77,1.44,1.75,1.12,.48,'paper');
  timber(H,R,5.5,3.1,1.1,.81,1.14,.07,'sun');
  const stain=H.p(6.06,3.47,1.22);oval(H,R,...stain,5,3,'coral',.45);stroke(H,R,[[stain[0]-4,stain[1]-3],[stain[0],stain[1]-5],[stain[0]+4,stain[1]-2]],'teal',.7);
  for(const [i,j]of[[7,3.25],[8.54,3.85]])plate(H,R,i,j,1.15,13);
  for(const [i,j]of[[5.82,3.26],[6.05,3.48]])oval(H,R,...H.p(i,j,1.29),6,3.6,'sun',.66);
  vessel(H,R,8.75,3.04,1.14,10,9,'paper');for(const [i,j]of[[8.6,3],[8.86,3],[8.75,3.23]])oval(H,R,...H.p(i,j,1.45),4,3.7,'coral',.8);
  bottle(H,R,...H.p(7.7,3.12,1.15),'teal',.6);vessel(H,R,7.68,4.05,1.16,4.5,7,'sun');
  slattedSeat(H,R,7.1,5.28,1.4,0,'sun');timber(H,R,7.26,5.85,1.04,.13,.25,.11,'teal');
  slattedSeat(H,R,5.13,5.05,1.05,.25,'coral');for(const i of[5.2,5.96])timber(H,R,i,5.08,.2,.64,0,.27,'sun');
  benchFrame(H,R,.8,9.11,3.3,1.03,.62,'teal');
  for(const [i,j,r,h]of[[1.14,9.6,11,17],[2.3,9.6,9,14],[3.5,9.6,8,12]]){vessel(H,R,i,j,.64,r,h,'coral');branchSpray(H,R,...H.p(i,j,1.18),.8,'teal',i<2?1:-1);}
  bentTube(H,R,[[1.08,9.35,1],[1.08,9.35,2.02],[3.4,9.35,2.02],[3.4,9.35,1]],1.6,'sun');for(let i=1.3;i<3.3;i+=.5)bentTube(H,R,[[i,9.35,1.1],[i,9.35,2]],1,'teal');
  vessel(H,R,3.86,8.55,0,10,14,'teal');const sp=H.p(3.9,8.55,.36);stroke(H,R,[[sp[0]+8,sp[1]],[sp[0]+19,sp[1]-8],[sp[0]+24,sp[1]-7]],'teal',5);
  metal(H,R,10.2,5.75,1.27,1.9,.06,.12,'blue');for(const j of[6.06,6.7]){oval(H,R,...H.p(10.7,j,.24),10,4,'coral');}
  timber(H,R,10.2,8.1,1.1,.8,.22,.2,'sun');for(const i of[10.3,11.1])caster(H,R,i,8.75);bentTube(H,R,[[10.3,8.4,.4],[10.3,8.4,1.7],[11.1,8.4,1.7],[11.1,8.4,.4]],2,'blue');drape(H,R,10.36,8.25,.7,.52,1.18,.68,'coral');
},(H,R,time)=>{const t=((time%18)+18)%18,u=ease(3.6,7.2,t)*(1-ease(10.8,16,t)),a=.08+u*1.13;
  for(let n=0;n<8;n++){const i=3.9+n*.63;H.tint([H.p(i,.82,.026),H.p(i+.24,.82,.026),H.p(i+1.8+u,6.8,.026),H.p(i+1.52+u,6.8,.026)],'sun',.06+.17*u);}
  shutter(H,R,1.04,.43,1.1,.11);shutter(H,R,2.18,.45,1.1,.09);const hand=shutter(H,R,3.43,.48,1.54,a);handAt(H,hand);actor(H,R,4.1,.92,t,'barcelona-breakfast-catch',{shirt:['coral',.68]},0,1.65);
  actor(H,R,5.65,5.48,u*1.1,'sit',{shirt:['sun',.8],face:'se'},.4,1.35,'child');
  const p=H.p(10.98,.5,2.4);stroke(H,R,[[p[0],p[1]-20],[p[0]+Math.sin(t*Math.PI/9)*2,p[1]+22]],'coral',1.1);oval(H,R,p[0]+Math.sin(t*Math.PI/9)*2,p[1]+25,2.7,5,'sun');
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
