'use strict'

const path = require('path')

module.exports = (gc, context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  let options = context.options
  let pathSourceStatic = path.join(options.dirs.source, options.dirs.static)
  gc.task('static', gc.fn(
    gc.pump([
      gc.src([path.join(pathSourceStatic, '**/*'), path.join(pathSourceStatic, '**/.*')]),
      gc.dest(path.join(options.dirs.build)),
      context.SyncBrowser()
    ])
  ))
}
