import { world, actor, shape, oval, stroke, ell, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, benchFrame } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, hangingRail, floorShadow, caster, recessedFrame, wallRack, taskLight } from '../joinery.js';

const duration = 24;
const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
const rest = { x: 0, y: 0, drop: 0, lean: 0, head: 0, al: 50, ar: 65, el: 45, er: 40, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
FIGURES.clips.londonStageLanternTech = { dur: duration, keys: [[0, { ...rest }], [.18, { ...rest, ar: 112, er: 35, al: 92, el: 44, head: -8 }], [.4, { ...rest, ar: 115, er: 30, al: 98, el: 40, head: -8 }], [.6, { ...rest, ar: 115, er: 30, al: 98, el: 40, head: -3 }], [.88, { ...rest, ar: 112, er: 35, al: 92, el: 44 }], [.94, { ...rest }], [1, { ...rest }]] };
FIGURES.clips.londonStageLanternGuest = { dur: duration, keys: [[0, { ...rest, al: 15, ar: 15, el: 12, er: 12 }], [.42, { ...rest, al: 15, ar: 15, el: 12, er: 12, head: 2 }], [.5, { ...rest, al: 15, ar: 15, el: 12, er: 12, head: 12 }], [.65, { ...rest, al: 15, ar: 15, el: 12, er: 12, head: 4 }], [1, { ...rest, al: 15, ar: 15, el: 12, er: 12 }]] };

function filter(H, R, i, j, z, ink, repaired = false) {
  const a = H.tile(i, j, .74, .62, z);
  shape(H, R, a, 'blue', .75, .7);
  shape(H, R, H.tile(i + .08, j + .08, .58, .46, z + .01), ink, .52, .45);
  if (repaired) shape(H, R, H.tile(i, j + .46, .19, .16, z + .025), 'paper', 1, .4);
}

function reel(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  for (const dx of [8, 0]) {
    oval(H, R, x + dx, y, 21, 24, 'blue', .8);
    oval(H, R, x + dx, y, 15, 18, 'teal', .45);
    for (let n = 0; n < 4; n++) H.outline(R, ell(x + dx, y, 7 + n * 2, 8 + n * 2.7), 'blue', .8);
  }
  oval(H, R, x, y, 4, 5, 'sun', .8);
  bentTube(H, R, [[i - .45, j, z - .65], [i - .45, j, z + .18], [i + .45, j, z + .18], [i + .45, j, z - .65]], 2.2, 'teal');
}

function lampBody(H, R, closing) {
  const [x, y] = H.p(3.5, 5.9, 2.36);
  const lens = [x + 26, y + 4];
  shape(H, R, [[x - 24, y - 22], [x + 17, y - 17], [x + 28, y - 9], [x + 28, y + 15], [x - 13, y + 12], [x - 26, y + 5]], 'blue', .92, 1.1);
  shape(H, R, [[x - 24, y - 22], [x + 17, y - 17], [x + 24, y - 10], [x - 18, y - 14]], 'teal', .55, .7);
  for (let n = 0; n < 7; n++) H.line(R, [[x - 19 + n * 5, y - 13 + n * .35], [x - 19 + n * 5, y + 4 + n * .35]], 'paper', .7, { tone: .65 });
  stroke(H, R, [[x - 18, y - 1], [x - 23, y + 18], [x + 9, y + 26], [x + 17, y + 8]], 'blue', 5);
  stroke(H, R, [[x - 18, y - 1], [x - 23, y + 18], [x + 9, y + 26], [x + 17, y + 8]], 'teal', 2.5);
  oval(H, R, x + 14, y + 9, 5.3, 4.6, 'coral', .8);
  for (let n = 0; n < 5; n++) H.line(R, [[x + 10, y + 6 + n * 1.2], [x + 18, y + 8 + n * 1.2]], 'paper', .55);
  oval(H, R, ...lens, 9, 14, 'teal', .65);
  oval(H, R, lens[0] + 1, lens[1], 6.2, 11.5, 'sun', .95);
  H.line(R, [[lens[0] - 1, lens[1] - 8], [lens[0] + 1, lens[1] + 6]], 'paper', 1.7);
  shape(H,R,[[x-28,y-18],[x-20,y-16],[x-20,y+2],[x-28,y]],'teal',.5,.6);
  for(const yy of[-14,-7,0])H.line(R,[[x-27,y+yy],[x-22,y+yy+1]],'paper',.7);
  stroke(H,R,[[x-21,y-18],[x-23,y-28],[x-8,y-30],[x-2,y-19]],'blue',3.5);
  stroke(H,R,[[x-21,y-18],[x-23,y-28],[x-8,y-30],[x-2,y-19]],'teal',1.6);
  for(const dx of[-18,7])for(const yy of[-12,4])H.dot(x+dx,y+yy,1.3,'sun');
  H.outline(R,ell(lens[0],lens[1],10.6,15.5),'paper',.7);
  H.line(R,[[x-17,y+17],[x-13,y+21],[x-4,y+20]],'sun',.9);
  const spread = 19 - closing * 10;
  for (const s of [-1, 1]) {
    shape(H, R, [[lens[0] - 7, lens[1] + s * 12], [lens[0] + 8, lens[1] + s * 12], [lens[0] + 19, lens[1] + s * spread], [lens[0] - 1, lens[1] + s * (spread + 6)]], 'blue', .87, .8);
    H.dot(lens[0] + 1, lens[1] + s * 12, 1.5, 'sun');
  }
  for (const s of [-1, 1]) shape(H, R, [[lens[0] + s * 7, lens[1] - 11], [lens[0] + s * 7, lens[1] + 11], [lens[0] + s * (15 - closing * 4) + 8, lens[1] + 15], [lens[0] + s * (15 - closing * 4) + 8, lens[1] - 12]], 'blue', .84, .7);
  return lens;
}

function reachPose(H, name, pose, i, j, z, scale, face, targets, weight=1) {
  const origin=H.p(i,j,z), mirror=face==='sw'||face==='nw'?-1:1, a=pose.lean*Math.PI/180;
  for(const [side,target] of Object.entries(targets)){
    const sign=side==='l'?-1:1, sx=-Math.sin(a)*15+sign*5.2*Math.cos(a)-1.5*Math.sin(a), sy=pose.drop*19-19-Math.cos(a)*15+sign*5.2*Math.sin(a)+1.5*Math.cos(a);
    const dx=(target[0]-origin[0])/scale*mirror-sx,dy=(target[1]-origin[1])/scale-sy,L=4.368,M=4.2,d=Math.min(L+M-.001,Math.max(.01,Math.hypot(dx,dy))),bend=Math.acos(Math.max(-1,Math.min(1,(d*d-L*L-M*M)/(2*L*M))));
    const angle=(Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(L*L+d*d-M*M)/(2*L*d)))))*180/Math.PI;
    pose['a'+side]+= (angle-pose['a'+side])*weight;
    pose['e'+side]+=(bend*180/Math.PI-pose['e'+side])*weight;
  }
  FIGURES.clips[name]={dur:duration,keys:[[0,pose],[1,pose]]};
}

