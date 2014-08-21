module.exports = ->
  @loadNpmTasks "grunt-contrib-copy"

  # Move vendor and app logic during a build.
  @config "copy",
    release:
      files: [
        expand: true,
        cwd: "src",
        src: ["SerialQueue.js"],
        dest: "dist/"
      ]
