
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var bobObject1,bobObject2,bobObject3, bobObject4,bobObject5, roofObject
var rope1,rope2,rope3, rope4,rope5;
var world;


function setup() {
	createCanvas(1600, 700);
	rectMode(CENTER);


	engine = Engine.create();
	world = engine.world;

	roofObject=new roof(width/2,height/20,width/2,50);

	bobDiameter=100;

	startBobPositionX=width/2;
	startBobPositionY=height/20+500;
	bobObject1=new bob(startBobPositionX-bobDiameter*2,startBobPositionY,bobDiameter);
	bobObject2=new bob(startBobPositionX-bobDiameter,startBobPositionY,bobDiameter);
	bobObject3=new bob(startBobPositionX,startBobPositionY,bobDiameter);
	bobObject4=new bob(startBobPositionX+bobDiameter,startBobPositionY,bobDiameter);
	bobObject5=new bob(startBobPositionX+bobDiameter*2,startBobPositionY,bobDiameter);
	
	
	//Create a Ground
	

	var render = Render.create({
	  element: document.body,
	  engine: engine,
	  options: {
	    width: 1200,
	    height: 700,
	    wireframes: false
	  }
	});


	rope1=new rope(bobObject1.body,roofObject.body,-bobDiameter*2, 0)

	rope2=new rope(bobObject2.body,roofObject.body,-bobDiameter*1, 0)
	rope3=new rope(bobObject3.body,roofObject.body,0, 0)
	rope4=new rope(bobObject4.body,roofObject.body,bobDiameter*1, 0)
	rope5=new rope(bobObject5.body,roofObject.body,bobDiameter*2, 0)

	Engine.run(engine);
	//Render.run(render);
  
}


function draw() {
  rectMode(CENTER);
  background("black");

  roofObject.display();

  bobObject1.display();
  bobObject2.display();
  bobObject3.display();
  bobObject4.display();
  bobObject5.display();

  rope1.display()
  rope2.display()
  rope3.display()
  rope4.display()
  rope5.display()	

  textSize(24);
  strokeWeight(0.1)
  fill("white");
  
  text("Use the Up Arrow to set a", 20, 100);
  text("a constant velocity to the balls", 20, 130)

  text("Use the Down Arrow to reset", 20, 200);
  text("the position of the balls", 20, 230)

  text("You can also drag the ball", 20, 300)
  text("to move the positon of it", 20, 330)
  text("and when you let go of the", 20, 360)
  text("mouse the ball will fall", 20, 390)

}

function keyPressed() {
  	if (keyCode === UP_ARROW) {

    	Matter.Body.applyForce(bobObject1.body,bobObject1.body.position,{x:-500,y:-1300});

	  }
	  if(keyCode === DOWN_ARROW){
		  Matter.Body.setPosition(bobObject1.body, {x: startBobPositionX-bobDiameter*2, y: startBobPositionY})
		  Matter.Body.setPosition(bobObject2.body, {x: startBobPositionX-bobDiameter, y: startBobPositionY})
		  Matter.Body.setPosition(bobObject3.body, {x: startBobPositionX, y: startBobPositionY})
		  Matter.Body.setPosition(bobObject4.body, {x: startBobPositionX+bobDiameter, y: startBobPositionY})
		  Matter.Body.setPosition(bobObject5.body, {x: startBobPositionX+bobDiameter*2, y: startBobPositionY})
		  
	  }
}


function drawLine(constraint)
{
	bobBodyPosition=constraint.bodyA.position
	roofBodyPosition=constraint.bodyB.position

	roofBodyOffset=constraint.pointB;
	
	roofBodyX=roofBodyPosition.x+roofBodyOffset.x
	roofBodyY=roofBodyPosition.y+roofBodyOffset.y
	line(bobBodyPosition.x, bobBodyPosition.y, roofBodyX,roofBodyY);
}

function mouseDragged(){
	Matter.Body.setPosition(bobObject1.body, {x: mouseX, y: mouseY});
}