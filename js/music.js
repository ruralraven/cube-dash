// Cube Dash music engine: procedural EDM songs synthesized with Web Audio.
const Music=(()=>{
let ac=null,master,comp,dly,dlyG,noiseBuf,timer=null,song=null,step=0,nextT=0,t0=0,muted=false,duck=null;
try{muted=localStorage.cdMute==='1'}catch(e){}
const mtof=m=>440*Math.pow(2,(m-69)/12);
const SCALES={major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10],phryg:[0,1,3,5,7,8,10],dorian:[0,2,3,5,7,9,10],harm:[0,2,3,5,7,8,11]};
function init(){if(ac)return true;const A=window.AudioContext||window.webkitAudioContext;if(!A)return false;ac=new A();
 comp=ac.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;master=ac.createGain();master.gain.value=muted?0:.55;comp.connect(master);master.connect(ac.destination);
 duck=ac.createGain();duck.connect(comp);
 dly=ac.createDelay(1);dlyG=ac.createGain();dlyG.gain.value=.32;dly.connect(dlyG);dlyG.connect(dly);const dOut=ac.createGain();dOut.gain.value=.35;dly.connect(dOut);dOut.connect(duck);
 noiseBuf=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return true}
function env(g,t,a,peak,dec,sus=0.0001){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(Math.max(sus,0.0001),t+a+dec)}
function noise(t,dur,type,f,q,vol,dest=comp){const s=ac.createBufferSource();s.buffer=noiseBuf;const fl=ac.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;const g=ac.createGain();env(g,t,.002,vol,dur);s.connect(fl);fl.connect(g);g.connect(dest);s.start(t,Math.random()*.5);s.stop(t+dur+.05)}
function kick(t,v=1){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(42,t+.12);env(g,t,.002,v,.32);o.connect(g);g.connect(comp);o.start(t);o.stop(t+.4);
 // sidechain duck
 duck.gain.cancelScheduledValues(t);duck.gain.setValueAtTime(.25,t);duck.gain.linearRampToValueAtTime(1,t+.22)}
function snare(t,v=.6){noise(t,.18,'highpass',1500,.7,v);const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.setValueAtTime(220,t);o.frequency.exponentialRampToValueAtTime(140,t+.08);env(g,t,.002,v*.6,.1);o.connect(g);g.connect(comp);o.start(t);o.stop(t+.2)}
function clap(t,v=.5){for(let k=0;k<3;k++)noise(t+k*.012,.09+k*.03,'bandpass',1200,1.2,v)}
function hat(t,v=.18,open=false){noise(t,open?.22:.04,'highpass',8000,.5,v)}
function tom(t,f=110,v=.5){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(f*1.6,t);o.frequency.exponentialRampToValueAtTime(f,t+.15);env(g,t,.003,v,.3);o.connect(g);g.connect(comp);o.start(t);o.stop(t+.4)}
function metal(t,v=.15){[540,800,1170,1630].forEach(f=>{const o=ac.createOscillator(),g=ac.createGain();o.type='square';o.frequency.value=f;env(g,t,.001,v/3,.08);o.connect(g);g.connect(comp);o.start(t);o.stop(t+.12)})}
function synth(t,midi,dur,o){// o:{wave,vol,cut,res,env,detune,dest,a,glide,wobble}
 const g=ac.createGain(),f=ac.createBiquadFilter();f.type='lowpass';f.Q.value=o.res||1;const cut=o.cut||2000;
 f.frequency.setValueAtTime(cut*(o.envAmt||3),t);f.frequency.exponentialRampToValueAtTime(cut,t+Math.min(dur,.25));
 if(o.wobble){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=o.wobble;lg.gain.value=cut*.9;l.connect(lg);lg.connect(f.frequency);l.start(t);l.stop(t+dur+.1)}
 const n=o.detune?2:1;for(let k=0;k<n;k++){const os=ac.createOscillator();os.type=o.wave||'sawtooth';os.frequency.value=mtof(midi);if(o.detune)os.detune.value=k?o.detune:-o.detune;os.connect(f);os.start(t);os.stop(t+dur+.3)}
 const a=o.a||.005;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(o.vol,t+a);g.gain.setValueAtTime(o.vol,t+Math.max(a,dur*.7));g.gain.exponentialRampToValueAtTime(.0001,t+dur+.12);
 f.connect(g);g.connect(o.dest||duck);if(o.send){const s=ac.createGain();s.gain.value=o.send;g.connect(s);s.connect(dly)}}
// ---- song definitions ----
// drums: 16-step strings per instrument; k kick s snare c clap h hat o openhat t tom m metal
const DR={
 house:{k:'x...x...x...x...',c:'....x.......x...',h:'..x...x...x...x.',o:'......x.......x.'},
 bounce:{k:'x.....x...x.....',s:'....x.......x...',h:'x.x.x.x.x.x.x.xx'},
 trap:{k:'x.......x.x.....',s:'........x.......',h:'x.x.x.xxx.x.x.xx'},
 tribal:{k:'x...x...x...x...',t:'..x..x....x..x.x',h:'x.xx.x.xx.xx.x.x',c:'....x.......x...'},
 dnb:{k:'x.........x.....',s:'....x.......x...',h:'x.x.x.x.x.x.x.x.'},
 industrial:{k:'x..x..x...x..x..',s:'....x.......x...',m:'..x...x...x...x.',h:'xxxxxxxxxxxxxxxx'},
 hard:{k:'x...x...x...x...',s:'....x.......x...',c:'....x.......x..x',h:'.xxx.xxx.xxx.xxx',o:'..x...x...x...x.'},
 halftime:{k:'x.....x...x.....',s:'........x.......',c:'........x.......',h:'x.x.x.x.x.x.x.x.'},
};
const SONGS=[];
function S(o){SONGS.push(o)}
// name,bpm,root,scale,prog(degrees per bar),drums,bass style,lead wave,seed,extras
S({name:'Bubble Pop',bpm:120,root:57,sc:'major',prog:[0,5,3,4],dr:'bounce',bass:'pluck',lead:'square',seed:3,arp:'triangle',cut:2400});
S({name:'Sugar Rush',bpm:128,root:60,sc:'major',prog:[0,4,5,3],dr:'house',bass:'offbeat',lead:'square',seed:7,arp:'square',cut:3000});
S({name:'Stardust Overdrive',bpm:140,root:50,sc:'minor',prog:[0,5,2,6],dr:'halftime',bass:'wobble',lead:'sawtooth',seed:11,arp:'sawtooth',cut:1800});
S({name:'Vine Swing',bpm:124,root:55,sc:'dorian',prog:[0,3,0,4],dr:'tribal',bass:'pluck',lead:'triangle',seed:19,arp:'square',cut:2200});
S({name:'Frostbite',bpm:132,root:62,sc:'minor',prog:[0,5,3,6],dr:'house',bass:'offbeat',lead:'triangle',seed:23,arp:'triangle',cut:4000,bell:1});
S({name:'Magma Core',bpm:150,root:52,sc:'phryg',prog:[0,1,0,6],dr:'hard',bass:'rolling',lead:'sawtooth',seed:29,arp:'sawtooth',cut:1500});
S({name:'Spooky Spire',bpm:138,root:57,sc:'harm',prog:[0,5,3,4],dr:'trap',bass:'wobble',lead:'square',seed:31,arp:'square',cut:1600});
S({name:'Gear Grinder',bpm:145,root:48,sc:'minor',prog:[0,0,5,6],dr:'industrial',bass:'rolling',lead:'square',seed:37,arp:'sawtooth',cut:1400});
S({name:'Neon Nights',bpm:160,root:53,sc:'minor',prog:[0,5,3,4],dr:'dnb',bass:'rolling',lead:'sawtooth',seed:41,arp:'square',cut:2600});
const BPM=i=>SONGS[i%SONGS.length].bpm;
function rnd(s){return()=>(s=(s*16807)%2147483647)/2147483647}
function build(sd){// precompute melody (2 phrases of 4 bars, 16 steps each)
 const r=rnd(sd.seed*999+1),sc=SCALES[sd.sc],mel=[];const rhythms=['x.x.x..xx.x.x...','x..x..x.x..x.x..','x.xxx.x.x.xxx.x.','x...x.x.x...x.xx'];
 for(let ph=0;ph<2;ph++)for(let b=0;b<4;b++){const rh=rhythms[Math.floor(r()*4)];let deg=sd.prog[b]+[0,2,4][Math.floor(r()*3)];for(let s=0;s<16;s++){if(rh[s]=='x'){deg+=Math.floor(r()*5)-2;if(s==0)deg=sd.prog[b]+[0,2,4,7][Math.floor(r()*4)];mel.push(deg)}else mel.push(null)}}
 sd.mel=mel;return sd}
SONGS.forEach(build);
function note(sd,deg,oct=0){const sc=SCALES[sd.sc],o=Math.floor(deg/7);return sd.root+oct*12+o*12+sc[((deg%7)+7)%7]}
// arrangement: 8 bars per section: 0 intro,1 build,2 drop,3 break,4 drop2 ... loops 1..4
function section(bar){if(bar<4)return 0;const s=Math.floor((bar-4)/8)%4;return[1,2,3,2][s]}
function sched(sd,st,t){const s16=st%16,bar=Math.floor(st/16),sec=section(bar),dr=DR[sd.dr],deg=sd.prog[bar%4],spb=60/sd.bpm/4;
 const on=(k)=>dr[k]&&dr[k][s16]=='x';
 // drums
 if(on('k')&&sec!=3)kick(t,sec==0?.7:1);if(sec==3&&s16%4==0&&bar%2)kick(t,.5);
 if(sec>=1&&sec!=3){if(on('s'))snare(t);if(on('c'))clap(t)}
 if(on('h'))hat(t,sec==0?.08:.16);if(sec==2&&on('o'))hat(t,.12,true);if(on('t'))tom(t,[100,130,160][s16%3],.4);if(on('m')&&sec>=1)metal(t);
 if(sec==1&&bar%8==7&&s16>=8)snare(t,.25+.04*(s16-8)); // build roll
 if(sec==2&&bar%8==0&&s16==0)noise(t,1.2,'highpass',3000,.5,.25); // crash
 // bass
 if(sec>=1){const bn=note(sd,deg,-2);let p=false,dur=spb*.9,o={wave:'sawtooth',vol:.32,cut:sd.cut*.25,res:6,envAmt:4};
  if(sd.bass=='offbeat')p=s16%4==2;else if(sd.bass=='pluck')p='x..x..x...x..x..'[s16]=='x';else if(sd.bass=='rolling'){p=s16%4!=0;o.wave='square';o.vol=.22}else if(sd.bass=='wobble'){p=s16%8==0;dur=spb*7.5;o.wobble=[2,4,8,6][bar%4]*sd.bpm/120;o.cut=sd.cut*.5;o.res=8;o.vol=.3}
  if(sec==3)p=s16==0,dur=spb*15,o.vol=.15;if(p)synth(t,bn+(sd.bass=='rolling'&&s16%8==6?12:0),dur,o)}
 // chords pad
 if(s16==0){const ch=[0,2,4].map(i=>note(sd,deg+i,0));ch.forEach(m=>synth(t,m,spb*15,{wave:'sawtooth',vol:sec==3?.06:.035,cut:sec==0?600:1400,a:.3,detune:12,send:.2}))}
 // arp
 if(sec>=1&&sec!=3||sec==0&&bar>=2){if(s16%2==0){const a=[0,2,4,7,4,2,7,4][(s16/2)%8];synth(t,note(sd,deg+a,1),spb*1.5,{wave:sd.arp,vol:.06,cut:sd.cut,res:3,send:.35})}}
 // lead (drops + break)
 if(sec==2||sec==3){const m=sd.mel[(bar%8)*16+s16];if(m!=null){synth(t,note(sd,m,1),spb*1.8,{wave:sd.lead,vol:sec==3?.07:.1,cut:sd.cut*1.2,res:2,detune:sd.lead=='sawtooth'?9:0,send:.3});if(sd.bell)synth(t,note(sd,m,2),spb*2,{wave:'sine',vol:.06,cut:6000,send:.4})}}
}
function tick(){while(nextT<ac.currentTime+.15){sched(song,step,nextT);step++;nextT+=60/song.bpm/4}}
return{SONGS,BPM,
 start(i){if(!init())return;if(ac.state=='suspended')ac.resume();this.stop();song=SONGS[i%SONGS.length];step=0;t0=nextT=ac.currentTime+.06;dly.delayTime.value=60/song.bpm*.75;timer=setInterval(tick,25);tick()},
 stop(){if(timer){clearInterval(timer);timer=null}},
 unlock(){if(init()&&ac.state=='suspended')ac.resume()},
 get muted(){return muted},
 toggle(){muted=!muted;try{localStorage.cdMute=muted?'1':'0'}catch(e){}if(ac)master.gain.setTargetAtTime(muted?0:.55,ac.currentTime,.02)},
 sfx(kind){if(!ac||muted)return;const t=ac.currentTime;if(kind=='die'){noise(t,.4,'lowpass',900,1,.5);synth(t,40,.3,{wave:'square',vol:.15,cut:500})}else if(kind=='coin'){synth(t,84,.08,{wave:'square',vol:.08,cut:6000});synth(t+.08,91,.2,{wave:'square',vol:.08,cut:6000})}else if(kind=='portal'){synth(t,72,.15,{wave:'triangle',vol:.1,cut:5000});synth(t+.05,79,.2,{wave:'triangle',vol:.08,cut:5000})}}
};})();
if(typeof module!='undefined')module.exports=Music;
