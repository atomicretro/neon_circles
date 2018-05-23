const ARROW_MAP = {
  40: 'up',
  39: 'right',
  38: 'down',
  37: 'left'
};

class Player {
  constructor(ctx, fieldWidth, fieldHeight) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = 0;
    this.y = 0;
    this.speed = 5;
    document.addEventListener('keydown', this.keydown.bind(this))
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }

  getBorders() {
    return {
      xMin: this.x,
      xMax: this.x + this.width,
      yMin: this.y,
      yMax: this.y + this.height,
    }
  }

  keydown(e) {
    let arrow = ARROW_MAP[e.keyCode];

    if (arrow === 'left') {
      this.x -= this.speed;
    }
    if (arrow === 'right') {
      this.x += this.speed;
    }
    if (arrow === 'up') {
      this.y += this.speed;
    }
    if (arrow === 'down') {
      this.y -= this.speed;
    }
  }
}

export default Player;
