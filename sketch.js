//link do trailer: https://youtu.be/QvQcyK1lBQQ

//Link do GDD:https://docs.google.com/document/d/1w-JjmcLeazH9RmhEvMf6Ke3aCdzk8R6RjyHm77y1twQ/edit

//

var borda, nuvem, nuvemx, castelo, orc, estado, pos_cursor, educador, programador;
borda = 100;
nuvemx = 0;
estado = 1;
pos_cursor = 1;

//retangulo do heroi - J1 
var xheroi, yheroi, lheroi, aheroi;

//retangulo do heroi - Rei Orc; 
var xrei, yrei, lrei, arei, orc;

//retangulo do heroi - Orc escudeiro 
var xesc, yesc, lesc, aesc;

//coordenadas da bola
var xball, yball, diameter;
var xballChange = 4, yballChange = 4;
var drei = 4;
var desc = 4;

//pontuação
var pontos;
pontos = 0;

//especial do boss
var cy = 0;

//musica
var som;

//modelos dos personagens
//heroi
var heroi;

//escudeiro
var esc;

//rei
var rei, esp;
esp = false;

//floresta
var arv, mata

function preload(){
  nuvem = loadImage("Cloud.png");
  castelo = loadImage("the castle of kestrels.gif");
  orc = loadImage("craigeatscrayons (@craigeatscrayon) on X.jfif");
  educador = loadImage("educador.png");
  programador = loadImage("foto.png");
  heroi = loadImage("knight.png");
  esc = loadImage("orcesc.png");
  rei = loadImage("orc4x.png");
  arv = loadImage("pinheiro.png");
  mata = loadImage("mata.png");
  soundFormats('mp3')
  som = loadSound("beepbox-song-2-4165.mp3");
}

function setup() {
  createCanvas(600, 400);
  xheroi = 20;
  yheroi = 200;
  
  lrei = lesc = 10;
  
  aheroi = arei = aesc = 50;
  
  xrei = width-15;
  yrei = 200;
  
  xesc = 500;
  yesc = 190;
  
  xball = width/2;
  yball = height/2;
  diameter = 20;
  
  colide = false

  som.loop();
}

function draw() {
  if(estado == 1){
    menu();
  }
  else if(estado == 2){
    jogar();
  }
  else if(estado == 3){
    instruções();
  }
  else if(estado == 4){
    créditos();
  }
  else if(estado == 5){
    venceu();
  }
  else if(estado == 6){
    perdeu();
  }
  else if(estado == 7){
    jogar2();
  }
}

function keyPressed(){
  if(keyCode === UP_ARROW && borda>132 && estado == 1){
    borda -= 100;
    pos_cursor --;
    console.log(pos_cursor);
    
  }
  if(keyCode === DOWN_ARROW && borda<200 && estado == 1){
    borda += 100
    pos_cursor = 2;
    console.log(pos_cursor);
    
  }
  else if(keyCode === DOWN_ARROW && borda<300 && estado == 1){
    borda += 100
    pos_cursor = 3;
    console.log(pos_cursor);
    
  }
  if(keyCode === ENTER){
    console.log("enter");
    if( pos_cursor == 1){
      estado = 2;
      reset();
      
    }
    else if( pos_cursor == 2){
      estado = 3;
    }
    else if(pos_cursor == 3){
      estado = 4;
    }
  }
   if(keyCode === LEFT_ARROW){
  if(estado == 2 || estado == 3 || estado == 4 || estado==5 || estado == 6 || estado == 7){
      estado = 1;
    }
   }
}

function menu(){
  background(0);
  background("darkred");
  image(nuvem,nuvemx,15,80,50);
  nuvemx ++
  if(nuvemx>600){
    nuvemx = -80
  }
  image(castelo,500,15,80,80);
  image(orc,380,140,180,200);
  
  noStroke();
 
  fill("black");
  text("Orc Pong",200,80);
  rect(100,100,200,50,10);
  rect(100,200,200,50,10);
  rect(100,300,200,50,10);
  
  textSize(26);
  textAlign(CENTER);
  fill("yellow")
  text("Jogar",200,132);
  text("Instruções",200,232);
  text("Créditos",200,332);
  
  noFill();
  stroke("yellow");
  rect(100,borda,200,50,10);

}

