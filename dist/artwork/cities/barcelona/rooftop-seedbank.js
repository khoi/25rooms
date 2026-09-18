import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight, vessel, bentTube } from '../materials.js';
import { masonry } from '../structure.js';
import { specimen } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};

function person(H, R, i, j, hands, ink = 'teal', lean = 0) {
  const [x, y] = H.p(i, j), P = (a, b) => [x + a * 1.1 + lean, y + b * 1.18];
  H.tint(ell(x + 4, y + 2, 17, 5), 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [P(s * 5, -28), P(s * 7, -14), [x + s * 8, y - 2]], 'blue', 7); oval(H, R, x + s * 8 + 2, y - 1, 6, 2.5, 'blue'); }
  shape(H, R, [P(-10, -49), P(9, -49), P(12, -26), P(-10, -26)], ink, .75);
  shape(H, R, [P(-5, -46), P(5, -46), P(7, -26), P(-6, -26)], 'paper', .8, .7);
  for (let n = 0; n < 2; n++) { const a = P(n ? 9 : -9, -46), b = hands[n]; stroke(H, R, [a, [(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 5], b], ink, 6); oval(H, R, ...b, 2.5, 2.2, 'coral', .35); }
  oval(H, R, ...P(0, -60), 9, 11, 'paper', 1);
  shape(H, R, [P(-9, -61), P(-8, -70), P(1, -74), P(9, -69), P(10, -63), P(3, -67), P(-4, -65)], 'blue', .8);
  H.dot(...P(4, -59), 1, 'blue'); stroke(H, R, [P(3, -54), P(6, -53), P(8, -55)], 'blue', .6);
}

function leaf(H,R,a,b,size=9,ink='teal'){
  const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,nx=-dy/l*size*.4,ny=dx/l*size*.4;
  shape(H,R,[a,[(a[0]+b[0])/2+nx,(a[1]+b[1])/2+ny],b,[(a[0]+b[0])/2-nx,(a[1]+b[1])/2-ny]],ink,.65,.55);H.line(R,[a,b],'sun',.65,{tone:.7});
}

function vine(H,R,i,j,z,height,spread=25){
  const [x,y]=H.p(i,j,z),top=y-height;
  stroke(H,R,[[x,y],[x-5,y-height*.35],[x+4,top+height*.32],[x,top]],'teal',1.6);
  for(let n=0;n<6;n++){const yy=y-12-n*height*.14,side=n%2?1:-1,xx=x+Math.sin(n)*4,end=[xx+side*(spread-n*1.8),yy-10];H.line(R,[[xx,yy],end],'teal',1.2);leaf(H,R,[xx+side*5,yy-3],end,12);if(n%3===1){stroke(H,R,[end,[end[0]+4,yy+6],[end[0]+2,yy+18]],'sun',3);H.line(R,[[end[0]+2,yy+2],[end[0]+2,yy+16]],'blue',.6);}}
}

