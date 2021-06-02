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
}));
const path = require("path");
app.use(express.static(path.resolve(__dirname, '/.././build')));
const PORT = process.env.PORT;
connection.once('open', () => {
    console.log('connected')
    app.get("/*", function (req, res) {
        res.sendFile(path.resolve(__dirname, '/.././build/index.html'));
    });
    routes(app)
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`)
    })
}) 