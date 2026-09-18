import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { surface, timber, metal, benchFrame, bentTube } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, taskLight, floorShadow, radiator, recessedFrame } from '../joinery.js';

const smooth = (a, b, t) => { const x = Math.max(0, Math.min(1, (t - a) / (b - a))); return x * x * (3 - 2 * x); };
const clock = t => ((t % 20) + 20) % 20;
function person(H, R, i, j, hands, ink, lean = 0) {
  const [x, y] = H.p(i, j, 0), neck = [x + lean, y - 62];
  H.tint(ell(x + 2, y + 2, 13, 4), 'blue', .18);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x + side * 4, y - 31], [x + side * 5, y - 15], [x + side * 6, y]], 'blue', 7);
    oval(H, R, x + side * 6 + 2, y, 5.2, 2.2, 'blue', .85);
  }
  shape(H, R, [[x - 8 + lean, y - 61], [x + 8 + lean, y - 61], [x + 7, y - 31], [x - 7, y - 31]], ink, .7, .8);
  H.line(R, [[x - 1 + lean, y - 59], [x + lean, y - 34]], 'paper', .8);
  for (let n = 0; n < 2; n++) {
    const s = n ? 1 : -1, a = [neck[0] + s * 7, neck[1] + 3], b = hands[n];
    const elbow = [a[0] * .47 + b[0] * .53 + s * 4, (a[1] + b[1]) * .5 + 5];
    stroke(H, R, [a, elbow, b], 'blue', 6.5);
    stroke(H, R, [a, elbow, b], ink, 4.7);
    oval(H, R, ...b, 2.7, 2.1, 'paper', 1);
  }
  oval(H, R, x + lean, y - 75, 7, 8, 'paper', 1);
  surface(H, R, [[x - 7 + lean, y - 76], [x - 6 + lean, y - 83], [x + 2 + lean, y - 84], [x + 7 + lean, y - 79], [x + 4 + lean, y - 77], [x - 2 + lean, y - 80]], 'blue', .85, .5);
  H.dot(x + lean + 3, y - 75, .9, 'blue');
  H.line(R, [[x + lean + 2, y - 71], [x + lean + 5, y - 71]], 'coral', .8);
}

