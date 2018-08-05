'use strict'

const gulp           = require('gulp');


module.exports = (context) => {
  require('./gulp-tasks/pages')(context);
  require('./gulp-tasks/template')(context);
  require('./gulp-tasks/clean')(context);
  require('./gulp-tasks/javascript')(context);
  require('./gulp-tasks/static')(context);
  require('./gulp-tasks/http-server')(context);


  gulp.task('build', [
    'clean',
    'template',
    'pages',
    'javascript',
    'static'
  ]);

  gulp.task('watch', () => {
    gulp.watch(['package.json'], ['build']);
    gulp.watch(['src/pages/**/*.*'], ['pages']);
    gulp.watch('src/css/**/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch(['src/static/**/*', 'src/static/**/.*'], ['static']);
    gulp.watch('src/template/**/*', ['build']);
    gulp.watch('src/components/**/*', ['build']);
    gulp.watch('src/data/**/*', ['pages']);
  });

  gulp.task('default', [
    'build',
    'watch',
    'http-server'
  ]);
}