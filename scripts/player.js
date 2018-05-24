const ARROW_MAP = {
  40: 'up',
  39: 'right',
  38: 'down',
  37: 'left'
};

class Player {
  constructor(ctx, fieldWidth, fieldHeight) {
    this.ctx = ctx;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.width = 10;
    this.height = 10;
    this.x = fieldWidth / 2;
    this.y = fieldHeight / 2 - 30;
    this.angle = 0.1 * Math.PI;
    this.startPoint = startPoint;

    this.rotateX = this.rotateX.bind(this);
    this.rotateY = this.rotateY.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this))
  }

  // draw() {
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(this.rotateX(this.x), this.rotateY(this.y + 10));
  //   this.ctx.lineTo(this.rotateX(this.x + 5), this.rotateY(this.y));
  //   this.ctx.lineTo(this.rotateX(this.x - 5), this.rotateY(this.y));
  //   this.ctx.fill();
  // }
  //
  // rotateX() {
  //   let sin = sin(angle);
  //   let cos = cos(angle);
  //   this.x = this.x - this.fieldWidth / 2;
  //   this.x = this.x
  //   xnew = p.x * c - p.y * s;
  // }
  //
  // rotateY() {
  //   let sin = sin(angle);
  //   let cos = cos(angle);
  // }

  keydown(e) {
    let arrow = ARROW_MAP[e.keyCode];

    if(arrow === 'left') this.x -= this.angle;
    if(arrow === 'right') this.x += this.angle;
  }
}

export default Player;
