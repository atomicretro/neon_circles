import { ObjectPool } from './utilities';

export default class BulletPool extends ObjectPool {
  constructor(size, fgCanvas, type) {
    super(size);

    for(let i = 0; i < size; i++) {
      let bullet = new Bullet(fgCanvas, type);
      this.pool.push(bullet);
    };
  }
};

class Bullet {
  constructor(fgCanvas, type) {
    this.ctx = fgCanvas.ctx;
    this.ctxWidth = fgCanvas.width;
    this.ctxHeight = fgCanvas.height;
    this.resetX = fgCanvas.width + 5;
    this.resetY = fgCanvas.height + 5;
    this.setDefaultValues(type);
  }

  spawn(bulletData) {
    this.pathAngle = bulletData.theta;
    this.startRadius = bulletData.startRadius;
    this.endRadius = bulletData.endRadius;
    this.speed = bulletData.speed;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);
    this.spawned = true;
  }

  draw() {
    this.startRadius -= this.speed;
    this.endRadius -= this.speed;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);

    this.clear();
  }

  resetable() {
    if(
        (this.startPoint.y > -5 || this.endPoint.y > -5) &&
        (this.startPoint.y < this.resetY || this.endPoint.y < this.resetY) &&
        (this.startPoint.x > -5 || this.endPoint.x > -5) &&
        (this.startPoint.x < this.resetX || this.endPoint.x < this.resetX)
      ) {
        return false;
    } else {
        return true;
    };
  }

  clear() {
    let startX;
    let startY;

    if(this.startPoint.x > this.endPoint.x) {
      startX = this.endPoint.x;
    } else {
      startX = this.startPoint.x;
    }
    if(this.startPoint.y > this.endPoint.y) {
      startY = this.endPoint.y;
    } else {
      startY = this.startPoint.y;
    }

    this.ctx.clearRect(startX, startY, 16, 16);
  }

  computePoint(radius) {
    // create a computeOffset funciton that works on a half circle tilted 45degrees
    // when pc is on top left of circle drawpoint needs to be in topleft;
    // when pc is on bottom right of circle drawpoint needs to be in *topleft*
    return ({
      x: Math.cos(this.pathAngle) * -radius + this.xOffset - 5,
      y: Math.sin(this.pathAngle) * -radius + this.yOffset - 5
    })
  }

  setDefaultValues(type) {
    this.xOffset = this.ctxWidth / 2;
    this.yOffset = this.ctxHeight / 2;
    this.pathAngle = 0;
    this.startPoint = {x: 0, y: 0}
    this.endPoint = {x: 0, y: 0}
    this.speed = 0;
    this.spawned = false;
  }
};
