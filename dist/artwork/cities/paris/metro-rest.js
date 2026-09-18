import { world, box, shape, oval, stroke, actor, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, slattedSeat, bentTube, cushion, drape, vessel } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
import { windowBay, wallCourse, cornice, wallRack, taskLight, panelFront, floorShadow } from '../joinery.js';

const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x)};
const base={x:0,y:0,drop:0,lean:0,head:0,al:-10,ar:12,el:-6,er:6,ll:-5,lr:5,kl:0,kr:0,roll:0};
function bag(H,R,i,j,z){
  box(H,R,i,j,.86,.53,z,.55,'teal',.75);shape(H,R,H.faceI(i+.09,j+.54,.67,z+.09,z+.38),'teal',.52,.6);
  bentTube(H,R,[[i+.12,j+.22,z+.56],[i+.18,j+.22,z+.82],[i+.68,j+.22,z+.84],[i+.75,j+.22,z+.56]],1.3,'blue');
  H.line(R,[H.p(i+.28,j+.56,z+.13),H.p(i+.28,j+.56,z+.46)],'sun',2);
  H.line(R,[H.p(i+.22,j+.57,z+.29),H.p(i+.34,j+.57,z+.29)],'paper',1);
}
function vest(H,R,i,j,z){
  shape(H,R,H.tile(i,j,1.02,.69,z),'sun',.82,.65);
  H.line(R,[H.p(i+.13,j+.11,z+.01),H.p(i+.91,j+.11,z+.01)],'paper',2.8);
  H.line(R,[H.p(i+.12,j+.53,z+.01),H.p(i+.88,j+.53,z+.01)],'paper',2.8);
  H.line(R,[H.p(i+.49,j+.07,z+.015),H.p(i+.49,j+.6,z+.015)],'blue',.8);
  shape(H,R,H.tile(i+.63,j+.27,.21,.19,z+.025),'paper',1,.4);
  for(let n=0;n<4;n++)H.line(R,[H.p(i+.64+n*.05,j+.28,z+.03),H.p(i+.64+n*.05,j+.44,z+.03)],'blue',.35);
}
const room=world('paris-metro-rest','Between two journeys',{floor:'paper',tone:.65,pattern:'tiles',accent:'teal',wall:'paper',wallTone:1,height:3.8,head:15},(H,R)=>{
  wallCourse(H,R,'nw',0,12,1.17,'teal');wallCourse(H,R,'ne',0,12,1.17,'teal');
  cornice(H,R,'nw',0,12,3.69);cornice(H,R,'ne',0,12,3.69);
  windowBay(H,R,'nw',2.1,3.8,1.25,2.1,{ink:'blue',divisions:2,view:P=>{
    shape(H,R,[P(.16,.18),P(3.6,.18),P(3.6,1.85),P(.16,1.85)],'teal',.18,.3);
    for(let n=0;n<4;n++)H.line(R,[P(.2+n*.91,.3),P(.2+n*.91,1.8)],'blue',1.2);
    H.line(R,[P(.2,.49),P(3.6,.49)],'coral',3.8);
  }});
  for(let n=0;n<4;n++){
    timber(H,R,.3,7.5+n*.78,2.75,.76,n*.24,.24,'sun');
    H.line(R,[H.p(.35,8.22+n*.78,(n+1)*.24+.01),H.p(2.99,8.22+n*.78,(n+1)*.24+.01)],'blue',2);
  }
  for(const j of [7.6,10.45])bentTube(H,R,[[2.88,j,(j-7.5)/.78*.24],[2.88,j,1.29+(j-7.5)/.78*.24]],2.7,'teal');
  bentTube(H,R,[[2.88,7.4,1.23],[2.88,10.8,2.28]],3,'teal');
  H.tint(H.tile(3.5,3.2,5,3.6,.02),'sun',.18);
  for(const i of [1.2,4.15]){
    metal(H,R,i,2.65,.14,.14,.04,3.15,'blue');
    metal(H,R,i,2.61,.2,.24,0,.1,'teal');
  }
  const glass=[H.p(1.35,2.71,.87),H.p(4.14,2.71,.87),H.p(4.14,2.71,3.07),H.p(1.35,2.71,3.07)];
  H.tint(glass,'teal',.055);H.outline(R,glass,'blue',.85);
  H.line(R,[H.p(1.35,2.73,.87),H.p(4.14,2.73,.87)],'teal',4);
  for(const i of [1.65,2.75])H.line(R,[H.p(i,2.74,1.18),H.p(i+.41,2.74,2.92)],'paper',2.2);
  metal(H,R,1.26,2.69,2.98,.13,.09,.69,'teal');
  bentTube(H,R,[[4.14,2.78,1.04],[4.39,3.02,1.04],[4.39,3.02,1.21]],2.1,'teal');
  const padding=H.p(4.37,3,1.1);oval(H,R,...padding,3,5,'sun',.6);
  for(let n=0;n<4;n++)shape(H,R,H.faceI(1.42+n*.67,2.84,.56,.23,.64),'paper',.43,.4);
  cabinetFrame(H,R,4.7,2.6,2.02,1.03,.04,3.22,1,'blue',(x,j,w,d,z)=>{
    for(const zz of [.52,1.44,2.48])metal(H,R,x,j,w,d,z+zz,.07,'teal');
    vest(H,R,x+.25,j+.09,z+1.52);
    vessel(H,R,x+.36,j+.51,z+2.61,6.5,17,'coral',false);
    bag(H,R,x+.23,j+.07,z+.07);
  });
  metal(H,R,7.03,2.65,1.44,.98,.08,3.13,'blue');
  shape(H,R,H.faceI(7.17,3.64,1.15,.23,3.02),'blue',.45,.85);
  for(const z of [.6,.76,2.47,2.63])H.line(R,[H.p(7.4,3.66,z),H.p(8.08,3.66,z)],'paper',1.2);
  H.line(R,[H.p(7.42,3.68,1.43),H.p(7.42,3.68,1.75)],'sun',2);
  slattedSeat(H,R,4.77,4.24,3.34,.1,'sun',.61);
  cushion(H,R,6.93,4.39,.75,.57,.78,.07,'paper');
  bag(H,R,7.12,4.53,.86);
  benchFrame(H,R,9.38,.65,2.04,5.85,1.23,'teal');
  panelFront(H,R,9.43,6.46,1.92,.14,.88,2,'teal');
  basin(H,R,9.55,.9,1.66,1.65,1.23,'paper');
  vessel(H,R,10.49,3.12,1.23,13,19,'paper',false);
  const kp=H.p(10.49,3.12,1.23);stroke(H,R,[[kp[0]-9,kp[1]-17],[kp[0]-19,kp[1]-13],[kp[0]-17,kp[1]-4],[kp[0]-10,kp[1]-2]],'teal',2.1);
  metal(H,R,9.94,2.59,.65,.72,1.23,.07,'blue');
  H.line(R,[H.p(10.49,2.65,1.31),H.p(10.8,2.07,1.25)],'blue',.9);
  for(let n=0;n<3;n++)vessel(H,R,9.77+n*.46,4.55,1.25,5,7,n===1?'coral':'paper',true);
  drape(H,R,9.65,5.16,1.5,.82,1.24,.47,'paper');
  wallRack(H,R,'ne',8.68,2.78,2.23,1.15,1,'teal',(P,z)=>{
    const p=P(.48,z+.05);shape(H,R,[[p[0]-12,p[1]],[p[0]-12,p[1]-21],[p[0]+10,p[1]-21],[p[0]+10,p[1]]],'paper',1,.6);
    shape(H,R,[[p[0]-9,p[1]-3],[p[0]-6,p[1]-15],[p[0]+2,p[1]-9],[p[0]+8,p[1]-17],[p[0]+7,p[1]-3]],'coral',.5,.4);
    const bus=P(1.54,z+.07);shape(H,R,[[bus[0]-12,bus[1]],[bus[0]-12,bus[1]-9],[bus[0]+13,bus[1]-9],[bus[0]+13,bus[1]]],'sun',.8);H.line(R,[[bus[0]-9,bus[1]-6],[bus[0]+9,bus[1]-6]],'paper',2.5);H.dot(bus[0]-7,bus[1]+1,2.1,'blue');
    const radio=P(2.31,z+.05);shape(H,R,[[radio[0]-8,radio[1]],[radio[0]-8,radio[1]-13],[radio[0]+8,radio[1]-13],[radio[0]+8,radio[1]]],'teal',.6);for(let n=0;n<4;n++)H.line(R,[[radio[0]-5+n*3,radio[1]-10],[radio[0]-5+n*3,radio[1]-3]],'paper',.65);
  });
  taskLight(H,R,8.13,3.03,3.22,'coral',.1);
  box(H,R,5.8,8.99,2.46,1.26,.02,.16,'teal',.45);
  for(let n=0;n<7;n++)H.line(R,[H.p(5.98+n*.32,9.1,.2),H.p(5.98+n*.32,10.14,.2)],'blue',1.3);
  for(const i of [6.27,7.01]){const p=H.p(i,9.5,.21);shape(H,R,[[p[0]-5,p[1]+4],[p[0]+8,p[1]+6],[p[0]+9,p[1]-1],[p[0]+3,p[1]-5],[p[0]+2,p[1]-18],[p[0]-5,p[1]-18]],'blue',.74,.7);H.line(R,[[p[0]-3,p[1]-14],[p[0],p[1]-14]],'sun',1);}
  benchFrame(H,R,9.72,8.9,1.54,1.93,.53,'sun');
  drape(H,R,9.85,9.2,.83,1.01,.54,.25,'coral');
  shape(H,R,H.tile(10.29,9.6,.7,.54,.58),'paper',1);
  H.line(R,[H.p(9.9,10.69,.55),H.p(10.88,10.69,.55)],'blue',2);
  floorShadow(H,3.8,10.67,3.8,.35,.12);
  metal(H,R,3.6,11.26,4.7,.29,.02,.055,'blue');
  for(let n=0;n<16;n++)H.line(R,[H.p(3.75+n*.28,11.29,.082),H.p(3.75+n*.28,11.48,.082)],'paper',.8);
},(H,R,t)=>{
  const u=((t%16)+16)%16,open=ease(3.2,6.4,u)*(1-ease(9.6,12.7,u)),standing=ease(.3,2.8,u)*(1-ease(12.7,14,u));
  const angle=open*2.05,hx=6.63,hy=3.66,di=-1.78*Math.cos(angle),dj=1.78*Math.sin(angle);
  const D=(f,z)=>H.p(hx+di*f,hy+dj*f,z);
  shape(H,R,[D(0,.2),D(1,.2),D(1,3.08),D(0,3.08)],'blue',.56,.9);
  shape(H,R,[D(.08,.35),D(.91,.35),D(.91,2.93),D(.08,2.93)],'blue',.3,.6);
  for(const z of [.64,.78,2.55,2.69])H.line(R,[D(.17,z),D(.8,z)],'paper',1.15);
  for(const z of [.54,2.62])H.line(R,[D(.015,z),D(.015,z+.19)],'sun',2.7);
  H.line(R,[D(.82,1.27),D(.82,1.53)],'sun',2.6);
  const magnet=D(.54,2.05);shape(H,R,[[magnet[0]-5,magnet[1]],[magnet[0]-7,magnet[1]-4],[magnet[0]-3,magnet[1]-7],[magnet[0]+1,magnet[1]-8],[magnet[0]+5,magnet[1]-4],[magnet[0]+7,magnet[1] ]],'paper',1,.5);
  const i=5.42+(hx+di*.82+.28-5.42)*standing,j=4.66+(hy+dj*.82+.73-4.66)*standing;
  const pose={...base,drop:.47*(1-standing),ll:84*(1-standing)-5*standing,lr:80*(1-standing)+5*standing,kl:-84*(1-standing),kr:-80*(1-standing),head:9,al:22,el:32};
  const root=H.p(i,j,.23*(1-standing)),target=D(.82,1.42),s=1.7;
  const dx=(target[0]-root[0])/s-5.2,dy=(target[1]-root[1])/s+32.5-pose.drop*19;
  const bend=-Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-4.368**2-4.2**2)/(2*4.368*4.2))));
  pose.ar=20+(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(bend),4.368+4.2*Math.cos(bend)))*180/Math.PI*standing-20*standing;pose.er=30+(bend*180/Math.PI-30)*standing;
  FIGURES.clips.parisMetroLocker={dur:16,keys:[[0,pose],[1,pose]]};
  actor(H,R,i,j,0,'parisMetroLocker',{shirt:['paper',1],vest:['teal',.7],hairStyle:'short'},.23*(1-standing),s);
  actor(H,R,3.68,7.45,0,'idle',{shirt:['coral',.61],pants:['blue',.65],hairStyle:'pony'},0,1.63);
  H.line(R,[H.p(1.74,2.77,1.18),H.p(2.04+standing*.08,2.77,2.84)],'paper',1.6);
});
room.loopSeconds=16;room.stillTime=15;
export default room;
