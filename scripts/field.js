import { AssetStore, Sprite } from './utilities';

class Field {
  constructor(
    fgCanvasObj,
    statsCanvasObj,
    pcCanvasObj,
    AssetStore,
    demonBulletPool,
    pcBulletPool,
    DemonPool,
    player
  ) {
    this.fgCanvas = fgCanvasObj;
    this.statsCanvas = statsCanvasObj;
    this.pcCanvas = pcCanvasObj;

    this.AssetStore = AssetStore;
    this.demonBulletPool = demonBulletPool;
    this.pcBulletPool = pcBulletPool;
    this.DemonPool = DemonPool;

    this.player = player;

    this.lastTime = Date.now;
    this.playerScore = 0;
    this.heart = new Sprite(
      this.statsCanvas.ctx,
      this.AssetStore.heart.image,
      13, 13, 0, 0
    );
  }

  render()  {
    this.undrawFGContext();
    this.clearPCContext();
    this.updatePlayerCharge()
    this.drawPlayerRails('circle');
    this.player.draw();
    this.DemonPool.draw();
    this.pcBulletPool.draw('player');
    this.demonBulletPool.draw();
  }

  drawStatusBar() {
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(
      0, 0, this.statsCanvas.width, this.statsCanvas.height
    );

    // Charge container
    this.statsCanvas.ctx.strokeStyle = '#6816e0';
    this.statsCanvas.ctx.strokeRect(352, 30, 98, 13);

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

  updatePlayerScore() {
    this.playerScore += 100;
    this.statsCanvas.ctx.clearRect(45, 20, 150, 40);
    this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
    this.statsCanvas.ctx.fillRect(45, 20, 150, 40);
    this.statsCanvas.ctx.fillStyle = 'black';
    this.statsCanvas.ctx.font = "20px Courier";
    this.statsCanvas.ctx.fillText(`${this.playerScore}`, 50, 43);
  }

  updatePlayerCharge() {
    if(this.player.fireCharge === 0) {
      this.statsCanvas.ctx.clearRect(353, 31, 96, 11);
      this.statsCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.8";
      this.statsCanvas.ctx.fillRect(353, 31, 96, 11);
    } else if(this.player.fireCharge < 40) {
      this.statsCanvas.ctx.fillStyle = '#6816e0';
      this.statsCanvas.ctx.fillRect(353, 31, this.player.fireCharge * 2.5, 11);
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
    if(this.player.fireCharge < 40) {
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

  clearAllContexts() {
    this.clearFGContext();
    this.clearStatsContext();
    this.clearPCContext();
  }
}

export default Field;
