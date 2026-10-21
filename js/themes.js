// Cube Dash themes: 9 detailed cartoon worlds + drawing helpers.
const C=document.getElementById('c'),X=C.getContext('2d'),W=960,H=540,T=40,GY=420;
const hash=i=>{let x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const OL='#1b1030';
function P(fill,lw=4){X.fillStyle=fill;X.fill();X.lineWidth=lw;X.strokeStyle=OL;X.lineJoin='round';X.stroke()}
function circ(x,y,r){X.beginPath();X.arc(x,y,r,0,7)}
function rr(x,y,w,h,r){X.beginPath();X.roundRect(x,y,w,h,r)}
function slots(cam,p,w,fn){const o=cam*p,s=Math.floor(o/w)-1;for(let i=s;i<s+W/w+3;i++)fn(i,i*w-o)}
// ---------- THEMES ----------
const TH0=[
{name:'Under the Sea',speed:6,seed:11,len:70,density:.55,
 sky:['#5fd4ff','#1683c9','#0a3d7a'],ground:'#f4d27a',groundDk:'#d9a94e',
 bg(cam,t){
  // light rays
  X.save();X.globalAlpha=.13;X.fillStyle='#fff';for(let i=0;i<6;i++){const x=(i*190-cam*.05)%1140-90+Math.sin(t*.5+i)*20;X.beginPath();X.moveTo(x,0);X.lineTo(x+70,0);X.lineTo(x+220,H);X.lineTo(x+100,H);X.fill()}X.restore();
  // far rocks
  slots(cam,.15,260,(i,x)=>{const h=90+hash(i)*90;X.beginPath();X.moveTo(x-20,GY);X.quadraticCurveTo(x+60,GY-h,x+130,GY-h*.8);X.quadraticCurveTo(x+220,GY-h*1.1,x+290,GY);P('#2a6f9e',3)});
  // jellyfish
  for(let j=0;j<4;j++){const x=((j*290-cam*.25)%1160+1160)%1160-100,y=110+j*40+Math.sin(t*1.5+j)*25;jelly(x,y,t+j,['#ff8de0','#c7a0ff','#7ff3ff','#ffb36b'][j])}
  // fish schools
  for(let s=0;s<3;s++){const bx=((t*(60+s*25)+s*400-cam*.35)%1400+1400)%1400-200,by=90+s*90;for(let k=0;k<6;k++)fish(bx+(k%3)*34+(k>2?17:0),by+(k>2?22:0)+Math.sin(t*3+k)*4,['#ffcf3d','#ff6b6b','#5effa4'][s],t+k)}
  // mid coral, seaweed, treasure
  slots(cam,.5,150,(i,x)=>{const k=hash(i+3);if(k<.35)seaweed(x+40,GY,t,i);else if(k<.7)coral(x+60,GY,i);else if(k<.8)treasure(x+40,GY,t);else{seaweed(x+20,GY,t,i);coral(x+90,GY,i+9)}});
  // bubbles
  X.lineWidth=2.5;for(let b=0;b<30;b++){const x=(hash(b)*W*1.3-cam*.6*(.5+hash(b+5))%(W*1.3)+W*1.3)%(W*1.3)-50,y=H-((t*(30+hash(b+2)*50)+hash(b+9)*H)%(H+40));circ(x+Math.sin(t*2+b)*6,y,3+hash(b+1)*7);X.fillStyle='rgba(255,255,255,.25)';X.fill();X.strokeStyle='rgba(255,255,255,.8)';X.stroke()}
 },
 groundDeco(x,i){if(hash(i)<.3){X.beginPath();X.ellipse(x+20,GY+30,10,7,0,0,7);P('#ff9ec4',3)}else if(hash(i)<.45){star5(x+20,GY+40,10,'#ff8a3d')}},
 spike:['#ff3b5c','#ffd0da'],block:['#8a7bb0','#b6a8d8']},
{name:'Candy Land',speed:7.2,seed:23,len:85,density:.65,
 sky:['#ffd6f5','#ffa8dc','#c99bff'],ground:'#ff7fbf',groundDk:'#e0559d',
 bg(cam,t){
  slots(cam,.08,300,(i,x)=>{cotton(x+80,70+hash(i)*90+Math.sin(t+i)*6,40+hash(i+1)*25)});
  slots(cam,.2,220,(i,x)=>{const c=['#7fffb0','#ffe66b','#8fd0ff','#ff9a9a'][i&3&&Math.floor(hash(i)*4)],h=110+hash(i+2)*80;X.beginPath();X.moveTo(x-30,GY);X.quadraticCurveTo(x-30,GY-h,x+90,GY-h);X.quadraticCurveTo(x+210,GY-h,x+210,GY);P(c,4);X.fillStyle='rgba(255,255,255,.6)';X.beginPath();X.ellipse(x+40,GY-h+25,22,9,-.3,0,7);X.fill();for(let s=0;s<5;s++){X.fillStyle='#fff';circ(x+hash(i*7+s)*200-10,GY-hash(i*3+s)*h*.7-15,3);X.fill()}});
  slots(cam,.5,170,(i,x)=>{const k=hash(i+4);if(k<.4)lolli(x+60,GY,t,i);else if(k<.7)cane(x+60,GY);else{gumdrop(x+50,GY,['#ff4d6d','#4dd2ff','#ffcf33','#9b5cff'][i&3])}});
  for(let s=0;s<45;s++){const x=(hash(s)*W*1.2-cam*.7%(W*1.2)+W*1.2)%(W*1.2)-40,y=(t*(40+hash(s+3)*40)+hash(s+7)*H)%H;X.save();X.translate(x,y);X.rotate(t*2+s);X.fillStyle=['#ff4d6d','#4dd2ff','#ffe14d','#7dff7a','#fff'][s%5];X.strokeStyle=OL;X.lineWidth=1.5;rr(-6,-2.5,12,5,2.5);X.fill();X.stroke();X.restore()}
 },
 groundDeco(x,i){X.fillStyle='#fff';for(let k=0;k<3;k++){circ(x+hash(i*3+k)*40,GY+15+hash(i+k)*90,4);X.fill()}if(i%2==0){X.fillStyle='#ffe0f0';X.beginPath();X.moveTo(x,GY+2);X.quadraticCurveTo(x+10,GY+22,x+20,GY+2);X.quadraticCurveTo(x+30,GY+26,x+40,GY+2);X.fill()}},
 spike:['#ff2e4d','#ffffff'],block:['#7a4a2b','#a5683f']},
{name:'INSANE Outer Space',speed:9.6,seed:37,len:110,density:.85,
 sky:['#1a0638','#2b0b5e','#050214'],ground:'#4b3a8c',groundDk:'#2c2163',
 bg(cam,t){
  for(let n=0;n<4;n++){const x=((n*330-cam*.03)%1320+1320)%1320-200,y=120+n*70%250;const g=X.createRadialGradient(x,y,10,x,y,220);g.addColorStop(0,['rgba(255,80,200,.35)','rgba(80,200,255,.3)','rgba(150,90,255,.35)','rgba(255,150,60,.25)'][n]);g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.fillRect(x-220,y-220,440,440)}
  for(let s=0;s<90;s++){const x=(hash(s)*W*1.5-cam*(.05+hash(s+1)*.1)%(W*1.5)+W*1.5)%(W*1.5),y=hash(s+2)*GY,a=.5+.5*Math.sin(t*3+s);X.fillStyle=`rgba(255,255,255,${a})`;if(s%9==0)star5(x,y,4+a*3,'#fff6a8',1.5);else{circ(x,y,1+hash(s+4)*1.8);X.fill()}}
  slots(cam,.1,520,(i,x)=>planet(x+200,110+hash(i)*120,30+hash(i+1)*40,i,t));
  slots(cam,.3,260,(i,x)=>{if(hash(i+8)<.6)asteroid(x+100,80+hash(i)*260,14+hash(i+2)*22,t*(hash(i)-.5)*2,i)});
  {const x=((t*120-cam*.2)%1500+1500)%1500-200,y=90+Math.sin(t*2)*30;ufo(x,y,t)}
  slots(cam,.55,200,(i,x)=>{if(hash(i+5)<.5)crystalDeco(x+50,GY,i)});
 },
 groundDeco(x,i){if(hash(i)<.35){X.beginPath();X.ellipse(x+20,GY+25+hash(i+1)*40,12,5,0,0,7);P('#2c2163',2.5)}X.fillStyle='rgba(120,255,240,.5)';if(i%3==0){circ(x+10,GY+70,2.5);X.fill()}},
 spike:['#2ff7ff','#ff4dff'],block:['#5b6b8c','#9ab0d6']}];
// ---------- deco drawers ----------
function star5(x,y,r,c,lw=3){X.beginPath();for(let k=0;k<10;k++){const a=k*Math.PI/5-Math.PI/2,rr=k%2?r*.45:r;X.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}X.closePath();P(c,lw)}
function jelly(x,y,t,c){X.lineWidth=3;X.strokeStyle=c;for(let k=0;k<4;k++){X.beginPath();X.moveTo(x-12+k*8,y);for(let s=1;s<6;s++)X.lineTo(x-12+k*8+Math.sin(t*4+s+k)*5,y+s*8);X.stroke()}X.beginPath();X.arc(x,y,20,Math.PI,0);X.quadraticCurveTo(x,y+8,x-20,y);P(c,3.5);X.fillStyle='rgba(255,255,255,.6)';X.beginPath();X.ellipse(x-7,y-10,5,3,-.5,0,7);X.fill();X.fillStyle=OL;circ(x-6,y-3,2.2);X.fill();circ(x+6,y-3,2.2);X.fill()}
function fish(x,y,c,t){X.beginPath();X.moveTo(x-12,y);X.lineTo(x-22,y-8+Math.sin(t*8)*2);X.lineTo(x-22,y+8+Math.sin(t*8)*2);X.closePath();P(c,2.5);X.beginPath();X.ellipse(x,y,14,9,0,0,7);P(c,2.5);X.fillStyle='#fff';circ(x+6,y-2,3.5);X.fill();X.fillStyle=OL;circ(x+7,y-2,1.8);X.fill()}
function seaweed(x,y,t,i){const h=90+hash(i)*70;for(let k=0;k<2;k++){X.beginPath();X.moveTo(x+k*16,y);for(let s=1;s<=8;s++){X.lineTo(x+k*16+Math.sin(t*1.8+s*.6+k+i)*s*1.8,y-s*h/8)}for(let s=8;s>=0;s--){X.lineTo(x+k*16+10+Math.sin(t*1.8+s*.6+k+i)*s*1.8-s*.9,y-s*h/8)}X.closePath();P(k?'#2fbf71':'#46e08a',3)}}
function coral(x,y,i){const c=['#ff7aa8','#ff9f43','#b072ff'][i%3];X.lineCap='round';const br=(x0,y0,a,l,d)=>{const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;X.lineWidth=d*3+6;X.strokeStyle=OL;X.beginPath();X.moveTo(x0,y0);X.lineTo(x1,y1);X.stroke();X.lineWidth=d*3+1;X.strokeStyle=c;X.stroke();if(d>0){br(x1,y1,a-.5,l*.72,d-1);br(x1,y1,a+.45,l*.72,d-1)}else{circ(x1,y1,5);P(c,2.5)}};br(x,y,-Math.PI/2,32+hash(i)*14,3)}
function treasure(x,y,t){rr(x-28,y-36,56,36,5);P('#a8642a',4);X.beginPath();X.moveTo(x-28,y-36);X.quadraticCurveTo(x,y-60,x+28,y-36);P('#c27a35',4);rr(x-6,y-34,12,14,3);P('#ffd23d',3);for(let k=0;k<3;k++){const a=.5+.5*Math.sin(t*4+k*2);X.globalAlpha=a;star5(x-18+k*18,y-58-k%2*8,5,'#fff6a0',2);X.globalAlpha=1}}
function cotton(x,y,r){const cs=[[-r*.8,0,r*.6],[-r*.2,-r*.4,r*.7],[r*.6,-r*.1,r*.6],[0,r*.1,r*.6]];X.fillStyle=OL;for(const[a,b,c]of cs){circ(x+a,y+b,c+4);X.fill()}X.fillStyle='#ffc2e8';for(const[a,b,c]of cs){circ(x+a,y+b,c);X.fill()}X.fillStyle='rgba(255,255,255,.7)';X.beginPath();X.ellipse(x-r*.3,y-r*.6,r*.3,r*.12,0,0,7);X.fill()}
function lolli(x,y,t,i){rr(x-4,y-110,8,110,3);P('#fff',3);X.save();X.translate(x,y-130);X.rotate(t*(i%2?1:-1));circ(0,0,30);P(['#ff4d8d','#4dc3ff','#ffd23d'][i%3],4);X.strokeStyle='#fff';X.lineWidth=6;X.beginPath();for(let a=0;a<14;a+=.2)X.lineTo(Math.cos(a)*a*2,Math.sin(a)*a*2);X.stroke();X.restore()}
function cane(x,y){X.lineCap='round';X.beginPath();X.moveTo(x,y);X.lineTo(x,y-100);X.arc(x+18,y-100,18,Math.PI,0);X.lineWidth=20;X.strokeStyle=OL;X.stroke();X.lineWidth=13;X.strokeStyle='#fff';X.stroke();X.setLineDash([10,10]);X.strokeStyle='#ff3355';X.stroke();X.setLineDash([])}
function gumdrop(x,y,c){X.beginPath();X.moveTo(x-34,y);X.quadraticCurveTo(x-34,y-62,x,y-62);X.quadraticCurveTo(x+34,y-62,x+34,y);X.closePath();P(c,4);X.fillStyle='rgba(255,255,255,.8)';for(let k=0;k<7;k++){circ(x-22+hash(k+x)*44,y-12-hash(k*3)*40,2.2);X.fill()}X.beginPath();X.ellipse(x-12,y-45,8,4,-.6,0,7);X.fill()}
function planet(x,y,r,i,t){const c=['#ff8a5c','#5cc8ff','#c77dff','#7dff9e'][i&3];X.save();X.lineWidth=4;X.strokeStyle=OL;if(i%2){X.beginPath();X.ellipse(x,y,r*1.7,r*.45,-.3,Math.PI,2*Math.PI);X.stroke()}circ(x,y,r);P(c,4);X.save();X.clip();X.fillStyle='rgba(0,0,0,.18)';circ(x+r*.4,y+r*.4,r);X.fill();X.fillStyle='rgba(255,255,255,.25)';X.fillRect(x-r,y-r*.2,r*2,r*.18);X.restore();if(i%2){X.beginPath();X.ellipse(x,y,r*1.7,r*.45,-.3,0,Math.PI);X.lineWidth=8;X.strokeStyle=OL;X.stroke();X.lineWidth=4;X.strokeStyle='#ffe28a';X.stroke()}X.restore()}
function asteroid(x,y,r,a,i){X.save();X.translate(x,y);X.rotate(a);X.beginPath();for(let k=0;k<9;k++){const ang=k/9*7,rr=r*(.75+hash(i*9+k)*.35);X.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr)}X.closePath();P('#8a7a96',3);X.fillStyle='#6a5a78';circ(r*.2,-r*.2,r*.22);X.fill();circ(-r*.3,r*.3,r*.15);X.fill();X.restore()}
function ufo(x,y,t){X.fillStyle='rgba(150,255,170,.18)';X.beginPath();X.moveTo(x-12,y+10);X.lineTo(x+12,y+10);X.lineTo(x+40,y+150);X.lineTo(x-40,y+150);X.fill();X.beginPath();X.ellipse(x,y-8,18,16,0,Math.PI,0);P('#aef3ff',3);X.beginPath();X.ellipse(x,y,44,13,0,0,7);P('#b0b8c8',4);for(let k=0;k<5;k++){X.fillStyle=(Math.floor(t*6)+k)%2?'#ffe14d':'#ff4dff';circ(x-32+k*16,y+2,3.5);X.fill()}X.fillStyle='#7dff7a';circ(x,y-10,6);X.fill()}
function crystalDeco(x,y,i){X.globalAlpha=.55;for(let k=0;k<3;k++){const h=30+hash(i+k)*40,w=10+k*2;X.beginPath();X.moveTo(x+k*18-w,y);X.lineTo(x+k*18,y-h);X.lineTo(x+k*18+w,y);X.closePath();P(['#7a5cff','#4dd2ff','#ff7ad9'][k],3)}X.globalAlpha=1}

