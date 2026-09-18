import { world, actor, shape, oval, stroke, ell, cycle, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, drape, benchFrame, bentTube, caneChair, cushion } from '../materials.js';
import { masonry, cabinetFrame, rackFrame } from '../structure.js';
import { wallRack, hangingRail, floorShadow, taskLight } from '../joinery.js';

const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
const base=FIGURES.sample('hold',0);
FIGURES.clips['istanbul-chair-fit']={dur:20,keys:[[0,{...base,head:17,lean:-8}],[.2,{...base,head:17,lean:-8}],[.4,{...base,al:83,ar:85,el:22,er:22,head:10,lean:-13}],[.6,{...base,al:83,ar:85,el:22,er:22,head:10,lean:-13}],[.9,{...base,head:17,lean:-8}],[1,{...base,head:17,lean:-8}]]};

function rod(H,R,pts,w=5,ink='sun'){
  bentTube(H,R,pts,w,ink);
  const a=H.p(...pts[0]),b=H.p(...pts.at(-1));H.line(R,[[a[0]+1,a[1]+1],[b[0]+1,b[1]+1]],'coral',.6);
  for(const p of [a,b]){oval(H,R,p[0],p[1],w*.6,w*.33,'sun',.7);H.dot(p[0],p[1],.9,'blue');}
}

const P=(x,y,z)=>[4.05+x,5.35+z,1.43+(1.55-y)];
function chair(H,R){
  for(const x of [0,2.25]){
    rod(H,R,[P(x,0,0),P(x,0,1.32),P(x,0,2.7)],6);
    rod(H,R,[P(x,0,1.27),P(x,1.55,1.27)],6);
  }
  rod(H,R,[P(0,1.55,0),P(0,1.55,1.27)],6);
  for(const y of [0,1.55])rod(H,R,[P(0,y,1.27),P(2.25,y,1.27)],6);
  rod(H,R,[P(0,0,2.72),P(.4,-.1,2.89),P(1.85,-.1,2.89),P(2.25,0,2.72)],6);
  rod(H,R,[P(0,0,1.81),P(2.25,0,1.81)],4);
  for(const x of [.42,.9,1.38,1.85])rod(H,R,[P(x,0,1.8),P(x,-.08,2.79)],3.2);
  for(const y of [.18,1.28])rod(H,R,[P(0,y,.52),P(0,y,1.23)],3.4);
  rod(H,R,[P(.05,.1,.62),P(2.2,.1,.62)],3.5);
  const seat=[P(.14,.15,1.28),P(2.1,.15,1.28),P(2.1,1.38,1.28),P(.14,1.38,1.28)].map(p=>H.p(...p));
  shape(H,R,seat,'sun',.2,.7);H.clip(seat,()=>{for(let n=0;n<11;n++){H.line(R,[H.p(...P(.15+n*.18,.15,1.29)),H.p(...P(.15+n*.18,1.38,1.29))],'coral',.7);H.line(R,[H.p(...P(.14,.2+n*.11,1.29)),H.p(...P(2.1,.2+n*.11,1.29))],'paper',.8);}});
  for(const x of [.15,1.87]){const brace=[P(x,.12,1.24),P(x+.23,.12,1.24),P(x,.5,1.24)].map(p=>H.p(...p));shape(H,R,brace,'blue',.6,.5);}
  const [mx,my]=H.p(...P(2.25,1.55,1.26));oval(H,R,mx,my,7,3.5,'blue',.95);oval(H,R,mx,my,3.2,1.7,'paper',.24);
  for(let n=0;n<5;n++)H.line(R,[H.p(...P(.2+n*.055,1.55,1.27)),H.p(...P(.2+n*.055,1.55,1.4))],'paper',1);
}

function chairBack(H,R,x,y,s,ink){
  stroke(H,R,[[x-s*.7,y],[x-s*.7,y-s*1.55],[x-s*.4,y-s*1.87],[x+s*.4,y-s*1.87],[x+s*.7,y-s*1.55],[x+s*.7,y]],ink,4);
  H.line(R,[[x-s*.7,y-s*.5],[x+s*.7,y-s*.5]],'sun',3);
  for(let n=-2;n<=2;n++)stroke(H,R,[[x+n*s*.2,y-s*.55],[x+n*s*.22,y-s*1.52]],ink,2.4);
}

