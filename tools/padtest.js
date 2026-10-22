// Pad safety test (v7.7: the held-jump case now starts holding just after the pad launches, matching 'jump held mid-air'): for every jump pad, simulate a no-input launch (and a jump held mid-air) and require a safe landing.
const E=require('../js/engine.js');global.E=E;global.BAKED=undefined;const LV=require('../js/levels.js');const bot=require('./bot.js');
const D=+process.env.BOTD||3;const only=process.argv.slice(2).map(Number);
function sim(lv,p0,held){const p=E.clone(p0);let air=false,lf=-1;for(let f=0;f<150;f++){if(lf<0&&p.padF!=null&&p.padF!==p0.padF)lf=f;E.step(p,lv,held(f,lf));if(p.dead)return'DEAD@'+Math.round(p.x);if(p.won)return'ok';if(!p.onG)air=true;if(air&&p.onG)return'ok'}return'ok'}
function testLevel(lv,name){const r=bot.solve(lv,150000);if(!r.ok){console.log(name,'bot fail');return 0}
 const p=E.newPlayer(lv);const snaps=[];for(const h of r.path)for(let k=0;k<D;k++){snaps.push(E.clone(p));E.step(p,lv,!!h)}
 let bad=0;const pads=lv.obs.filter(o=>o.t=='p'||o.t=='pg');
 for(const o of pads){// last snapshot on ground before pad, within 4 tiles
  let s=null,used=false;for(const q of snaps){if(q.x+q.sz<o.x-2&&q.x>o.x-200&&q.onG)s=q;if(q.x>o.x-40&&q.x<o.x+T&&q.y+q.sz>=o.y+T-14)used=true}
  if(!s){const q=snaps.find(q=>q.x>o.x-200);if(!q)continue;s=E.clone(q);s.y=o.up===false?o.y+T:GYfix(o,s);s.vy=0;s.onG=true}
  const a=sim(lv,s,()=>false),b=sim(lv,s,(f,lf)=>lf>=0&&f>lf+3&&f<lf+25);
  if(a!='ok'||b!='ok'){bad++;console.log(name,'pad x='+o.x,'mode='+s.mode,'spd='+s.spd,'mini='+s.mini,'g='+s.g,'noInput:'+a,'held:'+b,'botUsedPad:'+used)}}
 return bad}
function GYfix(o,s){return o.y+T-s.sz}const T=E.T;
let tot=0;const L=only.length?only:[...Array(LV.LEVELS.length).keys()];for(const i of L)tot+=testLevel(LV.build(i),i+' '+LV.LEVELS[i].name);
console.log('PAD FAILURES',tot);
