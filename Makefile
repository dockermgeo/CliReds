PWD="$(shell pwd)"
SRC_DIR="$(PWD)/src"
OS = "$(shell uname -s)"

build: prepare
	mkdir -p  ${PWD}/builds
	$(shell cd ${SRC_DIR})
	pkg ./clireds.js
	mv clireds-* ${PWD}/builds
	mv ${PWD}/builds/clireds-macos ${SRC_DIR}/builds/clireds-Darwin
	mv ${PWD}/builds/clireds-linux ${SRC_DIR}/builds/clireds-Linux
	mv ${PWD}/builds/clireds-win.exe ${SRC_DIR}/builds/clireds-Windows.exe

install: build
	@echo "cp ${PWD}/builds/clireds-${OS}* /usr/local/bin/clireds"
	cp -f ${PWD}/builds/clireds-${OS}* /usr/local/bin/clireds
	make cleanup

cleanup:
	cd /
	rm -Rf ${PWD}

prepare:
	@echo "cd ${SRC_DIR}"
	ls -la ${SRC_DIR}
	$(shell cd ${SRC_DIR} && npm install)
	npm install -g pkg
