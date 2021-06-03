'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const connection = require('./connection');
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.resolve(__dirname + '/.././build')));
connection.once('open', () => {
    console.log('connected');
    routes(app);
    app.get("/*", function (req, res) {
        res.sendFile(path.resolve(__dirname + '/.././build/index.html'));
    });
    const PORT = process.env.PORT || 5000;
    app.listen(5000, () => {
        console.log(`Listening to port ${process.env.PORT}`)
    })
});