import { world, actor, shape, oval, stroke, ell, cycle, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, drape, benchFrame, bentTube, caneChair, cushion } from '../materials.js';
import { masonry, cabinetFrame, rackFrame } from '../structure.js';
import { wallRack, hangingRail, floorShadow, taskLight, recessedFrame } from '../joinery.js';

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
  for(const [x,y] of [[.11,.12],[2.13,.12],[.11,1.4]]){
    const [jx,jy]=H.p(...P(x,y,1.3));oval(H,R,jx,jy,3.1,1.7,'blue',.78);oval(H,R,jx,jy,1.5,.8,'sun',.9);
  }
  const oldRepair=[P(.49,1.47,1.25),P(.89,1.47,1.25),P(.89,1.62,1.25),P(.49,1.62,1.25)].map(p=>H.p(...p));shape(H,R,oldRepair,'teal',.54,.5);
  for(let n=0;n<5;n++)H.line(R,[H.p(...P(.52+n*.07,1.47,1.26)),H.p(...P(.52+n*.07,1.62,1.26))],'paper',.6);
  const [mx,my]=H.p(...P(2.25,1.55,1.26));oval(H,R,mx,my,7,3.5,'blue',.95);oval(H,R,mx,my,3.2,1.7,'paper',.24);
  for(let n=0;n<5;n++)H.line(R,[H.p(...P(.2+n*.055,1.55,1.27)),H.p(...P(.2+n*.055,1.55,1.4))],'paper',1);
}

function chairBack(H,R,x,y,s,ink){
  stroke(H,R,[[x-s*.7,y],[x-s*.7,y-s*1.55],[x-s*.4,y-s*1.87],[x+s*.4,y-s*1.87],[x+s*.7,y-s*1.55],[x+s*.7,y]],ink,4);
  H.line(R,[[x-s*.7,y-s*.5],[x+s*.7,y-s*.5]],'sun',3);
  for(let n=-2;n<=2;n++)stroke(H,R,[[x+n*s*.2,y-s*.55],[x+n*s*.22,y-s*1.52]],ink,2.4);
}

