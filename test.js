
'use strict'

const tape = require( 'tape' )
const pkgAdd = require( './' )
const KeyExistsError = require( './errors' ).KeyExistsError

function getDefault() {
  return {
    foo: 'bar'
  }
}

tape( 'pkg-add should return a new object', t => {
  t.plan( 1 )
  var pkg = getDefault()
  var add = pkgAdd( pkg )
  add( 'baz', 'quux' )
  t.deepEqual( pkg, getDefault(), 'Supplied package has not been mutated' )
})

tape( 'pkg-add should accept a key value pair', t => {
  t.plan( 1 )
  var out = pkgAdd( getDefault() )( 'baz', 'quux' )
  t.deepEqual( out, {
    foo: 'bar',
    baz: 'quux'
  }, 'The key and its value have been added and returned' )
})

tape( 'pkg-add should accept an flat object', t => {
  t.plan( 1 )
  var out = pkgAdd( getDefault() )({
    baz: 'quux'
  })
  t.deepEqual( out, {
    foo: 'bar',
    baz: 'quux'
  }, 'The key and its value have been added and returned' )
})

tape( 'pkg-add should throw when the key already exists', t => {
  t.plan( 2 )
  t.throws( () => {
    pkgAdd( getDefault() )( 'foo', 'quux' )
  }, /KeyExistsError/, 'Trying to set a present key throws' )
  t.throws( ()=> {
    pkgAdd( getDefault() )({ foo: 'quux' })
  }, /KeyExistsError/, 'Trying to set a present key throws' )
})
