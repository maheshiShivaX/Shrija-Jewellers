import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import './productdetail.css';
import Layout from "../layout";
import { Link, useNavigate } from "react-router-dom";
import { imageurl, baseurl, DAPI_URL } from '../../_config';
import { decryptString, getProductSpecificationData } from "../../_services";
import CryptoJS from 'crypto-js';
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { get_cart_Data, incrQuantity, decrQuantity, addToCart } from '../../redux/action';
import ProductGallery from "./Productslider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const SJloginId = localStorage.getItem("SJloginId");
    const SJproductId = localStorage.getItem("SJproductId");
    const SJproductSubCategoryId = localStorage.getItem('SJproductSubCategoryId');
    const productCategoryId = localStorage.getItem('SJproductCategoryId');
    const navigate = useNavigate();
    const [productDetailById, setProductDetailById] = useState([]);
    const [productData, setProductData] = useState([]);
    const [specificationData, setSpecificationData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(null);
    const verticalSliderRef = useRef(null);
    const horizontalSliderRef = useRef(null);
    const dispatch = useDispatch();
    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

    const cartData = useSelector((state) => state.cartReducer.cart) || [];

    const [formData, setFormData] = useState({
        cartItemId: 0,
        productId: SJproductId,
        loginId: SJloginId ? Number(SJloginId) : 0,
        buyStatus: 0,
        quantity: 1,
        isActive: true,
        createdBy: 0
    });

    const getProductDetailById = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL.GetProductDetailById}?pProductDetailId=${SJproductId}`);

            const encryptedData = response.data?.data;
            if (!encryptedData || typeof encryptedData !== 'string' || encryptedData.trim() === '') {
                throw new Error("Invalid or empty encrypted data format");
            }

            const result = decryptString(encryptedData, secretKey, iv);

            const parsedData = JSON.parse(result);

            if (response.status === 200) {
                if (response.data.isSuccess == 200 && parsedData != null) {
                    setProductDetailById(parsedData[0]);
                }
            } else {
                setError("Failed to Fetched product data by sub category id");
            }
        } catch (error) {
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };


    const fetchSpecificationData = async () => {
        try {
            const data = await getProductSpecificationData();
            setSpecificationData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecificationData();
    }, []);

    console.log(specificationData, 'specificationDataspecificationData')

    useEffect(() => {
        getProductDetailById();
        dispatch(get_cart_Data());
    }, [dispatch, SJproductId])

    const handleSubmit = async () => {
        try {
            await dispatch(addToCart(formData));
        } catch (error) {
            toast.error("Error occurred while adding to cart.");
        }
    };

    const horizantal = {
        dots: false,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        speed: 500,
        afterChange: index => setCurrentIndex(index),
    };

    const vertical = {
        dots: false,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        vertical: true,
        verticalSwiping: true,
        centerMode: false,
        centerPadding: '0',
        afterChange: index => setCurrentIndex(index),
    };

    useEffect(() => {
        if (verticalSliderRef.current) {
            verticalSliderRef.current.slickGoTo(currentIndex);
        }
        if (horizontalSliderRef.current) {
            horizontalSliderRef.current.slickGoTo(currentIndex);
        }
    }, [currentIndex]);

    const handleVerticalClick = (index) => {
        setCurrentIndex(index);
    };

    const onAddCart = (productDetailById) => {
        handleSubmit(productDetailById);
        navigate('/cart');
    }

    const onBuyNow = () => {
        if (SJloginId) {
            handleSubmit();
            navigate("/shippingaddress");
        } else {
            handleSubmit();
            navigate('/login');
        }
    }

    const breadcrumbItems = [
        {
            label: 'Home',
            path: '/',
        },
        {
            label: 'Subcategory',
            path: `/category/${productCategoryId}/productsubcategory`,
        },
        {
            label: 'Product',
            path: `/category/${productCategoryId}/productsubcategory/${SJproductSubCategoryId}/products`
        },
        {
            label: 'Productdetail',
            path: `/category/${productCategoryId}/productsubcategory/${SJproductSubCategoryId}/products/${SJproductId}/productdetail`
        }
    ];

    const calculateDiscountPercent = (mrp, unitPrice) => {
        if (mrp && unitPrice && mrp > unitPrice) {
            return ((mrp - unitPrice) / mrp) * 100;
        }
        return 0;
    };

    const discountPercent = calculateDiscountPercent(productDetailById?.mrp, productDetailById?.unitPrice)
    return (
        <Layout>
            <div className="product_details">
                <section className="pt-4 pb-5 bg_add">
                    <div className="container-screen">
                        <div className="breadcrumb_data mb-5">
                            {breadcrumbItems.map((item, index) => (
                                <span key={index}>
                                    <Link to={item.path}>{item.label}</Link>

                                    {index < breadcrumbItems.length - 1 && (
                                        <svg
                                            id="Layer_2"
                                            viewBox="0 0 512 512"
                                            width="20"
                                            height="20"
                                            version="1.1"
                                        >
                                            <g width="100%" height="100%" transform="matrix(1, 0, 0, 1, 0, 0)">
                                                <g id="Icon">
                                                    <g id="_22" data-name="22">
                                                        <rect
                                                            id="Background"
                                                            fill="#1770ff"
                                                            height="512"
                                                            rx="150"
                                                            width="512"
                                                            fillOpacity="0"
                                                            stroke="none"
                                                        />
                                                        <path
                                                            d="m323.8 80.48c1.5-3.3 4.42-4.95 8.78-4.95s8.92 1.05 13.72 3.15c11.1 5.1 18.29 11.1 21.6 18 1.2 2.1 1.8 4.05 1.8 5.85s-.3 3.3-.9 4.5l-180.15 324.95c-1.8 3-4.95 4.5-9.45 4.5s-9-1.05-13.5-3.15c-11.41-5.4-18.75-11.4-22.05-18-.9-1.8-1.35-3.53-1.35-5.17s.45-3.23 1.35-4.72z"
                                                            fill="#ffffff"
                                                            stroke="none"
                                                        />
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    )}
                                </span>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="image_wrep_main d-flex">
                                    <div className="imge_wepper d-lg-block d-none col-2">
                                        <Slider {...vertical} className="w-100" ref={verticalSliderRef}>
                                            {productDetailById?.productImageDtos?.map((item, i) => (
                                                <div
                                                    className={`img_book ${i === currentIndex ? 'slick-current' : ''}`}
                                                    key={i}
                                                    onClick={() => handleVerticalClick(i)}>
                                                    <img src={`${imageurl}${item?.imgPath}`} alt="" className="" />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                    <div className="col-9">
                                        <Slider {...horizantal} ref={horizontalSliderRef} className="h-100">
                                            {productDetailById?.productImageDtos?.map((item, i) => (
                                                <div className="img_book h-100" key={i}>
                                                    <img src={`${imageurl}${item?.imgPath}`} alt="" className="h-100" />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="product_wpeer">
                                    <h2>{productDetailById?.displayName}</h2>
                                    <p>{productDetailById?.displayDesc}</p>
                                    <div className="price_inner">
                                        <p>₹{productDetailById?.unitPrice} </p>
                                        <del>{productDetailById?.mrp}</del>
                                       
                                            {discountPercent > 0 && (
                                                <span className="discount_percent mb-0">{`(${discountPercent.toFixed(0)}% off)`} </span>
                                            )}
                                       
                                    </div>
                                    <div className="delivery_date">
                                        <p>Delivery Date</p>
                                        <input type="text" placeholder="Pin Code" className="form-control" />
                                        <button onClick={() => onAddCart(productDetailById)}>Add to Cart </button>
                                        <button onClick={() => onBuyNow()}>Buy Now </button>
                                        <hr />
                                    </div>
                                    <div className="pragaraf_content">
                                        {/* <p>Silver Lotus Collar Necklace. Crafted in Oxidised 925 Silver with Synthetic Pink
                                            Sapphire. Uniquely handcrafted, no two pieces are exactly alike!</p>
                                        <p>Care Tips: The first step is to store your jewellery in a zip lock bag when you're not
                                            wearing it. Also, avoid direct contact with chemicals such as perfumes, sanitisers and
                                            the likes.</p> */}

                                        {specificationData?.map((item, i) => (
                                            <div>
                                                <p>{item?.specificationDisplayName} : {item?.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section >
                    {/* <ProductGallery/> */}
                </section>
            </div>
        </Layout>
    )
}

export default ProductDetail;