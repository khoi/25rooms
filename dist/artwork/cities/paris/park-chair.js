import { world, box, shape, oval, stroke, actor, wallPt, wallRect, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, vessel, branchSpray, slattedSeat } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { wallRack, floorShadow, caster, specimen } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q)};
const base={x:0,y:0,drop:0,lean:0,head:0,al:-10,ar:12,el:-6,er:6,ll:-5,lr:5,kl:0,kr:0,roll:0};
function chair(H,R,i,j,z,tilt=0,ink='teal',small=1){
  const P=(x,y,h)=>{
    const py=y*Math.cos(tilt)-h*Math.sin(tilt),pz=y*Math.sin(tilt)+h*Math.cos(tilt);
    return H.p(i+x*small,j+py*small,z+pz*small);
  };
  const tube=(points,width=3)=>{const A=points.map(p=>P(...p));H.line(R,A,'blue',width+1.2);H.line(R,A,ink,width);H.line(R,A.map(([x,y])=>[x-.7,y-.6]),'paper',.65);};
  for(const x of [.12,1.86]){
    tube([[x,.06,.03],[x,.17,.83],[x,.05,1.33],[x,.15,1.67]],3.3);
    tube([[x,1.93,.03],[x,1.75,.78],[x,.2,.8]],3.3);
    tube([[x,.14,1.1],[x,1.53,1.11],[x,1.72,.97],[x,1.72,.78]],2.7);
    tube([[x,.24,.35],[x,1.72,.35]],1.8);
    for(const y of [.06,1.93]){
      const a=P(x,y,.06);oval(H,R,...a,4.5,3,x>1&&y===.06?'coral':'blue',.72);
      H.line(R,[[a[0]-3,a[1]-1],[a[0]+3,a[1]-1]],'paper',.6);
    }
  }
  for(let n=0;n<6;n++){
    const y=.23+n*.245,h=.79+.055*Math.sin(n*Math.PI/5);
    shape(H,R,[P(.04,y,h),P(1.96,y,h),P(1.96,y+.19,h),P(.04,y+.19,h)],ink,.68,.7);
    H.line(R,[P(.14,y+.045,h+.015),P(1.87,y+.045,h+.015)],'paper',.7);
    if(n>1&&n<5)H.line(R,[P(.62,y+.09,h+.016),P(1.42,y+.09,h+.016)],'sun',.8,{tone:.5});
  }
  for(let n=0;n<4;n++){
    const h=1.02+n*.19,y=.1-.04*n;
    shape(H,R,[P(.11,y,h),P(1.87,y,h),P(1.87,y-.02,h+.125),P(.11,y-.02,h+.125)],ink,.57,.65);
    H.line(R,[P(.19,y-.025,h+.125),P(1.77,y-.025,h+.125)],'paper',.85);
  }
  for(const x of [.14,1.84])for(const h of [.81,1.12,1.55])H.dot(...P(x,.12,h),1.35,'sun');
  H.line(R,[P(1.86,.35,1.11),P(1.86,.9,1.11)],'sun',1.2);
  return P;
}
function leaf(H,R,p,ink='coral',s=1){shape(H,R,[[p[0]-5*s,p[1]],[p[0],p[1]-4*s],[p[0]+7*s,p[1]-1*s],[p[0]+1*s,p[1]+4*s]],ink,.6,.5);H.line(R,[[p[0]-4*s,p[1]],[p[0]+8*s,p[1]-1*s]],'blue',.6);}
const room=world('paris-park-chair','A chair follows the sun',{floor:'paper',tone:.72,wall:false,head:20},(H,R)=>{
  for(let a=0;a<10;a++)for(let b=0;b<10;b++){const i=a*1.2,j=b*1.2;shape(H,R,H.tile(i+.03,j+.03,1.13,1.13,.015),'paper',1,.5);if((i+j)%2<1)H.tint(H.tile(i+.08,j+.08,1.02,1.02,.017),'blue',.035);}
  masonry(H,R,'nw',0,12,0,1.68,'paper',1);masonry(H,R,'ne',0,12,0,2.06,'paper',1);
  for(const j of [.27,6.24,11.57])metal(H,R,.24,j,.19,.19,.03,3.66,'teal');
  timber(H,R,.18,.18,.26,11.65,3.62,.22,'sun');
  for(const i of [.25,6.49,11.48])metal(H,R,i,.29,.17,.18,0,3.66,'teal');
  timber(H,R,.18,.19,11.58,.28,3.62,.22,'sun');
  shape(H,R,[H.p(.2,.2,3.85),H.p(11.74,.2,3.85),H.p(11.74,1.5,3.58),H.p(.2,1.5,3.58)],'paper',.55,.8);
  for(let n=0;n<11;n++)H.line(R,[H.p(.36+n*1.02,.24,3.85),H.p(.36+n*1.02,1.48,3.58)],'coral',.7);
  bentTube(H,R,[[.14,.14,3.75],[11.77,.14,3.75],[11.77,.35,3.48],[11.77,.35,.12],[11.53,.62,.06]],3.7,'teal');
  for(const z of [.8,2.2,3.3])metal(H,R,11.67,.29,.23,.25,z,.075,'blue');
  for(const j of [1.2,2.4,3.6,4.8]){
    const p=H.p(.33,j,1.7);branchSpray(H,R,...p,1.4,'teal',j>3?-1:1);
  }
  shape(H,R,wallRect(H,'nw',7.33,10.65,1.8,3.34,-.31),'teal',.08,.75);
  for(let n=0;n<12;n++)H.line(R,[wallPt(H,'nw',7.36+n*.29,1.81,-.33),wallPt(H,'nw',7.36+n*.29,3.32,-.33)],'blue',.55,{tone:.45});
  for(let n=0;n<8;n++)H.line(R,[wallPt(H,'nw',7.35,1.87+n*.2,-.33),wallPt(H,'nw',10.63,1.87+n*.2,-.33)],'blue',.55,{tone:.45});
  H.tint([H.p(.4,1.54,.025),H.p(10.9,1.54,.025),H.p(9.7,4.06,.025),H.p(.4,4.06,.025)],'blue',.1);
  cabinetFrame(H,R,8.66,.68,2.84,1.68,.11,3.17,2,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+.52,.09,'sun');timber(H,R,x,j,w,d,z+1.52,.09,'sun');
    box(H,R,x+.06,j+.05,w-.14,d-.05,z+.1,.28,'teal',.6);
    H.line(R,[H.p(x+.42,j+d+.01,z+.25),H.p(x+.76,j+d+.01,z+.25)],'sun',1.8);
    if(n===0){for(let k=0;k<4;k++)metal(H,R,x+.2+k*.24,j+.42,.12,.92,z+.64,.8,'teal');}
    else{vessel(H,R,x+.45,j+.87,z+.64,9,17,'sun',false);bentTube(H,R,[[x+.84,j+.7,z+.65],[x+.84,j+.7,z+1.38]],1.7,'blue');}
    for(let k=0;k<3;k++){
      const p=H.p(x+.22+k*.34,j+.75,z+1.64);H.line(R,[[p[0],p[1]-3],[p[0],p[1]-28]],'sun',2);
      shape(H,R,[[p[0]-4,p[1]],[p[0]+4,p[1]],[p[0]+5,p[1]-8],[p[0]-5,p[1]-8]],k===1?'coral':'paper',.7,.6);
      for(let b=0;b<4;b++)H.line(R,[[p[0]-3+b*2,p[1]],[p[0]-3+b*2,p[1]-6]],'blue',.45);
    }
  });
  const samples=[H.p(8.37,2.3,.62),H.p(7.62,2.93,.62),H.p(7.62,2.93,2.62),H.p(8.37,2.3,2.62)];shape(H,R,samples,'teal',.51,.8);
  for(let n=0;n<4;n++){const p=H.p(8.06-n*.02,2.57,.91+n*.36);shape(H,R,[[p[0]-8,p[1]-5],[p[0]+8,p[1]-13],[p[0]+8,p[1]+1],[p[0]-8,p[1]+9]],['blue','coral','sun','teal'][n],.6,.6);if(n===2)leaf(H,R,p,'paper',.7);}
  bentTube(H,R,[[6.01,.68,.22],[6.48,1.34,.91],[7.44,1.34,.91],[8.03,.68,.22]],2.5,'teal');
  const tray=[H.p(6.2,1.16,.77),H.p(7.69,1.16,.77),H.p(7.98,2.07,.96),H.p(5.93,2.07,.96)];shape(H,R,tray,'sun',.58,.75);
  oval(H,R,...H.p(6.96,.72,.23),12,13,'blue',.8);oval(H,R,...H.p(6.96,.72,.23),7,8,'paper',1);
  for(const i of [6.13,7.8])bentTube(H,R,[[i,1.6,.73],[i,2.98,.78]],2.4,'sun');
  wallRack(H,R,'ne',1.0,4.14,1.65,1.54,1,'sun',(P,z)=>{
    const hose=P(.91,z+.25);for(let n=0;n<3;n++)H.outline(R,ell(hose[0],hose[1],15-n*3,22-n*4),'teal',2,{tone:.8});
    H.line(R,[[hose[0],hose[1]-24],[hose[0],hose[1]-31]],'blue',2.5);
    const l=P(2.83,z+.42);shape(H,R,[[l[0]-8,l[1]+6],[l[0]+8,l[1]+6],[l[0]+6,l[1]-14],[l[0]-6,l[1]-14]],'paper',1,.7);for(let k=0;k<3;k++)H.line(R,[[l[0]-5+k*5,l[1]-12],[l[0]-5+k*5,l[1]+5]],'teal',.7);
  });
  floorShadow(H,3.08,4.07,4.58,3.7,.17);
  for(const i of [3.29,6.97])for(const j of [4.37,7.29])metal(H,R,i,j,.36,.36,.02,.19,'teal');
  for(let n=0;n<7;n++)timber(H,R,3.1+n*.65,4.07,.62,3.69,.21,.16,'sun');
  for(const i of [3.2,7.39])for(const j of [4.2,7.62])H.dot(...H.p(i,j,.384),1.7,'blue');
  for(const j of [4.67,6.68])H.tint(H.tile(4.15,j,2.31,.24,.39),'blue',.1);
  benchFrame(H,R,3.9,9.23,4.71,1.64,.73,'teal');
  metal(H,R,4.16,9.48,2.43,.3,.75,.075,'teal');
  H.line(R,[H.p(4.31,9.59,.833),H.p(5.66,9.59,.833)],'sun',1.2);
  for(const [i,ink]of [[6.88,'blue'],[7.51,'coral']]){const p=H.p(i,9.76,.8);oval(H,R,...p,6,5,ink,.75);oval(H,R,...p,3.3,2.5,'paper',1);if(ink==='coral')leaf(H,R,[p[0],p[1]-1],'sun',.42);}
  bentTube(H,R,[[4.67,10.45,.8],[5.03,10.54,.8],[5.26,10.27,.8]],1.9,'sun');
  shape(H,R,H.tile(7.59,10.02,.65,.61,.78),'paper',1);for(let n=0;n<3;n++)shape(H,R,H.tile(7.64+n*.14,10.11,.12,.4,.79),['blue','coral','teal'][n],.7,.4);
  slattedSeat(H,R,.88,8.87,1.88,.03,'sun',.62);
  vessel(H,R,1.28,9.4,.74,5,14,'teal',false);
  const hat=H.p(2.08,9.37,.76);oval(H,R,...hat,12,5,'sun',.5);oval(H,R,hat[0],hat[1]-4,7,6,'sun',.65);H.line(R,[[hat[0]-6,hat[1]-3],[hat[0]+6,hat[1]-3]],'coral',1.2);
  vessel(H,R,1.48,10.97,.03,18,21,'sun',true);
  const basket=H.p(1.48,10.97,.03);for(let n=0;n<7;n++)leaf(H,R,[basket[0]-12+n*4,basket[1]-17+(n%2)*4],n%2?'coral':'teal',.72);
  for(let n=0;n<6;n++)H.line(R,[[basket[0]-14+n*5,basket[1]-17],[basket[0]-12+n*4,basket[1]-2]],'coral',.6);
  chair(H,R,9.11,8.24,.05,0,'teal',.77);
  drape(H,R,9.13,8.94,1.44,.6,.68,.42,'paper');
  for(const i of [9.12,10.54])caster(H,R,i,10.12,.06);
  metal(H,R,10.53,5.52,1.06,1.44,.018,.03,'blue');for(let n=0;n<7;n++)H.line(R,[H.p(10.59+n*.135,5.59,.053),H.p(10.59+n*.135,6.86,.053)],'paper',.8);
  for(const [i,j]of [[3.53,7.8],[8.9,3.7],[10.88,6.96]])leaf(H,R,H.p(i,j,.04),'coral',.8);
},(H,R,t)=>{
  const u=((t%22)+22)%22,rock=ease(4.4,8.8,u)*(1-ease(13.2,18.8,u)),crouch=ease(7.8,9.4,u)*(1-ease(19,20,u));
  const P=chair(H,R,4.25,4.56,.39,.055*rock);
  const pad=ease(9,10.9,u)*(1-ease(11.5,13.1,u));
  metal(H,R,6.02+pad*.16,4.52,.27,.27,.39,.06,'coral');
  const i=6.65-.16*crouch,j=4.89+.57*crouch,s=1.9,root=H.p(i,j),pose={...base,drop:.82*crouch,ll:65*crouch-5*(1-crouch),lr:-34*crouch+5*(1-crouch),kl:-115*crouch,kr:96*crouch,head:8+17*crouch};
  const target=[P(1.85,.12+.98*crouch,1.51-.7*crouch),H.p(6.14+pad*.16,4.68,.5+.9*(1-crouch))];
  for(const [n,side]of ['l','r'].entries()){
    const dx=(target[n][0]-root[0])/s-(n?5.2:-5.2),dy=(target[n][1]-root[1])/s+32.5-pose.drop*19,bend=(n?-1:1)*Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-4.368**2-4.2**2)/(2*4.368*4.2))));
    pose['a'+side]=(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(bend),4.368+4.2*Math.cos(bend)))*180/Math.PI;pose['e'+side]=bend*180/Math.PI;
  }
  FIGURES.clips.parisParkInspection={dur:22,keys:[[0,pose],[1,pose]]};
  actor(H,R,i,j,0,'parisParkInspection',{shirt:['paper',1],vest:['coral',.6],pants:['teal',.72],hairStyle:'cap'},0,s);
  leaf(H,R,H.p(3.61,7.78+.027*Math.sin(u*Math.PI/11),.04),'coral',.8);
});
room.loopSeconds=22;room.stillTime=19;
export default room;
