'use strict';

const gulpHtmlmin = require('gulp-htmlmin');
const gulpPug     = require('gulp-pug');
const gulpRename  = require('gulp-rename');

let gulpComposedPipesPug = (context) => {
  let options = context.options;
  console.log(context);
  return [
    gulpComposedPipesPug.pipePug(options),
    gulpComposedPipesPug.pipeHtmlMin(options),
    gulpComposedPipesPug.pipeRenameExtension(options),
  ];
}

gulpComposedPipesPug.pipePug = function(options) {
  return gulpPug(options.pug);
}

gulpComposedPipesPug.remappedRootRequire = function(remapRootToPath) {
  return (path) => {
    if(path.startsWith('/')) path = remapRootToPath + path;
    // For hot reloading we don't want to cache
    delete require.cache[require.resolve(path)]
    return require(path);
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
    return sass.renderSync(sassOpt).css.toString();
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
