import { world, shape, oval, stroke, ell, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, slattedSeat, cushion, vessel } from '../materials.js';
import { boardFloor } from '../structure.js';

const smooth=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const base={x:0,y:0,drop:.47,lean:0,head:0,al:20,ar:28,el:30,er:30,ll:84,lr:80,kl:-84,kr:-80,roll:0};
FIGURES.clips.barcelonaTramChild={dur:24,keys:[[0,base],[.39,base],[.5,{...base,head:-16}],[.69,{...base,head:-16}],[.92,base],[1,base]]};
FIGURES.clips.barcelonaTramWait={dur:24,keys:[[0,{...base,head:8}],[.25,{...base,head:9}],[.6,{...base,head:3}],[.92,{...base,head:8}],[1,{...base,head:8}]]};

function parent(H,R,i,j,hand,fold) {
  const [x,y]=H.p(i,j,0),shoulder=[x-8,y-43];
  H.tint(ell(x,y+1,12,4),'blue',.17);
  for(const s of [-1,1]) {stroke(H,R,[[x+s*4,y-23],[x+s*6,y-1]],'blue',6);oval(H,R,x+s*6+2,y,5,2.3,'blue',.8);}
  shape(H,R,[[x-9,y-46],[x+8,y-46],[x+10+fold*.9,y-21],[x-8,y-21]],'coral',.68,.8);
  H.line(R,[[x,y-44],[x+2,y-24]],'sun',1);
  stroke(H,R,[shoulder,[x-13,y-33],hand],'blue',6);
  stroke(H,R,[shoulder,[x-13,y-33],hand],'coral',4.6);
  oval(H,R,...hand,2.6,2.2,'paper',1);
  stroke(H,R,[[x+8,y-43],[x+12,y-32],[x+8,y-29]],'coral',5);
  oval(H,R,x+8,y-29,2.5,2,'paper',1);
  oval(H,R,x-2,y-54,7.3,8,'paper',1);
  shape(H,R,[[x-9,y-52],[x-10,y-60],[x-4,y-64],[x+4,y-61],[x+6,y-56],[x-1,y-58]],'blue',.9,.6);
  oval(H,R,x-9,y-59,4,4,'blue',.9);
  H.dot(x+2,y-53,1,'blue');
}

