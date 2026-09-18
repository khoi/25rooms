import { world, shape, oval, stroke, box, actor, ell } from '../../worlds/common.js';
import { surface, timber, metal, cushion, drape, vessel, floorLight, bentTube, benchFrame } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, wallCourse, recessedFrame, floorShadow, taskLight, wallRack } from '../joinery.js';

const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
function net(H,R,points,alpha=.45) {
  H.opacity(alpha,()=>{surface(H,R,points,'paper',1,.5);H.clip(points,()=>{const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);for(let x=Math.min(...xs);x<Math.max(...xs);x+=5)H.line(R,[[x,Math.min(...ys)],[x+14,Math.max(...ys)]],'teal',.38,{tone:.35});for(let y=Math.min(...ys);y<Math.max(...ys);y+=6)H.line(R,[[Math.min(...xs),y],[Math.max(...xs),y+3]],'teal',.38,{tone:.32});});});
  H.line(R,points.slice(-2),'paper',2,{tone:.85});
}
const room=world('hanoi-alley-bedroom','A bed becomes a quiet corner',{floor:'sun',tone:.13,pattern:'boards',wall:'paper',wallTone:.8,height:4.05,head:40},(H,R)=>{
  wallCourse(H,R,'nw',0,12,.52,'sun');wallCourse(H,R,'ne',0,12,.52,'sun');
  windowBay(H,R,'ne',6.5,3.25,1.77,1.78,{ink:'teal',divisions:2});
  const shut=[H.p(9.82,.21,1.77),H.p(10.6,1.03,1.77),H.p(10.6,1.03,3.55),H.p(9.82,.21,3.55)];surface(H,R,shut,'teal',.31);for(let z=1.9;z<3.45;z+=.22)H.line(R,[H.p(9.89,.29,z),H.p(10.51,.92,z)],'blue',.7);
  H.tint([H.p(6.6,.25,.015),H.p(9.6,.25,.015),H.p(11.35,7.7,.015),H.p(8.0,7.7,.015)],'sun',.16);floorLight(H,8.9,5.3,115,.32);
  cabinetFrame(H,R,.28,.3,2.45,2.0,.04,3.5,2,'teal',(i,j,w,d,z,h,n)=>{
    for(const lev of[.17,1.23,2.36]){timber(H,R,i,j,w,d,z+lev,.11,'sun');if(lev>2){for(let q=0;q<3;q++)cushion(H,R,i+.07,j+.2,w-.13,d-.27,z+lev+.13+q*.1,.075,q===1?'coral':'paper');}else for(let q=0;q<(n?3:5);q++){const bh=.47+((q*3+n)%4)*.11;box(H,R,i+.1+q*.17,j+d-.42,.13,.32,z+lev+.12,bh,q%2?'sun':'coral',.5);}}
  });
  timber(H,R,3.49,.28,8.11,.41,3.69,.25,'sun');
  for(const i of[3.51,11.35]){timber(H,R,i,.29,.22,.43,.01,3.7,'sun');bentTube(H,R,[[i,.41,3.03],[i+(i<4?.65:-.65),.41,3.68]],2,'sun');}
  surface(H,R,H.faceI(3.77,.35,1.85,1.62,3.47),'teal',.16);for(const z of[1.75,2.52]){timber(H,R,3.83,.34,1.69,.65,z,.1,'sun');for(const [i,c,h]of[[4.03,'coral',.39],[4.32,'paper',.52],[4.68,'teal',.43]])box(H,R,i,.47,.19,.38,z+.11,h,c,.6);}
  const bedtime=H.p(5.06,.58,1.84);oval(H,R,...bedtime,7,3,'sun',.7);stroke(H,R,[[bedtime[0]-6,bedtime[1]-3],[bedtime[0]-6,bedtime[1]-13],[bedtime[0]+5,bedtime[1]-13],[bedtime[0]+5,bedtime[1]-3]],'blue',.8);
  box(H,R,.28,2.65,1.43,3.45,.05,2.82,'teal',.3);for(const j of[2.77]){surface(H,R,H.faceJ(1.74,j,1.43,.21,2.56),'teal',.2);for(let z=.33;z<2.43;z+=.22)H.line(R,[H.p(1.75,j+.13,z),H.p(1.75,j+1.28,z)],'blue',.65,{tone:.58});const p=H.p(1.78,j+1.15,1.48);stroke(H,R,[[p[0],p[1]],[p[0]+2,p[1]+9]],'coral',2.2);}
  surface(H,R,H.faceJ(1.75,4.39,1.47,.17,2.59),'blue',.65);
  bentTube(H,R,[[1.61,4.51,2.33],[1.61,5.71,2.33]],1.9,'sun');
  for(const [j,c]of[[4.78,'coral'],[5.25,'paper'],[5.65,'teal']]){const p=H.p(1.74,j,2.24);stroke(H,R,[[p[0],p[1]-4],[p[0]-7,p[1]+4],[p[0]+7,p[1]+4],[p[0],p[1]-4]],'sun',.8);surface(H,R,[[p[0]-7,p[1]+4],[p[0]+7,p[1]+4],[p[0]+9,p[1]+39],[p[0]-8,p[1]+39]],c,c==='paper'?1:.45);H.line(R,[[p[0]-3,p[1]+9],[p[0]-3,p[1]+35]],'paper',1);}
  surface(H,R,[H.p(1.76,5.92,.2),H.p(2.71,6.62,.2),H.p(2.71,6.62,2.62),H.p(1.76,5.92,2.62)],'teal',.3);
  for(let z=.38;z<2.5;z+=.24)H.line(R,[H.p(1.91,6.03,z),H.p(2.59,6.54,z)],'blue',.6);H.line(R,[H.p(2.46,6.51,1.17),H.p(2.46,6.51,1.43)],'sun',2);
  timber(H,R,.33,6.35,2.96,1.56,.98,.13,'sun');
  for(const j of[6.42,7.68])bentStay(H,R,j);
  surface(H,R,H.tile(.57,6.49,1.2,.99,1.12),'paper',1);for(let n=0;n<4;n++)H.line(R,[H.p(.69,6.65+n*.15,1.13),H.p(1.6,6.65+n*.15,1.13)],'teal',.6);
  metal(H,R,2.35,6.6,.58,.27,1.1,.08,'teal');for(let n=0;n<4;n++)H.line(R,[H.p(2.41+n*.1,6.65,1.2),H.p(2.41+n*.1,7.16,1.2)],n%2?'coral':'sun',1.1);
  recessedFrame(H,R,'nw',6.18,1.87,1.53,1.25,'sun',P=>{surface(H,R,[P(.15,.16),P(1.7,.16),P(1.7,1.06),P(.15,1.06)],'paper',1);for(let n=0;n<5;n++){surface(H,R,[P(.26+n*.25,.19),P(.43+n*.25,.19),P(.43+n*.25,.78),P(.26+n*.25,.78)],n%2?'teal':'coral',.38);}});
  wallRack(H,R,'nw',6.24,2.4,2.95,.78,1,'teal',(P,z)=>{for(const [u,h,c]of[[.24,.42,'paper'],[.55,.36,'sun'],[.9,.48,'coral'],[1.2,.45,'paper'],[1.58,.27,'teal']])surface(H,R,[P(u,z+.02),P(u+.21,z+.02),P(u+.21,z+h),P(u,z+h)],c,c==='paper'?1:.55);});
  taskLight(H,R,.62,7.6,1.15,'sun',.35);
  bentTube(H,R,[[.18,8.44,.3],[.18,8.44,1.71],[.65,7.59,1.15]],1,'blue');metal(H,R,.12,8.31,.22,.35,.79,.4,'paper');H.dot(...H.p(.35,8.5,.99),1.7,'blue');
  const pencils=H.p(1.97,6.71,1.12);vessel(H,R,1.97,6.71,1.12,5,10,'teal',false);for(let n=0;n<4;n++)H.line(R,[[pencils[0]-3+n*2,pencils[1]-9],[pencils[0]-5+n*3,pencils[1]-23+(n%2)*3]],n%2?'sun':'coral',1.2);
  floorShadow(H,3.75,1.7,7.42,4.05,.18);
  box(H,R,3.65,1.65,7.65,4.28,.08,.65,'sun',.46);
  for(const i of[3.73,6.22,8.75]){surface(H,R,H.faceI(i,5.97,2.26,.19,.65),'blue',.63);timber(H,R,i+.04,5.94,2.15,.15,.21,.4,'sun');const p=H.p(i+1.12,6.13,.45);stroke(H,R,[[p[0]-6,p[1]],[p[0]-4,p[1]+4],[p[0]+4,p[1]+4],[p[0]+6,p[1]]],'coral',1.5);}
  box(H,R,7.7,6.02,2.23,1.0,.16,.38,'sun',.54);surface(H,R,H.tile(7.85,6.15,1.93,.72,.55),'blue',.42);cushion(H,R,8.01,6.22,1.32,.49,.57,.065,'paper');
  timber(H,R,3.5,1.53,7.96,.16,.65,.29,'sun');timber(H,R,3.5,5.9,7.96,.16,.65,.18,'sun');
  for(const i of[3.56,11.3])timber(H,R,i,1.65,.13,4.45,.65,.24,'sun');
  for(let i=3.85;i<11.1;i+=.5)timber(H,R,i,1.78,.26,3.94,.73,.08,'sun');
  for(const i of[3.69,11.24]){timber(H,R,i,1.56,.13,4.45,.11,.57,'sun');for(const j of[1.72,5.64])metal(H,R,i, j,.14,.22,.35,.25,'teal');}
  for(const j of[2.13,2.92,3.7,4.49,5.22])timber(H,R,3.56,j,.21,.13,.7,.82,'sun');timber(H,R,3.54,1.92,.23,3.56,1.48,.14,'sun');
  cushion(H,R,3.88,1.96,7.12,3.58,.87,.16,'paper');
  cushion(H,R,4.11,2.09,1.32,3.08,1.03,.24,'teal');
  drape(H,R,7.78,2.12,2.97,2.31,1.09,.13,'coral');
  const kite=[H.p(9.4,3.05,1.105),H.p(9.85,3.56,1.105),H.p(9.45,4.01,1.105),H.p(9.02,3.58,1.105)];surface(H,R,kite,'sun',.6);H.line(R,[kite[0],kite[2]],'paper',.7);H.line(R,[kite[1],kite[3]],'paper',.7);
  box(H,R,10.42,.28,1.14,.83,.75,.14,'sun',.5);vessel(H,R,10.81,.75,.91,4,6,'paper',false);
  for(const [side,pos]of[['ne',4.05],['nw',3.3]]){const P=recessedFrame(H,R,side,pos,.85,2.19,.85,'sun',Q=>{surface(H,R,[Q(.1,.12),Q(.75,.12),Q(.75,.71),Q(.1,.71)],'paper',1);for(const [u,v,r]of[[.28,.37,4],[.51,.39,4.6],[.4,.24,3]]){oval(H,R,...Q(u,v),r,r,'teal',.48);}});}
  timber(H,R,6.58,2.5,.15,.15,3.82,.5,'sun');const hook=H.p(6.67,2.57,3.81);stroke(H,R,[[hook[0],hook[1]],[hook[0],hook[1]+8],[hook[0]+5,hook[1]+10]],'blue',1.3);
  const hoop=[];for(let n=0;n<42;n++){const a=n*Math.PI*2/42;hoop.push(H.p(7.15+Math.cos(a)*3.45,3.63+Math.sin(a)*2.08,3.5));}H.line(R,hoop,'blue',2,{closed:true});H.line(R,hoop,'sun',.9,{closed:true});
  for(const q of[[3.85,3.5,3.5],[10.48,3.5,3.5],[7.15,1.59,3.5]])H.line(R,[hook,H.p(...q)],'blue',.7);
  net(H,R,[H.p(3.85,1.83,3.48),H.p(10.75,1.83,3.48),H.p(10.75,5.29,3.48),H.p(3.85,5.29,3.48)],.2);
  box(H,R,1.13,9.37,2.42,.92,0,.46,'sun',.4);
  for(const i of[1.27,2.41]){surface(H,R,H.faceI(i,10.31,1.0,.09,.38),'sun',.3);H.dot(...H.p(i+.52,10.33,.24),1.7,'teal');}
  const comb=H.p(2.94,9.54,.51);stroke(H,R,[[comb[0]-10,comb[1]],[comb[0]+9,comb[1]]],'coral',2);for(let n=0;n<7;n++)H.line(R,[[comb[0]-8+n*2.5,comb[1]],[comb[0]-8+n*2.5,comb[1]+5]],'blue',.65);
  bentTube(H,R,[[.17,10.81,2.81],[.58,10.81,2.81]],1.6,'teal');const shirt=H.p(.51,10.81,2.75);surface(H,R,[[shirt[0]-7,shirt[1]],[shirt[0]+7,shirt[1]],[shirt[0]+15,shirt[1]+9],[shirt[0]+9,shirt[1]+15],[shirt[0]+8,shirt[1]+35],[shirt[0]-8,shirt[1]+35],[shirt[0]-9,shirt[1]+15],[shirt[0]-15,shirt[1]+9]],'paper',1);H.line(R,[[shirt[0],shirt[1]+4],[shirt[0],shirt[1]+31]],'sun',.8);
cushion(H,R,1.32,9.48,1.06,.67,.48,.06,'paper');
  const mirror=recessedFrame(H,R,'nw',9.15,1.0,1.2,1.65,'teal',P=>{surface(H,R,[P(.14,.13),P(.88,.13),P(.88,1.48),P(.14,1.48)],'paper',1);H.line(R,[P(.22,.33),P(.54,1.33)],'teal',2,{tone:.25});});
  const tray=H.p(2.97,9.79,.52);oval(H,R,...tray,12,4,'teal',.35);for(let n=0;n<5;n++)H.line(R,[[tray[0]-6+n*2,tray[1]-2],[tray[0]-6+n*2,tray[1]+2]],'blue',.65);
  vessel(H,R,3.02,10.74,.04,14,18,'sun');for(let n=0;n<5;n++)H.line(R,[H.p(2.7+n*.13,10.95,.1),H.p(2.7+n*.13,10.95,.49)],'coral',.7);
  benchFrame(H,R,6.37,9.64,2.57,1.35,.61,'teal');
  cushion(H,R,6.48,9.77,1.58,1.07,.64,.14,'paper');cushion(H,R,6.53,9.81,1.49,1.0,.8,.1,'coral');
  const repair=H.p(8.42,10.29,.64);oval(H,R,...repair,12,5,'sun',.6);oval(H,R,repair[0]-4,repair[1]-4,4,3,'coral',.6);H.line(R,[[repair[0]+2,repair[1]-4],[repair[0]+9,repair[1]-10]],'blue',.8);stroke(H,R,[[repair[0]-4,repair[1]-5],[repair[0]-11,repair[1]-11],[repair[0]-15,repair[1]-8]],'coral',.7);
  const schoolbag=H.p(8.36,7.38,.04);surface(H,R,[[schoolbag[0]-13,schoolbag[1]],[schoolbag[0]+14,schoolbag[1]],[schoolbag[0]+12,schoolbag[1]-24],[schoolbag[0]+6,schoolbag[1]-31],[schoolbag[0]-10,schoolbag[1]-30],[schoolbag[0]-14,schoolbag[1]-22]],'teal',.5);surface(H,R,[[schoolbag[0]-10,schoolbag[1]-5],[schoolbag[0]+10,schoolbag[1]-5],[schoolbag[0]+10,schoolbag[1]-17],[schoolbag[0]-10,schoolbag[1]-17]],'coral',.45);stroke(H,R,[[schoolbag[0]-6,schoolbag[1]-30],[schoolbag[0]-4,schoolbag[1]-37],[schoolbag[0]+5,schoolbag[1]-37],[schoolbag[0]+7,schoolbag[1]-30]],'blue',1.4);H.dot(schoolbag[0]+7,schoolbag[1]-14,1.8,'sun');
  box(H,R,9.65,7.49,1.5,.98,.1,.21,'teal',.45);for(const i of[9.81,10.93])oval(H,R,...H.p(i,8.4,.13),3,3,'blue',.8);
  for(const [i,j,c]of[[9.87,7.72,'coral'],[10.41,7.72,'sun'],[10.06,8.03,'teal']])box(H,R,i,j,.31,.3,.33,.3,c,.55);
  const boat=H.p(10.97,6.26,.04);surface(H,R,[[boat[0]-12,boat[1]-3],[boat[0]+12,boat[1]-3],[boat[0]+6,boat[1]+4],[boat[0]-7,boat[1]+3]],'sun',.5);stroke(H,R,[[boat[0],boat[1]],[boat[0],boat[1]-21]],'blue',1);surface(H,R,[[boat[0]+1,boat[1]-20],[boat[0]+1,boat[1]-5],[boat[0]+11,boat[1]-6]],'coral',.5);
},(H,R,time)=>{
  const t=((time%24)+24)%24,g=ease(4.8,9.6,t)*(1-ease(14.4,22,t));
  actor(H,R,6.54,3.79,0,'read',{shirt:['sun',.6],pants:['teal',.5],prop:(A,B,p)=>{const x=(p.farHand[0]+p.nearHand[0])/2,y=(p.farHand[1]+p.nearHand[1])/2,turn=ease(10.3,11.4,t)*(1-ease(12.3,13.6,t));surface(A,B,[[x-12,y],[x,y+3],[x+12,y],[x+10,y-9-turn*5],[x,y-6],[x-10,y-9]],'paper',1);A.line(B,[[x,y-6],[x,y+3]],'teal',.7);}},.92,1.35,'child');
  const tie=H.p(4.05+.53*g,5.35,1.41),edge=H.p(6.72-1.78*g,5.3,1.02);
  net(H,R,[H.p(3.86,5.27,3.46),H.p(7.03,5.27,3.46),[edge[0]+Math.sin(t*Math.PI*2/24)*1.5,edge[1]],H.p(3.94,5.29,1.03)],.58);
  const repair=H.p(4.27,5.31,2.19);H.opacity(.55,()=>{surface(H,R,[[repair[0]-5,repair[1]-5],[repair[0]+6,repair[1]-5],[repair[0]+6,repair[1]+5],[repair[0]-5,repair[1]+5]],'paper',1);for(let n=0;n<3;n++)H.line(R,[[repair[0]-4+n*4,repair[1]-5],[repair[0]-4+n*4,repair[1]+5]],'teal',.5);});
  const [px,py]=tie;stroke(H,R,[[px-5,py-2],[px+4,py],[px-2,py+6],[px-6,py+1],[px+5,py-5]],'coral',1.3);
  actor(H,R,4.42,6.15,0,'hold',{shirt:['teal',.55],hairStyle:'bun',face:'sw',prop:(A,B,p)=>{for(const s of[p.nearHand,p.farHand]){stroke(A,B,[s,[(s[0]+px)/2,s[1]-2],[px,py]],'teal',3.3);oval(A,B,px,py,2.4,2.3,'coral',.3);}}},0,1.4);
  const [fx0,fy]=H.p(2.75,7.38,1.2),fx=fx0+Math.sin(t*Math.PI*2/24)*1.7;stroke(H,R,[[fx,fy],[fx,fy-18]],'blue',2);oval(H,R,fx,fy-25,12,12,'paper',1);for(let n=0;n<7;n++){const a=n*Math.PI*2/7;H.line(R,[[fx,fy-25],[fx+Math.cos(a)*10,fy-25+Math.sin(a)*10]],'teal',.7);}H.dot(fx,fy-25,2,'coral');
});
function bentStay(H,R,j){stroke(H,R,[H.p(.41,j,.62),H.p(2.92,j,.98)],'blue',2);H.dot(...H.p(2.92,j,.98),2,'sun');}
room.loopSeconds=24;
room.stillTime=12;
export default room;
