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

  startScreen() {

  }

  render()  {
    this.clearFGContext();
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

    // Player score
    this.statsCanvas.ctx.fillStyle = 'black';
    this.statsCanvas.ctx.font = "20px Courier";
    this.statsCanvas.ctx.fillText("0", 50, 43);

    this.drawPlayerHearts();

    // Charge container
    this.statsCanvas.ctx.strokeStyle = 'blue';
    this.statsCanvas.ctx.strokeRect(352, 30, 98, 13);

    // Mute / unmute button
    this.statsCanvas.ctx.strokeStyle = 'black';
    this.statsCanvas.ctx.lineWidth = 2;
    this.statsCanvas.ctx.strokeRect(530, 10, 100, 30);
    this.statsCanvas.ctx.fillStyle = 'black';
    this.statsCanvas.ctx.font = "20px sf_alien_encountersitalic";
    this.statsCanvas.ctx.fillText("MUTE", 550, 32);

    // Pause button
    this.statsCanvas.ctx.strokeStyle = 'black';
    this.statsCanvas.ctx.lineWidth = 2;
    this.statsCanvas.ctx.strokeRect(650, 10, 100, 30);
    this.statsCanvas.ctx.fillStyle = 'black';
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
    } else if(this.player.fireCharge < 25) {
      this.statsCanvas.ctx.fillStyle = 'blue';
      this.statsCanvas.ctx.fillRect(353, 31, this.player.fireCharge * 4, 11);
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

    switch (shape) {
      case 'circle':
      default:
      this.pcCanvas.ctx.beginPath();
      this.pcCanvas.ctx.arc(xCenter, yCenter, 60, 0, 2 * Math.PI, true);
      this.pcCanvas.ctx.strokeStyle = "white";
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

    // for (let bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
    //   let bullet = spawnedPCBullets[bullIdx];
    //   if(
    //     (this.bulletHitsPC(this.player, hitbox, bullet.startPoint) ||
    //     this.bulletHitsPC(this.player, hitbox, bullet.endPoint)) &&
    //     this.player.invincibilityFrames < 50
    //   ) {
    //     this.player.isHit();
    //     this.drawPlayerHearts();
    //   };
    // }

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
    hitbox.x = hitbox.x - player.pcFieldWidth / 2 + this.fgCanvas.width / 2;
    hitbox.y = hitbox.y - player.pcFieldHeight / 2 + this.fgCanvas.height / 2;
    let distanceFromHitboxToBullet =
      Math.sqrt(
        Math.pow(hitbox.x - bullet.x, 2) + Math.pow(hitbox.y - bullet.y, 2)
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

  clearFGContext() {
    this.fgCanvas.ctx.fillStyle = "rgba(0, 0, 0, 0.1";
    this.fgCanvas.ctx.fillRect(0,0,800,500);
  }

  clearPCContext() {
    this.pcCanvas.ctx.clearRect(0, 0, this.pcCanvas.width, this.pcCanvas.height);
  }
}

export default Field;
