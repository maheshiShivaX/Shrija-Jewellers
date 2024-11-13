import React, { useState, useEffect } from "react";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { get_cart_Data } from '../../../redux/action';
import CheckToken from "../../../_services/authToken";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    useEffect(() => {
        dispatch(get_cart_Data());
    }, [dispatch]);

    const onLogout = () => {
        localStorage.removeItem('SJloginId');
        localStorage.removeItem('SJjwtToken');
        setIsLoggedIn(false);
    };

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

    const onHome = () => {
        navigate('/');
    }

    return (
        <>
            <CheckToken setIsLoggedIn={setIsLoggedIn} />
            <div className={`container-header ${showHeader ? 'show' : ''}`}>
                <div className="header d-flex justify-content-between align-items-center">
                    <div>
                        <Link to="/">
                            <img src="./images/logo.png" alt="" className="header-logo" />
                        </Link>
                    </div>
                    <div className={`header_menues_section header-links ${isMenuOpen ? 'show' : 'hide'}`}>
                        <ul className="p-0 m-0">
                            <li onClick={onHome}>
                                <span className="header_menu_name">Home</span>
                            </li>
                            <li>
                                <span className="header_menu_name">Shop</span>
                            </li>
                            <li>
                                <span className="header_menu_name">About</span>
                            </li>
                            <li>
                                <span className="header_menu_name">Contact</span>
                            </li>
                        </ul>
                    </div>
                    <div className="header_profile_menues d-flex align-items-center">
                        <div className="user_profile" style={{ position: 'relative' }}>
                            <div className="user_icon h-100 text-center">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g fill="#fff">
                                        <path
                                            d="M11 0C8.23858 0 6 2.23858 6 5s2.23858 5 5 5c2.7614 0 5-2.23858 5-5s-2.2386-5-5-5zm-3 5c0-1.65685 1.34315-3 3-3 1.6569 0 3 1.34315 3 3s-1.3431 3-3 3c-1.65685 0-3-1.34315-3-3z"
                                        />
                                        <path
                                            d="M10.5556 12c-5.82972 0-10.5556 4.7259-10.5556 10.5556 0 .7977.6467 1.4444 1.44444 1.4444h19.11116c.7977 0 1.4444-.6467 1.4444-1.4444 0-5.8297-4.7259-10.5556-10.5556-10.5556zm.8888 2c4.5385 0 8.2516 3.5338 8.5379 8h-17.96455c.28625-4.4662 3.99934-8 8.53785-8z"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <div className="onhover_menu">
                                <div className="login-register-links menu">
                                    {isLoggedIn ? (
                                        <>
                                            <div className="logout hover_menu_name px-2 py-2" onClick={onLogout} style={{ cursor: 'pointer' }}>
                                                <span>Logout</span>
                                            </div>
                                            <div className="my_profile hover_menu_name py-2 px-2" style={{ cursor: 'pointer' }}>
                                                <span>My Profile</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="login hover_menu_name px-2 py-2" onClick={closeMenu}>
                                                <Link to="/login"><span>LOGIN</span></Link>
                                            </div>
                                            <div className="register hover_menu_name px-2 py-2" onClick={closeMenu}>
                                                <Link to="/register"><span>REGISTER</span></Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="horizantal_saprate"></div>
                        <div>
                            <svg
                                height="22"
                                viewBox="0 0 512.00046 512"
                                width="22"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                            >
                                <g width="100%" height="100%" transform="matrix(1,0,0,1,0,0)">
                                    <path
                                        d="m255.925781 496.003906s239.929688-127.964844 239.929688-351.898437c3.148437-67.523438-49.039063-124.816407-116.5625-127.960938-3.800781-.179687-7.601563-.179687-11.398438 0-46.5625.007813-89.445312 25.308594-111.96875 66.058594-22.523437-40.75-65.40625-66.050781-111.96875-66.058594-69.679687 2.332031-125.625 58.28125-127.960937 127.960938 0 223.933593 239.929687 351.898437 239.929687 351.898437zm0 0"
                                        fill="#ff6243"
                                        fillOpacity="0"
                                        stroke="none"
                                        strokeOpacity="1"
                                    />
                                    <path
                                        d="m367.890625.148438c-43.488281.027343-84.636719 19.703124-111.964844 53.535156-27.328125-33.832032-68.476562-53.507813-111.96875-53.535156-78.667969 1.984374-141.972656 65.289062-143.957031 143.957031 0 230.875 238.328125 360.597656 248.390625 366.019531 4.714844 2.496094 10.355469 2.496094 15.070313 0 10.058593-5.421875 248.390624-135.144531 248.390624-366.019531 3.515626-75.988281-55.230468-140.441407-131.21875-143.957031-4.246093-.195313-8.496093-.195313-12.742187 0zm-111.964844 477.410156c-39.859375-23.785156-223.933593-143.894532-223.933593-333.453125 2.3125-60.851563 51.113281-109.652344 111.964843-111.96875 40.734375.039062 78.242188 22.171875 97.972657 57.808593 4.964843 7.730469 15.257812 9.96875 22.984374 5.003907 2.007813-1.289063 3.714844-2.996094 5.007813-5.003907 19.726563-35.640624 57.234375-57.769531 97.96875-57.808593 58.445313-3.390625 108.574219 41.234375 111.96875 99.679687.238281 4.09375.238281 8.195313 0 12.289063 0 189.558593-184.074219 309.667969-223.933594 333.453125zm0 0"
                                        fill="#ffffff"
                                        fillOpacity="1"
                                        stroke="none"
                                        strokeOpacity="1"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="horizantal_saprate"></div>
                        <div className="cart-link menu" onClick={closeMenu}>
                            <Link to="/cart" className="d-flex" style={{ gap: "5px" }}>
                                <div >
                                    <span>
                                        {/* <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 2.5L3.75 7.5V25C3.75 25.663 4.01339 26.2989 4.48223 26.7678C4.95107 27.2366 5.58696 27.5 6.25 27.5H23.75C24.413 27.5 25.0489 27.2366 25.5178 26.7678C25.9866 26.2989 26.25 25.663 26.25 25V7.5L22.5 2.5H7.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.75 7.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M20 12.5C20 13.8261 19.4732 15.0979 18.5355 16.0355C17.5979 16.9732 16.3261 17.5 15 17.5C13.6739 17.5 12.4021 16.9732 11.4645 16.0355C10.5268 15.0979 10 13.8261 10 12.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg> */}

                                        <svg
                                            id="Layer_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xmlnsSvgjs="http://svgjs.dev/svgjs"
                                            viewBox="0 0 24 24"
                                            width="25"
                                            height="25"
                                        >
                                            <g transform="matrix(1,0,0,1,0,0)" width="100%" height="100%">
                                                <path
                                                    d="m20 24h-16c-2.2 0-4-1.8-4-4v-16c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4z"
                                                    fill="#fa486f"
                                                    fillOpacity="0"
                                                    stroke="none"
                                                />
                                                <path
                                                    d="m21 16h-16c-.6 0-1-.4-1-1s.4-1 1-1h13c.4 0 .8-.2.9-.6l3-7c.1-.3.1-.7-.1-.9-.2-.3-.5-.5-.8-.5h-14.6l-.4-2.2c-.1-.5-.5-.8-1-.8h-2c-.6 0-1 .4-1 1s.4 1 1 1h1.2l1.6 8h-.8c-1.7 0-3 1.3-3 3 0 1.4.9 2.5 2.2 2.9-.1.3-.2.7-.2 1.1 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.4-.1-.7-.2-1h4.4c-.1.3-.2.6-.2 1 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.4-.1-.7-.2-1h1.2c.6 0 1-.4 1-1s-.4-1-1-1zm-14.2-9h12.7l-2.1 5h-9.6zm1.2 12c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm10 0c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1z"
                                                    fill="#ffffff"
                                                    stroke="none"
                                                />
                                            </g>
                                        </svg>
                                    </span>

                                </div>
                                <div className="cart_badge d-flex justify-content-center text-white">
                                    <span>{totalQuantity || 0}</span>
                                </div>
                            </Link>
                        </div>
                        <span className="burger-menu " onClick={toggleMenu}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.75 15H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.75 7.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3.75 22.5H26.25" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header;