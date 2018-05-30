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
};
