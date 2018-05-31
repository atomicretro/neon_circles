import Field from './field';

const startGame =
  (foregroundCanvas, playerCanvas, statsCanvas, backgroundCanvas) => {
    let field = new Field(
      foregroundCanvas,
      statsCanvas,
      playerCanvas,
      backgroundCanvas
    );
}

document.addEventListener("DOMContentLoaded", () => {
  let foregroundCanvas = document.getElementById("foregroundCanvas");
  let playerCanvas = document.getElementById("playerCanvas");
  let statsCanvas = document.getElementById("statsCanvas");
  let backgroundCanvas = document.getElementById("backgroundCanvas");
  startGame(foregroundCanvas, playerCanvas, statsCanvas, backgroundCanvas);
});
