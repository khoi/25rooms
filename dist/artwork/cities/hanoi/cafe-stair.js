import { world, shape, oval, stroke, actor, cycle, ell, steam } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, benchFrame, bentTube, caneChair, branchSpray, drape, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin } from '../structure.js';
import { archedBay } from '../structure.js';
import { windowBay, panelFront, taskLight, wallRack, caster } from '../joinery.js';

const rest = FIGURES.clips.idle.keys[0][1];
const pose = { ...rest, head: 12 };
FIGURES.clips.hanoiCafeLid = { dur: 16, keys: [[0, pose], [1, pose]] };
FIGURES.clips.hanoiCafeGuest = { dur: 16, keys: [[0, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: -8 }], [.4, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: -8 }], [.65, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: 23 }], [1, { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: -8 }]] };
const ease = x => { const a = Math.max(0, Math.min(1, x)); return a * a * (3 - 2 * a); };
function hands(H, i, j, targets) {
  const root = H.p(i, j, 0), s = 1.5;
  for (const [side, target] of Object.entries(targets)) {
    const dx = (target[0] - root[0]) / s - (side === 'l' ? -5.2 : 5.2), dy = (target[1] - root[1]) / s + 32.5;
    const d = Math.min(8.55, Math.max(.1, Math.hypot(dx, dy))), a = Math.atan2(dx, dy), bend = Math.acos(Math.max(-1, Math.min(1, (4.368 ** 2 + d ** 2 - 4.2 ** 2) / (2 * 4.368 * d))));
    const upper = a - bend, lower = Math.atan2(dx - Math.sin(upper) * 4.368, dy - Math.cos(upper) * 4.368);
    pose['a' + side] = upper * 180 / Math.PI;
    pose['e' + side] = (lower - upper) * 180 / Math.PI;
  }
}
function cup(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 2, 10 * size, 4 * size, 'paper', 1);
  H.line(R, ell(x, y + 2, 6 * size, 2 * size), 'coral', .6, { closed: true, tone: .38 });
  shape(H, R, [[x - 6 * size, y - 10 * size], [x + 6 * size, y - 10 * size], [x + 4.5 * size, y], [x - 4.5 * size, y]], 'paper', 1);
  oval(H, R, x, y - 10 * size, 6 * size, 2.5 * size, 'sun', .2);
  stroke(H, R, [[x + 6 * size, y - 8 * size], [x + 10 * size, y - 6 * size], [x + 5 * size, y - 2 * size]], 'blue', 1);
}
const room = world('hanoi-cafe-stair', 'The cup above the courtyard', { wall: false, floor: 'paper', tone: .8, pattern: 'tiles', accent: 'teal', head: 95 }, (H, R) => {
  masonry(H, R, 'nw', 0, 11.5, 0, 4.5, 'paper', .85);
  masonry(H, R, 'ne', 0, 11.5, 0, 3.6, 'paper', .85);
  archedBay(H, R, 'ne', 3.4, 4.7, .65, 2.95, 'teal', P => {
    shape(H, R, [P(.15,.15),P(4.55,.15),P(4.55,3),P(.15,3)], 'sun', .18);
    for (const [u, h] of [[.7, 1.2],[1.8,1.8],[3.2,1.1]]) {
      shape(H,R,[P(u,.1),P(u+.7,.1),P(u+.7,h),P(u,h)],'teal',.15);
      H.line(R,[P(u+.15,h-.1),P(u+.55,h-.1)],'coral',1.2);
    }
    H.line(R,[P(.2,.6),P(4.5,.6)],'teal',2);
  });
  for(const z of [3.43,3.53])H.line(R,[H.p(.12,.2,z),H.p(11.5,.2,z)],z===3.43?'blue':'sun',z===3.43?3:1.4);
  for(const i of [3.24,8.2]){
    timber(H,R,i,.15,.17,.44,.56,2.75,'teal');
    metal(H,R,i-.06,.14,.3,.46,.55,.14,'paper');
  }
  shape(H,R,[H.p(.25,.45,3.88),H.p(.25,3.8,3.88),H.p(1.7,3.8,3.48),H.p(1.7,.45,3.48)],'paper',.86);
  for(let n=0;n<5;n++)H.line(R,[H.p(.28,.62+n*.63,3.89),H.p(1.67,.62+n*.63,3.49)],'coral',1.8,{tone:.44});
  bentTube(H,R,[[.2,3.7,4.07],[1.8,3.7,3.62]],1.3,'teal');
  windowBay(H, R, 'nw', 1.2, 2.35, 3.35, .95, { ink: 'sun', divisions: 2 });
  const screen=(u,z)=>H.p(.17,u,z);
  shape(H,R,[screen(4.4,.65),screen(7.5,.65),screen(7.5,3.03),screen(4.4,3.03)],'blue',.3);
  for(let z=.8;z<3;z+=.21){shape(H,R,[screen(4.52,z),screen(7.38,z),H.p(.33,7.38,z+.13),H.p(.33,4.52,z+.13)],'teal',.44);H.line(R,[H.p(.33,4.52,z+.13),H.p(.33,7.38,z+.13)],'paper',.9);}
  for(const u of [4.4,5.94,7.5])timber(H,R,.13,u,.19,.12,.61,2.48,'sun');
  timber(H,R,.1,4.37,.63,3.29,.54,.14,'sun');
  const fan=H.p(.52,8.75,2.92);
  oval(H,R,...fan,22,23,'paper',.85);
  for(let n=0;n<10;n++){const a=n*Math.PI/5;H.line(R,[[fan[0]+Math.cos(a)*4,fan[1]+Math.sin(a)*4],[fan[0]+Math.cos(a)*21,fan[1]+Math.sin(a)*22]],'teal',.65);}
  for(const r of [9,16,21])H.line(R,ell(...fan,r,r*1.05),'blue',.7,{closed:true});
  oval(H,R,...fan,4,4,'coral',.7);
  bentTube(H,R,[[.18,8.75,2.2],[.51,8.75,2.5]],2.3,'teal');
  H.line(R,[H.p(.2,8.76,2.3),H.p(.2,9.2,2.3),H.p(.2,9.2,1.16)],'blue',.7);
  H.tint(H.tile(3.8, .5, 4.8, 5.6, .025), 'sun', .22);
  floorLight(H, 6, 4.8, 115, .36);
  for (const j of [.45, 2.5]) {
    const stringer = [H.p(.45,j,3.15),H.p(6.7,j,.22),H.p(6.7,j,.55),H.p(.45,j,3.48)];
    shape(H,R,stringer,'teal',.64);
    H.line(R,[H.p(.48,j,3.42),H.p(6.68,j,.48)],'sun',1.3);
  }
  for(let n=10;n>=0;n--){
    const i=.48+n*.565,z=.4+(10-n)*.267;
    timber(H,R,i,.38,.6,2.28,z,.14,'sun');
    shape(H,R,H.faceI(i,.42,.58,z-.19,z),'teal',.35,.5);
    H.line(R,[H.p(i+.13,.55,z+.148),H.p(i+.45,2.4,z+.148)],'paper',1.4);
    if(n%2===0) bentTube(H,R,[[i+.12,2.49,z+.14],[i+.12,2.49,z+1.15]],2.6,'teal');
  }
  bentTube(H,R,[[.6,2.49,4.35],[6.42,2.49,1.6]],4,'sun');
  timber(H,R,.16,.35,1.02,2.35,3.23,.2,'sun');
  for (let i=.22;i<1.15;i+=.36) bentTube(H,R,[[i,2.5,3.43],[i,2.5,4.38]],1.6,'teal');
  bentTube(H,R,[[.18,2.5,4.38],[1.25,2.5,4.38]],3.5,'sun');
  shape(H,R,[H.p(.65,2.67,.05),H.p(4.1,2.67,.05),H.p(4.1,2.67,1.65),H.p(.65,2.67,3.22)],'blue',.65);
  for(const [i,w,h] of [[.75,1.18,2.6],[2.03,1.05,2.02],[3.18,.8,1.58]]){
    panelFront(H,R,i,2.76,w,.14,h,1,'teal');
    for(const z of [.39,h-.13])metal(H,R,i+.08,2.77,.21,.05,z,.06,'sun');
  }
  timber(H,R,.64,2.7,3.5,.16,.05,.14,'sun');
  cabinetFrame(H,R,3.65,3.42,4.05,1.8,.06,1.23,3,'teal',(i,j,w,d,z,h,n)=>{
    if(n===1){
      timber(H,R,i,j,w,d,z+.4,.09,'sun');
      for(let k=0;k<4;k++)oval(H,R,...H.p(i+.46,j+.9,z+.54+k*.07),11,4,'paper',1);
      metal(H,R,i+.11,j+.4,.67,.65,z+.01,.25,'sun');
    }else{
      panelFront(H,R,i,j+d,w,z,.75,1,'teal');
      shape(H,R,H.faceI(i+.05,j+d+.02,w-.1,z+.82,z+1.05),'sun',.47);
      H.line(R,[H.p(i+w*.38,j+d+.035,z+.93),H.p(i+w*.64,j+d+.035,z+.93)],'blue',2);
    }
  });
  timber(H,R,3.59,3.38,4.18,1.93,1.2,.13,'sun');
  bentTube(H,R,[[3.9,5.36,.21],[3.9,5.36,.32],[7.43,5.36,.32],[7.43,5.36,.21]],2.5,'sun');
  metal(H,R,3.7,3.45,3.95,1.68,1.29,.045,'paper');
  H.line(R,[H.p(3.7,5.14,1.34),H.p(7.65,5.14,1.34)],'teal',2.2);
  metal(H,R,5.47,3.65,1.65,.56,1.35,.045,'teal');
  shape(H,R,H.tile(5.93,4.44,.78,.72,1.344),'blue',.25);
  oval(H,R,...H.p(6.32,4.8,1.35),13,6,'sun',.35);
  cup(H,R,6.32,4.8,1.39);
  const [cx,cy]=H.p(6.32,4.8,1.39);
  shape(H,R,[[cx-7,cy-10],[cx+7,cy-10],[cx+6,cy-28],[cx-6,cy-28]],'blue',.55);
  oval(H,R,cx,cy-28,6,2.8,'blue',.78);
  H.line(R,[[cx-4,cy-25],[cx-4,cy-18]],'paper',1.2);
  H.line(R,[[cx-8,cy-10],[cx+8,cy-10]],'paper',1.3);
  oval(H,R,...H.p(6.8,4.8,1.35),8,4,'paper',1);
  bentTube(H,R,[[6.5,4.8,1.36],[6.5,4.8,2.54]],1.3,'teal');
  H.line(R,[H.p(6.34,4.8,2.54),H.p(6.65,4.8,2.54)],'sun',1.7);
  H.line(R,[H.p(5.15,4.75,1.36),H.p(5.5,4.83,1.36),H.p(5.67,4.75,1.36)],'blue',1.4);
  oval(H,R,...H.p(5.16,4.75,1.37),4,2,'sun',.6);
  metal(H,R,3.8,3.62,.69,.76,1.35,.48,'teal');
  const grinder=H.p(4.14,3.96,1.86);
  shape(H,R,[[grinder[0]-9,grinder[1]],[grinder[0]-15,grinder[1]-20],[grinder[0]+15,grinder[1]-20],[grinder[0]+9,grinder[1]]],'sun',.7);
  oval(H,R,grinder[0],grinder[1]-20,15,6,'blue',.65);
  H.line(R,[[grinder[0],grinder[1]-23],[grinder[0]+19,grinder[1]-28],[grinder[0]+25,grinder[1]-26]],'blue',2);
  oval(H,R,grinder[0]+25,grinder[1]-30,4,5,'coral',.7);
  shape(H,R,H.faceI(3.89,4.39,.45,1.46,1.68),'sun',.6);
  H.dot(...H.p(4.12,4.4,1.57),1.8,'blue');
  metal(H,R,4.64,3.61,.76,.67,1.35,.06,'teal');
  for(const i of [4.81,5.09]){const q=H.p(i,3.86,1.42);oval(H,R,...q,5,2.7,'paper',1);H.line(R,[[q[0]-4,q[1]],[q[0]-4,q[1]-11],[q[0]+4,q[1]-11],[q[0]+4,q[1]]],'blue',.8);}
  cup(H,R,4.33,4.8,1.36,.75);
  vessel(H,R,4.7,4.15,1.36,10,5,'paper',true);
  cabinetFrame(H,R,9.2,.4,2.15,1.45,.08,3.55,2,'teal',(i,j,w,d,z,h,n)=>{
    for(let row=0;row<4;row++){
      const zz=z+row*.77;
      timber(H,R,i,j,w,d,zz,.1,'sun');
      if(row===0) {panelFront(H,R,i,j+d,w,zz+.1,.58,1,'teal');continue;}
      if(row===1&&n===0){vessel(H,R,i+.34,j+.44,zz+.12,7,15,'coral',false);}
      else if(row===2&&n===1){vessel(H,R,i+.37,j+.42,zz+.12,8,14,'blue',false);H.line(R,[H.p(i+.36,j+.42,zz+.54),H.p(i+.8,j+.42,zz+.54)],'blue',2);}
      else for(let k=0;k<2;k++)cup(H,R,i+.23+k*.35,j+.45,zz+.12,.52);
    }
  });
  timber(H,R,9.12,1.92,2.34,.55,1.25,.12,'sun');
  basin(H,R,9.35,2.18,1.7,1.2,1.1,'paper');
  bentTube(H,R,[[10.2,2.5,.01],[10.2,2.5,.8],[10.5,2.5,1.12]],2.8,'teal');
  drape(H,R,10.6,2.12,.55,.4,1.34,.54,'paper');
  wallRack(H,R,'nw',9.55,1.8,1.8,1.85,2,'sun',(P,z,row)=>{
    if(row===0){for(let n=0;n<3;n++){const q=P(.35+n*.5,z+.2);oval(H,R,...q,6,10,'paper',1);H.line(R,[[q[0]-2,q[1]-6],[q[0]+2,q[1]+4]],'teal',.8);}}
    else {shape(H,R,[P(.25,z+.1),P(1.5,z+.1),P(1.44,z+.48),P(.32,z+.48)],'coral',.55);H.line(R,[P(.42,z+.49),P(.42,z+.65),P(1.21,z+.65),P(1.21,z+.49)],'sun',1.6);}
  });
  benchFrame(H,R,.58,5.28,1.17,2.42,.58,'sun');
  drape(H,R,.61,5.38,1.1,1.84,.61,.16,'coral');
  for(const j of [5.39,7.4])bentTube(H,R,[[.65,j,.6],[.65,j,1.17]],2.3,'teal');
  bentTube(H,R,[[.65,5.36,1.17],[.65,7.4,1.17]],2.5,'sun');
  caneChair(H,R,3.1,8.4,'teal');
  benchFrame(H,R,1.15,8.12,1.65,1.25,.87,'sun');
  for(const x of [1.25,2.58]) bentTube(H,R,[[x,8.3,.08],[x,9.15,.82],[x,8.3,.82],[x,9.15,.08]],1.6,'teal');
  shape(H,R,H.tile(1.3,8.25,1.18,.8,.89),'paper',1);
  for(let k=0;k<5;k++)H.line(R,[H.p(1.42,8.4+k*.09,.905),H.p(2.25,8.4+k*.09,.905)],'blue',.5,{tone:.4});
  metal(H,R,1.32,8.27,.24,.09,.91,.04,'blue');
  vessel(H,R,1,10.4,.03,11,25,'teal',true);
  for(let n=0;n<2;n++)bentTube(H,R,[[1+n*.15,10.4,.2],[1+n*.15,10.4,1.1],[.87+n*.15,10.4,1.22],[.74+n*.15,10.4,1.1]],1.6,'coral');
  oval(H,R,...H.p(3.25,9.85,.3),13,9,'coral',.6);
  H.line(R,[H.p(2.93,9.85,.29),H.p(3.6,9.85,.29)],'paper',1.1);
  metal(H,R,.35,11.38,10.6,.3,.02,.04,'teal');
  for(let n=0;n<28;n++)H.line(R,[H.p(.5+n*.36,11.4,.07),H.p(.5+n*.36,11.62,.07)],'blue',.7);
  for(const i of [8.57,10.64])for(const j of [8.36,9.61])caster(H,R,i,j,.13);
  for(const i of [8.52,10.63])for(const j of [8.3,9.56])bentTube(H,R,[[i,j,.15],[i,j,1.29]],2.1,'teal');
  for(const z of [.32,1.18]){
    metal(H,R,8.45,8.24,2.32,1.46,z,.075,'paper');
    bentTube(H,R,[[8.46,9.7,z+.07],[8.46,8.26,z+.07],[10.77,8.26,z+.07],[10.77,9.7,z+.07]],1.9,'sun');
  }
  bentTube(H,R,[[10.73,8.3,1.24],[11.08,8.3,1.58],[11.08,9.57,1.58],[10.73,9.57,1.24]],2.7,'teal');
  for(const i of [8.83,9.45])for(const j of [8.7,9.21])cup(H,R,i,j,1.27,.72);
  vessel(H,R,10.12,8.91,1.27,9,24,'teal',false);
  const kettle=H.p(10.12,8.91,1.27);
  stroke(H,R,[[kettle[0]-7,kettle[1]-18],[kettle[0]-18,kettle[1]-16],[kettle[0]-16,kettle[1]-4],[kettle[0]-8,kettle[1]-3]],'blue',2);
  shape(H,R,[[kettle[0]+7,kettle[1]-15],[kettle[0]+17,kettle[1]-24],[kettle[0]+20,kettle[1]-23],[kettle[0]+9,kettle[1]-6]],'paper',1);
  drape(H,R,8.65,8.55,.7,.82,.43,.12,'paper');
  for(let k=0;k<4;k++)oval(H,R,...H.p(10.04,9,.43+k*.065),13,5,'paper',1);
  timber(H,R,5.75,9.7,1.5,.85,.04,.42,'teal');
  for(let n=0;n<3;n++)metal(H,R,5.91+n*.4,9.86,.28,.48,.47,.47,n===1?'paper':'sun');
  bentTube(H,R,[[5.79,10.53,.46],[5.79,10.53,.9],[7.16,10.53,.9],[7.16,10.53,.46]],1.5,'teal');
  taskLight(H,R,7.35,3.7,1.37,'coral',.6);
  bentTube(H,R,[[.25,7.8,.15],[.25,7.8,3.9],[.25,3.6,3.9]],1.7,'teal');
  H.line(R,[H.p(.26,5.3,3.85),H.p(.26,5.75,4.1),H.p(.26,6.3,4.15)],'sun',2);
  branchSpray(H,R,...H.p(.28,5.76,4.12),.75,'teal',-1);
}, (H,R,t) => {
  const u=cycle(t,16)*16, lift=ease((u-3.2)/3.2)*(1-ease((u-9.6)/4.4));
  const [x,y]=H.p(6.32,4.8,1.39), lid=[x+lift*6,y-30-lift*3];
  pose.head=12+lift*9;
  const i=5.21875+lift*.09375,j=4.34375-lift*.09375;
  hands(H,i,j,{l:H.p(5.1,4.45,1.33),r:[lid[0],lid[1]-2]});
  H.clip([[-400,-400],[400,-400],[400,124],[-400,124]],()=>actor(H,R,i,j,t,'hanoiCafeLid',{shirt:['paper',1],apron:['teal',.7],hairStyle:'bun'},0,1.5));
  oval(H,R,lid[0],lid[1],8,3.1,'blue',.5);
  H.line(R,[[lid[0]-6,lid[1]-1],[lid[0]+5,lid[1]-1]],'paper',1.2);
  oval(H,R,lid[0],lid[1]-2,2,1.4,'sun',.7);
  steam(H,R,x,y-31,t*5/16,1);
  actor(H,R,3.56,8.82,t,'hanoiCafeGuest',{shirt:['coral',.6],pants:['blue',.65],face:'sw',hairStyle:'short'},.15,1.5);
  branchSpray(H,R,...H.p(.28,5.8+Math.sin(t*Math.PI/8)*.015,4.12),.6,'teal',1);
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
