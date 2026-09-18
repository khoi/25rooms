import { world, shape, oval, stroke, box, ell, loop, TAU, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, drape, benchFrame, caneChair, branchSpray } from '../materials.js';
import { cabinetFrame, basin, masonry } from '../structure.js';
import { windowBay, hangingRail, panelFront, floorShadow } from '../joinery.js';
const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, foot, hands, shirt = 'teal', scale = 1, head = 0) {
  const [x, y] = foot, P = (a, b) => [x + a * scale, y + b * scale];
  oval(H, R, x + 2, y + 2, 14 * scale, 4 * scale, 'blue', .18);
  for (const s of [-1, 1]) {
    stroke(H, R, [P(s * 5, -29), P(s * 6, -14), P(s * 8, -1)], 'blue', 6 * scale);
    oval(H, R, ...P(s * 8 + 2, 0), 5 * scale, 2.5 * scale, 'blue', .9);
  }
  shape(H, R, loop([P(-8, -56), P(8, -55), P(10, -28), P(-9, -28)], 1), shirt, .65, .9);
  H.line(R, [P(-6, -30), P(7, -30)], 'paper', .65);
  oval(H, R, ...P(head, -66), 7.5 * scale, 8 * scale, 'coral', .3);
  shape(H, R, [P(-8 + head, -67), P(-7 + head, -73), P(head, -76), P(7 + head, -71), P(8 + head, -66), P(head, -69), P(-5 + head, -64)], 'blue', .86, .5);
  H.dot(...P(3 + head, -66), .8 * scale, 'blue');
  H.line(R, [P(2 + head, -61), P(5 + head, -61)], 'blue', .5);
  hands.forEach((hand, n) => {
    const s = n ? 1 : -1, sh = P(s * 6, -52), el = [(sh[0] + hand[0]) / 2 + s * 5, (sh[1] + hand[1]) / 2 + 8];
    stroke(H, R, [sh, el, hand], 'blue', 5.8 * scale);
    stroke(H, R, [sh, el, hand], shirt, 4.2 * scale);
    oval(H, R, ...hand, 2.4 * scale, 2 * scale, 'coral', .38);
  });
}

