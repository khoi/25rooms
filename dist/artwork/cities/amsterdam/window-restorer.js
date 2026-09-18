import { world, shape, stroke, oval, box, actor, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, bentTube, drape, benchFrame } from '../materials.js';
import { boardFloor } from '../structure.js';
import { windowBay, wallRack, taskLight, floorShadow } from '../joinery.js';

const duration=20;
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const rest={...FIGURES.clips.idle.keys[0][1]};
for(const n of ['amsterdamJoinerSash','amsterdamJoinerClient'])FIGURES.clips[n]={dur:duration,keys:[[0,rest],[1,rest]]};

function sash(H,R,angle){
  const P=(u,z,depth=0)=>H.p(3.38+u*Math.cos(angle)-depth*Math.sin(angle),4.13+u*Math.sin(angle)+depth*Math.cos(angle),z);
  const strip=(u0,u1,z0,z1,ink='sun',tone=.59)=>{
    shape(H,R,[P(u0,z0,.18),P(u1,z0,.18),P(u1,z1,.18),P(u0,z1,.18)],ink,tone,.85);
    shape(H,R,[P(u1,z0,0),P(u1,z0,.18),P(u1,z1,.18),P(u1,z1,0)],ink,tone*.8,.65);
    shape(H,R,[P(u0,z1,0),P(u1,z1,0),P(u1,z1,.18),P(u0,z1,.18)],'paper',.92,.55);
  };
  for(const [a,b]of[[0,.25],[2.19,2.35],[4.31,4.57]])strip(a,b,.62,3.78);
  for(const [a,b]of[[.62,.91],[2.08,2.25],[3.53,3.78]])strip(.2,4.38,a,b);
  for(const [a,b]of[[.26,2.18],[2.36,4.29]])for(const [z0,z1]of[[.94,2.07],[2.27,3.5]]){
    H.line(R,[P(a,z0,.19),P(b,z0,.19),P(b,z1,.19)],'blue',1.9);
    H.line(R,[P(a+.04,z0+.04,.19),P(b-.04,z0+.04,.19),P(b-.04,z1-.04,.19)],'paper',.9);
    H.line(R,[P(a,z0,.08),P(a,z1,.08),P(b,z1,.08)],'coral',.8);
  }
  const splice=[P(4.32,.67,.2),P(4.56,.67,.2),P(4.56,1.29,.2),P(4.46,1.39,.2),P(4.32,1.08,.2)];
  shape(H,R,splice,'paper',.96,.75);
  for(let n=0;n<3;n++)H.line(R,[P(4.34+n*.07,.75,.21),P(4.34+n*.07,1.16,.21)],'coral',.5);
  for(const z of [1.17,3.25]){
    H.line(R,[P(-.12,z,0),P(.07,z,.2)],'sun',4);H.line(R,[P(-.015,z-.11,.18),P(-.015,z+.11,.18)],'blue',2.1);H.dot(...P(-.015,z,.2),1.2,'paper');
  }
  H.line(R,[P(4.46,1.43,.21),P(4.46,1.8,.21)],'blue',4);
  H.line(R,[P(4.46,1.47,.23),P(4.46,1.78,.23)],'sun',2.4);
  H.line(R,[P(4.39,1.47,.24),P(4.49,1.47,.24)],'paper',1.2);
  for(const u of [.07,4.46])for(const z of [.72,3.64])H.dot(...P(u,z,.21),1.2,'blue');
  return P;
}

