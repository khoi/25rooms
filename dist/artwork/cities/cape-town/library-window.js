import { world, shape, oval, stroke, box, actor, ell, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, slattedSeat, drape, floorLight, benchFrame } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cornice } from '../joinery.js';

const rest={...FIGURES.clips.idle.keys[0][1]};
FIGURES.clips['cape-town-library-host']={dur:22,keys:[[0,{...rest,head:16,ar:45,er:25,al:25,el:30}],[.2,{...rest,head:12,ar:84,er:36,al:38,el:50}],[.4,{...rest,head:-6,ar:84,er:36,al:38,el:50}],[.6,{...rest,head:-6,ar:84,er:36,al:38,el:50}],[.9,{...rest,head:16,ar:45,er:25,al:25,el:30}],[1,{...rest,head:16,ar:45,er:25,al:25,el:30}]]};
FIGURES.clips['cape-town-library-child']={dur:22,keys:[[0,{...rest,drop:.8,ll:88,lr:84,kl:-10,kr:-4,ar:22,er:30,head:-10}],[.4,{...rest,drop:.8,ll:88,lr:84,kl:-10,kr:-4,ar:22,er:30,head:-10}],[.48,{...rest,drop:.8,ll:88,lr:84,kl:-10,kr:-4,ar:118,er:5,head:-16}],[.6,{...rest,drop:.8,ll:88,lr:84,kl:-10,kr:-4,ar:118,er:5,head:-16}],[.72,{...rest,drop:.8,ll:88,lr:84,kl:-10,kr:-4,ar:22,er:30,head:-10}],[1,{...rest,drop:.8,ll:88,lr:84,kl:-10,kr:-4,ar:22,er:30,head:-10}]]};
FIGURES.clips['cape-town-library-listener']={dur:22,keys:[[0,{...FIGURES.clips.read.keys[0][1]}],[1,{...FIGURES.clips.read.keys[0][1]}]]};
const smooth=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
function bird(H,R,x,y,s=1,ink='coral') {shape(H,R,[[x-9*s,y],[x-2*s,y-9*s],[x+5*s,y-5*s],[x+11*s,y-5*s],[x+6*s,y],[x+3*s,y+5*s],[x-6*s,y+4*s]],ink,.68,.65);shape(H,R,[[x-5*s,y],[x-2*s,y-6*s],[x+2*s,y+1*s]],'paper',.9,.5);H.dot(x+6*s,y-4*s,.8*s,'blue');H.line(R,[[x-2*s,y+4*s],[x-3*s,y+8*s]],'blue',.7);}
function books(H,R,i,j,z,count,w=.16,h=.65){for(let k=0;k<count;k++){const hh=h*(.75+(k%3)*.1);box(H,R,i+k*w,j,w-.018,.48,z,hh,['teal','coral','sun','paper'][k%4],.66);H.line(R,[H.p(i+k*w+.025,j+.485,z+hh*.25),H.p(i+(k+1)*w-.04,j+.485,z+hh*.25)],'paper',.75);}}
const room=world('cape-town-library-window','The picture faces the room',{wall:'paper',wallTone:.8,height:3.8,floor:'sun',tone:.1,head:40},(H,R)=>{
  for(const side of['nw','ne'])cornice(H,R,side,0,12,3.8,'teal');
  windowBay(H,R,'nw',1.5,7.75,1.25,2.2,{divisions:5,view:P=>{shape(H,R,[P(.1,.12),P(7.6,.12),P(7.6,.7),P(6.5,.7),P(6.5,1.05),P(5.4,1.05),P(5.4,.56),P(4.5,.56),P(3.5,.9),P(2.8,.55),P(.1,.55)],'teal',.25);for(let k=0;k<8;k++){const u=.5+k*.87;shape(H,R,[P(u,.32),P(u+.25,.32),P(u+.25,.52),P(u,.52)],'sun',.55,.4);}}});
  box(H,R,.15,1.45,1.2,8.15,.1,.75,'teal',.65);
  for(let j=1.7;j<9.1;j+=1.25){const f=H.faceJ(1.355,j,1.06,.22,.67);shape(H,R,f,'blue',.6,.7);for(let k=0;k<5;k++){const q=H.faceJ(1.36,j+.05+k*.18,.14,.23,.53+(k%3)*.035);shape(H,R,q,['sun','coral','paper'][k%3],.68,.4);}}
  timber(H,R,.12,1.4,1.35,8.3,.85,.12,'sun');
  for(let k=0;k<4;k++)cushion(H,R,.27,1.7+k*1.8,1.05,1.55,.98,.17,k===2?'coral':'paper');
  for(const j of[2.1,8.6])cushion(H,R,.28,j,.4,.7,1.15,.36,'teal');
  cabinetFrame(H,R,2.1,.2,9.5,1.02,.1,3.35,5,'sun',(x,y,w,d,z,h,n)=>{
    for(const zz of[z+.58,z+1.34,z+2.12])timber(H,R,x,y,w,d,zz,.08,'sun');
    if(n!==2){books(H,R,x+.12,y+.25,z+.67,Math.floor((w-.2)/.17));books(H,R,x+.18,y+.23,z+1.43,Math.floor((w-.35)/.19),.19,.6);}
    else{for(let k=0;k<3;k++){const p=H.p(x+.3+k*.5,y+.57,z+1.49);oval(H,R,p[0],p[1]-10,5,6,['coral','sun','teal'][k],.6);shape(H,R,[[p[0]-6,p[1]-5],[p[0]+6,p[1]-5],[p[0]+8,p[1]+11],[p[0]-8,p[1]+11]],'paper',.8);H.dot(p[0]-2,p[1]-10,.7,'blue');H.dot(p[0]+2,p[1]-10,.7,'blue');}bird(H,R,...H.p(x+.9,y+.6,z+2.27),.65,'paper');}
    if(n===0||n===3){for(let k=0;k<3;k++)box(H,R,x+.12+k*.055,y+.17,w-.32,.65,z+.12+k*.12,.1,['teal','paper','coral'][k],.7);}
    else{shape(H,R,H.faceI(x+.14,y+.75,w-.28,z+.14,z+.54),'teal',.52,.6);const p=H.p(x+w*.5,y+.76,z+.33);H.line(R,[[p[0]-5,p[1]],[p[0]+5,p[1]]],'paper',2);}
    if(n===1){const p=H.p(x+.8,y+.55,z+2.56);oval(H,R,...p,11,11,'teal',.35);H.outline(R,ell(...p,5,11),'blue',.65);H.line(R,[[p[0]-10,p[1]],[p[0]+10,p[1]]],'blue',.65);H.line(R,[[p[0],p[1]+11],[p[0],p[1]+16]],'sun',2);}
    else books(H,R,x+.16,y+.3,z+2.22,5,.24,.72);
  });
  const acoustic=[H.p(10.8,2.7,.1),H.p(11.5,3.8,.1),H.p(11.5,3.8,2.7),H.p(10.8,2.7,2.7)];shape(H,R,acoustic,'coral',.28,.8);for(let k=0;k<9;k++){const a=H.p(10.8+k*.075,2.7+k*.118,.22),b=H.p(10.8+k*.075,2.7+k*.118,2.55);H.line(R,[a,b],'paper',1.3);}
  floorLight(H,5.7,6.5,190,.38);
  shape(H,R,H.tile(3.7,7.3,5.5,2.55,.025),'teal',.12,.4);
  for(let j=7.35;j<9.8;j+=.27)H.line(R,[H.p(3.75,j,.035),H.p(9.1,j,.035)],'sun',.5,{tone:.5});
  for(const [i,j,ink]of[[5.6,8.6,'coral'],[7.95,8.25,'sun']])cushion(H,R,i-.43,j-.36,.95,.9,.03,.2,ink);
  timber(H,R,5.05,5.45,2,.55,.05,.15,'teal');
  timber(H,R,5.7,5.24,.45,.65,.2,.77,'teal');
  metal(H,R,5.6,5.12,.64,.8,.91,.16,'blue');
  const joint=H.p(5.92,5.53,1.1);oval(H,R,...joint,7,4,'sun',.7);H.dot(...joint,2,'blue');
  for(const i of[5.2,6.65])bentTube(H,R,[[i,5.55,.12],[5.9,5.55,.8]],2,'teal');
  benchFrame(H,R,2.3,9.85,2.35,1.12,.46,'coral');bird(H,R,...H.p(2.75,10.28,.6),.85,'sun');
  drape(H,R,3.1,10,.65,.58,.52,.21,'teal');
  for(let k=0;k<3;k++)box(H,R,3.88+k*.06,10.18-k*.05,.46-k*.08,.42-k*.06,.51+k*.08,.07,'sun',.5);
  const mirror=H.p(4.3,10.52,.7);oval(H,R,...mirror,7,5,'teal',.27);H.outline(R,ell(...mirror,7,5),'paper',2);H.line(R,[[mirror[0]-3,mirror[1]+2],[mirror[0]+2,mirror[1]-3]],'paper',1.3);
  metal(H,R,9.8,5.15,1.35,.94,.36,.08,'teal');metal(H,R,9.8,5.15,1.35,.94,1,.08,'teal');for(const i of[9.85,11.05])for(const j of[5.2,6.03]){metal(H,R,i,j,.09,.09,.22,1.04,'teal');const p=H.p(i,j,.19);oval(H,R,...p,4,4,'blue');}books(H,R,9.96,5.42,1.09,5,.18,.51);books(H,R,9.98,5.4,.46,5,.17,.39);
  slattedSeat(H,R,9.15,9.3,2.2,.03,'teal',.7);drape(H,R,9.5,9.4,.7,.56,.77,.25,'coral');
  shape(H,R,H.tile(9.25,7.8,1.6,.94,.03),'blue',.18);for(let k=0;k<5;k++)H.line(R,[H.p(9.4+k*.27,7.85,.04),H.p(9.4+k*.27,8.68,.04)],'paper',1);
  bentTube(H,R,[[11.3,9,.06],[11.25,8.95,1.75],[11.05,8.95,1.9]],2,'sun');
  bentTube(H,R,[[3.7,3.7,.1],[3.7,3.7,2.5],[4.15,4.3,2.77]],2,'teal');const lp=H.p(4.15,4.3,2.74);shape(H,R,[[lp[0]-13,lp[1]+5],[lp[0]+13,lp[1]+5],[lp[0]+5,lp[1]-8],[lp[0]-5,lp[1]-8]],'coral',.65);
},(H,R,t)=>{
  const u=((t%22)+22)%22,open=smooth(0,4.4,u)*(1-smooth(17.2,20,u)),turn=smooth(4.4,8.8,u)*(1-smooth(13.2,17.2,u)),angle=.28*turn;
  const P=(a,b,h=0)=>H.p(5.92+a*Math.cos(angle)-b*Math.sin(angle),5.53+a*Math.sin(angle)+b*Math.cos(angle),1.3-b*.4+h);
  shape(H,R,[P(-1.65,-.88),P(1.65,-.88),P(1.65,.9),P(-1.65,.9)],'sun',.6,1.1);
  H.line(R,[P(-1.7,.95,.04),P(1.7,.95,.04)],'teal',5);
  const right=[P(0,-.76,.06),P(1.45,-.76,.06),P(1.45,.76,.06),P(0,.76,.06)];shape(H,R,right,'paper',1,.8);
  const edge=-1.45*open+1.45*(1-open),rise=Math.sin(open*Math.PI)*1.4;
  const left=[P(0,-.76,.075),P(edge,-.76,.075+rise),P(edge,.76,.075+rise),P(0,.76,.075)];shape(H,R,left,open>.55?'paper':'teal',open>.55?1:.75,.8);
  if(open>.65){bird(H,R,...P(-.7,.1,.1),1.05,'coral');bird(H,R,...P(.75,.07,.1),.65,'coral');for(const a of[-1.2,-.9,-.6,.35,.65,.95])H.line(R,[P(a,-.47,.085),P(a+.15,-.47,.085)],'sun',1.5);shape(H,R,[P(-1.4,.45,.09),P(-1.05,.45,.09),P(-1.05,.68,.09),P(-1.4,.68,.09)],'blue',.65,.5);}
  H.line(R,[P(.02,-.8,.1),P(.02,1.05,.08)],'coral',2);for(const a of[-1.32,1.32])H.line(R,[P(a,-.82,.12),P(a,-.55,.12)],'blue',2);
  actor(H,R,4.4-.2*turn,6.18-.28*turn,t,'cape-town-library-host',{shirt:['teal',.8],hairStyle:'bun',glasses:true},0,1.7);
  actor(H,R,5.75,8.55,t,'cape-town-library-child',{shirt:['sun',.72],hairStyle:'curly'},.15,1.65,'child');
  actor(H,R,8.1,8.35,t,'cape-town-library-listener',{face:'sw',shirt:['coral',.7],hairStyle:'short'},.22,1.55,'child');
  const top=H.p(.5,10.7,3.6),sway=Math.sin(u*Math.PI/11)*5;H.line(R,[top,[top[0],top[1]+15]],'blue',.7);H.line(R,[[top[0]-23,top[1]+19],[top[0]+23,top[1]+11]],'sun',1.5);for(const [dx,dy,ink]of[[-22,34,'coral'],[2,48,'sun'],[22,27,'teal']]){H.line(R,[[top[0]+dx,top[1]+15],[top[0]+dx+sway,top[1]+dy]],'blue',.5);bird(H,R,top[0]+dx+sway,top[1]+dy+7,.65,ink);}
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
