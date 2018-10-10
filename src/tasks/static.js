'use strict'

const path = require('path')
const {gcWatchTask} = require('../helpers')

exports.init = (gc, context) => {
  let options = context.options

  let globs = [
    path.join(options.paths.static[0], '**/*'),
    path.join(options.paths.static[0], '**/.*')
  ]

  gc.task('static', gc.fn(gc.pump([
    gc.src(globs),
    gc.dest(options.paths.static[1]),
    context.SyncBrowser()
  ])))

  gcWatchTask(gc, 'watch:static', globs, ['static'])
}
