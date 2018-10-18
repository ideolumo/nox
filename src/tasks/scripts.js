'use strict'

const path = require('path')
const uglifyEs = require('uglify-es')
const gulpUglify = (require('gulp-uglify/composer'))(uglifyEs, console)
const {gulpWatchTask} = require('../helpers')
const pump = require('pump')

exports.init = (gulp, context) => {
  let options = context.options

  gulp.task('scripts', gulp.parallel('scripts:js'))
  gulp.task('watch:scripts', gulp.parallel('watch:scripts:js'))

  let globsJs = [
    path.join(options.paths.scripts[0], '**/*.js'),
    '!' + path.join(options.paths.scripts[0], '**/_*.js')
  ]

  gulp.task('scripts:js', (cb) => {
    return pump(
      gulp.src(globsJs),
      exports.minfiyJS(gulp, context),
      gulp.dest(options.paths.scripts[1]),
      context.SyncBrowser(),
      cb
    )
  })



  gulpWatchTask(gulp, 'watch:scripts:js', globsJs, ['scripts:js'])

}

exports.minfiyJS = (gulp, context) => {
  return gulpUglify({})
}
