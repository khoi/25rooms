import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, caneChair, benchFrame, vessel, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';

const smooth=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
function player(H,R,i,j,hands,ink,lean=0){
  const [x,y]=H.p(i,j), lx=x+lean;
  oval(H,R,x+5,y+3,16,5,'blue',.22);
  for(const s of [-1,1]){stroke(H,R,[[x+s*6,y-23],[x+s*12,y-14],[x+s*14,y]],'blue',7);oval(H,R,x+s*14+3,y,7,3,'blue',.8);}
  shape(H,R,[[lx-11,y-43],[lx+10,y-43],[x+12,y-21],[x-10,y-21]],ink,.63);
  oval(H,R,lx,y-55,8.6,10,'paper',1);
  shape(H,R,[[lx-8,y-54],[lx-8,y-63],[lx-2,y-66],[lx+6,y-64],[lx+9,y-59],[lx+1,y-60]],'blue',.72);
  for(const xx of [lx+1,lx+6]){oval(H,R,xx,y-55,2,2,'paper',1);H.dot(xx,y-55,.8,'blue');}
  stroke(H,R,[[lx-1,y-55],[lx+8,y-55]],'blue',.6);
  for(const [n,p] of hands.entries()){const q=[lx+(n?9:-9),y-39];stroke(H,R,[q,[(q[0]+p[0])*.5,(q[1]+p[1])*.5+8],p],'blue',7);stroke(H,R,[q,[(q[0]+p[0])*.5,(q[1]+p[1])*.5+8],p],ink,5);oval(H,R,...p,3,2.7,'paper',1);}
}
function piece(H,R,i,j,z,ink,kind=0){
  const [x,y]=H.p(i,j,z);oval(H,R,x,y,5.7,2.1,ink,.75);shape(H,R,[[x-4,y-2],[x-2,y-10],[x+2,y-10],[x+4,y-2]],ink,.72);
  if(kind===1){shape(H,R,[[x-5,y-10],[x-5,y-15],[x-2,y-15],[x-2,y-12],[x+1,y-12],[x+1,y-15],[x+5,y-15],[x+5,y-10]],ink,.85);}else if(kind===2){oval(H,R,x,y-12,4,5,ink,.8);stroke(H,R,[[x-2,y-20],[x+2,y-20]],ink,2);stroke(H,R,[[x,y-23],[x,y-16]],ink,2);}else oval(H,R,x,y-11,3.2,3.2,ink,.8);
}
const room=world('istanbul-waterfront-chess','The rook waits on the edge',{wall:false,floor:'sun',tone:.15,head:5},(H,R)=>{
  boardFloor(H,R,0,1.8,12,10.2,.02,'sun',.55);
  shape(H,R,H.tile(0,0,12,1.8,.025),'teal',.42);
  for(let n=0;n<11;n++)stroke(H,R,[H.p(n+.05,.35,.03),H.p(n+.55,.32,.03),H.p(n+.9,.4,.03)],'paper',1.2,.7);
  const rail=[];for(let n=0;n<=24;n++)rail.push([n*.5,1.72+.12*Math.sin(n/24*Math.PI),1.14]);
  bentTube(H,R,rail,4,'teal');
  for(const i of [.15,2.1,4.1,6.1,8.1,10.1,11.85]){metal(H,R,i,1.62,.11,.16,.02,1.2,'teal');metal(H,R,i-.09,1.53,.29,.31,.02,.07,'blue');}
  for(const z of [.38,.69])stroke(H,R,[H.p(.2,1.78,z),H.p(6,1.87,z),H.p(11.9,1.76,z)],'blue',1.5);
  for(const [i,w] of [[.2,3.4],[3.7,3.4],[7.2,4.4]]){
    shape(H,R,H.faceI(i,2.11,w,1.14,2.3),'paper',.7);
    for(const x of [i,i+w])metal(H,R,x,2.06,.08,.11,.12,2.27,'teal');
    stroke(H,R,[H.p(i+.15,2.13,1.3),H.p(i+.8,2.13,2.18)],'paper',2);
    for(const x of [i+.08,i+w-.08])for(const z of [1.25,2.2]){const p=H.p(x,2.15,z);oval(H,R,...p,2.5,2,'sun',.75);}
  }
  for(const j of [3.3,8.5])timber(H,R,.12,j,.24,.22,0,3.16,'teal');
  timber(H,R,.1,3.3,.28,5.5,3.16,.13,'teal');
  shape(H,R,[H.p(.15,3.3,3.27),H.p(2.2,3.3,3.05),H.p(2.2,8.6,3.05),H.p(.15,8.6,3.27)],'sun',.35);
  for(let j=3.4;j<8.5;j+=.64)stroke(H,R,[H.p(.2,j,3.29),H.p(2.17,j,3.07)],'paper',1.3);
  cabinetFrame(H,R,.48,3.55,2.5,1.3,.19,2.15,2,'teal',(i,j,w,d,z,h,n)=>{
    for(const zz of [.62,1.27])timber(H,R,i,j,w,d,z+zz,.075,'teal');
    if(n===0){for(let a=0;a<3;a++){timber(H,R,i+.11+a*.25,j+.1,.07,.72,z+.05,.47,'sun');const p=H.p(i+.19+a*.25,j+.3,z+.81);oval(H,R,...p,4,2,'paper',1);stroke(H,R,[[p[0]-3,p[1]],[p[0]-2,p[1]-8],[p[0]+2,p[1]-8],[p[0]+3,p[1]]],'coral',1.5);}}
    else {cushion(H,R,i+.08,j+.11,w-.17,.68,z+.1,.15,'paper');box(H,R,i+.08,j+.14,w-.17,.63,z+.8,.39,'teal',.7);box(H,R,i+.05,j+.13,w-.11,.66,z+1.19,.075,'coral',.65);shape(H,R,H.tile(i+.14,j+.19,w-.3,.49,z+1.27),'paper',1);stroke(H,R,[H.p(i+.18,j+.24,z+1.28),H.p(i+w-.18,j+.63,z+1.28)],'teal',.6);}
    for(let a=0;a<3;a++)box(H,R,i+.09,j+.1+a*.23,w-.2,.16,z+1.42,.12,'paper',.9);
  });
  for(let n=0;n<7;n++)H.line(R,[H.p(.7+n*.3,4.89,.23),H.p(.7+n*.3,4.89,.43)],'blue',1.2);
  benchFrame(H,R,4.48,4.9,3.25,3.25,.91,'sun');
  box(H,R,4.67,5.09,2.87,2.87,.91,.055,'blue',.75);
  for(let i=0;i<8;i++)for(let j=0;j<8;j++)shape(H,R,H.tile(4.71+i*.35,5.13+j*.35,.348,.348,.976),(i+j)%2?'teal':'paper',(i+j)%2?.55:1,.35);
  shape(H,R,[H.p(7.73,8.12,.93),H.p(7.51,8.12,.93),H.p(7.73,7.94,.93)],'paper',1);
  shape(H,R,H.tile(4.72,5.14,.32,.32,.98),'sun',.55);stroke(H,R,[H.p(4.75,5.22,.99),H.p(4.91,5.34,.99)],'coral',1);
  for(const [i,j,k]of [[0,0,2],[2,1,0],[5,0,1],[7,1,0],[6,3,0],[4,2,0],[1,6,0],[3,5,0],[6,7,2],[7,6,0],[4,6,0]])piece(H,R,4.88+i*.35,5.3+j*.35,1, j<4?'blue':'paper',k);
  piece(H,R,5.92,7.05,1,'sun',0);
  caneChair(H,R,3.38,5.25,'sun');cushion(H,R,3.42,5.4,.84,.67,.7,.1,'coral');
  caneChair(H,R,8.22,7.15,'sun',true);cushion(H,R,8.26,7.27,.84,.67,.7,.1,'teal');
  benchFrame(H,R,8.15,3.04,2.65,1.13,.66,'teal');
  metal(H,R,8.38,3.27,2.05,.74,.68,.06,'sun');
  for(const i of [8.75,9.65]){vessel(H,R,i,3.62,.76,5,10,'coral',true);oval(H,R,...H.p(i,3.62,.72),8,3,'paper',1);}
  vessel(H,R,10.4,3.52,.72,8,20,'paper',false);
  bentTube(H,R,[[7.92,8.42,.04],[7.92,8.42,1.42],[8.12,8.42,1.55],[8.3,8.42,1.46]],2.6,'sun');
  benchFrame(H,R,9.64,9.4,1.28,1.08,.65,'sun');oval(H,R,...H.p(9.94,9.63,.66),4,2,'blue',.7);cushion(H,R,10.13,9.5,.64,.69,.65,.1,'paper');
  box(H,R,9.45,10.67,1.1,.7,.02,.12,'blue',.5);shape(H,R,H.tile(9.5,10.73,.99,.58,.15),'coral',.3);
  benchFrame(H,R,4.2,9.4,2.9,.86,.36,'teal');
  box(H,R,4.39,9.57,.82,.48,.37,.055,'paper',1);stroke(H,R,[H.p(4.76,9.59,.43),H.p(4.76,10.02,.43)],'coral',1);
  const watch=H.p(5.65,9.73,.4);oval(H,R,...watch,6,5,'sun',1);stroke(H,R,[[watch[0],watch[1]-3],[watch[0],watch[1]],[watch[0]+3,watch[1]]],'blue',.75);
  floorLight(H,6.3,6.3,130,.44);
},(H,R,time)=>{
  const u=((time%18)+18)%18, lift=smooth((u-3.6)/3.6)*(1-smooth((u-10.8)/4)),contact=smooth((u-.3)/2)*(1-smooth((u-14.4)/1.6));
  const pi=4.88,pj=6.7,pz=1+lift*.4;piece(H,R,pi,pj,pz,'sun',1);
  const target=H.p(pi,pj,pz+.38),rest=H.p(4.16,6.29,1.1),hand=[rest[0]+(target[0]-rest[0])*contact,rest[1]+(target[1]-rest[1])*contact];
  player(H,R,3.92,6.03,[H.p(4.38,6.33,.98),hand],'coral',lift*2);
  const response=smooth((u-8.4)/1.1)*(1-smooth((u-12)/1.5));player(H,R,8.66,7.83,[H.p(7.82,7.62,.98+response*.2),H.p(8.15,7.85,.93)],'teal',-response*2);
  const f=Math.sin(u*Math.PI/9)*.14;stroke(H,R,[H.p(4.3+f,.84,.045),H.p(5.25+f,.81,.045),H.p(5.8+f,.86,.045)],'paper',1.3,.8);
  const scarf=smooth((u-15)/1)*(1-smooth((u-17)/1))*.04;
  shape(H,R,[H.p(6.3,9.49,.4),H.p(6.84,9.49,.4),H.p(6.86,10.12,.4),H.p(6.72,10.23,.13+scarf),H.p(6.24,10.18,.13)],'coral',.47);
  for(let n=0;n<5;n++)stroke(H,R,[H.p(6.3+n*.1,9.53,.41),H.p(6.3+n*.1,10.14,.17)],'sun',.65);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
