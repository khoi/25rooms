import { world, shape, oval, stroke, box, actor, ell, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, benchFrame, bentTube, slattedSeat, floorLight, drape } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame, cornice } from '../joinery.js';

const rest = { ...FIGURES.clips.idle.keys[0][1] };
const stance = { ...rest, ll: -12, lr: 16, kl: 7, kr: -6, ar: 40, al: 52, er: 80, el: 60, head: 14 };
FIGURES.clips['cape-town-sport-player'] = { dur: 16, keys: [[0, { ...stance, ar: 15, al: 27, er: 25, el: 15 }], [.2, { ...stance, ar: 105, al: 103, er: 50, el: 35 }], [.4, { ...stance, lean: -10, ar: 56, al: 52, er: 15, el: 12 }], [.6, { ...stance, ar: 105, al: 103, er: 50, el: 35 }], [.875, { ...stance, ar: 15, al: 27, er: 25, el: 15 }], [1, { ...stance, ar: 15, al: 27, er: 25, el: 15 }]] };
FIGURES.clips['cape-town-sport-coach'] = { dur: 16, keys: [[0, { ...rest, head: 23, ar: 25, er: 45 }], [.42, { ...rest, head: 23, ar: 25, er: 45 }], [.55, { ...rest, head: 28, ar: 48, er: -15, lean: -4 }], [.68, { ...rest, head: 23, ar: 25, er: 45 }], [1, { ...rest, head: 23, ar: 25, er: 45 }]] };
const smooth = (a, b, t) => { const q = Math.max(0, Math.min(1, (t-a)/(b-a))); return q*q*(3-2*q); };
function bat(H, R, x, y, angle, size = 1, repaired = false) {
  const P = (u, v) => [x + (u * Math.cos(angle) - v * Math.sin(angle)) * size, y + (u * Math.sin(angle) + v * Math.cos(angle)) * size];
  shape(H, R, [P(-2,-5), P(2,-5), P(2,10), P(5,15), P(5,40), P(3,43), P(-3,43), P(-5,40), P(-5,15), P(-2,10)], 'sun', .65, .8);
  shape(H, R, [P(-2,-5), P(2,-5), P(2,10), P(-2,10)], 'blue', .8, .6);
  for(let v=-3;v<9;v+=2.5) H.line(R,[P(-2,v),P(2,v+1)],repaired&&v>2?'coral':'paper',1);
  H.line(R,[P(-2,17),P(-2.7,37)],'coral',.65);
  H.line(R,[P(3,17),P(3,40)],'paper',1);
}
function helmet(H,R,x,y,size=1) {
  shape(H,R,[[x-10*size,y],[x-12*size,y-12*size],[x-5*size,y-21*size],[x+6*size,y-20*size],[x+13*size,y-11*size],[x+12*size,y]],'teal',.7,.8);
  shape(H,R,[[x-9*size,y-6*size],[x+12*size,y-6*size],[x+15*size,y+6*size],[x-5*size,y+6*size]],'blue',.62,.7);
  for(let k=0;k<3;k++)H.line(R,[[x-7*size,y+(-3+k*4)*size],[x+13*size,y+(-3+k*4)*size]],'paper',.9);
  for(let k=0;k<3;k++)H.line(R,[[x+(-4+k*7)*size,y-6*size],[x+(-3+k*7)*size,y+7*size]],'sun',.8);
}
const room=world('cape-town-langa-sport','The bat rests level',{floor:'paper',tone:.46,wall:'teal',wallTone:.2,height:3.7,head:20},(H,R)=>{
  cornice(H,R,'ne',0,12,3.7,'paper');
  windowBay(H,R,'nw',2.4,7.8,2.25,1.1,{divisions:4,view:P=>shape(H,R,[P(.1,.1),P(7.7,.1),P(7.7,.3),P(5.5,.3),P(4.4,.43),P(0,.22)],'teal',.25)});
  for(const side of ['nw','ne'])for(let u=.2;u<11.9;u+=.6){const p=(v,z)=>wallPt(H,side,u+v,z,-.1);shape(H,R,[p(0,.1),p(.48,.1),p(.48,.44),p(0,.44)],'paper',1,.4);shape(H,R,[p(.24,.13),p(.43,.27),p(.24,.41),p(.05,.27)],u%1.2<.6?'coral':'teal',.65,.4);}
  cabinetFrame(H,R,4.3,.18,7.25,1.25,.1,3.2,4,'teal',(x,y,w,d,z,h,n)=>{
    timber(H,R,x,y,w,d,z+.75,.09,'teal');
    if(n===0){for(let k=0;k<3;k++){const p=H.p(x+.25+k*.43,y+.7,z+.8);bat(H,R,p[0],p[1]-40,0,.8,k===1);metal(H,R,x+.17+k*.43,y+.4,.18,.5,z+.73,.1,'blue');}}
    if(n===1){for(const zz of [z+1.48,z+2.18])timber(H,R,x,y,w,d,zz,.08,'teal');for(let k=0;k<3;k++){const p=H.p(x+.4+k*.44,y+.62,z+.86);oval(H,R,...p,8,8,k===1?'coral':'sun',.7);H.line(R,[[p[0]-5,p[1]-5],[p[0]-1,p[1]+1],[p[0]+5,p[1]+5]],'paper',1.2);}helmet(H,R,...H.p(x+.65,y+.65,z+1.65),.7);}
    if(n===2){for(let k=0;k<3;k++)bentTube(H,R,[[x+.3+k*.36,y+.55,z+.18],[x+.33+k*.36,y+.6,z+2.55],[x+.51+k*.36,y+.64,z+2.65]],3,k===1?'sun':'coral');const p=H.p(x+.88,y+.72,z+1.27);oval(H,R,...p,13,8,'sun',.7);H.line(R,[[p[0]-8,p[1]],[p[0]+8,p[1]]],'blue',.8);}
    if(n===3){for(const zz of [z+.45,z+1.2,z+1.9])timber(H,R,x,y,w,d,zz,.08,'teal');for(let k=0;k<2;k++)cushion(H,R,x+.2+k*.68,y+.15,.55,.7,z+.52,.15,k?'sun':'coral');const p=H.p(x+.42,y+.8,z+.2);oval(H,R,...p,4,4,'coral');for(let k=0;k<4;k++)box(H,R,x+.12+k*.32,y+.2,.23,.6,z+1.29,.35,['paper','sun','coral','teal'][k],.6);}
  });
  recessedFrame(H,R,'ne',.8,2.65,1.3,1.9,'sun',P=>{shape(H,R,[P(.15,.15),P(2.5,.15),P(2.5,1.75),P(.15,1.75)],'paper',1);for(let n=0;n<4;n++){const q=P(.48+n*.55,.66);oval(H,R,q[0],q[1]-10,4,4,'blue',.8);H.line(R,[[q[0],q[1]-5],[q[0],q[1]+10]],n%2?'coral':'teal',5);H.line(R,[[q[0]-5,q[1]],[q[0]+5,q[1]]],'blue',1.2);}});
  const rackP=(j,z,d=.3)=>wallPt(H,'nw',j,z,-d);
  H.line(R,[rackP(4.85,2.02),rackP(10.4,2.02)],'blue',3.2);
  for(const j of[4.95,7.6,10.25]){H.line(R,[rackP(j,2.02),rackP(j,1.82,.08)],'sun',2.2);H.dot(...rackP(j,1.82,.08),1.5,'blue');}
  for(let n=0;n<4;n++){
    const j=5.3+n*1.23, P=(u,z)=>rackP(j+u,z,.36);
    stroke(H,R,[P(.1,2.03),P(.23,2.14),P(.31,2.02)],'blue',1.1);
    shape(H,R,[P(-.28,1.74),P(-.13,1.94),P(.08,1.97),P(.21,1.84),P(.34,1.97),P(.57,1.94),P(.76,1.71),P(.55,1.56),P(.47,1.7),P(.46,1.08),P(-.08,1.08),P(-.07,1.71)],['paper','coral','sun','teal'][n],.8,.7);
    for(const z of[1.19,1.28])H.line(R,[P(-.04,z),P(.41,z)],n%2?'paper':'teal',1.5);
    H.line(R,[P(.1,1.92),P(.2,1.83),P(.31,1.93)],'blue',.8);
  }
  for(const j of[5.1,7.3,9.5]){
    timber(H,R,.22,j,1.35,1.85,.15,.12,'teal');
    timber(H,R,.22,j,1.35,.12,.28,.65,'teal');timber(H,R,.22,j+1.73,1.35,.12,.28,.65,'teal');
    timber(H,R,.22,j,1.35,1.85,.93,.1,'sun');
    for(let k=0;k<2;k++){
      const p=H.p(.96,j+.46+k*.77,.31);
      shape(H,R,[[p[0]-11,p[1]+3],[p[0]+11,p[1]+3],[p[0]+12,p[1]-3],[p[0]+2,p[1]-8],[p[0]-8,p[1]-7]],k?'paper':'teal',.8,.7);
      for(let m=0;m<3;m++)H.line(R,[[p[0]-4+m*3,p[1]-5],[p[0]-1+m*3,p[1]-2]],'coral',1);
    }
    const top=H.tile(.35,j+.18,1.1,1.42,1.04);shape(H,R,top,'blue',.12,.4);
    for(let k=0;k<7;k++)H.line(R,[H.p(.4,j+.26+k*.18,1.055),H.p(1.36,j+.26+k*.18,1.055)],'paper',.8);
  }
  slattedSeat(H,R,.6,4,3.25,.05,'sun',.85);
  for(let k=0;k<2;k++)cushion(H,R,1+k*1.35,4.2,.9,.6,.78,.16,k?'coral':'paper');
  helmet(H,R,...H.p(1.25,4.55,1),.8);
  const pad=H.p(2.65,4.5,.85);shape(H,R,[[pad[0]-8,pad[1]],[pad[0]+8,pad[1]],[pad[0]+7,pad[1]-31],[pad[0]-6,pad[1]-33]],'paper',1);for(let k=0;k<4;k++)H.line(R,[[pad[0]-5+k*3,pad[1]-28],[pad[0]-5+k*3,pad[1]-2]],'sun',1);H.line(R,[[pad[0]-8,pad[1]-10],[pad[0]+8,pad[1]-10]],'coral',2);
  for(const x of[4.45,6.3,8.05,9.85]){
    shape(H,R,H.faceI(x,.23,1.55,2.92,3.28),'paper',.2,.6);
    for(let k=0;k<5;k++)H.line(R,[H.p(x+.15+k*.25,.25,2.98),H.p(x+.15+k*.25,.25,3.2)],'teal',.8);
  }
  const mesh=H.faceI(6.23,1.49,1.5,.99,1.63);H.outline(R,mesh,'teal',.8);
  H.clip(mesh,()=>{for(let k=0;k<9;k++){H.line(R,[H.p(6.24+k*.2,1.5,.98),H.p(6.8+k*.2,1.5,1.65)],'paper',.6);H.line(R,[H.p(6.24+k*.2,1.5,1.65),H.p(6.8+k*.2,1.5,.98)],'paper',.6);}});
  const glove=H.p(6.82,.91,2.51);shape(H,R,[[glove[0]-9,glove[1]],[glove[0]-11,glove[1]-8],[glove[0]-8,glove[1]-14],[glove[0]-4,glove[1]-11],[glove[0]-4,glove[1]-20],[glove[0],glove[1]-22],[glove[0]+3,glove[1]-18],[glove[0]+8,glove[1]-16],[glove[0]+10,glove[1]-7],[glove[0]+7,glove[1]]],'sun',.65,.7);oval(H,R,glove[0],glove[1]-7,6,5,'paper',.9);for(let k=0;k<3;k++)H.line(R,[[glove[0]-2+k*3,glove[1]-8],[glove[0]-2+k*3,glove[1]-16]],'coral',.65);
  for(const j of[2.18,2.62]){const p=H.p(10.65,j,.15);shape(H,R,[[p[0]-9,p[1]],[p[0]+9,p[1]],[p[0]+9,p[1]-5],[p[0]+2,p[1]-8],[p[0]-6,p[1]-7]],'paper',1,.7);for(let k=0;k<3;k++)H.line(R,[[p[0]-4+k*3,p[1]-6],[p[0]-3+k*3,p[1]-2]],'coral',.65);}
  stroke(H,R,[H.p(10.65,2.18,.38),H.p(10.5,2.36,.4),H.p(10.7,2.41,.42),H.p(10.65,2.62,.38)],'blue',.7);
  floorLight(H,6,6.1,150,.38);
  shape(H,R,H.tile(3.4,4.6,5.1,4.6,.025),'sun',.12,.7);
  for(const j of [5.2,8.65])H.line(R,[H.p(3.6,j,.035),H.p(8.25,j,.035)],'paper',2.5);
  for(const [i,j]of[[5.14,6.32],[5.8,6.55]]){shape(H,R,H.tile(i,j,.26,.58,.04),'teal',.3,.5);H.line(R,[H.p(i,j+.5,.05),H.p(i+.26,j+.5,.05)],'coral',1.5);}
  cushion(H,R,7.05,6.3,1.1,1,.045,.15,'teal');
  metal(H,R,7.54,6.74,.13,.13,.2,.67,'blue');
  oval(H,R,...H.p(7.61,6.81,.91),7,7,'coral',.85);
  const ball=H.p(7.61,6.81,.91);H.line(R,[[ball[0]-4,ball[1]-5],[ball[0],ball[1]],[ball[0]+4,ball[1]+5]],'paper',1.1);
  stroke(H,R,[H.p(7.61,6.81,.86),H.p(8,7.2,.04),H.p(8.5,7.2,.04),H.p(8.15,6.75,.04),H.p(7.5,6.8,.04)],'blue',.8);
  benchFrame(H,R,9.15,6.3,2.15,1.25,.65,'coral');
  box(H,R,9.2,6.4,1.3,.6,.68,.24,'teal',.45);
  for(let k=0;k<3;k++){const p=H.p(9.5+k*.35,6.75,.93);oval(H,R,p[0],p[1],4,2,'paper');H.line(R,[[p[0]-3,p[1]],[p[0]-2,p[1]-12],[p[0]+2,p[1]-12],[p[0]+3,p[1]]],'blue',.7);}
  cushion(H,R,10.2,6.65,.7,.7,.7,.12,'paper');
  benchFrame(H,R,2.1,9.5,2.9,1.3,.55,'sun');
  timber(H,R,2.2,9.58,2.68,1.12,.2,.08,'sun');
  for(let k=0;k<3;k++)box(H,R,2.4+k*.73,9.75,.6,.68,.29,.18,k===1?'coral':'teal',.65);
  shape(H,R,H.faceI(2.1,9.52,2.9,.58,1.3),'teal',.32,.8);
  for(let k=0;k<4;k++){const p=H.p(2.48+k*.63,9.55,1.02);H.outline(R,ell(...p,7,7),'sun',2);H.line(R,[[p[0],p[1]+7],[p[0]+4,p[1]+15]],'coral',1.5);}
  const seam=H.p(2.75,10.1,.72);oval(H,R,...seam,13,10,'coral',.72);stroke(H,R,[[seam[0]-7,seam[1]-8],[seam[0]-2,seam[1]],[seam[0]+7,seam[1]+8]],'paper',1.4);for(let k=-5;k<7;k+=3)H.line(R,[[seam[0]+k-3,seam[1]+k+1],[seam[0]+k+2,seam[1]+k-2]],'blue',.75);
  shape(H,R,H.tile(3.4,9.7,1.25,.75,.59),'teal',.4);for(const i of[3.5,4.45])bentTube(H,R,[[i,9.85,.6],[i,9.85,.9],[i,10.22,.9],[i,10.22,.6]],1.4,'paper');
  for(let k=0;k<3;k++)H.line(R,[H.p(4.4+k*.13,10.2,.6),H.p(4.4+k*.13,10.42,.7)],'blue',2);
  for(const x of[6.15,8.25])for(const y of[10.25,11.35]){metal(H,R,x,y,.1,.1,.2,1.02,'teal');const p=H.p(x,y,.15);oval(H,R,...p,4,4,'blue',.9);H.dot(...p,1.2,'sun');}
  metal(H,R,6.12,10.22,2.26,1.26,.4,.08,'teal');
  for(const z of[.7,1.2])bentTube(H,R,[[6.15,11.4,z],[8.33,11.4,z],[8.33,10.26,z],[6.15,10.26,z],[6.15,11.4,z]],1.3,'teal');
  for(let k=0;k<6;k++)H.line(R,[H.p(6.27+k*.38,11.4,.47),H.p(6.27+k*.38,11.4,1.18)],'blue',.6);
  for(const [x,y,ink]of[[6.6,10.6,'sun'],[7.4,10.5,'coral'],[7.95,10.94,'paper']]){
    const p=H.p(x,y,.71);oval(H,R,...p,11,10,ink,.8);stroke(H,R,[[p[0]-9,p[1]-3],[p[0],p[1]+2],[p[0]+9,p[1]-1]],'blue',.8);H.line(R,[[p[0]-3,p[1]-9],[p[0]+2,p[1]+9]],'paper',1);
  }
  drape(H,R,6.22,10.15,.58,.5,1.22,.53,'coral');
  bentTube(H,R,[[8.3,10.3,1.1],[8.55,10.05,1.62],[7.95,9.92,1.62]],2,'blue');
  const net=[H.p(.8,1,2),H.p(2.4,1,2),H.p(2.4,1,1),H.p(.8,1,1)];shape(H,R,net,'paper',.2,.5);H.clip(net,()=>{for(let k=0;k<15;k++){const a=H.p(.8+k*.12,1,1);H.line(R,[a,[a[0]+22,a[1]-34]],'blue',.5);H.line(R,[a,[a[0]-22,a[1]-34]],'blue',.5);}});H.line(R,[H.p(1.4,1,1.6),H.p(1.8,1,1.5)],'coral',2.2);
},(H,R,t)=>{
  const u=((t%16)+16)%16;
  const guard=smooth(0,3.2,u)*(1-smooth(9.6,14,u)),swing=smooth(3.2,6.4,u)*(1-smooth(6.4,9.6,u));
  actor(H,R,5.58,6.72,t,'cape-town-sport-player',{shirt:['paper',1],pants:['teal',.72],hairStyle:'curly',prop:(A,B,p)=>{const angle=-.3-guard*2.2+swing*1.8;bat(A,B,p.nearHand[0],p.nearHand[1],angle,.83,true);for(const d of[-5,5]){shape(A,B,[[p.hips[0]+d-4,p.hips[1]+8],[p.hips[0]+d+4,p.hips[1]+8],[p.hips[0]+d+3,p.hips[1]+23],[p.hips[0]+d-3,p.hips[1]+23]],'paper',1,.65);A.line(B,[[p.hips[0]+d-4,p.hips[1]+14],[p.hips[0]+d+4,p.hips[1]+14]],d>0?'coral':'teal',1.5);}}},0,1.65);
  actor(H,R,8.15,9,t,'cape-town-sport-coach',{face:'sw',shirt:['coral',.75],hairStyle:'cap',glasses:true},0,1.6);
  const a=H.p(3.65,.2,3.45), f=Math.sin(u*Math.PI/8)*2;shape(H,R,[a,[a[0]+30,a[1]+12],[a[0]+21+f,a[1]+33]],'coral',.55,.7);H.line(R,[a,[a[0]+21+f,a[1]+33]],'paper',1.1);
});
room.loopSeconds=16;
room.stillTime=3.2;
export default room;
