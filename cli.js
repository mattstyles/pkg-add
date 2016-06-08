#!/usr/bin/env node

'use strict'

/**
 * @example
 *   echo '{"foo": "bar"}' | pkg-add > package.json
 *   pkg-add < /etc/config.json
 */

const argv = require('minimist')(process.argv.slice(2), {
  alias: {f: 'force'}
})
const pkg = require('find-package')(process.cwd())
const concat = require('concat-stream')
const pkgAdd = require('./')

if (!pkg) {
  console.error('Can not find package.json from this directory')
  process.exit(0)
}

process.stdin
  .pipe(concat(merge))

function merge (buf) {
  let data = null
  try {
    data = JSON.parse(buf.toString())
  } catch (err) {
    throw new Error(err)
  }

  let add = pkgAdd(pkg, {
    force: argv.f
  })
  let out = null
  try {
    out = add(data)
  } catch (err) {
    if (err.code === 'KEY_EXISTS') {
      if (argv.f) {
        final(out)
        return
      }

      let msg = /,/.test(err.message)
        ? 'Several keys exist in the package:'
        : 'A key exists in the package:'

      console.log(msg, err.message)
      console.log('Use -f to overwrite')
      return
    }

    throw new Error(err)
  }

  final(out)
}

function final (output) {
  process.stdout.write(JSON.stringify(output))
}
