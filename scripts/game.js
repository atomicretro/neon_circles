import Field from './field';

const startGame = (canvas) => {
  let field = new Field(canvas, 800, 500);
  // field.drawPlayer();
  
  field.playRound();
}



document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("gameCanvas");
  startGame(canvas);
});
