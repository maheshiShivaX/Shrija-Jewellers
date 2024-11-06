import React, { useEffect, useState } from 'react';
import './footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    const [hasShown, setHasShown] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        if (hasShown) return;
        const scrollPosition = window.scrollY;
        const screenSection = document.querySelector('.footer');
        const screenSectionOffset = screenSection.offsetTop;

        if (scrollPosition > screenSectionOffset - window.innerHeight + 100) {
            setIsVisible(true)
            setHasShown(true);
        } else {
            setIsVisible(false)
        }
    };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);

    //     handleScroll();

    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [hasShown]);

    return (
        <div className="footer-main pt-5">
            <div className="container-screen">
                <div className="footer">
                    <div className={`footer-topsection ${isVisible ? 'show' : ''}`}>
                        <span>{`{ A lot of exciting things are happening, subscribe to our newsletter to find out more }`}</span>
                        <h2>Do you want to know more?</h2>
                    </div>
                    <div className="email-section d-flex justify-content-between align-items-center">
                        <div className={`email-input col-lg-9 col-7 ${isVisible ? 'show' : ''}`}>
                            <input type="text" className="" placeholder="Email Address" />
                        </div>
                        <div className={`subscribe ${isVisible ? 'show' : ''}`}>
                            <button>
                                <span>subscribe</span>
                            </button>
                        </div>
                    </div>
                    <div className='scroll-window-footer'>
                        <div className="footer-bottom d-lg-flex">
                            <div className={`bottom-content col-lg-4 ${isVisible ? 'show' : ''}`}>
                                <div className="logo">
                                    <img src="./images/logo.png" alt="" />
                                </div>
                                <p className="footer-description mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                                <div className="footer-details desktopfooter">
                                    <div className="location">
                                        <div>
                                            <span className="icon">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.773 13.023L9 17.7959L4.22703 13.023C1.59099 10.3869 1.59099 6.11307 4.22703 3.47703C6.86307 0.84099 11.1369 0.84099 13.773 3.47703C16.409 6.11307 16.409 10.3869 13.773 13.023ZM9 9.75C9.82845 9.75 10.5 9.07845 10.5 8.25C10.5 7.42157 9.82845 6.75 9 6.75C8.17155 6.75 7.5 7.42157 7.5 8.25C7.5 9.07845 8.17155 9.75 9 9.75Z" fill="white" />
                                                </svg>
                                            </span>
                                        </div>
                                        <span>Located In Gold Land Building Deira Shop No G-24</span>
                                    </div>
                                    <div className="contact">
                                        <div>
                                            <span className="icon">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.75 12.315V14.9671C15.75 15.3608 15.4456 15.6875 15.0529 15.7153C14.7248 15.7384 14.4572 15.75 14.25 15.75C7.62255 15.75 2.25 10.3774 2.25 3.75C2.25 3.54278 2.26159 3.27515 2.28476 2.94713C2.31253 2.55441 2.6392 2.25 3.03289 2.25H5.68508C5.87758 2.25 6.03882 2.39582 6.05815 2.58735C6.0755 2.7593 6.09163 2.89735 6.10655 3.00151C6.25826 4.06104 6.56815 5.06952 7.01152 6.00227C7.08269 6.15199 7.03628 6.33119 6.90139 6.42754L5.28266 7.58385C6.26814 9.88583 8.11417 11.7319 10.4162 12.7174L11.5703 11.1014C11.6679 10.9649 11.8492 10.918 12.0007 10.9899C12.9334 11.4329 13.9418 11.7425 15.0012 11.8938C15.1047 11.9087 15.2419 11.9246 15.4126 11.9419C15.6042 11.9612 15.75 12.1225 15.75 12.315Z" fill="white" />
                                                </svg>
                                            </span>
                                        </div>
                                        <span>+91 - 9051080120</span>
                                    </div>
                                    <div className="email">
                                        <div>
                                            <span className="icon">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.25 2.25H15.75C16.1642 2.25 16.5 2.58579 16.5 3V15C16.5 15.4142 16.1642 15.75 15.75 15.75H2.25C1.83579 15.75 1.5 15.4142 1.5 15V3C1.5 2.58579 1.83579 2.25 2.25 2.25ZM9.04545 8.76218L4.23541 4.67828L3.26458 5.82172L9.05482 10.7378L14.7408 5.81712L13.7592 4.68288L9.04545 8.76218Z" fill="white" />
                                                </svg>
                                            </span>
                                        </div>
                                        <span>jouelbyeshita@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`footer-links d-flex col-lg-8 ${isVisible ? 'show' : ''}`}>
                                <div className="links col-lg-6 col-md-6 col-5 d-lg-flex justify-content-center">
                                    <div>
                                        <h4>LINK</h4>
                                        <div className="f-link">
                                            <Link to="">Home</Link>
                                        </div>
                                        <div className="f-link">
                                            <Link to="">Shop</Link>
                                        </div>
                                        <div className="f-link">
                                            <Link to="">About</Link>
                                        </div>
                                        <div className="f-link">
                                            <Link to="">Contact</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="information col-md-6 col-7 d-flex justify-content-center">
                                    <div>
                                        <h4>INFORMATION</h4>
                                        <div className="f-link">
                                            <Link to="">Privacy Policy</Link>
                                        </div>
                                        <div className="f-link">
                                            <Link to="">FAQ</Link>
                                        </div>
                                        <div className="f-link">
                                            <Link to="">Delivery</Link>
                                        </div>
                                        <div className="f-link">
                                            <Link to="">Blog</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <img src="./images/footerring.png" alt="ring" className="footerring"/> */}
                        </div>
                        <div className="footer-details mobilefooter">
                            <div className="location">
                                <div>
                                    <span className="icon">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.773 13.023L9 17.7959L4.22703 13.023C1.59099 10.3869 1.59099 6.11307 4.22703 3.47703C6.86307 0.84099 11.1369 0.84099 13.773 3.47703C16.409 6.11307 16.409 10.3869 13.773 13.023ZM9 9.75C9.82845 9.75 10.5 9.07845 10.5 8.25C10.5 7.42157 9.82845 6.75 9 6.75C8.17155 6.75 7.5 7.42157 7.5 8.25C7.5 9.07845 8.17155 9.75 9 9.75Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                                <span>Located In Gold Land Building Deira Shop No G-24</span>
                            </div>
                            <div className="contact">
                                <div>
                                    <span className="icon">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.75 12.315V14.9671C15.75 15.3608 15.4456 15.6875 15.0529 15.7153C14.7248 15.7384 14.4572 15.75 14.25 15.75C7.62255 15.75 2.25 10.3774 2.25 3.75C2.25 3.54278 2.26159 3.27515 2.28476 2.94713C2.31253 2.55441 2.6392 2.25 3.03289 2.25H5.68508C5.87758 2.25 6.03882 2.39582 6.05815 2.58735C6.0755 2.7593 6.09163 2.89735 6.10655 3.00151C6.25826 4.06104 6.56815 5.06952 7.01152 6.00227C7.08269 6.15199 7.03628 6.33119 6.90139 6.42754L5.28266 7.58385C6.26814 9.88583 8.11417 11.7319 10.4162 12.7174L11.5703 11.1014C11.6679 10.9649 11.8492 10.918 12.0007 10.9899C12.9334 11.4329 13.9418 11.7425 15.0012 11.8938C15.1047 11.9087 15.2419 11.9246 15.4126 11.9419C15.6042 11.9612 15.75 12.1225 15.75 12.315Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                                <span>+91 - 9051080120</span>
                            </div>
                            <div className="email">
                                <div>
                                    <span className="icon">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.25 2.25H15.75C16.1642 2.25 16.5 2.58579 16.5 3V15C16.5 15.4142 16.1642 15.75 15.75 15.75H2.25C1.83579 15.75 1.5 15.4142 1.5 15V3C1.5 2.58579 1.83579 2.25 2.25 2.25ZM9.04545 8.76218L4.23541 4.67828L3.26458 5.82172L9.05482 10.7378L14.7408 5.81712L13.7592 4.68288L9.04545 8.76218Z" fill="white" />
                                        </svg>
                                    </span>
                                </div>
                                <span>jouelbyeshita@gmail.com</span>
                            </div>
                        </div>
                        <div className="webname text-md-center">
                            <span>© 2024 JOUEL BY ESHITA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;