const {getInformasi,postInformasi,getInformasiById,putInformasi,deleteInformasi}=
require('../../controllers/informasiController/informasiController');
const express = require('express');
const Router = express.Router();

Router.get('/get-Informasi',getInformasi);
Router.post('/post-Informasi',postInformasi);
Router.get('/get-Informasi/:id',getInformasiById);
Router.put('/update-Informasi/:id',putInformasi);
Router.delete('/delete-Informasi/:id',deleteInformasi);

module.exports = Router;
