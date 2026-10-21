// Cube Dash music engine: procedural EDM songs synthesized with Web Audio.
const Music=(()=>{
let ac=null,master,comp,dly,dlyG,noiseBuf,timer=null,song=null,step=0,nextT=0,t0=0,muted=false,duck=null;
try{muted=localStorage.cdMute==='1'}catch(e){}
const _dc={};function distCurve(k){if(_dc[k])return _dc[k];const n=1025,c=new Float32Array(n);for(let i=0;i<n;i++){const x=i/(n-1)*2-1;c[i]=(1+k)*x/(1+k*Math.abs(x))}return _dc[k]=c}
const mtof=m=>440*Math.pow(2,(m-69)/12);
const SCALES={major:[0,2,4,5,7,9,11],minor:[0,2,3,5,7,8,10],phryg:[0,1,3,5,7,8,10],dorian:[0,2,3,5,7,9,10],harm:[0,2,3,5,7,8,11]};
function init(ctx){if(ac&&!ctx)return true;const A=window.AudioContext||window.webkitAudioContext;if(!A&&!ctx)return false;ac=ctx||new A();
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
 const n=o.voices||(o.detune?2:1);let vib=null;if(o.vib){vib=ac.createOscillator();vib.frequency.value=5.5;const vg=ac.createGain();vg.gain.value=o.vib;vib.connect(vg);vib.start(t);vib.stop(t+dur+.3);vib=vg}
 for(let k=0;k<n;k++){const os=ac.createOscillator();os.type=o.wave||'sawtooth';os.frequency.value=mtof(midi)*(o.harm?o.harm[k]:1);if(o.detune&&!o.harm)os.detune.value=n==1?0:(k/(n-1)*2-1)*o.detune;if(vib)vib.connect(os.detune);
  if(o.harm){const hg=ac.createGain();hg.gain.value=1/(k+1);os.connect(hg);hg.connect(f)}else os.connect(f);os.start(t);os.stop(t+dur+.3)}
 if(o.dist){const ws=ac.createWaveShaper();ws.curve=distCurve(o.dist);f.disconnect();f.connect(ws);ws.connect(g)}
 const a=o.a||.005;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(o.vol,t+a);g.gain.setValueAtTime(o.vol,t+Math.max(a,dur*.7));g.gain.exponentialRampToValueAtTime(.0001,t+dur+.12);
 if(!o.dist)f.connect(g);g.connect(o.dest||duck);if(o.send){const s=ac.createGain();s.gain.value=o.send;g.connect(s);s.connect(dly)}}
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
 garage:{k:'x.....x...x.....',s:'....x.......x...',h:'..x.x..x..x.x..x',c:'...........x....'},
 breaks:{k:'x.....x...x..x..',s:'....x..x.x..x...',h:'x.x.x.x.x.x.x.x.',o:'..............x.'},
 moomba:{k:'x...x...x...x...',s:'...x..x....x..x.',h:'x.x.x.x.x.x.x.x.'},
 trance:{k:'x...x...x...x...',c:'....x.......x...',h:'..x...x...x...x.',o:'..x...x...x...x.'},
 halftime:{k:'x.....x...x.....',s:'........x.......',c:'........x.......',h:'x.x.x.x.x.x.x.x.'},
};
const SONGS=[];
function S(o){SONGS.push(o)}
// name,bpm,root,scale,prog(degrees per bar),drums,bass style,lead wave,seed,extras
S({name:'Bubble Pop',lift:2,sig:'drops',sig2:'chop',bpm:120,root:57,sc:'major',prog:[0,5,3,4],dr:'bounce',bass:'pluck',lead:'square',seed:3,arp:'triangle',cut:2400});
S({name:'Sugar Rush',lift:1,sig:'chip',bpm:128,root:60,sc:'major',prog:[0,4,5,3],dr:'house',dr2:'garage',bass:'offbeat',lead:'square',seed:7,arp:'square',cut:3000});
S({name:'Stardust Overdrive',lift:2,sig:'space',bpm:140,root:50,sc:'minor',prog:[0,5,2,6],dr:'halftime',dr2:'breaks',bass:'wobble',lead:'sawtooth',seed:11,arp:'sawtooth',cut:1800});
S({name:'Vine Swing',sig:'marimba',swing:.16,dr2:'moomba',bpm:124,root:55,sc:'dorian',prog:[0,3,0,4],dr:'tribal',bass:'pluck',lead:'triangle',seed:19,arp:'square',cut:2200});
S({name:'Frostbite',lift:1,sig:'bells',sig2:'gate',bpm:132,root:62,sc:'minor',prog:[0,5,3,6],dr:'trance',bass:'offbeat',lead:'triangle',seed:23,arp:'triangle',cut:4000,bell:1});
S({name:'Magma Core',sig:'distort',dr2:'breaks',dist:12,bpm:150,root:52,sc:'phryg',prog:[0,1,0,6],dr:'hard',bass:'rolling',lead:'sawtooth',seed:29,arp:'sawtooth',cut:1500});
S({name:'Spooky Spire',sig:'organ',sig2:'chop',bpm:138,root:57,sc:'harm',prog:[0,5,3,4],dr:'trap',bass:'wobble',lead:'square',seed:31,arp:'square',cut:1600});
S({name:'Gear Grinder',sig:'metal',dist:8,bpm:145,root:48,sc:'minor',prog:[0,0,5,6],dr:'industrial',bass:'rolling',lead:'square',seed:37,arp:'sawtooth',cut:1400});
S({name:'Neon Nights',lift:2,sig:'supersaw',sig2:'gate',bpm:160,root:53,sc:'minor',prog:[0,5,3,4],dr:'dnb',bass:'reese',lead:'sawtooth',seed:41,arp:'square',cut:2600});
S({name:'Rainbow Rocket',lift:1,sig:'chip',sig2:'chop',bpm:170,root:58,sc:'major',prog:[0,4,5,3],dr:'dnb',bass:'rolling',lead:'square',seed:53,arp:'square',cut:3200});
S({name:'Sandstorm Shuffle',sig:'marimba',sig2:'chop',swing:.2,bpm:126,root:54,sc:'harm',prog:[0,5,0,4],dr:'tribal',bass:'pluck',lead:'triangle',seed:61,arp:'square',cut:2400});
S({name:'Shadow King',lift:1,sig:'supersaw',sig2:'gate',dist:6,dr2:'breaks',bpm:174,root:50,sc:'harm',prog:[0,5,3,4],dr:'hard',bass:'wobble',lead:'sawtooth',seed:71,arp:'sawtooth',cut:2000});
S({name:'Spore Bounce',lift:1,sig:'drops',sig2:'chop',swing:.12,bpm:118,root:58,sc:'major',prog:[0,3,4,3],dr:'bounce',dr2:'moomba',bass:'pluck',lead:'triangle',seed:83,arp:'triangle',cut:2600,bell:1});
S({name:'Cannon Shanty',lift:2,sig:'marimba',sig2:'gate',bpm:136,root:55,sc:'dorian',prog:[0,6,5,4],dr:'house',dr2:'breaks',bass:'offbeat',lead:'square',seed:89,arp:'square',cut:2400});
S({name:'Prism Pulse',lift:2,sig:'future',sig2:'gate',bpm:150,root:61,sc:'minor',prog:[0,5,6,4],dr:'trance',dr2:'dnb',bass:'rolling',lead:'sawtooth',seed:97,arp:'triangle',cut:3000,bell:1});
S({name:'Toy Parade',lift:2,sig:'chip',sig2:'chop',bpm:112,root:60,sc:'major',prog:[0,4,3,4],dr:'bounce',dr2:'house',bass:'pluck',lead:'square',seed:101,arp:'triangle',cut:3000});
S({name:'Sakura Drift',lift:2,sig:'future',sig2:'chop',swing:.1,bpm:122,root:57,sc:'dorian',prog:[0,3,6,4],dr:'garage',dr2:'house',bass:'offbeat',lead:'triangle',seed:107,arp:'triangle',cut:2800,bell:1});
S({name:'Tick Tock Tower',sig:'metal',sig2:'gate',dist:6,bpm:142,root:52,sc:'harm',prog:[0,5,3,4],dr:'industrial',dr2:'breaks',bass:'rolling',lead:'square',seed:109,arp:'square',cut:1800});
S({name:'Abyssal Bass',lift:1,sig:'space',sig2:'gate',dist:4,bpm:156,root:49,sc:'harm',prog:[0,5,1,4],dr:'dnb',dr2:'halftime',bass:'reese',lead:'sawtooth',seed:113,arp:'triangle',cut:2200});
S({name:'Barnyard Boogie',lift:2,sig:'marimba',sig2:'chop',swing:.14,bpm:116,root:62,sc:'major',prog:[0,3,4,0],dr:'bounce',dr2:'house',bass:'pluck',lead:'triangle',seed:127,arp:'square',cut:2600});
S({name:'Dino Stomp',sig:'distort',sig2:'chop',dist:6,bpm:128,root:50,sc:'dorian',prog:[0,6,3,4],dr:'tribal',dr2:'breaks',bass:'wobble',lead:'square',seed:131,arp:'sawtooth',cut:2000});
S({name:'Maple Groove',lift:2,sig:'marimba',sig2:'chop',swing:.12,bpm:124,root:56,sc:'dorian',prog:[0,5,3,4],dr:'garage',dr2:'house',bass:'offbeat',lead:'triangle',seed:137,arp:'triangle',cut:2600,bell:1});
S({name:'Thunderhead',lift:1,sig:'supersaw',sig2:'gate',dist:4,bpm:165,root:51,sc:'minor',prog:[0,6,5,4],dr:'dnb',dr2:'breaks',bass:'reese',lead:'sawtooth',seed:139,arp:'sawtooth',cut:2400});
S({name:'Bamboo Breeze',lift:2,sig:'marimba',sig2:'chop',swing:.08,bpm:118,root:57,sc:'dorian',prog:[0,3,4,3],dr:'tribal',dr2:'garage',bass:'pluck',lead:'triangle',seed:149,arp:'triangle',cut:2600,bell:1});
S({name:'Pixel Overload',lift:1,sig:'chip',sig2:'gate',bpm:172,root:55,sc:'minor',prog:[0,5,6,4],dr:'dnb',dr2:'hard',bass:'rolling',lead:'square',seed:151,arp:'square',cut:3400});
const BPM=i=>SONGS[i%SONGS.length].bpm;
function rnd(s){return()=>(s=(s*16807)%2147483647)/2147483647}
function build(sd){// precompute melody (2 phrases of 4 bars, 16 steps each)
 const r=rnd(sd.seed*999+1),sc=SCALES[sd.sc],mel=[];const rhythms=['x.x.x..xx.x.x...','x..x..x.x..x.x..','x.xxx.x.x.xxx.x.','x...x.x.x...x.xx'];
 for(let ph=0;ph<2;ph++)for(let b=0;b<4;b++){const rh=rhythms[Math.floor(r()*4)];let deg=sd.prog[b]+[0,2,4][Math.floor(r()*3)];for(let s=0;s<16;s++){if(rh[s]=='x'){deg+=Math.floor(r()*5)-2;if(s==0)deg=sd.prog[b]+[0,2,4,7][Math.floor(r()*4)];mel.push(deg)}else mel.push(null)}}
 sd.mel=mel;return sd}
SONGS.forEach(build);
let LIFT=0;function note(sd,deg,oct=0){const sc=SCALES[sd.sc],o=Math.floor(deg/7);return sd.root+LIFT+oct*12+o*12+sc[((deg%7)+7)%7]}
// arrangement: 8 bars per section: 0 intro,1 build,2 drop,3 break,4 drop2 ... loops 1..4
function section(bar){if(bar<4)return 0;const s=Math.floor((bar-4)/8)%4;return[1,2,3,2][s]}
function drop(t,f){const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*2.6,t+.09);env(g,t,.002,.18,.12);o.connect(g);g.connect(duck);const s=ac.createGain();s.gain.value=.4;g.connect(s);s.connect(dly);o.start(t);o.stop(t+.2)}
function bell(t,midi,v){const c=ac.createOscillator(),m=ac.createOscillator(),mg=ac.createGain(),g=ac.createGain();c.type='sine';m.type='sine';c.frequency.value=mtof(midi);m.frequency.value=mtof(midi)*3.5;mg.gain.setValueAtTime(mtof(midi)*2,t);mg.gain.exponentialRampToValueAtTime(1,t+1);m.connect(mg);mg.connect(c.frequency);env(g,t,.002,v,1.2);c.connect(g);g.connect(duck);const s=ac.createGain();s.gain.value=.5;g.connect(s);s.connect(dly);c.start(t);m.start(t);c.stop(t+1.4);m.stop(t+1.4)}
function marimba(t,midi,v){const o=ac.createOscillator(),o2=ac.createOscillator(),g=ac.createGain();o.type='sine';o2.type='sine';o.frequency.value=mtof(midi);o2.frequency.value=mtof(midi)*4;const g2=ac.createGain();g2.gain.value=.25;env(g,t,.002,v,.35);o.connect(g);o2.connect(g2);g2.connect(g);g.connect(duck);o.start(t);o2.start(t);o.stop(t+.5);o2.stop(t+.5)}
function chop(t,midi,dur,v){// vocal-ish 'ah' blip: saw through two formant bandpasses
 const o=ac.createOscillator(),g=ac.createGain();o.type='sawtooth';o.frequency.value=mtof(midi);const vib=ac.createOscillator(),vg=ac.createGain();vib.frequency.value=6;vg.gain.value=12;vib.connect(vg);vg.connect(o.detune);
 [[800,v],[1150,v*.7],[2900,v*.3]].forEach(([f,a])=>{const b=ac.createBiquadFilter();b.type='bandpass';b.frequency.value=f;b.Q.value=9;const bg=ac.createGain();bg.gain.value=a*3;o.connect(b);b.connect(bg);bg.connect(g)});
 env(g,t,.01,1,dur);g.connect(duck);const s=ac.createGain();s.gain.value=.4;g.connect(s);s.connect(dly);o.start(t);vib.start(t);o.stop(t+dur+.1);vib.stop(t+dur+.1)}
