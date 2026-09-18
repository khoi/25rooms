import { world, actor, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, drape, benchFrame, slattedSeat, floorLight } from '../materials.js';
import { basin, cabinetFrame } from '../structure.js';
import { panelFront, windowBay, hangingRail, wallRack, taskLight, recessedFrame } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u)};
const rig={...FIGURES.sample('idle',0),al:23,el:62,head:13};
FIGURES.clips['london-kitchen-cover']={dur:16,keys:[[0,rig],[1,rig]]};
const rest=FIGURES.sample('idle',0);
FIGURES.clips['london-kitchen-arrival']={dur:16,keys:[[0,{...rest,head:-6,lean:0,ar:24,er:35}],[.6,{...rest,head:-6,lean:0,ar:24,er:35}],[.7,{...rest,head:14,lean:-8,ar:45,er:40}],[.85,{...rest,head:4,lean:-5,ar:32,er:40}],[.9,{...rest,head:-6,lean:0,ar:24,er:35}],[1,{...rest,head:-6,lean:0,ar:24,er:35}]]};
function mug(H,R,i,j,z,ink,side=1){const [x,y]=H.p(i,j,z);shape(H,R,[[x-5,y-11],[x+5,y-11],[x+4,y],[x-4,y]],ink,ink==='paper'?1:.66,.7);oval(H,R,x,y-11,5,2,'paper');oval(H,R,x,y-11,3.3,1.2,'blue',.55);stroke(H,R,[[x+4*side,y-9],[x+8*side,y-8],[x+8*side,y-3],[x+4*side,y-2]],'blue',1);}
function mealTable(H,R){
  benchFrame(H,R,3.83,5.2,4.12,2.65,1.23,'sun');
  drape(H,R,4.03,5.3,.64,2.42,1.245,.32,'paper');
  for(let n=0;n<4;n++) H.line(R,[H.p(4.07+n*.15,5.34,1.26),H.p(4.07+n*.15,7.7,1.26)],'coral',.6);
  for(const [i,j] of [[4.84,7.05],[7.15,6.45]]) { oval(H,R,...H.p(i,j,1.25),18,8,'paper'); H.outline(R,ell(...H.p(i,j,1.26),12,5),'sun',1); }
  const q=H.p(5.75,5.7,1.26);oval(H,R,...q,21,10,'sun',.58);
  for(let n=0;n<8;n++){const a=Math.PI*n/8;H.line(R,[[q[0]+Math.cos(a)*19,q[1]+Math.sin(a)*8],[q[0]-Math.cos(a)*19,q[1]-Math.sin(a)*8]],'coral',.55);}
  oval(H,R,q[0],q[1]-2,18,8,'paper');oval(H,R,q[0],q[1]-3,14,5.5,'coral',.5);
  for(let n=0;n<5;n++) oval(H,R,q[0]-9+n*4.5,q[1]-3+n%2*2,4,2.1,n%2?'sun':'teal',.65);
  oval(H,R,...H.p(6.78,5.52,1.26),18,8,'paper',.3);
  H.outline(R,ell(...H.p(6.78,5.52,1.27),13,5),'blue',.6,{tone:.45});
  mug(H,R,5.2,7.52,1.27,'teal');mug(H,R,7.37,7.02,1.27,'paper',-1);
  shape(H,R,H.tile(6.1,6.9,.56,.5,1.26),'coral',.48,.65);
  for(let n=0;n<3;n++)H.line(R,[H.p(6.19+n*.13,6.94,1.27),H.p(6.19+n*.13,7.28-n%2*.13,1.27)],'paper',1.25);
  const b=H.p(6.44,7.29,1.29);oval(H,R,...b,2,3,'sun');
  box(H,R,7.18,5.31,.65,.55,1.26,.07,'sun',.6);for(let n=0;n<3;n++)oval(H,R,...H.p(7.28+n*.17,5.59,1.45),5,3,'paper');
  taskLight(H,R,4.23,5.63,1.27,'coral',.35);
}
const room=world('london-kitchen-second-place','The chair is already there',{wall:'blue',wallTone:.48,height:3.75,floor:'paper',tone:.42,head:35},(H,R)=>{
  for(let i=0;i<12;i++)for(let j=0;j<12;j++) { shape(H,R,H.tile(i+.03,j+.03,.94,.94,.025),(i===7&&j===8)?'coral':(i+j)%2?'teal':'paper',(i+j)%2?.13:1,.35); }
  for(const side of ['ne','nw']) { shape(H,R,[wallPt(H,side,0,.1,-.12),wallPt(H,side,11.9,.1,-.12),wallPt(H,side,11.9,.46,-.12),wallPt(H,side,0,.39,-.12)],'paper',.4,.7);H.line(R,[wallPt(H,side,0,.08,-.17),wallPt(H,side,11.9,.08,-.17)],'teal',3); }
  windowBay(H,R,'ne',3.45,4.38,1.34,2.04,{night:true,divisions:2,view:P=>{for(let n=0;n<5;n++){shape(H,R,[P(.18+n*.8,.15),P(.84+n*.8,.15),P(.84+n*.8,.68+n%2*.45),P(.18+n*.8,.68+n%2*.45)],'teal',.35,.5);for(let k=0;k<3;k++)H.line(R,[P(.34+n*.8,.25+k*.18),P(.49+n*.8,.25+k*.18)],'sun',1.2);} }});
  const W=(u,z)=>wallPt(H,'ne',u,z,-.45);
  H.line(R,[W(3.4,3.5),W(7.9,3.5)],'sun',4);H.line(R,[W(7.83,3.47),W(7.83,2.31)],'paper',.8);
  for(let k=0;k<3;k++) H.line(R,[W(3.48,3.3-k*.1),W(7.8,3.3-k*.1)],'coral',2);
  box(H,R,.22,.45,1.65,6.09,.11,.92,'teal',.57);
  for(let n=0;n<4;n++){const j=.58+n*1.44;shape(H,R,H.faceJ(1.885,j,1.26,.24,.91),'teal',.43,.8);shape(H,R,H.faceJ(1.9,j+.14,.98,.37,.8),'teal',.22,.65);H.line(R,[H.p(1.92,j+.83,.73),H.p(1.92,j+1.08,.73)],'sun',1.5);}
  timber(H,R,.2,.4,1.8,6.25,1.06,.14,'sun');
  basin(H,R,.42,1.58,1.25,1.61,1.21);
  metal(H,R,.44,4.14,1.2,1.76,1.21,.075,'paper');
  for(const j of [4.55,5.39]) oval(H,R,...H.p(1.04,j,1.3),13,6,'blue',.78);
  vessel(H,R,1.06,4.54,1.31,13,13,'coral');bentTube(H,R,[[1.26,4.54,1.56],[1.84,4.54,1.53]],3,'blue');
  vessel(H,R,.76,5.42,1.31,9,15,'teal',false);
  bentTube(H,R,[[.49,5.42,1.55],[.46,5.42,1.99],[.93,5.42,1.99],[1.02,5.42,1.55]],2,'blue');
  const k=H.p(.84,5.68,1.63);shape(H,R,[[k[0]+3,k[1]],[k[0]+13,k[1]-6],[k[0]+12,k[1]+2],[k[0]+4,k[1]+6]],'teal',.6,.6);
  for(let n=0;n<5;n++){const p=H.p(.7+n*.22,3.45,1.49);oval(H,R,...p,4,14,'paper');H.line(R,[[p[0]-4,p[1]-3],[p[0]+4,p[1]+1]],'sun',.7);}
  metal(H,R,.42,3.19,1.27,.71,1.24,.08,'teal');
  hangingRail(H,R,'nw',.78,5.18,2.16,5,(P,u,n)=>{const p=P(u,-.16);H.line(R,[p,[p[0],p[1]+13]],'sun',1.8);if(n===3){shape(H,R,[[p[0]-8,p[1]+13],[p[0]+5,p[1]+13],[p[0]+9,p[1]+28],[p[0]-8,p[1]+30]],'coral',.7);H.line(R,[[p[0]-5,p[1]+18],[p[0]+5,p[1]+25]],'paper',1);}else oval(H,R,p[0],p[1]+24,7+n%2*3,9+n%2*3,n%2?'teal':'paper',.8);});
  wallRack(H,R,'nw',1.0,4.82,2.61,.86,1,'sun',(P,z)=>{
    for(let n=0;n<4;n++){const q=P(.5+n*.62,z+.14);shape(H,R,[[q[0]-6,q[1]],[q[0]+6,q[1]],[q[0]+6,q[1]-16],[q[0]-6,q[1]-16]],['teal','coral','paper','sun'][n],.7);H.line(R,[[q[0]-6,q[1]-15],[q[0]+6,q[1]-15]],'blue',1.5);}
    const q=P(3.83,z+.15);shape(H,R,[[q[0]-16,q[1]],[q[0]+16,q[1]],[q[0]+16,q[1]-18],[q[0]-16,q[1]-18]],'teal',.7);oval(H,R,q[0]-8,q[1]-9,5,5,'blue');H.line(R,[[q[0]+3,q[1]-14],[q[0]+11,q[1]-14]],'sun',1.5);
  });
  metal(H,R,8.9,.28,1.83,1.56,.1,2.72,'paper');
  H.line(R,[H.p(8.94,1.85,1.97),H.p(10.69,1.85,1.97)],'blue',1);
  for(const z of [.87,2.25]) H.line(R,[H.p(9.16,1.88,z),H.p(9.16,1.88,z+.38)],'teal',2.5);
  for(let n=0;n<6;n++) H.line(R,[H.p(9.12,1.87,.22+n*.045),H.p(10.51,1.87,.22+n*.045)],'blue',.6);
  const heart=H.p(10.03,1.9,1.46);shape(H,R,[[heart[0],heart[1]+6],[heart[0]-9,heart[1]-2],[heart[0]-8,heart[1]-8],[heart[0]-3,heart[1]-9],[heart[0],heart[1]-5],[heart[0]+4,heart[1]-9],[heart[0]+9,heart[1]-6],[heart[0]+8,heart[1]-1]],'coral',.8,.6);
  timber(H,R,8.6,.24,2.72,.97,3.13,.1,'sun');
  for(let n=0;n<3;n++){const q=H.p(8.92+n*.71,.59,3.26);shape(H,R,[[q[0]-7,q[1]],[q[0]+7,q[1]],[q[0]+7,q[1]-17],[q[0]-7,q[1]-17]],'paper',1);oval(H,R,q[0],q[1]-10,3,3,'coral');H.line(R,[[q[0],q[1]-7],[q[0],q[1]-2]],'teal',3);}
  cabinetFrame(H,R,9.0,3.5,2.12,1.12,.1,1.1,2,'sun',(i,j,w,d,z,h,n)=>{if(n)for(let k=0;k<3;k++)box(H,R,i+.06,j+.12,.72,.67,.26+k*.17,.12,'paper',1);else{box(H,R,i+.05,j+.12,.78,.71,.25,.4,'teal',.55);H.line(R,[H.p(i+.13,j+.84,.59),H.p(i+.72,j+.84,.59)],'sun',1);}});
  vessel(H,R,10.45,4.12,1.24,9,25,'paper');H.line(R,[H.p(10.39,4.12,1.53),H.p(10.49,4.12,1.78)],'coral',1.3);
  for(let n=0;n<5;n++)H.line(R,[H.p(10.2+n*.07,3.63,1.26),H.p(10.2+n*.07,4.26,1.26)],'teal',2);
  recessedFrame(H,R,'nw',8.01,3.09,.09,3.48,'paper',P=>{shape(H,R,[P(.16,.13),P(2.91,.13),P(2.91,3.3),P(.16,3.3)],'blue',.82);shape(H,R,[P(.36,.13),P(2.63,.13),P(2.63,3.25),P(.36,3.25)],'teal',.3);});
  timber(H,R,.2,8.0,.73,3.2,.07,.12,'paper');
  shape(H,R,H.tile(.84,8.4,1.59,2.16,.04),'blue',.58);
  for(const j of [8.72,9.42]) {oval(H,R,...H.p(1.53,j,.08),12,6,'coral',.6);H.line(R,[H.p(1.29,j,.11),H.p(1.57,j,.11)],'sun',2);}
  box(H,R,2.69,9.37,.84,.64,.05,.9,'teal',.62);bentTube(H,R,[[2.79,9.55,.94],[2.79,9.55,1.2],[3.27,9.55,1.2],[3.27,9.55,.94]],1.7,'sun');
  drape(H,R,2.67,9.38,.81,.61,1.0,.3,'coral');
  slattedSeat(H,R,4.34,8.19,1.18,.05,'sun',.71);
  metal(H,R,4.59,8.91,.17,.17,.05,.32,'teal');
  slattedSeat(H,R,8.13,6.2,1.1,.05,'sun',.71);
  floorLight(H,6.0,6.7,148,.67);
  bentTube(H,R,[[4.24,5.63,1.26],[4.24,5.18,1.12],[4.21,5.18,.05],[6.88,8.24,.05],[7.7,8.24,.05]],.9,'blue');
  for(const [i,j] of [[4.3,5.36],[5.12,6.31],[6.08,7.41],[7.3,8.24]]) metal(H,R,i,j,.09,.12,.035,.035,'coral');
},(H,R,t)=>{
  const u=((t%16)+16)%16,lift=.36*ease(3.2,6.4,u)*(1-ease(6.4,9.6,u)),greet=ease(9.6,11.5,u)*(1-ease(12.1,14,u));
  const p=H.p(5.75,5.7,1.34+lift),target=[p[0],p[1]-15],origin=H.p(5.46,5.0,0),sc=1.35;
  const dx=-(target[0]-origin[0])/sc-5.2,dy=(target[1]-origin[1])/sc+32.5,r=Math.min(8.5,Math.hypot(dx,dy)),e=Math.acos(Math.max(-1,Math.min(1,(r*r-4.368**2-4.2**2)/(2*4.368*4.2))));
  rig.ar=(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(e),4.368+4.2*Math.cos(e)))*180/Math.PI;rig.er=e*180/Math.PI;rig.head=13-32*greet;
  let hands;
  actor(H,R,5.46,5.0,t,'london-kitchen-cover',{shirt:['sun',.74],apron:['coral',.52],face:'sw',hairStyle:'bun',skin:['coral',.49],prop:(HH,RR,p)=>{hands=p}},0,sc);
  mealTable(H,R);
  const elbow=hands.D.pt([5.2+Math.sin(rig.ar*Math.PI/180)*4.368,-32.5+Math.cos(rig.ar*Math.PI/180)*4.368]);
  H.line(R,[elbow,hands.nearHand],'blue',4.2);H.line(R,[elbow,hands.nearHand],'sun',2.6);
  oval(H,R,...hands.nearHand,2.5,2.2,'coral',.49);
  shape(H,R,[[p[0]-18,p[1]],[p[0]-16,p[1]-8],[p[0]-7,p[1]-13],[p[0]+7,p[1]-13],[p[0]+16,p[1]-8],[p[0]+18,p[1]]],'paper',1);
  oval(H,R,p[0],p[1],18,6,'paper',1);H.line(R,[[p[0]-15,p[1]],[p[0]+15,p[1]]],'sun',1);
  oval(H,R,p[0],p[1]-15,3.3,2.4,'teal');
  H.line(R,[H.p(10.3,4.12,1.5),H.p(10.3+Math.sin(u*Math.PI/8)*.035,4.12,1.76)],'paper',1.3);
  actor(H,R,.94+greet*.15,9.42-greet*.2,t,'london-kitchen-arrival',{shirt:['coral',.68],face:'se',hairStyle:'curly',skin:['coral',.32]},0,1.45);
});
room.loopSeconds=16;
room.stillTime=11.7;
export default room;
