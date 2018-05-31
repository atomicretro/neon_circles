export default class Bullet {
  constructor(fgCanvas, type) {
    this.ctx = fgCanvas.ctx;
    this.ctxWidth = fgCanvas.width;
    this.ctxHeight = fgCanvas.height;
    this.undrawX = fgCanvas.width + 5;
    this.undrawY = fgCanvas.height + 5;
    this.setDefaultValues(type);
  }

  draw() {
    this.startRadius -= this.speed;
    this.endRadius -= this.speed;
    this.startPoint = this.computePoint(this.startRadius);
    this.endPoint = this.computePoint(this.endRadius);

    if((this.startPoint.y > -5 || this.endPoint.y > -5) &&
       (this.startPoint.y < this.undrawY || this.endPoint.y < this.undrawY) &&
       (this.startPoint.x > -5 || this.endPoint.x > -5) &&
       (this.startPoint.x < this.undrawX || this.endPoint.x < this.undrawX)) {
      this.clear()
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
      this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
      this.ctx.stroke();
    } else {
      return true;
    };
  }

  clear() {
    let startX;
    let startY;

    if(this.startPoint.x > this.endPoint.x) {
      startX = this.endPoint.x;
    } else {
      startX = this.startPoint.x;
    }
    if(this.startPoint.y > this.endPoint.y) {
      startY = this.endPoint.y;
    } else {
      startY = this.startPoint.y;
    }

    this.ctx.clearRect(startX - 5, startY - 5, 30, 30);
  }

  computePoint(radius) {
    return ({
      x: Math.cos(this.pathAngle) * -radius + this.xOffset,
      y: Math.sin(this.pathAngle) * -radius + this.yOffset
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