// ---- block detail styles for original worlds ----
TH0[0].blockFx=(x,y,w,h,c)=>{X.fillStyle=c;for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){circ(x+i*T+12,y+j*T+12,6);X.fill();circ(x+i*T+28,y+j*T+26,4);X.fill()}X.fillStyle='#46e08a';X.fillRect(x,y,w,6)};
TH0[1].blockFx=(x,y,w,h,c)=>{X.strokeStyle=c;X.lineWidth=3;for(let k=10;k<w;k+=10){X.beginPath();X.moveTo(x+k,y);X.lineTo(x+k,y+h);X.stroke()}X.fillStyle='#fff';X.fillRect(x,y,w,7);X.fillStyle='#ff4d8d';X.fillRect(x,y+5,w,3)};
TH0[2].blockFx=(x,y,w,h,c)=>{X.strokeStyle=c;X.lineWidth=2;for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){X.strokeRect(x+i*T+6,y+j*T+6,T-12,T-12);X.fillStyle='#2ff7ff';circ(x+i*T+9,y+j*T+9,2.5);X.fill()}};
TH0[0].pulse='#bff4ff';TH0[1].pulse='#fff';TH0[2].pulse='#c9a0ff';TH0[2].name='Outer Space';
// ---- extra deco drawers ----
function palm(x,y,t,i){const h=150+hash(i)*60,sw=Math.sin(t*1.2+i)*6;X.lineCap='round';X.lineWidth=18;X.strokeStyle=OL;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+20,y-h/2,x+sw,y-h);X.stroke();X.lineWidth=11;X.strokeStyle='#a86b3c';X.stroke();
 for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.sin(t+k)*.08;X.beginPath();X.moveTo(x+sw,y-h);X.quadraticCurveTo(x+sw+Math.cos(a)*45,y-h-30+Math.sin(a)*10,x+sw+Math.cos(a)*80,y-h+Math.abs(Math.sin(a))*25+20);X.lineWidth=14;X.strokeStyle=OL;X.stroke();X.lineWidth=8;X.strokeStyle=k%2?'#3fcf5a':'#2fa84a';X.stroke()}
 X.fillStyle='#6b3d1f';circ(x+sw-6,y-h+8,7);X.fill();circ(x+sw+7,y-h+10,7);X.fill()}
