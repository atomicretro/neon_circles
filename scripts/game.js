import Field from './field';

const startGame = (foregroundCanvas, playerCanvas) => {
  let field = new Field(
    foregroundCanvas,
    statsCanvas,
    playerCanvas);
}

document.addEventListener("DOMContentLoaded", () => {
  let foregroundCanvas = document.getElementById("foregroundCanvas");
  let playerCanvas = document.getElementById("playerCanvas");
  startGame(foregroundCanvas, playerCanvas);
});
