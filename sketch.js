var spaceship, spaceshipImg, kaboom;
var asteroid, asteroidImg;
var bullet, bulletImg, bulletShootingSound;
var star, starsGroup, starImg;
var bgImg, bgMusic;
var gameState = 1;
var score = 0;
var starsCollected = 0;

function preload() {
  spaceshipImg = loadImage("./assets/Spaceship.png");
  asteroidImg = loadImage("./assets/Asteroid.png");
  bulletImg = loadImage("./assets/Bullet.png");
  bgImg = loadImage("./assets/Space Background.jpg");
  kaboom = loadImage("./assets/Kaboom.png");
  bgMusic = loadSound("./assets/Background Music.mp3");
  starImg = loadImage("./assets/Star.png");
  bulletShootingSound = loadSound("./assets/Bullet Shooting Sound Effect.mp3");
}

function setup() {
  createCanvas(1200,800);

  spaceship = createSprite(100, 100, 80, 80);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.15;

  asteroid = createSprite(1200, random(80, 720), 80, 80);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.2;
  asteroid.velocityX = -3;

  bullet = createSprite(spaceship.x, spaceship.y, 50, 50);
  bullet.visible = false;

  starsGroup = new Group();
}

function draw() {
  background(51);
  image(bgImg, 0, 0, width, height);

  if(!bgMusic.isPlaying()) {
    bgMusic.play();
    bgMusic.setVolume(0.1);
  }

  console.log(frameCount);

  textSize(25);
  text("Score: "+score, 1090, 50);
  text("Stars Collected: "+starsCollected, 985, 80);

  if(gameState === 1) {
    spaceship.x = World.mouseX;
    spaceship.y = World.mouseY;

    if(asteroid.x < 0) {
      gameState = 3;
    }
  
    if(asteroid.isTouching(spaceship)) {
      gameState = 2;
    }

    if(keyDown("SPACE")) {
      spawnBullet();
    }

    if(asteroid.isTouching(bullet)) {
      asteroid.x = 1200;
      asteroid.y = random(80, 720);
      score+=5;
      asteroid.velocityX-=0.1;
      bullet.visible = false;
    }

    spawnStars();

    if(spaceship.isTouching(starsGroup)) {
      starsCollected+=0.1;
      star.visible = false;
    }
  }
  
  if(gameState === 2) {
    spaceship.addImage(kaboom);
    spaceship.scale = 0.35;
    asteroid.remove();
    bgMusic.setVolume(0);
  }

  if(gameState === 3) {
    text("Game Over", 540, 380);
    text("You couldn't shoot the asteroid in time!", 400, 430);
  }

  drawSprites();
}

function spawnBullet() {
  bulletShootingSound.play();
  bullet.x = spaceship.x;
  bullet.y = spaceship.y;
  bullet.visible = true;
  bullet.addImage(bulletImg);
  bullet.scale = 0.2;
  bullet.velocityX = 12 ;
}

function spawnStars() {
  if(frameCount%1000===0) {
    star = createSprite(1200, random(80, 720), 80, 80);
    star.visible = true;
    star.addImage(starImg);
    star.scale = 0.15;
    star.velocityX = -8;
    starsGroup.add(star);
  }
}