function model(H, R) {
  timber(H, R, 3.5, 4.05, 5.7, 3.65, 1.18, .18, 'sun');
  for(const z of [1.24,1.29,1.34])H.line(R,[H.p(3.52,7.71,z),H.p(9.17,7.71,z),H.p(9.17,4.1,z)],'paper',.8);
  for(const x of [3.7,8.96])for(const j of [4.25,7.45]){H.dot(...H.p(x,j,1.372),1.3,'blue');H.line(R,[H.p(x-.04,j,1.375),H.p(x+.04,j,1.375)],'sun',.6);}
  surface(H, R, H.tile(3.64, 4.17, 5.4, 3.38, 1.38), 'paper', 1);
  surface(H, R, H.tile(5.05, 5.16, 2.65, 1.8, 1.4), 'sun', .15);
  for (const x of [5.07, 7.5]) for (let j = 5.18; j < 6.9; j += .27) surface(H, R, H.tile(x, j, .17, .22, 1.405), 'coral', .4, .35);
  for (const [i, j, w, d] of [[3.85,4.3,4.9,.23],[3.85,4.3,.22,2.92],[8.52,4.3,.23,2.92]]) {
    timber(H, R, i, j, w, d, 1.4, .64, 'paper');
    for (let n = 0; n < (w > d ? 6 : 4); n++) {
      const x = i + .16 + (w > d ? n * .74 : .08), y = j + (w > d ? .26 : .2 + n * .64);
      const pane = w > d ? H.faceI(x, y, .41, 1.54, 1.95) : H.faceJ(i + .24, y, .4, 1.54, 1.95);
      surface(H, R, pane, 'blue', .66, .55);
      H.line(R, [pane[0], pane[1]], 'sun', 1.5);
      H.line(R, [pane[1], pane[2]], 'paper', 1);
      const base=w>d?H.p(x+.205,y+.035,1.55):H.p(i+.27,y+.2,1.55);
      const top=w>d?H.p(x+.205,y+.035,1.93):H.p(i+.27,y+.2,1.93);
      H.line(R,[base,top],'teal',.65);
      if(w>d){timber(H,R,x-.03,y+.02,.49,.2,1.54,.045,'paper');H.line(R,[H.p(x-.03,y+.23,1.6),H.p(x+.46,y+.23,1.6)],'teal',.85);}
      else {timber(H,R,i+.24,y-.02,.19,.44,1.54,.045,'paper');H.line(R,[H.p(i+.44,y-.02,1.6),H.p(i+.44,y+.42,1.6)],'teal',.85);}
    }
  }
  timber(H, R, 4.09, 5.03, .84, 2.17, 1.76, .08, 'paper');
  for (let n = 0; n < 10; n++) {
    const j = 5.07 + n * .215;
    H.line(R, [H.p(4.92,j,1.83),H.p(4.92,j,2.11)], 'teal', .65);
  }
  H.line(R, [H.p(4.92,5.07,2.11),H.p(4.92,7.02,2.11)], 'teal', 1.2);
  for (let n = 0; n < 7; n++) timber(H, R, 7.72, 6.88 - n * .22, .58, .23, 1.42, .085 + n * .083, 'paper');
  bentTube(H, R, [[8.36,6.95,1.6],[8.36,5.48,2.16]], 1.05, 'teal');
  timber(H, R, 7.8, 4.56, .54, .62, 1.4, .62, 'paper');
  surface(H, R, H.faceI(7.93,5.19,.22,1.53,1.89), 'teal', .4, .4);
  for (const [x,y] of [[4,4.5],[8.6,4.5],[4,7]]) metal(H,R,x,y,.045,.045,2.04,.13,'sun');
  for(const [i,j,w,d] of [[5.14,5.27,2.21,.13],[5.14,6.74,2.21,.13],[5.14,5.4,.13,1.34],[7.21,5.4,.13,1.34]])timber(H,R,i,j,w,d,1.42,.045,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(5.4+n*.37,5.48,1.42),H.p(5.4+n*.37,6.63,1.42)],'teal',.45,{tone:.45});
  for(const x of [5.5,6.77]) {
    timber(H,R,x,4.57,.54,.63,1.41,.08,'paper');
    timber(H,R,x+.13,4.63,.045,.39,1.49,.35,'teal');
    timber(H,R,x+.45,4.63,.045,.39,1.49,.35,'teal');
    timber(H,R,x+.12,4.61,.39,.045,1.8,.055,'teal');
  }
  for(const [x,j] of [[5.08,6.74],[7.11,5.24]]) {
    timber(H,R,x,j,.37,.25,1.44,.13,'sun');
    const p=H.p(x+.19,j+.14,1.61);H.line(R,[[p[0],p[1]],[p[0],p[1]-5]],'teal',1);oval(H,R,p[0],p[1]-7,3,2.6,'teal',.65);
  }
  timber(H,R,5.33,6.43,.31,.29,1.41,.07,'teal');
  timber(H,R,5.34,6.69,.29,.035,1.48,.27,'teal');
  for (const x of [5.35,5.59]) for (const j of [6.45,6.65]) H.line(R,[H.p(x,j,1.4),H.p(x,j,1.55)],'blue',.7);
  timber(H,R,4.28,5.54,.24,.22,1.85,.05,'sun');
  timber(H,R,4.27,5.54,.035,.22,1.89,.2,'sun');
  const [tx,ty]=H.p(6.35,5.77,1.42);
  H.line(R,[[tx,ty],[tx-1,ty-17]],'sun',2);
  oval(H,R,tx-3,ty-18,8,6,'teal',.6);
  oval(H,R,tx+5,ty-14,6,5,'teal',.42);
  H.line(R,[[tx-3,ty-8],[tx+2,ty-10]],'coral',2.3);
  for(const [x,j] of [[6.8,6.2],[5.8,5.42]]) { const [a,b]=H.p(x,j,1.42); H.line(R,[[a,b],[a,b-6]],'blue',1.3); H.dot(a,b-8,1.6,'coral'); }
}

