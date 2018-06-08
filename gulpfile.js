'use strict';

const gulp        = require('gulp'),
      browserSync = require('browser-sync').create();

require('./tasks/pages')(browserSync);
require('./tasks/template')(browserSync);
require('./tasks/clean');
require('./tasks/javascript')(browserSync);
require('./tasks/static')(browserSync);
require('./tasks/http-server')(browserSync); 

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

gulp.task('build', [
  'clean',
  'template',
  'pages',
  'javascript',
  'static'
]);

gulp.task('default', [
  'build',
  'watch',
  'http-server'
]);
