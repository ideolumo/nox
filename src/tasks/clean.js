'use strict'

const del = require('del')
const path = require('path')

exports.init = (gulp, context) => {
  gulp.task('clean', gulp.parallel('clean:build'))

  gulp.task('clean:build', () => {
    return del([
      path.join(context.options.dirs.build, '/**/*'),
      path.join(context.options.dirs.build, '/**/.*')
    ])
  })
}
