var canvas=document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var mouse={
	x:canvas.width/2,
	y:canvas.height/2
};

c=canvas.getContext("2d");

window.addEventListener("resize",function(){
 	canvas.width=window.innerWidth;
 	canvas.height=window.innerHeight;
});
window.addEventListener("mousemove",function(event){
 	mouse.x=event.x;
 	mouse.y=event.y;
});

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width,canvas.height);
	draw();
}

function draw(){
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(mouse.x,mouse.y);
	c.strokeStyle="red";
	c.stroke();
	c.beginPath();
	c.moveTo(0,canvas.height);
	c.lineTo(mouse.x,mouse.y);
	c.strokeStyle="red";
	c.stroke();
	c.beginPath();
	c.moveTo(canvas.width,canvas.height);
	c.lineTo(mouse.x,mouse.y);
	c.strokeStyle="red";
	c.stroke();
	c.beginPath();
	c.moveTo(canvas.width,0);
	c.lineTo(mouse.x,mouse.y);
	c.strokeStyle="red";
	c.stroke();
}
animate();