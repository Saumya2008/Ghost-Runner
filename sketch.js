var tower,towerImg;
var ghost,ghostImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";
var spooky,spookySound;

function preload(){
towerImg=loadImage("tower.png");
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
    
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
}

function draw(){
  background("black");
  
      
  if (gameState === "play"){
    if (keyDown ("left")){
      ghost.x=ghost.x-3;
    }
    if (keyDown ("right")){
      ghost.x=ghost.x+3;
    }
    if (keyDown ("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    
    if (tower.y>400){
      tower.y=300;
    }
    spawnDoors();
   
    if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
      
      
    }
    
    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    
    ghost.destroy();
    gameState="end";  
    }
    
   drawSprites(); 
  }
  
  
  
  if (gameState === "end"){
  fill("yellow");
  textSize(30);
  text("game Over",200,250);  
      
  }
  

  
}

function spawnDoors(){
  if (frameCount% 240 === 0){
    var door=createSprite(200,-50);
    door.addImage(doorImg);
    
    var climber=createSprite(200,10);
    climber.addImage(climberImg);
    
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x=door.x;
    
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    door.lifetime=600;
    climber.lifetime=600;
    invisibleBlock.lifetime=600;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    
  }
}

