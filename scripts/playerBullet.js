import { Sprite, ObjectPool } from './utilities';
import Bullet from './bullet';

export default class BulletPool extends ObjectPool {
  constructor(size, fgCanvas) {
    super(size);

    for(let i = 0; i < size; i++) {
      let bullet = new PlayerBullet(fgCanvas);
      this.pool.push(bullet);
    }
  }
};

class PlayerBullet extends Bullet {
  constructor(fgCanvas) {
    super(fgCanvas, 'player');
  }

  spawn(bulletData) {
    this.pathAngle = bulletData.theta;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);
    this.speed = bulletData.speed;
    this.spawned = true;
  }
};
