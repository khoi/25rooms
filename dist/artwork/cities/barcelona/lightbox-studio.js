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
  for(const j of [.2,10.91]){
    metal(H,R,.15,j,.23,.19,.1,3.85,'teal');
    metal(H,R,.11,j-.06,.31,.31,3.65,.27,'blue');
    H.dot(...H.p(.45,j+.11,3.8),1.5,'sun');
  }
  timber(H,R,.11,.14,.33,11.25,3.87,.17,'sun');
  timber(H,R,.15,.11,11.4,.31,3.87,.17,'sun');
  for(const x of [2.69,8.44]){
    bentTube(H,R,[[x,.17,3.87],[x,.58,3.77],[x,.81,3.5]],1.6,'teal');
    metal(H,R,x-.24,.68,.48,.29,3.34,.16,'teal');
    surface(H,R,H.tile(x-.18,.71,.36,.21,3.338),'sun',.7,.5);
    const light=H.p(x,.84,3.32);H.glow(...light,15,10,'sun',.16);
  }
  masonry(H,R,'nw',0,12,0,.7,'coral',.23);
  windowBay(H,R,'ne',7.66,3.62,1.06,2.52,{divisions:3,view:P=>{
    for(let n=0;n<5;n++){const x=.13+n*.68,h=.45+n%3*.19;surface(H,R,[P(x,.13),P(x+.56,.13),P(x+.56,h),P(x,h)],'blue',.23,.4);}
  }});
  timber(H,R,7.6,.22,3.75,.54,.93,.13,'paper');
  for(const i of [7.83,10.93])bentTube(H,R,[[i,.69,.99],[i,.22,.63]],1.7,'teal');
  cabinetFrame(H,R,8.99,.76,2.36,2.19,.07,1.12,2,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,.24,.08,'sun');
    if(n){for(let k=0;k<3;k++)surface(H,R,H.faceI(x+.08+k*.23,j+1.12,.17,.34,.91),k%2?'coral':'paper',.6,.6);}
    else {for(let k=0;k<3;k++)metal(H,R,x+.1,j+.18+k*.43,w-.17,.32,.36,.18,k%2?'paper':'teal');}
  });
  timber(H,R,8.93,.7,2.48,2.33,1.21,.13,'sun');
  for(const [i,j] of [[9.5,1.27],[10.73,1.76]]){
    const p=H.p(i,j,1.35);oval(H,R,...p,10,6,'blue',.66);oval(H,R,p[0],p[1]-7,8,5,'teal',.4);oval(H,R,p[0],p[1]-9,5,3,'paper',1);H.dot(p[0],p[1]-9,1.5,'blue');
  }
  surface(H,R,H.tile(9.24,2.3,1.18,.48,1.35),'paper',1,.65);
  H.line(R,[H.p(9.33,2.41,1.36),H.p(9.71,2.63,1.36),H.p(10.24,2.39,1.36)],'coral',1.3);
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
  surface(H,R,H.tile(.77,3.18,1.46,2.48,2.88),'teal',.57,.7);
  for(let n=0;n<5;n++)H.line(R,[H.p(.84+n*.29,3.29,2.9),H.p(.84+n*.29,5.55,2.9)],'paper',.55);
  for(let n=0;n<6;n++)H.line(R,[H.p(.86,3.32+n*.39,2.9),H.p(2.1,3.32+n*.39,2.9)],'paper',.55);
  surface(H,R,H.tile(.94,3.71,1.02,1.34,2.92),'paper',1,.65);
  H.line(R,[H.p(1.05,3.89,2.93),H.p(1.82,4.49,2.93),H.p(1.23,4.84,2.93)],'teal',1.2);
  timber(H,R,.81,6.08,1.31,.26,2.91,.12,'sun');
  for(let n=0;n<8;n++)H.line(R,[H.p(.9+n*.14,6.1,3.04),H.p(.9+n*.14,6.24,3.04)],'blue',.65);
  const scissors=H.p(1.89,5.74,2.91);
  for(const dx of [-3,4])H.line(R,ell(scissors[0]+dx,scissors[1],3,2),'coral',1.1,{closed:true});
  H.line(R,[[scissors[0]-1,scissors[1]],[scissors[0]+10,scissors[1]-12]],'blue',1.2);
  H.line(R,[[scissors[0]+3,scissors[1]],[scissors[0]+4,scissors[1]-14]],'blue',1.2);
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
  bentTube(H,R,[[7.72,2.12,3.37],[7.72,2.12,.12],[8.46,2.54,.08]],1.2,'blue');
  for(const x of [3.37,7.48])bentTube(H,R,[[x,2.15,1.01],[x,3.1,.12]],1.6,'teal');
  benchFrame(H,R,3.18,4.35,5.41,2.89,.97,'sun');
  surface(H,R,[H.p(3.41,4.52,.99),H.p(3.41,4.52,1.67),H.p(3.41,6.99,1.07),H.p(3.41,6.99,.99)],'teal',.65,.8);
  surface(H,R,[H.p(8.27,4.52,.99),H.p(8.27,4.52,1.67),H.p(8.27,6.99,1.07),H.p(8.27,6.99,.99)],'blue',.71,.8);
  timber(H,R,3.45,4.66,4.67,1.64,.43,.1,'teal');
  for(const j of [4.89,5.36,5.83]) {
    surface(H,R,H.tile(3.75,j,2.7,.34,.55),'paper',1,.55);
    H.line(R,[H.p(3.79,j+.18,.57),H.p(6.37,j+.18,.57)],'sun',2.4);
  }
  metal(H,R,6.88,5.01,.76,.9,.55,.26,'blue');
  H.line(R,[H.p(7.06,5.91,.7),H.p(7.49,5.91,.7)],'coral',2.2);
  for(const x of [3.52,8.11])metal(H,R,x,4.45,.21,.36,1.44,.2,'teal');
  surface(H,R,[H.p(3.41,4.52,1.69),H.p(8.27,4.52,1.69),H.p(8.27,6.99,1.08),H.p(3.41,6.99,1.08)],'blue',.68,1);
  surface(H,R,[H.p(3.56,4.66,1.71),H.p(8.12,4.66,1.71),H.p(8.12,6.81,1.18),H.p(3.56,6.81,1.18)],'sun',.22,.7);
  surface(H,R,[H.p(3.72,4.77,1.72),H.p(7.99,4.77,1.72),H.p(7.99,6.68,1.25),H.p(3.72,6.68,1.25)],'paper',1,.55);
  surface(H,R,[H.p(3.42,6.99,1.08),H.p(8.28,6.99,1.08),H.p(8.28,6.99,.9),H.p(3.42,6.99,.9)],'teal',.66,.7);
  for(const i of [3.64,8.02])bentTube(H,R,[[i,4.66,.99],[i,5.79,1.44],[i,6.54,.99]],2,'teal');
  for(const x of [3.64,4.15]) {
    const p=H.p(x,7.015,1);oval(H,R,...p,2.4,2.1,'sun',.8);H.line(R,[[p[0]-1,p[1]],[p[0]+1,p[1]]],'blue',.7);
  }
  for(let n=0;n<5;n++)H.line(R,[H.p(7.75+n*.06,6.99,.94),H.p(7.75+n*.06,6.99,1.04)],'paper',.8);
  metal(H,R,4.12,6.71,3.55,.08,1.28,.06,'teal');
  for(const x of [4.34,5.84,7.34])H.dot(...H.p(x,6.75,1.37),2.1,'sun',1,{knock:true});
  metal(H,R,8.4,4.48,.16,.18,.99,2.45,'blue');
  bentTube(H,R,[[8.48,4.57,3.32],[7.95,4.74,3.32],[6.42,5.58,3.12]],3.2,'blue');
  for(const p of [[8.48,4.57,3.31],[7.95,4.74,3.31]]){oval(H,R,...H.p(...p),4.5,4,'sun',.75);H.dot(...H.p(...p),1.3,'blue');}
  metal(H,R,6.18,5.37,.78,.63,2.88,.31,'blue');
  metal(H,R,6.86,5.46,.18,.28,2.96,.18,'teal');
  for(let n=0;n<4;n++)H.line(R,[H.p(6.94,5.47+n*.07,3.16),H.p(7.03,5.47+n*.07,3.16)],'paper',.8);
  H.line(R,[H.p(6.22,5.4,3.2),H.p(6.58,5.4,3.2)],'sun',1.7);
  const cam=H.p(6.52,5.79,2.87);oval(H,R,...cam,7,4,'blue',.8);oval(H,R,...cam,4.4,2.4,'teal',.38);
  H.line(R,[H.p(8.41,4.57,3.29),H.p(8.42,4.61,1.04),H.p(8.14,6.3,.97),H.p(8.69,6.37,.31)],'blue',.95);
  taskLight(H,R,4.21,3.39,1.15,'sun',.83);
  const gl=H.p(5.77,5.93,1.37);H.glow(...gl,92,46,'sun',.34);
  benchFrame(H,R,1.55,9.38,4.66,1.42,.79,'teal');
  timber(H,R,1.68,9.55,4.32,1.08,.25,.11,'sun');
  for(let n=0;n<3;n++){
    surface(H,R,H.tile(1.86+n*1.25,9.74,1.09,.78,.38),'paper',1,.6);
    surface(H,R,H.faceI(1.86+n*1.25,10.53,1.09,.38,.63),'teal',.52,.6);
    H.line(R,[H.p(2.14+n*1.25,10.55,.5),H.p(2.65+n*1.25,10.55,.5)],'sun',1.9);
  }
  surface(H,R,H.tile(1.73,9.5,2.5,1.1,.8),'paper',1,.7);
  const hand=H.p(2.45,9.99,.82);surface(H,R,[[hand[0]-5,hand[1]],[hand[0]+4,hand[1]],[hand[0]+6,hand[1]-4],[hand[0]+4,hand[1]-6],[hand[0]+1,hand[1]-3],[hand[0]-1,hand[1]-9],[hand[0]-4,hand[1]-8]],'paper',1,.6);
  H.dot(hand[0]-2,hand[1]-1,1.1,'sun');
  const shoe=H.p(3.56,10.11,.82);shape(H,R,[[shoe[0]-6,shoe[1]],[shoe[0]+7,shoe[1]],[shoe[0]+8,shoe[1]-4],[shoe[0]+1,shoe[1]-6],[shoe[0]-5,shoe[1]-5]],'coral',.54,.6);
  for(let n=0;n<3;n++)H.line(R,[[shoe[0]-4+n*2,shoe[1]-4],[shoe[0]-3+n*2,shoe[1]-1]],'paper',.55);
  for(const [i,j] of [[4.66,9.83],[5.58,10.14]]) {const p=H.p(i,j,.82);oval(H,R,...p,5,3,'sun',.65);H.dot(...p,1.4,'blue');}
  bentTube(H,R,[[4.37,10.43,.82],[5.07,10.49,.84],[5.62,10.4,.82]],1.1,'blue');
  for(const x of [1.71,4.29,6.08])metal(H,R,x,9.4,.07,1.36,.79,.15,'teal');
  metal(H,R,1.69,9.39,4.47,.07,.79,.15,'teal');
  for(const j of [9.92,10.38])metal(H,R,4.35,j,1.67,.045,.8,.12,'teal');
  for(const [i,j] of [[4.67,10.38],[5.37,9.94]]){const p=H.p(i,j,.84);oval(H,R,...p,5,4,'paper',1);H.dot(p[0]+1,p[1]-1,1,'blue');}
  bentTube(H,R,[[8.68,6.37,.15],[8.76,7.6,.07],[7.97,8.22,.07],[7.33,8.45,.07]],1.4,'blue');
  metal(H,R,6.94,8.14,.67,.67,.08,.14,'blue');
  surface(H,R,[H.p(6.98,8.2,.24),H.p(7.57,8.2,.24),H.p(7.57,8.71,.16),H.p(6.98,8.71,.16)],'teal',.54,.7);
  for(let n=0;n<5;n++)H.line(R,[H.p(7.02+n*.105,8.27,.25),H.p(7.02+n*.105,8.62,.2)],'paper',.6);
  for(const x of [7.21,7.91])for(const j of [10.09,10.79])bentTube(H,R,[[x,j,.05],[x,j,.68]],2,'teal');
  cushion(H,R,7.1,10.01,.93,.89,.69,.16,'coral');
  surface(H,R,[H.p(7.17,10.06,.87),H.p(7.79,10.06,.87),H.p(7.79,10.92,.84),H.p(7.79,10.96,.36),H.p(7.45,10.96,.35),H.p(7.43,10.79,.84),H.p(7.17,10.79,.84)],'teal',.5,.7);
  H.line(R,[H.p(7.55,10.11,.88),H.p(7.55,10.86,.88),H.p(7.62,10.96,.4)],'sun',1.1);
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
