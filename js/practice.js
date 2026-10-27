// Practice mode: card buttons, pause toggle, manual checkpoints (Z/X), calm music, separate progress.
var cps=[];const PSONG=27;let pDirty=false;
function pPlace(){if(scene!='play'||!save.practice||paused||!pl||pl.dead)return;cp={x:pl.x,p:E.clone(pl),ft};cps.push(cp);ckpts.push(pl.x);Music.sfx('coin')}
function pRemove(){if(!save.practice||!cps.length)return;cps.pop();ckpts.pop();cp=cps[cps.length-1]||null;Music.sfx('portal')}
function pSetPractice(on){save.practice=on;persist()}
const PB_PLACE=[W-384,H-62,152,46],PB_REM=[W-222,H-62,148,46],inB=(b,x,y)=>x>b[0]&&x<b[0]+b[2]&&y>b[1]&&y<b[1]+b[3];
function pCard(q){const[x,y]=cardXY(q%9);return[x+190,y+62,94,26]}
addEventListener('keydown',e=>{if(scene!='play'||!save.practice||paused)return;if(e.key=='z'||e.key=='Z')pPlace();else if(e.key=='x'||e.key=='X')pRemove()});
addEventListener('pointerdown',e=>{const[mx,my]=cv(e);
 if(scene=='menu'){for(let q=page*9;q<Math.min(NL,page*9+9);q++){const i=ORD[q];if(inB(pCard(q),mx,my)){e.stopImmediatePropagation();Music.unlock();sel=i;localStorage.cdSel=sel;if(unlocked(i)){pSetPractice(true);playSel()}else Music.sfx('die');return}}}
 else if((scene=='play'||scene=='dead')&&paused&&mx>W/2-130&&mx<W/2+130&&my>372&&my<424){e.stopImmediatePropagation();pSetPractice(!save.practice);paused=false;Music.resume();att=0;start(lvl)}
 else if(scene=='play'&&save.practice&&!paused){if(inB(PB_PLACE,mx,my)){e.stopImmediatePropagation();pPlace()}else if(inB(PB_REM,mx,my)){e.stopImmediatePropagation();pRemove()}}},true);
{const _m=menu;menu=function(){_m();save.pbest=save.pbest||{};for(let q=page*9;q<Math.min(NL,page*9+9);q++){const i=ORD[q];if(!unlocked(i))continue;const b=pCard(q);rr(...b,10);P('#7dff7a',2.5);const pb=save.pbest[i];pBadgeTxt(pb?'PRACTICE '+pb+'%':'PRACTICE ▶',b)}}}
// v7.65: on phones/tablets the PLACE and REMOVE buttons hide the (Z)/(X) keyboard hints
// v7.64: badge text shrinks to fit inside the green pill and has no thick dark outline, so "PRACTICE 100%" is easy to read
function pBadgeTxt(s,b){let fs=12;const f=()=>X.font=`900 ${fs}px "Arial Rounded MT Bold",Arial,sans-serif`;f();while(fs>8&&X.measureText(s).width>b[2]-12){fs-=.5;f()}X.textAlign='center';X.fillStyle='#1a3a1a';X.fillText(s,b[0]+b[2]/2,b[1]+b[3]/2+fs*.36)}
{const _h=hud;hud=function(L){_h(L);if(save.practice&&cps.length&&(scene=='play'||scene=='dead')){const e=level.end-6*T;for(const c of cps){const bx=262+356*Math.min(1,c.x/e);X.beginPath();X.moveTo(bx,17);X.lineTo(bx+6,24);X.lineTo(bx,31);X.lineTo(bx-6,24);X.closePath();X.fillStyle='#7dff7a';X.fill();X.strokeStyle=OL;X.lineWidth=1.5;X.stroke()}}// v7.52: checkpoint diamonds on the progress bar
 if(paused){rr(W/2-130,372,260,52,16);P(save.practice?'#7dff7a':'rgba(0,0,0,.4)',3);txt('PRACTICE: '+(save.practice?'ON':'OFF'),W/2,406,22,'center',save.practice?'#1a3a1a':'#fff')}
 else if(scene=='play'&&save.practice){rr(...PB_PLACE,14);P('#7dff7a',3);txt(COARSE?'◆ PLACE':'◆ PLACE (Z)',PB_PLACE[0]+75,H-32,COARSE?18:16,'center','#1a3a1a');rr(...PB_REM,14);P(cps.length?'#ff8a8a':'rgba(0,0,0,.4)',3);txt(COARSE?'✖ REMOVE':'✖ REMOVE (X)',PB_REM[0]+71,H-32,COARSE?18:16);if(cps.length){const e=level.end-6*T,pct=Math.max(0,Math.min(100,Math.round(100*cps[cps.length-1].x/e)));txt('◆ '+cps.length+(cps.length==1?' checkpoint':' checkpoints')+' · last at '+pct+'%',W-229,H-72,13,'center','#7dff7a')}/* v8.28 */}}}
{const _s=step;step=function(){_s();if(!save.practice||replay||!LV.LEVELS[lvl]||LV.LEVELS[lvl].gen)return;save.pbest=save.pbest||{};const p=scene=='win'?100:scene=='play'||scene=='dead'?prog():0;if(p>(save.pbest[lvl]||0)){save.pbest[lvl]=p;pDirty=true}if(pDirty&&scene!='play'){pDirty=false;persist()}}}
