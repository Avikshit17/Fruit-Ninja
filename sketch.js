var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword,swordImage;
var fruit,fruit1,fruit2,fruit3;
var fruitsGroup,score;
var monster,monsterImage,moving,enemyGroup,gameOverImage;

function preload(){
swordImage=loadImage("sword.png");
fruit1=loadImage("fruit1.png");
fruit2=loadImage("fruit2.png");
fruit3=loadImage("fruit3.png");
monsterImage=loadImage("alien1.png");
gameOverImage=loadImage("gameover.png");
cutSound=loadSound("knifeSwooshSound.mp3");
gameOverSound=loadSound("gameover.mp3");
}
function setup() {
  createCanvas(400, 400);
  
sword=createSprite(40,200,20,20);
sword.addImage(swordImage);
sword.scale=0.7;
  
score=0;
  
enemyGroup=new Group();
fruitsGroup=new Group();
}

function draw() {
  background("lightblue");
  if(gameState==PLAY)
  {
  
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
  fruits();
  enemy();
    if(fruitsGroup.isTouching(sword))
    {
      fruitsGroup.destroyEach();
      cutSound.play();
      score=score+2;
      
    }
    if(enemyGroup.isTouching(sword))
    {
      gameState=END;
    }
  }
  if(gameState==END)
  {
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
    gameOverSound.play();
  }
  drawSprites();
  text("score="+score, 300,30);
}
function fruits() {
if(World.frameCount%80===0){
fruit=createSprite(400,200,20,20);
fruit.scale=0.2;
var r=Math.round(random(1,3));
switch(r)
{
  case 1:fruit.addImage(fruit1);
         break;
  case 2:fruit.addImage(fruit2);
         break;
  case 3:fruit.addImage(fruit3);
         break;
}

  
fruit.y=Math.round(random(50,340));
fruit.velocityX=-7;
fruit.velocityX=-(7+(score/4));
fruit.lifetime=100;
fruitsGroup.add(fruit);
}
}
function enemy() {
if(World.frameCount%200===0) {
monster=createSprite(400,200,20,200);
monster.addImage(monsterImage);
monster.y=Math.round(random(100,300));
monster.velocityX=-8;
monster.velocityX=-(8+(score/10));
monster.lifetime=50;

  enemyGroup.add(monster);
}
}
  


  

