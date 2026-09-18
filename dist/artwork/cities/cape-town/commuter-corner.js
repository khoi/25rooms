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
  for(const j of [1.35,5.04])timber(H,R,.11,j,.19,.17,.07,1.47,'teal');
  timber(H,R,.14,1.34,1.22,3.85,.2,.13,'teal');timber(H,R,.14,1.34,1.22,3.85,.84,.12,'sun');
  for(const j of [2.6,3.84])timber(H,R,.14,j,1.22,.12,.32,.52,'teal');
  shoe(H,R,.88,1.85,.34,.7,'coral');shoe(H,R,.9,2.26,.34,.7,'coral');shoe(H,R,.85,3.19,.34,1);shoe(H,R,.85,3.65,.34,1);
  box(H,R,.24,4.12,.96,.75,.34,.3,'sun',.5);drape(H,R,.25,4.13,.91,.7,.65,.18,'paper');
  for(const j of [1.7,2.28])cushion(H,R,.27,j,.78,.47,.98,.15,'paper');
  const satchel=H.p(.76,3.64,1.01);shape(H,R,[[satchel[0]-16,satchel[1]],[satchel[0]+14,satchel[1]],[satchel[0]+17,satchel[1]-25],[satchel[0]-15,satchel[1]-27]],'teal',.6,.8);stroke(H,R,[[satchel[0]-8,satchel[1]-25],[satchel[0]-7,satchel[1]-35],[satchel[0]+9,satchel[1]-35],[satchel[0]+11,satchel[1]-25]],'sun',2);H.line(R,[[satchel[0]-14,satchel[1]-12],[satchel[0]+14,satchel[1]-12]],'paper',1);
  box(H,R,.4,4.41,.61,.48,.98,.24,'coral',.5);drape(H,R,.4,4.41,.59,.44,1.23,.13,'paper');
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
  for(const i of [2.2,7.42]) {timber(H,R,i,2.66,.16,.18,1.14,.6,'teal');timber(H,R,i,2.66,.16,1.34,1.64,.1,'sun');}
  timber(H,R,2.25,2.65,5.25,.12,1.46,.16,'teal');
  for(const i of [2.35,7.3])bentTube(H,R,[[i,2.81,.39],[i,3.88,.89]],1.8,'sun');
  const drawer=H.tile(6.08,3.96,1.23,.71,.61);shape(H,R,drawer,'blue',.65,.6);timber(H,R,6.05,4.61,1.29,.11,.6,.36,'teal');
  for(let k=0;k<3;k++){shape(H,R,H.tile(6.17+k*.31,4.08,.24,.38,.63),['paper','sun','coral'][k],.7,.6);H.line(R,[H.p(6.2+k*.31,4.12,.66),H.p(6.34+k*.31,4.23,.66)],'blue',1);}
  H.line(R,[H.p(6.48,4.74,.79),H.p(6.92,4.74,.79)],'sun',2);
  cushion(H,R,4.2,3.09,1.75,.87,1.22,.08,'paper');
  hangingRail(H,R,'ne',6.1,2.0,1.69,3,(P,u,n)=>{const p=P(u,-.16);if(n===1){shape(H,R,[[p[0]-8,p[1]],[p[0]+7,p[1]],[p[0]+12,p[1]+12],[p[0]+10,p[1]+43],[p[0]-10,p[1]+43],[p[0]-13,p[1]+12]],'blue',.55,.7);stroke(H,R,[[p[0],p[1]+8],[p[0],p[1]+36]],'paper',.9);}else oval(H,R,p[0],p[1]+7,5,8,'coral',.5);});
  cabinetFrame(H,R,8.55,.35,2.98,1.62,.1,3.88,2,'teal',(x,j,w,d,z,h,n)=>{
    for(const level of [.6,1.65,2.55])timber(H,R,x,j,w,d,z+level,.08,'sun');
    if(!n){for(let k=0;k<3;k++)box(H,R,x+.15+k*.29,j+.15,.23,.7,z+.69,.7,['coral','paper','teal'][k],.5);box(H,R,x+.13,j+.2,w-.3,.7,z+1.75,.45,'coral',.55);drape(H,R,x+.1,j+.1,w-.2,.75,z+2.12,.2,'paper');box(H,R,x+.15,j+.2,.75,.63,z+2.65,.3,'sun',.55);}
    else{shoe(H,R,x+.35,j+.6,z+.15,.8);drape(H,R,x+.15,j+.1,w-.25,.8,z+.75,.25,'paper');box(H,R,x+.24,j+.2,.65,.57,z+1.76,.2,'blue',.6);stroke(H,R,[H.p(x+.5,j+.3,z+1.98),H.p(x+.9,j+.5,z+2.0),H.p(x+.9,j+.5,z+1.75)],'paper',.8);vessel(H,R,x+.52,j+.6,z+2.65,7,13,'teal');}
  });
  for(const z of [1.0,1.55,3.8])metal(H,R,11.37,.15,.31,.18,z,.13,'paper');
  bentTube(H,R,[[11.53,.25,.05],[11.53,.25,2.31],[11.11,.25,2.31]],1.4,'teal');
  metal(H,R,11.2,.19,.41,.15,2.09,.43,'paper');for(const i of [11.3,11.49])H.dot(...H.p(i,.36,2.29),1.3,'blue');
  stroke(H,R,[H.p(11.44,.39,2.25),H.p(11.17,1.57,1.94),H.p(10.72,1.29,1.97)],'blue',.9);
  metal(H,R,10.4,2.0,.5,.46,.04,.1,'blue');bentTube(H,R,[[10.65,2.15,.15],[10.65,2.15,2.2],[10.42,2.15,2.38],[10.27,2.15,2.19]],2.3,'coral');
  wallRack(H,R,'nw',5.7,3.65,1.7,1.55,2,'sun',(P,b,row)=>{
    if(row){for(let k=0;k<3;k++){const u=.3+k*1.03;shape(H,R,[P(u,b+.07),P(u+.74,b+.07),P(u+.74,b+.5),P(u,b+.5)],'paper',1,.6);stroke(H,R,[P(u+.1,b+.15),P(u+.35,b+.4),P(u+.6,b+.15)],k%2?'coral':'teal',1);}}
    else {shape(H,R,[P(.25,b+.05),P(1.5,b+.05),P(1.5,b+.42),P(.25,b+.42)],'coral',.65,.6);for(const u of [.5,1.24])oval(H,R,...P(u,b+.03),3,3,'blue',.8);oval(H,R,...P(.5,b+.03),1.2,1.2,'sun');shape(H,R,[P(2,b+.05),P(3.3,b+.05),P(3.3,b+.42),P(2,b+.42)],'teal',.4,.6);}
  });
  for(const j of [5.6,7.24,9.2])timber(H,R,.14,j,1.34,.13,.08,1.14,'teal');
  timber(H,R,.12,5.61,1.38,3.72,.12,.12,'teal');timber(H,R,.12,5.6,1.39,3.75,1.17,.12,'sun');
  drape(H,R,.24,5.88,.96,.94,.3,.18,'paper');box(H,R,.3,7.52,.91,1.1,.28,.47,'coral',.48);
  shape(H,R,H.faceJ(1.53,7.55,1.0,.31,.78),'coral',.38,.7);H.line(R,[H.p(1.55,7.82,.57),H.p(1.55,8.2,.57)],'sun',1.8);
  vessel(H,R,.69,8.57,1.32,8,14,'paper');cushion(H,R,.3,6.06,.92,.68,1.31,.12,'teal');
  shape(H,R,H.tile(.27,7.2,.98,.82,1.32),'paper',1,.55);box(H,R,.48,7.38,.59,.45,1.34,.08,'coral',.65);
  const tray=H.tile(.35,8.88,.67,.3,1.33);shape(H,R,tray,'sun',.55,.6);oval(H,R,...H.p(.62,9.01,1.36),4,1.7,'blue');stroke(H,R,[H.p(.6,9.02,1.37),H.p(.9,9.01,1.37)],'paper',1.2);
  for(const j of [9.65,10.23])bentTube(H,R,[[.12,j,2.42],[.48,j,2.4],[.48,j,2.53]],2,'sun');
  const bonnet=H.p(.49,9.66,2.3);shape(H,R,loop([[bonnet[0]-11,bonnet[1]+3],[bonnet[0]-12,bonnet[1]-12],[bonnet[0],bonnet[1]-18],[bonnet[0]+11,bonnet[1]-9],[bonnet[0]+10,bonnet[1]+5]],2),'coral',.63,.8);stroke(H,R,[[bonnet[0]-8,bonnet[1]+4],[bonnet[0]-6,bonnet[1]+22]],'paper',1);
  const cap=H.p(.48,10.21,2.38);shape(H,R,loop([[cap[0]-10,cap[1]],[cap[0]-8,cap[1]-12],[cap[0]+6,cap[1]-14],[cap[0]+12,cap[1]],[cap[0]+19,cap[1]+4],[cap[0]-10,cap[1]+4]],2),'teal',.68,.7);
  for(const i of [9.73,10.79]) {bentTube(H,R,[[i,5.8,.2],[i,5.27,2.14],[i,5.19,2.75]],2.5,'teal');oval(H,R,...H.p(i,5.87,.18),7,8,'blue',.8);oval(H,R,...H.p(i,5.87,.18),3,3.5,'sun',.8);}
  bentTube(H,R,[[9.73,5.19,2.75],[10.79,5.19,2.75]],3,'sun');
  shape(H,R,[H.p(9.64,5.62,.46),H.p(10.83,5.62,.46),H.p(10.7,5.3,1.93),H.p(9.86,5.3,1.93)],'coral',.5,.8);
  shape(H,R,[H.p(9.83,5.34,1.87),H.p(10.74,5.34,1.87),H.p(10.75,5.59,1.49),H.p(9.82,5.59,1.49)],'paper',1,.7);H.line(R,[H.p(9.94,5.64,.75),H.p(10.61,5.64,.75)],'sun',1.6);
  benchFrame(H,R,9.13,8.37,1.65,1.35,.63,'sun');cushion(H,R,9.12,8.37,1.68,1.39,.65,.22,'paper');
  shoe(H,R,9.72,8.91,.9,.78,'coral');shoe(H,R,10.24,8.91,.9,.5,'sun');
  for(let k=0;k<4;k++)H.line(R,[H.p(9.55+k*.09,8.98,1.14),H.p(9.61+k*.09,9.04,1.04)],'paper',.7);
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
