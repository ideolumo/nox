'use strict'

const tape = require('tape')
const {tempyNox, runGulp, testFileExists, testFileNotExists, testFileContentEquals} = require('../helpers')

tape('styles task should preprocess all *.sass files in source/_styles and put them into build/assets/styles', async t => {
  let tmpNox = await tempyNox(['source/_styles/**'])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/assets/styles/foo.css'], 'foo.css exists')
  await testFileContentEquals(t, [tmpNox, 'build/assets/styles/foo.css'], 'head{backgound-color:red}', 'sass got to css converted')
  await testFileNotExists(t, [tmpNox, 'build/assets/styles/_bar.css'], '_bar.css does not exists')
  t.end()
})
