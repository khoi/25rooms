import { world, shape, oval, stroke, cycle, mix, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame, slattedSeat, floorLight, drape, vessel } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, cornice, recessedFrame, panelFront, taskLight, caster } from '../joinery.js';
import { foldedCloth, shallowTray, boundBook, satchel, coiledLine, handTool } from '../furnishings.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, ink, seated = false, nod = 0) {
  const [x, y] = H.p(i, j), h = seated ? 54 : 75, hip = y - (seated ? 13 : 32), sy = y - h + 23;
  H.tint([[x - 14, y + 1], [x + 22, y + 3], [x + 30, y + 9], [x - 3, y + 8]], 'blue', .16);
  for (const s of [-1, 1]) {
    stroke(H, R, [[x + s * 5, hip], [x + s * 10 + (seated ? 7 : 0), y - 14], [x + s * 10 + (seated ? 9 : 0), y - 2]], 'blue', 7);
    oval(H, R, x + s * 10 + (seated ? 12 : 3), y, 7, 3, 'blue', .8);
  }
  shape(H, R, [[x - 10, sy], [x + 10, sy], [x + 12, hip + 3], [x - 11, hip + 3]], ink, .68, .8);
  const hy = y - h + 10 + nod;
  oval(H, R, x + 1, hy, 9, 10, 'coral', .36);
  shape(H, R, [[x - 8, hy], [x - 10, hy - 7], [x - 3, hy - 12], [x + 7, hy - 10], [x + 10, hy - 4], [x + 4, hy - 5]], 'blue', .82, .6);
  H.dot(x + 5, hy + 1, 1, 'blue'); stroke(H, R, [[x + 5, hy + 5], [x + 2, hy + 6], [x, hy + 5]], 'blue', .6);
  return (left, right) => {
    for (const [s, hand] of [[-1, left], [1, right]]) {
      const target = hand || [x + s * 14, hip - 2];
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], 'blue', 6.5);
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], ink, 4.8);
      oval(H, R, ...target, 3.2, 3, 'coral', .38);
    }
  };
}

