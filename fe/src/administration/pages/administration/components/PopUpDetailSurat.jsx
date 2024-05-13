import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PopUpDetailSurat = ({ surat, handleCloseModal }) => {
    return (
        <>
            <Modal show={true} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Surat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nama Acara: {surat.nameAcara}</p>
                    <p>Jenis Surat: {surat.jenisSurat}</p>
                    <p>Tanggal Mulai: {surat.tanggalMulai}</p>
                    <p>Tanggal Selesai: {surat.tanggalSelesai}</p>
                    <p>Tempat Acara: {surat.tempatAcara}</p>
                    <p>Isi Acara: {surat.isiAcara.join(', ')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

PopUpDetailSurat.propTypes = {
    surat: PropTypes.shape({
        nameAcara: PropTypes.string.isRequired,
        jenisSurat: PropTypes.string.isRequired,
        tanggalMulai: PropTypes.string.isRequired,
        tanggalSelesai: PropTypes.string.isRequired,
        tempatAcara: PropTypes.string.isRequired,
        isiAcara: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};  

export default PopUpDetailSurat;
