import { world, shape, oval, stroke, box, ell, loop, TAU } from '../../worlds/common.js';
import { timber, metal, vessel, bentTube, drape, cushion, benchFrame } from '../materials.js';
import { cabinetFrame, rackFrame, masonry } from '../structure.js';
import { windowBay, hangingRail, caster } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function person(H, R, foot, hands, shirt = 'teal', scale = 1, head = 0) {
  const [x, y] = foot, P = (a, b) => [x + a * scale, y + b * scale];
  oval(H, R, x + 2, y + 2, 14 * scale, 4 * scale, 'blue', .18);
  for (const s of [-1, 1]) {
    stroke(H, R, [P(s * 5, -29), P(s * 6, -14), P(s * 8, -1)], 'blue', 6 * scale);
    oval(H, R, ...P(s * 8 + 2, 0), 5 * scale, 2.5 * scale, 'blue', .9);
  }
  shape(H, R, loop([P(-8, -56), P(8, -55), P(10, -28), P(-9, -28)], 1), shirt, .65, .9);
  H.line(R, [P(-6, -30), P(7, -30)], 'paper', .65);
  oval(H, R, ...P(head, -66), 7.5 * scale, 8 * scale, 'coral', .3);
  shape(H, R, [P(-8 + head, -67), P(-7 + head, -73), P(head, -76), P(7 + head, -71), P(8 + head, -66), P(head, -69), P(-5 + head, -64)], 'blue', .86, .5);
  H.dot(...P(3 + head, -66), .8 * scale, 'blue');
  H.line(R, [P(2 + head, -61), P(5 + head, -61)], 'blue', .5);
  hands.forEach((hand, n) => {
    const s = n ? 1 : -1, sh = P(s * 6, -52), el = [(sh[0] + hand[0]) / 2 + s * 5, (sh[1] + hand[1]) / 2 + 8];
    stroke(H, R, [sh, el, hand], 'blue', 5.8 * scale);
    stroke(H, R, [sh, el, hand], shirt, 4.2 * scale);
    oval(H, R, ...hand, 2.4 * scale, 2 * scale, 'coral', .38);
  });
}

