SRC_DIR="$(shell pwd)/src"
OS = "$(shell uname -s)"

build: prepare
	mkdir -p  ${SRC_DIR}/builds
	pkg ${SRC_DIR}/clireds.js
	mv clireds-* ${SRC_DIR}/builds/
	mv ${SRC_DIR}/builds/clireds-macos ${SRC_DIR}/builds/clireds-Darwin
	mv ${SRC_DIR}/builds/clireds-linux ${SRC_DIR}/builds/clireds-Linux
	mv ${SRC_DIR}/builds/clireds-win.exe ${SRC_DIR}/builds/clireds-Windows.exe

install: build
	cp ${SRC_DIR}/builds/clireds-${OS}* /usr/local/bin/clireds
	make cleanup

cleanup:
	rm -Rf ${SRC_DIR}/builds

prepare:
	npm install -g pkg
	cd src
	npm install