function jogar(){
  background(0);
  background("darkred");
  image(orc,270,150,100,90);
  image(arv,580,10,20,60);
  image(arv,580,80,20,60);
  image(arv,580,150,20,60);
  image(arv,580,220,20,60);
  image(arv,580,290,20,60);
  image(arv,580,360,20,60);
  image(mata,580,65,20,20);
  image(mata,580,130,20,20);
  image(mata,580,200,20,20);
  image(mata,580,270,20,20);
  image(mata,580,340,20,20);
  image(castelo,-60,5,80,80);
  image(castelo,-60,30,80,80);
  image(castelo,-60,55,80,80);
  image(castelo,-60,80,80,80);
  image(castelo,-60,105,80,80);
  image(castelo,-60,130,80,80);
  image(castelo,-60,155,80,80);
  image(castelo,-60,180,80,80);
  image(castelo,-60,205,80,80);
  image(castelo,-60,230,80,80);
  image(castelo,-60,255,80,80);
  image(castelo,-60,280,80,80);
  image(castelo,-60,305,80,80);
  image(mata,-5,380,605,20);
  
  //desenho do jogador1
  fill("black");
  image(heroi, xheroi, yheroi, 30, aheroi);
  y2heroi = yheroi + aheroi;
  
  //desenho do rei orc
  fill("green");
  image(rei, 575, yrei, 30, arei);
  
  
  //desenho do escudeiro orc
  fill("purple");
  image(esc, xesc, yesc, 20, aesc);
  
  
  //desenho da bola
  fill("darkblue");
  circle(xball, yball, diameter);
  
  mover();
  movimento_da_bola();
  collide();
  mover_rei();
  mover_esc();
}

function jogar2(){
  background(0);
  background("darkred");
  image(arv,580,10,20,60);
  image(arv,580,80,20,60);
  image(arv,580,150,20,60);
  image(arv,580,220,20,60);
  image(arv,580,290,20,60);
  image(arv,580,360,20,60);
  image(mata,580,65,20,20);
  image(mata,580,130,20,20);
  image(mata,580,200,20,20);
  image(mata,580,270,20,20);
  image(mata,580,340,20,20);
  image(castelo,-60,5,80,80);
  image(castelo,-60,30,80,80);
  image(castelo,-60,55,80,80);
  image(castelo,-60,80,80,80);
  image(castelo,-60,105,80,80);
  image(castelo,-60,130,80,80);
  image(castelo,-60,155,80,80);
  image(castelo,-60,180,80,80);
  image(castelo,-60,205,80,80);
  image(castelo,-60,230,80,80);
  image(castelo,-60,255,80,80);
  image(castelo,-60,280,80,80);
  image(castelo,-60,305,80,80);
  image(mata,-5,380,605,20);
  estado = 7
  
  //desnho do jogador1
  fill("black");
  image(heroi, xheroi, yheroi, 30, aheroi);
  y2heroi = yheroi + aheroi;
  
  //desenho do rei orc
  fill("green");
  image(rei, 575, yrei, 30, arei);
  
  
  //desenho do escudeiro orc
  fill("purple");
  image(esc, xesc, yesc, 20, aesc);
  
  
  //desenho da bola
  fill("darkblue");
  circle(xball, yball, diameter);
  
  mover();
  movimento_da_bola();
  collide();
  mover_rei();
  mover_esc();
  especial();
}

function instruções(){
  background("darkred");
  textSize(22);
  text("instruções",width/2,50);
  text("Use as setas do teclado para mover o héroi.",width/2,90);
  text("1- A seta para cima personagem sobe.",width/2,120);
  text("2- Seta para baixo o héroi desce.", width/2,150);
  text("3- Seta da esquerda retorna para o menu.",width/2,180);
  text("Como o hero rebate a esfera?", width/2, 210);
  text("Isso é possível graças a refexão de colisão", width/2, 240);
  text("que é um princípio físico que permite a", width/2,270);
  text("mudança da direção de um objeto ao entrar", width/2, 300);
  text("em contato com outro em uma determinada velocidade", width/2, 330);
}

function créditos(){
  background(0);
  background("darkred");
  textSize(20);
  text("créditos",width/2,50);
  text("Erick Ezequiel - Ajudou na seleção das imagens",300,280);
  text("Italo Nunes - Programador",270,110);
  text("Mateus De Lima - Apoio Emocional",300,300);
  text("Rummenigge Rudson - Educador",300,210);
  text("Arte do orc - @craigeatscrayon",285,320);
  text("Musica por - AlIsKing do Pixabay", 285, 340);
  text("Arte do rei orc - it's cc0 go wild", 285, 360);
  image(educador,45,150,90,90);
  image(programador,45,55,90,90,45);
}

