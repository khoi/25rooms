import { world, shape, oval, stroke, box, ell, actor } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, cushion, vessel, branchSpray, drape } from '../materials.js';
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
  for(let i=.44;i<11.6;i+=.77){bentTube(H,R,[[i,1.68,.12],[i,1.68,1.24]],1.3,'teal');if(i<10.9)stroke(H,R,[H.p(i,1.68,.46),H.p(i+.38,1.68,.72),H.p(i+.77,1.68,.46)],'teal',1.1);}
  for(const i of[.22,3.95,7.75,11.65]){metal(H,R,i,1.62,.14,.14,0,1.38,'teal');metal(H,R,i-.07,1.54,.28,.28,.04,.1,'teal');}
  for(const z of[.5,1.31])bentTube(H,R,[[.22,1.69,z],[11.77,1.69,z]],2,'teal');
  masonry(H,R,'nw',0,7.7,0,.9,'paper',.9);
  for(const [i,w]of[[1.4,3.25],[6.15,5.3]]){
    for(const x of[i,i+w-1.1]){box(H,R,x,2.02,1.02,1.25,.05,.51,'coral',.32);surface(H,R,H.faceI(x+.17,3.29,.7,.05,.45),'blue',.57);}
    surface(H,R,H.faceI(i+.23,3.3,w-.43,.1,.54),'blue',.48);
    for(const x of[i+.26,i+w-1.03]){const arch=[];for(let n=0;n<=16;n++){const a=Math.PI-n*Math.PI/16;arch.push(H.p(x+.39+Math.cos(a)*.39,3.31,.12+Math.sin(a)*.39));}surface(H,R,[H.p(x,3.31,.09),...arch,H.p(x+.78,3.31,.09)],'blue',.71,.65);H.line(R,arch,'paper',1.5);}
    box(H,R,i-.07,1.93,w+.15,1.5,.56,.19,'paper',1);
    for(const x of[i+.2,i+w-1.2]){H.line(R,[H.p(x,3.28,.73),H.p(x+.49,3.28,.73)],'sun',1.4);}

    for(let z=.94;z<1.62;z+=.22)timber(H,R,i-.03,1.92,w+.06,.11,z,.12,'sun');
    for(const x of[i+.14,i+w-.25])metal(H,R,x,1.97,.09,.09,.68,1.05,'teal');
  }
  const trunk=[H.p(4.94,2.06,.02),H.p(5.8,2.18,.02),H.p(5.43,2.14,1.4),H.p(5.65,2.25,3.8),H.p(5.2,2.16,4.3),H.p(4.95,2.04,2.15)];surface(H,R,trunk,'sun',.56);
  stroke(H,R,[H.p(5.31,2.2,2.1),H.p(4.5,2.12,3.2),H.p(2.9,2.03,4.05)],'blue',8);stroke(H,R,[H.p(5.31,2.2,2.1),H.p(4.5,2.12,3.2),H.p(2.9,2.03,4.05)],'sun',6);
  stroke(H,R,[H.p(5.36,2.2,3.2),H.p(7.52,2.16,4.28),H.p(9.7,2.1,4.13)],'blue',7);stroke(H,R,[H.p(5.36,2.2,3.2),H.p(7.52,2.16,4.28),H.p(9.7,2.1,4.13)],'sun',5.2);
  for(const j of[1.72,2.45])stroke(H,R,[H.p(5.36,2.14,.45),H.p(5.05,j,.05),H.p(4.45,j+.3,.025)],'sun',4);
  for(const [i,j,w,d]of[[4.15,1.91,.24,2.08],[5.85,1.91,.24,2.08],[4.15,3.75,1.91,.24]])box(H,R,i,j,w,d,.02,.18,'paper',1);
  surface(H,R,H.tile(4.4,2.74,1.2,1.1,.08),'blue',.38);
  for(const [i,j,k]of[[4.52,3.37,1],[5.29,3.53,-1],[5.4,2.92,1],[4.86,3.64,-1]]){const p=H.p(i,j,.09);surface(H,R,[[p[0]-5,p[1]],[p[0]+2,p[1]-3],[p[0]+6,p[1]],[p[0]-1,p[1]+2]],k>0?'sun':'coral',.4,.45);}
  for(const j of[2.19,2.44])bentTube(H,R,[[4.96,j,1.28],[5.64,j,1.28]],2,'teal');
  const bark=H.p(5.25,2.19,1.87);stroke(H,R,[[bark[0]-5,bark[1]+20],[bark[0]-1,bark[1]+4],[bark[0]-4,bark[1]-18],[bark[0]+2,bark[1]-32]],'coral',1);H.outline(R,ell(bark[0]+4,bark[1]-9,4,8),'blue',.8);
