import { FIGURES } from '../../drawings.js';
import { world, shape, oval, stroke, box, actor, ell, steam } from '../../worlds/common.js';
import { surface, timber, metal, vessel, bentTube, cushion, floorLight, benchFrame, drape } from '../materials.js';
import { cabinetFrame, basin, rackFrame } from '../structure.js';
import { wallCourse, windowBay, hangingRail, recessedFrame, floorShadow, taskLight } from '../joinery.js';

const helperRest={...FIGURES.clips.hold.keys[0][1]};
FIGURES.clips.hanoiSteamHelper={dur:18,keys:[[0,helperRest],[.4,helperRest],[.5,{...helperRest,head:12}],[.65,helperRest],[1,helperRest]]};
const smooth = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
const liftAt = t => smooth(3.6, 7.2, t) * (1 - smooth(10.8, 16, t));
function bowl(H, R, x, y, r = 8, foot = 'paper') {
  oval(H, R, x, y + 4, r * .42, 2.2, foot, .8);
  shape(H, R, [[x-r,y-3],[x+r,y-3],[x+r*.64,y+3],[x-r*.64,y+3]], 'paper', 1, .7);
  oval(H, R, x, y-3, r, r*.34, 'paper', 1);
  oval(H, R, x, y-3, r*.76, r*.2, 'teal', .22);
  H.line(R, [[x-r*.65,y],[x+r*.65,y]], 'sun', .65);
}
function cook(H, R, x, y, hands) {
  oval(H, R, x+3, y+2, 15, 4, 'blue', .2);
  for (const a of [-6,6]) { stroke(H,R,[[x+a*.7,y-25],[x+a,y-12],[x+a*1.2,y]],'blue',7); oval(H,R,x+a*1.2+2,y,5,2.3,'blue',.9); }
  surface(H,R,[[x-10,y-47],[x+9,y-46],[x+12,y-24],[x-11,y-24]],'teal',.6);
  surface(H,R,[[x-6,y-43],[x+5,y-43],[x+8,y-23],[x-7,y-23]],'paper',1);
  H.line(R,[[x-4,y-32],[x+4,y-32],[x+4,y-27],[x-4,y-27]],'blue',.65);
  oval(H,R,x,y-56,8,9,'coral',.28);
  shape(H,R,[[x-8,y-58],[x-7,y-64],[x+5,y-65],[x+9,y-59],[x+2,y-62],[x-5,y-59]],'blue',.85,.7);
  H.dot(x-3,y-55,.9,'blue'); H.dot(x+1,y-55,.9,'blue');
  stroke(H,R,[[x-3,y-51],[x,y-50],[x+2,y-52]],'blue',.6);
  return () => { for (const [n,p] of hands.entries()) { const s=[x+(n?8:-8),y-44], e=[s[0]+(p[0]-s[0])*.45,(s[1]+p[1])*.5+7]; stroke(H,R,[s,e,p],'blue',6); stroke(H,R,[s,e,p],'teal',4.4); oval(H,R,...p,2.8,2.7,'coral',.32); } };
}
const room = world('hanoi-steam-before-traffic','The lid catches the dawn',{floor:'sun',tone:.16,pattern:'tiles',accent:'teal',wall:'teal',wallTone:.22,height:3.7,head:35},(H,R)=>{
  wallCourse(H,R,'nw',0,12,.88,'teal'); wallCourse(H,R,'ne',0,12,.88,'teal');
  const win=windowBay(H,R,'nw',7.9,2.2,1.6,1.7,{divisions:2,ink:'teal'});
  H.line(R,[win(.22,.72,.34),win(.48,.72,.34)],'sun',2);
  recessedFrame(H,R,'ne',.7,2.8,2.85,.53,'blue',P=>{for(let u=.22;u<2.6;u+=.25)H.line(R,[P(u,.08),P(u,.44)],'paper',1.4);});
  floorLight(H,7.8,8.5,120,.48);
  H.tint(H.tile(2.5,3.1,4.6,3.6,.012),'blue',.12);
  for(const [i,j,w,d] of [[.3,.3,1.65,7.2],[1.95,.3,4.75,1.65]]) {
    box(H,R,i,j,w,d,0,1.08,'teal',.56); metal(H,R,i-.03,j-.02,w+.08,d+.08,1.08,.15,'paper');
    for(let x=i+.1;x<i+w;x+=.52)for(let y=j+.08;y<j+d;y+=.52)H.outline(R,H.tile(x,y,Math.min(.49,i+w-x),Math.min(.49,j+d-y),1.24),'teal',.55,{tone:.55});
  }
  for(const z of[1.45,1.86,2.27])for(let j=.4;j<7.25;j+=.42){const q=H.faceJ(.08,j,.39,z,z+.38);surface(H,R,q,'paper',1,.35);if(j>4.9&&z<1.6)H.tint(q,'teal',.16);}
  timber(H,R,.16,.43,.77,6.56,3.01,.13,'sun');
  for(const j of[.6,3.35,6.63])bentTube(H,R,[[.18,j,2.64],[.82,j,3.01]],1.5,'blue');
  for(const [j,c,r,h]of[[.88,'teal',9,17],[1.73,'paper',11,13],[2.62,'sun',8,20],[3.48,'coral',7,12]]){vessel(H,R,.51,j,3.15,r,h,c,false);const p=H.p(.51,j,3.15);oval(H,R,p[0],p[1]-h-2,3,2,'blue',.8);}
  const sieve=H.p(.51,5.86,3.13);oval(H,R,...sieve,14,16,'sun',.28);for(let n=-9;n<11;n+=3)H.line(R,[[sieve[0]+n,sieve[1]-11],[sieve[0]+n,sieve[1]+11]],'blue',.45);H.line(R,[[sieve[0]-9,sieve[1]-7],[sieve[0]+10,sieve[1]+7]],'paper',1);
  recessedFrame(H,R,'nw',10.65,.89,1.59,1.43,'sun',P=>{for(const z of[.23,.63,1.02]){surface(H,R,[P(.15,z),P(.74,z),P(.74,z+.23),P(.15,z+.23)],z>.8?'coral':'paper',.75);H.line(R,[P(.23,z+.07),P(.63,z+.07)],'teal',.8);}});
  bentTube(H,R,[[.12,7.49,3.32],[.12,7.49,.65],[.18,7.15,.65]],1.5,'blue');
  metal(H,R,.14,7.27,.2,.36,1.19,.43,'paper');for(const z of[1.3,1.46])H.dot(...H.p(.35,7.44,z),1.4,'blue');
  basin(H,R,.44,2.3,1.27,1.55,1.25);
  bentTube(H,R,[[.7,2.7,.2],[.7,2.7,.85],[.7,2.8,1.25]],2.5,'blue');
  for(const j of[.55,4.1,5.7]) { surface(H,R,H.faceJ(1.96,j,1.3,.18,.88),'teal',.32); H.line(R,[H.p(1.97,j+.3,.73),H.p(1.97,j+.95,.73)],'blue',1.8); }
  timber(H,R,.4,5.9,1.25,1.1,1.24,.13,'sun');
  H.line(R,[H.p(.74,6.1,1.39),H.p(1.35,6.6,1.39)],'blue',2.5);
  surface(H,R,H.tile(.92,6.17,.35,.48,1.41),'paper',1); H.line(R,[H.p(.9,6.15,1.42),H.p(.76,5.96,1.42)],'blue',3);
  hangingRail(H,R,'nw',2.1,4.9,2.3,5,(P,u,n)=>{const [x,y]=P(u,-.18); stroke(H,R,[[x,y],[x+1,y+22]],'blue',1.3); oval(H,R,x+1,y+26,n===3?8:4,n===3?6:3,'paper',1); if(n===3)for(let k=-4;k<6;k+=3)H.line(R,[[x+k,y+21],[x+k+2,y+30]],'blue',.45);});
  cabinetFrame(H,R,7.25,.35,4.35,1.48,.12,3.1,3,'sun',(i,j,w,d,z,h,n)=>{
    for(const lev of[.15,1.05,1.95]) { timber(H,R,i,j,w,d,z+lev,.09,'sun'); for(let k=0;k<(n===1?2:3);k++){const [x,y]=H.p(i+.26+k*.35,j+d-.12,z+lev+.16); bowl(H,R,x,y,5.9,n===2&&k===1?'blue':'paper');} }
    if(n===1)for(let k=0;k<5;k++){const [x,y]=H.p(i+.14+k*.17,j+.3,z+2.28); oval(H,R,x,y,3.5,12,'paper',1);H.line(R,[[x,y-8],[x,y+8]],'sun',.6);}
  });
  metal(H,R,7.18,1.8,4.5,.3,.85,.09,'teal'); metal(H,R,8.3,1.86,1.3,.62,.8,.055,'paper');
  bentTube(H,R,[[7.32,.48,.24],[11.47,.48,3.07]],1.4,'teal');
  const hood=[H.p(2.45,1.75,2.64),H.p(6.7,1.75,2.64),H.p(6.5,.38,3.39),H.p(2.75,.38,3.39)];
  surface(H,R,hood,'blue',.78); surface(H,R,[H.p(2.45,1.75,2.64),H.p(6.7,1.75,2.64),H.p(6.7,1.75,2.49),H.p(2.45,1.75,2.49)],'teal',.65);
  for(let i=2.7;i<6.6;i+=.45)H.dot(...H.p(i,1.76,2.57),1.05,'sun');
  metal(H,R,3.85,.39,.9,.85,3.4,.67,'blue'); metal(H,R,3.85,.39,2.2,.65,3.95,.36,'blue');
  H.line(R,[H.p(3.96,.43,3.5),H.p(3.96,.43,3.97),H.p(5.9,.43,3.97)],'paper',1);
  surface(H,R,H.faceI(5.25,1.76,.61,2.68,3.02),'teal',.32);
  floorShadow(H,2.5,3.1,3.9,2.7,.24);
  for(const i of[2.7,5.75])for(const j of[3.25,5.35])metal(H,R,i,j,.16,.16,0,.8,'blue');
  metal(H,R,2.55,3.1,3.75,2.65,.48,.1,'blue');
  for(const i of[2.59,6.11])metal(H,R,i,3.18,.16,2.37,.58,.32,'teal');
  for(const j of[3.25,5.4])metal(H,R,2.73,j,3.29,.13,.72,.16,'blue');
  const cradle=H.p(4.42,4.27,.78);oval(H,R,...cradle,43,16,'blue',.85);oval(H,R,...cradle,35,11,'coral',.6);
  for(const n of[-1,1])bentTube(H,R,[[4.42+n*.96,3.46,.6],[4.42+n*.96,3.46,1.02],[4.42+n*.96,4.98,1.02]],2.2,'blue');
  metal(H,R,2.76,3.03,3.28,.1,.9,.47,'teal');
  for(let n=0;n<9;n++)H.line(R,[H.p(2.96+n*.31,5.62,.84),H.p(2.96+n*.31,5.62,1.23)],'paper',.9);
  const gauge=H.p(3.25,5.72,1.06);oval(H,R,...gauge,7,7,'paper',1);H.line(R,[[gauge[0],gauge[1]],[gauge[0]+3,gauge[1]-4]],'coral',1.1);H.dot(gauge[0],gauge[1],1,'blue');
  bentTube(H,R,[[2.67,3.46,.66],[2.27,3.46,.66],[2.27,2.13,.2]],2.1,'blue');
  metal(H,R,2.15,2.05,.27,.27,.18,.21,'coral');
  vessel(H,R,5.42,1.08,1.25,19,20,'paper');
  const noodle=H.p(5.42,1.08,1.89);for(let n=0;n<7;n++)stroke(H,R,[[noodle[0]-11+n*3,noodle[1]-2],[noodle[0]-9+n*3,noodle[1]+5],[noodle[0]-12+n*3,noodle[1]+8]],'sun',1.1);
  bentTube(H,R,[[5.91,1.08,1.73],[6.25,1.08,2.08],[6.5,1.08,2.1]],1.8,'blue');
  taskLight(H,R,6.25,.56,2.5,'sun',-.4);

  metal(H,R,2.7,5.6,3.43,.11,.56,.88,'teal');
  surface(H,R,H.faceI(2.92,5.72,1.35,.66,1.28),'blue',.85); H.line(R,[H.p(3.22,5.73,1.13),H.p(3.97,5.73,1.13)],'sun',1.5);
  metal(H,R,4.48,5.75,1.25,.47,.55,.09,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(4.58+n*.21,5.9,.65),H.p(4.58+n*.21,6.15,.65)],'blue',.6);
  rackFrame(H,R,9.97,3.56,1.37,2.54,.06,[.17,.96,1.7],'teal',(i,j,w,d,z,n)=>{
    if(n===0){vessel(H,R,i+.63,j+.58,z,11,18,'sun',false);vessel(H,R,i+.63,j+1.71,z,9,14,'teal',false);}
    if(n===1){for(let k=0;k<3;k++)cushion(H,R,i+.08,j+.15,w-.16,1.22,z+k*.12,.09,k===1?'coral':'paper');const p=H.p(i+.6,j+1.77,z);bowl(H,R,...p,12);}
    if(n===2){for(const d of[.48,1.64]){metal(H,R,i+.08,j+d-.3,w-.16,.72,z,.1,'paper');const p=H.p(i+.6,j+d,z+.12);for(let k=0;k<5;k++){const xx=p[0]+(k-2)*4;stroke(H,R,[[xx,p[1]],[xx+3,p[1]-8],[xx-2,p[1]-15]],'teal',1.8);oval(H,R,xx+2,p[1]-9,4,2,'teal',.55);}}}
  });
  for(const j of[3.61,5.96]){const p=H.p(10.0,j,.09);oval(H,R,...p,3,4,'blue',.8);}
  box(H,R,7.5,7.95,3.8,1.55,0,1.08,'teal',.53); metal(H,R,7.42,7.9,3.98,1.69,1.08,.13,'paper');
  for(let x=7.57;x<11.3;x+=.46)H.line(R,[H.p(x,9.6,.15),H.p(x,9.6,1.08)],'blue',.6,{tone:.4});
  bentTube(H,R,[[7.68,9.84,.2],[7.68,9.84,.35],[11.18,9.84,.35],[11.18,9.84,.2]],2.2,'blue');
  for(const i of[7.6,11.23]){metal(H,R,i,7.96,.1,.1,1.2,1.32,'teal');bentTube(H,R,[[i,7.97,2.51],[i,8.29,2.62]],1.8,'teal');}
  surface(H,R,[H.p(7.56,8.01,1.65),H.p(11.31,8.01,1.65),H.p(11.31,8.26,2.6),H.p(7.56,8.26,2.6)],'paper',.42,.75);
  H.line(R,[H.p(7.8,8.05,1.76),H.p(8.41,8.22,2.47)],'paper',2.1);H.line(R,[H.p(7.55,8.26,2.61),H.p(11.31,8.26,2.61)],'teal',2.2);
  for(const i of[10.74,11.13]){const p=H.p(i,8.86,1.24);for(let n=0;n<3;n++)bowl(H,R,p[0],p[1]-n*4,7.5);}
  const pay=H.p(10.3,8.55,1.24);oval(H,R,...pay,9,4,'coral',.5);H.dot(pay[0]+2,pay[1],2.5,'sun');
  cushion(H,R,8,8.08,.72,.6,1.21,.06,'paper');
  metal(H,R,8.95,8.1,.75,.8,1.22,.14,'teal');for(const [i,j,c]of[[9.12,8.29,'coral'],[9.48,8.36,'sun']])vessel(H,R,i,j,1.42,4,10,c,false);
  timber(H,R,.45,9.24,2.8,1.04,.54,.13,'sun');for(const i of[.64,2.75])timber(H,R,i,9.4,.2,.72,0,.54,'sun');
  cushion(H,R,.9,9.36,1.2,.73,.68,.055,'sun');
  const helmet=H.p(.74,9.66,1.48);oval(H,R,...helmet,12,10,'coral',.7);H.line(R,[[helmet[0]-8,helmet[1]+4],[helmet[0]+8,helmet[1]+4]],'paper',1.4);
  bentTube(H,R,[[.58,9.5,1.8],[.58,9.5,1.6],[.74,9.66,1.58]],1.1,'blue');
  vessel(H,R,1.15,10.4,.22,7,15,'teal',false);stroke(H,R,[H.p(1.15,10.4,.68),H.p(.9,10.4,.8),H.p(.7,10.4,.68)],'blue',1.2);
  surface(H,R,H.tile(2.2,9.5,.65,.6,.7),'paper',1);for(let n=0;n<3;n++)H.line(R,[H.p(2.28,9.58+n*.15,.71),H.p(2.74,9.58+n*.15,.71)],'blue',.5);
  benchFrame(H,R,3.08,8.25,2.58,1.62,.9,'sun');
  metal(H,R,3.21,8.4,2.31,1.28,.9,.09,'paper');
  for(const [i,j,c]of[[3.67,8.83,'teal'],[4.85,8.83,'coral']]){const p=H.p(i,j,1.04);bowl(H,R,...p,14);for(let n=0;n<5;n++){const a=n*1.2;stroke(H,R,[[p[0]-8+n*4,p[1]-5],[p[0]-6+n*4,p[1]-10],[p[0]-8+n*4,p[1]-14]],c,2);}}
  timber(H,R,3.27,8.46,2.19,1.19,.29,.1,'sun');vessel(H,R,4.0,9.15,.4,14,19,'paper');
  drape(H,R,4.73,9.15,.61,.43,1.0,.46,'paper');
  const carrier=H.p(1.19,10.42,.73);oval(H,R,...carrier,6,2,'sun',.7);H.line(R,[[carrier[0]-5,carrier[1]],[carrier[0]+5,carrier[1]]],'coral',1.2);
  box(H,R,4.2,10.75,3.1,.48,0,.12,'paper',.8);
  for(const j of[7.31,10.41]){metal(H,R,.3,j,1.57,.26,.025,.04,'blue');for(let k=0;k<7;k++)H.line(R,[H.p(.43+k*.2,j+.03,.07),H.p(.43+k*.2,j+.23,.07)],'paper',.6);}

},(H,R,time)=>{
  const t=((time%18)+18)%18,L=liftAt(t),[px,py]=H.p(4.42,4.27,.9),lidY=py-34-L*14;
  actor(H,R,7.9,3.38,t,'hanoiSteamHelper',{shirt:['coral',.52],face:'sw',prop:(A,B,p)=>bowl(A,B,(p.nearHand[0]+p.farHand[0])/2,(p.nearHand[1]+p.farHand[1])/2+4,8)},0,1.32);
  const [cx,cy]=H.p(4.45,3.0,0),contact=smooth(.2,3.6,t)*(1-smooth(14.7,16,t)),hands=[[px+12,lidY-6],[px+23,lidY-4]].map((p,n)=>[p[0]*contact+(cx+(n?6:-6))*(1-contact),p[1]*contact+(cy-28)*(1-contact)]);let arms;H.clip([[cx-30,cy-90],[cx+30,cy-90],[cx+30,cy-23],[cx-30,cy-23]],()=>{arms=cook(H,R,cx,cy,hands);});
  vessel(H,R,4.42,4.27,.9,40,34,'blue',true);
  oval(H,R,px,py-34,31,8,'sun',.31);oval(H,R,px,py-34,27,5,'teal',.2);
  for(const s of[-1,1]){metal(H,R,4.42+s*1.25,4.27,.16,.16,1.52,.14,'blue');stroke(H,R,[[px+s*37,py-24],[px+s*46,py-26],[px+s*47,py-16],[px+s*38,py-14]],'blue',3);}
  H.line(R,[[px-23,py-23],[px-22,py-6]],'paper',1.7);H.line(R,[[px-17,py-21],[px-17,py-8]],'sun',.9);for(let n=0;n<6;n++)H.line(R,[[px-11+n*3,py-24],[px-6+n*2,py-9]],'paper',.48,{tone:.6});
  const lid=ell(px+L*7,lidY,41,13-L*7).map(([x,y])=>[x,(y-lidY)+(x-px)*L*.17+lidY]);surface(H,R,lid,'paper',1);H.outline(R,lid,'blue',1.7);
  const grip=[[px+11,lidY-3],[px+13,lidY-10],[px+23,lidY-9],[px+24,lidY-2]];stroke(H,R,grip,'blue',4);stroke(H,R,grip,'sun',2);
  for(let n=0;n<4;n++)H.line(R,[[px+13+n*2.2,lidY-11],[px+14+n*2.2,lidY-7]],'paper',1);
  if(L>.2){steam(H,R,px-8,py-34,time,3,'paper');if(t>7.3&&t<10.7)for(let n=0;n<2;n++){const q=(t*.8+n*.5)%1;H.dot(px+30,py-39+q*7,1,'paper',.8);}}
  arms();
  const [tx,ty]=H.p(6.17,5.62,1.12),s=Math.sin(t*Math.PI*2/18)*1.6;
  surface(H,R,[[tx-5,ty],[tx+6,ty],[tx+7+s,ty+19],[tx-5+s,ty+21]],'paper',1);H.line(R,[[tx-4+s,ty+17],[tx+6+s,ty+15]],'coral',1.3);
  const [hx,hy]=H.p(3.05,4.62,1.86);stroke(H,R,[[hx-3,hy+10],[hx+4,hy-23]],'blue',2);oval(H,R,hx-3,hy+10,7,3,'paper',1);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
