
# pkg-add

> Adds a key and value to the closest package.json

[![Build Status](https://travis-ci.org/mattstyles/pkg-add.svg?branch=composer)](https://travis-ci.org/mattstyles/pkg-add)
[![npm version](https://badge.fury.io/js/pkg-add.svg)](https://badge.fury.io/js/pkg-add)
[![Dependency Status](https://david-dm.org/mattstyles/pkg-add.svg)](https://david-dm.org/mattstyles/pkg-add)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

Install with [npm](https://npmjs.com)

```sh
$ npm i -g pkg-add
```

## Example

`pkg-add` is primarily a command line utility for one aspect of managing `package.json` files

```sh
$ echo '{"foo": "bar"}' | pkg-add
```

## Usage

`pkg-add` simply adds field into the closest `package.json` and will fail if the key already exists.

To use simply stream in a JSON object to merge with the package json.

#### `-f` `--force`

Use `-f` to force overwriting existing keys in the package json.

## Programmatic Usage

```sh
$ npm i -S pkg-add
```

The main `pkg-add` function needs an object which acts as a master, usually this is from the `package.json`, but, it needn’t be, any object will do. The object is treated as immutable, fresh objects will always be returned.

The only current option is whether to force merging over the master object, this defaults to false and will throw an error if keys exist on the master.

The main function returns another function which can be used to add properties. This add function simply merges the objects and returns a new one.

```js
const package = require('package.json')
const add = require('pkg-add')(pkg, {
  force: false  
})

console.log(add('foo', 'bar'))
// or
console.log(add({
  foo: 'bar'
}))
```

## Running tests

```sh
$ npm install
$ npm test
```

## Contributing

Pull requests are always welcome, please follow the [standard style](https://www.npmjs.com/package/standard) and ensure all tests are passing.

For bugs and feature requests, [please create an issue]( https://github.com/mattstyles/pkg-add/issues ).

## License

MIT
