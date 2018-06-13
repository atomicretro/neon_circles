import { AssetStore, Sprite } from './utilities';

class Field {
  constructor(
    fgCanvasObj,
    statsCanvasObj,
    pcCanvasObj,
    optsCanvasObj,
    AssetStore,
    demonBulletPool,
    pcBulletPool,
    lvl1DemonPool,
    lvl2DemonPool,
    player,
    movementDirection,
    gameStatus
  ) {
    this.fgCanvas = fgCanvasObj;
    this.statsCanvas = statsCanvasObj;
    this.pcCanvas = pcCanvasObj;
    this.optsCanvas = optsCanvasObj;

    this.AssetStore = AssetStore;
    this.demonBulletPool = demonBulletPool;
    this.pcBulletPool = pcBulletPool;
    this.lvl1DemonPool = lvl1DemonPool;
    this.lvl2DemonPool = lvl2DemonPool;

    this.player = player;
    this.movementDirection = movementDirection;
    this.gameStatus = gameStatus;

    this.lastTime = Date.now;
    this.playerScore = 0;
    this.heart = new Sprite(
      this.statsCanvas.ctx,
      this.AssetStore.heart.image,
      13, 13, 0, 0
    );
  }

  updateMovementDirection(newDirection) {
    this.movementDirection = newDirection;
  }

  updateGameStatus(gameStatus) {
    this.gameStatus = gameStatus;
  }

  drawStartScreen() {
    this.optsCanvas.canvas.classList.remove('hidden');
    this.clearOptsContext();
    this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8";
    this.optsCanvas.ctx.fillRect(0,0,800,500);

    this.optsCanvas.ctx.fillStyle = 'white';

    this.drawStartScreenMessage();
    this.drawControls();

    // for checking centeredness of start screen items
    // this.optsCanvas.ctx.beginPath();
    // this.optsCanvas.ctx.moveTo(20,410);
    // this.optsCanvas.ctx.lineTo(20,490);
    // this.optsCanvas.ctx.stroke();
    // this.optsCanvas.ctx.beginPath();
    // this.optsCanvas.ctx.moveTo(170,410);
    // this.optsCanvas.ctx.lineTo(170,490);
    // this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.strokeRect(300,385,205,87);
    this.optsCanvas.ctx.font = "60px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("PLAY", 320, 450);

    this.drawGamePadToggleButton();

    this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("m to mute!", 705, 440);
    this.optsCanvas.ctx.fillText("p to pause!", 700, 460);
    if(this.gameStatus !== 'playing') {
      this.optsCanvas.ctx.fillText("enter to start!", 670, 480);
    }
  }

