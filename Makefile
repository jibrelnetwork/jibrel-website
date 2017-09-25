ECHO = /bin/echo
GIT = /usr/bin/git

GIT-REPOSITORY-BRANCH = master

git-pull:
	$(ECHO) "Pulling master branch"
	$(GIT) pull origin $(GIT-REPOSITORY-BRANCH)
