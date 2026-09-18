import { world, box, shape, oval, stroke, actor, ell, wallRect, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, bentTube, drape } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cityView, wallCourse, cornice, wallRack, taskLight, floorShadow } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q)};
const base={x:0,y:0,drop:0,lean:0,head:0,al:-10,ar:12,el:-6,er:6,ll:-5,lr:5,kl:0,kr:0,roll:0};
function gear(H,R,x,y,r,ink='sun',phase=0){
  const pts=[];for(let n=0;n<48;n++){const a=n*Math.PI/24+phase,rr=r*(n%4<2?1:.83);pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}
  shape(H,R,pts,ink,.72,.55);oval(H,R,x,y,r*.28,r*.28,'blue',.78);
  for(let n=0;n<5;n++){const a=n*Math.PI*2/5;H.line(R,[[x+Math.cos(a)*r*.36,y+Math.sin(a)*r*.36],[x+Math.cos(a)*r*.68,y+Math.sin(a)*r*.68]],'paper',1.4);}
}
function dial(H,R,x,y,r,ink='paper'){
  oval(H,R,x,y,r,r,ink,1);oval(H,R,x,y,r*.83,r*.83,'paper',1);
  for(let n=0;n<12;n++){const a=n*Math.PI/6;H.dot(x+Math.sin(a)*r*.7,y+Math.cos(a)*r*.7,n%3?.65:1.2,'blue');}
  H.line(R,[[x-r*.45,y-r*.25],[x,y],[x+r*.18,y-r*.56]],'blue',1.6);H.dot(x,y,1.4,'coral');
}
function casework(H,R,i,j,w,h,ink='sun',empty=false){
  timber(H,R,i-.13,j-.06,w+.26,1.08,.08,.19,ink);
  shape(H,R,H.faceI(i+.12,j+.24,w-.24,.31,h-.16),'blue',.88);
  for(const x of [i,i+w-.14]) timber(H,R,x,j,.14,.93,.26,h-.31,ink);
  timber(H,R,i-.08,j-.04,w+.16,1.02,h-.17,.17,ink);
  for(const xx of [i+.055,i+w-.065])for(let k=0;k<3;k++)H.line(R,[H.p(xx,j+.95,.42+k*.92),H.p(xx+.016,j+.95,1.05+k*.92)],'coral',.45,{tone:.6});
  timber(H,R,i+.12,j+.19,w-.24,.69,1.1,.12,ink);
  for(const x of [i+.28,i+w-.3]) H.line(R,[H.p(x,j+.88,.4),H.p(x,j+.88,1.0)],'coral',.7);
  const p=H.p(i+w/2,j+.85,h-.82);dial(H,R,...p,w*12.4);
  if(!empty){H.line(R,[H.p(i+w/2,j+.78,h-1.23),H.p(i+w/2,j+.78,1.32)],'sun',2);oval(H,R,...H.p(i+w/2,j+.78,1.38),w*7.5,w*8.5,'sun',.75);}
  const door=[H.p(i,j+.94,.35),H.p(i-.64,j+1.46,.35),H.p(i-.64,j+1.46,h-1.65),H.p(i,j+.94,h-1.65)];
  shape(H,R,door,ink,.25,.85);H.tint(door,'paper',.12);
  H.line(R,[door[0],door[3]],'sun',3);
  for(const z of [.65,h-1.85]) metal(H,R,i-.045,j+.96,.09,.17,z,.19,'sun');
  H.line(R,[H.p(i-.5,j+1.37,.7),H.p(i-.5,j+1.37,h-1.82)],'paper',1.4);
}
const room=world('paris-clock-shop','The pendulum waits',{floor:'paper',tone:.8,pattern:'tiles',wall:'paper',wallTone:1,height:4.55,head:35},(H,R)=>{
  wallCourse(H,R,'ne',0,12,.88,'sun');wallCourse(H,R,'nw',0,12,.88,'sun');
  cornice(H,R,'nw',0,12,4.42);cornice(H,R,'ne',0,12,4.42);
  windowBay(H,R,'nw',3.8,3.7,1.16,2.9,{divisions:2,view:P=>cityView(H,R,P,3.7,2.9)});
  H.tint(H.tile(1,4.1,5.3,2.3,.02),'sun',.2);
  shape(H,R,wallRect(H,'nw',8.8,10.5,.17,.58,-.22),'teal',.2);
  for(let n=0;n<7;n++) H.line(R,[wallPt(H,'nw',8.93+n*.21,.25,-.24),wallPt(H,'nw',8.93+n*.21,.5,-.24)],'blue',.7);
  cabinetFrame(H,R,6.8,.3,4.5,1.25,.12,3.98,3,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+1.1,.11,'sun');timber(H,R,x,j,w,d,z+2.46,.1,'sun');
    for(let row=0;row<3;row++){
      box(H,R,x+.06,j+.08,w-.13,d-.12,z+.1+row*.29,.22,'teal',.55);
      const p=H.p(x+w*.5,j+d,z+.21+row*.29);oval(H,R,...p,row===1&&n===0?2.6:1.7,2,'sun',.8);
    }
    if(n===0){for(let k=0;k<3;k++)dial(H,R,...H.p(x+.29+k*.32,j+.7,z+1.56+(k%2)*.13),7.2);}
    if(n===1){box(H,R,x+.22,j+.2,.67,.55,z+1.22,.76,'sun',.6);dial(H,R,...H.p(x+.55,j+.76,z+1.77),7.8);for(const dx of [.38,.63]){const a=H.p(x+dx,j+.78,z+1.45);oval(H,R,...a,2.2,2.2,'sun',.8);H.line(R,[[a[0],a[1]+2],[a[0],a[1]+9],[a[0]+3,a[1]+9]],'sun',1.2);}}
    if(n===2){const p=H.p(x+.53,j+.65,z+1.3);shape(H,R,[[p[0]-11,p[1]],[p[0]-10,p[1]-25],[p[0],p[1]-33],[p[0]+10,p[1]-25],[p[0]+11,p[1]]],'paper',.26);H.line(R,[[p[0]-7,p[1]-5],[p[0]-6,p[1]-23]],'paper',1.9);}
    const p=H.p(x+.5,j+.65,z+2.56);gear(H,R,...p,8+n*2,n===1?'coral':'sun');
    H.line(R,[H.p(x+.2,j+.05,z+3.17),H.p(x+.2,j+.4,z+2.8)],'blue',1);oval(H,R,...H.p(x+.2,j+.4,z+2.76),3,3,'sun',.8);
  });
  wallRack(H,R,'ne',.6,5.2,2.72,1.3,1,'sun',(P,z)=>{
    for(let n=0;n<4;n++){const a=P(.53+n*1.1,z+.04);if(n===1)dial(H,R,...a,13,'sun');else if(n===2)gear(H,R,...a,10,'coral');else{shape(H,R,[[a[0]-10,a[1]],[a[0]-10,a[1]-15],[a[0],a[1]-24],[a[0]+10,a[1]-15],[a[0]+10,a[1]]],'paper',.35);H.line(R,[[a[0]-6,a[1]-5],[a[0]-6,a[1]-14]],'paper',1.7);}}
  });
  floorShadow(H,2.45,3.6,2.8,1.8,.2);casework(H,R,2.85,3.4,2.1,4.2,'sun',true);
  const fade=H.faceI(3.05,4.34,.4,1.36,1.93);H.tint(fade,'sun',.4);H.outline(R,fade,'coral',.45);
  benchFrame(H,R,5.4,3.76,4.55,1.98,1.22,'sun');
  cushion(H,R,7.75,4.05,1.62,1.16,1.24,.12,'teal');
  metal(H,R,7.96,4.3,1.22,.68,1.37,.09,'sun');
  const m=H.p(8.47,4.62,1.57);gear(H,R,m[0]-11,m[1]-7,11);gear(H,R,m[0]+7,m[1]-8,7,'coral');gear(H,R,m[0]+1,m[1]+6,6);
  for(const i of [8.08,8.95]) bentTube(H,R,[[i,4.37,1.39],[i,4.37,1.89],[i,4.81,1.89]],1.4,'blue');
  oval(H,R,...H.p(8.45,4.6,1.98),12,7,'sun',.65);
  metal(H,R,6.1,4.63,.82,.59,1.24,.13,'blue');
  bentTube(H,R,[[6.5,4.9,1.37],[6.5,4.9,3.05],[6.7,4.9,3.05],[6.7,4.9,2.86]],2.8,'teal');
  H.line(R,[H.p(6.25,4.82,1.41),H.p(6.5,4.9,2.05)],'blue',1.5);
  taskLight(H,R,9.45,4.03,1.24,'coral',-.6);
  box(H,R,5.69,4.11,.68,.82,1.23,.08,'teal',.6);
  const key=H.p(5.95,4.56,1.33);oval(H,R,...key,4,3,'sun',.8);H.line(R,[[key[0]+4,key[1]],[key[0]+15,key[1]+5],[key[0]+13,key[1]+8]],'sun',2.1);
  benchFrame(H,R,2.2,9.6,4.4,1.27,.75,'teal');
  shape(H,R,H.tile(2.36,9.71,2.52,1,.77),'paper',1);
  for(const [i,j,r] of [[2.9,10.03,11],[3.75,10.12,8]])gear(H,R,...H.p(i,j,.79),r);
  bentTube(H,R,[[4.52,10.36,.8],[4.52,9.89,.8],[4.93,9.89,.8],[4.93,10.18,.8]],1.5,'blue');
  box(H,R,5.46,9.88,.33,.42,.76,.23,'sun',.55);
  H.line(R,[H.p(5.61,10.08,.99),H.p(5.61,10.08,1.35)],'blue',1.5);
  oval(H,R,...H.p(6.1,10.04,.82),8,5,'sun',.6);
  benchFrame(H,R,9.8,7.2,1.75,3.2,.63,'sun');
  drape(H,R,9.99,7.5,1.36,1.35,.64,.38,'paper');
  for(let n=0;n<3;n++){const p=H.p(10.24+n*.39,9.12,.7);oval(H,R,...p,6,4,['teal','paper','coral'][n],.55);stroke(H,R,[[p[0]-5,p[1]],[p[0]-5,p[1]-11],[p[0]+5,p[1]-11],[p[0]+5,p[1]]],'blue',.9);}
  box(H,R,10.02,9.72,1.28,.43,.64,.31,'teal',.65);
},(H,R,t)=>{
  const u=((t%24)+24)%24;
  let angle=0;
  if(u<8.5)angle=.16*ease(4.8,8.5,u);
  else if(u<16.2)angle=.16*Math.exp(-(u-8.5)*.42)*Math.cos((u-8.5)*4.1)*(1-ease(14.4,16.2,u));
  const pivot=H.p(6.7,4.9,2.86),bob=[pivot[0]+Math.sin(angle)*48,pivot[1]+Math.cos(angle)*48];
  H.line(R,[[pivot[0]+5,pivot[1]+4],[bob[0]+5,bob[1]+4]],'blue',2.8,{tone:.16});
  H.line(R,[pivot,bob],'blue',2.1);H.line(R,[[pivot[0]-1,pivot[1]+3],[bob[0]-1,bob[1]-4]],'sun',1);
  oval(H,R,...bob,10,12,'sun',.8);oval(H,R,bob[0]-2,bob[1]-2,6.7,8.5,'sun',.4);H.line(R,[[bob[0]-4,bob[1]-6],[bob[0]-4,bob[1]+3]],'paper',1.7);
  oval(H,R,...pivot,3,3,'blue',.8);
  const root=H.p(7.15,5.87),s=1.7,pose={...base,head:u>9.6&&u<16?12:3};
  const touch=ease(1,4.8,u)*(1-ease(8.5,9.5,u))+ease(14.4,16.3,u)*(1-ease(18,21,u));
  const target=[root[0]+7+(bob[0]-root[0]-17)*touch,root[1]-42+(bob[1]-root[1]+45)*touch];
  const dx=(target[0]-root[0])/s-5.2,dy=(target[1]-root[1])/s+32.5,c=Math.max(-1,Math.min(1,(dx*dx+dy*dy-4.368**2-4.2**2)/(2*4.368*4.2))),bend=-Math.acos(c);
  pose.ar=(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(bend),4.368+4.2*Math.cos(bend)))*180/Math.PI;pose.er=bend*180/Math.PI;pose.al=20;pose.el=40;
  FIGURES.clips.parisClockRestorer={dur:24,keys:[[0,pose],[1,pose]]};
  actor(H,R,7.15,5.87,0,'parisClockRestorer',{shirt:['paper',1],apron:['teal',.58],glasses:true,hairStyle:'short'},0,s);
  const lean=4*ease(9,12,u)*(1-ease(19,22,u)),client={...base,lean:-lean,head:8+lean,al:20,el:35,ar:15,er:60};
  FIGURES.clips.parisClockClient={dur:24,keys:[[0,client],[1,client]]};
  actor(H,R,8.88,6.6,0,'parisClockClient',{shirt:['coral',.5],hairStyle:'curly'},0,1.65);
});
room.loopSeconds=24;room.stillTime=23;
export default room;
