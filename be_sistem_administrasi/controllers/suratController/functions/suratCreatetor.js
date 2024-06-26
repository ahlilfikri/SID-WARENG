const e = require('express');
const jenisSuratModel = require('../../../models/suratIzinModel/jenisSurat/index_jenis_surat');
const mongoose = require('mongoose');


// nanti di pake di controller wargaCreateSurat_TAVERSION
exports.createSubSurat = async (req, res, dataSubSurat, jenisSurat) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        if(jenisSurat === 'surat keterangan usaha'){
            const newSubSurat = await jenisSuratModel.suratKeteranganUsaha.create(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log("surat keterangan usaha",newSubSurat);
            return newSubSurat;
        }

        if(jenisSurat === 'keterangan nikah'){
            const newSubSurat = new jenisSuratModel.suratKeteranganNikah(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat keterangan nikah',newSubSurat);
            return newSubSurat;
        }

        if(jenisSurat === 'bantuan sosial'){
            const newSubSurat = new jenisSuratModel.suratBantuanSosial(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat bantuan sosial',newSubSurat);
            return newSubSurat;
        }
        // nanti nambahin pengondisian setiap jenis surat yang ada
    }catch(err){
        console.log(err);
        const error = {
            data: "error saat membuat sub surat",
            message: err.message
        }
        throw new Error(error);
    }finally{
        session.endSession();
    }
};



exports.getAllSuratUsaha = async (req,res)=>{
    try{
        const allSuratUsaha = await jenisSuratModel.suratKeteranganUsaha.find();
        console.log(allSuratUsaha);
        return allSuratUsaha;

    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});
    }
}

exports.getAllSuratNikah = async (req,res)=>{
    try{
        const allSuratNikah = await jenisSuratModel.suratKeteranganNikah.find();
        console.log(allSuratNikah);
        return allSuratNikah;

    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});
    }
}


module.exports = exports;
