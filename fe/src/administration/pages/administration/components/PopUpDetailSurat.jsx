import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BypassSurat from './bypassSurat';
import axios from 'axios';
import { format } from 'date-fns';
import idLocale from 'date-fns/locale/id';

const PopUpDetailSurat = ({ surat, handleCloseModal, idTokoh, role, activeTab }) => {
    const [detailSurat, setDetailSurat] = useState(null);

    useEffect(() => {
        const fetchDetailSurat = async () => {
            try {
                const jenis_surat = surat.jenisSurat.replace(/\s/g, '_');
                const subSuratId = surat.subSuratId;
                const request = await axios.get(`${port}v1/surat/get/detail-surat/${subSuratId}/${jenis_surat}`);
                setDetailSurat(request.data.data);
            } catch (err) {
                console.error("Error fetching detail surat: ", err);
            }
        };

        fetchDetailSurat();
    }, [surat.jenisSurat, surat.subSuratId]);

    const handlePersetujuanSurat = async (statusPersetujuan) => {
        console.log(statusPersetujuan);
        try {
            const request = await axios.put(`${port}v1/surat/persetujuan-surat-acara-${role}/${idTokoh}/${surat._id}`, {
                statusPersetujuanReq: statusPersetujuan
            });
            console.log(request);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    const BypassController = (role) => {
        if (role === 'rt') {
            return 'rt';
        } else if (role === 'rw') {
            return 'rw';
        } else if (role === 'pd' || role === 'pp') {
            return 'pd';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd-MMMM-yyyy', { locale: idLocale });
    };

    return (
        <Modal show={true} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Detail Surat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Nama Acara: {surat.nameAcara}</p>
                <p>Jenis Surat: {surat.jenisSurat}</p>
                <p>Tanggal Mulai: {formatDate(surat.tanggalMulai)}</p>
                <p>Tanggal Selesai: {formatDate(surat.tanggalSelesai)}</p>
                <p>Tempat Acara: {surat.tempatAcara}</p>
                <p>Isi Acara:</p>
                <ul>
                    {surat.isiAcara.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <p>Detail Surat:</p>
                {detailSurat ? (
                    <ul>
                        {Object.entries(detailSurat)
                            .filter(([key]) => key !== '_id' && key !== '__v')
                            .map(([key, value], index) => (
                                <li key={index}>
                                    {key}: {Array.isArray(value) ? value.join(', ') : value.toString()}
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Tutup
                </Button>
                <div>
                    <Button variant="success" onClick={() => {
                        handlePersetujuanSurat(true);
                        handleCloseModal();
                    }}>
                        Setujui
                    </Button>
                    <Button variant="danger" onClick={() => {
                        handlePersetujuanSurat(false);
                        handleCloseModal();
                    }}>
                        Tolak
                    </Button>
                </div>
                {activeTab !== 'approved' && activeTab !== 'rejected' && <BypassSurat suratAcaraId={surat._id} role={BypassController(role)} />}
            </Modal.Footer>
        </Modal>
    );
};

PopUpDetailSurat.propTypes = {
    surat: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nameAcara: PropTypes.string.isRequired,
        jenisSurat: PropTypes.string.isRequired,
        tanggalMulai: PropTypes.string.isRequired,
        tanggalSelesai: PropTypes.string.isRequired,
        tempatAcara: PropTypes.string.isRequired,
        isiAcara: PropTypes.arrayOf(PropTypes.string).isRequired,
        subSuratId: PropTypes.string.isRequired,
    }).isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    idTokoh: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    activeTab: PropTypes.string
};

export default PopUpDetailSurat;
