# Dependencies
Scene  =  require './scene'

# Game
module.exports = class Game

  constructor: ($canvas) ->
    console.log('Game loaded')
    @scene = new Scene $canvas