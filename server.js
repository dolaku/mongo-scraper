const express = require('express');
const PORT = 8080;
const api_routes = require('./routes/api_routes');

const app = express();

api_routes(app);

app.listen(PORT, () => console.log('Listening on port %s', PORT));