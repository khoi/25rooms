import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, benchFrame, spokedWheel, drape } from '../materials.js';
import { windowBay, recessedFrame, hangingRail, floorShadow, taskLight, caster } from '../joinery.js';
import { masonry, rackFrame } from '../structure.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function truss(H,R,P,length,height,ink='teal'){
  for(const z of [0,height])H.line(R,[P(0,z),P(length,z)],'blue',3.2);
  for(let n=0;n<5;n++){const a=n*length/5,b=(n+1)*length/5;H.line(R,[P(a,0),P(b,height),P(b,0)],ink,2.5);for(const q of [P(a,0),P(b,height)])H.dot(...q,1.8,'sun',.9);}
}
function person(H,R,i,j,hands,shirt='coral',lean=0){
  const [x,y]=H.p(i,j,0),cx=x+lean;
  oval(H,R,x,y,15,4,'blue',.16);
  for(const side of [-1,1]){stroke(H,R,[[x+side*5,y-25],[x+side*6,y-3]],'blue',7);oval(H,R,x+side*6+2,y-1,6,3,'blue',.85);}
  shape(H,R,[[cx-11,y-49],[cx+10,y-49],[x+10,y-24],[x-10,y-24]],shirt,.72,.9);
  for(let n=0;n<2;n++){const a=[cx+(n?9:-9),y-45],b=hands[n],mid=[(a[0]+b[0])/2+(n?4:-4),Math.max(a[1],b[1])+6];stroke(H,R,[a,mid,b],'blue',8);stroke(H,R,[a,mid,b],shirt,5.5);oval(H,R,...b,3,2.7,'paper',1);}
  oval(H,R,cx,y-60,9,10,'paper',1);shape(H,R,[[cx-9,y-60],[cx-9,y-68],[cx-3,y-72],[cx+7,y-70],[cx+10,y-64],[cx+2,y-65],[cx-3,y-64]],'blue',.85,.7);H.dot(cx+4,y-60,.9,'blue');
}
function boat(H,R,i,j,z){const [x,y]=H.p(i,j,z);shape(H,R,[[x-19,y-2],[x+10,y-5],[x+20,y],[x+8,y+7],[x-14,y+5]],'coral',.68,.7);shape(H,R,[[x-13,y-2],[x+8,y-4],[x+13,y],[x+6,y+3],[x-10,y+2]],'paper',1,.5);shape(H,R,[[x+10,y-4],[x+18,y],[x+12,y+3],[x+8,y]],'teal',.7,.6);metal(H,R,i-.2,j-.1,.37,.32,z,.22,'sun');}
const room=world('paris-canal-bridge-study','The span folds on the desk',{floor:'paper',tone:.45,wall:'paper',wallTone:.82,height:3.75,head: 20},(H,R)=>{
  masonry(H,R,'ne',.1,11.7,0,1.1,'paper',.72);
  windowBay(H,R,'nw',1.25,8.9,2.35,1.1,{divisions:5,view:P=>{shape(H,R,[P(.1,.15),P(8.8,.15),P(8.8,.47),P(.1,.35)],'teal',.15,.4);}});
  bentTube(H,R,[[.18,.4,3.72],[.18,11.4,3.72]],3.8,'blue');
  for(let n=0;n<5;n++)bentTube(H,R,[[.2,.6+n*2.1,3.72],[.2,1.65+n*2.1,3.18],[.2,2.7+n*2.1,3.72]],2.2,'teal');
  const board=recessedFrame(H,R,'ne',1.45,4.45,1.52,1.83,'sun',(P)=>{
    shape(H,R,[P(.13,.13),P(4.32,.13),P(4.32,1.7),P(.13,1.7)],'paper',1,.4);
    truss(H,R,(a,z)=>P(.38+a,.47+z),3.68,.64,'teal');
    H.line(R,[P(.35,.35),P(4.07,.35)],'coral',1);for(const u of [.36,1.58,2.83,4.05])H.line(R,[P(u,.26),P(u,.42)],'blue',.6);
  });
  H.line(R,[wallPt(H,'ne',6.2,3.48,-.09),wallPt(H,'ne',11.5,3.48,-.09),wallPt(H,'ne',11.5,.4,-.09)],'blue',2.6);
  for(let u=6.5;u<11.5;u+=.9)H.line(R,[wallPt(H,'ne',u,3.4,-.15),wallPt(H,'ne',u,3.57,-.15)],'sun',2.1);
  rackFrame(H,R,7.25,.55,4.1,1.15,.08,[.35,1.35,2.35,3.1],'teal',(x,j,w,d,z,row)=>{
    if(row===0){for(let n=0;n<3;n++){metal(H,R,x+n*1.22,j,.99,.78,z,.56,n===1?'paper':'teal');H.line(R,[H.p(x+.26+n*1.22,j+.81,z+.32),H.p(x+.64+n*1.22,j+.81,z+.32)],'blue',2);}}
    if(row===1){for(let n=0;n<5;n++){const p=H.p(x+.33+n*.71,j+.48,z+.07);spokedWheel(H,R,...p,10+n%2*3,n===2?'coral':'sun',.2);}}
    if(row===2){for(let n=0;n<5;n++)timber(H,R,x+.07+n*.73,j+.08,.3,.77,z,.36+n%2*.22,n===3?'paper':'sun');}
    if(row===3){boat(H,R,x+.86,j+.42,z+.04);truss(H,R,(a,h)=>H.p(x+1.88+a,j+.6,z+.03+h),1.85,.48);}
  });
  recessedFrame(H,R,'nw',1.5,6.9,1.02,1.1,'teal',P=>{
    shape(H,R,[P(.12,.12),P(6.78,.12),P(6.78,.98),P(.12,.98)],'sun',.19,.4);
    for(let n=0;n<4;n++){
      const u=.48+n*1.57;
      H.line(R,[P(u,.72),P(u+.81,.72)],'blue',2);
      for(const a of [u,u+.8]){H.line(R,[P(a,.79),P(a,.57),P(a+.05,.5)],'teal',2);H.dot(...P(a,.8),1.5,'sun');}
      if(n===0){for(let k=0;k<4;k++)H.line(R,[P(u+.17+k*.18,.28),P(u+.17+k*.18,.66)],'sun',3);}
      if(n===1){const q=P(u+.42,.39);spokedWheel(H,R,...q,13,'sun',.2);}
      if(n===2){H.line(R,[P(u+.12,.2),P(u+.12,.61),P(u+.7,.61),P(u+.7,.2)],'teal',3);H.line(R,[P(u+.23,.2),P(u+.23,.38),P(u+.6,.38),P(u+.6,.2)],'blue',2);}
      if(n===3){shape(H,R,[P(u+.06,.22),P(u+.76,.22),P(u+.76,.62)],'paper',1,.7);H.line(R,[P(u+.38,.32),P(u+.64,.32),P(u+.64,.48)],'teal',1);}
    }
  });
  for(const j of [1.5,7.74]){timber(H,R,.43,j,1.36,.24,.05,.81,'teal');bentTube(H,R,[[.51,j,.24],[1.65,j,.78]],2,'sun');}
  timber(H,R,.41,1.48,1.53,6.53,.8,.13,'sun');
  timber(H,R,.48,1.61,1.27,6.19,.24,.1,'teal');
  for(let n=0;n<4;n++){
    const j=1.74+n*1.44;timber(H,R,.6,j,1.0,1.21,.35,.31,n===2?'paper':'sun');
    shape(H,R,H.faceJ(1.62,j+.12,.96,.43,.59),'blue',.34,.55);
    H.line(R,[H.p(1.65,j+.32,.52),H.p(1.65,j+.79,.52)],'sun',1.8);
  }
  const plan=(j)=>{
    const P=(a,b)=>H.p(.62+a, j+b, .96+a*.19);
    shape(H,R,[P(0,0),P(1.06,0),P(1.06,1.62),P(0,1.62)],'paper',1,.8);
    for(let n=0;n<4;n++)H.line(R,[P(.13,.18+n*.36),P(.89,.31+n*.36)],'teal',.65);
    H.line(R,[P(.2,.2),P(.73,.67),P(.31,1.12),P(.85,1.46)],'coral',1.2);
  };plan(2.16);
  boat(H,R,1.14,5.1,.95);
  for(let n=0;n<3;n++)timber(H,R,.72,6.17+n*.23,.87,.17,.95,.12,n===1?'coral':'sun');
  taskLight(H,R,.77,1.68,.95,'sun',.65);
  floorShadow(H,2.1,3.65,7.8,3.4,.25);
  for(const x of [2.29,8.98]){
    for(const j of [3.9,6.61])metal(H,R,x,j,.25,.24,.02,1.0,'teal');
    bentTube(H,R,[[x+.12,3.98,.17],[x+.12,6.59,.89],[x+.12,6.59,.17],[x+.12,3.98,.89]],2.4,'sun');
    metal(H,R,x-.13,3.82,.51,3.0,.02,.12,'blue');
  }
  timber(H,R,2.35,4.01,6.91,2.44,.34,.1,'teal');
  timber(H,R,2.05,3.65,7.65,3.35,.92,.13,'sun');
  shape(H,R,H.faceI(2.31,6.87,7.07,.65,.9),'teal',.54,.75);
  for(let n=0;n<3;n++){
    const x=4.78+n*1.22;timber(H,R,x,5.89,1.1,.83,.44,.18,'sun');
    shape(H,R,H.tile(x+.07,5.97,.94,.68,.63),'blue',.61,.6);
    if(n===0){for(let k=0;k<3;k++)oval(H,R,...H.p(x+.26+k*.29,6.31,.65),5,3,'paper',1);}
    if(n===1){for(let k=0;k<3;k++)H.line(R,[H.p(x+.19,6.02+k*.2,.66),H.p(x+.93,6.02+k*.2,.66)],'sun',3);}
    if(n===2){spokedWheel(H,R,...H.p(x+.57,6.31,.66),11,'coral',.1,.42);}
  }
  timber(H,R,2.25,3.8,7.18,3.02,1.05,.12,'teal');
  shape(H,R,H.tile(4.28,3.97,3.87,2.55,1.185),'teal',.38,.8);
  for(let n=0;n<7;n++)H.line(R,[H.p(4.5+n*.46,4.1,1.194),H.p(4.63+n*.46,6.35,1.194)],'paper',.8,{tone:.65});
  for(const x of [3.53,8.03]){
    timber(H,R,x,4.0,.67,2.47,1.18,.37,x===3.53?'paper':'sun');
    for(let n=0;n<5;n++)H.line(R,[H.p(x+.04,4.08+n*.43,1.57),H.p(x+.61,4.08+n*.43,1.57)],'blue',.55);
    metal(H,R,x+.11,4.1,.22,2.27,1.56,.08,'teal');
  }
  for(const j of [3.82,6.54]){
    timber(H,R,4.28,j,3.78,.16,1.19,.13,'paper');
    for(let n=0;n<5;n++){
      metal(H,R,4.49+n*.69,j,.12,.16,1.33,.12,'teal');
      oval(H,R,...H.p(4.55+n*.69,j+.1,1.51),3.1,2,'sun',.8);
    }
    bentTube(H,R,[[4.53,j+.08,1.49],[7.95,j+.08,1.49]],1.3,'blue');
  }
  for(let n=0;n<3;n++)timber(H,R,8.72,4.28+n*.38,.53,.41,1.19,.11+n*.1,'paper');
  for(const y of [4.15,6.13]){metal(H,R,4.01,y,.32,.3,1.3,.69,y===4.15?'teal':'coral');oval(H,R,...H.p(4.17,y+.18,1.78),5.2,4,'sun',.8);}
  bentTube(H,R,[[4.18,4.06,1.78],[4.18,6.55,1.78]],4,'blue');
  for(const x of [2.6,3.6])metal(H,R,x,4.45,.1,.1,1.2,1.83,'teal');
  for(const z of [1.27,2.95])metal(H,R,2.55,4.42,1.15,.16,z,.08,'teal');
  metal(H,R,2.68,4.4,.78,.24,1.24,.12,'coral');
  const crank=H.p(4.18,6.63,1.47);oval(H,R,...crank,18,16,'paper',1);oval(H,R,...crank,15,13,'teal',.5);
  for(let n=0;n<8;n++){const a=n*Math.PI/4;H.line(R,[[crank[0]+Math.cos(a)*16,crank[1]+Math.sin(a)*14],[crank[0]+Math.cos(a)*20,crank[1]+Math.sin(a)*18]],'blue',1.5);}
  bentTube(H,R,[[4.18,6.51,1.47],[4.18,6.29,1.7],[4.18,6.29,1.78]],2.5,'sun');
  const gear=H.p(4.17,6.3,1.81);spokedWheel(H,R,...gear,12,'sun',.2,.82);
  for(let n=0;n<12;n++){const a=n*Math.PI/6;H.line(R,[[gear[0]+Math.cos(a)*11,gear[1]+Math.sin(a)*9],[gear[0]+Math.cos(a)*14,gear[1]+Math.sin(a)*12]],'blue',2);}
  H.line(R,[H.p(4.22,6.48,1.73),H.p(4.5,6.48,1.73),H.p(4.5,6.48,2.09),H.p(4.17,6.48,2.2)],'teal',2.7);
  for(const x of [2.66,3.67]){metal(H,R,x,4.44,.18,.16,1.22,.13,'blue');H.dot(...H.p(x+.09,4.52,1.36),1.7,'paper');}
  metal(H,R,9.03,5.17,.55,.84,1.18,.13,'blue');metal(H,R,9.15,5.24,.25,.61,1.31,.25,'teal');
  bentTube(H,R,[[9.5,5.42,1.39],[9.71,5.42,1.39],[9.71,5.42,1.2]],1.8,'sun');
  boat(H,R,6.65,4.76,1.2);
  const coil=H.p(7.62,5.51,1.23);for(let n=0;n<4;n++)H.outline(R,ell(coil[0],coil[1],4+n*2,2+n*.8),'sun',1,{amp:.1});
  benchFrame(H,R,.85,8.8,5.0,1.2,.7,'teal');
  truss(H,R,(a,z)=>H.p(1.12+a,9.15,.73+z),2.28,.54,'sun');
  metal(H,R,3.7,8.98,.43,.61,.72,.1,'blue');metal(H,R,3.8,9.15,.22,.25,.83,.32,'sun');
  const pin=H.p(4.71,9.32,.73);oval(H,R,...pin,11,5,'teal',.6);oval(H,R,...pin,4.5,2.2,'paper',1);
  benchFrame(H,R,9.65,8.75,1.68,2.4,.7,'sun');drape(H,R,9.77,8.92,1.4,1.68,.73,.38,'paper');
  for(let n=0;n<2;n++){metal(H,R,9.9,9.13+n*.66,1.04,.51,.75,.2,'teal');shape(H,R,H.tile(10.14,9.22+n*.66,.58,.31,.965),'blue',.7,.5);}
  for(const [i,j] of [[9.77,8.86],[11.18,8.86],[9.77,11.04],[11.18,11.04]])caster(H,R,i,j,.02);
  timber(H,R,9.72,8.87,1.48,2.09,.29,.07,'teal');
  for(let n=0;n<3;n++)timber(H,R,9.86,9.12+n*.48,1.12,.39,.38,.11,'paper');
  shape(H,R,[H.p(9.7,8.84,.78),H.p(11.29,8.84,.78),H.p(11.29,8.57,1.74),H.p(9.7,8.57,1.74)],'sun',.5,.8);
  shape(H,R,[H.p(9.84,8.82,.94),H.p(11.13,8.82,.94),H.p(11.13,8.64,1.57),H.p(9.84,8.64,1.57)],'paper',.76,.6);
  for(const x of [9.95,11.03])H.line(R,[H.p(x,8.89,.8),H.p(x,8.67,1.56)],'teal',1.7);
  timber(H,R,6.63,9.34,1.62,1.05,.05,.1,'teal');
  for(const x of [6.82,8.04]){timber(H,R,x,9.65,.13,.14,.16,.64,'sun');metal(H,R,x-.07,9.57,.27,.31,.1,.07,'blue');}
  stroke(H,R,[H.p(6.86,9.72,.8),H.p(7.45,9.72,.54),H.p(8.09,9.72,.8)],'sun',2.2);
  metal(H,R,7.28,9.53,.39,.38,.28,.18,'coral');H.line(R,[H.p(7.49,9.71,.55),H.p(7.49,9.71,.47)],'blue',1);
  for(let n=0;n<4;n++)timber(H,R,4.96,8.91+n*.2,.61,.15,.73,.07+n*.025,['paper','teal','sun','coral'][n]);
  hangingRail(H,R,'nw',9.5,1.7,2.02,3,(P,u,n)=>{H.line(R,[P(u,-.15),P(u,-.75)],'blue',1.4);shape(H,R,[P(u-.12,-.7),P(u+.12,-.7),P(u+.16,-1.0),P(u-.16,-1.0)],n===1?'sun':'teal',.7,.6);});
},(H,R,t)=>{
  const u=((t%18)+18)%18,rise=ease(3.6,7.2,u)*(1-ease(10.8,16,u)),angle=rise*.91;
  const P=(x,y,z=0)=>H.p(4.18+x*Math.cos(angle),4.22+y,1.78+x*Math.sin(angle)+z);
  const length=3.89,width=1.8;
  shape(H,R,[P(0,0),P(length,0),P(length,width),P(0,width)],'sun',.7,.9);
  shape(H,R,[P(0,width),P(length,width),P(length,width,-.13),P(0,width,-.13)],'sun',.48,.7);
  for(let n=0;n<15;n++)H.line(R,[P(.12+n*.25,.04,.015),P(.12+n*.25,width-.04,.015)],'blue',.6);
  for(let n=0;n<5;n++){const x=.25+n*.83;H.line(R,[P(x,0,-.15),P(x,width,-.15)],'teal',2.5);}
  for(const y of [0,width])truss(H,R,(a,z)=>P(a,y,z),length,.49,'teal');
  const cable=Math.hypot(1.1+.9*Math.cos(angle),1.12-.9*Math.sin(angle)),weightZ=2.42-(Math.hypot(2,1.12)-cable);
  const pulley=H.p(3.09,4.53,3.0),attached=P(.9,.31,.1),end=H.p(3.09,4.53,weightZ+.29);
  H.line(R,[attached,pulley,end],'sun',2.7);H.line(R,[attached,pulley,end],'blue',.65);oval(H,R,...pulley,5.1,4.4,'sun',.8);H.dot(...pulley,1.5,'blue');
  metal(H,R,2.71,4.5,.81,.52,weightZ,.29,'blue');for(let k=0;k<3;k++)H.line(R,[H.p(2.75,5.03,weightZ+.07+k*.07),H.p(3.47,5.03,weightZ+.07+k*.07)],'paper',.6);
  const crank=H.p(4.18,6.66,1.47),a=rise*Math.PI*2.2,grip=[crank[0]+Math.cos(a)*12,crank[1]+Math.sin(a)*10];
  H.line(R,[crank,grip],'blue',3.8);oval(H,R,...grip,4.2,3.6,'sun',.9);H.line(R,[[grip[0]-2,grip[1]-1],[grip[0]+1,grip[1]+1]],'paper',1.3);
  person(H,R,4.55,7.42,[H.p(4.41,7.1,1.08),grip],'coral',-2);
  const look=ease(7.2,8.5,u)*(1-ease(10.8,12,u)),pointer=H.p(8.25-look*.2,6.65,1.58+look*.14);
  person(H,R,8.6,7.4,[H.p(8.65,7.0,1.15),pointer],'teal',-look*4);
  const flutter=Math.sin(u*Math.PI/9)*.03;shape(H,R,[wallPt(H,'ne',6.1,1.6,-.16),wallPt(H,'ne',6.8,1.6+flutter,-.16),wallPt(H,'ne',6.8,2.58,-.16),wallPt(H,'ne',6.1,2.58,-.16)],'paper',1,.6);
  H.line(R,[wallPt(H,'ne',6.22,1.9,-.18),wallPt(H,'ne',6.68,2.3,-.18)],'teal',1.4);
});
room.loopSeconds=18;
room.stillTime=5.4;
export default room;
