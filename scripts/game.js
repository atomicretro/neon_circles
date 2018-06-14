import Field from './field';
import Player from './player';
import { AssetStore, Sprite, Timer } from './utilities';
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
  13: 'start',    // enter
  touchLeft: 'left',
  touchRight: 'right',
  touchFire: 'fire'
};

const KEY_STATUS = {};
for (let code in KEY_MAP) {
  KEY_STATUS[KEY_MAP[code]] = false;
}

class Game {
  constructor(fgCanvas, statsCanvas, pcCanvas, optsCanvas, mobileCanvas) {
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
    if(mobileCanvas == null) {
      this.isMobile = false;
      this.firePosition = null;
      this.mobileCanvas = { };
      } else {
      this.isMobile = true;
      this.firePosition = 'standard';
      this.mobileCanvas = {
        canvas: mobileCanvas,
        ctx: mobileCanvas.getContext("2d"),
        width: 800,
        height: 500
      }
    };

    this.play = this.play.bind(this);
    this.startRound = this.startRound.bind(this);
    this.optsCanvasCheckClick = this.optsCanvasCheckClick.bind(this);
    this.statsCanvasCheckClick = this.statsCanvasCheckClick.bind(this);

    this.AssetStore = new AssetStore(this);

    this.gamePadConnected = false;
    this.gamePadToggle = false;

    this.drawLoadingScreen();
    this.setupEventListners(fgCanvas, statsCanvas, optsCanvas);
    this.setupNewGame();
    this.setupNewField();
  }

  drawLoadingScreen() {
    this.optsCanvas.ctx.fillStyle = 'black';
    this.optsCanvas.ctx.font = "16px Courier";
    this.optsCanvas.ctx.fillText("Loading...", 50,50);
  }

