import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BypassSurat from './bypassSurat';
import axios from 'axios';

const PopUpDetailSurat = ({ surat, handleCloseModal, idTokoh, condition, role , activeTab}) => {

    
    const handlePersetujuanSurat = async (statusPersetujuan) => {
        try {
            const request = await axios.put(`http://localhost:3555/api/v1/surat/persetujuan-surat-acara-${role}/${idTokoh}/${surat._id}`, {
                statusPersetujuanReq: statusPersetujuan // ini adalah status persetujuan yang dikirim ke backend (true/false)
            });
            
            console.log(request);
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const handleSetuju = () => {
        handlePersetujuanSurat(true);
        handleCloseModal();
    }

    const handleTolak = () => {
        handlePersetujuanSurat(false);
        handleCloseModal();
    }

    const BypassController = (role) => {
        if (role === 'rt') {
            return 'rt';
        }else if(role === 'rw'){
            return 'rw'
        }else if(role === 'pd' || role === 'pp'){
            return 'pd';
        }

    }

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
                    <p>Isi Acara: {surat.isiAcara.join(' <br/> ')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Tutup
                    </Button>
                    {condition == 'pending' ? (
                        <div>
                            <Button variant="success" onClick={handleSetuju}>
                                Setujui
                            </Button>
                            <Button variant="danger" onClick={handleTolak}>
                                Tolak
                            </Button>
                        </div>
                    ) : null}
                    {activeTab != 'approved' && activeTab != 'rejected' && <BypassSurat suratAcaraId={surat._id} role={BypassController(role)} />}
                </Modal.Footer>
            </Modal>
        </>
    );
}

PopUpDetailSurat.propTypes = {
    surat: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nameAcara: PropTypes.string.isRequired,
        jenisSurat: PropTypes.string.isRequired,
        tanggalMulai: PropTypes.string.isRequired,
        tanggalSelesai: PropTypes.string.isRequired,
        tempatAcara: PropTypes.string.isRequired,
        isiAcara: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    idTokoh: PropTypes.string.isRequired,
    condition: PropTypes.bool.isRequired,
    role: PropTypes.string.isRequired
};

export default PopUpDetailSurat;