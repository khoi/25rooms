import { world, shape, stroke, oval, box, actor, ell, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, drape, vessel, bentTube, caneChair } from '../materials.js';
import { windowBay, wallRack, hangingRail, floorShadow, taskLight, radiator, caster } from '../joinery.js';

const duration = 16;
const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t-a)/(b-a))); return u*u*(3-2*u); };
const rest = { ...FIGURES.clips.idle.keys[0][1], drop:.47,ll:84,lr:80,kl:-84,kr:-80 };
for (const key of ['amsterdamSewingLeft','amsterdamSewingRight']) FIGURES.clips[key] = {dur:duration,keys:[[0,rest],[1,rest]]};

function neighbour(H,R,key,i,j,target,ink,head) {
  const q={...rest,head,al:28,ar:28,el:42,er:42}, scale=1.55, at=H.p(i,j,.22);
  for (const [side,n] of [['l',-1],['r',1]]) {
    const dx=(target[0]+n*6-at[0])/scale-n*5.2,dy=(target[1]-at[1])/scale-(q.drop*19-32.5),a=4.368,b=4.2,r=Math.min(a+b-.001,Math.hypot(dx,dy));
    const e=Math.acos(Math.max(-1,Math.min(1,(r*r-a*a-b*b)/(2*a*b))));
    q['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q['e'+side]=e*180/Math.PI;
  }
  FIGURES.clips[key].keys=[[0,q],[1,q]];
  actor(H,R,i,j,0,key,{shirt:[ink,.7],hairStyle:key.endsWith('Left')?'bun':'curly',glasses:key.endsWith('Left'),hair:key.endsWith('Left')?['paper',.9]:['blue',.75]},.22,scale);
}

function spool(H,R,i,j,z,ink,size=1) {
  const p=H.p(i,j,z),r=3.5*size,h=8*size;
  shape(H,R,[[p[0]-r,p[1]],[p[0]+r,p[1]],[p[0]+r,p[1]-h],[p[0]-r,p[1]-h]],ink,.65,.5);
  for(let n=0;n<4;n++)H.line(R,[[p[0]-r,p[1]-n*h/4],[p[0]+r,p[1]-n*h/4]],'paper',.5);
  oval(H,R,p[0],p[1]-h,r+1,r*.38,'sun',.75);H.dot(p[0],p[1]-h,1,'blue');
}

function quilt(H,R,lift) {
  const P=(u,v,dz=0)=>H.p(3.1+u*5.35,3.25+v*2.72,1.14+lift*v-Math.sin(v*Math.PI)*.1+dz);
  const outer=[P(0,0),P(1,0),P(1,1),P(.7,1.035,-.04),P(.35,1.02,-.03),P(0,1)];
  shape(H,R,outer,'paper',1,1);
  for(let row=0;row<3;row++)for(let col=0;col<5;col++) {
    const u=.035+col*.185,v=.065+row*.295,c=['sun','paper','teal','paper','coral'][(col+row*2)%5];
    shape(H,R,[P(u,v),P(u+.165,v),P(u+.165,v+.265),P(u,v+.265)],c,c==='paper'?1:.36,.6);
    if((col+row)%2)H.line(R,[P(u+.025,v+.03,.01),P(u+.14,v+.23,.01)],'blue',.55,{tone:.4});
    else shape(H,R,[P(u+.025,v+.21,.01),P(u+.08,v+.055,.01),P(u+.14,v+.21,.01)],'coral',.3,.4);
  }
  shape(H,R,[P(.34,.56,.015),P(.66,.55,.015),P(.68,.96,.015),P(.33,.94,.015)],'teal',.62,.65);
  shape(H,R,[P(.395,.625,.025),P(.59,.625,.025),P(.605,.87,.025),P(.385,.87,.025)],'sun',.68,.6);
  for(let n=0;n<11;n++) {
    const u=.34+n*.03;
    H.line(R,[P(u,.565,.035),P(u+.008,.6,.035)],'coral',1);
    H.line(R,[P(u,.907,.035),P(u+.008,.947,.035)],'coral',1);
  }
  for(let n=0;n<7;n++)H.line(R,[P(.331,.62+n*.043,.035),P(.363,.632+n*.043,.035)],'coral',1);
  H.line(R,[P(.02,.975,.025),P(.98,.975,.025)],'sun',1.5);
  for(let n=0;n<6;n++)H.line(R,[P(.03+n*.18,.03,.025),P(.05+n*.18,.8,.025),P(.065+n*.18,1,.025)],'blue',.4,{tone:.3});
  for(const u of [.06,.92])metal(H,R,3.1+u*5.35,3.2,.15,.24,1.15,.06,'blue');
  for(const u of [.03,.98])for(let n=0;n<9;n++){
    const v=.08+n*.1,p=P(u,v,.02),q=H.p(u<.5?2.97:8.5,3.25+v*2.72,1.17);
    H.line(R,[q,[p[0],p[1]-1],[p[0]+2,p[1]+2],q],'paper',.9);
  }
  for(let n=0;n<14;n++){const u=.025+n*.071;H.line(R,[P(u,.014,.02),P(u+.015,.027,.02)],'coral',.6);}
}

const room=world('amsterdam-nieuw-west-sewing','A blanket across two chairs',{floor:'paper',tone:.5,wall:'teal',wallTone:.18,height:3.7,head:30},(H,R)=>{
  for(const j of [.05,10.9])for(let i=.1;i<11.7;i+=.65){shape(H,R,H.tile(i,j,.62,.9,.025),'teal',.18,.5);shape(H,R,H.tile(i+.19,j+.28,.24,.28,.027),'coral',.42,.4);}
  for(let j=1;j<10.7;j+=1.55)H.line(R,[H.p(1.45,j,.03),H.p(11.7,j,.03)],'blue',.5,{tone:.2});
  windowBay(H,R,'ne',2.3,8.85,1.28,2.22,{ink:'teal',divisions:4,view:P=>{
    shape(H,R,[P(.13,.13),P(8.7,.13),P(8.7,.76),P(.13,.62)],'teal',.16,.4);
    for(let n=0;n<5;n++){const u=.25+n*1.7;shape(H,R,[P(u,.4),P(u+1.12,.4),P(u+1.12,1.24),P(u,1.24)],'coral',.13,.4);for(const a of [.22,.69])H.line(R,[P(u+a,.66),P(u+a,1.07)],'paper',3);}
  }});
  timber(H,R,2.18,.14,9.14,.72,1.1,.18,'sun');
  radiator(H,R,'ne',5.95,3.7,.93);
  for(const i of [2.38,4.26,9.83,11.06]){const p=H.p(i,.58,1.29);oval(H,R,...p,5,2.3,'teal',.4);spool(H,R,i,.58,1.31,i<5?'coral':'sun',.65);}
  H.line(R,[H.p(2.2,.14,3.62),H.p(11.15,.14,3.62)],'blue',2);
  for(let n=0;n<7;n++){const i=2.38+n*.27;drape(H,R,i,.28,.24,.37,3.55,1.9,'paper');}
  H.line(R,[H.p(9.9,.45,1.44),H.p(10.45,.78,1.66),H.p(10.8,.25,1.69)],'blue',1.7);
  shape(H,R,H.faceJ(.42,.4,7.35,.22,3.55),'blue',.6,.6);
  for(const j of [.36,2.8,5.2,7.78])timber(H,R,.25,j,1.24,.13,.15,3.47,'sun');
  for(const z of [.2,1.1,2.2,3.56])timber(H,R,.22,.34,1.3,7.58,z,.13,'sun');
  for(const j of [1.8,4.77,6.87])timber(H,R,.39,j,1.11,.1,.34,1.84,'teal');
  for(const j of [.55,1.06,1.55,2.03,2.49]){
    const p=H.p(.87,j,.34);oval(H,R,p[0],p[1]-14,7,8,'paper',1);
    shape(H,R,[H.p(.5,j,.33),H.p(1.23,j,.33),H.p(1.23,j,.81),H.p(.5,j,.81)],j<1.5?'coral':'teal',.4,.55);
    H.line(R,[H.p(.5,j,.65),H.p(1.23,j,.65)],'sun',1.3);
  }
  for(let n=0;n<5;n++){
    const j=3.04+n*.33;box(H,R,.43,j,.81,.28,.36,.52,['sun','coral','teal','paper','teal'][n],.5);
    shape(H,R,H.faceJ(1.25,j+.065,.14,.5,.64),'paper',1,.4);H.dot(...H.p(1.26,j+.135,.55),.8,'blue');
  }
  for(const [j,c]of[[.64,'coral'],[1.32,'teal'],[2.05,'paper'],[6.4,'sun']]){
    drape(H,R,.56,j,.74,.48,1.25,.13,c);drape(H,R,.58,j+.025,.68,.44,1.42,.11,c);
    H.line(R,[H.p(1.25,j+.06,1.51),H.p(1.25,j+.4,1.51)],'paper',1);
  }
  for(const j of [5.55,6.4,7.15]){const p=H.p(1.2,j,2.66);H.outline(R,ell(...p,9,12),'sun',2);H.line(R,[[p[0]-1,p[1]-12],[p[0]+4,p[1]-15]],'blue',1.8);}
  for(let n=0;n<9;n++)spool(H,R,1.03,.65+n*.235,2.37,['teal','coral','sun'][n%3],.8);
  for(let n=0;n<4;n++)drape(H,R,.53,3.01+n*.48,.77,.36,1.24+n*.06,.17,['paper','teal','coral','sun'][n]);
  for(let n=0;n<3;n++){shape(H,R,H.faceJ(1.54,5.4+n*.73,.64,.37,1.04),'teal',.42,.65);H.line(R,[H.p(1.57,5.58+n*.73,.7),H.p(1.57,5.82+n*.73,.7)],'sun',2);}
  drape(H,R,.6,5.51,.7,1.45,3.67,1.13,'coral');
  for(let n=0;n<5;n++)H.line(R,[H.p(1.32,5.64+n*.25,2.66),H.p(1.32,5.73+n*.25,3.45)],'paper',.8);
  timber(H,R,.32,3.01,1.12,1.69,2.27,.13,'sun');
  metal(H,R,.55,3.08,.75,1.08,2.41,.08,'teal');
  const mp=H.p(.94,3.48,2.51);
  shape(H,R,[[mp[0]-13,mp[1]],[mp[0]-13,mp[1]-19],[mp[0]+9,mp[1]-19],[mp[0]+13,mp[1]-11],[mp[0]+5,mp[1]-9],[mp[0]+4,mp[1]-14],[mp[0]-7,mp[1]-14],[mp[0]-7,mp[1]]],'teal',.8,.7);
  H.line(R,[[mp[0]+5,mp[1]-9],[mp[0]+5,mp[1]+2]],'blue',.65);oval(H,R,mp[0]-14,mp[1]-13,4,6,'sun',.6);
  spool(H,R,.67,3.58,3.16,'coral',.55);
  H.line(R,[H.p(.67,3.58,3.45),[mp[0]-1,mp[1]-20],[mp[0]+5,mp[1]-9],[mp[0]+5,mp[1]+2]],'coral',.65);
  H.dot(mp[0]-4,mp[1]-16,2,'paper');H.dot(mp[0]-4,mp[1]-16,.7,'blue');
  drape(H,R,.61,3.92,.68,.69,2.51,.63,'paper');
  H.line(R,[H.p(.7,4.58,1.9),H.p(.97,4.61,1.88),H.p(1.14,4.55,2.09)],'teal',1.2);
  stroke(H,R,[H.p(1.25,3.2,2.47),H.p(1.47,3.45,1.56),H.p(1.55,4.1,.17)],'blue',1.1);
  metal(H,R,1.35,3.84,.44,.71,.055,.12,'blue');
  for(let n=0;n<4;n++)H.line(R,[H.p(1.4,3.93+n*.12,.18),H.p(1.71,3.93+n*.12,.18)],'paper',.6);
  taskLight(H,R,.53,4.42,2.42,'coral',.31);
  drape(H,R,.55,.63,.66,1.49,3.71,.22,'paper');
  for(let n=0;n<4;n++)shape(H,R,H.tile(.62,.69+n*.3,.5,.21,3.72),['coral','sun','teal','sun'][n],.5,.4);
  const doll=H.p(1.02,4.39,3.72);oval(H,R,doll[0],doll[1]-18,4,4.5,'paper',1);shape(H,R,[[doll[0]-3,doll[1]-14],[doll[0]+3,doll[1]-14],[doll[0]+7,doll[1]-1],[doll[0]-7,doll[1]-1]],'coral',.7,.7);H.line(R,[[doll[0]-3,doll[1]-4],[doll[0]+5,doll[1]-4]],'paper',1);
  wallRack(H,R,'ne',3.3,4.4,3.18,.56,1,'sun',(P,z)=>{for(let n=0;n<3;n++)shape(H,R,[P(.25+n*1.3,z+.06),P(1.1+n*1.3,z+.06),P(1.1+n*1.3,z+.37),P(.25+n*1.3,z+.37)],['paper','coral','teal'][n],.6,.5);});
  hangingRail(H,R,'nw',8.04,3.45,3.15,3,(P,u,n)=>{
    if(n===0){shape(H,R,[P(u-.38,-.12),P(u+.35,-.12),P(u+.48,-1.2),P(u-.43,-1.14)],'coral',.52,.7);shape(H,R,[P(u-.24,-.69),P(u+.25,-.69),P(u+.24,-.98),P(u-.24,-.98)],'teal',.55,.6);H.line(R,[P(u-.32,-.3),P(u+.28,-.96)],'paper',.8);}
    if(n===1){const p=P(u,-.56);H.outline(R,ell(...p,12,16),'sun',2.4);H.outline(R,ell(...p,9.5,13),'coral',.7);}
    if(n===2){shape(H,R,[P(u-.38,-.12),P(u+.43,-.12),P(u+.38,-1.06),P(u-.34,-1.12)],'paper',1,.7);for(let k=0;k<3;k++)shape(H,R,[P(u-.26,-.24-k*.26),P(u+.23,-.24-k*.26),P(u+.23,-.43-k*.26),P(u-.26,-.43-k*.26)],['sun','coral','teal'][k],.45,.55);}
  });
  timber(H,R,.35,8.28,1.32,2.3,.82,.13,'teal');
  for(const j of [8.38,10.31])for(const i of [.43,1.44])timber(H,R,i,j,.14,.14,.03,.8,'sun');
  drape(H,R,.43,8.4,1.08,.92,.98,.34,'paper');
  const iron=H.p(.98,8.93,1.01);shape(H,R,[[iron[0]-11,iron[1]+2],[iron[0]+11,iron[1]+2],[iron[0]+7,iron[1]-11],[iron[0]-2,iron[1]-13]],'teal',.6,.85);stroke(H,R,[[iron[0]-7,iron[1]-5],[iron[0]-6,iron[1]-17],[iron[0]+5,iron[1]-16],[iron[0]+6,iron[1]-9]],'blue',2);
  stroke(H,R,[[iron[0]+8,iron[1]-4],H.p(.65,9.62,1),H.p(.43,10.35,.14),H.p(.23,10.81,.72)],'blue',.9);
  shape(H,R,H.faceJ(.2,10.65,.32,.6,.88),'paper',1,.55);for(const j of [10.74,10.86])H.dot(...H.p(.21,j,.74),.7,'blue');
  drape(H,R,.5,9.6,.91,.66,.97,.1,'coral');
  floorShadow(H,2.75,3.07,6.3,3.72,.21);
  for(const i of [3.15,8.1]){
    bentTube(H,R,[[i,3.33,.06],[i+.18,5.95,1.05]],4,'sun');
    bentTube(H,R,[[i+.18,5.95,.06],[i,3.33,1.05]],4,'sun');
    H.dot(...H.p(i+.09,4.63,.57),2.2,'blue');
    bentTube(H,R,[[i,3.6,.4],[i+.13,5.61,.41]],2,'blue');
  }
  for(const j of [3.18,5.95])timber(H,R,2.95,j,5.62,.17,1.05,.11,'sun');
  for(const i of [2.95,8.38])timber(H,R,i,3.21,.17,2.91,1.05,.11,'sun');
  for(const i of [3.03,8.43]){
    const p=H.p(i,3.27,1.19);oval(H,R,...p,7,6,'teal',.62);oval(H,R,...p,3.5,3,'sun',.75);
    for(let n=0;n<10;n++){const a=n*Math.PI/5;H.line(R,[[p[0]+Math.cos(a)*4,p[1]+Math.sin(a)*3.5],[p[0]+Math.cos(a)*7.7,p[1]+Math.sin(a)*6.5]],'blue',.9);}
    H.line(R,[[p[0],p[1]],[p[0]+8,p[1]-7],[p[0]+12,p[1]-4]],'blue',2);
    bentTube(H,R,[[i,3.65,.44],[i,3.65,.93],[i+.2,3.65,1.14]],2,'teal');
  }
  timber(H,R,3.19,3.78,4.98,.15,.4,.1,'sun');
  drape(H,R,3.57,3.55,1.03,1.14,.54,.25,'coral');
  cushion(H,R,3.08,5.95,5.31,.19,1.17,.03,'paper');
  for(const i of [3.12,7.65]) {caneChair(H,R,i,6.34,'teal');cushion(H,R,i+.03,6.37,.84,.76,.69,.13,'sun');}
  const hoop=H.p(8.43,3.8,1.18);oval(H,R,...hoop,13,7,'paper',1);H.outline(R,ell(...hoop,11,5),'coral',1.5);H.line(R,[[hoop[0]+9,hoop[1]-4],[hoop[0]+15,hoop[1]-8]],'sun',2);
  timber(H,R,9.45,4.9,1.84,1.2,.77,.13,'teal');for(const i of [9.57,11.01])for(const j of [5.04,5.91])timber(H,R,i,j,.12,.12,.04,.75,'sun');
  metal(H,R,9.6,5.07,1.45,.85,.92,.04,'sun');
  vessel(H,R,10.45,5.35,.98,6,15,'paper',false);for(const i of [9.86,10.64])vessel(H,R,i,5.73,.98,3.7,7,'teal');
  bentTube(H,R,[[11.3,7.2,.06],[11.3,7.12,1.51],[11.13,7.08,1.58],[10.97,7.08,1.49]],2.5,'sun');
  caneChair(H,R,10.16,8.26,'coral');
  for(let n=0;n<3;n++)cushion(H,R,9.87,2.17,1.1,.83,.15+n*.17,.13,['paper','coral','teal'][n]);
  vessel(H,R,3.14,8.8,.02,17,17,'sun');
  for(const [di,dj,c]of[[0,0,'coral'],[.31,.04,'paper'],[-.26,.06,'teal']])cushion(H,R,2.89+di,8.47+dj,.61,.43,.48,.17,c);
  for(const i of [5.22,7.2])for(const j of [8.91,10.08])caster(H,R,i,j);
  timber(H,R,5.19,8.82,2.25,1.42,.26,.12,'sun');
  for(const i of [5.22,7.2])for(const j of [8.91,10.08])timber(H,R,i,j,.1,.1,.12,.27,'teal');
  for(const j of [8.82,10.12])timber(H,R,5.19,j,2.25,.12,.38,.13,'teal');
  for(const i of [5.19,7.31])timber(H,R,i,8.84,.12,1.35,.38,.13,'teal');
  bentTube(H,R,[[5.19,8.95,.46],[5.05,8.95,.93],[5.05,9.91,.93],[5.19,9.91,.46]],2,'teal');
  drape(H,R,5.36,9.03,1.1,.69,.4,.08,'teal');drape(H,R,5.52,9.14,.76,.43,.44,.07,'paper');
  const ep=H.p(7,9.23,.46);shape(H,R,[[ep[0]-8,ep[1]],[ep[0]-4,ep[1]+4],[ep[0]+7,ep[1]+3],[ep[0]+9,ep[1]-1]],'coral',.55,.5);oval(H,R,ep[0],ep[1]-2,6,4,'sun',.65);
  for(const i of [6.75,7.12]){const p=H.p(i,9.87,.4);oval(H,R,...p,2.2,1.4,'paper',1);H.dot(p[0],p[1],.6,'blue');}
  spool(H,R,6.54,8.97,.42,'coral');
  const scissors=H.p(6.77,9.51,.44);for(const dx of [-3,3])H.outline(R,ell(scissors[0]+dx,scissors[1]+4,2.4,2),'blue',1);H.line(R,[[scissors[0]-3,scissors[1]+3],[scissors[0]+4,scissors[1]-7]],'sun',1.4);H.line(R,[[scissors[0]+3,scissors[1]+3],[scissors[0]-5,scissors[1]-7]],'sun',1.4);
  const measure=H.p(5.89,9.77,.46);stroke(H,R,[[measure[0]-11,measure[1]-2],[measure[0]-4,measure[1]+3],[measure[0]+7,measure[1]],[measure[0]+14,measure[1]+3]],'sun',3);for(let n=0;n<7;n++)H.line(R,[[measure[0]-10+n*3.5,measure[1]],[measure[0]-9+n*3.5,measure[1]+2]],'blue',.55);
  box(H,R,1.86,8.73,.75,.27,.13,.63,'teal',.45);bentTube(H,R,[[1.91,8.8,.76],[2.02,8.81,1.01],[2.48,8.82,1.01],[2.55,8.84,.76]],1.5,'coral');
  shape(H,R,H.faceI(2.02,9.03,.28,.27,.47),'paper',.9,.5);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,lift=.5*ease(3.2,6.4,t)*(1-ease(9.6,12.5,t));
  quilt(H,R,lift);
  const contact=ease(0,2.3,t)*(1-ease(12.6,14,t));
  const left=H.p(3.61,5.99,1.17+lift),right=H.p(8.08,5.99,1.17+lift);
  const settle=(p,i,j)=>{const a=H.p(i,j,.98);return[mix(a[0],p[0],contact),mix(a[1],p[1],contact)];};
  neighbour(H,R,'amsterdamSewingLeft',3.57,6.71,settle(left,3.6,6.74),'coral',8+ease(6.6,7.5,t)*6*(1-ease(8.3,9.4,t)));
  neighbour(H,R,'amsterdamSewingRight',8.08,6.69,settle(right,8.13,6.73),'teal',13);
  for(const i of [3.2,8.1]){const p=H.p(i,6.02,1.18);H.line(R,[[p[0]-3,p[1]], [p[0]+3,p[1]-contact*4]],'blue',2);}
  const p=H.p(1.3,6.41,2.61),sway=Math.sin(t/duration*Math.PI*2)*1.1;
  H.line(R,[[p[0]-5,p[1]],[p[0]+sway,p[1]+2],[p[0]+6,p[1]]],'paper',1.2);
});
room.loopSeconds=duration;
room.stillTime=8;
export default room;
