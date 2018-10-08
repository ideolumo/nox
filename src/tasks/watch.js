'use strict'

const path = require('path')
const gulpWatch = require('gulp-watch')

exports.init = (gc, context) => {
  let options = context.options

  gc.task('watch', [
    'watch:pages',
    'watch:others'
  ]);

  gc.task('watch:pages', () => {
    return gulpWatch(path.join(options.paths.source[0], '**/*'), {ignoreInitial: false},
      vinyl => {gulp.start('pages')})
  })

  gc.task('watch:others', () => {
    gc.watch(['package.json'], ['build']);
    //gulp.watch(['src/pages/**/*.*'], ['pages']);
    gc.watch('src/partials/**/*', ['build']);
    gc.watch('src/css/**/*.sass', ['sass']);
    gc.watch('src/js/**/*.js', ['js']);
    gc.watch(['src/static/**/*', 'src/static/**/.*'], ['static']);
    gc.watch('src/template/**/*', ['build']);
    gc.watch('src/components/**/*', ['build']);
    gc.watch('src/data/**/*', ['pages']);
  });



}
