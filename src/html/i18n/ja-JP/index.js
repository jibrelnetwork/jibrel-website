const about = require('./about').about
const advisors = require('./advisors').advisors
const articles = require('./articles').articles
const faq = require('./faq').faq
const footer = require('./footer').footer
const header = require('./header').header
const meta = require('./meta').meta
const roadmap = require('./roadmap').roadmap
const start = require('./start').start
const team = require('./team').team
const whitepaper = require('./whitepaper').whitepaper

module.exports = {
  languageCode: 'ja-JP',
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
