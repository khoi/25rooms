import { world, shape, stroke, oval, ell, loop, actor, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, benchFrame, cushion, slattedSeat, drape } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, wallRack, hangingRail, taskLight, panelFront, caster } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
const rest=FIGURES.sample('idle',0);
FIGURES.clips.mexicoFanRepairer={dur:24,keys:[[0,rest],[1,rest]]};

function guard(H,R,x,y,r=31,ink='blue',ratio=.88) {
  for(const f of [.46,.76,1])H.outline(R,ell(x,y,r*f,r*f*ratio),ink,f===1?2:1.05,{tone:.8});
  for(let n=0;n<20;n++){const a=n*TAU/20;H.line(R,[[x+Math.cos(a)*5,y+Math.sin(a)*5*ratio],[x+Math.cos(a)*r,y+Math.sin(a)*r*ratio]],ink,.62,{tone:.78});}
  H.outline(R,ell(x-1,y-1,r+1,(r+1)*ratio),'paper',.8,{tone:.8});
  for(const a of [.38,2.51,4.6]){const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r*ratio;shape(H,R,[[px-3,py-3],[px+4,py-3],[px+4,py+4],[px-3,py+4]],a===.38?'teal':'sun',.7,.5);}
}

function blades(H,R,x,y,r,angle,ratio=.88) {
  for(let n=0;n<3;n++){
    const a=angle+n*TAU/3,P=(u,v)=>[x+(u*Math.cos(a)-v*Math.sin(a))*r,y+(u*Math.sin(a)+v*Math.cos(a))*r*ratio];
    shape(H,R,loop([P(-.08,-.08),P(.4,-.34),P(.93,-.2),P(.82,.27),P(.41,.35),P(.08,.15)],2),'teal',.63,.8);stroke(H,R,[P(.18,.07),P(.46,.16),P(.76,.11)],'paper',.9);
  }
  oval(H,R,x,y,7,6.5,'teal',.85);oval(H,R,x,y,3,2.7,'paper',1);H.dot(x,y,1.25,'blue');
}

