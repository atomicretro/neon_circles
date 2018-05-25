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
    this.outerAngle = 0.5 * Math.PI;
    this.radius = 20;
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
      x: Math.cos(this.outerAngle) * this.radius + (this.fieldWidth / 2),
      y: -Math.sin(this.outerAngle) * this.radius + (this.fieldHeight / 2)
    })
  }

  draw() {
    // this.rotatePlayer();
    this.ctx.beginPath();
    this.ctx.moveTo(this.drawPoint.x, this.drawPoint.y);
    this.ctx.lineTo(
      this.drawPoint.x - 5 * Math.cos(Math.PI / 6),
      this.drawPoint.y - 10 * Math.sin(Math.PI / 6)
    );
    this.ctx.lineTo(
      this.drawPoint.x + 5 * Math.cos(Math.PI / 6),
      this.drawPoint.y - 10 * Math.sin(Math.PI / 6)
    );
    this.ctx.strokeStyle = 'black';
    this.ctx.fill();
    console.log(this.outerAngle - Math.PI/2);

    // this.ctx.drawImage(
    //   this.playerImage,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   this.drawPoint.x,
    //   this.drawPoint.y,
    //   this.width,
    //   this.height
    // );

    this.ctx.beginPath();
    this.ctx.moveTo(this.fieldWidth / 2, this.fieldHeight / 2);
    this.ctx.lineTo(this.drawPoint.x, this.drawPoint.y);
    this.ctx.lineWidth = 1;
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
    this.ctx.save();
    this.ctx.translate(this.drawPoint.x, this.drawPoint.y);
    this.ctx.rotate(this.outerAngle);
    this.ctx.restore();
  }

  keydown(e) {
    let arrow = ARROW_MAP[e.keyCode];

    if(arrow === 'left') this.outerAngle += this.speed;
    if(arrow === 'right') this.outerAngle -= this.speed;
    this.drawPoint = this.computeDrawPoint();
  }
}

export default Player;
