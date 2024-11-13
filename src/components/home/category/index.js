import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './category.css';
import { imageurl, baseurl } from '../../../_config';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Category = () => {
    const navigate = useNavigate();
    const [swiper, setSwiper] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showContent, setShowContent] = useState(false);
    const [showSlider, setShowSlider] = useState(false);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
    const [hasShown, setHasShown] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categortData = async () => {
        try {
            const response = await axios.get(`${baseurl}ProductCategory/GetProductCategory`);

            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setCategoryData(response.data.data);
                }
            } else {
                setError("Failed to fetch CategoryData");
            }
        } catch (error) {
            setError("Please try again later.");
        }
    };

    useEffect(() => {
        categortData();
    }, []);

    const handleSlideChange = () => {
        if (swiper) {
            setCurrentIndex(swiper.realIndex);
        }
    };

    const handleScroll = () => {
        if (hasShown) return;

        const scrollPosition = window.scrollY;
        const categorySection = document.querySelector('.category-section');
        const categorySectionOffset = categorySection.offsetTop;

        if (scrollPosition > categorySectionOffset - window.innerHeight + 100) {
            setShowContent(true);
            setShowSlider(true);
            setHasShown(true);
        }

        if (scrollPosition > categorySectionOffset + categorySection.offsetHeight - window.innerHeight - 100) {
            setShowScrollIndicator(true);
        } else {
            setShowScrollIndicator(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasShown]);

    const handleCategoryChange = (item) => {
        localStorage.setItem('SJproductCategoryId', item?.productCategoryId);
        navigate(`/category/${item?.productCategoryId}/productsubcategory`);
    };

    return (
        <div className="category-section">
            <div className="category d-md-flex">
                <div className={`category-content ${showContent ? 'show' : ''}`}>
                    <div className="topcategory">
                        <span>{`{ TOP CATEGORY }`}</span>
                        <h2 className="mb-0">DISCOVER <br /> OUR TOP <br /> CATEGORY</h2>
                    </div>
                    <div className="view-allbtn">
                        <Link to="/productcategorylist" className='product-btn d-flex justify-content-center align-items-center text-white'>
                            <div className='text-center '>
                                <span> VIEW ALL CATEGORY</span>
                                <div className="arrow-down">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 5V19" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19.5 12L12.5 19L5.5 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                            </div>
                        </Link>
                    </div>
                </div>
                <div className={`category-slider col-xl-10 col-md-9 col-11 ${showSlider ? 'show' : ''}`}>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : categoryData !== null ? (
                        categoryData.length > 0 ? (
                            <Swiper
                                onSwiper={swiper => setSwiper(swiper)}
                                onSlideChange={handleSlideChange}
                                pagination={{ clickable: true }}
                                spaceBetween={15}
                                loop={true}
                                autoplay={{ delay: 3000 }}
                                speed={1000}
                                breakpoints={{
                                    300: { slidesPerView: 1, },
                                    480: { slidesPerView: 2, },
                                    640: { slidesPerView: 2, },
                                    992: { slidesPerView: 3, },
                                    1200: { slidesPerView: 4, },
                                }}
                            >
                                {categoryData?.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <div className='category-box' onClick={() => handleCategoryChange(item)}>
                                            <span >
                                                <div className="products">
                                                    <div className="product-image mb-lg-3 mb-2">
                                                        {/* <img src="./images/necklaces.png" alt="product" className="product-img" /> */}
                                                        {item.imgPath ? (
                                                            <>
                                                                <img src={`${imageurl}${item?.imgPath}`} alt="" className="product-img" />
                                                            </>
                                                        ) : (
                                                            <span>No Image</span>
                                                        )}
                                                    </div>
                                                    <div className="product-detail">
                                                        {/* <span className="">{`{ 0${i + 1} }`}</span>
                                                        <p className="py-lg-3 py-2 mb-0">{1600}</p> */}
                                                        <h6>{item?.displayName}</h6>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <p>No data available</p>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Category;