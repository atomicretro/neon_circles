export class ObjectPool {
  constructor(size) {
    this.size = size;
    this.pool = [];
  }

  get(theta, speed) {
    if(!this.pool[this.size - 1].spawned) {
      this.pool[this.size - 1].spawn(theta, speed);
      this.pool.unshift(this.pool.pop());
    }
  }

  draw() {
    for (let i = 0; i < this.size; i++) {
      if(this.pool[i].spawned) {
        if(this.pool[i].draw()) {
          this.pool[i].setDefaultValues();
          this.pool.push((this.pool.splice(i,1))[0]);
        }
      } else {
        break;
      }
    }
  }
};

export class Sprite {
  constructor(context, image, srcWidth, srcHeight) {
    this.context = context;
    this.image = image;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;
  }

  draw(drawX, drawY) {

    this.context.drawImage(
      this.image,
      drawX,
      drawY,
      this.srcWidth,
      this.srcHeight,
      // drawX,
      // drawY,
      // 21,
      // 30
    )
  }
}

export class ImageStore {
  constructor() {
    this.bullet = new Image();
    this.demon = new Image();
    // this.numImages = 2;
    // this.numLoaded = 0;
    //
    // this.bullet.onload = () => {
    //   this.imageLoaded();
    // }

    this.bullet.src = 'assets/sprites/bullet.png';
    this.demon.src = 'assets/sprites/demon_test.png';

  }

  // imageLoaded() {
  //   this.numLoaded++;
  //   if(this.numLoaded === this.numImages) game.playRound();
  // }
}
