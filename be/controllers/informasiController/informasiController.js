const db = require('../../models');
const informasiModel = require('../../models/informasiModels/informasiModel');

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
    try {
        const { contentVisi, contentMisi } = req.body;

        const newInformasi = new informasiModel({
            contentVisi,
            contentMisi
        });

        await newInformasi.save();
        res.status(200).send({
            message: "Success post informasi",
            data: newInformasi
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).send({
            message: err.message || "Some error occurred while post informasi."
        });
    }
}


exports.putInformasi = async (req, res) => {
    const id = req.params._id;

    try {
        const { contentVisi, contentMisi } = req.body;
        let update = { contentVisi, contentMisi };

        const updatedInformasi = await informasiModel.findByIdAndUpdate(id, update, { new: true });

        res.status(200).send({
            message: "Success update informasi",
            data: updatedInformasi
        });
    } catch (error) {
        res.status(500).send({
            message: err.message || "Some error occurred while update informasi."
        });
    }
}
exports.deleteInformasi = async (req, res) => {
    try {
        const id = req.params._id;
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

