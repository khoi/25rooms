import { world, shape, oval, stroke, box, ell, cycle, mix, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, cushion, drape } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';

const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const childBase={...FIGURES.sample('sit',0),head:-8,al:30,ar:36};
FIGURES.clips.mexicoCanalChild={dur:18,keys:[[0,childBase],[.3,{...childBase,head:-18}],[.5,{...childBase,head:-25}],[.8,childBase],[1,childBase]]};
function bird(H,R,x,y,s=1){stroke(H,R,[[x-8*s,y],[x-3*s,y-3*s],[x,y],[x+4*s,y-4*s],[x+9*s,y-2*s]],'blue',1.2);}
function binoculars(H,R,x,y){for(const dx of [-5,5]){shape(H,R,[[x+dx-3,y-5],[x+dx+3,y-5],[x+dx+4,y+6],[x+dx-4,y+6]],'blue',.84,.7);oval(H,R,x+dx,y+6,4,2.8,'teal',.6);H.line(R,[[x+dx-2,y-3],[x+dx-2,y+3]],'paper',.7);}H.line(R,[[x-3,y],[x+3,y]],'blue',3);}
const room=world('mexico-city-canal-listening','A chair beside the reeds',{wall:false,floor:'teal',tone:.3,head:45},(H,R)=>{
  surface(H,R,H.tile(.1,.1,11.8,2.0,.02),'teal',.55,.6);
  for(let n=0;n<25;n++){const i=.3+(n*1.43)%11.2,j=.3+(n*.41)%1.4;H.line(R,[H.p(i,j,.04),H.p(i+.47,j,.04)],n%3?'paper':'blue',.85,{tone:.5});}
  boardFloor(H,R,.12,2.2,11.75,9.7,.2,'sun',.47);
  box(H,R,.03,2.08,11.9,.18,.03,.28,'teal',.68);
  for(const i of [.3,8.05,11.45])timber(H,R,i,2.15,.24,.3,.2,3.58,'sun');
  timber(H,R,.2,2.13,11.55,.35,3.69,.23,'sun');
  for(let i=.45;i<11.6;i+=.63)timber(H,R,i,.15,.18,3.05,3.87,.1,'sun');
  timber(H,R,.17,.12,11.7,.25,3.78,.13,'coral');
  bentTube(H,R,[[.25,.3,3.78],[11.65,.3,3.78],[11.65,.3,.2]],2.4,'teal');
  surface(H,R,H.faceI(.35,2.26,7.55,.3,1.0),'teal',.45,.8);
  for(let i=.55;i<7.8;i+=.63)H.line(R,[H.p(i,2.28,.35),H.p(i,2.28,.93)],'blue',.8,{tone:.5});
  for(const i of [.38,7.72])timber(H,R,i,1.98,.16,.6,.94,1.79,'sun');
  timber(H,R,.38,1.98,7.5,.64,2.58,.18,'sun');
  timber(H,R,.3,1.92,7.65,.93,.97,.14,'sun');
  H.line(R,[H.p(.55,2.6,1.09),H.p(7.73,2.6,1.09)],'blue',2.1);
  H.line(R,[H.p(.55,2.48,1.11),H.p(7.73,2.48,1.11)],'paper',.8);
  for(const i of [1.2,3.8,6.8])metal(H,R,i,2.12,.37,.24,2.58,.13,'blue');
  cushion(H,R,6.5,2.13,.7,.3,1.09,.1,'paper');
  bentTube(H,R,[[6.9,2.6,1.14],[6.9,2.6,1.4],[7.17,2.6,1.4]],1.7,'blue');
  surface(H,R,[H.p(.27,2.55,.25),H.p(.27,6.75,.25),H.p(.27,6.75,2.3),H.p(.27,2.55,2.73)],'teal',.3,.9);
  for(let j=2.8;j<6.8;j+=.52)H.line(R,[H.p(.3,j,.3),H.p(.3,j,2.35)],'blue',.7,{tone:.38});
  benchFrame(H,R,2.5,3.18,4.6,1.0,.66,'sun');
  cushion(H,R,3.2,3.2,2.4,.9,.67,.12,'coral');
  timber(H,R,2.5,4.3,4.6,.55,.2,.16,'sun');
  cabinetFrame(H,R,8.4,2.5,2.6,1.1,.32,2.5,2,'teal',(x,y,w,d,z,h,col)=>{
    for(const zz of [.55,1.32])timber(H,R,x,y,w,d,z+zz,.09,'sun');
    if(col===0){for(let n=0;n<4;n++){const q=[H.p(x+.08+n*.19,y+.4,z+.08),H.p(x+.24+n*.19,y+.4,z+.08),H.p(x+.24+n*.19,y+.4,z+.47),H.p(x+.08+n*.19,y+.4,z+.47)];surface(H,R,q,n%2?'sun':'paper',.9,.45);}const p=H.p(x+.42,y+.4,z+.83);bird(H,R,...p,.8);}
    else {drape(H,R,x+.04,y+.06,w-.08,d-.1,z+.62,.31,'paper');const p=H.p(x+.45,y+.4,z+1.59);oval(H,R,...p,12,10,'coral',.6);H.line(R,[[p[0]-8,p[1]],[p[0]+7,p[1]]],'blue',1);}
    for(let n=0;n<3;n++)H.line(R,[H.p(x+.15+n*.22,y+d+.02,z+2.02),H.p(x+.15+n*.22,y+d+.02,z+2.14)],'blue',1.6);
  });
  const sketch=[H.p(9.4,2.6,2.85),H.p(10.65,2.6,2.85),H.p(10.65,2.6,3.7),H.p(9.4,2.6,3.7)];surface(H,R,sketch,'paper',1,.8);bird(H,R,...H.p(10.0,2.6,3.23),2.4);
  bentTube(H,R,[[11.2,3,.22],[11.15,3,2.4],[10.99,3,2.52],[10.8,3,2.42]],2,'coral');
  for(const j of [5.4,9.6])timber(H,R,11.47,j,.2,.2,.2,1.38,'sun');
  bentTube(H,R,[[11.55,4,.97],[11.68,6.5,1.08],[11.5,10.2,.97]],3,'teal');
  benchFrame(H,R,8.8,6.4,2.0,1.7,.62,'sun');
  cushion(H,R,8.85,6.43,1.85,1.45,.64,.17,'coral');
  const pad=H.tile(9,8.6,1.1,.9,.24);surface(H,R,pad,'paper',1,.6);bird(H,R,...H.p(9.5,9,.26),1.2);
  H.line(R,[H.p(10.3,8.7,.24),H.p(10.8,9.05,.24)],'sun',2);
  const ear=H.p(10.95,7.5,.67);stroke(H,R,[[ear[0]-8,ear[1]],[ear[0]-9,ear[1]-14],[ear[0]+9,ear[1]-14],[ear[0]+8,ear[1]]],'blue',2);for(const dx of [-8,8])oval(H,R,ear[0]+dx,ear[1],4,7,'sun',.7);
  benchFrame(H,R,1.05,8.75,5.4,1.15,.58,'teal');
  for(let n=0;n<5;n++){const x=1.38+n*.93;surface(H,R,H.tile(x,8.92,.7,.7,.6),'paper',1,.6);const [a,b]=H.p(x+.35,9.26,.63);if(n===0){oval(H,R,a,b,8,4,'sun',.7);oval(H,R,a,b,5,2.2,'paper',1);}else if(n===1){stroke(H,R,[[a,b+5],[a,b-10]],'teal',1);oval(H,R,a,b-10,3,7,'sun',.7);}else if(n===2){oval(H,R,a,b,9,5,'teal',.3);for(let q=0;q<3;q++)H.dot(a-5+q*4,b-2,1.6,'blue',.5);}else if(n===3){shape(H,R,[[a-9,b+4],[a+7,b-6],[a+5,b+1]],'sun',.6,.5);H.line(R,[[a-8,b+3],[a+6,b-5]],'blue',.6);}else for(let q=0;q<3;q++)H.outline(R,ell(a,b,4+q*3,1.5+q),'teal',.65);}
  surface(H,R,H.tile(.15,10.8,1.3,.8,.21),'blue',.54,.6);
  for(let n=0;n<6;n++)H.line(R,[H.p(.25+n*.2,10.9,.23),H.p(.25+n*.2,11.45,.23)],'paper',.7);
},(H,R,t)=>{
  const u=cycle(t,18)*18, f=ease(.5,3.6,u)*(1-ease(13.1,16,u)), look=ease(5.2,7.2,u)*(1-ease(10.8,12.8,u));
  const view=[H.p(.55,2.08,1.09),H.p(7.63,2.08,1.09),H.p(7.63,2.08,2.57),H.p(.55,2.08,2.57)];
  surface(H,R,view,'teal',.2,.5);
  H.clip(view,()=>{
    for(let n=0;n<12;n++){const i=.65+n*.55;H.line(R,[H.p(i,2.1,1.23+(n%3)*.16),H.p(i+.43,2.1,1.23+(n%3)*.16)],'paper',1);}
    for(let n=0;n<18;n++){const i=.72+n*.38,h=1.52+(n%5)*.1,sway=Math.sin(u*Math.PI/9+n*.65)*.035;stroke(H,R,[H.p(i,2.11,1.1),H.p(i+sway,2.11,h-.18),H.p(i+sway*2,2.11,h)],'teal',1.3);if(n%3===0){const p=H.p(i+sway*2,2.11,h);oval(H,R,...p,2,5,'sun',.75);}}
    bird(H,R,...H.p(6.3,2.11,1.72),.55);
  });
  for(let n=0;n<20;n++){const i=.55+n*.36,j=.5+(n%3)*.35, z=1.35+(n%4)*.2, sway=Math.sin(u*Math.PI/9+n*.6)*.045;const p=[H.p(i,j,.04),H.p(i+sway,j,.55),H.p(i+sway*2,j,z)];stroke(H,R,p,n%3?'teal':'sun',1.2);if(n%3===0){const a=p[2];oval(H,R,a[0],a[1],2.1,6,'sun',.8);}}
  const angle=f*1.12, freeJ=2.11-Math.sin(angle)*1.33, freeZ=2.58-Math.cos(angle)*1.33;
  const P=(i,h)=>H.p(i,2.11-Math.sin(angle)*h,2.58-Math.cos(angle)*h);
  surface(H,R,[P(.53,0),P(7.65,0),P(7.65,1.33),P(.53,1.33)],'sun',.52,1);
  for(let n=0;n<9;n++){const i=.68+n*.77;H.line(R,[P(i,.04),P(i,1.27)],'coral',.55,{tone:.5});}
  for(const h of [.12,1.14])H.line(R,[P(.58,h),P(7.6,h)],'blue',2.2);
  H.line(R,[P(.6,1.3),P(7.58,1.3)],'paper',1.1);
  const stayA=[7.15,2.53,1.2],stayB=[7.15,freeJ,freeZ+.04],dy=stayB[1]-stayA[1],dz=stayB[2]-stayA[2],length=Math.hypot(dy,dz),fold=Math.sqrt(Math.max(0,1-length*length/4));
  const stayM=[7.15,(stayA[1]+stayB[1])/2+dz/length*fold,(stayA[2]+stayB[2])/2-dy/length*fold];
  bentTube(H,R,[stayA,stayM,stayB],2,'blue');
  oval(H,R,...H.p(...stayM),2.8,2.8,'coral',.8);
  const foot=H.p(4.72,4.6,.36),hip=H.p(4.72,3.85,.82),chest=[hip[0],hip[1]-21],head=[chest[0]+1,chest[1]-15];
  H.line(R,[[hip[0]-7,hip[1]],[foot[0]-12,foot[1]-18],[foot[0]-8,foot[1]]],'blue',8);H.line(R,[[hip[0]+6,hip[1]],[foot[0]+12,foot[1]-18],[foot[0]+16,foot[1]]],'blue',8);
  shape(H,R,[[chest[0]-9,chest[1]],[chest[0]+9,chest[1]],[hip[0]+10,hip[1]+3],[hip[0]-10,hip[1]+3]],'teal',.75);
  oval(H,R,...head,8,9,'coral',.42);shape(H,R,[[head[0]-8,head[1]-2],[head[0]-5,head[1]-10],[head[0]+6,head[1]-9],[head[0]+8,head[1]-2]],'blue',.82,.7);
  const grip=[chest[0]+16,chest[1]+6+f*10],bin=[head[0]+5,head[1]+mix(30,1,look)],touch=1-ease(3.6,5,u)+ease(12.8,13.4,u),holding=Math.min(1,touch);
  const right=[mix(bin[0]+5,grip[0],holding),mix(bin[1],grip[1],holding)],left=[bin[0]-5,bin[1]];
  const roller=H.p(5.3,2.66,2.73);
  H.line(R,[P(4.3,1.3),roller,grip],'blue',1.05);
  oval(H,R,...roller,3.2,3.2,'sun',.8);
  H.line(R,[H.p(5.3,2.65,2.78),H.p(5.3,2.65,3.81)],'blue',1.5);
  oval(H,R,grip[0],grip[1]+3,3.5,5,'sun',.7);
  for(const [target,s]of [[left,-1],[right,1]]){const shoulder=[chest[0]+s*8,chest[1]+3],elbow=[shoulder[0]+s*9,(shoulder[1]+target[1])/2+7];H.line(R,[shoulder,elbow,target],'blue',6);H.line(R,[shoulder,elbow,target],'teal',4.4);oval(H,R,...target,2.7,2.4,'coral',.4);}
  stroke(H,R,[[head[0]-4,head[1]+9],[bin[0]-9,bin[1]+18],[bin[0]+8,bin[1]+19],[head[0]+6,head[1]+9]],'blue',1);H.line(R,[[bin[0]-6,bin[1]+16],[bin[0]-1,bin[1]+19]],'paper',1.6);binoculars(H,R,...bin);
  actor(H,R,9.6,7.3,t,'mexicoCanalChild',{shirt:['sun',.8],pants:['blue',.7],hairStyle:'curly',face:'sw'},.57,1.18,'child');
  const a=H.p(10.8,2.23,3.62);stroke(H,R,[[a[0],a[1]],[a[0]+8,a[1]+8+Math.sin(u*Math.PI/9)*1.7],[a[0]+2,a[1]+16]],'coral',1.5);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
