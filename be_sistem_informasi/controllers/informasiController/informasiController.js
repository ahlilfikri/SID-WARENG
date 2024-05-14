const db = require('../../models');
const informasiModel = require('../../models/informasiModels/informasiModel');
const { uploadProjectImages } = require('../../middleware/imageUpload');
const response = require('../../res/response');

exports.getInformasi = async (req, res) => {
    try {
        const content = await informasiModel.find();
        response(200, res, content, 'Success get informasi');
    } catch (err) {
        response(500, res, 'error', err.message || 'Some error occurred while get informasi.');
    }
}
exports.getInformasiById = async (req, res) => {
    id = req.params.id
    try {
        const content = await informasiModel.findOne({ _id: id });
        response(200, res, content, 'Success get informasi');
    } catch (err) {
        response(500, res, 'error', err.message || 'Some error occurred while get informasi.');
    }
}

exports.postInformasi = async (req, res) => {
    uploadProjectImages(req, res, async (error) => {
        if (error) {
            console.error(error);
            console.error(error.message);
            response(500, res, 'error', err.message || 'Internal Server Error');
            return;
        }

        try {
            const { title, content } = req.body;
            console.log(title, content);
            const imgs = req.files.map((file) => file.filename);
            const newInformasi = new informasiModel({
                title,
                content,
                img: imgs,
            });

            const savedInformasi = await newInformasi.save();

            response(200, res, savedInformasi, 'Success post informasi');

        } catch (error) {
            console.error(error.message);
            response(500, res, 'error', err.message || 'Some error occurred while post informasi.');

        }
    });
}


exports.putInformasi = async (req, res) => {
    uploadProjectImages(req, res, async (error) => {
        if (error) {
            console.error(error.message);
            response(500, res, 'error', err.message || 'Internal Server Error');
            return;
        }

        try {
            const { id } = req.params;
            const { title, content } = req.body;
            let updateFields = { title, content };

            if (req.files && req.files.length > 0) {
                const newImages = req.files.map((file) => file.filename);
                updateFields.img = newImages;
            }

            const updatedInformasi = await informasiModel.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedInformasi) {
                return res.status(404).send({ message: "Informasi not found" });
            }

            response(200, res, updatedInformasi, 'Success put informasi');

        } catch (error) {
            console.error(error.message);
            response(500, res, 'error', err.message || 'Some error occurred while put informasi.');
        }
    });
}

exports.deleteInformasi = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const result = await informasiModel.findByIdAndDelete(id);
        response(200, res, result, 'Success delete informasi');

    } catch (error) {
        response(500, res, 'error', err.message || 'Some error occurred while delete informasi.');
    }
}

