'use strict'

exports.init = (gulp, context) => {
  gulp.task('build', gulp.parallel('pages', 'themes', 'static', 'styles', 'scripts'))
}
