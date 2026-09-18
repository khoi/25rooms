import { world, box, shape, oval, stroke, actor, wallRect, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, drape, bentTube, vessel } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cityView, cornice, wallCourse, wallRack, taskLight, floorShadow, caster } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q)};
const base={x:0,y:0,drop:0,lean:0,head:0,al:-10,ar:12,el:-6,er:6,ll:-5,lr:5,kl:0,kr:0,roll:0};
function volume(H,R,i,j,z,w=.62,d=.83,h=.18,ink='coral'){
  box(H,R,i-.025,j-.025,w+.05,d+.05,z,.035,ink,.7);box(H,R,i,j,w,d,z+.035,h,'paper',1);box(H,R,i-.025,j-.025,w+.05,d+.05,z+h+.035,.035,ink,.7);
  for(let n=0;n<4;n++)H.line(R,[H.p(i+.04,j+d+.003,z+.065+n*h*.2),H.p(i+w-.025,j+d+.003,z+.065+n*h*.2)],'sun',.5);
  shape(H,R,H.faceJ(i,j-.01,d,z+.02,z+h+.07),ink,.6,.5);
}
function press(H,R,i,j,z,w=1.55){
  timber(H,R,i,j,w,1.04,z,.18,'sun');
  for(const x of [i+.19,i+w-.24]){
    metal(H,R,x,j+.36,.08,.09,z+.18,1.04,'blue');
    for(let n=0;n<10;n++)H.line(R,[H.p(x-.035,j+.44,z+.23+n*.075),H.p(x+.1,j+.44,z+.26+n*.075)],'paper',.6);
    bentTube(H,R,[[x-.18,j+.34,z+1.13],[x+.25,j+.34,z+1.13]],2.2,'sun');
  }
  timber(H,R,i+.06,j+.08,w-.12,.84,z+.39,.18,'sun');
  for(const x of [i+.16,i+w-.29]){
    metal(H,R,x,j+.28,.16,.27,z+.51,.14,'teal');
    const a=H.p(x+.08,j+.42,z+.85);oval(H,R,...a,5,3,'sun',.65);H.line(R,[[a[0]-8,a[1]],[a[0]+8,a[1]]],'sun',2);
  }
  H.line(R,[H.p(i+.14,j+1.055,z+.13),H.p(i+w-.14,j+1.055,z+.13)],'paper',1.3);

  volume(H,R,i+.42,j+.2,z+.19,.66,.64,.13,'teal');
}
const room=world('paris-book-hospital','The spine opens gently',{floor:'paper',tone:.72,pattern:'tiles',wall:'paper',wallTone:1,height:4.08,head:25},(H,R)=>{
  wallCourse(H,R,'nw',0,12,.66,'teal');wallCourse(H,R,'ne',0,12,.66,'teal');
  cornice(H,R,'nw',0,12,3.98);cornice(H,R,'ne',0,12,3.98);
  windowBay(H,R,'nw',4.6,5.68,1.15,2.5,{divisions:3,view:P=>cityView(H,R,P,5.68,2.5)});
  H.tint(H.tile(1.3,4.67,6.7,3.35,.03),'sun',.17);
  wallRack(H,R,'nw',.55,3.57,1.1,2.66,3,'teal',(P,z,row)=>{
    if(row===0){
      for(let n=0;n<4;n++){const a=P(.43+n*.83,z+.06);shape(H,R,[[a[0]-8,a[1]],[a[0]+9,a[1]],[a[0]+9,a[1]-20-n%2*6],[a[0]-8,a[1]-20-n%2*6]],n===2?'coral':'paper',n===2?.5:1,.6);H.line(R,[[a[0]-6,a[1]-3],[a[0]-6,a[1]-16]],'sun',2);}
    }else if(row===1){
      for(let n=0;n<5;n++){const a=P(.36+n*.67,z+.06);shape(H,R,[[a[0]-5,a[1]],[a[0]+5,a[1]],[a[0]+5,a[1]-22],[a[0]-5,a[1]-22]],['coral','teal','sun','paper','teal'][n],.6,.6);H.line(R,[[a[0]-4,a[1]-7],[a[0]+4,a[1]-7]],'paper',.85);}
    }else{
      const a=P(.91,z+.08);shape(H,R,[[a[0]-18,a[1]],[a[0]+17,a[1]],[a[0]+17,a[1]-22],[a[0]-18,a[1]-22]],'sun',.55,.7);H.line(R,[[a[0]-15,a[1]-14],[a[0]+14,a[1]-14]],'coral',1.5);H.line(R,[[a[0]-15,a[1]-8],[a[0]+14,a[1]-8]],'teal',1.5);
      const b=P(2.56,z+.1);oval(H,R,b[0],b[1]-9,10,9,'paper',.7);oval(H,R,b[0],b[1]-9,6,5,'teal',.25);H.line(R,[[b[0]+7,b[1]-4],[b[0]+17,b[1]+3]],'sun',2.4);
    }
  });
  timber(H,R,.5,4.85,1.87,3.17,.24,.12,'teal');
  for(let n=0;n<3;n++){box(H,R,.63,4.97+n*.97,1.55,.77,.37,.38,n===1?'sun':'paper',.72);H.line(R,[H.p(1.09,5.75+n*.97,.54),H.p(1.63,5.75+n*.97,.54)],'teal',1.8);}
  benchFrame(H,R,.34,4.67,2.23,3.59,1.13,'teal');
  press(H,R,.47,5.09,1.14,1.96);
  for(let n=0;n<3;n++)volume(H,R,.67,7.03,1.14+n*.17,1.3,.8,.12,['teal','coral','sun'][n]);
  metal(H,R,2.11,7.19,.29,.74,1.14,.055,'blue');
  const bone=H.p(2.28,7.62,1.22);shape(H,R,[[bone[0]-2,bone[1]+7],[bone[0]+2,bone[1]+7],[bone[0]+3,bone[1]-13],[bone[0],bone[1]-19],[bone[0]-3,bone[1]-13]],'paper',1,.6);
  cabinetFrame(H,R,4.42,.3,6.94,1.42,.1,3.48,3,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+1.04,.1,'sun');timber(H,R,x,j,w,d,z+2.39,.1,'sun');
    for(let row=0;row<3;row++){
      box(H,R,x+.06,j+.04,w-.13,d-.05,z+.05+row*.29,.23,'teal',.52);
      H.line(R,[H.p(x+w*.37,j+d+.01,z+.17+row*.29),H.p(x+w*.61,j+d+.01,z+.17+row*.29)],'sun',1.6);
    }
    if(n===0){press(H,R,x+.18,j+.05,z+1.16,w-.38);}
    if(n===1){
      for(const i of [x+.17,x+w-.24])timber(H,R,i,j+.3,.09,.2,z+1.17,1.07,'sun');
      timber(H,R,x+.1,j+.26,w-.2,.27,z+2.2,.1,'sun');timber(H,R,x+.1,j+.11,w-.2,.8,z+1.15,.1,'sun');
      for(let k=0;k<5;k++){const xx=x+.4+k*.25;H.line(R,[H.p(xx,j+.4,z+1.27),H.p(xx,j+.4,z+2.21)],'paper',.95);}
      const knot=H.p(x+.92,j+.4,z+1.8);oval(H,R,...knot,2.7,2.1,'coral',.65);H.line(R,[[knot[0]-2,knot[1]+2],[knot[0]-5,knot[1]+8]],'coral',.7);
    }
    if(n===2){for(let k=0;k<4;k++){const p=H.p(x+.3+k*.4,j+.65,z+1.19);shape(H,R,[[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+5,p[1]-30-k%2*8],[p[0]-5,p[1]-30-k%2*8]],['paper','coral','sun','teal'][k],.6,.5);oval(H,R,p[0],p[1]-30-k%2*8,5,2,'blue',.7);}}
    if(n<2){for(let k=0;k<3;k++)volume(H,R,x+.17+k*.57,j+.17,z+2.5,.46,.7,.16+(k%2)*.15,['coral','teal','sun'][k]);}
    else{vessel(H,R,x+.42,j+.56,z+2.52,7,12,'paper',false);for(let k=0;k<3;k++)bentTube(H,R,[[x+1.05+k*.23,j+.6,z+2.51],[x+1.05+k*.23,j+.6,z+3.09+k%2*.17]],1.2,'sun');}
  });
  drape(H,R,9.47,.31,1.62,1.37,3.61,.56,'paper');
  wallRack(H,R,'ne',.55,3.25,1.35,1.97,2,'sun',(P,z,row)=>{
    for(let n=0;n<3;n++){
      const a=P(.53+n*.91,z+.05);shape(H,R,[[a[0]-9,a[1]],[a[0]+9,a[1]],[a[0]+9,a[1]-21],[a[0]-9,a[1]-21]],n===1?'coral':'paper',n===1?.5:1,.6);
      H.line(R,[[a[0]-7,a[1]-3],[a[0]-2,a[1]-15],[a[0]+6,a[1]-6]],row?'blue':'teal',1);
      H.line(R,[[a[0]-6,a[1]-1],[a[0]+6,a[1]-1]],'sun',1.2);
    }
  });
  floorShadow(H,3.46,4.22,5.98,3.07,.19);
  timber(H,R,3.65,4.48,1.47,2.28,.31,.11,'teal');
  for(let n=0;n<3;n++)volume(H,R,3.87,4.68,.43+n*.2,1.02,1.33,.14,n===1?'sun':'coral');
  timber(H,R,5.27,4.5,3.8,1.0,.31,.1,'teal');
  box(H,R,5.43,4.7,1.49,.86,.44,.33,'sun',.42);
  box(H,R,7.13,4.7,1.54,.86,.44,.33,'teal',.46);
  for(const i of [5.62,7.31])H.line(R,[H.p(i,5.57,.6),H.p(i+.85,5.57,.6)],'paper',1.4);
  benchFrame(H,R,3.45,4.21,5.98,3.07,1.18,'sun');
  shape(H,R,H.tile(3.71,4.49,2.51,.88,1.205),'teal',.4,.65);
  for(let n=0;n<5;n++){
    const x=3.98+n*.39;
    H.line(R,[H.p(x,4.63,1.22),H.p(x,5.15,1.22)],n===2?'paper':'sun',2.1);
    metal(H,R,x-.035,4.62,.07,.17,1.225,.022,'blue');
  }
  const cut=H.p(6.71,4.78,1.215);oval(H,R,cut[0]-5,cut[1],4,3,'sun',.65);oval(H,R,cut[0]+5,cut[1],4,3,'sun',.65);H.line(R,[[cut[0]-4,cut[1]-2],[cut[0]+5,cut[1]-15]],'blue',1.2);H.line(R,[[cut[0]+4,cut[1]-2],[cut[0]-5,cut[1]-15]],'blue',1.2);
  vessel(H,R,7.35,4.77,1.2,7,11,'paper',false);oval(H,R,...H.p(7.81,4.85,1.22),7,3,'teal',.5);
  metal(H,R,5.11,5.42,3.19,1.94,1.2,.09,'teal');
  for(const i of [5.23,7.08]){
    for(const j of [5.53,6.81]){
      shape(H,R,[H.p(i,j,1.3),H.p(i+.93,j,1.3),H.p(i,j,1.87)],'sun',.55,.6);
      H.line(R,[H.p(i+.15,j+.015,1.37),H.p(i+.15,j+.015,1.66)],'paper',1);
    }
    metal(H,R,i+.22,7.3,.57,.11,1.3,.1,'blue');
    const knob=H.p(i+.53,7.44,1.38);oval(H,R,...knob,4,3,'sun',.75);
  }
  for(const i of [5.21,7.15])cushion(H,R,i,5.55,.95,1.71,1.3,.22,'paper');
  shape(H,R,[H.p(5.29,5.68,2.21),H.p(6.37,5.68,1.53),H.p(6.37,7.17,1.53),H.p(5.29,7.17,2.21)],'paper',1,.8);
  const page=(u,v)=>H.p(5.29+1.08*u,5.68+1.49*v,2.21-.68*u+.018);
  for(let n=0;n<4;n++){
    const u=.16+n*.19;
    H.line(R,[page(u,.2),page(u,.8)],n===2?'coral':'teal',1.05);
    for(let m=0;m<3;m++){
      const v=.3+m*.2;
      H.dot(...page(u,v),1.15,'blue');
      stroke(H,R,[page(u-.065,v-.04),page(u+.07,v+.02),page(u-.065,v+.06)],'sun',.8);
    }
  }
  H.line(R,[page(.1,.87),page(.88,.87)],'sun',1.3);
  shape(H,R,[H.p(5.29,7.17,1.51),H.p(6.37,7.17,1.51),H.p(6.37,7.17,1.53),H.p(5.29,7.17,2.21)],'paper',.8,.75);
  shape(H,R,[H.p(6.43,5.68,1.37),H.p(7.89,5.68,1.49),H.p(7.89,7.17,1.49),H.p(6.43,7.17,1.37)],'paper',1,.8);
  for(const i of [5.35,7.98])metal(H,R,i,7.13,.17,.19,1.2,.3,'blue');
  bentTube(H,R,[[5.23,5.48,1.26],[5.23,5.17,1.26],[5.66,5.17,1.26]],1.5,'teal');
  taskLight(H,R,8.87,4.44,1.2,'coral',-.6);
  shape(H,R,H.tile(4.02,6.09,.74,.66,1.2),'paper',1);
  H.line(R,[H.p(4.14,6.14,1.21),H.p(4.14,6.7,1.21)],'coral',2);
  for(let n=0;n<5;n++)H.line(R,[H.p(4.11,6.2+n*.08,1.22),H.p(4.19,6.2+n*.08,1.22)],'blue',.45);
  const spool=H.p(8.72,6.51,1.21);oval(H,R,...spool,7,4,'sun',.7);shape(H,R,[[spool[0]-4,spool[1]],[spool[0]+4,spool[1]],[spool[0]+4,spool[1]-11],[spool[0]-4,spool[1]-11]],'paper',1);oval(H,R,spool[0],spool[1]-11,7,4,'sun',.7);
  for(let n=0;n<5;n++)stroke(H,R,[[spool[0]+7,spool[1]-2],[spool[0]+14+n*3,spool[1]-10],[spool[0]+22+n*4,spool[1]-6]],n%2?'coral':'blue',.6);
  for(const i of [10.16,11.33])for(const j of [4.79,6.25])caster(H,R,i,j,.075);
  timber(H,R,10.03,4.68,1.44,1.72,.25,.12,'teal');
  for(const i of [10.1,11.3])for(const j of [4.75,6.22])metal(H,R,i,j,.08,.08,.37,.93,'teal');
  timber(H,R,10.03,4.68,1.44,1.72,1.18,.12,'sun');
  box(H,R,10.19,4.87,1.1,1.21,.39,.39,'paper',1);
  box(H,R,10.18,4.89,1.07,1.19,1.31,.24,'teal',.45);
  shape(H,R,[H.p(10.18,4.89,1.54),H.p(11.25,4.89,1.54),H.p(11.25,4.64,2.12),H.p(10.18,4.64,2.12)],'teal',.48,.7);
  cushion(H,R,10.29,5.02,.82,.9,1.56,.08,'paper');
  H.line(R,[H.p(10.36,5.15,1.66),H.p(11.04,5.76,1.66)],'coral',1.5);
  benchFrame(H,R,.39,9.13,2.6,2.08,.74,'teal');
  box(H,R,.56,9.34,2.13,1.59,.76,.24,'sun',.35);
  shape(H,R,H.tile(.69,9.47,1.87,1.35,1.01),'paper',1);
  shape(H,R,H.tile(.9,9.63,.66,.92,1.02),'blue',.52);
  shape(H,R,[H.p(1.52,9.93,1.025),H.p(1.75,9.93,1.025),H.p(1.75,10.27,1.025),H.p(1.52,10.27,1.025)],'paper',1,.5);
  cushion(H,R,2.02,9.67,.41,.72,1.025,.18,'paper');
  drape(H,R,.93,10.8,1.1,.3,.77,.37,'paper');
  timber(H,R,5.32,9.9,5.43,1.01,.22,.1,'sun');
  for(let n=0;n<4;n++)volume(H,R,5.45+n*1.24,10.07,.33,1.08,.71,.18,['coral','teal','sun','paper'][n]);
  benchFrame(H,R,5.11,9.74,5.9,1.33,.73,'sun');
  for(let n=0;n<3;n++){
    const x=5.35+n*1.05;shape(H,R,H.tile(x,9.87,.87,.94,.75),'paper',1);
    H.line(R,[H.p(x+.17,10.04,.76),H.p(x+.17,10.62,.76)],n===1?'coral':'teal',2.2);
    for(let k=0;k<5;k++)H.line(R,[H.p(x+.08,10.11+k*.08,.76),H.p(x+.28,10.11+k*.08,.76)],'blue',.5);
  }
  for(let n=0;n<3;n++){const a=H.p(8.01+n*.2,10.16,.77);H.line(R,[a,[a[0]+4,a[1]-13]],n===1?'coral':'teal',1.1);oval(H,R,a[0]+4,a[1]-13,2,1.4,'sun',.7);}
  volume(H,R,8.82,10.03,.75,.49,.62,.25,'teal');
  const p=H.p(10.19,10.27,.79);oval(H,R,...p,10,5,'paper',1);oval(H,R,...p,7,3.5,'teal',.22);H.line(R,[[p[0]+8,p[1]+2],[p[0]+19,p[1]+9]],'sun',2.1);
},(H,R,t)=>{
  const u=((t%20)+20)%20,opening=ease(4,8,u)*(1-ease(12,18,u)),angle=opening*2.6;
  const i=6.43,j=5.77,z=1.56,len=1.33,depth=1.27;
  const P=(f,v,offset=0)=>H.p(i+Math.cos(angle)*len*f,j+v*depth,z+Math.sin(angle)*len*f+offset);
  const lower=[H.p(i,j,z-.1),H.p(i+len,j,z-.1),H.p(i+len,j+depth,z-.1),H.p(i,j+depth,z-.1)];
  shape(H,R,lower,'teal',.75,.85);shape(H,R,lower.map(([x,y])=>[x,y-3]),'paper',1,.6);
  for(let n=0;n<5;n++)H.line(R,[H.p(i+.07,j+depth,z-.02+n*.012),H.p(i+len-.06,j+depth,z-.02+n*.012)],'sun',.5);
  const cover=[P(0,0),P(1,0),P(1,1),P(0,1)];shape(H,R,cover,'teal',.68,.85);
  if(opening>.035){
    const pages=[P(.055,.05,.03),P(.97,.05,.03),P(.97,.96,.03),P(.055,.96,.03)];shape(H,R,pages,'paper',1,.55);
    for(let n=0;n<7;n++)H.line(R,[P(.08,.94,.01+n*.008),P(.96,.94,.01+n*.008)],'sun',.55);
    for(let n=0;n<4;n++)stroke(H,R,[P(.08,.12+n*.2,.044),P(.43,.1+n*.2,.044),P(.87,.14+n*.2,.044)],'blue',.38,.22);
  }
  H.line(R,[P(.02,0,.04),P(.02,1,.04)],'coral',2.8);
  shape(H,R,[P(.03,.29,.055),P(.16,.29,.055),P(.16,.48,.055),P(.03,.48,.055)],'sun',.7,.4);
  const ai=7.05,aj=7.6,root=H.p(ai,aj),s=2.05,pose={...base,head:12,al:20,ar:20};
  const hands=[P(.31,.92,.02),H.p(7.03,7.06,1.47)];
  for(const [n,side]of ['l','r'].entries()){
    const dx=(hands[n][0]-root[0])/s-(n?5.2:-5.2),dy=(hands[n][1]-root[1])/s+32.5,bend=(n?-1:1)*Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-4.368**2-4.2**2)/(2*4.368*4.2))));
    pose['a'+side]=(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(bend),4.368+4.2*Math.cos(bend)))*180/Math.PI;pose['e'+side]=bend*180/Math.PI;
  }
  FIGURES.clips.parisBookCradle={dur:20,keys:[[0,pose],[1,pose]]};
  actor(H,R,ai,aj,0,'parisBookCradle',{shirt:['paper',1],apron:['coral',.58],hairStyle:'bun',glasses:true},0,s);
  for(const p of hands)H.dot(...p,2.1,'coral',.37,{knock:true});
  const pupil={...base,head:5+opening*11,al:24,ar:35,el:35,er:65};FIGURES.clips.parisBookPupil={dur:20,keys:[[0,pupil],[1,pupil]]};
  actor(H,R,9.55,7.8,0,'parisBookPupil',{shirt:['teal',.55],hairStyle:'curly'},0,1.6);
  stroke(H,R,[H.p(7.62,7,1.5),H.p(7.75,7.23,1.46),H.p(7.72,7.31,1.19+.025*Math.sin(u*Math.PI/10))],'coral',1.3);
});
room.loopSeconds=20;room.stillTime=10;
export default room;
