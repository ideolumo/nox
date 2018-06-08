/**
 * Task: js
 *
 * Minifies js
 */
gulp.task('js', (cb) => {
    pump([
        gulp.src(['src/js/**/*.js']),
        gulpIf(minify, gulpUglify({})),
        gulp.dest('./build/js'),
        browserSync.stream()
    ], cb);
});
