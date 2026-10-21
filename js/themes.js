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
// ---- foreground layer (drawn in the ground strip, in front of everything, faster parallax) ----
function pumpkin(x,y,bp){X.beginPath();X.ellipse(x,y,22,17,0,0,7);P('#ff8a1a',3);X.strokeStyle='#c85a00';X.lineWidth=2;X.beginPath();X.ellipse(x,y,9,17,0,0,7);X.stroke();rr(x-3,y-23,6,8,2);P('#3a6a2a',2);X.fillStyle=`rgba(255,${220+bp*35},80,${.6+.4*bp})`;X.beginPath();X.moveTo(x-11,y-4);X.lineTo(x-5,y-10);X.lineTo(x-2,y-3);X.fill();X.beginPath();X.moveTo(x+11,y-4);X.lineTo(x+5,y-10);X.lineTo(x+2,y-3);X.fill();X.beginPath();X.moveTo(x-10,y+4);X.lineTo(x,y+10);X.lineTo(x+10,y+4);X.lineTo(x,y+7);X.fill()}
function mushroom(x,y,c){rr(x-5,y-16,10,16,4);P('#fff3d6',2.5);X.beginPath();X.arc(x,y-16,16,Math.PI,0);X.closePath();P(c,3);X.fillStyle='#fff';circ(x-6,y-24,3);X.fill();circ(x+6,y-21,2.5);X.fill()}
const FG=[
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.3){X.beginPath();X.ellipse(x,GY+70,30,16,0,0,7);P('#c9a45a',3)}else if(k<.5)star5(x,GY+80,13,'#ff7a5c',3);else if(k<.65){X.beginPath();X.moveTo(x-16,GY+92);X.quadraticCurveTo(x,GY+60,x+16,GY+92);P('#ffb3d0',3)}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.35)gumdrop(x,GY+100,['#ff4d6d','#4dd2ff','#ffcf33','#9b5cff'][i&3]);else if(k<.5){X.save();X.translate(x,GY+80);X.rotate(1.2);cane(0,40);X.restore()}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.3)mushroom(x,GY+95,['#ff4d4d','#ffb030'][i&1]);else if(k<.6){for(let b=0;b<5;b++){X.beginPath();X.moveTo(x+b*6,GY+110);X.quadraticCurveTo(x+b*6+Math.sin(t*2+b+i)*8,GY+70,x+b*9-10,GY+50+b*4);X.lineWidth=5;X.strokeStyle=OL;X.stroke();X.lineWidth=3;X.strokeStyle='#4fd860';X.stroke()}}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.35){X.beginPath();X.ellipse(x,GY+100,46,22,0,Math.PI,0);X.closePath();X.fillStyle='#ffffff';X.fill();X.lineWidth=3;X.strokeStyle='#bfe4f7';X.stroke()}else if(k<.55){X.save();X.shadowColor='#bff';X.shadowBlur=8+bp*10;X.beginPath();X.moveTo(x-8,GY+100);X.lineTo(x,GY+60);X.lineTo(x+8,GY+100);X.closePath();P('#9fe8ff',3);X.restore()}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.4){X.save();X.shadowColor='#ff8a2a';X.shadowBlur=10+bp*15;X.beginPath();X.ellipse(x,GY+85,40,12,0,0,7);P('#ff7a1a',3);X.restore();X.fillStyle='#ffe14d';const b=(t*1.5+hash(i))%1;circ(x-10+hash(i+1)*20,GY+85-b*14,4*(1-b)+1);X.fill()}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.35)pumpkin(x,GY+80,bp);else if(k<.5){rr(x-5,GY+62,10,26,3);P('#f2ecd8',2.5);X.fillStyle=`rgba(255,200,80,${.7+.3*Math.sin(t*12+i)})`;X.beginPath();X.ellipse(x,GY+55,4,8,0,0,7);X.fill()}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.35){rr(x-40,GY+70,80,18,9);P('#6a7280',3);rr(x-6,GY+64,12,30,3);P('#8a9aa8',2.5)}else if(k<.55){rr(x-10,GY+64,20,28,4);P('#3a3f4a',3);X.save();X.shadowColor='#ff3b1a';X.shadowBlur=12*bp;circ(x,GY+62,7);P(bp>.4?'#ff3b1a':'#7a1a10',2);X.restore()}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.35){X.beginPath();X.ellipse(x,GY+85,34,10,0,0,7);P('#3a2c70',3);X.beginPath();X.ellipse(x,GY+83,24,6,0,0,7);X.fillStyle='#2c2163';X.fill()}else if(k<.5){X.globalAlpha=.6+.4*bp;crystalDeco(x-20,GY+100,i);X.globalAlpha=1}},
 (x,i,t,bp)=>{const k=hash(i*3);if(k<.3){X.save();X.shadowColor='#4df0ff';X.shadowBlur=10+bp*14;rr(x-3,GY+40,6,60,3);P('#2a2058',2);circ(x,GY+40,8);P(bp>.3?'#ffffff':'#4df0ff',2);X.restore()}else if(k<.45){X.save();X.shadowColor='#ff4dd2';X.shadowBlur=12;X.strokeStyle='#ff4dd2';X.lineWidth=3;rr(x-26,GY+60,52,22,6);X.stroke();X.restore()}}];
