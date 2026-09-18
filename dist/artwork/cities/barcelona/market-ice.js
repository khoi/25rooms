import { world, shape, oval, stroke, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, drape, spokedWheel } from '../materials.js';
import { masonry, basin, rackFrame } from '../structure.js';
import { windowBay, hangingRail, caster } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const rest={...FIGURES.clips.idle.keys[0][1]};
FIGURES.clips['barcelona-market-tongs']={dur:20,keys:[[0,{...rest,ar:43,er:35,head:14}],[.2,{...rest,ar:58,er:40,head:16}],[.4,{...rest,ar:70,er:65,head:10}],[.6,{...rest,ar:70,er:65,head:10}],[.9,{...rest,ar:43,er:35,head:14}],[1,{...rest,ar:43,er:35,head:14}]]};
function crate(H,R,i,j,z,w=1.5,d=1.1){for(const x of[i,i+w-.11])for(const y of[j,j+d-.11])timber(H,R,x,y,.11,.11,z,.66,'sun');timber(H,R,i,j,w,d,z,.08,'sun');for(const h of[.12,.35,.58]){timber(H,R,i,j+d-.09,w,.09,z+h,.12,'sun');timber(H,R,i+w-.09,j,.09,d,z+h,.12,'sun');}H.line(R,[H.p(i+.45,j+d,z+.55),H.p(i+w-.45,j+d,z+.55)],'blue',2.5);}
function fish(H,R,i,j,z,flip=false){const p=H.p(i,j,z),s=flip?-1:1,Q=pts=>pts.map(([x,y])=>[p[0]+s*x,p[1]+y]);shape(H,R,Q([[-20,0],[-26,-7],[-24,7],[-17,3],[-7,7],[11,4],[17,-1],[10,-5],[-7,-6]]),'paper',1);shape(H,R,Q([[-17,-2],[8,-4],[15,-1],[5,0],[-11,1]]),'teal',.35);stroke(H,R,Q([[-15,2],[-4,4],[9,2]]),'blue',.7);H.dot(p[0]+s*11,p[1]-1,1.2,'blue');for(let x=-9;x<8;x+=4)stroke(H,R,Q([[x,-2],[x+2,0],[x,3]]),'blue',.45,.55);}
const room=world('barcelona-market-ice','Cold hands, warm light',{wall:'paper',wallTone:.6,floor:'paper',tone:.4,pattern:'tiles',accent:'teal',height:3.8,head:65},(H,R)=>{
  masonry(H,R,'ne',0,12,0,3.8,'paper',.72);
  windowBay(H,R,'ne',2.1,7.2,2.3,1.14,{divisions:5,ink:'blue'});
  for(const side of['ne','nw'])for(let u=.3;u<11.8;u+=.75)for(let z=.18;z<1.95;z+=.45){const P=(x,h)=>side==='ne'?H.p(x,.1,h):H.p(.1,x,h);shape(H,R,[P(u,z),P(u+.7,z),P(u+.7,z+.41),P(u,z+.41)],'teal',(Math.floor(u*2)+Math.floor(z*2))%3?.14:.24,.4);}
  for(const i of[.55,11.05]){metal(H,R,i,.45,.24,.24,0,4.65,'blue');metal(H,R,i-.16,.29,.56,.55,.03,.13,'teal');}
  for(const z of[3.9,4.62])bentTube(H,R,[[.7,.55,z],[11.2,.55,z]],3.6,'blue');
  for(let i=.7;i<10.7;i+=1.75)bentTube(H,R,[[i,.55,3.9],[i+.87,.55,4.62],[i+1.75,.55,3.9]],2,'teal');
  for(const i of[2.4,7.8]){const a=H.p(i,.6,4.4),b=H.p(i,3,3.4);stroke(H,R,[a,[a[0],a[1]+14],b],'blue',1.4);const p=H.p(i,3,3.3);shape(H,R,[[p[0]-17,p[1]+3],[p[0]+17,p[1]+3],[p[0]+8,p[1]-8],[p[0]-8,p[1]-8]],'sun',.8);H.glow(p[0],p[1]+18,35,25,'sun',.22);}
  for(const j of[1.3,4.05]){metal(H,R,.2,j,1.32,2.4,.15,.14,'blue');for(const y of[j+.2,j+2.13])metal(H,R,.34,y,.14,.14,.25,.85,'blue');basin(H,R,.25,j,1.32,2.4,1.12,'paper');bentTube(H,R,[[.9,j+1.4,1.1],[.9,j+1.4,.58],[.4,j+1.4,.58],[.4,j+1.4,.08]],2.6,'teal');}
  metal(H,R,.13,1.36,.6,5.12,2.83,.5,'teal');
  for(let j=1.5;j<6.3;j+=.2)H.line(R,[H.p(.75,j,2.93),H.p(.75,j,3.22)],'blue',1.2);
  bentTube(H,R,[[.46,6.57,3.1],[.46,6.82,3.1],[.46,6.82,3.64]],5.5,'paper');
  for(const j of[1.57,5.98])bentTube(H,R,[[.2,j,2.72],[1.04,j,2.72],[1.04,j,2.54]],2,'blue');
  const clean=H.p(.82,6.74,1.1);shape(H,R,[[clean[0]-5,clean[1]],[clean[0]+5,clean[1]],[clean[0]+5,clean[1]-15],[clean[0]+2,clean[1]-18],[clean[0]+2,clean[1]-22],[clean[0]-3,clean[1]-22],[clean[0]-3,clean[1]-16]],'sun',.8);H.line(R,[[clean[0]-3,clean[1]-22],[clean[0]+7,clean[1]-22]],'blue',2);
  metal(H,R,.16,6.57,1.06,.62,1.04,.08,'paper');
  for(const j of[1.68,3.7,4.5,6.11]){const p=H.p(.39,j,.24);shape(H,R,[[p[0]-6,p[1]],[p[0]+8,p[1]],[p[0]+9,p[1]-5],[p[0]+4,p[1]-7],[p[0]+4,p[1]-21],[p[0]-4,p[1]-21]],j>4?'paper':'teal',.72);}
  metal(H,R,.35,6.62,.72,.5,.05,.43,'paper');H.line(R,[H.p(.51,7.13,.3),H.p(.91,7.13,.3)],'coral',2);
  const hose=H.p(.27,8.1,2.15);for(let r=7;r<22;r+=4)H.outline(R,ell(...hose,r,r*.8),'teal',2);bentTube(H,R,[[.26,8.1,1.8],[.28,8.75,.6],[.5,8.8,.42]],2.3,'teal');
  hangingRail(H,R,'nw',7.15,3.75,3.07,3,(P,u,n)=>{const q=[P(u-.28,-.18),P(u+.28,-.18),P(u+.48,-1.34),P(u-.48,-1.34)];shape(H,R,q,n===1?'coral':'paper',n===1?.58:1);H.line(R,[P(u-.21,-.65),P(u+.24,-.65)],'blue',.8);});
  for(const [i,j]of[[2.8,4.65],[8.45,4.65],[2.8,7.6],[8.45,7.6]]){metal(H,R,i,j,.22,.22,.08,.96,'blue');metal(H,R,i-.08,j-.08,.38,.38,0,.11,'teal');}
  metal(H,R,2.78,4.57,5.9,3.21,.16,.86,'paper');
  shape(H,R,H.faceI(2.89,7.8,5.62,.27,.88),'blue',.68);
  for(const [i,w]of[[3.03,2.22],[5.38,2.19]]){
    shape(H,R,H.faceI(i,7.82,w,.31,.84),'paper',1);
    shape(H,R,H.faceI(i+.09,7.84,w-.18,.39,.76),'teal',.24);
    H.line(R,[H.p(i+.5,7.87,.68),H.p(i+w-.48,7.87,.68)],'blue',3);
    H.line(R,[H.p(i+.56,7.89,.69),H.p(i+w-.54,7.89,.69)],'coral',1.5);
    for(const x of[i+.08,i+w-.13])H.dot(...H.p(x,7.87,.46),1.2,'sun');
  }
  shape(H,R,H.faceJ(8.72,4.75,2.83,.27,.85),'teal',.35);
  for(let j=4.98;j<7.36;j+=.19)H.line(R,[H.p(8.75,j,.4),H.p(8.75,j,.71)],'blue',1.1);
  bentTube(H,R,[[8.42,6.8,.27],[8.7,6.8,.2],[8.7,7.57,.2],[9.02,7.57,.09]],2.7,'teal');
  metal(H,R,2.65,4.45,6.18,3.5,.94,.35,'blue');
  for(const j of[4.46,7.91])bentTube(H,R,[[2.76,j,1.34],[8.62,j,1.34]],3.4,'paper');
  for(const i of[2.69,8.77])bentTube(H,R,[[i,4.55,1.34],[i,7.79,1.34]],3.4,'paper');
  shape(H,R,H.tile(2.83,4.64,5.81,3.1,1.31),'paper',1);
  shape(H,R,H.tile(3,4.8,5.48,2.78,1.3),'teal',.14);
  for(const j of[4.51,7.79])metal(H,R,2.68,j,6.1,.14,1.29,.13,'paper');
  for(const i of[2.69,8.65])metal(H,R,i,4.54,.13,3.3,1.29,.13,'paper');
  for(let n=0;n<28;n++){const i=3.1+(n%7)*.76,j=4.94+Math.floor(n/7)*.66;shape(H,R,[H.p(i,j,1.34),H.p(i+.29,j-.1,1.38),H.p(i+.4,j+.26,1.33),H.p(i+.05,j+.36,1.36)],'paper',1,.3);}
  for(const [i,j,f]of[[3.8,5.2,0],[5.3,5.4,0],[6.8,5.58,1],[4.3,6.3,0],[6.0,6.67,1],[7.6,6.76,1]])fish(H,R,i,j,1.42,f);
  for(const i of[4.31,4.57])metal(H,R,i,4.78,.045,2.65,1.34,.03,'teal');
  shape(H,R,H.tile(7.77,6.92,.64,.49,1.38),'blue',.75);for(let i=7.81;i<8.4;i+=.1)H.line(R,[H.p(i,6.96,1.39),H.p(i,7.36,1.39)],'paper',1);
  const scoop=H.p(7.92,4.92,1.46);shape(H,R,[[scoop[0]-10,scoop[1]-3],[scoop[0]+7,scoop[1]-7],[scoop[0]+11,scoop[1]+1],[scoop[0]-5,scoop[1]+5]],'paper',1);stroke(H,R,[[scoop[0]+6,scoop[1]-2],[scoop[0]+18,scoop[1]-7]],'sun',2.5);
  crate(H,R,8.99,2.2,0);crate(H,R,9.16,2.15,.74);crate(H,R,9.28,4.2,0);timber(H,R,9.2,2.1,1.58,1.24,1.42,.09,'sun');for(let i=9.25;i<10.7;i+=.27)H.line(R,[H.p(i,2.12,1.52),H.p(i,3.26,1.52)],'blue',.65);
  metal(H,R,9.2,7.35,2,1.35,.25,.12,'teal');for(const i of[9.4,10.85])caster(H,R,i,8.48);bentTube(H,R,[[9.25,7.45,.4],[9.25,7.45,1.32],[11.1,7.45,1.32],[11.1,7.45,.4]],2.2,'blue');metal(H,R,9.54,7.62,1.16,.86,.4,.6,'paper');drape(H,R,9.6,7.7,.9,.62,1.02,.14,'teal');
  metal(H,R,1.6,10.13,3.2,.85,.62,.1,'sun');
  metal(H,R,1.73,10.29,2.89,.55,.22,.06,'teal');
  for(let n=0;n<4;n++){shape(H,R,H.tile(1.9+n*.025,10.3-n*.02,1.02,.46,.31+n*.04),'paper',1);}
  metal(H,R,3.45,10.3,.83,.52,.3,.05,'sun');for(const i of[3.51,4.17])metal(H,R,i,10.3,.08,.52,.35,.28,'sun');
  for(let n=0;n<4;n++){const p=H.p(3.83,10.55,.4+n*.075);oval(H,R,...p,8,3,'paper',1);H.line(R,[[p[0]-6,p[1]],[p[0]+6,p[1]]],'teal',.5);}
  shape(H,R,H.tile(3.13,10.22,1.3,.63,.75),'paper',1);const wrap=H.p(3.71,10.61,.78);H.line(R,[[wrap[0]-13,wrap[1]-5],[wrap[0]+12,wrap[1]+4]],'teal',1.2);
  const roll=H.p(4.18,10.38,.82);oval(H,R,...roll,6,6,'sun',.64);oval(H,R,...roll,2.4,2.4,'paper',1);stroke(H,R,[[roll[0],roll[1]+5],[roll[0]+9,roll[1]+11],[roll[0]+16,roll[1]+9]],'sun',1);
  bentTube(H,R,[[1.7,10.95,.56],[1.7,11.28,.56],[2.15,11.28,.56]],1.7,'blue');for(const i of[1.8,4.5])metal(H,R,i,10.3,.14,.2,0,.64,'blue');vessel(H,R,2.1,10.5,.75,9,9,'sun');H.line(R,[H.p(3,10.6,.74),H.p(3.7,10.6,.74)],'blue',1.5);
  const scale=H.p(6.3,.8,3);stroke(H,R,[[scale[0],scale[1]-30],[scale[0],scale[1]]],'blue',1.5);oval(H,R,...scale,13,13,'paper',1);for(let n=0;n<10;n++){const a=n*Math.PI/5;H.line(R,[[scale[0]+Math.sin(a)*9,scale[1]+Math.cos(a)*9],[scale[0]+Math.sin(a)*11,scale[1]+Math.cos(a)*11]],'blue',.8);}H.dot(scale[0],scale[1],1.8,'sun');H.line(R,[[scale[0],scale[1]],[scale[0]+5,scale[1]-6]],'coral',1.6);stroke(H,R,[[scale[0],scale[1]+13],[scale[0]-19,scale[1]+42],[scale[0]+19,scale[1]+42],[scale[0],scale[1]+13]],'blue',.8);oval(H,R,scale[0],scale[1]+43,20,5,'paper',1);H.line(R,[[scale[0]+7,scale[1]+45],[scale[0]+14,scale[1]+44]],'coral',2);
  vessel(H,R,8.35,3.38,.07,14,5,'paper');for(const [di,dj]of[[0,0],[.22,.08],[-.17,.17]])oval(H,R,...H.p(8.35+di,3.38+dj,.3),5,3,'sun');
},(H,R,time)=>{const t=((time%20)+20)%20,u=ease(4,8,t)*(1-ease(12,18,t)),z=1.38+.55*u;
  metal(H,R,4.4,4.93,.1,2.37,z,.25,'blue');const target=H.p(4.44,4.98,z+.23);
  let sellerHand;
  H.clip([[-500,-500],[500,-500],[500,350],[-500,-150]],()=>actor(H,R,4.05,3.95,t,'barcelona-market-tongs',{shirt:['teal',.6],apron:['paper',1],prop:(A,B,p)=>{sellerHand=p.nearHand;}},0,1.5));
  for(const dx of[-2,2])stroke(H,R,[[sellerHand[0]+dx,sellerHand[1]],[target[0]+dx,target[1]-4],[target[0],target[1]]],'blue',1.4);
  actor(H,R,7.2,9.8,u*2,'point',{face:'sw',shirt:['coral',.64]},0,1.55);
  const p=H.p(5.8,8,.1);H.line(R,[[p[0]-14+Math.sin(t*Math.PI/10)*3,p[1]],[p[0]+14,p[1]-1]],'paper',1.8,{tone:.65});
});
room.loopSeconds=20;
room.stillTime=19;
export default room;
