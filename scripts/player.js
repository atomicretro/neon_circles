class Player {
  constructor(pcCanvas, BulletPool) {
    this.ctx = pcCanvas.ctx;
    this.pcFieldWidth = pcCanvas.width;
    this.pcFieldHeight = pcCanvas.height;
    this.BulletPool = BulletPool;

    this.velocity = 0;
    this.acceleration = 0.02;
    this.maxSpeed = 0.3;
    this.radius = 30; // The 'track' the player moves along
    this.fireCharge = 0;
    this.fireCooldown = 25;
    this.damageFrames = 100;

    this.portTheta = -1.23;
    this.starboardTheta = 1.9106;
    this.bowTheta = Math.PI / 2;
    this.portVertex = this.computePortVertex();
    this.starboardVertex = this.computeStarboardVertex();
    this.bowVertex = this.computeCenterPoints(-10);
    this.hitboxCenter = this.computeCenterPoints(-22);

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

  computeCenterPoints(radius) {
    return ({
      x: Math.cos(this.bowTheta) * radius  + this.pcFieldWidth / 2,
      y: Math.sin(this.bowTheta) * radius  + this.pcFieldHeight / 2
    })
  }

  move(keyStatus) {
    this.fireCharge++; // increments once every frame
    this.damageFrames++; // increments once every frame
    if(keyStatus.left) {
      if(this.velocity <= this.maxSpeed) this.velocity += this.acceleration;
      this.starboardTheta += this.velocity;
      this.portTheta -= this.velocity;
      this.bowTheta -= this.velocity;
    } else if(keyStatus.right) {
      if(this.velocity <= this.maxSpeed) this.velocity += this.acceleration;
      this.starboardTheta -= this.velocity;
      this.portTheta += this.velocity;
      this.bowTheta += this.velocity;
    } else {
      this.velocity = 0;
    }

    if(keyStatus.fire && this.fireCharge >= this.fireCooldown) this.fire();
  }

  fire() {
    this.fireCharge = 0;
    let bulletData = {
      theta: this.bowTheta,
      speed: 3.5
    }
    this.BulletPool.get(bulletData);
  }

  draw() {
    this.starboardVertex = this.computeStarboardVertex();
    this.portVertex = this.computePortVertex();
    this.bowVertex = this.computeCenterPoints(-10);
    this.hitboxCenter = this.computeCenterPoints(-22);

    this.ctx.beginPath();

    if(this.damageFrames < 50) {
      this.ctx.fillStyle = 'red';
    } else {
      if(this.fireCharge > this.fireCooldown) {
        this.ctx.fillStyle = 'blue';
      } else {
        this.ctx.fillStyle = 'black';
      }
    }

    this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
    this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
    this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
    this.ctx.fill();
  }

  isHit() {
    this.damageFrames = 0;
  }
}

export default Player;
