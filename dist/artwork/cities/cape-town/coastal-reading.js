import { world, shape, oval, stroke, cycle, mix, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, drape, benchFrame, vessel, floorLight } from '../materials.js';
import { boardFloor } from '../structure.js';
import { windowBay, recessedFrame, cornice, taskLight } from '../joinery.js';
import { boundBook, foldedCloth, satchel, shallowTray, coiledLine } from '../furnishings.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, ink, seated = false, nod = 0) {
  const [x, y] = H.p(i, j, .3), h = seated ? 54 : 75, hip = y - (seated ? 13 : 32), sy = y - h + 23;
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

function boat(H,R,x,y,size=1) {
  shape(H,R,[[x-15*size,y],[x+16*size,y],[x+9*size,y+7*size],[x-10*size,y+7*size]],'coral',.68,.6);
  H.line(R,[[x,y],[x,y-24*size]],'sun',1.4);
  shape(H,R,[[x-2*size,y-22*size],[x-2*size,y-2*size],[x-13*size,y-2*size]],'paper',1,.5);
  shape(H,R,[[x+1*size,y-19*size],[x+12*size,y-3*size],[x+1*size,y-3*size]],'teal',.4,.5);
}
function readingCabinet(H,R) {
  const i=.18,j=.5,w=1.18,d=8.83;
  shape(H,R,H.faceJ(i+.12,j,d,.1,3.39),'blue',.57,.6);
  for(const y of [j,j+2.87,j+5.89,j+d-.15])timber(H,R,i,y,w,.15,.13,3.36,'teal');
  timber(H,R,i,j,w,d,.14,.15,'teal');timber(H,R,i-.04,j-.05,w+.08,d+.1,3.36,.16,'teal');
  for(const z of [1.08,1.89,2.62])timber(H,R,i,j,w,d,z,.1,'sun');
  for(let n=0;n<13;n++){
    const y=1.0+n*.165,h=.36+(n%3)*.1;
    shape(H,R,H.faceJ(1.35,y,.13,1.99,1.99+h),['coral','sun','paper'][n%3],.75,.6);
    H.line(R,[H.p(1.37,y+.02,2.1),H.p(1.37,y+.12,2.1)],'paper',.8);
  }
  for(let n=0;n<4;n++) {timber(H,R,.31,4.23+n*.016,.83,.93,1.2+n*.115,.1,n%2?'coral':'paper');}
  boat(H,R,...H.p(.8,1.12,2.82),.68);
  for(let n=0;n<4;n++){shape(H,R,H.faceJ(1.34,1.64+n*.22,.18,2.72,3.25),'teal',.68,.5);}
  for(const [start,count,z]of[[3.65,7,2.0],[6.61,8,2.0],[1.09,7,1.2]])for(let n=0;n<count;n++){
    const y=start+n*.21,h=.37+(n%3)*.09;
    shape(H,R,H.faceJ(1.35,y,.17,z,z+h),['paper','coral','teal','sun'][n%4],.68,.55);
    for(const zz of [z+.08,z+h-.08])H.line(R,[H.p(1.38,y+.03,zz),H.p(1.38,y+.14,zz)],n%3?'paper':'sun',.7);
  }
  for(let n=0;n<3;n++)boundBook(H,R,.39,5.44,.72,.69,2.77+n*.11,n%2?'coral':'paper');
  const shell=(i,j,z,rx)=>{
    const q=H.p(i,j,z);const edge=[];
    for(let n=0;n<=14;n++){const a=Math.PI+n*Math.PI/14;edge.push([q[0]+Math.cos(a)*rx,q[1]+Math.sin(a)*rx*.77]);}
    edge.push([q[0]+3,q[1]+3],[q[0]-3,q[1]+3]);shape(H,R,edge,'paper',1,.7);
    for(let n=0;n<6;n++){const a=Math.PI+.2+n*.55;H.line(R,[[q[0],q[1]+2],[q[0]+Math.cos(a)*rx*.87,q[1]+Math.sin(a)*rx*.67]],'coral',.7);}
  };
  shell(.79,6.81,2.85,9);shell(.79,8.47,2.81,7);
  shallowTray(H,R,.39,7.38,.67,.91,2.76,'teal');
  for(const [j,r]of[[7.57,3],[7.92,4],[8.09,2.5]])oval(H,R,...H.p(.73,j,2.97),r,r*.6,'sun',.65);
  for(const j of [4.2,5.66,7.62]){
    shape(H,R,H.faceJ(1.4,j,.75,.31,.91),'teal',.23,.5);
    H.line(R,[H.p(1.43,j+.19,.66),H.p(1.43,j+.55,.66)],'sun',1.8);
  }
  const p=H.p(.82,4.73,2.98);shape(H,R,[[p[0]-10,p[1]+8],[p[0]+11,p[1]+8],[p[0]+9,p[1]-9],[p[0]+1,p[1]-14],[p[0]-8,p[1]-5]],'coral',.63,.6);
  for(const [dx,h]of[[-4,12],[5,9]]){oval(H,R,p[0]+dx,p[1]-h,5,6,'blue',.77);H.line(R,[[p[0]+dx-3,p[1]-h+2],[p[0]+dx-3,p[1]+4]],'sun',.75);}
  foldedCloth(H,R,.34,6.85,.88,1.76,1.22,'paper','teal');
  for(const y of [.77,3.7,6.67]) {
    shape(H,R,H.faceJ(1.4,y,2.35,.32,.91),'teal',.37,.7);
    H.line(R,[H.p(1.42,y+.87,.67),H.p(1.42,y+1.43,.67)],'blue',2.3);
  }
  const q=H.p(.74,7.65,2.53);stroke(H,R,[[q[0]-7,q[1]],[q[0]-11,q[1]+24],[q[0]+2,q[1]+35],[q[0]+13,q[1]+26],[q[0]+7,q[1]]],'coral',10);
  H.line(R,[[q[0]+2,q[1]],[q[0]+2,q[1]+31]],'paper',1);
  for(const y of [1.9,5.2,8.7])bentTube(H,R,[[1.35,y,1.05],[.89,y,.78]],1.8,'blue');
}
function seat(H,R) {
  timber(H,R,3.1,.48,7.57,2.22,.1,.5,'teal');
  shape(H,R,H.faceI(5.4,2.74,2.63,.19,.55),'blue',.68,.7);
  shallowTray(H,R,5.51,2.69,2.42,.78,.2,'teal');
  foldedCloth(H,R,5.67,2.75,1.02,.56,.39,'paper','coral');
  boundBook(H,R,6.87,2.77,.8,.54,.38,'teal');
  H.line(R,[H.p(6.34,3.5,.37),H.p(6.84,3.5,.37)],'sun',2);

  for(const i of [3.21,5.32,8.44]){
    if(i===5.32)continue;
    const width=1.92;
    shape(H,R,H.faceI(i,2.73,width,.2,.49),'teal',.29,.65);
    H.line(R,[H.p(i+width*.41,2.75,.36),H.p(i+width*.65,2.75,.36)],'sun',2);
  }
  timber(H,R,3.02,.39,7.75,2.43,.6,.13,'sun');
  for(const i of [3.14,5.23,8.17,10.43]){
    shape(H,R,[H.p(i,2.7,.61),H.p(i+.2,2.7,.61),H.p(i+.17,2.9,.12),H.p(i+.03,2.9,.12)],'sun',.65,.65);
    H.dot(...H.p(i+.1,2.91,.2),1.1,'blue');
  }
  for(let n=0;n<4;n++)cushion(H,R,3.16+n*1.87,.66,1.76,1.98,.75,.19,'paper');
  drape(H,R,3.45,1.07,1.28,1.77,.96,.55,'coral');
  for(const i of [3.21,10.37])cushion(H,R,i,.7,.3,1.75,.94,.44,'teal');
  const P=(i,j,z)=>H.p(i,j,z);
  shape(H,R,[P(6.23,2.1,.99),P(7.28,2.1,.99),P(7.28,2.7,1.25),P(6.23,2.7,1.25)],'sun',.64,.7);
  for(const i of [6.28,7.23])bentTube(H,R,[[i,2.15,.96],[i,2.68,1.22],[i,2.72,.97]],1.6,'teal');
  shape(H,R,[P(6.26,2.15,1.03),P(6.76,2.12,1.03),P(6.76,2.62,1.28),P(6.26,2.65,1.28)],'paper',1,.6);
  shape(H,R,[P(6.76,2.12,1.03),P(7.24,2.17,1.03),P(7.24,2.67,1.28),P(6.76,2.62,1.28)],'paper',1,.6);
  for(let n=0;n<4;n++)H.line(R,[P(6.36,2.22+n*.085,1.06+n*.043),P(6.64,2.22+n*.085,1.06+n*.043)],'blue',.55,{tone:.35});
  shape(H,R,[P(6.88,2.47,1.23),P(7.03,2.48,1.23),P(7.02,2.87,1.04),P(6.91,2.89,1.04)],'coral',.5,.5);
  for(let n=0;n<4;n++)H.line(R,[P(6.9,2.79+n*.025,1.08-n*.012),P(7.0,2.8+n*.025,1.08-n*.012)],'paper',.65);
}
function shutter(H,R,angle) {
  const P=(u,z,d=0)=>H.p(8.91-u*Math.cos(angle)+d*Math.sin(angle),.45+u*Math.sin(angle)+d*Math.cos(angle),z);
  const leaf=[P(0,1.34),P(2.45,1.34),P(2.45,3.58),P(0,3.58)];shape(H,R,leaf,'teal',.67,1);
  shape(H,R,[P(.17,1.5,.012),P(2.29,1.5,.012),P(2.29,3.41,.012),P(.17,3.41,.012)],'teal',.36,.7);
  for(let n=0;n<8;n++)H.line(R,[P(.23+n*.265,1.55,.02),P(.23+n*.265,3.34,.02)],'blue',.8,{tone:.6});
  for(const z of [1.71,3.16]) {H.line(R,[P(.12,z,.03),P(2.32,z,.03)],'sun',3.5);H.line(R,[P(.12,z+.025,.04),P(2.32,z+.025,.04)],'paper',.8);}
  for(const z of [1.68,3.2]) {
    shape(H,R,[P(-.12,z-.12,.05),P(.32,z-.12,.05),P(.32,z+.12,.05),P(-.12,z+.12,.05)],z<2?'sun':'blue',.8,.7);
    for(const u of [-.03,.23])H.dot(...P(u,z,.06),1.4,'paper');
    H.line(R,[P(0,z-.16,.07),P(0,z+.16,.07)],'blue',3.2);
  }
  H.dot(...H.p(8.97,.32,1.95),1.5,'blue');
  H.line(R,[P(2.27,1.46,.08),P(2.27,1.76,.08)],'sun',3.1);
  H.line(R,[P(.17,2.37,.03),P(1.28,2.78,.03)],'paper',2.6,{tone:.46});
  for(const [u,z]of[[2.23,1.43],[.23,3.4],[1.19,1.47]])H.line(R,[P(u,z,.06),P(u+.12,z+.02,.06)],'sun',1.5);
  bentTube(H,R,[[8.93,.35,1.27],[7.7,.63,1.27],[8.91-1.4*Math.cos(angle),.45+1.4*Math.sin(angle),1.34]],1.4,'blue');
  return P(2.28,1.56,.08);
}
const room=world('cape-town-coastal-reading','A lamp behind the shutter',{floor:'paper',tone:.8,wall:'blue',wallTone:.63,height:3.9,head:80},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.014,'sun',1.0);
  for(const side of ['ne','nw'])cornice(H,R,side,0,12,3.79,'teal');
  windowBay(H,R,'ne',3.01,7.79,1.29,2.34,{night:true,divisions:4,view:P=>{
    shape(H,R,[P(.14,.14),P(7.64,.14),P(7.64,1.25),P(6.8,1.43),P(5.36,1.16),P(4.74,1.32),P(3.2,.92),P(2.55,1.3),P(.14,1.14)],'teal',.42,.5);
    for(let n=0;n<10;n++)H.line(R,[P(.38+n*.69,.32+(n%3)*.1),P(.65+n*.69,.32+(n%3)*.1)],n%3?'paper':'sun',.9,{tone:.62});
    const q=P(2.45,.53);boat(H,R,...q,.42);
    H.line(R,[P(5.78,.68),P(6.13,.68)],'sun',1.3);
  }});
  timber(H,R,2.92,.11,7.98,.62,1.19,.16,'paper');
  metal(H,R,2.99,.62,7.79,.1,1.21,.17,'teal');
  timber(H,R,2.9,.12,.19,.56,1.21,2.45,'paper');
  timber(H,R,10.82,.12,.2,.56,1.21,2.45,'paper');
  timber(H,R,2.88,.09,8.16,.55,3.58,.16,'teal');
  for(const i of [3.24,5.07,6.91,8.72,10.54])metal(H,R,i,.38,.19,.12,3.42,.17,'sun');
  const casement=(u,z)=>wallPt(H,'ne',3.27+u,z,-.25);
  H.line(R,[casement(.01,1.56),casement(.13,1.56),casement(.37,1.73)],'sun',2);
  for(const z of [1.69,3.17]){H.line(R,[casement(1.47,z),casement(1.65,z)],'blue',2);H.dot(...casement(1.55,z),1.1,'sun');}
  bentTube(H,R,[[3.31,.43,1.29],[4.29,.82,1.3],[4.86,.41,1.3]],1.7,'blue');
  for(const [i,rx]of[[3.89,5],[4.57,4],[5.39,6]]){const q=H.p(i,.43,1.4);oval(H,R,...q,rx,rx*.51,'paper',.92);H.line(R,[[q[0]-rx*.5,q[1]],[q[0]+rx*.4,q[1]-1]],'teal',.7);}
  const curtain=(u,z)=>wallPt(H,'ne',11.05+u,z,-.4);
  shape(H,R,[curtain(0,3.49),curtain(.47,3.49),curtain(.44,.72),curtain(.19,.63),curtain(-.03,.78),curtain(.1,2.02)],'paper',.91,.7);
  for(const u of [.08,.23,.38])H.line(R,[curtain(u,3.44),curtain(u+.015,.83)],'coral',.9,{tone:.68});
  H.line(R,[curtain(0,1.86),curtain(.42,1.83)],'teal',2.3);
  readingCabinet(H,R);seat(H,R);
  taskLight(H,R,9.83,2.18,.95,'sun',-.65);floorLight(H,7.2,2.6,130,.7);
  recessedFrame(H,R,'nw',9.75,1.47,1.71,1.25,'sun',P=>{
    shape(H,R,[P(.12,.12),P(1.34,.12),P(1.34,1.12),P(.12,1.12)],'paper',.93,.6);
    for(let n=0;n<6;n++)stroke(H,R,[P(.73,.24),P(.2+n*.2,.68),P(.5+n*.065,.94)],'teal',.8,.7);
  });
  timber(H,R,.13,9.79,.46,1.52,1.45,.11,'sun');
  const q=H.p(.58,10.5,1.58);oval(H,R,...q,8,5,'blue',.6);
  shape(H,R,H.tile(2.2,5.08,6.67,4.25,.04),'teal',.2,.7);
  for(let n=0;n<16;n++){H.line(R,[H.p(2.25+n*.4,5.13,.05),H.p(2.25+n*.4,9.25,.05)],'paper',1.1,{tone:.55});H.line(R,[H.p(2.25+n*.4,9.31,.05),H.p(2.25+n*.4,9.48,.05)],'sun',.9);}
  timber(H,R,3.29,5.52,2.17,1.45,.16,.09,'teal');
  boundBook(H,R,3.54,5.67,1.16,.91,.27,'coral');
  boundBook(H,R,3.61,5.73,1.1,.84,.4,'paper');
  benchFrame(H,R,3.14,5.37,2.48,1.78,.57,'sun');
  shallowTray(H,R,3.45,5.61,1.76,1.27,.58,'teal');vessel(H,R,4.85,6.09,.8,7,12,'paper');
  const glasses=H.p(3.99,6.23,.8);for(const dx of [-5,5])oval(H,R,glasses[0]+dx,glasses[1],4,2.8,'paper',.55);H.line(R,[[glasses[0]-1,glasses[1]],[glasses[0]+1,glasses[1]]],'blue',.7);
  cushion(H,R,6.4,5.58,1.75,1.38,.12,.35,'paper');cushion(H,R,6.4,5.58,1.75,1.38,.47,.15,'teal');
  foldedCloth(H,R,6.78,5.81,.64,.85,.66,'coral','paper');coiledLine(H,R,7.86,6.93,.05,13,'sun');
  for(const i of [7.4,7.56])H.line(R,[H.p(i,6.77,.14),H.p(i+.57,7.49,.16)],'teal',1.3);
  const basket=H.p(4.33,9.57,.05);
  shape(H,R,[[basket[0]-26,basket[1]-23],[basket[0]+25,basket[1]-23],[basket[0]+20,basket[1]+2],[basket[0]-20,basket[1]+2]],'sun',.58,.8);
  oval(H,R,basket[0],basket[1]-23,26,9,'blue',.64);
  for(let n=0;n<7;n++)stroke(H,R,[[basket[0]-21,basket[1]-17+n*2.6],[basket[0],basket[1]-14+n*2.6],[basket[0]+21,basket[1]-17+n*2.6]],'coral',.9,.64);
  for(let n=-3;n<=3;n++)H.line(R,[[basket[0]+n*6,basket[1]-20],[basket[0]+n*5,basket[1]]],'paper',.8,{tone:.7});
  for(const [dx,dy,ink]of[[-12,-23,'coral'],[7,-23,'paper'],[-1,-30,'teal']]){oval(H,R,basket[0]+dx,basket[1]+dy,9,7,ink,.8);for(let n=0;n<3;n++)stroke(H,R,[[basket[0]+dx-6,basket[1]+dy-3+n*2],[basket[0]+dx,basket[1]+dy+1+n*2],[basket[0]+dx+6,basket[1]+dy-3+n*2]],'sun',.8);}
  H.line(R,[[basket[0]-6,basket[1]-19],[basket[0]+15,basket[1]-46]],'teal',1.8);H.line(R,[[basket[0]+1,basket[1]-18],[basket[0]-11,basket[1]-43]],'blue',1.6);
  drape(H,R,4.27,9.7,.82,.44,.56,.43,'coral');
  boundBook(H,R,3.08,9.48,.94,1.16,.03,'teal');
  shape(H,R,H.tile(3.2,9.62,.7,.87,.21),'paper',1,.5);
  for(let n=0;n<4;n++)H.line(R,[H.p(3.3,9.73+n*.14,.23),H.p(3.79,9.73+n*.14,.23)],'coral',.6);
  shape(H,R,H.tile(9.4,7.85,1.81,2.04,.025),'blue',.44,.7);
  for(let n=0;n<11;n++)H.line(R,[H.p(9.5+n*.145,7.93,.035),H.p(9.5+n*.145,9.8,.035)],'sun',1,{tone:.45});
  vessel(H,R,10.73,7.64,.03,13,31,'teal');
  for(const d of [-.13,.12])bentTube(H,R,[[10.73+d,7.64,.25],[10.75+d,7.62,1.85],[10.59+d,7.62,2.03],[10.46+d,7.62,1.91]],2.6,d<0?'sun':'blue');
  satchel(H,R,10.78,9.51,.04,'coral',.62);foldedCloth(H,R,9.56,8.37,.77,.62,.04,'paper','coral');
  timber(H,R,10.89,10.25,.28,.57,.04,.16,'sun');metal(H,R,3.0,10.93,4.4,.43,.02,.07,'teal');
},(H,R,time)=>{
  const t=cycle(time,24)*24,close=ease(4.8,9.6,t)*(1-ease(14.4,20.5,t)),angle=1.08-close*.53;
  const edge=shutter(H,R,angle),rest=H.p(6.91,2.57,1.2),contact=ease(1.8,4.8,t)*(1-ease(20.5,22,t));
  const arms=person(H,R,7.27,2.42,'coral',true,-2*Math.sin(Math.PI*ease(9.8,13.6,t)));
  arms(H.p(6.57,2.57,1.21),edge.map((v,n)=>mix(rest[n],v,contact)));
  const p=H.p(10.87,.61,2.12);stroke(H,R,[[p[0],p[1]-10],[p[0]-6,p[1]],[p[0]+Math.sin(time*Math.PI/12)*2,p[1]+16]],'coral',1.3);
});
room.loopSeconds=24;
room.stillTime=12;
export default room;
