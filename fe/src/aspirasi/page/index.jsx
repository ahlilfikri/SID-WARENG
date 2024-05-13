import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../shared/layout/navBar'
import Footer from '../../shared/layout/footer'
import axios from 'axios';
import './index.css';

const Aspirasi = () => {

    return (
        <Fragment>
            <div className="container-fluid login-container p-0 ">
                <div className="container-fluid login-container-background p-0 ">
                    <NavBar type={1}/>
                    <div className="row mt-0 mt-md-5">
                        <div className="col-1 col-md-2"></div>
                        <div className="col-10 col-md-8 mb-5">
                            <div className="card card-form-login pt-5 ">
                                <p className='text-center text-light' style={{ fontSize: '45px', fontWeight: 'bold' }}>ASPIRASI MASYARAKAT</p>
                                <p className='text-center text-light' style={{ fontSize: '20px' }}>Bangun desa wareng dengan saran dan masukan yang membangun demi kesejahteraan bersama</p>
                                <form onSubmit={e => onSubmit(e)}>
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-10">
                                            <div className="mb-2">
                                                <p className="text-light mb-0" style={{ fontSize: '24px' }} >Aspirasi</p>
                                                <textarea
                                                    className='py-3 ps-3 text-dark'
                                                    style={{ width: '100%', borderRadius: '0.5vw' }}
                                                    type="text"
                                                    placeholder="Masukkan Aspirasi Anda"
                                                    name="name"
                                                />
                                            </div>
                                            <div className="btn-warp">
                                                <button
                                                    type="submit"
                                                    className='btn mt-4 mb-3 mb-sm-5 text-light px-5 py-2'
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
                    <Footer type="2"/>
                </div>
            </div>
        </Fragment >
    )
}

export default Aspirasi;
