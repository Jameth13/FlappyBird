//Canvas and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//Sprites
var pipe = new Image();
var background = new Image();
pipe.src = "sprites/pipe.png";
background.src = "sprites/background.png";

//Global variables
var gravity = 20;

//Pipe (TEMP)
var pipePos = 300;
var pipeHeight = 800;
var pipeVelocity = 300;
var pipeOffset = 1200;

//Score
var score = 0;
var highscore = 0;

//deltaTime
var date = new Date();
var lastTime = date.getTime();
var deltaTime = (date.getTime() - lastTime) / 1000;

//Bird
var bird = new Bird();

//Input
document.addEventListener("keydown", Jump);
document.addEventListener("click", Jump);

//Start game
Loop();


//Bird constructor
function Bird() {
    this.x = 40;
    this.y = 300;
    this.velocity = 0;
    this.dead = false;
    this.sprite = new Image();
    this.sprite.src = "sprites/bird.png";

    this.Update = function() {
      this.velocity += gravity * deltaTime;
      this.y += this.velocity;
    }

    //HELP!!!
    this.Jump = function() {
        if (!this.dead)
            this.velocity = -10;
    }
}


//Main loop
function Loop()
{
    //deltaTime
    date = new Date();
    deltaTime = (date.getTime() - lastTime) / 1000;
    lastTime = date.getTime();

	Game();
	Draw();
    requestAnimationFrame(Loop);
}


//Game logic
function Game() {

    bird.Update();

    pipePos -= pipeVelocity * deltaTime;

    if (pipePos < -200)
    {
    	pipeHeight = 400 + Math.random() * 600;
    	pipePos = canvas.width;
        score++;

        if (highscore < score)
            highscore = score;
    }

    if (bird.y > canvas.height)
        Reset();
}


//Render
function Draw() {
    //Clear canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

    //Collision detection
    var birdHitYT = bird.y;
    var birdHitYB = bird.y + bird.sprite.height;
    var birdHitXR = bird.x + bird.sprite.width;
    var birdHitXL = bird.x;
    var pipeBottom = pipeHeight - pipeOffset + pipe.height;

    if (!bird.dead)
        if (birdHitXR > pipePos && birdHitXL < pipePos + pipe.width)
            if (birdHitYT <= pipeBottom || birdHitYB >= pipeHeight)
                Kill();

    //Draw sprites
    context.drawImage(background,0,0);
    context.drawImage(pipe, pipePos, pipeHeight);
    context.drawImage(pipe, pipePos, pipeHeight - pipeOffset);
    context.drawImage(bird.sprite, bird.x, bird.y);

    //Draw text
    context.font = "20px Verdana";
    context.fillText("Score: " + score, 4, canvas.clientHeight - 28);
    context.fillText("Highscore: " + highscore, 4, canvas.clientHeight - 8);
    context.fillText("FPS: " + (1 / deltaTime).toFixed(2), 4, 24);
}


//Bird functions - HELP!
function Jump() {
    if (!bird.dead)
    	bird.velocity = -10;
}
function Kill() {
    bird.dead = true;
    bird.velocity = 8;
}
function Reset() {
    bird.dead = false;
    score = 0;
    bird.y = pipeHeight - 300;
    bird.velocity = 0;
}
