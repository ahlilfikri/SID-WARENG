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
        
        if(jenisSurat === 'surat pengantar skck'){
            const newSubSurat = new jenisSuratModel.suratSkck(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat skck',newSubSurat);
            return newSubSurat;
        }

        if(jenisSurat === 'surat kelahiran'){
            const newSubSurat = new jenisSuratModel.suratKeteranganKelahiran(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat keterangan kelahiran',newSubSurat);
            return newSubSurat;
        }

        //surat izin keramaian
        if(jenisSurat === 'surat izin keramaian'){
            const newSubSurat = new jenisSuratModel.suratIzinKeramaian(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat izin keramaian',newSubSurat);
            return newSubSurat;
        }

        if (jenisSurat === 'surat izin bepergian'){
            const newSubSurat = new jenisSuratModel.suratIzinBepergian(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat izin bepergian',newSubSurat);
            return newSubSurat;
        }
        
        if (jenisSurat === 'keterangan tidak mampu'){
            const newSubSurat = new jenisSuratModel.suratKeteranganTidakMampu(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat keterangan tidak mampu',newSubSurat);
            return newSubSurat;
        }

        if (jenisSurat === 'surat kematian'){
            const newSubSurat = new jenisSuratModel.suratKuasaAktaKematian(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat kuasa akta kematian',newSubSurat);
            return newSubSurat;
        }


        if (jenisSurat === 'pencatatan kependudukan'){
            const newSubSurat = new jenisSuratModel.suratPencatatanKependudukan(dataSubSurat);
            await newSubSurat.save({session: session});
            await session.commitTransaction();
            console.log('surat pencatatan kependudukan',newSubSurat);
            return newSubSurat;

        }


        // if (jenisSurat === ''){

        // }
        



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
