export default class Bullet {
  constructor(fgCanvas, type) {
    this.ctx = fgCanvas.ctx;
    this.ctxWidth = fgCanvas.width;
    this.ctxHeight = fgCanvas.height;
    this.undrawX = fgCanvas.width + 1;
    this.undrawY = fgCanvas.height + 1;
    this.setDefaultValues(type);
  }

  spawn(theta, speed) {
    this.pathAngle = theta;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);
    this.speed = speed;
    this.spawned = true;
  }

  draw() {
    // ctx.clearRect(this.x, this.y, this.width, this.height); optimize later
    this.startRadius -= this.speed;
    this.endRadius -= this.speed;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);

    if((this.startPoint.y > -1 || this.endPoint.y > -1) &&
       (this.startPoint.y < this.undrawY || this.endPoint.y < this.undrawY) &&
       (this.startPoint.x > -1 || this.endPoint.x > -1) &&
       (this.startPoint.x < this.undrawX || this.endPoint.x < this.undrawX)) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
      this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
      this.ctx.stroke();
    } else {
      return true;
    };
  }

  computePoint(radius) {
    return ({
      x: Math.cos(this.pathAngle) * -radius  + this.xOffset,
      y: Math.sin(this.pathAngle) * -radius  + this.yOffset
    })
  }

  setDefaultValues(type) {
    if(type === 'player') {
      this.startRadius = 12;
      this.endRadius = -8;
    }
    this.xOffset = this.ctxWidth / 2;
    this.yOffset = this.ctxHeight / 2;
    this.pathAngle = 0;
    this.startPoint = {x: 0, y: 0}
    this.endPoint = {x: 0, y: 0}
    this.speed = 0;
    this.spawned = false;
  }
};
