'use strict'

const tape = require('tape')
const {tempyNox, runGulp, testFileExists} = require('../helpers')

tape('static task should copy all files from source/_static/ to build/', async t => {
  let tmpNox = await tempyNox(['source/_static/**'])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/test'], 'build/_static/test exists')
  await testFileExists(t, [tmpNox, 'build/images/cat.png'], 'build/_static/images/cat.png exists')
  await testFileExists(t, [tmpNox, 'build/images/cat.png'], 'build/_static/.dotfile exists')
  t.end()
})
