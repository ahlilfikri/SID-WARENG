const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());

// env
require('dotenv').config();

app.use('/upload',express.static('upload')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
const api = require('./api/index');
app.use('/api/v1', api); 
mongoose.set('debug', true);

// connect to mongodb
mongoose.connect(process.env.DATABASE);

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Kesalahan koneksi MongoDB BE ASPIRASI:', err);
});

db.once('open', () => {
  console.log('BE ASPIRASI Terkoneksi ke Database ....',);
});


// use static file
app.use('/assets', express.static('assets'));

module.exports = app;


// mongoose.connect('mongodb+srv://nugas123man:innovilage2023@innovilage.1w1i92x.mongodb.net/?retryWrites=true&w=majority').then(async () => {
//     console.log('Database connected successfully');
//     try {
//         const getWargaUrl = await axios.get('http://localhost:3555/api/v1/warga/get');
//         console.log('Data warga:', getWargaUrl.data);
       
//     } catch (error) {
//         console.log('Error finding user:', error);
//     } finally {
//         console.log('database connection');
//     }
// }).catch((error) => {
//     console.log('Error connecting to database:', error);
// });
