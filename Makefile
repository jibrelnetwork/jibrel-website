GIT = /usr/bin/git
NPM = /usr/bin/npm

GIT-REPOSITORY-BRANCH = master

git-pull:
	$(GIT) pull origin $(GIT-REPOSITORY-BRANCH)
	$(NPM) install
	$(NPM) run build:prod
