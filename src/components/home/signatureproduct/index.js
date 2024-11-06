import React, { useState, useRef, useEffect } from "react";
import './signature.css'

const signature = [
    // {
    //     image: './images/signature-image.png',
    // },
    {
        image: './images/necklace1.png',
        heading: 'Beautiful necklace',
        price: '₹1,020,100.00'
    },
    {
        image: './images/earring1.png',
        heading: 'Beautiful Earring',
        price: '₹1,020,100.00'
    },
    {
        image: './images/bracelet1.png',
        heading: 'Beautiful BRACELET',
        price: '₹1,020,100.00'
    },
]

const SignatureProduct = () => {
    const defaultIndex = "";
    const [activeIndex, setActiveIndex] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [showSignature, setShowSignature] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    const handleMouseEnter = (index) => {
        setActiveIndex(index);
    };

    const handleMouseLeave = () => {
        setActiveIndex("");
    };

    const handleScroll = () => {
        if (hasShown) return;
        const scrollPosition = window.scrollY;
        const screenSection = document.querySelector('.signatureproduct-section');
        const screenSectionOffset = screenSection.offsetTop;

        if (scrollPosition > screenSectionOffset - window.innerHeight + 100) {
            setIsVisible(true);
            setShowSignature(true)
            setHasShown(true);
        } else {
            setIsVisible(false);
            setShowSignature(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasShown]);

    return (
        <div className="container-screen signature-screen">
            <div className="signature">
                <div className={`signature-product ${showSignature ? "show" : ""}`}>
                    <span>SIGNATURE PRODUCTS </span>
                    <h2 className="mt-3">ICONIC FORMS <br /> AND SHAPES</h2>
                </div>
                <div className={`signatureproduct-section ${isVisible ? 'fadeInScreen' : ''}`}>
                    <div className="signature-images">
                        {activeIndex === "" ? (
                            <div className="defaultsignature-image">
                                <div className="d-flex justify-content-center">
                                    <img src="./images/signature-image.png" alt="default" />
                                </div>
                            </div>
                        ) : (
                            signature?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`signature-image text-center ${index === activeIndex ? 'active' : ''}`}
                                >
                                    <div className="d-flex justify-content-center">
                                        <img src={item.image} alt="img" className="signature-img" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="featured-product">
                        <div className="col-lg-5 col-md-6 col-12">
                            <h4 className="mb-0">FEATURED PRODUCTS</h4>
                            {signature?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`featured ${index === activeIndex ? 'active' : ''}`}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="featured-content d-flex">
                                        <span>{index + 1}</span>
                                        <div>
                                            <h6>{item?.heading}</h6>
                                            <p className="mb-0 mt-3">{item?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignatureProduct;