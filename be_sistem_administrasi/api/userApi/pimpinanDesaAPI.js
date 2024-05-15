const {getKades,postKadesWakades,updateKadesByRole,deleteKadesById,SubmitSuratKades,getAllPimpinanDesa,getPimpinanDesaById} = require('../../controllers/adminController/kepalaDesaController');
const express = require('express');
const Router = express.Router();


Router.get('/get', getAllPimpinanDesa); // htt
Router.get('/get/:role', getKades); // http://localhost:3555/api/v1/pimpinanDesa/get/:role

Router.get('/get/kades/:id',getPimpinanDesaById) // http://localhost:3555/api/v1/pimpinanDesa/get/kades/:id

Router.post('/create', postKadesWakades);
Router.put('/update/:role', updateKadesByRole);
Router.delete('/delete/:id', deleteKadesById);

module.exports = Router;
