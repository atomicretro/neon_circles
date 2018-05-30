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
};

// Bullet.prototype = new Sprite();
