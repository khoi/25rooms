import { world, shape, oval, stroke, box, ell, loop, TAU, actor, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, vessel, bentTube, slattedSeat, cushion, drape } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, panelFront, caster } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
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

function pane(H,R){
  const P=(u,z)=>wallPt(H,'ne',u,z,-.15);
  for(const i of [1.1,3.7,6.3,8.9,11.5]) {
    H.line(R,[P(i,1.5),P(i,4.44)],'blue',3.3);H.line(R,[P(i+.025,1.5),P(i+.025,4.44)],'paper',1.2);
    for(const z of [1.58,4.32]){const p=P(i,z);shape(H,R,[[p[0]-4,p[1]-3],[p[0]+4,p[1]-3],[p[0]+4,p[1]+3],[p[0]-4,p[1]+3]],'teal',.8,.5);H.dot(p[0],p[1],1,'sun');}
  }
  for(const z of [1.46,4.44])H.line(R,[P(1.04,z),P(11.56,z)],'teal',4);
  for(const i of [2.1,6.8,10.2])H.line(R,[P(i,1.73),P(i+.6,3.76)],'paper',3,{tone:.7});
}
const room=world('mexico-city-cablebus-wait','A window above the roofs',{wall:false,floor:'paper',tone:1,head:60},(H,R)=>{
  for(let i=0;i<12;i+=2)for(let j=0;j<12;j+=2)shape(H,R,H.tile(i+.02,j+.02,1.96,1.96,.02),'paper',1,.6);
  for(let i=.2;i<11.8;i+=.22)H.line(R,[H.p(i,9.46,.035),H.p(i,10.23,.035)],'sun',2.1);
  for(const j of [9.31,10.38])H.line(R,[H.p(.12,j,.025),H.p(11.8,j,.025)],'blue',.8);
  masonry(H,R,'ne',0,12,0,1.5,'teal',.33);
  masonry(H,R,'nw',0,11.96,0,3.5,'paper',.8);
  shape(H,R,wallRect(H,'ne',1.04,11.57,1.48,4.46,-.12),'paper',1,.8);
  const P=(u,z)=>wallPt(H,'ne',u,z,-.14);
  for(let n=0;n<14;n++){
    const u=1.09+n*.76,h=1.88+(n%4)*.19;
    shape(H,R,[P(u,1.52),P(u+.7,1.52),P(u+.7,h),P(u,h)],n%3?'teal':'coral',.24,.5);
    H.line(R,[P(u-.04,h),P(u+.75,h)],'blue',.8);
    for(const a of [.17,.48]){shape(H,R,[P(u+a,1.63),P(u+a+.12,1.63),P(u+a+.12,1.85),P(u+a,1.85)],'paper',1,.4);}
    if(n%3===0){H.line(R,[P(u+.2,h),P(u+.2,h+.29)],'blue',.6);H.line(R,[P(u+.05,h+.25),P(u+.4,h+.25)],'blue',.6);}
  }
  H.line(R,[P(1.06,4.02),P(11.54,4.02)],'blue',1.1);
  H.line(R,[P(1.06,4.09),P(11.54,4.09)],'blue',.6);
  pane(H,R);
  for(const i of [.45,4.2,8.1,11.65])metal(H,R,i,.02,.16,2.35,4.6,.2,'teal');
  metal(H,R,.34,2.19,11.55,.17,4.45,.2,'teal');
  for(let i=.5;i<11.7;i+=.7)H.line(R,[H.p(i,.05,4.83),H.p(i,2.4,4.68)],'blue',1,{tone:.65});
  bentTube(H,R,[[.28,.4,.1],[.28,.4,4.38],[11.7,.4,4.38]],2,'blue');
  for(const i of [1.8,5.4,9.3])metal(H,R,i,.39,.19,.12,4.32,.15,'sun');
  cabinetFrame(H,R,.38,1.13,1.62,3.65,.06,2.88,1,'teal',(i,j,w,d,z,h)=>{
    metal(H,R,i+.11,j+.08,w-.22,d-.13,z+.03,.63,'blue');
    shape(H,R,H.faceI(i+.17,j+d-.13,w-.34,z+.21,z+.5),'paper',1,.6);
    for(let k=0;k<5;k++)H.line(R,[H.p(i+.23,j+d-.1,z+1.9+k*.1),H.p(i+w-.23,j+d-.1,z+1.9+k*.1)],'blue',.8);
    timber(H,R,i,j,w,d,z+1.03,.08,'sun');
    drape(H,R,i+.15,j+.4,w-.3,1.3,z+1.13,.15,'paper');
  });
  panelFront(H,R,.47,4.91,1.41,.7,1.13,1,'teal');
  metal(H,R,.37,4.71,1.64,.29,.03,.54,'blue');
  shape(H,R,H.tile(.6,4.79,1.13,.17,.59),'blue',.8,.6);
  slattedSeat(H,R,3.05,2.31,6.93,.06,'sun',.8);
  cushion(H,R,8.33,2.5,.94,.52,.81,.08,'coral');
  bentTube(H,R,[[2.57,4.21,.02],[2.57,4.21,1.73],[2.57,7.3,1.73],[2.57,7.3,.02]],3.2,'teal');
  for(const j of [4.22,7.28])metal(H,R,2.39,j-.14,.36,.29,.02,.1,'blue');
  shape(H,R,[H.p(2.6,4.48,.51),H.p(2.6,6.94,.51),H.p(2.6,6.94,1.61),H.p(2.6,4.48,1.61)],'paper',.65,.8);
  H.line(R,[H.p(2.61,4.62,.68),H.p(2.61,5.38,1.4)],'paper',2);
  for(const j of [4.47,6.95])for(const z of [.55,1.56])metal(H,R,2.52,j-.06,.15,.12,z,.1,'blue');
  bentTube(H,R,[[9.96,5.4,.02],[9.96,5.4,1.1],[11.62,5.4,1.1],[11.62,5.4,.02]],2.5,'blue');
  for(const i of [10.3,10.66,11.02,11.38])H.line(R,[H.p(i,5.4,.2),H.p(i,5.4,1.08)],'teal',1.5);
  H.dot(...H.p(9.96,5.4,.84),3,'coral');
  timber(H,R,9.76,7.5,1.81,1.2,.37,.12,'sun');
  for(const i of [9.89,11.29])for(const j of [7.65,8.49])metal(H,R,i,j,.1,.1,.05,.32,'teal');
  vessel(H,R,10.21,7.99,.51,6,20,'teal',false);
  const toy=H.p(10.96,8.04,.51);shape(H,R,[[toy[0]-8,toy[1]-12],[toy[0]+8,toy[1]-12],[toy[0]+7,toy[1]],[toy[0]-7,toy[1]]],'sun',.8,.6);shape(H,R,[[toy[0]-5,toy[1]-10],[toy[0]+5,toy[1]-10],[toy[0]+5,toy[1]-5],[toy[0]-5,toy[1]-5]],'teal',.6,.5);H.line(R,[[toy[0],toy[1]-12],[toy[0],toy[1]-19]],'blue',1);
  metal(H,R,.66,8.45,1.3,1.13,.18,.67,'teal');
  for(const i of [.78,1.7])for(const j of [8.56,9.34])caster(H,R,i,j,.06);
  drape(H,R,.72,8.54,.73,.84,.88,.27,'paper');
  bentTube(H,R,[[1.4,9.74,.05],[1.55,9.68,2.22]],2,'sun');
  for(let k=0;k<7;k++)H.line(R,[H.p(1.09+k*.09,9.77,.08),H.p(1.09+k*.09,9.77,.34)],'blue',1);
  for(let n=0;n<5;n++)metal(H,R,.43,6.4,.52,.12,.03+n*.18,.09,'coral');
  for(const j of [11.55,11.72])metal(H,R,.12,j,11.76,.08,.02,.05,'blue');
},(H,R,t)=>{
  const u=((t%16)+16)%16,fold=ease(3.2,6.4,u)*(1-ease(9.6,14,u));
  const P=(i,z)=>wallPt(H,'ne',i,z,-.14),uCab=1.15+((u/16+.08)%1)*12;
  H.clip(wallRect(H,'ne',1.08,11.52,1.53,4.41,-.14),()=>{
    const [x,y]=P(uCab,3.27);H.line(R,[[x,y-28],[x,y-8]],'blue',2);shape(H,R,[[x-17,y-11],[x+17,y-11],[x+19,y+14],[x+13,y+21],[x-13,y+21],[x-19,y+14]],'coral',.8,.8);shape(H,R,[[x-13,y-8],[x+13,y-8],[x+14,y+6],[x-14,y+6]],'paper',1,.65);H.line(R,[[x,y-7],[x,y+7]],'blue',1.3);H.line(R,[[x-12,y+14],[x+12,y+14]],'sun',1.2);
  });
  pane(H,R);
  const base=H.p(6.44,6.43,.09),[x,y]=base;
  for(const a of [-26,24]){oval(H,R,x+a,y,7,8,'blue',.85);oval(H,R,x+a,y,3.2,4,'paper',1);}
  for(const s of [-1,1]){stroke(H,R,[[x+s*25,y-3],[x-s*15,y-38],[x+s*12,y-53]],'blue',3.4);stroke(H,R,[[x+s*25,y-3],[x-s*15,y-38]],'paper',1);}
  shape(H,R,[[x-18,y-43],[x+13,y-43],[x+22,y-19],[x-12,y-19]],'teal',.62,.8);
  shape(H,R,[[x-19,y-43],[x-12,y-64],[x+6,y-68],[x+17,y-51],[x+13,y-43]],'paper',1,.7);
  H.line(R,[[x-16,y-45],[x+12,y-24]],'coral',2.3);
  shape(H,R,[[x-2,y-35],[x+6,y-35],[x+6,y-29],[x-2,y-29]],'paper',1,.5);
  const a=-1.36+fold*1.82,hinge=[x+17,y-39],tip=[hinge[0]+Math.cos(a)*31,hinge[1]+Math.sin(a)*31];
  stroke(H,R,[hinge,tip,[tip[0]+14,tip[1]]],'blue',3.2);stroke(H,R,[hinge,tip],'paper',.9);
  oval(H,R,...hinge,4,4,'coral',.8);H.dot(...hinge,1,'paper');
  person(H,R,[x+60,y+2],[[tip[0]+5,tip[1]],hinge],'sun',1.04,-fold);
  actor(H,R,7.2,2.87,u,'lookup',{shirt:['coral',.55],face:'ne'},.64,1.16,'child');
  const sway=Math.sin(u*TAU/16)*2;stroke(H,R,[[x-2,y-31],[x+2+sway,y-16],[x-3+sway,y-8]],'coral',1.5);
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
