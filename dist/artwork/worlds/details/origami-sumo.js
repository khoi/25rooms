import { slab, backWalls } from '../../drawings.js';
import { actor, arcPts, box, cycle, ell, lantern, oval, shape, stroke, table, wallPt, wallRect } from '../common.js';

const palette = ['coral', 'teal', 'sun', 'paper'];
const line = (H, R, points, width = .7, ink = 'blue') => H.line(R, points, ink, width, { tone: .8, amp: .1 });

function sheet(H, R, i, j, z, ink = 'paper', size = .55, folded = false) {
  const points = H.tile(i, j, size, size, z);
  shape(H, R, points, ink, ink === 'paper' ? 1 : .65, .55);
  line(H, R, [points[0], points[2]], .45);
  line(H, R, [points[1], points[3]], .45);
  if (folded) shape(H, R, [points[0], points[1], H.p(i + size * .5, j + size * .5, z + .28)], ink, .9, .65);
}

function fan(H, R, x, y, ink, size = 1, tilt = 0) {
  const points = arcPts(x, y, 14 * size, 14 * size, Math.PI + .15 + tilt, Math.PI * 2 - .15 + tilt, 10);
  shape(H, R, [[x, y + 3 * size], ...points], ink, .85, .65);
  for (let k = 0; k < points.length; k += 2) line(H, R, [[x, y + 3 * size], points[k]], .45);
  line(H, R, [[x, y + 2 * size], [x - Math.sin(tilt) * 5, y + 10 * size]], 1.2);
  H.dot(x, y - 5 * size, 2 * size, 'paper', 1);
}

function wrestler(H, R, x, y, ink, size = 1, lean = 0, arms = 0) {
  const p = (a, b) => [x + (a + lean * -b / 58) * size, y + b * size];
  const poly = (pts, color = ink, tone = .78) => shape(H, R, pts.map(([a, b]) => p(a, b)), color, tone, .8);
  H.tint(ell(x + 3, y + 3, 26 * size, 7 * size), 'blue', .16);
  poly([[-24, -7], [-11, -35], [1, -40], [13, -34], [25, -7], [12, 0], [-12, 0]]);
  poly([[-13, -33], [-14, -53], [5, -60], [15, -46], [12, -33], [0, -29]], 'paper', 1);
  poly([[-14, -53], [5, -60], [-1, -48]], ink, .6);
  poly([[5, -60], [15, -46], [-1, -48]], 'paper', .9);
  poly([[-14, -22], [-33, -33 - arms], [-38, -24 - arms], [-21, -12]], ink, .62);
  poly([[15, -24], [31, -35 - arms], [38, -25 - arms], [23, -12]], ink, .9);
  poly([[-21, -14], [0, -20], [21, -14], [20, -8], [0, -12], [-20, -7]], 'blue', .78);
  poly([[-24, -7], [-12, 0], [-4, -9]], ink, .55);
  poly([[25, -7], [12, 0], [5, -10]], ink, .95);
  for (const pts of [[[-11,-35],[0,-20],[13,-34]], [[-21,-14],[-11,-35]], [[21,-14],[13,-34]], [[0,-12],[-12,0]], [[0,-12],[12,0]], [[-33,-33-arms],[-21,-12]], [[31,-35-arms],[23,-12]], [[-1,-48],[0,-29]], [[-14,-53],[-1,-48],[15,-46]]]) line(H, R, pts.map(([a,b]) => p(a,b)), .7);
  for (const a of [-4, 6]) H.dot(...p(a, -41), 1.1 * size, 'blue', 1);
  line(H, R, [p(-1, -35), p(4, -35)], .65);
  for (const a of [-8, -4, 0, 4, 8]) line(H, R, [p(a, -11), p(a + 1, -5)], .8, 'paper');
}

function cup(H, R, i, j, z, ink = 'paper', scale = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x-5*scale,y-8*scale],[x+5*scale,y-8*scale],[x+4*scale,y],[x-4*scale,y]], ink, .9, .55);
  oval(H, R, x, y-8*scale, 5*scale, 2*scale, 'sun', .65);
}

function crumple(H, R, i, j, z, ink = 'paper', size = 6) {
  const [x,y] = H.p(i,j,z);
  const pts = [[-1,-7],[5,-5],[7,0],[3,5],[-4,5],[-7,0],[-5,-5]].map(([a,b])=>[x+a*size/7,y+b*size/7]);
  shape(H,R,pts,ink,.9,.6);
  line(H,R,[pts[0],pts[3],pts[5],pts[1],pts[4]],.5);
}

