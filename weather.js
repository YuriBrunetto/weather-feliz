'use strict'

const request = require('request')
const table = require('table').table
const appid = 'ce747f5c51cefcfbf0ddf7a5d61c7d24'

module.exports = (city, countryCode) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&APPID=${appid}`

  request(url, (error, response, body) => {
    if (response && response.statusCode) {
      let parser = JSON.parse(body)
      let data = [
        ['City', 'Country Code', 'Temperature (min - max)', 'Humidity'],
        [parser.name, parser.sys.country, `${parser.main.temp_min}°C - ${parser.main.temp_max}°C`, parser.main.humidity],
      ]

      let output = table(data) + `${parser.name}: ${parser.weather[0].description}`
      console.log(output)
    }
  })
}