TH.forEach((th,i)=>th.fg=FG[i]);
// ---- secret world: Rainbow Sky ----
function balloon(x,y,t,c){const s=Math.sin(t*1.3)*4;X.strokeStyle=OL;X.lineWidth=2;X.beginPath();X.moveTo(x-12,y+30+s);X.lineTo(x-8,y+50+s);X.moveTo(x+12,y+30+s);X.lineTo(x+8,y+50+s);X.stroke();X.beginPath();X.arc(x,y+s,28,Math.PI*.85,Math.PI*.15);X.quadraticCurveTo(x,y+40+s,x-24,y+15+s);P(c,3);X.fillStyle='rgba(255,255,255,.4)';X.beginPath();X.ellipse(x,y+s,8,26,0,0,7);X.fill();rr(x-9,y+48+s,18,12,3);P('#c27a35',2.5)}
function island(x,y,w,t,i){X.beginPath();X.moveTo(x-w/2,y);X.lineTo(x+w/2,y);X.lineTo(x+w*.15,y+w*.55);X.lineTo(x-w*.2,y+w*.4);X.closePath();P('#b8865a',3);rr(x-w/2-4,y-10,w+8,14,7);P('#5fdc6a',3);if(i%2){X.fillStyle='rgba(160,220,255,.8)';X.fillRect(x+w*.3-5,y+4,10,120);for(let k=0;k<4;k++){X.fillStyle='#fff';circ(x+w*.3,y+4+((t*80+k*30)%120),3);X.fill()}}pine(x-w*.2,y-10,.5,false)}
TH.push({name:'Rainbow Sky',sky:['#9fe6ff','#ffd6f5','#ffb6c8'],ground:'#ffffff',groundDk:'#ffd6f5',pulse:'#ff7ad9',trail:'#ffe14d',glow:'#ff7ad9',
 bg(cam,t,bp){const rc=['#ff5c5c','#ffa83d','#ffe14d','#7dff7a','#4dc3ff','#b07dff'];X.lineWidth=14;for(let k=0;k<6;k++){X.strokeStyle=rc[k];X.globalAlpha=.55+.2*bp;X.beginPath();X.arc(W*.6-cam*.02%200,GY+40,330-k*14,Math.PI,0);X.stroke()}X.globalAlpha=1;
  slots(cam,.08,320,(i,x)=>{cotton(x+100,60+hash(i)*80,34+hash(i+2)*20)});
  slots(cam,.18,380,(i,x)=>island(x+150,150+hash(i)*120,90+hash(i+1)*60,t,i));
  for(let k=0;k<3;k++){const x=((k*400-cam*.3+t*20)%1300+1300)%1300-150;balloon(x,120+k*60,t+k,['#ff5c8a','#4dc3ff','#ffcf33'][k])}
  for(let k=0;k<5;k++){const x=((t*(100+k*20)+k*260-cam*.4)%1300+1300)%1300-100,y=80+k*30+Math.sin(t*3+k)*10,f=Math.sin(t*12+k)*6;X.strokeStyle=OL;X.lineWidth=2.5;X.beginPath();X.moveTo(x-10,y-f);X.quadraticCurveTo(x-5,y-4,x,y);X.quadraticCurveTo(x+5,y-4,x+10,y-f);X.stroke()}
  slots(cam,.5,200,(i,x)=>{if(hash(i+3)<.5)cotton(x+80,GY-14,30+hash(i)*14)});
  for(let s=0;s<30;s++){const x=(hash(s)*W*1.2-cam*.6%(W*1.2)+W*1.2)%(W*1.2),y=(hash(s+4)*GY+Math.sin(t+s)*10);X.globalAlpha=.4+.4*Math.sin(t*4+s);star5(x,y,3+hash(s)*3,'#fff6a0',1);X.globalAlpha=1}},
 groundDeco(x,i){const rc=['#ff5c5c','#ffa83d','#ffe14d','#7dff7a','#4dc3ff','#b07dff'];X.fillStyle=rc[((i%6)+6)%6];X.fillRect(x,GY+10,T,8);X.fillStyle='#f0f4ff';if(hash(i)<.4){circ(x+20,GY+50+hash(i)*40,12);X.fill()}},
 spike:['#ffcf33','#ffffff'],block:['#ffffff','#ffb6c8'],blockFx:(x,y,w,h,c)=>{const rc=['#ff5c5c','#ffa83d','#ffe14d','#7dff7a','#4dc3ff','#b07dff'];for(let k=0;k<6;k++){X.fillStyle=rc[k];X.fillRect(x,y+k*3,w,3)}X.fillStyle=c;for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){circ(x+i*T+20,y+j*T+28,5);X.fill()}}});
