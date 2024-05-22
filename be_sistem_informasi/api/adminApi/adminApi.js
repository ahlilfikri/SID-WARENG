const {
    getadminByid,
    postadmin,
    LoginAdmin,
    logOutAdmin
} = require('../../controllers/adminController/adminController');

const express = require('express');

const Router = express.Router();

Router.get('/get-admin', getadminByid);
Router.post('/post-admin', postadmin);
Router.post('/login-admin', LoginAdmin);
Router.post('/logout-admin', logOutAdmin);



//note :
//get admin = http://localhost:3556//api/v1/admin/get-admin
//post admin = http://localhost:3556/api/v1/admin/post-admin
//login admin = http://localhost:3556/api/v1/admin/login-admin

module.exports = Router;
