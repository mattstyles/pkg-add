
'use strict'

const KeyExistsError = require( './errors' ).KeyExistsError

module.exports = function setPackage( pkg ) {
  if ( !pkg ) {
    throw new Error( 'No package.json supplied' )
  }

  return function add( key, value ) {
    if ( pkg[ key ] ) {
      throw new Error( KeyExistsError( `${ key } exists in package` ) )
    }

    return Object.assign( {}, pkg, {
      [ key ]: value
    })
  }
}
