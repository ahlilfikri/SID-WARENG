import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DetailSuratWarga = ({ surat, handleCloseModal }) => {
    const [editAble, setEditAble] = useState(false);
    const [isiAcara, setIsiAcara] = useState(surat.isiAcara || []);

    useEffect(() => {
        if (
            surat.statusPersetujuan === "ditolak rt" ||
            surat.statusPersetujuan === "ditolak rw" ||
            surat.statusPersetujuan === "ditolak perangkat desa"
        ) {
            setEditAble(true);
        }
    }, [surat]);

    const handleIsiAcaraChange = (index, event) => {
        const newIsiAcara = [...isiAcara];
        newIsiAcara[index] = event.target.value;
        setIsiAcara(newIsiAcara);
    };

    const handleAddIsiAcara = () => {
        setIsiAcara([...isiAcara, ""]);
    };

    const handleRemoveIsiAcara = (index) => {
        const newIsiAcara = isiAcara.filter((_, i) => i !== index);
        setIsiAcara(newIsiAcara);
    };

    const handleSave = async () => {
        try {
            console.log("Saving surat with ID:", surat._id);  // Added log to check ID
            const response = await axios.put(`http://localhost:3555/api/v1/surat/revisi-surat-warga/${surat._id}`, {
                "newIsiAcara": isiAcara
            });
            console.log("Success edit surat acara:", response.data);
            handleCloseModal();
        } catch (error) {
            console.error("Error editing surat acara:", error);
        }
    };

    return (
        <>
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
                            {editAble && (
                                <div>
                                    {isiAcara.map((isi, index) => (
                                        <div className="form-group" key={index}>
                                            <label>Isi Acara {index + 1}</label>
                                            <textarea
                                                name="isiAcara"
                                                data-index={index}
                                                value={isi}
                                                onChange={(e) => handleIsiAcaraChange(index, e)}
                                                required
                                            />
                                            <Button variant="danger" onClick={() => handleRemoveIsiAcara(index)}>
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="primary" onClick={handleAddIsiAcara}>
                                        Add Isi Acara
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Tutup
                            </Button>
                            {editAble && (
                                <Button variant="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

DetailSuratWarga.propTypes = {
    surat: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default DetailSuratWarga;