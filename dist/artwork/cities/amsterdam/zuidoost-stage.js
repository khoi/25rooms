import { world, shape, stroke, oval, box, actor, mix, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, drape, bentTube, vessel, benchFrame } from '../materials.js';
import { rackFrame, masonry } from '../structure.js';
import { windowBay, taskLight, caster, floorShadow, hangingRail } from '../joinery.js';

const duration=36;
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const rest={...FIGURES.clips.idle.keys[0][1]};
FIGURES.clips.amsterdamStageTechnician={dur:duration,keys:[[0,rest],[1,rest]]};

function coil(H,R,i,j,z,r=10){const p=H.p(i,j,z);for(let n=0;n<4;n++)H.outline(R,ell(p[0],p[1],r-n*1.4,r*.45-n*.65),'blue',1.3);H.line(R,[[p[0]-r*.55,p[1]-r*.34],[p[0]-r*.48,p[1]+r*.34]],'coral',2.2);return p;}

function lid(H,R,a){
  const P=(u,v,z=0)=>H.p(3.05+u,3.63+v*Math.cos(a),1.37+v*Math.sin(a)+z);
  shape(H,R,[P(0,0),P(4.78,0),P(4.78,2.56),P(0,2.56)],'teal',.7,1.15);
  shape(H,R,[P(.16,.17,.03),P(4.63,.17,.03),P(4.63,2.38,.03),P(.16,2.38,.03)],a>.785?'paper':'teal',a>.785?.95:.53,.75);
  if(a>.785)for(let row=0;row<4;row++)for(let col=0;col<8;col++){
    const u=.3+col*.54,v=.3+row*.51;
    shape(H,R,[P(u,v,.04),P(u+.35,v,.04),P(u+.41,v+.21,.04),P(u+.34,v+.36,.04),P(u+.04,v+.37,.04),P(u-.04,v+.2,.04)],'teal',.15,.45);
  }
  if(a<=.785)for(const u of [1.06,3.73]){H.line(R,[P(u,.1,.05),P(u,2.44,.05)],'blue',4);H.line(R,[P(u+.025,.1,.06),P(u+.025,2.44,.06)],'sun',2.2);}
  for(const [u,v]of[[0,0],[4.57,0],[0,2.36],[4.57,2.36]])shape(H,R,[P(u,v,.06),P(u+.21,v,.06),P(u+.21,v+.2,.06),P(u,v+.2,.06)],'sun',.7,.7);
  for(const u of [.46,4.29]){
    const anchor=H.p(3.05+u,4.07,1.31),end=P(u,2.14,-.02),joint=[mix(anchor[0],end[0],.5)+5,mix(anchor[1],end[1],.5)+6*(1-a/1.11)];
    H.line(R,[anchor,joint,end],'blue',3);H.line(R,[anchor,joint,end],'sun',1.6);H.dot(...joint,1.7,'paper');
  }
  return P;
}

function stand(H,R,i,j,z,spread,inclination){
  const P=(x,y,h)=>H.p(i+x-h*1.43*Math.cos(inclination),j+y,z+h*Math.sin(inclination));
  for(let n=0;n<3;n++){
    const a=n*Math.PI*2/3+.4,r=.16+spread*.74;
    H.line(R,[P(0,0,.56),P(Math.cos(a)*r,Math.sin(a)*r,.08)],'blue',3.3);
    H.line(R,[P(0,0,.56),P(Math.cos(a)*r,Math.sin(a)*r,.08)],'teal',1.5);
    H.line(R,[P(0,0,.3),P(Math.cos(a)*r*.65,Math.sin(a)*r*.65,.24)],'sun',1.2);
    oval(H,R,...P(Math.cos(a)*r,Math.sin(a)*r,.04),3,2,'blue',.85);
  }
  H.line(R,[P(0,0,.1),P(0,0,2.04)],'blue',4);H.line(R,[P(.025,.005,.67),P(.025,.005,2.01)],'paper',1);
  metal(H,R,i-.13,j-.13,.26,.26,z+1.06,.2,'teal');H.line(R,[P(.09,0,1.17),P(.27,0,1.17)],'sun',2);H.dot(...P(.29,0,1.17),2.3,'coral');
  H.line(R,[P(-.38,0,1.96),P(.49,0,2.19)],'blue',3.5);H.line(R,[P(-.36,.015,1.98),P(.47,.015,2.21)],'sun',1.2);
  H.line(R,[P(.45,0,2.17),P(.62,0,2.23)],'coral',4.4);
  return P;
}

