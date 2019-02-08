//Build canvas
var canvas=document.querySelector("canvas");
canvas.width=600;
canvas.height=600;
//Setup some global variables
var scl=30;
var c=canvas.getContext("2d");
var score;
var fx, fy;
var xVel,yVel;
var counter;
var snake;
var pxVel;
var pyVel;
//Instantiation function
function init(){
	snake=[]
	snake.push(new segment(2,2));
	xVel=0;
	yVel=0;
	score=1;
	counter=0;
	spawn();
}
init();
//KeyPress event
window.addEventListener("keydown",function(event){
	pxVel=xVel;
	pyVel=yVel;
	if(event.key=="ArrowUp"){
		yVel=-1;
		xVel=0;
	}
	if(event.key=="ArrowDown"){
		yVel=1;
		xVel=0;
	}
	if(event.key=="ArrowLeft"){
		yVel=0;
		xVel=-1;
	}
	if(event.key=="ArrowRight"){
		yVel=0;
		xVel=1;
	}
});
//Create constructor for segment object
function segment(xx,yy){
	this.x=xx;
	this.y=yy;
	this.draw=function(){
		c.fillStyle="black";
		c.fillRect(this.x*scl,this.y*scl,scl,scl);
		c.beginPath();
		c.moveTo(this.x*scl,this.y*scl);
		c.lineTo(this.x*scl+scl,this.y*scl);
		c.lineTo(this.x*scl+scl,this.y*scl+scl);
		c.lineTo(this.x*scl,this.y*scl+scl);
		c.lineTo(this.x*scl,this.y*scl);
		c.strokeStyle="blue";
		c.stroke();
	}
}
//Define spawning food function
function spawn(){
	fx=Math.round(Math.random()*19);
	fy=Math.round(Math.random()*19);
}
//Looping function
function animate(){
	requestAnimationFrame(animate);
	if(counter==10){
	//Set title
	document.querySelector("title").innerHTML="SCORE: "+score;
	c.clearRect(0,0,canvas.width,canvas.height);
	//Check if you got food
	if(snake[0].x==fx&&snake[0].y==fy){
		spawn();
		//Add piece to array
		snake.push(new segment(snake[score-1].x,snake[score-1].y))
		score++;
	}
	//Move snake
	for(var i=score-1;i>0;i--){
		snake[i].x=snake[i-1].x;
		snake[i].y=snake[i-1].y;
	}
	//Move Head
	snake[0].x+=xVel;
	snake[0].y+=yVel;
	//Boundary
	if(snake[0].x<0){
		snake[0].x=0;
	}
	if(snake[0].x>19){
		snake[0].x=19;
	}
	if(snake[0].y<0){
		snake[0].y=0;
	}
	if(snake[0].y>19){
		snake[0].y=19;
	}
	//Draw snake
	for(var i=0;i<snake.length;i++){
		snake[i].draw();
	}
	//Draw Head separate color
	c.fillStyle="blue";
	c.fillRect(snake[0].x*scl,snake[0].y*scl,scl,scl);
	//Draw Food
	c.fillStyle="red";
	c.fillRect(fx*scl,fy*scl,scl,scl);
	//Collision Detection
	for(var i=0;i<snake.length;i++){
		for(var ii=0;ii<snake.length;ii++){
			if(snake[i].x==snake[ii].x&&snake[i].y==snake[ii].y&&!(i==ii)){
				init();
			}
		}
	}
	if((xVel*-1==pxVel&&xVel!=0)||(yVel*-1==pyVel&&yVel!=0)&&snake.length>1){
		init();
	}
	counter=0;
	}
	counter++;
}
//Start loop
animate();