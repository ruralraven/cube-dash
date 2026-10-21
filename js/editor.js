// Cube Dash level editor: place blocks/spikes/orbs/pads/portals on the beat grid, test-play, bot-check, share by link.
const ED={cx:0,tool:0,msg:'',msgT:0,fail:null,data:null,drag:null};
const EDTOOLS=[['b','Block'],['s','Spike'],['sd','Ceil spike'],['o','Orb'],['og','Blue orb'],['p','Pad'],['pg','Blue pad'],
 ['P:cube','Cube'],['P:ship','Ship'],['P:ball','Ball'],['P:ufo','UFO'],['P:wave','Wave'],['P:robot','Robot'],['P:spider','Spider'],['P:gup','Grav ↑'],['P:gdown','Grav ↓'],['P:v0','Slow'],['P:v2','Fast'],['X','Erase']];
const EROW=GY-9*T;
function edLoad(){if(ED.data)return;try{const q=QS.get('lvdata');ED.data=q?JSON.parse(decodeURIComponent(escape(atob(q.replace(/-/g,'+').replace(/_/g,'/'))))):JSON.parse(localStorage.cdEdit||'null')}catch(e){}
 if(!ED.data||!ED.data.o)ED.data={th:0,song:0,spd:1,o:[['s',16,0],['s',22,0],['b',28,0],['b',29,1],['s',30,0],['P:ship',36,0],['b',44,6],['b',44,7],['b',44,8],['b',52,0],['b',52,1],['b',52,2],['P:cube',60,0],['o',66,2],['s',66,0],['s',67,0]]}}
function edSave(){try{localStorage.cdEdit=JSON.stringify(ED.data)}catch(e){}}
function edBuild(){const d=ED.data,obs=[];let end=40;
 for(const[t,c,r]of d.o){const x=c*T,y=GY-T-r*T;end=Math.max(end,c+12);
  if(t[0]=='P')obs.push({t:'portal',k:t.slice(2),x,y:GY-4*T});else if(t=='b')obs.push({t:'b',x,y,w:T,h:T});else if(t=='p'||t=='pg')obs.push({t,x,y});else obs.push({t,x,y})}
 obs.sort((a,b)=>a.x-b.x);const bounds=[];let mode='cube',x0=0;
 const close=x1=>{if(['ship','ufo','wave','ball','spider'].includes(mode))bounds.push({x0,x1,top:LV.CTOP})};
 for(const o of obs)if(o.t=='portal'&&['cube','ship','ball','ufo','wave','robot','spider'].includes(o.k)){close(o.x+T/2);mode=o.k;x0=o.x+T/2}close(end*T+1e4);
 return{obs,bounds,end:end*T,spd:E.SPEEDS[d.spd],startX:0,startMode:'cube',info:{},idx:-1,segs:[],wv:[]}}
