

var canvas;
var p=[], Y=0
var m = [],mons,mL=[], buls = [], bulsD=[]
var r = 1
var dx=[],dy=[]
var score=0
var indexX=1,indexY=1,indexL=0
var qdm = 1, Round = 0, nl=1,Boss=0,X=-1, reset=1
var database, gameState=-2;
var form, player, playerFora=[],playerCount=0
var allPlayers,allMonsters, allBullets, allChats
var round
var monsterIndex, indexm=0
var mpy=[0,0,0],mpx=[0,0,0]
var d=1, tdd=500, vdb=2
var posix=0, posiy=0
var pC, gco=[], info1, info2, info3
var plca
var xx,yy
var pX,pY,lf,clr,bD,w,h
var P=1
var TPIB="b0"
var Chat, Chatstexts=[]
var MPJC
//GameState : -3=Recomeçar; -2=Espera por jogadores; -1=PERDEU; 0=pause; 1=start
function preload() {
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  Chat=new Conversa;Chat.remove()
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  
  game.resetarUpdate(0)
  if(gameState==-2){form.message();game.colora(playerCount)}
  background(200,200,200);if(player.index==undefined&&plca==undefined&&gameState>-2&&MPJC==undefined){MPJC=createElement("h2");MPJC.style('font-size', '50px');MPJC.size(width/2 , height/16);MPJC.position(width/8, height/2 - height/8);MPJC.class("greeting");MPJC.html(`Infelizmente essa partida já começou`);     }
if(gameState==-2&&(form.prontos!=undefined && form.jogadores!=undefined)&&form.prontos===form.jogadores){game.update(0)}
  if(gameState==-2){  Conversa.getChatInfo()
    Chat.read()}
  //Cor do personagem e Nome mostrados
  if(gameState==-2&&player.color==null){
    textSize(70)
    fill("red")
    text(form.inputN.value(),width/2 - textSize()*2, height/2-height/2.5)
    form.showColor()
    //Parar de mostrar
  }else{form.sprite.remove()}
  if(gameState!=-2){form.res()}
  //Pontuação
textSize(windowHeight/50)
if(gameState==1&&player.index!=undefined){
if(p[player.index-1][1]!=0){plca=player.index-1}


camera.position.x=p[plca][0].position.x
camera.position.y=p[plca][0].position.y
//Limite de monstros e começar rodada
  if(round.a>0){
    round.rounds()
  }

  //if(p[player.index-1][1]!=0){p[player.index-1][0].visible=true;plca=player.index-1}else{p[player.index-1][0].visible=false}

  //Movimento
  if(p[player.index-1][1]!=0){
  if(keyIsDown(RIGHT_ARROW)){player.positionX+=1;player.move(); }
  else if(keyIsDown(LEFT_ARROW)){player.positionX-=1;player.move(); }
  if(keyIsDown(DOWN_ARROW)){player.positionY+=1;player.move(); }
  else if(keyIsDown(UP_ARROW)){player.positionY-=1;player.move(); }
  }
  //Monstros
for (var i=0;i<m.length;i++){if(i<=m.length-1){
  if(player.index!=null&&p.length>0){
  
  //Perseguir o jogador mais perto
  if(p[player.index-1][1]!=0){
  //O jogador atual X
  mpx[2]=p[player.index-1][0].position.x
    //O jogador atual Y
  mpy[2]=p[player.index-1][0].position.y
  }else{mpx[2]=p[plca][0].position.x;mpy[2]=p[plca][0].position.y}
  var mxy
  if(playerCount>1&&(m[i].indexXY==player.index-1 || p[m[i].indexXY][1]==0)){;mxy=m[i].indexXY
while((mxy==(player.index-1) && (playerCount-playerFora.length)>1) || p[mxy][1]==0){;mxy+=1; if(mxy>=playerCount){mxy=0}}}
  else{mxy=m[i].indexXY}
//Outro jogador X
  mpx[1]=p[mxy][0].position.x
  //Outro jogador Y
  mpy[1]=p[mxy][0].position.y

  //Velocidade
  var dd = dist(m[i].sprite.position.x, m[i].sprite.position.y, mpx[2], mpy[2])
  var DD = dist(m[i].sprite.position.x, m[i].sprite.position.y, mpx[1], mpy[1])
    //tela esta mais perto
  if(DD>=dd){m[i].speed(mpx[2], mpy[2],i)}
  //outro esta mais perto  
  else {m[i].speed(mpx[1], mpy[1],i)}
  //Radar
fill("black")
radar()

  
    //Colisão com o jogador
    if(p[player.index-1][1]!=0){if(m[i].sprite.collide(p[player.index-1][0])){p[player.index-1][1]=0;m[i].indexXY=0}}
    //if(m[i].indexXY!=(player.index-1) && p[m[i].indexXY][1]!=0){if(m[i].sprite.collide(p[m[i].indexXY][0])){retirarJ(m[i].indexXY);m[i].indexXY=0}}

    //Aumentar o indexXY
    if(m.length>0){
    if(m[i].indexXY>=playerCount-1){m[i].indexXY=0}
    else{m[i].indexXY+=1}
    }
}
}}
//Balas
for(var i in buls){

  for(var ii in buls[i][1]){  
    if(buls[i][1].length>0){
      if(buls[i][0]==player.index-1){
//Update da posição
buls[i][1][ii][1].update(buls[i][0],buls[i][1][ii][0])}

//Colisão bala <=> monstro
if(m.length>0&&buls[i][1].length>0){
  if(buls[i][1].length>0 && buls[i][1][ii][1].sprite.collide(m[indexL].sprite)){
    m[indexL].Life(indexL,i,ii)
     buls[i][1][ii][1].Destroy(buls[i][0],buls[i][1][ii][0],i,ii)
     indexL=0
     }
   //Overlaps(i)
   if(ii>=(buls[i][1].length-1)){
     indexL+=1
   }
   if(indexL>(m.length-1)){
     indexL=0
   }
}
if(buls[i][0]==player.index-1){
//Destruir balas
if(buls[i][1].length>0 && buls[i][1][ii]!=undefined && (buls[i][1][ii][1].sprite.position.x>p[player.index-1][0].position.x+windowWidth/1.9 || buls[i][1][ii][1].sprite.position.x<p[player.index-1][0].position.x-windowWidth/1.9 || buls[i][1][ii][1].sprite.position.y>p[player.index-1][0].position.y+windowHeight/1.9 || buls[i][1][ii][1].sprite.position.y<p[player.index-1][0].position.y-windowHeight/1.9)){
  buls[i][1][ii][1].Destroy(buls[i][0],buls[i][1][ii][0],i,ii)}
}
    }
}
}
if(playerFora.length==playerCount){game.resetarUpdate(playerCount)}
}
//gameState = 0/-1 => faça:

  if ((gameState === 0||gameState==1) && player.index!=undefined){
    if(m.length==0){indexL=0;indexm=0;
      for(var b in buls){for(var bb in buls[b][1]){if(buls[b][1].length>0){buls[b][1][bb][1].Destroy(buls[b][0],buls[b][1][bb][0],b,bb)}}}
    }
    game.play()
  //Interface\\
    if(r==1){text("Rodada: "+Round+"\nInimigos restantes: "+m.length+"\nBosses: "+Boss+"\nVida: "+nl.toFixed(2),p[plca][0].position.x-width/2,p[plca][0].position.y-height/2.2)}
    if(P==1){text("Taxa de disparo: "+(tdd/1000)+"\nDano: "+d+"\nVida: "+p[plca][1]+"\nVelocidade da bala: "+vdb+"\nPontuação: "+score,p[plca][0].position.x+width/3,p[plca][0].position.y-height/2.2)}
text("Posição atual: "+(p[plca][0].position.x-posix).toFixed(0)+" : "+(p[plca][0].position.y-posiy).toFixed(0),p[plca][0].position.x-width/16,p[plca][0].position.y-height/2.1)}
  if(gameState==0 && player.index!=undefined){colocarJ();game.getQuant();game.getRound();game.r=0;text("Aperte a tecla do (/ ou ? ou °) para abrir o chat (mensagens duram 10 segundos)\nAperte A(←),W(↑),S(↓),D(→) para atirar\nAperte as setas ↓, ←, →, ↑ para andar\nAperte R para ativar/desativar informações da rodada\nAperte P para ativar/desativar suas informações\nAperte Z para ativar/desativar o tiro na diagonal (anti-horario)\nAssim: \tS(↓) => ↘, A(←) => ↙, D(→) => ↗, W(↑) => ↖\n\nAperte ESPAÇO para começar/terminar a rodada",p[plca][0].position.x-windowWidth/4,p[plca][0].position.y-windowHeight/4)}
   
  drawSprites()
  
  if(gameState==-3){resetar()}
}

