import { world, shape, stroke, oval, box, actor, ell, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, vessel, bentTube, benchFrame, drape } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, panelFront, taskLight, wallCourse, hangingRail, floorShadow, caster } from '../joinery.js';

const duration=18;
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const base={...FIGURES.clips.idle.keys[0][1]};
for(const n of ['amsterdamRecordsKeeper','amsterdamRecordsListener'])FIGURES.clips[n]={dur:duration,keys:[[0,base],[1,base]]};

function sleeves(H,R,i,j,w,d,z,count,front=false){
  for(let n=0;n<count;n++){
    const x=i+.07+n*(w-.17)/count,top=z+.83+(n%3)*.07;
    const q=[H.p(x,j+d,z),H.p(x+.09,j+d,z),H.p(x+.2,j+.12,top),H.p(x+.1,j+.12,top)];
    shape(H,R,q,['paper','teal','coral','sun'][n%4],n%4? .54:1,.45);
    H.line(R,[H.p(x+.1,j+.12,top-.08),H.p(x+.2,j+.12,top-.08)],'blue',.55);
  }
  if(front){
    const q=[H.p(i+.13,j+d+.012,z+.1),H.p(i+w-.14,j+d+.012,z+.1),H.p(i+w-.03,j+d-.05,z+.85),H.p(i+.24,j+d-.05,z+.85)];
    shape(H,R,q,'paper',1,.6);shape(H,R,[q[0],q[1],H.p(i+w*.57,j+d,z+.68)],'coral',.57,.5);
    oval(H,R,...H.p(i+w*.54,j+d+.015,z+.55),7,7,'teal',.62);
  }
}

function record(H,R,x,y,rx,ry){
  oval(H,R,x,y,rx,ry,'blue',.95);
  for(const f of [.9,.74,.59])H.outline(R,ell(x,y,rx*f,ry*f),'teal',.55,{tone:.7,amp:.03});
  oval(H,R,x,y,rx*.29,ry*.29,'sun',.75);H.dot(x,y,1.2,'paper',1);
  const p=[];for(let n=0;n<16;n++){const a=-2.8+n*.075;p.push([x+Math.cos(a)*rx*.83,y+Math.sin(a)*ry*.83]);}H.line(R,p,'paper',1.25,{tone:.85});
  H.line(R,[[x+rx*.2,y-ry*.64],[x+rx*.54,y-ry*.31]],'coral',.65);
}