H.line(R,[H.p(4.4,2.74,.085),H.p(5.6,2.74,.085)],'paper',1.5);
  for(const i of[.53,10.93]){timber(H,R,i,2.66,.19,.19,0,3.38,'teal');metal(H,R,i-.1,2.55,.4,.42,0,.11,'teal');}
  timber(H,R,.4,2.63,10.86,.25,3.36,.21,'teal');
  for(const i of[.53,10.93]){bentTube(H,R,[[i,2.67,2.67],[i,1.88,3.35]],3,'teal');bentTube(H,R,[[i,2.67,2.67],[i+(i<1?1.1:-1.1),2.67,3.35]],3,'teal');for(const z of[.15,2.7,3.25])H.dot(...H.p(i+.1,2.81,z),1.6,'sun');}
  for(const i of[.55,3.15,5.7,8.25,10.85])timber(H,R,i,.07,.13,2.65,3.52,.11,'sun');
  for(const [a,b]of[[.35,4.44],[6.08,11.24]])surface(H,R,[H.p(a,.06,3.75),H.p(b,.06,3.75),H.p(b,2.87,3.59),H.p(a,2.87,3.59)],'teal',.32);
  for(let i=.55;i<11.1;i+=.57)if(i<4.44||i>6.08)H.line(R,[H.p(i,.12,3.75),H.p(i,2.82,3.6)],'blue',.6,{tone:.55});
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
  surface(H,R,H.tile(.21,5.34,1.32,2.31,.04),'blue',.24);box(H,R,.19,5.31,.23,2.4,.04,.28,'paper',1);box(H,R,.2,7.49,1.48,.24,.04,.28,'paper',1);
  for(const [i,j,h]of[[.66,5.81,1.04],[.95,6.36,.67],[.6,6.93,.83]]){const p=H.p(i,j,.13);for(let n=0;n<5;n++){const d=n-2;stroke(H,R,[[p[0],p[1]],[p[0]+d*4,p[1]-h*16],[p[0]+d*7,p[1]-h*27+Math.abs(d)*4]],'teal',1.6);surface(H,R,[[p[0]+d*4,p[1]-h*16],[p[0]+d*7-5,p[1]-h*23],[p[0]+d*7,p[1]-h*27+Math.abs(d)*4],[p[0]+d*7+4,p[1]-h*19]],'teal',.4,.4);}}
  box(H,R,.43,8.5,2.6,.98,0,.51,'teal',.43);timber(H,R,.34,8.42,2.77,1.1,.51,.12,'sun');
  for(const x of[.55,1.35,2.2])surface(H,R,H.faceI(x,9.5,.6,.15,.46),'blue',.5);
  const rolled=H.p(1.08,9.0,.69);oval(H,R,...rolled,18,5,'coral',.42);oval(H,R,rolled[0]+14,rolled[1],5,5,'paper',1);H.line(R,[[rolled[0]-10,rolled[1]-4],[rolled[0]-10,rolled[1]+4]],'blue',2);
  surface(H,R,H.tile(1.48,9.73,.9,.55,.035),'blue',.12);for(let n=0;n<5;n++)H.line(R,[H.p(1.55+n*.14,9.8,.04),H.p(1.55+n*.14,10.19,.04)],'sun',1.7);
  const tote=H.p(2.38,8.82,.7);surface(H,R,[[tote[0]-13,tote[1]],[tote[0]+13,tote[1]],[tote[0]+10,tote[1]-22],[tote[0]-11,tote[1]-22]],'paper',1);stroke(H,R,[[tote[0]-8,tote[1]-21],[tote[0]-6,tote[1]-33],[tote[0]+6,tote[1]-33],[tote[0]+8,tote[1]-21]],'coral',2);H.line(R,[[tote[0]-8,tote[1]-9],[tote[0]+8,tote[1]-9]],'teal',1);
  for(const i of[.82,1.41]){const p=H.p(i,9.64,.045);surface(H,R,[[p[0]-9,p[1]+3],[p[0]+8,p[1]+3],[p[0]+7,p[1]-4],[p[0],p[1]-8],[p[0]-7,p[1]-6]],'paper',1);for(let n=0;n<3;n++)H.line(R,[[p[0]-3+n*3,p[1]-5],[p[0]-1+n*3,p[1]-1]],'coral',.7);}
  const radio=H.p(6.68,2.6,.79);surface(H,R,[[radio[0]-14,radio[1]],[radio[0]+13,radio[1]],[radio[0]+13,radio[1]-17],[radio[0]-14,radio[1]-17]],'teal',.5);oval(H,R,radio[0]-5,radio[1]-8,6,6,'blue',.6);for(let n=-4;n<5;n+=2)H.line(R,[[radio[0]-9,radio[1]-8+n],[radio[0]-1,radio[1]-8+n]],'paper',.5);H.dot(radio[0]+8,radio[1]-11,2,'sun');stroke(H,R,[[radio[0]-7,radio[1]-18],[radio[0]+8,radio[1]-18],[radio[0]+9,radio[1]-30]],'blue',1);
  drape(H,R,10.29,2.1,.65,.81,.79,.23,'paper');
  const cycleWheels=[[9.2,9.0],[11.04,9.0]].map(([i,j])=>H.p(i,j,.69));
  for(const [x,y]of cycleWheels){H.outline(R,ell(x,y,18,23),'blue',3);H.outline(R,ell(x,y,15,20),'paper',1.2);for(let n=0;n<10;n++){const a=n*Math.PI/5;H.line(R,[[x,y],[x+Math.cos(a)*15,y+Math.sin(a)*20]],'blue',.6);}H.dot(x,y,2,'sun');}
  const A=cycleWheels[0],B=cycleWheels[1],C=H.p(10.22,9,.48),D=H.p(9.98,9,1.4),E=H.p(10.76,9,1.42);stroke(H,R,[A,D,C,A],'teal',3);stroke(H,R,[D,E,C,D],'teal',3);stroke(H,R,[E,B],'teal',3);stroke(H,R,[D,H.p(9.92,9,1.6)],'blue',2);stroke(H,R,[E,H.p(10.61,9,1.91),H.p(10.31,9,1.92)],'blue',2);oval(H,R,...H.p(9.92,9,1.61),9,3,'coral',.65);H.outline(R,ell(...C,6,6),'sun',1.5);stroke(H,R,[C,[C[0]+10,C[1]+7],[C[0]+16,C[1]+7]],'blue',1.7);
  const basket=H.p(10.71,8.83,1.59);surface(H,R,[[basket[0]-13,basket[1]-20],[basket[0]+14,basket[1]-20],[basket[0]+9,basket[1]],[basket[0]-8,basket[1]]],'sun',.35);for(let n=0;n<5;n++)H.line(R,[[basket[0]-9+n*5,basket[1]-18],[basket[0]-6+n*3,basket[1]-2]],'blue',.6);for(let n=0;n<3;n++)H.line(R,[[basket[0]-11,basket[1]-15+n*5],[basket[0]+12,basket[1]-15+n*5]],'coral',.65);
  bentTube(H,R,[[9.6,8.6,.03],[9.6,8.6,.75],[10.19,8.6,.83],[10.19,8.6,.03]],2.5,'teal');
  const lock=H.p(9.95,8.65,.65);H.outline(R,ell(...lock,8,12),'blue',2);box(H,R,9.45,9.9,1.55,.65,0,.09,'teal',.4);
},(H,R,time)=>{
  const t=((time%22)+22)%22;
  walker(H,R,3.73,6.1,stretchAt(t),'teal',H.p(3.4,5.55,1.05));
  walker(H,R,7.02,6.1,stretchAt(Math.max(0,t-1.2)),'coral',H.p(6.65,5.55,1.05));
  for(const [i,j,z,w,d]of[[3.55,1.9,4.34,40,22],[4.78,1.48,4.92,43,26],[6.03,1.38,4.88,46,24],[7.59,1.67,4.49,43,24],[9.15,1.71,4.14,32,20]]){
    const sway=Math.sin(t*Math.PI*2/22+i)*1.1,[x,y]=H.p(i,j,z);
    stroke(H,R,[H.p(5.37,2.19,3.74),H.p((i+5.37)*.5,j,4.17),[x+sway,y]],'sun',3.1);
    const leaves=[];for(let n=0;n<28;n++){const a=n*Math.PI/14,r=1+(n%3)*.075;leaves.push([x+sway+Math.cos(a)*w*r,y+Math.sin(a)*d*r]);}surface(H,R,leaves,'teal',.49,.65);
    const lower=leaves.slice(0,15);H.line(R,lower,'blue',1.2,{tone:.55});
    for(let n=0;n<9;n++){const xx=x+sway+(n%3-1)*w*.57,yy=y+(Math.floor(n/3)-1)*d*.52;surface(H,R,[[xx-7,yy],[xx-3,yy-7],[xx+6,yy-4],[xx+8,yy+2],[xx+1,yy+5]],'teal',n%2?.3:.63,.4);H.line(R,[[xx-4,yy+2],[xx+4,yy-3]],'paper',.6);}
    for(const d of[-1,1]){stroke(H,R,[[x+d*w*.55,y+d*2],[x+d*w*.68,y+16],[x+d*w*.74,y+25]],'sun',.9);surface(H,R,[[x+d*w*.69,y+18],[x+d*w*.86,y+18],[x+d*w*.77,y+29]],'teal',.5,.5);}
  }
  const [x,y]=H.p(8.86,2.67,.82);stroke(H,R,[[x,y],[x+2+Math.sin(t*Math.PI*2/22)*2,y+13],[x+5,y+21]],'coral',1);
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
