'use strict';

const gulpData    = require('gulp-data');
const gulpHtmlmin = require('gulp-htmlmin');
const gulpPug     = require('@ideolumo/gulp-pug');
const gulpRename  = require('gulp-rename');
const path        = require('path');
const process     = require('process');
const sass        = require('node-sass');

let gulpComposedPipesPug = (context) => {
  let options = context.options;
  console.log(process.cwd());
  return gulp.series(
    gulpComposedPipesPug.pipeData(options),
    gulpComposedPipesPug.pipePug(options),
    gulpComposedPipesPug.pipeHtmlMin(options),
    gulpComposedPipesPug.pipeRenameExtension(options),
  );
}

/**
 * Pipe which uses gulp-data to inject a pugFile global object
 * into all pug templates which holds informations about the path
 * of the currently processed pug template.
 */
gulpComposedPipesPug.pipeData = function(options) {
  return gulpData((file) => {
    let pathToNoxProjectSrc = path.join(process.cwd(), 'src')
    let filepath = file.history[0].substring(pathToNoxProjectSrc.length)

    let _PUGF = path.parse(filepath)
    _PUGF.root = pathToNoxProjectSrc
    _PUGF.page = path.basename(_PUGF.dir)
    _PUGF.file = file
    _PUGF.path = filepath

    return {_PUGF}
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
