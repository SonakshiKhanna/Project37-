var play = 1;
var end = 0;
var gameState = play;
var count = 0;
var trex, ground, invisibleGround;
var ObstaclesGroup;
var gameOver, restart;
var runTrex,groundImg,miniClouds;
var obstacleImg1,obstacleImg2,obstacleImg3,obstacleImg4,obstacleImg5,obstacleImg6;
var stopTrex;

function preload() {
	runTrex = loadAnimation("Sprites/trex1.png,trex2.png,trex3.png");
	groundImg = loadImage("Sprites/ground2.png");
	miniClouds = loadImage("Sprites/cloud.png");
	obstacleImg1 = loadImage("Sprites/obstacle1.png");
	obstacleImg2 = loadImage("Sprites/obstacle2.png");
	obstacleImg3 = loadImage("Sprites/obstacle3.png");
	obstacleImg4 = loadImage("Sprites/obstacle4.png");
	obstacleImg5 = loadImage("Sprites/obstacle5.png");
	obstacleImg6 = loadImage("Sprites/obstacle6.png");
	stopTrex = loadImage("Sprites/trex_collided.png");
}

function setup() {
	createCanvas(800, 700);

	ObstaclesGroup = createGroup;
	CloudsGroup = createGroup;

	trex = createSprite(50,360,20,20);
	trex.addAnimation(runTrex);
	trex.addImage(stopTrex);
	trex.scale = 0.4;
	trex.depth = trex.depth+1;
	// trex.setCollider("circle",0,0,30);

	ground = createSprite(200,380,400,10);
	ground.addImage(groundImg);
	ground.x = ground.width/2;

	invisibleGround = createSprite(200,390,400,10);
	invisibleGround.visible = false;
 }

function draw() {
  rectMode(CENTER);
  background("white");
  
  trex.collide(invisibleGround);

  text("Score: "+ count, 300, 50);
  console.log(gameState);
  
  if(gameState === PLAY){
	spawnClouds();
	spawnObstacles();
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
	ground.velocityX = -9;
	count = count + Math.round(getFrameRate()/60);

    if(keyDown("space") && trex.y >= 359){
	  trex.velocityY = -12;
	}
	trex.velocityY = trex.velocityY + 0.8;
	
    if(ObstaclesGroup.isTouching(trex)){
      gameState = end;
	}
	
  }
  else if(gameState === end) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
	CloudsGroup.setVelocityXEach(0);
	
    trex.addImage(stopTrex);
  }
  
  camera.position.x = trex.x;
  camera.position.y = trex.y;
  drawSprites();
} 
  

function spawnObstacles() {
	if(World.frameCount % 60 === 0) {
	  obstacle = createSprite(400,365,20,20);
	  obstacle.velocityX = -5;
	  
	  rand = Math.round(rand(1,6));
	  switch(rand){
		case 1: obstacle.addImage(obstacleImage1);
		break;
		case 2: obstacle.addImage(obstacleImage2);
				break;    
		case 3: obstacle.addImage(obstacleImage3);
				break;
		case 4: obstacle.addImage(obstacleImage4);
				break;
		case 5: obstacle.addImage(obstacleImage5);
				break;
		case 6: obstacle.addImage(obstacleImage6);
				break;  
				default:break;
	  }

	  obstacle.scale = 0.4;
	  ObstaclesGroup.add(obstacle);
	}
}

function spawnClouds() {
	if (World.frameCount % 60 === 0) {
	  cloud = createSprite(400,200,20,20);
	  cloud.y = Math.round(random(80,300));
	  cloud.addImage("Sprites/cloud.png");
	  cloud.scale = 0.8;
	  cloud.velocityX = -6;
	  cloud.lifetime = 150;
	  CloudsGroup.add(cloud);
	}
}
 