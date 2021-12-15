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


  gulp.task('build', gulp.series(
    'clean',
    'template',
    'pages',
    'javascript',
    'static'
  ));

  gulp.task('watch-pages', () => {
    return gulp.watch(['src/pages/**/*'], { ignoreInitial: false }, cb => {
      //gulp.series('pages')
      console.log('hallo')
      cb()
    })
  })

  gulp.task('watch-others', () => {
    gulp.watch(['package.json'], gulp.series('build'));
    //gulp.watch(['src/pages/**/*.*'], ['pages']);
    gulp.watch('src/partials/**/*', gulp.series('build'));
    gulp.watch('src/css/**/*.sass', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch(['src/static/**/*', 'src/static/**/.*'], gulp.series('static'));
    gulp.watch('src/template/**/*', gulp.series('build'));
    gulp.watch('src/components/**/*', gulp.series('build'));
    gulp.watch('src/data/**/*', gulp.series('pages'));
  });

  gulp.task('watch', gulp.parallel(
    'watch-pages',
    'watch-others'
  ));

  gulp.task('default', gulp.parallel(
    'build',
    'watch',
    'http-server'
  ), () => {
    console.log('hallo')
  });
}
