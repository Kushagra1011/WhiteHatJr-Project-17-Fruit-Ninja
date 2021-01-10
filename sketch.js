//Game States
var Play = 1; 
var End = 0; 

var gamestate = Play; 

var score=0; 

//Variables For Fruit Images 
var fruit1_image, fruit2_image, fruit3_image, fruit4_image, fruit, strawberry_image, strawberry1; 

//Variables For Alien Images 
var alien1_image, alien2_image, monster, moving; 

//Variables For Game Elements
var sword_image, sword, gameover_image, gameover; 

//Variables For Sound Elements
var gameover_sound, sword_sound; 

function preload()
{

  //Loading Fruit Images
  fruit1_image=loadImage("fruit1.png"); 
  fruit2_image=loadImage("fruit2.png"); 
  fruit3_image=loadImage("fruit3.png"); 
  fruit4_image=loadImage("fruit4.png"); 
  strawberry_image =loadImage("—Pngtree—a strawberry_4435823.png")
  
  //Loading Alien Images 
  alien_image=loadAnimation("alien1.png","alien2.png"); 

  //Loading Remaining Game Elements
  sword_image=loadImage("sword.png");
  gameover_image=loadImage("gameover.png");
  
  //Loading Sound Elements 
  gameover_sound=loadSound("gameover.mp3"); 
  sword_sound=loadSound("knifeSwooshSound.mp3"); 
  
}

function setup ()
{
  createCanvas(600,600); 
  
  sword=createSprite(300,300,25,25); 
  sword.addImage(sword_image);
  sword.scale=0.7; 
  
  
  //Creating Groups
  fruitsGroup= new Group(); 
  alienGroup= new Group(); 
  
}

function draw()
{
  background("rgb(0,191,255)"); 
  
  
  //Functions To Occur Duriung Play Gamestate
  if (gamestate===Play)
  {
    
  // Making Sword Move Around
  sword.x=mouseX; 
  sword.y=mouseY; 
  
  //Calling Functions For Spawning Fruits and Monsters
  fruits(); 
  spawnMonsters(); 
    
    //Actions To Take Place When The The Sword Touches The Aliens Or Fruits 
    if(fruitsGroup.isTouching(sword))
    {
      fruitsGroup.destroyEach(); 
      sword_sound.play(); 
      score=score+2; 
    }
  
    if(alienGroup.isTouching(sword))
    {
      alienGroup.destroyEach();
      gamestate=End; 
    }
  
    } 
    
//Actions To Take Place During Gamstate End
if(gamestate===End)
{
  sword.x=300; 
  sword.y=300; 
  sword.addImage(gameover_image); 
  fruitsGroup.destroyEach(); 
  gameover_sound.play(); 
  sword.scale=1.25;
}  
  
  fill("black"); 
  textSize(25);  
  text("Score = "+score,450,30);   
    
  drawSprites(); 
}


//Function for Spawning Fruits Randomly On Y-Axis
function fruits()
{
  if(World.frameCount%80===0)
     {
       fruit=createSprite(575,300,25,25); 
       fruit.scale=0.25; 
       
       f=Math.round(random(1,5)); 
       if (f==1)
       {
         fruit.addImage(fruit1_image);
       }
       else if (f==2)
       {
         fruit.addImage(fruit2_image);
       }
       else if(f==3)
       {
        fruit.addImage(fruit3_image); 
       }
       else if(f==4)
         {
           strawberry();
         }
       else 
       {
        fruit.addImage(fruit4_image); 
       }
      
      position=Math.round(random(1,2))
       
      if (position===1)
      {
        fruit.x=0;
        fruit.velocityX=(7.5+(score/4)); 
      }
      else 
      {
        fruit.x=600; 
        fruit.velocityX=-(7.5+(score/4)); 
      }
       
      fruit.y=Math.round(random(50,550));
      fruit.setLifetime=80; 
      fruitsGroup.add(fruit); 
       
     }
}

//Function For Spawning Monsters
function spawnMonsters()
{
  if (World.frameCount%200===0)
  {
    
    monster=createSprite(575,300,25,25); 
    monster.addAnimation("moving", alien_image); 
    monster.y=Math.round(random(50,500));
    monster.setLifetime=55;
    
    enemyposition=Math.round(random(1,2)); 
    
    if (enemyposition===1)
      {
        monster.x=0;
        monster.velocityX=(8+(score/10));
      }
    else 
      {
        monster.y=600;
        monster.velocityX=-(8+(score/10));
      }
      
    alienGroup.add(monster); 
    
  }
}

function strawberry()
{
  
  strawberry1 = createSprite(575, Math.round(random(50,550)), 25, 25)
  strawberry1.addImage(strawberry_image); 
  strawberry1.scale=0.075; 
  fruitsGroup.add(strawberry1); 
  strawberry1.velocityX=-(7.5+(score/4)); 

}