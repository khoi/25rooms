import { world, actor, shape, oval, stroke, box, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, benchFrame, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { wallRack, windowBay, caster, taskLight, panelFront } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u)};
const pose={...FIGURES.sample('sit',0),head:14,al:44,el:63};
FIGURES.clips['london-library-reader']={dur:24,keys:[[0,pose],[1,pose]]};
const rest=FIGURES.sample('idle',0);
FIGURES.clips['london-library-librarian']={dur:24,keys:[[0,{...rest,ar:54,er:30,head:9}],[.4,{...rest,ar:54,er:30,head:-12}],[.6,{...rest,ar:54,er:30,head:-12}],[.91,{...rest,ar:54,er:30,head:9}],[1,{...rest,ar:54,er:30,head:9}]]};
function books(H,R,i,j,w,z,row=0){
  for(let n=0;n<Math.floor(w/.22);n++){const x=i+n*.22,h=.38+(n*7%5)*.075;box(H,R,x,j,.16,.5,z,h,['coral','paper','teal','sun','blue'][(n+row)%5],.64);H.line(R,[H.p(x+.02,j+.51,z+.12),H.p(x+.14,j+.51,z+.12)],'sun',.7);if(n%3===0)H.line(R,[H.p(x+.02,j+.51,z+h-.07),H.p(x+.14,j+.51,z+h-.07)],'paper',.6);}
}
function table(H,R){
  benchFrame(H,R,3.48,3.77,4.52,1.98,1.04,'sun');
  shape(H,R,H.tile(3.68,3.95,4.07,1.55,1.052),'teal',.16,.5);
  const q=H.p(4.05,4.23,1.07);oval(H,R,...q,8,3,'sun');H.line(R,[[q[0],q[1]],[q[0],q[1]-37]],'blue',2.7);
  shape(H,R,[[q[0]-16,q[1]-34],[q[0]+16,q[1]-34],[q[0]+9,q[1]-54],[q[0]-9,q[1]-54]],'teal',.77);
  oval(H,R,q[0],q[1]-33,16,4,'sun',.9);H.glow(q[0]+20,q[1]+4,77,34,'sun',.32);H.light(q[0]+20,q[1]+4,74,32,.65);
  H.line(R,[[q[0]+9,q[1]-32],[q[0]+9,q[1]-19]],'sun',.8);oval(H,R,q[0]+9,q[1]-17,1.6,2.2,'coral');
  const m=H.p(7.22,4.54,1.09);oval(H,R,...m,9,5,'paper');H.outline(R,ell(...m,7,3.8),'teal',1.3);H.line(R,[[m[0]+6,m[1]+3],[m[0]+17,m[1]+9]],'blue',3);
  shape(H,R,H.tile(6.85,5.05,.7,.29,1.08),'coral',.6);
  for(let n=0;n<7;n++) H.dot(...H.p(6.92+n*.075,5.12,1.09),.8,'sun');
  drape(H,R,3.6,5.21,.64,.4,1.07,.23,'paper');
  for(let n=0;n<3;n++) box(H,R,7.1+n*.02,3.91+n*.02,.58,.45,1.07+n*.09,.08,['coral','teal','sun'][n],.6);
}
function spread(H,R,turn,t){
  const P=(x,y,z=0)=>H.p(5.42+x,4.03+y,1.1+z);
  shape(H,R,[P(-.52,-.29),P(.52,-.29),P(.52,.4),P(-.52,.4)],'coral',.7);
  for(const side of [-1,1]){
    shape(H,R,[P(0,-.28,.02),P(side*.34,-.28,.055),P(side*.34,.36,.055),P(0,.36,.02)],'paper',1);
    shape(H,R,[P(side*.08,-.16,.058),P(side*.37,-.16,.058),P(side*.37,.1,.058),P(side*.08,.1,.058)],side<0?'teal':'sun',.4,.5);
    for(let n=0;n<3;n++)H.line(R,[P(side*.09,.18+n*.048,.06),P(side*.38,.18+n*.048,.06)],'blue',.6);
  }
  const a=Math.PI*turn,w=.34;
  const leaf=[P(0,-.28,.07),P(w*Math.cos(a),-.28,.07+Math.sin(a)*w),P(w*Math.cos(a),.36,.07+Math.sin(a)*w),P(0,.36,.07)];
  shape(H,R,leaf,'paper',1,.6);
  if(turn<.35||turn>.75) H.line(R,[leaf[1],leaf[2]],'sun',1);
  const tag=P(-.14+Math.sin(t*Math.PI/12)*.015,.52,.055);shape(H,R,[P(-.2,.34,.06),P(-.08,.34,.06),tag,[tag[0]-4,tag[1]+3]],'coral',.7,.5);
  return leaf[1];
}
const room=world('london-late-library','One lamp left on',{wall:'blue',wallTone:.55,height:4.25,floor:'blue',tone:.27,head:45},(H,R)=>{
  shape(H,R,H.tile(.1,.1,11.8,11.8,.03),'blue',.51,.5);
  for(let i=0;i<12;i+=1.5)for(let j=0;j<12;j+=1.4)H.outline(R,H.tile(i+.05,j+.05,1.4,1.3,.035),'paper',.6,{tone:.25});
  const arch=(x,w,bottom,h,depth)=>{
    const P=(u,z)=>wallPt(H,'ne',x+u,z,-depth),pts=[P(0,bottom),P(w,bottom),P(w,bottom+h-1)];
    for(let n=0;n<=24;n++){const a=n*Math.PI/24;pts.push(P(w/2+Math.cos(a)*w/2,bottom+h-1+Math.sin(a)));}
    return pts;
  };
  shape(H,R,arch(3.15,5.38,.12,4.03,.12),'sun',.55,1.3);
  shape(H,R,arch(3.34,4.74,.18,3.65,.18),'paper',1,1);
  shape(H,R,arch(3.67,4.34,.25,3.4,.23),'blue',.72,1);
  for(let n=0;n<12;n++){const a=n*Math.PI/12;const P=(r,z)=>wallPt(H,'ne',5.84+Math.cos(a)*r,z,-.25);H.line(R,[P(2.38,3.02+Math.sin(a)*1.01),P(2.64,3.1+Math.sin(a)*1.07)],'blue',.7);}
  shape(H,R,[wallPt(H,'ne',3.72,.25,-.24),wallPt(H,'ne',8,.25,-.24),wallPt(H,'ne',8,2.46,-.24),wallPt(H,'ne',3.72,2.46,-.24)],'teal',.3,.5);
  for(const x of [3.77,7.62]) timber(H,R,x,.28,.29,1.53,.14,1.83,'sun');
  timber(H,R,3.85,.34,3.91,1.36,.11,.55,'sun');
  panelFront(H,R,3.89,1.72,3.78,.14,.46,3,'sun');
  for(const z of [.3,.48]) H.line(R,[H.p(6.77,1.76,z),H.p(7.17,1.76,z)],'blue',1.8);
  drape(H,R,4.04,.5,3.44,1.08,.72,.17,'coral');
  for(let n=0;n<3;n++) box(H,R,4.34+n*.95,.35,.75,.33,.79,.62,n===1?'teal':'paper',.5);
  timber(H,R,3.83,.34,3.96,.34,2.5,.11,'sun');
  books(H,R,4.06,.36,2.64,2.62);
  const q=H.p(7.34,.59,2.65);shape(H,R,[[q[0]-9,q[1]],[q[0]-2,q[1]-7],[q[0]+4,q[1]-3],[q[0]+13,q[1]-8],[q[0]+7,q[1]+2]],'paper',1,.6);
  for(const [i,w] of [[.4,2.37],[8.94,2.58]]) cabinetFrame(H,R,i,.27,w,1.14,.08,3.98,2,'sun',(x,j,cw,d,z,h,n)=>{for(let row=0;row<5;row++){const zz=.32+row*.69;timber(H,R,x,j,cw,d,zz,.09,'sun');books(H,R,x+.05,j+.18,cw-.08,zz+.1,row+n);} });
  wallRack(H,R,'nw',2.0,8.45,.17,3.58,4,'sun',(P,z,row)=>{
    for(let n=0;n<15;n++){const u=.2+n*.54,h=.45+(n*3%4)*.07;shape(H,R,[P(u,z+.08),P(u+.37,z+.08),P(u+.37,z+h),P(u,z+h)],['teal','coral','paper','sun'][(n+row)%4],.62,.5);H.line(R,[P(u+.06,z+.2),P(u+.3,z+.2)],'paper',.65);}
  });
  windowBay(H,R,'nw',10.6,1.17,1.29,2.51,{night:true,divisions:1});
  drape(H,R,.21,10.59,.2,.39,3.9,2.6,'coral');
  timber(H,R,.68,6.7,.73,2.5,.1,.6,'sun');
  drape(H,R,.7,6.72,.68,2.4,.74,.13,'teal');
  floorLight(H,5.27,4.9,116,.45);
  for(const x of [4.86,5.95]) for(const j of [2.99,3.68]) timber(H,R,x,j,.14,.14,.06,.58,'sun');
  box(H,R,4.8,3.01,1.34,.89,.58,.2,'coral',.64);
  box(H,R,4.76,2.93,1.42,.21,.72,1.0,'coral',.62);
  for(const x of [4.73,6.05]) timber(H,R,x,3.03,.17,.94,.94,.15,'sun');
  const p=H.p(4.78,3.76,1.12);shape(H,R,[[p[0]-4,p[1]-2],[p[0]+5,p[1]-2],[p[0]+5,p[1]+4],[p[0]-4,p[1]+4]],'paper',.8,.5);for(let n=0;n<4;n++)H.line(R,[[p[0]-3+n*2,p[1]-3],[p[0]-3+n*2,p[1]+4]],'coral',.55);
  benchFrame(H,R,2.32,8.33,3.62,1.16,.83,'sun');
  shape(H,R,[H.p(2.75,8.52,.86),H.p(5.42,8.52,.86),H.p(5.42,9.25,1.29),H.p(2.75,9.25,1.29)],'teal',.55);
  for(let n=0;n<3;n++) shape(H,R,[H.p(2.94+n*.72,8.58,.92),H.p(3.54+n*.72,8.58,.92),H.p(3.54+n*.72,9.13,1.24),H.p(2.94+n*.72,9.13,1.24)],'paper',1,.6);
  metal(H,R,5.25,8.25,.31,.63,.89,.08,'coral');
  box(H,R,8.82,7.18,2.0,1.2,.25,.13,'teal',.5);
  for(const x of [8.82,10.68]) for(const j of [7.18,8.25]) {caster(H,R,x,j);metal(H,R,x,j,.09,.09,.19,1.16,'teal');}
  timber(H,R,8.74,7.12,2.13,1.26,1.26,.09,'sun');
  bentTube(H,R,[[10.72,7.18,1.23],[10.72,7.18,1.75],[10.72,8.31,1.75],[10.72,8.31,1.23]],2,'teal');
  books(H,R,8.95,7.39,1.61,.4,2);
  for(let n=0;n<3;n++)box(H,R,9.05+n*.06,7.55+n*.02,1.25,.61,1.36+n*.08,.07,['paper','coral','teal'][n],.65);
  drape(H,R,8.93,7.3,.42,.55,1.37,.27,'coral');
},(H,R,t)=>{
  const u=((t%24)+24)%24,turn=ease(4.8,9.6,u)*(1-ease(14.4,22,u));
  const a=Math.PI*turn,target=H.p(5.42+.34*Math.cos(a),3.75,1.17+.34*Math.sin(a));
  const origin=H.p(5.43,3.49,0),sc=1.5,dx=-(target[0]-origin[0])/sc-5.2,dy=(target[1]-origin[1])/sc+23.57,r=Math.min(8.5,Math.hypot(dx,dy)),e=Math.acos(Math.max(-1,Math.min(1,(r*r-4.368**2-4.2**2)/(2*4.368*4.2))));
  pose.ar=(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(e),4.368+4.2*Math.cos(e)))*180/Math.PI;pose.er=e*180/Math.PI;
  let hands;
  actor(H,R,5.43,3.49,t,'london-library-reader',{shirt:['paper',1],skin:['coral',.56],face:'sw',hairStyle:'curly',prop:(HH,RR,p)=>{hands=p}},0,1.5);
  table(H,R);spread(H,R,turn,t);
  const elbow=hands.D.pt([5.2+Math.sin(pose.ar*Math.PI/180)*4.368,-23.57+Math.cos(pose.ar*Math.PI/180)*4.368]);
  H.line(R,[elbow,hands.nearHand],'blue',4.2);H.line(R,[elbow,hands.nearHand],'paper',2.6);oval(H,R,...hands.nearHand,2.7,2.3,'coral',.56);
  actor(H,R,10.25,8.73,t,'london-library-librarian',{shirt:['teal',.7],hairStyle:'bun',skin:['coral',.33],face:'nw'},0,1.5);
});
room.loopSeconds=24;
room.stillTime=12;
export default room;
