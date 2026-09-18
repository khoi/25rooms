import { world, shape, oval, stroke, ell, wallPt, bottle } from '../../worlds/common.js';
import { surface, timber, bentTube, drape, cushion } from '../materials.js';
import { windowBay, hangingRail, floorShadow } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q)};
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
function basket(H,R,i,j,z,r=28,h=28,repair=false){
 const [x,y]=H.p(i,j,z),body=[[x-r,y-h],[x+r,y-h],[x+r*.77,y-3],[x+r*.45,y+2],[x-r*.5,y+2],[x-r*.79,y-4]];
 surface(H,R,body,'sun',.52,1);
 H.clip(body,()=>{for(let n=0;n<10;n++){const xx=x-r+n*r*2/9;stroke(H,R,[[xx,y-h],[x+(xx-x)*.91,y-h*.5],[x+(xx-x)*.73,y+3]],n===2&&repair?'paper':'coral',n===2&&repair?2.2:1.1,.66)}for(let n=0;n<6;n++)stroke(H,R,[[x-r,y-h+5+n*4],[x,y-h+10+n*4],[x+r,y-h+5+n*4]],'blue',.55,.58);});
 oval(H,R,x,y-h,r,r*.34,'sun',.83);oval(H,R,x,y-h-.5,r-3,r*.26,'blue',.54);
 H.line(R,ell(x,y-h,r-1,r*.31,30),'paper',1.3);
 oval(H,R,x,y+1,r*.57,3,'coral',.48);
 if(repair){stroke(H,R,[[x-r*.74,y-h+4],[x-r*.55,y-4],[x-r*.26,y-2]],'paper',2.2);H.line(R,[[x-r*.5,y-h+6],[x-r*.34,y-5]],'teal',1.2)}
}
function fruit(H,R,i,j,z,n=7){const [x,y]=H.p(i,j,z);for(let k=0;k<n;k++){const dx=(k%4-1.5)*12,dy=Math.floor(k/4)*9;oval(H,R,x+dx,y+dy-8,8,8,k===n-1?'coral':'sun',.8);stroke(H,R,[[x+dx,y+dy-14],[x+dx+3,y+dy-19],[x+dx+7,y+dy-17]],'teal',1.3);H.line(R,[[x+dx-4,y+dy-12],[x+dx-5,y+dy-8]],'paper',1)}}
const room=world('hanoi-fruit-yoke','Two baskets in balance',{floor:'paper',wall:'paper',wallTone:.83,height:3.95,head:20,tone:.65},(H,R)=>{
 for(let i=.1;i<12;i+=.72)for(const j of [.1,10.96]){surface(H,R,H.tile(i,j,.63,.64,.015),'teal',.4,.4);surface(H,R,[H.p(i+.13,j+.32,.025),H.p(i+.32,j+.12,.025),H.p(i+.5,j+.32,.025),H.p(i+.32,j+.51,.025)],'sun',.5,.3)}
 for(let j=1.25;j<10.5;j+=1.4)H.line(R,[H.p(.5,j),H.p(11.5,j)],'blue',.5,{tone:.25});
 windowBay(H,R,'ne',1.5,7.95,1.8,1.63,{divisions:5,ink:'teal'});
 H.tint([H.p(2,.5,.015),H.p(7.7,.5,.015),H.p(10.7,4.9,.015),H.p(7.6,7.1,.015)],'sun',.18);
 for(const i of [3.36,7.3,10.86])for(const j of [.57,2.43])bentTube(H,R,[[i-.22,j+.18,.04],[i,j,.93],[i+.04,j,1.62]],4,'sun');
 for(const j of [.59,2.3])timber(H,R,3.3,j,7.6,.13,.77,.12,'sun');
 for(let n=0;n<12;n++)timber(H,R,3.27+n*.64,.52,.48,2.04,1.04,.1,'sun');
 timber(H,R,3.25,2.53,7.74,.12,1.06,.22,'teal');
 surface(H,R,H.tile(3.51,.75,7.1,1.56,1.15),'paper',.83,.5);
 for(let i=3.63;i<10.4;i+=.28)H.line(R,[H.p(i,.86,1.16),H.p(i,2.17,1.16)],'sun',.8);
 basket(H,R,4.42,1.4,1.18,27,19);fruit(H,R,4.42,1.4,1.45,7);
 basket(H,R,6.38,1.51,1.18,25,19);fruit(H,R,6.38,1.46,1.48,6);
 const [bx,by]=H.p(8.25,1.39,1.24);for(let k=0;k<6;k++)stroke(H,R,[[bx-16+k*5,by-8],[bx-19+k*6,by+1],[bx-12+k*6,by+8],[bx-7+k*5,by+3]],'sun',4.4);
 cushion(H,R,9.29,.86,1.14,1.11,1.2,.08,'paper');fruit(H,R,9.91,1.38,1.39,1);
 basket(H,R,8.6,1.58,.46,25,24,true);
 for(const i of [3.45,10.76])bentTube(H,R,[[i,.65,1.6],[i,.65,2.53],[i+.5,1.13,2.63]],2,'teal');
 hangingRail(H,R,'nw',1,4.3,3.36,3,(P,u,n)=>{if(n===0){stroke(H,R,[P(u-.42,-.35),P(u,-.18),P(u+.55,-.3)],'sun',6);H.line(R,[P(u-.4,-.32),P(u+.45,-.26)],'paper',1)}else if(n===1){surface(H,R,[P(u-.25,-.12),P(u+.31,-.12),P(u+.58,-1.66),P(u-.44,-1.72)],'teal',.42,.7);for(let k=0;k<3;k++)H.line(R,[P(u-.12+k*.13,-.3),P(u-.2+k*.22,-1.6)],'paper',.7)}else{stroke(H,R,[P(u,-.1),P(u-.12,-.69),P(u+.17,-.8),P(u+.27,-.52)],'coral',3);}});
 for(const i of [3.5,7.5]){timber(H,R,i,4.49,.22,1.28,.08,.12,'sun');timber(H,R,i,4.69,.22,.25,.2,1.68,'sun');bentTube(H,R,[[i-.3,4.72,1.81],[i+.1,4.72,1.67],[i+.44,4.72,1.81]],2.2,'teal');}
 for(const i of [2.6,7.53]) {timber(H,R,i,5.09,1.52,1.39,.18,.12,'sun');for(const j of [5.2,6.26])timber(H,R,i+.12,j,1.29,.11,.04,.19,'sun');}
 timber(H,R,.71,6.64,1.05,2.43,.77,.16,'sun');for(const j of [6.78,8.8])timber(H,R,.8,j,.76,.18,.1,.67,'sun');
 basket(H,R,1.24,7.35,1.09,13,13,true);
 const [px,py]=H.p(1.28,8.4,.98);oval(H,R,px,py,13,6,'paper',1);oval(H,R,px,py,8,3.5,'blue',.35);stroke(H,R,[[px-4,py-2],[px+10,py-10]],'sun',4);for(let n=0;n<5;n++)H.line(R,[[px+6+n,py-11],[px+8+n,py-7]],'blue',.55);
 drape(H,R,.85,8.75,.72,.26,.95,.33,'coral');
 for(const i of [4.14,5.58]){bentTube(H,R,[[i,9.22,.03],[i,10.16,.69],[i,9.24,.69],[i,10.2,.03]],2.6,'teal');}
 cushion(H,R,4.05,9.22,1.69,.99,.65,.12,'paper');
 const [fx,fy]=H.p(4.82,9.65,.83);for(let n=0;n<5;n++)oval(H,R,fx-11+n*5,fy,2.1,5,'sun',.7);
 bottle(H,R,...H.p(6.65,9.36,.03),'teal',.72);
 drape(H,R,6.94,8.91,.61,.75,.07,.02,'paper');
 bentTube(H,R,[[9.93,8.53,.05],[10.42,7.85,1.71],[10.58,7.86,1.78],[10.67,8.05,1.62]],2.1,'blue');
 surface(H,R,[H.p(9.94,8.48,.05),H.p(10.2,8.64,.05),H.p(10.5,7.95,1.4),H.p(10.3,7.84,1.4)],'coral',.52,.6);
},(H,R,t)=>{
 const u=((t%18)+18)%18,q=ease(3.6,7.2,u)*(1-ease(10.8,16,u)),z=1.72+.38*q, sway=q*Math.sin((u-7.2)*2.5)*Math.exp(-Math.max(0,u-7.2)*.45)*.09;
 const ends=[[3.22,5.68+sway],[8.14,5.68-sway]];
 person(H,R,5.73,6.05,[H.p(5.42,5.73,z+.03),H.p(5.95,5.73,z+.03)],'coral',-1);
 stroke(H,R,[H.p(3.2,5.7,z-.13),H.p(4.1,5.7,z+.07),H.p(5.67,5.7,z+.22),H.p(7.2,5.7,z+.07),H.p(8.2,5.7,z-.13)],'blue',7);
 stroke(H,R,[H.p(3.2,5.7,z-.13),H.p(4.1,5.7,z+.07),H.p(5.67,5.7,z+.22),H.p(7.2,5.7,z+.07),H.p(8.2,5.7,z-.13)],'sun',5.5);
 H.line(R,[H.p(4.76,5.69,z+.17),H.p(6.39,5.69,z+.17)],'paper',1.7);
 cushion(H,R,5.15,5.53,1.04,.35,z+.2,.08,'paper');
 for(const [n,[i,j]]of ends.entries()){
  const bz=.31+.38*q,top=H.p(n?8.2:3.2,5.7,z-.11),center=H.p(i,j,bz),left=[center[0]-29,center[1]-25],right=[center[0]+29,center[1]-25];
  stroke(H,R,[left,top,right],'blue',1.9);stroke(H,R,[[center[0],center[1]-33],top,[center[0],center[1]-17]],n?'teal':'coral',1.6);
  basket(H,R,i,j,bz,31,25,n===0);
  const [kx,ky]=top;oval(H,R,kx,ky+2,3,2,'coral',.85);
 }
 const [x,y]=wallPt(H,'nw',3.58,1.92,-.28);stroke(H,R,[[x-12,y],[x,y+5],[x+13,y+Math.sin(u*Math.PI/9)*1.6]],'paper',1.4);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
