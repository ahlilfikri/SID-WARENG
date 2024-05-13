import { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Instagram from "../../assets/LogoIconInstagramFooter.png";
import Google from "../../assets/LogoIconGoogleFooter.png";
import Facebook from "../../assets/LogoIconFacebookFooter.png";
import ImageTentang from './component/imageTentang';
import axios from 'axios';

const port = import.meta.env.VITE_BASE_API_URL;

const Tentang = () => {
    const [data, setData] = useState([]);

    const GetFromAPI = async () => {
        try {
            const response = await axios.get(`${port}v1/informasi/get-informasi`);
            setData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        GetFromAPI();
    }, []);

    return (
        <Fragment>
            <div className="container-fluid tentang-container mt-3 mt-md-5 mb-3 mb-md-5">
                <div className="row">
                    {data[0]?.img.map((item, index) => {
                        const imageSrc = `http://localhost:3555/upload/${encodeURIComponent(item)}`;
                        return (
                            <div className="col-12 col-md-4 p-0">
                                <ImageTentang Foto={imageSrc} />
                            </div>
                        )
                    })}
                    <div className="mt-3 mt-md-5">
                        <p style={{ fontSize: '48px', fontWeight: 'bold' }}>Desa <span style={{ color: '#005F51' }}>Wareng</span></p>
                        {data.length > 0 && (
                            <p style={{ fontSize: '20px', color: '#184D47', maxWidth: '80%', textAlign: 'justify' }}>{data[0].content}</p>
                        )}
                        <div className="d-flex justify-content-between">
                            <Link style={{ fontSize: '16px', color: '#00BF7C' }}>Baca lebih banyak</Link>
                            <div className="d-flex">
                                <img className="mx-1 mx-md-2" src={Instagram} alt="" />
                                <img className="mx-1 mx-md-2" src={Google} alt="" />
                                <img className="mx-1 mx-md-2" src={Facebook} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Tentang;
