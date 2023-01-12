"use strict"

const CANVAS = document.querySelector('canvas');
const C = CANVAS.getContext('2d');
const GRAVITY = 0.75;
const background = new gameSprite({
    position: {
        x : 0,
        y : 0
    },
    imageSrc : './img/BACK1.png_large'
})
CANVAS.width = 1920;
CANVAS.height = 300;

C.fillRect(0,0,CANVAS.width,CANVAS.height = 1080);





const Player = new Fighter({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'red',
    offset:{
        x: -50,
        y: 0
    }
})
const Enemy = new Fighter({
    position:{
        x: 1000,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    },
    color: 'blue',
    offset:{
        x: 50,
        y: 0
    }
})

const key = {
    a : {
        pressed:false
    },
    d : {
        pressed:false
    },
    w :{
        pressed: false
    },
    ArrowRight :{
        pressed: false

    },
    ArrowLeft :{
        pressed: false
    },
    ArrowUp :{
        pressed: false
    }
}
function RectangularCollision({rectangle1,rectangle2}){
return(
    rectangle1.attackBox.position.x+rectangle1.attackBox.width >=rectangle2.position.x &&
    rectangle1.attackBox.position.x <= rectangle2.position.x+rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <=rectangle2.position.y+rectangle2.height );
}
function animate(){
    window.requestAnimationFrame(animate);
    C.fillRect(0,0, CANVAS.width,CANVAS.height);
    background.Update();
    Player.Update();
    Enemy.Update();
    Player.velocity.x = 0;
    Enemy.velocity.x = 0
    C.fillStyle = 'black';
//Player movement
    if(key.a.pressed && Player.lastKey ==='a')
        Player.velocity.x = -4;
    else if(key.d.pressed && Player.lastKey ==='d')
        Player.velocity.x = 4;
    else if(key.w.pressed && Player.position.y ===890.25 )
        Player.velocity.y = -20;
//Enemy movement
    if(key.ArrowLeft.pressed && Enemy.lastKey ==='ArrowLeft')
        Enemy.velocity.x = -4;
    else if(key.ArrowRight.pressed && Enemy.lastKey ==='ArrowRight')
        Enemy.velocity.x = 4;
    else if(key.ArrowUp.pressed && Enemy.position.y ===890.25)
        Enemy.velocity.y = -20;

    //detect a collision
    if(RectangularCollision({rectangle1:Player,rectangle2:Enemy}) && Player.isAttacking){
        Player.isAttacking = false;
        Enemy.health-=20;
        document.getElementById('EnemyHealthbar').style.width = Enemy.health+ '%';

        }
    if(RectangularCollision({rectangle1:Enemy,rectangle2:Player}) && Enemy.isAttacking){
        Enemy.isAttacking = false;
        Player.health-=20;
        document.getElementById('PlayerHealthbar').style.width = Player.health+ '%';
    }
}
animate();
window.addEventListener('keydown',(event)=>{
   switch (event.key){
       case 'd':{
           key.d.pressed = true;
           Player.lastKey = 'd'
           break;
       }
       case 'a':{
           key.a.pressed = true;
           Player.lastKey = 'a'
           break;
       }
       case 'w':{
           Player.lastKey = 'w';
           key.w.pressed = true;
           break;
       }
       case ' ':{
           Player.attack();
           break;
       }
       case 'ArrowRight':{
           key.ArrowRight.pressed = true;
           Enemy.lastKey = 'ArrowRight'
           break;
       }
       case 'ArrowLeft':{
           key.ArrowLeft.pressed = true;
           Enemy.lastKey = 'ArrowLeft'
           break;
       }
       case 'ArrowUp':{
           key.ArrowUp.pressed = true;
           Enemy.lastKey = 'ArrowUp';
           break;
       }
       case 'ArrowDown':{
           Enemy.isAttacking = true;
           Enemy.attack();
           break;
       }
   }
})
window.addEventListener('keyup',(event)=>{
    switch (event.key){
        case 'd':{
            key.d.pressed = false;
            break;
        }
        case 'a':{
            key.a.pressed = false;
            break;
        }
        case 'w':{
            key.w.pressed = false;
            break;
        }
        case 'ArrowRight':{
            key.ArrowRight.pressed = false;
            break;
        }
        case 'ArrowLeft':{
            key.ArrowLeft.pressed = false;
            break;
        }
        case 'ArrowUp':{
            key.ArrowUp.pressed = false;
            break;
        }
    }
})
//timer
let timer = 61;
function choosingWinner({Player,Enemy}){

    if(Player.health===Enemy.health&&timer === 0)
        document.getElementById('score').innerText = 'tie';

    else if(Player.health<=0 && Enemy.health>0) {
        document.getElementsByClassName("Timer")[0].innerText = 0;
        document.getElementById('score').innerText = 'Player 2 winner';
    }
    else if(Player.health>0 && Enemy.health<=0) {
        document.getElementById('score').innerText = 'Player 1 winner';
        document.getElementsByClassName("Timer")[0].innerText = 0;
    }
}
function timeCounting(){

    if(timer > 0){

        timer--;
        setTimeout(timeCounting,1000);
        document.getElementsByClassName("Timer")[0].innerText= timer;

    }
    choosingWinner({Player, Enemy});

}
timeCounting();