import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cornice, taskLight, floorShadow, caster } from '../joinery.js';

const duration=20;
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const base={x:0,y:0,drop:0,lean:6,head:12,al:54,ar:64,el:27,er:22,ll:-5,lr:5,kl:0,kr:0,roll:0};
FIGURES.clips.londonArchiveKeeper={dur:duration,keys:[[0,{...base}],[.2,{...base,ar:76,er:16}],[.4,{...base,ar:98,er:5}],[.6,{...base,ar:101,er:1,head:16}],[.9,{...base}],[1,{...base}]]};
FIGURES.clips.londonArchiveVisitor={dur:duration,keys:[[0,{...base,lean:0,head:2,al:22,ar:25,el:25,er:22}],[.42,{...base,lean:0,head:5,al:22,ar:25,el:25,er:22}],[.55,{...base,lean:0,head:16,al:22,ar:25,el:25,er:22}],[.8,{...base,lean:0,head:2,al:22,ar:25,el:25,er:22}],[1,{...base,lean:0,head:2,al:22,ar:25,el:25,er:22}]]};
function model(H,R,i,j,z,w,h,ink='paper',lean=false){
  timber(H,R,i,j,w,.48,z,.06,'sun');
  const P=(u,v)=>H.p(i+u,j+.35,z+v);
  shape(H,R,[P(0,.06),P(0,h),P(w*.5,h+.29),P(w,h),P(w,.06)],ink,ink==='paper'?1:.56,.6);
  for(const a of[.2,.63])for(const zz of[.23,.62])if(zz+.14<h)shape(H,R,[P(w*a,zz),P(w*a+w*.14,zz),P(w*a+w*.14,zz+.17),P(w*a,zz+.17)],'blue',.53,.4);
  shape(H,R,[P(w*.38,.06),P(w*.6,.06),P(w*.6,.36),P(w*.38,.36)],'coral',.57,.4);
  const q=P(w*.72,h+.14);shape(H,R,[[q[0],q[1]],[q[0]+4,q[1]+2],[q[0]+4+(lean?2:0),q[1]-10],[q[0]+(lean?2:0),q[1]-12]],'blue',.67,.4);
}
function mapPanel(H,R,P,w,d,repair=false){
  const points=[P(0,0),P(w,0),P(w,d),P(0,d)];shape(H,R,points,'paper',1,.8);
  for(let u=.12;u<w;u+=.42)for(let v=.13;v<d-.1;v+=.43){const ww=Math.min(.27,w-u-.035),dd=Math.min(.25,d-v-.035);if(ww>0&&dd>0)shape(H,R,[P(u,v),P(u+ww,v),P(u+ww,v+dd),P(u,v+dd)],(Math.floor(u*7+v*4)%3===0)?'coral':'sun',.24,.35);}
  stroke(H,R,[P(0,d*.62),P(w*.28,d*.48),P(w*.59,d*.72),P(w,d*.54)],'teal',5,.53);
  H.line(R,[P(w*.32,0),P(w*.57,d)],'blue',.7,{tone:.6});
  if(repair){const pts=[P(w*.4,d*.39),P(w*.54,d*.45),P(w*.45,d*.71),P(w*.31,d*.65)];shape(H,R,pts,'paper',1,.5);for(let n=0;n<4;n++)H.line(R,[P(w*(.36+n*.045),d*.46),P(w*(.4+n*.035),d*.63)],'coral',.55);}
}
function reachPose(H, name, pose, i, j, z, scale, face, targets) {
  const origin=H.p(i,j,z), mirror=face==='sw'||face==='nw'?-1:1, a=pose.lean*Math.PI/180;
  for(const [side,target] of Object.entries(targets)){
    const sign=side==='l'?-1:1, sx=-Math.sin(a)*15+sign*5.2*Math.cos(a)-1.5*Math.sin(a), sy=pose.drop*19-19-Math.cos(a)*15+sign*5.2*Math.sin(a)+1.5*Math.cos(a);
    const dx=(target[0]-origin[0])/scale*mirror-sx,dy=(target[1]-origin[1])/scale-sy,L=4.368,M=4.2,d=Math.min(L+M-.001,Math.max(.01,Math.hypot(dx,dy))),bend=Math.acos(Math.max(-1,Math.min(1,(d*d-L*L-M*M)/(2*L*M))));
    pose['a'+side]=(Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(L*L+d*d-M*M)/(2*L*d)))))*180/Math.PI;
    pose['e'+side]=bend*180/Math.PI;
  }
  FIGURES.clips[name]={dur:duration,keys:[[0,pose],[1,pose]]};
}