function bush(x,y,r,c){X.fillStyle=OL;for(let k=0;k<4;k++){circ(x-r+k*r*.66,y-r*.4-hash(k+x)*r*.4,r*.62+3);X.fill()}X.fillStyle=c;for(let k=0;k<4;k++){circ(x-r+k*r*.66,y-r*.4-hash(k+x)*r*.4,r*.62);X.fill()}}
function parrot(x,y,t,c){const f=Math.sin(t*14)*10;X.beginPath();X.ellipse(x,y,16,9,0,0,7);P(c,3);X.beginPath();X.moveTo(x-4,y);X.lineTo(x-14,y-12-f);X.lineTo(x+6,y-2);X.closePath();P('#ffd23d',2.5);X.beginPath();X.moveTo(x-14,y+2);X.lineTo(x-32,y+8);X.lineTo(x-14,y+6);P('#4dc3ff',2);circ(x+15,y-4,7);P(c,3);X.beginPath();X.moveTo(x+21,y-6);X.lineTo(x+28,y-2);X.lineTo(x+20,y);P('#ffb030',2);X.fillStyle=OL;circ(x+16,y-6,1.8);X.fill()}
function vine(x,t,i){const L=80+hash(i)*120;X.lineWidth=5;X.strokeStyle='#2c7a3a';X.beginPath();X.moveTo(x,0);for(let s=1;s<=10;s++)X.lineTo(x+Math.sin(t*1.5+i+s*.3)*s*1.6,s*L/10);X.stroke();for(let s=2;s<=10;s+=2){const lx=x+Math.sin(t*1.5+i+s*.3)*s*1.6,ly=s*L/10;X.beginPath();X.ellipse(lx+6,ly,7,4,.6,0,7);P('#46d060',2)}}
function pine(x,y,s,snow){for(let k=0;k<3;k++){const w=(34-k*8)*s,yy=y-k*26*s;X.beginPath();X.moveTo(x-w,yy);X.lineTo(x,yy-44*s);X.lineTo(x+w,yy);X.closePath();P('#2f7f6a',3);if(snow){X.beginPath();X.moveTo(x-w*.45,yy-24*s);X.lineTo(x,yy-44*s);X.lineTo(x+w*.45,yy-24*s);X.quadraticCurveTo(x,yy-18*s,x-w*.45,yy-24*s);X.fillStyle='#fff';X.fill()}}rr(x-5*s,y,10*s,14*s,2);P('#7a4a2b',2.5)}
function penguin(x,y,t){const b=Math.abs(Math.sin(t*6))*3;X.beginPath();X.ellipse(x,y-18-b,14,19,Math.sin(t*6)*.15,0,7);P('#2a2a40',3);X.beginPath();X.ellipse(x+3,y-15-b,9,14,0,0,7);X.fillStyle='#fff';X.fill();X.fillStyle=OL;circ(x+5,y-28-b,2);X.fill();X.beginPath();X.moveTo(x+9,y-26-b);X.lineTo(x+17,y-24-b);X.lineTo(x+9,y-22-b);P('#ffa030',1.5)}
function bat(x,y,t){const f=Math.sin(t*16)*9;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x-14,y-14-f,x-28,y-4-f);X.quadraticCurveTo(x-18,y-2,x-14,y+4);X.quadraticCurveTo(x-6,y,x,y+6);X.quadraticCurveTo(x+6,y,x+14,y+4);X.quadraticCurveTo(x+18,y-2,x+28,y-4-f);X.quadraticCurveTo(x+14,y-14-f,x,y);P('#3a2050',2.5);X.fillStyle='#ffe14d';circ(x-4,y,1.8);X.fill();circ(x+4,y,1.8);X.fill()}
function ghost(x,y,t,a){X.globalAlpha=a;X.beginPath();X.arc(x,y,20,Math.PI,0);for(let k=0;k<=4;k++)X.lineTo(x+20-k*10,y+26+Math.sin(t*6+k)*4*(k%2?1:-1));X.closePath();P('#f2ecff',3);X.fillStyle=OL;X.beginPath();X.ellipse(x-7,y-2,3,5,0,0,7);X.fill();X.beginPath();X.ellipse(x+7,y-2,3,5,0,0,7);X.fill();X.beginPath();X.ellipse(x,y+9,4,3+Math.sin(t*3),0,0,7);X.fill();X.globalAlpha=1}
function tomb(x,y,i){X.beginPath();X.moveTo(x-18,y);X.lineTo(x-18,y-34);X.arc(x,y-34,18,Math.PI,0);X.lineTo(x+18,y);X.closePath();P('#8a8aa8',3);X.strokeStyle='#5a5a78';X.lineWidth=3;X.beginPath();X.moveTo(x,y-42);X.lineTo(x,y-20);X.moveTo(x-8,y-34);X.lineTo(x+8,y-34);X.stroke()}
function deadTree(x,y,i){X.lineCap='round';const br=(x0,y0,a,l,d)=>{const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;X.lineWidth=d*3+3;X.strokeStyle='#2a1838';X.beginPath();X.moveTo(x0,y0);X.lineTo(x1,y1);X.stroke();if(d>0){br(x1,y1,a-.55,l*.7,d-1);br(x1,y1,a+.4,l*.68,d-1)}};br(x,y,-Math.PI/2,50+hash(i)*30,4)}
function gear(x,y,r,a,c,n=10){X.save();X.translate(x,y);X.rotate(a);X.beginPath();for(let k=0;k<n*2;k++){const an=k/(n*2)*Math.PI*2,rr2=k%2?r:r*.82;X.lineTo(Math.cos(an-.12)*rr2,Math.sin(an-.12)*rr2);X.lineTo(Math.cos(an+.12)*rr2,Math.sin(an+.12)*rr2)}X.closePath();P(c,3);circ(0,0,r*.3);P('#2b3440',3);X.restore()}
function building(x,y,w,h,i,t,bp){rr(x,y-h,w,h+4,4);P('#1a1240',3);for(let r=0;r<h/22-1;r++)for(let k=0;k<w/18-1;k++){const on=hash(i*31+r*7+k)>(.45-.25*bp);X.fillStyle=on?['#ff4dd2','#4df0ff','#ffe14d'][(i+r)%3]:'#2a2058';X.fillRect(x+8+k*18,y-h+10+r*22,9,12)}}
function car(x,y,c){rr(x-22,y-8,44,14,7);P(c,2.5);rr(x-10,y-15,20,9,4);P('#aef3ff',2);X.fillStyle='#fff8';X.fillRect(x+22,y-4,30,3)}
// ---- new worlds ----
const TH1=[
{name:'Jungle Jump',sky:['#bff07a','#5cc96a','#1f7a4a'],ground:'#6b4a2b',groundDk:'#4e3420',pulse:'#eaffb0',trail:'#d4ff9e',
 bg(cam,t){X.fillStyle='rgba(255,250,200,.5)';circ(780,90,50);X.fill();
  slots(cam,.1,300,(i,x)=>{const h=140+hash(i)*80;X.beginPath();X.moveTo(x-40,GY);X.lineTo(x+110,GY-h);X.lineTo(x+260,GY);P('#3f9a5a',3)});
  slots(cam,.22,180,(i,x)=>bush(x+90,GY-10,40+hash(i)*20,'#2f8f4a'));
  slots(cam,.4,260,(i,x)=>palm(x+100,GY,t,i));
  slots(cam,.6,220,(i,x)=>{if(hash(i+2)<.6)vine(x+60,t,i)});
  for(let k=0;k<3;k++){const x=((t*(90+k*30)+k*500-cam*.3)%1400+1400)%1400-150;parrot(x,90+k*50+Math.sin(t*2+k)*15,t+k,['#ff4d4d','#4d7dff','#ffcf33'][k])}
  for(let f=0;f<20;f++){const x=(hash(f)*W*1.2-cam*.5%(W*1.2)+W*1.2)%(W*1.2),y=200+hash(f+1)*200+Math.sin(t*2+f)*20;X.fillStyle=`rgba(255,255,140,${.4+.4*Math.sin(t*5+f)})`;circ(x,y,3);X.fill()}
  slots(cam,.75,140,(i,x)=>{if(hash(i+9)<.5)bush(x+60,GY+6,24,'#3fbf5a')})},
 groundDeco(x,i){if(hash(i)<.4){X.beginPath();X.ellipse(x+20,GY+30+hash(i+1)*50,9,5,.4,0,7);P('#8a6a3b',2)}if(i%2==0){X.fillStyle='#3fbf5a';X.beginPath();X.moveTo(x,GY);X.lineTo(x+10,GY+12);X.lineTo(x+20,GY);X.lineTo(x+30,GY+10);X.lineTo(x+40,GY);X.fill()}},
 spike:['#ff5a3a','#ffd0a0'],block:['#8a6a4a','#6b4f33'],blockFx:(x,y,w,h,c)=>{X.strokeStyle=c;X.lineWidth=3;for(let j=0;j<h;j+=20){X.beginPath();X.moveTo(x,y+j+10);X.lineTo(x+w,y+j+10);X.stroke()}X.fillStyle='#3fbf5a';X.fillRect(x,y,w,8);for(let k=0;k<w;k+=10){circ(x+k+5,y+8,5);X.fill()}}},
{name:'Ice Kingdom',sky:['#e8f6ff','#a8d8ff','#6a8fe0'],ground:'#f2fbff',groundDk:'#bfe4f7',pulse:'#ffffff',trail:'#ffffff',
 bg(cam,t,bp){for(let a=0;a<3;a++){X.beginPath();X.moveTo(0,60+a*30);for(let x=0;x<=W;x+=40)X.lineTo(x,60+a*30+Math.sin(x*.01+t*(.6+a*.2)+a)*25);X.lineTo(W,140+a*30);for(let x=W;x>=0;x-=40)X.lineTo(x,120+a*30+Math.sin(x*.012+t*.7+a)*25);X.fillStyle=['rgba(120,255,200,','rgba(160,140,255,','rgba(120,220,255,'][a]+(.18+.15*bp)+')';X.fill()}
  slots(cam,.06,600,(i,x)=>{const bx=x+200;for(let k=0;k<5;k++){const h=110+(k==2?90:k%2*40),tx=bx+k*44;rr(tx,GY-h-20,36,h+20,3);P('#cfe8ff',3);X.beginPath();X.moveTo(tx-6,GY-h-20);X.lineTo(tx+18,GY-h-70);X.lineTo(tx+42,GY-h-20);X.closePath();P('#7fb4ff',3);X.fillStyle='#ffe98a';rr(tx+12,GY-h+10,12,18,6);X.fill()}});
  slots(cam,.15,280,(i,x)=>{const h=120+hash(i)*90;X.beginPath();X.moveTo(x-50,GY);X.lineTo(x+120,GY-h);X.lineTo(x+290,GY);P('#a9c8f0',3);X.beginPath();X.moveTo(x+80,GY-h+45);X.lineTo(x+120,GY-h);X.lineTo(x+160,GY-h+45);X.lineTo(x+140,GY-h+35);X.lineTo(x+120,GY-h+50);X.lineTo(x+100,GY-h+35);X.closePath();X.fillStyle='#fff';X.fill()});
  slots(cam,.45,130,(i,x)=>{if(hash(i)<.6)pine(x+60,GY,.9+hash(i+1)*.5,true);else if(hash(i)<.75)penguin(x+60+Math.sin(t+i)*10,GY,t+i)});
  for(let s=0;s<60;s++){const x=(hash(s)*W*1.3-cam*.5*(.4+hash(s+3))%(W*1.3)+W*1.3)%(W*1.3)+Math.sin(t*1.5+s)*12,y=(t*(30+hash(s+5)*40)+hash(s+7)*H)%H;X.fillStyle='#fff';circ(x,y,1.5+hash(s+2)*2.5);X.fill()}},
 groundDeco(x,i){if(hash(i)<.3){X.fillStyle='#d4eefc';X.beginPath();X.ellipse(x+20,GY+30+hash(i)*40,14,5,0,0,7);X.fill()}if(i%3==0){X.fillStyle='#9fd8ff';star5(x+20,GY+60,5,'#e8fbff',1.5)}},
 spike:['#6fe0ff','#e6fbff'],block:['#8fd8ff','#d8f6ff'],blockFx:(x,y,w,h,c)=>{X.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){X.beginPath();X.moveTo(x+i*T+6,y+j*T+24);X.lineTo(x+i*T+22,y+j*T+6);X.lineTo(x+i*T+30,y+j*T+6);X.lineTo(x+i*T+8,y+j*T+32);X.fill()}X.fillStyle='#fff';X.fillRect(x,y,w,6)}},
{name:'Lava Volcano',sky:['#ffb26b','#e0452f','#4a0f1f'],ground:'#3a2a30',groundDk:'#24181d',pulse:'#ffcf6b',trail:'#ffb347',
 bg(cam,t,bp){slots(cam,.05,900,(i,x)=>{const vx=x+300;X.beginPath();X.moveTo(vx-260,GY);X.lineTo(vx-50,GY-250);X.lineTo(vx+50,GY-250);X.lineTo(vx+260,GY);P('#5a2a3a',4);X.fillStyle='#ff7a2a';X.beginPath();X.moveTo(vx-50,GY-250);X.quadraticCurveTo(vx-30,GY-200,vx-40,GY-150);X.lineTo(vx-30,GY-150);X.quadraticCurveTo(vx-10,GY-210,vx+10,GY-250);X.fill();
   for(let k=0;k<14;k++){const ph=(t*.9+k/14)%1,px=vx+Math.sin(k*2.3)*ph*120,py=GY-250-Math.sin(ph*Math.PI)*170-ph*30;X.fillStyle=`rgba(255,${120+k*8},40,${1-ph})`;circ(px,py,8*(1-ph)+3);X.fill()}
   X.fillStyle=`rgba(255,200,80,${.3+.4*bp})`;X.beginPath();X.ellipse(vx,GY-252,55,10,0,0,7);X.fill()});
  slots(cam,.2,200,(i,x)=>{const h=80+hash(i)*120;X.beginPath();X.moveTo(x,GY);X.lineTo(x+30,GY-h);X.lineTo(x+55,GY-h+20);X.lineTo(x+80,GY);P('#2e1a24',3);if(hash(i+1)<.4){X.fillStyle='#ff8a2a';X.fillRect(x+34,GY-h+10,6,h-10)}});
  slots(cam,.5,170,(i,x)=>{if(hash(i+3)<.5){X.beginPath();X.moveTo(x+20,GY);X.lineTo(x+40,GY-60-hash(i)*40);X.lineTo(x+60,GY);P('#4a3038',3)}});
  for(let e=0;e<45;e++){const x=(hash(e)*W*1.3-cam*.6%(W*1.3)+W*1.3)%(W*1.3),y=H-((t*(40+hash(e+2)*70)+hash(e+5)*H)%H);X.fillStyle=`rgba(255,${150+hash(e)*100},50,${.8*hash(e+9)+.2})`;circ(x+Math.sin(t*3+e)*8,y,1.5+hash(e+1)*2.5);X.fill()}},
 groundDeco(x,i){X.strokeStyle='#ff6a1a';X.lineWidth=3;if(hash(i)<.5){X.beginPath();X.moveTo(x,GY+20+hash(i)*30);X.lineTo(x+15,GY+40);X.lineTo(x+30,GY+30+hash(i+1)*40);X.lineTo(x+40,GY+60);X.stroke()}if(i%4==0){X.fillStyle='#ff8a2a';X.beginPath();X.ellipse(x+20,GY+90,16,6,0,0,7);X.fill()}},
 spike:['#4a2228','#ff8a2a'],glow:'#ff8a2a',block:['#5a3a3a','#ff7a2a'],blockFx:(x,y,w,h,c)=>{X.strokeStyle=c;X.lineWidth=3;for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){const bx=x+i*T,by=y+j*T;X.beginPath();X.moveTo(bx+8,by+6);X.lineTo(bx+18,by+20);X.lineTo(bx+12,by+34);X.moveTo(bx+18,by+20);X.lineTo(bx+32,by+24);X.stroke()}X.fillStyle='#ff9a3a';X.fillRect(x,y,w,5)}},
{name:'Haunted Castle',sky:['#5a3a8a','#2a1a50','#100820'],ground:'#4a4258',groundDk:'#2e2838',pulse:'#c9a0ff',trail:'#b9ffcf',
 bg(cam,t,bp){X.fillStyle='#fff8d0';circ(760,100,56);X.fill();X.fillStyle='rgba(255,248,200,.15)';circ(760,100,80+bp*10);X.fill();X.fillStyle='#e8e0b0';circ(740,90,9);X.fill();circ(775,118,6);X.fill();
  slots(cam,.07,700,(i,x)=>{const bx=x+100;X.fillStyle='#1c1030';X.fillRect(bx,GY-190,260,190);for(let k=0;k<4;k++){const tx=bx-20+k*86,th=230+(k%2)*50;X.fillRect(tx,GY-th,50,th);X.beginPath();X.moveTo(tx-8,GY-th);X.lineTo(tx+25,GY-th-50);X.lineTo(tx+58,GY-th);X.fill();X.fillStyle=Math.sin(t*3+k+i)>-.3?'#ffcf4d':'#5a4a20';rr(tx+18,GY-th+30,14,20,7);X.fill();X.fillStyle='#1c1030'}for(let k=0;k<12;k++)X.fillRect(bx+k*22,GY-202,12,14)});
  slots(cam,.25,240,(i,x)=>{if(hash(i)<.5)deadTree(x+80,GY,i)});
  for(let k=0;k<5;k++){const x=((t*(70+k*25)+k*300-cam*.3)%1300+1300)%1300-100;bat(x,80+k*40+Math.sin(t*3+k)*20,t+k)}
  for(let k=0;k<3;k++){const x=((k*420-cam*.35+Math.sin(t*.7+k)*60)%1260+1260)%1260-100;ghost(x,180+k*50+Math.sin(t*1.7+k)*20,t+k,.55+.25*Math.sin(t+k))}
  slots(cam,.55,150,(i,x)=>{if(hash(i+4)<.45)tomb(x+60,GY,i)});
  X.fillStyle='rgba(200,180,255,.15)';for(let k=0;k<6;k++){X.beginPath();X.ellipse(((k*220-cam*.8)%1320+1320)%1320-100,GY-10,140,26,0,0,7);X.fill()}},
 groundDeco(x,i){if(hash(i)<.25){X.fillStyle='#ece6d0';rr(x+8,GY+40,24,6,3);X.fill();circ(x+8,GY+43,4);X.fill();circ(x+32,GY+43,4);X.fill()}if(hash(i+2)<.3){X.fillStyle='#3a3448';X.beginPath();X.ellipse(x+20,GY+80,12,5,0,0,7);X.fill()}},
 spike:['#ece6d0','#a89c80'],glow:'#b9ffcf',block:['#6a5a8a','#4a3e66'],blockFx:(x,y,w,h,c)=>{X.strokeStyle=c;X.lineWidth=3;for(let j=0;j<h;j+=20){X.beginPath();X.moveTo(x,y+j);X.lineTo(x+w,y+j);X.stroke();for(let k=(j/20%2)*20;k<w;k+=40){X.beginPath();X.moveTo(x+k,y+j);X.lineTo(x+k,y+j+20);X.stroke()}}X.fillStyle='rgba(120,255,160,.35)';X.fillRect(x,y,w,4)}},
{name:'Robot Factory',sky:['#9ad0d8','#4a7a8a','#1e3640'],ground:'#4a5260',groundDk:'#2e343e',pulse:'#ffd23d',trail:'#ffe14d',
 bg(cam,t,bp){slots(cam,.08,260,(i,x)=>gear(x+130,140+hash(i)*120,50+hash(i+1)*40,t*(i%2?.6:-.6),'#3a6070',12));
  slots(cam,.2,320,(i,x)=>{X.fillStyle='#5a6a78';X.fillRect(x,40,22,GY-40);X.strokeStyle=OL;X.lineWidth=3;X.strokeRect(x,40,22,GY-40);for(let k=0;k<3;k++){X.fillStyle='rgba(255,255,255,'+(.25-((t*.6+k/3)%1)*.25)+')';circ(x+11+((t*.6+k/3)%1)*30,40-((t*.6+k/3)%1)*30,10+((t*.6+k/3)%1)*20);X.fill()}
   const py=GY-60-Math.abs(Math.sin(t*2+i))*80;X.fillStyle='#8a9aa8';X.fillRect(x+100,40,16,py-40);rr(x+80,py,56,26,4);P('#ffcf33',3)});
  slots(cam,.35,200,(i,x)=>{rr(x+10,GY-50,180,16,8);P('#3a3f4a',3);for(let k=0;k<9;k++){X.fillStyle='#ffcf33';X.fillRect(x+16+((k*20+t*80)%170),GY-46,8,8)}rr(x+60,GY-90,40,40,4);P('#c88a4a',3)});
  slots(cam,.5,160,(i,x)=>{if(hash(i)<.5)gear(x+70,GY-30,28,t*2*(i%2?1:-1),'#8a9aa8',8)});
  for(let k=0;k<8;k++){const ph=(t*2+k*.37)%1;if(ph<.3){const sx=((k*170-cam*.5)%1360+1360)%1360-200,sy=GY-120;for(let s=0;s<6;s++){X.fillStyle='#ffe14d';circ(sx+Math.cos(s)*ph*90,sy+Math.sin(s*2)*ph*60+ph*ph*80,2.5);X.fill()}}}},
 groundDeco(x,i){X.fillStyle='#ffcf33';X.beginPath();X.moveTo(x,GY+8);X.lineTo(x+20,GY+8);X.lineTo(x+40,GY+28);X.lineTo(x+20,GY+28);X.fill();X.fillStyle='#22262e';X.beginPath();X.moveTo(x+20,GY+8);X.lineTo(x+40,GY+8);X.lineTo(x+40,GY+28);X.fill();X.fillStyle='#6a7280';circ(x+20,GY+70,3);X.fill()},
 spike:['#c8d0dc','#6a7280'],saw:'#ff5a3a',sawIn:'#ffd23d',glow:'#ffcf33',block:['#7a8898','#4a5668'],blockFx:(x,y,w,h,c)=>{X.fillStyle=c;for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){[[6,6],[34,6],[6,34],[34,34]].forEach(([a,b])=>{circ(x+i*T+a,y+j*T+b,2.5);X.fill()})}X.fillStyle='#ffcf33';X.fillRect(x,y,w,6);X.fillStyle='#22262e';for(let k=0;k<w;k+=12){X.beginPath();X.moveTo(x+k,y);X.lineTo(x+k+6,y);X.lineTo(x+k,y+6);X.fill()}}},
{name:'Neon City',sky:['#2a0a4a','#7a1a8a','#ff6a8a'],ground:'#120828',groundDk:'#ff4dd2',pulse:'#ff4dd2',trail:'#4df0ff',
 bg(cam,t,bp){const sy=GY-60;const g=X.createLinearGradient(0,sy-170,0,sy);g.addColorStop(0,'#ffe14d');g.addColorStop(1,'#ff4d8d');X.fillStyle=g;X.beginPath();X.arc(W/2,sy,170+bp*6,Math.PI,0);X.fill();X.fillStyle='#7a1a8a';for(let k=0;k<6;k++)X.fillRect(W/2-180,sy-14-k*20,360,3+k*.6);
  slots(cam,.12,150,(i,x)=>building(x,GY,110+hash(i)*30,120+hash(i+1)*150,i,t,0));
  slots(cam,.3,200,(i,x)=>{building(x+20,GY,90,90+hash(i+7)*120,i+50,t,bp);if(hash(i+3)<.5){X.save();X.shadowColor='#4df0ff';X.shadowBlur=14+bp*10;X.strokeStyle=['#4df0ff','#ff4dd2','#ffe14d'][i%3];X.lineWidth=4;rr(x+30,GY-200-hash(i)*40,70,26,8);X.stroke();X.restore()}});
  for(let k=0;k<4;k++){const x=((t*(160+k*50)+k*400-cam*.4)%1500+1500)%1500-200;car(x,70+k*36,['#4df0ff','#ff4dd2','#ffe14d','#7dff7a'][k])}
  X.strokeStyle=`rgba(255,77,210,${.25+.35*bp})`;X.lineWidth=2;for(let k=0;k<10;k++){X.beginPath();X.moveTo(0,GY-k*k*1.2);X.lineTo(W,GY-k*k*1.2);X.stroke()}},
 groundDeco(x,i){X.strokeStyle='rgba(77,240,255,.6)';X.lineWidth=2;X.beginPath();X.moveTo(x,GY);X.lineTo(x+(x-W/2)*.6,H);X.stroke();X.beginPath();X.moveTo(x,GY+40+(i%2)*40);X.lineTo(x+40,GY+40+(i%2)*40);X.stroke()},
 spike:['#ff2ec8','#ffffff'],glow:'#ff2ec8',block:['#1a1040','#4df0ff'],blockFx:(x,y,w,h,c)=>{X.save();X.shadowColor=c;X.shadowBlur=12;X.strokeStyle=c;X.lineWidth=3;X.strokeRect(x+5,y+5,w-10,h-10);X.restore();X.fillStyle='rgba(77,240,255,.25)';for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){X.beginPath();X.moveTo(x+i*T+8,y+j*T+32);X.lineTo(x+i*T+32,y+j*T+8);X.lineTo(x+i*T+32,y+j*T+18);X.lineTo(x+i*T+18,y+j*T+32);X.fill()}}}];
// level theme order: 0 Sea,1 Candy,2 Jungle,3 Ice,4 Lava,5 Haunted,6 Factory,7 Space,8 Neon
const TH=[TH0[0],TH0[1],TH1[0],TH1[1],TH1[2],TH1[3],TH1[4],TH0[2],TH1[5]];
