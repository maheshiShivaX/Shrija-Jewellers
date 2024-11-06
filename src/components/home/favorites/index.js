import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './favorites.css';
import Slider from "react-slick";

const product = [
    {
        image: './images/Rectangle 8.png',
        name: 'Beautiful earring',
        price: '₹1,020,100.00'
    },
    {
        image: './images/Rectangle 8.png',
        name: 'Beautiful earring',
        price: '₹1,020,100.00'
    },
    {
        image: './images/Rectangle 8.png',
        name: 'Beautiful earring',
        price: '₹1,020,100.00'
    },
    {
        image: './images/Rectangle 8.png',
        name: 'Beautiful earring',
        price: '₹1,020,100.00'
    },
    {
        image: './images/Rectangle 8.png',
        name: 'Beautiful earring',
        price: '₹1,020,100.00'
    },
    {
        image: './images/Rectangle 8.png',
        name: 'Beautiful earring',
        price: '₹1,020,100.00'
    },
]

const Favorites = () => {
    const wheelRef = useRef(null);
    const headerRef = useRef(null);
    const [currentCard, setCurrentCard] = useState(null);

    const settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        speed: 500,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: true,
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            }
          },
          {
            breakpoint: 300,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            }
          }
        ]
      };
      
    return (
        <div className="container-screen favorites-main">
            <div className="favorites py-lg-4 py-0 text-center">
                <div className="favorites-content">
                    <span>{`{ Essential's Collection }`}</span>
                    <h2>Shop our favorites</h2>
                    <p>Fine Jewelry for every day. Always ethically sourced and always fashionable.</p>
                </div>
            </div>
            <div className="product-slider">
                {/* <Swiper
                    pagination={{ clickable: true }}
                    spaceBetween={1}
                    loop={true}
                    autoplay={{ delay: 2000 }}
                    speed={1000}
                    centeredSlides={true}
                    breakpoints={{
                        300: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        992: { slidesPerView: 4 },
                    }}
                >
                    <div className="wheel">
                        {product?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='favorites-box'>
                                    <div className="products">
                                        <div className="product-images mb-3 d-flex justify-content-center">
                                            <img src={item.image} alt="product" />
                                        </div>
                                        <div className="product-detail text-center">
                                            <h6>{item.name}</h6>
                                            <p className="mb-0">{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper> */}
                <Slider {...settings}>
                    {product?.map((item, index) => (
                        <div className='favorites-box' key={index}>
                            <div className="products">
                                <div className="product-images mb-3 d-flex justify-content-center">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="product-detail text-center">
                                    <h6>{item.name}</h6>
                                    <p className="mb-0">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="view-all-productbtn">
                <button>
                    <span>VIEW ALL PRODUCTS</span>
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L19 12" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Favorites;