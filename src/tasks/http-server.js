'use strict'

const gulp = require('gulp')

module.exports = (context) => {
  require('./docker')(context)
  require('./browser-sync')(context)
  /**
   * Task: http-server
   *
   * Starts docker & browser-sync
   */
  gulp.task('http-server', ['docker', 'browser-sync'])
}