function carriage(H,R,lift) {
  const i=7.65,j=5.36;
  for(const x of [i-.38,i+.38]) for(const y of [j-.48,j+.48]) {
    const p=H.p(x,y,.21);oval(H,R,...p,6,7,'blue',.88);oval(H,R,...p,2.8,3.3,'paper',1);H.dot(...p,1.1,'coral');
  }
  for(const x of [i-.33,i+.33]) {
    bentTube(H,R,[[x,j-.48,.28],[x,j+.25,1.08],[x,j+.5,.28]],2.4,'teal');
    bentTube(H,R,[[x,j+.48,.28],[x,j-.37,.95]],2,'teal');
  }
  surface(H,R,[H.p(i-.33,j-.38,.3),H.p(i+.33,j-.38,.3),H.p(i+.27,j+.32,.4),H.p(i-.27,j+.32,.4)],'teal',.64,.7);
  for(let n=0;n<5;n++)H.line(R,[H.p(i-.29+n*.14,j-.34,.31),H.p(i-.24+n*.12,j+.29,.41)],'paper',.6);
  cushion(H,R,i-.25,j-.29,.48,.39,.34,.07,'coral');
  for(const x of [i-.38,i+.38]) {
    bentTube(H,R,[[x,j-.44,.4],[x,j-.5,.69],[x,j-.3,.94]],1.8,'teal');
    H.line(R,[H.p(x,j-.43,.31),H.p(x,j-.43,.1)],'sun',2.1);
  }
  surface(H,R,[H.p(i-.32,j-.25,.92),H.p(i+.32,j-.25,.92),H.p(i+.29,j+.33,.6),H.p(i-.29,j+.33,.6)],'sun',.48,.8);
  H.line(R,[H.p(i-.3,j-.26,.94),H.p(i+.31,j+.32,.61)],'paper',1.2);
  for(const x of [i-.31,i+.31]) H.dot(...H.p(x,j+.2,.9),2.4,'coral',1,{knock:true});
  const angle=-.92+lift*1.76,dy=.72*Math.cos(angle),dz=.72*Math.sin(angle),z=1.08+dz;
  for(const x of [i-.34,i+.34]) bentTube(H,R,[[x,j+.2,1.08],[x,j+.2+dy,z]],2.5,'teal');
  bentTube(H,R,[[i-.34,j+.2+dy,z],[i+.34,j+.2+dy,z]],5,'blue');
  H.line(R,[H.p(i+.28,j+.2+dy,z+.035),H.p(i+.04,j+.2+dy,z+.035)],'teal',1.2);
  for(const x of [i-.3,i+.3]) {
    const bow=[];for(let n=0;n<=12;n++){const a=n*Math.PI/12;bow.push(H.p(x,j-.24+Math.cos(a)*.25,.92+Math.sin(a)*.31));}
    H.line(R,bow,'teal',1.7);
  }
  surface(H,R,[H.p(i-.31,j-.48,.97),H.p(i+.31,j-.48,.97),H.p(i+.31,j-.35,1.19),H.p(i-.31,j-.35,1.19)],'coral',.5,.6);
  H.line(R,[H.p(i-.25,j-.37,1.2),H.p(i+.25,j-.37,1.2)],'paper',1.3);
  metal(H,R,i+.34,j+.16,.12,.15,.97,.22,lift>.95?'sun':'coral');
  bentTube(H,R,[[i-.22,j+.48,.26],[i+.22,j+.48,.26]],2.4,'coral');
  stroke(H,R,[H.p(i+.05,j+.13,.91),H.p(i+.18,j+.42,.77),H.p(i+.08,j+.48,.63)],'blue',2.6);
  H.line(R,[H.p(i+.13,j+.38,.78),H.p(i+.23,j+.4,.74)],'coral',3);
  return H.p(i+.34,j+.2+dy,z);
}

