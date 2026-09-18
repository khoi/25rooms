import { world, shape, stroke, oval, ell, loop, box } from '../../worlds/common.js';
import { timber, metal, benchFrame, bentTube, drape, vessel, cushion, floorLight } from '../materials.js';
import { cabinetFrame, masonry, rackFrame, basin } from '../structure.js';
import { windowBay, wallRack, taskLight, floorShadow } from '../joinery.js';
import { person } from './surf-store.js';
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u);};
function bowl(H,R,i,j,z,size=1,ink='paper',turn=0){
  const [x,y]=H.p(i,j,z),r=27*size,h=29*size;
  oval(H,R,x,y,10*size,4*size,'sun',.53);
  shape(H,R,loop([[x-r,y-h],[x+r,y-h],[x+r*.78,y-8*size],[x+10*size,y-2*size],[x-10*size,y-2*size],[x-r*.82,y-9*size]],2),ink,ink==='paper'?1:.65,.9);
  shape(H,R,loop([[x+r*.5,y-h],[x+r,y-h],[x+r*.78,y-8*size],[x+10*size,y-2*size],[x+8*size,y-5*size]],2),'teal',.16,.3);
  oval(H,R,x,y-h,r,r*.35,ink,ink==='paper'?1:.65);oval(H,R,x,y-h+1,r*.85,r*.24,'blue',.62);
  stroke(H,R,[[x-r*.72,y-h+1],[x-r*.35,y-h+5],[x+r*.5,y-h+4]],'sun',1.6);
  const dx=Math.sin(turn)*r*.55;stroke(H,R,[[x+dx-7*size,y-h+7*size],[x+dx-3*size,y-12*size],[x+dx+2*size,y-8*size]],'coral',2*size,.58);
  H.line(R,[[x-7*size,y-2*size],[x+8*size,y-2*size]],'blue',.55);
}
const room=world('cape-town-langa-clay','The vessel turns slowly',{wall:false,floor:'paper',tone:.24,head:40},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.1,'teal',.24);masonry(H,R,'nw',0,11,0,4.1,'paper',.75);
  windowBay(H,R,'nw',1.3,6.3,1.2,2.62,{ink:'teal',divisions:4,view:P=>{
    shape(H,R,[P(.14,.14),P(6.16,.14),P(6.16,1.16),P(5.3,1.1),P(4,1.8),P(2.8,1.35),P(1.3,1.7),P(.14,1.3)],'teal',.12,.3);
    stroke(H,R,[P(.15,.64),P(2.4,.75),P(4.1,.63),P(6.1,.75)],'sun',2,.35);
  }});
  timber(H,R,.07,1.18,.64,6.6,1.04,.13,'sun');
  bentTube(H,R,[[.5,6.82,1.17],[.68,6.44,1.21],[.22,6.05,1.32]],1.6,'blue');
  for(const j of [1.51,5.04])metal(H,R,.24,j,1.25,.13,.08,1.02,'teal');
  timber(H,R,.23,1.5,1.24,3.64,.36,.1,'sun');timber(H,R,.18,1.46,1.36,3.77,1.13,.13,'sun');
  basin(H,R,.3,1.66,1.02,1.62,1.28,'paper');
  bentTube(H,R,[[.82,2.46,1.23],[.82,2.46,.78],[1.04,2.46,.61],[.82,2.67,.45],[.28,2.67,.45]],2.2,'teal');
  vessel(H,R,.88,3.39,.49,11,17,'teal');vessel(H,R,.85,4.43,.49,10,16,'paper',false);
  drape(H,R,.82,3.45,.69,.69,1.29,.45,'paper');bowl(H,R,.76,4.68,1.3,.6,'sun');
  const scrub=H.p(1.24,4.15,1.33);oval(H,R,...scrub,7,3,'coral',.7);for(let k=0;k<6;k++)H.line(R,[[scrub[0]-5+k*2,scrub[1]-2],[scrub[0]-5+k*2,scrub[1]+3]],'sun',.9);
  bentTube(H,R,[[.19,1.38,.06],[.19,1.38,2.04],[.52,1.38,2.04]],1.6,'blue');oval(H,R,...H.p(.28,1.38,1.85),3,3,'coral');
  for(let i=.3;i<12;i+=.55){shape(H,R,H.tile(i,.15,.5,.65,.035),'teal',.2,.5);shape(H,R,H.tile(.15,i,.65,.5,.035),'coral',.18,.5);}
  for(let i=1.05;i<11.8;i+=2.15)for(let j=1.05;j<11.8;j+=1.6)H.outline(R,H.tile(i,j,2.07,1.52,.03),'blue',.5,{tone:.22});
  cabinetFrame(H,R,7.88,.4,3.75,1.67,.12,3.85,3,'sun',(x,j,w,d,z,h,n)=>{
    for(const level of [.66,1.65,2.62])timber(H,R,x,j,w,d,z+level,.08,'sun');
    if(n===0){box(H,R,x+.07,j,w-.14,.85,z+.17,.42,'teal',.5);bowl(H,R,x+.5,j+.48,z+.9,.47,'paper');bowl(H,R,x+.52,j+.43,z+1.9,.57,'teal');bowl(H,R,x+.5,j+.4,z+2.83,.44,'paper');}
    else if(n===1){for(let k=0;k<4;k++)metal(H,R,x+.14,j+.14+k*.18,w-.24,.1,z+.24+k*.04,.06,'teal');bowl(H,R,x+.56,j+.45,z+.97,.6,'sun');for(let k=0;k<3;k++)vessel(H,R,x+.2+k*.28,j+.46,z+1.75,3.8,12,['paper','teal','coral'][k]);bowl(H,R,x+.55,j+.42,z+2.88,.58,'paper');}
    else{drape(H,R,x,j,w,.85,z+.65,.33,'paper');box(H,R,x+.06,j,w-.12,.86,z+1.76,.32,'teal',.4);for(let k=0;k<4;k++)shape(H,R,H.tile(x+.16+k*.23,j+.14,.08,.73,z+2.1),'paper',1,.3);vessel(H,R,x+.4,j+.6,z+2.72,4.5,12,'coral');const p=H.p(x+.4,j+.6,z+2.74);stroke(H,R,[[p[0],p[1]-8],[p[0]+3,p[1]-22]],'blue',1.4);}
  });
  wallRack(H,R,'ne',1.1,5.7,2.66,1.03,1,'teal',(P,b)=>{
    for(let k=0;k<5;k++){const u=.35+k*1.03,p=P(u,.22);oval(H,R,p[0],p[1],9,3,'paper',1);shape(H,R,[[p[0]-9,p[1]],[p[0]+9,p[1]],[p[0]+5,p[1]-10],[p[0]-6,p[1]-9]],k%2?'coral':'teal',.43,.65);oval(H,R,p[0],p[1]-10,8,2.7,'blue',.58);}
  });
  for(let k=0;k<7;k++){const x=1.5+k*.68;metal(H,R,x,.12,.05,.28,1.83,.08,'blue');shape(H,R,H.faceI(x-.17,.44,.37,1.22,1.79),['paper','teal','coral','sun'][k%4],.56,.6);H.line(R,[H.p(x-.12,.45,1.39),H.p(x+.12,.45,1.41)],'paper',.8);}
  timber(H,R,.13,8.13,.17,2.51,.09,3.65,'teal');timber(H,R,.13,10.51,.83,.13,.09,3.65,'teal');
  for(const z of [.27,1.12,2.03,3.55])timber(H,R,.17,8.14,.85,2.48,z,.1,'sun');
  for(let k=0;k<3;k++){const q=H.p(.58,8.48+k*.75,2.18);shape(H,R,loop([[q[0]-11,q[1]],[q[0]+11,q[1]],[q[0]+12,q[1]-16],[q[0]+4,q[1]-26],[q[0]-6,q[1]-24],[q[0]-12,q[1]-15]],2),'paper',1,.7);oval(H,R,q[0],q[1]-20,6,3,'sun',.37);}
  bowl(H,R,.59,8.72,1.25,.64,'paper');bowl(H,R,.62,9.8,1.25,.44,'teal');
  box(H,R,.31,8.34,.61,1.71,.39,.38,'coral',.44);drape(H,R,.3,8.36,.62,1.67,.8,.18,'paper');
  const apron=H.p(.25,7.8,2.83);stroke(H,R,[[apron[0]-4,apron[1]+3],[apron[0]-5,apron[1]-9],[apron[0]+6,apron[1]-9],[apron[0]+7,apron[1]+3]],'sun',1.5);shape(H,R,[[apron[0]-7,apron[1]],[apron[0]+8,apron[1]],[apron[0]+10,apron[1]+16],[apron[0]+15,apron[1]+46],[apron[0]-14,apron[1]+47],[apron[0]-10,apron[1]+15]],'coral',.52,.8);shape(H,R,[[apron[0]-8,apron[1]+25],[apron[0]+8,apron[1]+25],[apron[0]+7,apron[1]+36],[apron[0]-7,apron[1]+36]],'paper',.8,.6);
  floorLight(H,5.1,4.8,138,.65);
  benchFrame(H,R,2.76,3.9,5.15,2.54,1.17,'sun');
  timber(H,R,3,4.15,4.62,1.89,.43,.12,'teal');
  for(const i of [3.05,7.49])bentTube(H,R,[[i,4.25,.47],[i,6.11,1.05]],1.8,'teal');
  for(const i of [4.62,5.82,6.97]){metal(H,R,i,6.15,.2,.15,.78,.29,'teal');H.dot(...H.p(i+.1,6.31,.93),1.5,'sun');}
  timber(H,R,3.18,6.23,1.45,.64,.69,.075,'sun');shape(H,R,H.tile(3.25,6.28,1.3,.5,.775),'blue',.64,.5);
  timber(H,R,3.17,6.79,1.47,.11,.68,.25,'teal');H.line(R,[H.p(3.62,6.92,.82),H.p(4.16,6.92,.82)],'sun',2);
  for(let k=0;k<4;k++){const p=H.p(3.4+k*.31,6.57,.8);stroke(H,R,[[p[0]-5,p[1]+3],[p[0]+5,p[1]-8]],'sun',2);oval(H,R,p[0]+6,p[1]-9,3,2,'paper',1);}
  for(const j of [4.29,4.53,4.77]){const p=H.p(4.9,j,.59);oval(H,R,...p,10,4,'paper',1);oval(H,R,...p,6,2,'blue',.6);}
  box(H,R,3.05,4.24,1.0,.87,.56,.38,'teal',.4);drape(H,R,6.55,4.55,.85,1.26,1.19,.37,'paper');
  const spindle=H.p(5.5,4.9,1.21);oval(H,R,...spindle,16,6,'blue',.65);metal(H,R,5.41,4.82,.18,.17,1.23,.17,'sun');oval(H,R,...H.p(5.5,4.9,1.45),36,13,'sun',.68);oval(H,R,...H.p(5.5,4.9,1.51),33,11,'blue',.52);
  H.line(R,[H.p(5.35,5.53,1.48),H.p(5.35,5.66,1.48)],'paper',1.7);
  bentTube(H,R,[[5.28,5.54,1.25],[5.28,5.54,1.48]],1.6,'blue');
  for(let k=0;k<4;k++)shape(H,R,H.tile(3.1+k*.48,4.25,.38,.49,1.2),['teal','coral','paper','sun'][k],.6,.55);
  for(let k=0;k<3;k++){const q=H.p(3.45+k*.37,5.52,1.21);oval(H,R,...q,5.5,3.6,'sun',.46);oval(H,R,q[0]+1,q[1],2.3,1.6,'blue',.35);}
  bowl(H,R,7.32,4.42,1.22,.38,'teal');
  benchFrame(H,R,.85,8.22,4.32,1.13,.7,'teal');
  const clay=H.p(1.4,8.58,.73);stroke(H,R,[[clay[0]-14,clay[1]],[clay[0]-8,clay[1]-5],[clay[0]+4,clay[1]-3],[clay[0]+6,clay[1]+4],[clay[0]-4,clay[1]+6]],'coral',4.5);
  shape(H,R,[H.p(2.2,8.52,.73),H.p(2.55,8.55,.74),H.p(2.47,8.62,1.04),H.p(2.28,8.61,1.08)],'paper',1,.65);
  H.line(R,[H.p(2.3,8.63,.83),H.p(2.43,8.63,1.02)],'sun',1.4);
  bowl(H,R,3.15,8.71,.75,.36,'sun');shape(H,R,H.tile(3.8,8.46,.56,.59,.75),'paper',1,.5);stroke(H,R,[H.p(3.95,8.51,.77),H.p(3.99,8.8,.77),H.p(4.15,8.85,.77)],'teal',3);
  oval(H,R,...H.p(4.63,8.71,.77),10,4,'paper',1);
  rackFrame(H,R,9.3,6.15,1.68,1.3,.04,[.34,1.2],'teal',(i,j,w,d,z,row)=>{
    box(H,R,i+.08,j+.08,w-.16,d-.16,z,.13,'sun',.44);if(row){shape(H,R,H.tile(i+.13,j+.12,w-.3,d-.24,z+.15),'paper',1,.55);for(let k=0;k<5;k++)H.line(R,[H.p(i+.18+k*.25,j+.15,z+.16),H.p(i+.18+k*.25,j+d-.16,z+.16)],'coral',.6);}else drape(H,R,i,j,w,d,z+.17,.12,'paper');
  });
  metal(H,R,8.98,6.05,.18,1.55,.025,.08,'teal');
  for(const i of [9.32,10.85])for(const j of [6.2,7.4])oval(H,R,...H.p(i,j,.05),3.5,4.3,'blue',.8);
  benchFrame(H,R,5.42,9.12,4.03,1.54,.74,'teal');
  timber(H,R,5.61,9.28,3.63,1.18,.24,.1,'sun');
  for(let k=0;k<3;k++)box(H,R,5.85,9.4,1.2,.89,.37+k*.07,.065,k===1?'teal':'paper',.72);
  drape(H,R,8.26,9.38,.67,.89,.37,.18,'coral');
  shape(H,R,H.tile(5.72,9.26,2.03,1.21,.77),'sun',.57,.65);
  shape(H,R,H.faceI(5.72,9.3,2.03,.77,1.27),'sun',.47,.7);shape(H,R,H.faceJ(7.7,9.3,1.16,.77,1.27),'sun',.53,.7);
  shape(H,R,[H.p(5.72,9.3,1.27),H.p(7.7,9.3,1.27),H.p(7.7,8.91,1.5),H.p(5.72,8.91,1.5)],'paper',1,.7);
  for(let k=0;k<5;k++)H.line(R,[H.p(5.88+k*.34,9.3,1.29),H.p(5.88+k*.34,8.96,1.48)],'sun',.65);
  const nest=H.p(6.59,9.93,.8);shape(H,R,loop([[nest[0]-23,nest[1]],[nest[0]-20,nest[1]-16],[nest[0]-7,nest[1]-10],[nest[0],nest[1]-22],[nest[0]+12,nest[1]-11],[nest[0]+26,nest[1]-16],[nest[0]+21,nest[1]+3]],1),'paper',1,.7);bowl(H,R,6.58,9.93,.87,.56,'teal');
  shape(H,R,H.faceI(5.72,10.46,1.98,.77,1.13),'sun',.55,.7);
  for(const i of [5.81,7.58])H.line(R,[H.p(i,10.48,.86),H.p(i,10.48,1.05)],'paper',1);
  const tie=H.p(8.28,9.73,.79);H.outline(R,ell(tie[0],tie[1],12,5),'coral',2);stroke(H,R,[[tie[0]+10,tie[1]],[tie[0]+23,tie[1]+4],[tie[0]+27,tie[1]-2]],'coral',1.2);
  const collar=H.p(8.86,9.67,.81);oval(H,R,...collar,11,5,'sun',.7);oval(H,R,...collar,7,3,'blue',.7);H.line(R,[[collar[0]+8,collar[1]-2],[collar[0]+12,collar[1]+1]],'paper',1.3);
  taskLight(H,R,7.64,4.14,1.2,'coral',-.65);
},(H,R,t)=>{
  const s=((t%18)+18)%18,u=s<3.6?0:s<7.2?ease((s-3.6)/3.6):s<10.8?1:s<16?1-ease((s-10.8)/5.2):0;
  const p=H.p(5.5,4.9,1.52);
  person(H,R,6.7,6.6,[p[0]-27,p[1]+6],[p[0]-36,p[1]-12],'teal',u*2,0,1.3);
  bowl(H,R,5.5,4.9,1.53,1.18,'paper',u*1.6);
  shape(H,R,[[p[0]-40,p[1]-4],[p[0]-24,p[1]-4],[p[0]-33,p[1]-12],[p[0]-42,p[1]-33],[p[0]-46,p[1]-44],[p[0]-53,p[1]-44]],'sun',.45,.7);
  stroke(H,R,[[p[0]-39,p[1]-7],[p[0]-47,p[1]-31]],'paper',.7);
  person(H,R,8.12,6.62,H.p(7.65,6.24,.94),H.p(7.72,6.03,1.18),'coral',-u*2);
  const q=H.p(10.5,6.67,1.47);stroke(H,R,[[q[0],q[1]],[q[0]+11,q[1]+4],[q[0]+16,q[1]+9+Math.sin(t*Math.PI/9)*2]],'coral',1.1);
});
room.loopSeconds=18;
room.stillTime=8.8;
export default room;
