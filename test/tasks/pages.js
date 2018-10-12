'use strict'

const tape = require('tape')
const {join} = require('path')
const {tempyNox, runGulp, testFileExists, testFileContentEquals, replaceFileContent, sleep, waitForEvent} = require('../helpers')
const fse = require('fs-extra')

tape('pages task should translate & minify source/_pages/**/*.pug files and put them into build folder and copy assets', async t => {
  let tmpNox = await tempyNox(['source/_pages/pagefoo/**/*'])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/pagefoo/index.html'], 'index.pug got copied to correct path')
  await testFileContentEquals(t, [tmpNox, 'build/pagefoo/index.html'], '<p>FooBar</p>', 'index.pug got translated into html and minified')
  await testFileExists(t, [tmpNox, 'build/pagefoo/someasset.png'], 'asset got copied')
  t.end()
})

tape('require method should be available in pug and be remapped', async t => {
  let tmpNox = await tempyNox([
    'source/_pages/remapped-require/**/*',
    'source/_data/remapped-require.json'
  ])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/remapped-require/index.html'], 'index.pug got copied to correct path')
  await testFileContentEquals(t, [tmpNox, 'build/remapped-require/index.html'], '<p>bar76042</p>', 'index.html content is correct, remapped require works')

  t.end()
})

tape('the sass filter should be available', async t => {
  let tmpNox = await tempyNox([
    'source/_pages/sass-filter/**/*',
    'source/_themes/default/**/*'
  ])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/sass-filter/index.html'], 'index.pug got copied to correct path')
  await testFileContentEquals(t, [tmpNox, 'build/sass-filter/index.html'], '<style>head{background-color:grey}body{margin:10% 10%}</style>', 'index.html content is correct, remapped require works')

  t.end()
})


tape.only('should watch for changes to existing pages and update pug', async t => {
  let tmpNox = await tempyNox([
    'source/_pages/pagefoo/**/*'
  ])

  let runningGulp = runGulp(tmpNox, null, ['build', 'watch'])
  runningGulp.events.on('all', event => {
    if(event != 'stdout') console.log(event)
  })
  console.log('waiting for build...')
  await waitForEvent(runningGulp.events, 'finished-build')
  console.log('finished build')
  await testFileContentEquals(t, [tmpNox, 'build/pagefoo/index.html'], '<p>FooBar</p>', `Old content is correct`)
  await replaceFileContent(join(tmpNox, 'source/_pages/pagefoo/index.pug'), 'p NewContent')
  await waitForEvent(runningGulp.events, 'finished-<anonymous>')

  await testFileContentEquals(t, [tmpNox, 'build/pagefoo/index.html'], '<p>NewContent</p>', 'Content got successfully updated')
  await runningGulp.kill()
  t.end()
})

tape('should watch for new created pages and rebuild', async t => {
  let tmpNox = await tempyNox([])

  let runningGulp = runGulp(tmpNox)
  await sleep(500)

  await fse.copy
  await replaceFileContent(join(tmpNox, 'source/_pages/pagefoo/index.pug'), 'p NewContent')
  await sleep(500)
  await testFileContentEquals(t, [tmpNox, 'build/pagefoo/index.html'], '<p>NewContent</p>')
  await runningGulp.kill()
  t.end()
})