function roof(H,R,lift,side) {
  const source=H,angle=side*.19,c=Math.cos(angle),s=Math.sin(angle),ci=6.295+side,cj=5.77-side*.48;
  H=Object.create(source);
  H.p=(i,j,z)=>source.p(ci+(i-ci)*c-(j-cj)*s,cj+(i-ci)*s+(j-cj)*c,z);
  H.tile=(i,j,w,d,z)=>[H.p(i,j,z),H.p(i+w,j,z),H.p(i+w,j+d,z),H.p(i,j+d,z)];
  H.faceI=(i,j,w,a,b)=>[H.p(i,j,a),H.p(i+w,j,a),H.p(i+w,j,b),H.p(i,j,b)];
  H.faceJ=(i,j,d,a,b)=>[H.p(i,j,a),H.p(i,j+d,a),H.p(i,j+d,b),H.p(i,j,b)];
  const z=2.08+lift, i=3.78+side,j=4.24-side*.48;
  for(const [x,y,w,d] of [[0,0,5.03,.74],[0,.74,.8,1.81],[4.23,.74,.8,1.81],[0,2.55,5.03,.51]]) {
    timber(H,R,i+x,j+y,w,d,z,.075,'paper');
    surface(H,R,H.tile(i+x+.06,j+y+.06,w-.12,d-.12,z+.083),'teal',.14,.5);
    for(let n=.35;n<w;n+=.65) H.line(R,[H.p(i+x+n,j+y+.07,z+.086),H.p(i+x+n,j+y+d-.07,z+.086)],'blue',.5,{tone:.4});
  }
  for(const [x,y] of [[.5,.35],[3.9,.7]]) { timber(H,R,i+x,j+y,.32,.35,z+.08,.29,'paper'); surface(H,R,H.tile(i+x+.06,j+y+.07,.2,.21,z+.38),'blue',.5,.35); }
  for(const [x,y] of [[1.55,.2],[2.45,.2],[4.36,1.25]]) {
    surface(H,R,H.tile(i+x,j+y,.49,.35,z+.09),'blue',.54,.45);
    H.line(R,[H.p(i+x+.03,j+y+.03,z+.1),H.p(i+x+.44,j+y+.03,z+.1)],'paper',.8);
  }
  for(const x of [.05,4.85])H.line(R,[H.p(i+x,j+.1,z+.09),H.p(i+x,j+2.93,z+.09)],'sun',1);
  H.line(R,[H.p(i+.3,j+3.08,z+.03),H.p(i+.74,j+3.08,z+.03)],'sun',2.3);
}

