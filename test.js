'use strict'

var test = require('tape')
var parse = require('./')

test('google place parsing', function (t) {
  t.test('street address', function (t) {
    var data = require('./fixtures/pine.json')
    var results = parse(data)

    t.equal(results.length, 5, 'maps array')
    t.deepEqual(results[0], {
      street: '160 Pine Street',
      city: 'San Francisco',
      state: 'CA',
      id: 'ChIJxYgPJ2KAhYARsz1AuQ_x7gc',
      description: '160 Pine Street, San Francisco, CA, United States',
      title: null,
      business: false,
      zip: null
    }, 'maps properties')
    t.ok(results.every(function (result) {
      return result.state === 'CA'
    }), 'maps states')

    t.end()
  })

  t.test('businesses', function (t) {
    var data = require('./fixtures/plant.json')
    var results = parse(data)

    t.equal(results.length, 5, 'maps array')
    t.deepEqual(results[0], {
      business: true,
      title: 'The Plant Cafe Organic',
      description: 'The Plant Cafe Organic, California Street, San Francisco, CA, United States',
      street: 'California Street',
      city: 'San Francisco',
      state: 'CA',
      id: 'ChIJAf9gS2eAhYARMgTS-ADk4Jw',
      zip: null
    }, 'maps properties')

    t.ok(results.every(function (result) {
      return result.state === 'CA'
    }), 'maps states')

    t.end()
  })

  t.test('zips', function (t) {
    var data = require('./fixtures/zip.json')
    var results = parse(data)

    t.deepEqual(results[0], {
      business: false,
      title: null,
      street: null,
      description: 'San Francisco, CA 94107, United States',
      city: 'San Francisco',
      state: 'CA',
      id: 'ChIJg0__2jN-j4AR479OXNRG7O8',
      zip: '94107'
    }, 'maps properties')

    t.deepEqual(results[1], {
      business: false,
      title: null,
      street: null,
      description: 'CA 91335, United States',
      city: null,
      state: 'CA',
      id: 'ChIJB1UAYNabwoAR2m8Gk8aMGm0',
      zip: '91335'
    }, 'maps properties with alternate format')

    t.end()
  })

  t.test('cities', function (t) {
    var data = require('./fixtures/city.json')
    var results = parse(data)

    t.deepEqual(results[0], {
      business: false,
      title: null,
      street: null,
      description: 'San Francisco, CA, United States',
      city: 'San Francisco',
      state: 'CA',
      id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
      zip: null
    }, 'maps properties')

    t.end()
  })

  t.end()
})
