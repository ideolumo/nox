'use strict';

const gulpData    = require('gulp-data');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpPug     = require('gulp-pug');
const gulpRename  = require('gulp-rename');
const path        = require('path');
const process     = require('process');
const sass        = require('node-sass');

let gulpComposedPipesPug = (context) => {
  let options = context.options;
  console.log(process.cwd());
  return [
    gulpComposedPipesPug.pipeData(options),
    gulpComposedPipesPug.pipePug(options),
    gulpComposedPipesPug.pipeHtmlMin(options),
    gulpComposedPipesPug.pipeRenameExtension(options),
  ];
}

gulpComposedPipesPug.pipeData = function(options) {
  return gulpData((file) => {
    let filepath = file.history[0]
    let pathToNoxProjectSrc = path.join(process.cwd(), 'src')
    let dirname = filepath.substring(pathToNoxProjectSrc.length)
    console.log(dirname)
    return {
      pugFile: {
        dirname: dirname,
        basename: path.basename(filepath),
        filepath: filepath,
        file: file
      }
    }
  });
}

gulpComposedPipesPug.pipePug = function(options) {
  return gulpPug(options.pug);
}

gulpComposedPipesPug.remappedRootRequire = function(remapRootToPath) {
  return (p) => {
    if(p.startsWith('/')) p = path.join(process.cwd(), remapRootToPath, p);
    // For hot reloading we don't want to cache
    delete require.cache[require.resolve(p)]
    return require(p);
  }
}

gulpComposedPipesPug.sassFilterPug = function(optionsSass) {
  return (text, options) => {
    let pathToFile = path.dirname(options.filename);
    let sassOpt = {
      file: options.filename,
      data: text,
      indentedSyntax: true,
      includePaths: [pathToFile, optionsSass.includePaths],
      ...optionsSass
    };
    let result;
    try {
      result = sass.renderSync(sassOpt)
    } catch(err) {
      throw new Error(`Error: ${err.message} on line ${err.line} on position ${err.column} in file ${options.filename}`);
    }
    return result.css.toString();
  }
}

gulpComposedPipesPug.pipeHtmlMin = function(options) {
  options.htmlMin = Object.assign(
    {
      collapseWhitespace: true,
      removeComments: true,
      removeCommentsFromCDATA: true
    },
    options);
  
  return gulpHtmlmin(options.htmlMin);
}

gulpComposedPipesPug.pipeRenameExtension = function(options) {
  options.renameExtension = options.renameExtension ?
    options.renameExtension : '.php';

  return gulpRename((path) => {path.extname = options.renameExtension});
}

module.exports = gulpComposedPipesPug;
