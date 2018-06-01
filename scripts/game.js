import Field from './field';
import Player from './player';
import { AssetStore, Sprite } from './utilities';
import BaddiePool from './baddie';
import BulletPool from './bullet';

class Game {
  constructor(fgCanvas, statsCanvas, pcCanvas, bgCanvas) {
    this.fgCanvas = {
      ctx: fgCanvas.getContext("2d"),
      width: 800,
      height: 500
    }
    this.statsCanvas = {
      ctx: statsCanvas.getContext("2d"),
      width: 800,
      height: 25
    }
    this.pcCanvas = {
      ctx: pcCanvas.getContext("2d"),
      width: 150,
      height: 150
    }
    this.bgCanvas = {
      ctx: bgCanvas.getContext("2d"),
      width: 800,
      height: 500
    }

    this.AssetStore = new AssetStore(this);
    this.badBulletPool = new BulletPool(1, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new BulletPool(8, this.fgCanvas, 'player');
    this.BaddiePool = new BaddiePool(
      1, this.fgCanvas.ctx, this.AssetStore, this.badBulletPool
    );

    this.player = new Player(this.pcCanvas, this.pcBulletPool);

    this.field = new Field(
      this.fgCanvas,
      this.statsCanvas,
      this.pcCanvas,
      this.bgCanvas,
      this.AssetStore,
      this.badBulletPool,
      this.pcBulletPool,
      this.BaddiePool,
      this.player
    );

  }

  start() {
    this.field.startRound();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let foregroundCanvas = document.getElementById("foregroundCanvas");
  let playerCanvas = document.getElementById("playerCanvas");
  let statsCanvas = document.getElementById("statsCanvas");
  let backgroundCanvas = document.getElementById("backgroundCanvas");

  let game = new Game(
    foregroundCanvas,
    statsCanvas,
    playerCanvas,
    backgroundCanvas
  );
});
