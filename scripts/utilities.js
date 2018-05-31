export class ObjectPool {
  constructor(size) {
    this.size = size;
    this.pool = [];
  }

  get(objectData) {
    if(!this.pool[this.size - 1].spawned) {
      this.pool[this.size - 1].spawn(objectData);
      this.pool.unshift(this.pool.pop());
    }
  }

  draw(type) {
    for (let i = 0; i < this.size; i++) {
      if(this.pool[i].spawned) {
        if(this.pool[i].draw(this.BulletPool)) {
          this.pool[i].setDefaultValues(type);
          this.pool.push((this.pool.splice(i,1))[0]);
        }
      } else {
        break;
      }
    }
  }
};

export class Sprite {
  constructor(context, image, srcWidth, srcHeight, srcX, srcY) {
    this.context = context;
    this.image = image;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;

    this.draw = this.draw.bind(this);
  }

  draw(drawPointX, drawPointY) {
    this.context.drawImage(
      this.image,
      this.srcX,
      this.srcY,
      this.srcWidth,
      this.srcHeight,
      drawPointX,
      drawPointY,
      this.srcWidth,  // drawn image width, same as src
      this.srcHeight  // drawn image height, same as src
    )
  }
}

export class ImageStore {
  constructor(field) {
    this.field = field;
    this.backgroundSky = { image: new Image() }
    this.backgroundCity = { image: new Image() }
    this.bullet = { image: new Image() }
    this.redDemon = {
      image: new Image(),
      width: 21,
      height: 30,
      srcX: 0,
      srcY: 0
    }
    this.heart = { image: new Image() }
    this.numImages = 3;
    this.numLoaded = 0;
    this.ready = false;

    this.backgroundSky.image.onload = () => {
      this.imageLoaded();
    }
    this.backgroundCity.image.onload = () => {
      this.imageLoaded();
    }
    this.bullet.image.onload = () => {
      this.imageLoaded();
    }
    this.redDemon.image.onload = () => {
      this.imageLoaded();
    }
    this.heart.image.onload = () => {
      this.imageLoaded();
    }

    this.backgroundSky = 'assets/sprites/sky.png';
    this.backgroundCity = 'assets/sprites/city_background.png';
    this.bullet.image.src = 'assets/sprites/bullet.png';
    this.redDemon.image.src = 'assets/sprites/demon_test.png';
    this.heart.image.src = 'assets/sprites/heart.png';
  }

  imageLoaded() {
    this.numLoaded++;
    if(this.numLoaded === this.numImages) this.field.startRound();
  }
}
