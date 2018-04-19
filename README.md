# jibrel-website

## Development

* `npm run build` - build public html & assets
* `./node_modules/.bin/gulp watch` - watch for HTML/CSS/JS changes
* `npm start` - start dev server (`localhost:3000`)

[There is demo](https://jibrel-website.herokuapp.com/) on heroku instance, that hooks on push to `dev` branch.

## Production

* `npm i`
* `npm run build:prod` - build public html and minified assets
* share static from `./public` dir

## Whitepaper

PDFs with whitepaper are located in [another repository](https://github.com/jibrelnetwork/white_paper).

To access these files on the website it is necessary to place this (website) repository and repository with whitepapers in the same dir.

To make sure that PDFs are actual on the website, need to make `git pull` from `../white_paper` dir each time whitepaper files were changed.

## Makefile

Currently git-webhook server is able to launch two `make` targets:

* `white-paper-git-pull` - git pull from whitepaper repository
* `git-pull`(depends on the first target) - git pull from website repository (+ `npm install`, if npm modules are changed).
