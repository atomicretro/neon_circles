import { AssetStore, Sprite } from './utilities';

class Field {
  constructor(
    fgCanvasObj,
    statsCanvasObj,
    pcCanvasObj,
    AssetStore,
    badBulletPool,
    pcBulletPool,
    BaddiePool,
    player
  ) {
    this.fgCanvas = fgCanvasObj;
    this.statsCanvas = statsCanvasObj;
    this.pcCanvas = pcCanvasObj;

    this.AssetStore = AssetStore;
    this.badBulletPool = badBulletPool;
    this.pcBulletPool = pcBulletPool;
    this.BaddiePool = BaddiePool;

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
    this.checkCollisions();
    this.player.draw();
    this.BaddiePool.get({ theta: Math.PI / 2, speed: 0.005 });
    this.BaddiePool.draw();
    this.pcBulletPool.draw('player');
    this.badBulletPool.draw();
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
    this.statsCanvas.ctx.fillText("CHARGE", 351, 21);

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

  checkCollisions() {
    let spawnedPCBullets = this.pcBulletPool.pool.filter(
      (bullet) => bullet.spawned )
    this.checkPlayerCollision(spawnedPCBullets);
    this.checkBaddieCollision(spawnedPCBullets);
  }

  checkPlayerCollision(spawnedPCBullets) {
    let spawnedBadBullets = this.badBulletPool.pool.filter(
      (bullet) => bullet.spawned )

      let hitbox = {
        x: this.player.hitboxCenter.x,
        y: this.player.hitboxCenter.y,
        radius: 12
      }

    for (let bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
      let bullet = spawnedPCBullets[bullIdx];
      if(
        (this.bulletHitsPC(this.player, hitbox, bullet.startPoint) ||
        this.bulletHitsPC(this.player, hitbox, bullet.endPoint)) &&
        this.player.invincibilityFrames > 50
      ) {
        this.player.isHit();
        this.drawPlayerHearts();
      };
    }

    for (let bullIdx = 0; bullIdx < spawnedBadBullets.length; bullIdx++) {
      let bullet = spawnedBadBullets[bullIdx];
      if(
        (this.bulletHitsPC(this.player, hitbox, bullet.startPoint) ||
        this.bulletHitsPC(this.player, hitbox, bullet.endPoint)) &&
        this.player.invincibilityFrames > 50
      ) {
        this.player.isHit();
        this.drawPlayerHearts();
      };
    }
  }

  bulletHitsPC(player, hitbox, bullet) {
    let newX = hitbox.x - player.pcFieldWidth / 2 + this.fgCanvas.width / 2;
    let newY = hitbox.y - player.pcFieldHeight / 2 + this.fgCanvas.height / 2;
    let distanceFromHitboxToBullet =
      Math.sqrt(
        Math.pow(newX - bullet.x, 2) + Math.pow(newY - bullet.y, 2)
      );

    return distanceFromHitboxToBullet <= hitbox.radius
  }

  checkBaddieCollision(spawnedPCBullets) {
    let spawnedBaddies = this.BaddiePool.pool.filter(
      (baddie) => baddie.spawned )

    for (let badIdx = 0; badIdx < spawnedBaddies.length; badIdx++) {
      let baddie = spawnedBaddies[badIdx];
      for (let bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
        let bullet = spawnedPCBullets[bullIdx];
        let drawPoint = baddie.drawPoint;
        if(
          this.pcBulletHitsBaddie(baddie, drawPoint, bullet.startPoint) ||
          this.pcBulletHitsBaddie(baddie, drawPoint, bullet.endPoint)
        ) {
          this.updatePlayerScore();
          baddie.isHit = true;
        };
      }
    }
  }

  pcBulletHitsBaddie(baddie, drawPoint, bullet) {
    return (
      (drawPoint.x <= bullet.x && bullet.x <= drawPoint.x + baddie.width) &&
      (drawPoint.y <= bullet.y && bullet.y <= drawPoint.y + baddie.height)
    )
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
