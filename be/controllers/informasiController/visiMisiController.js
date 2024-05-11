const db = require('../../models');
const visiMisiModels = require('../../models/informasiModels/visiMisiModel');

exports.getVisiMisi = async (req, res) => {
    try {
        const content = await visiMisiModels.find();
        res.status(200).send({
            message: "Success get visi misi",
            data: content
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get visi misi."
        });
    }
}
exports.getVisiMisiById = async (req, res) => {
    id = req.params.id
    try {
        const content = await visiMisiModels.findOne({ _id: id });
        res.status(200).send({
            message: "Success get visi misi",
            data: content
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get visi misi."
        });
    }
}

exports.postVisiMisi = async (req, res) => {
    try {
        const { contentVisi, contentMisi } = req.body;

        const newvisiMisi = new visiMisiModels({
            contentVisi,
            contentMisi
        });

        await newvisiMisi.save();
        res.status(200).send({
            message: "Success post visi misi",
            data: newvisiMisi
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).send({
            message: err.message || "Some error occurred while post visi misi."
        });
    }
}


exports.putVisiMisi = async (req, res) => {
    const id = req.params._id;

    try {
        const { contentVisi, contentMisi } = req.body;
        let update = { contentVisi, contentMisi };

        const updatedvisiMisi = await visiMisiModels.findByIdAndUpdate(id, update, { new: true });

        res.status(200).send({
            message: "Success update visi misi",
            data: updatedvisiMisi
        });
    } catch (error) {
        res.status(500).send({
            message: err.message || "Some error occurred while update visi misi."
        });
    }
}
exports.deleteVisiMisi = async (req, res) => {
    try {
        const id = req.params._id;
        const result = await visiMisiModels.findByIdAndDelete(id);
        res.status(200).send({
            message: "Success delete visi misi",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            message: err.message || "Some error occurred while delete visi misi."
        });
    }
}

