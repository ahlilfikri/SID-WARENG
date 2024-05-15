import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../shared/layout/navBar';
import Footer from '../../shared/layout/footer';
import axios from 'axios';
import './index.css';

const Aspirasi = () => {
    const [data, setData] = useState({
        aspirasi: '',
        isPublish: false
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3557/api/v1/aspirasi', data);
            alert('Aspirasi berhasil dikirim');
        } catch (error) {
            console.error('Error posting aspirasi:', error);
            alert('Gagal mengirim aspirasi');
        }
    };

    const setPublishStatus = (status) => {
        setData({ ...data, isPublish: status });
    };

    return (
        <Fragment>
            <div className="container-fluid login-container p-0">
                <div className="container-fluid login-container-background p-0">
                    <NavBar type={1} />
                    <div className="row mt-0 mt-md-5">
                        <div className="col-1 col-md-2"></div>
                        <div className="col-10 col-md-8 mb-5">
                            <div className="card card-form-login pt-5">
                                <p className="text-center text-light" style={{ fontSize: '45px', fontWeight: 'bold' }}>ASPIRASI MASYARAKAT</p>
                                <p className="text-center text-light" style={{ fontSize: '20px' }}>Bangun desa wareng dengan saran dan masukan yang membangun demi kesejahteraan bersama</p>
                                <form onSubmit={onSubmit}>
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-10">
                                            <div className="mb-2">
                                                <p className="text-light mb-0" style={{ fontSize: '24px' }}>Aspirasi</p>
                                                <textarea
                                                    className="py-3 ps-3 text-dark"
                                                    style={{ width: '100%', borderRadius: '0.5vw' }}
                                                    placeholder="Masukkan Aspirasi Anda"
                                                    name="aspirasi"
                                                    value={data.aspirasi}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className="btn-warp">
                                                <div className="row">
                                                    <div className="col-2">
                                                        <button
                                                            type="button"
                                                            className="btn mt-4 mb-3 mb-sm-5 text-light px-5 py-2"
                                                            style={{ backgroundColor: '#00917C', fontSize: '24px', fontWeight: 'bold' }}
                                                            onClick={() => setPublishStatus(false)}
                                                        >
                                                            Publish
                                                        </button>
                                                    </div>
                                                    <div className="col-2">
                                                        <button
                                                            type="button"
                                                            className="btn mt-4 mb-3 mb-sm-5 text-light px-5 py-2"
                                                            style={{ backgroundColor: '#00917C', fontSize: '24px', fontWeight: 'bold' }}
                                                            onClick={() => setPublishStatus(true)}
                                                        >
                                                            Private
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn mt-4 mb-3 mb-sm-5 text-light px-5 py-2"
                                                    style={{ backgroundColor: '#00917C', fontSize: '24px', fontWeight: 'bold' }}
                                                >
                                                    Kirim
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-1 col-md-1"></div>
                    </div>
                    <Footer type="2" />
                </div>
            </div>
        </Fragment>
    );
};

export default Aspirasi;
