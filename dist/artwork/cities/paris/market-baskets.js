import { world, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, surface, vessel, drape, benchFrame, bentTube, pendant, slattedSeat } from '../materials.js';
import { windowBay, hangingRail, floorShadow, caster, panelFront } from '../joinery.js';
import { masonry, cabinetFrame, archedBay } from '../structure.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, hands, shirt = 'teal', lean = 0) {
  const [x, y] = H.p(i, j, 0), c = [x + lean, y - 49];
  oval(H, R, x + 3, y + 2, 18, 5, 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [[x + s * 5, y - 27], [x + s * 7, y - 13], [x + s * 10, y]], 'blue', 7); oval(H, R, x + s * 10 + 2, y, 6, 2.6, 'blue', .9); }
  shape(H, R, [[c[0] - 10, c[1]], [c[0] + 10, c[1]], [x + 9, y - 23], [x - 9, y - 23]], shirt, .7);
  shape(H, R, [[c[0] - 4, c[1] + 4], [c[0] + 5, c[1] + 4], [x + 7, y - 21], [x - 7, y - 21]], 'paper', .95, .6);
  for (let n = 0; n < 2; n++) { const s = n ? 1 : -1, shoulder = [c[0] + s * 9, c[1] + 3], hand = hands[n]; stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], 'blue', 6.4); stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], shirt, 4.6); oval(H, R, ...hand, 3, 2.4, 'coral', .36); }
  oval(H, R, c[0] + 1, c[1] - 12, 8, 9, 'coral', .3);
  shape(H, R, [[c[0] - 7, c[1] - 13], [c[0] - 7, c[1] - 20], [c[0] + 5, c[1] - 22], [c[0] + 9, c[1] - 15], [c[0] + 1, c[1] - 17]], 'blue', .85);
  H.dot(c[0] + 5, c[1] - 11, .85, 'blue');
}
function produce(H,R,P,kind,count=9){
  for(let n=0;n<count;n++){const u=.17+(n%4)*.42+(n%2)*.06,v=.13+Math.floor(n/4)*.34,p=P(u,v,.15+Math.floor(n/4)*.09);if(kind==='carrot'){shape(H,R,[[p[0]-3,p[1]-6],[p[0]+4,p[1]-5],[p[0]+1,p[1]+9]],'coral',.8);for(const q of [-4,0,4])stroke(H,R,[[p[0],p[1]-5],[p[0]+q,p[1]-14]],'teal',1.2);}else if(kind==='leaf'){for(let q=0;q<4;q++){const a=q*1.7;shape(H,R,[[p[0],p[1]],[p[0]+Math.cos(a)*15,p[1]-9+Math.sin(a)*7],[p[0]+Math.cos(a)*13,p[1]+1],[p[0]+Math.cos(a)*6,p[1]+4]],'teal',.45+q*.12);}}else{oval(H,R,p[0],p[1],kind==='squash'?12:7,kind==='squash'?9:6,kind==='apple'?'coral':'sun',.76);stroke(H,R,[[p[0],p[1]-6],[p[0]+2,p[1]-10],[p[0]+5,p[1]-10]],'blue',1);}}
}
function hamper(H,R,i,j,z,w,d,kind){
  box(H,R,i,j,w,d,z,.35,'sun',.5);surface(H,R,H.tile(i+.07,j+.07,w-.14,d-.14,z+.37),'blue',.6);for(let n=0;n<10;n++)H.line(R,[H.p(i+n*w/10,j+d,z+.04),H.p(i+n*w/10,j+d,z+.35)],'blue',.65);for(const h of [.1,.24])H.line(R,[H.p(i,j+d,h+z),H.p(i+w,j+d,h+z)],'paper',.8);produce(H,R,(u,v,h)=>H.p(i+.1+u*(w-.2)/1.75,j+.1+v*(d-.2)/.91,z+.41+h),kind,kind==='squash'?3:10);H.outline(R,H.tile(i,j,w,d,z+.39),'sun',2.3);
}
const room=world('paris-market-baskets','The basket tilts toward you',{wall:'paper',wallTone:.7,height:3.7,head:70,floor:'paper',tone:.7},(H,R)=>{
  for(let i=0;i<12;i++)for(const j of [0,11]){surface(H,R,H.tile(i,j,1,1,.02),'teal',.17);surface(H,R,[H.p(i+.5,j+.14,.03),H.p(i+.84,j+.5,.03),H.p(i+.5,j+.84,.03),H.p(i+.16,j+.5,.03)],'coral',.32,.5);}
  windowBay(H,R,'ne',6.8,4.4,2.6,.9,{divisions:4});
  hangingRail(H,R,'nw',6.6,3.8,2.4,4,(P,u,n)=>{const q=P(u,-.2);if(n<2){shape(H,R,[[q[0]-9,q[1]],[q[0]+10,q[1]],[q[0]+13,q[1]+28],[q[0]-10,q[1]+26]],'paper',1);H.line(R,[[q[0]-5,q[1]+5],[q[0]+5,q[1]+21]],'coral',1);}else{stroke(H,R,[[q[0]-8,q[1]+7],[q[0]-6,q[1]-3],[q[0]+6,q[1]-3],[q[0]+8,q[1]+8]],'sun',2);oval(H,R,q[0],q[1]+13,12,7,'sun',.45);for(let k=0;k<4;k++)H.line(R,[[q[0]-8+k*5,q[1]+8],[q[0]-8+k*5,q[1]+18]],'blue',.6);}});

  for(const i of [.7,8.75]){timber(H,R,i,.7,.16,.16,0,4.25,'teal');timber(H,R,i,4.2,.16,.16,0,3.65,'teal');bentTube(H,R,[[i,.7,4.2],[i,4.2,3.65]],3,'teal');}
  const roof=[H.p(.5,.6,4.33),H.p(9,.6,4.33),H.p(9,4.5,3.6),H.p(.5,4.5,3.6)];surface(H,R,roof,'coral',.62,1.1);
  for(let n=0;n<7;n++){const i=.5+n*1.21;surface(H,R,[H.p(i,.6,4.34),H.p(i+.53,.6,4.34),H.p(i+.53,4.5,3.61),H.p(i,4.5,3.61)],'paper',.9,.4);}
  for(const i of [.6,4.75,8.9])H.line(R,[H.p(i,.7,4.4),H.p(i,4.5,3.62)],'blue',1);
  surface(H,R,[H.p(7.5,3.65,3.8),H.p(8.15,3.65,3.8),H.p(8.15,4.2,3.68),H.p(7.5,4.2,3.68)],'teal',.55);
  for(const i of [.65,8.9])stroke(H,R,[H.p(i,4.5,3.62),H.p(i+.14,4.63,2.9),H.p(i,4.67,2.8)],'sun',1.4);
  floorShadow(H,1.15,2.2,6,3.75,.2);
  for(const [i,j,w,d,z,kind] of [[1.1,2.15,2.1,1.4,1.7,'carrot'],[3.5,2.15,2.2,1.5,1.82,'leaf'],[5.95,2.15,2.05,1.4,1.55,'squash'],[1.1,4,2.1,1.5,1.12,'apple'],[3.55,4,2.1,1.5,1.27,'leaf']]){
    benchFrame(H,R,i,j,w,d,z,'sun');hamper(H,R,i+.05,j+.05,z+.03,w-.1,d-.1,kind);
    bentTube(H,R,[[i+.15,j+d-.1,.2],[i+w-.15,j+d-.1,z-.15]],2,'teal');
  }
  cabinetFrame(H,R,9,.45,2.5,2.4,.1,2.2,2,'teal',(x,j,w,d,z,h,n)=>{if(n===0){timber(H,R,x,j,w,d,1.1,.1,'sun');drape(H,R,x+.05,j+.1,w-.1,d-.2,1.22,.15,'paper');box(H,R,x+.1,j+.1,w-.2,d-.2,z,.5,'paper',.7);}else for(let q=0;q<3;q++){timber(H,R,x,j,w,d,.35+q*.5,.1,'sun');for(let k=0;k<4;k++)H.line(R,[H.p(x+.15+k*.2,j+d,.5+q*.5),H.p(x+.15+k*.2,j+d,.79+q*.5)],'sun',2);}});
  timber(H,R,8.9,.4,2.7,2.6,2.35,.15,'sun');
  hamper(H,R,9.15,.65,2.55,1.9,1.25,'apple');
  for(const i of [9.15,10.5]){caster(H,R,i,4.75);bentTube(H,R,[[i,4.75,.12],[i,3.6,1.85]],3,'teal');}for(const z of [.3,1.0])metal(H,R,9.1,4.3,1.55,.85,z,.08,'teal');
  bentTube(H,R,[[9.15,3.6,1.85],[10.5,3.6,1.85]],3,'teal');drape(H,R,9.2,4.2,1.15,.65,.43,.24,'paper');
  benchFrame(H,R,.8,8.3,2.8,1.3,1.12,'sun');vessel(H,R,1.4,8.7,1.15,14,8,'paper');vessel(H,R,2.5,8.9,1.15,9,21,'teal');timber(H,R,1.8,8.4,.45,.9,1.13,.07,'sun');
  const brush=H.p(2.9,8.7,1.21);H.line(R,[[brush[0]-8,brush[1]],[brush[0]+8,brush[1]-3]],'sun',4);for(let n=0;n<6;n++)H.line(R,[[brush[0]-7+n*2,brush[1]+1],[brush[0]-6+n*2,brush[1]+6]],'blue',.7);
  vessel(H,R,2.8,8.8,.1,15,20,'teal');
  benchFrame(H,R,8.7,9,1,1,.5,'coral');surface(H,R,[H.p(8.9,9.2,.51),H.p(9.3,9.15,.51),H.p(9.52,9.58,.51),H.p(9.1,9.72,.51)],'teal',.7,.6);
  benchFrame(H,R,5.15,5.8,2.2,1.75,1.32,'sun');
  for(const i of [5.28,7.12])bentTube(H,R,[[i,6.8,1.32],[i,5.83,1.82],[i,5.75,1.32]],3,'teal');
  drape(H,R,10.5,8.1,.7,1.35,.95,.7,'paper');bentTube(H,R,[[10.85,8.4,0],[10.85,8.4,1.33],[10.65,8.4,1.38]],3,'sun');
},(H,R,t)=>{
  const u=((t%24)+24)%24,f=ease(4.8,9.6,u)*(1-ease(14.4,22,u)),a=.12+f*.28;
  const P=(x,v,h=0)=>H.p(5.2+x,7.15-v*Math.cos(a),1.4+v*Math.sin(a)+h);
  surface(H,R,[P(0,0),P(2,0),P(2,1.45),P(0,1.45)],'blue',.6,1);
  surface(H,R,[P(0,0,-.24),P(2,0,-.24),P(2,0,.08),P(0,0,.08)],'sun',.6,.8);
  for(let n=0;n<10;n++)H.line(R,[P(n*.2,0,-.22),P(n*.2,0,.08)],'blue',.7);for(const h of [-.15,-.04])H.line(R,[P(0,0,h),P(2,0,h)],'paper',1);
  surface(H,R,[P(.08,.1,.02),P(1.92,.1,.02),P(1.92,1.35,.02),P(.08,1.35,.02)],'paper',1,.5);
  produce(H,R,(x,v,h)=>P(x,v,h),'apple',10);
  H.outline(R,[P(0,0,.12),P(2,0,.12),P(2,1.45,.12),P(0,1.45,.12)],'sun',3);
  for(const v of [.2,1.2])stroke(H,R,[P(2,v-.14),P(2.2,v-.14,.1),P(2.2,v+.14,.1),P(2,v+.14)],'blue',2);
  person(H,R,7.85,6.25,[P(2.12,.25,.12),P(2.12,1.18,.12)],'teal',-2);
  person(H,R,6.5,9.25,[H.p(6.1,9.2,.98),H.p(6.5,9.5,.7)],'coral');
  const bag=H.p(6.15,9.37,.75);surface(H,R,[[bag[0]-10,bag[1]-3],[bag[0]+8,bag[1]],[bag[0]+11,bag[1]+23],[bag[0]-11,bag[1]+19]],'paper',1);stroke(H,R,[[bag[0]-7,bag[1]],[bag[0]-5,bag[1]-11],[bag[0]+5,bag[1]-9],[bag[0]+7,bag[1]]],'teal',2);
  const hem=[];for(let n=0;n<=20;n++)hem.push(H.p(.5+n*.425,4.5,3.6-.09+Math.sin(n*.8+u/24*Math.PI*2)*.018));H.line(R,hem,'sun',2);
});
room.loopSeconds=24;
room.stillTime=12;
export default room;
