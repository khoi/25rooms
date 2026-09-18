import { world, shape, oval, stroke, box, ell, actor } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, cushion, vessel, branchSpray } from '../materials.js';
import { masonry } from '../structure.js';
import { floorShadow } from '../joinery.js';

const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const stretchAt=t=>ease(4.4,8.8,t)*(1-ease(13.2,20,t));
function walker(H,R,i,j,lift,ink,hand) {
  const [x,y]=H.p(i,j,0),lean=lift*3;
  oval(H,R,x+3,y+2,16,4,'blue',.14);
  for(const [d,h]of[[-5,0],[6,lift*5]]){stroke(H,R,[[x+d,y-25],[x+d+lean,y-13],[x+d+lean,y-h]],'blue',6);oval(H,R,x+d+lean+3,y-h,5.5,2.2,'paper',1);H.line(R,[[x+d+lean,y-h-2],[x+d+lean+3,y-h-3]],d>0?'coral':'teal',1.1);}
  surface(H,R,[[x-10+lean,y-46],[x+9+lean,y-46],[x+10,y-25],[x-10,y-25]],ink,.58);
  H.line(R,[[x+lean,y-44],[x,y-28]],'paper',.6);H.line(R,[[x-7,y-30],[x-2,y-30]],'blue',.6);
  oval(H,R,x+lean,y-55,7.7,8.8,'coral',.28);shape(H,R,[[x-8+lean,y-57],[x-6+lean,y-63],[x+5+lean,y-64],[x+8+lean,y-57],[x+4+lean,y-60],[x-4+lean,y-59]],'paper',1);
  H.dot(x+lean+1,y-54,.8,'blue');H.dot(x+lean+4,y-54,.8,'blue');
  stroke(H,R,[[x+8+lean,y-42],[x+16,y-31],[x+13,y-25]],'blue',5);stroke(H,R,[[x+8+lean,y-42],[x+16,y-31],[x+13,y-25]],ink,3.6);oval(H,R,x+13,y-25,2.4,2.6,'coral',.3);
  stroke(H,R,[[x-8+lean,y-42],[(x-8+hand[0])/2,y-37],hand],'blue',5);stroke(H,R,[[x-8+lean,y-42],[(x-8+hand[0])/2,y-37],hand],ink,3.6);oval(H,R,...hand,2.8,2.6,'coral',.3);
}
function fan(H,R,x,y,r=14) {
  const points=[[x,y]];for(let n=0;n<=16;n++){const a=Math.PI+n*Math.PI/16;points.push([x+Math.cos(a)*r,y+Math.sin(a)*r]);}surface(H,R,points,'paper',1);
  for(let n=0;n<=8;n++){const a=Math.PI+n*Math.PI/8;H.line(R,[[x,y],[x+Math.cos(a)*r,y+Math.sin(a)*r]],n===5?'coral':'sun',.8);}
  H.dot(x,y,1.6,'blue');
}
const room=world('hanoi-lake-warmup','The first stretch',{wall:false,floor:'paper',tone:.1,head:50},(H,R)=>{
  for(let i=0;i<12;i+=1.2)for(let j=0;j<12;j+=1.2){const tile=H.tile(i+.03,j+.03,1.14,1.14,.01);surface(H,R,tile,'blue',(Math.floor(i+j)%4===0)?.12:.045,.45);}
  surface(H,R,H.tile(.1,.08,11.7,1.5,.025),'teal',.45);for(let n=0;n<18;n++){const i=.4+(n%9)*1.25,j=.35+Math.floor(n/9)*.65;H.line(R,[H.p(i,j,.04),H.p(i+.75,j,.04)],'paper',1,{tone:.8});}
  for(const i of[.22,3.95,7.75,11.65]){metal(H,R,i,1.62,.14,.14,0,1.38,'teal');metal(H,R,i-.07,1.54,.28,.28,.04,.1,'teal');}
  for(const z of[.5,1.31])bentTube(H,R,[[.22,1.69,z],[11.77,1.69,z]],2,'teal');
  masonry(H,R,'nw',0,7.7,0,.9,'paper',.9);
  for(const [i,w]of[[1.4,3.25],[6.15,5.3]]){
    for(const x of[i,i+w-1.1]){box(H,R,x,2.02,1.02,1.25,.05,.51,'coral',.32);surface(H,R,H.faceI(x+.17,3.29,.7,.05,.45),'blue',.57);}
    box(H,R,i-.07,1.93,w+.15,1.5,.56,.19,'paper',1);
    for(let z=.94;z<1.62;z+=.22)timber(H,R,i-.03,1.92,w+.06,.11,z,.12,'sun');
    for(const x of[i+.14,i+w-.25])metal(H,R,x,1.97,.09,.09,.68,1.05,'teal');
  }
  const trunk=[H.p(4.94,2.06,.02),H.p(5.8,2.18,.02),H.p(5.43,2.14,1.4),H.p(5.65,2.25,3.8),H.p(5.2,2.16,4.3),H.p(4.95,2.04,2.15)];surface(H,R,trunk,'sun',.56);
  stroke(H,R,[H.p(5.31,2.2,2.1),H.p(4.5,2.12,3.2),H.p(2.9,2.03,4.05)],'blue',8);stroke(H,R,[H.p(5.31,2.2,2.1),H.p(4.5,2.12,3.2),H.p(2.9,2.03,4.05)],'sun',6);
  stroke(H,R,[H.p(5.36,2.2,3.2),H.p(7.52,2.16,4.28),H.p(9.7,2.1,4.13)],'blue',7);stroke(H,R,[H.p(5.36,2.2,3.2),H.p(7.52,2.16,4.28),H.p(9.7,2.1,4.13)],'sun',5.2);
  for(const j of[1.72,2.45])stroke(H,R,[H.p(5.36,2.14,.45),H.p(5.05,j,.05),H.p(4.45,j+.3,.025)],'sun',4);
  surface(H,R,H.tile(4.4,2.74,1.2,1.1,.08),'blue',.13);H.line(R,[H.p(4.4,2.74,.085),H.p(5.6,2.74,.085)],'paper',1.5);
  for(const i of[.53,10.93]){timber(H,R,i,2.66,.19,.19,0,3.38,'teal');metal(H,R,i-.1,2.55,.4,.42,0,.11,'teal');}
  timber(H,R,.4,2.63,10.86,.25,3.36,.21,'teal');
  for(const i of[.55,3.15,5.7,8.25,10.85])timber(H,R,i,.07,.13,2.65,3.52,.11,'sun');
  surface(H,R,[H.p(.35,.06,3.75),H.p(11.24,.06,3.75),H.p(11.24,2.87,3.59),H.p(.35,2.87,3.59)],'teal',.32);
  for(let i=.55;i<11.1;i+=.57)H.line(R,[H.p(i,.12,3.75),H.p(i,2.82,3.6)],'blue',.6,{tone:.55});
  bentTube(H,R,[[11.24,2.83,3.55],[11.45,2.83,3.4],[11.45,2.83,.2],[11.72,3.0,.12]],2.6,'teal');
  metal(H,R,10.74,3.01,.8,.6,.04,.06,'blue');for(let n=0;n<5;n++)H.line(R,[H.p(10.81+n*.14,3.1,.11),H.p(10.81+n*.14,3.49,.11)],'paper',.65);
  floorShadow(H,2.3,4.6,6.8,2.6,.11);
  for(const i of[2.55,5.55,8.75]){metal(H,R,i-.17,4.67,.42,.38,.015,.08,'teal');bentTube(H,R,[[i,4.83,.1],[i,4.83,1.23]],3.7,'teal');H.dot(...H.p(i+.1,4.74,.11),1,'sun');}
  bentTube(H,R,[[2.55,4.83,.7],[2.55,5.55,1.05],[8.75,5.55,1.05],[8.75,4.83,.7]],4,'teal');
  bentTube(H,R,[[2.56,4.83,.4],[8.75,4.83,.4]],2.6,'teal');
  for(const i of[3.12,6.39]){bentTube(H,R,[[i,5.55,1.05],[i+.55,5.55,1.05]],5.5,'blue');H.line(R,[H.p(i+.1,5.54,1.07),H.p(i+.39,5.54,1.07)],'paper',1.5);}
  for(const i of[3.2,6.56]){surface(H,R,H.tile(i,6.28,.75,.55,.065),'sun',.5);metal(H,R,i,6.28,.75,.16,.065,.11,'teal');}
  cushion(H,R,7.17,2.25,1.18,.72,.78,.09,'teal');fan(H,R,...H.p(8.86,2.67,.81),16);
  stroke(H,R,[H.p(9.92,2.37,.81),H.p(10.06,2.37,1.72),H.p(10.37,2.37,1.82)],'blue',2.4);
  metal(H,R,9.85,2.24,.28,.44,.78,.04,'sun');
  vessel(H,R,2.06,2.59,.78,5,17,'teal',false);cushion(H,R,2.63,2.48,.78,.52,.78,.05,'paper');
  oval(H,R,...H.p(3.97,2.75,.86),3,3,'coral',.7);
  box(H,R,.43,8.5,2.6,.98,0,.51,'teal',.43);timber(H,R,.34,8.42,2.77,1.1,.51,.12,'sun');
  for(const x of[.55,1.35,2.2])surface(H,R,H.faceI(x,9.5,.6,.15,.46),'blue',.5);
  const rolled=H.p(1.08,9.0,.69);oval(H,R,...rolled,18,5,'coral',.42);oval(H,R,rolled[0]+14,rolled[1],5,5,'paper',1);H.line(R,[[rolled[0]-10,rolled[1]-4],[rolled[0]-10,rolled[1]+4]],'blue',2);
  surface(H,R,H.tile(1.48,9.73,.9,.55,.035),'blue',.12);for(let n=0;n<5;n++)H.line(R,[H.p(1.55+n*.14,9.8,.04),H.p(1.55+n*.14,10.19,.04)],'sun',1.7);
  bentTube(H,R,[[9.6,8.6,.03],[9.6,8.6,.75],[10.19,8.6,.83],[10.19,8.6,.03]],2.5,'teal');
  const lock=H.p(9.95,8.65,.65);H.outline(R,ell(...lock,8,12),'blue',2);box(H,R,9.45,9.9,1.55,.65,0,.09,'teal',.4);
},(H,R,time)=>{
  const t=((time%22)+22)%22;
  walker(H,R,3.73,6.1,stretchAt(t),'teal',H.p(3.4,5.55,1.05));
  walker(H,R,7.02,6.1,stretchAt(Math.max(0,t-1.2)),'coral',H.p(6.65,5.55,1.05));
  for(let n=0;n<14;n++){const i=.7+(n%7)*1.64,j=.32+Math.floor(n/7)*1.42,z=4.04+(n%3)*.16,[x,y]=H.p(i,j,z),sway=Math.sin(t*Math.PI*2/22+n)*1.2;stroke(H,R,[H.p(5.4,2.17,3.65),H.p((i+5.4)*.5,(j+2.17)*.5,4.02),[x+sway,y]],'sun',n%3?1.4:2.2);branchSpray(H,R,x+sway,y,.94+(n%3)*.18,n%4?'teal':'sun',n%2?1:-1);}
  const [x,y]=H.p(8.86,2.67,.82);stroke(H,R,[[x,y],[x+2+Math.sin(t*Math.PI*2/22)*2,y+13],[x+5,y+21]],'coral',1);
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
