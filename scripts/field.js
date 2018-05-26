import Player from './player';
import { bulletPool } from './bullet';

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
    this.bulletPool = new bulletPool(5);
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.playRound = this.playRound.bind(this);
    this.render = this.render.bind(this);

    console.log(this.bulletPool);
  }

  drawFieldBorder() {
    this.bgContext.beginPath();
    this.bgContext.lineWidth = 1;
    this.bgContext.rect(0, 0, this.bgWidth, this.bgHeight);
    this.bgContext.strokeStyle = 'black';
    this.bgContext.stroke();

    this.pcContext.beginPath();
    this.pcContext.lineWidth = 1;
    this.pcContext.rect(0, 0, this.pcWidth, this.pcHeight);
    this.pcContext.strokeStyle = 'black';
    this.pcContext.stroke();
  }

  drawPlayerRails(shape) {
    let xCenter = this.bgWidth / 2;
    let yCenter = this.bgHeight / 2;

    switch (shape) {
      case 'circle':
      default:
      this.bgContext.beginPath();
      this.bgContext.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
      this.bgContext.strokeStyle = "black";
      this.bgContext.lineWidth = 2;
      this.bgContext.stroke();
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
    this.bgContext.clearRect(0, 0, this.bgWidth, this.bgHeight);
  }
}


export default Field;
