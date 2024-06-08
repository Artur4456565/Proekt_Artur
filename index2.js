var cvs=document.getElementById('canvas');
var ctx=cvs.getContext('2d'); //вид игры

var bird=new Image();
var bg=new Image();
var fg=new Image();
var pipeUp=new Image();
var pipeBottom=new Image();

//загрузка изображений 

bird.src="images/bird.png";
bg.src="images/bg.png";
fg.src="images/fg.png";
pipeUp.src="images/pipeUp.png";
pipeBottom.src="images/pipeBottom.png";

//Звуковые файлы 
var fly=new Audio();
var scrore_audio=new Audio();
fly.src="audio/fly.mp3";
scrore_audio.src="audio/score.mp3";

var gap=110;
// при нажатии на любую кнопку 
document.addEventListener("keydown",moveUp);

function moveUp(){
yPos-=25;	
fly.play();
}
// создание блоков 

var pipe=[];
pipe[0]={
x:cvs.width,
y:0
}

var score=0;

//позиция птички 
var xPos=10;
var yPos=150;
var grav=0.6;

//нарисуем объекты в канвас
function draw(){
ctx.drawImage(bg,0,0);

for(var i=0;i<pipe.length;i++){
ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
ctx.drawImage(pipeBottom,pipe[i].x,pipe[i].y+pipeUp.height+gap);
pipe[i].x--;
if(pipe[i].x==125){
pipe.push({
    x:cvs.width,
    y:Math.floor(Math.random()*pipeUp.height)-pipeUp.height
});
}
//отслеживание прикосновений
if(xPos+bird.width>=pipe[i].x && 
xPos<=pipe[i].x+pipeUp.width && 
(yPos<=pipe[i].y+pipeUp.height || 
yPos+bird.height>=pipe[i].y+pipeUp.height+gap)|| 
yPos+bird.height>=cvs.height-fg.height){
location.reload();
}
if(pipe[i].x==5){
score++; 
scrore_audio.play();       
}
}




ctx.drawImage(fg,0,cvs.height-fg.height);
ctx.drawImage(bird,xPos,yPos);



// подпрыгивание птички 
yPos+=grav;
ctx.fillstyle="#000";
ctx.font="24px Verdana";
ctx.fillText("Счёт:"+score,10,cvs.height-20);
requestAnimationFrame(draw);
}

pipeBottom.onload=draw;
