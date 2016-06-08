
'use strict'

const createError = require( 'errno' ).create

const KeyExistsError = createError( 'NotFoundError' )
NotFoundError.prototype.code = 'KEY_EXISTS'

module.exports = {
  KeyExistsError
}
