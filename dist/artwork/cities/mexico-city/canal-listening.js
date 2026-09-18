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
  for(const j of [2.65,4.65,6.6]){
    timber(H,R,.3,j,.18,.16,.24,2.22,'sun');
    bentTube(H,R,[[.43,j,2.32],[1.08,j,1.65]],2.2,'blue');
  }
  timber(H,R,.32,2.6,.18,4.12,2.36,.16,'sun');
  for(const z of [.69,1.48])timber(H,R,.38,3.03,.65,3.17,z,.13,'sun');
  surface(H,R,H.faceJ(.42,3.1,3.04,.85,1.39),'blue',.34,.6);
  for(const j of [3.23,4.05,5.01]){
    const p=H.p(.78,j,.83);surface(H,R,[[p[0]-7,p[1]],[p[0]+8,p[1]],[p[0]+7,p[1]-15],[p[0]-6,p[1]-15]],j<4?'coral':'paper',.75,.6);H.line(R,[[p[0]-4,p[1]-10],[p[0]+5,p[1]-10]],'blue',.8);
  }
  const field=H.p(.8,5.68,1.61);surface(H,R,[[field[0]-11,field[1]],[field[0]+10,field[1]],[field[0]+10,field[1]-20],[field[0]-11,field[1]-20]],'paper',1,.6);bird(H,R,field[0],field[1]-10,1.05);
  for(const j of [3.22,4.43]){const p=H.p(.75,j,1.6);surface(H,R,ell(...p,9,5),'blue',.7,.6);surface(H,R,ell(p[0],p[1]-2,6,3),'teal',.45,.5);H.line(R,[[p[0]-3,p[1]],[p[0]+3,p[1]-13]],'sun',1.6);}
  for(const i of [.57,7.9,11.43]){
    bentTube(H,R,[[i,2.38,3.49],[i,3.01,2.97]],3,'sun');
    for(const z of [1.35,2.95]){const p=H.p(i,2.49,z);H.dot(...p,2.1,'blue');H.dot(p[0]-.4,p[1]-.6,.7,'paper');}
  }
  const lamp=H.p(7.78,2.8,3.27);H.line(R,[[lamp[0],lamp[1]-19],[lamp[0],lamp[1]-5]],'blue',1.6);surface(H,R,[[lamp[0]-9,lamp[1]-6],[lamp[0]+9,lamp[1]-6],[lamp[0]+7,lamp[1]+11],[lamp[0]-7,lamp[1]+11]],'sun',.8,.9);for(const d of [-5,0,5])H.line(R,[[lamp[0]+d,lamp[1]-5],[lamp[0]+d,lamp[1]+10]],'blue',.8);H.glow(lamp[0],lamp[1],18,20,'sun',.18);
  const perch=H.p(1.03,2.57,1.16);surface(H,R,ell(...perch,8,4),'coral',.45,.7);H.line(R,[[perch[0]-3,perch[1]],[perch[0]+7,perch[1]-7]],'blue',1.4);
  benchFrame(H,R,2.5,3.18,4.6,1.0,.66,'sun');
  cushion(H,R,3.2,3.2,2.4,.9,.67,.12,'coral');
  timber(H,R,2.63,3.24,1.03,1.31,.32,.08,'teal');
  surface(H,R,H.faceI(2.63,4.55,1.03,.34,.56),'teal',.6,.8);
  const drawer=H.p(3.14,4.56,.45);H.line(R,[[drawer[0]-5,drawer[1]],[drawer[0]+5,drawer[1]]],'sun',1.8);
  surface(H,R,H.tile(2.75,3.48,.77,.76,.43),'paper',1,.6);bird(H,R,...H.p(3.13,3.86,.45),.55);
  for(const i of [2.57,6.94])bentTube(H,R,[[i,3.35,.69],[i,3.35,1.06],[i,3.96,1.06],[i,3.96,.69]],2.1,'blue');
  const note=H.tile(1.56,2.24,1.02,.43,1.13);surface(H,R,note,'paper',1,.6);H.line(R,[H.p(1.98,2.27,1.15),H.p(1.98,2.63,1.15)],'blue',.8);bird(H,R,...H.p(2.28,2.44,1.15),.45);

  timber(H,R,2.5,4.3,4.6,.55,.2,.16,'sun');
  cabinetFrame(H,R,8.4,2.5,2.6,1.1,.32,2.5,2,'teal',(x,y,w,d,z,h,col)=>{
    for(const zz of [.55,1.32])timber(H,R,x,y,w,d,z+zz,.09,'sun');
    if(col===0){for(let n=0;n<4;n++){const q=[H.p(x+.08+n*.19,y+.4,z+.08),H.p(x+.24+n*.19,y+.4,z+.08),H.p(x+.24+n*.19,y+.4,z+.47),H.p(x+.08+n*.19,y+.4,z+.47)];surface(H,R,q,n%2?'sun':'paper',.9,.45);}const p=H.p(x+.42,y+.4,z+.83);bird(H,R,...p,.8);}
    else {drape(H,R,x+.04,y+.06,w-.08,d-.1,z+.62,.31,'paper');const p=H.p(x+.45,y+.4,z+1.59);oval(H,R,...p,12,10,'coral',.6);H.line(R,[[p[0]-8,p[1]],[p[0]+7,p[1]]],'blue',1);}
    for(let n=0;n<3;n++)H.line(R,[H.p(x+.15+n*.22,y+d+.02,z+2.02),H.p(x+.15+n*.22,y+d+.02,z+2.14)],'blue',1.6);
  });
  for(const x of [8.57,9.75,10.85]){const p=H.p(x,3.66,.66);H.line(R,[[p[0]-5,p[1]],[p[0]+5,p[1]]],'sun',2);}
  timber(H,R,8.36,3.62,2.76,.5,.37,.1,'sun');
  surface(H,R,H.faceI(8.48,4.04,1.1,.4,.68),'teal',.58,.8);
  for(const x of [8.64,8.88,9.12]){const p=H.p(x,3.82,.58);H.outline(R,ell(...p,3.7,2.4),'blue',1.2);}
  bentTube(H,R,[[11.01,2.7,2.48],[11.45,3.05,2.48],[11.45,3.05,1.92]],2,'blue');
  const pouch=H.p(11.45,3.05,1.66);surface(H,R,[[pouch[0]-10,pouch[1]],[pouch[0]+10,pouch[1]],[pouch[0]+8,pouch[1]-18],[pouch[0]-8,pouch[1]-18]],'coral',.65,.8);H.line(R,[[pouch[0]-8,pouch[1]-13],[pouch[0]+8,pouch[1]-13]],'sun',1.3);
  const sketch=[H.p(9.4,2.6,2.85),H.p(10.65,2.6,2.85),H.p(10.65,2.6,3.7),H.p(9.4,2.6,3.7)];surface(H,R,sketch,'paper',1,.8);bird(H,R,...H.p(10.0,2.6,3.23),2.4);
  bentTube(H,R,[[11.2,3,.22],[11.15,3,2.4],[10.99,3,2.52],[10.8,3,2.42]],2,'coral');
  for(const j of [5.4,9.6])timber(H,R,11.47,j,.2,.2,.2,1.38,'sun');
  bentTube(H,R,[[11.55,4,.97],[11.68,6.5,1.08],[11.5,10.2,.97]],3,'teal');
  benchFrame(H,R,8.8,6.4,2.0,1.7,.62,'sun');
  cushion(H,R,8.85,6.43,1.85,1.45,.64,.17,'coral');
  for(const x of [8.85,10.81])for(const j of [8.46,9.68])timber(H,R,x,j,.1,.12,.23,.44,'sun');
  timber(H,R,8.78,8.36,2.15,1.5,.65,.1,'teal');
  timber(H,R,8.87,8.42,1.96,.12,.76,.15,'sun');
  const pad=H.tile(9,8.6,1.1,.9,.77);surface(H,R,pad,'paper',1,.6);bird(H,R,...H.p(9.5,9,.79),1.2);
  H.line(R,[H.p(10.3,8.7,.79),H.p(10.8,9.05,.79)],'sun',2);
  const ear=H.p(10.95,7.5,.67);stroke(H,R,[[ear[0]-8,ear[1]],[ear[0]-9,ear[1]-14],[ear[0]+9,ear[1]-14],[ear[0]+8,ear[1]]],'blue',2);for(const dx of [-8,8])oval(H,R,ear[0]+dx,ear[1],4,7,'sun',.7);
  for(const x of [1.0,6.4])for(const j of [8.34,9.9])timber(H,R,x,j,.18,.18,.24,.68,'teal');
  timber(H,R,.98,8.36,5.57,1.72,.36,.08,'sun');
  for(const x of [1.05,2.38,3.85,5.3,6.42])timber(H,R,x,8.38,.1,1.68,.43,.39,'teal');
  for(const x of [1.2,4.03]){box(H,R,x,8.67,1.13,1.0,.45,.29,'paper',.8);const p=H.p(x+.58,9.71,.6);H.line(R,[[p[0]-6,p[1]],[p[0]+6,p[1]]],'coral',1.8);}
  for(let n=0;n<4;n++)box(H,R,2.57+n*.2,8.49,.15,1.17,.45,.3,['sun','teal','coral','paper'][n],.7);
  drape(H,R,5.47,8.49,.79,1.23,.46,.3,'paper');
  timber(H,R,.87,8.26,5.83,1.96,.82,.16,'teal');
  for(let n=0;n<5;n++){
    const x=1.15+n*1.07;
    timber(H,R,x,8.52,.88,1.26,.99,.06,'sun');
    surface(H,R,H.tile(x+.07,8.61,.73,1.09,1.057),'paper',1,.65);
    const [a,b]=H.p(x+.45,9.18,1.08);
    if(n===0){oval(H,R,a,b,10,5,'sun',.7);oval(H,R,a,b,6,3,'paper',1);for(let k=0;k<5;k++){const ang=k*Math.PI/2.5;H.line(R,[[a+Math.cos(ang)*6,b+Math.sin(ang)*3],[a+Math.cos(ang)*9,b+Math.sin(ang)*4.5]],'blue',.6);}H.line(R,[[a-8,b+9],[a+10,b+12]],'teal',1.5);}
    else if(n===1){stroke(H,R,[[a-6,b+9],[a,b-15]],'teal',1.4);oval(H,R,a,b-15,4,9,'sun',.7);shape(H,R,[[a-3,b-3],[a-12,b-10],[a-6,b+3]],'teal',.65,.6);}
    else if(n===2){oval(H,R,a,b,11,7,'teal',.3);for(let q=0;q<3;q++){H.line(R,[[a-5+q*4,b-2],[a-8+q*6,b-6]],'blue',1.3);H.dot(a-8+q*6,b-7,1.8,'blue',.7);}oval(H,R,a,b+3,4,2.7,'blue',.4);}
    else if(n===3){shape(H,R,[[a-11,b+8],[a-3,b-8],[a+8,b-12],[a+6,b+1]],'sun',.6,.6);H.line(R,[[a-10,b+7],[a+7,b-11]],'blue',.9);for(let k=0;k<5;k++)H.line(R,[[a-7+k*2.5,b+4-k*3],[a-7+k*3.2,b-3-k*2.3]],'coral',.65);}
    else{for(let q=0;q<3;q++)H.outline(R,ell(a,b,4+q*4,2+q*2),'teal',.8);bird(H,R,a,b-12,.55);}
  }
  bentTube(H,R,[[.68,8.66,.26],[.68,8.66,1.39],[.68,9.9,1.39]],1.9,'blue');
  const mag=H.p(.86,9.69,1.08);H.outline(R,ell(...mag,7,5),'blue',1.7);H.line(R,[[mag[0]+5,mag[1]+3],[mag[0]+13,mag[1]+8]],'coral',2.4);
  const bag=H.p(7.08,9.7,.4);surface(H,R,[[bag[0]-14,bag[1]],[bag[0]+14,bag[1]],[bag[0]+12,bag[1]-24],[bag[0]-12,bag[1]-24]],'teal',.6,.8);stroke(H,R,[[bag[0]-9,bag[1]-22],[bag[0]-5,bag[1]-34],[bag[0]+6,bag[1]-33],[bag[0]+10,bag[1]-23]],'blue',1.7);surface(H,R,[[bag[0]-7,bag[1]-13],[bag[0]+7,bag[1]-13],[bag[0]+7,bag[1]-3],[bag[0]-7,bag[1]-3]],'sun',.6,.6);
  for(const i of [.53,2.42])timber(H,R,i,6.47,.18,.18,.25,.67,'sun');
  timber(H,R,.46,6.4,2.23,1.05,.86,.12,'sun');
  drape(H,R,.62,6.55,1.18,.75,1.0,.26,'paper');
  const boot=H.p(1.8,6.86,1.02);surface(H,R,[[boot[0]-9,boot[1]],[boot[0]+11,boot[1]],[boot[0]+11,boot[1]-4],[boot[0]+2,boot[1]-7],[boot[0]+2,boot[1]-19],[boot[0]-8,boot[1]-19]],'teal',.7,.8);H.line(R,[[boot[0]-8,boot[1]-16],[boot[0]+2,boot[1]-16]],'sun',1.2);
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
  for(const i of [1.18,3.78,6.79]){
    surface(H,R,[P(i-.06,.05),P(i+.09,.05),P(i+.09,.57),P(i-.06,.57)],'teal',.62,.6);
    for(const h of [.15,.45])H.dot(...P(i+.01,h),1.1,'sun');
  }
  H.line(R,[P(.67,.08),P(7.48,1.2)],'sun',2.2);

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
