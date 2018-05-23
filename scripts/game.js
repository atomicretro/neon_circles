const ARROW_MAP = {
  40: 'up',
  39: 'right',
  38: 'down',
  37: 'left'
};

class Game {
  constructor(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;

    this._width = width;
    this._height = height;
    this._ctx = canvas.getContext("2d");

    this.play = this.play.bind(this);
  }

  play() {
    this._clearAll();
    this._drawFieldBorder();
    this._drawPlayerRails('circle');

    // requestAnimationFrame(this.play);
  }

  _clearAll() {
    this._ctx.clearRect(0, 0, this._width, this._height);
  }

  _drawFieldBorder() {
    this._ctx.beginPath();
    this._ctx.lineWidth = 1;
    this._ctx.rect(0, 0, this._width, this._height);
    this._ctx.stroke();
  }

  _drawPlayerRails(shape) {
    let xCenter = this._width / 2;
    let yCenter = this._height / 2;

    switch (shape) {
      case 'circle':
      default:
        this._ctx.beginPath();
        this._ctx.arc(xCenter, yCenter, 35, 0, 2 * Math.PI, true);
        this._ctx.strokeStyle = "black";
        this._ctx.lineWidth = 2;
        this._ctx.stroke();
    }
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const game = new Game(canvas, 800, 500);
  game.play();
});
