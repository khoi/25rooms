import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, cushion, surface, drape, vessel, floorLight } from '../materials.js';
import { masonry } from '../structure.js';
import { windowBay, taskLight, hangingRail } from '../joinery.js';
const ease=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
const opened=t=>ease((t-4)/4)*(1-ease((t-12)/6));
const rest=FIGURES.clips.idle.keys[0][1];
FIGURES.clips.amsterdamBinderyOpen={dur:20,keys:[[0,{...rest,head:14,al:66,el:46,ar:73,er:31}],[.2,{...rest,head:14,al:66,el:46,ar:73,er:31}],[.4,{...rest,head:23,lean:-5,al:62,el:66,ar:113,er:22}],[.6,{...rest,head:23,lean:-5,al:62,el:66,ar:105,er:28}],[.9,{...rest,head:14,al:66,el:46,ar:73,er:31}],[1,{...rest,head:14,al:66,el:46,ar:73,er:31}]]};
function book(H,R,i,j,z,w,d,ink='coral',h=.22){
  timber(H,R,i,j,w,d,z,.065,ink);box(H,R,i+.045,j+.05,w-.09,d-.1,z+.065,h,'paper',1);timber(H,R,i-.015,j-.02,w+.03,d+.04,z+h+.065,.055,ink);
  for(let n=0;n<4;n++)H.line(R,[H.p(i+.08,j+d-.045,z+.1+n*h/5),H.p(i+w-.07,j+d-.045,z+.1+n*h/5)],'blue',.45,{tone:.55});
}
function archive(H,R){
  const P=(j,z,i=1.57)=>H.p(i,j,z);
  surface(H,R,H.faceJ(.22,.3,10.6,.14,4.12),'blue',.42);
  for(const j of[.28,2.82,5.37,7.92,10.8])timber(H,R,.22,j,1.41,.12,.11,4.11,'sun');
  for(const z of[.13,.94,1.87,2.87,4.13])timber(H,R,.19,.21,1.43,10.79,z,.13,'sun');
  for(let bay=0;bay<4;bay++){
    const j=.45+bay*2.56;
    for(let n=0;n<3;n++){shape(H,R,H.faceJ(1.65,j+.05,2.14,.24+n*.21,.41+n*.21),'teal',.44);H.line(R,[P(j+.85,.32+n*.21,1.68),P(j+1.38,.32+n*.21,1.68)],'sun',1.8);}
    if(bay===0){for(let n=0;n<4;n++){book(H,R,.44,j+.12+n*.53,1.08,.97,.45,['coral','paper','teal','sun'][n],.14);}book(H,R,.46,j+.43,2.04,.97,1.18,'coral',.24);}
    if(bay===1){for(let n=0;n<6;n++){const y=j+.17+n*.35;timber(H,R,.4,y,1.13,.18,1.08,.72,n%2?'paper':'teal');H.line(R,[H.p(1.55,y+.1,1.25),H.p(1.55,y+.1,1.65)],'sun',.8);}for(let n=0;n<3;n++)cushion(H,R,.43,j+.17,.96,1.95,2.04+n*.2,.15,n%2?'coral':'sun');}
    if(bay===2){for(const y of[j+.23,j+2.06])timber(H,R,.69,y,.19,.14,1.1,.58,'teal');timber(H,R,.62,j+.13,.36,2.15,1.69,.16,'sun');for(let n=0;n<6;n++)H.line(R,[H.p(.75,j+.31+n*.3,1.13),H.p(.75,j+.31+n*.3,1.7)],'paper',.8);vessel(H,R,.85,j+.52,2.03,7,18,'paper',false);for(let n=0;n<3;n++)timber(H,R,.42,j+1.12+n*.29,1.05,.1,2.05,.66,'teal');}
    if(bay===3){for(let n=0;n<4;n++)timber(H,R,.4,j+.16+n*.46,.91,.33,1.08,.58,n%2?'coral':'sun');book(H,R,.43,j+.2,2.04,.96,1.87,'paper',.12);}
    for(let n=0;n<3;n++){const y=j+.26+n*.6;shape(H,R,H.faceJ(1.48,y,.47,3.01,3.7+(n%2)*.16),['coral','teal','paper'][(n+bay)%3],.68);H.line(R,[P(y+.08,3.1,1.5),P(y+.38,3.1,1.5)],'sun',1);}
  }
  timber(H,R,.13,.15,1.61,10.98,4.24,.13,'teal');
}
function shell(H,R){
  masonry(H,R,'nw',0,12,0,4.48,'paper',.7);masonry(H,R,'ne',0,12,0,4.57,'paper',.78);
  archive(H,R);
  windowBay(H,R,'ne',3.35,7.48,1.4,2.97,{divisions:4,view:P=>{for(let n=0;n<6;n++){const u=.25+n*1.14;surface(H,R,[P(u,.13),P(u+.9,.13),P(u+.9,.95),P(u+.43,1.24),P(u,.95)],n%2?'teal':'coral',.13,.5);for(let k=0;k<3;k++)H.line(R,[P(u+.2,.24+k*.2),P(u+.71,.24+k*.2)],'paper',.7);}}});
  timber(H,R,3.11,.17,7.89,.85,1.21,.17,'sun');
  for(let n=0;n<4;n++)book(H,R,3.39+n*.65,.41,1.39,.47,.44,n%2?'coral':'teal',.09);
  const [x,y]=H.p(9.78,.66,1.45);shape(H,R,[[x-18,y],[x-12,y-9],[x+10,y-9],[x+18,y],[x+11,y-4],[x-10,y-4]],'paper',1);H.line(R,[[x-16,y],[x-8,y-7],[x+8,y-7],[x+17,y]],'teal',.9);
  benchFrame(H,R,3.12,3.4,6.56,3.03,1.14,'sun');
  timber(H,R,3.35,3.55,6.02,2.59,.27,.12,'teal');
  for(let n=0;n<3;n++)book(H,R,3.55+n*1.05,3.78,.4,.86,1.57,['paper','coral','teal'][n],.26);
  cushion(H,R,7.37,3.83,1.61,1.2,.4,.31,'paper');
  drape(H,R,3.41,3.59,1.34,2.18,1.16,.32,'teal');
  timber(H,R,3.48,3.83,1.03,1.54,1.17,.16,'sun');
  for(const i of[3.57,4.24])bentTube(H,R,[[i,4.59,1.26],[i,4.59,2.27]],2.4,'teal');
  timber(H,R,3.49,4.48,.96,.21,2.19,.17,'sun');
  for(let n=0;n<5;n++)H.line(R,[H.p(3.6+n*.14,4.59,1.4),H.p(3.6+n*.14,4.59,2.25)],'paper',.8);
  book(H,R,3.57,4.39,1.37,.81,.63,'coral',.17);
  timber(H,R,8.12,3.72,1.25,1.76,1.17,.16,'teal');
  timber(H,R,8.25,3.93,1.01,1.33,1.61,.18,'sun');
  for(const j of[4.09,5.13])bentTube(H,R,[[8.74,j,1.24],[8.74,j,2.02]],2.5,'blue');
  for(const j of[4.09,5.13]){H.line(R,[H.p(8.4,j,2.03),H.p(9.09,j,2.03)],'sun',3.1);oval(H,R,...H.p(8.75,j,1.91),3,2,'coral');}
  vessel(H,R,8.76,5.79,1.18,7,12,'paper',false);
  for(const i of[5.12,6.08,7.36]){timber(H,R,i,4.26,.27,1.77,1.16,.19,'teal');cushion(H,R,i-.05,4.28,.38,1.73,1.36,.12,'coral');}
  surface(H,R,[H.p(5.0,4.27,1.39),H.p(6.1,4.27,1.23),H.p(6.1,5.97,1.23),H.p(5.0,5.97,1.39)],'teal',.5);
  surface(H,R,[H.p(6.1,4.27,1.23),H.p(7.58,4.27,1.46),H.p(7.58,5.97,1.46),H.p(6.1,5.97,1.23)],'teal',.5);
  metal(H,R,6.15,6.06,.29,.16,1.15,.28,'sun');
  benchFrame(H,R,2.43,9.3,3.86,1.59,.74,'teal');
  for(let n=0;n<4;n++){const i=2.61+n*.82;surface(H,R,H.tile(i,9.53,.66,1.1,.77),'paper',1);if(n===0)H.line(R,[H.p(i+.1,9.61,.79),H.p(i+.55,10.47,.79)],'blue',1);else if(n===1)stroke(H,R,[H.p(i+.2,9.65,.79),H.p(i+.5,10,.79),H.p(i+.1,10.28,.79),H.p(i+.54,10.42,.79)],'coral',1.2);else if(n===2){shape(H,R,H.tile(i+.1,9.64,.41,.8,.8),'teal',.4);for(let k=0;k<7;k++)H.line(R,[H.p(i+.11,9.68+k*.1,.81),H.p(i+.48,9.68+k*.1,.81)],'sun',.7);}else surface(H,R,[H.p(i+.12,9.66,.79),H.p(i+.53,9.66,.79),H.p(i+.53,10.23,.79),H.p(i+.31,10.39,.79),H.p(i+.12,10.25,.79)],'coral',.5);}
  benchFrame(H,R,9.92,7.2,1.38,3.66,.88,'sun');
  box(H,R,10.06,7.42,1.06,1.68,.92,.36,'teal',.6);surface(H,R,H.tile(10.17,7.55,.84,1.44,1.31),'blue',.5);
  surface(H,R,[H.p(10.22,7.66,1.33),H.p(10.84,7.68,1.41),H.p(10.95,8.7,1.39),H.p(10.4,8.78,1.3)],'paper',.88);
  cushion(H,R,10.12,9.61,1.02,.85,.91,.23,'paper');
  hangingRail(H,R,'ne',11.13,.6,2.75,1,(P,u)=>{const [x,y]=P(u,0);shape(H,R,[[x-6,y],[x+6,y],[x+9,y+26],[x-8,y+26]],'coral',.5);H.line(R,[[x,y+5],[x,y+23]],'sun',.9);});
  taskLight(H,R,7.63,3.73,1.15,'coral',.5);floorLight(H,6.5,6.3,149,.38);
}
function binding(H,R,t){
  const f=opened(t),a=f*2.83;
  book(H,R,6.06,4.56,1.4,1.16,1.37,'teal',.17);
  const P=(u,v,z=0)=>H.p(6.06+u*Math.cos(a),4.52+v,1.69+u*Math.sin(a)+z);
  surface(H,R,[P(0,0),P(1.21,0),P(1.21,1.48),P(0,1.48)],'coral',.73);
  surface(H,R,[P(.05,.07,.015),P(1.15,.07,.015),P(1.15,1.4,.015),P(.05,1.4,.015)],'paper',.95);
  for(let n=0;n<7;n++)H.line(R,[P(.11,.19+n*.16,.025),P(1.07,.19+n*.16,.025)],'teal',.55,{tone:.43});
  for(const j of[4.82,5.63]){H.line(R,[H.p(6.2,j,1.97),H.p(7.21,j,1.97)],'sun',2);}
  for(let n=0;n<6;n++)H.line(R,[H.p(5.97,4.71+n*.22,1.71),H.p(6.17,4.71+n*.22,1.71)],'paper',1.1);
  const lift=f*.15;
  surface(H,R,[H.p(7.22,5.99,1.25+lift),H.p(7.75,6.03,1.25+lift),H.p(7.77,6.39,1.25+lift),H.p(7.24,6.36,1.25+lift)],'paper',1);
  for(let n=0;n<5;n++)H.line(R,[H.p(7.29+n*.08,6.04,1.27+lift),H.p(7.3+n*.08,6.34,1.27+lift)],'teal',.55);
}
const room=world('amsterdam-canal-bindery','A spine in the window',{wall:false,pattern:'boards',floor:'paper',tone:.26,head:75},shell,(H,R,time)=>{
  const t=cycle(time,20)*20;binding(H,R,t);
  const hand=FIGURES.pose({who:'adult',at:[0,0,0],clip:'amsterdamBinderyOpen',face:'sw',scale:1.48},t,null,H).nearHand,target=H.p(7.75,6.39,1.25+opened(t)*.15),dx=(target[0]-hand[0])/32,dy=(target[1]-hand[1])/16;
  actor(H,R,(dx+dy)/2,(dy-dx)/2,t,'amsterdamBinderyOpen',{shirt:['coral',.72],apron:['paper',.9],hairStyle:'bun',glasses:true,face:'sw'},0,1.48);
  const [x,y]=H.p(4.45,5.76,1.19);oval(H,R,x,y,5,3,'sun');stroke(H,R,[[x,y],[x+9,y+3],[x+17,y+2+Math.sin(TAU*time/20)]],'coral',.7);
});
room.loopSeconds=20;room.stillTime=9.7;
export default room;
