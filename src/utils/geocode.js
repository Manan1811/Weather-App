const request = require("request")

const geocode = (address, callback) => {
  const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFuYW5hZ3Jhd2FsOSIsImEiOiJja2o3aGwwb2YwbmF1MnhwNXVnMGh4bW16In0.iURcsBkF3MYa__Lb2JcKWw&limit=1'
  request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
      callback('Low Level Error', 'No data')
    }
    else if (response.body.features.length === 0) {
      callback('Unable to find location', 'No data')
    }
    else {
      callback('No error', {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports=geocode