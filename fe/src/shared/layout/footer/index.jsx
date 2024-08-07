import react, { Fragment } from "react";
import Logo from "./assets/LogoInsideWarengFooter.png";
import Instagram from "./assets/LogoIconInstagramFooter.png";
import Google from "./assets/LogoIconGoogleFooter.png";
import Facebook from "./assets/LogoIconFacebookFooter.png";
import { Link } from 'react-router-dom';

const Footer = ({ type }) => {
    return (
        <Fragment>
            {type == "1" &&
                <footer className="mt-auto mx-auto" style={{overflow:'hidden'}}>
                    <div className="container pb-5">
                        <div className="row">
                            <div className="col-12 text-center d-block d-md-flex">
                                <Link style={{ color: 'white', textDecoration: 'none' }}>Hubungi Petugas Desa</Link>
                                <div className="social-wrap">
                                    <a href="https://www.instagram.com/desawareng/"><img className="mx-1 mx-md-2" src={Instagram} alt="" /></a>
                                    <a href="https://maps.app.goo.gl/a7hadzg6Qsodr9RA9"><img className="mx-1 mx-md-2" src={Google} alt="" /></a>
                                    <a href="https://www.facebook.com/masyarakatdesawareng/"><img className="mx-1 mx-md-2" src={Facebook} alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            }
            {(type == "2" || type == "3") &&
                <footer className="mt-auto mx-auto" style={{overflow:'hidden'}}>
                    <div className="container-fluid py-4  " style={{ background: type == 2 ? '#052F2A' : '#ffff', minWidth: '100vw' }}>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-10 d-flex justify-content-between">
                                <div className="logo-wrap d-flex">
                                    <img src={Logo} alt="gambar logo Wareng" />
                                    <p></p>
                                </div>
                                <div className="social-wrap d-flex pe-3">
                                    <a href="https://www.instagram.com/desawareng/"><img className="mx-1 mx-md-2" src={Instagram} alt="" /></a>
                                    <a href="https://maps.app.goo.gl/a7hadzg6Qsodr9RA9"><img className="mx-1 mx-md-2" src={Google} alt="" /></a>
                                    <a href="https://www.facebook.com/masyarakatdesawareng/"><img className="mx-1 mx-md-2" src={Facebook} alt="" /></a>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                </footer>
            }
        </Fragment>
    )
}

export default Footer;
