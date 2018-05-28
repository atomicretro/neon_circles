import { Drawable, ObjectPool } from './utilities';

export default class BaddiePool extends ObjectPool {
  constructor(size, context) {
    super(size, context);

    for (let i = 0; i < size; i++) {
      let baddie = new Baddie('demon');
      this.pool.push(baddie);
    }
  }
}

class Baddie {
  constructor(type) {
    this.type = type;
    this.setDefaultValues();
  }

  spawn(x, y, radius) {
    
  }

  setDefaultValues() {
    this.chanceToFire = 0.01;
    this.spawned = false;
  }
}
