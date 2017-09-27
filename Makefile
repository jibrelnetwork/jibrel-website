GIT = /usr/bin/git
NPM = /usr/bin/npm

GIT-REPOSITORY-BRANCH = master

WHITE-PAPER-PATH = ../white_paper

white-paper-git-pull:
	cd $(WHITE-PAPER-PATH) && $(GIT) pull origin $(GIT-REPOSITORY-BRANCH)

git-pull: white-paper-git-pull
	$(GIT) pull origin $(GIT-REPOSITORY-BRANCH)
	$(NPM) install
	$(NPM) run build:prod
