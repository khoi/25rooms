import { world, box, shape, oval, stroke, actor, wallPt, wallRect, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, vessel, drape, slattedSeat, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor, masonry } from '../structure.js';
import { taskLight, hangingRail, floorShadow } from '../joinery.js';

const contactPose={...FIGURES.sample('idle',0)};
FIGURES.clips.parisRiverContact={dur:1,keys:[[0,contactPose],[1,contactPose]]};
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

  FIGURES.draw(H,R,{who:'adult',x:base[0],y:base[1],t:0,phase:0,clip:'parisRiverContact',scale,face:options.face||'se',ground:base,opts:options});
}
const T = 16;
const ease = (a,b,t) => { const u=Math.max(0,Math.min(1,(t-a)/(b-a))); return u*u*(3-2*u); };
const rest = FIGURES.sample('idle',0);
FIGURES.clips.parisRiverFriend={dur:T,keys:[[0,{...rest,head:5,al:30,el:40}],[.4,{...rest,head:5,al:30,el:40}],[.5,{...rest,head:-15,al:30,el:40}],[.72,{...rest,head:-15,al:30,el:40}],[.875,{...rest,head:5,al:30,el:40}],[1,{...rest,head:5,al:30,el:40}]]};
function bridge(H,R,P,w,h,ghost=false){
  shape(H,R,[P(0,0),P(w,0),P(w,h*.5),P(0,h*.5)],'teal',ghost?.08:.21,.4);
  H.line(R,[P(.06,h*.6),P(w-.06,h*.6)],'blue',ghost?.45:1.3,{tone:ghost?.22:.75});
  for(let n=0;n<3;n++){
    const x=w*(n+.5)/3;
    const arch=[];
    for(let k=0;k<=16;k++){const a=Math.PI*k/16;arch.push(P(x+Math.cos(a)*w*.15,h*.2+Math.sin(a)*h*.32));}
    H.line(R,arch,'blue',ghost?.5:1.2,{tone:ghost?.18:.7});
    H.line(R,[P(x-w*.16,h*.18),P(x-w*.16,h*.62)],'blue',.8,{tone:.6});
  }
  for(let n=0;n<10;n++)H.line(R,[P(w*n/10,h*.61),P(w*n/10,h*.73)],'blue',.5,{tone:.5});
  for(let n=0;n<4;n++)H.line(R,[P(.1+n*w*.22,.05),P(.25+n*w*.22,.05)],'paper',1.1);
  shape(H,R,[P(w*.65,h*.1),P(w*.83,h*.1),P(w*.78,h*.03),P(w*.7,h*.03)],'blue',ghost?.1:.65,.35);
}
function easel(H,R,t){
  const u=t%T, tilt=(ease(3.2,6.4,u)-ease(9.6,11.4,u))*.36;
  const P=(x,z)=>H.p(x,4.5-(z-.95)*(.13+tilt),z);
  floorShadow(H,3.7,3.9,3.9,2.7,.18);
  for(const x of [4.05,7.1]){
    bentTube(H,R,[[x-.2,5.7,.05],[x,4.5,1],[x+.1,4.1,3.35]],4,'sun');
    metal(H,R,x-.32,5.59,.32,.25,0,.08,'blue');
  }
  bentTube(H,R,[[5.6,2.9,.05],[5.6,4.2,2.7]],3,'sun');
  timber(H,R,4,4.46,3.3,.34,.84,.16,'sun');
  for(const x of [4.06,7.06]){
    bentTube(H,R,[[x,5.6,.28],[x,4.44,1.08],[x,4.14,2.84]],1.5,'teal');
    shape(H,R,[P(x-.09,1.26),P(x+.09,1.26),P(x+.09,2.8),P(x-.09,2.8)],'teal',.5,.7);
    for(let n=0;n<7;n++)H.dot(...P(x,1.45+n*.17),1.05,'paper');
    const q=P(x,1.78);oval(H,R,...q,5,3.6,'sun',.75);H.line(R,[[q[0]-7,q[1]],[q[0]+7,q[1]]],'blue',1.8);
  }
  bentTube(H,R,[[4.15,4.5,.68],[5.6,3.05,.24],[6.98,4.5,.68]],1.2,'teal');
  timber(H,R,5.37,3.91,.24,.22,.89,2.61,'sun');
  metal(H,R,5.17,3.91,.64,.31,3.2,.16,'teal');
  bentTube(H,R,[[4.05,5.55,.23],[7.1,5.55,.23]],3,'sun');
  shape(H,R,[P(3.95,.99),P(7.22,.99),P(7.22,3.05),P(3.95,3.05)],'sun',.62,1.2);
  shape(H,R,[P(4.1,1.13),P(7.07,1.13),P(7.07,2.92),P(4.1,2.92)],'paper',1,.8);
  bridge(H,R,(x,z)=>P(4.23+x,1.34+z),2.68,1.25);
  bridge(H,R,(x,z)=>P(4.4+x,1.23+z),1.15,.4,true);
  for(const [x,z] of [[4.32,2.67],[4.42,2.57],[6.57,1.48]])H.line(R,[P(x,z),P(x+.17,z+.03)],'blue',.6,{tone:.32});
  H.line(R,[P(4.18,2.87),P(6.91,2.87)],'sun',.6,{tone:.35});
  shape(H,R,[P(4.62,2.96),P(4.92,2.96),P(4.91,3.08),P(4.61,3.08)],'paper',1,.5);
  for(const x of [4.12,7.04])H.line(R,[P(x,1.19),P(x,2.86)],'blue',.4,{tone:.22});
  for(const x of [4.3,6.87]){
    H.line(R,[P(x,3.1),P(x,2.84)],'blue',4);
    H.line(R,[P(x-.06,3.08),P(x+.06,3.08)],'sun',1.6);
  }
  H.dot(...P(7.15,1.63),3.1,'blue');H.dot(...P(7.15,1.63),1.3,'sun');
  H.line(R,[P(4.02,1.03),P(7.22,1.03)],'sun',4.5);
  H.line(R,[P(4.16,1.17),P(4.2,1.26)],'coral',2,{tone:.35});
  for(const [x,z,l,c] of [[4.55,1.07,.32,'blue'],[5.1,1.07,.18,'blue'],[5.7,1.07,.35,'sun']])H.line(R,[P(x,z),P(x+l,z)],c,2.8);
  oval(H,R,...P(6.37,1.1),4,2.6,'teal',.25);
  const brush=ease(11.5,12.2,u)-ease(13.1,13.7,u), bx=6.75-brush*.9;
  H.line(R,[P(bx,1.09),P(bx+.45,1.09)],'sun',2.1);H.line(R,[P(bx,1.09),P(bx-.16,1.09)],'blue',4);
  metal(H,R,7.22,4.55,.88,.85,.86,.09,'teal');
  bentTube(H,R,[[7.23,4.56,.4],[8.02,5.2,.9]],1.5,'teal');
  shape(H,R,H.tile(7.4,4.7,.48,.47,.97),'paper',1,.7);
  shape(H,R,H.tile(7.48,4.8,.26,.23,.98),'blue',.3,.6);
  for(const [x,j,c] of [[7.79,4.81,'sun'],[7.79,5.05,'coral']])oval(H,R,...H.p(x,j,.98),2.7,1.5,c,.65);
  drape(H,R,7.33,5.2,.59,.27,.98,.28,'paper');
  H.line(R,[H.p(7.37,5.48,.82),H.p(7.57,5.48,.74)],'blue',1.6);
  metal(H,R,4.33,4.63,1.53,.54,.63,.12,'teal');
  for(let n=0;n<4;n++)H.line(R,[H.p(4.44+n*.28,4.75,.78),H.p(4.61+n*.28,4.97,.78)],n===2?'coral':'blue',2.4);
  H.line(R,[H.p(5.01,4.86,.78),H.p(5.27,4.99,.78)],'sun',3.1);
  return P;
}
const room=world('paris-river-sketch','The bridge stays in the frame',{wall:false,floor:'paper',head:95},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.025,'sun',.63);
  masonry(H,R,'ne',0,8.4,0,1.1,'paper',.6);
  masonry(H,R,'nw',0,9.2,0,1.45,'blue',.38);
  timber(H,R,.08,.14,.32,8.98,1.44,.13,'sun');
  for(const j of [.45,4.32,8.71]){
    timber(H,R,.05,j,.22,.22,1.58,2.35,'teal');
    metal(H,R,.025,j-.07,.29,.36,1.59,.35,'blue');
    for(const z of [1.69,1.85])H.dot(...H.p(.33,j+.12,z),1.3,'sun');
  }
  timber(H,R,.04,.14,.25,8.82,3.78,.18,'teal');
  for(let n=0;n<4;n++){
    const j=.6+n*.82;
    shape(H,R,[H.p(.1,j,3.9),H.p(3.22,j,3.81),H.p(3.22,j+.75,3.74),H.p(.1,j+.75,3.9)],n%2?'paper':'sun',n%2?1:.27,.7);
    H.line(R,[H.p(.1,j,3.92),H.p(3.22,j,3.83)],'teal',2.1);
  }
  bentTube(H,R,[[.15,3.94,3.79],[3.29,3.94,3.72]],3,'teal');
  for(const j of [.3,3.6])bentTube(H,R,[[.18,j,2.86],[3.19,j,3.77]],1.9,'teal');
  for(let n=0;n<4;n++){
    const j=4.74+n*.74;
    H.line(R,[H.p(.17,j,1.64),H.p(.17,j+1.31,3.54)],'teal',1.2);
    H.line(R,[H.p(.17,j,3.53),H.p(.17,j+1.31,1.64)],'teal',1.2);
  }
  metal(H,R,.05,8.68,.46,.56,.025,.09,'blue');
  const drain=H.p(.27,8.97,.13);oval(H,R,...drain,7,3,'blue',.7);
  bentTube(H,R,[[.16,8.72,3.77],[.16,8.72,1.74],[.29,8.93,.17]],2.5,'teal');
  for(const x of [.25,3,5.8,8.25])metal(H,R,x,.16,.12,.16,1.1,1.75,'teal');
  bentTube(H,R,[[.28,.2,2.85],[2.8,.2,2.93],[5.8,.2,2.92],[8.3,.2,2.85]],3,'teal');
  const view=(x,z)=>H.p(.6+x,.1,1.14+z);
  bridge(H,R,view,7.15,1.1);
  for(const x of [0,2.8,8.3])timber(H,R,x,.05,.16,.18,0,4.08,'teal');
  timber(H,R,0,.03,8.5,.3,3.9,.21,'teal');
  for(const x of [.28,2.82,8.31]){
    bentTube(H,R,[[x,.17,3.2],[x+.58,.17,3.87]],1.5,'teal');
    for(const z of [1.25,3.64])metal(H,R,x-.07,.09,.31,.27,z,.2,'sun');
  }
  for(const x of [.4,3.12,5.91]){
    shape(H,R,[H.p(x,.22,2.92),H.p(x+2.12,.22,2.92),H.p(x+2.12,.22,3.72),H.p(x,.22,3.72)],'paper',.48,.7);
    H.line(R,[H.p(x+.12,.23,3.07),H.p(x+.48,.23,3.58)],'paper',2.1);
  }
  timber(H,R,.24,.33,8.12,.42,1.1,.12,'sun');
  for(let n=0;n<6;n++)H.line(R,[H.p(.52+n*1.25,.73,1.23),H.p(.85+n*1.25,.73,1.23)],'paper',1.8);
  for(let n=0;n<5;n++)H.outline(R,ell(...H.p(8.25,.28,3.8-n*.37),3.5,5),'blue',.8);
  metal(H,R,.1,8.8,.35,.7,.03,.05,'teal');
  for(let n=0;n<5;n++)H.line(R,[H.p(.15,8.86+n*.11,.1),H.p(.4,8.86+n*.11,.1)],'blue',.75);
  cabinetFrame(H,R,8.7,.5,2.75,1.1,.05,3.34,3,'teal',(x,y,w,d,z,h,n)=>{
    if(n<2){for(let k=0;k<3;k++){timber(H,R,x,y,w,d,z+k*.97,.08,'teal');for(let m=0;m<3;m++){const a=x+.1+m*.19;shape(H,R,H.faceI(a,y+d-.08,.13,z+.12+k*.97,z+.79+k*.97),['paper','coral','sun'][m],.75,.6);H.line(R,[H.p(a+.02,y+d-.06,z+.2+k*.97),H.p(a+.02,y+d-.06,z+.67+k*.97)],'blue',.55);}}}
    else {timber(H,R,x,y,w,d,z+2.3,.08,'teal');box(H,R,x+.1,y+.1,.45,.5,z+.06,.4,'coral',.5);for(const q of [.12,.34,.57]){const p=H.p(x+q,y+.3,z+2.36);oval(H,R,...p,3.2,1.6,'paper',1);H.line(R,[p,[p[0],p[1]-17-q*6]],'sun',3.4);}}
  });
  timber(H,R,8.66,.4,2.83,1.28,3.39,.13,'teal');
  metal(H,R,8.53,.28,3.1,1.53,3.52,.08,'teal');
  for(const y of [.36,1.61])H.line(R,[H.p(8.55,y,3.62),H.p(11.59,y,3.62)],'paper',1.3);
  timber(H,R,8.79,1.67,2.54,.85,.16,.15,'sun');
  for(let n=0;n<3;n++){
    const x=8.85+n*.84;
    shape(H,R,H.faceI(x,2.46,.7,.33,.66),'teal',.5,.8);
    H.line(R,[H.p(x+.21,2.49,.49),H.p(x+.5,2.49,.49)],'sun',2.3);
    if(n===1)for(let k=0;k<4;k++)H.line(R,[H.p(x+.08+k*.15,1.92,.34),H.p(x+.1+k*.15,2.35,.34)],'blue',2.2);
  }
  shape(H,R,[H.p(11.45,.51,.24),H.p(11.45,1.57,.24),H.p(11.74,2.71,.24),H.p(11.74,2.71,2.86),H.p(11.45,1.57,3.25),H.p(11.45,.51,3.25)],'teal',.49,1);
  H.line(R,[H.p(11.7,2.47,1.48),H.p(11.7,2.47,1.82)],'sun',2.6);
  for(let n=0;n<5;n++)H.line(R,[H.p(11.75,2.32,.46+n*.14),H.p(11.75,2.58,.46+n*.14)],'blue',1.1);
  hangingRail(H,R,'ne',9.05,1.85,3.05,4,(P,u,n)=>{H.line(R,[P(u,-.15),P(u,-.7)],n===2?'coral':'sun',1.7);H.line(R,[P(u,-.64),P(u,-.79)],'blue',3.2);},1.75);
  taskLight(H,R,10.9,1.12,3.5,'sun',-.5);
  slattedSeat(H,R,.8,7.35,2.45,.02,'sun',.75);
  cushion(H,R,1.25,7.5,1.3,.63,.78,.12,'coral');
  for(let n=0;n<4;n++)H.line(R,[H.p(1.35+n*.3,7.6,.92),H.p(1.35+n*.3,8.02,.92)],'paper',.9);
  timber(H,R,.2,4.75,1.4,1.55,.05,.18,'teal');
  vessel(H,R,.85,5.25,.24,9,17,'paper',false);
  H.line(R,[H.p(.8,5.3,.68),H.p(.95,5.3,.89)],'teal',2);
  metal(H,R,1.2,5.65,.3,.3,.24,.2,'coral');
  hangingRail(H,R,'nw',5.2,1.2,2.08,2,(P,u,n)=>{if(n===0){shape(H,R,[P(u-.13,-.15),P(u+.13,-.15),P(u+.23,-1.04),P(u-.15,-1.14)],'coral',.6,.7);H.line(R,[P(u,-.22),P(u+.05,-1.04)],'sun',1);}else{shape(H,R,[P(u-.22,-.35),P(u+.25,-.35),P(u+.26,-.85),P(u-.21,-.85)],'teal',.68,.8);stroke(H,R,[P(u-.18,-.35),P(u-.12,-.08),P(u+.18,-.1),P(u+.2,-.35)],'sun',1.4);}});
  for(const x of [3.57,6.27])for(const y of [8.85,9.64]){
    bentTube(H,R,[[x,y,.05],[x,y,.61]],2.5,'sun');
  }
  timber(H,R,3.45,8.7,3.1,1.15,.15,.17,'sun');
  metal(H,R,3.4,8.68,3.2,.13,.33,.12,'teal');
  drape(H,R,3.7,9.52,1.33,.24,.34,.25,'paper');
  for(let k=0;k<4;k++)H.line(R,[H.p(3.85+k*.28,9.77,.14),H.p(3.99+k*.28,9.77,.14)],'teal',1.6);
  shape(H,R,H.tile(3.7,8.88,1.7,.72,.33),'paper',1,.7);
  for(let n=0;n<5;n++)H.line(R,[H.p(3.85+n*.28,9.08,.35),H.p(4.04+n*.28,9.29,.35)],'blue',1+n*.24,{tone:.2+n*.12});
  shape(H,R,H.tile(5.6,8.95,.57,.47,.33),'sun',.3,.6);
  shape(H,R,H.tile(5.7,9.02,.34,.29,.34),'blue',.55,.6);
  for(const [x,y] of [[4.95,9.4],[5.15,9.38],[5.32,9.44]])H.dot(...H.p(x,y,.35),1.3,'teal',.7);
  cabinetFrame(H,R,8.33,8.66,3.01,1.65,.08,.94,3,'teal',(x,y,w,d,z,h,n)=>{
    for(let k=0;k<4;k++)box(H,R,x+.04,y+.07,w-.08,d-.13,z+.02+k*.14,.1,['paper','sun','paper','coral'][(k+n)%4],.62);
  });
  timber(H,R,8.28,8.58,3.11,1.78,1.04,.13,'teal');
  const folio=[H.p(8.61,8.84,1.19),H.p(10.94,8.84,1.19),H.p(10.94,9.77,1.46),H.p(8.61,9.77,1.46)];
  shape(H,R,folio,'coral',.45,.9);
  for(const x of [8.93,10.64])H.line(R,[H.p(x,9.23,1.31),H.p(x,9.35,1.46)],'sun',2.1);
  const paper=[H.p(8.72,8.96,1.2),H.p(10.8,8.96,1.2),H.p(10.8,9.64,1.42),H.p(8.72,9.64,1.42)];shape(H,R,paper,'paper',1,.6);
  for(let k=0;k<4;k++)H.line(R,[H.p(8.89+k*.42,9.08,1.25),H.p(8.99+k*.42,9.5,1.39)],'blue',.55,{tone:.38});
  for(let n=0;n<3;n++){
    const j=1.7+n*.72;
    shape(H,R,[H.p(.33,j,1.44),H.p(.57,j+.65,1.44),H.p(.57,j+.65,2.8),H.p(.33,j,2.8)],n%2?'sun':'paper',n%2?.23:1,.8);
    H.line(R,[H.p(.4,j,1.42),H.p(.4,j,2.83)],'teal',2.1);
  }
  metal(H,R,.22,3.92,.26,.26,.03,.18,'teal');
  bentTube(H,R,[[.34,4.04,.2],[.34,4.04,2.19]],2.5,'sun');
  shape(H,R,[H.p(.16,4.04,.55),H.p(.53,4.04,.55),H.p(.39,4.04,1.98),H.p(.29,4.04,1.98)],'teal',.6,.8);
  const caseX=1.2,caseJ=10.07;
  metal(H,R,caseX,caseJ,3.06,1.03,.07,.22,'teal');
  shape(H,R,H.tile(caseX+.13,caseJ+.1,2.8,.8,.31),'blue',.55,.6);
  for(const x of [caseX+1.01,caseX+1.99])timber(H,R,x,caseJ+.11,.07,.78,.32,.08,'sun');
  for(let n=0;n<5;n++)H.line(R,[H.p(caseX+.22+n*.13,caseJ+.2,.36),H.p(caseX+.25+n*.13,caseJ+.73,.36)],n===1?'coral':'sun',2);
  for(let n=0;n<3;n++)box(H,R,caseX+1.2,caseJ+.19+n*.2,.46,.14,.33,.08,['blue','paper','coral'][n],.65);
  oval(H,R,...H.p(caseX+2.35,caseJ+.47,.34),7,3.5,'paper',1);
  H.line(R,[H.p(caseX+2.3,caseJ+.47,.35),H.p(caseX+2.46,caseJ+.51,.35)],'teal',1.3);
  shape(H,R,[H.p(caseX,caseJ,.31),H.p(caseX+3.06,caseJ,.31),H.p(caseX+3.06,caseJ-.25,1.22),H.p(caseX,caseJ-.25,1.22)],'teal',.58,.9);
  shape(H,R,[H.p(caseX+.14,caseJ-.04,.42),H.p(caseX+2.91,caseJ-.04,.42),H.p(caseX+2.91,caseJ-.21,1.08),H.p(caseX+.14,caseJ-.21,1.08)],'paper',1,.6);
  H.line(R,[H.p(caseX+.3,caseJ-.1,.63),H.p(caseX+2.66,caseJ-.1,.63)],'sun',3);
  for(const x of [caseX+.52,caseX+2.47])metal(H,R,x,caseJ+.98,.19,.12,.22,.12,'sun');
  stroke(H,R,[H.p(9.01,9.01,1.23),H.p(9.01,9.28,1.42),H.p(9.72,9.28,1.42),H.p(9.72,9.01,1.23)],'blue',1.5);
  floorLight(H,5.8,5.8,140,.28);
},(H,R,t)=>{
  const P=easel(H,R,t),u=t%T,brush=ease(11.5,12.2,u)-ease(13.1,13.7,u);
  contactPerson(H,R,P(7.17-brush*.93,1.21),{shirt:['coral',.7],pants:['blue',.72],hairStyle:'bun'},1.72,undefined,{head:10,al:22,el:45});
  actor(H,R,8.4,7.15,t,'parisRiverFriend',{shirt:['teal',.64],pants:['blue',.66],hairStyle:'curly',face:'sw'},0,1.68);
  const flutter=Math.sin(t*Math.PI/8)*.028;
  shape(H,R,[P(6.8,2.91),P(7.07,2.91),P(7.07,2.72+flutter)],'paper',1,.55);
  const scarf=(v,z)=>wallPt(H,'nw',5.5+v,z,-.3);
  stroke(H,R,[scarf(0,1.35),scarf(.03,1.05),scarf(.05+Math.sin(t*Math.PI/8)*.035,.93)],'coral',3.2);

});
room.loopSeconds=T;room.stillTime=14.7;
export default room;
