import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { surface, timber, metal, benchFrame, cushion, drape, bentTube, vessel } from '../materials.js';
import { windowBay, floorShadow, hangingRail, recessedFrame, taskLight } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
function person(H, R, i, j, hands, ink = 'teal', lean = 0) {
  const [x, y] = H.p(i, j), s = 1.25, Q = (a, b) => [x + a * s, y + b * s], cx = lean;
  H.tint(H.tile(i - .22, j - .12, .7, .52, .015), 'blue', .16);
  for (const side of [-1, 1]) { stroke(H, R, [Q(side * 5, -25), Q(side * 6, -11), Q(side * 7, -1)], 'blue', 8.5); oval(H, R, ...Q(side * 7 + 2, 0), 7, 3, 'blue', .85); }
  shape(H, R, [Q(cx - 10, -52), Q(cx + 10, -51), Q(9, -24), Q(-9, -24)], ink, .7);
  shape(H, R, [Q(cx - 5, -47), Q(cx + 6, -47), Q(7, -24), Q(-6, -24)], 'paper', .9);
  H.line(R, [Q(-4, -31), Q(5, -31)], 'blue', .8);
  H.line(R, [Q(-5, -27), Q(6, -27)], ink, 1.1);
  oval(H, R, ...Q(cx + 1, -61), 9, 10, 'coral', .3);
  shape(H, R, [Q(cx - 7, -62), Q(cx - 6, -69), Q(cx + 3, -71), Q(cx + 9, -65), Q(cx + 3, -66)], 'blue', .85);
  H.dot(...Q(cx + 5, -60), 1, 'blue');
  for (const [n, target] of hands.entries()) { const side = n ? 1 : -1, sh = Q(cx + side * 9, -49), elbow = [sh[0] + (target[0] - sh[0]) * .5 + side * 4, Math.max(sh[1], target[1]) + 7]; stroke(H, R, [sh, elbow, target], 'blue', 7.2); stroke(H, R, [sh, elbow, target], ink, 5.5); oval(H, R, ...target, 3, 2.8, 'coral', .3); }
}
function bowl(H, R, i, j, z, r = 16, ink = 'paper', angle = 0, h = 16) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y - 1, r * .46, r * .14, 'sun', .55);
  const body = [[x - r, y - h], [x + r, y - h], [x + r * .82, y - h * .37], [x + r * .42, y - 2], [x - r * .43, y - 2], [x - r * .83, y - h * .39]];
  shape(H, R, body, ink, ink === 'paper' ? 1 : .62);
  H.tint([[x + r * .15, y - h], [x + r, y - h], [x + r * .8, y - h * .36], [x + r * .4, y - 2], [x + r * .16, y - 2]], 'blue', .18);
  oval(H, R, x, y - h, r, r * .35, 'sun', .55);
  oval(H, R, x, y - h - .3, r - 2, r * .29, ink, ink === 'paper' ? .95 : .4);
  stroke(H, R, [[x - r * .72, y - h + 4], [x - r * .58, y - h * .38], [x - r * .34, y - 4]], 'paper', 1.5);
  const dx = Math.sin(angle) * r * .72;
  stroke(H, R, [[x + dx, y - h * .85], [x + dx - 2, y - h * .5], [x + dx + 1, y - 5]], 'teal', 1.3, .6);
  H.line(R, [[x - r * .4, y - 1], [x + r * .4, y - 1]], 'paper', 1);
}
function tile(H, R, i, j, z, ink, chip = false) { const P = [[i,j],[i+.38,j],[i+.38,j+.3],[i+(chip?.12:0),j+.3],[i,j+(chip?.18:.3)]].map(([x,y])=>H.p(x,y,z)); surface(H,R,P,ink,.8,.6); H.line(R,[H.p(i+.05,j+.04,z+.005),H.p(i+.3,j+.04,z+.005)],'paper',1.1); }
const room = world('hanoi-ceramic-rims', 'One rim against the light', { floor: 'paper', wall: 'paper', wallTone: .88, height: 4.3, head: 28, tone: .55 }, (H, R) => {
  for (let i = .12; i < 12; i += .7) for (const j of [.13, 10.9]) { surface(H, R, H.tile(i, j, .63, .72, .02), 'teal', .25, .4); H.line(R, [H.p(i + .05, j + .1), H.p(i + .55, j + .63)], 'coral', .6); }
  for (let j = 1.4; j < 10.8; j += 1.6) H.line(R, [H.p(.2, j), H.p(11.8, j)], 'blue', .5, { tone: .24 });
  windowBay(H, R, 'ne', 1.3, 9.9, 1.42, 2.55, { divisions: 6, ink: 'teal', view: P => { shape(H, R, [P(.1,.1),P(9.8,.1),P(9.8,1.1),P(.1,.55)], 'teal', .14); for (let x = .25; x < 9.8; x += 1.2) H.line(R,[P(x,.15),P(x+.5,1.1)],'sun',1,{tone:.4}); } });
  H.tint([H.p(2.4, .8, .02),H.p(7,.8,.02),H.p(10,7,.02),H.p(6.3,7.7,.02)],'sun',.18);
  for(const z of [.13,4.08])timber(H,R,.12,.42,.21,11.06,z,.12,'teal');
  for(const j of [.52,7.34,11.26])timber(H,R,.13,j,.19,.16,.16,3.92,'paper');
  recessedFrame(H,R,'nw',7.74,3.19,1.57,2.07,'teal',P=>{
    for(const v of [.19,1.1])H.line(R,[P(.1,v),P(3.06,v)],'sun',4);
    for(const [u,v,r,ink]of [[.55,.25,13,'paper'],[1.49,.25,10,'teal'],[2.5,.26,13,'coral'],[.63,1.16,10,'sun'],[1.62,1.17,13,'paper']]){const [x,y]=P(u,v);oval(H,R,x,y-r*.64,r,r*.69,ink,.7);oval(H,R,x,y-r*.68,r*.65,r*.43,'paper',.9);H.line(R,[[x-r*.7,y-r*.54],[x,y-r*.3],[x+r*.7,y-r*.51]],'blue',.7);}
    const [x,y]=P(2.57,1.23);surface(H,R,[[x-12,y],[x+12,y],[x+9,y-20],[x-7,y-21]],'paper',1);stroke(H,R,[[x-9,y-18],[x-3,y-23],[x+4,y-17],[x+9,y-20]],'coral',1.5);
  });
  H.tint(H.faceJ(.32,.69,6.6,.26,3.68),'blue',.19);
  timber(H, R, .4, .65, 1.7, 6.6, .1, .2, 'sun');
  for (const j of [.69, 3.8, 7.09]) for (const i of [.42, 1.94]) timber(H, R, i, j, .14, .16, .13, 3.95 - j * .14, 'sun');
  for (const [level, end] of [[.55,7.2],[1.45,7.2],[2.33,5.85],[3.24,3.77]]) {
    for(let j=.7;j<end-.12;j+=.25)timber(H,R,.43,j,1.65,.21,level,.11,'sun');
    timber(H,R,.43,.7,.12,end-.7,level-.15,.22,'sun');
    for(const j of [.83,end-.17])bentTube(H,R,[[.56,j,level-.02],[1.91,j,level-.28]],1.5,'teal');
    for (let j = .95; j < end - .35; j += 1.04) {
      for (const i of [.76,1.48]) bowl(H,R,i,j,level+.13,8+(j%2)*2, (Math.round(j*2)+level*10)%3>1?'paper':'teal',j,9);
      if (j < end-1) timber(H,R,.5,j+.62,1.5,.065,level+.13,.34,'paper');
    }
    timber(H,R,2.02,.69,.065,end-.6,level+.08,.12,'sun');
  }
  for(const [j,z]of [[1.03,.55],[2.14,1.45],[4.52,.55]]){const [x,y]=H.p(1.49,j,z+.13);oval(H,R,x+2,y-13,5,8,'paper',1);oval(H,R,x+2,y-13,2.9,5,'teal',.35);}
  surface(H,R,[H.p(1.2,6.76,.2),H.p(1.9,6.76,.2),H.p(1.9,6.58,.89),H.p(1.2,6.58,.89)],'paper',.9);
  for(let n=0;n<5;n++)H.line(R,[H.p(1.26+n*.12,6.75,.26),H.p(1.26+n*.12,6.59,.82)],'sun',1.2);
  H.line(R,[H.p(.55,.75,.34),H.p(.55,3.65,3.22)],'blue',2);
  metal(H,R,.68,5.88,1.17,.93,.29,.15,'paper');
  for(let k=0;k<4;k++) H.line(R,[H.p(.75+k*.24,5.95,.45),H.p(.78+k*.24,6.74,.45)],'sun',2);
  timber(H,R,4.28,3.4,4.74,.16,.39,.15,'sun');
  for(const i of [4.08,8.85]) for(const j of [3.52,5.58]) { timber(H,R,i,j,.18,.2,.05,.93,'sun'); metal(H,R,i-.02,j-.01,.22,.22,.08,.1,'blue'); }
  for(let n=0;n<5;n++) timber(H,R,4.0+n*.99,3.42,.96,2.52,.94,.16,'sun');
  timber(H,R,4.08,5.58,4.9,.16,.64,.23,'sun');
  surface(H,R,H.tile(4.27,3.69,4.38,1.96,1.108),'paper',.97,.5);
  cushion(H,R,5.03,4.05,1.97,1.5,1.12,.045,'teal');
  const [tx,ty]=H.p(5.96,4.81,1.17);
  surface(H,R,H.tile(5.05,4.12,1.87,1.4,1.18),'blue',.56);
  for(const i of [5.19,6.7])for(const j of [4.24,5.37])H.dot(...H.p(i,j,1.21),2,'sun');
  oval(H,R,tx,ty+3,26,12,'blue',.79);oval(H,R,tx,ty,18,8,'teal',.64);oval(H,R,tx,ty-3,14,6,'blue',.7);
  surface(H,R,[[tx-34,ty-9],[tx+34,ty-9],[tx+34,ty-1],[tx+20,ty+5],[tx-20,ty+5],[tx-34,ty-1]],'sun',.65);
  oval(H,R,tx,ty-9,34,16,'paper',1);oval(H,R,tx,ty-10,28,12,'teal',.36);oval(H,R,tx,ty-10,18,8,'blue',.27);
  for(let n=0;n<8;n++){const a=n*Math.PI/4;H.line(R,[[tx+Math.cos(a)*32,ty-8+Math.sin(a)*14],[tx+Math.cos(a)*32,ty-3+Math.sin(a)*14]],'blue',.65);}
  bentTube(H,R,[[6.73,5.12,1.2],[6.73,5.12,1.49],[6.42,5.12,1.49]],2,'coral');
  timber(H,R,4.26,4.02,4.42,.13,.39,.13,'sun');
  surface(H,R,H.faceI(4.33,5.87,4.35,.31,.73),'blue',.54);
  for(const i of [4.42,6.57]){timber(H,R,i,5.57,1.91,.52,.38,.13,'sun');timber(H,R,i,5.99,1.91,.09,.4,.23,'teal');bentTube(H,R,[[i+.71,6.11,.55],[i+1.15,6.11,.55]],1.6,'sun');}
  for(const i of [4.64,5.36])bowl(H,R,i,5.77,.53,7,'paper',.2,5);
  metal(H,R,6.85,4.79,.2,.26,1.14,.12,'coral');
  for(const i of [4.4,8.42]) { const [x,y]=H.p(i,3.94,1.14); shape(H,R,[[x-10,y],[x+9,y],[x+11,y-20],[x+4,y-22],[x+4,y-12],[x-1,y-4],[x-10,y-2]],'sun',.62); }
  bowl(H,R,7.87,4.9,1.13,20,'coral',-.6,17);
  for(let k=0;k<4;k++) tile(H,R,7.14+k*.4,3.61,1.13,['teal','coral','paper','sun'][k],k===2);
  drape(H,R,8.13,5.16,.68,.57,1.14,.28,'paper');
  benchFrame(H,R,7.5,.65,3.4,1.42,1.14,'teal');
  surface(H,R,H.tile(7.75,.83,1.47,1.05,1.17),'blue',.38);
  for(const i of [7.72,9.09]) timber(H,R,i,.82,.1,1.14,1.15,.52,'sun');
  timber(H,R,7.72,.82,1.47,.1,1.15,.52,'sun');
  for(let k=0;k<5;k++) surface(H,R,[H.p(7.9+k*.045,.94+k*.03,1.34),H.p(8.95,.94,1.34+k*.03),H.p(8.92,1.74,1.4),H.p(7.91,1.83,1.28)],'paper',1,.4);
  const [sx,sy]=H.p(9.86,1.44,1.2); oval(H,R,sx,sy,14,6,'sun',.36); oval(H,R,sx,sy,9,3.8,'blue',.3); stroke(H,R,[[sx-10,sy],[sx-4,sy+14],[sx+15,sy+12]],'coral',1.3); oval(H,R,sx+9,sy+12,3,3,'teal',.7);
  timber(H,R,7.67,.76,3.07,.08,1.2,.69,'teal');
  for(const i of [7.62,10.76])bentTube(H,R,[[i,.92,1.17],[i,.58,1.81]],2,'blue');
  for(let k=0;k<5;k++)surface(H,R,[H.p(9.28+k*.19,.85,1.2),H.p(9.4+k*.19,.85,1.2),H.p(9.52+k*.15,1.23,1.88),H.p(9.38+k*.15,1.23,1.88)],k%2?'paper':'sun',.8);
  for(const [i,j]of [[8.17,1.89],[9.61,1.87]]){const [x,y]=H.p(i,j,1.19);H.line(R,ell(x,y,11,5),'sun',3);H.line(R,ell(x,y,7,3),'blue',1);}
  taskLight(H,R,10.54,.99,1.17,'coral',-.68);
  hangingRail(H,R,'nw',8.7,2.15,2.52,4,(P,u,n)=>{ shape(H,R,[P(u-.13,-.15),P(u+.13,-.15),P(u+.13,-.46),P(u-.13,-.46)],['sun','teal','paper','coral'][n],.7); H.dot(...P(u,-.21),.8,'blue'); });
  benchFrame(H,R,2.35,9.18,4.55,1.26,.68,'sun');
  surface(H,R,H.tile(2.52,9.35,4.14,.92,.7),'paper',.95);
  timber(H,R,5.76,9.27,.95,.99,.71,.07,'teal');
  surface(H,R,H.tile(5.87,9.36,.72,.74,.8),'blue',.63);
  for(const [i,j]of [[5.97,9.54],[6.31,9.85]])surface(H,R,[H.p(i,j,.83),H.p(i+.23,j,.83),H.p(i+.15,j+.25,.88),H.p(i-.09,j+.13,.85)],'coral',.62);
  const [ax,ay]=H.p(5.54,10.03,.74);H.line(R,[[ax-7,ay+4],[ax+3,ay-10],[ax+15,ay+5]],'blue',1.6);oval(H,R,ax+3,ay-10,2,2,'sun',.8);
  drape(H,R,2.67,10.13,.57,.25,.71,.23,'teal');
  tile(H,R,2.69,9.45,.7,'teal',true);
  const [px,py]=H.p(3.58,9.83,.7); shape(H,R,[[px-13,py],[px+11,py],[px+8,py-12],[px-9,py-8]],'paper',1); stroke(H,R,[[px-7,py-3],[px-1,py-8],[px+6,py-4]],'blue',.7);
  bowl(H,R,4.74,9.75,.71,12,'paper',.2,9);
  H.line(R,ell(...H.p(5.18,9.51,.71),9,5,20),'coral',3);
  surface(H,R,H.tile(9.8,9.1,1.37,1.04,.08),'teal',.3);
  for(const i of [9.83,11.07]) timber(H,R,i,9.15,.1,.94,.11,.5,'sun');
  for(const j of [9.16,10]) timber(H,R,9.85,j,1.27,.08,.55,.1,'sun');
  for(let n=0;n<3;n++) surface(H,R,H.tile(9.97+n*.06,9.28,1.04,.7,.18+n*.06),'paper',1,.4);
  timber(H,R,9.77,9.1,.12,.95,.16,.54,'sun');timber(H,R,11.06,9.1,.12,.95,.16,.54,'sun');
  surface(H,R,[H.p(9.79,9.12,.64),H.p(11.15,9.12,.64),H.p(11.15,8.66,1.21),H.p(9.79,8.66,1.21)],'paper',1);
  for(let n=0;n<5;n++)H.line(R,[H.p(9.9+n*.24,9.09,.66),H.p(9.9+n*.24,8.69,1.17)],'sun',.9);
  bowl(H,R,10.46,9.62,.5,14,'paper',.3,13);
  stroke(H,R,[H.p(10.03,9.52,.81),H.p(10.42,9.78,.76),H.p(10.94,9.57,.81)],'coral',2);
  const [jx,jy]=H.p(8.67,9.77,.02);vessel(H,R,8.67,9.77,.02,11,13,'coral',false);oval(H,R,jx,jy-13,9,4,'sun',.61);H.dot(jx-2,jy-13,2.4,'blue',.6);
  for(const i of [8.19,8.4,8.61]){const [x,y]=H.p(i,10.49,.02);oval(H,R,x,y,4,2,'sun',.56);}

}, (H,R,t) => {
  const u=((t%24)+24)%24,q=ease(4.8,9.6,u)*(1-ease(14.4,22,u)),a=q*1.72;
  bowl(H,R,5.96,4.81,1.47,29,'paper',a,23);
  const [x,y]=H.p(5.96,4.81,1.47);
  H.line(R,[[x+Math.cos(a)*30,y+Math.sin(a)*13+2],[x+Math.cos(a)*34,y+Math.sin(a)*15+2]],'coral',2.5);
  person(H,R,6.35,6.29,[H.p(5.5,5.2,1.37),H.p(6.55,5.17,1.37)],'teal',-3);
  const trace=ease(9.6,11.5,u)*(1-ease(13.8,16,u));
  person(H,R,8.4,6.25,[H.p(7.74,5.92,1.03),H.p(7.5-.18*trace,5.44,1.63+.1*trace)],'coral',-4);
  const flap=Math.sin(u*Math.PI/12)*1.4;
  stroke(H,R,[H.p(8.25,1.57,1.42),H.p(8.61,1.81,1.42),[...H.p(8.76,1.89,1.42)].map((v,n)=>v+(n?flap:0))],'paper',2);
});
room.loopSeconds=24;
room.stillTime=11.5;
export default room;
