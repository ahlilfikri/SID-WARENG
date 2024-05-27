import { useState, useEffect } from 'react';
import axios from 'axios';
import FormPerizinanSurat from '../components/formPerizinanSurat';
import getToken from '../shared/functions';
import DetailSuratWarga from '../components/detailSuratWarga';
import Footer from "../../../../shared/layout/footer";
import Navbar from "../../../../shared/layout/navBar";

const WargaPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [DataWarga, setDataWarga] = useState([]);
    const [DataAspirasi, setDataAspirasi] = useState([]);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [searchQuerySurat, setSearchQuerySurat] = useState('');
    const [searchQueryAspirasi, setSearchQueryAspirasi] = useState('');
    const id = getToken();

    const GetDataWarga = async () => {
        try {
            const response = await axios.get(`http://localhost:3555/api/v1/warga/get/${id}`);
            setDataWarga(response.data.data);
        } catch (error) {
            console.error('Error getting data warga:', error);
        }
    };

    const GetDataAspirasiWarga = async () => {
        try {
            const response = await axios.get(`http://localhost:3557/api/v1/aspirasi/getAspirasi/my/${id}`);
            setDataAspirasi(response.data);
        } catch (error) {
            console.error('Error getting data warga:', error);
        }
    };

    const aspirasiDecider = (isPublish) => {
        return isPublish ? 'Untuk umum' : 'Untuk kades';
    }

    useEffect(() => {
        GetDataWarga();
        GetDataAspirasiWarga();
    }, [id]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        setShowDetail(true);
    };
    const handleCloseDetail = () => setShowDetail(false);

    const filteredSuratAcara = DataWarga.suratAcara?.filter(surat =>
        surat.jenisSurat.toLowerCase().includes(searchQuerySurat.toLowerCase())
    );

    const filteredAspirasi = DataAspirasi.filter(aspirasi =>
        aspirasi.aspirasi.toLowerCase().includes(searchQueryAspirasi.toLowerCase())
    );

    return (
        <>
            <div className="container-fluid">
                <Navbar className="" type={0}></Navbar>
                <h1 className='my-2 my-md-5'>Administrasi Warga</h1>
                <button className="btn btn-primary" onClick={handleShowModal}>
                    Tampilkan Form Perizinan Surat
                </button>

                <div className="mt-4">
                    <h3>Surat Acara</h3>
                    <input
                        type="text"
                        placeholder="Search Surat Acara"
                        value={searchQuerySurat}
                        onChange={(e) => setSearchQuerySurat(e.target.value)}
                        className="form-control mb-3"
                    />
                    {filteredSuratAcara && filteredSuratAcara.length > 0 ? (
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Jenis Surat</th>
                                    <th>Status Acara</th>
                                    <th>Status Persetujuan</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSuratAcara.map((surat, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{surat.jenisSurat}</td>
                                        <td>{surat.statusAcara}</td>
                                        <td>{surat.statusPersetujuan}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleShowDetail(surat)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <p>Belum ada surat acara</p>}
                </div>

                <div className="mt-4">
                    <h3>Aspirasi</h3>
                    <input
                        type="text"
                        placeholder="Search Aspirasi"
                        value={searchQueryAspirasi}
                        onChange={(e) => setSearchQueryAspirasi(e.target.value)}
                        className="form-control mb-3"
                    />
                    {filteredAspirasi && filteredAspirasi.length > 0 ? (
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Aspirasi</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAspirasi.map((aspirasi, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{aspirasi.aspirasi}</td>
                                        <td>{aspirasiDecider(aspirasi.isPublish)}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleShowDetail(aspirasi)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <p>Belum ada aspirasi</p>}
                </div>

                <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Form Perizinan Surat</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <FormPerizinanSurat />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {showDetail && (
                    <DetailSuratWarga
                        surat={selectedSurat}
                        handleCloseModal={handleCloseDetail}
                    />
                )}
                <Footer type={3}></Footer>
            </div>
        </>
    );
};

export default WargaPage;