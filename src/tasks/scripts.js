'use strict'

const path = require('path')
const uglifyEs = require('uglify-es')
const gulpUglify = (require('gulp-uglify/composer'))(uglifyEs, console)


exports.init = (gc, context) => {
  let options = context.options
  let pathSourceOrigin = path.join(options.dirs.source, options.dirs.scripts)
  let pathBuildDestination = path.join(options.dirs.build, options.dirs.assets, options.dirs.assetsScripts)

  gc.task('scripts', gc.parallel(
    'scripts:js',
  ))

  gc.task('scripts:js', gc.fn(
    gc.pump([
      gc.src([
        path.join(pathSourceOrigin, '**/*.js'),
        '!' + path.join(pathSourceOrigin, '**/_*.js')
      ]),
      exports.minfiyJS(gc, context),
      gc.dest(pathBuildDestination),
      context.SyncBrowser()
    ])
  ))
}

exports.minfiyJS = (gc, context) => {
  return gulpUglify({})
}
