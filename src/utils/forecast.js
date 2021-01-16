const request = require("request")

const forecast= (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=e4ba72d64ce1d3006816a26bbe75cb78&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    }
    else if (response.body.error) {
      callback('Unable able to find location', undefined);
    }
    else {
      callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.');
    }
  })
}



module.exports = forecast

// const request = require('request');

// const forecast = (latitude, longitude, callback) => {
//   const url = 'http://api.weatherstack.com/current?access_key=69ce258c6931d95372cff1c3d41bdca6&query=' + latitude + ',' + longitude + '&units=f';

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback('Unable to connect to weather service!', undefined);
//     }
//     else if (response.body.error) {
//       callback('Unable able to find location', undefined);
//     }
//     else {
//       callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.');
//     }
//   })
// }

// module.exports = forecast;
