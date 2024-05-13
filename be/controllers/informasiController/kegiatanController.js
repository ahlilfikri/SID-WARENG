const db = require('../../models');
const kegiatanModel = require('../../models/informasiModels/kegiatanModel');
const { uploadProjectImages } = require('../../middleware/imageUpload');
const response = require('../../res/response');


exports.getKegiatan = async (req, res) => {
    try {
        const content = await kegiatanModel.find();
        response(200, res, content, 'Success get kegiatan');
    } catch (err) {
        response(500, res, 'error', err.message || 'Some error occurred while get informasi.');
    }
}

exports.getKegiatanById = async (req, res) => {
    try {
        const id = req.params._id;
        const content = await kegiatanModel.findById(id).populate('kategori');
        response(200, res, content, 'Success get kegiatan');
    } catch (err) {
        response(500, res, 'error', err.message || 'Some error occurred while get informasi.');
    }
}

exports.postKegiatan = async (req, res) => {
    uploadProjectImages(req, res, async (error) => {
        if (error) {
            console.error(error);
            console.error(error.message);
            response(500, res, 'error', err.message || 'Internal Server Error');
            return;
        }

        try {
            const { title, content, date, location } = req.body;
            const imgs = req.files.map((file) => file.filename);
            const newKegiatan = new kegiatanModel({
                title,
                content,
                date,
                location,
                img: imgs,
            });

            const savedKegiatan = await newKegiatan.save();

            response(200, res, savedKegiatan, 'Success post kegiatan');

        } catch (error) {
            console.error(error.message);
            response(500, res, 'error', err.message || 'Some error occurred while post informasi.');
        }
    });
}

exports.putKegiatan = async (req, res) => {
    uploadProjectImages(req, res, async (error) => {
        if (error) {
            console.error(error.message);
            response(500, res, 'error', err.message || 'Internal Server Error');
            return;
        }

        try {
            const { id } = req.params;
            const { title, content, date, location } = req.body;

            let updateFields = { title, content, date, location };

            if (req.files && req.files.length > 0) {
                const newImages = req.files.map((file) => file.filename);
                updateFields.img = newImages;
            }

            const updatedKegiatan = await kegiatanModel.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedKegiatan) {
                return res.status(404).send({ message: "Kegiatan not found" });
            }

            response(200, res, savedKegiatan, 'Success put kegiatan');

        } catch (error) {
            console.error(error.message);
            response(500, res, 'error', err.message || 'Some error occurred while put informasi.');
        }
    });
}

exports.deleteKegiatan = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await kegiatanModel.findByIdAndDelete(id);
        response(200, res, savedKegiatan, 'Success delete kegiatan');
    } catch (error) {
        response(500, res, 'error', err.message || 'Some error occurred while delete informasi.');
    }
}

