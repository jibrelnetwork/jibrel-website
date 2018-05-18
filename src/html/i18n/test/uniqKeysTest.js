/**
 * Check that all keys from en-US i18n .json files are unique
 */

const { path, remove } = require('ramda')

const mainLang = require('../en-US')

const getKeys = (keyToCheck) => {
  const objToCheck = !keyToCheck.length ? mainLang : path(keyToCheck)(mainLang)

  return Object.keys(objToCheck).reduce((result, key) => {
    const childKey = keyToCheck.concat(key)

    /**
     * if child key is object - get it recursively
     */
    if ((typeof objToCheck[key]) !== 'object') {
      return result.concat(key)
    }

    const childKeys = getKeys(childKey)

    return result.concat(childKeys)
  }, [])
}

const checkKeysUniqueness = () => {
  const allKeys = getKeys([])

  allKeys.forEach((key, index) => {
    const keysWithoutCurrent = remove(index, 1)(allKeys)

    /**
     * If current key stil exists in the list
     */
    if (keysWithoutCurrent.includes(key)) {
      throw new Error(`Key ${key} was found several times in en-US json files`)
    }
  })
}

module.exports = checkKeysUniqueness
