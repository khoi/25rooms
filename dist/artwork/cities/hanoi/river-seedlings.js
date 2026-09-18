import { world, shape, oval, stroke, ell, wallPt } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, vessel, drape } from '../materials.js';
import { masonry } from '../structure.js';
import { floorShadow, hangingRail } from '../joinery.js';

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

function leaf(H,R,i,j,z,size=1,lean=0){
 const [x,y]=H.p(i,j,z),h=17*size;
 stroke(H,R,[[x,y],[x+lean,y-h*.51],[x+lean*1.4,y-h]],'teal',1.15*size);
 if((Math.floor(i*4)+Math.floor(j*3))%4===1){for(const [side,level]of [[1,.37],[-1,.61],[1,.82]]){const xx=x+lean*level,yy=y-h*level;surface(H,R,[[xx,yy],[xx+side*6*size,yy-13*size],[xx+side*8*size,yy-15*size],[xx+side*5*size,yy-3*size]],'teal',.58,.4);H.line(R,[[xx,yy],[xx+side*7*size,yy-13*size]],'sun',.65);}return;}
 for(const [side,level]of[[-1,.36],[1,.58],[-1,.78]]){const xx=x+lean*level*1.4,yy=y-h*level,w=10*size;surface(H,R,[[xx,yy],[xx+side*w*.54,yy-w*.76],[xx+side*w,yy-w*.68],[xx+side*w*.78,yy-w*.16]],side===1?'sun':'teal',side===1?.45:.72,.4);H.line(R,[[xx,yy],[xx+side*w*.8,yy-w*.48]],'paper',.45);}
}
function tray(H,R,i,j,z,w=2.18,d=1.14,roots=false){
 metal(H,R,i,j,w,d,z,.15,'teal');surface(H,R,H.tile(i+.1,j+.1,w-.2,d-.2,z+.155),'blue',.72,.4);
 for(let a=0;a<5;a++)for(let b=0;b<2;b++){const x=i+.17+a*(w-.35)/5,y=j+.13+b*(d-.22)/2;surface(H,R,H.tile(x,y,(w-.4)/5-.055,(d-.25)/2-.045,z+.18),'coral',.41,.4);if(!(a===4&&b===1&&w<2))leaf(H,R,x+.14,y+.17,z+.22,.83+(a%3)*.18,a===0?-3:1);else{const [sx,sy]=H.p(x+.14,y+.17,z+.24);oval(H,R,sx,sy,2,1.4,'sun',.7);}}
 for(const x of [i+.11,i+w-.12])bentTube(H,R,[[x,j+.23,z+.17],[x,j+.23,z+.35],[x,j+.86,z+.35],[x,j+.86,z+.17]],1.4,'blue');
 if(roots)for(let a=0;a<7;a++){const [x,y]=H.p(i+.2+a*(w-.4)/6,j+d+.01,z+.035);stroke(H,R,[[x,y],[x+2,y+8],[x-3,y+13],[x+1,y+18]],'paper',1);H.line(R,[[x+1,y+8],[x+5,y+10]],'sun',.55);H.line(R,[[x-1,y+10],[x-5,y+12],[x-4,y+16]],'paper',.65);H.line(R,[[x+1,y+15],[x+5,y+19]],'sun',.55);}
 if(roots){for(const j0 of [j+.13,j+d-.13]){H.line(R,[H.p(i+.13,j0,z+.02),H.p(i+w-.12,j0,z+.02)],'paper',1.2);}for(let n=0;n<4;n++)H.line(R,[H.p(i+.35+n*.43,j+d+.015,z+.12),H.p(i+.46+n*.43,j+d+.018,z-.09)],'blue',.8);}
 for(let n=0;n<3;n++)H.line(R,[H.p(i+w-.15,j+d-.22+n*.06,z+.2),H.p(i+w+.025,j+d-.22+n*.06,z-.02)],'paper',.9);
}
function carrier(H,R,i,j,z,w=1.35,d=.85){for(const x of[i,i+w])for(const y of[j,j+d])timber(H,R,x,y,.09,.1,z,.72,'sun');for(const y of[j,j+d]){timber(H,R,i,y,w,.1,z,.11,'sun');timber(H,R,i,y,w,.1,z+.58,.14,'sun');}for(let n=0;n<4;n++)timber(H,R,i+n*w/4,j,w/4-.06,d,z,.08,'sun');}
const room=world('hanoi-river-seedlings','A row ready to move',{floor:'paper',wall:false,height:1.2,head:60,tone:.6},(H,R)=>{
 for(let j=.08;j<12;j+=1.45)for(let i=.06;i<12;i+=1.8){surface(H,R,H.tile(i,j,1.73,1.36,.015),'paper',.8,.5);if(i>8&&j>7)H.tint(H.tile(i+.2,j+.1,1.2,.83,.02),'coral',.13);}
 masonry(H,R,'ne',.1,11.8,0,1.09,'paper',.79);masonry(H,R,'nw',.1,8.8,0,1.12,'paper',.79);
 timber(H,R,.15,1.47,.16,5.38,1.1,.12,'sun');
 for(const j of [1.61,3.65,6.57]){timber(H,R,.42,j,1.03,.14,.1,.75,'teal');bentTube(H,R,[[.55,j,.17],[1.32,j,.76]],1.6,'blue');}
 timber(H,R,.37,1.51,1.16,5.28,.86,.13,'sun');
 for(const j of [1.86,2.4,3.0]){const [x,y]=H.p(.95,j,1.02);vessel(H,R,.95,j,1.02,9,14,'coral',true);vessel(H,R,.95,j,1.28,8,12,'coral',true);H.line(R,[[x-6,y-12],[x-6,y-20]],'paper',1.2);}
 for(const j of [4.01,4.58]){const [x,y]=H.p(.99,j,1.03);surface(H,R,[[x-7,y],[x+7,y],[x+7,y-21],[x-6,y-21]],'paper',1);oval(H,R,x,y-21,7,3,'teal',.38);stroke(H,R,[[x,y-18],[x-3,y-11],[x+2,y-6],[x-2,y-1]],'sun',1.1);H.line(R,[[x-3,y-10],[x-5,y-7]],'blue',.6);}
 vessel(H,R,.95,5.75,1.02,12,15,'teal',true);bentTube(H,R,[[1.06,5.75,1.22],[1.53,5.57,1.53],[1.64,5.51,1.56]],3,'teal');
 const [cx0,cy0]=H.p(.91,5.64,1.42);stroke(H,R,[[cx0-10,cy0+5],[cx0-14,cy0-11],[cx0+4,cy0-15],[cx0+8,cy0+3]],'sun',2.1);
 for(const i of [1.1,8.64])for(const j of [.65,3.4]) {timber(H,R,i,j,.18,.18,.03,4.06,'sun');metal(H,R,i-.025,j-.03,.24,.24,.06,.21,'teal');}
 for(const j of [.63,3.45])timber(H,R,1.0,j,7.98,.2,4.05,.18,'sun');
 for(let i=1.12;i<8.86;i+=.43)timber(H,R,i,.57,.18,3.21,4.23,.065,'sun');
 for(const i of [1.16,8.7]){timber(H,R,i,.75,.14,2.64,2.97,.12,'teal');for(const j of [1.07,3.08]){metal(H,R,i-.05,j,.25,.24,3.78,.18,'teal');H.dot(...H.p(i+.22,j+.2,3.88),1.6,'sun');}}
 for(const i of [1.23,8.63])bentTube(H,R,[[i,.79,3.45],[i,1.39,4.1]],2.1,'teal');
 surface(H,R,[H.p(1.1,.57,4.3),H.p(4.03,.57,4.3),H.p(4.03,2.03,4.26),H.p(1.1,2.03,4.26)],'teal',.22);
 for(const i of [1.31,2.65,3.84]){H.line(R,[H.p(i,.62,4.34),H.p(i,.89,4.34)],'blue',2.4);H.line(R,[H.p(i,1.8,4.3),H.p(i,2.05,4.3)],'sun',2.4);}
 for(const i of [2.15,7.79])timber(H,R,i,.72,.12,.13,1.08,2.37,'sun');
 timber(H,R,2.13,.72,5.79,.13,3.38,.14,'sun');
 surface(H,R,[H.p(2.23,.75,1.45),H.p(7.78,.75,1.45),H.p(7.78,.75,3.25),H.p(2.23,.75,3.25)],'paper',.32);
 for(let i=2.33;i<7.8;i+=.43)H.line(R,[H.p(i,.74,1.49),H.p(i,.74,3.21)],'sun',1.1);
 for(const z of [1.52,2.07,2.65,3.21])H.line(R,[H.p(2.26,.74,z),H.p(7.75,.74,z)],'teal',1.4);
 bentTube(H,R,[[.93,.53,4.18],[9.08,.53,4.18],[9.19,.53,3.7],[9.19,.53,.41],[9.62,.72,.23]],3.5,'teal');
 for(let i=1.5;i<8.5;i+=.52)H.tint([H.p(i,2.9,.02),H.p(i+.19,2.9,.02),H.p(i+2.64,8.6,.02),H.p(i+2.42,8.6,.02)],'sun',.18);
 for(const i of [2.19,7.94])for(const j of [2.0,6.01])timber(H,R,i,j,.18,.2,.02,1.05,'sun');
 for(const [j,z]of[[2.05,1.81],[3.47,1.46],[4.92,1.09]]){
  for(const i of [2.18,7.94])timber(H,R,i,j,.18,1.29,.14,z-.13,'sun');
  for(let a=0;a<6;a++)timber(H,R,2.15+a*.995,j,.92,1.27,z-.13,.13,'sun');
  timber(H,R,2.17,j+1.22,5.97,.1,z-.07,.16,'sun');
  if(j<4.5){tray(H,R,2.39,j+.07,z+.015,2.5,1.08);tray(H,R,5.18,j+.07,z+.015,2.56,1.08);}
  else{tray(H,R,2.34,j+.06,z+.02,1.61,1.05);surface(H,R,H.tile(4.21,j+.07,2.69,1.09,z+.012),'blue',.63,.4);}
 }
 for(const i of [2.32,7.86]){bentTube(H,R,[[i,2.16,.37],[i,5.97,.91]],2.5,'teal');bentTube(H,R,[[i,2.16,1.61],[i,4.28,.44]],1.7,'blue');}
 timber(H,R,2.39,4.16,5.26,1.31,.19,.11,'sun');
 for(const [i,j]of [[2.58,4.45],[3.13,4.48]])vessel(H,R,i,j,.32,11,15,'coral',true);
 for(const z of [.32,.41,.5])metal(H,R,6.65,4.52,.97,.72,z,.06,'teal');
 surface(H,R,H.tile(4.24,5.02,2.56,1.0,1.08),'teal',.65);
 for(let n=0;n<4;n++)H.line(R,[H.p(4.38+n*.53,5.16,1.1),H.p(4.38+n*.53,5.84,1.1)],'paper',.7);
 timber(H,R,2.24,5.95,5.74,.14,.35,.18,'sun');
 for(const i of[4.22,6.53]){timber(H,R,i,5.3,.16,1.64,1.02,.1,'sun');metal(H,R,i,6.58,.18,.24,1.11,.47,'teal');metal(H,R,i-.07,6.55,.33,.29,1.58,.08,'paper');}
 metal(H,R,3.83,6.44,3.09,1.06,.2,.08,'teal');surface(H,R,H.tile(3.94,6.53,2.85,.88,.285),'blue',.26,.4);
 for(const i of[9.03,11.4])for(const j of[1.89,4.87])timber(H,R,i,j,.15,.16,.04,1.08,'teal');
 surface(H,R,H.tile(9.05,1.92,2.45,3.08,.76),'coral',.48,.7);
 for(const j of[1.89,4.9])timber(H,R,9.03,j,2.52,.14,.73,.45,'teal');for(const i of[9.03,11.4])timber(H,R,i,1.89,.14,3.08,.73,.45,'teal');
 for(let a=0;a<3;a++)for(let b=0;b<4;b++)leaf(H,R,9.35+a*.79,2.22+b*.66,1.02,.8,2-b);
 const lid=[H.p(9.03,1.95,2.31),H.p(11.54,1.95,2.31),H.p(11.54,4.9,1.38),H.p(9.03,4.9,1.38)];H.tint(lid,'teal',.14);H.outline(R,lid,'blue',2);H.outline(R,lid,'paper',.6);
 for(const j of [2.1,3.48,4.83])H.line(R,[H.p(9.06,j,2.31-(j-1.95)*.315),H.p(11.49,j,2.31-(j-1.95)*.315)],'sun',2.3);
 H.line(R,[H.p(9.48,2.24,2.21),H.p(10.67,3.78,1.73)],'paper',2.2,{tone:.7});
 for(const i of [9.18,11.23])metal(H,R,i,1.89,.29,.25,2.24,.11,'teal');
 for(const i of [9.18,11.17])bentTube(H,R,[[i,2.07,1.2],[i,2.07,2.23]],1.7,'blue');
 for(let i=9.65;i<11.5;i+=.64)H.line(R,[H.p(i,1.95,2.31),H.p(i,4.9,1.38)],'teal',2.5);
 for(const i of[9.14,11.43])bentTube(H,R,[[i,4.64,1.17],[i,4.22,1.6]],1.6,'blue');
 timber(H,R,11.36,4.47,.24,.37,1.2,.17,'sun');
 for(const z of[.08,.17,.26])metal(H,R,9.33,5.58,1.93,1.04,z,.07,'teal');
 hangingRail(H,R,'ne',2.1,5.7,3.12,4,(P,u,n)=>{if(n===0){oval(H,R,...P(u,-.2),10,5,'sun',.7);for(let k=0;k<5;k++)H.line(R,[P(u-.18+k*.07,-.1),P(u-.18+k*.07,-.33)],'paper',.7);}else if(n===1){for(let k=0;k<3;k++)stroke(H,R,[P(u,-.13),P(u-.22+k*.2,-.62),P(u-.16+k*.2,-.86)],'sun',2.2);}else{H.line(R,[P(u-.34,-.12),P(u-.34,-1.18),P(u+.31,-1.18),P(u+.31,-.12)],'teal',1.4);for(let k=0;k<3;k++)H.line(R,[P(u-.32,-.32-k*.25),P(u+.3,-.32-k*.25)],'teal',1)}},.87);
 carrier(H,R,8.41,8.45,.06,2.36,1.3);carrier(H,R,9.12,8.73,.2,1.12,.7);
 stroke(H,R,[H.p(8.55,8.82,.8),H.p(9.18,9.5,.4),H.p(10.24,9.61,.45)],'coral',4);
 surface(H,R,H.tile(8.4,10.08,2.95,.78,.022),'paper',.86,.6);for(let i=8.48;i<11.2;i+=.19)H.line(R,[H.p(i,10.15,.025),H.p(i,10.76,.025)],'teal',.7);
 surface(H,R,H.tile(9.24,6.02,2.08,1.13,.025),'blue',.2);
 timber(H,R,9.28,6.04,1.99,1.08,.12,.09,'sun');
 for(const i of [9.34,11.11])timber(H,R,i,6.06,.11,1.04,.2,.23,'teal');
 for(let k=0;k<3;k++){const [x,y]=H.p(9.69+k*.51,6.51,.31);surface(H,R,[[x-8,y],[x+7,y],[x+5,y-18],[x-6,y-18]],'paper',.7);H.line(R,[[x-5,y-14],[x+4,y-14]],'sun',1.2);}
 timber(H,R,.69,7.15,1.77,2.4,.42,.12,'sun');for(const i of[.81,2.22])for(const j of[7.3,9.25])timber(H,R,i,j,.13,.15,.04,.41,'sun');
 surface(H,R,H.tile(.8,7.26,1.52,2.1,.57),'paper',.9);
 for(const i of [.95,2.14])bentTube(H,R,[[i,7.35,.19],[i,9.1,.45]],1.7,'teal');
 vessel(H,R,1.52,7.77,.57,21,24,'sun',true);
 const [cx,cy]=H.p(1.52,7.77,.57);for(let k=0;k<6;k++)stroke(H,R,[[cx-19,cy-21+k*4],[cx,cy-18+k*4],[cx+19,cy-21+k*4]],'blue',.5);
 oval(H,R,...H.p(1.52,8.97,.59),16,8,'paper',1);oval(H,R,...H.p(1.52,8.97,.6),12,5,'teal',.28);
 const [sx,sy]=H.p(1.52,7.77,1.24);oval(H,R,sx,sy,20,8,'sun',.42);for(let n=0;n<6;n++){H.line(R,[[sx-15+n*6,sy-5],[sx-14+n*5,sy+5]],'blue',.65);H.line(R,[[sx-17,sy-4+n*1.5],[sx+16,sy-4+n*1.5]],'paper',.6);}
 const [rx,ry]=H.p(2.04,8.57,.61);H.line(R,[[rx-4,ry-1],[rx+8,ry-5]],'sun',3);for(let k=0;k<5;k++)H.line(R,[[rx+3+k*2,ry-6],[rx+5+k*2,ry-1]],'blue',.9);
 for(let n=0;n<3;n++)bentTube(H,R,[[2.07,8.17+n*.25,.59],[2.49,8.19+n*.25,.6]],1.7,'sun');
 for(const j of[9.52,11.47])timber(H,R,.35,j,.16,.19,.03,1.27,'teal');for(const z of[.39,1.07])timber(H,R,.43,9.56,.12,1.95,z,.12,'sun');
 for(let j=9.7;j<11.45;j+=.32)timber(H,R,.43,j,.13,.14,.26,1.05,'sun');
 for(const [i,j]of[[1.12,10.15],[1.45,10.47]]){const [x,y]=H.p(i,j,.028);oval(H,R,x,y,3,5,'coral',.3);for(let k=0;k<3;k++)H.dot(x-2+k*2,y-5,1.2,'coral',.3)}
 timber(H,R,4.03,9.12,2.86,1.57,.1,.14,'sun');
 for(const j of [9.19,10.54])timber(H,R,4.08,j,2.74,.1,.24,.37,'teal');
 for(const i of [4.12,6.74])timber(H,R,i,9.17,.1,1.34,.24,.34,'teal');
 surface(H,R,H.tile(4.23,9.31,2.37,1.11,.26),'blue',.64);
 for(let a=0;a<3;a++)for(let b=0;b<2;b++){const i=4.37+a*.49,j=9.44+b*.49;metal(H,R,i,j,.38,.36,.29,.28,'coral');H.dot(...H.p(i+.2,j+.18,.59),1.5,'blue');}
 bentTube(H,R,[[6.1,9.53,.34],[6.1,9.53,1.0],[6.48,9.53,1.0],[6.48,9.53,.34]],2.1,'teal');
 metal(H,R,5.98,9.38,.63,.53,.33,.1,'paper');
 for(const i of [4.29,6.53])bentTube(H,R,[[i,9.58,.58],[i,9.58,.76],[i,10.05,.76],[i,10.05,.58]],1.6,'sun');
 drape(H,R,6.0,10.48,.61,.28,.66,.31,'paper');
 vessel(H,R,2.81,9.9,.03,14,20,'coral',true);leaf(H,R,2.81,9.9,.67,1.1,-4);
 const [px,py]=H.p(2.81,9.9,.65);stroke(H,R,[[px-12,py-2],[px-10,py-8],[px-4,py-10]],'paper',2.2);
});
room.live=(H,R,t)=>{
 const u=((t%22)+22)%22,slide=ease(0,4.4,u)*(1-ease(17,20,u)),lift=ease(4.4,8.8,u)*(1-ease(13.2,17,u)),j=5.02+.56*slide,z=1.11+.47*lift;
 tray(H,R,4.25,j,z,2.37,1.07,true);
 person(H,R,6.42,7.22,[H.p(6.5,j+.23,z+.27),H.p(6.5,j+.89,z+.27)],'teal',-3);
 const dip=ease(8.8,10.8,u)*(1-ease(13.2,15.2,u));
 person(H,R,3.56,7.09,[H.p(3.85,6.18,1.18),H.p(4.25,6.68,1.42)],'coral',3+dip*2);
 if(u>16.8&&u<18.5){const p=(u-16.8)/1.7,[x,y]=H.p(5.73,6.78,1.02-p*.65);oval(H,R,x,y,1.3,2.2,'teal',.6);}
 const [x,y]=H.p(2.6,5.3,1.75);stroke(H,R,[[x,y],[x+2,y-5],[x+5+Math.sin(u*Math.PI/11)*1.6,y-10]],'teal',1.2);
};
room.loopSeconds=22;
room.stillTime=10.5;
export default room;
