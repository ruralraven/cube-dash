// In-browser verifier bot (same DFS as tools/bot.js): proves generated Daily/Random runs are beatable before you play them.
const BOT=(()=>{const Ex=typeof E!='undefined'?E:require('./engine.js');
function solve(lv,limitMs=3000,D=3){const t0=Date.now(),seen=new Set();let best=0;const p0=Ex.newPlayer(lv),rec=[],st=[{p:p0,k:0,order:[0,1]}];
 const key=(p,h)=>`${Math.round(p.x/D)}|${Math.round(p.y/2)}|${Math.round(p.vy*2)}|${p.g}|${p.mode}|${p.mini}|${p.spd}|${p.jt>50?9:p.jt}|${p.onG?1:0}|${p.buf>0?1:0}|${h?1:0}`;
 const sim=(p,h)=>{const q=Ex.clone(p);for(let k=0;k<D;k++){Ex.step(q,lv,h);if(q.dead||q.won)break}return q};
 while(st.length){if(Date.now()-t0>limitMs)return{ok:false,best,timeout:true};const top=st[st.length-1];
  if(top.k>=2){st.pop();rec.pop();continue}const h=top.order[top.k++],q=sim(top.p,h);if(q.x>best)best=q.x;
  if(q.won){rec.push(h);return{ok:true,path:rec.slice(),D,ms:Date.now()-t0}}if(q.dead)continue;const kk=key(q,h);if(seen.has(kk))continue;seen.add(kk);rec.push(h);st.push({p:q,k:0,order:h?[1,0]:[0,1]})}
 return{ok:false,best,ms:Date.now()-t0}}
return{solve}})();
if(typeof module!='undefined')module.exports=BOT;
