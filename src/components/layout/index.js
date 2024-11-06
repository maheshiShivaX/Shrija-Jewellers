// Home.js
import React from 'react';
import Header from './header';
import Footer from './footer';
// import { Helmet, HelmetProvider } from 'react-helmet-async';

const Layout = ({ children }) => {
    return (
        <>
        {/* // <HelmetProvider> */}
                {/* <Helmet>
                <meta charSet="utf-8" />
                <title>First India Plus</title>
                <meta name="description" content="First India Plus is ott Platform" />
                <meta name="keywords" content='keywords' />
                <meta name="robots" content="index,follow" />
                <meta property="og:title" content={process.env.REACT_PUBLIC_BRAND_NAME} />
                <meta property="og:description" content='description' />
                <meta property="og:url" content="website" />
            </Helmet> */}
                <Header />
                <div>
                    {children}
                </div>
                <Footer />
        {/* // </HelmetProvider> */}
        </>
    );
};

export default Layout;
