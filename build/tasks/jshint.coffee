module.exports = ->
  @loadNpmTasks "grunt-contrib-jshint"

  @config "jshint", [
    "dist/**/*.js"
  ]
