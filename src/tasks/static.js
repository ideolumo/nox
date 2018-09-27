'use strict';

const path = require('path')

var taskSeries = (gc, context) => {
  /**
   * Task: static
   *
   * Copy static assets
   */
  let options = context.options

  gc.task('default', gc.fn(
    gc.pump([
      gc.src(path.join(options.dirs.source, options.dirs.static)),
      gc.dest(path.join(options.dirs.build)),
      context.SyncBrowser()
    ])
  ))
}

module.exports = taskSeries
