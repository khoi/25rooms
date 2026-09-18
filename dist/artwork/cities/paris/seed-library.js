import { world, shape, oval, stroke, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, benchFrame, vessel, drape, branchSpray } from '../materials.js';
import { windowBay, wallCourse, hangingRail, floorShadow, specimen, recessedFrame } from '../joinery.js';
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
  recessedFrame(H,R,'nw',6.4,4.74,1.05,2.18,'sun',P=>{
    shape(H,R,[P(.12,.12),P(4.6,.12),P(4.6,2.03),P(.12,2.03)],'teal',.16,.55);
    for(const u of [.32,2.04,3.49])H.line(R,[P(u,1.81),P(u,1.6)],'blue',2);
    const bundle=P(.9,1.4);for(let k=0;k<3;k++)branchSpray(H,R,bundle[0]+k*4,bundle[1]+k*2,.67,'teal',k%2?-1:1);
    H.line(R,[P(.55,1.4),P(.85,1.41)],'coral',2.2);
    shape(H,R,[P(1.71,.42),P(2.87,.42),P(2.91,1.64),P(1.76,1.64)],'paper',.66,.6);
    for(let n=0;n<8;n++){H.line(R,[P(1.78+n*.14,.44),P(1.78+n*.14,1.61)],'teal',.55);H.line(R,[P(1.77,.49+n*.14),P(2.87,.49+n*.14)],'teal',.55);}
    for(let n=0;n<3;n++){const q=P(2.0+n*.28,.85+n%2*.26);pod(H,R,...q,true,n*.5);}
    shape(H,R,[P(3.17,.25),P(4.35,.25),P(4.35,1.5),P(3.17,1.5)],'paper',1,.6);
    branchSpray(H,R,...P(3.65,.46),.81,'teal');
    H.line(R,[P(3.31,1.29),P(3.52,1.29)],'coral',2.6);
    for(const u of [3.48,3.78,4.06])H.line(R,[P(u,.31),P(u,.6)],'sun',1.6);
  });
  benchFrame(H,R,.39,6.46,1.21,4.2,.87,'teal');
  for(let n=0;n<3;n++){
    const j=6.71+n*1.23;timber(H,R,.5,j,.97,1.01,.22,.12,'sun');
    shape(H,R,H.faceJ(1.49,j+.03,.95,.35,.64),'teal',.45,.6);
    H.line(R,[H.p(1.51,j+.23,.53),H.p(1.51,j+.65,.53)],'sun',1.6);
  }
  drape(H,R,.52,7.64,.91,.64,.89,.27,'paper');
  for(let n=0;n<3;n++){timber(H,R,.57,6.67+n*.2,.75,.12,.89,.11,'sun');}
  const mould=H.p(1.08,9.65,.91);shape(H,R,[[mould[0]-11,mould[1]-6],[mould[0]+12,mould[1]+2],[mould[0]+8,mould[1]+9],[mould[0]-15,mould[1]+1]],'blue',.67,.7);
  H.line(R,[[mould[0]-4,mould[1]-1],[mould[0]-4,mould[1]-14],[mould[0]+6,mould[1]-11],[mould[0]+6,mould[1]+3]],'teal',2.5);
  H.tint(H.tile(.5,4.1,6.3,5.3,.025),'sun',.19);
  for(let n=0;n<6;n++)H.line(R,[wallPt(H,'ne',10.35+n*.18,2.98,-.15),wallPt(H,'ne',10.35+n*.18,3.2,-.15)],'blue',1.7);
  hangingRail(H,R,'ne',1.3,6.05,3.12,6,(P,u,n)=>{
    const p=P(u,-.48);stroke(H,R,[P(u,-.14),p],'blue',.7);pod(H,R,...p,n%2===0,.6+n*.3);
    if(n===3){shape(H,R,[P(u-.25,-.18),P(u+.29,-.18),P(u+.25,-.93),P(u-.21,-.9)],'paper',.6,.6);for(let k=0;k<5;k++)H.line(R,[P(u-.22,-.25-k*.13),P(u+.25,-.25-k*.13)],'teal',.5);}
  });
  vessel(H,R,.94,1.57,0,25,44,'teal');
  const barrel=H.p(.94,1.57,0);
  for(const dy of [-31,-13]){H.line(R,[[barrel[0]-24,barrel[1]+dy],[barrel[0],barrel[1]+dy+5],[barrel[0]+24,barrel[1]+dy]],'sun',2.4);}
  oval(H,R,barrel[0],barrel[1]-45,25,8,'teal',.65);oval(H,R,barrel[0]+5,barrel[1]-46,4,2,'blue',.8);
  for(let n=0;n<4;n++)H.line(R,[[barrel[0]-17+n*11,barrel[1]-40],[barrel[0]-16+n*10,barrel[1]-5]],'paper',.6);
  bentTube(H,R,[[.34,.19,2.97],[.34,.19,1.43],[.65,.89,1.25]],3,'teal');
  for(const z of [1.69,2.62])metal(H,R,.23,.13,.22,.16,z,.1,'sun');
  metal(H,R,1.34,1.99,.87,.66,.015,.055,'teal');
  for(let n=0;n<5;n++)H.line(R,[H.p(1.43+n*.14,2.07,.08),H.p(1.43+n*.14,2.56,.08)],'blue',1);
