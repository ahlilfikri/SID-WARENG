import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import FormPerizinanSurat from '../components/formPerizinanSurat';
import getToken from '../shared/functions';
import axios from 'axios';
import DetailSuratWarga from '../components/detailSuratWarga';

const WargaPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [DataWarga, setDataWarga] = useState([]);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const id = getToken(); 
    console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:3555/api/v1/warga/get/${id}`)
            .then((res) => {
                setDataWarga(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        setShowDetail(true);
    };
    const handleCloseDetail = () => setShowDetail(false);

    return (
        <>
            <div className="container-fluid">
                <h1>Warga Page</h1>
                <Button variant="primary" onClick={handleShowModal}>
                    Tampilkan Form Perizinan Surat
                </Button>

                <div className="row">
                    <div className="col-12">
                        <h3>Surat Acara</h3>
                        {DataWarga.suratAcara && DataWarga.suratAcara.length > 0 ? (
                            DataWarga.suratAcara.map((surat, index) => (
                                <div key={index} className="col-2">
                                    <Button
                                        variant="none"
                                        onClick={() => handleShowDetail(surat)}
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{surat.jenisSurat}</h5>
                                                <p className="card-text">Status: {surat.statusAcara}</p>
                                                <p className="card-text">Status Persetujuan: {surat.statusPersetujuan}</p>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form Perizinan Surat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormPerizinanSurat />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Tutup
                        </Button>
                    </Modal.Footer>
                </Modal>

                {showDetail && (
                    <DetailSuratWarga
                        surat={selectedSurat}
                        handleCloseModal={handleCloseDetail}
                    />
                )}
            </div>
        </>
    );
};

export default WargaPage;
