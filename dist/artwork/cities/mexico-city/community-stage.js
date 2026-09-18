import { world, shape, oval, stroke, box, ell, cycle, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, cushion, drape, pendant } from '../materials.js';
import { cabinetFrame, masonry, boardFloor } from '../structure.js';
import { recessedFrame, caster, floorShadow } from '../joinery.js';

const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const rest={...FIGURES.sample('idle',0),al:68,el:70,ar:88,er:60,head:-12};
FIGURES.clips.mexicoStagePull={dur:20,keys:[[0,rest],[.2,rest],[.4,{...rest,al:28,el:35,ar:42,er:35,head:-17}],[.6,{...rest,al:28,el:35,ar:42,er:35,head:-17}],[.9,rest],[1,rest]]};
FIGURES.clips.mexicoStageGuide={dur:20,keys:[[0,{...rest,ar:80}],[.2,{...rest,ar:80}],[.4,{...rest,ar:105,er:50}],[.6,{...rest,ar:105,er:50,head:-25}],[.9,{...rest,ar:80}],[1,{...rest,ar:80}]]};
FIGURES.clips.mexicoStageWait={dur:20,keys:[[0,{...FIGURES.sample('idle',0),head:-7}],[.42,{...FIGURES.sample('idle',0),head:-7}],[.55,{...FIGURES.sample('idle',0),head:-20,ar:26}],[.9,{...FIGURES.sample('idle',0),head:-7}],[1,{...FIGURES.sample('idle',0),head:-7}]]};
function pulley(H,R,i,j,z){const [x,y]=H.p(i,j,z);metal(H,R,i-.1,j-.07,.2,.14,z-.25,.5,'blue');oval(H,R,x,y,8,8,'sun',.8);oval(H,R,x,y,5,5,'blue',.64);H.dot(x,y,1.9,'paper');}
function chair(H,R,i,j,z=0){for(const a of [0,.7])for(const b of [0,.6])timber(H,R,i+a,j+b,.08,.09,z,.64,'sun');timber(H,R,i-.04,j-.04,.88,.8,z+.61,.09,'sun');for(const a of [0,.7])timber(H,R,i+a,j,.08,.1,z+.66,.65,'sun');for(const h of [.94,1.17])timber(H,R,i,j,.78,.11,z+h,.13,'sun');H.line(R,[H.p(i+.73,j+.64,z+.01),H.p(i+.73,j+.64,z+.25)],'coral',3.5);}
const room=world('mexico-city-community-stage','A cloth becomes a backdrop',{wall:false,floor:'paper',tone:.82,head:90},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.45,'paper',.9);masonry(H,R,'nw',0,12,0,3.9,'teal',.2);
  for(const x of [.3,6.9,11.55])metal(H,R,x,.19,.16,.22,0,4.65,'blue');
  for(const h of [4.13,4.67])metal(H,R,.15,.12,11.65,.25,h,.12,'blue');
  for(let x=.4;x<11.5;x+=1.4)bentTube(H,R,[[x,.2,4.2],[x+.7,.2,4.62],[x+1.4,.2,4.2]],1.8,'blue');
  recessedFrame(H,R,'nw',1.1,6.5,2.8,.8,'teal',P=>{
    surface(H,R,[P(.14,.12),P(6.36,.12),P(6.36,.67),P(.14,.67)],'paper',1,.5);
    for(let x=.9;x<6.4;x+=1.1)H.line(R,[P(x,.1),P(x,.7)],'blue',2);
    for(let x=.6;x<6.2;x+=1.15)H.line(R,[P(x,.16),P(x+.27,.63)],'sun',1.2);
  });
  recessedFrame(H,R,'nw',4.45,3.45,1.25,1.15,'sun',P=>{
    surface(H,R,[P(.16,.13),P(3.29,.13),P(3.29,1.0),P(.16,1.0)],'paper',1,.5);
    surface(H,R,[P(.25,.23),P(1.1,.78),P(1.55,.35),P(2.4,.83),P(3.1,.23)],'teal',.34,.6);
    const p=P(2.67,.76);oval(H,R,...p,6,6,'sun',.65);
    for(let n=0;n<4;n++)surface(H,R,[P(.2+n*.3,.05),P(.44+n*.3,.05),P(.44+n*.3,.2),P(.2+n*.3,.2)],['coral','sun','teal','blue'][n],.75,.35);
  });
  timber(H,R,.17,8.4,.8,3.12,2.67,.14,'sun');
  for(const j of [8.62,11.3])bentTube(H,R,[[.27,j,2.64],[.77,j,2.09]],2,'blue');
  timber(H,R,.2,8.35,.14,3.24,.18,.12,'sun');
  for(const j of [8.48,11.48])timber(H,R,.21,j,.16,.16,.18,2.5,'sun');
  bentTube(H,R,[[.53,8.58,2.35],[.53,11.21,2.35]],2.4,'blue');
  for(let n=0;n<3;n++){
    const j=8.88+n*.84,p=H.p(.58,j,2.22);stroke(H,R,[[p[0],p[1]-4],[p[0]+3,p[1]-8],[p[0]+5,p[1]-4],[p[0],p[1]]],'blue',1);
    surface(H,R,[[p[0]-13,p[1]+6],[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+13,p[1]+6],[p[0]+9,p[1]+15],[p[0]+7,p[1]+48],[p[0]-8,p[1]+48],[p[0]-10,p[1]+15]],['coral','sun','teal'][n],.68,.8);
    H.line(R,[[p[0],p[1]+5],[p[0],p[1]+43]],'paper',1);H.line(R,[[p[0]-7,p[1]+30],[p[0]+7,p[1]+30]],'blue',.8);
  }
  timber(H,R,.17,8.8,.6,2.1,2.0,.1,'sun');
  const puppet=H.p(.45,9.42,2.12);oval(H,R,puppet[0],puppet[1]-16,5,6,'paper',1);shape(H,R,[[puppet[0]-6,puppet[1]-10],[puppet[0]+6,puppet[1]-10],[puppet[0]+9,puppet[1]],[puppet[0]-8,puppet[1]]],'coral',.7,.6);for(const dx of [-4,4])H.line(R,[[puppet[0]+dx,puppet[1]-22],[puppet[0]+dx,puppet[1]-34]],'blue',.5);H.line(R,[[puppet[0]-8,puppet[1]-34],[puppet[0]+8,puppet[1]-34]],'blue',1.1);
  bentTube(H,R,[[.12,10.7,.1],[.12,10.7,3.66],[.12,6.8,3.66]],1.7,'blue');
  for(let j=7.1;j<10.6;j+=.8)metal(H,R,.1,j,.16,.14,3.6,.13,'coral');
  for(const [i,j]of [[1.2,2.7],[1.2,5.55],[7.25,2.7],[7.25,5.55]])box(H,R,i,j,.25,.25,0,.36,'blue',.7);
  boardFloor(H,R,1.1,2.5,6.65,3.6,.39,'sun',.42);
  surface(H,R,H.faceI(1.1,6.1,6.65,.06,.38),'coral',.52,.9);
  for(let x=1.3;x<7.6;x+=1.45)bentTube(H,R,[[x,6.11,.1],[x+.6,6.11,.32],[x+1.2,6.11,.1]],1.3,'blue');
  timber(H,R,1.1,6.15,1.4,.55,.04,.15,'sun');timber(H,R,1.1,6.13,1.4,.32,.2,.12,'sun');
  for(const x of [1.25,7.6]){metal(H,R,x,2,.12,.25,.04,4.45,'blue');metal(H,R,x-.23,1.82,.58,.65,.025,.12,'blue');bentTube(H,R,[[x,2.1,1.3],[x+.4,2.75,.05]],2,'blue');pulley(H,R,x,2.13,4.4);}
  metal(H,R,1.16,2.01,6.65,.2,4.41,.13,'blue');
  for(const x of [1.25,7.6]){
    const side=x<2?1:-1;
    timber(H,R,x-.14,2.14,.3,.58,.12,4.12,'sun');
    for(const z of [.28,2.05,3.7])metal(H,R,x-.2,2.17,.44,.2,z,.12,'blue');
    const folds=[H.p(x,2.36,.45),H.p(x+side*.65,2.36,.45),H.p(x+side*.36,2.36,1.92),H.p(x+side*.74,2.36,4.08),H.p(x,2.36,4.08)];surface(H,R,folds,'coral',.61,.8);
    for(const q of [.1,.24,.4])H.line(R,[H.p(x+side*q,2.38,.52),H.p(x+side*q*.75,2.38,1.91),H.p(x+side*q,2.38,4.02)],'sun',1.1);
    bentTube(H,R,[[x,2.54,1.85],[x+side*.35,2.54,1.82],[x+side*.47,2.54,1.9]],1.6,'blue');
  }
  surface(H,R,[H.p(1.27,2.19,4.21),H.p(7.59,2.19,4.21),H.p(7.59,2.19,3.94),H.p(6.4,2.19,3.82),H.p(4.4,2.19,3.93),H.p(2.4,2.19,3.82),H.p(1.27,2.19,3.94)],'coral',.73,.9);
  for(const x of [2.0,3.2,5.5,6.7]){
    bentTube(H,R,[[x,.39,4.15],[x,1.15,4.15],[x,1.15,3.91]],2,'blue');
    const p=H.p(x,1.15,3.87);surface(H,R,[[p[0]-8,p[1]-7],[p[0]+8,p[1]-7],[p[0]+12,p[1]+7],[p[0]-10,p[1]+7]],'blue',.7,.8);oval(H,R,p[0]+1,p[1]+7,10,4,'sun',.7);
  }
  H.tint([H.p(2.0,3,.41),H.p(6.8,3,.41),H.p(7,5.8,.41),H.p(2.0,5.8,.41)],'sun',.1);

  for(const x of [1.65,7.2]){H.line(R,[H.p(x,2.06,4.35),H.p(x,2.06,3.2)],'blue',1);metal(H,R,x-.07,2.04,.14,.18,3.78,.16,'coral');}
  cabinetFrame(H,R,8.5,.32,3.04,1.35,.14,3.72,2,'teal',(x,y,w,d,z,h,n)=>{
    if(n===0){for(const h of [.65,1.7,2.75])timber(H,R,x,y,w,d,z+h,.09,'sun');
      box(H,R,x+.08,y+.08,w-.18,d-.12,z+.06,.36,'coral',.58);
      for(let k=0;k<3;k++)drape(H,R,x+.08,y+.06,w-.2,.52,z+.78+k*.16,.14,k===1?'sun':'paper');
      metal(H,R,x+.18,y+.12,.7,.66,z+1.78,.68,'blue');const p=H.p(x+.54,y+.8,z+2.13);oval(H,R,...p,7,11,'paper',.6);oval(H,R,...p,3,5,'blue',.9);
      for(let k=0;k<3;k++){const a=H.p(x+.25+k*.35,y+.34,z+2.96);H.outline(R,ell(...a,6,7),'sun',1.4);}
    }else {for(let k=0;k<3;k++){const b=H.faceI(x+.05+k*.24,y+.19+k*.13,.4,z+.1,z+2.08-k*.13);surface(H,R,b,['sun','paper','coral'][k],.66,.6);}timber(H,R,x,y,w,d,z+2.4,.09,'sun');drape(H,R,x+.07,y+.07,w-.13,d-.12,z+2.58,.25,'coral');}
  });
  const mini=H.p(9.12,1.1,3.95);shape(H,R,[[mini[0]-17,mini[1]],[mini[0]+17,mini[1]],[mini[0]+17,mini[1]-20],[mini[0]-17,mini[1]-20]],'sun',.7,.8);shape(H,R,[[mini[0]-13,mini[1]-3],[mini[0]+13,mini[1]-3],[mini[0]+13,mini[1]-16],[mini[0]-13,mini[1]-16]],'blue',.65,.5);for(const s of [-1,1])shape(H,R,[[mini[0]+s*13,mini[1]-16],[mini[0]+s*7,mini[1]-16],[mini[0]+s*10,mini[1]-3],[mini[0]+s*13,mini[1]-3]],s===1?'coral':'paper',.8,.4);
  for(const z of [.56,1.6,2.95]){const p=H.p(11.6,1.49,z);H.line(R,[[p[0]-5,p[1]-3],[p[0]+5,p[1]+3]],'sun',2);}
  chair(H,R,5.5,3.5,.4);
  surface(H,R,H.faceI(2.87,6.12,2.2,.11,.31),'blue',.63,.6);
  for(const x of [3.04,4.73])H.dot(...H.p(x,6.13,.2),1.4,'sun');
  for(const [i,j]of [[1.45,2.57],[7.14,2.78]]){const p=H.p(i,j,.24);surface(H,R,ell(...p,13,7),'blue',.7,.8);H.line(R,[[p[0]-8,p[1]],[p[0]+8,p[1]]],'coral',2);}

  floorShadow(H,9.1,4.2,1.9,1.5,.15);
  metal(H,R,9.15,4.3,1.8,1.25,.19,.69,'coral');for(const [x,y]of [[9.3,4.4],[10.7,4.4],[9.3,5.4],[10.7,5.4]])caster(H,R,x,y);
  H.line(R,[H.p(9.8,5.57,.65),H.p(10.35,5.57,.65)],'blue',2.5);
  for(let n=0;n<4;n++){const [x,y]=H.p(9.3+n*.38,4.92,.92);H.outline(R,ell(x,y,7,4),'blue',1.1);}
  for(const x of [.95,1.85])bentTube(H,R,[[x,8.7,.05],[x,8.3,1.9],[x,8.0,.05]],2.3,'teal');
  surface(H,R,H.faceI(.9,8.35,1,.5,1.9),'blue',.48,.8);surface(H,R,H.faceI(1,8.37,.8,.61,1.8),'paper',.8,.5);
  for(const [a,z]of [[.94,.54],[1.73,1.7]])surface(H,R,H.faceI(a,8.4,.19,z,z+.18),'coral',.7,.5);
  for(const x of [9.08,10.65])bentTube(H,R,[[x,6.46,.07],[x,6.32,2.99],[x,5.81,.07]],2.5,'sun');
  const arch=[];for(let n=0;n<=20;n++){const a=n*Math.PI/20;arch.push(H.p(9.85+Math.cos(a)*.82,6.37,2.08+Math.sin(a)*.83));}
  const flat=[H.p(9.03,6.37,.15),H.p(10.68,6.37,.15),...arch];surface(H,R,flat,'teal',.3,.8);
  const inner=[];for(let n=0;n<=20;n++){const a=n*Math.PI/20;inner.push(H.p(9.85+Math.cos(a)*.61,6.39,2.08+Math.sin(a)*.62));}
  surface(H,R,[H.p(9.24,6.39,.15),H.p(10.46,6.39,.15),...inner],'paper',1,.8);
  for(const z of [.45,1.27])H.line(R,[H.p(9.04,6.41,z),H.p(9.26,6.41,z)],'coral',2);
  bentTube(H,R,[[9.05,6.47,.13],[10.67,6.47,2.9]],1.2,'blue');
  benchFrame(H,R,8.4,8.7,2.8,1.35,.66,'teal');cushion(H,R,8.45,8.76,1.1,1.15,.67,.13,'sun');
  const tool=H.tile(9.8,8.9,1.06,.85,.69);surface(H,R,tool,'coral',.55,.7);for(let n=0;n<4;n++)H.line(R,[H.p(9.93+n*.21,9.02,.7),H.p(9.93+n*.21,9.58,.7)],'blue',1.7);
  box(H,R,10.4,8.82,.36,.35,.7,.22,'teal',.6);
  timber(H,R,8.45,8.8,2.59,1.07,.24,.1,'sun');
  for(let n=0;n<3;n++)drape(H,R,8.64+n*.7,8.97,.54,.69,.36,.21,['paper','coral','teal'][n]);
  const torch=H.p(9.65,9.28,.77);oval(H,R,...torch,5,3,'sun',.8);H.outline(R,ell(torch[0]-4,torch[1],8,5),'blue',1.5);
  for(const x of [1.72,3.17])for(const j of [10.44,11.45])caster(H,R,x,j);
  metal(H,R,1.54,10.29,1.87,1.34,.21,.61,'coral');
  surface(H,R,H.tile(1.68,10.43,1.6,1.04,.84),'blue',.65,.8);
  for(const x of [1.58,3.18])metal(H,R,x,10.28,.19,1.36,.22,.61,'blue');
  surface(H,R,H.faceI(1.55,10.31,1.86,.86,1.8),'coral',.6,.9);
  surface(H,R,H.faceI(1.7,10.34,1.56,1.0,1.66),'paper',1,.6);
  const cap=H.p(2.21,10.78,.89);surface(H,R,ell(...cap,12,6),'sun',.7,.7);surface(H,R,[[cap[0]-7,cap[1]],[cap[0]-5,cap[1]-14],[cap[0]+7,cap[1]-12],[cap[0]+8,cap[1]]],'sun',.8,.6);drape(H,R,2.61,10.81,.67,.69,.85,.31,'teal');
  H.line(R,[H.p(2.15,11.65,.58),H.p(2.79,11.65,.58)],'sun',2.7);
  surface(H,R,H.tile(3.15,8,3,2.5,.02),'coral',.17,.6);
  for(const [i,j]of [[3.7,8.7],[5.35,9.65],[4.9,6.8]])H.line(R,[H.p(i-.17,j,.035),H.p(i+.17,j,.035),H.p(i,j,.035),H.p(i,j+.24,.035)],'sun',2.1);
  const mask=H.p(3.7,10.6,.9);bentTube(H,R,[[3.7,10.6,.02],[3.7,10.6,.9]],2,'blue');oval(H,R,...mask,11,14,'paper',1);for(const s of [-1,1])oval(H,R,mask[0]+s*4,mask[1]-3,2.1,1.5,'blue',.8);stroke(H,R,[[mask[0]-4,mask[1]+5],[mask[0],mask[1]+8],[mask[0]+4,mask[1]+5]],'coral',1);
  pendant(H,R,7.4,.5,4.4,3.6,'coral',.7);
},(H,R,t)=>{
  const u=cycle(t,20)*20,f=ease(4,8,u)*(1-ease(12,18,u)),z=.67+f*.62;
  const P=(x,h)=>H.p(x,2.34+.025*Math.sin(x*3),z+h);
  const cloth=[P(1.65,0),P(7.18,0),P(7.18,2.65),P(1.65,2.65)];surface(H,R,cloth,'paper',1,1);
  for(let n=0;n<10;n++){const x=1.72+n*.55;H.line(R,[P(x,.05),P(x+.07,1.1),P(x,2.62)],n%2?'sun':'blue',n%2?1.5:.7,{tone:.4});}
  surface(H,R,[P(2.2,.37),P(3.4,1.65),P(4.2,.77),P(5.5,1.77),P(6.7,.37)],'teal',.36,.8);
  const sun=P(5.85,2.04);oval(H,R,...sun,16,16,'sun',.55);
  H.line(R,[P(1.67,.12),P(7.16,.12)],'sun',2);H.line(R,[P(4.75,.35),P(4.83,2.5)],'coral',1.7);
  for(let n=0;n<11;n++)H.line(R,[P(4.68,.45+n*.17),P(4.9,.5+n*.17)],'coral',.75);
  metal(H,R,1.56,2.21,5.72,.2,z+2.65,.1,'blue');
  for(let x=1.85;x<7.1;x+=.83){H.line(R,[P(x,2.59),P(x,2.79)],'coral',2);H.line(R,[P(x+.055,2.59),P(x+.055,2.79)],'paper',.8);}
  for(const x of [1.65,7.17])H.line(R,[H.p(x,2.15,z+2.75),H.p(x,2.15,4.34)],'blue',1.2);
  const bagZ=2.95-f*.62;H.line(R,[H.p(7.6,2.14,4.35),H.p(7.8,2.45,bagZ+.43)],'blue',1.1);box(H,R,7.56,2.29,.45,.4,bagZ,.38,'coral',.6);
  actor(H,R,4.7,4.05,t,'mexicoStageWait',{shirt:['coral',.75],pants:['blue',.75],hairStyle:'curly',face:'sw'},.4,1.4);
  for(const [i,j,clip,face,ink,anchor]of [[1.34,5.53,'mexicoStagePull','se','teal',1.25],[7.35,5.53,'mexicoStageGuide','sw','sun',7.6]]){
    actor(H,R,i,j,t,clip,{face,shirt:[ink,.8],pants:['blue',.72],hairStyle:i<2?'pony':'short',prop:(HH,RR,p)=>{
      const h=p.nearHand,top=HH.p(anchor,2.13,4.4);HH.line(RR,[top,h],'blue',1.2);
      const floor=HH.p(i+.35,j+.35,.03);stroke(HH,RR,[h,[h[0]+4,floor[1]-12],floor],'blue',1);
      HH.outline(RR,ell(floor[0]+7,floor[1],10,4),'blue',1.2);
      oval(HH,RR,...h,2.3,2,'coral',.4);
    }},.4,1.42);
  }
  const [x,y]=H.p(10.9,.63,3.94),a=Math.sin(u*Math.PI/10)*.12;H.line(R,[[x,y-12],[x+a*13,y]],'blue',.8);H.outline(R,ell(x+a*13,y+3,6,7),'sun',1.5);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