function venceu(){
  background(0);
  background("darkred");
  textSize(30);
  noStroke();
  fill("black");
  text("Você conseguiu espulsar os orcs parabéns.", width/2, 50);
  text("Você dominuou o uso da relexão de colisão.", width/2, 90);
  text("Precione a seta para esquerda",width/2,130);
  text("para voltar ao menu ou",width/2,170);
  text("aperte ENTER para jogar novamente.", width/2,230);
  image(mata,-1,340,600, 70);
  image(castelo, 500, 325,80,80);
  image(heroi, 490, 380, 20, 20);
  estado = 5;
}

function perdeu(){
 background(0);
  background("darkred");
  textSize(20);
  noStroke();
  fill("black");
  text("Você perdeu, os orcs invadiram o castelo",width/2, 50);
  text("Você pode tentar prever a reflexão.", width/2, 70);
  text("Talvez você tenha vindo pelo ester-egg...", width/2, 90);
  text("Sabia que pong está relacionado com a física?", width/2, 110);
  text("O que você acabou de jogar tem relação com", width/2, 130);
  text("velocidade e aceleração, além de", width/2, 150);
  text("movimento uniforme variável.", width/2, 170);
  text("Precione a seta para esquerda", width/2,190);
  text("para voltar ao menu ou",width/2,210);
  text("aperte ENTER para jogar novamente.", width/2,230);
  image(mata,-1,340,600, 70);
  image(castelo, 500, 325,80,80);
  image(esc, 490, 380, 20, 20);
  estado = 6
}

function mover(){
  if(keyIsDown(UP_ARROW)){
    yheroi -= 5;
    if(yheroi<=0){
      yheroi = 0;
    }
  }
  if(keyIsDown(DOWN_ARROW)){
    yheroi += 5;
    if(yheroi>=350){
      yheroi = 350;
    }
  }
  //mover a bola autonoma
  xball += xballChange;
  yball += yballChange;
} 

//mover rei
function mover_rei(){
  fill("green")
  image(rei, 575, yrei, 30, arei);
  yrei += drei;
  if(y2rei>400){
    drei = -4
  }
  if(yrei<0){
    drei = 4
  }
}

//mover escudeiro
function mover_esc(){
  fill("purple")
  image(esc, xesc, yesc, 20, aesc);
  yesc += desc;
  if(yesc<0){
    desc = 6
  }
  if(y2esc>400){
    desc = -6
  }
}

function movimento_da_bola(){
  if(xball < (diameter/2) || xball > width - 0.5 * diameter){
    xballChange *= -1;
  }
  if(yball < (diameter/2) || yball > height - 0.5 * diameter){
    yballChange *= -1;
  }
 
  if(xball < (diameter/2)){
    pontos--
  }
  if(xball > width - 0.5 * diameter){
    pontos++
  }
  text("Score: " + pontos, 300, 20);
  if( pontos > 5){
    estado = 7;
  }
  if(pontos>9){
    estado = 5
  }
    
  if(pontos < -5){
    estado = 6;
  }
}

//colisão com heroi
function collide(){
  y2rei = yrei + arei;
  y2esc = yesc + aesc;
  
if((xball > xheroi && xball < xheroi + lheroi) && (yball +(diameter/2) >= yheroi) && yball - (diameter/2) <=
  y2heroi){
  xballChange *= -1;
  yballChange *= -1;
}
  
 //colisão com rei
  else if((xball > xrei && xball < xrei + lrei) && (yball +(diameter/2) >= yrei) && yball - (diameter/2) <= y2rei){
  xballChange *= -1;
  yballChange *= -1;
  

}
  
 //colisão com escudeiro
  else if((xball > xesc && xball < xesc + lesc) && (yball +(diameter/2) >= yesc) && yball - (diameter/2) <= y2esc){
  xballChange *= -1;
  yballChange *= -1;        
  }
}

function especial(){
  
  //ativação do especial do boss
  fill("darkblue")
    circle(0,cy,20);
    cy++
    if(cy>400){
   cy = -800;
   }
  
    circle(50,cy,20);
    cy++
    if(cy>400){
    cy = -800;
 }
  
    circle(110,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
    circle(170,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
    circle(230,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
    circle(290,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
    circle(350,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
   circle(410,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
   circle(470,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
   circle(530,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
  
   circle(590,cy,20);
    cy++
    if(cy>400){
    cy = -800;
   }
}

function reset(){
  xheroi = 20;
  yheroi = 200;
  
  lheroi = lrei = lesc = 10;
  aheroi = arei = aesc = 50;
  
  xrei = width-15;
  yrei = 200;
  
  xesc = 500;
  yesc = 190;
  
  xball = width/2;
  yball = height/2;
  diameter = 20;
  
  colide = false
  pontos = 0;
  cy = 0;
}