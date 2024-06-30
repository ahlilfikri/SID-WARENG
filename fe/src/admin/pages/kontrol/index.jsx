import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ModalTambahUser from './component/modal_add_user';
import ModalTambahRt from './component/modal_add_rt';
import ModalTambahRw from './component/modal_add_rw'; 
import ModalTambahPd from './component/modal_add_pd';
import ModalTambahKades from './component/modal_add_kades';

const KontrolPengguna = () => {
    const [totalData, setTotalData] = useState({});
    const [totalSurat, setTotalSurat] = useState({});
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalRt, setShowModalRt] = useState(false); 
    const [showModalRw, setShowModalRw] = useState(false);
    const [showModalPd, setShowModalPd] = useState(false);
    const [showModalKades, setShowModalKades] = useState(false);


    const countUser = async () => {
        try {
            const response = await axios.get('http://localhost:3555/api/v1/admin/count-all-document');
            setTotalData(response.data); 
        } catch (error) {
            console.error(error);
        }
    };

    const countsuratAdministrasi = async () => {
        try {
            const response = await axios.get('http://localhost:3555/api/v1/admin/count-all-surat-acara');
            setTotalSurat(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        countUser();
        countsuratAdministrasi();
    }, []);

    const handleShowUserModal = () => setShowModalUser(true);
    const handleCloseUserModal = () => setShowModalUser(false);
    const handleShowRtModal = () => setShowModalRt(true); 
    const handleCloseRtModal = () => setShowModalRt(false);
    const handleShowRwModal = () => setShowModalRw(true);
    const handleCloseRwModal = () => setShowModalRw(false);
    const handleShowPdModal = () => setShowModalPd(true);
    const handleClosePdModal = () => setShowModalPd(false);
    const handleShowKadesModal = () => setShowModalKades(true);
    const handleCloseKadesModal = () => setShowModalKades(false);

    return (
        <>
            <h1 className='my-2 my-md-5'>Daftar Portal</h1>
            <div className="container bg-secondary p-3">
                <div className="row">
                    <div className="col-4 m-1 d-block">
                        <p>User</p>
                        <p>{totalData.totalUser}</p>
                    </div>
                    <div className="col-4 m-1">
                        <p>Rt</p>
                        <p>{totalData.totalRt}</p>
                    </div>
                    <div className="col-4 m-1">
                        <p>Rw</p>
                        <p>{totalData.totalRw}</p>
                    </div>
                    <div className="col-4 m-1">
                        <p>Perangkat Desa</p>
                        <p>{totalData.totalPerangkatDesa}</p>
                    </div>
                    <div className="col-4 m-1">
                        <p>Kades</p>
                        <p>{totalData.totalPimpinanDesa}</p>
                    </div>
                    <div className="col-4 m-1">
                        <p>Surat Administrasi</p>
                        <p>{totalSurat.totalSurat}</p>
                    </div>
                </div>
            </div>
            <div className="container bg-secondary p-3">
                <Button variant="primary" onClick={handleShowUserModal}>
                    Tambah User
                </Button>
                <Button variant="primary" onClick={handleShowRtModal}>
                    Tambah RT
                </Button>
                <Button variant="primary" onClick={handleShowRwModal}>
                    Tambah RW
                </Button>
                <Button variant="primary" onClick={handleShowPdModal}>
                    Tambah Perangkat Desa
                </Button>
                <Button variant="primary" onClick={handleShowKadesModal}>
                    Tambah Kades
                </Button>
            </div>

            <ModalTambahUser show={showModalUser} handleClose={handleCloseUserModal} />
            <ModalTambahRt show={showModalRt} handleClose={handleCloseRtModal} /> 
            <ModalTambahRw show={showModalRw} handleClose={handleCloseRwModal} />
            <ModalTambahPd show={showModalPd} handleClose={handleClosePdModal} />
            <ModalTambahKades show={showModalKades} handleClose={handleCloseKadesModal} />
        </>
    );
};

export default KontrolPengguna;
