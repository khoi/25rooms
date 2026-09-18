import { world, box, shape, oval, stroke, actor, ell, wallRect, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, bentTube, drape } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cityView, wallCourse, cornice, wallRack, taskLight, floorShadow, radiator } from '../joinery.js';

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
  const crown=[];
  for(let n=0;n<=20;n++){const a=Math.PI-n*Math.PI/20;crown.push(H.p(i+w/2+Math.cos(a)*(w*.53),j+1.01,h-.04+Math.sin(a)*.58));}
  shape(H,R,crown,ink,.67,.85);
  H.line(R,crown.slice(1,-1),'paper',1.2);
  for(const x of [i-.01,i+w-.07]){
    timber(H,R,x,j+.76,.09,.2,1.24,h-1.46,ink);
    for(const z of [1.2,h-.45])timber(H,R,x-.07,j+.7,.24,.31,z,.11,'sun');
  }
  for(const z of [.34,.52])timber(H,R,i-.08,j-.04,w+.16,1.02,z,.075,ink);
  for(const x of [i+.37,i+w-.38]){
    H.line(R,[H.p(x,j+.73,1.34),H.p(x,j+.73,h-1.26)],'sun',1.2);
    metal(H,R,x-.09,j+.63,.18,.2,1.38,.52,'sun');
    H.line(R,[H.p(x-.04,j+.84,1.46),H.p(x-.04,j+.84,1.83)],'paper',1);
  }

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
  radiator(H,R,'nw',4.18,2.9,.76);
  for(const [pos,r,ink] of [[1.63,22,'sun'],[8.62,17,'teal'],[10.62,23,'coral']]){
    const P=(u,z)=>wallPt(H,'nw',pos+u,z,-.25),c=P(0,2.92);
    shape(H,R,[P(-.59,1.77),P(.59,1.77),P(.64,3.65),P(-.64,3.65)],ink,.45,.9);
    H.line(R,[P(-.46,1.87),P(-.46,3.53),P(.46,3.53)],'sun',1.6);
    dial(H,R,...c,r,ink);
    const low=P(0,2.05);H.line(R,[P(0,2.56),low],'sun',2);oval(H,R,...low,8,10,'sun',.72);
    H.line(R,[P(-.19,2.46),P(-.19,2.09)],'blue',.85);H.line(R,[P(.17,2.46),P(.17,1.99)],'blue',.85);
  }
  wallRack(H,R,'nw',.51,2.52,.97,.65,1,'teal',(P,z)=>{
    for(let n=0;n<5;n++){const a=P(.28+n*.46,z+.06);oval(H,R,a[0],a[1]-10,3,3,'sun',.75);H.line(R,[[a[0],a[1]-7],[a[0],a[1]-1],[a[0]+4,a[1]-1]],'sun',1.4);}
  });

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
  for(const [i,j] of [[.47,7.96],[1.62,7.96],[.47,9.02],[1.62,9.02]])timber(H,R,i,j,.14,.14,.04,1.04,'teal');
  timber(H,R,.3,7.8,1.63,1.44,1.06,.14,'sun');
  timber(H,R,.39,7.88,1.45,1.27,.28,.1,'teal');
  for(let n=0;n<3;n++)box(H,R,.53,8.01,.99,.8,.39+n*.18,.13,n===1?'coral':'paper',.6);
  const hood=H.p(1.04,8.5,1.21);
  shape(H,R,[[hood[0]-20,hood[1]],[hood[0]-19,hood[1]-28],[hood[0]-11,hood[1]-43],[hood[0]+4,hood[1]-47],[hood[0]+16,hood[1]-38],[hood[0]+21,hood[1]]],'paper',.29,.85);
  H.line(R,[[hood[0]-15,hood[1]-7],[hood[0]-14,hood[1]-27],[hood[0]-6,hood[1]-38]],'paper',2.1);
  oval(H,R,hood[0],hood[1],20,7,'sun',.45);
  const spare=H.p(.97,8.54,1.25);gear(H,R,spare[0],spare[1]-15,10,'sun');
  floorShadow(H,2.45,3.6,2.8,1.8,.2);casework(H,R,2.85,3.4,2.1,4.2,'sun',true);
  const fade=H.faceI(3.05,4.34,.4,1.36,1.93);H.tint(fade,'sun',.4);H.outline(R,fade,'coral',.45);
  timber(H,R,5.59,3.95,4.1,1.52,.28,.13,'teal');
  for(let n=0;n<3;n++){
    box(H,R,5.7+n*1.22,4.08,1.07,1.1,.42,.37,n===1?'sun':'teal',.5);
    shape(H,R,H.faceI(5.79+n*1.22,5.2,.87,.51,.69),'blue',.32,.5);
    H.line(R,[H.p(6.01+n*1.22,5.23,.61),H.p(6.48+n*1.22,5.23,.61)],'sun',1.6);
  }
  benchFrame(H,R,5.4,3.76,4.55,1.98,1.22,'sun');
  cushion(H,R,7.75,4.05,1.62,1.16,1.24,.12,'teal');
  metal(H,R,7.96,4.3,1.22,.68,1.37,.09,'sun');
  for(const i of [8.05,8.88])for(const j of [4.37,4.86])metal(H,R,i,j,.08,.08,1.45,.5,'sun');
  const plate=[H.p(8.05,4.92,1.46),H.p(8.95,4.92,1.46),H.p(8.95,4.92,2.06),H.p(8.8,4.92,2.21),H.p(8.18,4.92,2.21),H.p(8.05,4.92,2.06)];
  shape(H,R,plate,'sun',.45,.65);
  for(const i of [8.18,8.8])for(const z of [1.58,2.04])H.dot(...H.p(i,4.94,z),1.6,'blue');
  const m=H.p(8.47,4.96,1.78);gear(H,R,m[0]-11,m[1]-7,11);gear(H,R,m[0]+7,m[1]-8,7,'coral');gear(H,R,m[0]+1,m[1]+6,6);
  for(const i of [8.08,8.95]) bentTube(H,R,[[i,4.37,1.39],[i,4.37,1.89],[i,4.81,1.89]],1.4,'blue');
  oval(H,R,...H.p(8.45,4.6,1.98),12,7,'sun',.65);
  metal(H,R,6.1,4.63,.82,.59,1.24,.13,'blue');
  bentTube(H,R,[[6.5,4.9,1.37],[6.5,4.9,3.05],[6.7,4.9,3.05],[6.7,4.9,2.86]],2.8,'teal');
  H.line(R,[H.p(6.25,4.82,1.41),H.p(6.5,4.9,2.05)],'blue',1.5);
  taskLight(H,R,9.45,4.03,1.24,'coral',-.6);
  box(H,R,5.69,4.11,.68,.82,1.23,.08,'teal',.6);
  const key=H.p(5.95,4.56,1.33);oval(H,R,...key,4,3,'sun',.8);H.line(R,[[key[0]+4,key[1]],[key[0]+15,key[1]+5],[key[0]+13,key[1]+8]],'sun',2.1);
  const tool=H.p(9.02,5.39,1.24);oval(H,R,...tool,7,5,'paper',1);oval(H,R,...tool,4,2.5,'blue',.5);H.line(R,[[tool[0]-4,tool[1]-5],[tool[0]-1,tool[1]-17],[tool[0]+4,tool[1]-18]],'blue',1.3);
  box(H,R,5.58,3.9,.54,.39,1.24,.19,'sun',.6);
  for(let n=0;n<4;n++){const a=H.p(5.68+n*.1,4.07,1.45);H.line(R,[a,[a[0]+n-2,a[1]-17-n%2*6]],'blue',1);H.dot(a[0]+n-2,a[1]-19-n%2*6,2,'coral');}
  timber(H,R,2.35,9.71,4.08,.98,.18,.12,'teal');
  for(const i of [2.38,3.73,5.05]){
    timber(H,R,i,9.77,.1,.92,.3,.3,'sun');
    box(H,R,i+.16,9.88,.94,.69,.31,.17,i<4?'paper':'coral',.65);
    H.line(R,[H.p(i+.31,10.58,.42),H.p(i+.91,10.58,.42)],'sun',1.3);
  }
  benchFrame(H,R,2.2,9.6,4.4,1.27,.75,'teal');
  const board=[H.p(2.37,9.69,.81),H.p(4.34,9.69,.81),H.p(4.34,9.4,2.03),H.p(2.37,9.4,2.03)];
  shape(H,R,board,'sun',.55,.85);
  H.line(R,[H.p(2.48,9.69,.86),H.p(2.48,9.44,1.89),H.p(4.19,9.44,1.89)],'paper',1.2);
  for(const i of [2.46,4.13])H.line(R,[H.p(i,9.69,.8),H.p(i,10.06,.78)],'blue',1.7);
  const study=H.p(3.11,9.47,1.57);gear(H,R,...study,16,'sun');gear(H,R,study[0]+20,study[1]+9,10,'coral');
  H.line(R,[[study[0]-17,study[1]+22],[study[0]+28,study[1]+22]],'blue',.7);
  for(const dx of [-17,28])H.line(R,[[study[0]+dx,study[1]+19],[study[0]+dx,study[1]+25]],'blue',.7);
  shape(H,R,H.tile(2.36,9.71,2.52,1,.77),'paper',1);
  for(const [i,j,r] of [[2.9,10.03,11],[3.75,10.12,8]])gear(H,R,...H.p(i,j,.79),r);
  bentTube(H,R,[[4.52,10.36,.8],[4.52,9.89,.8],[4.93,9.89,.8],[4.93,10.18,.8]],1.5,'blue');
  box(H,R,5.46,9.88,.33,.42,.76,.23,'sun',.55);
  H.line(R,[H.p(5.61,10.08,.99),H.p(5.61,10.08,1.35)],'blue',1.5);
  oval(H,R,...H.p(6.1,10.04,.82),8,5,'sun',.6);
  timber(H,R,9.97,7.38,1.41,2.69,.2,.12,'teal');
  for(let n=0;n<3;n++){const q=H.p(10.27,7.85+n*.76,.34);oval(H,R,...q,10,5,'paper',1);oval(H,R,...q,5,2.5,'blue',.45);H.line(R,[[q[0]-10,q[1]],[q[0]-10,q[1]-8],[q[0]+10,q[1]-8],[q[0]+10,q[1]]],'paper',2);}
  benchFrame(H,R,9.8,7.2,1.75,3.2,.63,'sun');
  drape(H,R,9.99,7.5,1.36,1.35,.64,.38,'paper');
  for(let n=0;n<3;n++){const p=H.p(10.24+n*.39,9.12,.7);oval(H,R,...p,6,4,['teal','paper','coral'][n],.55);stroke(H,R,[[p[0]-5,p[1]],[p[0]-5,p[1]-11],[p[0]+5,p[1]-11],[p[0]+5,p[1]]],'blue',.9);}
  bentTube(H,R,[[10.06,8.77,.65],[10.06,8.77,1.02],[11.13,8.77,1.02],[11.13,8.77,.65]],1.8,'teal');
  drape(H,R,10.09,8.66,1.01,.23,1.03,.31,'paper');
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
