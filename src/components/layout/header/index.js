import React, { useState, useEffect } from "react";
import './header.css';
import { Link, useNavigate } from "react-router-dom";
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
            <div className="header d-flex justify-content-between align-items-center">
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
                    {/* <div className="login-register-links d-flex menu">
                        <div className="login" onClick={closeMenu}>
                            <Link to="/login"><span>LOGIN</span></Link>
                        </div>
                        <span>/</span>
                        <div className="register" onClick={closeMenu}>
                            <Link to="/register"><span>REGISTER</span></Link>
                        </div>
                    </div> */}
                    <div className="user_profile" style={{ position: 'relative' }}>
                        <div className="user_icon h-100">
                            <svg
                                width="25"
                                height="25"
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
                                <div className="login" onClick={closeMenu}>
                                    <Link to="/login"><span>LOGIN</span></Link>
                                </div>
                                {/* <span>/</span> */}
                                <div className="register mt-1" onClick={closeMenu}>
                                    <Link to="/register"><span>REGISTER</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <svg
                            clipRule="evenodd"
                            fillRule="evenodd"
                            height="30"
                            imageRendering="optimizeQuality"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            viewBox="0 0 512 512"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g width="100%" height="100%" transform="matrix(1, 0, 0, 1, 0, 0)">
                                <g id="Layer_x0020_1">
                                    <path
                                        d="m256 496.194c-2.20989 0-4.41978-.809858-6.14976-2.42986-60.9486-57.0487-123.967-116.037-170.686-174.336-43.3347-54.0845-79.1581-115.028-79.1581-179.026 0-68.7084 59.4386-124.597 132.497-124.597 62.7885 0 95.3479 29.1796 123.497 77.2382 28.1495-48.0586 60.7088-77.2382 123.497-77.2382 73.0582 0 132.497 55.8987 132.497 124.597 0 64.0057-35.8234 124.936-79.1581 179.026-46.7087 58.2985-109.737 117.287-170.686 174.336-1.72998 1.61972-3.94016 2.42986-6.15005 2.42986zm-123.497-462.388c-63.1381 0-114.497 47.8188-114.497 106.597 0 49.7288 24.5993 104.608 75.2083 167.766 44.3489 55.3587 104.237 111.877 162.786 166.696 58.5485-54.8187 118.427-111.338 162.786-166.696 50.6089-63.1582 75.2083-118.037 75.2083-167.766 0-58.7787-51.359-106.597-114.497-106.597-52.9988 0-83.2479 21.4393-115.557 81.938-3.38598 6.32976-12.4937 6.32976-15.8794 0-32.3096-60.4987-62.5589-81.938-115.558-81.938z"
                                        fill="#ffffff"
                                        fillOpacity="1"
                                        stroke="none"
                                        strokeOpacity="1"
                                    />
                                    <path
                                        d="m93.2142 308.169c44.3489 55.3587 104.237 111.877 162.786 166.696 58.5485-54.8187 118.427-111.338 162.786-166.696 50.6089-63.1582 75.2083-118.037 75.2083-167.766 0-58.7787-51.359-106.597-114.497-106.597-52.9988 0-83.2479 21.4393-115.557 81.938-3.3857 6.32948-12.4937 6.32948-15.8794 0-32.3096-60.4987-62.5589-81.938-115.558-81.938-63.1381 0-114.497 47.8188-114.497 106.597 0 49.7288 24.5993 104.608 75.2083 167.766z"
                                        fill="#000000"
                                        fillOpacity="1"
                                        stroke="none"
                                        strokeOpacity="1"
                                    />
                                </g>
                            </g>
                        </svg>
                    </div>
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
                                        width="30"
                                        height="30"
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
                </div>
            </div>
        </div>
    )
}

export default Header;