const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup hbs and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Aniket"
  });
});

app.get('/about', (req, res) => {
  res.render('about',  {
    title: "About Me",
    name: "Aniket"
  });
});

app.get('/help', (req, res) => {
  res.render('help',  {
    title: "Help Page",
    helpText: "This is help page",
    name: "Aniket"
  });
});

app.get('/help/*', (req, res)=>{
  res.render('404', {
    title: "Error page!!",
    name: "Aniket",
    errorMessage: "Help page not available"
  });
});


app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "Place address"
    })
  }
  geoCode(req.query.address, (error, { latitute, longitute, location} = {}) => {
    if(error){
      return res.send({ error });
    }

    forecast(latitute, longitute, (error, forecastData)=>{
      if(error){
        return res.send({ error });
      }
      res.send({
        forecast : forecastData,
        location,
        address: req.query.address
      });
    })
  })
  // res.send({
  //   forecast: "It is raining!",
  //   address: req.query.address
  // });
});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: "Provide search"
    })
  }
  res.send({
    products: []
  })
})




app.get('*', (req, res) => {
    res.render('404', {
      title: "Error page!!",
      name: "Aniket",
      errorMessage: "Page not found"
  });
});



app.listen(3000, ()=> {
  console.log('Server is running at port 3000');
});
