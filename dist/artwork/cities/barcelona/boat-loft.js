import { world, shape, oval, stroke, ell, wallPt, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, cushion, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, caster, floorShadow } from '../joinery.js';

const smooth=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const rest={x:0,y:0,drop:0,lean:0,head:0,al:22,ar:26,el:40,er:30,ll:-5,lr:5,kl:0,kr:0,roll:0};
FIGURES.clips.barcelonaLoftLearner={dur:16,keys:[[0,rest],[.2,rest],[.43,{...rest,head:-22,lean:-3}],[.6,{...rest,head:-22,lean:-3}],[.88,rest],[1,rest]]};

function rackFrame(H,R,i,j,w,d,z,levels,ink,contents) {
  for(const x of [i,i+w]) for(const y of [j,j+d]) timber(H,R,x-.05,y-.05,.1,.1,z,4.38,ink);
  for(const [row,level] of levels.entries()) {
    for(const y of [j,j+d]) timber(H,R,i-.07,y-.07,w+.14,.14,z+level,.085,ink);
    for(const x of [i,i+w]) timber(H,R,x-.065,j,.13,d,z+level,.07,ink);
    contents(i+.08,j+.08,w-.16,d-.16,z+level+.075,row);
  }
}

function coil(H,R,x,y,size=1,ink='sun') {
  for(let n=0;n<4;n++) H.line(R,ell(x+n*.8,y+n*.6,10*size,15*size),ink,1.6,{closed:true,amp:.2});
  stroke(H,R,[[x-7*size,y-10*size],[x,y-15*size],[x+7*size,y-10*size]],'blue',1);
  H.line(R,[[x-3,y-12*size],[x+3,y-12*size]],'coral',3);
}

function sail(H,R,i,j,w,d,z,ink='coral') {
  const P=(x,y,h)=>H.p(i+x,j+y,z+h);
  const cloth=[P(0,0,.11),P(w,0,.1),P(w,d*.39,.03),P(w*.73,d*.77,-.32),P(w*.35,d,-.4),P(0,d*.67,-.22)];
  surface(H,R,cloth,ink,.53,.9);
  for(let n=1;n<6;n++) { const x=w*n/6;H.line(R,[P(x,.05,.12),P(x*.92,d*.47,.01),P(x*.84,d*.77,-.32)],'paper',1.2);H.line(R,[P(x+.04,.08,.12),P(x*.92+.04,d*.47,.01),P(x*.84+.04,d*.77,-.33)],'blue',.45,{tone:.6});}
  H.line(R,[P(.08,d*.66,-.2),P(w*.36,d-.04,-.37),P(w*.72,d*.74,-.3),P(w-.03,d*.39,.06)],'sun',1.1);
  surface(H,R,[P(w*.46,.24,.125),P(w*.68,.26,.125),P(w*.69,.64,.05),P(w*.49,.62,.05)],'paper',.8,.55);
  for(let n=0;n<5;n++)H.line(R,[P(w*.49+n*.12,.3,.13),P(w*.49+n*.12,.38,.13)],'coral',.6);
  surface(H,R,[P(.05,.08,.14),P(w*.38,.08,.14),P(.05,d*.4,.08)],'sun',.27,.65);
  for(let n=0;n<3;n++)H.line(R,[P(.12+n*.07,.1,.15),P(.12+n*.07,d*.28-n*.06,.11),P(w*.29-n*.08,.11,.15)],'blue',.6,{tone:.65});
  surface(H,R,[P(w*.68,d*.36,.045),P(w*.86,d*.32,.08),P(w*.8,d*.57,-.15),P(w*.63,d*.58,-.16)],'paper',.84,.6);
  H.line(R,[P(w*.67,d*.42,.04),P(w*.83,d*.46,-.05)],'coral',1.1);
  const [x,y]=P(.06,.03,.1);oval(H,R,x,y,7,5,'paper',1);oval(H,R,x,y,3.2,2.2,'blue',.65);
}

