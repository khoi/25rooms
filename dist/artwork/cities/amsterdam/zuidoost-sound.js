import { world, box, shape, oval, stroke, actor, cycle, wallPt, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, drape, benchFrame, bentTube, vessel } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame, wallRack, taskLight, floorShadow } from '../joinery.js';

const base={...FIGURES.clips.idle.keys[0][1]},producer={...base};
FIGURES.clips['amsterdam-sound-producer']={dur:18,keys:[[0,producer],[1,producer]]};
FIGURES.clips['amsterdam-sound-friend']={dur:18,keys:[[0,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:42,ar:22,el:71,er:71,head:0}],[.45,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:42,ar:22,el:71,er:71,head:0}],[.57,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:42,ar:22,el:71,er:71,head:16}],[.66,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:42,ar:22,el:71,er:71,head:-4}],[1,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:42,ar:22,el:71,er:71,head:0}]]};
const smooth=(a,b,t)=>{const f=Math.max(0,Math.min(1,(t-a)/(b-a)));return f*f*(3-2*f)};
function seat(H,R,i,j,ink){
 for(const x of [i,i+1.3])for(const y of [j,j+1.1])metal(H,R,x,y,.11,.11,.03,.58,'blue');
 box(H,R,i-.08,j-.08,1.53,1.39,.59,.19,ink,.6);
 drape(H,R,i-.04,j-.03,1.44,1.29,.8,.12,'paper');
 box(H,R,i-.08,j-.06,1.53,.2,.8,.86,ink,.63);
 for(const x of [i-.07,i+1.34]){metal(H,R,x,j+.17,.12,.7,.76,.37,'blue');drape(H,R,x-.04,j+.17,.21,.71,1.15,.1,ink)}
}
function speaker(H,R,i,j,z,small=false){
 const w=small?.85:1.06,h=small?1.14:1.5;
 shape(H,R,H.tile(i-.04,j-.05,w+.1,.86,z),'blue',.55);
 shape(H,R,[H.p(i-.04,j-.05,z),H.p(i+w+.06,j-.05,z),H.p(i+w+.06,j+.81,z+.15),H.p(i-.04,j+.81,z+.15)],'paper',1);
 box(H,R,i,j,w,.78,z+.1,h,'blue',.78);
 for(const [zz,r] of [[z+.47,13],[z+1.08,6]]){
  const p=H.p(i+w*.5,j+.8,zz);oval(H,R,...p,r,r,'paper',.82);oval(H,R,...p,r*.72,r*.72,'teal',.65);oval(H,R,...p,r*.27,r*.27,'blue',.9);
 }
 for(const x of [i+.1,i+w-.1])for(const zz of [z+.2,z+h])H.dot(...H.p(x,j+.82,zz),1.1,'sun');
}
function controls(H,R){
 const i=3.88,j=4.44,z=1.33;
 metal(H,R,i,j,3.57,1.62,z,.12,'blue');
 for(let n=0;n<9;n++){
  const x=i+.24+n*.36;
  H.line(R,[H.p(x,j+.69,z+.14),H.p(x,j+1.42,z+.14)],'paper',1.2);
  H.line(R,[H.p(x+.08,j+.69,z+.14),H.p(x+.08,j+1.42,z+.14)],'teal',.6);
  if(n!==5)metal(H,R,x-.09,j+.9+(n%3)*.11,.23,.11,z+.16,.06,'paper');
  for(let q=0;q<2;q++)oval(H,R,...H.p(x,j+.2+q*.22,z+.17),3,2.2,q?'sun':'teal',.8);
 }
 shape(H,R,H.tile(6.96,4.55,.34,.78,1.49),'teal',.9);
 for(let n=0;n<4;n++)H.line(R,[H.p(7,4.62+n*.16,1.5),H.p(7.24,4.62+n*.16,1.5)],n<3?'sun':'coral',1.2);
}
const room=world('amsterdam-zuidoost-sound','A room inside the headphones',{floor:'sun',tone:.1,wall:'paper',wallTone:.75,height:3.75,pattern:'boards',head:50},(H,R)=>{
 for(const side of ['nw','ne'])for(let n=0;n<5;n++){
  const a=.45+n*1.42,P=(u,z,d=.16)=>wallPt(H,side,a+u,z,-d);
  shape(H,R,[P(0,.48),P(1.12,.48),P(1.12,3.42),P(0,3.42)],n%2?'teal':'blue',n%2?.33:.54);
  shape(H,R,[P(.09,.57,.23),P(1.03,.57,.23),P(1.03,3.33,.23),P(.09,3.33,.23)],'paper',.87);
  for(let z=.7;z<3.2;z+=.38)H.line(R,[P(.17,z,.25),P(.95,z+.02,.25)],'sun',.6,{tone:.7});
 }
 windowBay(H,R,'ne',8.13,3.12,1.97,1.46,{divisions:2,ink:'teal',view:P=>{shape(H,R,[P(.15,.15),P(3,.15),P(3,.58),P(.15,.72)],'teal',.24);for(let k=0;k<3;k++)shape(H,R,[P(.27+k*.83,.22),P(.9+k*.83,.22),P(.9+k*.83,.9),P(.27+k*.83,.9)],'paper',1)}});
 timber(H,R,8,.18,.16,.28,1.8,1.8,'sun');
 floorShadow(H,3.25,3.48,4.9,3.1,.22);
 for(const x of [3.3,7.5]){
  metal(H,R,x,3.55,.19,2.9,0,1.19,'blue');
  timber(H,R,x-.18,3.4,.58,3.22,1.12,.17,'sun');
  bentTube(H,R,[[x,3.65,.25],[x+.1,6.17,.25],[x+.1,6.17,1.08]],2,'teal');
 }
 timber(H,R,3.16,3.44,4.9,2.85,1.24,.13,'sun');
 shape(H,R,H.tile(3.38,3.65,4.45,2.33,1.39),'paper',.95);
 controls(H,R);
 speaker(H,R,3.31,3.58,1.41,true);
 speaker(H,R,6.89,3.56,1.41,true);
 timber(H,R,4.12,6.19,3.12,.65,.98,.09,'sun');
 metal(H,R,4.25,6.23,2.88,.56,1.08,.09,'blue');
 for(let n=0;n<17;n++){
  shape(H,R,H.tile(4.32+n*.157,6.32,.145,.4,1.18),'paper',1);
  if(![2,6].includes(n%7))shape(H,R,H.tile(4.42+n*.157,6.3,.06,.22,1.2),'blue',.9);
 }
 metal(H,R,3.69,4.2,3.9,.64,.79,.15,'teal');
 for(let n=0;n<4;n++)stroke(H,R,[H.p(4.05+n*.53,4.16,1.24),H.p(4.05+n*.53,4.25,.68),H.p(5.84,4.47,.7),H.p(6.84,4.5,.25)],n%2?'coral':'blue',1.3);
 drape(H,R,6.64,4.43,.18,.36,.73,.14,'paper');
 seat(H,R,5.46,6.3,'teal');
 seat(H,R,8.55,5.75,'coral');
 taskLight(H,R,7.6,5.85,1.4,'coral',-.75);
 const mi=2.43,mj=5.25;
 for(const [x,y] of [[-.47,.21],[.3,.3],[0,-.4]])bentTube(H,R,[[mi,mj,.18],[mi+x,mj+y,.03]],2,'blue');
 bentTube(H,R,[[mi,mj,.16],[mi,mj,2.25],[mi+.73,mj+.18,2.63],[mi+1.17,mj+.28,2.21]],2.2,'teal');
 oval(H,R,...H.p(mi+.72,mj+.18,2.63),4,3,'coral',.8);
 metal(H,R,mi+1.03,mj+.19,.3,.19,1.87,.43,'blue');
 stroke(H,R,[H.p(mi+1.18,mj+.29,1.89),H.p(mi+1.3,mj+.3,1.52),H.p(mi,mj,.12),H.p(3.66,4.5,.11)],'blue',1.1);
 cabinetFrame(H,R,.16,8.05,2.0,2.1,.06,2.86,2,'sun',(i,j,w,d,z,h,n)=>{
  for(const zz of [z+.87,z+1.8])timber(H,R,i,j,w,d,zz,.09,'sun');
  if(n===0){box(H,R,i+.08,j+.17,w-.18,1.52,z,.76,'blue',.65);shape(H,R,H.faceI(i+.18,j+1.7,w-.38,z+.13,z+.63),'paper',.25);for(let k=0;k<4;k++)box(H,R,i+.08+k*.17,j+.18,.1,1.5,z+.99,.56,['teal','paper','coral','paper'][k],.6)}
  else{box(H,R,i+.07,j+.16,w-.14,1.55,z+.07,.47,'coral',.4);box(H,R,i+.08,j+.2,w-.16,1.45,z+1.98,.53,'paper',1);oval(H,R,...H.p(i+w*.5,j+1.66,z+2.2),7,7,'blue',.6)}
 });
 recessedFrame(H,R,'nw',9.22,1.56,3.01,.57,'coral',P=>{shape(H,R,[P(.2,.12),P(1.35,.12),P(1.1,.45),P(.5,.3)],'teal',.4);H.dot(...P(.85,.32),4,'sun')});
 benchFrame(H,R,5.7,9.35,2.45,1.45,.53,'sun');
 for(let n=0;n<5;n++)timber(H,R,5.91+n*.38,9.72,.19,.58,.55,.13+Math.sin(n)*.09,'teal');
 shape(H,R,H.tile(6.06,10.14,.62,.45,.57),'paper',1);
 oval(H,R,...H.p(6.43,10.33,.59),3,2,'blue',.8);
 oval(H,R,...H.p(7.52,9.63,.57),9,6,'paper',.8);
 oval(H,R,...H.p(7.52,9.63,.58),5,3,'blue',.7);
 box(H,R,10.35,4.45,1.02,1.22,0,.7,'sun',.35);
 vessel(H,R,10.82,4.92,.73,8,22,'paper',true);
 box(H,R,10.65,5.17,.47,.36,.73,.22,'teal',.6);
 drape(H,R,8.58,5.72,.61,.27,1.67,.58,'paper');
},(H,R,t)=>{
 const u=cycle(t,18)*18,shift=.43*smooth(3.6,6,u)*(1-smooth(7.2,9,u)),lift=smooth(8.7,10.8,u)*(1-smooth(11.8,15,u));
 const fader=[5.92,5.98-shift,1.55];
 metal(H,R,fader[0]-.08,fader[1],.24,.12,1.48,.08,'coral');
 Object.assign(producer,base,{drop:.47,ll:84,lr:80,kl:-84,kr:-80,head:lift*12,al:40,el:70});
 const origin=H.p(6.13,6.65,.2),target=H.p(...fader),dx=(target[0]-origin[0])/2-5.2,dy=(target[1]-origin[1])/2+32.5-.47*19;
 const d=Math.min(8.54,Math.max(.2,Math.hypot(dx,dy))),a=4.368,b=4.2;
 producer.ar=(Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(a*a+d*d-b*b)/(2*a*d)))))*180/Math.PI;
 producer.er=180-Math.acos(Math.max(-1,Math.min(1,(a*a+b*b-d*d)/(2*a*b))))*180/Math.PI;
 producer.al=mix(40,-145,lift);producer.el=mix(70,10,lift);
 actor(H,R,6.13,6.65,u,'amsterdam-sound-producer',{face:'se',shirt:['coral',.66],skin:['coral',.5],hairStyle:'curly',prop:(HH,RR,p)=>{
  const [x,y]=p.head;
  stroke(HH,RR,[[x-10,y+2],[x-10,y-11],[x,y-15],[x+11,y-10],[x+11,y+1]],'blue',3.8);
  oval(HH,RR,x+11,y+2,4.8,8,'paper',1);
  const cx=x-10-lift*8,cy=y+2-lift*5;
  oval(HH,RR,cx,cy,5,8,'blue',.8);oval(HH,RR,cx,cy,2.6,5.3,'paper',.85);
  stroke(HH,RR,[[cx,cy+7],[cx-4,cy+26],[x+10,y+40],HH.p(6.8,6.2,.9)],'blue',1.15);
 }},.2,2);
 actor(H,R,9.19,6.4,u,'amsterdam-sound-friend',{face:'sw',shirt:['teal',.55],skin:['coral',.3],hairStyle:'pony'},0,1.7);
 const P=(u,z)=>wallPt(H,'ne',11.25+u,z,-.26),s=.045*Math.sin(u*Math.PI/9);
 shape(H,R,[P(0,3.52),P(.53,3.52),P(.58+s,1.66),P(.09+s,1.55)],'coral',.34);
 for(let n=0;n<4;n++)H.line(R,[P(.08+n*.11,3.44),P(.12+n*.11+s,1.65)],'paper',1.1);
});
room.loopSeconds=18;
room.stillTime=10.8;
export default room;
