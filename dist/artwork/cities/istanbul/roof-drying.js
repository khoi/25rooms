import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame, spokedWheel, vessel, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin } from '../structure.js';
import { windowBay } from '../joinery.js';
const smooth=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
function maker(H, R, i, j, hands, child = false, lean = 0, shirt = 'coral') {
  const [x, y] = H.p(i, j, child ? .35 : 0), s = child ? .85 : 1.2;
  oval(H, R, x + 5, y + 3, 14 * s, 4 * s, 'blue', .2);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x + side * 5 * s, y - 24 * s], [x + side * 6 * s, y - 10 * s], [x + side * 8 * s, y]], 'blue', 7 * s);
    oval(H, R, x + side * 8 * s + 3, y, 6 * s, 2.5 * s, 'blue', .8);
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

function peg(H,R,i,j,z,repair=false){
  const [x,y]=H.p(i,j,z);shape(H,R,[[x-2,y-7],[x+3,y-7],[x+2,y+6],[x-1,y+6]],'sun',.75);
  H.line(R,[[x+.5,y-5],[x+.5,y+5]],'blue',.6);oval(H,R,x+.4,y-1,3,1.5,'blue',.55);
  if(repair)stroke(H,R,[[x-3,y-2],[x+4,y],[x-2,y+2]],'paper',1.1);
}
const room=world('istanbul-roof-drying','A sail of clean cotton',{wall:false,floor:'paper',tone:.7,head:35},(H,R)=>{
  for(let a=0;a<10;a++)for(let b=0;b<10;b++)shape(H,R,H.tile(a*1.2+.018,b*1.2+.018,1.16,1.16,.025),'paper',1,.4);
  masonry(H,R,'ne',0,12,0,.98,'coral',.3);masonry(H,R,'nw',0,12,0,1.06,'paper',.85);
  for(let i=0;i<12;i+=1.2)timber(H,R,i,.01,1.17,.39,.98,.14,'paper');
  for(let j=.4;j<12;j+=1.2)timber(H,R,.01,j,.4,1.17,1.06,.14,'paper');
  masonry(H,R,'nw',1.65,3.15,0,3.55,'teal',.35);
  windowBay(H,R,'nw',2.04,2.34,.15,3.04,{ink:'teal',divisions:2});
  shape(H,R,[H.p(.05,1.48,3.62),H.p(1.45,1.48,3.35),H.p(1.45,4.97,3.35),H.p(.05,4.97,3.62)],'coral',.5);
  for(const j of [1.75,4.72])stroke(H,R,[H.p(.3,j,2.96),H.p(1.32,j,3.29)],'blue',2);
  box(H,R,.32,.32,1.4,.9,.03,2.48,'paper',.6);metal(H,R,.2,.2,1.65,1.12,2.51,.14,'blue');
  for(let z=.3;z<2.4;z+=.35)H.line(R,[H.p(.32,1.23,z),H.p(1.72,1.23,z)],'coral',.7);
  stroke(H,R,[H.p(1.03,.8,2.65),H.p(1.03,.8,4.19)],'blue',2);stroke(H,R,[H.p(.43,.8,3.97),H.p(1.67,.8,3.97)],'blue',1.5);
  bentTube(H,R,[[11.68,.3,1.12],[11.68,1.24,1.12],[11.68,1.24,.18],[11.12,1.72,.11]],3,'teal');
  cabinetFrame(H,R,6.68,.69,4.67,1.35,.2,2.12,3,'teal',(i,j,w,d,z,h,n)=>{
    timber(H,R,i,j,w,d,z+.87,.08,'teal');
    if(n===0){for(let a=0;a<3;a++)cushion(H,R,i+.12,j+.12,w-.24,.72,z+.1+a*.19,.13,a===1?'coral':'paper');for(let a=0;a<3;a++)metal(H,R,i+.15+a*.32,j+.1,.07,.75,z+1.03,.7,'blue');}
    if(n===1){vessel(H,R,i+.65,j+.48,z+.1,17,17,'paper',true);box(H,R,i+.16,j+.14,w-.27,.66,z+1.02,.09,'sun',.3);for(let a=0;a<3;a++)box(H,R,i+.17+a*.32,j+.22,.26,.36,z+1.12,.22,['coral','paper','sun'][a],.6);}
    if(n===2){for(let a=0;a<3;a++)cushion(H,R,i+.08,j+.12,w-.18,.73,z+.97+a*.15,.12,'paper');box(H,R,i+.12,j+.09,w-.24,.8,z+.08,.59,'blue',.4);}
  });
  for(const i of [6.87,8.4]){
    const f=H.faceI(i,2.075,1.32,.37,1.09);shape(H,R,f,'teal',.16);
    H.clip(f,()=>{for(let a=0;a<12;a++){H.line(R,[H.p(i+a*.15,2.08,.35),H.p(i+a*.15-.5,2.08,1.16)],'blue',.45,{tone:.55});H.line(R,[H.p(i+a*.15,2.08,1.16),H.p(i+a*.15-.5,2.08,.35)],'blue',.45,{tone:.55});}});
    metal(H,R,i+1.08,2.1,.13,.06,.61,.2,'sun');
  }
  for(const [i,j]of [[1.78,3.38],[10.24,3.38]]){
    metal(H,R,i-.12,j-.12,.25,.25,.02,3.67,'teal');
    metal(H,R,i-.28,j-.24,.57,.5,.02,.1,'blue');
    stroke(H,R,[H.p(i-.25,j,3.21),H.p(i+.24,j,3.75)],'blue',2.5);
    metal(H,R,i-.3,j-.09,.6,.18,3.45,.16,'teal');
  }
  for(const z of [3.47,3.65])stroke(H,R,[H.p(1.77,3.39,z),H.p(6,3.39,z-.06),H.p(10.24,3.39,z)],'blue',1.1);
  for(let n=0;n<5;n++)stroke(H,R,[H.p(8.63+n*.045,3.37,3.43),H.p(8.65+n*.045,3.42,3.51)],'coral',1);
  metal(H,R,10.1,3.56,.34,.12,1.45,.1,'sun');
  stroke(H,R,[H.p(10.15,3.65,1.49),H.p(10.15,3.65,1.25),H.p(10.42,3.65,1.27)],'blue',1.6);
  basin(H,R,1.14,6.1,2.6,1.58,.73,'paper');
  for(const x of [1.3,3.42])for(const j of [6.28,7.36])metal(H,R,x,j,.11,.11,.02,.71,'teal');
  box(H,R,1.15,6.13,2.55,1.48,.02,.06,'teal',.55);
  for(let a=0;a<7;a++)H.line(R,[H.p(1.33+a*.31,6.23,.09),H.p(1.33+a*.31,7.45,.09)],'paper',.8);
  vessel(H,R,4.13,1.43,.04,27,48,'teal',true);metal(H,R,4.13,1.99,.12,.4,.32,.12,'coral');
  stroke(H,R,[H.p(.68,5.6,.07),H.p(.68,5.5,2.23)],'sun',3);const broom=H.p(.68,5.61,.06);for(let a=0;a<8;a++)stroke(H,R,[[broom[0]-8+a*2.2,broom[1]],[broom[0]-4+a*1.1,broom[1]-18]],'sun',1.3);
  benchFrame(H,R,3.6,9.1,4.2,1.65,.73,'sun');cushion(H,R,3.92,9.3,1.38,1.09,.74,.15,'paper');
  shape(H,R,H.tile(5.57,9.38,1.16,.83,.76),'coral',.38);for(let a=0;a<5;a++)H.line(R,[H.p(5.7+a*.18,9.4,.77),H.p(5.7+a*.18,10.12,.77)],'paper',.6);
  metal(H,R,7.12,9.32,.41,.85,.75,.11,'blue');for(let a=0;a<4;a++)H.line(R,[H.p(7.15,9.44+a*.16,.87),H.p(7.5,9.44+a*.16,.87)],'paper',1);
  box(H,R,8.74,9.39,2,1.54,.04,.68,'sun',.42);for(let a=0;a<9;a++)H.line(R,[H.p(8.82+a*.21,10.95,.14),H.p(8.82+a*.21,10.95,.65)],'coral',.8);
  cushion(H,R,8.94,9.62,1.61,1.05,.69,.17,'paper');
  benchFrame(H,R,10.17,6.82,1.31,1.29,.43,'teal');const mirror=H.p(10.79,7.36,.47);oval(H,R,mirror[0],mirror[1]-14,11,14,'sun',.7);oval(H,R,mirror[0],mirror[1]-14,8,11,'paper',1);
  for(const i of [10.28,10.78]){const p=H.p(i,8.64,.03);oval(H,R,...p,10,5,'coral',.55);oval(H,R,p[0]-2,p[1]-2,6,3,'blue',.7);}
  for(const i of [4.65,6.83]){bentTube(H,R,[[i,5.75,.03],[i,7.29,1.12]],2.4,'teal');bentTube(H,R,[[i,7.35,.03],[i,5.8,1.12]],2.4,'teal');oval(H,R,...H.p(i,6.55,.58),2.7,2.7,'sun',1);}
  for(let n=0;n<7;n++)stroke(H,R,[H.p(4.63,5.83+n*.24,1.13),H.p(6.87,5.83+n*.24,1.13)],'blue',1.3);
  shape(H,R,[H.p(5.1,5.85,1.14),H.p(5.72,5.85,1.14),H.p(5.72,6.72,1.14),H.p(5.71,6.79,.65),H.p(5.1,6.79,.65)],'coral',.26);stroke(H,R,[H.p(5.19,5.88,1.15),H.p(5.19,6.73,1.15),H.p(5.19,6.8,.7)],'paper',.8);
  const sock=H.p(11.52,1.86,.12);shape(H,R,[[sock[0]-2,sock[1]-9],[sock[0]+4,sock[1]-9],[sock[0]+4,sock[1]-2],[sock[0]+8,sock[1]],[sock[0]+7,sock[1]+4],[sock[0]-2,sock[1]+4]],'coral',.45);
  floorLight(H,6.3,6.1,180,.42);
},(H,R,time)=>{
  const u=((time%20)+20)%20,p=smooth((u-4)/4)*(1-smooth((u-12)/6)),breath=.045*Math.sin(u*Math.PI/10);
  const sheet=[];sheet.push(H.p(2.14,3.43,3.46),H.p(6.9,3.43,3.46));
  for(let n=10;n>=0;n--){const x=2.14+n*.476;sheet.push(H.p(x,3.54+Math.sin(n*.9)*.08+breath,1.02+Math.sin(n*.9)*.06));}
  shape(H,R,sheet,'paper',1);
  for(let n=0;n<8;n++){const x=2.34+n*.61;stroke(H,R,[H.p(x,3.45,3.4),H.p(x+.05,3.54+breath,2.66),H.p(x+.12,3.55+breath,1.12)],n%3?'blue':'sun',n%3?.8:1.5,.38);}
  stroke(H,R,[H.p(2.21,3.58+breath,1.15),H.p(4.54,3.63+breath,1.09),H.p(6.86,3.6+breath,1.16)],'blue',.8,.5);
  shape(H,R,[H.p(5.17,3.6+breath,2.32),H.p(5.76,3.6+breath,2.32),H.p(5.76,3.6+breath,2.88),H.p(5.17,3.6+breath,2.88)],'sun',.14);
  for(let n=0;n<6;n++)H.line(R,[H.p(5.2+n*.1,3.615+breath,2.33),H.p(5.2+n*.1,3.615+breath,2.4)],'coral',.5);
  for(const [i,n]of [[2.21,1],[4.4,0],[6.82,0]])peg(H,R,i,3.48,3.48,!!n);
  for(const i of [1.77,10.24]){const [x,y]=H.p(i,3.47,3.55);spokedWheel(H,R,x,y,9,i>5?'paper':'blue',p*2.7,1);}
  const grip=H.p(9.64,4.02+p*.67,1.91-p*.23),end=H.p(10.2,3.54,3.48),back=H.p(10.34,3.56,1.47);
  stroke(H,R,[end,[grip[0]+3,grip[1]-13],grip,[grip[0]+4,grip[1]+13],back],'blue',1.3);
  const approach=smooth((u-.4)/2)*(1-smooth((u-17)/1));const rest=H.p(9.53,5.06,1.01),hand=[rest[0]+(grip[0]-rest[0])*approach,rest[1]+(grip[1]-rest[1])*approach];
  maker(H,R,9.49,5.05,[H.p(9.41,4.63,1.25),hand],false,p*2);
  const pouch=.045*Math.sin(u*Math.PI/10);shape(H,R,[H.p(7.68,3.46,3.42),H.p(8.17,3.46,3.42),H.p(8.2+pouch,3.49,2.75),H.p(7.65+pouch,3.49,2.75)],'coral',.55);stroke(H,R,[H.p(7.8,3.46,3.45),H.p(7.82,3.46,3.7),H.p(8.06,3.46,3.45)],'blue',1);
  for(let n=0;n<4;n++)peg(H,R,7.72+n*.1,3.51,2.86,n===1);
  shape(H,R,[H.p(8.52,3.4,3.45),H.p(9.04,3.4,3.45),H.p(9.04,3.44,2.51),H.p(8.52,3.44,2.51)],'teal',.3);
  shape(H,R,[H.p(8.64,3.46,3.03),H.p(8.83,3.46,3.03),H.p(8.83,3.46,2.68),H.p(8.59,3.46,2.68),H.p(8.55,3.46,2.8),H.p(8.64,3.46,2.82)],'coral',.6);
  peg(H,R,8.73,3.49,3.07);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
