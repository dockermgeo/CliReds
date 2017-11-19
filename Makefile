SRC_DIR="$(shell pwd)/src"
OS = "$(shell uname -s)"

build: prepare
	mkdir -p  ${SRC_DIR}/builds
	pkg ${SRC_DIR}/clireds.js
	mv clireds-* ${SRC_DIR}/builds/
	mv ${SRC_DIR}/builds/clireds-macos ${SRC_DIR}/builds/clireds-Darwin
	mv ${SRC_DIR}/builds/clireds-linux ${SRC_DIR}/builds/clireds-Linux
	mv ${SRC_DIR}/builds/clireds-win.exe ${SRC_DIR}/builds/clireds-Windows.exe
	mv ${SRC_DIR}/builds .

install: build
	cp builds/clireds-${OS}* /usr/local/bin/clireds
	make cleanup

cleanup:
	rm -Rf builds

prepare:
	npm install -g pkg
	cd ${SRC_DIR}
	npm install
