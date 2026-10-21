// Cube Dash levels: pattern library + hand-arranged level scripts (beat-synced).
const LV=(()=>{
const E_=(typeof module!='undefined')?require('./engine.js'):E;const{T,GY,SPEEDS}=E_;
function rng(s){return()=>(s=(s*16807)%2147483647)/2147483647}
const DIFF=['Easy','Normal','Hard','Harder','Insane','Demon'];
// theme index, song index, start speed index, difficulty, script
const LEVELS=[
 {name:'Under the Sea',th:0,song:0,spd:1,diff:0,seed:11,script:[
  ['cube','seq',{s:'s.......s.......s...s...d.......'}],['cube','seq',{s:'1...2...1.......s.......1...2...3.......'}],['cube','stairs',{n:3}],['cube','seq',{s:'b...b...B.......s...s...p.......'}],
  ['ship','pillars',{n:5,gap:6,sh:1,dx:8}],
  ['cube','pads',{n:2}],['cube','plat',{n:4}],
  ['ball','flip',{n:4,gap:2,h:5}],
  ['cube','orbs',{n:3}],['cube','seq',{s:'d.......s...s...d...s...'}],
  ['ship','pillars',{n:6,gap:6,sh:1,dx:7,sp:1}],['cube','seq',{s:'s...s...s...d.......'}]]},
 {name:'Candy Land',th:1,song:1,spd:1,diff:1,seed:23,script:[
  ['cube','seq',{s:'s...s...d.......b...B...b.......d...s...'}],['cube','plat',{n:5}],['cube','seq',{s:'s...1...2...s...b...B...d.......'}],['ball','bseq',{h:5,s:'f...c...f...c...f.c.....'}],['cube','pads',{n:2}],
  ['ufo','gates',{n:6,gap:5,sh:1,dx:7}],
  ['cube','stairs',{n:4}],['cube','orbs',{n:4}],
  ['ship','pillars',{n:7,gap:5,sh:2,dx:7}],
  ['cube','grav',{n:4}],['cube','gorbs',{n:2}],
  ['ball','flip',{n:6,gap:2,h:5}],['cube','seq',{s:'d...s...d...t.......p.......s...s...'}]]},
 {name:'Jungle Jump',th:2,song:3,spd:1,diff:1,seed:31,script:[
  ['cube','seq',{s:'s...d...s...d...B.......s...s...'}],['robot','towers',{n:4,hmax:3}],['cube','seq',{s:'1...2...3...2...1.......d...d...'}],['ship','gseq',{gap:4,s:'5.4.3.2.3.4.5.6.5.4.'}],['cube','plat',{n:5}],['cube','saws',{n:4}],
  ['ship','tunnel',{len:36,gap:200,amp:60}],
  ['cube','orbs',{n:4}],['ball','flip',{n:6,gap:2,h:5}],
  ['robot','towers',{n:5,hmax:4}],['ufo','gates',{n:7,gap:5,sh:2,dx:7}],['cube','seq',{s:'d...t.......d...s...s...t.......'}]]},
 {name:'Ice Kingdom',th:3,song:4,spd:2,diff:2,seed:41,script:[
  ['cube','seq',{s:'s...s...d...d...t.......b...B.......'}],['cube','stairs',{n:4}],
  ['wave','zig',{len:40,gap:150,seg:4}],['cube','seq',{s:'d...1...2...3...t.......2...d...'}],['ball','bseq',{h:5,s:'f...c...F...c...f...C...'}],
  ['cube','grav',{n:5}],['cube','pads',{n:2}],['cube','gorbs',{n:2}],
  ['ship','pillars',{n:8,gap:5,sh:2,dx:6,sp:1}],
  ['spider','flip',{n:6,gap:2,h:5}],['cube','orbs',{n:4}],['cube','plat',{n:6}],['cube','seq',{s:'d...d...t...s...'}]]},
 {name:'Lava Volcano',th:4,song:5,spd:2,diff:3,seed:53,script:[
  ['cube','seq',{s:'t...t...d...d...s.s.....B.......'}],['robot','towers',{n:5,hmax:4}],['ship','gseq',{gap:4,s:'6.5.4.3.2.2.3.4.5.6.6.5.4.3.'}],['cube','seq',{s:'1.....2.....3.......t.......s.s.....'}],['cube','pistons',{n:4}],
  ['ship','tunnel',{len:44,gap:170,amp:90}],
  ['cube','plat',{n:6}],['cube','saws',{n:4,hang:1}],['ship','sawfield',{n:8,dx:5,mid:1}],['ball','flip',{n:8,gap:1,h:5}],
  ['wave','zig',{len:44,gap:140,seg:3}],
  ['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],['cube','orbs',{n:5}],['cube','seq',{s:'t...d...t...d...s.s.....'}]]},
 {name:'Haunted Castle',th:5,song:6,spd:2,diff:3,seed:67,script:[
  ['cube','seq',{s:'d...s...d...s...t.......'}],['spider','flip',{n:6,gap:2,h:5}],['ball','bseq',{h:5,s:'f...c...f.c.....F...C...'}],['cube','seq',{s:'2...3...2...1...d.......'}],
  ['cube','grav',{n:6}],['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],['ufo','movers',{n:6,dx:7,beats:2,gapPad:60}],
  ['cube','stairs',{n:5}],['cube','saws',{n:4,hang:1}],['cube','gorbs',{n:4}],['mini','on'],['ship','pillars',{n:8,gap:4,sh:2,dx:6,sp:1}],['mini','off'],
  ['robot','towers',{n:5,hmax:4}],['wave','zig',{len:40,gap:140,seg:3}],['cube','orbs',{n:5}],['cube','seq',{s:'t...t...d.d.....'}]]},
 {name:'Robot Factory',th:6,song:7,spd:2,diff:4,seed:79,script:[
  ['robot','towers',{n:6,hmax:4}],['cube','pistons',{n:5,sp:1}],['cube','plat',{n:6}],['cube','seq',{s:'1.....2.....3.......t...d...'}],['ship','gseq',{gap:3,s:'5.4.3.4.5.6.5.4.3.2.3.4.'}],['cube','saws',{n:5,hang:1}],
  ['speed',3],['ship','pillars',{n:8,gap:5,sh:2,dx:7,sp:1}],['speed',2],['ship','sawfield',{n:10,dx:5,mid:1}],
  ['spider','flip',{n:8,gap:1,h:5}],['mini','on'],['wave','zig',{len:44,gap:130,seg:3}],['mini','off'],
  ['ball','flip',{n:8,gap:1,h:5}],['cube','grav',{n:6}],['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],['cube','seq',{s:'t...t...d.d.....t...s.s.....'}]]},
 {name:'Outer Space',th:7,song:2,spd:2,diff:4,seed:37,script:[
  ['cube','seq',{s:'t...d...t...s.s.....B.......t...'}],['ship','pillars',{n:9,gap:5,sh:2,dx:6,sp:1}],['ball','bseq',{h:5,s:'f...c...f...c...F...C...f.c.....'}],['cube','seq',{s:'d.......2...3.......t.......'}],
  ['ufo','gates',{n:8,gap:4,sh:2,dx:6,sp:1}],['ship','movers',{n:8,dx:6,beats:2,gapPad:40}],['cube','orbs',{n:5}],['cube','gorbs',{n:4}],
  ['wave','zig',{len:48,gap:130,seg:3}],['spider','flip',{n:8,gap:1,h:5}],
  ['speed',3],['cube','seq',{s:'d.....d.....t.......'}],['ship','tunnel',{len:48,gap:160,amp:100}],['speed',2],
  ['robot','towers',{n:5,hmax:4}],['ball','flip',{n:8,gap:1,h:5}]]},
 {name:'Neon City',th:8,song:8,spd:3,diff:5,seed:97,script:[
  ['cube','seq',{s:'d.....t.....d.....t.......'}],['wave','zig',{len:48,gap:130,seg:3}],['cube','seq',{s:'t.......2.....3.......d.......2.......t...'}],['ship','gseq',{gap:3,s:'6.5.4.3.2.3.4.5.6.5.4.3.2.3.'}],
  ['cube','plat',{n:6}],['cube','pistons',{n:6,sp:1}],['ship','sawfield',{n:10,dx:4,mid:1}],['ship','movers',{n:10,dx:5,beats:1,gapPad:40}],['ship','pillars',{n:10,gap:5,sh:2,dx:7,sp:1}],
  ['mini','on'],['wave','zig',{len:44,gap:120,seg:2}],['mini','off'],['spider','flip',{n:8,gap:1,h:5}],
  ['ball','flip',{n:8,gap:1,h:5}],['ufo','gates',{n:9,gap:4,sh:2,dx:6,sp:1}],['cube','grav',{n:6}],['cube','gorbs',{n:4}],
  ['robot','towers',{n:6,hmax:4}],['cube','orbs',{n:6}],['cube','seq',{s:'t.....t.....d...d.......'}]]},
 {name:'Rainbow Sky',th:9,song:9,spd:2,diff:4,seed:131,secret:9,script:[
  ['cube','seq',{s:'s...d...t...B.......o...o...s.s.....'}],['ufo','gates',{n:6,gap:4,sh:2,dx:6,sp:1}],['cube','seq',{s:'1...2...3...2...d.......'}],['ball','bseq',{h:5,s:'f...c...F...C...f...c...'}],['ball','flip',{n:6,gap:1,h:5}],
  ['cube','gorbs',{n:4}],['ship','movers',{n:8,dx:6,beats:2,gapPad:40}],['robot','towers',{n:5,hmax:4}],
  ['wave','zig',{len:44,gap:140,seg:3}],['spider','flip',{n:8,gap:1,h:5}],['cube','pistons',{n:5,sp:1}],
  ['mini','on'],['ship','pillars',{n:8,gap:4,sh:2,dx:6,sp:1}],['mini','off'],['cube','saws',{n:4,hang:1}],['cube','orbs',{n:5}],['cube','seq',{s:'t...t...d.d.....t.......'}]]},
 {name:'Desert Temple',th:10,song:10,spd:2,diff:2,seed:149,script:[
  ['cube','seq',{s:'s...s...d.......b...B...b.......s...d...'}],['ship','gseq',{s:'3.3.2.1.1.2.3.4.4.3.',gap:5}],
  ['cube','saws',{n:3}],['ball','bseq',{s:'f.....c.....f.....c...f...c...',h:5}],['cube','orbs',{n:4}],
  ['robot','towers',{n:4,hmax:3}],['ufo','gates',{n:6,gap:5,sh:1,dx:7}],['cube','gorbs',{n:2}],['cube','seq',{s:'d...d...t.......s.s.....'}]]},
 {name:'Mushroom Forest',th:12,song:12,spd:1,diff:1,seed:181,script:[
  ['cube','seq',{s:'s.......p.......s...s...1...2...'}],['cube','pads',{n:3}],['cube','orbs',{n:3}],
  ['ufo','gates',{n:6,gap:5,sh:1,dx:7}],['ball','bseq',{h:5,s:'f.......c.......f...c...'}],
  ['cube','plat',{n:5}],['cube','seq',{s:'1...2...1.......d.......b...B...'}],
  ['ship','gseq',{gap:5,s:'5.5.4.4.3.3.4.4.5.5.6.6.'}],['cube','pads',{n:2}],['cube','seq',{s:'s...s...d.......p.......'}]]},
 {name:'Pirate Cove',th:13,song:13,spd:2,diff:2,seed:191,script:[
  ['cube','seq',{s:'s...d...s...d...B.......t.......'}],['robot','towers',{n:4,hmax:3}],
  ['ship','pillars',{n:7,gap:5,sh:2,dx:6}],['cube','saws',{n:4}],['ball','bseq',{h:5,s:'f...c...F...c...f.c.....'}],
  ['ship','sawfield',{n:8,dx:6}],['cube','seq',{s:'1.....2.....1.........d.......d...'}],['cube','orbs',{n:4}],
  ['ship','gseq',{gap:4,s:'6.5.4.3.4.5.6.5.4.3.2.3.'}],['cube','gorbs',{n:2}],['cube','seq',{s:'d...t.......s...s...'}]]},
 {name:'Crystal Caves',th:14,song:14,spd:2,diff:4,seed:211,script:[
  ['cube','seq',{s:'t...d...2.....3.......d...'}],['spider','flip',{n:6,gap:2,h:5}],['cube','grav',{n:5}],
  ['wave','zig',{len:40,gap:150,seg:3}],['cube','pistons',{n:4}],['ufo','movers',{n:6,dx:7,beats:2,gapPad:60}],
  ['mini','on'],['ball','bseq',{h:5,s:'f...c...f...c...F...C...'}],['mini','off'],
  ['speed',3],['ship','gseq',{gap:3,s:'6.5.4.3.2.3.4.5.6.5.4.3.'}],['speed',2],['cube','saws',{n:4,hang:1}],
  ['robot','towers',{n:5,hmax:4}],['cube','orbs',{n:5}],['cube','seq',{s:'t.......d...d...'}]]},
 {name:'Toy Box',th:15,song:15,spd:0,diff:0,seed:223,script:[
  ['cube','seq',{s:'s.......s.......b.......B.......'}],['cube','stairs',{n:3}],['cube','seq',{s:'1...2...1.......s.......'}],
  ['ufo','gates',{n:5,gap:6,sh:1,dx:8}],['cube','seq',{s:'s.......p.......s.......'}],['cube','orbs',{n:3}],
  ['ball','bseq',{h:5,s:'f.......c.......f.......'}],['cube','plat',{n:4}],
  ['ship','pillars',{n:5,gap:6,sh:1,dx:8}],['cube','seq',{s:'s.......d.......s...s...'}]]},
 {name:'Cherry Blossom',th:16,song:16,spd:1,diff:1,seed:227,script:[
  ['cube','seq',{s:'s...s...d.......1...2...1.......'}],['cube','orbs',{n:4}],['robot','towers',{n:4,hmax:3}],
  ['ship','gseq',{gap:5,s:'4.4.5.5.6.6.5.5.4.4.3.3.'}],['cube','plat',{n:5}],['spider','flip',{n:4,gap:2,h:5}],
  ['cube','grav',{n:3}],['ball','bseq',{h:5,s:'f...c...f...c...F.......'}],['cube','pads',{n:2}],
  ['ufo','gates',{n:6,gap:5,sh:2,dx:7}],['cube','seq',{s:'d...s...1...2...d.......'}]]},
 {name:'Clockwork Tower',th:17,song:17,spd:2,diff:3,seed:229,script:[
  ['cube','seq',{s:'d...d...t.......2.....1.......'}],['cube','pistons',{n:5,sp:1}],['cube','saws',{n:4,hang:1}],
  ['ship','movers',{n:6,dx:7,beats:2,gapPad:60}],['robot','towers',{n:5,hmax:4}],['ball','bseq',{h:5,s:'f...c...F...C...f.c.....'}],
  ['wave','zig',{len:40,gap:150,seg:3}],['cube','gorbs',{n:2}],['ship','gseq',{gap:4,s:'6.5.4.3.2.3.4.5.6.5.4.3.'}],
  ['cube','orbs',{n:4}],['cube','pistons',{n:4}],['cube','seq',{s:'t.......d...d...'}]]},
 {name:'Shadow King',th:11,song:11,spd:3,diff:5,seed:173,secret:12,boss:1,script:[
  ['cube','seq',{s:'t.....d.....t.....B.......o...o...o...'}],['ship','sawfield',{n:10,dx:5,mid:1}],
  ['cube','pistons',{n:5,sp:1}],['ship','gseq',{s:'4.3.2.1.0.1.2.3.4.4.3.2.',gap:5}],['wave','zig',{len:44,gap:130,seg:3}],
  ['ball','bseq',{s:'F.....C.....F...C...F...C...',h:5}],['spider','flip',{n:8,gap:1,h:5}],['ufo','movers',{n:8,dx:6,beats:1,gapPad:50}],
  ['cube','gorbs',{n:4}],['mini','on'],['wave','zig',{len:40,gap:120,seg:2}],['mini','off'],['robot','towers',{n:5,hmax:4}],
  ['cube','saws',{n:5,hang:1}],['cube','seq',{s:'t.....t.....d...d...t.......'}]]},
];
const CROWS=9,CTOP=GY-CROWS*T;
// ---- helpers ----
function B(c){return c.bpx} // pixels per beat
function add(c,o){c.obs.push(o);return o}
function spike(c,x,y=GY-T){add(c,{t:'s',x,y})}
function spikeD(c,x,y){add(c,{t:'sd',x,y})}
function block(c,x,y,w=T,h=T){return add(c,{t:"b",x,y,w,h})}
function saw(c,cx,cy,r){add(c,{t:'saw',x:cx-r,cx,cy,r})}
function fAt(c,x){return c.f0+(x-c.xs)/c.spd}
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
   add(c,{t:'portal',k:'gdown',x:snap(x),y:GY-4*T});c.x=x+B(c)*1.5;c.bounds[c.bounds.length-1].x1=c.x},
  // hand-written rhythm line: one char per half beat. s spike, d double spike, t triple, b 1-high block (2 wide), B 2-high block, _ spike floor, o orb over spike floor, p jump pad, . empty
  seq(c,q){const u=B(c)/2;let x=c.x+B(c);for(const ch of q.s){const X0=snap(x);
    if(ch=='s')spike(c,X0);else if(ch=='d'){spike(c,X0);spike(c,X0+T)}else if(ch=='t'){spike(c,X0);spike(c,X0+T);spike(c,X0+2*T)}
    else if(ch=='b')block(c,X0,GY-T,2*T,T);else if(ch=='B')block(c,X0,GY-2*T,2*T,2*T);
    else if(ch=='_'||ch=='o'){for(let sx=X0;sx<snap(x+u);sx+=T)spike(c,sx);if(ch=='o')add(c,{t:'o',x:X0,y:GY-3*T})}
    else if(ch=='p')add(c,{t:'p',x:X0,y:GY-T});else if(ch>='1'&&ch<='4')block(c,X0,GY-(+ch)*T,T,(+ch)*T);x+=u}c.x=x+B(c)},
  saws(c,q){let x=c.x+B(c);for(let i=0;i<q.n;i++){const r=q.r||34;saw(c,snap(x)+r,GY+6,r);if(q.hang&&i%2==1)saw(c,snap(x)+r+hb(c,JL(c)*.5),GY-4.4*T,26);x+=hb(c,JL(c)+2*r*.6,2)}c.x=x},
  gorbs(c,q){// blue gravity orbs: flip to the ceiling over spike floors, then back
   const top=GY-6*T,x0=c.x;let x=x0+B(c);const st=hb(c,JL(c)*1.2);for(let i=0;i<q.n;i++){const up=i%2==0;// floor run then orb
    const len=hb(c,JL(c)*1.6);if(up){block(c,snap(x),GY-T,2*T,T);add(c,{t:'og',x:snap(x+2*T+JL(c)*.35),y:GY-3*T});for(let sx=snap(x)+2*T;sx<snap(x+len+3*T);sx+=T)spike(c,sx)}
    else{add(c,{t:'og',x:snap(x+JL(c)*.35),y:top+2*T});for(let sx=snap(x-JL(c)*.2);sx<snap(x+len+2*T);sx+=T)spikeD(c,sx,top)}x+=len+3*T}
   c.bounds.push({x0,x1:x+B(c),top});c.x=x+B(c)},
  pistons(c,q){// crushers that pump to the beat: pass under them when they are up
   const fpb=3600/c.bpm,w=2*Math.PI/(fpb*2);let x=c.x+B(c)*2;for(let i=0;i<q.n;i++){const X0=snap(x);const st=hb(c,B(c)*2);add(c,{t:'b',x:X0,y:GY-4.5*T,w:2*T,h:3*T,mv:{a:1.5*T,w,ph:-Math.PI/2-w*fAt(c,X0+T)},pis:1});if(q.sp&&i%2)spike(c,snap(X0+2*T+(st-2*T)/2-T/2));x+=st}c.x=x+B(c)}},
 robot:{towers(c,q){let x=c.x+B(c);for(let i=0;i<q.n;i++){const h=2+Math.floor(c.r()*(q.hmax-1));block(c,snap(x),GY-h*T,T,h*T);spike(c,snap(x)+T*2);x+=B(c)*2}c.x=x}},
 ship:{
  pillars(c,q){let x=c.x+2*T,g=Math.floor((CROWS-q.gap)/2),pz=0;for(let i=0;i<q.n;i++){if(i>0){let ng=g+Math.round((c.r()*2-1)*q.sh);if(q.sh>1&&i%2)ng=g+(pz>0?-q.sh:q.sh);ng=Math.max(0,Math.min(CROWS-q.gap,ng));pz=ng-g;g=ng}
    if(g>0)block(c,x,CTOP,T,g*T);if(g+q.gap<CROWS)block(c,x,CTOP+(g+q.gap)*T,T,(CROWS-g-q.gap)*T);
    if(q.sp){if(g>0)spikeD(c,x,CTOP+g*T);if(g+q.gap<CROWS)spike(c,x,CTOP+(g+q.gap-1)*T)}x+=q.dx*T}c.x=x},
  movers(c,q){const fpb=3600/c.bpm;let x=c.x+3*T;const mid=(CTOP+GY)/2;for(let i=0;i<q.n;i++){const r=26;add(c,{t:'saw',x:x,cx:x+r,cy:mid,r,mv:{a:(GY-CTOP)/2-r-q.gapPad,w:2*Math.PI/(fpb*q.beats),ph:i*1.3}});x+=q.dx*T}c.x=x+2*T},
  gseq(c,q){let x=c.x+2*T;for(const ch of q.s){if(ch>='0'&&ch<='9'){const g=Math.min(+ch,CROWS-q.gap),X0=snap(x);if(g>0)block(c,X0,CTOP,T,g*T);if(g+q.gap<CROWS)block(c,X0,CTOP+(g+q.gap)*T,T,(CROWS-g-q.gap)*T)}x+=B(c)/2}c.x=x+T},
  sawfield(c,q){let x=c.x+3*T;const mid=(CTOP+GY)/2;for(let i=0;i<q.n;i++){const r=24+(i%3)*8,cy=i%2?CTOP+r+10+c.r()*60:GY-r-10-c.r()*60;saw(c,x+r,cy,r);if(q.mid&&i%3==2)saw(c,x+r+q.dx*T/2,mid+(c.r()-.5)*60,22);x+=q.dx*T}c.x=x+2*T},
  tunnel(c,q){let x=c.x+2*T;const mid=(CTOP+GY)/2;for(let i=0;i<q.len;i++){const cy=mid+Math.sin(i/q.len*Math.PI*4+c.r()*.3)*q.amp,a=cy-q.gap/2,b=cy+q.gap/2;
    const cyn=mid+Math.sin((i+1)/q.len*Math.PI*4)*q.amp;const top=Math.min(a,cyn-q.gap/2),bot=Math.max(b,cyn+q.gap/2);
    if(top>CTOP+4)block(c,x,CTOP,T,snap(top-CTOP));if(bot<GY-4)block(c,x,snap(bot),T,GY-snap(bot));x+=T}c.x=x+T}},
 ufo:{movers(c,q){PAT.ship.movers(c,q)},gates(c,q){PAT.ship.pillars(c,q);for(let sx=c.x0seg+3*T;sx<c.x-T;sx+=T)if(!c.obs.some(o=>o.t=='b'&&o.x<=sx&&o.x+o.w>sx&&o.y+o.h>=GY))spike(c,sx)}},
 ball:{bseq(c,q){const top=GY-q.h*T;c.btop=top;let x=c.x+B(c);for(const ch of q.s){const k=ch=='F'||ch=='C'?3:2;if(ch.toLowerCase()=='f')for(let j=0;j<k;j++)spike(c,snap(x)+j*T);else if(ch.toLowerCase()=='c')for(let j=0;j<k;j++)spikeD(c,snap(x)+j*T,top);x+=B(c)/2}c.x=x+B(c)},flip(c,q){const top=GY-q.h*T;c.btop=top;let x=c.x+B(c),side=0;for(let i=0;i<q.n;i++){const k=2+(i%2);for(let j=0;j<k;j++){if(side==0)spike(c,snap(x)+j*T);else spikeD(c,snap(x)+j*T,top)}side^=1;x+=B(c)*q.gap*(q.gap<2?1.5:1)}c.x=x+B(c)}},
 ball2:0,
 spider:{flip(c,q){const top=GY-q.h*T;c.btop=top;let x=c.x+B(c),side=0;for(let i=0;i<q.n;i++){const k=3;for(let j=0;j<k;j++){if(side==0)spike(c,snap(x)+j*T);else spikeD(c,snap(x)+j*T,top)}if(i%3==2)block(c,snap(x)+k*T,side?top:GY-T,T,T);side^=1;x+=B(c)*q.gap*(q.gap<2?1.2:1)}c.x=x+B(c)}},
 wave:{zig(c,q){let x=c.x+2*T;const span=GY-CTOP,half=q.gap/2;let cy=GY-span/2,dir=-1,run=0;const pts=[];const n=q.len;
   for(let i=0;i<=n;i++){pts.push(cy);if(run<=0){run=q.seg+Math.floor(c.r()*q.seg);dir=-dir}cy+=dir*T;if(cy-half<CTOP+10){cy=CTOP+10+half;run=0}if(cy+half>GY-10){cy=GY-10-half;run=0}run--}
   for(let i=0;i<n;i++){const a=Math.min(pts[i],pts[i+1])-half,b=Math.max(pts[i],pts[i+1])+half;if(a>CTOP+2)block(c,x+i*T,CTOP,T,Math.floor(a-CTOP)).wv=1;if(b<GY-2)block(c,x+i*T,Math.ceil(b),T,GY-Math.ceil(b)).wv=1}c.wv.push({x0:x,pts,half});c.x=x+n*T+T}}
};
const BOUNDED={ship:CTOP,ufo:CTOP,wave:CTOP,ball:null,spider:null};
function build(i){const L=LEVELS[i],r=rng(L.seed),spd=SPEEDS[L.spd];const c={obs:[],bounds:[],x:12*T,r,mode:'cube',spd,wv:[],f0:0,xs:0,bpm:Music_BPM(L.song),bpx:spd*3600/Music_BPM(L.song),mini:false};
 for(const seg of L.script){const[m,p,q]=seg;
  if(m=='speed'){c.f0+=(c.x-c.xs)/c.spd;c.xs=c.x;c.spd=SPEEDS[p];c.bpx=c.spd*3600/Music_BPM(L.song);add(c,{t:'portal',k:'v'+p,x:snap(c.x),y:GY-4*T});c.x+=3*T;continue}
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
// ---- generated runs (Daily / Random): stitched from the hand-tuned pattern library, then bot-checked in the game ----
function gen(seed,tier){const r=rng(seed),pick=a=>a[Math.floor(r()*a.length)];
 const SEQ=['s...s...d.......','s.......d...s...','1...2...1.......s.......','d...s...b...B.......','s...d...1...2.......','b...B...s...s...','d.......t.......','1.....2.....1.......d...'];
 const CUBE=[()=>['cube','seq',{s:pick(SEQ)}],()=>['cube','stairs',{n:3+Math.floor(r()*2)}],()=>['cube','plat',{n:4+Math.floor(r()*2)}],()=>['cube','orbs',{n:3+tier}],()=>['cube','pads',{n:2}],()=>['cube','grav',{n:3+tier}],()=>['cube','saws',{n:3+tier}],()=>['cube','gorbs',{n:2}]];
 const mel=(n,g)=>{let v=4,s='';for(let i=0;i<n;i++){v=Math.max(2,Math.min(7-g+3,v+pick([-1,0,1])));s+=v+'.'}return s};
 const bs=n=>{let s='';for(let i=0;i<n;i++)s+=pick(['f...','c...','f...c...','F.......','C.......']);return s};
 const MODE=[()=>['ship','pillars',{n:6+tier,gap:6-tier,sh:1+tier%2,dx:7}],()=>['ship','gseq',{gap:5-tier,s:mel(12,5-tier)}],()=>['ball','bseq',{h:5,s:bs(4)}],()=>['ufo','gates',{n:5+tier,gap:5,sh:1,dx:7}],()=>['spider','flip',{n:4+tier,gap:2,h:5}],()=>['robot','towers',{n:4,hmax:3}],()=>['ball','flip',{n:4+tier,gap:2,h:5}]];
 if(tier>1)MODE.push(()=>['wave','zig',{len:36,gap:160,seg:4}],()=>['ufo','movers',{n:5,dx:8,beats:2,gapPad:70}],()=>['ship','tunnel',{len:36,gap:200,amp:60}]);
 const script=[['cube','seq',{s:pick(SEQ)}]];for(let k=0;k<5;k++){script.push(pick(CUBE)());script.push(pick(MODE)())}script.push(['cube','seq',{s:pick(SEQ)}]);
 const th=pick([0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17]);
 return{name:'',th,song:pick([0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17]),spd:tier>1?2:1,diff:[1,2,3][tier]||1,seed,script,gen:1}}
function Music_BPM(s){return(typeof Music!='undefined')?Music.BPM(s):[120,128,140,124,132,150,138,145,160,170,126,174,118,136,150,112,122,142][s]}
return{LEVELS,DIFF,build,gen,CTOP,CROWS}})();
if(typeof module!='undefined')module.exports=LV;
