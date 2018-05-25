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
    this.radius = 30; // The 'track' the player moves along
    this.starboardTheta = 1.7359;
    this.starboardPoint = this.computeStarboardPoint();
    this.portTheta = -1.4056;
    this.portPoint = this.computePortPoint();
    this.bowTheta = Math.PI / 2;
    this.bowPoint = this.computeBowPoint();

    this.playerImage = new Image();
    this.playerImage.src = "assets/sprites/sprite_test_1.png";

    this.draw = this.draw.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this))
  }

  computeStarboardPoint() {
    return ({
      x: Math.cos(this.starboardTheta) * this.radius + (this.fieldWidth / 2),
      y: -Math.sin(this.starboardTheta) * this.radius + (this.fieldHeight / 2)
    })
  }

  computePortPoint() {
    return ({
      x: Math.cos(this.portTheta) * this.radius  + (this.fieldWidth / 2),
      y: Math.sin(this.portTheta) * this.radius  + (this.fieldHeight / 2)
    })
  }

  computeBowPoint() {
    return ({
      x: Math.cos(this.bowTheta) * - 20  + (this.fieldWidth / 2),
      y: Math.sin(this.bowTheta) * - 20  + (this.fieldHeight / 2)
    })
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.starboardPoint.x, this.starboardPoint.y);
    this.ctx.lineTo(this.portPoint.x, this.portPoint.y);
    this.ctx.lineTo(this.bowPoint.x, this.bowPoint.y);
    this.ctx.strokeStyle = 'black';
    this.ctx.fill();
  }

  keydown(e) {
    let arrow = ARROW_MAP[e.keyCode];
    if(arrow === 'left') {
      this.starboardTheta += this.speed;
      this.portTheta -= this.speed;
      this.bowTheta -= this.speed;
    }

    if(arrow === 'right') {
      this.starboardTheta -= this.speed;
      this.portTheta += this.speed;
      this.bowTheta += this.speed;
    }

    this.starboardPoint = this.computeStarboardPoint();
    this.portPoint = this.computePortPoint();
    this.bowPoint = this.computeBowPoint();
  }
}

export default Player;
