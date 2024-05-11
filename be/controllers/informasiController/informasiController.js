const db = require('../../models');
const informasiModel = require('../../models/informasiModels/informasiModel');
const { uploadProjectImages } = require('../../middleware/imageUpload');

exports.getInformasi = async (req, res) => {
    try {
        const content = await informasiModel.find();
        res.status(200).send({
            message: "Success get informasi",
            data: content
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get informasi."
        });
    }
}
exports.getInformasiById = async (req, res) => {
    id = req.params.id
    try {
        const content = await informasiModel.findOne({ _id: id });
        res.status(200).send({
            message: "Success get informasi",
            data: content
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get informasi."
        });
    }
}

exports.postInformasi = async (req, res) => {
    uploadProjectImages(req, res, async (error) => {
        if (error) {
            console.error(error);
            console.error(error.message);
            res.status(500).send({ message: 'Internal Server Error', error: error.message });
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

            res.status(200).send({
                message: "Success post informasi",
                data: savedInformasi
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({
                message: error.message || "Some error occurred while post informasi."
            });
        }
    });
}


exports.putInformasi = async (req, res) => {
    uploadProjectImages(req, res, async (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).send({ message: 'Internal Server Error', error: error.message });
            return;
        }

        try {
            const { id } = req.params;
            const { title, content } = req.body;
            let updateFields = { title, content };

            // If new images are uploaded, update the image field
            if (req.files && req.files.length > 0) {
                const newImages = req.files.map((file) => file.filename);
                updateFields.img = newImages;
            }

            const updatedInformasi = await informasiModel.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedInformasi) {
                return res.status(404).send({ message: "Informasi not found" });
            }

            res.status(200).send({
                message: "Success update Informasi",
                data: updatedInformasi
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({
                message: error.message || "Some error occurred while updating Informasi."
            });
        }
    });
}

exports.deleteInformasi = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const result = await informasiModel.findByIdAndDelete(id);
        res.status(200).send({
            message: "Success delete informasi",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            message: err.message || "Some error occurred while delete informasi."
        });
    }
}

