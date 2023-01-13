class gameSprite {
    constructor({
        position,
        imageSrc,
        scale =1,
        frameMax= 1,
        offset = {x:0,y:0} })
    {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frameMax = frameMax;
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 10;
        this.offset = offset;
    };


    Draw() {
        C.drawImage(
            this.image,
            this.currentFrame * ( this.image.width/this.frameMax ),
            0,

            this.image.width/this.frameMax,
            this.image.height,

            this.position.x-this.offset.x,
            this.position.y-this.offset.y,

            (this.image.width/this.frameMax)*this.scale,
            this.image.height*this.scale
        )
    }
    animateFrame(){

        this.framesElapsed++;

        if(this.framesElapsed%this.framesHold===0) {
            if (this.currentFrame < this.frameMax-1)
                this.currentFrame++;
            else
                this.currentFrame = 0;

        }
    }
    Update() {
        this.Draw();
        this.animateFrame();
    }

}

class Fighter extends gameSprite{
    constructor({
             position,
             velocity,
             color,
             imageSrc,
             scale =1,
             frameMax= 1,
             offset = {x:0,y:0},
             sprites })
    {
        super({
            imageSrc,
            scale,
            frameMax,
            position,
            offset
        });

        this.velocity = velocity;
        this.height = 150;
        this.lastKey;

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50,
        };

        this.width = 50;
        this.color = color;
        this.isAttacking;
        this.health =100;

        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold =10;
        this.sprites = sprites;

        this.dead = false;

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }

    Update(){
        this.Draw();
        if(!this.dead)
            this.animateFrame();

        this.attackBox.position.x = this.position.x-this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.y +=this.velocity.y;
        this.position.x +=this.velocity.x;

        if(this.position.y+this.height+this.velocity.y >=CANVAS.height-180)
            this.velocity.y = 0;
        else
            this.velocity.y +=GRAVITY;
    }
    attack(){
        this.switchSprite('attack1')
        this.isAttacking = true;

        setTimeout(()=>{
            this.isAttacking = false;
        },100)
    }
    takeHit(){
        this.health-=20;

        if(this.health<=0)
            this.switchSprite('death');
        else
            this.switchSprite('takeHit');
    }
    switchSprite(sprite){
        if(this.image===this.sprites.death.image) {
            if(this.currentFrame===this.sprites.death.frameMax-1)
                this.dead =true;
            return
        }

        if (
            this.image ===this.sprites.attack.image &&
            this.currentFrame < this.sprites.attack.frameMax -1
           ) return

        if(
            this.image===this.sprites.takeHit.image &&
            this.currentFrame <this.sprites.takeHit.frameMax-1
        ) return

        switch (sprite){
            case 'idle': {
                if((this.image !==this.sprites.idle.image)) {
                    this.image = this.sprites.idle.image;
                    this.frameMax = this.sprites.idle.frameMax;
                    this.currentFrame = 0;
                }
                break;
            }
            case 'run': {
                if(this.image!==this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.frameMax = this.sprites.run.frameMax;
                    this.currentFrame = 0;
                }
                break;
            }
            case 'jump': {
                if(this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.frameMax = this.sprites.jump.frameMax;
                    this.currentFrame = 0;
                }
                break;
            }
            case 'fall': {
                if(this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.frameMax = this.sprites.fall.frameMax;
                    this.currentFrame = 0;
                }
                break;
            }
            case 'attack1': {
                if(this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image;
                    this.frameMax = this.sprites.attack.frameMax;
                    this.currentFrame = 0;
                }
                break;
            }
            case 'takeHit': {
                if(this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.frameMax = this.sprites.takeHit.frameMax;
                    this.currentFrame = 0;
                }
                break;
            }
            case 'death': {
                if(this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.frameMax = this.sprites.death.frameMax;
                    this.currentFrame = 0;
                }
                break;
            }
        }
    }
}
