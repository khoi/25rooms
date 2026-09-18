import { world, shape, oval, stroke, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, benchFrame, vessel, drape, branchSpray } from '../materials.js';
import { windowBay, wallCourse, hangingRail, floorShadow, specimen } from '../joinery.js';
import { cabinetFrame, basin } from '../structure.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function pod(H,R,x,y,long=false,angle=0){
  const P=(a,b)=>[x+a*Math.cos(angle)-b*Math.sin(angle),y+a*Math.sin(angle)+b*Math.cos(angle)];
  shape(H,R,[[-11,0],[-6,-5],[3,long?-7:-4],[long?17:9,0],[3,4],[-6,4]].map(p=>P(...p)),long?'teal':'sun',.68,.7);
  stroke(H,R,[P(-10,0),P(0,-1),P(long?16:8,0)],'blue',.7);
  for(let n=0;n<(long?5:3);n++)oval(H,R,...P(-5+n*4,0),1.8,2.3,'paper',.5);
}
function gardener(H,R,i,j,hands,ink,lean=0){
  const [x,y]=H.p(i,j,0),cx=x+lean;oval(H,R,x,y,15,4,'blue',.16);
  for(const k of [-1,1]){stroke(H,R,[[x+k*5,y-24],[x+k*6,y-3]],'blue',7);oval(H,R,x+k*6+2,y-1,6,3,'blue',.85);}
  shape(H,R,[[cx-11,y-49],[cx+10,y-49],[x+10,y-23],[x-10,y-23]],ink,.7,.8);
  shape(H,R,[[cx-6,y-41],[cx+6,y-41],[x+8,y-18],[x-8,y-18]],'paper',.82,.6);
  for(let n=0;n<2;n++){const a=[cx+(n?9:-9),y-45],b=hands[n];stroke(H,R,[a,[(a[0]+b[0])/2,Math.max(a[1],b[1])+7],b],'blue',8);stroke(H,R,[a,[(a[0]+b[0])/2,Math.max(a[1],b[1])+7],b],ink,5.6);oval(H,R,...b,3,2.8,'paper',1);}
  oval(H,R,cx,y-60,9,10,'paper',1);shape(H,R,[[cx-10,y-58],[cx-10,y-68],[cx,y-73],[cx+8,y-69],[cx+10,y-62],[cx+2,y-65],[cx-3,y-62]],ink==='teal'?'blue':'sun',.82,.8);H.dot(cx+4,y-60,.9,'blue');
}
function packet(H,R,i,j,z,ink='paper'){const P=H.tile(i,j,.57,.72,z);shape(H,R,P,ink,ink==='paper'?1:.65,.6);H.line(R,[P[0],H.p(i+.285,j+.38,z+.006),P[1]],'blue',.6);H.line(R,[P[3],H.p(i+.285,j+.38,z+.006),P[2]],'sun',.8);}
const room=world('paris-seed-library','A drawer for next spring',{floor:'paper',wall:'paper',wallTone:.85,height:3.65,head: 20,pattern:'tiles'},(H,R)=>{
  wallCourse(H,R,'ne',.15,11.7,.58,'teal');wallCourse(H,R,'nw',.15,11.7,.58,'teal');
  shape(H,R,[wallPt(H,'nw',6.9,.05,-.14),wallPt(H,'nw',10.1,.05,-.14),wallPt(H,'nw',10.1,.64,-.14),wallPt(H,'nw',9.05,.77,-.14),wallPt(H,'nw',8.6,.61,-.14),wallPt(H,'nw',6.9,.67,-.14)],'sun',.3,.6);
  windowBay(H,R,'nw',2.8,3.0,1.25,2.07,{divisions:2,view:P=>{
    shape(H,R,[P(.15,.15),P(2.85,.15),P(2.85,.73),P(.15,.51)],'teal',.2,.5);for(let n=0;n<5;n++)stroke(H,R,[P(.25+n*.57,.15),P(.4+n*.57,.75),P(.25+n*.57,1.45-n%2*.4)],'teal',1.5);
  }});
  H.tint(H.tile(.5,4.1,6.3,5.3,.025),'sun',.19);
  for(let n=0;n<6;n++)H.line(R,[wallPt(H,'ne',10.35+n*.18,2.98,-.15),wallPt(H,'ne',10.35+n*.18,3.2,-.15)],'blue',1.7);
  hangingRail(H,R,'ne',1.3,6.05,3.12,6,(P,u,n)=>{
    const p=P(u,-.48);stroke(H,R,[P(u,-.14),p],'blue',.7);pod(H,R,...p,n%2===0,.6+n*.3);
    if(n===3){shape(H,R,[P(u-.25,-.18),P(u+.29,-.18),P(u+.25,-.93),P(u-.21,-.9)],'paper',.6,.6);for(let k=0;k<5;k++)H.line(R,[P(u-.22,-.25-k*.13),P(u+.25,-.25-k*.13)],'teal',.5);}
  });
  vessel(H,R,.94,1.57,0,25,44,'teal');const tap=H.p(1.55,1.9,.25);H.line(R,[tap,[tap[0]+11,tap[1]],[tap[0]+11,tap[1]+6]],'blue',2.1);
  floorShadow(H,1.85,2.46,4.9,1.9,.24);
  cabinetFrame(H,R,1.8,2.35,4.9,1.5,.12,2.65,3,'sun',(x,j,w,d,z,h,col)=>{
    for(let row=0;row<4;row++){
      const zz=z+row*.58;timber(H,R,x,j,w,d,zz,.09,'sun');
      if(row===1){shape(H,R,H.faceI(x+.03,j+d-.03,w-.06,zz+.1,zz+.55),'blue',.65,.65);continue;}
      shape(H,R,H.faceI(x+.03,j+d-.03,w-.06,zz+.1,zz+.53),'sun',.55,.65);
      const p=H.p(x+w/2,j+d,zz+.34);oval(H,R,...p,5,2.7,'blue',.7);H.line(R,[[p[0]-4,p[1]-2],[p[0]+4,p[1]-2]],'paper',.8);
      shape(H,R,H.faceI(x+.18,j+d+.015,.33,zz+.38,zz+.47),'paper',1,.35);
    }
  });
  timber(H,R,1.73,2.27,5.04,1.65,2.76,.16,'sun');
  for(let n=0;n<3;n++)packet(H,R,2.1+n*.75,2.6,2.94,n===1?'teal':'paper');
  metal(H,R,5.0,2.48,1.25,.9,2.93,.08,'teal');for(let n=0;n<6;n++)H.line(R,[H.p(5.1+n*.18,2.55,3.02),H.p(5.1+n*.18,3.3,3.02)],'paper',.7);
  for(const x of [2.12,6.25]){bentTube(H,R,[[x,3.92,.88],[x,5.32,.88]],2.3,'teal');metal(H,R,x-.06,5.31,.12,.14,.77,.21,'coral');}
  timber(H,R,8.42,1.08,2.64,4.43,.32,.09,'sun');
  for(let n=0;n<3;n++)vessel(H,R,8.85+n*.87,4.92,.42,11,18,'coral');
  benchFrame(H,R,8.25,.85,2.95,4.95,1.23,'teal');
  metal(H,R,8.45,2.27,2.54,2.06,1.23,.12,'sun');shape(H,R,H.tile(8.62,2.43,2.2,1.73,1.36),'blue',.66,.6);
  for(let n=0;n<5;n++)H.line(R,[H.p(8.63+n*.43,2.44,1.38),H.p(8.63+n*.43,4.14,1.38)],'teal',.6);
  metal(H,R,8.53,2.54,1.03,1.23,1.4,.07,'teal');for(let n=0;n<6;n++){H.line(R,[H.p(8.6+n*.16,2.6,1.49),H.p(8.6+n*.16,3.71,1.49)],'paper',.5);H.line(R,[H.p(8.6,2.61+n*.2,1.49),H.p(9.5,2.61+n*.2,1.49)],'paper',.5);}
  for(let n=0;n<4;n++)vessel(H,R,8.67+n*.62,1.36,1.27,8,13+n%2*4,'coral');
  for(let n=0;n<6;n++)bentTube(H,R,[[8.43+n*.43,.72,1.22],[8.43+n*.43,.72,3.38]],1.3,'teal');
  for(let n=0;n<4;n++)bentTube(H,R,[[8.4,.72,1.35+n*.58],[10.83,.72,1.35+n*.58]],1.2,'sun');
  for(const p of [[9.2,.73,2.1],[10.1,.73,2.5],[10.7,.73,1.72]])branchSpray(H,R,...H.p(...p),.55,'teal',p[0]<10?-1:1);
  timber(H,R,.85,8.6,4.8,2.05,.03,.4,'sun');shape(H,R,H.tile(1.02,8.77,4.46,1.71,.44),'blue',.56,.6);
  bentTube(H,R,[[1.15,8.92,.44],[1.4,8.92,1.35],[3.06,8.92,1.35],[3.31,8.92,.44]],1.6,'teal');
  drape(H,R,1.13,8.94,2.2,.46,1.35,.44,'paper');
  for(let n=0;n<4;n++){const p=H.p(1.55+n*1.02,9.46,.46);branchSpray(H,R,...p,.56+n%2*.12,'teal',n%2?-1:1);}
  benchFrame(H,R,7.05,8.63,3.24,1.3,.68,'sun');for(let n=0;n<3;n++)packet(H,R,7.22+n*.76,8.8,.7,n===1?'sun':'paper');
  const spoon=H.p(9.97,9.19,.71);stroke(H,R,[[spoon[0]-8,spoon[1]-4],[spoon[0]+6,spoon[1]+3]],'sun',3.5);oval(H,R,spoon[0]+8,spoon[1]+4,4.5,2.5,'paper',1);
  vessel(H,R,6.75,9.87,0,13,14,'coral');branchSpray(H,R,...H.p(6.75,9.87,.45),.37,'teal');
  const pot=H.p(10.78,5.23,1.24);vessel(H,R,10.78,5.23,1.24,11,16,'coral');H.line(R,[[pot[0]-10,pot[1]-7],[pot[0]+10,pot[1]-7]],'blue',1.6);H.line(R,[[pot[0]+4,pot[1]-16],[pot[0]+4,pot[1]]],'paper',.7);
  const snail=H.p(.44,5.45,1.27);oval(H,R,...snail,5,3.8,'sun',.8);stroke(H,R,[[snail[0]-3,snail[1]],[snail[0]-1,snail[1]-2],[snail[0]+2,snail[1]],[snail[0],snail[1]+1]],'blue',.6);
},(H,R,t)=>{
  const u=((t%20)+20)%20,open=ease(0,4,u)*(1-ease(15.7,18,u)),lift=ease(4,8,u)*(1-ease(12,15.3,u)),j=2.45+open*1.38;
  const visible=Math.max(3.86,j),depth=Math.max(.015,j+1.4-visible);
  timber(H,R,2.15,visible,4.15,depth,.85,.09,'sun');
  shape(H,R,H.tile(2.26,visible,3.92,depth,.95),'teal',.29,.5);
  for(let n=1;n<4;n++)timber(H,R,2.2+n*1.01,visible,.055,depth,.95,.19,'sun');
  timber(H,R,2.15,j+1.4,4.15,.13,.85,.31,'sun');
  for(let n=0;n<4;n++){const p=H.p(2.72+n*1.01,j+1.55,1.01);oval(H,R,...p,5,2.4,'blue',.65);}
  if(j+.68>3.86)for(const [n,long] of [[0,false],[1,true],[2,false],[3,true]]){if((n===1||n===2)&&lift>.01)continue;const p=H.p(2.72+n*1.01,j+.68,.98);pod(H,R,...p,long,n%2*.4);}
  const reach=ease(3.2,4,u)*(1-ease(15.3,15.7,u)),touch=j+1.44-reach*.76;
  const p1=H.p(3.73,touch,.98+lift*.15),p2=H.p(4.74,touch,.98+lift*.15);
  gardener(H,R,4.0,4.0+open*1.3,[H.p(3.35,j+1.48,1.08),p1],'teal',lift*2);
  gardener(H,R,5.6,4.3+open*1.3,[p2,H.p(6.21,j+1.46,1.07)],'coral',-lift*3);
  if(lift>.01){pod(H,R,...p1,true,.4);pod(H,R,...p2,false);}
  const a=Math.sin(u*Math.PI/10)*.15,p=wallPt(H,'ne',6.88,2.65,-.33);pod(H,R,...p,true,a);
});
room.loopSeconds=20;
room.stillTime=9.5;
export default room;