  drawStartScreenMessage() {
    if(this.gameStatus === 'over') {
      this.optsCanvas.ctx.font = "36px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("GAME OVER", 285, 70);
      this.optsCanvas.ctx.font = "22px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText(
        "fight! fight! don't let demons win!", 176, 105
      );
    } else {
      this.optsCanvas.ctx.font = "36px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("SHOOT ALL DEMONS", 207, 70);
      this.optsCanvas.ctx.font = "22px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText(
        "careful! demon power is strong!", 182, 105
      );
    }
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
    } else {
      ccw = {
        descPos: 545,
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
    this.optsCanvas.ctx.fillText("swap movement direction", 250, 190);

    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("counterclockwise", ccw.descPos, 250);
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("a   j   left", 90, 280);

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(ccw.circlePos, 190, 30, Math.PI / 2, Math.PI, true);
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(Math.abs(ccw.circlePos - 30), 190);
    this.optsCanvas.ctx.lineTo(Math.abs(ccw.circlePos - 20), 180);
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(Math.abs(ccw.circlePos - 30), 190);
    this.optsCanvas.ctx.lineTo(Math.abs(ccw.circlePos - 35), 175);
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("clockwise", cw.descPos, 250);
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("d   l   right", 566, 280);

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(Math.abs(cw.circlePos),190,30,Math.PI/2,0,false);
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(Math.abs(cw.circlePos - 30), 190);
    this.optsCanvas.ctx.lineTo(Math.abs(cw.circlePos - 20), 180);
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(Math.abs(cw.circlePos - 30), 190);
    this.optsCanvas.ctx.lineTo(Math.abs(cw.circlePos - 35), 175);
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "SPACE TO FIRE WHEN POWER IS FULL!", 148, 340
    );
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(148,347);
    this.optsCanvas.ctx.lineTo(650,347);
    this.optsCanvas.ctx.stroke();
  }

  drawGamePadToggleButton() {
    if(this.gamePadConnected) {
      this.optsCanvas.ctx.clearRect(20,410,150,80);
      this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8";
      this.optsCanvas.ctx.fillRect(20,410,150,80);
      this.optsCanvas.ctx.fillStyle = "white";
      this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
      if(this.gamePadToggle) this.optsCanvas.ctx.fillText("gamepad", 33, 435);
      else this.optsCanvas.ctx.fillText("keyboard", 27, 435);
      this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
      this.optsCanvas.ctx.fillText("click here to toggle", 20, 460);
      this.optsCanvas.ctx.fillText("gamepad input!", 20, 480);
    };
  }

  render()  {
    this.undrawFGContext();
    this.clearPCContext();
    this.updatePlayerCharge()
    this.drawPlayerRails('circle');
    this.player.draw();
    this.lvl1DemonPool.draw();
    this.lvl2DemonPool.draw();
    this.pcBulletPool.draw('player');
    this.demonBulletPool.draw();

    this.fgCanvas.ctx.strokeStyle = "red";
    this.fgCanvas.ctx.strokeRect(0,400,200,100);
    this.fgCanvas.ctx.strokeRect(0,300,200,100);
    this.fgCanvas.ctx.strokeRect(0,200,200,100);
    this.fgCanvas.ctx.strokeRect(600,400,200,100);
    this.fgCanvas.ctx.strokeRect(600,300,200,100);
    this.fgCanvas.ctx.strokeRect(600,200,200,100);
  }

  drawStatusBar() {
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(
      0, 0, this.statsCanvas.width, this.statsCanvas.height
    );

    // Charge container
    this.statsCanvas.ctx.strokeStyle = '#6816e0';
    this.statsCanvas.ctx.strokeRect(352, 30, 97, 13);

    // Player life
    this.drawPlayerHearts();

    this.statsCanvas.ctx.fillStyle = 'black';
    this.statsCanvas.ctx.strokeStyle = 'black';

    // Titles
    this.statsCanvas.ctx.font = "22px sf_alien_encountersitalic";
    this.statsCanvas.ctx.fillText("SCORE", 49, 21);
    this.statsCanvas.ctx.font = "22px sf_alien_encountersitalic";
    this.statsCanvas.ctx.fillText("LIFE", 204, 21);
    this.statsCanvas.ctx.font = "22px sf_alien_encountersitalic";
    this.statsCanvas.ctx.fillText("POWER", 351, 21);

    // Player score
    this.statsCanvas.ctx.font = "20px Courier";
    this.statsCanvas.ctx.fillText("0", 50, 43);

    // Mute / unmute button
    this.statsCanvas.ctx.lineWidth = 2;
    this.statsCanvas.ctx.strokeRect(530, 10, 100, 30);
    this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.statsCanvas.ctx.fillText("MUTE", 550, 32);

    // Pause button
    this.statsCanvas.ctx.lineWidth = 2;
    this.statsCanvas.ctx.strokeRect(650, 10, 100, 30);
    this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.statsCanvas.ctx.fillText("PAUSE", 665, 32);
  }

  drawPlayerHearts() {
    this.statsCanvas.ctx.clearRect(200, 20, 140, 40);
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(200, 20, 140, 40);
    for(let i = 0; i < this.player.life; i++) {
      this.heart.draw(205 + (i * 20), 30)
    }
  }

  updatePlayerScore(demon) {
    if(demon === 'mouthDemon' || demon === 'eyeDemon') this.playerScore += 100;
    else if(demon === 'faceDemon') this.playerScore += 150;
    this.statsCanvas.ctx.clearRect(45, 20, 150, 40);
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(45, 20, 150, 40);
    this.statsCanvas.ctx.fillStyle = 'black';
    this.statsCanvas.ctx.font = "20px Courier";
    this.statsCanvas.ctx.fillText(`${this.playerScore}`, 50, 43);
  }

  updatePlayerCharge() {
    if(this.player.fireCharge === 0) {
      this.statsCanvas.ctx.clearRect(353, 31, 95, 11);
      this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
      this.statsCanvas.ctx.fillRect(353, 31, 95, 11);
    } else if(this.player.fireCharge < 20) {
      this.statsCanvas.ctx.fillStyle = '#6816e0';
      this.statsCanvas.ctx.fillRect(353, 31, this.player.fireCharge * 5, 11);
    }
  }

  updateMuteButton(muted) {
    this.statsCanvas.ctx.clearRect(532, 12, 96, 26);
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(532, 12, 96, 26);
    if(muted === true) {
      this.statsCanvas.ctx.fillStyle = 'black';
      this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.statsCanvas.ctx.fillText("UNMUTE", 537, 32);
    } else {
      this.statsCanvas.ctx.fillStyle = 'black';
      this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
      this.statsCanvas.ctx.fillText("MUTE", 550, 32);
    }
  }

  drawPlayerRails(shape) {
    let xCenter = this.pcCanvas.width / 2;
    let yCenter = this.pcCanvas.height / 2;
    if(this.player.fireCharge < 20) {
      this.pcCanvas.ctx.strokeStyle = "white";
    } else {
      this.pcCanvas.ctx.strokeStyle = "#6816e0";
    }

    switch (shape) {
      case 'circle':
      default:
      this.pcCanvas.ctx.beginPath();
      this.pcCanvas.ctx.arc(xCenter, yCenter, 60, 0, 2 * Math.PI, true);
      this.pcCanvas.ctx.lineWidth = 2;
      this.pcCanvas.ctx.stroke();
    }
  }

  undrawFGContext() {
    this.fgCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.1";
    this.fgCanvas.ctx.fillRect(0,0,800,500);
  }

  clearFGContext() {
    this.fgCanvas.ctx.clearRect(0,0,this.fgCanvas.width,this.fgCanvas.height);
  }

  clearStatsContext() {
    this.statsCanvas.ctx.clearRect(
      0,0,this.statsCanvas.width,this.statsCanvas.height
    );
  }

  clearPCContext() {
    this.pcCanvas.ctx.clearRect(0,0,this.pcCanvas.width,this.pcCanvas.height);
  }

  clearOptsContext() {
    this.optsCanvas.ctx.clearRect(
      0,
      0,
      this.optsCanvas.width,
      this.optsCanvas.height
    );
  }

  clearAllContexts() {
    this.clearFGContext();
    this.clearStatsContext();
    this.clearPCContext();
  }
}

export default Field;
