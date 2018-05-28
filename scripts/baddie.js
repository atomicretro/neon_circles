import { Sprite, ObjectPool } from './utilities';

export default class BaddiePool extends ObjectPool {
  constructor(size, ctx, ImageStore) {
    super(size, ctx);

    for (let i = 0; i < size; i++) {
      let baddie = new Baddie(ctx, 'demon', ImageStore);
      this.pool.push(baddie);
    }
  }
}

class Baddie {
  constructor(ctx, type, ImageStore) {
    this.ctx = ctx;
    this.type = type;
    this.setDefaultValues();
    this.sprite = new Sprite(ctx, ImageStore[type], 21, 30);

  }

  spawn(theta, speed) {
    this.theta = theta;
    this.drawPoint = this.computeDrawPoint();
    this.speed = speed;
    this.spawned = true;
  }

  draw() {
    this.theta -= this.speed;
    this.drawPoint = this.computeDrawPoint();
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
    this.sprite.draw(this.drawPoint.x, this.drawPoint.y);
  }

  computeDrawPoint() {
    return({
      x: Math.cos(this.theta) * -this.radius  + 390,
      y: Math.sin(this.theta) * -this.radius  + 232
    })
  }

  setDefaultValues() {
    this.chanceToFire = 0.01;
    this.spawned = false;
    this.drawPoint = {x: 400, y: 250};
    this.speed = 0.1;
    this.radius = 300; // The 'track' the baddie moves along
  }
}