const room=world('barcelona-tram-wait','A seat in the shade',{wall:false,floor:'paper',tone:.7,pattern:'boards',head:40},(H,R)=>{
  boardFloor(H,R,.15,.3,11.7,9.85,.035,'paper',.77);
  surface(H,R,H.tile(0,10.5,12,1.5,.04),'teal',.17,.7);
  for(const j of [10.86,11.64]) {metal(H,R,0,j,12,.075,.04,.08,'blue');H.line(R,[H.p(0,j+.035,.13),H.p(12,j+.035,.13)],'paper',1.5);}
  for(let i=.4;i<12;i+=.85) surface(H,R,H.tile(i,10.51,.13,1.48,.05),'sun',.18,.4);
  metal(H,R,.15,9.78,11.6,.27,.035,.09,'sun');
  for(let i=.3;i<11.6;i+=.3) for(const j of [9.83,9.96]) H.dot(...H.p(i,j,.14),1.6,'blue',.3);
  H.tint(H.tile(1.4,2.3,8.95,3.9,.04),'blue',.14);
  for(const x of [1.2,5.3,9.25]) {
    metal(H,R,x,.99,.17,.23,.06,3.57,'teal');
    metal(H,R,x-.19,.8,.55,.58,.04,.11,'blue');
    for(const a of [-.1,.3]) H.dot(...H.p(x+a,1.22,.16),1.2,'sun');
    bentTube(H,R,[[x,1.08,2.91],[x,2.3,3.7]],2.6,'teal');
  }
  for(let n=0;n<3;n++) {
    const x=1.38+n*2.61;
    surface(H,R,H.faceI(x,1.15,2.47,.25,3.17),'teal',.1,.75);
    surface(H,R,[H.p(x+.22,1.17,.45),H.p(x+.48,1.17,.45),H.p(x+1.18,1.17,3),H.p(x+.94,1.17,3)],'paper',.8,.35);
    for(const a of [.08,2.36]) for(const z of [.55,2.77]) metal(H,R,x+a,1.15,.12,.13,z,.17,'blue');
  }
  surface(H,R,H.faceJ(1.24,1.15,2.2,.24,3.14),'teal',.12,.7);
  for(const j of [.77,2.91]) metal(H,R,1.05,j,8.6,.12,3.42,.19,'blue');
  for(let n=0;n<7;n++) {
    const x=.86+n*1.28;
    surface(H,R,H.tile(x,.65,1.24,2.55,3.62),'teal',.16,.85);
    surface(H,R,H.tile(x+.1,.76,.43,2.28,3.63),'paper',.88,.4);
    metal(H,R,x,.68,.065,2.49,3.64,.04,'paper');
    for(const j of [.78,2.99])H.dot(...H.p(x+.05,j,3.69),1.05,'blue');
  }
  metal(H,R,.81,.58,9.08,.17,3.49,.19,'teal');
  metal(H,R,.82,3.1,9.06,.15,3.46,.14,'blue');
  surface(H,R,H.tile(1.4,2.8,7.35,.19,3.47),'sun',.7,.6);
  for(const i of [2,4.6,7.4])bentTube(H,R,[[i,1.03,3.13],[i,2.43,3.49],[i,2.89,3.49]],1.7,'paper');
  surface(H,R,H.faceI(.85,3.2,8.97,3.49,3.62),'teal',.7,1);
  for(let i=1;i<9.8;i+=1.35) {H.line(R,[H.p(i,.71,3.63),H.p(i,3.16,3.63)],'blue',.65);H.line(R,[H.p(i,.74,3.5),H.p(i,3.16,3.5)],'paper',1);}
  bentTube(H,R,[[9.67,3.18,3.51],[9.67,3.18,.16],[9.98,3.18,.13]],2.2,'blue');
  surface(H,R,H.faceJ(1.27,3.19,2.22,.22,2.58),'teal',.15,.8);
  for(const j of [3.2,5.4])metal(H,R,1.19,j,.11,.1,.08,2.56,'teal');
  metal(H,R,1.17,3.15,.15,2.37,2.58,.14,'teal');
  for(const j of [3.31,5.23])for(const z of [.39,2.36])metal(H,R,1.24,j,.16,.12,z,.14,'blue');
  surface(H,R,H.faceJ(1.36,3.65,1.25,1.13,2.3),'paper',.91,.6);
  for(const j of [3.86,4.26,4.57])H.line(R,[H.p(1.38,j,1.29),H.p(1.38,j+.17,2.1)],'teal',1.4);
  H.line(R,[H.p(1.39,3.79,1.49),H.p(1.39,4.69,1.84)],'coral',2.2);
  for(const j of [3.86,4.29,4.67])H.dot(...H.p(1.4,j,1.5+(j-3.86)*.39),2.1,'sun',1,{knock:true});
  slattedSeat(H,R,2.05,2.04,5.5,.05,'sun',.75);
  for(const i of [3.84,5.62]) bentTube(H,R,[[i,2.75,.76],[i,2.72,1.05],[i,2.11,1.08]],2.6,'teal');
  timber(H,R,2.05,2.36,5.5,.13,.72,.085,'paper');
  H.line(R,[H.p(2.55,2.64,.8),H.p(3.55,2.64,.8)],'paper',3);
  timber(H,R,1.5,3.58,1.9,.81,.7,.12,'sun');
  for(const x of [1.7,3.05]) bentTube(H,R,[[x,3.63,.04],[x,3.63,.72],[x,4.13,.72]],2,'teal');
  H.line(R,[H.p(2.65,4.39,.84),H.p(3.24,4.39,.84)],'paper',2);
  bentTube(H,R,[[1.67,3.73,.72],[1.55,3.53,1.47],[1.63,3.4,1.57],[1.8,3.4,1.55]],2,'sun');
  H.line(R,[H.p(1.58,3.62,1.03),H.p(1.69,3.62,1.03)],'coral',3.5);
  metal(H,R,10.17,.73,1.47,1.87,.04,.16,'blue');
  metal(H,R,10.23,.8,1.35,1.7,.2,3.02,'teal');
  for(const j of [.92,2.26])metal(H,R,10.24,j,1.35,.045,.21,2.97,'paper');
  surface(H,R,H.faceJ(11.6,1.08,1.17,.49,2.82),'blue',.66,.8);
  for(let n=0;n<8;n++)H.line(R,[H.p(11.62,1.23,.74+n*.18),H.p(11.62,2.1,.74+n*.18)],'teal',2.1);
  metal(H,R,11.6,1.63,.05,.13,2.44,.14,'sun');
  bentTube(H,R,[[10.23,.89,2.74],[9.9,.89,2.74],[9.9,.89,.17],[9.64,1.03,.13]],1.6,'blue');
  surface(H,R,H.faceI(10.4,2.51,1.01,1.48,2.65),'paper',1,.8);
  for(const [a,b,c,d] of [[10.5,1.68,11.2,2.48],[10.56,2.42,11.28,1.8],[10.63,1.63,11.3,2.06]]) H.line(R,[H.p(a,2.53,b),H.p(c,2.53,d)],'teal',1.4);
  for(const x of [10.61,11.03,11.25]) H.dot(...H.p(x,2.54,1.96),2,'coral');
  surface(H,R,H.faceI(10.47,2.53,.91,.3,1.24),'blue',.7,.7);
  surface(H,R,H.faceI(10.58,2.54,.68,.55,.94),'paper',.8,.5);
  H.line(R,[H.p(10.64,2.56,1.07),H.p(11.16,2.56,1.07)],'blue',3);
  for(let n=0;n<5;n++) H.line(R,[H.p(10.45+n*.2,2.54,2.81),H.p(10.45+n*.2,2.54,3.01)],'blue',1);
  metal(H,R,10.3,.85,1.16,1.41,3.22,.16,'paper');
  metal(H,R,10.23,3.2,1.4,2.65,.08,.54,'teal');
  surface(H,R,H.tile(10.37,3.32,1.13,2.37,.63),'blue',.35,.6);
  for(let n=0;n<6;n++) timber(H,R,10.42,3.44+n*.31,.97,.19,.64,.045,n%3?'sun':'coral');
  const [bx,by]=H.p(10.89,4.47,.66);shape(H,R,[[bx-8,by],[bx+7,by],[bx+8,by-16],[bx-6,by-17]],'sun',.55);stroke(H,R,[[bx-5,by-17],[bx-6,by-24],[bx+5,by-24],[bx+6,by-17]],'blue',1);
  bentTube(H,R,[[11.24,5.11,.66],[11.24,5.11,2]],2,'sun');
  for(let n=0;n<6;n++)H.line(R,[H.p(11.05+n*.08,5.1,.65),H.p(11.05+n*.08,5.1,.91)],'blue',.8);
  metal(H,R,9.89,7.2,1.55,.85,.04,.18,'teal');
  for(let n=0;n<7;n++)H.line(R,[H.p(10+n*.19,7.26,.23),H.p(10+n*.19,7.97,.23)],'blue',1.1);
  const leaf=H.p(4.87,1.2,.34);shape(H,R,[[leaf[0],leaf[1]],[leaf[0]-6,leaf[1]-4],[leaf[0]-1,leaf[1]-11],[leaf[0]+4,leaf[1]-6]],'coral',.6,.6);
  H.line(R,[[leaf[0]-1,leaf[1]-10],[leaf[0],leaf[1]+1]],'sun',.7);
  for(const j of [6.01,7.02]) {
    bentTube(H,R,[[.88,j,.08],[.88,j,1.19],[1.81,j,1.19],[1.81,j,.08]],2.8,'teal');
    metal(H,R,.73,j-.12,.34,.31,.04,.07,'blue');
    metal(H,R,1.66,j-.12,.34,.31,.04,.07,'blue');
  }
  surface(H,R,H.faceJ(1.13,6.13,.72,.23,1.07),'coral',.56,.8);
  for(const z of [.42,.81])H.line(R,[H.p(1.15,6.2,z),H.p(1.15,6.78,z)],'paper',2.1);
  bentTube(H,R,[[1.14,6.38,1.06],[1.14,6.36,1.31],[1.14,6.66,1.31],[1.14,6.68,1.06]],1.7,'blue');
  const bag=H.p(2.02,5.94,.06);
  surface(H,R,[[bag[0]-11,bag[1]],[bag[0]+12,bag[1]],[bag[0]+10,bag[1]-31],[bag[0]-8,bag[1]-32]],'teal',.64,.9);
  H.line(R,[[bag[0]-6,bag[1]-25],[bag[0]+7,bag[1]-25],[bag[0]+7,bag[1]-9],[bag[0]-6,bag[1]-9],[bag[0]-6,bag[1]-25]],'sun',.8);
  stroke(H,R,[[bag[0]-6,bag[1]-31],[bag[0]-6,bag[1]-39],[bag[0]+6,bag[1]-39],[bag[0]+7,bag[1]-31]],'blue',2);
  const umb=H.p(1.82,8.42,.08);
  stroke(H,R,[[umb[0],umb[1]],[umb[0]+3,umb[1]-48],[umb[0]+8,umb[1]-49],[umb[0]+9,umb[1]-44]],'blue',1.8);
  shape(H,R,[[umb[0],umb[1]-3],[umb[0]-6,umb[1]-14],[umb[0]+2,umb[1]-40],[umb[0]+7,umb[1]-13]],'coral',.65,.7);
  H.line(R,[[umb[0]-3,umb[1]-19],[umb[0]+5,umb[1]-18]],'sun',2);
  vessel(H,R,1.94,8.52,.06,13,12,'teal');
  for(const x of [3.17,6.89]) {
    bentTube(H,R,[[x,8.36,.05],[x,8.36,1.01],[x+.43,8.36,1.01],[x+.43,8.36,.05]],2.2,'teal');
    metal(H,R,x-.12,8.19,.25,.36,.04,.07,'blue');
  }
  timber(H,R,3.04,8.22,4.51,.34,.96,.16,'sun');
  H.line(R,[H.p(3.39,8.57,1.13),H.p(4.42,8.57,1.13)],'paper',2);
  const pack=H.p(5.89,8.37,1.14);
  surface(H,R,[[pack[0]-12,pack[1]],[pack[0]+10,pack[1]],[pack[0]+9,pack[1]-19],[pack[0]-10,pack[1]-21]],'sun',.6,.7);
  stroke(H,R,[[pack[0]-8,pack[1]-20],[pack[0]-6,pack[1]-30],[pack[0]+6,pack[1]-29],[pack[0]+7,pack[1]-19]],'blue',1.2);
  H.line(R,[[pack[0]-7,pack[1]-9],[pack[0]+7,pack[1]-9]],'coral',2);
  surface(H,R,H.tile(9.8,8.58,1.55,.69,.085),'blue',.45,.5);
  for(let n=0;n<5;n++)H.line(R,[H.p(9.92+n*.26,8.64,.09),H.p(9.92+n*.26,9.19,.09)],'paper',.8);
  cushion(H,R,7,4.91,1.45,1.28,.05,.035,'teal');
},(H,R,t)=>{
  const u=((t%24)+24)%24,lift=smooth(4.8,9.6,u)*(1-smooth(14.4,22,u));
  actor(H,R,3.3,2.48,u,'barcelonaTramWait',{shirt:['teal',.55],hairStyle:'bald',face:'se'},.76-FIGURES.seatZ('adult'),1.35);
  actor(H,R,5.25,2.5,u,'barcelonaTramChild',{shirt:['sun',.7],face:'se'},.76-FIGURES.seatZ('child',1.2),1.2,'child');
  const hand=H.p(7.99,5.56+.72*Math.cos(-.92+lift*1.76),1.08+.72*Math.sin(-.92+lift*1.76));
  carriage(H,R,lift);
  parent(H,R,8.66,6.44,hand,Math.sin(u*Math.PI/12));
  oval(H,R,...hand,2.8,2.1,'paper',1);
  const [x,y]=H.p(2.65,3.98,.84),s=Math.sin(u*Math.PI/12)*1.1;
  shape(H,R,[[x-8,y],[x+8,y],[x+7,y-17],[x-7,y-17]],'coral',.55,.7);
  stroke(H,R,[[x-5,y-16],[x-4+s,y-25],[x+5,y-24],[x+6,y-16]],'blue',1.1);
});
room.loopSeconds=24;
room.stillTime=2;
export default room;
