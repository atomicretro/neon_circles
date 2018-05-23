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
    this._drawBorder();

    requestAnimationFrame(this.play);
  }

  _clearAll() {
    this._ctx.clearRect(0, 0, this._width, this._height);
  }

  _drawBorder() {
    this._ctx.beginPath();
    this._ctx.rect(0, 0, this._width, this._height);
    this._ctx.stroke();
  }

  _makePurple() {
    this._ctx.fillStyle = "purple";
    this._ctx.fillRect(0, 0, 800, 500);

    this._ctx.beginPath();
    this._ctx.arc(300, 100, 20, 0, 2*Math.PI, true);
    this._ctx.strokeStyle = "green";
    this._ctx.lineWidth = 5;
    this._ctx.stroke();
    this._ctx.fillStyle = "blue";
    this._ctx.fill();
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const game = new Game(canvas, 800, 500);
  game.play();
});