FG.push((x,i,t,bp)=>{const k=hash(i*3);if(k<.4)cotton(x,GY+90,26+hash(i)*10);else if(k<.55){X.globalAlpha=.7+.3*bp;star5(x,GY+80,12,'#ffe14d',3);X.globalAlpha=1}});
TH[9].fg=FG[9];
// ---- Desert Temple ----
function pyramid(x,y,w){X.beginPath();X.moveTo(x-w/2,y);X.lineTo(x,y-w*.62);X.lineTo(x+w/2,y);X.closePath();P('#e8b05a',3);X.beginPath();X.moveTo(x,y-w*.62);X.lineTo(x+w/2,y);X.lineTo(x+w*.08,y);X.closePath();X.fillStyle='rgba(150,80,20,.3)';X.fill();X.strokeStyle='rgba(150,90,30,.4)';X.lineWidth=2;for(let k=1;k<6;k++){const yy=y-k*w*.1;X.beginPath();X.moveTo(x-w/2+k*w*.08,yy);X.lineTo(x+w/2-k*w*.08,yy);X.stroke()}}
function cactus(x,y,s){X.lineCap='round';const arm=(a,b,c,d)=>{X.beginPath();X.moveTo(a,b);X.lineTo(c,b);X.lineTo(c,d);X.lineWidth=14*s+5;X.strokeStyle=OL;X.stroke();X.lineWidth=14*s;X.strokeStyle='#3fb05a';X.stroke()};arm(x,y-40*s,x-22*s,y-70*s);arm(x,y-55*s,x+22*s,y-85*s);X.beginPath();X.moveTo(x,y);X.lineTo(x,y-100*s);X.lineWidth=20*s+5;X.strokeStyle=OL;X.stroke();X.lineWidth=20*s;X.strokeStyle='#4fc86a';X.stroke();X.fillStyle='#ff7ab0';circ(x,y-104*s,6*s);X.fill()}
function camel(x,y,t){const b=Math.sin(t*5)*2;X.lineWidth=6;X.lineCap='round';X.strokeStyle='#a8743a';for(let k=0;k<4;k++){X.beginPath();X.moveTo(x-18+k*12,y-24);X.lineTo(x-18+k*12+Math.sin(t*5+k*1.6)*5,y);X.stroke()}X.beginPath();X.ellipse(x,y-32+b,28,13,0,0,7);P('#c8904a',3);X.beginPath();X.arc(x-6,y-42+b,11,Math.PI,0);X.fillStyle='#c8904a';X.fill();X.stroke();X.lineWidth=8;X.strokeStyle='#c8904a';X.beginPath();X.moveTo(x+24,y-34+b);X.lineTo(x+34,y-56+b);X.stroke();X.beginPath();X.ellipse(x+38,y-58+b,9,6,0,0,7);P('#c8904a',2.5);X.fillStyle=OL;circ(x+40,y-60+b,1.6);X.fill()}
TH.push({name:'Desert Temple',sky:['#ffe9a0','#ffb35c','#e0744a'],ground:'#f0c878',groundDk:'#d9a14e',pulse:'#fff2b0',trail:'#fff2b0',glow:'#ffd23d',
 bg(cam,t,bp){X.fillStyle='rgba(255,250,210,.9)';circ(200,110,46+bp*4);X.fill();X.fillStyle='rgba(255,250,210,.25)';circ(200,110,80);X.fill();
  slots(cam,.06,520,(i,x)=>{pyramid(x+200,GY-20,260+hash(i)*120);if(hash(i+1)<.5)pyramid(x+380,GY-20,150)});
  slots(cam,.18,300,(i,x)=>{X.beginPath();X.moveTo(x-60,GY);X.quadraticCurveTo(x+80,GY-70-hash(i)*50,x+220,GY);X.quadraticCurveTo(x+300,GY-40,x+380,GY);P('#e8b868',3)});
  slots(cam,.35,240,(i,x)=>{const k=hash(i+2);if(k<.45)cactus(x+80,GY,.8+hash(i)*.5);else if(k<.62)camel(x+90+Math.sin(t*.5+i)*20,GY,t+i)});
  for(let s=0;s<40;s++){const x=((hash(s)*W*1.4-t*(200+hash(s+1)*200)-cam*.6)%(W*1.4)+W*1.4)%(W*1.4),y=GY-hash(s+3)*260;X.fillStyle='rgba(255,240,200,.55)';X.fillRect(x,y,8+hash(s)*14,2)}},
 groundDeco(x,i){if(hash(i)<.3){X.strokeStyle='#c8904a';X.lineWidth=2;X.beginPath();X.arc(x+20,GY+40+hash(i)*40,6,0,7);X.moveTo(x+20,GY+46+hash(i)*40);X.lineTo(x+20,GY+60+hash(i)*40);X.stroke()}if(i%3==0){X.fillStyle='#e0b060';X.beginPath();X.ellipse(x+20,GY+90,16,4,0,0,7);X.fill()}},
 spike:['#c87a2a','#ffd890'],block:['#e8c070','#a8743a'],blockFx:(x,y,w,h,c)=>{X.strokeStyle=c;X.lineWidth=2.5;for(let j=0;j<h;j+=20){X.beginPath();X.moveTo(x,y+j);X.lineTo(x+w,y+j);X.stroke()}for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){const bx=x+i*T,by=y+j*T;X.beginPath();X.arc(bx+20,by+16,5,0,7);X.moveTo(bx+12,by+28);X.lineTo(bx+28,by+28);X.stroke()}}});
