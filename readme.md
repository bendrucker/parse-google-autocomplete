# parse-google-autocomplete [![Build Status](https://travis-ci.org/bendrucker/parse-google-autocomplete.svg?branch=master)](https://travis-ci.org/bendrucker/parse-google-autocomplete)

> Parse Google Maps autocomplete results into structured address data

Works with most commonly typed US addresses. The results aren't always perfect—open a PR with new test fixtures if you find an unhandled case.

## Install

```
$ npm install --save parse-google-autocomplete
```


## Usage

```js
var parse = require('parse-google-autocomplete')

parse([
  {
    description: '1 Market Street, San Francisco, CA, United States',
    // ...
  },
  // ...
])
//=> {id: 'abc', business: true, ...}
```

## API

#### `parse(data)` -> `array`

##### data

*Required*  
Type: `array[object]`

An array of Google place results objects. See the [test fixtures for examples](fixtures).

The data is parsed into the following values, where empty values will be `null`:

###### id

Type: `string`

The unique Google place ID.

###### business

Type: `boolean`

Indicates whether the result is a business based on the presence of the "establishment" primary result type.

###### title

Type: `string`

The name of the business, if applicable.

###### street / city / state / zip

Type: `string`

The parsed address data derived from the `terms` matched by Google.

## License

MIT © [Ben Drucker](http://bendrucker.me)
