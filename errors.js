
'use strict'

const createError = require( 'errno' ).create

const KeyExistsError = createError( 'KeyExistsError' )
KeyExistsError.prototype.code = 'KEY_EXISTS'

module.exports = {
  KeyExistsError
}
