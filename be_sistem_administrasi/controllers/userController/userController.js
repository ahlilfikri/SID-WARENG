const db = require("../../models/index");
const userModel = db.user;
const crypto = require('crypto');//import crypto
require('dotenv').config();
const encrypt = require('../../middleware/encryptDecrypt');


exports.getPaginateUser = async (req,res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        console.log(`Received GET request to /api/v1/user/get with page: ${page}, limit: ${limit}`);

        const dataUser = await userModel.find()
            .limit(limit)
            .skip((page - 1) * limit);
            

        const dataTotal = await userModel.countDocuments();

        res.status(200).send({
            message: "Success get all user",
            data: dataUser,
            page: page,
            limit: limit,
            totalDocument: dataTotal
        });

    }catch(error){
        console.log('Error while handling GET request to /api/v1/user/get:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while get all user."
        });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        console.log(`Received GET request to /api/v1/user/get without pagination`);

        const dataUser = await userModel.find();

        const dataTotal = await userModel.countDocuments();

        res.status(200).send({
            message: "Success get all user",
            data: dataUser,
            totalDocument: dataTotal
        });

    } catch (error) {
        console.log('Error while handling GET request to /api/v1/user/get:', error);
        res.status(500).send({
            message: error.message || "Some error occurred while get all user."
        });
    }
}


exports.getUserById = async (req,res) => {
    try{
        const { id } = req.params;
        const dataUser = await userModel.findById(id);
        res.status(200).send({
            message: "Success get user by id",
            data: dataUser
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get user by id."
        });
    }
}

exports.getUserByIdDecrypt = async (req, res) => {
    try {
        const { id } = req.params;
        const aesKey = crypto.scryptSync(process.env.encrypt_key_one, process.env.encrypt_key_two, 32);
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        try {
            const decryptedNik = encrypt.dekripsi(user.nik, aesKey, user.iv);
            const decryptedAlamat = encrypt.dekripsi(user.alamat, aesKey, user.iv);
            const decryptedNohp = encrypt.dekripsi(user.nohp, aesKey, user.iv);
            res.status(200).send({
                message: "Success get user",
                data: {
                    name: user.name,
                    nik: decryptedNik,
                    alamat: decryptedAlamat,
                    nohp: decryptedNohp,
                    statusPerkawinan: user.statusPerkawinan,
                    domisili: user.domisili
                }
            });
        } catch (decryptionError) {
            res.status(500).send({ message: decryptionError.message });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while getting user." });
    }
};



exports.postUser = async (req, res) => {
    try {
        const { name, nik, alamat, nohp, statusPerkawinan, domisili } = req.body;
        
        const aesKey = crypto.scryptSync(
            process.env.encrypt_key_one, 
            process.env.encrypt_key_two,
            32
        );  
        const iv = crypto.randomBytes(16);

        const encryptedNik = encrypt.enkripsi(nik, aesKey, iv).encryptedData;
        const encryptedAlamat = encrypt.enkripsi(alamat, aesKey, iv).encryptedData;
        const encryptedNohp = encrypt.enkripsi(nohp, aesKey, iv).encryptedData;


        console.log("Encrypted NIK:", encryptedNik);
        console.log("Encrypted NoHP:", encryptedNohp);
        console.log("Encrypted Alamat:", encryptedAlamat);

        const newUser = await userModel.create({
            name: name.toUpperCase(),
            nik: encryptedNik,
            alamat: encryptedAlamat,
            nohp: encryptedNohp,
            statusPerkawinan: statusPerkawinan.toUpperCase(),
            domisili: domisili.map((dom) => dom.toUpperCase()),
            iv: iv.toString('hex')
        });

        res.status(200).send({
            message: "Success create user",
            data: newUser
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating user."
        });
    }
};


exports.postManyUser = async (req,res) => {
    try{
        const { data } = req.body;
        const newUser = await userModel.insertMany(data);
        res.status(200).send({
            message: "Success create user",
            data: newUser
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while creating warga."
        });
    }
}


// untuk melengkapi data user
exports.updateuserById = async (req,res) => {
    try{
        const id = req.params.id;
        const updateData = req.body;
        // data
        if (updateData.name) updateData.name = updateData.name.toUpperCase();
        if (updateData.alamat) updateData.alamat = updateData.alamat.toUpperCase();
        if (updateData.statusPerkawinan) updateData.statusPerkawinan = updateData.statusPerkawinan.toUpperCase();
        if (updateData.tempatlahir) updateData.tempatlahir = updateData.tempatlahir.toUpperCase();
        if (updateData.tanggallahir) updateData.tanggallahir = updateData.tanggallahir.toUpperCase();
        if (updateData.agama) updateData.agama = updateData.agama.toUpperCase();
        if (updateData.jenisKelamin) updateData.jenisKelamin = updateData.jenisKelamin.toUpperCase();
        if (updateData.pekerjaan) updateData.pekerjaan = updateData.pekerjaan.toUpperCase();
        if (updateData.domisili) updateData.domisili = updateData.domisili.map((domisili) => domisili.toUpperCase());

        const dataUdatedValid = {
            name: updateData.name,
            nik: updateData.nik,
            alamat: updateData.alamat,
            statusPerkawinan: updateData.statusPerkawinan,
            tempatlahir: updateData.tempatlahir,
            tanggallahir: updateData.tanggallahir,
            agama: updateData.agama,
            pekerjaan: updateData.pekerjaan,
            domisili: updateData.domisili
        };
        const user = await userModel.findByIdAndUpdate(id,dataUdatedValid,{new: true});
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success update user by id",
            data: user
        });
    }catch(error){ 
        res.status(500).send({
            message: error.message || "Some error occurred while update user by id."
        });
    }   
};


// use by admin
exports.deleteUserById = async (req,res) => {
    const id = req.params.id;
    try{
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({
                message: "user not found with id " + id
            });
        }

        res.status(200).send({
            message: "Success delete user by id",
            data: user

        });
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete user by id."
        });
    }
}


module.exports = exports;
