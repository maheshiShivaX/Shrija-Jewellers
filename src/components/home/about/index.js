import React, { useState ,useEffect} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './about.css';

const aboutData = [
    {
        name: 'Certificate',
        image: './images/certificate.png',
        Heading: 'Certificate',
        description: 'A renowned and trusted jewellery shop, guarantees the authenticity and quality of all the exquisite pieces of jewellery purchased from our store.'
    },
    {
        name: '24 Carat Gold',
        image: './images/gold.png',
        Heading: '24 Carat Gold',
        description: 'Every piece of jewellery is meticulously inspected to meet the highest standards of quality and craftsmanship.'
    },
    {
        name: 'Top Diamond',
        image: './images/diamond.png',
        Heading: 'Top Diamond',
        description: 'We are committed to delivering nothing but the finest diamonds, ethically sourced and masterfully cut to perfection.'
    },
    {
        name: 'Authenticity',
        image: './images/authenticity.png',
        Heading: 'Authenticity',
        description: 'Discover the allure of authentic craftsmanship and responsibly-sourced gemstones in our exquisite jewelry collection. '
    },
]

const About = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showAbout, setShowAbout] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    const handleMenuClick = (index) => {
        setActiveIndex(index);
    };
 
    const handleScroll = () => {
        if (hasShown) return;
        const scrollPosition = window.scrollY;
        const screenSection = document.querySelector('.about');
        const screenSectionOffset = screenSection.offsetTop;

        if (scrollPosition > screenSectionOffset - window.innerHeight + 100) {
            setShowAbout(true)
            setHasShown(true);
        } else {
            setShowAbout(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasShown]);

    return (
        <div className={`container-screen about ${showAbout ? 'show' : ''}`} >
            <div>
                <div className="about-section-heading text-center">
                    <h4>{`{ ABOUT Jouel By Eshita }`}</h4>
                </div>
                <div className="about-content d-flex justify-content-between">
                    <div className="side-scrollbar">
                        <div className="scrollbar">
                            {aboutData?.map((item, index) => (
                                <div key={index}
                                    className={`scroll-menu ${index === activeIndex ? 'active' : ''}`}
                                    onClick={() => handleMenuClick(index)}>

                                    <span>----</span>
                                    <span className="scrollmenu-name">{item?.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="vertical-slider mt-5 col-10 ">
                        {aboutData?.map((item, index) => (
                            <div key={index} className={`about-data ${index === activeIndex ? 'active' : ''}`}>
                                <div className="about-boxin">
                                    <div className="certificate-image">
                                        <img src={item?.image} alt="certificate" />
                                    </div>
                                    <div className="section-box col-lg-7 col-sm-9">
                                        <div className="certificate-black-box">
                                            <h2>{item?.Heading}</h2>
                                            <span>{item?.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;

{/* <div className="about-data">
<div>
    <img src="./images/certificate.png" alt="certificate" />
</div>
<div className="section-box col-4">
    <div className="certificate-black-box">
        <h2>Certificate</h2>
        <span>A renowned and trusted jewellery shop, guarantees the authenticity and quality of all the exquisite pieces of jewellery purchased from our store.</span>
    </div>
</div>
</div> */}