  setupEventListners(fgCanvas, statsCanvas, optsCanvas) {
    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
    optsCanvas.addEventListener('click', (e) => {
      this.optsCanvasCheckClick(e, optsCanvas.getBoundingClientRect());
    });
    statsCanvas.addEventListener('click', (e) => {
      this.statsCanvasCheckClick(e, statsCanvas.getBoundingClientRect());
    });

    fgCanvas.addEventListener("touchstart", (e) => {
      this.handleStart(e, fgCanvas.getBoundingClientRect());
    }, false);
    fgCanvas.addEventListener("touchend", (e) => {
      this.handleEnd(e, fgCanvas.getBoundingClientRect());
    }, false);
    fgCanvas.addEventListener("touchcancel", this.handleCancel, false);
    // fgCanvas.addEventListener("touchmove", this.handleMove, false);
    this.ongoingTouches = [];

    window.addEventListener("gamepadconnected", (e) => {
      this.mapGamePadButtons(e);
      this.gamePadConnected = true;
    });
    window.addEventListener("gamepaddisconnected", (e) => {
      this.gamePadConnected = false;
      this.gamePadToggle = false;
    });
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
      this.optsCanvas,
      this.AssetStore,
      this.demonBulletPool,
      this.pcBulletPool,
      this.lvl1DemonPool,
      this.lvl2DemonPool,
      this.player,
      this.movementDirection,
      this.gameStatus,
      this.mobileCanvas,
      this.firePosition
    );
  }

  startGame() {
    this.field.drawStatusBar();
    this.drawStartScreen();
  }

  drawStartScreen() {
    if(this.isMobile) this.field.drawMobileStartScreen();
    else this.field.drawStandardStartScreen();
  }

  startRound() {
    this.AssetStore.backgroundMusic.play();

    this.lvl1Timer = new Timer(() => { this.spawnLvl1Demons() }, 5000);
    this.lvl2Timer = new Timer(() => { this.spawnLvl2Demons() }, 15000);

    this.field.clearOptsContext();
    this.optsCanvas.canvas.classList.add('hidden');
    this.gameStatus = 'playing';
    this.field.updateGameStatus(this.gameStatus);
    this.startTime = Date.now();
    this.lastTime = Date.now();
    this.play();
  }

  pauseSpawnTimers() {
    this.lvl1Timer.pause();
    this.lvl2Timer.pause();
  }

  resumeSpawnTimers() {
    this.lvl1Timer.resume();
    this.lvl2Timer.resume();
  }

  removeSpawnTimers() {
    this.lvl1Timer.clear();
    this.lvl2Timer.clear();
  }

  play() {
    this.checkGameOver();
    this.checkCollisions();
    if(this.gamePadToggle) this.buttonDown();
    this.player.move(KEY_STATUS);
    if(this.gamePadToggle) this.buttonUp();

    let now = Date.now();
    let dt = (now - this.lastTime) / 1000.0;

    // update(dt);
    this.checkLevel1Demons();
    this.field.render();

    if(!this.paused) {
      this.lastTime = now;
      requestAnimationFrame(this.play);
    }
  }

  checkLevel1Demons() {
    let spawnedLvl1 = 0;
    for(let i = 0; i < this.lvl1DemonPool.pool.length; i++) {
      let demon = this.lvl1DemonPool.pool[i];
      if(demon.type === 'mouthDemon' && demon.spawned) spawnedLvl1++;
      else if(demon.type === 'eyeDemon' && demon.spawned) spawnedLvl1++;
    }

    if(spawnedLvl1 < 1) {
      this.lvl1DemonPool.get('mouthDemon');
      this.lvl1DemonPool.get('eyeDemon');
    }

    return spawnedLvl1;
  }

  spawnLvl1Demons() {
    let maxDemons = this.getMaxDemons('lvl1');
    if(this.checkLevel1Demons() < maxDemons) {
      let toGet = Math.random() < 0.5 ? 'mouthDemon' : 'eyeDemon';
      this.lvl1DemonPool.get(toGet);
    };

    this.lvl1Timer = new Timer(() => { this.spawnLvl1Demons() }, 5000);
  }

  spawnLvl2Demons() {
    let spawnedLvl2 = 0;
    for(let i = 0; i < this.lvl2DemonPool.pool.length; i++) {
      let demon = this.lvl2DemonPool.pool[i];
      if(demon.type === 'faceDemon' && demon.spawned) spawnedLvl2++;
    };

    let maxDemons = this.getMaxDemons('lvl2');
    if(spawnedLvl2 < maxDemons) this.lvl2DemonPool.get('faceDemon');

    this.lvl2Timer = new Timer(() => { this.spawnLvl2Demons() }, 15000);
  }

  getMaxDemons(level) {
    if(this.lastTime - this.startTime < 40000) {
      if(level === 'lvl1') return 4;
      if(level === 'lvl2') return 1;
    } else {
      if(level === 'lvl1') return 6;
      if(level === 'lvl2') return 2;
    };
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

    for(let bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
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

    for(let bullIdx = 0; bullIdx < spawnedDemonBullets.length; bullIdx++) {
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

    for(let demonIdx = 0; demonIdx < spawnedDemons.length; demonIdx++) {
      let demon = spawnedDemons[demonIdx];
      for(let bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
        let bullet = spawnedPCBullets[bullIdx];
        let drawPoint = demon.drawPoint;
        if(
          (this.pcBulletHitsDemon(demon, drawPoint, bullet.startPoint) ||
          this.pcBulletHitsDemon(demon, drawPoint, bullet.endPoint)) &&
          demon.invincibilityFrames > 50
        ) {
          this.field.updatePlayerScore(demon.type);
          demon.isHit();
        };
      };
    };
  }

  pcBulletHitsDemon(demon, drawPoint, bullet) {
    return (
      (drawPoint.x <= bullet.x && bullet.x <= drawPoint.x + demon.width) &&
      (drawPoint.y <= bullet.y && bullet.y <= drawPoint.y + demon.height)
    )
  }

  checkGameOver() {
    if(this.player.life <= 0) {
      this.paused = true;
      this.removeSpawnTimers();
      this.gameStatus = 'over';
      this.field.updateGameStatus(this.gameStatus);
      this.drawStartScreen();
    };
  }

  buttonDown() {
    let gamepads = navigator.getGamepads ? navigator.getGamepads() :
      (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    if(
      navigator.getGamepads()[0].buttons[14].pressed ||
      navigator.getGamepads()[0].axes[0] < -0.1
    ) {
      KEY_STATUS[KEY_MAP['controllerLeft']] = true;
    }
    if(
      navigator.getGamepads()[0].buttons[15].pressed ||
      navigator.getGamepads()[0].axes[0] > 0.1) {
      KEY_STATUS[KEY_MAP['controllerRight']] = true;
    };
    if(
      navigator.getGamepads()[0].buttons[0].pressed ||
      navigator.getGamepads()[0].buttons[1].pressed ||
      navigator.getGamepads()[0].buttons[2].pressed ||
      navigator.getGamepads()[0].buttons[3].pressed ||
      navigator.getGamepads()[0].buttons[4].pressed ||
      navigator.getGamepads()[0].buttons[5].pressed

    ) {
      KEY_STATUS[KEY_MAP['controllerFire']] = true;
    };
  }

  buttonUp() {
    let gamepads = navigator.getGamepads ? navigator.getGamepads() :
      (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    if(!navigator.getGamepads()[0].buttons[14].pressed) {
      KEY_STATUS[KEY_MAP['controllerLeft']] = false;
    }
    if(!navigator.getGamepads()[0].buttons[15].pressed) {
      KEY_STATUS[KEY_MAP['controllerRight']] = false;
    };
    if(
      !navigator.getGamepads()[0].buttons[0].pressed &&
      !navigator.getGamepads()[0].buttons[1].pressed &&
      !navigator.getGamepads()[0].buttons[2].pressed &&
      !navigator.getGamepads()[0].buttons[3].pressed &&
      !navigator.getGamepads()[0].buttons[4].pressed &&
      !navigator.getGamepads()[0].buttons[5].pressed
    ) {
      KEY_STATUS[KEY_MAP['controllerFire']] = false;
    };
  }

  keydown(e) {
    let keyCode = e.which || e.keyCode || 0;
    if(keyCode === 13 && this.gameStatus !== 'playing') this.newGame();
    if(keyCode === 77) this.clickMute();
    if(keyCode === 80) this.clickPause();
    if(KEY_MAP[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_MAP[keyCode]] = true;
    }
  }

  keyup(e) {
    let keyCode = e.which || e.keyCode || 0;
    if(KEY_MAP[keyCode]) {
      e.preventDefault();
      KEY_STATUS[KEY_MAP[keyCode]] = false;
    }
  }

  handleStart(e, boundingRect) {
    e.preventDefault();
    let touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      let posX = touch.pageX - boundingRect.left;
      let posY = touch.pageY - boundingRect.top;

      if(
        this.movementDirection === 'standard' && this.firePosition === 'standard'
      ) {
        if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = true;
        } else if((0 <= posX && posX <= 200) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchRight']] = true;
        } else if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = true;
        };
      } else if(
        this.movementDirection === 'inverted' && this.firePosition === 'standard'
      ) {
        if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchRight']] = true;
        } else if((0 <= posX && posX <= 200) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = true;
        } else if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = true;
        };
      } else if(
        this.movementDirection === 'standard' && this.firePosition === 'inverted'
      ) {
        if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = true;
        } else if((600 <= posX && posX <= 800) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchRight']] = true;
        } else if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = true;
        };
      } else if(
        this.movementDirection === 'inverted' && this.firePosition === 'inverted'
      ) {
        if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = true;
        } else if((600 <= posX && posX <= 800) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchRight']] = true;
        } else if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = true;
        };
      };

      this.ongoingTouches.push(this.copyTouch(touches[i], posX, posY));
    };
  }

  handleEnd(e, boundingRect) {
    e.preventDefault();
    let touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];
      let posX = touch.pageX - boundingRect.left;
      let posY = touch.pageY - boundingRect.top;

      if(
        this.movementDirection === 'standard' && this.firePosition === 'standard'
      ) {
        if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = false;
        } else if((0 <= posX && posX <= 200) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchRight']] = false;
        } else if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = false;
        };
      } else if(
        this.movementDirection === 'inverted' && this.firePosition === 'standard'
      ) {
        if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchRight']] = false;
        } else if((0 <= posX && posX <= 200) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = false;
        } else if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = false;
        };
      } else if(
        this.movementDirection === 'standard' && this.firePosition === 'inverted'
      ) {
        if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = false;
        } else if((600 <= posX && posX <= 800) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchRight']] = false;
        } else if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = false;
        };
      } else if(
        this.movementDirection === 'inverted' && this.firePosition === 'inverted'
      ) {
        if((600 <= posX && posX <= 800) && (0 <= posY && posY <= 249)) {
          KEY_STATUS[KEY_MAP['touchLeft']] = false;
        } else if((600 <= posX && posX <= 800) && (250 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchRight']] = false;
        } else if((0 <= posX && posX <= 200) && (0 <= posY && posY <= 500)) {
          KEY_STATUS[KEY_MAP['touchFire']] = false;
        };
      };

      let touchIdx = this.ongoingTouchIndexById(touch.identifier);
      this.ongoingTouches.splice(touchIdx, 1);
    };
  }

  copyTouch(touch, posX, posY) {
    return {
      identifier: touch.identifier,
      posX,
      posY
    };
  }

  ongoingTouchIndexById(idToFind) {
    for(let i = 0; i < this.ongoingTouches.length; i++) {
      let id = this.ongoingTouches[i].identifier;
      if(id == idToFind) return i;
    }
    return -1;    // not found
  }

  statsCanvasCheckClick(e, boundingRect) {
    e.preventDefault();
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
    e.preventDefault();
    let clickPosX = e.clientX - boundingRect.left;
    let clickPosY = e.clientY - boundingRect.top;

    if(
      (240 <= clickPosX && clickPosX <= 560) &&
      (165 <= clickPosY && clickPosY <= 200)
    ) {
      this.swapMovementDirection();
    } else if(
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
    } else if(
      (20 <= clickPosX && clickPosX <= 170) &&
      (410 <= clickPosY && clickPosY <= 490)
    ) {
      this.gamePadToggle = this.gamePadToggle ? false : true;
      this.field.drawGamePadToggleButton();
    } else if(
      (290 <= clickPosX && clickPosX <= 515) &&
      (255 <= clickPosY && clickPosY <= 290) &&
      this.isMobile === true
    ) {
      this.moveFireButton();
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
      this.resumeSpawnTimers();
      this.field.clearOptsContext();
      this.optsCanvas.canvas.classList.add('hidden');
      this.play();
    } else if (!this.paused && this.gameStatus === 'playing') {
      this.paused = true;
      this.pauseSpawnTimers();
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
      this.movementDirection = 'inverted';
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

    this.field.updateMovementDirection(this.movementDirection);
    this.drawStartScreen()
  }

  moveFireButton() {
    if(this.firePosition === 'standard') this.firePosition = 'inverted';
    else this.firePosition = 'standard';
    this.field.updateFirePosition(this.firePosition);
    this.drawStartScreen()
  }

  mapGamePadButtons(e) {
    KEY_MAP['controllerFire'] = 'fire';
    KEY_MAP['controllerLeft'] = 'left';
    KEY_MAP['controllerRight'] = 'right';
    KEY_STATUS['controllerFire'] = false;
    KEY_STATUS['controllerLeft'] = false;
    KEY_STATUS['controllerRight'] = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let foregroundCanvas = document.getElementById("foreground-canvas");
  let playerCanvas = document.getElementById("player-canvas");
  let statsCanvas = document.getElementById("stats-canvas");
  let optionsCanvas = document.getElementById("options-canvas");
  let mobileCanvas = null;

  if(
    (typeof window.orientation !== "undefined") ||
    (navigator.userAgent.indexOf('IEMobile') !== -1)
  ) {
    mobileCanvas = document.createElement("canvas");
    mobileCanvas.id = "mobile-canvas";
    mobileCanvas.width = "800";
    mobileCanvas.height = "500";
    document.getElementsByClassName("game-area")[0].appendChild(mobileCanvas);
  };

  let game = new Game(
    foregroundCanvas,
    statsCanvas,
    playerCanvas,
    optionsCanvas,
    mobileCanvas
  );
});
