'use strict'

const path = require('path')
const gulpData = require('gulp-data')
const gulpHtmlmin = require('gulp-htmlmin')
const gulpPug = require('@ideolumo/gulp-pug')
const gulpRename = require('gulp-rename')
const sass = require('node-sass')
const {gcWatchTask} = require('../helpers')

exports.init = (gc, context) => {
  let options = context.options

  gc.task('pages', gc.parallel('pages:pug', 'pages:assets'))
  gc.task('watch:pages', gc.parallel('watch:pages:pug', 'watch:pages:assets'))


  let globsPages = [
    path.join(options.paths.pages[0], '**/*.pug'),
    '!' + path.join(options.paths.pages[0], '**/_*.pug')
  ]

  gc.task('pages:pug', gc.fn(gc.pump([
    gc.src(globsPages),
    exports.injectPugData(gc, context),
    exports.pugToHTML(gc, context),
    exports.minifyHTML(gc, context),
    exports.changeFileextension(gc, context),
    gc.dest(options.paths.pages[1]),
    context.SyncBrowser()
  ])))

  gcWatchTask(gc, 'watch:pages:pug', globsPages, ['pages:pug'])

  let globsAssets = [
    path.join(options.paths.pages[0], '**/*.*'),
    '!' + path.join(options.paths.pages[0], '**/_*'),
    '!' + path.join(options.paths.pages[0], '**/*.pug'),
    '!' + path.join(options.paths.pages[0], '**/*.sass')
  ]

  gc.task('pages:assets', gc.fn(gc.pump([
    gc.src(globsAssets),
    gc.dest(options.paths.pages[1]),
    context.SyncBrowser()
  ])))

  gcWatchTask(gc, 'watch:pages:assets', globsAssets, ['pages:assets'])
}

// Inject local variables to use in pug templates
exports.injectPugData = (gc, context) => {
  let options = context.options
  return gulpData(file => {
    let pathToNoxProjectSrc = path.join(process.cwd(), options.dirs.source)
    let filepath = file.history[0].substring(pathToNoxProjectSrc.length)

    let _PUGF = path.parse(filepath)
    _PUGF.root = pathToNoxProjectSrc
    _PUGF.page = path.basename(_PUGF.dir)
    _PUGF.file = file
    _PUGF.path = filepath

    return { _PUGF }
  })
}

// Translate pug into HTML
exports.pugToHTML = (gc, context) => {
  return gulpPug(context.options.pug)
}

// Minify html
exports.minifyHTML = (gc, context) => {
  return gulpHtmlmin(context.options.minifyHTML)
}

exports.changeFileextension = (gc, context) => {
  return gulpRename(path => {
    path.extname = context.options.pug.extension
  })
}

exports.remappedRootRequire = remapRootToPath => {
  return (p) => {
    if(p.startsWith('/')) p = path.join(process.cwd(), remapRootToPath, p);
    // For hot reloading we don't want to cache
    delete require.cache[require.resolve(p)]
    return require(p);
  }
}

exports.sassFilterPug = optionsSass => {
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
      console.log(err)
      throw new Error(`Error: ${err.message} on line ${err.line} on position ${err.column} in file ${options.filename}`);
    }
    return result.css.toString();
  }
}
