import React, { useState, useEffect } from "react";
import './header.css';
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { get_cart_Data } from '../../../redux/action';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const dispatch = useDispatch();

    const cartData = useSelector((state) => state.cartReducer.cart);

    const SJloginId = localStorage.getItem('SJloginId');
    const user = localStorage.getItem('user');

    const getTotalQuantity = () => {
        return cartData.reduce((acc, item) => acc + (item.quantity || 0), 0);
    };

    const [totalQuantity, setTotalQuantity] = useState(getTotalQuantity());

    useEffect(() => {
        setTotalQuantity(getTotalQuantity());
    }, [cartData]);


    const onCart = () => {
        dispatch(get_cart_Data());
        navigate("/cart");
    }

    useEffect(() => {
        dispatch(get_cart_Data());
    }, [dispatch]);

    const onLogout = () => {
        localStorage.clear();
        dispatch(get_cart_Data()); 
        navigate('/');
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHeader(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`container-header ${showHeader ? 'show' : ''}`}>
            <div className="header d-flex justify-content-between">
                <div>
                    <Link to="/">
                        <img src="./images/logo.png" alt="" className="header-logo" />
                    </Link>
                </div>
                <span className="burger-menu" onClick={toggleMenu}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.75 15H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.75 7.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.75 22.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <div className={`header-links d-lg-flex ${isMenuOpen ? 'show' : 'hide'}`}>
                    <div className="login-register-links d-flex menu">
                        <div className="login" onClick={closeMenu}>
                            <Link to="/login"><span>LOGIN</span></Link>
                        </div>
                        <span>/</span>
                        <div className="register" onClick={closeMenu}>
                            <Link to="/register"><span>REGISTER</span></Link>
                        </div>
                    </div>
                    <div className="cart-link menu" onClick={closeMenu}>
                        <Link to="/cart" className="d-flex" style={{ gap: "5px" }}>
                            <div >
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 2.5L3.75 7.5V25C3.75 25.663 4.01339 26.2989 4.48223 26.7678C4.95107 27.2366 5.58696 27.5 6.25 27.5H23.75C24.413 27.5 25.0489 27.2366 25.5178 26.7678C25.9866 26.2989 26.25 25.663 26.25 25V7.5L22.5 2.5H7.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.75 7.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 12.5C20 13.8261 19.4732 15.0979 18.5355 16.0355C17.5979 16.9732 16.3261 17.5 15 17.5C13.6739 17.5 12.4021 16.9732 11.4645 16.0355C10.5268 15.0979 10 13.8261 10 12.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>

                            </div>
                            <div className="d-flex justify-content-center text-white" style={{ width: "40px" }}>
                                {totalQuantity > 0 && (
                                    <span className="cart_badge">{totalQuantity}</span>
                                )}
                            </div>
                        </Link>
                    </div>
                    <div className="search-menu-links d-flex menu">
                        <div onClick={closeMenu}>
                            <span>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.75 23.75C19.2728 23.75 23.75 19.2728 23.75 13.75C23.75 8.22715 19.2728 3.75 13.75 3.75C8.22715 3.75 3.75 8.22715 3.75 13.75C3.75 19.2728 8.22715 23.75 13.75 23.75Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M26.25 26.25L20.8125 20.8125" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="menu-icon">
                            <Link to="" >
                                <span>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 15H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.75 7.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.75 22.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;