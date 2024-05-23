import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import getToken from '../shared/functions';
import PopUpDetailSurat from '../components/PopUpDetailSurat';

const RtPage = () => {
    const [DataRt, setDataRt] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition, setCondition] = useState(false);
    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');

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
    }, [id]);

    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSurat(null);
    };

    const renderTable = (data) => {
        const filteredData = data.filter(surat =>
            surat.nameAcara.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Acara</th>
                        <th>Jenis Surat</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((surat, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{surat.nameAcara}</td>
                            <td>{surat.jenisSurat}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        handleShowDetail(surat);
                                        setCondition(activeTab === 'pending');
                                    }}
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
                <h1>RT Page</h1>
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <select
                            className="form-select"
                            aria-label="Select Category"
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            <option value="pending">Surat Acara Pending</option>
                            <option value="approved">Surat Acara Disetujui</option>
                            <option value="rejected">Surat Acara Ditolak</option>
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
                {activeTab === 'pending' && DataRt.suratAcaraPending && DataRt.suratAcaraPending.length > 0 ? renderTable(DataRt.suratAcaraPending) : <p>Tidak ada surat yang tersedia</p>}
                {activeTab === 'approved' && DataRt.suratAcaraApproved && DataRt.suratAcaraApproved.length > 0 ? renderTable(DataRt.suratAcaraApproved) : <p>Tidak ada surat yang disetujui</p>}
                {activeTab === 'rejected' && DataRt.suratAcaraRejected && DataRt.suratAcaraRejected.length > 0 ? renderTable(DataRt.suratAcaraRejected) : <p>Tidak ada surat yang ditolak</p>}
            </div>
            {showModal && (
                <PopUpDetailSurat
                    surat={selectedSurat}
                    handleCloseModal={handleCloseModal}
                    idTokoh={id}
                    condition={condition}
                    role="rt"
                />
            )}
        </>
    );
};

export default RtPage;
