import { world, shape, oval, stroke, cycle, mix, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, drape, benchFrame, caneChair, vessel, floorLight } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cornice, wallRack, recessedFrame, taskLight, panelFront } from '../joinery.js';
import { foldedCloth, shallowTray, boundBook, satchel, slattedCrate } from '../furnishings.js';

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

function board(H,R,i,j,w,d,z,tiny=false) {
  timber(H,R,i-.09,j-.09,w+.18,d+.18,z,.08,'sun');
  for(let a=0;a<5;a++)for(let b=0;b<4;b++)shape(H,R,H.tile(i+a*w/5,j+b*d/4,w/5-.025,d/4-.025,z+.09),(a+b)%2?'paper':'teal',(a+b)%2?.94:.27,.45);
  H.line(R,[H.p(i,j+d,z+.11),H.p(i+w,j+d,z+.11)],'paper',tiny?.55:1.2);
}
function piece(H,R,i,j,z,ink='coral',special=false) {
  const [x,y]=H.p(i,j,z);
  if(special)shape(H,R,[[x-5,y],[x+5,y],[x+1,y-12],[x-2,y-12]],'teal',.7,.75);
  else {oval(H,R,x,y-1,5.4,2.5,ink,.7);oval(H,R,x,y-5,3.4,4.5,ink,.78);}
  H.line(R,[[x-2,y-8],[x-2,y-3]],'paper',.9);
}
function sofa(H,R) {
  for(const i of [2.58,7.51])for(const j of [1.58,2.98]) timber(H,R,i,j,.19,.18,.03,.29,'blue');
  timber(H,R,2.38,1.42,5.52,1.91,.31,.25,'sun');
  cushion(H,R,2.47,1.48,5.35,.35,.56,1.08,'teal');
  for(const i of [2.43,7.44])cushion(H,R,i,1.57,.39,1.73,.54,.76,'teal');
  for(let n=0;n<3;n++) {cushion(H,R,2.9+n*1.47,1.85,1.39,1.32,.58,.22,'paper');cushion(H,R,2.92+n*1.46,1.8,1.34,.26,.92,.48,'coral');}
  for(let n=0;n<6;n++){
    const p=H.p(2.86+n*.81,1.94,1.24);H.dot(...p,1.8,'sun');
    stroke(H,R,[[p[0]-4,p[1]-2],[p[0],p[1]],[p[0]+4,p[1]-2]],'blue',.65,.6);
  }
  timber(H,R,2.57,3.3,5.08,.06,.34,.16,'teal');
  for(const i of [2.71,7.42])H.line(R,[H.p(i,3.37,.4),H.p(i+.18,3.37,.4)],'sun',1.5);
  cushion(H,R,3.79,1.99,.66,.54,.86,.27,'teal');
  cushion(H,R,6.76,2.03,.6,.53,.88,.23,'sun');
  drape(H,R,2.78,2.02,1.15,1.33,.85,.49,'paper');
  for(const [i,z,ink]of[[2.93,.57,'coral'],[3.33,.43,'teal']]){
    shape(H,R,H.faceI(i,3.37,.32,z,z+.19),ink,.63,.5);
    for(let n=0;n<4;n++)H.line(R,[H.p(i+.03+n*.085,3.39,z-.025),H.p(i+.03+n*.085,3.39,z+.215)],'sun',.75);
  }
}
function table(H,R) {
  timber(H,R,4.32,5.21,3.24,2.09,.24,.09,'teal');
  boundBook(H,R,4.64,5.72,1.35,1.06,.35,'coral');
  boundBook(H,R,4.7,5.76,1.21,.95,.49,'paper');
  shallowTray(H,R,6.36,6.35,.88,1.48,.33,'teal');
  for(let n=0;n<4;n++)piece(H,R,6.68,6.63+n*.22,.53,n%2?'sun':'coral');
  benchFrame(H,R,4.12,5.05,3.63,2.48,.77,'sun');
  for(const i of [4.33,7.41])bentTube(H,R,[[i,5.27,.26],[i,7.23,.66]],1.7,'teal');
  shape(H,R,H.faceI(6.36,7.86,.88,.32,.55),'teal',.5,.7);
  H.line(R,[H.p(6.62,7.89,.45),H.p(6.98,7.89,.45)],'sun',1.8);

  board(H,R,4.37,5.31,2.35,1.97,.8);
  for(const [a,b,ink]of[[.7,.22,'sun'],[1.17,.23,'sun'],[1.62,.23,'sun'],[1.17,1.25,'coral'],[1.66,1.7,'coral'],[.7,.71,'coral']])piece(H,R,4.37+a,5.31+b,.92,ink);
  shallowTray(H,R,6.96,5.23,.6,1.79,.81,'teal');
  for(let n=0;n<3;n++)piece(H,R,7.24,5.59+n*.47,1.0,n%2?'coral':'sun');
  timber(H,R,4.12,7.55,3.63,.06,.49,.17,'coral');
  for(const i of [4.35,7.52]) {H.dot(...H.p(i,7.62,.56),1.3,'sun');H.line(R,[H.p(i-.025,7.64,.56),H.p(i+.025,7.64,.56)],'paper',.6);}
}
const room=world('cape-town-family-game','The piece stays in the hand',{floor:'paper',tone:.83,wall:'paper',wallTone:.73,height:3.62,head:45},(H,R)=>{
  for(let i=0;i<12;i++)for(let j=0;j<12;j++)if(i<1||j<1||i>10||j>10){shape(H,R,H.tile(i,j,.98,.98,.015),'teal',.22,.5);shape(H,R,[H.p(i+.5,j+.18,.02),H.p(i+.82,j+.5,.02),H.p(i+.5,j+.82,.02),H.p(i+.18,j+.5,.02)],'coral',.4,.45);}
  for(const side of ['nw','ne']){cornice(H,R,side,0,12,3.49,'paper');H.line(R,[wallPt(H,side,0,.13,-.12),wallPt(H,side,12,.13,-.12)],'teal',3);}
  shape(H,R,H.tile(1.7,4.73,7.55,4.07,.03),'teal',.1,.6);
  for(let n=0;n<20;n++)H.line(R,[H.p(1.74+n*.37,8.8,.04),H.p(1.74+n*.37,8.97,.04)],'coral',.8);
  windowBay(H,R,'nw',2.3,5.87,1.48,1.62,{night:true,divisions:4,view:P=>{
    shape(H,R,[P(.14,.14),P(5.7,.14),P(5.7,.73),P(4.5,.59),P(3.8,.87),P(2.1,.52),P(.14,.75)],'blue',.7,.5);
    for(let n=0;n<5;n++)H.line(R,[P(.5+n*1.05,.34),P(.5+n*1.05,.46)],'sun',2.2);
  }});
  timber(H,R,.1,2.21,.65,6.01,1.33,.14,'paper');
  for(const j of [2.44,7.88])bentTube(H,R,[[.63,j,1.32],[.17,j,.99]],2,'teal');
  for(const j of [2.61,3.11,3.61]){
    const q=H.p(.49,j,1.49);shape(H,R,[[q[0]-4,q[1]-5],[q[0]+5,q[1]-5],[q[0]+5,q[1]-13],[q[0]-4,q[1]-13]],'paper',1,.6);
    H.line(R,[[q[0]-3,q[1]-11],[q[0]+4,q[1]-6]],'coral',1.3);
  }
  timber(H,R,.14,3.03,1.08,4.71,.12,.13,'teal');
  shape(H,R,H.faceJ(.27,3.14,4.47,.24,1.08),'blue',.61,.7);
  for(const j of [3.03,5.31,7.62])timber(H,R,.14,j,1.07,.12,.24,.92,'teal');
  timber(H,R,.2,3.1,.98,4.56,.66,.08,'sun');
  for(let n=0;n<7;n++){
    shape(H,R,H.faceJ(1.16,3.26+n*.24,.18,.27,.59),['paper','coral','sun'][n%3],.72,.5);
    H.line(R,[H.p(1.18,3.29+n*.24,.45),H.p(1.18,3.39+n*.24,.45)],'paper',.7);
  }
  foldedCloth(H,R,.33,5.66,.69,1.41,.78,'paper','coral');
  for(const j of [5.6,6.63]){const p=H.p(.71,j,.57);oval(H,R,...p,7,5,'coral',.7);H.line(R,[[p[0]-4,p[1]],[p[0]+4,p[1]]],'sun',1);}
  timber(H,R,.11,3.01,1.14,4.77,1.08,.14,'sun');
  boundBook(H,R,.31,5.63,.73,1.27,1.24,'teal');
  shape(H,R,H.tile(.42,5.79,.51,.93,1.42),'paper',1,.5);
  H.line(R,[H.p(.51,5.91,1.44),H.p(.75,6.54,1.44)],'coral',1.5);
  const box=H.p(.72,4.3,1.24);vessel(H,R,.72,4.3,1.24,9,12,'coral',false);oval(H,R,box[0],box[1]-14,9,3,'sun',.8);
  H.line(R,[[box[0]-6,box[1]-14],[box[0]+5,box[1]-14]],'paper',1);
  const clock=wallPt(H,'ne',1.36,2.55,-.19);oval(H,R,...clock,17,18,'sun',.76);oval(H,R,...clock,13,14,'paper',1);
  for(let n=0;n<12;n++){const a=n*Math.PI/6;H.dot(clock[0]+Math.sin(a)*10.5,clock[1]+Math.cos(a)*11.5,n%3?.7:1.2,'blue');}
  H.line(R,[[clock[0],clock[1]-8],clock,[clock[0]+6,clock[1]+3]],'blue',1.2);
  for(const [u,z,w,h,ink]of[[3.18,1.88,1.3,.55,'coral'],[4.75,1.74,1.67,.71,'teal'],[6.8,1.9,.81,.58,'sun']])recessedFrame(H,R,'ne',u,w,z,h,ink,P=>{
    shape(H,R,[P(.13,.13),P(w-.13,.13),P(w-.13,h-.13),P(.13,h-.13)],'paper',1,.4);
    const q=P(w*.48,h*.49);oval(H,R,q[0],q[1]-3,3.8,4.5,'blue',.7);H.line(R,[[q[0]-5,q[1]+7],[q[0]+5,q[1]+7]],ink,6);
  });
  for(const j of [1.9,8.38]) {
    const P=(u,z)=>wallPt(H,'nw',j+u,z,-.38);shape(H,R,[P(0,3.28),P(.55,3.28),P(.6,1.23),P(.2,1.16),P(-.05,1.25)],'coral',.49,.7);
    for(const u of [.13,.32,.46])H.line(R,[P(u,3.22),P(u+.04,1.26)],'paper',1.1,{tone:.6});
  }
  cabinetFrame(H,R,8.42,.22,3.18,1.43,.1,3.28,2,'teal',(i,j,w,d,z,h,col)=>{
    for(const a of [.68,1.42,2.2])timber(H,R,i,j,w,d,z+a,.08,'sun');
    if(!col) {
      for(let n=0;n<6;n++) {timber(H,R,i+.11+n*.18,j+.26,.14,.65,z+1.52,.46+(n%3)*.07,['coral','paper','sun'][n%3]);H.line(R,[H.p(i+.13+n*.18,j+.93,z+1.61),H.p(i+.21+n*.18,j+.93,z+1.61)],'paper',.8);}
      metal(H,R,i+.12,j+.23,1.02,.68,z+.79,.47,'sun');for(let n=0;n<7;n++)H.line(R,[H.p(i+.23+n*.075,j+.93,z+.88),H.p(i+.23+n*.075,j+.93,z+1.14)],'blue',.8);oval(H,R,...H.p(i+.95,j+.94,z+1.0),3,3,'blue',.7);
      slattedCrate(H,R,i+.1,j+.13,w-.17,.96,z+.03,.48,'sun');
      for(const [x,c]of[[.27,'coral'],[.69,'teal']])oval(H,R,...H.p(i+x,j+.4,z+.5),5,4,c,.7);
      const p=H.p(i+.63,j+.63,z+2.38);shape(H,R,[[p[0]-11,p[1]],[p[0]+12,p[1]],[p[0]+12,p[1]-14],[p[0]-11,p[1]-14]],'paper',1,.6);shape(H,R,[[p[0]-10,p[1]-14],[p[0]+1,p[1]-25],[p[0]+13,p[1]-14]],'coral',.65,.5);
    }else{
      foldedCloth(H,R,i+.08,j+.12,w-.16,.97,z+.78,'paper','teal');foldedCloth(H,R,i+.12,j+.12,w-.23,.93,z+.91,'coral','paper');
      panelFront(H,R,i,j+d,w,z+1.46,.71,1,'teal');satchel(H,R,i+.67,j+.65,z+.56,'coral',.58);
      for(const [a,ink]of[[.3,'sun'],[.87,'coral']]){const p=H.p(i+a,j+.58,z+2.43);oval(H,R,p[0],p[1]-6,5,5,ink,.7);shape(H,R,[[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+3,p[1]-5],[p[0]-3,p[1]-5]],ink,.66,.55);if(a<.5)H.line(R,[[p[0]-3,p[1]-4],[p[0]+2,p[1]+1]],'teal',1);}
    }
  });
  wallRack(H,R,'ne',3.1,4.8,2.65,.69,1,'sun',(P,z)=>{
    for(let n=0;n<3;n++) {shape(H,R,[P(.3+n*1.18,z+.08),P(1.22+n*1.18,z+.08),P(1.22+n*1.18,z+.49),P(.3+n*1.18,z+.49)],'paper',.96,.6);const p=P(.75+n*1.18,z+.3);oval(H,R,p[0],p[1]-3,3.2,3.6,'blue',.72);H.line(R,[[p[0]-4,p[1]+5],[p[0]+4,p[1]+5]],'coral',5);}
  });
  sofa(H,R);
  for(const [i,j]of[[2.75,5.49],[8.08,6.9]]){caneChair(H,R,i,j,'coral');H.line(R,[H.p(i+.08,j+.18,1.03),H.p(i+.08,j+.67,1.03)],'paper',1.9);}
  benchFrame(H,R,9.49,4.13,1.52,1.46,.94,'teal');vessel(H,R,10.19,4.56,.97,11,21,'paper');
  for(const j of [4.47,4.97])vessel(H,R,10.72,j,.96,5,7,'coral');
  vessel(H,R,9.94,5.17,.98,10,7,'teal',false);foldedCloth(H,R,10.38,5.17,.39,.3,.98,'paper','sun');
  taskLight(H,R,8.11,3.2,.91,'sun',-.2);timber(H,R,7.89,3.0,.7,.63,.08,.81,'teal');floorLight(H,5.2,6.3,172,.62);
  shallowTray(H,R,5.52,8.42,1.61,1.04,.08,'teal');board(H,R,5.74,8.64,.96,.62,.27,true);timber(H,R,6.45,8.21,1.17,1.07,.3,.07,'teal');
  shape(H,R,H.tile(6.56,8.59,.38,.33,.38),'coral',.6,.5);for(let n=0;n<4;n++)H.line(R,[H.p(6.58+n*.09,8.6,.39),H.p(6.58+n*.09,8.89,.39)],'paper',.7);
  timber(H,R,1.34,9.12,1.61,1.37,.09,.45,'teal');
  cushion(H,R,1.32,9.09,1.65,1.43,.55,.18,'paper');
  for(let n=0;n<6;n++)H.line(R,[H.p(1.44+n*.24,10.51,.57),H.p(1.44+n*.24,10.51,.71)],'coral',1.1);
  boundBook(H,R,1.62,9.36,.97,.67,.75,'sun');
  const watch=H.p(2.54,9.71,.77);H.line(R,[[watch[0]-8,watch[1]-4],[watch[0]+7,watch[1]+4]],'teal',2.7);oval(H,R,...watch,3.5,3.5,'paper',1);H.line(R,[watch,[watch[0],watch[1]-2]],'blue',.7);
  oval(H,R,...H.p(3.52,8.95,.06),9,4,'teal',.6);H.line(R,[H.p(3.3,8.94,.12),H.p(3.73,8.94,.12)],'sun',1.1);
  for(const [i,j]of[[3.65,9.95],[4.2,10.0]]) {const p=H.p(i,j,.02);oval(H,R,...p,10,4,'blue',.64);oval(H,R,p[0]-3,p[1]-2,5,4,'paper',.8);}
  slattedCrate(H,R,9.36,9.1,1.63,1.42,.03,.51,'sun');
  for(const [i,j,w,d,h,ink]of[[9.64,9.28,.43,.51,.22,'coral'],[10.18,9.48,.48,.58,.34,'teal'],[9.66,9.86,.35,.44,.25,'paper']])timber(H,R,i,j,w,d,.32,h,ink);
  shape(H,R,H.tile(8.97,10.09,1.2,1.0,.03),'paper',1,.6);
  const toy=H.p(9.54,10.6,.05);shape(H,R,[[toy[0]-12,toy[1]+5],[toy[0]+9,toy[1]+5],[toy[0]+9,toy[1]-9],[toy[0]-12,toy[1]-9]],'coral',.35,.6);shape(H,R,[[toy[0]-15,toy[1]-9],[toy[0]-2,toy[1]-20],[toy[0]+12,toy[1]-9]],'teal',.47,.5);
  for(const [i,j,ink]of[[8.91,10.18,'coral'],[9.06,10.29,'teal'],[9.2,10.4,'sun']])H.line(R,[H.p(i,j,.06),H.p(i+.46,j-.2,.06)],ink,1.5);
  const p=H.p(7.82,8.56,.08);shape(H,R,[[p[0]-14,p[1]-2],[p[0]-10,p[1]-12],[p[0]+10,p[1]-13],[p[0]+15,p[1]-2],[p[0]+9,p[1]+6],[p[0]-9,p[1]+6]],'coral',.5,.7);oval(H,R,p[0],p[1]-5,10,5,'blue',.45);for(const d of [-5,2,7])oval(H,R,p[0]+d,p[1]-5,2.5,2,'sun',.8);
},(H,R,time)=>{
  const t=cycle(time,22)*22,lift=ease(.9,4.4,t)*(1-ease(17.8,20,t));
  const first=ease(4.4,6.5,t)*(1-ease(13.2,17.8,t)),second=ease(6.5,8.8,t)*(1-ease(13.2,17.8,t));
  const i=4.59+first*.52-second*.24,j=6.91-first*.22-second*.46,z=.92+lift*.37;
  const arms=person(H,R,3.73,6.51,'teal',true);
  const laugh=Math.sin(Math.PI*ease(9,12.6,t));
  const family=person(H,R,6.4,2.33,'coral',true,-laugh*3);
  family(H.p(6.03,2.78,.91),H.p(6.8,2.52,1.07+laugh*.19));
  table(H,R);piece(H,R,i,j,z,'teal',true);arms(null,H.p(i,j,z+.19));
  const P=(u,v)=>wallPt(H,'nw',1.9+u,1.23+v,-.39);
  H.line(R,[P(.12,.06),P(.23+Math.sin(time*Math.PI/11)*.025,.01),P(.45,.06)],'sun',1.2);
});
room.loopSeconds=22;
room.stillTime=4.4;
export default room;
