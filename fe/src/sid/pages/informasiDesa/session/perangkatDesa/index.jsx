import { Fragment, useState, useEffect } from "react";
import Setting from '../../../../constant/carouselSertting2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import ImageError from '../../../../../assets/ImageErrorHandling.svg';

const port = import.meta.env.VITE_BASE_API_URL2;

const PerangkatDesa = () => {
    const [data, setData] = useState([]);

    const GetFromAPI = async () => {
        try {
            const response = await axios.get(`${port}v1/perangkatDesa/get`);
            // const response = await axios.get(`${port}v1/user/get`);
            console.log(response);
            setData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const FilteredData = async () => {
        try {
            data
        } catch (error) {
            console.log(error.message);
        }
    };

    const roleToString = (role) => {
        switch (role) {
            case 1:
                return 'Warga';
            case 2:
                return 'RW';
            case 3:
                return 'RT';
            case 4:
                return 'Perangkat Desa';
            case 5:
                return 'Kades';
            default:
                return 'Unknown';
        }
    };

    useEffect(() => {
        GetFromAPI();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid perangkat-desa-container mb-0 mb-md-5">
                <p>Perangkat Desa</p>
                <Slider {...Setting}>
                    {data.map((item, index) => {
                        const imageSrc = `http://localhost:3556/upload/${encodeURIComponent(item.img)}`;
                        return (
                            <div key={index} style={{ borderRadius: '1vw', border: '1px solid #00917C' }}>
                                <div key={index}  >
                                    <div className="card perangkat-desa-card mx-2" style={{ borderRadius: '1vw', border: '1px solid #00917C', transition: 'transform 0.3s ease', minWidth: '30vw' }} >
                                        <div className="row p-0">
                                            <div className="col-5 ms-2p-0">
                                                <img src={imageSrc} alt="" style={{ height: '100%', width: '100%', objectFit: 'cover', borderTopLeftRadius: '1vw', borderBottomLeftRadius: '1vw' }} onError={(e) => { e.target.src = ImageError; }} />
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="content ">
                                                    <p style={{ fontFamily: 'poppins', fontWeight: 'bold', fontSize: '27px' }}>{item.user.name}</p>
                                                    <p style={{ fontFamily: 'poppins', fontSize: '14px' }}>{roleToString(item.user.role)}</p>
                                                    <p style={{ fontFamily: 'poppins', fontWeight: 'bold', fontSize: '16px', textAlign: 'justify' }}>{item.status}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </Fragment>
    )
}

export default PerangkatDesa;
