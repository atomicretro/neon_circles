import { Sprite } from './utilities';

class Field {
  constructor(
    fgCanvasObj,
    statsCanvasObj,
    pcCanvasObj,
    optsCanvasObj,
    AssetStore,
    demonBulletPool,
    bossBulletPool,
    pcBulletPool,
    lvl1DemonPool,
    lvl2DemonPool,
    lvl3DemonPool,
    pickupsPool,
    player,
    movementDirection,
    gameStatus,
    mobileCanvasObj,
    firePosition,
  ) {
    this.fgCanvas = fgCanvasObj;
    this.statsCanvas = statsCanvasObj;
    this.pcCanvas = pcCanvasObj;
    this.optsCanvas = optsCanvasObj;
    this.mobileCanvas = mobileCanvasObj;

    this.AssetStore = AssetStore;
    this.demonBulletPool = demonBulletPool;
    this.bossBulletPool = bossBulletPool;
    this.pcBulletPool = pcBulletPool;
    this.lvl1DemonPool = lvl1DemonPool;
    this.lvl2DemonPool = lvl2DemonPool;
    this.lvl3DemonPool = lvl3DemonPool;
    this.pickupsPool = pickupsPool;

    this.player = player;
    this.movementDirection = movementDirection;
    this.firePosition = firePosition;
    this.gameStatus = gameStatus;

    this.lastTime = Date.now;
    this.playerScore = 0;
    this.heart = new Sprite(
      this.statsCanvas.ctx,
      this.AssetStore.heart.image,
      13, 13, 0, 0,
    );
  }

  updateMovementDirection(newDirection) {
    this.movementDirection = newDirection;
  }

  updateFirePosition(newPosition) {
    this.firePosition = newPosition;
  }

  updateGameStatus(gameStatus) {
    this.gameStatus = gameStatus;
  }

  drawStandardStartScreen() {
    this.setupStartScreen();

    let primaryText;      // clockwise
    let secondaryText;    // counterclockwise
    if (this.gameStatus === 'over') {
      primaryText = {
        text: "GAME OVER", size: "36px", x: 285, y: 70,
      };
      secondaryText = {
        text: "fight! fight! don't let demons win!", size: "22px", x: 176, y: 105,
      };
    } else {
      primaryText = {
        text: "SHOOT ALL DEMONS!", size: "36px", x: 207, y: 70,
      };
      secondaryText = {
        text: "careful! demon power is strong!", size: "22px", x: 182, y: 105,
      };
    };
    this.drawStartScreenMessage(primaryText, secondaryText);

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
  }

  drawMobileStartScreen() {
    this.setupStartScreen();

    let primaryText;
    let secondaryText;
    if (this.gameStatus === 'over') {
      primaryText = {
        text: "GAME OVER", size: "36px", x: 285, y: 70,
      };
      secondaryText = {
        text: "fight! fight! don't let demons win!", size: "19px", x: 204, y: 105,
      };
    } else {
      primaryText = {
        text: "SHOOT ALL DEMONS!", size: "34px", x: 212, y: 70,
      };
      secondaryText = {
        text: "careful! demon power is strong!", size: "20px", x: 202, y: 105,
      };
    };
    this.drawStartScreenMessage(primaryText, secondaryText);

    this.drawMobileControls();
  }

  setupStartScreen() {
    this.optsCanvas.canvas.classList.remove('hidden');
    this.clearOptsContext();
    this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.optsCanvas.ctx.fillRect(0, 0, 800, 500);

    this.optsCanvas.ctx.fillStyle = 'white';
    this.optsCanvas.ctx.strokeStyle = "white";
    this.optsCanvas.ctx.strokeRect(300, 385, 205, 87);
    this.optsCanvas.ctx.font = "60px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("PLAY", 320, 450);
  }

  drawStartScreenMessage(primaryText, secondaryText) {
    this.optsCanvas.ctx.fillStyle = 'white';
    this.optsCanvas.ctx.font = `${primaryText.size} sf_alien_encountersitalic`;
    this.optsCanvas.ctx.fillText(
      primaryText.text, primaryText.x, primaryText.y,
    );
    this.optsCanvas.ctx.font = `${secondaryText.size} sf_alien_encountersitalic`;
    this.optsCanvas.ctx.fillText(
      secondaryText.text, secondaryText.x, secondaryText.y,
    );
  }

