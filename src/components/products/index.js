import Layout from "../layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './products.css';
import { imageurl, baseurl, DAPI_URL } from '../../_config';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { get_cart_Data, incrQuantity, decrQuantity, addToCart } from '../../redux/action';
import { decryptString } from "../../_services";
import CryptoJS from 'crypto-js';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Products = () => {
    const SJproductSubCategoryId = localStorage.getItem('SJproductSubCategoryId');
    const SJjwtToken = localStorage.getItem('SJjwtToken');
    const SJloginId = localStorage.getItem("SJloginId");
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartReducer.cart) || [];

    const secretKey = CryptoJS.enc.Utf8.parse("uitsufdytuiysdifdsfdsfdhgtyuijkj");
    const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

    const [formData, setFormData] = useState({
        cartItemId: 0,
        productId: 0,
        loginId: SJloginId ? Number(SJloginId) : 0,
        buyStatus: 0,
        quantity: 1,
        isActive: true,
        createdBy: 0
    });

    const fetchProductData = async () => {
        try {
            const response = await axios.get(`${baseurl}${DAPI_URL.GetProductDetailBySubCategoryId}?pSubCategoryId=${SJproductSubCategoryId}`);
            if (response.status === 200) {
                if (response.data.isSuccess == 200) {
                    setProductData(response.data.data);
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

    useEffect(() => {
        fetchProductData();
        dispatch(get_cart_Data());
    }, [dispatch]);

    const handleSubmit = async () => {
        try {
            await dispatch(addToCart(formData));
        } catch (error) {
            toast.error("Error occurred while adding to cart.");
        }
    };

    const onProductDetail = (item) => {
        localStorage.setItem('SJproductId', item?.productId);
        navigate(`/productdetail/${item?.productId}`);
    }

    const onAddCart = (item) => {
        setFormData(prevData => ({
            ...prevData,
            productId: item?.productId
        }));

        if(item.productId >  0) {
            handleSubmit(item?.productId);
        }
    }

   const onBuyNow = (item) =>{
        setFormData(prevData => ({
            ...prevData,
            productId: item?.productId
        }));

        if (SJloginId) {
            handleSubmit(item?.productId);
            navigate("/shippingaddress");
        } else {
            handleSubmit(item?.productId);
            navigate('/login');
        }
    }

    return (
        <Layout>
            <section className="product_wepper_main">
                <div className="container-screen">
                    <div className="py-3">
                        <div className="hedding_product">
                            <h2>Product List</h2>
                            {/* <div className="icon_wepper">
                                <a href="#"><i className="fa-solid fa-list"></i></a>
                                <a href="#"><i className="fa-solid fa-table-cells-large"></i></a>
                            </div> */}
                        </div>
                        <div className="row mt-3">
                            {error ? (
                                <p>Error: {error}</p>
                            ) : productData !== null ? (
                                productData.length > 0 ? (
                                    <div className="row m-sm-5 mt-2">
                                        {productData?.map((item, i) => (
                                            <React.Fragment key={i}>
                                                <div className="col-lg-3 col-md-3 col-sm-6 col-12 col-6">
                                                    <span onClick={() => onProductDetail(item)} className="product_img_wepper">
                                                        {item?.productImageDtos.length > 0 ? (
                                                            item.productImageDtos.map((image, j) => (
                                                                image.isHeader ? (
                                                                    <img
                                                                        key={j}
                                                                        src={`${imageurl}${image.imgPath}`}
                                                                        alt={item.productName}
                                                                        className="w-100"
                                                                    />
                                                                ) : null 
                                                            ))
                                                        ) : (
                                                            <img src="./images/product-img 3.png" alt="Default" className="w-100 demo" />
                                                        )}

                                                        <div className="product_content_wepper">
                                                            <h2>{item?.productName}</h2>
                                                            <div className="price">
                                                                <p>₹{item.salePrice}</p>
                                                                <del>₹{item.mrp}</del>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    <div className="bttn_wepper">
                                                        <span onClick={() => onAddCart(item)} style={{ cursor: 'pointer' }}>Add To Cart</span>
                                                        <button onClick={()=>onBuyNow()} className="active">Buy Now</button>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No data avaiable</p>
                                )
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Products;