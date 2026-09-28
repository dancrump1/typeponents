#!/bin/sh

source .env

npm install

npx next build

npx next start -p $PORT_RUNNER