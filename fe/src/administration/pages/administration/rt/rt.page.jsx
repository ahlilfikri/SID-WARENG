// rt.page.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import getToken from '../shared/functions';
import { Button } from 'react-bootstrap';

import PopUpDetailSurat from '../components/PopUpDetailSurat';

const RtPage = () => {
    const [DataRt, setDataRt] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition , setCondition] = useState(false);

    const id = getToken();
   
    useEffect(() => {
        axios.get(`http://localhost:3555/api/v1/rt/getRt/${id}`)
            .then((res) => {
                setDataRt(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        console.log(selectedSurat);
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

                        
                            {DataRt.suratAcaraPending && DataRt.suratAcaraPending.length > 0 ? (
                                DataRt.suratAcaraPending.map((surat, index) => (
                                    <div key={index} className="col-2">
                                        <Button 
                                            variant="none"
                                            onClick={
                                                () => {
                                                    handleShowDetail(surat)
                                                    setCondition(true);
                                                }
                                            
                                            }
                                        >
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{surat.nameAcara}</h5>
                                                    <p className="card-text">{surat.jenisSurat}</p>
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p>Tidak ada surat yang tersedia</p>
                            )}
                        </div>
                    </div>

                    <div className="col-12">
                        <h3>Surat Acara di setujui</h3>
                        <div className="row">
                           
                            {DataRt.suratAcaraApproved && DataRt.suratAcaraApproved.length > 0 ? (
                                DataRt.suratAcaraApproved.map((surat, index) => (
                                    <div key={index} className="col-2">
                                        <Button 
                                            variant="none"
                                            onClick={
                                                () => {
                                                    handleShowDetail(surat);
                                                    setCondition(false);
                                                }
                                            
                                            }
                                        >
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{surat.nameAcara}</h5>
                                                    <p className="card-text">{surat.jenisSurat}</p>
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p>Tidak ada surat yang disetujui</p>
                            )}
                        </div>
                    </div>

                    <div className="col-12">
                        <h3>Surat Acara di tolak</h3>
                        <div className="row">
                            {/* tamahkan pengondisian jika suratAcaraRejected kosong  */}
                            {DataRt.suratAcaraRejected && DataRt.suratAcaraRejected.length > 0 ? (
                                DataRt.suratAcaraRejected.map((surat, index) => (
                                    <div key={index} className="col-2">
                                        <Button 
                                            variant="none"
                                            onClick={() => {
                                                handleShowDetail(surat);
                                                setCondition(false);
                                            }
                                        
                                        }
                                        >
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{surat.nameAcara}</h5>
                                                    <p className="card-text">{surat.jenisSurat}</p>
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p>Tidak ada surat yang ditolak</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <PopUpDetailSurat surat={selectedSurat} handleCloseModal={handleCloseModal} idTokoh={DataRt._id} condition={condition} role="rt" />}
        </>
    );
};

export default RtPage;
