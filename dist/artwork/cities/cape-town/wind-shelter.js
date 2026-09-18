import { world, shape, oval, stroke, box, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, slattedSeat, drape, benchFrame, vessel } from '../materials.js';
import { boardFloor, cabinetFrame } from '../structure.js';

const rest={...FIGURES.clips.idle.keys[0][1]};
FIGURES.clips['cape-town-shelter-frame']={dur:20,keys:[[0,{...rest,ar:83,er:23,al:48,el:48,head:8}],[.4,{...rest,ar:83,er:23,al:48,el:48,head:8}],[.5,{...rest,ar:83,er:23,al:48,el:48,head:20}],[.9,{...rest,ar:83,er:23,al:48,el:48,head:8}],[1,{...rest,ar:83,er:23,al:48,el:48,head:8}]]};
FIGURES.clips['cape-town-shelter-sample']={dur:20,keys:[[0,{...rest,al:35,el:36,ar:40,er:35,head:15}],[.4,{...rest,al:35,el:36,ar:60,er:55,head:15}],[.5,{...rest,al:35,el:36,ar:92,er:48,head:-12}],[.6,{...rest,al:35,el:36,ar:92,er:48,head:-12}],[.9,{...rest,al:35,el:36,ar:40,er:35,head:15}],[1,{...rest,al:35,el:36,ar:40,er:35,head:15}]]};
const smooth=(a,b,t)=>{const v=Math.max(0,Math.min(1,(t-a)/(b-a)));return v*v*(3-2*v);};
function shell(H,R,x,y,s=1){shape(H,R,[[x-8*s,y],[x-9*s,y-7*s],[x-4*s,y-11*s],[x+3*s,y-12*s],[x+9*s,y-7*s],[x+8*s,y],[x,y+3*s]],'paper',1,.65);for(let k=-2;k<=2;k++)H.line(R,[[x,y+2*s],[x+k*3*s,y-8*s]],'coral',.7);}
function grabber(H,R,i,j,z,small=false){bentTube(H,R,[[i,j,z],[i,j,z+1.7]],2,'teal');bentTube(H,R,[[i-.1,j,z+.16],[i-.13,j,z],[i,j,z-.1],[i+.15,j,z]],1.4,'blue');bentTube(H,R,[[i,j,z+1.55],[i+.22,j,z+1.72],[i+.16,j,z+1.86],[i,j,z+1.85]],2,small?'coral':'sun');}
const room=world('cape-town-wind-shelter','The screen takes the breeze',{wall:false,floor:'teal',tone:.12,head:80},(H,R)=>{
  boardFloor(H,R,.15,.6,11.7,11.2,.06,'sun',.55);
  shape(H,R,H.tile(0,0,12,.6,.015),'teal',.33,.6);
  for(let i=.6;i<12;i+=.9){H.line(R,[H.p(i,.12,.04),H.p(i+.45,.23,.04)],'paper',1);H.line(R,[H.p(i+.1,.38,.04),H.p(i+.3,.41,.04)],'blue',.6);}
  for(const i of[.35,3.9,7.7,11.65]){timber(H,R,i,.68,.17,.18,.06,1.45,'teal');metal(H,R,i-.06,.62,.29,.3,.05,.12,'blue');}
  stroke(H,R,[H.p(.36,.72,1.5),H.p(4,.92,1.53),H.p(7.8,1.02,1.5),H.p(11.72,.72,1.5)],'blue',5);stroke(H,R,[H.p(.36,.72,1.52),H.p(4,.92,1.55),H.p(7.8,1.02,1.52),H.p(11.72,.72,1.52)],'paper',1.3);
  for(let n=0;n<4;n++){
    const i=.55+n*2.8;
    for(const z of[.25,.64,1.02])timber(H,R,i,.79,2.65,.12,z,.26,n===2?'sun':'teal');
    H.line(R,[H.p(i+.12,.96,.25),H.p(i+2.5,.96,1.29)],'paper',1.1);
    for(const x of[i+.18,i+2.4])for(const z of[.4,.8,1.16])H.dot(...H.p(x,.95,z),1,'blue');
  }
  for(const [i,j]of[[.5,1.25],[.5,10.65],[11.4,1.25]])timber(H,R,i,j,.2,.2,.05,4.3,'teal');
  timber(H,R,.5,1.25,.22,9.65,4.25,.2,'teal');
  timber(H,R,.5,5.6,.2,.2,.05,4.3,'teal');
  timber(H,R,.5,1.25,11.1,.22,4.25,.2,'teal');
  for(const j of[1.5,5.6,10.3]){
    bentTube(H,R,[[.64,j,3.4],[.64,j+.65,4.25]],4,'teal');
    const p=H.p(.66,j+.17,3.68);H.dot(...p,2,'sun');H.dot(...p, .8,'blue');
  }
  bentTube(H,R,[[.65,1.5,3.55],[1.35,1.5,4.25]],4,'teal');
  bentTube(H,R,[[11.45,1.5,3.55],[10.7,1.5,4.25]],4,'teal');
  shape(H,R,[H.p(.5,1.25,4.5),H.p(11.6,1.25,4.5),H.p(11.6,2.65,4.15),H.p(.5,2.65,4.15)],'paper',.72);
  for(let i=.7;i<11.4;i+=1)H.line(R,[H.p(i,1.25,4.51),H.p(i,2.65,4.17)],'blue',.65);
  bentTube(H,R,[[.5,2.7,4.12],[11.6,2.7,4.12],[11.6,2.7,3.65]],3,'teal');
  for(let j=3;j<8.3;j+=.42){timber(H,R,.52,j,.15,.36,.22,1.18,'teal');H.line(R,[H.p(.69,j+.15,.35),H.p(.69,j+.15,1.23)],'paper',.65);}
  timber(H,R,.48,3,.3,5.6,1.43,.12,'sun');
  for(const j of[5.3,7.8])bentTube(H,R,[[.67,j,1.1],[1.05,j,.24]],2,'teal');
  const light=H.p(7.15,2.01,3.89);
  H.line(R,[H.p(7.15,1.6,4.35),light],'blue',1.6);
  oval(H,R,...light,10,16,'sun',.55);
  for(const dx of[-7,0,7])H.line(R,[[light[0]+dx,light[1]-13],[light[0]+dx,light[1]+13]],'blue',.9);
  for(const dy of[-10,10])H.line(R,[[light[0]-9,light[1]+dy],[light[0]+9,light[1]+dy]],'teal',1.8);
  H.glow(light[0],light[1]+6,26,20,'sun',.23);
  for(const z of[.4,1.1,1.8])timber(H,R,.5,8.55,.17,2.25,z,.52,'teal');
  slattedSeat(H,R,1.35,3.8,4.75,.06,'sun',.9);
  timber(H,R,1.45,3.92,4.45,.66,.24,.09,'teal');
  for(let k=0;k<4;k++){
    const x=1.65+k*1.1;
    shape(H,R,H.faceI(x,4.6,.92,.31,.66),'blue',.38,.65);
    H.line(R,[H.p(x+.3,4.62,.5),H.p(x+.62,4.62,.5)],'sun',2);
  }
  for(const x of[1.6,5.55])H.line(R,[H.p(x,4.4,.18),H.p(x,3.95,.72)],'blue',2);
  cushion(H,R,1.6,4.08,1.25,.56,.78,.14,'coral');
  cushion(H,R,3.1,4.08,1.2,.56,.78,.14,'paper');
  drape(H,R,4.7,3.98,.8,.5,.88,.62,'teal');
  const cap=H.p(3.6,4.4,1.02);oval(H,R,...cap,11,6,'blue',.67);shape(H,R,[[cap[0]-10,cap[1]],[cap[0]-8,cap[1]-12],[cap[0]+5,cap[1]-13],[cap[0]+9,cap[1]]],'coral',.7);H.line(R,[[cap[0]-8,cap[1]-3],[cap[0]+8,cap[1]-3]],'paper',1.4);
  bentTube(H,R,[[1.6,5.1,.1],[1.48,4.83,2.05],[1.27,4.84,2.18],[1.04,4.84,2.09]],2.7,'sun');
  cabinetFrame(H,R,8.1,1.25,3.1,1.25,.22,3.15,2,'teal',(x,y,w,d,z,h,n)=>{
    timber(H,R,x,y,w,d,z+.8,.1,'teal');timber(H,R,x,y,w,d,z+2,.1,'teal');
    if(n===0){for(let k=0;k<3;k++)grabber(H,R,x+.22+k*.34,y+.5,z+.25,k===2);drape(H,R,x+.08,y+.2,w-.12,.6,z+2.1,.45,'paper');}
    else{for(let k=0;k<2;k++)box(H,R,x+.1,y+.15,w-.2,.7,z+.1+k*.28,.24,'sun',.6);for(let k=0;k<2;k++)vessel(H,R,x+.4+k*.5,y+.55,z+.94,5,16,'coral',false);cushion(H,R,x+.15,y+.2,w-.3,.7,z+2.1,.25,'paper');}
  });
  const fold=H.p(9.92,1.96,1.22);
  for(const dx of[-10,10]){oval(H,R,fold[0]+dx,fold[1]+15,5,6,'blue',.8);H.line(R,[[fold[0]+dx,fold[1]+10],[fold[0]+dx-4,fold[1]-23]],'paper',2);}
  H.line(R,[[fold[0]-14,fold[1]-23],[fold[0]+6,fold[1]-23]],'coral',3);
  shape(H,R,[[fold[0]-9,fold[1]+7],[fold[0]+12,fold[1]+7],[fold[0]+9,fold[1]-12],[fold[0]-13,fold[1]-12]],'paper',.65,.7);
  const door=[H.p(11.17,1.4,.5),H.p(11.65,2.5,.5),H.p(11.65,2.5,3.25),H.p(11.17,1.4,3.25)];shape(H,R,door,'teal',.18,.9);H.clip(door,()=>{for(let n=0;n<17;n++){const p=H.p(11.16,1.4,.5+n*.17);H.line(R,[p,[p[0]+45,p[1]+22]],'blue',.5);H.line(R,[p,[p[0]-20,p[1]+50]],'blue',.5);}});
  const pull=H.p(9.85,2.59,.71);stroke(H,R,[[pull[0]-5,pull[1]],[pull[0],pull[1]+6],[pull[0]+5,pull[1]]],'paper',2);
  for(const j of[6,7.5]){
    bentTube(H,R,[[.7,j,1.62],[.7,j,2.48],[1.55,j,2.48],[1.55,j,1.8]],2,'teal');
    drape(H,R,.76,j-.2,.69,.42,2.46,.73,j===6?'coral':'paper');
  }
  benchFrame(H,R,8.3,5.25,2.65,1.4,1.12,'teal');
  timber(H,R,8.38,5.34,2.46,1.18,.43,.09,'sun');
  for(let k=0;k<3;k++){
    const x=8.5+k*.74;box(H,R,x,5.49,.62,.8,.53,.27,k===1?'paper':'teal',.58);
    const p=H.p(x+.3,6.31,.67);stroke(H,R,[[p[0]-6,p[1]],[p[0],p[1]+5],[p[0]+6,p[1]]],'sun',1.8);
  }
  for(const x of[8.43,10.72])for(const y of[5.35,6.47])H.line(R,[H.p(x,y,.15),H.p(x+.15,y,.43)],'blue',1.5);
  shell(H,R,...H.p(8.65,5.75,1.2),.7);
  oval(H,R,...H.p(9.4,6.3,1.16),8,4.5,'blue',.26);
  stroke(H,R,[H.p(9.15,5.6,1.2),H.p(9.35,5.85,1.2),H.p(9.7,5.65,1.2),H.p(9.88,5.95,1.2)],'sun',3);
  const drawing=H.tile(10,5.45,.8,.9,1.15);shape(H,R,drawing,'paper',1);stroke(H,R,[H.p(10.35,6.22,1.16),H.p(10.21,5.88,1.16),H.p(10.48,5.65,1.16)],'teal',1.4);for(let k=0;k<3;k++)H.line(R,[H.p(10.3,6.1-k*.14,1.16),H.p(10.55,6.02-k*.14,1.16)],'teal',1);
  vessel(H,R,10.65,6.05,1.17,6,13,'paper',true);
  box(H,R,9.05,5.6,1.2,.8,.12,.65,'coral',.38);H.line(R,[H.p(9.2,6.41,.6),H.p(10.1,6.41,.6)],'paper',1.3);
  metal(H,R,1.25,8.85,2.3,1.25,.08,.1,'teal');shape(H,R,H.tile(1.4,9,2, .95,.19),'blue',.55);for(let k=0;k<5;k++)H.line(R,[H.p(1.5,9.1+k*.16,.2),H.p(3.24,9.1+k*.16,.2)],'paper',1);
  for(const i of[1.8,2.7]){const p=H.p(i,9.55,.22);shape(H,R,[[p[0]-8,p[1]],[p[0]+11,p[1]],[p[0]+11,p[1]-7],[p[0]+2,p[1]-11],[p[0]+1,p[1]-25],[p[0]-8,p[1]-25]],'sun',.62);H.line(R,[[p[0]-6,p[1]-22],[p[0]+1,p[1]-22]],'paper',1);}
  for(const j of[8.9,10.18]){
    timber(H,R,1.14,j,2.5,.1,.2,.48,'teal');
    for(let k=0;k<5;k++)H.line(R,[H.p(1.3+k*.47,j+.1,.25),H.p(1.3+k*.47,j+.1,.63)],'paper',.7);
  }
  const brush=H.p(3.4,9.55,.31);shape(H,R,[[brush[0]-9,brush[1]-4],[brush[0]+9,brush[1]-4],[brush[0]+9,brush[1]+2],[brush[0]-9,brush[1]+2]],'sun',.7,.6);for(let k=0;k<6;k++)H.line(R,[[brush[0]-8+k*3,brush[1]+2],[brush[0]-8+k*3,brush[1]+7]],'blue',.8);
  stroke(H,R,[H.p(3.35,9.6,.26),H.p(3.5,10.35,.12),H.p(2.95,10.66,.12),H.p(2.7,10.38,.12)],'coral',1.2);
  shell(H,R,...H.p(.74,11.2,.13),.35);
  benchFrame(H,R,5.6,9.7,2.2,1.1,.6,'sun');vessel(H,R,6.05,10.05,.66,6,24,'teal',false);cushion(H,R,6.8,9.88,.7,.55,.63,.16,'coral');
  const sack=H.p(8.7,9.5,.1);shape(H,R,[[sack[0]-17,sack[1]],[sack[0]+16,sack[1]],[sack[0]+20,sack[1]-32],[sack[0]-14,sack[1]-36]],'paper',.9);stroke(H,R,[[sack[0]-14,sack[1]-34],[sack[0],sack[1]-31],[sack[0]+20,sack[1]-32]],'teal',2);H.line(R,[[sack[0]-11,sack[1]-31],[sack[0]-6,sack[1]-8],[sack[0]+7,sack[1]-3]],'blue',.75);
  metal(H,R,9.7,10.16,1.55,1.22,.14,.09,'teal');
  for(const x of[9.75,11.15])for(const y of[10.25,11.27])metal(H,R,x,y,.09,.09,.06,.87,'teal');
  for(const z of[.45,.89])bentTube(H,R,[[9.78,10.2,z],[11.18,10.2,z],[11.18,11.32,z],[9.78,11.32,z],[9.78,10.2,z]],1.8,'blue');
  for(let k=0;k<5;k++)H.line(R,[H.p(9.9+k*.25,11.31,.23),H.p(9.9+k*.25,11.31,.9)],'teal',.85);
  drape(H,R,9.92,10.43,.95,.7,.91,.46,'paper');
  for(let k=0;k<3;k++){
    const p=H.p(10.06+k*.37,10.55,1.03);oval(H,R,p[0],p[1]-8,4,7,k===1?'sun':'coral',.5);H.line(R,[[p[0]-3,p[1]-7],[p[0]+4,p[1]+2]],'blue',.6);
  }
  timber(H,R,.95,2.24,.23,.23,.1,3.8,'teal');for(const z of[.45,3.2])metal(H,R,1.02,2.15,.4,.28,z,.25,'blue');
},(H,R,t)=>{
  const u=((t%20)+20)%20,q=smooth(4,8,u)*(1-smooth(12,18,u)),angle=.03+.2*q;
  const P=(a,z)=>H.p(1.15+4.85*a*Math.cos(angle),2.28+4.85*a*Math.sin(angle),z);
  const panel=[P(0,.38),P(1,.38),P(1,3.6),P(0,3.6)];H.tint(panel,'paper',.56);H.tint(panel,'teal',.1);H.outline(R,panel,'blue',5);H.outline(R,panel,'teal',3);H.line(R,[P(.035,.45),P(.035,3.53),P(.985,3.53)],'paper',1.2);H.line(R,[P(.07,1.25),P(.96,1.25)],'teal',2);
  for(const a of[.025,.975]){
    H.line(R,[P(a,.43),P(a,3.53)],'sun',1.1);
    for(const z of[.55,1.6,3.35])H.dot(...P(a,z),1.5,'blue');
  }
  for(const a of[.33,.67])H.line(R,[P(a,1.3),P(a,3.52)],'teal',2);
  H.line(R,[P(.035,.83),P(.96,.83)],'teal',3);
  for(let a=.08;a<.95;a+=.1)H.line(R,[P(a,.46),P(a,.79)],'paper',1);
  for(const z of[.59,3.2]){
    const a=P(0,z),b=P(.035,z);H.line(R,[a,b],'sun',5);oval(H,R,a[0],a[1],2.5,5,'blue',.65);
  }
  const catchP=P(.97,1.47);stroke(H,R,[[catchP[0]-7,catchP[1]-6],[catchP[0]-2,catchP[1]-9],[catchP[0]+3,catchP[1]-6],[catchP[0]+3,catchP[1]+7]],'sun',2);
  H.line(R,[P(.12,.58),P(.35,3.36)],'paper',3.2);H.line(R,[P(.37,2.42),P(.46,3.36)],'paper',1.4);
  const anchor=H.p(5.8,1.9,2.7),tip=P(1,2.7),mid=[(anchor[0]+tip[0])/2,(anchor[1]+tip[1])/2+12*(1-q)];stroke(H,R,[anchor,mid,tip],'blue',5);stroke(H,R,[anchor,mid,tip],'coral',3);for(const f of[.32,.66]){const p=[anchor[0]+(tip[0]-anchor[0])*f,anchor[1]+(tip[1]-anchor[1])*f+Math.sin(f*Math.PI)*12*(1-q)];H.line(R,[[p[0]-2,p[1]-3],[p[0]+2,p[1]+3]],'paper',1.4);}
  const ei=1.15+4.85*Math.cos(angle),ej=2.28+4.85*Math.sin(angle);actor(H,R,ei+.1,ej+.53,t,'cape-town-shelter-frame',{shirt:['coral',.75],hairStyle:'cap'},0,1.6);oval(H,R,...P(1,1.43),2.8,2.5,'coral',.4);
  const fig={who:'adult',at:[9.35,6.72,0],face:'sw',clip:'cape-town-shelter-sample',scale:1.6},hand=FIGURES.pose(fig,t,room,H).nearHand,pick=smooth(6,10,u)*(1-smooth(12,18,u)),origin=H.p(9.4,6.3,1.2);
  actor(H,R,9.35,6.72,t,fig.clip,{face:'sw',shirt:['sun',.7],hairStyle:'bun'},0,1.6);
  oval(H,R,origin[0]+(hand[0]-origin[0])*pick,origin[1]+(hand[1]-origin[1])*pick,7,4,'teal',.6);
  const ribbon=H.p(.65,8.7,4.5);shape(H,R,[ribbon,[ribbon[0]+8,ribbon[1]-2],[ribbon[0]+30+Math.sin(u*Math.PI/5)*4,ribbon[1]+11],[ribbon[0]+12,ribbon[1]+15]],'coral',.7,.6);
});
room.loopSeconds=20;
room.stillTime=0;
export default room;
