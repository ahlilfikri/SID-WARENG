// rt.page.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import getToken from '../shared/functions';
import { Button } from 'react-bootstrap';

import PopUpDetailSurat from '../components/PopUpDetailSurat';

const RtPage = () => {
    const [dataSurat, setDataSurat] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);

    const id = getToken();

    const getData = async () => {
        axios.get(`http://localhost:3555/api/v1/rt/getRt/${id}`)
            .then((res) => {
                setDataSurat(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        setShowModal(true); 
    };

    const handleCloseModal = () => {
        setShowModal(false); 
        setSelectedSurat(null);
    };

    return (
        <>
            <div className="container-fluid">
                <h1>RT Page</h1>
                <div className="row">
                    <div className="col-12">
                        <h3>Surat Acara Pending</h3>
                        <div className="row">
                            {dataSurat.suratAcaraPending && dataSurat.suratAcaraPending.map((surat, index) => (
                                <div key={index} className="col-2">
                                    <Button 
                                        variant="none"
                                        onClick={() => handleShowDetail(surat)}
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{surat.nameAcara}</h5>
                                                <p className="card-text">{surat.jenisSurat}</p>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12">
                        <h3>Surat Acara di setujui</h3>
                        <div className="row">
                            {dataSurat.suratAcaraApproved && dataSurat.suratAcaraApproved.map((surat, index) => (
                                <div key={index} className="col-2">
                                    <Button 
                                        variant="none"
                                        onClick={() => handleShowDetail(surat)}
                                    >
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">{surat.nameAcara}</h5>
                                                <p className="card-text">{surat.jenisSurat}</p>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <PopUpDetailSurat surat={selectedSurat} handleCloseModal={handleCloseModal} />}
        </>
    );
};

export default RtPage;
