import { Drawable } from './utilities';

export default class BulletPool {
  constructor(size, context, ImageStore) {
    this.size = size;
    this.context = context;
    this.ImageStore = ImageStore;
    this.pool = [];

    for (let i = 0; i < size; i++) {
      let bullet = new Bullet();
      this.pool.push(bullet);
    }
  }

  get(x, y, speed) {
    if(!this.pool[this.size - 1].spawned) {
      this.pool[this.size - 1].spawn(x, y, speed);
      this.pool.unshift(this.pool.pop());
    }
  }

  draw() {
    for (let i = 0; i < this.size; i++) {
      if(this.pool[i].spawned && this.pool[i].draw(this.context, this.ImageStore)) {
        this.pool[i].clear();
        this.pool.push((this.pool.splice(i,1))[0]);
      } else {
        break;
      }
    }
  }
};

class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.spawned = false;
    this.height = 20;
    this.width = 20;
  }

  spawn(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.spawned = true;
  }

  draw(context, ImageStore) {
    context.clearRect(this.x, this.y, this.width, this.height);
    this.y -= this.speed;
    this.x -= this.speed;
    if (this.y <= 0 - this.height) {
      return true;
    } else {
      // debugger
      context.drawImage(ImageStore.bullet, this.x, this.y);
    };
  }

  clear() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.spawned = false;
  }
};

// Bullet.prototype = new Drawable();
