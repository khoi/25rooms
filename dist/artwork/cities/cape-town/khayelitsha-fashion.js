import { world, shape, stroke, oval, ell, loop, box, mix } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, cushion, bentTube, vessel, caneChair, floorLight } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, wallRack, hangingRail, recessedFrame, taskLight, panelFront } from '../joinery.js';
import { person } from './surf-store.js';
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u);};
function jacket(H,R,x,y,size=1,ink='paper'){
  const P=(a,b)=>[x+a*size,y+b*size];
  shape(H,R,[P(-10,-70),P(-22,-62),P(-31,-25),P(-22,-22),P(-15,-44),P(-17,0),P(17,0),P(15,-44),P(23,-21),P(32,-25),P(22,-62),P(10,-70)],ink,ink==='paper'?1:.62,.9);
  shape(H,R,[P(-9,-66),P(-3,-42),P(1,-9),P(12,-7),P(11,-58),P(4,-65)],'coral',.47,.6);
  shape(H,R,[P(-10,-70),P(-1,-58),P(9,-71),P(15,-58),P(6,-39),P(1,-44),P(-10,-48),P(-15,-61)],ink,ink==='paper'?1:.62,.75);
  shape(H,R,[P(-16,-19),P(-4,-19),P(-4,-10),P(-16,-10)],'teal',.23,.55);
  stroke(H,R,[P(-16,-17),P(-5,-17)],'paper',.8);
  for(const a of [-12,-8,-4])H.line(R,[P(a,-47),P(a+1,-43)],'sun',.55);
  stroke(H,R,[P(-22,-60),P(-17,-54),P(-15,-44)],'blue',.65,.55);
  stroke(H,R,[P(22,-60),P(17,-54),P(15,-44)],'blue',.65,.55);
  stroke(H,R,[P(-12,-42),P(-14,-8),P(-3,-6)],'sun',1.1);
  stroke(H,R,[P(4,-35),P(4,-3)],'blue',.65,.55);
  for(const h of [-28,-17,-7])oval(H,R,...P(6,h),1.2*size,1.2*size,'sun',.9);
  stroke(H,R,[P(-28,-27),P(-22,-25)],'teal',1);stroke(H,R,[P(24,-25),P(30,-27)],'teal',1);
}
const room=world('cape-town-khayelitsha-fashion','A pocket sits right',{wall:false,floor:'paper',tone:.25,pattern:'tiles',accent:'teal',head:42},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.2,'paper',.76);masonry(H,R,'nw',0,11,0,4.0,'teal',.25);
  windowBay(H,R,'nw',1.1,5.75,1.38,2.32,{ink:'teal',divisions:3,view:P=>{shape(H,R,[P(.14,.14),P(5.61,.14),P(5.61,.7),P(4.4,1.04),P(2.5,.75),P(1.4,1.1),P(.14,.7)],'sun',.13,.3);}});
  timber(H,R,.06,.96,.62,6.05,1.2,.14,'sun');
  bentTube(H,R,[[.49,6.2,1.35],[.62,5.75,1.44],[.2,5.35,1.48]],1.5,'blue');
  timber(H,R,.19,1.11,1.13,5.39,.15,.12,'teal');timber(H,R,.15,1.08,1.24,5.46,1.03,.14,'sun');
  for(const j of [1.12,2.83,4.51,6.37])timber(H,R,.18,j,1.17,.14,.26,.77,'teal');
  for(const j of [1.24,2.03,2.96,3.76]){shape(H,R,H.faceJ(1.38,j,.63,.34,.92),'teal',.37,.7);H.line(R,[H.p(1.4,j+.18,.71),H.p(1.4,j+.45,.71)],'sun',1.8);}
  for(let k=0;k<4;k++)box(H,R,.27,4.7,.89,1.44,.29+k*.12,.09,['paper','teal','coral','paper'][k],.75);
  shape(H,R,H.tile(.32,4.84,.76,1.06,.78),'sun',.47,.6);stroke(H,R,[H.p(.43,4.93,.79),H.p(.86,5.3,.79),H.p(.76,5.64,.79)],'blue',1.1);
  const roll=H.p(.68,2.0,1.21);shape(H,R,[[roll[0]-8,roll[1]],[roll[0]+9,roll[1]],[roll[0]+8,roll[1]-36],[roll[0]-8,roll[1]-36]],'paper',1,.7);oval(H,R,roll[0],roll[1]-36,8,3,'sun',.5);oval(H,R,roll[0],roll[1]-36,3,1.5,'blue',.7);stroke(H,R,[[roll[0]+2,roll[1]-32],[roll[0]+2,roll[1]-3]],'coral',1.2);
  box(H,R,.35,3.02,.73,.71,1.19,.2,'teal',.53);for(let k=0;k<4;k++)shape(H,R,H.tile(.41+k*.15,3.12,.1,.53,1.42),['coral','sun','paper','teal'][k],.6,.5);
  benchFrame(H,R,1.6,.67,5.53,1.48,1.17,'sun');
  metal(H,R,3.26,1.02,1.65,.74,1.18,.1,'blue');
  const m=H.p(4.1,1.4,1.3);shape(H,R,loop([[m[0]-25,m[1]],[m[0]+24,m[1]],[m[0]+23,m[1]-27],[m[0]+14,m[1]-34],[m[0]-12,m[1]-32],[m[0]-22,m[1]-24],[m[0]-21,m[1]-10],[m[0]-12,m[1]-10],[m[0]-12,m[1]-22],[m[0]+8,m[1]-22],[m[0]+8,m[1]-4],[m[0]-25,m[1]-4]],1),'teal',.75,1);
  oval(H,R,m[0]+24,m[1]-20,8,9,'blue',.85);oval(H,R,m[0]+24,m[1]-20,4,5,'paper',.75);
  H.line(R,[[m[0]-13,m[1]-14],[m[0]-13,m[1]-1]],'blue',1.2);H.line(R,[[m[0]-16,m[1]-1],[m[0]-6,m[1]-1]],'paper',1.2);
  H.line(R,[[m[0]+1,m[1]-31],[m[0]+1,m[1]-43]],'blue',1);oval(H,R,m[0]+1,m[1]-39,4,5,'coral',.7);stroke(H,R,[[m[0]+1,m[1]-40],[m[0]-16,m[1]-29],[m[0]-14,m[1]-4]],'paper',.7);
  timber(H,R,1.82,.9,5.0,1.0,.34,.1,'teal');
  const motor=H.p(4.48,1.55,.87);oval(H,R,...motor,13,9,'blue',.7);oval(H,R,motor[0]+8,motor[1],5,8,'teal',.7);stroke(H,R,[[m[0]+23,m[1]-20],[motor[0]+10,motor[1]-4],[motor[0]+10,motor[1]+4],[m[0]+29,m[1]-17]],'blue',1.2);
  shape(H,R,H.tile(3.67,2.42,.92,.62,.09),'blue',.68,.7);for(let k=0;k<5;k++)H.line(R,[H.p(3.76+k*.14,2.48,.1),H.p(3.76+k*.14,2.93,.1)],'paper',.8);
  stroke(H,R,[H.p(4.18,2.49,.1),H.p(4.47,2.13,.22),H.p(4.43,1.57,.85)],'blue',.95);
  for(let k=0;k<3;k++)vessel(H,R,5.33+k*.53,1.31,1.19,4.5,9,['coral','paper','sun'][k],false);
  bentTube(H,R,[[5.53,1.06,1.2],[5.53,1.06,2.26],[4.76,1.06,2.26]],1.6,'sun');
  stroke(H,R,[H.p(5.47,1.27,1.58),H.p(5.51,1.06,2.25),H.p(4.81,1.06,2.25),[m[0]+1,m[1]-39]],'paper',.7);
  drape(H,R,2.38,1.43,.77,.63,1.19,.46,'paper');
  wallRack(H,R,'ne',1.37,5.75,2.2,1.65,2,'sun',(P,b,row)=>{
    if(row){for(let k=0;k<4;k++){const u=.25+k*1.3;shape(H,R,[P(u,b+.06),P(u+1.03,b+.06),P(u+1.03,b+.64),P(u,b+.64)],'paper',1,.6);stroke(H,R,[P(u+.22,b+.12),P(u+.3,b+.5),P(u+.48,b+.61),P(u+.76,b+.5),P(u+.84,b+.12)],k%2?'teal':'coral',1.1);}}
    else{for(let k=0;k<8;k++){const u=.32+k*.66,p=P(u,b+.08);oval(H,R,p[0],p[1]-6,5,8,['coral','teal','sun','paper'][k%4],.6);oval(H,R,p[0],p[1]-13,5,2,'paper',1);H.line(R,[[p[0]-4,p[1]-4],[p[0]+4,p[1]-4]],'blue',.4);}}
  });
  cabinetFrame(H,R,8.15,.38,3.45,1.65,.12,3.85,2,'teal',(x,j,w,d,z,h,n)=>{
    if(!n){for(const zz of [.65,1.22,1.79])timber(H,R,x,j,w,d,z+zz,.08,'sun');for(let k=0;k<3;k++){box(H,R,x+.08,j,w-.16,.95,z+.18+k*.55,.33,k===1?'sun':'teal',.45);H.line(R,[H.p(x+.44,j+.96,z+.34+k*.55),H.p(x+.96,j+.96,z+.34+k*.55)],'blue',1.6);}for(let k=0;k<4;k++){const p=H.p(x+.23+k*.31,j+.48,z+1.92);shape(H,R,[[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+5,p[1]-43],[p[0]-5,p[1]-43]],['paper','coral','teal','sun'][k],.5,.55);oval(H,R,p[0],p[1]-43,5,2.4,'paper',1);oval(H,R,p[0],p[1]-43,2,1,'blue',.65);}}
    else{timber(H,R,x,j,w,d,z+.65,.08,'sun');box(H,R,x+.1,j,w-.2,.9,z+.16,.42,'sun',.54);bentTube(H,R,[[x+.05,j+.5,z+3.27],[x+w-.05,j+.5,z+3.27]],1.8,'sun');const p=H.p(x+.55,j+.5,z+2.38);jacket(H,R,p[0],p[1]+25,.58,'coral');const q=H.p(x+1.12,j+.5,z+2.78);jacket(H,R,q[0],q[1]+14,.23,'paper');}
  });
  recessedFrame(H,R,'ne',7.23,.76,1.25,2.2,'sun',P=>{shape(H,R,[P(.1,.1),P(.65,.1),P(.65,2.1),P(.1,2.1)],'paper',1,.3);shape(H,R,[P(.13,.15),P(.35,.15),P(.61,1.98),P(.4,1.98)],'teal',.19,.3);});
  benchFrame(H,R,2.4,3.48,3.4,2.25,1.24,'sun');
  timber(H,R,2.6,3.68,2.93,1.8,.36,.1,'teal');
  for(let k=0;k<4;k++)box(H,R,2.77,4.0,1.7,1.24,.48+k*.09,.07,['paper','coral','teal','paper'][k],.8);
  timber(H,R,4.59,5.32,1.01,.63,.79,.08,'sun');shape(H,R,H.tile(4.65,5.38,.87,.48,.885),'blue',.62,.5);timber(H,R,4.58,5.86,1.04,.11,.79,.29,'teal');
  for(let k=0;k<3;k++){const p=H.p(4.78+k*.25,5.59,.93);oval(H,R,...p,3.7,2,'coral',.65);oval(H,R,p[0],p[1]-4,3.7,2,'paper',1);}
  H.line(R,[H.p(4.9,5.99,.94),H.p(5.29,5.99,.94)],'sun',1.8);
  shape(H,R,H.tile(2.6,3.67,2.98,1.83,1.25),'teal',.4,.6);
  for(let k=0;k<9;k++)H.line(R,[H.p(2.67+k*.33,3.72,1.26),H.p(2.67+k*.33,5.43,1.26)],'paper',.5,{tone:.65});
  for(let k=0;k<5;k++)H.line(R,[H.p(2.67,3.78+k*.35,1.26),H.p(5.51,3.78+k*.35,1.26)],'paper',.5,{tone:.65});
  shape(H,R,[H.p(2.83,3.89,1.28),H.p(4.12,3.9,1.28),H.p(4.4,4.3,1.28),H.p(4.08,4.65,1.28),H.p(2.9,4.49,1.28)],'paper',1,.65);
  shape(H,R,[H.p(3.18,4.72,1.28),H.p(3.77,4.72,1.28),H.p(3.77,5.15,1.28),H.p(3.44,5.35,1.28),H.p(3.18,5.15,1.28)],'sun',.5,.6);
  for(const i of [3.05,4.12])oval(H,R,...H.p(i,4.12,1.29),3,2,'blue',.8);
  drape(H,R,2.49,4.62,.43,.83,1.3,.45,'coral');
  const base=H.p(6.08,4.77,.07);oval(H,R,...base,27,10,'blue',.78);oval(H,R,base[0],base[1]-2,21,7,'teal',.5);
  bentTube(H,R,[[6.08,4.77,.15],[6.08,4.77,1.72]],3.5,'blue');metal(H,R,5.98,4.67,.2,.2,1.09,.13,'sun');
  const p=H.p(6.08,4.77,1.34);jacket(H,R,...p,1.04,'paper');oval(H,R,p[0],p[1]-75,5,3,'sun',.6);stroke(H,R,[[p[0],p[1]-76],[p[0],p[1]-83]],'blue',2);
  const pad=[H.p(5.76,4.7,1.62),H.p(5.96,4.7,1.59),H.p(6.04,4.7,1.85),H.p(5.83,4.7,1.89)];shape(H,R,pad,'coral',.48,.6);
  benchFrame(H,R,.7,8.2,4.05,1.1,.73,'teal');
  for(let k=0;k<3;k++){shape(H,R,H.tile(1+k*.83,8.35,.64,.72,.75),'paper',1,.55);const q=H.p(1.2+k*.83,8.65,.77);oval(H,R,...q,3,2,['sun','coral','blue'][k],.8);}
  shape(H,R,H.tile(3.7,8.45,.65,.28,.75),'coral',.6,.55);shape(H,R,H.tile(3.7,8.8,.65,.28,.75),'teal',.6,.55);for(const j of [8.61,8.86])oval(H,R,...H.p(4.02,j,.77),2,1.4,'sun');
  for(const j of [8.12,10.65])bentTube(H,R,[[.61,j,.08],[.61,j,3.41]],2.6,'sun');
  bentTube(H,R,[[.61,8.12,3.4],[.61,10.65,3.4]],2.6,'sun');
  for(const [j,ink,size] of [[8.63,'coral',.65],[9.54,'teal',.66],[10.13,'paper',.45]]){const p=H.p(.61,j,2.88);stroke(H,R,[[p[0],p[1]-5],[p[0]-9,p[1]+4],[p[0]+10,p[1]+4],[p[0],p[1]-5]],'blue',1);jacket(H,R,p[0],p[1]+49,size,ink);}
  timber(H,R,.19,8.1,1.11,2.67,.23,.1,'teal');
  for(let k=0;k<2;k++){box(H,R,.29,8.35+k*1.14,.83,.96,.34,.31,k?'paper':'coral',.62);H.line(R,[H.p(.43,9.31+k*1.14,.51),H.p(.83,9.31+k*1.14,.51)],'sun',1.5);}
  for(const i of [5.24,8.06]){bentTube(H,R,[[i,9.95,.05],[i+.65,9.11,1.03]],2.7,'teal');bentTube(H,R,[[i+.61,9.16,.05],[i,9.91,1.03]],2.7,'teal');}
  const press=loop([H.p(4.81,9.16,1.13),H.p(7.98,9.16,1.13),H.p(8.65,9.43,1.13),H.p(8.03,9.82,1.13),H.p(4.83,9.82,1.13)],2);shape(H,R,press,'paper',1,.85);
  drape(H,R,5.09,9.2,1.0,.52,1.16,.46,'coral');
  cushion(H,R,7.36,9.44,.59,.31,1.16,.17,'sun');
  const iron=H.p(6.71,9.5,1.17);shape(H,R,loop([[iron[0]-12,iron[1]],[iron[0]+14,iron[1]],[iron[0]+3,iron[1]-13],[iron[0]-10,iron[1]-10]],1),'teal',.7,.8);stroke(H,R,[[iron[0]-8,iron[1]-8],[iron[0]-5,iron[1]-18],[iron[0]+3,iron[1]-18],[iron[0]+6,iron[1]-8]],'blue',2.8);stroke(H,R,[[iron[0]-10,iron[1]-5],[iron[0]-23,iron[1]-1],H.p(6.18,9.91,.54),H.p(5.86,10.22,.07)],'blue',1);
  shape(H,R,H.tile(8.11,9.26,.55,.5,1.15),'teal',.37,.6);for(let k=0;k<3;k++)H.line(R,[H.p(8.18+k*.13,9.31,1.18),H.p(8.18+k*.13,9.68,1.18)],'blue',1.1);
  caneChair(H,R,8.95,7.27,'coral');cushion(H,R,8.98,7.31,.87,.65,.68,.1,'paper');
  benchFrame(H,R,9.23,9.07,1.62,.94,.68,'sun');vessel(H,R,9.73,9.43,.7,7,18,'paper');
  const cover=H.p(10.92,5.42,2.25);shape(H,R,loop([[cover[0]-17,cover[1]],[cover[0]+17,cover[1]],[cover[0]+18,cover[1]+63],[cover[0]-18,cover[1]+63]],1),'paper',.76,.7);stroke(H,R,[[cover[0],cover[1]+4],[cover[0],cover[1]+59]],'teal',1);bentTube(H,R,[[10.9,5.4,.03],[10.9,5.4,2.52],[10.35,5.4,2.52]],2.2,'sun');
  taskLight(H,R,5.26,3.65,1.3,'coral',.62);floorLight(H,6.2,5.3,128,.57);
},(H,R,t)=>{
  const s=((t%20)+20)%20,u=s<4?ease(s/4)*.35:s<8?.35+.65*ease((s-4)/4):s<12?1:s<18?1-ease((s-12)/6):0;
  const start=H.p(5.05,4.82,1.3),end=H.p(6.08,4.82,1.78),p=[mix(start[0],end[0],u),mix(start[1],end[1],u)-Math.sin(Math.PI*u)*9];
  const P=(a,b)=>[p[0]+a,p[1]+b*mix(.35,1,u)+a*.2*(1-u)];
  person(H,R,5.42+u*.9,5.59,P(-9,-5),P(9,-5),'teal',u*8);
  shape(H,R,[P(-11,-7),P(11,-7),P(10,10),P(0,15),P(-10,10)],'paper',1,.75);
  stroke(H,R,[P(-8,-3),P(8,-3),P(7,8),P(0,12),P(-7,8)],'coral',.75);
  for(let k=0;k<3;k++)H.line(R,[P(5+k*1.3,6),P(4+k*1.3,10)],'teal',.6);
  person(H,R,7.55,6.9,H.p(7.79,6.15,1.1+u*.25),null,'coral',-u*2);
  const a=H.p(.75,7.1,3.16),sway=Math.sin(t*Math.PI/10)*2;shape(H,R,[[a[0]-13,a[1]],[a[0]+13,a[1]],[a[0]+16+sway,a[1]+50],[a[0]-12+sway,a[1]+51]],'paper',.75,.7);stroke(H,R,[[a[0]-10+sway,a[1]+46],[a[0]+14+sway,a[1]+46]],'teal',.8);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
