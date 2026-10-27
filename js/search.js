// Level search: find levels by name across built-in worlds, My Levels and Imported (pasted codes). All local, no server.
const SR={q:'',page:0,res:[]};
function srImported(){try{const L=JSON.parse(localStorage.cdImported||'[]');return Array.isArray(L)?L:[]}catch(e){return[]}}
function srAddImported(d,name){const L=srImported();const key='cdImp'+Date.now();try{localStorage[key]=JSON.stringify(d);L.push({name:name||('Imported '+(L.length+1)),key});localStorage.cdImported=JSON.stringify(L)}catch(e){}}
function srOpen(){scene='search';SR.page=0;srRun()}
function srRun(){const q=SR.q.trim().toLowerCase(),r=[];const m=n=>!q||String(n).toLowerCase().includes(q);
 edList().forEach((l,i)=>{if(m(l.name))r.push({kind:'mine',name:l.name,i})});
 srImported().forEach((l,i)=>{if(m(l.name))r.push({kind:'imp',name:l.name,key:l.key})});
 for(let q2=0;q2<NL;q2++){const i=ORD[q2];if(m(LV.LEVELS[i].name))r.push({kind:'built',name:LV.LEVELS[i].name,i})}
 SR.res=r;SR.page=Math.min(SR.page,Math.max(0,Math.ceil(r.length/6)-1))}
function srAsk(){const v=prompt('Search levels by name:',SR.q);if(v!=null){SR.q=v.slice(0,30);SR.page=0;srRun()}}
function srKey(e){const k=e.key;if(k=='Escape'){scene='menu';return}if(k=='Delete'){SR.q='';SR.page=0;srRun();e.preventDefault();return}if(k=='Backspace'){SR.q=SR.q.slice(0,-1);SR.page=0;srRun();e.preventDefault();return}
 if(k=='Enter'){if(SR.res[SR.page*6])srPlay(SR.res[SR.page*6]);return}if(k=='ArrowRight'||k=='PageDown'){srPg(1);return}if(k=='ArrowLeft'||k=='PageUp'){srPg(-1);return}
 if(k.length==1&&SR.q.length<30){SR.q+=k;SR.page=0;srRun();e.preventDefault()}}
function srPg(d){const np=Math.max(1,Math.ceil(SR.res.length/6));SR.page=(SR.page+d+np)%np}
function srData(r){try{return JSON.parse(localStorage[r.key]||'null')}catch(e){return null}}
function srPlay(r){if(r.kind=='built'){if(!unlocked(r.i)){Music.sfx('die');return}sel=r.i;localStorage.cdSel=sel;page=Math.floor(POS(sel)/9);playSel();return}
 if(r.kind=='mine'){edPick(r.i);edTest();return}
 const d=srData(r);if(!d||!Array.isArray(d.o)){Music.sfx('die');return}edSave();ED.data=JSON.parse(JSON.stringify(d));ED.tmp=1;
 LV.LEVELS[NL+1]={name:r.name,th:d.th||0,song:d.song||0,spd:d.spd==null?1:d.spd,diff:1,custom:1};att=0;start(NL+1)}
