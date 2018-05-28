export class Drawable {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export class ImageStore {
  constructor() {
    this.bulletSheet = new Image();
    this.demonSheet = new Image();
    // this.numImages = 2;
    // this.numLoaded = 0;
    //
    // this.bullet.onload = () => {
    //   this.imageLoaded();
    // }

    this.bulletSheet.src = 'assets/sprites/bullet.png';
    this.demonSheet.src = 'assets/sprites/demon_sheet.png';
  }

  // imageLoaded() {
  //   this.numLoaded++;
  //   if(this.numLoaded === this.numImages) game.playRound();
  // }
}
