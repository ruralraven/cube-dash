// Moving-hazard test: for every level, take the bot's winning run, and just before the FIRST piston of each piston group
// switch to "ground only" (no input). That run must die at that piston (collision follows the drawn, moving position).
// Also checks that every piston reaches the ground lane at some point of its cycle.
const E=require('../js/engine.js'),LV=require('../js/levels.js'),bot=require('./bot.js');const {T,GY}=E,D=bot.D;
let bad=0,checked=0;
for(let L=0;L<LV.LEVELS.length;L++){const lv=LV.build(L);const pis=lv.obs.filter(o=>o.pis);if(!pis.length)continue;
 for(const o of pis){const lo=o.y+o.h+o.mv.a;if(lo<GY-2){bad++;console.log(`L${L} ${LV.LEVELS[L].name} piston x=${o.x} never reaches the ground (lowest bottom ${Math.round(lo)})`)}}
 // first piston of each group that the player reaches running on the ground (a group can start mid-air, e.g. right after a flying section)
 const groups=[];pis.forEach((o,i)=>{if(i==0||o.x-pis[i-1].x>40*T)groups.push([]);groups[groups.length-1].push(o)});
 const r=bot.solve(lv,60000);if(!r.ok){bad++;console.log(`L${L} bot fail`);continue}
 const snaps=[];const p=E.newPlayer(lv);for(const h of r.path)for(let k=0;k<D;k++){snaps.push(E.clone(p));E.step(p,lv,!!h)}
 for(const g of groups){let o=null,s=null;for(const c of g){const rs=[...snaps].reverse();s=rs.find(q=>q.x+q.sz<c.x-T&&q.x>c.x-400&&q.onG&&q.mode=='cube');if(s){o=c;break}}if(!s){bad++;console.log(`L${L} no ground approach to any piston in group at x=${g[0].x}`);continue}
  const q=E.clone(s);let res='survived';for(let f=0;f<400;f++){E.step(q,lv,false);if(q.dead){res=(q.x+q.sz>o.x&&q.x<o.x+(o.w||T)+4)?'died at piston':'died elsewhere x='+Math.round(q.x);break}if(q.x>o.x+o.w+T)break}
  checked++;if(res!='died at piston'){bad++;console.log(`L${L} ${LV.LEVELS[L].name} piston x=${o.x}: ground-only run ${res}`)}}}
console.log('MOVING HAZARD CHECKS '+checked+'  FAILURES '+bad);process.exit(bad?1:0)
