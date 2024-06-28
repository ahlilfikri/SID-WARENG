import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import getToken from '../../../shared/functions/functions';
import PopUpDetailAspirasi from './component/PopUpDetailAspirasi'; // Import the new popup component

const AspirasiControl = () => {
    const [dataAspirasi, setDataAspirasi] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

    const id = getToken();

    const getDataAspirasi = async () => {
        try {
            const res = await axios.get('http://localhost:3557/api/v1/aspirasi/getAspirasiAdmin');
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
        getDataAspirasi();
    }, []);

    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSurat(null);
    };

    const handleSortChange = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = (data) => {
        return [...data].sort((a, b) => {
            if (sortConfig.key === 'date') {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (sortConfig.key === 'status') {
                const statusA = a.isPending;
                const statusB = b.isPending;
                return sortConfig.direction === 'asc' ? statusA - statusB : statusB - statusA;
            }
            return 0;
        });
    };

    const renderTable = (data) => {
        const filteredData = data.filter(item =>
            item.aspirasi.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const sortedFilteredData = sortedData(filteredData);

        return (
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Aspirasi</th>
                        <th>Jenis Surat</th>
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
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedFilteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.aspirasi}</td>
                            <td>{aspirasiDecider(item.isPublish)}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td>{pengajuanStatusDecider(item.isPending)}</td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleShowDetail(item)}
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
            <h1 className='my-2 my-md-5'>Administrasi Kepala Desa</h1>
            <div className="row">
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
            {dataAspirasi && renderTable(dataAspirasi)}
            {showModal && (
                <PopUpDetailAspirasi
                    surat={selectedSurat}
                    handleCloseModal={handleCloseModal}
                    refreshData={getDataAspirasi} // Pass the refresh function to the popup component
                />
            )}
        </>
    );
}

export default AspirasiControl;