FG.push((x,i,t,bp)=>{const k=hash(i*3);if(k<.3){X.save();X.translate(x,GY+110);cactus(0,0,.45);X.restore()}else if(k<.5){X.beginPath();X.ellipse(x,GY+85,26,12,0,0,7);P('#c89a5a',3)}});TH[10].fg=FG[10];
// ---- Shadow King (boss) ----
function bossDraw(x,y,t,bp,hp,hurt){X.save();X.translate(x,y+Math.sin(t*2)*12);const s=1+bp*.06;X.scale(s,s);
 X.fillStyle='rgba(255,40,80,.18)';circ(0,0,150+bp*20);X.fill();
 rr(-90,-90,180,180,26);P('#2a1640',6);rr(-74,-74,148,148,18);X.lineWidth=3;X.strokeStyle='#5a2a80';X.stroke();
 X.beginPath();X.moveTo(-80,-88);X.lineTo(-60,-140);X.lineTo(-30,-100);X.lineTo(0,-150);X.lineTo(30,-100);X.lineTo(60,-140);X.lineTo(80,-88);X.closePath();P('#ffcf33',5);X.fillStyle='#ff2e6a';circ(0,-118,8);X.fill();
 const ey=hurt?6:0;X.save();X.shadowColor='#ff2020';X.shadowBlur=25;X.fillStyle='#ff2e3a';X.beginPath();X.moveTo(-60,-30+ey);X.lineTo(-15,-12+ey);X.lineTo(-55,4+ey);X.closePath();X.fill();X.beginPath();X.moveTo(60,-30+ey);X.lineTo(15,-12+ey);X.lineTo(55,4+ey);X.closePath();X.fill();X.restore();
 const mo=10+bp*22;X.beginPath();X.moveTo(-50,30);X.quadraticCurveTo(0,30+mo*2,50,30);X.quadraticCurveTo(0,30+mo*.6,-50,30);P('#120820',4);X.fillStyle='#fff';for(let k=-3;k<=3;k++){X.beginPath();X.moveTo(k*13-5,32);X.lineTo(k*13,32+mo*.5);X.lineTo(k*13+5,32);X.fill()}X.restore()}
