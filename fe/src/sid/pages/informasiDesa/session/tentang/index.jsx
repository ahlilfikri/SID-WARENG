import { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Instagram from "../../assets/LogoIconInstagramFooter.png";
import Google from "../../assets/LogoIconGoogleFooter.png";
import Facebook from "../../assets/LogoIconFacebookFooter.png";
import ImageTentang from './component/imageTentang';
import axios from 'axios';

const port = import.meta.env.VITE_BASE_API_URL;
const port2 = import.meta.env.VITE_BASE_API_URL4;

const Tentang = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('loading');

    const GetFromAPI = async () => {
        try {
            const response = await axios.get(`${port}v1/informasi/get-informasi`);
            setData(response.data.data);
            setStatus('success');
        } catch (error) {
            console.log(error.message);
            setStatus('error');
        }
    };

    useEffect(() => {
        GetFromAPI();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid tentang-container mt-3 mt-md-5 mb-3 mb-md-5">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'error' && <p>Data tidak berhasil dimuat.</p>}
                {status === 'success' && (
                    <div className="row p-0">
                        {data[0]?.img.map((item, index) => {
                            const imageSrc = `${port2}${encodeURIComponent(item)}`;
                            return (
                                <div className="col-12 col-md-4 p-0 px-md-3" key={index}>
                                    <ImageTentang Foto={imageSrc} />
                                </div>
                            )
                        })}
                        <div className="col-12 col-md-8 mt-3 mt-md-0">
                            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>Desa <span style={{ color: '#005F51' }}>Wareng</span></p>
                            {data.length > 0 && (
                                <p style={{ fontSize: '20px', color: '#184D47', maxWidth: '80%', textAlign: 'justify' }}>{data[0].content}</p>
                            )}
                            <div className="d-flex justify-content-between">
                                <Link to="/full-article" style={{ fontSize: '16px', color: '#00BF7C' }}>Baca lebih banyak</Link>
                                <div className="d-flex">
                                    <img className="mx-1 mx-md-2" src={Instagram} alt="Instagram" />
                                    <img className="mx-1 mx-md-2" src={Google} alt="Google" />
                                    <img className="mx-1 mx-md-2" src={Facebook} alt="Facebook" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default Tentang;
