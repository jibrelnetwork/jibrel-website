const meta = require('../meta')

const about = require('./about').about
const advisors = require('./advisors').advisors
const articles = require('./articles').articles
const faq = require('./faq').faq
const footer = require('./footer').footer
const header = require('./header').header
const roadmap = require('./roadmap').roadmap
const start = require('./start').start
const team = require('./team').team
const whitepaper = require('./whitepaper').whitepaper

module.exports = {
  languageCode: 'ja-JP',
  meta: meta,
  about: about,
  advisors: advisors,
  articles: articles,
  faq: faq,
  footer: footer,
  header: header,
  roadmap: roadmap,
  start: start,
  team: team,
  whitepaper: whitepaper,
  timestamp: Date.now(),
}
