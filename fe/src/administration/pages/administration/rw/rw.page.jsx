import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Footer from "../../../../shared/layout/footer";
import Navbar from "../../../../shared/layout/navBar";
import getToken from '../shared/functions';
import PopUpDetailSurat from '../components/PopUpDetailSurat';

const RwPage = () => {
    const [DataRw, setDataRw] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [condition, setCondition] = useState(false);
    const [activeTab, setActiveTab] = useState('comming');
    const [searchQuery, setSearchQuery] = useState('');

    const id = getToken();

    useEffect(() => {
        axios.get(`http://localhost:3555/api/v1/rw/get/${id}`)
            .then((res) => {
                setDataRw(res.data.data);
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
                <Navbar className="" type={0}></Navbar>
                <h1 className='my-2 my-md-5'>Administrasi RW</h1>
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                        <select
                            className="form-select"
                            aria-label="Select Category"
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            <option value="comming">Surat Acara Comming</option>
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
                {activeTab === 'comming' && DataRw.suratAcaraComing && DataRw.suratAcaraComing.length > 0 ? renderTable(DataRw.suratAcaraComing) : <p>Belum ada surat acara</p>}
                {activeTab === 'pending' && DataRw.suratAcaraPending && DataRw.suratAcaraPending.length > 0 ? renderTable(DataRw.suratAcaraPending) : <p>Belum ada surat acara</p>}
                {activeTab === 'approved' && DataRw.suratAcaraApproved && DataRw.suratAcaraApproved.length > 0 ? renderTable(DataRw.suratAcaraApproved) : <p>Belum ada surat acara</p>}
                {activeTab === 'rejected' && DataRw.suratAcaraDitolak && DataRw.suratAcaraDitolak.length > 0 ? renderTable(DataRw.suratAcaraDitolak) : <p>Belum ada surat acara</p>}
                <Footer type={3}></Footer> 
            </div>
            {showModal && (
                <PopUpDetailSurat
                    surat={selectedSurat}
                    handleCloseModal={handleCloseModal}
                    idTokoh={id}
                    condition={condition}
                    role="rw"
                />
            )}
        </>
    );
};

export default RwPage;
