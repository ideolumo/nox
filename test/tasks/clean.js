'use strict'

const tape = require('tape')
const {tempyNox, runGulp, testFileExists, testFileNotExists} = require('../helpers')

tape('clean task should remove everything in build folder', async t => {
  let tmpNox = await tempyNox(['source/_pages/pagefoo/index.pug', 'source/_static/.dotfile'])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/pagefoo/index.html'], 'index.html exists')
  await testFileExists(t, [tmpNox, 'build/.dotfile'], '.dotfile exists')

  await runGulp(tmpNox, null, 'clean')
  await testFileNotExists(t, [tmpNox, 'build/pagefoo'], 'pagefoo got cleaned')
  await testFileNotExists(t, [tmpNox, 'build/.dotfile'], '.dotfile got cleaned')


  t.end()
})
