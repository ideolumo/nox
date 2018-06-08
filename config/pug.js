'use strict';

const path         = require('path'),
      sass         = require('node-sass');

module.exports = {
  basedir: './src',
  filters: {
    sass: (text, options) => {
      let pathToFile = path.dirname(options.filename);
      let sassOpt = {
          file: options.filename,
          data: text,
          indentedSyntax: true,
          includePaths: [pathToFile, ...sassOptions.includePaths],
          ...sassOptions
      };
      return sass.renderSync(sassOpt).css.toString();
    }
  },
  locals: {
    require: (path) => {
      if(path.startsWith('/')) path = './src' + path;
      // For hot reloading we don't want to cache
      delete require.cache[require.resolve(path)]
      return require(path);
    }
  }
};
