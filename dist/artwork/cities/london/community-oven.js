import { world, shape, oval, stroke, box, wallPt, TAU } from '../../worlds/common.js';
import { timber, metal, bentTube, benchFrame, vessel, drape, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin } from '../structure.js';
import { windowBay, panelFront, caster, taskLight } from '../joinery.js';
import { hands } from './umbrella-ribs.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
function bowl(H,R,i,j,z,r=14,ink='paper'){const [x,y]=H.p(i,j,z);shape(H,R,[[x-r,y-8],[x+r,y-8],[x+r*.61,y+6],[x-r*.61,y+6]],ink,.75);oval(H,R,x,y-8,r,r*.38,'paper',1);oval(H,R,x,y-8,r*.82,r*.26,'sun',.24);oval(H,R,x,y+6,r*.55,2,'blue',.4);}
function central(H,R){
 benchFrame(H,R,3.54,4.91,2.88,2.12,1.13,'sun');
 timber(H,R,3.61,5.04,2.69,1.86,.43,.1,'teal');
 box(H,R,3.8,5.21,1.03,1.38,.55,.29,'sun',.56);box(H,R,4.96,5.21,1.06,1.38,.55,.29,'teal',.56);
 H.line(R,[H.p(4.04,6.64,.69),H.p(4.6,6.64,.69)],'blue',1.4);H.line(R,[H.p(5.18,6.64,.69),H.p(5.8,6.64,.69)],'sun',1.4);
 shape(H,R,H.tile(3.73,5.05,2.49,1.78,1.145),'paper',1);
 for(const i of [3.78,6.13]){metal(H,R,i,2.53,.1,2.5,.12,1.99,'teal');metal(H,R,i-.05,2.5,.2,2.72,1.08,.07,'blue');metal(H,R,i-.05,2.5,.2,2.72,1.87,.07,'blue');}
 for(const j of [2.56,4.93])metal(H,R,3.72,j,2.6,.1,2.09,.09,'teal');
 for(let n=0;n<7;n++)metal(H,R,3.9+n*.31,2.65,.025,2.32,1.15,.025,'paper');
 for(const i of [3.78,6.13])metal(H,R,i,2.51,.19,.16,1.14,.14,'coral');
for(let n=0;n<8;n++)H.line(R,[H.p(3.91+n*.28,2.88,2.02),H.p(3.91+n*.28,4.51,2.02)],'paper',.85);
 benchFrame(H,R,7.54,2.56,3.2,2.76,1.13,'sun');
 bowl(H,R,8.52,3.34,1.25,23,'paper');drape(H,R,7.92,2.95,1.25,1.23,1.63,.18,'paper');
 box(H,R,9.44,2.95,.92,1.01,1.15,.35,'teal',.58);const dial=H.p(9.9,3.97,1.41);oval(H,R,...dial,9,9,'paper',1);H.line(R,[dial,[dial[0]+4,dial[1]-5]],'coral',1.1);metal(H,R,9.43,2.93,.94,1.03,1.55,.05,'paper');
 const spoon=H.p(8.14,4.53,1.17);H.line(R,[[spoon[0]-13,spoon[1]-6],[spoon[0]+11,spoon[1]+4]],'sun',3);oval(H,R,spoon[0]-15,spoon[1]-7,6,3,'sun',.6);H.line(R,[[spoon[0]+5,spoon[1]+1],[spoon[0]+11,spoon[1]+4]],'blue',2.7);
 const mitt=H.p(9.7,4.76,1.17);shape(H,R,[[mitt[0]-11,mitt[1]+3],[mitt[0]+7,mitt[1]+4],[mitt[0]+10,mitt[1]-8],[mitt[0]+4,mitt[1]-11],[mitt[0]-1,mitt[1]-6],[mitt[0]-3,mitt[1]-15],[mitt[0]-9,mitt[1]-15]],'coral',.6);shape(H,R,[[mitt[0]+2,mitt[1]-8],[mitt[0]+8,mitt[1]-8],[mitt[0]+7,mitt[1]-3],[mitt[0]+2,mitt[1]-3]],'paper',1);
}
const room=world('london-community-oven','A tray for the gathering',{wall:false,pattern:'tiles',floor:'paper',accent:'teal',head:50},(H,R)=>{
 masonry(H,R,'nw',0,12,0,3.6,'teal',.16);masonry(H,R,'ne',0,12,0,3.6,'paper',.95);
 for(const side of ['nw','ne'])H.line(R,[wallPt(H,side,.15,.7,-.12),wallPt(H,side,11.7,.7,-.12)],'coral',1.4);
 windowBay(H,R,'nw',1.4,4.65,1.53,1.78,{divisions:3});
 floorLight(H,5.35,5.4,140,.62);
 metal(H,R,1.53,.25,3.21,1.62,.08,2.66,'paper');
 shape(H,R,H.faceI(1.78,1.89,2.7,.48,2.19),'blue',.87);shape(H,R,H.faceI(1.98,1.9,2.27,.71,1.98),'teal',.45);
 H.line(R,[H.p(2.02,1.93,1.82),H.p(4.15,1.93,1.82)],'paper',3);for(let n=0;n<4;n++){const p=H.p(1.96+n*.68,1.9,2.41);oval(H,R,...p,4,4,'blue',.7);H.line(R,[[p[0],p[1]],[p[0]+1,p[1]-3]],'sun',1);}
 for(let n=0;n<9;n++)H.line(R,[H.p(1.8+n*.29,1.91,.2),H.p(1.92+n*.29,1.91,.34)],'blue',.8);
 metal(H,R,1.5,.2,3.3,1.74,2.85,.19,'teal');shape(H,R,[H.p(1.5,.2,3.04),H.p(4.8,.2,3.04),H.p(4.2,.45,3.56),H.p(2.2,.45,3.56)],'paper',1);
 metal(H,R,2.77,.24,.74,.61,3.44,.33,'teal');
 cabinetFrame(H,R,8.26,.28,3.3,1.61,.11,3.24,3,'teal',(i,j,w,d,z,h,n)=>{
  for(const q of [.82,1.75,2.53])timber(H,R,i,j,w,d,z+q,.08,'sun');
  if(n===0){for(let k=0;k<3;k++)box(H,R,i+.06,j+.1+k*.35,w-.11,.29,z+.06,.24,k===1?'sun':'paper',.7);vessel(H,R,i+.44,j+.7,z+.91,9,20,'coral',false);vessel(H,R,i+.43,j+.64,z+1.84,7,14,'paper',false);bowl(H,R,i+.5,j+.76,z+2.67,9,'paper');}
  if(n===1){for(let k=0;k<2;k++)box(H,R,i+.08+k*.43,j+.1,.36,1.1,z+.07,.62,'paper',.92);drape(H,R,i+.07,j+.07,w-.1,d-.12,z+1.04,.12,'paper');for(let k=0;k<3;k++)vessel(H,R,i+.17+k*.29,j+.67,z+1.84,4,13,k===1?'sun':'teal',false);box(H,R,i+.08,j+.08,w-.1,d-.12,z+2.66,.13,'blue',.6);}
  if(n===2){for(let k=0;k<4;k++)metal(H,R,i+.1+k*.19,j+.1,.055,1.1,z+.08,.6,'blue');bowl(H,R,i+.5,j+.7,z+.97,10,'coral');bowl(H,R,i+.5,j+.7,z+1.85,12,'paper');const p=H.p(i+.5,j+.7,z+1.85);H.line(R,[[p[0]-5,p[1]+5],[p[0]-1,p[1]+8],[p[0]+4,p[1]+5]],'sun',1.7);box(H,R,i+.1,j+.1,w-.16,d-.14,z+2.63,.2,'teal',.6);}
 });
 panelFront(H,R,8.4,1.91,3.02,.15,.41,3,'teal');
 timber(H,R,.15,3.45,1.5,5.66,1.06,.16,'sun');for(const j of [3.59,6,8.88])timber(H,R,.28,j,.16,.16,.08,.98,'teal');basin(H,R,.25,3.69,1.25,1.6,1.23);
 for(let n=0;n<3;n++)bowl(H,R,.85,5.74+n*.79,1.25,10,n===1?'coral':'paper');drape(H,R,.35,8.25,1.11,.61,1.24,.4,'paper');
 for(let n=0;n<4;n++){const p=wallPt(H,'ne',5.2+n*.63,2.96,-.2);shape(H,R,[[p[0]-8,p[1]-10],[p[0]+8,p[1]-10],[p[0]+8,p[1]+8],[p[0]-8,p[1]+8]],'paper',1);oval(H,R,p[0],p[1],5,3,n%2?'coral':'teal',.6);H.dot(p[0],p[1]-10,1.2,'sun');}
 for(const [j,s]of [[9.63,1],[10.45,.64]]){const p=wallPt(H,'nw',j,2.55,-.2);shape(H,R,[[p[0]-5*s,p[1]],[p[0]+5*s,p[1]],[p[0]+11*s,p[1]+34*s],[p[0]-11*s,p[1]+34*s]],'paper',1);H.line(R,[[p[0]-5*s,p[1]+1],[p[0],p[1]-5*s],[p[0]+5*s,p[1]+1]],'coral',1);H.line(R,[[p[0]-7*s,p[1]+19*s],[p[0]+7*s,p[1]+19*s]],'teal',1);}
 timber(H,R,8.43,9.04,2.56,1.36,.12,.11,'teal');for(let n=0;n<3;n++){box(H,R,8.58+n*.78,9.19,.65,1.05,.25,.53,n===1?'coral':'paper',.7);stroke(H,R,[H.p(8.74+n*.78,9.7,.79),H.p(8.74+n*.78,9.7,1),H.p(8.98+n*.78,9.7,1),H.p(8.98+n*.78,9.7,.79)],'blue',1.5);}
 metal(H,R,1.8,10.43,2.1,.18,.02,.04,'teal');
},(H,R,t)=>{
 const u=((t%18)+18)%18,a=ease((u-3.6)/3.6)*(1-ease((u-10.8)/5.2)),j=5.57-.87*a;
 const left=H.p(3.94,j+.4,1.23),right=H.p(5.99,j+.4,1.23);
 hands(H,R,3.01,5.6-.35*a,[left,H.p(3.96,j+.02,1.23)],'coral',a);
 central(H,R);
 hands(H,R,6.95,5.77-.35*a,[H.p(5.98,j+.03,1.23),right],'teal',-a);
 metal(H,R,3.88,j-.39,2.18,1.23,1.16,.065,'blue');shape(H,R,H.tile(3.98,j-.29,1.98,1.01,1.23),'paper',1);H.tint(H.tile(4.08,j-.19,1.78,.81,1.233),'teal',.13);H.line(R,[H.p(4.1,j+.7,1.235),H.p(5.82,j+.7,1.235)],'sun',1.2);
 for(const p of [left,right])oval(H,R,...p,2.5,2.4,'paper',1);
});room.loopSeconds=18;room.stillTime=9;export default room;
