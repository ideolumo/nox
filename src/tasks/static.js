'use strict'

const path = require('path')

exports.init = (gc, context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  let options = context.options
  gc.task('static', gc.fn(gc.pump([
    gc.src([path.join(options.paths.static[0], '**/*'), path.join(options.paths.static[0], '**/.*')]),
    gc.dest(options.paths.static[1]),
    context.SyncBrowser()
  ])))
}
