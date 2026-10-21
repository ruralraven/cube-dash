// Verifier bot: depth-first search over hold/release inputs (every D frames) to prove a level is beatable.
const E=require('../js/engine.js'),LV=require('../js/levels.js');
const D=+process.env.BOTD||3;
function solve(lv,limitMs=60000){const t0=Date.now();const seen=new Set();let best=0,bestPath=null;
 const p0=E.newPlayer(lv);const stack=[{p:p0,path:[],i:0}];
 // iterative DFS: each node tries [last choice, other]
 function key(p,h){return`${Math.round(p.x/D)}|${Math.round(p.y/2)}|${Math.round(p.vy*2)}|${p.g}|${p.mode}|${p.mini}|${p.spd}|${p.jt>50?9:p.jt}|${p.onG?1:0}|${p.buf>0?1:0}|${h?1:0}`}
 const sim=(p,h)=>{const q=E.clone(p);for(let k=0;k<D;k++){E.step(q,lv,h);if(q.dead||q.won)break}return q};
 const rec=[];// path as array of 0/1 per decision
 const node=[p0];const choice=[];
 // explicit stack of {p, tried:0..2, order}
 const st=[{p:p0,k:0,order:[0,1]}];
 while(st.length){if(Date.now()-t0>limitMs)return{ok:false,best,timeout:true};const top=st[st.length-1];
  if(top.k>=2){st.pop();rec.pop();continue}
  const h=top.order[top.k++];const q=sim(top.p,h);if(q.x>best){best=q.x}
  if(q.won){rec.push(h);return{ok:true,path:rec.slice(),best:lv.end,ms:Date.now()-t0}}
  if(q.dead)continue;const kk=key(q,h);if(seen.has(kk))continue;seen.add(kk);
  rec.push(h);st.push({p:q,k:0,order:h?[1,0]:[0,1]})}
 return{ok:false,best,ms:Date.now()-t0}}
function trace(lv,path){const p=E.newPlayer(lv),pts=[];for(const h of path)for(let k=0;k<D;k++){E.step(p,lv,h);pts.push([p.x,p.y,p.sz]);if(p.won)return pts}return pts}
module.exports={solve,trace,D};
if(require.main===module){const only=process.argv[2];let fail=0;
 for(let i=0;i<LV.LEVELS.length;i++){if(only!=null&&+only!==i)continue;const lv=LV.build(i);const r=solve(lv);
  const sg=lv.segs.find(s=>r.best>=s.x0&&r.best<s.x1+200);const seg=sg?` in ${sg.m}/${sg.p} [${Math.round(sg.x0)}-${Math.round(sg.x1)}]`:'';
  console.log(`L${i} ${LV.LEVELS[i].name.padEnd(15)} ${r.ok?'BEATEN':'FAIL best x='+Math.round(r.best)+'/'+lv.end+(r.timeout?' (timeout)':'')+seg} ${r.ms||''}ms`);if(!r.ok)fail++}
 process.exit(fail?1:0)}
