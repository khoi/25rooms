import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape, cushion, bentTube, floorLight, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, taskLight } from '../joinery.js';
const ease=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
const open=t=>ease((t-4)/4)*(1-ease((t-12)/6));
const rest=FIGURES.clips.idle.keys[0][1];
FIGURES.clips.amsterdamBreadSeller={dur:20,keys:[[0,{...rest,al:65,ar:105,el:70,er:20}],[.2,{...rest,al:65,ar:105,el:70,er:20}],[.4,{...rest,al:54,ar:135,el:60,er:12,head:-8}],[.6,{...rest,al:62,ar:128,el:70,er:24,head:10}],[.9,{...rest,al:65,ar:105,el:70,er:20}],[1,{...rest,al:65,ar:105,el:70,er:20}]]};
function loaf(H,R,i,j,z,s=1,ink='sun'){
  const [x,y]=H.p(i,j,z);oval(H,R,x,y-4*s,12*s,7*s,ink,.64);
  for(let n=0;n<3;n++)stroke(H,R,[[x+(-6+n*5)*s,y-8*s],[x+(-3+n*5)*s,y-3*s]],'paper',1.6*s);
}
function basket(H,R,i,j,z,w=2.4,d=1.45,full=true){
  shape(H,R,[H.p(i+.2,j+d-.13,z),H.p(i+w-.2,j+d-.13,z),H.p(i+w,j+d,z+.44),H.p(i,j+d,z+.44)],'sun',.7);
  shape(H,R,H.tile(i,j,w,d,z+.45),'blue',.5);
  for(let n=0;n<9;n++)H.line(R,[H.p(i+.18+n*(w-.36)/8,j+d-.07,z+.04),H.p(i+.05+n*(w-.1)/8,j+d,z+.44)],'coral',1);
  for(let n=0;n<4;n++)H.line(R,[H.p(i+.08,j+d,z+.08+n*.1),H.p(i+w-.08,j+d,z+.08+n*.1)],'paper',.7);
  if(full)for(let n=0;n<5;n++)loaf(H,R,i+.45+(n%3)*.66,j+.45+Math.floor(n/3)*.6,z+.51,1.14,n===3?'coral':'sun');
  H.outline(R,H.tile(i,j,w,d,z+.46),'sun',3.2,{amp:.07});
  for(const x of[i+.07,i+w-.07])stroke(H,R,[H.p(x,j+.4,z+.4),H.p(x,j+.6,z+.78),H.p(x,j+1,z+.41)],x===i+.07?'paper':'coral',2);
}
function dresser(H,R){
  cabinetFrame(H,R,.25,.24,9.8,1.25,.13,3.1,4,'sun',(i,j,w,d,z,h,n)=>{
    for(const zz of[z+.83,z+1.7])timber(H,R,i,j,w,d,zz,.09,'sun');
    if(n===0){for(let a=0;a<5;a++){box(H,R,i+.12+a*.38,j+.22,.24,.62,z,.62+a*.08,'paper',1);H.line(R,[H.p(i+.14+a*.38,j+.86,z+.4),H.p(i+.32+a*.38,j+.86,z+.6)],'teal',.7);}basket(H,R,i+.1,j+.1,z+.94,w-.15,.84,false);loaf(H,R,i+.65,j+.5,z+1.85,.6,'teal');}
    if(n===1){for(let a=0;a<4;a++){timber(H,R,i+.05,j+.07+a*.2,w-.1,.11,z+.09,.15,'coral');loaf(H,R,i+.45+a*.35,j+.6,z+.99,.72);}for(let a=0;a<3;a++)loaf(H,R,i+.45+a*.61,j+.6,z+1.8,.8);}
    if(n===2){for(let a=0;a<4;a++)metal(H,R,i+.1,j+.2,w-.2,d-.1,z+.1+a*.14,.06,'teal');vessel(H,R,i+.6,j+.5,z+.96,9,18,'paper',false);drape(H,R,i+.26,j+.22,.68,.57,z+1.58,.16,'coral');cushion(H,R,i+.23,j+.3,w-.4,.61,z+1.84,.21,'paper');}
    if(n===3){box(H,R,i+.16,j+.1,w-.3,.76,z,.59,'teal',.52);for(let a=0;a<4;a++)H.line(R,[H.p(i+.3+a*.41,j+.87,z+.16),H.p(i+.3+a*.41,j+.87,z+.47)],'blue',1);basket(H,R,i+.13,j+.1,z+1.83,w-.26,.8,false);}
  });
  timber(H,R,.18,.18,10,.23,3.27,.13,'coral');
  hangingRail(H,R,'nw',4.8,2.6,2.5,3,(P,u,n)=>{const [x,y]=P(u,0);if(n===0)shape(H,R,[[x-5,y],[x+5,y],[x+10,y+30],[x-9,y+30]],'paper',.9);else {H.line(R,[[x,y],[x,y+18]],'blue',1.2);oval(H,R,x,y+23,5,8,n===1?'sun':'teal');}});
}
function stall(H,R){
  masonry(H,R,'nw',0,12,0,3.6,'paper',.7);masonry(H,R,'ne',0,12,0,.55,'teal',.6);
  windowBay(H,R,'nw',7.7,2.7,1.18,2.08,{divisions:2});
  dresser(H,R);
  for(const i of[1.8,7.8]){timber(H,R,i,3.25,.18,.19,0,3.35,'teal');metal(H,R,i-.03,3.21,.24,.27,0,.16,'blue');}
  timber(H,R,1.76,3.21,6.31,.24,3.31,.21,'teal');
  benchFrame(H,R,1.8,3.4,6.18,2.1,1.22,'sun');
  for(const i of[2.0,5.15]){timber(H,R,i,3.6,2.5,1.63,.28,.1,'teal');basket(H,R,i+.1,3.8,.4,2.15,1.2,false);}
  drape(H,R,2.2,3.55,2.9,1.65,1.24,.29,'paper');
  basket(H,R,2.38,3.7,1.25,2.65,1.43,true);
  timber(H,R,5.65,4.15,1.47,.88,1.24,.08,'sun');
  for(const j of[4.39,4.64])H.line(R,[H.p(5.86,j,1.34),H.p(6.92,j+.1,1.34)],'blue',.7);
  bentTube(H,R,[[6.8,4.4,1.36],[7.29,4.45,1.36],[7.35,4.64,1.36]],1.5,'teal');
  H.line(R,[H.p(5.59,5.06,1.35),H.p(6.29,5.04,1.35)],'blue',3.3);
  metal(H,R,6.3,4.96,.6,.17,1.3,.1,'paper');
  benchFrame(H,R,.5,8.13,2.05,1.37,.72,'teal');
  cushion(H,R,.6,8.2,1.1,.64,.73,.16,'sun');
  const [bx,by]=H.p(1.69,8.9,.73);shape(H,R,[[bx-7,by],[bx+8,by],[bx+11,by+23],[bx-8,by+24]],'coral',.57);stroke(H,R,[[bx-5,by],[bx-4,by-9],[bx+5,by-9],[bx+7,by]],'blue',1.3);
  benchFrame(H,R,8.65,1.93,2.6,1.9,1.03,'teal');
  for(let n=0;n<4;n++){const [x,y]=H.p(9+n*.45,2.45,1.06);shape(H,R,[[x-7,y-18],[x+8,y-15],[x+2,y+1]],'paper',1);H.line(R,[[x-5,y-14],[x+4,y-5]],'coral',.6);}
  cushion(H,R,9.55,2.88,1.1,.65,1.08,.13,'coral');
  for(let n=0;n<3;n++)stroke(H,R,[H.p(8.99,3.4,1.1),H.p(9.18+n*.15,3.6,1.1),H.p(9.42+n*.15,3.4,1.1)],'sun',1);
  basket(H,R,9.25,7.6,.08,2.0,1.6,false);
  timber(H,R,8.8,9.93,2.57,.75,.03,.15,'sun');
  for(let n=0;n<5;n++)metal(H,R,8.9+n*.5,10.05,.29,.5,.2,.06,n%2?'paper':'teal');
  floorLight(H,5.2,6.15,135,.38);taskLight(H,R,10.57,2.17,1.08,'coral',.3);
}
function shutter(H,R,t){
  const f=open(t),ang=f*1.42,hinge=3.37;
  const P=(i,v)=>H.p(i,3.28+Math.sin(ang)*v,hinge-Math.cos(ang)*v);
  const Q=[P(1.84,0),P(7.91,0),P(7.91,1.87),P(1.84,1.87)];shape(H,R,Q,'teal',.42);
  for(let i=2;i<7.9;i+=.48)H.line(R,[P(i,.08),P(i,1.8)],'blue',.65);
  for(const v of[.12,1.73])H.line(R,[P(1.85,v),P(7.92,v)],'paper',2.4);
  for(const i of[2.13,7.59]) {metal(H,R,i,3.19,.35,.26,3.33,.09,'sun');H.line(R,[H.p(i,3.27,2.17),P(i,1.48)],'blue',2.2);oval(H,R,...P(i,1.48),2.8,2.8,'sun');}
  H.line(R,[P(6.96,1.72),P(7.46,1.72)],'sun',2.3);
  actor(H,R,7.65,4.05,t,'amsterdamBreadSeller',{shirt:['teal',.65],apron:['paper',.85],hairStyle:'cap'},0,1.45);
  const hand=FIGURES.pose({who:'adult',at:[7.65,4.05,0],clip:'amsterdamBreadSeller',scale:1.45},t,null,H).nearHand;
  H.line(R,[hand,P(7.54,1.75)],'blue',1.5);oval(H,R,...hand,2.3,2.3,'coral',.3);
}
const room=world('amsterdam-market-bread','The basket behind the shutter',{wall:false,pattern:'tiles',floor:'paper',accent:'teal',head:60},stall,(H,R,time)=>{
  const t=cycle(time,20)*20;shutter(H,R,t);
  actor(H,R,6.7,7.05,2.4*Math.sin(t*Math.PI/20)**2,'talk',{shirt:['coral',.7],hairStyle:'curly',face:'sw'},0,1.4);
  const [x,y]=H.p(9.2,2.5,1.05);stroke(H,R,[[x,y],[x+6,y-9],[x+10,y-15+Math.sin(TAU*time/20)]],'paper',1.2);
});
room.loopSeconds=20;room.stillTime=10;
export default room;