TH.push({name:'Shadow King',sky:['#3a0a2a','#1a0620','#050008'],ground:'#2a1838',groundDk:'#ff2e6a',pulse:'#ff2e6a',trail:'#ff7a9a',glow:'#ff2e6a',
 bg(cam,t,bp){if(bp>.85&&Math.floor(t*60)%3){X.fillStyle='rgba(255,220,255,.12)';X.fillRect(0,0,W,H)}
  slots(cam,.05,700,(i,x)=>{X.fillStyle='#14061e';X.fillRect(x+100,GY-260,300,260);for(let k=0;k<5;k++){X.fillRect(x+80+k*70,GY-320-(k%2)*40,40,320);X.beginPath();X.moveTo(x+74+k*70,GY-320-(k%2)*40);X.lineTo(x+100+k*70,GY-370-(k%2)*40);X.lineTo(x+126+k*70,GY-320-(k%2)*40);X.fill()}X.fillStyle=`rgba(255,46,106,${.4+.5*bp})`;for(let k=0;k<5;k++)rr(x+94+k*70,GY-290-(k%2)*40,12,18,6),X.fill()});
  for(let k=0;k<3;k++){const ph=(t*.7+k*.33)%1;if(ph<.06){X.strokeStyle='rgba(255,230,255,.9)';X.lineWidth=3;X.beginPath();let lx=200+k*280,ly=0;X.moveTo(lx,ly);while(ly<GY-100){lx+=(hash(ly+k)-.5)*60;ly+=30;X.lineTo(lx,ly)}X.stroke()}}
  slots(cam,.3,220,(i,x)=>{if(hash(i)<.5)deadTree(x+80,GY,i)});
  for(let e=0;e<35;e++){const x=(hash(e)*W*1.3-cam*.6%(W*1.3)+W*1.3)%(W*1.3),y=H-((t*(40+hash(e+2)*60)+hash(e+5)*H)%H);X.fillStyle=`rgba(255,${60+hash(e)*80},120,${.7*hash(e+9)+.2})`;circ(x,y,1.5+hash(e+1)*2);X.fill()}},
 groundDeco(x,i){X.strokeStyle='#ff2e6a';X.globalAlpha=.6;X.lineWidth=2;if(hash(i)<.4){X.beginPath();X.moveTo(x,GY+30+hash(i)*30);X.lineTo(x+20,GY+50);X.lineTo(x+40,GY+35);X.stroke()}X.globalAlpha=1},
 spike:['#3a1a4a','#ff2e6a'],saw:'#ff2e6a',sawIn:'#2a1640',block:['#3a2450','#ff2e6a'],blockFx:(x,y,w,h,c)=>{X.save();X.shadowColor=c;X.shadowBlur=8;X.strokeStyle=c;X.lineWidth=2;X.strokeRect(x+6,y+6,w-12,h-12);X.restore()}});
FG.push((x,i,t,bp)=>{const k=hash(i*3);if(k<.35){X.save();X.shadowColor='#ff2e6a';X.shadowBlur=10+bp*12;X.beginPath();X.moveTo(x-14,GY+100);X.lineTo(x,GY+60);X.lineTo(x+14,GY+100);P('#2a1640',3);X.restore()}});TH[11].fg=FG[11];
// ---- ambient weather layer (screen space, drawn over the world) ----
const AMB={
 2(cam,t,bp){for(let i=0;i<14;i++){const x=((hash(i)*W*1.2-cam*.8-t*40)%(W*1.2)+W*1.2)%(W*1.2),y=(t*(30+hash(i+3)*30)+hash(i+7)*H)%H,r=Math.sin(t*2+i);X.save();X.translate(x,y);X.rotate(r);X.beginPath();X.ellipse(0,0,7,3.5,0,0,7);X.fillStyle=i%3?'#6fcf5a':'#c8e05a';X.fill();X.restore()}
  for(let i=0;i<10;i++){const x=(hash(i+20)*W+Math.sin(t*.7+i)*40),y=GY-60-hash(i+9)*220+Math.cos(t+i)*20;X.fillStyle=`rgba(255,255,140,${.3+.5*Math.abs(Math.sin(t*3+i))})`;circ(x,y,2.5+bp);X.fill()}},
 3(cam,t,bp){X.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<45;i++){const x=((hash(i)*W*1.2-cam*.5+Math.sin(t+i)*20)%(W*1.2)+W*1.2)%(W*1.2),y=(t*(40+hash(i+1)*50)+hash(i+5)*H)%H;circ(x,y,1.5+hash(i+2)*2.5);X.fill()}},
 4(cam,t,bp){for(let i=0;i<30;i++){const x=((hash(i)*W*1.2-cam*.4+Math.sin(t*2+i)*15)%(W*1.2)+W*1.2)%(W*1.2),y=H-(t*(50+hash(i+1)*90)+hash(i+5)*H)%H;X.fillStyle=`rgba(255,${120+hash(i)*100|0},40,${.5+.4*hash(i+4)})`;circ(x,y,1.5+hash(i+2)*2+bp);X.fill()}
  X.fillStyle=`rgba(255,80,0,${.05+.06*bp})`;X.fillRect(0,GY-40,W,40)},
 5(cam,t,bp){for(let i=0;i<5;i++){const x=((hash(i)*W*1.5-cam*.6-t*90*(1+hash(i)))%(W*1.5)+W*1.5)%(W*1.5)-100,y=90+hash(i+3)*170+Math.sin(t*3+i)*20,f=Math.sin(t*18+i)*.8;X.save();X.translate(x,y);X.fillStyle='#1a1028';X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(-12,-12*f-4,-24,-2*f);X.quadraticCurveTo(-12,4,0,4);X.quadraticCurveTo(12,4,24,-2*f);X.quadraticCurveTo(12,-12*f-4,0,0);X.fill();circ(0,1,5);X.fill();X.fillStyle='#ff5050';circ(-2,0,1.2);circ(2,0,1.2);X.fill();X.restore()}
  for(let i=0;i<4;i++){const x=((i*330-cam*.9-t*20)%(W+400)+W+400)%(W+400)-200;const g=X.createRadialGradient(x,GY-10,10,x,GY-10,200);g.addColorStop(0,'rgba(200,190,230,.22)');g.addColorStop(1,'rgba(200,190,230,0)');X.fillStyle=g;X.fillRect(x-200,GY-120,400,140)}},
 6(cam,t,bp){if(bp>.6)for(let i=0;i<8;i++){const a=hash(i+Math.floor(t*4))*Math.PI,x=((hash(Math.floor(t*2))*W-cam*0)%W),y=GY-150;X.strokeStyle='#ffd23d';X.lineWidth=2;X.beginPath();X.moveTo(x,y);X.lineTo(x+Math.cos(a)*30*bp,y-Math.sin(a)*30*bp);X.stroke()}
  for(let i=0;i<5;i++){const ph=(t*.4+hash(i))%1,x=((hash(i+1)*W*1.3-cam*.6)%(W*1.3)+W*1.3)%(W*1.3);X.fillStyle=`rgba(230,235,240,${.35*(1-ph)})`;circ(x+ph*20,GY-140-ph*150,14+ph*30);X.fill()}},
 7(cam,t,bp){for(let i=0;i<2;i++){const ph=(t*.35+i*.5)%1;if(ph<.25){const k=Math.floor(t*.35+i*.5)*7+i,x0=200+hash(k)*700,y0=40+hash(k+1)*150,p=ph/.25;const x=x0-p*300,y=y0+p*120;const g=X.createLinearGradient(x,y,x+90,y-36);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(1,'rgba(255,255,255,0)');X.strokeStyle=g;X.lineWidth=3;X.beginPath();X.moveTo(x,y);X.lineTo(x+90,y-36);X.stroke()}}},
 8(cam,t,bp){X.strokeStyle='rgba(160,220,255,.35)';X.lineWidth=1.5;X.beginPath();for(let i=0;i<60;i++){const x=((hash(i)*W*1.2-cam*.3-t*120)%(W*1.2)+W*1.2)%(W*1.2),y=(t*(700+hash(i+1)*300)+hash(i+5)*H)%H;X.moveTo(x,y);X.lineTo(x-4,y+18)}X.stroke()},
};
// ---- Mushroom Forest ----
function shroom(x,y,h,r,cap,i){X.beginPath();X.moveTo(x-r*.22,y);X.quadraticCurveTo(x-r*.12,y-h*.5,x-r*.18,y-h);X.lineTo(x+r*.18,y-h);X.quadraticCurveTo(x+r*.12,y-h*.5,x+r*.22,y);X.closePath();P('#f4e6c8',3);
 X.beginPath();X.ellipse(x,y-h,r,r*.62,0,Math.PI,0);X.quadraticCurveTo(x,y-h+r*.25,x-r,y-h);P(cap,3.5);X.fillStyle='rgba(255,255,255,.9)';for(let k=0;k<4;k++){circ(x-r*.6+k*r*.4,y-h-r*(.2+.25*hash(i+k)),r*.09+r*.05*hash(i*3+k));X.fill()}}