function sailor(H,R,hand,lift) {
  const [x,y]=H.p(6.07,5.85,0),a=[x-5,y-44],b=[hand[0]+10,hand[1]+7];
  H.tint(ell(x+2,y,12,4),'blue',.2);
  for(const s of [-1,1]) {stroke(H,R,[[x+s*4,y-22],[x+s*6,y]],'blue',6.4);oval(H,R,x+s*6+2,y,5,2,'blue',.8);}
  shape(H,R,[[x-9,y-46],[x+9,y-46],[x+8,y-23],[x-7,y-23]],'paper',1,.85);
  for(let n=0;n<4;n++)H.line(R,[[x-7,y-41+n*4],[x+7,y-41+n*4]],'teal',1.1);
  for(const [start,end] of [[a,hand],[[x+7,y-43],b]]) {stroke(H,R,[start,[start[0]+5,start[1]+13],end],'blue',6);stroke(H,R,[start,[start[0]+5,start[1]+13],end],'paper',4.5);oval(H,R,...end,2.6,2,'paper',1);}
  oval(H,R,x-1,y-55,7,8,'paper',1);
  shape(H,R,[[x-8,y-56],[x-6,y-62],[x+3,y-62],[x+8,y-56],[x+11,y-54],[x-8,y-54]],'teal',.8,.7);
  H.dot(x+3,y-53+lift,1,'blue');
}

