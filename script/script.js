"use strict"

const CANVAS = document.querySelector('canvas');
const C = CANVAS.getContext('2d');
const GRAVITY = 0.60;

const background = new gameSprite({
    position: {
        x : 0,
        y : 0
    },
    imageSrc : './img/BACKGROUND.png'
})

const bannerCoke = new gameSprite({
    position: {
        x : 685,
        y : 200
    },

    scale: 2,
    imageSrc : './img/spritesheet.png',
    frameMax: 3
})

const banerNeon = new gameSprite({
    position: {
        x : 695,
        y : 400
    },
    scale: 2,
    imageSrc : './img/spritesheet (1).png',
    frameMax: 4
})

CANVAS.width = 1900;
CANVAS.height = 100;

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

    imageSrc: './img/hero2/Idle.png',
    frameMax:8,
    scale:4,
    offset:{
        x: 0,
        y: 235
    },
    sprites:{
        idle: {
            imageSrc:'./img/hero2/Idle.png',
            frameMax: 8
        },
        run: {
            imageSrc:'./img/hero2/Run.png',
            frameMax: 8
        },
        jump: {
            imageSrc:'./img/hero2/Jump.png',
            frameMax: 2
        },
        fall:{
            imageSrc:'./img/hero2/Fall.png',
            frameMax: 2
        },
        attack:{
            imageSrc:'./img/hero2/Attack1.png',
            frameMax: 5
        },
        takeHit : {
            imageSrc: './img/hero2/Take hit.png',
            frameMax: 3
        },
        death :{
            imageSrc: './img/hero2/Death.png',
            frameMax: 8
        }
    },
    attackBox: {
        offset: {
            x: 50,
            y: 0
        },
        width: 200,
        height: 50
    }
});

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

    imageSrc: './img/hero1/Idle.png',
    frameMax:4,
    scale:4,
    offset:{
        x: 0,
        y: 360
    },
    sprites:{
        idle : {
            imageSrc:'./img/hero1/Idle.png',
            frameMax: 4
        },
        run : {
            imageSrc:'./img/hero1/Run.png',
            frameMax: 8
        },
        jump : {
            imageSrc:'./img/hero1/Jump.png',
            frameMax: 2
        },
        fall : {
            imageSrc:'./img/hero1/Fall.png',
            frameMax: 2
        },
        attack : {
            imageSrc:'./img/hero1/Attack1.png',
            frameMax: 4
        },
        takeHit : {
            imageSrc: './img/hero1/Take hit.png',
            frameMax: 3
        },
        death :{
            imageSrc: './img/hero1/Death.png',
            frameMax: 7
        }
    },
    attackBox: {
        offset: {
            x: 0,
            y: 0
        },
        width: 100,
        height: 50
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
    bannerCoke.Update();
    Player.Update();
    Enemy.Update();
    banerNeon.Update();
    Player.velocity.x = 0;
    Enemy.velocity.x = 0
    C.fillStyle = 'black';
//Player movement

    if(key.a.pressed && Player.lastKey ==='a') {
        Player.velocity.x = -4;
        Player.switchSprite('run');
    }
    else if(key.d.pressed && Player.lastKey ==='d') {
        Player.velocity.x = 4;
        Player.switchSprite('run')
    }
    else if(key.w.pressed && (Player.position.y >=750)&&(Player.position.y <=751))
        Player.velocity.y = -20;

    else
        Player.switchSprite('idle');

    if(Player.velocity.y<0)
        Player.switchSprite('jump');

    else if(Player.velocity.y>0)
        Player.switchSprite('fall');

//Enemy movement
    if(key.ArrowLeft.pressed && Enemy.lastKey ==='ArrowLeft') {
        Enemy.velocity.x = -4;
        Enemy.switchSprite('run')
    }
    else if(key.ArrowRight.pressed && Enemy.lastKey ==='ArrowRight') {
        Enemy.velocity.x = 4;
        Enemy.switchSprite('run')
    }

    else if(key.ArrowUp.pressed && (Enemy.position.y >=750)&&(Enemy.position.y <=751))
        Enemy.velocity.y = -20;

    else
        Enemy.switchSprite('idle');


    if(key.ArrowUp.pressed && (Enemy.position.y >=750)&&(Enemy.position.y <=751))
        Enemy.switchSprite('jump');


    if(Enemy.velocity.y<0)
        Enemy.switchSprite('jump');

    else if(Enemy.velocity.y>0)
        Enemy.switchSprite('fall');


    //detect a collision
    if(RectangularCollision({rectangle1:Player,rectangle2:Enemy}) && Player.isAttacking){
        Player.isAttacking = false;
        Enemy.takeHit();
        document.getElementById('EnemyHealthbar').style.width = Enemy.health+ '%';
        }

    if(RectangularCollision({rectangle1:Enemy,rectangle2:Player}) && Enemy.isAttacking){
        Enemy.isAttacking = false;
        Player.takeHit();
        document.getElementById('PlayerHealthbar').style.width = Player.health+ '%';
    }
}
animate();

window.addEventListener('keydown',(event)=>{
    if(!Player.dead) {

        switch (event.code) {

            case 'KeyD': {
                key.d.pressed = true;
                Player.lastKey = 'd'
                break;

            }

            case 'KeyA': {
                key.a.pressed = true;
                Player.lastKey = 'a'
                break;
            }

            case 'KeyW': {
                Player.lastKey = 'w';
                key.w.pressed = true;
                break;
            }

            case 'Space': {
                Player.attack();
                break;
            }
        }
    }
    if(!Enemy.dead) {

        switch (event.key) {

            case 'ArrowRight': {
                key.ArrowRight.pressed = true;
                Enemy.lastKey = 'ArrowRight'
                break;
            }
            case 'ArrowLeft': {
                key.ArrowLeft.pressed = true;
                Enemy.lastKey = 'ArrowLeft'
                break;
            }
            case 'ArrowUp': {
                key.ArrowUp.pressed = true;
                Enemy.lastKey = 'ArrowUp';
                break;
            }
            case 'ArrowDown': {
                Enemy.attack();
                break;
            }
        }
    }
})
window.addEventListener('keyup',(event)=>{

    switch (event.code){

        case 'KeyD':{
            key.d.pressed = false;
            break;
        }
        case 'KeyA':{
            key.a.pressed = false;
            break;
        }
        case 'KeyW':{
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

    if(Player.health===Enemy.health&&timer === 0) {
        document.getElementById('score').style.display = 'flex';
        document.getElementById('score').innerText = 'TIE';
    }


    else if(Player.health<=0 && Enemy.health>0) {
        document.getElementsByClassName("Timer")[0].innerText = 0;
        document.getElementById('score').innerText = 'Player 2 winner';
        document.getElementById('score').style.display = 'flex';
    }
    else if(Player.health>0 && Enemy.health<=0) {
        document.getElementById('score').innerText = 'Player 1 winner';
        document.getElementById('score').style.display = 'flex';
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