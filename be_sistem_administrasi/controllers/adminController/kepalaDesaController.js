const db = require("../../models/index");
const mongoose = require("mongoose");
const KadesModel = db.pimpinanDesa
const SuratAcaraModel = db.suratAcara;


exports.getKades = async (req, res) => {
    try{
     
        const dataKades = await db.user.find({role: 5})
        if (!dataKades){
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        res.status(200).send({
            message: "Success get kades",
            data: dataKades
        });
        
    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get kades."
        });
    }
}

exports.getPimpinanDesaById = async (req, res) => {
    try{
        const {id} = req.params;
        const dataKades = await KadesModel.findOne({'user': id}).populate('suratAcaraComing').populate('suratAcaraPending').populate('suratAcaraApproved').populate('suratAcaraRejected');
        if (!dataKades){
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        res.status(200).send({
            message: "Success get kades by id",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get kades by id."
        });
    }

}

exports.getAllPimpinanDesa = async (req, res) => {
    try{
        const dataKades = await KadesModel.find().populate('user');
        if (!dataKades){
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        res.status(200).send({
            message: "Success get all kades",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while get all kades."
        });
    }
};

exports.postKadesWakades = async (req, res) => {
    try{
        const {name, nik, password, alamat, nohp, status, role} = req.body;
        const newKades = new KadesModel({
            name,
            nik,
            password,
            alamat,
            nohp,
            status,
            role
        });
        const dataKades = await newKades.save();
        res.status(200).send({
            message: "Success create kades",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while post kades."
        });
    }
}

exports.updateKadesByRole = async (req, res) => {
    try{
        const {role} = req.params;
        const {name, nik, password, alamat, nohp, status} = req.body;
        if (!role){
            return res.status(400).send({
                message: "Role not found"
            });
        }
        const dataKades = await KadesModel.findOneAndUpdate({role: role}, {
            name,
            nik,
            password,
            alamat,
            nohp,
            status
        }, {new: true});
        if (!dataKades){
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        res.status(200).send({
            message: "Success update kades",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while update kades."
        });
    }
}

exports.deleteKadesById = async (req, res) => {
    try{
        const {id} = req.params;
        const dataKades = await KadesModel.findByIdAndDelete(id);
        if (!dataKades){
            return res.status(404).send({
                message: "Data kades not found"
            });
        }
        res.status(200).send({
            message: "Success delete kades",
            data: dataKades
        });

    }catch(error){
        res.status(500).send({
            message: error.message || "Some error occurred while delete kades."
        });
    }
}
