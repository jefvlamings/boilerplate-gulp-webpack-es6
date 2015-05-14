# Scene
module.exports = class Scene

  constructor: ($canvas) ->
    console.log('Scene loaded')
    $canvas.css
      border: '2px solid red'