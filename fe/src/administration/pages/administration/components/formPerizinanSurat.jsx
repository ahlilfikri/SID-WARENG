/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
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

    // jangan di rubah bagian ini
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
            }
        )
        .catch((err) => {
        console.error(err);
        });
    }, [ idWarga ]);
    // jangan di rubah bagian ini


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
            // endpoint nya :   http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/:idWarga
            const res = await axios.post(`http://localhost:3555/api/v1/surat/create/suratAcara/TAversion/${warga}`, 
            {
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
        <>
            <div className="container-fluid create-surat-acara">
            <h2>Create Surat Acara</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nama Acara</label>
                    <input type="text" name="nameAcara" value={nameAcara} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Jenis Surat</label>
                    <input type="text" name="jenisSurat" value={jenisSurat} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Tanggal Mulai</label>
                    <input type="date" name="tanggalMulai" value={tanggalMulai} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Tanggal Selesai</label>
                    <input type="date" name="tanggalSelesai" value={tanggalSelesai} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Tempat Acara</label>
                    <input type="text" name="tempatAcara" value={tempatAcara} onChange={onChange} required />
                </div>
                {isiAcara.map((isi, index) => (
                    <div className="form-group" key={index}>
                        <label>Isi Acara {index + 1}</label>
                        <textarea
                            name="isiAcara"
                            data-index={index}
                            value={isi}
                            onChange={onChange}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addIsiAcaraField}>Tambah Isi Acara</button>
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    );
};

export default FormPerizinanSurat;
