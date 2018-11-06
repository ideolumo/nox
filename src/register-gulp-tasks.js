'use strict'

const gulp = require('gulp');
const gulpWatch = require('gulp-watch');


module.exports = (context) => {
  require('./gulp-tasks/pages')(context);
  require('./gulp-tasks/template')(context);
  require('./gulp-tasks/clean')(context);
  require('./gulp-tasks/javascript')(context);
  require('./gulp-tasks/static')(context);
  require('./gulp-tasks/http-server')(context);
  require('./gulp-tasks/compress-images')(context);


  gulp.task('build', [
    'clean',
    'template',
    'pages',
    'javascript',
    'static'
  ]);

  gulp.task('watch-pages', () => {
    return gulpWatch('src/pages/**/*', { ignoreInitial: false }, vinyl => {
      gulp.start('pages')
    })
  })

  gulp.task('watch-others', () => {
    gulp.watch(['package.json'], ['build']);
    //gulp.watch(['src/pages/**/*.*'], ['pages']);
    gulp.watch('src/partials/**/*', ['build']);
    gulp.watch('src/css/**/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch(['src/static/**/*', 'src/static/**/.*'], ['static']);
    gulp.watch('src/template/**/*', ['build']);
    gulp.watch('src/components/**/*', ['build']);
    gulp.watch('src/data/**/*', ['pages']);
  });

  gulp.task('watch', [
    'watch-pages',
    'watch-others'
  ]);

  gulp.task('default', [
    'build',
    'watch',
    'http-server'
  ]);
}
