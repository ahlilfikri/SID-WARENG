const {
    getadminByid,
    postadmin
} = require('../../controllers/adminController/adminController');

const express = require('express');

const Router = express.Router();

Router.get('/get-admin', getadminByid);
Router.post('/post-admin', postadmin);


//note :
//get admin = http://localhost:3556//api/v1/admin/get-admin
//post admin = http://localhost:3556/api/v1/admin/post-admin

module.exports = Router;
