'use strict';

const gulpComposedPipesPug = require('./gulp-composed-pipes/pug');


let options = {
  sourceFolder: './src',
  buildFolder: './build',
};

options.sass = {
  includePaths: [options.sourceFolder],
  outputStyle: 'compressed'
};

options.pug = {
  basedir: this.sourceFolder,
  filters: {
    sass: gulpComposedPipesPug.sassFilterPug(options.sass)
  },
  locals: {
    require: gulpComposedPipesPug.remappedRootRequire(options.sourceFolder)
  }
};

module.exports = options;
