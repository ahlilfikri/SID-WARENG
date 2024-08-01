import { useState, useEffect } from 'react';
import Navbar from "../../../../shared/layout/navBar";
import Sidebar from "../../../../shared/layout/sideBar";
import './wargaPage.css';
import axios from 'axios';
import getToken from '../shared/functions';
import DetailSuratWarga from '../components/detailSuratWarga';
import FormPencatatanKependudukan from '../components/formSubSuratPerizinan/form_pencatatanKependudukan';
import FormSuratKuasaAktaKematian from '../components/formSubSuratPerizinan/form_suratKuasaAktaKematian';
import FormSuratIzinBepergian from '../components/formSubSuratPerizinan/form_SuratIzinBepergian';
import FormSuratIzinKeramaian from '../components/formSubSuratPerizinan/form_SuratIzinKeramaian';
import FormSuratKeteranganKelahiran from '../components/formSubSuratPerizinan/form_SuratKeteranganKelahiran';
import FormSuratSKCK from '../components/formSubSuratPerizinan/form_SuratSKCK';
import FormSuratBantuanSosial from '../components/formSubSuratPerizinan/form_SuratBantuanSosial';
import FormSuratKeteranganNikah from '../components/formSubSuratPerizinan/form_SuratKeteranganNikah';
import ContainerDataSurat from '../components/containerDataSurat';
import ContainerDataAspirasi from '../components/containerDataAspirasi';
import DetailAspirasi from '../components/detailAspirasi';

