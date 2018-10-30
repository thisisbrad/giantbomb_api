const express = require('express');
const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');
const axios = require('axios');

/* Logic to start the application */

const app = express();
app.use(cors()); // enables CORS for all routes

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

const API_URL =
  'https://www.giantbomb.com/api/search/?api_key=f41a22bcc19858b1a3b86fcd2f063e27da597091&format=json&query=%22metroid%20prime%22&resources=game';

app.use(json()); // grabs request body
app.use(morgan('dev')); // logs HTTP request

app.get('/', (req, res) => {
  res.json({ howdy: 'Partner!' });
});

app.get('/api', (req, res) => {
  axios
    .get(API_URL)
    .then(function(response) {
      // handle success
      res.json({ results: response.data.results });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Not Found (${req.url})`);
  err.status = 404;
  next(err);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`### Server is listening on PORT: ${server.address().port} ###`);
});
