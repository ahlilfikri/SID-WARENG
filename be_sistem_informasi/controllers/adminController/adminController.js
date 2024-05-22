const db = require('../../models');
const response = require('../../res/response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.getadminByid = async (req, res) => {
    try{
        const admin = await db.admin.find();
        if(!admin) return response(404, res, 'error', 'admin not found');
        response(200, res, admin, 'Success get admin');

    }catch(err){
        response(500, res, 'error', err.message || 'Some error occurred while get admin.');
    }
};


exports.postadmin = async (req, res) => {
    try{
        const {name, nik, nohp, userName, password} = req.body;
        const countadmin = await db.admin.countDocuments();
        if(countadmin >= 2){
            return response(400, res, 'error', 'admin already full');
        }
        const newadmin = new db.admin({
            name : name.toUpperCase(),
            nik,
            nohp,
            password
        });
        await newadmin.save();
        return response(200, res, newadmin, 'Success post admin');
    }catch(err){
        response(500, res, 'error', err.message || 'Some error occurred while post admin.');
    }
}



exports.LoginAdmin = async (req,res) => {
    const {name,password} = req.body;
    try{
        const dataNama = name.toUpperCase();
        const dataAdmin = await db.admin.findOne({name: dataNama});
        if (!dataAdmin) {
            throw new Error('user not found with name :  ' + name);
        }
        const comparePassword = bcrypt.compare(password, dataAdmin.password);
        if (!comparePassword) {
            return res.status(400).send({
                message: "Invalid Password!"
            });
        }
        const token = jwt.sign({id: dataAdmin._id}, process.env.LOGIN_TOKEN, {expiresIn: '1d'});
        dataAdmin.token = token;
        await dataAdmin.save();
        res.status(200).send({
            status: 'success',
            message: "Success login warga",
            data: dataAdmin
        });
    }catch(error){
        console.log('Error:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while login warga."
        });
    }
};


exports.logOutAdmin = async (req, res) => {
    try{
        const {id} = req.params;
        const dataAdmin = await db.admin.findById(id);
        if (!dataAdmin) {
            return res.status(404).send({
                message: "admin not found"
            });
        }
        dataAdmin.token = '';
        await dataAdmin.save();

        res.status(200).send({
            status: 'success',
            message: "Success logout"
        });

    }catch(error){
        console.log('Error:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while logout."
        });
    }
}
