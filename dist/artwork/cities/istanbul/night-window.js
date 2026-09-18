import { world, shape, oval, stroke, box } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, cushion, drape, vessel, pendant, floorLight } from '../materials.js';

import { cornice, recessedFrame, floorShadow } from '../joinery.js';

const smooth = (a, b, t) => { const f = Math.max(0, Math.min(1, (t - a) / (b - a))); return f * f * (3 - 2 * f); };
const rest = { x: 0, y: 0, drop: 0, lean: 0, head: 10, al: -10, ar: 12, el: -6, er: 6, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
function person(H, R, name, root, targets, opts, seated = false) {
  const scale = 1.65, pose = { ...rest, head:opts.head ?? 10, y:opts.y ?? 0, drop:.47*Number(seated), ll:-5+89*Number(seated), lr:5+75*Number(seated), kl:-84*Number(seated), kr:-80*Number(seated) };
  const stride=opts.stride || 0;
  pose.ll+=stride;pose.lr-=stride;pose.kl+=Math.max(0,-stride)*.7;pose.kr+=Math.max(0,stride)*.7;
  for (const [side, target] of Object.entries(targets)) {
    const dx = (target[0] - root[0]) / scale - (side === 'l' ? -5.2 : 5.2), dy = (target[1] - root[1]) / scale + 32.5 - pose.drop * 19;
    const a = 4.368, b = 4.2, d = Math.max(.3, Math.min(a + b - .01, Math.hypot(dx, dy))), bend = Math.acos((a * a + b * b - d * d) / (2 * a * b));
    pose['a' + side] = (Math.atan2(dx, dy) - Math.acos((a * a + d * d - b * b) / (2 * a * d))) * 180 / Math.PI;
    pose['e' + side] = 180 - bend * 180 / Math.PI;
  }
  FIGURES.clips[name] = { dur: 1, keys: [[0, pose], [1, pose]] };
  FIGURES.draw(H, R, { who: 'adult', x: root[0], y: root[1], ground: root, scale, face: 'se', clip: name, phase: 0, opts });
}
function sash(H,R,open){
  const P=(u,z)=>H.p(8.75+u,.35+u*open*.18,z);
  H.tint([P(0,1.86),P(2.48,1.86+open*.18),P(2.48,3.64+open*.18),P(0,3.64)],'teal',.08);
  for(const z of [1.86,3.64]){H.line(R,[P(0,z),P(2.48,z+open*.18)],'blue',3.6);H.line(R,[P(.02,z+.028),P(2.45,z+.028+open*.18)],'paper',1.1);}
  for(const u of [0,2.48])H.line(R,[P(u,1.86+open*.18*u/2.48),P(u,3.64+open*.18*u/2.48)],'paper',2.8);
  H.line(R,[P(.3,2.06),P(.66,3.3)],'paper',1.3);
  const catchPoint=P(2.25,2.04+open*.18);
  H.line(R,[[catchPoint[0]-4,catchPoint[1]],[catchPoint[0]+4,catchPoint[1]]],'sun',2.6);
  stroke(H,R,[H.p(10.75,.21,1.86),H.p(10.75,.48+open*.19,1.75),P(2.05,1.86+open*.15)],'blue',1.3);
  return catchPoint;
}
function speaker(H,R,i,j,z,w=.93){
  box(H,R,i,j,w,.8,z,1.1,'sun',.58);
  surface(H,R,H.faceI(i+.08,j+.82,w-.16,z+.1,z+.97),'paper',.65,.6);
  for(let n=0;n<8;n++)H.line(R,[H.p(i+.13+n*(w-.26)/7,j+.84,z+.14),H.p(i+.13+n*(w-.26)/7,j+.84,z+.92)],'blue',.47);
  for(let n=0;n<7;n++)H.line(R,[H.p(i+.12,j+.85,z+.18+n*.11),H.p(i+w-.1,j+.85,z+.18+n*.11)],'sun',.45);
  surface(H,R,H.faceI(i+.13,j+.86,.28,z+.23,z+.49),'teal',.6,.5);
  for(let n=0;n<4;n++)H.line(R,[H.p(i+.14+n*.07,j+.87,z+.22),H.p(i+.14+n*.07,j+.87,z+.5)],'paper',.5);
}
const room=world('istanbul-night-window','A room on the opposite shore',{wall:'blue',wallTone:.58,height:4.12,floor:'sun',tone:.2,pattern:'boards',head:45},(H,R)=>{
  for(const side of ['nw','ne'])cornice(H,R,side,.1,11.9,4.1,'paper');
  for(let i=0;i<12;i++)for(const j of [0,11.2]){surface(H,R,H.tile(i+.05,j+.06,.89,.68,.035),'teal',.25,.45);surface(H,R,H.tile(i+.28,j+.23,.39,.31,.04),'coral',.35,.45);}
  recessedFrame(H,R,'ne',2,9.5,1.7,2.14,'paper',Q=>{
    shape(H,R,[Q(.1,.1),Q(9.4,.1),Q(9.4,2.02),Q(.1,2.02)],'blue',.93);
    shape(H,R,[Q(.1,.14),Q(9.4,.14),Q(9.4,.73),Q(.1,.73)],'teal',.35);
    for(let n=0;n<13;n++){
      const x=.25+n*.7,h=.85+(n%4)*.15;
      shape(H,R,[Q(x,.69),Q(x+.53,.69),Q(x+.53,h),Q(x,h)],'blue',.82,.35);
      for(let a=0;a<2;a++)H.line(R,[Q(x+.14+a*.19,.76),Q(x+.14+a*.19,.87)],'sun',.7);
    }
    for(let n=0;n<17;n++)H.line(R,[Q(.25+n*.5,.25+n%3*.1),Q(.5+n*.5,.25+n%3*.1)],'paper',.7,{tone:.45});
    for(const x of [2.3,4.55,6.75])H.line(R,[Q(x,.1),Q(x,2.04)],'paper',3);
    H.line(R,[Q(.15,1.03),Q(6.7,1.03)],'teal',2);
  });
  timber(H,R,1.91,.05,9.68,.65,1.62,.16,'paper');
  for(const i of [2.23,6.75,10.98])bentTube(H,R,[[i,.07,1.61],[i,.6,1.38],[i,.6,1.61]],1.7,'teal');
  for(const i of [1.65,11.6])for(let n=0;n<4;n++){
    const P=(x,z)=>H.p(i+n*.11+x,.4,z);
    surface(H,R,[P(0,1.38),P(.15,1.41),P(.15,3.96),P(0,3.96)],'paper',n%2?.7:1,.45);
  }
  metal(H,R,1.47,.25,10.34,.16,3.96,.09,'teal');
  const mobile=H.p(3.1,.31,3.98);
  H.line(R,[[mobile[0],mobile[1]],[mobile[0],mobile[1]+18]],'blue',.65);
  H.line(R,[[mobile[0]-17,mobile[1]+17],[mobile[0]+17,mobile[1]+17]],'sun',1);
  for(const x of [-15,9]){H.line(R,[[mobile[0]+x,mobile[1]+17],[mobile[0]+x,mobile[1]+29]],'blue',.6);shape(H,R,[[mobile[0]+x-5,mobile[1]+31],[mobile[0]+x,mobile[1]+25],[mobile[0]+x+5,mobile[1]+31]],x<0?'coral':'teal',.7,.5);}
  const P=(j,z)=>H.p(.88,j,z);
  surface(H,R,H.faceJ(.14,.43,7.3,.12,3.56),'blue',.75,.85);
  for(const j of [.42,2.32,4.48,7.73])timber(H,R,.09,j,1.04,.15,.1,3.49,'sun');
  for(const z of [.23,1.06,1.91,2.76,3.54])timber(H,R,.08,.4,1.07,7.45,z,.12,'sun');
  for(let n=0;n<12;n++){
    const j=.65+n*.125;
    surface(H,R,H.faceJ(1.03,j,.09,.38,.94+(n%3)*.06),['teal','paper','coral'][n%3],.68,.55);
  }
  for(let n=0;n<8;n++){
    const j=2.53+n*.19;
    surface(H,R,H.faceJ(1.03,j,.15,1.18,1.78-n%2*.1),n%3?'paper':'coral',.7,.5);
    H.line(R,[P(j+.02,1.3),P(j+.13,1.3)],'sun',.6);
  }
  for(let n=0;n<4;n++)box(H,R,.35,5.0,.62,1.11,2.07+n*.12,.09,['teal','paper','coral','sun'][n],.56);
  const caseP=H.p(.7,5.1,.4);
  shape(H,R,[[caseP[0]-15,caseP[1]],[caseP[0]+13,caseP[1]],[caseP[0]+16,caseP[1]-23],[caseP[0]+7,caseP[1]-38],[caseP[0]+5,caseP[1]-55],[caseP[0]-7,caseP[1]-55],[caseP[0]-8,caseP[1]-36],[caseP[0]-16,caseP[1]-23]],'blue',.75);
  H.line(R,[[caseP[0]-11,caseP[1]-3],[caseP[0]-12,caseP[1]-22],[caseP[0]-4,caseP[1]-36]],'sun',1);
  for(const j of [1.5,3.7,6.65]){
    const Q=(u,z)=>H.p(.83,j+u,2.92+z);
    surface(H,R,[Q(0,0),Q(.85,0),Q(.85,.47),Q(0,.47)],'sun',.72,.6);
    surface(H,R,[Q(.1,.08),Q(.75,.08),Q(.75,.4),Q(.1,.4)],'paper',1,.4);
    oval(H,R,...Q(.4,.27),3.5,4,'blue',.72);
    shape(H,R,[Q(.22,.11),Q(.62,.11),Q(.52,.23),Q(.31,.23)],'teal',.65,.4);
  }
  const ferry=H.p(.7,6.85,1.2);shape(H,R,[[ferry[0]-14,ferry[1]],[ferry[0]+14,ferry[1]],[ferry[0]+9,ferry[1]+5],[ferry[0]-10,ferry[1]+5]],'paper',1,.5);shape(H,R,[[ferry[0]-8,ferry[1]],[ferry[0]+9,ferry[1]],[ferry[0]+6,ferry[1]-6],[ferry[0]-6,ferry[1]-6]],'teal',.6,.5);H.line(R,[[ferry[0],ferry[1]-6],[ferry[0],ferry[1]-12]],'blue',1);
  timber(H,R,.15,8.05,1.23,2.52,.12,.95,'sun');
  for(const j of [8.18,9.32])surface(H,R,H.faceJ(1.4,j,1.02,.29,.91),'teal',.36,.6);
  timber(H,R,.09,7.95,1.36,2.74,1.1,.15,'sun');
  box(H,R,.28,8.2,.94,1.49,1.26,.16,'blue',.58);
  const disc=H.p(.77,8.88,1.44);oval(H,R,...disc,19,8,'blue',.87);oval(H,R,...disc,6,2.6,'coral',.9);H.dot(...disc,1,'paper');
  bentTube(H,R,[[.35,8.34,1.48],[.55,8.55,1.56],[.92,9.11,1.49]],1.1,'sun');
  speaker(H,R,1.7,.65,.13,1.02);
  speaker(H,R,.24,10,1.25,.9);
  const wire=[H.p(.95,10.75,1.45),H.p(1.54,10.8,.06),H.p(1.48,6,.06),H.p(2.19,1.4,.06)];stroke(H,R,wire,'blue',1);
  surface(H,R,H.tile(2.55,4.95,6.89,4.33,.045),'teal',.21,.7);
  H.outline(R,H.tile(2.74,5.15,6.5,3.9,.05),'coral',.85);
  for(let n=0;n<29;n++)H.line(R,[H.p(2.7+n*.23,9.25,.05),H.p(2.7+n*.23,9.45,.05)],'sun',.65);
  floorShadow(H,2.81,2.35,6.36,2.12,.22);
  for(const i of [3.05,8.76])for(const j of [2.57,4.3])timber(H,R,i,j,.19,.19,.04,.48,'sun');
  timber(H,R,2.85,2.42,6.35,2.11,.43,.26,'sun');
  for(let n=0;n<3;n++)cushion(H,R,3.13+n*1.93,2.85,1.86,1.5,.72,.25,'paper');
  surface(H,R,H.faceI(2.93,2.49,6.2,.78,1.68),'teal',.56,.8);
  for(let n=0;n<3;n++)surface(H,R,H.faceI(3.13+n*1.94,2.53,1.85,.9,1.61),'paper',.88,.65);
  for(const i of [2.85,8.91])cushion(H,R,i,2.47,.31,2.16,.72,.58,'teal');
  drape(H,R,3.32,2.66,1.19,1.82,1.02,.52,'coral');
  surface(H,R,H.faceI(3.51,4.54,.25,.6,.83),'sun',.64,.6);
  for(let n=0;n<4;n++)H.line(R,[H.p(3.53+n*.06,4.55,.59),H.p(3.53+n*.06,4.55,.85)],'paper',.55);
  timber(H,R,4.43,6.33,3.18,1.73,.53,.16,'sun');
  for(const i of [4.56,7.34])for(const j of [6.46,7.78])timber(H,R,i,j,.15,.15,.03,.51,'teal');
  const tray=H.p(6.63,7.02,.72);oval(H,R,...tray,24,9,'teal',.4);
  vessel(H,R,6.45,6.91,.75,7,11,'paper',false);vessel(H,R,6.92,7.18,.75,7,11,'paper',false);
  vessel(H,R,6.63,6.53,.75,8,25,'teal',false);
  const snack=H.p(5.13,7,.73);oval(H,R,...snack,13,5,'coral',.6);oval(H,R,snack[0],snack[1]-6,12,4,'paper',1);H.dot(snack[0],snack[1]-8,2,'teal');
  drape(H,R,5.35,7.37,.57,.43,.72,.13,'paper');
  cushion(H,R,3.1,8.44,1.62,1.25,.06,.25,'teal');
  const pouch=H.p(5.2,9.17,.05);shape(H,R,[[pouch[0]-12,pouch[1]],[pouch[0]+13,pouch[1]],[pouch[0]+11,pouch[1]-17],[pouch[0]-10,pouch[1]-17]],'coral',.55,.65);stroke(H,R,[[pouch[0]-6,pouch[1]-16],[pouch[0]-4,pouch[1]-23],[pouch[0]+6,pouch[1]-22],[pouch[0]+7,pouch[1]-15]],'blue',1);H.line(R,[[pouch[0]-13,pouch[1]-24],[pouch[0]+17,pouch[1]-13]],'sun',1);
  for(const i of [6.2,6.67]){const p=H.p(i,9.47,.055);oval(H,R,...p,9,5,'blue',.65);oval(H,R,p[0]-3,p[1]-2,4,2,'paper',.8);}
  const boat=H.p(8.7,9.05,.055);shape(H,R,[[boat[0]-12,boat[1]-2],[boat[0],boat[1]+5],[boat[0]+13,boat[1]-2],[boat[0]+1,boat[1]-10]],'paper',1,.55);H.line(R,[[boat[0],boat[1]+4],[boat[0]+1,boat[1]-9]],'blue',.6);
  timber(H,R,10.07,5.2,1.32,1.46,.05,.79,'sun');
  pendant(H,R,10.65,5.6,2.82,2.36,'sun',.76);
  bentTube(H,R,[[10.65,5.6,.87],[10.65,5.6,2.75]],2,'blue');
  floorLight(H,7.4,5.1,161,.3);
},(H,R,t)=>{
  const u=((t%24)+24)%24, rise=smooth(0,1.9,u)*(1-smooth(21,22,u)), walk=smooth(1.9,4.8,u)*(1-smooth(18.5,21,u)), open=smooth(4.8,9.6,u)*(1-smooth(14.4,17.5,u));
  const i=8.36+(10.78-8.36)*walk,j=4.13+(.79-4.13)*walk;
  const walking=(u>1.9&&u<4.8?Math.sin(Math.PI*(u-1.9)/2.9):0)+(u>18.5&&u<21?Math.sin(Math.PI*(u-18.5)/2.5):0),stride=Math.sin(u*5)*15*walking;
  const root=H.p(i,j,.45*(1-rise)),catchPoint=sash(H,R,open);
  const idle=[root[0]+10,root[1]-34],take=smooth(3.6,4.8,u)*(1-smooth(17.5,18.5,u));
  const hand=[idle[0]+(catchPoint[0]-idle[0])*take,idle[1]+(catchPoint[1]-idle[1])*take];
  person(H,R,'istanbulWindowResident',root,{r:hand},{shirt:['coral',.6],pants:['blue',.65],hairStyle:'short',head:-16,stride},1-rise);
  person(H,R,'istanbulWindowCompanion',H.p(5.7,4.12,.45),{},{shirt:['teal',.55],pants:['blue',.6],hairStyle:'bun',head:-16-8*smooth(9.6,11,u)*(1-smooth(13.3,14.4,u))},true);
  stroke(H,R,[H.p(11.59,.44,2.4),H.p(11.71,.47,2.26),H.p(11.67+Math.sin(u/24*Math.PI*2)*.04,.45,2.08)],'coral',1.3);
});
room.loopSeconds=24;
room.stillTime=22.5;
export default room;
