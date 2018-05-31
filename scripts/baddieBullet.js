import { Sprite, ObjectPool } from './utilities';
import Bullet from './bullet';

export default class BulletPool extends ObjectPool {
  constructor(size, fgCanvas, type) {
    super(size);

    for (let i = 0; i < size; i++) {
      let bullet = new BadBullet(fgCanvas, type);
      this.pool.push(bullet);
    }
  }
}

class BadBullet extends Bullet {
  constructor(fgCanvas, type) {
    super(fgCanvas, type);
  }

  spawn(bulletData) {
    // debugger
    this.pathAngle = bulletData.theta;
    this.speed = bulletData.speed;
    this.startPoint = this.computePoint(bulletData.radius);
    this.endPoint = this.computePoint(bulletData.radius - 20);
    this.startRadius = bulletData.radius;
    this.endRadius = bulletData.radius - 20;
    this.spawned = true;
  }
};

// Bullet.prototype = new Sprite();