function mat(H, R, i, j, w, d, ink = 'teal') {
  shape(H, R, H.tile(i,j,w,d,.04), ink, .24, .7);
  for (let n=.15;n<d;n+=.13) line(H,R,[H.p(i+.06,j+n,.05),H.p(i+w-.06,j+n,.05)],.35,ink);
  for (const x of [i+.07,i+w-.07]) line(H,R,[H.p(x,j,.06),H.p(x,j+d,.06)],1.8,ink);
}

function banner(H, R, side, pos, ink, word) {
  const points = wallRect(H,side,pos,pos+.7,.55,2.58,.03);
  shape(H,R,points,'paper',1,.75);
  shape(H,R,wallRect(H,side,pos+.08,pos+.62,1.75,2.45,.04),ink,.78,.6);
  const [x,y]=wallPt(H,side,pos+.35,1.17,.05);

  const [cx,cy]=wallPt(H,side,pos+.35,2.1,.05);
  fan(H,R,cx,cy+5,ink,.65);
  line(H,R,[wallPt(H,side,pos-.06,2.63,.04),wallPt(H,side,pos+.76,2.63,.04)],1.8);
  for(const p of [pos+.12,pos+.58]) line(H,R,[wallPt(H,side,p,.55,.04),wallPt(H,side,p,.35,.04)],.75,'coral');
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      slab(H,R,this,{ink:'sun',tone:.18});
      for(let j=0;j<12;j+=.6) line(H,R,[H.p(0,j,.01),H.p(12,j,.01)],.5,'coral');
      for(let i=.5;i<12;i+=2) for(let j=(i%2)*.3;j<12;j+=1.2) line(H,R,[H.p(i,j,.01),H.p(i,j+.6,.01)],.4);
      backWalls(H,R,this,2.8,{ink:'teal',tone:.23});
      for (const side of ['ne', 'nw']) {
        for (const u of [.1, 3.9, 7.7, 11.65]) {
          const i = side === 'ne' ? u : .07, j = side === 'ne' ? .07 : u;
          box(H, R, i, j, .19, .19, 0, 2.78, 'coral', .6);
        }
        shape(H, R, wallRect(H, side, .1, 11.8, .12, .65, -.07), 'sun', .65);
        shape(H, R, wallRect(H, side, .1, 11.8, 2.58, 2.77, -.08), 'sun', .8);
        for (let u = .4; u < 11.8; u += .65) line(H, R, [wallPt(H, side, u, .2, -.1), wallPt(H, side, u, .57, -.1)], .7);
      }
      for(const [side,positions] of [['nw',[1.1,3.2,5.3,9.9]],['ne',[2,4.2,10.3]]]) for(let n=0;n<positions.length;n++) banner(H,R,side,positions[n],palette[n%3],['FOLD','PRESS','BOW','GO!'][n%4]);

      const board = H.p(8.65,.15,1.88);
      shape(H,R,[[board[0]-49,board[1]-23],[board[0]+49,board[1]-23],[board[0]+49,board[1]+25],[board[0]-49,board[1]+25]],'blue',.82,.9);

      for(const [dx,ink,number] of [[-23,'coral','02'],[23,'teal','01']]) {
        shape(H,R,[[board[0]+dx-16,board[1]-6],[board[0]+dx+16,board[1]-6],[board[0]+dx+16,board[1]+18],[board[0]+dx-16,board[1]+18]],ink,.8,.6);
      }
      for (const [j, ink] of [[3.48, 'teal'], [5.58, 'coral'], [10.18, 'sun']]) {
        const [x, y] = wallPt(H, 'nw', j, 1.8, -.06);
        shape(H, R, [[x - 10, y - 8], [x, y - 20], [x + 10, y - 8], [x + 5, y + 12], [x - 6, y + 12]], ink, .8);
        line(H, R, [[x, y - 20], [x, y + 2], [x - 10, y - 8], [x + 5, y + 12]], .7);
      }
      for(const [i,j,ink] of [[.45,4.6,'coral'],[11.4,.5,'sun']]) lantern(H,R,i,j,2.45,ink);
      mat(H,R,.5,.65,3.25,2.05);
      table(H,R,.75,.95,2.65,1.25,.85,'paper');
      for (const z of [.18, .45]) {
        box(H, R, .82, 1, 2.48, 1.12, z, .07, 'sun', .65);
        for (let k = 0; k < 4; k++) sheet(H, R, .95 + k * .57, 1.27, z + .09, palette[k], .46);
      }
      for (const i of [.86, 3.19]) line(H, R, [H.p(i, 1.02, .18), H.p(i, 2.02, .76)], 1.3);
      box(H, R, .77, .94, 2.6, .11, .99, .72, 'teal', .7);
      for (let k = 0; k < 4; k++) {
        const [x, y] = H.p(1.1 + k * .57, 1.06, 1.43);
        shape(H, R, [[x - 9, y + 6], [x, y - 9], [x + 9, y + 6], [x, y + 1]], palette[k], .85);
        line(H, R, [[x, y - 9], [x, y + 1], [x - 9, y + 6]], .7);
        H.dot(x, y - 12, 1.8, 'sun');
      }
      for(let k=0;k<4;k++) for(let layer=0;layer<3;layer++) sheet(H,R,.9+k*.58,1.03,.99+layer*.035,palette[k],.46);
      for(let k=0;k<3;k++) sheet(H,R,1.03+k*.75,1.68,1.01,palette[k],.5,k!==0);
      const [rx,ry]=H.p(2.87,1.71,1.04);
      line(H,R,[[rx-11,ry+5],[rx+12,ry-7]],2,'sun');
      for(let k=0;k<6;k++) line(H,R,[[rx-9+k*4,ry+3-k*2],[rx-8+k*4,ry+6-k*2]],.55);

      box(H,R,.45,3.1,.65,1.3,0,.85,'coral',.6);
      for(let k=0;k<4;k++) {
        sheet(H,R,.5,3.18+k*.3,.89,palette[k],.46);
        const [x,y]=H.p(.46,3.25+k*.3,.55);
      }
      table(H,R,.65,5.15,1.85,1.6,.7,'paper');
      sheet(H,R,.8,5.3,.84,'teal',.65,true);
      const [mx,my]=H.p(1.75,5.85,.87);
      shape(H,R,[[mx-16,my-2],[mx-7,my-16],[mx+6,my-11],[mx+14,my+3],[mx+1,my+8]],'coral',.6,.75);
      line(H,R,[[mx-12,my-1],[mx+5,my-10],[mx+1,my+6],[mx-7,my-16]],.7);
      shape(H,R,[[mx-7,my-5],[mx+9,my-1],[mx+7,my+4],[mx-9,my]],'paper',1,.4);
      const [tx,ty]=H.p(2.06,5.36,.85);
      oval(H,R,tx,ty,7,5,'sun',.7);oval(H,R,tx,ty,3,2,'paper',1);
      line(H,R,[[tx+5,ty],[tx+13,ty+3],[tx+17,ty+1]],3,'sun');
      const [sx,sy]=H.p(.99,6.32,.86);
      oval(H,R,sx-4,sy,3,2,'coral',.8);oval(H,R,sx+4,sy,3,2,'coral',.8);
      line(H,R,[[sx-2,sy],[sx+7,sy-11]],.9);line(H,R,[[sx+2,sy],[sx-6,sy-11]],.9);

      box(H,R,.65,7.04,.66,.65,0,.55,'teal',.55);
      for(let k=0;k<6;k++) crumple(H,R,.75+(k%2)*.25,7.15+Math.floor(k/2)*.17,.6,'paper',4);
      crumple(H,R,1.65,7.12,.06,'coral',6);
      crumple(H,R,1.42,7.5,.05,'paper',5);
      mat(H,R,.65,8.12,2.4,2.2,'coral');
      box(H,R,.52,9.75,.5,.6,0,.5,'sun',.5);
      const [bx,by]=H.p(.8,10.01,.54);fan(H,R,bx,by,'coral',.9);
      cup(H,R,2.7,9.87,.05,'teal');
      for (const i of [3.18, 6.25, 9.22]) for (const j of [3.13, 6.03, 8.78]) box(H, R, i, j, .24, .24, .02, .4, 'blue', .8);
      box(H,R,3.15,3.1,6.4,6.0,.35,.13,'coral',.72);
      for (const j of [3.15, 9.02]) {
        line(H, R, [H.p(3.2, j, .16), H.p(9.5, j, .16)], 2, 'sun');
        for (let i = 3.3; i < 9.3; i += 1.2) line(H, R, [H.p(i, j, .17), H.p(i + .8, j, .34)], 1.2);
      }
      for (const j of [3.45, 4.55, 5.65, 6.75, 7.85]) line(H, R, [H.p(3.17, j, .16), H.p(3.17, j + .6, .34)], 1.3, 'sun');
      shape(H,R,H.tile(3.3,3.25,6.1,5.7,.5),'paper',1,.8);
      for(let k=0;k<20;k++) {
        const i=3.26+k*.305;
        shape(H,R,[H.p(i,9.11,.43),H.p(i+.3,9.11,.43),H.p(i+.15,9.11,.1)],k%2?'paper':'coral',.75,.5);
      }
      const ring = radius => Array.from({length:80},(_,k)=>H.p(6.35+Math.cos(k*Math.PI/40)*radius,6.1+Math.sin(k*Math.PI/40)*radius,.53));
      shape(H,R,ring(2.59),'sun',.48,.8);
      H.outline(R,ring(2.39),'paper',6,{tone:1,amp:.08});
      H.outline(R,ring(2.48),'blue',.8,{tone:.75,amp:.05});
      H.outline(R,ring(2.3),'blue',.65,{tone:.65,amp:.05});
      for(let k=0;k<48;k++) {
        const a=k*Math.PI/24;
        line(H,R,[H.p(6.35+Math.cos(a)*2.32,6.1+Math.sin(a)*2.32,.54),H.p(6.35+Math.cos(a+.024)*2.47,6.1+Math.sin(a+.024)*2.47,.54)],.65,'coral');
      }
      for(const i of [5.85,6.75]) line(H,R,[H.p(i,5.7,.55),H.p(i,6.5,.55)],3.2,'paper');
      for(const [i,j] of [[3.38,3.35],[8.67,3.36],[3.39,8.53],[8.72,8.53]]) {
        box(H,R,i,j,.5,.43,.5,.15,'teal',.55);
        const [x,y]=H.p(i+.25,j+.22,.68);
        shape(H,R,[[x-8,y],[x,y-7],[x+8,y]],'paper',1,.55);
        for(let k=0;k<8;k++) H.dot(x+(k%4)*3-5,y-1-Math.floor(k/4)*2,.6,'sun',.7);
      }
      box(H,R,6.05,9.13,1.1,.4,0,.23,'sun',.65);
      box(H,R,6.2,9.18,.8,.55,0,.11,'paper',.9);
      table(H,R,7.0,1.25,3.9,1.05,.83,'teal');
      for(let k=0;k<3;k++) {
        sheet(H,R,7.15+k*1.1,1.5,.98,'paper',.6);
        const [x,y]=H.p(7.53+k*1.1,1.6,1);
        for(let n=0;n<3;n++) line(H,R,[[x-5,y+n*2],[x+5,y+n*2+4]],.5);
        line(H,R,[[x+8,y-3],[x+15,y-8]],1,'coral');
        cup(H,R,7.93+k*1.04,1.77,.99,'paper',.7);
      }
      const [gx,gy]=H.p(10.54,1.44,1.08);
      oval(H,R,gx,gy-7,8,8,'sun',.9);line(H,R,[[gx-8,gy-7],[gx-5,gy+5],[gx+5,gy+5],[gx+8,gy-7]],.8);
      line(H,R,[[gx,gy+2],[gx,gy+12]],2);line(H,R,[[gx-8,gy+12],[gx+8,gy+12]],2);
      box(H,R,10.32,1.24,.45,.45,.96,.1,'coral',.75);
      table(H,R,10.35,4.2,1.1,3.35,.79,'coral');
      for(let k=0;k<3;k++) {
        box(H,R,10.47,4.4+k*.7,.75,.52,.93,.08,'paper',1);
        for(let n=0;n<3;n++) {
          const [x,y]=H.p(10.58+n*.2,4.58+k*.7,1.07);
          shape(H,R,[[x-4,y+2],[x,y-6],[x+4,y+2]],'paper',1,.5);
          shape(H,R,[[x-2,y+2],[x-2,y-1],[x+2,y-1],[x+2,y+2]],'blue',.8,.4);
        }
      }
      for(let k=0;k<4;k++) cup(H,R,10.5+(k%2)*.4,6.7+Math.floor(k/2)*.35,.94,palette[k],.8);
      const [kx,ky]=H.p(11.02,7.28,.95);
      oval(H,R,kx,ky-7,10,9,'teal',.6);oval(H,R,kx,ky-15,5,2,'paper',1);
      stroke(H,R,[[kx+8,ky-9],[kx+15,ky-15],[kx+16,ky-9]],'blue',1.2);
      stroke(H,R,[[kx-8,ky-10],[kx-15,ky-17],[kx-16,ky-9]],'teal',3);

      box(H,R,10.5,7.96,.84,.75,0,.54,'teal',.5);
      for(let k=0;k<5;k++) {
        const [x,y]=H.p(10.58+(k%3)*.22,8.14+Math.floor(k/3)*.23,.57);
        fan(H,R,x,y,palette[k%3],.55);
      }
      for(let k=0;k<7;k++) {
        const i=3.75+k*1.08;
        mat(H,R,i,10.07,.82,1.14,palette[k%3]);
        cup(H,R,i+.85,10.77,.05,palette[(k+1)%3],.75);
        if(k%2===0) sheet(H,R,i+.2,11.28,.05,'paper',.45,true);
      }
      for(const [i,j] of [[4.4,9.7],[8.7,9.69]]) {
        const [x,y]=H.p(i,j,.09);
        shape(H,R,[[x-9,y-3],[x+9,y-3],[x+7,y+5],[x-7,y+5]],'sun',.65,.55);
        for(let k=0;k<3;k++) oval(H,R,x-5+k*5,y-3,3,2,'paper',1);
      }
    },
    live(H, R, t) {
      const collision=Math.sin(cycle(t,7)*Math.PI)**4;
      H.at(2,2.6,0,HH=>actor(HH,R,2,2.6,t,'kneel',{shirt:['coral',.7],apron:['paper',1]},0,1.02));
      H.at(2.55,6.4,0,HH=>actor(HH,R,2.55,6.4,t,'kneel',{shirt:['teal',.7],glasses:true,apron:['paper',1]},0,1.05));
      H.at(1.35,8.9,0,HH=>wrestler(HH,R,...HH.p(1.35,8.9,.05),'sun',.62,Math.sin(t*2)*4,9+Math.sin(t*2)*4));
      H.at(2.7,8.76,0,HH=>actor(HH,R,2.7,8.76,t,'point',{shirt:['coral',.75]},0,1.0));
      for(let k=0;k<3;k++) H.at(7.3+k*1.18,2.63,0,HH=>actor(HH,R,7.3+k*1.18,2.63,t+k,'write',{shirt:[k===1?'blue':'paper',.8],glasses:k===1},0,.94));
      H.at(6.7,3.55,.54,HH=>{
        actor(HH,R,6.7,3.55,t,'point',{shirt:['blue',.83],dress:true},.54,1.07);
        const [x,y]=HH.p(6.7,3.55,1.6);fan(HH,R,x+16,y-6,'sun',.85,Math.sin(t)*.2);
      });
      H.at(5.35+collision*.33,6.7-collision*.3,.55,HH=>wrestler(HH,R,...HH.p(5.35+collision*.33,6.7-collision*.3,.55),'coral',1.11,collision*15,collision*4));
      H.at(7.22-collision*.3,5.33+collision*.3,.55,HH=>wrestler(HH,R,...HH.p(7.22-collision*.3,5.33+collision*.3,.55),'teal',1.11,-collision*15,collision*4));
      H.at(9.57,7.7,0,HH=>{
        actor(HH,R,9.57,7.7,t,'hold',{shirt:['sun',.8]},0,.95);
        const [x,y]=HH.p(9.6,7.7,.72);fan(HH,R,x+3,y,'teal',.65);
      });
      H.at(11.72,5.82,0,HH=>actor(HH,R,11.72,5.82,t,'hold',{shirt:['teal',.65],apron:['paper',1]},0,.97));
      for(let k=0;k<7;k++) H.at(4.14+k*1.08,10.56,0,HH=>{
        const i=4.14+k*1.08,j=10.56;
        actor(HH,R,i,j,t+k*.47,k%3===0?'cheer':k%3===1?'sitfloor':'wave',{shirt:[palette[k%3],.75],face:'nw',hairStyle:k%2?'cap':'short'},0,.88);
        if(k%2===0) {
          const [x,y]=HH.p(i,j,.95);
          fan(HH,R,x-14,y-5-Math.sin(t*3+k)*3,palette[(k+1)%3],.72,Math.sin(t*3+k)*.2);
        }
      });
      const ritual=cycle(t,6);
      H.at(3.35,4.75,.55,HH=>{
        actor(HH,R,3.35,4.75,t,'wave',{shirt:['paper',1],pants:['coral',.8]},.55,.83);
        for(let k=0;k<12;k++) {
          const u=(ritual+k*.052)%1;
          const [x,y]=HH.p(3.65+u*.95,4.9+u*.75,.65+Math.sin(u*Math.PI)*1.28);
          HH.opacity(Math.sin(u*Math.PI),()=>shape(HH,R,[[x+k%3*4,y],[x+4+k%3*4,y-2],[x+5+k%3*4,y+1],[x+1+k%3*4,y+3]],k%3?'paper':'sun',1,.4));
        }
      });
    }
  };
}
