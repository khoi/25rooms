import { world, shape, oval, stroke, box, ell, loop, cycle, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, cushion, drape, caneChair, vessel, branchSpray } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { recessedFrame, panelFront, taskLight } from '../joinery.js';

const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const rest={...FIGURES.sample('sit',0),head:7,al:58,el:24,ar:119,er:15};
FIGURES.clips.mexicoMusicGuitar={dur:24,keys:[[0,rest],[.2,rest],[.23,{...rest,al:67,el:15}],[.27,rest],[.3,{...rest,al:67,el:15}],[.34,rest],[.37,{...rest,al:67,el:15}],[.4,rest],[.6,{...rest,head:-10}],[.92,rest],[1,rest]]};
function guitar(H,R,x,y,angle=-.45){const c=Math.cos(angle),s=Math.sin(angle),P=(a,b)=>[x+a*c-b*s,y+a*s+b*c];
  const body=loop([[-11,-4],[-14,3],[-10,15],[0,18],[11,13],[13,4],[8,-5],[10,-12],[5,-19],[-5,-19],[-10,-12]],2).map(([a,b])=>P(a,b));surface(H,R,body,'sun',.78,.9);H.line(R,body.slice(0,10),'paper',1.2);
  surface(H,R,[P(-3,-13),P(3,-13),P(3,-43),P(-3,-43)],'coral',.74,.7);surface(H,R,[P(-4,-43),P(4,-43),P(5,-55),P(-5,-55)],'sun',.8,.7);
  oval(H,R,...P(0,-6),5,5,'blue',.9);oval(H,R,...P(0,-6),3.5,3.5,'coral',.3);
  for(let n=0;n<6;n++){const a=-2+n*.8;H.line(R,[P(a,9),P(a,-51)],'paper',.45);}
  for(let n=0;n<6;n++)H.line(R,[P(-3,-18-n*4),P(3,-18-n*4)],'blue',.6);
  H.line(R,[P(-5,10),P(5,10)],'blue',2.2);for(const d of [-1,1])for(let n=0;n<3;n++){H.line(R,[P(d*3,-46-n*3),P(d*7,-46-n*3)],'blue',.8);oval(H,R,...P(d*7,-46-n*3),1.5,1,'paper',1);}
  surface(H,R,[P(1,3),P(5,2),P(3,7)],'coral',.8,.5);
}
const room=world('mexico-city-courtyard-music','The last phrase stays home',{wall:false,floor:'blue',tone:.2,head:55},(H,R)=>{
  for(let i=0;i<12;i+=1.4)for(let j=0;j<12;j+=1.4)H.outline(R,H.tile(i+.03,j+.03,1.34,1.34,.016),'blue',.65,{tone:.37});
  masonry(H,R,'nw',0,12,0,3.9,'paper',.78);masonry(H,R,'ne',0,12,0,3.85,'teal',.2);
  for(const j of [.35,7.1,11.63]){
    timber(H,R,.11,j,.22,.21,.04,3.77,'sun');
    timber(H,R,.1,j-.08,.36,.36,3.51,.18,'coral');
  }
  timber(H,R,.09,.22,.29,11.55,3.78,.14,'sun');
  timber(H,R,.1,.1,11.77,.31,3.86,.14,'sun');
  for(let j=.4;j<11.7;j+=.62){surface(H,R,H.faceJ(.16,j,.55,.12,.48),'teal',.55,.6);const p=H.p(.17,j+.275,.3);surface(H,R,[[p[0],p[1]-3],[p[0]+4,p[1]],[p[0],p[1]+3],[p[0]-4,p[1]]],'sun',.7,.4);}
  for(const j of [7.05,11.45]){const p=H.p(.46,j,2.99);bentTube(H,R,[[.2,j,3.12],[.7,j,3.12]],1.8,'blue');surface(H,R,[[p[0]-7,p[1]-6],[p[0]+7,p[1]-6],[p[0]+10,p[1]+7],[p[0]-10,p[1]+7]],'coral',.72,.8);oval(H,R,p[0],p[1]+7,9,3,'sun',.8);H.glow(p[0],p[1]+15,27,30,'sun',.22);}
  const doorP=(u,z,d=.2)=>wallPt(H,'nw',1.1+u,.1+z,-d);
  const arch=margin=>{const q=[doorP(margin,margin),doorP(5.4-margin,margin),doorP(5.4-margin,2.6)];for(let n=0;n<=30;n++){const a=n*Math.PI/30;q.push(doorP(2.7+Math.cos(a)*(2.7-margin),2.6+Math.sin(a)*.66));}return q;};
  surface(H,R,arch(0),'sun',.54,1.1);surface(H,R,arch(.17),'blue',.56,.85);
  H.clip(arch(.2),()=>{
    surface(H,R,[doorP(.1,.1),doorP(5.3,.1),doorP(5.3,.65),doorP(.1,.65)],'teal',.55,.4);
    for(const u of [.7,2.25,4.7]){const p=doorP(u,.7);branchSpray(H,R,...p,.9,'teal',u<2?1:-1);}
    for(const u of [.5,1.25,2.0,2.75,3.5,4.25,5])H.line(R,[doorP(u,.28),doorP(u,1.0)],'blue',1.1);
    H.line(R,[doorP(.2,1),doorP(5.2,1)],'blue',1.6);
    for(let n=0;n<6;n++)H.line(R,[doorP(.4+n*.77,.17),doorP(.7+n*.77,.17)],'paper',.8);
  });
  timber(H,R,.12,1.04,.65,5.52,.02,.12,'sun');
  for(const j of [1.13,6.25]){
    const leaf=[H.p(.45,j,.13),H.p(1.2,j+.55,.13),H.p(1.2,j+.55,2.92),H.p(.45,j,3.1)];surface(H,R,leaf,'sun',.55,.8);
    for(let z=.42;z<2.8;z+=.33)H.line(R,[H.p(.5,j+.04,z),H.p(1.14,j+.51,z-.11)],'coral',.7);
    bentTube(H,R,[[.2,j,1.25],[1.05,j+.45,1.13]],1.5,'blue');
  }
  H.tint([H.p(.5,1.3,.02),H.p(.5,6.2,.02),H.p(5.6,9.3,.02),H.p(5.6,4.3,.02)],'sun',.14);
  recessedFrame(H,R,'nw',8.45,2.35,1.45,1.4,'coral',P=>{
    surface(H,R,[P(.14,.13),P(2.21,.13),P(2.21,1.26),P(.14,1.26)],'paper',1,.5);
    surface(H,R,[P(.25,.28),P(1.0,1.1),P(1.7,.3)],'teal',.5,.5);const p=P(1.6,.94);oval(H,R,...p,9,9,'sun',.6);
  });
  recessedFrame(H,R,'ne',1.4,4.5,1.7,1.3,'sun',P=>{
    surface(H,R,[P(.15,.14),P(4.35,.14),P(4.35,1.16),P(.15,1.16)],'teal',.28,.5);
    for(let n=0;n<3;n++){const x=.32+n*1.37;surface(H,R,[P(x,.24),P(x+1.13,.24),P(x+1.13,1.05),P(x,1.05)],'paper',1,.5);for(let z=.42;z<.97;z+=.18)H.line(R,[P(x+.11,z),P(x+1.01,z)],'blue',.55,{tone:.47});for(let k=0;k<3;k++){const p=P(x+.22+k*.29,.45+(k%2)*.2);oval(H,R,...p,2.1,1.7,n===1?'coral':'teal',.72);H.line(R,[[p[0]+1,p[1]],[p[0]+1,p[1]-6]],'blue',.6);}}
  });
  timber(H,R,1.7,.12,4.06,.64,.62,.1,'sun');
  for(const x of [1.84,3.67,5.56])timber(H,R,x,.15,.12,.59,.12,.5,'teal');
  timber(H,R,1.75,.16,3.96,.56,.14,.09,'teal');
  for(let n=0;n<4;n++)box(H,R,2.06+n*.21,.26,.15,.39,.24,.31,['paper','sun','coral','teal'][n],.64);
  const recorder=H.p(4.64,.48,.35);surface(H,R,[[recorder[0]-13,recorder[1]-6],[recorder[0]+13,recorder[1]-6],[recorder[0]+13,recorder[1]+7],[recorder[0]-13,recorder[1]+7]],'blue',.68,.8);for(const d of [-7,7])oval(H,R,recorder[0]+d,recorder[1],4,4,'paper',.6);H.line(R,[[recorder[0]-4,recorder[1]-6],[recorder[0]-4,recorder[1]-10],[recorder[0]+5,recorder[1]-10],[recorder[0]+5,recorder[1]-6]],'blue',1.4);

  for(let n=0;n<3;n++)box(H,R,1.88+n*.65,.23,.54,.37,.73,.06,'coral',.65);
  drape(H,R,4.6,.23,.85,.5,.76,.45,'paper');
  for(const x of [6.4,7.15]){const p=H.p(x,.35,2.5);H.line(R,[[p[0],p[1]],[p[0]+5,p[1]+28]],'sun',2.2);stroke(H,R,[[p[0]+5,p[1]+28],[p[0]+10,p[1]+43],[p[0]-3,p[1]+42],[p[0],p[1]]],'coral',1.6);H.dot(p[0],p[1],2,'blue');}
  cabinetFrame(H,R,7.95,.38,3.55,1.35,.12,3.45,3,'coral',(x,y,w,d,z,h,col)=>{
    for(const zz of [.66,1.56,2.5])timber(H,R,x,y,w,d,z+zz,.1,'sun');
    if(col===0){for(let n=0;n<5;n++){const w=.12+(n%2)*.03;box(H,R,x+.08+n*.17,y+.2,w,.58,z+.73,.65-n%2*.12,['paper','teal','sun'][n%3],.7);}drape(H,R,x+.04,y+.06,w-.1,d-.15,z+2.58,.3,'paper');}
    if(col===1){metal(H,R,x+.12,y+.2,w-.24,.67,z+1.7,.56,'blue');const p=H.p(x+w*.5,y+.9,z+1.96);oval(H,R,...p,8,11,'teal',.55);oval(H,R,...p,3,4,'paper',.8);for(let n=0;n<3;n++){const p=H.p(x+.3+n*.18,y+.5,z+.25);H.outline(R,ell(...p,9,5),'blue',1.2);}}
    if(col===2){for(let n=0;n<2;n++)box(H,R,x+.13+n*.37,y+.18,.27,.75,z+.1,1.26,'teal',.55);const h=H.p(x+.58,y+.78,z+.85);stroke(H,R,[[h[0]-5,h[1]],[h[0]-5,h[1]-8],[h[0]+5,h[1]-8],[h[0]+5,h[1]]],'coral',2);for(let q=0;q<3;q++)H.line(R,[[h[0]-4+q*3,h[1]-10],[h[0]-4+q*3,h[1]-6]],'sun',.7);drape(H,R,x+.03,y+.05,w-.1,d-.1,z+1.65,.34,'sun');}
  });
  for(const x of [8.26,9.4,10.52]){
    const p=H.p(x,.68,3.64);surface(H,R,[[p[0]-9,p[1]],[p[0]+9,p[1]],[p[0]+9,p[1]-16],[p[0]-9,p[1]-16]],'sun',.55,.7);surface(H,R,[[p[0]-6,p[1]-3],[p[0]+6,p[1]-3],[p[0]+6,p[1]-13],[p[0]-6,p[1]-13]],'paper',1,.5);oval(H,R,p[0],p[1]-9,3,3,'coral',.65);
  }
  panelFront(H,R,7.99,1.77,3.47,.15,.63,3,'coral');
  taskLight(H,R,7.92,1.42,3.57,'sun',-.75);
  for(const x of [6.0,9.12]){
    bentTube(H,R,[[x,4.34,.06],[x+.32,5.0,1.07],[x,5.5,.06]],3.2,'blue');
    metal(H,R,x-.12,5.34,.48,.28,.015,.065,'blue');
  }
  bentTube(H,R,[[6.16,4.92,.46],[9.24,4.92,.46]],2.4,'blue');
  metal(H,R,5.92,4.27,3.6,1.25,1.0,.18,'blue');
  surface(H,R,H.tile(6.03,4.72,3.38,.67,1.185),'paper',1,.6);
  for(let n=0;n<25;n++){const x=6.03+n*3.38/25;H.line(R,[H.p(x,4.72,1.2),H.p(x,5.39,1.2)],'blue',.6);if(![2,6].includes(n%7))metal(H,R,x+.055,4.73,.065,.38,1.2,.025,'blue');}
  for(const x of [6.23,8.97])bentTube(H,R,[[x,4.35,1.19],[x,4.18,1.88]],1.8,'blue');
  const music=[H.p(6.27,4.19,1.46),H.p(8.96,4.19,1.46),H.p(8.96,4.0,2.13),H.p(6.27,4.0,2.13)];surface(H,R,music,'blue',.62,.8);
  for(let n=0;n<2;n++){
    const x=6.46+n*1.13;surface(H,R,[H.p(x,4.21,1.52),H.p(x+1.02,4.21,1.52),H.p(x+1.02,4.02,2.06),H.p(x,4.02,2.06)],'paper',1,.6);
    for(let k=0;k<4;k++)H.line(R,[H.p(x+.1,4.18-k*.027,1.61+k*.085),H.p(x+.89,4.18-k*.027,1.61+k*.085)],'teal',.55);
    for(let k=0;k<4;k++){const p=H.p(x+.18+k*.18,4.12,1.78+(k%2)*.08);oval(H,R,...p,1.5,1,'blue',.7);H.line(R,[[p[0]+1,p[1]],[p[0]+1,p[1]-4]],'blue',.5);}
  }
  H.line(R,[H.p(6.18,4.24,1.43),H.p(9.08,4.24,1.43)],'sun',2);
  for(const x of [6.48,8.72]){const p=H.p(x,4.51,1.204);H.outline(R,ell(...p,5,2.5),'blue',.7);for(let n=0;n<3;n++)H.line(R,[[p[0]-4,p[1]-1+n],[p[0]+4,p[1]-1+n]],'teal',.45);}
  bentTube(H,R,[[6.0,4.55,.91],[5.79,4.55,.91]],1.7,'blue');
  const hook=H.p(5.79,4.55,.94);H.outline(R,ell(...hook,3.2,4.2),'coral',1);
  drape(H,R,5.55,4.65,.42,.36,.8,.3,'paper');
  for(let n=0;n<4;n++)H.dot(...H.p(6.2+n*.27,4.47,1.19),1.6,n===1?'coral':'sun');
  H.dot(...H.p(7.25,5.17,1.205),1.7,'coral');
  bentTube(H,R,[[9.4,4.37,1.06],[9.68,4.62,.08],[8.4,5.5,.04],[8.3,6.3,.04]],1.1,'blue');
  metal(H,R,8.08,6.08,.45,.58,.03,.08,'blue');H.line(R,[H.p(8.13,6.22,.13),H.p(8.48,6.22,.13)],'paper',.8);
  surface(H,R,H.tile(6.02,5.45,.45,.3,.025),'coral',.5,.5);
  benchFrame(H,R,6.45,6.03,2.25,.94,.59,'sun');cushion(H,R,6.5,6.08,2.1,.8,.6,.1,'coral');
  for(const q of [[1.78,5.7],[2.54,5.9],[2.04,6.47]])bentTube(H,R,[[2.11,5.97,.37],[q[0],q[1],.035]],1.8,'blue');
  bentTube(H,R,[[2.11,5.97,.15],[2.11,5.97,1.89]],2.2,'blue');
  surface(H,R,[H.p(1.49,5.84,1.54),H.p(2.69,5.84,1.54),H.p(2.69,5.61,2.16),H.p(1.49,5.61,2.16)],'sun',.63,.7);
  surface(H,R,[H.p(1.6,5.83,1.6),H.p(2.59,5.83,1.6),H.p(2.59,5.63,2.1),H.p(1.6,5.63,2.1)],'paper',1,.5);
  for(let n=0;n<4;n++)H.line(R,[H.p(1.69,5.8-n*.035,1.66+n*.1),H.p(2.49,5.8-n*.035,1.66+n*.1)],'blue',.6);
  benchFrame(H,R,2.85,6.7,1.7,1.4,.55,'sun');cushion(H,R,2.9,6.75,1.6,1.3,.56,.14,'teal');
  bentTube(H,R,[[2.0,5.1,.04],[2.4,5.5,.06],[2.23,5.3,1.43]],2.5,'blue');for(const i of [1.95,2.45])bentTube(H,R,[[2.22,5.3,.62],[i,5.3,.67]],2.2,'coral');
  const caseP=(x,y,z=.16)=>H.p(1.31+x,8.34+y,z),outline=[[.4,0],[.88,0],[.96,.4],[.91,.94],[1.12,1.19],[1.23,1.74],[1.1,2.36],[.78,2.73],[.31,2.7],[.02,2.33],[-.06,1.78],[.07,1.25],[.3,.94],[.3,.41]].map(([x,y])=>caseP(x,y));
  surface(H,R,outline,'blue',.78,.9);
  const liner=outline.map(([x,y])=>{const c=caseP(.58,1.4);return[c[0]+(x-c[0])*.88,c[1]+(y-c[1])*.9];});surface(H,R,liner,'coral',.6,.8);
  H.line(R,[caseP(.16,1.16,.18),caseP(1.05,1.16,.18)],'sun',1.5);
  const coil=caseP(.57,1.86,.19);for(let n=0;n<3;n++)H.outline(R,ell(...coil,10+n*3,5+n*1.4),'sun',.8);
  surface(H,R,[caseP(.36,.26,.19),caseP(.82,.26,.19),caseP(.82,.74,.19),caseP(.36,.74,.19)],'paper',1,.6);
  for(const j of [8.73,10.58])metal(H,R,2.5,j,.13,.24,.13,.11,'sun');
  const lid=[H.p(1.23,8.33,.22),H.p(1.23,11.13,.22),H.p(.87,11.13,1.06),H.p(.87,8.33,1.06)];surface(H,R,lid,'blue',.66,.9);H.outline(R,[H.p(1.15,8.51,.36),H.p(1.15,10.96,.36),H.p(.91,10.96,.91),H.p(.91,8.51,.91)],'coral',1.4);
  for(const j of [8.52,10.94])H.line(R,[H.p(1.01,j,.85),H.p(1.76,j,.2)],'sun',.9);
  for(const x of [4.45,7.05])for(const j of [9.52,10.68])timber(H,R,x,j,.13,.14,.04,.57,'sun');
  timber(H,R,4.48,9.56,2.65,1.16,.2,.1,'sun');
  for(let n=0;n<3;n++)box(H,R,4.79+n*.055,9.68,1.2,.83,.32+n*.075,.065,['paper','coral','sun'][n],.6);
  timber(H,R,4.33,9.41,2.99,1.49,.58,.13,'teal');
  const dish=H.p(4.96,10.13,.73);oval(H,R,...dish,11,6,'paper',1);for(let n=0;n<3;n++)shape(H,R,[[dish[0]-5+n*4,dish[1]-2],[dish[0]-1+n*4,dish[1]-1],[dish[0]-3+n*4,dish[1]+3]],n===1?'sun':'coral',.65,.5);
  const metro=H.p(6.76,9.75,.72);surface(H,R,[[metro[0]-9,metro[1]],[metro[0]+9,metro[1]],[metro[0]+4,metro[1]-23],[metro[0]-4,metro[1]-23]],'sun',.8,.8);surface(H,R,[[metro[0]-5,metro[1]-4],[metro[0]+5,metro[1]-4],[metro[0]+2,metro[1]-19],[metro[0]-2,metro[1]-19]],'blue',.55,.5);H.line(R,[[metro[0],metro[1]-5],[metro[0]+6,metro[1]-21]],'paper',1);
  H.line(R,[H.p(5.55,10,.74),H.p(6.2,10.35,.74)],'sun',1.8);drape(H,R,6.5,10.03,.62,.7,.72,.22,'paper');
  const roll=H.p(5.82,9.86,.74);H.outline(R,ell(...roll,8,4),'blue',1);H.line(R,[[roll[0],roll[1]],[roll[0]+9,roll[1]+5],[roll[0]+14,roll[1]+2]],'coral',1.5);
  surface(H,R,H.faceJ(.34,7.54,3.96,.67,1.28),'teal',.43,.9);
  timber(H,R,.26,7.5,.71,4.05,1.3,.12,'sun');
  for(const j of [7.7,9.14,10.6]){const p=H.p(.72,j,1.44);surface(H,R,[[p[0]-10,p[1]],[p[0]+10,p[1]],[p[0]+10,p[1]-16],[p[0]-10,p[1]-16]],j<9?'paper':'coral',.75,.7);H.line(R,[[p[0]-6,p[1]-11],[p[0]+6,p[1]-11]],'blue',.8);}
  caneChair(H,R,9.6,8.6,'sun');drape(H,R,9.55,8.55,1,.55,1.23,.8,'paper');
  benchFrame(H,R,10.18,5.27,1.19,1.13,.3,'sun');
  metal(H,R,10.22,5.31,1.12,.98,.36,1.16,'blue');
  surface(H,R,H.faceI(10.31,6.3,.94,.48,1.31),'teal',.45,.7);
  const amp=H.p(10.78,6.32,.88);oval(H,R,...amp,12,15,'blue',.72);oval(H,R,...amp,7,9,'paper',.5);oval(H,R,...amp,3,4,'blue',.8);
  for(const x of [10.47,10.72,10.97])H.dot(...H.p(x,6.31,1.43),1.6,x<10.6?'coral':'sun');
  bentTube(H,R,[[10.34,6.33,.53],[10.05,6.81,.04],[9.62,6.5,.04],[9.43,4.6,1.06]],1.1,'blue');
  const phones=H.p(10.69,5.77,1.53);stroke(H,R,[[phones[0]-7,phones[1]],[phones[0]-8,phones[1]-12],[phones[0]+7,phones[1]-12],[phones[0]+8,phones[1]]],'coral',1.8);for(const d of [-8,8])oval(H,R,phones[0]+d,phones[1],3,5,'sun',.7);
  vessel(H,R,10.65,10.4,0,9,27,'teal',false);cushion(H,R,9,10.15,1.12,.85,.03,.2,'coral');
},(H,R,t)=>{
  const u=cycle(t,24)*24,play=ease(4.8,5.5,u)*(1-ease(9.1,9.6,u)),pulse=Math.sin((u-4.8)*Math.PI*1.7)*play;
  actor(H,R,3.61,7.49,t,'mexicoMusicGuitar',{shirt:['paper',1],pants:['blue',.68],hairStyle:'curly',face:'se',prop:(HH,RR,p)=>{
    const c=[p.farHand[0]+1,p.farHand[1]+5];guitar(HH,RR,...c,.65);HH.line(RR,[p.farHand,[c[0]-3,c[1]-4+pulse*2]],'coral',2.6);oval(HH,RR,...p.nearHand,2.3,2.2,'coral',.4);oval(HH,RR,...p.farHand,2.3,2.2,'coral',.4);
  }},.1,1.42);
  const foot=H.p(7.7,6.95,.03),hip=H.p(7.7,6.4,.74),chest=[hip[0]-4,hip[1]-23],head=[chest[0]+1,chest[1]-14];
  for(const s of [-1,1])H.line(R,[[hip[0]+s*6,hip[1]],[foot[0]+s*9,foot[1]-9],[foot[0]+s*12,foot[1]]],'blue',7);
  shape(H,R,[[chest[0]-9,chest[1]],[chest[0]+9,chest[1]],[hip[0]+9,hip[1]+3],[hip[0]-10,hip[1]+3]],'coral',.76);oval(H,R,...head,8,9,'coral',.4);shape(H,R,[[head[0]-8,head[1]],[head[0]-8,head[1]-7],[head[0]+1,head[1]-11],[head[0]+8,head[1]-4]],'blue',.83,.6);oval(H,R,head[0]-7,head[1]-9,4,4,'blue',.8);
  for(const [i,s]of [[7.0,-1],[7.55,1]]){const hand=H.p(i,5.25,1.2),target=[hand[0],hand[1]-Math.max(0,pulse*s)*2],shoulder=[chest[0]+s*8,chest[1]+4],elbow=[(target[0]+shoulder[0])/2,(target[1]+shoulder[1])/2+7];H.line(R,[shoulder,elbow,target],'blue',5.6);H.line(R,[shoulder,elbow,target],'coral',4);oval(H,R,...target,3,2,'coral',.4);}
  const glance=ease(9.6,11,u)*(1-ease(14.4,18,u));H.dot(head[0]+3-glance*4,head[1]+1,1,'blue');
  const p=H.p(.6,4.45,3.46),turn=Math.sin(u*Math.PI/12)*.4;H.line(R,[[p[0],p[1]-11],[p[0],p[1]+4]],'blue',.7);H.line(R,[[p[0]-16,p[1]+4],[p[0]+17,p[1]+6]],'blue',.8);
  for(const [dx,dy,ink]of [[-15,18,'teal'],[14,24,'coral'],[0,40,'sun']]){const x=p[0]+dx+turn*4;H.line(R,[[p[0]+dx,p[1]+5],[x,p[1]+dy]],'blue',.6);surface(H,R,ell(x,p[1]+dy+5,Math.max(2,7*Math.cos(turn)),6),ink,.65,.6);}
});
room.loopSeconds=24;
room.stillTime=9.6;
export default room;
