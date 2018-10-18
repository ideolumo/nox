'use strict'

const path = require('path')
const {gulpWatchTask} = require('../helpers')
const pump = require('pump')

exports.init = (gulp, context) => {
  let options = context.options

  let globs = [
    path.join(options.paths.static[0], '**/*'),
    path.join(options.paths.static[0], '**/.*')
  ]

  gulp.task('static', (cb) => {
    return pump(
      gulp.src(globs),
      gulp.dest(options.paths.static[1]),
      context.SyncBrowser(),
      cb)
  })

  gulpWatchTask(gulp, 'watch:static', globs, ['static'])
}
