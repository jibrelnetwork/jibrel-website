const { path } = require('ramda')
const { resolve } = require('path')
const { readFileSync, readdirSync, statSync } = require('fs')

const mainLang = require('../en-US')

const partialsDir = resolve(__dirname, '..', '..', 'partials')

const checkKeyExist = (partial, key) => {
  if (path(key)(mainLang) == null) {
    throw new Error(
      `${key.join('.')} that found in '${partial}' does not exist in 'en-US' language file`,
    )
  }
}

const getKeys = content => {
  if (!content || ((typeof content) !== 'string')) {
    return []
  }

  const foundKeys = content.match(/{{ ([a-z0-9\.]*) }}/ig)

  if (!foundKeys) {
    return []
  }

  return foundKeys.map(key => key.replace(/[{} ]/g, ''))
}

const parseFile = fileName => {
  const content = readFileSync(fileName, 'utf8')
  const keys = getKeys(content).map(key => key.split('.'))

  keys.forEach(key => checkKeyExist(fileName, key))
}

const parseFiles = dirName => {
  const files = readdirSync(dirName)

  files.forEach(file => {
    const childFileName = resolve(dirName, file)

    if (statSync(childFileName).isDirectory()) {
      parseFiles(childFileName)
    } else {
      parseFile(childFileName)
    }
  })
}

const checkKeys = () => {
  try {
    parseFiles(partialsDir)
    console.log('Checking of i18n keys was successfully finished')
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

checkKeys()
