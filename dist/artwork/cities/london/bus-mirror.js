import { world, shape, oval, stroke, box, ell, wallPt, TAU } from '../../worlds/common.js';
import { timber, metal, bentTube, drape, vessel, floorLight } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, caster, taskLight, panelFront, wallRack, hangingRail } from '../joinery.js';
import { hands } from './umbrella-ribs.js';

const ease = x => { const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q); };
const room=world('london-bus-mirror','Before the first turn',{wall:false,floor:'blue',tone:.14,head:100},(H,R)=>{
  masonry(H,R,'nw',0,12,0,4.7,'paper',.9);
  masonry(H,R,'ne',0,12,0,4.7,'teal',.18);
  windowBay(H,R,'ne',1.1,6.8,3.55,.82,{divisions:6});
  metal(H,R,.12,.24,.32,11.42,4.46,.16,'blue');
  metal(H,R,8.9,.14,2.52,.63,4.03,.42,'paper');
  for(let n=0;n<8;n++)H.line(R,[H.p(9.06+n*.28,.79,4.1),H.p(9.06+n*.28,.79,4.38)],'teal',1.4);
  bentTube(H,R,[[10.5,.31,4.42],[10.5,.31,4.66],[8.6,.31,4.66]],4,'teal');
  wallRack(H,R,'ne',8.88,2.42,2.78,.95,1,'teal',(P,z)=>{
    for(let n=0;n<3;n++){const q=P(.45+n*.7,z+.17);shape(H,R,[[q[0]-7,q[1]],[q[0]+7,q[1]],[q[0]+6,q[1]-12],[q[0]-5,q[1]-12]],n===1?'coral':'paper',.85);H.line(R,[[q[0]-4,q[1]-8],[q[0]+4,q[1]-8]],'sun',1.3);}
  });
  for(const i of [.35,8.15]) metal(H,R,i,.25,.32,.42,0,5.05,'blue');
  metal(H,R,.24,.16,8.58,.54,4.72,.33,'teal');
  for(let n=0;n<5;n++) bentTube(H,R,[[.5+n*1.5,.43,4.78],[1.25+n*1.5,.43,5.36],[2+n*1.5,.43,4.78]],2.8,'blue');
  bentTube(H,R,[[.5,.43,5.36],[8.25,.43,5.36]],3.2,'teal');
  for(const i of [.35,8.22]) metal(H,R,i,.43,.17,6.3,.02,.045,'blue');
  metal(H,R,.55,7.65,10.6,.24,.01,.03,'blue');
  for(let n=0;n<35;n++) H.line(R,[H.p(.62+n*.3,7.65,.05),H.p(.62+n*.3,7.89,.05)],'paper',.75);
  bentTube(H,R,[[.2,1,3.8],[.2,10.7,3.8],[.2,10.7,1.6]],2,'teal');
  for(const j of [1.2,3,4.8,6.6,8.4,10.2]) metal(H,R,.13,j,.17,.11,3.7,.22,'sun');
  const hose=wallPt(H,'nw',5.6,2.63,-.2);
  for(let n=0;n<3;n++)H.outline(R,ell(hose[0],hose[1]+10,17-n*3,30-n*3),'teal',2.1);
  H.line(R,[[hose[0]-10,hose[1]-19],[hose[0]+10,hose[1]-19]],'sun',3);
  stroke(H,R,[[hose[0]+10,hose[1]+28],[hose[0]+20,hose[1]+40],[hose[0]+19,hose[1]+59]],'blue',2.3);
  H.line(R,[[hose[0]+19,hose[1]+58],[hose[0]+26,hose[1]+63]],'sun',3);
  const service=[wallPt(H,'nw',2.1,1.79,-.18),wallPt(H,'nw',3.55,1.79,-.18),wallPt(H,'nw',3.55,2.89,-.18),wallPt(H,'nw',2.1,2.89,-.18)];
  shape(H,R,service,'teal',.4);
  for(let n=0;n<3;n++){const p=wallPt(H,'nw',2.37+n*.39,2.43,-.2);oval(H,R,...p,4,4,'paper',1);H.line(R,[p,[p[0]+2,p[1]-2]],'coral',.8);}
  H.line(R,[wallPt(H,'nw',2.8,2.89,-.2),wallPt(H,'nw',2.8,3.79,-.2)],'blue',1.8);
  timber(H,R,.16,.72,1.05,6.6,1.06,.16,'sun');
  for(const j of [.83,3.75,7.05])metal(H,R,.23,j,.14,.14,.04,1.01,'teal');
  timber(H,R,.2,.84,.92,6.23,.38,.1,'teal');
  for(const j of [1.1,2.28,5.6]){box(H,R,.3,j,.67,.94,.49,.43,'paper',.9);H.line(R,[H.p(.97,j+.3,.7),H.p(.97,j+.64,.7)],'blue',1.8);}
  metal(H,R,.26,3.65,.82,1.05,.5,.3,'blue');
  const benchDial=H.p(.67,1.35,1.24);oval(H,R,...benchDial,11,10,'blue',.8);oval(H,R,...benchDial,8,7,'paper',1);H.line(R,[benchDial,[benchDial[0]+4,benchDial[1]-4]],'coral',1.3);
  for(let n=0;n<3;n++){const q=H.p(.6,2.5+n*.61,1.25);H.line(R,[[q[0]-7,q[1]+3],[q[0]+7,q[1]-9]],'blue',2.3);oval(H,R,q[0]+8,q[1]-10,3,3,'paper',1);}
  drape(H,R,.24,6.04,.87,.9,1.25,.38,'paper');
  hangingRail(H,R,'nw',6.3,1.25,3.25,3,(P,u,n)=>{const q=P(u,-.1);H.line(R,[q,[q[0],q[1]+18]],n===1?'coral':'sun',3);H.line(R,[[q[0]-5,q[1]+19],[q[0]+5,q[1]+19]],'blue',2);});
  metal(H,R,.15,8.4,1.3,2.2,.1,2.65,'teal');
  for(let n=0;n<2;n++){shape(H,R,H.faceJ(1.46,8.48+n*1.03,.88,.25,2.58),'paper',.6);H.line(R,[H.p(1.47,8.8+n*1.03,1.15),H.p(1.47,8.8+n*1.03,1.46)],'blue',2);}
  for(let n=0;n<5;n++) H.line(R,[H.p(1.47,8.68+n*.13,2.32),H.p(1.47,8.73+n*.13,2.45)],'blue',.75);
  metal(H,R,.24,10.8,1.6,.9,.05,.12,'blue');
  for(const j of [10.95,11.27]) {const [x,y]=H.p(.9,j,.2);shape(H,R,[[x-10,y],[x+13,y],[x+12,y-7],[x+3,y-10],[x+3,y-18],[x-8,y-18]],'blue',.75);}
  floorLight(H,4.25,5.05,104,.58);
  H.tint(H.tile(1.45,2.9,5.6,4.1,.02),'blue',.21);
  metal(H,R,1.65,3.12,5.05,3.6,.43,.31,'blue');
  metal(H,R,1.8,3.28,4.73,3.23,.75,.11,'paper');
  shape(H,R,[H.p(1.73,3.15,.66),H.p(1.73,6.76,.66),H.p(1.73,6.76,1.34),H.p(1.73,5.75,1.59),H.p(1.73,4.76,1.61),H.p(1.73,4.76,2.75),H.p(1.73,3.15,3.38)],'blue',.74);
  shape(H,R,[H.p(1.74,3.42,1.76),H.p(1.74,4.51,1.76),H.p(1.74,4.51,2.65),H.p(1.74,3.42,3.09)],'paper',1);
  H.tint([H.p(1.74,3.47,1.81),H.p(1.74,4.45,1.81),H.p(1.74,4.45,2.61),H.p(1.74,3.47,3.02)],'teal',.26);
  metal(H,R,1.64,3.08,4.98,.77,3.36,.2,'blue');
  H.line(R,[H.p(1.64,3.85,3.56),H.p(6.62,3.85,3.56)],'paper',2);
  for(const j of [4.92,5.9])shape(H,R,H.faceJ(1.745,j,.72,.81,1.26),'teal',.5);
  for(let n=0;n<5;n++)H.line(R,[H.p(1.75,5.96+n*.12,.89),H.p(1.75,5.96+n*.12,1.19)],'paper',.8);
  bentTube(H,R,[[1.81,4.83,1.47],[2.18,4.83,1.47],[2.18,4.83,1.2]],2,'sun');
  for(const z of [1.05,1.18]) H.line(R,[H.p(1.76,3.15,z),H.p(1.76,6.76,z)],'paper',2);
  metal(H,R,1.67,3.08,4.9,.29,3.35,.22,'blue');
  for(const i of [1.75,6.37]) bentTube(H,R,[[i,3.26,.74],[i,3.26,3.37]],3.8,'blue');
  const pane=[H.p(2.05,3.29,1.56),H.p(6.12,3.29,1.56),H.p(6.12,3.29,3.15),H.p(2.05,3.29,3.15)];
  shape(H,R,pane,'paper',1);H.tint(pane,'teal',.16);
  H.line(R,[H.p(4.1,3.3,1.59),H.p(4.1,3.3,3.12)],'blue',2.7);
  for(const i of [2.25,4.6]) H.line(R,[H.p(i,3.31,1.78),H.p(i+.6,3.31,2.92)],'paper',4);
  bentTube(H,R,[[2.2,3.36,1.62],[2.85,3.36,2.13],[3.38,3.36,2.2]],1.4,'blue');
  metal(H,R,2.4,3.5,3.15,1.04,1.16,.46,'teal');
  shape(H,R,H.tile(2.63,3.69,2.52,.67,1.635),'blue',.8);
  for(const [i,r] of [[3.0,7],[3.6,5],[4.2,5]]){const p=H.p(i,3.96,1.66);oval(H,R,...p,r,r*.45,'paper',1);H.line(R,[p,[p[0]+r*.4,p[1]-r*.22]],'coral',1.2);}
  for(let n=0;n<5;n++) H.dot(...H.p(4.75+n*.1,4.15,1.66),1.6,n===2?'coral':'sun');
  metal(H,R,3.38,4.88,.64,.64,.84,.37,'blue');
  for(let n=0;n<4;n++) metal(H,R,3.33,4.84,.75,.72,.9+n*.08,.035,'paper');
  box(H,R,2.99,4.7,1.42,1.44,1.23,.28,'paper',1);
  box(H,R,2.98,4.7,1.43,.19,1.49,1.2,'paper',1);
  for(let n=0;n<5;n++) H.line(R,[H.p(3.12+n*.23,4.91,1.59),H.p(3.12+n*.23,4.91,2.55)],'sun',.8);
  bentTube(H,R,[[4.37,5.57,1.22],[4.65,5.57,1.31]],1.6,'blue');
  oval(H,R,...H.p(4.63,5.57,1.32),4,2,'coral',.8);
  oval(H,R,...H.p(3.19,6.13,1.47),7,3,'sun',.5);
  bentTube(H,R,[[3.61,4.52,.86],[3.66,4.13,1.82]],3,'blue');
  const [sx,sy]=H.p(3.66,4.13,1.84);oval(H,R,sx,sy,17,8,'blue',.8);oval(H,R,sx,sy,12,5,'paper',1);for(const a of [0,2.1,4.2])H.line(R,[[sx,sy],[sx+Math.cos(a)*14,sy+Math.sin(a)*6]],'blue',2);
  metal(H,R,4.38,4.38,.52,.65,.85,.09,'teal');
  for(let n=0;n<4;n++) H.line(R,[H.p(4.42,4.49+n*.11,.96),H.p(4.82,4.49+n*.11,.96)],'paper',.8);
  bentTube(H,R,[[6.25,5.2,.84],[6.25,5.2,2.75],[6.25,3.55,2.75]],2.6,'sun');
  shape(H,R,[H.p(1.68,6.78,.56),H.p(6.7,6.78,.56),H.p(6.7,6.78,1.31),H.p(5.85,6.78,1.48),H.p(2.13,6.78,1.48),H.p(1.68,6.78,1.25)],'blue',.8);
  metal(H,R,1.58,6.75,5.19,.26,.52,.16,'teal');
  shape(H,R,H.faceI(3.66,6.8,1.07,.76,1.16),'teal',.48);
  for(let n=0;n<7;n++)H.line(R,[H.p(3.73+n*.14,6.81,.79),H.p(3.73+n*.14,6.81,1.12)],'paper',.85);
  for(const i of [2.06,6.3]){const q=H.p(i,6.81,1.05);oval(H,R,...q,9,8,'paper',1);oval(H,R,...q,6,5,'sun',.7);H.line(R,[[q[0]-6,q[1]-2],[q[0]+6,q[1]+2]],'paper',1.3);}
  for(const i of [1.81,6.48])metal(H,R,i,6.83,.21,.08,.74,.16,'coral');
  H.line(R,[H.p(1.8,6.8,1.18),H.p(6.6,6.8,1.18)],'paper',1.5);
  const [wx,wy]=H.p(3.01,6.83,.46);oval(H,R,wx,wy,23,25,'blue',.95);oval(H,R,wx,wy,13,16,'paper',1);oval(H,R,wx,wy,6,7,'teal',.7);
  for(let n=0;n<5;n++)H.dot(wx+Math.cos(n*TAU/5)*9,wy+Math.sin(n*TAU/5)*11,1.8,'sun');
  shape(H,R,[H.p(3.6,6.88,.02),H.p(4.3,6.88,.02),H.p(4.3,6.88,.31),H.p(3.85,6.88,.41)],'sun',.8);
  box(H,R,5.4,5.72,.83,.7,.88,.18,'coral',.5);oval(H,R,...H.p(5.82,6.43,1),5,4,'sun',.9);
  for(let n=0;n<8;n++){const a=n*TAU/8,p=H.p(5.82,6.44,1);H.line(R,[[p[0]+Math.cos(a)*6,p[1]+Math.sin(a)*6],[p[0]+Math.cos(a)*9,p[1]+Math.sin(a)*9]],'sun',.8);}
  metal(H,R,5.4,4.72,.45,.34,1.06,.09,'paper');vessel(H,R,5.99,4.9,1.08,4,14,'teal',false);
  for(let n=0;n<2;n++){const [x,y]=H.p(5.22+n*.23,5.13,1.1);shape(H,R,[[x-4,y],[x+4,y],[x+5,y-9],[x+2,y-12],[x,y-9],[x-3,y-13],[x-5,y-9]],'paper',1);H.line(R,[[x-4,y-2],[x+4,y-2]],'coral',.8);}
  shape(H,R,H.faceI(4.7,6.83,1.05,.76,1.11),'paper',1);
  const p=H.p(5.2,6.84,.9);H.line(R,[[p[0]-13,p[1]-2],[p[0]+13,p[1]-2],[p[0]+13,p[1]-8],[p[0]-13,p[1]-8],[p[0]-13,p[1]-2]],'coral',1);for(let n=0;n<6;n++)H.dot(p[0]-11+n*4,p[1]+1,1.5,'blue');
  rackFrame(H,R,8.75,.65,2.45,2.3,.1,[.28,1.07,1.93],'teal',(i,j,w,d,z,n)=>{
    if(n===0){box(H,R,i+.1,j+.08,.75,.84,z,.45,'paper',.8);metal(H,R,i+1.12,j+.15,.84,1.31,z,.37,'blue');}
    if(n===1){for(let k=0;k<3;k++){metal(H,R,i+.07,j+.1+k*.55,w-.15,.46,z,.2,'teal');H.line(R,[H.p(i+.74,j+.57+k*.55,z+.1),H.p(i+1.25,j+.57+k*.55,z+.1)],'sun',1.3);}}
    if(n===2){drape(H,R,i+.05,j+.12,.9,1.1,z+.04,.27,'sun');const [x,y]=H.p(i+1.6,j+.9,z+.08);shape(H,R,[[x-13,y-8],[x+12,y-12],[x+14,y+7],[x-12,y+10]],'paper',1);H.line(R,[[x-9,y+5],[x+6,y-6]],'teal',2);}
  });
  for(const i of [8.75,11.2])for(const j of [.65,2.95])caster(H,R,i,j);
  bentTube(H,R,[[11.3,1.3,1.95],[11.3,1.3,2.75],[10.8,1.3,3.02]],2,'blue');taskLight(H,R,10.8,1.3,2.38,'sun',.2);
  metal(H,R,8.72,1.7,2.48,1.19,1.11,.13,'teal');
  shape(H,R,H.tile(8.91,1.85,2.07,.92,1.26),'blue',.55);
  for(let n=0;n<4;n++){const q=H.p(9.16+n*.43,2.14,1.28);H.line(R,[[q[0]-5,q[1]-5],[q[0]+5,q[1]+6]],'sun',2);H.line(R,[[q[0]-6,q[1]-7],[q[0]-1,q[1]-9]],'paper',1.4);}
  bentTube(H,R,[[11.25,2.81,1.91],[11.67,2.81,2.02],[11.67,2.81,1.57]],2.3,'teal');
  const q=H.p(10.94,2.98,.74);for(let n=0;n<4;n++)H.outline(R,ell(q[0],q[1],12-n*2,14-n*2),'blue',1.1);
  timber(H,R,2.36,9.55,2.86,1.57,.08,.12,'sun');
  for(const i of [2.36,5.08])timber(H,R,i,9.55,.14,1.57,.19,.23,'sun');
  timber(H,R,2.36,9.55,2.86,.14,.19,.23,'sun');
  const spare=H.p(3.32,10.27,.36);oval(H,R,...spare,24,22,'blue',.86);oval(H,R,...spare,16,14,'teal',.58);oval(H,R,...spare,9,8,'paper',1);
  for(let n=0;n<6;n++){const a=n*TAU/6;H.dot(spare[0]+Math.cos(a)*12,spare[1]+Math.sin(a)*10,1.8,'sun');}
  box(H,R,4.25,9.79,.69,.82,.21,.14,'coral',.8);H.line(R,[H.p(4.37,10.18,.37),H.p(4.77,10.43,.37)],'paper',2);
  metal(H,R,8.13,8.23,2.44,.71,.13,.21,'teal');
  for(const i of [8.3,10.2])for(const j of [8.27,8.82])caster(H,R,i,j);
  shape(H,R,[H.p(8.3,8.6,.34),H.p(9.6,8.6,.34),H.p(10.3,8.6,1.1),H.p(9.9,8.6,1.15)],'blue',.75);
  metal(H,R,9.73,8.39,.71,.54,1.09,.12,'paper');
  bentTube(H,R,[[8.33,8.67,.33],[7.52,9.21,.8],[7.03,9.53,1.48]],3,'sun');
  bentTube(H,R,[[7.05,9.51,1.47],[6.79,9.68,1.51]],4,'blue');
},(H,R,t)=>{
  const u=((t%18)+18)%18,a=ease((u-3.6)/3.6)*(1-ease((u-10.8)/5.2));
  const pivot=H.p(6.39,4.81,1.88),end=H.p(7.05+.12*a,5.22-.1*a,1.77);
  const contact=ease(u/2.7)*(1-ease((u-16)/1.2)),rest=H.p(8.43,5.24,.92),hand=end.map((v,n)=>rest[n]+(v-rest[n])*contact);
  hands(H,R,8.47,5.22,[H.p(6.96,5.25,1.37),hand],'blue',-a);
  H.line(R,[pivot,[end[0]-7,end[1]+4],end],'blue',4);H.line(R,[pivot,[end[0]-7,end[1]+4],end],'paper',1);
  oval(H,R,...pivot,3.5,3.5,'sun',.85);
  const x=end[0]+6,y=end[1]-11,w=10-2*a;
  shape(H,R,[[x-w,y-13],[x+w,y-12],[x+w-1,y+12],[x-w+1,y+13]],'blue',.95);
  shape(H,R,[[x-w+2,y-10],[x+w-2,y-9],[x+w-3,y+9],[x-w+3,y+10]],'paper',1);
  H.line(R,[[x-4+a*5,y+8],[x-4+a*5,y-7],[x+2+a*3,y-7]],'teal',2.2);
  H.line(R,[[x-6,y+1],[x+5,y-6]],'sun',1);
  if(contact>.99)oval(H,R,...end,2.4,2.4,'paper',1);
});
room.loopSeconds=18;room.stillTime=9;export default room;
