import { world, shape, oval, stroke, box, ell, loop, TAU, wallPt } from '../../worlds/common.js';
import { timber, metal, vessel, bentTube, drape, benchFrame } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, wallRack, hangingRail, taskLight } from '../joinery.js';
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

function print(H,R,P,ink='teal',shift=0){
  const pts=[[.13,.55],[.29,.38],[.26,.13],[.52,.39],[.62,.25],[.7,.43],[.85,.49],[.69,.59],[.59,.79],[.39,.68],[.18,.86],[.28,.63]];
  shape(H,R,pts.map(([u,v])=>P(u+shift,v)),ink,.75,.6);
  H.line(R,[P(.38+shift,.47),P(.52+shift,.6),P(.65+shift,.5)],'paper',.9);
  H.dot(...P(.68+shift,.45),1.3,'paper');
}
const room=world('mexico-city-print-courtyard','The proof lifts from the board',{wall:'paper',wallTone:.8,height:4.1,floor:'paper',tone:1,pattern:'tiles',accent:'coral',head:60},(H,R)=>{
  masonry(H,R,'nw',0,12,0,.8,'teal',.24);
  windowBay(H,R,'nw',4.7,5.9,1.52,2.2,{ink:'teal',divisions:3});
  for(let k=0;k<10;k++){
    const i=.48+k*.56,h=.28+k*.32;
    box(H,R,i,.24,.58,1.65,.02,h,'paper',1);
    timber(H,R,i-.015,.18,.61,1.78,h,.08,'sun');
  }
  for(const k of [0,3,6,9])bentTube(H,R,[[.77+k*.56,1.85,.36+k*.32],[.77+k*.56,1.85,1.38+k*.32]],1.9,'teal');
  bentTube(H,R,[[.77,1.85,1.38],[5.81,1.85,4.26]],2.5,'teal');
  for(let k=0;k<9;k++)H.line(R,[H.p(.8+k*.56,1.87,.47+k*.32),H.p(1.36+k*.56,1.87,1.66+k*.32)],'teal',.8);
  cabinetFrame(H,R,6.65,.45,4.78,1.74,.14,3.29,3,'teal',(i,j,w,d,z,h,n)=>{
    for(const dz of [.61,1.23,1.85,2.52])timber(H,R,i,j,w,d,z+dz,.07,'sun');
    if(n===0){for(let row=0;row<4;row++)for(let k=0;k<3;k++){const zz=z+.12+row*.61+k*.08;shape(H,R,H.tile(i+.1,j+.1,w-.2,d-.22,zz),'paper',1,.45);}}
    if(n===1){for(let row=0;row<3;row++)for(let k=0;k<2;k++){timber(H,R,i+.12+k*.64,j+.15,.48,.76,z+.12+row*.64,.25,k%2?'sun':'coral');}vessel(H,R,i+.44,j+.64,z+2.59,9,16,'coral',false);}
    if(n===2){for(let k=0;k<5;k++){box(H,R,i+.1+k*.22,j+.12,.14,d-.2,z+.08,.95,k%2?'coral':'paper',k%2?.5:1);}drape(H,R,i,j,w,d,z+1.94,.38,'paper');}
  });
  hangingRail(H,R,'ne',6.9,4.18,3.9,5,(P,u,n)=>{
    const [x,y]=P(u,-.19),w=13,h=20;
    shape(H,R,[[x-w,y],[x+w,y+7],[x+w,y+h+7],[x-w,y+h]],'paper',1,.55);
    print(H,R,(a,b)=>[x-w+a*w*2,y+a*7+b*h],n%2?'coral':'teal');
    H.line(R,[[x,y-4],[x,y+4]],n===1?'sun':'blue',2.2);
  });
  benchFrame(H,R,2.95,4.18,5.39,3.28,1.32,'sun');
  timber(H,R,3.12,4.34,4.98,1.97,.35,.1,'teal');
  for(let n=0;n<4;n++)shape(H,R,H.tile(3.37,4.46,1.84,1.34,.48+n*.05),'paper',1,.5);
  box(H,R,6.1,4.48,1.71,1.45,.46,.51,'teal',.5);
  H.line(R,[H.p(6.67,5.95,.69),H.p(7.18,5.95,.69)],'blue',2.2);
  timber(H,R,3.46,4.68,2.45,1.81,1.34,.13,'sun');
  shape(H,R,H.tile(3.57,4.79,2.23,1.59,1.48),'blue',.8,.6);
  print(H,R,(u,v)=>H.p(3.6+u*2.17,4.83+v*1.53,1.49),'sun');
  for(let k=0;k<8;k++)H.line(R,[H.p(3.55+k*.28,6.52,1.36),H.p(3.61+k*.28,6.52,1.43)],'coral',.55);
  metal(H,R,6.33,4.52,1.36,1.53,1.34,.13,'teal');
  shape(H,R,H.tile(6.42,4.63,1.16,1.3,1.48),'blue',.68,.6);
  const p=H.p(6.85,5.2,1.59);
  H.line(R,[[p[0]-15,p[1]],[p[0]+12,p[1]+13]],'blue',9);
  H.line(R,[[p[0]-15,p[1]-2],[p[0]+12,p[1]+11]],'teal',5);
  stroke(H,R,[[p[0]-15,p[1]],[p[0]-23,p[1]+8],[p[0]-12,p[1]+17],[p[0]-8,p[1]+26]],'blue',2);
  H.line(R,[[p[0]-8,p[1]+20],[p[0]-6,p[1]+28]],'sun',4);
  for(const i of [6.34,7.62])metal(H,R,i,5.48,.1,.52,1.46,.15,'paper');
  vessel(H,R,7.61,6.73,1.37,9,9,'coral',false);
  const sheet=H.tile(3.56,8.68,1.9,1.46,.08);shape(H,R,sheet,'paper',1,.6);print(H,R,(u,v)=>H.p(3.56+u*1.9,8.68+v*1.46,.09),'coral',.05);print(H,R,(u,v)=>H.p(3.56+u*1.9,8.68+v*1.46,.1),'teal');
  timber(H,R,5.65,8.91,.53,.47,.06,.15,'sun');print(H,R,(u,v)=>H.p(5.65+u*.53,8.91+v*.47,.22),'blue');
  shape(H,R,H.tile(6.49,8.73,1.3,1.04,.08),'sun',.45,.65);shape(H,R,H.tile(6.58,8.82,1.12,.85,.09),'paper',1,.5);
  H.line(R,[H.p(6.7,8.86,.1),H.p(7.5,9.58,.1)],'teal',1.2);
  taskLight(H,R,8.03,4.29,1.35,'coral',.8);
  for(let n=0;n<4;n++){const p=H.p(4.4+n*.43,.74,3.2);oval(H,R,p[0],p[1],5.5,3,'paper',1);H.line(R,[[p[0]-5,p[1]],[p[0]-8,p[1]-20-n*3],[p[0]+3,p[1]-22-n*3],[p[0]+5,p[1]]],'paper',5);H.outline(R,ell(p[0]-2,p[1]-21-n*3,5.5,3),'blue',.55);}
  const bp=H.p(5.22,1.08,3.26);shape(H,R,[[bp[0]-8,bp[1]],[bp[0],bp[1]-10],[bp[0]+3,bp[1]-2],[bp[0]+13,bp[1]-8],[bp[0]+7,bp[1]+5]],'paper',1,.7);
  box(H,R,9.15,8.38,2.17,1.43,.06,.6,'sun',.45);
  shape(H,R,H.tile(9.23,8.46,2.01,1.27,.69),'blue',.45,.6);
  for(let n=0;n<5;n++)shape(H,R,H.tile(9.36,8.53,1.6,1.06,.72+n*.04),'paper',1,.5);
  drape(H,R,10.35,8.63,.27,.93,.93,.23,'coral');
  for(const [i,j] of [[9.27,8.53],[10.8,9.4]])shape(H,R,[H.p(i,j,.94),H.p(i+.25,j,.94),H.p(i,j+.25,.94)],'teal',.7,.5);
  timber(H,R,.83,6.88,1.38,3.31,.2,.11,'sun');
  for(let n=0;n<4;n++)box(H,R,.95,7.01+n*.67,1.08,.55,.33,.11,n%2?'teal':'coral',.5);
},(H,R,t)=>{
  const u=((t%18)+18)%18,lift=ease(3.6,7.2,u)*(1-ease(10.8,16,u));
  const P=(a,b)=>H.p(4.48+a*2.29,5.07+b*1.75,1.49+lift*(.25+b*.31));
  const sheet=[P(0,0),P(1,0),P(1,1),P(0,1)];
  H.tint(sheet.map(([x,y])=>[x+7,y+10]),'blue',.13);
  shape(H,R,sheet,'paper',1,.75);print(H,R,P,'coral',.045);print(H,R,P,'teal');
  H.line(R,[P(.04,.02),P(.94,.02)],'sun',.75);
  const release=ease(0,3.6,u)*(1-ease(14,16,u));
  for(const i of [4.59,6.61]) {
    const p=H.p(i,5.05,1.5);oval(H,R,...p,3,2.5,'coral',.8);
    H.line(R,[p,[p[0]+3-release*7,p[1]+8-release*16]],'blue',2.4);
    H.line(R,[[p[0]+3-release*7,p[1]+8-release*16],[p[0]+8-release*7,p[1]+8-release*16]],'sun',1.7);
  }
  const hands=[P(.48,1),P(.86,1)];
  person(H,R,H.p(7.1,7.18,.02),hands,'teal',1.27,lift*1.4);
  for(const hand of hands)oval(H,R,...hand,2.7,2.3,'coral',.4);
  const p=H.p(2.22,.41,2.45),sway=Math.sin(u*TAU/18)*2;
  shape(H,R,[[p[0]-10,p[1]],[p[0]+10,p[1]],[p[0]+13+sway,p[1]+31],[p[0]-12+sway,p[1]+30]],'coral',.43,.65);
  H.line(R,[[p[0]-7,p[1]+25],[p[0]+9+sway,p[1]+26]],'paper',.9);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
