'use strict'

const {join} = require('path')
const gulpWatch = require('gulp-watch')
const {gcWatchTask} = require('../helpers')

exports.init = (gc, context) => {
  let options = context.options

  gc.task('watch', gc.parallel(
    'watch:pages',
    'watch:static',
    'watch:scripts',
    'watch:styles',
    'watch:themes',
    'watch:other-folders'
  ))
}
