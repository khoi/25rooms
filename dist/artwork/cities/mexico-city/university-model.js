import { world, box, shape, stroke, oval, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, floorLight, cushion } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame } from '../joinery.js';

const step = v => { const q = Math.max(0, Math.min(1, v)); return q * q * (3 - 2 * q); };
const rest = { ...FIGURES.clips.idle.keys[0][1] };
const grip = { ...rest, al: 130, ar: -120, el: 20, er: -30, head: 16 };
FIGURES.clips.mexicoModelLift = { dur: 24, keys: [[0, grip], [1, grip]] };
FIGURES.clips.mexicoModelTrace = { dur: 24, keys: [[0, { ...rest, al: -18, ar: 30, head: 10 }], [.38, { ...rest, al: -15, ar: -65, er: -32, head: 17, lean: -6 }], [.62, { ...rest, al: -15, ar: -65, er: -32, head: 17, lean: -6 }], [1, { ...rest, al: -18, ar: 30, head: 10 }]] };
function stone(H, R, i, j, z, size = 1) {
  const P = (x, y, h) => H.p(i + x * size, j + y * size, z + h * size);
  surface(H, R, [P(0, 0, .08), P(.75, .06, 0), P(.95, .65, .08), P(.3, .82, .09), P(-.15, .51, .12)], 'blue', .75);
  surface(H, R, [P(0, 0, .08), P(.22, .03, .37), P(.77, .12, .27), P(.95, .65, .08), P(.58, .65, .32), P(.04, .47, .4), P(-.15, .51, .12)], 'teal', .42);
  for (const [a,b,r] of [[.2,.2,1.4],[.52,.32,1.1],[.34,.5,1.6],[.7,.51,.9]]) oval(H,R,...P(a,b,.31),r*size,r*.55*size,'blue',.86);
  H.line(R,[P(.04,.47,.41),P(.58,.65,.33),P(.95,.65,.09)],'paper',1.2);
}
function treeModel(H,R,i,j,z,ink='teal') {
  const p=H.p(i,j,z); H.line(R,[p,[p[0],p[1]-12]],'blue',1.2);
  oval(H,R,p[0]-3,p[1]-15,5,4,ink,.6); oval(H,R,p[0]+3,p[1]-17,5,5,ink,.45);
  H.line(R,[[p[0],p[1]-6],[p[0]+3,p[1]-15]],'sun',.7);
}
function modelBuilding(H,R,h) {
  const z=1.5+h;
  box(H,R,5.4,5.42,1.78,.24,z,.66,'paper',1);
  box(H,R,5.4,5.42,.24,1.3,z,.66,'paper',1);
  box(H,R,6.94,5.42,.24,1.3,z,.66,'paper',1);
  box(H,R,5.4,6.46,1.78,.26,z,.66,'paper',1);
  surface(H,R,H.tile(5.7,5.75,1.2,.6,z+.025),'sun',.2);
  for(let k=0;k<5;k++) {
    const i=5.55+k*.31;
    surface(H,R,H.faceI(i,6.725,.18,z+.15,z+.48),'blue',.72,.45);
    H.line(R,[H.p(i,6.73,z+.16),H.p(i+.17,6.73,z+.16)],'sun',.75);
  }
  for(let k=0;k<3;k++) surface(H,R,H.faceJ(7.185,5.57+k*.34,.18,z+.14,z+.49),'teal',.45,.45);
  box(H,R,5.32,5.35,1.94,1.43,z+.66,.07,'sun',.32);
  for(let k=0;k<4;k++) H.line(R,[H.p(5.33,6.79,z+.02+k*.06),H.p(5.5,6.79,z+.02+k*.06)],'coral',.6);
  for(const [i,j] of [[5.59,5.56],[7.02,6.57]]) {
    bentTube(H,R,[[i,j,z],[i,j,z-.14]],1.4,'blue');
    if(h>.05) oval(H,R,...H.p(i,j,1.48),2.5,1.2,'blue',.65);
  }
}
function terrain(H,R) {
  surface(H,R,H.tile(3.32,4.76,5.42,2.99,1.15),'teal',.32);
  for(let n=0;n<4;n++) {
    const z=1.17+n*.085;
    const pts=[[3.5+n*.18,5.05+n*.13],[7.95-n*.12,4.95+n*.15],[8.47-n*.17,5.5+n*.12],[8.15-n*.12,7.48-n*.14],[6.2,7.51-n*.11],[5.65,7.12-n*.1],[3.5+n*.2,7.24-n*.15]].map(p=>H.p(...p,z));
    surface(H,R,pts,n%2?'sun':'paper',n%2?.32:1,.7);
  }
  surface(H,R,[H.p(4.1,7.11,1.51),H.p(4.47,7.21,1.51),H.p(5.82,5.88,1.51),H.p(7.88,5.31,1.51),H.p(7.69,5.15,1.51),H.p(5.61,5.7,1.51)],'coral',.27,.55);
  for(let n=0;n<5;n++) box(H,R,4.5+n*.16,6.75-n*.12,.3,.25,1.21+n*.065,.07,'paper',1);
  H.line(R,[H.p(4.86,6.48,1.5),H.p(5.05,6.57,1.5)],'coral',1.5);
  surface(H,R,[H.p(3.78,6.16,1.19),H.p(4.04,6.16,1.19),H.p(4.75,6.16,1.51),H.p(4.48,6.16,1.51)],'sun',.6);
  for(const [i,j,z] of [[3.9,5.53,1.38],[7.8,6.24,1.5],[7.64,7.03,1.48],[4.02,6.6,1.38]]) treeModel(H,R,i,j,z);
  oval(H,R,...H.p(7.84,6.66,1.52),3,1.5,'blue',.7);
  stone(H,R,3.52,7.07,1.52,.52);
}
const room=world('mexico-city-university-model','The ground has a texture',{wall:'paper',wallTone:.72,height:4.2,head:34,floor:'paper',tone:.27,pattern:'tiles',accent:'teal'},(H,R)=>{
  windowBay(H,R,'ne',1.1,9.85,2.32,1.54,{divisions:6,ink:'teal',view:P=>{
    surface(H,R,[P(.13,.13),P(9.7,.13),P(9.7,.48),P(7.8,.67),P(6.5,.36),P(4.4,.64),P(2.4,.39),P(.13,.63)],'teal',.2,.45);
    for(let k=0;k<7;k++) H.line(R,[P(.7+k*1.3,.12),P(.7+k*1.3,.48)],'blue',1.2,{tone:.45});
  }});
  metal(H,R,1.65,.46,8.9,.24,3.91,.11,'paper');
  bentTube(H,R,[[1.86,.48,3.85],[1.86,.48,3.34],[3.05,.48,3.34]],1.8);
  recessedFrame(H,R,'nw',2.3,5.3,2.72,1.09,'sun',P=>{
    surface(H,R,[P(.15,.14),P(5.13,.14),P(5.13,.94),P(.15,.94)],'paper',1);
    for(let n=0;n<3;n++) {
      const x=.35+n*1.65;
      H.line(R,[P(x,.28),P(x+.33,.7),P(x+.67,.7),P(x+.92,.47),P(x+1.2,.47)],'teal',1.2);
      H.line(R,[P(x,.24),P(x+1.3,.24)],'blue',.7);
      H.dot(...P(x+.05,.84),1.5,'coral');
    }
  });
  surface(H,R,H.faceJ(.28,1.35,5.75,.15,2.37),'blue',.53);
  for(const j of [1.35,2.78,4.21,5.64,7.1]) timber(H,R,.18,j,1.25,.12,.1,2.27,'sun');
  for(const z of [.1,1.08,1.71,2.27]) timber(H,R,.18,1.35,1.25,5.87,z,.1,'sun');
  for(let n=0;n<4;n++) {
    const j=1.51+n*1.43;
    for(let q=0;q<3;q++) {
      const jj=j+.1+q*.31;
      surface(H,R,[H.p(.56,jj,1.19),H.p(1.18,jj,1.19),H.p(1.18,jj,1.57),H.p(.6,jj,1.57)],q===1?'coral':'paper',q===1?.38:1,.6);
      H.line(R,[H.p(1.19,jj,1.25),H.p(1.19,jj,1.49)],'teal',1.1);
    }
    if(n===1||n===3) {
      box(H,R,.46,j+.13,.69,1.03,1.81,.13,'paper',1);
      for(let q=0;q<4;q++) H.line(R,[H.p(.48,j+.19+q*.24,1.955),H.p(1.12,j+.19+q*.24,1.955)],'teal',.75);
    } else {
      box(H,R,.48,j+.2,.57,.8,1.81,.28,'coral',.37);
      box(H,R,.61,j+.34,.22,.51,2.1,.07,'paper',1);
    }
  }
  for(let n=0;n<4;n++) {
    const j=1.5+n*1.37;
    surface(H,R,H.faceJ(1.44,j,1.13,.22,1.07),'sun',.35);
    for(let z=.4;z<1;z+=.2) { H.line(R,[H.p(1.448,j+.08,z),H.p(1.448,j+1.04,z)],'blue',.75); H.line(R,[H.p(1.452,j+.42,z+.1),H.p(1.452,j+.72,z+.1)],'blue',1.5); }
  }
  for(let n=0;n<5;n++) {
    const p=H.p(.64,7.58+n*.24,.12); oval(H,R,...p,5,2.1,'paper',1); H.line(R,[p,[p[0]-4,p[1]-36-n%2*6]],'paper',7); H.line(R,[[p[0]-5,p[1]-36-n%2*6],[p[0]-1,p[1]-36-n%2*6]],'blue',1.5);
  }
  timber(H,R,.25,7.3,1,1.7,.04,.14,'teal');
  benchFrame(H,R,3.12,4.55,5.82,3.4,1.13,'sun');
  for(const y of [4.65,7.75]) timber(H,R,3.2,y,5.6,.15,.69,.25,'teal');
  terrain(H,R);
  floorLight(H,5.8,6.1,132,.42);
  benchFrame(H,R,7.48,.63,3.35,1.58,.85,'paper');
  surface(H,R,H.tile(7.68,.79,2.9,1.14,.87),'teal',.25);
  for(let k=0;k<3;k++) {
    box(H,R,7.85+k*.89,.91,.71,.9,.88,.27,'paper',1);
    surface(H,R,H.tile(7.94+k*.89,1.02,.52,.66,1.155),'blue',.26,.45);
    for(let q=0;q<2;q++) box(H,R,8.06+k*.89,1.12+q*.3,.24,.15,1.16,.12,'sun',.44);
  }
  bentTube(H,R,[[10.69,1.85,.93],[10.89,1.91,1.58],[10.75,1.59,1.67]],1.9,'coral');
  benchFrame(H,R,3.1,9.35,3.55,1.38,.58,'teal');
  stone(H,R,3.35,9.57,.6,.9); stone(H,R,4.47,9.7,.6,.55);
  box(H,R,5.3,9.6,.87,.65,.6,.16,'coral',.5);
  for(let n=0;n<4;n++) H.line(R,[H.p(5.39+n*.16,9.6,.78),H.p(5.39+n*.16,10.25,.78)],'paper',.7);
  const disk=H.p(4.0,9.97,1.58); H.line(R,[H.p(4,9.97,.69),disk],'blue',1.7); oval(H,R,...disk,10,4,'sun',.42);
  H.tint(H.tile(4.05,9.95,.65,.45,.98),'blue',.18);
  cushion(H,R,10.05,8.7,1.05,1.2,.15,.15,'coral');
  box(H,R,9.92,9.04,.18,.73,.3,.05,'sun');
},(H,R,t)=>{
  const u=((t%24)+24)%24;
  const lift=step((u-4.8)/4.8)*(1-step((u-14.4)/7.6));
  const height=.43*lift;
  const point=H.p(6.95,5.65,1.58+height);
  Object.assign(grip,rest,{al:140-lift*35,ar:-118-lift*23,el:25,er:-35,head:14});
  actor(H,R,6.62,4.8,t,'mexicoModelLift',{face:'se',shirt:['coral',.69],hairStyle:'pony'},0,1.45);
  terrain(H,R);
  actor(H,R,9.05,7.15,t,'mexicoModelTrace',{face:'sw',shirt:['teal',.75]},0,1.4);
  H.tint(H.tile(5.55+lift*.18,5.55+lift*.18,1.66,1.1,1.51),'blue',.15+.13*lift);
  modelBuilding(H,R,height);
  const shoulder=H.p(6.62,4.8,1.39);
  stroke(H,R,[[shoulder[0]+6,shoulder[1]],[point[0]+12,point[1]+11],point],'coral',5.1);
  oval(H,R,...point,2.3,2.5,'coral',.32);
  if(lift>.1) {
    const a=H.p(9.05,7.15,1.36),b=H.p(8.3,6.9,1.56);
    stroke(H,R,[a,[b[0]+15,b[1]+6],b],'teal',4.9);
    oval(H,R,...b,2.2,2.2,'coral',.3);
  }
  const corner=.055*Math.sin(t*Math.PI*2/24);
  surface(H,R,[H.p(2.13,1.05,.06),H.p(3.3,1.05,.06),H.p(3.3,2.32,.06),H.p(2.13,2.32,.06+corner)],'paper',1,.7);
  for(let k=0;k<4;k++) H.line(R,[H.p(2.29,1.2+k*.23,.075),H.p(3.09,1.2+k*.23,.075)],'teal',.65,{tone:.4});
});
room.loopSeconds=24;
room.stillTime=11.7;
export default room;
