import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ModalTambahUser from './component/modal_add_user';
import ModalTambahRt from './component/modal_add_rt'; 

const KontrolPengguna = () => {
    const [totalData, setTotalData] = useState({});
    const [totalSurat, setTotalSurat] = useState({});
    const [showModalUser, setShowModalUser] = useState(false);
    const [showModalRt, setShowModalRt] = useState(false); // State untuk ModalTambahRt

    const countUser = async () => {
        try {
            const response = await axios.get('http://localhost:3555/api/v1/admin/count-all-document');
            console.log(response.data); 
            setTotalData(response.data); 
        } catch (error) {
            console.error(error);
        }
    };

    const countsuratAdministrasi = async () => {
        try {
            const response = await axios.get('http://localhost:3555/api/v1/admin/count-all-surat-acara');
            console.log(response.data); 
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
    const handleShowRtModal = () => setShowModalRt(true); // Fungsi untuk menampilkan ModalTambahRt
    const handleCloseRtModal = () => setShowModalRt(false); // Fungsi untuk menutup ModalTambahRt

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
            </div>

            <ModalTambahUser show={showModalUser} handleClose={handleCloseUserModal} />
            <ModalTambahRt show={showModalRt} handleClose={handleCloseRtModal} /> {/* Render ModalTambahRt */}
        </>
    );
};

export default KontrolPengguna;
