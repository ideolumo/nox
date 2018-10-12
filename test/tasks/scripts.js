'use strict'

const tape = require('tape')
const {tempyNox, runGulp, testFileExists, testFileNotExists, testFileContentEquals} = require('../helpers')

tape('scripts task should minfiy js files in source/_scripts and put them into build/assets/scripts', async t => {
  let tmpNox = await tempyNox(['source/_scripts/**/*'])

  await runGulp(tmpNox)
  await testFileExists(t, [tmpNox, 'build/assets/scripts/foobar.js'], 'foobar.js exists')
  await testFileNotExists(t, [tmpNox, 'build/assets/scripts/_barfoo.js'], '_barfoo.js does not exist')
  await testFileContentEquals(t, [tmpNox, 'build/assets/scripts/foobar.js'], 'console.log("test");let a=42;', 'foobar.js got minified')
  t.end()
})
