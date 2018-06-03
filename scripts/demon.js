import { Sprite, ObjectPool } from './utilities';

const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

export default class DemonPool extends ObjectPool {
  constructor(size, ctx, AssetStore, BulletPool) {
    super(size, ctx);
    this.BulletPool = BulletPool;

    let demons = [
      'mouthDemon', 'mouthDemon',
      'eyeDemon', 'eyeDemon',
      'faceDemon', 'faceDemon', 'bossDemon'
    ]

    for (let i = 0; i < size; i++) {
      let demon = new Demon(ctx, demons[i], AssetStore);
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

  spawn() {
    this.drawPoint = this.computeDrawPoint();
    this.spawned = true;
  }

  draw(BulletPool) {
      if(this.type === 'faceDemon') {
        if(this.radius > this.endRadius) {
          this.radius -= Math.abs(this.speed * 100);
        } else {
          debugger
          this.speed = this.endSpeed;
        }
      };

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
    let thetaMultiplier = Math.random() < 0.5 ? -1 : 1;
    let speedMultiplier = Math.random() < 0.5 ? -1 : 1;

    if(this.type === 'mouthDemon' || this.type === 'eyeDemon') {
      this.theta = (Math.PI / 2) * thetaMultiplier;
      this.speed = (getRandNum(4, 7) / 1000) * speedMultiplier;
      this.radius = getRandNum(265, 380); // The 'track' the demon moves along
      this.fireThreshold = 0.01;
    } else if(this.type === 'faceDemon') {
      this.theta = (Math.PI / 2) * thetaMultiplier;
      this.speed = (getRandNum(6, 9) / 1000) * speedMultiplier;
      this.endSpeed = this.speed * 2;
      this.radius = 400;
      this.endRadius = getRandNum(125, 225);
      this.fireThreshold = 0.02;
    } else if(this.type === 'bossDemon') {
      this.speed = 0.4;

    }
    this.isHit = false;
    this.chanceToFire = 0;
    this.spawned = false;
    this.drawPoint = {x: 400, y: 250};
  }
};

// class MouthDemon extends Demon {
//   constructor(ctx, type, AssetStore) {
//     super(ctx, type, AssetStore);
//   }
// };
