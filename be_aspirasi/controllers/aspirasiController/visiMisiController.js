const db = require('../../models');
const dbAdministrasi = require('../../../be_sistem_administrasi/models/index');
const response = require('../../res/response');


exports.getAspirasi = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = db.getPagination(page, size);
        const data = await db.aspirasi.findAndCountAll({ limit, offset });
        const response = db.getPagingData(data, page, limit);
        res.status(200).send(response);
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


exports.postAspirasi = async (req, res) => {
    try{
        const {aspirasi,isPublish} = req.body;
        const{wargaId} = req.params;

        const user = await dbAdministrasi.warga.findById(wargaId).populate({
            path: 'user',
            select: 'name'
        }); 
        if(!user){
            return res.status(404).send({message: "Not found user with id " + wargaId});
        }

        const newAspirasi = {
            warga: wargaId,
            author: user.name,
            aspirasi: aspirasi,
            validator: null,
            isPublish: isPublish
        }   
        const data = await db.aspirasi.create(newAspirasi);
        return res.status(200).send(data);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while post aspirasi."
        });
    }
}

exports.deleteAspirasi = async (req, res) => {// menghapus aspirasi dari model, validator dan ,waraga
    try{
        const {aspirasiId} = req.params;
        const data = await db.aspirasi.findById(aspirasiId);
        if(!data){
            return res.status(404).send({message: "Not found aspirasi with id " + aspirasiId});
        }
        await db.aspirasi.destroy({
            where: {id: aspirasiId}
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete aspirasi."
        });
    }

};





























































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
