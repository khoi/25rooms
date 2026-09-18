import { world, shape, oval, stroke, box, ell, wallPt, TAU } from '../../worlds/common.js';
import { timber, metal, bentTube, drape, vessel, floorLight } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, caster, taskLight, panelFront } from '../joinery.js';
import { hands } from './umbrella-ribs.js';

const ease = x => { const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q); };
const room=world('london-bus-mirror','Before the first turn',{wall:false,floor:'blue',tone:.14,head:100},(H,R)=>{
  masonry(H,R,'nw',0,12,0,4.7,'paper',.9);
  masonry(H,R,'ne',0,12,0,4.7,'teal',.18);
  windowBay(H,R,'ne',1.1,6.8,3.55,.82,{divisions:6});
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
  metal(H,R,.15,8.4,1.3,2.2,.1,2.65,'teal');
  for(let n=0;n<2;n++){shape(H,R,H.faceJ(1.46,8.48+n*1.03,.88,.25,2.58),'paper',.6);H.line(R,[H.p(1.47,8.8+n*1.03,1.15),H.p(1.47,8.8+n*1.03,1.46)],'blue',2);}
  for(let n=0;n<5;n++) H.line(R,[H.p(1.47,8.68+n*.13,2.32),H.p(1.47,8.73+n*.13,2.45)],'blue',.75);
  metal(H,R,.24,10.8,1.6,.9,.05,.12,'blue');
  for(const j of [10.95,11.27]) {const [x,y]=H.p(.9,j,.2);shape(H,R,[[x-10,y],[x+13,y],[x+12,y-7],[x+3,y-10],[x+3,y-18],[x-8,y-18]],'blue',.75);}
  floorLight(H,4.25,5.05,104,.58);
  H.tint(H.tile(1.45,2.9,5.6,4.1,.02),'blue',.21);
  metal(H,R,1.65,3.12,5.05,3.6,.43,.31,'blue');
  metal(H,R,1.8,3.28,4.73,3.23,.75,.11,'paper');
  shape(H,R,H.faceJ(1.73,3.15,3.61,.66,2.55),'blue',.64);
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
  shape(H,R,H.faceI(1.68,6.78,5.02,.68,1.25),'blue',.7);
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
  const q=H.p(10.94,2.98,.74);for(let n=0;n<4;n++)H.outline(R,ell(q[0],q[1],12-n*2,14-n*2),'blue',1.1);
},(H,R,t)=>{
  const u=((t%18)+18)%18,a=ease((u-3.6)/3.6)*(1-ease((u-10.8)/5.2));
  const pivot=H.p(6.39,4.81,1.88),end=H.p(7.05+.12*a,5.22-.1*a,1.77);
  const contact=ease(u/2.7)*(1-ease((u-16)/1.2)),rest=H.p(7.74,5.36,.92),hand=end.map((v,n)=>rest[n]+(v-rest[n])*contact);
  hands(H,R,7.78,5.33,[H.p(6.96,5.25,1.37),hand],'blue',-a);
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
