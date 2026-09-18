import { world, shape, stroke, oval, box, actor, mix, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, drape, vessel, bentTube, branchSpray } from '../materials.js';
import { basin, boardFloor } from '../structure.js';
import { panelFront, taskLight, floorShadow } from '../joinery.js';

const duration=28;
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const base={...FIGURES.clips.idle.keys[0][1]};
for(const n of ['amsterdamBoatResident','amsterdamBoatGalley'])FIGURES.clips[n]={dur:duration,keys:[[0,base],[1,base]]};

function hatch(H,R,angle){
  const P=(u,v,z=0)=>H.p(3.87+u,2.74+v*Math.cos(angle),1.11+v*Math.sin(angle)+z);
  shape(H,R,[P(0,0),P(3.54,0),P(3.54,1.78),P(0,1.78)],'sun',.54,1.1);
  shape(H,R,[P(0,1.78),P(3.54,1.78),P(3.54,1.78,-.13),P(0,1.78,-.13)],'sun',.7,.75);
  for(let n=0;n<6;n++){
    const u=.07+n*.57;
    H.line(R,[P(u,.08,.012),P(u,1.71,.012)],'coral',.65,{tone:.55});
    H.line(R,[P(u+.13,.2,.018),P(u+.14,1.01,.018),P(u+.08,1.52,.018)],'paper',.65,{tone:.6});
  }
  for(const v of [.2,1.51])H.line(R,[P(.07,v,.035),P(3.47,v,.035)],'blue',4.5);
  for(const v of [.2,1.51])H.line(R,[P(.07,v,.052),P(3.47,v,.052)],'sun',2.8);
  H.outline(R,[P(.12,.13,.03),P(3.42,.13,.03),P(3.42,1.66,.03),P(.12,1.66,.03)],'blue',1.15);
  for(const u of [.29,3.13])for(const v of [.2,1.51])H.dot(...P(u,v,.06),1.1,'paper');
  for(const u of [.2,3.1])metal(H,R,3.87+u,2.68,.25,.18,1.1,.09,'sun');
  const grip=[P(2.56,1.66,.06),P(2.56,1.66,.21),P(3.07,1.66,.21),P(3.07,1.66,.06)];H.line(R,grip,'blue',3.2);H.line(R,grip.slice(1,3),'paper',2.2);for(let n=0;n<4;n++)H.line(R,[P(2.64+n*.09,1.66,.16),P(2.68+n*.09,1.66,.23)],'coral',.8);
  const anchor=H.p(7.34,3.16,1.08),end=P(3.43,1.43,-.03),joint=[mix(anchor[0],end[0],.48)+3,mix(anchor[1],end[1],.48)+7*(1-angle/.75)];
  H.line(R,[anchor,joint,end],'blue',3.1);H.line(R,[anchor,joint,end],'sun',1.9);H.dot(...joint,2,'paper');
  return P;
}

