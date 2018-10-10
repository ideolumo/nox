'use strict';

var del = require('del');
var path = require('path');
var gulpComposer = require('@ideolumo/gulp-composer')

let gc = new gulpComposer()

gc.task('watch', function (cb) {
  var watcher = gc.gulp.watch('source/**/*.js', () => {
    console.log('hallo')

  });
  cb()
})

let gulp = gc.compose()
