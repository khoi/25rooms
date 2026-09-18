import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape, cushion, bentTube, floorLight, vessel, surface } from '../materials.js';
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
  shape(H,R,[H.p(i+w-.2,j+.12,z),H.p(i+w-.2,j+d-.13,z),H.p(i+w,j+d,z+.44),H.p(i+w,j,z+.44)],'coral',.45);
  for(let n=0;n<5;n++)H.line(R,[H.p(i+w-.15,j+.15+n*(d-.3)/4,z+.05),H.p(i+w,j+.07+n*(d-.14)/4,z+.43)],'sun',1.3);
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
  for(const i of[.4,3.1,6.4,9.55])bentTube(H,R,[[i,.22,3.26],[i,.89,3.58],[i,.89,3.79]],2,'blue');
  timber(H,R,.22,.26,9.79,.7,3.67,.1,'sun');
  for(const [i,w]of[[.57,1.3],[2.19,.87],[3.54,1.7],[5.76,1.23],[7.8,1.22]]){
    const [x,y]=H.p(i,.75,3.81);shape(H,R,[[x-11*w,y],[x+11*w,y],[x+11*w,y-17],[x+5*w,y-24],[x+3*w,y-35],[x-3*w,y-35],[x-5*w,y-24],[x-11*w,y-17]],i>5?'teal':'sun',.49);H.dot(x,y-29,2.2,'blue');
    for(let n=0;n<3;n++)H.line(R,[[x-7*w,y-5-n*4],[x+6*w,y-5-n*4]],'paper',.7);
  }
  for(const i of[.52,2.89,5.35,7.78]){
    surface(H,R,H.faceI(i,1.51,2.02,.16,.56),'coral',.46);
    H.line(R,[H.p(i+.72,1.53,.4),H.p(i+1.21,1.53,.4)],'sun',2);
  }
  surface(H,R,H.faceI(8.01,1.59,1.54,.75,1.28),'blue',.65);
  timber(H,R,8.07,1.46,1.46,.79,.76,.065,'sun');
  cushion(H,R,8.19,1.6,1.15,.54,.83,.11,'paper');
  surface(H,R,H.faceI(8.06,2.24,1.46,.78,.99),'sun',.72);
  hangingRail(H,R,'nw',4.8,2.6,2.5,3,(P,u,n)=>{const [x,y]=P(u,0);if(n===0)shape(H,R,[[x-5,y],[x+5,y],[x+10,y+30],[x-9,y+30]],'paper',.9);else {H.line(R,[[x,y],[x,y+18]],'blue',1.2);oval(H,R,x,y+23,5,8,n===1?'sun':'teal');}});
}
function stall(H,R){
  masonry(H,R,'nw',0,12,0,3.6,'paper',.7);masonry(H,R,'ne',0,12,0,.55,'teal',.6);
  windowBay(H,R,'nw',7.7,2.7,1.18,2.08,{divisions:2});
  for(const j of[.32,4.63,11.7])timber(H,R,.11,j,.19,.16,.08,3.55,'teal');
  timber(H,R,.1,.18,.24,11.62,3.52,.14,'sun');
  dresser(H,R);
  for(const j of[6.32,7.08])timber(H,R,.18,j,1.65,.1,.72,.1,'teal');
  timber(H,R,.18,5.99,1.65,1.47,.69,.13,'sun');
  for(let n=0;n<4;n++)metal(H,R,.39,6.2,1.19,.99,.85+n*.13,.07,'teal');
  surface(H,R,H.tile(.5,6.3,.95,.76,1.37),'paper',1);
  for(let n=0;n<4;n++)H.line(R,[H.p(.58,6.38+n*.15,1.39),H.p(1.34,6.38+n*.15,1.39)],'coral',.8);
  bentTube(H,R,[[.28,7.64,.09],[.28,7.64,2.37],[.5,7.64,2.37]],1.8,'teal');
  const [sx,sy]=H.p(.41,7.61,1.84);shape(H,R,[[sx-8,sy],[sx+7,sy],[sx+9,sy+23],[sx-8,sy+25]],'coral',.57);H.line(R,[[sx-4,sy+2],[sx-3,sy+21]],'sun',1.1);
  for(const i of[1.8,7.8]){timber(H,R,i,3.25,.18,.19,0,3.35,'teal');metal(H,R,i-.03,3.21,.24,.27,0,.16,'blue');}
  timber(H,R,1.76,3.21,6.31,.24,3.31,.21,'teal');
  benchFrame(H,R,1.8,3.4,6.18,2.1,1.22,'sun');
  for(const i of[1.94,7.67]){timber(H,R,i,3.55,.15,1.76,.11,1.13,'teal');bentTube(H,R,[[i,3.68,.25],[i,5.18,1.08]],1.8,'blue');}
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
  timber(H,R,8.83,2.12,2.18,1.51,.23,.1,'sun');
  for(let n=0;n<5;n++)surface(H,R,H.tile(8.99+n*.04,2.31,1.3,.84,.34+n*.045),'paper',1);
  for(const i of[9.43,10.94])metal(H,R,i,3.32,.12,.13,1.12,.52,'blue');
  bentTube(H,R,[[9.43,3.39,1.55],[10.98,3.39,1.55]],5.3,'paper');
  for(let n=0;n<4;n++)H.line(R,[H.p(9.52,3.39,1.5+n*.025),H.p(10.89,3.39,1.5+n*.025)],'sun',.7);
  surface(H,R,[H.p(9.59,3.4,1.49),H.p(10.75,3.4,1.49),H.p(10.78,3.91,1.13),H.p(9.58,3.91,1.13)],'paper',1);
  metal(H,R,10.5,2.06,.48,.47,1.11,.19,'teal');
  oval(H,R,...H.p(10.74,2.3,1.34),9,5,'paper');oval(H,R,...H.p(10.74,2.33,1.2),4.5,4.5,'sun');
  cushion(H,R,9.55,2.88,1.1,.65,1.08,.13,'coral');
  for(let n=0;n<3;n++)stroke(H,R,[H.p(8.99,3.4,1.1),H.p(9.18+n*.15,3.6,1.1),H.p(9.42+n*.15,3.4,1.1)],'sun',1);
  benchFrame(H,R,8.93,7.23,2.42,1.83,.42,'sun');
  basket(H,R,9.05,7.35,.46,2.17,1.56,false);
  drape(H,R,9.38,7.62,.96,.89,.91,.39,'paper');
  loaf(H,R,10.35,8.2,.97,1.3);
  for(const i of[9.13,11.06])oval(H,R,...H.p(i,8.87,.19),4.3,4.3,'blue');
  bentTube(H,R,[[9.14,7.36,.39],[9.14,7.13,1.55],[11.06,7.13,1.55],[11.06,7.36,.39]],2.2,'teal');
  benchFrame(H,R,2.9,9.55,3.3,1.56,.75,'sun');
  for(const i of[3.07,4.15,5.22]){
    surface(H,R,[H.p(i,9.77,.79),H.p(i+.79,9.77,.79),H.p(i+.79,10.86,1.14),H.p(i,10.86,1.14)],'teal',.44);
    loaf(H,R,i+.38,10.01,.99,.89,i>5?'coral':'sun');loaf(H,R,i+.38,10.55,1.15,.84);
    timber(H,R,i-.02,10.9,.85,.09,1.09,.15,'sun');
  }
  timber(H,R,3.07,9.78,2.91,1.02,.21,.08,'teal');
  for(let n=0;n<4;n++)surface(H,R,H.tile(3.23+n*.03,9.97,.97,.69,.32+n*.035),'paper',1);
  const [wx,wy]=H.p(5.2,10.18,.33);oval(H,R,wx,wy,10,5,'coral');H.line(R,[[wx-7,wy],[wx+7,wy]],'sun',1.7);
  timber(H,R,8.8,9.93,2.57,.75,.03,.15,'sun');
  for(let n=0;n<5;n++)metal(H,R,8.9+n*.5,10.05,.29,.5,.2,.06,n%2?'paper':'teal');
  floorLight(H,5.2,6.15,135,.38);taskLight(H,R,10.57,2.17,1.08,'coral',.3);
}
function shutter(H,R,t){
  const f=open(t),ang=f*1.42,hinge=3.37;
  const P=(i,v)=>H.p(i,3.28+Math.sin(ang)*v,hinge-Math.cos(ang)*v);
  const Q=[P(1.84,0),P(7.91,0),P(7.91,1.87),P(1.84,1.87)];shape(H,R,Q,'teal',.42);
  for(let i=2;i<7.9;i+=.48)H.line(R,[P(i,.08),P(i,1.8)],'blue',.65);
  for(const i of[2.1,4.8,7.65])H.line(R,[P(i,.07),P(i,1.79)],'teal',4.4);
  H.line(R,[P(2.12,.19),P(4.78,1.65),P(7.62,.19)],'sun',2.5);
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