const room=world('london-archive-box','A street in a shallow drawer',{wall:'paper',wallTone:1,height:3.65,floor:'teal',tone:.1,pattern:'tiles',head:32},(H,R)=>{
  for(const side of['ne','nw'])cornice(H,R,side,.08,11.9,3.58,'sun');
  windowBay(H,R,'nw',1.2,5.4,2.38,1.02,{divisions:4,view:P=>{shape(H,R,[P(.15,.13),P(5.24,.13),P(5.24,.35),P(.15,.7)],'sun',.17,.4);}});
  cabinetFrame(H,R,6.95,.36,4.7,1.72,0,3.4,3,'sun',(i,j,w,d,z,h,n)=>{
    for(const zz of[.5,1.25,2.06,2.83])timber(H,R,i,j,w,d,zz,.09,'sun');
    for(let k=0;k<2;k++){metal(H,R,i+.04+k*.7,j+.04,.62,d-.08,.61,.49,n===1?'coral':'teal');H.line(R,[H.p(i+.18+k*.7,j+d,.89),H.p(i+.53+k*.7,j+d,.89)],'paper',2.8);}
    if(n===0){for(let k=0;k<5;k++){const[x,y]=H.p(i+.13+k*.25,j+.7,1.47);oval(H,R,x,y,5,9,'paper',1);oval(H,R,x,y,2,4,'blue',.7);H.line(R,[[x,y+9],[x,y+23]],'coral',.6);}drape(H,R,i+.05,j,w-.1,d,2.16,.22,'paper');}
    if(n===1){for(let k=0;k<4;k++){metal(H,R,i+.05,j,w-.1,d,1.4+k*.12,.11,'teal');H.line(R,[H.p(i+.5,j+d,1.45+k*.12),H.p(i+.8,j+d,1.45+k*.12)],'sun',1.4);}model(H,R,i+.15,j+.4,2.17,w-.3,.48);}
    if(n===2){for(let k=0;k<3;k++)shape(H,R,H.faceJ(i+.15+k*.35,j+.15,d-.2,1.43,1.88),'paper',1,.6);model(H,R,i+.1,j+.4,2.17,w-.23,.47,'coral',true);}
    for(let k=0;k<2;k++)metal(H,R,i+.06+k*.7,j+.03,.62,d-.06,2.94,.24,'paper');
  });
  timber(H,R,.22,7.1,.63,3.8,1.95,.12,'sun');
  for(let n=0;n<3;n++){const P=(u,z)=>H.p(.22,7.3+n*1.17+u,z);shape(H,R,[P(0,2.08),P(.93,2.08),P(.93,2.8),P(0,2.8)],'sun',.36,.6);shape(H,R,[P(.08,2.15),P(.85,2.15),P(.85,2.72),P(.08,2.72)],'paper',1,.5);stroke(H,R,[P(.13,2.28),P(.31,2.49),P(.5,2.41),P(.64,2.58),P(.8,2.35)],'blue',1.1);}
  shape(H,R,[H.p(.16,8.44,1.21),H.p(.16,9.38,1.21),H.p(.16,9.38,1.84),H.p(.16,8.44,1.84)],'sun',.11,.3);
  timber(H,R,.55,.38,5.65,1.25,.27,.13,'teal');
  for(const i of[1,2,3,4,5])model(H,R,i,.58,.4,.83,.65+(i%2)*.28,i%2?'paper':'coral',i===3);
  floorShadow(H,2.15,3.05,6.8,4.7,.21);
  timber(H,R,2.15,3.05,6.7,2.25,.08,.23,'sun');
  for(const i of[2.15,8.62])timber(H,R,i,3.05,.23,2.25,.29,.99,'sun');
  for(let n=0;n<4;n++){const z=.35+n*.19;metal(H,R,2.42,3.15,6.1,2.13,z,.16,'sun');for(const i of[3.7,6.72]){const[x,y]=H.p(i,5.3,z+.07);H.line(R,[[x-9,y],[x+9,y]],'blue',2.4);H.line(R,[[x-7,y],[x+7,y]],'paper',.75);}}
  timber(H,R,2.1,3.02,6.8,2.35,1.28,.17,'sun');
  for(const i of[2.5,8.3]){metal(H,R,i,4.52,.1,3.03,.9,.08,'blue');H.line(R,[H.p(i,4.65,1),H.p(i,7.39,1)],'paper',1.3);}
  timber(H,R,2.34,4.55,6.32,3.0,.99,.13,'sun');
  shape(H,R,H.tile(2.51,4.69,5.98,2.64,1.14),'blue',.49,.7);shape(H,R,H.tile(2.6,4.79,5.8,2.4,1.155),'paper',1,.6);
  for(const i of[2.34,8.47])timber(H,R,i,4.55,.19,3.0,1.12,.17,'sun');timber(H,R,2.34,7.4,6.32,.18,1.07,.27,'sun');
  for(const i of[3.45,6.96]){const[x,y]=H.p(i,7.59,1.2);stroke(H,R,[[x-12,y],[x-12,y+7],[x+11,y+7],[x+11,y]],'blue',2.2);H.line(R,[[x-9,y+7],[x+8,y+7]],'coral',2.7);}
  shape(H,R,H.tile(3.1,5.02,4.7,1.7,1.18),'teal',.18,.6);H.line(R,[H.p(5.24,5.04,1.22),H.p(5.24,6.71,1.22)],'sun',4.3);
  mapPanel(H,R,(u,v)=>H.p(3.1+u,5.03+v,1.24),2.14,1.62,true);
  for(const [i,j]of[[3.28,5.15],[4.46,6.49]]){oval(H,R,...H.p(i,j,1.29),8,3.8,'blue',.75);H.line(R,[H.p(i-.1,j,1.3),H.p(i+.09,j,1.3)],'paper',.65);}
  model(H,R,3.15,3.35,1.47,1.1,.59);model(H,R,4.38,3.35,1.47,.86,.87,'coral',true);model(H,R,5.42,3.35,1.47,1.2,.64);
  for(let n=0;n<3;n++){shape(H,R,H.tile(6.99,3.56+n*.24,.85,.63,1.48+n*.025),'paper',1,.5);H.line(R,[H.p(7.12,3.62+n*.24,1.5+n*.025),H.p(7.68,3.98+n*.24,1.5+n*.025)],'teal',1.2);}
  taskLight(H,R,2.55,3.38,1.46,'coral',.62);
  benchFrame(H,R,.72,9.1,3.2,1.7,.64,'teal');
  timber(H,R,.91,9.32,.68,.52,.66,.22,'coral');for(let n=0;n<3;n++)H.line(R,[H.p(1.0,9.4,.9),H.p(1.5,9.4+n*.1,.9)],'paper',.6);
  metal(H,R,1.94,9.42,.54,.7,.67,.12,'blue');metal(H,R,2.11,9.42,.19,.7,.79,.29,'teal');metal(H,R,1.94,9.42,.54,.7,1.08,.09,'blue');
  shape(H,R,H.tile(2.83,9.31,.66,.76,.68),'paper',1,.6);shape(H,R,H.tile(2.93,9.41,.45,.53,.7),'blue',.2,.5);
  model(H,R,3.1,10.12,.69,.46,.42);
  for(const [i,j]of[[10,6.9],[11.4,6.9],[10,8.5],[11.4,8.5]])caster(H,R,i,j);
  for(const z of[.35,1.12])metal(H,R,9.85,6.72,1.74,1.95,z,.08,'teal');for(const i of[9.9,11.47])metal(H,R,i,6.75,.07,1.89,.34,1.17,'teal');
  for(let n=0;n<5;n++)shape(H,R,H.tile(10.0+n*.015,6.9+n*.018,1.43,1.55,1.21+n*.035),'paper',1,.5);
  drape(H,R,10.05,6.97,1.35,1.39,1.43,.12,'paper');H.line(R,[H.p(10.5,7,1.45),H.p(10.5,8.3,1.45)],'coral',1.3);
  for(let n=0;n<3;n++)shape(H,R,H.tile(10.07+n*.37,7.07,.23,.23,.45),'sun',.6,.5);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,unfold=ease(4,8,t)*(1-ease(12,18,t)),angle=Math.PI*(1-unfold);
  mapPanel(H,R,(u,v)=>H.p(5.24+u*Math.cos(angle),5.03+v,1.26+u*Math.sin(angle)),2.1,1.62,true);
  const edge=H.p(5.24+.24*Math.cos(angle),6.49,1.26+.24*Math.sin(angle));
  reachPose(H,'londonArchiveContact',FIGURES.sample('londonArchiveKeeper',t/duration),6.08,7.75,0,2.15,'se',{r:edge,l:H.p(4.98,6.55,1.29)});
  actor(H,R,6.08,7.75,t,'londonArchiveContact',{shirt:['teal',.67],pants:['blue',.74],skin:['coral',.3],hairStyle:'bun',glasses:true},0,2.15);
  actor(H,R,8.8,8.4,t,'londonArchiveVisitor',{face:'sw',shirt:['coral',.67],pants:['blue',.7],skin:['coral',.65],hairStyle:'short'},0,1.8);
  const sway=.03*Math.sin(TAU*t/duration);shape(H,R,[H.p(7.1,4.28,1.53),H.p(7.89,4.28,1.53),H.p(7.89,4.62,1.55+sway),H.p(7.1,4.62,1.54+sway)],'paper',1,.45);
  drape(H,R,10.7,.64,.54,1.29,2.95,.2+sway,'paper');
});
room.loopSeconds=duration;
room.stillTime=10;
export default room;
