export class Drawable {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export class imageStore {
  constructor() {
    this.bullet = new Image();

    this.bullet.src = 'assets/sprites/bullet.png'
  }
}
