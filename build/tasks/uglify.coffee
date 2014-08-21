module.exports = ->
  @loadNpmTasks "grunt-contrib-uglify"

  # Move vendor and app logic during a build.
  @config "uglify",
    release:
      files: [
        "dist/SerialQueue.min.js": ["dist/SerialQueue.js"]
      ]
