const db = require('../../models');
const kegiatanModel = require('../../models/informasiModels/kegiatanModel');
const { uploadProjectImages } = require('../../middleware/imageUpload');


exports.getKegiatan = async (req, res) => {
    try {
        const content = await kegiatanModel.find();
        res.status(200).send({
            message: "Success get kegiatan",
            data: content
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get kegiatan."
        });
    }
}

exports.getKegiatanById = async (req, res) => {
    try {
        const id = req.params._id;
        const content = await kegiatanModel.findById(id).populate('kategori');
        res.status(200).send({
            message: "Success get kegiatan",
            data: content
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while get kegiatan."
        });
    }
}


exports.postKegiatan = async (req, res) => {
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
            const newKegiatan = new kegiatanModel({
                title,
                content,
                img: imgs,
            });

            const savedKegiatan = await newKegiatan.save();

            res.status(200).send({
                message: "Success post kegiatan",
                data: savedKegiatan
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({
                message: error.message || "Some error occurred while post kegiatan."
            });
        }
    });
}
exports.putKegiatan = async (req, res) => {
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

            const updatedKegiatan = await kegiatanModel.findByIdAndUpdate(id, updateFields, { new: true });

            if (!updatedKegiatan) {
                return res.status(404).send({ message: "Kegiatan not found" });
            }

            res.status(200).send({
                message: "Success update kegiatan",
                data: updatedKegiatan
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send({
                message: error.message || "Some error occurred while updating kegiatan."
            });
        }
    });
}
// exports.putKegiatan = async (req, res) => {
//     const id = req.params._id;
//     upload.many(req, res, async (error) => {
//         if (error) {
//             console.error(error.message);
//             res.status(500).send({ message: 'Internal Server Error', error: error.message });
//             return;
//         }
//         const { title, content } = req.body;
//         const { confirmUpdateImage } = req.body;
//         const updatedProduct = {
//             title,
//             content,
//         };

//         let images = [];
//         if (confirmUpdateImage === 'true') {
//             // menghapus gambar lama
//             const product = await kegiatanModel.findById(id);
//             product.img.forEach((img) => {
//                 fs.unlinkSync(`assets/${img}`);
//             });
//             // menambahkan gambar baru
//             imgs = req.files.map((file) => file.filename);
//             updatedProduct.img = imgs;
//         }
//         try {
//             const result = await kegiatanModel.findByIdAndUpdate(id, updatedProduct, { new: true });
//             res.status(200).send({
//                 message: "Success put kegiatan",
//                 data: newKegiatan
//             });
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send({
//                 message: err.message || "Some error occurred while put kegiatan."
//             });
//         }
//     });
// }

exports.deleteKegiatan = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await kegiatanModel.findByIdAndDelete(id);
        res.status(200).send({
            message: "Success delete kegiatan",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while delete kegiatan."
        });
    }
}

