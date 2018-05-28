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

  spawn(x, y, radius) {
    this.spawned = true;
  }

  draw() {
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
    this.sprite.draw(this.drawPoint.x, this.drawPoint.y);
    console.log(this.drawPoint);
  }

  setDefaultValues() {
    this.chanceToFire = 0.01;
    this.spawned = false;
    this.drawPoint = {x: 400, y: -50};
    this.speed = 5;
  }
}