const tap=H.p(1.55,1.9,.25);H.line(R,[tap,[tap[0]+11,tap[1]],[tap[0]+11,tap[1]+6]],'blue',2.1);
  floorShadow(H,1.85,2.46,4.9,1.9,.24);
  cabinetFrame(H,R,1.8,2.35,4.9,1.5,.12,2.65,3,'sun',(x,j,w,d,z,h,col)=>{
    for(let row=0;row<4;row++){
      const zz=z+row*.58;timber(H,R,x,j,w,d,zz,.09,'sun');
      if(row===3&&col===1){
        shape(H,R,H.faceI(x+.03,j+d-.03,w-.06,zz+.1,zz+.53),'blue',.61,.6);
        for(let n=0;n<3;n++){
          timber(H,R,x+.08+n*.43,j+.24,.37,.68,zz+.11,.13,'teal');
          const q=H.p(x+.27+n*.43,j+.64,zz+.26);pod(H,R,...q,n===1,n*.4);
        }
        continue;
      }
      if(row===1){shape(H,R,H.faceI(x+.03,j+d-.03,w-.06,zz+.1,zz+.55),'blue',.65,.65);continue;}
      shape(H,R,H.faceI(x+.03,j+d-.03,w-.06,zz+.1,zz+.53),'sun',.55,.65);
      const p=H.p(x+w/2,j+d,zz+.34);oval(H,R,...p,5,2.7,'blue',.7);H.line(R,[[p[0]-4,p[1]-2],[p[0]+4,p[1]-2]],'paper',.8);
      shape(H,R,H.faceI(x+.18,j+d+.015,.33,zz+.38,zz+.47),'paper',1,.35);
    }
  });
  timber(H,R,1.73,2.27,5.04,1.65,2.76,.16,'sun');
  for(const x of [1.9,6.41]){
    shape(H,R,[H.p(x,2.3,2.96),H.p(x+.19,2.3,2.96),H.p(x+.19,2.3,3.38),H.p(x,2.3,3.38)],'teal',.54,.7);
    H.line(R,[H.p(x+.1,2.31,3.21),H.p(x+.1,3.5,2.97)],'sun',2.1);
  }
  timber(H,R,1.93,2.25,4.66,.13,3.28,.12,'sun');
  for(let n=0;n<9;n++)H.line(R,[H.p(2.07+n*.52,2.26,3.29),H.p(2.07+n*.52,2.26,3.07)],'teal',.8);
  for(let n=0;n<3;n++)packet(H,R,2.1+n*.75,2.6,2.94,n===1?'teal':'paper');
  metal(H,R,5.0,2.48,1.25,.9,2.93,.08,'teal');for(let n=0;n<6;n++)H.line(R,[H.p(5.1+n*.18,2.55,3.02),H.p(5.1+n*.18,3.3,3.02)],'paper',.7);
  for(const x of [2.12,6.25]){bentTube(H,R,[[x,3.72,.88],[x,3.96,.88]],2.3,'teal');metal(H,R,x-.06,3.82,.12,.14,.77,.21,'teal');}
  for(const z of [.4,1.51,2.23]){
    shape(H,R,H.faceJ(6.78,2.54,1.06,z,z+.41),'teal',.4,.7);
    H.line(R,[H.p(6.8,2.57,z+.35),H.p(6.8,3.51,z+.35)],'sun',1.3);
    for(let n=0;n<3;n++)shape(H,R,H.faceJ(6.79,2.62+n*.25,.19,z+.13,z+.58+n%2*.11),'paper',1,.45);
  }
  timber(H,R,8.42,1.08,2.64,4.43,.32,.09,'sun');
  for(let n=0;n<3;n++)vessel(H,R,8.85+n*.87,4.92,.42,11,18,'coral');
  benchFrame(H,R,8.25,.85,2.95,4.95,1.23,'teal');
  metal(H,R,8.45,2.27,2.54,2.06,1.23,.12,'sun');
  shape(H,R,H.tile(8.61,2.43,2.21,1.73,1.36),'blue',.64,.6);
  shape(H,R,[H.p(8.74,2.63,1.37),H.p(10.42,2.57,1.37),H.p(10.65,3.74,1.37),H.p(9.74,4.03,1.37),H.p(8.77,3.91,1.37)],'coral',.28,.45);
  for(let n=0;n<7;n++){const p=H.p(9.02+(n%3)*.52,2.87+Math.floor(n/3)*.37,1.38);oval(H,R,...p,3.8,1.8,'sun',.5);}
  const sieve=(a,b)=>H.p(8.56+a,2.46+b,1.41+a*.25);
  shape(H,R,[sieve(0,0),sieve(1.12,0),sieve(1.12,1.47),sieve(0,1.47)],'teal',.18,.8);
  for(let n=0;n<7;n++){H.line(R,[sieve(.06+n*.16,.06),sieve(.06+n*.16,1.4)],'paper',.75);H.line(R,[sieve(.04,.08+n*.21),sieve(1.06,.08+n*.21)],'blue',.55);}
  H.outline(R,[sieve(0,0),sieve(1.12,0),sieve(1.12,1.47),sieve(0,1.47)],'sun',3.2,{amp:.1});
  bentTube(H,R,[[9.69,2.84,1.68],[9.94,2.84,1.68],[9.94,3.42,1.68],[9.69,3.42,1.68]],1.6,'teal');
  for(let n=0;n<4;n++)timber(H,R,8.48+n*.59,4.44,.48,1.12,1.24,.09,'sun');
  const trowel=H.p(9.3,5.09,1.34);H.line(R,[[trowel[0]-7,trowel[1]-9],[trowel[0]+3,trowel[1]+1]],'sun',4);shape(H,R,[[trowel[0]+1,trowel[1]-2],[trowel[0]+11,trowel[1]+2],[trowel[0]+14,trowel[1]+11],[trowel[0]+4,trowel[1]+8]],'teal',.72,.7);
  timber(H,R,8.55,1.42,2.37,.14,.48,.48,'sun');
  for(let n=0;n<5;n++)timber(H,R,8.55,1.65+n*.35,2.37,.16,.5,.11,'teal');
  shape(H,R,H.faceI(8.56,3.33,2.36,.46,.97),'sun',.33,.65);
  for(let n=0;n<3;n++)H.line(R,[H.p(8.65,3.34,.56+n*.13),H.p(10.8,3.34,.56+n*.13)],'blue',1);
  for(let n=0;n<4;n++)vessel(H,R,8.67+n*.62,1.36,1.27,8,13+n%2*4,'coral');
  for(let n=0;n<6;n++)bentTube(H,R,[[8.43+n*.43,.72,1.22],[8.43+n*.43,.72,3.38]],1.3,'teal');
  for(let n=0;n<4;n++)bentTube(H,R,[[8.4,.72,1.35+n*.58],[10.83,.72,1.35+n*.58]],1.2,'sun');
  for(const p of [[9.2,.73,2.1],[10.1,.73,2.5],[10.7,.73,1.72]])branchSpray(H,R,...H.p(...p),.55,'teal',p[0]<10?-1:1);
  timber(H,R,.85,8.6,4.8,2.05,.03,.4,'sun');shape(H,R,H.tile(1.02,8.77,4.46,1.71,.44),'blue',.56,.6);
  bentTube(H,R,[[1.15,8.92,.44],[1.4,8.92,1.35],[3.06,8.92,1.35],[3.31,8.92,.44]],1.6,'teal');
  drape(H,R,1.13,8.94,2.2,.46,1.35,.44,'paper');
  for(const j of [8.71,10.56]){
    for(let n=0;n<3;n++)H.line(R,[H.p(1.07,j,.15+n*.09),H.p(5.47,j,.15+n*.09)],'coral',.7);
    for(const x of [1.09,5.4])metal(H,R,x,j,.14,.12,.04,.38,'teal');
  }
  timber(H,R,3.33,8.8,.09,1.65,.45,.19,'sun');
  for(const [x,j,h] of [[1.69,9.64,.71],[2.75,9.73,.9],[4.26,9.14,.8],[4.82,9.88,.57]]){
    const b=H.p(x,j,.46),tip=H.p(x,j,.46+h);
    H.line(R,[b,tip],'sun',2);
    for(let n=0;n<3;n++){
      const z=.59+n*h*.26,side=n%2?-1:1,q=H.p(x,j,z),end=H.p(x+side*.49,j+.12,z+.16);
      shape(H,R,[q,[q[0]+side*7,q[1]-12],end,[q[0]+side*7,q[1]+2]],'teal',.67,.7);
      H.line(R,[q,end],'paper',.9);
    }
    oval(H,R,...b,5,2,'sun',.35);
  }
  bentTube(H,R,[[4.7,8.97,.48],[4.7,8.97,1.7]],1.6,'sun');
  H.line(R,[H.p(4.65,8.94,1.12),H.p(4.79,9.06,1.12)],'coral',2.2);
  const stone=H.p(2.18,10.77,.02);oval(H,R,...stone,9,5,'paper',1);H.line(R,[[stone[0]-5,stone[1]],[stone[0]+1,stone[1]-3],[stone[0]+6,stone[1]+1]],'teal',1.3);
  const tiny=H.p(3.44,10.96,.03);H.line(R,[[tiny[0]-8,tiny[1]-4],[tiny[0]+3,tiny[1]+2]],'coral',3);shape(H,R,[[tiny[0]+1,tiny[1]],[tiny[0]+10,tiny[1]+2],[tiny[0]+13,tiny[1]+8],[tiny[0]+4,tiny[1]+7]],'sun',.7,.6);
  benchFrame(H,R,7.05,8.63,3.24,1.3,.68,'sun');for(let n=0;n<3;n++)packet(H,R,7.22+n*.76,8.8,.7,n===1?'sun':'paper');
  timber(H,R,7.18,8.81,2.97,.94,.26,.09,'teal');
  for(let n=0;n<3;n++){
    timber(H,R,7.29+n*.85,8.87,.7,.69,.37,.2,'sun');
    H.line(R,[H.p(7.43+n*.85,9.57,.48),H.p(7.81+n*.85,9.57,.48)],'blue',1.5);
  }
  const basket=H.p(10.74,7.81,.04);oval(H,R,...basket,23,10,'sun',.6);shape(H,R,[[basket[0]-23,basket[1]-16],[basket[0]+23,basket[1]-16],[basket[0]+19,basket[1]+1],[basket[0]-19,basket[1]+1]],'sun',.6,.8);oval(H,R,basket[0],basket[1]-16,23,9,'blue',.5);
  for(let n=0;n<7;n++)H.line(R,[[basket[0]-19+n*6,basket[1]-12],[basket[0]-16+n*5,basket[1]+2]],'paper',.8);
  stroke(H,R,[[basket[0]-18,basket[1]-14],[basket[0]-13,basket[1]-34],[basket[0]+9,basket[1]-39],[basket[0]+20,basket[1]-17]],'sun',3);
  for(let n=0;n<3;n++)pod(H,R,basket[0]-12+n*10,basket[1]-15+n%2*3,true,-.5+n*.4);
  const spoon=H.p(9.97,9.19,.71);stroke(H,R,[[spoon[0]-8,spoon[1]-4],[spoon[0]+6,spoon[1]+3]],'sun',3.5);oval(H,R,spoon[0]+8,spoon[1]+4,4.5,2.5,'paper',1);
  vessel(H,R,6.75,9.87,0,13,14,'coral');branchSpray(H,R,...H.p(6.75,9.87,.45),.37,'teal');
  const pot=H.p(10.78,5.23,1.24);vessel(H,R,10.78,5.23,1.24,11,16,'coral');H.line(R,[[pot[0]-10,pot[1]-7],[pot[0]+10,pot[1]-7]],'blue',1.6);H.line(R,[[pot[0]+4,pot[1]-16],[pot[0]+4,pot[1]]],'paper',.7);
  const snail=H.p(.44,5.45,1.27);oval(H,R,...snail,5,3.8,'sun',.8);stroke(H,R,[[snail[0]-3,snail[1]],[snail[0]-1,snail[1]-2],[snail[0]+2,snail[1]],[snail[0],snail[1]+1]],'blue',.6);
},(H,R,t)=>{
  const u=((t%20)+20)%20,open=ease(0,4,u)*(1-ease(15.7,18,u)),lift=ease(4,8,u)*(1-ease(12,15.3,u)),j=2.45+open*1.38;
  const visible=Math.max(3.86,j),depth=Math.max(.015,j+1.4-visible);
  timber(H,R,2.15,visible,4.15,depth,.85,.09,'sun');
  shape(H,R,H.tile(2.26,visible,3.92,depth,.95),'teal',.29,.5);
  for(const x of [2.18,6.18]){metal(H,R,x,visible,.065,depth,.82,.085,'teal');metal(H,R,x-.03,j+1.42,.12,.12,.83,.12,'coral');H.line(R,[H.p(x,visible,.91),H.p(x,visible+depth,.91)],'paper',.8);}
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
