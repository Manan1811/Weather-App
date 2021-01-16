const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require("request")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Defining Paths for Express
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=> {
  res.render('index',{
    title:'Weather',
    name: 'Manan Agrawal'
  })
})

// Rendering HTML
app.get('/about', (req, res) => {
  res.render('about',{
    title:'About Me',
    name: 'Manan Agrawal'
  })
})

// Rendering JSON
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location }={}) => {
    if (error !=="No error") {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ hello: 'hello' })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
  // res.send({
  //   title: 'Weather',
  //   location: 'Gurgaon, Haryana',
  //   forcecast: 'Winters',
  //   address: req.query.address
  // })
})

app.get('/products', (req, res) => {
  if (!req.query.search){
    return res.send({
      error: "Search Something"
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMsg: 'No page found with this link',
    name: 'Manan Agrawal'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})