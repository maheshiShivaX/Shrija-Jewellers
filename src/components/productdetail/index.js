import React, { useState, useRef,useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import './productdetail.css';
import Layout from "../layout";
import { Link,useNavigate } from "react-router-dom";
import { imageurl, baseurl, DAPI_URL } from '../../_config';
import { decryptString } from "../../_services";
import CryptoJS from 'crypto-js';
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { get_cart_Data, incrQuantity, decrQuantity ,addToCart} from '../../redux/action';

const ProductDetail = () => {
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const SJloginId = localStorage.getItem("SJloginId");
    const SJproductId = localStorage.getItem("SJproductId");
    const navigate = useNavigate();
    const [productDetailById, setProductDetailById] = useState([]);
    const [productData, setProductData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
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
            console.error('Error fetching category data:', error);
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        getProductDetailById();
        dispatch(get_cart_Data());
    },[dispatch,SJproductId])

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
        vertical: false,
        verticalSwiping: true,
        centerMode: true,
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

    const onBuyNow = () =>{
        if (SJloginId) {
            handleSubmit();
            navigate("/shippingaddress");
        } else {
            handleSubmit();
            navigate('/login');
        }
    }

    return (
        <Layout>
            <div className="product_details">
                <section className="py-5 bg_add">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="image_wrep_main">
                                    <div className="col-10">
                                        <Slider {...horizantal} ref={horizontalSliderRef}>
                                            {productDetailById?.productImageDtos?.map((item, i) => (
                                                <div className="img_book" key={i}>
                                                    <img src={`${imageurl}${item?.imgPath}`} alt="" className="" />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                    <div className="imge_wepper d-lg-block d-none col-9">
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
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="product_wpeer">
                                    <h2>{productDetailById?.displayName}</h2>
                                    <p>{productDetailById?.displayDesc}</p>
                                    <div className="price_inner">
                                        <p>₹{productDetailById?.unitPrice} </p>
                                        <del>{productDetailById?.mrp}</del>
                                        <span>(10% Off )</span>
                                    </div>
                                    <div className="delivery_date">
                                        <p>Delivery Date</p>
                                        <input type="text" placeholder="Pin Code" className="form-control" />
                                        <button onClick={() => onAddCart(productDetailById)}>Add to Cart </button>
                                        <button onClick={()=>onBuyNow()}>Buy Now </button>
                                        <hr />
                                    </div>
                                    <div className="pragaraf_content">
                                        <p>Silver Lotus Collar Necklace. Crafted in Oxidised 925 Silver with Synthetic Pink
                                            Sapphire. Uniquely handcrafted, no two pieces are exactly alike!</p>
                                        <p>Care Tips: The first step is to store your jewellery in a zip lock bag when you're not
                                            wearing it. Also, avoid direct contact with chemicals such as perfumes, sanitisers and
                                            the likes.</p>
                                        <p>
                                            Gross Weight : 15.790 g
                                        </p>

                                        <p>
                                            Inner Diameter: 12.7 cm (5 Inches) | Gap: 1.8 cm
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default ProductDetail;