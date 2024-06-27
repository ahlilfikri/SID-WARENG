const jenisSuratModel = require('../../../models/suratIzinModel/jenisSurat/index_jenis_surat');




exports.format_suratKuasaAktaKematian = async (subSuratId) => {
    console.log("test ",subSuratId);
    try {
        const suratKuasaAktaKematian = await jenisSuratModel.suratKuasaAktaKematian.findById(subSuratId);
        if (!suratKuasaAktaKematian) {
            throw new Error('Surat Kuasa Akta Kematian tidak ditemukan');
        }

        // const suratKuasaAktaKematian = new mongoose.Schema({
        //     // penerimaKuasa :
        //     namaPenerimaKuasa: { type: String, required: true },
        //     nikPenerimaKuasa: { type: String, required: true },
        //     tempatLahirPenerimaKuasa: { type: String, required: true },
        //     tanggalLahirPenerimaKuasa: { type: Date, required: true },   
        //     // 2024-08-02T00:00:00.000+00:00 2024 : tahun, 08 : bulan, 02 : tanggal T : time 00:00:00 : jam menit detik 000+00:00 : GMT 
        //     jenisKelaminPenerimaKuasa: { type: String, required: true }, // laki-laki, perempuan
        //     agamaPenerimaKuasa: { type: String, required: true },
        //     pekerjaanPenerimaKuasa: { type: String, required: true },
        //     alamatPenerimaKuasa: { type: String, required: true },
        
        //     // data almarhum/ah :
        //     namaAlmarhum: { type: String, required: true },
        //     nikAlmarhum: { type: String, required: true },
        // }, { timestamps: false });

        return `
        <table>
            <tr>
                <td>Nama Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.namaPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>NIK Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.nikPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>Tempat Lahir Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.tempatLahirPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>Tanggal Lahir Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.tanggalLahirPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>Jenis Kelamin Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.jenisKelaminPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>Agama Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.agamaPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>Pekerjaan Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.pekerjaanPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>Alamat Penerima Kuasa</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.alamatPenerimaKuasa || '-'}
                </td>
            </tr>
            <tr>
                <td>Nama Almarhum</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.namaAlmarhum || '-'}
                </td>
            </tr>
            <tr>
                <td>NIK Almarhum</td>
                <td>:</td>
                <td>
                    ${suratKuasaAktaKematian.nikAlmarhum || '-'}
                </td>
            </tr>
        </table>
        `;
    } catch (err) {
        console.error(err);
        throw err; 
    }
};

module.exports = exports;
