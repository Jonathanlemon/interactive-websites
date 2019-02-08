var canvas=document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var mouse={
	x:0,
	y:0
};
var c=canvas.getContext("2d");
var x,y,radius,xVel,yVel,intYVel;

x=500;
y=100;
radius=50;
xVel=Math.random()*30;
yVel=Math.random();

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width,canvas.height)
	c.beginPath();
	c.arc(x,y,radius,0,Math.PI*2,false);
	c.stroke();
	c.fill();
	intYVel=Math.round(yVel);
	yVel+=0.3;
	x+=xVel;
	y+=yVel;
	xVel=(mouse.x-x)/50
	//bounce
	if(y>canvas.height-50){
		yVel*=-1;
		y=canvas.height-51;
	}
	if(y<0){
		yVel*=-1;
		y=1;
	}
	if(x>canvas.width-50){
		xVel*=-1;
		x=canvas.width-51;
	}
	if(x<0){
		xVel*=-1;
		x=1;
	}
}
animate();

window.addEventListener("resize",function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
});

window.addEventListener("mousemove",function(event){
	mouse.x=event.x;
	mouse.y=event.y;
});