'use strict';

const childProcess = require('child_process');
const gulp         = require('gulp');
const path         = require('path');

module.exports = (context) => {
  require('./docker')(context)
  require('./browser-sync')(context)
  /**
   * Task: http-server
   *
   * Starts docker & browser-sync
   */
  gulp.task('http-server', gulp.series('docker', 'browser-sync'));
};

