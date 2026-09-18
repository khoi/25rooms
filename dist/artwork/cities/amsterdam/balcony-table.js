import { world, box, shape, oval, stroke, actor, wallPt, cycle, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, drape, benchFrame, pendant } from '../materials.js';
import { windowBay, panelFront, floorShadow, specimen, recessedFrame, hangingRail, radiator, caster } from '../joinery.js';

const rest = { ...FIGURES.clips.idle.keys[0][1] };
const poses = ['amsterdam-balcony-left', 'amsterdam-balcony-right'].map(name => {
  const pose = { ...rest };
  FIGURES.clips[name] = { dur: 22, keys: [[0, pose], [1, pose]] };
  return pose;
});
const ease = (a, b, t) => { const f = Math.max(0, Math.min(1, (t - a) / (b - a))); return f * f * (3 - 2 * f); };
function person(H, R, i, j, t, index, hands, drop, look) {
  const pose = poses[index], root = H.p(i, j), scale = 1.6, mirror = index ? -1 : 1;
  Object.assign(pose, rest, { drop, head: look, ll: -7, lr: 8, kl: -drop * 80, kr: drop * 80 });
  for (const [n, side] of ['l', 'r'].entries()) {
    const sx = (n ? 1 : -1) * 5.2, sy = -32.5 + drop * 19;
    const dx = (hands[n][0] - root[0]) / scale * mirror - sx, dy = (hands[n][1] - root[1]) / scale - sy;
    const d = Math.min(8.54, Math.max(.2, Math.hypot(dx, dy))), a = 4.368, b = 4.2;
    const bend = Math.acos(Math.max(-1, Math.min(1, (a * a + b * b - d * d) / (2 * a * b))));
    const alpha = Math.atan2(dx, dy) - Math.acos(Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d))));
    pose['a' + side] = alpha * 180 / Math.PI;
    pose['e' + side] = 180 - bend * 180 / Math.PI;
  }
  actor(H, R, i, j, t, index ? 'amsterdam-balcony-right' : 'amsterdam-balcony-left', { face: index ? 'sw' : 'se', shirt: [index ? 'coral' : 'teal', .7], pants: ['blue', .68], hairStyle: index ? 'curly' : 'bun', skin: ['coral', index ? .48 : .24] }, 0, scale);
}
function chair(H, R, i, j, coat = false) {
  for (const x of [i, i + .85]) for (const y of [j, j + .8]) timber(H, R, x, y, .1, .1, 0, .76);
  timber(H, R, i, j, .1, .12, .76, .86);
  timber(H, R, i + .85, j, .1, .12, .76, .86);
  timber(H, R, i, j, .95, .12, 1.2, .28);
  timber(H, R, i, j, .95, .9, .73, .1);
  timber(H, R, i + .07, j + .38, .82, .08, .24, .08);
  drape(H, R, i + .05, j + .07, .83, .77, .85, .12, coat ? 'teal' : 'paper');
  if (coat) {
    shape(H, R, H.tile(i + .46, j + .3, .3, .31, .87), 'coral', .43);
    H.line(R, [H.p(i + .56, j + .38, .88), H.p(i + .72, j + .43, .88)], 'paper', 1.1);
    H.dot(...H.p(i + .25, j + .43, .89), 1.8, 'sun');
  }
}
function model(H, R, i, j, z) {
  box(H, R, i, j, 1.1, .75, z, .56, 'paper', 1);
  for (const x of [i + .1, i + .62]) shape(H, R, H.faceI(x, j + .76, .34, z + .17, z + .46), 'teal', .45);
  timber(H, R, i + .49, j + .76, .55, .35, z + .15, .055, 'coral');
  for (const x of [i + .49, i + 1.04]) H.line(R, [H.p(x, j + 1.08, z + .2), H.p(x, j + 1.08, z + .4)], 'blue', .9);
  H.line(R, [H.p(i + .49, j + 1.08, z + .4), H.p(i + 1.04, j + 1.08, z + .4)], 'blue', .9);
}
const room = world('amsterdam-balcony-table', 'The table follows the window', { floor: 'paper', tone: .25, wall: 'paper', wallTone: .85, height: 3.7, pattern: 'boards', head: 45 }, (H, R) => {
  H.tint(H.tile(2, .4, 9, 6, .018), 'sun', .09);
  for (let x = 0; x < 12; x += .5) shape(H, R, H.tile(x, 11.35, .42, .38, .016), x % 1 ? 'coral' : 'teal', .24, .4);
  windowBay(H, R, 'ne', 1.15, 10.35, 1.65, 1.78, { divisions: 5, ink: 'paper', view: P => {
    shape(H, R, [P(.12,.13), P(10.2,.13), P(10.2,.7), P(.12,.7)], 'teal', .14);
    for (let k = 0; k < 4; k++) {
      const x = .8 + k * 2.3;
      shape(H, R, [P(x,.35),P(x+1.35,.35),P(x+1.35,1.02),P(x,1.02)], 'paper', 1);
      for(let y=.45;y<.95;y+=.19) H.line(R,[P(x+.12,y),P(x+1.2,y)],'blue',1,{tone:.25});
    }
  }});
  timber(H, R, 1.12, .1, 10.42, .34, 3.44, .1, 'paper');
  for(const x of [1.25,9.43]){
    const P=(u,z)=>H.p(x+u,.29,z);
    shape(H,R,[P(0,3.4),P(1.76,3.4),P(1.76,3.03),P(0,3.11)],'paper',1);
    for(let n=0;n<5;n++)H.line(R,[P(.06,3.11+n*.054),P(1.69,3.04+n*.062)],'teal',.65);
    H.line(R,[P(0,3.1),P(1.76,3.02)],'sun',2);
  }
  for(const x of [5.3,9.37]){
    H.line(R,[H.p(x,.32,1.76),H.p(x+.33,.59,1.93),H.p(x+.61,.33,1.96)],'blue',1.3);
    H.dot(...H.p(x+.33,.59,1.93),1.8,'sun');
  }
  for (let x = 1.2; x < 11.45; x += .25) H.line(R, [H.p(x,.16,3.42),H.p(x,.17,3.27)], 'blue', .5, {tone:.3});
  recessedFrame(H,R,'nw',2.65,3.8,2.28,.95,'teal',P=>{
    shape(H,R,[P(.12,.12),P(3.68,.12),P(3.68,.83),P(.12,.83)],'paper',1);
    for(let n=0;n<3;n++){
      const x=.32+n*1.1;
      shape(H,R,[P(x,.2),P(x+.79,.2),P(x+.79,.63),P(x,.63)],['sun','coral','teal'][n],.3);
      H.line(R,[P(x+.15,.27),P(x+.39,.51),P(x+.63,.26)],'blue',.8);
      H.dot(...P(x+.39,.53),1.5,'coral');
    }
  });
  hangingRail(H,R,'nw',7.45,2.9,3.18,3,(P,u,n)=>{
    shape(H,R,[P(u-.24,-.19),P(u+.26,-.19),P(u+.31,-.86),P(u-.3,-.86)],n===1?'paper':'teal',n===1?1:.37);
    H.line(R,[P(u-.16,-.45),P(u+.16,-.45)],'sun',1.1);
  });
  shape(H,R,H.faceJ(.15,1.08,8.9,.12,2.04),'blue',.61);
  for(const y of [1.1,3.65,6.25,9.8]) timber(H,R,.12,y,1.38,.15,.12,1.96,'teal');
  for(const z of [.12,.88,1.95]) timber(H,R,.1,1.08,1.44,8.91,z,.13,'sun');
  for(const [j,w,col] of [[1.29,2.15,'teal'],[3.84,2.23,'sun'],[6.44,3.19,'coral']]) {
    shape(H,R,H.faceJ(1.53,j,w,.27,.76),col,.43);
    shape(H,R,H.faceJ(1.545,j+.12,w-.24,.36,.67),col,.22);
    H.line(R,[H.p(1.57,j+.35,.57),H.p(1.57,j+w-.35,.57)],'blue',2);
    for(const yy of [j+.12,j+w-.12]) H.dot(...H.p(1.57,yy,.48),1.4,'sun');
  }
  for(let n=0;n<6;n++) {
    const y=1.45+n*.32;
    timber(H,R,.38,y,.94,.045,1.01,.12,'sun');
    const [x,yy]=H.p(.88,y,1.47);
    oval(H,R,x,yy,10,15,'paper',1);
    oval(H,R,x,yy,7,11,'teal',.17);
    H.line(R,[[x-5,yy+8],[x+4,yy-8]],'paper',1.3);
  }
  for(let n=0;n<5;n++) {
    box(H,R,.32,4.04+n*.35,.86,.23,1.02,.51+n%2*.13,['coral','paper','teal','sun','paper'][n],.57);
    H.line(R,[H.p(1.19,4.12+n*.35,1.1),H.p(1.19,4.12+n*.35,1.48)],'paper',1);
  }
  box(H,R,.31,6.7,.99,1.35,1.03,.62,'teal',.6);
  shape(H,R,H.faceJ(1.32,6.83,1.06,1.1,1.52),'paper',.85);
  for(let n=0;n<7;n++) H.line(R,[H.p(1.34,6.9+n*.12,1.13),H.p(1.34,6.9+n*.12,1.48)],'blue',.7,{tone:.45});
  shape(H,R,H.faceJ(1.35,7.49,.26,1.11,1.28),'coral',.6);
  for(let n=0;n<3;n++)H.line(R,[H.p(1.36,7.51+n*.08,1.12),H.p(1.36,7.51+n*.08,1.26)],'paper',.6);
  H.dot(...H.p(1.35,7.99,1.34),2.5,'sun');
  stroke(H,R,[H.p(.6,8.04,1.06),H.p(.45,8.28,1.04),H.p(.23,8.29,.48)],'blue',.8);
  box(H,R,.18,8.33,.77,1.15,1.03,.18,'paper',1);
  shape(H,R,H.tile(.31,8.43,.48,.81,1.23),'blue',.75);
  H.line(R,[H.p(.49,8.52,1.25),H.p(.49,9.1,1.25)],'teal',2);
  for(let n=0;n<3;n++)drape(H,R,.31,8.47,.94,.91,1.32+n*.14,.09,['paper','teal','paper'][n]);
  box(H,R,1.49,3.98,.68,1.31,.68,.16,'sun',.55);
  shape(H,R,H.tile(1.55,4.06,.53,1.15,.86),'blue',.32);
  timber(H,R,1.43,4.08,.08,1.11,.87,.06,'paper');
  const spoon=H.p(1.73,4.63,.89);
  oval(H,R,spoon[0],spoon[1]-7,3,4,'paper',1);
  H.line(R,[[spoon[0],spoon[1]-3],[spoon[0]+4,spoon[1]+8]],'paper',2);
  for(const y of [1.5,2.55,5.65]){
    const [x,yy]=H.p(.75,y,2.12);
    oval(H,R,x,yy,10,4,'paper',1);
    oval(H,R,x,yy-3,8,3,'sun',.3);
    stroke(H,R,[[x-7,yy-4],[x-5,yy-12],[x+5,yy-12],[x+7,yy-4]],'blue',1.2);
  }
  model(H,R,.24,8.4,2.09);
  for(const y of [3.7,4.2,4.65]){
    box(H,R,.18,y,.72,.29,2.09,.72,'paper',1);
    shape(H,R,H.faceJ(.91,y+.045,.2,2.2,2.61),'coral',.38);
  }
  timber(H,R,.12,10.3,1.43,1.2,.07,.13,'teal');
  for(const y of [10.36,11.15]){
    const p=H.p(.8,y,.24);
    shape(H,R,[[p[0]-13,p[1]],[p[0]+12,p[1]+1],[p[0]+12,p[1]-6],[p[0]+2,p[1]-12],[p[0]-10,p[1]-10]],'coral',.57);
    H.line(R,[[p[0]-8,p[1]-7],[p[0]+2,p[1]-6]],'paper',1.3);
  }
  radiator(H,R,'ne',3.48,3.8,.85);
  shape(H,R,H.faceI(3.65,.57,1.02,.32,.93),'paper',1);
  for(let n=0;n<4;n++)H.line(R,[H.p(3.76+n*.22,.58,.4),H.p(3.76+n*.22,.58,.88)],'coral',1.2);
  timber(H,R,1.5,.37,8.8,.72,1.37,.12,'sun');
  for(const x of [1.8,9.7]) H.line(R,[H.p(x,.49,1.38),H.p(x,.13,1.1)],'blue',2);
  for(const [x,ink,s] of [[2,'coral',.6],[8.6,'teal',.85],[9.65,'paper',.55]]) {
    vessel(H,R,x,.7,1.48,8,14,ink,true);
    specimen(H,R,...H.p(x,.7,1.87),s,'teal');
  }
  H.line(R,[H.p(8.65,.65,1.5),H.p(8.6,.66,2.45),H.p(8.78,.7,2.55),H.p(8.83,.78,2.42)],'blue',.8);
  floorShadow(H,3.3,4.2,4.7,3.1,.17);
  benchFrame(H,R,3.4,4.25,4.4,2.45,1.42,'sun');
  for(const x of [3.7,7.35]){
    timber(H,R,x,4.46,.12,1.97,.22,.11,'teal');
    H.line(R,[H.p(x,4.48,.31),H.p(x,6.28,1.19)],'blue',2.1);
  }
  timber(H,R,3.8,5.27,3.55,.18,.46,.15,'sun');
  shape(H,R,H.faceI(4.54,6.59,2.07,.9,1.21),'teal',.42);
  shape(H,R,H.faceI(4.65,6.61,1.86,.95,1.15),'teal',.21);
  oval(H,R,...H.p(5.61,6.63,1.05),8,2.5,'blue',.65);
  timber(H,R,3.42,6.68,4.36,.13,1.13,.19,'sun');
  drape(H,R,3.64,4.37,1.2,.57,1.44,.05,'paper');
  const book=H.tile(6.65,4.39,.77,.55,1.45);
  shape(H,R,book,'teal',.55);
  shape(H,R,H.tile(6.61,4.37,.75,.53,1.49),'paper',1);
  H.line(R,[H.p(6.98,4.39,1.5),H.p(6.98,4.88,1.5)],'blue',.75);
  H.line(R,[H.p(7.53,4.46,1.46),H.p(7.53,4.94,1.46)],'coral',2);
  for(const x of [4,4.3,4.6])oval(H,R,...H.p(x,4.57,1.46),4.4,2.2,'sun',.5);
  H.line(R,[H.p(3.6,6.82,1.24),H.p(7.6,6.82,1.24)],'paper',2.4);
  for(const x of [3.63,7.52]) metal(H,R,x,6.56,.18,.3,1.19,.1,'blue');
  chair(H,R,8.4,3.9,true);
  chair(H,R,4.4,2.4,false);
  for(const x of [8.95,11.28])for(const y of [9.38,10.69])timber(H,R,x,y,.16,.17,.05,.63,'teal');
  timber(H,R,8.96,9.4,2.5,1.39,.18,.1,'teal');
  for(let n=0;n<4;n++)box(H,R,9.15,9.58+n*.22,1.56,.18,.3,.25,['coral','paper','teal','sun'][n],.5);
  timber(H,R,8.91,9.32,2.61,1.62,.66,.14,'sun');
  drape(H,R,9.02,9.4,.83,1.44,.83,.2,'paper');
  model(H,R,9.68,9.54,.83);
  shape(H,R,H.tile(8.8,10.98,2.15,.69,.027),'paper',1);
  for(let n=0;n<3;n++) shape(H,R,H.tile(9+n*.39,11.1,.28,.25,.04),['coral','teal','sun'][n],.7);
  shape(H,R,H.tile(10.37,11.1,.4,.31,.045),'teal',.2);
  H.line(R,[H.p(10.4,11.12,.055),H.p(10.71,11.35,.055)],'coral',1.1);
  const tree=H.p(10.96,10.02,.85);
  H.line(R,[tree,[tree[0],tree[1]-26]],'sun',2);
  shape(H,R,[[tree[0],tree[1]-42],[tree[0]-13,tree[1]-23],[tree[0]-5,tree[1]-25],[tree[0]-13,tree[1]-15],[tree[0]+13,tree[1]-15],[tree[0]+6,tree[1]-25],[tree[0]+12,tree[1]-23]],'teal',.48);
  for(const [x,y] of [[9.82,10.48],[10.42,10.51]]){
    timber(H,R,x,y,.32,.29,.86,.09,'coral');
    timber(H,R,x,y,.32,.05,.94,.28,'coral');
  }
  for(const x of [9.61,11.09])for(const y of [2.16,4.61]){
    metal(H,R,x,y,.095,.1,.1,1.02,'teal');caster(H,R,x+.05,y+.05,.12);
  }
  timber(H,R,9.57,2.12,1.67,2.65,.4,.1,'sun');
  timber(H,R,9.57,2.12,1.67,2.65,1.03,.13,'sun');
  for(let n=0;n<3;n++)drape(H,R,9.74,3.55,1.23,.89,.54+n*.11,.06,n===1?'coral':'paper');
  for(let n=0;n<3;n++)oval(H,R,...H.p(10.35,2.81,.58+n*.08),14,6,'paper',1);
  drape(H,R,9.65,2.17,1.49,.76,1.18,.15,'paper');
  vessel(H,R,10.4,2.62,1.21,12,15,'teal',false);
  stroke(H,R,[H.p(10.6,2.68,1.4),H.p(10.91,2.74,1.66),H.p(10.63,2.68,1.8)],'blue',2);
  for(const x of [9.95,10.55]){
    oval(H,R,...H.p(x,3.72,1.19),8,4,'paper',1);
    vessel(H,R,x,3.72,1.2,6,9,'paper');
  }
  drape(H,R,9.8,4.11,1.14,.47,1.18,.05,'coral');
  for(let n=0;n<3;n++){
    const p=H.p(10+n*.29,4.3,1.21);
    H.line(R,[[p[0],p[1]-7],[p[0]+4,p[1]+6]],'paper',1.6);
    oval(H,R,p[0],p[1]-9,2.5,3.7,'paper',1);
  }
  H.line(R,[H.p(9.6,2.2,1.19),H.p(9.6,2.2,1.48),H.p(11.16,2.2,1.48),H.p(11.16,2.2,1.19)],'teal',2.4);
  pendant(H,R,6,4.4,3.9,2.55,'coral',.85);
  H.line(R,[H.p(11.65,8.2,.04),H.p(11.65,11.6,.04)],'blue',2.5);
}, (H, R, t) => {
  const u=cycle(t,22)*22, lift=ease(4.4,8.8,u)*(1-ease(13.2,20,u)), angle=(1-lift)*Math.PI/2;
  const j=6.72+1.2*Math.cos(angle), z=1.42-1.2*Math.sin(angle);
  const leaf=[H.p(3.4,6.72,1.42),H.p(7.8,6.72,1.42),H.p(7.8,j,z),H.p(3.4,j,z)];
  for(const x of [3.95,7.15]) {
    const a=H.p(x,6.64,1.19), b=H.p(x,6.9+.64*lift,1.13-.62*(1-lift)), c=H.p(x,j-.1,z-.1);
    H.line(R,[a,b,c],'blue',2.7);
    for(const p of [a,b,c]) H.dot(...p,2.4,'paper',1,{knock:true});
  }
  shape(H,R,leaf,'sun',.51);
  for(let x=3.6;x<7.75;x+=.65) H.line(R,[H.p(x,6.74,1.43),H.p(x,j,z+.015)],'coral',.55,{tone:.5});
  shape(H,R,[H.p(3.4,j,z),H.p(7.8,j,z),H.p(7.8,j,z-.09),H.p(3.4,j,z-.09)],'sun',.7);
  oval(H,R,...H.p(5.6,j+.015,z-.03),7,2.4,'blue',.5);
  const drop=.72*(1-lift), actorJ=j+.18;
  person(H,R,3.12,actorJ,u,0,[H.p(3.38,j,z),H.p(3.55,j,z)],drop,-5*ease(9,11,u)*(1-ease(13,15,u)));
  person(H,R,8.08,actorJ,u,1,[H.p(7.65,j,z),H.p(7.82,j,z)],drop,10*ease(9,11,u)*(1-ease(13,15,u)));
  const sway=Math.sin(u*Math.PI*2/22)*.05;
  stroke(H,R,[H.p(8.8,.2,3.35),H.p(8.8+sway,.3,2.75),H.p(8.81+sway,.33,2.38)],'blue',.8);
  const anchor=H.p(2.8,.8,3.8);
  H.line(R,[anchor,H.p(2.8,.8,3.12)],'blue',.6);
  for(const [n,x] of [-.38,0,.38].entries()) {
    const a=H.p(2.8+x,.8+sway*n,3.12),b=H.p(2.8+x,.8+sway*n,2.83+n*.08);
    H.line(R,[H.p(2.8,.8,3.12),a,b],'blue',.65);
    oval(H,R,...b,5,3,['coral','teal','sun'][n],.65);
  }
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
