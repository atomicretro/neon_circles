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
    this.speed = 0.1;
    this.angle = 0.5526 * Math.PI;
    this.radius = 30;
    this.drawPoint = this.computeDrawPoint();

    this.playerImage = new Image();
    this.playerImage.src = "assets/sprites/sprite_test_1.png";

    this.computeDrawPoint = this.computeDrawPoint.bind(this);
    this.draw = this.draw.bind(this);
    this.rotatePlayer = this.rotatePlayer.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this))
  }

  computeDrawPoint() {
    return ({
      x: Math.cos(this.angle) * this.radius + (this.fieldWidth / 2),
      y: -Math.sin(this.angle) * this.radius + (this.fieldHeight / 2)
    })
  }

  draw() {
    this.ctx.drawImage(
      this.playerImage,
      0,
      0,
      this.width,
      this.height,
      this.drawPoint.x,
      this.drawPoint.y,
      this.width,
      this.height
    );
    // this.ctx.rotate(this.angle);

    this.ctx.beginPath();
    this.ctx.moveTo(this.fieldWidth / 2, this.fieldHeight / 2);
    this.ctx.lineTo(this.drawPoint.x, this.drawPoint.y);
    this.ctx.strokeStyle = 'green';
    this.ctx.stroke();
  }

  // computeRadius() {
  //   return Math.sqrt(
  //     Math.pow((this.drawPoint.x - this.fieldWidth / 2), 2) +
  //     Math.pow((this.drawPoint.y - this.fieldHeight / 2), 2)
  //   )
  // }

  // draw() {
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(this.rotateX(this.x), this.rotateY(this.y + 10));
  //   this.ctx.lineTo(this.rotateX(this.x + 5), this.rotateY(this.y));
  //   this.ctx.lineTo(this.rotateX(this.x - 5), this.rotateY(this.y));
  //   this.ctx.fill();
  // }

  rotatePlayer() {
    let sin = sin(angle);
    let cos = cos(angle);
    this.x = this.x - this.fieldWidth / 2;
    this.x = this.x
    xnew = p.x * c - p.y * s;
  }

  keydown(e) {
    let arrow = ARROW_MAP[e.keyCode];

    if(arrow === 'left') this.angle += this.speed;
    if(arrow === 'right') this.angle -= this.speed;
    this.drawPoint = this.computeDrawPoint();
  }
}

export default Player;