TH.push({name:'Mushroom Forest',sky:['#3a2a6a','#7a4aa0','#e090c0'],ground:'#5a3a6a',groundDk:'#3a2448',pulse:'#c7ff7a',trail:'#c7ff7a',glow:'#c7ff7a',
 bg(cam,t,bp){X.fillStyle='rgba(255,240,200,.7)';circ(760,120,40);X.fill();
  slots(cam,.08,300,(i,x)=>shroom(x+150,GY-20,220+hash(i)*120,110+hash(i+1)*40,['#8a3aa0','#5a4ab0','#a0408a'][i%3&3]||'#8a3aa0',i));
  slots(cam,.25,200,(i,x)=>{if(hash(i+4)<.7)shroom(x+90,GY,70+hash(i)*70,40+hash(i+2)*25,['#ff5a5a','#ff9a3a','#4ad0ff','#c75aff'][Math.floor(hash(i+6)*4)],i)});
  for(let i=0;i<30;i++){const x=((hash(i)*W*1.2-cam*.2+Math.sin(t*.8+i)*30)%(W*1.2)+W*1.2)%(W*1.2),y=H-((t*(15+hash(i+1)*20)+hash(i+5)*H)%H);X.fillStyle=`rgba(200,255,120,${.3+.5*Math.abs(Math.sin(t*2+i))})`;circ(x,y,2+bp*1.5);X.fill()}
  slots(cam,.45,520,(i,x)=>{if(hash(i+9)<.5){const sx=x+200+Math.sin(t*.3+i)*30;X.beginPath();X.ellipse(sx,GY-8,16,8,0,0,7);P('#c8e08a',2.5);X.beginPath();X.arc(sx+4,GY-18,10,0,7);P('#e0a050',2.5);X.beginPath();X.moveTo(sx-12,GY-12);X.lineTo(sx-18,GY-24);X.stroke()}})},
 groundDeco(x,i){if(hash(i)<.35){X.fillStyle='#c7ff7a';X.globalAlpha=.5;circ(x+20,GY+30+hash(i)*60,3);X.fill();X.globalAlpha=1}if(i%4==0){X.save();X.translate(x+20,GY+100);shroom(0,0,18,14,'#ff5a5a',i);X.restore()}},
 spike:['#4a7a3a','#a0e060'],block:['#ff5a5a','#c03a4a'],blockFx:(x,y,w,h,c)=>{X.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){circ(x+i*T+12,y+j*T+13,5);X.fill();circ(x+i*T+28,y+j*T+27,4);X.fill()}}});
