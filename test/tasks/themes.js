'use strict'

const tape = require('tape')
const {tempyNox, runGulp, testFileExists, testFileNotExists} = require('../helpers')

tape('themes:assets task should copy all assets from source/_themes/ to build/assets/themes', async t => {
  let tmpNox = await tempyNox(['source/_themes/**'])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/assets/themes/default/cat.png'], 'cat.png exists')
  await testFileExists(t, [tmpNox, 'build/assets/themes/default/somefont.woff'], 'somefont.woff exists')
  await testFileNotExists(t, [tmpNox, 'build/assets/themes/default/index.pug'], `index.pug didn't get copied`)
  await testFileNotExists(t, [tmpNox, 'build/assets/themes/default/index.sass'], `index.sass didn't get copied`)
  t.end()
})