function bed(H,R,i,j,w,d,trellis=false){
  H.tint(H.tile(i+.2,j+.2,w+.1,d+.15,.02),'blue',.16);
  box(H,R,i,j,w,d,.08,.68,'sun',.47);shape(H,R,H.tile(i+.15,j+.15,w-.3,d-.3,.78),'blue',.48,.65);
  for(const x of [i,i+w-.13])timber(H,R,x,j,.13,d,.79,.12,'sun');for(const y of [j,j+d-.13])timber(H,R,i,y,w,.13,.79,.12,'sun');
  for(const x of [i+.06,i+w-.19])for(const y of [j+.05,j+d-.19])metal(H,R,x,y,.13,.13,.04,.91,'teal');
  for(let n=0;n<4;n++)H.line(R,[H.p(i+.08,j+d+.006,.19+n*.13),H.p(i+w-.09,j+d+.006,.19+n*.13)],'coral',.6,{tone:.5});
  if(trellis){
    for(const y of [j+.3,j+d-.3])timber(H,R,i+.35,y,.1,.1,.88,2.06,'teal');
    for(let z=1.2;z<3;z+=.44)H.line(R,[H.p(i+.4,j+.26,z),H.p(i+.4,j+d-.2,z)],'sun',2);
    for(let y=j+.42;y<j+d-.1;y+=.55)H.line(R,[H.p(i+.41,y,1),H.p(i+.41,y,2.96)],'blue',.8);
    for(let n=0;n<4;n++)vine(H,R,i+.65,j+.67+n*(d-.9)/4,.82,50+n%2*11,19);
    for(let n=0;n<5;n++)vine(H,R,i+1.65+(n%2)*.37,j+.62+n*(d-.9)/5,.84,30+n%3*10,23);
  } else for(let n=0;n<5;n++){
    const ci=i+w*.54,cj=j+.46+n*(d-.8)/5;
    if(n%3===1){
      const p=H.p(ci,cj,.84);for(let k=0;k<7;k++){const a=k*Math.PI*2/7;leaf(H,R,p,[p[0]+Math.cos(a)*21,p[1]+Math.sin(a)*10-8],15,k%2?'teal':'sun');}
      oval(H,R,p[0],p[1]-7,5,3,'teal',.7);
    } else if(n===3){
      const p=H.p(ci,cj,.85);for(let k=0;k<4;k++){const top=[p[0]-15+k*9,p[1]-29-k%2*13];H.line(R,[p,top],'sun',1.3);for(let v=0;v<5;v++){const a=v*Math.PI*2/5;H.line(R,[top,[top[0]+Math.cos(a)*7,top[1]+Math.sin(a)*5]],'sun',.8);oval(H,R,top[0]+Math.cos(a)*7,top[1]+Math.sin(a)*5,2,1.4,'coral',.5);}}
    } else vine(H,R,ci,cj,.83,28+n%2*13,20);
  }
  for(let n=0;n<3;n++){
    const jj=j+.53+n*(d-.8)/3;
    H.line(R,[H.p(i+w*.25,jj,.87),H.p(i+w*.75,jj,.87)],'sun',.6,{tone:.6});
    const p=H.p(i+w-.45,jj,.85);shape(H,R,[[p[0]-4,p[1]],[p[0]+4,p[1]],[p[0]+4,p[1]-12],[p[0]-3,p[1]-13]],'paper',1,.6);H.line(R,[[p[0]-2,p[1]-7],[p[0]+2,p[1]-9]],'teal',1.3);
  }
  bentTube(H,R,[[i+w-.24,j+.24,.89],[i+w-.24,j+d-.21,.89],[i+w-.24,j+d+.08,.72],[i+w+.19,j+d+.08,.69]],1.8,'teal');
  for(let n=0;n<4;n++)H.dot(...H.p(i+w-.24,j+.4+n*(d-.8)/4,.9),1.7,'coral');
}

function packet(H,R,i,j,z,ink='paper'){
  shape(H,R,H.tile(i,j,.47,.58,z),ink,ink==='paper'?1:.55,.55);
  H.line(R,[H.p(i,j,z+.01),H.p(i+.235,j+.22,z+.01),H.p(i+.47,j,z+.01)],'blue',.7);H.line(R,[H.p(i+.08,j+.49,z+.01),H.p(i+.38,j+.49,z+.01)],'teal',1);
}

