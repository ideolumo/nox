'use strict'

const {join} = require('path')
const gulpWatch = require('gulp-watch')
const {gulpWatchTask} = require('../helpers')

exports.init = (gulp, context) => {
  let options = context.options

  gulp.task('watch', gulp.parallel(
    'watch:pages',
    'watch:static',
    'watch:scripts',
    'watch:styles',
    'watch:themes',
    'watch:other-folders'
  ))
}
