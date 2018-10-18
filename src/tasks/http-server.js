'use strict'

exports.init = (gulp, context) => {
  /**
   * Task: http-server
   *
   * Starts docker & browser-sync
   */
  gulp.task('http-server', gulp.parallel('docker', 'browsersync'))
}
