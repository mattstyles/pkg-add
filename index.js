
'use strict'

const util = require( 'util' )
const KeyExistsError = require( './errors' ).KeyExistsError

module.exports = function setPackage( pkg ) {
  if ( !pkg ) {
    throw new Error( 'No package.json supplied' )
  }

  return function add( key, value ) {
    if ( util.isObject( key ) ) {
      return merge( pkg, key )
    }

    if ( pkg[ key ] ) {
      throw new Error( new KeyExistsError( `${ key } exists in package` ) )
    }

    return merge( pkg, {
      [ key ]: value
    })
  }
}


function merge( a, b ) {
  let output = Object.assign( {}, a )
  Object.keys( b ).forEach( key => {
    if ( output[ key ] ) {
      throw new Error( new KeyExistsError( 'Key exists in merge' ) )
    }

    output[ key ] = b[ key ]
  })

  return output
}