const room=world('amsterdam-pijp-records','The sleeve opens after work',{floor:'paper',tone:.28,wall:'blue',wallTone:.68,height:3.65,pattern:'tiles',accent:'teal',head:28},(H,R)=>{
  wallCourse(H,R,'nw',.1,11.9,.82,'coral');
  timber(H,R,.09,.3,.18,11.4,3.48,.16,'sun');
  for(const j of [2.04,3.92,5.8]){
    const P=(u,z,d=.24)=>H.p(d,j+u,z);
    shape(H,R,[P(0,1.54),P(1.63,1.54),P(1.63,3.22),P(0,3.22)],'sun',.5,.85);
    shape(H,R,[P(.12,1.66),P(1.51,1.66),P(1.51,3.1),P(.12,3.1)],j<3?'paper':j<5?'coral':'teal',j<3?1:.48,.65);
    if(j<3){const p=P(.83,2.4,.26);record(H,R,...p,12,15);H.line(R,[P(.22,1.85),P(.98,1.85)],'coral',1.7);}
    else if(j<5){shape(H,R,[P(.23,1.83),P(1.37,1.83),P(.82,2.86)],'blue',.67,.6);const p=P(.83,2.55,.26);oval(H,R,...p,7,9,'sun',.8);}
    else{for(let n=0;n<3;n++)H.line(R,[P(.3+n*.44,1.9),P(.3+n*.44,2.89)],['paper','sun','coral'][n],3);}
    timber(H,R,.12,j-.04,.42,1.71,1.49,.09,'teal');
    H.line(R,[P(.12,1.38,.4),P(.12,1.2,.12)],'blue',1.5);
  }
  windowBay(H,R,'nw',7.75,3.25,1.15,2.23,{ink:'sun',night:true,divisions:2,view:P=>{
    for(let n=0;n<4;n++){const u=.16+n*.76;shape(H,R,[P(u,.15),P(u+.55,.15),P(u+.55,.84),P(u+.3,1.13),P(u,.84)],'teal',.4,.45);H.line(R,[P(u+.19,.46),P(u+.19,.69)],'sun',2.3);}
  }});
  cabinetFrame(H,R,.45,.2,10.7,1.62,.14,3.42,4,'teal',(x,y,w,d,z,h,n)=>{
    for(const level of [0,.95,1.9]){
      if(level)timber(H,R,x,y,w,d,z+level,.11,'sun');
      if(n===3&&level===.95){
        metal(H,R,x+.27,y+.05,w-.44,.93,z+level+.12,.85,'blue');
        const p=H.p(x+w*.52,y+1.02,z+level+.57);oval(H,R,...p,11,12,'teal',.55);oval(H,R,...p,7,8,'blue',.85);H.dot(...p,3,'paper',.8);
      }else sleeves(H,R,x+.03,y+.02,w-.06,d-.15,z+level+.12,8,n===0&&level===1.9);
      timber(H,R,x,y+d-.06,w,.09,z+level+.06,.2,'sun');
    }
  });
  panelFront(H,R,.63,1.85,3.87,.23,.7,3,'teal');
  for(const x of [7.83,9.23]){
    shape(H,R,H.faceI(x,1.88,1.23,.25,.92),'blue',.78,.7);
    box(H,R,x+.06,1.78,1.1,.39,.29,.43,'coral',.52);
    H.line(R,[H.p(x+.18,2.19,.65),H.p(x+.98,2.19,.65)],'sun',2);
    for(let n=0;n<4;n++)shape(H,R,H.faceI(x+.13,1.87+n*.065,.91,.57,.92+n*.015),'paper',1,.4);
  }
  shape(H,R,H.faceI(4.91,1.86,2.28,.26,.77),'coral',.45,.7);H.line(R,[H.p(5.34,1.88,.56),H.p(6.7,1.88,.56)],'blue',2.2);
  shape(H,R,H.faceI(5.28,1.88,1.44,.58,.69),'blue',.7,.55);
  for(const i of [2.5,6.4,9.8]){timber(H,R,i,.36,1.3,.9,3.62,.08,'sun');shape(H,R,H.faceI(i+.06,1.03,1.13,3.71,4.23),'paper',1,.7);oval(H,R,...H.p(i+.65,1.05,3.98),8,8,'coral',.5);}
  hangingRail(H,R,'nw',10.22,1.32,2.98,3,(P,u,n)=>{
    if(n===0){stroke(H,R,[P(u-.25,-.18),P(u-.21,-.04),P(u+.19,-.04),P(u+.26,-.2)],'sun',2.5);oval(H,R,...P(u-.26,-.2),4,5,'blue',.8);oval(H,R,...P(u+.26,-.2),4,5,'blue',.8);}
    if(n===1){shape(H,R,[P(u-.22,-.2),P(u+.24,-.2),P(u+.24,-.77),P(u-.22,-.72)],'paper',1,.6);shape(H,R,[P(u-.22,-.58),P(u-.02,-.6),P(u-.03,-.73),P(u-.22,-.72)],'coral',.75,.45);}
    if(n===2)shape(H,R,[P(u,-.2),P(u+.4,-.49),P(u+.16,-.78),P(u-.25,-.44)],'teal',.6,.6);
  });
  floorShadow(H,2.4,4,6.5,3.3,.22);
  for(const i of [2.83,8.38])for(const j of [4.28,6.23])timber(H,R,i,j,.2,.21,.05,1.01,'sun');
  timber(H,R,2.91,4.4,5.52,1.74,.33,.12,'teal');
  for(const i of [2.88,8.35])bentTube(H,R,[[i,4.32,.12],[i,6.34,.97]],1.8,'blue');
  metal(H,R,3.21,4.86,2.14,1.7,.45,.55,'blue');
  shape(H,R,H.faceI(3.34,6.59,1.89,.51,.94),'teal',.44,.65);
  for(const i of [3.55,3.95]){const p=H.p(i,6.61,.73);oval(H,R,...p,5,5,'paper',1);H.line(R,[[p[0],p[1]],[p[0]+2,p[1]-3]],'coral',.8);}
  for(let n=0;n<4;n++)H.line(R,[H.p(4.46+n*.16,6.61,.58),H.p(4.46+n*.16,6.61,.87)],'sun',1.1);
  metal(H,R,5.78,4.96,1.93,1.61,.45,.55,'teal');
  for(let n=0;n<7;n++)H.line(R,[H.p(5.94+n*.22,5.14,.96),H.p(5.94+n*.22,5.9,.96)],'blue',1.2);
  shape(H,R,H.faceI(5.92,6.59,1.64,.51,.94),'blue',.83,.5);
  for(const i of [6.09,6.56,7.16]){const p=H.p(i,6.61,.7);oval(H,R,...p,3.4,4,'sun',.65);H.dot(p[0],p[1]-2,.65,'paper');}
  stroke(H,R,[H.p(3.4,4.51,1.33),H.p(3.13,4.39,.66),H.p(3.75,4.37,.48),H.p(5.88,4.78,.6)],'blue',1.1);
  timber(H,R,2.75,6.47,5.86,.13,.99,.16,'sun');
  for(const i of [2.92,8.21])metal(H,R,i,6.42,.22,.08,1.04,.24,'teal');
  timber(H,R,2.72,4.17,5.95,2.36,1.06,.12,'sun');
  timber(H,R,2.83,4.25,1.13,2.19,1.19,.12,'teal');
  metal(H,R,3.0,4.41,.83,1.64,1.33,.11,'blue');
  const disc=H.p(3.42,5.11,1.47);record(H,R,...disc,14,7);
  for(const i of [3.09,3.69])for(const j of [4.54,5.83]){const p=H.p(i,j,1.37);oval(H,R,...p,3,1.6,'blue',.8);}
  for(let n=0;n<4;n++){const p=H.p(3.16+n*.13,5.88,1.48);H.dot(...p,1.2,n===0?'coral':'paper');}
  H.line(R,[H.p(3.76,4.85,1.48),H.p(3.76,5.3,1.48)],'sun',1.3);metal(H,R,3.71,5.02,.09,.12,1.48,.045,'paper');
  H.line(R,[H.p(3.15,4.54,1.5),H.p(3.19,5.29,1.54),H.p(3.38,5.47,1.54)],'paper',2.2);
  box(H,R,3.31,5.39,.18,.19,1.5,.08,'sun',.8);
  for(const i of [2.95,3.65])metal(H,R,i,4.22,.14,.22,1.42,.11,'sun');
  const cover=[H.p(2.96,4.32,1.51),H.p(3.84,4.32,1.51),H.p(3.84,4.16,2.18),H.p(2.96,4.16,2.18)];H.tint(cover,'teal',.18);H.outline(R,cover,'blue',.8);H.line(R,[cover[2],cover[3]],'paper',1.8);
  cushion(H,R,4.42,4.67,2.43,1.58,1.32,.06,'teal');
  H.line(R,[H.p(4.51,4.79,1.4),H.p(6.78,4.79,1.4)],'paper',.75);
  timber(H,R,4.16,4.25,2.94,.16,1.32,.18,'sun');
  H.line(R,[H.p(4.29,4.3,1.5),H.p(6.98,4.3,1.5)],'blue',2.2);
  taskLight(H,R,6.94,4.22,1.33,'coral',-.69);
  bentTube(H,R,[[8.15,5.5,1.36],[8.15,5.5,1.96],[8.4,5.5,2.05]],2.3,'teal');
  const hp=H.p(8.23,5.5,1.89);stroke(H,R,[[hp[0]-8,hp[1]+1],[hp[0]-9,hp[1]-10],[hp[0],hp[1]-15],[hp[0]+9,hp[1]-9],[hp[0]+8,hp[1]+1]],'blue',3);
  oval(H,R,hp[0]-8,hp[1]+1,4,7,'coral',.66);oval(H,R,hp[0]+8,hp[1]+1,4,7,'teal',.6);for(let n=0;n<4;n++)H.line(R,[[hp[0]+6,hp[1]-4+n*2],[hp[0]+10,hp[1]-3+n*2]],'paper',.65);
  stroke(H,R,[[hp[0]+8,hp[1]+7],[hp[0]+14,hp[1]+23],[hp[0]+4,hp[1]+36],[hp[0]-5,hp[1]+30]],'blue',.9);
  for(const j of [3.4,6.9]){
    cabinetFrame(H,R,8.83,j,2.43,1.63,.15,1.05,1,'sun',()=>{});
    for(const i of [8.98,10.89])timber(H,R,i,j+.11,.13,1.27,.22,.7,'teal');
    for(const x of [9.24,9.91]){box(H,R,x,j+.23,.49,.8,.33,.56,'paper',1);H.line(R,[H.p(x+.02,j+1.04,.51),H.p(x+.45,j+1.04,.51)],'coral',1.2);}
    sleeves(H,R,8.96,j+.12,2.14,1.35,1.23,10,true);
    timber(H,R,8.82,j+1.59,2.47,.11,1.16,.25,'teal');
    for(const i of [9.01,9.96,11.04]){H.line(R,[H.p(i,j+.21,1.31),H.p(i,j+.08,2.27)],'sun',2);H.line(R,[H.p(i-.13,j+.08,2.27),H.p(i+.19,j+.08,2.27)],'paper',2.6);}
  }
  benchFrame(H,R,.39,5.9,1.85,1.55,.91,'teal');
  timber(H,R,.5,6.05,1.57,1.22,.29,.09,'sun');
  for(let n=0;n<3;n++)box(H,R,.63+n*.39,6.17,.31,.75,.4,.37,['paper','coral','teal'][n],.55);
  metal(H,R,.53,6.01,1.59,1.29,.95,.055,'sun');
  box(H,R,.72,6.19,.63,.52,1.02,.1,'paper',1);shape(H,R,H.tile(.73,6.19,.18,.17,1.13),'coral',.6,.5);
  const bp=H.p(1.74,6.33,1.04);shape(H,R,[[bp[0]-6,bp[1]],[bp[0]+6,bp[1]],[bp[0]+5,bp[1]-6],[bp[0]-5,bp[1]-6]],'sun',.7,.6);for(let n=-4;n<5;n+=1.3)H.line(R,[[bp[0]+n,bp[1]],[bp[0]+n,bp[1]+5]],'blue',.6);
  cushion(H,R,1.58,6.91,.43,.32,1.04,.06,'coral');
  oval(H,R,...H.p(.86,7,1.04),5,2.7,'sun',.65);box(H,R,.77,6.9,.17,.16,1.07,.09,'blue',.7);
  const be=H.p(1.79,6.73,1.04);oval(H,R,...be,5.5,3.1,'teal',.7);H.line(R,[[be[0]+5,be[1]],[be[0]+12,be[1]-3]],'blue',2);
  taskLight(H,R,.53,6.05,1.04,'sun',.55);
  for(const i of [3.13,5.32])for(const j of [9.4,10.85])caster(H,R,i,j);
  cabinetFrame(H,R,2.97,9.18,2.62,1.89,.23,.84,2,'teal',(x,y,w,d,z,h,n)=>{
    if(n===0)sleeves(H,R,x+.04,y+.05,w-.04,d-.1,z+.03,5,true);
    else{for(let k=0;k<3;k++)box(H,R,x+.11,y+.19+k*.24,.73,.21,z+.04,.57,['sun','paper','coral'][k],.56);}
  });
  timber(H,R,2.95,9.15,2.69,1.99,1.08,.1,'sun');
  for(let n=0;n<4;n++)shape(H,R,H.tile(3.19+n*.03,9.5+n*.05,1.12,.99,1.2+n*.035),'paper',1,.5);
  record(H,R,...H.p(3.8,10.08,1.37),10,5);drape(H,R,4.59,9.38,.72,1.45,1.21,.47,'coral');
  bentTube(H,R,[[2.96,9.3,.84],[2.81,9.3,1.67],[2.81,10.9,1.67],[2.96,10.9,.84]],2,'teal');
  for(const i of [7.03,7.69])for(const j of [8.57,9.25])timber(H,R,i,j,.1,.1,.04,.8,'sun');cushion(H,R,6.93,8.46,.94,.96,.8,.14,'coral');
  timber(H,R,.4,10.5,2.1,.94,.39,.11,'sun');
  box(H,R,.75,10.69,.85,.49,.53,.52,'coral',.5);bentTube(H,R,[[.85,10.7,1.03],[.86,10.7,1.25],[1.42,10.7,1.25],[1.44,10.7,1.03]],1.5,'blue');
  vessel(H,R,2.06,10.82,.52,3,14,'teal',false);box(H,R,1.72,10.52,.54,.39,.54,.06,'paper',1);
  for(let j=5.93;j<6.9;j+=.16)H.line(R,[H.p(.16,j,.93),H.p(.16,j,1.16)],'blue',1.1);
  timber(H,R,10.6,10.71,1.25,.49,.02,.08,'sun');
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration;
  const lift=ease(0,3.6,t)*(1-ease(7.2,9.6,t))+ease(10.8,12.2,t)*(1-ease(13.2,16,t));
  const across=ease(1.8,4.1,t)*(1-ease(12.8,15.9,t));
  const p=H.p(mix(4.71,5.62,across),mix(5.75,6.04,across),1.42+lift*.27);
  record(H,R,p[0],p[1],17,8+2*lift);
  const inSleeve=1-ease(0,2.8,t)+ease(14.2,16,t);
  shape(H,R,H.tile(4.1,5.26,1.2,1.03,1.45),'paper',1,.75);
  shape(H,R,H.tile(4.1,6.0,.31,.29,1.46),'coral',.65,.4);
  H.line(R,[H.p(5.29,5.32,1.46),H.p(5.33,5.74,1.46+.03*(1-inSleeve)),H.p(5.29,6.21,1.46)],'blue',.65);
  const matPause=ease(7.2,9.6,t)*(1-ease(10.8,12.2,t));
  const keeperJ=6.63,keeperI=mix(4.71,5.62,across)+keeperJ-mix(5.75,6.04,across)+matPause*.72;
  const q={...base,head:12},at=H.p(keeperI,keeperJ,.02),scale=2.05;
  for(const [s,sign]of[['l',-1],['r',1]]){
    const dx=(p[0]+sign*16-at[0])/scale-sign*5.2,dy=(p[1]-at[1])/scale+32.5,a=4.368,b=4.2,r=Math.min(a+b-.001,Math.hypot(dx,dy)),e=Math.acos(Math.max(-1,Math.min(1,(r*r-a*a-b*b)/(2*a*b))));
    q['a'+s]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q['e'+s]=e*180/Math.PI;
  }
  for(const [key,value]of Object.entries({al:24,ar:28,el:32,er:38}))q[key]=mix(q[key],value,matPause);
  FIGURES.clips.amsterdamRecordsKeeper.keys=[[0,q],[1,q]];
  actor(H,R,keeperI,keeperJ,0,'amsterdamRecordsKeeper',{shirt:['teal',.65],hairStyle:'curly',glasses:true},.02,scale);
  const outside=[[-500,-500],[500,-500],[500,650],[-500,650],[-500,-500]],cutout=H.tile(4.1,5.26,1.2,1.03,1.45).reverse();
  H.clip([...outside,...cutout,cutout[0],outside[0]],()=>record(H,R,p[0],p[1],17,8+2*lift));
  const lean=ease(3.6,5.6,t)*(1-ease(10,12,t)),l={...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,head:12+lean*8,lean:-lean*5,al:35,ar:45,el:55,er:55};
  FIGURES.clips.amsterdamRecordsListener.keys=[[0,l],[1,l]];
  actor(H,R,7.36,8.86,0,'amsterdamRecordsListener',{shirt:['coral',.7],hairStyle:'pony'},.32,1.55);
  const m=H.p(8.21,.38,4.17),turn=Math.cos(t/duration*Math.PI*2);
  H.line(R,[m,[m[0],m[1]+22]],'blue',.6);oval(H,R,m[0],m[1]+25,Math.max(1.5,5*Math.abs(turn)),5,'coral',.7);H.dot(m[0],m[1]+25,1,'sun');
});
room.loopSeconds=duration;
room.stillTime=10.3;
export default room;
