
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
playerY = canvas.height-220;
}
window.addEventListener("resize",resize);
resize();

const bg = new Image(); bg.src="assets/bg.png";
const trees = new Image(); trees.src="assets/trees.png";
const track = new Image(); track.src="assets/track.png";
const playerImg = new Image(); playerImg.src="assets/player.png";
const obstacleImg = new Image(); obstacleImg.src="assets/rock.png";

let lane = 1;
let lanes = [-180,0,180];
let playerY = canvas.height-220;

let obstacles = [];
let speed = 6;
let score = 0;
let gameOver = false;

function spawnObstacle(){
  obstacles.push({lane:Math.floor(Math.random()*3),y:-150});
}

function drawBackground(){
ctx.drawImage(bg,0,0,canvas.width,canvas.height);
ctx.drawImage(track,canvas.width/2-220,0,440,canvas.height);
ctx.drawImage(trees,0,canvas.height-300,canvas.width,300);
}

function drawPlayer(){
ctx.drawImage(playerImg,canvas.width/2+lanes[lane]-80,playerY,160,160);
}

function drawObstacles(){
obstacles.forEach(o=>{
ctx.drawImage(obstacleImg,canvas.width/2+lanes[o.lane]-80,o.y,160,160);
});
}

function update(){
obstacles.forEach(o=>{
o.y+=speed;
if(o.lane===lane && o.y>playerY-120 && o.y<playerY+120){gameOver=true;}
});
obstacles=obstacles.filter(o=>o.y<canvas.height+150);
score+=0.1;
}

function drawScore(){
ctx.fillStyle="white";
ctx.font="30px Arial";
ctx.fillText("Score: "+Math.floor(score),30,50);
}

function drawGameOver(){
ctx.fillStyle="red";
ctx.font="70px Arial";
ctx.fillText("GAME OVER",canvas.width/2-180,canvas.height/2);
ctx.font="30px Arial";
ctx.fillText("Toque para reiniciar",canvas.width/2-140,canvas.height/2+50);
}

function loop(){
ctx.clearRect(0,0,canvas.width,canvas.height);
drawBackground();

if(!gameOver){
update();
drawObstacles();
drawPlayer();
drawScore();
requestAnimationFrame(loop);
}else{
drawObstacles();
drawPlayer();
drawScore();
drawGameOver();
}
}

setInterval(spawnObstacle,1400);

window.addEventListener("pointerdown",e=>{
if(gameOver){reset();loop();return;}
if(e.clientX<canvas.width/3 && lane>0) lane--;
else if(e.clientX>canvas.width*2/3 && lane<2) lane++;
});

function reset(){
obstacles=[];
score=0;
speed=6;
gameOver=false;
}

loop();
