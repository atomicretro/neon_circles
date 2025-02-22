import { getRandNum, ObjectPool, Sprite } from './utilities';

const pickups = ['hp'];

export default class PickupsPool extends ObjectPool {
  constructor(ctx, AssetStore) {
    super(pickups.length, ctx);

    for (let i = 0; i < pickups.length; i++) {
      let pickup = null;
      switch (pickups[i]) {
        case 'hp':
        default:
          pickup = new Pickup(ctx, 'hp', AssetStore);
          break;
      }
      this.pool.push(pickup);
    }
  }
}

class Pickup {
  constructor(ctx, type, AssetStore) {
    this.ctx = ctx;
    this.type = type;

    const storedAsset = AssetStore[type];
    this.image = storedAsset.image;
    this.width = storedAsset.width;
    this.height = storedAsset.height;
    this.sprite = new Sprite(
      ctx,
      storedAsset.image,
      this.width,
      this.height,
      storedAsset.srcX,
      storedAsset.srcY,
    );
    this.setDefaultValues();
  }

  spawn() {
    this.drawPoint = this.computeDrawPoint();
    this.spawned = true;
  }

  draw() {
    if (this.invincibilityFrames > 0) {
      this.invincibilityFrames--;
    }
    this.theta -= this.speed;
    this.drawPoint = this.computeDrawPoint();
    this.sprite.draw(this.drawPoint.x, this.drawPoint.y);
  }

  resetable() {
    if (this.life <= 0) {
      return true
    }
    return false;
  }

  computeDrawPoint() {
    return({
      x: Math.cos(this.theta) * -this.radius  + 390,
      y: Math.sin(this.theta) * -this.radius  + 232,
    });
  }

  clear() {
    this.ctx.clearRect(
      this.drawPoint.x - 5,
      this.drawPoint.y - 5,
      this.width + 10,
      this.height + 10,
    );
  }

  isHit() {
    this.life -= 1;
    this.invincibilityFrames = 50;
  }

  setDefaultValues() {
    let thetaMultiplier = Math.random() < 0.5 ? -1 : 1;
    let speedMultiplier = Math.random() < 0.5 ? -1 : 1;

    this.theta = (Math.PI / 2) * thetaMultiplier;
    this.speed = (getRandNum(4, 7) / 1000) * speedMultiplier;
    this.radius = getRandNum(200, 400); // The 'track' the pickup moves along
    this.life = 1;
    this.invincibilityFrames = 0;
    this.spawned = false;
    this.drawPoint = { x: 400, y: 250 };
  }
}
