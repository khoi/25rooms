import { world, shape, oval, stroke, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, cushion, slattedSeat, branchSpray, spokedWheel } from '../materials.js';
import { archedBay, cabinetFrame, masonry } from '../structure.js';
import { hangingRail, windowBay } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const bucklePose={...FIGURES.clips.idle.keys[0][1],al:24,el:46,head:14};
FIGURES.clips['barcelona-courtyard-buckle']={dur:24,keys:[[0,bucklePose],[1,bucklePose]]};
function touch(H,target){const p=H.p(6.2,5.95),s=1.65,dx=(target[0]-p[0])/s-5.2,dy=(target[1]-p[1])/s+32.5,a=4.368,b=4.2,d=Math.min(8.55,Math.hypot(dx,dy)),v=Math.acos(Math.max(-1,Math.min(1,(d*d-a*a-b*b)/(2*a*b))));bucklePose.ar=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(v),a+b*Math.cos(v)))*180/Math.PI;bucklePose.er=v*180/Math.PI;}
function helmet(H,R,p,size=1,ink='coral'){shape(H,R,[[p[0]-12*size,p[1]],[p[0]-10*size,p[1]-9*size],[p[0]-4*size,p[1]-14*size],[p[0]+6*size,p[1]-12*size],[p[0]+12*size,p[1]-5*size],[p[0]+12*size,p[1]]],ink,.64);for(const dx of[-5,1,7])H.line(R,[[p[0]+dx*size,p[1]-9*size],[p[0]+(dx+2)*size,p[1]-4*size]],'blue',1.4*size);stroke(H,R,[[p[0]-8*size,p[1]],[p[0],p[1]+11*size],[p[0]+9*size,p[1]]],'blue',1.1*size);}
function bicycle(H,R,o){const P=(x,y)=>[o[0]+x,o[1]+y];H.tint(ell(o[0]+6,o[1]+17,134,19),'blue',.18);for(const x of[-88,102]){spokedWheel(H,R,...P(x,0),29,'paper',0,.91);H.line(R,[P(x-26,-13),P(x-12,-28),P(x+13,-27),P(x+26,-13)],'teal',3.2);}
  stroke(H,R,[P(-88,0),P(-48,-52),P(-7,0),P(-88,0),P(-28,-8),P(-48,-52),P(-11,-53),P(-7,0),P(102,0)],'blue',5);stroke(H,R,[P(-88,-1),P(-48,-53),P(-7,-1),P(102,-1)],'paper',1.1);
  oval(H,R,...P(-28,-8),10,10,'blue');oval(H,R,...P(-28,-8),6,6,'paper');stroke(H,R,[P(-28,-8),P(-17,5),P(-9,5)],'coral',2.6);stroke(H,R,[P(-35,-1),P(-85,7),P(-89,1),P(-36,-15)],'blue',1.1);
  stroke(H,R,[P(-48,-48),P(-48,-65),P(-61,-65),P(-36,-65)],'blue',4);oval(H,R,...P(-49,-65),16,4,'sun');stroke(H,R,[P(-10,-51),P(-15,-78),P(-26,-82),P(-14,-85),P(2,-82)],'teal',3.5);oval(H,R,...P(2,-82),4,2,'blue');
  const back=[P(7,-62),P(80,-69),P(105,-46),P(27,-38)],front=[P(27,-38),P(105,-46),P(99,-4),P(25,5)];shape(H,R,back,'sun',.49);shape(H,R,[P(7,-62),P(27,-38),P(25,5),P(10,-19)],'teal',.58);shape(H,R,front,'teal',.66);
  H.line(R,[P(18,-52),P(38,-50),P(71,-60),P(84,-48)],'coral',1);oval(H,R,...P(78,-55),3,1.5,'blue');
  for(const x of[28,47,67,88]){stroke(H,R,[P(x,-38-(x-27)*.1),P(x-1,4-(x-27)*.12)],'sun',2);H.dot(...P(x,-30-(x-27)*.1),1.5,'paper');H.dot(...P(x-1,-3-(x-27)*.1),1.4,'sun');}
  H.line(R,[P(24,-37),P(108,-47)],'paper',2.5);H.line(R,[P(25,5),P(99,-4)],'blue',3);shape(H,R,[P(57,-24),P(74,-26),P(74,-13),P(57,-11)],'paper',.9);
  shape(H,R,[P(27,-46),P(37,-84),P(65,-88),P(76,-56),P(62,-37),P(38,-36)],'paper',1);shape(H,R,[P(37,-47),P(43,-78),P(62,-81),P(65,-55),P(58,-46)],'sun',.39);H.line(R,[P(38,-75),P(57,-52),P(65,-76)],'blue',2.2);shape(H,R,[P(34,-37),P(68,-40),P(63,-29),P(38,-27)],'paper',1);
  stroke(H,R,[P(40,-23),P(40,-12),P(68,-15),P(68,-25)],'blue',3);stroke(H,R,[P(5,1),P(1,17),P(25,15),P(24,2)],'blue',3.3);shape(H,R,[P(100,16),P(115,15),P(116,4),P(105,3)],'sun',.55);return P;
}
const room=world('barcelona-courtyard-bicycle','Room to turn',{wall:'paper',wallTone:.63,height:3.72,floor:'paper',tone:.48,head:40},(H,R)=>{
  masonry(H,R,'nw',0,12,0,.73,'teal',.3);
  for(let i=.1;i<12;i+=1.5)for(let j=.1;j<12;j+=1.5){shape(H,R,H.tile(i,j,1.41,1.41,.021),'paper',1,.42);if((i+j)%3<1)H.line(R,[H.p(i+.15,j+.16,.03),H.p(i+.8,j+.22,.03)],'blue',.6,{tone:.18});}
  archedBay(H,R,'nw',1.05,4.3,.15,3.24,'teal',P=>{shape(H,R,[P(.2,.15),P(4.1,.15),P(4.1,3.08),P(.2,3.08)],'teal',.52);for(const u of[.45,2.25]){shape(H,R,[P(u,.35),P(u+1.5,.35),P(u+1.5,2.75),P(u,2.75)],'teal',.3);H.line(R,[P(u+.76,.38),P(u+.76,2.74)],'blue',1.6);}const p=P(3.32,1.23);H.line(R,[[p[0]-7,p[1]],[p[0]+4,p[1]]],'sun',2.6);});
  bentTube(H,R,[[.3,.2,3.6],[.3,10.8,3.6],[.3,10.8,.4],[.6,11.1,.25]],3.2,'teal');for(const j of[1,5.5,10])metal(H,R,.22,j,.2,.15,3.49,.23,'sun');
  timber(H,R,.2,.2,11.2,.3,3.68,.23,'sun');
  cabinetFrame(H,R,6.8,.32,4.55,1.47,.13,3.24,3,'teal',(i,j,w,d,z,h,n)=>{
    if(n===0){spokedWheel(H,R,...H.p(i+.71,j+.85,z+.97),26,'sun',.3,.81);metal(H,R,i+.2,j+.2,.13,.75,z,.14,'blue');bentTube(H,R,[[i+.28,j+.1,z+.1],[i+.28,j+.1,z+2.9]],2,'blue');}
    if(n===1){for(const zz of[.5,1.56,2.49]){timber(H,R,i,j,w,d,z+zz,.09,'teal');helmet(H,R,H.p(i+.65,j+.8,z+zz+.22),zz===1.56?.6:.88,zz===1.56?'sun':'coral');}}
    if(n===2){for(const zz of[.14,1.25,2.2])timber(H,R,i,j,w,d,z+zz,.08,'teal');cushion(H,R,i+.15,j+.2,.95,.78,z+.26,.36,'coral');vessel(H,R,i+.7,j+.66,z+1.35,7,16,'sun');bentTube(H,R,[[i+.4,j+.24,z+2.3],[i+.4,j+.24,z+2.83],[i+1,j+.24,z+2.83]],2.4,'blue');}
  });
  shape(H,R,H.faceI(6.96,1.86,1.22,.18,.57),'teal',.65);for(let i=7.07;i<8.08;i+=.16)H.line(R,[H.p(i,1.88,.25),H.p(i,1.88,.49)],'blue',.9);
  const pump=H.p(6.94,1.91,1.2);stroke(H,R,[[pump[0],pump[1]+24],[pump[0],pump[1]-20]],'blue',3);H.line(R,[[pump[0]-8,pump[1]-20],[pump[0]+8,pump[1]-20]],'sun',3);stroke(H,R,[[pump[0]+2,pump[1]+20],[pump[0]+11,pump[1]+18],[pump[0]+10,pump[1]-10]],'teal',1.4);for(const y of[-9,13])H.line(R,[[pump[0]-5,pump[1]+y],[pump[0]+5,pump[1]+y]],'coral',2);
  hangingRail(H,R,'ne',1.15,3.9,2.58,3,(P,u,n)=>{if(n===0){const p=P(u,-.55);for(let r=7;r<14;r+=3)H.outline(R,ell(...p,r,r*.7),'blue',1.6);}else{shape(H,R,[P(u-.27,-.14),P(u+.27,-.14),P(u+.38,-1.03),P(u-.38,-1.03)],n===1?'coral':'paper',.69);H.line(R,[P(u-.21,-.85),P(u+.22,-.85)],'sun',1);}});
  metal(H,R,.55,6.3,.15,.22,.3,1.6,'teal');bentTube(H,R,[[.55,6.34,1.55],[.9,6.34,1.55],[.9,6.34,1.28]],2.2,'blue');vessel(H,R,.9,6.6,.04,12,19,'sun');
  timber(H,R,.55,8.2,1.5,3.05,.02,.52,'teal');shape(H,R,H.tile(.7,8.4,1.2,2.67,.56),'blue',.7);for(const [i,j,s]of[[1.1,8.8,1.4],[1.15,10.4,1.8]])branchSpray(H,R,...H.p(i,j,.62),s,'teal',1);for(const j of[8.7,10.2])bentTube(H,R,[[1.3,j,.56],[1.3,j,2.35]],1.8,'sun');
  const coil=H.p(2.4,9.55,.03);for(let r=7;r<22;r+=4)H.outline(R,ell(...coil,r,r*.42),'teal',1.8);stroke(H,R,[[coil[0]+20,coil[1]],[coil[0]+27,coil[1]+5],[coil[0]+38,coil[1]+2]],'blue',2);
  slattedSeat(H,R,6.3,10.03,4.08,0,'sun',.79);cushion(H,R,6.53,10.2,1.4,.55,.76,.16,'coral');vessel(H,R,9.6,10.4,.02,9,12,'teal');stroke(H,R,[H.p(9.6,10.4,.37),H.p(9.6,11.01,.49),H.p(9.6,11.25,.49)],'teal',4);
  shape(H,R,H.tile(10.9,6.1,.42,2.2,.03),'blue',.6);for(let j=6.2;j<8.2;j+=.2)H.line(R,[H.p(10.91,j,.05),H.p(11.3,j,.05)],'paper',.7);
},(H,R,time)=>{const t=((time%24)+24)%24,u=ease(4.8,9.6,t)*(1-ease(14.4,22,t)),P=bicycle(H,R,H.p(5,6,.35)),buckle=P(55,-28-7*u);
  stroke(H,R,[P(39,-74),buckle,P(65,-75)],'coral',2);shape(H,R,[[buckle[0]-5,buckle[1]-3],[buckle[0]+4,buckle[1]-3],[buckle[0]+4,buckle[1]+3],[buckle[0]-5,buckle[1]+3]],'blue',.8);H.line(R,[P(56,-44),P(55,-49+u*3)],'sun',2);
  touch(H,buckle);actor(H,R,6.2,5.95,0,'barcelona-courtyard-buckle',{face:'se',shirt:['coral',.72]},0,1.65);
  actor(H,R,8.45,7.2,u,'hold',{face:'sw',shirt:['sun',.7],prop:(A,B,p)=>helmet(A,B,[p.nearHand[0]-4,p.nearHand[1]-2],.65,'coral')},0,1.55,'child');
});
room.loopSeconds=24;
room.stillTime=23;
export default room;
