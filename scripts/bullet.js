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

  get(theta, speed) {
    if(!this.pool[this.size - 1].spawned) {
      this.pool[this.size - 1].spawn(theta, speed);
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
    this.pathAngle = 0;
    this.startOffset = 18;
    this.startPoint = {x: 0, y: 0}
    this.endOffset = 8;
    this.endPoint = {x: 0, y: 0}
    this.speed = 0;
    this.spawned = false;
    this.height = 10;
    this.width = 10;
  }

  spawn(theta, speed) {
    this.pathAngle = theta;
    this.startPoint = this.computePoint(this.startOffset);
    this.endPoint = this.computePoint(this.endOffset);
    this.speed = speed;
    this.spawned = true;
  }

  draw(context) {
    // context.clearRect(this.x, this.y, this.width, this.height); optimize later
    this.startOffset -= this.speed;
    this.endOffset -= this.speed;
    this.startPoint = this.computePoint(this.startOffset);
    this.endPoint = this.computePoint(this.endOffset);

    if (this.y <= 0 - this.height) {
      return true;
    } else {
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(this.startPoint.x, this.startPoint.y);
      context.lineTo(this.endPoint.x, this.endPoint.y);
      context.stroke();
    };
  }

  computePoint(offset) {
    return ({
      x: Math.cos(this.pathAngle) * -offset  + 400,
      y: Math.sin(this.pathAngle) * -offset  + 250
    })
  }

  clear() {
    this.pathAngle = 0;
    this.startOffset = 18;
    this.startPoint = {x: 0, y: 0}
    this.endOffset = 8;
    this.endPoint = {x: 0, y: 0}
    this.speed = 0;
    this.spawned = false;
  }
};

// Bullet.prototype = new Drawable();
