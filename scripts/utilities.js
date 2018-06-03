export class ObjectPool {
  constructor(size) {
    this.size = size;
    this.pool = [];
  }

  get(objectData) {
    if(!this.pool[this.size - 1].spawned) {
      this.pool[this.size - 1].spawn(objectData);
      this.pool.unshift(this.pool.pop());
    }
  }

  draw(type) {
    for(let i = 0; i < this.size; i++) {
      if(this.pool[i].spawned) {
        this.pool[i].draw(this.BulletPool);
        if(this.pool[i].resetable()) {
          this.pool[i].setDefaultValues(type);
          this.pool.push((this.pool.splice(i, 1))[0]);
        }
      } else {
          break;
      }
    }
  }
};

export class Sprite {
  constructor(context, image, srcWidth, srcHeight, srcX, srcY) {
    this.context = context;
    this.image = image;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;

    this.draw = this.draw.bind(this);
  }

  draw(drawPointX, drawPointY) {
    this.context.drawImage(
      this.image,
      this.srcX,
      this.srcY,
      this.srcWidth,
      this.srcHeight,
      drawPointX,
      drawPointY,
      this.srcWidth,  // drawn image width, same as src
      this.srcHeight  // drawn image height, same as src
    )
  }
};

export class AssetStore {
  constructor(game) {
    this.game = game;

    this.backgroundMusic = new Audio("assets/sounds/background_music.mp3");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.25;
    this.backgroundMusic.load();
    this.checkReadyState = this.checkReadyState.bind(this);
    this.checkAudio = window.setInterval(() => {this.checkReadyState()}, 1000);

    this.mouthDemon = {
      image: new Image(),
      width: 30,
      height: 30,
      srcX: 0,
      srcY: 0
    }
    this.eyeDemon = {
      image: new Image(),
      width: 30,
      height: 30,
      srcX: 0,
      srcY: 0
    }
    this.faceDemon = {
      image: new Image(),
      width: 30,
      height: 40,
      srcX: 0,
      srcY: 0
    }
    this.faceDemonHurt = {
      image: new Image(),
      width: 30,
      height: 40,
      srcX: 0,
      srcY: 0
    }
    this.bossDemon = {
      image: new Image(),
      width: 50,
      height: 54,
      srcX: 0,
      srcY: 0
    }
    this.heart = { image: new Image() }

    this.numAssets = 7;
    this.numLoaded = 0;

    this.mouthDemon.image.onload = () => { this.assetLoaded(); }
    this.eyeDemon.image.onload = () => { this.assetLoaded(); }
    this.faceDemon.image.onload = () => { this.assetLoaded(); }
    this.faceDemonHurt.image.onload = () => { this.assetLoaded(); }
    this.bossDemon.image.onload = () => { this.assetLoaded(); }
    this.heart.image.onload = () => { this.assetLoaded(); }

    this.mouthDemon.image.src = 'assets/sprites/mouth_demon.png';
    this.eyeDemon.image.src = 'assets/sprites/eye_demon.png';
    this.faceDemon.image.src = 'assets/sprites/face_demon.png';
    this.faceDemonHurt.image.src = 'assets/sprites/face_demon_hurt.png';
    this.bossDemon.image.src = 'assets/sprites/boss_demon.png';
    this.heart.image.src = 'assets/sprites/heart.png';
  }

  checkReadyState() {
    if(this.backgroundMusic.readyState === 4) {
      window.clearInterval(this.checkAudio);
      this.assetLoaded();
    }
  }

  assetLoaded() {
    this.numLoaded++;
    if(this.numLoaded === this.numAssets) this.game.startGame();
  }
};
