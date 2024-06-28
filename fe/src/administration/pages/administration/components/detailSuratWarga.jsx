import React from 'react';
import PropTypes from 'prop-types';

const DetailSuratWarga = ({ surat, handleCloseModal }) => {
    const [editAble, setEditAble] = useState(false);
    const [isiAcara, setIsiAcara] = useState(surat.isiAcara || []);

    const [detailSurat, setDetailSurat] = useState(null);


    useEffect(() => {
        fetchDetailSurat();
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

    const fetchDetailSurat = async () => {
        try {
            const jenis_surat = surat.jenisSurat.replace(/\s/g, '_');
            const subSuratId = surat.subSuratId;
            const request = await axios.get(`http://localhost:3555/api/v1/surat/get/detail-surat/${subSuratId}/${jenis_surat}`);
            setDetailSurat(request.data.data);
        } catch (err) {
            console.error("Error fetching detail surat: ", err);
        }
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
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detail Surat</h5>
                        <button type="button" className="close" onClick={handleCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Jenis Surat: {surat.jenisSurat}</p>
                        {surat.jenisSurat === 'aspirasi' ? (
                            <>
                                <p>Aspirasi: {surat.aspirasi}</p>
                                <p>Status : {surat.siApproved ? 'disetujui' : surat.isPending ? 'pending': 'ditolak'}</p>
                            </>
                        ) : (
                            <>
                                <p>Nama Acara: {surat.nameAcara}</p>
                                <p>Status Acara: {surat.statusAcara}</p>
                                <p>Status Persetujuan: {surat.statusPersetujuan}</p>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

DetailSuratWarga.propTypes = {
    surat: PropTypes.shape({
        jenisSurat: PropTypes.string.isRequired,
        nameAcara: PropTypes.string,
        statusAcara: PropTypes.string,
        statusPersetujuan: PropTypes.string,
        aspirasi: PropTypes.string
    }).isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default DetailSuratWarga;
