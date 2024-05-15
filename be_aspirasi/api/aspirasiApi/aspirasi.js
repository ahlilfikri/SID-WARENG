const {postAspirasi,getAspirasi,getAspirasiById,deleteAspirasi}=require('../../controllers/aspirasiController/aspirasiController');
const express = require('express');
const Router = express.Router();

Router.post('/postAspirasi/:wargaId', postAspirasi);
Router.get('/getAspirasi', getAspirasi);
Router.get('/getAspirasi/:id', getAspirasiById);
Router.delete('/deleteAspirasi/:aspirasiId', deleteAspirasi);

module.exports = Router


//note endpoint aspirasi
//postAspirasi : http://localhost:3557/api/v1/aspirasi/postAspirasi/:wargaId
//getAspirasi : http://localhost:3557/api/v1/aspirasi/getAspirasi
//getAspirasiById : http://localhost:3557/api/v1/aspirasi/getAspirasi/:id
//deleteAspirasi : http://localhost:3557/api/v1/aspirasi/deleteAspirasi/:aspirasiId
