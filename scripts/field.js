import Player from './player';
import { ImageStore } from './utilities';
import BaddiePool from './baddie';
import BulletPool from './bullet';

const KEY_MAP = {
  74: 'left',     // j
  76: 'right',    // l
  68: 'right',    // d
  65: 'left',     // a
  39: 'right',    // left arrow
  37: 'left',     // right arrow
  32: 'fire'      // space bar
};

const KEY_STATUS = {};
for (let code in KEY_MAP) {
  KEY_STATUS[ KEY_MAP[ code ]] = false;
}

class Field {
  constructor(fgCanvas, pcCanvas) {
    this.fgWidth = 800;
    this.fgHeight = 500;
    this.pcWidth = 100;
    this.pcHeight = 100;

    fgCanvas.width = this.fgWidth;
    fgCanvas.height = this.fgHeight;
    pcCanvas.width = this.pcWidth;
    pcCanvas.height = this.pcHeight;

    this.fgContext = fgCanvas.getContext("2d");
    this.pcContext = pcCanvas.getContext("2d");

    this.ImageStore = new ImageStore();
    this.BaddiePool = new BaddiePool(5, this.fgContext);
    this.pcBulletPool = new BulletPool(5, this.fgContext);
    this.player = new Player(
      this.pcContext, this.pcWidth, this.pcHeight, this.pcBulletPool
    );
    this.lastTime = Date.now;

    this.drawPlayer = this.drawPlayer.bind(this);
    this.playRound = this.playRound.bind(this);
    this.render = this.render.bind(this);
    this.keydown = this.keydown.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
  }

  drawFieldBorder() {
    this.fgContext.beginPath();
    this.fgContext.lineWidth = 1;
    this.fgContext.rect(0, 0, this.fgWidth, this.fgHeight);
    this.fgContext.strokeStyle = 'black';
    this.fgContext.stroke();

    this.pcContext.beginPath();
    this.pcContext.lineWidth = 1;
    this.pcContext.rect(0, 0, this.pcWidth, this.pcHeight);
    this.pcContext.strokeStyle = 'black';
    this.pcContext.stroke();
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
    this.clearFGContext();
    this.clearPCContext();
    this.drawFieldBorder();
    this.drawPlayerRails('circle');
    this.drawPlayer();
    this.pcBulletPool.draw();
  }

  keydown(e) {
    let keyCode = e.which || e.keyCode || 0;
    if (KEY_MAP[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_MAP[keyCode]] = true;
    }
  }

  keyup(e) {
    let keyCode = e.which || e.keyCode || 0;
    if (KEY_MAP[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_MAP[keyCode]] = false;
    }
  }

  drawPlayer() {
    this.player.move(KEY_STATUS);
    this.player.draw();
  }

  clearFGContext() {
    this.fgContext.clearRect(0, 0, this.fgWidth, this.fgHeight);
  }

  clearPCContext() {
    this.pcContext.clearRect(0, 0, this.pcWidth, this.pcHeight);
  }
}


export default Field;
