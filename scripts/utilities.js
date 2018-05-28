export class ObjectPool {
  constructor(size, context, ImageStore) {
    this.size = size;
    this.context = context;
    this.ImageStore = ImageStore;
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
        if(this.pool[i].draw(this.context, this.ImageStore)) {
          this.pool[i].setDefaultValues();
          this.pool.push((this.pool.splice(i,1))[0]);
        }
      } else {
        break;
      }
    }
  }
};

export class Drawable {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export class ImageStore {
  constructor() {
    this.bulletSheet = new Image();
    this.demonSheet = new Image();
    // this.numImages = 2;
    // this.numLoaded = 0;
    //
    // this.bullet.onload = () => {
    //   this.imageLoaded();
    // }

    this.bulletSheet.src = 'assets/sprites/bullet.png';
    this.demonSheet.src = 'assets/sprites/demon_sheet.png';
  }

  // imageLoaded() {
  //   this.numLoaded++;
  //   if(this.numLoaded === this.numImages) game.playRound();
  // }
}
