'use strict'

const del = require('del')
const path = require('path')

exports.init = (gc, context) => {
  gc.task('clean', gc.parallel('clean:build'))

  gc.task('clean:build', gc.fn(
    del([
      path.join(context.options.dirs.build, '/**/*'),
      path.join(context.options.dirs.build, '/**/.*')
    ])
  ))
}
