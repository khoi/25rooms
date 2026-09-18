import { world, shape, oval, stroke, ell, wallPt, bottle } from '../../worlds/common.js';
import { surface, timber, bentTube, drape, cushion, metal, vessel } from '../materials.js';
import { windowBay, hangingRail, floorShadow, recessedFrame } from '../joinery.js';

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
 surface(H,R,[[x-r*.77,y-h+3],[x-r*.34,y-h+8],[x-r*.41,y-h+18],[x-r*.77,y-h+13]],'paper',.85);
 H.line(R,[[x-r*.67,y-h+6],[x-r*.43,y-h+10]],'teal',1);
 for(const a of [-1,1])H.line(R,[[x+a*r*.75,y-h+1],[x+a*r*.56,y-3]],'blue',1.5);
 if(repair){stroke(H,R,[[x-r*.74,y-h+4],[x-r*.55,y-4],[x-r*.26,y-2]],'paper',2.2);H.line(R,[[x-r*.5,y-h+6],[x-r*.34,y-5]],'teal',1.2)}
}
function fruit(H,R,i,j,z,n=7){const [x,y]=H.p(i,j,z);for(let k=0;k<n;k++){const dx=(k%4-1.5)*12,dy=Math.floor(k/4)*9;oval(H,R,x+dx,y+dy-8,8,8,k===n-1?'coral':'sun',.8);stroke(H,R,[[x+dx,y+dy-14],[x+dx+3,y+dy-19],[x+dx+7,y+dy-17]],'teal',1.3);H.line(R,[[x+dx-4,y+dy-12],[x+dx-5,y+dy-8]],'paper',1)}}
const room=world('hanoi-fruit-yoke','Two baskets in balance',{floor:'paper',wall:'paper',wallTone:.83,height:3.95,head:20,tone:.65},(H,R)=>{
 for(let i=.1;i<12;i+=.72)for(const j of [.1,10.96]){surface(H,R,H.tile(i,j,.63,.64,.015),'teal',.4,.4);surface(H,R,[H.p(i+.13,j+.32,.025),H.p(i+.32,j+.12,.025),H.p(i+.5,j+.32,.025),H.p(i+.32,j+.51,.025)],'sun',.5,.3)}
 for(let j=1.25;j<10.5;j+=1.4)H.line(R,[H.p(.5,j),H.p(11.5,j)],'blue',.5,{tone:.25});
 for(const z of [.13,3.79])timber(H,R,.09,.35,.21,11.31,z,.12,'teal');
 recessedFrame(H,R,'nw',6.0,2.08,1.58,1.8,'teal',P=>{
  H.line(R,[P(.1,.24),P(1.94,.24)],'sun',4);
  for(const [u,v]of [[.44,.25],[1.26,.25]]){const [x,y]=P(u,v);surface(H,R,[[x-7,y],[x+7,y],[x+7,y-13],[x-7,y-13]],'paper',1);oval(H,R,x,y-13,7,3,'sun',.59);H.line(R,ell(x+8,y-7,4,5),'blue',1);}
  const [x,y]=P(1.01,1.1);surface(H,R,[[x-15,y],[x+15,y],[x+11,y-13],[x-12,y-12]],'coral',.47);H.line(R,[[x-10,y-6],[x+9,y-6]],'paper',1.5);
 });
 recessedFrame(H,R,'nw',8.76,2.4,.25,3.31,'teal',P=>{
   surface(H,R,[P(.15,.12),P(2.24,.12),P(2.24,3.15),P(.15,3.15)],'blue',.65);
   for(const u of [.27,1.29]){surface(H,R,[P(u,.31),P(u+.79,.31),P(u+.79,2.98),P(u,2.98)],'teal',.46);for(const z of [.58,1.88])surface(H,R,[P(u+.11,z),P(u+.66,z),P(u+.66,z+.79),P(u+.11,z+.79)],'paper',.35);}
   H.line(R,[P(1.07,1.4),P(1.07,1.77)],'sun',2.6);
 });
 timber(H,R,.19,8.65,.6,2.62,.02,.18,'sun');
 windowBay(H,R,'ne',1.5,7.95,1.8,1.63,{divisions:5,ink:'teal'});
 H.tint([H.p(2,.5,.015),H.p(7.7,.5,.015),H.p(10.7,4.9,.015),H.p(7.6,7.1,.015)],'sun',.18);
 for(const i of [3.36,7.3,10.86])for(const j of [.57,2.43])bentTube(H,R,[[i-.22,j+.18,.04],[i,j,.93],[i+.04,j,1.62]],4,'sun');
 for(const i of [3.46,7.27,10.74])bentTube(H,R,[[i,.65,.23],[i,2.35,.83]],2.1,'teal');
 for(const j of [.59,2.3])timber(H,R,3.3,j,7.6,.13,.77,.12,'sun');
 for(let n=0;n<12;n++)timber(H,R,3.27+n*.64,.52,.48,2.04,1.04,.1,'sun');
 timber(H,R,3.25,2.53,7.74,.12,1.06,.22,'teal');
 timber(H,R,3.39,.78,7.2,1.33,.35,.1,'teal');
 for(const i of [3.59,5.61]){basket(H,R,i,1.54,.46,20,16,i<4);H.line(R,[H.p(i-.2,1.54,.91),H.p(i+.18,1.54,.91)],'paper',2);}
 for(const i of [5.12,7.25,9])timber(H,R,i,.69,.09,1.72,1.14,.24,'sun');
 surface(H,R,H.tile(3.51,.75,7.1,1.56,1.15),'paper',.83,.5);
 for(let i=3.63;i<10.4;i+=.28)H.line(R,[H.p(i,.86,1.16),H.p(i,2.17,1.16)],'sun',.8);
 basket(H,R,4.42,1.4,1.18,27,19);fruit(H,R,4.42,1.4,1.45,7);
 basket(H,R,6.38,1.51,1.18,25,19);fruit(H,R,6.38,1.46,1.48,6);
 const [bx,by]=H.p(8.25,1.39,1.24);for(let k=0;k<6;k++)stroke(H,R,[[bx-16+k*5,by-8],[bx-19+k*6,by+1],[bx-12+k*6,by+8],[bx-7+k*5,by+3]],'sun',4.4);
 cushion(H,R,9.29,.86,1.14,1.11,1.2,.08,'paper');fruit(H,R,9.91,1.38,1.39,1);
 basket(H,R,8.6,1.58,.46,25,24,true);
 const [px0,py0]=H.p(7.63,1.59,1.29);surface(H,R,[[px0-11,py0],[px0+17,py0+2],[px0+22,py0-17],[px0-5,py0-15]],'teal',.47);for(let n=0;n<4;n++)H.line(R,[[px0-5+n*5,py0-12],[px0-8+n*6,py0-1]],'paper',.8);
 const [tx0,ty0]=H.p(10.07,1.36,1.32);oval(H,R,tx0,ty0-6,11,10,'sun',.78);H.line(R,[[tx0-3,ty0-12],[tx0-5,ty0-5]],'paper',1.2);H.line(R,[[tx0,ty0-16],[tx0+5,ty0-22]],'teal',1.8);

 for(const j of [.55,2.44])timber(H,R,3.31,j,7.52,.1,1.21,.19,'teal');
 for(const i of [3.45,10.76])bentTube(H,R,[[i,.65,1.6],[i,.65,2.53],[i+.5,1.13,2.63]],2,'teal');
 const canopy=[H.p(3.43,.61,2.61),H.p(10.79,.61,2.61),H.p(11.12,1.0,2.53),H.p(3.76,1.0,2.53)];surface(H,R,canopy,'paper',1);for(let k=0;k<10;k++)H.line(R,[H.p(3.51+k*.71,.63,2.61),H.p(3.81+k*.71,.97,2.54)],k%2?'teal':'coral',1.1);
 for(const i of [4.3,9.6]){stroke(H,R,[H.p(i,.64,2.67),H.p(i,.86,2.54),H.p(i,1,2.43)],'blue',1.4);oval(H,R,...H.p(i,1,2.43),2,2,'coral',.8);}
 const Y=(u,z)=>wallPt(H,'nw',.85+u,z,-.28);
 stroke(H,R,[Y(0,3.47),Y(1.33,3.68),Y(2.83,3.73),Y(4.62,3.52)],'blue',6);stroke(H,R,[Y(0,3.47),Y(1.33,3.68),Y(2.83,3.73),Y(4.62,3.52)],'sun',4.5);
 for(const u of [.41,4.21])stroke(H,R,[Y(u,3.68),Y(u,3.42),Y(u+.12,3.38)],'teal',2);
 hangingRail(H,R,'nw',1,4.3,3.36,3,(P,u,n)=>{if(n===0){stroke(H,R,[P(u-.42,-.35),P(u,-.18),P(u+.55,-.3)],'sun',6);H.line(R,[P(u-.4,-.32),P(u+.45,-.26)],'paper',1)}else if(n===1){surface(H,R,[P(u-.25,-.12),P(u+.31,-.12),P(u+.58,-1.66),P(u-.44,-1.72)],'teal',.42,.7);for(let k=0;k<3;k++)H.line(R,[P(u-.12+k*.13,-.3),P(u-.2+k*.22,-1.6)],'paper',.7)}else{stroke(H,R,[P(u,-.1),P(u-.12,-.69),P(u+.17,-.8),P(u+.27,-.52)],'coral',3);}});
 timber(H,R,.66,2.13,1.58,2.2,.1,.12,'sun');
 for(const i of [.72,2.08])for(const j of [2.2,4.14])timber(H,R,i,j,.11,.12,.22,.62,'teal');
 for(const j of [2.23,4.05]){timber(H,R,.69,j,1.49,.11,.36,.12,'sun');timber(H,R,.69,j,1.49,.11,.76,.16,'sun');}
 for(let n=0;n<6;n++)timber(H,R,.68+n*.27,2.2,.2,1.99,.64,.1,'sun');
 drape(H,R,.81,2.39,1.14,1.33,.77,.13,'paper');
 const [sx,sy]=H.p(1.31,2.99,.85);oval(H,R,sx,sy,16,7,'teal',.43);oval(H,R,sx,sy-2,12,5,'paper',.86);
 stroke(H,R,[[sx-8,sy-4],[sx-12,sy-10],[sx-4,sy-14]],'sun',4);for(let k=0;k<4;k++)H.line(R,[[sx-12+k*2,sy-9],[sx-7+k*2,sy-13]],'blue',.7);
 const [vx,vy]=H.p(1.37,3.88,.8);surface(H,R,[[vx-13,vy],[vx+9,vy],[vx+13,vy-11],[vx-9,vy-15]],'paper',1);stroke(H,R,[[vx-9,vy-10],[vx,vy-5],[vx+8,vy-10]],'teal',1.5);H.line(R,[[vx,vy-5],[vx-2,vy+5]],'coral',1.8);
 hangingRail(H,R,'nw',5.16,.55,3.03,1,(P,u)=>{stroke(H,R,[P(u,-.14),P(u-.26,-.33),P(u-.28,-.89),P(u+.22,-.98),P(u+.29,-.38),P(u,-.14)],'sun',2);surface(H,R,[P(u-.24,-.42),P(u+.23,-.42),P(u+.21,-1.23),P(u-.2,-1.23)],'paper',.9);H.line(R,[P(u-.12,-.64),P(u+.12,-.64)],'teal',2);});
 for(const i of [3.5,7.5]){timber(H,R,i,4.49,.22,1.28,.08,.12,'sun');timber(H,R,i,4.69,.22,.25,.2,1.68,'sun');bentTube(H,R,[[i-.3,4.72,1.81],[i+.1,4.72,1.67],[i+.44,4.72,1.81]],2.2,'teal');}
 for(const i of [3.5,7.5]){metal(H,R,i-.1,4.6,.43,.4,.23,.14,'teal');bentTube(H,R,[[i+.13,4.78,.39],[i+.62,4.88,.94],[i+.13,4.78,1.42]],2,'teal');for(const z of [.35,1.37])H.dot(...H.p(i+.15,4.95,z),1.8,'sun');}
 for(const i of [2.6,7.53]) {timber(H,R,i,5.09,1.52,1.39,.18,.12,'sun');for(const j of [5.2,6.26])timber(H,R,i+.12,j,1.29,.11,.04,.19,'sun');}
 timber(H,R,.64,6.57,1.3,2.59,.15,.11,'teal');
 for(const j of [6.65,8.93])bentTube(H,R,[[.75,j,.24],[1.69,j,.71]],2,'blue');
 timber(H,R,.71,6.64,1.05,2.43,.77,.16,'sun');for(const j of [6.78,8.8])timber(H,R,.8,j,.76,.18,.1,.67,'sun');
 basket(H,R,1.24,7.35,1.09,13,13,true);
 const [px,py]=H.p(1.28,8.4,.98);oval(H,R,px,py,13,6,'paper',1);oval(H,R,px,py,8,3.5,'blue',.35);stroke(H,R,[[px-4,py-2],[px+10,py-10]],'sun',4);for(let n=0;n<5;n++)H.line(R,[[px+6+n,py-11],[px+8+n,py-7]],'blue',.55);
 basket(H,R,1.21,7.58,.35,14,16);
 surface(H,R,H.faceJ(1.79,6.7,2.2,.49,.7),'teal',.65);
 for(const j of [7.03,8.14])H.line(R,[H.p(1.81,j,.6),H.p(1.81,j+.43,.6)],'sun',2);
 const [nx,ny]=H.p(1.5,7.91,.96);surface(H,R,[[nx-7,ny],[nx+7,ny],[nx+4,ny-4],[nx-8,ny-3]],'coral',.7);H.line(R,[[nx-3,ny-2],[nx+7,ny-2]],'paper',1.1);
 drape(H,R,.85,8.75,.72,.26,.95,.33,'coral');
 for(const i of [4.14,5.58]){bentTube(H,R,[[i,9.22,.03],[i,10.16,.69],[i,9.24,.69],[i,10.2,.03]],2.6,'teal');}
 for(const i of [4.17,5.5])bentTube(H,R,[[i,9.23,.65],[i,9.08,1.44]],2.3,'teal');
 surface(H,R,[H.p(4.15,9.08,1.43),H.p(5.59,9.08,1.43),H.p(5.58,9.16,1.05),H.p(4.14,9.16,1.05)],'paper',1);
 H.line(R,[H.p(4.28,9.1,1.19),H.p(5.44,9.1,1.19)],'sun',1.5);
 cushion(H,R,4.05,9.22,1.69,.99,.65,.12,'paper');
 const [fx,fy]=H.p(4.82,9.65,.83);for(let n=0;n<5;n++)oval(H,R,fx-11+n*5,fy,2.1,5,'sun',.7);
 timber(H,R,6.21,9.02,1.14,1.08,.08,.09,'sun');
 for(const i of [6.26,7.16])for(const j of [9.08,9.84])timber(H,R,i,j,.11,.11,.17,.48,'sun');
 for(const z of [.27,.54])for(const j of [9.05,9.98])timber(H,R,6.24,j,1.02,.07,z,.08,'teal');
 bottle(H,R,...H.p(6.65,9.36,.19),'teal',.72);
 const [cx,cy]=H.p(7.05,9.69,.19);vessel(H,R,7.05,9.69,.19,6,10,'paper',true);H.line(R,ell(cx+7,cy-5,3,4),'blue',.9);
 drape(H,R,6.34,9.77,.52,.3,.6,.2,'paper');
 drape(H,R,6.94,8.91,.61,.75,.07,.02,'paper');
 bentTube(H,R,[[9.93,8.53,.05],[10.42,7.85,1.71],[10.58,7.86,1.78],[10.67,8.05,1.62]],2.1,'blue');
 basket(H,R,9.3,10.39,.035,22,26,true);
 const [wx,wy]=H.p(9.3,10.39,.75);surface(H,R,[[wx-14,wy],[wx+10,wy-3],[wx+18,wy+8],[wx-9,wy+12]],'paper',1);H.line(R,[[wx-5,wy+2],[wx+8,wy+8]],'teal',1.5);
 stroke(H,R,[[wx-10,wy+5],[wx-6,wy+17],[wx+8,wy+16]],'coral',2);
 metal(H,R,9.65,8.22,.9,.61,.02,.1,'teal');
 surface(H,R,[H.p(9.94,8.48,.05),H.p(10.2,8.64,.05),H.p(10.5,7.95,1.4),H.p(10.3,7.84,1.4)],'coral',.52,.6);
},(H,R,t)=>{
 const u=((t%18)+18)%18,q=ease(3.6,7.2,u)*(1-ease(10.8,16,u)),z=1.72+.38*q, sway=q*Math.sin((u-7.2)*2.5)*Math.exp(-Math.max(0,u-7.2)*.45)*.09;
 const ends=[[3.22,5.68+sway],[8.14,5.68-sway]];
 person(H,R,5.73,6.05,[H.p(5.42,5.73,z+.03),H.p(5.95,5.73,z+.03)],'coral',-1);
 stroke(H,R,[H.p(3.2,5.7,z-.13),H.p(4.1,5.7,z+.07),H.p(5.67,5.7,z+.22),H.p(7.2,5.7,z+.07),H.p(8.2,5.7,z-.13)],'blue',7);
 stroke(H,R,[H.p(3.2,5.7,z-.13),H.p(4.1,5.7,z+.07),H.p(5.67,5.7,z+.22),H.p(7.2,5.7,z+.07),H.p(8.2,5.7,z-.13)],'sun',5.5);
 H.line(R,[H.p(4.76,5.69,z+.17),H.p(6.39,5.69,z+.17)],'paper',1.7);
 for(const s of [3.34,4.14,7.23,8.07]){H.line(R,[H.p(s,5.66,z+(s>4&&s<7.4?.09:-.09)),H.p(s,5.75,z+(s>4&&s<7.4?.09:-.09))],'blue',2.1);}
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
