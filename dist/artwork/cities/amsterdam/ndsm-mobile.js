import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, cushion, surface, floorLight, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, taskLight } from '../joinery.js';
const ease=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
const swing=t=>.47*ease((t-3.6)/3.6)*(1-ease((t-10.8)/5.2));
const rest=FIGURES.clips.idle.keys[0][1];
FIGURES.clips.amsterdamMobileMaker={dur:18,keys:[[0,{...rest,ar:150,er:0,al:55,el:61,head:-8}],[.2,{...rest,ar:150,er:0,al:55,el:61,head:-8}],[.4,{...rest,ar:40,er:28,al:10,head:-20}],[.6,{...rest,ar:75,er:25,head:-14}],[.89,{...rest,ar:150,er:0,al:55,el:61,head:-8}],[1,{...rest,ar:150,er:0,al:55,el:61,head:-8}]]};
function leaf(H,R,P,i,j,z,w,d,ink){
  const q=[[0,0],[.17,-.7],[.62,-1],[1,-.6],[.85,.35],[.42,.72],[-.06,.41]].map(([a,b])=>P(i+a*w,j+b*d,z+.06*Math.sin(a*Math.PI)));
  surface(H,R,q,ink,.67);H.line(R,[P(i+.04*w,j,z+.02),P(i+.86*w,j-.25*d,z+.03)],'paper',1);
  const seam=[P(i+.42*w,j-.87*d,z+.02),P(i+.5*w,j+.61*d,z+.02)];H.line(R,seam,'blue',.7);
  for(const n of[.2,.5,.8])H.dot(...P(i+n*w,j-.4*d,z+.02),1.2,'sun');
}
function studio(H,R){
  masonry(H,R,'nw',0,12,0,5.02,'paper',.57);masonry(H,R,'ne',0,12,0,4.05,'teal',.32);
  windowBay(H,R,'nw',.8,9.87,3.74,1.01,{divisions:7});
  for(const j of[.3,5.8,11.5]){metal(H,R,.04,j,.23,.27,.01,5.12,'blue');for(const z of[.16,2.8,4.8])metal(H,R,.27,j-.07,.08,.41,z,.28,'teal');}
  for(const z of[4.82,5.12])bentTube(H,R,[[.17,.2,z],[11.64,.2,z]],3,'blue');
  for(let n=0;n<7;n++)bentTube(H,R,[[.25+n*1.6,.2,4.82],[1.05+n*1.6,.2,5.12],[1.85+n*1.6,.2,4.82]],1.9,'teal');
  bentTube(H,R,[[.3,4.9,4.95],[6.13,4.9,4.95],[6.13,4.9,4.5]],2.6,'blue');
  cabinetFrame(H,R,.37,.42,10.8,1.4,.11,3.13,4,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of[.64,1.47,2.29])timber(H,R,i,j,w,d,z+level,.085,'sun');
    if(n===0){for(let k=0;k<6;k++){surface(H,R,H.faceI(i+.08+k*.37,j+.93,.27,z+.14,z+.59),'paper',1);H.line(R,[H.p(i+.12+k*.37,j+.95,z+.19),H.p(i+.26+k*.37,j+.95,z+.5)],'blue',.6);}for(let k=0;k<3;k++)vessel(H,R,i+.46+k*.68,j+.55,z+.78,6,15,['coral','sun','paper'][k]);}
    if(n===1){for(let k=0;k<4;k++){metal(H,R,i+.13,j+.08,w-.2,d-.1,z+.15+k*.11,.075,k%2?'blue':'teal');}for(let k=0;k<3;k++){const [x,y]=H.p(i+.5+k*.68,j+.75,z+.95);H.outline(R,Array.from({length:30},(_,n)=>[x+Math.cos(n*TAU/30)*8,y+Math.sin(n*TAU/30)*5]),k%2?'coral':'sun',2);}}
    if(n===2){for(let k=0;k<4;k++)box(H,R,i+.12+k*.56,j+.16,.45,.9,z+.12,.41,k%2?'sun':'paper',.6);for(let k=0;k<5;k++){const [x,y]=H.p(i+.33+k*.4,j+.5,z+1.18);H.line(R,[[x,y-7],[x,y+12]],'blue',1.4);oval(H,R,x,y+14,3.2,5,'sun');}}
    if(n===3){cushion(H,R,i+.14,j+.1,w-.28,1.02,z+.15,.25,'paper');for(let k=0;k<3;k++)surface(H,R,[H.p(i+.22+k*.67,j+.3,z+.8),H.p(i+.65+k*.67,j+.3,z+.8),H.p(i+.59+k*.67,j+.9,z+1.31),H.p(i+.3+k*.67,j+.9,z+1.38)],'teal',.45);}
    for(let k=0;k<3;k++){const x=i+.32+k*.71;metal(H,R,x,j+.34,.43,.43,z+1.59,.15,k===1?'sun':'paper');oval(H,R,...H.p(x+.21,j+.54,z+1.76),4,2,'blue');}
    leaf(H,R,(...p)=>H.p(...p),i+.22,j+.59,z+2.56,w*.69,.37,n%2?'coral':'sun');
  });
  hangingRail(H,R,'nw',6.6,4.4,3.05,5,(P,u,n)=>{const [x,y]=P(u,0);if(n%2){stroke(H,R,[[x-8,y+18],[x-8,y+3],[x+7,y+3],[x+7,y+20]],'coral',2.1);H.line(R,[[x-5,y+20],[x+5,y+20]],'blue',1.2);}else{H.line(R,[[x,y],[x,y+24]],'blue',1.6);H.line(R,[[x-6,y+8],[x+6,y+8]],'sun',3);}});
  benchFrame(H,R,3.1,4.58,5.81,2.68,1.16,'sun');
  timber(H,R,3.28,4.74,5.4,2.23,.26,.12,'teal');
  cushion(H,R,3.42,4.96,1.82,1.35,.42,.2,'paper');
  leaf(H,R,(...p)=>H.p(...p),6.12,5.88,.55,1.42,.67,'sun');
  for(const i of[4.2,7.9]){timber(H,R,i,5.03,.32,1.49,1.16,.24,'teal');cushion(H,R,i,5.06,.32,1.41,1.42,.08,'coral');}
  surface(H,R,H.tile(5.15,5.13,1.68,1.33,1.18),'paper',1);
  for(let k=0;k<3;k++)H.line(R,[H.p(5.29,5.37+k*.32,1.2),H.p(6.61,5.37+k*.32,1.2)],'teal',.7);
  metal(H,R,8.02,6.86,.42,.46,1.06,.43,'blue');bentTube(H,R,[[8.26,7.09,.98],[8.26,7.09,1.56],[8.6,7.09,1.56]],1.8,'coral');
  benchFrame(H,R,.6,8.97,3.37,1.59,.68,'teal');
  for(let n=0;n<4;n++){const [x,y]=H.p(.97+n*.71,9.43,.71);oval(H,R,x,y,7,4,n%2?'coral':'sun');oval(H,R,x,y-3,4.6,3,'paper');}
  const [x,y]=H.p(2.18,10.16,.74);oval(H,R,x,y,10,5,'paper');H.outline(R,Array.from({length:22},(_,n)=>[x+Math.cos(n*TAU/22)*6,y+Math.sin(n*TAU/22)*3]),'blue',1.6);H.line(R,[[x,y],[x+11,y-6]],'coral',1.1);
  box(H,R,9.37,8.4,1.92,2.54,.05,.41,'teal',.63);surface(H,R,H.tile(9.52,8.56,1.61,2.22,.48),'paper',1);leaf(H,R,(...p)=>H.p(...p),9.63,9.53,.53,1.14,.71,'teal');
  shape(H,R,[H.p(9.38,10.95,.47),H.p(11.28,10.95,.47),H.p(11.28,11.56,1.24),H.p(9.38,11.56,1.24)],'sun',.47);
  stroke(H,R,[H.p(10.2,8.15,.07),H.p(10.6,7.82,.07),H.p(11,8.15,.07)],'paper',1.8);
  taskLight(H,R,3.37,4.82,1.17,'coral',.6);floorLight(H,6,6,147,.28);
}
function mobile(H,R,t){
  const a=swing(t),P=(i,j,z)=>{const x=i-6.1,y=j-4.9;return H.p(6.1+x*Math.cos(a)-y*Math.sin(a),4.9+x*Math.sin(a)+y*Math.cos(a),z);};
  const pieces=[[2.05,5.1,3.03,2.1,.88,'coral'],[7.82,4.54,3.57,2.28,.78,'sun'],[6.2,6.39,1.7,2.37,1.55,'teal']];
  for(const [i,j,z,w,d]of pieces){const q=[[0,0],[.17,-.7],[.62,-1],[1,-.6],[.85,.35],[.42,.72],[-.06,.41]].map(([x,y])=>H.p(.13,j+y*d+(i+x*w)*.23,z+.45));H.tint(q,'blue',.12);}
  H.line(R,[H.p(6.13,4.9,4.96),P(6.1,4.9,4.17)],'blue',1.2);
  oval(H,R,...P(6.1,4.9,4.18),4,3,'sun');
  H.line(R,[P(2.74,5.03,3.91),P(6.1,4.9,4.15),P(9.28,4.5,4.05)],'blue',2.3);
  for(const [i,j,z,w,d,ink]of pieces){const top=z+(.65);H.line(R,[P(i+w*.4,j,top),P(i+w*.4,j,z+.03)],'blue',1.1);leaf(H,R,P,i,j,z,w,d,ink);}
  H.line(R,[P(2.9,5.03,3.91),P(2.9,5.1,3.7)],'blue',1.1);H.line(R,[P(8.73,4.55,4.05),P(8.73,4.54,4.23)],'blue',1.1);
  H.line(R,[P(6.1,4.9,4.1),P(6.1,5.43,3.25),P(7.15,6.37,2.35)],'blue',1.3);
  H.line(R,[P(6.13,5.43,3.25),P(4.7,6.23,3.05)],'blue',1.8);
  oval(H,R,...P(4.71,6.23,2.89),9,7,'coral');H.line(R,[P(4.71,6.23,3.05),P(4.71,6.23,2.99)],'blue',1.2);
  for(let n=0;n<3;n++)H.line(R,[P(4.55+n*.12,6.23,2.77),P(4.55+n*.12,6.23,3.02)],'paper',.9);
  stroke(H,R,[P(8.7,4.53,4.03),H.p(9.1,3.32,3.51),H.p(9.9,2.25,3.23)],'sun',.8);
}
const room=world('amsterdam-ndsm-mobile','A small wind inside the hall',{wall:false,floor:'paper',tone:.3,head:110},studio,(H,R,time)=>{
  const t=cycle(time,18)*18;mobile(H,R,t);
  const a=swing(t),x=7.1954-6.1,y=7.506-4.9,target=H.p(6.1+x*Math.cos(a)-y*Math.sin(a),4.9+x*Math.sin(a)+y*Math.cos(a),1.7),sample=FIGURES.pose({who:'adult',at:[0,0,0],clip:'amsterdamMobileMaker',face:'sw',scale:1.48},t,null,H).nearHand,contact=1-ease((t-3.6)/1.2)*(1-ease((t-10.3)/1.2)),dx=(target[0]-sample[0])/32,dy=(target[1]-sample[1])/16;
  actor(H,R,8.34*(1-contact)+(dx+dy)/2*contact,7.89*(1-contact)+(dy-dx)/2*contact,t,'amsterdamMobileMaker',{shirt:['coral',.72],apron:['paper',.8],hairStyle:'bun',face:'sw'},0,1.48);
  actor(H,R,2.22,6.65,4*Math.sin(t*Math.PI/18)**2,'lookup',{shirt:['sun',.7],hairStyle:'curly',face:'se'},0,1.43);
});
room.loopSeconds=18;room.stillTime=15.5;
export default room;
