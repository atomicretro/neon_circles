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
    this.bulletPoint = this.computeBulletPoint();

    this.playerImage = new Image();
    this.playerImage.src = "assets/sprites/sprite_test_1.png";

    this.draw = this.draw.bind(this);
  }

  computeStarboardVertex() {
    return ({
      x: Math.cos(this.starboardTheta) * this.radius + (this.fieldWidth / 2),
      y: -Math.sin(this.starboardTheta) * this.radius + (this.fieldHeight / 2)
    })
  }

  computePortVertex() {
    return ({
      x: (Math.cos(this.portTheta) * this.radius)  + (this.fieldWidth / 2),
      y: (Math.sin(this.portTheta) * this.radius)  + (this.fieldHeight / 2)
    })
  }

  computeBowVertex() {
    return ({
      x: (Math.cos(this.bowTheta) * -20)  + (this.fieldWidth / 2),
      y: (Math.sin(this.bowTheta) * -20)  + (this.fieldHeight / 2)
    })
  }

  computeBulletPoint() {
    return ({
      x: (Math.cos(this.bowTheta) * -20)  + 400,
      y: (Math.sin(this.bowTheta) * -20)  + 250
    })
  }

  move(direction) {
    if(direction === 'left') {
      this.starboardTheta += this.speed;
      this.portTheta -= this.speed;
      this.bowTheta -= this.speed;
    } else if(direction === 'right') {
      this.starboardTheta -= this.speed;
      this.portTheta += this.speed;
      this.bowTheta += this.speed;
    }
  }

  fire(BulletPool) {
    console.log(`bowVertex.x ${this.bowVertex.x}`);
    console.log(`bowVertex.y ${this.bowVertex.y}`);
    this.bulletPoint = this.computeBulletPoint();
    BulletPool.get(this.bulletPoint.x, this.bulletPoint.y, this.bowTheta, 2);
  }

  draw() {
    this.starboardVertex = this.computeStarboardVertex();
    this.portVertex = this.computePortVertex();
    this.bowVertex = this.computeBowVertex();

    this.ctx.beginPath();
    this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
    this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
    this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
    this.ctx.strokeStyle = 'black';
    this.ctx.fill();
  }
}

export default Player;
