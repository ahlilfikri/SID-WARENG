import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const FormSuratIzinKeramaian = ({ handleCloseModal }) => {
    const [warga, setWarga] = useState('');
    const [dataSurat, setDataSurat] = useState({
        nameAcara: '',
        jenisSurat: 'surat izin keramaian',
        isiAcara: [''],
        tanggalMulai: '',
        tanggalSelesai: '',
        dataSubSurat: {
            hariAcara: '',
            tanggalAcara: '',
            waktuAcara: '',
            jenisAcara: '',
            lokasiKegiatan: ''
        }
    });

    const { nameAcara, isiAcara, tanggalMulai, tanggalSelesai, dataSubSurat } = dataSurat;

    const token = localStorage.getItem('token');
    let idWarga;

    if (token) {
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            idWarga = payload.id;
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3555/api/v1/warga/get/${idWarga}`)
            .then((res) => {
                setWarga(res.data.data._id);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [idWarga]);

    const onChange = e => {
        const { name, value, dataset } = e.target;
        if (name === 'isiAcara') {
            const updatedIsiAcara = [...isiAcara];
            updatedIsiAcara[dataset.index] = value;
            setDataSurat({ ...dataSurat, isiAcara: updatedIsiAcara });
        } else if (name.startsWith('dataSubSurat.')) {
            const subName = name.split('.')[1];
            setDataSurat({ ...dataSurat, dataSubSurat: { ...dataSubSurat, [subName]: value } });
        } else {
            setDataSurat({ ...dataSurat, [name]: value });
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        console.log(dataSurat); // Debugging log
        try {
            const res = await axios.post(`http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/${warga}`, dataSurat);
            console.log(res.data);
            handleCloseModal(); // Close modal after successful submit
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const addIsiAcaraField = () => {
        setDataSurat({ ...dataSurat, isiAcara: [...isiAcara, ''] });
    };

    return (
        <div className="container">
            <h2 className="mt-4 mb-3">Buat Surat Izin Keramaian</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama Acara</label>
                    <input type="text" className="form-control" name="nameAcara" value={nameAcara} onChange={onChange} required />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Tanggal Mulai</label>
                        <input type="date" className="form-control" name="tanggalMulai" value={tanggalMulai} onChange={onChange} required />
                    </div>
                    <div className="col">
                        <label className="form-label">Tanggal Selesai</label>
                        <input type="date" className="form-control" name="tanggalSelesai" value={tanggalSelesai} onChange={onChange} required />
                    </div>
                </div>
                {isiAcara.map((isi, index) => (
                    <div className="mb-3" key={index}>
                        <label className="form-label">Isi Acara {index + 1}</label>
                        <textarea
                            className="form-control"
                            name="isiAcara"
                            data-index={index}
                            value={isi}
                            onChange={onChange}
                            required
                        />
                    </div>
                ))}
                <button type="button" className="btn btn-primary me-2" onClick={addIsiAcaraField}>Tambah Isi Acara</button>

                <div className="mb-3">
                    <label className="form-label">Hari Acara</label>
                    <input type="text" className="form-control" name="dataSubSurat.hariAcara" value={dataSubSurat.hariAcara} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tanggal Acara</label>
                    <input type="date" className="form-control" name="dataSubSurat.tanggalAcara" value={dataSubSurat.tanggalAcara.split('T')[0]} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Waktu Acara</label>
                    <input type="time" className="form-control" name="dataSubSurat.waktuAcara" value={dataSubSurat.waktuAcara} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Jenis Acara</label>
                    <input type="text" className="form-control" name="dataSubSurat.jenisAcara" value={dataSubSurat.jenisAcara} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Lokasi Kegiatan</label>
                    <input type="text" className="form-control" name="dataSubSurat.lokasiKegiatan" value={dataSubSurat.lokasiKegiatan} onChange={onChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

FormSuratIzinKeramaian.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
};

export default FormSuratIzinKeramaian;