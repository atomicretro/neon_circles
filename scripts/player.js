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
    this.radius = 30;
    this.drawAngle = 1.7359;
    this.portAngle = -1.4056;
    this.bowAngle = Math.PI / 2;
    this.drawPoint = this.computeDrawPoint();
    this.portPoint = this.computePortPoint();
    this.bowPoint = this.computeBowPoint();

    this.playerImage = new Image();
    this.playerImage.src = "assets/sprites/sprite_test_1.png";

    this.computeDrawPoint = this.computeDrawPoint.bind(this);
    this.computePortPoint = this.computePortPoint.bind(this);
    this.computeBowPoint = this.computeBowPoint.bind(this);
    this.draw = this.draw.bind(this);
    this.rotatePlayer = this.rotatePlayer.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this))
  }

  computeDrawPoint() {
    return ({
      x: Math.cos(this.drawAngle) * this.radius + (this.fieldWidth / 2),
      y: -Math.sin(this.drawAngle) * this.radius + (this.fieldHeight / 2)
    })
  }

  computePortPoint() {
    return ({
      x: Math.cos(this.portAngle) * this.radius  + (this.fieldWidth / 2),
      y: Math.sin(this.portAngle) * this.radius  + (this.fieldHeight / 2)
    })
  }

  computeBowPoint() {
    return ({
      x: Math.cos(this.bowAngle) * (this.radius)  + (this.fieldWidth / 2),
      y: Math.sin(this.bowAngle) * (this.radius)  + (this.fieldHeight / 2)
    })
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.drawPoint.x, this.drawPoint.y);
    this.ctx.lineTo(this.portPoint.x, this.portPoint.y);
    this.ctx.lineTo(this.bowPoint.x, this.bowPoint.y);
    this.ctx.strokeStyle = 'black';
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(this.fieldWidth / 2, this.fieldHeight / 2);
    this.ctx.lineTo(this.drawPoint.x, this.drawPoint.y);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'green';
    this.ctx.stroke();
  }

  keydown(e) {
    let arrow = ARROW_MAP[e.keyCode];
    if(arrow === 'left') {
      this.drawAngle += this.speed;
      this.portAngle -= this.speed;
      this.bowAngle -= this.speed;
    }

    if(arrow === 'right') {
      this.drawAngle -= this.speed;
      this.portAngle += this.speed;
      this.bowAngle += this.speed;
    }

    this.drawPoint = this.computeDrawPoint();
    this.portPoint = this.computePortPoint();
    this.bowPoint = this.computeBowPoint();
    console.log(this.drawPoint);
    console.log(this.portPoint);
    console.log(this.bowPoint);
  }
}

export default Player;
