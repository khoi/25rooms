import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { surface, timber, metal, benchFrame, bentTube, cushion } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, taskLight, hangingRail, caster } from '../joinery.js';

const smooth=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};

function cutout(H,R,P,q,shadow=false) {
  const ink=shadow?'blue':'paper',tone=shadow?.36:1;
  const poly=pts=>surface(H,R,pts.map(p=>P(...p)),ink,tone,shadow?.3:.7);
  poly([[-.43,.03],[.36,.03],[.46,1.16],[-.4,1.16]]);
  if(!shadow)surface(H,R,[P(-.31,.13),P(.27,.13),P(.31,.79),P(-.31,.79)],'coral',.55,.45);
  const head=[];for(let n=0;n<24;n++){const a=n*Math.PI/12;head.push(P(Math.cos(a)*.47,-.63+Math.sin(a)*.55));}surface(H,R,head,ink,tone,shadow?.3:.65);
  for(const s of [-1,1]) {poly([[s*.05,1.08],[s*.35,1.07],[s*.39,1.97],[s*.1,2.02]]);poly([[s*.07,1.96],[s*.44,1.96],[s*.61,2.15],[s*.07,2.17]]);}
  poly([[-.44,.06],[-.66,.12],[-1.05,.94],[-.86,1.07],[-.4,.32]]);
  const a=1.02-1.83*q,tip=[.43+Math.cos(a)*1.21,.16+Math.sin(a)*1.21],nx=-Math.sin(a)*.135,ny=Math.cos(a)*.135;
  poly([[.4+nx,.16+ny],[tip[0]+nx,tip[1]+ny],[tip[0]-nx,tip[1]-ny],[.4-nx,.16-ny]]);
  const end=P(...tip);oval(H,R,...end,shadow?5.8:3.8,shadow?4.5:2.6,ink,tone);
  if(!shadow) {
    for(const [u,v] of [[-.4,.17],[.43,.16],[-.23,1.16],[.22,1.16]]) {H.dot(...P(u,v),2.1,'sun',1,{knock:true});H.dot(...P(u,v),.7,'blue');}
    H.dot(...P(-.14,-.68),.9,'blue');H.dot(...P(.18,-.67),.9,'blue');
    H.line(R,[P(-.13,-.37),P(.11,-.32)],'coral',.8);
    for(let n=0;n<3;n++)H.line(R,[P(.12+n*.09,2.01),P(.1+n*.09,2.11)],'coral',.55);
  }
  return end;
}

function animator(H,R,hand,steady,tilt) {
  const [x,y]=H.p(7.2,6.57,0);
  H.tint(ell(x,y,13,4),'blue',.2);
  for(const s of [-1,1]) {stroke(H,R,[[x+s*4,y-31],[x+s*7,y]],'blue',7);oval(H,R,x+s*7+2,y,5.8,2.6,'blue',.8);}
  shape(H,R,[[x-10,y-58],[x+10,y-58],[x+9,y-31],[x-8,y-31]],'teal',.64,.8);
  for(const [s,p] of [[-1,steady],[1,hand]]) {const a=[x+s*9,y-54],e=[a[0]*.5+p[0]*.5+s*3,(a[1]+p[1])*.5+4];stroke(H,R,[a,e,p],'blue',7);stroke(H,R,[a,e,p],'teal',5);oval(H,R,...p,2.8,2.1,'paper',1);}
  oval(H,R,x-tilt*2,y-68,7.8,9,'paper',1);
  shape(H,R,[[x-8-tilt*2,y-65],[x-10-tilt*2,y-74],[x-3-tilt*2,y-79],[x+6-tilt*2,y-76],[x+9-tilt*2,y-70],[x+3-tilt*2,y-73],[x-5-tilt*2,y-69]],'blue',.85,.7);
  oval(H,R,x-10-tilt*2,y-74,4.5,4.5,'blue',.8);
  H.dot(x+3-tilt*2,y-67,1,'blue');
  H.line(R,[[x-1-tilt*2,y-70],[x+7-tilt*2,y-69]],'sun',.8);
}

