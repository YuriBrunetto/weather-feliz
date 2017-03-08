#!/usr/bin/env node
'use strict'

const weather = require('./../weather')
const cli = require('meow')({
  pkg: './../package.json',
})

const city = cli.input[0]
const countryCode = cli.input[1]

const output = weather(city, countryCode)
