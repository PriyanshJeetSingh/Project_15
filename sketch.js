var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var invisibleGround;
var Over;
var back;
var invisible;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  endImg = loadImage("gameOver.png");
  jwelleryImg = loadImage("jwell.png");
  pathImg = loadImage("Road.png");
  swordImg = loadImage("sword.png");
  invisible = loadImage("invisible.png")
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 10;

back = createSprite(200, 300);
back.addImage(pathImg);
back.visible = false;

Over=createSprite(200, 200);
Over.visible=false;
Over.addImage(endImg);

//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

invisibleGround = createSprite(200, 300, 400, 600);
invisibleGround.visible = false;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+50;
     
    } else if(diamondsG.isTouching(boy)) {
        diamondG.destroyEach();
        treasureCollection=treasureCollection+50;
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState == END;
        boy.visible = false;

        Over.visible = true;
        back.visible = true;

        boy.x = 200;
        boy.y = 300;  
    }

  } 
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }else if(gameState===END){
    cashG.destroyEach();
    cashG.setVelocityYEach = 0;
    path.velocityY = 0;
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach = 0;
    jwelleryG.destroyEach();
    jwelleryG.setVelocityYEach();
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach = 0;
  
  }

}

if(gameState===END){
  if(cashG.isTouching(invisibleGround)){
  cashG.destroyEach();
}
}


function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}