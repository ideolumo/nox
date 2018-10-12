const tape = require('tape')

const {tempyNox, testFileExists} = require('./helpers')

tape('tempyNox should copy all selected files from test-project to tempy folder', async t => {
  let tmpNox = await tempyNox(['source/_static/**'])

  await testFileExists(t, [tmpNox, 'source/_static/.dotfile'], `.dotfile got copied`)
  await testFileExists(t, [tmpNox, 'source/_static/images/cat.png'], `cat.png got copied`)
  t.end()
})