const room=world('barcelona-lightbox-studio','A drawing becomes a shadow',{floor:'paper',tone:.7,pattern:'boards',wall:'teal',wallTone:.29,height:4.06,head:55},(H,R)=>{
  masonry(H,R,'nw',0,12,0,.7,'coral',.23);
  windowBay(H,R,'ne',7.66,3.62,1.06,2.52,{divisions:3,view:P=>{
    for(let n=0;n<5;n++){const x=.13+n*.68,h=.45+n%3*.19;surface(H,R,[P(x,.13),P(x+.56,.13),P(x+.56,h),P(x,h)],'blue',.23,.4);}
  }});
  bentTube(H,R,[[10.62,.25,2.19],[10.46,.73,2.04],[10.21,.24,2.31]],1.2,'sun');
  cabinetFrame(H,R,.57,1.13,1.94,6.6,.06,2.86,1,'teal',(x,j,w,d,z,h)=>{
    for(let n=0;n<6;n++) {
      const level=.31+n*.37;timber(H,R,x,j,w,d,level,.07,'sun');
      for(let k=0;k<3;k++)surface(H,R,H.tile(x+.11+k*.025,j+.19+k*.02,w-.23,d-.35,level+.082+k*.036),'paper',1,.45);
      surface(H,R,H.faceJ(x+w+.005,j+.15,d-.28,level+.03,level+.22),'teal',.6,.55);
      H.line(R,[H.p(x+w+.015,j+2.44,level+.13),H.p(x+w+.015,j+3.29,level+.13)],'sun',2);
    }
  });
  for(let n=0;n<4;n++) {
    const p=H.p(.86+n*.33,1.42,2.96);stroke(H,R,[[p[0],p[1]],[p[0]-4,p[1]-24-n%2*8]],'paper',7);oval(H,R,p[0]-4,p[1]-24-n%2*8,3.5,2,'sun',.45);
  }
  const Q=(u,v)=>wallPt(H,'nw',u,v,-.22);
  for(let n=0;n<4;n++) {
    const p=2.65+n*1.91;
    surface(H,R,[Q(p,3.12),Q(p+1.61,3.12),Q(p+1.61,3.83),Q(p,3.83)],'paper',1,.7);
    H.line(R,[Q(p+.1,3.2),Q(p+1.51,3.2)],'teal',.6);
    const px=(u,v)=>Q(p+.82+u*.18,3.53-v*.16);cutout(H,R,px,n/3,false);
    for(const x of [.1,1.51])H.dot(...Q(p+x,3.76),1.4,'sun');
  }
  hangingRail(H,R,'nw',8.69,2.33,2.83,2,(P,u,n)=>{
    surface(H,R,[P(u-.38,-.27),P(u+.4,-.27),P(u+.39,-1.28),P(u-.4,-1.3)],n?'coral':'sun',.38,.8);
    H.line(R,[P(u-.31,-.37),P(u+.31,-.37)],'paper',1.2);
    if(!n){const a=P(u+.02,-.31);shape(H,R,[[a[0]-4,a[1]],[a[0]+6,a[1]],[a[0]+5,a[1]-13],[a[0]-3,a[1]-13]],'paper',1,.6);oval(H,R,a[0]+1,a[1]-16,4.5,5,'paper',1);H.dot(a[0]+3,a[1]-16,.8,'blue');}
  });
  for(const [i,j] of [[3.15,2.11],[7.72,2.11]]) {metal(H,R,i,j,.13,.13,.05,3.51,'teal');bentTube(H,R,[[i-.25,j+.38,.06],[i,j,.06],[i+.27,j-.19,.06]],2.5,'blue');}
  timber(H,R,3.1,2.03,4.82,.17,3.46,.13,'sun');
  surface(H,R,H.faceI(3.24,2.16,4.43,.94,3.43),'paper',1,.9);
  H.line(R,[H.p(3.36,2.19,1.04),H.p(7.55,2.19,1.04)],'sun',1.2);
  for(const x of [3.39,7.48]) {H.line(R,[H.p(x,2.17,3.44),H.p(x,2.17,3.25)],'blue',2);H.dot(...H.p(x,2.17,3.38),1.3,'sun');}
  benchFrame(H,R,3.18,4.35,5.41,2.89,.97,'sun');
  surface(H,R,[H.p(3.41,4.52,1.69),H.p(8.27,4.52,1.69),H.p(8.27,6.99,1.08),H.p(3.41,6.99,1.08)],'blue',.68,1);
  surface(H,R,[H.p(3.56,4.66,1.71),H.p(8.12,4.66,1.71),H.p(8.12,6.81,1.18),H.p(3.56,6.81,1.18)],'sun',.22,.7);
  surface(H,R,[H.p(3.72,4.77,1.72),H.p(7.99,4.77,1.72),H.p(7.99,6.68,1.25),H.p(3.72,6.68,1.25)],'paper',1,.55);
  surface(H,R,[H.p(3.42,6.99,1.08),H.p(8.28,6.99,1.08),H.p(8.28,6.99,.9),H.p(3.42,6.99,.9)],'teal',.66,.7);
  for(const i of [3.64,8.02])bentTube(H,R,[[i,4.66,.99],[i,5.79,1.44],[i,6.54,.99]],2,'teal');
  for(let n=0;n<5;n++)H.line(R,[H.p(7.75+n*.06,6.99,.94),H.p(7.75+n*.06,6.99,1.04)],'paper',.8);
  metal(H,R,4.12,6.71,3.55,.08,1.28,.06,'teal');
  for(const x of [4.34,5.84,7.34])H.dot(...H.p(x,6.75,1.37),2.1,'sun',1,{knock:true});
  metal(H,R,8.4,4.48,.16,.18,.99,2.45,'blue');
  bentTube(H,R,[[8.48,4.57,3.32],[7.95,4.74,3.32],[6.42,5.58,3.12]],3.2,'blue');
  for(const p of [[8.48,4.57,3.31],[7.95,4.74,3.31]]){oval(H,R,...H.p(...p),4.5,4,'sun',.75);H.dot(...H.p(...p),1.3,'blue');}
  metal(H,R,6.18,5.37,.78,.63,2.88,.31,'blue');
  const cam=H.p(6.52,5.79,2.87);oval(H,R,...cam,7,4,'blue',.8);oval(H,R,...cam,4.4,2.4,'teal',.38);
  H.line(R,[H.p(8.41,4.57,3.29),H.p(8.42,4.61,1.04),H.p(8.14,6.3,.97),H.p(8.69,6.37,.31)],'blue',.95);
  taskLight(H,R,4.21,3.39,1.15,'sun',.83);
  const gl=H.p(5.77,5.93,1.37);H.glow(...gl,92,46,'sun',.34);
  benchFrame(H,R,1.55,9.38,4.66,1.42,.79,'teal');
  surface(H,R,H.tile(1.73,9.5,2.5,1.1,.8),'paper',1,.7);
  const hand=H.p(2.45,9.99,.82);surface(H,R,[[hand[0]-5,hand[1]],[hand[0]+4,hand[1]],[hand[0]+6,hand[1]-4],[hand[0]+4,hand[1]-6],[hand[0]+1,hand[1]-3],[hand[0]-1,hand[1]-9],[hand[0]-4,hand[1]-8]],'paper',1,.6);
  H.dot(hand[0]-2,hand[1]-1,1.1,'sun');
  const shoe=H.p(3.56,10.11,.82);shape(H,R,[[shoe[0]-6,shoe[1]],[shoe[0]+7,shoe[1]],[shoe[0]+8,shoe[1]-4],[shoe[0]+1,shoe[1]-6],[shoe[0]-5,shoe[1]-5]],'coral',.54,.6);
  for(let n=0;n<3;n++)H.line(R,[[shoe[0]-4+n*2,shoe[1]-4],[shoe[0]-3+n*2,shoe[1]-1]],'paper',.55);
  for(const [i,j] of [[4.66,9.83],[5.58,10.14]]) {const p=H.p(i,j,.82);oval(H,R,...p,5,3,'sun',.65);H.dot(...p,1.4,'blue');}
  bentTube(H,R,[[4.37,10.43,.82],[5.07,10.49,.84],[5.62,10.4,.82]],1.1,'blue');
  metal(H,R,9.53,7.91,1.81,2.15,.08,.18,'teal');
  for(const p of [[9.68,8.09],[11.13,8.09],[9.68,9.87],[11.13,9.87]])caster(H,R,...p);
  cushion(H,R,9.66,8.06,1.52,1.83,.31,.35,'blue');
  surface(H,R,H.tile(9.81,8.21,1.23,1.53,.69),'paper',.65,.6);
  for(const p of [[10.11,8.57],[10.71,9.08]]) {const a=H.p(...p,.73);oval(H,R,...a,9,6,'blue',.73);oval(H,R,a[0],a[1]-4,6,4,'teal',.4);}
  bentTube(H,R,[[10.44,6.19,.07],[10.16,6.8,2.1],[9.47,7.17,.06]],2,'blue');
  bentTube(H,R,[[10.16,6.8,2.1],[11.2,7.13,.06]],2,'blue');
  metal(H,R,9.88,6.58,.54,.42,2.05,.23,'teal');
  surface(H,R,[H.p(10.47,5.72,1.03),H.p(11.18,5.98,1.03),H.p(11.18,5.98,2.36),H.p(10.47,5.72,2.36)],'paper',1,.7);
  H.line(R,[H.p(10.45,5.72,.05),H.p(10.45,5.72,2.4)],'sun',1.5);
},(H,R,t)=>{
  const u=((t%24)+24)%24,q=smooth(4.8,9.6,u)*(1-smooth(14.4,22,u));
  const S=(a,b)=>H.p(5.43+a*.69,2.19,2.47-b*.45);
  cutout(H,R,S,q,true);
  H.opacity(.12,()=>cutout(H,R,(a,b)=>{const p=S(a,b);return[p[0]+4,p[1]+2];},q,true));
  const P=(a,b)=>H.p(5.82+a*.67,5.71+b*.34,1.49-b*.084);
  const angle=1.02-1.83*q,hand=P(.43+Math.cos(angle)*1.21,.16+Math.sin(angle)*1.21),steady=H.p(7.02,6.75,1.37);
  animator(H,R,[hand[0]+2,hand[1]+2],steady,q);
  cutout(H,R,P,q,false);
  oval(H,R,hand[0]+2,hand[1]+2,2.2,1.8,'paper',1);
  const paper=H.p(3.94,6.37,1.35),s=Math.sin(u*Math.PI/12)*1.4;
  surface(H,R,[[paper[0]-9,paper[1]],[paper[0]+13,paper[1]-10],[paper[0]+21,paper[1]-3-s],[paper[0]-1,paper[1]+7]],'paper',1,.6);
  const thumb=[paper[0]+6,paper[1]+1];H.line(R,ell(...thumb,3,2),'coral',.6,{closed:true,tone:.42});
  const f=wallPt(H,'nw',9.27,1.21,-.31);stroke(H,R,[[f[0]-4,f[1]-7],[f[0]+s,f[1]+4],[f[0]+5,f[1]-5]],'blue',1.2);
});
room.loopSeconds=24;
room.stillTime=11.7;
export default room;
