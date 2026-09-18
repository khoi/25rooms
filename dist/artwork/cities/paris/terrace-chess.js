import { world, shape, oval, stroke, wallPt, bottle } from '../../worlds/common.js';
import { timber, metal, bentTube, benchFrame, cushion, caneChair, vessel } from '../materials.js';
import { windowBay, wallCourse, cornice, radiator, taskLight, floorShadow, hangingRail, recessedFrame, caster } from '../joinery.js';
import { cabinetFrame } from '../structure.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t-a)/(b-a))); return u*u*(3-2*u); };
function piece(H, R, i, j, z, kind = 0, ink = 'paper') {
  const [x,y]=H.p(i,j,z), h=kind===1?12:kind===2?15:8;
  oval(H,R,x,y,4.8,2.2,ink,ink==='paper'?1:.85);
  shape(H,R,[[x-3.8,y-1],[x+3.8,y-1],[x+1.7,y-h+3],[x-1.7,y-h+3]],ink,ink==='paper'?1:.8,.65);
  if(kind===1)shape(H,R,[[x-2,y-5],[x+4,y-7],[x+5,y-13],[x+1,y-15],[x-3,y-10],[x-2,y-13],[x-5,y-10]],ink,ink==='paper'?1:.8,.65);
  else if(kind===2){shape(H,R,[[x-4,y-h+3],[x+4,y-h+3],[x+4,y-h-1],[x+2,y-h-1],[x+2,y-h+1],[x,y-h+1],[x,y-h-1],[x-4,y-h-1]],ink,ink==='paper'?1:.8,.55);}
  else oval(H,R,x,y-h+1,3,3,ink,ink==='paper'?1:.8);
}
function seated(H,R,i,j,hand,side,lean=0) {
  const [x,y]=H.p(i,j,.56), cx=x+lean, col=side?'teal':'coral';
  if(side) H.clip([[-500,1000],[500,1000],[500,420],H.p(6.8,7.9,1.05),H.p(3,7.9,1.05),[-500,0]],()=>{
  stroke(H,R,[[x-7,y+2],[x-12,y+16],[x-6,y+28]],'blue',6);
  stroke(H,R,[[x+6,y+1],[x+15,y+15],[x+17,y+27]],'blue',6);
  for(const dx of [-6,17])oval(H,R,x+dx+2,y+29,5,2.5,'blue',.9);
  });
  shape(H,R,[[cx-10,y-30],[cx+10,y-30],[x+9,y+(side?2:-12)],[x-9,y+(side?2:-12)]],col,.75,.9);
  const quiet=[x+(side?-13:13),y-(side?3:16)];
  for(const [k,end] of [quiet,hand].entries()) {
    const start=[cx+(k?8:-8),y-26],elbow=[(start[0]+end[0])/2+(side?-4:4),Math.max(start[1],end[1])+7];
    stroke(H,R,[start,elbow,end],'blue',8);stroke(H,R,[start,elbow,end],col,5.7);oval(H,R,...end,2.8,2.6,'paper',1);
  }
  oval(H,R,cx,y-41,8.5,9,'paper',1);
  shape(H,R,[[cx-9,y-41],[cx-8,y-49],[cx+1,y-52],[cx+8,y-48],[cx+9,y-43],[cx+2,y-46],[cx-4,y-44]],'blue',.85,.7);
  H.dot(cx+(side?-3:3),y-40,.9,'blue');
  if(side)for(const dx of [-2,4]){oval(H,R,cx+dx,y-40,2.6,2.1,'paper',1);H.dot(cx+dx,y-40,.6,'blue');}
}
function cup(H,R,i,j,z,ink='paper') {
  const [x,y]=H.p(i,j,z);oval(H,R,x,y+2,9,3,'paper',1);
  shape(H,R,[[x-5,y],[x+5,y],[x+5,y-9],[x-5,y-9]],ink,ink==='paper'?1:.7,.7);
  oval(H,R,x,y-9,5,2.3,'blue',.6);stroke(H,R,[[x+5,y-7],[x+9,y-6],[x+8,y-2],[x+5,y-2]],'blue',.9);
}
const room=world('paris-terrace-chess','The move stays in the hand',{floor:'paper',tone:.45,wall:'sun',wallTone:.16,height:3.55,head: 20},(H,R)=>{
  wallCourse(H,R,'nw',.1,11.8,.85,'teal');wallCourse(H,R,'ne',.1,11.8,.85,'teal');cornice(H,R,'nw',.1,11.9,3.5,'sun');cornice(H,R,'ne',.1,11.9,3.5,'sun');
  for(let n=0;n<12;n++)for(const [i,j] of [[n,10.85],[10.85,n]]){shape(H,R,H.tile(i,j,.9,.9,.02),'teal',.24,.4);shape(H,R,[H.p(i+.45,j+.1,.03),H.p(i+.8,j+.45,.03),H.p(i+.45,j+.8,.03),H.p(i+.1,j+.45,.03)],'coral',.45,.5);}
  const W=windowBay(H,R,'nw',1.25,7.7,1.22,2.05,{divisions:4,ink:'sun',view:P=>{
    for(let n=0;n<6;n++){const a=.2+n*1.2;shape(H,R,[P(a,.15),P(a+1,.15),P(a+1,.73+n%2*.35),P(a,.73+n%2*.35)],'teal',.18,.45);for(let k=0;k<3;k++)H.line(R,[P(a+.23+k*.24,.36),P(a+.23+k*.24,.59)],'paper',1.3);}
    H.line(R,[P(.1,.23),P(7.6,.23)],'blue',1.4);
  }});
  H.tint(H.tile(.9,3.0,5.8,5.7,.02),'sun',.2);
  timber(H,R,.32,1.2,1.3,7.8,.08,.53,'teal');
  for(let n=0;n<5;n++){cushion(H,R,.48,1.35+n*1.49,1.12,1.39,.62,.2,n===2?'coral':'teal');metal(H,R,.55,1.45+n*1.49,.13,.15,.1,.15,'sun');}
  timber(H,R,.25,1.25,.25,7.8,.6,.75,'teal');
  for(let n=0;n<5;n++){
    const j=1.42+n*1.49;shape(H,R,H.faceJ(1.66,j,1.24,.15,.47),'teal',.34,.65);
    H.line(R,[H.p(1.69,j+.32,.39),H.p(1.69,j+.78,.39)],'sun',1.8);
    for(let k=0;k<3;k++)H.dot(...H.p(.5,j+.23+k*.38,1.19),1.25,'sun');
  }
  const bolster=H.p(.86,2.0,.87);oval(H,R,...bolster,18,7,'coral',.5);H.line(R,[[bolster[0]-11,bolster[1]-4],[bolster[0]-10,bolster[1]+4]],'paper',1.5);
  timber(H,R,1.15,5.2,1.65,1.4,.08,.51,'teal');cushion(H,R,1.2,5.22,1.55,1.35,.61,.18,'coral');
  radiator(H,R,'ne',3.25,2.4,.78);
  floorShadow(H,7.65,.5,3.75,1.65,.22);
  cabinetFrame(H,R,7.65,.48,3.7,1.3,.05,3.08,3,'teal',(x,j,w,d,z,h,col)=>{
    for(let row=0;row<3;row++){const zz=z+row*.87;timber(H,R,x,j,w,d,zz,.11,'sun');
      if(row===0){shape(H,R,H.faceI(x+.02,j+d,w-.04,zz+.15,zz+.69),'teal',.48,.65);H.line(R,[H.p(x+.32,j+d+.025,zz+.43),H.p(x+.7,j+d+.025,zz+.43)],'sun',2.3);}
      else if(col===0){for(let k=0;k<2;k++)cup(H,R,x+.28+k*.46,j+.47,zz+.13);}
      else if(col===1&&row===1){const p=H.p(x+.46,j+.5,zz+.13);oval(H,R,...p,15,5,'sun',.7);shape(H,R,[[p[0]-13,p[1]],[p[0]-11,p[1]-13],[p[0],p[1]-20],[p[0]+11,p[1]-13],[p[0]+13,p[1]]],'paper',.65,.75);H.line(R,[[p[0]-8,p[1]-7],[p[0]-4,p[1]-15]],'paper',1.4);}
      else if(col===2&&row===1){for(let k=0;k<3;k++)timber(H,R,x+.08+k*.26,j+.12,.09,.83,zz+.12,.62,k===2?'coral':'paper');}
      else {bottle(H,R,...H.p(x+.52,j+.45,zz+.12),'teal',.55,false);}
    }
  });
  timber(H,R,7.52,.38,3.96,1.51,3.13,.14,'sun');
  for(const x of [7.82,10.82]){
    shape(H,R,[H.p(x,1.8,1.1),H.p(x+.25,1.8,1.1),H.p(x+.25,1.8,2.92),H.p(x,1.8,2.92)],'paper',.2,.8);
    H.line(R,[H.p(x+.06,1.81,1.27),H.p(x+.21,1.81,2.72)],'paper',1.8);
  }
  taskLight(H,R,9.55,1.06,3.19,'coral',.6);
  const bell=H.p(8.33,1.12,3.29);oval(H,R,...bell,10,3,'blue',.72);oval(H,R,bell[0],bell[1]-5,7,5,'sun',.8);H.dot(bell[0],bell[1]-11,2,'coral');
  hangingRail(H,R,'ne',.8,1.65,2.5,2,(P,u,n)=>{
    shape(H,R,[P(u-.2,-.19),P(u+.25,-.17),P(u+.3,-1.2),P(u-.25,-1.1)],n?'coral':'blue',n?.45:.6,.6);
    stroke(H,R,[P(u-.16,-.28),P(u,-.9),P(u+.13,-1.08)],'paper',.8);
  });
  const hatch=recessedFrame(H,R,'ne',3.2,3.58,1.39,1.8,'sun',P=>{
    shape(H,R,[P(.16,.16),P(3.42,.16),P(3.42,1.62),P(.16,1.62)],'blue',.57,.6);
    shape(H,R,[P(.3,.84),P(3.24,.84),P(3.24,1.47),P(.3,1.47)],'teal',.22,.6);
    for(const u of [.75,1.59,2.52]){
      const q=P(u,.88);shape(H,R,[[q[0]-6,q[1]],[q[0]+6,q[1]],[q[0]+5,q[1]-10],[q[0]-5,q[1]-10]],'paper',1,.6);oval(H,R,q[0],q[1]-10,5,2,'sun',.6);
    }
    H.line(R,[P(.2,.79,.36),P(3.35,.79,.36)],'sun',3);
    shape(H,R,[P(.21,.15),P(1.53,.15),P(1.53,.7),P(.21,.7)],'coral',.3,.6);
    for(let n=0;n<4;n++)H.line(R,[P(1.81+n*.32,.17),P(1.81+n*.32,.66)],'paper',3);
  });
  timber(H,R,3.03,.18,3.9,.8,1.32,.12,'sun');
  cup(H,R,3.48,.55,1.46);cup(H,R,4.18,.55,1.46,'teal');
  const tray=H.p(5.63,.59,1.49);oval(H,R,...tray,21,7,'blue',.63);oval(H,R,...tray,18,5,'paper',1);
  for(const x of [3.33,6.34])bentTube(H,R,[[x,.78,1.32],[x,.22,.98]],2.2,'teal');
  floorShadow(H,3,4.4,3.8,3.5,.25);
  for(const [i,j] of [[3.24,4.61],[6.37,4.61],[3.24,7.51],[6.37,7.51]]){
    bentTube(H,R,[[i+(i<5?-.24:.24),j+(j<6?-.23:.23),.05],[i,j,.54],[i,j,.96]],5,'teal');
    oval(H,R,...H.p(i,j,.63),4,2,'sun',.8);
  }
  bentTube(H,R,[[3.24,4.61,.3],[6.37,7.51,.3]],2.9,'sun');
  bentTube(H,R,[[6.37,4.61,.31],[3.24,7.51,.31]],2.9,'sun');
  metal(H,R,4.53,5.87,.58,.57,.26,.12,'teal');
  timber(H,R,3.0,4.4,3.8,3.5,.99,.13,'sun');
  for(const j of [4.43,7.68]){
    shape(H,R,[H.p(3.2,j,.99),H.p(6.6,j,.99),H.p(6.4,j,.76),H.p(5.98,j,.88),H.p(5.42,j,.73),H.p(4.85,j,.84),H.p(4.28,j,.72),H.p(3.73,j,.88),H.p(3.36,j,.75)],'teal',.63,.9);
    H.line(R,[H.p(3.3,j,.98),H.p(6.5,j,.98)],'sun',1.3);
  }
  metal(H,R,3.22,4.62,3.36,3.05,1.12,.07,'blue');
  for(let a=0;a<8;a++)for(let b=0;b<8;b++)shape(H,R,H.tile(3.36+a*.39,4.77+b*.34,.387,.337,1.201),(a+b)%2?'teal':'paper',(a+b)%2?.57:1,.3);
  timber(H,R,3.05,7.6,3.7,.24,.81,.22,'sun');
  shape(H,R,H.faceI(3.5,7.86,1.65,.84,1.04),'blue',.6,.6);timber(H,R,3.5,7.86,1.65,.45,.84,.13,'sun');H.line(R,[H.p(4.03,8.33,.91),H.p(4.53,8.33,.91)],'blue',2);
  caneChair(H,R,6.5,6.5,'coral',true);caneChair(H,R,9.1,7.8,'teal');cushion(H,R,9.15,7.89,.8,.65,.7,.18,'coral');
  const repair=H.tile(6.62,6.68,.27,.36,.69);shape(H,R,repair,'sun',.65,.4);for(let k=0;k<5;k++)H.line(R,[H.p(6.64+k*.04,6.69,.7),H.p(6.64+k*.04,7.01,.7)],'paper',.8);
  for(const [a,b,k,c] of [[1,1,0,'paper'],[3,0,2,'paper'],[4,2,0,'paper'],[6,1,0,'paper'],[0,6,2,'blue'],[2,5,0,'blue'],[4,6,0,'blue'],[5,4,1,'blue'],[7,6,0,'blue']])piece(H,R,3.56+a*.39,4.95+b*.34,1.21,k,c);
  piece(H,R,5.05,6.33,1.21,0,'sun');
  oval(H,R,...H.p(6.37,7.43,1.22),12,5,'coral',.55);for(let k=0;k<3;k++)piece(H,R,6.16+k*.13,7.38,1.25,0,'blue');
  benchFrame(H,R,8.2,4.0,2.15,1.15,.89,'teal');
  timber(H,R,8.3,4.08,1.94,.93,.27,.08,'sun');
  for(let n=0;n<3;n++){oval(H,R,...H.p(9.6,4.56,.37+n*.085),12,4,'paper',1);}
  for(const [i,j] of [[8.31,4.1],[10.2,4.1],[8.31,5.04],[10.2,5.04]])caster(H,R,i,j,.03);
  bentTube(H,R,[[10.31,4.15,.86],[10.31,4.15,1.35],[10.31,4.92,1.35],[10.31,4.92,.86]],2.2,'teal');
  cup(H,R,8.65,4.55,.91);bottle(H,R,...H.p(9.46,4.45,.91),'teal',.68,false);
  shape(H,R,H.tile(8.6,4.08,.54,.33,.92),'paper',1,.4);
  for(let n=0;n<3;n++)H.line(R,[H.p(8.66,4.14+n*.07,.94),H.p(9.03,4.14+n*.07,.94)],'teal',.55);
  shape(H,R,H.tile(3.0,3.08,1.05,.82,.04),'paper',1,.6);for(let k=0;k<4;k++)H.line(R,[H.p(3.1,3.2+k*.14,.05),H.p(3.76,3.2+k*.14,.05)],'blue',.6);
  const P=H.p(.69,5.17,1.29);shape(H,R,[[P[0]-7,P[1]],[P[0]+7,P[1]],[P[0]+5,P[1]-11],[P[0]-5,P[1]-11]],'sun',.7,.7);H.line(R,[[P[0]-6,P[1]-4],[P[0]+6,P[1]-4]],'coral',1.4);
  benchFrame(H,R,2.05,9.27,4.01,1.35,.63,'teal');
  timber(H,R,2.23,9.44,3.62,.92,.25,.075,'sun');
  for(let n=0;n<3;n++){
    timber(H,R,2.36+n*.83,9.45,.72,.9,.34,.14,['coral','teal','paper'][n]);
    H.line(R,[H.p(2.4+n*.83,10.37,.42),H.p(3.0+n*.83,10.37,.42)],'sun',1.4);
  }
  const news=(x,j,w,d)=>{shape(H,R,H.tile(x,j,w,d,.65),'paper',1,.6);for(let n=0;n<5;n++)H.line(R,[H.p(x+.08,j+.12+n*.14,.66),H.p(x+w-.1,j+.12+n*.14,.66)],'blue',.6);};
  news(2.19,9.45,1.03,.97);news(3.24,9.45,.93,.97);
  H.line(R,[H.p(3.23,9.47,.67),H.p(3.23,10.35,.67)],'teal',1.1);
  const glasses=H.p(3.49,9.98,.68);for(const dx of [-5,5]){oval(H,R,glasses[0]+dx,glasses[1],4.2,2.3,'paper',1);}H.line(R,[[glasses[0]-1,glasses[1]],[glasses[0]+1,glasses[1]]],'blue',1);
  const fan=H.p(5.1,9.98,.66);shape(H,R,[[fan[0],fan[1]+5],[fan[0]-17,fan[1]-6],[fan[0]-9,fan[1]-14],[fan[0]+6,fan[1]-16],[fan[0]+18,fan[1]-8]],'sun',.66,.6);
  for(let n=0;n<6;n++)H.line(R,[[fan[0],fan[1]+5],[fan[0]-15+n*6,fan[1]-9-Math.sin(n*.6)*5]],'coral',.7);
  const casep=H.p(5.57,9.6,.66);oval(H,R,...casep,12,4,'teal',.76);H.line(R,[[casep[0]-9,casep[1]],[casep[0]+9,casep[1]]],'sun',.7);
  shape(H,R,H.tile(9.23,7.97,.67,.44,.94),'teal',.45,.7);H.line(R,[H.p(9.3,8.03,.96),H.p(9.82,8.31,.96)],'sun',1.5);
  bentTube(H,R,[[10.08,8.32,.04],[10.08,8.32,1.41],[9.99,8.31,1.53],[9.76,8.31,1.53],[9.67,8.31,1.4]],2.2,'sun');
  piece(H,R,.78,6.25,1.32,2,'paper');timber(H,R,.43,6.72,.53,.65,1.27,.13,'coral');piece(H,R,.7,7.54,1.31,0,'blue');
},(H,R,t)=>{
  const u=((t%16)+16)%16,lift=ease(3.2,6.4,u)*(1-ease(9.6,12.8,u)),grip=ease(.7,3.1,u)*(1-ease(12.8,14,u));
  const point=H.p(3.56,6.34,1.21+lift*.47),rest=H.p(3.21,6.64,1.15);
  const hand=[rest[0]+(point[0]-rest[0])*grip,rest[1]+(point[1]-7-rest[1])*grip];
  seated(H,R,2.45,6.0,hand,false,-1);
  const lean=-6*ease(6.1,8.0,u)*(1-ease(10,13.8,u));
  seated(H,R,6.78,6.85,H.p(6.45,6.98,1.22),true,lean);
  piece(H,R,3.56,6.34,1.21+lift*.47,1,'paper');
  if(grip>.05)oval(H,R,...hand,2.7,2.5,'paper',1);
  const sway=Math.sin(u*Math.PI/8)*.06;
  const P=(a,b)=>wallPt(H,'nw',8.55+a,1.38+b,-.29);
  shape(H,R,[P(0,0),P(.4+sway,0),P(.42,1.88),P(-.16,1.88)],'coral',.38,.7);
  stroke(H,R,[P(.12,0),P(.22+sway,.72),P(.03,1.78)],'paper',1.4);
  const scarf=H.tile(2.72,7.38,.52,.66,1.2);shape(H,R,scarf,'coral',.45,.55);oval(H,R,...H.p(2.97,7.7,1.225),3,3,'sun',.9);
});
room.loopSeconds=16;
room.stillTime=7.8;
export default room;
