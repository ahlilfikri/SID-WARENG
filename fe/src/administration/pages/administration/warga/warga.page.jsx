import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import FormPerizinanSurat from '../components/formPerizinanSurat';

const WargaPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div className="container-fluid">
                <h1>Warga Page</h1>
                <Button variant="primary" onClick={handleShowModal}>
                    Tampilkan Form Perizinan Surat
                </Button>

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
            </div>
        </>
    );
};

export default WargaPage;
