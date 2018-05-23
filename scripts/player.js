const ARROW_MAP = {
  40: 'up',
  39: 'right',
  38: 'down',
  37: 'left'
};

class Player {
  constructor(ctx, startPoint) {
    this.ctx = ctx;
    this.width = 10;
    this.height = 10;
    this.x = startPoint.x;
    this.y = startPoint.y;
    this.speed = 5;
    this.startPoint = startPoint;

    document.addEventListener('keydown', this.keydown.bind(this))
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y + 10);
    this.ctx.lineTo(this.x + 5, this.y);
    this.ctx.lineTo(this.x - 5, this.y);
    this.ctx.fill();
  }

  keydown(e) {
    let arrow = ARROW_MAP[e.keyCode];

    if(arrow === 'left') this.x -= this.speed;
    if(arrow === 'right') this.x += this.speed;
  }
}

export default Player;
