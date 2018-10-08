'use strict'

const path = require('path')
const uglifyEs = require('uglify-es')
const gulpUglify = (require('gulp-uglify/composer'))(uglifyEs, console)


exports.init = (gc, context) => {
  let options = context.options
  gc.task('scripts', gc.parallel(
    'scripts:js',
  ))

  gc.task('scripts:js', gc.fn(gc.pump([
    gc.src([
      path.join(options.paths.scripts[0], '**/*.js'),
      '!' + path.join(options.paths.scripts[0], '**/_*.js')
    ]),
    exports.minfiyJS(gc, context),
    gc.dest(options.paths.scripts[1]),
    context.SyncBrowser()
  ])))
}

exports.minfiyJS = (gc, context) => {
  return gulpUglify({})
}
