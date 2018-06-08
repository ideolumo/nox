
/**
 * Task: watch
 *
 * Watch files and execute the corresponding tasks if needed.
 */
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