const room=world('barcelona-boat-loft','A sail without wind',{floor:'paper',tone:.6,pattern:'boards',wall:'teal',wallTone:.24,height:4.5,head:70},(H,R)=>{
  masonry(H,R,'ne',0,12,0,.75,'coral',.25);
  windowBay(H,R,'nw',1.1,6.15,2.44,1.72,{divisions:3,view:P=>{
    surface(H,R,[P(.12,.14),P(6,.14),P(6,.53),P(.12,.53)],'teal',.27,.4);
    for(let n=0;n<4;n++)H.line(R,[P(.35+n*1.4,.22),P(.86+n*1.4,1.33)],'blue',1);
  }});
  timber(H,R,.1,.13,.27,11.3,4.37,.2,'sun');
  timber(H,R,.2,.11,11.5,.28,4.34,.23,'sun');
  for(const x of [3.5,7.8,11.4]) {metal(H,R,x,.13,.15,.2,.1,4.16,'blue');H.line(R,[H.p(x-.12,.36,4.1),H.p(x+.3,.36,4.1)],'sun',2);}
  for(const x of [1.2,3.7,6.6]) {
    bentTube(H,R,[[x,.17,4.13],[x,.83,4.13],[x,.83,3.9]],2,'teal');
    metal(H,R,x-.11,.12,.24,.2,3.96,.37,'blue');
  }
  for(const [j,z,c] of [[.63,4.15,'paper'],[.85,4.21,'sun']])bentTube(H,R,[[.65,j,z],[7.75,j,z]],4,c);
  for(const x of [1.3,6.8])H.line(R,[H.p(x,.58,4.27),H.p(x,.98,4.11)],'coral',2);
  cabinetFrame(H,R,.37,1.3,1.04,2.89,.06,1.35,1,'teal',(x,j,w,d,z)=>{
    timber(H,R,x,j,w,d,.29,.08,'sun');
    for(let n=0;n<4;n++)timber(H,R,x+.09,j+.15+n*.59,w-.16,.47,.38,.3,n%2?'paper':'sun');
  });
  timber(H,R,.31,1.24,1.18,3.06,1.42,.13,'sun');
  for(const j of [1.57,2.03,2.51]) {
    const p=H.p(.91,j,1.58);oval(H,R,...p,5,3.8,'blue',.7);oval(H,R,p[0],p[1],2.1,1.6,'paper',1);
    H.line(R,[[p[0]-7,p[1]+5],[p[0]+7,p[1]+5]],'coral',1.2);
  }
  surface(H,R,H.tile(.44,3.06,.88,.93,1.57),'paper',1,.6);
  H.line(R,[H.p(.58,3.24,1.58),H.p(1.14,3.35,1.58),H.p(.83,3.84,1.58)],'teal',1.1);
  for(let n=0;n<7;n++)H.line(R,[H.p(8.1+n*.24,.16,3.8),H.p(8.1+n*.24,.16,4.1)],'blue',1.4);
  rackFrame(H,R,8.76,1.05,2.64,4.3,0,[.24,1.15,2.17,3.32,4.16],'sun',(x,j,w,d,z,row)=>{
    if(row<3) {
      for(let n=0;n<2;n++) {
        const i=x+.32+n*.97, a=H.p(i,j+.2,z+.23),b=H.p(i,j+d-.25,z+.23);
        stroke(H,R,[a,b],row===1?'coral':'paper',13);
        stroke(H,R,[[a[0]+3,a[1]+2],[b[0]+3,b[1]+2]],'blue',.75,.45);
        oval(H,R,...b,6.5,4.5,row===1?'coral':'paper',row===1?.65:1);
        oval(H,R,...b,3.2,2,'sun',.3);
        for(const t of [.3,.75]) {const u=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];H.line(R,[[u[0]-5,u[1]-4],[u[0]+5,u[1]+4]],'teal',2);}
      }
    } else if(row===3) {
      metal(H,R,x+.1,j+.2,w-.2,1.12,z,.48,'teal');
      for(let n=0;n<4;n++)H.line(R,[H.p(x+.22+n*.47,j+1.33,z+.12),H.p(x+.22+n*.47,j+1.33,z+.37)],'blue',.8);
      sail(H,R,x+.12,j+1.7,w-.24,1.58,z+.16,'paper');
    }
  });
  for(const j of [1.3,3.6])bentTube(H,R,[[8.72,j,.25],[11.35,j,4.13]],1.5,'teal');
  hangingRail(H,R,'ne',.8,5.8,3.38,3,(P,u,n)=>{
    surface(H,R,[P(u-.37,-.24),P(u-.18,-.18),P(u,-.31),P(u+.18,-.18),P(u+.37,-.24),P(u+.42,-1.16),P(u-.42,-1.16)],n===1?'sun':'coral',.61,.8);
    H.line(R,[P(u,-.31),P(u,-1.11)],'blue',1.3);
    for(const h of [-.55,-.92])H.line(R,[P(u-.38,h),P(u+.38,h)],'paper',2);
    for(const a of [-.22,.22])H.dot(...P(u+a,-.72),1.8,'blue');
  });
  for(const j of [7.8,9.4]) {const P=wallPt(H,'nw',j,2.8,-.25);H.line(R,[P,[P[0]+8,P[1]-5]],'sun',4);coil(H,R,P[0]+6,P[1]+19,.78,'sun');}
  const tools=(j,z)=>wallPt(H,'nw',j,z,-.34);
  surface(H,R,[tools(7.35,1.1),tools(10.69,1.1),tools(10.69,2.32),tools(7.35,2.32)],'sun',.27,.75);
  for(const j of [7.49,10.51])for(const z of [1.24,2.18])H.dot(...tools(j,z),1.4,'blue');
  for(let n=0;n<5;n++) {
    const j=7.73+n*.52,a=tools(j,2.13),b=tools(j,1.37);
    H.line(R,[tools(j-.08,2.1),tools(j+.08,2.1)],'blue',2.4);
    stroke(H,R,[a,b],n%2?'coral':'teal',3.6);
    H.line(R,[b,[b[0]+(n%2?7:-4),b[1]-5]],'paper',1.1);
  }
  timber(H,R,.17,7.2,.91,3.63,.99,.14,'sun');
  for(const j of [7.46,10.49])bentTube(H,R,[[.88,j,1.01],[.19,j,.63]],2,'teal');
  vessel(H,R,.71,9.45,1.14,7,12,'paper');
  for(let n=0;n<4;n++){const p=H.p(.7,9.43,1.15);H.line(R,[[p[0]-3+n*2,p[1]-10],[p[0]-7+n*4,p[1]-26-n%2*6]],n%2?'sun':'blue',1.5);}
  const knot=H.p(.68,8.08,1.14);coil(H,R,knot[0],knot[1]-.5,.38,'paper');
  benchFrame(H,R,1.35,4.75,3.35,2.25,1.12,'sun');
  sail(H,R,1.2,4.35,3.65,3.3,1.33);
  for(const y of [4.42,5.07])bentTube(H,R,[[1.32,y,1.52],[4.38,y,1.52]],4,'paper');
  metal(H,R,1.3,7.11,3.15,.14,.99,.17,'teal');
  for(const x of [1.54,4.18]){
    metal(H,R,x,7.02,.18,.3,1.14,.31,'blue');
    H.line(R,[H.p(x-.08,7.12,1.47),H.p(x+.28,7.12,1.47)],'sun',1.9);
  }
  for(let n=0;n<11;n++)H.line(R,[H.p(1.63+n*.22,7.27,1.04),H.p(1.63+n*.22,7.27,1.12)],'sun',.6);
  for(const x of [1.4,4.18]) {cushion(H,R,x,4.35,.27,1.03,1.22,.12,'teal');H.line(R,[H.p(x,4.6,1.5),H.p(x+.22,4.6,1.5)],'blue',2);}
  timber(H,R,4.65,2.68,.19,.19,.08,3.65,'sun');
  timber(H,R,4.63,2.62,2.83,.24,3.52,.19,'sun');
  timber(H,R,7.26,2.66,.18,.19,.08,3.65,'sun');
  for(const x of [4.7,7.25]) {bentTube(H,R,[[x,2.74,2.87],[x+(x<6?.56:-.56),2.74,3.56]],2.3,'teal');metal(H,R,x-.2,2.63,.52,1.18,.04,.13,'blue');}
  for(const x of [4.7,7.25]) {
    for(const z of [.56,3.41])metal(H,R,x-.04,2.6,.22,.34,z,.27,'teal');
    for(const z of [.63,3.52])H.dot(...H.p(x+.06,2.96,z),1.5,'sun');
  }
  H.line(R,[H.p(4.84,2.77,3.54),H.p(5.23,2.77,3.54),H.p(5.23,3.17,3.24)],'blue',2);
  const [px,py]=H.p(5.22,3.17,3.18);
  H.line(R,[H.p(5.22,2.77,3.57),[px,py-8]],'blue',3);
  oval(H,R,px,py,10,13,'blue',.8);oval(H,R,px,py,6.3,8.5,'sun',.65);oval(H,R,px,py,3,3.5,'paper',1);
  H.line(R,[[px-10,py-7],[px-10,py+7]],'paper',1.3);
  for(const dx of [-8,8])H.line(R,[[px+dx,py-10],[px+dx,py+10]],'teal',2.3);
  H.dot(px,py,1.7,'coral');
  H.line(R,[[px-5,py+11],[px-3,py+19],[px+4,py+19],[px+6,py+11]],'blue',1.8);
  cushion(H,R,4.77,3.42,.96,.84,.11,.17,'teal');
  metal(H,R,4.72,3.37,1.08,.97,.06,.08,'blue');
  benchFrame(H,R,2.25,9.4,4.45,1.35,.75,'sun');
  timber(H,R,2.51,9.63,3.91,.87,.24,.09,'teal');
  for(let n=0;n<3;n++) {
    metal(H,R,2.65+n*1.14,10.2,.93,.49,.37,.23,n===1?'paper':'teal');
    H.line(R,[H.p(2.87+n*1.14,10.7,.51),H.p(3.3+n*1.14,10.7,.51)],'sun',2);
  }
  metal(H,R,5.87,9.35,.5,.33,.73,.12,'blue');
  metal(H,R,5.93,9.31,.13,.58,.83,.2,'teal');
  metal(H,R,6.2,9.31,.13,.58,.83,.2,'teal');
  bentTube(H,R,[[6.27,9.8,.92],[6.6,9.8,.92],[6.6,9.8,.76]],1.8,'sun');
  const [cx,cy]=H.p(3.13,10.04,.79);coil(H,R,cx,cy-6,.47,'sun');
  for(const [x,j,ink] of [[4.1,9.83,'teal'],[4.85,10.11,'coral']]) {const p=H.p(x,j,.79);H.line(R,ell(p[0],p[1],7,3.7),'blue',1.3,{closed:true});H.line(R,ell(p[0],p[1],4,2),ink,1.5,{closed:true});}
  bentTube(H,R,[[5.52,9.85,.79],[6.26,9.96,.81]],3,'paper');
  sail(H,R,5.18,10.32,1.14,.41,.79,'coral');
  for(const [x,j] of [[9.6,8.2],[10.9,8.2],[9.6,9.5],[10.9,9.5]]) caster(H,R,x,j);
  metal(H,R,9.4,8,1.78,1.76,.26,.12,'teal');
  cushion(H,R,9.51,8.12,1.53,1.45,.41,.44,'paper');
  bentTube(H,R,[[11.03,8.12,.28],[11.03,8.12,1.62],[11.03,9.48,1.62],[11.03,9.48,.28]],2.5,'teal');
  stroke(H,R,[H.p(9.62,8.51,.9),H.p(10.13,8.63,1.07),H.p(10.64,8.83,.91)],'blue',2.4);
  const [mx,my]=H.p(10.52,2.72,3.9);shape(H,R,[[mx-10,my],[mx+8,my],[mx+4,my+5],[mx-6,my+5]],'sun',.7,.7);H.line(R,[[mx,my],[mx,my-20]],'blue',1);shape(H,R,[[mx+1,my-18],[mx+1,my-2],[mx+12,my-3]],'coral',.55,.6);
  const [gx,gy]=H.p(8.68,4.84,2.83);shape(H,R,[[gx-5,gy],[gx+4,gy],[gx+5,gy-12],[gx+1,gy-12],[gx,gy-6],[gx-3,gy-10],[gx-6,gy-8]],'sun',.8,.6);
  for(let n=0;n<3;n++) {
    const p=H.p(2.52+n*.38,10.14,.81);
    H.line(R,ell(p[0],p[1],4.3,2.7),'teal',1.6,{closed:true});
    H.line(R,[[p[0]+1,p[1]-3],[p[0]+9,p[1]-9]],'sun',2);
  }
  metal(H,R,9.25,10.52,2.14,.75,.05,.15,'teal');
  for(const x of [9.57,10.39]) {
    const p=H.p(x,10.86,.23);shape(H,R,[[p[0]-7,p[1]],[p[0]+8,p[1]],[p[0]+9,p[1]-6],[p[0]+4,p[1]-8],[p[0]+3,p[1]-24],[p[0]-6,p[1]-23]],'blue',.68,.8);
    oval(H,R,p[0]-1,p[1]-23,5,2.2,'teal',.65);H.line(R,[[p[0]-6,p[1]-2],[p[0]+7,p[1]-2]],'paper',1.3);
  }
  for(const x of [9.53,10.95])bentTube(H,R,[[x,8.03,.31],[x,8.03,1.13],[x,8.18,1.13]],1.4,'blue');
  surface(H,R,[H.p(9.63,8.06,1.11),H.p(10.79,8.06,1.11),H.p(10.67,8.35,.61),H.p(9.75,8.35,.61)],'coral',.38,.7);
  H.line(R,[H.p(9.76,8.15,1.07),H.p(10.66,8.15,1.07)],'paper',1.2);
  floorShadow(H,7.7,8.5,.9,1.7,.1);
},(H,R,t)=>{
  const u=((t%16)+16)%16,lift=smooth(3.2,6.4,u)*(1-smooth(9.6,14,u));
  const hand=H.p(6.08,5.54,1.19-lift*.45),weight=H.p(5.03,3.61,.49+lift*.45),pulley=H.p(5.22,3.17,3.18);
  stroke(H,R,[[weight[0],weight[1]-17],[pulley[0]-7,pulley[1]+3],[pulley[0]-6,pulley[1]-9],[pulley[0]+5,pulley[1]-10],[pulley[0]+9,pulley[1]],hand],'sun',2);
  stroke(H,R,[hand,[hand[0]+9,hand[1]+16],[hand[0]+18,hand[1]+23],[hand[0]+24,hand[1]+15]],'sun',1.8);
  shape(H,R,[[weight[0]-8,weight[1]],[weight[0]+9,weight[1]],[weight[0]+8,weight[1]-17],[weight[0]-7,weight[1]-17]],'coral',.6,.8);
  for(let n=0;n<5;n++)H.line(R,[[weight[0]-6,weight[1]-3-n*2.8],[weight[0]+7,weight[1]-3-n*2.8]],'paper',.7);
  sailor(H,R,hand,lift);
  actor(H,R,7.75,7.56,u,'barcelonaLoftLearner',{shirt:['sun',.7],face:'sw',hairStyle:'curly'},0,1.35);
  const [x,y]=H.p(8.59,4.1,2.78),s=Math.sin(u*Math.PI/8)*1.3;coil(H,R,x+s,y,.66,'sun');
  const p=H.p(2.55,7.18,.94);H.line(R,[[p[0]-8,p[1]],[p[0],p[1]+3+Math.sin(u*Math.PI/8)],[p[0]+9,p[1]+4]],'paper',1.1);
});
room.loopSeconds=16;
room.stillTime=4.8;
export default room;
