
'use strict'

const util = require('util')
const KeyExistsError = require('./errors').KeyExistsError

module.exports = function setPackage (pkg, opts) {
  opts = opts || {}

  if (!pkg) {
    throw new Error('No package.json supplied')
  }

  return function add (key, value) {
    let val = util.isObject(key)
      ? key
      : {[key]: value}

    let output = merge(pkg, val, opts.force)

    if (util.isArray(output)) {
      throw new KeyExistsError(output.join(','))
    }

    return output
  }
}

function merge (a, b, force) {
  let overlap = []
  let output = Object.assign({}, a)
  Object.keys(b).forEach(key => {
    if (output[key]) {
      overlap.push(key)
    }

    output[key] = b[key]
  })

  if (force) {
    return output
  }

  return overlap.length ? overlap : output
}