const room=world('istanbul-chair-repair','The old leg fits',{wall:'paper',wallTone:.72,height:4.15,floor:'paper',tone:.62,head:48},(H,R)=>{
  for(let j=0;j<12;j+=1.2)for(let i=0;i<12;i+=1.75)shape(H,R,H.tile(i+.025,j+.025,Math.min(1.69,11.98-i),Math.min(1.14,11.98-j),.02),'paper',1,.5);
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
  recessedFrame(H,R,'nw',6.14,4.83,1.39,1.56,'teal',Q=>{
    const [sx,sy]=Q(1.1,.81);
    shape(H,R,[[sx-24,sy+27],[sx+24,sy+27],[sx+24,sy-27],[sx-24,sy-27]],'paper',1,.7);
    stroke(H,R,[[sx-12,sy+18],[sx-12,sy-17],[sx+9,sy-17],[sx+13,sy+19]],'coral',1.5);
    H.line(R,[[sx-13,sy],[sx+11,sy],[sx+19,sy+6],[sx-5,sy+6],[sx-13,sy]],'teal',1.2);
    for(const [u,ink] of [[2.43,'sun'],[3.2,'coral'],[3.97,'teal']]){
      shape(H,R,[Q(u,.24),Q(u+.56,.24),Q(u+.56,1.22),Q(u,1.22)],ink,.5,.65);
      for(let n=0;n<3;n++)H.line(R,[Q(u+.12+n*.13,.36),Q(u+.14+n*.13,1.09)],'paper',.65);
      H.dot(...Q(u+.28,1.13),1.7,'blue');
    }
  });
  hangingRail(H,R,'nw',6.18,4.8,3.43,5,(Q,u,n)=>{
    const [x,y]=Q(u,-.1);if(n<3){stroke(H,R,[[x-8,y+7],[x-8,y+36],[x+9,y+36],[x+9,y+7]],'blue',2);H.line(R,[[x-13,y+12],[x+13,y+12]],'sun',3);H.line(R,[[x-12,y+33],[x+12,y+33]],'sun',2);H.line(R,[[x+1,y+32],[x+1,y+44]],'blue',1.5);}else{shape(H,R,[[x-13,y+10],[x+12,y+11],[x+10,y+39],[x-11,y+38]],n===3?'sun':'paper',.6,.65);for(let k=-2;k<=2;k++)H.line(R,[[x-10,y+24+k*4],[x+10,y+24+k*4]],'coral',.7);}
  });
  floorShadow(H,2.52,4.6,4.76,4.7,.19);
  benchFrame(H,R,2.65,4.67,4.25,4.33,1.08,'sun');
  timber(H,R,2.78,4.9,4,3.84,.25,.12,'teal');
  for(let n=0;n<4;n++)timber(H,R,3.03+n*.19,5.31,.12,2.13,.38,.16,'sun');
  drape(H,R,4.25,6.28,1.36,1.82,.39,.26,'paper');
  for(const x of [2.83,6.56])timber(H,R,x,4.84,.19,3.97,.78,.27,'sun');
  shape(H,R,H.faceI(3.04,9.02,1.53,.58,.99),'teal',.6,.65);
  bentTube(H,R,[[3.51,9.06,.79],[4.06,9.06,.79]],1.7,'sun');
  timber(H,R,4.83,8.69,1.56,1.04,.66,.07,'sun');
  timber(H,R,4.83,9.66,1.56,.11,.66,.3,'teal');
  for(const i of [4.9,6.25])timber(H,R,i,8.72,.075,.94,.73,.18,'sun');
  for(let n=0;n<3;n++)bentTube(H,R,[[5.09+n*.34,8.91,.79],[5.04+n*.34,9.51,.79]],1.5,n===1?'blue':'sun');
  vessel(H,R,6.1,9.06,.79,5,7,'paper');
  timber(H,R,2.65,4.65,4.25,4.35,1.06,.2,'sun');
  for(const j of [5.15,7.61]){
    timber(H,R,2.88,j,3.62,.4,1.26,.19,'teal');
    for(const i of [3.16,5.71]){timber(H,R,i,j-.04,.42,.49,1.43,.31,'sun');cushion(H,R,i-.03,j-.05,.48,.52,1.74,.1,'paper');}
  }
  for(const j of [5.32,7.7]){
    metal(H,R,3.08,j,.41,.22,1.61,.06,'blue');
    H.dot(...H.p(3.3,j+.12,1.69),2,'sun');
    bentTube(H,R,[[3.15,j+.13,1.68],[3.44,j+.13,1.68]],1,'paper');
  }
  timber(H,R,2.37,7.13,.45,1.27,.84,.57,'sun');
  metal(H,R,2.37,7.2,.12,1.12,1.36,.08,'blue');
  bentTube(H,R,[[2.52,7.76,1.05],[1.85,7.76,1.05]],2.7,'blue');
  bentTube(H,R,[[1.86,7.76,.79],[1.86,7.76,1.35]],2.4,'sun');
  for(const z of [.78,1.35])oval(H,R,...H.p(1.86,7.76,z),3,2,'sun',.8);
  chair(H,R);
  const [qx,qy]=H.p(6.45,7.9,1.29);shape(H,R,[[qx-19,qy-3],[qx+19,qy+14],[qx+21,qy+7],[qx-10,qy-8],[qx+2,qy-35],[qx-5,qy-37]],'blue',.65,.7);H.line(R,[[qx-8,qy-4],[qx+10,qy+4]],'paper',.8);
  const [mx,my]=H.p(3,8.7,1.31);H.line(R,[[mx-13,my-11],[mx+10,my+6]],'sun',4);shape(H,R,[[mx-20,my-13],[mx-5,my-21],[mx+4,my-12],[mx-10,my-4]],'coral',.58,.7);
  metal(H,R,6.54,5.15,.18,1.56,1.31,.1,'blue');timber(H,R,6.4,5.35,.5,.24,1.4,.2,'sun');bentTube(H,R,[[6.47,6.48,1.42],[6.95,6.48,1.42]],1.5,'blue');
  timber(H,R,.47,7.84,.94,1.45,.03,.33,'teal');
  const [shx,shy]=H.p(.98,8.62,.41);oval(H,R,shx,shy,16,8,'blue',.7);
  for(let n=0;n<7;n++){const x=shx-10+n*3;stroke(H,R,[[x,shy],[x-5,shy-5-n%3*2],[x+3,shy-8-n%3*2],[x+6,shy-3],[x,shy]],'sun',1.4);}
  rod(H,R,[[.72,7.9,.1],[.47,7.48,2.04]],2.5,'sun');
  const [brx,bry]=H.p(.72,7.9,.1);shape(H,R,[[brx-13,bry],[brx+13,bry+7],[brx+12,bry-5],[brx-12,bry-12]],'sun',.7,.6);for(let n=0;n<9;n++)H.line(R,[[brx-11+n*2.5,bry-3+n*.23],[brx-12+n*2.6,bry+4+n*.28]],'blue',.6);
  benchFrame(H,R,1.13,9.8,3.2,1.46,.6,'teal');
  for(let n=0;n<6;n++){rod(H,R,[[1.42+n*.28,10.04,.67],[1.42+n*.28,10.88,.67]],2.5,'sun');}
  timber(H,R,3.24,10.11,.65,.7,.65,.21,'sun');const [ox,oy]=H.p(3.57,10.45,.88);oval(H,R,ox,oy,5,2.5,'blue',.85);H.line(R,[[ox-12,oy-8],[ox-4,oy-2]],'paper',1);
  const [plx,ply]=H.p(2.63,10.67,.75);shape(H,R,[[plx-18,ply],[plx+13,ply+8],[plx+20,ply-1],[plx-10,ply-10]],'teal',.7,.7);shape(H,R,[[plx-2,ply-4],[plx+6,ply-10],[plx+10,ply-5],[plx+4,ply+2]],'blue',.8,.5);stroke(H,R,[[plx+8,ply],[plx+11,ply-12],[plx+20,ply-10],[plx+20,ply]],'sun',2.2);
  timber(H,R,1.62,10.04,.59,.47,.7,.19,'sun');
  shape(H,R,H.tile(1.78,10.14,.25,.21,.903),'blue',.85,.5);
  rod(H,R,[[2.07,10.35,.77],[2.57,10.35,.77]],3,'sun');
  shape(H,R,H.tile(1.2,10.62,.56,.39,.7),'paper',1,.5);H.line(R,[H.p(1.25,10.68,.72),H.p(1.68,10.93,.72)],'coral',.8);
  const [sqx,sqy]=H.p(4.03,10.25,.7);shape(H,R,[[sqx-12,sqy-12],[sqx-8,sqy-14],[sqx+13,sqy+6],[sqx-8,sqy+15],[sqx-10,sqy+10],[sqx+3,sqy+4]],'blue',.7,.6);
  caneChair(H,R,9.4,6.6,'teal');cushion(H,R,9.42,6.62,.87,.8,.69,.09,'coral');
  benchFrame(H,R,9.18,8.56,2.1,2.3,.66,'teal');
  for(let n=0;n<4;n++)drape(H,R,9.38+n*.05,8.9+n*.09,1.3,1.3,.7+n*.04,.16,['paper','coral','sun','teal'][n]);
  timber(H,R,9.31,8.73,1.87,1.94,.19,.08,'sun');
  const [casx,casy]=H.p(10.18,9.72,.3);shape(H,R,[[casx-17,casy],[casx+18,casy],[casx+18,casy-20],[casx-17,casy-20]],'coral',.66,.75);H.line(R,[[casx-16,casy-16],[casx+17,casy-16]],'sun',1);stroke(H,R,[[casx-6,casy-20],[casx-6,casy-27],[casx+7,casy-27],[casx+7,casy-20]],'blue',1.5);
  const [cpx,cpy]=H.p(10.25,9.36,.96);shape(H,R,[[cpx-8,cpy],[cpx+9,cpy+4],[cpx+14,cpy-6],[cpx-4,cpy-10]],'paper',1,.6);for(let n=0;n<4;n++)H.line(R,[[cpx-4+n*3,cpy-7],[cpx-8+n*3,cpy]],'teal',.7);
  bentTube(H,R,[[11.57,.49,3.99],[11.57,1.06,3.84],[11.57,1.06,3.4]],1.4,'blue');
  const [hookx,hooky]=H.p(11.57,1.06,3.4);stroke(H,R,[[hookx,hooky],[hookx+7,hooky+8],[hookx,hooky+14],[hookx-7,hooky+8]],'sun',2);
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
