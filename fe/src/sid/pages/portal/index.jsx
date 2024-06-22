import react, { Fragment } from 'react'
import Navbar from '../../../shared/layout/navBar'
import Footer from '../../../shared/layout/footer'
import './index.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Setting from '../../constant/carouselSertting';
import Image from './assets/fotoportal.png'

const Portal = () => {
    const data = [
        {
            tittle: "SINKAL",
            image: Image
        },
        {
            tittle: "SID",
            image: Image
        },
        {
            tittle: "SMART",
            image: Image
        },
        {
            tittle: "SIKS",
            image: Image
        },
        {
            tittle: "eHDW",
            image: Image
        }
    ]
    return (
        <Fragment>
            <div className="container-fluid portal-container p-0">
                <div className="container-fluid portal-container-background pb-3 pb-md-0 p-0">
                    <Navbar type={0}></Navbar>
                    <h1 className='text-center text-light pt-5 pb-2'>Portal Web Pemerintah Daerah</h1>
                    <Slider {...Setting}>
                        {data.map((item, index) => {
                            // const imageSrc = `http://localhost:3556/upload/${encodeURIComponent(item.img[0])}`;
                            return (
                                <div key={index}  >
                                    <div className="card portal-card m-3 py-4 mx-2" style={{ borderRadius: '1vw', border: '1px solid #00917C', transition: 'transform 0.3s ease' }}>
                                        <div className="row">
                                            <div className="col-1"></div>
                                            <div className="col-10">
                                                <img src={item.image} alt="" className='mx-auto'/>
                                                <p>{item.tittle}</p>
                                                <p className='text-dark'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
                                                <a>Baca lebih banyak</a>
                                            </div>
                                            <div className="col-1"></div>
                                        </div>
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            );
                        })}
                    </Slider>
                    <Footer type={3}></Footer>
                </div>
            </div>
        </Fragment>
    )
}
export default Portal