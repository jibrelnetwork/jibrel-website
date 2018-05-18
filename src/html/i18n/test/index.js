const uniqKeysTest = require('./uniqKeysTest')
const jsonKeysTest = require('./jsonKeysTest')
const partialsKeysTest = require('./partialsKeysTest')
const translationsTest = require('./translationsTest')

const start = () => {
  try {
    uniqKeysTest()
    jsonKeysTest()
    partialsKeysTest()
    translationsTest()

    console.log('Checking of i18n files was successfully finished')
  } catch (err) {
    console.error()
    console.error()
    console.error('Checking of i18n files was finished with error')
    console.error()
    console.error(err.message)
    console.error()

    process.exit(1)
  }
}

start()
