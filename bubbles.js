var canvas=document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var mouse={x:undefined,
		   y:undefined};

var maxRadius=50;

window.addEventListener('mousemove',
	function(event){
		mouse.x=event.x;
		mouse.y=event.y;
	});

window.addEventListener('resize',
	function(event){
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
		init();
	});

function Ball(){
	this.x=Math.random()*canvas.width;
	this.y=Math.random()*canvas.height;
	this.radius=10;
	this.maxed=false;//Used for growing or shrinking
	this.xVel=(Math.random()*8)-(Math.random()*8);
	this.yVel=(Math.random()*8)-(Math.random()*8);
	this.color='rgba('+Math.round(Math.random()*256)+','+Math.round(Math.random()*256)+','+Math.round(Math.random()*256)+','+Math.round(Math.random())+')';
	this.draw=function(){
		c.beginPath();

		//Check if it should grow or shrink
		if(Math.abs(this.x-mouse.x)<100&&Math.abs(this.y-mouse.y)<100&&!(this.maxed)){
			this.radius+=1;
		}
		if((!(Math.abs(this.x-mouse.x)<100&&Math.abs(this.y-mouse.y)<100)&&this.radius>10)||this.maxed){
			this.radius-=1;
		}
		if(this.radius>maxRadius){
			this.maxed=true;
		}
		if(this.radius==10){
			this.maxed=false;
		}
		

		//Actual Drawing
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.strokeStyle=this.color;
		c.stroke();
		c.fillStyle=this.color;
		c.fill();
		//Move
		this.x+=this.xVel;
		this.y+=this.yVel;
		//Bounce
		if (this.x>canvas.width||this.x<0) {
			this.xVel*=-1;
		}
		if (this.y>canvas.height||this.y<0) {
			this.yVel*=-1;
		}
	}
}

var ball=new Array(2000);

for(var i=0;i<ball.length;i++){
	ball[i]=new Ball();
}

var c=canvas.getContext("2d");

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width,canvas.height);

	for(var i=0;i<ball.length;i++){
	ball[i].draw();
	}
}

animate();

function init(){
	ball=new Array(2000);

	for(var i=0;i<ball.length;i++){
	ball[i]=new Ball();
	}
}