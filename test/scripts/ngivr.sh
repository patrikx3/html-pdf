#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source $DIR/vars.sh

rm $BUILD_PDF/ngivr.pdf || true
$BIN --title NGIVR --orientation Landscape --page-size A4 $FIXTURES/ngivr.html --header-html $FIXTURES/header.html --footer-html $FIXTURES/footer.html $BUILD_PDF/ngivr.pdf