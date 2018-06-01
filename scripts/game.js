import Field from './field';
import Player from './player';
import { AssetStore, Sprite } from './utilities';
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

class Game {
  constructor(fgCanvas, statsCanvas, pcCanvas, bgCanvas) {
    this.fgCanvas = {
      ctx: fgCanvas.getContext("2d"),
      width: 800,
      height: 500
    }
    this.statsCanvas = {
      ctx: statsCanvas.getContext("2d"),
      width: 800,
      height: 25
    }
    this.pcCanvas = {
      ctx: pcCanvas.getContext("2d"),
      width: 150,
      height: 150
    }
    this.bgCanvas = {
      ctx: bgCanvas.getContext("2d"),
      width: 800,
      height: 525
    }

    this.drawLoadingScreen();

    this.AssetStore = new AssetStore(this);
    this.badBulletPool = new BulletPool(1, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new BulletPool(8, this.fgCanvas, 'player');
    this.BaddiePool = new BaddiePool(
      1, this.fgCanvas.ctx, this.AssetStore, this.badBulletPool
    );

    this.player = new Player(this.pcCanvas, this.pcBulletPool);

    this.playRound = this.playRound.bind(this);
    this.startRound = this.startRound.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));

    this.field = new Field(
      this.fgCanvas,
      this.statsCanvas,
      this.pcCanvas,
      this.AssetStore,
      this.badBulletPool,
      this.pcBulletPool,
      this.BaddiePool,
      this.player
    );
  }

  drawLoadingScreen() {
    this.bgCanvas.ctx.fillStyle = 'black';
    this.bgCanvas.ctx.font = "16px sf_alien_encountersitalic";
    this.bgCanvas.ctx.fillText("Loading...", 50,50);
  }

  start() {
    this.bgCanvas.ctx.clearRect(
      0,
      0,
      this.bgCanvas.width,
      this.bgCanvas.height
    );
    this.startRound();
  }

  startRound() {
    // this.bgCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    // this.bgCanvas.ctx.fillRect(
    //   0, 0, this.bgCanvas.width, this.bgCanvas.height
    // ); MUTED COLOR SCHEME
    this.AssetStore.backgroundMusic.play();
    this.field.drawStatusBar();
    this.playRound();
  }

  playRound() {
    this.player.move(KEY_STATUS);
    // let now = Date.now();
    // let dt = (now - this.lastTime) / 1000.0;

    // update(dt);
    // this.drawStatusBar();
    this.field.render();

    // this.lastTime = now;
    requestAnimationFrame(this.playRound);
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
}

document.addEventListener("DOMContentLoaded", () => {
  let foregroundCanvas = document.getElementById("foregroundCanvas");
  let playerCanvas = document.getElementById("playerCanvas");
  let statsCanvas = document.getElementById("statsCanvas");
  let backgroundCanvas = document.getElementById("backgroundCanvas");

  let game = new Game(
    foregroundCanvas,
    statsCanvas,
    playerCanvas,
    backgroundCanvas
  );
});
