import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import getToken from '../shared/functions';
import PopUpDetailSurat from '../components/PopUpDetailSurat';

const KadesPage = () => {
    const [DataKades, setDataKades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition, setCondition] = useState(false);
    const [dataAspirasi, setDataAspirasi] = useState([]);
    const [activeTab, setActiveTab] = useState('comming');
    const [searchQuery, setSearchQuery] = useState('');

    const id = getToken();

    const getDataKades = async () => {
        try {
            const res = await axios.get(`http://localhost:3555/api/v1/pimpinanDesa/get/kades/${id}`);
            setDataKades(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getDataAspirasi = async () => {
        try {
            const res = await axios.get(`http://localhost:3557/api/v1/aspirasi/getAspirasiKades`);
            setDataAspirasi(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const aspirasiDecider = (isPublish) => {
        return isPublish ? 'Untuk Umum' : 'Untuk Kades';
    };

    useEffect(() => {
        getDataKades();
        getDataAspirasi();
    }, [id]);

    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSurat(null);
    };

    const renderTable = (data, isAspirasi = false) => {
        const filteredData = data.filter(item => 
            (isAspirasi ? item.aspirasi : item.nameAcara).toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{isAspirasi ? 'Aspirasi' : 'Nama Acara'}</th>
                        <th>Jenis Surat</th>
                        <th>{isAspirasi ? 'Status' : 'Action'}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{isAspirasi ? item.aspirasi : item.nameAcara}</td>
                            <td>{isAspirasi ? aspirasiDecider(item.isPublish) : item.jenisSurat}</td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        handleShowDetail(item);
                                        setCondition(!isAspirasi && activeTab === 'pending');
                                    }}
                                    style={{backgroundColor:'#00917C'}}
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <>
            <div className="container-fluid">
                <h1>Administrasi Kepala Desa</h1>
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <select
                            className="form-select"
                            aria-label="Select Category"
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            <option value="comming">Surat Acara Comming</option>
                            <option value="pending">Surat Acara Pending</option>
                            <option value="approved">Surat Acara Approved</option>
                            <option value="rejected">Surat Acara Rejected</option>
                            <option value="aspirasi">Aspirasi</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                {activeTab === 'comming' && DataKades.suratAcaraComing && renderTable(DataKades.suratAcaraComing)}
                {activeTab === 'pending' && DataKades.suratAcaraPending && renderTable(DataKades.suratAcaraPending)}
                {activeTab === 'approved' && DataKades.suratAcaraApproved && renderTable(DataKades.suratAcaraApproved)}
                {activeTab === 'rejected' && DataKades.suratAcaraRejected && renderTable(DataKades.suratAcaraRejected)}
                {activeTab === 'aspirasi' && dataAspirasi && renderTable(dataAspirasi, true)}
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
    );
}

export default KadesPage;