FG.push((x,i,t,bp)=>{if(hash(i*3)<.35){X.save();X.translate(x,GY+115);shroom(0,0,40,30,['#ff5a5a','#c75aff','#4ad0ff'][i%3],i);X.restore()}});TH[12].fg=FG[12];
// ---- Pirate Cove ----
function pship(x,y,s,t){X.save();X.translate(x,y+Math.sin(t*1.5+x)*4*s);X.scale(s,s);X.rotate(Math.sin(t*1.2)*.03);X.beginPath();X.moveTo(-90,0);X.lineTo(90,0);X.lineTo(70,34);X.lineTo(-70,34);X.closePath();P('#7a4a2a',4);X.fillStyle='#5a3418';X.fillRect(-60,10,120,6);
 X.lineWidth=5;X.strokeStyle=OL;X.beginPath();X.moveTo(0,0);X.lineTo(0,-140);X.moveTo(-40,0);X.lineTo(-40,-100);X.stroke();X.beginPath();X.moveTo(4,-130);X.quadraticCurveTo(50,-95,4,-50);X.closePath();P('#f4ead0',3);X.beginPath();X.moveTo(-36,-92);X.quadraticCurveTo(-4,-70,-36,-40);X.closePath();P('#f4ead0',3);
 X.beginPath();X.moveTo(0,-140);X.lineTo(30,-132);X.lineTo(0,-124);P('#1b1030',2);X.fillStyle='#fff';circ(12,-132,2.5);X.fill();X.restore()}
TH.push({name:'Pirate Cove',sky:['#5ab8f0','#ffd08a','#ff8a5a'],ground:'#a8743a',groundDk:'#7a4a2a',pulse:'#fff2b0',trail:'#ffffff',glow:'#ffd23d',
 bg(cam,t,bp){X.fillStyle='rgba(255,240,180,.95)';circ(480,GY-110,60+bp*4);X.fill();
  X.fillStyle='#2a7ab8';X.fillRect(0,GY-120,W,120);X.strokeStyle='rgba(255,255,255,.6)';X.lineWidth=3;for(let r=0;r<4;r++){X.beginPath();for(let x=0;x<=W;x+=20)X.lineTo(x,GY-110+r*28+Math.sin(x*.05+t*2+r-cam*.004*(r+1))*5);X.stroke()}
  slots(cam,.07,700,(i,x)=>{X.beginPath();X.ellipse(x+300,GY-115,180,40,0,Math.PI,0);P('#e8c070',3);X.save();X.translate(x+330,GY-145);X.strokeStyle='#7a4a2a';X.lineWidth=8;X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(10,-60,30,-100);X.stroke();for(let k=0;k<5;k++){X.beginPath();X.ellipse(30+Math.cos(k*1.25)*28,-100+Math.sin(k*1.25)*10,30,8,k*1.25,0,7);P('#3fb05a',2.5)}X.restore()});
  slots(cam,.15,560,(i,x)=>{if(hash(i)<.6)pship(x+250,GY-110,.6+hash(i+1)*.3,t+i)});
  for(let i=0;i<4;i++){const x=((hash(i)*W*1.4-t*50-cam*.1)%(W*1.4)+W*1.4)%(W*1.4),y=70+hash(i+2)*100,f=Math.sin(t*6+i)*6;X.strokeStyle=OL;X.lineWidth=3;X.beginPath();X.moveTo(x-14,y-f);X.quadraticCurveTo(x-7,y-8,x,y);X.quadraticCurveTo(x+7,y-8,x+14,y-f);X.stroke()}},
 groundDeco(x,i){X.strokeStyle='#7a4a2a';X.lineWidth=3;X.beginPath();X.moveTo(x,GY+4);X.lineTo(x,GY+130);X.stroke();if(i%2==0){X.fillStyle='#5a3418';circ(x+10,GY+20,2.5);circ(x+30,GY+20,2.5);X.fill()}if(hash(i)<.15){X.font='22px sans-serif';X.fillText('💰',x+8,GY+80)}},
 spike:['#8a8a9a','#e0e0f0'],saw:'#5a5a6a',sawIn:'#2a2a3a',block:['#c08a4a','#7a4a2a'],blockFx:(x,y,w,h,c)=>{X.strokeStyle=c;X.lineWidth=3;for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){const bx=x+i*T,by=y+j*T;X.strokeRect(bx+5,by+5,T-10,T-10);X.beginPath();X.moveTo(bx+5,by+5);X.lineTo(bx+T-5,by+T-5);X.stroke()}}});
