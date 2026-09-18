import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, caneChair, benchFrame, vessel, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';

const smooth=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
function player(H,R,i,j,hands,ink,lean=0,rear=false){
  const [x,y]=H.p(i,j), lx=x+lean;
  oval(H,R,x+5,y+3,16,5,'blue',.22);
  if(!rear)for(const s of [-1,1]){stroke(H,R,[[x+s*6,y-23],[x+s*12,y-14],[x+s*14,y]],'blue',7);oval(H,R,x+s*14+3,y,7,3,'blue',.8);}
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
  shape(H,R,H.faceJ(.08,2.3,8.58,.1,1.09),'teal',.42);
  timber(H,R,.05,2.2,.34,8.84,1.08,.13,'sun');
  for(const j of [2.4,5.1,7.7,10.75]){
    metal(H,R,.1,j,.18,.18,.08,1.11,'teal');
    metal(H,R,.04,j-.08,.37,.35,.025,.09,'blue');
    for(const z of [.26,.76])H.dot(...H.p(.3,j+.07,z),1.5,'sun');
  }
  for(const j of [5.39,8.08]){
    shape(H,R,H.faceJ(.27,j,2.29,1.24,2.51),'paper',.7);
    metal(H,R,.24,j,.13,.11,1.1,1.5,'teal');
    metal(H,R,.24,j+2.29,.13,.11,1.1,1.5,'teal');
    for(const y of [j+.06,j+2.23])for(const z of [1.36,2.41])H.dot(...H.p(.4,y,z),2,'sun');
    H.line(R,[H.p(.29,j+.28,1.4),H.p(.29,j+.74,2.31)],'paper',2.1);
  }
  for(const j of [3.3,8.5])timber(H,R,.12,j,.24,.22,0,3.16,'teal');
  timber(H,R,.1,3.3,.28,5.5,3.16,.13,'teal');
  shape(H,R,[H.p(.15,3.3,3.27),H.p(2.2,3.3,3.05),H.p(2.2,8.6,3.05),H.p(.15,8.6,3.27)],'sun',.35);
  for(let j=3.4;j<8.5;j+=.64)stroke(H,R,[H.p(.2,j,3.29),H.p(2.17,j,3.07)],'paper',1.3);
  bentTube(H,R,[[2.22,3.25,3.07],[2.22,8.7,3.07],[.17,8.7,3.29]],3,'teal');
  for(const j of [3.55,5.92,8.42]){
    stroke(H,R,[H.p(.27,j,2.61),H.p(2.13,j,3.02)],'blue',2.2);
    stroke(H,R,[H.p(.27,j,3.22),H.p(1.17,j,2.83)],'teal',1.7);
  }
  const roll=H.p(.2,3.28,3.32);oval(H,R,...roll,5,6,'sun',.7);
  for(const z of [2.66,2.76])H.line(R,[H.p(.3,3.51,z),H.p(2.93,3.51,z)],'teal',2);
  shape(H,R,H.faceI(.45,3.49,2.45,2.33,2.76),'teal',.6);
  shape(H,R,H.faceI(.6,3.52,2.14,2.42,2.66),'sun',.2);

  cabinetFrame(H,R,.48,3.55,2.5,1.3,.19,2.15,2,'teal',(i,j,w,d,z,h,n)=>{
    for(const zz of [.62,1.27])timber(H,R,i,j,w,d,z+zz,.075,'teal');
    if(n===0){for(let a=0;a<3;a++){timber(H,R,i+.11+a*.25,j+.1,.07,.72,z+.05,.47,'sun');const p=H.p(i+.19+a*.25,j+.3,z+.81);oval(H,R,...p,4,2,'paper',1);stroke(H,R,[[p[0]-3,p[1]],[p[0]-2,p[1]-8],[p[0]+2,p[1]-8],[p[0]+3,p[1]]],'coral',1.5);}}
    else {cushion(H,R,i+.08,j+.11,w-.17,.68,z+.1,.15,'paper');box(H,R,i+.08,j+.14,w-.17,.63,z+.8,.39,'teal',.7);box(H,R,i+.05,j+.13,w-.11,.66,z+1.19,.075,'coral',.65);shape(H,R,H.tile(i+.14,j+.19,w-.3,.49,z+1.27),'paper',1);stroke(H,R,[H.p(i+.18,j+.24,z+1.28),H.p(i+w-.18,j+.63,z+1.28)],'teal',.6);}
    for(let a=0;a<3;a++)box(H,R,i+.09,j+.1+a*.23,w-.2,.16,z+1.42,.12,'paper',.9);
  });
  for(let n=0;n<7;n++)H.line(R,[H.p(.7+n*.3,4.89,.23),H.p(.7+n*.3,4.89,.43)],'blue',1.2);
  shape(H,R,[H.p(2.98,3.64,.42),H.p(3.52,3.89,.42),H.p(3.52,3.89,2.22),H.p(2.98,3.64,2.22)],'teal',.45);
  for(const z of [.61,1.88])metal(H,R,2.96,3.75,.09,.19,z,.13,'sun');
  stroke(H,R,[H.p(3.46,3.94,1.1),H.p(3.46,3.94,1.36)],'sun',2.2);
  const hood=H.p(1.84,4.72,2.18);stroke(H,R,[H.p(1.84,4.08,2.22),[hood[0],hood[1]-4]],'teal',2);
  shape(H,R,[[hood[0]-10,hood[1]+3],[hood[0]+10,hood[1]+3],[hood[0]+5,hood[1]-7],[hood[0]-5,hood[1]-7]],'coral',.6);oval(H,R,hood[0],hood[1]+3,9,3,'sun',1);
  H.glow(hood[0],hood[1]+16,24,20,'sun',.16);
  timber(H,R,.74,5.36,1.39,4.89,.53,.14,'sun');
  for(const j of [5.45,7.65,9.97]){
    timber(H,R,.85,j,.2,.21,.04,.5,'teal');timber(H,R,1.83,j,.2,.21,.04,.5,'teal');
    stroke(H,R,[H.p(.87,j,.15),H.p(1.87,j,.5)],'teal',2.5);
  }
  for(const i of [.91,1.17,1.43,1.69,1.95])H.line(R,[H.p(i,5.47,.68),H.p(i,10.13,.68)],'coral',.7);
  cushion(H,R,.86,6.21,1.05,1.21,.69,.12,'paper');
  cushion(H,R,.86,8.01,1.05,1.15,.69,.13,'teal');
  shape(H,R,[H.p(1.08,8.15,.84),H.p(1.55,8.15,.84),H.p(1.55,8.61,.84),H.p(1.08,8.61,.84)],'paper',1);
  H.line(R,[H.p(1.32,8.16,.85),H.p(1.32,8.59,.85)],'blue',.75);
  for(let n=0;n<3;n++)H.line(R,[H.p(1.12,8.23+n*.09,.85),H.p(1.25,8.23+n*.09,.85)],'teal',.65);
  const bag=H.p(1.48,9.73,.7);shape(H,R,[[bag[0]-12,bag[1]],[bag[0]+12,bag[1]],[bag[0]+9,bag[1]-21],[bag[0]-10,bag[1]-22]],'coral',.6);stroke(H,R,[[bag[0]-7,bag[1]-22],[bag[0]-7,bag[1]-33],[bag[0]+6,bag[1]-33],[bag[0]+7,bag[1]-22]],'blue',1.4);

  benchFrame(H,R,4.48,4.9,3.25,3.25,.91,'sun');
  for(const i of [4.63,7.41])for(const j of [5.08,7.86]){
    metal(H,R,i,j,.23,.24,.03,.13,'teal');
    stroke(H,R,[H.p(i+.1,j+.1,.18),H.p(6.1,6.49,.65)],'teal',2.5);
  }
  timber(H,R,4.77,5.18,2.57,2.64,.3,.1,'sun');
  shape(H,R,H.faceI(4.72,8.16,2.77,.54,.84),'teal',.54);
  for(const i of [5.02,6.4]){shape(H,R,H.faceI(i,8.18,.87,.59,.79),'sun',.35);stroke(H,R,[H.p(i+.28,8.22,.69),H.p(i+.57,8.22,.69)],'blue',1.7);}
  box(H,R,4.67,5.09,2.87,2.87,.91,.055,'blue',.75);
  for(let i=0;i<8;i++)for(let j=0;j<8;j++)shape(H,R,H.tile(4.71+i*.35,5.13+j*.35,.348,.348,.976),(i+j)%2?'teal':'paper',(i+j)%2?.55:1,.35);
  for(const j of [5.03,8.05]){
    timber(H,R,4.42,j,3.42,.13,.92,.1,'sun');
    for(let n=0;n<8;n++)H.dot(...H.p(4.88+n*.35,j+.05,1.03),.9,'coral');
  }
  for(const i of [4.43,7.69])timber(H,R,i,5.02,.12,3.16,.92,.1,'sun');
  for(const i of [5.17,6.33])metal(H,R,i,4.55,.1,.55,.84,.08,'teal');
  metal(H,R,5.08,4.43,1.53,.41,.92,.05,'teal');
  for(let n=0;n<2;n++){
    const q=H.p(5.48+n*.68,4.63,1.11);oval(H,R,...q,10,9,'sun',.6);oval(H,R,...q,7.7,6.8,'paper',1);stroke(H,R,[[q[0]-4,q[1]+1],[q[0],q[1]],[q[0]+1,q[1]-5]],'blue',.9);
    metal(H,R,5.33+n*.69,4.55, .23,.17,1.33,.065,'teal');
  }
  shape(H,R,[H.p(7.73,8.12,.93),H.p(7.51,8.12,.93),H.p(7.73,7.94,.93)],'paper',1);
  shape(H,R,H.tile(4.72,5.14,.32,.32,.98),'sun',.55);stroke(H,R,[H.p(4.75,5.22,.99),H.p(4.91,5.34,.99)],'coral',1);
  for(const [i,j,k]of [[0,0,2],[2,1,0],[5,0,1],[7,1,0],[6,3,0],[4,2,0],[1,6,0],[3,5,0],[6,7,2],[7,6,0],[4,6,0]])piece(H,R,4.88+i*.35,5.3+j*.35,1, j<4?'blue':'paper',k);
  piece(H,R,5.92,7.05,1,'sun',0);
  caneChair(H,R,3.38,5.25,'sun');cushion(H,R,3.42,5.4,.84,.67,.7,.1,'coral');
  caneChair(H,R,8.22,7.15,'sun',true);cushion(H,R,8.26,7.27,.84,.67,.7,.1,'teal');
  benchFrame(H,R,8.15,3.04,2.65,1.13,.66,'teal');
  metal(H,R,8.38,3.27,2.05,.74,.68,.06,'sun');
  for(const i of [8.75,9.65]){oval(H,R,...H.p(i,3.62,.72),8,3,'paper',1);vessel(H,R,i,3.62,.76,5,10,'coral',true);}
  vessel(H,R,10.4,3.52,.72,8,20,'paper',false);
  const jug=H.p(10.4,3.52,.72);stroke(H,R,[[jug[0]+7,jug[1]-17],[jug[0]+15,jug[1]-19],[jug[0]+15,jug[1]-6],[jug[0]+7,jug[1]-5]],'teal',2);stroke(H,R,[[jug[0]-6,jug[1]-16],[jug[0]-12,jug[1]-20],[jug[0]-9,jug[1]-9]],'paper',3);
  shape(H,R,H.tile(8.44,3.11,.46,.47,.75),'paper',1);
  for(let n=0;n<4;n++)H.line(R,[H.p(8.47+n*.1,3.15,.77),H.p(8.47+n*.1,3.56,.77)],'coral',.6);
  timber(H,R,8.38,3.22,2.12,.09,.8,.09,'sun');
  timber(H,R,8.38,3.22,.09,.83,.8,.09,'sun');timber(H,R,10.42,3.22,.09,.83,.8,.09,'sun');
  for(const i of [8.32,10.5])stroke(H,R,[H.p(i,3.48,.85),H.p(i,3.48,1.01),H.p(i,3.86,1.01),H.p(i,3.86,.85)],'teal',1.4);

  bentTube(H,R,[[7.92,8.42,.04],[7.92,8.42,1.42],[8.12,8.42,1.55],[8.3,8.42,1.46]],2.6,'sun');
  benchFrame(H,R,9.64,9.4,1.28,1.08,.65,'sun');oval(H,R,...H.p(9.94,9.63,.66),4,2,'blue',.7);cushion(H,R,10.13,9.5,.64,.69,.65,.1,'paper');
  box(H,R,9.45,10.67,1.1,.7,.02,.12,'blue',.5);shape(H,R,H.tile(9.5,10.73,.99,.58,.15),'coral',.3);
  benchFrame(H,R,4.2,9.4,2.9,.86,.36,'teal');
  box(H,R,4.39,9.57,.82,.48,.37,.055,'paper',1);stroke(H,R,[H.p(4.76,9.59,.43),H.p(4.76,10.02,.43)],'coral',1);
  const watch=H.p(5.65,9.73,.4);oval(H,R,...watch,6,5,'sun',1);stroke(H,R,[[watch[0],watch[1]-3],[watch[0],watch[1]],[watch[0]+3,watch[1]]],'blue',.75);
  box(H,R,2.25,10.18,1.59,.99,.06,.2,'teal',.55);
  shape(H,R,H.tile(2.35,10.26,1.39,.78,.27),'blue',.8);
  for(let n=0;n<4;n++)piece(H,R,2.6+n*.3,10.6,.29,n%2?'sun':'paper',n===2?1:0);
  shape(H,R,H.faceI(2.28,10.2,1.53,.27,1.13),'teal',.6);shape(H,R,H.faceI(2.4,10.23,1.29,.4,.99),'paper',1);
  for(let n=0;n<3;n++)H.line(R,[H.p(2.46,10.24,.49+n*.14),H.p(3.58,10.24,.49+n*.14)],'coral',.85);
  for(const i of [2.48,3.51])metal(H,R,i,11.15,.16,.035,.12,.17,'sun');
  const chain=[];for(let n=0;n<19;n++){const a=n/18*Math.PI*1.7;chain.push(H.p(5.8+Math.cos(a)*.32,9.73+Math.sin(a)*.17,.42));}stroke(H,R,chain,'sun',1.2);
  for(const j of [9.91,10.1]){const q=H.p(4.8,j,.44);oval(H,R,...q,4,2,'paper',1);}
  stroke(H,R,[H.p(4.67,9.87,.45),H.p(4.8,10.18,.45),H.p(4.96,10.13,.45)],'teal',.9);
  metal(H,R,10.87,2.42,.34,.34,.025,.12,'blue');
  bentTube(H,R,[[11.04,2.61,.15],[11.04,2.61,1.32]],3.8,'teal');
  const parasol=H.p(11.04,2.61,1.35);shape(H,R,[[parasol[0]-6,parasol[1]],[parasol[0]-10,parasol[1]-52],[parasol[0],parasol[1]-68],[parasol[0]+9,parasol[1]-52],[parasol[0]+5,parasol[1]]],'coral',.45);stroke(H,R,[[parasol[0],parasol[1]-64],[parasol[0],parasol[1]-3]],'sun',1);stroke(H,R,[[parasol[0]-8,parasol[1]-22],[parasol[0]+7,parasol[1]-22]],'teal',2);
  floorLight(H,6.3,6.3,130,.44);
},(H,R,time)=>{
  const u=((time%18)+18)%18, lift=smooth((u-3.6)/3.6)*(1-smooth((u-10.8)/4)),contact=smooth((u-.3)/2)*(1-smooth((u-14.4)/1.6));
  const pi=4.88,pj=6.7,pz=1+lift*.4;piece(H,R,pi,pj,pz,'sun',1);
  const target=H.p(pi,pj,pz+.38),rest=H.p(4.16,6.29,1.1),hand=[rest[0]+(target[0]-rest[0])*contact,rest[1]+(target[1]-rest[1])*contact];
  player(H,R,3.92,6.03,[H.p(4.38,6.33,.98),hand],'coral',lift*2,true);
  const response=smooth((u-8.4)/1.1)*(1-smooth((u-12)/1.5));player(H,R,8.66,7.83,[H.p(7.82,7.62,.98+response*.2),H.p(8.15,7.85,.93)],'teal',-response*2);
  const f=Math.sin(u*Math.PI/9)*.14;stroke(H,R,[H.p(4.3+f,.84,.045),H.p(5.25+f,.81,.045),H.p(5.8+f,.86,.045)],'paper',1.3,.8);
  const scarf=smooth((u-15)/1)*(1-smooth((u-17)/1))*.04;
  shape(H,R,[H.p(6.3,9.49,.4),H.p(6.84,9.49,.4),H.p(6.86,10.12,.4),H.p(6.72,10.23,.13+scarf),H.p(6.24,10.18,.13)],'coral',.47);
  for(let n=0;n<5;n++)stroke(H,R,[H.p(6.3+n*.1,9.53,.41),H.p(6.3+n*.1,10.14,.17)],'sun',.65);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