const room=world('barcelona-model-courtyard','The roof lifts away',{floor:'paper',tone:.7,pattern:'tiles',accent:'teal',wall:'paper',wallTone:.7,height:4.1,head:45},(H,R)=>{
  masonry(H,R,'nw',0,11.9,0,.78,'teal',.25);
  windowBay(H,R,'ne',3.1,7.8,1.3,2.48,{divisions:4,view:P=>{
    for(let n=0;n<6;n++) { const h=.65+(n%3)*.25; surface(H,R,[P(.2+n*1.2,.15),P(1.23+n*1.2,.15),P(1.23+n*1.2,h),P(.2+n*1.2,h)],n%2?'coral':'teal',.18,.4); }
  }});
  radiator(H,R,'ne',3.48,3.31,.86);
  for(const x of [3.22,10.78]){
    surface(H,R,H.faceI(x,.33,.23,1.35,3.71),'teal',.38,.6);
    for(let n=0;n<9;n++)H.line(R,[H.p(x+.03,.35,1.5+n*.24),H.p(x+.2,.35,1.5+n*.24)],'paper',.8);
  }
  timber(H,R,3.03,.2,7.97,.46,1.18,.12,'paper');
  for(const x of [4.41,8.56])bentTube(H,R,[[x,.57,1.22],[x,.18,.89]],1.7,'teal');
  bentTube(H,R,[[10.4,.34,2.25],[10.12,.85,2.29],[9.96,.34,2.48]],1.1,'sun');
  const P=(u,z)=>wallPt(H,'nw',u,z,-.16);
  for(let n=0;n<3;n++) {
    const j=2.6+n*2.35;
    surface(H,R,[P(j,2.82),P(j+1.84,2.82),P(j+1.84,3.81),P(j,3.81)],'paper',1,.8);
    for(let k=0;k<3;k++) { const u=j+.17+k*.49; surface(H,R,[P(u,3.02),P(u+.35,3.02),P(u+.35,3.39+k*.08),P(u,3.39+k*.08)],k===1?'coral':'teal',.38,.45); }
    H.line(R,[P(j+.12,2.96),P(j+1.64,2.96)],'blue',.7);
    for(let k=0;k<4;k++)H.line(R,[P(j+.2+k*.38,3.1),P(j+.2+k*.38,3.58)],'blue',.45);
    H.line(R,[P(j+.14,3.65),P(j+.76,3.4),P(j+1.51,3.73)],'coral',1.25);
    for(const u of [.11,1.72])H.dot(...P(j+u,3.73),1.4,'sun');
  }
  cabinetFrame(H,R,.55,1.05,2.06,6.9,.03,2.52,1,'teal',(x,j,w,d,z)=>{
    for(let n=0;n<7;n++) {
      const top=.24+n*.285,open=n===3?.47:0;
      timber(H,R,x+open,j,w,d-.1,top,.065,'sun');
      if(open){surface(H,R,H.tile(x+w-.19,j+.2,.58,d-.57,top+.074),'blue',.46,.5);for(let k=0;k<5;k++)surface(H,R,H.tile(x+w-.11,j+.39+k*.8,.42,.63,top+.09),k%2?'paper':'coral',.52,.4);}
      surface(H,R,H.faceJ(x+w+open+.01,j+.12,d-.35,top+.07,top+.22),'paper',.85,.5);
      H.line(R,[H.p(x+w+open+.025,j+2.1,top+.15),H.p(x+w+open+.025,j+3,top+.15)],'blue',2);
      for(const y of [j+.58,j+4.85])surface(H,R,H.faceJ(x+w+open+.035,y,.49,top+.1,top+.2),'teal',.4,.4);
    }
  });
  for(let n=0;n<4;n++) { const [x,y]=H.p(.92+n*.31,1.37,2.6); oval(H,R,x,y,3.2,2,'paper',1); stroke(H,R,[[x,y],[x+2,y-23-n*3]],n%2?'coral':'sun',5); oval(H,R,x+2,y-23-n*3,2.5,1.5,'paper',1); }
  surface(H,R,H.tile(.9,4.4,1.2,1.7,2.62),'paper',1);
  for(let n=0;n<4;n++) surface(H,R,H.tile(1.05,4.58+n*.3,.83,.18,2.64),n%2?'coral':'teal',.38,.4);
  for(const j of [2.12,2.64]) {
    const p=H.p(1.14,j,2.61);surface(H,R,[[p[0]-8,p[1]],[p[0]+8,p[1]],[p[0]+6,p[1]-13],[p[0]-6,p[1]-13]],'paper',1,.7);
    H.line(R,[[p[0]-5,p[1]-4],[p[0]+4,p[1]-4]],'coral',.8);
  }
  surface(H,R,H.tile(.9,5.98,1.09,.48,2.63),'teal',.65,.6);
  for(let n=0;n<5;n++)H.line(R,[H.p(.98+n*.19,6.02,2.65),H.p(.98+n*.19,6.38,2.65)],'paper',.55);
  taskLight(H,R,2.1,6.9,2.59,'sun',.6);
  floorShadow(H,3.2,3.9,6.4,4.3,.2);
  benchFrame(H,R,3.25,3.77,6.4,4.3,1.18,'sun');
  for(let n=0;n<5;n++) surface(H,R,H.tile(3.6+n*.035,4.1+n*.035,1.1,.72,.38+n*.055),'paper',1,.5);
  timber(H,R,3.56,4.23,5.65,3.54,.28,.09,'teal');
  for(const [x,j,w,d] of [[4.97,4.63,1.22,1.13],[6.44,5.04,1.53,1.03],[8.13,4.56,.83,2.3]]) {
    timber(H,R,x,j,w,d,.38,.18,'paper');
    H.line(R,[H.p(x+.05,j+d,.48),H.p(x+w-.06,j+d,.48)],'coral',1.1);
  }
  model(H,R);
  timber(H,R,9.98,1.4,1.43,2.5,.08,.14,'sun');
  for(const x of [10.02,11.3]) timber(H,R,x,1.44,.1,2.38,.22,.56,'sun');
  for(const j of [1.43,3.82]) timber(H,R,10.05,j,1.3,.1,.22,.56,'sun');
  surface(H,R,H.tile(10.17,1.65,1.03,1.96,.24),'blue',.4,.5);
  surface(H,R,H.faceJ(11.41,1.55,2.18,.83,1.94),'sun',.3,.7);
  for(const j of [1.65,3.18])surface(H,R,H.faceJ(11.42,j,.48,1.04,1.64),'blue',.43,.5);
  for(const j of [1.76,3.07])bentTube(H,R,[[11.37,j,.67],[11.43,j,.97]],1.7,'teal');
  for(const j of [1.94,3]) surface(H,R,H.tile(10.32,j,.6,.48,.26),'paper',.85,.5);
  for(let n=0;n<4;n++) timber(H,R,10.25,6.8+n*.22,.65,.23,.12,.09+n*.08,'paper');
  benchFrame(H,R,1.3,9.6,4.6,1.1,.65,'teal');
  for(let n=0;n<4;n++) {
    const x=1.54+n*1.06;timber(H,R,x,9.85,.73,.53,.66,.15,n%2?'paper':'sun');
    if(n===0){
      for(const y of [9.91,10.27]){
        H.line(R,[H.p(x+.06,y,.84),H.p(x+.36,y,1.5),H.p(x+.67,y,.84)],'sun',2.4);
        H.line(R,[H.p(x+.08,y,.86),H.p(x+.65,y,.86)],'teal',2.1);
        H.line(R,[H.p(x+.36,y,.86),H.p(x+.36,y,1.46)],'blue',.8);
      }
      H.line(R,[H.p(x+.36,9.91,1.5),H.p(x+.36,10.27,1.5)],'sun',2.5);
    } else if(n===1){
      for(let k=0;k<3;k++)timber(H,R,x+.08,9.96,.56,.23,.82+k*.15,.13,k===1?'sun':'coral');
      surface(H,R,H.faceI(x+.18,10.3,.34,.84,1.39),'paper',1,.6);
      H.line(R,[H.p(x+.24,10.32,.87),H.p(x+.24,10.32,1.35)],'teal',1.2);
    } else if(n===2){
      surface(H,R,H.faceI(x+.08,10.28,.55,.84,1.5),'teal',.17,.6);
      for(const dx of [.07,.63])H.line(R,[H.p(x+dx,10.3,.82),H.p(x+dx,10.3,1.53)],'blue',1.7);
      H.line(R,[H.p(x+.08,10.3,1.53),H.p(x+.62,10.3,1.53)],'sun',1.7);
      H.line(R,[H.p(x+.21,10.29,.91),H.p(x+.43,10.29,1.4)],'paper',1.4);
    } else {
      timber(H,R,x+.08,9.93,.12,.38,.82,.59,'teal');
      surface(H,R,[H.p(x+.23,10.03,.85),H.p(x+.6,10.21,.85),H.p(x+.6,10.21,1.4),H.p(x+.23,10.03,1.4)],'sun',.34,.6);
      for(const z of [.94,1.26])H.dot(...H.p(x+.23,10.03,z),1.3,'coral');
    }
  }
  recessedFrame(H,R,'nw',8.9,2.48,1.83,1.86,'teal',P=>{
    for(const z of [.22,.96]) {
      H.line(R,[P(.12,z,.36),P(2.35,z,.36)],'sun',3.2);
      for(let n=0;n<3;n++) {
        const u=.24+n*.69;
        surface(H,R,[P(u,z+.08),P(u+.49,z+.08),P(u+.49,z+.47),P(u,z+.47)],'paper',1,.5);
        H.line(R,[P(u+.07,z+.15),P(u+.07,z+.36),P(u+.41,z+.36)],n%2?'coral':'teal',1.1);
      }
    }
  });
  benchFrame(H,R,7.38,10.45,3.78,.93,.62,'teal');
  surface(H,R,H.tile(7.56,10.59,1.79,.61,.64),'blue',.48,.6);
  for(let n=0;n<5;n++)H.line(R,[H.p(7.67+n*.29,10.64,.65),H.p(7.67+n*.29,11.09,.65)],'paper',.5);
  for(let n=0;n<3;n++)H.line(R,[H.p(7.64,10.68+n*.16,.65),H.p(9.21,10.68+n*.16,.65)],'paper',.5);
  bentTube(H,R,[[8.12,10.82,.67],[8.73,10.94,.67]],2.2,'sun');
  for(const j of [10.61,10.85])timber(H,R,9.53,j,1.13,.12,.65,.07,'paper');
  const brush=H.p(10.46,10.89,.72);H.line(R,[[brush[0],brush[1]],[brush[0]+12,brush[1]-6]],'coral',2.7);H.line(R,[[brush[0]+12,brush[1]-6],[brush[0]+17,brush[1]-8]],'sun',4);
  const [lx,ly]=H.p(6.5,6.4,1.42);H.glow(lx,ly,70,40,'sun',.2);
},(H,R,t)=>{
  const u=clock(t),a=smooth(4,8,u)*(1-smooth(12,18,u)),shift=.48*smooth(7,9,u)*(1-smooth(12,15,u));
  const z=2.11+.28*a,angle=shift*.19,c=Math.cos(angle),s=Math.sin(angle),ci=6.295+shift,cj=5.77-shift*.48,handle=x=>H.p(ci+(x-6.295)*c-1.54*s,cj+(x-6.295)*s+1.54*c,z),handA=handle(6.12),handB=handle(6.74);
  person(H,R,7.15,7.5,[handA,handB],'coral',-2*a);
  roof(H,R,.28*a,shift);
  for(const p of [handA,handB]) oval(H,R,...p,2.7,2,'paper',1);
  const point=smooth(8.2,9.4,u)*(1-smooth(11,13,u));
  person(H,R,9.08,6.74,[H.p(8.94,7.02,1.45),H.p(8.47+point*.08,6.65,1.86+point*.15)],'teal',-point*2);
  const [x,y]=H.p(3.5,7.5,1.45);surface(H,R,[[x,y],[x+19,y-9],[x+23,y-1-Math.sin(u/20*Math.PI*2)*1.4],[x+3,y+10]],'paper',1,.6);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