const TestPage = () => {
    const port = import.meta.env.VITE_BASE_API_URL3;
    const port2 = import.meta.env.VITE_BASE_API_URL2;
    const [isShrinkView, setIsShrinkView] = useState(false);
    const [selectedContent, setSelectedContent] = useState('administrasi');
    const [showModal, setShowModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [DataWarga, setDataWarga] = useState({});
    const [DataAspirasi, setDataAspirasi] = useState([]);
    const [statusSurat, setStatusSurat] = useState('loading');
    const [statusAspirasi, setStatusAspirasi] = useState('loading');
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [selectedForm, setSelectedForm] = useState(null);
    const [searchQuerySurat, setSearchQuerySurat] = useState('');
    const [searchQueryAspirasi, setSearchQueryAspirasi] = useState('');
    const [dataLengkapSurat, setDataLengkapSurat] = useState({});
    const [showDetailAspirasi, setShowDetailAspirasi] = useState(false);
    const [selectedAspirasi, setSelectedAspirasi] = useState(null);

    // const [arsipSurat, setArsipSurat] = useState('');

    const id = getToken();
    const [idWarga, setIdWarga] = useState('')

    const GetDataWarga = async () => {
        try {
            const response = await axios.get(`${port}warga/get/${id}`);
            setDataWarga(response.data.data);
            setDataLengkapSurat({ "data": response.data.data.suratAcara });
            setIdWarga(response.data.data._id)
            setStatusSurat('success');
        } catch (error) {
            console.error('Error getting data warga:', error);
            setStatusSurat('error');
        }
    };

    const GetDataAspirasiWarga = async () => {
        try {
            const response = await axios.get(`${port2}aspirasi/getAspirasi/${idWarga}`);
            setDataAspirasi(response.data.data);
            setStatusAspirasi('success');
        } catch (error) {
            console.error('Error getting data aspirasi:', error);
            setStatusAspirasi('error');
        }
    };

    // http://localhost:3555/api/v1/surat/archive/:suratAcaraId
    const handleArsipSurat = async (idSuratAcara) => {
        try {
            const response = await axios.put(`${port}surat/archive/${idSuratAcara}`);
        } catch (err) {
            console.error('Error archiving surat:', err);
        }
    };

    const aspirasiDecider = (isPublish) => {
        return isPublish ? 'Untuk umum' : 'Untuk kades';
    }

    const pengajuanStatusDecider = (isPending) => {
        return isPending ? 'Pending' : 'Selesai';
    }

    useEffect(() => {
        GetDataWarga();
        if (idWarga) {
            GetDataAspirasiWarga();
        }
    }, [idWarga]);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedForm(null);
    };
    const handleShowDetail = (surat) => {
        setSelectedSurat(surat);
        setShowDetail(true);
    };
    const handleCloseDetail = () => setShowDetail(false);

    const handleShowDetailAspirasi = (surat) => {
        setSelectedAspirasi(surat);
        setShowDetailAspirasi(true);
    };

    const handleDownloadPdf = async (idSuratAcara, nameAcara) => {
        try {
            const response = await axios.get(`${port}surat/get/generatePdf/${idSuratAcara}`, {
                responseType: 'blob',
            });

            if (response.status !== 200) {
                throw new Error(`Failed to download PDF. Status code: ${response.status}`);
            }

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Surat_${nameAcara}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Error downloading pdf:', err);
        }
    };

    const filteredSuratAcara = DataWarga.suratAcara?.filter(surat =>
        surat.jenisSurat.toLowerCase().includes(searchQuerySurat.toLowerCase())
    );

    const filteredAspirasi = DataAspirasi.filter(aspirasi =>
        aspirasi.aspirasi.toLowerCase().includes(searchQueryAspirasi.toLowerCase())
    );

    const renderContent = () => {
        if (selectedContent === 'administrasi') {
            return (
                <div className="container-test-page " style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                    {/* surat  */}
                    <h3>Surat Acara</h3>
                    <input
                        type="text"
                        placeholder="Search Surat Acara"
                        value={searchQuerySurat}
                        onChange={(e) => setSearchQuerySurat(e.target.value)}
                        className="form-control mb-3"
                    />
                    {statusSurat === 'loading' && <p>Loading...</p>}
                    {statusSurat === 'error' && <p>Data tidak berhasil dimuat.</p>}
                    {statusSurat === 'success' && filteredSuratAcara && filteredSuratAcara.length > 0 ? (
                        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                                    {
                                        filteredSuratAcara
                                            .filter(surat => !surat.isArchive)  // Filter out archived items
                                            .map((surat, index) => (
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
                                                        <button
                                                            className="btn btn-secondary ms-2"
                                                            onClick={() => handleDownloadPdf(surat._id, surat.nameAcara)}
                                                        >
                                                            unduh PDF
                                                        </button>
                                                        <button
                                                            className="btn btn-warning ms-2"
                                                            onClick={() => handleArsipSurat(surat._id)}
                                                        >
                                                            arsip
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : <p>Belum ada surat acara</p>}
                    <button className="btn btn-primary ms-1" onClick={handleShowModal}>
                        Tampilkan Form Perizinan Surat
                    </button>
                    <ContainerDataSurat DataAllSurat={{ "data": dataLengkapSurat }} />
                </div>
            );
        } else if (selectedContent === 'aspirasi') {
            return (
                <div className="container-test-page " style={{ padding: '20px', borderRadius: '10px', width: '100%' }}>
                    <h3>Aspirasi</h3>
                    <input
                        type="text"
                        placeholder="Search Aspirasi"
                        value={searchQueryAspirasi}
                        onChange={(e) => setSearchQueryAspirasi(e.target.value)}
                        className="form-control mb-3"
                    />
                    {statusAspirasi === 'loading' && <p>Loading...</p>}
                    {statusAspirasi === 'error' && <p>Data tidak berhasil dimuat.</p>}
                    {statusAspirasi === 'success' && filteredAspirasi.length > 0 ? (
                        <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <table className="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Aspirasi</th>
                                        <th>Status</th>
                                        <th>Status Pengajuan</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAspirasi.map((aspirasi, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{aspirasi.aspirasi}</td>
                                            <td>{aspirasiDecider(aspirasi.isPublish)}</td>
                                            <td>{pengajuanStatusDecider(aspirasi.isPending)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleShowDetailAspirasi(aspirasi)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : <p>Belum ada aspirasi</p>}
                    <ContainerDataAspirasi DataAllAspirasi={{ "data": DataAspirasi }} />
                </div>
            );
        }
    };
    

    return (
        <div className="container-fluid" style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
            <div className="warping-navbar" style={{ zIndex: 100, position: 'fixed', top: 0, right: 0, width: '100%' }}>
                <Navbar />
            </div>
            <div className="warping-sidebar " style={{ zIndex: 0, position: 'fixed', left: -10, top: 110, height: '70vh' }}>
                <Sidebar
                    isShrinkView={isShrinkView}
                    setIsShrinkView={setIsShrinkView}
                    setSelectedContent={setSelectedContent}
                />
            </div>
            <div className="content mt-3 mt-md-5 pt-5 py-5" style={{ marginTop: '10%', marginLeft: isShrinkView ? '20px' : '240px', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                <div className="warping-container mt-5" style={{ overflowY: 'auto', height: '100%', width: '100%' }}>
                    {renderContent()}
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
                                {selectedForm === null && (
                                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormPencatatanKependudukan')}>Form Pencatatan Kependudukan</button>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormSuratKuasaAktaKematian')}>Form Surat Kuasa Akta Kematian</button>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormSuratIzinBepergian')}>Form Surat Izin Bepergian</button>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormSuratIzinKeramaian')}>Form Surat Izin Keramaian</button>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormSuratKeteranganKelahiran')}>Form Surat Keterangan Kelahiran</button>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormSuratSKCK')}>Form Surat SKCK</button>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormSuratBantuanSosial')}>Form Surat Bantuan Sosial</button>
                                        <button className="btn btn-primary my-1" onClick={() => setSelectedForm('FormSuratKeteranganNikah')}>Form Surat Keterangan Nikah</button>
                                    </div>
                                )}

                                {selectedForm === 'FormPencatatanKependudukan' && (
                                    <FormPencatatanKependudukan handleCloseModal={handleCloseModal} />
                                )}
                                {selectedForm === 'FormSuratKuasaAktaKematian' && (
                                    <FormSuratKuasaAktaKematian handleCloseModal={handleCloseModal} />
                                )}
                                {selectedForm === 'FormSuratIzinBepergian' && (
                                    <FormSuratIzinBepergian handleCloseModal={handleCloseModal} />
                                )}
                                {selectedForm === 'FormSuratIzinKeramaian' && (
                                    <FormSuratIzinKeramaian handleCloseModal={handleCloseModal} />
                                )}
                                {selectedForm === 'FormSuratKeteranganKelahiran' && (
                                    <FormSuratKeteranganKelahiran handleCloseModal={handleCloseModal} />
                                )}
                                {selectedForm === 'FormSuratSKCK' && (
                                    <FormSuratSKCK handleCloseModal={handleCloseModal} />
                                )}
                                {selectedForm === 'FormSuratBantuanSosial' && (
                                    <FormSuratBantuanSosial handleCloseModal={handleCloseModal} />
                                )}
                                {selectedForm === 'FormSuratKeteranganNikah' && (
                                    <FormSuratKeteranganNikah handleCloseModal={handleCloseModal} />
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Tutup
                                </button>
                            </div>
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
            {showDetailAspirasi && (
                <DetailAspirasi
                    aspirasi={selectedAspirasi}
                    handleCloseModal={() => setShowDetailAspirasi(false)}
                />
            )}
        </div>
    );
};

export default TestPage;
