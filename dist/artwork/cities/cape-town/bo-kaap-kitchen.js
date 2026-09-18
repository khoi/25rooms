import { world, shape, stroke, oval, ell, loop, box } from '../../worlds/common.js';
import { timber, metal, benchFrame, bentTube, drape, vessel, caneChair, floorLight } from '../materials.js';
import { cabinetFrame, basin, masonry } from '../structure.js';
import { windowBay, wallRack, hangingRail, taskLight, panelFront, floorShadow } from '../joinery.js';
import { person } from './surf-store.js';
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u);};
function dish(H,R,i,j,z,r=9,ink='paper'){const p=H.p(i,j,z);oval(H,R,...p,r,r*.38,ink,ink==='paper'?1:.7);oval(H,R,...p,r*.7,r*.23,'paper',1);}
function jug(H,R,i,j,z){vessel(H,R,i,j,z,10,22,'paper');const [x,y]=H.p(i,j,z);stroke(H,R,[[x+9,y-18],[x+18,y-16],[x+18,y-6],[x+9,y-4]],'blue',3);stroke(H,R,[[x+10,y-17],[x+17,y-14],[x+17,y-8]],'sun',1);}
const room=world('cape-town-bo-kaap-kitchen','The cover lifts for breakfast',{wall:false,floor:'blue',tone:.3,pattern:'tiles',accent:'teal',head:24},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4,'paper',.78);masonry(H,R,'nw',0,10.8,0,3.8,'teal',.4);
  for(const side of ['ne','nw'])for(let n=.2;n<11.6;n+=.65){const p=side==='ne'?H.faceI(n,.07,.56,.12,.65):H.faceJ(.07,n,.56,.12,.65);shape(H,R,p,'paper',.82,.4);}
  windowBay(H,R,'ne',1.65,5.45,1.55,2.05,{ink:'coral',divisions:2,view:P=>{
    shape(H,R,[P(.14,.14),P(5.31,.14),P(5.31,.9),P(4.4,1.05),P(3.8,.7),P(2.5,.84),P(1.7,.7),P(.14,.9)],'teal',.19,.4);
    for(let k=0;k<4;k++)shape(H,R,[P(.35+k*1.25,.2),P(1.15+k*1.25,.2),P(1.15+k*1.25,.75),P(.35+k*1.25,.75)],k%2?'sun':'coral',.2,.4);
  }});
  timber(H,R,1.5,.1,5.8,.7,1.37,.15,'sun');
  box(H,R,1.35,.6,5.9,1.4,.07,1.15,'teal',.58);panelFront(H,R,1.48,2.015,5.65,.18,.88,4,'teal');
  timber(H,R,1.28,.5,6.05,1.6,1.22,.15,'sun');
  basin(H,R,1.56,.76,1.6,.95,1.4,'paper');
  metal(H,R,5.45,.77,1.49,1.08,1.4,.13,'paper');
  for(const i of [5.86,6.5])for(const j of [1,1.5]){const [x,y]=H.p(i,j,1.55);oval(H,R,x,y,7,3,'blue',.8);oval(H,R,x,y,4,1.8,'paper',.7);}
  const p=H.p(5.85,1.02,1.61);oval(H,R,p[0],p[1]-8,12,11,'teal',.7);oval(H,R,p[0],p[1]-17,7,3,'paper',1);stroke(H,R,[[p[0]-9,p[1]-10],[p[0]-19,p[1]-18],[p[0]-20,p[1]-14]],'blue',2);stroke(H,R,[[p[0]+7,p[1]-15],[p[0]+15,p[1]-21],[p[0]+21,p[1]-13],[p[0]+12,p[1]-2]],'blue',2.8);
  cabinetFrame(H,R,8.6,.35,3.0,1.48,.08,3.8,2,'sun',(x,j,w,d,z,h,n)=>{
    for(const level of [.67,1.56,2.5])timber(H,R,x,j,w,d,z+level,.08,'sun');
    if(!n){for(let k=0;k<4;k++){const a=H.p(x+.25+k*.24,j+.38,z+.83);oval(H,R,...a,6,14,k%2?'teal':'paper',.77);}for(let k=0;k<2;k++)vessel(H,R,x+.3+k*.56,j+.45,z+1.65,6,13,k?'sun':'coral',false);dish(H,R,x+.5,j+.4,z+2.61,9);vessel(H,R,x+.92,j+.6,z+2.6,3.5,6,'coral');}
    else{box(H,R,x,j,w,.85,z+.13,.4,'teal',.45);for(let k=0;k<3;k++)vessel(H,R,x+.22+k*.32,j+.4,z+.77,5,12,['paper','sun','teal'][k],false);drape(H,R,x,j,w,.8,z+1.7,.4,'paper');jug(H,R,x+.6,j+.4,z+2.59);}
  });
  hangingRail(H,R,'nw',1.0,4.7,2.4,4,(P,u,n)=>{const p=P(u,-.35);stroke(H,R,[P(u,-.1),p],'blue',2);oval(H,R,p[0],p[1]+9,10+n%2*3,12+n%2*3,n%2?'blue':'teal',.7);oval(H,R,p[0]-1,p[1]+8,7,9,'paper',.27);});
  wallRack(H,R,'nw',5.75,3.4,1.8,1.35,2,'teal',(P,b,row)=>{
    if(row){for(let k=0;k<3;k++){const u=.35+k*.9;shape(H,R,[P(u,b+.04),P(u+.62,b+.04),P(u+.62,b+.47),P(u,b+.47)],'paper',1,.6);oval(H,R,...P(u+.31,b+.32),3.5,4.5,'blue',.5);}}
    else {shape(H,R,[P(.2,b+.06),P(1.25,b+.06),P(1.25,b+.42),P(.2,b+.42)],'coral',.58,.6);for(let k=0;k<5;k++)H.line(R,[P(.35+k*.13,b+.11),P(.35+k*.13,b+.33)],'blue',.6);oval(H,R,...P(2.15,b+.27),7,9,'teal',.5);}
  });
  floorLight(H,4.8,4.4,134,.68);
  benchFrame(H,R,2.5,3.9,4.4,2.35,1.18,'sun');
  drape(H,R,2.72,4.13,1.08,1.91,1.2,.26,'paper');
  dish(H,R,3.22,4.86,1.25,13);box(H,R,3.0,4.66,.37,.25,1.27,.09,'sun',.65);
  dish(H,R,6.25,4.5,1.23,12);jug(H,R,6.43,5.4,1.22);
  for(const i of [3.05,3.65]){vessel(H,R,i,5.8,1.24,5,9,'paper');const q=H.p(i,5.8,1.24);stroke(H,R,[[q[0]+5,q[1]-7],[q[0]+10,q[1]-7],[q[0]+10,q[1]-2],[q[0]+5,q[1]-2]],'coral',1.2);}
  const b=H.p(4.75,5.54,1.23);shape(H,R,[[b[0]-27,b[1]-5],[b[0]+27,b[1]-5],[b[0]+24,b[1]-18],[b[0]-24,b[1]-18]],'sun',.64,.8);oval(H,R,b[0],b[1]-17,25,10,'paper',1);
  for(let k=0;k<7;k++)H.line(R,[[b[0]-22+k*7,b[1]-16],[b[0]-25+k*8,b[1]-5]],'coral',.8);
  for(let k=0;k<3;k++)stroke(H,R,[[b[0]-23,b[1]-7-k*3],[b[0],b[1]-3-k*3],[b[0]+23,b[1]-7-k*3]],'paper',.75);
  for(const dx of [-12,3,14]){oval(H,R,b[0]+dx,b[1]-19,9,6,'sun',.72);stroke(H,R,[[b[0]+dx-3,b[1]-22],[b[0]+dx+1,b[1]-17]],'paper',1);}
  caneChair(H,R,2.65,6.6,'coral');caneChair(H,R,7.2,4.35,'teal');
  for(let k=0;k<4;k++)H.line(R,[H.p(2.68,6.76+k*.13,.9),H.p(3.48,6.76+k*.13,.95)],'paper',.9);
  benchFrame(H,R,.5,8.4,2.9,1.1,.66,'teal');drape(H,R,.7,8.5,.8,.85,.68,.4,'coral');box(H,R,1.76,8.63,.95,.66,.68,.08,'paper',1);box(H,R,1.81,8.68,.82,.5,.78,.06,'teal',.5);
  dish(H,R,2.85,8.8,.7,7,'coral');metal(H,R,.6,10.35,2.8,.94,.025,.07,'teal');
  for(const i of [1.2,1.8]){const q=H.p(i,10.6,.13);shape(H,R,loop([[q[0]-5,q[1]],[q[0]+8,q[1]],[q[0]+6,q[1]-9],[q[0]-2,q[1]-11]],1),'blue',.68,.65);}
  taskLight(H,R,2.75,4.04,1.2,'coral',.65);
  bentTube(H,R,[[11.7,.3,.03],[11.7,.3,1.2],[11.35,.3,1.2]],2.8,'teal');
  box(H,R,10.62,1.5,.7,.8,.35,.23,'sun',.58);shape(H,R,H.tile(10.77,1.62,.24,.58,.59),'blue',.5,.5);
},(H,R,t)=>{
  const s=((t%22)+22)%22,u=s<4.4?0:s<8.8?ease((s-4.4)/4.4):s<13.2?1:s<20?1-ease((s-13.2)/6.8):0;
  const [x,y]=H.p(4.75,5.54,1.97+u*.4);
  person(H,R,4.85,5.45,[x,y-9],H.p(4.27,5.7,1.12),'coral',u*3);
  shape(H,R,loop([[x-26,y+7],[x-22,y-6],[x-10,y-15],[x+10,y-15],[x+24,y-4],[x+27,y+7]],2),'sun',.61,.9);
  for(let k=0;k<5;k++)stroke(H,R,[[x-18+k*9,y+5],[x-13+k*6.5,y-10]],'paper',.7);
  oval(H,R,x,y-14,5,3.2,'blue',.75);oval(H,R,x,y-14,2.4,1.4,'paper',1);
  const P=(a,z)=>H.p(4.38+a*Math.cos(u*.3),.26+a*Math.sin(u*.3),z);
  shape(H,R,[P(0,1.63),P(2.58,1.63),P(2.58,3.43),P(0,3.43)],'paper',.12,.8);
  for(const z of [1.63,2.45,3.43])stroke(H,R,[P(0,z),P(2.58,z)],'coral',2.6);
  for(const a of [0,2.58])stroke(H,R,[P(a,1.63),P(a,3.43)],'coral',2.6);
  const latch=P(2.4,1.84);person(H,R,7.3,1.04,latch,H.p(6.5,1.4,1.1),'teal',u*2);oval(H,R,...latch,3,1.7,'sun');
  const edge=H.p(2,.4,3.62);stroke(H,R,[[edge[0],edge[1]],[edge[0]+73,edge[1]+36+u*3]],'paper',4);
});
room.loopSeconds=22;
room.stillTime=0;
export default room;
