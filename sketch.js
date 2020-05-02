//sprites & images
var ball, ballimg, paddle, paddleimg;

//gamestates
var SERVE = 0,
  PLAY = 1,
  END = -1,
  gamestate = SERVE;

//score & hi score
var score = 0,
  hi = 5;

function preload() {
  //loading images

  ballimg = loadImage("ball.png");

  paddleimg = loadImage("paddle.png");
}

function setup() {
  //canvas size
  createCanvas(350, 300);

  //creating sprites
  ball = createSprite(200, 200, 10, 10);
  ball.addImage("ball", ballimg);

  paddle = createSprite(330, 200, 10, 50);
  paddle.addImage("padd", paddleimg);

  //initial X velocity
  ball.velocityX = 0;
}

function draw() {

  background(180, 223, 50);

  //hiscore
  text("HI " + hi, 20, 290);

  /* create Edge Sprites here */
  edges = createEdgeSprites();

  //SERVE
  if (gamestate === SERVE) {
    text("Up Arrow to Start", 100, 150);
    if (keyDown(UP_ARROW)) {
      ball.velocityX = 9;
      gamestate = PLAY;
    }
  }

  //PLAY
  if (gamestate === PLAY) {
    /* Allow the ball sprite to bounceOff the left, top and bottom edges only, leaving the right edge of the canvas to be open. */

    //top & bottom edges
    if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
      ball.velocityY = -ball.velocityY;
    }

    //left edge
    if (ball.isTouching(edges[0])) {
      ball.velocityX = -ball.velocityX;

      //score given on touching wall
      score++;
    }

    //call randomvelocity for variation of ball angles
    if (ball.isTouching(paddle)) {
      randomVelocity();
    }

    /*CONTROLS*/

    if (keyDown(UP_ARROW)) {
      paddle.y = paddle.y - 20;
    }

    if (keyDown(DOWN_ARROW)) {
      paddle.y = paddle.y + 20;
    }

    //paddle shouldn't move off the canvas

    if (paddle.y > 300) {
      paddle.y = 275;
    }
    if (paddle.y < 0) {
      paddle.y = 25;
    }

    //if ball goes out, end it
    if (ball.x > 300) {
      gamestate = END;
    }
  }

  //END
  if (gamestate === END) {
    text("Down Arrow to Restart", 100, 150);
    if (keyDown(DOWN_ARROW)) {
      //restart
      paddle.y = 150;
      ball.x = 150;
      ball.y = 150;
      ball.velocityX = 9;
      //hiscore calculate
      if (score > hi) {
        hi = score;
      }
      //reset score
      score = 0;
      gamestate = PLAY;
    }
  }
  //score shouldn't be shown if game hasen't started
  if (gamestate != SERVE) {
    text(score, 250, 30);
  }
  drawSprites();
}

//give random velocity
function randomVelocity() {
  ball.velocityY = random(-10, 10);
  ball.velocityX = -ball.velocityX;
}