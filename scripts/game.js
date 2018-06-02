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
  constructor(fgCanvas, statsCanvas, pcCanvas, optsCanvas) {
    this.fgCanvas = {
      ctx: fgCanvas.getContext("2d"),
      width: 800,
      height: 500
    }
    this.statsCanvas = {
      ctx: statsCanvas.getContext("2d"),
      width: 800,
      height: 50
    }
    this.pcCanvas = {
      ctx: pcCanvas.getContext("2d"),
      width: 150,
      height: 150
    }
    this.optsCanvas = {
      ctx: optsCanvas.getContext("2d"),
      width: 800,
      height: 500
    }

    this.drawLoadingScreen();

    this.AssetStore = new AssetStore(this);
    this.badBulletPool = new BulletPool(1, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new BulletPool(8, this.fgCanvas, 'player');
    this.BaddiePool = new BaddiePool(
      1, this.fgCanvas.ctx, this.AssetStore, this.badBulletPool
    );

    this.player = new Player(this.pcCanvas, this.pcBulletPool);
    this.muted = false;

    this.playRound = this.playRound.bind(this);
    this.startRound = this.startRound.bind(this);
    this.checkClick = this.checkClick.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
    statsCanvas.addEventListener('click', (e) => {
      this.checkClick(e, statsCanvas.getBoundingClientRect());
    });

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
    this.optsCanvas.ctx.fillStyle = 'black';
    this.optsCanvas.ctx.font = "16px Courier";
    this.optsCanvas.ctx.fillText("Loading...", 50,50);
  }

  start() {
    this.AssetStore.backgroundMusic.play();
    this.field.drawStatusBar();
    this.drawStartScreen();
  }

  drawStartScreen() {
    this.optsCanvas.ctx.clearRect(
      0,
      0,
      this.optsCanvas.width,
      this.optsCanvas.height
    );
    this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8";
    this.optsCanvas.ctx.fillRect(0,0,800,500);

    this.optsCanvas.ctx.fillStyle = 'white';

    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "a   j   left", 110, 270
    );
    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "move counterclockwise", 60, 300
    );

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(180, 210, 30, Math.PI / 2, Math.PI, true);
    this.optsCanvas.ctx.strokeStyle = "white";
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(150,210);
    this.optsCanvas.ctx.lineTo(160,200);
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(150,210);
    this.optsCanvas.ctx.lineTo(145,195);
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(620, 210, 30, Math.PI / 2, 0, false);
    this.optsCanvas.ctx.strokeStyle = "white";
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(650,210);
    this.optsCanvas.ctx.lineTo(640,200);
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(650,210);
    this.optsCanvas.ctx.lineTo(655,195);
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "swap movement direction", 250, 180
    );

    this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "space to fire when charge is full!", 150, 360
    );

    this.optsCanvas.ctx.font = "60px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("PLAY", 320, 450);
  }

  startRound() {
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

  checkClick(e, boundingRect) {
    let clickPosX = e.clientX - boundingRect.left;
    let clickPosY = e.clientY - boundingRect.top;

    if(
      (530 <= clickPosX && clickPosX <= 630) &&
      (10 <= clickPosY && clickPosY <= 40)
    ) {
      this.clickMute();
    } else if (
      (650 <= clickPosX && clickPosX <= 750) &&
      (10 <= clickPosY && clickPosY <= 40)
    ) {
      this.clickPause();
    }
  }

  clickMute() {
    if(this.muted === true) {
      this.muted = false;
      this.AssetStore.backgroundMusic.volume = 0.25;
    } else {
      this.muted = true;
      this.AssetStore.backgroundMusic.volume = 0;
    }
    this.field.updateMuteButton(this.muted);
  }

  clickPause() {
    console.log('hi!');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let foregroundCanvas = document.getElementById("foreground-canvas");
  let playerCanvas = document.getElementById("player-canvas");
  let statsCanvas = document.getElementById("stats-canvas");
  let optionsCanvas = document.getElementById("options-canvas");

  let game = new Game(
    foregroundCanvas,
    statsCanvas,
    playerCanvas,
    optionsCanvas
  );
});
