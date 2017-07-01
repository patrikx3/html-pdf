#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT=$DIR/../..
BIN=$ROOT/release/wkhtmltox/bin/wkhtmltopdf
BUILD=$ROOT/build
FIXTURES=$ROOT/test/fixtures
BUILD_PDF=$BUILD/pdf
mkdir -p $BUILD_PDF

export ROOT
export BIN
export BUILD
export FIXTURES
export BUILD_PDF