'use strict';

const childProcess = require('child_process');
const gulp         = require('gulp');
const path         = require('path');

module.exports = (context) => {
  /**
   * Task: browser-sync
   *
   * Start browser-sync http server which auto reloads whenever we detect
   * a change. Proxies requests to http server running on localhost:8081.
   */
  gulp.task('browser-sync', () => {
    context.browserSync.init({
      proxy: 'localhost:8081',
      port: 8080,
      ui: {
        port: 8082
      }
    });
  });
};

