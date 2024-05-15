const db = require('../../models');
const axios = require('axios');

require('dotenv').config();
const response = require('../../res/response');
const { env } = require('process');



exports.postAspirasi = async (req, res) => {
    try {
        const { aspirasi, isPublish } = req.body;
        const { wargaId } = req.params;

        const newAspirasi = await db.aspirasi.create({
            wargaId: wargaId,
            aspirasi: aspirasi,
            validator: process.env.VALIDATOR_ID,
            isPublish: isPublish
        });

        console.log('newAspirasi:', newAspirasi);

        res.send({
            message: "Aspirasi berhasil dibuat",
            data: newAspirasi
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while posting aspirasi."
        });
    }
};

exports.putAspirasi = async (req, res) => {
    try {
        const { aspirasiId } = req.params;
        const { update} = req.body;

        const dataAspirasi = await db.aspirasi.findByIdAndUpdate(
            aspirasiId,update,
            { new: true }
        );

        res.send({
            message: "Aspirasi berhasil diupdate",
            data: dataAspirasi
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating aspirasi."
        });
    }
};


exports.deleteAspirasi = async (req, res) => {
    try {
        const { aspirasiId } = req.params;
        const dataAspirasi = await db.aspirasi.findById(aspirasiId);
        if (!dataAspirasi) {
            return res.status(404).send({ message: "Not found aspirasi with id " + aspirasiId });
        }

        // const dataValidator = await db.validator.findByIdAndUpdate(
        //     process.env.VALIDATOR_ID,
        //     { $pull: { aspirasi: aspirasiId } },
        //     { new: true }
        // );

        await db.aspirasi.findByIdAndDelete(aspirasiId);

        return res.status(200).send({ message: "Aspirasi berhasil dihapus" });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting aspirasi."
        });
    }
};



exports.getAspirasi = async (req, res) => {
    try {
        const data = await db.aspirasi.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving aspirasi."
        });
    }
}


exports.getAspirasiById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await db.aspirasi.findById(id);
        if (!data) {
            return res.status(404).send({ message: "Not found aspirasi with id " + id });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving aspirasi."
        });
    }
}
























































exports.getVisiMisi = async (req, res) => {
    try {
        const content = await visiMisiModels.find();
        response(200, res, content, 'Success get visi misi');
    } catch (err) {
        response(500, res, 'error', err.message || 'Some error occurred while get visi misi.');
    }
}

exports.getVisiMisiById = async (req, res) => {
    id = req.params.id
    try {
        const content = await visiMisiModels.findOne({ _id: id });
        response(200, res, content, 'Success get visi misi');
    } catch (err) {
        response(500, res, 'error', err.message || 'Some error occurred while get visi misi.');
    }
}

exports.postVisiMisi = async (req, res) => {
    try {
        const { visi, misi } = req.body;

        const newVisiMisi = new visiMisiModels({
            visi,
            misi
        });

        await newVisiMisi.save();
        response(200, res, content, 'Success post visi misi');

    } catch (error) {
        console.log("error", error.message);
        response(500, res, 'error', err.message || 'Some error occurred while post visi misi.');
    }
}

exports.putVisiMisi = async (req, res) => {
    const id = req.params.id;

    try {
        const { visi, misi } = req.body;
        let update = { visi, misi };

        const updatedVisiMisi = await visiMisiModels.findByIdAndUpdate(id, update, { new: true });
        response(200, res, content, 'Success put visi misi');

    } catch (error) {
        response(500, res, 'error', err.message || 'Some error occurred while put visi misi.');
    }
}
exports.deleteVisiMisi = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await visiMisiModels.findByIdAndDelete(id);
        response(200, res, content, 'Success delete visi misi');

    } catch (error) {
        response(500, res, 'error', err.message || 'Some error occurred while delete visi misi.');
    }
}
