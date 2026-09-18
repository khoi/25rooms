import { world, shape, oval, stroke, actor, bottle, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, benchFrame, drape, slattedSeat, cushion, branchSpray } from '../materials.js';
import { archedBay, cabinetFrame, basin } from '../structure.js';
import { cornice, wallRack, hangingRail, caster, specimen, taskLight } from '../joinery.js';

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
  shape(H,R,H.faceJ(.25,1.45,6.63,.08,.96),'blue',.65);
  for(const j of[1.45,3.1,4.8,6.5,8])timber(H,R,.25,j,1.16,.12,.06,.9,'teal');
  timber(H,R,.25,1.45,1.16,6.7,.07,.11,'teal');
  for(const j of[1.61,3.26,6.66]){
    shape(H,R,H.faceJ(1.44,j,1.4,.18,.85),'teal',.43);
    shape(H,R,H.faceJ(1.46,j+.1,1.2,.28,.75),'teal',.2);
    H.line(R,[H.p(1.49,j+.8,.63),H.p(1.49,j+1.12,.63)],'sun',2.5);
    for(const y of[j+.1,j+1.22])metal(H,R,1.42,y,.07,.12,.34,.16,'sun');
  }
  timber(H,R,.35,4.96,.98,1.4,.43,.08,'sun');
  for(let n=0;n<3;n++){plate(H,R,.88,5.36,.56+n*.065,9);}
  vessel(H,R,.83,6.07,.2,7,12,'coral');
  timber(H,R,.23,1.4,1.24,6.8,.92,.15,'sun');
  timber(H,R,.37,2.22,.98,.69,1.08,.37,'teal');
  const bin=H.p(.87,2.87,1.4);stroke(H,R,[[bin[0]-12,bin[1]],[bin[0],bin[1]-4],[bin[0]+12,bin[1]]],'paper',1.2);H.line(R,[[bin[0]-4,bin[1]-1],[bin[0]+4,bin[1]-1]],'sun',2);
  const coffee=H.p(.86,4.38,1.08);shape(H,R,[[coffee[0]-8,coffee[1]],[coffee[0]+8,coffee[1]],[coffee[0]+10,coffee[1]-11],[coffee[0]+6,coffee[1]-18],[coffee[0]-6,coffee[1]-18],[coffee[0]-10,coffee[1]-11]],'paper',1);shape(H,R,[[coffee[0]-7,coffee[1]-18],[coffee[0]+7,coffee[1]-18],[coffee[0]+6,coffee[1]-29],[coffee[0]-6,coffee[1]-29]],'teal',.56);stroke(H,R,[[coffee[0]+7,coffee[1]-26],[coffee[0]+16,coffee[1]-25],[coffee[0]+14,coffee[1]-14],[coffee[0]+9,coffee[1]-13]],'blue',2);H.line(R,[[coffee[0]-6,coffee[1]-29],[coffee[0]+6,coffee[1]-29]],'sun',2);H.dot(coffee[0],coffee[1]-32,2,'blue');
  taskLight(H,R,.59,7.73,1.08,'coral',.55);
  bentTube(H,R,[[.22,7.8,1.11],[.22,8.55,1.11],[.22,8.55,1.55]],1.1,'blue');metal(H,R,.15,8.4,.14,.35,1.46,.3,'paper');for(const j of[8.5,8.66])H.dot(...H.p(.32,j,1.63),1.2,'blue');
  for(const j of[2.45,3.67]){const P=(u,z)=>H.p(.32,j+u,z);shape(H,R,[P(0,3.57),P(.84,3.57),P(.84,3.99),P(0,3.99)],'sun',.63);shape(H,R,[P(.08,3.63),P(.76,3.63),P(.76,3.93),P(.08,3.93)],'paper',1);for(const u of[.27,.56]){oval(H,R,...P(u,3.82),2.7,3.1,'blue',.7);oval(H,R,...P(u,3.71),4,3,'teal',.65);}}
  metal(H,R,.18,5.1,.48,1.13,3.57,.48,'teal');for(let j=5.2;j<5.92;j+=.12)H.line(R,[H.p(.69,j,3.67),H.p(.69,j,3.94)],'paper',.75);oval(H,R,...H.p(.72,6.02,3.79),3,3,'sun');
  basin(H,R,.34,5.6,.84,1.5,1.09,'paper');
  drape(H,R,.38,7.24,.74,.58,1.09,.48,'coral');
  metal(H,R,.22,1.42,1.1,.24,1.09,.56,'teal');
  for(let j=1.5;j<2.8;j+=.19)H.line(R,[H.p(.6,j,1.1),H.p(.6,j,1.61)],'blue',1);
  plate(H,R,.76,3.16,1.13,11);bottle(H,R,...H.p(.71,3.74,1.12),'teal',.55);
  H.tint(H.tile(5.36,2.96,4.43,1.83,.02),'blue',.2);
  for(const i of[5.4,9.18])for(const j of[2.88,4.22]){shape(H,R,[H.p(i,j,.04),H.p(i+.17,j,.04),H.p(i+.25,j,1.02),H.p(i-.05,j,1.02)],'sun',.6);timber(H,R,i-.04,j,.26,.18,.84,.19,'teal');}
  timber(H,R,5.37,2.88,3.98,.15,.75,.3,'sun');timber(H,R,5.37,4.21,3.98,.16,.75,.3,'sun');
  timber(H,R,5.48,3.48,3.7,.17,.28,.14,'teal');
  for(const i of[5.45,9.16])bentTube(H,R,[[i,3.53,.33],[i,3.53,.86]],3,'sun');
  timber(H,R,5.24,2.74,4.25,1.8,1.01,.14,'sun');
  timber(H,R,7.64,4.16,1.39,.69,.77,.07,'sun');shape(H,R,H.tile(7.75,4.26,1.15,.48,.86),'blue',.52);
  for(const i of[7.89,8.19,8.49]){H.line(R,[H.p(i,4.32,.88),H.p(i,4.64,.88)],'paper',1.4);oval(H,R,...H.p(i,4.32,.88),2,1.2,'paper');}
  shape(H,R,H.faceI(7.6,4.87,1.49,.75,1),'teal',.5);H.line(R,[H.p(8.06,4.9,.89),H.p(8.62,4.9,.89)],'sun',2.5);
  drape(H,R,6.15,2.77,1.44,1.75,1.12,.48,'paper');
  timber(H,R,5.5,3.1,1.1,.81,1.14,.07,'sun');
  const stain=H.p(6.06,3.47,1.22);oval(H,R,...stain,5,3,'coral',.45);stroke(H,R,[[stain[0]-4,stain[1]-3],[stain[0],stain[1]-5],[stain[0]+4,stain[1]-2]],'teal',.7);
  for(const [i,j]of[[7,3.25],[8.54,3.85]])plate(H,R,i,j,1.15,13);
  for(const [i,j]of[[5.82,3.26],[6.05,3.48]])oval(H,R,...H.p(i,j,1.29),6,3.6,'sun',.66);
  vessel(H,R,8.75,3.04,1.14,10,9,'paper');for(const [i,j]of[[8.6,3],[8.86,3],[8.75,3.23]])oval(H,R,...H.p(i,j,1.45),4,3.7,'coral',.8);
  bottle(H,R,...H.p(7.7,3.12,1.15),'teal',.6);vessel(H,R,7.68,4.05,1.16,4.5,7,'sun');
  const knife=H.p(6.29,3.81,1.27);shape(H,R,[[knife[0]-14,knife[1]-4],[knife[0]+2,knife[1]+4],[knife[0]+5,knife[1]+1],[knife[0]-10,knife[1]-7]],'paper',1);stroke(H,R,[[knife[0]+3,knife[1]+2],[knife[0]+11,knife[1]+6]],'teal',3.2);
  for(const [i,j]of[[6.94,3.34],[8.46,3.79]]){const p=H.p(i,j,1.21);shape(H,R,[[p[0]-8,p[1]+2],[p[0]+3,p[1]+6],[p[0]+10,p[1]-1],[p[0]-2,p[1]-5]],'sun',.78);H.line(R,[[p[0]-4,p[1]],[p[0]+3,p[1]+2]],'coral',2);}
  for(const [i,j]of[[7.13,3.79],[8.96,3.66]]){const p=H.p(i,j,1.18);H.line(R,[[p[0]-7,p[1]-4],[p[0]+7,p[1]+3]],'blue',1);for(let n=0;n<3;n++)H.line(R,[[p[0]-9+n*2,p[1]-7+n],[p[0]-6+n*2,p[1]-3+n]],'blue',.7);}
  const nap=H.p(8.3,2.92,1.16);shape(H,R,[[nap[0]-7,nap[1]-3],[nap[0]+8,nap[1]-6],[nap[0]+12,nap[1]+1],[nap[0]-3,nap[1]+5]],'coral',.36);
  slattedSeat(H,R,7.1,5.28,1.4,0,'sun');timber(H,R,7.26,5.85,1.04,.13,.25,.11,'teal');
  slattedSeat(H,R,5.13,5.05,1.05,.25,'coral');for(const i of[5.2,5.96])timber(H,R,i,5.08,.2,.64,0,.27,'sun');
  benchFrame(H,R,.8,9.11,3.3,1.03,.62,'teal');
  for(const [i,j,r,h]of[[1.14,9.6,11,17],[2.3,9.6,9,14],[3.5,9.6,8,12]]){vessel(H,R,i,j,.64,r,h,'coral');branchSpray(H,R,...H.p(i,j,1.18),.8,'teal',i<2?1:-1);}
  bentTube(H,R,[[1.08,9.35,1],[1.08,9.35,2.02],[3.4,9.35,2.02],[3.4,9.35,1]],1.6,'sun');for(let i=1.3;i<3.3;i+=.5)bentTube(H,R,[[i,9.35,1.1],[i,9.35,2]],1,'teal');
  vessel(H,R,3.86,8.55,0,10,14,'teal');const sp=H.p(3.9,8.55,.36);stroke(H,R,[[sp[0]+8,sp[1]],[sp[0]+19,sp[1]-8],[sp[0]+24,sp[1]-7]],'teal',5);
  cabinetFrame(H,R,5.45,9.53,3.84,1.33,.04,.93,3,'teal',(i,j,w,d,z,h,n)=>{if(n===0){for(let k=0;k<4;k++){timber(H,R,i+.08+k*.22,j+.05,.16,.72,z,.48+k%2*.09,['coral','paper','sun','teal'][k]);}}else if(n===1){cushion(H,R,i+.06,j+.12,w-.12,.75,z+.02,.16,'paper');cushion(H,R,i+.06,j+.12,w-.12,.75,z+.19,.16,'coral');}else{const p=H.p(i+.45,j+.6,z+.22);shape(H,R,[[p[0]-11,p[1]-12],[p[0]+11,p[1]-12],[p[0]+9,p[1]+8],[p[0]-9,p[1]+8]],'sun',.56);stroke(H,R,[[p[0]-6,p[1]-12],[p[0]-4,p[1]-21],[p[0]+4,p[1]-21],[p[0]+6,p[1]-12]],'blue',1.5);}});
  cushion(H,R,5.61,9.62,2.09,1.12,1.01,.15,'paper');
  shape(H,R,H.tile(8.05,9.73,.99,.77,1.04),'coral',.5);shape(H,R,H.tile(8.09,9.69,.85,.7,1.065),'paper',1);H.line(R,[H.p(8.17,9.78,1.08),H.p(8.61,10.13,1.08)],'teal',2.4);
  hangingRail(H,R,'nw',8.7,2.37,2.86,3,(P,u,n)=>{const p=P(u,-.42);if(n===0){stroke(H,R,[P(u,-.13),P(u+.19,-.38),P(u+.12,-.63)],'sun',2.2);oval(H,R,...P(u+.12,-.63),3,3,'blue');}else if(n===1){shape(H,R,[P(u-.32,-.13),P(u+.32,-.13),P(u+.39,-1.11),P(u-.36,-1.11)],'coral',.57);H.line(R,[P(u-.24,-.85),P(u+.28,-.85)],'sun',1.4);}else{stroke(H,R,[P(u,-.13),P(u,-1.45)],'blue',2.3);shape(H,R,[P(u-.22,-.91),P(u+.22,-.91),P(u+.11,-1.4),P(u-.1,-1.4)],'teal',.62);}});
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
