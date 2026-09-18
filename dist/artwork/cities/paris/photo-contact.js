import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, benchFrame, drape } from '../materials.js';
import { windowBay, floorShadow, caster, wallRack, taskLight } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function camera(H,R,i,j,z,s=1){
  const [x,y]=H.p(i,j,z);shape(H,R,[[x-17*s,y],[x+17*s,y],[x+17*s,y-20*s],[x-17*s,y-20*s]],'blue',.78,.8);
  shape(H,R,[[x-8*s,y-20*s],[x-5*s,y-26*s],[x+7*s,y-26*s],[x+10*s,y-20*s]],'teal',.6,.65);
  oval(H,R,x+2*s,y-10*s,10*s,9*s,'paper',1);oval(H,R,x+2*s,y-10*s,7*s,6.5*s,'blue',.75);H.line(R,[[x-2*s,y-14*s],[x+4*s,y-8*s]],'teal',2*s);
  H.dot(x+12*s,y-19*s,1.7*s,'sun');
}
function photo(H,R,P,x,y,w,h,variant=0){
  shape(H,R,[P(x,y),P(x+w,y),P(x+w,y+h),P(x,y+h)],'paper',1,.5);
  const B=(a,b)=>P(x+a*w,y+b*h),v=Number(variant);
  shape(H,R,[B(.07,.08),B(.93,.08),B(.93,.92),B(.07,.92)],'teal',.18+v%3*.09,.4);
  if(v%3===0){
    const shift=(v%4)*.05;
    shape(H,R,[B(.1,.14),B(.89,.14),B(.89,.47),B(.64,.47),B(.45+shift,.85),B(.25,.54),B(.1,.54)],'blue',.66,.5);
    for(let n=0;n<3;n++)shape(H,R,[B(.18+n*.24,.21),B(.3+n*.24,.21),B(.3+n*.24,.43),B(.18+n*.24,.43)],'paper',1,.3);
    H.line(R,[B(.09,.61),B(.9,.7-shift)],'sun',1.2);
  }else if(v%3===1){
    shape(H,R,[B(.09,.12),B(.36,.12),B(.36,.71),B(.2,.88),B(.09,.88)],'blue',.76,.4);
    shape(H,R,[B(.6,.12),B(.9,.12),B(.9,.87),B(.79,.73),B(.6,.63)],'blue',.52,.4);
    H.line(R,[B(.39,.83),B(.49,.43),B(.58,.84)],'sun',1.2);
    const q=B(.49,.35);oval(H,R,...q,w*2.1,h*2.8,'blue',.8);
  }else{
    shape(H,R,[B(.1,.12),B(.9,.12),B(.9,.48),B(.67,.4),B(.4,.57),B(.1,.42)],'blue',.61,.4);
    for(let n=0;n<3;n++)H.line(R,[B(.15+n*.07,.64+n*.09),B(.84-n*.08,.66+n*.08)],'paper',1.1);
    shape(H,R,[B(.33,.5),B(.71,.5),B(.61,.62),B(.4,.61)],'coral',.65,.4);
    H.line(R,[B(.51,.52),B(.51,.21),B(.7,.43),B(.51,.43)],'sun',1);
  }
  if(v===3||v===7)H.line(R,[B(.05,.1),B(.05,.94),B(.96,.94),B(.96,.1)],'coral',1.6);
  if(v===5){H.line(R,[B(.14,.84),B(.87,.15)],'coral',1.4);H.line(R,[B(.14,.15),B(.87,.84)],'coral',1.4);}
  if(v===6)for(const [a,b,da,db]of[[.2,.2,.17,0],[.2,.2,0,.18],[.8,.8,-.17,0],[.8,.8,0,-.18]])H.line(R,[B(a,b),B(a+da,b+db)],'coral',1.3);
}
function photographer(H,R,i,j,hands,look=0){
  const [x,y]=H.p(i,j,0),cx=x-look*3;oval(H,R,x,y,16,4,'blue',.14);
  for(const s of [-1,1]){stroke(H,R,[[x+s*5,y-26],[x+s*7,y-2]],'blue',7);oval(H,R,x+s*7+2,y,6,3,'blue',.9);}
  shape(H,R,[[cx-11,y-51],[cx+11,y-51],[x+10,y-24],[x-10,y-24]],'teal',.7,.8);
  for(let n=0;n<2;n++){const a=[cx+(n?9:-9),y-47],b=hands[n],m=[(a[0]+b[0])/2+(n?3:-3),Math.max(a[1],b[1])+5];stroke(H,R,[a,m,b],'blue',8);stroke(H,R,[a,m,b],'teal',5.6);oval(H,R,...b,3,2.8,'paper',1);}
  oval(H,R,cx,y-62,9,10,'paper',1);shape(H,R,[[cx-10,y-60],[cx-10,y-69],[cx-4,y-75],[cx+7,y-73],[cx+10,y-65],[cx+2,y-68],[cx-5,y-64]],'blue',.9,.7);
  for(const dx of [-2,4]){oval(H,R,cx+dx,y-61+look,2.8,2.2,'paper',1);H.dot(cx+dx,y-61+look,.7,'blue');}
}
const room=world('paris-photo-contact','The picture returns to light',{floor:'teal',tone:.16,wall:'paper',wallTone:.85,height:3.95,head: 20},(H,R)=>{
  for(let n=0;n<12;n++){H.line(R,[H.p(n,0,.02),H.p(n,12,.02)],'blue',.55,{tone:.32});H.line(R,[H.p(0,n,.02),H.p(12,n,.02)],'blue',.55,{tone:.32});}
  for(let n=0;n<11;n++)shape(H,R,H.tile(10.92,n+.07,.55,.66,.025),'sun',.32,.4);
  const W=windowBay(H,R,'ne',1.02,10.16,1.47,2.23,{divisions:5,ink:'teal',view:P=>{
    for(let n=0;n<8;n++){const x=.22+n*1.22,h=.55+n%3*.25;shape(H,R,[P(x,.15),P(x+1.04,.15),P(x+1.04,h),P(x+.5,h+.19),P(x,h)],n%3===0?'coral':'teal',.14,.45);for(let k=0;k<3;k++)H.line(R,[P(x+.22+k*.28,.27),P(x+.22+k*.28,.45)],'paper',1.5);}
  }});
  H.line(R,[W(8.13,.13,.3),W(8.46,.48,.75)],'blue',1.4);
  H.tint(H.tile(2.2,1.15,8.85,6.75,.025),'sun',.13);
  for(const x of [3.22,6.17,9.74]){
    metal(H,R,x,.4,.17,1.29,.07,.78,'teal');
    bentTube(H,R,[[x+.07,.51,.17],[x+.07,1.48,.69]],1.7,'sun');
  }
  timber(H,R,3.11,.35,6.99,1.41,.84,.12,'sun');
  timber(H,R,3.3,.46,6.61,1.12,.3,.08,'teal');
  for(let n=0;n<4;n++){
    const x=3.5+n*1.55;metal(H,R,x,.57,1.23,.91,.39,.23,n===1?'teal':'paper');
    H.line(R,[H.p(x+.32,1.49,.5),H.p(x+.9,1.49,.5)],'blue',1.8);
  }
  for(let n=0;n<3;n++){
    const x=3.41+n*.84;shape(H,R,H.tile(x,.54,.68,.97,.98),'paper',1,.5);
    for(let k=0;k<4;k++)shape(H,R,H.tile(x+.1,.64+k*.18,.48,.14,.99),'blue',.22+k*.15,.4);
  }
  const lens=H.p(7.02,.98,.98);oval(H,R,...lens,12,5,'blue',.74);shape(H,R,[[lens[0]-11,lens[1]],[lens[0]+11,lens[1]],[lens[0]+10,lens[1]-19],[lens[0]-10,lens[1]-19]],'teal',.6,.6);oval(H,R,lens[0],lens[1]-19,10,4,'paper',1);oval(H,R,lens[0],lens[1]-19,7,2.5,'blue',.8);
  for(let n=0;n<3;n++)H.line(R,[[lens[0]-11,lens[1]-4-n*4],[lens[0]+11,lens[1]-4-n*4]],'sun',.8);
  drape(H,R,7.77,.53,.95,1.13,.98,.25,'paper');
  const blower=H.p(8.32,1.15,1.01);oval(H,R,...blower,8,6,'coral',.75);H.line(R,[[blower[0]+6,blower[1]-3],[blower[0]+15,blower[1]-12]],'blue',2.7);
  taskLight(H,R,9.42,.73,.98,'coral',-.6);
  for(const x of [3.41,5.53,7.77,9.86]){
    const p=H.p(x,.31,1.47);H.line(R,[[p[0],p[1]],[p[0],p[1]-5]],'teal',2);
  }
  floorShadow(H,.42,1.0,1.73,7.75,.2);
  shape(H,R,H.faceJ(1.9,1.05,7.4,.18,3.11),'blue',.57,.9);
  timber(H,R,.5,.85,1.49,.18,.12,3.13,'sun');timber(H,R,.5,8.35,1.49,.18,.12,3.13,'sun');timber(H,R,.47,.82,1.58,7.74,3.2,.15,'sun');
  for(let n=0;n<6;n++){
    const z=.22+n*.255;shape(H,R,H.faceJ(1.98,1.1,7.14,z,z+.21),'sun',.54,.7);
    for(const j of [2.5,6.2]){H.line(R,[H.p(2.02,j,z+.1),H.p(2.02,j+.52,z+.1)],'blue',2);shape(H,R,H.faceJ(2.03,j-.36,.23,z+.04,z+.15),'paper',1,.3);}
  }
  timber(H,R,.54,.97,1.44,7.42,1.87,.1,'sun');
  for(const j of [3.55,5.75])timber(H,R,.54,j,1.44,.12,1.96,1.19,'sun');
  for(const j of [1.21,3.62,5.82]){
    shape(H,R,H.faceJ(2.03,j,1.01,2.04,2.96),'paper',.14,.6);
    H.line(R,[H.p(2.04,j+.17,2.15),H.p(2.04,j+.63,2.86)],'paper',1.2);
    H.line(R,[H.p(2.05,j+.86,2.35),H.p(2.05,j+.86,2.54)],'sun',1.6);
  }
  for(let n=0;n<4;n++){
    const p=H.p(1.42,5.96+n*.43,2.94);oval(H,R,...p,5,3,'blue',.75);oval(H,R,p[0],p[1]-8,5,3,'teal',.65);H.line(R,[[p[0]-5,p[1]],[p[0]-5,p[1]-8]],'blue',.7);
  }
  camera(H,R,1.32,2.15,2.03,.7);camera(H,R,1.3,4.53,2.03,.53);
  for(let n=0;n<4;n++)metal(H,R,.88,6.11+n*.45,.77,.16,1.99,.8,n%2?'paper':'teal');
  const strap=H.p(1.77,2.46,2.11);stroke(H,R,[[strap[0]-16,strap[1]-10],[strap[0]-24,strap[1]+20],[strap[0]-4,strap[1]+27],[strap[0]+10,strap[1]-7]],'blue',2);H.line(R,[[strap[0]-15,strap[1]+25],[strap[0]-7,strap[1]+27]],'coral',4);
  const paperCam=H.p(1.18,7.52,3.36);shape(H,R,[[paperCam[0]-7,paperCam[1]],[paperCam[0]+8,paperCam[1]],[paperCam[0]+8,paperCam[1]-9],[paperCam[0]-7,paperCam[1]-9]],'paper',1,.6);oval(H,R,paperCam[0]+1,paperCam[1]-4,3,2.7,'teal',.35);
  const body=(a,b,z)=>H.p(10.28+a,3.23+b,z);
  for(const [i,j] of [[9.62,2.62],[11.13,2.91],[10.37,4.24]])bentTube(H,R,[[i,j,.03],[10.3,3.22,1.69]],2.8,'sun');
  metal(H,R,9.99,2.94,.61,.64,1.58,.16,'teal');
  timber(H,R,9.77,2.64,1.16,1.14,1.76,.12,'sun');
  shape(H,R,[body(-.46,-.5,1.87),body(.46,-.5,1.87),body(.46,-.5,2.72),body(-.46,-.5,2.72)],'sun',.7,.85);
  shape(H,R,[body(-.41,.47,1.91),body(.41,.47,1.91),body(.41,.47,2.65),body(-.41,.47,2.65)],'blue',.83,.85);
  for(let n=0;n<7;n++){
    const j=-.44+n*.14,k=n%2*.04;
    H.line(R,[body(-.4-k,j,1.96),body(-.4-k,j,2.6),body(.4+k,j,2.6),body(.4+k,j,1.96)],n%2?'teal':'blue',2);
  }
  const lc=body(0,.54,2.28);oval(H,R,...lc,16,16,'sun',.75);oval(H,R,...lc,11,11,'blue',.84);oval(H,R,lc[0]-2,lc[1]-2,7,7,'teal',.44);H.line(R,[[lc[0]-6,lc[1]-6],[lc[0]+1,lc[1]+1]],'paper',2);
  drape(H,R,9.85,2.56,.83,.58,2.73,.66,'blue');
  bentTube(H,R,[[10.02,3.22,1.59],[10.02,3.22,1.4],[9.71,3.22,1.4]],1.8,'teal');
  for(const x of [3.45,8.84]){
    bentTube(H,R,[[x,3.61,.08],[x,4.29,1.05],[x,6.73,1.05],[x,7.28,.08]],4,'teal');
    bentTube(H,R,[[x,3.67,.16],[x,7.19,.16]],2.4,'teal');
    for(const j of [3.72,7.15])metal(H,R,x-.15,j-.16,.3,.32,.015,.07,'blue');
  }
  timber(H,R,3.22,3.81,5.89,3.0,.97,.13,'sun');
  timber(H,R,3.66,4.0,4.87,1.48,.43,.09,'teal');
  for(let n=0;n<3;n++){
    const x=3.78+n*1.46;metal(H,R,x,4.17,1.28,1.14,.54,.13,n===1?'teal':'paper');
    shape(H,R,H.tile(x+.13,4.31,1.0,.86,.68),'paper',1,.4);
    H.line(R,[H.p(x+.3,5.32,.61),H.p(x+.91,5.32,.61)],'sun',1.5);
  }
  for(const x of [3.45,8.83]){
    const q=H.p(x,5.72,.97);oval(H,R,...q,6,5,'blue',.75);oval(H,R,...q,3.5,2.8,'sun',.9);
  }
  H.line(R,[H.p(8.89,5.01,1.05),H.p(9.14,4.84,.3),H.p(9.1,3.0,.05),H.p(9.77,1.5,.05)],'blue',1.1);
  metal(H,R,9.71,1.48,.37,.48,.015,.07,'paper');for(let n=0;n<2;n++)oval(H,R,...H.p(9.9,1.62+n*.18,.1),2.2,1,'blue',.8);
  bentTube(H,R,[[3.47,5.92,.28],[8.84,5.92,.28]],2.6,'teal');
  for(const x of [3.48,8.65])metal(H,R,x,6.58,.27,.31,1.07,.13,'teal');
  metal(H,R,8.4,6.02,.77,.72,1.11,.07,'teal');oval(H,R,...H.p(8.77,6.4,1.2),10,4,'blue',.45);
  timber(H,R,3.45,8.86,4.48,.95,.28,.08,'teal');
  for(let n=0;n<4;n++)timber(H,R,3.68+n*.035,8.94+n*.022,2.44,.74,.37+n*.07,.055,n===3?'paper':'sun');
  benchFrame(H,R,3.23,8.67,4.88,1.37,.75,'sun');
  for(let n=0;n<5;n++)shape(H,R,H.tile(3.43+n*.5,8.85,.46,.82,.77),n===4?'coral':'blue',n===4?.6:.15+n*.17,.4);
  photo(H,R,(a,b)=>H.p(a,b,.78),6.21,8.83,1.31,.91,7);
  const crop=[H.p(6.39,8.99,.81),H.p(7.37,8.99,.81),H.p(7.37,9.55,.81),H.p(6.39,9.55,.81)];H.outline(R,crop,'blue',4,{amp:.1});H.line(R,[crop[1],[crop[1][0]*.8+crop[2][0]*.2,crop[1][1]*.8+crop[2][1]*.2]],'paper',4.6);
  benchFrame(H,R,9.48,9.1,1.71,2.35,.73,'teal');drape(H,R,9.58,9.24,1.45,1.9,.76,.35,'paper');
  for(let n=0;n<3;n++)timber(H,R,9.64+n*.03,9.45+n*.04,1.27,1.41,.8+n*.065,.06,n===2?'paper':'sun');
  for(const [i,j] of [[9.55,9.18],[10.86,9.18],[9.55,11.22],[10.86,11.22]])caster(H,R,i,j,.04);
  const tape=H.p(7.7,9.19,.79);oval(H,R,...tape,9,4,'sun',.85);oval(H,R,...tape,4,1.9,'paper',1);H.line(R,[[tape[0]+8,tape[1]],[tape[0]+17,tape[1]+4]],'sun',2);
  benchFrame(H,R,.59,9.24,1.76,1.78,.49,'teal');
  for(let n=0;n<3;n++){
    const j=9.34+n*.41;shape(H,R,[H.p(.75,j,.55),H.p(2.14,j,.55),H.p(2.14,j-.21,1.45+n*.18),H.p(.75,j-.21,1.45+n*.18)],n===1?'coral':'sun',.53,.8);
    H.line(R,[H.p(1.15,j-.11,1.15+n*.16),H.p(1.7,j-.11,1.15+n*.16)],'blue',2.5);
  }
  bentTube(H,R,[[.68,10.78,.07],[.68,10.78,1.0],[2.3,10.78,1.0],[2.3,10.78,.07]],2.4,'teal');
  const brush=H.p(10.18,10.79,1.03);H.line(R,[[brush[0]-11,brush[1]-4],[brush[0]+6,brush[1]+4]],'sun',3.1);for(let n=0;n<4;n++)H.line(R,[[brush[0]+4,brush[1]+3],[brush[0]+12+n,brush[1]+3+n*2]],'blue',.65);
  for(const x of [9.68,10.67])shape(H,R,[H.p(x,9.69,1.02),H.p(x+.25,9.69,1.02),H.p(x+.25,9.98,1.02)],'blue',.72,.6);
  wallRack(H,R,'nw',9.16,2.14,2.38,1.04,1,'teal',(P,z)=>{for(let n=0;n<3;n++)shape(H,R,[P(.21+n*.57,z+.05),P(.65+n*.57,z+.05),P(.65+n*.57,z+.57),P(.21+n*.57,z+.57)],n===1?'paper':'sun',n===1?1:.55,.6);});
},(H,R,t)=>{
  const u=((t%22)+22)%22,raised=ease(0,4.4,u)*(1-ease(17.2,20,u)),held=ease(4.4,8.8,u)*(1-ease(13.2,16.8,u)),a=.12+raised*.36;
  const P=(x,b,z=0)=>H.p(3.25+x,6.64-b*Math.cos(a),1.15+b*Math.sin(a)+z);
  for(const x of [.35,5.45]){stroke(H,R,[P(x,2.55,-.1),H.p(3.25+x,4.42,1.08),P(x,.1,-.1)],'blue',3);oval(H,R,...H.p(3.25+x,4.42,1.1),3.5,3,'coral',.8);}
  for(const x of [.35,5.45]){
    for(let n=0;n<5;n++)H.line(R,[P(x-.08,.6+n*.35,-.1),P(x+.08,.6+n*.35,-.1)],'sun',1.5);
    oval(H,R,...P(x,1.24,-.12),4.3,3,'teal',.85);
  }
  shape(H,R,[P(0,0),P(5.86,0),P(5.86,2.88),P(0,2.88)],'sun',.72,.9);
  shape(H,R,[P(.13,.14,.012),P(5.72,.14,.012),P(5.72,2.74,.012),P(.13,2.74,.012)],'blue',.55,.6);
  shape(H,R,[P(.24,.23,.024),P(5.61,.23,.024),P(5.61,2.63,.024),P(.24,2.63,.024)],'paper',1,.5);
  for(let row=0;row<2;row++)for(let col=0;col<4;col++)photo(H,R,(x,y)=>P(x,y,.035),.43+col*1.29,.43+row*1.01,1.1,.84,row*4+col);
  for(const x of [.37,2.85,5.47]){metal(H,R,3.25+x,6.61,.19,.19,1.12,.15,'teal');shape(H,R,[P(x-.06,2.68,.045),P(x+.17,2.68,.045),P(x+.17,2.86,.045),P(x-.06,2.86,.045)],'teal',.7,.6);}
  shape(H,R,[P(.04,0,-.12),P(5.82,0,-.12),P(5.82,0),P(.04,0)],'teal',.7,.7);
  for(let n=0;n<12;n++)H.line(R,[P(.32+n*.46,0,-.11),P(.32+n*.46,0,-.025)],'sun',.8);
  shape(H,R,[P(4.12,.05,.04),P(5.18,.05,.04),P(5.18,.31,.04),P(4.12,.31,.04)],'paper',1,.5);
  for(let n=0;n<4;n++)H.line(R,[P(4.22+n*.25,.07,.05),P(4.22+n*.25,.27,.05)],'teal',.6);
  const rest=H.p(8.77,6.4,1.24),selected=P(5.31,.47,.16),loupe=[rest[0]+(selected[0]-rest[0])*held,rest[1]+(selected[1]-rest[1])*held];
  const hand=[loupe[0]+7,loupe[1]-1];photographer(H,R,9.4,6.9,[P(5.7,.03,.035),hand],held);
  oval(H,R,...loupe,9.4,6,'blue',.87);oval(H,R,loupe[0],loupe[1]-2,6.2,4.3,'paper',1);H.line(R,[[loupe[0]-3,loupe[1]-4],[loupe[0]+2,loupe[1]]],'teal',1.3);
  const flutter=Math.sin(u*Math.PI/11)*.035;shape(H,R,[H.p(2.15,3.8,2.43),H.p(2.15,4.43,2.43),H.p(2.15+flutter,4.43,1.99),H.p(2.15,3.8,1.99)],'paper',.6,.5);H.line(R,[H.p(2.16,3.86,2.16),H.p(2.16,4.36,2.12)],'blue',.6);
});
room.loopSeconds=22;
room.stillTime=10.8;
export default room;