FG.push((x,i,t,bp)=>{const k=hash(i*3);if(k<.25){X.beginPath();X.ellipse(x,GY+95,22,28,0,0,7);P('#8a5a2a',3);X.strokeStyle=OL;X.lineWidth=3;X.beginPath();X.moveTo(x-22,GY+85);X.lineTo(x+22,GY+85);X.moveTo(x-22,GY+105);X.lineTo(x+22,GY+105);X.stroke()}});TH[13].fg=FG[13];
// ---- Crystal Caves ----
function crystal(x,y,h,w,c,a=0){X.save();X.translate(x,y);X.rotate(a);X.beginPath();X.moveTo(-w/2,0);X.lineTo(-w/2,-h*.75);X.lineTo(0,-h);X.lineTo(w/2,-h*.75);X.lineTo(w/2,0);X.closePath();P(c,3);X.beginPath();X.moveTo(0,-h);X.lineTo(0,0);X.lineTo(-w/2,0);X.lineTo(-w/2,-h*.75);X.closePath();X.fillStyle='rgba(255,255,255,.25)';X.fill();X.restore()}
TH.push({name:'Crystal Caves',sky:['#0a0a20','#1a1440','#2a1a50'],ground:'#2a2050',groundDk:'#7df9ff',pulse:'#7df9ff',trail:'#c0f0ff',glow:'#7df9ff',
 bg(cam,t,bp){slots(cam,.06,260,(i,x)=>{X.beginPath();X.moveTo(x,0);X.lineTo(x+40,60+hash(i)*120);X.lineTo(x+80,0);P('#15102e',3)});
  slots(cam,.12,340,(i,x)=>{const c=['#7df9ff','#c77dff','#ff7ad9','#7dff9a'][i&3];X.save();X.globalAlpha=.25+.3*bp;X.shadowColor=c;X.shadowBlur=30;crystal(x+170,GY-10,180+hash(i)*120,50,c,(hash(i+1)-.5)*.3);X.restore();X.globalAlpha=.55;crystal(x+170,GY-10,180+hash(i)*120,50,c,(hash(i+1)-.5)*.3);crystal(x+215,GY-10,100,30,c,.3);X.globalAlpha=1});
  slots(cam,.3,220,(i,x)=>{if(hash(i+3)<.6){const c=['#7df9ff','#c77dff','#ff7ad9'][i%3];crystal(x+60,GY,60+hash(i)*50,24,c,-.2);crystal(x+85,GY,40,18,c,.25)}});
  for(let i=0;i<25;i++){const x=(hash(i)*W*1.3-cam*.15)%(W*1.3),y=hash(i+4)*GY;X.fillStyle=`rgba(200,240,255,${.2+.6*Math.abs(Math.sin(t*2+i*1.7))})`;circ((x+W*1.3)%(W*1.3),y,1.5+hash(i+2)*1.5);X.fill()}},
 groundDeco(x,i){if(hash(i)<.4)crystal(x+20,GY+60+hash(i)*50,20,10,['#7df9ff','#c77dff','#ff7ad9'][i%3],0)},
 spike:['#5a3aa0','#c0f0ff'],saw:'#7df9ff',sawIn:'#2a2050',block:['#4a3a90','#7df9ff'],blockFx:(x,y,w,h,c)=>{X.strokeStyle=c;X.globalAlpha=.6;X.lineWidth=2;for(let i=0;i<w/T;i++)for(let j=0;j<h/T;j++){const bx=x+i*T,by=y+j*T;X.beginPath();X.moveTo(bx+20,by+6);X.lineTo(bx+34,by+20);X.lineTo(bx+20,by+34);X.lineTo(bx+6,by+20);X.closePath();X.stroke()}X.globalAlpha=1}});
FG.push((x,i,t,bp)=>{if(hash(i*3)<.35){X.save();X.shadowColor='#7df9ff';X.shadowBlur=8+bp*10;crystal(x,GY+120,50,20,['#7df9ff','#c77dff','#ff7ad9'][i%3],(hash(i)-.5)*.5);X.restore()}});TH[14].fg=FG[14];
