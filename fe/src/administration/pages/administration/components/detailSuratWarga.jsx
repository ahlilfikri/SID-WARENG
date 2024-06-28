import React from 'react';
import PropTypes from 'prop-types';

const DetailSuratWarga = ({ surat, handleCloseModal }) => {
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
