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
    const [DataAspirasi, setDataAspirasi] = useState([]);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const id = getToken(); 
    console.log(id);

    const GetDataWarga = async () => {
        try {
            const response = await axios.get(`http://localhost:3555/api/v1/warga/get/${id}`);
            setDataWarga(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.error('Error getting data warga:', error);
        }
    };

    // http://localhost:3557/api/v1/aspirasi/getAspirasi/my/:id

    const GetDataAspirasiWarga = async () => {
        try {
            const response = await axios.get(`http://localhost:3557/api/v1/aspirasi/getAspirasi/my/${id}`);
            setDataAspirasi(response.data);
        } catch (error) {
            console.error('Error getting data warga:', error);
        }
    };

    const aspirasiDecider = (isPublish) => {
        // jika aspirasi true
        if (isPublish === true) {
            return 'untuk umum'
        }else{
            return 'untuk kades'
        }
    }



    useEffect(() => {
        GetDataWarga();
        GetDataAspirasiWarga();
    }, [id]);


    console.log(DataAspirasi);
 




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
                    <div className="row">
                        <h3>asprasi</h3>
                        {
                        DataAspirasi && DataAspirasi.length > 0 ? (
                            DataAspirasi.map((aspirasi, index) => (
                                
                                <div key={index} className="col-2">
                                    <Button
                                        variant="none"
                                        onClick={() => handleShowDetail(aspirasi)}
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{aspirasi.aspirasi}</h5>
                                                <p className="card-text">
                                                    Status: {aspirasiDecider(aspirasi.isPublish)}
                                                </p>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            ))
                        ) : null}
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
