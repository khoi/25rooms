import { world, box, shape, oval, stroke, actor, ell, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape, bentTube, cushion } from '../materials.js';
import { boardFloor } from '../structure.js';
import { windowBay, cityView, cornice, wallRack, floorShadow, caster } from '../joinery.js';

const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x)};
const base={x:0,y:0,drop:0,lean:0,head:0,al:-10,ar:12,el:-6,er:6,ll:-5,lr:5,kl:0,kr:0,roll:0};
function hank(H,R,x,y,ink='coral',size=1){
  const points=[[x-4*size,y],[x-7*size,y+12*size],[x-5*size,y+29*size],[x,y+33*size],[x+5*size,y+29*size],[x+7*size,y+12*size],[x+4*size,y]];
  shape(H,R,points,ink,.65,.6);
  for(let n=0;n<5;n++)stroke(H,R,[[x-3*size+n*1.4*size,y+2*size],[x-5*size+n*2.5*size,y+13*size],[x-3*size+n*1.4*size,y+28*size]],n%2?'paper':'blue',.5,.48);
  H.line(R,[[x-5*size,y+13*size],[x+5*size,y+15*size]],'sun',1.1);
}
function bobbin(H,R,i,j,z,ink='coral',dual=false){
  const p=H.p(i,j,z);oval(H,R,p[0],p[1],6,3,'sun',.6);shape(H,R,[[p[0]-4,p[1]],[p[0]+4,p[1]],[p[0]+4,p[1]-12],[p[0]-4,p[1]-12]],ink,.72,.5);
  for(let n=0;n<5;n++)H.line(R,[[p[0]-4,p[1]-2-n*2],[p[0]+4,p[1]-3-n*2]],dual&&n<2?'teal':'paper',.55);
  oval(H,R,p[0],p[1]-12,6,3,'sun',.6);H.dot(p[0],p[1]-12,1.1,'blue');
}
const room=world('paris-tapestry-samples','A color beside a thread',{floor:'paper',tone:.7,wall:'paper',wallTone:1,height:4.2,head:25},(H,R)=>{
  boardFloor(H,R,.1,.1,11.8,11.8,.017,'sun',.66);
  for(let n=0;n<14;n++)shape(H,R,H.tile(.15+n*.82,11.35,.43,.36,.024),n%2?'teal':'coral',.5,.4);
  cornice(H,R,'ne',0,12,4.1,'sun');cornice(H,R,'nw',0,12,4.1,'sun');
  windowBay(H,R,'ne',2.53,8.82,.96,2.94,{divisions:5,view:P=>cityView(H,R,P,8.82,2.94)});
  H.tint(H.tile(2.7,1.2,7.8,4.6,.03),'sun',.15);
  metal(H,R,3.48,.44,.06,.15,2.03,.14,'sun');bentTube(H,R,[[3.49,.44,2.1],[3.82,.82,2.13],[3.98,.61,2.13]],1.4,'teal');
  for(const j of [.58,7.81])timber(H,R,.18,j,1.53,.14,.14,3.65,'teal');
  timber(H,R,.18,.58,1.53,7.36,.14,.16,'teal');timber(H,R,.12,.49,1.67,7.54,3.69,.19,'teal');
  shape(H,R,H.faceJ(.34,.75,6.95,.35,3.64),'blue',.75,.8);
  for(let n=0;n<4;n++){
    const j=.79+n*1.72;
    timber(H,R,.25,j,1.46,.09,.3,3.38,'teal');
    for(let row=0;row<4;row++){
      const z=.42+row*.48;
      timber(H,R,.29,j+.1,1.29,1.54,z,.07,'sun');
      const front=H.faceJ(1.65,j+.15,1.4,z+.08,z+.39);shape(H,R,front,'teal',.4,.6);
      H.line(R,[H.p(1.67,j+.67,z+.2),H.p(1.67,j+.93,z+.2)],'sun',2);
      if(row===2&&n===1){box(H,R,1.61,j+.19,.55,1.34,z+.07,.21,'sun',.45);for(let k=0;k<4;k++)hank(H,R,...H.p(1.92,j+.37+k*.24,z+.31),['coral','sun','teal','paper'][k],.38);}
    }
    timber(H,R,.29,j+.1,1.3,1.54,2.47,.09,'sun');
    for(let k=0;k<3;k++)hank(H,R,...H.p(1.38,j+.3+k*.42,3.5),['coral','sun','teal'][(n+k)%3],.77);
    H.line(R,[H.p(1.4,j+.15,3.55),H.p(1.4,j+1.47,3.55)],'blue',2);
  }
  drape(H,R,.36,6.29,1.12,1.25,3.89,.46,'paper');
  floorShadow(H,3.25,3.25,5.31,2.14,.2);
  for(const i of [3.38,8.38]){
    timber(H,R,i-.24,3.21,.68,2.43,.07,.23,'sun');
    timber(H,R,i,3.65,.24,.39,.28,3.72,'sun');
    bentTube(H,R,[[i+.1,5.51,.31],[i+.1,3.91,2.11]],2.4,'teal');
    metal(H,R,i-.14,3.5,.52,.62,.31,.13,'blue');
    for(const z of [.66,3.69])H.dot(...H.p(i+.13,4.07,z),2.2,'blue');
  }
  timber(H,R,3.22,3.63,5.59,.45,3.73,.25,'sun');
  const worn=H.p(8.5,4.065,2.26);oval(H,R,...worn,2.6,7.3,'coral',.22);H.line(R,[[worn[0]-1,worn[1]-5],[worn[0]-1,worn[1]+4]],'paper',.75);
  timber(H,R,3.55,3.69,4.69,.38,.97,.2,'sun');
  for(let n=0;n<35;n++)H.line(R,[H.p(3.69+n*.125,3.98,1.15),H.p(3.69+n*.125,3.98,3.74)],'paper',.9);
  const swatch=[H.p(3.72,4.025,1.2),H.p(7.36,4.025,1.2),H.p(7.36,4.025,3.24),H.p(3.72,4.025,3.24)];
  shape(H,R,swatch,'coral',.71,.8);
  H.clip(swatch,()=>{
    shape(H,R,[H.p(3.68,4.04,1.75),H.p(5.13,4.04,2.88),H.p(6.22,4.04,2.04),H.p(7.5,4.04,3.28),H.p(7.5,4.04,1.25),H.p(3.68,4.04,1.25)],'teal',.75,.4);
    shape(H,R,[H.p(3.7,4.045,2.75),H.p(5.18,4.045,2.18),H.p(6.33,4.045,3.26),H.p(3.7,4.045,3.26)],'sun',.8,.4);
    for(let n=0;n<40;n++){const z=1.24+n*.049;H.line(R,[H.p(3.73,4.06,z),H.p(5.22,4.06,z+(n===3?.085:0)),H.p(7.34,4.06,z)],n%3?'paper':'blue',.46,{tone:.43});}
    for(let n=0;n<26;n++)H.line(R,[H.p(3.76+n*.135,4.07,1.23),H.p(3.76+n*.135,4.07,3.23)],'coral',.3,{tone:.55});
  });
  for(let n=0;n<27;n++)H.line(R,[H.p(3.77+n*.13,4.04,1.2),H.p(3.77+n*.13,4.04,.96-(n%4)*.032)],'paper',1);
  for(const i of [4.25,5.71,7.18]){
    H.line(R,[H.p(i,3.88,.98),H.p(i,3.88,.45)],'blue',.9);
    cushion(H,R,i-.16,3.72,.32,.33,.22,.23,'paper');
  }
  bentTube(H,R,[[8.51,4.02,1.7],[8.21,4.67,1.7],[7.35,5.31,1.7]],2.2,'sun');
  const root=H.p(7.61,5.04);
  for(const dx of [-9,9]){H.line(R,[[root[0]+dx,root[1]-60],[root[0]+dx,root[1]-51],[root[0]+dx+4,root[1]-53]],'blue',1.3);}
  timber(H,R,7.42,4.3,.92,.38,1.03,.11,'sun');
  for(let n=0;n<3;n++)bobbin(H,R,7.58+n*.25,4.44,1.16,['coral','sun','teal'][n],n===1);
  wallRack(H,R,'nw',8.85,2.62,2.42,1.16,1,'sun',(P,z)=>{
    for(let n=0;n<3;n++){const a=P(.45+n*.76,z+.1),q=[[a[0]-9,a[1]],[a[0]+9,a[1]],[a[0]+9,a[1]-27],[a[0]-9,a[1]-27]];shape(H,R,q,n===2?'paper':'coral',n===2?1:.55);for(let k=0;k<7;k++)H.line(R,[[a[0]-7,a[1]-3-k*3],[a[0]+7+(n===1&&k===2?4:0),a[1]-3-k*3]],n===2?'teal':'paper',.7);}
  });
  for(const j of [8.65,9.36])bentTube(H,R,[[.74,j,.06],[.21,j,2.5]],2.5,'sun');
  for(let n=0;n<6;n++)bentTube(H,R,[[.66-n*.077,8.64,.24+n*.35],[.66-n*.077,9.38,.24+n*.35]],2,'sun');
  benchFrame(H,R,2.7,9.0,4.98,1.62,.85,'sun');
  shape(H,R,H.tile(2.94,9.19,1.63,1.14,.87),'paper',1);
  for(let n=0;n<4;n++){const p=H.p(3.16+n*.3,9.47,.89);stroke(H,R,[[p[0]-8,p[1]],[p[0]-2,p[1]-5],[p[0]+8,p[1]+2]],n%2?'coral':'teal',1+n*.35);}
  for(let n=0;n<5;n++)shape(H,R,[H.p(5.01,9.96,.88),H.p(5.28+n*.27,9.19,.88),H.p(5.56+n*.27,9.24,.88)],['paper','sun','coral','teal','blue'][n],.65,.45);
  oval(H,R,...H.p(6.82,9.71,.91),11,6,'paper',1);oval(H,R,...H.p(6.82,9.71,.92),8,4,'teal',.25);
  bobbin(H,R,7.06,10.12,.88,'coral',true);
  benchFrame(H,R,9.34,7.6,2.03,3.25,.7,'teal');
  for(const i of [9.45,11.17])for(const j of [7.7,10.6])caster(H,R,i,j,.08);
  drape(H,R,9.51,7.86,1.58,1.35,.72,.38,'paper');
  hank(H,R,...H.p(10.32,9.77,.72),'sun',.57);
  H.line(R,[H.p(9.86,9.57,.76),H.p(10.67,9.57,.76)],'teal',3);
  for(let n=0;n<8;n++)H.line(R,[H.p(9.91+n*.095,9.58,.77),H.p(9.91+n*.095,9.84,.77)],'blue',.8);
  box(H,R,9.66,10.1,1.42,.56,.72,.14,'coral',.4);
},(H,R,t)=>{
  const u=((t%18)+18)%18,lift=ease(3.6,7.2,u)*(1-ease(10.8,16,u)),spread=ease(7.2,9,u)*(1-ease(10.8,14,u));
  const root=H.p(7.61,5.04),s=1.8,touch=ease(.3,3.6,u)*(1-ease(15.3,16,u));
  const hands=[-1,1].map(sign=>[root[0]+sign*(9+spread*3),root[1]-43-10*touch-12*lift]);
  const pose={...base,head:6-12*lift};
  for(const [n,side]of ['l','r'].entries()){
    const dx=(hands[n][0]-root[0])/s-(n?5.2:-5.2),dy=(hands[n][1]-root[1])/s+32.5,bend=(n?-1:1)*Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-4.368**2-4.2**2)/(2*4.368*4.2))));
    pose['a'+side]=(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(bend),4.368+4.2*Math.cos(bend)))*180/Math.PI;pose['e'+side]=bend*180/Math.PI;
  }
  FIGURES.clips.parisTapestryCompare={dur:18,keys:[[0,pose],[1,pose]]};
  actor(H,R,7.61,5.04,0,'parisTapestryCompare',{shirt:['blue',.68],apron:['paper',1],hairStyle:'bun'},0,s);
  for(const [n,sign]of [-1,1].entries()){
    const x=root[0]+sign*(9+spread*3),y=root[1]-53-12*lift;hank(H,R,x,y,n?'coral':'sun',.81);
    if(touch>.99)H.dot(...hands[n],2.1,'coral',.35,{knock:true});
  }
  const learner={...base,head:4+12*ease(7.5,9,u)*(1-ease(14.2,17,u)),al:16,ar:26,el:30,er:60};
  FIGURES.clips.parisTapestryLearner={dur:18,keys:[[0,learner],[1,learner]]};
  actor(H,R,9.29,6.22,0,'parisTapestryLearner',{shirt:['coral',.55],hairStyle:'curly'},0,1.6);
  stroke(H,R,[H.p(7.89,4.59,1.15),H.p(8.16,4.72,1.07),H.p(8.3,4.68,1.01+.025*Math.sin(u*Math.PI*2/18))],'coral',.85);
});
room.loopSeconds=18;room.stillTime=9.2;
export default room;
