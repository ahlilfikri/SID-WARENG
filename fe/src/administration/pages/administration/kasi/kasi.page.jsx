import {useState,useEffect } from 'react';
import axios from 'axios';
import './index.css';

import getToken from '../shared/functions';
import { Button } from 'react-bootstrap';

import PopUpDetailSurat from '../components/PopUpDetailSurat';

const KasiPage = () => {
    const [DataKasi, setDataKasi] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition , setCondition] = useState(false);

    const id = getToken();

    useEffect(() => {
        axios.get(`http://localhost:3555/api/v1/perangkatDesa/get/${id}`)
            .then((res) => {
                setDataKasi(res.data.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    } , []);

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
                <h1>Kasi Page</h1>
                <div className="row">
                    <div className="col-12">
                        <h3>Surat Acara Comming</h3>
                        <div className="row">
                            {DataKasi.suratAcaraComing && DataKasi.suratAcaraComing.length > 0 ? (
                                DataKasi.suratAcaraComing.map((surat, index) => (
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
                            ) : (
                                <div className="col-12">
                                    <h6>Belum ada surat acara</h6>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Pending</h3>
                        <div className="row">
                            {DataKasi.suratAcaraPending && DataKasi.suratAcaraPending.length > 0 ? (
                                DataKasi.suratAcaraPending.map((surat, index) => (
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
                                <h6>Belum ada surat yang tersedia</h6>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Approved</h3>
                        <div className="row">
                            {DataKasi.suratAcaraApproved && DataKasi.suratAcaraApproved.length > 0 ? (
                                DataKasi.suratAcaraApproved.map((surat, index) => (
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
                                <h6>Belum ada surat yang tersedia</h6>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Rejected</h3>
                        <div className="row">
                            {DataKasi.suratAcaraRejected && DataKasi.suratAcaraRejected.length > 0 ? (
                                DataKasi.suratAcaraRejected.map((surat, index) => (
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
                                <h6>Belum ada surat yang tersedia</h6>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <PopUpDetailSurat surat={selectedSurat} handleCloseModal={handleCloseModal} idTokoh={id} condition={condition} role="pd" />}
        
        </>
    )
}


export default KasiPage;
