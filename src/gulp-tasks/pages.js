'use strict';

const gulpComposedPipesPug = require('../gulp-composed-pipes/pug');
const gulp                 = require('gulp');
const pump                 = require('pump');
const gulpPlumber          = require('gulp-plumber');
const chalk                = require('chalk');
const fancyLog             = require('fancy-log');

// Format orchestrator errors
function formatError(e) {
  if (!e.err) {
    return e.message;
  }

  // PluginError
  if (typeof e.err.showStack === 'boolean') {
    return e.err.toString();
  }

  // Normal error
  if (e.err.stack) {
    return e.err.stack;
  }

  // Unknown (string, number, etc.)
  return new Error(String(e.err)).stack;
}
module.exports = (context) => {
  gulp.task('pages-pug', function(cb) {
    return pump(
      [
        gulp.src(['src/pages/**/*.pug', '!src/pages/**/_*.pug']),
        gulpPlumber((err) => {
          //console.log('x', JSON.stringify(err))
          /*let errStr = `${chalk.red(err.name)} in plugin "${chalk.blue(err.plugin)}"
Message:
  ${err.message}
Details:
  pos: ${err.pos}
  loc: ${err.loc.line}:${err.loc.column}
  raisedAt: ${err.raisedAt}
  filename: ${err.filename}`*/
          console.log(JSON.stringify(err))
          throw err
        }),
        ...gulpComposedPipesPug(context),
        gulp.dest('./build'),
        context.browserSync.stream()
      ]);
  });

  /**
   * Task: pages-assets
   *
   * Copies everything from src/pages/<pagename>/assets to
   * build/assets/pages/<pagename>.
   * Ignores files starting with _.
   */
  gulp.task('pages-assets', () => gulp
    .src([
      'src/pages/**/*.*',
      '!src/pages/**/_*',
      '!src/pages/**/*.pug',
      '!src/pages/**/*.sass'])
    .pipe(gulp.dest('./build'))
    .pipe(context.browserSync.stream())
  );

  gulp.task('pages', gulp.series('pages-pug', 'pages-assets'));
};
