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
  languageCode: 'en-US',
  about: about.about,
  advisors: advisors.advisors,
  articles: articles.articles,
  faq: faq.faq,
  footer: footer.footer,
  header: header.header,
  meta: meta.meta,
  roadmap: roadmap.roadmap,
  start: start.start,
  team: team.team,
  whitepaper: whitepaper.whitepaper,
  timestamp: Date.now(),
}
