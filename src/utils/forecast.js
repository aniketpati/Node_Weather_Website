const request = require('request');

const forecast = (longitute, latitute, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=7217030ef3e3c9a95be33786cc5609f0&query=" + longitute + "," + latitute + "&units=m";



  request({ url, json: true}, (error, { body }) => {
    if(error){
      callback("Unable to connect to weather services!!", undefined);
    }
    else if(body.error){
      callback("Unable to find location", undefined);
    }
    else{
      callback(undefined, body.current.weather_descriptions[0] +
      ". It is currently " + body.current.temperature +
      " degree out. It feels like " + body.current.feelslike +
      " degree out.");
    }
  })
}

module.exports = forecast;
