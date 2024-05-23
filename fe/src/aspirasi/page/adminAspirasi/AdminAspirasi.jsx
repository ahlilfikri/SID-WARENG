import {useState,useEffect } from 'react';
import axios from 'axios';

import getToken from '../../../administration/pages/administration/shared/functions';

const AdminAspirasiPage = () => {
    const [dataAdmin, setDataAdmin] = useState([]);
    const [dataAspirasi, setDataAspirasi] = useState([]);

    const id = getToken();

    console.log(id);

    const getAspirasi = async () => {
        try {
            const res = await axios.get(`http://localhost:3557/api/v1/aspirasi/getAspirasiAdmin`);
            setDataAspirasi(res.data);
            console.log('get aspirasi admin [line 21] :', res.data.data)
        } catch (err) {
            console.error(err);
        }
    }

    const getAdmin = async () => {
        try{
            const res = await axios.get(`http://localhost:3556/api/v1/admin/get-admin/${id}`);
            setDataAdmin(res);
            console.log('get admin  [line 31]:', res.data.data);

        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getAspirasi();
        getAdmin();
    }
    , [id]);

    

    
    return(
        <>
        <div className="container">
            <h1>Aspirasi Page</h1>
            <div className="row">
                {

                   
                    dataAspirasi.map((data, index) => (
                        <div key={index} className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{data.aspirasi}</h5>
                                    <p className="card-text">{data.isidata}</p>
                                    <p className="card-text">{data.tanggalAspirasi}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default AdminAspirasiPage;
