import React, { useEffect, useRef } from 'react';
import Header from "../../layout/header";
import './baner.css';
import { Link } from 'react-router-dom';

const Banner = () => {
    const bannerRef = useRef(null);

    useEffect(() => {
      if (bannerRef.current) {
        bannerRef.current.classList.add('fadeInBanner');
      }
    }, []);

    return (
        <>
            <div className="mobile-header" style={{ backgroundColor: "#000000" }}>
                <Header />
            </div>
            <div className="banner" ref={bannerRef}>
                <div className="desktop-header">
                    <Header />
                </div>
                <div className="container-screen">
                    <div className="banner-content">
                        <div className="banner-top">
                            {/* <h4>Longest then life</h4> */}
                            <span><img src="./images/banner-text-logo.png" className="longest-text" /></span>
                            <div className="banner-heading col-xl-7 col-md-8 col-sm-7 col-12">
                                <div className="banner-text-head">
                                    <h2>Newest Diamond Best Collection</h2>
                                </div>
                            </div>
                        </div>
                        <div className="banner-description">
                            <p className="col-lg-5 col-sm-6 col-12">Discover timeless elegance and exquisite craftsmanship at our jewelry website. From stunning engagement rings to captivating necklaces, our collection offers a blend of classic sophistication and modern allure. Explore our range of meticulously curated pieces, perfect for adding a touch of glamour to any occasion.</p>
                        </div>
                        <div className="bannerbtn d-flex justify-content-center">
                            {/* background-image: url("../../../../public/images/Vector.png"); */}
                            <button>
                                <Link to="/productslist">
                                    <span> DISCOVER OUR PRODUCTS</span>
                                    <div className="arrow-down">
                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 5V19" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19.5 12L12.5 19L5.5 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    {/* <div>
                                        <img src="./images/Vector.png" />
                                    </div> */}
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;