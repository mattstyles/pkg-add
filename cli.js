#!/usr/bin/env node

'use strict'

/**
 * @example
 *   echo '{"foo": "bar"}' | pkg-add > package.json
 *   pkg-add < /etc/config.json
 */

const argv = require( 'minimist' )( process.argv.slice( 2 ) )
const find = require( 'find-package-json' )
const concat = require( 'concat-stream' )
const pkgAdd = require( './' )

const pkg = find( process.cwd() ).next().value

if ( !pkg ) {
  console.error( 'Can not find package.json from this directory' )
  process.exit( 0 )
}


process.stdin
  .pipe( concat( onEnd ) )

function onEnd( data ) {

}