function sig2(sd,st,t,sec,bar,s16,deg,spb){const S=sd.sig2;if(!S)return;
 if(S=='gate'&&sec==2&&'x.xx.xx.x.xx.x.x'[s16]=='x')[0,2,4].forEach(i=>synth(t,note(sd,deg+i,1),spb*.7,{wave:'sawtooth',vol:.022,voices:3,detune:15,cut:4500}));
 if(S=='chop'&&(sec==1||sec==3)&&'x..x..x...x.x...'[s16]=='x')chop(t,note(sd,deg+[4,2,4,7,4,2][s16%6],1),spb*1.6,.05);}
function sig(sd,st,t,sec,bar,s16,deg,spb){sig2(sd,st,t,sec,bar,s16,deg,spb);if(sec==0&&bar<2)return;const S=sd.sig,r=((st*7919)%13)/13;
 if(S=='drops'&&s16%4==3&&r<.6)drop(t,500+r*700);
 if(S=='chip'&&sec>=1&&sec!=3){const a=[0,4,7,12][s16%4];synth(t,note(sd,deg,2)+a%12+(a>=12?12:0),spb*.5,{wave:'square',vol:.035,cut:8000})}
 if(S=='marimba'&&'x.xx.x.xx.x.x.xx'[s16]=='x')marimba(t,note(sd,deg+[0,2,4,7,4][s16%5],1),.12);
 if(S=='bells'&&s16%4==0&&sec!=0)bell(t,note(sd,deg+[4,2,0,7][(s16/4)%4],2),.09);
 if(S=='organ'&&s16==0){[0,2,4].forEach(i=>synth(t,note(sd,deg+i,0),spb*15,{wave:'sine',vol:.05,harm:[1,2,3,4],cut:3000,a:.05,vib:8}))}
 if(S=='organ'&&sec==3&&s16%8==0)bell(t,note(sd,deg,1),.06);
 if(S=='metal'&&sec>=1&&(s16==3||s16==11))synth(t,note(sd,deg,1),spb*.8,{wave:'square',vol:.08,cut:1200,res:12,dist:20});
 if(S=='distort'&&sec==2&&s16%2==0)synth(t,note(sd,deg+[0,0,7,5][(s16/2)%4],0),spb*.9,{wave:'sawtooth',vol:.07,cut:1800,res:4,dist:30});
 if(S=='space'&&s16%2==0&&sec!=3)synth(t,note(sd,deg+[0,4,7,9,11,9,7,4][(s16/2)%8],2),spb*.9,{wave:'sine',vol:.04,cut:6000,send:.6});
 if(S=='future'&&sec>=1&&sec!=3&&'..x...x...x.x..x'[s16]=='x')[0,2,4,6].forEach(i=>synth(t,note(sd,deg+i,1),spb*1.2,{wave:'sawtooth',vol:.024,voices:2,detune:14,cut:sec==2?5200:2600,send:.3}));
 if(S=='future'&&sec==3&&s16%4==0)bell(t,note(sd,deg+[0,4,2,6][(s16/4)%4],2),.06);
 if(S=='supersaw'&&s16==0&&(sec==2||sec==3)){[0,2,4,7].forEach(i=>synth(t,note(sd,deg+i,1),spb*15,{wave:'sawtooth',vol:.03,voices:5,detune:22,cut:sec==2?3500:1500,a:.02,send:.25}))}
}
function sched(sd,st,t){const s16=st%16,bar=Math.floor(st/16),sec=section(bar),dr=DR[sd.dr],deg=sd.prog[bar%4],spb=60/sd.bpm/4;LIFT=bar>=4&&Math.floor((bar-4)/32)%2==1?(sd.lift||0):0;
 const d2=sd.dr2&&Math.floor((bar-4)/16)%2==1?DR[sd.dr2]:dr,on=(k)=>d2[k]&&d2[k][s16]=='x';
 if(sec!=3&&bar%8==7&&s16>=12&&bar>4)tom(t,[180,150,120,95][s16-12],.35);
 // drums
 if(on('k')&&sec!=3)kick(t,sec==0?.7:1);if(sec==3&&s16%4==0&&bar%2)kick(t,.5);
 if(sec>=1&&sec!=3){if(on('s'))snare(t);if(on('c'))clap(t)}
 if(on('h'))hat(t,sec==0?.08:.16);if(sec==2&&on('o'))hat(t,.12,true);if(on('t'))tom(t,[100,130,160][s16%3],.4);if(on('m')&&sec>=1)metal(t);
 if(sec==1&&bar%8==7&&s16>=8)snare(t,.25+.04*(s16-8)); // build roll
 if(sec==1&&bar%8==6&&s16==0){const n=ac.createBufferSource();n.buffer=noiseBuf;n.loop=true;const f=ac.createBiquadFilter();f.type='bandpass';f.Q.value=2;f.frequency.setValueAtTime(400,t);f.frequency.exponentialRampToValueAtTime(9000,t+spb*32);const g=ac.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.22,t+spb*31);g.gain.linearRampToValueAtTime(0,t+spb*32.5);n.connect(f);f.connect(g);g.connect(comp);n.start(t);n.stop(t+spb*33)} // riser
 if(sec==2&&s16%2==1)hat(t,.07);
 if(sec==2&&bar%8==0&&s16==0)noise(t,1.2,'highpass',3000,.5,.25); // crash
 sig(sd,st,t,sec,bar,s16,deg,spb);
 // bass
 if(sec>=1){const bn=note(sd,deg,-2);let p=false,dur=spb*.9,o={wave:'sawtooth',vol:.32,cut:sd.cut*.25,res:6,envAmt:4};
  if(sd.bass=='offbeat')p=s16%4==2;else if(sd.bass=='pluck')p='x..x..x...x..x..'[s16]=='x';else if(sd.bass=='rolling'){p=s16%4!=0;o.wave='square';o.vol=.22}else if(sd.bass=='reese'){p=s16%8==0;dur=spb*7.8;o.voices=3;o.detune=28;o.cut=sd.cut*(.25+.15*Math.sin(bar*1.3));o.res=5;o.vol=.24}else if(sd.bass=='wobble'){p=s16%8==0;dur=spb*7.5;o.wobble=[2,4,8,6][bar%4]*sd.bpm/120;o.cut=sd.cut*.5;o.res=8;o.vol=.3}
  if(sec==3)p=s16==0,dur=spb*15,o.vol=.15;if(p)synth(t,bn+(sd.bass=='rolling'&&s16%8==6?12:0),dur,o)}
 if(LIFT&&sec==2&&'..x...x...x..x..'[s16]=='x')[0,4].forEach(i=>synth(t,note(sd,deg+i,1),spb*.6,{wave:'square',vol:.03,cut:3500,send:.3})); // final-loop stabs
 // chords pad
 if(s16==0){const ch=[0,2,4].map(i=>note(sd,deg+i,0));ch.forEach(m=>synth(t,m,spb*15,{wave:'sawtooth',vol:sec==3?.06:.035,cut:sec==0?600:1400,a:.3,detune:12,send:.2}))}
 // arp
 if(sec>=1&&sec!=3||sec==0&&bar>=2){if(s16%2==0){const a=[0,2,4,7,4,2,7,4][(s16/2)%8];synth(t,note(sd,deg+a,1),spb*1.5,{wave:sd.arp,vol:.06,cut:sd.cut,res:3,send:.35})}}
 // lead (drops + break)
 if(sec==2&&Math.floor((bar-4)/16)%2==1){const m=sd.mel[(bar%8)*16+s16];if(m!=null)synth(t,note(sd,m+2,1),spb*1.6,{wave:'triangle',vol:.05,cut:sd.cut*1.5,send:.3})}
 if(sec==2||sec==3){const m=sd.mel[((bar+(Math.floor((bar-4)/16)%2)*4)%8)*16+s16];if(m!=null){synth(t,note(sd,m,1),spb*1.8,{wave:sd.lead,vol:(sec==3?.07:.13)*(sd.dist?.6:1),cut:sd.cut*1.2,res:2,detune:sd.lead=='sawtooth'?9:0,voices:sd.sig=='supersaw'?3:0,send:.3,dist:sd.dist,vib:sd.sig=='organ'?15:0});if(sec==2)synth(t,note(sd,m,0),spb*1.8,{wave:'square',vol:.05,cut:sd.cut*.8});if(sd.bell)synth(t,note(sd,m,2),spb*2,{wave:'sine',vol:.06,cut:6000,send:.4})}}
}
function tick(){while(nextT<ac.currentTime+.15){sched(song,step,nextT+(step%2&&song.swing?song.swing*60/song.bpm/4:0));step++;nextT+=60/song.bpm/4}}
return{SONGS,BPM,
 // test helper: render a song offline and return stats per 4-bar block
 async analyze(i,secs=40){const sr=22050,oc=new OfflineAudioContext(2,sr*secs,sr);const saved=[ac,muted];muted=false;init(oc);song=SONGS[i];step=0;nextT=.05;while(nextT<secs-.5){sched(song,step,nextT+(step%2&&song.swing?song.swing*60/song.bpm/4:0));step++;nextT+=60/song.bpm/4}
  const buf=await oc.startRendering();ac=saved[0];muted=saved[1];const d=buf.getChannelData(0),blk=Math.floor(sr*60/song.bpm*16),res=[];for(let b=0;b*blk<d.length;b++){let pk=0,ss=0;for(let k=b*blk;k<Math.min(d.length,(b+1)*blk);k++){const v=Math.abs(d[k]);if(v>pk)pk=v;ss+=v*v}res.push([+pk.toFixed(2),+Math.sqrt(ss/blk).toFixed(3)])}return res},
 start(i,bar=0){if(!init())return;if(ac.state=='suspended')ac.resume();this.stop();song=SONGS[i%SONGS.length];step=bar*16;this.vol(bar?.55:1);t0=nextT=ac.currentTime+.06;dly.delayTime.value=60/song.bpm*.75;timer=setInterval(tick,25);tick()},
 stop(){if(timer){clearInterval(timer);timer=null}},
 pause(){if(ac&&ac.state=='running')ac.suspend()},
 resume(){if(ac&&ac.state=='suspended')ac.resume()},
 sec(){const b=this.beats();return b==null?-1:section(Math.floor(b/4))},
 beats(){return timer&&ac?(ac.currentTime-t0)*song.bpm/60:null},
 get name(){return song?song.name:''},
 unlock(){if(init()&&ac.state=='suspended')ac.resume()},
 get muted(){return muted},
 get ready(){return!!ac&&ac.state=='running'},
 vol(v){if(ac&&!muted)master.gain.setTargetAtTime(.55*v,ac.currentTime,.05)},
 toggle(){muted=!muted;try{localStorage.cdMute=muted?'1':'0'}catch(e){}if(ac)master.gain.setTargetAtTime(muted?0:.55,ac.currentTime,.02)},
 sfx(kind){if(!ac||muted)return;const t=ac.currentTime;if(kind=='die'){noise(t,.4,'lowpass',900,1,.5);synth(t,40,.3,{wave:'square',vol:.15,cut:500})}else if(kind=='coin'){synth(t,84,.08,{wave:'square',vol:.08,cut:6000});synth(t+.08,91,.2,{wave:'square',vol:.08,cut:6000})}else if(kind=='portal'){synth(t,72,.15,{wave:'triangle',vol:.1,cut:5000});synth(t+.05,79,.2,{wave:'triangle',vol:.08,cut:5000})}}
};})();
if(typeof module!='undefined')module.exports=Music;
