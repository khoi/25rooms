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
  for(const j of[1.38,9.35]){
    timber(H,R,.12,j,.36,.22,.12,3.52,'teal');
    timber(H,R,.16,j-.05,.52,.32,3.5,.17,'sun');
    for(const z of[1.1,2.75])H.line(R,[H.p(.52,j+.23,z),H.p(.52,j+.23,z+.19)],'paper',1.5);
  }
  for(let j=1.8;j<9.2;j+=1.45){const p=H.p(.53,j,1.08);H.line(R,[[p[0]-4,p[1]],[p[0]+5,p[1]+4]],'sun',2);}
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
  for(const x of[2.26,4.1,7.8,9.62]){
    shape(H,R,H.faceI(x,1.245,1.5,.17,.53),'teal',.55,.7);
    shape(H,R,H.faceI(x+.13,1.265,1.24,.24,.46),'sun',.3,.5);
    const p=H.p(x+.75,1.28,.37);oval(H,R,...p,3,2,'blue',.8);
  }
  const returnSlot=H.p(10.54,1.28,.6);shape(H,R,[[returnSlot[0]-18,returnSlot[1]-3],[returnSlot[0]+18,returnSlot[1]-3],[returnSlot[0]+18,returnSlot[1]+3],[returnSlot[0]-18,returnSlot[1]+3]],'blue',.8,.6);
  for(let k=0;k<3;k++)box(H,R,10.08+k*.05,1.3+k*.09,.75,.62,.24+k*.07,.06,['coral','paper','teal'][k],.66);
  const display=H.faceI(2.48,1.36,1.13,2.69,3.3);shape(H,R,display,'paper',1,.7);bird(H,R,...H.p(3.03,1.38,2.96),.78,'coral');H.line(R,[H.p(2.56,1.39,2.76),H.p(3.52,1.39,2.76)],'teal',1.4);
  timber(H,R,2.4,1.28,1.35,.24,2.6,.1,'coral');
  const acoustic=[H.p(10.8,2.7,.1),H.p(11.5,3.8,.1),H.p(11.5,3.8,2.7),H.p(10.8,2.7,2.7)];shape(H,R,acoustic,'coral',.28,.8);for(let k=0;k<9;k++){const a=H.p(10.8+k*.075,2.7+k*.118,.22),b=H.p(10.8+k*.075,2.7+k*.118,2.55);H.line(R,[a,b],'paper',1.3);}
  for(const j of[9.8,11.7])timber(H,R,.15,j,.82,.13,.12,2.94,'teal');
  for(const z of[.2,.94,1.64,3.03])timber(H,R,.15,9.8,.82,2.03,z,.1,'sun');
  shape(H,R,H.faceJ(.21,9.93,1.76,.3,3.03),'teal',.22,.55);
  for(let k=0;k<4;k++){
    const j=10.04+k*.4;
    shape(H,R,H.faceJ(.85,j,.31,.34,.76+k%2*.1),['sun','coral','paper','teal'][k],.7,.5);
    H.line(R,[H.p(.87,j+.06,.43),H.p(.87,j+.26,.43)],'paper',.8);
  }
  const collage=H.faceJ(.88,10.03,1.55,1.88,2.79);shape(H,R,collage,'paper',1,.65);
  for(let k=0;k<3;k++)bird(H,R,...H.p(.91,10.3+k*.48,2.14+k%2*.34),.58,['coral','sun','teal'][k]);
  for(const j of[10.12,11.46])H.dot(...H.p(.92,j,2.73),1.6,'coral');
  drape(H,R,.3,10.16,.59,.69,1.05,.28,'coral');
  const folded=H.p(.61,11.36,1.14);shape(H,R,[[folded[0]-11,folded[1]],[folded[0]-4,folded[1]-11],[folded[0]+12,folded[1]+1],[folded[0],folded[1]-2]],'paper',1,.65);H.line(R,[[folded[0]-4,folded[1]-11],[folded[0],folded[1]-2]],'teal',.7);
  floorLight(H,5.7,6.5,190,.38);
  shape(H,R,H.tile(3.7,7.3,5.5,2.55,.025),'teal',.12,.4);
  for(let j=7.35;j<9.8;j+=.27)H.line(R,[H.p(3.75,j,.035),H.p(9.1,j,.035)],'sun',.5,{tone:.5});
  for(const [i,j,ink]of[[5.6,8.6,'coral'],[7.95,8.25,'sun']])cushion(H,R,i-.43,j-.36,.95,.9,.03,.2,ink);
  for(const x of[5.15,6.66])for(const y of[4.95,5.9]){
    const p=H.p(x,y,.11);oval(H,R,...p,4,4,'blue',.75);H.dot(...p,1.4,'sun');
    timber(H,R,x-.05,y-.05,.13,.13,.14,.23,'teal');
  }
  timber(H,R,5.02,4.9,1.87,1.25,.32,.12,'sun');
  for(let k=0;k<3;k++)box(H,R,5.23+k*.06,5.07+k*.045,1.21,.72,.46+k*.09,.08,['teal','coral','paper'][k],.7);
  timber(H,R,5.05,5.45,2,.55,.05,.15,'teal');
  timber(H,R,5.7,5.24,.45,.65,.2,.77,'teal');
  metal(H,R,5.6,5.12,.64,.8,.91,.16,'blue');
  for(const x of[5.45,6.3])H.line(R,[H.p(x,5.72,.42),H.p(5.91,5.54,.95)],'sun',2.5);
  const adjust=H.p(6.38,5.53,.94);oval(H,R,...adjust,7,7,'coral',.75);oval(H,R,...adjust,4,4,'sun',.6);H.line(R,[[adjust[0]-6,adjust[1]],[adjust[0]+6,adjust[1]]],'blue',1.2);
  const joint=H.p(5.92,5.53,1.1);oval(H,R,...joint,7,4,'sun',.7);H.dot(...joint,2,'blue');
  for(const i of[5.2,6.65])bentTube(H,R,[[i,5.55,.12],[5.9,5.55,.8]],2,'teal');
  benchFrame(H,R,2.3,9.85,2.35,1.12,.46,'coral');bird(H,R,...H.p(2.75,10.28,.6),.85,'sun');
  const theatre=H.faceI(2.44,9.88,2.04,.53,1.41);shape(H,R,theatre,'teal',.32,.75);
  shape(H,R,[H.p(2.44,9.89,1.41),H.p(3.46,9.89,1.97),H.p(4.48,9.89,1.41)],'sun',.6,.7);
  shape(H,R,H.faceI(2.66,9.9,1.61,.71,1.3),'blue',.35,.6);
  shape(H,R,[H.p(2.68,9.92,.71),H.p(3.18,9.92,.71),H.p(3.45,9.92,1.08),H.p(3.74,9.92,.71),H.p(4.24,9.92,.71)],'paper',.85,.6);
  for(const x of[2.7,4.02])drape(H,R,x,9.9,.3,.13,1.41,.69,'coral');
  bird(H,R,...H.p(3.5,9.96,1.14),.57,'sun');
  timber(H,R,2.47,10.05,1.98,.8,.17,.07,'teal');
  for(let k=0;k<3;k++)box(H,R,2.66+k*.52,10.13,.42,.51,.25,.16,['sun','paper','coral'][k],.65);
  drape(H,R,3.1,10,.65,.58,.52,.21,'teal');
  for(let k=0;k<3;k++)box(H,R,3.88+k*.06,10.18-k*.05,.46-k*.08,.42-k*.06,.51+k*.08,.07,'sun',.5);
  const mirror=H.p(4.3,10.52,.7);oval(H,R,...mirror,7,5,'teal',.27);H.outline(R,ell(...mirror,7,5),'paper',2);H.line(R,[[mirror[0]-3,mirror[1]+2],[mirror[0]+2,mirror[1]-3]],'paper',1.3);
  metal(H,R,9.8,5.15,1.35,.94,.36,.08,'teal');metal(H,R,9.8,5.15,1.35,.94,1,.08,'teal');for(const i of[9.85,11.05])for(const j of[5.2,6.03]){metal(H,R,i,j,.09,.09,.22,1.04,'teal');const p=H.p(i,j,.19);oval(H,R,...p,4,4,'blue');}books(H,R,9.96,5.42,1.09,5,.18,.51);books(H,R,9.98,5.4,.46,5,.17,.39);
  slattedSeat(H,R,9.15,9.3,2.2,.03,'teal',.7);drape(H,R,9.5,9.4,.7,.56,.77,.25,'coral');
  shape(H,R,H.tile(9.25,7.8,1.6,.94,.03),'blue',.18);for(let k=0;k<5;k++)H.line(R,[H.p(9.4+k*.27,7.85,.04),H.p(9.4+k*.27,8.68,.04)],'paper',1);
  for(const x of[9.5,10.4])for(const y of[7.93,8.54]){const p=H.p(x,y,.16);oval(H,R,...p,5,5,'blue',.8);H.dot(...p,1.5,'sun');}
  for(const x of[9.5,10.4]){
    bentTube(H,R,[[x,7.93,.23],[x,8.45,1.13],[x,8.53,.23],[x,7.92,.85]],1.8,'teal');
    bentTube(H,R,[[x,8.32,1],[x,8.57,1.69],[x,8.75,1.77]],2,'sun');
  }
  shape(H,R,H.tile(9.48,7.96,.98,.57,.79),'coral',.65,.75);
  shape(H,R,H.faceI(9.48,8.5,.98,.81,1.39),'coral',.55,.8);
  shape(H,R,[H.p(9.47,8.5,1.35),H.p(10.47,8.5,1.35),H.p(10.47,8.24,1.63),H.p(10.3,7.88,1.67),H.p(9.62,7.88,1.67),H.p(9.47,8.24,1.63)],'paper',.9,.8);
  H.line(R,[H.p(9.94,7.89,1.69),H.p(9.94,8.24,1.65),H.p(9.94,8.51,1.36)],'teal',.8);
  H.line(R,[H.p(9.5,8.74,1.76),H.p(10.4,8.74,1.76)],'blue',2.6);
  bentTube(H,R,[[11.3,9,.06],[11.25,8.95,1.75],[11.05,8.95,1.9]],2,'sun');
  bentTube(H,R,[[3.7,3.7,.1],[3.7,3.7,2.5],[4.15,4.3,2.77]],2,'teal');const lp=H.p(4.15,4.3,2.74);shape(H,R,[[lp[0]-13,lp[1]+5],[lp[0]+13,lp[1]+5],[lp[0]+5,lp[1]-8],[lp[0]-5,lp[1]-8]],'coral',.65);
},(H,R,t)=>{
  const u=((t%22)+22)%22,open=smooth(0,4.4,u)*(1-smooth(17.2,20,u)),turn=smooth(4.4,8.8,u)*(1-smooth(13.2,17.2,u)),angle=.28*turn;
  const P=(a,b,h=0)=>H.p(5.92+a*Math.cos(angle)-b*Math.sin(angle),5.53+a*Math.sin(angle)+b*Math.cos(angle),1.3-b*.4+h);
  for(const a of[-1.4,1.4])H.line(R,[P(a,-.76,-.13),P(a,.8,-.13)],'teal',3);
  shape(H,R,[P(-1.65,-.88),P(1.65,-.88),P(1.65,.9),P(-1.65,.9)],'sun',.6,1.1);
  H.line(R,[P(-1.7,.95,.04),P(1.7,.95,.04)],'teal',5);
  const right=[P(0,-.76,.06),P(1.45,-.76,.06),P(1.45,.76,.06),P(0,.76,.06)];shape(H,R,right,'paper',1,.8);
  const edge=-1.45*open+1.45*(1-open),rise=Math.sin(open*Math.PI)*1.4;
  const left=[P(0,-.76,.075),P(edge,-.76,.075+rise),P(edge,.76,.075+rise),P(0,.76,.075)];shape(H,R,left,open>.55?'paper':'teal',open>.55?1:.75,.8);
  if(open>.65){bird(H,R,...P(-.7,.1,.1),1.05,'coral');bird(H,R,...P(.75,.07,.1),.65,'coral');for(const a of[-1.2,-.9,-.6,.35,.65,.95])H.line(R,[P(a,-.47,.085),P(a+.15,-.47,.085)],'sun',1.5);shape(H,R,[P(-1.4,.45,.09),P(-1.05,.45,.09),P(-1.05,.68,.09),P(-1.4,.68,.09)],'blue',.65,.5);}
  for(let k=0;k<3;k++)H.line(R,[P(.04,.78,.025+k*.012),P(1.4,.78,.025+k*.012)],'sun',.6);
  for(const a of[-1.32,1.32])shape(H,R,[P(a-.05,-.75,.13),P(a+.05,-.75,.13),P(a+.05,-.42,.13),P(a-.05,-.42,.13)],'teal',.6,.45);
  H.line(R,[P(.02,-.8,.1),P(.02,1.05,.08)],'coral',2);for(const a of[-1.32,1.32])H.line(R,[P(a,-.82,.12),P(a,-.55,.12)],'blue',2);
  actor(H,R,4.4-.2*turn,6.18-.28*turn,t,'cape-town-library-host',{shirt:['teal',.8],hairStyle:'bun',glasses:true},0,1.7);
  actor(H,R,5.75,8.55,t,'cape-town-library-child',{shirt:['sun',.72],hairStyle:'curly'},.15,1.65,'child');
  actor(H,R,8.1,8.35,t,'cape-town-library-listener',{face:'sw',shirt:['coral',.7],hairStyle:'short'},.22,1.55,'child');
  const top=H.p(.5,10.7,3.6),sway=Math.sin(u*Math.PI/11)*5;H.line(R,[top,[top[0],top[1]+15]],'blue',.7);H.line(R,[[top[0]-23,top[1]+19],[top[0]+23,top[1]+11]],'sun',1.5);for(const [dx,dy,ink]of[[-22,34,'coral'],[2,48,'sun'],[22,27,'teal']]){H.line(R,[[top[0]+dx,top[1]+15],[top[0]+dx+sway,top[1]+dy]],'blue',.5);bird(H,R,top[0]+dx+sway,top[1]+dy+7,.65,ink);}
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
