import { world, box, shape, oval, stroke, actor, wallRect, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, bentTube, drape, vessel, floorLight, caneChair } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, cityView, cornice, wallCourse, wallRack, radiator, taskLight, panelFront } from '../joinery.js';

const contactPose={...FIGURES.sample('idle',0)};
FIGURES.clips.parisPianoContact={dur:1,keys:[[0,contactPose],[1,contactPose]]};
function contactPerson(H,R,target,options={},scale=1.72,root,pose={}){
  Object.assign(contactPose,FIGURES.sample('idle',0),pose);
  const base=root||[target[0]+scale*2,target[1]+scale*28];
  const a=contactPose.lean*Math.PI/180,cx=contactPose.x-Math.sin(a)*15,cy=contactPose.y+contactPose.drop*19-19-Math.cos(a)*15;
  const sx=cx+5.2*Math.cos(a)-1.5*Math.sin(a),sy=cy+5.2*Math.sin(a)+1.5*Math.cos(a);
  const dx=(target[0]-base[0])/scale-sx,dy=(target[1]-base[1])/scale-sy,l=4.368,r=4.2;
  const bend=Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-l*l-r*r)/(2*l*r))));
  contactPose.ar=(Math.atan2(dx,dy)-Math.atan2(r*Math.sin(bend),l+r*Math.cos(bend)))*180/Math.PI;
  contactPose.er=bend*180/Math.PI;
  if(options.leftTarget){
    const sx=cx-5.2*Math.cos(a)-1.5*Math.sin(a),sy=cy-5.2*Math.sin(a)+1.5*Math.cos(a),dx=(options.leftTarget[0]-base[0])/scale-sx,dy=(options.leftTarget[1]-base[1])/scale-sy;
    const bend=-Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-l*l-r*r)/(2*l*r))));
    contactPose.al=(Math.atan2(dx,dy)-Math.atan2(r*Math.sin(bend),l+r*Math.cos(bend)))*180/Math.PI;
    contactPose.el=bend*180/Math.PI;
  }

  FIGURES.draw(H,R,{who:'adult',x:base[0],y:base[1],t:0,phase:0,clip:'parisPianoContact',scale,face:options.face||'se',ground:base,opts:options});
}
const T=18,rest=FIGURES.sample('idle',0),seat={...FIGURES.sample('sit',0),lean:-7,head:12};
const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
FIGURES.clips.parisPianoPlayer={dur:T,keys:[[0,{...seat,al:-60,ar:-60,el:-44,er:-44}],[.2,{...seat,al:-66,ar:-68,el:-28,er:-32}],[.24,{...seat,al:-60,ar:-66,el:-36,er:-24}],[.28,{...seat,al:-65,ar:-58,el:-30,er:-38}],[.32,{...seat,al:-58,ar:-66,el:-38,er:-24}],[.36,{...seat,al:-64,ar:-60,el:-30,er:-36}],[.4,{...seat,al:-63,ar:-64,el:-31,er:-32,lr:74,kr:-66}],[.6,{...seat,al:-63,ar:-64,el:-31,er:-32,lr:74,kr:-66}],[.72,{...seat,al:12,ar:-8,el:30,er:36,head:20}],[.89,{...seat,al:-60,ar:-60,el:-44,er:-44}],[1,{...seat,al:-60,ar:-60,el:-44,er:-44}]]};
FIGURES.clips.parisPianoListener={dur:T,keys:[[0,{...rest,drop:.47,ll:84,lr:80,kl:-84,kr:-80,head:8,al:18,ar:26,el:30,er:30}],[.55,{...rest,drop:.47,ll:84,lr:80,kl:-84,kr:-80,head:2,al:18,ar:26,el:30,er:30,y:-.4}],[1,{...rest,drop:.47,ll:84,lr:80,kl:-84,kr:-80,head:8,al:18,ar:26,el:30,er:30}]]};
function piano(H,R,t){
  const u=t%T,pedal=ease(3.6,4.5,u)-ease(10.8,12,u);
  H.tint(H.tile(2.15,1.9,6.1,2.75,.03),'blue',.23);
  for(const x of [2.3,7.75])for(const y of [1.72,3.12]){oval(H,R,...H.p(x,y,.035),6,3,'coral',.6);metal(H,R,x-.08,y-.08,.16,.16,.05,.19,'blue');}
  timber(H,R,2.15,1.45,5.95,.28,.22,2.9,'sun');
  shape(H,R,H.faceI(2.35,3.9,5.5,.26,.91),'blue',.86,.8);
  for(const x of [2.18,7.82])timber(H,R,x,1.48,.26,1.9,.22,2.88,'sun');
  timber(H,R,2.12,1.4,6.06,1.37,3.08,.16,'sun');
  shape(H,R,H.faceI(2.38,2.78,5.35,1.21,3.03),'blue',.83,.8);
  for(const x of [2.41,7.57])timber(H,R,x,2.67,.14,.26,1.13,1.93,'sun');
  for(const z of [1.3,2.85])timber(H,R,2.42,2.7,5.25,.23,z,.12,'sun');
  for(let n=0;n<24;n++){
    const x=2.61+n*.201;
    H.line(R,[H.p(x,2.79,1.47),H.p(x+.09,2.79,2.78)],'sun',.8);
    const p=H.p(x+.09,2.82,2.68);oval(H,R,...p,1.8,2.5,'paper',1);
    H.line(R,[H.p(x+.06,2.83,2.1),H.p(x+.09,2.83,2.63)],'sun',1.2);
    shape(H,R,H.faceI(x,2.85,.14,1.85,2.11),'coral',.6,.45);
  }
  for(const x of [2.62,5.1,7.24]){
    bentTube(H,R,[[x,2.86,1.48],[x-.12,2.86,2.2],[x+.25,2.86,2.79]],3.1,'sun');
    for(const z of [1.56,2.67])H.dot(...H.p(x,2.9,z),2.2,'blue');
  }
  timber(H,R,2.36,2.89,5.42,.08,1.63,.13,'sun');
  H.line(R,[H.p(2.48,2.99,1.82),H.p(7.66,2.99,1.82)],'coral',3);
  for(const x of [2.08,7.78]){
    shape(H,R,[H.p(x,3.87,.39),H.p(x+.37,3.87,.39),H.p(x+.37,3.87,.66),H.p(x+.23,3.54,.93),H.p(x+.23,2.78,1.18),H.p(x,2.78,1.18)],'sun',.67,.9);
    H.line(R,[H.p(x+.05,3.85,.44),H.p(x+.18,3.6,.86),H.p(x+.07,2.88,1.11)],'paper',1.4);
  }
  timber(H,R,2.02,1.31,6.25,1.47,3.25,.095,'sun');
  for(const x of [2.11,7.92])metal(H,R,x,2.61,.22,.26,3.33,.06,'sun');
  for(let n=0;n<13;n++){
    const x=2.63+n*.37;H.line(R,[H.p(x,3.91,.4),H.p(x+.18,3.91,1.24)],'sun',.8,{tone:.72});
    H.line(R,[H.p(x+.035,3.925,.4),H.p(x+.215,3.925,1.24)],'paper',.6,{tone:.7});
  }
  timber(H,R,2.32,3.9,5.43,.13,.34,.12,'teal');
  for(const x of [2.63,4.73,7.39]){
    H.line(R,[H.p(x,3.93,.45),H.p(x,3.93,.86)],'blue',3.5);
    H.dot(...H.p(x,3.96,.78),1.6,'sun');
  }
  for(const z of [.5,.76])H.line(R,[H.p(4.94,3.95,z),H.p(5.88,3.95,z)],'coral',2);
  for(let n=0;n<3;n++)metal(H,R,4.96+n*.4,3.94,.21,.12,.42,.1,'teal');
  for(const x of [4.95,5.35,5.75]){
    bentTube(H,R,[[x,3.96,.35],[x,3.98,.57-pedal*.08],[x+.12,3.96,.88-pedal*.08]],1.7,'sun');
    metal(H,R,x-.07,3.96,.17,.15,.65-pedal*.08,.09,'coral');
    shape(H,R,H.tile(x-.1,4.08,.2,.72,.24-pedal*.045),'sun',.92,.7);
    H.line(R,[H.p(x-.06,4.2,.25-pedal*.045),H.p(x-.06,4.6,.25-pedal*.045)],'paper',1.5);
  }
  timber(H,R,2.05,2.76,6.14,1.11,.89,.16,'sun');
  shape(H,R,H.tile(2.38,2.87,5.32,.78,1.06),'blue',.88,.7);
  for(let n=0;n<28;n++){
    const down=u>3.6&&u<7.2&&n%7===Math.floor(u*2)%7?.035:0;
    box(H,R,2.42+n*.187,2.91,.175,.7,1.07-down,.045,'paper',1);
    if(![2,6].includes(n%7))box(H,R,2.55+n*.187,2.88,.097,.41,1.125-down,.06,'blue',.92);
  }
  timber(H,R,2.26,2.72,5.65,.14,1.07,.11,'teal');
  shape(H,R,[H.p(4.1,2.64,1.65),H.p(6.33,2.64,1.65),H.p(6.33,2.3,2.36),H.p(4.1,2.3,2.36)],'teal',.52,.8);
  for(let n=0;n<2;n++){
    shape(H,R,[H.p(4.21+n*1.02,2.61,1.72),H.p(5.2+n*1.02,2.61,1.72),H.p(5.2+n*1.02,2.34,2.28),H.p(4.21+n*1.02,2.34,2.28)],'paper',1,.6);
    for(let q=0;q<3;q++){H.line(R,[H.p(4.33+n*1.02,2.55-q*.075,1.87+q*.15),H.p(5.08+n*1.02,2.55-q*.075,1.87+q*.15)],'blue',.45,{tone:.5});H.dot(...H.p(4.55+n*1.02+q*.12,2.55-q*.075,1.87+q*.15),1.5,'blue');}
  }
  shape(H,R,H.tile(2.59,3.59,.78,.16,1.119),'coral',.54,.5);
  shape(H,R,H.tile(3.37,3.59,.52,.16,1.119),'teal',.47,.5);
  for(let n=0;n<3;n++)H.line(R,[H.p(3.33,3.6+n*.045,1.13),H.p(3.42,3.62+n*.045,1.13)],'sun',.8);
  taskLight(H,R,3.1,2,3.27,'coral',.6);
  timber(H,R,4.55,3.7,2.5,1.22,.55,.14,'sun');
  for(const x of [4.7,6.74])for(const y of [3.85,4.65])timber(H,R,x,y,.17,.17,0,.56,'sun');
  cushion(H,R,4.65,3.78,2.29,1.01,.69,.14,'coral');
  metal(H,R,4.8,3.73,.11,.26,.57,.06,'sun');
  timber(H,R,4.85,4.71,.22,.17,.23,.12,'teal');
  for(let n=0;n<3;n++)H.line(R,[H.p(4.72,4.71,.18+n*.12),H.p(4.84,4.71,.18+n*.12)],'blue',.65);
  timber(H,R,1.1,4.45,2.8,.16,.13,.93,'sun');
  shape(H,R,H.faceI(1.24,4.63,2.52,.27,.93),'sun',.29,.6);
  for(let n=0;n<3;n++){
    const x=1.4+n*.79;
    H.line(R,[H.p(x,4.65,.37),H.p(x+.57,4.65,.37),H.p(x+.57,4.65,.82),H.p(x,4.65,.82),H.p(x,4.65,.37)],'blue',.6);
  }
  drape(H,R,1.16,4.41,.48,.25,1.08,.34,'paper');
  const headphones=H.p(3.07,3.12,1.4);
  stroke(H,R,[[headphones[0]-8,headphones[1]+4],[headphones[0]-8,headphones[1]-11],[headphones[0]+8,headphones[1]-11],[headphones[0]+8,headphones[1]+4]],'blue',2.5);
  for(const dx of [-8,8])oval(H,R,headphones[0]+dx,headphones[1]+4,3,5,'teal',.8);
  for(const x of [4.81,6.52])H.line(R,[H.p(x,4.86,.63),H.p(x,4.86,.74)],'sun',2.8);
  H.line(R,[H.p(4.85,4.88,.59),H.p(6.72,4.88,.59)],'blue',1.4);
  oval(H,R,...H.p(6.99,4.34,.43),4,4,'sun',.66);
  for(const x of [1.3,3.25])H.line(R,[H.p(x,4.63,.2),H.p(x,4.63,.94)],'teal',1.6);
  stroke(H,R,[H.p(3.18,3.3,1.45),H.p(3.48,4.6,.04),H.p(4.4,5.2,.03),H.p(5.45,4.75,.03)],'blue',.9);
}
const room=world('paris-piano-pedal','A note kept soft',{wall:'paper',wallTone:.6,height:3.7,floor:'sun',pattern:'boards',head:75},(H,R)=>{
  for(const side of ['ne','nw']){wallCourse(H,R,side,0,12,.75,'teal');cornice(H,R,side,0,12,3.65);}
  windowBay(H,R,'nw',1.1,3.45,1.15,2.05,{night:true,divisions:2,view:P=>cityView(H,R,P,3.45,2.05,true)});
  radiator(H,R,'nw',1.45,2.7,.73);
  timber(H,R,.12,.46,.46,4.17,3.35,.12,'sun');
  for(const j of [1.25,4.39])bentTube(H,R,[[.16,j,3.29],[.62,j,3.42]],1.5,'teal');
  shape(H,R,wallRect(H,'ne',.33,1.53,1.01,3.25,-.17),'sun',.27,1);
  for(const z of [1.1,2.23])shape(H,R,wallRect(H,'ne',.49,1.36,z,z+.8,-.19),'paper',.8,.7);
  const socket=wallPt(H,'nw',5.94,.89,-.2);shape(H,R,[[socket[0]-4,socket[1]-6],[socket[0]+4,socket[1]-6],[socket[0]+4,socket[1]+5],[socket[0]-4,socket[1]+5]],'paper',1,.6);
  H.dot(socket[0]-1.6,socket[1],.7,'blue');H.dot(socket[0]+1.6,socket[1],.7,'blue');
  stroke(H,R,[wallPt(H,'nw',5.94,.89,-.23),H.p(.3,5.94,.14),H.p(1.19,4.95,.06)],'blue',.85);
  for(let n=0;n<8;n++){
    const j=4.66+n*.15;shape(H,R,[H.p(.2,j,.87),H.p(.2,j+.15,.9),H.p(.2,j+.15,3.47),H.p(.2,j,3.48)],n%2?'sun':'paper',n%2?.17:1,.5);
  }
  cabinetFrame(H,R,8.65,.4,2.94,1.05,.06,3.2,2,'teal',(x,y,w,d,z,h,n)=>{
    timber(H,R,x,y,w,d,z+.86,.08,'teal');timber(H,R,x,y,w,d,z+1.88,.08,'teal');
    if(n===0){for(let k=0;k<7;k++){const q=x+.08+k*.15;box(H,R,q,y+.05,.1,d-.08,z+.98,.72+(k%3)*.07,['coral','sun','paper'][k%3],.72);}}
    else {shape(H,R,H.faceI(x+.18,y+d,.65,z+2,z+2.75),'sun',.64,.6);H.line(R,[H.p(x+.49,y+d+.02,z+2.08),H.p(x+.53,y+d+.02,z+2.63)],'blue',1.2);H.dot(...H.p(x+.54,y+d+.03,z+2.62),2,'coral');}
    panelFront(H,R,x,y+d,w,z,.73,1,'teal');
  });
  timber(H,R,8.55,.29,3.15,1.27,3.28,.15,'teal');
  cabinetFrame(H,R,8.7,1.58,2.88,1.12,.08,.84,2,'teal',(x,y,w,d,z,h,n)=>{
    if(n===0){for(let k=0;k<3;k++)box(H,R,x+.08,y+.05,w-.14,d-.08,z+k*.13,.1,k===1?'coral':'paper',.75);}
    else{drape(H,R,x+.12,y+.03,w-.22,d-.1,z+.35,.22,'paper');}
  });
  timber(H,R,8.62,1.5,3.06,1.25,.93,.13,'teal');
  const met=H.p(10.92,2.06,1.08);
  shape(H,R,[[met[0]-10,met[1]],[met[0]+10,met[1]],[met[0]+5,met[1]-28],[met[0]-5,met[1]-28]],'sun',.58,.8);
  shape(H,R,[[met[0]-5,met[1]-4],[met[0]+5,met[1]-4],[met[0]+3,met[1]-23],[met[0]-3,met[1]-23]],'blue',.75,.6);
  H.line(R,[[met[0],met[1]-5],[met[0]+4,met[1]-25]],'paper',1.1);H.dot(met[0]+2,met[1]-16,2,'coral');
  for(let n=0;n<4;n++)box(H,R,8.89+n*.24,1.8,.19,.74,1.08,.33+(n%2)*.13,['sun','coral','teal','paper'][n],.6);
  wallRack(H,R,'ne',2.1,4.9,3.32,.48,1,'sun',(P,z)=>{
    shape(H,R,[P(.4,z+.03),P(1.04,z+.03),P(1.04,z+.29),P(.4,z+.29)],'teal',.75,.6);
    for(let k=0;k<5;k++)if(k!==2)H.line(R,[P(.49+k*.09,z+.05),P(.49+k*.09,z+.15)],'paper',1.4);
    for(const x of [1.65,2.55]){shape(H,R,[P(x,z+.02),P(x+.56,z+.02),P(x+.56,z+.31),P(x,z+.31)],'coral',.62,.6);oval(H,R,...P(x+.27,z+.23),2.8,3.5,'blue',.8);}
    H.line(R,[P(3.53,z+.01),P(3.57,z+.23),P(3.8,z+.16)],'teal',3);H.line(R,[P(3.57,z+.16),P(3.64,z+.17)],'sun',1.4);
  });
  caneChair(H,R,1.6,8.2,'coral');
  cushion(H,R,2.75,9.25,1.16,.83,.05,.18,'teal');
  for(const x of [1.52,1.95]){oval(H,R,...H.p(x,10.1,.06),7,3.5,'sun',.65);H.line(R,[H.p(x-.13,10.05,.08),H.p(x+.14,10.05,.08)],'paper',1.2);}
  timber(H,R,.5,6.5,2.15,.95,.45,.12,'sun');vessel(H,R,1.06,6.97,.59,6.5,18,'paper',false);
  drape(H,R,.7,6.5,.74,.64,.61,.4,'teal');
  cabinetFrame(H,R,7.76,8.34,3.33,1.26,.06,.79,3,'sun',(x,y,w,d,z,h,n)=>{
    if(n===0){for(let k=0;k<4;k++)box(H,R,x+.05+k*.17,y+.15,.12,.76,z+.05,.44,['teal','paper','coral','sun'][k],.6);}
    else if(n===1){cushion(H,R,x+.06,y+.12,w-.12,.8,z+.05,.17,'teal');}
    else{box(H,R,x+.08,y+.17,w-.15,.63,z+.06,.31,'coral',.4);H.line(R,[H.p(x+.22,y+d,z+.24),H.p(x+.54,y+d,z+.24)],'sun',1.7);}
  });
  timber(H,R,7.7,8.29,3.46,1.37,.88,.13,'sun');
  timber(H,R,7.85,8.5,3,.98,1.02,.14,'sun');
  shape(H,R,H.tile(8.1,8.64,1.1,.62,1.18),'paper',1,.5);metal(H,R,8.77,8.77,.18,.27,1.19,.11,'blue');
  box(H,R,9.46,8.67,.91,.48,1.18,.12,'coral',.5);H.line(R,[H.p(9.65,8.76,1.32),H.p(10.15,8.95,1.32)],'sun',1.7);
  drape(H,R,10.45,8.6,.29,.65,1.19,.14,'paper');
  shape(H,R,H.tile(3.58,3.49,5.8,3.4,.032),'teal',.21,.8);
  H.outline(R,H.tile(3.73,3.64,5.5,3.1,.034),'coral',1.4,{tone:.65});
  for(let n=0;n<23;n++)H.line(R,[H.p(3.58+n*.25,6.87,.04),H.p(3.58+n*.25,7.05,.04)],'sun',.8);
  for(let n=0;n<13;n++){
    const j=6.1+n*.23;
    shape(H,R,wallRect(H,'nw',j,j+.13,.79,2.47,-.16),'sun',.36,.55);
  }
  shape(H,R,wallRect(H,'nw',9.55,11.28,1.47,2.79,-.19),'coral',.52,.9);
  shape(H,R,wallRect(H,'nw',9.68,11.15,1.6,2.66,-.2),'paper',1,.6);
  const palm=wallPt(H,'nw',10.36,2.16,-.23);oval(H,R,...palm,6.8,6,'coral',.35);
  for(let k=0;k<5;k++)H.line(R,[[palm[0]-5+k*2.5,palm[1]-4],[palm[0]-7+k*3.2,palm[1]-13+Math.abs(2-k)*2]],'coral',2,{tone:.42});
  shape(H,R,wallRect(H,'ne',7.15,8.11,2.18,2.97,-.14),'teal',.43,.7);
  H.line(R,[wallPt(H,'ne',7.31,2.34,-.17),wallPt(H,'ne',7.9,2.78,-.17)],'sun',2);
  for(let n=0;n<5;n++)H.line(R,[H.p(9.37+n*.34,.59,3.47),H.p(9.37+n*.34,1.37,3.47)],'sun',1.1);
  shape(H,R,[H.p(8.06,8.53,1.18),H.p(9.17,8.53,1.18),H.p(9.17,8.38,1.63),H.p(8.06,8.38,1.63)],'teal',.5,.7);
  H.line(R,[H.p(8.29,8.73,1.2),H.p(8.29,9.03,1.2),H.p(8.5,9.03,1.2),H.p(8.5,8.73,1.2)],'blue',1.6);
  H.line(R,[H.p(8.4,9.03,1.2),H.p(8.4,9.18,1.2)],'sun',2.1);
  const exerciser=H.p(10.06,9.19,1.18);
  for(let n=0;n<4;n++){H.line(R,[[exerciser[0]-10+n*5,exerciser[1]-4],[exerciser[0]-10+n*5,exerciser[1]+3]],'teal',2);H.dot(exerciser[0]-10+n*5,exerciser[1]-5,2,'sun');}
  H.line(R,[[exerciser[0]-12,exerciser[1]+4],[exerciser[0]+7,exerciser[1]+4]],'blue',2);
  drape(H,R,.49,6.53,.56,.72,.61,.38,'paper');
  const glass=H.p(1.91,6.97,.6);oval(H,R,...glass,4,1.8,'paper',1);H.line(R,[[glass[0]-4,glass[1]],[glass[0]-4,glass[1]-9],[glass[0]+4,glass[1]-9],[glass[0]+4,glass[1]]],'teal',.85);
  shape(H,R,wallRect(H,'ne',7.37,8.22,.12,.56,-.2),'blue',.52,.6);
  for(let n=0;n<5;n++)H.line(R,[wallPt(H,'ne',7.47,.19+n*.06,-.22),wallPt(H,'ne',8.12,.19+n*.06,-.22)],'paper',.7);
  floorLight(H,5.2,4.1,150,.4);
},(H,R,t)=>{
  piano(H,R,t);
  const u=t%T,released=ease(10.8,12.6,u)-ease(14,16,u),target=H.p(5.05,3.63,1.14-released*.2);
  contactPerson(H,R,target,{shirt:['teal',.74],pants:['blue',.75],hairStyle:'short',face:'ne',leftTarget:H.p(4.5,3.63,1.14-released*.2)},1.8,H.p(5.38,4.1,.2),{...FIGURES.sample('parisPianoPlayer',t/T),lean:0,head:13,al:-92,el:35});
  actor(H,R,2.03,8.63,t,'parisPianoListener',{shirt:['coral',.5],pants:['blue',.64],hairStyle:'bun',face:'se'},.15,1.65);
  const sway=Math.sin(t*Math.PI/9)*.05;
  shape(H,R,[H.p(.2,5.55,.91),H.p(.2,5.8,.93),H.p(.2+sway,5.82,.62),H.p(.2+sway,5.53,.64)],'paper',1,.6);
  H.line(R,[H.p(.22+sway,5.58,.67),H.p(.22+sway,5.76,.67)],'sun',1);

});
room.loopSeconds=T;room.stillTime=9;
export default room;
