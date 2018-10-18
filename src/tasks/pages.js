'use strict'

const path = require('path')
const gulpData = require('gulp-data')
const gulpHtmlmin = require('gulp-htmlmin')
const gulpPug = require('@ideolumo/gulp-pug')
const gulpRename = require('gulp-rename')
const sass = require('node-sass')
const {gulpWatchTask} = require('../helpers')
const pump = require('pump')

exports.init = (gulp, context) => {
  let options = context.options

  gulp.task('pages', gulp.parallel('pages:pug', 'pages:assets'))
  gulp.task('watch:pages', gulp.parallel('watch:pages:pug', 'watch:pages:assets'))


  let globsPages = [
    path.join(options.paths.pages[0], '**/*.pug'),
    '!' + path.join(options.paths.pages[0], '**/_*.pug')
  ]

  gulp.task('pages:pug', (cb) => {
    return pump(
      gulp.src(globsPages),
      //gulpDebug(),
      exports.injectPugData(gulp, context),
      exports.pugToHTML(gulp, context),
      exports.minifyHTML(gulp, context),
      exports.changeFileextension(gulp, context),
      gulp.dest(options.paths.pages[1]),
      //context.SyncBrowser()
      cb
    )
  })

  gulp.task('watch:pages:pug', () => {
    gulp.watch(globsPages, gulp.series('pages:pug'))
  })

  //gulpWatchTask(gulp, 'watch:pages:pug', globsPages, ['pages:pug'])

  let globsAssets = [
    path.join(options.paths.pages[0], '**/*.*'),
    '!' + path.join(options.paths.pages[0], '**/_*'),
    '!' + path.join(options.paths.pages[0], '**/*.pug'),
    '!' + path.join(options.paths.pages[0], '**/*.sass')
  ]

  gulp.task('pages:assets', (cb) => {
    return pump([
      gulp.src(globsAssets),
      gulp.dest(options.paths.pages[1]),
      context.SyncBrowser()
    ], cb)
  })

  gulpWatchTask(gulp, 'watch:pages:assets', globsAssets, ['pages:assets'])
}

// Inject local variables to use in pug templates
exports.injectPugData = (gulp, context) => {
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
exports.pugToHTML = (gulp, context) => {
  return gulpPug(context.options.pug)
}

// Minify html
exports.minifyHTML = (gulp, context) => {
  return gulpHtmlmin(context.options.minifyHTML)
}

exports.changeFileextension = (gulp, context) => {
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
      throw new Error(`Error: ${err.message} on line ${err.line} on position ${err.column} in file ${options.filename}`);
    }
    return result.css.toString();
  }
}
