import {useState,useEffect } from 'react';
import axios from 'axios';
import './index.css';

import getToken from '../shared/functions';
import { Button } from 'react-bootstrap';

import PopUpDetailSurat from '../components/PopUpDetailSurat';

const KadesPage = () => {
    const [DataKades, setDataKades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition , setCondition] = useState(false);
    const [dataAspirasi, setDataAspirasi] = useState([])

    const id = getToken();

    const getDataKades = async () => {
        axios.get(`http://localhost:3555/api/v1/pimpinanDesa/get/kades/${id}`)
        .then((res) => {
            setDataKades(res.data.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    // http://localhost:3557/api/v1/aspirasi/getAspirasiKades
    const getDataAspirasi = async () => {
        axios.get(`http://localhost:3557/api/v1/aspirasi/getAspirasiKades`)
        .then((res) => {
            setDataAspirasi(res.data);  
        })
        .catch((err) => {
            console.error(err);
        });
    }

    const aspirasiDecider = (isPublish) => {
        // jika aspirasi true
        if (isPublish === true) {
            return 'untuk umum'
        }else{
            return 'untuk kades'
        }
    }

    useEffect(() => {
        getDataKades();
        getDataAspirasi();
    }, [id]);

    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        console.log(selectedSurat);
        setShowModal(true); 
    }

    const handleCloseModal = () => {
        setShowModal(false); 
        setSelectedSurat(null);
    }

    return(
        <>
            <div className="container-fluid">
                <h1>Kades Page</h1>
                <div className="row">
                    <div className="col-12">
                        <h3>Surat Acara Comming</h3>
                        <div className="row">
                            {DataKades.suratAcaraComing && DataKades.suratAcaraComing.length > 0 ? (
                                DataKades.suratAcaraComing.map((surat, index) => (
                                    <div key={index} className="col-2">
                                        <Button 
                                            variant="none"
                                            onClick={
                                                () => {
                                                    handleShowDetail(surat)
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
                            ) : null}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Pending</h3>
                        <div className="row">
                            {DataKades.suratAcaraPending && DataKades.suratAcaraPending.length > 0 ? (
                                DataKades.suratAcaraPending.map((surat, index) => (
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
                            ) : null}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Approved</h3>
                        <div className="row">
                            {DataKades.suratAcaraApproved && DataKades.suratAcaraApproved.length > 0 ? (
                                DataKades.suratAcaraApproved.map((surat, index) => (
                                    <div key={index} className="col-2">
                                        <Button 
                                            variant="none"
                                            onClick={
                                                () => {
                                                    handleShowDetail(surat)
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
                            ) : null}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Rejected</h3>
                        <div className="row">
                            {DataKades.suratAcaraRejected && DataKades.suratAcaraRejected.length > 0 ? (
                                DataKades.suratAcaraRejected.map((surat, index) => (
                                    <div key={index} className="col-2">
                                        <Button 
                                            variant="none"
                                            onClick={
                                                () => {
                                                    handleShowDetail(surat)
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
                            ) : null}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            <h3>Aspirasi</h3>
                            {dataAspirasi && dataAspirasi.length > 0 ? (
                                dataAspirasi.map((aspirasi, index) => (
                                    <div key={index} className="col-2">
                                        <Button 
                                            variant="none"
                                            onClick={
                                                () => {
                                                    handleShowDetail(aspirasi)
                                                    setCondition(false);
                                                }
                                            }
                                        >
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{aspirasi.aspirasi}</h5>
                                                    <p className="card-text">Status: {aspirasiDecider(aspirasi.isPublishs)}</p>
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <PopUpDetailSurat 
                    surat={selectedSurat}
                    handleCloseModal={handleCloseModal}
                    idTokoh={DataKades._id}
                    condition={condition}
                    role="pp"
                />
            )}
        </>
    )
}


export default KadesPage;
