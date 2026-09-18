import { FIGURES } from '../../drawings.js';
import { world, shape, oval, stroke, box, actor, ell } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, floorLight } from '../materials.js';
import { windowBay, wallCourse, hangingRail, floorShadow } from '../joinery.js';

const customerRest={...FIGURES.clips.hold.keys[0][1]};
FIGURES.clips.hanoiSpiceCustomer={dur:20,keys:[[0,customerRest],[.4,customerRest],[.53,{...customerRest,lean:5,head:9,ll:2,lr:7}],[.7,customerRest],[1,customerRest]]};
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
function pouch(H,R,x,y,ink='paper') {
  surface(H,R,[[x-9,y],[x+8,y],[x+10,y-17],[x+4,y-23],[x-6,y-22],[x-10,y-15]],ink,ink==='paper'?1:.5);
  stroke(H,R,[[x-8,y-17],[x+7,y-17]],'blue',1);stroke(H,R,[[x-5,y-15],[x-7,y-4]],'sun',1);
  surface(H,R,[[x+3,y-8],[x+8,y-9],[x+7,y-2],[x+3,y-2]],'coral',.38);for(let n=0;n<3;n++)H.line(R,[[x+2,y-7+n*2],[x+5,y-6+n*2]],'blue',.45);
}
function trader(H,R,x,y,target) {
  oval(H,R,x+3,y+2,14,4,'blue',.18);
  for(const d of[-5,5]){stroke(H,R,[[x+d,y-26],[x+d*1.3,y-2]],'blue',6);oval(H,R,x+d*1.3+2,y,5,2,'blue',.8);}
  surface(H,R,[[x-10,y-47],[x+10,y-47],[x+11,y-25],[x-11,y-25]],'coral',.58);
  for(const d of[-7,7]){const p=d<0?[target[0]-4,target[1]]:[target[0]+4,target[1]];stroke(H,R,[[x+d,y-43],[x+d-6,y-31],p],'blue',5.5);stroke(H,R,[[x+d,y-43],[x+d-6,y-31],p],'coral',4);oval(H,R,...p,2.7,2.5,'coral',.3);}
  oval(H,R,x,y-57,8,9,'coral',.3);shape(H,R,[[x-8,y-58],[x-8,y-64],[x+5,y-66],[x+9,y-59],[x+1,y-62]],'blue',.8);H.dot(x-4,y-56,.8,'blue');H.dot(x,y-56,.8,'blue');H.line(R,[[x-2,y-51],[x+2,y-52]],'blue',.6);
}
const room=world('hanoi-spice-scales','A weight on each side',{floor:'sun',tone:.2,pattern:'boards',wall:'sun',wallTone:.17,height:3.9,head:25},(H,R)=>{
  wallCourse(H,R,'nw',0,12,.62,'teal'); wallCourse(H,R,'ne',0,12,.62,'teal');
  windowBay(H,R,'nw',6.9,3.3,2.0,1.45,{divisions:3,ink:'blue'});
  floorLight(H,5.1,5.8,135,.5);
  const drawer=(i,j,w,z,h,open,n)=>{
    surface(H,R,H.faceI(i,j+.08,w,z,z+h),'blue',.65);
    const d=.72+open;
    timber(H,R,i+.04,j,w-.08,d,z,.07,'sun');
    if(open){surface(H,R,H.tile(i+.12,j+.14,w-.24,d-.2,z+.08),'paper',1);surface(H,R,H.tile(i+.16,j+.2,w-.32,d-.3,z+.09),n%2?'coral':'sun',.54);for(let q=0;q<7;q++){const [x,y]=H.p(i+.23+q*(w-.45)/7,j+d-.26,z+.12);if(n%2)stroke(H,R,[[x-3,y-2],[x+3,y+2]],'coral',1.7);else H.line(R,[[x-2,y-2],[x+2,y+2],[x-2,y+2],[x+2,y-2]],'blue',.55);}}
    timber(H,R,i,j+d,w,.1,z,h,'sun');
    const p=H.p(i+w/2,j+d+.11,z+h*.65);oval(H,R,...p,4,1.7,'blue',.7);H.line(R,[[p[0]-3,p[1]+1],[p[0]+3,p[1]+1]],'paper',.6);
  };
  for(const [col,i,h] of[[0,3.65,2.18],[1,5.8,2.8],[2,7.95,3.42],[3,10.1,3.12]]){
    box(H,R,i,.25,1.82,1.38,.13,h,'sun',.4);
    for(const x of[i,i+1.72])timber(H,R,x,.23,.1,1.5,.13,h,'sun');
    const rows=Math.floor(h/.5);for(let n=0;n<rows;n++)drawer(i+.13,.83,1.51,.28+n*.47,.36,col===1&&n===2?.53:0,col+n);
    timber(H,R,i-.05,.2,1.93,1.63,h+.12,.13,'sun');
    if(col===0){vessel(H,R,i+.45,.92,h+.25,7,10,'teal',false);vessel(H,R,i+1.15,.92,h+.25,7,15,'coral',false);}
  }
  hangingRail(H,R,'nw',1.0,4.8,2.9,5,(P,u,n)=>{const [x,y]=P(u,-.2);stroke(H,R,[[x,y],[x+2,y+16]],'sun',2.3);surface(H,R,[[x-6,y+17],[x+7,y+17],[x+5,y+28],[x-4,y+28]],n===3?'coral':'paper',.8);});
  timber(H,R,.3,.35,1.34,5.1,1.18,.17,'sun');
  for(const j of[.48,2.68,4.96])timber(H,R,.3,j,1.25,.14,0,1.18,'sun');
  for(const [j,r,c]of[[.8,10,'paper'],[2.1,11,'sun'],[3.4,9,'paper'],[4.65,11,'teal']]){const p=H.p(.95,j,1.38);pouch(H,R,p[0],p[1],c);H.line(R,[[p[0]-10,p[1]-7],[p[0]+9,p[1]-4]],'blue',.55);}
  floorShadow(H,2.65,4.1,5.0,2.8,.22);benchFrame(H,R,2.6,4.0,5,2.65,1.26,'sun');
  metal(H,R,4.05,4.55,2.1,1.14,1.27,.16,'blue');
  for(const x of[4.12,5.87])metal(H,R,x,5.45,.2,.24,1.1,.2,'blue');
  timber(H,R,6.33,4.08,.96,1.2,1.27,.1,'sun');surface(H,R,H.tile(6.39,4.15,.8,.9,1.38),'teal',.25);
  surface(H,R,H.tile(2.83,4.23,.91,1.46,1.27),'paper',1);for(let n=0;n<7;n++){const p=H.p(3.06+(n%2)*.35,4.45+Math.floor(n/2)*.28,1.29);for(let a=0;a<5;a++){const th=a*Math.PI*2/5;H.line(R,[[p[0],p[1]],[p[0]+Math.cos(th)*4,p[1]+Math.sin(th)*3]],'coral',1.2);}}
  for(let n=0;n<5;n++)H.line(R,[H.p(3.1,5.98+n*.045,1.3),H.p(4.16,5.98+n*.045,1.3)],'coral',2.1);
  stroke(H,R,[H.p(3.45,5.96,1.32),H.p(3.49,6.21,1.32)],'blue',1.3);
  const wt=H.p(5.67,6.1,1.28);oval(H,R,...wt,12,5,'paper',1);for(const dx of[-6,1,6]){shape(H,R,[[wt[0]+dx-2,wt[1]-1],[wt[0]+dx+2,wt[1]-1],[wt[0]+dx+1,wt[1]-6],[wt[0]+dx-1,wt[1]-6]],'sun',.8);}
  timber(H,R,.42,8.2,2.25,2.0,.58,.13,'sun');for(const i of[.55,2.32])timber(H,R,i,8.36,.19,1.7,0,.6,'sun');
  surface(H,R,H.tile(.58,8.37,1.1,1.3,.73),'paper',1);surface(H,R,H.tile(.78,8.5,.5,.58,.74),'coral',.25);shape(H,R,[H.p(.74,9.54,.74),H.p(1.51,9.56,.74),H.p(1.13,9.08,1.27)],'paper',1);
  vessel(H,R,2.09,8.7,.74,5,13,'teal',false);stroke(H,R,[H.p(2.12,8.75,1.18),H.p(2.41,9.7,.77),H.p(1.9,10.2,.1)],'blue',.75);
  box(H,R,8.95,8.5,1.8,2.1,.28,.16,'sun',.5);for(const i of[9.15,10.54]){const p=H.p(i,10.25,.27);oval(H,R,...p,7,7,'blue',.85);H.dot(...p,2,'sun');}
  for(const i of[9.04,10.51]){timber(H,R,i,8.48,.14,.14,.43,1.4,'sun');stroke(H,R,[H.p(i,8.48,1.82),H.p(i,8.23,2.1)],'blue',2.1);}
  pouch(H,R,...H.p(9.92,9.23,.48),'paper');surface(H,R,H.tile(9.44,10.57,.63,.31,.06),'sun',.7);
  const p=H.p(9.36,1.04,3.67);oval(H,R,...p,6,2.5,'paper',1);H.dot(p[0],p[1]-2,2.2,'sun');
},(H,R,time)=>{
  const t=((time%20)+20)%20,m=ease(4,8,t)*(1-ease(12,18,t));
  const center=H.p(4.95,5.1,2.35),beam=.13*Math.sin((t-8)*5)*Math.exp(-Math.max(0,t-8)*1.3)*ease(7.6,8,t)*(1-ease(11.7,12,t));
  const left=[center[0]-37,center[1]-beam*25],right=[center[0]+37,center[1]+beam*25];
  const foot=H.p(4.95,5.1,1.43);stroke(H,R,[foot,center],'blue',5.5);stroke(H,R,[foot,center],'sun',3.5);oval(H,R,...foot,9,3,'sun',.8);
  H.line(R,[left,right],'blue',3.8);H.line(R,[[left[0],left[1]-1],[right[0],right[1]-1]],'sun',2);
  surface(H,R,[[center[0]-4,center[1]+2],[center[0]+4,center[1]+2],[center[0],center[1]-7]],'paper',1);
  H.line(R,[center,[center[0]+beam*30,center[1]+24]],'coral',1.1);H.line(R,[[center[0]-5,center[1]+24],[center[0]+5,center[1]+24]],'blue',1.1);
  for(const [n,p]of[left,right].entries()){const sway=n?0:Math.sin(t*Math.PI*2/20)*1.3;for(const d of[-13,13])stroke(H,R,[p,[p[0]+d+sway,p[1]+32]],'blue',.85);if(n===0){const cp=[p[0]-5+sway,p[1]+12];H.outline(R,ell(...cp,2,3),'coral',.8);}surface(H,R,[[p[0]-16+sway,p[1]+32],[p[0]+16+sway,p[1]+32],[p[0]+10+sway,p[1]+39],[p[0]-10+sway,p[1]+39]],'sun',.7);oval(H,R,p[0]+sway,p[1]+32,16,5,'sun',.5);}
  const pad=H.p(6.81,4.64,1.4),dest=[right[0],right[1]+31],x=pad[0]*(1-m)+dest[0]*m,y=pad[1]*(1-m)+dest[1]*m-Math.sin(m*Math.PI)*13;
  const person=H.p(5.9,3.8,0);H.clip([[person[0]-65,person[1]-110],[person[0]+30,person[1]-110],[person[0]+30,person[1]-30],[person[0]-65,person[1]-30]],()=>trader(H,R,...person,[x,y-22]));pouch(H,R,x,y);
  const cloth=H.p(4.44,.8,2.47),flap=Math.sin(t*Math.PI*2/20)*2;surface(H,R,[[cloth[0]-10,cloth[1]],[cloth[0]+10,cloth[1]],[cloth[0]+11,cloth[1]+7+flap],[cloth[0]-8,cloth[1]+7]],'paper',1);
  actor(H,R,4.26,8.66,t,'hanoiSpiceCustomer',{shirt:['teal',.62],face:'se',hairStyle:'bun',prop:(A,B,p)=>{const q=[p.nearHand[0],p.nearHand[1]+22];surface(A,B,[[q[0]-12,q[1]],[q[0]+10,q[1]],[q[0]+8,q[1]-17],[q[0]-10,q[1]-17]],'sun',.4);stroke(A,B,[[q[0]-9,q[1]-17],[q[0]-5,q[1]-29],[q[0]+5,q[1]-27],[q[0]+8,q[1]-17]],'blue',1.2);}},0,1.35);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
