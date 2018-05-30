import { Sprite, ObjectPool } from './utilities';

export default class BaddiePool extends ObjectPool {
  constructor(size, ctx, ImageStore, BulletPool) {
    super(size, ctx);
    this.BulletPool = BulletPool;

    for (let i = 0; i < size; i++) {
      let baddie = new Baddie(ctx, 'redDemon', ImageStore);
      this.pool.push(baddie);
    }
  }
};

class Baddie {
  constructor(ctx, type, ImageStore) {
    this.ctx = ctx;
    this.type = type;
    this.setDefaultValues();
    let storedAsset = ImageStore[type];
    this.width = storedAsset.width;
    this.height = storedAsset.height;
    this.sprite = new Sprite(
      ctx,
      storedAsset.image,
      this.width,
      this.height,
      storedAsset.srcX,
      storedAsset.srcY
    );
  }

  spawn(theta, speed) {
    this.theta = theta;
    this.drawPoint = this.computeDrawPoint();
    this.speed = speed;
    this.spawned = true;
  }

  draw(BulletPool) {
    if(this.isHit) {
      return true;
    } else {
      this.theta -= this.speed;
      this.drawPoint = this.computeDrawPoint();
      this.ctx.clearRect(this.x, this.y, this.width, this.height);
      this.sprite.draw(this.drawPoint.x, this.drawPoint.y);

      this.chanceToFire = Math.floor(Math.random() * 101)
      this.fire(BulletPool);
    }
  }

  computeDrawPoint() {
    return({
      x: Math.cos(this.theta) * -this.radius  + 390,
      y: Math.sin(this.theta) * -this.radius  + 232
    })
  }

  fire(BulletPool) {
    let bulletSpeed = 0.5;
    BulletPool.get(this.theta, bulletSpeed);
  }

  setDefaultValues() {
    this.isHit = false;
    this.chanceToFire = 0;
    this.fireThreshold = 0.01;
    this.spawned = false;
    this.drawPoint = {x: 400, y: 250};
    this.speed = 0.1;
    this.radius = 300; // The 'track' the baddie moves along
  }
};