  drawControls() {
    let cw;     // clockwise
    let ccw;    // counterclockwise
    if (this.movementDirection === 'standard') {
      ccw = {
        desc1X: 70, desc1Y: 250,
        desc2X: 90, desc2Y: 280,
        circleX: 160, circleY: 190,
      };
      cw = {
        desc1X: 590, desc1Y: 250,
        desc2X: 566, desc2Y: 280,
        circleX: -640, circleY: 190,
      };
    } else {
      ccw = {
        desc1X: 545, desc1Y: 250,
        desc2X: 90, desc2Y: 280,
        circleX: 640, circleY: 190,
      };
      cw = {
        desc1X: 109, desc1Y: 250,
        desc2X: 566, desc2Y: 280,
        circleX: -160, circleY: 190,
      };
    };

    this.drawSwapMovementButton();

    this.optsCanvas.ctx.fillStyle = 'white';
    this.optsCanvas.ctx.strokeStyle = "white";

    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("counterclockwise", ccw.desc1X, ccw.desc1Y);
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("a   j   left", ccw.desc2X, ccw.desc2Y);

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(
      ccw.circleX,
      ccw.circleY,
      30,
      Math.PI / 2,
      Math.PI,
      true,
    );
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(Math.abs(ccw.circleX - 30), ccw.circleY);
    this.optsCanvas.ctx.lineTo(Math.abs(ccw.circleX - 20), (ccw.circleY - 10));
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(Math.abs(ccw.circleX - 30), ccw.circleY);
    this.optsCanvas.ctx.lineTo(Math.abs(ccw.circleX - 35), (ccw.circleY - 15));
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("clockwise", cw.desc1X, cw.desc1Y);
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("d   l   right", cw.desc2X, cw.desc2Y);

    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(
      Math.abs(cw.circleX), cw.circleY, 30,Math.PI/2, 0, false
    );
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(Math.abs(cw.circleX - 30), cw.circleY);
    this.optsCanvas.ctx.lineTo(Math.abs(cw.circleX - 20), (cw.circleY - 10));
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo(Math.abs(cw.circleX - 30), cw.circleY);
    this.optsCanvas.ctx.lineTo(Math.abs(cw.circleX - 35), (cw.circleY - 15));
    this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.font = "16px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "HP EVERY 1000 PTS!", 310, 250,
    );
    this.optsCanvas.ctx.font = "16px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "BOSS EVERY 2500 PTS!", 294, 280,
    );

    this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText(
      "SPACE TO FIRE WHEN POWER IS FULL", 148, 340,
    );
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo(145, 347);
    this.optsCanvas.ctx.lineTo(635, 347);
    this.optsCanvas.ctx.stroke();

    this.drawGamePadToggleButton();

    this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("m to mute!", 705, 440);
    this.optsCanvas.ctx.fillText("p to pause!", 700, 460);
    if (this.gameStatus !== 'playing') {
      this.optsCanvas.ctx.fillText("enter to start!", 670, 480);
    }
  }

  drawMobileControls() {
    let cw;     // clockwise
    let ccw;    // counterclockwise
    let firePos;
    if (
      this.movementDirection === 'standard' && this.firePosition === 'standard'
    ) {
      ccw = { descX: 5, descY: 185, circleX: 100, circleY: 125 };
      cw = { descX: 45, descY: 405, circleX: 100, circleY: 345 };
      firePos = { x: 650, y: 265 };
      this.optsCanvas.ctx.strokeStyle = "white";
      this.optsCanvas.ctx.strokeRect(2,2,196,246);
      this.optsCanvas.ctx.strokeRect(2,252,196,246);
      this.optsCanvas.ctx.strokeRect(602,2,196,496);
    } else if (
      this.movementDirection === 'inverted' && this.firePosition === 'standard'
    ) {
      ccw = { descX: 5, descY: 405, circleX: 100, circleY: 345 };
      cw = { descX: 45, descY: 185, circleX: 100, circleY: 125 };
      firePos = { x: 650, y: 265 };
      this.optsCanvas.ctx.strokeStyle = "white";
      this.optsCanvas.ctx.strokeRect(2,2,196,246);
      this.optsCanvas.ctx.strokeRect(2,252,196,246);
      this.optsCanvas.ctx.strokeRect(602,2,196,496);
    } else if (
      this.movementDirection === 'standard' && this.firePosition === 'inverted'
    ) {
      ccw = { descX: 605, descY: 185, circleX: 700, circleY: 125 };
      cw = { descX: 645, descY: 405, circleX: 700, circleY: 345 };
      firePos = { x: 43, y: 265 };
      this.optsCanvas.ctx.strokeStyle = "white";
      this.optsCanvas.ctx.strokeRect(602,2,196,246);
      this.optsCanvas.ctx.strokeRect(602,252,196,246);
      this.optsCanvas.ctx.strokeRect(2,2,196,496);
    } else if (
      this.movementDirection === 'inverted' && this.firePosition === 'inverted'
    ) {
      ccw = { descX: 605, descY: 405, circleX: 700, circleY: 345 };
      cw = { descX: 645, descY: 185, circleX: 700, circleY: 125 };
      firePos = { x: 43, y: 265 };
      this.optsCanvas.ctx.strokeRect(602,2,196,246);
      this.optsCanvas.ctx.strokeRect(602,252,196,246);
      this.optsCanvas.ctx.strokeRect(2,2,196,496);
    };

    this.drawSwapMovementButton();
    this.drawSwapFireButton();

    this.optsCanvas.ctx.fillStyle = 'white';
    this.optsCanvas.ctx.strokeStyle = "white";

    // counterclockwise description titles
    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("counterclockwise", ccw.descX, ccw.descY);

    // fire description titles
    this.optsCanvas.ctx.font = "42px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("FIRE!", firePos.x, firePos.y);

    // clockwise description titles
    this.optsCanvas.ctx.font = "18px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("clockwise", cw.descX, cw.descY);

    // counterclockwise circles
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(ccw.circleX, ccw.circleY, 30, Math.PI / 2, Math.PI, true);
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo((ccw.circleX - 30), ccw.circleY);
    this.optsCanvas.ctx.lineTo((ccw.circleX - 20), (ccw.circleY - 10));
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo((ccw.circleX - 30), ccw.circleY);
    this.optsCanvas.ctx.lineTo((ccw.circleX - 35), (ccw.circleY - 15));
    this.optsCanvas.ctx.stroke();

    // clockwise circles
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.arc(cw.circleX, cw.circleY, 30, Math.PI / 2, 0, false);
    this.optsCanvas.ctx.lineWidth = 2;
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.beginPath();
    this.optsCanvas.ctx.moveTo((cw.circleX + 30), cw.circleY);
    this.optsCanvas.ctx.lineTo((cw.circleX + 20), (cw.circleY - 10));
    this.optsCanvas.ctx.stroke();
    this.optsCanvas.ctx.moveTo((cw.circleX + 30), cw.circleY);
    this.optsCanvas.ctx.lineTo((cw.circleX + 35), (cw.circleY - 15));
    this.optsCanvas.ctx.stroke();
  }

  drawSwapMovementButton() {
    this.optsCanvas.ctx.strokeStyle = "white";
    this.optsCanvas.ctx.strokeRect(240,165,320,35);
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("swap movement direction", 250, 190);
  }

  drawSwapFireButton() {
    this.optsCanvas.ctx.strokeStyle = "white";
    this.optsCanvas.ctx.strokeRect(290,255,225,35);
    this.optsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("move fire button", 300, 280);
  }

  drawGamePadToggleButton() {
    if (this.gamePadConnected) {
      this.optsCanvas.ctx.clearRect(20,410,150,80);
      this.optsCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.8";
      this.optsCanvas.ctx.fillRect(20,410,150,80);
      this.optsCanvas.ctx.fillStyle = "white";
      this.optsCanvas.ctx.font = "24px sf_alien_encountersitalic";
      if (this.gamePadToggle) {
        this.optsCanvas.ctx.fillText("gamepad", 33, 435);
      } else {
        this.optsCanvas.ctx.fillText("keyboard", 27, 435);
      }
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
    this.lvl3DemonPool.draw();
    this.pickupsPool.draw();
    this.pcBulletPool.draw('player');
    this.demonBulletPool.draw();
    this.bossBulletPool.draw();
  }

  drawStatusBar() {
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(
      0,
      0,
      this.statsCanvas.width,
      this.statsCanvas.height,
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
    for (let i = 0; i < this.player.life; i++) {
      this.heart.draw(205 + (i * 20), 30)
    }
  }

  updatePlayerScore(points) {
    this.playerScore += points;

    this.statsCanvas.ctx.clearRect(45, 20, 150, 40);
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(45, 20, 150, 40);
    this.statsCanvas.ctx.fillStyle = 'black';
    this.statsCanvas.ctx.font = "20px Courier";
    this.statsCanvas.ctx.fillText(`${this.playerScore}`, 50, 43);
  }

  updatePlayerCharge() {
    if (this.player.fireCharge === 0) {
      this.statsCanvas.ctx.clearRect(353, 31, 95, 11);
      this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
      this.statsCanvas.ctx.fillRect(353, 31, 95, 11);
    } else if (this.player.fireCharge < 20) {
      this.statsCanvas.ctx.fillStyle = '#6816e0';
      this.statsCanvas.ctx.fillRect(353, 31, this.player.fireCharge * 5, 11);
    }
  }

  updateMuteButton(muted) {
    this.statsCanvas.ctx.clearRect(532, 12, 96, 26);
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(532, 12, 96, 26);
    if (muted === true) {
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
    const xCenter = this.pcCanvas.width / 2;
    const yCenter = this.pcCanvas.height / 2;
    if (this.player.fireCharge < 20) {
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
    this.fgCanvas.ctx.fillRect(0, 0, 800, 500);
  }

  clearFGContext() {
    this.fgCanvas.ctx.clearRect(0,0,this.fgCanvas.width,this.fgCanvas.height);
  }

  clearStatsContext() {
    this.statsCanvas.ctx.clearRect(
      0,
      0,
      this.statsCanvas.width,
      this.statsCanvas.height,
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
      this.optsCanvas.height,
    );
  }

  clearAllContexts() {
    this.clearFGContext();
    this.clearStatsContext();
    this.clearPCContext();
  }
}

export default Field;
