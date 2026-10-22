// Cube Dash engine: pure physics, shared by the game and the node verifier bot.
const E=(()=>{
const T=40,GY=420,W=960,H=540;
const SPEEDS=[5,6.3,7.8,9.4];
const K={cube:{G:.82,JV:14.3,MJV:11.5,MAXF:18},ship:{UP:.85,G:.72,MAX:7.5},ball:{G:.78,MAX:12},ufo:{G:.62,MAX:9,FLAP:9.6,MFLAP:8},robot:{G:.95,JV:9.6,HOLD:13},spider:{G:.95,MAXF:18},wave:{},swing:{G:.5,MAX:7.5}};
function newPlayer(lv){return{x:lv.startX||0,y:GY-T,vy:0,mode:lv.startMode||'cube',g:1,mini:false,spd:lv.spd,onG:true,held:false,prevHeld:false,buf:0,jt:99,rot:0,orb:-1,dead:false,won:false,f:0,sz:T}}
function clone(p){return Object.assign({},p)}
function boundAt(lv,x){for(const b of lv.bounds)if(x>=b.x0&&x<b.x1)return b;return null}
// first obstacle index with o.x >= x-80 (binary search)
function idxFrom(lv,x){let lo=0,hi=lv.obs.length;while(lo<hi){const m=(lo+hi)>>1;if(lv.obs[m].x<x)lo=m+1;else hi=m}return lo}
function hitBox(p){const s=p.sz;if(p.mode=='wave'){const c=s*.3;return[p.x+s/2-c,p.y+s/2-c,p.x+s/2+c,p.y+s/2+c]}const i=p.mini?3:5;return[p.x+i,p.y+i,p.x+s-i,p.y+s-i]}
function ov(a,b){return a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1]}
function obBox(o){if(o.t=='s')return[o.x+15,o.y+22,o.x+25,o.y+T];if(o.t=='sd')return[o.x+13,o.y,o.x+27,o.y+T-14];if(o.t=='ss')return[o.x+12,o.y+24,o.x+28,o.y+T];return[o.x,o.y,o.x+(o.w||T),o.y+(o.h||T)]}
function mvY(o,f){return o.mv.a*Math.sin(f*o.mv.w+o.mv.ph)}
function setSize(p,mini){if(p.mini==mini)return;const c=p.y+p.sz/2;p.mini=mini;p.sz=mini?24:T;p.y=c-p.sz/2}
// step: mutates p, returns array of events (strings) or null
function step(p,lv,held,ev){if(p.dead||p.won)return;p.f++;const pressed=held&&!p.prevHeld;p.prevHeld=held;p.held=held;if(pressed)p.buf=7;else if(p.buf>0)p.buf--;
 const s=p.sz,ox=p.x,oy=p.y,g=p.g,m=p.mode,mini=p.mini;p.x+=p.spd;
 const b=boundAt(lv,p.x+s/2);const top=b?b.top:-1e9;
 // --- mode physics ---
 if(p.dash>0&&held){p.vy=0;p.dash--}
 else if((p.dash=0)||m=='cube'){p.vy+=K.cube.G*g;if(p.vy*g>K.cube.MAXF)p.vy=K.cube.MAXF*g}
 else if(m=='ship'){p.vy+=(held?-K.ship.UP:K.ship.G)*g*(mini?1.15:1);const mx=K.ship.MAX;p.vy=Math.max(-mx,Math.min(mx,p.vy))}
 else if(m=='ball'){p.vy+=K.ball.G*g;p.vy=Math.max(-K.ball.MAX,Math.min(K.ball.MAX,p.vy))}
 else if(m=='ufo'){if(p.buf>0&&p.buf==7){p.vy=-(mini?K.ufo.MFLAP:K.ufo.FLAP)*g;p.buf=0}else{p.vy+=K.ufo.G*g;if(p.vy*g>K.ufo.MAX)p.vy=K.ufo.MAX*g}}
 else if(m=='swing'){if(pressed)p.g=-p.g;p.vy+=K.swing.G*p.g*(mini?1.15:1);p.vy=Math.max(-K.swing.MAX,Math.min(K.swing.MAX,p.vy))}
 else if(m=='wave'){p.vy=(held?-1:1)*g*p.spd*(mini?2:1)}
 else if(m=='robot'){if(held&&p.jt<K.robot.HOLD&&p.vy*g<0){p.vy=-K.robot.JV*g;p.jt++}else{if(!held)p.jt=99;p.vy+=K.robot.G*g;if(p.vy*g>18)p.vy=18*g}}
 else if(m=='spider'){p.vy+=K.spider.G*g;if(p.vy*g>18)p.vy=18*g}
 p.y+=p.vy;const wasG=p.onG;p.onG=false;
 // --- bounds ---
 if(p.y+s>GY){p.y=GY-s;if(p.vy>0)p.vy=0;if(g==1)p.onG=true}
 if(p.y<top){p.y=top;if(p.vy<0)p.vy=0;if(g==-1)p.onG=true}
 if(p.y<-300){p.dead=true;return}
 // --- obstacles ---
 let hb=hitBox(p);const i0=idxFrom(lv,p.x-90);
 for(let i=i0;i<lv.obs.length;i++){const o=lv.obs[i];if(o.x>p.x+s+10)break;
  const t=o.t;
  if(o.mv){const dy=mvY(o,p.f);if(t=='saw'){const cy=o.cy+dy,qx=Math.max(hb[0],Math.min(o.cx,hb[2])),qy=Math.max(hb[1],Math.min(cy,hb[3]));if((qx-o.cx)**2+(qy-cy)**2<(o.r*.82)**2){p.dead=true;return}continue}
   if(t=='b'){if(ov(hb,[o.x+3,o.y+dy+3,o.x+(o.w||T)-3,o.y+dy+(o.h||T)-3])){p.dead=true;return}continue}}
  if(t=='b'){const bb=[o.x,o.y,o.x+(o.w||T),o.y+(o.h||T)];const pb=[p.x+1,p.y,p.x+s-1,p.y+s];if(!ov(pb,bb))continue;
   if(m=='wave'){if(ov(hb,bb)){p.dead=true;return}continue}
   const solid=m!='ship';// ship: slide on top/bottom faces too
   if(g==1&&oy+s<=bb[1]+20&&p.vy>=-3){p.y=bb[1]-s;p.vy=0;p.onG=true}
   else if(g==-1&&oy>=bb[3]-20&&p.vy<=3){p.y=bb[3];p.vy=0;p.onG=true}
   else if((m=='ship'||m=='ufo'||m=='ball'||m=='spider'||m=='swing')&&g==1&&oy>=bb[3]-11&&p.vy<=0){p.y=bb[3];p.vy=0}
   else if((m=='ship'||m=='ufo'||m=='ball'||m=='spider'||m=='swing')&&g==-1&&oy+s<=bb[1]+11&&p.vy>=0){p.y=bb[1]-s;p.vy=0}
   else if(m=='ship'&&g==1&&oy+s<=bb[1]+11){p.y=bb[1]-s;p.vy=0}
   else{p.dead=true;return}
   hb=hitBox(p);continue}
  if(t=='saw'){const qx=Math.max(hb[0],Math.min(o.cx,hb[2])),qy=Math.max(hb[1],Math.min(o.cy,hb[3]));if((qx-o.cx)**2+(qy-o.cy)**2<(o.r*.82)**2){p.dead=true;return}continue}
  if(t=='s'||t=='sd'||t=='ss'){if(ov(hb,obBox(o))){p.dead=true;return}continue}
  if(t=='p'||t=='pg'){if(p.x+s>o.x+4&&Math.min(ox,p.x)<o.x+T-4&&((o.up!==false&&p.y+s>=o.y+T-14&&p.y<o.y+T)||(o.up===false&&p.y<=o.y+14&&p.y+s>o.y))&&p.lastPad!==i){p.lastPad=i;if(t=='pg'){p.g=-p.g;p.vy=p.g*-9}else p.vy=-(m=='ship'?8:m=='ball'||m=='spider'?14:m=='cube'?18.1:19.5)*p.g;p.onG=false;p.padF=p.f;ev&&ev.push(['pad',o])}continue}
  if(t=='od'){const cx=o.x+T/2,cy=o.y+T/2,px=p.x+s/2,py=p.y+s/2;if(Math.abs(cx-px)<34&&Math.abs(cy-py)<34&&p.buf>0&&p.orb!==i){p.orb=i;p.buf=0;p.dash=o.n||45;p.vy=0;p.y=cy-s/2;p.onG=false;ev&&ev.push(['orb',o])}continue}
  if(t=='o'||t=='og'){const cx=o.x+T/2,cy=o.y+T/2,px=p.x+s/2,py=p.y+s/2;if(Math.abs(cx-px)<34&&Math.abs(cy-py)<34&&p.buf>0&&p.orb!==i){p.orb=i;p.buf=0;if(t=='og'){p.g=-p.g;p.vy=p.g*7}else{const jv=m=='ship'?8:m=='ufo'?11:m=='robot'?13:m=='ball'?12:mini?K.cube.MJV:K.cube.JV;p.vy=-jv*p.g;if(m=='robot')p.jt=99}p.onG=false;ev&&ev.push(['orb',o])}continue}
  if(t=='portal'){const tx=o.x+T/2;if(ox+s/2<tx&&p.x+s/2>=tx){const k=o.k;
    if(k=='gup'){p.g=-1;p.vy*=.5}else if(k=='gdown'){p.g=1;p.vy*=.5}else if(k=='mini')setSize(p,true);else if(k=='big')setSize(p,false);
    else if(k[0]=='v')p.spd=SPEEDS[+k[1]];else{if(p.mode=='swing'&&k!='swing')p.g=1;p.mode=k;p.jt=99;if(k=='ship'||k=='ufo'||k=='wave'||k=='swing')p.vy*=.4;if(k=='wave')p.vy=0}
    ev&&ev.push(['portal',o])}continue}
  if(t=='coin'){if(ev&&Math.abs(o.x+T/2-(p.x+s/2))<30&&Math.abs(o.y+T/2-(p.y+s/2))<30)ev.push(['coin',o]);continue}
 }
 // --- grounded actions ---
 if(p.onG&&p.padF===p.f)p.onG=false;
 if(p.onG){if(m=='cube'){if(held){p.vy=-(mini?K.cube.MJV:K.cube.JV)*p.g;p.onG=false}}
  else if(m=='robot'){if(held&&(pressed||p.buf>0||true)){p.vy=-K.robot.JV*p.g;p.jt=0;p.onG=false;p.buf=0}}
  else if(m=='ball'){if(p.buf>0){p.buf=0;p.g=-p.g;p.vy=p.g*2;p.onG=false}}
  else if(m=='spider'){if(p.buf>0){p.buf=0;spiderTP(p,lv,top);}}}
 if(p.x>=lv.end)p.won=true}
function spiderTP(p,lv,top){const s=p.sz,g=p.g;let target=g==1?top:GY-s;// default: opposite bound
 const i0=idxFrom(lv,p.x-90);for(let i=i0;i<lv.obs.length;i++){const o=lv.obs[i];if(o.x>p.x+s)break;if(o.t!='b')continue;const w=o.w||T,h=o.h||T;if(o.x+w<=p.x+2||o.x>=p.x+s-2)continue;
  if(g==1&&o.y+h<=p.y&&o.y+h>target)target=o.y+h;if(g==-1&&o.y>=p.y+s&&o.y-s<target)target=o.y-s}
 if(g==1&&target<-200)return;p.y=target;p.g=-g;p.vy=0;p.onG=true;p.tp=1}
return{mvY,T,GY,W,H,SPEEDS,K,newPlayer,clone,step,boundAt,idxFrom,obBox,hitBox}})();
if(typeof module!='undefined')module.exports=E;
