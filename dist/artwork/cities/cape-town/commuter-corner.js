import { world, shape, stroke, oval, ell, loop, mix, box } from '../../worlds/common.js';
import { timber, metal, benchFrame, bentTube, drape, cushion, vessel, floorLight } from '../materials.js';
import { cabinetFrame, masonry, boardFloor } from '../structure.js';
import { windowBay, recessedFrame, wallRack, hangingRail, taskLight, panelFront } from '../joinery.js';
import { person } from './surf-store.js';
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u);};
function shoe(H,R,i,j,z,size=1,ink='blue'){const [x,y]=H.p(i,j,z);shape(H,R,loop([[x-7*size,y],[x+11*size,y],[x+12*size,y-5*size],[x+3*size,y-9*size],[x+1*size,y-17*size],[x-6*size,y-17*size]],1),ink,.68,.7);stroke(H,R,[[x-6*size,y-2*size],[x+10*size,y-2*size]],'paper',.8);}
function bag(H,R,p){const [x,y]=p;shape(H,R,loop([[x-19,y],[x+18,y],[x+20,y-19],[x+10,y-23],[x-15,y-22]],1),'coral',.71,.9);shape(H,R,[[x-14,y-14],[x+14,y-14],[x+13,y-6],[x-13,y-6]],'coral',.38,.6);stroke(H,R,[[x-17,y-19],[x-16,y-3],[x+15,y-3],[x+17,y-19]],'paper',.8);for(let k=0;k<5;k++)H.line(R,[[x-13+k*2,y-13],[x-12+k*2,y-9]],'sun',.7);}
const room=world('cape-town-commuter-corner','The bag finds its shoulder',{wall:false,floor:'paper',tone:.15,head:32},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.025,'sun',.48);masonry(H,R,'ne',0,12,0,4.15,'paper',.78);masonry(H,R,'nw',0,10.6,0,3.8,'paper',.72);
  recessedFrame(H,R,'ne',1.15,3.7,.05,3.73,'teal',P=>{
    shape(H,R,[P(.15,.15),P(3.55,.15),P(3.55,3.59),P(.15,3.59)],'sun',.24,.3);
    shape(H,R,[P(.15,.15),P(3.55,.15),P(3.55,1.5),P(2.6,1.3),P(1.6,1.64),P(.15,1.44)],'teal',.13,.3);
    for(let k=0;k<5;k++)H.line(R,[P(.25+k*.65,.15),P(.25+k*.65,.5)],'paper',1.5);
  });
  const door=[H.p(4.64,.3,.1),H.p(5.8,1.47,.1),H.p(5.8,1.47,3.64),H.p(4.64,.3,3.64)];shape(H,R,door,'teal',.5,1.1);
  for(const z of [.35,1.6,3.37])stroke(H,R,[H.p(4.78,.44,z),H.p(5.67,1.32,z)],'paper',1.1);
  metal(H,R,1.15,.12,3.65,.73,.025,.12,'paper');
  shape(H,R,H.tile(1.38,.84,3.22,5.8,.035),'sun',.12,.3);
  windowBay(H,R,'nw',1.5,3.4,1.65,1.64,{ink:'teal',divisions:2});
  timber(H,R,.08,1.35,.56,3.72,1.53,.14,'sun');
  recessedFrame(H,R,'ne',6.4,1.55,2.0,1.7,'sun',P=>{
    shape(H,R,[P(.14,.14),P(1.4,.14),P(1.4,1.54),P(.14,1.54)],'paper',1,.3);
    shape(H,R,[P(.2,.19),P(.52,.19),P(1.25,1.53),P(.94,1.53)],'teal',.15,.3);
    for(const u of [.4,.76,1.08]){oval(H,R,...P(u,.86),3,4,'blue',.32);stroke(H,R,[P(u-.09,.66),P(u+.1,.66),P(u+.13,.48),P(u-.13,.48)],'blue',.8,.35);}
  });
  cabinetFrame(H,R,2.15,2.7,5.45,1.45,.08,1.02,4,'sun',(x,j,w,d,z,h,n)=>{
    if(n===0){shoe(H,R,x+.35,j+.65,z+.12,.5,'coral');shoe(H,R,x+.85,j+.65,z+.12,.75);}
    else if(n===1){shoe(H,R,x+.32,j+.6,z+.1);shoe(H,R,x+.95,j+.6,z+.1);}
    else if(n===2)drape(H,R,x,j,w,.8,z+.26,.2,'teal');else box(H,R,x+.05,j,w-.1,.65,z+.12,.45,'paper',.8);
  });
  for(let j=2.62;j<4.2;j+=.22)timber(H,R,2.1,j,5.58,.18,1.12,.09,'sun');
  for(const i of [2.7,6.95])metal(H,R,i,2.59,.36,.17,1.13,.1,'blue');
  cushion(H,R,4.2,3.09,1.75,.87,1.22,.08,'paper');
  hangingRail(H,R,'ne',6.1,2.0,1.69,3,(P,u,n)=>{const p=P(u,-.16);if(n===1){shape(H,R,[[p[0]-8,p[1]],[p[0]+7,p[1]],[p[0]+12,p[1]+12],[p[0]+10,p[1]+43],[p[0]-10,p[1]+43],[p[0]-13,p[1]+12]],'blue',.55,.7);stroke(H,R,[[p[0],p[1]+8],[p[0],p[1]+36]],'paper',.9);}else oval(H,R,p[0],p[1]+7,5,8,'coral',.5);});
  cabinetFrame(H,R,8.55,.35,2.98,1.62,.1,3.88,2,'teal',(x,j,w,d,z,h,n)=>{
    for(const level of [.6,1.65,2.55])timber(H,R,x,j,w,d,z+level,.08,'sun');
    if(!n){for(let k=0;k<3;k++)box(H,R,x+.15+k*.29,j+.15,.23,.7,z+.69,.7,['coral','paper','teal'][k],.5);box(H,R,x+.13,j+.2,w-.3,.7,z+1.75,.45,'coral',.55);drape(H,R,x+.1,j+.1,w-.2,.75,z+2.12,.2,'paper');box(H,R,x+.15,j+.2,.75,.63,z+2.65,.3,'sun',.55);}
    else{shoe(H,R,x+.35,j+.6,z+.15,.8);drape(H,R,x+.15,j+.1,w-.25,.8,z+.75,.25,'paper');box(H,R,x+.24,j+.2,.65,.57,z+1.76,.2,'blue',.6);stroke(H,R,[H.p(x+.5,j+.3,z+1.98),H.p(x+.9,j+.5,z+2.0),H.p(x+.9,j+.5,z+1.75)],'paper',.8);vessel(H,R,x+.52,j+.6,z+2.65,7,13,'teal');}
  });
  metal(H,R,10.4,2.0,.5,.46,.04,.1,'blue');bentTube(H,R,[[10.65,2.15,.15],[10.65,2.15,2.2],[10.42,2.15,2.38],[10.27,2.15,2.19]],2.3,'coral');
  wallRack(H,R,'nw',5.7,3.65,1.7,1.55,2,'sun',(P,b,row)=>{
    if(row){for(let k=0;k<3;k++){const u=.3+k*1.03;shape(H,R,[P(u,b+.07),P(u+.74,b+.07),P(u+.74,b+.5),P(u,b+.5)],'paper',1,.6);stroke(H,R,[P(u+.1,b+.15),P(u+.35,b+.4),P(u+.6,b+.15)],k%2?'coral':'teal',1);}}
    else {shape(H,R,[P(.25,b+.05),P(1.5,b+.05),P(1.5,b+.42),P(.25,b+.42)],'coral',.65,.6);for(const u of [.5,1.24])oval(H,R,...P(u,b+.03),3,3,'blue',.8);oval(H,R,...P(.5,b+.03),1.2,1.2,'sun');shape(H,R,[P(2,b+.05),P(3.3,b+.05),P(3.3,b+.42),P(2,b+.42)],'teal',.4,.6);}
  });
  benchFrame(H,R,.65,8.35,2.85,1.06,.82,'teal');drape(H,R,.83,8.5,1,.8,.84,.25,'paper');vessel(H,R,2.65,8.8,.84,6,12,'paper');box(H,R,1.65,8.57,.52,.52,.86,.08,'coral',.65);
  const tray=H.tile(2.2,8.45,.52,.3,.87);shape(H,R,tray,'sun',.55,.6);oval(H,R,...H.p(2.35,8.6,.89),3,1.6,'blue');
  shape(H,R,H.tile(4.15,8.05,4.7,2.05,.045),'blue',.26,.8);shape(H,R,H.tile(4.3,8.2,4.4,1.73,.05),'teal',.4,.6);
  for(let i=4.45;i<8.6;i+=.18)H.line(R,[H.p(i,8.25,.06),H.p(i,9.87,.06)],'paper',.55,{tone:.5});
  box(H,R,8.86,8.42,.75,.48,.07,.23,'sun',.6);for(let i=8.93;i<9.52;i+=.085)H.line(R,[H.p(i,8.47,.31),H.p(i,8.82,.31)],'blue',1);
  taskLight(H,R,7.1,3.01,1.24,'coral',.55);floorLight(H,5.7,5.35,120,.42);
},(H,R,t)=>{
  const s=((t%24)+24)%24,u=s<9.6?ease(s/9.6):s<14.4?1:s<22?1-ease((s-14.4)/7.6):0;
  const p=H.p(5.15+1.2*u,3.8+.75*u,1.24+.22*Math.sin(Math.PI*u));
  const a=[p[0]-11,p[1]-20],b=[p[0]+13,p[1]-19];
  person(H,R,5.35,4.55,a,H.p(5.45,4.55,1.03),'teal',u*7);
  const r=H.p(6.8,5.05,1.12),v=ease((u-.25)/.5);person(H,R,6.8,5.05,[mix(r[0],b[0],v),mix(r[1],b[1],v)],H.p(6.7,4.75,1.4),'coral',-u*5);
  bag(H,R,p);stroke(H,R,[[p[0]-15,p[1]-25],a,[p[0]+u*10,p[1]-33-u*6],b,[p[0]+16,p[1]-25]],'blue',4);stroke(H,R,[[p[0]-15,p[1]-25],a,[p[0]+u*10,p[1]-33-u*6],b,[p[0]+16,p[1]-25]],'coral',2.7);
  shape(H,R,[[a[0]-3,a[1]-3],[a[0]+4,a[1]-3],[a[0]+4,a[1]+4],[a[0]-3,a[1]+4]],'sun',.85,.6);H.line(R,[[a[0]+.5,a[1]-3],[a[0]+.5,a[1]+4]],'blue',.7);
});
room.loopSeconds=24;
room.stillTime=0;
export default room;