function repairer(H,R,t,x,y) {
  const i=6.12,j=7.84,scale=1.85,origin=H.p(i,j,0),pose={...rest,head:8-14*ease(9.6,12,t)*(1-ease(14.4,18,t)),lean:0};
  for(const [side,tx,ty] of [['l',x-29,y+1],['r',x+1,y+1]]){
    const dx=(tx-origin[0])/scale-(side==='l'?-5.2:5.2),dy=(ty-origin[1])/scale+32.5,a=8.4*.52,b=8.4*.5,d=Math.min(a+b-.001,Math.hypot(dx,dy)),bend=Math.acos(Math.max(-1,Math.min(1,(d*d-a*a-b*b)/(2*a*b))));
    pose['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(bend),a+b*Math.cos(bend)))*180/Math.PI;pose['e'+side]=bend*180/Math.PI;
  }
  FIGURES.clips.mexicoFanRepairer.keys=[[0,pose],[1,pose]];
  actor(H,R,i,j,t,'mexicoFanRepairer',{shirt:['coral',.62],apron:['paper',1],hairStyle:'short',glasses:true,face:'se'},0,scale);
}

const room=world('mexico-city-repair-fan','A breeze without the motor',{wall:'paper',wallTone:1,height:3.9,floor:'sun',tone:.12,pattern:'tiles',accent:'teal',head: 10},(H,R)=>{
  masonry(H,R,'nw',0,12,0,1.1,'paper',.8);
  windowBay(H,R,'ne',2.55,7.35,2.3,1.26,{divisions:4,view:P=>{for(let n=0;n<5;n++){const x=n*1.4;shape(H,R,[P(x,.1),P(x+1,.1),P(x+1,.58),P(x+.3,.86),P(x,.56)],'teal',.17);}}});
  wallRack(H,R,'nw',.7,5.55,.3,2.82,3,'teal',(P,z,row,gap)=>{
    if(row===0){for(let n=0;n<5;n++){shape(H,R,[P(.15+n*1.05,z+.05),P(1.12+n*1.05,z+.05),P(1.12+n*1.05,z+.66),P(.15+n*1.05,z+.66)],'sun',.45);H.line(R,[P(.45+n*1.05,z+.37),P(.82+n*1.05,z+.37)],'blue',1.5);}}
    if(row===1){for(let n=0;n<3;n++){const [x,y]=P(.88+n*1.72,z+.27,.4);oval(H,R,x,y,17,12,'paper',1);oval(H,R,x,y-2,11,8,'blue',.4);for(let a=0;a<6;a++)H.line(R,[[x-9+a*3,y-7],[x-9+a*3,y+4]],'blue',.55);}}
    if(row===2){for(let n=0;n<3;n++){const [x,y]=P(.9+n*1.67,z+.17,.4);for(let k=0;k<3;k++)H.outline(R,ell(x,y-k*2,13-k,8),'coral',2);H.line(R,[[x+12,y],[x+16,y+6],[x+23,y+7]],'blue',1);}}
  });
  cabinetFrame(H,R,9.62,.55,1.9,3.58,.05,2.06,1,'teal',(x,j,w,d,z,h)=>{
    timber(H,R,x,j,w,d,z+.87,.08,'sun');metal(H,R,x+.08,j+.25,w-.13,d-.4,z,.67,'blue');panelFront(H,R,x+.1,j+d-.18,w-.2,z+.08,.55,2,'teal');
    const [a,b]=H.p(x+.73,j+1.8,z+.98);oval(H,R,a,b+2,19,6,'teal');shape(H,R,[[a-5,b],[a+6,b],[a+4,b-14],[a-4,b-14]],'teal',.7);oval(H,R,a,b-21,22,21,'paper',1);blades(H,R,a,b-21,18,.6,.92);guard(H,R,a,b-21,22,'blue',.92);H.dot(a+12,b+1,2,'sun');
    H.line(R,[[a-15,b+1],[a-12,b+1]],'paper',2);
  });
  bentTube(H,R,[[2.35,.23,.22],[2.35,.23,2.06],[10.8,.23,2.06],[10.8,.23,.32]],1.8,'teal');
  for(const i of [2.35,5.65,8.82,10.8])metal(H,R,i-.07,.17,.14,.13,1.91,.27,'sun');
  for(const i of [4.13,7.87]){metal(H,R,i,.19,.66,.21,1.65,.33,'paper');for(const x of [i+.2,i+.43])H.line(R,[H.p(x,.42,1.74),H.p(x,.42,1.85)],'blue',1.3);}
  benchFrame(H,R,2.0,.56,6.75,1.72,.94,'teal');
  timber(H,R,2.11,.7,6.49,1.38,.3,.09,'sun');
  for(const i of [2.36,4.48,6.6]){metal(H,R,i,.84,1.6,1.04,.4,.35,'paper');H.line(R,[H.p(i+.58,1.91,.57),H.p(i+1.04,1.91,.57)],'teal',2);}
  const [gx,gy]=H.p(2.92,1.44,.98);shape(H,R,[[gx-20,gy],[gx+20,gy],[gx+19,gy-29],[gx-18,gy-30]],'sun',.48);shape(H,R,[[gx-14,gy-9],[gx+12,gy-9],[gx+12,gy-25],[gx-14,gy-25]],'paper',1);H.line(R,[[gx-10,gy-13],[gx+8,gy-13]],'teal',.6);H.line(R,[[gx,gy-13],[gx+6,gy-22]],'coral',1.1);for(const dx of [-11,0,11])oval(H,R,gx+dx,gy-4,2.5,2,'teal');
  stroke(H,R,[[gx-16,gy],[gx-23,gy+12],[gx-8,gy+17],[gx+17,gy+14]],'blue',1);stroke(H,R,[[gx+16,gy],[gx+28,gy+12],[gx+37,gy+6]],'coral',1);
  const [cx,cy]=H.p(5.0,1.36,1.01);oval(H,R,cx,cy,21,9,'blue');oval(H,R,cx,cy-10,21,9,'coral',.63);oval(H,R,cx,cy-10,12,5,'paper');for(let n=0;n<9;n++)H.line(R,[[cx-18+n*4,cy-7],[cx-18+n*4,cy+1]],'sun',1);H.line(R,[[cx,cy-9],[cx+21,cy-25]],'blue',2);oval(H,R,cx+22,cy-25,5,4,'sun');
  metal(H,R,6.03,.83,2.16,1.07,.98,.11,'paper');for(let n=0;n<3;n++)metal(H,R,6.15+n*.66,.93,.55,.81,1.09,.055,'teal');
  const [kx,ky]=H.p(6.41,1.31,1.16);oval(H,R,kx,ky,7,4,'blue');oval(H,R,kx,ky,4,2,'sun');
  const [lx,ly]=H.p(7.0,1.3,1.16);shape(H,R,[[lx-6,ly-2],[lx+6,ly-2],[lx+6,ly-10],[lx-6,ly-10]],'coral',.56);H.line(R,[[lx-7,ly-7],[lx-12,ly-7]],'sun',1.4);
  const [nx,ny]=H.p(7.7,1.3,1.16);for(const dx of [-5,3]){H.line(R,[[nx+dx,ny],[nx+dx,ny-9]],'blue',1.5);oval(H,R,nx+dx,ny-10,3,2,'sun');}
  hangingRail(H,R,'nw',7.0,4.42,2.72,5,(P,u,n)=>{
    if(n===0){const [x,y]=P(u,-.53);shape(H,R,[[x-7,y],[x+8,y],[x+8,y+17],[x+2,y+17],[x+2,y+7],[x-7,y+7]],'teal',.75);H.line(R,[[x-7,y+3],[x-20,y+3]],'blue',2);oval(H,R,x+8,y+2,6,7,'sun');}
    else if(n===3){shape(H,R,[P(u-.32,-.18),P(u+.34,-.18),P(u+.45,-1.62),P(u-.4,-1.63)],'coral',.5);H.line(R,[P(u-.28,-.73),P(u+.28,-.73)],'paper',1.1);}
    else {H.line(R,[P(u,-.22),P(u,-1.09)],'sun',3.2);H.line(R,[P(u,-1.03),P(u,-1.42)],'blue',1.6);}
  });
  const comb=H.p(.41,6.66,1.5);H.line(R,[[comb[0]-15,comb[1]],[comb[0]+14,comb[1]]],'teal',3);for(let n=0;n<7;n++)H.line(R,[[comb[0]-12+n*4,comb[1]],[comb[0]-12+n*4,comb[1]+11]],n===4?'sun':'teal',n===4?1.7:2);
  benchFrame(H,R,3.3,4.9,5.45,2.8,1.03,'sun');metal(H,R,3.48,5.05,5.1,2.44,1.045,.035,'paper');
  timber(H,R,3.48,5.07,5.08,2.4,.22,.1,'teal');
  for(const [i,j,w,ink] of [[4.46,5.22,1.28,'coral'],[5.94,5.22,1.24,'paper']]){metal(H,R,i,j,w,1.14,.35,.33,ink);H.line(R,[H.p(i+.36,j+1.16,.51),H.p(i+.88,j+1.16,.51)],'sun',2);}
  for(const x of [3.67,7.7]){metal(H,R,x,5.25,.6,1.05,.38,.3,'teal');shape(H,R,H.faceI(x+.06,6.3,.48,.41,.64),'blue',.6);H.line(R,[H.p(x+.13,6.32,.54),H.p(x+.48,6.32,.54)],'sun',1.7);}
  timber(H,R,3.58,7.54,1.26,.11,.7,.27,'sun');timber(H,R,7.37,7.54,1.16,.11,.7,.27,'sun');
  H.line(R,[H.p(7.71,7.67,.83),H.p(8.1,7.67,.83)],'teal',2);
  metal(H,R,3.56,7.14,1.32,.74,.7,.08,'teal');shape(H,R,H.tile(3.66,7.26,1.1,.5,.79),'blue',.55);for(let n=0;n<3;n++)H.line(R,[H.p(3.78+n*.29,7.33,.8),H.p(3.98+n*.29,7.61,.8)],['sun','paper','coral'][n],3);
  drape(H,R,4.45,5.35,2.46,1.86,1.08,.32,'teal');
  const [px,py]=H.p(5.93,7.27,1.08);oval(H,R,px,py,38,15,'blue',.5);oval(H,R,px,py-2,34,11,'paper',1);H.outline(R,ell(px,py-2,27,8),'teal',2);
  const [mx,my]=H.p(7.56,5.63,1.09);cushion(H,R,7.1,5.21,1.21,1.03,1.07,.13,'paper');oval(H,R,mx,my-11,18,14,'blue',.65);oval(H,R,mx+9,my-12,14,12,'teal',.5);oval(H,R,mx+13,my-12,7,9,'paper',1);H.line(R,[[mx+13,my-12],[mx+28,my-18]],'blue',3);H.line(R,[[mx+15,my-13],[mx+27,my-18]],'paper',.8);for(let n=0;n<6;n++)H.line(R,[[mx-13+n*3,my-22],[mx-13+n*3,my-12]],'blue',.7);
  for(const [i,j] of [[7.16,5.27],[7.96,5.27],[7.16,6.03],[7.96,6.03]])metal(H,R,i,j,.17,.16,1.08,.12,'blue');
  const [mbx,mby]=H.p(7.56,5.63,1.09);stroke(H,R,[[mbx-15,mby-3],[mbx-20,mby-14],[mbx-10,mby-25],[mbx+8,mby-24]],'sun',2);H.line(R,[[mbx+24,mby-18],[mbx+31,mby-20]],'paper',1.1);oval(H,R,mbx+28,mby-18,3,4,'coral',.5);
  const [fx,fy]=H.p(4.1,5.83,1.1);oval(H,R,fx,fy,27,9,'teal',.6);shape(H,R,[[fx-7,fy],[fx+10,fy],[fx+6,fy-43],[fx-5,fy-43]],'teal',.6);oval(H,R,fx,fy-44,12,8,'paper',1);oval(H,R,fx+9,fy-5,5,4,'sun',.8);H.line(R,[[fx+8,fy-7],[fx+10,fy-4]],'blue',.7);
  const cord=[H.p(4.32,5.86,1.11),H.p(3.8,6.6,1.13),H.p(3.65,7.45,1.08),H.p(3.68,7.8,.55),H.p(4.07,7.97,.11),H.p(4.64,7.85,.11)];stroke(H,R,cord,'blue',1.8);const plug=cord.at(-1);shape(H,R,[[plug[0]-5,plug[1]-3],[plug[0]+5,plug[1]-3],[plug[0]+5,plug[1]+3],[plug[0]-5,plug[1]+3]],'teal',.65);for(const k of [-2,2])H.line(R,[[plug[0]+5,plug[1]+k],[plug[0]+10,plug[1]+k]],'sun',1.2);
  metal(H,R,3.49,6.75,.78,.72,1.08,.15,'blue');metal(H,R,3.6,6.92,.57,.22,1.2,.34,'teal');metal(H,R,3.59,7.24,.57,.17,1.2,.34,'teal');bentTube(H,R,[[3.85,7.24,1.29],[3.85,7.65,1.29],[3.62,7.65,1.29],[4.08,7.65,1.29]],1.4,'sun');
  const tray=H.p(8,6.86,1.12);oval(H,R,...tray,16,7,'paper',1);for(let n=0;n<6;n++){const x=tray[0]-9+n*3;H.line(R,[[x,tray[1]-1],[x+2,tray[1]+1]],'blue',1.4);H.dot(x,tray[1]-1,1.5,'sun');}
  taskLight(H,R,7.9,4.99,1.1,'coral',-.65);
  for(const [i,j] of [[.81,8.14],[2.57,8.14],[.81,9.52],[2.57,9.52]])caster(H,R,i,j);
  metal(H,R,.69,7.97,2.09,1.77,.28,.11,'teal');
  for(const i of [.79,2.53])metal(H,R,i,8.07,.11,1.52,.39,1.16,'teal');
  metal(H,R,.7,8.01,2.09,1.73,1.44,.08,'sun');
  const [dx,dy]=H.p(1.79,8.61,1.55);guard(H,R,dx,dy-17,28,'blue',.8);H.line(R,[[dx-17,dy+3],[dx-21,dy+15]],'teal',3);H.line(R,[[dx+17,dy+3],[dx+21,dy+15]],'teal',3);
  for(const z of [.51,.7,.89]) {const [x,y]=H.p(1.52,8.89,z);oval(H,R,x,y,22,8,'paper',1);oval(H,R,x,y,17,5,'teal',.25);}
  const [tx,ty]=H.p(2.6,9.16,1.49);stroke(H,R,[[tx,ty],[tx+9,ty+8],[tx+1,ty+20],[tx+12,ty+27],[tx+4,ty+34]],'blue',1.6);shape(H,R,[[tx+1,ty+34],[tx+8,ty+34],[tx+8,ty+42],[tx+1,ty+42]],'coral',.6);
  const diag=(x,z)=>H.p(.29,7.5+x,1.43+z);shape(H,R,[diag(0,0),diag(1.23,0),diag(1.23,1.04),diag(0,1.04)],'paper',1);for(const [x,z] of [[.2,.2],[.9,.3],[.4,.8],[.94,.77]])oval(H,R,...diag(x,z),2,2,'teal');H.line(R,[diag(.2,.2),diag(.2,.8),diag(.94,.8),diag(.94,.3),diag(.42,.3)],'coral',.9);H.dot(...diag(.64,1.04),2,'sun');
  slattedSeat(H,R,9.95,8.0,1.42,.02,'sun',.74);drape(H,R,10.0,8.05,1.32,.5,1.37,.48,'paper');
  metal(H,R,6.7,9.3,1.96,1.21,.06,.15,'teal');for(const [i,j] of [[7.04,9.65],[7.72,9.91]]){oval(H,R,...H.p(i,j,.23),8,5,'sun');oval(H,R,...H.p(i,j,.24),4,2,'blue');}shape(H,R,H.tile(8.0,9.52,.4,.47,.23),'coral',.55);H.line(R,[H.p(7.25,10.17,.23),H.p(7.88,10.17,.23)],'blue',2);
  const [bagX,bagY]=H.p(10.61,9.02,.06);shape(H,R,[[bagX-9,bagY],[bagX+10,bagY],[bagX+11,bagY-22],[bagX-10,bagY-22]],'coral',.5);stroke(H,R,[[bagX-6,bagY-20],[bagX-4,bagY-32],[bagX+7,bagY-31],[bagX+8,bagY-20]],'sun',1.7);
  const [qx,qy]=H.p(5.42,10.79,.03);shape(H,R,[[qx-15,qy],[qx+15,qy],[qx+17,qy-17],[qx-16,qy-17]],'paper',1);shape(H,R,[[qx-15,qy-17],[qx-22,qy-28],[qx+11,qy-30],[qx+17,qy-17]],'sun',.36);oval(H,R,qx,qy-14,9,4,'teal');H.line(R,[[qx-5,qy-13],[qx+12,qy-3]],'blue',1.2);
  for(let n=0;n<6;n++)H.line(R,[H.p(1.6+n*.13,11.04,.03),H.p(1.6+n*.13,11.5,.03)],'blue',1.3);metal(H,R,1.43,10.95,1.13,.64,.02,.06,'paper');
},(H,R,t)=>{
  const u=((t%24)+24)%24,lift=ease(0,4.8,u)*(1-ease(14.4,22,u)),turn=2.3*ease(4.8,9.6,u)+(TAU-2.3)*ease(14.4,21,u),p=H.p(5.94,7.27,1.08),x=p[0],y=p[1]-22-lift*5;
  const shadow=ell(x+9,p[1]+3,35,9);H.tint(shadow,'blue',.16+lift*.08);for(let n=0;n<9;n++){const a=n*TAU/9;H.line(R,[[x+9,p[1]+3],[x+9+Math.cos(a)*33,p[1]+3+Math.sin(a)*8]],'blue',.45,{tone:.25});}
  blades(H,R,x,y,25,turn,.8);guard(H,R,x,y,31,'blue',.8);repairer(H,R,u,x,y);
  oval(H,R,x+1,y+1,3,2.4,'coral',.3);H.line(R,[[x-32,y+1],[x-28,y+2]],'coral',2.7);
  const [px,py]=H.p(8.8,.32,2.11);H.line(R,[[px,py-52],[px,py-17]],'blue',.7);const paper=[];for(let n=0;n<=12;n++){const a=-Math.PI+.14+n*Math.PI/12;paper.push([px+Math.cos(a)*(20+Math.sin(TAU*u/24)*2),py+Math.sin(a)*17]);}paper.push([px,py+3]);shape(H,R,paper,'sun',.5,.7);for(let n=0;n<7;n++){const a=-Math.PI+n*Math.PI/6;H.line(R,[[px,py+3],[px+Math.cos(a)*19,py+Math.sin(a)*16]],'coral',.6);}
});
room.loopSeconds=24;
room.stillTime=11.7;
export default room;
