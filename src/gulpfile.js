'use strict';

const browserSync    = require('browser-sync').create();
const defaultOptions = require('./default-options');
const gulp           = require('gulp');
const process        = require('process');

const context = {
  initCwd: process.env.INIT_CWD || process.cwd(),
  options: defaultOptions,
  browserSync
}

require('./register-gulp-tasks')(context)
