import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../../../shared/layout/footer";
import Navbar from "../../../../shared/layout/navBar";
import getToken from '../shared/functions';
import PopUpDetailSurat from '../components/PopUpDetailSurat';

const KasiPage = () => {
    const port = import.meta.env.VITE_BASE_API_URL2;
    const [DataKasi, setDataKasi] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition, setCondition] = useState(false);
    const [activeTab, setActiveTab] = useState('comming');
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('loading');

    const id = getToken();

    useEffect(() => {
        axios.get(`${port}v1/perangkatDesa/get/${id}`)
            .then((res) => {
                setDataKasi(res.data.data);
                setStatus('success');
            })
            .catch((err) => {
                console.error(err);
                setStatus('error');
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
                <Navbar className="" type={0}></Navbar>
                <h1 className='my-2 my-md-5'>Administrasi Kasi</h1>
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
                {status === 'loading' && <p>Loading...</p>}
                {status === 'error' && <p>Data tidak berhasil dimuat.</p>}
                {status === 'success' && (
                    <>
                        {activeTab === 'comming' && DataKasi.suratAcaraComing && DataKasi.suratAcaraComing.length > 0 ? renderTable(DataKasi.suratAcaraComing) : <p>Belum ada surat acara</p>}
                        {activeTab === 'pending' && DataKasi.suratAcaraPending && DataKasi.suratAcaraPending.length > 0 ? renderTable(DataKasi.suratAcaraPending) : <p>Belum ada surat yang tersedia</p>}
                        {activeTab === 'approved' && DataKasi.suratAcaraApproved && DataKasi.suratAcaraApproved.length > 0 ? renderTable(DataKasi.suratAcaraApproved) : <p>Belum ada surat yang tersedia</p>}
                        {activeTab === 'rejected' && DataKasi.suratAcaraRejected && DataKasi.suratAcaraRejected.length > 0 ? renderTable(DataKasi.suratAcaraRejected) : <p>Belum ada surat yang tersedia</p>}
                    </>
                )}
                <Footer type={3}></Footer>
            </div>
            {showModal && (
                <PopUpDetailSurat
                    surat={selectedSurat}
                    handleCloseModal={handleCloseModal}
                    idTokoh={DataKasi._id}
                    condition={condition}
                    role="pd"
                />
            )}
        </>
    );
};

export default KasiPage;