const room=world('amsterdam-zuidoost-stage','The case opens before the show',{floor:'paper',tone:.3,wall:'teal',wallTone:.25,height:4.1,head:65},(H,R)=>{
  masonry(H,R,'nw',.2,11.6,.1,3.91,'paper',.55);
  windowBay(H,R,'ne',1.94,9.37,2.95,1.0,{ink:'blue',night:true,divisions:5});
  for(const i of [.51,6.02,11.49])metal(H,R,i,.18,.18,.25,.04,4.4,'blue');
  for(const z of [4.1,4.56])bentTube(H,R,[[.6,.32,z],[11.6,.32,z]],3,'teal');
  for(let n=0;n<6;n++)bentTube(H,R,[[.68+n*1.79,.32,4.1],[1.57+n*1.79,.32,4.55],[2.46+n*1.79,.32,4.1]],1.5,'blue');
  bentTube(H,R,[[.33,10.83,.12],[.33,10.83,3.1],[.33,1.2,3.1],[1.6,1.2,3.1],[1.6,.3,4.12]],1.8,'teal');
  for(const j of [2.5,5,7.4,10])metal(H,R,.23,j,.16,.12,3.02,.15,'sun');
  rackFrame(H,R,6.94,.51,4.25,1.81,.1,[.13,1.36,2.69,3.88],'blue',(i,j,w,d,z,n)=>{
    if(n===0){
      for(let k=0;k<3;k++)metal(H,R,i+.16+k*1.29,j+.3,1.02,1.08,z,.62,k===1?'coral':'teal');
      for(let k=0;k<3;k++)H.line(R,[H.p(i+.35+k*1.29,j+1.4,z+.29),H.p(i+.84+k*1.29,j+1.4,z+.29)],'sun',2.7);
    }else if(n===1){
      for(const [x,y]of[[i+.4,j+.5],[i+1.49,j+.74]]){
        const p=H.p(x,y,z+.11);oval(H,R,...p,15,12,'sun',.55);oval(H,R,...p,10,8,'blue',.8);oval(H,R,...p,4,3,'teal',.8);H.dot(...p,1.3,'paper');
        H.line(R,[[p[0]-15,p[1]],[p[0]+15,p[1]]],'blue',.7);H.line(R,[[p[0],p[1]-12],[p[0],p[1]+12]],'blue',.7);
      }
      metal(H,R,i+2.55,j+.12,1.21,1.11,z,.17,'teal');for(let k=0;k<5;k++){metal(H,R,i+2.65+k*.18,j+.4,.1,.45,z+.19,.1,'sun');}
    }else if(n===2){
      for(let k=0;k<4;k++){metal(H,R,i+.14+k*.45,j+.25,.32,.69,z,.11,'teal');bentTube(H,R,[[i+.29+k*.45,j+.59,z+.1],[i+.29+k*.45,j+.59,z+.75]],1.6,'blue');oval(H,R,...H.p(i+.29+k*.45,j+.59,z+.74),3,6,'paper',1);}
      metal(H,R,i+2.2,j+.22,1.35,.86,z,.99,'blue');const p=H.p(i+2.88,j+1.09,z+.49);oval(H,R,...p,11,12,'teal',.5);oval(H,R,...p,7,8,'blue',.85);H.dot(...p,2,'sun');
    }else{
      timber(H,R,i+.12,j+.15,1.82,1.21,z,.08,'sun');for(const x of [i+.2,i+1.75])bentTube(H,R,[[x,j+.22,z+.1],[x,j+.22,z+.61]],1.1,'blue');bentTube(H,R,[[i+.2,j+.22,z+.61],[i+1.75,j+.22,z+.61]],1.1,'blue');
      drape(H,R,i+.27,j+.2,.42,.54,z+.6,.36,'coral');drape(H,R,i+1.2,j+.2,.42,.54,z+.6,.36,'coral');
      shape(H,R,H.tile(i+2.4,j+.24,1.12,.83,z+.05),'paper',1,.7);for(let k=0;k<3;k++)H.line(R,[H.p(i+2.5+k*.32,j+.31,z+.065),H.p(i+2.63+k*.32,j+.91,z+.065)],['coral','teal','sun'][k],1.6);
    }
  });
  hangingRail(H,R,'nw',1.57,3.44,3.25,3,(P,u,n)=>{
    if(n<2){shape(H,R,[P(u-.27,-.21),P(u+.28,-.21),P(u+.46,-1.4),P(u-.42,-1.4)],n?'teal':'paper',n?.5:1,.75);H.line(R,[P(u,-.22),P(u,-1.32)],'blue',.7);shape(H,R,[P(u+.1,-.35),P(u+.35,-.36),P(u+.35,-.62),P(u+.1,-.61)],'coral',.45,.5);}
    else{const p=P(u,-.6);oval(H,R,...p,10,12,'teal',.75);H.line(R,[P(u,-.15),P(u,-.31)],'blue',2.3);}
  });
  for(let n=0;n<4;n++){const j=5.32+n*.35;metal(H,R,.51,j,.68,.14,.21,2.45,'teal');H.line(R,[H.p(1.2,j,.3),H.p(1.2,j,2.52)],'paper',.8);}
  floorShadow(H,2.81,3.42,5.27,3.16,.24);
  for(const i of [3.33,7.5])for(const j of [3.97,5.91])caster(H,R,i,j,.22);
  metal(H,R,3.03,3.62,4.84,2.66,.39,.22,'teal');
  shape(H,R,H.faceI(3.09,3.68,4.71,.6,1.31),'blue',.9,.7);
  shape(H,R,H.tile(3.23,3.82,4.46,2.25,.75),'paper',.85,.65);
  const foam=[H.p(3.39,4.36,.78),H.p(6.69,4.36,.78),H.p(6.69,4.08,.78),H.p(7.25,4.08,.78),H.p(7.25,4.95,.78),H.p(6.69,4.95,.78),H.p(6.69,4.66,.78),H.p(3.39,4.66,.78)];shape(H,R,foam,'blue',.86,.65);H.line(R,[H.p(6.74,4.1,.8),H.p(7.25,4.1,.8),H.p(7.25,4.9,.8)],'coral',1.1);
  coil(H,R,4.3,5.4,.8,14);cushion(H,R,5.4,5.13,.94,.59,.82,.16,'sun');
  for(const j of [3.62,6.13])metal(H,R,3.02,j,4.87,.14,.54,.85,'teal');
  for(const i of [3.02,7.74])metal(H,R,i,3.63,.14,2.62,.54,.85,'teal');
  for(const i of [3.07,7.54])for(const j of [3.7,6.01])metal(H,R,i,j,.29,.24,.43,1.0,'sun');
  for(const i of [4.04,6.38]){
    const p=H.p(i,6.29,1.09);shape(H,R,[[p[0]-5,p[1]-5],[p[0]+5,p[1]-5],[p[0]+5,p[1]+5],[p[0]-5,p[1]+5]],'sun',.8,.7);H.line(R,[[p[0]-3,p[1]],[p[0]+3,p[1]]],'blue',2.1);H.dot(p[0],p[1],1.3,'paper');
  }
  const handle=H.p(5.31,6.29,.86);stroke(H,R,[[handle[0]-10,handle[1]-3],[handle[0]-10,handle[1]+5],[handle[0]+10,handle[1]+5],[handle[0]+10,handle[1]-3]],'blue',3);H.line(R,[[handle[0]-3,handle[1]+5],[handle[0]+6,handle[1]+5]],'coral',3);
  metal(H,R,7.36,6.22,.35,.21,.23,.06,'blue');H.line(R,[H.p(7.43,6.4,.3),H.p(7.64,6.4,.3)],'paper',1.2);
  shape(H,R,H.tile(8.46,4.37,2.77,3.55,.03),'blue',.25,.65);for(const i of [8.51,11.07])H.line(R,[H.p(i,4.48,.05),H.p(i,7.77,.05)],'sun',1.2);
  const lp=H.p(8.93,3.54,3.15);bentTube(H,R,[[8.93,3.54,.06],[8.93,3.54,3.08]],3,'blue');
  for(const [x,y]of[[8.27,3.81],[9.68,3.85],[8.97,2.75]])bentTube(H,R,[[8.93,3.54,.67],[x,y,.04]],2.4,'teal');
  shape(H,R,[[lp[0]-9,lp[1]-7],[lp[0]+9,lp[1]-7],[lp[0]+15,lp[1]+5],[lp[0]+8,lp[1]+12],[lp[0]-12,lp[1]+10]],'blue',.85,.85);oval(H,R,lp[0]+8,lp[1]+7,9,6,'sun',.85);H.glow(lp[0]+10,lp[1]+26,42,30,'sun',.24);
  cushion(H,R,8.21,3.36,.86,.66,.1,.22,'coral');H.line(R,[H.p(8.29,3.7,.34),H.p(8.98,3.7,.34)],'blue',1);
  benchFrame(H,R,2.54,8.33,3.57,1.81,.71,'sun');
  metal(H,R,2.77,8.55,3.11,1.32,.74,.035,'teal');
  const cp=H.p(3.3,9.05,.82);oval(H,R,...cp,8,4,'blue',.72);oval(H,R,cp[0]+7,cp[1]+3,7,4,'sun',.65);H.line(R,[[cp[0]-6,cp[1]],[cp[0]+2,cp[1]]],'paper',1.1);
  bentTube(H,R,[[4.11,8.72,.79],[4.11,9.21,.79]],4,'blue');metal(H,R,4.01,8.86,.21,.15,.81,.13,'sun');
  box(H,R,4.6,8.73,.66,.49,.79,.13,'blue',.75);cushion(H,R,4.68,8.82,.49,.28,.94,.07,'paper');
  coil(H,R,5.49,9.27,.8,8);H.line(R,[H.p(5.53,8.53,.8),H.p(5.79,8.78,.8)],'coral',3);
  for(const i of [8.05,9.02]){bentTube(H,R,[[i,8.95,.07],[i,9.59,.7],[i,10.02,.09]],2.5,'blue');bentTube(H,R,[[i,9.04,1.62],[i,9.07,.75]],2.5,'blue');}
  cushion(H,R,7.98,9.07,1.12,.89,.72,.08,'coral');shape(H,R,H.faceI(7.98,9.04,1.13,.97,1.57),'teal',.62,.7);drape(H,R,7.99,9.0,.51,.57,1.61,.53,'sun');
  vessel(H,R,10.16,9.46,.12,6,19,'teal',false);box(H,R,10.57,9.61,.82,.57,.1,.24,'sun',.5);cushion(H,R,9.89,10.11,.55,.43,.12,.13,'paper');
  for(const j of [7.25,9.0]){
    const P=(u,z)=>H.p(.45,j+u,z);
    shape(H,R,[P(0,1.13),P(1.36,1.13),P(1.36,2.68),P(0,2.68)],'blue',.69,.8);
    shape(H,R,[P(.13,1.3),P(1.23,1.3),P(1.23,2.5),P(.13,2.5)],'teal',.27,.65);
    for(let n=0;n<7;n++)H.line(R,[P(.17+n*.15,1.35),P(.17+n*.15,2.45)],'paper',.5,{tone:.45});
    H.line(R,[P(.05,1.14),P(1.33,2.6)],'coral',1.3);
    for(const u of [.14,1.21])H.line(R,[P(u,1.1),P(u,.85)],'sun',2);
  }
  for(let j=8.1;j<11.4;j+=.24)H.line(R,[H.p(.12,j,.03),H.p(.54,j,.03)],'blue',1.1);metal(H,R,.62,10.63,1.17,.78,.08,.07,'teal');
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,opened=ease(7.2,11.7,t)*(1-ease(29,33,t)),lift=ease(11.7,14.4,t)*(1-ease(25.2,29,t)),spread=ease(14.4,17.1,t)*(1-ease(21.6,25.2,t));
  const i=mix(6.59,9.72,lift),j=mix(4.58,5.72,lift),z=mix(.78,.07,lift)+Math.sin(lift*Math.PI)*.67;
  if(lift>0)lid(H,R,opened*1.13);
  const P=stand(H,R,i,j,z,spread,lift*Math.PI/2);
  if(lift===0)lid(H,R,opened*1.13);
  const actorI=mix(6.83,10.48,lift),actorJ=mix(6.7,6.84,lift),q={...rest,head:13,al:35,ar:40,el:45,er:49},scale=1.55,at=H.p(actorI,actorJ,.02);
  const handToStand=ease(10.2,11.7,t)*(1-ease(29,30.1,t)),latch=H.p(6.5,6.22,1.14),collar=P(.23,0,1.15);
  const target=[mix(latch[0],collar[0],handToStand),mix(latch[1],collar[1],handToStand)];
  const dx=(target[0]-at[0])/scale-5.2,dy=(target[1]-at[1])/scale+32.5,a=4.368,b=4.2,r=Math.min(a+b-.001,Math.hypot(dx,dy)),e=Math.acos(Math.max(-1,Math.min(1,(r*r-a*a-b*b)/(2*a*b))));q.ar=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q.er=e*180/Math.PI;
  if(t<4){q.drop=.1*ease(0,1.8,t)*(1-ease(2.3,4,t));q.head+=15*q.drop;}
  FIGURES.clips.amsterdamStageTechnician.keys=[[0,q],[1,q]];actor(H,R,actorI,actorJ,0,'amsterdamStageTechnician',{shirt:['coral',.7],pants:['blue',.65],hairStyle:'short'},.02,scale);
  if(lift>.001){const p=P(.23,0,1.15);H.dot(...p,2,'paper');}
  const tie=H.p(4.03,5.4,.94),s=Math.sin(t/duration*Math.PI*2);if(opened>.75)H.line(R,[[tie[0],tie[1]-5],[tie[0]+3+s,tie[1]],[tie[0],tie[1]+5]],'coral',1.7);
});
room.loopSeconds=duration;
room.stillTime=18.7;
export default room;
