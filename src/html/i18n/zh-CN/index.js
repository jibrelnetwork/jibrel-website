const about = require('./about')
const advisors = require('./advisors')
const articles = require('./articles')
const faq = require('./faq')
const footer = require('./footer')
const header = require('./header')
const meta = require('./meta')
const roadmap = require('./roadmap')
const start = require('./start')
const team = require('./team')
const whitepaper = require('./whitepaper')

module.exports = {
  languageCode: 'zh-CN',
  about: about,
  advisors: advisors,
  articles: articles,
  faq: faq,
  footer: footer,
  header: header,
  meta: meta,
  roadmap: roadmap,
  start: start,
  team: team,
  whitepaper: whitepaper,
  timestamp: Date.now(),
}
