// PACKAGES
const express = require('express');

// ROUTER

// ENDPOINT
const Router = express.Router();
Router.get('/', (req, res) => {
    res.send('API is running.....');
});

const visiMisiApi = require('./informasiApi/visiMisiApi');
Router.use('/visi-misi', visiMisiApi);


module.exports = Router;



//http://localhost:3555/ 