function curtain(H,R,start,width,sway=0) {
  const P=(u,z)=>wallPt(H,'nw',start+u,z,-.29);
  const poly=[P(0,3.7),P(width,3.7),P(width+.08+sway,.72),P(width*.7,.65),P(width*.4,.74),P(-.04,.67)];
  shape(H,R,poly,'coral',.62,.8);
  for(let n=1;n<6;n++) stroke(H,R,[P(width*n/6,3.65),P(width*n/6+.07,2.35),P(width*n/6+sway*.7,.75)],n%2?'blue':'paper',n%2?.7:1.2,.55);
  H.line(R,[P(0,.78),P(width+sway,.79)],'sun',1);
}
function projector(H,R,turn=0) {
  timber(H,R,7.16,7.25,2.81,1.49,.3,.12,'teal');
  for(const i of [7.23,9.69])bentTube(H,R,[[i,7.3,.33],[i,8.54,1.08]],2,'teal');
  metal(H,R,7.35,7.37,1.44,.88,.44,.45,'blue');
  for(const z of [.56,.76]){
    shape(H,R,H.faceI(7.45,8.28,1.23,z-.065,z+.065),'paper',.68,.55);
    for(let n=0;n<5;n++)H.line(R,[H.p(7.57+n*.105,8.31,z-.04),H.p(7.57+n*.105,8.31,z+.04)],'blue',.75);
    H.dot(...H.p(8.49,8.32,z),1.5,z>.6?'sun':'coral');
  }
  shallowTray(H,R,8.98,7.42,.81,.99,.46,'teal');
  coiledLine(H,R,9.4,7.9,.64,10,'sun');
  benchFrame(H,R,7.02,7.11,3.14,1.77,1.2,'sun');
  for(const i of [7.12,9.92]){metal(H,R,i,8.84,.17,.07,.91,.3,'teal');H.dot(...H.p(i+.08,8.94,1.06),1.2,'sun');}
  timber(H,R,7.14,8.86,2.89,.07,.97,.16,'teal');

  timber(H,R,7.05,7.14,3.1,.12,1.23,.32,'blue');
  for(const i of [7.56,8.72]) for(const j of [7.4,8.1]) metal(H,R,i,j,.23,.2,1.23,.1,'coral');
  metal(H,R,7.37,7.29,1.76,1.1,1.33,.52,'paper');
  shape(H,R,H.tile(7.54,7.42,1.39,.73,1.861),'paper',.94,.5);
  H.line(R,[H.p(7.56,7.94,1.88),H.p(8.9,7.94,1.88)],'blue',.7);
  for(let n=0;n<6;n++)H.line(R,[H.p(8.41+n*.07,7.42,1.88),H.p(8.41+n*.07,7.78,1.88)],'teal',1);
  for(const i of [7.69,7.93])H.dot(...H.p(i,7.62,1.9),2.2,'teal');
  H.dot(...H.p(8.1,7.62,1.9),1.4,'sun');
  for(const x of [7.52,8.96])H.dot(...H.p(x,8.41,1.81),1.2,'blue');
  const a=H.p(7.39,7.83,1.57),b=H.p(6.95,7.83,1.57);
  shape(H,R,[[a[0]-6,a[1]-10],[a[0]+6,a[1]+10],[b[0]+6,b[1]+10],[b[0]-6,b[1]-10]],'blue',.8,.8);
  oval(H,R,...b,8,11,'teal',.65); oval(H,R,b[0]-1,b[1],5.5,8,'blue',.82);
  stroke(H,R,[[b[0]-3,b[1]-6],[b[0]-4,b[1]],[b[0]-3,b[1]+4]],'paper',1.7,.8);
  for(let n=0;n<12;n++) {const angle=n*Math.PI/6+turn;H.line(R,[[b[0]+Math.cos(angle)*7,b[1]+Math.sin(angle)*10],[b[0]+Math.cos(angle)*10,b[1]+Math.sin(angle)*12]],n===1?'sun':'blue',1.1);}
  for(const angle of [-.7,.2]) H.dot(b[0]+Math.cos(angle)*12,b[1]+Math.sin(angle)*14,2.1,'coral',.85);
  for(let n=0;n<8;n++) H.line(R,[H.p(8.16+n*.09,8.4,1.44),H.p(8.16+n*.09,8.4,1.73)],'blue',1.25);
  shallowTray(H,R,9.32,7.45,.53,.98,1.21,'teal'); metal(H,R,9.42,7.54,.31,.55,1.4,.06,'blue');
  for(let n=0;n<3;n++) H.dot(...H.p(9.58,7.68+n*.12,1.48),1.3,'paper');
  const cap=H.p(7.22,8.5,1.25);oval(H,R,...cap,8,6,'blue',.75);
  stroke(H,R,[b,[b[0]-13,b[1]+7],[cap[0]-10,cap[1]-7],cap],'coral',1.3);
  for(const d of [0,5]) {oval(H,R,cap[0]-8+d,cap[1]-6,2.3,1.6,'sun',.85);}
  bentTube(H,R,[[9.05,7.76,1.51],[9.72,7.85,1.22],[9.7,8.35,.28],[8.84,8.49,.12],[8.2,7.88,.16]],1.7,'blue');
  foldedCloth(H,R,9.21,8.3,.72,.44,1.23,'paper','teal');
  return b;
}
const room=world('cape-town-cinema-evening','The screen keeps a little light',{floor:'blue',tone:.32,wall:'blue',wallTone:.47,height:3.8,head:70},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.01,'blue',.65);
  for(const side of ['ne','nw']) {cornice(H,R,side,0,12,3.7,'paper');H.line(R,[wallPt(H,side,0,.13,-.12),wallPt(H,side,12,.13,-.12)],'sun',2);}
  recessedFrame(H,R,'nw',1.68,7.34,1.02,2.43,'paper',P=>shape(H,R,[P(.14,.14),P(7.2,.14),P(7.2,2.29),P(.14,2.29)],'paper',1,.5));
  metal(H,R,.13,1.45,.43,7.81,3.5,.24,'paper');
  for(const j of [1.7,5.15,8.9]) bentTube(H,R,[[.15,j,3.72],[.53,j,3.72],[.53,j,3.51]],2.5,'teal');
  curtain(H,R,.8,1.15); curtain(H,R,9.01,1.3);
  stroke(H,R,[H.p(.6,10.52,3.55),H.p(.6,10.5,1.0),H.p(.7,10.4,.84)],'sun',1.2);
  oval(H,R,...H.p(.72,10.4,.87),2.5,5,'coral',.8);
  timber(H,R,.1,1.48,.11,7.55,.88,.12,'teal');
  for(const j of [2.1,5.0,8.52]){const p=H.p(.42,j,.92);oval(H,R,...p,2.4,2.4,'sun',.85);}
  for(const i of [3.96,5.07,6.18,7.29]){
    shape(H,R,wallRect(H,'ne',i,i+.86,2.18,3.38,-.23),'blue',.79,.8);
    shape(H,R,wallRect(H,'ne',i+.09,i+.77,2.28,3.28,-.25),'teal',.24,.5);
    H.line(R,[wallPt(H,'ne',i+.2,2.35,-.26),wallPt(H,'ne',i+.61,3.22,-.26)],'paper',.8,{tone:.42});
  }
  bentTube(H,R,[[.19,10.9,.2],[.19,10.9,3.36],[.19,.19,3.36],[7.85,.19,3.36],[7.85,.19,.61]],1.6,'teal');
  metal(H,R,7.71,.17,.33,.15,.43,.42,'paper');
  for(const z of [.57,.72])H.dot(...H.p(7.88,.35,z),1.2,'blue');
  windowBay(H,R,'ne',1.0,2.55,1.0,2.09,{night:true,divisions:2});
  for(let n=0;n<8;n++) timber(H,R,1.1+n*.28,.26,.22,.12,1.16,1.74,'teal');
  H.line(R,[H.p(1.2,.44,1.37),H.p(3.25,.44,2.7)],'sun',2.4);
  cabinetFrame(H,R,8.42,.23,3.13,1.44,.1,3.36,2,'teal',(i,j,w,d,z,h,col)=>{
    for(const level of [.67,1.43,2.2])timber(H,R,i,j,w,d,z+level,.085,'sun');
    if(!col) {
      for(let n=0;n<7;n++) {metal(H,R,i+.1+n*.15,j+.12,.12,.73,z+2.31,.47,n%3?'paper':'coral');H.line(R,[H.p(i+.16+n*.15,j+.87,z+2.36),H.p(i+.16+n*.15,j+.87,z+2.65)],'blue',.7);}
      metal(H,R,i+.1,j+.13,1.08,.74,z+1.52,.54,'blue'); for(const pz of [z+1.68,z+1.91]) oval(H,R,...H.p(i+.65,j+.89,pz),8,8,'teal',.56);
      foldedCloth(H,R,i+.08,j+.1,w-.15,.91,z+.77,'paper','teal');
      panelFront(H,R,i,j+d,w,z,.62,1,'teal');
    } else {
      metal(H,R,i+.06,j+.1,w-.12,.94,z+.77,.62,'blue');
      for(const x of [i+.16,i+w-.2]) H.line(R,[H.p(x,j+1.08,z+.9),H.p(x,j+1.08,z+1.17)],'sun',2);
      H.line(R,[H.p(i+.45,j+.65,z+1.42),H.p(i+.8,j+.65,z+1.42)],'paper',2);
      shape(H,R,H.faceI(i+.2,j+.14,.78,z+1.03,z+1.6),'paper',.9,.6);
      cushion(H,R,i+.12,j+.13,w-.22,.99,z+.02,.22,'coral'); satchel(H,R,i+.64,j+.58,z+2.05,'sun',.43);
      coiledLine(H,R,i+.7,j+.55,z+2.34,10,'blue');
    }
  });
  for(const [i,j,w] of [[2.7,3.25,1.65],[4.95,3.85,1.65],[2.3,6.06,1.65],[4.63,6.56,1.65]]) {
    slattedSeat(H,R,i,j,w,.02,'coral',.9);
    cushion(H,R,i+.09,j+.015,w-.19,.14,.94,.55,'coral');
    H.line(R,[H.p(i+.18,j+.18,1.22),H.p(i+w-.18,j+.18,1.22)],'sun',.7);
    for(const x of [i+.14,i+w-.14])bentTube(H,R,[[x,j+.7,.61],[x,j+.7,1.12],[x,j+.22,1.12]],2.3,'teal');
    cushion(H,R,i+.1,j+.17,w-.2,.6,.75,.13,'paper');
    for(let n=0;n<4;n++) H.line(R,[H.p(i+.28+n*.31,j+.2,.9),H.p(i+.28+n*.31,j+.72,.9)],'coral',1.2);
  }
  shape(H,R,H.tile(2.68,6.2,.48,.56,.9),'teal',.65,.55); for(let n=0;n<4;n++) H.line(R,[H.p(2.71+n*.11,6.21,.91),H.p(2.74+n*.11,6.72,.91)],'paper',.8);
  cushion(H,R,5.19,3.99,.92,.64,.9,.2,'sun'); foldedCloth(H,R,5.1,6.77,.97,.46,.94,'teal','paper');
  bentTube(H,R,[[2.37,6.6,.8],[2.2,6.62,.55],[2.2,6.65,.04]],1.8,'sun');
  oval(H,R,...H.p(2.24,6.63,.8),4,2,'coral',.7);
  satchel(H,R,4.41,6.32,.03,'blue',.52); satchel(H,R,3.71,7.48,.02,'coral',.5);
  benchFrame(H,R,4.22,.26,3.28,1.21,1.14,'sun');
  boundBook(H,R,4.48,.4,1.14,.84,1.15,'teal');shape(H,R,H.tile(4.65,.5,.76,.58,1.33),'paper',1,.5);
  H.line(R,[H.p(4.73,.53,1.35),H.p(5.23,.99,1.35)],'coral',1.1); H.line(R,[H.p(5.19,.53,1.35),H.p(4.77,.99,1.35)],'teal',1.1);
  foldedCloth(H,R,5.87,.42,.51,.54,1.17,'paper','sun'); handTool(H,R,6.54,.82,1.2,'brush','teal',.2);
  taskLight(H,R,7.15,.56,1.2,'coral',-.33);
  metal(H,R,6.35,.15,.86,.1,2.55,.63,'teal');for(let n=0;n<7;n++) H.line(R,[H.p(6.44+n*.09,.27,2.63),H.p(6.44+n*.09,.27,3.08)],'blue',1.1);
  for(const [i,j]of[[1.4,9.45],[3.59,9.45],[1.4,10.72],[3.59,10.72]])caster(H,R,i,j,.09);
  metal(H,R,1.21,9.25,2.62,1.61,.17,.42,'blue');
  shape(H,R,H.tile(1.35,9.39,2.34,1.33,.61),'coral',.52,.65);
  for(const i of [1.54,2.71]){
    shape(H,R,H.tile(i,9.6,.78,.87,.64),'blue',.84,.6);
    const p=H.p(i+.39,10.03,.67);stroke(H,R,[[p[0]-8,p[1]+3],[p[0]-9,p[1]-11],[p[0],p[1]-18],[p[0]+9,p[1]-11],[p[0]+8,p[1]+3]],'paper',2.5);
    for(const dx of [-8,8])oval(H,R,p[0]+dx,p[1],4,6,'teal',.7);
  }
  shape(H,R,H.faceI(1.28,9.31,2.47,.62,1.52),'blue',.8,.75);
  shape(H,R,H.faceI(1.42,9.35,2.2,.75,1.39),'teal',.3,.6);
  for(const x of [1.5,3.38])metal(H,R,x,10.91,.19,.08,.31,.2,'sun');
  H.line(R,[H.p(2.14,10.96,.43),H.p(2.79,10.96,.43)],'paper',2.2);
  foldedCloth(H,R,1.53,10.65,1.91,.34,.65,'paper','coral');
  shallowTray(H,R,9.47,3.24,1.36,.76,.23,'teal');
  benchFrame(H,R,9.24,3.06,1.86,1.18,.65,'teal');
  vessel(H,R,9.68,3.47,.68,6,15,'paper');
  boundBook(H,R,10.05,3.29,.79,.61,.68,'coral');
  satchel(H,R,10.23,4.24,.04,'coral',.45);
  floorLight(H,4.2,5.4,155,.32); metal(H,R,7.0,10.94,3.16,.54,.03,.08,'paper');
},(H,R,time)=>{
  const t=cycle(time,20)*20, turn=.64*ease(4,8,t)*(1-ease(12,18,t));
  const P=(u,v)=>wallPt(H,'nw',2.07+u,1.37+v,-.2);
  shape(H,R,[P(0,0),P(6.56,0),P(6.56,1.76),P(0,1.76)],'paper',1,.4);
  const k=turn/.64;
  for(const [cx,cy,w,h,ink] of [[1.62,.88,2.4,1.22,'teal'],[4.56,.89,1.6,1.05,'coral']]) {
    const a=[P(cx-w/2,cy-h/2),P(cx+w/2,cy-h/2),P(cx+w/2,cy+h/2),P(cx-w/2,cy+h/2)];
    H.opacity(.65+k*.25,()=>{shape(H,R,a,ink,.37,.6);});
  }
  const center=P(3.3,.88);oval(H,R,...center,15,15,'sun',.9);H.line(R,[P(3.3,.15),P(3.3,1.58)],'blue',1+k*.8);
  H.line(R,[P(.3,.88),P(6.2,.88)],'blue',1+k*.8);
  const arms=person(H,R,7.04,8.74,'teal',false,Math.sin(Math.PI*ease(8.2,11.2,t))*2);
  const lens=projector(H,R,turn);
  const contact=ease(.8,3,t)*(1-ease(16.8,18,t));
  const target=[lens[0]+Math.cos(-.7+turn)*9,lens[1]+Math.sin(-.7+turn)*11];
  const rest=H.p(7.3,8.55,1.18);arms(null,target.map((v,n)=>mix(rest[n],v,contact)));
  const nod=Math.sin(Math.PI*ease(9.5,11.5,t))*3;
  person(H,R,3.5,3.77,'sun',true,nod)(H.p(3.8,3.82,.67),null);
  person(H,R,3.15,6.64,'coral',true,Math.sin(Math.PI*ease(15,18,t)))(null,H.p(3.5,6.72,.66));
  H.opacity(.08,()=>shape(H,R,[lens,P(.28,.2),P(6.2,1.6)],'sun',.36,.1));
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
