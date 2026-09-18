import { world, shape, stroke, oval, ell, loop, mix, box } from '../../worlds/common.js';
import { timber, metal, vessel, bentTube, cushion, drape, benchFrame, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { floorShadow, taskLight, recessedFrame } from '../joinery.js';
import { person } from './surf-store.js';
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u);};
function rope(H,R,pts,w=3,ink='sun') { stroke(H,R,pts,'blue',w+1.4);stroke(H,R,pts,ink,w);stroke(H,R,pts.map(([x,y])=>[x-.4,y-.6]),'paper',.65,.7); }
function coil(H,R,i,j,z,r=20,n=5) {const [x,y]=H.p(i,j,z);for(let k=0;k<n;k++)rope(H,R,ell(x,y-k*1.5,r-k*.65,(r-k*.65)*.34,42),2.2);}
const room=world('cape-town-rope-drying','A loop holds the morning',{wall:false,floor:'blue',tone:.27,head:40},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.025,'sun',.55);
  shape(H,R,H.tile(.15,.06,11.65,.55,.055),'teal',.4,.4);
  for(let i=.4;i<12;i+=.55)stroke(H,R,[H.p(i,.15,.06),H.p(i+.3,.23,.06),H.p(i+.6,.18,.06)],'paper',.6,.7);
  for(const i of [.25,3.8,7.5,11.55]){
    timber(H,R,i,.65,.19,.25,.03,2.2,'teal');metal(H,R,i-.05,.6,.29,.35,.05,.2,'blue');
    for(const z of [.7,1.5,2.16])bentTube(H,R,[[i,.78,z],[Math.min(11.8,i+3.7),.78,z+.02]],2.7,'teal');
  }
  for(let j=.7;j<9.6;j+=.8)timber(H,R,.08,j,.16,.72,.1,2.9-(j%1.6)*.25,'teal');
  for(const j of [1,4.9,9.3])timber(H,R,.02,j,.3,.21,.05,3.65,'sun');
  timber(H,R,.04,.7,.22,9,3.5,.18,'sun');
  shape(H,R,[H.p(.04,.7,3.75),H.p(3.4,.7,4.0),H.p(3.4,4.5,3.6),H.p(.04,4.5,3.45)],'paper',.75,.9);
  for(const j of [1.2,2.4,3.6])stroke(H,R,[H.p(.1,j,3.76-j*.055),H.p(3.4,j,4-j*.09)],'blue',.6,.6);
  floorLight(H,5.5,4.5,110,.45);
  floorShadow(H,2.4,2.1,6.1,3.2,.22);
  for(const i of [2.25,7.8]){
    timber(H,R,i,2.3,.24,.3,.04,3.95,'sun');metal(H,R,i-.13,2.16,.5,.6,.025,.12,'blue');
    bentTube(H,R,[[i+.12,2.45,3.4],[i+.12,.82,1.6]],2.5,'teal');
    timber(H,R,i,2.3,.2,1.5,.12,.16,'sun');
    bentTube(H,R,[[i+.1,2.5,2.4],[i+.1,3.6,.25]],2.4,'sun');
    for(const z of [1.25,2.7,3.8])H.dot(...H.p(i+.12,2.62,z),2,'blue');
  }
  for(const z of [1.22,2.7,3.82])timber(H,R,2.23,2.34,5.85,.19,z,.16,'sun');
  for(const i of [2.8,3.8,6.9]){
    const a=H.p(i,2.58,3.9),b=H.p(i+.55,2.58,3.9),c=H.p(i+.3,2.75,1.25);
    rope(H,R,[a,[a[0]-8,a[1]+38],c,[b[0]+8,b[1]+38],b],3.1);
    const f=H.p(i+.35,2.65,2.0);oval(H,R,...f,7,10,i===3.8?'coral':'paper',.7);oval(H,R,f[0],f[1]-7,5.3,2.2,'blue',.7);
    if(i===3.8)for(let k=0;k<3;k++)H.line(R,[[f[0]-7,f[1]-1+k*3],[f[0]+6,f[1]+2+k*3]],'sun',1);
  }
  const mesh=[H.p(6.25,2.63,3.72),H.p(7.75,2.63,3.72),H.p(7.62,2.74,1.05),H.p(6.1,2.73,1.28)];
  H.tint(mesh,'teal',.13);H.clip(mesh,()=>{for(let n=-6;n<16;n++){H.line(R,[H.p(5.8+n*.2,2.65,1),H.p(7+n*.2,2.65,4)],'teal',.9);H.line(R,[H.p(7.8+n*.2,2.65,1),H.p(6.6+n*.2,2.65,4)],'teal',.9);}});rope(H,R,mesh.concat([mesh[0]]),2);
  metal(H,R,2.65,3.15,5.5,.95,.08,.1,'blue');
  for(let i=2.8;i<8;i+=.4)H.line(R,[H.p(i,3.22,.19),H.p(i,4.02,.19)],'paper',.65);
  const basket=H.p(5.1,4.7,.04);shape(H,R,[[basket[0]-36,basket[1]-5],[basket[0]+36,basket[1]-5],[basket[0]+31,basket[1]-29],[basket[0]-31,basket[1]-29]],'sun',.55,.9);
  oval(H,R,basket[0],basket[1]-28,33,12,'blue',.56);
  for(let k=0;k<9;k++)stroke(H,R,[[basket[0]-29+k*7,basket[1]-27],[basket[0]-33+k*8,basket[1]-6]],'coral',.85,.65);
  for(let k=0;k<4;k++)stroke(H,R,[[basket[0]-33,basket[1]-7-k*5],[basket[0],basket[1]-3-k*5],[basket[0]+33,basket[1]-7-k*5]],'paper',.8);
  coil(H,R,5.1,4.7,.86,25,4);
  cabinetFrame(H,R,8.85,.8,2.65,1.55,.12,3.75,2,'teal',(x,j,w,d,z,h,n)=>{
    for(const zz of [.5,1.5,2.6])timber(H,R,x,j,w,d,z+zz,.08,'sun');
    if(!n){coil(H,R,x+.5,j+.5,z+.67,12,3);coil(H,R,x+.5,j+.5,z+1.67,10,3);vessel(H,R,x+.5,j+.6,z+2.71,9,11,'coral');}
    else{for(let k=0;k<3;k++)oval(H,R,...H.p(x+.23+k*.29,j+.5,z+1.7),4,7,k%2?'coral':'paper',.7);box(H,R,x,j,w,.7,z+.15,.3,'blue',.5);drape(H,R,x,j,w,.8,z+2.73,.4,'paper');}
  });
  timber(H,R,8.76,.72,2.84,1.72,3.9,.14,'sun');
  const glove=H.p(10.9,2.4,3.1);shape(H,R,[[glove[0]-5,glove[1]],[glove[0]+5,glove[1]],[glove[0]+8,glove[1]+19],[glove[0]+4,glove[1]+24],[glove[0]-5,glove[1]+21],[glove[0]-8,glove[1]+8]],'paper',.82,.6);
  for(let k=0;k<4;k++)H.line(R,[[glove[0]-4+k*3,glove[1]+10],[glove[0]-4+k*3,glove[1]+20]],'blue',.5);
  for(const j of [5.5,6.1,6.7]){bentTube(H,R,[[.8,j,.1],[.8,j,2.9],[.9,j,3.1],[1.06,j,2.94]],2.4,'sun');metal(H,R,.3,j-.06,.68,.13,1.35,.12,'teal');}
  benchFrame(H,R,1.2,8.35,4.15,1,.83,'sun');
  timber(H,R,1.48,8.5,1.4,.64,.83,.08,'teal');timber(H,R,1.48,9.05,1.4,.06,.92,.1,'teal');
  rope(H,R,[H.p(1.6,8.6,.96),H.p(1.93,8.75,1.04),H.p(2.1,8.65,.94),H.p(2.55,8.9,.95)],3.6,'coral');
  for(let k=0;k<8;k++)H.line(R,[H.p(2.0+k*.04,8.74,.97),H.p(2.13+k*.04,8.81,1.0)],'sun',.85);
  coil(H,R,3.5,8.9,.88,12,2);oval(H,R,...H.p(4.3,8.8,.91),4,2,'blue');
  const needle=H.p(4.8,8.8,.86);shape(H,R,[[needle[0]-2,needle[1]-14],[needle[0]+3,needle[1]+7],[needle[0],needle[1]+12],[needle[0]-4,needle[1]-6]],'paper',1,.6);
  cushion(H,R,.55,10,.95,.95,.08,.14,'coral');vessel(H,R,1.9,10.6,.04,6,18,'teal',false);
  for(let k=0;k<4;k++)timber(H,R,8.6,7.2+k*.35,2,.16,.1,.45,'sun');
  for(const i of [8.65,10.25])timber(H,R,i,7.2,.18,1.18,.1,.72,'sun');
  vessel(H,R,10.3,9.6,.04,16,24,'teal');
  metal(H,R,6.8,10.55,4.3,.16,.02,.06,'blue');
  for(let i=7;i<11;i+=.3)H.line(R,[H.p(i,10.57,.09),H.p(i+.12,10.7,.09)],'paper',.7);
},(H,R,t)=>{
  const s=((t%20)+20)%20,u=s<8?ease(s/8):s<12?1:s<18?1-ease((s-12)/6):0;
  const top=H.p(5.1,3.02-u*.43,.9+u*.54),left=H.p(4.63,4.5,.83),right=H.p(5.57,4.5,.83);
  const shoulder=H.p(5.48,4.06,1.7), hand=[top[0]+9,top[1]+17];
  person(H,R,6.3,4.3,hand,[top[0]+13,top[1]+35],'coral',-u*5);
  rope(H,R,[left,[left[0]-19*(1-u),left[1]-12],top,[top[0]+13,top[1]+18],[right[0]+17*(1-u),right[1]-8],right],3.4);
  for(let k=0;k<3;k++){const p=H.p(4.7+k*.07,4.48,.83);H.line(R,[[p[0]-2,p[1]-2],[p[0]+2,p[1]+2]],'coral',1);}
  const a=H.p(.15,2,3.6),w=Math.sin(t*Math.PI/10)*3;
  shape(H,R,[[a[0],a[1]],[a[0]+32,a[1]+9+w],[a[0]+27,a[1]+39+w],[a[0]-3,a[1]+31]],'coral',.58,.8);
  for(let k=0;k<4;k++)stroke(H,R,[[a[0]+k*7,a[1]+3+k*2],[a[0]+k*7-1,a[1]+29+w+k]],'paper',.65,.7);
});
room.loopSeconds=20;
room.stillTime=9.8;
export default room;
