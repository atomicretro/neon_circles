import { Sprite, ObjectPool } from './utilities';

export default class DemonPool extends ObjectPool {
  constructor(size, ctx, AssetStore, BulletPool) {
    super(size, ctx);
    this.BulletPool = BulletPool;

    for (let i = 0; i < size; i++) {
      let demon = new Demon(ctx, 'mouthDemon', AssetStore);
      this.pool.push(demon);
    }
  }
};

class Demon {
  constructor(ctx, type, AssetStore) {
    this.ctx = ctx;
    this.type = type;
    this.setDefaultValues();
    let storedAsset = AssetStore[type];
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

  spawn(demonData) {
    this.theta = demonData.theta;
    this.drawPoint = this.computeDrawPoint();
    this.speed = demonData.speed;
    this.spawned = true;
  }

  draw(BulletPool) {
      this.theta -= this.speed;
      this.drawPoint = this.computeDrawPoint();
      this.sprite.draw(this.drawPoint.x, this.drawPoint.y);

      this.chanceToFire = Math.floor(Math.random() * 101)
      if (this.chanceToFire/100 < this.fireThreshold) {
        this.fire(BulletPool);
      }
  }

  resetable() {
    if(this.isHit) return true;
    return false;
  }

  computeDrawPoint() {
    return({
      x: Math.cos(this.theta) * -this.radius  + 390,
      y: Math.sin(this.theta) * -this.radius  + 232
    })
  }

  clear() {
    this.ctx.clearRect(
      this.drawPoint.x - 5,
      this.drawPoint.y - 5,
      this.width + 10,
      this.height + 10
    );
  }

  fire(BulletPool) {
    let bulletData = {
      theta: this.theta,
      startRadius: this.radius,
      endRadius: this.radius - 20,
      speed: 4,
      startPoint: {
        x: this.drawPoint.x + this.width / 2,
        y: this.drawPoint.y + this.height / 2
      }
    };
    BulletPool.get(bulletData);
  }

  setDefaultValues() {
    this.isHit = false;
    this.chanceToFire = 0;
    this.fireThreshold = 0.01;
    this.spawned = false;
    this.drawPoint = {x: 400, y: 250};
    this.speed = 0.1;
    this.radius = 300; // The 'track' the demon moves along
  }
};