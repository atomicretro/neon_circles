class Player {
  constructor(ctx, pcFieldWidth, pcFieldHeight, BulletPool) {
    this.ctx = ctx;
    this.pcFieldWidth = pcFieldWidth;
    this.pcFieldHeight = pcFieldHeight;
    this.BulletPool = BulletPool;

    this.width = 15;
    this.height = 15;

    this.speed = 0.2;
    this.radius = 30; // The 'track' the player moves along
    this.fireCooldown = 15;
    this.fireCharge = 0;
    this.starboardTheta = 1.9106;
    this.starboardVertex = this.computeStarboardVertex();
    this.portTheta = -1.23;
    this.portVertex = this.computePortVertex();
    this.bowTheta = Math.PI / 2;
    this.bowVertex = this.computeBowVertex();
    this.hitboxCenter = this.computeHitboxCenter();

    this.draw = this.draw.bind(this);
    this.fire = this.fire.bind(this);
  }

  computeStarboardVertex() {
    return ({
      x: Math.cos(this.starboardTheta) * this.radius + this.pcFieldWidth / 2,
      y: -Math.sin(this.starboardTheta) * this.radius + this.pcFieldHeight / 2
    })
  }

  computePortVertex() {
    return ({
      x: Math.cos(this.portTheta) * this.radius  + this.pcFieldWidth / 2,
      y: Math.sin(this.portTheta) * this.radius  + this.pcFieldHeight / 2
    })
  }

  computeBowVertex() {
    return ({
      x: Math.cos(this.bowTheta) * -10  + this.pcFieldWidth / 2,
      y: Math.sin(this.bowTheta) * -10  + this.pcFieldHeight / 2
    })
  }

  computeHitboxCenter() {
    return ({
      x: Math.cos(this.bowTheta) * -22  + this.pcFieldWidth / 2,
      y: Math.sin(this.bowTheta) * -22  + this.pcFieldHeight / 2
    })
  }

  move(keyStatus) {
    this.fireCharge++; // increments once every frame
    if(keyStatus.left) {
      this.starboardTheta += this.speed;
      this.portTheta -= this.speed;
      this.bowTheta -= this.speed;
    } else if(keyStatus.right) {
      this.starboardTheta -= this.speed;
      this.portTheta += this.speed;
      this.bowTheta += this.speed;
    }

    if(keyStatus.fire && this.fireCharge >= this.fireCooldown) this.fire();
  }

  fire() {
    this.fireCharge = 0;
    let bulletSpeed = 3;
    this.BulletPool.get(this.bowTheta, bulletSpeed);
  }

  draw() {
    this.starboardVertex = this.computeStarboardVertex();
    this.portVertex = this.computePortVertex();
    this.bowVertex = this.computeBowVertex();
    this.hitboxCenter = this.computeHitboxCenter();

    this.ctx.beginPath();
    this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
    this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
    this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'green';
    this.ctx.arc(this.hitboxCenter.x, this.hitboxCenter.y, 9, 0,2*Math.PI);
    this.ctx.fill();
  }

  isHit() {
    console.log('ouch!');
  }
}

export default Player;
