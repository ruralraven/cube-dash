// Cube Dash levels: pattern library + hand-arranged level scripts (beat-synced).
const LV=(()=>{
const E_=(typeof module!='undefined')?require('./engine.js'):E;const{T,GY,SPEEDS}=E_;
function rng(s){return()=>(s=(s*16807)%2147483647)/2147483647}
const DIFF=['Easy','Normal','Hard','Harder','Insane','Demon'];
// theme index, song index, start speed index, difficulty, script
const LEVELS=[
 {name:'Under the Sea',th:0,song:0,spd:1,diff:0,seed:11,script:[
  ['cube','spk',{n:4,k:1,gap:2}],['cube','stairs',{n:3}],['cube','spk',{n:3,k:2,gap:2}],
  ['ship','pillars',{n:5,gap:6,sh:1,dx:8}],
  ['cube','pads',{n:2}],['cube','plat',{n:4}],
  ['ball','flip',{n:4,gap:2,h:5}],
  ['cube','orbs',{n:3}],['cube','spk',{n:4,k:2,gap:2}],
  ['ship','pillars',{n:6,gap:6,sh:1,dx:7,sp:1}],['cube','spk',{n:3,k:1,gap:1}]]},
 {name:'Candy Land',th:1,song:1,spd:1,diff:1,seed:23,script:[
  ['cube','spk',{n:4,k:2,gap:2}],['cube','plat',{n:5}],['cube','pads',{n:2}],
  ['ufo','gates',{n:6,gap:5,sh:1,dx:7}],
  ['cube','stairs',{n:4}],['cube','orbs',{n:4}],
  ['ship','pillars',{n:7,gap:5,sh:2,dx:7}],
  ['cube','grav',{n:4}],
  ['ball','flip',{n:6,gap:2,h:5}],['cube','spk',{n:5,k:2,gap:1}]]},
 {name:'Jungle Jump',th:2,song:3,spd:1,diff:1,seed:31,script:[
  ['cube','spk',{n:4,k:2,gap:2}],['robot','towers',{n:4,hmax:3}],['cube','plat',{n:5}],
  ['ship','tunnel',{len:36,gap:200,amp:60}],
  ['cube','orbs',{n:4}],['ball','flip',{n:6,gap:2,h:5}],
  ['robot','towers',{n:5,hmax:4}],['ufo','gates',{n:7,gap:5,sh:2,dx:7}],['cube','spk',{n:5,k:3,gap:2}]]},
 {name:'Ice Kingdom',th:3,song:4,spd:2,diff:2,seed:41,script:[
  ['cube','spk',{n:4,k:2,gap:2}],['cube','stairs',{n:4}],
  ['wave','zig',{len:40,gap:150,seg:4}],
  ['cube','grav',{n:5}],['cube','pads',{n:2}],
  ['ship','pillars',{n:8,gap:5,sh:2,dx:6,sp:1}],
  ['spider','flip',{n:6,gap:2,h:5}],['cube','orbs',{n:4}],['cube','plat',{n:6}]]},
 {name:'Lava Volcano',th:4,song:5,spd:2,diff:3,seed:53,script:[
  ['cube','spk',{n:5,k:3,gap:2}],['robot','towers',{n:5,hmax:4}],
  ['ship','tunnel',{len:44,gap:170,amp:90}],
  ['cube','plat',{n:6}],['ball','flip',{n:8,gap:1,h:5}],
  ['wave','zig',{len:44,gap:140,seg:3}],
  ['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],['cube','orbs',{n:5}],['cube','spk',{n:5,k:3,gap:1}]]},
 {name:'Haunted Castle',th:5,song:6,spd:2,diff:3,seed:67,script:[
  ['cube','spk',{n:4,k:2,gap:1}],['spider','flip',{n:6,gap:2,h:5}],
  ['cube','grav',{n:6}],['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],
  ['cube','stairs',{n:5}],['mini','on'],['ship','pillars',{n:8,gap:4,sh:2,dx:6,sp:1}],['mini','off'],
  ['robot','towers',{n:5,hmax:4}],['wave','zig',{len:40,gap:140,seg:3}],['cube','orbs',{n:5}]]},
 {name:'Robot Factory',th:6,song:7,spd:2,diff:4,seed:79,script:[
  ['robot','towers',{n:6,hmax:4}],['cube','plat',{n:6}],
  ['speed',3],['ship','pillars',{n:8,gap:5,sh:2,dx:7,sp:1}],['speed',2],
  ['spider','flip',{n:8,gap:1,h:5}],['mini','on'],['wave','zig',{len:44,gap:130,seg:3}],['mini','off'],
  ['ball','flip',{n:8,gap:1,h:5}],['cube','grav',{n:6}],['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],['cube','spk',{n:6,k:3,gap:1}]]},
 {name:'Outer Space',th:7,song:2,spd:2,diff:4,seed:37,script:[
  ['cube','spk',{n:5,k:3,gap:1}],['ship','pillars',{n:9,gap:5,sh:2,dx:6,sp:1}],
  ['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],['cube','orbs',{n:5}],
  ['wave','zig',{len:48,gap:130,seg:3}],['spider','flip',{n:8,gap:1,h:5}],
  ['speed',3],['cube','spk',{n:5,k:2,gap:2}],['ship','tunnel',{len:48,gap:160,amp:100}],['speed',2],
  ['robot','towers',{n:5,hmax:4}],['ball','flip',{n:8,gap:1,h:5}]]},
 {name:'Neon City',th:8,song:8,spd:3,diff:5,seed:97,script:[
  ['cube','spk',{n:5,k:2,gap:2}],['wave','zig',{len:48,gap:130,seg:3}],
  ['cube','plat',{n:6}],['ship','pillars',{n:10,gap:5,sh:2,dx:7,sp:1}],
  ['mini','on'],['wave','zig',{len:44,gap:120,seg:2}],['mini','off'],['spider','flip',{n:8,gap:1,h:5}],
  ['ball','flip',{n:8,gap:1,h:5}],['ufo','gates',{n:9,gap:4,sh:2,dx:6,sp:1}],['cube','grav',{n:6}],
  ['robot','towers',{n:6,hmax:4}],['cube','orbs',{n:6}],['cube','spk',{n:6,k:3,gap:2}]]},
];
const CROWS=9,CTOP=GY-CROWS*T;
// ---- helpers ----
function B(c){return c.bpx} // pixels per beat
function add(c,o){c.obs.push(o);return o}
function spike(c,x,y=GY-T){add(c,{t:'s',x,y})}
function spikeD(c,x,y){add(c,{t:'sd',x,y})}
function block(c,x,y,w=T,h=T){return add(c,{t:"b",x,y,w,h})}
function snap(x){return Math.round(x/10)*10}
// round a distance up to a whole number of half beats (keeps obstacles on the rhythm)
function hb(c,d,min=0){const u=B(c)/2;return Math.max(min,Math.ceil(d/u))*u}
function JL(c){return(c.mini?28:32)*c.spd}
// ---- patterns ----
const PAT={
 cube:{
  spk(c,q){let x=c.x+B(c);for(let i=0;i<q.n;i++){const k=1+Math.floor(c.r()*q.k);for(let j=0;j<k;j++)spike(c,snap(x)+j*T);x+=hb(c,JL(c)+k*T*.5,q.gap*2)}c.x=x+B(c)},
  stairs(c,q){let x=c.x+B(c);for(let i=0;i<q.n;i++){const h=1+i%3;block(c,snap(x),GY-h*T,2*T,h*T);if(i<q.n-1)spike(c,snap(x)+2*T+Math.round((B(c)-2*T-T)/2/10)*10);x+=B(c)}c.x=x+B(c)},
  plat(c,q){let x=c.x+B(c);const x0=snap(x),st=hb(c,JL(c)*.85),ps=[];for(let i=0;i<q.n;i++){const h=1+(i%3==1?1:0);block(c,snap(x),GY-h*T,3*T,h*T);ps.push(snap(x));x+=st}const x1=snap(x-st)+3*T;for(let sx=x0+3*T;sx<x1-T;sx+=T){if(!ps.some(bx=>sx>=bx-T&&sx<bx+3*T))spike(c,sx)}c.x=x1+B(c)},
  pads(c,q){let x=c.x+B(c);for(let i=0;i<q.n;i++){add(c,{t:'p',x:snap(x),y:GY-T});for(let j=2;j<6;j++)spike(c,snap(x)+j*T);x+=B(c)*3}c.x=x},
  orbs(c,q){let x=c.x+B(c);const x0=snap(x);block(c,x0,GY-T,2*T,T);x+=T+29*c.spd;const st=29*c.spd;for(let i=0;i<q.n;i++){add(c,{t:'o',x:snap(x),y:GY-4*T});x+=st}x+=JL(c)*.85-st;block(c,snap(x),GY-T,6*T,T);for(let sx=x0+2*T;sx<snap(x);sx+=T)spike(c,sx);c.x=snap(x)+6*T+B(c)},
  grav(c,q){// flip gravity in a corridor, ceiling spikes to jump over upside down
   const top=GY-6*T,x0=c.x;c.bounds.push({x0,x1:x0+B(c)*(q.n*2+4),top});add(c,{t:'portal',k:'gup',x:snap(x0+B(c)),y:GY-4*T});let x=x0+B(c)*2.5;for(let i=0;i<q.n;i++){const k=1+Math.floor(c.r()*2);for(let j=0;j<k;j++)spikeD(c,snap(x)+j*T,top);x+=B(c)*2}
   add(c,{t:'portal',k:'gdown',x:snap(x),y:GY-4*T});c.x=x+B(c)*1.5;c.bounds[c.bounds.length-1].x1=c.x}},
 robot:{towers(c,q){let x=c.x+B(c);for(let i=0;i<q.n;i++){const h=2+Math.floor(c.r()*(q.hmax-1));block(c,snap(x),GY-h*T,T,h*T);spike(c,snap(x)+T*2);x+=B(c)*2}c.x=x}},
 ship:{
  pillars(c,q){let x=c.x+2*T,g=Math.floor((CROWS-q.gap)/2),pz=0;for(let i=0;i<q.n;i++){if(i>0){let ng=g+Math.round((c.r()*2-1)*q.sh);if(q.sh>1&&i%2)ng=g+(pz>0?-q.sh:q.sh);ng=Math.max(0,Math.min(CROWS-q.gap,ng));pz=ng-g;g=ng}
    if(g>0)block(c,x,CTOP,T,g*T);if(g+q.gap<CROWS)block(c,x,CTOP+(g+q.gap)*T,T,(CROWS-g-q.gap)*T);
    if(q.sp){if(g>0)spikeD(c,x,CTOP+g*T);if(g+q.gap<CROWS)spike(c,x,CTOP+(g+q.gap-1)*T)}x+=q.dx*T}c.x=x},
  tunnel(c,q){let x=c.x+2*T;const mid=(CTOP+GY)/2;for(let i=0;i<q.len;i++){const cy=mid+Math.sin(i/q.len*Math.PI*4+c.r()*.3)*q.amp,a=cy-q.gap/2,b=cy+q.gap/2;
    const cyn=mid+Math.sin((i+1)/q.len*Math.PI*4)*q.amp;const top=Math.min(a,cyn-q.gap/2),bot=Math.max(b,cyn+q.gap/2);
    if(top>CTOP+4)block(c,x,CTOP,T,snap(top-CTOP));if(bot<GY-4)block(c,x,snap(bot),T,GY-snap(bot));x+=T}c.x=x+T}},
 ufo:{gates(c,q){PAT.ship.pillars(c,q);for(let sx=c.x0seg+3*T;sx<c.x-T;sx+=T)if(!c.obs.some(o=>o.t=='b'&&o.x<=sx&&o.x+o.w>sx&&o.y+o.h>=GY))spike(c,sx)}},
 ball:{flip(c,q){const top=GY-q.h*T;c.btop=top;let x=c.x+B(c),side=0;for(let i=0;i<q.n;i++){const k=2+(i%2);for(let j=0;j<k;j++){if(side==0)spike(c,snap(x)+j*T);else spikeD(c,snap(x)+j*T,top)}side^=1;x+=B(c)*q.gap*(q.gap<2?1.5:1)}c.x=x+B(c)}},
 spider:{flip(c,q){const top=GY-q.h*T;c.btop=top;let x=c.x+B(c),side=0;for(let i=0;i<q.n;i++){const k=3;for(let j=0;j<k;j++){if(side==0)spike(c,snap(x)+j*T);else spikeD(c,snap(x)+j*T,top)}if(i%3==2)block(c,snap(x)+k*T,side?top:GY-T,T,T);side^=1;x+=B(c)*q.gap*(q.gap<2?1.2:1)}c.x=x+B(c)}},
 wave:{zig(c,q){let x=c.x+2*T;const span=GY-CTOP,half=q.gap/2;let cy=GY-span/2,dir=-1,run=0;const pts=[];const n=q.len;
   for(let i=0;i<=n;i++){pts.push(cy);if(run<=0){run=q.seg+Math.floor(c.r()*q.seg);dir=-dir}cy+=dir*T;if(cy-half<CTOP+10){cy=CTOP+10+half;run=0}if(cy+half>GY-10){cy=GY-10-half;run=0}run--}
   for(let i=0;i<n;i++){const a=Math.min(pts[i],pts[i+1])-half,b=Math.max(pts[i],pts[i+1])+half;if(a>CTOP+2)block(c,x+i*T,CTOP,T,Math.floor(a-CTOP)).wv=1;if(b<GY-2)block(c,x+i*T,Math.ceil(b),T,GY-Math.ceil(b)).wv=1}c.wv.push({x0:x,pts,half});c.x=x+n*T+T}}
};
const BOUNDED={ship:CTOP,ufo:CTOP,wave:CTOP,ball:null,spider:null};
function build(i){const L=LEVELS[i],r=rng(L.seed),spd=SPEEDS[L.spd];const c={obs:[],bounds:[],x:12*T,r,mode:'cube',spd,wv:[],bpx:spd*3600/Music_BPM(L.song),mini:false};
 for(const seg of L.script){const[m,p,q]=seg;
  if(m=='speed'){c.spd=SPEEDS[p];c.bpx=c.spd*3600/Music_BPM(L.song);add(c,{t:'portal',k:'v'+p,x:snap(c.x),y:GY-4*T});c.x+=3*T;continue}
  if(m=='mini'){add(c,{t:'portal',k:p=='on'?'mini':'big',x:snap(c.x),y:GY-4*T});c.mini=p=='on';c.x+=3*T;continue}
  const modeChange=m!=c.mode;let bx0=c.x;
  if(modeChange){add(c,{t:'portal',k:m,x:snap(c.x+T),y:GY-4*T});c.x+=(m=='cube'||m=='robot'?5:4)*T;c.mode=m}
  c.x0seg=c.x;c.btop=undefined;PAT[m][p](c,q||{});(c.segs=c.segs||[]).push({m,p,x0:bx0,x1:c.x});
  let top=BOUNDED[m];if(top===null)top=c.btop;if(m in BOUNDED){// extend/merge bound
   const last=c.bounds[c.bounds.length-1];if(last&&last.x1>=bx0-1&&last.top==top)last.x1=c.x+T;else c.bounds.push({x0:bx0,x1:c.x+T,top})}
 }
 if(c.mode!='cube'){add(c,{t:'portal',k:'cube',x:snap(c.x+T),y:GY-4*T});c.x+=6*T}
 if(c.mini){add(c,{t:'portal',k:'big',x:snap(c.x),y:GY-4*T});c.x+=2*T}
 c.obs.sort((a,b)=>a.x-b.x);const lv={obs:c.obs,bounds:c.bounds,end:c.x+6*T,spd:SPEEDS[L.spd],startX:0,startMode:'cube',info:L,idx:i,segs:c.segs,wv:c.wv};
 let ci=0;if(typeof BAKED!='undefined'&&BAKED[i])for(const[x,y]of BAKED[i].coins)lv.obs.splice(E_.idxFrom(lv,x),0,{t:'coin',x,y,id:ci++});
 return lv}
function Music_BPM(s){return(typeof Music!='undefined')?Music.BPM(s):[120,128,140,124,132,150,138,145,160][s]}
return{LEVELS,DIFF,build,CTOP,CROWS}})();
if(typeof module!='undefined')module.exports=LV;
