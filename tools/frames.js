// prints the replay frame at the middle of each segment: node frames.js <lvl>
const E=require('../js/engine.js');const {BAKED,BAKED_D}=require('../js/baked.js');global.BAKED=BAKED;const LV=require('../js/levels.js');
const i=+process.argv[2],lv=LV.build(i),p=E.newPlayer(lv);const path=[];const r=BAKED[i].path;for(let k=0;k<r.length;k+=2)for(let j=0;j<r[k+1];j++)path.push(r[k]);
const segs=lv.segs.map(s=>({...s,mid:(s.x0+s.x1)/2}));let f=0;const out={};for(const h of path)for(let k=0;k<BAKED_D;k++){E.step(p,lv,h);f++;for(const s of segs)if(!s.f&&p.x>=s.mid)s.f=f}
console.log(segs.map(s=>s.m+'/'+s.p+'='+s.f).join(' '));
