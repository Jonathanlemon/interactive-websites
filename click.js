var canvas=document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext("2d");
var firstClick=false;

window.addEventListener("click",function(event){
	firstClick=!(firstClick);

	if(firstClick){
	c.moveTo(event.x,event.y);
	}
	else{
		c.lineTo(event.x,event.y);
		c.stroke();
	}
});