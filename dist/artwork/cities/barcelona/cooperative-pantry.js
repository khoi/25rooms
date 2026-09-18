import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
import { windowBay, wallRack, caster, panelFront, hangingRail } from '../joinery.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };

function person(H, R, i, j, hands, ink = 'teal', lean = 0) {
  const [x, y] = H.p(i, j), P = (a, b) => [x + a * 1.1 + lean, y + b * 1.18];
  H.tint(ell(x + 4, y + 2, 17, 5), 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [P(s * 5, -28), P(s * 7, -14), [x + s * 8, y - 2]], 'blue', 7); oval(H, R, x + s * 8 + 2, y - 1, 6, 2.5, 'blue'); }
  shape(H, R, [P(-10, -49), P(9, -49), P(12, -26), P(-10, -26)], ink, .75);
  shape(H, R, [P(-5, -46), P(5, -46), P(7, -26), P(-6, -26)], 'paper', .8, .7);
  for (let n = 0; n < 2; n++) { const a = P(n ? 9 : -9, -46), b = hands[n]; stroke(H, R, [a, [(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 5], b], ink, 6); oval(H, R, ...b, 2.5, 2.2, 'coral', .35); }
  oval(H, R, ...P(0, -60), 9, 11, 'paper', 1);
  shape(H, R, [P(-9, -61), P(-8, -70), P(1, -74), P(9, -69), P(10, -63), P(3, -67), P(-4, -65)], 'blue', .8);
  H.dot(...P(4, -59), 1, 'blue'); stroke(H, R, [P(3, -54), P(6, -53), P(8, -55)], 'blue', .6);
}

function jar(H, R, i, j, z, r = 9, h = 20, lid = 'teal', full = false) {
  const [x, y] = H.p(i, j, z);
  const q = [[x-r,y-2],[x+r,y-2],[x+r,y-h+4],[x+r-3,y-h],[x-r+3,y-h],[x-r,y-h+4]];
  shape(H, R, q, 'paper', 1, .7);
  H.tint(q, 'teal', .1);
  if (full) { H.clip(q, () => { H.fill([[x-r,y-2],[x+r,y-2],[x+r,y-h*.65],[x-r,y-h*.65]], 'sun', .65); for (let n=0;n<13;n++) H.dot(x-r+3+(n*7)%(r*2-5),y-3-((n*11)%(h*.55)),1.25,'coral',.5); }); }
  oval(H, R, x, y-h, r-2, 2.5, lid, .65);
  H.line(R, [[x-r+3,y-h+5],[x-r+3,y-5]], 'paper', 2.2);
  H.line(R, [[x-r+1,y-3],[x+r-1,y-3]], 'blue', .55, {tone:.35});
}

function sack(H, R, i, j, z, ink = 'paper', patch = false) {
  const [x,y]=H.p(i,j,z), q=[[x-16,y],[x+15,y],[x+18,y-27],[x+10,y-35],[x-9,y-35],[x-18,y-25]];
  shape(H,R,q,ink,ink==='paper'?1:.6); stroke(H,R,[[x-10,y-31],[x,y-27],[x+10,y-31]],'blue',.7);
  stroke(H,R,[[x-10,y-26],[x-12,y-8],[x-6,y-2]],'sun',1.1); stroke(H,R,[[x+11,y-24],[x+9,y-4]],'blue',.7,.4);
  if(patch){shape(H,R,[[x-9,y-12],[x+6,y-12],[x+7,y-3],[x-8,y-3]],'coral',.4,.5);for(let n=0;n<5;n++) H.line(R,[[x-8+n*3,y-12],[x-7+n*3,y-10]],'blue',.55);}
}

