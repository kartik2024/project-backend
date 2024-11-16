const express = require('express');
const db = require('./config/db');
const routes = require('./routes/auth');
const cors = require('cors');
const app = express();
db();

app.use(cors());

app.use(express.json());

app.use('/auth', routes);


app.listen(3000);