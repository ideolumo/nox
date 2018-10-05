'use strict'

exports.init = (gc, context) => {
  gc.task('build', gc.parallel('pages', 'themes', 'static', 'styles'))
}