const room=world('barcelona-rooftop-seedbank','Seeds above the block',{floor:'paper',tone:.8,pattern:'tiles',accent:'sun',wall:false,head:35},(H,R)=>{
  masonry(H,R,'nw',0,12,0,.87,'paper',.88);masonry(H,R,'ne',0,12,0,.87,'paper',.88);
  for(const side of ['ne','nw'])H.line(R,[wallPt(H,side,.04,.93,-.12),wallPt(H,side,11.96,.93,-.12)],'sun',4);
  for(let n=0;n<8;n++){
    const i=.3+n*1.44,h=.55+((n*3)%5)*.19;
    shape(H,R,[H.p(i,-.08,.97),H.p(i+1.18,-.08,.97),H.p(i+1.18,-.08,.97+h),H.p(i,-.08,.97+h)],n%3?'teal':'coral',.16,.6);
    for(let k=0;k<3;k++)H.line(R,[H.p(i+.2+k*.33,-.1,1.18),H.p(i+.2+k*.33,-.1,1.38)],'paper',1.4);
  }
  for(const i of [4.9,7.13,9.36,11.59])metal(H,R,i,.45,.08,.1,.89,2.56,'teal');
  for(let n=0;n<3;n++){
    const i=4.97+n*2.23,p=H.faceI(i,.51,2.15,1.04,3.39);shape(H,R,p,'paper',.58,.8);H.tint(p,'teal',.065);
    H.line(R,[H.p(i+.12,.52,1.16),H.p(i+.38,.52,3.18)],'paper',2);
    for(let z=1.22;z<3.3;z+=.19)H.line(R,[H.p(i+.03,.53,z),H.p(i+2.08,.53,z)],'teal',.38,{tone:.28});
    H.line(R,[H.p(i,.5,2.11),H.p(i+2.17,.5,2.11)],'teal',1.4);
  }
  H.line(R,[H.p(4.84,.5,3.49),H.p(11.72,.5,3.49)],'blue',2.6);
  for(let n=0;n<6;n++){const i=5.4+n;shape(H,R,[H.p(i,.56,2.7),H.p(i+.12,.56,2.78),H.p(i+.23,.56,2.7),H.p(i+.13,.56,2.72)],'coral',.5,.5);}
  box(H,R,.1,.1,2.65,1.72,.06,2.87,'teal',.36);
  shape(H,R,H.faceI(.48,1.835,1.87,.18,2.67),'paper',.75,.8);shape(H,R,H.faceI(.69,1.85,1.44,.4,2.38),'teal',.22,.6);H.line(R,[H.p(2.01,1.87,1.3),H.p(2.01,1.87,1.61)],'blue',2.4);
  metal(H,R,.05,.09,2.82,1.86,2.98,.16,'teal');
  for(const i of [.13,2.63])H.line(R,[H.p(i,.12,2.98),H.p(i,1.93,2.98)],'sun',2.2);
  for(const i of [.75,2.01])for(const z of [.66,2.14]){metal(H,R,i,1.86,.15,.06,z,.13,'sun');H.dot(...H.p(i+.08,1.93,z+.06),1.2,'blue');}
  shape(H,R,H.faceI(.97,1.9,.85,1.89,2.28),'paper',1,.6);for(let n=0;n<5;n++)H.line(R,[H.p(1.05,1.92,1.95+n*.06),H.p(1.74,1.92,1.95+n*.06)],'teal',1.4);
  timber(H,R,.56,1.86,1.82,.61,.03,.15,'sun');
  for(let n=0;n<5;n++)H.line(R,[H.p(.68+n*.31,1.94,.19),H.p(.68+n*.31,2.34,.19)],'teal',1.2);
  metal(H,R,.47,1.75,2.02,.81,2.59,.09,'teal');
  for(const i of [.68,2.14])H.line(R,[H.p(i,1.79,2.34),H.p(i,2.39,2.6)],'blue',2);
  vessel(H,R,2.46,2.8,.1,18,47,'teal',false);
  const barrel=H.p(2.46,2.8,.1);for(const dy of [-36,-13]){H.line(R,[[barrel[0]-18,barrel[1]+dy],[barrel[0]+17,barrel[1]+dy]],'paper',1.5);for(const dx of [-12,12])H.dot(barrel[0]+dx,barrel[1]+dy,1.4,'sun');}
  bentTube(H,R,[[2.63,1.77,3.11],[2.66,1.84,2.65],[2.67,2.25,2.65],[2.67,2.45,1.45]],2.7,'teal');
  bentTube(H,R,[[2.52,3.07,.37],[2.92,3.07,.37],[2.92,3.37,.12],[3.68,3.37,.12],[3.68,3.72,.82]],1.8,'teal');
  const valve=H.p(2.78,3.07,.44);H.line(R,[[valve[0]-5,valve[1]],[valve[0]+5,valve[1]]],'coral',2.2);H.dot(...valve,1.5,'sun');
  H.line(R,[H.p(.2,1.97,.06),H.p(2.76,1.97,.06)],'blue',2);
  for(let n=0;n<3;n++){
    const i=5.16+n*2.2;metal(H,R,i,.32,.19,.47,.9,.14,'blue');H.line(R,[H.p(i+.1,.51,1.09),H.p(i+.1,1.31,.91)],'teal',2.3);H.dot(...H.p(i+.1,1.31,.91),1.8,'sun');
  }
  timber(H,R,5.08,1.33,2.6,1.16,.23,.12,'sun');
  for(const i of [5.17,7.48])for(const j of [1.4,2.3])timber(H,R,i,j,.15,.13,.06,.67,'teal');
  for(const j of [1.4,2.29])for(let z=.38;z<.8;z+=.18)timber(H,R,5.17,j,2.48,.12,z,.1,'teal');
  for(let n=0;n<4;n++){
    const p=H.p(5.55+n*.48,1.82,.42);shape(H,R,[[p[0]-8,p[1]],[p[0]+7,p[1]],[p[0]+9,p[1]-13],[p[0]-9,p[1]-13]],n%2?'coral':'paper',.6,.6);oval(H,R,p[0],p[1]-13,9,3,'blue',.55);
    for(let k=0;k<3;k++){H.line(R,[[p[0],p[1]-12],[p[0]-6+k*6,p[1]-24-k%2*7]],'teal',1);leaf(H,R,[p[0]-3+k*3,p[1]-18],[p[0]-10+k*10,p[1]-23-k%2*4],7);}
  }
  const sieve=H.p(6.71,3.12,.12);oval(H,R,...sieve,21,10,'sun',.5);oval(H,R,sieve[0],sieve[1]-2,17,7,'paper',.8);for(let n=0;n<5;n++)H.line(R,[[sieve[0]-13+n*6,sieve[1]-7],[sieve[0]-13+n*6,sieve[1]+4]],'teal',.65);H.line(R,[[sieve[0]+20,sieve[1]],[sieve[0]+32,sieve[1]+3]],'sun',3);
  floorLight(H,5.1,6.1,170,.38);
  bed(H,R,.64,3.8,2.04,4.48,false);
  bed(H,R,3.15,.96,1.24,2.64,false);
  const hp=H.p(10.47,6.77,.54);oval(H,R,...hp,4,5,'coral',.35);for(let n=0;n<5;n++)H.line(R,[[hp[0]-4+n*2,hp[1]-1],[hp[0]-5+n*2,hp[1]-7-(n%3)]],'coral',1.5);
  shape(H,R,H.faceI(9.24,6.77,.78,.19,.52),'teal',.4,.6);H.line(R,[H.p(9.58,6.79,.26),H.p(9.86,6.79,.26)],'paper',1.6);
  timber(H,R,3.79,4.62,3.81,1.9,.26,.08,'sun');
  for(let n=0;n<3;n++){
    const i=3.98+n*1.07;shape(H,R,H.faceI(i,6.55,.9,.36,.79),'paper',.74,.65);H.line(R,[H.p(i+.08,6.56,.43),H.p(i+.83,6.56,.43)],'teal',1.1);H.line(R,[H.p(i+.08,6.56,.72),H.p(i+.83,6.56,.72)],'sun',1.4);
  }
  benchFrame(H,R,3.6,4.4,4.18,3.05,1.16,'sun');
  metal(H,R,3.76,4.71,3.85,2.33,1.17,.08,'teal');shape(H,R,H.tile(3.87,4.84,3.62,2.1,1.26),'paper',1,.7);
  for(const i of [3.92,5.13,6.33])for(let j=5.07;j<6.8;j+=.77){
    timber(H,R,i,j,1.09,.64,1.265,.045,'sun');
    for(let n=0;n<5;n++){const p=H.p(i+.13+n*.18,j+.22+(n%2)*.15,1.33);oval(H,R,...p,n%2?2.5:3.2,n%2?1.7:1.3,i<5?'coral':i<6?'sun':'teal',.65);}
  }
  for(let n=0;n<2;n++) {
    box(H,R,3.84+n*1.72,6.65,1.56,.53,.49,.36,'teal',.48);
    shape(H,R,H.faceI(3.99+n*1.72,7.185,1.25,.59,.77),'paper',.7,.5);
    H.line(R,[H.p(4.39+n*1.72,7.2,.65),H.p(4.77+n*1.72,7.2,.65)],'sun',2.3);
  }
  const clamp=H.p(3.84,6.94,1.31);stroke(H,R,[[clamp[0]-5,clamp[1]-4],[clamp[0]-8,clamp[1]+7],[clamp[0]+6,clamp[1]+7],[clamp[0]+6,clamp[1]-1]],'blue',2);H.line(R,[[clamp[0]+1,clamp[1]+3],[clamp[0]+1,clamp[1]+14]],'sun',1.7);H.line(R,[[clamp[0]-3,clamp[1]+14],[clamp[0]+6,clamp[1]+14]],'teal',1.5);
  for(const i of [3.86,7.38])metal(H,R,i,4.79,.13,.16,1.23,.15,'blue');
  timber(H,R,8.42,8.63,2.93,1.7,.69,.15,'sun');for(const i of [8.6,11.13])for(const j of [8.79,10.05])timber(H,R,i,j,.14,.13,.04,.67,'teal');
  timber(H,R,8.59,8.83,2.5,1.19,.24,.1,'sun');
  for(let n=0;n<2;n++){box(H,R,8.73+n*1.1,8.99,.86,.85,.34,.29,n?'teal':'paper',.55);H.line(R,[H.p(8.99+n*1.1,9.85,.51),H.p(9.27+n*1.1,9.85,.51)],'sun',1.7);}
  for(let n=0;n<3;n++)packet(H,R,8.67+n*.69,8.89,.86,n===1?'coral':'paper');
  shape(H,R,[H.p(10.66,8.88,.86),H.p(10.92,8.88,1.12),H.p(11.19,8.88,.86),H.p(10.92,9.30,.87)],'paper',1,.6);
  const balance=H.p(9.24,9.78,.86);H.line(R,[[balance[0],balance[1]],[balance[0],balance[1]-25]],'blue',2);H.line(R,[[balance[0]-19,balance[1]-21],[balance[0]+19,balance[1]-21]],'sun',2.3);for(const s of [-1,1]){H.line(R,[[balance[0]+s*16,balance[1]-21],[balance[0]+s*16,balance[1]-8]],'blue',.7);oval(H,R,balance[0]+s*16,balance[1]-7,8,3,'teal',.6);}oval(H,R,...balance,10,3,'blue',.5);
  vessel(H,R,10.64,9.8,.86,9,19,'paper',false);
  for(let n=0;n<3;n++){const p=H.p(9.87+n*.19,9.94,.87);stroke(H,R,[[p[0]-8,p[1]+4],[p[0],p[1]-5],[p[0]+8,p[1]-6]],'sun',2.7);}
  vessel(H,R,1.32,10.21,.04,20,29,'coral');
  const pot=H.p(1.32,10.21,.04);H.line(R,[[pot[0]-14,pot[1]-23],[pot[0]-7,pot[1]-13],[pot[0]-12,pot[1]-3]],'blue',1.2);for(let n=0;n<3;n++)H.line(R,[[pot[0]-15+n*2,pot[1]-14+n*2],[pot[0]-5+n*2,pot[1]-18+n*2]],'teal',.8);for(const s of [-1,1])H.dot(pot[0]+s*13,pot[1]-22,2,'blue');
  timber(H,R,.48,8.69,1.22,.68,.08,.08,'sun');
  for(let n=0;n<3;n++){
    const q=H.p(.71+n*.35,9.03,.18);shape(H,R,[[q[0]-5,q[1]+1],[q[0]+5,q[1]+1],[q[0]+7,q[1]-14],[q[0]-7,q[1]-14]],'coral',.5,.6);oval(H,R,q[0],q[1]-14,7,2.7,'blue',.55);for(let k=0;k<2;k++)H.line(R,[[q[0]-4,q[1]-8-k*3],[q[0]+4,q[1]-8-k*3]],'sun',.7);}
  metal(H,R,2.35,9.03,2.54,1.61,.12,.1,'teal');
  for(const j of [9.01,10.61])timber(H,R,2.33,j,2.61,.11,.22,.19,'sun');
  for(const i of [2.32,4.83])timber(H,R,i,9.01,.11,1.72,.22,.19,'sun');
  const gloves=H.p(4.66,10.09,.27);for(const side of [-1,1]){const x=gloves[0]+side*7;shape(H,R,[[x-5,gloves[1]+4],[x+4,gloves[1]+5],[x+6,gloves[1]-3],[x+2,gloves[1]-10],[x-5,gloves[1]-8]],'paper',1,.6);for(let n=0;n<3;n++)H.line(R,[[x-4+n*3,gloves[1]-7],[x-4+n*3,gloves[1]-13]],'teal',1.2);}
  for(let n=0;n<4;n++){H.line(R,[H.p(2.62+n*.52,9.32,.24),H.p(2.83+n*.52,10.18,.24)],'sun',2.8);if(n<2){const p=H.p(2.59+n*.52,9.2,.24);shape(H,R,[[p[0]-4,p[1]-5],[p[0]+5,p[1]-4],[p[0]+6,p[1]+6],[p[0]-4,p[1]+5]],'blue',.55,.6);}}
  timber(H,R,5.76,9.88,1.47,.89,.05,.12,'sun');
  const basket=H.p(6.49,10.32,.19);shape(H,R,[[basket[0]-23,basket[1]-9],[basket[0]+21,basket[1]-9],[basket[0]+17,basket[1]+6],[basket[0]-18,basket[1]+6]],'sun',.55,.8);oval(H,R,basket[0],basket[1]-9,22,8,'paper',1);
  for(let n=0;n<5;n++){const x=basket[0]-16+n*8;stroke(H,R,[[x,basket[1]-10],[x+7,basket[1]-15],[x+11,basket[1]-8]],n%2?'teal':'coral',2.5);H.line(R,[[x,basket[1]-6],[x+1,basket[1]+4]],'blue',.7);}
  stroke(H,R,[[basket[0]-20,basket[1]-8],[basket[0]-13,basket[1]-31],[basket[0]+12,basket[1]-31],[basket[0]+19,basket[1]-8]],'teal',2);
  drape(H,R,3.04,10.79,1.55,.54,.13,.08,'coral');
  vessel(H,R,10.73,10.6,.02,19,28,'teal');oval(H,R,...H.p(10.73,10.6,.92),19,6,'paper',.8);
  bentTube(H,R,[[10.73,10.6,.16],[11.24,10.6,.16],[11.24,9.74,.16],[11.53,9.74,.03]],2,'teal');
  const v=H.p(11.24,10.58,.24);H.line(R,[[v[0]-5,v[1]],[v[0]+5,v[1]]],'coral',2.4);
  H.line(R,[H.p(11.57,.56,3.49),H.p(11.57,.56,3.98)],'blue',1.7);shape(H,R,[H.p(11.08,.56,3.85),H.p(11.57,.56,3.72),H.p(12.02,.56,3.85),H.p(11.57,.56,3.98)],'sun',.65,.7);
},(H,R,t)=>{
  const u=cycle(t,22)*22, lift=ease(4.4,8.8,u)*(1-ease(13.2,20,u)), angle=.78*lift, dep=2.09, z=1.39;
  const P=(i,f)=>H.p(i,4.84+f*dep*Math.cos(angle),z+f*dep*Math.sin(angle));
  const q=P(7.46,.84), hands=[[q[0]-4,q[1]+1],[q[0]+4,q[1]+1]];
  const n=H.p(7.12,.62,1.63);person(H,R,7.0,1.5,[[n[0]-4,n[1]],[n[0]+4,n[1]+2]],'coral');
  bed(H,R,8.34,1.65,2.91,5.1,true);
  const hp=H.p(10.47,6.77,.54);oval(H,R,...hp,4,5,'coral',.35);for(let n=0;n<5;n++)H.line(R,[[hp[0]-4+n*2,hp[1]-1],[hp[0]-5+n*2,hp[1]-7-(n%3)]],'coral',1.5);
  shape(H,R,H.faceI(9.24,6.77,.78,.19,.52),'teal',.4,.6);H.line(R,[H.p(9.58,6.79,.26),H.p(9.86,6.79,.26)],'paper',1.6);
  const mesh=[P(3.85,0),P(7.49,0),P(7.49,1),P(3.85,1)];H.tint(mesh,'paper',.32);H.outline(R,mesh,'sun',3.6,{tone:.85,amp:.1});H.outline(R,mesh,'blue',.7,{tone:.8,amp:.1});
  for(let i=4;i<7.48;i+=.18)H.line(R,[P(i,.03),P(i,.97)],'blue',.45,{tone:.45});
  for(let f=.07;f<.99;f+=.09)H.line(R,[P(3.9,f),P(7.43,f)],'teal',.45,{tone:.55});
  for(const i of [3.91,7.42]){H.line(R,[H.p(i,6.67,1.29),P(i,.68)],'blue',2);H.dot(...P(i,.68),2,'sun');}
  const seed=P(3.99,.91);oval(H,R,...seed,3.1,1.5,'coral',.8);
  person(H,R,7.61,7.27,hands,'teal');
  const l=H.p(9,4.5,2.12), s=Math.sin(t*Math.PI*2/22);leaf(H,R,l,[l[0]+12+s*3,l[1]-7],12);
  const tie=H.p(7.14,.53,3.5);stroke(H,R,[tie,[tie[0]+6,tie[1]+16],[tie[0]+9+s,tie[1]+20]],'coral',1.2);
});
room.loopSeconds=22;
room.stillTime=10.8;
export default room;
