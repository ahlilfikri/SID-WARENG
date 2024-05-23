import { useState, useEffect } from 'react';
import axios from 'axios';

import getToken from '../../../administration/pages/administration/shared/functions';

const AdminAspirasiPage = () => {
    const [dataAdmin, setDataAdmin] = useState(null);
    const [dataAspirasi, setDataAspirasi] = useState([]);
    const [wargaNames, setWargaNames] = useState({});
    const [isLoading, setIsLoading] = useState(true); // State to handle loading

    const id = getToken();

    const getAspirasi = async () => {
        try {
            const res = await axios.get('http://localhost:3557/api/v1/aspirasi/getAspirasiAdmin');
            setDataAspirasi(res.data);
            console.log('get aspirasi admin [line 21]:', res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const cutString = (string) => {
        if (string.length > 20) {
            return string.substring(0, 20) + '...';
        }
        return string;
    };

    const tanggalFormat = (tanggal) => {
        const date = new Date(tanggal);
        return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getAdmin = async () => {
        try {
            const res = await axios.get(`http://localhost:3556/api/v1/admin/get-admin/${id}`);
            setDataAdmin(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchWargaName = async (idWarga) => {
        if (!wargaNames[idWarga]) {
            try {
                const res = await axios.get(`http://localhost:3555/api/v1/user/get/${idWarga}`);
                if (res.data && res.data.data && res.data.data.name) {
                    console.log(res.data.data.name);
                    setWargaNames(prevNames => ({ ...prevNames, [idWarga]: res.data.data.name }));
                } else {
                    console.error(`Name not found for warga ID: ${idWarga}`);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getAspirasi();
            await getAdmin();
            setIsLoading(false); // Set loading to false after data is fetched
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (dataAspirasi.length > 0) {
            dataAspirasi.forEach(data => {
                fetchWargaName(data.wargaId);
            });
        }
    }, [dataAspirasi]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Aspirasi Page</h1>
            <div className="row">
                {
                    dataAspirasi.map((data, index) => (
                        <div key={index} className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{cutString(data.aspirasi)}</h5>
                                    <p className="card-text">
                                        author: {wargaNames[data.wargaId] || 'Loading...'}
                                    </p>
                                    <p className="card-text">{tanggalFormat(data.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AdminAspirasiPage;
