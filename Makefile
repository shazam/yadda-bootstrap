REPORTER=spec

all: test

test: npm
	./node_modules/mocha/bin/mocha runtests.js --timeout 60000 --reporter $(REPORTER)

npm: 
	npm install
