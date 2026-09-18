import { world, shape, oval, stroke, box, actor, ell, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, drape, benchFrame, floorLight } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, recessedFrame, cornice } from '../joinery.js';

const rest={...FIGURES.clips.idle.keys[0][1]},rig={...rest};
FIGURES.clips['cape-town-sound-maker']={dur:24,keys:[[0,rig],[1,rig]]};
FIGURES.clips['cape-town-sound-colleague']={dur:24,keys:[[0,{...rest,head:14,ar:46,er:44,al:25}],[.4,{...rest,head:14,ar:46,er:44,al:25}],[.46,{...rest,head:20,ar:88,er:8,al:25}],[.6,{...rest,head:20,ar:88,er:8,al:25}],[.7,{...rest,head:14,ar:46,er:44,al:25}],[1,{...rest,head:14,ar:46,er:44,al:25}]]};
const smooth=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
function driver(H,R,x,y,size=1){
  oval(H,R,x,y+4*size,25*size,13*size,'blue',.85);
  oval(H,R,x,y,26*size,13*size,'blue',.85);
  oval(H,R,x,y,21*size,10.7*size,'teal',.48);
  oval(H,R,x,y,17*size,8.5*size,'blue',.6);
  for(let k=0;k<8;k++){const a=k*Math.PI/4;H.line(R,[[x+Math.cos(a)*8*size,y+Math.sin(a)*4*size],[x+Math.cos(a)*17*size,y+Math.sin(a)*8.5*size]],'teal',.6);}
  oval(H,R,x,y,8*size,4.5*size,'blue',.85);
  H.line(R,[[x-20*size,y-6*size],[x-12*size,y-10*size]],'paper',1.2);
  for(let k=0;k<6;k++){const a=k*Math.PI/3;H.dot(x+Math.cos(a)*23*size,y+Math.sin(a)*11.5*size,1.2,'sun');}
}
function speaker(H,R,i,j,w,d,z,h,open=false){
  timber(H,R,i,j,w,d,z,.13,'sun');
  timber(H,R,i,j,.16,d,z,h,'sun');timber(H,R,i+w-.16,j,.16,d,z,h,'sun');
  shape(H,R,H.faceI(i+.15,j+.12,w-.3,z+.12,z+h-.12),'blue',.62,.7);
  if(open){
    timber(H,R,i,j,w,.16,z+h-.13,.13,'sun');
    timber(H,R,i,j+d-.16,w,.16,z+h-.13,.13,'sun');
    for(const x of[i+.16,i+w-.31])timber(H,R,x,j+.15,.15,d-.3,z+h-.13,.13,'sun');
    shape(H,R,H.faceJ(i+w-.15,j+.22,d-.42,z+.23,z+h-.24),'blue',.4,.6);
    for(const zz of[z+.4,z+h-.44])timber(H,R,i+w-.18,j+.2,.16,d-.4,zz,.1,'teal');
    H.line(R,[H.p(i+w-.005,j+.23,z+.29),H.p(i+w-.005,j+d-.24,z+h-.28)],'sun',2.8);
    stroke(H,R,[H.p(i+w+.008,j+.3,z+.45),H.p(i+w+.008,j+d*.52,z+.68),H.p(i+w+.008,j+d-.3,z+h-.38)],'coral',1.3);
    for(const zz of[z+.5,z+.69])metal(H,R,i+w-.04,j+.36,.1,.17,zz,.12,'paper');
  }else timber(H,R,i,j,w,d,z+h-.13,.13,'sun');
  if(open){timber(H,R,i+.14,j+.4,w-.28,.14,z+h*.45,.16,'sun');timber(H,R,i+w*.5-.07,j+.35,.14,d-.44,z+.16,h-.32,'sun');shape(H,R,H.faceI(i+.2,j+.16,w-.4,z+.25,z+h-.22),'teal',.15,.45);stroke(H,R,[H.p(i+.35,j+.3,z+.25),H.p(i+.6,j+.44,z+.58),H.p(i+w-.32,j+.34,z+.85)],'coral',1.5);for(const zz of[z+.52,z+.72])metal(H,R,i+w-.4,j+.3,.17,.12,zz,.12,'blue');}
  else{shape(H,R,H.faceI(i+.14,j+d+.008,w-.28,z+.14,z+h-.13),'teal',.48,.65);const p=H.p(i+w/2,j+d+.01,z+h*.55);oval(H,R,...p,w*11,h*9,'blue',.7);oval(H,R,...p,w*5,h*4,'paper',.65);}
  for(const x of[i+.12,i+w-.26])for(const y of[j+.12,j+d-.25])metal(H,R,x,y,.16,.16,z-.06,.08,'blue');
  const p=H.p(i+w-.12,j+d,z+.25);shape(H,R,[[p[0]-7,p[1]],[p[0],p[1]-4],[p[0],p[1]+5]],'coral',.55,.5);
}
function reach(H,i,j,targets){
  Object.assign(rig,rest,{head:15});const foot=H.p(i,j),s=2,a=4.368,b=4.2;
  for(const [side,p,sign]of[['l',targets[0],-1],['r',targets[1],1]]){const dx=(p[0]-foot[0])/s-sign*5.2,dy=(p[1]-foot[1])/s+32.5,d=Math.max(.2,Math.min(8.55,Math.hypot(dx,dy))),bend=Math.acos(Math.max(-1,Math.min(1,(d*d-a*a-b*b)/(2*a*b))));rig['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(bend),a+b*Math.cos(bend)))*180/Math.PI;rig['e'+side]=bend*180/Math.PI;}
}
const room=world('cape-town-woodstock-sound','A speaker finds its case',{wall:'paper',wallTone:.83,height:3.8,floor:'paper',tone:.45,pattern:'tiles',accent:'teal',head:35},(H,R)=>{
  masonry(H,R,'nw',0,12,0,.78,'teal',.2);
  cornice(H,R,'ne',0,12,3.8,'teal');
  windowBay(H,R,'nw',2.2,6.3,1.3,2.1,{divisions:3,view:P=>{shape(H,R,[P(0,.15),P(6.3,.15),P(6.3,.62),P(4.3,.62),P(4.3,.9),P(3.5,.9),P(3.5,.52),P(2.1,.52),P(1.6,.82),P(.8,.52),P(0,.52)],'teal',.3);for(let k=0;k<5;k++)shape(H,R,[P(.65+k*1.1,.27),P(.94+k*1.1,.27),P(.94+k*1.1,.47),P(.65+k*1.1,.47)],'sun',.45,.4);}});
  cabinetFrame(H,R,5.7,.18,5.85,1.25,.12,3.18,3,'teal',(x,y,w,d,z,h,n)=>{
    for(const zz of[z+.65,z+1.48,z+2.2])timber(H,R,x,y,w,d,zz,.09,'sun');
    if(n===0){speaker(H,R,x+.1,y+.15,w-.2,.69,z+.72,.72,true);for(let k=0;k<3;k++){const p=H.p(x+.35+k*.49,y+.55,z+2.29);oval(H,R,p[0],p[1]-9,5,3,['coral','paper','teal'][k],.6);shape(H,R,[[p[0]-5,p[1]-9],[p[0]+5,p[1]-9],[p[0]+5,p[1]+4],[p[0]-5,p[1]+4]],['coral','paper','teal'][k],.5,.5);}}
    if(n===1){box(H,R,x+.09,y+.14,w-.18,.74,z+.12,.48,'sun',.65);for(let k=0;k<4;k++){const p=H.p(x+.26+k*.36,y+.9,z+.38);oval(H,R,...p,3,3,'blue');}const cord=[H.p(x+.8,y+.1,z+.18),H.p(x+1,y+.3,z+.16),H.p(x+1.2,y+.5,z+.16)];stroke(H,R,cord,'blue',1.5);metal(H,R,x+1.14,y+.48,.18,.14,z+.13,.12,'blue');for(let k=0;k<2;k++){const p=H.p(x+.45+k*.73,y+.6,z+1.65);H.outline(R,ell(...p,10,7),'coral',2.5);}}
    if(n===2){for(let k=0;k<3;k++)box(H,R,x+.1,y+.15,w-.2,.8,z+.1+k*.23,.2,'sun',.6);speaker(H,R,x+.35,y+.22,.7,.5,z+1.57,.58,false);for(let k=0;k<3;k++)timber(H,R,x+.22+k*.39,y+.25,.26,.6,z+2.3,.6,'sun');}
  });
  recessedFrame(H,R,'ne',.9,3.65,1.4,2,'sun',P=>{shape(H,R,[P(.15,.15),P(3.5,.15),P(3.5,1.85),P(.15,1.85)],'paper',1);for(let k=0;k<3;k++){const a=.4+k;shape(H,R,[P(a,.4),P(a+.6,.4),P(a+.6,1.48),P(a,1.48)],'sun',.32,.8);const p=P(a+.3,.92);oval(H,R,...p,8,10,'blue',.55);oval(H,R,...p,3,4,'paper',1);H.line(R,[P(a,.3),P(a+.6,.3)],'teal',.8);}});
  for(const j of[2.42,4.95,7.65])for(const x of[.3,1.7])timber(H,R,x,j,.16,.16,.08,1.03,'teal');
  timber(H,R,.23,2.4,1.76,5.45,1.06,.15,'sun');
  timber(H,R,.28,2.5,1.65,5.25,.27,.1,'teal');
  for(let n=0;n<4;n++){
    const j=2.62+n*1.23;
    shape(H,R,H.faceJ(1.94,j,1.09,.41,.94),'teal',.66,.7);
    shape(H,R,H.faceJ(1.96,j+.1,.89,.5,.84),'blue',.16,.5);
    const p=H.p(1.97,j+.53,.76);H.line(R,[[p[0]-4,p[1]+2],[p[0]+4,p[1]-2]],'sun',2.5);
  }
  metal(H,R,.46,3.02,1.09,1.25,1.22,.43,'blue');
  const amp=H.faceJ(1.56,3.09,1.1,1.28,1.6);shape(H,R,amp,'paper',.75,.65);
  for(let k=0;k<4;k++){const p=H.p(1.57,3.24+k*.22,1.46);oval(H,R,...p,3,3,'blue',.7);H.dot(p[0]-1,p[1]-1,.8,'sun');}
  for(let k=0;k<7;k++)H.line(R,[H.p(.6+k*.12,3.13,1.67),H.p(.6+k*.12,4.08,1.67)],'teal',.7);
  stroke(H,R,[H.p(.57,3.1,1.24),H.p(.4,2.62,1.23),H.p(.9,2.7,1.23),H.p(1.23,2.79,1.23)],'blue',1.3);metal(H,R,1.18,2.76,.19,.17,1.23,.09,'blue');
  for(const x of[1.2,1.3])H.line(R,[H.p(x,2.79,1.32),H.p(x,2.66,1.32)],'sun',1.1);
  shape(H,R,H.tile(.6,4.7,1.05,1.13,1.23),'teal',.8,.65);
  for(let k=0;k<4;k++){
    const x=.71+k*.23;metal(H,R,x,4.9,.15,.28,1.24,.1,k%2?'sun':'paper');
    stroke(H,R,[H.p(x,4.85,1.24),H.p(x,5.47,1.24),H.p(x+.15,5.65,1.24)],'coral',.6);
  }
  const spool=H.p(1.14,6.6,1.28);for(let k=0;k<3;k++)H.outline(R,ell(spool[0],spool[1]-k*4,12,6),'coral',2);H.line(R,[[spool[0]+9,spool[1]],[spool[0]+22,spool[1]+10]],'blue',.9);
  const toolP=(j,z)=>H.p(.2,j,z);
  timber(H,R,.15,2.45,.14,5.35,2.25,.09,'teal');
  for(let n=0;n<6;n++){
    const j=2.7+n*.83,p=toolP(j,2.22);H.line(R,[p,toolP(j,1.92)],'blue',1.1);H.line(R,[toolP(j,2),toolP(j,1.74)],n%2?'coral':'sun',3.5);
    if(n%2===0){const q=toolP(j,1.68);H.line(R,[[q[0]-3,q[1]-2],[q[0]+3,q[1]+2]],'paper',1.3);}
  }
  bentTube(H,R,[[.17,1.4,.25],[.17,1.4,2.5],[.17,2,2.5]],1.3,'blue');
  metal(H,R,.1,1.75,.14,.48,1.4,.46,'paper');
  for(const z of[1.54,1.75]){const p=H.p(.26,1.96,z);H.dot(p[0]-2,p[1],1,'blue');H.dot(p[0]+2,p[1],1,'blue');}
  recessedFrame(H,R,'nw',8.85,2.65,1.16,2.05,'teal',P=>{
    shape(H,R,[P(.13,.13),P(2.52,.13),P(2.52,1.91),P(.13,1.91)],'paper',.8,.6);
    for(let n=0;n<3;n++){
      const x=.28+n*.74;
      shape(H,R,[P(x,.78),P(x+.58,.78),P(x+.58,1.65),P(x,1.65)],['sun','teal','coral'][n],.58,.6);
      H.dot(...P(x+.29,1.58),1.4,'blue');
      for(let k=0;k<3;k++)H.line(R,[P(x+.1,.9+k*.17),P(x+.48,1+k*.17)],n===1?'paper':'blue',.55);
    }
    const q=P(1.38,.46);H.outline(R,ell(...q,12,7),'blue',2);H.outline(R,ell(...q,9,5),'coral',1.4);
    H.line(R,[P(.3,.35),P(.8,.35)],'sun',3);H.line(R,[P(2,.32),P(2.29,.61)],'teal',3);
  });
  floorLight(H,5.8,6.3,160,.45);
  benchFrame(H,R,3.2,4.65,5.4,2.5,1.04,'sun');
  timber(H,R,3.35,4.81,5.08,2.17,.31,.11,'teal');
  for(let n=0;n<3;n++){
    const x=3.5+n*1.55;
    box(H,R,x,5.02,1.32,1.5,.43,.37,n===1?'teal':'sun',.55);
    const p=H.p(x+.65,6.53,.65);H.line(R,[[p[0]-6,p[1]],[p[0]+6,p[1]]],'paper',2);
  }
  for(const x of[3.33,8.31])H.line(R,[H.p(x,4.88,.25),H.p(x,6.81,.94)],'blue',1.8);
  speaker(H,R,3.55,4.91,1.9,1.56,1.05,1.61,true);
  const baffle=H.faceI(3.66,6.48,1.68,1.15,2.54);shape(H,R,baffle,'sun',.62,.8);
  const aperture=(r,z=1.88)=>Array.from({length:40},(_,k)=>H.p(4.5+Math.cos(k*Math.PI/20)*r,6.49,z+Math.sin(k*Math.PI/20)*r));
  shape(H,R,aperture(.61),'blue',.85,.9);shape(H,R,aperture(.53),'teal',.35,.6);
  H.line(R,[H.p(4.03,6.5,1.79),H.p(4.98,6.5,1.79)],'sun',4);
  H.line(R,[H.p(4.5,6.5,1.4),H.p(4.5,6.5,2.33)],'sun',3);
  for(let k=0;k<6;k++){const a=k*Math.PI/3;H.dot(...H.p(4.5+Math.cos(a)*.67,6.51,1.88+Math.sin(a)*.67),1.2,'blue');}
  const grille=H.faceJ(8.55,4.8,1.4,1.1,2.6);shape(H,R,grille,'teal',.3,.8);H.clip(grille,()=>{for(let z=1.15;z<2.6;z+=.085)H.line(R,[H.p(8.56,4.75,z),H.p(8.56,6.3,z+.3)],'blue',.45);for(let j=4.95;j<6.4;j+=.11)H.line(R,[H.p(8.56,j-.15,1.1),H.p(8.56,j-.15,2.6)],'paper',.6);});shape(H,R,H.faceJ(8.57,5.05,.3,1.3,1.58),'coral',.65,.6);
  for(const j of[4.92,6.15])timber(H,R,8.32,j,.46,.17,1.05,.12,'teal');
  for(const x of[3.65,5.16]){
    metal(H,R,x,4.92,.18,.23,2.56,.2,'blue');
    H.line(R,[H.p(x+.09,4.98,2.76),H.p(x+.09,4.98,2.99)],'sun',1.6);
    H.line(R,[H.p(x-.06,4.98,2.95),H.p(x+.24,4.98,2.95)],'coral',2);
  }
  const ring=H.p(6.65,6.5,1.18);oval(H,R,...ring,28,14,'sun',.7);oval(H,R,...ring,24,12,'blue',.9);oval(H,R,...ring,20,10,'paper',.65);for(const [i,j]of[[6.12,6.15],[7.05,6.15],[6.12,6.95],[7.05,6.95]])cushion(H,R,i,j,.2,.2,1.07,.11,'teal');
  cushion(H,R,7.43,5.88,.96,.94,1.06,.15,'teal');
  const screws=H.p(7.5,4.96,1.1);oval(H,R,...screws,11,6,'paper',1);for(let k=0;k<4;k++)H.line(R,[[screws[0]-5+k*3,screws[1]-2],[screws[0]-4+k*3,screws[1]+3]],'blue',1.2);
  bentTube(H,R,[[3.5,4.6,1.1],[3.5,4.6,2.7],[4.8,4.88,3.05],[5.3,5.15,2.7]],2,'teal');const lamp=H.p(5.3,5.15,2.68);shape(H,R,[[lamp[0]-13,lamp[1]+5],[lamp[0]+13,lamp[1]+5],[lamp[0]+5,lamp[1]-8],[lamp[0]-5,lamp[1]-8]],'coral',.75);
  benchFrame(H,R,1.1,8.8,3.4,1.35,.58,'teal');
  timber(H,R,1.2,8.9,3.2,1.12,.23,.08,'sun');
  for(let k=0;k<3;k++)drape(H,R,1.33+k*.9,9,.71,.82,.32+k*.04,.14,['paper','coral','teal'][k]);
  shape(H,R,H.faceI(1.1,8.84,3.4,.65,1.45),'teal',.32,.7);
  for(let k=0;k<4;k++){
    const x=1.38+k*.78;
    shape(H,R,H.faceI(x,8.87,.55,.84,1.31),['sun','teal','coral','paper'][k],.6,.6);
    H.dot(...H.p(x+.26,8.89,1.26),1.3,'blue');
  }
  driver(H,R,...H.p(1.9,9.45,.68),.5);
  drape(H,R,2.35,9,.78,.55,.62,.2,'blue');shape(H,R,H.tile(2.38,9.08,.34,.4,.7),'paper',.7);
  const tube=H.p(3.67,9.35,.7);oval(H,R,...tube,11,6,'blue',.8);oval(H,R,tube[0],tube[1]-13,11,6,'teal',.6);oval(H,R,tube[0],tube[1]-13,7,4,'blue',.85);H.line(R,[[tube[0]-9,tube[1]-8],[tube[0]+9,tube[1]-8]],'paper',1.4);
  speaker(H,R,3.75,9.65,.6,.44,.63,.7,false);
  box(H,R,9.65,7.5,1.85,2.1,.1,.65,'sun',.3);shape(H,R,H.tile(9.78,7.65,1.59,1.85,.76),'blue',.5);for(const i of[9.8,10.85])for(const j of[7.7,8.95])cushion(H,R,i,j,.45,.45,.76,.2,'paper');
  drape(H,R,9.95,8.05,1.15,.75,.81,.48,'paper');
  const handle=H.p(10.55,9.63,.5);stroke(H,R,[[handle[0]-15,handle[1]],[handle[0]-10,handle[1]-14],[handle[0]+9,handle[1]-14],[handle[0]+14,handle[1]]],'coral',3.2);for(let k=-7;k<9;k+=4)H.line(R,[[handle[0]+k,handle[1]-16],[handle[0]+k,handle[1]-12]],'paper',.75);
  benchFrame(H,R,5.35,10.05,2.75,1.27,.55,'teal');
  const cut=H.p(6.06,10.65,.64);
  shape(H,R,[[cut[0]-23,cut[1]-9],[cut[0]-9,cut[1]+3],[cut[0]+7,cut[1]+3],[cut[0]+22,cut[1]-9],[cut[0]+16,cut[1]-11],[cut[0]+5,cut[1]-2],[cut[0]-7,cut[1]-2],[cut[0]-18,cut[1]-11]],'blue',.8,.7);
  H.line(R,[[cut[0]-19,cut[1]-9],[cut[0]-7,cut[1]+1],[cut[0]+6,cut[1]+1],[cut[0]+19,cut[1]-9]],'coral',1.4);
  metal(H,R,5.89,10.54,.38,.32,.64,.22,'sun');
  const wire=H.p(7.32,10.6,.64);H.outline(R,ell(...wire,11,6),'coral',2);H.outline(R,ell(wire[0],wire[1]-3,9,5),'sun',1.4);
  shape(H,R,H.tile(7.53,10.26,.36,.5,.64),'paper',1,.5);H.line(R,[H.p(7.57,10.38,.65),H.p(7.84,10.61,.65)],'teal',1.2);
  metal(H,R,8.6,10.8,3,.15,.02,.05,'teal');
},(H,R,t)=>{
  const u=((t%24)+24)%24,m=smooth(4.8,9.6,u)*(1-smooth(14.4,22,u)),lift=(smooth(2.5,4.8,u)*(1-smooth(7.4,9.6,u))+smooth(14.4,16.6,u)*(1-smooth(20,22,u)))*.36;
  const i=7.92+(6.65-7.92)*m,j=6.5,z=1.34+lift,center=H.p(i,j,z);
  const hands=[[center[0]-17,center[1]],[center[0]+17,center[1]]],fi=i,fj=7.65;
  reach(H,fi,fj,hands);actor(H,R,fi,fj,t,'cape-town-sound-maker',{shirt:['coral',.7],apron:['paper',.8],hairStyle:'short'},0,2);
  driver(H,R,...center,.72);for(const p of hands)oval(H,R,p[0],p[1],2.6,2.3,'coral',.4);
  actor(H,R,4.3,7.25,t,'cape-town-sound-colleague',{face:'sw',shirt:['teal',.75],glasses:true,hairStyle:'curly'},0,1.65);
  const P=(v,z)=>wallPt(H,'ne',11.1+v,z,-1.46);const d=Math.sin(u*Math.PI/12)*.045;shape(H,R,[P(0,.4),P(.7,.4),P(.75+d,2.94),P(0,2.94)],'paper',.8,.7);for(let k=0;k<5;k++)H.line(R,[P(.08+k*.13,.43),P(.1+k*.13+d*.5,2.9)],'teal',.6);
});
room.loopSeconds=24;
room.stillTime=11.5;
export default room;
