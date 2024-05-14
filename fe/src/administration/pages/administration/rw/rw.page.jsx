import {useState,useEffect } from 'react';
import axios from 'axios';
import './index.css';

import getToken from '../shared/functions';
import { Button } from 'react-bootstrap';

import PopUpDetailSurat from '../components/PopUpDetailSurat';

const RwPage = () => {
    const [DataRw, setDataRw] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition , setCondition] = useState(false);

    const id = getToken();

    useEffect(() => {
        axios.get(`http://localhost:3555/api/v1/rw/get/${id}`)
            .then((res) => {
                setDataRw(res.data.data);
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
    }

    const handleCloseModal = () => {
        setShowModal(false); 
        setSelectedSurat(null);
    }
    return(
        <>
            <div className="container-fluid">
                <h1>RW Page</h1>
                <div className="row">
                    <div className="col-12">
                        <h3>Surat Acara Comming</h3>
                        <div className="row">
                            {DataRw.suratAcaraComing && DataRw.suratAcaraComing.length > 0 ? (
                                DataRw.suratAcaraComing.map((surat, index) => (
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
                                    <p>Belum ada surat acara</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Pending</h3>
                        <div className="row">
                            {DataRw.suratAcaraPending && DataRw.suratAcaraPending.length > 0 ? (
                                DataRw.suratAcaraPending.map((surat, index) => (
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
                                <div className="col-12">
                                    <p>Belum ada surat acara</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <h3>Surat Acara Disetujui</h3>
                        <div className="row">
                            {DataRw.suratAcaraDisetujui && DataRw.suratAcaraDisetujui.length > 0 ? (
                                DataRw.suratAcaraDisetujui.map((surat, index) => (
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
                                    <p>Belum ada surat acara</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-12">
                        <h3>Surat Acara Ditolak</h3>
                        <div className="row">
                            {DataRw.suratAcaraDitolak && DataRw.suratAcaraDitolak.length > 0 ? (
                                DataRw.suratAcaraDitolak.map((surat, index) => (
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
                                    <p>Belum ada surat acara</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            {showModal && (
                <PopUpDetailSurat 
                    surat={selectedSurat}
                    handleCloseModal={handleCloseModal}
                    idTokoh={id}
                    condition={condition}
                    role = "rw"
                />
            )}
        
        </>
    )
}


export default RwPage;
