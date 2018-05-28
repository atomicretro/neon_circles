import { Drawable } from './utilities';

export default class BulletPool {
  constructor(size, context, ImageStore) {
    this.size = size;
    this.context = context;
    this.ImageStore = ImageStore;
    this.pool = [];

    for (let i = 0; i < size; i++) {
      let bullet = new Bullet('playerBullet');
      this.pool.push(bullet);
    }
  }

  get(theta, speed) {
    if(!this.pool[this.size - 1].spawned) {
      this.pool[this.size - 1].spawn(theta, speed);
      debugger
      this.pool.unshift(this.pool.pop());
      debugger
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

class Bullet {
  constructor(type) {
    this.type = type;
    this.setDefaultValues();
  }

  spawn(theta, speed) {
    this.pathAngle = theta;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);
    this.speed = speed;
    this.spawned = true;
  }

  draw(context) {
    // context.clearRect(this.x, this.y, this.width, this.height); optimize later
    this.startRadius -= this.speed;
    this.endRadius -= this.speed;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);

    if ((this.startPoint.y > -1 || this.endPoint.y > -1) &&
        (this.startPoint.y < 501 || this.endPoint.y < 501) &&
        (this.startPoint.x > -1 || this.endPoint.x > -1) &&
        (this.startPoint.x < 801 || this.endPoint.x < 801)) {
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(this.startPoint.x, this.startPoint.y);
      context.lineTo(this.endPoint.x, this.endPoint.y);
      context.stroke();
    } else {
      return true;
    };
  }

  computePoint(offset) {
    return ({
      x: Math.cos(this.pathAngle) * -offset  + this.xOffset,
      y: Math.sin(this.pathAngle) * -offset  + this.yOffset
    })
  }

  setDefaultValues() {
    if (this.type === 'playerBullet') {
      this.startRadius = 18;
      this.endRadius = 8;
      this.xOffset = 400;
      this.yOffset = 250;
    } else {
      this.startRadius = 0;
      this.endRadius = 0;
      this.xOffset = 0;
      this.yOffset = 0;
    }

    this.pathAngle = 0;
    this.startPoint = {x: 0, y: 0}
    this.endPoint = {x: 0, y: 0}
    this.speed = 0;
    this.spawned = false;
    this.height = 10;
    this.width = 10;
  }
};

// Bullet.prototype = new Drawable();
