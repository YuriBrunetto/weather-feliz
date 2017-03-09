'use strict'

require('dotenv').load()
const request = require('request')
const table = require('table').table
const chalk = require('chalk')
const appid = process.env.APPID

module.exports = (city, countryCode) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&APPID=${appid}`

  request(url, (error, response, body) => {
    if (response && response.statusCode) {
      let parser = JSON.parse(body)
      let data = [
        ['City', 'Country Code', 'Temperature (min - max)', 'Humidity'],
        [parser.name, parser.sys.country, `${parser.main.temp_min}°C - ${parser.main.temp_max}°C`, parser.main.humidity]
      ]

      let output = table(data) + `Current mood: ${parser.weather[0].description}`
      console.log(`\n${chalk.green(output)}\n`)
    }
  })
}