function keyPressed() {
  //Chat
  if(keyCode==193&&(gameState==1||gameState==0||gameState==-2)){
    Chat = new Conversa()

    
  }
  //Mudar o jogador observado
  if(playerFora.length!=undefined && playerFora.length>0){
  if(p[player.index-1][1]==0){
    if(keyCode==37){if(plca-1<0){plca=playerCount-1}else{plca-=1}
      while(p[plca][1]==0){
plca-=1
if(plca<0){plca=playerCount-1}
      }
    }
    if(keyCode==39){if(plca+1>playerCount-1){plca=0}else{plca+=1}
      while(p[plca][1]==0){
plca+=1
if(plca>playerCount-1){plca=0}
      }
    }
  }}
  //Esc => recomeçar
  if(player.index!=undefined && keyCode==27){
    game.resetarUpdate(reset)
    if(reset==1){Chat.systemMessage("O jogador "+player.name+" votou em reiniciar a partida")}
    else{Chat.systemMessage("O jogador "+player.name+" retirou seu voto de reiniciar a partida")}
    reset=-reset
  }
  //Enter
  if(gameState==-2&&keyCode==13&&Chat.chat==undefined){if(form.pronto<=0){form.pronto=1;Chat.systemMessage("O jogador "+player.name+" esta pronto")}else{form.pronto=-1;Chat.systemMessage("O jogador "+player.name+" esta cancelou o pronto")};form.Prontosupdate(form.pronto)
  }
  //Espaço:
  
  if((Chat.chat==undefined)){
  //Sem monstro => gameState = 0
if(m.length==0&&keyCode==32&&gameState==1){qdm+=(qdm/((Round-0.5)*1.1));game.update(0)}
else if(gameState==0&&keyCode==32){game.update(1)}
  if(gameState==1){
    if(p[player.index-1][1]!=0){
      if(keyCode==76){p[player.index-1][1]=10;player.update()}
  //W:
if(keyCode===87&&X!=1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,0,-vdb,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}
  //S:
else if(keyCode===83&&X!=1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,0,vdb,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}
  //A:
else if(keyCode===65&&X!=1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,-vdb,0,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}
  //D:
else if(keyCode===68&&X!=1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,vdb,0,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}

//Contrario do Relogio
//W:
if(keyCode===87&&X==1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,-vdb,-vdb,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}
  //S:
else if(keyCode===83&&X==1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,vdb,vdb,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}
  //A:
else if(keyCode===65&&X==1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,-vdb,vdb,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}
  //D:
else if(keyCode===68&&X==1){setTimeout(()=>{var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,vdb,-vdb,d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}

if(keyCode==66){setTimeout(()=>{var w=width/2,h=height/2,mx=World.mouseX,my=World.mouseY,R=(Math.abs(mx-w)+Math.abs(my-h));var bul = new Bullet(p[player.index-1][0].position.x,p[player.index-1][0].position.y,(((mx-w)/R)*vdb).toFixed(2),(((-h+my)/R)*vdb).toFixed(2),d,player.index,1);if(buls[player.index-1]==undefined){buls[player.index-1]=[player.index-1,[["b0",bul]]];TPIB="b1"}else{Bulslet(player.index-1,bul)}},500)}
}}
}


//X: Ativar/Desativar tiro na diagonal
if(keyCode==90){X=-X}
//Informações da rodada
if(keyCode===82){r=-r}
//Informações do jogador
if(keyCode==80){P=-P}
}

function retirarJ(i){
  this.t=0
  for(var t in playerFora){if(i==playerFora[t]){this.t+=1}}
  if(this.t==0){
  playerFora.push(i)
    p[i][1]=0;p[i][0].visible=false
    player.update()
    if(p[player.index-1][1]==0 && (playerCount-playerFora.length)>=1){while(plca==(player.index-1)){plca=Math.round(random(0,(p.length-1)))}}}
}
function colocarJ(){if(playerFora.length>0){
  for(var pl in p){p[pl][1]=100;p[pl][0].visible=true;player.update()};playerFora.splice(0,playerFora.length);plca=player.index-1
}}
function resetar(){
  
    //Recomeçando o jogo (chama o setup)
    database.ref("/").set({
      gameState:-2,
      playerCount:0,
      players:{},
      qdm:0,
      round:0,
      Bullets:{},
      monsters:{},
      prontos:0,
     chat: {},
     resetar:0,
    })
    form.res();player.res()
setup()    
    window.location.reload()
}

function Bulslet(P,x){
for(var pp in buls){
  if(pp==P){
    var i=0, d=0
      while(d<2){
        if(d==1){d=0;i+=1}
    for(var p in buls[pp][1]){
    var c = buls[pp][1][p].indexOf("b"+i)
    if(c!=-1){d=1}
    
      
    }
    if(d==0){
      buls[pp][1][buls[pp][1].length]=["b"+i,x];d=2;;TPIB="b"+(i+1)
    }
    
    }
  }
  }
}

function radar(){
var JM, jm
  for (var i=0;i<m.length;i++){

    
    //Perseguir o jogador mais perto
    //O jogador X
    jgx=p[plca][0].position.x
      //O jogador Y
    jgy=p[plca][0].position.y

    for (var i=0;i<m.length;i++){
    var d = dist(m[i].sprite.position.x, m[i].sprite.position.y, jgx, jgy)
    if(jm==undefined){JM=d;jm=d}
    if(d<jm){jm==d}  
    //if(d>JM){JM=d}
    }
    fill("black")

  }
jm=jm-(p[plca][0].width/2+p[plca][0].height/2)

fill("red");textSize(windowHeight/50);stroke(200,200,200);strokeWeight(0.5)
  text('Inimigo mais proximo: '+jm.toFixed(0),p[plca][0].position.x-width/16,p[plca][0].position.y-height/2.25)
  
}

