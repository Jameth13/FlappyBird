var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var bird = new Image();
var pipe = new Image();
var background = new Image();
bird.src = "sprites/bird.png";
pipe.src = "sprites/pipe.png";
background.src = "sprites/background.png";

var birdPos = 300; 
var velocity = 0.0;
var gravity = 20;

var birdOffset = 40;
var pipePos = 300;
var pipeHeight = 800;
var pipeVelocity = 300;
var pipeOffset = 1200;
var score = 0;
var highscore = 0;

var date = new Date();
var lastTime = date.getTime();
var deltaTime = (date.getTime() - lastTime) / 1000;

document.addEventListener("keydown",Jump);
document.addEventListener("click",Jump);

Loop();


function Loop()
{
    date = new Date();
    deltaTime = (date.getTime() - lastTime) / 1000;
    lastTime = date.getTime();

	Game();
	Draw();
    requestAnimationFrame(Loop);
}


function Game() {

    velocity += gravity * deltaTime;
    birdPos += velocity;
    pipePos -= pipeVelocity * deltaTime;

    if (pipePos < -200)
    {
    	pipeHeight = 400 + Math.random() * 600;
    	pipePos = canvas.width;
        score++;

        if (highscore < score)
            highscore = score;
    }

    if (birdPos > canvas.height)
        Kill();
}


function Draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

    var birdHitYT = birdPos;
    var birdHitYB = birdPos + bird.height;
    var birdHitXR = birdOffset + bird.width;
    var birdHitXL = birdOffset;
    var pipeBottom = pipeHeight - pipeOffset + pipe.height;

    if (birdHitYT <= pipeBottom && birdHitXR > pipePos && birdHitXL < pipePos + pipe.width)
        Kill();

    if (birdHitYB >= pipeHeight && birdHitXR > pipePos && birdHitXL < pipePos + pipe.width)
        Kill();

    context.drawImage(background,0,0);
    context.drawImage(pipe,pipePos,pipeHeight);
    context.drawImage(pipe,pipePos,pipeHeight - pipeOffset);
    context.drawImage(bird,birdOffset,birdPos);

    context.font = "20px Verdana";
    context.fillText("Score: " + score,4,canvas.clientHeight - 28);
    context.fillText("Highscore: " + highscore,4,canvas.clientHeight - 8);
}


function Jump() {
	velocity = -10;
}


function Kill() {
    birdPos = pipeHeight - 300;
    velocity = 0;
    score = 0;
}
