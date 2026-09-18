import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame, slattedSeat, floorLight, branchSpray } from '../materials.js';
import { masonry, cabinetFrame, basin } from '../structure.js';
import { windowBay } from '../joinery.js';

const smooth = x => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
function maker(H, R, i, j, hands, child = false, lean = 0, shirt = 'coral', stride = 0) {
  const [x, y] = H.p(i, j, child ? .35 : 0), s = child ? .85 : 1.2;
  oval(H, R, x + 5, y + 3, 14 * s, 4 * s, 'blue', .2);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x + side * 5 * s, y - 24 * s], [x + side * (6 + stride * 3) * s, y - 10 * s], [x + side * (8 + stride * 5) * s, y - Math.max(0, side * stride) * 3]], 'blue', 7 * s);
    oval(H, R, x + side * (8 + stride * 5) * s + 3, y - Math.max(0, side * stride) * 3, 6 * s, 2.5 * s, 'blue', .8);
  }
  shape(H, R, [[x - 9 * s, y - 45 * s], [x + 8 * s, y - 46 * s], [x + 10 * s, y - 22 * s], [x - 9 * s, y - 23 * s]], child ? 'sun' : shirt, .67);
  if (!child) shape(H, R, [[x - 5, y - 41], [x + 5, y - 41], [x + 8, y - 24], [x - 7, y - 24]], 'paper', .9);
  oval(H, R, x + lean, y - 55 * s, 8 * s, 9 * s, 'paper', 1);
  shape(H, R, [[x - 8 * s + lean, y - 55 * s], [x - 7 * s + lean, y - 63 * s], [x + 3 * s + lean, y - 65 * s], [x + 8 * s + lean, y - 59 * s], [x - 3 * s + lean, y - 58 * s]], 'blue', .85);
  H.dot(x + 4 * s + lean, y - 54 * s, 1.1, 'blue');
  for (const [n, target] of hands.entries()) {
    const shoulder = [x + (n ? 8 : -8) * s, y - 41 * s], elbow = [(shoulder[0] + target[0]) * .5 + (n ? 4 : -4), (shoulder[1] + target[1]) * .5 + 8];
    stroke(H, R, [shoulder, elbow, target], 'blue', 7 * s);
    stroke(H, R, [shoulder, elbow, target], child ? 'sun' : shirt, 5 * s);
    oval(H, R, ...target, 3 * s, 2.7 * s, 'paper', 1);
  }
}

