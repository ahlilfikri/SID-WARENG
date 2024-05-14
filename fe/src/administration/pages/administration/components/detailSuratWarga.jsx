import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const DetailSuratWarga = ({ surat, handleCloseModal }) => {
    const [editAble, setEditAble] = useState(false);
    const [isiAcara, setIsiAcara] = useState(surat.isiAcara || []);

    const handleEdit = () => {
        if (surat.statusPersetujuan === "ditolak rt" || surat.statusPersetujuan === "ditolak rw" || surat.statusPersetujuan === "ditolak perangkat desa") {
            setEditAble(true);
        }
    };

    const handleSave = async () => {
        try {
            const updatedSurat = { ...surat, isiAcara };
            await axios.put(`http://localhost:3555/api/v1/surat/update/${surat._id}`, updatedSurat);
            setEditAble(false);
            handleCloseModal();
        } catch (error) {
            console.error("Error updating surat: ", error);
        }
    };

    const handleInputChange = (index, event) => {
        const newIsiAcara = [...isiAcara];
        newIsiAcara[index] = event.target.value;
        setIsiAcara(newIsiAcara);
    };

    const handleAddIsi = () => {
        setIsiAcara([...isiAcara, ""]);
    };

    const handleRemoveIsi = (index) => {
        const newIsiAcara = isiAcara.filter((_, i) => i !== index);
        setIsiAcara(newIsiAcara);
    };

    return (
        <div className="modal container-fluid" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detail Surat</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                        <p>Jenis Surat: {surat.jenisSurat}</p>
                        <p>Status: {surat.statusAcara}</p>
                        <p>Status Persetujuan: {surat.statusPersetujuan}</p>
                        {editAble ? (
                            <>
                                {isiAcara.map((isi, index) => (
                                    <div className="form-group" key={index}>
                                        <label>Isi Acara {index + 1}</label>
                                        <textarea
                                            name="isiAcara"
                                            data-index={index}
                                            value={isi}
                                            onChange={(event) => handleInputChange(index, event)}
                                            required
                                        />
                                        <Button variant="danger" onClick={() => handleRemoveIsi(index)}>Hapus</Button>
                                    </div>
                                ))}
                                <Button variant="success" onClick={handleAddIsi}>Tambah Isi Acara</Button>
                            </>
                        ) : (
                            <>
                                {isiAcara.map((isi, index) => (
                                    <p key={index}>Isi Acara {index + 1}: {isi}</p>
                                ))}
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Tutup
                        </Button>
                        {editAble ? (
                            <Button variant="primary" onClick={handleSave}>
                                Simpan
                            </Button>
                        ) : (
                            surat.statusPersetujuan === "ditolak rt" || surat.statusPersetujuan === "ditolak rw" || surat.statusPersetujuan === "ditolak perangkat desa" ? (
                                <Button variant="primary" onClick={handleEdit}>
                                    Edit
                                </Button>
                            ) : null
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

DetailSuratWarga.propTypes = {
    surat: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default DetailSuratWarga;
