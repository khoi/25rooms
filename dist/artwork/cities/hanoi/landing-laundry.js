import { world, shape, oval, stroke, box, actor, ell } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, cushion, vessel, drape } from '../materials.js';
import { basin, cabinetFrame } from '../structure.js';
import { wallCourse, windowBay, hangingRail, floorShadow } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const room=world('hanoi-landing-laundry','The sheet makes a wall',{floor:'paper',tone:.4,pattern:'tiles',wall:'teal',wallTone:.18,height:4.1,head:50},(H,R)=>{
  wallCourse(H,R,'nw',0,12,1.02,'blue');wallCourse(H,R,'ne',0,12,1.02,'blue');
  windowBay(H,R,'ne',3.75,3.65,2.02,1.72,{ink:'sun',divisions:3});
  H.tint([H.p(3.8,.3,.012),H.p(7.3,.3,.012),H.p(9.6,8.4,.012),H.p(5.7,8.4,.012)],'sun',.16);
  for(const j of[3.0,7.1,10.05]){metal(H,R,11.4,j,.14,.14,0,3.71-j*.24,'teal');}
  for(let n=0;n<10;n++){const j=9.15-n*.82,z=.06+n*.27;box(H,R,8.76,j,2.66,.9,z,.27,'blue',.2);timber(H,R,8.67,j-.025,2.83,.87,z+.25,.1,'sun');H.line(R,[H.p(8.69,j+.84,z+.36),H.p(11.47,j+.84,z+.36)],'paper',1.8);}
  bentTube(H,R,[[11.47,10.08,.94],[11.47,1.8,3.64],[11.47,.48,3.64]],3.5,'teal');
  for(const n of[0,3,6,9])bentTube(H,R,[[8.7,9.4-n*.82,.31+n*.27],[8.7,9.4-n*.82,1.08+n*.27]],2,'teal');
  bentTube(H,R,[[8.7,9.4,1.08],[8.7,2.0,3.51]],3,'teal');
  H.line(R,[H.p(8.7,6.06,2.17),H.p(8.7,5.58,2.34)],'paper',1.9);
  surface(H,R,[H.p(8.68,2.6,.04),H.p(8.68,9.5,.04),H.p(8.68,9.5,.4),H.p(8.68,2.6,2.66)],'blue',.34);
  cabinetFrame(H,R,5.94,.43,2.7,2.34,.08,1.6,2,'teal',(i,j,w,d,z,h,n)=>{
    if(n){for(const z0 of[.32,.85]){timber(H,R,i,j,w,d,z+z0,.08,'sun');for(let k=0;k<3;k++)cushion(H,R,i+.1,j+.4,w-.2,d-.55,z+z0+.1+k*.1,.08,k===1?'teal':'paper');}}
    else {vessel(H,R,i+.5,j+1,.2,13,23,'teal');stroke(H,R,[H.p(i+.5,j+1,.93),H.p(i+.6,j+.3,1.1),H.p(i+.94,j+.13,1.3)],'blue',1.3);}
  });
  for(let i=6.03;i<7.14;i+=.18)timber(H,R,i,2.7,.105,.08,.27,1.18,'teal');
  metal(H,R,6.91,2.77,.15,.08,.78,.21,'sun');
  basin(H,R,6.01,.49,2.52,1.67,1.7);
  bentTube(H,R,[[6.28,2.24,1.67],[6.28,2.24,.82],[5.77,2.24,.63],[5.77,2.94,.04]],2.5,'blue');
  metal(H,R,5.39,2.7,.84,.71,.035,.055,'blue');for(let n=0;n<5;n++)H.line(R,[H.p(5.5+n*.13,2.78,.1),H.p(5.5+n*.13,3.29,.1)],'paper',.65);
  surface(H,R,H.tile(7.66,.78,.54,.38,1.91),'coral',.55);metal(H,R,7.58,.72,.7,.5,1.91,.04,'paper');
  for(const i of[1.25,5.6]){metal(H,R,i,.58,.2,.3,2.78,.55,'teal');bentTube(H,R,[[i,.74,2.88],[i,3.85,2.88]],3,'blue');stroke(H,R,[H.p(i,.76,2.36),H.p(i,2.7,2.88)],'blue',2);}
  bentTube(H,R,[[1.23,3.86,2.88],[5.82,3.86,2.88]],3.3,'blue');
  metal(H,R,.14,4.67,3.8,.28,2.47,.18,'teal');
  for(const i of[.55,2.84]){metal(H,R,i,4.61,.28,.43,2.37,.35,'blue');H.dot(...H.p(i+.14,4.68,2.72),1.2,'sun');}
  const pulley=H.p(.49,4.68,2.87);oval(H,R,...pulley,9,9,'sun',.65);H.outline(R,ell(...pulley,5.4,5.4),'blue',1);H.dot(...pulley,1.6,'blue');
  stroke(H,R,[H.p(.49,4.68,2.89),H.p(.48,4.7,1.03),H.p(.59,4.7,.94),H.p(.55,4.7,2.89)],'sun',.9);
  bentTube(H,R,[[.36,4.55,1.35],[.36,4.82,1.15]],2,'blue');
  hangingRail(H,R,'nw',6.1,3.85,3.08,4,(P,u,n)=>{const [x,y]=P(u,-.18);if(n<2){surface(H,R,[[x-8,y+4],[x+8,y+4],[x+7,y+24],[x-8,y+25]],n?'teal':'paper',n?.28:1);H.line(R,[[x-6,y+21],[x+6,y+20]],'sun',.8);}else{stroke(H,R,[[x,y],[x-8,y+12],[x+8,y+12],[x,y]],'blue',1);}});
  floorShadow(H,1.07,7.47,3.32,2.45,.12);vessel(H,R,2.02,8.32,.04,25,21,'sun');for(let n=0;n<10;n++)H.line(R,[H.p(1.34+n*.14,8.88,.12),H.p(1.34+n*.14,8.88,.64)],'coral',.65);
  drape(H,R,1.58,8.12,1.08,.79,.74,.25,'paper');const sock=H.p(2.23,8.92,.73);surface(H,R,[[sock[0],sock[1]],[sock[0]+5,sock[1]],[sock[0]+5,sock[1]+10],[sock[0]+10,sock[1]+10],[sock[0]+10,sock[1]+14],[sock[0],sock[1]+14]],'coral',.43);
  metal(H,R,4.12,9.52,2.2,1.15,.06,.11,'teal');for(let n=0;n<7;n++)H.line(R,[H.p(4.27+n*.28,9.62,.18),H.p(4.27+n*.28,10.55,.18)],'blue',.6);
  for(const i of[4.48,5.4]){const p=H.p(i,10.05,.24);oval(H,R,...p,10,4,'sun',.6);stroke(H,R,[[p[0]-6,p[1]],[p[0],p[1]-6],[p[0]+6,p[1]]],'coral',2);}
  timber(H,R,4.5,9.7,1.43,.14,.19,.14,'sun');
  const brush=H.p(6.87,9.75,.03);surface(H,R,[[brush[0]-8,brush[1]-3],[brush[0]+8,brush[1]-3],[brush[0]+9,brush[1]+4],[brush[0]-8,brush[1]+4]],'sun',.6);for(let n=0;n<6;n++)H.line(R,[[brush[0]-6+n*2.5,brush[1]],[brush[0]-6+n*2.5,brush[1]+4]],'coral',.75);
  timber(H,R,.24,10.25,2.96,1.26,1.16,.15,'sun');for(const j of[10.4,11.35])stroke(H,R,[H.p(.3,j,.8),H.p(2.55,j,1.15)],'blue',1.8);
  vessel(H,R,1.0,10.76,1.33,10,6,'paper',false);vessel(H,R,2.16,10.71,1.33,9,10,'blue');stroke(H,R,[H.p(2.43,10.71,1.53),H.p(2.93,10.71,1.53)],'blue',2.5);
  H.outline(R,ell(...H.p(2.16,10.71,1.32),12,5),'teal',.6);
  vessel(H,R,.63,11.21,1.33,4,12,'teal');stroke(H,R,[H.p(.63,11.21,1.69),H.p(.62,11.21,2.12)],'teal',1);oval(H,R,...H.p(.6,11.21,2.13),4,3,'coral',.7);
  box(H,R,7.27,10.91,3.1,.42,.015,.04,'blue',.35);for(let n=0;n<12;n++)H.line(R,[H.p(7.4+n*.24,10.97,.065),H.p(7.4+n*.24,11.26,.065)],'paper',.65);
},(H,R,time)=>{
  const t=((time%18)+18)%18,u=ease(3.6,7.2,t)*(1-ease(10.8,16,t)),s=Math.sin(t*Math.PI*2/18)*.06;
  const fabric=[H.p(1.48,3.88,2.84),H.p(5.53,3.88,2.84),H.p(5.43,3.95+s,.95),H.p(4.18,4.08+s,.86),H.p(2.81,3.98+s,.94),H.p(1.49,3.93+s,1.02)];
  surface(H,R,fabric,'paper',1);H.clip(fabric,()=>{for(let i=1.65;i<5.5;i+=.29)stroke(H,R,[H.p(i,3.89,2.8),H.p(i-.03,4.03+s,1.97),H.p(i+.08,3.98+s,.95)],i%1>.5?'blue':'sun',.55,.26);});
  H.line(R,fabric.slice(2),'sun',1);surface(H,R,[H.p(4.53,3.97,1.23),H.p(5.02,3.97,1.23),H.p(5.02,3.97,1.58),H.p(4.53,3.97,1.58)],'coral',.14);
  for(const [n,i]of[1.63,2.75,4.13,5.33].entries()){const p=H.p(i,3.91,2.88);surface(H,R,[[p[0]-2,p[1]-4],[p[0]+2,p[1]-4],[p[0]+2,p[1]+7],[p[0]-2,p[1]+7]],n===2?'coral':'sun',.7);H.dot(p[0],p[1]+1,1,'blue');}
  const pp=H.p(.4,6.43,2.83),swing=Math.sin(t*Math.PI*2/18)*2;stroke(H,R,[pp,[pp[0]+swing,pp[1]+16]],'blue',.75);surface(H,R,[[pp[0]-7+swing,pp[1]+15],[pp[0]+7+swing,pp[1]+15],[pp[0]+6+swing,pp[1]+29],[pp[0]-6+swing,pp[1]+29]],'coral',.45);H.line(R,[[pp[0]-5+swing,pp[1]+18],[pp[0]+5+swing,pp[1]+18]],'sun',.8);
  const end=6.23+u*1.04;metal(H,R,3.7+u*1.04,4.71,2.63,.18,2.48,.13,'paper');metal(H,R,end,4.65,.12,.34,2.4,.3,'coral');
  const handle=H.p(end,4.8,1.41);stroke(H,R,[H.p(end,4.8,2.45),handle],'blue',.9);oval(H,R,...handle,5,4,'sun',.65);
  actor(H,R,6.82+u*.42,5.64,0,'hold',{shirt:['coral',.45],face:'se',hairStyle:'bun',prop:(A,B,p)=>{stroke(A,B,[p.nearHand,[(p.nearHand[0]+handle[0])/2,p.nearHand[1]-6],handle],'coral',3.2);oval(A,B,...handle,2.3,2.3,'coral',.28);}},0,1.42);
  actor(H,R,8.01,9.5,0,'hold',{shirt:['teal',.5],face:'sw',prop:(A,B,p)=>{const x=p.nearHand[0],y=p.nearHand[1]+21-u*3;surface(A,B,[[x-10,y],[x+9,y],[x+7,y-14],[x-8,y-14]],'paper',1);stroke(A,B,[[x-7,y-14],[x-4,y-23],[x+4,y-23],[x+7,y-14]],'blue',1);}},0,1.35);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
