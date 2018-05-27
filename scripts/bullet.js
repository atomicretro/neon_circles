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

  get(x, y, theta, speed) {
    if(!this.pool[this.size - 1].spawned) {
      this.pool[this.size - 1].spawn(x, y, theta, speed);
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
    this.startPoint = {x: 0, y: 0}
    this.endPoint = {x: 0, y: 0}
    this.pathAngle = 0;
    this.speed = 0;
    this.spawned = false;
    this.height = 20;
    this.width = 20;
  }

  spawn(x, y, theta, speed) {
    this.startPoint = this.computeStartPoint();
    this.endPoint = this.computeEndPoint();
    this.pathAngle = theta;
    this.speed = 0;
    this.spawned = true;
  }

  draw(context) {
    context.clearRect(this.x, this.y, this.width, this.height);
    // this.startPoint = this.computeStartPoint();
    this.endPoint = this.computeEndPoint();
    if (this.y <= 0 - this.height) {
      return true;
    } else {
      console.log(this.endPoint);
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(this.startPoint.x, this.startPoint.y);
      context.lineTo(this.endPoint.x, this.endPoint.y);
      context.stroke();
    };
  }

  computeStartPoint() {
    return ({
      x: Math.cos(this.pathAngle) * - 20  + 400,
      y: Math.sin(this.pathAngle) * - 20  + 250
    })
  }

  computeEndPoint() {
    return ({
      x: Math.cos(this.pathAngle) * - 20  + 400,
      y: Math.sin(this.pathAngle) * - 20  + 255
    })
  }

  clear() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.spawned = false;
  }
};

// Bullet.prototype = new Drawable();
