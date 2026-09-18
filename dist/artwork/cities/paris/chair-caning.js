import { world, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, surface, vessel, drape, benchFrame, bentTube, pendant, slattedSeat } from '../materials.js';
import { windowBay, hangingRail, floorShadow, caster, panelFront } from '../joinery.js';
import { masonry, cabinetFrame, archedBay } from '../structure.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, hands, shirt = 'teal', lean = 0, stride = 0) {
  const [x, y] = H.p(i, j, 0), c = [x + lean, y - 49];
  oval(H, R, x + 3, y + 2, 18, 5, 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [[x + s * 5, y - 27], [x + s * 7 + stride*s, y - 13], [x + s * 10 + stride*s, y-Math.abs(stride)*.25]], 'blue', 7); oval(H, R, x + s * 10 + 2+stride*s, y-Math.abs(stride)*.25, 6, 2.6, 'blue', .9); }
  shape(H, R, [[c[0] - 10, c[1]], [c[0] + 10, c[1]], [x + 9, y - 23], [x - 9, y - 23]], shirt, .7);
  shape(H, R, [[c[0] - 4, c[1] + 4], [c[0] + 5, c[1] + 4], [x + 7, y - 21], [x - 7, y - 21]], 'paper', .95, .6);
  for (let n = 0; n < 2; n++) { const s = n ? 1 : -1, shoulder = [c[0] + s * 9, c[1] + 3], hand = hands[n]; stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], 'blue', 6.4); stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], shirt, 4.6); oval(H, R, ...hand, 3, 2.4, 'coral', .36); }
  oval(H, R, c[0] + 1, c[1] - 12, 8, 9, 'coral', .3);
  shape(H, R, [[c[0] - 7, c[1] - 13], [c[0] - 7, c[1] - 20], [c[0] + 5, c[1] - 22], [c[0] + 9, c[1] - 15], [c[0] + 1, c[1] - 17]], 'blue', .85);
  H.dot(c[0] + 5, c[1] - 11, .85, 'blue');
}
function panel(H,R,P,w=2.45,d=1.75){
  surface(H,R,[P(0,0),P(w,0),P(w,d),P(0,d)],'sun',.32,.8);
  for(let n=0;n<18;n++){const x=n*w/18;H.line(R,[P(x,.04),P(x,d-.04)],'sun',1.2);}
  for(let n=0;n<13;n++){const y=n*d/13;H.line(R,[P(.04,y),P(w-.04,y)],n===6?'teal':'blue',n===6?1.5:.65,{tone:.65});}
  for(let n=-10;n<20;n++){const q=n*.25,a=Math.max(0,-q),b=Math.min(d,w-q);if(b>a)H.line(R,[P(q+a,a),P(q+b,b)],'paper',.7);}
  H.outline(R,[P(0,0),P(w,0),P(w,d),P(0,d)],'sun',4);
}
const room=world('paris-chair-caning','A seat worth keeping',{wall:'paper',wallTone:.74,height:3.65,head:32,floor:'paper',tone:.68},(H,R)=>{
  for(let i=0;i<12;i+=1.4)for(let j=0;j<12;j+=1.3)H.outline(R,H.tile(i+.015,j+.015,1.36,1.26,.025),'blue',.6,{tone:.35});
  masonry(H,R,'nw',.1,11.7,0,.78,'teal',.35);
  windowBay(H,R,'nw',1.5,4.2,1.2,2.1,{divisions:3});
  for(const j of [.4,7.0,11.5]){timber(H,R,.3,j,.24,.24,0,3.65,'sun');bentTube(H,R,[[.4,j,3.65],[2.9,j,3.24]],4,'sun');}
  bentTube(H,R,[[.17,11.3,3.6],[.17,11.3,.4],[.7,11.3,.1]],3.2,'teal');
  metal(H,R,.1,10.25,.65,.9,.01,.03,'blue');for(let n=0;n<5;n++)H.line(R,[H.p(.15,10.35+n*.15,.05),H.p(.67,10.35+n*.15,.05)],'paper',1);
  cabinetFrame(H,R,7.9,.35,3.7,1.25,.1,3.4,3,'sun',(x,j,w,d,z,h,n)=>{if(n<2){for(let q=0;q<4;q++){const i=x+.12+q*.23;timber(H,R,i,j+d-.3,.11,.19,.25,2.52+(q%2)*.42,'sun');bentTube(H,R,[[i,j+d-.3,2.7],[i+.15,j+d-.3,3.03],[i+.37,j+d-.3,3.1]],2.2,'sun');}}else{for(const zz of [.25,1.15,2.15]){timber(H,R,x,j,w,d,zz,.08,'sun');for(let q=0;q<3;q++)box(H,R,x+.05+q*.29,j+.1,.24,1.0,zz+.1,.2,q%2?'coral':'teal',.55);}}});
  timber(H,R,7.75,.25,3.98,1.46,3.6,.13,'sun');
  const curve=H.p(9.2,1.2,3.8);stroke(H,R,[[curve[0]-27,curve[1]+2],[curve[0]-26,curve[1]-19],[curve[0]-10,curve[1]-31],[curve[0]+13,curve[1]-29],[curve[0]+26,curve[1]-12]],'blue',5);stroke(H,R,[[curve[0]-27,curve[1]+2],[curve[0]-26,curve[1]-19],[curve[0]-10,curve[1]-31],[curve[0]+13,curve[1]-29],[curve[0]+26,curve[1]-12]],'sun',3);
  for(let n=0;n<4;n++){const p=H.p(6.9,1.0+n*.7,2.95);stroke(H,R,[[p[0]-10,p[1]],[p[0]-10,p[1]+19],[p[0]+8,p[1]+19],[p[0]+8,p[1]+2]],'teal',3);H.line(R,[[p[0]-13,p[1]+5],[p[0]+12,p[1]+5]],'blue',2);}
  hangingRail(H,R,'ne',1.2,4.8,2.75,3,(P,u,n)=>{if(n===0){panel(H,R,(x,y)=>P(u-.55+x*.45,-.15-y*.45),2.2,1.6);}else{const a=P(u,-.2);stroke(H,R,[[a[0]-10,a[1]],[a[0]-17,a[1]+19],[a[0]+4,a[1]+23],[a[0]+11,a[1]+14]],'sun',4);H.line(R,[[a[0]-5,a[1]+2],[a[0]+5,a[1]+18]],'teal',2);}});
  floorShadow(H,2.5,4.2,5.6,3.8,.25);
  for(const i of [3.2,6.6]){timber(H,R,i,4.5,.27,2.9,.05,.84,'teal');timber(H,R,i-.22,4.37,.71,3.15,.8,.16,'sun');drape(H,R,i-.15,4.75,.57,1.85,1.0,.2,'paper');}
  for(const j of [4.64,6.65])timber(H,R,3.35,j,3.3,.19,.29,.18,'sun');
  for(const j of [4.52,6.6]){timber(H,R,3.65,j,3.03,.2,1.18,.25,'sun');H.line(R,[H.p(3.84,j+.04,1.46),H.p(6.51,j+.04,1.46)],'blue',1);}
  for(const i of [3.66,6.48]){timber(H,R,i,4.62,.2,2.13,1.18,.25,'sun');H.line(R,[H.p(i+.1,4.75,1.46),H.p(i+.1,6.52,1.46)],'blue',1);}
  for(const [i,j] of [[3.67,4.55],[6.5,4.55],[3.67,6.6],[6.5,6.6]]){
    bentTube(H,R,[[i,j,1.28],[i+.28,j+.13,1.86],[i+.44,j+.18,2.22]],6,'sun');
    metal(H,R,i-.03,j-.04,.2,.17,1.28,.12,'teal');
  }
  bentTube(H,R,[[3.99,4.66,2.0],[6.82,4.66,2.0]],3,'sun');
  for(const i of [3.7,6.5]){bentTube(H,R,[[i,6.7,1.35],[i,8.3,1.64],[i,8.75,2.06]],5,'sun');}
  bentTube(H,R,[[3.7,8.75,2.06],[4.25,8.9,2.4],[6.1,8.9,2.4],[6.5,8.75,2.06]],5,'sun');
  for(const i of [4.15,4.72,5.29,5.87])bentTube(H,R,[[i,7.8,1.63],[i,8.75,2.22]],2.7,'sun');
  const splice=H.p(6.83,4.73,2.08);H.line(R,[[splice[0]-6,splice[1]-4],[splice[0]+5,splice[1]+4]],'teal',5);H.line(R,[[splice[0]-5,splice[1]-5],[splice[0]+6,splice[1]+3]],'paper',.9);
  metal(H,R,3.02,5.2,.22,.85,1.02,.21,'blue');bentTube(H,R,[[2.84,5.53,1.25],[3.67,5.53,1.25]],2.6,'sun');bentTube(H,R,[[2.84,5.53,1.05],[2.84,5.53,1.5]],3,'sun');
  benchFrame(H,R,.6,7.8,1.95,2.65,1.03,'sun');
  vessel(H,R,1.1,8.55,1.05,10,6,'paper');drape(H,R,.74,8.1,.58,.66,1.08,.25,'paper');
  const mallet=H.p(1.5,9.5,1.08);H.line(R,[[mallet[0]-9,mallet[1]+4],[mallet[0]+9,mallet[1]-9]],'sun',3);H.line(R,[[mallet[0]+2,mallet[1]-15],[mallet[0]+16,mallet[1]-5]],'teal',7);
  vessel(H,R,1.7,8.3,1.06,7,4,'teal');const ring=H.p(1.8,8.8,1.1);H.outline(R,ell(...ring,6,3),'sun',2.5);
  for(let n=0;n<5;n++)H.line(R,[H.p(.9+n*.2,10.1,1.07),H.p(.92+n*.2,9.55,1.07)],n===2?'teal':'sun',1.4);
  benchFrame(H,R,8.5,8.1,2.8,2.2,.7,'teal');drape(H,R,8.64,8.24,2.45,1.9,.73,.22,'paper');
  slattedSeat(H,R,9.0,5.1,2,.03,'sun',.5);
  const button=H.p(4.0,5.0,.04);oval(H,R,...button,3.5,2.2,'coral',.8);H.dot(button[0]-1,button[1],.6,'paper');H.dot(button[0]+1,button[1],.6,'paper');
  for(const i of [10,10.8]){timber(H,R,i,10.8,.09,.09,0,.65,'sun');timber(H,R,i,11.3,.09,.09,0,.65,'sun');}timber(H,R,9.95,10.75,.98,.67,.63,.1,'sun');bentTube(H,R,[[10,10.8,.65],[10,10.75,1.32],[10.8,10.8,1.27],[10.8,10.8,.65]],2.4,'sun');
},(H,R,t)=>{
  const u=((t%20)+20)%20,f=ease(4,8,u)*(1-ease(12,17,u)),lift=ease(0,3,u)*(1-ease(17,18,u));
  const i=8.7-f*4.83,j=8.27-f*3.49,z=.79+f*.7+lift*(1-f)*.55;
  panel(H,R,(x,y)=>H.p(i+x,j+y,z));
  const workerI=i+2.68,workerJ=j+.78;
  person(H,R,workerI,workerJ,[H.p(i+2.38,j+.13,z+.03),H.p(i+2.38,j+1.53,z+.03)],'teal',-3,Math.sin(f*Math.PI*6)*4);
  person(H,R,9.8,6.35,[H.p(9.6,6.5,1.05),H.p(10.0,6.6,.8)],'coral',Math.sin(u/20*Math.PI*2)*1.1);
  const strip=H.p(1.25,8.46,1.12);stroke(H,R,[strip,[strip[0]+9,strip[1]+5+Math.sin(u/20*Math.PI*2)*1.1],[strip[0]+18,strip[1]+2]],'paper',1.5);
});
room.loopSeconds=20;
room.stillTime=7;
export default room;