function edOpen(){edLoad();scene='edit';Music.stop();held=false}
function edTest(){edSave();LV.LEVELS[NL+1]={name:'My Level',th:ED.data.th,song:ED.data.song,spd:ED.data.spd,diff:1,custom:1};att=0;start(NL+1)}
function edCheck(){const lv=edBuild(),r=BOT.solve(lv,4000,3);if(r.ok){ED.fail=null;ED.msg='✓ The bot beat your level!'}else{ED.fail=r.best;ED.msg=r.timeout?'Bot ran out of time — try simplifying':'✗ Bot got stuck at '+Math.round(100*r.best/lv.end)+'% (red line)';ED.cx=Math.max(0,r.best-W/2)}ED.msgT=240}
function edShare(){edSave();const s=btoa(unescape(encodeURIComponent(JSON.stringify(ED.data)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');const url=location.origin+location.pathname+'?lvdata='+s;
 try{navigator.clipboard.writeText(url);ED.msg='Link copied! Send it to a friend.'}catch(e){ED.msg='Copy failed'}ED.url=url;ED.msgT=240}
function edCell(mx,my){const c=Math.floor((mx+ED.cx)/T),r=Math.floor((GY-my)/T);return[c,r]}
function edPlace(mx,my){const[c,r]=edCell(mx,my);if(r<0||r>8||c<4)return;const tl=EDTOOLS[ED.tool][0],o=ED.data.o;
 const at=o.findIndex(q=>q[1]==c&&(q[0][0]=='P'?tl[0]=='P'||tl=='X':q[2]==r&&q[0][0]!='P'));
 if(tl=='X'){const k=o.findIndex(q=>q[1]==c&&(q[2]==r||q[0][0]=='P'));if(k>=0)o.splice(k,1)}
 else if(at>=0&&o[at][0]==tl)o.splice(at,1);else{if(at>=0)o.splice(at,1);o.push([tl,c,tl[0]=='P'?0:r])}ED.fail=null;edSave()}
const EBTN=[['THEME',()=>{ED.data.th=(ED.data.th+1)%TH.length;if(ED.data.th==11)ED.data.th++;ED.data.th%=TH.length}],['SONG',()=>{ED.data.song=(ED.data.song+1)%Music.SONGS.length}],['SPEED',()=>{ED.data.spd=(ED.data.spd+1)%4}],
 ['▶ TEST',edTest],['🤖 CHECK',edCheck],['🔗 SHARE',edShare],['CLEAR',()=>{if(ED.clr&&t-ED.clr<2){ED.data.o=[];edSave();ED.msg='Cleared';ED.msgT=90}else{ED.clr=t;ED.msg='Tap CLEAR again to erase everything';ED.msgT=120}}],['EXIT',()=>{edSave();scene='menu'}]];
function edDown(mx,my){if(my>H-48){const w=(W-70)/EBTN.length,i=Math.floor(mx/w);if(i<EBTN.length)EBTN[i][1]();edSave();return}
 if(my>H-100){const i=Math.floor((mx-6)/50);if(i>=0&&i<EDTOOLS.length)ED.tool=i;return}
 if(my<30){ED.drag={bar:1};edScrollBar(mx);return}ED.drag={x:mx,y:my,cx:ED.cx,moved:false}}
function edMove(mx,my){if(!ED.drag)return;if(ED.drag.bar){edScrollBar(mx);return}const dx=mx-ED.drag.x;if(Math.abs(dx)>12)ED.drag.moved=true;if(ED.drag.moved)ED.cx=Math.max(0,ED.drag.cx-dx)}
function edUp(mx,my){const d=ED.drag;ED.drag=null;if(d&&!d.bar&&!d.moved)edPlace(d.x,d.y)}
function edLen(){return Math.max(60,...ED.data.o.map(q=>q[1]+20))*T}
function edScrollBar(mx){ED.cx=Math.max(0,(mx-20)/(W-40)*edLen()-W/2)}
function edKey(k){if(k=='ArrowRight')ED.cx+=4*T;else if(k=='ArrowLeft')ED.cx=Math.max(0,ED.cx-4*T);else if(k>='1'&&k<='9')ED.tool=+k-1;else if(k=='Enter')edTest();else if(k=='Escape')scene='menu'}
function edIcon(tl,x,y,th){X.save();X.translate(x,y);X.scale(.85,.85);if(tl=='b')drawBlock({x:-20,y:-20,w:T,h:T},th);else if(tl=='s')drawSpike({t:'s',x:-20,y:-20},th);else if(tl=='sd')drawSpike({t:'sd',x:-20,y:-20},th);
 else if(tl=='o'||tl=='og')drawOrb({t:tl,x:-20,y:-20},0);else if(tl=='p'||tl=='pg')drawPad({t:tl,x:-20,y:-26});else if(tl=='X'){X.strokeStyle='#ff4d4d';X.lineWidth=6;X.beginPath();X.moveTo(-12,-12);X.lineTo(12,12);X.moveTo(12,-12);X.lineTo(-12,12);X.stroke()}
 else{const k=tl.slice(2);X.beginPath();X.ellipse(0,0,9,20,0,0,7);X.lineWidth=6;X.strokeStyle=MODECOL[k]||'#fff';X.stroke()}X.restore()}
function edDraw(){edLoad();const d=ED.data,th=TH[d.th],bp=beat();drawWorld(th,ED.cx,bp);const lv=edBuild();level=lv;
 X.save();X.translate(-ED.cx,0);
 // grid
 X.strokeStyle='rgba(255,255,255,.35)';X.lineWidth=1.5;const c0=Math.floor(ED.cx/T);for(let c=c0;c<c0+W/T+2;c++){X.beginPath();X.moveTo(c*T,EROW);X.lineTo(c*T,GY);X.stroke()}for(let r=0;r<=9;r++){X.beginPath();X.moveTo(ED.cx,GY-r*T);X.lineTo(ED.cx+W,GY-r*T);X.stroke()}
 // beat lines
 const bpx=E.SPEEDS[d.spd]*3600/Music.BPM(d.song);X.strokeStyle='rgba(255,230,120,.35)';X.lineWidth=2;for(let b=Math.floor(ED.cx/bpx);b*bpx<ED.cx+W;b++){X.beginPath();X.moveTo(b*bpx,EROW-10);X.lineTo(b*bpx,EROW+6);X.stroke()}
 drawCeils(th);for(const o of lv.obs){if(o.x<ED.cx-80||o.x>ED.cx+W+40)continue;if(o.t=='b')drawBlock(o,th);else if(o.t=='s'||o.t=='sd')drawSpike(o,th);else if(o.t=='p'||o.t=='pg')drawPad(o);else if(o.t=='o'||o.t=='og')drawOrb(o,bp);else if(o.t=='portal')drawPortal(o)}
 X.fillStyle='rgba(255,255,255,.9)';X.fillRect(lv.end-6*T,EROW,6,GY-EROW);txt('END',lv.end-6*T+3,EROW-6,14);
 X.save();X.translate(T*1.5+20,GY-20);cubeIcon(1);X.restore();
 if(ED.fail!=null){X.strokeStyle='#ff3b3b';X.lineWidth=4;X.setLineDash([10,8]);X.beginPath();X.moveTo(ED.fail,0);X.lineTo(ED.fail,GY);X.stroke();X.setLineDash([])}
 X.restore();
 // scroll bar
 X.fillStyle='rgba(0,0,0,.4)';rr(20,8,W-40,16,8);X.fill();const L=edLen();rr(20+(W-40)*ED.cx/L,8,Math.max(30,(W-40)*W/L),16,8);X.fillStyle='#fff';X.fill();
 // palette
 X.fillStyle='rgba(20,10,40,.75)';X.fillRect(0,H-100,W,100);EDTOOLS.forEach(([tl,nm],i)=>{const x=6+i*50;rr(x,H-96,46,46,10);P(i==ED.tool?'rgba(255,255,255,.45)':'rgba(0,0,0,.35)',i==ED.tool?4:2);edIcon(tl,x+23,H-73,th)});
 txt(EDTOOLS[ED.tool][1],W-12,H-108,16,'right');
 const w=(W-70)/EBTN.length;EBTN.forEach(([nm],i)=>{rr(i*w+4,H-46,w-8,40,10);P(nm=='▶ TEST'?'#7dff7a':nm=='EXIT'?'#ff7a7a':'rgba(255,255,255,.18)',2.5);txt(nm,i*w+w/2,H-19,15)});
 txt('LEVEL EDITOR',20,52,22,'left');txt(th.name+'  •  ♪ '+Music.SONGS[d.song].name+'  •  speed '+(d.spd+1),20,76,15,'left');txt('tap to place / tap again to remove  •  drag to scroll',W-20,52,14,'right');
 if(ED.msgT>0){ED.msgT--;X.globalAlpha=Math.min(1,ED.msgT/30);rr(W/2-260,96,520,44,12);P('rgba(0,0,0,.6)',2);txt(ED.msg,W/2,125,18);X.globalAlpha=1}}
if(QS.get('scene')=='edit'||QS.get('lvdata'))edOpen();
