import { useEffect, useState } from 'react';
import axios from 'axios';

const KontrolPengguna = () => {
    const [totalData, setTotalData] = useState({});
    const [totalSurat, setTotalSurat] = useState({});

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
    }

    useEffect(() => {
        countUser();
        countsuratAdministrasi();
    }, []);

    return (
        <>
            <h1 className='my-2 my-md-5'>Daftar Portal</h1>
            <div className="container">
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
        </>
    );
};

export default KontrolPengguna;
