'use strict';

const gulpComposedPipesPug = require('./gulp-composed-pipes/pug');


let options = {
  sourceFolder: './src',
  buildFolder: './build',
};

options.sass = {};

options.pug = {
  basedir: this.sourceFolder,
  filters: {
    sass: gulpComposedPipesPug.sassFilterPug(options.sass)
  },
  locals: {
    require: gulpComposedPipesPug.remappedRootRequire('./src')
  }
};

module.exports = options;
