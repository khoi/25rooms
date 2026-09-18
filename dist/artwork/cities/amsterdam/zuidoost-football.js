import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, slattedSeat, drape, cushion } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { hangingRail, caster } from '../joinery.js';

const T=16;
const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const motion=t=>{const u=((t%T)+T)%T;return {u,reach:ease(3.2,6.4,u)*(1-ease(9.6,14,u)),pull:ease(6.4,7.8,u)*(1-ease(8.6,9.6,u))};};
const rest={x:0,y:0,drop:0,lean:0,head:0,al:20,ar:25,el:30,er:30,ll:-5,lr:5,kl:0,kr:0,roll:0};
for(const name of ['amsterdamFootballVolunteer','amsterdamFootballPlayer'])FIGURES.clips[name]={dur:T,keys:[[0,{...rest}],[1,{...rest}]]};
function person(H,R,t,i,j,clip,targets,opts){
  const s=1.7,[x,y]=H.p(i,j),q={...rest,head:motion(t).pull*9};
  for(const [side,tip] of Object.entries(targets)){const sx=x+(side==='l'?-5.2:5.2)*s,sy=y-32.5*s,dx=(tip[0]-sx)/s,dy=(tip[1]-sy)/s,a=4.368,b=4.2,c=Math.max(.3,Math.min(a+b-.001,Math.hypot(dx,dy))),el=Math.acos((c*c-a*a-b*b)/(2*a*b));q['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(el),a+b*Math.cos(el)))*180/Math.PI;q['e'+side]=el*180/Math.PI;}
  FIGURES.clips[clip].keys=[[0,q],[1,q]];actor(H,R,i,j,t,clip,opts,0,s);
}
function ball(H,R,i,j,z,r=10,ink='paper'){
  const [x,y]=H.p(i,j,z);oval(H,R,x,y,r,r*.9,ink,1);shape(H,R,Array.from({length:5},(_,k)=>[x+Math.cos(k*TAU/5-.9)*r*.35,y+Math.sin(k*TAU/5-.9)*r*.35]),'teal',.7,.5);
  for(let k=0;k<5;k++){const a=k*TAU/5-.9;stroke(H,R,[[x+Math.cos(a)*r*.35,y+Math.sin(a)*r*.35],[x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.8],[x+Math.cos(a+.3)*r*.96,y+Math.sin(a+.3)*r*.87]],'blue',.6);}
}
function boot(H,R,i,j,z,color='blue'){
  const [x,y]=H.p(i,j,z);shape(H,R,[[x-8,y],[x+9,y],[x+11,y-4],[x+4,y-6],[x+1,y-13],[x-6,y-14],[x-8,y-8]],color,.65,.6);H.line(R,[[x-7,y+1],[x+9,y+1]],'paper',1.8);for(let n=0;n<3;n++)H.line(R,[[x-3+n*2,y-8+n],[x+2+n*2,y-10+n]],'sun',.6);
}
const room=world('amsterdam-zuidoost-football','The knot waits at the corner',{floor:'paper',tone:.9,wall:false,head:45},(H,R)=>{
  masonry(H,R,'ne',0,12,0,3.85,'teal',.22);masonry(H,R,'nw',0,9.3,0,3.15,'paper',1);
  for(let j=.3;j<12;j+=1.1)for(let i=(j%2)*.2;i<12;i+=1.4)H.outline(R,H.tile(i,j,1.32,1.01,.014),'blue',.5,{tone:.34});
  for(const i of [.3,10.9])metal(H,R,i,.4,.18,.18,0,4.65,'teal');metal(H,R,.16,.3,11.1,.3,4.47,.32,'teal');
  for(let i=.4;i<11;i+=1.8){H.line(R,[H.p(i,.61,4.51),H.p(i+.85,.61,4.72)],'blue',1.4);H.dot(...H.p(i,.62,4.6),1.5,'sun');}
  bentTube(H,R,[[11.12,.45,4.55],[11.65,.45,4.55],[11.65,.45,.4],[11.3,.85,.2]],3,'blue');
  metal(H,R,10.5,.85,1.35,.7,.015,.045,'blue');for(let n=0;n<7;n++)H.line(R,[H.p(10.61+n*.17,.92,.064),H.p(10.61+n*.17,1.49,.064)],'paper',1);
  cabinetFrame(H,R,6.3,.4,4.3,1.65,.1,3.25,3,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+1.08,.1,'sun');timber(H,R,x,j,w,d,z+2.18,.1,'sun');
    if(n===0){for(let k=0;k<2;k++)ball(H,R,x+.38+k*.6,j+.58,z+.37,10,'paper');for(let k=0;k<3;k++)boot(H,R,x+.18+k*.36,j+.82,z+1.29,k===1?'coral':'blue');shape(H,R,[H.p(x+.2,j+.35,z+2.3),H.p(x+1.02,j+.35,z+2.3),H.p(x+.72,j+.35,z+2.98),H.p(x+.44,j+.35,z+2.98)],'sun',.7);}
    else if(n===1){for(let k=0;k<4;k++){const [cx,cy]=H.p(x+.23+k*.23,j+.66,z+.18);shape(H,R,[[cx-7,cy],[cx+7,cy],[cx+2,cy-19],[cx-2,cy-19]],k%2?'coral':'sun',.7,.5);oval(H,R,cx,cy,8,3,'coral',.8);}drape(H,R,x+.1,j+.2,w-.2,.7,z+1.33,.21,'paper');metal(H,R,x+.1,j+.2,w-.2,.9,z+2.3,.32,'coral');}
    else{for(let k=0;k<3;k++)timber(H,R,x+.1,j+.12,w-.2,.95,z+.16+k*.22,.15,'sun');for(let k=0;k<3;k++){const [px,py]=H.p(x+.3+k*.28,j+.65,z+1.3);oval(H,R,px,py,4,10,'paper',1);H.line(R,[[px,py-7],[px+2,py+5]],'coral',1);}for(let k=0;k<4;k++)H.line(R,[H.p(x+.1+k*.27,j+.4,z+2.3),H.p(x+.1+k*.27,j+.4,z+2.93)],'paper',2);}
  });
  timber(H,R,7.3,.5,2.1,1.2,3.4,.08,'sun');shape(H,R,H.tile(7.38,.58,1.94,1.04,3.49),'teal',.72,.5);H.outline(R,H.tile(7.5,.7,1.69,.8,3.51),'paper',.8);H.line(R,[H.p(8.34,.71,3.52),H.p(8.34,1.49,3.52)],'paper',.8);oval(H,R,...H.p(8.34,1.1,3.53),5,2.5,'teal',.6);
  hangingRail(H,R,'nw',1.15,4.5,2.75,4,(P,u,n)=>{shape(H,R,[P(u-.26,-.12),P(u-.1,-.2),P(u+.1,-.2),P(u+.26,-.12),P(u+.43,-.3),P(u+.29,-.4),P(u+.26,-.93),P(u-.26,-.93),P(u-.29,-.4),P(u-.43,-.3)],n%2?'coral':'sun',.62,.7);H.line(R,[P(u-.22,-.84),P(u+.22,-.84)],'paper',1.1);});
  for(const j of [1.4,2.8,4.1]){metal(H,R,.13,j,.3,.25,.7,.07,'teal');const [x,y]=H.p(.38,j,.85);stroke(H,R,[[x,y],[x+3,y-10],[x+8,y-13],[x+13,y-9]],'coral',2);}
  slattedSeat(H,R,1.2,7.9,4.65,0,'sun',.65);cushion(H,R,4.49,8.14,.94,.52,.76,.1,'teal');
  boot(H,R,2.1,8.84,.1);boot(H,R,2.69,8.81,.1,'coral');stroke(H,R,[H.p(2.1,8.84,.22),H.p(2.28,8.98,.32),H.p(2.47,8.94,.22),H.p(2.69,8.81,.22)],'sun',1.3);
  drape(H,R,1.7,7.96,1.15,.59,.83,.43,'coral');
  for(const i of [3.6,5.2,7.75])metal(H,R,i,4.85,.65,1.8,.05,.16,'blue');
  bentTube(H,R,[[3.8,4.97,.19],[3.8,4.97,2.85],[7.94,4.97,2.85],[7.94,4.97,.2]],6,'paper');
  bentTube(H,R,[[3.8,4.97,2.85],[3.8,3.9,.2],[7.94,3.9,.2],[7.94,4.97,2.85]],3,'teal');
  for(let n=0;n<=12;n++){const i=3.8+n*4.14/12;stroke(H,R,[H.p(i,4.97,2.81),H.p(i,4.74,1.42),H.p(i,3.91,.22)],'coral',.7,.6);}
  for(let n=0;n<=8;n++){const h=.25+n*.32,j=3.91+(h-.25)/2.56*1.04;stroke(H,R,[H.p(3.8,j,h),H.p(5.9,j-.08,h-.06),H.p(7.94,j,h)],'coral',.7,.6);}
  metal(H,R,3.69,4.83,.23,.29,2.65,.25,'teal');metal(H,R,7.83,4.83,.23,.29,2.65,.25,'teal');
  bentTube(H,R,[[5.17,4.98,.24],[5.17,4.98,1.89]],3.2,'paper');
  bentTube(H,R,[[5.17,5.02,1.74],[5.17,5.28,1.74],[5.17,5.3,1.84]],1.5,'blue');
  for(let n=0;n<4;n++)H.line(R,[H.p(5.27+n*.22,4.89,1.84),H.p(5.27+n*.22,4.69,1.29)],'sun',1.3);
  H.line(R,[H.p(.8,10.9,.018),H.p(8.7,10.9,.018),H.p(8.7,7.3,.018)],'paper',5);H.line(R,[H.p(.8,10.9,.02),H.p(8.7,10.9,.02),H.p(8.7,7.3,.02)],'teal',1);
  metal(H,R,9.0,6.5,1.6,1.55,.17,.07,'teal');for(const i of [9.1,10.4])for(const j of [6.65,7.84])caster(H,R,i,j);bentTube(H,R,[[9.0,7.95,.25],[9.0,7.95,1.45],[10.6,7.95,1.45],[10.6,7.95,.25]],2.7);ball(H,R,9.55,7.2,.68,15);ball(H,R,10.1,7.3,.48,12,'sun');
  for(let n=0;n<5;n++)H.line(R,[H.p(9.0+n*.4,6.6,.26),H.p(9.0+n*.4,6.6,.95)],'paper',1.2);
  timber(H,R,8.88,9.17,2.2,1.16,.06,.17,'sun');shape(H,R,H.tile(9.03,9.26,1.83,.94,.24),'paper',1,.6);const [kx,ky]=H.p(9.62,9.73,.26);stroke(H,R,[[kx-22,ky],[kx-4,ky-7],[kx+8,ky+2],[kx-5,ky+6],[kx-12,ky-3],[kx+22,ky-2]],'coral',2.8);H.line(R,[[kx-3,ky-4],[kx+5,ky+2]],'sun',1.4);
  for(let n=0;n<3;n++){const [x,y]=H.p(10.8,9.38+n*.23,.28);oval(H,R,x,y,4,2,'teal',.7);}
},(H,R,t)=>{
  const {reach,pull}=motion(t),hook=H.p(5.17,5.28,1.8),resting=H.p(4.97,5.66,1.41),x=resting[0]+(hook[0]-resting[0])*reach,y=resting[1]+(hook[1]-resting[1])*reach+pull*2;
  stroke(H,R,[H.p(5.7,4.86,1.72),[x+11,y+14],[x+3,y+6]],'sun',1.7);H.outline(R,ell(x,y,5.4,8), 'coral',1.7);H.outline(R,ell(x+1,y,3.3,5.8),'sun',.6);
  person(H,R,t,5.0,5.7,'amsterdamFootballVolunteer',{r:[x+3,y+6],l:H.p(4.76,5.46,1.34)},{shirt:['coral',.7],pants:['blue',.65],hairStyle:'bun'});
  person(H,R,t,8.31,5.18,'amsterdamFootballPlayer',{l:H.p(7.95,4.99,1.62),r:H.p(8.04,5.02,1.28)},{shirt:['sun',.72],pants:['teal',.7],skin:['coral',.62],hairStyle:'curly'});
  const [bx,by]=H.p(1.0,2.6,2.15),sway=Math.sin(t/16*TAU)*2;stroke(H,R,[[bx,by-13],[bx+sway,by+1],[bx+9+sway,by+4]],'paper',1.6);
});
room.loopSeconds=T;room.stillTime=8;
export default room;