const room=world('amsterdam-boat-home','The hatch lets in the evening',{floor:'teal',tone:.4,wall:false,head:40},(H,R)=>{
  for(let n=0;n<14;n++){const j=.15+n*.82;H.line(R,[H.p(.03,j,.02),H.p(.69,j+.3,.02)],'paper',.8,{tone:.4});}
  boardFloor(H,R,1.02,1.04,10.49,10.48,.12,'sun',.44);
  const boundary=[];for(let n=0;n<=22;n++){const j=.65+n*.48;boundary.push([.46+.018*(j-6)*(j-6),j]);}
  shape(H,R,[...boundary.map(([i,j])=>H.p(i,j,.13)),...boundary.slice().reverse().map(([i,j])=>H.p(i,j,2.44))],'teal',.53,1.2);
  const rear=[];for(let n=0;n<=22;n++){const i=.7+n*.49;rear.push([i,.37+.019*(i-6)*(i-6)]);}
  shape(H,R,[...rear.map(([i,j])=>H.p(i,j,.13)),...rear.slice().reverse().map(([i,j])=>H.p(i,j,2.75))],'teal',.3,1.1);
  for(const [i,j]of boundary.filter((_,n)=>n%4===0)){bentTube(H,R,[[i+.04,j,.16],[i+.16,j,1.16],[i+.04,j,2.52]],4,'sun');H.line(R,[H.p(i+.2,j,.9),H.p(i+.2,j,1.7)],'paper',.7);}
  for(const [i,j]of rear.filter((_,n)=>n%4===0))bentTube(H,R,[[i,j+.08,.15],[i,j+.12,2.88]],3.7,'sun');
  H.line(R,boundary.map(([i,j])=>H.p(i,j,2.49)),'sun',5);H.line(R,boundary.map(([i,j])=>H.p(i+.03,j,2.51)),'paper',1.1);
  H.line(R,rear.map(([i,j])=>H.p(i,j,2.81)),'sun',5);
  for(const [j,w]of[[2.2,2.3],[5.0,2.1],[7.64,2.02]]){
    const i=.58+.018*(j-6)*(j-6),P=(u,z)=>H.p(i+.1,j+u,z);
    shape(H,R,[P(0,1.3),P(w,1.3),P(w,2.2),P(0,2.2)],'sun',.75,1.1);
    shape(H,R,[P(.12,1.43),P(w-.12,1.43),P(w-.12,2.07),P(.12,2.07)],'blue',.69,.75);
    for(let n=0;n<5;n++)H.line(R,[P(.2+n*.36,1.54),P(.43+n*.36,1.56)],'paper',.65,{tone:.6});
    H.line(R,[P(w*.5,1.43),P(w*.5,2.07)],'teal',2.2);
  }
  for(let n=0;n<5;n++){
    const i=1.78+n*1.79,j=.62+.016*(i-6)*(i-6);
    timber(H,R,i,j,1.72,1.49,.14,.15,'sun');
    shape(H,R,H.faceI(i+.06,j+.08,1.6,.3,1.17),'blue',.65,.6);
    for(const x of [i+.03,i+1.58])timber(H,R,x,j,.12,1.51,.29,.96,'teal');
    timber(H,R,i,j,1.72,1.62,1.15,.16,'sun');
    if(n===0){for(let k=0;k<5;k++)box(H,R,i+.23+k*.22,j+.4,.14,.91,.37,.6+(k%2)*.13,['paper','coral','sun'][k%3],.6);timber(H,R,i+.12,j+1.37,1.45,.12,.31,.17,'sun');}
    else panelFront(H,R,i+.16,j+1.53,1.42,.34,.72,n===3?2:1,'teal');
  }
  basin(H,R,5.37,1.02,1.81,1.05,1.34,'paper');
  metal(H,R,8.1,1.07,1.36,1.11,1.33,.1,'blue');
  for(const i of [8.47,9.04])oval(H,R,...H.p(i,1.56,1.45),7,4,'sun',.6);
  vessel(H,R,8.62,1.47,1.45,8,12,'teal',false);
  const kp=H.p(8.62,1.47,1.45);stroke(H,R,[[kp[0]-7,kp[1]-9],[kp[0]-9,kp[1]-22],[kp[0]+8,kp[1]-22],[kp[0]+9,kp[1]-9]],'blue',2);H.line(R,[[kp[0]+7,kp[1]-8],[kp[0]+15,kp[1]-12]],'sun',3);
  bentTube(H,R,[[3.39,.91,2.6],[7.84,.87,2.6]],2.8,'sun');
  for(const i of [3.62,4.33,5.1,5.7,6.39,7.09]){
    const p=H.p(i,.93,2.19);oval(H,R,...p,8,12,i===5.1?'paper':'teal',i===5.1?1:.6);H.line(R,[H.p(i-.14,1.08,1.95),H.p(i+.14,1.08,1.95)],'sun',2.6);H.line(R,[H.p(i,1.08,1.95),H.p(i,1.08,2.18)],i===5.1?'coral':'blue',i===5.1?3:1.7);
  }
  taskLight(H,R,10.4,1.06,1.36,'coral',-.67);
  for(let n=0;n<4;n++){
    const j=3.1+n*1.23,i=.64+.022*(j-6)*(j-6);
    const q=[H.p(i,j,.16),H.p(i+1.78,j,.16),H.p(i+1.88,j+1.16,.16),H.p(i+.02,j+1.16,.16)];
    shape(H,R,[q[1],q[2],H.p(i+1.88,j+1.16,.72),H.p(i+1.78,j,.72)],'teal',.68,.8);
    shape(H,R,[H.p(i,j,.72),H.p(i+1.78,j,.72),H.p(i+1.88,j+1.16,.72),H.p(i+.02,j+1.16,.72)],'sun',.6,.7);
    H.line(R,[H.p(i+1.82,j+.17,.28),H.p(i+1.87,j+.98,.28),H.p(i+1.87,j+.98,.61),H.p(i+1.82,j+.17,.61)],'blue',.75);H.dot(...H.p(i+1.86,j+.6,.46),1.5,'sun');
    cushion(H,R,i+.16,j+.12,1.49,.92,.73,.13,n%2?'paper':'coral');
  }
  drape(H,R,1.2,5.48,1.25,1.68,.9,.47,'paper');
  for(let n=0;n<6;n++)H.line(R,[H.p(1.23+n*.17,7.19,.48),H.p(1.3+n*.17,7.19,.62)],'teal',.8);
  timber(H,R,3.51,2.43,4.29,2.58,.13,.12,'teal');
  floorShadow(H,3.53,2.56,4.06,2.5,.24);
  shape(H,R,H.tile(3.92,2.76,3.42,1.68,1.05),'blue',.91,.8);
  for(const i of [3.69,7.43])timber(H,R,i,2.52,.2,2.08,.23,.88,'sun');
  for(const j of [2.52,4.39])timber(H,R,3.7,j,3.91,.2,.23,.88,'sun');
  H.outline(R,H.tile(3.87,2.72,3.55,1.72,1.105),'blue',2.1);
  for(let n=0;n<4;n++)H.line(R,[H.p(4.04+n*.92,2.85,1.07),H.p(4.04+n*.92,4.3,1.07)],'teal',1.4);
  timber(H,R,7.38,6.05,3.03,2.1,1.01,.14,'sun');
  metal(H,R,8.66,6.82,.43,.4,.12,.87,'teal');metal(H,R,8.29,6.46,1.22,1.16,.14,.08,'teal');
  metal(H,R,8.2,6.74,1.53,.99,1.18,.035,'teal');
  oval(H,R,...H.p(8.93,7.19,1.23),11,5,'paper',1);cushion(H,R,8.51,6.89,.84,.45,1.25,.07,'sun');
  vessel(H,R,7.9,7.21,1.18,4.1,8,'coral');
  box(H,R,9.57,6.46,.63,.43,1.18,.32,'teal',.6);for(let n=0;n<4;n++)H.line(R,[H.p(9.67+n*.11,6.9,1.24),H.p(9.67+n*.11,6.9,1.44)],'blue',.55);H.dot(...H.p(10.03,6.91,1.42),1.3,'sun');
  const glasses=H.p(7.98,6.4,1.18);for(const dx of [-3,3])H.outline(R,ell(glasses[0]+dx,glasses[1],2.6,1.8),'blue',.6);H.line(R,[[glasses[0]-6,glasses[1]],[glasses[0]-9,glasses[1]-4]],'blue',.6);
  cushion(H,R,3.05,7.9,1.49,1.07,.29,.17,'coral');
  const hook=H.p(2.71,7.58,.88);stroke(H,R,[[hook[0],hook[1]-9],[hook[0]-4,hook[1]-5],[hook[0],hook[1]]],'sun',2);shape(H,R,[[hook[0]-8,hook[1]],[hook[0]+7,hook[1]],[hook[0]+5,hook[1]+16],[hook[0]-7,hook[1]+15]],'teal',.55,.75);
  timber(H,R,1.15,1.39,1.3,.89,2.71,.12,'sun');
  const boat=H.p(1.8,1.8,2.86);shape(H,R,[[boat[0]-12,boat[1]],[boat[0]-6,boat[1]+6],[boat[0]+8,boat[1]+6],[boat[0]+13,boat[1]],[boat[0]+3,boat[1]-7],[boat[0]-2,boat[1]+1]],'paper',1,.65);H.line(R,[[boat[0]+3,boat[1]-7],[boat[0]+3,boat[1]+5]],'sun',.6);
  for(let n=0;n<3;n++){const p=H.p(8.55+n*.72,.97,3);oval(H,R,...p,10,5,'paper',1);for(let k=-6;k<7;k+=3)H.line(R,[[p[0]+k,p[1]-3],[p[0]+k,p[1]+3]],'coral',.6);}
  bentTube(H,R,[[8.09,.97,2.91],[10.87,.97,2.91]],2,'blue');for(let i=8.14;i<10.8;i+=.28)H.line(R,[H.p(i,.9,2.97),H.p(i,1.3,2.9)],'teal',.55);
  vessel(H,R,10.64,1.51,1.35,7,12,'sun');oval(H,R,...H.p(10.64,1.51,1.35),9,3.5,'teal',.4);branchSpray(H,R,...H.p(10.64,1.51,1.72),.65,'teal',-1);
  shape(H,R,H.tile(7.63,9.66,2.48,1.48,.14),'teal',.45,.7);for(let n=0;n<8;n++)H.line(R,[H.p(7.75+n*.27,9.78,.16),H.p(7.75+n*.27,11,.16)],'paper',.55);
  for(const i of [8.12,8.8]){const p=H.p(i,10.42,.19);oval(H,R,...p,7,4.3,'blue',.65);H.line(R,[[p[0]-3,p[1]-1],[p[0]+2,p[1]-2]],'paper',1);}
  box(H,R,10.16,9.9,.8,.73,.18,.63,'coral',.57);bentTube(H,R,[[10.27,10.1,.78],[10.4,10.12,1.12],[10.87,10.12,1.08],[10.87,10.1,.78]],1.8,'sun');
  drape(H,R,9.62,9.19,1.35,.63,.21,.09,'paper');oval(H,R,...H.p(10.73,8.97,.19),6.5,3.2,'sun',.65);
  timber(H,R,10.95,10.64,.61,1.04,.13,.25,'sun');
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,rise=ease(.8,5.6,t)*(1-ease(22,26,t)),open=ease(5.6,11.2,t)*(1-ease(16.8,22,t)),P=hatch(H,R,open*.72);
  const i=mix(2.33,7.0,rise),j=mix(6.08,4.79,rise),z=mix(.39,.27,rise),q={...base,drop:.47*(1-rise),ll:84*(1-rise),lr:80*(1-rise),kl:-84*(1-rise),kr:-80*(1-rise),head:8-18*open,al:28,el:48,ar:28,er:48};
  const at=H.p(i,j,z),target=P(2.93,1.66,.2),scale=1.55;
  if(rise>.8){const dx=(target[0]-at[0])/scale-5.2,dy=(target[1]-at[1])/scale-(q.drop*19-32.5),a=4.368,b=4.2,r=Math.min(a+b-.001,Math.hypot(dx,dy)),e=Math.acos(Math.max(-1,Math.min(1,(r*r-a*a-b*b)/(2*a*b))));q.ar=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q.er=e*180/Math.PI;}
  FIGURES.clips.amsterdamBoatResident.keys=[[0,q],[1,q]];actor(H,R,i,j,0,'amsterdamBoatResident',{shirt:['coral',.63],hairStyle:'curly'},z,scale);
  const turn=ease(11.2,13.2,t)*(1-ease(19,23,t)),g={...base,head:-16+turn*29,al:48,ar:52,el:58,er:62,lean:turn*3};FIGURES.clips.amsterdamBoatGalley.keys=[[0,g],[1,g]];
  actor(H,R,9.44,3.33,0,'amsterdamBoatGalley',{shirt:['teal',.72],hairStyle:'bun'},.13,1.5);
  const p=H.p(2.39,7.1,.51),s=Math.sin(t/duration*Math.PI*2)*.8;H.line(R,[[p[0]-6,p[1]],[p[0],p[1]+2+s],[p[0]+7,p[1]]],'paper',1.2);
  H.glow(...H.p(5.8,3.66,1.13),32,18,'teal',open*.16);
});
room.loopSeconds=duration;
room.stillTime=27;
export default room;