function plate(H, R, i, j, z, r = 13) { const p = H.p(i, j, z); oval(H, R, ...p, r, r * .4, 'paper', 1); H.outline(R, ell(...p, r * .73, r * .26), 'coral', .6); }
function bird(H, R, x, y, s = 1) { oval(H, R, x, y, 6 * s, 3.8 * s, 'teal', .6); oval(H, R, x + 5 * s, y - 4 * s, 3 * s, 3 * s, 'teal', .7); shape(H, R, [[x + 7 * s, y - 5 * s], [x + 12 * s, y - 3 * s], [x + 7 * s, y - 2 * s]], 'sun', .8, .4); H.dot(x + 5 * s, y - 4 * s, .6 * s, 'blue'); }
const room = world('mexico-city-patio-breakfast', 'A table under the arch', { wall: false, floor: 'paper', tone: 1, head: 60 }, (H, R) => {
  for (let ix = 0; ix < 10; ix++) for (let jy = 0; jy < 15; jy++) { const i=ix*1.2,j=jy*.8; shape(H, R, H.tile(i + .025, j + .025, 1.14, .74, .02), (Math.round(i / 1.2) + Math.round(j / .8)) % 8 === 0 ? 'coral' : 'paper', .17, .5); }
  masonry(H, R, 'nw', 0, 11.95, 0, 3.25, 'coral', .29);
  masonry(H, R, 'ne', 0, 12, 0, 4.6, 'paper', .84);
  shape(H, R, H.tile(2.2, 2.05, 6.8, 5.35, .035), 'blue', .13, .1);
  windowBay(H, R, 'ne', 2.75, 5.9, 1.6, 2.2, { ink: 'teal', divisions: 3, view: P => {
    shape(H, R, [P(.13,.14),P(5.77,.14),P(5.77,2.03),P(.13,2.03)], 'teal', .27, .3);
    for (const z of [.55, 1.38]) {
      shape(H, R, [P(.24,z-.13),P(5.63,z-.13),P(5.63,z),P(.24,z)], 'sun', .67, .7);
      H.line(R, [P(.24,z+.02),P(5.63,z+.02)], 'paper', 1.5);
    }
    for (const [u,z,r,c] of [[.7,.66,8,'coral'],[1.42,.66,9,'paper'],[2.22,.66,6,'sun'],[3.67,.66,10,'coral'],[4.86,.66,8,'paper'],[1.2,1.51,7,'paper'],[2.9,1.51,8,'sun'],[4.41,1.51,7,'teal']]) {
      const [x,y]=P(u,z);shape(H,R,[[x-r,y],[x+r,y],[x+r*.8,y-r*1.6],[x-r*.8,y-r*1.6]],c,c==='paper'?1:.6,.6);oval(H,R,x,y-r*1.6,r*.82,r*.27,c,c==='paper'?1:.6);
      H.line(R,[[x-r*.5,y-3],[x-r*.5,y-r*1.3]],'paper',.8);
    }
    for (let k=0;k<4;k++){const q=P(5.22,1.47+k*.085);oval(H,R,...q,10,3,'paper',1);}
  } });
  for (const i of [1.18, 9.95]) {
    box(H, R, i, 1.48, .73, .94, .04, 2.68, 'paper', 1);
    box(H, R, i - .1, 1.4, .93, 1.11, 2.66, .18, 'paper', 1);
    box(H, R, i - .05, 1.42, .83, 1.05, .06, .24, 'coral', .22);
  }
  const center = 5.93, radius = 4.35;
  for (const i of [1.18, 9.95]) for (const z of [.55, 1.14, 1.78, 2.41]) {
    H.line(R, [H.p(i+.06, 2.44, z), H.p(i+.65, 2.44, z)], 'teal', .8, {tone:.45});
    H.line(R, [H.p(i+.71, 1.53, z+.08), H.p(i+.71, 2.36, z+.08)], 'blue', .65, {tone:.35});
  }
  for (let n = 0; n < 14; n++) {
    const a = n * Math.PI / 14, b = (n + 1) * Math.PI / 14;
    const Q = (r, theta, j) => H.p(center + Math.cos(theta) * r, j, 2.74 + Math.sin(theta) * r * .42);
    const front = [Q(radius, a, 2.36), Q(radius, b, 2.36), Q(radius + .52, b, 2.36), Q(radius + .52, a, 2.36)];
    shape(H, R, front, 'paper', 1, .7);
    shape(H, R, [Q(radius,a,1.48),Q(radius,b,1.48),Q(radius,b,2.36),Q(radius,a,2.36)], 'teal', .2, .6);
    H.line(R, [Q(radius + .4,a,2.38),Q(radius + .4,b,2.38)], 'sun', .8);
  }
  cabinetFrame(H, R, 2.36, .53, 6.53, 1.04, .05, 1.3, 3, 'teal', (i,j,w,d,z,h,n) => {
    if(n === 0){for(let k=0;k<4;k++){plate(H,R,i+.5,j+.55,z+.17+k*.07,11);}vessel(H,R,i+1.4,j+.55,z+.15,10,18,'sun',false);}
    if(n === 1){for(let k=0;k<3;k++){timber(H,R,i,j,w,d,z+k*.34,.09,'sun');H.line(R,[H.p(i+.7,j+d,z+.17+k*.34),H.p(i+1.2,j+d,z+.17+k*.34)],'blue',2);}}
    if(n === 2){vessel(H,R,i+.62,j+.48,z+.17,10,13,'paper');bird(H,R,...H.p(i+.62,j+.48,z+.59),.65);shape(H,R,H.faceJ(i+w-.05,j+.16,d,.14,.99),'sun',.5,.65);}
  });
  hangingRail(H, R, 'nw', 1.2, 3.8, 2.55, 3, (P,u,n)=>{const [x,y]=P(u,-.17);H.line(R,[[x,y],[x,y+12]],'blue',1.8);oval(H,R,x,y+23,n===1?13:9,n===1?12:9,n===1?'blue':'paper',n===1?.7:1);});
  for(let n=0;n<6;n++) { const [x,y]=H.p(9.02,.75,1.33+n*.11); oval(H,R,x,y,12,4,'paper',1); }
  bentTube(H,R,[[.25,10.95,.04],[.25,10.95,3.42],[.25,.6,3.42]],2.6,'teal');
  for(const j of [3.2,6.6,9.4]) {H.line(R,[H.p(.22,j,3.4),H.p(.5,j,3.4)],'blue',2);}
  shape(H,R,H.tile(.45,10.39,1.12,.73,.05),'blue',.65,.6);
  for(let n=0;n<7;n++) H.line(R,[H.p(.55+n*.13,10.45,.065),H.p(.55+n*.13,11.02,.065)],'paper',.8);
  for(const j of [5.5,6.3,7.1]) bentTube(H,R,[[.21,j,.5],[.21,j,3.75]],1.3,'sun');
  for(const z of [1.1,1.8,2.5,3.2]) bentTube(H,R,[[.21,5.2,z],[.21,7.35,z]],1.1,'sun');
  for(let n=0;n<8;n++){const [x,y]=H.p(.28,5.43+n*.24,.85+n*.31);branchSpray(H,R,x,y,.55,'teal',n%2?1:-1);}
  for (const j of [4.79, 7.28]) for (const i of [3.2, 7.66]) {
    timber(H,R,i,j,.22,.22,.03,1.28,'sun');
    for(const z of [.55,1.11])H.dot(...H.p(i+.23,j+.2,z),1.5,'teal');
  }
  timber(H,R,3.04,4.62,4.94,2.98,1.22,.13,'sun');
  for(const j of [4.74,7.3])timber(H,R,3.22,j,4.62,.19,.94,.24,'sun');
  for(const i of [3.31,7.69])bentTube(H,R,[[i,4.96,.48],[i,6.16,.48],[i,7.27,.48]],2.4,'teal');
  timber(H,R,3.39,6.04,4.15,.19,.44,.12,'sun');
  for(const i of [3.31,7.59])bentTube(H,R,[[i,6.12,.54],[i+.08,6.12,1.17]],2,'sun');
  for(const i of [3.16,7.76]) timber(H,R,i,4.77,.12,2.62,.62,.14,'sun');
  drape(H, R, 4.77, 4.65, 1.12, 2.94, 1.315, .39, 'paper');
  for(const i of [4.89,5.06,5.63]) H.line(R,[H.p(i,4.68,1.33),H.p(i,7.61,1.33),H.p(i,7.64,.96)],'teal',1.2);
  vessel(H,R,6.4,5.5,1.35,12,28,'paper');
  oval(H,R,...H.p(6.4,5.5,2.24),6,2.6,'coral',.8);
  const jug=H.p(6.4,5.5,1.35);
  stroke(H,R,[[jug[0]+9,jug[1]-23],[jug[0]+21,jug[1]-22],[jug[0]+20,jug[1]-8],[jug[0]+11,jug[1]-7]],'blue',2.4);
  stroke(H,R,[[jug[0]+9,jug[1]-23],[jug[0]+19,jug[1]-21],[jug[0]+18,jug[1]-9],[jug[0]+11,jug[1]-7]],'paper',1.1);
  shape(H,R,[[jug[0]-10,jug[1]-24],[jug[0]-19,jug[1]-28],[jug[0]-13,jug[1]-16]],'paper',1,.6);
  timber(H,R,3.36,4.91,1.24,.39,1.36,.045,'teal');
  for(let k=0;k<3;k++) {const p=H.p(3.63+k*.28,5.06,1.46);oval(H,R,...p,6,3.3,'sun',.6);H.line(R,[[p[0]-3,p[1]-2],[p[0]+2,p[1]+1]],'coral',.7);}
  H.line(R,[H.p(3.37,5.18,1.43),H.p(3.85,5.27,1.43)],'blue',1.9);
  H.line(R,[H.p(3.37,5.18,1.43),H.p(3.55,5.22,1.43)],'coral',2.6);
  for(const i of [3.43,6.32]){drape(H,R,i,6.67,.45,.58,1.36,.03,'paper');H.line(R,[H.p(i+.07,6.77,1.4),H.p(i+.39,7.1,1.4)],'teal',.8);}
  vessel(H,R,5.91,6.21,1.36,5,7,'sun');
  const spoon=H.p(5.98,6.32,1.39);H.line(R,[[spoon[0]-3,spoon[1]],[spoon[0]+8,spoon[1]+5]],'teal',1.2);oval(H,R,spoon[0]+9,spoon[1]+6,3,1.5,'paper',1);
  plate(H,R,4.16,5.58,1.36,20);
  for(const [i,j,c] of [[3.93,5.51,'coral'],[4.32,5.54,'sun'],[4.15,5.78,'sun']])oval(H,R,...H.p(i,j,1.4),8,7,c,.7);
  for(const [i,j] of [[6.82,6.85],[4.18,6.95]]){plate(H,R,i,j,1.35,12);vessel(H,R,i,j,1.4,6,11,'paper');}
  shape(H,R,loop([H.p(6.7,4.96,1.35),H.p(7.7,4.96,1.35),H.p(7.51,5.75,1.35),H.p(6.83,5.55,1.75)],1),'paper',1,.7);
  H.line(R,[H.p(6.8,5.44,1.37),H.p(7.58,5.54,1.37)],'coral',1);
  H.line(R,[H.p(3.1,7.6,1.31),H.p(3.55,7.6,1.31)],'teal',2);
  caneChair(H,R,7.82,4.5,'teal');
  for(const i of [3.05,3.68]){const p=H.p(i,10.5,.06);shape(H,R,loop([[p[0]-6,p[1]],[p[0]+6,p[1]],[p[0]+6,p[1]-13],[p[0],p[1]-18],[p[0]-5,p[1]-12]],1),'coral',.44,.65);H.line(R,[[p[0]-4,p[1]-8],[p[0]+4,p[1]-8]],'paper',1);}
  for(const j of [7.81,9.38])for(const i of [.71,1.81])timber(H,R,i,j,.15,.15,.02,1.11,'teal');
  timber(H,R,.56,7.67,1.58,1.95,1.12,.13,'sun');
  basin(H,R,.65,7.75,1.39,1.27,1.26,'paper');
  bentTube(H,R,[[1.25,8.34,1.26],[1.25,8.34,.56],[.37,8.34,.56],[.37,10.77,.09]],2.3,'teal');
  timber(H,R,.69,7.88,1.27,1.54,.42,.09,'sun');
  vessel(H,R,1.07,8.43,.54,9,13,'coral',false);
  drape(H,R,1.3,9.13,.58,.36,1.28,.61,'paper');
  metal(H,R,.71,9.14,.43,.34,1.28,.1,'coral');
  for(let k=0;k<4;k++)H.line(R,[H.p(.77+k*.08,9.15,1.4),H.p(.77+k*.08,9.43,1.4)],'sun',1.2);
  box(H,R,1.71,9.79,.83,.48,.02,.73,'teal',.5);
  bentTube(H,R,[[1.82,9.87,.73],[1.82,9.87,.98],[2.37,9.87,.98],[2.37,9.87,.73]],1.4,'coral');
  for(const i of [9.29,11.04])for(const j of [4.15,6.26]){metal(H,R,i,j,.12,.12,.06,1.2,'teal');oval(H,R,...H.p(i+.04,j+.06,.08),3.5,4,'blue',.8);}
  for(const z of [.34,1.24])timber(H,R,9.16,4.05,2.12,2.48,z,.12,'sun');
  for(const j of [4.12,6.4])bentTube(H,R,[[9.22,j,1.38],[9.22,j,1.76],[11.16,j,1.76],[11.16,j,1.38]],1.8,'teal');
  for(let k=0;k<3;k++)plate(H,R,9.7,4.77,.5+k*.055,13);
  drape(H,R,10.32,4.52,.73,1.13,.49,.15,'paper');
  timber(H,R,9.48,4.59,1.19,1.21,1.38,.08,'sun');
  const fruit=H.p(10.03,5.07,1.5);oval(H,R,...fruit,14,10,'coral',.67);oval(H,R,fruit[0]+3,fruit[1]-4,10,6,'sun',.75);for(const a of [-4,1,5])oval(H,R,fruit[0]+a,fruit[1]-4,1,2,'blue',.7);
  H.line(R,[H.p(10.63,4.77,1.48),H.p(10.88,5.24,1.48)],'blue',2);H.line(R,[H.p(10.8,5.08,1.48),H.p(10.94,5.33,1.48)],'teal',3.3);
  vessel(H,R,10.4,5.87,1.39,10,12,'paper');
  const basket=H.p(7.4,10.34,.08);
  shape(H,R,loop([[basket[0]-19,basket[1]-17],[basket[0]+19,basket[1]-17],[basket[0]+16,basket[1]],[basket[0]-15,basket[1]]],1),'sun',.55,.8);
  oval(H,R,basket[0],basket[1]-17,19,6,'paper',1);oval(H,R,basket[0],basket[1]-17,15,3.5,'blue',.43);
  for(let k=0;k<6;k++)H.line(R,[[basket[0]-14+k*5,basket[1]-13],[basket[0]-12+k*4.5,basket[1]-1]],'coral',.6);
  stroke(H,R,[[basket[0]-13,basket[1]-18],[basket[0]-11,basket[1]-37],[basket[0]+11,basket[1]-37],[basket[0]+13,basket[1]-18]],'sun',2.2);
  shape(H,R,[[basket[0]-14,basket[1]-18],[basket[0]+4,basket[1]-21],[basket[0]+12,basket[1]-8],[basket[0]-3,basket[1]-7]],'paper',1,.5);
  drape(H,R,9.65,8.96,1.26,1,.64,.32,'coral');
  for(const x of [9.73,10.72])timber(H,R,x,9.05,.13,.75,.03,.58,'sun');
  plate(H,R,10.21,9.5,.68,13);
  H.line(R,[H.p(10.05,9.51,.7),H.p(10.45,9.45,.7)],'blue',1.3);
}, (H,R,t)=>{
  const u=((t%24)+24)%24, pull=ease(4.8,9.6,u)*(1-ease(14.4,22,u));
  const i=3.45,j=7.82+pull*.85;
  floorShadow(H,i,j,.95,.86,.15);caneChair(H,R,i,j,'sun',true);
  H.line(R,[H.p(i+.26,j+.72,1.14),H.p(i+.57,j+.72,1.14)],'teal',2);
  const hands=[H.p(i+.16,j+.72,1.24),H.p(i+.75,j+.72,1.24)];
  person(H,R,H.p(i+.6,j+1.19,.02),hands,'coral',1.03,-pull);
  const open=ease(4.8,9.6,u)*(1-ease(16,22,u));
  actor(H,R,8.17,4.95,u,'read',{shirt:['teal',.6],face:'sw',prop:(HH,RR,pts)=>{
    const x=pts.nearHand[0],y=pts.nearHand[1]-7;
    shape(HH,RR,[[x-12,y],[x,y+3],[x,y+14],[x-12,y+10]],'paper',1,.6);
    shape(HH,RR,[[x,y+3],[x+2+open*13,y-open*3],[x+2+open*13,y+10],[x,y+14]],'paper',1,.6);
    HH.line(RR,[[x,y+3],[x,y+14]],'coral',1.2);
    bird(HH,RR,x-7,y+6,.4);
    if(open>.1)bird(HH,RR,x+7,y+5,.4);
  }},.64-FIGURES.seatZ('child',1.6),1.6,'child');
  const p=H.p(10.3,.56,2.8),sway=Math.sin(u*TAU/24)*3;
  shape(H,R,[[p[0]-10,p[1]],[p[0]+10,p[1]],[p[0]+10+sway,p[1]+36],[p[0]-11+sway,p[1]+34]],'paper',1,.7);
  for(const a of [26,30])H.line(R,[[p[0]-9+sway,p[1]+a],[p[0]+9+sway,p[1]+a+1]],'teal',1);
});
room.loopSeconds=24;
room.stillTime=11.5;
export default room;