const room=world('amsterdam-window-restorer','A sash fits its old opening',{floor:'paper',tone:.35,wall:'teal',wallTone:.22,height:3.8,head:40},(H,R)=>{
  boardFloor(H,R,.1,.1,11.8,11.8,.025,'sun',.72);
  for(let j=.2;j<11.5;j+=.67){shape(H,R,H.tile(.14,j,.85,.62,.032),'teal',.3,.45);shape(H,R,H.tile(.38,j+.2,.28,.23,.035),'paper',1,.45);}
  windowBay(H,R,'ne',2.1,9.2,1.47,2.05,{ink:'teal',divisions:5,view:P=>{
    shape(H,R,[P(.12,.12),P(9.08,.12),P(9.08,.5),P(.12,.73)],'blue',.23,.45);
    for(let n=0;n<6;n++)H.line(R,[P(.28+n*1.48,.22),P(.71+n*1.48,1.41)],'teal',1.1,{tone:.35});
  }});
  timber(H,R,2.0,.08,9.45,.7,1.31,.16,'sun');
  H.line(R,[H.p(10.25,.3,1.63),H.p(10.68,.67,1.82),H.p(11.04,.24,1.86)],'blue',1.7);
  shape(H,R,H.faceJ(.29,.45,7.88,.12,3.81),'blue',.53,.7);
  for(const j of [.41,2.27,4.2,6.12,8.26])timber(H,R,.25,j,1.2,.13,.12,3.69,'teal');
  for(const z of [.15,1.02,2.72,3.75])timber(H,R,.23,.38,1.26,8.0,z,.12,'sun');
  for(let n=0;n<8;n++){
    const j=.7+n*.17,z=1.18+(n%3)*.12;
    timber(H,R,.68,j,.28,.12,z,1.3-(n%3)*.12,['sun','paper','coral'][n%3]);
    H.line(R,[H.p(.97,j+.1,z+.12),H.p(.97,j+.1,z+1.17)],'blue',.65);
  }
  for(let n=0;n<5;n++){
    const j=2.54+n*.3;metal(H,R,.55,j,.7,.23,1.16,.16,'blue');
    H.line(R,[H.p(1.27,j+.08,1.2),H.p(1.27,j+.08,1.47)],'paper',2);
    H.line(R,[H.p(1.27,j+.11,1.47),H.p(1.27,j+.2,1.47)],'sun',2);
  }
  for(let n=0;n<5;n++){
    const j=4.4+n*.31;timber(H,R,.42,j,.85,.22,.31,.12,'sun');
    H.line(R,[H.p(1.26,j+.02,.45),H.p(1.26,j+.2,.45)],'blue',1.4);
  }
  for(let n=0;n<3;n++){shape(H,R,H.faceJ(1.51,6.34+n*.59,.5,.35,.9),'teal',.52,.6);H.dot(...H.p(1.53,6.59+n*.59,.62),1.8,'sun');}
  for(const j of [2.57,3.14,3.71]){bentTube(H,R,[[.7,j,2.88],[.7,j,3.36],[1.12,j,3.36],[1.12,j,2.88]],1.8,'blue');metal(H,R,.89,j-.04,.27,.1,3.12,.12,'sun');}
  for(const [j,ink]of[[4.58,'paper'],[5.02,'coral'],[5.46,'teal']])shape(H,R,H.faceJ(1.35,j,.33,2.88,3.33),ink,.67,.55);
  timber(H,R,.61,6.78,.55,.94,3.9,.08,'sun');
  for(const j of [6.86,7.46])timber(H,R,1.08,j,.08,.09,3.94,.58,'sun');for(const z of [3.94,4.48])timber(H,R,1.08,6.84,.08,.71,z,.08,'sun');
  shape(H,R,[H.p(1.12,6.96,3.96),H.p(1.12,7.34,3.96),H.p(1.12,7.31,4.4),H.p(1.12,6.96,4.4)],'paper',1,.5);for(let j=7;j<7.31;j+=.1)H.line(R,[H.p(1.13,j,3.99),H.p(1.13,j,4.39)],'teal',.5);
  wallRack(H,R,'ne',3.9,5.1,3.31,.69,1,'sun',(P,z)=>{
    shape(H,R,[P(.17,z+.04),P(1.21,z+.04),P(1.21,z+.3),P(.99,z+.3),P(.99,z+.46),P(.74,z+.61),P(.47,z+.46),P(.47,z+.3),P(.17,z+.3)],'teal',.67,.5);
    for(let n=0;n<3;n++)shape(H,R,[P(1.73+n*.86,z+.07),P(2.34+n*.86,z+.07),P(2.34+n*.86,z+.45),P(1.73+n*.86,z+.45)],['paper','coral','sun'][n],.63,.5);
  });
  floorShadow(H,2.64,3.57,6.29,3.2,.26);
  for(const i of [2.9,8.18]){
    timber(H,R,i,3.31,.68,3.12,.02,.19,'sun');
    metal(H,R,i+.1,3.58,.45,2.52,.23,.06,'blue');
    timber(H,R,i+.22,4.0,.24,.27,.25,3.76,'teal');
    bentTube(H,R,[[i+.31,3.67,.25],[i+.33,4.08,2.11],[i+.33,6.02,.25]],3,'teal');
    for(const j of [3.52,6.16]){H.dot(...H.p(i+.33,j,.25),2.3,'blue');H.line(R,[H.p(i+.28,j,.26),H.p(i+.38,j,.26)],'paper',.75);}
  }
  timber(H,R,3.03,3.97,5.73,.34,3.88,.23,'teal');
  timber(H,R,3.03,3.97,5.73,.34,.45,.18,'teal');
  for(const i of [3.3,8.07])for(const z of [.59,3.44])cushion(H,R,i,4.27,.3,.32,z,.12,'paper');
  cushion(H,R,8.15,4.19,.11,.3,1.21,.38,'coral');
  benchFrame(H,R,2.06,8.07,4.78,2.14,.83,'sun');
  timber(H,R,2.25,8.26,1.36,.66,.85,.23,'sun');timber(H,R,2.25,8.78,.31,.85,.85,.23,'paper');
  for(let n=0;n<3;n++)H.line(R,[H.p(2.47,8.4+n*.16,1.1),H.p(3.45,8.4+n*.16,1.1)],'coral',.55);
  box(H,R,3.84,8.43,.74,.48,.86,.05,'teal',.65);
  for(const [i,ink]of[[4.05,'blue'],[4.32,'sun']]){H.line(R,[H.p(i,8.65,.95),H.p(i+.16,8.88,.95)],ink,1.5);H.line(R,[H.p(i-.06,8.63,.95),H.p(i+.04,8.63,.95)],ink,2.5);}
  for(let n=0;n<3;n++)shape(H,R,H.tile(5.13+n*.06,8.35+n*.04,.59,.56,.88+n*.035),['teal','coral','paper'][n],.66,.45);
  timber(H,R,5.0,9.41,1.45,.5,.86,.13,'sun');H.line(R,[H.p(5.06,9.68,1),H.p(6.39,9.68,1)],'blue',1.5);
  cushion(H,R,3.88,9.48,.58,.35,.88,.06,'coral');taskLight(H,R,6.46,8.24,.89,'teal',-.47);
  timber(H,R,9.34,8.13,.17,2.4,.12,1.97,'sun');timber(H,R,10.9,8.13,.17,2.4,.12,1.97,'sun');for(const z of [.15,2.0])timber(H,R,9.3,8.13,1.84,.17,z,.15,'sun');
  drape(H,R,9.3,8.08,.33,1.1,2.13,.54,'paper');drape(H,R,10.85,8.1,.32,.88,2.13,.5,'coral');
  for(const [i,j]of[[9.67,8.6],[10.34,8.84],[9.76,9.5]]){timber(H,R,i,j,.47,.47,.13,.17,'sun');cushion(H,R,i+.03,j+.03,.42,.42,.32,.09,'paper');}
  bentTube(H,R,[[9.51,9.94,1.42],[10.01,9.66,.96],[10.83,9.94,1.42]],2,'coral');
  for(let n=0;n<4;n++)H.line(R,[H.p(11.3,3.53+n*.23,.02),H.p(11.72,3.53+n*.23,.02)],'blue',1.3);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,open=ease(4,8,t)*(1-ease(12,17,t)),a=open*.36;
  const P=sash(H,R,a),target=P(4.46,1.62,.25),i=3.38+4.46*Math.cos(a)+.22,j=4.13+4.46*Math.sin(a)+.6;
  const q={...rest,head:12,al:22,el:38},at=H.p(i,j,.02),scale=1.6;
  const dx=(target[0]-at[0])/scale-5.2,dy=(target[1]-at[1])/scale+32.5,l=4.368,b=4.2,r=Math.min(l+b-.001,Math.hypot(dx,dy)),e=Math.acos(Math.max(-1,Math.min(1,(r*r-l*l-b*b)/(2*l*b))));
  q.ar=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),l+b*Math.cos(e)))*180/Math.PI;q.er=e*180/Math.PI;
  FIGURES.clips.amsterdamJoinerSash.keys=[[0,q],[1,q]];actor(H,R,i,j,0,'amsterdamJoinerSash',{shirt:['teal',.68],apron:['sun',.5],hairStyle:'short'},.02,scale);
  const inspect=ease(8,9.6,t)*(1-ease(11.1,13.2,t)),client={...rest,head:5+inspect*13,lean:-inspect*4,al:34,ar:39,el:61,er:72};FIGURES.clips.amsterdamJoinerClient.keys=[[0,client],[1,client]];
  actor(H,R,9.96,6.86,0,'amsterdamJoinerClient',{shirt:['coral',.62],hairStyle:'pony',glasses:true},0,1.5);
  const latch=ease(1.2,4,t)*(1-ease(17,18,t));H.line(R,[P(4.5,1.85,.24),P(4.5+.17*(1-latch),1.85+.14*latch,.24)],'sun',2.6);
  const p=H.p(9.55,9.2,1.6),s=Math.sin(t/duration*Math.PI*2)*1.4;H.line(R,[[p[0]-3,p[1]],[p[0]+s,p[1]+9],[p[0]+2,p[1]+13]],'paper',1.2);
});
room.loopSeconds=duration;
room.stillTime=7;
export default room;
