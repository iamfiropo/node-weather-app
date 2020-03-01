const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

/**
 * Setup handlebars engine and views location
 */
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ropo Olatujoye'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Ropo Olatujoye'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'some help',
    title: 'Help',
    name: 'Ropo Olatujoye'
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if(!address) return res.send({ error: 'You must provide an address'})
  
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error })

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error })

      res.send({
        forecast: forecastData,
        location,
        address: address,
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) return res.send({
    error: 'You must provide a search term'
  })
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ropo Olatujoye',
    errorMessage: 'Help article not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ropo Olatujoye',
    errorMessage: 'My 404 page',
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})