import { useState, useEffect } from 'react';
import axios from 'axios';

const FormPerizinanSurat = () => {
    const [warga, setWarga] = useState('');
    const [dataSurat, setDataSurat] = useState({
        nameAcara: '',
        jenisSurat: '',
        isiAcara: [''],
        tanggalMulai: '',
        tanggalSelesai: '',
        tempatAcara: '',
    });

    const { nameAcara, jenisSurat, isiAcara, tanggalMulai, tanggalSelesai, tempatAcara } = dataSurat;

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
        if (e.target.name === 'isiAcara') {
            const updatedIsiAcara = [...isiAcara];
            updatedIsiAcara[e.target.dataset.index] = e.target.value;
            setDataSurat({ ...dataSurat, isiAcara: updatedIsiAcara });
        } else {
            setDataSurat({ ...dataSurat, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/${warga}`, {
                nameAcara,
                jenisSurat,
                tanggalMulai,
                tanggalSelesai,
                tempatAcara,
                isiAcara
            });
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const addIsiAcaraField = () => {
        setDataSurat({ ...dataSurat, isiAcara: [...isiAcara, ''] });
    };

    return (
        <div className="container">
            <h2 className="mt-4 mb-3">Buat Surat Acara</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama Acara</label>
                    <input type="text" className="form-control" name="nameAcara" value={nameAcara} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Jenis Surat</label>
                    <input type="text" className="form-control" name="jenisSurat" value={jenisSurat} onChange={onChange} required />
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
                <div className="mb-3">
                    <label className="form-label">Tempat Acara</label>
                    <input type="text" className="form-control" name="tempatAcara" value={tempatAcara} onChange={onChange} required />
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default FormPerizinanSurat;
