/**
 * Check that all keys from i18n .json files are used in html partials
 */

const { resolve } = require('path')
const { assoc, path } = require('ramda')
const { readFileSync, readdirSync, statSync } = require('fs')

const mainLang = require('../en-US')

const partialsDir = resolve(__dirname, '..', '..', 'partials')

const checkKey = (keys, key) => {
  /**
   * if current key from json is not included in all keys collected from html
   */
  if (!keys.includes(key.join('.'))) {
    throw new Error(
      `${key.join('.')} that found in 'en-US' language file is not used in html sources`,
    )
  }
}

const checkKeys = (keys, keyToCheck) => {
  /**
   * go from start (root of mainLang object), if key path was not passed
   */
  const objToCheck = !keyToCheck.length ? mainLang : path(keyToCheck)(mainLang)

  /**
   * check each key of current object
   */
  Object.keys(objToCheck).forEach(key => {
    const childKey = keyToCheck.concat(key)

    /**
     * if child key is object - check it recursively
     */
    if ((typeof objToCheck[key]) === 'object') {
      checkKeys(keys, childKey)
    } else {
      checkKey(keys, childKey)
    }
  })
}

const getKeys = content => {
  if (!content || ((typeof content) !== 'string')) {
    return []
  }

  const foundKeys = content.match(/{{ ([a-z0-9\-\.]*) }}/ig)

  if (!foundKeys) {
    return []
  }

  return foundKeys.map(key => key.replace(/[{} ]/g, ''))
}

const parseFile = fileName => {
  const content = readFileSync(fileName, 'utf8')

  return getKeys(content)
}

const parseFiles = dirName => {
  const files = readdirSync(dirName)

  /**
   * Collect all keys from files found in current dir (with dirName)
   */
  return files.map(file => {
    const childFileName = resolve(dirName, file)

    return statSync(childFileName).isDirectory()
      ? parseFiles(childFileName)
      : parseFile(childFileName)
  }).reduce((all, current) => all.concat(current), [])
}

const checkKeysInJSON = () => {
  /**
   * allKeys are keys collected from all html files
   */
  const allKeys = parseFiles(partialsDir)
  checkKeys(allKeys, [])
}

module.exports = checkKeysInJSON
