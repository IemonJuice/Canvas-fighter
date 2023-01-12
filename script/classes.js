class Fighter {
    constructor({position, velocity,color,offset}) {
        this.position = position;
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
    }
    Draw(){
        C.fillStyle = this.color;
        C.fillRect(this.position.x, this.position.y,this.width,this.height);
        //attack box
        if(Player.isAttacking) {
            C.fillStyle = 'green'
            C.fillRect(
                this.attackBox.position.x - 50,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }
    }
    Update(){
        this.Draw();
        this.attackBox.position.x = this.position.x-this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y-0;
        this.position.y +=this.velocity.y;
        this.position.x +=this.velocity.x;
        if(this.position.y+this.height+this.velocity.y >=CANVAS.height-40)
            this.velocity.y = 0;
        else
            this.velocity.y +=GRAVITY;
    }
    attack(){
        this.isAttacking = true;
        setTimeout(()=>{
            this.isAttacking = false;
        },100)
    }
}
class gameSprite {
    constructor({position, imageSrc}) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
    };


    Draw() {
        C.drawImage(this.image, this.position.x, this.position.y)
    }

    Update() {
        this.Draw();
    }

}