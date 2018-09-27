const gulp           = require('gulp')
const gulpComposer   = require('gulp-composer')
const browserSync    = require('browser-sync').create();
const defaultOptions = require('./default-options');
const process        = require('process');

const context = {
  initCwd: process.env.INIT_CWD || process.cwd(),
  options: defaultOptions,
  browserSync,
  SyncBrowser: browserSync.stream
}

var gc = new gulpComposer(gulp)

require('./tasks/static')(gc, context)


module.exports = gc.compose()
