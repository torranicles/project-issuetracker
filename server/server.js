'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes')
const connection = require('./connection')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

connection.once('open', () => {
    console.log('connected')
    routes(app)
    app.listen(5000, () => {
        console.log('Listening to port 5000')
    })
}) 