function birdBody(H,R,x,y,s=1){
  const P=(a,b)=>[x+a*s,y+b*s];
  shape(H,R,loop([P(-55,1),P(-68,-18),P(-43,-37),P(9,-31),P(33,-59),P(43,-90),P(67,-102),P(87,-91),P(84,-66),P(65,-52),P(61,-9),P(31,18),P(-19,24)],2),'coral',.63,1);
  shape(H,R,loop([P(-46,-9),P(-25,-23),P(23,-13),P(44,-36),P(45,-4),P(24,15),P(-17,15)],1),'sun',.6,.7);
  shape(H,R,[P(80,-89),P(119,-69),P(82,-70)],'sun',.8,.8);
  H.line(R,[P(86,-78),P(111,-71)],'blue',.65);
  oval(H,R,...P(68,-85),8*s,9*s,'paper',1);oval(H,R,...P(69,-85),3*s,4*s,'blue',.9);
  for(const a of [-35,-12,12,34])stroke(H,R,[P(a,-21),P(a+6,2),P(a+2,17)],'paper',.8);
  for(const [a,b,c] of [[-33,-24,'teal'],[-8,-21,'paper'],[19,-16,'teal'],[41,-48,'paper']])shape(H,R,[P(a,b),P(a+14,b+2),P(a+12,b+12),P(a-2,b+9)],c,c==='paper'?1:.63,.5);
  const socket=P(8,-19);oval(H,R,...socket,10*s,8*s,'blue',.78);oval(H,R,...socket,6*s,4.5*s,'sun',.8);H.line(R,[socket,P(22,-13)],'blue',5*s);H.line(R,[socket,P(22,-13)],'paper',1.2*s);
}
function wing(H,R,x,y,lift){
  const angle=-.11-lift*.21,P=(a,b)=>[x+a*Math.cos(angle)-b*Math.sin(angle),y+a*Math.sin(angle)+b*Math.cos(angle)];
  const outline=loop([P(-8,0),P(17,-32),P(62,-47),P(104,-33),P(119,-5),P(106,-1),P(111,10),P(92,6),P(95,21),P(76,13),P(71,28),P(52,16),P(40,31),P(22,19),P(7,17)],1);
  shape(H,R,outline,'paper',1,1);
  const ribs=[[2,4,29,-26],[11,7,48,-31],[24,11,65,-33],[40,14,81,-25],[56,11,96,-18],[76,9,105,-7]];
  for(const [a,b,c,d] of ribs){stroke(H,R,[P(a,b),P((a+c)/2,(b+d)/2-3),P(c,d)],'sun',5);stroke(H,R,[P(a,b),P(c,d)],'blue',.65);}
  for(let n=0;n<5;n++){const a=24+n*17;shape(H,R,[P(a,-18),P(a+14,-21),P(a+15,-8),P(a+3,-6)],n%2?'coral':'teal',.33,.4);}
  shape(H,R,[P(32,3),P(48,1),P(53,14),P(37,17)],'coral',.35,.5);
  for(let n=0;n<6;n++)H.line(R,[P(35+n*2,4),P(37+n*2,14)],'paper',.65);
  for(let n=0;n<14;n++)H.line(R,[P(15+n*6,20-(n%3)*3),P(16+n*6,23-(n%3)*3)],'sun',.7);
  oval(H,R,...P(0,6),6,4,'blue',.7);
  return [P(12,13),P(85,13)];
}
const room=world('mexico-city-carton-wings','A wing waits to fly',{wall:false,floor:'paper',tone:1,head:70},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.55,'teal',.26);
  masonry(H,R,'nw',0,12,0,3.9,'paper',.8);
  windowBay(H,R,'nw',.8,6.4,2.58,1.08,{ink:'teal',divisions:4});
  for(const z of [4.31,4.59])bentTube(H,R,[[.05,.1,z],[11.98,.1,z]],2.8,'blue');
  for(let i=.1;i<11.2;i+=1.6)H.line(R,[H.p(i,.1,4.32),H.p(i+.8,.1,4.59),H.p(i+1.6,.1,4.32)],'blue',1.7);
  for(const i of [3,6,9])H.line(R,[H.p(i,.1,.02),H.p(i,11.88,.02)],'blue',.6,{tone:.24});
  for(const j of [4,8])H.line(R,[H.p(.1,j,.02),H.p(11.9,j,.02)],'blue',.6,{tone:.24});
  rackFrame(H,R,7.94,.62,3.43,1.77,.13,[.08,1.26,2.48,3.55],'teal',(i,j,w,d,z,row)=>{
    if(row===0){box(H,R,i+.06,j+.09,w-.13,d-.19,z,.63,'sun',.42);shape(H,R,H.tile(i+.2,j+.3,w-.43,.31,z+.66),'blue',.5,.6);for(let k=0;k<4;k++)H.line(R,[H.p(i+.34+k*.56,j+d-.13,z+.21),H.p(i+.76+k*.56,j+d-.13,z+.21)],'paper',.9);}
    if(row===1){for(let k=0;k<7;k++){shape(H,R,[H.p(i+.1+k*.41,j+.23,z),H.p(i+.36+k*.41,j+.23,z),H.p(i+.29+k*.41,j+.1,z+1.01),H.p(i+.05+k*.41,j+.1,z+.87)],k%3===0?'coral':'sun',.42,.55);}}
    if(row===2){for(let k=0;k<4;k++){vessel(H,R,i+.36+k*.73,j+.74,z,8,12,k%2?'teal':'coral',false);}const p=H.p(i+.38,j+.8,z+.56);birdBody(H,R,p[0],p[1],.21);H.line(R,[[p[0]+3,p[1]+5],[p[0]+3,p[1]+15],[p[0]+20,p[1]+15]],'blue',2);}
    if(row===3){for(let k=0;k<3;k++)shape(H,R,H.tile(i+.12,j+.1,w-.25,d-.2,z+k*.06),'sun',.29,.5);}
  });
  for(let n=0;n<5;n++){
    const i=8.2+n*.57,P=(a,z)=>H.p(i+a,2.51,z);
    shape(H,R,[P(0,1.64),P(.15,1.51),P(.41,1.74),P(.35,2.52),P(.2,2.65),P(.04,2.43)],n%2?'paper':'sun',n%2?1:.42,.55);
    H.line(R,[P(.19,1.69),P(.2,2.51)],'coral',.8);
    for(let k=0;k<4;k++)H.line(R,[P(.19,1.79+k*.16),P(.33,1.9+k*.16)],'teal',.65);
  }
  for(let n=0;n<3;n++){
    const p=H.p(8.7+n*.91,2.5,3.21);shape(H,R,[[p[0]-10,p[1]],[p[0]-8,p[1]-16],[p[0]+9,p[1]-21],[p[0]+13,p[1]-4]],n%2?'coral':'paper',n%2?.48:1,.6);
    H.line(R,[[p[0]-8,p[1]-4],[p[0]+9,p[1]-8]],'teal',1.4);
  }
  for(let n=0;n<3;n++){
    const i=1.08+n*1.87,P=(a,b)=>H.p(i+a,.28,1.57+b);
    shape(H,R,[P(0,0),P(1.54,0),P(1.54,1.04),P(0,1.04)],'paper',1,.65);
    if(n===0){for(const a of [.28,.85])H.line(R,[P(a,.15),P(a+.12,.6),P(a+.3,.82)],'blue',1);H.line(R,[P(.34,.62),P(1.12,.67)],'coral',2);}
    else{const p=P(.8,.45);shape(H,R,[[p[0]-13,p[1]],[p[0]-5,p[1]-12],[p[0]+3,p[1]-4],[p[0]+12,p[1]-10],[p[0]+7,p[1]+9]],n===1?'teal':'coral',.6,.7);}
    for(const a of [.07,1.47])H.dot(...P(a,.94),1.5,'sun');
  }
  benchFrame(H,R,.78,4.27,1.61,4.05,1.17,'sun');
  for(let n=0;n<4;n++)shape(H,R,H.tile(.95,4.56+n*.77,1.24,.62,1.2),'paper',1,.55);
  vessel(H,R,1.55,7.63,1.23,13,13,'paper',false);
  const beak=H.p(1.43,5.62,1.25);shape(H,R,[[beak[0]-9,beak[1]-15],[beak[0]+16,beak[1]],[beak[0]-7,beak[1]+7]],'sun',.65,.65);
  for(let n=0;n<3;n++)H.line(R,[[beak[0]-5+n*4,beak[1]],[beak[0]-10+n*6,beak[1]-28]],'blue',1.2);
  for(const i of [3.89,6.79])for(const j of [3.77,6.24])caster(H,R,i,j,.11);
  timber(H,R,3.61,3.59,3.64,2.93,.37,.19,'sun');
  for(const i of [4.02,6.58]){
    timber(H,R,i,3.9,.2,2.27,.53,1.03,'sun');
    bentTube(H,R,[[i,4.01,.55],[i,6.09,1.46]],2.2,'teal');
    cushion(H,R,i-.24,4.14,.72,1.72,1.5,.27,'paper');
  }
  metal(H,R,5.31,4.32,.28,.27,.56,1.11,'teal');
  box(H,R,4.65,4.42,1.45,.92,.58,.4,'blue',.52);
  drape(H,R,5.83,3.91,.62,1.91,1.78,.29,'paper');
  const bp=H.p(5.02,4.89,2.01);birdBody(H,R,bp[0],bp[1],1.18);
  for(let n=0;n<4;n++)shape(H,R,[H.p(3.96,4.64,2.2+n*.09),H.p(2.48,4.56,2.63+n*.05),H.p(3.31,5.27,1.97+n*.08),H.p(4.25,5.06,1.88+n*.09)],n%2?'coral':'teal',.6,.7);
  for(const j of [8.71,9.65])timber(H,R,7.5,j,3.59,.24,.11,.68,'sun');
  for(const i of [7.62,10.81])timber(H,R,i,8.77,.15,1.13,.12,.12,'teal');
  cushion(H,R,7.47,8.61,3.7,1.41,.78,.21,'paper');
  shape(H,R,H.tile(3.06,9.48,1.43,.9,.08),'sun',.52,.65);
  for(let n=0;n<12;n++)H.line(R,[H.p(3.13+n*.1,10.39,.08),H.p(3.18+n*.1,10.39,.23),H.p(3.23+n*.1,10.39,.08)],'coral',.7);
  for(const [i,j,ink] of [[4.94,9.35,'paper'],[5.64,10.08,'coral']])shape(H,R,[H.p(i,j,.08),H.p(i+1,j+.07,.08),H.p(i+.81,j+.7,.08),H.p(i+.18,j+.88,.08)],ink,ink==='paper'?1:.5,.7);
  H.line(R,[H.p(5.65,10.12,.09),H.p(6.24,10.52,.09)],'teal',1.5);
  const foot=H.p(7.72,10.43,.11);stroke(H,R,[[foot[0],foot[1]-13],[foot[0],foot[1]],[foot[0]+12,foot[1]+3]],'sun',4);H.line(R,[[foot[0],foot[1]],[foot[0]-8,foot[1]+4]],'sun',3);
  for(const j of [3.7,5.1])bentTube(H,R,[[11.56,j,.05],[11.56,j,3.1]],2.4,'sun');
  for(let z=.32;z<3.1;z+=.43)bentTube(H,R,[[11.56,3.7,z],[11.56,5.1,z]],2,'sun');
},(H,R,t)=>{
  const u=((t%20)+20)%20,fit=ease(4,8,u)*(1-ease(12,18,u));
  const rest=H.p(7.78,9.05,1.1),socket=H.p(5.65,5.04,2.01),x=rest[0]+(socket[0]-rest[0])*fit,y=rest[1]+(socket[1]-rest[1])*fit;
  const hands=wing(H,R,x,y,fit);
  person(H,R,[x-25,y+115],[[hands[0][0]-5,hands[0][1]-3],hands[0]],'teal',1.5,-fit);
  person(H,R,[x+115,y+92],[hands[1],[hands[1][0]+9,hands[1][1]-6]],'coral',1.5,fit);
  wing(H,R,x,y,fit);
  for(const p of hands)oval(H,R,...p,2.8,2.3,'coral',.4);
  const p=H.p(7.32,.35,3.95),swing=Math.sin(u*TAU/20)*4;
  H.line(R,[[p[0],p[1]-12],[p[0]+swing,p[1]+8]],'blue',.8);
  shape(H,R,loop([[p[0]+swing,p[1]+5],[p[0]+13+swing,p[1]+14],[p[0]+7+swing,p[1]+38],[p[0]-6+swing,p[1]+24]],1),'paper',1,.6);
  H.line(R,[[p[0]+swing,p[1]+8],[p[0]+7+swing,p[1]+35]],'teal',1);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
