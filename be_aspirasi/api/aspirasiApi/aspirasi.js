const {postAspirasi,getAspirasi,getAspirasiById,deleteAspirasi,getAspirasiKades}=require('../../controllers/aspirasiController/aspirasiController');
const express = require('express');
const Router = express.Router();

Router.post('/postAspirasi/:wargaId', postAspirasi);
Router.get('/getAspirasi/my/:id', getAspirasi); //http://localhost:3557/api/v1/aspirasi/getAspirasi/my/:id
Router.get('/getAspirasi/:id', getAspirasiById);
Router.delete('/deleteAspirasi/:aspirasiId', deleteAspirasi);


Router.get('/getAspirasiKades', getAspirasiKades);
module.exports = Router


//note endpoint aspirasi
//postAspirasi : http://localhost:3557/api/v1/aspirasi/postAspirasi/:wargaId
//getAspirasi : http://localhost:3557/api/v1/aspirasi/getAspirasi
//getAspirasiById : http://localhost:3557/api/v1/aspirasi/getAspirasi/:id
//deleteAspirasi : http://localhost:3557/api/v1/aspirasi/deleteAspirasi/:aspirasiId
//getAspirasiKades : http://localhost:3557/api/v1/aspirasi/getAspirasiKades
