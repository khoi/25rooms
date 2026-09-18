import { world, box, shape, oval, stroke, actor, wallPt, wallRect, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape, bentTube, vessel } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
import { windowBay, cityView, wallCourse, cornice, taskLight, floorShadow } from '../joinery.js';

const ease = (a, b, t) => { const x = Math.max(0, Math.min(1, (t - a) / (b - a))); return x * x * (3 - 2 * x); };
const rest = { x: 0, y: 0, drop: 0, lean: 0, head: 0, al: -10, ar: 12, el: -6, er: 6, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
function printer(H, R, t, lift) {
  const root = H.p(7.1, 7.1), s = 2, pose = { ...rest, head: -8 * lift, drop: .33*(1-lift), ll: 47*(1-lift)-5*lift, lr: 43*(1-lift)+5*lift, kl: -94*(1-lift), kr: -86*(1-lift) };
  const corners = [[root[0] - 12, root[1] - 38 - lift * 13], [root[0] + 12, root[1] - 38 - lift * 13]];
  const u=((t%22)+22)%22, reach=ease(.2,1.4,u)*(1-ease(2.8,4.4,u))+ease(18,19,u)*(1-ease(19.4,20,u));
  const hands=corners.map(p=>p.slice());hands[1][0]-=12*reach;hands[1][1]-=18*reach;
  for (const [n, side] of ['l', 'r'].entries()) {
    const dx = (hands[n][0] - root[0]) / s - (n ? 5.2 : -5.2), dy = (hands[n][1] - root[1]) / s + 32.5 - pose.drop*19;
    const c = Math.max(-1, Math.min(1, (dx * dx + dy * dy - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2)));
    const bend = (n ? -1 : 1) * Math.acos(c), a = Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(bend), 4.368 + 4.2 * Math.cos(bend));
    pose['a' + side] = a * 180 / Math.PI; pose['e' + side] = bend * 180 / Math.PI;
  }
  FIGURES.clips.parisPrintInspection = { dur: 22, keys: [[0, pose], [1, pose]] };
  actor(H, R, 7.1, 7.1, 0, 'parisPrintInspection', { shirt: ['coral', .68], apron: ['paper', 1], hairStyle: 'bun', glasses: true }, 0, s);
  return {corners,hands};
}
function image(H, R, points, alternate = false) {
  shape(H, R, points, 'paper', 1, .65);
  const P = (u, v) => [points[0][0] + (points[1][0] - points[0][0]) * u + (points[3][0] - points[0][0]) * v, points[0][1] + (points[1][1] - points[0][1]) * u + (points[3][1] - points[0][1]) * v];
  H.clip(points, () => {
    shape(H, R, [P(.14,.73),P(.47,.18),P(.68,.63),P(.32,.85)], 'coral', .66, .4);
    shape(H, R, [P(.34,.24),P(.83,.32),P(.7,.83),P(.5,.59)], 'teal', .6, .4);
    H.tint([P(.42,.49),P(.59,.45),P(.69,.67),P(.54,.73)], 'sun', .8);
    stroke(H,R,[P(.2,.43),P(.3,.35),P(.41,.45)],'blue',1.2);
    if (alternate) stroke(H,R,[P(.24,.49),P(.35,.41),P(.46,.51)],'coral',1.1);
  });
  H.line(R,[P(.05,.93),P(.95,.93)],'sun',.55);
}
function roller(H, R, i, j, z, ink = 'blue') {
  const p = H.p(i,j,z);
  shape(H,R,[[p[0]-12,p[1]-5],[p[0]+10,p[1]+6],[p[0]+13,p[1]+1],[p[0]-9,p[1]-10]],ink,.8,.7);
  oval(H,R,p[0]+11,p[1]+3,3,5,'blue',.8);
  stroke(H,R,[[p[0]-3,p[1]-3],[p[0]+1,p[1]-12],[p[0]+9,p[1]-16]],'blue',1.8);
  stroke(H,R,[[p[0]+7,p[1]-15],[p[0]+15,p[1]-19]],'sun',3.2);
  H.line(R,[[p[0]+8,p[1]-16],[p[0]+13,p[1]-18]],'paper',1.1);
}
const room = world('paris-print-drying', 'A sheet against the rail', { floor: 'paper', tone: .55, pattern: 'tiles', wall: 'paper', wallTone: 1, height: 4.3, head: 30 }, (H, R) => {
  wallCourse(H,R,'nw',0,12,.82,'teal');
  cornice(H,R,'ne',0,12,4.18,'paper');
  cornice(H,R,'nw',0,12,4.18,'paper');
  windowBay(H,R,'nw',4.9,5.6,1.3,2.65,{divisions:3,view:P=>cityView(H,R,P,5.6,2.65)});
  H.tint(H.tile(1.1,4.9,5.5,3.4,.02),'sun',.17);
  for (const p of [1.1,10.8]) bentTube(H,R,[[p,.14,0],[p,.14,4.02],[p,.65,4.02]],1.5,'teal');
  shape(H,R,wallRect(H,'ne',6.6,9.4,3.4,3.69,-.18),'blue',.52);
  for(let n=0;n<11;n++) H.line(R,[wallPt(H,'ne',6.73+n*.23,3.45,-.2),wallPt(H,'ne',6.73+n*.23,3.62,-.2)],'paper',.9);
  cabinetFrame(H,R,1,.3,9.6,1.05,.1,2.8,3,'teal',(x,j,w,d,z,h,n)=>{
    for (let row=0;row<5;row++) {
      const zz=z+row*.43;
      timber(H,R,x,j,w,d,zz,.07,'sun');
      if(n<2) {
        box(H,R,x+.12,j+.08,w-.27,d-.1,zz+.08,.25,row===2?'sun':'paper',.6);
        for(let k=0;k<4;k++) H.line(R,[H.p(x+.13,j+d-.01,zz+.1+k*.047),H.p(x+w-.16,j+d-.01,zz+.1+k*.047)],'blue',.48);
        H.line(R,[H.p(x+w*.44,j+d+.01,zz+.16),H.p(x+w*.59,j+d+.01,zz+.16)],'coral',1.8);
      } else if(row<3) roller(H,R,x+.55,j+.35,zz+.12,['coral','blue','teal'][row]);
      else box(H,R,x+.2,j+.12,.65,.48,zz+.08,.21,'coral',.5);
    }
  });
  timber(H,R,.8,.35,10.3,1.3,2.94,.15,'sun');
  drape(H,R,8.8,.43,1.3,.9,3.1,.45,'paper');
  box(H,R,2,.5,1.8,.65,3.1,.22,'teal',.5);
  timber(H,R,7.64,.57,.63,.61,3.1,.13,'sun');
  const trial=H.p(7.94,.87,3.24);stroke(H,R,[[trial[0]-7,trial[1]+2],[trial[0],trial[1]-4],[trial[0]+6,trial[1]+2]],'coral',1.2);H.line(R,[[trial[0],trial[1]-3],[trial[0]+1,trial[1]+5]],'blue',.8);
  for(const i of [1.4,5.3,9.7]) {
    bentTube(H,R,[[i,.6,4.05],[i,2.2,4.05]],2,'teal');
    H.line(R,[H.p(i,.65,4.22),H.p(i,2.13,4.05)],'blue',.9);
  }
  H.line(R,[H.p(1.4,2.2,4.05),H.p(9.7,2.2,4.05)],'blue',2.6);
  for(let n=0;n<6;n++) {
    const x=1.6+n*1.27, z=3.9-(n%3)*.09;
    const Q=[H.p(x,2.2,z),H.p(x+1.03,2.2,z),H.p(x+1.03,2.26,z-1.03),H.p(x,2.26,z-1.03)];
    image(H,R,Q,n===3);
    for(const u of [.16,.81]) metal(H,R,x+u,2.17,.08,.12,z-.03,.17,n===1?'sun':'teal');
  }
  floorShadow(H,2.1,4.3,6.1,2.8,.2);
  benchFrame(H,R,2.1,4.3,6.1,2.6,1.24,'sun');
  timber(H,R,2.35,4.6,2.1,1.85,.35,.1,'teal');
  for(let n=0;n<4;n++) box(H,R,2.5+n*.05,4.85,.9,.9,.46+n*.11,.08,'paper',1);
  metal(H,R,2.45,4.62,2.1,1.63,1.25,.14,'blue');
  for(const i of [2.65,4.1]) {
    metal(H,R,i,4.85,.18,.25,1.39,1.13,'teal');
    metal(H,R,i-.07,4.76,.32,.45,2.47,.13,'teal');
  }
  bentTube(H,R,[[2.62,5.15,2.06],[4.26,5.15,2.06],[4.5,5.15,2.06],[4.5,5.15,2.5]],3.5,'blue');
  metal(H,R,2.63,5.13,1.62,.42,1.87,.28,'blue');
  H.line(R,[H.p(2.68,5.57,2.08),H.p(4.23,5.57,2.08)],'paper',2);
  shape(H,R,H.tile(2.73,5.12,1.26,1.02,1.45),'paper',1);
  metal(H,R,4.79,4.57,1.3,1.43,1.26,.08,'teal');
  H.tint(H.tile(4.87,4.67,1.14,1.2,1.35),'blue',.32);
  roller(H,R,5.42,5.4,1.38);
  vessel(H,R,5.78,4.83,1.4,7,8,'coral',false);
  const root=H.p(7.1,7.1);
  shape(H,R,[[root[0]-17,root[1]-39],[root[0]+17,root[1]-39],[root[0]+17,root[1]-77],[root[0]-17,root[1]-77]],'sun',.45,.85);
  H.line(R,[[root[0]+16,root[1]-70],H.p(7.58,6.35,1.27),[root[0]+16,root[1]-39]],'blue',1.9);
  metal(H,R,6.8,6.4,.65,.24,1.24,.1,'blue');
  taskLight(H,R,6.3,4.55,1.24,'coral',.75);
  benchFrame(H,R,8.95,5.1,2.35,3.65,.82,'teal');
  for(let k=0;k<3;k++) box(H,R,9.08+k*.04,5.4,1.85,1.05,.83+k*.1,.075,k===2?'coral':'paper',.65);
  for(const j of [6.9,7.25,7.6]) H.line(R,[H.p(9.2,j,.84),H.p(10.7,j+.38,.84)],'paper',4);
  box(H,R,9.25,8,1.6,.57,.83,.35,'sun',.5);
  H.line(R,[H.p(9.3,8.29,1.19),H.p(10.75,8.29,1.19)],'teal',1.4);
  basin(H,R,.35,9.2,1.2,1.9,.9,'paper');
  for (const x of [.45,1.3]) metal(H,R,x,9.35,.1,1.5,0,.9,'blue');
  drape(H,R,.52,10.4,.6,.42,.91,.65,'paper');
  benchFrame(H,R,2.4,9.6,4.5,1.3,.68,'sun');
  image(H,R,H.tile(2.6,9.74,1.45,.98,.7),true);
  image(H,R,H.tile(4.28,9.76,1.35,.92,.7));
  shape(H,R,H.tile(5.86,9.82,.79,.65,.7),'paper',1);
  shape(H,R,H.tile(6.02,9.95,.38,.28,.71),'teal',.65);
  box(H,R,3.2,10.73,.48,.23,.7,.12,'sun',.65);
  H.line(R,[H.p(3.26,10.82,.83),H.p(3.52,10.88,.83)],'blue',1.2);
}, (H,R,t)=>{
  const u=((t%22)+22)%22, lift=ease(4.4,8.8,u)*(1-ease(13.2,20,u));
  const {corners,hands}=printer(H,R,t,lift), [a,b]=corners;
  image(H,R,[[a[0],a[1]-18],[b[0],b[1]-18],b,a]);
  for(const p of hands) H.dot(...p,2.2,'coral',.45,{knock:true});
  const root=H.p(7.1,7.1), open=ease(.8,3.4,u)*(1-ease(18.4,20,u));
  shape(H,R,[[root[0]-3,root[1]-58],[root[0]+3,root[1]-58],[root[0]+3+open*3,root[1]-51],[root[0]-3+open*3,root[1]-51]],'teal',.8,.6);
  H.line(R,[[root[0]+11,root[1]-23],[root[0]+18,root[1]-19+Math.sin(u*Math.PI*2/22)*2]],'coral',.9);
});
room.loopSeconds=22;
room.stillTime=10;
export default room;
