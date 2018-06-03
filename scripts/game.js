import Field from './field';
import Player from './player';
import { AssetStore, Sprite } from './utilities';
import DemonPool from './demon';
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
      canvas: optsCanvas,
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
    this.demonBulletPool = new BulletPool(3, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new BulletPool(4, this.fgCanvas, 'player');
    this.setupDemonPools();
    this.player = new Player(this.pcCanvas, this.pcBulletPool);
    this.movementDirection = 'standard';
    this.muted = false;
    this.paused = false;
    this.gameStatus = 'unbegun';

    this.lvl1SpawnBuffer = Date.now() - 5000;
    this.lvl2SpawnBuffer = Date.now();
    this.lvl3SpawnBuffer = Date.now();
    this.numLvl1DemonsKilled = 0;
    this.numLvl2DemonsKilled = 0;
    this.numLvl3DemonsKilled = 0;

    this.play = this.play.bind(this);
    this.startRound = this.startRound.bind(this);
    this.optsCanvasCheckClick = this.optsCanvasCheckClick.bind(this);
    this.statsCanvasCheckClick = this.statsCanvasCheckClick.bind(this);
  }

  setupDemonPools() {
    let lvl1Demons = [
      'mouthDemon', 'mouthDemon', 'mouthDemon',
      'eyeDemon', 'eyeDemon', 'eyeDemon'
    ];
    this.lvl1DemonPool = new DemonPool(
      lvl1Demons, this.fgCanvas.ctx, this.AssetStore, this.demonBulletPool
    );

    let lvl2Demons = ['faceDemon', 'faceDemon']
    this.lvl2DemonPool = new DemonPool(
      lvl2Demons, this.fgCanvas.ctx, this.AssetStore, this.demonBulletPool
    );
  }

  setupNewField() {
    this.field = new Field(
      this.fgCanvas,
      this.statsCanvas,
      this.pcCanvas,
      this.AssetStore,
      this.demonBulletPool,
      this.pcBulletPool,
      this.lvl1DemonPool,
      this.lvl2DemonPool,
      this.player
    );
  }

  drawLoadingScreen() {
    this.optsCanvas.ctx.fillStyle = 'black';
    this.optsCanvas.ctx.font = "16px Courier";
    this.optsCanvas.ctx.fillText("Loading...", 50,50);
  }

  startGame() {
    this.field.drawStatusBar();
    this.drawStartScreen();
  }

  startRound() {
    this.AssetStore.backgroundMusic.play();

    this.clearOptsContext();
    this.optsCanvas.canvas.classList.add('hidden');
    this.gameStatus = 'playing';
    this.startTime = Date.now();
    this.lastTime = Date.now();
    this.play();
  }

  play() {
    this.checkGameOver();
    this.checkCollisions();
    this.player.move(KEY_STATUS);

    let now = Date.now();
    let dt = (now - this.lastTime) / 1000.0;

    // update(dt);
    this.spawnDemons();
    this.field.render();

    if(!this.paused) {
      this.lastTime = now;
      requestAnimationFrame(this.play);
    }
  }

  spawnDemons() {
    let spawnedLvl1 = 0;
    // let spawnedLvl3 = 0;
    for(let i = 0; i < this.lvl1DemonPool.pool.length; i++) {
      let demon = this.lvl1DemonPool.pool[i];
      if(demon.type === 'mouthDemon' && demon.spawned) spawnedLvl1++;
      else if(demon.type === 'eyeDemon' && demon.spawned) spawnedLvl1++;
      // else if(demon.type === 'bossDemon' && demon.spawned) spawnedLvl3++;
    }

    let spawnedLvl2 = 0;
    for(let i = 0; i < this.lvl2DemonPool.pool.length; i++) {
      let demon = this.lvl2DemonPool.pool[i];
      if(demon.type === 'faceDemon' && demon.spawned) spawnedLvl2++;
    }

    if(this.lastTime - this.startTime < 10000) {
      this.spawnLevelOneDemons(spawnedLvl1, 4);
      this.spawnLevelTwoDemons(spawnedLvl2, 1);
    } else {
      this.spawnLevelOneDemons(spawnedLvl1, 6);
      this.spawnLevelTwoDemons(spawnedLvl2, 2);
    }
  }

  spawnLevelOneDemons(numDemons, max) {
    if(numDemons < max && this.lastTime - this.lvl1SpawnBuffer > 5000) {
      let toGet = Math.random() < 0.5 ? 'mouthDemon' : 'eyeDemon';
      this.lvl1DemonPool.get(toGet);
    }
  }

  spawnLevelTwoDemons(numDemons, max) {
    if(numDemons < max && this.lastTime - this.lvl2SpawnBuffer > 10) {
      this.lvl2DemonPool.get('faceDemon');
      this.lvl2SpawnBuffer = Date.now();
    }
  }

  checkCollisions() {
    let spawnedPCBullets = this.pcBulletPool.pool.filter(
      (bullet) => bullet.spawned );
    this.checkPlayerCollision(spawnedPCBullets);
    this.checkDemonCollision(spawnedPCBullets);
  }

  checkPlayerCollision(spawnedPCBullets) {
    let spawnedDemonBullets = this.demonBulletPool.pool.filter(
      (bullet) => bullet.spawned );

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
        this.field.drawPlayerHearts();
      };
    }

    for (let bullIdx = 0; bullIdx < spawnedDemonBullets.length; bullIdx++) {
      let bullet = spawnedDemonBullets[bullIdx];
      if(
        (this.bulletHitsPC(this.player, hitbox, bullet.startPoint) ||
        this.bulletHitsPC(this.player, hitbox, bullet.endPoint)) &&
        this.player.invincibilityFrames > 50
      ) {
        this.player.isHit();
        this.field.drawPlayerHearts();
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

  checkDemonCollision(spawnedPCBullets) {
    let spawnedlvl1Demons = this.lvl1DemonPool.pool.filter(
      (demon) => demon.spawned );
    let spawnedlvl2Demons = this.lvl2DemonPool.pool.filter(
      (demon) => demon.spawned );

    let spawnedDemons = spawnedlvl1Demons.concat(spawnedlvl2Demons);

    for (let demonIdx = 0; demonIdx < spawnedDemons.length; demonIdx++) {
      let demon = spawnedDemons[demonIdx];
      for (let bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
        let bullet = spawnedPCBullets[bullIdx];
        let drawPoint = demon.drawPoint;
        if(
          (this.pcBulletHitsDemon(demon, drawPoint, bullet.startPoint) ||
          this.pcBulletHitsDemon(demon, drawPoint, bullet.endPoint)) &&
          demon.invincibilityFrames > 50
        ) {
          this.field.updatePlayerScore();
          this.calculateDemonKillTime(demon);
          demon.isHit();
        };
      }
    }
  }

  pcBulletHitsDemon(demon, drawPoint, bullet) {
    return (
      (drawPoint.x <= bullet.x && bullet.x <= drawPoint.x + demon.width) &&
      (drawPoint.y <= bullet.y && bullet.y <= drawPoint.y + demon.height)
    )
  }

  calculateDemonKillTime(demon) {
    if(demon.type === 'mouthDemon' || demon.type === 'eyeDemon') {
      this.lvl1SpawnBuffer = Date.now();
    } else if(demon.type === 'faceDemon') {
      this.lvl2SpawnBuffer = Date.now();
    } else if(demon.type === 'bossDemon') {
      this.lvl3SpawnBuffer = Date.now();
    };
  }

  checkGameOver() {
    if(this.player.life <= 0) {
      this.paused = true;
      this.gameStatus = 'over';
      this.drawStartScreen();
    }
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
    // this.optsCanvas.ctx.moveTo(270,0);
    // this.optsCanvas.ctx.lineTo(270,500);
    // this.optsCanvas.ctx.stroke();
    // this.optsCanvas.ctx.beginPath();
    // this.optsCanvas.ctx.moveTo(530,0);
    // this.optsCanvas.ctx.lineTo(530,500);
    // this.optsCanvas.ctx.stroke();

    this.optsCanvas.ctx.strokeRect(300,385,205,87);
    this.optsCanvas.ctx.font = "60px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("PLAY", 320, 450);

    this.optsCanvas.ctx.font = "12px sf_alien_encountersitalic";
    this.optsCanvas.ctx.fillText("m to mute!", 705, 460);
    this.optsCanvas.ctx.fillText("p to pause!", 700, 480);
    if(this.gameStatus !== 'playing') {
      this.optsCanvas.ctx.fillText("enter to start!", 20, 480);
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
    } else{
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

  keydown(e) {
    let keyCode = e.which || e.keyCode || 0;
    if(keyCode === 13 && this.gameStatus !== 'playing') this.newGame();
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
        this.newGame();
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
    if(this.paused && this.gameStatus === 'playing') {
      this.paused = false;
      this.clearOptsContext();
      this.optsCanvas.canvas.classList.add('hidden');
      this.play();
    } else if (!this.paused && this.gameStatus === 'playing') {
      this.paused = true;
      this.drawStartScreen();
    };
  }

  newGame() {
    this.field.clearAllContexts();
    this.setupNewGame();
    this.setupNewField();
    this.field.drawStatusBar();
    this.startRound();
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
