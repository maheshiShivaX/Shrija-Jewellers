import React, { useEffect, useState } from 'react';
import Banner from "./banner";
import Category from "./category";
import SignatureProduct from "./signatureproduct";
import Footer from "../layout/footer";
import './home.css';
import Favorites from "./favorites";
import About from "./about";

const shopProduct = [
    {
        image: './images/sale.png',
        btn: 'VIEW OFFERS'
    },
    {
        image: './images/design.png',
        btn: 'VIEW OFFERS'
    },
    {
        image: './images/finger.png',
        btn: 'VIEW OFFERS'
    },
]

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    const handleScroll = () => {
        if (hasShown) return;
        const scrollPosition = window.scrollY;
        const screenSection = document.querySelector('.shop-product');
        const screenSectionOffset = screenSection.offsetTop;

        if (scrollPosition > screenSectionOffset - window.innerHeight + 100) {
            setIsVisible(true);
            setHasShown(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasShown]);

    return (
        <div>
            <Banner />
            <div className="home-main">
                <Category />
                <SignatureProduct />
                <div className={`container-screen shop-product ${isVisible ? 'fadeInScreen' : ''}`}>
                    <div className="shop-boxs d-md-flex">
                        {shopProduct?.map((item, index) => (
                            <div className="box col-md-4" key={index}>
                                <div className="box-content">
                                    <div className="offer-btn">
                                        <span>{item.btn}</span>
                                    </div>
                                </div>
                                <div className="box-image">
                                    <img src={item.image} className="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Favorites />
                <About />
            </div>
            <Footer />
        </div>
    )
}

export default Home;