const room = world('istanbul-student-courtyard', 'The chair makes a circle', { wall: false, floor: 'paper', tone: .75, head: 30 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.5) for (let j = 0; j < 12; j += 1.3) shape(H, R, H.tile(i + .035, j + .035, Math.min(1.43, 12 - i), Math.min(1.23, 12 - j), .015), (i + j) % 3 < 1 ? 'sun' : 'paper', .2, .45);
  masonry(H, R, 'ne', 0, 12, 0, 3.8, 'paper', .9);
  masonry(H, R, 'nw', 0, 9.6, 0, 2.4, 'coral', .22);
  windowBay(H, R, 'ne', 1, 3.4, .28, 3.17, { ink: 'teal', divisions: 2 });
  metal(H, R, 2.55, .36, .28, .12, 1.65, .07, 'sun');
  for (const j of [.5, 7.1]) timber(H, R, .35, j, .21, .21, 0, 3.55, 'teal');
  timber(H, R, .3, .4, .23, 6.95, 3.55, .18, 'teal');
  timber(H, R, .3, .4, 8.5, .21, 3.55, .18, 'teal');
  bentTube(H, R, [[.2, .17, 3.84], [10.9, .17, 3.84], [10.9, .2, .23], [11.4, .7, .15]], 3.5, 'teal');
  for (let z = .5; z < 3.5; z += .35) { const p = H.p(.62, 7.15, z); oval(H, R, ...p, 2, 4, 'blue', .3); }
  shape(H, R, [H.p(.5, .5, 3.67), H.p(8.5, .5, 3.67), H.p(6.25, 4.15, 3.24), H.p(.5, 6.8, 3.6)], 'coral', .26);
  for (let a = 0; a < 7; a++) stroke(H, R, [H.p(.6 + a * 1.06, .54, 3.68), H.p(.58 + a * .8, 2.25 + a * .18, 3.38), H.p(.55 + a * .83, 6.68 - a * .37, 3.61 - a * .06)], 'paper', 1.2, .75);
  shape(H, R, [H.p(3.1, 2.1, 3.45), H.p(3.8, 2.1, 3.45), H.p(3.68, 2.7, 3.4), H.p(3.06, 2.7, 3.4)], 'teal', .35);
  floorLight(H, 7, 7.5, 155, .45);
  slattedSeat(H,R,1.7,7.35,1.07,.05,'sun');slattedSeat(H,R,9.7,5.4,1.07,.05,'sun');
  box(H,R,1.83,8.08,.2,.2,.04,.15,'paper',1);stroke(H,R,[H.p(1.83,8.3,.13),H.p(2.05,8.3,.13)],'coral',1.2);
  metal(H,R,10.75,6.35,.11,.11,.05,.87,'teal');
  cabinetFrame(H, R, 5.15, .65, 5.65, 1.12, .13, 2.65, 3, 'sun', (i, j, w, d, z, h, n) => {
    timber(H, R, i, j, w, d, z + 1.25, .12, 'sun');
    if (n === 0) {
      for (let a = 0; a < 4; a++) box(H, R, i + a * .29 + .08, j + .24, .19, .6, z + 1.4, .62 + (a % 2) * .13, ['teal', 'coral', 'paper', 'sun'][a], .6);
      for (const a of [.26, .93]) { const p = H.p(i + a, j + .42, z + .1); oval(H, R, ...p, 10, 4, 'blue', .7); oval(H, R, p[0] + 2, p[1] - 4, 8, 3, 'paper', 1); }
    } else if (n === 1) {
      box(H, R, i + .07, j + .1, w - .2, .65, z + .12, .81, 'coral', .4);
      H.line(R, [H.p(i + .19, j + .78, z + .88), H.p(i + w - .23, j + .78, z + .88)], 'sun', 2);
      box(H, R, i + .1, j + .2, w - .25, .58, z + 1.39, .09, 'paper', .9);
      for (const a of [.2, .75, 1.1]) { const p = H.p(i + a, j + .4, z + 1.62); oval(H, R, ...p, 6, 3, 'teal', .5); stroke(H, R, [[p[0]-5,p[1]], [p[0]-5,p[1]-9],[p[0]+5,p[1]-9],[p[0]+5,p[1]]], 'blue', 1); }
    } else {
      for (let a = 0; a < 3; a++) cushion(H, R, i + .1, j + .1, w - .24, .63, z + a * .16, .12, a === 1 ? 'coral' : 'paper');
      const p = H.p(i + .82, j + .36, z + 1.44); oval(H, R, ...p, 17, 5, 'sun', .4); shape(H, R, [[p[0]-13,p[1]],[p[0]-10,p[1]-14],[p[0]+10,p[1]-14],[p[0]+13,p[1]]], 'teal', .6);
    }
  });
  basin(H, R, 9.45, 2.3, 1.7, 1.1, .9, 'paper');
  for (const x of [9.55, 10.98]) metal(H, R, x, 2.4, .09, .8, .05, .85, 'teal');
  for (let j = 2.8; j < 7.1; j += .72) {
    timber(H, R, .42, j, .13, .11, .42, 2.7, 'sun');
    stroke(H, R, [H.p(.48,j,1),H.p(.48,j+.6,2.85)], 'sun', 1.5);
  }
  for (const z of [1, 1.8, 2.6]) timber(H, R, .39, 2.8, .13, 4.8, z, .1, 'sun');
  box(H, R, .65, 3.3, .65, 3.9, 0, .47, 'teal', .55);
  for (let n = 0; n < 6; n++) { const [x,y]=H.p(.86,3.65+n*.56,.48); branchSpray(H,R,x,y,1.2,'teal',n%2?1:-1); }
  const bird = H.p(.55,5.43,2.82); shape(H,R,[[bird[0]-8,bird[1]],[bird[0]+2,bird[1]-7],[bird[0]+10,bird[1]-1],[bird[0]+1,bird[1]+1]],'paper',1);
  benchFrame(H, R, 8.95, 7.75, 2.3, 1.8, .7, 'teal');
  box(H, R, 9.3, 8.15, 1.22, .92, .7, .66, 'paper', 1);
  shape(H, R, [H.p(9.2,8.05,1.36),H.p(9.9,8.05,1.88),H.p(10.66,8.05,1.36),H.p(10.66,9.18,1.36),H.p(9.9,9.18,1.88),H.p(9.2,9.18,1.36)],'coral',.55);
  shape(H,R,H.tile(9.78,8.18,.21,.75,1.78),'paper',1);
  for(const x of [9.46,10.03]) shape(H,R,H.faceI(x,9.08,.24,.93,1.19),'teal',.6);
  const tree = H.p(10.82,8.65,.72); stroke(H,R,[[tree[0],tree[1]],[tree[0],tree[1]-18]],'sun',3); for(let n=0;n<6;n++)stroke(H,R,[[tree[0]-7+n*2.6,tree[1]-16],[tree[0]-5+n*2,tree[1]-27]],'teal',1.6);
  slattedSeat(H,R,1.45,9.4,2.25,.05,'sun'); cushion(H,R,1.52,9.51,1.08,.58,.77,.1,'teal');
  cushion(H,R,2.7,9.51,.65,.58,.77,.14,'coral');
  box(H,R,1.73,10.48,1.17,.68,.01,.54,'teal',.55); for(let n=0;n<5;n++)H.line(R,[H.p(1.82+n*.19,11.17,.18),H.p(1.82+n*.19,11.17,.45)],'paper',.75);
  benchFrame(H,R,7.95,10.28,2.7,.8,.38,'sun'); shape(H,R,H.tile(8.13,10.36,1,.6,.4),'teal',.4);
  for(let n=0;n<4;n++)shape(H,R,H.tile(9.43+n*.21,10.46,.18,.33,.42),'coral',.2+n*.18);
  stroke(H,R,[H.p(8.34,10.6,.42),H.p(8.43,10.6,.97),H.p(8.93,10.6,.97),H.p(9.03,10.6,.42)],'paper',5);
  metal(H,R,10.75,10.55,.65,.7,.02,.045,'blue'); for(let n=0;n<6;n++)H.line(R,[H.p(10.79+n*.1,10.57,.08),H.p(10.79+n*.1,11.2,.08)],'paper',1);
}, (H,R,time) => {
  const u=((time%16)+16)%16, p=smooth((u-3.2)/3.2)*(1-smooth((u-9.6)/4.4)), a=p*Math.PI/2;
  const Q=(x,y,z=0)=>H.p(5.85+x*Math.cos(a)-y*Math.sin(a),6.4+x*Math.sin(a)+y*Math.cos(a),z);
  const poly=(x,y,w,d,z)=>[Q(x,y,z),Q(x+w,y,z),Q(x+w,y+d,z),Q(x,y+d,z)];
  H.tint(poly(-1.7,-1,3.7,2.25,.025),'blue',.16);
  for(const x of [-1.4,1.4]) {
    stroke(H,R,[Q(x,-.8,0),Q(x,.68,1.24)],'blue',4);
    stroke(H,R,[Q(x,.8,0),Q(x,-.68,1.24)],'teal',4);
    oval(H,R,...Q(x,0,.66),2.5,2.5,'sun',1);
    stroke(H,R,[Q(x,-.73,.62),Q(x,.7,.62)],'sun',2);
  }
  shape(H,R,[Q(-1.8,1,1.14),Q(1.8,1,1.14),Q(1.8,1,1.31),Q(-1.8,1,1.31)],'sun',.65);
  shape(H,R,poly(-1.8,-1,3.6,2,1.31),'sun',.45);
  stroke(H,R,[Q(-1.75,0,1.32),Q(1.75,0,1.32)],'blue',1.1);
  for(const x of [-1.65,1.65])for(const y of [-.86,.86])oval(H,R,...Q(x,y,1.33),2,1,'blue',.7);
  for(const y of [-.68,.5])stroke(H,R,[Q(-1.6,y,1.33),Q(-.3,y+.035,1.33),Q(1.62,y,1.33)],'coral',.55);
  for(const x of [-1.8,1.8])for(const y of [-1,1])shape(H,R,[Q(x,y,1.33),Q(x-Math.sign(x)*.22,y,1.33),Q(x,y-Math.sign(y)*.21,1.33)],'teal',.5);
  for(const side of [-1,1]) {
    const b=[5.85+side*2.3*Math.cos(a),6.4+side*2.3*Math.sin(a)];
    maker(H,R,b[0],b[1],[Q(side*1.8,-.48,1.31),Q(side*1.8,.48,1.31)],false,side*p*2,side>0?'teal':'coral',Math.sin(p*Math.PI*10)*Math.sin(p*Math.PI));
  }
  const tie=.035*Math.sin(u*Math.PI/8); stroke(H,R,[H.p(.52,7.1,3.53),H.p(.75,7.15,3.1),H.p(.69+tie,7.2,2.91)],'coral',1.4);
  const page=smooth((u-13)/1)*(1-smooth((u-15)/1))*.05;
  shape(H,R,[H.p(8.18,10.39,.41),H.p(8.84,10.39,.41),H.p(8.84,10.88,.41+page),H.p(8.18,10.88,.41)],'paper',1);
});
room.loopSeconds=16;
room.stillTime=2;
export default room;
