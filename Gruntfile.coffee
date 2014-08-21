module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  @registerTask "default", [
    "clean"
    "copy"
    "jshint"
    "uglify"
  ]
