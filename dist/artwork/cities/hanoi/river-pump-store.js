import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, benchFrame, vessel, drape } from '../materials.js';
import { windowBay, floorShadow, hangingRail } from '../joinery.js';

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

function coil(H,R,P,r,turns=4){for(let n=turns-1;n>=0;n--){const pts=[];for(let k=0;k<58;k++){const a=k*Math.PI*2/57;pts.push(P(Math.cos(a)*(r-n*.12),Math.sin(a)*(r-n*.12)*.82))}H.line(R,pts,'blue',5.2);H.line(R,pts,'teal',2.4,{tone:.65});} }
function ring(H,R,x,y,r,ink='paper'){oval(H,R,x,y,r,r*.78,ink,ink==='paper'?1:.7);oval(H,R,x,y,r*.59,r*.47,'blue',.77);for(let k=0;k<6;k++){const a=k*Math.PI/3;H.dot(x+Math.cos(a)*r*.79,y+Math.sin(a)*r*.63,1.4,'sun');}}
const room=world('hanoi-river-pump-store','The handle finds its place',{floor:'paper',wall:'paper',wallTone:.68,height:3.65,head:55,tone:.52},(H,R)=>{
 for(let j=1.7;j<12;j+=2.2)H.line(R,[H.p(0,j),H.p(12,j)],'blue',.6,{tone:.24});
 surface(H,R,H.tile(.5,9.6,10.75,.29,.018),'blue',.31,.55);for(let i=.6;i<11.1;i+=.21)H.line(R,[H.p(i,9.63,.026),H.p(i+.11,9.85,.026)],'paper',1.1);
 windowBay(H,R,'nw',1.25,7.5,1.4,1.24,{divisions:3,view:P=>{shape(H,R,[P(.1,.1),P(7.4,.1),P(7.4,.57),P(.1,.57)],'teal',.38);H.line(R,[P(.1,.63),P(7.4,.63)],'blue',1.4);for(let n=0;n<5;n++)H.line(R,[P(.2+n*1.6,.66),P(.95+n*1.6,1.06),P(1.7+n*1.6,.66)],'blue',1);}});
 for(const i of [.38,11.45])metal(H,R,i,.42,.18,.18,0,4.31,'teal');
 bentTube(H,R,[[.48,.47,3.59],[5.98,.47,4.39],[11.54,.47,3.59],[.48,.47,3.59]],3,'blue');
 for(let i=1.2;i<11;i+=1.2)bentTube(H,R,[[i,.47,3.6],[5.98,.47,4.39]],1,'teal');
 for(let i=.6;i<11.6;i+=.67)timber(H,R,i,.41,.14,1.8,4.01,.08,'sun');
 H.tint([H.p(.8,1.9,.02),H.p(6.6,1.9,.02),H.p(9.4,7.8,.02),H.p(4.2,8.15,.02)],'sun',.13);
 for(let i=1.3;i<7.4;i+=.72)H.tint([H.p(i,1.2,.021),H.p(i+.16,1.2,.021),H.p(i+2.25,7.42,.021),H.p(i+2.07,7.42,.021)],'paper',.72);
 for(const i of [7.8,11.14]){metal(H,R,i,.48,.15,1.27,.04,.13,'teal');metal(H,R,i,.54,.12,.17,.17,3.28,'teal');}
 for(const z of [.35,1.4,3.41])metal(H,R,7.72,.56,3.63,.9,z,.12,'teal');
 const C=(u,v)=>H.p(9.44+u,.85,2.31+v);
 coil(H,R,C,1.36,5);
 bentTube(H,R,[[9.38,.59,2.29],[9.38,1.22,2.29],[10.03,1.22,2.29],[10.03,1.22,2.06]],3,'sun');
 metal(H,R,8.0,1.09,2.98,.43,.4,.16,'blue');
 const [cx,cy]=H.p(10.91,1.3,.74);ring(H,R,cx,cy,9,'paper');
 for(const [i,j,z]of[[8.13,1.1,1.43],[10.9,.89,1.49],[8.0,.84,3.54]]){const [x,y]=H.p(i,j,z);ring(H,R,x,y,6,'sun');}
 for(let n=0;n<6;n++)H.line(R,[H.p(7.84+n*.58,.69,.62),H.p(7.84+n*.58,.69,1.29)],'paper',.7);
 vessel(H,R,10.6,3.13,.12,30,59,'teal',false);
 for(const z of [.42,1.47]){const [x,y]=H.p(10.6,3.13,z);H.line(R,ell(x,y,28,9),'blue',3);H.line(R,ell(x,y-1,28,9),'paper',.8)}
 bentTube(H,R,[[10.31,3.52,.3],[9.79,3.82,.32],[9.78,4.4,.23]],3.6,'blue');
 metal(H,R,10.09,3.76,.24,.24,.31,.15,'coral');
 benchFrame(H,R,2.53,4.31,4.29,2.3,.83,'sun');
 for(const i of [3.17,5.01]) {metal(H,R,i,4.82,.53,1.03,.84,.2,'blue');metal(H,R,i+.06,4.88,.15,.83,1.04,.49,'teal');H.line(R,[H.p(i+.13,5.14,1.1),H.p(i+.14,5.42,1.44)],'paper',1.6);}
 const [x,y]=H.p(4.11,5.47,1.55);
 surface(H,R,[[x-41,y-21],[x+32,y-21],[x+39,y+24],[x-30,y+33],[x-42,y+14]],'blue',.78,1.2);
 H.line(R,[[x-36,y-15],[x+26,y-15]],'paper',2);
 oval(H,R,x+5,y+5,29,27,'sun',.74);oval(H,R,x+5,y+5,24,22,'blue',.92);oval(H,R,x+5,y+5,15,15,'teal',.5);oval(H,R,x+5,y+5,5,5,'paper',.8);
 for(let k=0;k<8;k++){const a=k*Math.PI/4;H.dot(x+5+Math.cos(a)*26,y+5+Math.sin(a)*24,1.8,'paper');}
 bentTube(H,R,[[3.22,5.12,1.71],[2.87,5.12,1.7],[2.87,5.12,1.33]],8,'teal');
 ring(H,R,...H.p(2.87,5.14,1.3),13,'paper');
 bentTube(H,R,[[4.08,4.76,1.72],[4.08,4.76,2.1],[4.81,4.76,2.1]],8,'teal');
 ring(H,R,...H.p(4.83,4.76,2.1),11,'paper');
 const [sx,sy]=H.p(5.58,6.08,1.29);metal(H,R,5.18,5.53,.47,.54,1.09,.46,'blue');H.line(R,[H.p(4.66,5.54,1.33),[sx,sy]],'blue',9);H.line(R,[H.p(4.66,5.54,1.36),[sx,sy-2]],'paper',2);
 ring(H,R,sx,sy,12,'teal');
 oval(H,R,sx,sy,4,4,'blue',.95);H.line(R,[[sx-2,sy-3],[sx+3,sy-3],[sx+3,sy+3]],'sun',1);
 const [dx,dy]=H.p(6.11,4.83,.91);ring(H,R,dx,dy,20,'teal');H.line(R,[[dx-12,dy-3],[dx-3,dy-11],[dx+7,dy-7]],'paper',1.3);
 surface(H,R,H.tile(2.78,5.96,.87,.38,.85),'paper',1,.5);const [gx,gy]=H.p(3.2,6.13,.89);H.line(R,ell(gx,gy,11,5),'coral',2);H.line(R,[[gx-8,gy-3],[gx-1,gy],[gx+3,gy-4]],'blue',1);
 drape(H,R,6.01,6.01,.6,.45,.87,.3,'paper');
 timber(H,R,1.15,8.14,2.42,1.09,.13,.14,'sun');
 for(const i of [1.33,2.18,2.92])metal(H,R,i,8.41,.25,.5,.29,.12,'paper');
 const [tx,ty]=H.p(1.69,8.64,.29);oval(H,R,tx,ty,9,5,'paper',1);H.line(R,[[tx+8,ty],[tx+20,ty+4]],'teal',3);
 surface(H,R,H.tile(9.38,8.27,1.75,1.04,.03),'coral',.22,.6);
 for(const i of [9.69,10.31]){const [bx,by]=H.p(i,8.81,.12);shape(H,R,[[bx-8,by],[bx+8,by],[bx+8,by-10],[bx+3,by-10],[bx+3,by-29],[bx-6,by-29]],'blue',.77);oval(H,R,bx-1,by-30,5,2,'teal',.4);}
 bentTube(H,R,[[9.12,7.95,.06],[8.36,8.02,2.33]],3,'sun');
 for(const j of [7.08,7.72])timber(H,R,8.01,j,1.45,.12,.25,.12,'sun');for(const i of [8.04,9.3])timber(H,R,i,7.09,.13,.74,.25,.72,'sun');
 vessel(H,R,7.38,9.71,.05,15,25,'paper',true);
});
room.live=(H,R,t)=>{
 const u=((t%20)+20)%20,insert=ease(.5,4,u)*(1-ease(16,18,u)),turn=ease(4,8,u)*(1-ease(12,16,u)),a=-.9+turn*.95;
 const [sx,sy]=H.p(5.58,6.08,1.29),px=sx+19*(1-insert),py=sy+11*(1-insert),grip=[px+Math.cos(a)*22,py+Math.sin(a)*22];
 person(H,R,6.22,6.87,[H.p(6.35,6.21,.96),grip],'teal',-2);
 person(H,R,7.27,4.87,[H.p(6.99,4.73,1.12),H.p(6.81,4.44,1.7)],'coral',-3*turn);
 H.line(R,[[px,py],[px+Math.cos(a)*18,py+Math.sin(a)*18],grip],'blue',5.3);H.line(R,[[px-1,py-1],[px+Math.cos(a)*18-1,py+Math.sin(a)*18-1]],'paper',1.5);
 oval(H,R,...grip,5,3,'sun',.85);H.line(R,[[grip[0]-3,grip[1]],[grip[0]+2,grip[1]-1]],'paper',1.1);
 const [cx,cy]=H.p(4.11,5.47,1.55);for(let n=0;n<4;n++){const ang=n*Math.PI/2+turn*.9;stroke(H,R,[[cx+5,cy+5],[cx+5+Math.cos(ang)*15,cy+5+Math.sin(ang)*15],[cx+5+Math.cos(ang+.3)*19,cy+5+Math.sin(ang+.3)*19]],'sun',2.4)}
 const P=(a,z)=>wallPt(H,'nw',9.28+a,z,-.26),wave=Math.sin(u*Math.PI/10)*.045;
 surface(H,R,[P(0,3.3),P(1.49,3.3),P(1.51,2.5+wave),P(.05,2.4)],'teal',.38,.65);
};
room.loopSeconds=20;
room.stillTime=9.5;
export default room;
