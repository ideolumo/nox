'use strict';

const del          = require('del');
const gulp         = require('gulp');
const gulpImagemin = require('gulp-imagemin');
const gulpRename   = require('gulp-rename');

/**
 * Task: compress-images
 *
 * Compresses all images.
 * INFO: Compresses images will be put into /src folder, not /build!
 */

gulp.task('compress-images', () => gulp
  .src(['./src/**/*.+(jpg|jpeg|gif|png|svg)', '!./src/**/*.min.*'])
  .pipe(gulpRename((path) => {
    path.extname = '.min' + path.extname;
  }))
  .pipe(gulpImagemin())
  .pipe(gulp.dest('./src'))
);

/**
 * Task: clean-compressed-images
 *
 * Removes all .min.png/.min.jpg... files in src folder.
 */
gulp.task('clean-compressed-images', () => del([
  './src/**/*.min.+(jpg|jpeg|gif|png|svg)'
]));