const room=world('istanbul-chair-repair','The old leg fits',{wall:'paper',wallTone:.72,height:4.15,floor:'paper',tone:.62,head:48},(H,R)=>{
  for(let j=0;j<12;j+=1.2)for(let i=0;i<12;i+=1.75)shape(H,R,H.tile(i+.025,j+.025,1.69,1.14,.02),'paper',1,.5);
  masonry(H,R,'nw',.1,11.8,.05,1.3,'coral',.2);
  for(const x of [.3,11.45])timber(H,R,x,.2,.3,.4,0,4.16,'teal');
  timber(H,R,.3,.2,11.45,.4,4.01,.23,'teal');
  for(const x of [1.2,3.6,6,8.4,10.8])timber(H,R,x,.15,.2,2.4,3.96,.22,'sun');
  bentTube(H,R,[[.35,.12,4.28],[11.65,.12,4.28],[11.65,.18,3.51],[11.78,.32,3.31],[11.78,.32,.1]],3.4,'teal');
  wallRack(H,R,'ne',.76,10.2,1.53,2.29,1,'teal',(Q,z)=>{
    for(let n=0;n<4;n++){const [x,y]=Q(1.03+n*2.25,z+.16);chairBack(H,R,x,y,24,n===2?'coral':'sun');}
  });
  cabinetFrame(H,R,6.75,.52,4.56,1.48,.1,1.28,3,'sun',(x,y,w,d,z,h,n)=>{
    timber(H,R,x,y,w,d,z+.63,.09,'teal');
    if(n===0){for(let k=0;k<4;k++)timber(H,R,x+.13,y+.12+k*.25,w-.26,.16,z+.15,.19,'sun');}
    if(n===1){for(let k=0;k<3;k++)metal(H,R,x+.05,y+.1,w-.1,d-.2,z+.05+k*.3,.21,'teal');}
    if(n===2){vessel(H,R,x+.48,y+.55,z+.14,11,19,'paper',false);drape(H,R,x+.1,y+.2,w-.2,.8,z+.8,.23,'paper');}
  });
  const [miniX,miniY]=H.p(10.25,1.12,1.49);chairBack(H,R,miniX,miniY,8,'sun');H.line(R,[[miniX-6,miniY-2],[miniX+9,miniY+2],[miniX+9,miniY+11]],'sun',2);H.line(R,[[miniX-5,miniY],[miniX-5,miniY+9]],'sun',2);
  rackFrame(H,R,.7,1.38,1.33,4.13,.08,[.3,1.8,3.1],'teal',(x,y,w,d,z,row)=>{
    if(row===0)for(let n=0;n<5;n++)timber(H,R,x+.05+n*.21,y+.08,.14,d-.15,z,.22,'sun');
    if(row===1){for(let n=0;n<3;n++){const [a,b]=H.p(x+.5,y+.7+n*1.05,z);oval(H,R,a,b,16,8,'sun',.45);oval(H,R,a,b,9,4,'paper',1);}}
    if(row===2){for(let n=0;n<4;n++)timber(H,R,x+.06,y+.15+n*.92,w-.1,.62,z,.1,n===1?'coral':'sun');}
  });
  hangingRail(H,R,'nw',6.18,4.8,3.43,5,(Q,u,n)=>{
    const [x,y]=Q(u,-.1);if(n<3){stroke(H,R,[[x-8,y+7],[x-8,y+36],[x+9,y+36],[x+9,y+7]],'blue',2);H.line(R,[[x-13,y+12],[x+13,y+12]],'sun',3);H.line(R,[[x-12,y+33],[x+12,y+33]],'sun',2);H.line(R,[[x+1,y+32],[x+1,y+44]],'blue',1.5);}else{shape(H,R,[[x-13,y+10],[x+12,y+11],[x+10,y+39],[x-11,y+38]],n===3?'sun':'paper',.6,.65);for(let k=-2;k<=2;k++)H.line(R,[[x-10,y+24+k*4],[x+10,y+24+k*4]],'coral',.7);}
  });
  benchFrame(H,R,2.65,4.67,4.25,4.33,1.08,'sun');
  timber(H,R,2.65,4.65,4.25,4.35,1.06,.2,'sun');
  for(const j of [5.15,7.61]){
    timber(H,R,2.88,j,3.62,.4,1.26,.19,'teal');
    for(const i of [3.16,5.71]){timber(H,R,i,j-.04,.42,.49,1.43,.31,'sun');cushion(H,R,i-.03,j-.05,.48,.52,1.74,.1,'paper');}
  }
  chair(H,R);
  const [qx,qy]=H.p(6.45,7.9,1.29);shape(H,R,[[qx-19,qy-3],[qx+19,qy+14],[qx+21,qy+7],[qx-10,qy-8],[qx+2,qy-35],[qx-5,qy-37]],'blue',.65,.7);H.line(R,[[qx-8,qy-4],[qx+10,qy+4]],'paper',.8);
  const [mx,my]=H.p(3,8.7,1.31);H.line(R,[[mx-13,my-11],[mx+10,my+6]],'sun',4);shape(H,R,[[mx-20,my-13],[mx-5,my-21],[mx+4,my-12],[mx-10,my-4]],'coral',.58,.7);
  metal(H,R,6.54,5.15,.18,1.56,1.31,.1,'blue');timber(H,R,6.4,5.35,.5,.24,1.4,.2,'sun');bentTube(H,R,[[6.47,6.48,1.42],[6.95,6.48,1.42]],1.5,'blue');
  benchFrame(H,R,1.13,9.8,3.2,1.46,.6,'teal');
  for(let n=0;n<6;n++){rod(H,R,[[1.42+n*.28,10.04,.67],[1.42+n*.28,10.88,.67]],2.5,'sun');}
  timber(H,R,3.24,10.11,.65,.7,.65,.21,'sun');const [ox,oy]=H.p(3.57,10.45,.88);oval(H,R,ox,oy,5,2.5,'blue',.85);H.line(R,[[ox-12,oy-8],[ox-4,oy-2]],'paper',1);
  caneChair(H,R,9.4,6.6,'teal');cushion(H,R,9.42,6.62,.87,.8,.69,.09,'coral');
  benchFrame(H,R,9.18,8.56,2.1,2.3,.66,'teal');
  for(let n=0;n<4;n++)drape(H,R,9.38+n*.05,8.9+n*.09,1.3,1.3,.7+n*.04,.16,['paper','coral','sun','teal'][n]);
  taskLight(H,R,6.35,8.73,1.32,'coral',-.55);
  for(let n=0;n<8;n++)metal(H,R,9.95+n*.16,10.98,.07,.52,.025,.03,'blue');
  H.light(...H.p(5.2,6.6,0),145,77,.22);
},(H,R,t)=>{
  const u=cycle(t,20)*20,fit=smooth((u-4)/4)*(1-smooth((u-12)/6)),off=-.62*(1-fit);
  rod(H,R,[P(2.25,1.55,off),P(2.25,1.55,.99+off)],6,'sun');
  rod(H,R,[P(2.25,1.55,.99+off),P(2.25,1.55,1.23+off)],3,'sun');
  const [x,y]=H.p(...P(2.25,1.55,.92+off));H.line(R,[[x-5,y+1],[x+5,y-1]],'paper',1.8);
  actor(H,R,7.27,6.1,t,'istanbul-chair-fit',{shirt:['paper',1],apron:['coral',.7],hairStyle:'bun',face:'sw'},0,1.55);
  actor(H,R,9.82,7.07,cycle(t,20)*3,'sit',{shirt:['teal',.65],hairStyle:'bald',glasses:true,face:'sw'},.13,1.4,'elder');
});
room.loopSeconds=20;room.stillTime=10;
export default room;
