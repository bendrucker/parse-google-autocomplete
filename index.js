'use strict'

var Obstruct = require('obstruction')
var pipe = require('value-pipe')
var get = require('value-get')
var find = require('array-find')
var findIndex = require('array-find-index')

module.exports = pipe(Extract(), Transform())

function Extract () {
  return Obstruct.array({
    id: 'place_id',
    description: true,
    business: ['types.0', isBusiness],
    zip: ['types.0', isZip],
    city: ['types.0', isCity],
    terms: Obstruct.array(get('value'))
  })
}

function Transform () {
  return Obstruct.array({
    id: true,
    business: true,
    title: Obstruct.parent(title),
    description: true,
    street: Obstruct.parent(street),
    city: Obstruct.parent(city),
    state: Obstruct.parent(state),
    zip: Obstruct.parent(zip)
  })
}

function isBusiness (type) {
  return type === 'establishment'
}

function isZip (type) {
  return type === 'postal_code'
}

function isCity (type) {
  return type === 'locality'
}

function title (place) {
  return place.business ? place.terms[0] : null
}

function street (place) {
  if (!isLocation(place)) return null
  return place.terms.slice(place.business ? 1 : 0, cityIndex(place)).join(' ')
}

function city (place) {
  return place.zip && place.terms[0].toUpperCase() === place.terms[0]
    ? null
    : place.terms[cityIndex(place)]
}

function state (place) {
  return place.zip
    ? place.terms[findIndex(place.terms, numeric) - 1]
    : place.terms[cityIndex(place) + 1]
}

function zip (place) {
  return place.zip ? find(place.terms, numeric) : null
}

function cityIndex (place) {
  if (!isLocation(place)) return 0
  return /^\d+$/.test(place.terms[0]) ? 2 : 1 + Number(place.business)
}

function isLocation (place) {
  return !place.zip && !place.city
}

function numeric (term) {
  return /^\d+$/.test(term)
}
