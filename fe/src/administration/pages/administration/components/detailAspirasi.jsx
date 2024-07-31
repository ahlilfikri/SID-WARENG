import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const DetailAspirasi = ({ aspirasi, handleCloseModal }) => {
    const formattedDate = format(new Date(aspirasi.createdAt), 'dd-MM-yyyy');

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detail Aspirasi</h5>
                        <button type="button" className="close" onClick={handleCloseModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Aspirasi:</strong> {aspirasi.aspirasi}</p>
                        <p><strong>Status:</strong> {aspirasi.isPublish ? 'Untuk umum' : 'Untuk kades'}</p>
                        <p><strong>Status Pengajuan:</strong> {`${aspirasi.isPending ? 'Sedang diajukan' : aspirasi.siApproved ? 'disetujui' : 'ditolak'}`}</p>
                        <p><strong>Kategori:</strong> {aspirasi.kategori}</p>
                        <p><strong>Diajukan Pada Tanggal:</strong> {formattedDate}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetailAspirasi.propTypes = {
    aspirasi: PropTypes.shape({
        aspirasi: PropTypes.string.isRequired,
        isPublish: PropTypes.bool.isRequired,
        isPending: PropTypes.bool.isRequired,
        deskripsi: PropTypes.string, // Adjust the field names and types based on your actual data structure
    }).isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default DetailAspirasi;
