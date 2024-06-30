import { Fragment, useState, useEffect } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import axios from 'axios';
import getSettings from '../../../../constant/carouselSertting';


const AspirasiDesa = () => {
    const port = import.meta.env.VITE_BASE_API_URL3;
    const [data, setData] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const [status, setStatus] = useState('');

    const GetFromAPI = async () => {
        setStatus('loading');
        try {
            const response = await axios.get(`${port}v1/aspirasi/getAspirasiApproved`);
            const data = response.data;
            setData(data);

            if (data.length === 1) {
                setSlidesToShow(1);
            } else if (data.length === 2) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
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
            <div className="container-fluid aspirasi-desa-container mb-0 mb-md-5">
                <p>Aspirasi Desa</p>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'error' && <p>Data tidak berhasil dimuat.</p>}
                {status === 'success' && data.length === 0 && (
                    <p>Belum ada data yang ditambahkan</p>
                )}
                {status === 'success' && data.length > 0 &&(
                    <Slider {...getSettings(slidesToShow)}>
                        {data.map((item, index) => (
                            <div key={index}>
                                <div className="card aspirasi-desa-card m-3 py-4 mx-2" style={{ borderRadius: '1vw', border: '1px solid #00917C', transition: 'transform 0.3s ease' }}>
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-10">
                                            <div className="content pt-4">
                                                <p style={{ fontFamily: 'poppins', fontWeight: 'bold', fontSize: '20px' }}>{item.aspirasi}</p>
                                                <p style={{ fontFamily: 'poppins', fontSize: '16px', textAlign: 'justify' }}>{item.kategori}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1"></div>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </Fragment>
    )
}

export default AspirasiDesa;
