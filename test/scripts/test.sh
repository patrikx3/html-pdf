#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source $DIR/vars.sh

rm $BUILD_PDF/test.pdf || true
$BIN $FIXTURES/test.html $BUILD_PDF/test.pdf