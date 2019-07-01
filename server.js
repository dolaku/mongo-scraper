const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const api_routes = require('./routes/api_routes');
const html_routes = require('./routes/html_routes');

const app = express();


// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/unit18Populater', { useNewUrlParser: true });

// Routes
api_routes(app);
html_routes(app);

// Set Handlebars.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// listen on port 8080
app.listen(PORT, () => console.log('Listening on http://localhost:' + PORT));