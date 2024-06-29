import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../../../shared/layout/footer";
import Navbar from "../../../../shared/layout/navBar";
import getToken from '../shared/functions';
import PopUpDetailSurat from '../components/PopUpDetailSurat';


const KadesPage = () => {
    const port = import.meta.env.VITE_BASE_API_URL2;
    const port2 = import.meta.env.VITE_BASE_API_URL3;
    const [DataKades, setDataKades] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [selectedJenisSurat, setSelectedJenisSurat] = useState('');
    const [condition, setCondition] = useState(false);
    const [dataAspirasi, setDataAspirasi] = useState([]);
    const [activeTab, setActiveTab] = useState('comming');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

    const id = getToken();

    const getDataKades = async () => {
        try {
            const res = await axios.get(`${port}v1/pimpinanDesa/get/kades/${id}`);
            setDataKades(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getDataAspirasi = async () => {
        try {
            const res = await axios.get(`${port2}v1/aspirasi/getAspirasiKades`);
            setDataAspirasi(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const aspirasiDecider = (isPublish) => {
        return isPublish ? 'Untuk Umum' : 'Untuk Kades';
    };

    const pengajuanStatusDecider = (isPending) => {
        return isPending ? 'Pending' : 'Selesai';
    };

    useEffect(() => {
        getDataKades();
        getDataAspirasi();
    }, [id]);

    const handleShowDetail = (surat, jenisSurat) => {
        setSelectedSurat(surat);
        setSelectedJenisSurat(jenisSurat);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSurat(null);
        setSelectedJenisSurat('');
    };

    const refreshData = () => {
        if (activeTab === 'aspirasi') {
            getDataAspirasi();
        } else {
            getDataKades();
        }
    };

    const handleSortChange = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = (data, isAspirasi) => {
        return [...data].sort((a, b) => {
            if (sortConfig.key === 'date') {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (sortConfig.direction === 'asc') {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            } else if (sortConfig.key === 'status') {
                const statusA = isAspirasi ? a.isPending : a.status;
                const statusB = isAspirasi ? b.isPending : b.status;
                if (sortConfig.direction === 'asc') {
                    return statusA - statusB;
                } else {
                    return statusB - statusA;
                }
            }
            return 0;
        });
    };

    const renderTable = (data, isAspirasi = false) => {
        const filteredData = data.filter(item =>
            (isAspirasi ? item.aspirasi : item.nameAcara).toLowerCase().includes(searchQuery.toLowerCase())
        );
        const sortedFilteredData = sortedData(filteredData, isAspirasi);

        return (
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{isAspirasi ? 'Aspirasi' : 'Nama Acara'}</th>
                        <th>Jenis Surat</th>
                        {isAspirasi && (
                            <>
                                <th>
                                    <button type="button" onClick={() => handleSortChange('date')}>
                                        Tanggal {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                    </button>
                                </th>
                                <th>
                                    <button type="button" onClick={() => handleSortChange('status')}>
                                        Status Pengajuan {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                                    </button>
                                </th>
                            </>
                        )}
                        <th>{isAspirasi ? 'Status' : 'Action'}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFilteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{isAspirasi ? item.aspirasi : item.nameAcara}</td>
                            <td>{isAspirasi ? aspirasiDecider(item.isPublish) : item.jenisSurat}</td>
                            {isAspirasi && <td>{new Date(item.createdAt).toLocaleDateString()}</td>}
                            {isAspirasi && <td>{pengajuanStatusDecider(item.isPending)}</td>}
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        handleShowDetail(item, isAspirasi ? 'aspirasi' : item.jenisSurat);
                                        setCondition(!isAspirasi && activeTab === 'pending');
                                    }}
                                    style={{ backgroundColor: '#00917C' }}
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
                <h1 className='my-2 my-md-5'>Administrasi Kepala Desa</h1>
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
                <Footer type={3}></Footer> 
            </div>
            {showModal && (
                <PopUpDetailSurat
                    surat={selectedSurat}
                    jenisSurat={selectedJenisSurat}
                    handleCloseModal={handleCloseModal}
                    idTokoh={DataKades._id}
                    condition={condition}
                    role="pp"
                    activeTab={activeTab}
                    refreshData={refreshData}
                />
            )}
        </>
    );
}

export default KadesPage;
