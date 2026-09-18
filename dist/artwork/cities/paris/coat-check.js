import { world, shape, oval, stroke, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, benchFrame, cushion, vessel, drape } from '../materials.js';
import { windowBay, recessedFrame, floorShadow, caster, hangingRail, taskLight, wallCourse, cornice } from '../joinery.js';
import { cabinetFrame, boardFloor } from '../structure.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function coat(H,R,x,y,w=37,h=86,ink='paper',open=0,sway=0){
  const P=(a,b)=>[x+a*w*(.88+.12*Math.cos(open*Math.PI)),y+b*h+sway*b];
  const contour=[[-.15,0],[-.48,.12],[-.8,.38],[-.58,.47],[-.43,.3],[-.37,1],[.37,1],[.43,.3],[.61,.45],[.81,.35],[.48,.1],[.15,0]].map(p=>P(...p));
  shape(H,R,contour,ink,ink==='paper'?1:.6,.9);
  shape(H,R,[P(-.08,.04),P(.08,.04),P(.17,.3),P(.12,.95),P(-.12,.96),P(-.18,.32)],'blue',.44,.6);
  if(open>.01){const lining=[P(-.08,.05),P(-.38-open*.18,.2),P(-.43-open*.12,.95),P(.35+open*.11,.96),P(.43+open*.16,.22),P(.08,.05)];shape(H,R,lining,'coral',.3+open*.4,.75);
    stroke(H,R,[P(-.04,.1),P(-.04,.95)],'sun',1.1);shape(H,R,[P(.07,.45),P(.35,.43),P(.36,.69),P(.09,.72)],'paper',.86,.6);
    shape(H,R,[P(.12,.59),P(.31,.57),P(.31,.67),P(.12,.68)],'teal',.65,.55);
    for(let n=0;n<4;n++)H.line(R,[P(.13+n*.05,.58),P(.14+n*.05,.68)],'sun',.6);
  }
  for(const a of [-.32,.27])stroke(H,R,[P(a,.23),P(a*.81,.61),P(a*.93,.96)],'blue',.8,.55);
  stroke(H,R,[P(-.33,.97),P(0,.98),P(.33,.97)],'sun',1.1);
  for(let n=0;n<3;n++)H.dot(...P(.11,.32+n*.17),1.4,'sun');
  for(const a of [-.32,.26]){
    stroke(H,R,[P(a,.52),P(a+.11,.51),P(a+.13,.64),P(a+.02,.66)],'sun',1.05);
    for(let n=0;n<5;n++)H.line(R,[P(a+.02+n*.02,.62),P(a+.026+n*.02,.65)],'paper',.5);
  }
  H.line(R,[P(-.73,.36),P(-.57,.44)],'paper',1.3);H.line(R,[P(.59,.42),P(.74,.34)],'paper',1.3);
  stroke(H,R,[P(-.42,.09),P(0,-.03),P(.42,.09)],'blue',2.8);
  stroke(H,R,[P(0,-.03),P(0,-.15),P(.08,-.19),P(.15,-.14),P(.1,-.1)],'blue',1.2);
}
function person(H,R,i,j,hands,ink='teal',lean=0){
  const [x,y]=H.p(i,j,0),cx=x+lean;oval(H,R,x,y+1,16,4,'blue',.15);
  for(const k of [-1,1]){stroke(H,R,[[x+k*5,y-27],[x+k*7,y-2]],'blue',7);oval(H,R,x+k*7+2,y,6,3,'blue',.85);}
  shape(H,R,[[cx-11,y-52],[cx+11,y-52],[x+10,y-24],[x-10,y-24]],ink,.7,.8);
  for(let n=0;n<2;n++){const a=[cx+(n?9:-9),y-48],b=hands[n],el=[(a[0]+b[0])/2+(n?4:-4),Math.max(a[1],b[1])+6];stroke(H,R,[a,el,b],'blue',8);stroke(H,R,[a,el,b],ink,5.6);oval(H,R,...b,3,2.8,'paper',1);}
  oval(H,R,cx,y-63,9,10,'paper',1);shape(H,R,[[cx-10,y-61],[cx-10,y-70],[cx-3,y-76],[cx+8,y-73],[cx+10,y-66],[cx+3,y-68],[cx-5,y-65]],'blue',.87,.8);H.dot(cx+4,y-62,.9,'blue');
}
function hatbox(H,R,i,j,z,ink='paper',odd=false){
  vessel(H,R,i,j,z,20,21,ink,false);const [x,y]=H.p(i,j,z);H.line(R,[[x-19,y-12],[x+19,y-12]],'coral',2.7);H.line(R,[[x-5,y-24],[x+6,y]],'teal',2.3);
  if(odd)shape(H,R,[[x+9,y-20],[x+19,y-20],[x+19,y-11],[x+9,y-11]],'blue',.72,.6);
}
const room=world('paris-coat-check','The pockets are empty',{floor:'sun',tone:.13,wall:'paper',wallTone:.8,height:4.12,head: 30,pattern:'boards'},(H,R)=>{
  wallCourse(H,R,'nw',.13,11.72,.47,'teal');wallCourse(H,R,'ne',.13,11.72,.47,'teal');
  cornice(H,R,'nw',.1,11.82,4.06,'sun');cornice(H,R,'ne',.1,11.82,4.06,'sun');
  for(const j of [2.1,6.11])timber(H,R,.28,j,.48,.23,.06,3.77,'sun');
  windowBay(H,R,'ne',1.18,5.7,2.96,.9,{divisions:3,view:P=>{shape(H,R,[P(.15,.15),P(5.55,.15),P(5.55,.45),P(.15,.45)],'teal',.18,.4);}});
  const M=recessedFrame(H,R,'nw',2.1,4.1,.36,3.52,'sun',P=>{
    shape(H,R,[P(.13,.13),P(3.97,.13),P(3.97,3.39),P(.13,3.39)],'teal',.13,.4);
    shape(H,R,[P(1.78,.37),P(2.54,.37),P(2.63,2.06),P(2.35,2.31),P(2.06,2.12)],'coral',.17,.4);
    H.line(R,[P(.47,.36),P(1.28,3.12)],'paper',3);H.line(R,[P(2.91,.34),P(3.51,2.79)],'paper',1.3);
  });
  for(const u of [.12,3.98])for(let n=0;n<7;n++){const p=M(u,.3+n*.46,.24);oval(H,R,...p,3.5,3.5,'sun',.8);H.glow(p[0],p[1],10,10,'sun',.12);}
  benchFrame(H,R,.5,2.43,1.23,3.5,.76,'sun');
  for(let n=0;n<3;n++){
    const j=2.57+n*1.06;
    shape(H,R,H.faceJ(1.76,j,.92,.4,.65),'teal',.55,.7);
    H.line(R,[H.p(1.79,j+.28,.55),H.p(1.79,j+.67,.55)],'sun',1.8);
  }
  drape(H,R,.66,2.64,.91,.74,.78,.3,'paper');
  const brush=H.p(1.03,3.81,.78);oval(H,R,...brush,13,5,'sun',.8);for(let n=0;n<7;n++)H.line(R,[[brush[0]-9+n*3,brush[1]],[brush[0]-9+n*3,brush[1]+4]],'blue',.75);H.line(R,[[brush[0]+11,brush[1]],[brush[0]+23,brush[1]+2]],'sun',4);
  const pins=H.p(1.08,4.48,.79);oval(H,R,...pins,10,6,'coral',.78);for(let n=0;n<5;n++){H.line(R,[[pins[0]-6+n*3,pins[1]-2],[pins[0]-9+n*5,pins[1]-11]],'blue',.6);H.dot(pins[0]-9+n*5,pins[1]-11,1.3,'paper');}
  const collar=H.p(1.06,5.37,.79);shape(H,R,[[collar[0]-14,collar[1]],[collar[0]-4,collar[1]-9],[collar[0]+3,collar[1]-3],[collar[0]+10,collar[1]-8],[collar[0]+15,collar[1]+4],[collar[0]+3,collar[1]+7]],'paper',1,.7);H.line(R,[[collar[0]-4,collar[1]-7],[collar[0],collar[1]+5],[collar[0]+10,collar[1]-7]],'teal',.7);
  const sketch=(u,z,w,h)=>{
    const P=(a,b)=>wallPt(H,'ne',u+a*w,z+b*h,-.16);
    shape(H,R,[P(0,0),P(1,0),P(1,1),P(0,1)],'paper',1,.55);
    shape(H,R,[P(.25,.13),P(.76,.13),P(.67,.66),P(.84,.57),P(.91,.71),P(.62,.9),P(.39,.9),P(.08,.72),P(.17,.57),P(.32,.67)],'coral',.52,.5);
    H.line(R,[P(.5,.83),P(.5,.18)],'teal',.8);H.dot(...P(.5,.97),1.4,'sun');
  };
  sketch(7.02,2.83,.55,.72);sketch(7.34,2.7,.72,.94);
  for(let n=0;n<7;n++)H.line(R,[wallPt(H,'ne',10.1+n*.18,3.5,-.15),wallPt(H,'ne',10.1+n*.18,3.71,-.15)],'blue',1.5);
  floorShadow(H,7.78,.64,3.49,1.8,.2);
  cabinetFrame(H,R,7.75,.62,3.53,1.55,.08,3.54,2,'teal',(x,j,w,d,z,h,col)=>{
    for(let row=0;row<4;row++){const zz=z+row*.78;timber(H,R,x,j,w,d,zz,.11,'sun');
      if(row===0){for(let n=0;n<2;n++){const p=H.p(x+.36+n*.73,j+.75,zz+.14);oval(H,R,...p,11,4,'blue',.7);shape(H,R,[[p[0]-7,p[1]-1],[p[0]+7,p[1]-1],[p[0]+4,p[1]-9],[p[0]-4,p[1]-10]],n?'coral':'paper',n?.6:1,.6);}}
      else if(row===1){shape(H,R,H.faceI(x+.06,j+d,w-.12,zz+.12,zz+.54),'sun',.5,.6);H.line(R,[H.p(x+.54,j+d+.03,zz+.33),H.p(x+.92,j+d+.03,zz+.33)],'blue',2);}
      else if(row===2)hatbox(H,R,x+w*.5,j+.65,zz+.15,col?'sun':'paper',!!col);
      else {for(let n=0;n<3;n++)timber(H,R,x+.14,j+.12+n*.28,w-.28,.22,zz+.12,.17,n===1?'paper':'coral');}
    }
  });
  taskLight(H,R,9.37,1.07,3.74,'sun',.5);
  hangingRail(H,R,'ne',6.35,.98,2.81,2,(P,u,n)=>{shape(H,R,[P(u-.17,-.12),P(u+.19,-.12),P(u+.2,-1.32),P(u-.2,-1.37)],n?'paper':'teal',n?1:.44,.6);H.line(R,[P(u,-.14),P(u,-1.25)],'blue',.5);});
  hangingRail(H,R,'nw',7.68,3.19,3.33,4,(P,u,n)=>{
    if(n===0){const p=P(u,-.38);oval(H,R,...p,12,5,'sun',.7);oval(H,R,p[0],p[1]-7,6,9,'sun',.75);}
    else {shape(H,R,[P(u-.22,-.2),P(u+.23,-.2),P(u+.26,-.83),P(u-.24,-.79)],n===2?'coral':'paper',n===2?.5:1,.6);H.line(R,[P(u-.16,-.25),P(u+.18,-.74)],'teal',1.2);}
  });
  const swatches=recessedFrame(H,R,'nw',7.7,3.48,.89,1.89,'teal',P=>{
    shape(H,R,[P(.12,.12),P(3.35,.12),P(3.35,1.75),P(.12,1.75)],'sun',.17,.5);
    for(let n=0;n<4;n++){
      const u=.35+n*.73;shape(H,R,[P(u,.53),P(u+.58,.48),P(u+.6,1.46),P(u+.04,1.48)],['coral','teal','paper','sun'][n],n===2?1:.54,.7);
      H.line(R,[P(u+.05,1.47),P(u+.05,1.62),P(u+.52,1.62),P(u+.52,1.47)],'blue',1);
      for(let k=0;k<3;k++)H.line(R,[P(u+.08+k*.15,.57),P(u+.09+k*.15,1.36)],n%2?'paper':'blue',.55);
    }
    for(let n=0;n<5;n++){const q=P(.36+n*.57,.28);oval(H,R,...q,3.4,3,'sun',.8);H.dot(q[0]-1,q[1],.5,'blue');H.dot(q[0]+1,q[1],.5,'blue');}
  });
  const forms=(u,z)=>wallPt(H,'ne',u,z,-.31);
  H.line(R,[forms(2.0,2.59),forms(5.62,2.59)],'teal',3);
  for(const u of [2.1,5.48])H.line(R,[forms(u,2.59),wallPt(H,'ne',u,2.43,-.08)],'blue',2);
  for(let n=0;n<3;n++){
    const u=2.6+n*1.1;
    H.line(R,[forms(u,2.59),forms(u,2.4)],'sun',1.4);
    shape(H,R,[forms(u-.38,1.92),forms(u+.4,1.92),forms(u+.49,2.21),forms(u+.18,2.36),forms(u+.1,2.48),forms(u-.12,2.48),forms(u-.2,2.34),forms(u-.5,2.2)],n===1?'coral':'paper',n===1?.4:1,.7);
    H.line(R,[forms(u,2.44),forms(u,1.97)],'teal',.7);
  }
  for(const x of [2.25,6.81]){
    bentTube(H,R,[[x,3.0,.2],[x,3.7,.2],[x,3.7,3.63]],4.2,'blue');
    bentTube(H,R,[[x,3.7,.2],[x,4.48,.2]],4.2,'blue');
    for(const j of [3.02,4.43])caster(H,R,x,j,.12);
  }
  bentTube(H,R,[[2.25,3.7,3.63],[6.81,3.7,3.63]],4.2,'blue');
  for(const [i,ink,w] of [[2.62,'teal',28],[3.48,'coral',29],[4.37,'paper',30]]){const p=H.p(i,3.72,3.42);coat(H,R,...p,w,82,ink,0);}
  timber(H,R,2.32,3.04,3.84,1.28,.22,.12,'blue');
  for(const x of [2.4,4.24,6.0])timber(H,R,x,3.14,.15,1.05,.35,.46,'teal');
  timber(H,R,2.32,3.04,3.84,1.28,.81,.1,'sun');
  for(let n=0;n<3;n++){
    const x=2.79+n*1.05,p=H.p(x,3.76,.37);
    shape(H,R,[[p[0]-14,p[1]+1],[p[0]+13,p[1]+4],[p[0]+16,p[1]-2],[p[0]+3,p[1]-10],[p[0]+3,p[1]-18],[p[0]-9,p[1]-18],[p[0]-8,p[1]-5]],n===1?'coral':'blue',.7,.75);
    H.line(R,[[p[0]-11,p[1]+1],[p[0]+13,p[1]+4]],'sun',1.2);
    for(let k=0;k<3;k++)H.line(R,[[p[0]-5,p[1]-11+k*3],[p[0]+3,p[1]-10+k*3]],'paper',.75);
  }
  for(const x of [2.32,6.02]){
    H.line(R,[H.p(x,3.18,.85),H.p(x,3.18,1.03)],'blue',2);
    const p=H.p(x,3.21,.99);oval(H,R,...p,9,4,'teal',.7);
  }
  for(const x of [2.58,5.82])metal(H,R,x,4.35,.12,.06,.31,.47,'sun');
  H.line(R,[H.p(3.77,4.37,.58),H.p(4.25,4.37,.58)],'sun',2.6);
  timber(H,R,4.5,5.05,2.5,1.62,.04,.18,'sun');for(let n=0;n<5;n++)H.line(R,[H.p(4.63+n*.47,5.14,.23),H.p(4.63+n*.47,6.55,.23)],'paper',.7);
  benchFrame(H,R,1.36,8.24,4.02,1.57,.7,'teal');cushion(H,R,1.5,8.36,3.74,1.32,.72,.17,'coral');
  timber(H,R,8.47,7.57,2.6,2.34,.1,.18,'blue');
  for(const x of [8.47,10.9])timber(H,R,x,7.57,.17,2.34,.28,.61,'blue');
  timber(H,R,8.62,7.57,2.31,.16,.28,.61,'blue');
  timber(H,R,8.62,9.75,2.31,.16,.28,.61,'blue');
  shape(H,R,H.tile(8.66,7.78,2.19,1.9,.32),'coral',.28,.6);
  for(const x of [8.74,10.59]){
    metal(H,R,x,9.91,.19,.045,.18,.64,'sun');
    H.line(R,[H.p(x+.09,7.65,.9),H.p(x+.09,9.78,.9)],'sun',2.1);
  }
  for(const x of [8.61,10.7])for(const j of [7.7,9.65])metal(H,R,x,j,.18,.2,.08,.21,'teal');
  H.line(R,[H.p(9.33,9.93,.52),H.p(10.16,9.93,.52)],'paper',3);
  shape(H,R,H.tile(8.63,7.72,2.28,2.02,.88),'paper',1,.6);drape(H,R,8.73,7.77,1.65,1.2,.91,.39,'teal');
  shape(H,R,[H.p(8.47,7.57,.85),H.p(11.07,7.57,.85),H.p(11.07,7.25,2.0),H.p(8.47,7.25,2.0)],'blue',.65,.9);
  for(let n=0;n<3;n++){
    const x=8.7+n*.72;
    shape(H,R,[H.p(x,7.4,1.13),H.p(x+.57,7.4,1.13),H.p(x+.57,7.29,1.66),H.p(x,7.29,1.66)],'coral',.41,.6);
    H.line(R,[H.p(x,7.38,1.27),H.p(x+.57,7.38,1.27)],'sun',1.1);
  }
  for(const x of [8.73,10.69])H.line(R,[H.p(x,7.54,.93),H.p(x,7.3,1.88)],'sun',2.5);
  for(let n=0;n<4;n++){
    const x=1.74+n*.83;shape(H,R,H.faceI(x,9.8,.67,.18,.48),'blue',.44,.65);
    const p=H.p(x+.34,9.5,.31);oval(H,R,...p,11,4,n%2?'paper':'sun',n%2?1:.7);H.line(R,[[p[0]-7,p[1]-2],[p[0]+7,p[1]+1]],'teal',1.4);
  }
  shape(H,R,H.faceJ(5.41,8.63,.84,.34,.93),'sun',.42,.7);H.line(R,[H.p(5.42,8.82,.91),H.p(5.42,8.91,1.16),H.p(5.42,9.26,1.16),H.p(5.42,9.36,.91)],'blue',1.5);
  timber(H,R,5.97,9.25,1.05,1.23,.04,.31,'sun');
  shape(H,R,H.tile(6.09,9.36,.81,.96,.36),'blue',.63,.55);
  for(let n=0;n<3;n++){const q=H.p(6.3+n*.22,9.85,.4);oval(H,R,...q,4,2,'paper',1);H.line(R,[[q[0]-3,q[1]],[q[0]-3,q[1]-8],[q[0]+3,q[1]-8],[q[0]+3,q[1]]],n===1?'coral':'teal',2);oval(H,R,q[0],q[1]-8,4,2,'paper',1);}
  shape(H,R,[H.p(6.0,9.23,.36),H.p(6.97,9.23,.36),H.p(6.97,8.95,.94),H.p(6.0,8.95,.94)],'sun',.55,.7);
  H.line(R,[H.p(6.09,9.2,.44),H.p(6.8,9.02,.84)],'teal',1.4);
  benchFrame(H,R,7.1,10.05,3.85,1.04,.67,'sun');
  const dish=H.p(7.66,10.56,.69);oval(H,R,...dish,12,5,'paper',1);for(let n=0;n<5;n++)stroke(H,R,[[dish[0]-7+n*3,dish[1]-2],[dish[0]-8+n*3,dish[1]+2],[dish[0]-5+n*3,dish[1]+3]],'blue',.6);
  const glove=H.p(8.56,10.48,.71);shape(H,R,[[glove[0]-7,glove[1]+5],[glove[0]+4,glove[1]+5],[glove[0]+8,glove[1]-3],[glove[0]+4,glove[1]-6],[glove[0]+3,glove[1]-13],[glove[0],glove[1]-14],[glove[0]-1,glove[1]-5],[glove[0]-4,glove[1]-11],[glove[0]-7,glove[1]-10]],'paper',1,.65);H.line(R,[[glove[0]-4,glove[1]-9],[glove[0]-2,glove[1]-7]],'coral',2.7);
  for(let n=0;n<3;n++){vessel(H,R,9.2+n*.49,10.48,.7,5,7,n===1?'coral':'teal',false);H.line(R,[H.p(9.2+n*.49,10.48,.95),H.p(9.45+n*.49,10.8,.71)],'coral',.7);}
  const egg=H.p(10.64,10.56,.72);oval(H,R,egg[0],egg[1]-3,6,8,'sun',.7);
  hatbox(H,R,1.8,6.88,0,'paper',true);
},(H,R,t)=>{
  const u=((t%24)+24)%24,turn=ease(4.8,9.6,u)*(1-ease(14.4,20.9,u)),take=ease(.8,4.6,u)*(1-ease(20.9,22,u));
  const anchor=H.p(5.76,3.72,3.41),x=anchor[0]+take*5,y=anchor[1]+take*4;
  const p=H.p(6.6,3.73,3.4);shape(H,R,[[p[0]-12,p[1]+2],[p[0]+13,p[1]+2],[p[0]+16+Math.sin(u*Math.PI/12),p[1]+77],[p[0]-13,p[1]+78]],'teal',.32,.65);H.line(R,[[p[0],p[1]+6],[p[0],p[1]+75]],'paper',.8);
  coat(H,R,x,y,40,89,'paper',turn,Math.sin(u*Math.PI/12)*.7);
  const left=[x-14-turn*7,y+65],right=[x+12+turn*8,y+69];
  person(H,R,6.2,4.5,[left,right],'teal',-turn*2);
  const fold=[x+4,y+52];if(turn>.03){shape(H,R,[[fold[0],fold[1]],[fold[0]+13,fold[1]-3],[fold[0]+13,fold[1]+8],[fold[0]+1,fold[1]+10]],'paper',1,.6);H.line(R,[[fold[0]+3,fold[1]+5],[fold[0]+10,fold[1]+3]],'teal',2.4);}
  const glance=ease(9.6,11.4,u)*(1-ease(14.4,17,u));person(H,R,5.25,6.55,[H.p(5.26,6.26,1.12),H.p(5.51,6.26,1.28)],'coral',-glance*4);
});
room.loopSeconds=24;
room.stillTime=11.6;
export default room;
