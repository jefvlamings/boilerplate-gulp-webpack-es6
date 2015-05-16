// Dependencies
var Scene = require('./scene');

// Game
class Game {
  constructor($canvas) {
    console.log('Game loaded');
    var scene = new Scene($canvas);
  }
}

export default Game;