function srEdit(r){if(r.kind=='mine'){edPick(r.i);scene='edit';Music.stop();return}const d=srData(r);if(!d)return;edNew(JSON.parse(JSON.stringify(d)),r.name+' (copy)');scene='edit';Music.stop();ED.msg='Copied to My Levels — edit away!';ED.msgT=120}
const SRTAG={mine:['MY LEVEL','#ffcf33'],imp:['IMPORTED','#7ad0ff'],built:['WORLD','#7dff7a']};
function srDraw(){drawWorld(TH[LV.LEVELS[sel].th]||TH[0],t*30,beat());X.fillStyle='rgba(20,10,40,.78)';X.fillRect(0,0,W,H);txt('🔍 SEARCH LEVELS',W/2,50,34);
 rr(140,66,680,46,14);P('rgba(255,255,255,.15)',3);txt(SR.q?SR.q+(Math.floor(t*2)%2?'|':''):'Type a name, or tap here…',160,97,20,'left',SR.q?'#fff':'#bbb');
 txt(SR.res.length+(SR.res.length==1?' level':' levels')+' found  •  your levels, imported codes and built-in worlds (all saved on this device)',W/2,130,13,'center','#ccc');
 const p0=SR.page*6;SR.res.slice(p0,p0+6).forEach((r,k)=>{const y=142+k*52;rr(140,y,680,46,12);P('rgba(0,0,0,.4)',2.5);const[tg,c]=SRTAG[r.kind];txt(tg,156,y+29,12,'left',c);
  const lock=r.kind=='built'&&!unlocked(r.i);{const pref=lock?'🔒 ':'',nm=r.name,q=SR.q.trim().toLowerCase(),mi=q?nm.toLowerCase().indexOf(q):-1;if(mi<0)txt(pref+nm,250,y+30,19,'left');else{X.font='900 19px "Arial Rounded MT Bold",Arial,sans-serif';X.textAlign='left';X.lineWidth=19/5;X.strokeStyle=OL;X.lineJoin='round';let x=250;for(const[p,c]of[[pref+nm.slice(0,mi),'#fff'],[nm.slice(mi,mi+q.length),'#ffcf33'],[nm.slice(mi+q.length),'#fff']]){if(!p)continue;X.strokeText(p,x,y+30);X.fillStyle=c;X.fillText(p,x,y+30);x+=X.measureText(p).width}}}/* v8.36 */if(r.kind=='built'){const dd=LV.LEVELS[r.i].diff;let sn=Music.SONGS[LV.LEVELS[r.i].song%Music.SONGS.length].name;if(sn.length>14)sn=sn.slice(0,13)+'…';txt(LV.DIFF[dd],408,y+22,12,'left',DCOL[dd]);txt('♪ '+sn,408,y+38,10,'left','#ccc')}/* v8.16 v8.24 */else{let sn='',n=0;try{const d=r.kind=='mine'?JSON.parse(localStorage[edList()[r.i].key]||'{}'):srData(r);sn=(Music.SONGS[(d&&d.song)||0]||{}).name||'';n=(d&&d.o||[]).length}catch(e){}if(sn){if(sn.length>14)sn=sn.slice(0,13)+'…';txt('♪ '+sn,408,y+29,12,'left','#ccc')}txt(n+(n==1?' piece':' pieces'),588,y+29,13,'right','#ccc')}/* v8.24 v8.31 */if(r.kind=='built'&&!lock){const b=save.best[r.i]||0,cc=save.coins[r.i]||[];txt(b+'%',588,y+29,15,'right',b>=100?'#7dff7a':'#fff');for(let k=0;k<3;k++){circ(500+k*16,y+23,6);P(cc[k]?'#ffcf33':'rgba(255,255,255,.22)',1.5)}}rr(600,y+6,100,34,10);P(lock?'#666':'#7dff7a',2);txt('▶ PLAY',650,y+29,15);if(r.kind!='built'){rr(710,y+6,100,34,10);P('#ff9ad5',2);txt('✏ EDIT',760,y+29,15)}});
 if(!SR.res.length){txt('No levels match "'+SR.q+'"',W/2,260,20,'center','#ffb3b3');txt('Try fewer letters, or tap CLEAR to see every level.',W/2,292,15,'center','#ddd')}
 const np=Math.max(1,Math.ceil(SR.res.length/6));if(np>1){txt('◀',100,300,30);txt('▶',860,300,30);txt('page '+(SR.page+1)+'/'+np,W/2,465,14)}
 [['CLEAR','#ffcf33',240],['BACK','#7dff7a',500]].forEach(([nm,c,x])=>{rr(x,H-62,220,46,14);P(c,3);txt(nm,x+110,H-31,18)});if(!COARSE)txt('Type to search   •   Enter plays the top level   •   Delete clears   •   Esc back',W/2,H-4,12,'center','#aaa')}// v7.59: key hint for computer players
function srDown(mx,my){if(my>66&&my<112&&mx>140&&mx<820){srAsk();return}
 if(my>H-62&&my<H-16){if(mx>240&&mx<460){SR.q='';SR.page=0;srRun()}else if(mx>500&&mx<720)scene='menu';return}
 const np=Math.max(1,Math.ceil(SR.res.length/6));if(np>1&&mx<130&&my>140){srPg(-1);return}if(np>1&&mx>830&&my>140&&my<H-70){srPg(1);return}
 for(let k=0;k<6;k++){const r=SR.res[SR.page*6+k];if(!r)break;const y=142+k*52;if(my>y&&my<y+46){if(r.kind!='built'&&mx>710&&mx<810)srEdit(r);else if(mx>140&&mx<820)srPlay(r);return}}}