const room = world('barcelona-cooperative-pantry', 'A jar for everyone', {floor:'sun',tone:.16,pattern:'tiles',accent:'teal',wall:'paper',wallTone:.85,height:3.8,head:28}, (H,R)=>{
  for(const side of ['ne','nw']) { shape(H,R,wallRect(H,side,.08,11.9,.08,.65,-.07),'teal',.28); H.line(R,[wallPt(H,side,.1,.67,-.12),wallPt(H,side,11.9,.67,-.12)],'blue',1.6); }
  windowBay(H,R,'nw',1,4.2,2.25,1.28,{ink:'teal',divisions:4});
  windowBay(H,R,'ne',1,4.9,2.5,1.08,{ink:'sun',divisions:4});
  floorLight(H,4.8,5,140,.34);
  box(H,R,.4,.65,5.45,2.1,0,1.13,'sun',.47);
  panelFront(H,R,.53,2.76,5.16,.1,.95,4,'sun');
  timber(H,R,.3,.53,5.67,2.33,1.13,.16,'sun');
  for(let n=0;n<4;n++) {
    const i=1+n*1.35;
    metal(H,R,i-.28,1.05,.56,.58,1.29,.15,'teal');
    for(const dx of [-.32,.32]) metal(H,R,i+dx,1.05,.09,.09,1.3,1.48,'teal');
    const [x,y]=H.p(i,1.9,2.65), h=40;
    shape(H,R,[[x-16,y-4],[x+16,y-4],[x+16,y-h],[x-16,y-h]],'paper',1);
    H.fill([[x-13,y-4],[x+13,y-4],[x+13,y-h*(.5+n*.09)],[x-13,y-h*(.5+n*.09)]],n%2?'coral':'sun',.55);
    H.clip([[x-13,y-4],[x+13,y-4],[x+13,y-h],[x-13,y-h]],()=>{for(let k=0;k<32;k++) { const py=y-7-(k*11)%Math.floor(h*(.46+n*.09)); oval(H,R,x-10+(k*7)%22,py,1.9,1.25,n%2?'sun':'coral',.6); }});
    oval(H,R,x,y-h,17,5,'teal',.55); oval(H,R,x,y-h-3,8,3,'paper',1); H.line(R,[[x-10,y-9],[x-10,y-h+6]],'paper',2.4);
    shape(H,R,[[x-14,y],[x+14,y],[x+5,y+14],[x-5,y+14]],'teal',.4);
    H.line(R,[[x,y+13],[x,y+24]],'blue',4); H.line(R,[[x-2,y+15],[x+15,y+15]],'blue',2.5); oval(H,R,x+15,y+15,4,2,'coral');
    metal(H,R,i-.32,1.54,.64,.8,1.29,.035,'blue');
    for(let k=0;k<4;k++) H.line(R,[H.p(i-.25+k*.16,1.65,1.335),H.p(i-.25+k*.16,2.17,1.335)],'paper',.7);
  }
  cabinetFrame(H,R,6.6,.35,4.9,1.25,.05,3.18,3,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [z+1.63,z+.81,z]) {
      timber(H,R,i,j,w,d,level,.07,'sun');
      if(level<1.5) for(let k=0;k<3;k++) jar(H,R,i+.21+k*.42,j+.42,level+.09,6.2,15+k%2*4,k===1?'coral':'teal');
      else if(n===0) sack(H,R,i+.5,j+.4,level+.1,'paper',true);
      else { drape(H,R,i+.1,j+.15,w-.2,.55,level+.15,.24,n===1?'coral':'paper'); }
    }
    if(n===2) for(let x=i+.05;x<i+w;x+=.14) H.line(R,[H.p(x,j+d,1),H.p(x,j+d,2.92)],'paper',.55,{tone:.65});
  });
  hangingRail(H,R,'nw',6,4.6,2.83,4,(P,u,n)=>{
    const p=P(u,-.23); if(n<2) { oval(H,R,p[0],p[1]+12,6,5,'sun',.7);H.line(R,[p,[p[0],p[1]+10]],'blue',3); } else {shape(H,R,[[p[0]-7,p[1]],[p[0]+7,p[1]],[p[0]+9,p[1]+27],[p[0]-9,p[1]+27]],n===2?'paper':'coral',.65);H.line(R,[[p[0]-5,p[1]+20],[p[0]+6,p[1]+20]],'blue',.6);}
  });
  benchFrame(H,R,.5,6.2,1.9,3.1,.93,'teal');
  basin(H,R,.59,6.4,1.66,1.3,.94);
  for(let n=0;n<4;n++) jar(H,R,1.06+(n%2)*.7,8.27+Math.floor(n/2)*.45,.96,7,18,n===0?'coral':'teal');
  timber(H,R,8.45,4.1,2.5,1.2,.91,.15,'sun');for(const i of [8.65,10.65]) metal(H,R,i,4.28,.12,.8,0,.91,'teal');
  drape(H,R,8.6,4.22,1.3,.85,1.08,.2,'paper');
  for(let n=0;n<3;n++) {oval(H,R,...H.p(9.0+n*.54,4.77,1.11),6,2.8,n%2?'coral':'teal',.6);}
  const brush=H.p(10.5,4.45,1.09);H.line(R,[[brush[0],brush[1]],[brush[0]+10,brush[1]-14]],'sun',3);for(let n=0;n<5;n++)H.line(R,[[brush[0]+6+n,brush[1]-11],[brush[0]+9+n,brush[1]-18]],'blue',.75);
  benchFrame(H,R,7.7,8.8,3.35,1.75,.6,'sun');
  sack(H,R,8.45,9.6,.62,'paper',true); jar(H,R,9.55,9.4,.62,10,22,'coral'); jar(H,R,10.3,9.25,.62,7,18,'sun');
  oval(H,R,...H.p(10.5,10.02,.63),10,4,'teal',.6); for(let n=0;n<4;n++)H.dot(...H.p(10.38+n*.08,9.99,.67),1.7,'sun');
  metal(H,R,9.15,2.1,1.65,1.35,.18,.1,'teal');for(const i of [9.3,10.6]) for(const j of [2.26,3.23])caster(H,R,i,j);
  stroke(H,R,[H.p(10.67,2.23,.25),H.p(10.67,2.23,1.5),H.p(9.3,2.23,1.5),H.p(9.3,2.23,.25)],'blue',3);
  sack(H,R,9.8,2.8,.32,'sun');
  wallRack(H,R,'nw',6.2,4.55,3.14,.6,1,'sun',(P,z)=>{for(let n=0;n<4;n++) {const [x,y]=P(.5+n, z+.03);oval(H,R,x,y-6,5,6,n%2?'paper':'sun',.7);H.line(R,[[x-5,y-12],[x+5,y-12]],'blue',1.2);}});
  for(let n=0;n<5;n++) H.line(R,[wallPt(H,'ne',11.5,2.35+n*.08,-.08),wallPt(H,'ne',10.8,2.35+n*.08,-.08)],'blue',1);
},(H,R,t)=>{
  const u=cycle(t,22)*22, a=ease(.9,4.4,u), b=ease(4.4,8.8,u), c=ease(13.2,17,u), d=ease(17,20,u);
  const move=b*(1-c), lift=.25*a*(1-b)+.25*c*(1-d), ji=4.6-.9*move, jj=2.5-.6*move, z=1.3+lift;
  const hand=H.p(ji,jj,z+.22), footI=ji+.24,footJ=jj+1.14;
  person(H,R,footI,footJ,[[hand[0]-7,hand[1]],[hand[0]+7,hand[1]]],'teal');
  jar(H,R,ji,jj,z,8,19,'paper');
  const q=H.p(6.65,5.1,1.08), nod=2*Math.sin(Math.PI*ease(8.8,12.3,u))*(1-ease(12.3,14,u));
  person(H,R,6.9,5.7,[[q[0]-7,q[1]+nod],[q[0]+8,q[1]+nod]],'coral');
  jar(H,R,6.5,5.6,.55,8,18,'sun');
  const [x,y]=H.p(8.45,9.6,.62);stroke(H,R,[[x-7,y-34],[x-7,y-45+Math.sin(t*2*Math.PI/22)*1.4],[x+7,y-45],[x+7,y-34]],'blue',1.1);
  const p=H.p(10.15,.9,2.72);H.line(R,[p,[p[0]+10,p[1]+5+Math.sin(t*2*Math.PI/22)*1.1]],'paper',1.6);
});
room.loopSeconds=22;
room.stillTime=10.8;
export default room;
