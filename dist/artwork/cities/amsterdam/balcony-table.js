import { world, box, shape, oval, stroke, actor, wallPt, cycle, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, drape, benchFrame, pendant } from '../materials.js';
import { windowBay, panelFront, floorShadow, specimen, recessedFrame, hangingRail } from '../joinery.js';

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
  timber(H, R, .12, 1.1, 1.23, 8.85, .08, .17, 'teal');
  for(const y of [1.1,3.65,6.25,9.8]) timber(H,R,.12,y,1.23,.14,.25,1.62,'paper');
  for(const z of [.87,1.83]) timber(H,R,.12,1.1,1.26,8.85,z,.12,'paper');
  for(const [j,w,z,h,col] of [[1.28,2.1,.3,.48,'teal'],[4,1.8,.3,.48,'sun'],[6.45,2.9,.3,.48,'coral']]) {
    shape(H,R,H.faceJ(1.37,j,w,z,z+h),col,.35);
    H.line(R,[H.p(1.4,j+.3,z+.3),H.p(1.4,j+w-.3,z+.3)],'blue',1.3);
  }
  for(let n=0;n<6;n++) {
    const [x,y]=H.p(.8,1.45+n*.32,1.2);
    oval(H,R,x,y,10,5,'paper',1);
    H.line(R,[[x-7,y],[x+7,y]],'teal',.7);
  }
  for(let n=0;n<4;n++) box(H,R,.35,4.1+n*.4,.79,.26,.99,.5+n*.05,['coral','paper','teal','sun'][n],.5);
  box(H,R,.31,6.7,.85,1.35,.99,.62,'teal',.6);
  const radio=H.faceJ(1.18,6.85,1.03,1.07,1.48); shape(H,R,radio,'paper',.85);
  for(let n=0;n<7;n++) H.line(R,[H.p(1.2,6.9+n*.12,1.1),H.p(1.2,6.9+n*.12,1.45)],'blue',.6,{tone:.45});
  shape(H,R,H.faceJ(1.21,7.5,.26,1.08,1.24),'coral',.5);
  H.dot(...H.p(1.2,7.97,1.28),2.5,'sun');
  box(H,R,1.32,3.98,.68,1.31,.68,.16,'sun',.55);
  shape(H,R,H.tile(1.39,4.06,.53,1.15,.86),'blue',.32);
  timber(H,R,1.43,4.08,.08,1.11,.87,.06,'paper');
  const spoon=H.p(1.73,4.63,.89);
  oval(H,R,spoon[0],spoon[1]-7,3,4,'paper',1);
  H.line(R,[[spoon[0],spoon[1]-3],[spoon[0]+4,spoon[1]+8]],'paper',2);
  model(H,R,.24,8.4,1.96);
  timber(H,R,1.5,.37,8.8,.72,1.37,.12,'sun');
  for(const x of [1.8,9.7]) H.line(R,[H.p(x,.49,1.38),H.p(x,.13,1.1)],'blue',2);
  for(const [x,ink,s] of [[2,'coral',.6],[8.6,'teal',.85],[9.65,'paper',.55]]) {
    vessel(H,R,x,.7,1.48,8,14,ink,true);
    specimen(H,R,...H.p(x,.7,1.87),s,'teal');
  }
  H.line(R,[H.p(8.65,.65,1.5),H.p(8.6,.66,2.45),H.p(8.78,.7,2.55),H.p(8.83,.78,2.42)],'blue',.8);
  floorShadow(H,3.3,4.2,4.7,3.1,.17);
  benchFrame(H,R,3.4,4.25,4.4,2.45,1.42,'sun');
  timber(H,R,3.42,6.68,4.36,.13,1.13,.19,'sun');
  H.line(R,[H.p(3.6,6.82,1.24),H.p(7.6,6.82,1.24)],'paper',2.4);
  for(const x of [3.63,7.52]) metal(H,R,x,6.56,.18,.3,1.19,.1,'blue');
  chair(H,R,8.4,3.9,true);
  chair(H,R,4.4,2.4,false);
  box(H,R,9.1,9.3,2.35,1.5,0,.7,'teal',.36);
  panelFront(H,R,9.15,10.83,2.2,.08,.53,2,'teal');
  drape(H,R,9.15,9.33,1.1,1.4,.72,.16,'paper');
  model(H,R,9.45,9.75,.75);
  shape(H,R,H.tile(8.8,10.8,1.5,.85,.025),'paper',1);
  for(let n=0;n<3;n++) shape(H,R,H.tile(9+n*.31,10.95,.23,.22,.03),['coral','teal','sun'][n],.7);
  timber(H,R,9.6,2.1,1.62,2.65,0,.9,'paper');
  drape(H,R,9.65,2.15,1.48,.9,.94,.12,'paper');
  vessel(H,R,10.4,2.62,1.03,12,15,'teal',false);
  stroke(H,R,[H.p(10.6,2.68,1.2),H.p(10.91,2.74,1.46),H.p(10.63,2.68,1.6)],'blue',2);
  for(const x of [9.95,10.55]) vessel(H,R,x,3.72,.94,6,9,'paper');
  shape(H,R,H.tile(9.9,4.1,.9,.45,.96),'coral',.3);
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
