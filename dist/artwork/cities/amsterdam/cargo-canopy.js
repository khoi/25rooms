import { world, shape, oval, stroke, box, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, surface, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, taskLight } from '../joinery.js';

const ease = x => { const q = Math.max(0, Math.min(1, x)); return q * q * (3 - 2 * q); };
const opened = t => ease((t - 5.2) / 5.2) * (1 - ease((t - 15.6) / 8.4));
const pose = { ...FIGURES.clips.idle.keys[0][1] };
FIGURES.clips.amsterdamCargoParent = { dur: 1, keys: [[0, pose], [1, pose]] };
function touch(H, R, i, j, target, t, ink = 'coral') {
  Object.assign(pose, FIGURES.clips.idle.keys[0][1], { head: 12, al: 45, el: 60 });
  const [x, y] = H.p(i, j, 0), s = 1.5;
  const dx = (target[0] - x) / s - 5.2, dy = (target[1] - y) / s + 32.5;
  const a = 4.368, b = 4.2, d = Math.min(a + b - .001, Math.hypot(dx, dy));
  const base = Math.atan2(dx, dy), delta = Math.acos(Math.max(-1, Math.min(1, (a * a + d * d - b * b) / (2 * a * d))));
  pose.ar = (base - delta) * 180 / Math.PI;
  pose.er = Math.acos(Math.max(-1, Math.min(1, (d * d - a * a - b * b) / (2 * a * b)))) * 180 / Math.PI;
  actor(H, R, i, j, 0, 'amsterdamCargoParent', { shirt: [ink, .72], hairStyle: 'bun', face: 'se' }, 0, s);
}
function wheel(H, R, i, j, r) {
  const Q = radius => Array.from({ length: 40 }, (_, n) => { const a = n * TAU / 40; return H.p(i + Math.cos(a) * radius, j, .76 + Math.sin(a) * radius); });
  H.outline(R, Q(r), 'blue', 4, { amp: .05 });
  H.outline(R, Q(r - .08), 'paper', 1.2, { amp: .05 });
  for (let n = 0; n < 12; n++) H.line(R, [H.p(i, j, .76), Q(r - .09)[Math.floor(n * 40 / 12)]], 'blue', .65);
  oval(H, R, ...H.p(i, j, .76), 3, 3, 'sun');
}
function helmet(H, R, i, j, z, ink) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 10, y], [x - 11, y - 7], [x - 6, y - 14], [x + 4, y - 14], [x + 11, y - 6], [x + 10, y + 1]], ink, .76);
  for (const d of [-5, 1, 6]) stroke(H, R, [[x + d - 2, y - 10], [x + d, y - 5]], 'blue', 1.1);
  stroke(H, R, [[x - 8, y], [x - 1, y + 10], [x + 8, y]], 'blue', 1);
}
function architecture(H, R) {
  masonry(H, R, 'nw', 0, 12, 0, 3.6, 'paper', .7);
  masonry(H, R, 'ne', 0, 2.1, 0, 4.2, 'teal', .45);
  masonry(H, R, 'ne', 9.5, 2.5, 0, 4.2, 'teal', .45);
  const P = windowBay(H, R, 'nw', 1.0, 5.3, 2.43, .93, { divisions: 4 });
  H.tint([P(.15,.2), P(5.1,.2), P(5.1,.77), P(.15,.77)], 'teal', .14);
  metal(H, R, 1.9, .02, 7.8, .29, 3.65, .29, 'blue');
  for (let x = 2.1; x < 9.5; x += 1.4) bentTube(H, R, [[x,.17,3.7],[x+.65,.17,4.05],[x+1.3,.17,3.7]], 1.6);
  bentTube(H, R, [[.17,11.6,.2],[.17,11.6,3.25],[.17,7.4,3.25],[.17,7.4,3.65]], 1.6, 'teal');
  metal(H, R, 2.1,.15,7.4,.22,.02,.07,'teal');
  for(let n=0;n<24;n++) H.line(R,[H.p(2.2+n*.3,.16,.1),H.p(2.2+n*.3,.35,.1)],'blue',.7);
  floorLight(H, 5, 4, 140, .36);
  H.tint(H.tile(3,3.5,6.5,4.2,.02),'teal',.11);
  cabinetFrame(H,R,.36,.6,8.8,1.45,.15,2.1,4,'teal',(i,j,w,d,z,h,n)=>{
    if(n<2){ timber(H,R,i,j,w,d,z+.85,.08,'sun'); helmet(H,R,i+.55,j+.6,z+.96,n?'sun':'coral'); helmet(H,R,i+1.33,j+.53,z+.96,n?'teal':'paper'); cushion(H,R,i+.12,j+.3,w-.28,.55,z,.3,n?'coral':'sun'); }
    if(n===2){ bentTube(H,R,[[i+.15,j+.5,z+1.56],[i+w-.1,j+.5,z+1.56]],2); for(let k=0;k<2;k++){const [x,y]=H.p(i+.45+k*.8,j+.5,z+1.5); shape(H,R,[[x-3,y],[x+4,y],[x+13,y+9],[x+9,y+20],[x+6,y+12],[x+8,y+46],[x-9,y+46],[x-7,y+13],[x-12,y+19],[x-14,y+10]],k?'coral':'sun',.64); stroke(H,R,[[x,y+6],[x,y+42]],'paper',.9); } }
    if(n===3){ for(let k=0;k<3;k++){metal(H,R,i+.1,j,w-.17,d,.23+k*.27,.22,k?'teal':'sun'); H.line(R,[H.p(i+.5,j+d+.01,.34+k*.27),H.p(i+1.1,j+d+.01,.34+k*.27)],'blue',1.8);} bentTube(H,R,[[i+.7,j+.5,1.2],[i+.7,j+.5,1.8],[i+1.25,j+.5,1.8]],1.4); }
  });
  timber(H,R,.31,.55,9,.15,2.23,.13,'sun');
  const [mx,my]=H.p(7.15,1.13,2.45);
  for(const d of[-9,9]) H.outline(R,Array.from({length:20},(_,n)=>[mx+d+Math.cos(n*TAU/20)*6,my+Math.sin(n*TAU/20)*6]),'coral',1);
  H.line(R,[[mx-9,my],[mx-3,my-10],[mx+9,my],[mx,my],[mx-3,my-10],[mx+3,my-10],[mx+9,my]],'blue',.8);
  hangingRail(H,R,'nw',7.2,3.7,2.55,3,(P,u,n)=>{ const [x,y]=P(u,-.08); if(n===0){shape(H,R,[[x-10,y],[x+9,y],[x+8,y+24],[x-7,y+26]],'teal',.4); for(let k=0;k<4;k++) H.line(R,[[x-7+k*4,y+2],[x-6+k*4,y+22]],'sun',.6);} else {stroke(H,R,[[x,y],[x-4,y+22],[x+5,y+31]],n===1?'sun':'coral',4);} });
  bentTube(H,R,[[1.0,10.7,.02],[1.0,10.7,1.65],[1.25,10.7,1.65]],2.5,'blue');
  bentTube(H,R,[[.8,10.7,1.65],[1.5,10.7,1.65]],3,'coral');
  stroke(H,R,[H.p(1,10.7,.2),H.p(1.6,10.5,.1),H.p(1.7,10.1,.7)],'blue',1.1);
  timber(H,R,.48,8.9,1.35,1.1,.02,.12,'sun');
  for(let n=0;n<3;n++) metal(H,R,.6+n*.35,9.05,.2,.54,.15,.08,n?'teal':'coral');
  for(const z of[.5,1.12]) timber(H,R,.16,2.8,1.25,3.5,z,.1,'teal');
  for(const j of[2.83,6.13]) timber(H,R,.18,j,.14,.15,.1,1.16,'teal');
  for(let n=0;n<4;n++){const j=3+n*.72;const [x,y]=H.p(.9,j,1.24);shape(H,R,[[x-6,y],[x+6,y],[x+5,y-14],[x+1,y-20],[x-6,y-18]],n%2?'coral':'sun',.65);H.line(R,[[x-4,y-7],[x+4,y-7]],'paper',1);}
  cushion(H,R,.32,3.2,.88,1.42,.61,.19,'paper');
  const [nx,ny]=H.p(.2,4.6,2.17); shape(H,R,[[nx-23,ny-15],[nx+22,ny-15],[nx+18,ny+20],[nx-17,ny+21]],'teal',.15);
  for(let n=0;n<7;n++){H.line(R,[[nx-20+n*6,ny-13],[nx-17+n*5.6,ny+19]],'blue',.65);H.line(R,[[nx-19,ny-12+n*5],[nx+20,ny-12+n*5]],'blue',.65);}
  for(const d of[-15,15]) H.dot(nx+d,ny-15,2,'sun');
  for(let n=0;n<2;n++){const [rx,ry]=H.p(.25,6.48+n*.47,2.14);shape(H,R,[[rx-4,ry-12],[rx+4,ry-12],[rx+4,ry+10],[rx-4,ry+10]],n?'sun':'paper',n?.85:.65);H.line(R,[[rx-3,ry-8],[rx+3,ry+5]],'coral',1.4);}
  timber(H,R,2.0,9.24,2.15,1.15,.55,.12,'sun');
  for(const x of[2.12,3.89])for(const y of[9.35,10.14])timber(H,R,x,y,.14,.15,.04,.54,'sun');
  cushion(H,R,2.1,9.32,1.02,.83,.68,.18,'coral');
  for(let n=0;n<4;n++) H.line(R,[H.p(2.17+n*.22,9.34,.88),H.p(2.17+n*.22,10.06,.88)],'sun',1);
  const [bx,by]=H.p(3.57,9.87,.68);shape(H,R,[[bx-10,by],[bx+9,by],[bx+8,by-22],[bx-7,by-22]],'coral',.7);shape(H,R,[[bx-5,by-6],[bx+5,by-6],[bx+5,by-14],[bx-5,by-14]],'sun',.7);stroke(H,R,[[bx-5,by-22],[bx-5,by-29],[bx+5,by-29],[bx+6,by-22]],'blue',1.2);
  metal(H,R,1.4,11.03,9.8,.4,.015,.045,'teal');
  for(let n=0;n<32;n++)H.line(R,[H.p(1.52+n*.3,11.07,.07),H.p(1.52+n*.3,11.38,.07)],'blue',.8);
  timber(H,R,4.9,9.38,.35,.6,.04,.17,'sun');
  H.line(R,[H.p(4.92,9.4,.22),H.p(5.19,9.91,.05)],'blue',.8);
  taskLight(H,R,8.65,1.75,2.3,'coral',.4);
}
function bicycle(H, R) {
  wheel(H,R,8.75,5.9,.77);
  wheel(H,R,3.15,5.5,.68);
  bentTube(H,R,[[3.1,5.5,.76],[5.0,5.75,.43],[7.35,5.9,.65],[8.75,5.9,.76],[7.9,5.9,1.65],[7.35,5.9,.65],[6.8,5.9,1.6],[8,5.9,1.64]],3.2,'teal');
  bentTube(H,R,[[8.75,5.9,.76],[8.14,5.9,1.9],[8.0,5.5,2.02],[8.5,5.2,2.02]],2.4,'blue');
  bentTube(H,R,[[6.8,5.9,1.3],[6.8,5.9,1.94]],2,'blue');
  cushion(H,R,6.47,5.65,.68,.5,1.86,.11,'coral');
  stroke(H,R,[H.p(7.36,5.9,.64),H.p(7.7,6.05,.39),H.p(8,6.04,.4)],'blue',2);
  timber(H,R,5.9,6.3,.55,.4,.02,.1,'sun');
  bentTube(H,R,[[6.2,5.7,.53],[6.2,6.5,.17],[5.98,6.53,.15]],2.7,'blue');
  surface(H,R,H.tile(3.4,4.35,3.08,2.0,.71),'blue',.74);
  for(const j of[4.35,6.35]) { surface(H,R,[H.p(3.4,j,.71),H.p(6.48,j,.71),H.p(6.6,j,1.43),H.p(3.22,j,1.43)],'teal',.65); for(let n=0;n<6;n++) H.line(R,[H.p(3.48+n*.53,j+.01,.78),H.p(3.35+n*.57,j+.01,1.4)],'paper',.7); }
  surface(H,R,[H.p(6.48,4.35,.71),H.p(6.48,6.35,.71),H.p(6.6,6.35,1.43),H.p(6.6,4.35,1.43)],'teal',.72);
  cushion(H,R,5.43,4.59,.83,1.52,.98,.19,'sun');
  cushion(H,R,5.91,4.59,.28,1.52,1.15,.58,'coral');
  shape(H,R,H.faceI(5.93,6.11,.18,1.26,1.43),'sun',.72);
  for(const j of[4.9,5.78]) bentTube(H,R,[[6.02,j,1.68],[5.74,j,1.23],[5.9,5.34,1.17]],1.8,'blue');
  metal(H,R,5.72,5.2,.23,.27,1.17,.07,'paper');
  box(H,R,5.4,4.8,.7,.98,.75,.21,'coral',.65);
  drapedBlanket(H,R);
  for(const i of[3.28,6.53]) for(const j of[4.35,6.35]) oval(H,R,...H.p(i,j,1.46),3,3,'sun');
  timber(H,R,3.23,6.32,3.4,.11,1.4,.1,'sun');
  for(const i of[3.48,4.9,6.15]) H.line(R,[H.p(i,6.43,1.25),H.p(i+.15,6.43,1.29)],'paper',1.3);
}
function drapedBlanket(H,R){
  surface(H,R,H.tile(3.55,4.6,.87,1.32,.76),'coral',.4);
  for(let n=0;n<4;n++) H.line(R,[H.p(3.62+n*.2,4.65,.78),H.p(3.62+n*.2,5.88,.78)],'sun',1.2);
  const [x,y]=H.p(4.2,5.42,1.1); oval(H,R,x,y,5,7,'paper'); oval(H,R,x+3,y-8,5,5,'paper'); for(const d of[-3,5])oval(H,R,x+d,y-12,2,3,'coral'); H.dot(x+5,y-8,.8,'blue');
}
function roof(H,R,t) {
  const f=opened(t), a=f*.64;
  const P=(i,j,z)=>{const x=i-6.58,h=z-1.45;return H.p(6.58+x*Math.cos(a)+h*Math.sin(a),j,1.45-x*Math.sin(a)+h*Math.cos(a));};
  const arch=i=>Array.from({length:17},(_,n)=>P(i,4.35+n*.125,1.45+Math.sin(n*Math.PI/16)*.87));
  for(const i of[3.22,4.85]){const Q=[...arch(i),...arch(i+1.65).reverse()];H.tint(Q,'paper',.27);H.outline(R,Q,'teal',.65,{tone:.65,amp:.05});}
  for(const i of[3.22,4.85,6.58]){H.line(R,arch(i),'blue',2.2,{amp:.05});H.line(R,arch(i).map(([x,y])=>[x-1,y]),'paper',.8,{amp:.05});}
  for(const j of[4.35,6.35])H.line(R,[P(3.22,j,1.45),P(6.58,j,1.45)],'blue',2.2);
  for(const j of[4.75,5.8]) H.line(R,[P(3.5,j,2),P(4.56,j,2)],'paper',2.2,{tone:.7});
  for(const j of[4.35,6.35]) { H.line(R,[H.p(6.15,j,1.18),P(5.65,j,1.45)],'blue',2);oval(H,R,...P(5.65,j,1.45),2.3,2.3,'sun'); }
  const [mx,my]=P(4.6,6.35,1.48); stroke(H,R,[[mx,my],[mx,my+7]],'blue',.7);shape(H,R,[[mx-3,my+6],[mx+3,my+6],[mx+4,my+13],[mx-3,my+15],[mx-5,my+10]],'coral',.7);
  const target=P(6.05,6.35,1.47);
  touch(H,R,6.58,7.02,target,t);
  H.dot(...target,2.4,'coral',.3,{knock:true});
}
const room=world('amsterdam-cargo-canopy','A dry seat',{wall:false,floor:'paper',tone:.32,head:65},(H,R)=>{architecture(H,R);bicycle(H,R);},(H,R,time)=>{
  const t=cycle(time,26)*26;
  roof(H,R,t);
  actor(H,R,9.6,3.0,3*Math.sin(t*Math.PI/26)**2,'hold',{shirt:['sun',.7],hairStyle:'curly',face:'sw',prop:(HH,RR,p)=>{oval(HH,RR,p.nearHand[0],p.nearHand[1]-3,8,6,'coral');}},0,1.32,'child');
  const [x,y]=H.p(9.5,.2,3.8); stroke(H,R,[[x,y],[x+10,y+5],[x+19,y+2+Math.sin(t*TAU/26)*2]],'coral',2);
});
room.loopSeconds=26;
room.stillTime=12.7;
export default room;
