import Player from './player';

class Field {
  constructor(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;

    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext("2d");
    this.player = new Player(this.ctx, width, height);
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.render = this.render.bind(this);
    this.playRound = this.playRound.bind(this);
  }

  drawFieldBorder() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }

  drawPlayerRails(shape) {
    let xCenter = this.width / 2;
    let yCenter = this.height / 2;

    switch (shape) {
      case 'circle':
      default:
      this.ctx.beginPath();
      this.ctx.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  playRound() {
    let now = Date.now();
    // let dt = (now - this.lastTime) / 1000.0;

    // update(dt);
    this.render();

    this.lastTime = now;
    requestAnimationFrame(this.playRound);
  }

  render() {
    this.clearAll();
    this.drawFieldBorder();
    this.drawPlayerRails('circle');
    this.drawPlayer();
  }

  drawPlayer() {
    this.player.draw()
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}


export default Field;
