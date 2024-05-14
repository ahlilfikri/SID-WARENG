import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DetailSuratWarga = ({ surat, handleCloseModal }) => {
    return (
        <>
            {/* jangan menggunakan Boostrap react */}
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
                        </div>
                        <div className="modal-footer">
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Tutup
                            </Button>
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