const room = world('london-stage-lantern', 'The beam finds the mark', { floor: 'blue', tone: .18, wall: false, head: 58 }, (H, R) => {
  masonry(H, R, 'nw', 0, 12, 0, 4.15, 'teal', .43);
  masonry(H, R, 'ne', 0, 12, 0, 4.15, 'blue', .47);
  for (const j of [1, 3.5, 6, 8.5, 11]) H.line(R, [H.p(0, j), H.p(12, j)], 'blue', .65, { tone: .4 });
  for (const i of [2, 6, 10]) H.line(R, [H.p(i, 0), H.p(i, 12)], 'blue', .55, { tone: .3 });
  windowBay(H, R, 'nw', 1.2, 4.3, 3.02, .88, { divisions: 4, view: P => shape(H, R, [P(.12,.15),P(4.2,.15),P(4.2,.52),P(.12,.72)], 'sun', .19) });
  for (const j of [.18, 2.55]) {
    bentTube(H, R, [[.18, j, 4.1], [6, j, 4.5], [11.7, j, 4.1]], 3.8, 'blue');
    bentTube(H, R, [[.18, j, 4.1], [11.7, j, 4.1]], 3, 'teal');
    for (let i = .3; i < 11; i += 2.8) bentTube(H, R, [[i, j, 4.1], [i + 1.4, j, 4.39], [i + 2.8, j, 4.1]], 1.2, 'teal');
  }
  for(const j of[.18,5.92,11.72]){metal(H,R,.08,j,.17,.17,.03,4.1,'teal');bentTube(H,R,[[.18,j,3.39],[1.18,j,4.12]],2.7,'teal');}
  metal(H,R,.21,10.35,.19,1.01,1.01,.89,'paper');
  for(const j of[10.55,10.95]){const[x,y]=H.p(.42,j,1.53);oval(H,R,x,y,4.5,6,'blue',.85);H.line(R,[[x-2,y-2],[x-2,y+2]],'sun',1);H.line(R,[[x+2,y-2],[x+2,y+2]],'sun',1);}
  stroke(H,R,[H.p(.42,10.55,1.5),H.p(.57,10.7,.55),H.p(1.32,9.76,.09)],'blue',2.1);
  benchFrame(H,R,.38,1.1,1.55,4.5,1.07,'teal');
  timber(H,R,.57,1.3,1.15,4.02,.26,.09,'sun');
  for(const j of[1.46,3.05]){metal(H,R,.55,j,1.17,1.31,.42,.4,'blue');for(const jj of[j+.12,j+1.1])metal(H,R,1.73,jj,.04,.14,.47,.28,'sun');H.line(R,[H.p(1.78,j+.48,.64),H.p(1.78,j+.86,.64)],'paper',2.2);}
  taskLight(H,R,.77,1.55,1.1,'sun',.56);
  filter(H,R,.72,2.39,1.09,'coral');filter(H,R,.64,3.13,1.12,'teal',true);
  {
  const[ax,ay]=H.p(1.15,4.47,1.13);shape(H,R,[[ax-10,ay],[ax+10,ay],[ax+9,ay-17],[ax-9,ay-17]],'paper',1,.7);oval(H,R,ax,ay-9,5,5,'blue',.7);H.line(R,[[ax-6,ay-3],[ax+6,ay-3]],'sun',1.2);
  }
  recessedFrame(H,R,'nw',1.05,4.4,1.59,1.09,'sun',Q=>{
    for(let n=0;n<4;n++){const[x,y]=Q(.5+n*1.04,.61);shape(H,R,[[x-9,y-11],[x+9,y-11],[x+9,y+11],[x-9,y+11]],n%2?'coral':'paper',.8,.6);oval(H,R,x,y,5,5,'blue',.7);H.line(R,[[x-4,y+3],[x+4,y-3]],'sun',1.3);}
  });
  for(const i of[1.12,4.9]){metal(H,R,i,.39,.14,.15,.06,3.55,'teal');metal(H,R,i,.38,.78,.18,.09,.14,'teal');}
  bentTube(H,R,[[1.12,.47,3.53],[5.02,.47,3.53]],3,'blue');
  for(let n=0;n<4;n++){
    const i=1.62+n*.9,j=.62+n*.07,[x,y]=H.p(i,j,.34),top=H.p(i,j,3.34);
    shape(H,R,[[x-9,y],[x+9,y],[top[0]+9,top[1]],[top[0]-9,top[1]]],n%2?'paper':'coral',n%2?1:.47,.7);oval(H,R,top[0],top[1],9,3.5,'sun',.65);oval(H,R,top[0],top[1],3,1.5,'blue',.7);
    H.line(R,[[x-5,y-5],[top[0]-5,top[1]+5]],n%2?'teal':'paper',1.2);H.line(R,[[x-9,y-19],[x+9,y-19]],'teal',2.2);
  }
  hangingRail(H,R,'nw',6.4,3.8,3.15,4,(P,u,n)=>{ const[x,y]=P(u,-.3); shape(H,R,[[x-12,y-9],[x+12,y-9],[x+12,y+16],[x-12,y+16]],n%2?'coral':'sun',.44,.7); oval(H,R,x,y+3,8,8,'blue',.65); if(n===1)H.line(R,[[x,y+9],[x,y-4],[x-5,y],[x,y-3],[x+5,y]],'paper',1.3); else H.line(R,[[x-5,y+4],[x+5,y+4]],'paper',1.1); });
  for(const j of[6.5,7.9,9.3]){const a=wallPt(H,'nw',j,3.5,-.4),b=wallPt(H,'nw',j+.45,3.5,-.4);H.line(R,[a,b],'blue',4);stroke(H,R,[a,[a[0]+4,a[1]+15],[b[0]+3,b[1]+12],b],'sun',1.1);}
  const conduit = [H.p(.18, 11.6, .13), H.p(.18, 11.6, 3), H.p(.18, 7.7, 3), H.p(.18, 7.7, 4.1)];
  H.line(R, conduit, 'paper', 2.2);
  for (const j of [8.3, 9.8, 11.3]) H.line(R, [H.p(.14, j, 2.92), H.p(.22, j, 3.06)], 'blue', 2.2);
  rackFrame(H, R, 7.35, .5, 4, 1.38, .12, [.42, 1.35, 2.35, 3.25], 'teal', (i, j, w, d, z, row) => {
    if (row === 0) {
      for (let n = 0; n < 2; n++) { metal(H, R, i + n * 1.8, j, 1.6, d, z, .58, 'blue'); for (const x of [.1, 1.42]) metal(H, R, i + n * 1.8 + x, j + d, .08, .04, z + .04, .48, 'sun'); stroke(H, R, [H.p(i+n*1.8+.57,j+d+.03,z+.4),H.p(i+n*1.8+.57,j+d+.08,z+.25),H.p(i+n*1.8+1,j+d+.08,z+.25),H.p(i+n*1.8+1,j+d+.03,z+.4)],'paper',1.2); }
    } else if (row === 1) {
      for (let n = 0; n < 6; n++) { const x=i+n*.24; shape(H,R,H.faceJ(x,j,d,z,z+.62),n%2?'coral':'sun',.55,.65); }
      drape(H,R,i+1.7,j,1.75,d,z+.2,.13,'paper');
    } else if (row === 2) {
      for (let n = 0; n < 3; n++) { const [x,y]=H.p(i+.42+n*1.03,j+.7,z+.25); oval(H,R,x,y,14,13,n%2?'coral':'sun',.62); oval(H,R,x,y,5,4,'blue',.8); H.line(R,[[x-4,y-11],[x+3,y+10]],'paper',1); }
    } else {
      const P=(a,b)=>H.p(i+a,j+.68,z+b); shape(H,R,[P(.1,0),P(.1,.48),P(.55,.78),P(1,.48),P(1,0)],'paper',1,.65); shape(H,R,[P(.37,0),P(.37,.38),P(.66,.38),P(.66,0)],'blue',.7,.5); for(let n=0;n<3;n++)metal(H,R,i+1.65+n*.62,j,.46,d,z,.3+n*.12,n%2?'coral':'teal');
    }
  });
  hangingRail(H,R,'ne',7.55,3.65,4,4,(P,u,n)=>{const [x,y]=P(u,-.25);for(let k=0;k<3;k++)H.outline(R,ell(x,y+9,8+k*2,12+k*2),'sun',1,{tone:.7});H.line(R,[P(u,0),P(u,-.18)],'blue',1.4);});
  for(const j of[.7,1.7]) { timber(H,R,5.8,j,.16,1.7,0,2.3,'sun'); }
  for(let k=0;k<6;k++)timber(H,R,5.8,.7+k*.26,.9,.12,k*.33,.11,'sun');
  timber(H,R,5.8,.7,.13,.17,0,2.3,'sun');timber(H,R,6.57,.7,.13,.17,0,2.3,'sun');
  metal(H,R,.4,8.65,1.75,1.35,.28,.12,'teal');for(const i of[.5,2.02])for(const j of[8.8,9.82])caster(H,R,i,j);
  reel(H,R,1.1,9.3,1.0);
  stroke(H,R,[H.p(1.2,9.7,.06),H.p(2.2,9.3,.05),H.p(2.5,7.4,.05),H.p(3.4,6,.08),H.p(3.45,5.95,2.35)],'blue',2);
  for (const [i,j] of [[2.8,5.25],[4.2,5.7],[3.55,6.85]]) bentTube(H,R,[[3.5,5.9,1.22],[i,j,.12]],4,'blue');
  bentTube(H,R,[[3.5,5.9,.1],[3.5,5.9,2.85]],4,'blue');
  for(const z of[.65,1.5,2.1]) {metal(H,R,3.4,5.8,.2,.2,z,.13,'teal');const[x,y]=H.p(3.48,6.02,z+.05);H.line(R,[[x,y],[x+8,y+2]],'sun',2);}
  shape(H,R,[H.p(3.7,6.05,.1),H.p(4.47,6.13,.1),H.p(4.38,6.72,.2),H.p(3.85,6.68,.35),H.p(3.62,6.36,.22)],'coral',.63,.9);
  H.line(R,[H.p(3.84,6.18,.28),H.p(4.31,6.56,.27)],'paper',.9);
  benchFrame(H,R,6.6,5.05,3.25,2.8,.62,'blue');
  for(const i of[6.83,8.11,9.43])timber(H,R,i,5.25,.08,2.3,.19,.2,'sun');
  for(const j of[5.25,7.34]){bentTube(H,R,[[6.9,j,.16],[9.31,j,.53]],1.2,'teal');}
  shape(H,R,H.faceI(6.77,7.83,2.94,.23,.55),'teal',.5,.75);
  shape(H,R,H.faceI(7.39,7.85,1.55,.24,.46),'blue',.82,.55);
  for(let n=0;n<3;n++){const[x,y]=H.p(7.68+n*.43,7.89,.31);H.line(R,[[x-3,y],[x-3,y-7],[x+3,y-7],[x+3,y]],'sun',1.2);H.dot(x,y-11,2,'paper');}

  shape(H,R,H.tile(6.75,5.2,2.95,2.45,.65),'blue',.83,.8);
  const P=(i,j,z)=>H.p(i,j,z);
  shape(H,R,[P(6.85,5.22,.65),P(9.55,5.22,.65),P(9.55,5.22,2.52),P(6.85,5.22,2.52)],'paper',1,.9);
  shape(H,R,[P(6.85,5.22,.65),P(6.85,6.05,.65),P(6.85,6.05,2.14),P(6.85,5.22,2.52)],'sun',.35,.8);
  shape(H,R,[P(9.55,5.22,.65),P(9.55,6.55,.65),P(9.55,6.55,2.22),P(9.55,5.22,2.52)],'coral',.35,.8);
  for(const i of[6.91,9.37]){
    shape(H,R,[P(i,5.4,.67),P(i+.12,5.4,.67),P(i+.12,5.4,2.43),P(i,5.4,2.43)],'coral',.47,.55);
    shape(H,R,[P(i,5.6,.69),P(i,6.38,.69),P(i,5.6,1.68)],'sun',.34,.6);
  }
  shape(H,R,[P(6.91,5.4,2.25),P(9.48,5.4,2.25),P(9.48,5.4,2.45),P(6.91,5.4,2.45)],'teal',.59,.65);
  for(let n=0;n<6;n++)H.line(R,[P(7.03+n*.39,5.42,2.28),P(7.18+n*.39,5.42,2.41)],'sun',.8);
  shape(H,R,[P(7.25,5.3,.65),P(7.3,5.3,1.87),P(8.21,5.3,1.97),P(8.17,5.3,.65)],'teal',.7,.7);
  shape(H,R,[P(7.44,5.32,.65),P(7.48,5.32,1.7),P(8.03,5.32,1.76),P(8.01,5.32,.65)],'blue',.8,.6);
  for(const j of[5.4,6.0,6.7]) {shape(H,R,[P(8.75,j,.65),P(8.65,j,1.5),P(8.95,j,1.8),P(9.23,j,1.5),P(9.18,j,.65)],'paper',1,.55);H.line(R,[P(8.75,j,.72),P(9.16,j,.72)],'sun',1.2);}
  for(let n=0;n<5;n++)H.line(R,[P(7,5.22+n*.43,.67),P(9.3,5.22+n*.43,.67)],'paper',.55,{tone:.45});
  const [ax,ay]=P(7.0,7.5,.31);shape(H,R,[[ax-5,ay],[ax+4,ay],[ax+4,ay-10],[ax-5,ay-10]],'sun',.65,.5);H.dot(ax,ay-15,3,'coral',.7);H.line(R,[[ax,ay-12],[ax,ay-3]],'blue',1.5);
  benchFrame(H,R,6.9,9.55,3.55,1.35,.76,'sun');
  timber(H,R,7.09,9.73,3.13,.98,.22,.08,'teal');
  for(const i of[7.24,8.74]){metal(H,R,i,9.86,1.17,.68,.34,.25,'blue');H.line(R,[P(i+.34,10.57,.47),P(i+.81,10.57,.47)],'paper',1.6);}
  shape(H,R,H.tile(7.01,9.65,3.33,1.11,.78),'paper',1,.55);
  for(const i of[7.92,8.92,9.5])H.line(R,[P(i,9.68,.8),P(i,10.71,.8)],'teal',1.2);
filter(H,R,7.05,9.7,.78,'coral',true);filter(H,R,8.0,9.7,.8,'teal');
  const [gx,gy]=P(9.15,10.15,.82);oval(H,R,gx,gy,14,7,'blue',.8);H.line(R,[[gx,gy+2],[gx,gy-7],[gx-5,gy-2],[gx,gy-5],[gx+6,gy-1]],'paper',1.5);
  shape(H,R,H.tile(9.55,9.74,.63,.9,.81),'paper',1,.6);H.line(R,[P(9.57,9.8,.83),P(9.92,10.47,.84)],'sun',1.6);
  const[rx,ry]=P(5.31,9.69,.17);shape(H,R,[[rx-23,ry],[rx+23,ry],[rx+21,ry-18],[rx-20,ry-20]],'blue',.77,.9);shape(H,R,[[rx-20,ry-20],[rx-26,ry-42],[rx+18,ry-43],[rx+21,ry-18]],'teal',.52,.7);H.line(R,[[rx-20,ry-34],[rx+18,ry-35]],'sun',1.3);
  for(const dx of[-11,1,12]){H.line(R,[[rx+dx,ry-13],[rx+dx,ry-28]],'sun',2.1);H.line(R,[[rx+dx-3,ry-27],[rx+dx+3,ry-27]],'paper',1.8);}
  for(const dx of[-18,18])shape(H,R,[[rx+dx-2,ry-6],[rx+dx+2,ry-6],[rx+dx+2,ry],[rx+dx-2,ry]],'sun',.85,.4);
  stroke(H,R,[[rx-6,ry+1],[rx-6,ry+6],[rx+7,ry+6],[rx+7,ry+1]],'paper',1.5);
  floorShadow(H,10.3,7.5,1.15,1.15,.25);for(const i of[10.25,11.1])bentTube(H,R,[[i,7.5,0],[i,8.1,.75],[i,8.6,0]],2,'teal');drape(H,R,10.2,7.65,1.1,.65,.76,.1,'coral');
  metal(H,R,10.53,8.85,.65,.5,.02,.24,'sun');H.line(R,[P(10.66,8.98,.28),P(11.05,8.98,.28)],'blue',1.2);
  shape(H,R,H.tile(.16,10.6,3.6,.2,.02),'blue',.65,.6);for(let i=.3;i<3.6;i+=.2)H.line(R,[P(i,10.61,.025),P(i,10.77,.025)],'paper',.6);
}, (H, R, time) => {
  const t=((time%duration)+duration)%duration, close=ease(4.8,9.6,t)*(1-ease(14.4,21,t));
  const [x,y]=H.p(3.5,5.9,2.36), target=H.p(8.05,5.3,1.5), width=46-close*24;
  H.tint([[x+34,y-6],[target[0]+width,target[1]-35],[target[0]+width,target[1]+27],[x+34,y+14]],'sun',.14);
  H.tint([[target[0]-width*.55,target[1]-35],[target[0]+width,target[1]-21],[target[0]+width,target[1]+27],[target[0]-width*.55,target[1]+12]],'sun',.31);
  const treeX=target[0]+15,treeY=target[1]+17;
  stroke(H,R,[[treeX,treeY],[treeX,treeY-36],[treeX-17,treeY-55],[treeX-8,treeY-43],[treeX+13,treeY-57]],'blue',3.1,.55);
  const contact=ease(.1,4.8,t)*(1-ease(21,22.8,t)),techPose=FIGURES.sample('londonStageLanternTech',t/duration);
  const tabs={l:[x+31,y-8],r:[x+34,y+14]};
  reachPose(H,'londonStageLanternContact',techPose,3.845,4.905,0,2.2,'sw',tabs,contact);
  actor(H,R,3.845,4.905,t,'londonStageLanternContact',{face:'sw',shirt:['teal',.72],pants:['blue',.8],skin:['coral',.55],hairStyle:'bun',hair:['blue',.9]},0,2.2);
  lampBody(H,R,close);
  actor(H,R,9.7,8.0,t,'londonStageLanternGuest',{face:'sw',shirt:['coral',.75],pants:['blue',.78],skin:['coral',.25],hairStyle:'curly'},0,1.75);
  const flap=.035*Math.sin(t*TAU/duration)*Math.sin(t*TAU/duration);
  drape(H,R,10.15,.64,.85,1.15,2.3+flap,.64,'paper');
  stroke(H,R,[H.p(3.46,5.9,2.15),H.p(3.2,6.2,1.7),H.p(3.32+flap,6.27,.8),H.p(3.45,6.1,.1)],'blue',1.5);
});
room.loopSeconds=duration;
room.stillTime=11;
export default room;
