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
        const update = req.body;

        // Logging the received data
        console.log(`Aspirasi ID: ${aspirasiId}, Update: ${JSON.stringify(update)}`);

        const dataAspirasi = await db.aspirasi.findByIdAndUpdate(
            aspirasiId,
            update,
            { new: true }
        );

        if (!dataAspirasi) {
            return res.status(404).send({
                message: "Aspirasi not found"
            });
        }

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
        await db.aspirasi.findByIdAndDelete(aspirasiId);

        return res.status(200).send({ message: "Aspirasi berhasil dihapus" });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while deleting aspirasi."
        });
    }
};



exports.getAspirasiByWarga = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await db.aspirasi.find({wargaId:id});
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


exports.getAspirasiApproved = async (req, res) => {
    try{
        const {page, size} = req.query;
        const {limit, offset} = getPagination(page, size);
        const data = await db.aspirasi.find({isPublish:true, siApproved:true}).limit(limit).skip(offset);
        if(!data){
            return res.status(404).send({message:"Not found aspirasi approved"});
        }
        res.status(200).send(data);

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving aspirasi."
        })
    };

}
        


exports.getAspirasiAll = async (req, res) => { // whit pagination
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        const data = await db.aspirasi.find({isPublish:true}).limit(limit).skip(offset);
        if (!data) {
            return res.status(404).send({ message: "Not found aspirasi" });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving aspirasi."
        });
    }
}

exports.getAspirasiKades = async (req, res) => {
    try{
        const aspirasiKades = await db.aspirasi.find({isPublish:false});
        if(!aspirasiKades){
            return res.status(404).send({message:"Not found aspirasi kades"});
        }
        res.status(200).send(aspirasiKades);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving aspirasi."
        });
    }
};

exports.getAspirasiAdmin = async(req,res) => {
    try{
        const aspirasiAdmin = await db.aspirasi.find({isPublish:true})
        if(!aspirasiAdmin){
            return res.status(404).send({message:"Not found aspirasi admin"});
        }

        res.status(200).send(aspirasiAdmin);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving aspirasi."
        });   
    }
}







exports.getAspirasiKadesPagination = async (req, res) => {
    try{
        const {page, size} = req.query;
        const {limit, offset} = getPagination(page, size);
        const aspirasiKades = await db.aspirasi.find({isPublish:false}).limit(limit).skip(offset);
        if(!aspirasiKades){
            return res.status(404).send({message:"Not found aspirasi kades"});
        }
        res.status(200).send(aspirasiKades);
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving aspirasi."
        });
    }
};

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
