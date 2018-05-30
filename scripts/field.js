import Player from './player';
import { ImageStore } from './utilities';
import BaddiePool from './baddie';
import PlayerBulletPool from './playerBullet';
import BaddieBulletPool from './baddieBullet';

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
    this.fgCanvas = {
      ctx: fgCanvas.getContext("2d"),
      width: 800,
      height: 500
    }
    this.pcCanvas = {
      ctx: pcCanvas.getContext("2d"),
      width: 100,
      height: 100
    }

    fgCanvas.width = this.fgCanvas.width;
    fgCanvas.height = this.fgCanvas.height;
    pcCanvas.width = this.pcCanvas.width;
    pcCanvas.height = this.pcCanvas.height;

    this.ImageStore = new ImageStore();
    this.badBulletPool = new BaddieBulletPool(20, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new PlayerBulletPool(8, this.fgCanvas);
    this.BaddiePool = new BaddiePool(
      1, this.fgCanvas.ctx, this.ImageStore, this.badBulletPool
    );
    this.player = new Player(this.pcCanvas, this.pcBulletPool);
    this.lastTime = Date.now;

    this.playRound = this.playRound.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    // this.checkPlayerCollision = this.checkPlayerCollision.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
  }

  drawPlayerRails(shape) {
    let xCenter = this.pcCanvas.width / 2;
    let yCenter = this.pcCanvas.height / 2;

    switch (shape) {
      case 'circle':
      default:
      this.pcCanvas.ctx.beginPath();
      this.pcCanvas.ctx.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
      this.pcCanvas.ctx.strokeStyle = "black";
      this.pcCanvas.ctx.lineWidth = 2;
      this.pcCanvas.ctx.stroke();
    }
  }

  playRound() {
    // let now = Date.now();
    // let dt = (now - this.lastTime) / 1000.0;

    // update(dt);
    this.render();

    // this.lastTime = now;
    requestAnimationFrame(this.playRound);
  }

  render()  {
    // this.clearFGContext();
    this.clearPCContext();
    this.drawPlayerRails('circle');
    this.checkCollisions();
    this.drawPlayer();
    this.pcBulletPool.draw('player');
    this.BaddiePool.get(Math.PI / 2, 0.005);
    this.BaddiePool.draw();
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
      radius: 9
    }

    for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
      let bullet = spawnedPCBullets[bullIdx];
      if(
        this.pcBulletHitsPC(this.player, hitbox, bullet.startPoint) ||
        this.pcBulletHitsPC(this.player, hitbox, bullet.endPoint)
      ) {
        this.player.isHit();
      };
    }
  }

  pcBulletHitsPC(player, hitbox, bullet) {
    hitbox.x = hitbox.x - player.pcFieldWidth / 2 + this.fgCanvas.width / 2;
    hitbox.y = hitbox.y - player.pcFieldHeight / 2 + this.fgCanvas.height / 2;
    let distanceFromHitboxToBullet =
      Math.sqrt(Math.pow(hitbox.x - bullet.x, 2)) +
      Math.sqrt(Math.pow(hitbox.y - bullet.y, 2));

    return (
      distanceFromHitboxToBullet <= hitbox.radius
    )
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
    this.fgCanvas.ctx.clearRect(0, 0, this.fgCanvas.width, this.fgCanvas.height);
  } // implement dirty rectangles on each sprite?

  clearPCContext() {
    this.pcCanvas.ctx.clearRect(0, 0, this.pcCanvas.width, this.pcCanvas.height);
  } // implement dirty rectangles on each sprite?
}


export default Field;
