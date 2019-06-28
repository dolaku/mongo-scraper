const express = require('express');
const PORT = process.env.PORT || 8080;
const api_routes = require('./routes/api_routes');
const html_routes = require('./routes/html_routes');

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

api_routes(app);
html_routes(app);

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// listen on port 8080
app.listen(PORT, () => console.log('Listening on http://localhost:' + PORT));