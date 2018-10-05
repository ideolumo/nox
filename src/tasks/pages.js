'use strict'

const path = require('path')
const gulpData = require('gulp-data')
const gulpHtmlmin = require('gulp-htmlmin')
const gulpPug = require('@ideolumo/gulp-pug')
const gulpRename = require('gulp-rename')

exports.init = (gc, context) => {
  let options = context.options
  let pathSourcePages = path.join(options.dirs.source, options.dirs.pages)

  gc.task('pages', gc.parallel(
    'pages-pug',
    'pages-assets'
  ))

  gc.task('pages-pug', gc.fn(
    gc.pump([
      gc.src([
        path.join(pathSourcePages, '**/*.pug'),
        '!' + path.join(pathSourcePages, '**/_*.pug')
      ]),
      exports.injectPugData(gc, context),
      exports.pugToHTML(gc, context),
      exports.minifyHTML(gc, context),
      exports.changeFileextension(gc, context),
      gc.dest(path.join(options.dirs.build)),
      context.SyncBrowser()
    ])
  ))

  gc.task('pages-assets', gc.fn(
    gc.pump([
      gc.src([
        path.join(pathSourcePages, '**/*.*'),
        '!' + path.join(pathSourcePages, '**/_*'),
        '!' + path.join(pathSourcePages, '**/*.pug'),
        '!' + path.join(pathSourcePages, '**/*.sass')
      ]),
      gc.dest(path.join(options.dirs.build)),
      context.SyncBrowser()
    ])
  ))
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
