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
        const { visi, misi } = req.body;

        const newVisiMisi = new visiMisiModels({
            visi,
            misi
        });

        await newVisiMisi.save();
        res.status(200).send({
            message: "Success post visi misi",
            data: newVisiMisi
        });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).send({
            message: err.message || "Some error occurred while post visi misi."
        });
    }
}


exports.putVisiMisi = async (req, res) => {
    const id = req.params.id;

    try {
        const { visi, misi } = req.body;
        let update = { visi, misi };

        const updatedVisiMisi = await visiMisiModels.findByIdAndUpdate(id, update, { new: true });
        res.status(200).send({
            message: "Success update visi misi",
            data: updatedVisiMisi
        });
    } catch (error) {
        res.status(500).send({
            message: err.message || "Some error occurred while update visi misi."
        });
    }
}
exports.deleteVisiMisi = async (req, res) => {
    try {
        const id = req.params.id;
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

