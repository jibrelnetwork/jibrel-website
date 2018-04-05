/**
 * Check that all keys presented in main i18n .json file are present in others
 */

const { path } = require('ramda')

const i18n = require('..')

const mainLang = i18n['en-US']
const allLangNames = Object.keys(i18n)

const checkKeyExist = (lang, key) => {
  const langValue = path(key)(i18n[lang])

  if (langValue == null) {
    throw new Error(`'${key.join('.')}' does not exist in '${lang}' language file`)
  }

  const mainLangValue = path(key)(mainLang)

  if ((typeof mainLangValue) === 'object') {
    if (typeof langValue !== 'object') {
      throw new Error(`Value by key '${key.join('.')}' is not object`)
    }

    Object.keys(mainLangValue).forEach(childKey => checkKeyExist(lang, key.concat(childKey)))
  }
}

const checkTranslations = () => {
  allLangNames.forEach(lang => {
    Object.keys(mainLang).forEach(key => checkKeyExist(lang, [key]))
  })
}

module.exports = checkTranslations
