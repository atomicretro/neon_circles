import Field from './field';

const startGame = (backgroundCanvas, playerCanvas) => {
  let field = new Field(backgroundCanvas, playerCanvas);

  field.playRound();
}

document.addEventListener("DOMContentLoaded", () => {
  let backgroundCanvas = document.getElementById("backgroundCanvas");
  let playerCanvas = document.getElementById("playerCanvas");
  startGame(backgroundCanvas, playerCanvas);
});
