const KEY_MAP = {
  74: 'left',     // j
  76: 'right',    // l
  68: 'right',    // d
  65: 'left',     // a
  39: 'right',    // left arrow
  37: 'left',     // right arrow
  32: 'fire'      // space bar
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
    this.starboardVertex = this.computeStarboardVertex();
    this.portTheta = -1.4056;
    this.portVertex = this.computePortVertex();
    this.bowTheta = Math.PI / 2;
    this.bowVertex = this.computeBowVertex();

    this.playerImage = new Image();
    this.playerImage.src = "assets/sprites/sprite_test_1.png";

    this.draw = this.draw.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this))
  }

  computeStarboardVertex() {
    return ({
      x: Math.cos(this.starboardTheta) * this.radius + (this.fieldWidth / 2),
      y: -Math.sin(this.starboardTheta) * this.radius + (this.fieldHeight / 2)
    })
  }

  computePortVertex() {
    return ({
      x: Math.cos(this.portTheta) * this.radius  + (this.fieldWidth / 2),
      y: Math.sin(this.portTheta) * this.radius  + (this.fieldHeight / 2)
    })
  }

  computeBowVertex() {
    return ({
      x: Math.cos(this.bowTheta) * - 20  + (this.fieldWidth / 2),
      y: Math.sin(this.bowTheta) * - 20  + (this.fieldHeight / 2)
    })
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
    this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
    this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
    this.ctx.strokeStyle = 'black';
    this.ctx.fill();
  }

  keydown(e) {
    let arrow = KEY_MAP[e.keyCode];
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

    this.starboardVertex = this.computeStarboardVertex();
    this.portVertex = this.computePortVertex();
    this.bowVertex = this.computeBowVertex();
  }
}

export default Player;
