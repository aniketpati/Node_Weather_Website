const request = require('request');

const geoCode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +
  ".json?types=poi&access_token=pk.eyJ1IjoiYW5pa2V0c2FpIiwiYSI6ImNsOTVjaWRjdzAwajAzd204Yjd1d3kyMjYifQ.d00zj2NREAnWoVSGsXdwUg&limit=1";
  // console.log(url);
  request({ url , json: true }, (error, { body })=>{
    if(error){
      callback('Unable to connect to Location services!!', undefined);
    }
    else if(body.features.length === 0){
      callback('Unable to find location. Try different search', undefined);
    }
    else{
      callback(undefined, {
        latitute: body.features[0].center[1],
        longitute: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode;
