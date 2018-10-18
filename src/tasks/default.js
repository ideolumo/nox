'use strict'

exports.init = (gulp, context) => {
  gulp.task('default', gulp.parallel('build'))
}
