import Player from './player';
import { BulletPool } from './bullet';

class Field {
  constructor(bgCanvas, pcCanvas) {
    this.bgWidth = 800;
    this.bgHeight = 500;
    this.pcWidth = 100;
    this.pcHeight = 100;

    bgCanvas.width = this.bgWidth;
    bgCanvas.height = this.bgHeight;
    pcCanvas.width = this.pcWidth;
    pcCanvas.height = this.pcHeight;

    this.bgContext = bgCanvas.getContext("2d");
    this.pcContext = pcCanvas.getContext("2d");

    this.player = new Player(this.pcContext, this.pcWidth, this.pcHeight);
    this.BulletPool = new BulletPool(5);
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.playRound = this.playRound.bind(this);
    this.render = this.render.bind(this);

    console.log(this.BulletPool);
  }

  drawFieldBorder() {
    this.bgContext.beginPath();
    this.bgContext.lineWidth = 1;
    this.bgContext.rect(0, 0, this.bgWidth, this.bgHeight);
    this.bgContext.strokeStyle = 'black';
    this.bgContext.stroke();
  }

  drawPlayerRails(shape) {
    let xCenter = this.pcWidth / 2;
    let yCenter = this.pcHeight / 2;

    switch (shape) {
      case 'circle':
      default:
      this.pcContext.beginPath();
      this.pcContext.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
      this.pcContext.strokeStyle = "black";
      this.pcContext.lineWidth = 2;
      this.pcContext.stroke();
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
    this.clearBGContext();
    this.clearPCContext();
    this.drawFieldBorder();
    this.drawPlayerRails('circle');
    this.drawPlayer();
  }

  drawPlayer() {
    this.player.draw()
  }

  clearBGContext() {
    this.bgContext.clearRect(0, 0, this.bgWidth, this.bgHeight);
  }

  clearPCContext() {
    this.pcContext.clearRect(0, 0, this.pcWidth, this.pcHeight);
  }
}


export default Field;
