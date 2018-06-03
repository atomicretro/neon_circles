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
  32: 'fire',     // space bar
  13: 'start'     // enter
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

    this.AssetStore = new AssetStore(this);

    this.drawLoadingScreen();
    this.setupNewGame();

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
    optsCanvas.addEventListener('click', (e) => {
      this.optsCanvasCheckClick(e, optsCanvas.getBoundingClientRect());
    });
    statsCanvas.addEventListener('click', (e) => {
      this.statsCanvasCheckClick(e, statsCanvas.getBoundingClientRect());
    });

    this.setupNewField();
  }

  setupNewGame() {
    this.badBulletPool = new BulletPool(1, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new BulletPool(8, this.fgCanvas, 'player');
    this.BaddiePool = new BaddiePool(
      1, this.fgCanvas.ctx, this.AssetStore, this.badBulletPool
    );
    this.player = new Player(this.pcCanvas, this.pcBulletPool);
    this.movementDirection = 'standard';
    this.muted = false;
    this.paused = false;
    this.gameStatus = 'unbegun';

    this.play = this.play.bind(this);
    this.startRound = this.startRound.bind(this);
    this.optsCanvasCheckClick = this.optsCanvasCheckClick.bind(this);
    this.statsCanvasCheckClick = this.statsCanvasCheckClick.bind(this);
  }

  setupNewField() {
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

  startGame() {
    this.AssetStore.backgroundMusic.play();
    this.field.drawStatusBar();
    this.drawStartScreen();
  }

  startRound() {
    this.clearOptsContext();
    this.gameStatus = 'playing';
    this.play();
  }

  play() {
    this.checkGameOver();
    this.player.move(KEY_STATUS);
    // let now = Date.now();
    // let dt = (now - this.lastTime) / 1000.0;

    // update(dt);
    // this.drawStatusBar();
    this.field.render();

    // this.lastTime = now;
    if(!this.paused) requestAnimationFrame(this.play);
  }

  checkGameOver() {
    if(this.player.life <= 0) {
      this.paused = true;
      this.gameStatus = 'over';
      this.drawStartScreen();
    }
  }

  drawStartScreen() {
    this.clearOptsContext();
    this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8";
    this.optsCanvas.ctx.fillRect(0,0,800,500);

    this.optsCanvas.ctx.fillStyle = 'white';

    this.optsCanvas.ctx.font = "36px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "SHOOT ALL DEMONS", 207, 70
    );
    this.optsCanvas.ctx.font = "22px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "careful! demon power is strong!", 182, 105
    );

    this.drawControls();

    // this.optsCanvas.ctx.beginPath();
    // this.optsCanvas.ctx.moveTo(200,0);
    // this.optsCanvas.ctx.lineTo(200,500);
    // this.optsCanvas.ctx.stroke();
    // this.optsCanvas.ctx.beginPath();
    // this.optsCanvas.ctx.moveTo(600,0);
    // this.optsCanvas.ctx.lineTo(600,500);
    // this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.strokeRect(300,385,205,87);
    this.optsCanvas.ctx.font = "60px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("PLAY", 320, 450);

    this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("m to mute!", 20, 480);
    this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("p to pause!", 700, 480);
  }

  drawControls() {
    let cw;     // clockwise
    let ccw;    // counterclockwise
    if(this.movementDirection === 'standard') {
      ccw = {
        descPos: 70,
        circlePos: 160
      };
      cw = {
        descPos: 590,
        circlePos: -640
      };
    } else{
      ccw = {
        descPos: 552,
        circlePos: 640
      };
      cw = {
        descPos: 109,
        circlePos: -160
      };
    };

    this.optsCanvas.ctx.strokeStyle = "white";

    this.optsCanvas.ctx.strokeRect(240,165,320,35);
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "swap movement direction", 250, 190
    );

    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "counterclockwise", ccw.descPos, 250
    );
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "a   j   left", 90, 280
    );

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(ccw.circlePos, 190, 30, Math.PI / 2, Math.PI, true);
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(Math.abs(ccw.circlePos - 30),190);
    this.optsCanvas.ctx.lineTo(Math.abs(ccw.circlePos - 20),180);
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(Math.abs(ccw.circlePos - 30),190);
    this.optsCanvas.ctx.lineTo(Math.abs(ccw.circlePos - 35),175);
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "clockwise", cw.descPos, 250
    );
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "d  l  right", 580, 280
    );

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(Math.abs(cw.circlePos), 190, 30, Math.PI / 2, 0, false);
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(Math.abs(cw.circlePos - 30),190);
    this.optsCanvas.ctx.lineTo(Math.abs(cw.circlePos - 20),180);
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(Math.abs(cw.circlePos - 30),190);
    this.optsCanvas.ctx.lineTo(Math.abs(cw.circlePos - 35),175);
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "SPACE TO FIRE WHEN CHARGE IS FULL!", 148, 340
    );
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(148,347);
    this.optsCanvas.ctx.lineTo(650,347);
    this.optsCanvas.ctx.stroke();
  }

  keydown(e) {
    let keyCode = e.which || e.keyCode || 0;
    if(keyCode === 77) this.clickMute();
    if(keyCode === 80) this.clickPause();
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

  statsCanvasCheckClick(e, boundingRect) {
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

  optsCanvasCheckClick(e, boundingRect) {
    let clickPosX = e.clientX - boundingRect.left;
    let clickPosY = e.clientY - boundingRect.top;

    if(
      (240 <= clickPosX && clickPosX <= 560) &&
      (165 <= clickPosY && clickPosY <= 200)
    ) {
      this.swapMovementDirection();
    } else if (
      (300 <= clickPosX && clickPosX <= 505) &&
      (385 <= clickPosY && clickPosY <= 472)
    ) {
      if(this.gameStatus === 'unbegun') {
        this.startRound();
      } else if(this.gameStatus === 'playing') {
        this.clickPause();
      } else if(this.gameStatus === 'over') {
        this.field.clearAllContexts();
        this.setupNewGame();
        this.setupNewField();
        this.field.drawStatusBar();
        console.log(this.paused);
        this.startRound();
      }
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
    if(this.paused) {
      this.paused = false;
      this.clearOptsContext();
      this.play();
    } else {
      this.paused = true;
      this.drawStartScreen();
    };
  }

  swapMovementDirection() {
    if(this.movementDirection === 'standard') {
      this.movementDirection = 'reversed';
      KEY_MAP[74] = 'right';
      KEY_MAP[76] = 'left';
      KEY_MAP[68] = 'left';
      KEY_MAP[65] = 'right';
      KEY_MAP[39] = 'left';
      KEY_MAP[37] = 'right';
    } else {
      this.movementDirection = 'standard';
      KEY_MAP[74] = 'left';
      KEY_MAP[76] = 'right';
      KEY_MAP[68] = 'right';
      KEY_MAP[65] = 'left';
      KEY_MAP[39] = 'right';
      KEY_MAP[37] = 'left';
    }
    this.drawStartScreen()
  }

  clearOptsContext() {
    this.optsCanvas.ctx.clearRect(
      0,
      0,
      this.optsCanvas.width,
      this.optsCanvas.height
    );
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
